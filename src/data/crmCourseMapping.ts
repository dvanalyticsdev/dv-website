export interface CrmCourseMapping {
  websiteCourseId: string;
  crmCourseId: string;
  crmCourseLabel: string;
  crmCourseName: string;
}

const CRM_COURSE_MAPPINGS: Record<string, CrmCourseMapping> = {
  apids: {
    websiteCourseId: 'apids',
    crmCourseId: 'apids',
    crmCourseLabel: 'APIDS',
    crmCourseName: 'Advanced Program in Industrial Data Science with AI Deployment',
  },
  apida: {
    websiteCourseId: 'apida',
    crmCourseId: 'apida',
    crmCourseLabel: 'APIDA',
    crmCourseName: 'Advanced Program in Industrial Data Science with Gen AI',
  },
  specialist: {
    websiteCourseId: 'specialist',
    crmCourseId: 'data-analytics-specialist',
    crmCourseLabel: 'DAS',
    crmCourseName: 'Data Analytics Specialist',
  },
  apcs: {
    websiteCourseId: 'apcs',
    crmCourseId: 'apcs',
    crmCourseLabel: 'APCF',
    crmCourseName: 'AI Integrated Advanced Program in Cybersecurity & Forensics',
  },
  fde: {
    websiteCourseId: 'fde',
    crmCourseId: 'forward-deployed-engineer',
    crmCourseLabel: 'FDE',
    crmCourseName: 'AI Forward Deployment Engineer',
  },
};

export const getCrmCourseMapping = (websiteCourseId?: string | null): CrmCourseMapping | null => {
  const key = String(websiteCourseId || '').trim().toLowerCase();
  return CRM_COURSE_MAPPINGS[key] || null;
};
