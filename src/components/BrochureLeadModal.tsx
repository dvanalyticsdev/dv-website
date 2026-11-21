import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { getCrmCourseMapping } from '../data/crmCourseMapping';
import { getCourseMeta } from '../data/courseMeta';
import { appendAttributionToPayload, trackEvent } from '../utils/analytics';
import { recordLeadSubmission } from '../services/leadTrackingService';
import {
  EMAIL_MAX_LENGTH,
  isHoneypotTriggered,
  NAME_MAX_LENGTH,
  PHONE_EXACT_LENGTH,
  validateEmail,
  validateIndianPhone,
  validateName,
} from '../utils/formValidation';

interface BrochureLeadModalProps {
  courseId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
};

const CRM_ELEMENTOR_WEBHOOK_URL = 'https://crm.dvanalyticsmds.in/api/webhook/elementor-lead';

const getCrmElementorWebhookUrl = () => CRM_ELEMENTOR_WEBHOOK_URL;

export const BrochureLeadModal: React.FC<BrochureLeadModalProps> = ({ courseId, isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormState>(initialFormState);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    phone: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const course = useMemo(() => getCourseMeta(courseId ?? undefined), [courseId]);
  const crmCourse = useMemo(() => getCrmCourseMapping(courseId), [courseId]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      setHoneypot('');
      setErrors(initialFormState);
      setTouched({ name: false, email: false, phone: false });
      setIsSubmitted(false);
      setIsSubmitting(false);
      setSubmitError('');
    }
  }, [isOpen]);

  const validateSingleField = (fieldName: keyof FormState, value: string): string => {
    if (fieldName === 'name') return validateName(value);
    if (fieldName === 'phone') return validateIndianPhone(value);
    if (fieldName === 'email') return validateEmail(value);
    return '';
  };

  const isFormValid = useMemo(() => {
    return (
      !validateName(formData.name) &&
      !validateIndianPhone(formData.phone) &&
      !validateEmail(formData.email)
    );
  }, [formData.name, formData.phone, formData.email]);

  if (!isOpen || !course) {
    return null;
  }

  const validateForm = () => {
    const nextErrors: FormState = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validateIndianPhone(formData.phone),
    };

    setTouched({ name: true, email: true, phone: true });
    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.phone;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormState;

    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));

    setSubmitError('');

    if (touched[fieldName] || value.length > 0) {
      setTouched((current) => ({ ...current, [fieldName]: true }));
      setErrors((current) => ({
        ...current,
        [fieldName]: validateSingleField(fieldName, value),
      }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormState;

    setTouched((current) => ({ ...current, [fieldName]: true }));
    setErrors((current) => ({
      ...current,
      [fieldName]: validateSingleField(fieldName, value),
    }));
  };

  const buildElementorPayload = () => {
    const now = new Date();
    const payload = new URLSearchParams();
    const courseLabel = crmCourse?.crmCourseLabel || course.label;
    const crmCourseId = crmCourse?.crmCourseId || course.id;

    payload.set('form_id', `dv_website_brochure_${crmCourseId}`);
    payload.set('form_name', `DV Website Brochure Form - ${courseLabel}`);
    payload.set('lead_type', 'admission');
    payload.set('intent', 'brochure');
    payload.set('source_type', 'website');
    payload.set('pipeline', 'main-admission');
    payload.set('name', formData.name.trim().replace(/\s+/g, ' '));
    payload.set('email', formData.email.trim());
    payload.set('phone', formData.phone.trim());
    payload.set('course', courseLabel);
    payload.set('course_id', crmCourseId);
    payload.set('course_code', courseLabel);
    payload.set('course_name', courseLabel);
    payload.set('program', courseLabel);
    payload.set('selected_course', courseLabel);
    payload.set('crm_course_id', crmCourseId);
    payload.set('crm_course_label', courseLabel);
    payload.set('crm_course_name', crmCourse?.crmCourseName || course.label);
    payload.set('website_course_id', course.id);
    payload.set('website_course_label', course.label);
    payload.set('brochure_path', course.brochurePath || '');
    payload.set('page_url', window.location.href);
    appendAttributionToPayload(payload);
    payload.set('date', now.toISOString().slice(0, 10));
    payload.set('time', now.toISOString().slice(11, 19));
    payload.set('user_agent', window.navigator.userAgent);
    payload.set('powered_by', 'DV Analytics website');

    return payload;
  };

  const triggerDownload = () => {
    if (!course.brochurePath) {
      return;
    }

    const downloadLink = document.createElement('a');
    downloadLink.href = course.brochurePath;
    downloadLink.download = '';
    downloadLink.rel = 'noopener';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    if (isHoneypotTriggered(honeypot)) {
      return;
    }

    if (!validateForm()) {
      trackEvent('form_validation_error', {
        form_name: 'brochure',
        course_id: course.id,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = getCrmElementorWebhookUrl();

      if (!webhookUrl) {
        throw new Error('CRM webhook URL is not configured for this website.');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: buildElementorPayload(),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Unable to submit your brochure request right now.');
      }

      setIsSubmitted(true);
      recordLeadSubmission({
        name: formData.name.trim().replace(/\s+/g, ' '),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        course: course.label,
        formType: 'download-brochure',
        formLabel: 'Course Brochure Download',
        brochurePath: course.brochurePath,
      });
      trackEvent('submit_brochure_form', {
        course_id: course.id,
        course_name: course.label,
      });
      triggerDownload();
    } catch (error) {
      trackEvent('form_submit_error', {
        form_name: 'brochure',
        course_id: course.id,
      });
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your brochure request right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="aau-modal-overlay brochure-modal-overlay" onClick={onClose}>
      <div className="aau-modal-box brochure-modal-box" onClick={(event) => event.stopPropagation()}>
        <button className="aau-modal-close" onClick={onClose} aria-label="Close brochure form">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isSubmitted ? (
          <div className="brochure-modal-content brochure-success-state">
            <div className="brochure-modal-badge">Brochure Ready</div>
            <h2>Thanks, your brochure request is received.</h2>
            <p>
              The brochure for <strong>{course.label}</strong> has started downloading.
            </p>
            <p className="brochure-support-text">
              Our team can also reach out to you on <strong>{formData.phone}</strong> or <strong>{formData.email}</strong>.
            </p>
            <button type="button" className="btn btn-enroll-main" onClick={onClose}>
              Close
            </button>
          </div>
        ) : !course.brochurePath ? (
          <div className="brochure-modal-content brochure-success-state">
            <div className="brochure-modal-badge">Coming Soon</div>
            <h2>Brochure is not available yet.</h2>
            <p>
              The brochure for <strong>{course.label}</strong> is currently being prepared.
            </p>
            <p className="brochure-support-text">
              Once it is ready, this button will open the download form automatically.
            </p>
            <button type="button" className="btn btn-enroll-main" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <div className="brochure-modal-content">
            <h2>Get brochure access</h2>
            <p className="brochure-support-text">Enter your details below.</p>

            <div className="brochure-course-pill">{course.label}</div>

            <form className="brochure-form" onSubmit={handleSubmit} noValidate>
              {/* Hidden Honeypot Field for Bot Prevention */}
              <div className="hp-bot-trap" aria-hidden="true">
                <label htmlFor="brochure-website-url">Website</label>
                <input
                  id="brochure-website-url"
                  name="website_url"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="brochure-form-group">
                <label htmlFor="brochure-name">Full Name *</label>
                <input
                  id="brochure-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={NAME_MAX_LENGTH}
                  placeholder="Enter your full name"
                  className={errors.name ? 'input-error' : ''}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? <span className="error-text" role="alert">{errors.name}</span> : null}
              </div>

              <div className="brochure-form-group">
                <label htmlFor="brochure-phone">Phone Number *</label>
                <input
                  id="brochure-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={PHONE_EXACT_LENGTH + 3}
                  placeholder="Enter 10-digit mobile number"
                  className={errors.phone ? 'input-error' : ''}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone ? <span className="error-text" role="alert">{errors.phone}</span> : null}
              </div>

              <div className="brochure-form-group">
                <label htmlFor="brochure-email">Email Address *</label>
                <input
                  id="brochure-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={EMAIL_MAX_LENGTH}
                  placeholder="Enter your email address"
                  className={errors.email ? 'input-error' : ''}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <span className="error-text" role="alert">{errors.email}</span> : null}
              </div>

              {submitError ? <span className="error-text" role="alert">{submitError}</span> : null}

              <button
                type="submit"
                className="btn btn-enroll-main brochure-submit-btn"
                disabled={isSubmitting || !isFormValid}
              >
                {isSubmitting ? 'Submitting...' : 'Download Brochure'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
