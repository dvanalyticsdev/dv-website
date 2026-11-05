import React from 'react';
import './HeroMobileContent.css';

export const HeroMobileContent: React.FC = () => {
  return (
    <div className="hero-mobile-text-banner">
      <p className="mobile-hero-kicker">Become An</p>
      <h1 className="mobile-hero-main-heading">
        Industry Ready
        <span className="highlight-cyan">EXPERT</span>
      </h1>

      <div className="mobile-hero-tracks">
        <span className="mobile-track-badge track-ds">Data Scientist</span>
        <span className="mobile-track-and">AND</span>
        <span className="mobile-track-badge track-cyber">Cybersecurity</span>
      </div>

      <div className="mobile-hero-pro-title">Professional</div>

      {/* Trust Box */}
      <div className="mobile-hero-trust-box">
        <div className="mobile-trust-stats-row">
          <svg className="mobile-trust-trophy" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
          </svg>
          <span className="mobile-trust-num">10,000+</span>
          <span className="mobile-trust-label">Successful Professionals</span>
        </div>
        <span className="mobile-trust-pill">
          Trusted by Students &amp; Professionals Across India &amp; Abroad
        </span>
      </div>

      <h2 className="mobile-hero-subkicker">
        Any Graduate Can Be An IT Professional
      </h2>

      {/* 5 Quick Features */}
      <div className="mobile-hero-feature-row">
        <div className="mobile-feature-item">
          <div className="mobile-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="mobile-feature-text">Expert Trainers</span>
        </div>

        <div className="mobile-feature-item">
          <div className="mobile-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <polygon points="10 8 16 10 10 12" fill="currentColor" />
            </svg>
          </div>
          <span className="mobile-feature-text">Live Practical Training</span>
        </div>

        <div className="mobile-feature-item">
          <div className="mobile-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <span className="mobile-feature-text">Real Time Projects</span>
        </div>

        <div className="mobile-feature-item">
          <div className="mobile-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
          <span className="mobile-feature-text">Certificates &amp; Placement</span>
        </div>

        <div className="mobile-feature-item">
          <div className="mobile-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="mobile-feature-text">Students &amp; Pros</span>
        </div>
      </div>
    </div>
  );
};
