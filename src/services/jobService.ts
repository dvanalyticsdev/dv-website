export interface JobListing {
  id: string;
  companyName: string;
  designation: string;
  experience: string;
  location: string;
  jobProfileUrl: string;
  postedDate: string; // formatted date
  postedTimestamp: number;
  isOpen: boolean;
  statusLabel: 'Open' | 'Closed';
  rawStatus?: string;
  daysRemaining?: number;
}

export interface JobsDataResponse {
  openJobs: JobListing[];
  closedJobs: JobListing[];
  lastUpdated: number;
  totalCount: number;
}

export const JOBS_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1WR4UUthfqDC40g_oBdn2uSAAmv_lfIVAP8Sg1X24hc0/export?format=csv&gid=1959589469';

// Configurable default application period in days
export const DEFAULT_APPLICATION_WINDOW_DAYS = 2;

// In-memory cache with 5-minute TTL
let cachedJobsData: JobsDataResponse | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Robust CSV parser that correctly handles escaped quotes and commas within cells
 */
export function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // handle CRLF
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
 * Parse date strings like "02/09/2026 11:56:24" (DD/MM/YYYY HH:mm:ss) or standard ISO dates
 */
export function parseDateString(dateStr: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null;

  const trimmed = dateStr.trim();

  // Pattern: DD/MM/YYYY or DD/MM/YYYY HH:mm:ss or DD-MM-YYYY
  const ddmmyyyyMatch = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
  if (ddmmyyyyMatch) {
    const day = parseInt(ddmmyyyyMatch[1], 10);
    const month = parseInt(ddmmyyyyMatch[2], 10) - 1; // 0-indexed
    const year = parseInt(ddmmyyyyMatch[3], 10);
    const hour = ddmmyyyyMatch[4] ? parseInt(ddmmyyyyMatch[4], 10) : 0;
    const minute = ddmmyyyyMatch[5] ? parseInt(ddmmyyyyMatch[5], 10) : 0;
    const second = ddmmyyyyMatch[6] ? parseInt(ddmmyyyyMatch[6], 10) : 0;
    return new Date(year, month, day, hour, minute, second);
  }

  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Determine whether a job is Open or Closed based on explicit status & date logic
 */
export function evaluateJobStatus(
  statusCell: string,
  postedDate: Date | null,
  applicationWindowDays = DEFAULT_APPLICATION_WINDOW_DAYS
): { isOpen: boolean; statusLabel: 'Open' | 'Closed'; daysRemaining?: number } {
  const normalizedStatus = (statusCell || '').toLowerCase().trim();

  // Explicit closed markers
  const explicitClosedKeywords = [
    'position closed',
    'closed',
    'not interested',
    'not looking for any cv or vendors',
    'already have vendors',
    'they already have vendors',
  ];

  const isExplicitlyClosed = explicitClosedKeywords.some((keyword) => normalizedStatus.includes(keyword));
  if (isExplicitlyClosed) {
    return { isOpen: false, statusLabel: 'Closed' };
  }

  // If we have a valid posting date, check against the configured application window
  if (postedDate) {
    const now = Date.now();
    const windowMs = applicationWindowDays * 24 * 60 * 60 * 1000;
    const deadlineMs = postedDate.getTime() + windowMs;
    const diffMs = deadlineMs - now;

    if (diffMs <= 0) {
      return { isOpen: false, statusLabel: 'Closed' };
    }

    const daysRemaining = Math.max(1, Math.ceil(diffMs / (24 * 60 * 60 * 1000)));
    return { isOpen: true, statusLabel: 'Open', daysRemaining };
  }

  // Default fallback if no date: open with default window
  return { isOpen: true, statusLabel: 'Open', daysRemaining: applicationWindowDays };
}

/**
 * Generate a clean, unique job ID
 */
function generateJobId(company: string, designation: string, index: number): string {
  const cleanComp = company.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 20);
  const cleanDesig = designation.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 25);
  return `job-${cleanComp}-${cleanDesig}-${index}`;
}

/**
 * Format date for friendly UI display (e.g. "Sep 15, 2026")
 */
export function formatDisplayDate(date: Date | null): string {
  if (!date) return 'Recently';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Fetch and parse jobs from the Google Sheet
 */
export async function fetchJobs(forceRefresh = false): Promise<JobsDataResponse> {
  const now = Date.now();
  if (!forceRefresh && cachedJobsData && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedJobsData;
  }

  try {
    const fetchUrl = `${JOBS_SHEET_CSV_URL}&_t=${now}`;
    const response = await fetch(fetchUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'text/csv,text/plain,*/*',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs sheet: HTTP ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      return { openJobs: [], closedJobs: [], lastUpdated: now, totalCount: 0 };
    }

    const header = rows[0].map((h) => h.toLowerCase().trim());
    
    // Find column indexes flexibly and precisely
    const colTimestamp = header.findIndex((h) => h.includes('timestamp') || h === 'date');
    const colCompany = header.findIndex((h) => h.includes('company'));
    const colLink = header.findIndex(
      (h) => (h.includes('job profile') && h.includes('link')) || (h.includes('link') && !h.includes('hr'))
    );
    const colDesignation = header.findIndex(
      (h) => h === 'designation' || (h.includes('designation') && !h.includes('profile')) || (h.includes('role') && !h.includes('profile'))
    );
    const colExp = header.findIndex((h) => h.includes('experience') || h === 'exp');
    const colLocation = header.findIndex((h) => h.includes('location') || h.includes('city'));
    const colStatus = header.findIndex((h) => h === 'status');

    const openJobs: JobListing[] = [];
    const closedJobs: JobListing[] = [];

    // Parse data rows
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 3) continue;

      const company = (colCompany >= 0 ? row[colCompany] : row[1]) || '';
      const designation = (colDesignation >= 0 ? row[colDesignation] : row[8]) || '';

      // Skip empty or placeholder rows
      if (!company.trim() || !designation.trim()) continue;

      const rawDateStr = colTimestamp >= 0 ? row[colTimestamp] : row[0];
      const parsedDate = parseDateString(rawDateStr);
      const rawLink = (colLink >= 0 ? row[colLink] : row[7]) || '';
      const experience = (colExp >= 0 ? row[colExp] : row[9]) || 'Not Specified';
      const location = (colLocation >= 0 ? row[colLocation] : row[12]) || 'Flexible / Pan India';
      const rawStatus = (colStatus >= 0 ? row[colStatus] : row[14]) || '';

      // Sanitize external link (only allow http / https)
      let jobProfileUrl = '';
      if (rawLink.startsWith('http://') || rawLink.startsWith('https://')) {
        jobProfileUrl = rawLink.trim();
      }

      const statusResult = evaluateJobStatus(rawStatus, parsedDate, DEFAULT_APPLICATION_WINDOW_DAYS);
      const jobId = generateJobId(company, designation, i);

      const jobListing: JobListing = {
        id: jobId,
        companyName: company.trim(),
        designation: designation.trim(),
        experience: experience.trim(),
        location: location.trim(),
        jobProfileUrl,
        postedDate: formatDisplayDate(parsedDate),
        postedTimestamp: parsedDate ? parsedDate.getTime() : 0,
        isOpen: statusResult.isOpen,
        statusLabel: statusResult.statusLabel,
        rawStatus: rawStatus.trim(),
        daysRemaining: statusResult.daysRemaining,
      };

      if (jobListing.isOpen) {
        openJobs.push(jobListing);
      } else {
        closedJobs.push(jobListing);
      }
    }

    // Sort open jobs: most recently posted first
    openJobs.sort((a, b) => b.postedTimestamp - a.postedTimestamp);
    // Sort closed jobs: most recently posted first
    closedJobs.sort((a, b) => b.postedTimestamp - a.postedTimestamp);

    const result: JobsDataResponse = {
      openJobs,
      closedJobs,
      lastUpdated: now,
      totalCount: openJobs.length + closedJobs.length,
    };

    cachedJobsData = result;
    lastCacheTime = now;
    return result;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // If cache is available, fallback to cache even if expired
    if (cachedJobsData) {
      return cachedJobsData;
    }
    throw error;
  }
}
