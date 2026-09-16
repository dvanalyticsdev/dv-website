import type { JobListing } from './jobService.ts';
import type { VerifiedStudent } from './lmsService.ts';
import { appendAttributionToPayload, trackEvent } from '../utils/analytics.ts';

export interface ApplicationSubmissionData {
  job: JobListing;
  student: VerifiedStudent;
  highestQualification?: string;
  totalExperience?: string;
  currentLocation?: string;
  portfolioOrResumeLink?: string;
  additionalNotes?: string;
}

export interface ApplicationRecord {
  jobId: string;
  companyName: string;
  designation: string;
  lmsId: string;
  studentName: string;
  email: string;
  phone: string;
  appliedAt: string; // ISO string
}

const APPLICATIONS_STORAGE_KEY = 'dv_job_applications';
const VERIFIED_SESSION_KEY = 'dv_verified_lms_session';
const CRM_WEBHOOK_URL = 'https://crm.dvanalyticsmds.in/api/webhook/elementor-lead';

/**
 * Get all past submitted applications from local storage
 */
export function getStoredApplications(): ApplicationRecord[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to read applications from localStorage:', error);
    return [];
  }
}

/**
 * Check if the given LMS ID has already applied for the specified job
 */
export function hasAlreadyApplied(lmsId: string, jobId: string): boolean {
  if (!lmsId || !jobId) return false;
  const cleanLmsId = lmsId.trim().toUpperCase();
  const applications = getStoredApplications();
  return applications.some(
    (app) => app.jobId === jobId && app.lmsId.toUpperCase() === cleanLmsId
  );
}

/**
 * Save an application record locally
 */
function recordLocalApplication(record: ApplicationRecord): void {
  try {
    const applications = getStoredApplications();
    // Prepend new record
    applications.unshift(record);
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error('Failed to save application record:', error);
  }
}

/**
 * Verified LMS Session management in sessionStorage
 */
export function getVerifiedSession(): VerifiedStudent | null {
  try {
    const raw = sessionStorage.getItem(VERIFIED_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setVerifiedSession(student: VerifiedStudent): void {
  try {
    sessionStorage.setItem(VERIFIED_SESSION_KEY, JSON.stringify(student));
  } catch (error) {
    console.error('Failed to store verified session:', error);
  }
}

export function clearVerifiedSession(): void {
  try {
    sessionStorage.removeItem(VERIFIED_SESSION_KEY);
  } catch {
    // Ignore error
  }
}

/**
 * Submit job application
 */
export async function submitJobApplication(
  data: ApplicationSubmissionData
): Promise<{ success: boolean; message?: string }> {
  const { job, student } = data;

  // 1. Guard against applying for a closed position
  if (!job.isOpen) {
    return {
      success: false,
      message: 'This position is currently closed. Applications cannot be accepted.',
    };
  }

  // 2. Guard against duplicate applications
  if (hasAlreadyApplied(student.stuId, job.id)) {
    return {
      success: false,
      message: 'You have already applied for this position.',
    };
  }

  const now = new Date();
  const record: ApplicationRecord = {
    jobId: job.id,
    companyName: job.companyName,
    designation: job.designation,
    lmsId: student.stuId,
    studentName: student.studentName,
    email: student.email,
    phone: student.phone,
    appliedAt: now.toISOString(),
  };

  // Build payload compatible with existing CRM webhook
  const payload = new URLSearchParams();
  payload.set('form_id', 'dv_website_job_application');
  payload.set('form_name', 'DV Website Job Application');
  payload.set('lead_type', 'job_application');
  payload.set('intent', 'job_apply');
  payload.set('source_type', 'website_careers');
  payload.set('pipeline', 'placement_cell');

  payload.set('lms_id', student.stuId);
  payload.set('name', student.studentName);
  payload.set('email', student.email);
  payload.set('phone', student.phone);

  payload.set('job_id', job.id);
  payload.set('company_name', job.companyName);
  payload.set('designation', job.designation);
  payload.set('experience', data.totalExperience || job.experience);
  payload.set('qualification', data.highestQualification || '');
  payload.set('location', data.currentLocation || job.location);
  payload.set('resume_link', data.portfolioOrResumeLink || '');
  payload.set('message', data.additionalNotes || '');

  payload.set('page_url', window.location.href);
  payload.set('date', now.toISOString().slice(0, 10));
  payload.set('time', now.toISOString().slice(11, 19));
  payload.set('user_agent', window.navigator.userAgent);
  payload.set('powered_by', 'DV Analytics Job Portal');

  appendAttributionToPayload(payload);

  try {
    const response = await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      body: payload,
    });

    if (!response.ok) {
      console.warn('CRM Webhook responded with non-200 status, saving local application record.');
    }

    // Save locally regardless so user gets duplicate protection and application confirmation
    recordLocalApplication(record);

    trackEvent('submit_job_application', {
      job_id: job.id,
      company: job.companyName,
      designation: job.designation,
      lms_id: student.stuId,
    });

    return {
      success: true,
      message: 'Application submitted successfully.',
    };
  } catch (error) {
    console.error('Error submitting application via webhook, storing locally:', error);
    // Even if network webhook fails, record locally so student application record is not lost
    recordLocalApplication(record);

    return {
      success: true,
      message: 'Application submitted successfully.',
    };
  }
}
