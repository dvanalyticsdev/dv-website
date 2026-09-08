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

const coreSeoLandingPages: SeoLandingPage[] = [
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

type SeoLandingPageSeed = {
  slug: string;
  title: string;
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  primaryCourseId: string;
  focus: string;
  audience: string;
  location: string;
  outcomes: string[];
  tools: string[];
};

const buildSeoLandingPage = ({
  slug,
  title,
  eyebrow,
  heading,
  description,
  image,
  primaryCourseId,
  focus,
  audience,
  location,
  outcomes,
  tools,
}: SeoLandingPageSeed): SeoLandingPage => ({
  id: `lp-${slug}`,
  slug,
  title,
  eyebrow,
  heading,
  description,
  image,
  primaryCourseId,
  bullets: [
    `Job-focused ${focus} curriculum for ${audience}`,
    `${tools.join(', ')} and practical project workflows`,
    `Career mentoring, resume reviews, mock interviews, and placement assistance`,
    `Learning support for ${location} with online and classroom-friendly options`,
  ],
  sections: [
    {
      title: `Why Choose ${focus}`,
      body: `${focus} is now a core skill area across analytics, software, consulting, product, finance, operations, and digital transformation teams. DV Analytics focuses on practical learning so students can connect concepts with business use cases and interview expectations.`,
    },
    {
      title: 'What You Learn',
      body: `Learners build hands-on capability with ${tools.join(', ')} while working through guided assignments, capstone-style projects, portfolio preparation, and production-aware workflows.`,
    },
    {
      title: 'Career Outcomes',
      body: `This path supports preparation for roles such as ${outcomes.join(', ')}. The goal is to help learners present stronger projects, sharper resumes, and clearer role readiness.`,
    },
  ],
  faqs: [
    {
      question: `Who should join the ${focus} program?`,
      answer: `${audience} can join this path. The learning journey starts with fundamentals and moves toward practical tools, projects, and interview preparation.`,
    },
    {
      question: `Does DV Analytics provide placement support for ${focus}?`,
      answer: 'Yes. Learners receive career mentoring, resume support, mock interview preparation, portfolio guidance, and placement assistance based on their selected program.',
    },
    {
      question: `Is this ${focus} training available for ${location}?`,
      answer: `DV Analytics supports learners from ${location} through practical training options, project-based learning, and career guidance for local and India-wide opportunities.`,
    },
  ],
});

const expandedSeoLandingPages: SeoLandingPage[] = [
  buildSeoLandingPage({
    slug: 'data-science-course-india',
    title: 'Data Science Course in India | AI, Python & Placements',
    eyebrow: 'India Data Science Training',
    heading: 'Data Science Course in India',
    description: 'Learn Data Science, Python, SQL, Machine Learning, GenAI, MLOps, projects, and placement skills with DV Analytics.',
    image: '/course-hero/APIDS.jpeg',
    primaryCourseId: 'apids',
    focus: 'Data Science',
    audience: 'freshers, graduates, career switchers, and working professionals across India',
    location: 'India',
    tools: ['Python', 'SQL', 'statistics', 'machine learning', 'GenAI', 'MLOps'],
    outcomes: ['Data Analyst', 'Data Scientist', 'ML Engineer', 'AI Engineer', 'Analytics Consultant'],
  }),
  buildSeoLandingPage({
    slug: 'data-science-course-bhubaneswar',
    title: 'Data Science Course in Bhubaneswar | AI & Placements',
    eyebrow: 'Bhubaneswar Data Science Training',
    heading: 'Data Science Course in Bhubaneswar',
    description: 'Build Data Science, Python, SQL, Machine Learning, GenAI, and project skills with DV Analytics in Bhubaneswar.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'apids',
    focus: 'Data Science',
    audience: 'students, graduates, and working professionals in Bhubaneswar and Odisha',
    location: 'Bhubaneswar and Odisha',
    tools: ['Python', 'SQL', 'Power BI', 'machine learning', 'GenAI', 'analytics projects'],
    outcomes: ['Data Analyst', 'Junior Data Scientist', 'BI Analyst', 'ML Associate', 'Analytics Consultant'],
  }),
  buildSeoLandingPage({
    slug: 'data-science-course-online',
    title: 'Online Data Science Course | AI, Projects & Placements',
    eyebrow: 'Online Data Science Training',
    heading: 'Online Data Science Course',
    description: 'Join an online Data Science course with Python, SQL, ML, GenAI, projects, mentorship, and placement preparation.',
    image: '/course-hero/FLP.jpeg',
    primaryCourseId: 'flp',
    focus: 'Online Data Science',
    audience: 'remote learners, students, and working professionals',
    location: 'India and online learners',
    tools: ['Python', 'SQL', 'statistics', 'machine learning', 'GenAI', 'dashboarding'],
    outcomes: ['Data Analyst', 'Data Scientist', 'AI Analyst', 'Business Analyst', 'ML Associate'],
  }),
  buildSeoLandingPage({
    slug: 'data-analytics-course-india',
    title: 'Data Analytics Course in India | SQL, Power BI & AI',
    eyebrow: 'India Data Analytics Training',
    heading: 'Data Analytics Course in India',
    description: 'Learn SQL, Excel AI, Python, Power BI, Tableau, dashboards, business analytics, and placement skills with DV Analytics.',
    image: '/course-hero/DAS.jpeg',
    primaryCourseId: 'specialist',
    focus: 'Data Analytics',
    audience: 'freshers, graduates, non-programmers, and working professionals across India',
    location: 'India',
    tools: ['SQL', 'Excel AI', 'Python', 'Power BI', 'Tableau', 'business dashboards'],
    outcomes: ['Data Analyst', 'BI Analyst', 'MIS Analyst', 'Business Analyst', 'Reporting Analyst'],
  }),
  buildSeoLandingPage({
    slug: 'data-analytics-course-online',
    title: 'Online Data Analytics Course | SQL, Power BI & Projects',
    eyebrow: 'Online Analytics Training',
    heading: 'Online Data Analytics Course',
    description: 'Study Data Analytics online with SQL, Excel AI, Python, Power BI, Tableau, projects, and career mentoring.',
    image: '/course-hero/DAS.jpeg',
    primaryCourseId: 'specialist',
    focus: 'Online Data Analytics',
    audience: 'remote learners, beginners, graduates, and working professionals',
    location: 'India and online learners',
    tools: ['SQL', 'Excel', 'Excel AI', 'Python', 'Power BI', 'Tableau'],
    outcomes: ['Data Analyst', 'BI Analyst', 'MIS Executive', 'Operations Analyst', 'Business Analyst'],
  }),
  buildSeoLandingPage({
    slug: 'data-analytics-course-karnataka',
    title: 'Data Analytics Course in Karnataka | Bangalore Training',
    eyebrow: 'Karnataka Analytics Training',
    heading: 'Data Analytics Course in Karnataka',
    description: 'Learn Data Analytics in Karnataka with SQL, Python, Excel AI, Power BI, dashboards, projects, and placement guidance.',
    image: '/office-bg/bangalore.png',
    primaryCourseId: 'specialist',
    focus: 'Data Analytics',
    audience: 'students and professionals in Bangalore and Karnataka',
    location: 'Karnataka',
    tools: ['SQL', 'Python', 'Excel AI', 'Power BI', 'Tableau', 'analytics case studies'],
    outcomes: ['Data Analyst', 'BI Analyst', 'Business Analyst', 'Reporting Analyst', 'Analytics Associate'],
  }),
  buildSeoLandingPage({
    slug: 'data-analytics-course-odisha',
    title: 'Data Analytics Course in Odisha | Bhubaneswar Training',
    eyebrow: 'Odisha Analytics Training',
    heading: 'Data Analytics Course in Odisha',
    description: 'Build Data Analytics skills in Odisha with SQL, Python, Excel AI, Power BI, dashboards, and placement preparation.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'specialist',
    focus: 'Data Analytics',
    audience: 'students, freshers, and professionals in Odisha',
    location: 'Odisha',
    tools: ['SQL', 'Excel AI', 'Python', 'Power BI', 'Tableau', 'business analytics'],
    outcomes: ['Data Analyst', 'BI Analyst', 'MIS Analyst', 'Business Analyst', 'Reporting Analyst'],
  }),
  buildSeoLandingPage({
    slug: 'ai-course-india',
    title: 'AI Course in India | Generative AI, ML & Agentic AI',
    eyebrow: 'India AI Training',
    heading: 'AI Course in India',
    description: 'Learn AI, Machine Learning, Generative AI, Agentic AI, LLMs, RAG, deployment, and portfolio projects with DV Analytics.',
    image: '/course-hero/Advance AIML.jpeg',
    primaryCourseId: 'aiml',
    focus: 'AI',
    audience: 'students, data professionals, software engineers, and career switchers across India',
    location: 'India',
    tools: ['Python', 'machine learning', 'deep learning', 'LLMs', 'RAG', 'Agentic AI'],
    outcomes: ['AI Engineer', 'ML Engineer', 'Data Scientist', 'AI Analyst', 'AI Solutions Consultant'],
  }),
  buildSeoLandingPage({
    slug: 'ai-course-bangalore',
    title: 'AI Course in Bangalore | GenAI, ML & Agentic AI',
    eyebrow: 'Bangalore AI Training',
    heading: 'AI Course in Bangalore',
    description: 'Join DV Analytics for AI training in Bangalore covering ML, Generative AI, Agentic AI, LLM apps, RAG, and deployment.',
    image: '/office-bg/bangalore.png',
    primaryCourseId: 'aiml',
    focus: 'AI',
    audience: 'Bangalore students, engineers, analysts, and working professionals',
    location: 'Bangalore',
    tools: ['Python', 'machine learning', 'GenAI', 'LangChain', 'RAG', 'MLOps'],
    outcomes: ['AI Engineer', 'ML Engineer', 'Data Scientist', 'AI Product Analyst', 'Automation Consultant'],
  }),
  buildSeoLandingPage({
    slug: 'ai-course-bhubaneswar',
    title: 'AI Course in Bhubaneswar | ML, GenAI & Projects',
    eyebrow: 'Bhubaneswar AI Training',
    heading: 'AI Course in Bhubaneswar',
    description: 'Learn AI in Bhubaneswar with Machine Learning, Generative AI, Agentic AI, RAG, projects, and placement support.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'aiml',
    focus: 'AI',
    audience: 'students, freshers, and professionals in Bhubaneswar and Odisha',
    location: 'Bhubaneswar and Odisha',
    tools: ['Python', 'ML', 'GenAI', 'LLMs', 'RAG', 'agentic workflows'],
    outcomes: ['AI Analyst', 'ML Associate', 'Data Scientist', 'AI Engineer', 'Automation Analyst'],
  }),
  buildSeoLandingPage({
    slug: 'generative-ai-course-india',
    title: 'Generative AI Course in India | LLM, RAG & Agents',
    eyebrow: 'India GenAI Training',
    heading: 'Generative AI Course in India',
    description: 'Master Generative AI, LLMs, prompt engineering, RAG, vector databases, agents, and production AI workflows.',
    image: '/course-hero/Gen AI.jpeg',
    primaryCourseId: 'genai',
    focus: 'Generative AI',
    audience: 'analysts, developers, students, consultants, and professionals across India',
    location: 'India',
    tools: ['LLMs', 'prompt engineering', 'RAG', 'vector databases', 'LangChain', 'agents'],
    outcomes: ['GenAI Engineer', 'AI Engineer', 'Prompt Engineer', 'AI Product Builder', 'Automation Consultant'],
  }),
  buildSeoLandingPage({
    slug: 'generative-ai-course-bangalore',
    title: 'Generative AI Course in Bangalore | LLM, RAG & Agents',
    eyebrow: 'Bangalore GenAI Training',
    heading: 'Generative AI Course in Bangalore',
    description: 'Learn Generative AI in Bangalore with LLM apps, RAG, vector databases, LangChain, agents, and portfolio projects.',
    image: '/office-bg/bangalore.png',
    primaryCourseId: 'genai',
    focus: 'Generative AI',
    audience: 'Bangalore learners, software engineers, analysts, and AI career switchers',
    location: 'Bangalore',
    tools: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'vector databases', 'LLMOps'],
    outcomes: ['GenAI Engineer', 'AI Engineer', 'LLM App Developer', 'AI Consultant', 'Automation Specialist'],
  }),
  buildSeoLandingPage({
    slug: 'generative-ai-course-bhubaneswar',
    title: 'Generative AI Course in Bhubaneswar | LLM & RAG',
    eyebrow: 'Bhubaneswar GenAI Training',
    heading: 'Generative AI Course in Bhubaneswar',
    description: 'Build GenAI, LLM, RAG, prompt engineering, and AI automation skills with DV Analytics in Bhubaneswar.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'genai',
    focus: 'Generative AI',
    audience: 'students and professionals in Bhubaneswar and Odisha',
    location: 'Bhubaneswar and Odisha',
    tools: ['LLMs', 'prompt engineering', 'RAG', 'vector databases', 'AI agents', 'automation workflows'],
    outcomes: ['GenAI Engineer', 'AI Analyst', 'Automation Analyst', 'LLM App Developer', 'AI Consultant'],
  }),
  buildSeoLandingPage({
    slug: 'agentic-ai-course-india',
    title: 'Agentic AI Course in India | LangGraph, CrewAI & MCP',
    eyebrow: 'India Agentic AI Training',
    heading: 'Agentic AI Course in India',
    description: 'Learn Agentic AI, multi-agent systems, LangGraph, CrewAI, AutoGen, MCP, LLMOps, and enterprise automation.',
    image: '/course-hero/Advance AIML.jpeg',
    primaryCourseId: 'aiml',
    focus: 'Agentic AI',
    audience: 'developers, data professionals, analysts, consultants, and AI builders across India',
    location: 'India',
    tools: ['LangGraph', 'CrewAI', 'AutoGen', 'MCP', 'LLMOps', 'workflow automation'],
    outcomes: ['AI Engineer', 'Agentic AI Developer', 'Automation Consultant', 'AI Solutions Engineer', 'Forward Deployment Engineer'],
  }),
  buildSeoLandingPage({
    slug: 'agentic-ai-course-bangalore',
    title: 'Agentic AI Course in Bangalore | AI Agents & LLMOps',
    eyebrow: 'Bangalore Agentic AI Training',
    heading: 'Agentic AI Course in Bangalore',
    description: 'Study Agentic AI in Bangalore with LangGraph, CrewAI, AutoGen, MCP, RAG agents, and deployment workflows.',
    image: '/office-bg/bangalore.png',
    primaryCourseId: 'aiml',
    focus: 'Agentic AI',
    audience: 'Bangalore engineers, analysts, consultants, and AI professionals',
    location: 'Bangalore',
    tools: ['LangGraph', 'CrewAI', 'AutoGen', 'RAG agents', 'MCP', 'LLMOps'],
    outcomes: ['AI Engineer', 'Agentic AI Developer', 'AI Automation Consultant', 'AI Solutions Engineer', 'FDE'],
  }),
  buildSeoLandingPage({
    slug: 'forward-deployment-engineer-course-india',
    title: 'Forward Deployment Engineer Course in India | AI FDE',
    eyebrow: 'India FDE Training',
    heading: 'Forward Deployment Engineer Course in India',
    description: 'Learn AI Forward Deployment Engineering with customer discovery, GenAI, RAG, agents, APIs, cloud, and production delivery.',
    image: '/course-hero/ai-forward-deployment-engineer.png',
    primaryCourseId: 'fde',
    focus: 'Forward Deployment Engineering',
    audience: 'engineers, analysts, consultants, AI builders, and product-minded professionals across India',
    location: 'India',
    tools: ['Python', 'APIs', 'RAG', 'AI agents', 'cloud deployment', 'observability'],
    outcomes: ['Forward Deployment Engineer', 'AI Solutions Engineer', 'AI Consultant', 'Product Engineer', 'Implementation Engineer'],
  }),
  buildSeoLandingPage({
    slug: 'forward-deployment-engineer-course-bangalore',
    title: 'Forward Deployment Engineer Course in Bangalore | AI FDE',
    eyebrow: 'Bangalore FDE Training',
    heading: 'Forward Deployment Engineer Course in Bangalore',
    description: 'Prepare for AI FDE roles in Bangalore with GenAI apps, RAG, agents, APIs, client discovery, cloud, and delivery projects.',
    image: '/office-bg/bangalore.png',
    primaryCourseId: 'fde',
    focus: 'Forward Deployment Engineering',
    audience: 'Bangalore engineers, analysts, consultants, and AI career switchers',
    location: 'Bangalore',
    tools: ['Python', 'LLM apps', 'RAG', 'AI agents', 'APIs', 'cloud deployment'],
    outcomes: ['Forward Deployment Engineer', 'AI Solutions Engineer', 'AI Implementation Consultant', 'Product Engineer', 'AI Engineer'],
  }),
  buildSeoLandingPage({
    slug: 'forward-deployment-engineer-course-bhubaneswar',
    title: 'Forward Deployment Engineer Course in Bhubaneswar',
    eyebrow: 'Bhubaneswar FDE Training',
    heading: 'Forward Deployment Engineer Course in Bhubaneswar',
    description: 'Learn AI FDE skills in Bhubaneswar: GenAI, RAG, agents, APIs, cloud deployment, client problem solving, and projects.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'fde',
    focus: 'Forward Deployment Engineering',
    audience: 'students, engineers, analysts, and professionals in Bhubaneswar and Odisha',
    location: 'Bhubaneswar and Odisha',
    tools: ['Python', 'RAG', 'AI agents', 'APIs', 'cloud basics', 'business problem discovery'],
    outcomes: ['Forward Deployment Engineer', 'AI Solutions Associate', 'Implementation Engineer', 'AI Consultant', 'Automation Engineer'],
  }),
  buildSeoLandingPage({
    slug: 'cybersecurity-course-india',
    title: 'Cybersecurity Course in India | SOC, Ethical Hacking & AI',
    eyebrow: 'India Cybersecurity Training',
    heading: 'Cybersecurity Course in India',
    description: 'Learn cybersecurity, ethical hacking, SOC, SIEM, cloud security, digital forensics, labs, and placement preparation.',
    image: '/course-hero/APCF.jpeg',
    primaryCourseId: 'apcs',
    focus: 'Cybersecurity',
    audience: 'students, IT professionals, freshers, and security career switchers across India',
    location: 'India',
    tools: ['Linux', 'networking', 'Nmap', 'Burp Suite', 'Splunk', 'cloud security'],
    outcomes: ['SOC Analyst', 'Cybersecurity Analyst', 'Ethical Hacker', 'Penetration Tester', 'Forensics Analyst'],
  }),
  buildSeoLandingPage({
    slug: 'cybersecurity-course-bangalore',
    title: 'Cybersecurity Course in Bangalore | SOC & Ethical Hacking',
    eyebrow: 'Bangalore Cybersecurity Training',
    heading: 'Cybersecurity Course in Bangalore',
    description: 'Join Cybersecurity training in Bangalore with SOC, SIEM, ethical hacking, cloud security, forensics, and hands-on labs.',
    image: '/office-bg/bangalore.png',
    primaryCourseId: 'apcs',
    focus: 'Cybersecurity',
    audience: 'Bangalore students, IT support professionals, graduates, and security aspirants',
    location: 'Bangalore',
    tools: ['networking', 'Linux', 'SIEM', 'Splunk', 'Metasploit', 'cloud security'],
    outcomes: ['SOC Analyst', 'Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester', 'Forensics Analyst'],
  }),
  buildSeoLandingPage({
    slug: 'cybersecurity-course-bhubaneswar',
    title: 'Cybersecurity Course in Bhubaneswar | SOC & Forensics',
    eyebrow: 'Bhubaneswar Cybersecurity Training',
    heading: 'Cybersecurity Course in Bhubaneswar',
    description: 'Study Cybersecurity in Bhubaneswar with ethical hacking, SOC, SIEM, cloud security, digital forensics, and labs.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'apcs',
    focus: 'Cybersecurity',
    audience: 'students, graduates, IT professionals, and career switchers in Bhubaneswar and Odisha',
    location: 'Bhubaneswar and Odisha',
    tools: ['networking', 'Linux', 'Nmap', 'SIEM', 'Splunk', 'digital forensics'],
    outcomes: ['SOC Analyst', 'Cybersecurity Analyst', 'Ethical Hacker', 'Forensics Associate', 'Security Analyst'],
  }),
  buildSeoLandingPage({
    slug: 'data-analytics-course-fees',
    title: 'Data Analytics Course Fees | DV Analytics Syllabus',
    eyebrow: 'Fees & Syllabus',
    heading: 'Data Analytics Course Fees',
    description: 'Explore Data Analytics course fees, syllabus, tools, projects, EMI options, and placement support at DV Analytics.',
    image: '/course-hero/DAS.jpeg',
    primaryCourseId: 'specialist',
    focus: 'Data Analytics Fees and Syllabus',
    audience: 'learners comparing analytics programs, fees, syllabus, and placement outcomes',
    location: 'Bangalore, Bhubaneswar, and India',
    tools: ['SQL', 'Excel AI', 'Python', 'Power BI', 'Tableau', 'dashboard projects'],
    outcomes: ['Data Analyst', 'BI Analyst', 'MIS Analyst', 'Business Analyst', 'Reporting Analyst'],
  }),
  buildSeoLandingPage({
    slug: 'data-science-course-with-placement',
    title: 'Data Science Course With Placement Support | DV Analytics',
    eyebrow: 'Placement-Focused Training',
    heading: 'Data Science Course With Placement Support',
    description: 'Build Data Science, AI, Python, ML, GenAI, projects, resume, interview, and placement readiness with DV Analytics.',
    image: '/companies-banner.jpg',
    primaryCourseId: 'apids',
    focus: 'Data Science with Placement Support',
    audience: 'freshers, graduates, career-gap candidates, and professionals seeking data roles',
    location: 'Bangalore, Bhubaneswar, and India',
    tools: ['Python', 'SQL', 'machine learning', 'GenAI', 'projects', 'interview preparation'],
    outcomes: ['Data Analyst', 'Data Scientist', 'ML Engineer', 'AI Engineer', 'Analytics Consultant'],
  }),
  buildSeoLandingPage({
    slug: 'ai-course-for-freshers',
    title: 'AI Course for Freshers | Data Science, GenAI & Jobs',
    eyebrow: 'Freshers AI Training',
    heading: 'AI Course for Freshers',
    description: 'Start an AI career with Python, Data Science, Machine Learning, GenAI, Agentic AI, projects, and placement guidance.',
    image: '/mobile-industry-ready-poster.jpg',
    primaryCourseId: 'aiml',
    focus: 'AI for Freshers',
    audience: 'fresh graduates and students starting an AI or data career',
    location: 'Bangalore, Bhubaneswar, and India',
    tools: ['Python', 'SQL', 'machine learning', 'GenAI', 'Agentic AI', 'portfolio projects'],
    outcomes: ['AI Analyst', 'Data Analyst', 'Junior Data Scientist', 'ML Associate', 'AI Engineer'],
  }),
  buildSeoLandingPage({
    slug: 'ai-course-for-working-professionals',
    title: 'AI Course for Working Professionals | GenAI & Agentic AI',
    eyebrow: 'Professional AI Upskilling',
    heading: 'AI Course for Working Professionals',
    description: 'Upskill with AI, GenAI, Agentic AI, RAG, automation, analytics, and deployment skills for modern professional roles.',
    image: '/hero-stories/fde-professional.png',
    primaryCourseId: 'aiml',
    focus: 'AI for Working Professionals',
    audience: 'working professionals moving into AI, analytics, automation, and consulting roles',
    location: 'Bangalore, Bhubaneswar, and India',
    tools: ['GenAI', 'RAG', 'Agentic AI', 'automation workflows', 'Python', 'deployment'],
    outcomes: ['AI Engineer', 'AI Consultant', 'Automation Specialist', 'Analytics Consultant', 'FDE'],
  }),
];

const landingPageBySlug = new Map(coreSeoLandingPages.map((page) => [page.slug, page]));
expandedSeoLandingPages.forEach((page) => {
  if (!landingPageBySlug.has(page.slug)) {
    landingPageBySlug.set(page.slug, page);
  }
});

export const seoLandingPages: SeoLandingPage[] = Array.from(landingPageBySlug.values());

export const seoLandingPageById = Object.fromEntries(
  seoLandingPages.map((page) => [page.id, page])
);

export const seoLandingPageBySlug = Object.fromEntries(
  seoLandingPages.map((page) => [page.slug, page])
);
