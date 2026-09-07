export interface SeoLandingPage {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  primaryCourseId: string;
  bullets: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const seoLandingPages: SeoLandingPage[] = [
  {
    id: 'lp-data-science-course-bangalore',
    slug: 'data-science-course-bangalore',
    title: 'Data Science Course in Bangalore | DV Analytics',
    eyebrow: 'Bangalore Data Science Training',
    heading: 'Data Science Course in Bangalore',
    description:
      'Build job-ready Data Science, Python, SQL, Machine Learning, GenAI, and deployment skills with DV Analytics in Bangalore.',
    image: '/course-hero/APIDS.jpeg',
    primaryCourseId: 'apids',
    bullets: [
      'Live online and offline learning options',
      'Python, SQL, statistics, machine learning, GenAI, and MLOps',
      'Industry projects across banking, telecom, retail, healthcare, and manufacturing',
      'Career mentoring, resume support, mock interviews, and placement assistance',
    ],
    sections: [
      {
        title: 'Why Learn Data Science in Bangalore',
        body:
          'Bangalore remains one of India\'s strongest technology markets for analytics, AI, software, product, and consulting roles. DV Analytics prepares learners with practical data science skills that match how teams solve real business problems.',
      },
      {
        title: 'What You Learn',
        body:
          'The program covers SQL, Python, statistics, data analysis, machine learning, deep learning, Generative AI, Agentic AI, cloud deployment, dashboards, and hands-on project delivery.',
      },
      {
        title: 'Career Outcomes',
        body:
          'Learners prepare for roles such as Data Analyst, Data Scientist, Machine Learning Engineer, AI Engineer, Analytics Consultant, and AI Solutions professional.',
      },
    ],
    faqs: [
      {
        question: 'Who can join the Data Science course in Bangalore?',
        answer:
          'Freshers, graduates, working professionals, and career switchers from technical or non-technical backgrounds can join.',
      },
      {
        question: 'Does the course include projects?',
        answer:
          'Yes. Learners work on practical industry projects across major business domains and build a portfolio for interviews.',
      },
    ],
  },
  {
    id: 'lp-data-analytics-course-bangalore',
    slug: 'data-analytics-course-bangalore',
    title: 'Data Analytics Course in Bangalore | DV Analytics',
    eyebrow: 'Bangalore Analytics Training',
    heading: 'Data Analytics Course in Bangalore',
    description:
      'Learn SQL, Excel AI, Python, Power BI, Tableau, business analytics, and dashboards through a practical Data Analytics course in Bangalore.',
    image: '/course-hero/DAS.jpeg',
    primaryCourseId: 'specialist',
    bullets: [
      'SQL, Python, Excel AI, Power BI, and Tableau',
      'Business dashboards and reporting projects',
      'Beginner-friendly path for graduates and working professionals',
      'Interview preparation and career guidance',
    ],
    sections: [
      {
        title: 'Built for Analytics Careers',
        body:
          'This page is designed for learners who want a focused Data Analytics path in Bangalore with practical reporting, dashboarding, and business decision-making skills.',
      },
      {
        title: 'Practical Tool Stack',
        body:
          'Learners work with SQL Server, Python, Excel, Power Query, Excel AI, Power BI, and analytics workflows used by business teams.',
      },
      {
        title: 'Role Readiness',
        body:
          'The curriculum supports entry into Data Analyst, MIS Analyst, Business Analyst, BI Analyst, Reporting Analyst, and Operations Analyst roles.',
      },
    ],
    faqs: [
      {
        question: 'Is this suitable for non-programmers?',
        answer:
          'Yes. The course starts from fundamentals and builds toward dashboards, reporting, and analytics projects.',
      },
      {
        question: 'Which tools are covered?',
        answer:
          'SQL, Python, Excel, Excel AI, Power BI, Power BI Service, Tableau, and business analytics workflows are covered.',
      },
    ],
  },
  {
    id: 'lp-data-analytics-course-bhubaneswar',
    slug: 'data-analytics-course-bhubaneswar',
    title: 'Data Analytics Course in Bhubaneswar | DV Analytics',
    eyebrow: 'Bhubaneswar Analytics Training',
    heading: 'Data Analytics Course in Bhubaneswar',
    description:
      'Join DV Analytics in Bhubaneswar for practical Data Analytics training with SQL, Python, Excel AI, Power BI, dashboards, and career support.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'specialist',
    bullets: [
      'Local Bhubaneswar learning support',
      'Beginner-friendly analytics curriculum',
      'Portfolio projects and dashboard practice',
      'Career guidance for Odisha technology opportunities',
    ],
    sections: [
      {
        title: 'Bhubaneswar Career Relevance',
        body:
          'Bhubaneswar is growing as a technology and services market, and practical analytics skills help graduates and working professionals compete for modern data roles.',
      },
      {
        title: 'Hands-On Learning',
        body:
          'Learners practice SQL queries, Python data handling, Excel AI workflows, Power BI dashboards, reporting, and business case studies.',
      },
      {
        title: 'Placement Preparation',
        body:
          'DV Analytics supports learners with resume guidance, interview preparation, project portfolio building, and career mentoring.',
      },
    ],
    faqs: [
      {
        question: 'Is classroom support available in Bhubaneswar?',
        answer:
          'DV Analytics has a Bhubaneswar presence and offers learning support for students exploring analytics and AI careers.',
      },
      {
        question: 'Can freshers join?',
        answer:
          'Yes. Freshers and graduates can join and build skills from the fundamentals.',
      },
    ],
  },
  {
    id: 'lp-generative-ai-course',
    slug: 'generative-ai-course',
    title: 'Generative AI Course | DV Analytics',
    eyebrow: 'GenAI Career Training',
    heading: 'Generative AI Course',
    description:
      'Learn Generative AI, LLMs, prompt engineering, RAG, vector databases, fine-tuning concepts, and production AI workflows with DV Analytics.',
    image: '/course-hero/Gen AI.jpeg',
    primaryCourseId: 'genai',
    bullets: [
      'Prompt engineering, LLMs, RAG, and vector databases',
      'LangChain, LangGraph, CrewAI, AutoGen, and MCP exposure',
      'Production workflows, LLMOps, safety, monitoring, and deployment',
      'Portfolio-ready GenAI projects',
    ],
    sections: [
      {
        title: 'Why Generative AI Skills Matter',
        body:
          'Generative AI is reshaping analytics, software, customer operations, knowledge work, and enterprise automation. Practical GenAI skills help professionals build AI-enabled products and workflows.',
      },
      {
        title: 'What You Build',
        body:
          'Learners build RAG systems, document intelligence tools, AI assistants, prompt workflows, multi-agent prototypes, and production-oriented AI applications.',
      },
      {
        title: 'Who Should Join',
        body:
          'The course fits data professionals, software engineers, analysts, consultants, students, and working professionals moving toward AI roles.',
      },
    ],
    faqs: [
      {
        question: 'Does the course include RAG?',
        answer:
          'Yes. RAG, vector databases, retrieval workflows, prompt engineering, and LLM application patterns are included.',
      },
      {
        question: 'Is this only for software engineers?',
        answer:
          'No. Analysts, students, consultants, and working professionals can join depending on the program level they choose.',
      },
    ],
  },
  {
    id: 'lp-agentic-ai-course',
    slug: 'agentic-ai-course',
    title: 'Agentic AI Course | DV Analytics',
    eyebrow: 'Agentic AI Training',
    heading: 'Agentic AI Course',
    description:
      'Learn Agentic AI, autonomous workflows, multi-agent systems, LangGraph, CrewAI, AutoGen, MCP, and enterprise AI automation with DV Analytics.',
    image: '/course-hero/Advance AIML.jpeg',
    primaryCourseId: 'aiml',
    bullets: [
      'Agentic AI foundations and multi-agent patterns',
      'LangChain, LangGraph, CrewAI, AutoGen, and MCP',
      'Enterprise workflow automation and human checkpoints',
      'Deployment, observability, safety, and LLMOps practices',
    ],
    sections: [
      {
        title: 'From Chatbots to Agents',
        body:
          'Agentic AI moves beyond simple prompting into systems that plan, reason, use tools, coordinate tasks, and automate business workflows with supervision.',
      },
      {
        title: 'Enterprise Use Cases',
        body:
          'Learners explore research agents, customer support agents, SQL agents, document intelligence systems, and AI workflow automation patterns.',
      },
      {
        title: 'Career Direction',
        body:
          'Agentic AI skills support roles in AI engineering, AI product development, automation consulting, forward deployment, and AI solutions delivery.',
      },
    ],
    faqs: [
      {
        question: 'Which agent frameworks are covered?',
        answer:
          'The curriculum includes exposure to LangChain, LangGraph, CrewAI, AutoGen, and Model Context Protocol patterns.',
      },
      {
        question: 'Will I build projects?',
        answer:
          'Yes. Learners build practical agentic workflows and portfolio-ready AI automation projects.',
      },
    ],
  },
  {
    id: 'lp-cybersecurity-course',
    slug: 'cybersecurity-course',
    title: 'Cybersecurity Course | DV Analytics',
    eyebrow: 'Cybersecurity & Forensics Training',
    heading: 'Cybersecurity Course',
    description:
      'Learn cybersecurity, ethical hacking, SOC operations, SIEM, penetration testing, cloud security, and digital forensics with DV Analytics.',
    image: '/course-hero/APCF.jpeg',
    primaryCourseId: 'apcs',
    bullets: [
      'Networking, Linux, ethical hacking, and penetration testing',
      'SOC operations, SIEM, Splunk, incident response, and forensics',
      'Cloud security and governance fundamentals',
      'Hands-on labs and job-focused preparation',
    ],
    sections: [
      {
        title: 'Practical Security Training',
        body:
          'The cybersecurity path focuses on defensive and offensive security fundamentals, vulnerability assessment, security operations, cloud security, and incident response.',
      },
      {
        title: 'Tools and Labs',
        body:
          'Learners work with tools and concepts such as Wireshark, Nmap, Metasploit, Splunk, Nessus, Burp Suite, AWS security, and Linux security workflows.',
      },
      {
        title: 'Career Roles',
        body:
          'The program supports preparation for Cybersecurity Analyst, SOC Analyst, Ethical Hacker, Penetration Tester, Cloud Security Engineer, and Digital Forensics roles.',
      },
    ],
    faqs: [
      {
        question: 'Do I need prior networking knowledge?',
        answer:
          'No. Networking and security fundamentals are covered as part of the learning path.',
      },
      {
        question: 'Does the program include labs?',
        answer:
          'Yes. Hands-on cybersecurity labs and simulations are part of the training experience.',
      },
    ],
  },
  {
    id: 'lp-generative-ai-data-analytics-course-bhubaneswar',
    slug: 'generative-ai-data-analytics-course-bhubaneswar',
    title: 'Generative AI & Data Analytics Course in Bhubaneswar | DV Analytics',
    eyebrow: 'Bhubaneswar & Odisha Training',
    heading: 'Generative AI & Data Analytics Course in Bhubaneswar',
    description:
      'Master Generative AI, Python, SQL, Power BI, LLMs & Agentic AI in Bhubaneswar. Get hands-on training, industry projects, transparent course fees, and 100% placement assistance.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'genai',
    bullets: [
      'Top-ranked Generative AI & Data Analytics institute in Bhubaneswar & Odisha',
      'Hands-on training in SQL, Python, Power BI, LLMs, RAG & Agentic AI',
      'Real-world industry projects across finance, healthcare, and retail',
      '100% placement assistance, resume building, and mock interviews',
      'Transparent course fees with flexible installment/EMI plans',
    ],
    sections: [
      {
        title: 'Why Study Generative AI & Data Analytics in Bhubaneswar',
        body:
          'Bhubaneswar is rapidly emerging as a major technology hub in Eastern India. Combining traditional Data Analytics (SQL, Python, Power BI) with modern Generative AI and Agentic AI empowers learners to secure high-paying analytics and AI engineering roles.',
      },
      {
        title: 'Industry-Oriented Curriculum',
        body:
          'Our comprehensive curriculum starts from data analytics fundamentals and progresses to advanced LLMs, prompt engineering, Retrieval-Augmented Generation (RAG), vector databases, and multi-agent workflow deployment.',
      },
      {
        title: 'Career & Placement Support',
        body:
          'DV Analytics provides 100% dedicated placement support, including 1-on-1 resume reviews, GitHub portfolio preparation, interview coaching, and referrals across 100+ hiring partners in Bhubaneswar, Bangalore, and nationwide.',
      },
    ],
    faqs: [
      {
        question: 'Who is eligible for the Generative AI & Data Analytics course in Bhubaneswar?',
        answer:
          'Graduates, freshers, IT professionals, non-tech career switchers, and students in Bhubaneswar and Odisha can enroll. No prior programming background is required as training starts from scratch.',
      },
      {
        question: 'What are the course fees and payment options?',
        answer:
          'DV Analytics offers competitive and transparent course fee structures with zero-cost EMI installment options to support all learners.',
      },
      {
        question: 'Does DV Analytics provide placement assistance in Odisha and Bangalore?',
        answer:
          'Yes. We offer 100% placement support, mock interviews, resume optimization, and direct hiring partner connections across Bhubaneswar, Bangalore, and major tech hubs.',
      },
    ],
  },
];

export const seoLandingPageById = Object.fromEntries(
  seoLandingPages.map((page) => [page.id, page])
);

export const seoLandingPageBySlug = Object.fromEntries(
  seoLandingPages.map((page) => [page.slug, page])
);
