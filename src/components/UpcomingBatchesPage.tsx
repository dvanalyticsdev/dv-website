import React, { useState, useEffect } from 'react';
import './UpcomingBatchesPage.css';
import { trackEvent } from '../utils/analytics';

interface UpcomingBatchesPageProps {
  onNavigate: (pageId: string) => void;
  onOpenGetACallModal?: () => void;
}

export const UpcomingBatchesPage: React.FC<UpcomingBatchesPageProps> = ({
  onNavigate,
  onOpenGetACallModal,
}) => {
  // Countdown to September 12, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-12T10:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCallModalTrigger = (sourceProgram?: string) => {
    trackEvent('click_get_a_call', {
      cta_source: 'upcoming_batches_page',
      program: sourceProgram || 'general',
    });

    if (onOpenGetACallModal) {
      onOpenGetACallModal();
    } else {
      const btn = document.querySelector('.get-call-btn-trigger') as HTMLButtonElement | null;
      if (btn) btn.click();
    }
  };

  const scrollToBatches = () => {
    const target = document.getElementById('batches-schedule');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="upcoming-batches-wrapper">
      {/* Hero Section */}
      <section className="ub-hero-section">
        <div className="ub-hero-overlay"></div>
        <div className="container ub-hero-content">
          <div className="ub-urgency-badge">
            <span className="ub-pulse-dot"></span>
            <span>NEXT BATCHES LAUNCHING SEPTEMBER 12TH, 2026</span>
          </div>

          <h1 className="ub-hero-title">
            Transform Your Career with <span>Flagship AI &amp; Data Batches</span>
          </h1>

          <p className="ub-hero-lead">
            High-impact industrial cohorts in <strong>Data Science (APIDS)</strong>, <strong>Data Analytics (APIDA)</strong>, and <strong>AI Forward Deployment Engineering (FDE)</strong>. Gain production-grade skills, mentored capstones, and direct placement support.
          </p>

          {/* Countdown Clock */}
          <div className="ub-timer-wrapper">
            <div className="ub-timer-label">September 12 Batch Countdown • Limited Seats Remaining</div>
            <div className="ub-timer-grid">
              <div className="ub-timer-box">
                <div className="ub-timer-number">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="ub-timer-unit">Days</div>
              </div>
              <div className="ub-timer-box">
                <div className="ub-timer-number">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="ub-timer-unit">Hours</div>
              </div>
              <div className="ub-timer-box">
                <div className="ub-timer-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="ub-timer-unit">Mins</div>
              </div>
              <div className="ub-timer-box">
                <div className="ub-timer-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="ub-timer-unit">Secs</div>
              </div>
            </div>
          </div>

          <div className="ub-hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleCallModalTrigger('hero')}
              style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', border: 'none', padding: '0.9rem 1.8rem', fontSize: '1rem', fontWeight: 700 }}
            >
              Request Immediate Callback
            </button>
            <button
              type="button"
              className="ub-scroll-btn"
              onClick={scrollToBatches}
            >
              Explore 3 Flagship Batches &darr;
            </button>
          </div>
        </div>
      </section>

      {/* Why Join Now / Market Trends */}
      <section className="ub-trends-section container">
        <div className="ub-section-title-area">
          <span className="ub-section-tag">2026 Market Demand &amp; Career ROI</span>
          <h2 className="ub-section-heading">Why You Should Enroll in the September 12 Batch</h2>
          <p className="ub-section-sub">
            The demand for enterprise AI, machine learning, and data analytics professionals has hit record highs across Bangalore, Bhubaneswar, and Dubai.
          </p>
        </div>

        <div className="ub-trends-grid">
          <div className="ub-trend-card">
            <div className="ub-trend-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <h3>Surging Enterprise Hiring</h3>
            <p>
              Over 45,000+ open roles exist for Data Scientists, Analytics Specialists, and AI Engineers across top IT hubs, MNCs, and high-growth startups in 2026.
            </p>
            <div className="ub-trend-stat">+48% Hiring Increase YoY</div>
          </div>

          <div className="ub-trend-card">
            <div className="ub-trend-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>Shift to Generative &amp; Agentic AI</h3>
            <p>
              Traditional data roles are rapidly evolving. Top recruiters prioritize candidates who can build automated LLM pipelines, RAG systems, and agentic workflows.
            </p>
            <div className="ub-trend-stat">Industry Demanded Tech Stack</div>
          </div>

          <div className="ub-trend-card">
            <div className="ub-trend-icon-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3>Placement &amp; Mentorship</h3>
            <p>
              Work directly on production-grade capstone projects guided by enterprise architects, complete with resume reviews, mock interviews, and guaranteed referral support.
            </p>
            <div className="ub-trend-stat">Proven Alumni Success Track</div>
          </div>
        </div>
      </section>

      {/* Flagship Batches Section (APIDS, APIDA, FDE) */}
      <section id="batches-schedule" className="ub-batches-section container">
        <div className="ub-section-title-area">
          <span className="ub-section-tag">Flagship Programs • September 12 Batch</span>
          <h2 className="ub-section-heading">Select Your Program</h2>
          <p className="ub-section-sub">
            Interactive live online classes, hands-on labs, and expert mentorship. Click below to view full course details.
          </p>
        </div>

        <div className="ub-batches-grid">
          {/* Card 1: APIDS */}
          <div className="ub-batch-card featured-batch">
            <div className="ub-batch-top-row">
              <span className="ub-program-code">APIDS</span>
              <span className="ub-seat-badge">3 Seats Remaining</span>
            </div>
            <h3 className="ub-batch-title">Advanced Program in Industrial Data Science &amp; AI</h3>
            <p className="ub-batch-summary">
              Master the complete data science lifecycle—from Python, SQL, and Machine Learning to Deep Learning, Generative AI, and Cloud deployment.
            </p>
            <div className="ub-card-actions">
              <button
                type="button"
                className="ub-btn-view-course"
                onClick={() => onNavigate('course-apids')}
              >
                View Full Course Details &rarr;
              </button>
              <button
                type="button"
                className="ub-btn-callback"
                onClick={() => handleCallModalTrigger('APIDS')}
              >
                Request Callback for Sep 12 Batch
              </button>
            </div>
          </div>

          {/* Card 2: APIDA */}
          <div className="ub-batch-card">
            <div className="ub-batch-top-row">
              <span className="ub-program-code">APIDA</span>
              <span className="ub-seat-badge">4 Seats Remaining</span>
            </div>
            <h3 className="ub-batch-title">Advanced Program in Industrial Data Analytics &amp; AI</h3>
            <p className="ub-batch-summary">
              Combine Data Management, Advanced SQL, Power BI, Python for Analytics, ETL pipelines, and Business Intelligence for high-demand analytics roles.
            </p>
            <div className="ub-card-actions">
              <button
                type="button"
                className="ub-btn-view-course"
                onClick={() => onNavigate('course-apida')}
              >
                View Full Course Details &rarr;
              </button>
              <button
                type="button"
                className="ub-btn-callback"
                onClick={() => handleCallModalTrigger('APIDA')}
              >
                Request Callback for Sep 12 Batch
              </button>
            </div>
          </div>

          {/* Card 3: FDE */}
          <div className="ub-batch-card">
            <div className="ub-batch-top-row">
              <span className="ub-program-code" style={{ background: '#fef3c7', color: '#92400e' }}>FDE</span>
              <span className="ub-seat-badge">3 Seats Remaining</span>
            </div>
            <h3 className="ub-batch-title">AI Forward Deployment Engineer (FDE)</h3>
            <p className="ub-batch-summary">
              Build and deploy client-ready AI systems across LLMs, RAG, agentic AI workflows, Docker, Kubernetes, and enterprise cloud operations.
            </p>
            <div className="ub-card-actions">
              <button
                type="button"
                className="ub-btn-view-course"
                onClick={() => onNavigate('course-fde')}
              >
                View Full Course Details &rarr;
              </button>
              <button
                type="button"
                className="ub-btn-callback"
                onClick={() => handleCallModalTrigger('FDE')}
              >
                Request Callback for Sep 12 Batch
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="ub-cta-banner">
          <h2>Seats Are Filling Fast for September 12th</h2>
          <p>
            Batch sizes are strictly limited to ensure personalized code reviews and 1-on-1 career guidance for every learner.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCallModalTrigger('bottom_banner')}
            style={{
              background: 'linear-gradient(135deg, #ea580c, #c2410c)',
              border: 'none',
              padding: '1rem 2.2rem',
              fontSize: '1.05rem',
              fontWeight: 800,
              boxShadow: '0 10px 20px rgba(234, 88, 12, 0.4)',
            }}
          >
            Request Immediate Callback for Sep 12 Batch
          </button>
        </div>
      </section>
    </div>
  );
};
