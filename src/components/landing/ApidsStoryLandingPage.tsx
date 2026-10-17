import React, { useState, useEffect, useCallback } from 'react';
import { googleReviewsData, GOOGLE_REVIEWS_LINK } from '../../data/googleReviewsData';
import './ApidsStoryLandingPage.css';

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

export interface ApidsStoryLandingPageProps {
  onNavigateHome?: () => void;
}

export const ApidsStoryLandingPage: React.FC<ApidsStoryLandingPageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    state: '',
    course: 'APIDS (Data Science & AI)',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [showDeepDive, setShowDeepDive] = useState(false);

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

  // Exact stories from homepage of dvanalytics (DV Analytics branding & red duration badges)
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
    { value: 'B.E. / B.Tech / M.Tech', label: 'B.E. / B.Tech / M.Tech' },
    { value: 'BCA / MCA', label: 'BCA / MCA' },
    { value: 'B.Sc / M.Sc (Maths / Stats / CS / Physics)', label: 'B.Sc / M.Sc (Maths / Stats / CS)' },
    { value: 'B.Com / BBA / MBA', label: 'B.Com / BBA / MBA' },
    { value: 'Other Graduate Degree', label: 'Other Graduate Degree' },
  ];

  const experienceOptions: SelectOption[] = [
    { value: 'Fresher / College Final Year', label: 'Fresher / College Final Year' },
    { value: '0-2 Years (Junior Analyst / Dev)', label: '0-2 Years (Junior Analyst / Dev)' },
    { value: '2-5 Years (Mid-level Professional)', label: '2-5 Years (Mid-level Professional)' },
    { value: '5+ Years (Senior / Manager)', label: '5+ Years (Senior / Manager)' },
    { value: 'Non-tech Professional Transitioning', label: 'Non-tech Professional Transitioning' },
  ];

  const locationOptions: SelectOption[] = [
    { value: 'Karnataka / Bangalore', label: 'Karnataka / Bangalore' },
    { value: 'Maharashtra / Mumbai / Pune', label: 'Maharashtra / Mumbai / Pune' },
    { value: 'Delhi NCR / Gurgaon / Noida', label: 'Delhi NCR / Gurgaon / Noida' },
    { value: 'Telangana / Hyderabad', label: 'Telangana / Hyderabad' },
    { value: 'Tamil Nadu / Chennai', label: 'Tamil Nadu / Chennai' },
    { value: 'West Bengal / Kolkata', label: 'West Bengal / Kolkata' },
    { value: 'Other Indian State', label: 'Other Indian State' },
    { value: 'International / NRI', label: 'International / NRI' },
  ];

  const scrollToForm = () => {
    const heroForm = document.getElementById('apids-hero-lead-form');
    const bottomForm = document.getElementById('apids-lead-form');
    if (window.scrollY > 1200 && bottomForm) {
      bottomForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (heroForm) {
      heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (bottomForm) {
      bottomForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const renderLeadForm = (title = 'Register for APIDS', subtitle = 'Reserve your seat for the Data Science & AI Deployment batch.') => (
    <div className="lp-form-card">
      {isSubmitted ? (
        <div className="lp-form-success-banner">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#065f46' }}>
            Registration Submitted Successfully!
          </h3>
          <p style={{ color: '#047857', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '14px' }}>
            Thank you, <strong>{formData.name}</strong>. An admissions counselor from DV Analytics will reach out within 2 hours with the syllabus and October 24 batch details.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="lp-orange-submit-btn"
            style={{ marginTop: '10px' }}
          >
            Submit Another Registration
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="lp-lead-form">
          <div className="lp-form-header">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>

          {formError && <div className="lp-form-error-banner">{formError}</div>}

          <div className="lp-form-field">
            <label className="lp-form-label">Full Name *</label>
            <input
              type="text"
              className="lp-form-input"
              placeholder="Enter your full name"
              value={formData.name}
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="lp-form-row-2">
            <div className="lp-form-field">
              <label className="lp-form-label">Email Address *</label>
              <input
                type="email"
                className="lp-form-input"
                placeholder="name@example.com"
                value={formData.email}
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="lp-form-field">
              <label className="lp-form-label">Phone Number *</label>
              <input
                type="tel"
                className="lp-form-input"
                placeholder="10-digit mobile number"
                value={formData.phone}
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              />
            </div>
          </div>

          <div className="lp-form-row-2">
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

          <div className="lp-form-row-2">
            <div className="lp-form-field">
              <label className="lp-form-label">State / Location *</label>
              <LpCustomSelect
                options={locationOptions}
                value={formData.state}
                placeholder="Select state"
                required
                onChange={(val) => setFormData({ ...formData, state: val })}
              />
            </div>

            <div className="lp-form-field">
              <label className="lp-form-label">Course *</label>
              <input
                type="text"
                className="lp-form-input"
                value="APIDS (Data Science & AI)"
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
      title: 'Data Management',
      summary: 'Master SQL, Python, and SAS to extract, clean, validate, and transform data from diverse databases into analysis-ready enterprise datasets.',
      techChips: ['SQL', 'Python 3.12', 'SAS Programming', 'PostgreSQL', 'NumPy & pandas'],
      topics: [
        'SQL Programming: Tables, keys, constraints, filtering, sorting, date/character functions, joins, subqueries, and CTEs',
        'Advanced SQL: Aggregations, window functions, views, stored procedures, data validation, and query performance fundamentals',
        'Python Programming: Variables, conditions, loops, functions, lists, dicts, file handling, and exception handling',
        'Data Manipulation with NumPy & pandas: Missing values, duplicate checks, merging, reshaping, aggregation, and automated cleaning',
        'SAS Programming: DATA steps, PROC SQL, data import/export, conditional logic, summarisation, and reporting fundamentals',
        'Practical Deliverable: Extract, clean, and prepare an analysis-ready dataset from multiple heterogeneous enterprise sources',
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
      title: 'Data Analysis & Visualisation',
      summary: 'Explore data, calculate KPIs, build interactive executive reports, and uncover actionable business insights using Excel AI, Power BI, and Tableau.',
      techChips: ['Excel with AI', 'Power BI', 'Tableau', 'DAX', 'Power Query'],
      topics: [
        'Excel with AI-Assisted Workflows: Business calculations, lookup & conditional aggregations, pivot tables, and Power Query transformations',
        'AI-Assisted Formula Generation: Natural-language analysis, formula explanations, and result validation protocols',
        'Power BI Data Modelling: Power Query ETL, table relationships, calculated measures with DAX, and dynamic KPI dashboards',
        'Tableau Visual Analytics: Data connections, calculated fields, filters, parameters, visual drilldowns, and business storytelling',
        'Enterprise Reporting Governance: Row-level security (RLS), scheduled cloud refresh, and gateway concepts',
        'Practical Deliverable: Build an interactive business dashboard and present actionable findings to decision-makers',
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
      title: 'Statistics for Data Science',
      summary: 'Master descriptive statistics, probability distributions, hypothesis testing, regression diagnostics, and A/B testing to evaluate business questions using evidence.',
      techChips: ['Descriptive Statistics', 'Probability', 'Hypothesis Testing', 'A/B Testing', 'Confidence Intervals'],
      topics: [
        'Descriptive statistics, empirical distributions, variance, standard errors, and outlier detection',
        'Probability foundations, sampling distributions, and confidence interval estimation',
        'Parametric & Non-Parametric Hypothesis Testing: p-values, t-tests, ANOVA, and Chi-Square tests',
        'Correlation analysis, regression diagnostic interpretation, and collinearity detection',
        'A/B Testing Fundamentals: Sample size determination, statistical significance, power, and uncertainty evaluation',
        'Practical Deliverable: Evaluate a business question using quantitative statistical evidence and explain uncertainty',
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
      title: 'Machine Learning',
      summary: 'Design, train, tune, and evaluate machine learning models across prediction, classification, clustering, and forecasting problems.',
      techChips: ['scikit-learn', 'XGBoost', 'Feature Engineering', 'Cross-Validation', 'SHAP Explainability'],
      topics: [
        'Problem definition, business target selection, and feature engineering & preprocessing pipelines',
        'Training, validation, and holdout test splitting; preventing data leakage and target contamination',
        'Supervised Learning: Linear/logistic regression, decision trees, random forests, and gradient boosting (XGBoost/LightGBM)',
        'Unsupervised Learning: K-Means clustering, customer segmentation, and forecasting fundamentals',
        'Handling imbalanced datasets: SMOTE, class weighting, precision-recall thresholds, and cost-sensitive evaluation',
        'Cross-validation, hyperparameter tuning, model explainability with SHAP, and feature importance analysis',
        'Practical Deliverable: Build and evaluate a predictive ML model validated against a meaningful business baseline',
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
      title: 'Deep Learning & NLP',
      summary: 'Harness neural network architectures, text preprocessing, embeddings, and transformers for sentiment analysis and document classification.',
      techChips: ['PyTorch', 'TensorFlow', 'Transformers', 'NLP Tokenization', 'Embeddings'],
      topics: [
        'Neural network fundamentals: Perceptrons, activation functions, loss optimizers, and backpropagation',
        'Training dynamics: Overfitting prevention, dropout, batch normalization, and regularisation strategies',
        'Natural Language Processing (NLP): Text cleaning, tokenization, lemmatization, and TF-IDF representations',
        'Word & sentence embeddings: Vector representations and introduction to transformer architecture concepts',
        'Practical applications: Sentiment analysis, customer intent recognition, and document classification',
        'Practical Deliverable: Develop a text or deep learning application and explain its technical and business limitations',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <circle cx="4" cy="6" r="2" />
          <circle cx="20" cy="6" r="2" />
          <circle cx="4" cy="18" r="2" />
          <circle cx="20" cy="18" r="2" />
          <line x1="6" y1="7" x2="10" y2="10" />
          <line x1="18" y1="7" x2="14" y2="10" />
          <line x1="6" y1="17" x2="10" y2="14" />
          <line x1="18" y1="17" x2="14" y2="14" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Generative AI & Agentic AI',
      summary: 'Build intelligent applications with LLMs, prompt engineering, vector databases, Retrieval-Augmented Generation (RAG), and agentic tool-calling workflows.',
      techChips: ['LangChain', 'LangGraph', 'Vector DBs (FAISS)', 'RAG', 'Agentic Workflows', 'MCP'],
      topics: [
        'Large language model (LLM) fundamentals: Tokens, context windows, prompt design, and structured JSON outputs',
        'Model API integration, embeddings generation, and vector databases (FAISS, ChromaDB)',
        'Retrieval-Augmented Generation (RAG): Document parsing, semantic chunking, and contextual question answering',
        'Tool calling & workflow orchestration: Connecting LLMs to external APIs, databases, and calculators',
        'Agentic AI workflows: Multi-agent coordination, iterative planning, and human-in-the-loop review steps',
        'Introduction to Model Context Protocol (MCP): Open standards for AI assistants connecting to enterprise tools',
        'Quality evaluation, hallucination detection, data privacy, and inference cost governance',
        'Practical Deliverable: Build an AI assistant with defined evaluation criteria, safety guardrails, and controlled tool access',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
    {
      id: 7,
      title: 'Data Engineering',
      summary: 'Engineer automated, scalable ETL/ELT pipelines and distributed data processing systems using PySpark and Databricks.',
      techChips: ['PySpark', 'Databricks', 'ETL / ELT', 'Delta Lake', 'Apache Airflow'],
      topics: [
        'Data pipeline architecture, ETL vs ELT concepts, and lakehouse storage principles',
        'Batch and streaming data fundamentals; data storage file formats (Parquet, Delta Lake)',
        'Distributed processing concepts with PySpark: DataFrames, transformations, actions, and cluster compute',
        'Databricks platform fundamentals: Managed compute clusters, collaborative notebooks, and optimization',
        'Pipeline scheduling and orchestration with Apache Airflow: DAG authoring, task dependencies, and alerting',
        'Data-quality checks, schema drift handling, processing optimisation, and automated failure recovery',
        'Practical Deliverable: Build an automated, repeatable data pipeline for preparing AI training and production data',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      id: 8,
      title: 'Deployment Engineering',
      summary: 'Bridge the gap from code to live production using Git, FastAPI, Docker containerization, cloud deployment, and MLOps/LLMOps monitoring.',
      techChips: ['FastAPI', 'Docker', 'AWS Cloud', 'GitHub Actions CI/CD', 'MLOps & MLflow'],
      topics: [
        'Git & version control hygiene: Branching models, pull requests, and reproducible project repositories',
        'Production API development: High-throughput async REST endpoints with FastAPI, Pydantic validation, and auth',
        'Docker & container fundamentals: Multi-stage Dockerfiles, image optimization, and microservice packaging',
        'Cloud deployment using a selected cloud platform (AWS/Azure/GCP): Virtual instances, container services, and networking',
        'CI/CD fundamentals with GitHub Actions: Automated testing, image building, and continuous release pipelines',
        'Kubernetes container orchestration fundamentals, logging, configuration, and secrets management',
        'MLOps & LLMOps: Experiment tracking with MLflow, model versioning, latency monitoring, and model drift retraining',
        'Practical Deliverable: Deploy a selected project live to the cloud and demonstrate how it is tested and monitored',
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
    {
      id: 9,
      title: 'Consulting & Business Communication',
      summary: 'Master stakeholder requirement gathering, analytical problem framing, feasibility analysis, executive presentations, and project handover.',
      techChips: ['Business Requirements', 'Problem Framing', 'Success Metrics', 'Executive Decks', 'Project Handover'],
      topics: [
        'Business requirement gathering: Discovering the real operational bottleneck through stakeholder interviews',
        'Converting vague business problems into measurable analytical tasks and baseline performance KPIs',
        'Assessing feasibility, technical assumptions, risk trade-offs, and calculating ROI projections',
        'Solution documentation: Architecture blueprints, data dictionaries, and implementation runbooks',
        'Stakeholder presentations: Explaining recommendations, technical trade-offs, and limitations in plain business language',
        'Project handover: Writing operational runbooks, user handover documentation, and team training',
        'Practical Deliverable: Present a complete solution with its business purpose, technical approach, and operating considerations',
      ],
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

  const activePopupModule = selectedModule !== null ? learningPathModules.find((m) => m.id === selectedModule) : null;

  return (
    <div className="lp-page-wrapper">
      {/* -------------------------------------------------------------------------
          TOP BAR / NAVIGATION
          ------------------------------------------------------------------------- */}
      <header className="top">
        <div className="wrap">
          <a
            href="/"
            onClick={(e) => {
              if (onNavigateHome) {
                e.preventDefault();
                onNavigateHome();
              }
            }}
            className="logo-link"
            aria-label="DV Analytics Home"
          >
            <img src="/logo.png" alt="DV Analytics" className="logo" />
          </a>

          <button type="button" onClick={scrollToForm} className="btn">
            REGISTER NOW →
          </button>
        </div>
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
            title="Click to register for APIDS"
            onKeyDown={(e) => {
              if (e.key === 'Enter') scrollToForm();
            }}
          >
            <img
              src="/data-science-ai-training-banner.png"
              alt="Data Science &amp; AI Training Program Banner - DV Analytics"
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
          HERO SECTION (CLEAN FULL-WIDTH EDITORIAL ARCHITECTURE)
          ------------------------------------------------------------------------- */}
      <section className="hero" id="hero-section">
        <div className="wrap">
          <div className="hero-content-grid">
            <div className="hero-left-content">
              <span className="eyebrow">Data Science with AI Deployment Engineering · APIDS</span>
              <div style={{ font: '700 0.85rem/1 var(--mono)', color: 'var(--navy)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                DV Analytics | Transforming You
              </div>
              <h1>
                Data Science with AI Deployment Engineering
                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent)', marginTop: '8px' }}>
                  (ANY GRADUATE CAN BE A DATA SCIENTIST)
                </span>
              </h1>
              <p className="lead">
                Build the skills to manage data, discover insights, develop intelligent models and deploy AI solutions that solve business problems. Move from theoretical notebook code to high-impact production engineering.
              </p>

              {/* 6 Clean Inline Program Badges */}
              <div className="hero-stats-row">
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Duration:</b> 6-9 Months</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Platform:</b> Online/Offline</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Projects:</b> Industry Real Time</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Profile:</b> Resume &amp; Profile Building</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Placement:</b> 100% Placement Support</span>
                </div>
                <div className="hero-stat-pill">
                  <span className="h-stat-dot"></span>
                  <span><b>Average Salary:</b> 40+ LPA</span>
                </div>
              </div>
            </div>

            {/* Registration Box on Right Side of Hero */}
            <div className="hero-right-form" id="apids-hero-lead-form">
              {renderLeadForm('Register for APIDS', 'Reserve your seat for the Data Science & AI Deployment batch.')}
            </div>
          </div>

          {/* Full-Width 5-Step Path Card */}
          <div className="path-card" aria-label="End-to-End Solution Lifecycle">
            <div className="path-top">
              <span>APIDS: End-to-End Project Lifecycle</span>
              <span>Business Problem → Deployed &amp; Monitored AI Solution</span>
            </div>
            <ol className="path">
              <li>
                <b>1. Data Management</b>
                <span>SQL, Python &amp; SAS Base and Advance Programming.</span>
              </li>
              <li>
                <b>2. Analysis &amp; Viz</b>
                <span>Excel AI, Power BI &amp; Tableau.</span>
              </li>
              <li>
                <b>3. Data Mining &amp; AI</b>
                <span>Machine Learning, Deep Learning, Gen AI &amp; Agentic AI.</span>
              </li>
              <li>
                <b>4. Data Engineering</b>
                <span>ETL pipelines, PySpark &amp; Databricks.</span>
              </li>
              <li>
                <b>5. Cloud Deployment</b>
                <span>FastAPI, Docker, MLOps, LLMOps and Monitoring.</span>
              </li>
            </ol>
            <div className="path-bracket">
              <strong>The Data Scientist with AI Deployment Engineering covers the complete lifecycle.</strong>
              <span>From raw business data to verified model to deployed operational service.</span>
            </div>
          </div>

          {/* Program Details Component Grid (From Document) */}
          <div style={{ marginTop: '36px' }}>
            <span className="eyebrow">Program Architecture</span>
            <h2 style={{ fontSize: '1.45rem', marginTop: '6px' }}>Program Details &amp; Learning Specifications</h2>
            <div className="pdetails-grid">
              <div className="pdetail-card">
                <span className="pdetail-label">Duration</span>
                <span className="pdetail-val">6-9 Months</span>
                <p className="pdetail-desc">Structured learning, supported by regular assignments and project practice.</p>
              </div>
              <div className="pdetail-card">
                <span className="pdetail-label">Platform</span>
                <span className="pdetail-val">Online / Offline</span>
                <p className="pdetail-desc">Live interactive online batches &amp; classroom centers at Bangalore and Bhubaneswar.</p>
              </div>
              <div className="pdetail-card">
                <span className="pdetail-label">Projects</span>
                <span className="pdetail-val">Industry Real Time</span>
                <p className="pdetail-desc">Industry-focused capstones covering data preparation, modelling, deployment and monitoring.</p>
              </div>
              <div className="pdetail-card">
                <span className="pdetail-label">Profile</span>
                <span className="pdetail-val">Resume &amp; Profile Building</span>
                <p className="pdetail-desc">Resume preparation, LinkedIn optimisation, GitHub portfolio, and project presentations.</p>
              </div>
              <div className="pdetail-card">
                <span className="pdetail-label">Placement</span>
                <span className="pdetail-val">100% Placement Support</span>
                <p className="pdetail-desc">Delivered under the programme’s stated eligibility and written support terms.</p>
              </div>
              <div className="pdetail-card" style={{ gridColumn: 'span 2' }}>
                <span className="pdetail-label">Average Salary</span>
                <span className="pdetail-val">40+ LPA</span>
                <p className="pdetail-desc">Individual offers vary based on individual competence, technical mastery, and employer evaluation criteria.</p>
              </div>
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
              <span className="eyebrow">In one minute</span>
              <h3>What is it?</h3>
              <p>
                Data Science with AI Deployment Engineering combines data understanding with deployment engineering to make AI solutions usable in daily business operations.
              </p>
            </article>
            <article>
              <span className="eyebrow">Peak Industry Demand</span>
              <h3>Why is it in demand?</h3>
              <p>
                Organisations need professionals who connect data and AI capabilities with practical business outcomes across banking, retail, healthcare, telecom, and e-commerce.
              </p>
            </article>
            <article>
              <span className="eyebrow">Getting Started</span>
              <h3>How do I start?</h3>
              <p>
                Build foundational skills step-by-step from Python and SQL to machine learning, APIs, and cloud deployment with mentor review.{' '}
                <a href="#apids-lead-form" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>
                  Join DV Analytics
                </a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 3: WHAT IS DATA SCIENCE WITH AI DEPLOYMENT ENGINEERING
          ------------------------------------------------------------------------- */}
      <section className="what" id="what-is-apids">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Program Definition</span>
            <h2>What is Data Science with AI Deployment Engineering?</h2>
          </div>
          <div className="what-text">
            <p className="def">
              Data Science with AI Deployment Engineering combines the ability to understand data with the engineering skills needed to make AI solutions usable.
            </p>
            <p>
              A Data Scientist investigates business problems, prepares data, identifies patterns and builds models. AI Deployment Engineering extends this work by integrating models into applications, making predictions available through APIs and monitoring the solution after deployment.
            </p>
            <p>
              The learning objective is to move from analysing a dataset to building a working, reliable business solution that operational teams can use every day.
            </p>
          </div>

          {/* Highlighted Spotlight Example from Document */}
          <div className="example">
            <div className="example-badge-row">
              <span className="example-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Real-World Project Scenario
              </span>
              <span className="example-tag">Example: Banking Loan Assessment</span>
            </div>
            <h3>End-to-End Default Risk Evaluation &amp; Operational AI Assistant</h3>
            <p>
              A complete Data Science &amp; AI Deployment solution connects every phase into a live business workflow:
            </p>
            <ol style={{ margin: '14px 0 0 20px', padding: 0, color: '#334155', lineHeight: 1.6, fontSize: '0.98rem' }}>
              <li><strong>Collecting</strong> customer, loan and credit-history data.</li>
              <li><strong>Cleaning and transforming</strong> the incoming messy data.</li>
              <li><strong>Analysing</strong> repayment patterns and financial risk factors.</li>
              <li><strong>Building a model</strong> to estimate loan default risk.</li>
              <li><strong>Deploying the model</strong> through an asynchronous REST API.</li>
              <li><strong>Creating an AI assistant</strong> to explain credit decisions and risk factors.</li>
              <li><strong>Monitoring</strong> live predictions, application errors, and model drift over time.</li>
            </ol>
            <div className="example-footer">
              <span className="example-footer-lead">The learning objective: Move from analysing a dataset to building a working business solution.</span>
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
            <span className="eyebrow">Industry Relevance</span>
            <h2>Why is it in Demand?</h2>
            <p className="lead">
              Organisations need professionals who can connect data and AI capabilities with practical business outcomes. Building an isolated model is only one part of the solution.
            </p>
          </div>

          <div className="why-grid" style={{ marginTop: '28px' }}>
            <article className="why-card">
              <span className="who-badge">Banking</span>
              <h3>Credit-Risk &amp; Collections</h3>
              <p>Credit-risk assessment, real-time default risk scoring, and intelligent collections prioritisation.</p>
            </article>
            <article className="why-card">
              <span className="who-badge">Insurance</span>
              <h3>Claims &amp; Fraud Risk</h3>
              <p>Automated claims triage, payout estimation, and fraud-risk pattern identification.</p>
            </article>
            <article className="why-card">
              <span className="who-badge">Retail</span>
              <h3>Demand &amp; Inventory</h3>
              <p>Store-level demand forecasting, dynamic replenishment, and supply chain inventory planning.</p>
            </article>
            <article className="why-card">
              <span className="who-badge">E-Commerce</span>
              <h3>Retention &amp; Recommendations</h3>
              <p>Personalized product recommendation engines, search intelligence, and churn intervention.</p>
            </article>
            <article className="why-card">
              <span className="who-badge">Telecom</span>
              <h3>Churn &amp; Service Quality</h3>
              <p>Subscriber churn prediction, network fault detection, and service-quality diagnostic analysis.</p>
            </article>
            <article className="why-card">
              <span className="who-badge">Healthcare</span>
              <h3>Operations &amp; Resources</h3>
              <p>Hospital patient admission forecasting, resource utilisation, and clinical workflow optimisation.</p>
            </article>
          </div>

          <div className="who-note-box" style={{ marginTop: '28px' }}>
            <strong>The Complete Lifecycle:</strong> Building a model is one part of the work. Organisations also need robust data pipelines, application integration, rigorous evaluation, production deployment and ongoing monitoring. Learning across these areas prepares you to contribute across the entire solution lifecycle.
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 5: HOW TO BECOME A DATA SCIENTIST (7-STAGE JOURNEY)
          ------------------------------------------------------------------------- */}
      <section className="learning-journey-stages" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">The 7-Step Roadmap</span>
            <h2>How to Become a Data Scientist with AI Deployment Engineering</h2>
            <p className="lead">
              Progress depends on consistent practice. Attending classes should be followed by independent coding, assignments and practical project work.
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
                  <b>Step 1 · Build Programming &amp; Data Foundations</b>
                  <small>Learn SQL and Python. Practise extracting, cleaning, joining and transforming data.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Masters database querying: schema design, constraints, filtering, joins, subqueries, and window functions.</li>
                    <li>Writes clean Python code: loops, functions, data structures, and file handling for automated data tasks.</li>
                    <li>Resolves dirty data extracts: handles missing values, duplicates, type mismatches, and automated transformations.</li>
                    <li>Establishes version control hygiene with Git branching and reproducible GitHub repositories.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>Ability to extract, clean, and deliver an analysis-ready dataset from complex raw sources.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>SQL Programming</span>
                    <span>Python 3.12</span>
                    <span>PostgreSQL</span>
                    <span>Git</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">2</span>
                <span className="st">
                  <b>Step 2 · Learn Analysis &amp; Business Interpretation</b>
                  <small>Explore datasets, calculate KPIs and build dashboards. Explain what results mean for business decisions.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Explores business datasets to identify operational anomalies, revenue leaks, and seasonal trends.</li>
                    <li>Builds interactive executive reports in Power BI &amp; Tableau with DAX measures and drilldown filters.</li>
                    <li>Leverages Excel with AI-assisted workflows for rapid business calculations and pivot modeling.</li>
                    <li>Translates complex statistical outputs into plain business terms and actionable recommendations.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>Interactive executive dashboards answering core business performance questions.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Power BI</span>
                    <span>Tableau</span>
                    <span>Excel AI</span>
                    <span>Business KPIs</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">3</span>
                <span className="st">
                  <b>Step 3 · Develop Statistical Understanding</b>
                  <small>Learn probability, sampling, hypothesis testing, relationships between variables and uncertainty.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Understands empirical distributions, variance, standard errors, and confidence intervals.</li>
                    <li>Formulates and tests business hypotheses using parametric and non-parametric tests (t-tests, ANOVA, Chi-Square).</li>
                    <li>Interprets correlation vs causation and diagnoses regression multicollinearity.</li>
                    <li>Designs controlled A/B testing protocols, statistical significance, and guardrail metrics.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>Rigorous, evidence-backed decision frameworks that quantify risk and uncertainty.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Hypothesis Testing</span>
                    <span>Probability</span>
                    <span>A/B Testing</span>
                    <span>Regression Stats</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">4</span>
                <span className="st">
                  <b>Step 4 · Build &amp; Evaluate Machine Learning Models</b>
                  <small>Work on prediction, classification, clustering and recommendation problems. Understand performance and failure points.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Frames operational challenges into target variables: regression, classification, clustering, or forecasting.</li>
                    <li>Engineers domain features, prevents target leakage, and balances skewed classes with SMOTE.</li>
                    <li>Trains and benchmarks ensemble models including Random Forests, XGBoost, and LightGBM.</li>
                    <li>Evaluates models on holdout test data and explains individual predictions using SHAP values.</li>
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
                    <span>Explainable AI</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">5</span>
                <span className="st">
                  <b>Step 5 · Develop AI Applications</b>
                  <small>Learn deep learning, NLP, Generative AI, retrieval-augmented generation and agentic workflows.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Trains deep neural networks with PyTorch for complex pattern recognition.</li>
                    <li>Applies NLP text tokenization, embeddings, and pretrained transformers for sentiment analysis.</li>
                    <li>Builds Retrieval-Augmented Generation (RAG) applications over enterprise documents using vector databases.</li>
                    <li>Implements autonomous agentic workflows with LangChain, LangGraph, tool calling, and MCP concepts.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>A production-ready AI assistant with document RAG, custom tool access, and safety guardrails.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>PyTorch</span>
                    <span>GenAI &amp; LLMs</span>
                    <span>RAG (FAISS)</span>
                    <span>LangChain</span>
                    <span>MCP</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">6</span>
                <span className="st">
                  <b>Step 6 · Learn Data &amp; Deployment Engineering</b>
                  <small>Build pipelines, create APIs, package applications and deploy selected solutions to cloud environments.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Engineers scalable data pipelines using PySpark and Databricks clusters.</li>
                    <li>Builds high-throughput, asynchronous REST APIs with FastAPI, Pydantic validation, and JWT security.</li>
                    <li>Packages applications into portable, multi-stage Docker containers.</li>
                    <li>Deploys to AWS Cloud, sets up CI/CD with GitHub Actions, and monitors experiment drift with MLflow.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>A live, containerized, cloud-hosted microservice with automated testing and continuous monitoring.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>FastAPI</span>
                    <span>Docker</span>
                    <span>AWS Cloud</span>
                    <span>PySpark</span>
                    <span>MLOps</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">7</span>
                <span className="st">
                  <b>Step 7 · Complete Projects &amp; Build Your Profile</b>
                  <small>Document your work, explain your contribution and prepare for practical assessments and interviews.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Documents 7 end-to-end industry capstones with clean code, READMEs, and live interactive demos.</li>
                    <li>Builds an optimized technical resume, enhanced LinkedIn profile, and public GitHub portfolio.</li>
                    <li>Undergoes AI-integrated practical tests and technical mock interviews with personalized feedback.</li>
                    <li>Practices presenting solution ROI, defending technical trade-offs, and explaining failure modes.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>A compelling technical portfolio and interview readiness backed by 100% placement support.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Profile Building</span>
                    <span>GitHub Portfolio</span>
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
          INTERACTIVE "KNOW MORE" DEEP-DIVE TRIGGER FOR SECTIONS 4 & 5
          ------------------------------------------------------------------------- */}
      <div className="know-more-section">
        <div className="wrap">
          <div className="know-more-bar">
            <div className="know-more-info">
              <span className="eyebrow">Industry Market Context</span>
              <h3>Want to understand why companies hire APIDS &amp; why AI cannot replace it?</h3>
              <p>Explore our deep-dive analysis on 2026 hiring demand, the 5-specialist breakdown, and the Barbell Theory of tech careers.</p>
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

      {/* Collapsible Deep-Dive: Section 4 & Section 5 */}
      {showDeepDive && (
        <div className="deep-dive-content-wrapper">
          {/* -------------------------------------------------------------------------
              SECTION 4: WHY COMPANIES ARE HIRING APIDS
              ------------------------------------------------------------------------- */}
          <section id="why-fde">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Why APIDS in 2026</span>
                <h2>Why companies are hiring Data Science &amp; AI Deployment Engineers</h2>
                <p className="lead">
                  AI products rarely work the day a customer buys them. Someone has to make them work in the customer&#39;s real world.
                </p>
              </div>
              <div className="why-grid">
                <article className="why-card">
                  <h3>The customer&#39;s data is different</h3>
                  <p>It is messy, incomplete, and isolated across legacy databases. A generic AI tool cannot use it until an engineer cleans and pipelines it.</p>
                </article>
                <article className="why-card">
                  <h3>Projects stall without a bridge</h3>
                  <p>If nobody connects the trained model to the business workflow and live APIs, the project dies in a notebook and the company abandons it.</p>
                </article>
                <article className="why-card">
                  <h3>Handoffs lose time and context</h3>
                  <p>Every time work passes between separate analysts, data engineers, and DevOps specialists, time is lost and requirements get misunderstood.</p>
                </article>
              </div>

              <div className="vs">
                <div className="vs-box then">
                  <span className="eyebrow">Earlier</span>
                  <h3>Five specialists for one product</h3>
                  <ul>
                    <li>A business analyst to frame the question</li>
                    <li>A data engineer to extract and organize the data</li>
                    <li>A data scientist to train the offline model</li>
                    <li>A backend engineer to wrap it in an API</li>
                    <li>A DevOps engineer to deploy to the cloud</li>
                  </ul>
                </div>
                <div className="vs-box now">
                  <span className="eyebrow">Now</span>
                  <h3>One person who covers the full path</h3>
                  <ul>
                    <li>Uses AI copilots as a force multiplier to code faster</li>
                    <li>Knows data, modeling, APIs, and cloud well enough to guide the pipeline end-to-end</li>
                    <li>Eliminates organizational handoffs and miscommunications</li>
                    <li>Owns the business outcome from initial call to live cloud deployment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------------------
              SECTION 5: WHY AI CANNOT REPLACE (BARBELL THEORY)
              ------------------------------------------------------------------------- */}
          <section className="ai" id="ai-cannot-replace">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">AI and the Deployment Engineer</span>
                <h2>Why AI cannot replace a Data Science &amp; AI Deployment Engineer</h2>
                <p className="lead">
                  AI is exceptional at isolated tasks. A role that is only one task gets automated quickly. The AI Deployment Engineer job is multiple connected disciplines plus the human element: framing real client needs, judging edge cases, and taking responsibility for live production.
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
                      <td>Writing code from clear specs</td>
                      <td>Writes working functions and scripts in seconds</td>
                      <td>Someone must decide what to build and verify it solves the true bottleneck</td>
                    </tr>
                    <tr>
                      <td>Cleaning and filtering data</td>
                      <td>Generates SQL and Pandas transformations instantly</td>
                      <td>Someone must know which data is truthful and handle messy real-world anomalies</td>
                    </tr>
                    <tr>
                      <td>Training a standard ML model</td>
                      <td>Picks algorithms and runs AutoML runs</td>
                      <td>Someone must align loss functions with business profit and detect data leakage</td>
                    </tr>
                    <tr>
                      <td>Building application interfaces</td>
                      <td>Generates frontend mockups rapidly</td>
                      <td>Someone must observe where real operational users get confused or frustrated</td>
                    </tr>
                    <tr>
                      <td>Deploying server containers</td>
                      <td>Suggests Dockerfiles and Kubernetes manifests</td>
                      <td>Someone must configure secure VPC networking, IAM permissions, and monitoring</td>
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
                    <b>Pure Coder</b>
                    <span className="d">Writes functions from Jira tickets without seeing the client or infrastructure.</span>
                    <div className="meter s1">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span className="tag w">High Risk</span>
                  </div>

                  <div className="part">
                    <b>Academic Analyst</b>
                    <span className="d">Explores models in isolated notebooks. Solutions rarely reach production.</span>
                    <div className="meter s2">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span className="tag m">Medium Risk</span>
                  </div>

                  <div className="part">
                    <b>Specialist Engineer</b>
                    <span className="d">Deep in one silo, but completely reliant on 4 other handoffs to ship anything.</span>
                    <div className="meter s2">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span className="tag m">Medium Risk</span>
                  </div>

                  <div className="part">
                    <b>AI Deployment Engineer</b>
                    <span className="d">Bridges client pain points to predictive models to live deployed APIs.</span>
                    <div className="meter s3">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span className="tag s">Most Resilient</span>
                  </div>
                </div>
              </div>

              <div className="pull">
                &quot;AI can write the code. It cannot sit with a client, judge its own output, and <span>take responsibility for going live.</span>&quot;
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
          SECTION 6: WHO CAN START THIS CAREER? (ANY GRADUATE CAN BE A DATA SCIENTIST)
          ------------------------------------------------------------------------- */}
      <section className="who-can" id="who-can-start" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Audience &amp; Eligibility</span>
            <h2>Who Can Start This Career?</h2>
            <p className="lead">
              <strong>(ANY GRADUATE CAN BE A DATA SCIENTIST)</strong> · The programme is designed for learners from technical and non-technical backgrounds, fresh graduates, and experienced professionals transitioning into high-impact AI careers.
            </p>
          </div>

          <div className="who-can-grid">
            <div className="who-can-card">
              <span className="who-badge">All Degrees Welcome</span>
              <h3>Technical &amp; Non-Technical Graduates</h3>
              <p>Graduates from commerce, management, arts, science, and engineering backgrounds can begin learning these skills from the ground up.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">Campus to Career</span>
              <h3>Final-Year Students</h3>
              <p>College final-year students preparing for high-paying roles in analytics, data science, machine learning, and AI engineering.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">High-Growth Transition</span>
              <h3>Working Professionals</h3>
              <p>Experienced professionals from non-tech, operations, or legacy IT sectors seeking a structured, high-ROI career transition.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">Next-Gen Upskilling</span>
              <h3>Data &amp; BI Analysts</h3>
              <p>Analysts looking to advance beyond static reports into advanced machine learning algorithms, deep learning, GenAI, and cloud deployment.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">AI Integration</span>
              <h3>Software Developers</h3>
              <p>Backend and frontend engineers moving towards data engineering, AI application development, RAG systems, and MLOps.</p>
            </div>
            <div className="who-can-card">
              <span className="who-badge">Confident Relaunch</span>
              <h3>Professionals with a Career Gap</h3>
              <p>Individuals returning to the workforce after a personal or professional break, building demonstrable proof-of-work project portfolios.</p>
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
            <strong>Foundation-First Pedagogy:</strong> Previous coding experience is helpful but is not essential for starting from the foundations. Learners must be willing to develop programming, numerical reasoning and problem-solving skills. “Any graduate can be a Data Scientist” expresses an inclusive learning opportunity. Employers may apply their own qualification, experience and assessment requirements.
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 7: DETAILED CURRICULUM (THE 9 PILLARS)
          ------------------------------------------------------------------------- */}
      <section id="skills" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Comprehensive Syllabus</span>
            <h2>The 9 Pillars of Data Science with AI Deployment Engineering</h2>
            <p className="lead">
              You do not need to master everything at once. You learn the skills module by module, then deploy them together on real-world projects. <strong>Tap any pillar below to inspect the complete syllabus and practical deliverables.</strong>
            </p>
          </div>

          <div className="pillars">
            {learningPathModules.map((m) => (
              <article
                key={m.id}
                className={`pillar ${m.id === 1 ? 'key' : ''}`}
                onClick={() => setSelectedModule(m.id)}
                role="button"
                tabIndex={0}
                title="Click to view detailed syllabus"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedModule(m.id);
                }}
              >
                <span className="n">{m.id} · PILLAR {m.id === 1 ? '· START HERE' : ''}</span>
                <h3>{m.title}</h3>
                <p>{m.summary}</p>
                <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {m.techChips.slice(0, 3).map((chip, cIdx) => (
                    <span key={cIdx} style={{ font: '600 0.72rem/1 var(--mono)', background: 'var(--navy-soft)', color: 'var(--navy)', padding: '3px 8px', borderRadius: '4px' }}>
                      {chip}
                    </span>
                  ))}
                  {m.techChips.length > 3 && (
                    <span style={{ font: '600 0.72rem/1 var(--mono)', color: 'var(--accent)', padding: '3px 4px' }}>
                      +{m.techChips.length - 3} more
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="split" style={{ marginTop: '40px' }}>
            <div>
              <span className="eyebrow">Work Breakdown</span>
              <h3>How much of the job is code?</h3>
              <div className="bar" role="img" aria-label="60% Code & Data, 20% Cloud & Systems, 20% Client & Strategy">
                <div className="b1">60%<span className="bar-tag"> Code</span></div>
                <div className="b2">20%<span className="bar-tag"> Cloud</span></div>
                <div className="b3">20%<span className="bar-tag"> Client</span></div>
              </div>
              <div className="legend">
                <div><b>60% Code &amp; Data:</b> Python, SQL, SAS, statistical modelling, machine learning algorithms, deep learning and GenAI.</div>
                <div><b>20% Cloud &amp; Systems:</b> Docker containerization, REST APIs, cloud deployment, and MLOps/LLMOps pipelines.</div>
                <div><b>20% Client &amp; Strategy:</b> Understanding business pain points, framing KPIs, executive demos and project handover.</div>
              </div>
            </div>

            <div>
              <span className="eyebrow">Learning Sequence</span>
              <h3>In what order do you learn?</h3>
              <ol className="order">
                <li data-n="1">
                  <div><b>Data Management:</b> Master SQL, Python, and SAS to extract, clean, and validate data.</div>
                </li>
                <li data-n="2">
                  <div><b>Analysis &amp; Visualisation:</b> Build interactive dashboards and calculate KPIs in Power BI &amp; Tableau.</div>
                </li>
                <li data-n="3">
                  <div><b>Statistics for Data Science:</b> Learn probability distributions, hypothesis testing, and A/B experiments.</div>
                </li>
                <li data-n="4">
                  <div><b>Machine Learning:</b> Train regression, classification, clustering, and tree ensembles with explainability.</div>
                </li>
                <li data-n="5">
                  <div><b>Deep Learning &amp; NLP:</b> Build neural networks and transformer text classification models in PyTorch.</div>
                </li>
                <li data-n="6">
                  <div><b>Generative AI &amp; Agents:</b> Build RAG applications, vector search, tool calling, and multi-agent workflows.</div>
                </li>
                <li data-n="7">
                  <div><b>Data Engineering:</b> Orchestrate scalable ETL/ELT pipelines with PySpark, Databricks, and Airflow.</div>
                </li>
                <li data-n="8">
                  <div><b>Deployment Engineering:</b> Package in Docker, build FastAPI endpoints, and deploy to Cloud with CI/CD.</div>
                </li>
                <li data-n="9">
                  <div><b>Consulting &amp; Communication:</b> Frame business problems, calculate ROI, and present executive handovers.</div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

<section className="tools" id="tools">
  <div className="wrap">
    <div className="sec-head">
      <span className="eyebrow">Tools you will learn</span>
      <h2>The tools an Applied Data Scientist &amp; AI Deployment Engineer uses every day</h2>
      <p className="lead">You do not need to know any of these today. You pick them up step by step, one project at a time. Each tool is here because real companies use it.</p>
    </div>
    <div className="tg"><div className="tg-head"><h3>Work with data</h3><span>Skill 1 · Data and Programming</span></div><div className="tgrid"><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg></span><div><strong>Python</strong><small>The main language you code in</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#4169E1" d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"/></svg></span><div><strong>PostgreSQL</strong><small>Store data and ask it questions (SQL)</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg></span><div><strong>MongoDB</strong><small>Store flexible, unstructured data</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#150458" d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.455zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67Z"/></svg></span><div><strong>Pandas</strong><small>Clean and shape data tables</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#231F20" d="M9.71 2.136a1.43 1.43 0 0 0-2.047 0h-.007a1.48 1.48 0 0 0-.421 1.042c0 .41.161.777.422 1.039l.007.007c.257.264.616.426 1.019.426.404 0 .766-.162 1.027-.426l.003-.007c.261-.262.421-.629.421-1.039 0-.408-.159-.777-.421-1.042H9.71zM8.683 22.295c.404 0 .766-.167 1.027-.429l.003-.008c.261-.261.421-.631.421-1.036 0-.41-.159-.778-.421-1.044H9.71a1.42 1.42 0 0 0-1.027-.432 1.4 1.4 0 0 0-1.02.432h-.007c-.26.266-.422.634-.422 1.044 0 .406.161.775.422 1.036l.007.008c.258.262.617.429 1.02.429zm7.89-4.462c.359-.096.683-.33.882-.684l.027-.052a1.47 1.47 0 0 0 .114-1.067 1.454 1.454 0 0 0-.675-.896l-.021-.014a1.425 1.425 0 0 0-1.078-.132c-.36.091-.684.335-.881.686-.2.349-.241.75-.146 1.119.099.363.33.691.675.896h.002c.346.203.737.239 1.101.144zm-6.405-7.342a2.083 2.083 0 0 0-1.485-.627c-.58 0-1.103.242-1.482.627-.378.385-.612.916-.612 1.507s.233 1.124.612 1.514a2.08 2.08 0 0 0 2.967 0c.379-.39.612-.923.612-1.514s-.233-1.122-.612-1.507zm-.835-2.51c.843.141 1.6.552 2.178 1.144h.004c.092.093.182.196.265.299l1.446-.851a3.176 3.176 0 0 1-.047-1.808 3.149 3.149 0 0 1 1.456-1.926l.025-.016a3.062 3.062 0 0 1 2.345-.306c.77.21 1.465.721 1.898 1.482v.002c.431.757.518 1.626.313 2.408a3.145 3.145 0 0 1-1.456 1.928l-.198.118h-.02a3.095 3.095 0 0 1-2.154.201 3.127 3.127 0 0 1-1.514-.944l-1.444.848a4.162 4.162 0 0 1 0 2.879l1.444.846c.413-.47.939-.789 1.514-.944a3.041 3.041 0 0 1 2.371.319l.048.023v.002a3.17 3.17 0 0 1 1.408 1.906 3.215 3.215 0 0 1-.313 2.405l-.026.053-.003-.005a3.147 3.147 0 0 1-1.867 1.436 3.096 3.096 0 0 1-2.371-.318v-.006a3.156 3.156 0 0 1-1.456-1.927 3.175 3.175 0 0 1 .047-1.805l-1.446-.848a3.905 3.905 0 0 1-.265.294l-.004.005a3.938 3.938 0 0 1-2.178 1.138v1.699a3.09 3.09 0 0 1 1.56.862l.002.004c.565.572.914 1.368.914 2.243 0 .873-.35 1.664-.914 2.239l-.002.009a3.1 3.1 0 0 1-2.21.931 3.1 3.1 0 0 1-2.206-.93h-.002v-.009a3.186 3.186 0 0 1-.916-2.239c0-.875.35-1.672.916-2.243v-.004h.002a3.1 3.1 0 0 1 1.558-.862v-1.699a3.926 3.926 0 0 1-2.176-1.138l-.006-.005a4.098 4.098 0 0 1-1.173-2.874c0-1.122.452-2.136 1.173-2.872h.006a3.947 3.947 0 0 1 2.176-1.144V6.289a3.137 3.137 0 0 1-1.558-.864h-.002v-.004a3.192 3.192 0 0 1-.916-2.243c0-.871.35-1.669.916-2.243l.002-.002A3.084 3.084 0 0 1 8.683 0c.861 0 1.641.355 2.21.932v.002h.002c.565.574.914 1.372.914 2.243 0 .876-.35 1.667-.914 2.243l-.002.005a3.142 3.142 0 0 1-1.56.864v1.692zm8.121-1.129l-.012-.019a1.452 1.452 0 0 0-.87-.668 1.43 1.43 0 0 0-1.103.146h.002c-.347.2-.58.529-.677.896-.095.365-.054.768.146 1.119l.007.009c.2.347.519.579.874.673.357.103.755.059 1.098-.144l.019-.009a1.47 1.47 0 0 0 .657-.885 1.493 1.493 0 0 0-.141-1.118"/></svg></span><div><strong>Apache Kafka</strong><small>Move data in real time</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#017CEE" d="M17.195 16.822l4.002-4.102C23.55 10.308 23.934 5.154 24 .43a.396.396 0 0 0-.246-.373.392.392 0 0 0-.437.09l-6.495 6.658-4.102-4.003C10.309.45 5.154.066.43 0H.423a.397.397 0 0 0-.277.683l6.658 6.494-4.003 4.103C.45 13.692.065 18.846 0 23.57a.398.398 0 0 0 .683.282l6.494-6.657 3.934 3.837.17.165c2.41 2.353 7.565 2.737 12.288 2.803h.006a.397.397 0 0 0 .277-.683l-6.657-6.495zm-.409-9.476c.04.115.05.24.031.344-.17.96-1.593 2.538-4.304 3.87a.597.597 0 0 0-.08-.079c1.432-3.155 1.828-5.61 1.175-7.322l3.058 2.984.12.203zm-.131 9.44a.73.73 0 0 1-.347.031c-.96-.171-2.537-1.594-3.87-4.307a.656.656 0 0 0 .08-.078l-.001.001c3.155 1.432 5.61 1.83 7.324 1.174l-2.969 3.043M23.568.392a.05.05 0 0 1 .052-.011c.018.006.03.024.029.043-.065 4.655-.437 9.726-2.703 12.05-1.53 1.565-4.326 1.419-8.283-.377.006-.037.021-.07.02-.108 0-.044-.017-.082-.026-.123 2.83-1.39 4.315-3.037 4.506-4.115.057-.322-.009-.542-.102-.688l6.507-6.67V.392zM.393.43A.045.045 0 0 1 .382.38C.39.36.403.343.425.35c4.655.065 9.727.438 12.05 2.703l.002.002c1.56 1.527 1.415 4.323-.379 8.28-.033-.005-.062-.02-.097-.02h-.008c-.045.001-.084.019-.126.027-1.39-2.83-3.037-4.314-4.115-4.506-.323-.057-.542.01-.688.103L.393.43zm11.94 11.563a.331.331 0 0 1-.327.335H12a.332.332 0 0 1-.004-.661c.172.016.333.144.335.326h.002zm-5.12 4.661a.722.722 0 0 1-.03-.345c.17-.96 1.595-2.54 4.309-3.873.013.016.019.035.033.05.013.012.03.017.044.028-1.434 3.158-1.83 5.613-1.177 7.326l-3.041-2.967m-.006-9.659a.735.735 0 0 1 .345-.031c.961.17 2.54 1.594 3.871 4.306a.597.597 0 0 0-.079.08c-2.167-.983-4.007-1.484-5.498-1.484-.68 0-1.289.103-1.825.308L7.128 7.35M.43 23.607c-.018.018-.038.015-.052.01-.019-.007-.028-.021-.028-.043.065-4.654.437-9.725 2.703-12.049 1.527-1.565 4.325-1.419 8.286.378-.006.035-.02.067-.02.104 0 .043.018.083.026.124-2.831 1.391-4.317 3.04-4.51 4.117-.057.322.01.542.103.688L.43 23.607zm23.144.042c-4.655-.065-9.726-.437-12.05-2.703l-.005-.006c-1.56-1.526-1.412-4.322.383-8.279.033.005.064.02.098.02h.009c.043 0 .08-.018.122-.027 1.39 2.832 3.036 4.317 4.115 4.51.083.014.16.021.23.021a.776.776 0 0 0 .45-.133l6.68 6.516c.02.02.016.04.01.052a.042.042 0 0 1-.042.029z"/></svg></span><div><strong>Apache Airflow</strong><small>Schedule and run data jobs</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#F03C2E" d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z"/></svg></span><div><strong>Git</strong><small>Track every change to your code</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></span><div><strong>GitHub</strong><small>Share and review code with a team</small></div></div><div className="tool"><span className="tl dk" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#FCC624" d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z"/></svg></span><div><strong>Linux</strong><small>The system most servers run on</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#F37626" d="M7.157 22.201A1.784 1.799 0 0 1 5.374 24a1.784 1.799 0 0 1-1.784-1.799 1.784 1.799 0 0 1 1.784-1.799 1.784 1.799 0 0 1 1.783 1.799zM20.582 1.427a1.415 1.427 0 0 1-1.415 1.428 1.415 1.427 0 0 1-1.416-1.428A1.415 1.427 0 0 1 19.167 0a1.415 1.427 0 0 1 1.415 1.427zM4.992 3.336A1.047 1.056 0 0 1 3.946 4.39a1.047 1.056 0 0 1-1.047-1.055A1.047 1.056 0 0 1 3.946 2.28a1.047 1.056 0 0 1 1.046 1.056zm7.336 1.517c3.769 0 7.06 1.38 8.768 3.424a9.363 9.363 0 0 0-3.393-4.547 9.238 9.238 0 0 0-5.377-1.728A9.238 9.238 0 0 0 6.95 3.73a9.363 9.363 0 0 0-3.394 4.547c1.713-2.04 5.004-3.424 8.772-3.424zm.001 13.295c-3.768 0-7.06-1.381-8.768-3.425a9.363 9.363 0 0 0 3.394 4.547A9.238 9.238 0 0 0 12.33 21a9.238 9.238 0 0 0 5.377-1.729 9.363 9.363 0 0 0 3.393-4.547c-1.712 2.044-5.003 3.425-8.772 3.425Z"/></svg></span><div><strong>Jupyter</strong><small>Try ideas and see results quickly</small></div></div></div></div>
<div className="tg"><div className="tg-head"><h3>Build the app</h3><span>Skill 2 · Software Engineering</span></div><div className="tgrid"><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#009688" d="M12 .0387C5.3729.0384.0003 5.3931 0 11.9988c-.001 6.6066 5.372 11.9628 12 11.9625 6.628.0003 12.001-5.3559 12-11.9625-.0003-6.6057-5.3729-11.9604-12-11.96m-.829 5.4153h7.55l-7.5805 5.3284h5.1828L5.279 18.5436q2.9466-6.5444 5.892-13.0896"/></svg></span><div><strong>FastAPI</strong><small>Build the back end of an app</small></div></div><div className="tool"><span className="tl dk" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#61DAFB" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg></span><div><strong>React</strong><small>Build the screens people see</small></div></div><div className="tool"><span className="tl dk" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg></span><div><strong>JavaScript</strong><small>Make web pages interactive</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg></span><div><strong>HTML</strong><small>The structure of every web page</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#FF6C37" d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z"/></svg></span><div><strong>Postman</strong><small>Test that your back end works</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#FF4B4B" d="M16.673 11.32l6.862-3.618c.233-.136.554.12.442.387L20.463 17.1zm-8.556-.229l3.473-5.187c.203-.328.578-.316.793-.028l7.886 11.75zm-3.375 7.25c-.28 0-.835-.284-.993-.716l-3.72-9.46c-.118-.331.139-.614.48-.464l19.474 10.306c-.149.147-.453.337-.72.334z"/></svg></span><div><strong>Streamlit</strong><small>Make quick demo apps in Python</small></div></div></div></div>
<div className="tg"><div className="tg-head"><h3>Add AI</h3><span>Skill 3 · AI and Analytics</span></div><div className="tgrid"><div className="tool"><span className="tl" aria-hidden="true"><b>AI</b></span><div><strong>OpenAI API</strong><small>Use powerful AI models in your app</small></div></div><div className="tool"><span className="tl dk" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#7FC8FF" d="M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z"/></svg></span><div><strong>LangChain</strong><small>Connect AI to your data and tools</small></div></div><div className="tool"><span className="tl dk" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#7FC8FF" d="M5 19H10A5 5 0 115 14ZM19 14A5 5 0 1114 19H19ZM10 5A5 5 0 105 10V5ZM19 5V10A5 5 0 1014 5Z"/></svg></span><div><strong>LangGraph</strong><small>Plan step-by-step AI workflows</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#FF5A50" d="M12.482.18C7.161 1.319 1.478 9.069 1.426 15.372c-.051 5.527 3.1 8.68 8.68 8.627 6.716-.05 14.259-6.87 12.09-10.9-.672-1.292-1.396-1.344-2.687-.207-1.602 1.395-1.654.31-.207-2.893 1.757-3.98 1.705-5.322-.31-7.544C17.03.388 14.962-.388 12.482.181Zm5.322 2.068c2.273 2.015 2.376 4.236.465 8.42-1.395 3.1-2.17 3.515-3.824 1.86-1.24-1.24-1.343-3.46-.258-6.044 1.137-2.635.982-3.1-.568-1.653-3.72 3.358-6.458 9.765-5.424 12.503.464 1.189.825 1.395 2.737 1.395 2.79 0 6.303-1.705 7.957-3.926 1.756-2.274 2.79-2.274 2.79-.052 0 3.875-6.459 8.627-11.625 8.627-6.251 0-9.351-4.752-7.491-11.47.878-2.995 4.443-7.904 7.077-9.66 3.255-2.17 5.684-2.17 8.164 0z"/></svg></span><div><strong>CrewAI</strong><small>Build a team of AI helpers</small></div></div><div className="tool"><span className="tl dk" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#FFD21E" d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"/></svg></span><div><strong>Hugging Face</strong><small>Find ready-made AI models</small></div></div><div className="tool"><span className="tl dk" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#F7931E" d="M15.601 5.53c-1.91.035-3.981.91-5.63 2.56-2.93 2.93-2.083 8.53-1.088 9.525.805.804 6.595 1.843 9.526-1.088a9.74 9.74 0 0 0 .584-.643c.043-.292.205-.66.489-1.106a1.848 1.848 0 0 1-.537.176c-.144.265-.37.55-.676.855-.354.335-.607.554-.76.656a.795.795 0 0 1-.437.152c-.35 0-.514-.308-.494-.924-.22.316-.425.549-.612.7a.914.914 0 0 1-.578.224c-.194 0-.36-.09-.496-.273a1.03 1.03 0 0 1-.193-.507 4.016 4.016 0 0 1-.726.583c-.224.132-.47.197-.74.197-.3 0-.543-.096-.727-.288a.978.978 0 0 1-.257-.524v.004c-.3.276-.564.48-.79.611a1.295 1.295 0 0 1-.649.197.693.693 0 0 1-.571-.275c-.145-.183-.218-.43-.218-.739 0-.464.101-1.02.302-1.67.201-.65.445-1.25.733-1.797l.842-.312a.21.21 0 0 1 .06-.013c.063 0 .116.047.157.14.04.095.061.221.061.38 0 .451-.104.888-.312 1.31-.207.422-.532.873-.974 1.352-.018.23-.027.388-.027.474 0 .193.036.345.106.458.071.113.165.169.282.169a.71.71 0 0 0 .382-.13c.132-.084.333-.26.602-.523.028-.418.187-.798.482-1.142.324-.38.685-.569 1.08-.569.206 0 .37.054.494.16a.524.524 0 0 1 .186.417c0 .458-.486.829-1.459 1.114.088.43.32.646.693.646a.807.807 0 0 0 .417-.117c.129-.076.321-.243.575-.497.032-.252.118-.495.259-.728.182-.3.416-.544.701-.73.285-.185.537-.278.756-.278.276 0 .47.127.58.381l.677-.374h.186l-.292.971c-.15.488-.226.823-.226 1.004 0 .19.067.285.202.285.086 0 .181-.045.285-.137.104-.092.25-.232.437-.42v.001c.143-.155.274-.32.392-.494-.19-.084-.285-.21-.285-.375 0-.17.058-.352.174-.545.116-.194.275-.29.479-.29.172 0 .258.088.258.265 0 .139-.05.338-.149.596.367-.04.687-.32.961-.842l.228-.01c1.059-2.438.828-5.075-.83-6.732-1.019-1.02-2.408-1.5-3.895-1.471zm4.725 8.203a8.938 8.938 0 0 1-1.333 2.151 1.09 1.09 0 0 0-.012.147c0 .168.047.309.14.423.092.113.206.17.34.17.296 0 .714-.264 1.254-.787-.001.04-.003.08-.003.121 0 .146.012.368.036.666l.733-.172c0-.2.003-.357.01-.474.01-.157.033-.33.066-.517.02-.11.07-.216.152-.315l.186-.216a5.276 5.276 0 0 1 .378-.397c.062-.055.116-.099.162-.13a.26.26 0 0 1 .123-.046c.055 0 .083.035.083.106 0 .07-.052.236-.156.497-.194.486-.292.848-.292 1.084 0 .175.046.314.136.418a.45.45 0 0 0 .358.155c.365 0 .803-.269 1.313-.808v-.381c-.361.426-.623.64-.784.64-.109 0-.163-.067-.163-.2 0-.1.065-.316.195-.65.19-.486.285-.836.285-1.048a.464.464 0 0 0-.112-.319.36.36 0 0 0-.282-.127c-.165 0-.354.077-.567.233-.213.156-.5.436-.863.84.053-.262.165-.622.335-1.08l-.809.156a6.54 6.54 0 0 0-.399 1.074c-.04.156-.07.316-.092.48a7.447 7.447 0 0 1-.49.45.38.38 0 0 1-.229.08.208.208 0 0 1-.174-.082.352.352 0 0 1-.064-.222c0-.1.019-.214.056-.343.038-.13.12-.373.249-.731l.308-.849zm-17.21-2.927c-.863-.016-1.67.263-2.261.854-1.352 1.352-1.07 3.827.631 5.527 1.7 1.701 4.95 1.21 5.527.632.467-.466 1.07-3.827-.631-5.527-.957-.957-2.158-1.465-3.267-1.486zm12.285.358h.166v.21H15.4zm.427 0h.166v.865l.46-.455h.195l-.364.362.428.684h-.198l-.357-.575-.164.166v.41h-.166zm1.016 0h.166v.21h-.166zm.481.122h.166v.288h.172v.135h-.172v.717c0 .037.006.062.02.075.012.013.037.02.074.02a.23.23 0 0 0 .078-.01v.141a.802.802 0 0 1-.136.014.23.23 0 0 1-.15-.043.15.15 0 0 1-.052-.123v-.79h-.141v-.136h.141zm-3.562.258c.081 0 .15.012.207.038.057.024.1.061.13.11s.045.106.045.173h-.176c-.006-.111-.075-.167-.208-.167a.285.285 0 0 0-.164.041.134.134 0 0 0-.06.117c0 .035.015.065.045.088.03.024.08.044.15.06l.16.039a.47.47 0 0 1 .224.105c.047.046.07.108.07.186a.3.3 0 0 1-.052.175.327.327 0 0 1-.152.116.585.585 0 0 1-.226.041c-.136 0-.24-.03-.309-.088-.069-.059-.105-.149-.109-.269h.176c.004.037.01.065.017.084a.166.166 0 0 0 .034.054c.044.043.112.065.204.065a.31.31 0 0 0 .177-.045.139.139 0 0 0 .067-.119.116.116 0 0 0-.038-.09.287.287 0 0 0-.124-.055l-.156-.038a1.248 1.248 0 0 1-.159-.05.359.359 0 0 1-.098-.061.22.22 0 0 1-.058-.083.32.32 0 0 1-.016-.108c0-.096.036-.174.109-.232a.45.45 0 0 1 .29-.087zm1.035 0a.46.46 0 0 1 .202.043.351.351 0 0 1 .187.212.577.577 0 0 1 .023.126h-.168a.256.256 0 0 0-.078-.168.242.242 0 0 0-.17-.06.248.248 0 0 0-.155.05.306.306 0 0 0-.1.144.662.662 0 0 0-.034.224.58.58 0 0 0 .035.214.299.299 0 0 0 .101.135.261.261 0 0 0 .157.048c.142 0 .227-.084.256-.252h.167a.519.519 0 0 1-.065.22.35.35 0 0 1-.146.138.464.464 0 0 1-.216.048.448.448 0 0 1-.246-.066.441.441 0 0 1-.161-.192.703.703 0 0 1-.057-.293c0-.085.01-.163.032-.233a.522.522 0 0 1 .095-.182.403.403 0 0 1 .15-.117.453.453 0 0 1 .191-.04zm.603.03h.166v1.046H15.4zm1.443 0h.166v1.046h-.166zm-5.05.618c-.08 0-.2.204-.356.611-.155.407-.308.977-.459 1.71.281-.312.509-.662.683-1.05.175-.387.262-.72.262-.999a.455.455 0 0 0-.036-.197c-.025-.05-.056-.075-.093-.075zm4.662 1.797c-.221 0-.431.188-.629.563-.197.376-.296.722-.296 1.038 0 .12.029.216.088.29a.273.273 0 0 0 .223.111c.221 0 .43-.188.625-.565.196-.377.294-.725.294-1.043a.457.457 0 0 0-.083-.29.269.269 0 0 0-.222-.104zm-2.848.007c-.146 0-.285.11-.417.333-.133.222-.2.51-.2.866.566-.159.849-.452.849-.881 0-.212-.077-.318-.232-.318Z"/></svg></span><div><strong>scikit-learn</strong><small>Classic machine learning</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#EE4C2C" d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z"/></svg></span><div><strong>PyTorch</strong><small>Train deep learning models</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#0194E2" d="M11.883.002a12.044 12.044 0 0 0-9.326 19.463l3.668-2.694A7.573 7.573 0 0 1 12.043 4.45v2.867l6.908-5.14A12.012 12.012 0 0 0 11.883.002zm9.562 4.533L17.777 7.23a7.573 7.573 0 0 1-5.818 12.322v-2.867l-6.908 5.14a12.046 12.046 0 0 0 16.394-17.29z"/></svg></span><div><strong>MLflow</strong><small>Keep track of AI experiments</small></div></div></div></div>
<div className="tg"><div className="tg-head"><h3>Put it live</h3><span>Skill 4 · Deployment Engineering</span></div><div className="tgrid"><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg></span><div><strong>Docker</strong><small>Pack your app so it runs anywhere</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#326CE5" d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z"/></svg></span><div><strong>Kubernetes</strong><small>Run your app for many users</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#2088FF" d="M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.504.504 0 0 1-.354.146zm9.353-.147l1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001zM4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85zm2.03-2.436L4 6.602V3.406l2.557 1.61zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3h-2.08a3.503 3.503 0 0 1-3.46 3 3.502 3.502 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.502 3.502 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.008 5.008 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.482 2.482 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.502 3.502 0 0 1 3.46 3h2.08a3.503 3.503 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5zm-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5zM5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4zm9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm12 0c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3.002c-.007.001-.013.005-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.503 3.503 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5zm-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5z"/></svg></span><div><strong>GitHub Actions</strong><small>Test and release automatically</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#009639" d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm6 16.59c0 .705-.646 1.29-1.529 1.29-.631 0-1.351-.255-1.801-.81l-6-7.141v6.66c0 .721-.57 1.29-1.274 1.29H7.32c-.721 0-1.29-.6-1.29-1.29V7.41c0-.705.63-1.29 1.5-1.29.646 0 1.38.255 1.83.81l5.97 7.141V7.41c0-.721.6-1.29 1.29-1.29h.075c.72 0 1.29.6 1.29 1.29v9.18H18z"/></svg></span><div><strong>Nginx</strong><small>Serve your app to the web</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#4285F4" d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z"/></svg></span><div><strong>Google Cloud</strong><small>Rent servers in the cloud</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#E6522C" d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12zm0 22.46c-1.885 0-3.414-1.26-3.414-2.814h6.828c0 1.553-1.528 2.813-3.414 2.813zm5.64-3.745H6.36v-2.046h11.28v2.046zm-.04-3.098H6.391c-.037-.043-.075-.086-.111-.13-1.155-1.401-1.427-2.133-1.69-2.879-.005-.025 1.4.287 2.395.511 0 0 .513.119 1.262.255-.72-.843-1.147-1.915-1.147-3.01 0-2.406 1.845-4.508 1.18-6.207.648.053 1.34 1.367 1.387 3.422.689-.951.977-2.69.977-3.755 0-1.103.727-2.385 1.454-2.429-.648 1.069.168 1.984.894 4.256.272.854.237 2.29.447 3.201.07-1.892.395-4.652 1.595-5.605-.529 1.2.079 2.702.494 3.424.671 1.164 1.078 2.047 1.078 3.716a4.642 4.642 0 01-1.11 2.996c.792-.149 1.34-.283 1.34-.283l2.573-.502s-.374 1.538-1.81 3.019z"/></svg></span><div><strong>Prometheus</strong><small>Collect health numbers</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#F46800" d="M23.02 10.59a8.578 8.578 0 0 0-.862-3.034 8.911 8.911 0 0 0-1.789-2.445c.337-1.342-.413-2.505-.413-2.505-1.292-.08-2.113.4-2.416.62-.052-.02-.102-.044-.154-.064-.22-.089-.446-.172-.677-.247-.231-.073-.47-.14-.711-.197a9.867 9.867 0 0 0-.875-.161C14.557.753 12.94 0 12.94 0c-1.804 1.145-2.147 2.744-2.147 2.744l-.018.093c-.098.029-.2.057-.298.088-.138.042-.275.094-.413.143-.138.055-.275.107-.41.166a8.869 8.869 0 0 0-1.557.87l-.063-.029c-2.497-.955-4.716.195-4.716.195-.203 2.658.996 4.33 1.235 4.636a11.608 11.608 0 0 0-.607 2.635C1.636 12.677.953 15.014.953 15.014c1.926 2.214 4.171 2.351 4.171 2.351.003-.002.006-.002.006-.005.285.509.615.994.986 1.446.156.19.32.371.488.548-.704 2.009.099 3.68.099 3.68 2.144.08 3.553-.937 3.849-1.173a9.784 9.784 0 0 0 3.164.501h.08l.055-.003.107-.002.103-.005.003.002c1.01 1.44 2.788 1.646 2.788 1.646 1.264-1.332 1.337-2.653 1.337-2.94v-.058c0-.02-.003-.039-.003-.06.265-.187.52-.387.758-.6a7.875 7.875 0 0 0 1.415-1.7c1.43.083 2.437-.885 2.437-.885-.236-1.49-1.085-2.216-1.264-2.354l-.018-.013-.016-.013a.217.217 0 0 1-.031-.02c.008-.092.016-.18.02-.27.011-.162.016-.323.016-.48v-.253l-.005-.098-.008-.135a1.891 1.891 0 0 0-.01-.13c-.003-.042-.008-.083-.013-.125l-.016-.124-.018-.122a6.215 6.215 0 0 0-2.032-3.73 6.015 6.015 0 0 0-3.222-1.46 6.292 6.292 0 0 0-.85-.048l-.107.002h-.063l-.044.003-.104.008a4.777 4.777 0 0 0-3.335 1.695c-.332.4-.592.84-.768 1.297a4.594 4.594 0 0 0-.312 1.817l.003.091c.005.055.007.11.013.164a3.615 3.615 0 0 0 .698 1.82 3.53 3.53 0 0 0 1.827 1.282c.33.098.66.14.971.137.039 0 .078 0 .114-.002l.063-.003c.02 0 .041-.003.062-.003.034-.002.065-.007.099-.01.007 0 .018-.003.028-.003l.031-.005.06-.008a1.18 1.18 0 0 0 .112-.02c.036-.008.072-.013.109-.024a2.634 2.634 0 0 0 .914-.415c.028-.02.056-.041.085-.065a.248.248 0 0 0 .039-.35.244.244 0 0 0-.309-.06l-.078.042c-.09.044-.184.083-.283.116a2.476 2.476 0 0 1-.475.096c-.028.003-.054.006-.083.006l-.083.002c-.026 0-.054 0-.08-.002l-.102-.006h-.012l-.024.006c-.016-.003-.031-.003-.044-.006-.031-.002-.06-.007-.091-.01a2.59 2.59 0 0 1-.724-.213 2.557 2.557 0 0 1-.667-.438 2.52 2.52 0 0 1-.805-1.475 2.306 2.306 0 0 1-.029-.444l.006-.122v-.023l.002-.031c.003-.021.003-.04.005-.06a3.163 3.163 0 0 1 1.352-2.29 3.12 3.12 0 0 1 .937-.43 2.946 2.946 0 0 1 .776-.101h.06l.07.002.045.003h.026l.07.005a4.041 4.041 0 0 1 1.635.49 3.94 3.94 0 0 1 1.602 1.662 3.77 3.77 0 0 1 .397 1.414l.005.076.003.075c.002.026.002.05.002.075 0 .024.003.052 0 .07v.065l-.002.073-.008.174a6.195 6.195 0 0 1-.08.639 5.1 5.1 0 0 1-.267.927 5.31 5.31 0 0 1-.624 1.13 5.052 5.052 0 0 1-3.237 2.014 4.82 4.82 0 0 1-.649.066l-.039.003h-.287a6.607 6.607 0 0 1-1.716-.265 6.776 6.776 0 0 1-3.4-2.274 6.75 6.75 0 0 1-.746-1.15 6.616 6.616 0 0 1-.714-2.596l-.005-.083-.002-.02v-.056l-.003-.073v-.096l-.003-.104v-.07l.003-.163c.008-.22.026-.45.054-.678a8.707 8.707 0 0 1 .28-1.355c.128-.444.286-.872.473-1.277a7.04 7.04 0 0 1 1.456-2.1 5.925 5.925 0 0 1 .953-.763c.169-.111.343-.213.524-.306.089-.05.182-.091.273-.135.047-.02.093-.042.138-.062a7.177 7.177 0 0 1 .714-.267l.145-.045c.049-.015.098-.026.148-.041.098-.029.197-.052.296-.076.049-.013.1-.02.15-.033l.15-.032.151-.028.076-.013.075-.01.153-.024c.057-.01.114-.013.171-.023l.169-.021c.036-.003.073-.008.106-.01l.073-.008.036-.003.042-.002c.057-.003.114-.008.171-.01l.086-.006h.023l.037-.003.145-.007a7.999 7.999 0 0 1 1.708.125 7.917 7.917 0 0 1 2.048.68 8.253 8.253 0 0 1 1.672 1.09l.09.077.089.078c.06.052.114.107.171.159.057.052.112.106.166.16.052.055.107.107.159.164a8.671 8.671 0 0 1 1.41 1.978c.012.026.028.052.04.078l.04.078.075.156c.023.051.05.1.07.153l.065.15a8.848 8.848 0 0 1 .45 1.34.19.19 0 0 0 .201.142.186.186 0 0 0 .172-.184c.01-.246.002-.532-.024-.856z"/></svg></span><div><strong>Grafana</strong><small>Dashboards and alerts</small></div></div></div></div>
<div className="tg"><div className="tg-head"><h3>Work with the client</h3><span>Skill 5 · Client Delivery and Business Consulting</span></div><div className="tgrid"><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#0052CC" d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z"/></svg></span><div><strong>Jira</strong><small>Plan and track the work</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#000000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg></span><div><strong>Notion</strong><small>Write plans and handover notes</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#F24E1E" d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/></svg></span><div><strong>Figma</strong><small>Sketch screens before building</small></div></div></div></div>
<p className="tnote">Tool names and logos belong to their owners and are shown only to say what you will learn. The exact list can change as tools change.</p>
  </div>
</section>

      {/* -------------------------------------------------------------------------
          SECTION 9: INDUSTRY PROJECTS WITH AI DEPLOYMENT
          ------------------------------------------------------------------------- */}
      <section className="industry-projects-section" id="projects" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Real-World Capstones</span>
            <h2>Industry Projects with AI Deployment</h2>
            <p className="lead">
              Industry-focused projects covering data preparation, analysis, modelling, deployment and monitoring. Move beyond toy datasets to build verifiable business assets.
            </p>
          </div>

          <div className="industry-projects-grid">
            <div className="proj-card">
              <span className="proj-badge">Banking &amp; Lending</span>
              <h3>Banking Credit Risk</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Estimate loan-default risk and prioritize collections outreach.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Deployment Component</span>
                <p className="proj-section-text">Prediction API &amp; live model performance monitoring.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">InsurTech</span>
              <h3>Insurance Claims</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Prioritise insurance claims for investigation and identify fraud indicators.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Deployment Component</span>
                <p className="proj-section-text">Scoring application &amp; automated review workflow.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Retail &amp; CPG</span>
              <h3>Retail Demand Forecasting</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Support dynamic stock allocation, seasonal planning, and sales targets.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Deployment Component</span>
                <p className="proj-section-text">Automated forecast pipeline &amp; executive dashboard.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">E-Commerce</span>
              <h3>E-commerce Analytics</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Understand customer browsing patterns, lifetime value, and recommendations.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Deployment Component</span>
                <p className="proj-section-text">Production recommendation service microservice.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Telecommunications</span>
              <h3>Telecom Churn Prediction</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Identify telecom subscribers at risk of leaving to trigger retention incentives.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Deployment Component</span>
                <p className="proj-section-text">Scheduled batch churn-scoring pipeline.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Healthcare</span>
              <h3>Healthcare Operations</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Analyse clinical demand, admission rates, and hospital resource utilisation.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Deployment Component</span>
                <p className="proj-section-text">Interactive dashboard or prediction application.</p>
              </div>
            </div>

            <div className="proj-card">
              <span className="proj-badge">Generative AI</span>
              <h3>GenAI Knowledge Assistant</h3>
              <div className="proj-section">
                <span className="proj-section-label">Business Application</span>
                <p className="proj-section-text">Retrieve verified company information from authorised internal PDF/text documents.</p>
              </div>
              <div className="proj-deploy-box">
                <span className="proj-section-label">Deployment Component</span>
                <p className="proj-section-text">RAG application with evaluation benchmarks &amp; tool access controls.</p>
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
      <section className="career-engine-section" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Proven Methodology</span>
            <h2>Success @ DV Analytics: The 6-Step Career Engine</h2>
            <p className="lead">
              A disciplined, mentor-led pathway ensuring you build skills step by step and present your work with executive confidence.
            </p>
          </div>

          <div className="career-engine-grid">
            <div className="engine-card">
              <span className="engine-step">Step 01</span>
              <h3>Regular Classes</h3>
              <p>Attend consistently, participate actively and review difficult topics. Build deep quantitative understanding step by step with mentors.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 02</span>
              <h3>Hands-on Assignments</h3>
              <p>Practise coding after each module. Use mentor code feedback to correct mistakes and develop independent problem-solving capabilities.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 03</span>
              <h3>Industry Projects</h3>
              <p>Apply learning to realistic business scenarios. Demonstrate data preparation, modelling, evaluation and cloud deployment through documented work.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 04</span>
              <h3>Profile Building</h3>
              <p>Develop a focused resume, LinkedIn profile and public GitHub portfolio. Learn to explain your projects and connect your past domain experience.</p>
            </div>

            <div className="engine-card">
              <span className="engine-step">Step 05</span>
              <h3>AI Integrated Tests &amp; Mock Interviews</h3>
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
          SECTION 11: STUDENT SUCCESS STORIES (PROVEN RESULTS)
          ------------------------------------------------------------------------- */}
      <section className="lp-stories-section" id="stories" aria-label="Student Success Stories">
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: 'center', margin: '0 auto 36px', alignItems: 'center' }}>
            <span className="eyebrow">Proven Results</span>
            <h2>Student Success Stories</h2>
            <p className="lead" style={{ textAlign: 'center' }}>
              Real career transformations from our classroom to industry leaders. Verified placements across premier global tech, banking, and analytics enterprises.
            </p>
          </div>
        </div>

        {/* Seamless Infinite Continuous Marquee Track */}
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
                  title="Click to register for Data Science & AI batch"
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
          SECTION 12: VERIFIED GOOGLE REVIEWS (STUDENT TESTIMONIALS)
          ------------------------------------------------------------------------- */}
      <section className="lp-reviews-section" id="reviews" aria-label="Student Testimonials">
        <div className="wrap">
          <div className="lp-reviews-header-row">
            <div className="sec-head" style={{ margin: 0, maxWidth: '620px' }}>
              <span className="eyebrow">Student Testimonials</span>
              <h2>Verified Google Reviews</h2>
              <p className="lead" style={{ margin: 0 }}>
                Authentic, unedited feedback from our learners. See what students say about our curriculum, mentoring, hands-on projects, and placement support.
              </p>
            </div>

            {/* Rating trust pill and navigation controls */}
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

          {/* Interactive Responsive Grid of 3 Active Review Cards */}
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
          SECTION 13: FREQUENTLY ASKED QUESTIONS (FAQS DIRECT FROM DOCUMENT)
          ------------------------------------------------------------------------- */}
      <section id="faq" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap faq">

          <div className="sec-head">
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2>Data Science with AI Deployment Engineering FAQs</h2>
            <p className="lead">
              Clear, transparent answers directly addressing curriculum, prerequisites, faculty, placement support, and salary benchmarks.
            </p>
          </div>

          {/* FAQ 1: Data Science vs Analytics Comparison Table */}
          <details className="q" open>
            <summary>1. Data Science vs Data Analytics: Which career is better, and why?</summary>
            <div style={{ marginTop: '12px' }}>
              <p>
                Both are valuable careers. The better choice depends on the work you enjoy, your current skills and your willingness to learn programming and mathematics.
              </p>
              <div className="tbl-wrap" style={{ marginTop: '14px', marginBottom: '14px' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Area</th>
                      <th>Data Analytics</th>
                      <th>Data Science &amp; AI Deployment Engineering</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Main focus</strong></td>
                      <td>Analyse data and explain business performance</td>
                      <td>Build predictive models and deploy AI solutions</td>
                    </tr>
                    <tr>
                      <td><strong>Typical work</strong></td>
                      <td>Reports, dashboards, KPI tracking and business insights</td>
                      <td>Prediction, recommendation, AI applications, deployment and monitoring</td>
                    </tr>
                    <tr>
                      <td><strong>Core skills</strong></td>
                      <td>SQL, Excel, Power BI/Tableau and statistics; Python is useful</td>
                      <td>Python, SQL, statistics, ML, AI, data engineering and deployment</td>
                    </tr>
                    <tr>
                      <td><strong>Example</strong></td>
                      <td>Explain why loan defaults increased</td>
                      <td>Build and deploy a model to identify high-risk loan applications</td>
                    </tr>
                    <tr>
                      <td><strong>Learning commitment</strong></td>
                      <td>Usually a more accessible starting point</td>
                      <td>Requires broader technical preparation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Data analytics can suit learners who enjoy business questions, reporting and visualisation. Data science and deployment engineering can suit those who enjoy coding, experimentation and building applications. These fields overlap, and professionals can move between them as their skills develop.
              </p>
            </div>
          </details>

          {/* FAQ 2 */}
          <details className="q">
            <summary>2. Can I learn Data Science &amp; AI Deployment Engineering as a non-technical graduate?</summary>
            <p>
              Yes. Graduates from commerce, management, arts, science and other backgrounds can learn these skills. A suitable learning sequence is: Computer fundamentals → SQL → Python → Data analysis → Statistics → Machine learning → AI applications → Deployment. You do not need to arrive as a programmer. You do need to practise programming, strengthen numerical reasoning and complete projects independently.
            </p>
          </details>

          {/* FAQ 3 */}
          <details className="q">
            <summary>3. How much coding is required?</summary>
            <p>
              Coding is a core part of this programme. You should become comfortable with SQL queries for extracting data, Python for data cleaning and modelling, API development for making models available to applications, and Git and configuration files for deployment workflows. AI coding assistants can help explain errors, but you must understand, test and explain the code you submit.
            </p>
          </details>

          {/* FAQ 4 */}
          <details className="q">
            <summary>4. Is advanced mathematics required?</summary>
            <p>
              You can begin without advanced mathematics, but you must develop the foundations. These include percentages, algebra, probability, descriptive statistics, hypothesis testing and basic linear algebra. The goal is to understand what a method does, when to use it and how to interpret its results.
            </p>
          </details>

          {/* FAQ 5 */}
          <details className="q">
            <summary>5. How soon can I learn this?</summary>
            <p>
              DV’s proposed Data Science &amp; AI Deployment Engineering programme runs for six months of structured learning. Your readiness for employment depends on your practice, project quality and interview preparation. A recommended personal study target is 10–15 hours per week outside regular classes.
            </p>
          </details>

          {/* FAQ 6 */}
          <details className="q">
            <summary>6. Do you guarantee placement?</summary>
            <p>
              Placement support and a guaranteed job are different commitments. DV’s stated offering is 100% placement support under written enrolment terms (profile reviews, mock interviews, assessment practice, and opportunity coordination); it does not mean that every learner is guaranteed an offer. Hiring decisions depend on employers, eligibility, and individual interview performance.
            </p>
          </details>

          {/* FAQ 7 */}
          <details className="q">
            <summary>7. What salary can I expect?</summary>
            <p>
              Salary packages up to ₹40 LPA can be achieved depending on individual technical mastery, problem-solving ability, prior domain experience, and employer evaluation criteria. Packages vary based on location, employer, and demonstrated practical competence.
            </p>
          </details>

          {/* FAQ 8 */}
          <details className="q">
            <summary>8. Who are the faculty members?</summary>
            <p>
              Faculty identified for DV programmes include Dr. Debendra Das (industry experience across organisations including IBM, HP and HSBC) and Dr. Suresh Reddy (ex-Google, associated with GenAI and Agentic AI teaching). Specific faculty assignments and batch teaching schedules are confirmed at enrolment.
            </p>
          </details>

          {/* FAQ 9 */}
          <details className="q">
            <summary>9. What exactly is AI Deployment Engineering?</summary>
            <p>
              AI Deployment Engineering involves making a model or AI application usable in an operational business environment. This involves packaging models into Docker containers, exposing them via high-throughput FastAPI endpoints, releasing to Cloud infrastructure (AWS/Azure/GCP), and establishing 24/7 logging, error tracking, and model drift observability.
            </p>
          </details>

          {/* FAQ 10 */}
          <details className="q">
            <summary>10. What laptop and additional tools will I need?</summary>
            <p>
              A practical starting recommendation is a laptop with 16 GB RAM and SSD storage (Windows, macOS, or Linux), although initial foundational coding exercises can run on lower specifications. Cloud services, IDEs, and browser-based coding environments are supported during training.
            </p>
          </details>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 12: JOIN DV ANALYTICS & WORKING LEAD CAPTURE FORM
          ------------------------------------------------------------------------- */}
      <section className="join" id="join">
        <div className="wrap join-grid">
          <div>
            <span className="eyebrow">Join DV Analytics</span>
            <h2>Learn to become a Data Science &amp; AI Deployment Engineer</h2>
            <p className="lead" style={{ marginTop: '14px' }}>
              DV Analytics trains you to build real AI projects from the client&#39;s first question to a live production system, step by step, with expert mentors.
            </p>

            <ul className="build">
              <li>Take a vague business request and frame high-impact predictive &amp; GenAI solutions</li>
              <li>Build the data pipelines, model training workflows, FastAPI microservices and dashboards</li>
              <li>Package, containerize with Docker, release on Cloud and monitor data drift in production</li>
              <li>Explain and present your end-to-end AI capstone to executive stakeholders in plain words</li>
            </ul>

            <div className="stack">
              <span>Python</span>
              <span>SQL</span>
              <span>PyTorch</span>
              <span>FastAPI</span>
              <span>Docker</span>
              <span>AWS / Cloud</span>
              <span>LangChain</span>
              <span>RAG</span>
            </div>

            <div className="join-direct-contact">
              <p className="join-direct-label">Prefer to speak with an admissions counselor directly?</p>
              <div className="join-contact-links">
                <a href="tel:+918095881188" className="join-contact-pill">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+91 80958 81188</span>
                </a>
                <a href="mailto:info@dvanalyticsmds.com" className="join-contact-pill">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>info@dvanalyticsmds.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* High-Converting Lead Capture Form Card */}
          <div className="join-form-wrapper" id="apids-lead-form">
            {renderLeadForm('Register for APIDS', 'Reserve your seat for the Data Science & AI Deployment batch.')}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          FOOTER
          ------------------------------------------------------------------------- */}
      <footer className="lp-footer">
        <div className="wrap">
          <div className="footer-copyright">
            © {new Date().getFullYear()} DV Analytics. All rights reserved. Data Science &amp; AI Deployment Engineering (APIDS).
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------------------
          MOBILE FLOATING STICKY ACTION BAR
          ------------------------------------------------------------------------- */}
      <div className="mobile-sticky-bar">
        <div className="mobile-actions-grid">
          <a href="tel:+918095881188" className="mobile-btn mobile-call">
            📞 Call Now
          </a>
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
    </div>
  );
};
