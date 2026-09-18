import React from 'react';
import type { JobListing } from '../../services/jobService';

interface JobCardProps {
  job: JobListing;
  onApply: (job: JobListing) => void;
  onViewProfile?: (job: JobListing) => void;
  isApplied?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onApply,
  onViewProfile,
  isApplied = false,
}) => {
  const handleApplyClick = () => {
    if (!job.isOpen || isApplied) return;
    onApply(job);
  };

  const handleViewProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!job.jobProfileUrl) return;
    if (onViewProfile) {
      onViewProfile(job);
    } else {
      window.open(job.jobProfileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`job-card ${job.isOpen ? 'open' : 'closed'}`} data-job-id={job.id}>
      <div>
        {/* Top Header: Company Name & Status Pill */}
        <div className="job-card-top">
          <div>
            <div className="job-company-name">{job.companyName}</div>
            <h3 className="job-designation">{job.designation}</h3>
          </div>
          <span className={`job-status-pill ${job.isOpen ? 'open' : 'closed'}`}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: job.isOpen ? '#10b981' : '#94a3b8',
                display: 'inline-block',
              }}
            />
            {job.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        {/* Meta details */}
        <div className="job-meta-list">
          <div className="job-meta-item" title={job.experience}>
            <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span className="job-meta-val">
              <span className="job-meta-label">Exp: </span>
              {job.experience || 'Flexible'}
            </span>
          </div>

          <div className="job-meta-item" title={job.location}>
            <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="job-meta-val">
              <span className="job-meta-label">Location: </span>
              {job.location || 'India'}
            </span>
          </div>

          <div className="job-meta-item job-meta-item-full">
            <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="job-meta-val">
              <span className="job-meta-label">Posted: </span>
              {job.postedDate}
            </span>
          </div>
        </div>

        {/* 2-Day Deadline Notice for Open Jobs */}
        {job.isOpen && (
          <div className="job-deadline-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>
              {job.daysRemaining && job.daysRemaining <= 1
                ? 'Applications closing soon! Apply within today.'
                : 'Applications open for the next 2 days.'}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="job-card-actions">
        {job.jobProfileUrl ? (
          <button
            type="button"
            onClick={handleViewProfileClick}
            className="btn-view-profile"
            title="View complete job profile"
          >
            <span>View Job Profile</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
        ) : (
          <span className="btn-view-profile" style={{ opacity: 0.6, cursor: 'default' }}>
            Profile Link N/A
          </span>
        )}

        {job.isOpen ? (
          isApplied ? (
            <button type="button" className="btn-apply-job applied" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Applied</span>
            </button>
          ) : (
            <button type="button" className="btn-apply-job" onClick={handleApplyClick}>
              <span>Apply Now</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          )
        ) : (
          <button type="button" className="btn-apply-job disabled-closed" disabled>
            <span>Position Closed</span>
          </button>
        )}
      </div>
    </div>
  );
};
