import React, { useEffect, useMemo } from 'react';
import { trackEvent } from '../../utils/analytics';
import {
  getSavedLandingRegistration,
  type LandingCourseId,
} from '../../utils/landingRegistrationStorage';
import './LandingThankYouPage.css';

interface CourseThankYouConfig {
  id: LandingCourseId;
  code: string;
  title: string;
  brochurePath: string;
  landingPageId: string;
  landingPagePath: string;
}

const COURSE_CONFIG_BY_ID: Record<LandingCourseId, CourseThankYouConfig> = {
  apida: {
    id: 'apida',
    code: 'APIDA',
    title: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
    brochurePath: '/apida-brochure.pdf',
    landingPageId: 'lp-apida',
    landingPagePath: '/lp/apida/',
  },
  apids: {
    id: 'apids',
    code: 'APIDS',
    title: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
    brochurePath: '/APIDS-Brochure.pdf',
    landingPageId: 'lp-apids',
    landingPagePath: '/lp/apids/',
  },
  fde: {
    id: 'fde',
    code: 'FDE',
    title: 'Master Program in AI Forward Deployment Engineer (FDE)',
    brochurePath: '/ai-forward-deployment-engineer-brochure.pdf',
    landingPageId: 'lp-fde',
    landingPagePath: '/lp/fde/',
  },
};

export interface LandingThankYouPageProps {
  courseId?: LandingCourseId;
  onNavigate?: (pageId: string) => void;
}

export const LandingThankYouPage: React.FC<LandingThankYouPageProps> = ({ courseId, onNavigate }) => {
  const resolvedCourseId = useMemo<LandingCourseId>(() => {
    if (courseId && COURSE_CONFIG_BY_ID[courseId]) {
      return courseId;
    }
    const params = new URLSearchParams(window.location.search);
    const queryCourse = params.get('course')?.toLowerCase();
    if (queryCourse === 'apida' || queryCourse === 'apids' || queryCourse === 'fde') {
      return queryCourse;
    }
    const saved = getSavedLandingRegistration();
    if (saved?.courseId && COURSE_CONFIG_BY_ID[saved.courseId]) {
      return saved.courseId;
    }
    return 'apida';
  }, [courseId]);

  const config = COURSE_CONFIG_BY_ID[resolvedCourseId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    trackEvent('view_landing_thank_you', {
      course_id: config.id,
      course_name: config.title,
    });
  }, [config.id, config.title]);

  const handleBackToLanding = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(config.landingPageId);
    } else {
      window.location.href = config.landingPagePath;
    }
  };

  const handleNavigateHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.href = '/';
    }
  };

  const handleBrochureClick = () => {
    trackEvent('click_download_brochure', {
      course_id: config.id,
      cta_source: 'landing_thank_you_page',
    });
  };

  return (
    <div className="lp-ty-page" data-section="landing-thank-you">
      {/* -------------------------------------------------------------------------
          1. TOP HEADER BAR (DV Logo on Left Corner)
          ------------------------------------------------------------------------- */}
      <header className="lp-ty-header">
        <div className="lp-ty-header-inner">
          <a
            href={config.landingPagePath}
            onClick={handleBackToLanding}
            className="lp-ty-logo-link"
            aria-label="DV Analytics"
          >
            <img src="/logo.png" alt="DV Analytics" className="lp-ty-logo" />
          </a>

          <div className="lp-ty-header-actions">
            <a
              href={config.landingPagePath}
              onClick={handleBackToLanding}
              className="lp-ty-back-btn"
            >
              <span>← Back to {config.code} Page</span>
            </a>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------------------
          2. MAIN HERO & CONFIRMATION SECTION
          Exact content from https://d.dvanalyticsmds.com/thanks-you/
          ------------------------------------------------------------------------- */}
      <main className="lp-ty-main">
        <section className="lp-ty-main-band" aria-labelledby="ty-main-heading">
          <div className="lp-ty-wrap">
            <div className="lp-ty-hero-head">
              <h1 id="ty-main-heading" className="lp-ty-title">
                <span className="lp-ty-title-accent">Congratulations! </span>
                We Are Happy To Have You Here
              </h1>

              <p className="lp-ty-lead">
                You&apos;re all set. You&apos;ll receive an email with details on attending the webinar. We look forward to seeing you there!
              </p>
            </div>

            {/* -------------------------------------------------------------------
                3. TWO-COLUMN HIGHLIGHTS & CLASSROOM IMAGE
                Exact 4 items from https://d.dvanalyticsmds.com/thanks-you/
                ------------------------------------------------------------------- */}
            <div className="lp-ty-showcase-grid">
              <div className="lp-ty-highlights-col">
                <ul className="lp-ty-highlights-list">
                  <li className="lp-ty-highlights-item">
                    <span className="lp-ty-highlight-dot" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </span>
                    <div className="lp-ty-highlight-text">
                      <strong>Training: </strong>
                      Classroom/Online/Corporate/Crash Courses
                    </div>
                  </li>

                  <li className="lp-ty-highlights-item">
                    <span className="lp-ty-highlight-dot" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </span>
                    <div className="lp-ty-highlight-text">
                      <strong>Projects: </strong>
                      Realtime industry based projects
                    </div>
                  </li>

                  <li className="lp-ty-highlights-item">
                    <span className="lp-ty-highlight-dot" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </span>
                    <div className="lp-ty-highlight-text">
                      <strong>Proficiency: </strong>
                      Classroom video access
                    </div>
                  </li>

                  <li className="lp-ty-highlights-item">
                    <span className="lp-ty-highlight-dot" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <polyline points="17 11 19 13 23 9" />
                      </svg>
                    </span>
                    <div className="lp-ty-highlight-text">
                      <strong>Support: </strong>
                      Mock-interviews, communication and presentation skill development
                    </div>
                  </li>
                </ul>
              </div>

              <div className="lp-ty-image-col">
                <div className="lp-ty-image-frame">
                  <img
                    src="/thank-you-classroom.jpg"
                    alt="DV Analytics Classroom Training"
                    className="lp-ty-classroom-img"
                    width="800"
                    height="600"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                4. BROCHURE DOWNLOAD BANNER & REPRESENTATIVE MESSAGE
                ------------------------------------------------------------------- */}
            <div className="lp-ty-brochure-cta-wrap">
              <a
                href={config.brochurePath}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="lp-ty-brochure-banner"
                onClick={handleBrochureClick}
              >
                <span className="lp-ty-brochure-banner-title">
                  <span>Download the Brochure Now</span>
                </span>
              </a>

              <p className="lp-ty-rep-note">
                Our representative will reach you shortly.
              </p>
            </div>

            {/* -------------------------------------------------------------------
                5. 3-COLUMN CONTACT & SOCIAL ROW
                Exact details from https://d.dvanalyticsmds.com/thanks-you/
                ------------------------------------------------------------------- */}
            <div className="lp-ty-contact-row">
              {/* Column 1: Feel Free To Contact */}
              <div className="lp-ty-contact-col">
                <h2 className="lp-ty-contact-heading">
                  Feel Free To Contact:{' '}
                  <a
                    href="mailto:Info@dvanalyticsmds.Com"
                    className="lp-ty-contact-link-highlight"
                  >
                    Info@dvanalyticsmds.Com
                  </a>
                </h2>
              </div>

              {/* Column 2: Phone Numbers */}
              <div className="lp-ty-contact-col">
                <div className="lp-ty-phone-block">
                  <span className="lp-ty-phone-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div className="lp-ty-phone-numbers">
                    <a href="tel:+918095881188" className="lp-ty-phone-link">
                      +91 8095 881 188
                    </a>
                    <a href="tel:+917483596228" className="lp-ty-phone-link">
                      +91 7483 596 228
                    </a>
                  </div>
                </div>
              </div>

              {/* Column 3: Social Icons & Website URL */}
              <div className="lp-ty-contact-col lp-ty-contact-col-center">
                <div className="lp-ty-social-row">
                  <a
                    href="https://www.facebook.com/dvanalytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lp-ty-social-icon"
                    aria-label="Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                    </svg>
                  </a>

                  <a
                    href="https://twitter.com/dvanalytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lp-ty-social-icon"
                    aria-label="Twitter"
                  >
                    <svg width="18" height="18" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/dvanalytics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lp-ty-social-icon"
                    aria-label="Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z" />
                    </svg>
                  </a>
                </div>

                <h2 className="lp-ty-website-heading">
                  <a href="https://dvanalyticsmds.com/" onClick={handleNavigateHome}>
                    www.dvanalyticsmds.com
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
