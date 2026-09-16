import { parseCSV } from './jobService.ts';

export interface VerifiedStudent {
  stuId: string;
  studentName: string;
  email: string;
  phone: string;
  course?: string;
}

export interface LmsVerificationResult {
  success: boolean;
  student?: VerifiedStudent;
  errorMessage?: string;
}

export const LMS_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1z7897mcMyPRWyvRiXG5tPziXkLnkaE_6/export?format=csv';

// Cache for student records (keyed by lowercased STU_ID)
let studentRecordsCache: Map<string, VerifiedStudent> | null = null;
let lastLmsCacheTime = 0;
const LMS_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch and index student records from the Google Sheet
 */
export async function loadStudentRecords(forceRefresh = false): Promise<Map<string, VerifiedStudent>> {
  const now = Date.now();
  if (!forceRefresh && studentRecordsCache && now - lastLmsCacheTime < LMS_CACHE_TTL_MS) {
    return studentRecordsCache;
  }

  try {
    const fetchUrl = `${LMS_SHEET_CSV_URL}&_t=${now}`;
    const response = await fetch(fetchUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'text/csv,text/plain,*/*',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load LMS students sheet: HTTP ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      studentRecordsCache = new Map();
      lastLmsCacheTime = now;
      return studentRecordsCache;
    }

    const header = rows[0].map((h) => h.toLowerCase().trim());
    const colId = header.findIndex((h) => h === 'stu_id' || h.includes('student id') || h === 'lms_id');
    const colName = header.findIndex((h) => h === 'stu_name' || h.includes('name'));
    const colEmail = header.findIndex((h) => h.includes('email') || h.includes('mail'));
    const colPhone = header.findIndex((h) => h.includes('mobile') || h.includes('phone'));
    const colCourse = header.findIndex((h) => h === 'course' || h.includes('program'));

    const map = new Map<string, VerifiedStudent>();

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 1) continue;

      const rawId = (colId >= 0 ? row[colId] : row[0]) || '';
      const cleanId = rawId.trim();

      if (!cleanId) continue;

      const name = (colName >= 0 ? row[colName] : row[4]) || '';
      const email = (colEmail >= 0 ? row[colEmail] : row[5]) || '';
      const phone = (colPhone >= 0 ? row[colPhone] : row[6]) || '';
      const course = (colCourse >= 0 ? row[colCourse] : row[8]) || '';

      // Only store public applicant profile information, NEVER store financial or sales columns
      const record: VerifiedStudent = {
        stuId: cleanId.toUpperCase(),
        studentName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        course: course.trim(),
      };

      // Index by lowercased ID for case-insensitive lookup
      map.set(cleanId.toLowerCase(), record);
    }

    studentRecordsCache = map;
    lastLmsCacheTime = now;
    return map;
  } catch (error) {
    console.error('Error fetching LMS sheet:', error);
    if (studentRecordsCache) {
      return studentRecordsCache;
    }
    throw error;
  }
}

/**
 * Validate LMS ID format
 */
export function validateLmsIdFormat(lmsId: string): { isValid: boolean; message?: string } {
  const trimmed = (lmsId || '').trim();
  if (!trimmed) {
    return { isValid: false, message: 'Please enter your LMS ID.' };
  }

  // LMS IDs are typically alphanumeric, e.g. BLR202407003
  if (trimmed.length < 4 || !/^[A-Za-z0-9_-]+$/.test(trimmed)) {
    return { isValid: false, message: 'Please enter a valid LMS ID format (letters and numbers only).' };
  }

  return { isValid: true };
}

/**
 * Verify LMS ID against the student directory
 */
export async function verifyLmsId(lmsId: string): Promise<LmsVerificationResult> {
  const formatCheck = validateLmsIdFormat(lmsId);
  if (!formatCheck.isValid) {
    return {
      success: false,
      errorMessage: formatCheck.message,
    };
  }

  const cleanId = lmsId.trim().toLowerCase();

  try {
    const studentsMap = await loadStudentRecords();
    const student = studentsMap.get(cleanId);

    if (!student) {
      return {
        success: false,
        errorMessage: 'Invalid LMS ID. Please check your LMS ID and try again.',
      };
    }

    return {
      success: true,
      student,
    };
  } catch (error) {
    console.error('Verification failure:', error);
    return {
      success: false,
      errorMessage: 'Verification service is temporarily unavailable. Please try again shortly.',
    };
  }
}
