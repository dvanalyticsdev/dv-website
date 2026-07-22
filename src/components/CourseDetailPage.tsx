import React, { useEffect, useState } from 'react';
import { coursesData } from '../data/coursesData';
import { useMagneticEffect } from '../hooks/useMagneticEffect';
import { AnimatedHeroGraphic } from './AnimatedHeroGraphic';

const posterImages: Record<string, string> = {
  apids: '/courses-poster/APIDS.png',
  apida: '/courses-poster/APIDA.png',
  aiml: '/courses-poster/Advance AIML.png',
  genai: '/courses-poster/Gen AI.png',
  specialist: '/courses-poster/DAS.png',
  apcs: '/courses-poster/APCF.png',
  days7_genai: '/courses-poster/7-days-genai.png',
};

const heroImages: Record<string, string> = {
  apids: '/course-hero/APIDS.jpeg',
  apida: '/course-hero/APIDA.jpeg',
  aiml: '/course-hero/Advance AIML.jpeg',
  genai: '/course-hero/Gen AI.jpeg',
  specialist: '/course-hero/DAS.jpeg',
  apcs: '/course-hero/APCF.jpeg',
  days7_genai: '/course-hero/7-days-genai.jpeg',
};

const courseSuccessImages: Record<string, string[]> = {
  apids: [
    '/Success Stories/WhatsApp Image 2026-07-01 at 11.19.49 AM.jpeg',
    '/Success Stories/WhatsApp Image 2026-07-01 at 11.19.50 AM (1).jpeg',
    '/Success Stories/WhatsApp Image 2026-07-01 at 11.19.50 AM (2).jpeg',
    '/Success Stories/WhatsApp Image 2026-07-01 at 11.19.50 AM.jpeg',
    '/Success Stories/WhatsApp Image 2026-07-01 at 11.19.51 AM.jpeg',
  ],
  apida: [
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.19 AM.jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.20 AM (1).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.20 AM (2).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.20 AM.jpeg',
  ],
  aiml: [
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.08 AM (1).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.08 AM (2).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.08 AM.jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.09 AM (1).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.09 AM.jpeg',
  ],
  genai: [
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.55 AM.jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.56 AM (1).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.56 AM (2).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.56 AM (3).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.56 AM.jpeg',
  ],
  specialist: [
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.44 AM (1).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.44 AM (2).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.44 AM.jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.45 AM (1).jpeg',
    '/Success Stories/WhatsApp Image 2026-06-29 at 11.28.45 AM.jpeg',
  ],
};

const allSuccessImages = [
  ...courseSuccessImages.apids,
  ...courseSuccessImages.apida,
  ...courseSuccessImages.aiml,
  ...courseSuccessImages.genai,
  ...courseSuccessImages.specialist,
];

const getCourseImages = (id: string): string[] => {
  const normalizedId = id.toLowerCase();
  if (normalizedId === 'apcs') {
    return allSuccessImages;
  }
  if (normalizedId === 'days7_genai') {
    return ['/courses-poster/7-days-genai.png', ...allSuccessImages];
  }
  return courseSuccessImages[normalizedId] || allSuccessImages;
};

type WhyDvBenefit = {
  title: string;
  description: string;
  detail: string;
};

const courseIndustryLabels: Record<string, string> = {
  apids: 'Data Science and AI',
  apida: 'Data Analytics and AI',
  specialist: 'Data Analytics',
  aiml: 'AI, Machine Learning, Generative AI, and Agentic AI',
  genai: 'Generative AI and Agentic AI',
  apcs: 'Cybersecurity and Forensics',
  days7_genai: 'Generative AI and Agentic AI',
};

const getWhyDvBenefits = (courseId: string): WhyDvBenefit[] => {
  const industry = courseIndustryLabels[courseId.toLowerCase()] || 'technology';

  return [
    {
      title: 'Live Online/Offline Classes',
      description: 'Learn through flexible online or classroom sessions with interactive, hands-on training and real-time doubt clearing.',
      detail: 'Choose the learning mode that best fits your schedule without compromising on practical experience.',
    },
    {
      title: 'Classes by Industry Experts (Academic Background: IITs & IIMs)',
      description: 'Get trained by experienced professionals with strong industry expertise and academic excellence from premier institutes.',
      detail: 'Learn industry best practices, real-world case studies, and practical applications directly from experts.',
    },
    {
      title: 'Post-Class LMS Access',
      description: 'Access recorded sessions, study materials, assignments, quizzes, and project resources anytime through the Learning Management System (LMS).',
      detail: 'Revise concepts at your own pace and continue learning even after the live classes are over.',
    },
    {
      title: 'Industry Mentorship',
      description: `Receive one-on-one guidance from experienced mentors working in the ${industry} industry.`,
      detail: 'Get personalized career advice, project feedback, and interview preparation to accelerate your professional growth.',
    },
    {
      title: 'Resume & Profile Building',
      description: 'Build an ATS-friendly resume and optimize your LinkedIn and GitHub profiles to attract recruiters.',
      detail: 'Showcase your projects, technical skills, certifications, and achievements in a professional manner.',
    },
    {
      title: 'Tests & Mock Interviews',
      description: 'Evaluate your knowledge through regular assessments, coding tests, and practical assignments.',
      detail: `Gain confidence with ${industry} technical mock interviews based on real industry hiring processes.`,
    },
    {
      title: 'Placement Support',
      description: 'Receive end-to-end placement assistance through job referrals, interview scheduling, and career guidance.',
      detail: 'Stay connected with hiring partners and receive support until you secure the right job opportunity.',
    },
  ];
};
interface CourseDetailPageProps {
  courseId: string;
  onBackHome: () => void;
  onEnroll: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onBackHome, onEnroll }) => {
  const course = coursesData[courseId.toUpperCase()];
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [isMobileView, setIsMobileView] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [expandedProjectDomains, setExpandedProjectDomains] = useState<number[]>([]);
  const [expandedCareerGroups, setExpandedCareerGroups] = useState<number[]>([]);
  const hasPlacementSupport = ['apids', 'apida', 'aiml'].includes(courseId.toLowerCase());
  const whyDvBenefits = getWhyDvBenefits(courseId);

  const heroEnrollRef = useMagneticEffect(0.25);
  const bottomEnrollRef = useMagneticEffect(0.25);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const syncViewport = (matches: boolean) => {
      setIsMobileView(matches);
    };

    syncViewport(mediaQuery.matches);

    const handleViewportChange = (event: MediaQueryListEvent) => {
      syncViewport(event.matches);
    };

    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    setExpandedProjectDomains([]);
    setExpandedCareerGroups([]);
  }, [courseId]);

  if (!course) {
    return (
      <div className="page-wrapper container">
        <section className="content-section" style={{ padding: '3.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', color: '#ef4444', fontWeight: '800' }}>
            Course Not Found
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            The requested course page for <strong>{courseId}</strong> does not exist.
          </p>
          <button className="btn btn-primary" onClick={onBackHome}>
            ← Return to Homepage
          </button>
        </section>
      </div>
    );
  }

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const toggleProjectDomain = (index: number) => {
    if (!isMobileView) return;

    setExpandedProjectDomains((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  };

  const toggleCareerGroup = (index: number) => {
    if (!isMobileView) return;

    setExpandedCareerGroups((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  };

  return (
    <div className="course-detail-container theme-blue">
      
      {/* 1. Hero Banner Section */}
      {heroImages[courseId.toLowerCase()] ? (
        <section className="course-hero-full" onClick={onEnroll} style={{ cursor: 'pointer', width: '100%', overflow: 'hidden' }}>
          <img 
            src={heroImages[courseId.toLowerCase()]} 
            alt={`${course.title} Hero`} 
            className="course-hero-full-img"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </section>
      ) : (
        <section className="course-hero">
          <div className="course-hero-overlay"></div>
          <div className="course-hero-content container hero-split">
            <div className="hero-left">
              <h1 className="course-hero-title">
                {course.title.includes(' & ') ? (
                  <>
                    {course.title.substring(0, course.title.indexOf(' & '))}
                    <br />
                    & {course.title.substring(course.title.indexOf(' & ') + 3)}
                  </>
                ) : (
                  course.title
                )}
              </h1>
              <p className="course-hero-tagline">{course.tagline}</p>

              <div className="hero-cta-group">
                <button ref={heroEnrollRef} className="btn btn-enroll-main" onClick={onEnroll}>Enroll Now</button>
                <a href="/APIDS-Brochure.pdf" download="APIDS-Brochure.pdf" className="btn btn-download-syllabus">
                  <svg viewBox="0 0 24 24" className="download-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Brochure
                </a>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-image-container course-hero-poster-container">
                <img 
                  src={posterImages[course.id.toLowerCase()]} 
                  alt={`${course.title} Poster`} 
                  className="course-hero-poster-img"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Quick Stats Grid - 3 cards only */}
      <section className="course-stats-section container reveal-on-scroll">
        <div className="stats-cards-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="stat-card-content">
              <h4>Duration</h4>
              <p>{course.duration}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <div className="stat-card-content">
              <h4>Delivery</h4>
              <p>Live Online/Offline Classes</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className="stat-card-content">
              <h4>Career Support</h4>
              <p>{hasPlacementSupport ? '100% Placement Support' : 'Career Mentorship & Guidance'}</p>
            </div>
          </div>
        </div>


      </section>

      {/* 3. Course Overview & Practical Exposure */}
      <section className="course-overview-section container reveal-on-scroll">
        <div className="overview-split">
          <div className="overview-left">
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="section-title">Program Overview</h2>
              <div className="title-underline"></div>
            </div>
            <p className="overview-text">{course.overview}</p>
            
            <div className="who-should-join-box">
              <h3>Who Should Join?</h3>
              <ul className="checklist-grid">
                {course.whoShouldJoin.map((item, idx) => (
                  <li key={idx} className="checklist-item">
                    <span className="check-icon">✓</span>
                    <span className="check-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overview-right">
            <div className="deliverables-panel">
              <h3>Practical Exposure</h3>
              <div className="deliverables-list">
                {course.practicalExposure.map((item, idx) => (
                  <div key={idx} className="deliverable-item">
                    <div className="deliverable-bullet"></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slideshow showing GAA hero stories/outcomes */}
            <div className="course-detail-slideshow-container">
              <AnimatedHeroGraphic images={getCourseImages(course.id)} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why DV Analytics */}
      <section className="why-dv-section container reveal-on-scroll" aria-labelledby={`why-dv-title-${course.id}`}>
          <div className="why-dv-heading-row">
            <div>
              <h2 id={`why-dv-title-${course.id}`} className="why-dv-title">Why DV Analytics?</h2>
            </div>

          </div>

          <div className="why-dv-grid">
            {whyDvBenefits.map((benefit, index) => (
              <article className="why-dv-card" key={benefit.title}>
                <span className="why-dv-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="why-dv-card-copy">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                  <p>{benefit.detail}</p>
                </div>
              </article>
            ))}
          </div>
      </section>

      {/* 5. Interactive Syllabus Accordion */}
      <section className="course-syllabus-section container reveal-on-scroll">
        <div className="course-syllabus-banner">
          <div className="section-title-wrapper">
            <h2 className="section-title-divider course-syllabus-banner-title">Program Modules</h2>
          </div>
        </div>

        <div className="syllabus-accordion">
          {course.modules.map((module, idx) => {
            const isExpanded = expandedModule === idx;
            return (
              <div key={idx} className={`accordion-item ${isExpanded ? 'active' : ''}`}>
                <div className="accordion-trigger" onClick={() => toggleModule(idx)}>
                  <div className="accordion-trigger-left">
                    <span className="module-index">0{idx + 1}</span>
                    <h3 className="module-title">{module.title}</h3>
                  </div>
                  <div className="accordion-arrow">
                    <svg viewBox="0 0 24 24" className={`arrow-svg ${isExpanded ? 'rotated' : ''}`}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className={`accordion-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>
                  <div style={{ minHeight: '0px' }}>
                    <div className="accordion-panel-content">
                      {module.description && <p className="module-desc">{module.description}</p>}
                      
                      <div className="module-sections-list" style={{ marginTop: '1rem' }}>
                        {module.sections.map((section, sIdx) => (
                          <div key={sIdx} className="curriculum-section-box">
                            <h4 className="curriculum-section-title">{section.title}</h4>
                            <div className="curriculum-topics-grid">
                              {section.topics.map((topic, tIdx) => (
                                <div key={tIdx} className="topic-bullet-item">
                                  <div className="topic-bullet-dot"></div>
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>

                            {section.applications && section.applications.length > 0 && (
                              <div className="section-apps-panel">
                                <h5>Applications</h5>
                                <div className="apps-pills">
                                  {section.applications.map((app, aIdx) => (
                                    <span key={aIdx} className="app-pill">{app}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Industry Projects - Grouped by Domain */}
      <section className="course-projects-section industry-projects-section container reveal-on-scroll">
        <div className="projects-header text-center">
          <span className="section-subtitle">Practical Portfolio</span>
          <h2 className="section-title">Industry Projects</h2>
          <div className="title-underline center"></div>
          <p className="projects-intro">
            Build and deploy enterprise-level solutions designed around active industry scenarios.
          </p>
        </div>

        <div className="industry-domains-grid">
          {course.industryProjects.map((domain, idx) => {
            const isExpanded = !isMobileView || expandedProjectDomains.includes(idx);

            return (
            <div key={idx} className={`domain-card ${isExpanded ? 'mobile-expanded' : 'mobile-collapsed'}`}>
              <button
                type="button"
                className={`domain-card-header ${isMobileView ? 'mobile-collapsible-trigger' : ''}`}
                onClick={() => toggleProjectDomain(idx)}
                aria-expanded={isExpanded}
              >
                <h3 className="domain-title">{domain.domain}</h3>
                {isMobileView && (
                  <span className={`mobile-collapsible-icon ${isExpanded ? 'is-open' : ''}`} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
              <div className={`domain-projects-list ${isExpanded ? 'mobile-expanded' : 'mobile-collapsed'}`}>
                <div className="domain-projects-inner">
                {domain.projects.map((project, pIdx) => (
                  <div key={pIdx} className="domain-project-item">
                    <span className="domain-project-bullet">▸</span>
                    <span>{project}</span>
                  </div>
                ))}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* 6. Career Pathways & Roles */}
      <section className="course-careers-section container reveal-on-scroll">
        <div className="careers-header text-center">
          <span className="section-subtitle">Future Progression</span>
          <h2 className="section-title">Career Opportunities</h2>
          <div className="title-underline center"></div>
        </div>

        <div className="career-path-grid">
          {course.careers.map((career, idx) => {
            const isExpanded = !isMobileView || expandedCareerGroups.includes(idx);

            return (
            <div key={idx} className={`career-path-card ${isExpanded ? 'mobile-expanded' : 'mobile-collapsed'}`}>
              <button
                type="button"
                className={`career-card-top ${isMobileView ? 'mobile-collapsible-trigger' : ''}`}
                onClick={() => toggleCareerGroup(idx)}
                aria-expanded={isExpanded}
              >
                <span className="career-level">{career.level}</span>
                {isMobileView && (
                  <span className={`mobile-collapsible-icon ${isExpanded ? 'is-open' : ''}`} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
              <div className={`career-roles-list ${isExpanded ? 'mobile-expanded' : 'mobile-collapsed'}`}>
                <div className="career-roles-inner">
                {career.roles.map((role, rIdx) => (
                  <div key={rIdx} className="career-role-item">
                    <span className="role-bullet-check">✔</span>
                    <span>{role}</span>
                  </div>
                ))}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* 7. Program Outcome */}
      <section className="program-outcome-section container reveal-on-scroll">
        <div className="text-center">
          <span className="section-subtitle">Measurable Results</span>
          <h2 className="section-title">Program Outcome</h2>
          <div className="title-underline center"></div>
        </div>

        <div className="outcome-checklist-grid">
          {course.programOutcome.map((outcome, idx) => (
            <div key={idx} className="outcome-checklist-item">
              <span className="outcome-check-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="outcome-check-icon-svg">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M10 8l4 4-4 4" />
                </svg>
              </span>
              <span className="outcome-check-text">{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Career Advantage */}
      <section className="career-advantage-section container reveal-on-scroll">
        <div className="text-center">
          <span className="section-subtitle">Your Competitive Edge</span>
          <h2 className="section-title">Career Advantage</h2>
          <div className="title-underline center"></div>
        </div>

        <div className="career-advantage-box">
          <div className="advantage-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>
          </div>
          <p className="advantage-text">{course.careerAdvantage}</p>
        </div>
      </section>

      {/* 9. Certifications Alignment (conditional) */}
      {course.certifications && course.certifications.length > 0 && (
        <section className="certifications-section container reveal-on-scroll">
          <div className="text-center">
            <span className="section-subtitle">Industry Recognition</span>
            <h2 className="section-title">Certifications Alignment</h2>
            <div className="title-underline center"></div>
          </div>

          <div className="certifications-badges-wrap">
            {course.certifications.map((cert, idx) => (
              <div key={idx} className="certification-badge">
                <span className="cert-icon">🏅</span>
                <span className="cert-name">{cert}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Success Stories section removed */}

      {/* 11. Bottom CTA Section */}
      <section className="course-bottom-cta reveal-on-scroll">
        <div className="cta-box container text-center">
          <h2>Ready to Launch Your Career in {course.title.match(/\(([^)]+)\)$/)?.[1] || (course.id === 'days7_genai' ? '7 Days Gen AI Master Program' : course.id.toUpperCase())}?</h2>
          <p>
            {hasPlacementSupport
              ? 'Get mentored by industry experts and secure placements in top corporate groups.'
              : 'Get mentored by industry experts and build job-ready skills to launch your career.'}
          </p>
          <div className="cta-btn-row">
            <button ref={bottomEnrollRef} className="btn btn-enroll-bottom" onClick={onEnroll}>Enroll Now</button>
            <button className="btn btn-back-home-bottom" onClick={onBackHome}>← Back to Homepage</button>
          </div>
        </div>
      </section>

    </div>
  );
};
