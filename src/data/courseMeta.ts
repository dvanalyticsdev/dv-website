export interface CourseMeta {
  id: string;
  label: string;
  brochurePath?: string;
}

export const courseCatalog: CourseMeta[] = [
  {
    id: 'apids',
    label: 'Advanced Program in Industrial Data Science & AI (APIDS)',
    brochurePath: '/APIDS-Brochure.pdf',
  },
  {
    id: 'apida',
    label: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
    brochurePath: '/apida-brochure.pdf',
  },
  {
    id: 'specialist',
    label: 'Data Analytics Specialist (DAS)',
    brochurePath: '/data-analytics-specialist-brochure.pdf',
  },
  {
    id: 'aiml',
    label: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)',
    brochurePath: '/aiml-brochure.pdf',
  },
  {
    id: 'genai',
    label: 'Master Program in Generative AI & Agentic AI (MPGAA)',
    brochurePath: '/genai-agentic-ai-brochure.pdf',
  },
  {
    id: 'apcs',
    label: 'Advanced Program in Cybersecurity & Forensics (APCF)',
    brochurePath: '/apcf-brochure.pdf',
  },
  {
    id: 'days7_genai',
    label: '7 Days Gen AI & Agentic AI Hands-on Master Program',
    brochurePath: '/7-days-genai-brochure.pdf',
  },
  {
    id: 'fde',
    label: 'AI Forward Deployed Engineer (FDE)',
    brochurePath: '/ai-forward-deployment-engineer-brochure.pdf',
  },
];

export const getCourseMeta = (courseId?: string): CourseMeta | undefined =>
  courseCatalog.find((course) => course.id === courseId?.toLowerCase());
