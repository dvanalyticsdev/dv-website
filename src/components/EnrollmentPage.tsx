import React, { useState } from 'react';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

const courses = [
  { id: 'apids', label: 'Advanced Program in Industrial Data Science & AI (APIDS)' },
  { id: 'apida', label: 'Advanced Program in Industrial Data Analytics & AI (APIDA)' },
  { id: 'specialist', label: 'Data Analytics Specialist (DAS)' },
  { id: 'aiml', label: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)' },
  { id: 'genai', label: 'Master Program in Generative AI & Agentic AI (MPGAA)' },
  { id: 'apcs', label: 'Advanced Program in Cybersecurity & Forensics (APCF)' }
];

interface EnrollmentPageProps {
  onBackHome: () => void;
  defaultCourseId?: string;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onBackHome, defaultCourseId }) => {
  const initialCourse = defaultCourseId && courses.some(c => c.id === defaultCourseId.toLowerCase()) 
    ? defaultCourseId.toLowerCase() 
    : 'apids';

  const submitRef = useMagneticEffect(0.25);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: initialCourse,
    batch: 'weekend',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error as user types
    if (name === 'name' || name === 'email' || name === 'phone') {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { name: '', email: '', phone: '' };

    if (!formData.name.trim()) {
      errors.name = 'Full Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email Address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required';
      isValid = false;
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (10-15 digits)';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API submit
      setTimeout(() => {
        setIsSubmitted(true);
      }, 400);
    }
  };

  return (
    <div className="enroll-page-wrapper">
      
      {/* 1. Page Header */}
      <section className="enroll-hero container text-center reveal-on-scroll">
        <span className="enroll-subtitle">Admissions Open</span>
        <h1 className="enroll-title">Start Your Tech Journey</h1>
        <div className="enroll-header-line"></div>
        <p className="enroll-hero-desc">
          Fill out the enrollment query form below. A senior career advisor will contact you within 24 hours to finalize your registration and batch selection.
        </p>
      </section>

      {/* 2. Page Split Body */}
      <section className="enroll-content-section container">
        {isSubmitted ? (
          /* Success Screen */
          <div className="enroll-success-box text-center">
            <div className="success-checkmark-wrapper">
              <svg viewBox="0 0 24 24" className="checkmark-svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#ef5323" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22 4 12 14.01 9 11.01" stroke="#ef5323" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2>Submission Successful!</h2>
            <p className="success-msg-main">
              Thank you for enrolling. Your query for **{courses.find(c => c.id === formData.course)?.label}** has been received successfully.
            </p>
            <div className="advisor-contact-alert">
              <p>
                💡 <strong>Next Steps:</strong> A senior career advisor from our admissions team will contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> within 24 hours to schedule your counseling session.
              </p>
            </div>
            <div className="success-action-row">
              <button className="btn btn-enroll-bottom" onClick={onBackHome}>
                ← Go back to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="enroll-split-container">
            
            {/* Left Info Pane */}
            <div className="enroll-info-pane reveal-on-scroll">
              <h2>Why Learn with DV Analytics?</h2>
              <p className="info-summary">
                Get certified under industry-standard training curricula designed to prepare learners for modern corporate operations.
              </p>

              <div className="enroll-features-list">
                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Industry Expert Mentors</h4>
                    <p>Learn directly from senior practitioners with decade-long experience in Data Science, AI, and Cybersecurity.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Dynamic Career Support</h4>
                    <p>Gain access to resume-building guides, interview preparation kits, and mock tests aligned with placements.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Hands-on Laboratory Labs</h4>
                    <p>Practice theoretical concepts in offline cyber ranges, cloud environments, and industry datasets.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Full LMS Platform Access</h4>
                    <p>Access session recordings, assignments, assessments, templates, and learning materials 24/7.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="enroll-form-card reveal-on-scroll delay-1">
              <h3>Admissions Query Form</h3>
              
              <form onSubmit={handleSubmit} className="enroll-form">
                
                <div className="form-group-item">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={formErrors.name ? 'input-error' : ''}
                  />
                  {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={formErrors.email ? 'input-error' : ''}
                  />
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    className={formErrors.phone ? 'input-error' : ''}
                  />
                  {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="course">Select Program *</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group-item">
                  <label>Preferred Batch Mode *</label>
                  <div className="radio-group-row">
                    <label className="radio-label-container">
                      <input
                        type="radio"
                        name="batch"
                        value="weekend"
                        checked={formData.batch === 'weekend'}
                        onChange={handleInputChange}
                      />
                      <span className="custom-radio"></span>
                      Weekend Batch (Flexible)
                    </label>
                    <label className="radio-label-container">
                      <input
                        type="radio"
                        name="batch"
                        value="weekday"
                        checked={formData.batch === 'weekday'}
                        onChange={handleInputChange}
                      />
                      <span className="custom-radio"></span>
                      Weekday Batch
                    </label>
                  </div>
                </div>

                <div className="form-group-item">
                  <label htmlFor="message">Questions / Special Requirements (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any questions you have for our admissions team..."
                    rows={4}
                  />
                </div>

                <button ref={submitRef} type="submit" className="btn-submit-enroll">
                  Submit Admissions Query
                </button>

              </form>
            </div>

          </div>
        )}
      </section>

    </div>
  );
};
