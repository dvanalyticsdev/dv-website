import React, { useState, useEffect } from 'react';
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

export interface ApidaStoryLandingPageProps {
  onNavigateHome?: () => void;
}

export const ApidaStoryLandingPage: React.FC<ApidaStoryLandingPageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    state: '',
    course: 'APIDA (Industrial Data Analytics & BI)',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

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
    const el = document.getElementById('apida-lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    }, 800);
  };

  const learningPathModules = [
    {
      id: 1,
      title: 'Data Management & Advanced SQL',
      summary: 'Master relational schema architecture, complex SQL querying, dimensional data warehousing on Snowflake, indexing, and scalable ETL data pipelines.',
      techChips: ['PostgreSQL', 'Advanced SQL', 'Snowflake', 'ETL Pipelines', 'Query Optimization'],
      topics: [
        'Enterprise relational schema design, 3NF normalization, and dimensional star/snowflake modeling',
        'Advanced SQL mastery: Window functions (RANK, DENSE_RANK, LEAD, LAG), CTEs, and nested subqueries',
        'Database indexing strategies, query execution plans, and large-scale performance tuning',
        'Building robust data extraction, cleaning, and transformation (ETL) pipelines with Python & SQL',
        'Connecting cloud data warehouses (Snowflake, Google BigQuery) with enterprise reporting layers',
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
      id: 2,
      title: 'Business Intelligence & Executive Dashboards',
      summary: 'Build high-impact interactive dashboards in Microsoft Power BI and Tableau. Master DAX formulas, Power Query ETL, and executive data storytelling.',
      techChips: ['Power BI', 'DAX Formulas', 'Tableau', 'Power Query', 'Executive Dashboards'],
      topics: [
        'Power BI desktop & service: Data modeling, calculated tables, columns, and relationship cardinality',
        'Advanced DAX: Time intelligence, CALCULATE modifiers, and complex iterator functions (SUMX, AVERAGEX)',
        'Tableau visualization: Level of Detail (LOD) expressions, parameters, sets, and dynamic interactive actions',
        'Executive UI/UX design: Designing C-suite KPI scorecards, mobile layouts, and drill-down interfaces',
        'Automated report scheduling, row-level security (RLS), and corporate workspace governance',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Statistical Analysis & Predictive Modeling',
      summary: 'Move from backward-looking reports to predictive foresight. Use business statistics, hypothesis testing, regression, and time-series forecasting.',
      techChips: ['Python for Analytics', 'Pandas & NumPy', 'Hypothesis Testing', 'Predictive Modeling', 'Time Series'],
      topics: [
        'Descriptive and inferential statistics: Probability distributions, confidence intervals, and p-values',
        'Hypothesis testing in business: A/B testing, ANOVA, Chi-Square, and z-test / t-test validation',
        'Exploratory Data Analysis (EDA): Detecting outliers, data imputations, and feature engineering with Pandas',
        'Predictive regression & classification algorithms with Scikit-learn for churn, lead, and risk scoring',
        'Time series forecasting (ARIMA, Exponential Smoothing, Prophet) for sales and inventory planning',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Industrial & Operational Domain Analytics',
      summary: 'Apply analytics directly to manufacturing, supply chain, retail, energy, and financial operations to eliminate waste and optimize operational throughput.',
      techChips: ['Supply Chain Analytics', 'Manufacturing Yield', 'Inventory Optimization', 'OEE & Downtime', 'Financial Modeling'],
      topics: [
        'Manufacturing analytics: Overall Equipment Effectiveness (OEE), scrap rate reduction, and downtime analysis',
        'Supply chain & logistics: Safety stock calculations, reorder point modeling, lead time variance, and fleet routing',
        'Retail & commercial analytics: Market basket analysis, RFM customer segmentation, and CAC / LTV optimization',
        'Financial & operational KPI modeling: Unit economics, margin waterfall charts, and cost variance analysis',
        'Real-time IoT sensor anomaly detection and production line bottleneck identification',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Business Consulting & Decision Storytelling',
      summary: 'The executive bridge. Transform raw analytical findings into high-stakes boardroom recommendations, strategic action plans, and measurable enterprise ROI.',
      techChips: ['Business Consulting', 'Problem Decomposition', 'Stakeholder Management', 'Executive Demos', 'ROI Measurement'],
      topics: [
        'Problem scoping: Translating ambiguous executive business questions into structured analytical frameworks',
        'Structured problem solving using MECE principles and hypothesis-driven issue trees',
        'Data storytelling: Crafting persuasive executive decks and defending analytical methodologies',
        'Change management & operational runbooks: Ensuring operational teams adopt and act on BI dashboards',
        'Measuring business ROI: Quantifying cost savings, efficiency gains, and bottom-line revenue uplift',
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
            title="Click to register for APIDA"
            onKeyDown={(e) => {
              if (e.key === 'Enter') scrollToForm();
            }}
          >
            <img
              src="/industrial-data-analytics-banner.png"
              alt="Advanced Program in Industrial Data Analytics with Business Intelligence (APIDA) - DV Analytics"
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
          <span className="eyebrow">Industrial Data Analytics &amp; Business Intelligence · APIDA</span>
          <h1>
            Advanced Program in Industrial Data Analytics with Business Intelligence. <em>Drive real enterprise decisions.</em>
          </h1>
          <p className="lead">
            Industrial Data Analytics &amp; Business Intelligence is the critical bridge between massive operational industrial data (manufacturing, supply chain, energy, BFSI, retail) and executive boardroom decisions. Master enterprise SQL, Power BI, Tableau, Python, predictive modeling, and operational KPI optimization to lead high-ROI transformations.
          </p>

          <div className="cta">
            <button type="button" onClick={scrollToForm} className="btn">
              Join DV Analytics to Learn APIDA
            </button>
            <a className="btn ghost" href="#skills">
              See the 5 Skills
            </a>
          </div>

          {/* 4 Clean Inline Program Badges */}
          <div className="hero-stats-row">
            <div className="hero-stat-pill">
              <span className="h-stat-dot"></span>
              <span><b>5–6 Months</b> (Weekday / Weekend)</span>
            </div>
            <div className="hero-stat-pill">
              <span className="h-stat-dot"></span>
              <span><b>100% Live</b> Interactive Mentor-Led Training</span>
            </div>
            <div className="hero-stat-pill">
              <span className="h-stat-dot"></span>
              <span><b>₹7.5–16 LPA</b> High-Demand Salary Range</span>
            </div>
            <div className="hero-stat-pill">
              <span className="h-stat-dot"></span>
              <span><b>LMS Access</b> 24/7 Datasets &amp; Resources</span>
            </div>
          </div>

          {/* Full-Width 5-Step Path Card */}
          <div className="path-card" aria-label="One Industrial Data Analytics Specialist owns the decision intelligence lifecycle">
            <div className="path-top">
              <span>One Project, Start to Finish</span>
              <span>Raw Operational Data → Boardroom Action Plan</span>
            </div>
            <ol className="path">
              <li>
                <b>1. Scope</b>
                <span>Identify operational bottlenecks &amp; executive KPIs.</span>
              </li>
              <li>
                <b>2. Ingest &amp; Model</b>
                <span>Extract enterprise data with SQL, Snowflake &amp; ETL.</span>
              </li>
              <li>
                <b>3. Analyze &amp; Predict</b>
                <span>Run statistical tests, forecasting &amp; anomaly detection.</span>
              </li>
              <li>
                <b>4. BI Dashboards</b>
                <span>Build interactive Power BI &amp; Tableau drilldowns.</span>
              </li>
              <li>
                <b>5. Drive ROI</b>
                <span>Deliver data storytelling &amp; C-suite recommendations.</span>
              </li>
            </ol>
            <div className="path-bracket">
              <strong>The APIDA Specialist owns the full decision intelligence pipeline.</strong>
              <span>Transform complex industrial metrics into clear, high-impact business decisions.</span>
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
                An industry-focused analytics program combining advanced SQL, Power BI, Tableau, Python, and operational modeling to convert complex industrial data into executive decisions.
              </p>
            </article>
            <article>
              <span className="eyebrow">&nbsp;</span>
              <h3>Why is it in demand?</h3>
              <p>
                Modern manufacturing plants, supply chains, logistics networks, and retail giants produce massive data but lack specialists who can translate raw metrics into operational profit.
              </p>
            </article>
            <article>
              <span className="eyebrow">&nbsp;</span>
              <h3>How do I start?</h3>
              <p>
                Master the 5 core pillars, work on real industrial datasets under senior corporate mentors, and build a standout analytics portfolio.{' '}
                <a href="#apida-lead-form" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>
                  Join DV Analytics
                </a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 3: WHAT IS AN APIDA SPECIALIST (7-STAGE INTERACTIVE ACCORDION)
          ------------------------------------------------------------------------- */}
      <section className="what" id="what-is-apida">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What is an APIDA Specialist</span>
            <h2>An Industrial Data Analytics Specialist bridges the shop-floor to the boardroom</h2>
          </div>
          <div className="what-text">
            <p className="def">
              An Industrial Data Analytics &amp; Business Intelligence Specialist works directly with operational leadership. They identify root-cause inefficiencies in supply chain, manufacturing, and retail, model the data in enterprise warehouses, and deploy live executive dashboards.
            </p>
            <p>
              &quot;Industrial analytics&quot; means solving high-stakes physical and financial operational bottlenecks—such as plant downtime, logistics delays, inventory holding costs, and customer churn—rather than generating static backward-looking slides.
            </p>
            <p>
              Think of a generic report and an executive flight deck. A spreadsheet operator builds manual tables with last month&#39;s numbers. An APIDA specialist builds an interactive real-time cockpit that predicts problems before they cost money.
            </p>
          </div>

          <div className="example">
            <span className="eyebrow">An illustrative industry scenario, step by step</span>
            <h3>An automotive parts manufacturer facing ₹1.2 Cr in quarterly assembly downtime</h3>
            <p>
              Management assumes the plant needs &quot;new machines&quot;. The APIDA specialist analyzes machine IoT telemetry, maintenance logs, and shift rosters, discovering that 80% of halts are triggered by micro-vibrations in three specific feeder lines that lack automated preventative alerts.
            </p>
          </div>

          <div className="stages">
            <div className="stages-head">
              <span className="steps-title">The 7 stages of an industrial analytics project</span>
              <span className="hint">Tap a stage to open details</span>
            </div>

            <details className="stage" name="stages" open>
              <summary>
                <span className="sn">1</span>
                <span className="st">
                  <b>Discover &amp; Scope Operational KPIs</b>
                  <small>Sit with plant managers, supply chain heads, and finance leads.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the Analyst does</h4>
                  <ul className="do">
                    <li>Meets plant supervisors, supply chain directors, and operations managers on-site.</li>
                    <li>Discovers the real cost drivers: unplanned line stoppages and excess safety stock.</li>
                    <li>Agrees on one clear metric: improve Overall Equipment Effectiveness (OEE) by 14%.</li>
                    <li>Creates a project scope document with agreed metric formulas and data owners.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A crystal-clear definition of the operational problem and an agreed financial target.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Business Consulting</span>
                    <span>Problem Framing</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">2</span>
                <span className="st">
                  <b>Enterprise Data &amp; ERP Audit</b>
                  <small>Inspect ERP records (SAP/Oracle), SQL databases, and IoT logs.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the Analyst does</h4>
                  <ul className="do">
                    <li>Connects to SAP ERP, maintenance logs, and live machine sensor feeds.</li>
                    <li>Finds sensor timestamps are misaligned across 3 manufacturing shifts.</li>
                    <li>Builds data validation rules in SQL and Python to clean corrupt telemetry.</li>
                    <li>Confirms the dataset provides statistically significant baseline data for modeling.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A verified data dictionary, quality audit report, and clean unified data tables.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Advanced SQL</span>
                    <span>Python &amp; Pandas</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">3</span>
                <span className="st">
                  <b>Dimensional Data Warehouse Modeling</b>
                  <small>Architect star and snowflake schemas in Snowflake / PostgreSQL.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the Analyst does</h4>
                  <ul className="do">
                    <li>Designs central Fact tables for production runs, downtime events, and energy usage.</li>
                    <li>Builds supporting Dimension tables for plant lines, shifts, operators, and machine models.</li>
                    <li>Automates daily extraction and transformations with SQL CTEs and indexing.</li>
                    <li>Optimizes query plans so dashboard queries return in milliseconds across millions of rows.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A scalable, high-performance dimensional data warehouse ready for live BI connections.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Snowflake</span>
                    <span>Data Warehousing</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">4</span>
                <span className="st">
                  <b>Statistical Modeling &amp; Predictive Forecasting</b>
                  <small>Detect anomaly patterns and forecast inventory and downtime risk.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the Analyst does</h4>
                  <ul className="do">
                    <li>Runs hypothesis testing and correlation analysis between machine temperature and downtime.</li>
                    <li>Builds predictive classification models in Scikit-learn to flag high-risk machines.</li>
                    <li>Implements time-series forecasting (ARIMA / Prophet) for supply chain reorder cycles.</li>
                    <li>Validates predictive accuracy against holdout data and calculates financial risk scores.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>Predictive insight models that foresee machine failures 72 hours before they occur.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Predictive Modeling</span>
                    <span>Time Series</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">5</span>
                <span className="st">
                  <b>Executive BI Dashboards (Power BI &amp; Tableau)</b>
                  <small>Craft interactive drill-down scorecards with custom DAX calculations.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the Analyst does</h4>
                  <ul className="do">
                    <li>Builds intuitive Power BI &amp; Tableau dashboards tailored to executive and shift users.</li>
                    <li>Writes advanced DAX time-intelligence formulas (YTD, MoM, rolling 30-day averages).</li>
                    <li>Creates visual drill-downs: from overall company profit down to individual machine cells.</li>
                    <li>Incorporates user feedback from plant supervisors to streamline the layout.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>An interactive, beautiful executive cockpit displaying real-time operational metrics.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Power BI &amp; DAX</span>
                    <span>Tableau</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">6</span>
                <span className="st">
                  <b>Automate Scheduled Refresh &amp; Alerting</b>
                  <small>Deploy to Power BI Service, configure Row-Level Security and alerts.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the Analyst does</h4>
                  <ul className="do">
                    <li>Publishes dashboards to corporate Power BI Service with automated daily/hourly refresh.</li>
                    <li>Configures Row-Level Security (RLS) so managers see only their respective departments.</li>
                    <li>Sets up automated email and Teams alerts when critical downtime thresholds are breached.</li>
                    <li>Monitors ETL execution logs and data drift to ensure uninterrupted dashboard reliability.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A fully automated, zero-touch reporting portal that alerts teams before losses accumulate.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Power BI Service</span>
                    <span>Automation</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">7</span>
                <span className="st">
                  <b>Executive Delivery &amp; Measurable ROI</b>
                  <small>Present business ROI to board members and train operational staff.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the Analyst does</h4>
                  <ul className="do">
                    <li>Presents analytical findings and financial impact to the CEO and Board of Directors.</li>
                    <li>Demonstrates a verified ₹46 Lakh savings achieved in the first 60 days of deployment.</li>
                    <li>Writes an operational dashboard user manual and trains 35 floor managers.</li>
                    <li>Establishes an ongoing quarterly review cadence to continuously enhance analytics.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>Proven financial return on investment, empowered managers, and data-driven corporate culture.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Executive Storytelling</span>
                    <span>Decision Intelligence</span>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 4: WHY COMPANIES ARE HIRING APIDA SPECIALISTS
          ------------------------------------------------------------------------- */}
      <section id="why-fde">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Why APIDA in 2026</span>
            <h2>Why companies are hiring Industrial Data Analytics Specialists</h2>
            <p className="lead">
              Every major enterprise is modernizing. Manual spreadsheets and gut-feeling decisions are being replaced by automated Business Intelligence and real-time operational analytics.
            </p>
          </div>
          <div className="why-grid">
            <article className="why-card">
              <h3>Move beyond static Excel sheets</h3>
              <p>Manual spreadsheets cannot scale to millions of sensor readings or enterprise ERP databases. Organizations demand automated, live BI pipelines with real-time refresh.</p>
            </article>
            <article className="why-card">
              <h3>Massive industrial data growth</h3>
              <p>Factories, logistics fleets, smart grids, and e-commerce warehouses generate petabytes of data daily. Companies need analysts who understand domain context and operational mechanics.</p>
            </article>
            <article className="why-card">
              <h3>Direct C-suite visibility &amp; influence</h3>
              <p>As an APIDA specialist, your dashboards and predictive forecasts are reviewed directly by Vice Presidents, Directors, and Managing Directors to make multi-crore capital decisions.</p>
            </article>
          </div>

          <div className="vs">
            <div className="vs-box then">
              <span className="eyebrow">Earlier</span>
              <h3>Manual MIS &amp; Static Excel Reporting</h3>
              <ul>
                <li>Manual copy-pasting across disparate Excel workbooks</li>
                <li>Reports delivered days after month-end closing</li>
                <li>Descriptive only: explains what happened in the past</li>
                <li>High risk of human formula errors and version confusion</li>
                <li>No connection to cloud databases or predictive models</li>
              </ul>
            </div>
            <div className="vs-box now">
              <span className="eyebrow">Now</span>
              <h3>Modern Industrial Data Analytics &amp; BI (APIDA)</h3>
              <ul>
                <li>Automated SQL pipelines connecting cloud data warehouses</li>
                <li>Live interactive Power BI &amp; Tableau dashboards updated hourly</li>
                <li>Predictive &amp; Prescriptive: forecasts demand &amp; suggests optimal actions</li>
                <li>Direct executive impact, scalable automation, and top-tier compensation</li>
                <li>One analyst who owns the full decision intelligence pipeline</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 5: WHY HUMAN ANALYSTS REMAIN INDISPENSABLE
          ------------------------------------------------------------------------- */}
      <section className="ai" id="ai-cannot-replace">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Career Longevity</span>
            <h2>Why AI complements — and cannot replace — the APIDA Specialist</h2>
            <p className="lead">
              AI tools generate syntax and code snippets, but they lack shop-floor domain context, business judgment, and stakeholder accountability.
            </p>
          </div>

          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Analytical Dimension</th>
                  <th>What AI Does</th>
                  <th>What the Human APIDA Specialist Delivers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Operational Domain Context</td>
                  <td>Generates generic formulas without knowledge of real plant constraints.</td>
                  <td>Understands machine calibration limits, shift schedules, vendor contracts, and physical factory realities.</td>
                </tr>
                <tr>
                  <td>2. Data Quality &amp; Audit</td>
                  <td>Blindly computes averages even when sensor logs have corrupt dropouts.</td>
                  <td>Audits sensor reliability, handles missing data responsibly, and verifies data integrity with plant supervisors.</td>
                </tr>
                <tr>
                  <td>3. Dashboard UX &amp; Decision Framing</td>
                  <td>Outputs cluttered charts that confuse busy executives.</td>
                  <td>Crafts clean, intuitive visual hierarchies that highlight urgent outliers, root causes, and recommended actions.</td>
                </tr>
                <tr>
                  <td>4. Strategic Problem Solving</td>
                  <td>Answers only what is explicitly typed into a prompt box.</td>
                  <td>Discovers hidden operational bottlenecks, identifies cross-departmental waste, and formulates high-ROI questions.</td>
                </tr>
                <tr>
                  <td>5. Trust &amp; Executive Ownership</td>
                  <td>Cannot defend assumptions or take responsibility for forecasts.</td>
                  <td>Stands in front of the board of directors, explains trade-offs, defends methodologies, and owns analytical outcomes.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="four">
            <h3>The Barbell Theory of Analytical Careers</h3>
            <p className="sub">
              AI automates routine formula lookup. Value concentrates in two places: understanding the business operations on the left, and deploying live decision dashboards on the right.
            </p>
            <div className="parts">
              <div className="part">
                <span className="tag w">High Risk</span>
                <b>Spreadsheet Typist</b>
                <span className="d">Manually copies cells and formats tables without understanding the underlying business.</span>
                <div className="meter s1">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="part">
                <span className="tag m">Medium Risk</span>
                <b>Pure SQL Writer</b>
                <span className="d">Writes queries from tickets without knowing how data impacts factory or customer metrics.</span>
                <div className="meter s2">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="part">
                <span className="tag m">Medium Risk</span>
                <b>Academic Statistician</b>
                <span className="d">Builds complex formulas in notebooks that operational managers cannot read or execute.</span>
                <div className="meter s2">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="part">
                <span className="tag s">Most Resilient</span>
                <b>Industrial BI Specialist</b>
                <span className="d">Bridges physical operations, enterprise data warehouses, and executive boardroom decisions.</span>
                <div className="meter s3">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>

          <div className="pull">
            &quot;AI can calculate numbers. It cannot understand plant floor realities, look executives in the eye, and <span>take responsibility for strategic decisions.</span>&quot;
          </div>
          <div className="note">
            The most future-proof career strategy in analytics is blending advanced technical data skills with real industrial domain acumen. That is exactly what APIDA delivers.
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 6: THE 5 SKILLS (MATCHING PILLARS & SPLIT WORK BREAKDOWN)
          ------------------------------------------------------------------------- */}
      <section id="skills">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Skills</span>
            <h2>The 5 skills that make up an Industrial Data Analytics Specialist</h2>
            <p className="lead">
              You do not need to master everything first. You learn the skills step by step, then combine them on real industrial capstone projects.
            </p>
          </div>

          <div className="pillars">
            <article
              className="pillar"
              onClick={() => setSelectedModule(1)}
              role="button"
              tabIndex={0}
              title="Click to view detailed syllabus"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedModule(1);
              }}
            >
              <span className="n">1 · START HERE</span>
              <h3>Data Management &amp; SQL</h3>
              <p>Master relational schema design, PostgreSQL, Snowflake, and automated ETL pipelines.</p>
              <ul className="can">
                <li>Write complex SQL queries &amp; CTEs</li>
                <li>Design dimensional star schemas</li>
                <li>Connect cloud data warehouses</li>
              </ul>
            </article>

            <article
              className="pillar"
              onClick={() => setSelectedModule(2)}
              role="button"
              tabIndex={0}
              title="Click to view detailed syllabus"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedModule(2);
              }}
            >
              <span className="n">2</span>
              <h3>Business Intelligence &amp; BI</h3>
              <p>Build executive scorecards and drill-down dashboards in Power BI and Tableau.</p>
              <ul className="can">
                <li>Write advanced DAX calculations</li>
                <li>Build interactive Tableau reports</li>
                <li>Deploy to Power BI Service</li>
              </ul>
            </article>

            <article
              className="pillar"
              onClick={() => setSelectedModule(3)}
              role="button"
              tabIndex={0}
              title="Click to view detailed syllabus"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedModule(3);
              }}
            >
              <span className="n">3</span>
              <h3>Statistical &amp; Predictive Analytics</h3>
              <p>Go beyond backward-looking charts. Use statistics and Python to forecast trends.</p>
              <ul className="can">
                <li>Conduct business hypothesis tests</li>
                <li>Train predictive regression models</li>
                <li>Forecast demand with time-series</li>
              </ul>
            </article>

            <article
              className="pillar"
              onClick={() => setSelectedModule(4)}
              role="button"
              tabIndex={0}
              title="Click to view detailed syllabus"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedModule(4);
              }}
            >
              <span className="n">4</span>
              <h3>Industrial Domain Analytics</h3>
              <p>Apply data to manufacturing, supply chain, inventory, and financial operations.</p>
              <ul className="can">
                <li>Calculate Overall Equipment Effectiveness</li>
                <li>Optimize inventory safety stocks</li>
                <li>Diagnose operational bottlenecks</li>
              </ul>
            </article>

            <article
              className="pillar key"
              onClick={() => setSelectedModule(5)}
              role="button"
              tabIndex={0}
              title="Click to view detailed syllabus"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedModule(5);
              }}
            >
              <span className="n">5 · FROM DAY ONE</span>
              <h3>Consulting &amp; Decision Storytelling</h3>
              <p>Understand people, business objectives, and how to deliver measurable ROI to leadership.</p>
              <ul className="can">
                <li>Deconstruct business bottlenecks</li>
                <li>Present persuasive executive decks</li>
                <li>Quantify bottom-line financial ROI</li>
              </ul>
            </article>
          </div>

          <div className="split">
            <div>
              <span className="eyebrow">Work Breakdown</span>
              <h3>How much of the job is dashboards?</h3>
              <p className="legend" style={{ marginTop: '8px' }}>
                Dashboards are the final face, but high compensation comes from the full pipeline:
              </p>
              <div className="bar" role="img" aria-label="50% BI & Dashboards, 30% SQL & Data, 20% Predictive & Consulting">
                <div className="b1">50%<span className="bar-tag"> BI</span></div>
                <div className="b2">30%<span className="bar-tag"> Data</span></div>
                <div className="b3">20%<span className="bar-tag"> Strategy</span></div>
              </div>
              <div className="legend">
                <div><b>50% BI &amp; Dashboards:</b> Power BI, DAX, Tableau, Excel, and visual data storytelling.</div>
                <div><b>30% SQL &amp; Data Warehouses:</b> PostgreSQL, Snowflake, dimensional schema modeling, and ETL.</div>
                <div><b>20% Predictive &amp; Strategy:</b> Statistical forecasting, domain metrics, and C-suite consulting.</div>
              </div>
            </div>

            <div>
              <span className="eyebrow">Learning Sequence</span>
              <h3>In what order should you learn?</h3>
              <ol className="order" style={{ marginTop: '14px' }}>
                <li data-n="1">
                  <div><b>Data Management &amp; SQL:</b> Master database architecture, queries, and ETL pipelines.</div>
                </li>
                <li data-n="2">
                  <div><b>Business Intelligence:</b> Build real-time interactive Power BI and Tableau dashboards.</div>
                </li>
                <li data-n="3">
                  <div><b>Statistical Modeling:</b> Run exploratory analysis, hypothesis tests, and time-series forecasts.</div>
                </li>
                <li data-n="4">
                  <div><b>Operational Analytics:</b> Solve supply chain, plant yield, and inventory challenges.</div>
                </li>
                <li data-n="5">
                  <div><b>Executive Storytelling:</b> Frame ROI, deliver board presentations, and drive adoption.</div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 7: COMPLETE INDUSTRIAL ANALYTICS TOOLS WITH SVG LOGOS
          ------------------------------------------------------------------------- */}
      <section className="tools" id="tools">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Tools you will learn</span>
            <h2>The tools an Industrial Data Analytics Specialist uses every day</h2>
            <p className="lead">You do not need to know any of these today. You pick them up step by step, one project at a time. Each tool is here because real companies use it.</p>
          </div>

          {/* Group 1: Enterprise Data & SQL */}
          <div className="tg">
            <div className="tg-head">
              <h3>Work with data &amp; SQL</h3>
              <span>Skill 1 · Data Management &amp; Advanced SQL</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#4169E1" d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698z" />
                  </svg>
                </span>
                <div><strong>PostgreSQL &amp; SQL</strong><small>Complex joins, CTEs, and window functions</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#29B5E8" d="M12 0l1.24 3.73h3.93l-3.18 2.31 1.22 3.73-3.21-2.33-3.21 2.33 1.22-3.73-3.18-2.31h3.93L12 0zm0 14.23l-1.24 3.73H6.83l3.18 2.31-1.22 3.73 3.21-2.33 3.21 2.33-1.22-3.73 3.18-2.31h-3.93L12 24l-1.24-3.73h-3.93l3.18-2.31-1.22-3.73 3.21-2.33 3.21-2.33-1.22 3.73 3.18 2.31h-3.93L12 14.23zM0 12l3.73-1.24V6.83l2.31 3.18 3.73-1.22-2.33 3.21 2.33 3.21-3.73-1.22-2.31 3.18v-3.93L0 12zm24 0l-3.73 1.24v3.93l-2.31-3.18-3.73 1.22 2.33-3.21-2.33-3.21 3.73 1.22 2.31-3.18v3.93L24 12z" />
                  </svg>
                </span>
                <div><strong>Snowflake</strong><small>Cloud data warehousing at enterprise scale</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                  </svg>
                </span>
                <div><strong>Python 3.12</strong><small>Automate ETL pipelines and data transformations</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#150458" d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.455zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67Z" />
                  </svg>
                </span>
                <div><strong>Pandas &amp; DuckDB</strong><small>In-memory analytics on massive tabular files</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F03C2E" d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z" />
                  </svg>
                </span>
                <div><strong>Git</strong><small>Track every version of analysis queries</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </span>
                <div><strong>GitHub</strong><small>Host analytics repositories and data portfolios</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FCC624" d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2z" />
                  </svg>
                </span>
                <div><strong>Linux &amp; Bash</strong><small>Server administration and automated scripts</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F37626" d="M7.157 22.201A1.784 1.799 0 0 1 5.374 24a1.784 1.799 0 0 1-1.784-1.799 1.784 1.799 0 0 1 1.784-1.799 1.784 1.799 0 0 1 1.783 1.799zM20.582 1.427a1.415 1.427 0 0 1-1.415 1.428 1.415 1.427 0 0 1-1.416-1.428A1.415 1.427 0 0 1 19.167 0a1.415 1.427 0 0 1 1.415 1.427zM4.992 3.336A1.047 1.056 0 0 1 3.946 4.39a1.047 1.056 0 0 1-1.047-1.055A1.047 1.056 0 0 1 3.946 2.28a1.047 1.056 0 0 1 1.046 1.056zm7.336 1.517c3.769 0 7.06 1.38 8.768 3.424a9.363 9.363 0 0 0-3.393-4.547 9.238 9.238 0 0 0-5.377-1.728A9.238 9.238 0 0 0 6.95 3.73a9.363 9.363 0 0 0-3.394 4.547c1.713-2.04 5.004-3.424 8.772-3.424zm.001 13.295c-3.768 0-7.06-1.381-8.768-3.425a9.363 9.363 0 0 0 3.394 4.547A9.238 9.238 0 0 0 12.33 21a9.238 9.238 0 0 0 5.377-1.729 9.363 9.363 0 0 0 3.393-4.547c-1.712 2.044-5.003 3.425-8.772 3.425Z" />
                  </svg>
                </span>
                <div><strong>JupyterLab</strong><small>Exploratory data analysis &amp; visualization</small></div>
              </div>
            </div>
          </div>

          {/* Group 2: Business Intelligence & Dashboards */}
          <div className="tg">
            <div className="tg-head">
              <h3>Build BI dashboards</h3>
              <span>Skill 2 · Business Intelligence &amp; Executive Reporting</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F2C811" d="M12 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4zm6 6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h4zM6 13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h4zm18 3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4z" />
                  </svg>
                </span>
                <div><strong>Microsoft Power BI</strong><small>DAX formulas, Power Query &amp; scorecards</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#E97627" d="M11.39 0v2.75h1.22V0h-1.22zm0 21.25V24h1.22v-2.75h-1.22zM21.25 11.39v1.22H24v-1.22h-2.75zM0 11.39v1.22h2.75v-1.22H0zm11.08 4.62v3.08h1.84v-3.08h-1.84zm0-10.78v3.08h1.84V5.23h-1.84zm-5.85 5.85v1.84h3.08v-1.84H5.23zm10.78 0v1.84h3.08v-1.84h-3.08zm-5.08-1.54v4.92h2.16v-4.92h-2.16zm-5.08 7.39v1.54h1.54v-1.54H5.85zm12.3 0v1.54h1.54v-1.54h-1.54zm0-12.3v1.54h1.54V6.46h-1.54zm-12.3 0v1.54h1.54V6.46H5.85z" />
                  </svg>
                </span>
                <div><strong>Tableau Desktop</strong><small>LOD calculations and dynamic visual actions</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#21A366" d="M21.5 2h-13A1.5 1.5 0 0 0 7 3.5V6H3.5A1.5 1.5 0 0 0 2 7.5v9A1.5 1.5 0 0 0 3.5 18H7v2.5A1.5 1.5 0 0 0 8.5 22h13a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 21.5 2zM7 16H3.5a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5H7v10zm14 4.5a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5V18h3.5a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 11.5 6H8V3.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5v17zM4.7 9.8l1.6 2.4-1.6 2.4h1.4l.9-1.5.9 1.5h1.4l-1.6-2.4 1.6-2.4H9.3l-.9 1.5-.9-1.5H4.7z" />
                  </svg>
                </span>
                <div><strong>Advanced Excel &amp; VBA</strong><small>Power Pivot, index-match &amp; data modeling</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#4285F4" d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3zm-9 14H7v-4h3.5v4zm4.5 0h-3.5V7h3.5v10zm4.5 0h-3.5v-7H19.5v7z" />
                  </svg>
                </span>
                <div><strong>Looker Studio</strong><small>Fast corporate reporting and cloud dashboards</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FF4B4B" d="M16.673 11.32l6.862-3.618c.233-.136.554.12.442.387L20.463 17.1zm-8.556-.229l3.473-5.187c.203-.328.578-.316.793-.028l7.886 11.75zm-3.375 7.25c-.28 0-.835-.284-.993-.716l-3.72-9.46c-.118-.331.139-.614.48-.464l19.474 10.306c-.149.147-.453.337-.72.334z" />
                  </svg>
                </span>
                <div><strong>Streamlit</strong><small>Rapid web apps for interactive simulation</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#61DAFB" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z" />
                  </svg>
                </span>
                <div><strong>Web Embeds &amp; React</strong><small>Embed live reports into internal portals</small></div>
              </div>
            </div>
          </div>

          {/* Group 3: Statistical Modeling & Predictive Analytics */}
          <div className="tg">
            <div className="tg-head">
              <h3>Analyze &amp; predict</h3>
              <span>Skill 3 · Statistical Analysis &amp; Predictive Analytics</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F7931E" d="M15.601 5.53c-1.91.035-3.981.91-5.63 2.56-2.93 2.93-2.083 8.53-1.088 9.525.805.804 6.595 1.843 9.526-1.088a9.74 9.74 0 0 0 .584-.643c.043-.292.205-.66.489-1.106a1.848 1.848 0 0 1-.537.176c-.144.265-.37.55-.676.855-.354.335-.607.554-.76.656a.795.795 0 0 1-.437.152c-.35 0-.514-.308-.494-.924-.22.316-.425.549-.612.7a.914.914 0 0 1-.578.224c-.194 0-.36-.09-.496-.273a1.03 1.03 0 0 1-.193-.507 4.016 4.016 0 0 1-.726.583c-.224.132-.47.197-.74.197-.3 0-.543-.096-.727-.288a.978.978 0 0 1-.257-.524v.004c-.3.276-.564.48-.79.611a1.295 1.295 0 0 1-.649.197.693.693 0 0 1-.571-.275c-.145-.183-.218-.43-.218-.739 0-.464.101-1.02.302-1.67.201-.65.445-1.25.733-1.797l.842-.312" />
                  </svg>
                </span>
                <div><strong>scikit-learn</strong><small>Predictive machine learning &amp; clustering</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#4169E1" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </span>
                <div><strong>Statsmodels &amp; ARIMA</strong><small>Time-series forecasting and hypothesis tests</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#0194E2" d="M11.883.002a12.044 12.044 0 0 0-9.326 19.463l3.668-2.694A7.573 7.573 0 0 1 12.043 4.45v2.867l6.908-5.14A12.012 12.012 0 0 0 11.883.002zm9.562 4.533L17.777 7.23a7.573 7.573 0 0 1-5.818 12.322v-2.867l-6.908 5.14a12.046 12.046 0 0 0 16.394-17.29z" />
                  </svg>
                </span>
                <div><strong>NumPy &amp; SciPy</strong><small>Numerical computing and matrix operations</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true"><b>AI</b></span>
                <div><strong>OpenAI for Analytics</strong><small>Automate executive summaries with GenAI</small></div>
              </div>
            </div>
          </div>

          {/* Group 4: Industrial Pipelines & Cloud */}
          <div className="tg">
            <div className="tg-head">
              <h3>Automate &amp; deploy</h3>
              <span>Skill 4 · Industrial Pipelines &amp; Cloud Telemetry</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FF694B" d="M11.96 0L1.75 6.01v11.98l10.21 6.01 10.29-6.01V6.01L11.96 0zm-1.12 3.14l7.65 4.5-3.32 1.95-7.65-4.5 3.32-1.95zm-6.72 4.41l7.65 4.5v3.91l-7.65-4.5V7.55zm8.96 13.31v-3.91l7.65-4.5v3.91l-7.65 4.5z" />
                  </svg>
                </span>
                <div><strong>dbt (Data Build Tool)</strong><small>Transform and test SQL models in warehouse</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#017CEE" d="M17.195 16.822l4.002-4.102C23.55 10.308 23.934 5.154 24 .43a.396.396 0 0 0-.246-.373.392.392 0 0 0-.437.09l-6.495 6.658-4.102-4.003C10.309.45 5.154.066.43 0H.423a.397.397 0 0 0-.277.683l6.658 6.494-4.003 4.103C.45 13.692.065 18.846 0 23.57a.398.398 0 0 0 .683.282l6.494-6.657 3.934 3.837.17.165c2.41 2.353 7.565 2.737 12.288 2.803h.006a.397.397 0 0 0 .277-.683l-6.657-6.495z" />
                  </svg>
                </span>
                <div><strong>Apache Airflow</strong><small>Orchestrate daily automated ETL batch pipelines</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186" />
                  </svg>
                </span>
                <div><strong>Docker</strong><small>Containerize analytics &amp; reporting environments</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FF9900" d="M12.91 16.482c-2.316 0-4.062-.832-5.184-2.476-.23-.338-.077-.732.32-.732.185 0 .346.092.461.246.907 1.23 2.37 1.83 4.403 1.83 2.032 0 3.325-.523 3.325-1.508 0-.892-.846-1.292-2.832-1.63-2.617-.462-4.757-1.14-4.757-3.418 0-2.062 1.955-3.325 4.71-3.325 2.016 0 3.633.677 4.603 2.016.2.277.062.647-.277.647-.17 0-.308-.077-.416-.216-.83-1.03-2.155-1.523-3.91-1.523-2.047 0-3.233.862-3.233 1.77 0 .862.908 1.246 2.94 1.6 2.663.477 4.65 1.154 4.65 3.448 0 2.217-1.924 3.367-4.8 3.367z" />
                  </svg>
                </span>
                <div><strong>AWS Cloud Analytics</strong><small>Connect S3 storage, Redshift &amp; IAM roles</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F46800" d="M23.02 10.59a8.578 8.578 0 0 0-.862-3.034 8.911 8.911 0 0 0-1.789-2.445c.337-1.342-.413-2.505-.413-2.505-1.292-.08-2.113.4-2.416.62-.052-.02-.102-.044-.154-.064-.22-.089-.446-.172-.677-.247-.231-.073-.47-.14-.711-.197a9.867 9.867 0 0 0-.875-.161C14.557.753 12.94 0 12.94 0c-1.804 1.145-2.147 2.744-2.147 2.744l-.018.093c-.098.029-.2.057-.298.088-.138.042-.275.094-.413.143-.138.055-.275.107-.41.166a8.869 8.869 0 0 0-1.557.87l-.063-.029c-2.497-.955-4.716.195-4.716.195-.203 2.658.996 4.33 1.235 4.636a11.608 11.608 0 0 0-.607 2.635C1.636 12.677.953 15.014.953 15.014c1.926 2.214 4.171 2.351 4.171 2.351.003-.002.006-.002.006-.005.285.509.615.994.986 1.446.156.19.32.371.488.548-.704 2.009.099 3.68.099 3.68 2.144.08 3.553-.937 3.849-1.173a9.784 9.784 0 0 0 3.164.501h.08l.055-.003.107-.002.103-.005.003.002c1.01 1.44 2.788 1.646 2.788 1.646 1.264-1.332 1.337-2.653 1.337-2.94v-.058c0-.02-.003-.039-.003-.06.265-.187.52-.387.758-.6a7.875 7.875 0 0 0 1.415-1.7c1.43.083 2.437-.885 2.437-.885-.236-1.49-1.085-2.216-1.264-2.354l-.018-.013-.016-.013a.217.217 0 0 1-.031-.02c.008-.092.016-.18.02-.27.011-.162.016-.323.016-.48v-.253l-.005-.098-.008-.135a1.891 1.891 0 0 0-.01-.13c-.003-.042-.008-.083-.013-.125l-.016-.124-.018-.122a6.215 6.215 0 0 0-2.032-3.73 6.015 6.015 0 0 0-3.222-1.46 6.292 6.292 0 0 0-.85-.048l-.107.002h-.063l-.044.003-.104.008a4.777 4.777 0 0 0-3.335 1.695c-.332.4-.592.84-.768 1.297a4.594 4.594 0 0 0-.312 1.817l.003.091c.005.055.007.11.013.164a3.615 3.615 0 0 0 .698 1.82 3.53 3.53 0 0 0 1.827 1.282c.33.098.66.14.971.137.039 0 .078 0 .114-.002l.063-.003c.02 0 .041-.003.062-.003.034-.002.065-.007.099-.01.007 0 .018-.003.028-.003l.031-.005.06-.008a1.18 1.18 0 0 0 .112-.02c.036-.008.072-.013.109-.024a2.634 2.634 0 0 0 .914-.415c.028-.02.056-.041.085-.065a.248.248 0 0 0 .039-.35.244.244 0 0 0-.309-.06l-.078.042c-.09.044-.184.083-.283.116a2.476 2.476 0 0 1-.475.096c-.028.003-.054.006-.083.006l-.083.002c-.026 0-.054 0-.08-.002l-.102-.006h-.012l-.024.006c-.016-.003-.031-.003-.044-.006-.031-.002-.06-.007-.091-.01a2.59 2.59 0 0 1-.724-.213 2.557 2.557 0 0 1-.667-.438 2.52 2.52 0 0 1-.805-1.475 2.306 2.306 0 0 1-.029-.444l.006-.122v-.023l.002-.031c.003-.021.003-.04.005-.06a3.163 3.163 0 0 1 1.352-2.29 3.12 3.12 0 0 1 .937-.43 2.946 2.946 0 0 1 .776-.101h.06l.07.002.045.003h.026l.07.005a4.041 4.041 0 0 1 1.635.49 3.94 3.94 0 0 1 1.602 1.662 3.77 3.77 0 0 1 .397 1.414l.005.076.003.075c.002.026.002.05.002.075 0 .024.003.052 0 .07v.065l-.002.073-.008.174a6.195 6.195 0 0 1-.08.639 5.1 5.1 0 0 1-.267.927 5.31 5.31 0 0 1-.624 1.13 5.052 5.052 0 0 1-3.237 2.014 4.82 4.82 0 0 1-.649.066l-.039.003h-.287a6.607 6.607 0 0 1-1.716-.265 6.776 6.776 0 0 1-3.4-2.274 6.75 6.75 0 0 1-.746-1.15 6.616 6.616 0 0 1-.714-2.596l-.005-.083-.002-.02v-.056l-.003-.073v-.096l-.003-.104v-.07l.003-.163c.008-.22.026-.45.054-.678a8.707 8.707 0 0 1 .28-1.355c.128-.444.286-.872.473-1.277a7.04 7.04 0 0 1 1.456-2.1 5.925 5.925 0 0 1 .953-.763c.169-.111.343-.213.524-.306.089-.05.182-.091.273-.135.047-.02.093-.042.138-.062a7.177 7.177 0 0 1 .714-.267l.145-.045c.049-.015.098-.026.148-.041.098-.029.197-.052.296-.076.049-.013.1-.02.15-.033l.15-.032.151-.028.076-.013.075-.01.153-.024c.057-.01.114-.013.171-.023l.169-.021c.036-.003.073-.008.106-.01l.073-.008.036-.003.042-.002c.057-.003.114-.008.171-.01l.086-.006h.023l.037-.003.145-.007a7.999 7.999 0 0 1 1.708.125 7.917 7.917 0 0 1 2.048.68 8.253 8.253 0 0 1 1.672 1.09l.09.077.089.078c.06.052.114.107.171.159.057.052.112.106.166.16.052.055.107.107.159.164a8.671 8.671 0 0 1 1.41 1.978c.012.026.028.052.04.078l.04.078.075.156c.023.051.05.1.07.153l.065.15a8.848 8.848 0 0 1 .45 1.34.19.19 0 0 0 .201.142.186.186 0 0 0 .172-.184c.01-.246.002-.532-.024-.856z" />
                  </svg>
                </span>
                <div><strong>Grafana</strong><small>Real-time factory telemetry &amp; sensor alert boards</small></div>
              </div>
            </div>
          </div>

          {/* Group 5: Consulting & Storytelling */}
          <div className="tg">
            <div className="tg-head">
              <h3>Deliver to leadership</h3>
              <span>Skill 5 · Business Consulting &amp; Decision Storytelling</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#0052CC" d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z" />
                  </svg>
                </span>
                <div><strong>Jira</strong><small>Agile sprint tracking and analytics tickets</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#000000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
                  </svg>
                </span>
                <div><strong>Notion</strong><small>Data catalog, KPI runbooks &amp; definitions</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F24E1E" d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
                  </svg>
                </span>
                <div><strong>Figma</strong><small>Executive dashboard wireframes and mockups</small></div>
              </div>
            </div>
          </div>

          <p className="tnote">Tool names and logos belong to their owners and are shown only to say what you will learn. The exact list can change as tools change.</p>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 8: SALARY BENCHMARKS
          ------------------------------------------------------------------------- */}
      <section className="pay" id="salary">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Salary</span>
            <h2>What Industrial Data Analytics Specialists earn</h2>
            <p className="lead">Industrial analytics and BI expertise is rewarded with premium packages because it connects technical database engineering with measurable executive cost-savings.</p>
          </div>

          <div className="big">
            <div>
              <small>India · Entry Level</small>
              <b>₹6.5–10 LPA</b>
              <span>Reported range for freshers &amp; junior data/BI analysts across IT and industrial firms.</span>
            </div>
            <div>
              <small>India · Mid-Level</small>
              <b>₹12–18 LPA</b>
              <span>Reported range for experienced BI engineers, supply chain analysts &amp; data consultants.</span>
            </div>
            <div>
              <small>United States · Median</small>
              <b>$115,000</b>
              <span>Median total pay for Industrial BI &amp; Analytics Engineers (Levels.fyi).</span>
            </div>
          </div>

          <table className="ptab">
            <thead>
              <tr>
                <th>Where</th>
                <th>Level</th>
                <th>Reported Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Manufacturing &amp; Automotive MNCs</td>
                <td>Entry · Mid · Lead</td>
                <td className="n">₹6.5–9 · ₹12–17 · ₹20–32 LPA</td>
              </tr>
              <tr>
                <td>Supply Chain, Logistics &amp; E-Commerce</td>
                <td>Entry · Mid · Senior</td>
                <td className="n">₹7–10 · ₹13–19 · ₹24–36 LPA</td>
              </tr>
              <tr>
                <td>Global Management Consulting &amp; IT</td>
                <td>Analyst · Senior Consultant · Manager</td>
                <td className="n">₹8–12 · ₹15–22 · ₹26–40+ LPA</td>
              </tr>
              <tr>
                <td>United States, all companies</td>
                <td>25th · median · 75th percentile</td>
                <td className="n">$85K · $115K · $155K a year</td>
              </tr>
            </tbody>
          </table>

          <p className="pnote">
            Sources: Salary benchmarks compiled from AmbitionBox, Glassdoor, Michael Page India Salary Report, and active enterprise recruitment postings for Business Intelligence Analysts, Industrial Data Analysts, and Analytics Consultants.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 9: CAREER PATHWAYS
          ------------------------------------------------------------------------- */}
      <section id="careers">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">After this</span>
            <h2>Career options after learning APIDA</h2>
            <p className="lead">The high-demand synergy of advanced SQL, Power BI, Python, and operational domain knowledge qualifies you for multiple high-growth analytical tracks.</p>
          </div>

          <div className="careers">
            <article>
              <span className="tag">Start here</span>
              <h3>Industrial Data Analyst</h3>
              <p>Analyze factory sensors, production runs, and yield metrics to optimize operational plant throughput.</p>
            </article>
            <article>
              <span className="tag">High Demand</span>
              <h3>Business Intelligence (BI) Engineer</h3>
              <p>Architect scalable Power BI &amp; Tableau data models, write complex DAX, and manage corporate portals.</p>
            </article>
            <article>
              <span className="tag">Operations</span>
              <h3>Supply Chain &amp; Logistics Analyst</h3>
              <p>Model safety stock levels, optimize distribution routes, and forecast supplier fulfillment lead times.</p>
            </article>
            <article>
              <span className="tag">Consulting</span>
              <h3>Data Analytics Consultant</h3>
              <p>Advise corporate clients on analytics adoption, dashboard architectures, and operational ROI.</p>
            </article>
            <article>
              <span className="tag">Commercial</span>
              <h3>Commercial &amp; Financial Analyst</h3>
              <p>Analyze margin contributions, track budget variances, and model pricing structures for executive leadership.</p>
            </article>
            <article>
              <span className="tag">Data Core</span>
              <h3>Analytics Engineer (dbt &amp; SQL)</h3>
              <p>Transform raw enterprise data into clean, curated dimensional warehouse tables for business teams.</p>
            </article>
            <article>
              <span className="tag">Leadership</span>
              <h3>Manager of Business Intelligence</h3>
              <p>Lead BI teams, govern company-wide data definitions, and direct executive reporting strategy.</p>
            </article>
            <article>
              <span className="tag">Strategic Track</span>
              <h3>Head of Decision Intelligence</h3>
              <p>Guide enterprise digital transformation, automated alerting systems, and data-backed boardroom governance.</p>
            </article>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 10: WHO CAN BECOME AN APIDA SPECIALIST
          ------------------------------------------------------------------------- */}
      <section className="who">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Who can become an APIDA Specialist</span>
            <h2>Designed for diverse starting points</h2>
            <p className="lead">
              What matters is the willingness to learn the missing parts. If you are from mechanical or commerce, we teach SQL and Power BI. If you code but have never analyzed operations, we teach supply chain analytics.
            </p>
          </div>
          <div className="who-grid">
            <div>
              <b>Engineering &amp; Science Graduates</b>
              <span>Mechanical, Electrical, Civil, BCA, and B.Tech graduates who want to launch high-paying analytical careers without software bug fixing.</span>
            </div>
            <div>
              <b>MIS &amp; Excel Reporting Professionals</b>
              <span>Executives tired of repetitive copy-pasting who want to upgrade to automated SQL, Power BI, and Python analytics.</span>
            </div>
            <div>
              <b>Operations &amp; Plant Supervisors</b>
              <span>Professionals working in manufacturing, supply chain, or oil &amp; gas who want to pivot into digital analytics consulting.</span>
            </div>
            <div>
              <b>Commerce, BBA &amp; MBA Graduates</b>
              <span>Business graduates who want to master data visualization, financial modeling, and predictive business intelligence.</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 11: PLAIN-ENGLISH GLOSSARY
          ------------------------------------------------------------------------- */}
      <section className="gloss" id="words">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Plain-English glossary</span>
            <h2>Words you may hear, explained simply</h2>
          </div>
          <dl className="gl">
            <div>
              <dt>APIDA</dt>
              <dd>Advanced Program in Industrial Data Analytics with Business Intelligence. Turning raw operational data into boardroom decisions.</dd>
            </div>
            <div>
              <dt>Business Intelligence (BI)</dt>
              <dd>The technologies and practices that transform raw corporate data into actionable interactive dashboards and strategic insights.</dd>
            </div>
            <div>
              <dt>DAX (Data Analysis Expressions)</dt>
              <dd>The formula language used in Microsoft Power BI to create custom measures, time intelligence, and dynamic aggregations.</dd>
            </div>
            <div>
              <dt>OEE (Overall Equipment Effectiveness)</dt>
              <dd>The gold-standard manufacturing metric measuring machine Availability, Performance, and Quality to pinpoint operational losses.</dd>
            </div>
            <div>
              <dt>Dimensional Modeling (Star Schema)</dt>
              <dd>Structuring data into central Fact tables (events/numbers) and surrounding Dimension tables (attributes) for lightning-fast BI reporting.</dd>
            </div>
            <div>
              <dt>ETL (Extract, Transform, Load)</dt>
              <dd>The automated process of extracting raw data from multiple source systems, cleaning and reshaping it, and loading it into a data warehouse.</dd>
            </div>
            <div>
              <dt>Time Series Forecasting</dt>
              <dd>Statistical techniques (ARIMA, Exponential Smoothing, Prophet) used to predict future sales, inventory requirements, or energy consumption.</dd>
            </div>
            <div>
              <dt>dbt (Data Build Tool)</dt>
              <dd>A transformation framework that lets analysts write modular SQL queries with automated testing and version control inside data warehouses.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 12: FREQUENTLY ASKED QUESTIONS (FAQ)
          ------------------------------------------------------------------------- */}
      <section id="faq">
        <div className="wrap faq">
          <div className="sec-head">
            <span className="eyebrow">FAQ</span>
            <h2>Industrial Data Analytics &amp; BI questions, answered</h2>
          </div>

          <details className="q" open>
            <summary>What is the difference between APIDA and APIDS?</summary>
            <p>
              APIDA focuses heavily on Industrial Data Analytics, Business Intelligence (Power BI &amp; Tableau), Advanced SQL, and operational business metrics for supply chain, manufacturing, and retail decision making. APIDS is oriented towards Data Science, deep machine learning algorithms, GenAI LLM engineering, and cloud AI microservice deployment.
            </p>
          </details>

          <details className="q">
            <summary>Can a non-technical or non-programmer learn APIDA?</summary>
            <p>
              Yes, absolutely. APIDA is ideal for non-coders and professionals from commerce, management, mechanical, and general science backgrounds. The curriculum starts with SQL and visual BI tools (Power BI, Tableau) before introducing clean, practical Python scripts for analytics.
            </p>
          </details>

          <details className="q">
            <summary>Which tools will I master in the APIDA program?</summary>
            <p>
              You will master Microsoft Power BI (DAX, Power Query, Modeling), Tableau Desktop, Advanced SQL (PostgreSQL &amp; Snowflake), Python for Data Analysis (Pandas, NumPy, Seaborn), Advanced Excel, and statistical modeling tools.
            </p>
          </details>

          <details className="q">
            <summary>What are the batch schedules and training modes available?</summary>
            <p>
              We provide both Live Interactive Online sessions and Classroom Training in Bangalore and Bhubaneswar. Flexible weekend batches and weekday evening batches are available with lifetime LMS recordings and mentor review.
            </p>
          </details>

          <details className="q">
            <summary>What real industrial projects will I work on?</summary>
            <p>
              You will build capstones including: a supply chain inventory optimization model, a manufacturing OEE plant downtime dashboard, an e-commerce customer churn &amp; LTV analysis, and a live executive financial performance portal in Power BI.
            </p>
          </details>

          <details className="q">
            <summary>How does DV Analytics assist with placements?</summary>
            <p>
              Learners receive full placement assistance: 1-on-1 resume transformation, LinkedIn profile enhancement, Power BI portfolio hosting, mock technical interviews, and direct interviews with our network of 400+ hiring partner companies.
            </p>
          </details>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 13: JOIN / REGISTRATION FORM (WHITE EDITORIAL THEME)
          ------------------------------------------------------------------------- */}
      <section className="join" id="join">
        <div className="wrap join-grid">
          <div>
            <span className="eyebrow">Admissions Open</span>
            <h2>Start your journey in Industrial Data Analytics &amp; BI</h2>
            <p className="lead" style={{ marginTop: '14px' }}>
              Transform from manual spreadsheets to high-impact Business Intelligence and predictive industrial analytics. Learn with seasoned corporate practitioners and build an industry-ready portfolio.
            </p>

            <ul className="build">
              <li>Master complex SQL queries, window functions, and dimensional star-schema data modeling</li>
              <li>Design executive Power BI &amp; Tableau dashboards that guide multimillion-dollar decisions</li>
              <li>Automate analytics workflows with Python, Pandas, and predictive statistical algorithms</li>
              <li>Present end-to-end industrial capstones with clear operational ROI narratives</li>
            </ul>

            <div className="stack">
              <span>Power BI</span>
              <span>Tableau</span>
              <span>SQL</span>
              <span>Snowflake</span>
              <span>Python</span>
              <span>Advanced Excel</span>
              <span>dbt</span>
              <span>Statistics</span>
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
          <div className="join-form-wrapper" id="apida-lead-form">
            <div className="lp-form-card">
              {isSubmitted ? (
                <div className="lp-form-success-banner">
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#065f46' }}>
                    Registration Submitted Successfully!
                  </h3>
                  <p style={{ color: '#047857', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '14px' }}>
                    Thank you, <strong>{formData.name}</strong>. An admissions counselor from DV Analytics will reach out within 2 hours with the syllabus and upcoming batch schedule.
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
                    <h3>Register for APIDA</h3>
                    <p>Reserve your seat for the Industrial Data Analytics &amp; BI batch.</p>
                  </div>

                  {formError && <div className="lp-form-error-banner">{formError}</div>}

                  <div className="lp-form-field">
                    <label className="lp-form-label">Full Name *</label>
                    <input
                      type="text"
                      className="lp-form-input"
                      placeholder="e.g. Priyadarshini Das"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="lp-form-row-2">
                    <div className="lp-form-field">
                      <label className="lp-form-label">Email Address *</label>
                      <input
                        type="email"
                        className="lp-form-input"
                        placeholder="e.g. priya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="lp-form-field">
                      <label className="lp-form-label">Mobile Number *</label>
                      <input
                        type="tel"
                        className="lp-form-input"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        maxLength={10}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="lp-form-row-2">
                    <div className="lp-form-field">
                      <label className="lp-form-label">Highest Qualification *</label>
                      <LpCustomSelect
                        options={qualificationOptions}
                        value={formData.qualification}
                        placeholder="Select degree"
                        required
                        onChange={(val) => setFormData({ ...formData, qualification: val })}
                      />
                    </div>

                    <div className="lp-form-field">
                      <label className="lp-form-label">Current Experience *</label>
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
                      <label className="lp-form-label">Current Location / State *</label>
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
                        value="APIDA (Industrial Data Analytics & BI)"
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
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          FOOTER (CENTERED COPYRIGHT TEXT ONLY - NO LOGO)
          ------------------------------------------------------------------------- */}
      <footer className="lp-footer">
        <div className="wrap">
          <div className="footer-copyright">
            © {new Date().getFullYear()} DV Analytics. All rights reserved. Advanced Program in Industrial Data Analytics with Business Intelligence (APIDA).
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
