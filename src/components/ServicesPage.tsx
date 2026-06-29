import React from 'react';

export const ServicesPage: React.FC = () => {
  const coreOfferings = [
    {
      title: "DV Analytics\nUniversity (DVU)",
      description: "Empowering everyone for the AI era, DVU delivers accessible, mentor-led learning in Data, AI, Generative AI, and Agentic AI for learners at every stage of life. Programs combine online and offline delivery, hands-on capstones, roadshows, and hackathons.",
      icon: (
        <svg viewBox="0 0 64 64" className="practice-card-icon" fill="none">
          <circle cx="32" cy="32" r="30" fill="url(#blue-grad-bg)" opacity="0.1" />
          <path d="M12 24L32 14L52 24L32 34L12 24Z" fill="url(#blue-grad)" />
          <path d="M50 25V39C50 39.5 49 40 47 40" stroke="url(#blue-grad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 33.5V41C20 45 25 47 32 47C39 47 44 45 44 41V33.5" stroke="url(#blue-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 41C22 41 26 43 32 43C38 43 42 41 42 41" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="blue-grad" x1="12" y1="14" x2="52" y2="47" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef5323" />
              <stop offset="100%" stopColor="#0066cc" />
            </linearGradient>
            <linearGradient id="blue-grad-bg" x1="2" y1="2" x2="62" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#ef5323" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      title: "DV Intelligence\nSolutions (DVIS)",
      description: "Intelligence at work, autonomy at scale, DVIS provides agentic AI SaaS products for banking and payments, embedding real-time and offline intelligence across risk, marketing, operations, and growth workflows to drive efficiency and revenue.",
      icon: (
        <svg viewBox="0 0 64 64" className="practice-card-icon" fill="none">
          <circle cx="32" cy="32" r="30" fill="url(#blue-grad-bg-2)" opacity="0.1" />
          <rect x="12" y="16" width="40" height="28" rx="3" stroke="url(#blue-grad-2)" strokeWidth="2.5" />
          <path d="M24 44V50H40V44" stroke="url(#blue-grad-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 50H44" stroke="url(#blue-grad-2)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="25" cy="27" r="4" stroke="url(#blue-grad-2)" strokeWidth="2" />
          <path d="M25 21V23M25 31V33M19 27H21M29 27H31" stroke="url(#blue-grad-2)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M38 34V24M43 34V28M48 34V20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="blue-grad-2" x1="12" y1="14" x2="52" y2="47" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef5323" />
              <stop offset="100%" stopColor="#0066cc" />
            </linearGradient>
            <linearGradient id="blue-grad-bg-2" x1="2" y1="2" x2="62" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#ef5323" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      title: "DV Advisory\nPractice (DVAP)",
      description: "Shaping strategy for autonomous agents, DVAP advises enterprises on AI platform architecture, agentic AI design, data monetisation, governance, and safe adoption to enable scalable, revenue-driven intelligence.",
      icon: (
        <svg viewBox="0 0 64 64" className="practice-card-icon" fill="none">
          <circle cx="32" cy="32" r="30" fill="url(#blue-grad-bg-3)" opacity="0.1" />
          <circle cx="26" cy="36" r="8" stroke="url(#blue-grad-3)" strokeWidth="2.5" />
          <path d="M26 25V28M26 44V47M15 36H18M34 36H37M18.5 28.5L20.5 30.5M31.5 41.5L33.5 43.5M18.5 43.5L20.5 41.5M31.5 30.5L33.5 28.5" stroke="url(#blue-grad-3)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="39" cy="27" r="5" stroke="#38bdf8" strokeWidth="2" />
          <path d="M22 44L34 32L40 38L52 24" stroke="url(#blue-grad-3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 24H52V32" stroke="url(#blue-grad-3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          <defs>
            <linearGradient id="blue-grad-3" x1="12" y1="14" x2="52" y2="47" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef5323" />
              <stop offset="100%" stopColor="#0066cc" />
            </linearGradient>
            <linearGradient id="blue-grad-bg-3" x1="2" y1="2" x2="62" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#ef5323" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      title: "Agentic Economic\nIntelligence & Policy\nPractice (AEIPP)",
      description: "Intelligence for the digital-era policymaker. AEIPP supports governments and central banks with data-driven insights on digital economies, trade flows, macroeconomic forecasting, and policy simulation for informed decision-making.",
      icon: (
        <svg viewBox="0 0 64 64" className="practice-card-icon" fill="none">
          <circle cx="32" cy="32" r="30" fill="url(#blue-grad-bg-4)" opacity="0.1" />
          <path d="M12 28L32 16L52 28" stroke="url(#blue-grad-4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 28H48" stroke="url(#blue-grad-4)" strokeWidth="2" strokeLinecap="round" />
          <rect x="18" y="28" width="4" height="14" fill="url(#blue-grad-4)" />
          <rect x="26" y="28" width="4" height="14" fill="url(#blue-grad-4)" />
          <rect x="34" y="28" width="4" height="14" fill="url(#blue-grad-4)" />
          <rect x="42" y="28" width="4" height="14" fill="url(#blue-grad-4)" />
          <path d="M14 42H50" stroke="url(#blue-grad-4)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 46H54" stroke="url(#blue-grad-4)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 22L44 14L52 18" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          
          <defs>
            <linearGradient id="blue-grad-4" x1="12" y1="14" x2="52" y2="47" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef5323" />
              <stop offset="100%" stopColor="#0066cc" />
            </linearGradient>
            <linearGradient id="blue-grad-bg-4" x1="2" y1="2" x2="62" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#ef5323" />
            </linearGradient>
          </defs>
        </svg>
      )
    }
  ];

  const enterpriseSolutions = [
    {
      title: 'Generative AI Solutions',
      description: 'Generative AI enables enterprises to automate content creation, proposal writing, report generation, documentation, and intelligent copilots. These solutions significantly improve employee productivity, reduce manual effort, accelerate business processes, enhance creativity, and empower teams with AI-assisted decision-making and knowledge generation capabilities.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      theme: 'magenta'
    },
    {
      title: 'AI-Powered Customer Service',
      description: 'Leverage AI chatbots, voice agents, WhatsApp automation, email automation, multilingual support, and intelligent ticket routing to deliver seamless customer experiences. Organizations can provide 24x7 assistance, resolve queries faster, reduce support costs by 60–80%, improve customer satisfaction, and ensure consistent service quality across multiple communication channels.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      ),
      theme: 'blue'
    },
    {
      title: 'Sales & Marketing AI',
      description: 'AI-driven sales and marketing solutions help businesses identify high-potential leads, segment customers, personalize campaigns, predict churn, and optimize marketing investments. By using predictive analytics and AI assistants, organizations improve conversion rates, increase customer engagement, maximize marketing ROI, and strengthen customer retention and loyalty strategies.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      theme: 'purple'
    },
    {
      title: 'Enterprise Knowledge Assistant',
      description: 'An AI-powered knowledge assistant acts as an internal ChatGPT for employees, enabling instant access to documents, policies, SOPs, HR information, and legal contracts. Employees spend less time searching for information, improve productivity, accelerate decision-making, and ensure knowledge is accessible across departments from a single intelligent platform.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      theme: 'indigo'
    },
    {
      title: 'AI-Powered HR Solutions',
      description: 'Transform human resource operations using AI for resume screening, interview scheduling, employee sentiment analysis, learning recommendations, and performance management. These solutions reduce hiring timelines, improve talent acquisition, enhance employee engagement, identify skill gaps, and support data-driven workforce planning and organizational growth initiatives.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      theme: 'magenta'
    },
    {
      title: 'Finance & Risk Analytics',
      description: 'AI-driven finance and risk solutions help organizations detect fraud, assess creditworthiness, optimize collections, forecast revenues, and identify revenue leakages. Widely adopted across banking, insurance, NBFCs, and fintech sectors, these solutions strengthen risk management, improve financial performance, reduce losses, and ensure regulatory compliance.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
      theme: 'orange'
    },
    {
      title: 'Supply Chain AI',
      description: 'Enhance supply chain efficiency with AI-powered demand forecasting, inventory optimization, route planning, warehouse analytics, and procurement intelligence. Organizations can reduce inventory costs, minimize stockouts, optimize logistics operations, improve supplier management, and make data-driven decisions that increase overall operational efficiency and profitability.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      theme: 'teal'
    },
    {
      title: 'Healthcare AI',
      description: 'Healthcare AI solutions support patient risk prediction, claims analytics, medical report summarization, healthcare chatbots, and clinical decision support systems. These technologies improve patient outcomes, reduce administrative burdens, accelerate diagnosis, enhance healthcare accessibility, and enable healthcare providers to deliver more efficient and personalized care.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      theme: 'blue'
    },
    {
      title: 'Cybersecurity AI',
      description: 'AI-powered cybersecurity solutions provide proactive threat detection, continuous security monitoring, incident response automation, fraud investigation, and cyber forensics. Organizations strengthen their security posture, reduce response times, identify vulnerabilities quickly, prevent cyberattacks, and protect critical business assets from evolving digital threats.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      theme: 'teal'
    }
  ];

  const agenticSolutions = [
    {
      role: 'Sales Agent',
      desc: 'An autonomous AI Sales Agent manages lead qualification, follow-ups, appointment scheduling, and CRM updates. It engages prospects, nurtures leads, tracks interactions, and supports sales teams by automating repetitive tasks, enabling faster conversions and improved sales productivity.',
      theme: 'blue'
    },
    {
      role: 'Student Relationship Agent',
      desc: 'The Student Relationship Agent automates student engagement through calls, feedback collection, attendance monitoring, academic progress tracking, and placement follow-ups. Educational institutions improve student satisfaction, proactively address concerns, strengthen relationships, and enhance overall learning outcomes and placement success.',
      theme: 'purple'
    },
    {
      role: 'Collections Agent',
      desc: 'An AI Collections Agent automates EMI reminders, payment follow-ups, recovery communications, and negotiation workflows. It improves collection efficiency, reduces delinquency rates, enhances customer engagement, increases recovery performance, and enables financial institutions to manage large portfolios effectively.',
      theme: 'orange'
    },
    {
      role: 'HR Agent',
      desc: 'The HR Agent assists organizations with candidate screening, interview coordination, employee support, onboarding, and HR query management. By automating routine HR operations, organizations improve employee experience, reduce administrative workloads, and allow HR teams to focus on strategic initiatives.',
      theme: 'magenta'
    },
    {
      role: 'Customer Success Agent',
      desc: 'A Customer Success Agent proactively manages complaints, service requests, issue resolution, and customer retention initiatives. It continuously monitors customer interactions, identifies risks, improves customer satisfaction, and helps organizations build stronger long-term customer relationships.',
      theme: 'teal'
    }
  ];

  const techStack = [
    {
      layer: 'Operations Layer',
      tools: 'MLOps, LLMOps, AIOps',
      desc: 'Provides governance, monitoring, deployment automation, and lifecycle management for AI systems. These practices ensure model reliability, compliance, and performance optimization.',
      color: '#25316d'
    },
    {
      layer: 'Deployment Layer',
      tools: 'AWS, Azure, GCP, Docker, Kubernetes',
      desc: 'Cloud and container technologies that provide scalability, security, flexibility, and high availability for scalable enterprise-scale workloads.',
      color: '#ef5323'
    },
    {
      layer: 'Agentic AI Layer',
      tools: 'Multi-Agent Systems, AI Assistants, AI Copilots',
      desc: 'Introduces autonomous systems capable of decision-making, workflow execution, collaboration, and task completion.',
      color: '#25316d'
    },
    {
      layer: 'AI Layer',
      tools: 'Python, Machine Learning, Deep Learning, NLP, Generative AI',
      desc: 'Enables predictive analytics, intelligent automation, recommendation systems, language understanding, and advanced AI-powered applications.',
      color: '#ef5323'
    },
    {
      layer: 'Analytics Layer',
      tools: 'Excel + AI, Power BI, Tableau',
      desc: 'Transforms raw data into actionable insights through interactive dashboards, reports, and self-service visualizations.',
      color: '#25316d'
    },
    {
      layer: 'Data Layer',
      tools: 'SQL Server, PostgreSQL, MySQL, Snowflake, Databricks',
      desc: 'Robust data platforms that collect, store, process, and manage structured and unstructured data securely across environments.',
      color: '#ef5323'
    }
  ];

  const consultingServices = [
    {
      title: 'Consulting',
      desc: 'DV Analytics helps organizations define AI strategies, identify high-impact use cases, develop transformation roadmaps, and establish AI governance frameworks. This ensures businesses adopt AI systematically, align initiatives with objectives, and maximize return on AI investments.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    },
    {
      title: 'Development',
      desc: 'Our development services include custom AI applications, enterprise chatbots, AI agents, predictive analytics solutions, and intelligent automation systems. We build scalable, secure, and business-focused AI platforms tailored to industry-specific requirements.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      title: 'Training',
      desc: 'DV Analytics offers Enterprise AI Upskilling Programs, Generative AI Workshops, Agentic AI Training, and Leadership AI Programs. These initiatives help organizations build AI-ready workforces through practical, industry-focused learning.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      )
    },
    {
      title: 'Support',
      desc: 'Our AI support services include model monitoring, performance optimization, AI operations management, and managed AI services. We ensure enterprise AI systems remain reliable, secure, and aligned with evolving requirements.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    }
  ];

  const industries = [
    'Banking & Financial Services',
    'Insurance',
    'Healthcare',
    'Retail & E-Commerce',
    'Telecom',
    'Manufacturing',
    'Education & EdTech',
    'Logistics & Supply Chain',
    'Government',
    'Energy & Utilities'
  ];

  return (
    <div className="services-page-wrapper">
      {/* 1. Services Vision Header */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="container services-hero-content text-center">
          <span className="services-subtitle">Services & Capabilities</span>
          <h1 className="services-title">Enterprise AI & Consulting</h1>
          <div className="vision-quote-card">
            <svg viewBox="0 0 24 24" className="quote-icon-top">
              <path d="M3 21h3a3 3 0 0 0 3-3v-5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V3H5a5 5 0 0 0-5 5v3a5 5 0 0 0 5 5h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3zm11 0h3a3 3 0 0 0 3-3v-5h-4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V3h-4a5 5 0 0 0-5 5v3a5 5 0 0 0 5 5h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3z" fill="currentColor"/>
            </svg>
            <p className="vision-text">
              "Transforming Enterprises through Data, AI, Generative AI, and Agentic AI to drive intelligent automation, operational excellence, innovation, and sustainable business growth while empowering organizations to achieve measurable outcomes, competitive advantage, and future-ready digital transformation."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Practices Section */}
      <section className="practices-section">
        <div className="container">
          <div className="practices-grid">
            {coreOfferings.map((offering, idx) => (
              <div key={idx} className="practice-card">
                {offering.icon}
                <h3 className="practice-card-title">{offering.title}</h3>
                <p className="practice-card-desc">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Enterprise AI Solutions Grid */}
      <section className="services-section container">
        <div className="section-header text-center">
          <span className="section-subtitle">Scalable Applications</span>
          <h2>Enterprise AI Solutions</h2>
          <div className="title-underline center"></div>
          <p className="section-desc-para">
            Deploy intelligent systems to automate workflows, extract departmental knowledge, and streamline industry operations.
          </p>
        </div>

        <div className="enterprise-solutions-grid">
          {enterpriseSolutions.map((sol, idx) => (
            <div key={idx} className={`sol-card border-accent-${sol.theme}`}>
              <div className="sol-card-header">
                <div className={`sol-icon-wrapper bg-${sol.theme}`}>
                  {sol.icon}
                </div>
                <h3>{sol.title}</h3>
              </div>
              <p>{sol.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DV Analytics Solutions */}
      <section className="services-section agentic-solutions-bg">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Autonomous Decision Making</span>
            <h2 style={{ color: '#ffffff' }}>DV Analytics Solutions</h2>
            <div className="title-underline center" style={{ backgroundColor: '#ef5323' }}></div>
            <p className="section-desc-para" style={{ color: '#cbd5e1' }}>
              Empower your workflows with goal-oriented, cooperative multi-agent teams that coordinate action and execute processes autonomously.
            </p>
          </div>

          <div className="agentic-grid">
            {agenticSolutions.map((sol, idx) => (
              <div key={idx} className="agentic-card">
                <div className={`agentic-badge-accent bg-${sol.theme}`}></div>
                <h3>{sol.role}</h3>
                <p>{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Enterprise AI Technology Stack */}
      <section className="services-section container">
        <div className="section-header text-center">
          <span className="section-subtitle">Architecture Layers</span>
          <h2>Enterprise AI Technology Stack</h2>
          <div className="title-underline center"></div>
          <p className="section-desc-para">
            A modular and secure blueprint designed to support reliable, fast, and high-performance AI deployments.
          </p>
        </div>

        <div className="tech-stack-container">
          {techStack.map((layer, idx) => (
            <div key={idx} className="stack-layer-bar" style={{ '--layer-border': layer.color } as React.CSSProperties}>
              <div className="layer-header-col">
                <span className="layer-pill" style={{ backgroundColor: layer.color }}>{layer.layer}</span>
                <h4 className="layer-tools">{layer.tools}</h4>
              </div>
              <p className="layer-desc">{layer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Consulting & Upskilling Services */}
      <section className="services-section services-consulting-bg">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Transformation Partners</span>
            <h2>AI Consulting & Advisory Services</h2>
            <div className="title-underline center"></div>
            <p className="section-desc-para" style={{ color: '#cbd5e1' }}>
              Advising enterprise leadership on strategic AI roadmaps, custom application development, and practical employee upskilling.
            </p>
          </div>

          <div className="consulting-grid">
            {consultingServices.map((service, idx) => (
              <div key={idx} className="consulting-card">
                <div className="consulting-header">
                  <div className="consulting-icon">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Target Industries & Sectors */}
      <section className="services-section container text-center">
        <div className="section-header">
          <span className="section-subtitle">Sectors Served</span>
          <h2>Target Industries</h2>
          <div className="title-underline center"></div>
          <p className="section-desc-para">
            Delivering measurable AI business outcomes and operational excellence across global sectors.
          </p>
        </div>

        <div className="industries-flex-wrap">
          {industries.map((ind, idx) => (
            <span key={idx} className="industry-tag-pill">
              {ind}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
};
