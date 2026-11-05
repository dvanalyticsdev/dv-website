import React from 'react';
import './HeroBenefitBadges.css';

export const HeroBenefitBadges: React.FC = () => {
  return (
    <div className="hero-badges-grid">
      {/* 1. Trained By Industry Experts */}
      <div className="hero-badge-card badge-experts">
        <div className="hero-badge-content">
          <h3 className="hero-badge-title">
            <span className="badge-title-top">TRAINED BY</span>
            <span className="badge-title-accent">INDUSTRY EXPERTS</span>
          </h3>
          <div className="hero-badge-divider" />
          <p className="hero-badge-text">
            Learn from experienced professionals who bring real-world knowledge to every session.
          </p>
        </div>
        <div className="hero-badge-art" aria-hidden="true">
          <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Gear */}
            <circle cx="106" cy="24" r="8" fill="#0a1931" />
            <circle cx="106" cy="24" r="4" fill="#ffffff" />
            {/* Board / Presentation Stand */}
            <rect x="52" y="24" width="56" height="38" rx="2" stroke="#0a1931" strokeWidth="2.5" fill="#f8fafc" />
            <line x1="50" y1="24" x2="110" y2="24" stroke="#0a1931" strokeWidth="2.5" />
            <line x1="50" y1="62" x2="110" y2="62" stroke="#0a1931" strokeWidth="2.5" />
            {/* Rising Bars on chart */}
            <rect x="62" y="47" width="5" height="11" fill="#0a1931" rx="0.5" />
            <rect x="71" y="41" width="5" height="17" fill="#0a1931" rx="0.5" />
            <rect x="80" y="35" width="5" height="23" fill="#0a1931" rx="0.5" />
            <rect x="89" y="29" width="5" height="29" fill="#0a1931" rx="0.5" />
            <path d="M58 49L69 40L79 43L92 28" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Speaker / Trainer */}
            <circle cx="30" cy="34" r="7" fill="#0a1931" />
            <path d="M20 62c0-6 4.5-11 10-11s10 5 10 11v12H20v-12z" fill="#0a1931" />
            {/* Shirt & tie */}
            <path d="M28.5 51h3l-.8 7h-1.4l-.8-7z" fill="#ef4444" />
            <path d="M26 51l4 3.5 4-3.5" stroke="#ffffff" strokeWidth="1.2" />
            {/* Pointer Stick */}
            <path d="M37 52l18-13" stroke="#0a1931" strokeWidth="2.8" strokeLinecap="round" />
            {/* Audience Heads */}
            <circle cx="22" cy="80" r="5.5" fill="#0a1931" />
            <path d="M14 98c0-5 3.5-9 8-9s8 4 8 9" fill="#0a1931" />
            <circle cx="42" cy="80" r="5.5" fill="#0a1931" />
            <path d="M34 98c0-5 3.5-9 8-9s8 4 8 9" fill="#0a1931" />
            <circle cx="62" cy="80" r="5.5" fill="#0a1931" />
            <path d="M54 98c0-5 3.5-9 8-9s8 4 8 9" fill="#0a1931" />
          </svg>
        </div>
      </div>

      {/* 2. Industry Project Hands-On */}
      <div className="hero-badge-card badge-projects">
        <div className="hero-badge-content">
          <h3 className="hero-badge-title">
            <span className="badge-title-top">INDUSTRY</span>
            <span className="badge-title-accent">PROJECT HANDS-ON</span>
          </h3>
          <div className="hero-badge-divider" />
          <p className="hero-badge-text">
            Work on real-time industry projects and gain practical experience that sets you apart.
          </p>
        </div>
        <div className="hero-badge-art" aria-hidden="true">
          <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Monitor */}
            <rect x="20" y="16" width="68" height="46" rx="3" fill="#0a1931" />
            <rect x="23" y="19" width="62" height="38" rx="1.5" fill="#0f2648" />
            <path d="M46 62v8h16v-8" stroke="#0a1931" strokeWidth="3" />
            <rect x="38" y="70" width="32" height="3" rx="1.5" fill="#0a1931" />
            {/* Monitor Code & Analytics */}
            <line x1="28" y1="26" x2="48" y2="26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="32" x2="44" y2="32" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="38" x2="52" y2="38" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            {/* Pie */}
            <circle cx="70" cy="34" r="10" fill="#1e3a6a" />
            <path d="M70 24A10 10 0 0 1 80 34H70V24z" fill="#ef4444" />
            <rect x="58" y="47" width="3" height="7" fill="#60a5fa" rx="1" />
            <rect x="64" y="44" width="3" height="10" fill="#60a5fa" rx="1" />
            <rect x="70" y="41" width="3" height="13" fill="#60a5fa" rx="1" />
            {/* Laptop in foreground */}
            <rect x="28" y="52" width="36" height="24" rx="2" fill="#0a1931" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="31" y="55" width="30" height="17" rx="1" fill="#0a1931" />
            <path d="M41 61l-3 3 3 3M51 61l3 3-3 3M47 60l-2 8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 76h48a2 2 0 0 1 2 2v1H20v-1a2 2 0 0 1 2-2z" fill="#0a1931" />
            {/* Checklist */}
            <rect x="72" y="45" width="36" height="46" rx="3" fill="#ffffff" stroke="#0a1931" strokeWidth="2.5" />
            <rect x="83" y="41" width="14" height="6" rx="2" fill="#0a1931" />
            <path d="M78 56l2 2 4-4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="87" y1="56" x2="101" y2="56" stroke="#0a1931" strokeWidth="2" strokeLinecap="round" />
            <path d="M78 67l2 2 4-4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="87" y1="67" x2="101" y2="67" stroke="#0a1931" strokeWidth="2" strokeLinecap="round" />
            <path d="M78 78l2 2 4-4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="87" y1="78" x2="101" y2="78" stroke="#0a1931" strokeWidth="2" strokeLinecap="round" />
            <circle cx="103" cy="42" r="5" fill="#ef4444" />
            <circle cx="103" cy="42" r="2.5" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* 3. LMS Access 24/7 */}
      <div className="hero-badge-card badge-lms">
        <div className="hero-badge-content">
          <h3 className="hero-badge-title">
            <span className="badge-title-top">LMS ACCESS</span>
            <span className="badge-title-accent">24/7</span>
          </h3>
          <div className="hero-badge-divider" />
          <p className="hero-badge-text">
            Get 24/7 access to recorded sessions, resources, and learning materials anytime, anywhere.
          </p>
        </div>
        <div className="hero-badge-art" aria-hidden="true">
          <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cloud arc */}
            <path d="M38 56C38 32 56 16 76 16c14 0 26 8 30 20" stroke="#0a1931" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* 24/7 Cloud */}
            <path d="M76 38c-1.5 0-3-.3-4.2-.8A13.5 13.5 0 0 1 84 20c7.5 0 13.5 6 13.5 13.5 0 .5 0 1-.1 1.5 1.5-.6 3.1-1 4.8-1 6.6 0 12 5.4 12 12s-5.4 12-12 12H76a11 11 0 0 1-11-11c0-5.8 4.5-10.6 10.2-11-.1-.7-.2-1.3-.2-2z" fill="#f8fafc" stroke="#0a1931" strokeWidth="2.5" />
            <text x="83" y="47" fill="#0a1931" fontSize="11" fontWeight="900" fontFamily="sans-serif">24/7</text>
            {/* Laptop */}
            <rect x="24" y="45" width="62" height="42" rx="3" fill="#0a1931" />
            <rect x="27" y="48" width="56" height="35" rx="1.5" fill="#0a1d37" />
            {/* Cap */}
            <path d="M46 56l-12 6 12 6 12-6-12-6z" fill="#ffffff" />
            <path d="M38 64.5v5c0 2 3.6 4 8 4s8-2 8-4v-5" fill="#ffffff" />
            <path d="M54 62v8" stroke="#ef4444" strokeWidth="1.5" />
            {/* Video Player */}
            <line x1="62" y1="52" x2="62" y2="78" stroke="#1e3a6a" strokeWidth="1.5" />
            <circle cx="71" cy="60" r="5" fill="#ffffff" />
            <polygon points="70,57 74,60 70,63" fill="#ef4444" />
            <line x1="68" y1="69" x2="78" y2="69" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="74" x2="75" y2="74" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Base */}
            <path d="M16 87h78a2 2 0 0 1 2 2v2H14v-2a2 2 0 0 1 2-2z" fill="#0a1931" />
          </svg>
        </div>
      </div>

      {/* 4. Resume & Placement */}
      <div className="hero-badge-card badge-placement">
        <div className="hero-badge-content">
          <h3 className="hero-badge-title">
            <span className="badge-title-top">RESUME &amp;</span>
            <span className="badge-title-accent">PLACEMENT</span>
          </h3>
          <div className="hero-badge-divider" />
          <p className="hero-badge-text">
            From resume building to interview preparation - we support you at every step to help you land your dream job.
          </p>
        </div>
        <div className="hero-badge-art" aria-hidden="true">
          <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M46 48C46 30 58 18 74 18c10 0 18 5 22 12" stroke="#0a1931" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M92 24l16-12m0 0v10m0-10H98" stroke="#0a1931" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Bars */}
            <rect x="92" y="48" width="6" height="35" fill="#0a1931" rx="1" />
            <rect x="101" y="36" width="6" height="47" fill="#0a1931" rx="1" />
            {/* Resume Board */}
            <rect x="48" y="36" width="38" height="48" rx="3" fill="#ffffff" stroke="#0a1931" strokeWidth="2.5" />
            <rect x="59" y="32" width="16" height="6" rx="2" fill="#0a1931" />
            {/* Candidate avatar */}
            <circle cx="60" cy="48" r="4" fill="#0a1931" />
            <path d="M54 58c0-3 2.5-5 6-5s6 2 6 5" fill="#0a1931" />
            <line x1="69" y1="46" x2="81" y2="46" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="69" y1="51" x2="78" y2="51" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            {/* Checks */}
            <path d="M53 65l2 2 3-3" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="61" y1="65" x2="80" y2="65" stroke="#0a1931" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M53 73l2 2 3-3" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="61" y1="73" x2="80" y2="73" stroke="#0a1931" strokeWidth="1.5" strokeLinecap="round" />
            {/* Briefcase */}
            <rect x="32" y="62" width="28" height="22" rx="3" fill="#0a1931" />
            <path d="M40 62V58a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" stroke="#0a1931" strokeWidth="2" fill="none" />
            <rect x="44" y="69" width="4" height="4" rx="1" fill="#ffffff" />
            {/* Glass */}
            <circle cx="76" cy="65" r="9" fill="#ffffff" stroke="#0a1931" strokeWidth="3" />
            <line x1="82.5" y1="71.5" x2="94" y2="83" stroke="#0a1931" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
