import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './DemoClassModal.css';
import { getAttribution, trackEvent } from '../utils/analytics';

export interface DemoSlot {
  id: string;
  dateStr: string;
  day: string;
  timeStr: string;
  fullLabel: string;
}

export const LATEST_DEMO_SLOT: DemoSlot = {
  id: '2026-09-10-7pm',
  dateStr: '10th September 2026',
  day: 'Thursday',
  timeStr: '7:00 PM - 8:00 PM',
  fullLabel: 'Thu, 10th Sept 2026 (7:00 PM - 8:00 PM)',
};

const DEFAULT_GOOGLE_SHEET_WEBHOOK =
  'https://script.google.com/macros/s/AKfycbwXeiGLZBqT9axl5xLwLN9EC9WLk9qVyIrYyGyH9k3jc5I7fd-jZi72JfUmTqKGkw/exec';

const WHATSAPP_GROUP_LINK =
  'https://chat.whatsapp.com/K2bFv1JrDkrHEXZQQeiTsT?s=cl&p=a&mlu=4&ilr=4';

interface DemoClassModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

interface FormState {
  name: string;
  phone: string;
  selectedSlot: string;
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

  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    selectedSlot: LATEST_DEMO_SLOT.fullLabel,
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!isModalOpen) {
      setFormData({
        name: '',
        phone: '',
        selectedSlot: LATEST_DEMO_SLOT.fullLabel,
      });
      setErrors({});
      setIsSubmitting(false);
      setIsSubmitted(false);
      setSubmitError('');
    }
  }, [isModalOpen]);

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-15 digit phone number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) {
      trackEvent('form_validation_error', {
        form_name: 'demo_class_booking',
        slot: formData.selectedSlot,
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      demoSlot: formData.selectedSlot,
      course: 'Data Science with Gen AI & Agentic AI',
      formType: 'demo_class_booking',
      submittedAt: new Date().toISOString(),
      landingPageUrl: window.location.origin + window.location.pathname,
      currentPageUrl: window.location.href,
      referrer: document.referrer,
      attribution: getAttribution(),
    };

    let postSuccess = false;

    if (DEFAULT_GOOGLE_SHEET_WEBHOOK) {
      try {
        await fetch(DEFAULT_GOOGLE_SHEET_WEBHOOK, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
        postSuccess = true;
      } catch (err) {
        console.warn('Google Sheet submission failed:', err);
      }
    }

    setIsSubmitting(false);

    if (postSuccess || !DEFAULT_GOOGLE_SHEET_WEBHOOK) {
      setIsSubmitted(true);
      trackEvent('submit_demo_class_form', {
        slot: formData.selectedSlot,
      });
    } else {
      trackEvent('form_submit_error', {
        form_name: 'demo_class_booking',
        slot: formData.selectedSlot,
      });
      setSubmitError('Unable to reserve demo seat. Please try again.');
    }
  };

  return (
    <>
      {/* Floating Side Button on right middle border above Counselling */}
      <button
        type="button"
        className="demo-btn-trigger"
        onClick={handleOpen}
        aria-label="Book Free Demo Class"
      >
        <span className="demo-btn-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        </span>
        <span className="demo-btn-text">Book Free Demo Class</span>
      </button>

      {/* Modal Popup */}
      {isModalOpen &&
        createPortal(
          <div className="aau-modal-overlay demo-modal-overlay" onClick={handleClose}>
            <div className="aau-modal-box demo-modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="aau-modal-close" onClick={handleClose} aria-label="Close demo booking modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {isSubmitted ? (
                <div className="demo-modal-content demo-success-state">
                  <div className="demo-modal-icon-badge">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2>Demo Class Seat Reserved!</h2>
                  <p className="demo-success-intro">
                    Thank you, <strong>{formData.name}</strong>! Your seat for <strong>{LATEST_DEMO_SLOT.fullLabel}</strong> is confirmed.
                  </p>

                  {/* Prominent WhatsApp Group CTA */}
                  <div className="demo-whatsapp-card">
                    <div className="demo-wa-header">
                      <span className="demo-wa-icon" aria-hidden="true">💬</span>
                      <div>
                        <h3>Join Official WhatsApp Group</h3>
                        <p>Get instant class access link, session reminders, and free study materials.</p>
                      </div>
                    </div>
                    <a
                      href={WHATSAPP_GROUP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-whatsapp-btn"
                      onClick={() => trackEvent('click_whatsapp_group_join', { slot: formData.selectedSlot })}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.146 4.185 4.389-1.148z"/>
                      </svg>
                      Join WhatsApp Group Now
                    </a>
                  </div>

                  <button type="button" className="btn demo-close-btn" onClick={handleClose}>
                    Done &amp; Close
                  </button>
                </div>
              ) : (
                <div className="demo-modal-content">
                  <div className="demo-modal-header">
                    <h2>Book a Free Demo Class</h2>
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
                        <div className="demo-slot-date">{LATEST_DEMO_SLOT.dateStr} ({LATEST_DEMO_SLOT.day})</div>
                        <div className="demo-slot-time">{LATEST_DEMO_SLOT.timeStr}</div>
                      </div>
                      <span className="demo-live-pill">LIVE ONLINE</span>
                    </div>
                  </div>

                  <form className="demo-form" onSubmit={handleSubmit}>
                    <div className="demo-form-group">
                      <label htmlFor="demo-name">Full Name *</label>
                      <input
                        id="demo-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="call-form-group demo-form-group">
                      <label htmlFor="demo-phone">Phone / WhatsApp Number *</label>
                      <input
                        id="demo-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        className={errors.phone ? 'input-error' : ''}
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

                    {submitError && <div className="error-text demo-global-error">{submitError}</div>}

                    <button
                      type="submit"
                      className="btn btn-enroll-main demo-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Reserving Seat...' : 'Reserve Free Seat Now'}
                    </button>

                    <p className="demo-footer-note">100% Free • No Credit Card Required • Instant Confirmation</p>
                  </form>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
