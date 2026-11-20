import assert from 'node:assert';
import {
  DEFAULT_APPLICATION_WINDOW_DAYS,
  fetchJobs,
  parseCSV,
  evaluateJobStatus,
  isJobExpired,
} from '../src/services/jobService.ts';
import {
  verifyLmsId,
  validateLmsIdFormat,
  loadStudentRecords,
} from '../src/services/lmsService.ts';

async function runTests() {
  console.log('====================================================');
  console.log('Starting Job Portal & LMS Verification Tests');
  console.log('====================================================');

  // Test 1: CSV Parser
  console.log('\n[TEST 1] CSV Parser with escaped quotes and commas...');
  const sampleCsv = `col1,col2,col3\n"value, with comma","value with ""escaped"" quote",plain`;
  const parsed = parseCSV(sampleCsv);
  assert.strictEqual(parsed.length, 2);
  assert.strictEqual(parsed[1][0], 'value, with comma');
  assert.strictEqual(parsed[1][1], 'value with "escaped" quote');
  assert.strictEqual(parsed[1][2], 'plain');
  console.log('✓ CSV parser works properly');

  // Test 2: Evaluate Job Status Logic
  console.log('\n[TEST 2] Job Status Logic (Open vs Closed & 15-day window)...');
  assert.strictEqual(DEFAULT_APPLICATION_WINDOW_DAYS, 15, 'Default window must be 15 days');
  const nowMs = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const fiveDaysAgo = new Date(nowMs - 5 * dayMs);
  const fourteenDaysAgo = new Date(nowMs - 14 * dayMs);
  const exactlyFifteenDaysAgo = new Date(nowMs - 15 * dayMs);
  const twentyDaysAgo = new Date(nowMs - 20 * dayMs);

  const openFiveDays = evaluateJobStatus('Interested in Vendors only', fiveDaysAgo, DEFAULT_APPLICATION_WINDOW_DAYS, nowMs);
  assert.strictEqual(openFiveDays.isOpen, true);
  assert.strictEqual(openFiveDays.statusLabel, 'Open');
  assert.strictEqual(openFiveDays.daysRemaining, 10);

  const openFourteenDays = evaluateJobStatus('', fourteenDaysAgo, DEFAULT_APPLICATION_WINDOW_DAYS, nowMs);
  assert.strictEqual(openFourteenDays.isOpen, true);
  assert.strictEqual(openFourteenDays.statusLabel, 'Open');
  assert.strictEqual(openFourteenDays.daysRemaining, 1);

  const closedByExplicitStatus = evaluateJobStatus('Position closed', fiveDaysAgo, DEFAULT_APPLICATION_WINDOW_DAYS, nowMs);
  assert.strictEqual(closedByExplicitStatus.isOpen, false);
  assert.strictEqual(closedByExplicitStatus.statusLabel, 'Closed');

  const closedExactlyFifteenDays = evaluateJobStatus('Interested in Vendors only', exactlyFifteenDaysAgo, DEFAULT_APPLICATION_WINDOW_DAYS, nowMs);
  assert.strictEqual(closedExactlyFifteenDays.isOpen, false);
  assert.strictEqual(closedExactlyFifteenDays.statusLabel, 'Closed');
  assert.strictEqual(closedExactlyFifteenDays.daysRemaining, 0);

  const closedByDeadline = evaluateJobStatus('Interested in Vendors only', twentyDaysAgo, DEFAULT_APPLICATION_WINDOW_DAYS, nowMs);
  assert.strictEqual(closedByDeadline.isOpen, false);
  assert.strictEqual(closedByDeadline.statusLabel, 'Closed');

  assert.strictEqual(
    isJobExpired({ isOpen: true, postedTimestamp: fiveDaysAgo.getTime(), expiresAt: openFiveDays.expiresAt }, nowMs),
    false
  );
  assert.strictEqual(
    isJobExpired({ isOpen: true, postedTimestamp: exactlyFifteenDaysAgo.getTime(), expiresAt: closedExactlyFifteenDays.expiresAt }, nowMs),
    true
  );
  console.log('✓ Job status evaluation correctly enforces Open, Explicit Closed, and exact 15-day Deadline Closed');

  // Test 3: Fetch Real Google Sheet Jobs
  console.log('\n[TEST 3] Fetching and parsing live Jobs Google Sheet...');
  const jobsData = await fetchJobs(true);
  console.log(`Total jobs found: ${jobsData.totalCount}`);
  console.log(`Open jobs: ${jobsData.openJobs.length}`);
  console.log(`Closed jobs: ${jobsData.closedJobs.length}`);

  assert(jobsData.totalCount > 0, 'Should load jobs from sheet');
  assert(jobsData.openJobs.length >= 0, 'Open jobs array exists');
  assert(jobsData.closedJobs.length >= 0, 'Closed jobs array exists');

  // Verify fields on a sample job
  const sampleJob = jobsData.openJobs[0] || jobsData.closedJobs[0];
  console.log('\nSample job fields:');
  console.log({
    id: sampleJob.id,
    company: sampleJob.companyName,
    designation: sampleJob.designation,
    experience: sampleJob.experience,
    location: sampleJob.location,
    jobProfileUrl: sampleJob.jobProfileUrl ? sampleJob.jobProfileUrl.slice(0, 40) + '...' : 'N/A',
    isOpen: sampleJob.isOpen,
    statusLabel: sampleJob.statusLabel,
  });

  assert(sampleJob.companyName, 'Job must have companyName');
  assert(sampleJob.designation, 'Job must have designation');
  assert(sampleJob.experience, 'Job must have experience');
  assert(sampleJob.location, 'Job must have location');
  console.log('✓ Public fields properly formatted and sanitized');

  // Test 4: LMS Students Sheet Fetch & Verification
  console.log('\n[TEST 4] Fetching live LMS Students Google Sheet & Indexing...');
  const studentsMap = await loadStudentRecords(true);
  console.log(`Total active students indexed: ${studentsMap.size}`);
  assert(studentsMap.size > 0, 'Should load student records from LMS sheet');

  // Test 5: LMS ID format validation
  console.log('\n[TEST 5] LMS ID format validation...');
  assert.strictEqual(validateLmsIdFormat('').isValid, false);
  assert.strictEqual(validateLmsIdFormat('abc').isValid, false);
  assert.strictEqual(validateLmsIdFormat('BLR202407003').isValid, true);
  console.log('✓ LMS ID format validation functioning correctly');

  // Test 6: Verify Valid LMS ID (Case insensitive)
  console.log('\n[TEST 6] Verifying valid LMS ID...');
  const validRes = await verifyLmsId('BLR202407003');
  assert.strictEqual(validRes.success, true);
  assert(validRes.student, 'Should return student info');
  assert.strictEqual(validRes.student.stuId, 'BLR202407003');
  console.log(`✓ Successfully verified: ${validRes.student.studentName} (${validRes.student.stuId})`);

  // Verify case insensitivity (lowercase input)
  const lowerRes = await verifyLmsId('blr202407003');
  assert.strictEqual(lowerRes.success, true);
  console.log('✓ Case-insensitive lookup verified');

  // Test 7: Verify Invalid LMS ID
  console.log('\n[TEST 7] Verifying invalid LMS ID rejection...');
  const invalidRes = await verifyLmsId('BLR999999999');
  assert.strictEqual(invalidRes.success, false);
  assert.strictEqual(invalidRes.errorMessage, 'Invalid LMS ID. Please check your LMS ID and try again.');
  console.log('✓ Invalid LMS ID properly rejected with user-friendly error message');

  // Test 8: Data Privacy Check (Financial data is strictly omitted)
  console.log('\n[TEST 8] Data Privacy Check...');
  const sampleStudent = validRes.student;
  assert.strictEqual(sampleStudent.tuitionFee, undefined);
  assert.strictEqual(sampleStudent.balance, undefined);
  assert.strictEqual(sampleStudent.committedFee, undefined);
  assert.strictEqual(sampleStudent.salesConsultant, undefined);
  console.log('✓ Verified: No confidential financial or internal sales data is exposed in student object');

  console.log('\n====================================================');
  console.log('ALL TESTS PASSED SUCCESSFULLY! ✓');
  console.log('====================================================');
}

runTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
