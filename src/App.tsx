import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { AnimatedHeroGraphic } from './components/AnimatedHeroGraphic';
import { ProgramsSection } from './components/ProgramsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { RoadmapSection } from './components/RoadmapSection';
import { SuccessStories } from './components/SuccessStories';
import { Footer } from './components/Footer';
import { CourseDetailPage } from './components/CourseDetailPage';
import { ServicesPage } from './components/ServicesPage';
import { FaqsPage } from './components/FaqsPage';
import { EnrollmentPage } from './components/EnrollmentPage';
import { AboutPage } from './components/AboutPage';
import { ChatbotWidget } from './components/ChatbotWidget';
import { useScrollReveal } from './hooks/useScrollReveal';
import { CompaniesSection } from './components/CompaniesSection';
import { AauModal } from './components/AauModal';

function App() {
  const [activePage, setActivePage] = useState('home');
  const scrollRevealRef = useScrollReveal(activePage);
  const [robotPose, setRobotPose] = useState<'idle' | 'wave' | 'programs' | 'benefits' | 'roadmap' | 'footer'>('idle');
  const [robotClicked, setRobotClicked] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isAauModalOpen, setIsAauModalOpen] = useState(false);

  // Global mousemove-based section detection
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    let foundSection: string | null = null;
    for (const el of elements) {
      const section = (el as HTMLElement).dataset?.section;
      if (section) {
        foundSection = section;
        break;
      }
    }
    setHoveredSection(foundSection);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  useEffect(() => {
    if (activePage !== 'home') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      const programsElem = document.getElementById('programs-section');
      const benefitsElem = document.getElementById('benefits-section');
      const roadmapElem = document.getElementById('roadmap-section');

      const buffer = 320; // trigger early when scrolling near

      if (scrollPercent > 88) {
        setRobotPose('footer');
      } else if (roadmapElem && scrollY > roadmapElem.offsetTop - buffer) {
        setRobotPose('roadmap');
      } else if (benefitsElem && scrollY > benefitsElem.offsetTop - buffer) {
        setRobotPose('benefits');
      } else if (programsElem && scrollY > programsElem.offsetTop - buffer) {
        setRobotPose('programs');
      } else {
        setRobotPose('idle');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const [blinkTrigger, setBlinkTrigger] = useState(0);

  useEffect(() => {
    const handleGlobalClick = () => {
      setBlinkTrigger((prev) => prev + 1);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);


  const handleRobotClick = () => {
    setRobotClicked(true);
    setTimeout(() => {
      setRobotClicked(false);
    }, 1800);
  };

  const handleNavClick = (pageId: string) => {
    if (pageId === 'aau') {
      setIsAauModalOpen(true);
    } else {
      setActivePage(pageId);
    }
  };

  const renderContent = () => {
    if (activePage.startsWith('course-')) {
      const courseId = activePage.replace('course-', '');
      return (
        <div data-section="course-detail">
          <CourseDetailPage 
            courseId={courseId} 
            onBackHome={() => setActivePage('home')} 
            onEnroll={() => setActivePage(`enroll-${courseId}`)} 
          />
        </div>
      );
    }

    if (activePage.startsWith('enroll')) {
      const courseId = activePage.replace('enroll-', '');
      const defaultCourseId = courseId !== 'enroll' ? courseId : undefined;
      return (
        <div data-section="enrollment">
          <EnrollmentPage 
            onBackHome={() => setActivePage('home')} 
            defaultCourseId={defaultCourseId} 
          />
        </div>
      );
    }

    if (activePage === 'about') {
      return <div data-section="about"><AboutPage /></div>;
    }

    if (activePage === 'services') {
      return <div data-section="services"><ServicesPage /></div>;
    }

    if (activePage === 'faqs') {
      return (
        <div data-section="faqs">
          <FaqsPage 
            onEnroll={() => setActivePage('enroll')} 
          />
        </div>
      );
    }

    if (activePage === 'blogs') {
      return (
        <div className="page-wrapper container">
          <section className="content-section" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.75rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.75px' }}>
              Blogs
            </h2>
            <div style={{ height: '4px', width: '60px', backgroundColor: '#ef5323', margin: '0 auto 2.5rem auto' }}></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3rem', fontWeight: '500' }}>
              Coming Soon
            </p>
            <button className="btn btn-primary" onClick={() => setActivePage('home')}>
              ← Back to Homepage
            </button>
          </section>
        </div>
      );
    }

    if (activePage !== 'home') {
      return (
        <div className="page-wrapper container">
          <section className="content-section" style={{ padding: '3.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', color: '#000000', fontWeight: '800' }}>
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '2.5rem', fontWeight: '300' }}>
              This section is currently under development.
            </p>
            <button className="btn btn-primary" onClick={() => setActivePage('home')}>
              ← Back to Homepage
            </button>
          </section>
        </div>
      );
    }

    return (
      <div className="page-wrapper container">
        <section className="content-section" data-section="hero">
          <div className="hero-split">
            <div className="hero-left">
              <span className="hero-heading-become">Master</span>
              <h1 className="hero-heading-accent" style={{ marginBottom: '0.35rem' }}>
                Data Science, Data Analytics,
              </h1>
              <h2 className="hero-heading-accent">
                Generative AI, Agentic AI & Cybersecurity
              </h2>
              
              <p className="hero-desc">
                Your Path to High-Paying Careers, Industry Leadership, and Global Opportunities
              </p>
            </div>

            <div className="hero-right">
              <div className="hero-image-container">
                <AnimatedHeroGraphic />
              </div>
            </div>
          </div>

          <div className="badges-header">
            <h2 className="badges-title">Learners Benefit</h2>
          </div>

          <div className="hero-badges-grid">
            <div className="hero-badge-card badge-experts">
              <img 
                src="/hero-section-logo/card-experts.jpeg" 
                alt="Trained by Industry Experts" 
                loading="lazy"
              />
            </div>

            <div className="hero-badge-card badge-projects">
              <img 
                src="/hero-section-logo/card-projects.jpeg" 
                alt="Industry Project Hands-On" 
                loading="lazy"
              />
            </div>

            <div className="hero-badge-card badge-lms">
              <img 
                src="/hero-section-logo/card-lms.jpeg" 
                alt="LMS Access 24/7" 
                loading="lazy"
              />
            </div>

            <div className="hero-badge-card badge-placement">
              <img 
                src="/hero-section-logo/card-placement.jpeg" 
                alt="Placement Support" 
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <div id="programs-section" data-section="programs">
          <ProgramsSection onViewDetails={(courseId) => setActivePage(`course-${courseId}`)} />
        </div>
        <div id="benefits-section" data-section="benefits">
          <BenefitsSection />
        </div>
        <div id="roadmap-section" data-section="roadmap">
          <RoadmapSection />
        </div>
        <div data-section="companies">
          <CompaniesSection />
        </div>
        <div data-section="success-stories">
          <SuccessStories />
        </div>
      </div>
    );
  };

  return (
    <div ref={scrollRevealRef}>
      <div className="page-progress-bar" key={activePage}></div>
      <Header onNavClick={handleNavClick} activePage={activePage} />
      <main style={{ flexGrow: 1 }}>
        <div className="page-transition-wrapper" key={activePage}>
          {renderContent()}
        </div>
      </main>
      <Footer />
      <ChatbotWidget 
        activePage={activePage} 
        robotPose={robotPose}
        robotClicked={robotClicked}
        onRobotClick={handleRobotClick}
        blinkTrigger={blinkTrigger}
        hoveredSection={hoveredSection}
      />
      <AauModal
        isOpen={isAauModalOpen}
        onClose={() => setIsAauModalOpen(false)}
        onSelectCourse={(courseId) => {
          setIsAauModalOpen(false);
          setActivePage('course-' + courseId);
        }}
      />
    </div>
  );
}

export default App;
