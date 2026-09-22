import React, { useState, useEffect } from 'react';
import './ApplyJobPage.css';
import {
  fetchJobs,
  type JobListing,
  DEFAULT_APPLICATION_WINDOW_DAYS,
} from '../../services/jobService';
import type { VerifiedStudent } from '../../services/lmsService';
import {
  getVerifiedSession,
  clearVerifiedSession,
  hasAlreadyApplied,
} from '../../services/applicationService';
import { JobCard } from './JobCard';
import { LmsVerificationModal, type LmsTargetAction } from './LmsVerificationModal';
import { JobApplicationModal } from './JobApplicationModal';

interface ApplyJobPageProps {
  onBackHome?: () => void;
}

export const ApplyJobPage: React.FC<ApplyJobPageProps> = () => {
  const [openJobs, setOpenJobs] = useState<JobListing[]>([]);
  const [closedJobs, setClosedJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Verified LMS student session
  const [verifiedStudent, setVerifiedStudent] = useState<VerifiedStudent | null>(getVerifiedSession);

  // Modal states
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [lmsTargetAction, setLmsTargetAction] = useState<LmsTargetAction>('apply');
  const [isLmsModalOpen, setIsLmsModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Track locally submitted job IDs to refresh card buttons immediately
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  // Fetch jobs on mount
  const loadJobsData = async (force = false) => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchJobs(force);
      setOpenJobs(data.openJobs);
      setClosedJobs(data.closedJobs);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setLoadError('Failed to load job openings. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobsData();
  }, []);

  // Update applied state when student changes
  useEffect(() => {
    if (verifiedStudent) {
      const applied = new Set<string>();
      [...openJobs, ...closedJobs].forEach((job) => {
        if (hasAlreadyApplied(verifiedStudent.stuId, job.id)) {
          applied.add(job.id);
        }
      });
      setAppliedJobIds(applied);
    } else {
      setAppliedJobIds(new Set());
    }
  }, [verifiedStudent, openJobs, closedJobs]);

  // Handle Apply button click on a JobCard
  const handleApplyClick = (job: JobListing) => {
    setSelectedJob(job);
    setLmsTargetAction('apply');

    // If student is already verified in this session, skip verification and open application directly
    if (verifiedStudent) {
      setIsApplicationModalOpen(true);
    } else {
      setIsLmsModalOpen(true);
    }
  };

  // Handle View Job Profile click on a JobCard (freely accessible without LMS verification)
  const handleViewProfileClick = (job: JobListing) => {
    if (!job.jobProfileUrl) return;
    window.open(job.jobProfileUrl, '_blank', 'noopener,noreferrer');
  };

  // When LMS verification succeeds
  const handleLmsVerificationSuccess = (student: VerifiedStudent, action: LmsTargetAction) => {
    setVerifiedStudent(student);
    setIsLmsModalOpen(false);

    if (action === 'view_profile') {
      if (selectedJob?.jobProfileUrl) {
        window.open(selectedJob.jobProfileUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      setIsApplicationModalOpen(true);
    }
  };

  // When application is successfully submitted
  const handleApplicationSuccess = (jobId: string) => {
    setAppliedJobIds((prev) => new Set(prev).add(jobId));
  };

  const handleClearSession = () => {
    clearVerifiedSession();
    setVerifiedStudent(null);
    setAppliedJobIds(new Set());
  };

  return (
    <div className="apply-job-wrapper">
      {/* 1. Hero Section */}
      <section className="jobs-hero">
        <div className="jobs-hero-badge">
          <span>DV Analytics Placement Cell</span>
        </div>

        <h1 className="jobs-hero-title">Apply for Jobs</h1>

        <p className="jobs-hero-subtitle">
          Explore current opportunities and apply for positions that match your skills and experience.
        </p>

        {/* Prominent Configurable 2-Day Deadline Notice */}
        <div className="jobs-deadline-banner">
          <span className="jobs-deadline-icon">⚡</span>
          <span>
            <strong>Notice:</strong> Applications are open for <strong>{DEFAULT_APPLICATION_WINDOW_DAYS} days</strong> from the job posting date. Apply early to be considered for each opportunity.
          </span>
        </div>

        {/* Verified Student Session Notice if active */}
        {verifiedStudent && (
          <div className="jobs-verified-session-banner">
            <div className="jobs-verified-info">
              <span>✓ Verified Student:</span>
              <strong>{verifiedStudent.studentName || verifiedStudent.stuId} ({verifiedStudent.stuId})</strong>
            </div>
            <button
              type="button"
              className="btn-change-session"
              onClick={handleClearSession}
              title="Switch to another LMS ID"
            >
              Switch LMS ID
            </button>
          </div>
        )}
      </section>

      {/* 2. Loading State */}
      {isLoading && (
        <div className="jobs-loading-container">
          <div className="jobs-spinner" />
          <p style={{ color: '#64748b', fontWeight: 500 }}>Loading latest job openings from placement portal...</p>
        </div>
      )}

      {/* 3. Error State */}
      {!isLoading && loadError && (
        <div className="jobs-error-container">
          <div className="jobs-error-title">Unable to Load Jobs</div>
          <p className="jobs-error-desc">{loadError}</p>
          <button type="button" className="btn-jobs-retry" onClick={() => loadJobsData(true)}>
            Try Again
          </button>
        </div>
      )}

      {/* 4. Main Job Listings */}
      {!isLoading && !loadError && (
        <>
          {/* SECTION A: OPEN POSITIONS (Always on top) */}
          <section className="jobs-section" data-section="open-positions" style={{ marginTop: '2.5rem' }}>
            <div className="jobs-section-header">
              <div className="jobs-section-title-group">
                <h2 className="jobs-section-title">Open Positions</h2>
                <span className="jobs-count-badge open">{openJobs.length}</span>
              </div>
              <span className="jobs-section-subtext">Active vacancies accepting student applications</span>
            </div>

            {openJobs.length > 0 ? (
              <div className="jobs-grid">
                {openJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApplyClick}
                    onViewProfile={handleViewProfileClick}
                    isApplied={appliedJobIds.has(job.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="jobs-empty-container">
                <p style={{ color: '#64748b', fontStyle: 'italic' }}>
                  There are currently no open positions. Please check back soon.
                </p>
              </div>
            )}
          </section>

          {/* SECTION B: CLOSED POSITIONS (Always below Open Positions) */}
          <section className="jobs-section" data-section="closed-positions" style={{ marginTop: '2.5rem' }}>
            <div className="jobs-section-header" style={{ borderBottomColor: '#e2e8f0' }}>
              <div className="jobs-section-title-group">
                <h2 className="jobs-section-title" style={{ color: '#64748b' }}>Closed Positions</h2>
                <span className="jobs-count-badge closed">{closedJobs.length}</span>
              </div>
              <span className="jobs-section-subtext">Archived vacancies that are no longer accepting applications</span>
            </div>

            {closedJobs.length > 0 ? (
              <div className="jobs-grid">
                {closedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={() => {}}
                    onViewProfile={handleViewProfileClick}
                    isApplied={appliedJobIds.has(job.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="jobs-empty-container">
                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No closed positions found.</p>
              </div>
            )}
          </section>
        </>
      )}

      {/* 6. Modals */}
      <LmsVerificationModal
        isOpen={isLmsModalOpen}
        job={selectedJob}
        targetAction={lmsTargetAction}
        onClose={() => {
          setIsLmsModalOpen(false);
          setSelectedJob(null);
        }}
        onVerificationSuccess={handleLmsVerificationSuccess}
      />

      <JobApplicationModal
        isOpen={isApplicationModalOpen}
        job={selectedJob}
        student={verifiedStudent}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedJob(null);
        }}
        onApplicationSuccess={handleApplicationSuccess}
      />
    </div>
  );
};
