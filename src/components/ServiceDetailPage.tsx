import React, { useEffect } from 'react';

interface ServiceDetailPageProps {
  serviceId: string;
  onBackHome: () => void;
  onNavigate: (page: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onBackHome, onNavigate }) => {
  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Content definitions matching the document
  const servicesContent: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    accent: string;
    expertise?: { title: string; desc: string; icon: React.ReactNode }[];
    techStack?: { category: string; desc: string; tools: string }[];
    benefits?: string[];
  }> = {
    'aics': {
      title: 'AI Consulting Solutions',
      subtitle: 'End-to-End Enterprise AI Strategy & Solution Delivery',
      accent: 'teal',
      description: 'DV Analytics delivers end-to-end Data Science, Artificial Intelligence, Generative AI, and Agentic AI consulting services that help organizations transform data into strategic business value. Our consulting approach combines domain expertise, advanced analytics, machine learning, cloud deployment, and AI automation to solve complex business challenges across multiple industries.\n\nWe specialize in designing and implementing intelligent solutions for Banking & Financial Services, Telecom, Retail, Healthcare, Insurance, and E-Commerce. Every engagement begins with understanding business objectives, followed by data collection, data engineering, exploratory analysis, feature engineering, predictive and prescriptive model development, AI solution design, validation, deployment, monitoring, and continuous optimization using MLOps, LLMOps, and AIOps practices.\n\nOur solutions include credit risk analytics, fraud detection, customer segmentation, churn prediction, recommendation engines, demand forecasting, claims analytics, patient risk prediction, operational dashboards, enterprise AI assistants, and intelligent business automation powered by Generative AI and Agentic AI.\n\nLeveraging technologies such as SQL, Python, PySpark, SAS, Power BI, Tableau, AWS, Microsoft Azure, and Google Cloud Platform, DV Analytics develops scalable, secure, and production-ready AI solutions. Our consulting methodology enables organizations to improve operational efficiency, enhance customer experiences, reduce business risks, optimize costs, increase revenue, and make faster, data-driven decisions. With deep industry expertise and proven delivery capabilities, DV Analytics empowers businesses to accelerate digital transformation and achieve sustainable competitive advantage through innovative AI-driven solutions.',
      expertise: [
        {
          title: 'Data Analytics & Business Intelligence',
          desc: 'Transform raw business data into meaningful insights through interactive dashboards, automated reporting, KPI monitoring, trend analysis, customer analytics, financial analytics, operational intelligence, and executive decision-support systems that enable data-driven business decisions.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          )
        },
        {
          title: 'Data Science & Artificial Intelligence',
          desc: 'Develop intelligent AI solutions using statistical modeling, predictive analytics, data mining, feature engineering, and advanced machine learning techniques to solve complex business problems, improve operational efficiency, and maximize business value.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          )
        },
        {
          title: 'Machine Learning & Deep Learning',
          desc: 'Design and deploy supervised, unsupervised, and reinforcement learning models along with deep learning architectures for classification, regression, forecasting, recommendation systems, anomaly detection, computer vision, and intelligent automation.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="10" x2="6" y2="14" />
              <line x1="18" y1="10" x2="18" y2="14" />
            </svg>
          )
        },
        {
          title: 'Generative AI (Gen AI)',
          desc: 'Build enterprise-ready Generative AI applications using Large Language Models (LLMs) to automate content generation, document intelligence, customer support, code generation, report automation, enterprise search, and AI-powered virtual assistants.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        },
        {
          title: 'Agentic AI Solutions',
          desc: 'Develop autonomous AI agents capable of planning, reasoning, decision-making, workflow orchestration, tool integration, multi-agent collaboration, and business process automation with minimal human intervention.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
              <line x1="19.07" y1="4.93" x2="14.83" y2="9.17" />
              <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
              <line x1="9.17" y1="14.83" x2="4.93" y2="19.07" />
            </svg>
          )
        },
        {
          title: 'Natural Language Processing (NLP)',
          desc: 'Implement NLP solutions for sentiment analysis, text classification, document summarization, chatbot development, speech analytics, information extraction, multilingual AI systems, and intelligent document processing.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          )
        },
        {
          title: 'Predictive & Prescriptive Analytics',
          desc: 'Leverage historical and real-time data to forecast future outcomes, identify business risks, optimize operational strategies, recommend next-best actions, and improve strategic planning through AI-driven decision intelligence.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          )
        },
        {
          title: 'AI-Powered Business Automation',
          desc: 'Automate repetitive business processes using Artificial Intelligence, workflow automation, intelligent document processing, AI copilots, customer service automation, invoice processing, HR automation, finance automation, and enterprise productivity solutions.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          )
        },
        {
          title: 'Cloud AI Deployment using MLOps, LLMOps & AIOps',
          desc: 'Deploy scalable AI applications on cloud platforms with automated CI/CD pipelines, model versioning, monitoring, governance, security, performance optimization, infrastructure automation, and continuous model lifecycle management.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
          )
        },
        {
          title: 'End-to-End Enterprise AI Solution Development',
          desc: 'Deliver complete AI transformation projects from business consulting, solution architecture, data engineering, AI model development, cloud deployment, enterprise integration, governance, monitoring, maintenance, and continuous improvement.',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          )
        }
      ],
      techStack: [
        {
          category: 'Programming & Data Management',
          desc: 'Core tools for ETL, statistical modeling, distributed processing, risk modeling, and regulatory reporting.',
          tools: 'SQL, Python, PySpark, Scala, SAS'
        },
        {
          category: 'Analytics & Visualization',
          desc: 'Self-service dashboarding, executive KPIs, automated reporting, and visual data intelligence.',
          tools: 'Excel AI, Power BI, Tableau'
        },
        {
          category: 'AI & Machine Learning',
          desc: 'Advanced models, deep neural networks, LLM RAG pipelines, autonomous agents, and decision-support systems.',
          tools: 'Machine Learning, Deep Learning, Generative AI, Agentic AI, Large Language Models (LLMs)'
        },
        {
          category: 'Cloud & Deployment (MLOps, LLMOps & AIOps)',
          desc: 'Scalable cloud infrastructure, CI/CD models pipelines, prompt governance, and AI operations automation.',
          tools: 'AWS, Microsoft Azure, Google Cloud Platform (GCP), MLOps, LLMOps, AIOps'
        }
      ]
    },
    'ccs': {
      title: 'Corporate Consulting Services',
      subtitle: 'Accelerating Digital Transformation & Analytics Maturity',
      accent: 'orange',
      description: 'DV Analytics provides end-to-end corporate consulting services that help organizations leverage Data Analytics, Artificial Intelligence, Generative AI, and Agentic AI to accelerate digital transformation and achieve business excellence. Our consulting expertise includes AI readiness assessments, data strategy, analytics maturity evaluation, business process optimization, AI governance, technology selection, solution architecture, proof-of-concept (PoC) development, enterprise AI implementation, cloud adoption, and intelligent automation. We work closely with business and technology teams to identify high-value opportunities, design scalable AI solutions, optimize operations, and successfully implement enterprise-wide AI initiatives.',
      benefits: [
        'Accelerate digital transformation initiatives',
        'Improve strategic and operational decision-making',
        'Increase productivity through AI-powered automation',
        'Reduce operational costs and manual effort',
        'Enhance customer experience and engagement',
        'Optimize business processes and resource utilization',
        'Enable faster and data-driven decision making',
        'Minimize business risks with predictive analytics',
        'Scale AI solutions securely on cloud platforms',
        'Improve compliance, governance, and data quality',
        'Generate new revenue opportunities through AI innovation',
        'Achieve sustainable business growth and competitive advantage'
      ]
    },
    'crhta': {
      title: 'Corporate Resource Hiring & Talent Augmentation',
      subtitle: 'Flexible Staffing & Expert Teams for Enterprise Data & AI Projects',
      accent: 'indigo',
      description: 'DV Analytics helps organizations rapidly build high-performing Data Analytics and AI teams by providing skilled professionals across Data Analytics, Business Intelligence, Data Science, Artificial Intelligence, Machine Learning, Deep Learning, Generative AI, Agentic AI, Data Engineering, Cloud AI, MLOps, LLMOps, and AIOps. We offer flexible resource engagement models, including contract staffing, project-based consulting, dedicated development teams, permanent hiring, and managed AI resources to meet short-term and long-term business requirements. Our industry-ready professionals possess strong technical expertise and domain knowledge, enabling organizations to accelerate project delivery, reduce hiring time, improve productivity, and successfully execute enterprise AI initiatives.',
      benefits: [
        'Access to industry-ready Data & AI professionals',
        'Faster recruitment and reduced hiring cycle',
        'Flexible contract, permanent, and project-based hiring models',
        'Dedicated resources for enterprise AI and analytics projects',
        'Rapid team scaling based on business requirements',
        'Reduced recruitment and onboarding costs',
        'Access to specialized AI, Gen AI, and Agentic AI expertise',
        'Experienced consultants across Banking, Telecom, Retail, Healthcare, Insurance, and E-Commerce',
        'Improved project delivery speed and quality',
        'Seamless integration with existing business and technology teams',
        'On-demand talent for short-term and long-term engagements',
        'End-to-end staffing support from resource selection to deployment'
      ]
    }
  };

  const activeService = servicesContent[serviceId];

  // If service ID is not found, fallback to the first service
  if (!activeService) {
    return (
      <div className="service-detail-error container text-center" style={{ padding: '6rem 2rem' }}>
        <h2>Service Not Found</h2>
        <button className="btn btn-primary" onClick={onBackHome}>Back Home</button>
      </div>
    );
  }


  return (
    <div className={`service-detail-wrapper accent-${activeService.accent}`}>
      {/* 1. Header Banner */}
      <section 
        className="service-detail-hero"
        style={{ backgroundImage: `url('/service-${serviceId}-bg.png')` }}
      >
        <div className="service-hero-overlay"></div>
        <div className="container service-hero-content text-center">
          <div className="back-btn-container" style={{ textAlign: 'left' }}>
            <button className="back-btn-link" onClick={() => onNavigate('services')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="12 19 5 12 12 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Services
            </button>
          </div>
          
          <h1 className="service-title-display">{activeService.title}</h1>
          <div className="service-title-underline"></div>
          <p className="service-subtitle-display">{activeService.subtitle}</p>

        </div>
      </section>

      {/* 2. Core Description Section */}
      <section className="service-desc-section container">
        <div className="desc-card-wrapper">
          <div className="desc-card-glow"></div>
          <div className="desc-card-content">
            <h2 className="section-title-accent">Overview</h2>
            <div className="divider-line"></div>
            {activeService.description.split('\n\n').map((para, idx) => (
              <p key={idx} className="desc-paragraph">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dynamic Section: AI Consulting Solutions Core Expertise */}
      {activeService.expertise && (
        <section className="service-expertise-section">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-pre-title">Core Capabilities</span>
              <h2 className="section-main-title">Our Core Expertise</h2>
              <div className="title-underline center"></div>
            </div>

            <div className="expertise-details-grid">
              {activeService.expertise.map((exp, idx) => (
                <div key={idx} className="expertise-detail-card">
                  <div className="exp-icon-holder">
                    {exp.icon}
                  </div>
                  <h3 className="exp-title">{exp.title}</h3>
                  <p className="exp-desc">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Dynamic Section: Technology Stack (for AI Consulting Solutions) */}
      {activeService.techStack && (
        <section className="service-techstack-section container">
          <div className="section-header text-center">
            <span className="section-pre-title">Blueprint & Stack</span>
            <h2 className="section-main-title">Technology Stack</h2>
            <div className="title-underline center"></div>
          </div>

          <div className="tech-details-container">
            {activeService.techStack.map((layer, idx) => (
              <div key={idx} className="tech-detail-row">
                <div className="tech-row-header">
                  <span className="tech-badge">{layer.category}</span>
                  <p className="tech-row-desc">{layer.desc}</p>
                </div>
                <div className="tech-tools-box">
                  <span className="tools-label">Technologies:</span>
                  <p className="tools-list-text">{layer.tools}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Dynamic Section: Key Benefits (for CCS / CRHTA) */}
      {activeService.benefits && (
        <section className="service-benefits-section">
          <div className="container">
            <div className="section-header text-center">
              <span className="section-pre-title">Why Partner With Us</span>
              <h2 className="section-main-title">Key Benefits & Outcomes</h2>
              <div className="title-underline center"></div>
            </div>

            <div className="benefits-cards-grid">
              {activeService.benefits.map((benefit, idx) => (
                <div key={idx} className="benefit-item-card">
                  <div className="benefit-bullet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="benefit-text">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
