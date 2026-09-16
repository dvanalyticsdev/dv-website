import React, { useState } from 'react';
import type { JobListing } from '../../services/jobService';
import type { VerifiedStudent } from '../../services/lmsService';
import {
  hasAlreadyApplied,
  submitJobApplication,
} from '../../services/applicationService';

interface JobApplicationModalProps {
  isOpen: boolean;
  job: JobListing | null;
  student: VerifiedStudent | null;
  onClose: () => void;
  onApplicationSuccess: (jobId: string) => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  job,
  student,
  onClose,
  onApplicationSuccess,
}) => {
  const [formData, setFormData] = useState({
    qualification: '',
    experience: '',
    currentLocation: '',
    resumeLink: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  if (!isOpen || !job || !student) return null;

  const alreadyApplied = hasAlreadyApplied(student.stuId, job.id);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.qualification.trim()) {
      errors.qualification = 'Highest Qualification is required';
    }
    if (!formData.experience) {
      errors.experience = 'Total Experience is required';
    }
    if (formData.resumeLink.trim() && !/^https?:\/\/.+/i.test(formData.resumeLink.trim())) {
      errors.resumeLink = 'Please provide a valid URL (starting with http:// or https://)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (alreadyApplied) {
      setSubmitError('You have already applied for this position.');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitJobApplication({
        job,
        student,
        highestQualification: formData.qualification,
        totalExperience: formData.experience,
        currentLocation: formData.currentLocation,
        portfolioOrResumeLink: formData.resumeLink,
        additionalNotes: formData.message,
      });

      if (result.success) {
        setIsSubmittedSuccess(true);
        onApplicationSuccess(job.id);
      } else {
        setSubmitError(result.message || 'Unable to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Job application submission error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="job-modal-box wide" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="job-modal-header">
          <div>
            <h2 className="job-modal-title">Job Application</h2>
            <p className="job-modal-subtitle">
              Verified LMS ID: <strong style={{ color: '#051f40' }}>{student.stuId}</strong>
            </p>
          </div>
          <button className="job-modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="job-modal-body">
          {/* Target Job Info Card */}
          <div className="job-modal-target-job">
            <span className="job-modal-target-company">{job.companyName}</span>
            <span className="job-modal-target-role">{job.designation}</span>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
              <span>📍 {job.location}</span>
              <span>💼 {job.experience}</span>
            </div>
          </div>

          {/* Success State */}
          {isSubmittedSuccess ? (
            <div className="job-application-success">
              <div className="job-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="job-success-title">Application submitted successfully.</h3>
              <p className="job-success-desc">
                Your application for <strong>{job.designation}</strong> at <strong>{job.companyName}</strong> has been received by the DV Analytics placement desk.
              </p>

              <div className="job-success-summary">
                <div><strong>LMS ID:</strong> {student.stuId}</div>
                <div><strong>Applicant Name:</strong> {student.studentName || 'Student'}</div>
                <div><strong>Email:</strong> {student.email}</div>
                <div><strong>Role Applied:</strong> {job.designation} ({job.companyName})</div>
              </div>

              <button type="button" className="btn-modal-submit" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Already Applied Warning */}
              {alreadyApplied && (
                <div className="job-modal-alert error">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>You have already applied for this position.</span>
                </div>
              )}

              {/* General Error Alert */}
              {submitError && (
                <div className="job-modal-alert error">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Pre-populated student details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="job-form-group">
                    <label className="job-form-label">Full Name</label>
                    <input
                      type="text"
                      className="job-form-input"
                      value={student.studentName}
                      disabled
                    />
                  </div>

                  <div className="job-form-group">
                    <label className="job-form-label">Email Address</label>
                    <input
                      type="text"
                      className="job-form-input"
                      value={student.email}
                      disabled
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="job-form-group">
                    <label className="job-form-label">Mobile Number</label>
                    <input
                      type="text"
                      className="job-form-input"
                      value={student.phone}
                      disabled
                    />
                  </div>

                  <div className="job-form-group">
                    <label className="job-form-label" htmlFor="qualification">
                      Highest Qualification <span className="required-star">*</span>
                    </label>
                    <input
                      id="qualification"
                      type="text"
                      className="job-form-input"
                      placeholder="e.g. B.Tech / MCA / B.Sc / MBA"
                      value={formData.qualification}
                      onChange={(e) => {
                        setFormData({ ...formData, qualification: e.target.value });
                        if (formErrors.qualification) setFormErrors({ ...formErrors, qualification: '' });
                      }}
                      disabled={alreadyApplied || isSubmitting}
                    />
                    {formErrors.qualification && <span className="job-form-error">{formErrors.qualification}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="job-form-group">
                    <label className="job-form-label" htmlFor="experience">
                      Total Experience <span className="required-star">*</span>
                    </label>
                    <select
                      id="experience"
                      className="job-form-select"
                      value={formData.experience}
                      onChange={(e) => {
                        setFormData({ ...formData, experience: e.target.value });
                        if (formErrors.experience) setFormErrors({ ...formErrors, experience: '' });
                      }}
                      disabled={alreadyApplied || isSubmitting}
                    >
                      <option value="">Select Experience</option>
                      <option value="Fresher (0 years)">Fresher (0 years)</option>
                      <option value="0 - 1 years">0 - 1 years</option>
                      <option value="1 - 3 years">1 - 3 years</option>
                      <option value="3 - 5 years">3 - 5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                    {formErrors.experience && <span className="job-form-error">{formErrors.experience}</span>}
                  </div>

                  <div className="job-form-group">
                    <label className="job-form-label" htmlFor="currentLocation">
                      Current Location
                    </label>
                    <input
                      id="currentLocation"
                      type="text"
                      className="job-form-input"
                      placeholder="e.g. Bangalore, Hyderabad, Pune"
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      disabled={alreadyApplied || isSubmitting}
                    />
                  </div>
                </div>

                <div className="job-form-group">
                  <label className="job-form-label" htmlFor="resumeLink">
                    Resume / Portfolio / LinkedIn Link
                  </label>
                  <input
                    id="resumeLink"
                    type="url"
                    className="job-form-input"
                    placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
                    value={formData.resumeLink}
                    onChange={(e) => {
                      setFormData({ ...formData, resumeLink: e.target.value });
                      if (formErrors.resumeLink) setFormErrors({ ...formErrors, resumeLink: '' });
                    }}
                    disabled={alreadyApplied || isSubmitting}
                  />
                  {formErrors.resumeLink && <span className="job-form-error">{formErrors.resumeLink}</span>}
                  <span className="job-form-hint">
                    Share a public Google Drive resume link or LinkedIn profile.
                  </span>
                </div>

                <div className="job-form-group">
                  <label className="job-form-label" htmlFor="additionalMessage">
                    Additional Comments / Notice Period (Optional)
                  </label>
                  <textarea
                    id="additionalMessage"
                    className="job-form-textarea"
                    rows={2}
                    placeholder="Notice period, preferred shift, key skills..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={alreadyApplied || isSubmitting}
                  />
                </div>

                <div className="job-modal-actions">
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={alreadyApplied || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            border: '2px solid rgba(255,255,255,0.4)',
                            borderTopColor: '#ffffff',
                            borderRadius: '50%',
                            animation: 'jobsSpin 0.8s linear infinite',
                            display: 'inline-block',
                          }}
                        />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
