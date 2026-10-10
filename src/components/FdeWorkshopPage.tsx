import React, { useState, useEffect } from 'react';
import './FdeWorkshopPage.css';
import { Footer } from './Footer';
import { appendAttributionToPayload, trackEvent } from '../utils/analytics';

interface FdeWorkshopPageProps {
  onNavigateHome?: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
};

const WORKSHOP_NAME = 'FDE';
const WORKSHOP_DATE = 'October 15, 2026';
const WORKSHOP_TIME = '7:00 PM - 9:00 PM IST (2 Hours)';
const CRM_ELEMENTOR_WEBHOOK_URL = 'https://crm.dvanalyticsmds.in/api/webhook/elementor-lead';
const COUNTRY_CODE = '+91';

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

// Helper functions for Smooth Bezier Curve SVG Generation


export const FdeWorkshopPage: React.FC<FdeWorkshopPageProps> = ({ onNavigateHome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappOptin, setWhatsappOptin] = useState(true);
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

  const openRegisterModal = () => {
    const el = document.getElementById('fde-registration-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const phoneInput = document.getElementById('fde-reg-phone') as HTMLInputElement | null;
      if (phoneInput) phoneInput.focus();
    } else {
      setIsModalOpen(true);
    }
  };

  const closeRegisterModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const now = new Date();
      const payload = new URLSearchParams();
      payload.set('form_id', 'dv_website_workshop_fde');
      payload.set('form_name', 'DV Website Workshop Registration - FDE');
      payload.set('lead_type', 'workshop');
      payload.set('intent', 'workshop_registration');
      payload.set('source_type', 'website');
      payload.set('pipeline', 'workshop');
      payload.set('name', formData.name.trim());
      payload.set('email', formData.email.trim());
      payload.set('phone', `${COUNTRY_CODE} ${formData.phone.trim()}`);
      payload.set('whatsapp_optin', whatsappOptin ? 'yes' : 'no');
      payload.set('course', 'AI Forward Deployment Engineer (FDE)');
      payload.set('workshop', 'AI Forward Deployment Engineer Workshop');
      payload.set('page_url', window.location.href);
      appendAttributionToPayload(payload);
      payload.set('date', now.toISOString().slice(0, 10));
      payload.set('time', now.toISOString().slice(11, 19));
      payload.set('user_agent', window.navigator.userAgent);
      payload.set('powered_by', 'DV Analytics website');

      if (CRM_ELEMENTOR_WEBHOOK_URL) {
        await fetch(CRM_ELEMENTOR_WEBHOOK_URL, {
          method: 'POST',
          body: payload,
        }).catch((err) => console.warn('CRM webhook submission error:', err));
      }

      setIsSubmitted(true);
      trackEvent('submit_workshop_registration', {
        workshop: WORKSHOP_NAME,
        phone: `${COUNTRY_CODE} ${formData.phone.trim()}`,
      });
    } catch (err) {
      console.error('Registration submit error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fde-workshop-container">
      {/* Fixed Top Header */}
      <header className="fde-workshop-header">
        <div className="fde-header-inner">
          <div className="fde-brand" onClick={onNavigateHome} style={{ cursor: onNavigateHome ? 'pointer' : 'default' }}>
            <img src="/logo.png" alt="DV Analytics Logo" className="fde-brand-logo" />
          </div>
          <button className="fde-btn-header" onClick={openRegisterModal}>
            Register Now
          </button>
        </div>
      </header>

      {/* Hero Section: Two-Column Split (Poster Left, Registration Panel Right) */}
      <section className="fde-hero-split-section">
        <div className="fde-hero-split-container">
          {/* Left Column: Original High-Res Poster */}
          <div className="fde-split-poster-col">
            <div className="fde-split-poster-wrapper">
              <img
                src="/fde-workshop-poster.jpg?v=7"
                alt="AI Forward Deployment Engineer Workshop"
                className="fde-split-poster-img"
              />
            </div>
          </div>

          {/* Right Column: Registration Panel (Opened & Scrollable) */}
          <div className="fde-split-form-col">
            <div id="fde-registration-panel" className="fde-registration-panel">
              {isSubmitted ? (
                <div className="fde-reg-success-box">
                  <div className="fde-reg-success-badge">✓</div>
                  <h3 className="fde-reg-success-title">Registration Confirmed!</h3>
                  <p className="fde-reg-success-desc">
                    Your free seat for the <strong>AI Forward Deployment Engineer Workshop</strong> has been reserved.
                  </p>
                  <div className="fde-reg-success-meta">
                    <div><strong>Duration:</strong> {WORKSHOP_TIME}</div>
                    <div><strong>Date:</strong> {WORKSHOP_DATE}</div>
                  </div>
                  <p className="fde-reg-success-hint">
                    Confirmation & access link will be shared via WhatsApp & Email.
                  </p>
                </div>
              ) : (
                <form className="fde-reg-form" onSubmit={handleSubmit}>
                  {/* Phone input with country code selector matching reference */}
                  <div className="fde-reg-field-group">
                    <div className="fde-phone-row">
                      <div className="fde-country-prefix" aria-label="Country Code +91">
                        +91
                      </div>
                      <input
                        id="fde-reg-phone"
                        name="phone"
                        type="tel"
                        className={`fde-reg-input fde-phone-input ${errors.phone ? 'input-error' : ''}`}
                        placeholder="Enter Mobile Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phone && <span className="fde-error-msg">{errors.phone}</span>}
                  </div>

                  {/* Name field */}
                  <div className="fde-reg-field-group">
                    <input
                      id="fde-reg-name"
                      name="name"
                      type="text"
                      className={`fde-reg-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="Enter Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="fde-error-msg">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="fde-reg-field-group">
                    <input
                      id="fde-reg-email"
                      name="email"
                      type="email"
                      className={`fde-reg-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="Enter Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="fde-error-msg">{errors.email}</span>}
                  </div>

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    className="fde-btn-register-free"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Reserving Your Slot...' : 'REGISTER NOW'}
                  </button>

                  {/* WhatsApp Updates Checkbox */}
                  <label className="fde-whatsapp-optin">
                    <input
                      type="checkbox"
                      checked={whatsappOptin}
                      onChange={(e) => setWhatsappOptin(e.target.checked)}
                    />
                    <span>I wish to receive further updates and confirmation via Whatsapp</span>
                  </label>

                  {/* Terms & Privacy Policy Links */}
                  <p className="fde-legal-disclaimer">
                    By continuing, you agree to DV Analytics's{' '}
                    <a href="/terms" onClick={(e) => e.preventDefault()}>Terms</a> and{' '}
                    <a href="/privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Title, Details & Content Below Poster */}
      <section className="fde-hero-details-section">
        <div className="fde-hero-details-container">
          <div className="fde-tag-pill">EXCLUSIVE CAREER & TECH MASTERCLASS</div>
          <h1 className="fde-hero-title">
            AI writes code today. It still can't sit with a client and figure out what they actually need.
          </h1>
          <p className="fde-hero-subtitle">
            Everyone is asking: "Will AI take my job?" Discover why the Forward Deployed Engineer (FDE) is the one engineering role built on what AI cannot replace — combining 50% Client Consulting, 30% Engineering & Infrastructure, and 20% Applied AI.
          </p>

          {/* Live Countdown Clock matching Batch Countdown design */}
          <div className="fde-timer-wrapper">
            <div className="fde-timer-label">October 15 Workshop Countdown</div>
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
                    d="M 80,140 C 180,125 280,85 410,35 L 410,160 L 80,160 Z"
                    fill="url(#lightOrangeGrad)"
                  />

                  {/* Rising Spline Curve Line */}
                  <path
                    d="M 80,140 C 180,125 280,85 410,35"
                    stroke="#ea580c"
                    strokeWidth="3"
                    fill="none"
                  />

                  {/* 3 Compact Vertical Range Bars */}
                  {/* Bar 1: Fresher (0-3 Yrs) */}
                  <rect x="65" y="120" width="30" height="40" rx="4" fill="url(#lightBarGrey)" />

                  {/* Bar 2: Mid Level (4-8 Yrs) */}
                  <rect x="210" y="80" width="32" height="80" rx="4" fill="url(#lightBarGrey)" />

                  {/* Bar 3: High Exp (8+ Yrs ₹1.2 Cr+) */}
                  <rect x="395" y="35" width="34" height="125" rx="4" fill="url(#lightBarOrange)" />

                  {/* Baseline */}
                  <line x1="40" y1="160" x2="460" y2="160" stroke="#cbd5e1" strokeWidth="1" />

                  {/* Labels below bars */}
                  <text x="80" y="180" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">Fresher (0–3 Yrs)</text>
                  <text x="226" y="180" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">Mid Level (4–8 Yrs)</text>
                  <text x="412" y="180" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="800">High Exp (8+ Yrs)</text>

                  {/* Top Salary Value Callouts */}
                  <text x="80" y="110" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="800">{SALARY_ROLES_DATA[hoveredIndex ?? 3].fresher.text}</text>
                  <text x="226" y="70" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="800">{SALARY_ROLES_DATA[hoveredIndex ?? 3].mid.text}</text>
                  <text x="412" y="24" textAnchor="middle" fill="#ea580c" fontSize="11" fontWeight="900">{SALARY_ROLES_DATA[hoveredIndex ?? 3].high.text}</text>
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

      {/* Feature Banner: Take Your Software Engineering Career To New Heights */}
      <section className="fde-feature-banner-section">
        <div className="fde-feature-banner-wrapper">
          <img
            src="/fde-career-heights-banner.png"
            alt="Take Your Software Engineering Career To New Heights - Register for the Masterclass, Participate in Live Quizzes, Conquer the Leaderboards"
            className="fde-feature-banner-img"
          />
        </div>
      </section>

      {/* 2-Hour Intensive Masterclass Agenda */}
      <section className="fde-highlights-section">
        <div className="fde-section-header">
          <div className="fde-badge">2-HOUR MASTERCLASS AGENDA</div>
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

      {/* Registration Modal Pop-up */}
      {isModalOpen && (
        <div className="fde-modal-overlay" onClick={closeRegisterModal}>
          <div className="fde-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="fde-modal-close" onClick={closeRegisterModal} aria-label="Close registration modal">
              ✕
            </button>

            {isSubmitted ? (
              <div className="fde-success-card">
                <h2>Registration Successful</h2>
                <p className="fde-success-sub">
                  Thank you, <strong>{formData.name}</strong>! Your seat for the <strong>{WORKSHOP_NAME}</strong> workshop has been reserved.
                </p>

                <div className="fde-summary-box">
                  <div className="fde-summary-row">
                    <span>Workshop:</span>
                    <strong>{WORKSHOP_NAME}</strong>
                  </div>
                  <div className="fde-summary-row">
                    <span>Date:</span>
                    <strong>{WORKSHOP_DATE}</strong>
                  </div>
                  <div className="fde-summary-row">
                    <span>Timing:</span>
                    <strong>{WORKSHOP_TIME}</strong>
                  </div>
                  <div className="fde-summary-row">
                    <span>Registered Email:</span>
                    <strong>{formData.email}</strong>
                  </div>
                  <div className="fde-summary-row">
                    <span>Phone Number:</span>
                    <strong>{formData.phone}</strong>
                  </div>
                </div>

                <p className="fde-success-note">
                  We have received your registration details. Our admissions team will share the live workshop access link and reminder alerts before the session.
                </p>

                <button
                  type="button"
                  className="fde-btn-primary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Register Another Seat
                </button>
              </div>
            ) : (
              <>
                <div className="fde-form-header">
                  <div className="fde-form-badge">FREE REGISTRATION</div>
                  <h2>Register for the Live Workshop</h2>
                  <p>Fill in your details below to reserve your slot. Seats are limited!</p>
                </div>

                <form className="fde-form" onSubmit={handleSubmit}>
                  {/* Pre-filled read-only fields */}
                  <div className="fde-form-row two-col">
                    <div className="fde-field-group">
                      <label>Workshop Title</label>
                      <input
                        type="text"
                        value={WORKSHOP_NAME}
                        readOnly
                        className="fde-input-readonly"
                      />
                    </div>
                    <div className="fde-field-group">
                      <label>Workshop Schedule</label>
                      <input
                        type="text"
                        value={`${WORKSHOP_DATE} (${WORKSHOP_TIME})`}
                        readOnly
                        className="fde-input-readonly"
                      />
                    </div>
                  </div>

                  {/* User input fields */}
                  <div className="fde-form-row">
                    <div className="fde-field-group">
                      <label htmlFor="w-name">Full Name *</label>
                      <input
                        id="w-name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && <span className="fde-error-msg">{errors.name}</span>}
                    </div>
                  </div>

                  <div className="fde-form-row two-col">
                    <div className="fde-field-group">
                      <label htmlFor="w-email">Email Address *</label>
                      <input
                        id="w-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                      />
                      {errors.email && <span className="fde-error-msg">{errors.email}</span>}
                    </div>

                    <div className="fde-field-group">
                      <label htmlFor="w-phone">Mobile / WhatsApp Number *</label>
                      <input
                        id="w-phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'input-error' : ''}
                      />
                      {errors.phone && <span className="fde-error-msg">{errors.phone}</span>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="fde-btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Reserving Your Slot...' : 'Complete Registration & Reserve Seat'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
