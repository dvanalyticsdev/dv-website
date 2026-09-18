import React, { useState } from 'react';
import type { JobListing } from '../../services/jobService';
import { verifyLmsId, type VerifiedStudent } from '../../services/lmsService';
import { setVerifiedSession } from '../../services/applicationService';

export type LmsTargetAction = 'apply' | 'view_profile';

interface LmsVerificationModalProps {
  isOpen: boolean;
  job: JobListing | null;
  targetAction?: LmsTargetAction;
  onClose: () => void;
  onVerificationSuccess: (student: VerifiedStudent, action: LmsTargetAction) => void;
}

export const LmsVerificationModal: React.FC<LmsVerificationModalProps> = ({
  isOpen,
  job,
  targetAction = 'apply',
  onClose,
  onVerificationSuccess,
}) => {
  const [lmsIdInput, setLmsIdInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setSuccessMessage('');
      setLmsIdInput('');
    }
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const trimmed = lmsIdInput.trim();
    if (!trimmed) {
      setErrorMessage('Please enter your student LMS ID.');
      return;
    }

    setIsVerifying(true);

    try {
      const result = await verifyLmsId(trimmed);

      if (result.success && result.student) {
        setVerifiedSession(result.student);

        if (targetAction === 'view_profile') {
          setSuccessMessage('Your LMS ID has been verified. Opening job profile...');
        } else {
          setSuccessMessage('Your LMS ID has been verified. You can now continue with the application.');
        }

        // Short timeout so the user sees the confirmation before proceeding
        setTimeout(() => {
          onVerificationSuccess(result.student!, targetAction);
        }, 700);
      } else {
        setErrorMessage(result.errorMessage || 'Invalid LMS ID. Please check your LMS ID and try again.');
      }
    } catch (err) {
      console.error('LMS verification error:', err);
      setErrorMessage('Verification service is temporarily unavailable. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="job-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="job-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="job-modal-header">
          <div>
            <h2 className="job-modal-title">Student Verification</h2>
            <p className="job-modal-subtitle">
              {targetAction === 'view_profile'
                ? 'Submit your LMS ID to view the complete job profile'
                : 'Submit your LMS ID to access the application form'}
            </p>
          </div>
          <button className="job-modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Target Job Info */}
        <div className="job-modal-body">
          <div className="job-modal-target-job">
            <span className="job-modal-target-company">{job.companyName}</span>
            <span className="job-modal-target-role">{job.designation}</span>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="job-modal-alert error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="job-modal-alert success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="job-form-group">
              <label htmlFor="lmsIdInput" className="job-form-label">
                LMS ID <span className="required-star">*</span>
              </label>
              <input
                id="lmsIdInput"
                type="text"
                className="job-form-input"
                placeholder="e.g. BLR202407003"
                value={lmsIdInput}
                onChange={(e) => {
                  setLmsIdInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                disabled={isVerifying || Boolean(successMessage)}
                autoFocus
                autoComplete="off"
              />
              <span className="job-form-hint">
                Enter the Student LMS ID issued during your course enrollment.
              </span>
            </div>

            <div className="job-modal-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={onClose}
                disabled={isVerifying}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={isVerifying || !lmsIdInput.trim() || Boolean(successMessage)}
              >
                {isVerifying ? (
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
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify LMS ID</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
