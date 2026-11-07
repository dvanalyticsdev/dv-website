import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './RoadmapContent.css';

interface RoadmapStep {
  stepNum: string;
  stepTag: string;
  badgeTheme: 'red' | 'navy';
  title: string;
  keyTech: string;
  description: string;
  importance: string[];
}

const dataScientistRoadmapSteps: RoadmapStep[] = [
  {
    stepNum: '01',
    stepTag: 'Step 1: Foundation',
    badgeTheme: 'red',
    title: 'Foundation – Data Management, Analysis & Visualisation',
    keyTech: 'SQL, Python, SAS, Excel, AI, Power BI and Tableau.',
    description:
      'Start your Data Science journey by learning the fundamentals of data management and analysis. Understand how to collect, clean, organise and analyse data using SQL, Python, SAS and Excel. Learn to create meaningful reports and visualise data using Power BI and Tableau.',
    importance: [
      'Builds a strong foundation in data handling and management.',
      'Helps improve data accuracy and efficiency.',
      'Develops essential skills for data analysis and reporting.',
      'Builds confidence to progress towards advanced AI and Data Science topics.',
    ],
  },
  {
    stepNum: '02',
    stepTag: 'Step 2: Base to Advanced',
    badgeTheme: 'red',
    title: 'Base to Advanced – Data Mining & AI',
    keyTech: 'Python Statistics, Python Machine Learning, Deep Learning, NLP, Generative AI and Agentic AI.',
    description:
      'Develop advanced technical skills by exploring data mining, statistical analysis and Artificial Intelligence. Learn Python-based Machine Learning, Deep Learning and Natural Language Processing (NLP). Explore Generative AI and Agentic AI to extract meaningful insights, build intelligent models and develop AI-powered solutions.',
    importance: [
      'Helps transform raw data into meaningful insights.',
      'Supports prediction, automation and data-driven decision-making.',
      'Develops practical knowledge of modern AI technologies.',
      'Creates opportunities in advanced technology and AI-related careers.',
    ],
  },
  {
    stepNum: '03',
    stepTag: 'Step 3: Expert Level',
    badgeTheme: 'navy',
    title: 'Expert Level – Data Engineering & AI Deployment',
    keyTech: 'MLOps, LLMOps, AIOps and Cloud Computing.',
    description:
      'Learn how to build scalable data pipelines and deploy AI models into real-world production environments. Understand MLOps, LLMOps and AIOps to manage, monitor and maintain AI models and applications. Gain knowledge of cloud computing to develop scalable and reliable AI solutions.',
    importance: [
      'Bridges the gap between AI model development and real-world implementation.',
      'Helps ensure scalability, reliability and continuous improvement.',
      'Develops practical knowledge of AI deployment and cloud technologies.',
      'Builds skills relevant to emerging Data Science and AI engineering roles.',
    ],
  },
];

const cyberSecurityRoadmapSteps: RoadmapStep[] = [
  {
    stepNum: '01',
    stepTag: 'Step 1: Foundation',
    badgeTheme: 'navy',
    title: 'Core Concepts & IT Basics',
    keyTech: 'Networking Basics (TCP/IP, DNS, HTTP), Operating Systems (Windows, Linux), Basic Scripting (Bash, Python).',
    description:
      'Build a rock-solid understanding of computer networks, system internals, protocols, and fundamental scripting tools essential for defensive and offensive security operations.',
    importance: [
      'Provides the non-negotiable bedrock for all cybersecurity disciplines.',
      'Enables you to identify abnormalities in network packets and system logs.',
      'Prepares you for ethical hacking and threat investigations.',
    ],
  },
  {
    stepNum: '02',
    stepTag: 'Step 2: Applied Security',
    badgeTheme: 'red',
    title: 'Defensive, Offensive & Threat Intelligence',
    keyTech: 'Security Operations (SOC), SIEM (Splunk), Ethical Hacking (Nmap, Metasploit, Burp Suite), Vulnerability Scanning.',
    description:
      'Master the tools and frameworks used by enterprise blue teams and penetration testers to discover vulnerabilities, investigate active threats, and analyze malware incidents.',
    importance: [
      'Simulates real-world cyber attack and defense workflows.',
      'Develops high-demand hands-on skills in SOC analysis and vulnerability assessment.',
      'Empowers you to safeguard enterprise cloud and on-prem infrastructures.',
    ],
  },
  {
    stepNum: '03',
    stepTag: 'Step 3: Expert Level',
    badgeTheme: 'navy',
    title: 'Governance, Architecture & Incident Response',
    keyTech: 'Governance, Risk & Compliance (GRC), Cloud Security Architecture (AWS IAM), Digital Forensics & Incident Response (DFIR).',
    description:
      'Scale up to enterprise security architecture, regulatory compliance, zero-trust frameworks, cloud security hardening, and digital forensics evidence handling.',
    importance: [
      'Opens doors to high-paying cybersecurity engineering and consultant careers.',
      'Prepares you for industry-recognized global certifications.',
      'Equips you with strategic decision-making and incident leadership capabilities.',
    ],
  },
];

export const RoadmapSection: React.FC = () => {
  const [activeRoadmap, setActiveRoadmap] = useState<'ds' | 'cyber'>('ds');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = activeRoadmap === 'ds' ? dataScientistRoadmapSteps : cyberSecurityRoadmapSteps;
  const sideImage = activeRoadmap === 'ds' ? '/data-scientist-roadmap.png' : '/cyber-security-roadmap.png';

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section className="roadmap-section reveal-on-scroll" id="roadmap">
      <div className="roadmap-container">
        {/* Title Header */}
        <div className="programs-section-header">
          <div className="section-title-wrapper">
            <h2 className="section-title-divider">
              Roadmap to Becoming a Data Scientist
            </h2>
          </div>
        </div>

        {/* Buttons to switch between roadmaps */}
        <div className="roadmap-buttons-container">
          <button
            type="button"
            className={`roadmap-btn ${activeRoadmap === 'ds' ? 'active' : ''}`}
            onClick={() => {
              setActiveRoadmap('ds');
              setExpandedStep(null);
            }}
          >
            Data Scientist Roadmap
          </button>
          <button
            type="button"
            className={`roadmap-btn ${activeRoadmap === 'cyber' ? 'active' : ''}`}
            onClick={() => {
              setActiveRoadmap('cyber');
              setExpandedStep(null);
            }}
          >
            Cyber Security Roadmap
          </button>
        </div>

        {/* Main Header */}
        <div className="roadmap-main-header">
          <h3 className="roadmap-main-title">
            <span className="title-lead">ROAD MAP FOR A</span>
            <span className="title-primary">
              {activeRoadmap === 'ds' ? 'DATA' : 'CYBERSECURITY'}
            </span>
            <span className="title-accent">
              {activeRoadmap === 'ds' ? 'SCIENTIST' : 'SPECIALIST'}
            </span>
          </h3>
          <span className="roadmap-main-subtitle">
            A Step-by-Step Learning Journey from Fundamentals to Advanced Expertise
          </span>
        </div>

        {/* 2-Column Split: Accordion Steps on Left, Road Illustration on Right */}
        <div className="roadmap-split-layout">
          <div className="roadmap-steps-accordion">
            {steps.map((step, idx) => {
              const isExpanded = expandedStep === idx;
              return (
                <div
                  key={`${activeRoadmap}-${step.stepNum}`}
                  className={`roadmap-accordion-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                >
                  <button
                    type="button"
                    className="roadmap-step-header-btn"
                    onClick={() => toggleStep(idx)}
                    aria-expanded={isExpanded}
                    aria-controls={`roadmap-step-body-${idx}`}
                  >
                    <div className={`roadmap-step-badge-indicator badge-${step.badgeTheme}`}>
                      <span className="step-badge-num">{step.stepNum}</span>
                    </div>

                    <div className="roadmap-step-header-text">
                      <span className="roadmap-step-tag-pill">{step.stepTag}</span>
                      <h4 className="roadmap-step-title">{step.title}</h4>
                    </div>

                    <div className={`roadmap-step-chevron ${isExpanded ? 'rotated' : ''}`} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  <div
                    id={`roadmap-step-body-${idx}`}
                    className={`roadmap-step-body ${isExpanded ? 'open' : 'closed'}`}
                  >
                    <div className="roadmap-step-body-inner">
                      <div className="roadmap-step-tech-box">
                        <span className="tech-box-label">Key Technologies:</span>
                        <p className="tech-box-text">{step.keyTech}</p>
                      </div>

                      <p className="roadmap-step-description">{step.description}</p>

                      <div className="roadmap-step-importance-box">
                        <h5 className="roadmap-importance-heading">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          Why Is This Important?
                        </h5>
                        <ul className="roadmap-importance-list">
                          {step.importance.map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="roadmap-image-column">
            <div
              className="roadmap-image-card"
              role="button"
              tabIndex={0}
              onClick={() => setIsModalOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              aria-label="Click to enlarge roadmap image"
            >
              <div className="roadmap-zoom-hint" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Click to view full size</span>
              </div>
              <img
                src={sideImage}
                alt={`${activeRoadmap === 'ds' ? 'Data Scientist' : 'Cybersecurity'} Roadmap Illustration`}
                className="roadmap-side-illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Image Lightbox Modal Portal */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="roadmap-lightbox-backdrop"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Roadmap Image View"
        >
          <button
            type="button"
            className="roadmap-lightbox-close"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close roadmap modal"
          >
            ✕
          </button>
          <div
            className="roadmap-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={sideImage}
              alt={`${activeRoadmap === 'ds' ? 'Data Scientist' : 'Cybersecurity'} Roadmap Illustration Enlarged`}
              className="roadmap-lightbox-img"
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
