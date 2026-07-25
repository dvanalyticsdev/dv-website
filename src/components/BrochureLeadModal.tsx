import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { getCourseMeta } from '../data/courseMeta';

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

export const BrochureLeadModal: React.FC<BrochureLeadModalProps> = ({ courseId, isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormState>(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const course = useMemo(() => getCourseMeta(courseId ?? undefined), [courseId]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      setErrors(initialFormState);
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen || !course) {
    return null;
  }

  const validateForm = () => {
    const nextErrors: FormState = {
      name: '',
      email: '',
      phone: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      nextErrors.name = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number';
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitted(true);
    triggerDownload();
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

            <form className="brochure-form" onSubmit={handleSubmit}>
              <div className="brochure-form-group">
                <label htmlFor="brochure-name">Full Name *</label>
                <input
                  id="brochure-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name ? <span className="error-text">{errors.name}</span> : null}
              </div>

              <div className="brochure-form-group">
                <label htmlFor="brochure-phone">Phone Number *</label>
                <input
                  id="brochure-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone ? <span className="error-text">{errors.phone}</span> : null}
              </div>

              <div className="brochure-form-group">
                <label htmlFor="brochure-email">Email Address *</label>
                <input
                  id="brochure-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email ? <span className="error-text">{errors.email}</span> : null}
              </div>

              <button type="submit" className="btn btn-enroll-main brochure-submit-btn">
                Download Brochure
              </button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
