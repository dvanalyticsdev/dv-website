import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './DemoClassModal.css';
import { trackEvent } from '../utils/analytics';

export interface DemoSlot {
  id: string;
  dateStr: string;
  day: string;
  timeStr: string;
  fullLabel: string;
}

export const LATEST_DEMO_SLOT: DemoSlot = {
  id: '2026-10-14-7pm',
  dateStr: '14th October 2026',
  day: 'Wednesday',
  timeStr: '7:00 PM - 8:00 PM IST',
  fullLabel: 'Wed, 14th Oct 2026 (7:00 PM - 8:00 PM IST)',
};

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/BoI03qzI1WU0nbtgYlvqi5';

interface DemoClassModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const DemoClassModal: React.FC<DemoClassModalProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onOpen: externalOnOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isModalOpen = Boolean(externalIsOpen) || internalIsOpen;

  const handleClose = () => {
    setInternalIsOpen(false);
    if (externalOnClose) externalOnClose();
  };

  const handleOpen = () => {
    trackEvent('click_demo_class_btn', { cta_source: 'floating_button' });
    setInternalIsOpen(true);
    if (externalOnOpen) externalOnOpen();
  };

  return (
    <>
      {/* Floating Side Button on right middle border */}
      <button
        type="button"
        className="demo-btn-trigger"
        onClick={handleOpen}
        aria-label="Join Free Demo Class"
      >
        <span className="demo-btn-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        </span>
        <span className="demo-btn-text">Join Free Demo Class</span>
      </button>

      {/* Modal Popup */}
      {isModalOpen &&
        createPortal(
          <div className="aau-modal-overlay demo-modal-overlay" onClick={handleClose}>
            <div className="aau-modal-box demo-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="aau-modal-close" onClick={handleClose} aria-label="Close demo modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="demo-modal-content">
                <div className="demo-modal-header">
                  <div className="demo-topic-badge">FREE DEMO CLASS</div>
                  <h2>Join Free Demo Class</h2>
                  <p>No registration required — direct access via WhatsApp</p>
                </div>

                {/* Single Highlighted Slot Card */}
                <div className="demo-slot-card">
                  <div className="demo-slot-card-header">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>NEXT UPCOMING DEMO SESSION</span>
                  </div>
                  <div className="demo-slot-card-body">
                    <div>
                      <div className="demo-slot-date">{LATEST_DEMO_SLOT.day}, {LATEST_DEMO_SLOT.dateStr}</div>
                      <div className="demo-slot-time">{LATEST_DEMO_SLOT.timeStr}</div>
                    </div>
                    <span className="demo-live-pill">LIVE ONLINE</span>
                  </div>
                </div>

                {/* Prominent WhatsApp Insider Community CTA Card */}
                <div className="demo-whatsapp-card" style={{ marginTop: '1.25rem' }}>
                  <div className="demo-wa-header">
                    <span className="demo-wa-icon" aria-hidden="true">💬</span>
                    <div>
                      <h3>Join Insider Community</h3>
                      <p>No registration needed. Join our official WhatsApp group for instant live demo links &amp; study materials.</p>
                    </div>
                  </div>
                  <a
                    href={WHATSAPP_GROUP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-whatsapp-btn"
                    onClick={() => trackEvent('click_whatsapp_group_join', { slot: LATEST_DEMO_SLOT.fullLabel })}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.146 4.185 4.389-1.148z"/>
                    </svg>
                    Join our insider community
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
