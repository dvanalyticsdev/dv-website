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
    crmCourseName: 'Advanced Program in Industrial Data Science & AI',
  },
  apida: {
    websiteCourseId: 'apida',
    crmCourseId: 'apida',
    crmCourseLabel: 'APIDA',
    crmCourseName: 'Advanced Program in Industrial Data Analytics & AI',
  },
  aiml: {
    websiteCourseId: 'aiml',
    crmCourseId: 'advanced-aiml-genai-agentic',
    crmCourseLabel: 'AIML + GenAI',
    crmCourseName: 'Advanced AIML with Gen AI & Agentic AI',
  },
  genai: {
    websiteCourseId: 'genai',
    crmCourseId: 'master-genai-agentic',
    crmCourseLabel: 'GenAI Master',
    crmCourseName: 'Master Program in Gen AI & Agentic AI',
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
    crmCourseLabel: 'APCS',
    crmCourseName: 'Advanced Program in Cybersecurity & Forensics',
  },
  days7_genai: {
    websiteCourseId: 'days7_genai',
    crmCourseId: 'days7_genai',
    crmCourseLabel: '7DAYS_GENAI',
    crmCourseName: '7 Days Gen AI & Agentic AI Hands-on Master Program',
  },
  fde: {
    websiteCourseId: 'fde',
    crmCourseId: 'forward-deployed-engineer',
    crmCourseLabel: 'FDE',
    crmCourseName: 'Forward Deployed Engineer',
  },
};

export const getCrmCourseMapping = (websiteCourseId?: string | null): CrmCourseMapping | null => {
  const key = String(websiteCourseId || '').trim().toLowerCase();
  return CRM_COURSE_MAPPINGS[key] || null;
};
