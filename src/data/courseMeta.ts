export interface CourseMeta {
  id: string;
  label: string;
  brochurePath?: string;
  category: 'live' | 'self-paced';
}

export const courseCatalog: CourseMeta[] = [
  {
    id: 'apids',
    label: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
    brochurePath: '/APIDS-Brochure.pdf',
    category: 'live',
  },
  {
    id: 'apida',
    label: 'Advanced Program in Industrial Data Science with Gen AI (APIDA)',
    brochurePath: '/apida-brochure.pdf',
    category: 'live',
  },
  {
    id: 'specialist',
    label: 'Data Analytics Specialist (DAS)',
    brochurePath: '/data-analytics-specialist-brochure.pdf',
    category: 'live',
  },
  {
    id: 'apcs',
    label: 'AI Integrated Advanced Program in Cybersecurity & Forensics (APCF)',
    brochurePath: '/apcf-brochure.pdf',
    category: 'live',
  },
  {
    id: 'fde',
    label: 'AI Forward Deployment Engineer (FDE)',
    brochurePath: '/ai-forward-deployment-engineer-brochure.pdf',
    category: 'live',
  },
  {
    id: 'flp',
    label: 'Flexi Learning Program in Data Science & AI (FLP)',
    brochurePath: '/FLP-IN-DATA-SCIENCE-AI.pdf',
    category: 'self-paced',
  },
];

export const liveTrainingCourses = courseCatalog.filter((course) => course.category === 'live');

export const selfPacedCourses = courseCatalog.filter((course) => course.category === 'self-paced');

export const getCourseMeta = (courseId?: string): CourseMeta | undefined =>
  courseCatalog.find((course) => course.id === courseId?.toLowerCase());
