import React, { useEffect, useRef, useState } from 'react';
import { useGlowCard } from '../hooks/useGlowCard';
import { getPathFromPage } from '../utils/routes';

const posterImages: Record<string, string> = {
  apids: '/courses-poster/APIDS.png',
  apida: '/courses-poster/APIDA.png',
  specialist: '/courses-poster/DAS.png',
  apcs: '/courses-poster/APCF.png',
  fde: '/courses-poster/ai-forward-deployment-engineer.png',
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

type CourseTerm = 'long' | 'mid' | 'short';

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onViewDetails }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeTerm, setActiveTerm] = useState<CourseTerm>('long');

  const programs: Program[] = [
    {
      id: 'apids',
      title: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
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
      overview: 'The Advanced Program in Industrial Data Science with AI Deployment (APIDS) is a comprehensive industry-oriented training program designed to transform graduates and working professionals into highly skilled Data Science & AI practitioners.',
      modules: [
        {
          title: 'Module 1: Data Management',
          topics: ['SQL Server', 'Python Programming', 'SAS Base & Advanced', 'PySpark / Scala']
        },
        {
          title: 'Module 2: Data Analysis & Visualization',
          topics: ['Excel + AI', 'Power BI', 'Tableau']
        },
        {
          title: 'Module 3: Data Mining & AI',
          topics: ['Python Statistics', 'Machine Learning', 'Deep Learning', 'Generative AI', 'Agentic AI']
        },
        {
          title: 'Module 4: Cloud Deployment',
          topics: ['MLOps', 'LLMOps', 'AIOps']
        }
      ],
      projects: ['Banking Credit Risk', 'Telecom Churn', 'Retail Demand Forecasting', 'Insurance Fraud Detection'],
      tools: ['SQL Server', 'Python', 'SAS', 'PySpark', 'Power BI', 'Tableau', 'Excel AI', 'Scikit-Learn', 'TensorFlow', 'OpenAI', 'LangChain', 'AWS', 'Docker'],
      careers: ['Data Scientist', 'Machine Learning Engineer', 'AI Engineer', 'Analytics Consultant', 'AI Solution Architect']
    },
    {
      id: 'apida',
      title: 'Advanced Program in Industrial Data Science with Gen AI (APIDA)',
      shortTitle: 'Industrial Data Science with Gen AI',
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
      overview: 'The Advanced Program in Industrial Data Science with Gen AI (APIDA) is a specialized industry-focused program designed for graduates and working professionals who want to build expertise in Data Analytics, Business Intelligence, Machine Learning, and AI-driven Decision Making.',
      modules: [
        {
          title: 'Module 1: Data Management',
          topics: ['SQL Server', 'Python Programming', 'SAS Base & Advanced', 'PySpark / Scala']
        },
        {
          title: 'Module 2: Data Analysis & Visualization',
          topics: ['Excel + AI', 'Power BI', 'Tableau']
        },
        {
          title: 'Module 3: Data Mining & AI',
          topics: ['Python Statistics', 'Python Machine Learning', 'Model Evaluation']
        },
        {
          title: 'Module 4: Cloud Deployment',
          topics: ['MLOps Deployment']
        }
      ],
      projects: ['Banking Credit Risk', 'Telecom Churn', 'Retail Sales Dashboard', 'Healthcare Performance'],
      tools: ['SQL Server', 'Python', 'SAS', 'PySpark', 'Excel AI', 'Power BI', 'Tableau', 'NumPy', 'Pandas', 'Scikit-Learn', 'Docker'],
      careers: ['Data Analyst', 'Business Analyst', 'Reporting Analyst', 'BI Analyst', 'Associate Data Scientist']
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
      overview: 'The Data Analytics Specialist Program is a practical, industry-oriented training program designed to equip graduates and working professionals with the most in-demand skills required for modern Data Analytics and Business Intelligence careers.',
      modules: [
        {
          title: 'Module 1: Data Management',
          topics: ['SQL Server Database Fundamentals', 'SQL Server Programming', 'Python Programming']
        },
        {
          title: 'Module 2: Data Analysis & Visualization',
          topics: ['Excel + AI & Copilot', 'Power BI Dashboards & DAX']
        }
      ],
      projects: ['Banking Analytics', 'Retail Analytics', 'E-Commerce Analytics', 'Telecom Retention'],
      tools: ['SQL Server', 'Python', 'Excel AI', 'Power BI', 'NumPy', 'Pandas'],
      careers: ['Data Analyst', 'MIS Analyst', 'Reporting Analyst', 'Business Analyst', 'BI Analyst']
    },
    {
      id: 'apcs',
      title: 'AI Integrated Advanced Program in Cybersecurity & Forensics (APCF)',
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
      overview: 'The AI Integrated Advanced Program in Cybersecurity & Forensics (APCF) is an industry-driven program designed to build hands-on expertise in offensive and defensive security, incident response, and forensic investigations.',
      modules: [
        {
          title: 'Module 1: Network Security & Cryptography',
          topics: ['Network Security Fundamentals', 'Cryptography & Encryption', 'Packet Analysis & Wireshark']
        },
        {
          title: 'Module 2: Ethical Hacking & Penetration Testing',
          topics: ['Reconnaissance & Footprinting', 'Vulnerability Assessment (Nessus)', 'Metasploit Exploit Execution', 'Web Security OWASP Top 10']
        },
        {
          title: 'Module 3: SOC & SIEM',
          topics: ['Splunk SIEM', 'Log Analysis & Correlation', 'Incident Response Playbooks']
        },
        {
          title: 'Module 4: Cloud Security & Governance',
          topics: ['AWS Cloud Security', 'Governance, Risk & Compliance (ISO/GDPR)', 'Incident Reporting']
        }
      ],
      projects: ['Network Audit', 'Vulnerability Assessment', 'SIEM Splunk Deployment', 'AWS IAM Setup'],
      tools: ['Wireshark', 'Nmap', 'Metasploit', 'Splunk', 'Nessus', 'Burp Suite', 'AWS IAM', 'Linux Security'],
      careers: ['Cybersecurity Analyst', 'Ethical Hacker', 'SOC Analyst', 'Penetration Tester', 'Cloud Security Engineer']
    },
    {
      id: 'fde',
      title: 'AI Forward Deployment Engineer (FDE)',
      shortTitle: 'Forward Deployment Engineer',
      tagline: 'Architect and deploy production-grade AI systems, LLM pipelines, autonomous agents, and enterprise integrations.',
      theme: 'indigo',
      bulletPoints: [
        'Enterprise AI Architecture & System Design',
        'Autonomous Agents, LangGraph, CrewAI & AutoGen',
        'Production RAG, Vector Databases & Peft Fine-Tuning',
        'Model Context Protocol (MCP) & Agent Workflows',
        'Client-Facing Technical Engineering & Deployment'
      ],
      duration: '8 Months',
      delivery: 'Live Hybrid (Online + Client Simulation Labs)',
      overview: 'The AI Forward Deployment Engineer (FDE) program builds technical professionals who bridge advanced AI engineering and real-world enterprise delivery.',
      modules: [
        {
          title: 'Module 1: Enterprise AI System Design',
          topics: ['AI System Architecture', 'Scalable LLM APIs', 'API Integration & Middleware']
        },
        {
          title: 'Module 2: Autonomous Agentic AI Systems',
          topics: ['Multi-Agent Orchestration (CrewAI, LangGraph, AutoGen)', 'MCP Protocol & Agent Tooling']
        },
        {
          title: 'Module 3: Enterprise RAG & LLMOps',
          topics: ['Advanced RAG & Vector Databases', 'LLMOps, Guardrails & Cost Tracking']
        },
        {
          title: 'Module 4: Deployment & Delivery',
          topics: ['Docker, Kubernetes & CI/CD', 'Cloud Infrastructure (AWS)', 'Client-Facing AI Delivery']
        }
      ],
      projects: ['Autonomous Research Agent', 'Enterprise RAG System', 'End-to-End Deployed AI Service', 'Production LLM Guardrails'],
      tools: ['Python', 'LLM APIs', 'Vector Databases', 'LangChain', 'LangGraph', 'MCP', 'Docker', 'Kubernetes', 'AWS', 'GitHub Actions'],
      careers: ['Forward Deployment Engineer', 'AI Solutions Engineer', 'AI Engineer', 'Enterprise AI Consultant', 'LLMOps Engineer']
    }
  ];

  const termTabs: Array<{ id: CourseTerm; label: string }> = [
    { id: 'long', label: 'Long Term Course' },
    { id: 'mid', label: 'Mid Term Course' },
    { id: 'short', label: 'Short Term Course' },
  ];

  const programTerms: Record<string, CourseTerm> = {
    apids: 'long',
    apida: 'long',
    fde: 'long',
    specialist: 'short',
    apcs: 'mid',
  };

  const filteredPrograms = programs.filter((program) => programTerms[program.id] === activeTerm);

  useEffect(() => {
    sliderRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [activeTerm]);

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

      <div className="benefits-tab-switcher course-term-tabs reveal-on-scroll delay-1" role="tablist" aria-label="Course duration filters">
        {termTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTerm === tab.id}
            className={`tab-btn ${activeTerm === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTerm(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="slider-outer-wrapper">
        <button className="side-slider-arrow prev" onClick={() => slide('left')} aria-label="Previous programs">
          <svg viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="slider-container">
          <div className="slider-track" ref={sliderRef}>
            {filteredPrograms.map((program, idx) => (
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
    orange: 'rgba(239, 83, 35, 0.12)',
    teal: 'rgba(13, 148, 136, 0.12)'
  };

  return (
    <div 
      className="program-card-wrapper" 
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

        <a
          className="view-details-btn" 
          href={getPathFromPage(`course-${program.id}`)}
          onClick={(event) => {
            event.preventDefault();
            onViewDetails?.(program.id);
          }}
        >
          View Details
        </a>
      </div>
    </div>
  );
};
