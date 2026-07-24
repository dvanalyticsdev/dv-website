import React, { useState } from 'react';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

const courses = [
  { id: 'apida', category: 'data-science', label: 'Data Analytics + AI' },
  { id: 'apids', category: 'data-science', label: 'Data Science + Gen AI + Agentic AI' },
  { id: 'aiml', category: 'data-science', label: 'AIML with Gen AI & Agentic AI' },
  { id: 'days7_genai', category: 'data-science', label: '7 Days GEN AI + Agentic AI Master program' },
  { id: 'apcs', category: 'cybersecurity', label: 'Cybersecurity+ Forensics' },
];

const locations = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
  'Dubai',
];
const courseIndustryLabels: Record<string, string> = {
  apids: 'Data Science and AI',
  apida: 'Data Analytics and AI',
  specialist: 'Data Analytics',
  aiml: 'AI, Machine Learning, Generative AI, and Agentic AI',
  genai: 'Generative AI and Agentic AI',
  days7_genai: 'Generative AI and Agentic AI',
  apcs: 'Cybersecurity and Forensics',
};

interface EnrollmentPageProps {
  onBackHome: () => void;
  defaultCourseId?: string;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onBackHome, defaultCourseId }) => {
  const initialCourse = defaultCourseId && courses.some(c => c.id === defaultCourseId.toLowerCase()) 
    ? defaultCourseId.toLowerCase() 
    : 'apids';
  const initialCourseCategory = courses.find((course) => course.id === initialCourse)?.category || 'data-science';


  const submitRef = useMagneticEffect(0.25);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    state: '',
    courseCategory: initialCourseCategory,
    course: initialCourse,
    startTimeline: '',
    batch: 'weekend',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    state: '',
    courseCategory: '',
    course: '',
    startTimeline: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedCourseIndustry = courseIndustryLabels[formData.course] || 'technology';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((current) => {
      if (name === 'courseCategory') {
        const firstMatchingCourse = courses.find((course) => course.category === value)?.id || '';
        return {
          ...current,
          courseCategory: value,
          course: firstMatchingCourse,
        };
      }

      if (name === 'course') {
        const selectedProgram = courses.find((course) => course.id === value);
        return {
          ...current,
          course: value,
          courseCategory: selectedProgram?.category || current.courseCategory,
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });

    if (name in formErrors) {
      setFormErrors((current) => ({
        ...current,
        [name]: '',
        ...(name === 'courseCategory' ? { course: '' } : {}),
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      email: '',
      phone: '',
      qualification: '',
      experience: '',
      state: '',
      courseCategory: '',
      course: '',
      startTimeline: '',
    };

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

    if (!formData.qualification) {
      errors.qualification = 'Highest Qualification is required';
      isValid = false;
    }

    if (!formData.experience) {
      errors.experience = 'Experience is required';
      isValid = false;
    }

    if (!formData.state) {
      errors.state = 'State or location is required';
      isValid = false;
    }

    if (!formData.courseCategory) {
      errors.courseCategory = 'Course is required';
      isValid = false;
    }

    if (!formData.course) {
      errors.course = 'Program is required';
      isValid = false;
    }

    if (!formData.startTimeline) {
      errors.startTimeline = 'Preferred start timeline is required';
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
                Build practical skills through flexible learning, expert-led training, continuous LMS access, personalized mentorship, and end-to-end career support.
              </p>

              <div className="enroll-features-list">
                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Live Online/Offline Classes</h4>
                    <p>Learn through flexible online or classroom sessions with interactive, hands-on training and real-time doubt clearing. Choose the learning mode that best fits your schedule without compromising on practical experience.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Classes by Industry Experts (Academic Background: IITs &amp; IIMs)</h4>
                    <p>Get trained by experienced professionals with strong industry expertise and academic excellence from premier institutes. Learn industry best practices, real-world case studies, and practical applications directly from experts.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Post-Class LMS Access</h4>
                    <p>Access recorded sessions, study materials, assignments, quizzes, and project resources anytime through the Learning Management System (LMS). Revise concepts at your own pace and continue learning even after the live classes are over.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Industry Mentorship</h4>
                    <p>Receive one-on-one guidance from experienced mentors working in the {selectedCourseIndustry} industry. Get personalized career advice, project feedback, and interview preparation to accelerate your professional growth.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Resume &amp; Profile Building</h4>
                    <p>Build an ATS-friendly resume and optimize your LinkedIn and GitHub profiles to attract recruiters. Showcase your projects, technical skills, certifications, and achievements in a professional manner.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Tests &amp; Mock Interviews</h4>
                    <p>Evaluate your knowledge through regular assessments, coding tests, and practical assignments. Gain confidence with {selectedCourseIndustry} technical mock interviews based on real industry hiring processes.</p>
                  </div>
                </div>

                <div className="enroll-feature-item">
                  <div className="feat-text">
                    <h4>Placement Support</h4>
                    <p>Receive end-to-end placement assistance through job referrals, interview scheduling, and career guidance. Stay connected with hiring partners and receive support until you secure the right job opportunity.</p>
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
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && <span id="name-error" className="error-text" role="alert">{formErrors.name}</span>}
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
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && <span id="email-error" className="error-text" role="alert">{formErrors.email}</span>}
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
                    aria-invalid={Boolean(formErrors.phone)}
                    aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                  />
                  {formErrors.phone && <span id="phone-error" className="error-text" role="alert">{formErrors.phone}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="qualification">Highest Qualification *</label>
                  <select
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className={formErrors.qualification ? 'input-error' : ''}
                    aria-invalid={Boolean(formErrors.qualification)}
                    aria-describedby={formErrors.qualification ? 'qualification-error' : undefined}
                  >
                    <option value="">Select your highest qualification</option>
                    <option value="diploma">Diploma</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="doctorate">Doctorate</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.qualification && <span id="qualification-error" className="error-text" role="alert">{formErrors.qualification}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="experience">Experience *</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={formErrors.experience ? 'input-error' : ''}
                    aria-invalid={Boolean(formErrors.experience)}
                    aria-describedby={formErrors.experience ? 'experience-error' : undefined}
                  >
                    <option value="">Select your experience</option>
                    <option value="fresher">Fresher</option>
                    <option value="less-than-1-year">Less than 1 year</option>
                    <option value="1-3-years">1–3 years</option>
                    <option value="3-5-years">3–5 years</option>
                    <option value="5-10-years">5–10 years</option>
                    <option value="more-than-10-years">More than 10 years</option>
                  </select>
                  {formErrors.experience && <span id="experience-error" className="error-text" role="alert">{formErrors.experience}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="state">State / Location *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={formErrors.state ? 'input-error' : ''}
                    aria-invalid={Boolean(formErrors.state)}
                    aria-describedby={formErrors.state ? 'state-error' : undefined}
                  >
                    <option value="">Select your state or location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  {formErrors.state && <span id="state-error" className="error-text" role="alert">{formErrors.state}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="courseCategory">Select Course *</label>
                  <select
                    id="courseCategory"
                    name="courseCategory"
                    value={formData.courseCategory}
                    onChange={handleInputChange}
                    className={formErrors.courseCategory ? 'input-error' : ''}
                    aria-invalid={Boolean(formErrors.courseCategory)}
                    aria-describedby={formErrors.courseCategory ? 'course-category-error' : undefined}
                  >
                    <option value="data-science">Data Science</option>
                    <option value="cybersecurity">Cybersecurity</option>
                  </select>
                  {formErrors.courseCategory && <span id="course-category-error" className="error-text" role="alert">{formErrors.courseCategory}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="course">Select Program *</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={formErrors.course ? 'input-error' : ''}
                    aria-invalid={Boolean(formErrors.course)}
                    aria-describedby={formErrors.course ? 'course-error' : undefined}
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                  {formErrors.course && <span id="course-error" className="error-text" role="alert">{formErrors.course}</span>}
                </div>

                <div className="form-group-item">
                  <label htmlFor="startTimeline">How Soon Do You Want to Start? *</label>
                  <select
                    id="startTimeline"
                    name="startTimeline"
                    value={formData.startTimeline}
                    onChange={handleInputChange}
                    className={formErrors.startTimeline ? 'input-error' : ''}
                    aria-invalid={Boolean(formErrors.startTimeline)}
                    aria-describedby={formErrors.startTimeline ? 'start-timeline-error' : undefined}
                  >
                    <option value="">Select your preferred start timeline</option>
                    <option value="immediately">Immediately</option>
                    <option value="within-10-days">Within 10 days</option>
                    <option value="within-30-days">Within 30 days</option>
                    <option value="more-than-1-month">More than 1 month</option>
                  </select>
                  {formErrors.startTimeline && <span id="start-timeline-error" className="error-text" role="alert">{formErrors.startTimeline}</span>}
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
