export interface CourseMeta {
  id: string;
  label: string;
  brochurePath?: string;
  category: 'live' | 'self-paced';
}

export const courseCatalog: CourseMeta[] = [
  {
    id: 'apids',
    label: 'Advanced Program in Industrial Data Science & AI (APIDS)',
    brochurePath: '/APIDS-Brochure.pdf',
    category: 'live',
  },
  {
    id: 'apida',
    label: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
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
    id: 'aiml',
    label: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)',
    brochurePath: '/aiml-brochure.pdf',
    category: 'live',
  },
  {
    id: 'genai',
    label: 'Master Program in Generative AI & Agentic AI (MPGAA)',
    brochurePath: '/genai-agentic-ai-brochure.pdf',
    category: 'live',
  },
  {
    id: 'apcs',
    label: 'Advanced Program in Cybersecurity & Forensics (APCF)',
    brochurePath: '/apcf-brochure.pdf',
    category: 'live',
  },
  {
    id: 'days7_genai',
    label: '7 Days Gen AI & Agentic AI Hands-on Master Program',
    brochurePath: '/7-days-genai-brochure.pdf',
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
