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
          Data Science with Gen AI &amp; Agentic AI — <strong>Wednesday, 14th Oct @ 7:00 PM - 8:00 PM</strong>
        </span>
        <button
          type="button"
          className="demo-top-bar-btn"
          onClick={onOpenDemoModal}
        >
          🎓 Join Free Demo Class
        </button>
      </div>
    </div>
  );
};
