import React, { useState } from 'react';
import './FdeWorkshopPage.css';
import { Footer } from './Footer';
import { trackEvent } from '../utils/analytics';

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
const WORKSHOP_DATE = 'To Be Announced Soon';
const WORKSHOP_TIME = '7:00 PM - 9:00 PM IST (2 Hours)';

export const FdeWorkshopPage: React.FC<FdeWorkshopPageProps> = ({ onNavigateHome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openRegisterModal = () => {
    setIsModalOpen(true);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      trackEvent('submit_workshop_registration', {
        workshop: WORKSHOP_NAME,
      });
    }, 400);
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

      {/* Poster Section with Ambient Spotlight Glow */}
      <section className="fde-full-poster-section">
        <div className="fde-spotlight-beam left"></div>
        <div className="fde-spotlight-beam right"></div>

        <div className="fde-full-poster-wrapper">
          <img
            src="/fde-workshop-banner.png"
            alt="AI Forward Deployment Engineer Workshop Banner"
            className="fde-full-poster-img"
          />
        </div>
      </section>

      {/* Title, Details & CTAs Below Poster */}
      <section className="fde-hero-details-section">
        <div className="fde-hero-details-container">
          <div className="fde-tag-pill">EXCLUSIVE CAREER & TECH MASTERCLASS</div>
          <h1 className="fde-hero-title">
            AI Forward Deployment Engineer Workshop
          </h1>
          <p className="fde-hero-subtitle">
            Turn AI concepts into real-world enterprise solutions. Master how to connect LLMs to data pipelines, build AI agents, and deploy to production cloud environments.
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

      {/* Market Demand & Packages Section */}
      <section id="demand" className="fde-demand-section">
        <div className="fde-section-header">
          <div className="fde-badge">HIGH MARKET DEMAND & CAREER OUTLOOK</div>
          <h2>Why Forward Deployment Engineers (FDE) Are in High Demand</h2>
          <p>
            Companies are moving past basic AI models and notebooks. The biggest industry need today is for professionals who can <strong>integrate, deploy, and scale</strong> enterprise AI solutions in real business environments.
          </p>
        </div>

        <div className="fde-salary-grid">
          <div className="fde-salary-card featured">
            <div className="fde-salary-card-header">
              <h3>Enterprise AI Architect</h3>
              <span className="fde-role-badge">Top Role</span>
            </div>
            <div className="fde-salary-amount">₹25 – ₹50 LPA</div>
            <p>End-to-end AI infrastructure & enterprise solution design</p>
          </div>

          <div className="fde-salary-card">
            <div className="fde-salary-card-header">
              <h3>MLOps / LLMOps Engineer</h3>
              <span className="fde-role-badge highlight">High Demand</span>
            </div>
            <div className="fde-salary-amount">₹18 – ₹40 LPA</div>
            <p>Continuous AI deployment, monitoring, guardrails & latency optimization</p>
          </div>

          <div className="fde-salary-card">
            <div className="fde-salary-card-header">
              <h3>Forward Deployed Engineer (FDE)</h3>
            </div>
            <div className="fde-salary-amount">₹15 – ₹35 LPA</div>
            <p>Combining AI, software engineering & client problem-solving</p>
          </div>

          <div className="fde-salary-card">
            <div className="fde-salary-card-header">
              <h3>Cloud AI Engineer</h3>
            </div>
            <div className="fde-salary-amount">₹14 – ₹32 LPA</div>
            <p>Deploying AI models on AWS, Docker, Kubernetes & microservices</p>
          </div>

          <div className="fde-salary-card">
            <div className="fde-salary-card-header">
              <h3>AI Solutions Engineer</h3>
            </div>
            <div className="fde-salary-amount">₹12 – ₹28 LPA</div>
            <p>Translating business workflows into customized GenAI apps</p>
          </div>

          <div className="fde-salary-card">
            <div className="fde-salary-card-header">
              <h3>AI Consultant</h3>
            </div>
            <div className="fde-salary-amount">₹16 – ₹35 LPA</div>
            <p>Advising enterprise stakeholders on AI adoption & architecture</p>
          </div>
        </div>

        <div className="fde-market-callout">
          <div className="fde-callout-text">
            <h4>The FDE Skill Multiplier (20% AI + 30% Engineering + 50% Problem Solver)</h4>
            <p>
              Traditional data science alone is no longer enough. Learning how to connect models to live databases, APIs, vector stores, and cloud containers makes you <strong>3x more valuable</strong> in today's tech hiring market.
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Highlights Section */}
      <section className="fde-highlights-section">
        <div className="fde-section-header">
          <div className="fde-badge">WORKSHOP FOCUS</div>
          <h2>What You Will Master in 2 Hours</h2>
          <p>A fast-paced, high-impact breakdown of modern enterprise AI delivery.</p>
        </div>

        <div className="fde-cards-grid">
          <div className="fde-highlight-card">
            <div className="fde-card-num">MODULE 01</div>
            <h3>FDE Mindset & Discovery</h3>
            <ul>
              <li>Seven-stage FDE delivery playbook</li>
              <li>Translating business pain points into AI technical specifications</li>
              <li>Choosing between rules, ML, RAG, and AI agents</li>
            </ul>
          </div>

          <div className="fde-highlight-card">
            <div className="fde-card-num">MODULE 02</div>
            <h3>LLMs, RAG & AI Agents</h3>
            <ul>
              <li>Retrieval-Augmented Generation (RAG) & vector databases</li>
              <li>AI Agents & tool orchestration (LangChain, LangGraph, MCP)</li>
              <li>Leveraging AI coding tools (Claude Code, Cursor, Copilot)</li>
            </ul>
          </div>

          <div className="fde-highlight-card">
            <div className="fde-card-num">MODULE 03</div>
            <h3>Production & Cloud Deployment</h3>
            <ul>
              <li>Containerizing AI apps with Docker & Kubernetes</li>
              <li>Deploying to AWS (Lambda, ECS, Bedrock, SageMaker)</li>
              <li>LLMOps, safety guardrails, PII filtering & monitoring</li>
            </ul>
          </div>

          <div className="fde-highlight-card">
            <div className="fde-card-num">MODULE 04</div>
            <h3>Enterprise Delivery & Capstones</h3>
            <ul>
              <li>Enterprise knowledge assistants & document processing agents</li>
              <li>Client technical storytelling & POC demonstration</li>
              <li>ROI measurement & solution handover</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Speaker / Mentor Spotlight */}
      <section className="fde-mentors-section">
        <div className="fde-section-header">
          <div className="fde-badge">LEARN FROM INDUSTRY LEADERS</div>
          <h2>Meet Your Workshop Speaker & Leadership</h2>
        </div>

        <div className="fde-mentors-grid">
          <div className="fde-mentor-card">
            <div className="fde-mentor-avatar">
              <span className="fde-avatar-initials">SR</span>
            </div>
            <div className="fde-mentor-info">
              <span className="fde-mentor-tag">Speaker</span>
              <h3>Dr. Suresh Reddy</h3>
              <div className="fde-mentor-company">Ex-Google</div>
              <p>Specialist in AI systems, LLM architectures, and enterprise AI product delivery.</p>
            </div>
          </div>

          <div className="fde-mentor-card">
            <div className="fde-mentor-avatar">
              <span className="fde-avatar-initials">DD</span>
            </div>
            <div className="fde-mentor-info">
              <span className="fde-mentor-tag director">Host / Director</span>
              <h3>Dr. Debendra Debadutta Das</h3>
              <div className="fde-mentor-company">Co-Founder & Director, DV Analytics</div>
              <p>20+ Years in Data Science & AI. Previously led analytics teams at <strong>IBM • HP • HSBC</strong>.</p>
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
            <p>Expand your software engineering skills into GenAI, RAG context, and cloud AI deployment.</p>
          </div>
          <div className="fde-audience-card">
            <h4>Data Scientists & Analysts</h4>
            <p>Move beyond notebooks and model building into full-stack APIs and production software integration.</p>
          </div>
          <div className="fde-audience-card">
            <h4>DevOps & Cloud Engineers</h4>
            <p>Add AI infrastructure, LLMOps, guardrails, and containerized deployment skills to your toolkit.</p>
          </div>
          <div className="fde-audience-card">
            <h4>Freshers & Tech Aspirants</h4>
            <p>Discover the exact roadmap and skills required to enter modern high-paying AI engineering roles.</p>
          </div>
        </div>
      </section>

      {/* Footer - Main Website Footer */}
      <Footer />

      {/* Side Sticking Register Button (Stays Visible Anywhere You Scroll) */}
      <div className="fde-side-sticky-cta" onClick={openRegisterModal}>
        <span>Register Now</span>
      </div>

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
                  Thank you, <strong>{formData.name}</strong>! Your seat for the <strong>{WORKSHOP_NAME}</strong> has been reserved.
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
