import React from 'react';
import './DemoAnnouncementBar.css';

interface DemoAnnouncementBarProps {
  onOpenDemoModal: () => void;
}

export const DemoAnnouncementBar: React.FC<DemoAnnouncementBarProps> = ({ onOpenDemoModal }) => {
  return (
    <div className="demo-top-bar">
      <div className="demo-top-bar-container">
        <span className="demo-top-bar-badge">LIVE DEMO WEBINAR</span>
        <span className="demo-top-bar-text">
          Data Science with Gen AI &amp; Agentic AI — <strong>Sept 12 @ 12 PM, Sept 16 &amp; 19 @ 7 PM</strong>
        </span>
        <button
          type="button"
          className="demo-top-bar-btn"
          onClick={onOpenDemoModal}
        >
          🎓 Book Free Demo Class
        </button>
      </div>
    </div>
  );
};
