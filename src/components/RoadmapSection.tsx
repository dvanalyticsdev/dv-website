import React, { useState } from 'react';
import './RoadmapContent.css';

interface StepData {
  stepNum: string;
  stepTag: string;
  badgeTheme: 'red' | 'navy';
  badgeIcon: React.ReactNode;
  topics: {
    title: string;
    subskills?: string;
    bullets?: string[];
    description?: string;
    isRedTitle?: boolean;
  }[];
  importance: string[];
}

const dataScientistSteps: StepData[] = [
  {
    stepNum: '01',
    stepTag: 'Foundation Step',
    badgeTheme: 'red',
    badgeIcon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    topics: [
      {
        title: 'Data Management',
        subskills: 'SQL, Python, SAS',
        isRedTitle: true,
      },
      {
        title: 'Data Analysis & Visualization',
        subskills: 'Excel + AI, Power BI & Tableau',
        description: 'Learn to collect, clean, organize, analyze and visualize data to uncover meaningful insights.',
        isRedTitle: true,
      },
    ],
    importance: [
      'Strong foundation ensures accuracy and efficiency.',
      'Essential skills for data handling and reporting.',
      'Builds confidence to move to advanced AI topics.',
    ],
  },
  {
    stepNum: '02',
    stepTag: 'Base to Advance Step',
    badgeTheme: 'red',
    badgeIcon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.08 6.25 5 7.42V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.58c2.92-1.17 5-4.05 5-7.42a8 8 0 0 0-8-8z" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
        <path d="M10 13a2 2 0 0 0 4 0" />
      </svg>
    ),
    topics: [
      {
        title: 'Data Mining + AI',
        subskills: 'Python Statistics, Python Machine Learning, Deep Learning, NLP, Gen AI, Agentic AI',
        description: 'Apply advanced AI techniques to extract insights, build intelligent models, and create AI-powered solutions.',
        isRedTitle: true,
      },
    ],
    importance: [
      'Core of data science - turns data into intelligence.',
      'Powers prediction, automation, and decision-making.',
      'AI skills open doors to high-value careers and innovations.',
    ],
  },
  {
    stepNum: '03',
    stepTag: 'Expert Step',
    badgeTheme: 'navy',
    badgeIcon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
        <path d="M18 10v4" />
      </svg>
    ),
    topics: [
      {
        title: 'Data Engineering + AI',
        subskills: 'Deployment (MLOps, LLMOps, AIOps) and Cloud Computing',
        description: 'Build scalable data pipelines, deploy AI models, and manage them in production using MLOps, LLMOps, and AIOps on cloud platforms.',
        isRedTitle: false,
      },
    ],
    importance: [
      'Bridges the gap between models and real-world impact.',
      'Ensures scalability, reliability, and continuous improvement.',
      'High demand skillset for future-ready data scientists.',
    ],
  },
];

const cyberSecuritySteps: StepData[] = [
  {
    stepNum: '01',
    stepTag: 'Foundation Step',
    badgeTheme: 'navy',
    badgeIcon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    topics: [
      {
        title: 'Core Concepts & IT Basics',
        bullets: [
          'Networking Basics (TCP/IP, DNS, HTTP)',
          'Operating Systems (Windows, Linux)',
          'Fundamentals of Information Security',
          'Cryptography Basics',
        ],
        description: 'Build a strong foundation in IT and security fundamentals.',
      },
    ],
    importance: [
      'Helps you understand how systems and networks work.',
      'Essential for identifying threats and vulnerabilities.',
      'Builds the base for advanced cybersecurity skills.',
    ],
  },
  {
    stepNum: '02',
    stepTag: 'Intermediate Step',
    badgeTheme: 'red',
    badgeIcon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    topics: [
      {
        title: 'Security Skills & Operations',
        bullets: [
          'Network Security & Firewalls',
          'System & Application Security',
          'Vulnerability Assessment & Penetration Testing',
          'SIEM Tools (Splunk, ELK) & Log Analysis',
        ],
        description: 'Learn to find vulnerabilities, analyze threats & secure systems.',
        isRedTitle: true,
      },
    ],
    importance: [
      'Prepares you to detect, analyze and respond to cyber threats.',
      'Penetration testing skills are in high industry demand.',
      'Builds practical hands-on expertise.',
    ],
  },
  {
    stepNum: '03',
    stepTag: 'Advanced Step',
    badgeTheme: 'navy',
    badgeIcon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    topics: [
      {
        title: 'Advanced Security & Specialization',
        bullets: [
          'Ethical Hacking & Exploitation',
          'Digital Forensics & Incident Response',
          'Threat Intelligence',
          'Cloud Security (AWS, Azure, GCP)',
          'Security Automation & Scripting (Python, Bash)',
        ],
        description: 'Master advanced techniques and real-world attack & defense strategies.',
      },
    ],
    importance: [
      'Helps you handle real-world cyber attacks.',
      'Strengthens incident response and threat hunting skills.',
      'Makes you job-ready for advanced roles.',
    ],
  },
  {
    stepNum: '04',
    stepTag: 'Expert Step',
    badgeTheme: 'red',
    badgeIcon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    topics: [
      {
        title: 'Expertise & Career Readiness',
        bullets: [
          'Governance, Risk & Compliance (GRC)',
          'Security Architecture & Zero Trust',
          'SOC Operations & Threat Hunting',
          'Certifications (Security+, CEH, CISSP, OSCP etc.)',
        ],
        description: 'Specialize, get certified and prepare for leadership.',
        isRedTitle: true,
      },
    ],
    importance: [
      'Opens doors to high-paying cybersecurity careers.',
      'Certifications validate your skills globally.',
      'Prepares you for leadership and strategic roles.',
    ],
  },
];

export const RoadmapSection: React.FC = () => {
  const [activeRoadmap, setActiveRoadmap] = useState<'ds' | 'cyber'>('ds');

  const currentSteps = activeRoadmap === 'ds' ? dataScientistSteps : cyberSecuritySteps;

  return (
    <section className="roadmap-section reveal-on-scroll" id="roadmap">
      <div className="roadmap-container">
        {/* Title Header */}
        <div className="programs-section-header">
          <div className="section-title-wrapper">
            <h2 className="section-title-divider">
              A Complete Road Map for Data Scientists and Cyber Specialist
            </h2>
          </div>
        </div>

        {/* Buttons to switch between roadmaps */}
        <div className="roadmap-buttons-container">
          <button
            className={`roadmap-btn ${activeRoadmap === 'ds' ? 'active' : ''}`}
            onClick={() => setActiveRoadmap('ds')}
          >
            Data Scientist Roadmap
          </button>
          <button
            className={`roadmap-btn ${activeRoadmap === 'cyber' ? 'active' : ''}`}
            onClick={() => setActiveRoadmap('cyber')}
          >
            Cyber Security Roadmap
          </button>
        </div>

        {/* Live CSS & Text Content Display area */}
        <div className="roadmap-interactive-wrapper">
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
              A Step-By-Step Journey From Foundations To Expertise
            </span>
          </div>

          <div className="roadmap-steps-flow">
            {currentSteps.map((step) => (
              <div key={`${activeRoadmap}-${step.stepNum}`} className="roadmap-step-card">
                {/* Left Badge Column */}
                <div className={`roadmap-step-badge-col badge-${step.badgeTheme}`}>
                  <span className="roadmap-step-tag">{step.stepTag}</span>
                  <span className="roadmap-step-num">{step.stepNum}</span>
                  <div className="roadmap-step-badge-icon" aria-hidden="true">
                    {step.badgeIcon}
                  </div>
                </div>

                {/* Middle Content Column */}
                <div className="roadmap-step-main-col">
                  {step.topics.map((t, idx) => (
                    <div key={idx} className="roadmap-topic-group">
                      <h4
                        className={`roadmap-topic-title ${t.isRedTitle ? 'highlight-red' : ''}`}
                      >
                        {t.title}
                      </h4>
                      {t.subskills && (
                        <p className="roadmap-topic-subskills">{t.subskills}</p>
                      )}
                      {t.bullets && (
                        <ul className="roadmap-topic-bullets">
                          {t.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      )}
                      {t.description && (
                        <p className="roadmap-topic-desc">{t.description}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Right Importance Column */}
                <div className="roadmap-step-importance-col">
                  <h5 className="roadmap-importance-heading">
                    <svg viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    IMPORTANCE
                  </h5>
                  <ul className="roadmap-importance-list">
                    {step.importance.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
