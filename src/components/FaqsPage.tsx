import React, { useState } from 'react';

interface FaqItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

interface FaqsPageProps {
  onEnroll?: () => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ onEnroll }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories: FaqCategory[] = [
    {
      title: 'General',
      items: [
        {
          id: 1,
          question: 'Who can join these programs?',
          answer: 'Anyone with a graduation background can join, including B.Sc, B.Com, BBA, BCA, B.Tech, MCA, MBA, M.Sc, working professionals, career-gap candidates, and professionals looking to transition into Data Science, AI, Cybersecurity, or Digital Technology careers.'
        },
        {
          id: 2,
          question: 'Do I need a programming background?',
          answer: 'No. The programs start from fundamentals and gradually move to advanced concepts. Programming skills such as SQL and Python are taught from the basics.'
        },
        {
          id: 3,
          question: 'Are these programs suitable for freshers?',
          answer: 'Yes. Freshers can learn industry-relevant skills, work on projects, prepare for interviews, and become job-ready through structured learning and mentorship.'
        },
        {
          id: 4,
          question: 'Can working professionals join?',
          answer: 'Yes. Working professionals can attend weekend or flexible batches and learn practical skills for career growth, promotions, or domain transitions.'
        },
        {
          id: 5,
          question: 'Are classes conducted online or offline?',
          answer: 'Both online and offline learning options are available depending on the program and location.'
        }
      ]
    },
    {
      title: 'Data Science & AI',
      items: [
        {
          id: 6,
          question: 'What will I learn in Data Science & AI?',
          answer: (
            <div>
              <p>You will learn a comprehensive stack of data tools and AI operations:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <li>SQL (Structured Query Language)</li>
                <li>Python Programming</li>
                <li>Statistics & Data Mining</li>
                <li>Excel + AI</li>
                <li>Power BI & Tableau Dashboards</li>
                <li>Machine Learning & Deep Learning</li>
                <li>NLP (Natural Language Processing)</li>
                <li>Generative AI & Prompt Engineering</li>
                <li>Agentic AI (Multi-Agent Systems)</li>
                <li>MLOps & LLMOps Operations</li>
              </ul>
            </div>
          )
        },
        {
          id: 7,
          question: 'How long does it take to become a Data Scientist?',
          answer: 'Typically 4–8 months depending on the program selected and the learner\'s commitment.'
        },
        {
          id: 8,
          question: 'Will I work on industry projects?',
          answer: 'Yes. Students work on real-world projects from domains such as Banking, Telecom, Retail, E-Commerce, Healthcare, Insurance, and Manufacturing.'
        },
        {
          id: 9,
          question: 'What tools will I learn?',
          answer: 'SQL Server, Python, Jupyter Notebook, Power BI, Tableau, Excel AI, OpenAI APIs, LangChain, Vector Databases, and Cloud Platforms (AWS/Azure/GCP).'
        },
        {
          id: 10,
          question: 'What job roles can I apply for?',
          answer: 'Data Analyst, Business Analyst, Data Scientist, AI Engineer, Machine Learning Engineer, Gen AI Engineer, AI Consultant, and Analytics Consultant.'
        },
        {
          id: 11,
          question: 'Is Generative AI included?',
          answer: 'Yes. Modern programs include Prompt Engineering, RAG Systems, LLM Development, AI Agents, Agentic AI, and AI Automation.'
        },
        {
          id: 12,
          question: 'Will I receive certifications?',
          answer: 'Yes. You will receive training completion and project certifications after successful completion of the program.'
        }
      ]
    },
    {
      title: 'Cybersecurity & Forensics',
      items: [
        {
          id: 13,
          question: 'What will I learn in Cybersecurity?',
          answer: (
            <div>
              <p>The program covers both offensive and defensive cybersecurity areas:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <li>Networking Fundamentals</li>
                <li>Linux Operations</li>
                <li>Security Governance Fundamentals</li>
                <li>Ethical Hacking & Reconnaissance</li>
                <li>Penetration Testing (Web, Network)</li>
                <li>SOC Operations & Log Analysis</li>
                <li>SIEM Tools (Security Monitoring)</li>
                <li>Cloud Security Hardening</li>
                <li>Incident Response Lifecycle</li>
                <li>Digital Forensics Investigations</li>
              </ul>
            </div>
          )
        },
        {
          id: 14,
          question: 'Do I need networking knowledge?',
          answer: 'No. Networking fundamentals are covered as part of the curriculum.'
        },
        {
          id: 15,
          question: 'What is Digital Forensics?',
          answer: 'Digital Forensics involves collecting, preserving, analyzing, and investigating digital evidence from computers, mobile devices, servers, and networks.'
        },
        {
          id: 16,
          question: 'Will I learn Ethical Hacking?',
          answer: 'Yes. Ethical Hacking modules cover vulnerability assessment, penetration testing, reconnaissance, and security assessment methodologies.'
        },
        {
          id: 17,
          question: 'What job roles can I apply for?',
          answer: 'Cybersecurity Analyst, SOC Analyst, Security Engineer, Ethical Hacker, Penetration Tester, Incident Response Analyst, and Digital Forensics Investigator.'
        },
        {
          id: 18,
          question: 'Are labs included?',
          answer: 'Yes. Hands-on labs and cybersecurity simulations are included throughout the program.'
        }
      ]
    },
    {
      title: 'LMS & Learning Support',
      items: [
        {
          id: 19,
          question: 'What LMS benefits do students receive?',
          answer: (
            <div>
              <p>Students receive full access to our cloud-based Learning Management System (LMS) containing:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <li>Recorded Sessions for flexible review</li>
                <li>Study Materials & Guides</li>
                <li>Structured Assignments</li>
                <li>Assessments & Quizzes</li>
                <li>Resume Templates</li>
                <li>Interview Preparation Kits</li>
                <li>Mock Interview Requests</li>
                <li>Certification Access</li>
              </ul>
            </div>
          )
        },
        {
          id: 20,
          question: 'Can I access recorded sessions?',
          answer: 'Yes. Recorded sessions are available through the LMS for revision and self-paced learning.'
        },
        {
          id: 21,
          question: 'Are assignments provided?',
          answer: 'Yes. Every module includes practical assignments and exercises for skill development.'
        },
        {
          id: 22,
          question: 'Are assessments conducted?',
          answer: 'Yes. Students are assessed through quizzes, assignments, projects, and practical evaluations.'
        }
      ]
    },
    {
      title: 'Projects & Mentorship',
      items: [
        {
          id: 23,
          question: 'How many projects will I work on?',
          answer: 'Students typically complete multiple mini-projects and one or more capstone industry projects.'
        },
        {
          id: 24,
          question: 'Will mentors guide project execution?',
          answer: 'Yes. Industry experts provide project guidance, code reviews, and implementation support.'
        },
        {
          id: 25,
          question: 'Are projects based on real business problems?',
          answer: 'Yes. Projects are designed using real-world datasets and business scenarios.'
        },
        {
          id: 26,
          question: 'Will I build an industry portfolio?',
          answer: 'Yes. Students develop project portfolios that can be showcased during interviews and on LinkedIn.'
        }
      ]
    },
    {
      title: 'Placement Support',
      items: [
        {
          id: 27,
          question: 'Is placement support provided?',
          answer: 'Yes. Eligible students receive placement assistance after meeting program completion requirements.'
        },
        {
          id: 28,
          question: 'What placement support is available?',
          answer: (
            <div>
              <p>We provide end-to-end career services including:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <li>Resume Building & Critiques</li>
                <li>LinkedIn Profile Optimization</li>
                <li>Mock Interviews (Technical & HR)</li>
                <li>Aptitude & Logical Preparation</li>
                <li>Technical Interview Preparation</li>
                <li>HR Interview Guidance</li>
                <li>Job Referrals to corporate networks</li>
              </ul>
            </div>
          )
        },
        {
          id: 29,
          question: 'Is placement guaranteed?',
          answer: 'Placement support is provided, but final selection depends on the student\'s skills, performance, communication, and interview success.'
        },
        {
          id: 30,
          question: 'How can I improve my placement chances?',
          answer: 'Attend classes regularly, complete assignments, finish projects, practice interviews, build a strong LinkedIn profile, and participate actively in mock interviews.'
        }
      ]
    },
    {
      title: 'Fees & Enrollment',
      items: [
        {
          id: 31,
          question: 'Are EMI options available?',
          answer: 'Yes. Flexible EMI options may be available depending on the program.'
        },
        {
          id: 32,
          question: 'How do I enroll?',
          answer: 'Students can enroll by submitting the enrollment form, speaking with a counselor, and completing the admission process.'
        },
        {
          id: 33,
          question: 'Can I attend a demo class?',
          answer: 'Yes. Demo sessions or counseling sessions may be available before enrollment.'
        },
        {
          id: 34,
          question: 'Are there any prerequisites?',
          answer: 'Basic computer knowledge is helpful, but no prior programming experience is mandatory.'
        },
        {
          id: 35,
          question: 'How do I get more information?',
          answer: 'You can contact the admissions team for Course Details, Curriculum, Fee Structure, Batch Schedule, Placement Assistance, and Career Guidance.'
        }
      ]
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="faq-page-wrapper">
      {/* 1. FAQs Header */}
      <section className="faq-hero container text-center">
        <span className="faq-subtitle">Learner Support</span>
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-header-line"></div>
        <p className="faq-hero-desc">
          Find answers to common questions about our Data Science, AI, Cybersecurity, Forensics training, LMS features, and career programs.
        </p>
      </section>

      {/* 2. FAQs Split Tabs Layout */}
      <section className="faq-content-section container">
        <h2 className="cat-title-header">{categories[activeCategory].title} FAQs</h2>
        
        <div className="faq-split-container">
          
          {/* Left Category Navigation Tabs */}
          <div className="faq-tabs-sidebar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`faq-tab-btn ${activeCategory === idx ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(idx);
                  setExpandedFaq(null); // Reset open accordion
                }}
              >
                {cat.title}
                <svg className="tab-arrow-icon" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Right Accordion Panel */}
          <div className="faq-accordion-panel">
            <div className="accordion-list">
              {categories[activeCategory].items.map((item) => {
                const isOpen = expandedFaq === item.id;
                return (
                  <div key={item.id} className={`faq-accordion-card ${isOpen ? 'open' : ''}`}>
                    <button className="faq-question-btn" onClick={() => toggleFaq(item.id)}>
                      <span>{item.question}</span>
                      <span className="faq-toggle-icon">
                        {isOpen ? (
                          <svg viewBox="0 0 24 24">
                            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24">
                            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                          </svg>
                        )}
                      </span>
                    </button>
                    
                    <div className={`faq-answer-panel ${isOpen ? 'open' : 'closed'}`}>
                      <div style={{ minHeight: '0px' }}>
                        <div className="faq-answer-content">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="faq-advisor-cta">
        <div className="cta-box container text-center">
          <h2>Still Have Questions?</h2>
          <p>Get in touch with our admissions experts for personalized guidance on your career goals.</p>
          
          <div className="advisor-cards-row">
            <div className="advisor-kpi-card">
              <span className="kpi-icon">📞</span>
              <h4>Talk to Advisors</h4>
              <p>Call our career helpline to clear details directly.</p>
            </div>
            <div className="advisor-kpi-card">
              <span className="kpi-icon">🎓</span>
              <h4>Career Guidance</h4>
              <p>Get personalized recommendations based on profile.</p>
            </div>
            <div className="advisor-kpi-card">
              <span className="kpi-icon">🧑‍💻</span>
              <h4>Start Journey</h4>
              <p>Enroll today in Data Science, AI, and Cybersecurity.</p>
            </div>
          </div>

          <div className="cta-action-btn-row">
            <button className="btn btn-enroll-bottom" onClick={onEnroll}>
              Contact Advisor Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
