import React, { useEffect } from 'react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreServices = [
    {
      id: 'service-aics',
      title: 'AI Consulting Solutions',
      subtitle: 'End-to-End Enterprise AI Strategy & Solution Delivery',
      description: 'DV Analytics delivers end-to-end Data Science, Artificial Intelligence, Generative AI, and Agentic AI consulting services that help organizations transform data into strategic business value. Our consulting approach combines domain expertise, advanced analytics, machine learning, cloud deployment, and AI automation to solve complex business challenges across Banking, Telecom, Retail, Healthcare, and E-Commerce.',
      bullets: [
        'Data Analytics & Business Intelligence',
        'Data Science & Artificial Intelligence',
        'Generative AI & Agentic AI Solutions',
        'Cloud AI Deployment & MLOps/LLMOps/AIOps'
      ],
      theme: 'teal',
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
      id: 'service-ccs',
      title: 'Corporate Consulting Services',
      subtitle: 'Accelerating Digital Transformation & Analytics Maturity',
      description: 'DV Analytics provides end-to-end corporate consulting services that help organizations leverage Data Analytics, AI, and Automation to accelerate digital transformation. We work closely with business and technology teams to assess AI readiness, build PoCs, optimize processes, establish AI governance, and implement scalable enterprise-wide initiatives.',
      bullets: [
        'AI Readiness Assessments & Data Strategy',
        'Business Process Optimization & Governance',
        'Proof-of-Concept (PoC) Development',
        'Enterprise AI Implementation & Integration'
      ],
      theme: 'orange',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      id: 'service-crhta',
      title: 'Corporate Resource Hiring & Talent Augmentation',
      subtitle: 'Flexible Staffing & Expert Teams for Enterprise Data & AI Projects',
      description: 'DV Analytics helps organizations rapidly build high-performing Data Analytics and AI teams by providing skilled professionals across Data Analytics, Data Science, Machine Learning, Generative AI, MLOps, LLMOps, and AIOps. We offer contract staffing, project-based consulting, dedicated development teams, and permanent hiring.',
      bullets: [
        'Access to Industry-Ready Data & AI Professionals',
        'Flexible Contract, Project, and Permanent Staffing',
        'Rapid Team Scaling Based on Requirements',
        'Specialized AI, Gen AI, & Agentic AI Expertise'
      ],
      theme: 'indigo',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  const industries = [
    'Banking & Financial Services',
    'Telecom',
    'Retail & E-Commerce',
    'Healthcare',
    'Insurance',
    'Manufacturing',
    'Logistics & Supply Chain',
    'Education & EdTech',
    'Government',
    'Energy & Utilities'
  ];

  return (
    <div className="services-page-wrapper">
      {/* 1. Services Vision Header */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="container services-hero-content text-center">
          <span className="services-subtitle">Services &amp; Capabilities</span>
          <h1 className="services-title">Enterprise AI &amp; Consulting Services</h1>
          <div className="services-title-underline"></div>
          <p className="services-lead">
            Transforming Enterprises through Data, AI, Generative AI, and Agentic AI to drive 
            intelligent automation, operational excellence, innovation, and sustainable business growth.
          </p>
        </div>
      </section>

      {/* 2. Three Services Overview Grid */}
      <section className="services-overview-section container">
        <div className="section-header text-center">
          <span className="section-subtitle">Our Offerings</span>
          <h2>Enterprise Services</h2>
          <div className="title-underline center"></div>
          <p className="section-desc-para">
            Explore our specialized corporate divisions driving next-generation digital transformation, analytics capability, and elite technical staffing.
          </p>
        </div>

        <div className="services-overview-grid">
          {coreServices.map((service) => (
            <div key={service.id} className={`service-overview-card border-accent-${service.theme}`}>
              <div className="service-card-header">
                <div className={`service-icon-wrapper bg-${service.theme}`}>
                  {service.icon}
                </div>
                <div className="service-title-col">
                  <h3 className="service-card-title">{service.title}</h3>
                  <span className="service-card-subtitle">{service.subtitle}</span>
                </div>
              </div>
              
              <p className="service-card-description">{service.description}</p>
              
              <div className="service-card-bullets-holder">
                <h4 className="bullets-title">Key Areas:</h4>
                <ul className="service-card-bullets">
                  {service.bullets.map((bullet, index) => (
                    <li key={index} className="bullet-item">
                      <svg className="bullet-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-card-actions">
                <button className="btn btn-primary" onClick={() => onNavigate(service.id)}>
                  View Details &amp; Solutions
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Target Industries & Sectors */}
      <section className="services-section container text-center" style={{ marginTop: '2rem' }}>
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
