import React from 'react';

export const AboutPage: React.FC = () => {
  const consultingAreas = [
    'Data quality and management challenges',
    'Business intelligence, MIS reporting, and automation (Daily, Weekly, Monthly)',
    'Technology migration and process optimization improvements',
    'Advanced analytics solution and strategy building',
    'Automated actions using Machine Learning and Artificial Intelligence',
    'Model deployment, orchestration, and execution'
  ];

  const teamMembers = [
    {
      name: 'Debendra D Das',
      role: 'Co-Founder & Director',
      edu: 'MBA in IT and Business Analytics, FPM from IIMB & International School of Business Research (ISBR)',
      img: 'https://agentifyaiglobal.com/wp-content/uploads/2026/01/debendra-das7.png',
      bios: [
        'Mr. Das comes with 18+ years of industry experience in the Data Science field, having worked across Healthcare, Telecom, Retail Markets, and Banking Credit Risk domains.',
        'He has trained more than 1800 data science resources across corporate cohorts and individuals for more than a decade now.',
        'He has skilled and delivered industry-specific data analytics solutions for DBMS reporting, visualization, and automated actions for strategy building using Machine Learning and Artificial Intelligence.'
      ],
      clientsLabel: 'Experience with International Clients:',
      clientsList: 'UHG, Tata, IBM, HP, and HSBC'
    },
    {
      name: 'Venkat Reddy Konasani',
      role: 'Co-Founder & Lead Data Scientist',
      edu: 'MSc Applied Mathematics, Indian Institute of Technology Bombay (IIT Bombay)',
      img: 'https://dvanalyticsmds.com/wp-content/uploads/2021/11/venkat-reddy.png',
      bios: [
        'Venkat holds rich industry experience as an applied Data Analyst and Data Scientist with 12 years of core development experience and 6+ years as a corporate trainer.',
        'He has successfully handled nearly 100 corporate batches and trained countless professionals in advanced analytics tools and techniques.',
        'He is the published author of the books "Practical Business Analytics Using SAS" and "Machine Learning and Deep Learning using Python and TensorFlow". He has specialized expertise in credit risk modeling, market response modeling, social media analytics, and deep learning.'
      ],
      clientsLabel: 'Corporate Training & Consulting Focus:',
      clientsList: 'Credit Risk Modeling, Deep Learning, SAS, and TensorFlow'
    },
    {
      name: 'Parth Gupta',
      role: 'Risk Management & Analytics Advisor',
      edu: 'MBA, CFA from Indian Institute of Management Bangalore (IIMB)',
      img: 'https://dvanalyticsmds.com/wp-content/uploads/2022/01/parth-gupta.png',
      bios: [
        'Parth comes with extensive experience in the Risk Management & Analytics domain, working with a variety of financial institutions around the world.',
        'His expertise in the banking industry spans across core functions like Credit Risk, Quantitative Modeling, Strategy & Pricing Analytics.',
        'He has vast experience in assisting global banks with regulatory compliance like IFRS 9, IRRBB, CCAR, DFAST, and Basel. Prior to advising, Parth has been employed with KPMG, HSBC, and Credit Suisse.'
      ],
      clientsLabel: 'Past Industry Experience:',
      clientsList: 'KPMG, HSBC, and Credit Suisse'
    }
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
        <div className="about-stats-image-container">
          <img 
            src="/about-stats.jpeg" 
            alt="DV Analytics Track Record Stats" 
            className="about-stats-img"
          />
        </div>
      </section>

      {/* 5. Leadership & Faculty Section */}
      <section className="about-founder-section container">
        <div className="section-header text-center">
          <span className="section-pre-title">Leadership &amp; Faculty</span>
          <h2 className="section-main-title">Our Leadership Team</h2>
          <div className="title-underline center"></div>
        </div>

        <div className="team-members-list" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '3.5rem' }}>
          {teamMembers.map((member, idx) => (
            <div key={idx} className={`founder-spotlight-card ${idx % 2 === 1 ? 'alt-layout' : ''}`} style={{ marginTop: 0 }}>
              <div className="founder-image-col">
                <div className="founder-image-wrapper">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="founder-img"
                  />
                </div>
              </div>
              <div className="founder-info-col">
                <h3 className="founder-name">{member.name}</h3>
                <span className="founder-title">{member.role}</span>
                <span className="founder-edu">{member.edu}</span>
                {member.bios.map((paragraph, pIdx) => (
                  <p key={pIdx} className="founder-bio">
                    {paragraph}
                  </p>
                ))}
                {member.clientsList && (
                  <div className="founder-clients-box">
                    <span className="clients-label">{member.clientsLabel}</span>
                    <p className="clients-list">{member.clientsList}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
