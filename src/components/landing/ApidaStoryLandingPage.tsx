import React, { useState, useEffect, useCallback } from 'react';
import { googleReviewsData, GOOGLE_REVIEWS_LINK } from '../../data/googleReviewsData';
import { CompaniesSection } from '../CompaniesSection';
import './ApidsStoryLandingPage.css';
import { BrochureLeadModal } from '../BrochureLeadModal';
import { recordLeadSubmission } from '../../services/leadTrackingService';
import { appendAttributionToPayload, trackEvent } from '../../utils/analytics';
import { saveLandingRegistration } from '../../utils/landingRegistrationStorage';

interface SelectOption {
  value: string;
  label: string;
}

interface LpCustomSelectProps {
  options: SelectOption[];
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (val: string) => void;
}

const LpCustomSelect: React.FC<LpCustomSelectProps> = ({
  options,
  value,
  placeholder,
  required,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lp-custom-select-wrap')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="lp-custom-select-wrap">
      <div
        className={`lp-custom-select-trigger ${!selectedOption ? 'has-placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className={`lp-custom-select-arrow ${isOpen ? 'open' : ''}`}></span>
      </div>

      {isOpen && (
        <ul className="lp-custom-select-menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`lp-custom-select-option ${opt.value === value ? 'selected' : ''}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {required && (
        <input
          type="text"
          value={value}
          readOnly
          required
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
          tabIndex={-1}
        />
      )}
    </div>
  );
};

export interface ApidaStoryLandingPageProps {
  onNavigateHome?: () => void;
  onRegistrationSuccess?: () => void;
}

export const ApidaStoryLandingPage: React.FC<ApidaStoryLandingPageProps> = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    state: '',
    course: 'APIDA (Industrial Data Analytics & AI)',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Verified Google Reviews Carousel State
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);

  const totalReviews = googleReviewsData.length;

  const nextReview = useCallback(() => {
    setReviewIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prevReview = useCallback(() => {
    setReviewIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  useEffect(() => {
    if (isReviewPaused) return;
    const interval = setInterval(() => {
      nextReview();
    }, 4200);
    return () => clearInterval(interval);
  }, [isReviewPaused, nextReview]);

  const renderReviewStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill={i < rating ? '#f59e0b' : '#e2e8f0'}
        stroke={i < rating ? '#d97706' : '#cbd5e1'}
        strokeWidth="1"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  // Student placement stories marquee
  const homepageStoryGroups = [
    [
      'WhatsApp Image 2026-07-01 at 11.19.49 AM.jpeg',
      'WhatsApp Image 2026-07-01 at 11.19.50 AM (1).jpeg',
      'WhatsApp Image 2026-07-01 at 11.19.50 AM (2).jpeg',
      'WhatsApp Image 2026-07-01 at 11.19.50 AM.jpeg',
      'WhatsApp Image 2026-07-01 at 11.19.51 AM.jpeg',
    ],
    [
      'WhatsApp Image 2026-06-29 at 11.28.19 AM.jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.20 AM (1).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.20 AM (2).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.20 AM.jpeg',
    ],
    [
      'WhatsApp Image 2026-06-29 at 11.28.08 AM (1).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.08 AM (2).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.08 AM.jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.09 AM (1).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.09 AM.jpeg',
    ],
    [
      'WhatsApp Image 2026-06-29 at 11.28.55 AM.jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.56 AM (1).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.56 AM (2).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.56 AM (3).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.56 AM.jpeg',
    ],
    [
      'WhatsApp Image 2026-06-29 at 11.28.44 AM (1).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.44 AM (2).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.44 AM.jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.45 AM (1).jpeg',
      'WhatsApp Image 2026-06-29 at 11.28.45 AM.jpeg',
    ],
  ];

  const buildHomepageStories = (): string[] => {
    const completeRounds = Math.min(...homepageStoryGroups.map((group) => group.length));
    return Array.from({ length: completeRounds }, (_, index) =>
      homepageStoryGroups.map((group) => group[index]),
    ).flat();
  };

  const successStoryPosters = buildHomepageStories();

  const qualificationOptions: SelectOption[] = [
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Postgraduate', label: 'Postgraduate' },
    { value: 'Doctorate', label: 'Doctorate' },
    { value: 'Other', label: 'Other' },
  ];

  const experienceOptions: SelectOption[] = [
    { value: 'Fresher', label: 'Fresher' },
    { value: 'Less than 1 year', label: 'Less than 1 year' },
    { value: '1–3 years', label: '1–3 years' },
    { value: '3–5 years', label: '3–5 years' },
    { value: '5–10 years', label: '5–10 years' },
    { value: 'More than 10 years', label: 'More than 10 years' },
  ];

  const locationOptions: SelectOption[] = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Puducherry', label: 'Puducherry' },
    { value: 'Dubai', label: 'Dubai' },
  ];

  const scrollToForm = () => {
    const heroForm = document.getElementById('apida-hero-lead-form');
    if (heroForm) {
      heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = heroForm.querySelector('input') as HTMLInputElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 400);
      }
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.qualification) {
      setFormError('Please select your qualification');
      return;
    }
    if (!formData.experience) {
      setFormError('Please select your experience level');
      return;
    }
    if (!formData.state) {
      setFormError('Please select your location / state');
      return;
    }

    setIsSubmitting(true);
    const payload = new URLSearchParams();
    payload.set('form_id', 'dv_website_lp_apida_registration');
    payload.set('form_name', 'DV Website APIDA Landing Page Registration');
    payload.set('lead_type', 'admission');
    payload.set('intent', 'registration');
    payload.set('source_type', 'website');
    payload.set('pipeline', 'main-admission');
    payload.set('name', formData.name.trim());
    payload.set('email', formData.email.trim());
    payload.set('phone', formData.phone.trim());
    payload.set('course', 'Advanced Program in Industrial Data Science with Gen AI (APIDA)');
    payload.set('highest_qualification', formData.qualification);
    payload.set('experience', formData.experience);
    payload.set('state', formData.state);
    payload.set('page_url', window.location.href);
    appendAttributionToPayload(payload);

    try {
      const response = await fetch('https://crm.dvanalyticsmds.in/api/webhook/elementor-lead', {
        method: 'POST',
        body: payload,
      });
      if (!response.ok) throw new Error('CRM submission failed');
    } catch (error) {
      console.warn('CRM submission failed:', error);
      setIsSubmitting(false);
      setFormError('Unable to submit your registration right now. Please try again.');
      return;
    }

    recordLeadSubmission({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      qualification: formData.qualification,
      experience: formData.experience,
      state: formData.state,
      course: 'Advanced Program in Industrial Data Science with Gen AI (APIDA)',
      formType: 'hero-registration',
      formLabel: 'Landing Page Lead Registration',
    });
    saveLandingRegistration({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      qualification: formData.qualification,
      experience: formData.experience,
      state: formData.state,
      course: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
      courseId: 'apida',
      submittedAt: new Date().toISOString(),
    });
    trackEvent('submit_enroll_form', {
      course_id: 'apida',
      course_name: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
      form_id: 'dv_website_lp_apida_registration',
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    if (onRegistrationSuccess) {
      onRegistrationSuccess();
    }
    window.location.assign('/lp/apida/thank-you/');
  };

  const renderLeadForm = (
    title = 'Register for APIDA',
    subtitle = 'Reserve your seat for the Industrial Data Analytics & AI batch.'
  ) => (
    <div className="lp-form-card">
      {isSubmitted ? (
        <div className="lp-form-success-banner">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#065f46' }}>
            Redirecting to Thank You Page...
          </h3>
          <p style={{ color: '#047857', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '14px' }}>
            Thank you, <strong>{formData.name}</strong>. Taking you to your registration confirmation and brochure download page...
          </p>
          <button
            type="button"
            onClick={() => window.location.assign('/lp/apida/thank-you/')}
            className="lp-orange-submit-btn"
            style={{ marginTop: '10px' }}
          >
            Continue to Thank You Page →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="lp-lead-form">
          <div className="lp-form-header">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>

          {formError && <div className="lp-form-error-banner" role="alert">{formError}</div>}

          <div className="lp-form-field">
            <label className="lp-form-label">Full Name</label>
            <input
              type="text"
              className="lp-form-input"
              placeholder="Enter your name"
              value={formData.name}
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="lp-form-row-2">
            <div className="lp-form-field">
              <label className="lp-form-label">Email ID</label>
              <input
                type="email"
                className="lp-form-input"
                placeholder="name@email.com"
                value={formData.email}
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="lp-form-field">
              <label className="lp-form-label">Phone Number</label>
              <input
                type="tel"
                className="lp-form-input"
                placeholder="10-digit mobile"
                value={formData.phone}
                required
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              />
            </div>
          </div>

          <div className="lp-form-row-2">
            <div className="lp-form-field">
              <label className="lp-form-label">Highest Qualification</label>
              <LpCustomSelect
                options={qualificationOptions}
                value={formData.qualification}
                placeholder="Select qualification"
                required
                onChange={(val) => setFormData({ ...formData, qualification: val })}
              />
            </div>

            <div className="lp-form-field">
              <label className="lp-form-label">Experience Level</label>
              <LpCustomSelect
                options={experienceOptions}
                value={formData.experience}
                placeholder="Select experience"
                required
                onChange={(val) => setFormData({ ...formData, experience: val })}
              />
            </div>
          </div>

          <div className="lp-form-row-2">
            <div className="lp-form-field">
              <label className="lp-form-label">State / Location</label>
              <LpCustomSelect
                options={locationOptions}
                value={formData.state}
                placeholder="Select state"
                required
                onChange={(val) => setFormData({ ...formData, state: val })}
              />
            </div>

            <div className="lp-form-field">
              <label className="lp-form-label">Course</label>
              <input
                type="text"
                className="lp-form-input"
                value="APIDA (Industrial Data Analytics & AI)"
                readOnly
                tabIndex={-1}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#0f172a',
                  fontWeight: 700,
                  cursor: 'not-allowed',
                  borderColor: '#cbd5e1',
                }}
              />
            </div>
          </div>

          <button type="submit" className="lp-orange-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting Registration...' : 'REGISTER NOW →'}
          </button>

          <p className="lp-form-privacy-note">Your information is strictly confidential. No spam.</p>
        </form>
      )}
    </div>
  );

  const learningPathModules = [
    {
      id: 1,
      title: 'Pillar 1: Enterprise Data Management',
      summary: 'Data management forms the bedrock of industrial analytics: master SQL Server, MySQL, Python, and Base & Advanced SAS to extract and clean enterprise records.',
      techChips: ['SQL Server', 'MySQL', 'Python 3.12', 'Base SAS', 'Advanced SAS', 'PROC SQL'],
      topics: [
        'Relational Database Concepts: SQL Server / MySQL architecture, tables, schemas, primary & foreign keys',
        'Advanced SQL: Joins, subqueries, CTEs, views, stored procedures, window functions, and query optimization',
        'Python for Data Wrangling: Variables, functions, OOP, Pandas & NumPy for cleaning and reshaping datasets',
        'Base SAS Programming: DATA step processing, input formats, conditional logic, and dataset merging',
        'Advanced SAS with PROC SQL: Querying relational tables within SAS, macro variables, and automated ETL scripts',
        'Practical Deliverable: Clean, validate, and merge multi-table transactional records from banking and retail databases',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Pillar 2: Data Analysis & Visualisation',
      summary: 'Transform raw numbers into strategic business insights: design executive KPI dashboards in Microsoft Power BI, Tableau, and Excel with AI.',
      techChips: ['Excel + AI', 'Power BI', 'DAX', 'Tableau', 'Power Query', 'Executive Storytelling'],
      topics: [
        'Excel with AI Workflows: Power Query transformations, dynamic arrays, lookup functions, and AI formula assistants',
        'Power BI Data Modeling: Star schema design, table relationships, DAX calculated measures, and dynamic time-intelligence KPIs',
        'Executive Dashboard Design: Drill-through analytics, interactive filters, row-level security (RLS), and automated cloud refresh',
        'Tableau Visual Analytics: Visual storytelling, parameters, calculated fields, geographic maps, and dual-axis charts',
        'Business Decision Framing: Translating complex operational metrics into actionable executive recommendations',
        'Practical Deliverable: Construct an interactive executive business intelligence dashboard and present insights to decision-makers',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Pillar 3: Statistical Analytics & Business Modeling',
      summary: 'Master quantitative reasoning: probability distributions, inferential hypothesis testing, regression diagnostics, and risk analytics.',
      techChips: ['Descriptive Statistics', 'Probability', 'Hypothesis Testing', 'Correlation Analysis', 'Inferential Statistics'],
      topics: [
        'Descriptive & Exploratory Analysis: Measures of central tendency, dispersion, variance, skewness, and outlier identification',
        'Probability Foundations: Discrete and continuous probability distributions, standard normal distribution, and sampling errors',
        'Hypothesis Testing Protocols: Formulating null/alternative hypotheses, p-values, t-tests, ANOVA, and Chi-Square tests',
        'Statistical Inference in Python & SAS: Confidence intervals, parametric vs non-parametric methods, and regression validation',
        'Correlation & Collinearity: Identifying genuine business relationships vs confounding variables and multicollinearity',
        'Practical Deliverable: Conduct an end-to-end statistical hypothesis evaluation on a telecom/finance customer behavior dataset',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Pillar 4: Machine Learning & Predictive Analytics',
      summary: 'Design, train, and validate predictive machine learning algorithms across classification, regression, clustering, and customer churn.',
      techChips: ['scikit-learn', 'XGBoost', 'Feature Engineering', 'Cross-Validation', 'Churn Prediction', 'Credit Risk'],
      topics: [
        'ML Workflow Fundamentals: Problem formulation, target definition, train/validation/test split, and preventing data leakage',
        'Supervised Learning: Linear regression, logistic regression, decision trees, random forests, and gradient boosted trees (XGBoost)',
        'Unsupervised Learning: K-Means clustering, customer RFM segmentation, and principal component analysis (PCA)',
        'Industrial Use Cases: Building customer churn prediction, credit risk default assessment, and sales forecasting models',
        'Model Evaluation & Tuning: ROC-AUC curves, precision-recall trade-offs, confusion matrices, and hyperparameter optimization',
        'Practical Deliverable: Train, benchmark, and validate a predictive machine learning classifier against a meaningful business baseline',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 2a10 10 0 0 1 10 10h-10V2z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Pillar 5: MLOps & Gen AI Business Integration',
      summary: 'Bridge analytics into operational production: model deployment via FastAPI, monitoring drift, Docker, and Gen AI business assistants.',
      techChips: ['FastAPI', 'Docker', 'MLOps', 'CI/CD Pipelines', 'Gen AI Assistants', 'Streamlit'],
      topics: [
        'Model Serving with FastAPI: Exposing trained machine learning models as high-throughput, secure REST microservices',
        'Containerization with Docker: Packaging analytics applications into reproducible, portable container images',
        'MLOps & Production Monitoring: Tracking model latency, data drift, concept drift, and automated retraining triggers',
        'Generative AI for Analytics: Prompt engineering, LLM integration, and natural language analytics assistants',
        'Interactive App Delivery: Building full interactive analytical tools in Streamlit for business stakeholder review',
        'Practical Deliverable: Deploy a containerized predictive model with an interactive web UI and automated inference monitoring',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
    },
  ];

  const activePopupModule = selectedModule !== null ? learningPathModules.find((m) => m.id === selectedModule) : null;

  return (
    <div className="lp-page-wrapper">
      {/* -------------------------------------------------------------------------
          TOP BAR / NAVIGATION
          ------------------------------------------------------------------------- */}
      <header className="top">
        <div className="wrap">
          <div className="logo-link" aria-label="DV Analytics">
            <img src="/logo.png" alt="DV Analytics" className="logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="lp-nav" aria-label="Main Navigation">
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>Curriculum</a>
            <a href="#tools" onClick={(e) => scrollToSection(e, 'tools')}>Tools</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
            <a href="#career-engine" onClick={(e) => scrollToSection(e, 'career-engine')}>Career Engine</a>
            <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')}>Reviews</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
            <a href="#offices" onClick={(e) => scrollToSection(e, 'offices')}>Offices</a>
          </nav>

          <div className="top-actions">
            <button type="button" onClick={scrollToForm} className="btn top-cta-btn">
              REGISTER NOW →
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="lp-hamburger-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <div className={`lp-mobile-menu ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
          <nav className="lp-mobile-nav" aria-label="Mobile Navigation">
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>
              <span>Curriculum (5 Pillars)</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
            <a href="#tools" onClick={(e) => scrollToSection(e, 'tools')}>
              <span>Industrial Tech Stack</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>
              <span>BFSI &amp; Telecom Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
            <a href="#career-engine" onClick={(e) => scrollToSection(e, 'career-engine')}>
              <span>6-Step Career Engine</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
            <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')}>
              <span>Student Reviews</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>
              <span>FAQs</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
            <a href="#offices" onClick={(e) => scrollToSection(e, 'offices')}>
              <span>Visit Our Offices</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </nav>
          <div className="lp-mobile-menu-footer">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToForm();
              }}
              className="btn lp-mobile-cta-btn"
            >
              REGISTER NOW →
            </button>
          </div>
        </div>

        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div
            className="lp-mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>

      {/* -------------------------------------------------------------------------
          TOP POSTER BANNER (ABOVE HERO)
          ------------------------------------------------------------------------- */}
      <section className="lp-top-poster-section" aria-label="Program Banner">
        <div className="wrap">
          <div
            className="lp-top-poster-wrapper"
            onClick={scrollToForm}
            role="button"
            tabIndex={0}
            title="Click to register for APIDA"
            onKeyDown={(e) => {
              if (e.key === 'Enter') scrollToForm();
            }}
          >
            <img
              src="/apida-training-banner.png"
              alt="Advanced Program in Industrial Data Analytics &amp; AI (APIDA) Banner - DV Analytics"
              className="lp-top-poster-img"
              width="2172"
              height="724"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          HERO SECTION (2-COLUMN HERO + 5-STEP LIFECYCLE PATH)
          ------------------------------------------------------------------------- */}
      <section className="hero" id="hero-section">
        <div className="wrap">
          <div className="hero-content-grid">
            <div className="hero-left-content">
              <div style={{ font: '700 0.85rem/1 var(--mono)', color: 'var(--navy)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                DV Analytics | Transforming You
              </div>
              <h1>
                Advanced Program in Industrial Data Analytics &amp; AI (APIDA)
              </h1>
              <p className="lead">
                A comprehensive industry-focused program combining Data Management, Business Intelligence, Statistical Modeling, and MLOps. Master SQL, SAS, Python, Power BI, Tableau, and Machine Learning to convert industrial enterprise data into actionable business intelligence.
              </p>

              {/* 6 Clean Inline Program Badges */}
              <div className="hero-stats-row">
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Duration:</b> 5 Months</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Platform:</b> Online/Offline</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Projects:</b> Real-Time Industry Projects</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Profile:</b> Resume &amp; BI Portfolio</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Placement:</b> 100% Placement Support</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Average Salary:</b> ₹25+ to 35+ LPA Benchmark</span>
                </div>
              </div>

              
            </div>

            {/* Registration Box on Right Side of Hero */}
            <div className="hero-right-form" id="apida-hero-lead-form">
              {renderLeadForm('Register for APIDA', 'Reserve your seat for the Industrial Data Analytics & AI batch.')}
            </div>
          </div>

          {/* Full-Width 5-Step Path Card */}
          <div className="path-card" aria-label="End-to-End Industrial Solution Lifecycle">
            <div className="path-top">
              <span>APIDA: The Complete Industrial Analytics Lifecycle</span>
              <span>Enterprise Data Extraction → Predictive AI &amp; Executive BI</span>
            </div>
            <ol className="path">
              <li>
                <b>1. Data Extraction &amp; Management</b>
                <span>SQL Server, MySQL, Python, Base &amp; Advanced SAS.</span>
              </li>
              <li>
                <b>2. Business Intelligence &amp; Reporting</b>
                <span>Excel AI, Power BI, DAX &amp; Tableau Storytelling.</span>
              </li>
              <li>
                <b>3. Statistical &amp; Exploratory Analytics</b>
                <span>Hypothesis testing, inferential stats &amp; feature engineering.</span>
              </li>
              <li>
                <b>4. Machine Learning &amp; Predictive Modeling</b>
                <span>Classification, regression, clustering, churn &amp; credit risk.</span>
              </li>
              <li>
                <b>5. MLOps &amp; Gen AI Business Integration</b>
                <span>Automated CI/CD pipelines, model monitoring &amp; enterprise AI assistants.</span>
              </li>
            </ol>
            <div className="path-bracket">
              <strong>The Industrial Data Analyst connects raw enterprise records to predictive intelligence.</strong>
              <span>From transactional SQL and SAS datasets to executive BI dashboards to deployed operational ML models.</span>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 2: IN ONE MINUTE
          ------------------------------------------------------------------------- */}
      <section className="minute">
        <div className="wrap">
          <div className="min-grid">
            <article>
              <h3>What is APIDA?</h3>
              <p>
                APIDA is an intensive program equipping you with the full technical stack required by global banks, telecom giants, and consulting firms: SQL, SAS, Python, Power BI, and Machine Learning.
              </p>
            </article>
            <article>
              <h3>Why is it in demand?</h3>
              <p>
                Global enterprises sit on petabytes of transactional data. They desperately need professionals who not only build executive reports, but also develop predictive models and explain uncertainty.
              </p>
            </article>
            <article>
              <h3>How do I start?</h3>
              <p>
                Build foundational skills step by step from SQL and Excel AI to Power BI, SAS, Python, Machine Learning, and Gen AI applications with direct mentor guidance.{' '}
                <a href="#apida-hero-lead-form" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>
                  Join DV Analytics
                </a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 3: WHAT IS INDUSTRIAL DATA ANALYTICS & AI
          ------------------------------------------------------------------------- */}
      <section className="what" id="what-is-apida">
        <div className="wrap">
          <div className="sec-head">
            <h2>What is Industrial Data Analytics &amp; AI?</h2>
          </div>
          <div className="what-text">
            <p className="def">
              Industrial Data Analytics &amp; AI combines enterprise data management, business intelligence, statistical modeling, and machine learning to convert raw operational data into high-value strategic decisions.
            </p>
            <p>
              In industries like Banking, Financial Services, Insurance (BFSI), Healthcare, and Telecom, analytics is not an abstract exercise. It directly drives regulatory credit risk modeling, fraudulent transaction detection, customer churn intervention, and executive revenue planning.
            </p>
            <p>
              The APIDA program teaches you how to bridge enterprise data platforms (SQL Server, SAS) with modern visual storytelling (Power BI, Tableau) and predictive AI algorithms (Python, scikit-learn, MLOps), making you indispensable across both legacy corporate systems and modern cloud environments.
            </p>
          </div>

          {/* Highlighted Spotlight Example */}
          <div className="example">
            <div className="example-badge-row">
              <span className="example-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Real-World Industrial Scenario
              </span>
              <span className="example-tag">Example: Banking Credit Risk Scorecard &amp; IFRS 9 ECL Modeling</span>
            </div>
            <h3>End-to-End Default Risk Evaluation &amp; Executive Risk Intelligence</h3>
            <p>
              A complete Industrial Data Analytics workflow spans every phase from raw core banking tables to executive dashboards:
            </p>
            <ol style={{ margin: '14px 0 0 20px', padding: 0, color: '#334155', lineHeight: 1.6, fontSize: '0.98rem' }}>
              <li><strong>Data Extraction:</strong> Query historical loan transactions, repayment records, and credit bureau feeds from SQL Server relational tables.</li>
              <li><strong>SAS Data Management:</strong> Use SAS DATA step and PROC SQL to clean, merge, and stratify accounts across delinquency (DPD) buckets.</li>
              <li><strong>Statistical Risk Modeling:</strong> Perform hypothesis testing, calculate Weight of Evidence (WoE) and Information Value (IV) to select predictive risk factors.</li>
              <li><strong>Machine Learning Scorecard:</strong> Train logistic regression and gradient boosting models to estimate Probability of Default (PD) and Loss Given Default (LGD).</li>
              <li><strong>Executive Power BI Dashboard:</strong> Build an interactive executive risk dashboard with DAX measures, non-performing asset (NPA) trends, and portfolio health KPIs.</li>
              <li><strong>Gen AI Integration:</strong> Equip underwriting officers with an AI assistant that explains credit decisions and parses borrower bank statements.</li>
              <li><strong>MLOps &amp; Governance:</strong> Deploy model scoring pipelines with automated population drift tracking and regulatory audit documentation.</li>
            </ol>
            <div className="example-footer">
              <span className="example-footer-lead">The learning objective: Move from isolated queries to complete industrial analytics solutions.</span>
              <span className="example-footer-arrow">↓</span>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 4: WHY IS IT IN DEMAND? (INDUSTRY DOMAINS)
          ------------------------------------------------------------------------- */}
      <section className="why-demand" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Why are Industrial Data Analytics &amp; AI Professionals in High Demand?</h2>
            <p className="lead">
              Enterprises across banking, telecom, healthcare, and retail generate massive daily transaction volumes. Organizations need professionals who understand domain rules, extract clean data, build dashboards, and deploy predictive models.
            </p>
          </div>

          <div className="why-grid" style={{ marginTop: '28px' }}>
            <article className="why-card">
              <div className="why-card-poster-wrap">
                <img
                  src="/industry-posters/banking-photo.jpg"
                  alt="Banking & Finance - Credit Risk & ECL Modeling"
                  className="why-card-poster-img"
                  loading="lazy"
                />
              </div>
              <span className="who-badge">Banking &amp; Finance</span>
              <h3>Credit Risk &amp; ECL Modeling</h3>
              <p>Develop application and behavioral scorecards, IFRS 9 Expected Credit Loss (ECL) frameworks, and real-time fraud detection systems.</p>
            </article>
            <article className="why-card">
              <div className="why-card-poster-wrap">
                <img
                  src="/industry-posters/insurance-photo.jpg"
                  alt="Insurance - Claims Fraud & Underwriting"
                  className="why-card-poster-img"
                  loading="lazy"
                />
              </div>
              <span className="who-badge">Insurance</span>
              <h3>Claims Fraud &amp; Underwriting</h3>
              <p>Detect suspicious insurance claims using anomaly detection, automate claims triage, and calculate actuarial risk reserves.</p>
            </article>
            <article className="why-card">
              <div className="why-card-poster-wrap">
                <img
                  src="/industry-posters/retail-photo.jpg"
                  alt="Retail & E-Commerce - Demand Forecasting & CLV"
                  className="why-card-poster-img"
                  loading="lazy"
                />
              </div>
              <span className="who-badge">Retail &amp; E-Commerce</span>
              <h3>Demand Forecasting &amp; CLV</h3>
              <p>Forecast store-level inventory demand, estimate Customer Lifetime Value (CLV), and design dynamic product recommendation engines.</p>
            </article>
            <article className="why-card">
              <div className="why-card-poster-wrap">
                <img
                  src="/industry-posters/telecom-photo.jpg"
                  alt="Telecom - Subscriber Churn & ARPU"
                  className="why-card-poster-img"
                  loading="lazy"
                />
              </div>
              <span className="who-badge">Telecom</span>
              <h3>Subscriber Churn &amp; ARPU</h3>
              <p>Predict subscriber churn before recharge lapses, analyze Average Revenue Per User (ARPU), and monitor network uptime metrics.</p>
            </article>
            <article className="why-card">
              <div className="why-card-poster-wrap">
                <img
                  src="/industry-posters/healthcare-photo.jpg"
                  alt="Healthcare - Hospital Operations & KPIs"
                  className="why-card-poster-img"
                  loading="lazy"
                />
              </div>
              <span className="who-badge">Healthcare</span>
              <h3>Hospital Operations &amp; KPIs</h3>
              <p>Forecast patient admissions, bed occupancy rates, analyze clinical outcomes, and detect fraudulent healthcare billing claims.</p>
            </article>
            <article className="why-card">
              <div className="why-card-poster-wrap">
                <img
                  src="/industry-posters/ecommerce-photo.jpg"
                  alt="Manufacturing & Supply Chain - Predictive Maintenance"
                  className="why-card-poster-img"
                  loading="lazy"
                />
              </div>
              <span className="who-badge">Manufacturing</span>
              <h3>Predictive Maintenance</h3>
              <p>Analyze IoT sensor telemetry, forecast machinery breakdown probabilities, and optimize supply chain delivery bottlenecks.</p>
            </article>
          </div>

          <div className="who-note-box" style={{ marginTop: '28px' }}>
            <strong>The Unique Value of SAS + Python + BI:</strong> While many candidates know only generic Python, top banks (Wells Fargo, HDFC, Citi, HSBC) and pharmaceutical leaders rely heavily on SAS for audited analytics. By mastering both SAS, SQL, Power BI, and Python ML, APIDA graduates stand out in enterprise hiring.
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 5: 7-STAGE LEARNING JOURNEY
          ------------------------------------------------------------------------- */}
      <section className="learning-journey-stages" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>The 7 Stages of Your APIDA Learning Journey</h2>
            <p className="lead">
              A structured, mentor-led pathway designed to transition you from foundational data querying into advanced business intelligence, statistical modeling, and machine learning.
            </p>
          </div>

          <div className="stages">
            <div className="stages-head">
              <span className="steps-title">The 7 stages of your learning journey</span>
              <span className="hint">Tap a stage to open details</span>
            </div>

            <details className="stage" name="stages" open>
              <summary>
                <span className="sn">1</span>
                <span className="st">
                  <b>Step 1 · Enterprise Data Management (SQL &amp; SAS)</b>
                  <small>Master SQL Server, MySQL, and SAS Base/Advanced programming to query and clean enterprise datasets.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Writes complex SQL queries: inner/outer joins, subqueries, CTEs, views, and window functions.</li>
                    <li>Masters Base SAS DATA step programming, conditional logic, informats, formats, and dataset concatenation.</li>
                    <li>Executes relational queries within SAS using PROC SQL and automates batch scripts via SAS macros.</li>
                    <li>Resolves real-world dirty data issues: missing values, duplicate records, and multi-source reconciliations.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>Ability to extract, clean, and deliver an analysis-ready dataset from complex raw sources.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>SQL Server</span>
                    <span>MySQL</span>
                    <span>Base SAS</span>
                    <span>Advanced SAS</span>
                    <span>PROC SQL</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">2</span>
                <span className="st">
                  <b>Step 2 · Advanced Business Intelligence &amp; Dashboards</b>
                  <small>Build executive KPI dashboards with Microsoft Power BI, DAX formulas, and Tableau visual storytelling.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Designs dimensional data models (star schema, snowflake) and relationships in Power BI.</li>
                    <li>Writes calculated columns and dynamic measures using DAX (CALCULATE, FILTER, time intelligence).</li>
                    <li>Builds executive reports in Tableau: calculated fields, parameters, interactive filters, and drilldowns.</li>
                    <li>Translates statistical and commercial findings into polished executive storytelling presentations.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>Interactive executive dashboards answering core business performance questions.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Power BI</span>
                    <span>DAX Functions</span>
                    <span>Tableau</span>
                    <span>Executive Dashboards</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">3</span>
                <span className="st">
                  <b>Step 3 · Excel with AI &amp; Business Modeling</b>
                  <small>Harness advanced lookup functions, Power Query, pivot modeling, and AI-assisted formula generation.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Builds automated financial and MIS models using XLOOKUP, INDEX-MATCH, SUMIFS, and dynamic arrays.</li>
                    <li>Automates data cleaning and transformation pipelines using Power Query and Power Pivot.</li>
                    <li>Uses AI prompts to generate complex nested formulas, explain anomalies, and validate data integrity.</li>
                    <li>Creates interactive KPI summary sheets and sensitivity analyses for management reviews.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>Automated, error-free operational reporting sheets that cut manual reporting hours by 80%.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Excel AI</span>
                    <span>Power Query</span>
                    <span>Power Pivot</span>
                    <span>MIS Modeling</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">4</span>
                <span className="st">
                  <b>Step 4 · Statistical Analytics &amp; Hypothesis Testing</b>
                  <small>Apply probability distributions, inferential statistics, t-tests, ANOVA, and regression diagnostics.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Analyzes distributions, variance, standard errors, confidence intervals, and detects extreme outliers.</li>
                    <li>Tests business assumptions using parametric and non-parametric tests (p-values, t-tests, Chi-Square, ANOVA).</li>
                    <li>Identifies genuine driver variables using Pearson/Spearman correlation and checks for multicollinearity.</li>
                    <li>Evaluates risk metrics and quantifies uncertainty for executive investment and credit decisions.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>Rigorous, evidence-backed decision frameworks that quantify risk and uncertainty.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Python Stats</span>
                    <span>SAS Stats</span>
                    <span>Hypothesis Testing</span>
                    <span>Probability</span>
                    <span>Regression Stats</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">5</span>
                <span className="st">
                  <b>Step 5 · Machine Learning &amp; Predictive Analytics</b>
                  <small>Train, evaluate, and tune supervised and unsupervised models for classification, regression, and churn.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Frames business problems into predictive target variables: churn prediction, default risk, and revenue forecasting.</li>
                    <li>Engineers domain features, prevents target leakage, and balances skewed classes with SMOTE.</li>
                    <li>Trains and benchmarks ensemble algorithms: Decision Trees, Random Forests, and XGBoost.</li>
                    <li>Evaluates model performance with ROC-AUC, precision-recall trade-offs, and cost-benefit matrices.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>High-accuracy predictive models evaluated and proven against meaningful business baselines.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>scikit-learn</span>
                    <span>XGBoost</span>
                    <span>Feature Engineering</span>
                    <span>Model Validation</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">6</span>
                <span className="st">
                  <b>Step 6 · MLOps &amp; Generative AI Business Integration</b>
                  <small>Deploy predictive APIs with FastAPI, package in Docker, track drift, and build Gen AI assistants.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Exposes machine learning models through high-performance asynchronous REST endpoints using FastAPI.</li>
                    <li>Packages analytical applications into portable Docker containers for seamless enterprise deployment.</li>
                    <li>Tracks model performance in production: detecting data drift, schema changes, and latency bottlenecks.</li>
                    <li>Builds Gen AI conversational assistants using LangChain to help stakeholders query analytics in plain English.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>A production-ready microservice with automated prediction endpoints and conversational AI querying.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>FastAPI</span>
                    <span>Docker</span>
                    <span>MLOps</span>
                    <span>GenAI &amp; LLMs</span>
                    <span>Streamlit</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">7</span>
                <span className="st">
                  <b>Step 7 · Capstone Projects, Profile Building &amp; Placement</b>
                  <small>Document end-to-end BFSI &amp; Telecom capstones, optimize your resume, and clear mock interviews.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Builds documented capstone projects across Banking, Telecom, E-Commerce, and Healthcare.</li>
                    <li>Develops a high-impact technical resume and optimized LinkedIn presence highlighting SAS, SQL, and BI skills.</li>
                    <li>Undergoes comprehensive technical assessments and mock interviews covering business scenarios and live SQL/Python tasks.</li>
                    <li>Participates in recruitment drives with 100% placement support targeting ₹25+ to 35+ LPA benchmarks.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>A compelling technical portfolio and interview readiness backed by 100% placement support.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Profile Building</span>
                    <span>BI Portfolio</span>
                    <span>Mock Interviews</span>
                    <span>Placement Support</span>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          INTERACTIVE "KNOW MORE" DEEP-DIVE TRIGGER
          ------------------------------------------------------------------------- */}
      <div className="know-more-section">
        <div className="wrap">
          <div className="know-more-bar">
            <div className="know-more-info">
              <h3>Want to understand why companies hire APIDA &amp; why AI cannot replace it?</h3>
              <p>Explore our deep-dive analysis on industrial hiring demand, the 5-specialist breakdown, and the Barbell Theory of tech careers.</p>
            </div>
            <button
              type="button"
              className={`know-more-toggle-btn ${showDeepDive ? 'open' : ''}`}
              onClick={() => setShowDeepDive(!showDeepDive)}
              aria-expanded={showDeepDive}
            >
              <span>{showDeepDive ? 'Hide Market Analysis' : 'Know More (Market & AI Analysis)'}</span>
              <span className="know-more-icon">{showDeepDive ? '↑' : '↓'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Deep-Dive: Market & AI Analysis */}
      {showDeepDive && (
        <div className="deep-dive-content-wrapper">
          <section id="why-fde">
            <div className="wrap">
              <div className="sec-head">
                <h2>Why Global Enterprises Hire Industrial Data Analytics &amp; AI Professionals</h2>
                <p className="lead">
                  Modern business data is massive, regulated, and siloed in legacy enterprise databases. AI models cannot deliver business results without human analysts who know the data and the domain.
                </p>
              </div>
              <div className="why-grid">
                <article className="why-card">
                  <h3>Enterprise data is complex and regulated</h3>
                  <p>In banking and healthcare, data cannot simply be fed into an open AI tool. It requires strict governance, IFRS 9 / Basel compliance, and SAS-audited pipelines.</p>
                </article>
                <article className="why-card">
                  <h3>Isolated dashboards fail to drive action</h3>
                  <p>A static chart only shows what happened yesterday. Modern enterprises require predictive analytics that forecast what will happen tomorrow and recommend interventions.</p>
                </article>
                <article className="why-card">
                  <h3>Departmental handoffs waste valuable time</h3>
                  <p>When database admins, BI developers, and data scientists work in isolation, months are lost translating requirements. One professional covering the path moves 5x faster.</p>
                </article>
              </div>

              <div className="vs">
                <div className="vs-box then">
                  <h3>The Siloed Model: 5 Specialists for One Insight</h3>
                  <ul>
                    <li>A Database Admin to write raw SQL queries</li>
                    <li>A Reporting Analyst to build static Excel spreadsheets</li>
                    <li>A BI Developer to recreate measures in Power BI</li>
                    <li>A Statistician to interpret correlations in SAS</li>
                    <li>A Machine Learning Engineer to attempt predictive modeling</li>
                  </ul>
                </div>
                <div className="vs-box now">
                  <h3>The APIDA Advantage: One High-Impact Professional</h3>
                  <ul>
                    <li>Queries and manages enterprise databases with SQL Server and SAS</li>
                    <li>Constructs interactive executive BI dashboards in Power BI and Tableau</li>
                    <li>Applies rigorous statistical testing and builds predictive ML models</li>
                    <li>Translates complex analytical findings directly to executive leadership</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="ai" id="ai-cannot-replace">
            <div className="wrap">
              <div className="sec-head">
                <h2>Why AI Cannot Replace an Industrial Data Analytics &amp; AI Professional</h2>
                <p className="lead">
                  AI tools can write boilerplate SQL queries or generate standard charts. But they lack the domain understanding, compliance judgment, and executive presentation capabilities required to lead industrial decision-making.
                </p>
              </div>

              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>If your job is only…</th>
                      <th>What AI can already do</th>
                      <th>What is still missing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Writing basic SELECT queries</td>
                      <td>Generates SQL syntax from simple prompts</td>
                      <td>Someone must understand custom ERP schemas, data anomalies, and business logic</td>
                    </tr>
                    <tr>
                      <td>Generating basic Excel charts</td>
                      <td>Creates standard bar and line graphs</td>
                      <td>Someone must determine which KPIs actually drive executive revenue and profitability</td>
                    </tr>
                    <tr>
                      <td>Running automated statistical tests</td>
                      <td>Calculates p-values and summary tables</td>
                      <td>Someone must determine whether statistical significance translates to practical commercial impact</td>
                    </tr>
                    <tr>
                      <td>Fitting a standard regression model</td>
                      <td>Trains standard AutoML algorithms</td>
                      <td>Someone must evaluate regulatory fairness, prevent target leakage, and interpret feature weights</td>
                    </tr>
                    <tr>
                      <td>Writing presentation bullet points</td>
                      <td>Drafts generic summaries of numbers</td>
                      <td>Someone must answer tough executive questions, defend trade-offs, and recommend strategic bets</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="four">
                <h3>The Barbell Theory of Tech Careers</h3>
                <p className="sub">
                  AI automates the repetitive middle. Career resilience exists at the two outer ends: business context on the left, live deployment ownership on the right.
                </p>
                <div className="parts">
                  <div className="part">
                    <b>Basic Report Maker</b>
                    <span className="d">Copies numbers into spreadsheets without understanding business drivers.</span>
                    <div className="meter s1"><i /><i /><i /></div>
                    <span className="tag w">High Risk</span>
                  </div>

                  <div className="part">
                    <b>Single-Tool Specialist</b>
                    <span className="d">Knows only one visualization tool; completely blocked when data is dirty.</span>
                    <div className="meter s2"><i /><i /><i /></div>
                    <span className="tag m">Medium Risk</span>
                  </div>

                  <div className="part">
                    <b>Theoretical Modeler</b>
                    <span className="d">Builds models in notebooks that never connect to real operational systems.</span>
                    <div className="meter s2"><i /><i /><i /></div>
                    <span className="tag m">Medium Risk</span>
                  </div>

                  <div className="part">
                    <b>Industrial Analytics Pro</b>
                    <span className="d">Extracts enterprise data, builds BI dashboards, and deploys predictive ML.</span>
                    <div className="meter s3"><i /><i /><i /></div>
                    <span className="tag s">Most Resilient</span>
                  </div>
                </div>
              </div>

              <div className="pull">
                &quot;AI can produce the charts. It cannot sit with a department head, interpret risk, and <span>guide million-dollar decisions.</span>&quot;
              </div>
              <div className="note">
                The safest career strategy in tech is building a multi-disciplinary mix of skills that is hard to copy. That is exactly what this program teaches.
              </div>
            </div>
          </section>

          <div className="deep-dive-collapse-bottom">
            <button
              type="button"
              className="know-more-toggle-btn secondary"
              onClick={() => {
                setShowDeepDive(false);
                const el = document.getElementById('skills');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Collapse Analysis &amp; Continue to Skills ↑</span>
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------
          SECTION 6: WHO CAN START THIS CAREER?
          ------------------------------------------------------------------------- */}
      <section className="who-can" id="who-can-start" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Who Can Build a High-Growth Career in Industrial Data Analytics?</h2>
            <p className="lead">
              The APIDA program is crafted to support ambitious learners from diverse academic disciplines. No prior coding experience is required; we teach database programming and visual analytics step by step.
            </p>
          </div>

          <div className="who-can-grid">
            <div className="who-can-card">
              <span className="who-badge">Commerce &amp; Finance</span>
              <h3>B.Com, BBA &amp; MBA Graduates</h3>
              <p>Leverage your business understanding to master high-demand financial risk analytics, banking scorecards, and executive BI reporting.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">Tech &amp; Engineering</span>
              <h3>B.Tech, BE, BCA &amp; MCA</h3>
              <p>Combine your logical and technical foundation with SQL, SAS, Power BI, and Machine Learning to target high-paying data roles.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">Science &amp; Math</span>
              <h3>B.Sc &amp; M.Sc (Stats / Maths / CS)</h3>
              <p>Turn your quantitative background into practical industrial modeling across telecom, healthcare, and predictive analytics.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">Working Professionals</span>
              <h3>Operations &amp; MIS Analysts</h3>
              <p>Transition from manual Excel and legacy reporting into automated Power BI dashboards, Python modeling, and MLOps.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">Campus to Career</span>
              <h3>Final-Year Students</h3>
              <p>Secure a competitive campus placement advantage by mastering industry tools (SAS, SQL, Power BI) demanded by top BFSI recruiters.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">Confident Relaunch</span>
              <h3>Professionals with a Career Gap</h3>
              <p>Re-enter the professional workforce with demonstrable proof-of-work capstone projects across banking, retail, and telecom.</p>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <span style={{ font: '700 0.78rem/1 var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>
              Eligible Degree Backgrounds Include:
            </span>
            <div className="degree-pills-wrap">
              <span className="degree-pill">B.Com</span>
              <span className="degree-pill">BBA</span>
              <span className="degree-pill">BA</span>
              <span className="degree-pill">B.Sc (All Streams)</span>
              <span className="degree-pill">BCA</span>
              <span className="degree-pill">B.Tech / B.E.</span>
              <span className="degree-pill">MBA</span>
              <span className="degree-pill">MCA</span>
              <span className="degree-pill">M.Tech / M.Sc</span>
            </div>
          </div>

          <div className="who-note-box">
            <strong>Foundation-First Pedagogy:</strong> You do not need prior programming expertise to excel in APIDA. We start from SQL fundamentals and Excel AI before advancing into SAS, Power BI, Python, and Machine Learning algorithms.
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 7: DETAILED CURRICULUM (THE 5 PILLARS)
          ------------------------------------------------------------------------- */}
      <section id="skills" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>The 5 Pillars of Industrial Data Analytics &amp; AI</h2>
            <p className="lead">
              A comprehensive industry curriculum structured into 5 foundational pillars. Learn each skill systematically, then apply them together in real-world capstone projects. <strong>Tap any pillar below to inspect topics and deliverables.</strong>
            </p>
          </div>

          <div className="stages" style={{ marginTop: '28px' }}>
            <div className="stages-head">
              <span className="steps-title">The 5 Pillars of Curriculum</span>
              <span className="hint">Tap a pillar to open details</span>
            </div>

            {learningPathModules.map((m, idx) => (
              <details className="stage" name="pillars-accordion" key={m.id} open={idx === 0}>
                <summary>
                  <span className="sn">{m.id}</span>
                  <span className="st">
                    <b>Pillar 0{m.id} · {m.title} {m.id === 1 ? '· (Foundation Start)' : ''}</b>
                    <small>{m.summary}</small>
                  </span>
                  <span className="sx" aria-hidden="true" />
                </summary>
                <div className="sb">
                  <div>
                    <h4>Topics &amp; Practical Deliverables</h4>
                    <ul className="do">
                      {m.topics.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>What you achieve</h4>
                    <p>{m.summary}</p>
                    <h4 className="h2b">Skills &amp; Technologies</h4>
                    <div className="tags">
                      {m.techChips.map((chip, cIdx) => (
                        <span key={cIdx}>{chip}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="split" style={{ marginTop: '40px' }}>
            <div>
              <h3>How much of the job is code?</h3>
              <div className="bar" role="img" aria-label="50% Data Management & BI, 30% Statistical & ML Modeling, 20% Business Strategy & Gen AI">
                <div className="b1" style={{ width: '50%' }}>50%<span className="bar-tag"> Data &amp; BI</span></div>
                <div className="b2" style={{ width: '30%' }}>30%<span className="bar-tag"> Stats &amp; ML</span></div>
                <div className="b3" style={{ width: '20%' }}>20%<span className="bar-tag"> Strategy</span></div>
              </div>
              <div className="legend">
                <div><b>50% Data Management &amp; BI:</b> SQL Server, MySQL, Base/Advanced SAS, Excel AI, Power BI DAX, and Tableau storytelling.</div>
                <div><b>30% Stats &amp; Machine Learning:</b> Hypothesis testing, probability, scikit-learn, XGBoost, and churn/credit risk modeling.</div>
                <div><b>20% Business Strategy &amp; Gen AI:</b> Framing executive KPIs, MLOps deployment with FastAPI, and Gen AI analytical assistants.</div>
              </div>
            </div>

            <div>
              <h3>In what order do you learn?</h3>
              <ol className="order">
                <li data-n="1">
                  <div><b>Enterprise Data Management:</b> Query relational databases with SQL Server and master Base/Advanced SAS programming.</div>
                </li>
                <li data-n="2">
                  <div><b>Data Analysis &amp; Visualisation:</b> Model business metrics with DAX in Power BI, design Tableau dashboards, and automate Excel.</div>
                </li>
                <li data-n="3">
                  <div><b>Statistical Analytics &amp; Modeling:</b> Learn probability distributions, conduct hypothesis tests, and diagnose regression assumptions.</div>
                </li>
                <li data-n="4">
                  <div><b>Machine Learning &amp; Predictive Analytics:</b> Train supervised classification, regression, and clustering algorithms in Python.</div>
                </li>
                <li data-n="5">
                  <div><b>MLOps &amp; Gen AI Business Integration:</b> Deploy predictive microservices with FastAPI, monitor drift, and build Gen AI assistants.</div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 8: TOOLS SECTION (COURSE-SPECIFIC SUB-SECTIONS)
          ------------------------------------------------------------------------- */}
      <section className="tools" id="tools">
        <div className="wrap">
          <div className="sec-head">
            <h2>The Tools an Industrial Data Analytics Professional Uses Every Day</h2>
            <p className="lead">
              You will gain practical, hands-on exposure to the entire analytics technology stack trusted by Fortune 500 banks, retail corporations, and top analytics consultancies.
            </p>
          </div>

          {/* Sub-section 1: Enterprise Data Management & Database Engineering (8 tools) */}
          <div className="tg">
            <div className="tg-head">
              <h3>Enterprise Data Management &amp; Database Systems</h3>
              <span>Skill Group 1 · Database Extraction, Data Steps &amp; Transformation</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#CC292B" d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.48 8 2s-3.03 2-8 2-8-1.48-8-2 3.03-2 8-2zm8 14c0 .52-3.03 2-8 2s-8-1.48-8-2v-2.22c1.94 1.34 4.86 2.22 8 2.22s6.06-.88 8-2.22V18zm0-4c0 .52-3.03 2-8 2s-8-1.48-8-2v-2.22c1.94 1.34 4.86 2.22 8 2.22s6.06-.88 8-2.22V14zm0-4c0 .52-3.03 2-8 2s-8-1.48-8-2V7.78c1.94 1.34 4.86 2.22 8 2.22s6.06-.88 8-2.22V10z"/>
                  </svg>
                </span>
                <div>
                  <strong>SQL Server</strong>
                  <small>Query enterprise relational databases &amp; optimize joins</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00758F" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </span>
                <div>
                  <strong>MySQL</strong>
                  <small>Manage open-source relational schemas &amp; constraints</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <img src="/tools/sas.png" alt="SAS Studio logo" className="tl-sas" width="34" height="17" loading="lazy" />
                </span>
                <div>
                  <strong>Base SAS</strong>
                  <small>DATA steps, conditional logic, informats &amp; formats</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <img src="/tools/sas.png" alt="SAS Studio logo" className="tl-sas" width="34" height="17" loading="lazy" />
                </span>
                <div>
                  <strong>Advanced SAS</strong>
                  <small>PROC SQL, SAS macro programming &amp; batch pipelines</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#336791" d="M12.002 0c-3.16 0-5.875 1.588-6.91 3.993-.36 1.074-.53 2.254-.487 3.535.045 1.353.305 2.82.808 4.341l.053.153c-.368.74-.707 1.56-.983 2.47-.563 1.89-.718 3.666-.374 4.737.207.643.62.857 1.11.857.55 0 1.206-.282 1.895-.826.634-.5 1.236-1.2 1.788-2.057.344.076.702.13 1.076.153.955.061 1.864-.092 2.66-.428.75-.32 1.344-.81 1.765-1.452.45-.688.68-1.55.672-2.536-.008-1.116-.32-2.132-.902-2.965-.512-.74-1.207-1.284-2.04-1.62.008-.2.008-.4 0-.588-.054-1.13-.36-2.155-.902-2.995-.58-.894-1.406-1.574-2.407-1.994-.6-.252-1.284-.42-2.008-.458z"/>
                  </svg>
                </span>
                <div>
                  <strong>PostgreSQL</strong>
                  <small>Analytical SQL queries, CTEs &amp; window functions</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#E25A1C" d="M12.005 0C5.378 0 0 5.378 0 12.005c0 6.628 5.378 12.005 12.005 12.005 6.628 0 12.005-5.377 12.005-12.005C24.01 5.378 18.633 0 12.005 0zm6.81 18.17l-1.99-1.99a5.955 5.955 0 0 1-4.82 2.45c-3.308 0-5.99-2.682-5.99-5.99 0-1.84.83-3.48 2.14-4.58l-1.41-1.41a7.96 7.96 0 0 0-2.73 5.99c0 4.41 3.59 8 8 8 2.44 0 4.62-1.1 6.09-2.83l.71.36z"/>
                  </svg>
                </span>
                <div>
                  <strong>PySpark &amp; Spark SQL</strong>
                  <small>Large-scale distributed data processing &amp; DataFrames</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F03C2E" d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z"/>
                  </svg>
                </span>
                <div>
                  <strong>Git</strong>
                  <small>Track every analytical script &amp; version history</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </span>
                <div>
                  <strong>GitHub</strong>
                  <small>Share analytics code, reviews &amp; project repositories</small>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-section 2: Business Intelligence & Visual Storytelling (8 tools) */}
          <div className="tg" style={{ marginTop: '28px' }}>
            <div className="tg-head">
              <h3>Business Intelligence &amp; Visual Analytics</h3>
              <span>Skill Group 2 · Executive Dashboards, DAX &amp; Visual Storytelling</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <img src="/tools/power-bi.svg" alt="Microsoft Power BI logo" width="28" height="28" loading="lazy" />
                </span>
                <div>
                  <strong>Microsoft Power BI</strong>
                  <small>Build executive KPI dashboards &amp; interactive reports</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </span>
                <div>
                  <strong>DAX (Data Analysis Expressions)</strong>
                  <small>Dynamic business metrics, CALCULATE &amp; time intelligence</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#E97627" d="M11.39 0v2.75h1.22V0h-1.22zm0 21.25V24h1.22v-2.75h-1.22zM21.25 11.39v1.22H24v-1.22h-2.75zM0 11.39v1.22h2.75v-1.22H0zm11.08 4.62v3.08h1.84v-3.08h-1.84zm0-10.78v3.08h1.84V5.23h-1.84zm-5.85 5.85v1.84h3.08v-1.84H5.23zm10.78 0v1.84h3.08v-1.84h-3.08zm-5.08-1.54v4.92h2.16v-4.92h-2.16zm-5.08 7.39v1.54h1.54v-1.54H5.85zm12.3 0v1.54h1.54v-1.54h-1.54zm0-12.3v1.54h1.54V6.46h-1.54zm-12.3 0v1.54h1.54V6.46H5.85z"/>
                  </svg>
                </span>
                <div>
                  <strong>Tableau Desktop</strong>
                  <small>Interactive visual analytics &amp; geographical reporting</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <img src="/tools/excel.png" alt="Microsoft Excel logo" width="28" height="28" loading="lazy" />
                </span>
                <div>
                  <strong>Excel + AI</strong>
                  <small>Advanced pivot modeling, lookups &amp; Copilot formulas</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
                </span>
                <div>
                  <strong>Power Query</strong>
                  <small>Automated ETL pipelines, data cleaning &amp; transformation</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4"/></svg>
                </span>
                <div>
                  <strong>Power Pivot</strong>
                  <small>Dimensional data modeling, star schemas &amp; relationships</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <img src="/tools/power-bi.svg" alt="Microsoft Power BI logo" width="28" height="28" loading="lazy" />
                </span>
                <div>
                  <strong>Power BI Service</strong>
                  <small>Cloud workspace sharing, scheduled refresh &amp; RLS security</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E97627" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
                </span>
                <div>
                  <strong>Tableau Server &amp; Cloud</strong>
                  <small>Executive dashboard distribution &amp; automated alerts</small>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-section 3: Statistical Analytics & Inferential Modeling (8 tools) */}
          <div className="tg" style={{ marginTop: '28px' }}>
            <div className="tg-head">
              <h3>Statistical Analytics &amp; Inferential Science</h3>
              <span>Skill Group 3 · Hypothesis Testing, Probability &amp; Econometrics</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>
                </span>
                <div>
                  <strong>Python Programming</strong>
                  <small>Automated scripting, data wrangling &amp; API requests</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <rect x="3" y="6" width="3.5" height="12" rx="1.5" fill="#150458"/>
                    <rect x="8.5" y="3" width="3.5" height="18" rx="1.5" fill="#E70488"/>
                    <rect x="14" y="7" width="3.5" height="14" rx="1.5" fill="#150458"/>
                    <rect x="19.5" y="5" width="3.5" height="10" rx="1.5" fill="#00C896"/>
                    <circle cx="15.75" cy="4.25" r="1.5" fill="#E70488"/>
                  </svg>
                </span>
                <div>
                  <strong>Pandas</strong>
                  <small>High-performance data frames, reshaping &amp; cleaning</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#013243" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
                </span>
                <div>
                  <strong>NumPy</strong>
                  <small>Vectorized numerical computing, arrays &amp; matrix math</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                </span>
                <div>
                  <strong>Statsmodels</strong>
                  <small>OLS regression, p-values &amp; econometric diagnostics</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path d="M3 19h18" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3 19c3.2 0 5.2-14 9-14s5.8 14 9 14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5v14" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx="12" cy="5" r="2" fill="#2563EB" />
                    <path d="M8.5 12v7M15.5 12v7" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 2" />
                  </svg>
                </span>
                <div>
                  <strong>SciPy &amp; Inferential Stats</strong>
                  <small>Hypothesis testing (t-tests, ANOVA, Chi-Square) &amp; p-values</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F37626" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="1.5" fill="#F37626"/><circle cx="19" cy="19" r="1.5" fill="#F37626"/></svg>
                </span>
                <div>
                  <strong>Jupyter Notebook</strong>
                  <small>Interactive exploratory data analysis &amp; reproducible notes</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                </span>
                <div>
                  <strong>Matplotlib &amp; Seaborn</strong>
                  <small>Statistical distribution plots &amp; correlation heatmaps</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <img src="/tools/sas.png" alt="SAS Studio logo" className="tl-sas" width="34" height="17" loading="lazy" />
                </span>
                <div>
                  <strong>SAS STAT</strong>
                  <small>Inferential procedures (PROC REG, GLM &amp; LOGISTIC)</small>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-section 4: Machine Learning & Predictive Modeling (8 tools) */}
          <div className="tg" style={{ marginTop: '28px' }}>
            <div className="tg-head">
              <h3>Machine Learning &amp; Predictive Analytics</h3>
              <span>Skill Group 4 · Supervised Classification, Regression &amp; Ensembles</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F89939" d="M12 2a10 10 0 0 0-7.8 16.2l3.4-3.4A5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 5.4 4.5h4.6A10 10 0 0 0 12 2z" />
                    <path fill="#3499CD" d="M12 22a10 10 0 0 0 7.8-16.2l-3.4 3.4A5.5 5.5 0 0 1 12 17.5a5.5 5.5 0 0 1-5.4-4.5H2a10 10 0 0 0 10 9z" />
                    <circle cx="12" cy="12" r="2.5" fill="#141A4A" />
                  </svg>
                </span>
                <div>
                  <strong>scikit-learn</strong>
                  <small>Classification, regression, clustering &amp; pipelines</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </span>
                <div>
                  <strong>XGBoost</strong>
                  <small>Extreme gradient boosted trees for tabular accuracy</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </span>
                <div>
                  <strong>LightGBM</strong>
                  <small>Fast, memory-efficient tree boosting for big datasets</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M2 18c6 0 7-12 13-12s3 12 7 12"/></svg>
                </span>
                <div>
                  <strong>Logistic Regression</strong>
                  <small>Credit risk scorecards, odds ratios &amp; default modeling</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><polygon points="12 2 2 12 6 12 2 18 9 18 9 22 15 22 15 18 22 18 18 12 22 12 12 2"/></svg>
                </span>
                <div>
                  <strong>Random Forest</strong>
                  <small>Ensemble decision trees &amp; non-linear customer modeling</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </span>
                <div>
                  <strong>Feature Engineering</strong>
                  <small>Imputation, encodings, scaling &amp; target transformation</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>
                </span>
                <div>
                  <strong>SHAP &amp; Model Trust</strong>
                  <small>Explainable AI, feature importance &amp; regulatory trust</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                </span>
                <div>
                  <strong>Time Series / ARIMA</strong>
                  <small>Trend forecasting, seasonality &amp; financial projections</small>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-section 5: Generative AI, MLOps & Production Delivery (8 tools) */}
          <div className="tg" style={{ marginTop: '28px' }}>
            <div className="tg-head">
              <h3>Generative AI, MLOps &amp; Production Delivery</h3>
              <span>Skill Group 5 · Model Serving, AI Assistants &amp; Cloud Operations</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </span>
                <div>
                  <strong>FastAPI</strong>
                  <small>Serve predictive models through high-throughput REST APIs</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FF4B4B" strokeWidth="2"><polygon points="12 2 2 22 22 22 12 2"/></svg>
                </span>
                <div>
                  <strong>Streamlit</strong>
                  <small>Build interactive analytical web apps for stakeholders</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2496ED" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M6 10h3v4H6z"/><path d="M11 10h3v4h-3z"/><path d="M16 10h3v4h-3z"/></svg>
                </span>
                <div>
                  <strong>Docker</strong>
                  <small>Package analytics services into production containers</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#7FC8FF" d="M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z" />
                  </svg>
                </span>
                <div>
                  <strong>LangChain</strong>
                  <small>Connect LLMs to enterprise SQL for natural-language reporting</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <b>AI</b>
                </span>
                <div>
                  <strong>OpenAI &amp; Claude LLMs</strong>
                  <small>Executive summaries, prompt engineering &amp; report bots</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#0D9488" strokeWidth="1.8" />
                    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#0D9488" strokeWidth="1.8" />
                    <path d="M4 11v6c0 1.66 3.58 3 8 3 1.2 0 2.33-.1 3.34-.28" stroke="#0D9488" strokeWidth="1.8" />
                    <circle cx="17.5" cy="17.5" r="3.5" stroke="#14B8A6" strokeWidth="1.8" fill="#F0FDFA" />
                    <path d="M20 20l2.5 2.5" stroke="#14B8A6" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M16 17.5h3" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <strong>Enterprise RAG</strong>
                  <small>Vector retrieval over financial filings &amp; policy documents</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" fill="url(#genai-spark-grad-apida)" />
                    <circle cx="19" cy="5" r="2" fill="#8B5CF6" />
                    <circle cx="5" cy="18" r="1.5" fill="#EC4899" />
                    <defs>
                      <linearGradient id="genai-spark-grad-apida" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6" />
                        <stop offset="1" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <div>
                  <strong>Copilot for Analytics</strong>
                  <small>AI-assisted DAX measures, SQL queries &amp; Excel formulas</small>
                </div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FCC624" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                </span>
                <div>
                  <strong>Linux &amp; Bash</strong>
                  <small>Server automation, automated cron jobs &amp; shell scripts</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 9: REAL-TIME INDUSTRY PROJECTS
          ------------------------------------------------------------------------- */}
      <section className="industry-projects-section" id="projects" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Real-Time Industry Capstone Projects</h2>
            <p className="lead">
              Apply your end-to-end data skills to realistic business scenarios across Banking, Telecom, E-Commerce, and Healthcare. Document your work, explain trade-offs, and showcase live portfolio builds.
            </p>
          </div>

          <div className="industry-projects-grid">
            <div className="proj-card">
              <span className="proj-badge">Banking &amp; Finance</span>
              <h3>Credit Risk Scorecard Development</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Develop application and behavioral risk scorecards to estimate default probability using historical lending and credit bureau data.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Industrial Deliverable</span>
                <p className="proj-section-text">SQL Feature Extraction → SAS WoE/IV Calculation → Logistic Regression Scorecard → Underwriter Scoring Table.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Regulatory Finance</span>
              <h3>IFRS 9 Expected Credit Loss (ECL) Modeling</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Construct Probability of Default (PD), Loss Given Default (LGD), and Exposure at Default (EAD) models for regulatory provision reporting.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Industrial Deliverable</span>
                <p className="proj-section-text">DPD Bucketing in SAS → Macro-Economic Staging → Power BI Provisioning Dashboard.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Banking Security</span>
              <h3>Financial Fraud Detection &amp; Anomaly Monitoring</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Identify suspicious transactional behavior and prevent money laundering using machine learning classification and anomaly detection.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Industrial Deliverable</span>
                <p className="proj-section-text">Imbalanced Data Handling (SMOTE) → XGBoost Anomaly Classifier → Live FastAPI Alert Microservice.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Telecom Analytics</span>
              <h3>Customer Churn Prediction &amp; Retention Strategy</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Predict subscribers likely to discontinue services using recharge patterns, complaint tickets, and data usage trends before lapse occurs.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Industrial Deliverable</span>
                <p className="proj-section-text">Random Forest Classifier → Customer Lifetime Risk Scoring → Power BI Churn Intervention Dashboard.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Telecom Business Intelligence</span>
              <h3>Executive Revenue &amp; ARPU Analytics Dashboard</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Analyze Average Revenue Per User (ARPU), regional subscriber growth, recharge plan profitability, and network service quality metrics.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Industrial Deliverable</span>
                <p className="proj-section-text">Power BI Star Schema → Advanced DAX Time-Intelligence → Executive C-Suite Storytelling Report.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Retail &amp; Supply Chain</span>
              <h3>Store-Level Demand Forecasting &amp; Inventory Planning</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Forecast weekly SKU sales across retail locations to optimize warehouse stock levels and minimize costly stockout losses.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Industrial Deliverable</span>
                <p className="proj-section-text">Time Series Decomposition → Lag Feature Engineering → Tableau Visual Inventory Reorder Board.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">E-Commerce Intelligence</span>
              <h3>Customer Lifetime Value (CLV) &amp; Recommendation Engine</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Estimate high-value customer segments using RFM clustering and build personalized product recommendations based on shopping history.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Industrial Deliverable</span>
                <p className="proj-section-text">K-Means Customer Segmentation → Collaborative Filtering Engine → Streamlit Recommendation Demo.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Healthcare Operations</span>
              <h3>Hospital Patient Flow &amp; Bed Occupancy Analytics</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Forecast patient admission rates, emergency triage bottlenecks, and bed occupancy to optimize hospital staffing and clinical resources.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Industrial Deliverable</span>
                <p className="proj-section-text">Regression Modeling → Statistical Confidence Intervals → Interactive Hospital Operational Dashboard.</p>
              </div>
            </div>
          </div>

          <p className="pnote" style={{ marginTop: '22px' }}>
            *These are proposed project options. The selected projects, mentoring arrangements and deployment depth should be specified for each batch.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 10: SUCCESS @ DV ANALYTICS (6-STEP CAREER ENGINE)
          ------------------------------------------------------------------------- */}
      <section className="career-engine-section" id="career-engine" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>
              Success @ DV Analytics:{' '}
              <span className="career-engine-highlight">The 6-Step Career Engine</span>
            </h2>
            <p className="lead">
              A disciplined, mentor-led pathway ensuring you build skills step by step and present your work with executive confidence.
            </p>
          </div>

          <div className="career-engine-grid">
            <div className="engine-card">
              <span className="engine-step">Step 01</span>
              <h3>Regular Classes</h3>
              <p>Attend consistently, participate actively and review difficult topics. Build deep data and statistical understanding step by step with mentors.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 02</span>
              <h3>Hands-on Assignments</h3>
              <p>Practise coding after each module. Use mentor code feedback to correct mistakes and develop independent problem-solving capabilities.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 03</span>
              <h3>Industry Projects</h3>
              <p>Apply learning to realistic business scenarios. Demonstrate data preparation, modeling, evaluation and cloud deployment through documented work.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 04</span>
              <h3>Profile Building</h3>
              <p>Develop a focused resume, LinkedIn profile and public GitHub portfolio. Learn to explain your projects and connect your past domain experience.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 05</span>
              <h3>AI Enabled Tests &amp; Mock Interviews</h3>
              <p>Use practical assessments to identify skill gaps and mock interviews to improve technical explanations, business reasoning and executive communication.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 06</span>
              <h3>100% Placement Support</h3>
              <p>Receive the placement services included in DV’s written programme terms: profile preparation, interview practice, application guidance and opportunity coordination.</p>
            </div>
          </div>

          <div className="who-note-box" style={{ marginTop: '28px', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '6px' }}>
              Learn consistently. Build independently. Explain confidently. Deploy practically.
            </strong>
            <span style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
              Placement support does not guarantee employment or a particular salary. Student preparation, eligibility and employer selection determine individual outcomes.
            </span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          COMPANIES THAT HIRES YOU (CAREER PLACEMENTS)
          ------------------------------------------------------------------------- */}
      <CompaniesSection />

      {/* -------------------------------------------------------------------------
          SECTION 11: STUDENT SUCCESS STORIES
          ------------------------------------------------------------------------- */}
      <section className="lp-stories-section" id="stories" aria-label="Student Success Stories">
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: 'center', margin: '0 auto 36px', alignItems: 'center' }}>
            <h2>Student Success Stories</h2>
            <p className="lead" style={{ textAlign: 'center' }}>
              Real career transformations from our classroom to industry leaders. Verified placements across premier global tech, banking, and analytics enterprises.
            </p>
          </div>
        </div>

        <div className="lp-stories-marquee-wrapper" title="Scroll or hover to inspect student placement details">
          <div className="lp-stories-track">
            {/* First Set */}
            <div className="lp-stories-group">
              {successStoryPosters.map((poster, pIdx) => (
                <div
                  key={`story-set1-${pIdx}-${poster}`}
                  className="lp-story-card"
                  onClick={scrollToForm}
                  role="button"
                  tabIndex={0}
                  title="Click to register for APIDA batch"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') scrollToForm();
                  }}
                >
                  <img
                    src={`/Success Stories/${poster}`}
                    alt={`DV Analytics Student Placement Story ${pIdx + 1}`}
                    className="lp-story-img"
                    loading={pIdx < 4 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Second Duplicate Set for Infinite Loop */}
            <div className="lp-stories-group" aria-hidden="true">
              {successStoryPosters.map((poster, pIdx) => (
                <div
                  key={`story-set2-${pIdx}-${poster}`}
                  className="lp-story-card"
                  onClick={scrollToForm}
                  role="button"
                  tabIndex={-1}
                >
                  <img
                    src={`/Success Stories/${poster}`}
                    alt=""
                    className="lp-story-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="wrap" style={{ textAlign: 'center', marginTop: '16px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontStyle: 'italic' }}>
            * Hover to pause banner • Click any story to reserve your seat in the upcoming batch
          </span>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 12: VERIFIED GOOGLE REVIEWS
          ------------------------------------------------------------------------- */}
      <section className="lp-reviews-section" id="reviews" aria-label="Student Testimonials">
        <div className="wrap">
          <div className="lp-reviews-header-row">
            <div className="sec-head" style={{ margin: 0, maxWidth: '620px' }}>
              <h2>Verified Google Reviews</h2>
              <p className="lead" style={{ margin: 0 }}>
                Authentic, unedited feedback from our learners. See what students say about our curriculum, mentoring, hands-on projects, and placement support.
              </p>
            </div>

            <div className="lp-reviews-controls">
              <a
                href={GOOGLE_REVIEWS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-reviews-trust-pill"
                title="View all verified reviews on Google"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <div className="lp-trust-text">
                  <strong>4.9 ★★★★★</strong>
                  <span>1,200+ Reviews</span>
                </div>
              </a>

              <div className="lp-nav-buttons-group">
                <button
                  type="button"
                  className="lp-review-nav-btn"
                  onClick={prevReview}
                  aria-label="Previous Review"
                  title="Previous Review"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="lp-review-nav-btn"
                  onClick={nextReview}
                  aria-label="Next Review"
                  title="Next Review"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="lp-reviews-grid"
            onMouseEnter={() => setIsReviewPaused(true)}
            onMouseLeave={() => setIsReviewPaused(false)}
            onFocus={() => setIsReviewPaused(true)}
            onBlur={() => setIsReviewPaused(false)}
          >
            {[0, 1, 2].map((offset) => {
              const review = googleReviewsData[(reviewIndex + offset) % totalReviews];
              return (
                <div
                  key={`${review.id}-${offset}`}
                  className="lp-review-card"
                  onClick={() => window.open(GOOGLE_REVIEWS_LINK, '_blank', 'noopener,noreferrer')}
                  title="Click to view verified review on Google"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') window.open(GOOGLE_REVIEWS_LINK, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <div>
                    <div className="lp-review-card-top">
                      <div className="lp-review-user">
                        <div
                          className="lp-review-avatar"
                          style={{ backgroundColor: review.avatarBg }}
                          aria-hidden="true"
                        >
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="lp-review-user-info">
                          <div className="lp-review-name-row">
                            <h4 className="lp-review-name">{review.name}</h4>
                            {review.isLocalGuide && (
                              <span className="lp-review-guide-badge">Local Guide</span>
                            )}
                          </div>
                          {review.details && (
                            <span className="lp-review-meta">{review.details}</span>
                          )}
                        </div>
                      </div>

                      <div className="lp-review-google-logo" title="Verified Google Review">
                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                      </div>
                    </div>

                    <div className="lp-review-stars-row">
                      <div className="lp-review-stars">{renderReviewStars(review.rating)}</div>
                      <span className="lp-review-date">{review.date}</span>
                    </div>

                    <div className="lp-review-body">
                      {review.text.split('\n').filter(Boolean).map((para, pIdx) => (
                        <p key={pIdx} style={{ margin: '0 0 6px 0' }}>{para}</p>
                      ))}
                    </div>
                  </div>

                  <div className="lp-review-link">
                    <span>Read on Google</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 13: FREQUENTLY ASKED QUESTIONS (FAQS)
          ------------------------------------------------------------------------- */}
      <section id="faq" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap faq">
          <div className="sec-head">
            <h2>Industrial Data Analytics &amp; AI (APIDA) FAQs</h2>
            <p className="lead">
              Clear, transparent answers directly addressing curriculum, prerequisites, SAS industry relevance, tools, and career support.
            </p>
          </div>

          <details className="q" open>
            <summary>1. What is APIDA and how is it tailored for industrial analytics roles?</summary>
            <div style={{ marginTop: '12px' }}>
              <p>
                The <strong>Advanced Program in Industrial Data Analytics &amp; AI (APIDA)</strong> is specifically engineered to prepare graduates and working professionals for commercial analytics roles in Banking, Financial Services, Insurance (BFSI), Healthcare, and Telecom. It combines enterprise database querying (SQL, SAS), executive reporting (Power BI, Tableau, Excel AI), and predictive modeling (Python, Machine Learning, MLOps) into one cohesive, practical program.
              </p>
            </div>
          </details>

          <details className="q">
            <summary>2. Why does APIDA teach SAS alongside Python and SQL?</summary>
            <div style={{ marginTop: '12px' }}>
              <p>
                While Python is popular for general machine learning, <strong>SAS</strong> remains the gold standard in global banking (Wells Fargo, HDFC, Citi, HSBC, Barclays) and clinical research for regulatory compliance (IFRS 9, Basel III, FDA trials). Candidates who know both SAS and Python have a distinct hiring advantage over those who only know open-source tools.
              </p>
            </div>
          </details>

          <details className="q">
            <summary>3. What is the difference between APIDA and APIDS?</summary>
            <div style={{ marginTop: '12px' }}>
              <p>
                <strong>APIDA</strong> focuses heavily on industrial data management, executive business intelligence, statistical risk analytics, and predictive modeling for commercial sectors (BFSI, Telecom, Healthcare). <strong>APIDS</strong> extends deeper into advanced computer vision, deep learning neural networks, Generative AI agent architectures, and cloud deployment engineering. Both programs share core data management and machine learning foundations.
              </p>
            </div>
          </details>

          <details className="q">
            <summary>4. Can non-programmers or commerce/finance graduates succeed in APIDA?</summary>
            <div style={{ marginTop: '12px' }}>
              <p>
                Yes, absolutely. Over 60% of our APIDA learners come from commerce (B.Com, BBA, MBA), mathematics, economics, and non-coding backgrounds. The program begins from zero with SQL fundamentals and Excel AI before transitioning into SAS, Power BI, and Python programming, with personalized mentoring throughout.
              </p>
            </div>
          </details>

          <details className="q">
            <summary>5. What roles and salary benchmarks do APIDA graduates target?</summary>
            <div style={{ marginTop: '12px' }}>
              <p>
                Graduates transition into roles such as <strong>Industrial Data Analyst</strong>, <strong>Credit Risk Analyst</strong>, <strong>Business Intelligence Developer</strong>, <strong>SAS Programmer</strong>, and <strong>Analytics Consultant</strong>. Average starting packages for freshers range from ₹6–10 LPA, while experienced professionals transitioning into senior analyst roles benchmark between <strong>₹25+ to 35+ LPA</strong>.
              </p>
            </div>
          </details>

          <details className="q">
            <summary>6. What placement support is provided by DV Analytics?</summary>
            <div style={{ marginTop: '12px' }}>
              <p>
                DV Analytics provides 100% placement support through the 6-Step Career Engine: 1-on-1 resume optimization, public BI and analytics portfolio creation, practical test assessments, domain-specific mock interviews with industry leaders, and direct application coordination across our enterprise hiring partner network.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 14: VISIT OUR OFFICES
          ------------------------------------------------------------------------- */}
      <section className="lp-offices-section" id="offices">
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: 'center', margin: '0 auto 48px', alignItems: 'center' }}>
            <h2>Visit Our Offices</h2>
            <p className="lead" style={{ textAlign: 'center' }}>
              Connect with our academic counselors and mentors across our global delivery centers.
            </p>
          </div>

          <div className="center-cards-grid">
            {/* Bangalore Center */}
            <div className="center-card bangalore">
              <div className="center-card-footer-panel">
                <div className="footer-flex-row">
                  <div className="footer-col company-col">
                    <div className="center-header-row">
                      <span className="center-badge teal">Bangalore, India</span>
                      <div className="center-icon-wrapper teal">
                        <svg className="center-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                    </div>
                    <h3 className="center-company">
                      <a href="https://www.dvanalyticsmds.com/" target="_blank" rel="noreferrer" className="center-link">
                        DV Data &amp; Analytics Private Limited
                      </a>
                    </h3>
                  </div>

                  <div className="footer-col address-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <p className="info-text">
                      #52, 3rd Floor:<br />
                      Malleshpalya Maruthinagar Bengaluru.<br />
                      Bangalore 560075<br />
                      India
                    </p>
                  </div>

                  <div className="footer-col phone-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <p className="info-text">
                      <a href="tel:+918095881188" className="center-link center-link-phone">(+91) 8095 881 188</a>
                      <a href="tel:+917483596228" className="center-link center-link-phone">(+91) 7483 596 228</a>
                    </p>
                  </div>

                  <div className="footer-col email-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <p className="info-text">
                      <a href="mailto:info@dvanalyticsmds.com" className="center-link">info@dvanalyticsmds.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bhubaneswar Center */}
            <div className="center-card bhubaneswar">
              <div className="center-card-footer-panel">
                <div className="footer-flex-row">
                  <div className="footer-col company-col">
                    <div className="center-header-row">
                      <span className="center-badge teal">Bhubaneswar, India</span>
                      <div className="center-icon-wrapper teal">
                        <svg className="center-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                    </div>
                    <h3 className="center-company">
                      <a href="https://www.dvanalyticsmds.com/" target="_blank" rel="noreferrer" className="center-link">
                        DV Data &amp; Analytics Private Limited
                      </a>
                    </h3>
                  </div>

                  <div className="footer-col address-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <p className="info-text">
                      Plot No A/7<br />
                      Adjacent to Maharaja Cine Complex, Bhoinagar, Acharya Vihar<br />
                      Bhubaneswar 751022<br />
                      India
                    </p>
                  </div>

                  <div className="footer-col phone-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <p className="info-text">
                      <a href="tel:+918095881188" className="center-link center-link-phone">+91 8095 881 188</a>
                      <a href="tel:+917483596228" className="center-link center-link-phone">+91 7483 596 228</a>
                    </p>
                  </div>

                  <div className="footer-col email-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <p className="info-text">
                      <a href="mailto:info@dvanalyticsmds.com" className="center-link">info@dvanalyticsmds.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dubai Center */}
            <div className="center-card dubai">
              <div className="center-card-footer-panel">
                <div className="footer-flex-row">
                  <div className="footer-col company-col">
                    <div className="center-header-row">
                      <span className="center-badge teal">Dubai, UAE</span>
                      <div className="center-icon-wrapper teal">
                        <svg className="center-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                    </div>
                    <h3 className="center-company">
                      <a href="https://www.agentifyaiglobal.com/" target="_blank" rel="noreferrer" className="center-link">
                        <span className="center-company-stack">
                          <span>Agentify AI</span>
                          <span>Global</span>
                        </span>
                      </a>
                    </h3>
                  </div>

                  <div className="footer-col address-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <p className="info-text">
                      Villa 335<br />
                      Murooj al Furzan East 1<br />
                      Near Gate 3 Jabel Ali First<br />
                      Al Furjan, Dubai, UAE
                    </p>
                  </div>

                  <div className="footer-col phone-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <p className="info-text">
                      <a href="tel:+971525533211" className="center-link center-link-phone">+971 52 553 3211</a>
                    </p>
                  </div>

                  <div className="footer-col email-col">
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <p className="info-text">
                      <a href="mailto:Sales@agentifyaiglobal.com" className="center-link">Sales@agentifyaiglobal.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          FOOTER
          ------------------------------------------------------------------------- */}
      <footer className="lp-footer">
        <div className="wrap">
          <div className="footer-copyright">
            © {new Date().getFullYear()} DV Analytics. All rights reserved. Advanced Program in Industrial Data Analytics &amp; AI (APIDA).
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------------------
          MOBILE FLOATING STICKY ACTION BAR
          ------------------------------------------------------------------------- */}
      <div className="mobile-sticky-bar">
        <div className="mobile-actions-grid">
          <button type="button" onClick={scrollToForm} className="mobile-btn mobile-apply">
            Register Now →
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------------
          SYLLABUS DETAILS MODAL POPUP
          ------------------------------------------------------------------------- */}
      {selectedModule !== null && activePopupModule && (
        <div className="lp-modal-backdrop" onClick={() => setSelectedModule(null)}>
          <div
            className="lp-module-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-module-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lp-modal-header">
              <div className="lp-modal-header-left">
                <div className="lp-modal-icon">{activePopupModule.icon}</div>
                <div>
                  <span className="lp-modal-badge">Pillar 0{activePopupModule.id}</span>
                  <h3 id="modal-module-title" className="lp-modal-title">
                    {activePopupModule.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                className="lp-modal-close-btn"
                onClick={() => setSelectedModule(null)}
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="lp-modal-body">
              <p className="lp-modal-summary">{activePopupModule.summary}</p>

              <div>
                <h4 className="lp-modal-topics-title">Topics &amp; Practical Deliverables:</h4>
                <ul className="lp-modal-topics-list">
                  {activePopupModule.topics.map((t, idx) => (
                    <li key={idx}>
                      <span className="lp-modal-topic-check">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lp-modal-footer">
              <button
                type="button"
                className="lp-modal-btn-close"
                onClick={() => setSelectedModule(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="lp-modal-btn-register"
                onClick={() => {
                  setSelectedModule(null);
                  scrollToForm();
                }}
              >
                <span>REGISTER NOW</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

            {/* Floating Side Action Buttons on Right Edge */}
      <div className="lp-side-actions-dock">
  {/* Floating 'Book Free Counselling' Button on Right Edge */}
      <button
        type="button"
        className="get-call-btn-trigger lp-side-counsel-trigger"
        onClick={scrollToForm}
        aria-label="Book Free Counselling"
      >
        <span className="get-call-btn-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
        <span className="get-call-btn-text">Book Free Counselling</span>
      </button>

      {/* Floating 'Download Brochure' Button on Right Edge */}
      <button
        type="button"
        className="get-call-btn-trigger lp-side-brochure-trigger"
        onClick={() => setIsBrochureModalOpen(true)}
        aria-label="Download Brochure"
      >
        <span className="get-call-btn-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </span>
        <span className="get-call-btn-text">Download Brochure</span>
      </button>
      </div>

      {/* Brochure Lead Registration Modal */}
      <BrochureLeadModal
        isOpen={isBrochureModalOpen}
        courseId="apida"
        onClose={() => setIsBrochureModalOpen(false)}
      />
    </div>
  );
};
