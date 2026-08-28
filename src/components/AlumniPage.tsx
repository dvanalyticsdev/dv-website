import React from 'react';
import { alumniData } from '../data/alumniData';
import './AlumniPage.css';

interface AlumniPageProps {
  onEnroll?: () => void;
}

export const AlumniPage: React.FC<AlumniPageProps> = ({ onEnroll }) => {
  // Helper to split education qualification into Degree/Course and College/Institution
  const parseQualification = (qual: string) => {
    const trimmed = qual.trim();
    
    // Try splitting by comma
    const commaIndex = trimmed.indexOf(',');
    if (commaIndex !== -1) {
      return {
        degree: trimmed.substring(0, commaIndex).trim(),
        institution: trimmed.substring(commaIndex + 1).trim()
      };
    }

    // Try splitting by parenthesis e.g. "B.E ( Mechanical engineering)"
    const parenMatch = trimmed.match(/(.*?)\((.*?)\)/);
    if (parenMatch) {
      return {
        degree: parenMatch[1].trim(),
        institution: parenMatch[2].trim()
      };
    }

    // Try splitting by common separators or patterns e.g. "Btech IIT Roorkee" or "MBA Finance"
    const collegeKeywords = ['iit', 'vssut', 'iter', 'school', 'university', 'college'];
    const lowerQual = trimmed.toLowerCase();
    
    for (const keyword of collegeKeywords) {
      const idx = lowerQual.indexOf(keyword);
      if (idx !== -1) {
        return {
          degree: trimmed.substring(0, idx).trim(),
          institution: trimmed.substring(idx).trim()
        };
      }
    }

    // Fallback
    return {
      degree: trimmed,
      institution: ''
    };
  };

  return (
    <div className="alumni-page-container">
      {/* Hero Section */}
      <section className="alumni-hero-section">
        <div className="alumni-hero-overlay"></div>
        <div className="alumni-hero-content container text-center">
          <span className="alumni-subtitle">Elite Placements</span>
          <h1 className="alumni-title">Meet Our Alumni</h1>
          <div className="alumni-title-underline"></div>
          <p className="alumni-lead">
            Discover how graduates from all academic backgrounds—including engineering, management, 
            science, and non-technical fields—successfully transitioned into high-paying data roles at top-tier global companies.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="alumni-main-section container">
        {/* Alumni Cards Grid */}
        <div className="alumni-grid">
          {alumniData.map((alumnus, idx) => {
            const { degree, institution } = parseQualification(alumnus.qualification);
            
            return (
              <div key={idx} className="alumni-card">
                {/* Decorative Elements */}
                {/* Top Left Dark Blue Corner Wave */}
                <div className="card-decor-wave top-left">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 H100 C60 0, 0 40, 0 100 Z" fill="#051f40" />
                  </svg>
                </div>
                
                {/* Bottom Right Light Blue Corner Wave */}
                <div className="card-decor-wave bottom-right">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M100 100 H0 C40 100, 100 60, 100 0 Z" fill="#1b3b6f" />
                  </svg>
                </div>

                {/* Dot Grid Accents */}
                <div className="card-decor-dots left">
                  <svg width="24" height="48" viewBox="0 0 24 48" fill="none">
                    <circle cx="3" cy="3" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="3" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="3" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="12" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="12" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="12" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="21" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="21" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="21" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="30" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="30" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="30" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="39" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="39" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="39" r="1.2" fill="#cbd5e1" />
                  </svg>
                </div>
                
                <div className="card-decor-dots right">
                  <svg width="24" height="48" viewBox="0 0 24 48" fill="none">
                    <circle cx="3" cy="3" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="3" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="3" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="12" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="12" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="12" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="21" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="21" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="21" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="30" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="30" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="30" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="39" r="1.2" fill="#cbd5e1" />
                    <circle cx="12" cy="39" r="1.2" fill="#cbd5e1" />
                    <circle cx="21" cy="39" r="1.2" fill="#cbd5e1" />
                  </svg>
                </div>

                {/* Sparkle Details */}
                <div className="card-decor-sparkle sparkle-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#1b3b6f" opacity="0.6"/>
                  </svg>
                </div>
                
                <div className="card-decor-sparkle sparkle-right">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#ef5323" opacity="0.8"/>
                  </svg>
                </div>

                <div className="card-decor-confetti confetti-top"></div>
                <div className="card-decor-confetti confetti-mid"></div>

                {/* Avatar Container */}
                <div className="alumni-avatar-container">
                  <img 
                    src={alumnus.image || '/avatar-placeholder.png'} 
                    alt={alumnus.name} 
                    className="alumni-avatar-img"
                    loading="lazy"
                    style={{ 
                      objectPosition: alumnus.objectPosition,
                      transform: alumnus.transform
                    }}
                  />
                </div>

                {/* Card Content Body */}
                <div className="alumni-card-body text-center">
                  <h3 className="alumni-card-name">{alumnus.name}</h3>
                  
                  {/* Decorative divider line with circle */}
                  <div className="alumni-card-divider">
                    <span className="divider-line"></span>
                    <span className="divider-circle"></span>
                    <span className="divider-line"></span>
                  </div>

                  {/* Educational Details Block */}
                  <div className="alumni-info-block">
                    <div className="alumni-info-icon-wrapper">
                      <svg className="alumni-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                      </svg>
                    </div>
                    <div className="alumni-info-content">
                      <div className="alumni-info-label">EDUCATION</div>
                      <div className="alumni-info-degree">{degree}</div>
                      {institution && <div className="alumni-info-college">{institution}</div>}
                    </div>
                  </div>

                  {/* Company Details Block */}
                  <div className="alumni-info-block">
                    <div className="alumni-info-icon-wrapper">
                      <svg className="alumni-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                    </div>
                    <div className="alumni-info-content">
                      <div className="alumni-info-label">COMPANY GOT HIRED</div>
                      {alumnus.logo ? (
                        <div className="alumni-company-logo-wrapper">
                          <img 
                            src={alumnus.logo} 
                            alt={alumnus.company} 
                            className="alumni-company-logo"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <span className="alumni-company-name-text">{alumnus.company}</span>
                        </div>
                      ) : (
                        <div className="alumni-info-company">{alumnus.company}</div>
                      )}
                    </div>
                  </div>

                  {/* LinkedIn Footer Link */}
                  {alumnus.linkedin ? (
                    <a 
                      href={alumnus.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="alumni-linkedin-link"
                      title={`Connect with ${alumnus.name} on LinkedIn`}
                    >
                      <div className="linkedin-icon-wrapper">
                        <svg className="linkedin-svg-large" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </div>
                      <span className="linkedin-text-cta">Connect on LinkedIn</span>
                    </a>
                  ) : (
                    <div className="alumni-linkedin-disabled">
                      No LinkedIn Profile
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* bottom CTA section */}
      <section className="alumni-cta-section text-center">
        <div className="alumni-cta-container container">
          <h2>Ready to Build Your Own Success Story?</h2>
          <p>
            Join our job-oriented programs and get skilled by industry leaders. Take the first step 
            towards your career transition in Data Analytics, Data Science, or Cybersecurity.
          </p>
          <button 
            type="button" 
            onClick={onEnroll} 
            className="btn btn-primary btn-large"
          >
            Enroll in our Programs
          </button>
        </div>
      </section>
    </div>
  );
};
