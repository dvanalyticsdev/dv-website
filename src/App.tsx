import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { AnimatedHeroGraphic } from './components/AnimatedHeroGraphic';
import { ProgramsSection } from './components/ProgramsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { RoadmapSection } from './components/RoadmapSection';
import { SuccessStories } from './components/SuccessStories';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { Footer } from './components/Footer';
import { CourseDetailPage } from './components/CourseDetailPage';
import { ServicesPage } from './components/ServicesPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { FaqsPage } from './components/FaqsPage';
import { EnrollmentPage } from './components/EnrollmentPage';
import { AboutPage } from './components/AboutPage';
import { BlogsPage } from './components/BlogsPage';
import { ChatbotWidget } from './components/ChatbotWidget';
import { useScrollReveal } from './hooks/useScrollReveal';
import { CompaniesSection } from './components/CompaniesSection';
import { AauModal } from './components/AauModal';
import { SampleVideoSection } from './components/SampleVideoSection';

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
      return <div data-section="services"><ServicesPage onNavigate={(page) => setActivePage(page)} /></div>;
    }

    if (activePage.startsWith('service-')) {
      const serviceId = activePage.replace('service-', '');
      return (
        <div data-section="service-detail">
          <ServiceDetailPage 
            serviceId={serviceId} 
            onBackHome={() => setActivePage('home')}
            onNavigate={(page) => setActivePage(page)}
          />
        </div>
      );
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
        <div data-section="blogs">
          <BlogsPage />
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
              <h1 className="hero-heading-accent" style={{ marginBottom: '2rem', lineHeight: '1.15', fontSize: '2.8rem', fontWeight: '800' }}>
                <span className="hero-heading-part-1">
                  <span className="hero-heading-muted">Become an </span>
                  <span className="hero-heading-white">Industry-Ready </span>
                </span>
                <span className="hero-heading-part-2">Data Scientist &amp; </span>
                <span className="hero-heading-part-3">Cybersecurity Professional</span>
              </h1>
              
              <div className="hero-desc" style={{ marginBottom: '2rem' }}>
                <p style={{ fontWeight: '700', fontSize: '1.15rem', marginBottom: '0.35rem', color: 'inherit' }}>
                  Master the Most In-Demand Technologies:
                </p>
                <p style={{ fontWeight: '600', fontSize: '1.0rem', opacity: 0.95, lineHeight: '1.4', color: 'inherit' }}>
                  Data Analytics | Data Science | Machine Learning | Deep Learning | Generative AI | Agentic AI | Cybersecurity
                </p>
              </div>

              <div className="hero-desc" style={{ marginBottom: '3.5rem' }}>
                <p style={{ fontWeight: '700', fontSize: '1.15rem', marginBottom: '0.35rem', color: 'inherit' }}>
                  A Complete Career Transformation Journey
                </p>
                <p style={{ fontWeight: '600', fontSize: '1.0rem', opacity: 0.95, color: 'inherit' }}>
                  For Freshers - Graduates - Working Professionals - Career Switchers
                </p>
              </div>
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

        <SampleVideoSection onEnroll={() => setActivePage('enroll')} />

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
        <div data-section="google-reviews">
          <GoogleReviewsSection />
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
