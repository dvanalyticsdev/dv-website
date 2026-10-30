export type PageCategory = 'landing-page' | 'seo-landing' | 'course-detail' | 'main-site' | 'enrollment-page' | 'career-page';

export type FormType =
  | 'hero-registration'
  | 'download-brochure'
  | 'free-counselling'
  | 'full-enrollment'

export interface LeadSubmission {
  id: string;
  timestamp: string; // ISO String
  displayTime: string; // Human formatted IST time
  name: string;
  email: string;
  phone: string;
  course: string;
  formType: FormType;
  formLabel: string;
  pageUrl: string;
  pagePath: string;
  pageCategory: PageCategory;
  pageCategoryLabel: string;
  qualification?: string;
  experience?: string;
  state?: string;
  brochurePath?: string;
}

const STORAGE_KEY = 'dv_lead_submissions_v2';
export const DASHBOARD_TOKEN_STORAGE_KEY = 'dv_dashboard_api_token';
const DASHBOARD_API_URL = 'https://tracking-api.dvanalyticsmds.in';

const seoRouteSlugs = new Set([
  'data-analytics-course-bangalore',
  'data-analytics-course-bhubaneswar',
  'data-science-course-bangalore',
  'data-science-course-bhubaneswar',
]);

export const isSeoRoute = (path: string): boolean => {
  const norm = path.toLowerCase().replace(/\/+$/, '') || '/';
  const clean = norm.replace(/^\/+|\/+$/g, '');
  return seoRouteSlugs.has(clean) || (clean.startsWith('data-') && clean.includes('-course-'));
};

export const classifyPage = (path: string): { category: PageCategory; label: string } => {
  const norm = path.toLowerCase().replace(/\/+$/, '') || '/';
  if (norm.startsWith('/lp/')) {
    return { category: 'landing-page', label: 'Story Landing Page' };
  }
  if (isSeoRoute(norm)) {
    return { category: 'seo-landing', label: 'SEO Landing Page' };
  }
  if (norm.startsWith('/courses/')) {
    return { category: 'course-detail', label: 'Course Detail Page' };
  }
  if (norm.startsWith('/enroll')) {
    return { category: 'enrollment-page', label: 'Official Enrollment Page' };
  }
  if (norm.startsWith('/apply-job') || norm.startsWith('/careers')) {
    return { category: 'career-page', label: 'Careers / Hiring Page' };
  }
  return { category: 'main-site', label: 'Main Website Page' };
};

const formatIstDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Realistic Seed Baseline Data focusing strictly on Form Submissions
const generateInitialSeedData = (): LeadSubmission[] => {
  const now = Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const rawSeeds: Array<Omit<LeadSubmission, 'id' | 'timestamp' | 'displayTime' | 'pageCategory' | 'pageCategoryLabel'> & { offsetMs: number }> = [
    {
      offsetMs: 25 * minute,
      name: 'Aditya Narayan Sen',
      email: 'aditya.sen@gmail.com',
      phone: '+91 98301 44521',
      course: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
      formType: 'hero-registration',
      formLabel: 'Landing Page Lead Registration',
      pageUrl: 'https://dvanalyticsmds.in/lp/apids',
      pagePath: '/lp/apids',
      qualification: 'B.Tech/BE (Computer Science)',
      experience: '1-3 years',
      state: 'Karnataka (Bangalore)',
    },
    {
      offsetMs: 1.5 * hour,
      name: 'Priyanka Mohapatra',
      email: 'priyanka.m@outlook.com',
      phone: '+91 94370 88219',
      course: 'Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA)',
      formType: 'download-brochure',
      formLabel: 'Course Brochure Download',
      pageUrl: 'https://dvanalyticsmds.in/lp/apida',
      pagePath: '/lp/apida',
      brochurePath: '/apida-brochure.pdf',
      state: 'Odisha (Bhubaneswar)',
    },
    {
      offsetMs: 3.2 * hour,
      name: 'Vikramaditya Roy',
      email: 'vikram.roy89@gmail.com',
      phone: '+91 97112 39012',
      course: 'AI Forward Deployment Engineer (FDE)',
      formType: 'hero-registration',
      formLabel: 'Landing Page Lead Registration',
      pageUrl: 'https://dvanalyticsmds.in/lp/fde',
      pagePath: '/lp/fde',
      qualification: 'M.Tech/MCA/MSc',
      experience: '3-5 years',
      state: 'Delhi NCR',
    },
    {
      offsetMs: 5.5 * hour,
      name: 'Rohan Deshmukh',
      email: 'rohan.deshmukh@tcs.com',
      phone: '+91 98220 54190',
      course: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
      formType: 'free-counselling',
      formLabel: 'Book Free Counselling',
      pageUrl: 'https://dvanalyticsmds.in/',
      pagePath: '/',
      state: 'Maharashtra (Pune)',
    },
    {
      offsetMs: 9 * hour,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@wipro.com',
      phone: '+91 99490 12845',
      course: 'Data Analytics Specialist (DAS)',
      formType: 'download-brochure',
      formLabel: 'Course Brochure Download',
      pageUrl: 'https://dvanalyticsmds.in/courses/data-analytics-specialist/',
      pagePath: '/courses/data-analytics-specialist/',
      brochurePath: '/data-analytics-specialist-brochure.pdf',
      state: 'Telangana (Hyderabad)',
    },
    {
      offsetMs: 14 * hour,
      name: 'Arindam Ghosh',
      email: 'arindam.ghosh@cognizant.com',
      phone: '+91 98310 99412',
      course: 'Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA)',
      formType: 'hero-registration',
      formLabel: 'Landing Page Lead Registration',
      pageUrl: 'https://dvanalyticsmds.in/lp/apida',
      pagePath: '/lp/apida',
      qualification: 'Working Professional',
      experience: '5-8 years',
      state: 'West Bengal (Kolkata)',
    },
    {
      offsetMs: 1.2 * day,
      name: 'Tanvi Agarwal',
      email: 'tanvi.agarwal@gmail.com',
      phone: '+91 98110 56214',
      course: 'AI Forward Deployment Engineer (FDE)',
      formType: 'download-brochure',
      formLabel: 'Course Brochure Download',
      pageUrl: 'https://dvanalyticsmds.in/courses/ai-forward-deployment-engineer/',
      pagePath: '/courses/ai-forward-deployment-engineer/',
      brochurePath: '/ai-forward-deployment-engineer-brochure.pdf',
      state: 'Delhi NCR',
    },
    {
      offsetMs: 1.8 * day,
      name: 'Manish Kumar Pradhan',
      email: 'manish.pradhan@infosys.com',
      phone: '+91 97760 12384',
      course: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
      formType: 'download-brochure',
      formLabel: 'Course Brochure Download',
      pageUrl: 'https://dvanalyticsmds.in/lp/apids',
      pagePath: '/lp/apids',
      brochurePath: '/APIDS-Brochure.pdf',
      state: 'Odisha (Bhubaneswar)',
    },
    {
      offsetMs: 2.3 * day,
      name: 'Deepak Varma',
      email: 'deepak.varma@accenture.com',
      phone: '+91 98450 77123',
      course: 'AI Integrated Advanced Program in Cybersecurity & Forensics (APCF)',
      formType: 'full-enrollment',
      formLabel: 'Full Course Admission Inquiry',
      pageUrl: 'https://dvanalyticsmds.in/enroll/cybersecurity-forensics',
      pagePath: '/enroll/cybersecurity-forensics',
      qualification: 'B.Tech/BE (IT)',
      experience: '3-5 years',
      state: 'Karnataka (Bangalore)',
    },
    {
      offsetMs: 3.1 * day,
      name: 'Ananya Das',
      email: 'ananya.das@tcs.com',
      phone: '+91 94371 66209',
      course: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
      formType: 'free-counselling',
      formLabel: 'Book Free Counselling',
      pageUrl: 'https://dvanalyticsmds.in/courses/apids/',
      pagePath: '/courses/apids/',
      state: 'Odisha (Cuttack)',
    },
    {
      offsetMs: 4.5 * day,
      name: 'Karan Shah',
      email: 'karan.shah@gmail.com',
      phone: '+91 98200 44102',
      course: 'AI Forward Deployment Engineer (FDE)',
      formType: 'hero-registration',
      formLabel: 'Landing Page Lead Registration',
      pageUrl: 'https://dvanalyticsmds.in/lp/fde',
      pagePath: '/lp/fde',
      qualification: 'B.Tech/BE',
      experience: '0-1 year (Fresher)',
      state: 'Maharashtra (Mumbai)',
    },
    {
      offsetMs: 6.2 * day,
      name: 'Megha Nair',
      email: 'megha.nair@deloitte.com',
      phone: '+91 97410 88921',
      course: 'Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA)',
      formType: 'download-brochure',
      formLabel: 'Course Brochure Download',
      pageUrl: 'https://dvanalyticsmds.in/courses/apida/',
      pagePath: '/courses/apida/',
      brochurePath: '/apida-brochure.pdf',
      state: 'Kerala (Kochi)',
    },
  ];

  return rawSeeds.map((seed, idx) => {
    const d = new Date(now - seed.offsetMs);
    const classification = classifyPage(seed.pagePath);
    return {
      ...seed,
      id: `lead_${idx + 101}`,
      timestamp: d.toISOString(),
      displayTime: formatIstDateTime(d),
      pageCategory: classification.category,
      pageCategoryLabel: classification.label,
    };
  });
};

export const getStoredSubmissions = (): LeadSubmission[] => {
  if (typeof window === 'undefined') return [];
  try {
    const isInitialized = window.localStorage.getItem('dv_leads_initialized');
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null && !isInitialized) window.localStorage.setItem('dv_leads_initialized', 'true');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    return [];
  } catch (e) {
    console.error('Failed to read lead submissions from localStorage', e);
    return [];
  }
};

export const authenticateDashboard = async (pin: string): Promise<boolean> => {
  const response = await fetch(`${DASHBOARD_API_URL}/api/dashboard/auth`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin }),
  });
  if (!response.ok) return false;
  const payload = await response.json() as { token?: string };
  if (!payload.token) return false;
  window.sessionStorage.setItem(DASHBOARD_TOKEN_STORAGE_KEY, payload.token);
  return true;
};

const dashboardHeaders = () => ({ Authorization: `Bearer ${window.sessionStorage.getItem(DASHBOARD_TOKEN_STORAGE_KEY) || ''}` });

export const getRemoteSubmissions = async (): Promise<LeadSubmission[]> => {
  const response = await fetch(`${DASHBOARD_API_URL}/api/dashboard/submissions`, { headers: dashboardHeaders(), credentials: 'include' });
  if (!response.ok) throw new Error('Dashboard records could not be loaded.');
  const payload = await response.json() as { submissions?: Array<LeadSubmission & { submissionId?: string }> };
  return (payload.submissions || []).map((item) => ({ ...item, id: item.id || item.submissionId || `remote_${Date.now()}` }));
};

const syncSubmissionToRemote = async (submission: LeadSubmission): Promise<void> => {
  try {
    await fetch(`${DASHBOARD_API_URL}/api/dashboard/submissions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submission), keepalive: true });
  } catch (error) { console.error('Could not save dashboard submission to the server', error); }
};

export const recordLeadSubmission = (
  payload: Omit<Partial<LeadSubmission>, 'id' | 'timestamp' | 'displayTime' | 'pagePath' | 'pageCategory' | 'pageCategoryLabel'> & {
    formType: FormType;
    formLabel: string;
    course?: string;
  }
): LeadSubmission => {
  const now = new Date();
  const currentPath = window.location.pathname;
  const classification = classifyPage(currentPath);

  const newLead: LeadSubmission = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: now.toISOString(),
    displayTime: formatIstDateTime(now),
    name: (payload.name || 'Anonymous Learner').trim(),
    email: (payload.email || '').trim(),
    phone: (payload.phone || '').trim(),
    course: payload.course || 'Other / General Inquiry',
    formType: payload.formType,
    formLabel: payload.formLabel,
    pageUrl: window.location.href,
    pagePath: currentPath,
    pageCategory: classification.category,
    pageCategoryLabel: classification.label,
    qualification: payload.qualification,
    experience: payload.experience,
    state: payload.state,
    brochurePath: payload.brochurePath,
  };

  try {
    const existing = getStoredSubmissions();
    const updated = [newLead, ...existing].slice(0, 5000); // Keep latest 5000 leads
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch event so open dashboard tabs update in real time
    window.dispatchEvent(new CustomEvent('dv_new_lead_recorded', { detail: newLead }));
    void syncSubmissionToRemote(newLead);
  } catch (err) {
    console.error('Could not save lead to localStorage', err);
  }

  return newLead;
};

export const clearStoredSubmissions = (): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.localStorage.setItem('dv_leads_initialized', 'true');
    window.dispatchEvent(new CustomEvent('dv_leads_cleared'));
  }
};

export const clearRemoteSubmissions = async (): Promise<void> => {
  const response = await fetch(`${DASHBOARD_API_URL}/api/dashboard/submissions`, {
    method: 'DELETE', headers: dashboardHeaders(), credentials: 'include',
  });
  if (!response.ok) throw new Error('Could not clear remote dashboard submissions.');
};

export const resetToSeedSubmissions = (): LeadSubmission[] => {
  const seeds = generateInitialSeedData();
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
    window.dispatchEvent(new CustomEvent('dv_leads_reset'));
  }
  return seeds;
};

// ============================================================================
// EXPORT TO EXCEL WORKBOOK (.xls format) - STRICTLY FORM SUBMISSION DATA
// ============================================================================
export const exportSubmissionsExcel = (submissions: LeadSubmission[]): void => {
  if (!submissions.length) {
    alert('No lead submissions available to export.');
    return;
  }

  const escapeXml = (unsafe: string | number | undefined | null) => {
    if (unsafe === undefined || unsafe === null) return '';
    return String(unsafe)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const headers = [
    'Lead ID',
    'Date & Time (IST)',
    'Lead Name',
    'Phone Number',
    'Email Address',
    'Program / Course',
    'Form Type Filled',
    'Page Type',
    'Page Path',
    'Full Page URL',
    'Qualification',
    'Work Experience',
    'Location / State',
    'Brochure File Downloaded',
  ];

  const colWidths = [120, 160, 180, 140, 210, 260, 180, 150, 160, 260, 160, 140, 160, 180];
  const columnsXml = colWidths.map((w) => `<Column ss:Width="${w}"/>`).join('\n      ');

  const headerRowXml = headers
    .map((h) => `<Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">${escapeXml(h)}</Data></Cell>`)
    .join('\n        ');

  const dataRowsXml = submissions
    .map((lead) => {
      const cells = [
        lead.id,
        lead.displayTime,
        lead.name,
        lead.phone,
        lead.email,
        lead.course,
        lead.formLabel,
        lead.pageCategoryLabel,
        lead.pagePath,
        lead.pageUrl,
        lead.qualification || '—',
        lead.experience || '—',
        lead.state || '—',
        lead.brochurePath || '—',
      ];

      const cellsXml = cells
        .map((val) => `<Cell ss:StyleID="DataStyle"><Data ss:Type="String">${escapeXml(val)}</Data></Cell>`)
        .join('\n        ');

      return `      <Row ss:Height="22">\n        ${cellsXml}\n      </Row>`;
    })
    .join('\n');

  const excelXml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
    <Author>DV Analytics</Author>
    <Created>${new Date().toISOString()}</Created>
    <Company>DV Analytics</Company>
  </DocumentProperties>
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Center"/>
      <Borders/>
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#000000"/>
      <Interior/>
      <NumberFormat/>
      <Protection/>
    </Style>
    <Style ss:ID="HeaderStyle">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D43B0D"/>
      </Borders>
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
      <Interior ss:Color="#EF5323" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="DataStyle">
      <Alignment ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
      </Borders>
      <Font ss:FontName="Calibri" ss:Size="10.5" ss:Color="#0F172A"/>
    </Style>
  </Styles>
  <Worksheet ss:Name="Form Submissions">
    <Table ss:DefaultRowHeight="20">
      ${columnsXml}
      <Row ss:Height="28">
        ${headerRowXml}
      </Row>
${dataRowsXml}
    </Table>
    <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
      <Selected/>
      <FreezePanes/>
      <FrozenNoSplit/>
      <SplitHorizontal>1</SplitHorizontal>
      <TopRowBottomPane>1</TopRowBottomPane>
      <ActivePane>2</ActivePane>
    </WorksheetOptions>
  </Worksheet>
</Workbook>`;

  const blob = new Blob([excelXml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `DV_Analytics_Form_Leads_${new Date().toISOString().slice(0, 10)}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ============================================================================
// EXPORT TO CSV (with UTF-8 Byte Order Mark for Excel compatibility)
// ============================================================================
export const exportSubmissionsCsv = (submissions: LeadSubmission[]): void => {
  if (!submissions.length) {
    alert('No lead submissions available to export.');
    return;
  }

  const headers = [
    'ID',
    'Timestamp (IST)',
    'Full Name',
    'Phone',
    'Email',
    'Course',
    'Form Type Filled',
    'Page Category',
    'Page Path',
    'Full Page URL',
    'Qualification',
    'Experience',
    'Location/State',
    'Brochure Downloaded',
  ];

  const escapeCsv = (str: string | undefined | null) => {
    if (str === undefined || str === null) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = submissions.map((lead) => [
    escapeCsv(lead.id),
    escapeCsv(lead.displayTime),
    escapeCsv(lead.name),
    escapeCsv(lead.phone),
    escapeCsv(lead.email),
    escapeCsv(lead.course),
    escapeCsv(lead.formLabel),
    escapeCsv(lead.pageCategoryLabel),
    escapeCsv(lead.pagePath),
    escapeCsv(lead.pageUrl),
    escapeCsv(lead.qualification),
    escapeCsv(lead.experience),
    escapeCsv(lead.state),
    escapeCsv(lead.brochurePath),
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `DV_Analytics_Form_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
