import assert from 'node:assert';
import {
  JOB_EXPIRY_DAYS,
  MS_PER_DAY,
  computeJobExpiry,
  expireOverdueJobs,
  createJobInDatabase,
  getJobsFromDatabase,
  syncJobsFromSheet,
  startJobExpiryScheduler,
} from '../api/job-expiry-service.mjs';

/**
 * Minimal in-memory MongoDB Collection simulator supporting the query operators
 * used by job-expiry-service.mjs so we can verify real DB transitions deterministically.
 */
function createInMemoryCollection() {
  const store = new Map();

  function matchesCondition(value, condition) {
    if (condition && typeof condition === 'object' && !(condition instanceof Date)) {
      if ('$ne' in condition) return value !== condition.$ne;
      if ('$exists' in condition) return condition.$exists ? value !== undefined : value === undefined;
      let ok = true;
      if ('$gt' in condition) ok = ok && value > condition.$gt;
      if ('$gte' in condition) ok = ok && value >= condition.$gte;
      if ('$lt' in condition) ok = ok && value < condition.$lt;
      if ('$lte' in condition) {
        const lhs = value instanceof Date ? value.getTime() : value;
        const rhs = condition.$lte instanceof Date ? condition.$lte.getTime() : condition.$lte;
        ok = ok && lhs !== null && lhs !== undefined && lhs <= rhs;
      }
      return ok;
    }
    return value === condition;
  }

  function matchesFilter(doc, filter = {}) {
    for (const [key, expected] of Object.entries(filter)) {
      if (key === '$or') {
        if (!expected.some((sub) => matchesFilter(doc, sub))) return false;
      } else if (!matchesCondition(doc[key], expected)) {
        return false;
      }
    }
    return true;
  }

  return {
    _store: store,
    async createIndex() {
      return 'ok';
    },
    async countDocuments(filter = {}) {
      let count = 0;
      for (const doc of store.values()) {
        if (matchesFilter(doc, filter)) count++;
      }
      return count;
    },
    find(filter = {}) {
      const matched = [];
      for (const doc of store.values()) {
        if (matchesFilter(doc, filter)) matched.push({ ...doc });
      }
      return {
        sort(sortSpec) {
          const [[field, dir]] = Object.entries(sortSpec);
          matched.sort((a, b) => ((a[field] || 0) - (b[field] || 0)) * dir);
          return this;
        },
        async toArray() {
          return matched;
        },
      };
    },
    async updateOne(filter, update, options = {}) {
      const key = filter.jobId;
      const existing = store.get(key);
      if (!existing && options.upsert) {
        const next = { ...(update.$setOnInsert || {}), ...(update.$set || {}) };
        store.set(key, next);
        return { matchedCount: 0, modifiedCount: 0, upsertedCount: 1 };
      }
      if (existing) {
        store.set(key, { ...existing, ...(update.$set || {}) });
        return { matchedCount: 1, modifiedCount: 1, upsertedCount: 0 };
      }
      return { matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
    },
    async updateMany(filter, update) {
      let modifiedCount = 0;
      for (const [key, doc] of store.entries()) {
        if (matchesFilter(doc, filter)) {
          store.set(key, { ...doc, ...(update.$set || {}) });
          modifiedCount++;
        }
      }
      return { modifiedCount };
    },
    async bulkWrite(operations) {
      for (const op of operations) {
        if (op.updateOne) {
          await this.updateOne(op.updateOne.filter, op.updateOne.update, {
            upsert: Boolean(op.updateOne.upsert),
          });
        }
      }
      return { ok: 1 };
    },
  };
}

async function runTests() {
  console.log('====================================================');
  console.log('Testing Backend 15-Day Job Expiry Service & Scheduler');
  console.log('====================================================');

  assert.strictEqual(JOB_EXPIRY_DAYS, 15, 'JOB_EXPIRY_DAYS must default to 15');

  const baseNow = new Date('2026-11-20T12:00:00.000Z').getTime();

  // Test 1: Exact boundary calculations
  console.log('\n[TEST 1] Boundary expiry calculations...');
  const posted14Days23HoursAgo = new Date(baseNow - (15 * MS_PER_DAY - 60 * 60 * 1000));
  const postedExactly15DaysAgo = new Date(baseNow - 15 * MS_PER_DAY);
  const posted16DaysAgo = new Date(baseNow - 16 * MS_PER_DAY);

  const stillOpen = computeJobExpiry('', posted14Days23HoursAgo, 15, baseNow);
  assert.strictEqual(stillOpen.isOpen, true);
  assert.strictEqual(stillOpen.status, 'Open');
  assert.strictEqual(stillOpen.daysRemaining, 1);

  const exactExpiry = computeJobExpiry('', postedExactly15DaysAgo, 15, baseNow);
  assert.strictEqual(exactExpiry.isOpen, false);
  assert.strictEqual(exactExpiry.status, 'Closed');
  assert.strictEqual(exactExpiry.closedReason, 'expired_15_days');

  const pastExpiry = computeJobExpiry('', posted16DaysAgo, 15, baseNow);
  assert.strictEqual(pastExpiry.isOpen, false);
  assert.strictEqual(pastExpiry.status, 'Closed');
  console.log('✓ Exact 15-day boundary logic verified');

  // Test 2: Existing DB jobs migrating dynamically from 2-day window to 15-day window
  console.log('\n[TEST 2] Existing jobs dynamically updated from 2-day window to 15-day window...');
  const collection = createInMemoryCollection();

  const fiveDaysAgo = new Date(baseNow - 5 * MS_PER_DAY);
  const twentyDaysAgo = new Date(baseNow - 20 * MS_PER_DAY);

  // Seed legacy 2-day job posted 5 days ago (was closed under 2-day rule, should now be Open with 10 days left)
  collection._store.set('job-legacy-5d', {
    jobId: 'job-legacy-5d',
    companyName: 'MUFG',
    designation: 'Data Analyst',
    postedAt: fiveDaysAgo,
    postedTimestamp: fiveDaysAgo.getTime(),
    expiresAt: new Date(fiveDaysAgo.getTime() + 2 * MS_PER_DAY),
    applicationWindowDays: 2,
    isOpen: false,
    status: 'Closed',
    statusLabel: 'Closed',
    rawStatus: '',
  });

  // Seed legacy 2-day job posted 20 days ago (should remain Closed under 15-day rule)
  collection._store.set('job-legacy-20d', {
    jobId: 'job-legacy-20d',
    companyName: 'Old Corp',
    designation: 'BI Engineer',
    postedAt: twentyDaysAgo,
    postedTimestamp: twentyDaysAgo.getTime(),
    expiresAt: new Date(twentyDaysAgo.getTime() + 2 * MS_PER_DAY),
    applicationWindowDays: 2,
    isOpen: false,
    status: 'Closed',
    statusLabel: 'Closed',
    rawStatus: '',
  });

  // Seed explicitly closed job posted 1 day ago (must stay Closed)
  const oneDayAgo = new Date(baseNow - 1 * MS_PER_DAY);
  collection._store.set('job-explicit-closed', {
    jobId: 'job-explicit-closed',
    companyName: 'Closed Corp',
    designation: 'ML Engineer',
    postedAt: oneDayAgo,
    postedTimestamp: oneDayAgo.getTime(),
    expiresAt: new Date(oneDayAgo.getTime() + 2 * MS_PER_DAY),
    applicationWindowDays: 2,
    isOpen: false,
    status: 'Closed',
    statusLabel: 'Closed',
    rawStatus: 'Position Closed',
  });

  const migrationResult = await expireOverdueJobs(collection, { expiryDays: 15, nowMs: baseNow });
  assert.strictEqual(migrationResult.normalizedCount, 3);
  assert.strictEqual(migrationResult.reopenedCount, 1);

  assert.strictEqual(collection._store.get('job-legacy-5d').isOpen, true);
  assert.strictEqual(collection._store.get('job-legacy-5d').status, 'Open');
  assert.strictEqual(collection._store.get('job-legacy-5d').daysRemaining, 10);
  assert.strictEqual(collection._store.get('job-legacy-20d').isOpen, false);
  assert.strictEqual(collection._store.get('job-explicit-closed').isOpen, false);
  console.log('✓ Existing database records dynamically migrated to 15-day expiry rule');

  // Test 3: Newly posted job automatically moves from Active to Closed at exactly 15 days
  console.log('\n[TEST 3] Newly posted job auto-expires in DB at exactly 15 days...');
  const created = await createJobInDatabase(
    collection,
    {
      jobId: 'job-new-1',
      companyName: 'Expleo Group',
      designation: 'AI Engineer',
      experience: '3-5',
      location: 'Mumbai',
      postedAt: new Date(baseNow),
    },
    { expiryDays: 15, nowMs: baseNow }
  );
  assert.strictEqual(created.isOpen, true);
  assert.strictEqual(created.daysRemaining, 15);

  // Advance clock by 14 days -> still Open
  const day14Now = baseNow + 14 * MS_PER_DAY;
  const day14List = await getJobsFromDatabase(collection, { expiryDays: 15, nowMs: day14Now });
  assert(day14List.openJobs.some((j) => j.id === 'job-new-1'), 'Job should still be Open on day 14');
  // Meanwhile job-legacy-5d is now 19 days old -> must be Closed in DB!
  assert(day14List.closedJobs.some((j) => j.id === 'job-legacy-5d'), 'Legacy 5d job must be Closed by day 14+5=19');
  assert.strictEqual(collection._store.get('job-legacy-5d').status, 'Closed');

  // Advance clock to exactly 15 days after posting -> automatically moved to Closed in DB
  const day15Now = baseNow + 15 * MS_PER_DAY;
  const expirySweep = await expireOverdueJobs(collection, { expiryDays: 15, nowMs: day15Now });
  assert.strictEqual(expirySweep.expiredCount, 1);
  assert.strictEqual(collection._store.get('job-new-1').isOpen, false);
  assert.strictEqual(collection._store.get('job-new-1').status, 'Closed');
  assert.strictEqual(collection._store.get('job-new-1').closedReason, 'expired_15_days');

  const day15List = await getJobsFromDatabase(collection, { expiryDays: 15, nowMs: day15Now });
  assert(!day15List.openJobs.some((j) => j.id === 'job-new-1'), 'Expired job must not be in openJobs');
  assert(day15List.closedJobs.some((j) => j.id === 'job-new-1'), 'Expired job must be in closedJobs');
  console.log('✓ Newly posted job automatically transitioned from Active to Closed in DB at 15 days');

  // Test 4: Sheet sync + scheduler lifecycle
  console.log('\n[TEST 4] Sheet sync & scheduler lifecycle...');
  const mockCsv = [
    'Timestamp,Company Name,Job Profile Link,Designation,Experience,Location,Status',
    '15/11/2026 10:00:00,MUFG,https://example.com/job1,Data Analyst,3-5,Bangalore,',
    '01/11/2026 10:00:00,Older Co,https://example.com/job2,Data Scientist,2-4,Pune,',
  ].join('\n');

  const syncCollection = createInMemoryCollection();
  const mockFetch = async () => ({ ok: true, text: async () => mockCsv });
  const syncRes = await syncJobsFromSheet(syncCollection, {
    expiryDays: 15,
    nowMs: baseNow,
    fetchImpl: mockFetch,
  });
  assert.strictEqual(syncRes.syncedCount, 2);

  const syncedList = await getJobsFromDatabase(syncCollection, { expiryDays: 15, nowMs: baseNow });
  assert.strictEqual(syncedList.openJobs.length, 1);
  assert.strictEqual(syncedList.openJobs[0].companyName, 'MUFG');
  assert.strictEqual(syncedList.closedJobs.length, 1);
  assert.strictEqual(syncedList.closedJobs[0].companyName, 'Older Co');

  const scheduler = startJobExpiryScheduler(syncCollection, {
    expiryDays: 15,
    expiryIntervalMs: 60_000,
    syncIntervalMs: 120_000,
    enableSheetSync: false,
    logger: { log() {}, error() {} },
  });
  const manualSweep = await scheduler.runExpiryNow(baseNow + 20 * MS_PER_DAY);
  assert.strictEqual(manualSweep.expiredCount, 1);
  scheduler.stop();
  console.log('✓ Sheet sync and scheduler lifecycle verified');

  console.log('\n====================================================');
  console.log('ALL BACKEND JOB EXPIRY TESTS PASSED! ✓');
  console.log('====================================================');
}

runTests().catch((err) => {
  console.error('Backend job expiry test failed:', err);
  process.exit(1);
});
