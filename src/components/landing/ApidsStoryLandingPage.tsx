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
      techChips: ['SQL Server', 'Python 3.12', 'SAS Studio', 'PostgreSQL', 'NumPy & pandas'],
      topics: [
        'SQL Server Programming: Tables, keys, constraints, filtering, sorting, date/character functions, joins, subqueries, and CTEs',
        'Advanced SQL: Aggregations, window functions, views, stored procedures, data validation, and query performance fundamentals',
        'Python Programming: Variables, conditions, loops, functions, lists, dicts, file handling, and exception handling',
        'Data Manipulation with NumPy & pandas: Missing values, duplicate checks, merging, reshaping, aggregation, and automated cleaning',
        'SAS Studio Programming: DATA steps, PROC SQL, data import/export, conditional logic, summarisation, and reporting fundamentals',
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
                  <small>Learn SQL, SAS and Python. Practise extracting, cleaning, joining and transforming data.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the learner does</h4>
                  <ul className="do">
                    <li>Masters database querying: schema design, constraints, filtering, joins, subqueries, and window functions.</li>
                    <li>Writes clean Python and SAS code: loops, functions, DATA steps, PROC SQL, data structures, and file handling for automated data tasks.</li>
                    <li>Resolves dirty data extracts: handles missing values, duplicates, type mismatches, and automated transformations.</li>
                    <li>Establishes version control hygiene with Git branching and reproducible GitHub repositories.</li>
                  </ul>
                </div>
                <div>
                  <h4>What you achieve</h4>
                  <p>Ability to extract, clean, and deliver an analysis-ready dataset from complex raw sources.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>SQL Server</span>
                    <span>SAS Studio</span>
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
                    <span>Excel Statistics</span>
                    <span>Python Statistics</span>
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
                    <span>LLMOps</span>
                    <span>AIOps</span>
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
                <span className="eyebrow">Why APIDS for You</span>
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

          <div className="stages" style={{ marginTop: '28px' }}>
            <div className="stages-head">
              <span className="steps-title">The 9 Pillars of Curriculum</span>
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
    <div className="tg">
      <div className="tg-head">
        <h3>Working with data and analysis</h3>
        <span>Skill 1 · Programming and Visualization</span>
      </div>
      <div className="tgrid">
        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
            </svg>
          </span>
          <div>
            <strong>Python</strong>
            <small>The main language you code in</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#CC292B" d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.48 8 2s-3.03 2-8 2-8-1.48-8-2 3.03-2 8-2zm8 14c0 .52-3.03 2-8 2s-8-1.48-8-2v-2.22c1.94 1.34 4.86 2.22 8 2.22s6.06-.88 8-2.22V18zm0-4c0 .52-3.03 2-8 2s-8-1.48-8-2v-2.22c1.94 1.34 4.86 2.22 8 2.22s6.06-.88 8-2.22V14zm0-4c0 .52-3.03 2-8 2s-8-1.48-8-2V7.78c1.94 1.34 4.86 2.22 8 2.22s6.06-.88 8-2.22V10z"/>
            </svg>
          </span>
          <div>
            <strong>SQL Server</strong>
            <small>Query enterprise relational databases</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <img src="/tools/sas.png" alt="SAS Studio logo" className="tl-sas" width="34" height="17" loading="lazy" />
          </span>
          <div>
            <strong>SAS Studio</strong>
            <small>Statistical analysis &amp; DATA steps</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <img src="/tools/excel.png" alt="Microsoft Excel logo" width="28" height="28" loading="lazy" />
          </span>
          <div>
            <strong>Excel with AI</strong>
            <small>Pivot modeling, formulas &amp; Copilot</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <img src="/tools/power-bi.svg" alt="Microsoft Power BI logo" width="28" height="28" loading="lazy" />
          </span>
          <div>
            <strong>Power BI</strong>
            <small>Build executive KPI dashboards</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#E97627" d="M11.39 0v2.75h1.22V0h-1.22zm0 21.25V24h1.22v-2.75h-1.22zM21.25 11.39v1.22H24v-1.22h-2.75zM0 11.39v1.22h2.75v-1.22H0zm11.08 4.62v3.08h1.84v-3.08h-1.84zm0-10.78v3.08h1.84V5.23h-1.84zm-5.85 5.85v1.84h3.08v-1.84H5.23zm10.78 0v1.84h3.08v-1.84h-3.08zm-5.08-1.54v4.92h2.16v-4.92h-2.16zm-5.08 7.39v1.54h1.54v-1.54H5.85zm12.3 0v1.54h1.54v-1.54h-1.54zm0-12.3v1.54h1.54V6.46h-1.54zm-12.3 0v1.54h1.54V6.46H5.85z"/>
            </svg>
          </span>
          <div>
            <strong>Tableau</strong>
            <small>Visual analytics &amp; report storytelling</small>
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
            <small>Track every change to your code</small>
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
            <small>Share and review code with a team</small>
          </div>
        </div>
      </div>
    </div>
    <div className="tg">
      <div className="tg-head">
        <h3>Data Mining &amp; AI</h3>
        <span>Skill 2 · Machine Learning, Deep Learning, Gen AI &amp; Agentic AI</span>
      </div>
      <div className="tgrid">
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
            <strong>Statistics</strong>
            <small>Probability, hypothesis testing &amp; distributions</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#F89939" d="M12 2a10 10 0 0 0-7.8 16.2l3.4-3.4A5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 5.4 4.5h4.6A10 10 0 0 0 12 2z" />
              <path fill="#3499CD" d="M12 22a10 10 0 0 0 7.8-16.2l-3.4 3.4A5.5 5.5 0 0 1 12 17.5a5.5 5.5 0 0 1-5.4-4.5H2a10 10 0 0 0 10 9z" />
              <circle cx="12" cy="12" r="2.5" fill="#141A4A" />
            </svg>
          </span>
          <div>
            <strong>Python ML</strong>
            <small>Supervised, unsupervised &amp; predictive models</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#EE4C2C" d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z" />
            </svg>
          </span>
          <div>
            <strong>Python DL</strong>
            <small>Neural networks, PyTorch &amp; deep architectures</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 10h8M8 14h5" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16.5" cy="14" r="1.5" fill="#38BDF8" />
            </svg>
          </span>
          <div>
            <strong>NLP</strong>
            <small>Text mining, sentiment &amp; language models</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" fill="url(#genai-spark-grad)" />
              <circle cx="19" cy="5" r="2" fill="#8B5CF6" />
              <circle cx="5" cy="18" r="1.5" fill="#EC4899" />
              <defs>
                <linearGradient id="genai-spark-grad" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <div>
            <strong>Gen AI &amp; Agentic AI</strong>
            <small>Autonomous agents, workflows &amp; multi-agent systems</small>
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
            <strong>RAG</strong>
            <small>Vector databases, semantic retrieval &amp; grounding</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <rect x="2" y="3" width="20" height="18" rx="4" stroke="#EA580C" strokeWidth="1.8" fill="#FFF7ED" />
              <path d="M6 8l4 4-4 4" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 16h6" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
              <circle cx="17" cy="8" r="1.5" fill="#EA580C" />
              <path d="M19 6l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1z" fill="#F97316" />
            </svg>
          </span>
          <div>
            <strong>Prompt Engineering</strong>
            <small>System prompts, few-shot framing &amp; guardrails</small>
          </div>
        </div>
      </div>
    </div>
    <div className="tg">
      <div className="tg-head">
        <h3>Add AI &amp; MLOps</h3>
        <span>Skill 3 · AI, MLOps and LLMOps</span>
      </div>
      <div className="tgrid">
        <div className="tool">
          <span className="tl" aria-hidden="true">
            <b>AI</b>
          </span>
          <div>
            <strong>OpenAI API</strong>
            <small>Use powerful AI models in your app</small>
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
            <small>Connect AI to your data and tools</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl dk" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#7FC8FF" d="M5 19H10A5 5 0 115 14ZM19 14A5 5 0 1114 19H19ZM10 5A5 5 0 105 10V5ZM19 5V10A5 5 0 1014 5Z" />
            </svg>
          </span>
          <div>
            <strong>LangGraph</strong>
            <small>Plan step-by-step AI workflows</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#FF5A50" d="M12.482.18C7.161 1.319 1.478 9.069 1.426 15.372c-.051 5.527 3.1 8.68 8.68 8.627 6.716-.05 14.259-6.87 12.09-10.9-.672-1.292-1.396-1.344-2.687-.207-1.602 1.395-1.654.31-.207-2.893 1.757-3.98 1.705-5.322-.31-7.544C17.03.388 14.962-.388 12.482.181Zm5.322 2.068c2.273 2.015 2.376 4.236.465 8.42-1.395 3.1-2.17 3.515-3.824 1.86-1.24-1.24-1.343-3.46-.258-6.044 1.137-2.635.982-3.1-.568-1.653-3.72 3.358-6.458 9.765-5.424 12.503.464 1.189.825 1.395 2.737 1.395 2.79 0 6.303-1.705 7.957-3.926 1.756-2.274 2.79-2.274 2.79-.052 0 3.875-6.459 8.627-11.625 8.627-6.251 0-9.351-4.752-7.491-11.47.878-2.995 4.443-7.904 7.077-9.66 3.255-2.17 5.684-2.17 8.164 0z" />
            </svg>
          </span>
          <div>
            <strong>CrewAI</strong>
            <small>Build a team of AI helpers</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl dk" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#FFD21E" d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624" />
            </svg>
          </span>
          <div>
            <strong>Hugging Face</strong>
            <small>Find ready-made AI models</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl dk" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#F7931E" d="M15.601 5.53c-1.91.035-3.981.91-5.63 2.56-2.93 2.93-2.083 8.53-1.088 9.525.805.804 6.595 1.843 9.526-1.088a9.74 9.74 0 0 0 .584-.643c.043-.292.205-.66.489-1.106a1.848 1.848 0 0 1-.537.176c-.144.265-.37.55-.676.855-.354.335-.607.554-.76.656a.795.795 0 0 1-.437.152c-.35 0-.514-.308-.494-.924-.22.316-.425.549-.612.7a.914.914 0 0 1-.578.224c-.194 0-.36-.09-.496-.273a1.03 1.03 0 0 1-.193-.507 4.016 4.016 0 0 1-.726.583c-.224.132-.47.197-.74.197-.3 0-.543-.096-.727-.288a.978.978 0 0 1-.257-.524v.004c-.3.276-.564.48-.79.611a1.295 1.295 0 0 1-.649.197.693.693 0 0 1-.571-.275c-.145-.183-.218-.43-.218-.739 0-.464.101-1.02.302-1.67.201-.65.445-1.25.733-1.797l.842-.312a.21.21 0 0 1 .06-.013c.063 0 .116.047.157.14.04.095.061.221.061.38 0 .451-.104.888-.312 1.31-.207.422-.532.873-.974 1.352-.018.23-.027.388-.027.474 0 .193.036.345.106.458.071.113.165.169.282.169a.71.71 0 0 0 .382-.13c.132-.084.333-.26.602-.523.028-.418.187-.798.482-1.142.324-.38.685-.569 1.08-.569.206 0 .37.054.494.16a.524.524 0 0 1 .186.417c0 .458-.486.829-1.459 1.114.088.43.32.646.693.646a.807.807 0 0 0 .417-.117c.129-.076.321-.243.575-.497.032-.252.118-.495.259-.728.182-.3.416-.544.701-.73.285-.185.537-.278.756-.278.276 0 .47.127.58.381l.677-.374h.186l-.292.971c-.15.488-.226.823-.226 1.004 0 .19.067.285.202.285.086 0 .181-.045.285-.137.104-.092.25-.232.437-.42v.001c.143-.155.274-.32.392-.494-.19-.084-.285-.21-.285-.375 0-.17.058-.352.174-.545.116-.194.275-.29.479-.29.172 0 .258.088.258.265 0 .139-.05.338-.149.596.367-.04.687-.32.961-.842l.228-.01c1.059-2.438.828-5.075-.83-6.732-1.019-1.02-2.408-1.5-3.895-1.471zm4.725 8.203a8.938 8.938 0 0 1-1.333 2.151 1.09 1.09 0 0 0-.012.147c0 .168.047.309.14.423.092.113.206.17.34.17.296 0 .714-.264 1.254-.787-.001.04-.003.08-.003.121 0 .146.012.368.036.666l.733-.172c0-.2.003-.357.01-.474.01-.157.033-.33.066-.517.02-.11.07-.216.152-.315l.186-.216a5.276 5.276 0 0 1 .378-.397c.062-.055.116-.099.162-.13a.26.26 0 0 1 .123-.046c.055 0 .083.035.083.106 0 .07-.052.236-.156.497-.194.486-.292.848-.292 1.084 0 .175.046.314.136.418a.45.45 0 0 0 .358.155c.365 0 .803-.269 1.313-.808v-.381c-.361.426-.623.64-.784.64-.109 0-.163-.067-.163-.2 0-.1.065-.316.195-.65.19-.486.285-.836.285-1.048a.464.464 0 0 0-.112-.319.36.36 0 0 0-.282-.127c-.165 0-.354.077-.567.233-.213.156-.5.436-.863.84.053-.262.165-.622.335-1.08l-.809.156a6.54 6.54 0 0 0-.399 1.074c-.04.156-.07.316-.092.48a7.447 7.447 0 0 1-.49.45.38.38 0 0 1-.229.08.208.208 0 0 1-.174-.082.352.352 0 0 1-.064-.222c0-.1.019-.214.056-.343.038-.13.12-.373.249-.731l.308-.849zm-17.21-2.927c-.863-.016-1.67.263-2.261.854-1.352 1.352-1.07 3.827.631 5.527 1.7 1.701 4.95 1.21 5.527.632.467-.466 1.07-3.827-.631-5.527-.957-.957-2.158-1.465-3.267-1.486zm12.285.358h.166v.21H15.4zm.427 0h.166v.865l.46-.455h.195l-.364.362.428.684h-.198l-.357-.575-.164.166v.41h-.166zm1.016 0h.166v.21h-.166zm.481.122h.166v.288h.172v.135h-.172v.717c0 .037.006.062.02.075.012.013.037.02.074.02a.23.23 0 0 0 .078-.01v.141a.802.802 0 0 1-.136.014.23.23 0 0 1-.15-.043.15.15 0 0 1-.052-.123v-.79h-.141v-.136h.141zm-3.562.258c.081 0 .15.012.207.038.057.024.1.061.13.11s.045.106.045.173h-.176c-.006-.111-.075-.167-.208-.167a.285.285 0 0 0-.164.041.134.134 0 0 0-.06.117c0 .035.015.065.045.088.03.024.08.044.15.06l.16.039a.47.47 0 0 1 .224.105c.047.046.07.108.07.186a.3.3 0 0 1-.052.175.327.327 0 0 1-.152.116.585.585 0 0 1-.226.041c-.136 0-.24-.03-.309-.088-.069-.059-.105-.149-.109-.269h.176c.004.037.01.065.017.084a.166.166 0 0 0 .034.054c.044.043.112.065.204.065a.31.31 0 0 0 .177-.045.139.139 0 0 0 .067-.119.116.116 0 0 0-.038-.09.287.287 0 0 0-.124-.055l-.156-.038a1.248 1.248 0 0 1-.159-.05.359.359 0 0 1-.098-.061.22.22 0 0 1-.058-.083.32.32 0 0 1-.016-.108c0-.096.036-.174.109-.232a.45.45 0 0 1 .29-.087zm1.035 0a.46.46 0 0 1 .202.043.351.351 0 0 1 .187.212.577.577 0 0 1 .023.126h-.168a.256.256 0 0 0-.078-.168.242.242 0 0 0-.17-.06.248.248 0 0 0-.155.05.306.306 0 0 0-.1.144.662.662 0 0 0-.034.224.58.58 0 0 0 .035.214.299.299 0 0 0 .101.135.261.261 0 0 0 .157.048c.142 0 .227-.084.256-.252h.167a.519.519 0 0 1-.065.22.35.35 0 0 1-.146.138.464.464 0 0 1-.216.048.448.448 0 0 1-.246-.066.441.441 0 0 1-.161-.192.703.703 0 0 1-.057-.293c0-.085.01-.163.032-.233a.522.522 0 0 1 .095-.182.403.403 0 0 1 .15-.117.453.453 0 0 1 .191-.04zm.603.03h.166v1.046H15.4zm1.443 0h.166v1.046h-.166zm-5.05.618c-.08 0-.2.204-.356.611-.155.407-.308.977-.459 1.71.281-.312.509-.662.683-1.05.175-.387.262-.72.262-.999a.455.455 0 0 0-.036-.197c-.025-.05-.056-.075-.093-.075zm4.662 1.797c-.221 0-.431.188-.629.563-.197.376-.296.722-.296 1.038 0 .12.029.216.088.29a.273.273 0 0 0 .223.111c.221 0 .43-.188.625-.565.196-.377.294-.725.294-1.043a.457.457 0 0 0-.083-.29.269.269 0 0 0-.222-.104zm-2.848.007c-.146 0-.285.11-.417.333-.133.222-.2.51-.2.866.566-.159.849-.452.849-.881 0-.212-.077-.318-.232-.318Z" />
            </svg>
          </span>
          <div>
            <strong>scikit-learn</strong>
            <small>Classic machine learning</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#EE4C2C" d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z" />
            </svg>
          </span>
          <div>
            <strong>PyTorch</strong>
            <small>Train deep learning models</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#0194E2" d="M11.883.002a12.044 12.044 0 0 0-9.326 19.463l3.668-2.694A7.573 7.573 0 0 1 12.043 4.45v2.867l6.908-5.14A12.012 12.012 0 0 0 11.883.002zm9.562 4.533L17.777 7.23a7.573 7.573 0 0 1-5.818 12.322v-2.867l-6.908 5.14a12.046 12.046 0 0 0 16.394-17.29z" />
            </svg>
          </span>
          <div>
            <strong>MLflow</strong>
            <small>Keep track of AI experiments</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path d="M18.178 8c1.883 0 3.322 1.636 3.322 3.5s-1.44 3.5-3.322 3.5c-1.572 0-2.868-1.144-4.25-2.768L12 10.088l-1.928 2.144C8.69 13.856 7.394 15 5.822 15 3.94 15 2.5 13.364 2.5 11.5S3.94 8 5.822 8c1.572 0 2.868 1.144 4.25 2.768L12 12.912l1.928-2.144C15.31 9.144 16.606 8 18.178 8z" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="11.5" r="1.5" fill="#0EA5E9" />
              <path d="M19 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM8 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#0284C7" />
            </svg>
          </span>
          <div>
            <strong>MLOps</strong>
            <small>Model pipelines, automated retraining &amp; CI/CD</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path d="M18.178 8.5c1.883 0 3.322 1.4 3.322 3s-1.44 3-3.322 3c-1.572 0-2.868-.98-4.25-2.37L12 10.29l-1.928 1.84C8.69 13.52 7.394 14.5 5.822 14.5 3.94 14.5 2.5 13.1 2.5 11.5S3.94 8.5 5.822 8.5c1.572 0 2.868.98 4.25 2.37L12 12.71l1.928-1.84C15.31 9.48 16.606 8.5 18.178 8.5z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 2l1.2 3.3L16.5 6.5l-3.3 1.2L12 11l-1.2-3.3L7.5 6.5l3.3-1.2L12 2z" fill="#D946EF" />
              <circle cx="19" cy="11.5" r="1.25" fill="#8B5CF6" />
              <circle cx="5" cy="11.5" r="1.25" fill="#8B5CF6" />
            </svg>
          </span>
          <div>
            <strong>LLMOps</strong>
            <small>Prompt tracking, eval, guardrails &amp; LLM serving</small>
          </div>
        </div>
      </div>
    </div>
    <div className="tg">
      <div className="tg-head">
        <h3>Put it live</h3>
        <span>Skill 4 · Deployment Engineering</span>
      </div>
      <div className="tgrid">
        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
            </svg>
          </span>
          <div>
            <strong>Docker</strong>
            <small>Pack your app so it runs anywhere</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#326CE5" d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z" />
            </svg>
          </span>
          <div>
            <strong>Kubernetes</strong>
            <small>Run your app for many users</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#2088FF" d="M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.504.504 0 0 1-.354.146zm9.353-.147l1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001zM4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85zm2.03-2.436L4 6.602V3.406l2.557 1.61zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3h-2.08a3.503 3.503 0 0 1-3.46 3 3.502 3.502 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.502 3.502 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.008 5.008 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.482 2.482 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.502 3.502 0 0 1 3.46 3h2.08a3.503 3.503 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5zm-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5zM5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4zm9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm12 0c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3.002c-.007.001-.013.005-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.503 3.503 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5zm-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5z" />
            </svg>
          </span>
          <div>
            <strong>GitHub Actions</strong>
            <small>Test and release automatically</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#009639" d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm6 16.59c0 .705-.646 1.29-1.529 1.29-.631 0-1.351-.255-1.801-.81l-6-7.141v6.66c0 .721-.57 1.29-1.274 1.29H7.32c-.721 0-1.29-.6-1.29-1.29V7.41c0-.705.63-1.29 1.5-1.29.646 0 1.38.255 1.83.81l5.97 7.141V7.41c0-.721.6-1.29 1.29-1.29h.075c.72 0 1.29.6 1.29 1.29v9.18H18z" />
            </svg>
          </span>
          <div>
            <strong>Nginx</strong>
            <small>Serve your app to the web</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <img src="/tools/aws.svg" alt="AWS" className="tl-aws" />
          </span>
          <div>
            <strong>AWS</strong>
            <small>Cloud compute, S3 &amp; scalable infrastructure</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <img src="/tools/azure.svg" alt="Azure" />
          </span>
          <div>
            <strong>Azure</strong>
            <small>Enterprise cloud services &amp; AI hosting</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#4285F4" d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z" />
            </svg>
          </span>
          <div>
            <strong>Google Cloud</strong>
            <small>Rent servers in the cloud</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#E6522C" d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12zm0 22.46c-1.885 0-3.414-1.26-3.414-2.814h6.828c0 1.553-1.528 2.813-3.414 2.813zm5.64-3.745H6.36v-2.046h11.28v2.046zm-.04-3.098H6.391c-.037-.043-.075-.086-.111-.13-1.155-1.401-1.427-2.133-1.69-2.879-.005-.025 1.4.287 2.395.511 0 0 .513.119 1.262.255-.72-.843-1.147-1.915-1.147-3.01 0-2.406 1.845-4.508 1.18-6.207.648.053 1.34 1.367 1.387 3.422.689-.951.977-2.69.977-3.755 0-1.103.727-2.385 1.454-2.429-.648 1.069.168 1.984.894 4.256.272.854.237 2.29.447 3.201.07-1.892.395-4.652 1.595-5.605-.529 1.2.079 2.702.494 3.424.671 1.164 1.078 2.047 1.078 3.716a4.642 4.642 0 01-1.11 2.996c.792-.149 1.34-.283 1.34-.283l2.573-.502s-.374 1.538-1.81 3.019z" />
            </svg>
          </span>
          <div>
            <strong>Prometheus</strong>
            <small>Collect health numbers</small>
          </div>
        </div>

        <div className="tool">
          <span className="tl" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <path fill="#F46800" d="M23.02 10.59a8.578 8.578 0 0 0-.862-3.034 8.911 8.911 0 0 0-1.789-2.445c.337-1.342-.413-2.505-.413-2.505-1.292-.08-2.113.4-2.416.62-.052-.02-.102-.044-.154-.064-.22-.089-.446-.172-.677-.247-.231-.073-.47-.14-.711-.197a9.867 9.867 0 0 0-.875-.161C14.557.753 12.94 0 12.94 0c-1.804 1.145-2.147 2.744-2.147 2.744l-.018.093c-.098.029-.2.057-.298.088-.138.042-.275.094-.413.143-.138.055-.275.107-.41.166a8.869 8.869 0 0 0-1.557.87l-.063-.029c-2.497-.955-4.716.195-4.716.195-.203 2.658.996 4.33 1.235 4.636a11.608 11.608 0 0 0-.607 2.635C1.636 12.677.953 15.014.953 15.014c1.926 2.214 4.171 2.351 4.171 2.351.003-.002.006-.002.006-.005.285.509.615.994.986 1.446.156.19.32.371.488.548-.704 2.009.099 3.68.099 3.68 2.144.08 3.553-.937 3.849-1.173a9.784 9.784 0 0 0 3.164.501h.08l.055-.003.107-.002.103-.005.003.002c1.01 1.44 2.788 1.646 2.788 1.646 1.264-1.332 1.337-2.653 1.337-2.94v-.058c0-.02-.003-.039-.003-.06.265-.187.52-.387.758-.6a7.875 7.875 0 0 0 1.415-1.7c1.43.083 2.437-.885 2.437-.885-.236-1.49-1.085-2.216-1.264-2.354l-.018-.013-.016-.013a.217.217 0 0 1-.031-.02c.008-.092.016-.18.02-.27.011-.162.016-.323.016-.48v-.253l-.005-.098-.008-.135a1.891 1.891 0 0 0-.01-.13c-.003-.042-.008-.083-.013-.125l-.016-.124-.018-.122a6.215 6.215 0 0 0-2.032-3.73 6.015 6.015 0 0 0-3.222-1.46 6.292 6.292 0 0 0-.85-.048l-.107.002h-.063l-.044.003-.104.008a4.777 4.777 0 0 0-3.335 1.695c-.332.4-.592.84-.768 1.297a4.594 4.594 0 0 0-.312 1.817l.003.091c.005.055.007.11.013.164a3.615 3.615 0 0 0 .698 1.82 3.53 3.53 0 0 0 1.827 1.282c.33.098.66.14.971.137.039 0 .078 0 .114-.002l.063-.003c.02 0 .041-.003.062-.003.034-.002.065-.007.099-.01.007 0 .018-.003.028-.003l.031-.005.06-.008a1.18 1.18 0 0 0 .112-.02c.036-.008.072-.013.109-.024a2.634 2.634 0 0 0 .914-.415c.028-.02.056-.041.085-.065a.248.248 0 0 0 .039-.35.244.244 0 0 0-.309-.06l-.078.042c-.09.044-.184.083-.283.116a2.476 2.476 0 0 1-.475.096c-.028.003-.054.006-.083.006l-.083.002c-.026 0-.054 0-.08-.002l-.102-.006h-.012l-.024.006c-.016-.003-.031-.003-.044-.006-.031-.002-.06-.007-.091-.01a2.59 2.59 0 0 1-.724-.213 2.557 2.557 0 0 1-.667-.438 2.52 2.52 0 0 1-.805-1.475 2.306 2.306 0 0 1-.029-.444l.006-.122v-.023l.002-.031c.003-.021.003-.04.005-.06a3.163 3.163 0 0 1 1.352-2.29 3.12 3.12 0 0 1 .937-.43 2.946 2.946 0 0 1 .776-.101h.06l.07.002.045.003h.026l.07.005a4.041 4.041 0 0 1 1.635.49 3.94 3.94 0 0 1 1.602 1.662 3.77 3.77 0 0 1 .397 1.414l.005.076.003.075c.002.026.002.05.002.075 0 .024.003.052 0 .07v.065l-.002.073-.008.174a6.195 6.195 0 0 1-.08.639 5.1 5.1 0 0 1-.267.927 5.31 5.31 0 0 1-.624 1.13 5.052 5.052 0 0 1-3.237 2.014 4.82 4.82 0 0 1-.649.066l-.039.003h-.287a6.607 6.607 0 0 1-1.716-.265 6.776 6.776 0 0 1-3.4-2.274 6.75 6.75 0 0 1-.746-1.15 6.616 6.616 0 0 1-.714-2.596l-.005-.083-.002-.02v-.056l-.003-.073v-.096l-.003-.104v-.07l.003-.163c.008-.22.026-.45.054-.678a8.707 8.707 0 0 1 .28-1.355c.128-.444.286-.872.473-1.277a7.04 7.04 0 0 1 1.456-2.1 5.925 5.925 0 0 1 .953-.763c.169-.111.343-.213.524-.306.089-.05.182-.091.273-.135.047-.02.093-.042.138-.062a7.177 7.177 0 0 1 .714-.267l.145-.045c.049-.015.098-.026.148-.041.098-.029.197-.052.296-.076.049-.013.1-.02.15-.033l.15-.032.151-.028.076-.013.075-.01.153-.024c.057-.01.114-.013.171-.023l.169-.021c.036-.003.073-.008.106-.01l.073-.008.036-.003.042-.002c.057-.003.114-.008.171-.01l.086-.006h.023l.037-.003.145-.007a7.999 7.999 0 0 1 1.708.125 7.917 7.917 0 0 1 2.048.68 8.253 8.253 0 0 1 1.672 1.09l.09.077.089.078c.06.052.114.107.171.159.057.052.112.106.166.16.052.055.107.107.159.164a8.671 8.671 0 0 1 1.41 1.978c.012.026.028.052.04.078l.04.078.075.156c.023.051.05.1.07.153l.065.15a8.848 8.848 0 0 1 .45 1.34.19.19 0 0 0 .201.142.186.186 0 0 0 .172-.184c.01-.246.002-.532-.024-.856z" />
            </svg>
          </span>
          <div>
            <strong>Grafana</strong>
            <small>Dashboards and alerts</small>
          </div>
        </div>
      </div>
    </div>
<div className="tg"><div className="tg-head"><h3>Work with the client</h3><span>Skill 5 · Client Delivery and Business Consulting</span></div><div className="tgrid"><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#0052CC" d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z"/></svg></span><div><strong>Jira</strong><small>Plan and track the work</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#000000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg></span><div><strong>Notion</strong><small>Write plans and handover notes</small></div></div><div className="tool"><span className="tl" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill="#F24E1E" d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/></svg></span><div><strong>Figma</strong><small>Sketch screens before building</small></div></div></div></div>
<p className="tnote">Tool names and logos belong to their owners and are shown only to say what you will learn. The exact list can change as tools change.</p>
  </div>
</section>

      {/* -------------------------------------------------------------------------
          SECTION 9: INDUSTRY PROJECTS WITH END-TO-END AI DEPLOYMENT
          ------------------------------------------------------------------------- */}
      <section className="industry-projects-section" id="projects" style={{ padding: '60px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Real-World Capstones</span>
            <h2>Industry Projects with End-to-End AI Deployment</h2>
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
              <span>SQL Server</span>
              <span>Excel AI</span>
              <span>Power BI</span>
              <span>Tableau</span>
              <span>SAS Studio</span>
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
