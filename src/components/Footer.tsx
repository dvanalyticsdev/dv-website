import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" data-section="footer">
      <div className="footer-container">
        
        {/* Section Header matching site theme */}
        <div className="footer-header">
          <span className="footer-subtitle">Our Presence</span>
          <h2 className="footer-title">Visit Our Offices</h2>
          <div className="footer-header-line"></div>
        </div>

        {/* 3-Column Card Grid matching site theme */}
        <div className="center-cards-grid">

          {/* Bangalore Center */}
          <div className="center-card bangalore">
            <div className="center-card-footer-panel">
              <div className="footer-flex-row">
                <div className="footer-col company-col">
                  <div className="center-header-row">
                    <span className="center-badge teal">Bangalore</span>
                    <div className="center-icon-wrapper teal">
                      <svg className="center-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                  <h3 className="center-company">
                    <a href="https://www.dvanalyticsmds.com/" target="_blank" rel="noreferrer" className="center-link">
                      DV Data &amp; Analytics Private Limited
                    </a>
                  </h3>
                </div>

                <div className="footer-col address-col">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <p className="info-text">
                    #52, 2nd Floor:<br />
                    Malleshpalya Maruthinagar Bengaluru.<br />
                    Bangalore 560075<br />
                    India
                  </p>
                </div>

                <div className="footer-col phone-col">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <p className="info-text">
                    <a href="tel:+919019030033" className="center-link center-link-phone">(+91) 9019 030 033</a>
                    <a href="tel:+918095881188" className="center-link center-link-phone">(+91) 8095 881 188</a>
                  </p>
                </div>

                <div className="footer-col email-col">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <p className="info-text">
                    <a href="mailto:info@dvanalyticsmds.com" className="center-link">info@dvanalyticsmds.com</a>
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Bhubaneswar Center */}
          <div className="center-card bhubaneswar">
            <div className="center-card-footer-panel">
              <div className="footer-flex-row">
                <div className="footer-col company-col">
                  <div className="center-header-row">
                    <span className="center-badge teal">Bhubaneswar</span>
                    <div className="center-icon-wrapper teal">
                      <svg className="center-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                  <h3 className="center-company">
                    <a href="https://www.dvanalyticsmds.com/" target="_blank" rel="noreferrer" className="center-link">
                      DV Data &amp; Analytics Private Limited
                    </a>
                  </h3>
                </div>

                <div className="footer-col address-col">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <p className="info-text">
                    Plot No A/7<br />
                    Adjacent to Maharaja Cine Complex, Bhoinagar, Acharya Vihar<br />
                    Bhubaneswar 751022<br />
                    India
                  </p>
                </div>

                <div className="footer-col phone-col">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <p className="info-text">
                    <a href="tel:+918095881188" className="center-link center-link-phone">+91 8095 881 188</a>
                    <a href="tel:+918249430414" className="center-link center-link-phone">+91 8249 430 414</a>
                  </p>
                </div>

                <div className="footer-col email-col">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <p className="info-text">
                    <a href="mailto:info@dvanalyticsmds.com" className="center-link">info@dvanalyticsmds.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright matching site layout */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright-text">
            Copyright © 2026 DV Analytics
          </p>
        </div>

      </div>
    </footer>
  );
};
