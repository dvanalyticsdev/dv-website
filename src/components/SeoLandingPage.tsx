import React from 'react';
import { seoLandingPageById } from '../data/seoLandingPages';
import { getPathFromPage } from '../utils/routes';
import { trackEvent } from '../utils/analytics';

interface SeoLandingPageProps {
  pageId: string;
  onNavigate: (pageId: string) => void;
}

export const SeoLandingPage: React.FC<SeoLandingPageProps> = ({ pageId, onNavigate }) => {
  const page = seoLandingPageById[pageId];

  if (!page) {
    return null;
  }

  const coursePageId = `course-${page.primaryCourseId}`;

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
              href={getPathFromPage('enroll')}
              onClick={(event) => {
                event.preventDefault();
                trackEvent('click_contact_advisor', {
                  course_id: page.primaryCourseId,
                  landing_page_id: page.id,
                });
                onNavigate('enroll');
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

      <section className="seo-landing-section container">
        <div className="seo-landing-content-grid">
          {page.sections.map((section) => (
            <article className="seo-landing-info-card" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

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
