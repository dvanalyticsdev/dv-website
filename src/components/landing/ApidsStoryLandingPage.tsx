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

      {/* Visually hidden native select to guarantee standard browser form validation */}
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
  // Scroll progress tracker
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

  // Active Curriculum Module (1 to 4)
  const [activeModule, setActiveModule] = useState(1);

  // Active Capstone Project Slide (0 to 3)
  const [activeProjectSlide, setActiveProjectSlide] = useState(0);

  // Active FAQ Accordion Item
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
        seconds: Math.floor((difference / 1000) % 60),
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

      // CRM webhook disabled for now during testing (leads will not reach CRM sales team)
      // await fetch('https://crm.dvanalyticsmds.in/api/webhook/elementor-lead', {
      //   method: 'POST',
      //   body: payload,
      // }).catch(() => null);

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

  // 1. Why Data Science & Market Demands 2026
  const marketDemands = [
    {
      id: 1,
      badge: 'Surging Adoption',
      stat: '85%+',
      statLabel: 'Enterprises Deploying AI',
      title: 'The AI Transformation Wave',
      desc: 'Companies are aggressively automating manual operations and replacing static reporting with predictive analytics and intelligent agent systems.',
      takeaway: 'High corporate priority across Banking, Healthcare, Retail & Telecom.',
    },
    {
      id: 2,
      badge: 'Critical Talent Deficit',
      stat: '11.5M+',
      statLabel: 'Global Data Openings',
      title: 'Shortage of Deployment Engineers',
      desc: 'While basic code writers are plentiful, organizations face an acute deficit of engineers who can handle Big Data, deploy LLMs, and maintain production APIs.',
      takeaway: 'Industry rewards end-to-end full lifecycle problem solvers.',
    },
    {
      id: 3,
      badge: 'Role Evolution',
      stat: '40%+',
      statLabel: 'Annual Job Surge',
      title: 'From Toy Notebooks to Cloud APIs',
      desc: 'The market no longer values notebook-only coders. High-paying roles require Big Data (PySpark), Generative AI (RAG), and Cloud MLOps on AWS.',
      takeaway: 'Full-stack AI deployment skills command top hiring premiums.',
    },
  ];

  // 2. Industry Market Salary Benchmarks
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

  // 3. Curriculum Modules (Directly aligned with /courses/apids/ & coursesData.ts)
  const curriculumModules = [
    {
      id: 1,
      number: '01',
      badge: 'Module 01 // Foundation & Big Data',
      title: 'Data Management & Programming',
      duration: 'Months 1–2',
      desc: 'Master enterprise database extraction, Python fundamentals, SAS data structures, and distributed Big Data processing at scale.',
      topics: [
        'Relational Database Modeling, Normalization & SQL Server / MySQL',
        'Complex SQL: Joins, Subqueries, CTEs, Window Functions & Stored Procedures',
        'Python Programming: Data Structures, OOP, Functions, APIs & File Handling',
        'Base SAS: Data Step Programming, PROC SQL & Macro Processing',
        'PySpark & Scala: Spark SQL, Big Data Architecture & Spark MLlib',
      ],
      tools: ['SQL Server', 'MySQL', 'Python 3.12', 'Base SAS', 'PySpark', 'Apache Spark'],
      outcome: 'Extract, clean, and process multi-million row transactional datasets with sub-second queries without memory bottlenecks.',
    },
    {
      id: 2,
      number: '02',
      badge: 'Module 02 // Visual Intelligence',
      title: 'Data Analysis & Visualization',
      duration: 'Months 2–3',
      desc: 'Convert terabytes of raw operational data into high-impact executive dashboards and actionable business intelligence metrics.',
      topics: [
        'Excel AI & Copilot: Advanced Formulae, Automation & MIS Reporting',
        'Power BI: Data Modeling, DAX Measures, Power Query & Real-Time Dashboards',
        'Tableau: Visual Analytics, LOD Expressions, Storytelling & Geospatial Maps',
        'Business Metric Definition: Churn Rate, LTV, CAC & Revenue Cohorts',
      ],
      tools: ['Power BI', 'Tableau', 'Excel AI', 'DAX Studio', 'Power Query'],
      outcome: 'Deliver interactive executive dashboards that C-suite stakeholders rely on for strategic business decisions.',
    },
    {
      id: 3,
      number: '03',
      badge: 'Module 03 // Core Intelligence & GenAI',
      title: 'Data Mining, Machine Learning & AI',
      duration: 'Months 3–5',
      desc: 'Build predictive machine learning models, deep neural networks, and modern Generative AI & Autonomous Agentic pipelines.',
      topics: [
        'Python Applied Statistics: Hypothesis Testing, ANOVA, Correlation & Distribution Analysis',
        'Machine Learning: Scikit-Learn, Gradient Boosting (XGBoost, LightGBM, CatBoost)',
        'Deep Learning & NLP: PyTorch, Neural Architectures, Transformers & Embeddings',
        'Generative AI: Large Language Models (LLMs), Prompt Engineering & Vector Databases',
        'Agentic AI: Autonomous Multi-Agent Workflows using LangChain & LangGraph',
      ],
      tools: ['Scikit-Learn', 'XGBoost', 'PyTorch', 'LangChain', 'LangGraph', 'ChromaDB'],
      outcome: 'Design and validate enterprise-grade predictive engines and multi-agent reasoning systems on private data.',
    },
    {
      id: 4,
      number: '04',
      badge: 'Module 04 // Cloud Production Delivery',
      title: 'AI Deployment & Operations (MLOps)',
      duration: 'Months 5–6+',
      desc: 'Ship enterprise AI models into production on AWS Cloud with high-throughput REST APIs, containerization, and automated CI/CD.',
      topics: [
        'FastAPI: High-Performance Asynchronous REST APIs for Model Inference',
        'Docker: Multi-Stage Containerization & Production Cloud Environments',
        'AWS Cloud Infrastructure: Amazon EC2, S3, Security Groups & ECS Deployment',
        'Production MLOps: Experiment Tracking with MLflow, Model Registry & Drift Detection',
        'LLMOps & AIOps: Prompt Monitoring, Latency Optimization & Automated Retraining',
      ],
      tools: ['Docker', 'AWS Cloud', 'FastAPI', 'MLflow', 'GitHub Actions', 'Postman'],
      outcome: 'Deploy a containerized, live, production AI microservice accessible globally via a high-performance REST API.',
    },
  ];

  // 4. Capstone Projects (Directly aligned with /courses/apids/ & coursesData.ts)
  const capstoneProjects = [
    {
      domain: 'Banking & Financial Services',
      title: 'Enterprise Credit Risk Application Scorecard & ECL',
      badge: 'BFSI Risk Modeling',
      problem: 'Assess credit default risk and compute Expected Credit Loss (IFRS 9) across 500,000+ loan applications.',
      solution: 'Engineered end-to-end scorecard with automated feature engineering, WOE/IV transformation, XGBoost, and SHAP interpretability.',
      techStack: ['SQL Server', 'Python', 'XGBoost', 'FastAPI', 'AWS'],
      metric: 'Sub-100ms API latency with 0.88 AUC-ROC benchmark',
    },
    {
      domain: 'Healthcare & Life Sciences',
      title: 'Clinical Patient Readmission & Risk Analytics',
      badge: 'Healthcare AI',
      problem: 'Identify high-risk hospital readmissions within 30 days of discharge from electronic health records (EHR).',
      solution: 'Trained deep learning and tree models on EHR tabular and clinical notes to flag readmission triggers and support triage.',
      techStack: ['Python', 'PyTorch', 'Scikit-Learn', 'Docker', 'Power BI'],
      metric: '34% reduction in avoidable hospital readmissions',
    },
    {
      domain: 'Retail & E-Commerce',
      title: 'Dynamic Pricing & Agentic RAG Shopping Assistant',
      badge: 'GenAI & Retail',
      problem: 'Optimize catalog pricing in real-time and deliver autonomous conversational product discovery.',
      solution: 'Multi-agent RAG workflow ingesting private product catalogs with real-time vector search and dynamic elasticity pricing.',
      techStack: ['LangGraph', 'ChromaDB', 'FastAPI', 'OpenAI APIs', 'AWS'],
      metric: '99.2% catalog retrieval precision & 18% sales lift',
    },
    {
      domain: 'Telecom & Networking',
      title: 'Customer Churn & Autonomous Telecom Service Desk',
      badge: 'Big Data & Telecom',
      problem: 'Detect subscriber churn signals and automate technical fault ticket routing across high-value accounts.',
      solution: 'Distributed PySpark data pipeline processing 4M+ daily call records combined with automated LangChain resolution workflows.',
      techStack: ['PySpark', 'Scala', 'Python', 'Tableau', 'Docker'],
      metric: '4.2M daily events analyzed with 4x faster ticket triage',
    },
  ];

  const handleNextProject = () => {
    setActiveProjectSlide((prev) => (prev + 1) % capstoneProjects.length);
  };

  const handlePrevProject = () => {
    setActiveProjectSlide((prev) => (prev - 1 + capstoneProjects.length) % capstoneProjects.length);
  };

  const faqs = [
    {
      q: 'Can a non-technical or non-CS graduate enroll in APIDS?',
      a: 'Yes, absolutely. Over 65% of our alumni come from non-CS backgrounds including B.Com, BBA, B.Sc, Mechanical, Civil, and Electrical engineering. The program begins from foundational SQL and Python before progressing to advanced machine learning and cloud deployment.',
    },
    {
      q: 'How are the live online sessions conducted?',
      a: 'Sessions are 100% live and two-way interactive with industry practitioners. You code along in real-time, ask questions directly, and receive full HD session recordings and LMS resources for 24/7 revision.',
    },
    {
      q: 'How does DV Analytics placement support work?',
      a: 'Placement preparation starts from Month 4. You receive 1-on-1 resume transformation, GitHub portfolio audits, mock technical interviews with veteran hiring leads, and direct interview referrals across our network of 50+ hiring partner companies.',
    },
    {
      q: 'Are flexible installment and EMI fee options available?',
      a: 'Yes. We offer zero-cost EMI plans, monthly installment options, and early-bird scholarship discounts. You can discuss the fee schedule during your 1-on-1 counseling call.',
    },
    {
      q: 'How is APIDS different from traditional online coding platforms?',
      a: 'Traditional bootcamps only teach basic syntax and toy datasets (like Titanic survival). APIDS focuses on complete production systems: data management, Big Data with PySpark, Generative AI agents, and deploying models to AWS cloud with MLOps. This makes your GitHub portfolio interview-defensible.',
    },
  ];

  return (
    <div className="apids-landing-root">
      {/* Scroll Progress Bar */}
      <div className="lp-progress-bar-track">
        <div className="lp-progress-bar-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Standalone Distraction-Free Header */}
      <header className="lp-standalone-header">
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
            <img src="/logo.png" alt="DV Analytics Logo" className="lp-logo-img" />
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
      </header>

      {/* =========================================================================
          SCENE 1: THE HERO (MINIMAL, CLEAN & POWERFUL)
          ========================================================================= */}
      <section className="lp-hero-section">
        <div className="lp-container">
          <div className="lp-hero-grid">
            <div className="lp-hero-left">
              <div className="lp-hero-batch-badge">
                <span className="lp-hero-batch-dot" />
                <span className="lp-hero-batch-title">Next Batch: <strong>24th October 2026</strong></span>
                <span className="lp-hero-batch-divider">•</span>
                <span className="lp-hero-batch-time">Closing in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
              </div>

              <h1 className="lp-hero-title">
                The Era of Just Writing Syntax is Over. <br />
                <span className="lp-title-gradient">Advanced Program in Industrial Data Science with AI Deployment (APIDS)</span>
              </h1>
              <p className="lp-hero-tagline">
                A <strong>6–8 month</strong> comprehensive program covering the full lifecycle: from SQL &amp; PySpark Big Data to Generative AI agents and live AWS MLOps deployment.
              </p>

              <div className="lp-hero-highlights-grid">
                <div className="lp-hero-pill">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lp-pill-check">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>6–8 Months Industry Immersion</span>
                </div>
                <div className="lp-hero-pill">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lp-pill-check">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% Live Interactive Training</span>
                </div>
                <div className="lp-hero-pill">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lp-pill-check">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Any Graduate Eligible (Non-CS Welcome)</span>
                </div>
                <div className="lp-hero-pill">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lp-pill-check">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>1-on-1 Mentorship &amp; Placement Support</span>
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
                    received. Our Senior Academic Counselor will call you at <strong>{formData.phone}</strong> shortly to
                    finalize your admission and onboarding.
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

                  <button type="submit" className="lp-form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting Registration...' : 'Complete Registration →'}
                  </button>

                  <p className="lp-form-privacy-note">Your information is strictly confidential. No spam.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 2: PROOF & HIRING MARQUEE
          ========================================================================= */}
      <section className="lp-marquee-section">
        <div className="lp-container">
          <p className="lp-marquee-header">Our Placed Alumni Work Across Top Tech Enterprises</p>
          <div className="lp-marquee-logos">
            <span className="lp-company-logo-item">AMAZON</span>
            <span className="lp-company-logo-item">DELOITTE</span>
            <span className="lp-company-logo-item">ACCENTURE</span>
            <span className="lp-company-logo-item">IBM</span>
            <span className="lp-company-logo-item">INFOSYS</span>
            <span className="lp-company-logo-item">PWC</span>
            <span className="lp-company-logo-item">CAPGEMINI</span>
            <span className="lp-company-logo-item">TCS</span>
          </div>

          <div className="lp-metrics-strip">
            <div className="lp-metric-card">
              <div className="lp-metric-number">9,000+</div>
              <div className="lp-metric-label">Learners Mentored &amp; Trained</div>
            </div>
            <div className="lp-metric-card">
              <div className="lp-metric-number">50+</div>
              <div className="lp-metric-label">Enterprise Hiring Partners</div>
            </div>
            <div className="lp-metric-card">
              <div className="lp-metric-number">6–8 Mos</div>
              <div className="lp-metric-label">Comprehensive Duration</div>
            </div>
            <div className="lp-metric-card">
              <div className="lp-metric-number">100%</div>
              <div className="lp-metric-label">Production Capstones</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          NEW SECTION: WHY DATA SCIENCE & 2026 MARKET DEMAND
          ========================================================================= */}
      <section className="lp-story-section" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">Market Intelligence // 2026 Landscape</span>
            <h2 className="lp-section-title">Why Data Science &amp; AI Engineering in 2026?</h2>
            <p className="lp-section-desc">
              Enterprises are moving beyond experimental scripts to production systems. Organizations urgently seek professionals with hands-on Big Data, Generative AI, and cloud deployment skills.
            </p>
          </div>

          <div className="lp-market-grid">
            {marketDemands.map((item) => (
              <div className="lp-market-card" key={item.id}>
                <div className="lp-market-card-top">
                  <span className="lp-market-badge">{item.badge}</span>
                </div>
                <div className="lp-market-stat-block">
                  <div className="lp-market-stat-num">{item.stat}</div>
                  <div className="lp-market-stat-lbl">{item.statLabel}</div>
                </div>
                <h3 className="lp-market-card-title">{item.title}</h3>
                <p className="lp-market-card-desc">{item.desc}</p>
                <div className="lp-market-takeaway-chip">
                  <span className="lp-takeaway-dot" />
                  <span>{item.takeaway}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          NEW SECTION: INDUSTRY MARKET SALARY BENCHMARKS
          ========================================================================= */}
      <section className="lp-story-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">Compensation Benchmarks // Industry Trends</span>
            <h2 className="lp-section-title">Industry Market Salary by Experience Level</h2>
            <p className="lp-section-desc">
              Based on independent compensation reports from AmbitionBox, Glassdoor &amp; NASSCOM (2025–2026). Career progression accelerates significantly as engineers master deployment and GenAI.
            </p>
          </div>

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
          SCENE 3: THE 4 CORE MODULES (OFFICIAL APIDS CURRICULUM)
          ========================================================================= */}
      <section className="lp-story-section" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">Official Curriculum // Aligned with /courses/apids</span>
            <h2 className="lp-section-title">4 Core Modules: From Data Architecture to Cloud AI</h2>
            <p className="lp-section-desc">
              Duration: <strong>6–8 Months</strong> • Live Interactive Training • Real-World Industry Datasets • Production Deployment on AWS.
            </p>
          </div>

          {/* Module Selection Navigation Tabs */}
          <div className="lp-roadmap-nav">
            {curriculumModules.map((m) => (
              <button
                key={m.id}
                className={`lp-roadmap-tab-btn ${activeModule === m.id ? 'active' : ''}`}
                onClick={() => setActiveModule(m.id)}
              >
                <span>Module {m.number}</span>
                <span>•</span>
                <span>{m.title.split('&')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Module Detail Panel */}
          {curriculumModules.map((mod) => {
            if (mod.id !== activeModule) return null;
            return (
              <div className="lp-phase-active-panel" key={mod.id}>
                <div className="lp-phase-left">
                  <div className="lp-module-header-row">
                    <span className="lp-phase-badge">{mod.badge}</span>
                    <span className="lp-module-duration-pill">{mod.duration}</span>
                  </div>
                  <h3 className="lp-phase-title">{mod.title}</h3>
                  <p className="lp-phase-desc">{mod.desc}</p>

                  <div className="lp-phase-topics-grid">
                    {mod.topics.map((topic, i) => (
                      <div className="lp-phase-topic-item" key={i}>
                        <span className="lp-topic-check">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lp-phase-visual-card">
                  <p className="lp-visual-card-header">Core Tech Stack Mastery</p>
                  <div className="lp-tools-pills-wrap">
                    {mod.tools.map((t) => (
                      <span className="lp-tool-pill" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="lp-phase-outcome-box">
                    <p className="lp-outcome-title">Measurable Production Outcome:</p>
                    <p className="lp-outcome-text">{mod.outcome}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SCENE 4: INTERACTIVE CAPSTONE PROJECTS SLIDE CARDS (FROM /courses/apids)
          ========================================================================= */}
      <section className="lp-story-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">Real Production Capstones // Defensible Portfolios</span>
            <h2 className="lp-section-title">Enterprise Projects Built on Real Industry Data</h2>
            <p className="lp-section-desc">
              Zero toy datasets. Explore the actual production pipelines built across 4 major industry verticals.
            </p>
          </div>

          {/* Interactive Slide Card Carousel */}
          <div className="lp-slider-container">
            <div className="lp-slider-nav-bar">
              <div className="lp-slider-counter">
                <span className="lp-counter-current">0{activeProjectSlide + 1}</span>
                <span className="lp-counter-divider">/</span>
                <span className="lp-counter-total">0{capstoneProjects.length}</span>
                <span className="lp-counter-label">• {capstoneProjects[activeProjectSlide].domain}</span>
              </div>

              <div className="lp-slider-nav-actions">
                <button
                  type="button"
                  className="lp-slider-nav-btn"
                  onClick={handlePrevProject}
                  aria-label="Previous project slide"
                >
                  ←
                </button>
                <div className="lp-slider-dots">
                  {capstoneProjects.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`lp-slider-dot ${activeProjectSlide === idx ? 'active' : ''}`}
                      onClick={() => setActiveProjectSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="lp-slider-nav-btn"
                  onClick={handleNextProject}
                  aria-label="Next project slide"
                >
                  →
                </button>
              </div>
            </div>

            {/* Slide Card Viewport */}
            <div className="lp-slider-viewport">
              <div
                className="lp-slider-track"
                style={{ transform: `translateX(-${activeProjectSlide * 100}%)` }}
              >
                {capstoneProjects.map((proj, idx) => (
                  <div className="lp-project-slide-card" key={idx}>
                    <div className="lp-project-slide-head">
                      <span className="lp-project-domain-badge">{proj.domain}</span>
                      <span className="lp-project-badge-tag">{proj.badge}</span>
                    </div>

                    <h3 className="lp-project-slide-title">{proj.title}</h3>

                    <div className="lp-project-slide-body-grid">
                      <div className="lp-project-slide-left">
                        <div className="lp-project-point">
                          <span className="lp-point-label">Business Problem:</span>
                          <p className="lp-point-desc">{proj.problem}</p>
                        </div>
                        <div className="lp-project-point">
                          <span className="lp-point-label">Technical Solution:</span>
                          <p className="lp-point-desc">{proj.solution}</p>
                        </div>
                      </div>

                      <div className="lp-project-slide-right">
                        <div className="lp-project-impact-box">
                          <div className="lp-impact-label">Production Benchmark Metric:</div>
                          <div className="lp-impact-val">{proj.metric}</div>
                        </div>

                        <div className="lp-project-stack-wrap">
                          <div className="lp-stack-label">Enterprise Tech Stack:</div>
                          <div className="lp-project-tags">
                            {proj.techStack.map((s) => (
                              <span className="lp-project-tag" key={s}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 5: THE COMPARISON (OLD BOOTCAMPS VS APIDS)
          ========================================================================= */}
      <section className="lp-story-section" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">Chapter // The Dilemma</span>
            <h2 className="lp-section-title">Why Traditional Coding Bootcamps Fail</h2>
            <p className="lp-section-desc">
              Most institutes still teach textbook syntax and toy datasets from 2018. In 2026, AI can write basic code in seconds. Companies hire engineers who architect and deploy complete systems.
            </p>
          </div>

          <div className="lp-comparison-grid">
            <div className="lp-compare-card card-legacy">
              <div className="lp-compare-header">
                <span className="lp-compare-tag">The Outdated Way</span>
                <h3 className="lp-compare-title">Generic Online Bootcamps</h3>
              </div>
              <ul className="lp-compare-list">
                <li className="lp-compare-item">
                  <span className="lp-item-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span>Basic Python loops and pre-cleaned Titanic/Iris toy datasets.</span>
                </li>
                <li className="lp-compare-item">
                  <span className="lp-item-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span>Zero exposure to real cloud deployment or high-throughput APIs.</span>
                </li>
                <li className="lp-compare-item">
                  <span className="lp-item-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span>Trained by junior teaching assistants with zero corporate consulting exposure.</span>
                </li>
                <li className="lp-compare-item">
                  <span className="lp-item-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span>Leaves you with a GitHub profile identical to 10,000 other applicants.</span>
                </li>
              </ul>
            </div>

            <div className="lp-compare-card card-apids">
              <span className="lp-card-crown-badge">The Industry Standard</span>
              <div className="lp-compare-header">
                <span className="lp-compare-tag">The APIDS Immersion</span>
                <h3 className="lp-compare-title">APIDS: Industrial Data Science with AI Deployment</h3>
              </div>
              <ul className="lp-compare-list">
                <li className="lp-compare-item">
                  <span className="lp-item-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Multi-million row enterprise banking, retail &amp; healthcare datasets.</span>
                </li>
                <li className="lp-compare-item">
                  <span className="lp-item-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Full-lifecycle AI: From SQL extraction to AWS Cloud MLOps &amp; Docker deployment.</span>
                </li>
                <li className="lp-compare-item">
                  <span className="lp-item-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Mentored directly by founders with 18+ years of international corporate delivery.</span>
                </li>
                <li className="lp-compare-item">
                  <span className="lp-item-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Production-grade GitHub portfolio ready to defend during technical hiring rounds.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 6: THE LEARNING ECOSYSTEM
          ========================================================================= */}
      <section className="lp-story-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">Chapter // Learning Delivery</span>
            <h2 className="lp-section-title">How You Will Learn: Live, Practical &amp; Interactive</h2>
            <p className="lp-section-desc">
              Experience two-way interactive live sessions with real-time screen sharing, cloud lab sandboxes, and dedicated mentor guidance.
            </p>
          </div>

          <div className="lp-campuses-grid">
            {/* Live Interactive Card */}
            <div className="lp-campus-card online">
              <span className="lp-campus-badge">100% Live &amp; Interactive</span>
              <h3 className="lp-campus-city">Live Expert Sessions</h3>
              <p className="lp-campus-address">
                Two-way interactive live sessions led by industry veterans. Ask doubts in real-time, code along with mentors, and collaborate with peers across India.
              </p>
              <ul className="lp-campus-facilities-list">
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Weekend &amp; Evening Flexible Timings</span>
                </li>
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Live Architecture Coding &amp; Whiteboarding</span>
                </li>
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Instant In-Class Doubt Resolution</span>
                </li>
              </ul>
              <button onClick={scrollToForm} className="lp-campus-cta-btn">
                Check Live Batch Schedule →
              </button>
            </div>

            {/* Production AI Deployment Card */}
            <div className="lp-campus-card bangalore">
              <span className="lp-campus-badge">Production AI Deployment</span>
              <h3 className="lp-campus-city">Live AI Deployment &amp; MLOps</h3>
              <p className="lp-campus-address">
                Move models out of notebooks into live cloud production. Package predictive algorithms, LLMs, and multi-agent systems as containerized cloud microservices on AWS.
              </p>
              <ul className="lp-campus-facilities-list">
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>FastAPI High-Throughput Inference APIs</span>
                </li>
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Docker Containerization &amp; AWS Cloud Infrastructure</span>
                </li>
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Production MLOps, MLflow Tracking &amp; Drift Monitoring</span>
                </li>
              </ul>
              <button onClick={scrollToForm} className="lp-campus-cta-btn">
                Explore AI Deployment Stack →
              </button>
            </div>

            {/* 24/7 LMS & Mentorship Card */}
            <div className="lp-campus-card bhubaneswar">
              <span className="lp-campus-badge">24/7 LMS &amp; Mentorship</span>
              <h3 className="lp-campus-city">LMS &amp; Career Support</h3>
              <p className="lp-campus-address">
                Never fall behind. Access HD session recordings anytime, alongside downloadable repository codebases and 1-on-1 interview preparation support.
              </p>
              <ul className="lp-campus-facilities-list">
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Lifetime LMS Access to All Recordings</span>
                </li>
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>ATS Resume, GitHub &amp; LinkedIn Optimization</span>
                </li>
                <li className="lp-campus-facility-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>1-on-1 Technical Mock Interviews</span>
                </li>
              </ul>
              <button onClick={scrollToForm} className="lp-campus-cta-btn">
                Apply for Next Batch →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 7: ALUMNI TRANSFORMATIONS
          ========================================================================= */}
      <section className="lp-story-section" style={{ background: '#ffffff' }}>
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">Chapter // Career Outcomes</span>
            <h2 className="lp-section-title">Real Alumni. Real Transformations.</h2>
            <p className="lp-section-desc">
              From non-technical degrees and career breaks to high-growth Data Science &amp; AI careers.
            </p>
          </div>

          <div className="lp-testimonials-grid">
            <div className="lp-testi-card">
              <div className="lp-transition-pill">
                <span className="lp-prev-role">B.E. Mechanical</span>
                <span className="lp-trans-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span className="lp-next-role">Data Scientist</span>
              </div>
              <p className="lp-testi-quote">
                "Coming from a mechanical engineering background with zero coding, I was terrified of Python. DV
                Analytics taught SQL and ML from the absolute ground up. Today I am deploying models at a top financial
                firm."
              </p>
              <div className="lp-student-footer">
                <span className="lp-student-name">Sourabh P.</span>
                <span className="lp-student-placed">Placed at Top MNC</span>
              </div>
            </div>

            <div className="lp-testi-card">
              <div className="lp-transition-pill">
                <span className="lp-prev-role">B.Com Fresher</span>
                <span className="lp-trans-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span className="lp-next-role">Data Analyst</span>
              </div>
              <p className="lp-testi-quote">
                "People told me Data Science requires a CS degree. The real-world banking capstone project gave me the
                exact confidence needed to clear technical interview rounds."
              </p>
              <div className="lp-student-footer">
                <span className="lp-student-name">Ananya M.</span>
                <span className="lp-student-placed">Placed at Tech Global</span>
              </div>
            </div>

            <div className="lp-testi-card">
              <div className="lp-transition-pill">
                <span className="lp-prev-role">3-Yr Career Break</span>
                <span className="lp-trans-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span className="lp-next-role">AI Engineer</span>
              </div>
              <p className="lp-testi-quote">
                "Restarting my career after a 3-year gap felt impossible. The 1-on-1 resume transformation and mentor
                mock interviews completely changed the trajectory of my career."
              </p>
              <div className="lp-student-footer">
                <span className="lp-student-name">Priyanka R.</span>
                <span className="lp-student-placed">Placed at Analytics Firm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 8: COUNTDOWN & FINAL DECISION GATE
          ========================================================================= */}
      <section className="lp-final-cta-section">
        <div className="lp-container">
          <div className="lp-final-cta-box">
            <span className="lp-chapter-badge">NEXT BATCH: 24TH OCTOBER // RESERVE YOUR SEAT</span>
            <h2 className="lp-section-title" style={{ maxWidth: '700px', margin: '0 auto 12px' }}>
              Next Batch Commences on 24th October. Limited Seats Available.
            </h2>
            <p className="lp-section-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
              We maintain small batch sizes of 15–20 learners per batch to guarantee 1-on-1 mentor guidance. Reserve
              your seat before registration closes in:
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

            <div className="lp-final-cta-row">
              <button onClick={scrollToForm} className="lp-btn-cta-primary">
                Apply for Next Batch Now →
              </button>
              <a
                href="tel:+918095881188"
                className="lp-btn-cta-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 9: FAQ ACCORDION
          ========================================================================= */}
      <section className="lp-story-section" style={{ background: '#ffffff', paddingTop: '20px' }}>
        <div className="lp-container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">Got Questions?</span>
            <h2 className="lp-section-title">Frequently Asked Questions</h2>
          </div>

          <div className="lp-faq-container">
            {faqs.map((faq, idx) => (
              <div className={`lp-faq-item ${openFaq === idx ? 'open' : ''}`} key={idx}>
                <button className="lp-faq-question-btn" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <span>{faq.q}</span>
                  <span className="lp-faq-icon">+</span>
                </button>
                {openFaq === idx && <div className="lp-faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standalone Footer */}
      <footer className="lp-standalone-footer">
        <div className="lp-container">
          <p className="lp-copyright">Copyright © 2026 DV Analytics. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Mobile Floating Sticky Action Bar */}
      <div className="lp-mobile-sticky-bar">
        <div className="lp-mobile-actions-grid lp-mobile-actions-grid-2">
          <a href="tel:+918095881188" className="lp-mobile-btn lp-mobile-call">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Now
          </a>
          <button onClick={scrollToForm} className="lp-mobile-btn lp-mobile-apply">
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
};
