import React, { useState, useEffect } from 'react';
import './FdeWorkshopPage.css';
import { Footer } from './Footer';

interface FdeWorkshopPageProps {
  onNavigateHome?: () => void;
}

const WORKSHOP_DATE = 'October 15, 2026';
const WORKSHOP_TIME = '7:00 PM - 9:00 PM IST (2 Hours)';
const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/BoI03qzI1WU0nbtgYlvqi5';

const SALARY_ROLES_DATA = [
  {
    title: 'AI Solutions Engineer',
    shortTitle: 'AI Solutions Eng',
    badge: null,
    badgeType: '',
    desc: 'Translating business workflows into reliable custom GenAI applications',
    fresher: { label: '0–3 Yrs', text: '₹10–20 LPA', min: 10, max: 20 },
    mid: { label: '4–8 Yrs', text: '₹22–42 LPA', min: 22, max: 42 },
    high: { label: '8+ Yrs', text: '₹45 LPA – ₹1.0 Cr+', min: 45, max: 100 },
    maxText: '₹1.0 Cr+',
    highlight: false,
  },
  {
    title: 'Cloud AI Engineer',
    shortTitle: 'Cloud AI Eng',
    badge: null,
    badgeType: '',
    desc: 'Deploying microservices on AWS, Docker, Kubernetes & message queues',
    fresher: { label: '0–3 Yrs', text: '₹12–22 LPA', min: 12, max: 22 },
    mid: { label: '4–8 Yrs', text: '₹25–48 LPA', min: 25, max: 48 },
    high: { label: '8+ Yrs', text: '₹52 LPA – ₹1.0 Cr+', min: 52, max: 100 },
    maxText: '₹1.0 Cr+',
    highlight: false,
  },
  {
    title: 'MLOps / LLMOps Engineer',
    shortTitle: 'MLOps / LLMOps',
    badge: 'High Demand',
    badgeType: 'demand',
    desc: 'Continuous AI deployment, latency optimization, cost control & safety guardrails',
    fresher: { label: '0–3 Yrs', text: '₹15–25 LPA', min: 15, max: 25 },
    mid: { label: '4–8 Yrs', text: '₹30–58 LPA', min: 30, max: 58 },
    high: { label: '8+ Yrs', text: '₹65 LPA – ₹1.05 Cr+', min: 65, max: 105 },
    maxText: '₹1.05 Cr+',
    highlight: false,
  },
  {
    title: 'Forward Deployed Engineer (FDE)',
    shortTitle: 'FDE (Core Role)',
    badge: 'Core Role',
    badgeType: 'core',
    desc: 'Combining client discovery, software engineering, AI agents & cloud deployment',
    fresher: { label: '0–3 Yrs', text: '₹14–24 LPA', min: 14, max: 24 },
    mid: { label: '4–8 Yrs', text: '₹28–55 LPA', min: 28, max: 55 },
    high: { label: '8+ Yrs', text: '₹60 LPA – ₹1.1 Cr+', min: 60, max: 110 },
    maxText: '₹1.1 Cr+',
    highlight: true,
  },
  {
    title: 'AI Technical Consultant',
    shortTitle: 'AI Consultant',
    badge: 'High Demand',
    badgeType: 'demand',
    desc: 'Guiding client stakeholders on technical feasibility, scoping & project roadmaps',
    fresher: { label: '0–3 Yrs', text: '₹15–26 LPA', min: 15, max: 26 },
    mid: { label: '4–8 Yrs', text: '₹30–55 LPA', min: 30, max: 55 },
    high: { label: '8+ Yrs', text: '₹60 LPA – ₹1.15 Cr+', min: 60, max: 115 },
    maxText: '₹1.15 Cr+',
    highlight: false,
  },
  {
    title: 'Enterprise AI Architect',
    shortTitle: 'AI Architect',
    badge: 'Top Role',
    badgeType: 'top',
    desc: 'End-to-end AI infrastructure, cloud architecture & enterprise solution design',
    fresher: { label: '0–3 Yrs', text: '₹18–30 LPA', min: 18, max: 30 },
    mid: { label: '4–8 Yrs', text: '₹35–65 LPA', min: 35, max: 65 },
    high: { label: '8+ Yrs', text: '₹70 LPA – ₹1.2 Cr+', min: 70, max: 120 },
    maxText: '₹1.2 Cr+',
    highlight: true,
  },
];

export const FdeWorkshopPage: React.FC<FdeWorkshopPageProps> = ({ onNavigateHome }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(3);

  // Live Countdown to October 15, 2026 at 7:00 PM IST
  const [timeLeft, setTimeLeft] = useState(() => {
    const targetDate = new Date('2026-10-15T19:00:00+05:30').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-15T19:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fde-workshop-container">
      {/* Fixed Top Header */}
      <header className="fde-workshop-header">
        <div className="fde-header-inner">
          <div className="fde-brand" onClick={onNavigateHome} style={{ cursor: onNavigateHome ? 'pointer' : 'default' }}>
            <img src="/logo.png" alt="DV Analytics Logo" className="fde-brand-logo" />
          </div>
          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fde-btn-header"
          >
            Join our insider community
          </a>
        </div>
      </header>

      {/* Hero Section: Two-Column Split (Poster Left, Countdown & Join Panel Right) */}
      <section className="fde-hero-split-section">
        <div className="fde-hero-split-container">
          {/* Left Column: Original High-Res Poster */}
          <div className="fde-split-poster-col">
            <div className="fde-split-poster-wrapper">
              <img
                src="/fde-workshop-poster.png?v=10"
                alt="AI Forward Deployment Engineer Workshop"
                className="fde-split-poster-img"
              />
            </div>
          </div>

          {/* Right Column: Countdown & WhatsApp Join Panel */}
          <div className="fde-split-form-col">
            <div id="fde-registration-panel" className="fde-registration-panel fde-countdown-panel">
              <div className="fde-panel-badge">NEXT WORKSHOP COUNTDOWN</div>
              <h3 className="fde-panel-title">FDE Live Workshop</h3>
              <p className="fde-panel-schedule">{WORKSHOP_DATE} • {WORKSHOP_TIME}</p>

              {/* Live Countdown Timer Grid */}
              <div className="fde-panel-timer-wrapper">
                <div className="fde-timer-grid">
                  <div className="fde-timer-box">
                    <div className="fde-timer-number">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="fde-timer-unit">Days</div>
                  </div>
                  <div className="fde-timer-box">
                    <div className="fde-timer-number">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="fde-timer-unit">Hours</div>
                  </div>
                  <div className="fde-timer-box">
                    <div className="fde-timer-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="fde-timer-unit">Mins</div>
                  </div>
                  <div className="fde-timer-box">
                    <div className="fde-timer-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="fde-timer-unit">Secs</div>
                  </div>
                </div>
              </div>

              <p className="fde-panel-desc">
                No registration required! Join our exclusive WhatsApp insider community for direct workshop access links & live updates.
              </p>

              {/* Join CTA Button Below Countdown */}
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="fde-btn-join-community"
              >
                Join our insider community
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Title, Details & Content Below Poster */}
      <section className="fde-hero-details-section">
        <div className="fde-hero-details-container">
          <div className="fde-tag-pill">EXCLUSIVE CAREER & TECH WORKSHOP</div>
          <h1 className="fde-hero-title">
            AI writes code today. It still can't sit with a client and figure out what they actually need.
          </h1>
          <p className="fde-hero-subtitle">
            Everyone is asking: "Will AI take my job?" Discover why the Forward Deployed Engineer (FDE) is the one engineering role built on what AI cannot replace — combining 50% Client Consulting, 30% Engineering & Infrastructure, and 20% Applied AI.
          </p>



          <div className="fde-meta-grid">
            <div className="fde-meta-item">
              <label>Duration</label>
              <strong>{WORKSHOP_TIME}</strong>
            </div>
            <div className="fde-meta-item">
              <label>Date</label>
              <strong>{WORKSHOP_DATE}</strong>
            </div>
            <div className="fde-meta-item">
              <label>Format</label>
              <strong>Live Interactive Online</strong>
            </div>
          </div>
        </div>
      </section>

      {/* What is FDE & Why It Came Section */}
      <section className="fde-what-is-section">
        <div className="fde-section-header">
          <div className="fde-badge">THE INDUSTRY PARADIGM SHIFT</div>
          <h2>What is a Forward Deployed Engineer (FDE) & Why Did It Emerge?</h2>
          <p>
            Understand the rapid evolution of software engineering in the era of Generative AI and enterprise digital transformation.
          </p>
        </div>

        <div className="fde-what-is-grid">
          <div className="fde-what-box definition-box">
            <h3>What is a Forward Deployed Engineer?</h3>
            <p>
              Popularized by tech pioneers like Palantir, OpenAI, and enterprise AI leaders, a <strong>Forward Deployed Engineer (FDE)</strong> is a high-impact technical role positioned directly at the client frontline.
            </p>
            <p>
              Instead of sitting in a back-office writing isolated code against rigid Jira tickets, an FDE embeds with client business teams, discovers unarticulated pain points, architects streaming data & AI infrastructure, and ships working production software directly into operations.
            </p>
          </div>

          <div className="fde-what-box why-box">
            <h3>Why Did the FDE Role Emerge?</h3>
            <div className="fde-why-reasons">
              <div className="fde-reason-item">
                <span className="fde-reason-num">01</span>
                <div>
                  <h4>The Enterprise AI Bottleneck</h4>
                  <p>Powerful AI models exist, but enterprises struggle to plug them into legacy databases, live Kafka data streams, and secure cloud environments. FDEs turn raw AI models into production products.</p>
                </div>
              </div>
              <div className="fde-reason-item">
                <span className="fde-reason-num">02</span>
                <div>
                  <h4>AI Automated Routine Coding</h4>
                  <p>LLMs write boilerplate code instantly. What AI cannot do is sit with client leadership, ask strategic discovery questions, navigate organizational constraints, and define system architecture.</p>
                </div>
              </div>
              <div className="fde-reason-item">
                <span className="fde-reason-num">03</span>
                <div>
                  <h4>Shift From Slide Decks to Working Code</h4>
                  <p>Modern enterprises no longer pay millions for static consulting reports. They demand working AI prototypes in days and production pipelines in weeks, creating massive demand for hands-on technical consultants.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison: Traditional vs FDE */}
        <div className="fde-comparison-container">
          <h3 className="fde-comparison-title">Traditional Software Engineer vs. Forward Deployed Engineer</h3>
          <div className="fde-comparison-grid">
            <div className="fde-comparison-card traditional">
              <div className="fde-comp-header">Traditional Software Engineer</div>
              <ul>
                <li>Operates behind Jira backlogs and fixed sprint tickets</li>
                <li>Limited or zero interaction with end-user business clients</li>
                <li>Focuses purely on code syntax, unit tests, and internal components</li>
                <li>High risk of routine coding tasks being automated by Generative AI</li>
              </ul>
            </div>
            <div className="fde-comparison-card fde-hero-card">
              <div className="fde-comp-header">Forward Deployed Engineer (FDE)</div>
              <ul>
                <li>Embedded at the client frontline to define real business problems</li>
                <li>Combines 50% Client Consulting, 30% Engineering, and 20% Applied AI</li>
                <li>Ships end-to-end data pipelines, multi-agent systems, and cloud APIs</li>
                <li>AI-proof career path commanding top-tier market compensation (₹1 Cr+)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FDE Market Demand & Compensation Section (Symmetrical 50-50 Cards Layout) */}
      <section id="demand" className="fde-market-light-section">
        <div className="fde-market-light-container">
          <div className="fde-section-header">
            <div className="fde-badge">HIGH MARKET DEMAND & CAREER OUTLOOK</div>
            <h2>Why Forward Deployment Engineers (FDE) Are AI-Proof & Highly Paid</h2>
            <p>
              An AI model in a notebook is not a product. Enterprise clients pay top compensation for engineers who can translate ambiguous business needs, build real-time streaming data pipelines, deploy multi-agent systems, and operate production cloud software.
            </p>
          </div>

          <div className="fde-market-split-grid">
            {/* Left Card: Market Insights & Stats */}
            <div className="fde-info-card">
              <div className="fde-card-header-meta">
                <span className="card-sub-label">MARKET INSIGHTS & DEMAND</span>
                <h4 className="card-big-metric">AI is Redefining Software Engineering</h4>
              </div>

              <div className="fde-stat-list">
                <div className="fde-stat-item">
                  <span className="light-blue-dot"></span>
                  <div className="fde-stat-content">
                    <h3>₹1.2 Cr+ Peak Compensation</h3>
                    <p>Enterprise AI Architects & FDEs command top 1% global market salary packages</p>
                  </div>
                </div>

                <div className="fde-stat-item">
                  <span className="light-blue-dot"></span>
                  <div className="fde-stat-content">
                    <h3>67% Rise in AI Skills Demand</h3>
                    <p>Engineering roles now mandate GenAI, LangChain, Kafka & LLMOps expertise</p>
                  </div>
                </div>

                <div className="fde-stat-item">
                  <span className="light-blue-dot"></span>
                  <div className="fde-stat-content">
                    <h3>80% Growth in 3 Years</h3>
                    <p>Forward Deployed Engineers are replacing routine back-office coding roles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Salary & Skill Trajectory Graph Visualizer */}
            <div className="fde-light-graph-card">
              <div className="fde-card-header-meta">
                <span className="card-sub-label">SALARY & SKILL TRAJECTORY</span>
                <h4 className="card-big-metric">
                  {SALARY_ROLES_DATA[hoveredIndex ?? 3].title} ({SALARY_ROLES_DATA[hoveredIndex ?? 3].maxText})
                </h4>
              </div>

              {/* Compact SVG Chart */}
              <div className="fde-light-chart-area">
                <svg className="fde-light-svg" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="lightOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ea580c" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#fff7ed" stopOpacity="0.0" />
                    </linearGradient>

                    <linearGradient id="lightBarGrey" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
                    </linearGradient>

                    <linearGradient id="lightBarOrange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ea580c" stopOpacity="1" />
                      <stop offset="100%" stopColor="#c2410c" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>

                  {/* Rising Area Fill */}
                  <path
                    d="M 75,140 C 175,125 275,85 395,35 L 395,160 L 75,160 Z"
                    fill="url(#lightOrangeGrad)"
                  />

                  {/* Rising Spline Curve Line */}
                  <path
                    d="M 75,140 C 175,125 275,85 395,35"
                    stroke="#ea580c"
                    strokeWidth="3"
                    fill="none"
                  />

                  {/* 3 Compact Vertical Range Bars */}
                  {/* Bar 1: Fresher (0-3 Yrs) */}
                  <rect x="60" y="120" width="30" height="40" rx="4" fill="url(#lightBarGrey)" />

                  {/* Bar 2: Mid Level (4-8 Yrs) */}
                  <rect x="219" y="80" width="32" height="80" rx="4" fill="url(#lightBarGrey)" />

                  {/* Bar 3: High Exp (8+ Yrs ₹1.2 Cr+) */}
                  <rect x="379" y="35" width="32" height="125" rx="4" fill="url(#lightBarOrange)" />

                  {/* Baseline */}
                  <line x1="30" y1="160" x2="470" y2="160" stroke="#cbd5e1" strokeWidth="1" />

                  {/* Labels below bars */}
                  <text x="75" y="180" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">Fresher (0–3 Yrs)</text>
                  <text x="235" y="180" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">Mid Level (4–8 Yrs)</text>
                  <text x="395" y="180" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="800">High Exp (8+ Yrs)</text>

                  {/* Top Salary Value Callouts */}
                  <text x="75" y="110" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="800">{SALARY_ROLES_DATA[hoveredIndex ?? 3].fresher.text}</text>
                  <text x="235" y="70" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="800">{SALARY_ROLES_DATA[hoveredIndex ?? 3].mid.text}</text>
                  <text x="395" y="24" textAnchor="middle" fill="#ea580c" fontSize="11" fontWeight="900">{SALARY_ROLES_DATA[hoveredIndex ?? 3].high.text}</text>
                </svg>
              </div>

              {/* Role Selector Pills */}
              <div className="fde-light-roles-list">
                {SALARY_ROLES_DATA.map((role, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`fde-light-pill ${(hoveredIndex ?? 3) === idx ? 'active' : ''}`}
                    onClick={() => setHoveredIndex(idx)}
                  >
                    <span>{role.shortTitle}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fde-market-callout">
          <div className="fde-callout-text">
            <h4>The FDE Skill Breakdown (50% Consulting + 30% Engineering + 20% Applied AI)</h4>
            <p>
              AI writes code fast, but a brilliant engineer who skips discovery builds the wrong thing. FDEs sit face-to-face with clients, translate vague problems into technical specifications, and ship working software that solves real business bottlenecks.
            </p>
          </div>
        </div>
      </section>



      {/* 2-Hour Intensive Workshop Agenda */}
      <section className="fde-highlights-section">
        <div className="fde-section-header">
          <div className="fde-badge">2-HOUR WORKSHOP AGENDA</div>
          <h2>Inside the 2-Hour Intensive FDE Roadmap</h2>
          <p>A structured, practical breakdown condensed from our comprehensive engineering curriculum.</p>
        </div>

        <div className="fde-cards-grid">
          <div className="fde-highlight-card">
            <div className="fde-card-num">PART 01</div>
            <h3>FDE Mindset, Discovery & Scoping</h3>
            <ul>
              <li>The 5 Core FDE Pillars: Consulting, Data, AI, Software Engineering & Cloud</li>
              <li>The 7-Step FDE Lifecycle: Discover, Translate, Design, Prototype, Deploy, Operate, Deliver</li>
              <li>Ten essential discovery questions to turn vague client asks into a technical plan</li>
              <li>Live demo: Where AI tools excel vs. where human business judgment is mandatory</li>
            </ul>
          </div>

          <div className="fde-highlight-card">
            <div className="fde-card-num">PART 02</div>
            <h3>Real-Time Data & Multi-Agent AI</h3>
            <ul>
              <li>Architecting streaming pipelines with Apache Kafka, Python & PostgreSQL</li>
              <li>Building event-driven multi-agent systems with LangChain & LangGraph</li>
              <li>RAG & Live Data: Combining document retrieval with real-time API lookups</li>
              <li>Handling agent failures, latency limits, guardrails & human-in-the-loop approvals</li>
            </ul>
          </div>

          <div className="fde-highlight-card">
            <div className="fde-card-num">PART 03</div>
            <h3>Backend APIs & Containerization</h3>
            <ul>
              <li>Exposing AI workflows as production async APIs using FastAPI & Pydantic</li>
              <li>Streaming intermediate agent progress to frontend apps with WebSockets & SSE</li>
              <li>Docker & Compose: Packaging API, Kafka, and Database into one command</li>
              <li>Clean Git/GitHub workflows, pull request reviews & client code safety</li>
            </ul>
          </div>

          <div className="fde-highlight-card">
            <div className="fde-card-num">PART 04</div>
            <h3>CI/CD, Kubernetes & Live Operations</h3>
            <ul>
              <li>Automated testing, container building & deployment with GitHub Actions</li>
              <li>Zero-downtime Kubernetes releases, self-healing pods & canary deployments</li>
              <li>Monitoring AI metrics: latency (p95), match success rates, token costs & Grafana alerts</li>
              <li>Client project handover, runbooks, architecture documentation & your FDE career path</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What You Will Be Able To Do */}
      <section className="fde-outcomes-section">
        <div className="fde-section-header">
          <div className="fde-badge">PRACTICAL LEARNING OUTCOMES</div>
          <h2>What You Will Be Able To Do After 2 Hours</h2>
        </div>

        <div className="fde-outcomes-grid">
          <div className="fde-outcome-card">
            <h4>Run a Client Discovery Call</h4>
            <p>Confidently ask the right 10 discovery questions and draft a one-page technical specification a client agrees to.</p>
          </div>

          <div className="fde-outcome-card">
            <h4>Design Multi-Agent Systems</h4>
            <p>Understand how to orchestrate autonomous AI agent teams that react to live data without hallucinating.</p>
          </div>

          <div className="fde-outcome-card">
            <h4>Containerize Full-Stack AI Apps</h4>
            <p>Package APIs, databases, streaming queues, and AI models into Docker containers that run on any machine.</p>
          </div>

          <div className="fde-outcome-card">
            <h4>Evaluate Your FDE Career Path</h4>
            <p>Benchmark your current skills across the 5 FDE pillars and identify the exact technical gaps to close first.</p>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="fde-certificate-section">
        <div className="fde-certificate-container">
          <div className="fde-certificate-content">
            <div className="fde-badge">OFFICIAL CERTIFICATION</div>
            <h2>Get Certified in AI Forward Deployment Engineering</h2>
            <p className="fde-cert-subtitle">
              Receive an official DV Analytics Certificate of Completion upon attending the 2-hour live workshop session.
            </p>

            <div className="fde-cert-pill-list">
              <span className="fde-cert-pill">✓ Shareable on LinkedIn &amp; Resume</span>
              <span className="fde-cert-pill">✓ 100% Free for Attendees</span>
              <span className="fde-cert-pill">✓ Industry Recognized Chops</span>
            </div>

            <div className="fde-cert-cta">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="fde-btn-join-community"
              >
                Join community to get certified
              </a>
            </div>
          </div>

          <div className="fde-certificate-preview">
            <div className="fde-cert-mock-card">
              {/* Blurred Certificate Design inside */}
              <div className="fde-cert-mock-inner">
                <div className="fde-cert-mock-header">
                  <img src="/logo.png" alt="DV Analytics Logo" className="fde-cert-mock-logo" />
                  <span className="fde-cert-mock-code">CREDENTIAL ID: DVA-FDE-2026</span>
                </div>

                <div className="fde-cert-mock-title">CERTIFICATE OF COMPLETION</div>
                <div className="fde-cert-mock-sub">PROUDLY PRESENTED TO</div>
                <div className="fde-cert-mock-name">[ Your Name Here ]</div>

                <p className="fde-cert-mock-text">
                  For successfully participating in the <strong>AI Forward Deployment Engineer (FDE) Live Workshop</strong> covering LLMs, RAG, Multi-Agent AI Systems, and Cloud Infrastructure Deployment.
                </p>

                <div className="fde-cert-mock-footer">
                  <div className="fde-cert-signature-box">
                    <span className="fde-sig-line">Dr. Debendra Das</span>
                    <span className="fde-sig-title">Director, DV Analytics</span>
                  </div>

                  <div className="fde-cert-seal">
                    <span className="fde-seal-star">★</span>
                    <span className="fde-seal-text">DV APPROVED</span>
                  </div>
                </div>
              </div>

              {/* Lock Overlay */}
              <div className="fde-cert-lock-overlay">
                <div className="fde-simple-lock-badge" aria-label="Locked certificate">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="fde-audience-section">
        <div className="fde-section-header">
          <div className="fde-badge">WHO SHOULD ATTEND</div>
          <h2>Is This Workshop Right For You?</h2>
        </div>

        <div className="fde-audience-grid">
          <div className="fde-audience-card">
            <h4>Software Engineers & Developers</h4>
            <p>Extend your engineering foundations into client consulting, AI agents, RAG, and production cloud deployment.</p>
          </div>
          <div className="fde-audience-card">
            <h4>Data Scientists & Analysts</h4>
            <p>Move beyond notebooks and model training into streaming data pipelines, REST APIs, and client solution delivery.</p>
          </div>
          <div className="fde-audience-card">
            <h4>DevOps & Cloud Engineers</h4>
            <p>Add AI infrastructure, LLMOps, guardrails, containerized microservices, and monitoring to your cloud stack.</p>
          </div>
          <div className="fde-audience-card">
            <h4>Freshers & Tech Aspirants</h4>
            <p>Gain absolute clarity on the 5 FDE pillars and understand the exact roadmap required for high-paying AI engineering roles.</p>
          </div>
        </div>
      </section>



      {/* Main Website Footer */}
      <Footer />
    </div>
  );
};

