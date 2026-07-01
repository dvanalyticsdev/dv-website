import React, { useRef } from 'react';
import { useGlowCard } from '../hooks/useGlowCard';

const posterImages: Record<string, string> = {
  apids: '/courses-poster/APIDS.jpeg',
  apida: '/courses-poster/APIDA.jpeg',
  aiml: '/courses-poster/Advance AIML.jpeg',
  genai: '/courses-poster/Gen AI.jpeg',
  specialist: '/courses-poster/DAS.jpeg',
  apcs: '/courses-poster/APCF.jpeg',
};

interface Module {
  title: string;
  topics: string[];
}

interface Program {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  theme: 'blue' | 'purple' | 'indigo' | 'magenta' | 'orange' | 'teal';
  bulletPoints: string[];
  duration: string;
  delivery: string;
  overview: string;
  modules: Module[];
  projects: string[];
  tools: string[];
  careers: string[];
}

interface ProgramsSectionProps {
  onViewDetails?: (courseId: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onViewDetails }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const programs: Program[] = [
    {
      id: 'apids',
      title: 'Advanced Program in Industrial Data Science & AI (APIDS)',
      shortTitle: 'Industrial Data Science & AI',
      tagline: 'Complete learning journey from Data Management to Cloud Deployment of AI systems.',
      theme: 'blue',
      bulletPoints: [
        'SQL, Python & PySpark/SAS Data Management',
        'Excel AI, Power BI & Tableau Visualizations',
        'Machine Learning & Advanced Statistics',
        'Deep Learning, Generative AI & Agentic AI',
        'Cloud MLOps, LLMOps & AIOps Deployment'
      ],
      duration: '9 Months',
      delivery: 'Live Instructor-Led Online',

      overview: 'The Advanced Program in Industrial Data Science & AI (APIDS) is a comprehensive industry-oriented training program designed to transform graduates and working professionals into highly skilled Data Science & AI practitioners. This program provides a complete learning journey from Data Management, Data Analytics, Machine Learning, Deep Learning, Generative AI, Agentic AI, and Cloud Deployment to prepare candidates for modern AI-driven careers across industries.',
      modules: [
        {
          title: 'Module 1: Data Management',
          topics: ['SQL Server (DDL/DML, Joins, CTEs, Window Functions, Stored Procedures, Optimization)', 'Python Programming (Data Structures, Functions, OOP, APIs, Automation)', 'SAS Base & Advanced Programming (DATA Step, Macros, Regulatory Reporting)', 'PySpark / Scala Programming (Distributed Computing, Big Data processing)']
        },
        {
          title: 'Module 2: Data Analysis & Visualization',
          topics: ['Excel + AI (Advanced Formulas, Pivot Tables, Power Query, Excel Copilot)', 'Power BI (Data Modeling, DAX, KPI Dashboards, AI Visuals, Security)', 'Tableau (Calculated Fields, Advanced Visualizations, Storytelling)']
        },
        {
          title: 'Module 3: Data Mining & AI',
          topics: ['Python Statistics (Hypothesis Testing, Regression Analysis, Risk Analytics)', 'Python Machine Learning (Supervised/Unsupervised Learning, Credit Risk, Churn)', 'Python Deep Learning (Neural Networks, CNN, LSTM, TensorFlow/Keras)', 'Generative AI (Large Language Models, Prompt Engineering, RAG, Fine Tuning Concepts)', 'Agentic AI (AI Agents, LangChain, LangGraph, CrewAI, AutoGen)']
        },
        {
          title: 'Module 4: Cloud Deployment',
          topics: ['MLOps (Model Versioning, CI/CD, Docker, Production Deployment)', 'LLMOps (LLM Evaluation, Prompt Monitoring, Cost Optimization, Governance)', 'AIOps (Infrastructure Monitoring, Incident Detection, Cloud Operations)']
        }
      ],
      projects: [
        'Banking: Credit Risk Modeling & Loan Default Prediction',
        'Telecom: Customer Churn Prediction & Lifetime Value (CLV)',
        'Retail: Recommendation Engine & Demand Forecasting',
        'Insurance: Claims Analytics & Fraud Detection'
      ],
      tools: [
        'SQL Server', 'Python', 'SAS', 'PySpark', 'Power BI', 'Tableau',
        'Excel AI', 'Scikit-Learn', 'TensorFlow', 'Keras', 'OpenAI APIs',
        'LangChain', 'LangGraph', 'CrewAI', 'AWS', 'Docker', 'GitHub', 'MLOps'
      ],
      careers: [
        'Data Scientist', 'Machine Learning Engineer', 'AI Engineer', 'Analytics Consultant',
        'AI Solution Architect', 'Lead Data Scientist', 'Head of AI'
      ]
    },
    {
      id: 'apida',
      title: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
      shortTitle: 'Industrial Data Analytics & AI',
      tagline: 'Master Data Analytics, Business Intelligence, and Predictive Modeling without deep code complexity.',
      theme: 'purple',
      bulletPoints: [
        'Relational Database Management (SQL Server)',
        'Python Programming & SAS Analytics',
        'Power BI & Tableau Business Intelligence',
        'Statistical Methods & Machine Learning Models',
        'MLOps Production Model Deployment'
      ],
      duration: '7 Months',
      delivery: 'Live Instructor-Led Online',
      overview: 'The Advanced Program in Industrial Data Analytics & AI (APIDA) is a specialized industry-focused program designed for graduates and working professionals who want to build expertise in Data Analytics, Business Intelligence, Machine Learning, and AI-driven Decision Making. APIDA is ideal for professionals who want to build strong analytics capabilities without going into advanced Deep Learning, Generative AI, and Agentic AI development.',
      modules: [
        {
          title: 'Module 1: Data Management',
          topics: ['SQL Server (Database Concepts, Joins, CTEs, Window Functions, Stored Procedures)', 'Python Programming (Variables, Functions, File Processing, API Integration)', 'SAS Base & Advanced Programming (DATA Step, Macro Programming, Data Manipulation)', 'PySpark / Scala Programming (Big Data Concepts, Spark SQL, Distributed Processing)']
        },
        {
          title: 'Module 2: Data Analysis & Visualization',
          topics: ['Excel + AI (Pivot Tables, Power Query, Power Pivot, Excel AI & Copilot)', 'Power BI (Data modeling, DAX, KPI Monitoring, Sales Dashboarding, Publishing)', 'Tableau (Calculated Fields, Storytelling with Data, Executive Dashboards)']
        },
        {
          title: 'Module 3: Data Mining & AI',
          topics: ['Python Statistics (Descriptive Stats, Probability, Hypothesis Testing, Correlation)', 'Python Machine Learning (Linear/Logistic Regression, Tree-Based Models, Clustering, Segmentation)', 'Model Evaluation (Accuracy, Precision, Recall, ROC-AUC, Cross Validation)']
        },
        {
          title: 'Module 4: Cloud Deployment',
          topics: ['MLOps (Git & Version Control, CI/CD, Model Deployment, Monitoring, Performance Tracking)']
        }
      ],
      projects: [
        'Banking: Credit Risk Prediction & Collection Analytics',
        'Telecom: Customer Churn Prediction & Revenue Analytics',
        'Retail: Sales Performance Dashboard & Product Recommendations',
        'Healthcare: Hospital Performance Analytics'
      ],
      tools: [
        'SQL Server', 'Python', 'SAS', 'PySpark', 'Excel AI', 'Power BI',
        'Tableau', 'NumPy', 'Pandas', 'Scikit-Learn', 'GitHub', 'Docker', 'MLOps'
      ],
      careers: [
        'Data Analyst', 'Business Analyst', 'Reporting Analyst', 'BI Analyst',
        'Machine Learning Analyst', 'Associate Data Scientist', 'Analytics Consultant'
      ]
    },
    {
      id: 'aiml',
      title: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)',
      shortTitle: 'Advanced AIML Complete',
      tagline: 'Rigorous tiered program covering foundation math to advanced autonomous multi-agent networks.',
      theme: 'indigo',
      bulletPoints: [
        'Tier 1 Foundation: Python, SQL & Statistics',
        'Tier 2 Base: Machine Learning, CNNs & Transformers',
        'Tier 3 MLOps: Automated AWS EKS Deployment',
        'Advanced Generative AI & LLMOps Guardrails',
        'Agentic AI: LangGraph, CrewAI & AutoGen Agents'
      ],
      duration: '10 Months',
      delivery: 'Live Hybrid (Online + Projects)',
      overview: 'The Advanced Program in AI & Machine Learning is a complete, career-focused curriculum divided into three tiers (Bridge, Base, Advanced) leading to MLOps, Generative AI, and Agentic AI deployment. Designed by AI product developers and technology mentors, it prepares candidates to build and run production-grade intelligent systems at scale on AWS cloud infrastructures.',
      modules: [
        {
          title: 'Tier 1: Bridge / Foundation',
          topics: ['Python for Data Science (NumPy, Pandas, Visualizations with Seaborn)', 'SQL for Data Science (Window Functions, CTEs, Query Optimization)', 'Basic Statistics & Probability (Descriptive stats, Probability distributions, Outlier detection)', 'Capstone: Retail Sales EDA Dashboard deployed on Streamlit']
        },
        {
          title: 'Tier 2: Base / Core',
          topics: ['Inferential Statistics for ML (Hypothesis Testing, ANOVA, Correlation, Regression LINE assumptions)', 'Machine Learning Complete (Ridge/Lasso, Tree Models, XGBoost, SHAP/LIME Explainers)', 'Deep Learning Foundations (Perceptrons, Backpropagation, TensorFlow/PyTorch)', 'Natural Language Processing (RNN, LSTM, Transformers, BERT, GPT, Hugging Face)', 'Computer Vision (CNNs, Transfer Learning ResNet, Object Detection YOLO, ViTs)', 'Capstones: Churn API with FastAPI, Sentiment Analysis BERT API, Image CV Defect Detection']
        },
        {
          title: 'Tier 3: Advanced / Production',
          topics: ['MLOps on AWS (Docker containers, Amazon ECR, Kubernetes/EKS cluster deployments, Terraform)', 'CI/CD Pipelines (GitHub Actions, Automated Training, Model Registry, Blue-Green deployments)', 'Model Monitoring (Evidently AI data drift, concept drift, CloudWatch alarms)', 'Generative AI & Agentic AI (RAG, Vector DBs, LangGraph, CrewAI, AutoGen, MCP)', 'LLMOps (FastAPI streaming, Bedrock, SageMaker, Cost Helicone, Guardrails)', 'MLOps Projects: Vehicle Mileage prediction with drift, Return Prediction pre-shipment, Auto re-clustering']
        }
      ],
      projects: [
        'Sentiment Classification API Fine-tuned on BERT',
        'Image CV Defect Classifier for Manufacturing Quality Edge Deployments',
        'Automated Vehicle Mileage Predictor with Evidently AI Drift-Retraining Pipeline',
        'Proactive Order Return Predictor with LLM-generated CRM messaging'
      ],
      tools: [
        'Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'PyTorch',
        'Hugging Face', 'LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'Pinecone',
        'Evidently AI', 'AWS EKS', 'SageMaker', 'Bedrock', 'Docker', 'FastAPI', 'Streamlit'
      ],
      careers: [
        'Machine Learning Engineer', 'AI Engineer', 'NLP Developer', 'CV Specialist',
        'MLOps Engineer', 'AI Solutions Architect', 'Senior Data Scientist'
      ]
    },
    {
      id: 'genai',
      title: 'Master Program in Generative AI & Agentic AI (MPGAA)',
      shortTitle: 'Master GenAI & Agentic AI',
      tagline: 'Specialized Master\'s curriculum focused on Large Language Models, RAG, and Autonomous Agents.',
      theme: 'magenta',
      bulletPoints: [
        'Deep Learning Foundations & NLP Focus',
        'Prompt Engineering, RAG & Fine-Tuning',
        'Agentic Architectures & Multi-Agent Swarms',
        'Model Context Protocol (MCP) Server/Client',
        'AWS LLMOps, Cost Optimization & Security'
      ],
      duration: '6 Months',
      delivery: 'Live Instructor-Led Online',

      overview: 'The Master Programme in Generative AI and Agentic AI is an advanced, highly specialized curriculum designed to build, deploy, and operate production-grade GenAI systems and autonomous LLM infrastructures. From prompt engineering, advanced RAG, and multimodal AI to instruction fine-tuning, Model Context Protocol (MCP) servers, and cost-optimized LLMOps on AWS Bedrock/EKS, this program targets high-end engineering roles in the GenAI landscape.',
      modules: [
        {
          title: 'Tier 1: Bridge / Foundation',
          topics: ['Python for AI Development (Fundamentals, OOP, JSON/CSV handling, Requests library, NumPy & Pandas)', 'Capstone: Data Pipeline and REST API integration tool']
        },
        {
          title: 'Tier 2: Base / GenAI Core',
          topics: ['Deep Learning NLP Focus (Attention Mechanism, Transformers, BERT, GPT, Hugging Face)', 'Generative AI Foundations (Context windows, Quantization, Mixture of Experts)', 'Prompt Engineering (Zero/Few-shot, Chain-of-Thought, JSON mode, LangSmith debugging)', 'Retrieval-Augmented Generation (Advanced RAG, Vector DB Pinecone/Chroma, Re-ranking, Graph RAG)', 'Multimodal AI (Vision-Language CLIP/LLaVA, Stable Diffusion, Whisper Speech)', 'Fine-Tuning (PEFT, LoRA/QLoRA, Supervised Fine Tuning, DPO, Model Merging)', 'Safety & Guardrails (Content moderation, prompt injection defense, OWASP LLM top 10)', 'Capstone: Document Intelligence System with RAGAS Evaluation']
        },
        {
          title: 'Tier 3: Advanced / Agentic LLMOps',
          topics: ['Agentic AI Foundations (Perception-Action Loop, ReAct agent loops, Short/Long-Term Memory)', 'Agentic Frameworks (LangChain, LangGraph stateful flows, AutoGen group chats, CrewAI delegation)', 'Model Context Protocol (MCP Server/Client development, tool registration, client connectors)', 'AWS LLMOps (Bedrock, SageMaker JumpStart, EKS containers, FastAPI SSE streaming, CI/CD, Helicone cost monitoring)', 'Master Projects: Multi-agent research generator, Customer support agent with database memory, SQL Agent']
        }
      ],
      projects: [
        'Multi-Agent Collaborative Research & Report Generator (CrewAI / LangGraph)',
        'Intelligent Customer Support Agent with Persistent CRM Memory & WebSockets',
        'Natural Language SQL analytics Agent with Guardrails & Plotly visualizations',
        'Document Intelligence System utilizing advanced Hybrid Search & RAGAS'
      ],
      tools: [
        'Python', 'PyTorch', 'Hugging Face', 'OpenAI', 'Claude', 'Gemini', 'LangChain',
        'LangGraph', 'CrewAI', 'AutoGen', 'Pinecone', 'Chroma', 'AWS Bedrock',
        'SageMaker', 'ECR', 'EKS', 'LangSmith', 'Helicone', 'MCP', 'FastAPI', 'Streamlit'
      ],
      careers: [
        'Generative AI Engineer', 'Agentic Systems Developer', 'AI Prompt Architect',
        'AI Product Developer', 'LLMOps Engineer', 'AI Research Scientist'
      ]
    },
    {
      id: 'specialist',
      title: 'Data Analytics Specialist (DAS)',
      shortTitle: 'Data Analytics Specialist',
      tagline: 'Practical, hands-on path to master the core tools of modern Business Intelligence.',
      theme: 'orange',
      bulletPoints: [
        'SQL Server Database Management & Modeling',
        'Python Data Processing & NumPy/Pandas',
        'Advanced Excel, Pivot Tables & Power Query',
        'Excel Copilot & AI-Assisted Insights',
        'Power BI Interactive KPI Dashboards'
      ],
      duration: '4 Months',
      delivery: 'Live Online + Self-Paced Projects',

      overview: 'The Data Analytics Specialist Program is a practical, industry-oriented training program designed to equip graduates and working professionals with the most in-demand skills required for modern Data Analytics and Business Intelligence careers. It focuses on collecting, managing, analyzing, visualizing, and communicating business insights using SQL Server, Python, Excel AI, and Power BI.',
      modules: [
        {
          title: 'Module 1: Data Management',
          topics: [
            'SQL Server Database Fundamentals (Relational Modeling, Primary/Foreign keys, DDL/DML)',
            'SQL Server Programming (Filters, Grouping, Joins, Subqueries, CTEs, Window Functions, Views, Stored Procedures)',
            'Python Programming (Variables, Loops, Functions, OOP, File Handling, API calls, NumPy, Pandas)'
          ]
        },
        {
          title: 'Module 2: Data Analysis & Visualization',
          topics: [
            'Excel + AI (Formulas, Pivot Tables, Power Query, Dashboard Development, Excel Copilot AI analysis)',
            'Power BI (Data Connection, Modeling star/snowflake schemas, DAX Measures, Interactive KPI Dashboards, Publishing & Sharing)'
          ]
        }
      ],
      projects: [
        'Banking Analytics: Loan Portfolio & Credit Card usage dashboards',
        'Retail Analytics: Sales Performance & Product Performance dashboards',
        'E-Commerce Analytics: Product & Revenue Analysis dashboards',
        'Telecom Analytics: Customer Retention & Revenue reporting dashboards'
      ],
      tools: [
        'SQL Server', 'Python', 'Excel', 'Excel AI', 'Excel Copilot', 'Power BI',
        'Power BI Service', 'NumPy', 'Pandas'
      ],
      careers: [
        'Data Analyst', 'MIS Analyst', 'Reporting Analyst', 'Business Analyst',
        'Operations Analyst', 'Senior Data Analyst', 'BI Analyst', 'Analytics Consultant'
      ]
    },
    {
      id: 'apcs',
      title: 'Advanced Program in Cybersecurity & Forensics (APCF)',
      shortTitle: 'Cybersecurity & Forensics',
      tagline: 'Defend enterprise systems and cloud platforms with advanced threat detection, incident response, and auditing.',
      theme: 'teal',
      bulletPoints: [
        'Network Security, Cryptography & Threat Mitigation',
        'Ethical Hacking, Penetration Testing & Nessus Scans',
        'Security Operations Center (SOC) & SIEM Splunk Tools',
        'Cloud Security, AWS IAM & Compliance (GDPR/ISO)',
        'Real-world Defensive Labs & Incident Response'
      ],
      duration: '6 Months',
      delivery: 'Live Instructor-Led Online',

      overview: 'The Advanced Program in Industrial Cybersecurity (APIC) is an industry-driven program designed to build hands-on expertise in offensive and defensive security. Participants will learn how to identify vulnerabilities, deploy security controls, monitor events in real-time, and govern cloud security infrastructures using standard corporate toolsets.',
      modules: [
        {
          title: 'Module 1: Network Security & Cryptography',
          topics: [
            'Network Security Fundamentals (TCP/IP protocols, DNS security, firewalls, routers, switches)',
            'Cryptography & Encryption (Symmetric/Asymmetric encryption, SSL/TLS handshakes, public key infrastructure)',
            'Packet Analysis & Sniffing (Wireshark packet captures, network traffic troubleshooting, protocol analysis)'
          ]
        },
        {
          title: 'Module 2: Ethical Hacking & Penetration Testing',
          topics: [
            'Information Gathering & Reconnaissance (Footprinting, active scanning using Nmap)',
            'Vulnerability Assessment (Using Nessus scanners, identifying CVEs, risk scoring)',
            'System Hacking & Exploit execution (Metasploit framework, password cracking, privilege escalation)',
            'Web Application Security (OWASP Top 10 vulnerabilities, XSS, SQL injection, Burp Suite tools)'
          ]
        },
        {
          title: 'Module 3: Security Operations Center (SOC) & SIEM',
          topics: [
            'Security Information & Event Management (Splunk SIEM installation, search processing language, dashboards)',
            'Log Analysis & Event Correlation (Windows event logs, Syslog monitoring, detecting brute-force and anomalies)',
            'Incident Response & Playbooks (Identifying security alerts, containment strategies, post-incident reviews)'
          ]
        },
        {
          title: 'Module 4: Cloud Security & Governance',
          topics: [
            'AWS Cloud Security (Identity & Access Management, Security Groups, VPC Network ACLs, KMS Encryption)',
            'Governance, Risk & Compliance (Information security policies, GDPR, HIPAA, ISO 27001 auditing frameworks)',
            'Incident Reporting & Vulnerability management workflows'
          ]
        }
      ],
      projects: [
        'Enterprise Network Security Audit & Wireshark Threat Identification',
        'Vulnerability Assessment & Metasploit Penetration Audit on Staging Systems',
        'SIEM Dashboard Deployment & Real-Time Incident Logging in Splunk',
        'AWS Secure Multi-Tenant IAM Architecture Setup & ISO Compliance Auditing'
      ],
      tools: [
        'Wireshark', 'Nmap', 'Metasploit', 'Splunk', 'Nessus', 'Burp Suite',
        'Snort', 'AWS IAM', 'Linux Security Tools'
      ],
      careers: [
        'Cybersecurity Analyst', 'Ethical Hacker', 'SOC Analyst', 'Penetration Tester',
        'Cloud Security Engineer', 'Security Operations Engineer', 'InfoSec Auditor'
      ]
    }
  ];

  const slide = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const clientWidth = container.clientWidth;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="programs-section" id="courses">
      <div className="programs-section-header reveal-on-scroll">
        <div className="section-title-wrapper">
          <h2 className="section-title-divider">Our Training Program</h2>
        </div>
      </div>

      <div className="slider-outer-wrapper">
        <button className="side-slider-arrow prev" onClick={() => slide('left')} aria-label="Previous programs">
          <svg viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="slider-container">
          <div className="slider-track" ref={sliderRef}>
            {programs.map((program, idx) => (
              <ProgramCard 
                key={program.id} 
                program={program} 
                onViewDetails={onViewDetails} 
                index={idx}
              />
            ))}
          </div>
        </div>

        <button className="side-slider-arrow next" onClick={() => slide('right')} aria-label="Next programs">
          <svg viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

// Subcomponent representing an individual interactive program card
interface ProgramCardProps {
  program: Program;
  onViewDetails?: (courseId: string) => void;
  index: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onViewDetails, index }) => {
  const cardRef = useGlowCard();

  const glowColors = {
    blue: 'rgba(2, 132, 199, 0.12)',
    purple: 'rgba(124, 58, 237, 0.12)',
    indigo: 'rgba(79, 70, 229, 0.12)',
    magenta: 'rgba(219, 39, 119, 0.12)',
    orange: 'rgba(234, 88, 12, 0.12)',
    teal: 'rgba(13, 148, 136, 0.12)'
  };

  return (
    <div 
      className="program-card-wrapper reveal-on-scroll" 
      style={{ transitionDelay: `${0.05 * (index + 1)}s` }}
    >
      <div 
        ref={cardRef} 
        className={`program-card glow-card ${program.theme}`}
        style={{ '--glow-color': glowColors[program.theme] } as React.CSSProperties}
      >
        <div className="program-poster-container">
          <img 
            src={posterImages[program.id]} 
            alt={`${program.shortTitle} Poster`} 
            className="program-poster-img"
            loading="lazy"
          />
        </div>

        <button 
          className="view-details-btn" 
          onClick={() => onViewDetails && onViewDetails(program.id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};
