import React from 'react';

export const AboutPage: React.FC = () => {

  return (
    <div className="about-page-container">
      {/* 1. Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content container">
          <span className="about-subtitle">Behind the Vision</span>
          <h1 className="about-title">About DV Analytics</h1>
          <div className="about-title-underline"></div>
          <p className="about-lead">
            We envision a world where everyone is AI-literate and empowered to use ethical, 
            autonomous intelligence to solve real-world problems.
          </p>
        </div>
      </section>

      {/* 2. Purpose & Vision Section */}
      <section className="about-mission-section container reveal-on-scroll">
        <div className="about-grid">
          <div className="about-card glow-card">
            <div className="about-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3>Our Purpose</h3>
            <span className="about-card-subtitle">Why We Exist</span>
            <p>
              Our purpose is to democratize the benefits of emerging data and AI, ensuring that 
              individuals, businesses, and governments can harness these technologies to solve 
              problems, unlock opportunity, and improve quality of life. This reflects our 
              commitment to inclusivity and empowerment through knowledge and innovation.
            </p>
          </div>

          <div className="about-card glow-card">
            <div className="about-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3>Our Vision</h3>
            <span className="about-card-subtitle">What We Aspire To</span>
            <p>
              We envision a future in which everyone is AI-literate and able to use autonomous, 
              ethical AI systems to drive growth and solve societal challenges. In that future, 
              agentic AI amplifies human creativity, organizations operate transparently and 
              responsibly, and intelligent technologies underpin inclusive, sustainable economic progress.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Three Pillars (Mission) Section */}
      <section className="about-pillars-section container reveal-on-scroll">
        <div className="text-center section-header-wrap">
          <span className="section-subtitle">Our Roadmap</span>
          <h2 className="section-title">Three Pillars of Our Mission</h2>
          <div className="title-underline center"></div>
          <p className="section-intro">
            To fulfill our purpose, our mission encompasses three key operational areas:
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card glow-card">
            <div className="pillar-number">01</div>
            <h4>Upskilling</h4>
            <p>
              Provide accessible, mentor-led learning programs that build practical skills 
              in data science, machine learning, and emerging AI for learners at every level.
            </p>
          </div>

          <div className="pillar-card glow-card">
            <div className="pillar-number">02</div>
            <h4>Advising</h4>
            <p>
              Guide organizations through the strategic, ethical, and operational challenges 
              of adopting AI, helping them architect data platforms, develop safe AI strategies, 
              and manage change.
            </p>
          </div>

          <div className="pillar-card glow-card">
            <div className="pillar-number">03</div>
            <h4>Building</h4>
            <p>
              Develop agentic AI products that embed intelligence into enterprise workflows—spanning 
              market insights, hyper-personalized marketing, risk management, process optimization, 
              and more—delivering measurable value and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Leadership Team Section */}
      <section className="about-team-section container reveal-on-scroll">
        <div className="text-center section-header-wrap">
          <span className="section-subtitle">Our Leadership</span>
          <h2 className="section-title">Meet Our Team</h2>
          <div className="title-underline center"></div>
          <p className="section-intro">
            Experienced leaders shaping the future of AI education and intelligence.
          </p>
        </div>

        <div className="team-cards-container">
          {/* Pragya Dwivedi, Ph.D */}
          <div 
            className="team-card" 
            style={{ backgroundImage: "url('https://agentifyaiglobal.com/wp-content/uploads/2026/01/Pragya-Dwivedi-1.png')" }}
          >
            <div className="team-basic">
              <h3>Pragya Dwivedi, Ph.D</h3>
              <span>Director and Co-founder</span>
            </div>
            <div className="team-overlay">
              <div className="team-content">
                <h3>Pragya Dwivedi, Ph.D</h3>
                <span className="role">Director and Co-founder</span>
                <p className="desc">
                  B.Ed. and Ph.D. Qualified educator with many years of teaching and research experience.
                </p>
              </div>
            </div>
          </div>

          {/* Debendra D Das, Ph.D */}
          <div 
            className="team-card" 
            style={{ backgroundImage: "url('https://agentifyaiglobal.com/wp-content/uploads/2026/01/debendra-das7.png')" }}
          >
            <div className="team-basic">
              <h3>Debendra D Das, Ph.D</h3>
              <span>AI &amp; Analytics Leader</span>
            </div>
            <div className="team-overlay">
              <div className="team-content">
                <h3>Debendra D Das, Ph.D</h3>
                <span className="role">AI &amp; Analytics Leader</span>
                <p className="desc">
                  MBA in IT and Business Analytics, FPM from IIMB and International School of Business Research (ISBR).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};
