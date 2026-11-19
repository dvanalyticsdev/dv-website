import React from 'react';
import { seoLandingPageById } from '../data/seoLandingPages';
import { getPathFromPage } from '../utils/routes';
import { trackEvent } from '../utils/analytics';

interface SeoLandingPageProps {
  pageId: string;
  onNavigate: (pageId: string) => void;
}

const renderSubitemIcon = (title = '', idx = 0) => {
  const lower = title.toLowerCase();

  if (lower.includes('python') || lower.includes('programming')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }

  if (lower.includes('sql') || lower.includes('database')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  if (lower.includes('excel') || lower.includes('reporting') || lower.includes('sas')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="9" x2="9" y2="21" />
      </svg>
    );
  }

  if (lower.includes('visual') || lower.includes('power bi') || lower.includes('tableau') || lower.includes('business intelligence')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }

  if (lower.includes('statistics') || lower.includes('analysis') || lower.includes('predictive')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }

  if (lower.includes('machine learning') || lower.includes('generative ai') || lower.includes('agentic') || lower.includes('ai-driven')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    );
  }

  if (lower.includes('expert') || lower.includes('trainer')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }

  if (lower.includes('project') || lower.includes('practical') || lower.includes('hands-on')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }

  if (lower.includes('lms') || lower.includes('learning management') || lower.includes('flexible')) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }

  if (lower.includes('career') || lower.includes('placement') || idx === 3) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
};

export const SeoLandingPage: React.FC<SeoLandingPageProps> = ({ pageId, onNavigate }) => {
  const page = seoLandingPageById[pageId];

  if (!page) {
    return null;
  }

  const coursePageId = `course-${page.primaryCourseId}`;
  const enrollPageId = `enroll-${page.primaryCourseId}`;

  return (
    <div className="seo-landing-page">
      <section className="seo-landing-hero">
        <div className="seo-landing-copy">
          <span className="section-subtitle">{page.eyebrow}</span>
          <h1 className="seo-landing-title">{page.heading}</h1>
          <p className="seo-landing-description">{page.description}</p>
          <div className="seo-landing-actions">
            <a
              className="btn btn-primary"
              href={getPathFromPage(coursePageId)}
              onClick={(event) => {
                event.preventDefault();
                trackEvent('click_view_course', {
                  course_id: page.primaryCourseId,
                  landing_page_id: page.id,
                });
                onNavigate(coursePageId);
              }}
            >
              View Course
            </a>
            <a
              className="btn btn-outline"
              href={getPathFromPage(enrollPageId)}
              onClick={(event) => {
                event.preventDefault();
                trackEvent('click_contact_advisor', {
                  course_id: page.primaryCourseId,
                  landing_page_id: page.id,
                });
                onNavigate(enrollPageId);
              }}
            >
              Contact Advisor
            </a>
          </div>
        </div>
        <div className="seo-landing-media">
          <img src={page.image} alt={page.heading} loading="eager" />
        </div>
      </section>

      <section className="seo-landing-section container">
        <div className="seo-landing-grid">
          {page.bullets.map((bullet) => (
            <div className="seo-landing-point" key={bullet}>
              <span className="seo-landing-check-icon" aria-hidden="true"></span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </section>

      {page.richSections && page.richSections.length > 0 && (
        <section className="seo-landing-section container seo-landing-rich-container">
          {page.richSections.map((sec, idx) => (
            <article className="seo-landing-rich-card" key={idx}>
              <h2 className="seo-landing-rich-heading">{sec.heading}</h2>
              {!sec.image && sec.intro && <p className="seo-landing-rich-intro">{sec.intro}</p>}

              {sec.image ? (
                <div
                  className={`seo-landing-media-row ${
                    sec.image.align === 'left' ? 'image-left' : 'image-right'
                  }`}
                >
                  <div className="seo-landing-media-content">
                    {sec.intro && <p className="seo-landing-rich-intro">{sec.intro}</p>}
                    {sec.paragraphs &&
                      sec.paragraphs.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
                    {sec.subsections && (
                      <div className="seo-landing-subsections-grid">
                        {sec.subsections.map((sub, sIdx) => (
                          <div className="seo-landing-subitem" key={sIdx}>
                            <div className="seo-landing-subitem-icon" aria-hidden="true">
                              {renderSubitemIcon(sub.title, sIdx)}
                            </div>
                            {sub.title && <h3>{sub.title}</h3>}
                            <p>{sub.body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {sec.bullets && (
                      <ul className="seo-landing-rich-bullets">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx}>
                            <span className="seo-bullet-dot" aria-hidden="true">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="seo-landing-media-thumb">
                    <img src={sec.image.src} alt={sec.image.alt} loading="lazy" />
                  </div>
                </div>
              ) : (
                <div className="seo-landing-text-content">
                  {sec.paragraphs &&
                    sec.paragraphs.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
                  {sec.subsections && (
                    <div className="seo-landing-subsections-grid">
                      {sec.subsections.map((sub, sIdx) => (
                        <div className="seo-landing-subitem" key={sIdx}>
                          <div className="seo-landing-subitem-icon" aria-hidden="true">
                            {renderSubitemIcon(sub.title, sIdx)}
                          </div>
                          {sub.title && <h3>{sub.title}</h3>}
                          <p>{sub.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {sec.bullets && (
                    <ul className="seo-landing-rich-bullets">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx}>
                          <span className="seo-bullet-dot" aria-hidden="true">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {sec.cta && (
                <div className="seo-landing-cta-banner">
                  <div className="seo-landing-cta-info">
                    <h3 className="seo-landing-cta-title">{sec.cta.heading}</h3>
                    <p className="seo-landing-cta-text">{sec.cta.text}</p>
                  </div>
                  <div className="seo-landing-cta-btns">
                    <a
                      className="btn btn-primary"
                      href={getPathFromPage(enrollPageId)}
                      onClick={(e) => {
                        e.preventDefault();
                        trackEvent('click_landing_cta', {
                          landing_page_id: page.id,
                        });
                        onNavigate(enrollPageId);
                      }}
                    >
                      {sec.cta.primaryText}
                    </a>
                    {sec.cta.secondaryText && (
                      <a
                        className="btn btn-outline seo-landing-cta-alt-btn"
                        href={getPathFromPage(coursePageId)}
                        onClick={(e) => {
                          e.preventDefault();
                          trackEvent('click_landing_secondary', {
                            landing_page_id: page.id,
                          });
                          onNavigate(coursePageId);
                        }}
                      >
                        {sec.cta.secondaryText}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {sec.contactInfo && (
                <div className="seo-landing-contact-box">
                  <p>
                    <strong>Training Centre:</strong> {sec.contactInfo.centre}
                  </p>
                  <p>
                    <strong>Contact:</strong>{' '}
                    {sec.contactInfo.phone.split('/').map((num, idx, arr) => {
                      const trimmed = num.trim();
                      const digits = trimmed.replace(/[^0-9+]/g, '');
                      return (
                        <React.Fragment key={trimmed}>
                          <a href={`tel:${digits}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {trimmed}
                          </a>
                          {idx < arr.length - 1 ? ' / ' : ''}
                        </React.Fragment>
                      );
                    })}
                  </p>
                </div>
              )}
            </article>
          ))}
        </section>
      )}

      <section className="seo-landing-section container">
        <div className="text-center">
          <span className="section-subtitle">Common Questions</span>
          <h2 className="section-title">FAQs</h2>
          <div className="title-underline center"></div>
        </div>
        <div className="seo-landing-faqs">
          {page.faqs.map((faq) => (
            <article className="seo-landing-faq-card" key={faq.question}>
              <h3 className="seo-landing-faq-question">{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
