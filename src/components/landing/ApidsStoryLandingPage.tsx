import React, { useState, useEffect, useRef } from 'react';
import './ApidsStoryLandingPage.css';
import { appendAttributionToPayload, trackEvent } from '../../utils/analytics';
import { getCrmCourseMapping } from '../../data/crmCourseMapping';

interface ApidsStoryLandingPageProps {
  onNavigateHome?: () => void;
}

const courses = [
  { id: 'apids', label: 'Advanced Program in Industrial Data Science with AI Deployment (APIDS)' },
  { id: 'apida', label: 'Advanced Program in Industrial Data Science with Gen AI (APIDA)' },
  { id: 'specialist', label: 'Data Analytics Specialist (DAS)' },
  { id: 'fde', label: 'AI Forward Deployment Engineer (FDE)' },
  { id: 'apcs', label: 'AI Integrated Advanced Program in Cybersecurity & Forensics (APCF)' },
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

const qualificationOptions = [
  { value: 'diploma', label: 'Diploma' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
  { value: 'doctorate', label: 'Doctorate' },
  { value: 'other', label: 'Other' },
];

const experienceOptions = [
  { value: 'fresher', label: 'Fresher' },
  { value: 'less-than-1-year', label: 'Less than 1 year' },
  { value: '1-3-years', label: '1–3 years' },
  { value: '3-5-years', label: '3–5 years' },
  { value: '5-10-years', label: '5–10 years' },
  { value: 'more-than-10-years', label: 'More than 10 years' },
];

const locationOptions = locations.map((loc) => ({ value: loc, label: loc }));

interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  required?: boolean;
}

const LpCustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  placeholder,
  onChange,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`lp-custom-select-container ${isOpen ? 'is-open' : ''}`} ref={containerRef}>
      <button
        type="button"
        className={`lp-custom-select-trigger ${isOpen ? 'open' : ''} ${value ? 'has-value' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="lp-custom-select-text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`lp-custom-select-chevron ${isOpen ? 'rotated' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        className="lp-custom-select-native-select"
        aria-hidden="true"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {isOpen && (
        <div className="lp-custom-select-dropdown" role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`lp-custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lp-custom-select-check"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ApidsStoryLandingPage: React.FC<ApidsStoryLandingPageProps> = ({ onNavigateHome }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    qualification: '',
    experience: '',
    state: '',
    course: 'apids',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Selected module for popup / detail expansion
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  // Active FAQ Accordion Item
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Countdown timer targeting Next Batch: October 24, 2026
  const calculateBatchCountdown = () => {
    const targetDate = new Date('2026-10-24T10:00:00+05:30').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / (1000 * 60)) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateBatchCountdown);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateBatchCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedModule(null);
      }
    };

    if (selectedModule !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedModule]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.qualification ||
      !formData.experience ||
      !formData.state ||
      !formData.course
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const payload = new URLSearchParams();
      const selectedCrmCourse = getCrmCourseMapping(formData.course);
      const selectedCourseObj = courses.find((c) => c.id === formData.course);
      const courseLabel = selectedCourseObj?.label || 'APIDS';

      payload.set('form_id', 'dv_landing_registration');
      payload.set('form_name', 'APIDS Landing Page Registration Form');
      payload.set('lead_type', 'admission');
      payload.set('intent', 'register');
      payload.set('source_type', 'landing_page');
      payload.set('pipeline', 'admission');
      payload.set('name', formData.name.trim());
      payload.set('email', formData.email.trim());
      payload.set('phone', formData.phone.trim());
      payload.set('highest_qualification', formData.qualification.trim());
      payload.set('qualification', formData.qualification.trim());
      payload.set('experience', formData.experience.trim());
      payload.set('state', formData.state.trim());
      payload.set('course', selectedCrmCourse?.crmCourseLabel || courseLabel);
      payload.set('course_id', selectedCrmCourse?.crmCourseId || formData.course.trim());
      payload.set('course_code', selectedCrmCourse?.crmCourseLabel || formData.course.trim());
      payload.set('course_name', selectedCrmCourse?.crmCourseName || courseLabel);
      payload.set('program', selectedCrmCourse?.crmCourseLabel || courseLabel);
      payload.set('selected_course', selectedCrmCourse?.crmCourseLabel || courseLabel);
      payload.set('crm_course_id', selectedCrmCourse?.crmCourseId || formData.course.trim());
      payload.set('crm_course_label', selectedCrmCourse?.crmCourseLabel || courseLabel);
      payload.set('crm_course_name', selectedCrmCourse?.crmCourseName || courseLabel);
      payload.set('website_course_id', formData.course.trim());
      payload.set('website_course_label', courseLabel);
      payload.set('page_url', window.location.href);
      appendAttributionToPayload(payload);
      payload.set('date', now.toISOString().slice(0, 10));
      payload.set('time', now.toISOString().slice(11, 19));
      payload.set('user_agent', window.navigator.userAgent);
      payload.set('powered_by', 'DV Analytics website');

      trackEvent('submit_lp_registration', {
        course: formData.course,
        course_name: courseLabel,
        state: formData.state,
        qualification: formData.qualification,
        experience: formData.experience,
      });

      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('apids-lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // =========================================================================
  // DATA STRUCTURES (STRICT WORD DOC ORDER)
  // =========================================================================

  // 1. Core Program Capabilities (Word Doc)
  const programCapabilities = [
    {
      id: 1,
      title: 'Business Data Analytics',
      tag: 'DATA FOUNDATION',
      desc: 'Manage and analyse business data.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Visual Storytelling',
      tag: 'EXECUTIVE REPORTING',
      desc: 'Create visualisations and communicate insights.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Predictive Modelling',
      tag: 'MACHINE LEARNING',
      desc: 'Build and evaluate predictive models.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Generative & Agentic AI',
      tag: 'GENAI WORKFLOWS',
      desc: 'Develop Generative AI assistants and agent workflows.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Enterprise Data Pipelines',
      tag: 'DATA ENGINEERING',
      desc: 'Build data pipelines and connect enterprise systems.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Production Deployment',
      tag: 'PRODUCTION MLOPS',
      desc: 'Deploy, monitor, and improve AI applications.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <polyline points="12 12 12 16" />
          <polyline points="10 14 12 12 14 14" />
        </svg>
      ),
    },
    {
      id: 7,
      title: 'Practical Business Solutions',
      tag: 'ENTERPRISE IMPACT',
      desc: 'Translate business requirements into practical technical solutions.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  // 2. Why these skills matter today (Word Doc Table transformed to Architecture Flow)
  const skillsMatterTable = [
    {
      id: '01',
      problemTitle: 'Customer Churn Risk',
      req: 'Identify customers likely to leave',
      metricTag: 'Revenue Retention',
      solutionTitle: 'Predictive Retention Dashboard',
      sol: 'Churn prediction connected to a retention dashboard',
      techStack: ['Python', 'Scikit-Learn', 'Power BI'],
    },
    {
      id: '02',
      problemTitle: 'Inventory Stockouts & Waste',
      req: 'Improve inventory planning',
      metricTag: 'Working Capital',
      solutionTitle: 'Demand Forecasting Engine',
      sol: 'Demand forecasting integrated with stock reports',
      techStack: ['Time-Series', 'XGBoost', 'PostgreSQL'],
    },
    {
      id: '03',
      problemTitle: 'Manual Document Backlog',
      req: 'Review large volumes of documents',
      metricTag: '90% Faster Turnaround',
      solutionTitle: 'AI Document Intelligence Pipeline',
      sol: 'AI document processing with validation and exception handling',
      techStack: ['OCR', 'Vision LLM', 'Validation API'],
    },
    {
      id: '04',
      problemTitle: 'Information Silos & Hallucination',
      req: 'Help employees find approved information',
      metricTag: 'Verified Truth Source',
      solutionTitle: 'Enterprise Grounded Knowledge Assistant',
      sol: 'A knowledge assistant with source references',
      techStack: ['Vector RAG', 'LangChain', 'Citations'],
    },
    {
      id: '05',
      problemTitle: 'Unplanned Machinery Breakdown',
      req: 'Reduce equipment downtime',
      metricTag: 'Zero Unscheduled Outages',
      solutionTitle: 'IoT Telemetry Predictive Maintenance',
      sol: 'Predictive maintenance with alerts and monitoring',
      techStack: ['Anomaly Detection', 'Kafka', 'Real-Time Alerts'],
    },
  ];

  // 3. Who Can Join (Word Doc Profiles with Persona Archetypes)
  const whoCanJoinProfiles = [
    {
      id: '01',
      category: 'Tech & Engineering',
      badge: 'High Technical Aptitude',
      title: 'BTech, BE, BCA, MCA & CS Learners',
      desc: 'Engineering, BTech, BE, BCA, MCA, and computer science learners.',
      path: 'Fast-Track to AI Deployment',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: '02',
      category: 'Math & Sciences',
      badge: 'Quantitative Foundation',
      title: 'BSc, Mathematics, Statistics & Economics',
      desc: 'BSc, mathematics, statistics, and economics graduates.',
      path: 'Direct Path to Statistical Modelling',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 4H5v2l7 6-7 6v2h14v-3" />
        </svg>
      ),
    },
    {
      id: '03',
      category: 'Commerce & Management',
      badge: 'Zero Coding Prerequisite',
      title: 'BCom, BBA, MBA & Non-Tech Graduates',
      desc: 'BCom, BBA, MBA, and other graduates willing to develop technical foundations.',
      path: 'Comprehensive Foundations Bridge',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: '04',
      category: 'Analytics Professionals',
      badge: 'Career Elevation',
      title: 'Data Analysts & BI Specialists',
      desc: 'Data analysts seeking modelling and deployment skills.',
      path: 'Upgrade from BI to Applied AI & MLOps',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: '05',
      category: 'Developers & Engineers',
      badge: 'GenAI Transition',
      title: 'Software Developers & Data Engineers',
      desc: 'Software developers and data engineers moving into AI.',
      path: 'Leverage Coding for LLM & Agent Pipelines',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      id: '06',
      category: 'Career Switchers & Returners',
      badge: 'Full Career Support',
      title: 'Working Professionals & Career Returners',
      desc: 'Working professionals, career switchers, and career returners.',
      path: '1-on-1 Mentorship & Placement Support',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      ),
    },
  ];

  // 4. Your Learning Path (12 Modules in 6x2 grid as shown in the image)
  const learningPathModules = [
    {
      id: 1,
      title: 'Python & SQL',
      summary: 'Programming foundations, Git, debugging, APIs, and automated testing.',
      techChips: ['Python 3.12', 'Advanced SQL', 'Git & APIs'],
      topics: [
        'Programming fundamentals, data structures, and functions',
        'Complex SQL queries, joins, aggregations, and subqueries',
        'Git version control, branches, and team pull requests',
        'REST APIs, exception handling, and automated unit testing',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Data Management',
      summary: 'Collection, cleaning, joins, validation, and schema access controls.',
      techChips: ['PostgreSQL', 'Data Cleaning', 'Schema Design'],
      topics: [
        'Ingestion from APIs, databases, flat files, and web scrapers',
        'Data cleaning, type casting, imputation, and transformation',
        'Relational data modeling, foreign keys, and integrity constraints',
        'Defensive data validation rules and enterprise access controls',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Analysis & Visualisation',
      summary: 'Exploratory analysis, business metrics, dashboards, and storytelling.',
      techChips: ['Power BI', 'EDA & Insights', 'Executive Reports'],
      topics: [
        'Exploratory data analysis (EDA) and pattern detection',
        'Business KPI formulation (Churn, LTV, CAC, Revenue cohorts)',
        'Interactive dashboards in Power BI and executive reports',
        'Visual storytelling and communicating insights to leadership',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Statistics',
      summary: 'Probability, sampling, distributions, hypothesis testing, and experiments.',
      techChips: ['Hypothesis Testing', 'A/B Testing', 'Distributions'],
      topics: [
        'Probability theory, discrete and continuous distributions',
        'Parametric and non-parametric hypothesis testing',
        'Confidence intervals, p-values, and statistical power',
        'A/B test design, experimentation guardrails, and uncertainty',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 20h18" />
          <path d="M4 18c4-1 6-14 8-14s4 13 8 14" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Machine Learning',
      summary: 'Regression, classification, clustering, forecasting, and validation.',
      techChips: ['XGBoost', 'Random Forest', 'Scikit-Learn'],
      topics: [
        'Supervised regression and classification algorithms',
        'Ensemble gradient boosting (Random Forest, XGBoost, LightGBM)',
        'Unsupervised clustering (K-Means, hierarchical, DBSCAN)',
        'Time-series forecasting, feature engineering, and cross-validation',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Deep Learning',
      summary: 'Neural networks, embeddings, transformers, and transfer learning.',
      techChips: ['PyTorch', 'Transformers', 'Embeddings'],
      topics: [
        'Feedforward architectures, activation functions, and backpropagation',
        'Vector embeddings and dimensional representation',
        'Transformer models, self-attention, and Hugging Face pipelines',
        'Transfer learning with industry pre-trained foundation models',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
        </svg>
      ),
    },
    {
      id: 7,
      title: 'Generative AI',
      summary: 'LLM APIs, prompting, structured outputs, RAG, and evaluation.',
      techChips: ['LLM APIs', 'Vector RAG', 'Prompt Eng'],
      topics: [
        'OpenAI and Anthropic API integration with structured JSON schemas',
        'Advanced prompt engineering, chain-of-thought, and few-shot methods',
        'Retrieval-Augmented Generation (RAG) with vector databases',
        'Document chunking, citation grounding, and RAG evaluation',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
    {
      id: 8,
      title: 'Agentic AI',
      summary: 'Tool calling, orchestration, state, permissions, and human approval.',
      techChips: ['LangGraph', 'Tool Calling', 'Multi-Agent'],
      topics: [
        'Function calling and integrating external tools/databases',
        'Multi-agent state machines and orchestration with LangGraph',
        'Permission boundaries, safety sandboxing, and execution limits',
        'Human-in-the-loop approval workflows for sensitive actions',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      ),
    },
    {
      id: 9,
      title: 'Data Engineering',
      summary: 'ETL/ELT, data modelling, warehouses, orchestration, and pipelines.',
      techChips: ['Apache Airflow', 'dbt', 'ETL Pipelines'],
      topics: [
        'Production ETL/ELT data pipeline architecture and transformation',
        'Dimensional modeling, star schemas, and warehouse optimization',
        'Automated workflow scheduling with Apache Airflow and dbt',
        'Batch data processing and data quality validation checks',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      id: 10,
      title: 'Deployment Engineering',
      summary: 'APIs, Docker, cloud hosting, CI/CD, monitoring, and rollback.',
      techChips: ['FastAPI', 'Docker', 'AWS EC2/ECS'],
      topics: [
        'Asynchronous high-throughput REST APIs using FastAPI',
        'Multi-stage Docker containerization and cloud environments',
        'Cloud hosting on AWS EC2/ECS with security groups',
        'GitHub Actions CI/CD pipelines, health endpoints, and rollbacks',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <polyline points="12 12 12 16" />
          <polyline points="10 14 12 12 14 14" />
        </svg>
      ),
    },
    {
      id: 11,
      title: 'MLOps',
      summary: 'Model tracking, artifact registry, automated retraining, and drift.',
      techChips: ['MLflow', 'Drift Detection', 'CI/CD Pipelines'],
      topics: [
        'Experiment tracking and model versioning with MLflow',
        'Centralized model registry and deployment staging lifecycle',
        'Automated model retraining pipelines triggered by data updates',
        'Continuous data drift, concept drift, and performance telemetry',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.26-8-12.355-8-5.096 0-5.096 8 0 8 5.095 0 7.26-8 12.355-8Z" />
        </svg>
      ),
    },
    {
      id: 12,
      title: 'Consulting',
      summary: 'Requirement gathering, problem definition, design, and demos.',
      techChips: ['Client Scoping', 'Architecture', 'Solution Demos'],
      topics: [
        'Client requirement scoping and translating business pain points',
        'Formulating technical architecture proposals and feasibility studies',
        'Executive solution demonstrations and interactive stakeholder decks',
        'User training, technical handoff documentation, and client buy-in',
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  const activePopupModule = selectedModule !== null ? learningPathModules.find((m) => m.id === selectedModule) : null;

  // 5. Industry Salary Benchmarks (Preserved as explicitly requested)
  const salaryTiers = [
    {
      id: 1,
      tier: 'Entry-Level (0–2 Years)',
      badge: 'Foundation Tier',
      roles: 'Data Analyst • Associate Data Scientist • Business Analyst',
      salaryRange: '₹6.0 – ₹10.0 LPA',
      growthRate: 'Base Progression',
      meterWidth: '35%',
      skills: ['SQL Server / MySQL', 'Python Data Science', 'Power BI & Tableau', 'Applied Statistics', 'Exploratory Data Analysis'],
      note: 'Focuses on clean data extraction, automated reporting, and baseline predictive models.',
    },
    {
      id: 2,
      tier: 'Mid-Level (3–5 Years)',
      badge: 'High-Demand Tier',
      isPopular: true,
      roles: 'Data Scientist • Machine Learning Engineer • Analytics Lead',
      salaryRange: '₹12.0 – ₹18.0 LPA',
      growthRate: 'Highest Market Demand',
      meterWidth: '65%',
      skills: ['Scikit-Learn & XGBoost', 'PySpark Big Data', 'Feature Engineering', 'Deep Learning & NLP', 'Model Validation & Tuning'],
      note: 'Builds core algorithmic engines and deploys supervised and unsupervised models into business workflows.',
    },
    {
      id: 3,
      tier: 'Senior / Lead (6+ Years)',
      badge: 'Architecture Tier',
      roles: 'Senior AI Engineer • Lead Data Scientist • AI Architect',
      salaryRange: '₹22.0 – ₹35.0+ LPA',
      growthRate: 'Strategic Leadership',
      meterWidth: '95%',
      skills: ['Generative AI & LLMs', 'LangGraph Multi-Agents', 'Cloud MLOps (AWS)', 'Docker Containerization', 'FastAPI REST Microservices'],
      note: 'Architects scalable cloud AI infrastructure, enterprise RAG systems, and autonomous multi-agent pipelines.',
    },
  ];

  // 6. Tools and Applications (Word Doc Table)
  const toolsTableData = [
    {
      area: 'Programming and data preparation',
      tools: 'Python, SQL, pandas, NumPy',
      app: 'Data processing and application logic',
    },
    {
      area: 'Visualisation and reporting',
      tools: 'Power BI, Matplotlib, Seaborn',
      app: 'Dashboards and analytical communication',
    },
    {
      area: 'Statistics and Machine Learning',
      tools: 'SciPy, statsmodels, scikit-learn, XGBoost',
      app: 'Statistical analysis and prediction',
    },
    {
      area: 'Deep Learning',
      tools: 'PyTorch or TensorFlow, Hugging Face',
      app: 'Neural networks and pretrained models',
    },
    {
      area: 'Generative and Agentic AI',
      tools: 'LLM APIs, LangChain, LlamaIndex, LangGraph',
      app: 'Retrieval, assistants, and tool-based workflows',
    },
    {
      area: 'Databases',
      tools: 'PostgreSQL, pgvector or another vector database',
      app: 'Structured storage and semantic retrieval',
    },
    {
      area: 'Data Engineering',
      tools: 'dbt, Airflow, Spark where required',
      app: 'Transformations and pipelines',
    },
    {
      area: 'Application development',
      tools: 'FastAPI, Streamlit, REST APIs',
      app: 'Model services and user interfaces',
    },
    {
      area: 'Deployment and operations',
      tools: 'Git, Docker, GitHub Actions, MLflow, AWS',
      app: 'Deployment, tracking, and monitoring',
    },
  ];

  // 7. Career Opportunities (Word Doc)
  const careerRoles = [
    {
      title: 'Data Analyst or BI Analyst',
      tag: 'ANALYTICS',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      title: 'Junior Data Scientist or Data Scientist',
      tag: 'CORE DATA SCIENCE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      title: 'Machine Learning Engineer',
      tag: 'ML ENGINEERING',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
    {
      title: 'AI Application Developer or Generative AI Engineer',
      tag: 'GENAI & LLMS',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
    {
      title: 'AI Integration Engineer',
      tag: 'INTEGRATION',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: 'Data Engineer supporting AI applications',
      tag: 'AI INFRASTRUCTURE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      title: 'MLOps or Model Deployment Engineer',
      tag: 'PRODUCTION MLOPS',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <polyline points="12 12 12 16" />
          <polyline points="10 14 12 12 14 14" />
        </svg>
      ),
    },
    {
      title: 'AI Solutions Engineer or Technical Implementation Consultant',
      tag: 'CONSULTING',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  const careerProgression = [
    'Senior Data Scientist',
    'AI Solutions Architect',
    'AI Engineering Lead',
    'Forward Deployed Engineer',
  ];

  // 8. Industry Projects (All 6 from Word doc - PURE CSS & SVG, ZERO external images for optimal SEO)
  const industryProjects = [
    {
      industry: 'Banking',
      subtitle: 'Credit Risk Analytics',
      project: 'Credit risk and collections analytics',
      deliverable: 'Data pipeline, risk model, explanations, scoring API, and dashboard with human review.',
      tag: 'BFSI Risk Modeling',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="5 6 12 3 19 6" />
          <line x1="4" y1="10" x2="4" y2="21" />
          <line x1="20" y1="10" x2="20" y2="21" />
          <line x1="8" y1="14" x2="8" y2="17" />
          <line x1="12" y1="14" x2="12" y2="17" />
          <line x1="16" y1="14" x2="16" y2="17" />
        </svg>
      ),
    },
    {
      industry: 'Retail',
      subtitle: 'Demand Forecasting',
      project: 'Demand forecasting and inventory planning',
      deliverable: 'Forecasting pipeline, stock-risk indicators, dashboard, and planning assistant.',
      tag: 'Supply Chain AI',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      industry: 'Telecom',
      subtitle: 'Churn Prediction',
      project: 'Customer churn and retention',
      deliverable: 'Customer features, churn model, retention recommendations, and service integration.',
      tag: 'Predictive Retention',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
          <path d="M7.76 16.24a6 6 0 0 1 0-8.48" />
          <circle cx="12" cy="12" r="2" />
          <path d="M16.24 7.76a6 6 0 0 1 0 8.48" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ),
    },
    {
      industry: 'Insurance',
      subtitle: 'Claims Document AI',
      project: 'Claims document processing',
      deliverable: 'Information extraction, validation, exception routing, and review interface.',
      tag: 'Vision & Language AI',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
        </svg>
      ),
    },
    {
      industry: 'Manufacturing',
      subtitle: 'Predictive Maintenance',
      project: 'Predictive maintenance',
      deliverable: 'Equipment-data processing, anomaly detection, alerts, and monitoring.',
      tag: 'IoT Telemetry',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      industry: 'Enterprise Operations',
      subtitle: 'Knowledge Assistant',
      project: 'Knowledge assistant and service workflow',
      deliverable: 'Permission-aware retrieval, referenced answers, approved tool actions, and escalation.',
      tag: 'Agentic RAG Assistant',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];

  // What each capstone should demonstrate (Word Doc)
  const capstoneDemonstrations = [
    'A clear business problem and measurable success criteria.',
    'Data preparation and quality checks.',
    'A baseline and justified modelling approach.',
    'Evaluation of accuracy, reliability, latency, and cost.',
    'A deployed application with appropriate access controls and logging.',
    'Documentation, user testing, and an improvement plan.',
  ];

  // 9. Benefits at DV Analytics ("Learn with DV Analytics" - 6 Cards matching flyer image)
  const platformBenefits = [
    {
      title: 'Live Classes',
      desc: 'Instructor-led learning, interaction, and guided practice.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <rect x="2" y="3" width="14" height="10" rx="1" />
        </svg>
      ),
    },
    {
      title: 'LMS Access',
      desc: 'Recordings, notes, assignments, and learning resources.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      ),
    },
    {
      title: 'Industry Projects',
      desc: 'Practical experience across the complete solution lifecycle.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      ),
    },
    {
      title: 'AI Tests & Mock Interviews',
      desc: 'Structured assessment, interview practice, and feedback.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Profile Building',
      desc: 'Support with résumés, LinkedIn profiles, GitHub portfolios, and project presentations.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
        </svg>
      ),
    },
    {
      title: '100% Placement Support',
      desc: 'Career guidance, interview preparation, and assistance with relevant opportunities.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  // 11. Frequently Asked Questions
  const faqs = [
    {
      q: 'Can a non-technical or non-CS graduate enroll in this program?',
      a: 'Yes, absolutely. Learners from BCom, BBA, BSc, and various engineering backgrounds successfully enroll. The program begins with programming foundations in Python and SQL before progressing to machine learning and production deployment.',
    },
    {
      q: 'What is the delivery mode: Live Online or In-Person Offline?',
      a: 'Both options are supported. You can attend live interactive online sessions from anywhere, or participate in structured weekend and weekday batches with guided laboratory support.',
    },
    {
      q: 'What does 100% placement support mean?',
      a: '100% placement support means dedicated placement assistance: resume transformation, LinkedIn audit, GitHub reviews, AI platform mock interviews, and direct employer interview connections until placed. Outcomes depend on skills, performance, eligibility, and employer selection.',
    },
    {
      q: 'What are the hardware and system prerequisites?',
      a: 'Any modern computer (Windows, macOS, or Linux) with at least 8GB RAM and an internet connection. Heavy cloud model training and API hosting utilize managed cloud laboratory environments.',
    },
    {
      q: 'Are installment and EMI fee options available?',
      a: 'Yes, zero-cost EMI plans and structured milestone installments are available to support learners.',
    },
  ];

  return (
    <div className="apids-landing-root">
      {/* Scroll Progress Bar */}
      <div className="lp-progress-bar-track">
        <div className="lp-progress-bar-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Top Header (Distraction-Free: Logo on left, Call Now on right) */}
      <header className="lp-standalone-header">
        <div className="lp-container">
          <div className="lp-header-inner">
            <a
              href="/"
              className="lp-logo-link"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
            >
              <img src="/logo.png" alt="DV Analytics - Transforming You" className="lp-logo-img" />
            </a>

            <div className="lp-header-actions">
              <a href="tel:+918095881188" className="lp-header-phone-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          TOP BANNER / POSTER (ABOVE HERO SECTION)
          ========================================================================= */}
      <section className="lp-top-poster-section" aria-label="Program Banner">
        <div className="lp-container">
          <div
            className="lp-top-poster-wrapper"
            onClick={scrollToForm}
            role="button"
            tabIndex={0}
            title="Click to register for APIDS"
            onKeyDown={(e) => {
              if (e.key === 'Enter') scrollToForm();
            }}
          >
            <img
              src="/data-science-ai-deployment-banner.png"
              alt="Data Science & AI Deployment Engineering Program Banner - DV Analytics"
              className="lp-top-poster-img"
              width="2171"
              height="724"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          HERO SECTION (WELL-BALANCED 2-COLUMN GRID, NO EMPTY HOLES)
          ========================================================================= */}
      <section className="lp-hero-section" id="hero-section">
        <div className="lp-container">
          <div className="lp-hero-grid">
            <div className="lp-hero-left">
              <div className="lp-hero-batch-pill">
                <span className="lp-batch-dot" />
                <span>Next Batch: <strong>24th October 2026</strong></span>
                <span className="lp-batch-sep">•</span>
                <span className="lp-batch-timer">Closes in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
              </div>

              <div className="lp-hero-kicker-line">
                <span className="lp-kicker-text">DV ANALYTICS</span>
              </div>

              <h1 className="lp-hero-main-heading">
                Data Science &amp;<br />
                AI Deployment<br />
                Engineering
              </h1>

              <p className="lp-hero-bold-tagline">
                Any Graduate Can Be a Data Scientist
              </p>

              <p className="lp-hero-sub-text">
                Build practical skills in analytics, predictive modelling and AI applications.
              </p>


              {/* 4 Graphical Program Highlights with SVG icons and bold metrics */}
              <div className="lp-hero-features-grid">
                <div className="lp-hero-feat-card">
                  <div className="lp-hero-feat-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div className="lp-hero-feat-body">
                    <span className="lp-hero-feat-headline">6–8 Months</span>
                    <span className="lp-hero-feat-caption">Industry Immersion (Weekend/Weekday)</span>
                  </div>
                </div>

                <div className="lp-hero-feat-card">
                  <div className="lp-hero-feat-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div className="lp-hero-feat-body">
                    <span className="lp-hero-feat-headline">100% Live</span>
                    <span className="lp-hero-feat-caption">Interactive Mentor-Led Training</span>
                  </div>
                </div>

                <div className="lp-hero-feat-card">
                  <div className="lp-hero-feat-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div className="lp-hero-feat-body">
                    <span className="lp-hero-feat-headline">Any Graduate</span>
                    <span className="lp-hero-feat-caption">Non-CS &amp; Freshers Fully Eligible</span>
                  </div>
                </div>

                <div className="lp-hero-feat-card">
                  <div className="lp-hero-feat-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="lp-hero-feat-body">
                    <span className="lp-hero-feat-headline">1-on-1 Mentorship</span>
                    <span className="lp-hero-feat-caption">Dedicated Career &amp; Placement Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Above-the-fold Lead Capture Form */}
            <div className="lp-hero-form-card" id="apids-lead-form">
              <div className="lp-form-card-top-accent" aria-hidden="true" />
              {isSubmitted ? (
                <div className="lp-form-success-banner">
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
                    Registration Submitted Successfully
                  </h3>
                  <p style={{ fontSize: '0.92rem', marginBottom: '0', lineHeight: 1.6 }}>
                    Thank you, <strong>{formData.name}</strong>. Your registration for{' '}
                    <strong>{courses.find((c) => c.id === formData.course)?.label || 'APIDS'}</strong> has been
                    received. Our Academic Counselor will call you at <strong>{formData.phone}</strong> shortly to
                    finalize your admission.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="lp-form-header">
                    <span className="lp-form-tag">NEXT BATCH: 24TH OCTOBER</span>
                    <h3 className="lp-form-title">Register for APIDS</h3>
                    <p className="lp-form-subtitle">Reserve your seat for the October 24 batch with 1-on-1 mentorship.</p>
                  </div>

                  <div className="lp-form-field">
                    <label className="lp-form-label">Full Name *</label>
                    <input
                      type="text"
                      className="lp-form-input"
                      placeholder="e.g. Rahul Sharma"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="lp-form-row-2">
                    <div className="lp-form-field">
                      <label className="lp-form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="lp-form-input"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="lp-form-field">
                      <label className="lp-form-label">Email Address *</label>
                      <input
                        type="email"
                        className="lp-form-input"
                        placeholder="rahul@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="lp-form-row-2 lp-form-row-qualification">
                    <div className="lp-form-field">
                      <label className="lp-form-label">Highest Qualification *</label>
                      <LpCustomSelect
                        options={qualificationOptions}
                        value={formData.qualification}
                        placeholder="Select qualification"
                        required
                        onChange={(val) => setFormData({ ...formData, qualification: val })}
                      />
                    </div>

                    <div className="lp-form-field">
                      <label className="lp-form-label">Experience *</label>
                      <LpCustomSelect
                        options={experienceOptions}
                        value={formData.experience}
                        placeholder="Select experience"
                        required
                        onChange={(val) => setFormData({ ...formData, experience: val })}
                      />
                    </div>
                  </div>

                  <div className="lp-form-row-2 lp-form-row-state">
                    <div className="lp-form-field">
                      <label className="lp-form-label">State / Location *</label>
                      <LpCustomSelect
                        options={locationOptions}
                        value={formData.state}
                        placeholder="Select state / location"
                        required
                        onChange={(val) => setFormData({ ...formData, state: val })}
                      />
                    </div>

                    <div className="lp-form-field">
                      <label className="lp-form-label">Course *</label>
                      <input
                        type="text"
                        className="lp-form-input"
                        value="APIDS"
                        readOnly
                        tabIndex={-1}
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: '#0f172a',
                          fontWeight: 600,
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
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 1: ABOUT THE PROGRAM (FULL-WIDTH BALANCED SECTION)
          ========================================================================= */}
      <section className="lp-content-section" id="about-program" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">About the Program</h2>
          </div>

          <p className="lp-section-intro-text">
            Data Science &amp; AI Deployment Engineering combines data analysis, statistics, machine learning, AI application development, and production deployment. The program is designed to help learners understand the complete solution lifecycle—from identifying a business problem and preparing data to developing models, integrating applications, and monitoring results.
          </p>

          <div className="lp-capabilities-full-grid">
            {programCapabilities.map((cap) => (
              <div className="lp-capability-card" key={cap.id}>
                <div className="lp-cap-card-header">
                  <div className="lp-cap-icon-box">{cap.icon}</div>
                  <span className="lp-cap-tag">{cap.tag}</span>
                  <span className="lp-cap-num">0{cap.id}</span>
                </div>
                <h3 className="lp-cap-title">{cap.title}</h3>
                <p className="lp-capability-text">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 2: WHY THESE SKILLS MATTER TODAY
          ========================================================================= */}
      <section className="lp-content-section" id="why-skills-matter">
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Why These Skills Matter Today</h2>
          </div>

          <p className="lp-section-intro-text">
            A model becomes useful when people can apply its outputs within their work. Organisations need solutions that use reliable data, produce measurable results, connect with existing systems, and remain dependable after deployment.
          </p>

          <div className="lp-skills-matrix-wrap">
            <div className="lp-skills-matrix-grid">
              {skillsMatterTable.map((item) => (
                <div className="lp-matrix-flow-card" key={item.id}>
                  {/* Left: Challenge */}
                  <div className="lp-matrix-challenge-pane">
                    <div className="lp-matrix-pane-header">
                      <span className="lp-matrix-chip chip-challenge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        Challenge {item.id}
                      </span>
                      <span className="lp-matrix-kpi-badge">{item.metricTag}</span>
                    </div>
                    <h4 className="lp-matrix-heading">{item.problemTitle}</h4>
                    <p className="lp-matrix-doc-text">
                      <span className="lp-doc-label">Requirement:</span> {item.req}
                    </p>
                  </div>

                  {/* Center: Pipeline Bridge Connector */}
                  <div className="lp-matrix-bridge-pane">
                    <div className="lp-matrix-bridge-line" />
                    <div className="lp-matrix-bridge-badge">
                      <div className="lp-matrix-bridge-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                      <span className="lp-matrix-bridge-label">AI Pipeline</span>
                    </div>
                  </div>

                  {/* Right: Deployed AI Solution */}
                  <div className="lp-matrix-solution-pane">
                    <div className="lp-matrix-pane-header">
                      <span className="lp-matrix-chip chip-solution">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Engineered Solution
                      </span>
                    </div>
                    <h4 className="lp-matrix-heading sol-heading">{item.solutionTitle}</h4>
                    <p className="lp-matrix-doc-text">
                      <span className="lp-doc-label">Solution:</span> {item.sol}
                    </p>
                    <div className="lp-matrix-tech-chips">
                      {item.techStack.map((tech, tIdx) => (
                        <span className="lp-matrix-tech-chip" key={tIdx}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="lp-section-outro-note">
            This program connects analytical thinking with the engineering skills needed to deliver such applications.
          </p>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 3: WHO CAN JOIN
          ========================================================================= */}
      <section className="lp-content-section" id="who-can-join" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Who Can Join</h2>
          </div>

          <div className="lp-who-can-join-grid">
            {whoCanJoinProfiles.map((p) => (
              <div className="lp-persona-card" key={p.id}>
                <div className="lp-persona-head">
                  <div className="lp-persona-icon-box">{p.icon}</div>
                  <div className="lp-persona-meta">
                    <span className="lp-persona-badge">{p.badge}</span>
                    <span className="lp-persona-num">PROFILE {p.id}</span>
                  </div>
                </div>
                <h3 className="lp-persona-title">{p.title}</h3>
                <p className="lp-persona-desc">{p.desc}</p>
                <div className="lp-persona-path-footer">
                  <span className="lp-path-icon">↳</span>
                  <span className="lp-path-text">{p.path}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lp-prep-note-box">
            <h4 className="lp-prep-title">Preparation Guidelines:</h4>
            <p className="lp-prep-desc">
              Beginners should develop Python, SQL, basic mathematics, and computer fundamentals. Learners from nontechnical backgrounds may require additional foundation training. Job readiness depends on demonstrated skills and practical work.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 4: YOUR LEARNING PATH (LEARNING APPROACH)
          6x2 Grid matching Flyer Layout
          ========================================================================= */}
      <section className="lp-content-section" id="learning-path">
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Your Learning Path</h2>
          </div>

          <p className="lp-section-intro-text">
            Learn through concept sessions, guided practice, assignments, case studies, code reviews, and complete industry projects.
          </p>

          <div className="lp-learning-path-flyer-grid">
            {learningPathModules.map((mod) => (
              <div
                className="lp-flyer-module-card"
                key={mod.id}
                onClick={() => setSelectedModule(mod.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedModule(mod.id);
                }}
              >
                <div className="lp-flyer-module-top">
                  <span className="lp-module-num-badge">
                    {mod.id < 10 ? `MODULE 0${mod.id}` : `MODULE ${mod.id}`}
                  </span>
                  <span className="lp-module-topics-pill">{mod.topics.length} Topics</span>
                </div>

                <div className="lp-flyer-module-icon">{mod.icon}</div>
                
                <h3 className="lp-flyer-module-name">{mod.title}</h3>

                <p className="lp-flyer-module-summary">{mod.summary}</p>

                <div className="lp-flyer-tech-chips">
                  {mod.techChips.map((chip, cIdx) => (
                    <span className="lp-flyer-tech-chip" key={cIdx}>
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="lp-flyer-card-footer">
                  <span className="lp-view-details-action">
                    <span>View Syllabus Details</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="lp-learning-to-delivery-callout">
            <h3 className="lp-delivery-title">From Learning to Delivery:</h3>
            <p className="lp-delivery-desc">
              Apply the learning stages together in capstone projects. Define the business requirement, prepare data, develop and evaluate the solution, integrate it into a workflow, and demonstrate a working deployment.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 5: INDUSTRY MARKET SALARY BENCHMARKS
          ========================================================================= */}
      <section className="lp-content-section" id="salary-benchmarks" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Industry Market Salary by Experience Level</h2>
          </div>

          <p className="lp-section-intro-text">
            Based on independent compensation reports from AmbitionBox, Glassdoor &amp; NASSCOM (2025–2026). Career progression accelerates significantly as engineers master deployment and GenAI.
          </p>

          <div className="lp-salary-grid">
            {salaryTiers.map((tier) => (
              <div className={`lp-salary-card ${tier.isPopular ? 'popular-tier' : ''}`} key={tier.id}>
                {tier.isPopular && <span className="lp-salary-crown-pill">Highest Market Demand</span>}
                <div className="lp-salary-card-head">
                  <span className="lp-salary-tier-badge">{tier.badge}</span>
                  <h3 className="lp-salary-tier-title">{tier.tier}</h3>
                  <p className="lp-salary-roles-list">{tier.roles}</p>
                </div>

                <div className="lp-salary-compensation-box">
                  <div className="lp-salary-amount">{tier.salaryRange}</div>
                  <div className="lp-salary-subtext">Annual Market Compensation Range</div>
                  <div className="lp-salary-meter-track">
                    <div className="lp-salary-meter-fill" style={{ width: tier.meterWidth }} />
                  </div>
                </div>

                <div className="lp-salary-skills-wrap">
                  <div className="lp-salary-skills-label">Key Industry Skillset:</div>
                  <div className="lp-salary-tags">
                    {tier.skills.map((s, i) => (
                      <span className="lp-salary-tag-pill" key={i}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lp-salary-note-box">
                  <p className="lp-salary-note-text">{tier.note}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="lp-salary-disclaimer">
            * Market salary benchmarks are sourced from public industry reports (AmbitionBox, Glassdoor, NASSCOM) for general career reference. Individual compensation offers depend on employer standards, candidate portfolio, and interview performance.
          </p>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 6: TOOLS AND APPLICATIONS
          ========================================================================= */}
      <section className="lp-content-section" id="tools-applications">
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Tools and Applications</h2>
          </div>

          <p className="lp-section-intro-text">
            The following is an illustrative toolkit. Projects should use a focused selection suited to their requirements.
          </p>

          <div className="lp-toolkit-table-container">
            <table className="lp-toolkit-table">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Example Tools</th>
                  <th>Application</th>
                </tr>
              </thead>
              <tbody>
                {toolsTableData.map((row, i) => (
                  <tr key={i}>
                    <td className="lp-toolkit-area-cell">
                      <strong>{row.area}</strong>
                    </td>
                    <td className="lp-toolkit-tools-cell">
                      <span className="lp-tool-pill-badge">{row.tools}</span>
                    </td>
                    <td className="lp-toolkit-app-cell">{row.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 7: CAREER OPPORTUNITIES
          ========================================================================= */}
      <section className="lp-content-section" id="career-opportunities" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Career Opportunities</h2>
          </div>

          <p className="lp-section-intro-text">
            Depending on prior experience, technical ability, and portfolio quality, learners can prepare for:
          </p>

          <div className="lp-career-roles-grid">
            {careerRoles.map((role, i) => (
              <div className="lp-career-role-card" key={i}>
                <div className="lp-career-icon-pill">{role.icon}</div>
                <div className="lp-career-role-info">
                  <span className="lp-career-tag-pill">{role.tag}</span>
                  <span className="lp-career-role-name">{role.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lp-progression-box">
            <h4 className="lp-progression-heading">Career Progression Potential:</h4>
            <p className="lp-progression-desc">
              With relevant delivery experience, potential progression includes:
            </p>
            <div className="lp-progression-badges">
              {careerProgression.map((prog, i) => (
                <span className="lp-progression-badge" key={i}>
                  {prog}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 8: BUILD END-TO-END INDUSTRY PROJECTS
          NO EXTERNAL IMAGES — 100% SEO-SAFE PURE CSS & VECTOR SVG CARDS
          ========================================================================= */}
      <section className="lp-content-section" id="industry-projects">
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Build End-to-End Industry Projects</h2>
          </div>

          <p className="lp-section-intro-text">
            Proposed projects can use public, synthetic, or appropriately authorised datasets. Every project features an end-to-end architecture with verifiable production deliverables.
          </p>

          {/* All 6 Projects in clean 3x2 grid with pure CSS + SVG, zero images */}
          <div className="lp-pure-projects-grid">
            {industryProjects.map((proj, i) => (
              <div className="lp-pure-project-card" key={i}>
                <div className="lp-pure-proj-head">
                  <div className="lp-pure-proj-icon">{proj.icon}</div>
                  <div className="lp-pure-proj-chart" aria-hidden="true">
                    <span className="lp-mini-bar b1" />
                    <span className="lp-mini-bar b2" />
                    <span className="lp-mini-bar b3" />
                    <span className="lp-mini-bar b4" />
                  </div>
                </div>

                <div className="lp-pure-proj-meta">
                  <span className="lp-pure-proj-tag">{proj.tag}</span>
                  <h3 className="lp-pure-proj-industry">{proj.industry}</h3>
                  <span className="lp-pure-proj-sub">{proj.subtitle}</span>
                </div>

                <div className="lp-pure-proj-body">
                  <div className="lp-pure-proj-point">
                    <span className="lp-point-label">Project:</span>
                    <p className="lp-point-val">{proj.project}</p>
                  </div>
                  <div className="lp-pure-proj-point">
                    <span className="lp-point-label">End-to-End Deliverable:</span>
                    <p className="lp-point-val">{proj.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* What each capstone should demonstrate from doc */}
          <div className="lp-capstone-criteria-box">
            <h3 className="lp-criteria-main-title">What Each Capstone Should Demonstrate:</h3>
            <div className="lp-criteria-grid-6">
              {capstoneDemonstrations.map((item, idx) => (
                <div className="lp-criteria-item-card" key={idx}>
                  <span className="lp-crit-num">0{idx + 1}</span>
                  <p className="lp-crit-text">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 9: LEARN WITH DV ANALYTICS
          3x2 Grid matching Flyer Layout
          ========================================================================= */}
      <section className="lp-content-section" id="learn-with-dv" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Learn with DV Analytics</h2>
          </div>

          <div className="lp-flyer-benefits-grid">
            {platformBenefits.map((b, i) => (
              <div className="lp-flyer-benefit-card" key={i}>
                <div className="lp-flyer-benefit-icon">{b.icon}</div>
                <div className="lp-flyer-benefit-content">
                  <h3 className="lp-flyer-benefit-title">{b.title}</h3>
                  <p className="lp-flyer-benefit-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="lp-flyer-compliance-footnote">
            Placement assistance. Employment outcomes depend on skills and employer selection.
          </p>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 10: PROGRAM OUTCOME & REGISTRATION COUNTDOWN GATE
          ========================================================================= */}
      <section className="lp-content-section" id="program-outcome">
        <div className="lp-container">
          <div className="lp-outcome-decision-card">
            <span className="lp-chapter-badge">PROGRAM OUTCOME // NEXT BATCH: 24TH OCTOBER</span>
            <h2 className="lp-outcome-heading">
              Build a portfolio that demonstrates your ability to turn business data into insights, predictive models, and deployed AI applications.
            </h2>

            <p className="lp-outcome-subtext">
              We maintain small batch sizes of 15–20 learners per batch to guarantee 1-on-1 mentor guidance. Reserve your seat before registration closes in:
            </p>

            <div className="lp-countdown-strip">
              <div className="lp-countdown-unit">
                <div className="lp-countdown-num">{timeLeft.days}</div>
                <div className="lp-countdown-lbl">Days</div>
              </div>
              <div className="lp-countdown-unit">
                <div className="lp-countdown-num">{timeLeft.hours}</div>
                <div className="lp-countdown-lbl">Hours</div>
              </div>
              <div className="lp-countdown-unit">
                <div className="lp-countdown-num">{timeLeft.minutes}</div>
                <div className="lp-countdown-lbl">Mins</div>
              </div>
              <div className="lp-countdown-unit">
                <div className="lp-countdown-num">{timeLeft.seconds}</div>
                <div className="lp-countdown-lbl">Secs</div>
              </div>
            </div>

            <div className="lp-outcome-cta-row">
              <button type="button" onClick={scrollToForm} className="lp-orange-cta-btn">
                <span>REGISTER NOW</span>
                <span className="lp-arrow-icon">→</span>
              </button>
              <a href="tel:+918095881188" className="lp-btn-cta-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 11: FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="lp-content-section" id="faqs" style={{ background: '#ffffff', paddingTop: '30px' }}>
        <div className="lp-container">
          <div className="lp-flyer-section-header">
            <h2 className="lp-flyer-title">Frequently Asked Questions</h2>
          </div>

          <div className="lp-faq-container">
            {faqs.map((faq, idx) => (
              <div className={`lp-faq-item ${openFaq === idx ? 'open' : ''}`} key={idx}>
                <button
                  type="button"
                  className="lp-faq-question-btn"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span className="lp-faq-icon">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && <div className="lp-faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORD DOC ORDER 12: BOTTOM BANNER
          ========================================================================= */}
      <div className="lp-flyer-bottom-banner">
        <div className="lp-container">
          <div className="lp-flyer-banner-inner">
            <h3 className="lp-flyer-banner-text">Build Your Data Science &amp; AI Career</h3>
            <button type="button" onClick={scrollToForm} className="lp-flyer-banner-orange-btn">
              <span>REGISTER NOW</span>
              <span className="lp-arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Standalone Footer */}
      <footer className="lp-standalone-footer">
        <div className="lp-container">
          <p className="lp-copyright">Copyright © 2026 DV Analytics. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="lp-mobile-sticky-bar">
        <div className="lp-mobile-actions-grid lp-mobile-actions-grid-2">
          <a href="tel:+918095881188" className="lp-mobile-btn lp-mobile-call">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Now
          </a>
          <button type="button" onClick={scrollToForm} className="lp-mobile-btn lp-mobile-apply">
            Register Now →
          </button>
        </div>
      </div>

      {/* Module Details Modal Popup */}
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
                  <span className="lp-modal-badge">Module 0{activePopupModule.id}</span>
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
                <span className="lp-arrow-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
