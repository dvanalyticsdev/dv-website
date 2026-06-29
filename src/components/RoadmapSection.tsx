import React, { useState } from 'react';

export const RoadmapSection: React.FC = () => {
  const [activeRoadmap, setActiveRoadmap] = useState<'ds' | 'cyber'>('ds');

  return (
    <section className="roadmap-section reveal-on-scroll" id="roadmap">
      <div className="roadmap-container">
        
        {/* Title Header */}
        <div className="programs-section-header">
          <div className="section-title-wrapper">
            <h2 className="section-title-divider">
              A Complete Road Map for Data Scientists and Cyber Specialist
            </h2>
          </div>
        </div>

        {/* Buttons to switch between roadmaps */}
        <div className="roadmap-buttons-container">
          <button 
            className={`roadmap-btn ${activeRoadmap === 'ds' ? 'active' : ''}`}
            onClick={() => setActiveRoadmap('ds')}
          >
            Data Scientist Roadmap
          </button>
          <button 
            className={`roadmap-btn ${activeRoadmap === 'cyber' ? 'active' : ''}`}
            onClick={() => setActiveRoadmap('cyber')}
          >
            Cyber Security Roadmap
          </button>
        </div>

        {/* Image Display area */}
        <div className="roadmap-image-container">
          {activeRoadmap === 'ds' ? (
            <img 
              src="/data-scientist-roadmap.jpeg" 
              alt="Data Scientist Roadmap" 
              className="roadmap-display-image"
              key="ds-img"
              loading="lazy"
            />
          ) : (
            <img 
              src="/cyber-security-roadmap.jpeg" 
              alt="Cyber Security Roadmap" 
              className="roadmap-display-image"
              key="cyber-img"
              loading="lazy"
            />
          )}
        </div>

      </div>
    </section>
  );
};
