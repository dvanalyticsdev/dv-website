import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface SampleVideoSectionProps {
  onEnroll: () => void;
}

export const SampleVideoSection: React.FC<SampleVideoSectionProps> = ({ onEnroll }) => {
  const [isLmsModalOpen, setIsLmsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    if (!isLmsModalOpen && !isVideoModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLmsModalOpen(false);
        setIsVideoModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isLmsModalOpen, isVideoModalOpen]);

  const handleCopy = (text: string, type: 'email' | 'password') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(type);
        setTimeout(() => setCopiedText(null), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <>
      <section className="sample-promo-section reveal-on-scroll">
        <div className="promo-container">
          {/* Main CTA Row */}
          <div className="promo-grid">
            <div className="promo-left-col">
              {/* Buttons Row */}
              <div className="promo-buttons-row">
                <button 
                  className="btn btn-watch-video" 
                  onClick={() => setIsLmsModalOpen(true)}
                  aria-label="Glimpse of DV Analytics"
                >
                  WATCH SAMPLE CLASS VIDEO
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </button>

                <button 
                  className="btn btn-enroll-now" 
                  onClick={onEnroll}
                  aria-label="Enroll Now"
                >
                  ENROLL NOW
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </button>
              </div>

              {/* Rating Card */}
              <div className="promo-rating-card">
                <div className="rating-score">4.9</div>
                <div className="rating-details">
                  <div className="rating-label">STAR RATING</div>
                  <div className="rating-students">9000+ Students Placed</div>
                </div>
                <div className="rating-stars">
                  <svg className="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <svg className="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <svg className="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <svg className="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  {/* Half or nearly full star for 4.9 */}
                  <svg className="star-icon star-90" width="18" height="18" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="grad-49">
                        <stop offset="90%" stopColor="currentColor" />
                        <stop offset="90%" stopColor="#e2e8f0" />
                      </linearGradient>
                    </defs>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#grad-49)" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Play Button Column */}
            <div className="promo-right-col">
              <button 
                className="promo-play-btn" 
                onClick={() => setIsVideoModalOpen(true)}
                aria-label="Play Promo Video"
              >
                <span className="pulse-ring ring-1"></span>
                <span className="pulse-ring ring-2"></span>
                <span className="pulse-ring ring-3"></span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="play-triangle">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </button>
              <span className="play-btn-text">Glimpse of DV Analytics</span>
            </div>
          </div>
        </div>

        {/* Render at the body level so transformed page sections cannot offset it. */}
        {isLmsModalOpen && createPortal(
          <div className="promo-local-overlay" onClick={() => setIsLmsModalOpen(false)}>
            <div className="aau-modal-box promo-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="promo-modal-close" onClick={() => setIsLmsModalOpen(false)} aria-label="Close modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="promo-modal-content">
                <div className="modal-header-icon">🎓</div>
                <h2 className="promo-modal-title">Free Demo LMS Access</h2>
                
                <div className="credentials-container">
                  <div className="credential-field">
                    <div className="credential-label">User ID:</div>
                    <div 
                      className="credential-value copyable"
                      onClick={() => handleCopy('learner@dvanalyticsmds.com', 'email')}
                      title="Click to copy"
                    >
                      learner@dvanalyticsmds.com
                      <span className="copy-badge">
                        {copiedText === 'email' ? 'Copied!' : 'Copy'}
                      </span>
                    </div>
                  </div>

                  <div className="credential-field">
                    <div className="credential-label">Password:</div>
                    <div 
                      className="credential-value copyable"
                      onClick={() => handleCopy('learner@1', 'password')}
                      title="Click to copy"
                    >
                      learner@1
                      <span className="copy-badge">
                        {copiedText === 'password' ? 'Copied!' : 'Copy'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="copy-hint">Click on User ID or Password to copy</p>

                <a 
                  href="https://edu.dvanalyticsmds.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-go-lms"
                >
                  Go to LMS Login
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
      </section>

      {/* Video Player Modal (Rendered in Portal at the body level for true viewport centering) */}
      {isVideoModalOpen && createPortal(
        <div
          className="aau-modal-overlay video-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="DV Analytics glimpse video"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="aau-modal-close video-modal-close" onClick={() => setIsVideoModalOpen(false)} aria-label="Close video">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="video-player-container">
              <video
                className="sample-class-video"
                controls
                autoPlay
                playsInline
                preload="metadata"
                controlsList="nodownload"
                disablePictureInPicture
                aria-label="DV Analytics glimpse video"
                onEnded={() => setIsVideoModalOpen(false)}
              >
                <source src="/sample-class.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
