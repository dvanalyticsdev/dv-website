export const JOB_EXPIRY_DAYS = Math.max(1, Number(process.env.JOB_EXPIRY_DAYS || 15));
export const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const JOBS_COLLECTION_NAME = 'jobs';

export const JOBS_SHEET_CSV_URL =
  process.env.JOBS_SHEET_CSV_URL ||
  'https://docs.google.com/spreadsheets/d/1WR4UUthfqDC40g_oBdn2uSAAmv_lfIVAP8Sg1X24hc0/export?format=csv&gid=1959589469';

export const EXPLICIT_CLOSED_KEYWORDS = [
  'position closed',
  'closed',
  'not interested',
  'not looking for any cv or vendors',
  'already have vendors',
  'they already have vendors',
];

/**
 * Robust CSV parser that handles escaped quotes and commas within cells.
 */
export function parseCSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((cell) => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((cell) => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Parse date strings like "02/09/2026 11:56:24" (DD/MM/YYYY HH:mm:ss), ISO dates, Date objects, or timestamps.
 */
export function parseDateString(dateInput) {
  if (dateInput instanceof Date) {
    return Number.isNaN(dateInput.getTime()) ? null : dateInput;
  }
  if (typeof dateInput === 'number' && Number.isFinite(dateInput) && dateInput > 0) {
    const parsed = new Date(dateInput);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  if (!dateInput || typeof dateInput !== 'string' || !dateInput.trim()) return null;

  const trimmed = dateInput.trim();
  const ddmmyyyyMatch = trimmed.match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/
  );
  if (ddmmyyyyMatch) {
    const day = parseInt(ddmmyyyyMatch[1], 10);
    const month = parseInt(ddmmyyyyMatch[2], 10) - 1;
    const year = parseInt(ddmmyyyyMatch[3], 10);
    const hour = ddmmyyyyMatch[4] ? parseInt(ddmmyyyyMatch[4], 10) : 0;
    const minute = ddmmyyyyMatch[5] ? parseInt(ddmmyyyyMatch[5], 10) : 0;
    const second = ddmmyyyyMatch[6] ? parseInt(ddmmyyyyMatch[6], 10) : 0;
    return new Date(year, month, day, hour, minute, second);
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Format date for friendly UI display (e.g. "Nov 15, 2026").
 */
export function formatDisplayDate(date) {
  if (!date) return 'Recently';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Generate a clean, stable job ID compatible with the frontend.
 */
export function generateJobId(company, designation, index) {
  const cleanComp = String(company || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 20);
  const cleanDesig = String(designation || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 25);
  return `job-${cleanComp}-${cleanDesig}-${index}`;
}

export function isExplicitlyClosedStatus(statusCell) {
  const normalizedStatus = String(statusCell || '').toLowerCase().trim();
  return EXPLICIT_CLOSED_KEYWORDS.some((keyword) => normalizedStatus.includes(keyword));
}

/**
 * Compute Open/Closed status, remaining days, and exact expiry timestamp based on original posting date.
 */
export function computeJobExpiry(
  rawStatus,
  postedDate,
  expiryDays = JOB_EXPIRY_DAYS,
  nowMs = Date.now()
) {
  const windowMs = expiryDays * MS_PER_DAY;
  const postedTimestamp = postedDate ? postedDate.getTime() : 0;
  const expiresAtTimestamp = postedTimestamp > 0 ? postedTimestamp + windowMs : null;
  const expiresAt = expiresAtTimestamp ? new Date(expiresAtTimestamp) : null;

  if (isExplicitlyClosedStatus(rawStatus)) {
    return {
      isOpen: false,
      status: 'Closed',
      statusLabel: 'Closed',
      daysRemaining: 0,
      expiresAt,
      expiresAtTimestamp,
      closedReason: 'explicit_status',
    };
  }

  if (expiresAtTimestamp !== null) {
    const diffMs = expiresAtTimestamp - nowMs;
    if (diffMs <= 0) {
      return {
        isOpen: false,
        status: 'Closed',
        statusLabel: 'Closed',
        daysRemaining: 0,
        expiresAt,
        expiresAtTimestamp,
        closedReason: 'expired_15_days',
      };
    }

    const daysRemaining = Math.max(1, Math.ceil(diffMs / MS_PER_DAY));
    return {
      isOpen: true,
      status: 'Open',
      statusLabel: 'Open',
      daysRemaining,
      expiresAt,
      expiresAtTimestamp,
      closedReason: null,
    };
  }

  return {
    isOpen: true,
    status: 'Open',
    statusLabel: 'Open',
    daysRemaining: expiryDays,
    expiresAt: null,
    expiresAtTimestamp: null,
    closedReason: null,
  };
}

/**
 * Parse Google Sheets CSV text into normalized MongoDB job documents.
 */
export function parseJobsFromCsv(csvText, expiryDays = JOB_EXPIRY_DAYS, nowMs = Date.now()) {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.toLowerCase().trim());
  const colTimestamp = header.findIndex((h) => h.includes('timestamp') || h === 'date');
  const colCompany = header.findIndex((h) => h.includes('company'));
  const colLink = header.findIndex(
    (h) => (h.includes('job profile') && h.includes('link')) || (h.includes('link') && !h.includes('hr'))
  );
  const colDesignation = header.findIndex(
    (h) =>
      h === 'designation' ||
      (h.includes('designation') && !h.includes('profile')) ||
      (h.includes('role') && !h.includes('profile'))
  );
  const colExp = header.findIndex((h) => h.includes('experience') || h === 'exp');
  const colLocation = header.findIndex((h) => h.includes('location') || h.includes('city'));
  const colStatus = header.findIndex((h) => h === 'status');

  const nowDate = new Date(nowMs);
  const docs = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 3) continue;

    const company = (colCompany >= 0 ? row[colCompany] : row[1]) || '';
    const designation = (colDesignation >= 0 ? row[colDesignation] : row[8]) || '';
    if (!company.trim() || !designation.trim()) continue;

    const rawDateStr = colTimestamp >= 0 ? row[colTimestamp] : row[0];
    const parsedDate = parseDateString(rawDateStr);
    const rawLink = (colLink >= 0 ? row[colLink] : row[7]) || '';
    const experience = (colExp >= 0 ? row[colExp] : row[9]) || 'Not Specified';
    const location = (colLocation >= 0 ? row[colLocation] : row[12]) || 'Flexible / Pan India';
    const rawStatus = (colStatus >= 0 ? row[colStatus] : row[14]) || '';

    let jobProfileUrl = '';
    if (rawLink.startsWith('http://') || rawLink.startsWith('https://')) {
      jobProfileUrl = rawLink.trim();
    }

    const expiry = computeJobExpiry(rawStatus, parsedDate, expiryDays, nowMs);
    const jobId = generateJobId(company, designation, i);

    docs.push({
      jobId,
      companyName: company.trim(),
      designation: designation.trim(),
      experience: experience.trim(),
      location: location.trim(),
      jobProfileUrl,
      postedDate: formatDisplayDate(parsedDate),
      postedAt: parsedDate,
      postedTimestamp: parsedDate ? parsedDate.getTime() : 0,
      expiresAt: expiry.expiresAt,
      expiresAtTimestamp: expiry.expiresAtTimestamp,
      applicationWindowDays: expiryDays,
      isOpen: expiry.isOpen,
      status: expiry.status,
      statusLabel: expiry.statusLabel,
      rawStatus: rawStatus.trim(),
      daysRemaining: expiry.daysRemaining,
      closedReason: expiry.closedReason,
      expiredAt: expiry.closedReason === 'expired_15_days' ? nowDate : null,
      source: 'google_sheet',
      syncedAt: nowDate,
      updatedAt: nowDate,
    });
  }

  return docs;
}

/**
 * Create required MongoDB indexes for efficient expiry sweeps and sorting.
 */
export async function ensureJobsIndexes(jobsCollection) {
  await jobsCollection.createIndex({ jobId: 1 }, { unique: true, name: 'jobId_unique' });
  await jobsCollection.createIndex({ isOpen: 1, expiresAt: 1 }, { name: 'jobs_open_expiresAt' });
  await jobsCollection.createIndex({ postedTimestamp: -1 }, { name: 'jobs_postedTimestamp_desc' });
}

/**
 * Sync jobs from the Google Sheet into MongoDB, preserving posting dates and recalculating 15-day expiry.
 */
export async function syncJobsFromSheet(jobsCollection, options = {}) {
  const {
    sheetUrl = JOBS_SHEET_CSV_URL,
    expiryDays = JOB_EXPIRY_DAYS,
    nowMs = Date.now(),
    fetchImpl = fetch,
  } = options;

  const fetchUrl = `${sheetUrl}${sheetUrl.includes('?') ? '&' : '?'}_t=${nowMs}`;
  const response = await fetchImpl(fetchUrl, {
    method: 'GET',
    headers: {
      Accept: 'text/csv,text/plain,*/*',
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs sheet: HTTP ${response.status}`);
  }

  const csvText = await response.text();
  const docs = parseJobsFromCsv(csvText, expiryDays, nowMs);

  if (docs.length > 0) {
    const operations = docs.map((doc) => ({
      updateOne: {
        filter: { jobId: doc.jobId },
        update: {
          $set: doc,
          $setOnInsert: { createdAt: new Date(nowMs) },
        },
        upsert: true,
      },
    }));
    await jobsCollection.bulkWrite(operations, { ordered: false });
  }

  return { syncedCount: docs.length, syncedAt: nowMs };
}

/**
 * Dynamically evaluate and update job expiry across ALL existing and newly posted jobs in MongoDB.
 * - Normalizes any existing jobs saved under an older expiry window (e.g. 2 days -> 15 days).
 * - Atomically moves every open job past its 15-day expiry window from Active (Open) to Closed.
 */
export async function expireOverdueJobs(jobsCollection, options = {}) {
  const {
    expiryDays = JOB_EXPIRY_DAYS,
    nowMs = Date.now(),
  } = options;

  const nowDate = new Date(nowMs);
  const windowMs = expiryDays * MS_PER_DAY;
  const cutoffTimestamp = nowMs - windowMs;

  // 1. Re-evaluate existing jobs whose stored window differs from current 15-day policy or lacks expiresAt
  const staleWindowJobs = await jobsCollection
    .find({
      $or: [
        { applicationWindowDays: { $ne: expiryDays } },
        { expiresAt: null, postedTimestamp: { $gt: 0 } },
        { expiresAt: { $exists: false }, postedTimestamp: { $gt: 0 } },
      ],
    })
    .toArray();

  let normalizedCount = 0;
  let reopenedCount = 0;

  if (staleWindowJobs.length > 0) {
    const normalizeOps = [];
    for (const job of staleWindowJobs) {
      const postedDate = parseDateString(job.postedAt || job.postedTimestamp || job.postedDate);
      const expiry = computeJobExpiry(job.rawStatus || '', postedDate, expiryDays, nowMs);
      if (!job.isOpen && expiry.isOpen) {
        reopenedCount++;
      }
      normalizeOps.push({
        updateOne: {
          filter: { jobId: job.jobId },
          update: {
            $set: {
              postedAt: postedDate,
              postedTimestamp: postedDate ? postedDate.getTime() : 0,
              expiresAt: expiry.expiresAt,
              expiresAtTimestamp: expiry.expiresAtTimestamp,
              applicationWindowDays: expiryDays,
              isOpen: expiry.isOpen,
              status: expiry.status,
              statusLabel: expiry.statusLabel,
              daysRemaining: expiry.daysRemaining,
              closedReason: expiry.closedReason,
              expiredAt: expiry.closedReason === 'expired_15_days' ? nowDate : null,
              updatedAt: nowDate,
            },
          },
        },
      });
    }
    if (normalizeOps.length > 0) {
      await jobsCollection.bulkWrite(normalizeOps, { ordered: false });
      normalizedCount = normalizeOps.length;
    }
  }

  // 2. Atomically expire all currently Open jobs that have reached or passed 15 days from posting date
  const expireResult = await jobsCollection.updateMany(
    {
      isOpen: true,
      $or: [
        { expiresAt: { $lte: nowDate } },
        { postedTimestamp: { $gt: 0, $lte: cutoffTimestamp } },
      ],
    },
    {
      $set: {
        isOpen: false,
        status: 'Closed',
        statusLabel: 'Closed',
        daysRemaining: 0,
        closedReason: 'expired_15_days',
        expiredAt: nowDate,
        updatedAt: nowDate,
        applicationWindowDays: expiryDays,
      },
    }
  );

  return {
    expiredCount: expireResult.modifiedCount || 0,
    normalizedCount,
    reopenedCount,
    checkedAt: nowMs,
  };
}

/**
 * Create a new job directly in MongoDB with automatic 15-day expiry calculation.
 */
export async function createJobInDatabase(jobsCollection, input = {}, options = {}) {
  const { expiryDays = JOB_EXPIRY_DAYS, nowMs = Date.now() } = options;
  const nowDate = new Date(nowMs);
  const companyName = String(input.companyName || '').trim();
  const designation = String(input.designation || '').trim();

  if (!companyName || !designation) {
    throw new Error('companyName and designation are required.');
  }

  const postedDate = parseDateString(input.postedAt || input.postedTimestamp || input.postedDate) || nowDate;
  const rawStatus = String(input.rawStatus || input.status || '').trim();
  const expiry = computeJobExpiry(rawStatus, postedDate, expiryDays, nowMs);
  const jobId =
    String(input.jobId || input.id || '').trim() ||
    generateJobId(companyName, designation, nowMs);

  const rawLink = String(input.jobProfileUrl || '').trim();
  const jobProfileUrl =
    rawLink.startsWith('http://') || rawLink.startsWith('https://') ? rawLink : '';

  const doc = {
    jobId,
    companyName,
    designation,
    experience: String(input.experience || 'Not Specified').trim(),
    location: String(input.location || 'Flexible / Pan India').trim(),
    jobProfileUrl,
    postedDate: formatDisplayDate(postedDate),
    postedAt: postedDate,
    postedTimestamp: postedDate.getTime(),
    expiresAt: expiry.expiresAt,
    expiresAtTimestamp: expiry.expiresAtTimestamp,
    applicationWindowDays: expiryDays,
    isOpen: expiry.isOpen,
    status: expiry.status,
    statusLabel: expiry.statusLabel,
    rawStatus,
    daysRemaining: expiry.daysRemaining,
    closedReason: expiry.closedReason,
    expiredAt: expiry.closedReason === 'expired_15_days' ? nowDate : null,
    source: 'api',
    createdAt: nowDate,
    updatedAt: nowDate,
  };

  await jobsCollection.updateOne({ jobId }, { $set: doc }, { upsert: true });
  return formatJobForApi(doc, expiryDays, nowMs);
}

/**
 * Map a MongoDB job document to the frontend JobListing response shape.
 */
export function formatJobForApi(doc, expiryDays = JOB_EXPIRY_DAYS, nowMs = Date.now()) {
  const postedDate = parseDateString(doc.postedAt || doc.postedTimestamp);
  const expiry = computeJobExpiry(doc.rawStatus || '', postedDate, expiryDays, nowMs);
  const isOpen = Boolean(doc.isOpen) && expiry.isOpen;

  return {
    id: doc.jobId,
    companyName: doc.companyName,
    designation: doc.designation,
    experience: doc.experience || 'Not Specified',
    location: doc.location || 'Flexible / Pan India',
    jobProfileUrl: doc.jobProfileUrl || '',
    postedDate: doc.postedDate || formatDisplayDate(postedDate),
    postedTimestamp: doc.postedTimestamp || (postedDate ? postedDate.getTime() : 0),
    expiresAt: expiry.expiresAtTimestamp || undefined,
    isOpen,
    statusLabel: isOpen ? 'Open' : 'Closed',
    rawStatus: doc.rawStatus || '',
    daysRemaining: isOpen ? expiry.daysRemaining : 0,
  };
}

/**
 * Retrieve all jobs from MongoDB after ensuring overdue jobs are expired.
 */
export async function getJobsFromDatabase(jobsCollection, options = {}) {
  const { expiryDays = JOB_EXPIRY_DAYS, nowMs = Date.now() } = options;

  await expireOverdueJobs(jobsCollection, { expiryDays, nowMs });

  const docs = await jobsCollection.find({}).sort({ postedTimestamp: -1 }).toArray();
  const openJobs = [];
  const closedJobs = [];

  for (const doc of docs) {
    const formatted = formatJobForApi(doc, expiryDays, nowMs);
    if (formatted.isOpen) {
      openJobs.push(formatted);
    } else {
      closedJobs.push(formatted);
    }
  }

  openJobs.sort((a, b) => b.postedTimestamp - a.postedTimestamp);
  closedJobs.sort((a, b) => b.postedTimestamp - a.postedTimestamp);

  return {
    openJobs,
    closedJobs,
    lastUpdated: nowMs,
    totalCount: openJobs.length + closedJobs.length,
    applicationWindowDays: expiryDays,
  };
}

/**
 * Start the automated backend scheduler that periodically:
 * 1. Expires any job whose original posting date is >= 15 days old directly in MongoDB.
 * 2. Syncs newly posted / updated jobs from the Google Sheet into MongoDB.
 */
export function startJobExpiryScheduler(jobsCollection, options = {}) {
  const {
    expiryDays = JOB_EXPIRY_DAYS,
    expiryIntervalMs = Math.max(10_000, Number(process.env.JOB_EXPIRY_INTERVAL_MS || 5 * 60 * 1000)),
    syncIntervalMs = Math.max(60_000, Number(process.env.JOB_SYNC_INTERVAL_MS || 15 * 60 * 1000)),
    enableSheetSync = true,
    logger = console,
    fetchImpl = fetch,
  } = options;

  let expiryInFlight = false;
  let syncInFlight = false;

  const runExpiryNow = async (nowMs = Date.now()) => {
    if (expiryInFlight) return null;
    expiryInFlight = true;
    try {
      const result = await expireOverdueJobs(jobsCollection, { expiryDays, nowMs });
      if (result.expiredCount > 0 || result.normalizedCount > 0) {
        logger.log(
          `[job-expiry-scheduler] Sweep completed: expired=${result.expiredCount}, normalized=${result.normalizedCount}, reopened=${result.reopenedCount} (window=${expiryDays}d)`
        );
      }
      return result;
    } catch (error) {
      logger.error('[job-expiry-scheduler] Expiry sweep failed:', error);
      return null;
    } finally {
      expiryInFlight = false;
    }
  };

  const runSyncNow = async (nowMs = Date.now()) => {
    if (!enableSheetSync || syncInFlight) return null;
    syncInFlight = true;
    try {
      const syncResult = await syncJobsFromSheet(jobsCollection, { expiryDays, nowMs, fetchImpl });
      const expiryResult = await expireOverdueJobs(jobsCollection, { expiryDays, nowMs });
      logger.log(
        `[job-expiry-scheduler] Sheet sync completed: synced=${syncResult.syncedCount}, expired=${expiryResult.expiredCount} (window=${expiryDays}d)`
      );
      return { syncResult, expiryResult };
    } catch (error) {
      logger.error('[job-expiry-scheduler] Sheet sync failed:', error);
      // Still run expiry sweep against existing DB records even if sheet fetch fails
      await runExpiryNow(nowMs);
      return null;
    } finally {
      syncInFlight = false;
    }
  };

  // Initial startup run (non-blocking)
  void runSyncNow();

  const expiryTimer = setInterval(() => {
    void runExpiryNow();
  }, expiryIntervalMs);

  const syncTimer = enableSheetSync
    ? setInterval(() => {
        void runSyncNow();
      }, syncIntervalMs)
    : null;

  return {
    runExpiryNow,
    runSyncNow,
    stop() {
      clearInterval(expiryTimer);
      if (syncTimer) clearInterval(syncTimer);
    },
  };
}
