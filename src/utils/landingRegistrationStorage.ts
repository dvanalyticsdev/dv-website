export type LandingCourseId = 'apida' | 'apids' | 'fde';

export interface LandingRegistrationRecord {
  name: string;
  email: string;
  phone: string;
  qualification?: string;
  experience?: string;
  state?: string;
  course: string;
  courseId: LandingCourseId;
  submittedAt: string;
}

const REGISTRATION_STORAGE_KEY = 'dv_lp_last_registration';

export const saveLandingRegistration = (record: LandingRegistrationRecord) => {
  try {
    window.sessionStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(record));
  } catch (err) {
    console.warn('Could not save landing registration record to sessionStorage:', err);
  }
};

export const getSavedLandingRegistration = (): LandingRegistrationRecord | null => {
  try {
    const raw = window.sessionStorage.getItem(REGISTRATION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LandingRegistrationRecord;
  } catch {
    return null;
  }
};
