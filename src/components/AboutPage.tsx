import React from 'react';

export const AboutPage: React.FC = () => {
  const stats = [
    { value: '15+', label: 'Years of Training Experience' },
    { value: '200+', label: 'Batches Completed' },
    { value: '8000+', label: 'Students Enrolled' },
    { value: '95%+', label: 'Success Rate' },
    { value: '65 Lacs+', label: 'Highest Salary Package' },
    { value: '23 Lacs', label: 'Median Salary Package' },
    { value: '250+', label: 'Recruiting MNCs' },
    { value: '15+', label: 'Industry Projects Completed' }
  ];

  const consultingAreas = [
    'Data quality and management challenges',
    'Business intelligence, MIS reporting, and automation (Daily, Weekly, Monthly)',
    'Technology migration and process optimization improvements',
    'Advanced analytics solution and strategy building',
    'Automated actions using Machine Learning and Artificial Intelligence',
    'Model deployment, orchestration, and execution'
  ];

  return (
    <div className="about-page-container">
      {/* 1. Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content container text-center">
          <span className="about-subtitle">Behind the Vision</span>
          <h1 className="about-title">Who We Are</h1>
          <div className="about-title-underline"></div>
          <p className="about-lead">
            DV Data &amp; Analytics is a leading data science training and consulting firm, 
            led by industry experts, bridging the gap between academic education and corporate demands.
          </p>
        </div>
      </section>

      {/* 2. Intro & Consulting Section */}
      <section className="about-intro-section container">
        <div className="about-intro-grid">
          <div className="about-intro-text">
            <span className="about-section-badge">Our Story</span>
            <h2 className="about-section-heading">Democratizing Analytics &amp; AI</h2>
            <p className="about-para">
              We aim to build relationships based on honesty, transparency, and trust with both 
              our students and corporate partners. We take utmost care to deliver practical, 
              industry-oriented knowledge to our candidates, preparing them for top-tier roles.
            </p>
            <p className="about-para">
              Established for imparting innovative academic programs, our organization has spent 
              the last 12 years alignment with market forces. We have successfully enrolled more than 
              2500 candidates, placing technical and non-technical graduates into global MNCs like 
              Morgan Stanley, Amazon, Flipkart, ANZ Bank, Citibank, HSBC, and Standard Chartered.
            </p>
          </div>

          <div className="about-consulting-box">
            <h3 className="consulting-title">Corporate Consulting Focus</h3>
            <p className="consulting-subtitle">
              Our consulting team consists of industry veterans from Telecom, Banking, Insurance, 
              and E-commerce, optimizing enterprise growth through data-driven approaches:
            </p>
            <ul className="consulting-list">
              {consultingAreas.map((area, idx) => (
                <li key={idx} className="consulting-item">
                  <span className="consulting-bullet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values */}
      <section className="about-mvv-section">
        <div className="container">
          <div className="about-mvv-grid">
            {/* Mission */}
            <div className="mvv-card glow-card">
              <div className="mvv-icon-holder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3>Mission</h3>
              <p>
                To empower individuals with industry-relevant data science skills, bridging the gap 
                between education and corporate demands by providing practical training and consulting 
                solutions that foster personal growth and corporate success.
              </p>
            </div>

            {/* Vision */}
            <div className="mvv-card glow-card">
              <div className="mvv-icon-holder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Vision</h3>
              <p>
                To transform DV Analytics into a leading brand that excels in education, fosters 
                active engagement, and drives elite employment opportunities in the IT sector.
              </p>
            </div>

            {/* Values */}
            <div className="mvv-card glow-card">
              <div className="mvv-icon-holder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Values</h3>
              <p>
                Building meaningful, long-term relationships based on honesty, openness, and 
                fairness with both students and corporate partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. We at a Glance Section */}
      <section className="about-stats-section container">
        <div className="section-header text-center">
          <span className="section-pre-title">Track Record</span>
          <h2 className="section-main-title">We at a Glance</h2>
          <div className="title-underline center"></div>
        </div>
        <div className="about-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="about-stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Founder Spotlight Section */}
      <section className="about-founder-section container">
        <div className="section-header text-center">
          <span className="section-pre-title">Leadership</span>
          <h2 className="section-main-title">Founder &amp; Director</h2>
          <div className="title-underline center"></div>
        </div>

        <div className="founder-spotlight-card">
          <div className="founder-image-col">
            <div className="founder-image-wrapper">
              <img 
                src="https://agentifyaiglobal.com/wp-content/uploads/2026/01/debendra-das7.png" 
                alt="Debendra D Das" 
                className="founder-img"
              />
            </div>
          </div>
          <div className="founder-info-col">
            <h3 className="founder-name">Debendra D Das</h3>
            <span className="founder-title">Founder &amp; Director</span>
            <span className="founder-edu">
              MBA in IT and Business Analytics, FPM from IIMB &amp; International School of Business Research (ISBR)
            </span>
            <p className="founder-bio">
              Mr. Das comes with 18+ years of industry experience in the Data Science field, having 
              worked across Healthcare, Telecom, Retail Markets, and Banking Credit Risk domains. He has 
              trained more than 1800 data science resources across corporate cohorts and individuals for 
              more than a decade now.
            </p>
            <p className="founder-bio">
              He has skilled and delivered industry-specific data analytics solutions for DBMS reporting, 
              visualization, and automated actions for strategy building using Machine Learning and Artificial Intelligence.
            </p>
            <div className="founder-clients-box">
              <span className="clients-label">Experience with International Clients:</span>
              <p className="clients-list">UHG, Tata, IBM, HP, and HSBC</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
