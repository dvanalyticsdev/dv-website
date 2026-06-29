import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'program' | 'lms'>('program');
  const revealRef = useScrollReveal(activeTab);

  return (
    <section className="benefits-section" id="benefits">
      <div className="benefits-container">
        
        {/* Title Header */}
        <div className="benefits-header reveal-on-scroll">
          <span className="benefits-subtitle">Maximize Your Success</span>
          <h2 className="benefits-title">
            {activeTab === 'program' ? 'Program Benefits' : 'LMS Platform Benefits'}
          </h2>
          
          {/* Decorative Divider */}
          <div className="benefits-title-divider">
            <div className="divider-line"></div>
            <div className="divider-diamond">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="#1e293b"/>
              </svg>
            </div>
            <div className="divider-line"></div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="benefits-tab-switcher reveal-on-scroll delay-1">
          <button 
            className={`tab-btn ${activeTab === 'program' ? 'active' : ''}`}
            onClick={() => setActiveTab('program')}
          >
            Core Program Benefits
          </button>
          <button 
            className={`tab-btn ${activeTab === 'lms' ? 'active' : ''}`}
            onClick={() => setActiveTab('lms')}
          >
            LMS Platform Benefits
          </button>
        </div>

        {/* Benefits Image Display Area */}
        <div className="benefits-image-container" ref={revealRef}>
          {activeTab === 'program' ? (
            <img 
              src="/program-benefit.jpeg" 
              alt="Core Program Benefits" 
              className="benefits-display-image"
              key="program-img"
              loading="lazy"
            />
          ) : (
            <img 
              src="/lms-benefit.jpeg" 
              alt="LMS Platform Benefits" 
              className="benefits-display-image"
              key="lms-img"
              loading="lazy"
            />
          )}
        </div>

      </div>
    </section>
  );
};
