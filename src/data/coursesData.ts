export interface SubSection {
  title: string;
  topics: string[];
  applications?: string[];
}

export interface CourseModule {
  title: string;
  description?: string;
  sections: SubSection[];
}

export interface IndustryProject {
  title: string;
  description?: string;
}

export interface ProjectDomain {
  domain: string;
  projects: Array<IndustryProject | string>;
}

export interface CareerLevel {
  level: string;
  roles: string[];
}

export interface DetailedCourse {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  duration: string;
  practicalExposure: string[];
  expertiseAreas?: string[];
  theme: 'blue' | 'purple' | 'indigo' | 'magenta' | 'orange' | 'teal';
  modules: CourseModule[];
  industryProjects: ProjectDomain[];
  programOutcome: string[];
  careers: CareerLevel[];
  whoShouldJoin: string[];
  careerAdvantage: string;
  certifications?: string[];
}

export const coursesData: Record<string, DetailedCourse> = {
  APIDS: {
    id: 'apids',
    title: 'Advanced Program in Industrial Data Science & AI (APIDS)',
    tagline: 'A comprehensive industry-oriented program covering the complete lifecycle of data-driven business solutions—from data collection to AI deployment in the cloud.',
    overview: 'The Advanced Program in Industrial Data Science & AI (APIDS) is a comprehensive industry-oriented training program designed to prepare students, graduates, working professionals, and career transition candidates for successful careers in Data Science, Artificial Intelligence, and Analytics.\n\nThe program follows a 360-degree learning approach, covering the complete lifecycle of data-driven business solutions—from data collection and management to advanced AI model development and deployment in cloud environments.',
    duration: '6-8 Months',
    practicalExposure: [
      'Instructor-led training',
      'Real-world industry projects',
      'Case studies and assignments',
      'Hands-on Industry Projects',
      'Industry Mentorship',
      'Resume Building',
      'Interview Preparation',
      'Tests and Mock Interviews',
      'Placement support',
    ],
    expertiseAreas: [
      'Data Management',
      'Data Analysis & Visualization',
      'Machine Learning & Artificial Intelligence',
      'Generative AI & Agentic AI',
      'Cloud Deployment & AI Operations',
    ],
    theme: 'blue',
    modules: [
      {
        title: 'Module 1: Data Management & Programming',
        sections: [
          {
            title: 'SQL (Structured Query Language)',
            topics: [
              'Database Concepts',
              'Data Modeling',
              'SQL Server / MySQL',
              'DDL, DML, DCL Commands',
              'Joins',
              'Subqueries & CTE',
              'Views',
              'Stored Procedures',
              'Functions',
              'Window Functions',
              'Query Optimization',
            ],
            applications: [
              'Customer Analytics',
              'Banking Analytics',
              'Sales Analytics',
              'Data Extraction',
              'Business Reporting',
            ],
          },
          {
            title: 'Python Programming',
            topics: [
              'Python Fundamentals',
              'Variables & Data Types',
              'Loops & Conditions',
              'Functions',
              'File Handling',
              'OOP Concepts',
              'Exception Handling',
              'APIs',
              'Python Libraries',
            ],
            applications: [
              'Data Processing',
              'Automation',
              'AI Development',
              'Business Analytics',
            ],
          },
          {
            title: 'SAS Programming',
            topics: [
              'Base SAS',
              'Data Step Programming',
              'PROC SQL',
              'Macro Programming',
              'Data Manipulation',
              'Statistical Procedures',
              'Reporting',
            ],
            applications: [
              'Banking Analytics',
              'Insurance Analytics',
              'Healthcare Analytics',
              'Credit Risk Analytics',
            ],
          },
          {
            title: 'PySpark & Scala',
            topics: [
              'Big Data Concepts',
              'Apache Spark',
              'Distributed Computing',
              'Spark SQL',
              'DataFrames',
              'RDD',
              'Spark ML',
            ],
            applications: [
              'Large Scale Data Processing',
              'Telecom Analytics',
              'Retail Analytics',
              'AI Data Engineering',
            ],
          },
        ],
      },
      {
        title: 'Module 2: Data Analysis & Visualization',
        sections: [
          {
            title: 'Excel + AI',
            topics: [
              'Advanced Excel',
              'Pivot Tables',
              'Power Query',
              'Power Pivot',
              'Dashboard Development',
              'AI Assisted Analytics',
              'Business Forecasting',
            ],
            applications: [
              'MIS Reporting',
              'Sales Analytics',
              'Finance Analytics',
              'HR Analytics',
            ],
          },
          {
            title: 'Power BI',
            topics: [
              'Data Modeling',
              'DAX',
              'Power Query',
              'Interactive Dashboards',
              'KPI Design',
              'Row Level Security',
            ],
            applications: [
              'Executive Dashboards',
              'Financial Reporting',
              'Customer Analytics',
              'Business Intelligence',
            ],
          },
          {
            title: 'Tableau',
            topics: [
              'Tableau Desktop',
              'Data Connections',
              'Visual Analytics',
              'Storytelling',
              'Dashboard Design',
              'Calculated Fields',
            ],
            applications: [
              'Data Visualization',
              'Executive Reporting',
              'Marketing Analytics',
              'Operational Analytics',
            ],
          },
        ],
      },
      {
        title: 'Module 3: Data Mining & Artificial Intelligence',
        sections: [
          {
            title: 'Python Statistics',
            topics: [
              'Descriptive Statistics',
              'Probability',
              'Hypothesis Testing',
              'Correlation',
              'Regression',
              'Statistical Modeling',
            ],
            applications: [
              'Business Decision Making',
              'Market Research',
              'Customer Behavior Analysis',
            ],
          },
          {
            title: 'Machine Learning',
            topics: [
              'Supervised Learning',
              'Unsupervised Learning',
              'Feature Engineering',
              'Classification Models',
              'Regression Models',
              'Clustering',
              'Ensemble Techniques',
            ],
            applications: [
              'Credit Risk Models',
              'Customer Churn Prediction',
              'Fraud Detection',
              'Recommendation Systems',
            ],
          },
          {
            title: 'Deep Learning',
            topics: [
              'Neural Networks',
              'TensorFlow',
              'Keras',
              'CNN',
              'RNN',
              'LSTM',
            ],
            applications: [
              'Image Analytics',
              'Speech Recognition',
              'Predictive Intelligence',
            ],
          },
          {
            title: 'Natural Language Processing (NLP)',
            topics: [
              'Text Mining',
              'Sentiment Analysis',
              'Text Classification',
              'Chatbots',
              'Language Models',
            ],
            applications: [
              'Customer Feedback Analytics',
              'AI Assistants',
              'Social Media Analytics',
            ],
          },
          {
            title: 'Generative AI',
            topics: [
              'Large Language Models',
              'Prompt Engineering',
              'RAG Architecture',
              'AI Agents',
              'AI Workflows',
              'Vector Databases',
            ],
            applications: [
              'AI Chatbots',
              'Enterprise AI Assistants',
              'Content Automation',
              'Knowledge Management',
            ],
          },
          {
            title: 'Agentic AI',
            topics: [
              'AI Agents',
              'Multi-Agent Systems',
              'Autonomous Decision Making',
              'Workflow Automation',
              'Tool Calling',
              'Agent Orchestration',
            ],
            applications: [
              'AI Business Automation',
              'Autonomous Customer Support',
              'Intelligent Operations',
            ],
          },
        ],
      },
      {
        title: 'Module 4: AI Deployment & Operations',
        sections: [
          {
            title: 'MLOps',
            topics: [
              'Model Deployment',
              'Model Monitoring',
              'CI/CD Pipelines',
              'Version Control',
              'Automation',
            ],
            applications: [
              'Production ML Systems',
              'Enterprise AI Deployment',
            ],
          },
          {
            title: 'LLMOps',
            topics: [
              'LLM Deployment',
              'Prompt Monitoring',
              'RAG Deployment',
              'Vector Databases',
              'LLM Governance',
            ],
            applications: [
              'Enterprise Gen AI Solutions',
              'AI Knowledge Systems',
            ],
          },
          {
            title: 'AIOps',
            topics: [
              'AI Infrastructure Monitoring',
              'Incident Prediction',
              'Cloud Monitoring',
              'Automated Remediation',
            ],
            applications: [
              'IT Operations Automation',
              'Enterprise Monitoring Systems',
            ],
          },
          {
            title: 'Cloud Platforms',
            topics: [
              'AWS (S3, EC2, SageMaker, Lambda)',
              'Microsoft Azure (Azure ML, Data Factory, Synapse Analytics)',
              'Google Cloud Platform (Vertex AI, BigQuery, Cloud Storage)',
            ],
            applications: [
              'AI Deployment',
              'Scalable Analytics',
              'Cloud-Based AI Solutions',
            ],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'Banking & Finance',
        projects: [
          {
            title: 'Credit Risk Application Scorecard',
            description: 'Develop Machine Learning models to predict whether a loan applicant is likely to repay or default using customer profile, income, credit bureau score, and financial history.',
          },
          {
            title: 'IFRS 9 Expected Credit Loss (ECL)',
            description: 'Build Probability of Default (PD), Loss Given Default (LGD), and Exposure at Default (EAD) models to estimate Expected Credit Loss for regulatory reporting and portfolio risk management.',
          },
          {
            title: 'Credit Card Fraud Detection',
            description: 'Detect fraudulent card transactions in real time using anomaly detection, Deep Learning, and behavioral analytics to minimize financial losses.',
          },
          {
            title: 'Anti-Money Laundering (AML) Analytics',
            description: 'Identify suspicious financial transactions, money laundering patterns, and high-risk customers using AI-driven transaction monitoring and network analysis.',
          },
          {
            title: 'Agentic AI Loan Processing System',
            description: 'Develop autonomous AI agents that automate document verification, credit assessment, loan approval workflows, customer communication, and compliance checks.',
          },
        ],
      },
      {
        domain: 'Telecom',
        projects: [
          {
            title: 'Customer Churn Prediction',
            description: 'Predict subscribers likely to switch to competitors using usage behavior, recharge history, complaints, and service quality metrics.',
          },
          {
            title: 'Network Fault Prediction',
            description: 'Predict telecom network failures before they occur using equipment logs, IoT sensor data, and predictive maintenance algorithms.',
          },
          {
            title: 'Telecom Fraud Detection',
            description: 'Detect SIM fraud, subscription fraud, recharge fraud, and abnormal call patterns using Machine Learning and anomaly detection techniques.',
          },
          {
            title: 'Customer Lifetime Value (CLV) Prediction',
            description: 'Estimate the long-term value of each telecom customer to optimize retention strategies and marketing investments.',
          },
          {
            title: 'Agentic AI Telecom Service Desk',
            description: 'Build AI agents to automate complaint registration, technical troubleshooting, ticket routing, service updates, and customer support.',
          },
        ],
      },
      {
        domain: 'E-Commerce',
        projects: [
          {
            title: 'Product Recommendation Engine',
            description: 'Recommend personalized products using collaborative filtering, customer browsing history, purchase behavior, and AI recommendation algorithms.',
          },
          {
            title: 'Customer Churn Prediction',
            description: 'Predict customers who are likely to stop shopping and recommend personalized offers to improve customer retention.',
          },
          {
            title: 'Dynamic Pricing Optimization',
            description: 'Optimize product pricing based on demand, competitor pricing, customer behavior, and inventory levels using AI models.',
          },
          {
            title: 'Demand Forecasting',
            description: 'Forecast future product demand to optimize inventory planning, procurement, and warehouse management.',
          },
          {
            title: 'AI Shopping Assistant (RAG)',
            description: 'Develop a Generative AI assistant using Retrieval-Augmented Generation (RAG) to answer customer queries about products, orders, returns, and promotions.',
          },
        ],
      },
      {
        domain: 'Healthcare',
        projects: [
          {
            title: 'Disease Risk Prediction',
            description: 'Predict the likelihood of diseases such as diabetes, heart disease, cancer, and stroke using patient clinical and lifestyle data.',
          },
          {
            title: 'Medical Image Analysis',
            description: 'Detect diseases from X-rays, CT scans, MRI scans, and pathology images using Deep Learning and Computer Vision techniques.',
          },
          {
            title: 'Patient Readmission Prediction',
            description: 'Identify patients at risk of hospital readmission to improve treatment planning and reduce healthcare costs.',
          },
          {
            title: 'Clinical Decision Support System',
            description: 'Develop AI-powered systems that assist doctors with diagnosis, treatment recommendations, and patient risk assessment.',
          },
          {
            title: 'Agentic AI Clinical Workflow Automation',
            description: 'Build autonomous AI agents to automate appointment scheduling, patient follow-ups, report generation, and hospital workflow management.',
          },
        ],
      },
      {
        domain: 'Manufacturing & Automobile',
        projects: [
          {
            title: 'Predictive Maintenance',
            description: 'Predict equipment failures before breakdown using IoT sensors, machine data, and Machine Learning models to reduce downtime.',
          },
          {
            title: 'Quality Defect Detection',
            description: 'Automate product quality inspection using Computer Vision and Deep Learning to identify manufacturing defects in real time.',
          },
          {
            title: 'Supply Chain Analytics',
            description: 'Optimize procurement, inventory, logistics, and supplier performance using predictive analytics and AI.',
          },
          {
            title: 'Digital Twin Analytics',
            description: 'Create virtual AI-powered replicas of machines and production lines to simulate, monitor, and optimize manufacturing operations.',
          },
          {
            title: 'Connected Vehicle Analytics',
            description: 'Analyze telematics, GPS, and vehicle sensor data to improve safety, predictive maintenance, fleet management, and customer experience.',
          },
        ],
      },
      {
        domain: 'Pharmaceutical Industry',
        projects: [
          {
            title: 'Drug Discovery Analytics',
            description: 'Use AI and Machine Learning to identify potential drug molecules, predict drug interactions, and accelerate the drug discovery process.',
          },
          {
            title: 'Clinical Trial Success Prediction',
            description: 'Predict the probability of successful clinical trial outcomes using historical trial data, patient characteristics, and treatment information.',
          },
          {
            title: 'Pharmacovigilance Analytics',
            description: 'Detect drug safety issues by analyzing adverse event reports, medical literature, and patient feedback using AI and NLP.',
          },
          {
            title: 'Adverse Drug Reaction (ADR) Prediction',
            description: 'Predict patients who are at risk of experiencing adverse drug reactions using clinical history and pharmacological data.',
          },
          {
            title: 'Agentic AI Pharmacovigilance Automation',
            description: 'Develop autonomous AI agents that process adverse event reports, generate regulatory documentation, prioritize safety cases, and automate pharmacovigilance workflows.',
          },
        ],
      },
    ],
    programOutcome: [
      'Develop SQL and Python-based business solutions',
      'Build interactive dashboards using Excel AI, Power BI, and Tableau',
      'Perform advanced statistical analysis',
      'Develop Machine Learning and Deep Learning models',
      'Build NLP, Generative AI, and Agentic AI applications',
      'Design and deploy AI solutions in cloud environments',
      'Implement MLOps, LLMOps, and AIOps frameworks',
      'Solve real-world business problems using Data Science & AI',
      'Create a professional project portfolio',
      'Become industry-ready for Data Science and AI roles',
    ],
    careers: [
      {
        level: 'Entry-Level Roles',
        roles: [
          'Data Analyst',
          'Business Analyst',
          'Reporting Analyst',
          'MIS Analyst',
          'Junior Data Scientist',
          'AI Associate',
          'BI Developer',
          'Power BI Developer',
          'Tableau Developer',
        ],
      },
      {
        level: 'Mid-Level Roles',
        roles: [
          'Data Scientist',
          'Machine Learning Engineer',
          'AI Engineer',
          'Analytics Consultant',
          'Data Engineer',
          'Gen AI Developer',
          'Prompt Engineer',
          'MLOps Engineer',
        ],
      },
      {
        level: 'Senior-Level Roles',
        roles: [
          'Senior Data Scientist',
          'Lead AI Engineer',
          'AI Solution Architect',
          'Principal Data Scientist',
          'Analytics Manager',
          'Head of AI',
          'AI Product Manager',
        ],
      },
    ],
    whoShouldJoin: [
      'Fresh Graduates (B.Sc, B.Com, BBA, BCA, B.Tech, BE)',
      'MBA Graduates',
      'M.Sc / MCA Students',
      'PhD Scholars',
      'IT Professionals',
      'Non-IT Professionals',
      'Banking Professionals',
      'Sales & Marketing Professionals',
      'Finance Professionals',
      'Entrepreneurs',
      'Career Gap Candidates',
    ],
    careerAdvantage: 'APIDS is designed to transform learners into industry-ready Data Science & AI professionals with practical skills, real-world project experience, and deployment expertise required by modern organizations worldwide.',
  },

  APIDA: {
    id: 'apida',
    title: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
    tagline: 'A comprehensive industry-focused program combining Data Management, Business Intelligence, Machine Learning, and MLOps for analytics professionals.',
    overview: 'The Advanced Program in Industrial Data Analytics & AI (APIDA) is a comprehensive industry-focused training program designed to equip students, graduates, and working professionals with the most in-demand skills in Data Analytics, Business Intelligence, Artificial Intelligence, and Predictive Analytics.\n\nThe program combines Data Management, Data Analysis, Data Visualization, Statistical Analytics, Machine Learning, and MLOps to help learners transform raw data into meaningful business insights and intelligent solutions.\n\nThe program emphasizes hands-on learning, enabling participants to become job-ready Data Analytics and AI professionals.',
    duration: '5 Months',
    practicalExposure: [
      'Instructor-Led Training',
      'Real-Time Industry Projects',
      'Case Studies',
      'Assignments & Assessments',
      'Dashboard Development',
      'Predictive Analytics Solutions',
      'End-to-End Project Implementation',
    ],
    theme: 'purple',
    modules: [
      {
        title: 'Module 1: Data Management',
        description: 'Data management forms the foundation of analytics by enabling organizations to collect, store, clean, and manage structured data effectively.',
        sections: [
          {
            title: 'SQL (Structured Query Language)',
            topics: [
              'Database Fundamentals',
              'Relational Database Concepts',
              'SQL Server / MySQL',
              'Data Extraction',
              'Data Manipulation',
              'Joins',
              'Subqueries',
              'Views',
              'Stored Procedures',
              'Functions',
              'Window Functions',
              'Query Optimization',
            ],
            applications: [
              'Customer Analytics',
              'Banking Analytics',
              'Sales Reporting',
              'Business Intelligence Reporting',
              'Data Warehousing',
            ],
          },
          {
            title: 'Python Programming',
            topics: [
              'Python Fundamentals',
              'Data Structures',
              'Functions',
              'File Handling',
              'Object-Oriented Programming',
              'APIs',
              'Data Processing Libraries',
              'Automation Scripts',
            ],
            applications: [
              'Data Cleaning',
              'Data Transformation',
              'Process Automation',
              'Analytical Model Development',
            ],
          },
          {
            title: 'SAS Programming',
            topics: [
              'Base SAS',
              'Data Step Programming',
              'PROC SQL',
              'Data Manipulation',
              'Reporting',
              'Macro Programming',
              'Statistical Procedures',
            ],
            applications: [
              'Banking Analytics',
              'Insurance Analytics',
              'Healthcare Analytics',
              'Credit Risk Analytics',
              'Regulatory Reporting',
            ],
          },
        ],
      },
      {
        title: 'Module 2: Data Analysis & Visualization',
        description: 'This module focuses on converting business data into meaningful insights and executive dashboards for strategic decision-making.',
        sections: [
          {
            title: 'Excel + AI',
            topics: [
              'Advanced Excel',
              'Lookup Functions',
              'Pivot Tables',
              'Power Query',
              'Power Pivot',
              'Dashboard Design',
              'AI-Assisted Analysis',
              'Forecasting',
            ],
            applications: [
              'MIS Reporting',
              'Sales Performance Tracking',
              'Financial Analysis',
              'Business Planning',
            ],
          },
          {
            title: 'Power BI',
            topics: [
              'Data Modeling',
              'Power Query',
              'DAX Functions',
              'Dashboard Development',
              'KPI Design',
              'Drill-Through Analytics',
              'Row Level Security',
            ],
            applications: [
              'Executive Dashboards',
              'Financial Analytics',
              'Customer Analytics',
              'Business Intelligence Solutions',
            ],
          },
          {
            title: 'Tableau',
            topics: [
              'Tableau Desktop',
              'Data Connections',
              'Visual Analytics',
              'Dashboard Development',
              'Storytelling with Data',
              'Calculated Fields',
              'Advanced Visualizations',
            ],
            applications: [
              'Business Reporting',
              'Marketing Analytics',
              'Operations Analytics',
              'Customer Intelligence',
            ],
          },
        ],
      },
      {
        title: 'Module 3: Data Mining & Artificial Intelligence',
        description: 'This module enables participants to build predictive and intelligent business solutions using data science methodologies.',
        sections: [
          {
            title: 'Python Statistics',
            topics: [
              'Descriptive Statistics',
              'Probability',
              'Hypothesis Testing',
              'Correlation Analysis',
              'Regression Analysis',
              'Statistical Inference',
            ],
            applications: [
              'Business Research',
              'Customer Behavior Analysis',
              'Risk Analytics',
              'Market Intelligence',
            ],
          },
          {
            title: 'Machine Learning',
            topics: [
              'Data Preparation',
              'Feature Engineering',
              'Supervised Learning',
              'Unsupervised Learning',
              'Regression Models',
              'Classification Models',
              'Clustering Techniques',
              'Model Evaluation',
            ],
            applications: [
              'Customer Churn Prediction',
              'Credit Risk Assessment',
              'Fraud Detection',
              'Sales Forecasting',
              'Recommendation Systems',
            ],
          },
          {
            title: 'MLOps (Machine Learning Operations)',
            topics: [
              'Model Deployment',
              'Model Monitoring',
              'Version Control',
              'CI/CD Pipelines',
              'Model Governance',
              'Production Automation',
            ],
            applications: [
              'Production AI Systems',
              'Enterprise Machine Learning Deployment',
              'Automated Analytics Solutions',
              'Scalable AI Operations',
            ],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'Banking & Finance Analytics & AI',
        projects: [
          {
            title: 'Credit Risk Analytics & Scorecard Development',
            description: 'Develop application and behavioral scorecards to predict customer default risk using historical lending and credit bureau data.',
          },
          {
            title: 'IFRS 9 Expected Credit Loss (ECL) Analytics',
            description: 'Build Probability of Default (PD), Loss Given Default (LGD), and Exposure at Default (EAD) models for regulatory credit loss estimation.',
          },
          {
            title: 'Fraud Detection & Transaction Monitoring',
            description: 'Identify suspicious banking transactions using machine learning and anomaly detection to reduce financial fraud.',
          },
          {
            title: 'Collections & Recovery Analytics',
            description: 'Analyze delinquency trends, DPD buckets, collection efficiency, and recovery performance to optimize collection strategies.',
          },
          {
            title: 'Gen AI Loan Processing Assistant',
            description: 'Develop an AI-powered assistant to automate document verification, loan eligibility assessment, and customer query handling.',
          },
        ],
      },
      {
        domain: 'Telecom Analytics & AI',
        projects: [
          {
            title: 'Customer Churn Prediction',
            description: 'Predict customers likely to leave using recharge history, usage behavior, complaints, and service quality metrics.',
          },
          {
            title: 'Revenue & ARPU Analytics Dashboard',
            description: 'Analyze Average Revenue Per User (ARPU), subscriber growth, recharge trends, and profitability across regions.',
          },
          {
            title: 'Network Performance Analytics',
            description: 'Monitor network uptime, call drops, internet speed, and service quality using real-time dashboards.',
          },
          {
            title: 'Recharge Recommendation Engine',
            description: 'Recommend personalized recharge plans based on customer usage patterns and spending behavior.',
          },
          {
            title: 'AI Customer Support Chatbot',
            description: 'Build a Gen AI chatbot to resolve telecom customer queries, troubleshoot issues, and automate support workflows.',
          },
        ],
      },
      {
        domain: 'E-Commerce Analytics & AI',
        projects: [
          {
            title: 'Sales & Profitability Dashboard',
            description: 'Analyze sales, revenue, profit, discounts, and product performance across categories and regions.',
          },
          {
            title: 'Customer Lifetime Value (CLV) Prediction',
            description: 'Estimate long-term customer value to support retention strategies and targeted marketing campaigns.',
          },
          {
            title: 'Recommendation Engine',
            description: 'Develop personalized product recommendations using collaborative and content-based filtering techniques.',
          },
          {
            title: 'Demand Forecasting & Inventory Optimization',
            description: 'Forecast product demand to optimize inventory levels and reduce stockouts or excess inventory.',
          },
          {
            title: 'Gen AI Shopping Assistant',
            description: 'Create an AI assistant to provide product recommendations, order tracking, and personalized shopping experiences.',
          },
        ],
      },
      {
        domain: 'Healthcare Analytics & AI',
        projects: [
          {
            title: 'Hospital Performance Dashboard',
            description: 'Analyze patient admissions, bed occupancy, treatment outcomes, and hospital operational KPIs.',
          },
          {
            title: 'Disease Risk Prediction Model',
            description: 'Predict the likelihood of chronic diseases using patient demographics, medical history, and laboratory data.',
          },
          {
            title: 'Healthcare Claims Fraud Detection',
            description: 'Detect fraudulent insurance claims using anomaly detection and predictive analytics.',
          },
          {
            title: 'Clinical Decision Support System',
            description: 'Build AI models to assist doctors with diagnosis recommendations and treatment planning.',
          },
          {
            title: 'Gen AI Medical Assistant',
            description: 'Develop a medical AI assistant to summarize patient records, answer clinical queries, and support healthcare professionals.',
          },
        ],
      },
      {
        domain: 'Manufacturing & Automobile Analytics & AI',
        projects: [
          {
            title: 'Production Performance Dashboard',
            description: 'Monitor production output, machine utilization, downtime, quality metrics, and Overall Equipment Effectiveness (OEE).',
          },
          {
            title: 'Predictive Maintenance Analytics',
            description: 'Predict machine failures using sensor data to minimize downtime and maintenance costs.',
          },
          {
            title: 'Supply Chain & Inventory Analytics',
            description: 'Analyze procurement, supplier performance, logistics, and inventory turnover to improve operational efficiency.',
          },
          {
            title: 'Quality Inspection using Computer Vision',
            description: 'Build AI models to automatically detect manufacturing defects using image processing techniques.',
          },
          {
            title: 'AI Production Planning Assistant',
            description: 'Develop an AI assistant for production scheduling, inventory planning, and manufacturing workflow optimization.',
          },
        ],
      },
      {
        domain: 'Pharmaceutical Analytics & AI',
        projects: [
          {
            title: 'Clinical Trial Analytics Dashboard',
            description: 'Monitor patient enrollment, trial progress, adverse events, and study performance using interactive dashboards.',
          },
          {
            title: 'Pharmacovigilance Analytics',
            description: 'Analyze adverse drug reactions and safety reports to support regulatory compliance and patient safety.',
          },
          {
            title: 'Medicine Sales Forecasting',
            description: 'Predict pharmaceutical sales using historical sales data, seasonality, and market demand trends.',
          },
          {
            title: 'Drug Distribution & Inventory Analytics',
            description: 'Optimize medicine inventory, warehouse operations, and distributor performance across supply chains.',
          },
          {
            title: 'Gen AI Medical Knowledge Assistant',
            description: 'Build an AI assistant to summarize clinical research, answer drug-related questions, and support medical professionals with evidence-based insights.',
          },
        ],
      },
    ],
    programOutcome: [
      'Manage and process enterprise data using SQL, Python, and SAS',
      'Develop advanced business reports and dashboards using Excel AI, Power BI, and Tableau',
      'Perform statistical analysis and business analytics',
      'Build machine learning models for prediction and decision-making',
      'Deploy and manage machine learning solutions using MLOps',
      'Analyze large datasets to identify business opportunities and risks',
      'Create end-to-end analytics solutions for real-world business problems',
      'Build an industry-ready project portfolio',
      'Become job-ready in Data Analytics and AI domains',
    ],
    careers: [
      {
        level: 'Entry-Level Roles',
        roles: [
          'Data Analyst',
          'Business Analyst',
          'MIS Analyst',
          'Reporting Analyst',
          'Power BI Developer',
          'Tableau Developer',
          'Analytics Associate',
        ],
      },
      {
        level: 'Mid-Level Roles',
        roles: [
          'Senior Data Analyst',
          'Analytics Consultant',
          'Machine Learning Analyst',
          'Business Intelligence Developer',
          'Data Science Associate',
          'AI Analyst',
        ],
      },
      {
        level: 'Senior-Level Roles',
        roles: [
          'Analytics Manager',
          'Lead Data Analyst',
          'Business Intelligence Manager',
          'AI Consultant',
          'Analytics Solution Architect',
          'Head of Analytics',
        ],
      },
    ],
    whoShouldJoin: [
      'B.Sc, B.Com, BBA Graduates',
      'BCA, BE, B.Tech Graduates',
      'MBA Students & Professionals',
      'M.Sc & MCA Students',
      'Working Professionals',
      'Banking Professionals',
      'Finance Professionals',
      'Sales & Marketing Professionals',
      'Entrepreneurs',
      'Career Transition Candidates',
    ],
    careerAdvantage: 'The APIDA program bridges the gap between traditional reporting and modern AI-driven analytics by combining Data Management, Business Intelligence, Statistical Analytics, Machine Learning, and MLOps, helping learners become highly employable analytics professionals capable of driving business decisions through data.',
  },

  SPECIALIST: {
    id: 'specialist',
    title: 'Data Analytics Specialist (DAS)',
    tagline: 'Build expertise in Data Analytics, Business Intelligence, Reporting, and Data Visualization with industry-standard tools.',
    overview: 'The Data Analytics Specialist (DAS) program is designed for graduates, working professionals, and career transition candidates who want to build expertise in Data Analytics, Business Intelligence, Reporting, and Data Visualization.\n\nThe program focuses on developing strong analytical and business problem-solving skills through industry-standard tools and technologies. Participants learn how to collect, manage, analyze, visualize, and communicate data-driven insights that support strategic business decisions.\n\nThe DAS program prepares learners for analytics careers across Banking, Finance, Retail, Telecom, Healthcare, Manufacturing, E-Commerce, and Consulting industries.',
    duration: '3-4 Months',
    practicalExposure: [
      'Instructor-Led Training',
      'Hands-on Assignments',
      'Real-Time Case Studies',
      'Dashboard Development',
      'Business Analytics Projects',
      'Industry-Oriented Applications',
    ],
    theme: 'orange',
    modules: [
      {
        title: 'Module 1: Data Management',
        description: 'Data management is the foundation of analytics. This module focuses on collecting, storing, retrieving, and preparing data for business analysis.',
        sections: [
          {
            title: 'SQL (Structured Query Language)',
            topics: [
              'Database Fundamentals',
              'Relational Database Concepts',
              'Data Types',
              'DDL, DML, and DCL Commands',
              'Filtering & Sorting',
              'Aggregations',
              'Joins',
              'Subqueries',
              'Views',
              'Functions',
              'Stored Procedures',
              'Window Functions',
            ],
            applications: [
              'Customer Analytics',
              'Sales Analytics',
              'Banking Analytics',
              'Financial Reporting',
              'Business Intelligence Reporting',
            ],
          },
          {
            title: 'Python Programming',
            topics: [
              'Python Fundamentals',
              'Variables & Data Types',
              'Conditional Statements',
              'Loops',
              'Functions',
              'File Handling',
              'Data Processing',
              'Python Libraries',
              'Data Automation',
            ],
            applications: [
              'Data Cleaning',
              'Data Transformation',
              'Business Analytics',
              'Process Automation',
              'Reporting Automation',
            ],
          },
        ],
      },
      {
        title: 'Module 2: Data Analysis & Visualization',
        description: 'This module focuses on transforming raw business data into meaningful insights and interactive dashboards.',
        sections: [
          {
            title: 'Excel + AI',
            topics: [
              'Advanced Excel',
              'Lookup Functions',
              'Pivot Tables',
              'Power Query',
              'Power Pivot',
              'Dashboard Design',
              'AI-Assisted Analysis',
              'Forecasting Techniques',
            ],
            applications: [
              'MIS Reporting',
              'Sales Performance Analysis',
              'Financial Analysis',
              'HR Analytics',
              'Business Planning',
            ],
          },
          {
            title: 'Power BI',
            topics: [
              'Data Import & Transformation',
              'Data Modeling',
              'DAX Functions',
              'Power Query',
              'Dashboard Development',
              'KPI Design',
              'Drill Through Analytics',
              'Publishing Reports',
            ],
            applications: [
              'Executive Dashboards',
              'Financial Dashboards',
              'Customer Analytics',
              'Business Intelligence Reporting',
            ],
          },
          {
            title: 'Tableau',
            topics: [
              'Tableau Desktop',
              'Data Connections',
              'Data Blending',
              'Calculated Fields',
              'Dashboard Development',
              'Storytelling with Data',
              'Advanced Visualizations',
            ],
            applications: [
              'Interactive Reporting',
              'Marketing Analytics',
              'Operations Analytics',
              'Customer Insights',
            ],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'Banking & Finance',
        projects: [
          {
            title: 'Credit Risk Portfolio Dashboard',
            description: 'Analyze loan portfolio performance, NPAs, delinquency (DPD), approval rates, and customer risk segments using SQL and Power BI dashboards.',
          },
          {
            title: 'Loan Application Analysis',
            description: 'Analyze loan applications, approval/rejection trends, customer demographics, and branch-wise performance to support lending decisions.',
          },
          {
            title: 'Collection & Recovery Analytics',
            description: 'Monitor overdue accounts, recovery efficiency, collection performance, and delinquency trends using interactive dashboards.',
          },
          {
            title: 'Customer Banking Analytics',
            description: 'Analyze customer transactions, deposits, loans, product usage, and customer profitability to improve business growth.',
          },
          {
            title: 'Branch Performance Dashboard',
            description: 'Build executive dashboards showing branch-wise revenue, CASA growth, loans, customer acquisition, and operational KPIs.',
          },
        ],
      },
      {
        domain: 'Telecom',
        projects: [
          {
            title: 'Customer Churn Analysis Dashboard',
            description: 'Analyze customer churn trends, recharge behavior, complaints, and service usage to identify retention opportunities.',
          },
          {
            title: 'Revenue & ARPU Analytics',
            description: 'Analyze Average Revenue Per User (ARPU), subscriber growth, recharge trends, and revenue performance.',
          },
          {
            title: 'Network Performance Dashboard',
            description: 'Monitor network uptime, call drops, data usage, and service quality across telecom regions.',
          },
          {
            title: 'Customer Usage Analytics',
            description: 'Analyze voice, SMS, internet usage, roaming, and recharge behavior for customer insights.',
          },
          {
            title: 'Sales & Dealer Performance Dashboard',
            description: 'Track SIM activations, dealer sales, recharge revenue, and regional performance using Power BI dashboards.',
          },
        ],
      },
      {
        domain: 'E-Commerce',
        projects: [
          {
            title: 'Sales Performance Dashboard',
            description: 'Analyze sales, revenue, profit, orders, and customer growth across products, regions, and time periods.',
          },
          {
            title: 'Customer Purchase Analytics',
            description: 'Analyze customer buying behavior, repeat purchases, customer lifetime value, and retention metrics.',
          },
          {
            title: 'Product Performance Dashboard',
            description: 'Monitor best-selling products, inventory movement, pricing, returns, and profitability.',
          },
          {
            title: 'Marketing Campaign Analytics',
            description: 'Analyze campaign ROI, conversions, customer acquisition cost, and digital marketing performance.',
          },
          {
            title: 'Inventory & Supply Chain Dashboard',
            description: 'Track stock availability, warehouse inventory, supplier performance, and product demand trends.',
          },
        ],
      },
      {
        domain: 'Healthcare',
        projects: [
          {
            title: 'Hospital Performance Dashboard',
            description: 'Monitor admissions, discharges, occupancy, revenue, and operational KPIs across departments.',
          },
          {
            title: 'Patient Analytics Dashboard',
            description: 'Analyze patient demographics, disease trends, treatment outcomes, and hospital utilization.',
          },
          {
            title: 'Healthcare Claims Analysis',
            description: 'Analyze insurance claims, approval rates, claim amounts, fraud indicators, and reimbursement performance.',
          },
          {
            title: 'Appointment & OPD Analytics',
            description: 'Track appointments, no-shows, waiting times, doctor utilization, and patient satisfaction.',
          },
          {
            title: 'Pharmacy Inventory Dashboard',
            description: 'Monitor medicine inventory, expiry tracking, stock movement, and supplier performance.',
          },
        ],
      },
      {
        domain: 'Manufacturing & Automobile',
        projects: [
          {
            title: 'Production Performance Dashboard',
            description: 'Analyze production output, machine utilization, downtime, quality, and Overall Equipment Effectiveness (OEE).',
          },
          {
            title: 'Inventory Management Analytics',
            description: 'Track raw materials, work-in-progress, finished goods inventory, and warehouse performance.',
          },
          {
            title: 'Quality Control Dashboard',
            description: 'Monitor defect rates, rejection percentages, inspection results, and product quality KPIs.',
          },
          {
            title: 'Supply Chain Analytics',
            description: 'Analyze procurement, supplier delivery, logistics efficiency, and inventory turnover.',
          },
          {
            title: 'Vehicle Sales Dashboard',
            description: 'Monitor vehicle sales, dealer performance, revenue, market share, and customer demand across regions.',
          },
        ],
      },
      {
        domain: 'Pharmaceutical Industry',
        projects: [
          {
            title: 'Pharmaceutical Sales Dashboard',
            description: 'Analyze medicine sales, revenue, territory performance, product growth, and prescription trends.',
          },
          {
            title: 'Inventory & Distribution Analytics',
            description: 'Monitor medicine inventory, warehouse stock, distributor performance, and supply chain efficiency.',
          },
          {
            title: 'Clinical Trial Dashboard',
            description: 'Analyze patient enrollment, trial progress, adverse events, and clinical study performance.',
          },
          {
            title: 'Medical Representative Performance Dashboard',
            description: 'Track doctor visits, prescription generation, territory coverage, and sales KPIs.',
          },
          {
            title: 'Drug Safety & Pharmacovigilance Dashboard',
            description: 'Monitor adverse drug reactions, safety reports, compliance metrics, and regulatory reporting performance.',
          },
        ],
      },
    ],
    programOutcome: [
      'Extract and manage business data using SQL and Python',
      'Perform data cleaning and transformation activities',
      'Analyze business performance using analytical techniques',
      'Build interactive dashboards using Excel AI, Power BI, and Tableau',
      'Create executive reports and KPI scorecards',
      'Generate business insights for strategic decision-making',
      'Develop end-to-end analytics solutions',
      'Build an industry-ready analytics portfolio',
      'Become job-ready for Data Analytics and Business Intelligence roles',
    ],
    careers: [
      {
        level: 'Entry-Level Roles',
        roles: [
          'Data Analyst',
          'MIS Analyst',
          'Reporting Analyst',
          'Business Analyst',
          'Power BI Developer',
          'Tableau Developer',
          'Analytics Associate',
        ],
      },
      {
        level: 'Mid-Level Roles',
        roles: [
          'Senior Data Analyst',
          'Business Intelligence Analyst',
          'Analytics Consultant',
          'Reporting Lead',
          'Dashboard Developer',
        ],
      },
      {
        level: 'Senior-Level Roles',
        roles: [
          'Analytics Manager',
          'Business Intelligence Manager',
          'Data Analytics Consultant',
          'Analytics Lead',
        ],
      },
    ],
    whoShouldJoin: [
      'B.Sc, B.Com, BBA Graduates',
      'BCA, BE, B.Tech Graduates',
      'MBA Students & Professionals',
      'M.Sc & MCA Students',
      'Working Professionals',
      'Banking & Finance Professionals',
      'Sales & Marketing Professionals',
      'Operations Professionals',
      'Entrepreneurs',
      'Career Transition Candidates',
    ],
    careerAdvantage: 'The Data Analytics Specialist (DAS) program provides a strong foundation in Data Management, Data Analysis, Reporting, and Business Intelligence, enabling learners to convert business data into actionable insights. The program is ideal for those seeking fast-track careers in Data Analytics, Reporting, MIS, Business Intelligence, and Dashboard Development across multiple industries.',
  },

  AIML: {
    id: 'aiml',
    title: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)',
    tagline: 'Master the complete AI lifecycle from data preparation and ML model development to Generative AI, Agentic AI, and enterprise-grade deployment.',
    overview: 'The Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA) program is designed to prepare students, graduates, researchers, and working professionals for careers in Artificial Intelligence, Machine Learning, Generative AI, and Autonomous AI Systems.\n\nThe program covers the complete AI lifecycle, from data preparation and machine learning model development to advanced Generative AI applications, Agentic AI systems, and enterprise-grade deployment using MLOps and LLMOps.\n\nThe program focuses on practical implementation, enabling learners to build intelligent AI systems capable of solving real-world business challenges.',
    duration: '4 Months',
    practicalExposure: [
      'Instructor-Led Training',
      'Real-Time Industry Projects',
      'AI Model Development',
      'Gen AI Solution Building',
      'Agentic AI Applications',
      'Capstone Projects',
      'Cloud-Based AI Deployment',
    ],
    theme: 'indigo',
    modules: [
      {
        title: 'Module 1: Data Management',
        description: 'Strong data management skills are essential for building successful AI and Machine Learning solutions.',
        sections: [
          {
            title: 'SQL (Structured Query Language)',
            topics: [
              'Database Fundamentals',
              'Relational Database Concepts',
              'Data Extraction',
              'Data Manipulation',
              'Joins',
              'Subqueries',
              'Views',
              'Functions',
              'Stored Procedures',
              'Window Functions',
            ],
            applications: [
              'AI Data Preparation',
              'Customer Analytics',
              'Banking Analytics',
              'Enterprise Data Management',
              'Feature Engineering',
            ],
          },
          {
            title: 'Python Programming',
            topics: [
              'Python Fundamentals',
              'Data Structures',
              'Functions',
              'Object-Oriented Programming',
              'File Handling',
              'APIs',
              'Automation',
              'Python Libraries',
            ],
            applications: [
              'AI Development',
              'Data Engineering',
              'Automation',
              'Machine Learning Workflows',
            ],
          },
        ],
      },
      {
        title: 'Module 2: Data Mining & Artificial Intelligence',
        description: 'This module focuses on advanced AI and Machine Learning techniques used by modern organizations.',
        sections: [
          {
            title: 'Python Statistics',
            topics: [
              'Descriptive Statistics',
              'Probability Theory',
              'Hypothesis Testing',
              'Correlation Analysis',
              'Regression Analysis',
              'Statistical Inference',
            ],
            applications: [
              'Predictive Analytics',
              'Customer Intelligence',
              'Business Research',
              'Risk Analytics',
            ],
          },
          {
            title: 'Machine Learning',
            topics: [
              'Data Preparation',
              'Feature Engineering',
              'Supervised Learning',
              'Unsupervised Learning',
              'Classification Models',
              'Regression Models',
              'Clustering',
              'Ensemble Techniques',
              'Model Evaluation',
            ],
            applications: [
              'Fraud Detection',
              'Customer Churn Prediction',
              'Credit Risk Analytics',
              'Sales Forecasting',
              'Recommendation Engines',
            ],
          },
          {
            title: 'Deep Learning',
            topics: [
              'Neural Networks',
              'TensorFlow',
              'Keras',
              'Convolutional Neural Networks (CNN)',
              'Recurrent Neural Networks (RNN)',
              'LSTM Networks',
              'Transfer Learning',
            ],
            applications: [
              'Computer Vision',
              'Image Analytics',
              'Speech Recognition',
              'Predictive Intelligence',
            ],
          },
          {
            title: 'Natural Language Processing (NLP)',
            topics: [
              'Text Mining',
              'Text Preprocessing',
              'Sentiment Analysis',
              'Text Classification',
              'Named Entity Recognition',
              'Topic Modeling',
              'Language Understanding',
            ],
            applications: [
              'Customer Feedback Analysis',
              'Chatbots',
              'Document Processing',
              'Social Media Analytics',
            ],
          },
          {
            title: 'Generative AI',
            topics: [
              'Large Language Models (LLMs)',
              'Prompt Engineering',
              'Advanced Prompt Design',
              'Retrieval-Augmented Generation (RAG)',
              'Vector Databases',
              'Fine-Tuning Concepts',
              'AI Assistants',
              'Enterprise Gen AI Architecture',
            ],
            applications: [
              'Enterprise Chatbots',
              'AI Knowledge Assistants',
              'Content Generation',
              'Automated Reporting',
              'Customer Service Automation',
            ],
          },
          {
            title: 'Agentic AI',
            topics: [
              'AI Agents Fundamentals',
              'Multi-Agent Systems',
              'Autonomous AI Workflows',
              'Tool Calling',
              'Agent Orchestration',
              'Memory Management',
              'AI Reasoning Systems',
              'Enterprise Agent Frameworks',
            ],
            applications: [
              'AI Business Automation',
              'Autonomous Customer Support',
              'Research Agents',
              'AI Operations Assistants',
              'Enterprise Workflow Automation',
            ],
          },
        ],
      },
      {
        title: 'Module 3: AI Deployment & Operations',
        description: 'This module enables learners to deploy, monitor, and manage AI systems in production environments.',
        sections: [
          {
            title: 'MLOps (Machine Learning Operations)',
            topics: [
              'Model Deployment',
              'CI/CD Pipelines',
              'Version Control',
              'Model Monitoring',
              'Model Governance',
              'Production Automation',
            ],
            applications: [
              'Enterprise Machine Learning Deployment',
              'Automated AI Pipelines',
              'Production AI Systems',
            ],
          },
          {
            title: 'LLMOps (Large Language Model Operations)',
            topics: [
              'LLM Deployment',
              'Prompt Monitoring',
              'RAG Deployment',
              'Vector Database Management',
              'LLM Evaluation',
              'LLM Governance',
            ],
            applications: [
              'Enterprise Gen AI Deployment',
              'AI Knowledge Platforms',
              'Production LLM Solutions',
            ],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'Tier 1 Capstone - Exploratory Data Analysis Dashboard',
        projects: [
          {
            title: 'Project Name: Retail Sales EDA & Insights Dashboard',
            description: 'Students perform a complete end-to-end EDA on a retail sales dataset using Python, SQL, and basic statistics. The project integrates all Tier 1 skills into one deliverable - a working interactive dashboard.',
          },
          {
            title: 'Industry: Retail / E-commerce',
            description: 'Retail and e-commerce business scenario focused on sales data exploration, reporting, and interactive insight generation.',
          },
          {
            title: 'Process',
            description: '1. Load and clean raw sales data using Pandas (handle nulls, duplicates, type mismatches) 2. Query and aggregate data using SQL (window functions, CTEs, group-by analysis) 3. Perform descriptive statistics - central tendency, dispersion, outlier detection 4. Apply probability concepts - distribution analysis on sales and revenue columns 5. Build visualisations - trend lines, category breakdowns, heatmaps using Matplotlib and Seaborn 6. Deploy as a Streamlit dashboard',
          },
          {
            title: 'Outcome',
            description: 'Interactive sales dashboard with filters by region, category, and date. Statistical summary report with outlier flags. SQL query library for repeat business reporting. Students demonstrate readiness to move into Machine Learning.',
          },
        ],
      },
      {
        domain: 'Tier 2 Capstone - Machine Learning',
        projects: [
          {
            title: 'ML Capstone - Customer Churn Prediction (Classification)',
            description: 'Build a complete classification pipeline to predict which customers are likely to churn. This project covers the full ML workflow from statistical analysis to model deployment.',
          },
          {
            title: 'Industry: Telecom, Banking, OTT, SaaS',
            description: 'Customer-retention use case spanning subscription and service businesses where churn prediction directly supports business action.',
          },
          {
            title: 'Process',
            description: '1. Statistical analysis - t-test, chi-square, and correlation on customer features 2. EDA and data preprocessing - handle imbalanced churn labels 3. Feature engineering - RFM-style features, usage patterns 4. Model building - Logistic Regression, Random Forest, XGBoost 5. Handle class imbalance with SMOTE 6. Evaluate with ROC-AUC, F1, Precision-Recall curves 7. SHAP explainability - identify top churn drivers 8. Deploy as REST API using FastAPI',
          },
          {
            title: 'Outcome',
            description: 'Churn probability score per customer. Top 5 churn driver features via SHAP. REST API endpoint for CRM integration. Business report with retention recommendations.',
          },
        ],
      },
      {
        domain: 'Tier 2 Capstone Project 1 - Sentiment Analysis API',
        projects: [
          {
            title: 'Capstone Project 1 - Sentiment Analysis API (Deep Learning NLP)',
            description: 'Fine-tune a BERT model on product review data to classify sentiment. Students learn the full deep learning workflow from data prep to production API.',
          },
          {
            title: 'Industry: E-commerce, Product Reviews, Social Media',
            description: 'Text analytics and NLP use case focused on real-time sentiment classification for customer and product feedback.',
          },
          {
            title: 'Process',
            description: '1. Data collection and text preprocessing - tokenisation, cleaning 2. Fine-tune BERT on labelled review dataset using Hugging Face 3. Evaluate - accuracy, F1, confusion matrix 4. Build FastAPI REST endpoint for real-time inference 5. Dockerise the model service',
          },
          {
            title: 'Outcome',
            description: 'Production sentiment classification API. Real-time inference endpoint accepting raw text. Docker-ready model container. Students demonstrate readiness for Advanced tier.',
          },
        ],
      },
      {
        domain: 'Tier 2 Capstone Project 2 - Image Classification for Defect Detection',
        projects: [
          {
            title: 'Capstone Project 2 - Image Classification for Defect Detection (Computer Vision)',
            description: 'Build a transfer learning-based image classifier to detect product defects on a manufacturing line. Uses ResNet/EfficientNet with custom dataset.',
          },
          {
            title: 'Industry: Manufacturing, Quality Control',
            description: 'Computer-vision use case aimed at automated quality inspection and production defect detection.',
          },
          {
            title: 'Process',
            description: '1. Build and label custom defect image dataset 2. Apply data augmentation - flips, rotations, brightness 3. Fine-tune EfficientNet using transfer learning 4. Evaluate model performance - accuracy, precision per defect class 5. Build Streamlit app for quality inspection team 6. Dockerise and prepare for deployment',
          },
          {
            title: 'Outcome',
            description: 'Defect detection model with greater than 90% accuracy target. Streamlit app for factory floor teams. Docker container ready for edge deployment.',
          },
        ],
      },
    ],
    programOutcome: [
      'Manage and prepare enterprise data using SQL and Python',
      'Perform advanced statistical analysis',
      'Build Machine Learning and Deep Learning models',
      'Develop NLP and Text Analytics solutions',
      'Design and implement Generative AI applications',
      'Build Agentic AI systems and autonomous workflows',
      'Deploy AI and LLM solutions using MLOps and LLMOps',
      'Create enterprise-ready AI applications',
      'Build a strong AI project portfolio',
      'Become industry-ready for AI, ML, Gen AI, and Agentic AI roles',
    ],
    careers: [
      {
        level: 'Entry-Level Roles',
        roles: [
          'AI/ML Engineer',
          'Junior Data Scientist',
          'AI Developer',
          'Machine Learning Associate',
          'NLP Engineer',
          'Gen AI Associate',
        ],
      },
      {
        level: 'Mid-Level Roles',
        roles: [
          'Machine Learning Engineer',
          'Data Scientist',
          'AI Engineer',
          'NLP Engineer',
          'Generative AI Engineer',
          'MLOps Engineer',
          'LLMOps Engineer',
        ],
      },
      {
        level: 'Senior-Level Roles',
        roles: [
          'Senior Data Scientist',
          'Lead AI Engineer',
          'AI Solution Architect',
          'Principal Machine Learning Engineer',
          'Head of AI',
          'Generative AI Architect',
          'Agentic AI Architect',
        ],
      },
    ],
    whoShouldJoin: [
      'B.Sc, B.Com, BBA Graduates',
      'BCA, BE, B.Tech Graduates',
      'M.Sc & MCA Students',
      'MBA Professionals',
      'Software Engineers',
      'Data Analysts',
      'Data Scientists',
      'AI Enthusiasts',
      'Researchers & PhD Scholars',
      'Working Professionals seeking AI careers',
    ],
    careerAdvantage: 'The Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA) program equips learners with cutting-edge AI skills spanning Machine Learning, Deep Learning, NLP, Generative AI, Agentic AI, MLOps, and LLMOps. The program prepares participants to build, deploy, and manage intelligent AI solutions that drive digital transformation across industries worldwide.',
  },

  GENAI: {
    id: 'genai',
    title: 'Master Program in Generative AI & Agentic AI (MPGAA)',
    tagline: 'Specialize in Deep Learning, NLP, Generative AI, Agentic AI, and enterprise AI deployment for next-generation intelligent systems.',
    overview: 'The Master Program in Generative AI & Agentic AI (MPGAA) is an advanced industry-focused program designed for students, professionals, entrepreneurs, researchers, and technology enthusiasts who want to specialize in the rapidly evolving field of Artificial Intelligence.\n\nThe program focuses on building expertise in Deep Learning, Natural Language Processing (NLP), Generative AI, Agentic AI, MLOps, and LLMOps, enabling learners to design, develop, deploy, and manage intelligent AI systems capable of autonomous decision-making and business automation.\n\nThe curriculum is designed to provide practical knowledge required to build next-generation AI applications used across industries.',
    duration: '2-3 Months',
    practicalExposure: [
      'Instructor-Led Training',
      'Real-Time AI Projects',
      'Enterprise Use Cases',
      'AI Solution Development',
      'Gen AI Applications',
      'Agentic AI Systems',
      'Deployment & Monitoring Practices',
      'Capstone Projects',
    ],
    theme: 'magenta',
    modules: [
      {
        title: 'Module 1: Python Foundations for AI',
        description: 'Python serves as the foundation for Artificial Intelligence and Machine Learning development.',
        sections: [
          {
            title: 'Python Basics',
            topics: [
              'Introduction to Python',
              'Variables & Data Types',
              'Operators',
              'Conditional Statements',
              'Loops',
              'Functions',
              'Data Structures',
              'File Handling',
              'Object-Oriented Programming Basics',
              'APIs & Automation',
            ],
            applications: [
              'Data Processing',
              'AI Development',
              'Workflow Automation',
              'AI Application Development',
              'Model Integration',
            ],
          },
        ],
      },
      {
        title: 'Module 2: Deep Learning & Artificial Intelligence',
        description: 'This module focuses on advanced AI techniques used in modern intelligent systems.',
        sections: [
          {
            title: 'Deep Learning',
            topics: [
              'Artificial Neural Networks',
              'Deep Neural Networks',
              'TensorFlow',
              'Keras',
              'Convolutional Neural Networks (CNN)',
              'Recurrent Neural Networks (RNN)',
              'LSTM Networks',
              'Transfer Learning',
              'Model Optimization',
            ],
            applications: [
              'Computer Vision',
              'Image Recognition',
              'Video Analytics',
              'Predictive Intelligence',
              'Speech Processing',
            ],
          },
          {
            title: 'Natural Language Processing (NLP)',
            topics: [
              'Text Processing',
              'Tokenization',
              'Text Classification',
              'Sentiment Analysis',
              'Named Entity Recognition',
              'Topic Modeling',
              'Language Understanding',
              'Transformer Models',
            ],
            applications: [
              'Chatbots',
              'Customer Feedback Analysis',
              'Document Intelligence',
              'Social Media Analytics',
              'Language Understanding Systems',
            ],
          },
        ],
      },
      {
        title: 'Module 3: Generative AI',
        description: 'This module focuses on Large Language Models and enterprise-grade Generative AI applications.',
        sections: [
          {
            title: 'Generative AI',
            topics: [
              'Introduction to Large Language Models (LLMs)',
              'Prompt Engineering',
              'Advanced Prompt Design',
              'Context Engineering',
              'Retrieval-Augmented Generation (RAG)',
              'Vector Databases',
              'Embeddings',
              'Fine-Tuning Concepts',
              'Enterprise AI Architecture',
              'AI Knowledge Assistants',
            ],
            applications: [
              'AI Chatbots',
              'Enterprise Search',
              'Content Generation',
              'Automated Reporting',
              'Customer Service Automation',
              'Knowledge Management Systems',
            ],
          },
        ],
      },
      {
        title: 'Module 4: Agentic AI',
        description: 'Agentic AI focuses on autonomous AI systems capable of planning, reasoning, and executing tasks.',
        sections: [
          {
            title: 'Agentic AI',
            topics: [
              'AI Agent Fundamentals',
              'Autonomous AI Systems',
              'Multi-Agent Systems',
              'Tool Calling',
              'Agent Memory',
              'Agent Planning',
              'AI Reasoning',
              'Agent Orchestration',
              'Workflow Automation',
              'Enterprise Agent Frameworks',
            ],
            applications: [
              'Autonomous Customer Support',
              'AI Research Assistants',
              'AI Business Automation',
              'Intelligent Process Automation',
              'Enterprise Workflow Agents',
              'Digital Workforce Solutions',
            ],
          },
        ],
      },
      {
        title: 'Module 5: AI Deployment & Operations',
        description: 'Learn how to deploy, manage, monitor, and scale AI applications in production environments.',
        sections: [
          {
            title: 'MLOps (Machine Learning Operations)',
            topics: [
              'Model Deployment',
              'Version Control',
              'CI/CD Pipelines',
              'Model Monitoring',
              'Model Governance',
              'Production Automation',
            ],
            applications: [
              'Production AI Systems',
              'Automated AI Pipelines',
              'Enterprise AI Deployment',
            ],
          },
          {
            title: 'LLMOps (Large Language Model Operations)',
            topics: [
              'LLM Deployment',
              'Prompt Monitoring',
              'RAG Deployment',
              'Vector Database Management',
              'LLM Evaluation',
              'LLM Governance',
              'Cost Optimization',
              'Security & Compliance',
            ],
            applications: [
              'Enterprise Gen AI Deployment',
              'AI Knowledge Platforms',
              'Large-Scale AI Solutions',
              'Production LLM Systems',
            ],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'Industry Project 1 — Multi-Agent Research and Report Generator',
        projects: [
          {
            title: 'Industry: Market Research, Consulting, Investment Banking, EdTech',
            description: 'User gives a research topic. Multiple specialised agents work together — one searches the web, one analyses sources, one writes the report, one reviews and edits. Final output is a structured research report generated in minutes.',
          },
          {
            title: 'Process',
            description: '1. Build multi-agent system using CrewAI or LangGraph 2. Researcher agent — web search tool, source summarisation 3. Writer agent — structured long-form report generation 4. Reviewer agent — quality check, citation verification, hallucination detection 5. Build Streamlit interface for topic input and report download 6. FastAPI backend 7. Docker + ECR + EKS deployment 8. LangSmith full pipeline tracing and observability',
          },
          {
            title: 'Outcome',
            description: 'Automated research report generation in under 5 minutes. Streamlit interface for non-technical users. Full agent trace visibility via LangSmith. Production-deployed and scalable on AWS EKS.',
          },
        ],
      },
      {
        domain: 'Industry Project 2 — Intelligent Customer Support Agent with Memory',
        projects: [
          {
            title: 'Industry: E-commerce, Banking, Telecom, Healthcare',
            description: 'A customer support agent that handles queries, accesses customer history, resolves common issues automatically, and escalates complex cases to human agents — with full memory maintained across sessions.',
          },
          {
            title: 'Process',
            description: '1. Build LangChain or LangGraph agent with tool use — CRM lookup, order status, knowledge base search 2. CRM integration — reads customer history and account details 3. Implement short-term (session) and long-term (cross-session) memory using SQLite 4. Handle FAQs automatically; escalate complex issues with full context summary 5. Streaming responses via WebSocket for real-time chat feel 6. FastAPI REST endpoint + Streamlit or web chat interface 7. Docker + ECR + EKS deployment 8. Helicone cost tracking and CloudWatch monitoring',
          },
          {
            title: 'Outcome',
            description: 'Customer support agent resolving more than 70% of queries autonomously. Memory system maintaining context across sessions. Human escalation with full conversation summary. Cost tracking dashboard via Helicone.',
          },
        ],
      },
      {
        domain: 'Industry Project 3 — SQL Analytics Agent',
        projects: [
          {
            title: 'Industry: Sales Teams, Marketing, Finance, Any Company with a Database',
            description: 'Business users ask questions in plain English. The agent translates to SQL, queries the database, generates insights, creates visualisations, and presents the answer in a readable format — no SQL knowledge required.',
          },
          {
            title: 'Process',
            description: '1. Build LangChain SQL agent connected to a PostgreSQL or SQLite database 2. Natural language to SQL translation with schema awareness 3. Query validation and guardrails — prevent destructive queries (DELETE, DROP) 4. Generate reports and visualisations using Matplotlib and Plotly 5. FastAPI endpoint for business teams and dashboards 6. Build Streamlit business dashboard 7. Docker + ECR + EKS deployment 8. LangSmith monitoring',
          },
          {
            title: 'Outcome',
            description: 'Business teams querying databases in plain English. Automated report and chart generation. Guardrails preventing data corruption. Significant reduction in dependency on data analysts for routine queries.',
          },
        ],
      },
      {
        domain: 'Industry Project 4 — GenAI Content Pipeline with Agents',
        projects: [
          {
            title: 'Industry: Marketing Agencies, EdTech, News Organisations, Product Companies',
            description: 'An agentic pipeline that generates, reviews, and publishes content automatically. Given a topic — the system researches it, writes a blog post, creates social media variations, checks for brand tone, and schedules for publishing.',
          },
          {
            title: 'Process',
            description: '1. Build LangGraph workflow agent with specialised sub-agents 2. Research agent — web search, source gathering and summarisation 3. Writing agent — long-form blog post generation 4. Social agent — short-form variations for Twitter, LinkedIn, Instagram 5. Review agent — brand voice check, hallucination detection, tone alignment 6. Integration with CMS or email platform via API 7. FastAPI + Docker + ECR + EKS deployment 8. LangSmith full pipeline tracing',
          },
          {
            title: 'Outcome',
            description: 'End-to-end content generation pipeline from topic to publish-ready post. Multi-platform content variations in one run. Brand voice consistency enforced by review agent. Full observability of every agent step via LangSmith.',
          },
        ],
      },
      {
        domain: 'Industry Project 5 — Document Intelligence System (Advanced RAG + Agents)',
        projects: [
          {
            title: 'Industry: Law Firms, Finance, Healthcare, HR',
            description: 'An advanced version of the Tier 2 RAG capstone — now with agentic capabilities. The system not only answers questions but autonomously navigates multi-document knowledge bases, cross-references sources, flags contradictions, and generates executive summaries.',
          },
          {
            title: 'Process',
            description: '1. Upload and process multiple PDFs — financial reports, legal contracts, medical records 2. Advanced chunking with metadata — document type, date, section tags 3. Hybrid search — semantic + keyword with re-ranking 4. Agentic layer — agent decides which documents to retrieve, in what order, and when to ask clarifying questions 5. Cross-reference and contradiction detection across documents 6. Generate executive summary with source citations 7. FastAPI REST endpoint + Streamlit UI 8. Docker + ECR + EKS deployment with LangSmith monitoring',
          },
          {
            title: 'Outcome',
            description: 'Intelligent document Q&A with multi-document reasoning. Contradiction and inconsistency detection across sources. Executive summary generation with full citation trail. Production-deployed on AWS with full observability.',
          },
        ],
      },
    ],
    programOutcome: [
      'Develop AI applications using Python',
      'Build Deep Learning and NLP solutions',
      'Design and implement Generative AI applications',
      'Create enterprise-grade RAG solutions',
      'Develop AI Chatbots and AI Assistants',
      'Build Agentic AI systems and autonomous workflows',
      'Deploy AI applications using MLOps and LLMOps',
      'Monitor and manage production AI systems',
      'Create an advanced AI project portfolio',
      'Become industry-ready for Generative AI and Agentic AI careers',
    ],
    careers: [
      {
        level: 'Entry-Level Roles',
        roles: [
          'Generative AI Associate',
          'AI Developer',
          'Prompt Engineer',
          'AI Support Engineer',
          'Junior NLP Engineer',
          'AI Application Developer',
        ],
      },
      {
        level: 'Mid-Level Roles',
        roles: [
          'Generative AI Engineer',
          'NLP Engineer',
          'AI Engineer',
          'Agentic AI Developer',
          'LLM Engineer',
          'MLOps Engineer',
          'LLMOps Engineer',
        ],
      },
      {
        level: 'Senior-Level Roles',
        roles: [
          'Lead Generative AI Engineer',
          'AI Solution Architect',
          'Agentic AI Architect',
          'Principal AI Engineer',
          'Head of AI Innovation',
          'Enterprise AI Consultant',
        ],
      },
    ],
    whoShouldJoin: [
      'Graduates from Any Discipline',
      'BCA, B.Sc, B.Tech, BE Students',
      'MCA & M.Sc Students',
      'MBA Professionals',
      'Software Developers',
      'Data Analysts',
      'Data Scientists',
      'Working Professionals',
      'Entrepreneurs',
      'Researchers & PhD Scholars',
    ],
    careerAdvantage: 'The Master Program in Generative AI & Agentic AI (MPGAA) provides specialized expertise in Deep Learning, NLP, Generative AI, Agentic AI, MLOps, and LLMOps, enabling learners to build intelligent AI systems, enterprise AI assistants, autonomous agents, and next-generation business automation solutions. This program prepares professionals for some of the most in-demand and highest-paying AI careers globally.',
  },

  APCS: {
    id: 'apcs',
    title: 'Advanced Program in Cybersecurity & Forensics (APCF)',
    tagline: 'Comprehensive training in Cybersecurity, Ethical Hacking, Digital Forensics, Threat Intelligence, and Security Operations.',
    overview: 'The Advanced Program in Cybersecurity & Forensics (APCF) is a comprehensive industry-oriented training program designed to prepare students, graduates, IT professionals, and cybersecurity enthusiasts for successful careers in Cybersecurity, Ethical Hacking, Digital Forensics, Threat Intelligence, and Security Operations.\n\nThe program provides hands-on exposure to real-world cyber threats, attack simulations, vulnerability assessments, incident response, and digital forensic investigations. Learners gain practical experience in securing enterprise systems, identifying cyber threats, investigating security incidents, and protecting digital assets.\n\nThe program combines theoretical concepts with practical labs, cyber range exercises, case studies, and industry projects to build job-ready cybersecurity professionals.',
    duration: '4 Months',
    practicalExposure: [
      'Instructor-Led Training',
      'Practical Labs & Cyber Range Exercises',
      'Real-World Case Studies',
      'Attack Simulations',
      'Vulnerability Assessments',
      'Incident Response Exercises',
      'Digital Forensic Investigations',
      'Industry Projects',
    ],
    theme: 'teal',
    modules: [
      {
        title: 'Module 1: Networking & Security Fundamentals',
        description: 'A strong understanding of networking is essential for cybersecurity professionals.',
        sections: [
          {
            title: 'Networking & Security Fundamentals',
            topics: [
              'Computer Network Fundamentals',
              'OSI & TCP/IP Models',
              'IP Addressing & Subnetting',
              'Routing & Switching Concepts',
              'DNS, DHCP, FTP, HTTP, HTTPS',
              'Network Devices & Security',
              'Firewalls & Proxy Servers',
              'VPN Technologies',
              'Wireless Network Security',
            ],
            applications: [
              'Network Security Monitoring',
              'Infrastructure Protection',
              'Secure Communication Design',
              'Enterprise Network Security',
            ],
          },
        ],
      },
      {
        title: 'Module 2: Linux & Windows Security',
        sections: [
          {
            title: 'Linux Security',
            topics: [
              'Linux Administration',
              'User Management',
              'File Permissions',
              'Shell Scripting',
              'Service Hardening',
              'Security Configuration',
            ],
          },
          {
            title: 'Windows Security',
            topics: [
              'Windows Administration',
              'Active Directory',
              'Group Policy Management',
              'Security Configuration',
              'Event Monitoring',
              'Access Management',
            ],
            applications: [
              'Server Hardening',
              'Access Control',
              'Security Monitoring',
              'Enterprise Administration',
            ],
          },
        ],
      },
      {
        title: 'Module 3: Cybersecurity Fundamentals',
        sections: [
          {
            title: 'Cybersecurity Fundamentals',
            topics: [
              'Information Security Concepts',
              'CIA Triad',
              'Risk Management',
              'Security Policies',
              'Security Governance',
              'Identity & Access Management',
              'Authentication & Authorization',
              'Cybersecurity Frameworks',
            ],
            applications: [
              'Security Program Development',
              'Compliance Management',
              'Organizational Security Controls',
            ],
          },
        ],
      },
      {
        title: 'Module 4: Ethical Hacking & Penetration Testing',
        sections: [
          {
            title: 'Ethical Hacking & Penetration Testing',
            topics: [
              'Ethical Hacking Methodology',
              'Footprinting & Reconnaissance',
              'Scanning & Enumeration',
              'Vulnerability Assessment',
              'Exploitation Techniques',
              'Password Attacks',
              'Wireless Security Testing',
              'Web Application Testing',
              'Social Engineering Awareness',
            ],
            applications: [
              'Security Assessments',
              'Penetration Testing',
              'Vulnerability Identification',
              'Security Improvement Planning',
            ],
          },
        ],
      },
      {
        title: 'Module 5: Web Application Security',
        sections: [
          {
            title: 'Web Application Security',
            topics: [
              'OWASP Top 10',
              'SQL Injection',
              'Cross-Site Scripting (XSS)',
              'CSRF',
              'Authentication Vulnerabilities',
              'API Security',
              'Secure Coding Practices',
              'Security Testing Tools',
            ],
            applications: [
              'Secure Application Development',
              'Vulnerability Testing',
              'Web Security Audits',
            ],
          },
        ],
      },
      {
        title: 'Module 6: Security Operations Center (SOC)',
        sections: [
          {
            title: 'Security Operations Center (SOC)',
            topics: [
              'Security Monitoring',
              'Log Analysis',
              'Threat Detection',
              'Security Information & Event Management (SIEM)',
              'Incident Handling',
              'Threat Hunting',
              'Alert Management',
              'Security Reporting',
            ],
            applications: [
              'SOC Operations',
              'Security Monitoring',
              'Incident Detection',
              'Threat Intelligence',
            ],
          },
        ],
      },
      {
        title: 'Module 7: Cloud Security',
        sections: [
          {
            title: 'AWS Security',
            topics: [
              'IAM',
              'Security Groups',
              'Cloud Monitoring',
              'Security Best Practices',
            ],
          },
          {
            title: 'Azure Security',
            topics: [
              'Identity Management',
              'Security Center',
              'Cloud Governance',
            ],
          },
          {
            title: 'GCP Security',
            topics: [
              'Cloud Security Controls',
              'Access Management',
              'Monitoring',
            ],
            applications: [
              'Cloud Security Architecture',
              'Secure Cloud Deployments',
              'Compliance Management',
            ],
          },
        ],
      },
      {
        title: 'Module 8: Digital Forensics',
        sections: [
          {
            title: 'Digital Forensics',
            topics: [
              'Digital Forensics Fundamentals',
              'Evidence Collection',
              'Chain of Custody',
              'Disk Forensics',
              'Memory Forensics',
              'Mobile Device Forensics',
              'Email Forensics',
              'Network Forensics',
              'Malware Analysis Basics',
            ],
            applications: [
              'Cybercrime Investigation',
              'Incident Investigation',
              'Legal Evidence Collection',
              'Fraud Investigation',
            ],
          },
        ],
      },
      {
        title: 'Module 9: Incident Response & Threat Intelligence',
        sections: [
          {
            title: 'Incident Response & Threat Intelligence',
            topics: [
              'Incident Response Lifecycle',
              'Threat Intelligence',
              'Threat Hunting',
              'Malware Investigation',
              'Security Breach Analysis',
              'Risk Mitigation',
              'Recovery Planning',
            ],
            applications: [
              'Security Incident Management',
              'Threat Investigation',
              'Business Continuity Planning',
            ],
          },
        ],
      },
      {
        title: 'Module 10: Cybersecurity Governance, Risk & Compliance (GRC)',
        sections: [
          {
            title: 'Governance, Risk & Compliance (GRC)',
            topics: [
              'ISO 27001',
              'NIST Framework',
              'GDPR Overview',
              'Security Auditing',
              'Risk Assessment',
              'Compliance Management',
            ],
            applications: [
              'Compliance Programs',
              'Security Audits',
              'Risk Management',
            ],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'Cybersecurity Projects',
        projects: [
          'Vulnerability Assessment & Penetration Testing',
          'Security Monitoring Dashboard',
          'SOC Incident Analysis',
          'Web Security Assessment',
          'Cloud Security Assessment',
        ],
      },
      {
        domain: 'Digital Forensics Projects',
        projects: [
          'Disk Forensics Investigation',
          'Memory Analysis',
          'Malware Investigation',
          'Email Forensics',
          'Cybercrime Investigation Case Study',
        ],
      },
      {
        domain: 'Threat Intelligence Projects',
        projects: [
          'Threat Hunting Exercise',
          'Security Incident Investigation',
          'Threat Intelligence Reporting',
        ],
      },
    ],
    programOutcome: [
      'Understand enterprise cybersecurity architecture',
      'Secure networks, servers, and cloud environments',
      'Perform vulnerability assessments and penetration testing',
      'Monitor and investigate security incidents',
      'Conduct digital forensic investigations',
      'Analyze cyber threats and malware activities',
      'Implement security controls and compliance frameworks',
      'Work with SOC and threat intelligence teams',
      'Investigate cybercrime and security breaches',
      'Build a professional cybersecurity project portfolio',
    ],
    careers: [
      {
        level: 'Entry-Level Roles',
        roles: [
          'Cybersecurity Analyst',
          'SOC Analyst',
          'Security Operations Analyst',
          'Information Security Analyst',
          'Vulnerability Assessment Analyst',
          'Digital Forensics Associate',
        ],
      },
      {
        level: 'Mid-Level Roles',
        roles: [
          'Cybersecurity Engineer',
          'Ethical Hacker',
          'Penetration Tester',
          'Incident Response Analyst',
          'Threat Intelligence Analyst',
          'Digital Forensics Investigator',
          'Security Consultant',
        ],
      },
      {
        level: 'Senior-Level Roles',
        roles: [
          'Security Architect',
          'Cybersecurity Manager',
          'Lead Penetration Tester',
          'Security Consultant',
          'Incident Response Manager',
          'Head of Cybersecurity',
          'Chief Information Security Officer (CISO)',
        ],
      },
    ],
    whoShouldJoin: [
      'B.Sc, BCA, B.Tech, BE Graduates',
      'MCA & M.Sc Students',
      'IT Support Professionals',
      'Network Administrators',
      'System Administrators',
      'Software Engineers',
      'Cybersecurity Enthusiasts',
      'Working Professionals',
      'Government Security Professionals',
      'Career Transition Candidates',
    ],
    careerAdvantage: 'The Advanced Program in Cybersecurity & Forensics (APCF) equips learners with practical expertise in Ethical Hacking, Penetration Testing, SOC Operations, Digital Forensics, Threat Intelligence, Cloud Security, and Incident Response. The program develops industry-ready professionals capable of protecting organizations from cyber threats, investigating cybercrimes, and building secure digital environments across industries worldwide.',
  },
  FDE: {
    id: 'fde',
    title: 'AI Forward Deployment Engineer (FDE)',
    tagline: 'Build client-ready AI solutions inside real business environments across LLMs, RAG, agents, data, cloud, and production operations.',
    overview: 'The AI Forward Deployment Engineer (FDE) program prepares learners to become hybrid engineer-consultants who work directly with clients to build and ship practical AI solutions in real environments.\n\nLearners build depth across the four FDE pillars: AI, Data, Cloud, and Software Engineering. The program covers modern GenAI foundations, LLMs, prompt engineering, RAG, vector databases, agents, MCP, AI-assisted software engineering, data pipelines, AI system design, cloud deployment, enterprise delivery, and LLMOps.',
    duration: '6 Months',
    practicalExposure: [
      'Live instructor-led training',
      'Hands-on labs and MCQs',
      'Rapid AI prototyping exercises',
      'RAG and agent development labs',
      'MCP and workflow automation practice',
      'Cloud deployment and CI/CD practice',
      'Production LLMOps and monitoring labs',
      'Portfolio building, case studies, GitHub projects, and LinkedIn branding',
    ],
    expertiseAreas: [
      'Forward Deployment Engineering',
      'Generative AI and LLM Applications',
      'RAG, Vector Databases, and AI Agents',
      'AI Workflow Automation and MCP',
      'Data Engineering and AI System Design',
      'Cloud Architecture and Production LLMOps',
      'Enterprise AI Delivery and Consulting',
    ],
    theme: 'indigo',
    modules: [
      {
        title: 'Module 1: What is a Forward Deployment Engineer?',
        sections: [
          {
            title: 'FDE Role and Mindset',
            topics: [
              'What is an FDE? The intersection of engineering, consulting, and AI',
              'FDE vs SWE: FDEs build for clients, SWEs build products',
              'The FDE mindset: speed over perfection and empathy over assumptions',
              'FDE skillset: AI, Data, Cloud, and Software Engineering as the four pillars',
              'Delivery method: concepts, MCQs, and labs',
            ],
          },
        ],
      },
      {
        title: 'Module 2: AI and GenAI Foundations',
        sections: [
          {
            title: 'Modern AI Foundations',
            topics: [
              'Generative AI and the AI to ML to DL to GenAI evolution',
              'Transformers, tokens, and tokenization',
              'Customizing AI with pre-training, fine-tuning, RAG, open models, and closed models',
              'AI application lifecycle: idea, prototype, evaluation, production, and monitoring',
            ],
          },
        ],
      },
      {
        title: 'Module 3: Working with LLMs',
        sections: [
          {
            title: 'LLM Development Decisions',
            topics: [
              'How LLMs work and how context windows affect solution design',
              'Hallucination causes and mitigation strategies',
              'Model selection for FDEs using the cost, speed, and quality triangle',
              'API vs self-hosted deployment, cost, latency, compliance, and scale',
            ],
          },
        ],
      },
      {
        title: 'Module 4: Prompt Engineering Essentials',
        sections: [
          {
            title: 'Enterprise Prompting Patterns',
            topics: [
              'Prompt engineering overview and quality drivers',
              'Zero-shot, few-shot, chain-of-thought, and prompt chaining',
              'System prompts, structured output, JSON mode, temperature, and controls',
              'Evaluation, A/B testing, classification, extraction, summarization, and transformation',
            ],
          },
        ],
      },
      {
        title: 'Module 5: RAG and Vector Databases',
        sections: [
          {
            title: 'Retrieval-Augmented Generation',
            topics: [
              'RAG foundations, embeddings, and vector databases',
              'Building a RAG pipeline: chunking, similarity search, ingest, embed, store, retrieve, and generate',
              'Retrieval strategies, metadata filtering, Top-K, MMR, and re-ranking',
              'Advanced RAG: self-query, HyDE, corrective RAG, and RAPTOR',
              'RAG evaluation with faithfulness, answer relevance, context recall, and RAGAS',
            ],
          },
        ],
      },
      {
        title: 'Module 6: AI Agents and Orchestration',
        sections: [
          {
            title: 'Agentic Systems',
            topics: [
              'Agents as LLM plus tools, memory, and decision loop',
              'Tool calling through JSON schema',
              'ReAct, planning, reflection, and memory patterns',
              'Multi-agent systems, supervisor-worker patterns, peer agents, LangChain, and LangGraph',
              'Agent observability, tool call logging, trace review, and token usage measurement',
            ],
          },
          {
            title: 'Lab: Research Agent',
            topics: [
              'Accept a research question',
              'Search the web using a web search tool',
              'Read relevant pages using a URL reader tool',
              'Synthesize findings into a structured report',
              'Save output to a file',
            ],
          },
        ],
      },
      {
        title: 'Module 7: MCP and AI Workflow Automation',
        sections: [
          {
            title: 'Tool-Connected AI Workflows',
            topics: [
              'Model Context Protocol (MCP) as a standard protocol for safe external tool use',
              'MCP vs REST API',
              'MCP components: host, client, and server',
              'Building an MCP server to expose databases, APIs, and file-system tools',
              'Workflow automation with directed graphs, triggers, scheduled patterns, and human checkpoints',
            ],
          },
        ],
      },
      {
        title: 'Module 8: AI-Assisted Software Engineering',
        sections: [
          {
            title: 'AI-First Software Delivery',
            topics: [
              'AI-first SDLC: prompt, generate, review, refine, and ship',
              'Claude Code, Cursor, and GitHub Copilot for accelerated engineering',
              'Rapid prototyping from zero to working demo',
              'AI code review before pull request submission',
              'AI debugging with errors and stack traces',
              'Lab: build a full feature in 2 hours using AI tools',
            ],
          },
        ],
      },
      {
        title: 'Module 9: Data Engineering and System Design for AI',
        sections: [
          {
            title: 'AI Data Layer and System Design',
            topics: [
              'Data engineering fundamentals for AI solutions',
              'ETL vs ELT and modern warehouse-first workflows',
              'Data lake, lakehouse, and medallion architecture',
              'Batch vs streaming and AI data pipelines',
              'Data quality, schema validation, and freshness monitoring',
              'Platform landscape: Databricks, Snowflake, dbt, Airflow, and Kafka',
              'AI system design fundamentals: requirements, components, data flow, and interfaces',
              'Feature stores, vector stores, caches, scalability, reliability, queues, retries, and graceful degradation',
            ],
          },
        ],
      },
      {
        title: 'Module 10: Cloud Architecture and AI Deployment',
        sections: [
          {
            title: 'Production AI Deployment',
            topics: [
              'Cloud-native principles and AWS Well-Architected pillars',
              'AI platform deployment with EC2, Lambda, ECS, Bedrock, and SageMaker',
              'Microservices, APIs, Docker, Kubernetes, and serverless AI',
              'Model serving, inference infrastructure, endpoints, autoscaling, GPU vs CPU, and batching',
              'Blue-green, canary, and rolling deployment strategies',
              'Infrastructure as Code with Terraform or CloudFormation',
              'CI/CD with GitHub Actions',
              'Observability, logs, metrics, tracing, latency, cost, drift dashboards, IAM, VPC isolation, and secrets',
              'Lab: deploy an AI service end-to-end with container, cloud, CI/CD, and monitoring',
            ],
          },
        ],
      },
      {
        title: 'Module 11: Enterprise AI and FDE Delivery',
        sections: [
          {
            title: 'Client-Facing AI Delivery',
            topics: [
              'Forward Deployment Engineer delivery model',
              'Converting business problems into AI-driven technical solutions',
              'Requirements gathering and stakeholder discovery',
              'Client workshops and requirement analysis sessions',
              'Problem translation framework for enterprise AI projects',
              'Solution design based on business objectives',
              'Rapid AI prototypes and proof-of-concepts',
              'Technical storytelling and solution presentation',
              'Enterprise AI project planning and delivery best practices',
              'Communication for technical and non-technical stakeholders',
              'Technical briefs, solution proposals, implementation roadmaps, case studies, and portfolio building',
            ],
          },
        ],
      },
      {
        title: 'Module 12: LLMOps and Production Operations',
        sections: [
          {
            title: 'Operating Live LLM Systems',
            topics: [
              'LLMOps vs MLOps and what changes in production LLM systems',
              'Model versioning, registry, promotion, rollback, and audit',
              'Prompt and configuration management with feature flags',
              'Guardrails, safety, PII redaction, moderation, and production filtering',
              'Online evaluation, A/B testing, and human-in-the-loop feedback loops',
              'Cost management and FinOps for AI with token and GPU cost monitoring',
              'Scaling, resilience, request queuing, caching, and fallback models',
              'Environment and release strategy across dev, staging, and production',
              'Monitoring, drift, incident response, alerting, and on-call runbooks',
              'Lab: operate a live AI system with versioning, guardrails, cost tracking, and monitoring',
            ],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'AI Agent Projects',
        projects: [
          {
            title: 'Research Agent',
            description: 'Build an AI agent that accepts a research question, searches the web, reads relevant pages, synthesizes findings, and saves a structured report.',
          },
          {
            title: 'Enterprise RAG Assistant',
            description: 'Design and build a retrieval-augmented system with chunking, embeddings, vector search, metadata filtering, generation, and evaluation.',
          },
        ],
      },
      {
        domain: 'Deployment Projects',
        projects: [
          {
            title: 'End-to-End AI Service Deployment',
            description: 'Containerize and deploy an AI service with cloud infrastructure, CI/CD, monitoring, and production-ready endpoint design.',
          },
          {
            title: 'Live LLMOps System',
            description: 'Add prompt versioning, guardrails, cost tracking, release strategy, observability, and incident response practices to a deployed LLM application.',
          },
        ],
      },
      {
        domain: 'Enterprise Delivery Projects',
        projects: [
          {
            title: 'Client AI Solution Blueprint',
            description: 'Translate a business problem into requirements, solution architecture, technical brief, implementation roadmap, and proof-of-concept plan.',
          },
          {
            title: 'AI System Design Case Study',
            description: 'Architect an end-to-end enterprise RAG or agent system covering data flow, interfaces, reliability, queues, retries, and graceful degradation.',
          },
        ],
      },
    ],
    programOutcome: [
      'Understand the Forward Deployment Engineer role and delivery model',
      'Translate messy business problems into AI-driven technical requirements',
      'Build practical AI prototypes, RAG systems, and agentic applications',
      'Work with LLM APIs, model selection, prompts, structured output, and evaluations',
      'Design AI data layers using pipelines, vector stores, caches, and reliable system patterns',
      'Build MCP-enabled tools and AI workflow automations',
      'Deploy AI services using cloud-native architecture, containers, CI/CD, and monitoring',
      'Operate production LLM systems with guardrails, versioning, observability, cost controls, and incident response',
      'Create a portfolio with case studies, GitHub projects, and enterprise AI delivery artifacts',
    ],
    careers: [
      {
        level: 'Forward Deployment and AI Engineering Roles',
        roles: [
          'Forward Deployment Engineer',
          'AI Engineer',
          'AI Solutions Engineer',
          'Generative AI Engineer',
          'Agentic AI Developer',
          'LLM Engineer',
        ],
      },
      {
        level: 'Enterprise AI and Consulting Roles',
        roles: [
          'Enterprise AI Consultant',
          'AI Solution Architect',
          'AI Implementation Consultant',
          'AI Automation Engineer',
          'Technical Solutions Consultant',
        ],
      },
      {
        level: 'Production AI Roles',
        roles: [
          'LLMOps Engineer',
          'AI Platform Engineer',
          'Cloud AI Engineer',
          'AI Product Engineer',
          'AI Systems Designer',
        ],
      },
    ],
    whoShouldJoin: [
      'Software Engineers',
      'AI Engineers',
      'Data Scientists',
      'Data Analysts',
      'Data Engineers',
      'Cloud Engineers',
      'Business Analysts',
      'Product Managers',
      'Project Managers',
      'Consultants',
      'Entrepreneurs',
      'Fresh Graduates',
      'Working Professionals from Any Industry',
    ],
    careerAdvantage: 'The AI Forward Deployment Engineer program gives learners a rare combination of client-facing delivery skills and production AI engineering depth. Graduates can move beyond demo-building into real enterprise AI implementation, where they can gather requirements, prototype quickly, integrate with data and tools, deploy to cloud, and operate LLM systems reliably in production.',
  },
  DAYS7_GENAI: {
    id: 'days7_genai',
    title: '7 Days Gen AI & Agentic AI Hands-on Master Program',
    tagline: '🚀 Become AI-Ready in Just 7 Days. Learn the Skills That Every Company Is Hiring For.',
    overview: 'The 7 Days Generative AI & Agentic AI Hands-on Master Program is a crash course designed to take you from Python programming foundations all the way to deep learning, Large Language Models (LLMs), Agentic AI, and building real-world autonomous multi-agent systems.\n\nLearn the latest frameworks including LangChain, LangGraph, CrewAI, and AutoGen. Graduate with three portfolio-ready AI applications built for real-world scenarios.',
    duration: '7 Days (42 Hours)',
    practicalExposure: [
      '100% Practical & Hands-on',
      'Live Instructor-Led Sessions',
      '42 Hours of Intensive Learning',
      'Real-World Enterprise Use Cases',
      '3 Complete Portfolio AI Products',
      'LangChain, LangGraph, CrewAI & AutoGen Frameworks',
      'AI Safety, Guardrails & Production Best Practices',
      'Certificate of Completion',
    ],
    theme: 'orange',
    modules: [
      {
        title: 'Day 1: Python & Deep Learning Foundations',
        sections: [
          {
            title: 'Core Foundations',
            topics: [
              'Python programming from scratch',
              'Python Programming constructs',
              'NumPy & Pandas library fundamentals',
              'Data Visualization',
              'Neural Networks foundations',
              'Deep Learning architecture',
              'NLP (Natural Language Processing) foundations',
            ],
          },
        ],
      },
      {
        title: 'Day 2: Transformers & Large Language Models',
        sections: [
          {
            title: 'Large Language Models (LLMs)',
            topics: [
              'Understand the technology behind ChatGPT',
              'Transformers architecture',
              'Attention Mechanism',
              'GPT models',
              'BERT & T5 models',
              'Prompt Engineering techniques',
              'Structured Outputs from LLMs',
            ],
          },
        ],
      },
      {
        title: 'Day 3: Agentic AI & RAG',
        sections: [
          {
            title: 'RAG & Cognitive Search',
            topics: [
              'Move beyond simple chatbots',
              'Build AI systems that Think, Plan, Retrieve Information, Use Tools, and Take Actions',
              'Retrieval-Augmented Generation (RAG)',
              'Vector Databases integration',
              'AI Memory mechanisms',
              'Retrieval Systems',
            ],
          },
        ],
      },
      {
        title: 'Day 4: Build Multi-Agent AI Systems',
        sections: [
          {
            title: 'Multi-Agent Frameworks',
            topics: [
              'LangChain integration',
              'LangGraph workflows',
              'CrewAI agent setups',
              'AutoGen agent systems',
              'AI Orchestration & Collaboration',
              'AI Teams setups',
              'Workflow Automation',
              'Human-in-the-Loop practices',
            ],
          },
        ],
      },
      {
        title: 'Day 5: Fine-Tuning & Multimodal AI',
        sections: [
          {
            title: 'Advanced AI Architectures',
            topics: [
              'LoRA & PEFT fine-tuning concepts',
              'Vision AI & Image Processing',
              'OCR (Optical Character Recognition)',
              'AI Memory enhancement',
              'Multimodal AI integration',
              'Cross-session Intelligence',
            ],
          },
        ],
      },
      {
        title: 'Day 6: Production AI',
        sections: [
          {
            title: 'AI Governance & Observability',
            topics: [
              'Deploy AI systems responsibly',
              'AI Safety frameworks',
              'Guardrails implementation',
              'Prompt Security & injection handling',
              'Model Context Protocol (MCP)',
              'AI Evaluation & Metrics',
              'Monitoring & Observability in production',
            ],
          },
        ],
      },
      {
        title: 'Day 7: Build 3 Complete AI Products',
        sections: [
          {
            title: 'Banking AI Agent',
            topics: ['Build an autonomous Loan Processing Agent'],
          },
          {
            title: 'Customer Support AI',
            topics: ['Build a Multi-Agent Customer Support Platform'],
          },
          {
            title: 'Sales AI Agent',
            topics: ['Build a Lead Qualification & Lead Scoring AI System'],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'Banking AI Agent',
        projects: ['Build an autonomous Loan Processing Agent'],
      },
      {
        domain: 'Customer Support AI',
        projects: ['Build a Multi-Agent Customer Support Platform'],
      },
      {
        domain: 'Sales AI Agent',
        projects: ['Build a Lead Qualification & Lead Scoring AI System'],
      },
      {
        domain: 'AI Document Search',
        projects: ['Build a RAG Document Search Engine'],
      },
    ],
    programOutcome: [
      'Build and deploy real AI applications—not just learn theory',
      'Understand how ChatGPT and modern LLMs actually work',
      'Build autonomous AI Agents that can think, plan, reason, and execute tasks',
      'Create multi-agent workflows using LangChain, LangGraph, CrewAI, and AutoGen',
      'Implement RAG document search engines and vector databases',
      'Apply fine-tuning techniques (LoRA, PEFT) and work with Vision AI',
      'Deploy production-ready AI systems with safety guardrails and monitoring',
    ],
    careers: [
      {
        level: 'AI Engineering Roles',
        roles: [
          'AI Engineer',
          'Generative AI Engineer',
          'Agentic AI Developer',
          'LLM Engineer',
          'AI Automation Engineer',
        ],
      },
      {
        level: 'AI Strategy & Solutions Roles',
        roles: [
          'AI Product Manager',
          'AI Consultant',
          'AI Solutions Architect',
          'AI Innovation Lead',
        ],
      },
    ],
    whoShouldJoin: [
      'Software Engineers',
      'Data Scientists',
      'Data Analysts',
      'AI Engineers',
      'Product Managers',
      'Business Analysts',
      'Project Managers',
      'Entrepreneurs',
      'Consultants',
      'Banking Professionals',
      'Sales Professionals',
      'HR Professionals',
      'Operations Teams',
      'Fresh Graduates',
      'Working Professionals from Any Industry',
    ],
    careerAdvantage: 'The 7 Days Generative AI & Agentic AI Hands-on Master Program prepares participants to build production-ready AI solutions and autonomous agents. By graduating with three complete portfolio-ready AI applications on GitHub, participants can immediately showcase enterprise AI capabilities to recruiters and employers hiring for modern AI engineering and automation roles.',
  },
  FLP: {
    id: 'flp',
    title: 'Flexi Learning Program in Data Science & AI (FLP)',
    tagline: 'Self-paced Data Science, Gen AI, and Agentic AI learning with structured LMS access and practical assignments.',
    overview: 'The Flexi Learning Program is designed for students and working professionals who want to build Data Science, Generative AI, and Agentic AI skills at their own pace.\n\nThe program provides structured self-paced LMS learning, recorded lessons, study resources, practice exercises, and module-wise assignments for flexible learning.',
    duration: 'Flexible - Learn at Your Own Pace',
    practicalExposure: [
      'Self-paced LMS learning',
      'Recorded lessons and study resources',
      'Practice exercises and assignments',
      'Module-wise learning path',
      'Data Science, Gen AI, and Agentic AI fundamentals',
      'Flexible revision access',
    ],
    expertiseAreas: [
      'Data Science Fundamentals and Advanced Concepts',
      'Data Engineering and Visualization',
      'Machine Learning and Deep Learning',
      'Generative AI Models and Applications',
      'Agentic AI, Intelligent Agents, and Automation',
      'AI Ethics, Security, and Future Trends',
    ],
    theme: 'teal',
    modules: [
      {
        title: 'Module 1: Introduction to Data Science and Excel',
        sections: [
          {
            title: 'Data Science and Excel Foundations',
            topics: [
              'Overview of data science and analytics',
              'Excel basics and advanced functions',
              'Data cleaning and transformation',
              'Pivot tables and charts',
              'Analysis ToolPak',
              'Power Query',
              'Macros and VBA basics',
            ],
          },
        ],
      },
      {
        title: 'Module 2: SQL for Data Analysis',
        sections: [
          {
            title: 'Database Querying and Analytics',
            topics: [
              'Databases and SQL fundamentals',
              'Basic queries, joins, unions, and subqueries',
              'Aggregation and grouping',
              'Window functions, CTEs, CASE, and NULL handling',
              'DML, tables, views, and temporary tables',
              'Query optimization',
              'Cohort, customer, funnel, and time-series analysis projects',
            ],
          },
        ],
      },
      {
        title: 'Module 3: Data Visualization with Tableau',
        sections: [
          {
            title: 'Tableau Dashboards and Storytelling',
            topics: [
              'Tableau fundamentals',
              'Core charts and visualizations',
              'Dimensions and measures',
              'Advanced charts',
              'Maps and geospatial analysis',
              'Dashboards and stories',
              'Best practices and performance optimization',
            ],
          },
        ],
      },
      {
        title: 'Module 4: Business Intelligence with Power BI',
        sections: [
          {
            title: 'Power BI Reporting and Analytics',
            topics: [
              'Power BI suite overview',
              'Power Query',
              'Data modeling',
              'DAX calculations',
              'Visual reports and dashboards',
              'Power BI Service and collaboration',
              'Dataflows, AI insights, streaming, and embedding',
            ],
          },
        ],
      },
      {
        title: 'Module 5: Python Programming for Data Science',
        sections: [
          {
            title: 'Python Analytics Toolkit',
            topics: [
              'Python setup, syntax, and control flow',
              'Functions and modules',
              'Core data structures',
              'NumPy and Pandas',
              'Matplotlib, Seaborn, and Plotly',
              'Exploratory data analysis',
              'Web scraping and APIs',
              'Object-oriented programming basics',
            ],
          },
        ],
      },
      {
        title: 'Module 6: Machine Learning with Python',
        sections: [
          {
            title: 'Applied Machine Learning',
            topics: [
              'Machine learning fundamentals',
              'Scikit-learn workflows',
              'Supervised regression',
              'Classification models',
              'Unsupervised learning',
              'Ensemble methods',
              'Model evaluation, tuning, and AutoML',
            ],
          },
        ],
      },
      {
        title: 'Module 7: Deep Learning and Neural Networks',
        sections: [
          {
            title: 'Neural Networks and Advanced AI',
            topics: [
              'Neural network foundations',
              'TensorFlow and Keras',
              'Convolutional neural networks',
              'RNN, LSTM, and GRU models',
              'Autoencoders, GANs, and style transfer',
              'NLP with deep learning',
              'Transformers and BERT',
            ],
          },
        ],
      },
      {
        title: 'Module 8: GenAI, Advanced LLM Models, and LangChain Applications',
        sections: [
          {
            title: 'LLM Application Development',
            topics: [
              'Hugging Face LLMs',
              'LangChain fundamentals',
              'Model I/O, loaders, and parsers',
              'RAG with ChromaDB and chains',
              'Memory and chatbots',
              'Agents and tools',
            ],
          },
        ],
      },
      {
        title: 'Module 9: Agentic AI',
        sections: [
          {
            title: 'Intelligent Agents and Automation',
            topics: [
              'Agentic AI foundations',
              'Perception, reasoning, planning, action, and memory',
              'Prompting and evaluation for agents',
              'AutoGen, CrewAI, LangChain, and LlamaIndex',
              'AutoGen and CrewAI projects',
              'n8n agent automation',
              'Model Context Protocol',
            ],
          },
        ],
      },
    ],
    industryProjects: [
      {
        domain: 'Retail Marketing',
        projects: ['Build analytics and AI workflows for customer behavior, campaign insights, and retail decision-making.'],
      },
      {
        domain: 'Healthcare',
        projects: ['Apply data science and AI methods to healthcare analytics and operational intelligence use cases.'],
      },
      {
        domain: 'Telecom',
        projects: ['Work on telecom analytics use cases involving customers, service patterns, and performance insights.'],
      },
      {
        domain: 'Banking',
        projects: ['Build portfolio-ready analytics and AI projects for banking data, risk, customers, and business reporting.'],
      },
      {
        domain: 'E-Commerce',
        projects: ['Create e-commerce analytics projects covering sales, customers, funnels, and AI-assisted recommendations.'],
      },
    ],
    programOutcome: [
      'Learn and practice at your own pace without disrupting work or studies',
      'Build a strong Data Science, Gen AI, and Agentic AI foundation',
      'Practice with structured exercises and assignments',
      'Strengthen core analytics, ML, and AI concepts',
      'Stay relevant with evolving AI technologies',
    ],
    careers: [
      {
        level: 'Analytics and BI Roles',
        roles: ['Data Analyst', 'BI Analyst', 'Analytics Associate', 'Business Analyst'],
      },
      {
        level: 'Data Science and AI Roles',
        roles: ['Junior Data Scientist', 'Data Scientist', 'Machine Learning Engineer', 'AI Engineer'],
      },
      {
        level: 'Generative AI and Agentic AI Roles',
        roles: ['GenAI Developer', 'Agentic AI Developer', 'LLM Application Developer', 'AI Automation Specialist'],
      },
    ],
    whoShouldJoin: [
      'Students preparing for a future-proof career',
      'Working professionals looking to transition into AI and Data Science',
      'Tech enthusiasts eager to explore modern AI trends',
      'Learners who need a flexible self-paced format',
    ],
    careerAdvantage: 'The Flexi Learning Program gives learners the freedom to build Data Science and AI skills at their own pace through structured lessons, learning resources, and practical assignments.',
    certifications: [
      'DV Analytics Flexi Learning Program Certificate',
    ],
  },
};
