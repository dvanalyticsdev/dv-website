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

export interface FdeStoryLandingPageProps {
  onNavigateHome?: () => void;
}

export const FdeStoryLandingPage: React.FC<FdeStoryLandingPageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    state: '',
    course: 'FDE (AI Forward Deployment Engineer)',
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
    const el = document.getElementById('fde-lead-form');
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
      title: 'Data and Programming',
      summary: 'Learn to write clean, maintainable Python code, design relational schemas, write high-performance SQL queries, and build bulletproof data pipelines. Everything else is built on this foundation.',
      techChips: ['Python 3.12', 'PostgreSQL', 'DuckDB', 'Pandas & Polars', 'Git & GitHub'],
      topics: [
        'Advanced Python: Object-oriented programming, type hints, decorators, generators',
        'Relational Databases & SQL: Complex joins, CTEs, window functions, indexing & query plans',
        'High-performance data manipulation with Polars, Pandas, and DuckDB',
        'Data cleaning, transformation pipelines, and schema validation with Pydantic',
        'Version control hygiene: Git branching, pull requests, and reproducible repositories',
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
      title: 'Software Engineering',
      summary: 'Turn standalone algorithms into robust production web applications and asynchronous RESTful microservices that enterprise systems and clients can immediately use.',
      techChips: ['FastAPI', 'React', 'REST APIs', 'Postman', 'System Architecture'],
      topics: [
        'Building asynchronous, high-throughput RESTful APIs with FastAPI & Pydantic',
        'Frontend fundamentals for engineers: Responsive layouts, modern JavaScript & React',
        'Interactive dashboards and rapid client demo interfaces with Streamlit & React',
        'API authentication, JWT security, rate-limiting, and resilient error handling',
        'Writing unit tests, integration testing with Pytest, and automated test suites',
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
      title: 'AI and Analytics',
      summary: 'Harness predictive machine learning, deep learning, GenAI LLMs, RAG, and autonomous agentic workflows to solve real client bottlenecks.',
      techChips: ['LangChain', 'LangGraph', 'Scikit-Learn', 'PyTorch', 'Vector Databases'],
      topics: [
        'Applied Machine Learning: Supervised regression, classification, gradient boosting (XGBoost)',
        'Deep Learning foundations with PyTorch and pretrained transformer models',
        'Generative AI & LLM orchestration: Prompt engineering, function calling, structured outputs',
        'Retrieval-Augmented Generation (RAG): Document chunking, hybrid search, ChromaDB & PGVector',
        'Autonomous Agentic AI: Multi-agent workflows with LangChain, LangGraph, and tool calling',
        'Model evaluation: Hallucination detection, RAGAS metrics, and latency benchmarking',
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 2a10 10 0 0 1 10 10h-10V2z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Deployment Engineering',
      summary: 'Put models live and keep them running stably with Docker containerization, AWS cloud infrastructure, CI/CD pipelines, and 24/7 observability.',
      techChips: ['Docker', 'AWS Cloud', 'CI/CD Pipelines', 'MLflow', 'Grafana & Prometheus'],
      topics: [
        'Containerization: Multi-stage Dockerfiles, image optimization, and microservice orchestration',
        'Continuous Integration & Continuous Delivery (CI/CD) with GitHub Actions',
        'Cloud infrastructure on AWS: EC2, ECS, S3 storage, IAM security, and VPC networking',
        'Model experiment tracking and registry at scale with MLflow',
        'Production observability: Prometheus metrics, Grafana dashboards, and data drift detection',
        'Zero-downtime releases, canary deployments, and automated rollback strategies',
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
      id: 5,
      title: 'Client Delivery and Business Consulting',
      summary: 'Understand people, business objectives, and organizational workflows. This critical bridge is what separates an elite AI Forward Deployment Engineer from a developer.',
      techChips: ['Client Discovery', 'Problem Framing', 'Executive Demos', 'Operational Runbooks', 'ROI Analysis'],
      topics: [
        'Client discovery: Asking the right questions to uncover true operational bottlenecks',
        'Problem framing: Translating vague business problems into measurable, high-ROI metrics',
        'Explaining complex AI simply to non-technical executive leaders and department heads',
        'Live client demonstrations: Presenting working prototypes and defending design trade-offs',
        'Creating comprehensive operational runbooks, user handover documentation, and team training',
        'Portfolio auditing and 1-on-1 interview preparation with industry leaders',
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
            title="Click to register for FDE"
            onKeyDown={(e) => {
              if (e.key === 'Enter') scrollToForm();
            }}
          >
            <img
              src="/fde-training-banner.png"
              alt="Master Program in AI Forward Deployment Engineer (FDE) - DV Analytics"
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
          <span className="eyebrow">AI Forward Deployment Engineering · Master Program</span>
          <h1>
            What is an AI Forward Deployment Engineer? The tech career <em>AI cannot replace.</em>
          </h1>
          <p className="lead">
            An AI Forward Deployment Engineer (FDE) works directly with a client, understands their real problem, and builds a working solution on the client&#39;s own data. An FDE goes from the first conversation to a live product. AI can write code, but it cannot sit with a client, check its own output, or take responsibility for going live. That is why this role is in peak demand.
          </p>

          <div className="cta">
            <button type="button" onClick={scrollToForm} className="btn">
              Join DV Analytics to Learn FDE
            </button>
            <a className="btn ghost" href="#skills">
              See the 5 Skills
            </a>
          </div>

          {/* 4 Clean Inline Program Badges */}
          <div className="hero-stats-row">
            <div className="hero-stat-pill">
              <span className="h-stat-dot"></span>
              <span><b>6–8 Months</b> (Weekday / Weekend)</span>
            </div>
            <div className="hero-stat-pill">
              <span className="h-stat-dot"></span>
              <span><b>100% Live</b> Interactive Mentor-Led Training</span>
            </div>
            <div className="hero-stat-pill">
              <span className="h-stat-dot"></span>
              <span><b>₹18–55 LPA</b> High-Demand Salary Range</span>
            </div>
            <div className="hero-stat-pill">
              <span className="h-stat-dot"></span>
              <span><b>LMS Access</b> 24/7 Recordings &amp; Resources</span>
            </div>
          </div>

          {/* Full-Width 5-Step Path Card */}
          <div className="path-card" aria-label="One AI Forward Deployment Engineer owns the whole path">
            <div className="path-top">
              <span>One project, start to finish</span>
              <span>Client Request → Live Production AI</span>
            </div>
            <ol className="path">
              <li>
                <b>1. Scope</b>
                <span>Find the real problem. Agree what &quot;done&quot; means.</span>
              </li>
              <li>
                <b>2. Data</b>
                <span>Collect, clean and shape the messy client data.</span>
              </li>
              <li>
                <b>3. AI &amp; ML</b>
                <span>Fine-tune algorithms, GenAI LLMs &amp; RAG.</span>
              </li>
              <li>
                <b>4. Software &amp; API</b>
                <span>Build FastAPI microservices &amp; client UI.</span>
              </li>
              <li>
                <b>5. Deploy &amp; Ship</b>
                <span>Containerize with Docker, deploy to AWS &amp; monitor.</span>
              </li>
            </ol>
            <div className="path-bracket">
              <strong>The Forward Deployed Engineer owns every stage.</strong>
              <span>Earlier this took five separate specialists and many handoffs.</span>
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
                A high-impact hybrid role combining software engineering, modern AI models, and real-world client consulting to build solutions that actually get used in production.
              </p>
            </article>
            <article>
              <span className="eyebrow">&nbsp;</span>
              <h3>Why is it in demand?</h3>
              <p>
                AI products rarely work out-of-the-box. Client data is messy, siloed, and security-restricted. Companies desperately need engineers who can embed with teams and ship working AI.
              </p>
            </article>
            <article>
              <span className="eyebrow">&nbsp;</span>
              <h3>How do I start?</h3>
              <p>
                Master the 5 core pillars, build complete end-to-end deployed AI systems from raw data to an AWS container, and practice live mentor review.{' '}
                <a href="#fde-lead-form" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>
                  Join DV Analytics
                </a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 3: WHAT IS AN FDE (WITH 7-STAGE INTERACTIVE ACCORDION)
          ------------------------------------------------------------------------- */}
      <section className="what" id="what-is-fde">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What is an FDE</span>
            <h2>A Forward Deployed Engineer goes to the problem, then ships the fix</h2>
          </div>
          <div className="what-text">
            <p className="def">
              A Forward Deployed Engineer sits with a customer, understands their real problem, and builds a working solution on the customer&#39;s own data. An FDE goes from the first conversation to a live product.
            </p>
            <p>
              &quot;Forward deployed&quot; means sitting close to the problem—with users, on calls, and inside the company&#39;s systems—rather than in a lab building generic software that might not fit.
            </p>
            <p>
              Think of a ready-made suit and a bespoke tailor. A software engineer builds the ready-made suit: one cut, for everyone. An FDE is the tailor who measures the client, cuts the cloth, fits it and makes it work for that one person.
            </p>
          </div>

          <div className="example">
            <span className="eyebrow">An illustrative example, step by step</span>
            <h3>A food delivery app where evening orders keep arriving late</h3>
            <p>
              The client thinks they need &quot;more AI&quot;. The Forward Deployed Engineer sits with the dispatch team, looks at real logs, and discovers the issue isn&#39;t route planning—it is kitchen prep delays during peak dinner hours that throw off the entire delivery fleet.
            </p>
          </div>

          <div className="stages">
            <div className="stages-head">
              <span className="steps-title">The 7 stages of an FDE project</span>
              <span className="hint">Tap a stage to open details</span>
            </div>

            <details className="stage" name="stages" open>
              <summary>
                <span className="sn">1</span>
                <span className="st">
                  <b>Discover &amp; Scope</b>
                  <small>Sit with the client and find the real bottleneck.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the FDE does</h4>
                  <ul className="do">
                    <li>Meets the dispatch manager, rides along with delivery couriers, and reads customer complaints.</li>
                    <li>Discovers the real problem: late food is caused by 40 slow restaurants, not courier navigation.</li>
                    <li>Agrees on one clear metric: cut the number of orders late by more than 15 minutes by half.</li>
                    <li>Writes a one-page project scope document in plain business language that everyone signs.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A clear definition of the problem and an agreed success metric.</p>
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
                  <b>Data Audit</b>
                  <small>Inspect the customer&#39;s real, messy data.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the FDE does</h4>
                  <ul className="do">
                    <li>Connects to the client&#39;s order database, GPS feeds, and restaurant tablets.</li>
                    <li>Finds timestamps are missing on 12% of orders and kitchen prep logs are entered after delivery.</li>
                    <li>Builds data validation rules to flag corrupted records automatically.</li>
                    <li>Confirms the historical dataset contains enough clean records to train accurate models.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A reliable inventory of their data quality and a cleaned dataset.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>SQL &amp; Data Warehousing</span>
                    <span>Python &amp; Polars</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">3</span>
                <span className="st">
                  <b>Design Architecture</b>
                  <small>Plan the simplest system that will actually work.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the FDE does</h4>
                  <ul className="do">
                    <li>Lists required data: live order details, historical restaurant prep times, courier locations, and weather.</li>
                    <li>Plans the path: live stream comes in, gets cleaned, feeds a predictive model, and sends alerts to dispatch.</li>
                    <li>Chooses the simplest method that works: gradient boosting first, neural models only if clearly better.</li>
                    <li>Checks security &amp; privacy: courier GPS coords are masked so only authorized dispatch staff see them.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A clean architecture blueprint showing how data flows into real-time decisions.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>System Architecture</span>
                    <span>Data Engineering</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">4</span>
                <span className="st">
                  <b>Build &amp; Prototype</b>
                  <small>Build a quick working version and test with users.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the FDE does</h4>
                  <ul className="do">
                    <li>Trains a delay prediction model on historical orders and evaluates accuracy against holdout data.</li>
                    <li>Builds an interactive dispatch screen: &quot;Order 4821 may be 14 min late; restaurant kitchen is backed up.&quot;</li>
                    <li>Shows it to dispatchers. They ask for an alert explaining the reason and a button to reassign couriers.</li>
                    <li>Refines the model and dashboard based on real dispatcher feedback.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A working prototype tested with the operations team and incorporating their honest feedback.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Machine Learning</span>
                    <span>Streamlit UI</span>
                    <span>FastAPI</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">5</span>
                <span className="st">
                  <b>Deploy to Production</b>
                  <small>Containerize and release live on cloud infrastructure.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the FDE does</h4>
                  <ul className="do">
                    <li>Packages the application and model inference into multi-stage Docker containers.</li>
                    <li>Connects to live transactional order streams with automated auth and SSL encryption.</li>
                    <li>Sets up automated unit and integration tests via GitHub Actions CI/CD.</li>
                    <li>Releases in one pilot city first with instant rollback capabilities if issues arise.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A live, containerized production service running stably in their cloud environment.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Docker</span>
                    <span>CI/CD</span>
                    <span>AWS Cloud</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">6</span>
                <span className="st">
                  <b>Monitor &amp; Operate</b>
                  <small>Track performance, data drift, and uptime.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the FDE does</h4>
                  <ul className="do">
                    <li>Sets up Prometheus &amp; Grafana dashboards to monitor latency, memory, and model prediction drift.</li>
                    <li>Receives automatic Slack/Pager alerts if restaurant data feeds drop or error rates spike.</li>
                    <li>Retrains and updates model weights when external conditions change (monsoon rain, festival spikes).</li>
                    <li>Tracks the core business KPIs: late orders, driver wait times, and customer satisfaction ratings.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>High reliability, zero surprise downtime, and transparent observability into business impact.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>MLOps</span>
                    <span>Observability</span>
                    <span>Grafana</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="stage" name="stages">
              <summary>
                <span className="sn">7</span>
                <span className="st">
                  <b>Handover &amp; Deliver</b>
                  <small>Train the team and report business ROI to leadership.</small>
                </span>
                <span className="sx" aria-hidden="true" />
              </summary>
              <div className="sb">
                <div>
                  <h4>What the FDE does</h4>
                  <ul className="do">
                    <li>Conducts hands-on training sessions with the client&#39;s dispatchers and internal engineers.</li>
                    <li>Writes an operational runbook: troubleshooting guide, rollback steps, and support contacts.</li>
                    <li>Prepares an executive dashboard showing late orders dropped by 48% across the pilot city.</li>
                    <li>Helps the client&#39;s engineering team roll out the solution to the remaining 14 metropolitan cities.</li>
                  </ul>
                </div>
                <div>
                  <h4>What the client gets</h4>
                  <p>A self-sufficient internal team, comprehensive documentation, and proven business ROI.</p>
                  <h4 className="h2b">Skills used</h4>
                  <div className="tags">
                    <span>Executive Presentation</span>
                    <span>Knowledge Transfer</span>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 4: WHY COMPANIES ARE HIRING FDES
          ------------------------------------------------------------------------- */}
      <section id="why-fde">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Why FDE in 2026</span>
            <h2>Why companies are hiring Forward Deployed Engineers</h2>
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
                <li>A consultant to understand the need</li>
                <li>A data engineer to organize the data</li>
                <li>A software engineer to build the app</li>
                <li>An AI engineer to add the smart features</li>
                <li>A deployment engineer to put it live</li>
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
            <span className="eyebrow">AI and the FDE</span>
            <h2>Why AI cannot replace a Forward Deployed Engineer</h2>
            <p className="lead">
              AI is exceptional at isolated tasks. A role that is only one task gets automated quickly. The Forward Deployed Engineer job is multiple connected disciplines plus the human element: framing real client needs, judging edge cases, and taking responsibility for live production.
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
                  <td>Writing code from clear instructions</td>
                  <td>Writes working code in minutes</td>
                  <td>Someone must decide what to build and check that it really works</td>
                </tr>
                <tr>
                  <td>Cleaning and organizing data</td>
                  <td>Writes the code to move and clean data</td>
                  <td>Someone must know which data is correct and what goes wrong with real, messy data</td>
                </tr>
                <tr>
                  <td>Building a machine learning model</td>
                  <td>Writes the code and picks a model</td>
                  <td>Someone must check it solves the right problem and notice when it is wrong</td>
                </tr>
                <tr>
                  <td>Designing app screens</td>
                  <td>Designs screens quickly</td>
                  <td>Someone must see where real users get confused</td>
                </tr>
                <tr>
                  <td>Setting up the live system</td>
                  <td>Writes the setup files quickly</td>
                  <td>Someone must put it live and fix it when it breaks at 2 am</td>
                </tr>
                <tr>
                  <td>Writing plans and status reports</td>
                  <td>Drafts them neatly</td>
                  <td>Someone must earn the client&#39;s trust and say &quot;this will take longer than we said&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="four">
            <h3>AI is strong in the middle and weak at both ends</h3>
            <p className="sub">
              Every real project has four parts. The build step gets cheaper every year. The value moves to the parts on either side of it.
            </p>
            <div className="parts">
              <div className="part">
                <span className="tag w">Weak for AI</span>
                <b>Understand the problem</b>
                <span className="d">Talk to the client, ask the right questions, find the real need.</span>
                <div className="meter s1">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="part">
                <span className="tag s">Strong for AI</span>
                <b>Build it</b>
                <span className="d">Code, data, AI features and apps. AI does most of it when a person guides it.</span>
                <div className="meter s3">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="part">
                <span className="tag m">Partial</span>
                <b>Check it is right</b>
                <span className="d">Test it and make sure the data and the AI&#39;s answers are correct.</span>
                <div className="meter s2">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="part">
                <span className="tag w">Weak for AI</span>
                <b>Ship it and own it</b>
                <span className="d">Launch it, watch it, fix it and hand it over. Someone answers for it.</span>
                <div className="meter s1">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>

          <div className="pull">
            &quot;AI can write the code. It cannot sit with a client, judge its own output, and <span>take responsibility for going live.</span>&quot;
          </div>
          <div className="note">
            The safest career strategy in tech is building a multi-disciplinary mix of skills that is hard to copy. That is exactly what the FDE program teaches.
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
            <h2>The 5 skills that make up an AI Forward Deployment Engineer</h2>
            <p className="lead">
              You do not need to master everything first. You learn the skills one by one, then use them together on a single project.
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
              <h3>Data and Programming</h3>
              <p>Learn to write code and handle data. Everything else is built on this.</p>
              <ul className="can">
                <li>Write clean Python programs</li>
                <li>Collect, clean and store data</li>
                <li>Ask complex questions of SQL databases</li>
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
              <h3>Software Engineering</h3>
              <p>Turn your algorithms into an app that real clients can use.</p>
              <ul className="can">
                <li>Build async FastAPI backends</li>
                <li>Build interactive screens</li>
                <li>Automate test suites that prove it works</li>
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
              <h3>AI and Analytics</h3>
              <p>Harness modern AI to solve the client&#39;s actual problem.</p>
              <ul className="can">
                <li>Build RAG document chatbots</li>
                <li>Build autonomous AI agent workflows</li>
                <li>Verify and evaluate AI model accuracy</li>
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
              <h3>Deployment Engineering</h3>
              <p>Put the product live and keep it running 24/7 with zero downtime.</p>
              <ul className="can">
                <li>Package with Docker containers</li>
                <li>Release updates safely with CI/CD</li>
                <li>Monitor telemetry and fix issues</li>
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
              <h3>Client Delivery and Business Consulting</h3>
              <p>Understand people and business. This is what separates an FDE from a developer.</p>
              <ul className="can">
                <li>Ask the right discovery questions</li>
                <li>Explain complex AI simply</li>
                <li>Demo prototypes and hand over runbooks</li>
              </ul>
            </article>
          </div>

          <div className="split">
            <div>
              <span className="eyebrow">Work Breakdown</span>
              <h3>How much of the job is code?</h3>
              <p className="legend" style={{ marginTop: '8px' }}>
                Less than most people expect. This is how the FDE role actually balances:
              </p>
              <div className="bar" role="img" aria-label="20% AI, 30% Engineering, 50% Problem-Solving & Delivery">
                <div className="b1">20%<span className="bar-tag"> AI</span></div>
                <div className="b2">30%<span className="bar-tag"> Eng</span></div>
                <div className="b3">50%<span className="bar-tag"> Delivery</span></div>
              </div>
              <div className="legend">
                <div><b>20% AI:</b> Enough depth to pick, fine-tune, and orchestrate the right models.</div>
                <div><b>30% Engineering:</b> Build APIs, integrate databases, deploy containers, and keep it running.</div>
                <div><b>50% Problem-solving &amp; Delivery:</b> Understand the client, communicate clearly, and ship live results.</div>
              </div>
            </div>

            <div>
              <span className="eyebrow">Learning Sequence</span>
              <h3>In what order should you learn?</h3>
              <ol className="order" style={{ marginTop: '14px' }}>
                <li data-n="1">
                  <div><b>Data and Programming:</b> Master Python, SQL, and data pipelines. Everything else is built on this.</div>
                </li>
                <li data-n="2">
                  <div><b>Software Engineering:</b> Build the backend APIs and web interfaces that real clients can use.</div>
                </li>
                <li data-n="3">
                  <div><b>AI and Analytics:</b> Train predictive models, GenAI LLMs, and build vector RAG systems.</div>
                </li>
                <li data-n="4">
                  <div><b>Deployment Engineering:</b> Package with Docker, automate CI/CD, and deploy to live cloud.</div>
                </li>
                <li data-n="5">
                  <div><b>Client Delivery from Day One:</b> Frame business problems, communicate clearly, and hand over solutions.</div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 7: COMPLETE 34 TOOLS WITH VECTOR SVG LOGOS
          ------------------------------------------------------------------------- */}
      <section className="tools" id="tools">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Tools you will learn</span>
            <h2>The tools a Forward Deployed Engineer uses every day</h2>
            <p className="lead">You do not need to know any of these today. You pick them up step by step, one project at a time. Each tool is here because real companies use it.</p>
          </div>

          {/* Group 1: Data & Programming */}
          <div className="tg">
            <div className="tg-head">
              <h3>Work with data</h3>
              <span>Skill 1 · Data and Programming</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                  </svg>
                </span>
                <div><strong>Python</strong><small>The main language you code in</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#4169E1" d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698z" />
                  </svg>
                </span>
                <div><strong>PostgreSQL</strong><small>Store data and ask questions (SQL)</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
                  </svg>
                </span>
                <div><strong>MongoDB</strong><small>Store flexible, unstructured data</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#150458" d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.455zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67Z" />
                  </svg>
                </span>
                <div><strong>Pandas &amp; Polars</strong><small>Clean and shape large data tables</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#231F20" d="M9.71 2.136a1.43 1.43 0 0 0-2.047 0h-.007a1.48 1.48 0 0 0-.421 1.042c0 .41.161.777.422 1.039l.007.007c.257.264.616.426 1.019.426.404 0 .766-.162 1.027-.426l.003-.007c.261-.262.421-.629.421-1.039 0-.408-.159-.777-.421-1.042H9.71z" />
                  </svg>
                </span>
                <div><strong>Apache Kafka</strong><small>Move data streams in real time</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#017CEE" d="M17.195 16.822l4.002-4.102C23.55 10.308 23.934 5.154 24 .43a.396.396 0 0 0-.246-.373.392.392 0 0 0-.437.09l-6.495 6.658-4.102-4.003C10.309.45 5.154.066.43 0H.423a.397.397 0 0 0-.277.683l6.658 6.494-4.003 4.103C.45 13.692.065 18.846 0 23.57a.398.398 0 0 0 .683.282l6.494-6.657 3.934 3.837.17.165c2.41 2.353 7.565 2.737 12.288 2.803h.006a.397.397 0 0 0 .277-.683l-6.657-6.495z" />
                  </svg>
                </span>
                <div><strong>Apache Airflow</strong><small>Schedule and orchestrate data jobs</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F03C2E" d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z" />
                  </svg>
                </span>
                <div><strong>Git</strong><small>Track every version of your code</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </span>
                <div><strong>GitHub</strong><small>Collaborate and manage pull requests</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FCC624" d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2z" />
                  </svg>
                </span>
                <div><strong>Linux &amp; Bash</strong><small>The OS running production cloud servers</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F37626" d="M7.157 22.201A1.784 1.799 0 0 1 5.374 24a1.784 1.799 0 0 1-1.784-1.799 1.784 1.799 0 0 1 1.784-1.799 1.784 1.799 0 0 1 1.783 1.799zM20.582 1.427a1.415 1.427 0 0 1-1.415 1.428 1.415 1.427 0 0 1-1.416-1.428A1.415 1.427 0 0 1 19.167 0a1.415 1.427 0 0 1 1.415 1.427zM4.992 3.336A1.047 1.056 0 0 1 3.946 4.39a1.047 1.056 0 0 1-1.047-1.055A1.047 1.056 0 0 1 3.946 2.28a1.047 1.056 0 0 1 1.046 1.056zm7.336 1.517c3.769 0 7.06 1.38 8.768 3.424a9.363 9.363 0 0 0-3.393-4.547 9.238 9.238 0 0 0-5.377-1.728A9.238 9.238 0 0 0 6.95 3.73a9.363 9.363 0 0 0-3.394 4.547c1.713-2.04 5.004-3.424 8.772-3.424zm.001 13.295c-3.768 0-7.06-1.381-8.768-3.425a9.363 9.363 0 0 0 3.394 4.547A9.238 9.238 0 0 0 12.33 21a9.238 9.238 0 0 0 5.377-1.729 9.363 9.363 0 0 0 3.393-4.547c-1.712 2.044-5.003 3.425-8.772 3.425Z" />
                  </svg>
                </span>
                <div><strong>JupyterLab</strong><small>Prototype models and analyze results</small></div>
              </div>
            </div>
          </div>

          {/* Group 2: Software Engineering */}
          <div className="tg">
            <div className="tg-head">
              <h3>Build the app</h3>
              <span>Skill 2 · Software Engineering</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#009688" d="M12 .0387C5.3729.0384.0003 5.3931 0 11.9988c-.001 6.6066 5.372 11.9628 12 11.9625 6.628.0003 12.001-5.3559 12-11.9625-.0003-6.6057-5.3729-11.9604-12-11.96m-.829 5.4153h7.55l-7.5805 5.3284h5.1828L5.279 18.5436q2.9466-6.5444 5.892-13.0896" />
                  </svg>
                </span>
                <div><strong>FastAPI</strong><small>Build high-speed RESTful microservices</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#61DAFB" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z" />
                  </svg>
                </span>
                <div><strong>React</strong><small>Build modern client-facing web screens</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                  </svg>
                </span>
                <div><strong>JavaScript</strong><small>Interactive logic and frontend APIs</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                  </svg>
                </span>
                <div><strong>HTML5 &amp; CSS3</strong><small>Accessible web layouts and components</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FF6C37" d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512z" />
                  </svg>
                </span>
                <div><strong>Postman</strong><small>Test and validate API contracts</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FF4B4B" d="M16.673 11.32l6.862-3.618c.233-.136.554.12.442.387L20.463 17.1zm-8.556-.229l3.473-5.187c.203-.328.578-.316.793-.028l7.886 11.75zm-3.375 7.25c-.28 0-.835-.284-.993-.716l-3.72-9.46c-.118-.331.139-.614.48-.464l19.474 10.306c-.149.147-.453.337-.72.334z" />
                  </svg>
                </span>
                <div><strong>Streamlit</strong><small>Rapid prototypes for client demonstrations</small></div>
              </div>
            </div>
          </div>

          {/* Group 3: AI & Analytics */}
          <div className="tg">
            <div className="tg-head">
              <h3>Add AI</h3>
              <span>Skill 3 · AI and Analytics</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true"><b>AI</b></span>
                <div><strong>OpenAI API</strong><small>Integrate frontier LLMs and embeddings</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#7FC8FF" d="M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z" />
                  </svg>
                </span>
                <div><strong>LangChain</strong><small>Connect LLMs to databases and vector search</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#7FC8FF" d="M5 19H10A5 5 0 115 14ZM19 14A5 5 0 1114 19H19ZM10 5A5 5 0 105 10V5ZM19 5V10A5 5 0 1014 5Z" />
                  </svg>
                </span>
                <div><strong>LangGraph</strong><small>Orchestrate multi-agent autonomous loops</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FF5A50" d="M12.482.18C7.161 1.319 1.478 9.069 1.426 15.372c-.051 5.527 3.1 8.68 8.68 8.627 6.716-.05 14.259-6.87 12.09-10.9-.672-1.292-1.396-1.344-2.687-.207-1.602 1.395-1.654.31-.207-2.893 1.757-3.98 1.705-5.322-.31-7.544C17.03.388 14.962-.388 12.482.181Z" />
                  </svg>
                </span>
                <div><strong>CrewAI</strong><small>Deploy specialized role-based agents</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FFD21E" d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378" />
                  </svg>
                </span>
                <div><strong>Hugging Face</strong><small>Pretrained open-source transformer models</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F7931E" d="M15.601 5.53c-1.91.035-3.981.91-5.63 2.56-2.93 2.93-2.083 8.53-1.088 9.525.805.804 6.595 1.843 9.526-1.088a9.74 9.74 0 0 0 .584-.643c.043-.292.205-.66.489-1.106a1.848 1.848 0 0 1-.537.176c-.144.265-.37.55-.676.855-.354.335-.607.554-.76.656a.795.795 0 0 1-.437.152c-.35 0-.514-.308-.494-.924-.22.316-.425.549-.612.7a.914.914 0 0 1-.578.224c-.194 0-.36-.09-.496-.273a1.03 1.03 0 0 1-.193-.507 4.016 4.016 0 0 1-.726.583c-.224.132-.47.197-.74.197-.3 0-.543-.096-.727-.288a.978.978 0 0 1-.257-.524v.004c-.3.276-.564.48-.79.611a1.295 1.295 0 0 1-.649.197.693.693 0 0 1-.571-.275c-.145-.183-.218-.43-.218-.739 0-.464.101-1.02.302-1.67.201-.65.445-1.25.733-1.797l.842-.312" />
                  </svg>
                </span>
                <div><strong>scikit-learn</strong><small>Predictive ML, classification &amp; regression</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#EE4C2C" d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z" />
                  </svg>
                </span>
                <div><strong>PyTorch</strong><small>Deep learning and embedding models</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#0194E2" d="M11.883.002a12.044 12.044 0 0 0-9.326 19.463l3.668-2.694A7.573 7.573 0 0 1 12.043 4.45v2.867l6.908-5.14A12.012 12.012 0 0 0 11.883.002zm9.562 4.533L17.777 7.23a7.573 7.573 0 0 1-5.818 12.322v-2.867l-6.908 5.14a12.046 12.046 0 0 0 16.394-17.29z" />
                  </svg>
                </span>
                <div><strong>MLflow</strong><small>Track experiments, parameters and model registry</small></div>
              </div>
            </div>
          </div>

          {/* Group 4: Deployment Engineering */}
          <div className="tg">
            <div className="tg-head">
              <h3>Put it live</h3>
              <span>Skill 4 · Deployment Engineering</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186" />
                  </svg>
                </span>
                <div><strong>Docker</strong><small>Containerize apps to run reliably anywhere</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#326CE5" d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606z" />
                  </svg>
                </span>
                <div><strong>Kubernetes</strong><small>Orchestrate multi-container fleets</small></div>
              </div>

              <div className="tool">
                <span className="tl dk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#FF9900" d="M12.91 16.482c-2.316 0-4.062-.832-5.184-2.476-.23-.338-.077-.732.32-.732.185 0 .346.092.461.246.907 1.23 2.37 1.83 4.403 1.83 2.032 0 3.325-.523 3.325-1.508 0-.892-.846-1.292-2.832-1.63-2.617-.462-4.757-1.14-4.757-3.418 0-2.062 1.955-3.325 4.71-3.325 2.016 0 3.633.677 4.603 2.016.2.277.062.647-.277.647-.17 0-.308-.077-.416-.216-.83-1.03-2.155-1.523-3.91-1.523-2.047 0-3.233.862-3.233 1.77 0 .862.908 1.246 2.94 1.6 2.663.477 4.65 1.154 4.65 3.448 0 2.217-1.924 3.367-4.8 3.367z" />
                  </svg>
                </span>
                <div><strong>AWS Cloud</strong><small>Host on EC2, ECS, S3 &amp; manage IAM security</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#E6522C" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6a8.4 8.4 0 110 16.8 8.4 8.4 0 010-16.8z" />
                  </svg>
                </span>
                <div><strong>Prometheus</strong><small>Collect telemetry &amp; latency metrics</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F46800" d="M23.02 10.59a8.578 8.578 0 0 0-.862-3.034 8.911 8.911 0 0 0-1.789-2.445c.337-1.342-.413-2.505-.413-2.505-1.292-.08-2.113.4-2.416.62-.052-.02-.102-.044-.154-.064-.22-.089-.446-.172-.677-.247-.231-.073-.47-.14-.711-.197a9.867 9.867 0 0 0-.875-.161C14.557.753 12.94 0 12.94 0c-1.804 1.145-2.147 2.744-2.147 2.744l-.018.093c-.098.029-.2.057-.298.088-.138.042-.275.094-.413.143-.138.055-.275.107-.41.166a8.869 8.869 0 0 0-1.557.87l-.063-.029c-2.497-.955-4.716.195-4.716.195-.203 2.658.996 4.33 1.235 4.636a11.608 11.608 0 0 0-.607 2.635C1.636 12.677.953 15.014.953 15.014c1.926 2.214 4.171 2.351 4.171 2.351.003-.002.006-.002.006-.005.285.509.615.994.986 1.446.156.19.32.371.488.548-.704 2.009.099 3.68.099 3.68 2.144.08 3.553-.937 3.849-1.173a9.784 9.784 0 0 0 3.164.501h.08l.055-.003.107-.002.103-.005.003.002c1.01 1.44 2.788 1.646 2.788 1.646 1.264-1.332 1.337-2.653 1.337-2.94v-.058c0-.02-.003-.039-.003-.06.265-.187.52-.387.758-.6a7.875 7.875 0 0 0 1.415-1.7c1.43.083 2.437-.885 2.437-.885-.236-1.49-1.085-2.216-1.264-2.354l-.018-.013-.016-.013a.217.217 0 0 1-.031-.02c.008-.092.016-.18.02-.27.011-.162.016-.323.016-.48v-.253l-.005-.098-.008-.135a1.891 1.891 0 0 0-.01-.13c-.003-.042-.008-.083-.013-.125l-.016-.124-.018-.122a6.215 6.215 0 0 0-2.032-3.73 6.015 6.015 0 0 0-3.222-1.46 6.292 6.292 0 0 0-.85-.048l-.107.002h-.063l-.044.003-.104.008a4.777 4.777 0 0 0-3.335 1.695c-.332.4-.592.84-.768 1.297a4.594 4.594 0 0 0-.312 1.817l.003.091c.005.055.007.11.013.164a3.615 3.615 0 0 0 .698 1.82 3.53 3.53 0 0 0 1.827 1.282c.33.098.66.14.971.137.039 0 .078 0 .114-.002l.063-.003c.02 0 .041-.003.062-.003.034-.002.065-.007.099-.01.007 0 .018-.003.028-.003l.031-.005.06-.008a1.18 1.18 0 0 0 .112-.02c.036-.008.072-.013.109-.024a2.634 2.634 0 0 0 .914-.415c.028-.02.056-.041.085-.065a.248.248 0 0 0 .039-.35.244.244 0 0 0-.309-.06l-.078.042c-.09.044-.184.083-.283.116a2.476 2.476 0 0 1-.475.096c-.028.003-.054.006-.083.006l-.083.002c-.026 0-.054 0-.08-.002l-.102-.006h-.012l-.024.006c-.016-.003-.031-.003-.044-.006-.031-.002-.06-.007-.091-.01a2.59 2.59 0 0 1-.724-.213 2.557 2.557 0 0 1-.667-.438 2.52 2.52 0 0 1-.805-1.475 2.306 2.306 0 0 1-.029-.444l.006-.122v-.023l.002-.031c.003-.021.003-.04.005-.06a3.163 3.163 0 0 1 1.352-2.29 3.12 3.12 0 0 1 .937-.43 2.946 2.946 0 0 1 .776-.101h.06l.07.002.045.003h.026l.07.005a4.041 4.041 0 0 1 1.635.49 3.94 3.94 0 0 1 1.602 1.662 3.77 3.77 0 0 1 .397 1.414l.005.076.003.075c.002.026.002.05.002.075 0 .024.003.052 0 .07v.065l-.002.073-.008.174a6.195 6.195 0 0 1-.08.639 5.1 5.1 0 0 1-.267.927 5.31 5.31 0 0 1-.624 1.13 5.052 5.052 0 0 1-3.237 2.014 4.82 4.82 0 0 1-.649.066l-.039.003h-.287a6.607 6.607 0 0 1-1.716-.265 6.776 6.776 0 0 1-3.4-2.274 6.75 6.75 0 0 1-.746-1.15 6.616 6.616 0 0 1-.714-2.596l-.005-.083-.002-.02v-.056l-.003-.073v-.096l-.003-.104v-.07l.003-.163c.008-.22.026-.45.054-.678a8.707 8.707 0 0 1 .28-1.355c.128-.444.286-.872.473-1.277a7.04 7.04 0 0 1 1.456-2.1 5.925 5.925 0 0 1 .953-.763c.169-.111.343-.213.524-.306.089-.05.182-.091.273-.135.047-.02.093-.042.138-.062a7.177 7.177 0 0 1 .714-.267l.145-.045c.049-.015.098-.026.148-.041.098-.029.197-.052.296-.076.049-.013.1-.02.15-.033l.15-.032.151-.028.076-.013.075-.01.153-.024c.057-.01.114-.013.171-.023l.169-.021c.036-.003.073-.008.106-.01l.073-.008.036-.003.042-.002c.057-.003.114-.008.171-.01l.086-.006h.023l.037-.003.145-.007a7.999 7.999 0 0 1 1.708.125 7.917 7.917 0 0 1 2.048.68 8.253 8.253 0 0 1 1.672 1.09l.09.077.089.078c.06.052.114.107.171.159.057.052.112.106.166.16.052.055.107.107.159.164a8.671 8.671 0 0 1 1.41 1.978c.012.026.028.052.04.078l.04.078.075.156c.023.051.05.1.07.153l.065.15a8.848 8.848 0 0 1 .45 1.34.19.19 0 0 0 .201.142.186.186 0 0 0 .172-.184c.01-.246.002-.532-.024-.856z" />
                  </svg>
                </span>
                <div><strong>Grafana</strong><small>Real-time system health and alert dashboards</small></div>
              </div>
            </div>
          </div>

          {/* Group 5: Client Delivery */}
          <div className="tg">
            <div className="tg-head">
              <h3>Work with the client</h3>
              <span>Skill 5 · Client Delivery and Business Consulting</span>
            </div>
            <div className="tgrid">
              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#0052CC" d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z" />
                  </svg>
                </span>
                <div><strong>Jira</strong><small>Track deliverables and agile sprints</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#000000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
                  </svg>
                </span>
                <div><strong>Notion</strong><small>Write runbooks, architecture &amp; handover docs</small></div>
              </div>

              <div className="tool">
                <span className="tl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <path fill="#F24E1E" d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
                  </svg>
                </span>
                <div><strong>Figma</strong><small>Wireframe client UI before coding</small></div>
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
            <h2>What Forward Deployed Engineers earn</h2>
            <p className="lead">FDE is one of the best-paid engineering roles because it mixes coding, AI, and client work. These are reported figures for the role, showing where you can grow to.</p>
          </div>

          <div className="big">
            <div>
              <small>India · Entry Level</small>
              <b>₹18–28 LPA</b>
              <span>Reported range for 0–2 years, depending on the employer type.</span>
            </div>
            <div>
              <small>India · Senior Level</small>
              <b>₹55 LPA–1.5 Cr</b>
              <span>Reported range for 6+ years at global AI companies and multinationals.</span>
            </div>
            <div>
              <small>United States · Median</small>
              <b>$225,000</b>
              <span>Median total pay a year. The top 10% earn $380,000 or more.</span>
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
                <td>India, Indian AI company</td>
                <td>Entry to mid</td>
                <td className="n">₹18–28 LPA</td>
              </tr>
              <tr>
                <td>India, multinational with an India centre</td>
                <td>Entry · Mid · Senior</td>
                <td className="n">₹22–35 · ₹35–55 · ₹55–80 LPA</td>
              </tr>
              <tr>
                <td>India, global AI company</td>
                <td>Entry · Mid · Senior</td>
                <td className="n">₹35–55 · ₹55–90 LPA · ₹90 LPA–1.5 Cr</td>
              </tr>
              <tr>
                <td>United States, all companies</td>
                <td>25th · median · 75th percentile</td>
                <td className="n">$175K · $225K · $321K a year</td>
              </tr>
            </tbody>
          </table>

          <p className="pnote">
            Sources: US figures from Levels.fyi. India ranges are reported by FDE Interviews and industry recruitment benchmarks. Most freshers start at the lower end and move up with real project experience.
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
            <h2>Career options after learning FDE</h2>
            <p className="lead">The FDE skill mix opens many doors. You can stay in the role and grow, or move to a related one.</p>
          </div>

          <div className="careers">
            <article>
              <span className="tag">Start here</span>
              <h3>Forward Deployed Engineer</h3>
              <p>Work directly with enterprise clients, build and deploy custom solutions.</p>
            </article>
            <article>
              <span className="tag">Related role</span>
              <h3>Applied AI Engineer</h3>
              <p>Build generative AI features, agents and RAG inside a company&#39;s product.</p>
            </article>
            <article>
              <span className="tag">Related role</span>
              <h3>AI Solutions Engineer</h3>
              <p>Show clients what AI can do for them and design the solution architecture.</p>
            </article>
            <article>
              <span className="tag">Related role</span>
              <h3>Data &amp; Systems Engineer</h3>
              <p>Build the pipelines and databases that carry clean data into live models.</p>
            </article>
            <article>
              <span className="tag">Related role</span>
              <h3>Full-stack or Backend Engineer</h3>
              <p>Build the APIs, screens, and distributed microservices behind a product.</p>
            </article>
            <article>
              <span className="tag">Grow into</span>
              <h3>Technical Consultant or PM</h3>
              <p>Lead what gets built, because you already know client needs and delivery constraints.</p>
            </article>
            <article>
              <span className="tag">Grow into</span>
              <h3>Engineering Lead or Architect</h3>
              <p>Guide multidisciplinary teams and make big structural system decisions.</p>
            </article>
            <article>
              <span className="tag">Your own path</span>
              <h3>Start your own AI services company</h3>
              <p>Do for multiple enterprise clients what you learned to deliver for one.</p>
            </article>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------
          SECTION 10: WHO CAN BECOME AN FDE
          ------------------------------------------------------------------------- */}
      <section className="who">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Who can become an FDE</span>
            <h2>You can come from many starting points</h2>
            <p className="lead">
              What matters is the willingness to learn the missing parts. If you code but have never talked to a client, practise consulting. If you analyse data but have never deployed anything, learn how to put an app live.
            </p>
          </div>
          <div className="who-grid">
            <div>
              <b>Software and Data Engineers</b>
              <span>who enjoy talking to users and want to own the business outcome end-to-end.</span>
            </div>
            <div>
              <b>Data &amp; BI Analysts</b>
              <span>who want to build, deploy, and ship live applications, not only static reports.</span>
            </div>
            <div>
              <b>Consultants &amp; Domain Experts</b>
              <span>who want to become technical and build the exact AI solutions they recommend.</span>
            </div>
            <div>
              <b>Students &amp; Freshers</b>
              <span>who want to learn the full lifecycle of a real project and stand out in interviews.</span>
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
              <dt>FDE</dt>
              <dd>Forward Deployed Engineer. An engineer who goes to the client, understands their real problem, and builds a live solution on their data.</dd>
            </div>
            <div>
              <dt>RAG (Retrieval-Augmented Generation)</dt>
              <dd>Letting an AI search private company documents before answering, grounding responses in verified facts and eliminating hallucinations.</dd>
            </div>
            <div>
              <dt>Agentic AI &amp; LangGraph</dt>
              <dd>An AI helper that can execute sequential steps independently, such as querying a database and notifying a team, instead of just chatting.</dd>
            </div>
            <div>
              <dt>API (Application Programming Interface)</dt>
              <dd>A secure doorway that allows user-facing web screens or mobile applications to communicate directly with backend AI models.</dd>
            </div>
            <div>
              <dt>Docker Container</dt>
              <dd>A lightweight, self-contained box with all code, libraries, and dependencies bundled together so software runs identically everywhere.</dd>
            </div>
            <div>
              <dt>CI/CD</dt>
              <dd>Automated safety checks that test, build, and deploy new model updates automatically without manual downtime or configuration errors.</dd>
            </div>
            <div>
              <dt>Vector Database</dt>
              <dd>A specialized database (like ChromaDB or PGVector) that indexes text by its semantic meaning rather than simple exact keyword matches.</dd>
            </div>
            <div>
              <dt>Observability</dt>
              <dd>Real-time telemetry and dashboarding (Prometheus &amp; Grafana) that monitors server health, model latency, and accuracy drift.</dd>
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
            <h2>Forward Deployed Engineering questions, answered</h2>
          </div>

          <details className="q" open>
            <summary>What is a Forward Deployed Engineer (FDE)?</summary>
            <p>
              A Forward Deployed Engineer is an engineer who works directly with a client, understands their real problem, and builds a working solution on the client&#39;s own data. An FDE goes from the first conversation to a live product.
            </p>
          </details>

          <details className="q">
            <summary>Why are companies hiring FDEs?</summary>
            <p>
              AI and data products rarely work the day a customer buys them. The customer&#39;s data, systems and rules are different. An FDE fits the product to that reality, so the project does not stall.
            </p>
          </details>

          <details className="q">
            <summary>Will AI replace Forward Deployed Engineers?</summary>
            <p>
              AI will change the work, but AI cannot sit with a client, judge whether its own output is right, and take responsibility for it going live. Those are the core of the FDE job. The coding part gets faster with AI, making an FDE far more productive.
            </p>
          </details>

          <details className="q">
            <summary>What skills do I need to become an FDE?</summary>
            <p>
              Five groups of skills: Data and Programming, Software Engineering, AI and Analytics, Deployment Engineering, and Client Delivery and Business Consulting. You need working skill in each and more depth in the one you enjoy most.
            </p>
          </details>

          <details className="q">
            <summary>How is an FDE different from a standard software engineer?</summary>
            <p>
              A software engineer usually builds one product for many customers behind tickets. An FDE works on one customer&#39;s problem and uses many skills: data, software, AI, deployment, and client communication. An FDE owns the whole outcome.
            </p>
          </details>

          <details className="q">
            <summary>Can a fresher become a Forward Deployed Engineer?</summary>
            <p>
              The role is usually a step up from a first technical role, but you can start building the skills and projects now. Begin with Python, SQL and Git, then build projects from raw data to a live app.
            </p>
          </details>

          <details className="q">
            <summary>What does an FDE earn?</summary>
            <p>
              Reported US median total pay is about $225,000 a year (Levels.fyi). In India, reported ranges start around ₹18–28 LPA at entry level and reach ₹55 LPA to ₹1.5 crore for senior roles, depending on the employer.
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
            <h2>Master AI Forward Deployment Engineering (FDE)</h2>
            <p className="lead" style={{ marginTop: '14px' }}>
              Bridge the critical gap between foundation AI models and real enterprise revenue. Learn to architect, containerize, and ship end-to-end GenAI applications on client infrastructure.
            </p>

            <ul className="build">
              <li>Deploy high-throughput LLMs with vLLM, Ollama, and Triton inference servers</li>
              <li>Engineer production RAG architectures with hybrid search, rerankers, and vector DBs</li>
              <li>Containerize microservices with Docker, deploy to Kubernetes, and configure CI/CD</li>
              <li>Present live POCs directly to client executives and lead production field rollouts</li>
            </ul>

            <div className="stack">
              <span>LangChain</span>
              <span>LlamaIndex</span>
              <span>FastAPI</span>
              <span>Docker</span>
              <span>Kubernetes</span>
              <span>Vector DBs</span>
              <span>vLLM</span>
              <span>MLflow</span>
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
          <div className="join-form-wrapper" id="fde-lead-form">
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
                    <h3>Register for FDE</h3>
                    <p>Reserve your seat for the AI Forward Deployment Engineer batch.</p>
                  </div>

                  {formError && <div className="lp-form-error-banner">{formError}</div>}

                  <div className="lp-form-field">
                    <label className="lp-form-label">Full Name *</label>
                    <input
                      type="text"
                      className="lp-form-input"
                      placeholder="e.g. Rahul Sharma"
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
                        placeholder="e.g. rahul@example.com"
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
                        value="FDE (AI Forward Deployment Engineer)"
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
            © {new Date().getFullYear()} DV Analytics. All rights reserved. Master Program in AI Forward Deployment Engineer (FDE).
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
