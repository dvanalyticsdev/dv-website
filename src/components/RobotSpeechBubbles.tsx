import React from 'react';
import { motion } from 'framer-motion';

interface RobotSpeechBubblesProps {
  pose: 'idle' | 'wave' | 'programs' | 'benefits' | 'roadmap' | 'footer';
  isClicked: boolean;
  onClick?: () => void;
  hoveredSection: string | null;
  onMinimize?: () => void;
}

const welcomeMessage =
  'Hi, I am EVA. Tap here if you need help with courses or the site.';

export const RobotSpeechBubbles: React.FC<RobotSpeechBubblesProps> = ({
  onClick,
  onMinimize,
}) => {
  return (
    <div className="robot-bubble-container">
      <motion.div
        className="robot-speech-bubble section-aware fixed-welcome"
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 220 }}
        onClick={onClick}
      >
        {onMinimize ? (
          <button
            type="button"
            className="chatbot-minimize-btn bubble-attached"
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize chatbot"
            title="Minimize Eva"
          >
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <path d="M1 1h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}

        <div className="bubble-arrow" />
        <div className="bubble-section-indicator">
          <span className="section-dot" />
          Section Info
        </div>
        <p className="bubble-text">{welcomeMessage}</p>
        <p className="bubble-action-hint">Click to chat with Eva -&gt;</p>
      </motion.div>
    </div>
  );
};

export default RobotSpeechBubbles;
