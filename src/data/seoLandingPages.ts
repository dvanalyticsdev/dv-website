export interface SeoLandingContentSection {
  heading: string;
  intro?: string;
  paragraphs?: string[];
  subsections?: Array<{
    title?: string;
    body: string;
  }>;
  bullets?: string[];
  image?: {
    src: string;
    alt: string;
    align?: 'left' | 'right';
  };
  cta?: {
    heading: string;
    text: string;
    primaryText: string;
    secondaryText?: string;
  };
  contactInfo?: {
    centre: string;
    phone: string;
  };
}

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
  richSections?: SeoLandingContentSection[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const coreSeoLandingPages: SeoLandingPage[] = [
  {
    id: 'lp-data-science-course-bangalore',
    slug: 'data-science-course-bangalore',
    title: 'Data Science Course in Bangalore with Placement Support',
    eyebrow: 'Bangalore Data Science Training',
    heading: 'Data Science Course in Bangalore',
    description:
      'Join DV Analytics for a Data Science course in Bangalore with practical training in Python, SQL, Machine Learning, and Generative AI, plus placement support.',
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
    richSections: [
      {
        heading: 'A Trusted Data Science Training Institute in Bangalore',
        paragraphs: [
          'DV Analytics offers the Best Data Science course in Bangalore. Enroll in the Advanced Program in Industrial Data Science (APIDS) of DV Data & Analytics. Be a certified professional, ready to handle the industry requirements and emerge as a successful name in the coming years.',
          'With a strong emphasis on DBMS programming, Data Mining, Reporting and Visualization, and Machine Learning, our Data Science course in Bangalore for freshers gives you the finest preparation to meet industry standards and demands. Get the knowledge and skills that you need. Excel in the field of data analytics!',
        ],
      },
      {
        heading: 'Why Choose DV Analytics for a Data Science Course in Bangalore?',
        intro:
          'Choosing the right training institute is an important step towards building your career. At DV Analytics, the learning approach focuses on technical knowledge, practical application, and career preparation.',
        subsections: [
          {
            title: 'Training from Industry Experts',
            body: 'Learn important concepts and understand how data science techniques are used to solve business problems.',
          },
          {
            title: 'Practical, Project-Based Learning',
            body: 'Apply your knowledge through exercises and industry-oriented projects instead of relying only on theory.',
          },
          {
            title: 'Learning Management System (LMS)',
            body: 'Access learning resources and recorded sessions where available, helping you revise concepts at your own pace.',
          },
          {
            title: 'Career and Placement Support',
            body: 'Prepare for job opportunities with career guidance, interview preparation, and placement support, according to the programme.',
          },
        ],
      },
      {
        heading: 'What Will You Learn in Our Data Science Course?',
        intro:
          'The course covers important skills used in modern data science and analytics roles. The learning journey can include the following areas, depending on the selected programme.',
        bullets: [
          'Python Programming: Learn programming fundamentals and use Python for data processing, analysis, and modelling.',
          'SQL and Database Management: Understand how to retrieve, organise, and analyse data stored in databases.',
          'Statistics and Data Analysis: Learn to interpret data, identify patterns, and support decisions with meaningful insights.',
          'Data Visualisation: Use tools such as Power BI and Tableau to create dashboards and communicate findings.',
          'Machine Learning: Understand how algorithms can identify patterns, make predictions, and solve business problems.',
          'Generative AI: Explore modern AI concepts and their applications in data science workflows.',
          'Cloud and AI Deployment: Develop an understanding of how data and AI solutions can be deployed in practical environments, where included in the programme.',
        ],
        paragraphs: [
          'The objective is to help you move beyond theoretical knowledge and understand how these technologies are applied in real business situations.',
        ],
      },
      {
        heading: 'Career Opportunities After a Data Science Course',
        intro:
          'A Data Science course can help you prepare for different roles, depending on your skills, project experience, qualifications, and interview performance. Some career paths to explore include:',
        bullets: [
          'Data Scientist',
          'Junior Data Scientist',
          'Data Analyst',
          'Machine Learning Engineer',
          'Business Intelligence Analyst',
          'Junior Data Engineer',
          'AI and Analytics Associate',
        ],
        paragraphs: [
          'Each role has different requirements. For example, data analyst positions often focus on SQL, reporting, and visualisation, while data scientist and Machine Learning roles may require stronger programming, statistics, and modelling skills.',
          'The course can provide a foundation for these career paths, but employment depends on individual performance and employer requirements.',
        ],
      },
      {
        heading: 'Placement Assistance and Career Preparation',
        paragraphs: [
          'Learning technical skills is only one part of preparing for a data science career. You also need to explain your projects clearly, demonstrate problem-solving ability, and perform well in interviews.',
          'DV Analytics provides placement support as part of its advertised learner benefits. Depending on the programme, career preparation may include resume guidance, interview practice, project discussions, and job-related support.',
          'Before joining, ask the admissions team about the placement process, eligibility conditions, programme-specific support, and the roles relevant to your background.',
        ],
        cta: {
          heading: 'Explore Our Data Science Programme and Placement Support',
          text: 'Talk with our advisors in Bangalore about upcoming batches, syllabus, and placement services.',
          primaryText: 'Enquire About the Course',
          secondaryText: 'Talk to Our Course Advisor',
        },
      },
    ],
    faqs: [
      {
        question: 'Which is the right Data Science course in Bangalore for beginners?',
        answer:
          'Beginners should look for a course that covers Python, SQL, statistics, data visualisation, and Machine Learning, starting with the fundamentals. A programme with practical projects, trainer guidance, and career preparation can help learners build confidence and develop job-relevant skills.',
      },
      {
        question: 'Can a non-technical graduate join a Data Science course at DV Analytics?',
        answer:
          'Yes, DV Analytics lists graduates from technical and non-technical backgrounds among its intended learners. If you are new to programming, ask about the beginner-level modules and the prerequisites for your chosen programme before enrolling.',
      },
      {
        question: 'What topics are covered in the Data Science course?',
        answer:
          'Depending on the programme, the syllabus may include Python programming, SQL, statistics, data analysis, Power BI, Tableau, Machine Learning, Generative AI, and practical projects. Contact DV Analytics to confirm the complete syllabus for the specific course you want to join.',
      },
      {
        question: 'Does DV Analytics provide placement assistance after the Data Science course?',
        answer:
          'DV Analytics advertises placement support for learners. Contact the admissions team to understand the placement process, interview preparation, eligibility requirements, and the support available for your selected programme. Placement assistance does not necessarily guarantee a job offer.',
      },
      {
        question: 'How can I enrol in a Data Science course at DV Analytics, Bangalore?',
        answer:
          'You can contact DV Analytics at +91 8095 881 188 or +91 7483 596 228 to enquire about admission. Ask the team about course fees, duration, upcoming batches, online or offline learning options, and the opportunity to attend a demo or counselling session.',
      },
    ],
  },
  {
    id: 'lp-data-analytics-course-bangalore',
    slug: 'data-analytics-course-bangalore',
    title: 'Data Analytics Course in Bangalore with Placement Support',
    eyebrow: 'Bangalore Analytics Training',
    heading: 'Data Analytics Course in Bangalore',
    description:
      'Join DV Analytics for an Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) in Bangalore. Learn SQL, Python, Excel AI, Power BI, Tableau, Machine Learning, Generative AI, and Agentic AI with practical training and placement support.',
    image: '/course-hero/APIDA.png',
    primaryCourseId: 'apida',
    bullets: [
      'SQL, Python, Excel AI, Power BI, Tableau, and SAS Programming',
      'Machine Learning, Generative AI, and Agentic AI workflows',
      'Industrial dashboards, KPI reporting, and end-to-end MLOps solutions',
      'Beginner-friendly path for graduates and working professionals',
      'Dedicated interview preparation and placement assistance',
    ],
    sections: [
      {
        title: 'Built for Industrial Analytics & AI Careers',
        body:
          'This program is designed for learners who want an advanced, industry-ready Data Analytics and AI career in Bangalore, covering end-to-end data pipelines, business reporting, and intelligent agentic workflows.',
      },
      {
        title: 'Complete Industrial Tool Stack',
        body:
          'Learners master SQL Server, Python, Advanced Excel with AI, Power Query, Power BI, Tableau, SAS, Machine Learning algorithms, and Generative AI frameworks used by enterprise data teams.',
      },
      {
        title: 'High-Demand Role Readiness',
        body:
          'The curriculum prepares you for roles such as Data Analyst, Business Intelligence Engineer, Analytics Consultant, MIS Specialist, Power BI Developer, and AI-enabled Analytics Specialist.',
      },
    ],
    richSections: [
      {
        heading: 'Best Data Analytics Institute in Bangalore',
        paragraphs: [
          'DV Data & Analytics is offering the best data analytics course in Bangalore with 100% Placement Assistance. Enroll in our Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) to obtain comprehensive training in data analytics, with a focus on practical industry applications.',
          'We have the most industry-ready program. Get equipped with a holistic skill set, essential for addressing industry demands, including data analysis, storytelling dashboard creation, DBMS programming, advanced visualization, and advanced analytics for predictive model and strategic action building. Get ready for the industry!',
        ],
      },
      {
        heading: 'Why is DV Analytics the Best Data Analytics Training Institute in Bangalore?',
        intro:
          'Choosing the right Data Analytics training institute in Bangalore is an important step towards building your career. At DV Analytics, the focus is on helping students understand technical concepts and apply them in practical situations.',
        subsections: [
          {
            title: 'Industrial & AI-Driven Curriculum',
            body: 'Learn end-to-end Data Analytics concepts, including Advanced Excel AI, SQL database programming, Statistics, Python, Power BI, Tableau, SAS, Machine Learning, and Generative AI & Agentic AI.',
          },
          {
            title: 'Hands-On Project Experience',
            body: 'Apply your knowledge through practical assignments and industry-oriented projects across BFSI, retail, e-commerce, and healthcare domains.',
          },
          {
            title: 'Training by Industry Experts',
            body: 'Learn from experienced data consultants and AI practitioners who explain real-world industry use cases using practical examples and guide you through portfolio building.',
          },
          {
            title: 'Flexible Learning Support',
            body: 'Access learning resources, code repositories, and recorded class sessions through our Learning Management System (LMS) with continuous mentor guidance.',
          },
          {
            title: 'Career Guidance and Placement Support',
            body: 'Prepare for job opportunities with 1-on-1 resume reviews, mock technical interviews, LinkedIn profile optimization, and direct hiring referrals.',
          },
        ],
      },
      {
        heading: 'What Will You Learn in the Data Analytics Course?',
        intro:
          'Our Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) covers the complete modern analytics lifecycle from raw data ingestion to AI-powered decision intelligence.',
        subsections: [
          {
            title: '1. Advanced Excel & AI-Driven Reporting',
            body: 'Master Excel functions, formulas, pivot tables, data cleaning, Power Query, Power Pivot, dynamic dashboard creation, and AI-assisted analysis for enterprise reporting.',
          },
          {
            title: '2. SQL & Relational Database Management',
            body: 'Learn how to retrieve, manipulate, and manage enterprise data using SQL. Master complex joins, subqueries, views, stored procedures, window functions, and query optimization.',
          },
          {
            title: '3. Python for Analytics & Automation',
            body: 'Build strong programming fundamentals with Python. Use Pandas, NumPy, and automation scripts to clean, transform, and analyze large-scale structured and unstructured datasets.',
          },
          {
            title: '4. SAS Programming & Regulatory Reporting',
            body: 'Learn Base SAS, Data Step programming, PROC SQL, and macro programming widely used in banking, insurance, healthcare, and risk analytics.',
          },
          {
            title: '5. Business Intelligence with Power BI & Tableau',
            body: 'Design interactive, storytelling executive dashboards and enterprise KPI reporting systems using Power BI (DAX, data modeling, RLS) and Tableau Desktop.',
          },
          {
            title: '6. Machine Learning & Predictive Analytics',
            body: 'Understand supervised and unsupervised machine learning algorithms, regression, classification, and statistical modeling to forecast trends and build predictive business solutions.',
          },
          {
            title: '7. Generative AI & Agentic AI for Analytics',
            body: 'Harness LLMs, prompt engineering, AI analytics copilots, and autonomous agentic workflows to automate data analysis, code generation, and business reporting.',
          },
        ],
      },
      {
        heading: 'Practical Data Analytics Projects and Industry Applications',
        intro:
          'Learning Data Analytics becomes more meaningful when you apply concepts to practical problems. During your training, project work and assignments help you understand the complete process, from preparing raw data to analysing results and presenting insights.',
        bullets: [
          'Analysing commercial datasets using SQL, Python, and Excel AI',
          'Automating data cleaning pipelines and transformation workflows',
          'Building automated visual dashboards in Power BI and Tableau for executive decision-makers',
          'Developing predictive machine learning models for customer churn and sales forecasting',
          'Implementing Generative AI and agentic workflows for automated business reporting',
          'Domain-specific capstones in BFSI, retail e-commerce, telecommunications, and healthcare',
        ],
      },
      {
        heading: 'Who Can Join the Data Analytics Course in Bangalore?',
        intro:
          'The Data Analytics course may be suitable for learners from different academic and professional backgrounds.',
        bullets: [
          'Freshers and recent graduates: Build foundational and advanced technical skills to launch high-growth data analytics careers.',
          'Commerce, Engineering, and Science graduates: Strengthen your knowledge of SQL, Python, business intelligence, and AI-driven analytics.',
          'Non-technical graduates: Learn step-by-step from foundational data analysis to advanced AI tools with structured mentor support.',
          'Working professionals: Upgrade your skills from manual reporting to automated BI, machine learning, and Generative AI workflows.',
          'Career switchers: Transition into in-demand roles across Data Analytics, Business Intelligence, and Analytics Consulting.',
        ],
      },
      {
        heading: 'Career Opportunities After a Data Analytics Course',
        intro:
          'Industrial Data Analytics and AI skills are highly sought-after across IT, banking, fintech, healthcare, retail, e-commerce, and consulting. Graduates can explore high-impact roles such as:',
        bullets: [
          'Data Analyst',
          'Business Intelligence (BI) Analyst / BI Developer',
          'Industrial Analytics Specialist',
          'Power BI / Tableau Developer',
          'Analytics Consultant',
          'MIS Executive / Reporting Lead',
          'Operations Analyst',
          'Junior AI / Analytics Engineer',
        ],
      },
      {
        heading: 'Placement Assistance and Career Preparation',
        paragraphs: [
          'Learning technical skills is only one part of preparing for a successful analytics career. You also need to communicate your insights clearly, demonstrate real-world projects, and excel in technical and case study interviews.',
          'DV Analytics provides 100% dedicated placement support, including personalized resume crafting, LinkedIn optimization, mock interviews with industry leaders, and direct interview scheduling with hiring partners.',
        ],
        cta: {
          heading: 'Take the first step towards building your Industrial Data Analytics & AI skills.',
          text: 'Contact DV Analytics to discuss your career goals and book a free counseling or demo session.',
          primaryText: 'Enquire About the Course',
          secondaryText: 'Talk to Our Course Advisor',
        },
      },
    ],
    faqs: [
      {
        question: 'Which is the best Data Analytics training institute in Bangalore?',
        answer:
          'DV Analytics offers the most comprehensive Data Analytics program in Bangalore through the Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA). The program covers Excel AI, SQL, Python, Power BI, Tableau, SAS, Machine Learning, Gen AI, and 100% placement support.',
      },
      {
        question: 'Can I join a Data Analytics course in Bangalore without a technical background?',
        answer:
          'Yes. The APIDA program is designed to take learners from fundamentals (Excel, SQL, basic statistics) through to advanced analytics, visualization, and AI tools with dedicated mentor guidance at every stage.',
      },
      {
        question: 'What topics are covered in the Data Analytics course at DV Analytics?',
        answer:
          'The curriculum covers Advanced Excel with AI, SQL database querying, Python programming, SAS, Power BI, Tableau, statistical analysis, predictive machine learning, and Generative AI & Agentic AI automation.',
      },
      {
        question: 'Does DV Analytics provide placement assistance after the Data Analytics course?',
        answer:
          'Yes. DV Analytics provides 100% placement assistance, including 1-on-1 resume reviews, mock interviews, capstone portfolio building, and job interview referrals across leading hiring partners.',
      },
      {
        question: 'What career opportunities are available after completing the Data Analytics course in Bangalore?',
        answer:
          'Graduates can step into roles such as Data Analyst, BI Analyst, Power BI Developer, Tableau Specialist, MIS Specialist, Business Analyst, Analytics Consultant, and Industrial Analytics Specialist.',
      },
    ],
  },
  {
    id: 'lp-data-analytics-course-bhubaneswar',
    slug: 'data-analytics-course-bhubaneswar',
    title: 'Data Analytics Course in Bhubaneswar with Placement Support',
    eyebrow: 'Bhubaneswar Analytics Training',
    heading: 'Data Analytics Course in Bhubaneswar',
    description:
      'Join the Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) in Bhubaneswar at DV Analytics. Learn Excel, SQL, Python, Power BI, Tableau, Machine Learning, and Gen AI with hands-on projects and placement support.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'apida',
    bullets: [
      'Comprehensive APIDA curriculum: SQL, Python, Excel AI, Power BI, and Tableau',
      'Advanced exposure to Machine Learning, Generative AI, and Agentic AI',
      'Hands-on portfolio projects, business dashboards, and industrial case studies',
      'Local Bhubaneswar offline center with expert mentors and LMS access',
      '100% placement assistance and career guidance for Odisha technology opportunities',
    ],
    sections: [
      {
        title: 'Bhubaneswar Career Relevance',
        body:
          'Bhubaneswar is rapidly emerging as a technology and analytics hub. Developing modern Data Analytics and AI skills enables graduates and working professionals to secure high-value data roles locally and nationwide.',
      },
      {
        title: 'Hands-On Learning with AI Exposure',
        body:
          'Learners practice SQL queries, Python data pipelines, Excel AI workflows, Power BI dashboards, predictive machine learning, and Generative AI agentic applications.',
      },
      {
        title: 'Dedicated Placement Preparation',
        body:
          'DV Analytics supports learners with resume guidance, mock interview sessions, GitHub project portfolio building, and direct corporate recruitment referrals.',
      },
    ],
    richSections: [
      {
        heading: 'Best Data Analytics Institute in Bhubaneswar with Placement Support',
        paragraphs: [
          'Are you interested in learning data analytics and launching a high-growth career? DV Analytics offers the Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) in Bhubaneswar for students, fresh graduates, and working professionals who want industry-ready skills.',
          'Today, modern enterprises rely on data to understand customers, streamline operations, and drive strategic growth. This has created tremendous demand for skilled analytics professionals who can manage databases, uncover insights, build predictive models, and leverage Generative AI.',
          'At DV Analytics, you master the complete modern analytics stack: Advanced Excel with AI, SQL, Python, Power BI, Tableau, Machine Learning, and Agentic AI workflows. The program focuses on hands-on practical learning to help you solve real-world industrial challenges.',
          'Whether you come from an IT, engineering, commerce, or non-technical background, our structured curriculum and experienced mentors ensure you become job-ready from day one.',
          'Looking for the best Data Analytics Course in Bhubaneswar? Contact DV Analytics today to learn about the APIDA syllabus, course fees, upcoming batches, and placement support.',
        ],
      },
      {
        heading: 'Why Choose DV Analytics for Data Analytics Training in Bhubaneswar?',
        intro:
          'Learning data analytics becomes effective when you understand how tools and methodologies apply to real business situations. Simply knowing theory is not enough—you need rigorous hands-on practice. DV Analytics combines practical projects, expert mentorship, and cutting-edge Gen AI workflows:',
        bullets: [
          'Practical training: Work with real datasets, prepare enterprise reports, and create interactive BI dashboards.',
          'Industry-relevant tools: Master Excel AI, SQL, Python, Power BI, Tableau, and Generative AI frameworks.',
          'Project-based learning: Complete end-to-end industrial capstones across banking, e-commerce, and healthcare.',
          'Expert guidance: Learn from seasoned data analysts and AI consultants with personalized feedback.',
          'LMS & study resources: Access class recordings, coding repositories, and interview prep materials anytime.',
          '100% placement support: Get resume reviews, mock interviews, and direct referral opportunities with hiring partners.',
        ],
        paragraphs: [
          'The course is structured step by step, taking you from fundamentals to advanced AI and predictive analytics with complete confidence.',
        ],
      },
      {
        heading: 'What Will You Learn in Our Data Analytics Course?',
        intro:
          'Our Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) covers the skills demanded by top employers in today’s AI-powered data landscape:',
        subsections: [
          {
            title: '1. Advanced Excel & AI-Powered Reporting',
            body: 'Excel remains an essential tool for business reporting. Learn advanced formulas, nested Lookups, pivot tables, data cleaning with Power Query, and AI-assisted data modeling.',
          },
          {
            title: '2. SQL & Database Querying',
            body: 'Master SQL for enterprise database management. Write complex queries, joins, aggregations, views, subqueries, and window functions to extract and manipulate large-scale datasets.',
          },
          {
            title: '3. Python for Data Analytics & Automation',
            body: 'Learn Python programming for data science. Work with Pandas, NumPy, and automation scripts to process, clean, and analyze complex commercial data efficiently.',
          },
          {
            title: '4. Power BI & Tableau Data Visualization',
            body: 'Turn data into compelling visual stories. Build interactive executive dashboards, DAX measures, KPI scorecards, and custom visual reports for strategic business communication.',
          },
          {
            title: '5. Business Statistics & Predictive Modeling',
            body: 'Understand descriptive and inferential statistics, hypothesis testing, and regression analysis to identify market trends and support data-backed decision-making.',
          },
          {
            title: '6. Machine Learning & Generative AI Exposure',
            body: 'Explore foundational Machine Learning algorithms, predictive analytics, Generative AI tools, and Agentic AI workflows that set you apart from traditional data analysts.',
          },
        ],
      },
      {
        heading: 'Who Can Join the Data Analytics Course in Bhubaneswar?',
        intro:
          'You do not need prior programming experience to start learning data analytics. Our APIDA training is designed for diverse academic and career backgrounds:',
        bullets: [
          'Fresh graduates: Build foundational and modern analytics skills to secure entry-level technical roles.',
          'College students: Gain in-demand project experience that gives you a competitive advantage during campus placements.',
          'Non-IT graduates: Transition into IT and data analytics by learning programming and tools step by step.',
          'Working professionals: Upgrade your reporting, BI dashboarding, and predictive analytics skills for career progression.',
          'Finance, sales, and marketing executives: Leverage data and AI to drive smarter business decisions.',
        ],
        paragraphs: [
          'No prior coding background is required. Training begins from absolute scratch with hands-on practice.',
        ],
      },
      {
        heading: 'Career Opportunities After a Data Analytics Course',
        intro:
          'Data analytics skills are essential across IT, banking, healthcare, retail, finance, and logistics. Upon completing the course, you can explore high-demand roles such as:',
        bullets: [
          'Data Analyst',
          'Business Intelligence (BI) Analyst',
          'MIS Executive / Reporting Lead',
          'Power BI / Tableau Developer',
          'Junior Business Analyst',
          'Operations Analyst',
          'Analytics Consultant',
        ],
        paragraphs: [
          'Your career opportunities will be backed by strong capstone projects, hands-on tool fluency, and targeted interview preparation.',
        ],
      },
      {
        heading: 'Data Analytics Course with Placement Support in Bhubaneswar',
        paragraphs: [
          'If your goal is to launch a data career after training, it is crucial to choose an institute that prepares you for every stage of recruitment.',
          'DV Analytics provides comprehensive placement support, including personalized resume building, GitHub portfolio development, mock interviews, and placement coordination with hiring partners across Bhubaneswar, Bangalore, and nationwide.',
          'Our mentors ensure you gain confidence in presenting your projects and answering real-world technical and business scenario questions.',
          'Take the next step towards your analytics career. Contact DV Analytics to discuss syllabus details, batch schedules, and placement assistance.',
        ],
        cta: {
          heading: 'Enquire about the Data Analytics Course in Bhubaneswar today.',
          text: 'Talk with our learning counselors about syllabus, batch timings, and placement services.',
          primaryText: 'Enquire Now',
          secondaryText: 'Contact Advisor',
        },
        contactInfo: {
          centre: 'Plot No. A/7, adjacent to Maharaja Cine Complex, Bhoinagar, Acharya Vihar, Bhubaneswar – 751022.',
          phone: '+91 8095 881 188 / +91 7483 596 228',
        },
      },
    ],
    faqs: [
      {
        question: 'Which is the best Data Analytics Course in Bhubaneswar?',
        answer:
          'DV Analytics provides the leading Data Analytics training in Bhubaneswar through the Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA). It covers Excel AI, SQL, Python, Power BI, Tableau, Machine Learning, Generative AI, and dedicated placement support.',
      },
      {
        question: 'Who can join a Data Analytics Course at DV Analytics?',
        answer:
          'Fresh graduates, college students, working professionals, and career switchers from any background (technical or non-technical) are eligible to join. Training starts from foundational concepts.',
      },
      {
        question: 'What tools are taught in the Data Analytics Course in Bhubaneswar?',
        answer:
          'The course covers Advanced Excel with AI, SQL database programming, Python for analytics, Power BI, Tableau, Statistics, and introductory Machine Learning & Generative AI workflows.',
      },
      {
        question: 'Can I get a job after completing a Data Analytics Course?',
        answer:
          'Yes. Completing the APIDA program prepares you for roles such as Data Analyst, BI Analyst, MIS Executive, and Reporting Specialist. DV Analytics provides comprehensive placement assistance to help you secure job opportunities.',
      },
      {
        question: 'How can I enrol in the Data Analytics Course at DV Analytics in Bhubaneswar?',
        answer:
          'You can contact DV Analytics to ask about the syllabus, fees, course duration, batch schedules, and admission process. Training centre: Plot No. A/7, adjacent to Maharaja Cine Complex, Bhoinagar, Acharya Vihar, Bhubaneswar – 751022. Contact: +91 8095 881 188 or +91 7483 596 228.',
      },
    ],
  },
  {
    id: 'lp-data-science-course-bhubaneswar',
    slug: 'data-science-course-bhubaneswar',
    title: 'Data Science Course in Bhubaneswar with Placement Support',
    eyebrow: 'Bhubaneswar Data Science Training',
    heading: 'Data Science Course in Bhubaneswar',
    description:
      'Join DV Analytics for a Data Science Course in Bhubaneswar. Learn Python, SQL, Machine Learning and Generative AI with practical training and placement support.',
    image: '/office-bg/bhubneshwar.png',
    primaryCourseId: 'apids',
    bullets: [
      'Job-focused Data Science curriculum for students, graduates, and working professionals in Bhubaneswar and Odisha',
      'Python, SQL, Power BI, machine learning, GenAI, and practical project workflows',
      'Career mentoring, resume reviews, mock interviews, and placement assistance',
      'Learning support for Bhubaneswar and Odisha with online and classroom-friendly options',
    ],
    sections: [
      {
        title: 'Why Learn Data Science in Bhubaneswar',
        body:
          'Bhubaneswar is rapidly developing as an IT hub with increasing demand for data-skilled talent. DV Analytics equips students and working professionals with industrial Data Science expertise.',
      },
      {
        title: 'Comprehensive Tool Stack',
        body:
          'Work with Python, SQL, Power BI, machine learning algorithms, deep learning networks, Generative AI models, and real-time business pipelines.',
      },
      {
        title: 'Career Outcomes',
        body:
          'Prepare for high-growth roles such as Data Scientist, ML Engineer, Business Intelligence Analyst, Data Analyst, and AI Associate across top tech firms.',
      },
    ],
    richSections: [
      {
        heading: 'Data Science Course in Bhubaneswar with Placement Support',
        paragraphs: [
          'Build your skills and prepare for a career in Data Science with DV Analytics in Bhubaneswar. Our Data Science course is designed for graduates, freshers, working professionals, and career changers who want to learn how to work with data and understand modern AI technologies.',
          'You will learn important concepts such as Python programming, SQL, statistics, data analysis, Machine Learning, and Generative AI. The training focuses on understanding concepts, practising with relevant tools, and applying your knowledge through practical projects.',
          'Whether you are starting your career or looking to upgrade your existing skills, this course can help you build a strong foundation for opportunities in Data Science and related technology fields.',
          'Ready to take the next step in your career? Contact DV Analytics to learn about the course curriculum, upcoming batches, fees, and placement support.',
        ],
      },
      {
        heading: 'Why is DV Analytics the Best Data Science Institute in Bhubaneswar?',
        intro:
          'Choosing the right training institute in Bhubaneswar is an important step towards building a career in Data Science. At DV Analytics, learners can develop technical knowledge and practical skills through structured training and guided learning. Here is how the learning experience can support your career goals:',
        bullets: [
          'Industry-relevant curriculum: Learn Data Science concepts and tools used in data analysis, Machine Learning, and AI applications.',
          'Python and SQL training: Develop programming and database skills to work with different types of datasets.',
          'Practical project experience: Apply what you learn to practical exercises and projects.',
          'Expert guidance: Get support from trainers to understand technical concepts and improve your problem-solving skills.',
          'Placement assistance: Prepare for job opportunities with guidance on interview preparation and career development.',
          'Learning support: Explore available learning resources and class support to revise concepts and strengthen your understanding.',
        ],
        paragraphs: [
          'The goal is to help you move beyond theoretical knowledge and understand how Data Science skills can be applied to real business problems.',
        ],
      },
      {
        heading: 'What Skills Will You Learn in Our Data Science Course?',
        intro:
          'The Data Science course covers essential technical skills that help learners understand data, identify patterns, and develop analytical solutions. The exact modules and tools may vary by programme, so ask our team for the latest syllabus.',
        subsections: [
          {
            title: '1. Python Programming',
            body: 'Python is widely used in Data Science because it helps professionals process data, automate tasks, and build analytical models. You will learn programming fundamentals and develop an understanding of how Python can be used for data-related tasks.',
          },
          {
            title: '2. SQL and Database Management',
            body: 'Data professionals often need to collect and manage information stored in databases. Learn SQL concepts, write queries, filter records, and retrieve relevant data for analysis.',
          },
          {
            title: '3. Statistics and Data Analysis',
            body: 'Statistics helps you understand data and make informed decisions. Learn how to examine datasets, identify patterns, interpret results, and use analytical methods to answer business questions.',
          },
          {
            title: '4. Data Visualisation and Reporting',
            body: 'Learn how to present data in a clear and meaningful way. Depending on the selected programme, you may explore tools such as Power BI, Tableau, or Excel to create reports and dashboards.',
          },
          {
            title: '5. Machine Learning',
            body: 'Machine Learning helps computers identify patterns in data and make predictions based on those patterns. Understand key concepts, common algorithms, model evaluation, and practical applications.',
          },
          {
            title: '6. Generative AI and Modern AI Applications',
            body: 'Explore how Generative AI is changing the way businesses work with information and automate tasks. Depending on the programme, you may also learn about AI applications, model integration, and deployment concepts.',
          },
          {
            title: '7. Practical Projects',
            body: 'Practical experience helps connect classroom learning with real-world applications. Work on guided exercises and projects to strengthen your technical understanding, practise problem-solving, and build examples of your work for your portfolio.',
          },
        ],
      },
      {
        heading: 'Who Can Join the Data Science Training in Bhubaneswar?',
        intro:
          'Our Data Science training is suitable for learners from different educational and professional backgrounds. You can consider this course if you are:',
        bullets: [
          'A fresher looking to start a career in the IT or analytics industry.',
          'A graduate from a technical or non-technical background who wants to learn Data Science.',
          'A working professional planning to upgrade your technical skills.',
          'A software or IT professional interested in Machine Learning and AI.',
          'An analyst who wants to develop stronger programming and predictive analytics skills.',
          'A career changer looking to explore opportunities in Data Science.',
        ],
        paragraphs: [
          'You do not necessarily need an advanced programming background to begin learning. However, your eligibility will depend on the selected programme. Check the course requirements with the admissions team before enrolling.',
        ],
      },
      {
        heading: 'Career Opportunities After a Data Science Course',
        intro:
          'Data Science skills are useful across industries such as banking, healthcare, retail, education, e-commerce, and information technology. Organisations use data to understand customer behaviour, improve business processes, measure performance, and support decision-making. After developing the required skills and practical experience, you can explore roles such as:',
        bullets: [
          'Data Scientist',
          'Junior Data Scientist',
          'Data Analyst',
          'Machine Learning Engineer',
          'Business Intelligence Analyst',
          'Data Analytics Consultant',
          'AI and Data Science Associate',
        ],
        paragraphs: [
          'The roles you qualify for will depend on your education, technical skills, project experience, and interview performance. Completing a course can help you prepare, but it does not guarantee a job or a particular salary.',
        ],
      },
      {
        heading: 'Data Science Course with Placement Assistance in Bhubaneswar',
        paragraphs: [
          'Learning technical skills is only one part of preparing for a job. You also need to explain your projects, demonstrate your problem-solving ability, and communicate your knowledge clearly during interviews.',
          'DV Analytics offers placement support as part of its career-focused training approach. Depending on the programme, this may include guidance on resume preparation, interview practice, project presentation, and job opportunities.',
          'Before enrolling, ask the admissions team about the placement assistance included in your selected course, eligibility requirements, hiring opportunities, and the current placement process.',
        ],
      },
      {
        heading: 'Learn Data Science at DV Analytics, Bhubaneswar',
        paragraphs: [
          'If you are searching for a Data Science training institute in Bhubaneswar, DV Analytics provides a local learning option for people who want to develop skills in Data Science, analytics, and AI.',
          'Contact our team to discuss your career goals, understand the syllabus, check available learning modes, and find a suitable batch.',
        ],
        cta: {
          heading: 'Ready to Explore Data Science in Bhubaneswar?',
          text: 'Contact our team to discuss your career goals, syllabus, and upcoming batches.',
          primaryText: 'Enquire Now',
          secondaryText: 'Contact Advisor',
        },
        contactInfo: {
          centre: 'Plot No. A/7, adjacent to Maharaja Cine Complex, Bhoinagar, Acharya Vihar, Bhubaneswar – 751022.',
          phone: '+91 8095 881 188 / +91 7483 596 228',
        },
      },
    ],
    faqs: [
      {
        question: 'Which is a good institute for a Data Science course in Bhubaneswar?',
        answer:
          'DV Analytics is an option for learners in Bhubaneswar who want to study Data Science, Python, SQL, Machine Learning, and AI-related technologies. Before choosing an institute, compare the syllabus, practical projects, trainer experience, learning support, and placement assistance.',
      },
      {
        question: 'Who is eligible to join the Data Science course at DV Analytics?',
        answer:
          'Graduates from technical and non-technical backgrounds, freshers, and working professionals may be eligible for suitable programmes. Eligibility can vary by course, so contact DV Analytics to confirm the requirements for your chosen programme.',
      },
      {
        question: 'What topics are covered in a Data Science course?',
        answer:
          'A Data Science course commonly covers Python, SQL, statistics, data analysis, data visualisation, Machine Learning, and practical projects. Advanced programmes may also include Generative AI and deployment-related skills. Check the latest DV Analytics syllabus for the exact modules.',
      },
      {
        question: 'Does DV Analytics provide placement support after the Data Science course?',
        answer:
          'DV Analytics promotes placement support for its training programmes. The available support may include resume preparation, interview guidance, project presentation, and job-related assistance, depending on the selected programme. Contact the admissions team for the current terms and eligibility criteria.',
      },
      {
        question: 'What is the fee and duration of the Data Science course in Bhubaneswar?',
        answer:
          'The fee and duration depend on the programme, course level, and curriculum. Contact DV Analytics to get the latest details about course fees, duration, upcoming batches, payment options, and available training modes.',
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
