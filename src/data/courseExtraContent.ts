export interface KeyLearningArea {
  label: string;
  icon: 'code' | 'brain' | 'rag' | 'cloud' | 'deployment' | 'network' | 'hacking' | 'forensics' | 'threat' | 'chip' | 'analysis' | 'visualization' | 'stats' | 'projects' | 'database';
}

export interface WhyChooseCard {
  title: string;
  description: string;
}

export interface CourseWhyChooseSection {
  heading: string;
  intro: string;
  subheading?: string;
  cards?: WhyChooseCard[];
  list?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CourseHeroData {
  prefix?: string;
  title: string;
  highlight?: string;
  keyAreas: KeyLearningArea[];
}

export const courseHeroData: Record<string, CourseHeroData> = {
  fde: {
    prefix: 'Master Program in',
    title: 'Master Program in AI Forward Deployment Engineer (FDE)',
    highlight: 'AI Forward Deployment Engineer (FDE)',
    keyAreas: [
      { label: 'Programming & Scripting', icon: 'code' },
      { label: 'Generative AI & LLMs', icon: 'brain' },
      { label: 'RAG & AI Agents', icon: 'rag' },
      { label: 'Cloud & APIs', icon: 'cloud' },
      { label: 'Deployment & MLOps', icon: 'deployment' },
    ],
  },
  apcs: {
    prefix: 'AI Integrated Advanced Program in',
    title: 'AI Integrated Advanced Program in Cybersecurity & Forensics (APCF)',
    highlight: 'Cybersecurity & Forensics (APCF)',
    keyAreas: [
      { label: 'Network Security', icon: 'network' },
      { label: 'Ethical Hacking', icon: 'hacking' },
      { label: 'Digital Forensics', icon: 'forensics' },
      { label: 'Threat Detection', icon: 'threat' },
      { label: 'AI Security Tools', icon: 'chip' },
    ],
  },
  specialist: {
    title: 'Data Analytics Specialist (DAS)',
    highlight: 'Data Analytics Specialist (DAS)',
    keyAreas: [
      { label: 'Data Analysis', icon: 'analysis' },
      { label: 'Data Visualization', icon: 'visualization' },
      { label: 'Statistical Modeling', icon: 'stats' },
      { label: 'Real-World Projects', icon: 'projects' },
    ],
  },
  apids: {
    prefix: 'Advanced Program in',
    title: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
    highlight: 'Industrial Data Science with AI Deployment (APIDS)',
    keyAreas: [
      { label: 'Python for Data Science', icon: 'code' },
      { label: 'SQL & Databases', icon: 'database' },
      { label: 'Machine Learning & Deep Learning', icon: 'stats' },
      { label: 'Generative AI & LLMs', icon: 'brain' },
      { label: 'Deployment & MLOps', icon: 'deployment' },
    ],
  },
  apida: {
    prefix: 'Advance Program in',
    title: 'Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA)',
    highlight: 'Industrial Data Analytics with Gen AI & Agentic AI (APIDA)',
    keyAreas: [
      { label: 'Excel & Advanced VBA', icon: 'analysis' },
      { label: 'SQL & Database Querying', icon: 'database' },
      { label: 'Power BI & Dashboards', icon: 'visualization' },
      { label: 'Python Analytics & Pandas', icon: 'code' },
      { label: 'Gen AI & Agentic AI Workflows', icon: 'brain' },
    ],
  },
  flp: {
    prefix: 'Self-Paced Program in',
    title: 'Flexi Learning Program in Data Science & AI (FLP)',
    highlight: 'Flexi Learning Program in Data Science & AI (FLP)',
    keyAreas: [
      { label: 'Python for Data Science', icon: 'code' },
      { label: 'SQL & Relational Databases', icon: 'database' },
      { label: 'Power BI & Visual Analytics', icon: 'visualization' },
      { label: 'Machine Learning & AI', icon: 'stats' },
      { label: 'Generative AI Applications', icon: 'brain' },
    ],
  },
};

export const courseCustomHeadings: Record<string, {
  overviewHeading?: string;
  modulesHeading?: string;
  careersHeading?: string;
  outcomesHeading?: string;
  whoShouldJoinHeading?: string;
  whoShouldJoinIntro?: string;
}> = {
  fde: {
    overviewHeading: 'AI Forward Deployment Engineer Course Overview',
    modulesHeading: 'What You Will Learn in the AI FDE Program?',
    careersHeading: 'Career Opportunities After Completing the AI Forward Deployment Engineer Course',
    outcomesHeading: 'Key Learning Outcomes of the AI FDE Course',
  },
  apcs: {
    overviewHeading: 'Program Overview: Advanced Cybersecurity and Forensics Course',
    whoShouldJoinHeading: 'Who Can Enrol in Our Cybersecurity and Forensics Course?',
    modulesHeading: 'Cybersecurity and Digital Forensics Course Modules',
    careersHeading: 'Career Opportunities After Completing the Cybersecurity and Forensics Course',
    outcomesHeading: 'Cybersecurity Training Outcomes and Professional Skills',
  },
  specialist: {
    overviewHeading: 'Data Analytics Specialist Program Overview',
    whoShouldJoinHeading: 'Who Can Join the Data Analytics Specialist Program?',
    whoShouldJoinIntro: 'The Data Analytics Specialist program is suitable for students, graduates and working professionals from different educational and professional backgrounds.',
    modulesHeading: 'Data Analytics Specialist Program Modules',
    careersHeading: 'Career Opportunities After Completing the Data Analytics Specialist Program',
    outcomesHeading: 'What You Will Learn in the Data Analytics Specialist Program',
  },
  apids: {
    overviewHeading: 'Program Overview: Advanced Industrial Data Science and AI Training',
    whoShouldJoinHeading: 'Who Can Join the Industrial Data Science & AI (APIDS) Program?',
    whoShouldJoinIntro:
      'The APIDS program is tailored for fresh graduates, postgraduates, career switchers, and working professionals who want end-to-end expertise in Data Science, Machine Learning, Generative AI, and Cloud AI Deployment.',
    modulesHeading: 'Industrial Data Science & AI Deployment Modules',
    careersHeading: 'Career Opportunities After a Data Science and AI Course',
    outcomesHeading: 'Industrial Data Science Program Outcome',
  },
  apida: {
    overviewHeading: 'Program Overview: Advance Industrial Data Analytics, Gen AI & Agentic AI Training',
    whoShouldJoinHeading: 'Who Can Join the Industrial Data Analytics & AI (APIDA) Program?',
    whoShouldJoinIntro:
      'The APIDA program is designed for fresh graduates, students, and working professionals from both technical and non-technical backgrounds who want to build an industry-ready career in Data Analytics, Business Intelligence, and Generative AI.',
    modulesHeading: 'Industrial Data Analytics with Gen AI & Agentic AI Modules',
    careersHeading: 'Career Opportunities After Completing the APIDA Course',
    outcomesHeading: 'Key Learning Outcomes of the APIDA Program',
  },
};

export const courseWhyChooseData: Record<string, CourseWhyChooseSection> = {
  apids: {
    heading: 'Why Choose DV Analytics for Industrial Data Science & AI Training?',
    intro:
      'At DV Analytics, the Advanced Program in Industrial Data Science with AI Deployment (APIDS) bridges the gap between academic theory and enterprise production. You learn from practicing data scientists and AI architects while building real-world solutions across BFSI, healthcare, retail, and telecom.',
    cards: [
      {
        title: 'End-to-End Data Science & AI Stack',
        description: 'Master SQL, Python, SAS, Power BI, Tableau, Machine Learning, Deep Learning, NLP, Generative AI, Agentic AI, and MLOps.',
      },
      {
        title: 'Hands-On Practical Coding',
        description: 'Build strong programming and analytical fluency through daily live coding labs, case studies, and guided assignments.',
      },
      {
        title: 'Enterprise Capstone Projects',
        description: 'Deliver production-grade data science and AI projects across banking, healthcare, retail, e-commerce, and telecom domains.',
      },
      {
        title: 'Generative AI & Agentic AI Workflows',
        description: 'Work with LLMs, Prompt Engineering, RAG, LangChain, vector databases, and autonomous multi-agent systems.',
      },
      {
        title: 'Cloud Deployment & MLOps',
        description: 'Learn to containerize, deploy, monitor, and scale AI models in production using AWS, Azure, Docker, and CI/CD pipelines.',
      },
      {
        title: 'Mentorship by Industry Experts',
        description: 'Learn directly from senior data scientists and AI consultants with 15+ years of real-world enterprise delivery experience.',
      },
      {
        title: '24/7 LMS & Recorded Sessions',
        description: 'Access lifetime learning resources, code repositories, interview question banks, and recorded live classes at your own pace.',
      },
      {
        title: 'Dedicated Placement Assistance',
        description: 'Receive 1-on-1 resume building, GitHub portfolio optimization, mock technical interviews, and direct corporate hiring referrals.',
      },
    ],
  },
  apida: {
    heading: 'Why Choose DV Analytics for Industrial Data Analytics & Gen AI Training?',
    intro:
      'Choosing the right Data Analytics training institute is essential for launching a high-growth career. The Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) at DV Analytics combines foundational business analytics with modern AI-powered automation and practical project delivery.',
    cards: [
      {
        title: 'Industrial & AI-Driven Curriculum',
        description: 'Master Advanced Excel with AI, SQL, Python, SAS, Power BI, Tableau, Statistics, Predictive Modeling, and Generative AI & Agentic AI.',
      },
      {
        title: 'Beginner-Friendly Step-by-Step Path',
        description: 'Designed for both technical and non-technical learners—start from data fundamentals and progress smoothly to advanced AI analytics.',
      },
      {
        title: 'Executive BI & Storytelling Dashboards',
        description: 'Design interactive KPI scorecards, DAX models, and automated visual dashboards in Power BI and Tableau for business leaders.',
      },
      {
        title: 'Real-World Domain Projects',
        description: 'Solve practical business challenges through hands-on projects in BFSI, retail, e-commerce, healthcare, and supply chain analytics.',
      },
      {
        title: 'Gen AI & Agentic Analytics Automation',
        description: 'Leverage AI copilots, prompt engineering, and agentic workflows to automate data cleaning, querying, and executive reporting.',
      },
      {
        title: 'Training by Senior Data Consultants',
        description: 'Gain practical insights from industry mentors who share real enterprise case studies, best practices, and portfolio guidance.',
      },
      {
        title: 'Flexible Live Classes & 24/7 LMS',
        description: 'Attend interactive online or classroom sessions in Bangalore and Bhubaneswar with full access to recorded lectures and study materials.',
      },
      {
        title: '100% Placement Support & Career Prep',
        description: 'Prepare for top analytics roles with personalized resume reviews, mock interviews, LinkedIn profile building, and hiring partner referrals.',
      },
    ],
  },
  fde: {
    heading: 'Why Choose DV Analytics for AI Forward Deployment Engineer Training?',
    intro:
      "Choosing the right AI training institute is an important step towards building a successful career in Artificial Intelligence. At DV Analytics, the AI Forward Deployment Engineer program focuses on practical learning, modern AI technologies and real-world application development. The program helps learners understand how to build, integrate and deploy AI-powered solutions while developing the technical and problem-solving skills required in today's AI-driven industries.",
    cards: [
      {
        title: 'Industry-Relevant Curriculum',
        description: 'Learn Python, Machine Learning, Generative AI, LLMs, RAG, AI Agents and other in-demand technologies.',
      },
      {
        title: 'Hands-On Practical Training',
        description: 'Develop your coding and problem-solving skills through practical exercises, assignments and application development.',
      },
      {
        title: 'Real-World Industry Projects',
        description: 'Work on AI project scenarios involving healthcare, finance, insurance, legal services and business automation.',
      },
      {
        title: 'Full-Stack AI Development',
        description: 'Learn to build AI-powered applications using Python, React, FastAPI, APIs, databases and AI frameworks.',
      },
      {
        title: 'Modern AI Tools & Frameworks',
        description: 'Explore LangChain, LangGraph, vector databases, MCP and modern AI coding assistants.',
      },
      {
        title: 'Cloud Deployment & MLOps',
        description: 'Understand AI application deployment using AWS, Docker, Kubernetes and CI/CD practices.',
      },
      {
        title: 'Business Problem-Solving Skills',
        description: 'Learn to understand business requirements and develop customised AI solutions for real-world challenges.',
      },
      {
        title: 'Career-Oriented Learning',
        description: 'Build practical project experience, strengthen your technical portfolio and prepare for AI-focused career opportunities.',
      },
    ],
  },
  apcs: {
    heading: 'Why Choose DV Analytics for Cybersecurity and Cyber Forensics Training?',
    intro:
      'DV Analytics offers a structured cybersecurity and cyber forensics training program designed to help students and working professionals develop practical skills in digital security, ethical hacking and forensic investigation. The program combines expert-led training, practical exercises, industry-based case studies and career preparation to help learners understand real-world cybersecurity challenges.',
    subheading: 'Key reasons to choose DV Analytics:',
    list: [
      'Industry-Experienced Trainers: Learn cybersecurity concepts and practical techniques from experienced industry professionals.',
      'Practical Hands-On Training: Develop practical skills through assignments, demonstrations, cybersecurity exercises and case studies.',
      'Comprehensive Course Curriculum: Learn networking, Linux, Python, ethical hacking, penetration testing, cyber forensics and incident response.',
      'Real-World Cybersecurity Case Studies: Understand security breaches, digital evidence collection, malware analysis and forensic investigation through practical examples.',
      'Live Online and Offline Classes: Choose a suitable learning mode and access recorded sessions for revision through the LMS.',
      'Industry-Relevant Skills: Develop knowledge of cybersecurity practices, vulnerability assessment, digital evidence handling and incident management.',
      'Resume and Interview Preparation: Receive guidance on resume development, communication skills and mock interviews.',
      'Placement Assistance: Get career guidance, interview preparation and job referral support to explore opportunities in the cybersecurity industry.',
    ],
  },
  specialist: {
    heading: 'Why Choose DV Analytics for Data Analytics Specialist Training?',
    intro:
      'Choosing the right training institute is an important step towards becoming a Data Analytics Specialist. DV Analytics offers practical, industry-focused training to help students and working professionals develop essential data analysis, visualization and statistical skills. With hands-on projects, expert guidance and career support, learners can build the knowledge required to explore opportunities in Data Analytics.',
    subheading: '8 Key Reasons to Choose DV Analytics',
    list: [
      'Industry-Relevant Curriculum: Learn essential skills and tools required to build a career as a Data Analytics Specialist.',
      'Practical Hands-On Training: Develop practical knowledge through assignments, exercises and real-world data analysis activities.',
      'Real-World Industry Projects: Work on industry-based projects to understand business data, reporting and analytical techniques.',
      'Expert Trainer Guidance: Learn from experienced trainers who provide guidance throughout your Data Analytics Specialist training.',
      'Beginner-Friendly Learning: Start with basic concepts and gradually develop your data analysis and technical skills.',
      'Industry-Relevant Tools: Gain practical experience with SQL, Python, Advanced Excel, Power BI and Tableau.',
      'Career and Placement Assistance: Get support with resume preparation, interview preparation and career guidance.',
      'Flexible Learning Options: Choose online or offline training options based on your learning preferences.',
    ],
  },
};

export const courseCareerIntroTexts: Record<string, string[]> = {
  apids: [
    'The Advanced Program in Industrial Data Science with AI Deployment (APIDS) equips learners with the complete technical and analytical skill set demanded by modern data and AI teams.',
    'Graduates can explore high-impact roles across IT enterprises, global capability centers (GCCs), banking, fintech, healthcare, e-commerce, and AI consulting firms:',
  ],
  apida: [
    'The Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) prepares learners for high-demand analytics, business intelligence, and AI-enabled reporting roles.',
    'Depending on your educational background, project portfolio, and technical fluency, you can pursue career paths across entry, mid, and senior levels:',
  ],
  apcs: [
    'The AI Integrated Advanced Program in Cybersecurity & Forensics (APCF) at DV Analytics helps learners develop practical skills for exploring career opportunities in the growing cybersecurity industry.',
    'After completing the cybersecurity and forensics course, learners can explore various job roles across IT companies, cybersecurity firms, financial institutions, government organisations and technology companies.',
    'Depending on their technical knowledge, practical experience and skills, learners can pursue career opportunities such as:',
  ],
};

export const courseFaqsData: Record<string, { title: string; items: FaqItem[] }> = {
  fde: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is an AI Forward Deployment Engineer course?',
        answer: 'An AI Forward Deployment Engineer course teaches learners how to develop, integrate and deploy AI-powered applications to solve real business problems. It covers Python, Generative AI, LLMs, RAG, AI Agents, APIs and cloud deployment.',
      },
      {
        question: 'What is the duration of the AI Forward Deployment Engineer course at DV Analytics?',
        answer: 'The AI Forward Deployment Engineer program at DV Analytics has a duration of 6 months. The program combines technical training, practical learning and industry-based projects.',
      },
      {
        question: 'What is the syllabus of the AI Forward Deployment Engineer course?',
        answer: 'The course syllabus covers Python programming, SQL, Machine Learning, Deep Learning, Generative AI, Large Language Models (LLMs), Prompt Engineering, RAG, AI Agents, LangChain, LangGraph, APIs, Cloud Computing, Docker, Kubernetes and MLOps.',
      },
      {
        question: 'Who is eligible to join an AI Forward Deployment Engineer course?',
        answer: 'Engineering graduates, Computer Science students, software developers, data analysts and working professionals interested in Artificial Intelligence can consider this program. Basic programming knowledge is helpful for understanding the technical concepts.',
      },
      {
        question: 'What skills are required to become an AI Forward Deployment Engineer?',
        answer: 'A basic understanding of programming, problem-solving and software development is helpful. Knowledge of Python, APIs, databases, Machine Learning and cloud technologies can also support your learning journey.',
      },
      {
        question: 'What is the difference between an AI Engineer and a Forward Deployment Engineer?',
        answer: 'An AI Engineer mainly develops AI models, systems and applications. A Forward Deployment Engineer works closely with clients to understand business requirements, customise AI solutions, integrate systems and deploy applications in real business environments.',
      },
      {
        question: 'What technologies will I learn in the AI Forward Deployment Engineer program?',
        answer: 'You will learn Python, SQL, React, FastAPI, Machine Learning, Generative AI, LLMs, RAG, LangChain, LangGraph, MCP, vector databases, AWS, Docker and Kubernetes.',
      },
      {
        question: 'Does the AI Forward Deployment Engineer course include Generative AI and Agentic AI?',
        answer: 'Yes. The program covers Generative AI, Large Language Models, Prompt Engineering, Retrieval-Augmented Generation (RAG), AI Agents and multi-agent workflow automation.',
      },
      {
        question: 'What practical projects are included in the AI Forward Deployment Engineer course?',
        answer: 'Learners get exposure to practical AI project scenarios such as enterprise knowledge assistants, document automation, customer support copilots, financial research assistants, legal contract analysers and multi-agent workflow automation systems.',
      },
      {
        question: 'Can beginners learn AI Forward Deployment Engineering?',
        answer: 'Yes. Learners with basic programming knowledge can start building their AI engineering skills through structured training. However, an understanding of Python and software development will be helpful for progressing through advanced topics.',
      },
      {
        question: 'What career opportunities are available after completing an AI Forward Deployment Engineer course?',
        answer: 'After developing the required technical skills and project experience, learners can explore roles such as Forward Deployment Engineer, AI Engineer, Generative AI Engineer, AI Solutions Engineer, AI Consultant, AI Implementation Consultant and LLMOps Engineer.',
      },
      {
        question: 'Does DV Analytics provide placement assistance for the AI Forward Deployment Engineer course?',
        answer: 'Please contact the DV Analytics admissions team for details about the current placement assistance, career guidance and recruitment support available for this program.',
      },
      {
        question: 'What is the difference between a Generative AI Engineer and an AI Forward Deployment Engineer?',
        answer: 'A Generative AI Engineer focuses on building applications powered by generative models and LLMs. An AI Forward Deployment Engineer focuses on implementing AI solutions in real business environments, including application development, system integration and deployment.',
      },
      {
        question: 'Why should I choose DV Analytics for AI Forward Deployment Engineer training?',
        answer: 'DV Analytics offers a structured AI learning program covering programming, Generative AI, LLMs, RAG, AI Agents, cloud deployment and practical projects. The program helps learners develop technical knowledge and understand how AI solutions are implemented.',
      },
      {
        question: 'How can I enrol in the AI Forward Deployment Engineer course at DV Analytics?',
        answer: 'You can contact the DV Analytics admissions team through the official website to enquire about course details, upcoming batches, fees, training modes and admission requirements.',
      },
    ],
  },
  apcs: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is the Cybersecurity and Cyber Forensics course at DV Analytics?',
        answer: 'The Cybersecurity and Cyber Forensics course at DV Analytics helps learners develop skills in cybersecurity, ethical hacking, penetration testing, digital forensics and incident response. The program combines theoretical learning with practical exercises and real-world case studies.',
      },
      {
        question: 'Who is eligible to join the Cybersecurity course?',
        answer: 'Graduates, postgraduate students, freshers and working professionals from technical and non-technical backgrounds can explore this course. Basic computer knowledge and an interest in cybersecurity are helpful for beginners.',
      },
      {
        question: 'Do I need programming knowledge to join a Cybersecurity course?',
        answer: 'No, advanced programming knowledge is not required to start learning cybersecurity. The course introduces relevant fundamentals, including Python, operating systems and networking, before moving to advanced cybersecurity concepts.',
      },
      {
        question: 'What topics are covered in the Cybersecurity and Forensics course?',
        answer: 'The course covers several important topics, including: Cybersecurity fundamentals, Linux and Windows operating systems, Networking and security protocols, Python programming, Ethical hacking and penetration testing, Vulnerability assessment, Malware and phishing analysis, Digital and mobile forensics, Evidence collection and preservation, and Incident response and cloud forensics.',
      },
      {
        question: 'Does DV Analytics provide placement assistance after the Cybersecurity course?',
        answer: 'Yes, DV Analytics provides career and placement assistance. Students receive support with resume preparation, mock interviews, interview preparation and job referrals to help them explore relevant cybersecurity career opportunities.',
      },
      {
        question: 'What career opportunities are available after completing a Cybersecurity course?',
        answer: 'After developing the required technical knowledge and practical skills, learners can explore career opportunities such as: Cybersecurity Analyst, Information Security Analyst, Ethical Hacker, Penetration Tester, Digital Forensics Analyst, Security Operations Centre (SOC) Analyst, Incident Response Analyst, and Vulnerability Assessment Analyst.',
      },
      {
        question: 'Can beginners join the Cybersecurity and Ethical Hacking course?',
        answer: 'Yes, beginners can join the program. The learning journey starts with foundational concepts and gradually introduces advanced topics such as ethical hacking, vulnerability assessment and cyber forensics.',
      },
      {
        question: 'Are online and offline Cybersecurity classes available at DV Analytics?',
        answer: 'Yes, DV Analytics offers online and offline learning options. Students can choose a suitable mode of training based on their location and learning preferences. Recorded sessions are also available through the learning management system.',
      },
      {
        question: 'What practical projects will I work on during the Cybersecurity training?',
        answer: 'Students can learn through practical exercises and case studies involving network security, vulnerability analysis, malware and phishing investigation, digital evidence collection, mobile forensics and incident response.',
      },
      {
        question: 'How long does it take to complete the Cybersecurity and Forensics course?',
        answer: 'The total duration depends on the selected training modules and batch schedule. Contact the DV Analytics admissions team for the latest course duration and batch details.',
      },
      {
        question: 'What is the fee for the Cybersecurity and Cyber Forensics course at DV Analytics?',
        answer: 'The course fee depends on the selected program, training modules and learning mode. Contact DV Analytics to get the latest fee structure, available payment options and upcoming batch details.',
      },
      {
        question: 'Will I receive a certificate after completing the Cybersecurity course?',
        answer: 'Students should confirm the applicable course completion certificate and certification details with the DV Analytics admissions team before enrolling.',
      },
      {
        question: 'Is the Cybersecurity course suitable for working professionals?',
        answer: 'Yes, the program can be explored by working professionals who want to upgrade their technical skills, move into cybersecurity roles or develop expertise in ethical hacking and digital forensics. Online learning and recorded sessions can also support flexible learning.',
      },
      {
        question: 'Where can I learn Cybersecurity and Cyber Forensics in Bangalore or Bhubaneswar?',
        answer: 'DV Analytics offers training in Bangalore and Bhubaneswar, along with online learning options. Interested students can contact the institute to enquire about classroom availability, upcoming batches and course admission.',
      },
    ],
  },
  specialist: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is a Data Analytics Specialist course?',
        answer: 'A Data Analytics Specialist course teaches you how to collect, manage, analyse and understand data using tools such as SQL, Python, Excel, Power BI and Tableau.',
      },
      {
        question: 'Who can join the Data Analytics Specialist course?',
        answer: 'Graduates, postgraduate students, freshers and working professionals from technical and non-technical backgrounds can join this course.',
      },
      {
        question: 'What is the duration of the Data Analytics Specialist course?',
        answer: 'The course duration is approximately 2–3 months, depending on the training schedule.',
      },
      {
        question: 'What tools will I learn in the Data Analytics course?',
        answer: 'You will learn SQL, Python, Advanced Excel, Power BI and Tableau for data management, analysis, reporting and visualization.',
      },
      {
        question: 'Do I need programming knowledge to learn Data Analytics?',
        answer: 'No. Beginners can start with basic concepts and gradually learn SQL and Python through practical training.',
      },
      {
        question: 'What career opportunities are available after completing this course?',
        answer: 'You can explore roles such as Data Analyst, MIS Analyst, Reporting Analyst, Business Analyst, Power BI Developer and Business Intelligence Analyst.',
      },
      {
        question: 'Does DV Analytics provide placement assistance?',
        answer: 'Yes. DV Analytics provides career guidance and placement assistance, including support with resume preparation, profile building and interview preparation.',
      },
      {
        question: 'Can working professionals join the Data Analytics course?',
        answer: 'Yes. Working professionals who want to improve their analytical skills or explore new career opportunities can enrol in the program.',
      },
      {
        question: 'Will I work on practical Data Analytics projects?',
        answer: 'Yes. The program includes hands-on assignments, case studies and industry-oriented projects covering sectors such as banking, healthcare, telecom and e-commerce.',
      },
      {
        question: 'Can I attend Data Analytics classes online?',
        answer: 'Yes. DV Analytics offers live online and offline training options.',
      },
    ],
  },
  apids: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is the Advanced Program in Industrial Data Science and AI (APIDS)?',
        answer: 'The APIDS program is an industry-oriented training course that teaches Data Science, Artificial Intelligence, Machine Learning and AI deployment through practical learning and projects.',
      },
      {
        question: 'Who can join the APIDS course?',
        answer: 'Fresh graduates, MBA graduates, B.Sc., BCA, B.Tech, M.Sc. and MCA students, working professionals and individuals planning to switch to a career in Data Science and AI can join this course.',
      },
      {
        question: 'What will I learn in the Industrial Data Science and AI course?',
        answer: 'You will learn Python, SQL, Machine Learning, Deep Learning, Generative AI, Large Language Models (LLMs), AI deployment and MLOps.',
      },
      {
        question: 'Do I need programming knowledge to join the APIDS course?',
        answer: 'Basic computer knowledge is helpful. Beginners can also join, as the program covers Python programming and other important concepts required for Data Science.',
      },
      {
        question: 'How long does it take to complete the APIDS course?',
        answer: 'The APIDS course duration is approximately 6–8 months, with live online and offline classes.',
      },
      {
        question: 'What career opportunities are available after completing the APIDS course?',
        answer: 'After completing the course and gaining practical skills, learners can explore roles such as Data Analyst, Data Scientist, Machine Learning Engineer, AI Engineer and Generative AI Engineer.',
      },
      {
        question: 'Does the APIDS course provide placement assistance?',
        answer: "Learners can benefit from career guidance, interview preparation and placement assistance, subject to the program's placement support policies.",
      },
    ],
  },
  apida: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is the Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA)?',
        answer: 'APIDA is an industry-focused training program at DV Analytics that covers the complete data analytics lifecycle—from Excel AI, SQL, Python, SAS, Power BI, and Tableau to Statistical Modeling, Machine Learning, Generative AI, and Agentic AI workflows.',
      },
      {
        question: 'Who is eligible to join the APIDA course?',
        answer: 'Fresh graduates, college students, career switchers, and working professionals from both technical and non-technical backgrounds (B.Com, BBA, MBA, B.Sc, BCA, B.Tech, M.Sc, MCA, etc.) can enroll in the APIDA program.',
      },
      {
        question: 'Do I need prior coding experience to join the APIDA program?',
        answer: 'No prior programming experience is required. The curriculum starts from absolute fundamentals in Excel, SQL, and Python and gradually builds up to advanced analytics, BI dashboarding, and Generative AI.',
      },
      {
        question: 'What tools and technologies are covered in the APIDA course?',
        answer: 'You will master Advanced Excel with AI, SQL Server, Python (Pandas, NumPy, Matplotlib, Seaborn), SAS Programming, Power BI, Tableau, Business Statistics, Predictive Machine Learning, Generative AI, and Agentic AI tools.',
      },
      {
        question: 'What is the duration of the APIDA course?',
        answer: 'The APIDA program duration is approximately 4–5 months with live interactive online and offline classroom sessions, hands-on assignments, and real-time domain capstones.',
      },
      {
        question: 'What kind of practical projects will I build during the APIDA training?',
        answer: 'Learners work on real-world industry projects across banking, finance, retail, e-commerce, healthcare, and telecommunications—building automated data pipelines, executive Power BI/Tableau dashboards, and predictive analytics solutions.',
      },
      {
        question: 'What career opportunities are available after completing the APIDA course?',
        answer: 'Graduates can explore roles such as Data Analyst, Business Intelligence (BI) Analyst, Power BI / Tableau Developer, MIS Specialist, SAS Analyst, Reporting Analyst, Business Analyst, and AI-Enabled Analytics Specialist.',
      },
      {
        question: 'Does DV Analytics provide placement assistance for the APIDA program?',
        answer: 'Yes. DV Analytics provides 100% placement assistance, including 1-on-1 resume building, GitHub and BI portfolio preparation, mock technical interviews, and job referrals through hiring partners in Bangalore, Bhubaneswar, and across India.',
      },
    ],
  },
};

export const homeFaqsData: FaqItem[] = [
  {
    question: 'Which is the best institute to learn Data Science and Artificial Intelligence in India?',
    answer: 'DV Analytics is a Data Science and AI training institute offering industry-oriented programmes in Data Science, Artificial Intelligence, Generative AI, Data Analytics and Cybersecurity. Learners can choose online training or classroom programmes at its institutes in Bangalore and Bhubaneswar.',
  },
  {
    question: 'Does DV Analytics offer online and offline Data Science courses?',
    answer: 'Yes, DV Analytics offers online Data Science and AI training as well as classroom-based learning at its training institutes in Bangalore and Bhubaneswar. Learners can choose a suitable learning format based on their preferences and requirements.',
  },
  {
    question: 'Does DV Analytics provide placement assistance after completing a Data Science course?',
    answer: 'Yes, DV Analytics provides placement assistance to eligible learners. The support includes resume preparation, technical interview guidance, mock interviews and information about relevant job opportunities. Placement assistance does not guarantee employment.',
  },
  {
    question: 'Can a non-technical graduate learn Data Science and Artificial Intelligence?',
    answer: 'Yes, graduates from non-technical backgrounds can start learning Data Science and Artificial Intelligence. A structured learning programme covering Python, statistics, SQL, data analytics and Machine Learning can help beginners build the necessary technical foundation.',
  },
  {
    question: 'What will I learn in a Data Science and AI training programme?',
    answer: 'You will learn Python, SQL, Statistics, Data Analytics, Machine Learning, Deep Learning, Generative AI, Agentic AI and AI deployment. The programme also includes practical assignments and industry-based projects to help you develop real-world skills.',
  },
  {
    question: 'What is the difference between Data Science and Data Analytics?',
    answer: 'Data Analytics focuses on examining existing data to identify trends, generate reports and support business decisions. Data Science covers a broader range of techniques, including statistics, programming, predictive modelling and Machine Learning, to extract insights and build data-driven solutions.',
  },
  {
    question: 'Does DV Analytics offer Generative AI and Agentic AI courses?',
    answer: 'Yes, DV Analytics offers specialised training programmes covering Generative AI and emerging AI technologies. Learners can explore concepts such as Large Language Models (LLMs), prompt engineering, Retrieval-Augmented Generation (RAG) and Agentic AI, depending on the selected programme.',
  },
  {
    question: 'What jobs can I get after completing a Data Science course?',
    answer: 'After completing a Data Science course, you can explore career opportunities as a Data Analyst, Data Scientist, Machine Learning Engineer, AI Engineer, Business Analyst or Data Engineer, depending on your skills and qualifications.',
  },
  {
    question: 'What is a Forward Deployment Engineer (FDE) course?',
    answer: 'An FDE course teaches you how to build, customise and implement AI solutions to solve real-world business problems.',
  },
  {
    question: 'What is a Forward Deployment Engineer (FDE) course, and what will I learn?',
    answer: 'An AI Forward Deployment Engineer (FDE) course teaches you how to build, customise and implement AI solutions for real-world business needs. You will learn Python, Generative AI, LLMs, RAG, Agentic AI, AI application development and AI deployment.',
  },
  {
    question: 'Can working professionals join Data Science and AI courses?',
    answer: 'Yes, working professionals can join Data Science and AI courses to improve their technical skills and explore new career opportunities.',
  },
  {
    question: 'How can I enroll in a Data Science or AI course at DV Analytics?',
    answer: 'You can visit the DV Analytics website, explore the available training programmes and contact the admissions team to discuss course details, eligibility, upcoming batches and fees. You can also enquire about online and classroom training options in Bangalore and Bhubaneswar.',
  },
];
