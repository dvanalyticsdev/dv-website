import React, { useEffect, useState } from 'react';
import { coursesData } from '../data/coursesData.ts';
import { getCourseMeta } from '../data/courseMeta';
import { useMagneticEffect } from '../hooks/useMagneticEffect';
import { AnimatedHeroGraphic } from './AnimatedHeroGraphic';
import { LiveCourseFullHero } from './LiveCoursePoster';
import {
  courseCustomHeadings,
  courseWhyChooseData,
  courseCareerIntroTexts,
  courseFaqsData,
} from '../data/courseExtraContent';

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
  ...courseSuccessImages.specialist,
];

const getCourseImages = (id: string): string[] => {
  const normalizedId = id.toLowerCase();
  if (normalizedId === 'apcs') {
    return allSuccessImages;
  }
  if (normalizedId === 'fde') {
    return ['/courses-poster/ai-forward-deployment-engineer.png', ...allSuccessImages];
  }
  return courseSuccessImages[normalizedId] || allSuccessImages;
};

type CourseStatIcon = 'duration' | 'delivery' | 'lms' | 'projects' | 'profile' | 'support';

type CourseStat = {
  label: string;
  value: string;
  icon: CourseStatIcon;
};

const CourseStatGraphic: React.FC<{ icon: CourseStatIcon }> = ({ icon }) => {
  if (icon === 'duration') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }

  if (icon === 'delivery') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }

  if (icon === 'lms') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    );
  }

  if (icon === 'projects') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    );
  }

  if (icon === 'profile') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};



interface CourseDetailPageProps {
  courseId: string;
  onBackHome: () => void;
  onEnroll: () => void;
  onDownloadBrochure: () => void;
}

const normalizeProjectHeading = (domainLabel: string) => {
  const cleanedLabel = domainLabel
    .replace(/^tier\s*\d+\s*capstone\s*(project\s*\d+)?\s*[-—:]\s*/i, '')
    .replace(/^industry\s*project\s*\d+\s*[-—:]\s*/i, '')
    .replace(/\s+projects?$/i, '')
    .trim();

  return `Project Focus: ${cleanedLabel}`;
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseId,
  onBackHome,
  onEnroll,
  onDownloadBrochure,
}) => {
  const normalizedCourseId = courseId.toLowerCase();
  const course =
    coursesData[courseId.toUpperCase()] ||
    Object.values(coursesData).find(
      (courseItem) => courseItem.id.toLowerCase() === normalizedCourseId
    );
  const courseMeta = getCourseMeta(courseId);
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [isMobileView, setIsMobileView] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [expandedProjectDomains, setExpandedProjectDomains] = useState<number[]>([]);
  const [expandedProjectItems, setExpandedProjectItems] = useState<string[]>([]);
  const [expandedCareerGroups, setExpandedCareerGroups] = useState<number[]>([]);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const customHeadings = courseCustomHeadings[normalizedCourseId];
  const whyChoose = courseWhyChooseData[normalizedCourseId];
  const careerIntro = courseCareerIntroTexts[normalizedCourseId];
  const courseFaqs = courseFaqsData[normalizedCourseId];

  const hasPlacementSupport = ['apids', 'apida'].includes(normalizedCourseId);
  const hasSixCourseStats = ['apids', 'apida', 'specialist', 'apcs', 'fde'].includes(normalizedCourseId);
  const isFlexiLearningProgram = normalizedCourseId === 'flp';
  const courseStatDuration = ['specialist', 'apcs'].includes(normalizedCourseId)
    ? '2-3 Months'
    : course?.duration ?? '';
  const courseStats: CourseStat[] = isFlexiLearningProgram
    ? [
        { label: 'Duration', value: course?.duration ?? '', icon: 'duration' },
        { label: 'Learning Mode', value: 'Self-Paced Learning', icon: 'lms' },
        { label: 'Focus', value: 'Data Science, Gen AI & Agentic AI', icon: 'projects' },
      ]
    : hasSixCourseStats
    ? [
        { label: 'Duration', value: courseStatDuration, icon: 'duration' },
        { label: 'Delivery', value: 'Live Online/Offline Classes', icon: 'delivery' },
        { label: 'Learning Access', value: 'LMS Access', icon: 'lms' },
        { label: 'Projects', value: 'Industry Real-Time Projects Hands-on', icon: 'projects' },
        { label: 'Career Readiness', value: 'Profile Building', icon: 'profile' },
        ...(hasPlacementSupport
          ? [{ label: 'Career Support', value: 'Placement Support', icon: 'support' as CourseStatIcon }]
          : []),
      ]
    : [
        { label: 'Duration', value: course?.duration ?? '', icon: 'duration' },
        { label: 'Delivery', value: 'Live Online/Offline Classes', icon: 'delivery' },
        { label: 'Career Support', value: 'Career Mentorship & Guidance', icon: 'support' },
      ];

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
    setExpandedProjectItems([]);
    setExpandedCareerGroups([]);
    setExpandedFaqIndex(null);
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

  const toggleProjectItem = (projectKey: string) => {
    setExpandedProjectItems((current) =>
      current.includes(projectKey)
        ? current.filter((item) => item !== projectKey)
        : [...current, projectKey]
    );
  };

  return (
    <div className="course-detail-container theme-blue">
      {/* 1. Full-Size End-to-End Live Poster Hero Section */}
      <LiveCourseFullHero
        courseId={normalizedCourseId}
        courseMeta={courseMeta}
        onEnroll={onEnroll}
        onDownloadBrochure={onDownloadBrochure}
        enrollRef={heroEnrollRef}
      />

      {/* 2. Quick Stats Grid */}
      <section className="course-stats-section container reveal-on-scroll">
        <div className="stats-cards-grid">
          {courseStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-icon-wrapper">
                <CourseStatGraphic icon={stat.icon} />
              </div>
              <div className="stat-card-content">
                <h4>{stat.label}</h4>
                <p>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="course-stats-brochure-row">
          <button
            type="button"
            className="btn btn-download-syllabus course-stats-brochure-btn"
            onClick={onDownloadBrochure}
            disabled={!courseMeta?.brochurePath}
          >
            <svg viewBox="0 0 24 24" className="download-icon">
              <path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {courseMeta?.brochurePath ? 'Download Brochure' : 'Brochure Coming Soon'}
          </button>
        </div>
      </section>

      {/* 3. Course Overview & Practical Exposure */}
      <section className="course-overview-section container reveal-on-scroll">
        <div className="overview-split">
          <div className="overview-left">
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="section-title">
                {customHeadings?.overviewHeading || 'Program Overview'}
              </h2>
              <div className="title-underline"></div>
            </div>
            <p className="overview-text">{course.overview}</p>

            <div className="who-should-join-box">
              <h3>{customHeadings?.whoShouldJoinHeading || 'Who Should Join?'}</h3>
              {customHeadings?.whoShouldJoinIntro && (
                <p
                  className="who-should-join-intro"
                  style={{
                    margin: '0.5rem 0 1rem',
                    color: '#475569',
                    fontSize: '0.98rem',
                    lineHeight: 1.5,
                  }}
                >
                  {customHeadings.whoShouldJoinIntro}
                </p>
              )}
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

      {/* 4. Interactive Syllabus Accordion */}
      <section className="course-syllabus-section container reveal-on-scroll">
        <div className="course-syllabus-banner">
          <div className="section-title-wrapper">
            <h2 className="section-title-divider course-syllabus-banner-title">
              {customHeadings?.modulesHeading || 'Program Modules'}
            </h2>
          </div>
        </div>

        <div className="syllabus-accordion">
          {course.modules.map((module, idx) => {
            const isExpanded = expandedModule === idx;
            return (
              <div key={idx} className={`accordion-item ${isExpanded ? 'active' : ''}`}>
                <button
                  type="button"
                  className="accordion-trigger"
                  id={`course-module-trigger-${idx}`}
                  aria-expanded={isExpanded}
                  aria-controls={`course-module-panel-${idx}`}
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection && selection.toString().trim().length > 0) {
                      return;
                    }
                    toggleModule(idx);
                  }}
                >
                  <div className="accordion-trigger-left">
                    <span className="module-index">0{idx + 1}</span>
                    <h3 className="module-title">{module.title}</h3>
                  </div>
                  <div className="accordion-arrow">
                    <svg viewBox="0 0 24 24" className={`arrow-svg ${isExpanded ? 'rotated' : ''}`}>
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  id={`course-module-panel-${idx}`}
                  className={`accordion-panel ${isExpanded ? 'expanded' : 'collapsed'}`}
                  role="region"
                  aria-labelledby={`course-module-trigger-${idx}`}
                  aria-hidden={!isExpanded}
                >
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
                                    <span key={aIdx} className="app-pill">
                                      {app}
                                    </span>
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
              <div
                key={idx}
                className={`domain-card ${isExpanded ? 'mobile-expanded' : 'mobile-collapsed'}`}
              >
                <button
                  type="button"
                  className={`domain-card-header ${isMobileView ? 'mobile-collapsible-trigger' : ''}`}
                  onClick={() => toggleProjectDomain(idx)}
                  aria-expanded={isExpanded}
                >
                  <h3 className="domain-title">{normalizeProjectHeading(domain.domain)}</h3>
                  {isMobileView && (
                    <span
                      className={`mobile-collapsible-icon ${isExpanded ? 'is-open' : ''}`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
                <div
                  className={`domain-projects-list ${isExpanded ? 'mobile-expanded' : 'mobile-collapsed'}`}
                >
                  <div className="domain-projects-inner">
                    {domain.projects.map((project, pIdx) => {
                      const projectDetails =
                        typeof project === 'string' ? { title: project, description: '' } : project;
                      const projectKey = `${course.id}-${idx}-${pIdx}`;
                      const isProjectExpanded = expandedProjectItems.includes(projectKey);
                      const descriptionPanelId = `project-description-${course.id}-${idx}-${pIdx}`;

                      return (
                        <div
                          key={pIdx}
                          className={`domain-project-item ${projectDetails.description ? 'has-description' : 'no-description'}`}
                        >
                          <span className="domain-project-bullet">▸</span>
                          <div className="domain-project-content">
                            {projectDetails.description ? (
                              <>
                                <button
                                  type="button"
                                  className={`domain-project-trigger ${isProjectExpanded ? 'is-open' : ''}`}
                                  onClick={() => toggleProjectItem(projectKey)}
                                  aria-expanded={isProjectExpanded}
                                  aria-controls={descriptionPanelId}
                                >
                                  <span className="domain-project-title">
                                    {projectDetails.title}
                                  </span>
                                  <span
                                    className={`domain-project-toggle ${isProjectExpanded ? 'is-open' : ''}`}
                                    aria-hidden="true"
                                  >
                                    <svg viewBox="0 0 24 24">
                                      <path
                                        d="M6 9l6 6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="2.1"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </button>
                                <div
                                  id={descriptionPanelId}
                                  className={`domain-project-description-wrap ${isProjectExpanded ? 'is-open' : ''}`}
                                >
                                  <div className="domain-project-description-inner">
                                    <p className="domain-project-description">
                                      {projectDetails.description}
                                    </p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="domain-project-heading static-project">
                                <span className="domain-project-title">{projectDetails.title}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5b. New Section: Why Choose DV Analytics for this Training */}
      {whyChoose && (
        <section className="course-why-choose-section container reveal-on-scroll" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title">{whyChoose.heading}</h2>
            <div className="title-underline center"></div>
            <p
              className="why-choose-intro-text"
              style={{
                maxWidth: '920px',
                margin: '1.25rem auto 0',
                fontSize: '1.02rem',
                lineHeight: 1.7,
                color: '#475569',
              }}
            >
              {whyChoose.intro}
            </p>
          </div>

          {whyChoose.subheading && (
            <div className="text-center" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#051f40' }}>
                {whyChoose.subheading}
              </h3>
            </div>
          )}

          {whyChoose.cards && (
            <div className="course-why-choose-cards-grid">
              {whyChoose.cards.map((card, cIdx) => (
                <div key={cIdx} className="why-choose-card">
                  <div className="why-choose-card-icon" style={{ color: '#0284c7', marginBottom: '0.65rem' }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h4 className="why-choose-card-title">{card.title}</h4>
                  <p className="why-choose-card-desc">{card.description}</p>
                </div>
              ))}
            </div>
          )}

          {whyChoose.list && (
            <div className="why-choose-numbered-list">
              {whyChoose.list.map((item, lIdx) => (
                <div key={lIdx} className="why-choose-list-item">
                  <span className="why-choose-list-num">{lIdx + 1}</span>
                  <p className="why-choose-list-text">{item}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 6. Career Pathways & Roles */}
      <section className="course-careers-section container reveal-on-scroll">
        <div className="careers-header text-center">
          <span className="section-subtitle">Future Progression</span>
          <h2 className="section-title">
            {customHeadings?.careersHeading || 'Career Opportunities'}
          </h2>
          <div className="title-underline center"></div>

          {careerIntro && (
            <div
              className="career-intro-paragraphs"
              style={{
                maxWidth: '920px',
                margin: '1.25rem auto 2rem',
                textAlign: 'center',
                color: '#475569',
                fontSize: '1rem',
                lineHeight: 1.65,
              }}
            >
              {careerIntro.map((para, pIdx) => (
                <p key={pIdx} style={{ marginBottom: '0.75rem' }}>
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="career-path-grid">
          {course.careers.map((career, idx) => {
            const isExpanded = !isMobileView || expandedCareerGroups.includes(idx);

            return (
              <div
                key={idx}
                className={`career-path-card ${isExpanded ? 'mobile-expanded' : 'mobile-collapsed'}`}
              >
                <button
                  type="button"
                  className={`career-card-top ${isMobileView ? 'mobile-collapsible-trigger' : ''}`}
                  onClick={() => toggleCareerGroup(idx)}
                  aria-expanded={isExpanded}
                >
                  <span className="career-level">{career.level}</span>
                  {isMobileView && (
                    <span
                      className={`mobile-collapsible-icon ${isExpanded ? 'is-open' : ''}`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
                <div
                  className={`career-roles-list ${isExpanded ? 'mobile-expanded' : 'mobile-collapsed'}`}
                >
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
          <h2 className="section-title">
            {customHeadings?.outcomesHeading || 'Program Outcome'}
          </h2>
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
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
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

      {/* 10. Course-Specific FAQs Section */}
      {courseFaqs && (
        <section
          className="course-faqs-section container reveal-on-scroll"
          style={{ marginTop: '4rem', marginBottom: '3.5rem' }}
        >
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <span className="section-subtitle">LEARNER SUPPORT</span>
            <h2 className="section-title">{courseFaqs.title}</h2>
            <div className="title-underline center"></div>
          </div>

          <div className="course-faqs-accordion" style={{ maxWidth: '960px', margin: '0 auto' }}>
            {courseFaqs.items.map((item, fIdx) => {
              const isOpen = expandedFaqIndex === fIdx;
              return (
                <div key={fIdx} className={`faq-accordion-card ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setExpandedFaqIndex(isOpen ? null : fIdx)}
                    aria-expanded={isOpen}
                    id={`course-faq-question-${fIdx}`}
                    aria-controls={`course-faq-answer-${fIdx}`}
                  >
                    <span>
                      {fIdx + 1}. {item.question}
                    </span>
                    <span className="faq-toggle-icon">
                      {isOpen ? (
                        <svg viewBox="0 0 24 24">
                          <line
                            x1="5"
                            y1="12"
                            x2="19"
                            y2="12"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24">
                          <line
                            x1="12"
                            y1="5"
                            x2="12"
                            y2="19"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="5"
                            y1="12"
                            x2="19"
                            y2="12"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                  <div
                    id={`course-faq-answer-${fIdx}`}
                    className={`faq-answer-panel ${isOpen ? 'open' : 'closed'}`}
                    role="region"
                    aria-labelledby={`course-faq-question-${fIdx}`}
                    aria-hidden={!isOpen}
                  >
                    <div style={{ minHeight: '0px' }}>
                      <div className="faq-answer-content">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 11. Bottom CTA Section */}
      <section className="course-bottom-cta reveal-on-scroll">
        <div className="cta-box container text-center">
          <h2>
            Ready to Launch Your Career in{' '}
            {course.title.match(/\(([^)]+)\)$/)?.[1] || course.id.toUpperCase()}?
          </h2>
          <p>
            {hasPlacementSupport
              ? 'Get mentored by industry experts and secure placements in top corporate groups.'
              : 'Get mentored by industry experts and build job-ready skills to launch your career.'}
          </p>
          <div className="cta-btn-row">
            <button ref={bottomEnrollRef} className="btn btn-enroll-bottom" onClick={onEnroll}>
              Enroll Now
            </button>
            <button className="btn btn-back-home-bottom" onClick={onBackHome}>
              ← Back to Homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
