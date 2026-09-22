import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './GetACallButton.css';
import { getAttribution, trackEvent } from '../utils/analytics';

const COURSE_OPTIONS = [
  'Advanced Program in Industrial Data Science with AI Deployment (APIDS)',
  'Advanced Program in Industrial Data Science with Gen AI (APIDA)',
  'Data Analytics Specialist (DAS)',
  'AI Integrated Advanced Program in Cybersecurity & Forensics (APCF)',
  'AI Forward Deployment Engineer (FDE)',
  'Other / General Inquiry',
];

const DEFAULT_GOOGLE_SHEET_WEBHOOK =
  'https://script.google.com/macros/s/AKfycbwXqmtKC4zYtmWUJT71D0Z7ZzBKp7qPLLDeOTGkbH5P1FVLN6f_VZ4Y7y6lhBuqvBc/exec';

interface FormState {
  name: string;
  phone: string;
  course: string;
}

const initialFormState: FormState = {
  name: '',
  phone: '',
  course: COURSE_OPTIONS[0],
};

export const GetACallButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; course?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      setErrors({});
      setIsSubmitting(false);
      setIsSubmitted(false);
      setSubmitError('');
    }
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string; course?: string } = {};
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

    if (!formData.course) {
      newErrors.course = 'Please select a course';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        form_name: 'get_a_call',
        course_name: formData.course,
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      course: formData.course,
      submittedAt: new Date().toISOString(),
      landingPageUrl: window.location.origin + window.location.pathname,
      currentPageUrl: window.location.href,
      referrer: document.referrer,
      attribution: getAttribution(),
    };

    let postSuccess = false;

    // Send to Google Sheet Webhook if configured
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
      trackEvent('submit_get_a_call_form', {
        course_name: formData.course,
      });
    } else {
      trackEvent('form_submit_error', {
        form_name: 'get_a_call',
        course_name: formData.course,
      });
      setSubmitError('Unable to submit request. Please try again.');
    }
  };

  return (
    <>
      {/* Floating Side Button on right middle border */}
      <button
        type="button"
        className="get-call-btn-trigger"
        onClick={() => {
          trackEvent('click_get_a_call', { cta_source: 'floating_button' });
          setIsOpen(true);
        }}
        aria-label="Book Free Counselling"
      >
        <span className="get-call-btn-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
        <span className="get-call-btn-text">Book Free Counselling</span>
      </button>

      {/* Modal Popup */}
      {isOpen &&
        createPortal(
          <div className="aau-modal-overlay call-modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="aau-modal-box call-modal-box" onClick={(e) => e.stopPropagation()}>
              <button
                className="aau-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close form"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {isSubmitted ? (
                <div className="call-modal-content call-success-state">
                  <div className="call-modal-icon-badge">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2>Booking Received!</h2>
                  <p>
                    Thank you, <strong>{formData.name}</strong>! We have received your booking for a free counselling session on <strong>{formData.course}</strong>.
                  </p>
                  <p className="call-support-text">
                    Our career expert will reach out to you at <strong>{formData.phone}</strong> shortly.
                  </p>
                  <button type="button" className="btn btn-enroll-main" onClick={() => setIsOpen(false)}>
                    Close
                  </button>
                </div>
              ) : (
                <div className="call-modal-content">
                  <div className="call-modal-header">
                    <h2>Book Free Counselling</h2>
                    <p>Enter your details to schedule a 1-on-1 session with our career experts.</p>
                  </div>

                  <form className="call-form" onSubmit={handleSubmit}>
                    <div className="call-form-group">
                      <label htmlFor="call-name">Name *</label>
                      <input
                        id="call-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="call-form-group">
                      <label htmlFor="call-phone">Phone Number *</label>
                      <input
                        id="call-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        className={errors.phone ? 'input-error' : ''}
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

                    <div className="call-form-group">
                      <label htmlFor="call-course">Course Interested *</label>
                      <select
                        id="call-course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={errors.course ? 'input-error' : ''}
                      >
                        {COURSE_OPTIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.course && <span className="error-text">{errors.course}</span>}
                    </div>

                    {submitError && <div className="error-text call-global-error">{submitError}</div>}

                    <button
                      type="submit"
                      className="btn btn-enroll-main call-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Booking Session...' : 'Book Free Counselling'}
                    </button>
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
