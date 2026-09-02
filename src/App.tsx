import { useEffect, useState } from 'react';
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
import { AlumniPage } from './components/AlumniPage';
import { useScrollReveal } from './hooks/useScrollReveal';
import { CompaniesSection } from './components/CompaniesSection';
import { AauModal } from './components/AauModal';
import { BrochureLeadModal } from './components/BrochureLeadModal';
import { GetACallButton } from './components/GetACallButton';
import { SampleVideoSection } from './components/SampleVideoSection';
import { SkillPackageExplorer } from './components/SkillPackageExplorer';
import { getPageFromPath, getPathFromPage } from './utils/routes';

const heroPosterModules = import.meta.glob('/public/hero-stories/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const allowedHeroPosterPaths = [
  '/public/hero-stories/fde-student.jpg',
  '/public/hero-stories/fde-professional.png',
  '/public/hero-stories/poster-8.png',
  '/public/hero-stories/6th.jpeg',
  '/public/hero-stories/career-gap.png',
  '/public/hero-stories/poster-2.png',
  '/public/hero-stories/poster-4.png',
  '/public/hero-stories/poster-6.png',
];

const heroPosterImages = allowedHeroPosterPaths
  .map((filePath) => heroPosterModules[filePath] as string | undefined)
  .filter((assetUrl): assetUrl is string => Boolean(assetUrl))
  .map((assetUrl) => assetUrl.replace('/public/', '/'));

const paymentPageUrl = 'https://dvpayment.page.gd/';

function App() {
  const [activePage, setActivePage] = useState(() => getPageFromPath(window.location.pathname));
  const scrollRevealRef = useScrollReveal(activePage);
  const [isAauModalOpen, setIsAauModalOpen] = useState(false);
  const [brochureCourseId, setBrochureCourseId] = useState<string | null>(null);

  useEffect(() => {
    if (activePage === 'courses') {
      document.getElementById('programs-section')?.scrollIntoView({ block: 'start' });
      return;
    }

    window.scrollTo(0, 0);
  }, [activePage]);

  useEffect(() => {
    const paymentRedirectPaths = ['/payment', '/payment/index.php'];
    const currentPath = window.location.pathname.replace(/\/$/, '');

    if (paymentRedirectPaths.includes(currentPath)) {
      window.location.replace(`${paymentPageUrl}${window.location.search}`);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (pageId: string) => {
    const nextPath = getPathFromPage(pageId);
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (currentPath !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }

    setActivePage(pageId);
  };

  const handleNavClick = (pageId: string) => {
    if (pageId === 'aau') {
      setIsAauModalOpen(true);
    } else {
      navigateToPage(pageId);
    }
  };

  const handleOpenBrochure = (courseId: string) => {
    setBrochureCourseId(courseId);
  };

  const renderContent = () => {
    if (activePage.startsWith('course-')) {
      const courseId = activePage.replace('course-', '');
      return (
        <div data-section="course-detail">
          <CourseDetailPage
            courseId={courseId}
            onBackHome={() => navigateToPage('home')}
            onEnroll={() => navigateToPage(`enroll-${courseId}`)}
            onDownloadBrochure={() => handleOpenBrochure(courseId)}
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
            onBackHome={() => navigateToPage('home')}
            defaultCourseId={defaultCourseId}
          />
        </div>
      );
    }

    if (activePage === 'about') {
      return <div data-section="about"><AboutPage /></div>;
    }

    if (activePage === 'alumni') {
      return <div data-section="alumni"><AlumniPage onEnroll={() => navigateToPage('enroll')} /></div>;
    }

    if (activePage === 'services') {
      return <div data-section="services"><ServicesPage onNavigate={navigateToPage} /></div>;
    }

    if (activePage.startsWith('service-')) {
      const serviceId = activePage.replace('service-', '');
      return (
        <div data-section="service-detail">
          <ServiceDetailPage
            serviceId={serviceId}
            onBackHome={() => navigateToPage('home')}
            onNavigate={navigateToPage}
          />
        </div>
      );
    }

    if (activePage === 'faqs') {
      return (
        <div data-section="faqs">
          <FaqsPage onEnroll={() => navigateToPage('enroll')} />
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

    if (activePage === 'payment') {
      return (
        <div className="page-wrapper container">
          <section className="content-section" style={{ padding: '3.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', color: '#000000', fontWeight: '800' }}>
              Payment Page
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '2.5rem', fontWeight: '300' }}>
              Continue to the secure DV Analytics payment form.
            </p>
            <a className="btn btn-primary" href={paymentPageUrl}>
              Open Payment Page
            </a>
          </section>
        </div>
      );
    }

    if (activePage !== 'home' && activePage !== 'courses') {
      return (
        <div className="page-wrapper container">
          <section className="content-section" style={{ padding: '3.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', color: '#000000', fontWeight: '800' }}>
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '2.5rem', fontWeight: '300' }}>
              This section is currently under development.
            </p>
            <button className="btn btn-primary" onClick={() => navigateToPage('home')}>
              Back to Homepage
            </button>
          </section>
        </div>
      );
    }

    return (
      <div className="page-wrapper container">
        <section className="content-section" data-section="hero">
          <div className="hero-split">
            <div className="hero-mobile-poster-frame">
              <img
                src="/mobile-industry-ready-poster.jpg"
                alt="Become an industry-ready data scientist and cybersecurity professional"
                className="hero-mobile-poster"
                width="759"
                height="1600"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="hero-left">
              <div className="hero-desktop-heading-group">
                <p className="hero-desktop-kicker">Become</p>
                <h1 className="hero-heading-accent hero-front-page-heading hero-desktop-heading">
                  <span>An industry-ready expert</span>
                  <span>data scientist and</span>
                  <span>cybersecurity professional</span>
                </h1>
                <h2 className="hero-desktop-subtitle">
                  Any graduate can be an IT professional
                </h2>
              </div>

              <div className="hero-desc hero-copy-block">
                <h1 className="hero-heading-accent hero-front-page-heading hero-mobile-heading">
                  Become an industry-ready data scientist &amp; cybersecurity professional
                </h1>
                <h2 className="hero-copy-title">Get an Expert in:</h2>
                <ul className="hero-expertise-list">
                  <li>Data Analytics + AI</li>
                  <li>Data Science + Gen AI + Agentic AI</li>
                  <li>Data Engineering + AI</li>
                  <li>AI Integrated Cybersecurity + Forensic Specialist</li>
                  <li>AI + Forward Deployment Engineer</li>
                </ul>
              </div>

              <div className="hero-desc hero-copy-block hero-audience-block">
                <h2 className="hero-copy-title">Who Can:</h2>
                <p className="hero-audience-text">
                  <span>Freshers | Graduates (Technical &amp; Non-Technical)</span>
                  <span>Masters (Technical &amp; Non-Technical) | Working Professionals | Reachers | Entrepreneurs</span>
                </p>
                <SkillPackageExplorer onViewDetails={(courseId) => navigateToPage(`course-${courseId}`)} />
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-image-container hero-image-container-home">
                <AnimatedHeroGraphic images={heroPosterImages} />
              </div>
            </div>
          </div>

          <div className="hero-mobile-slideshow">
            <div className="hero-image-container">
              <AnimatedHeroGraphic images={heroPosterImages} />
            </div>
          </div>

          <SkillPackageExplorer
            className="skill-package-explorer-mobile"
            onViewDetails={(courseId) => navigateToPage(`course-${courseId}`)}
          />

          <div className="badges-header">
            <h2 className="badges-title">Learners Benefit</h2>
          </div>

          <div className="hero-badges-grid">
            <div className="hero-badge-card badge-experts">
              <img
                src="/hero-section-logo/card-experts.png"
                alt="Trained by Industry Experts"
                loading="lazy"
              />
            </div>

            <div className="hero-badge-card badge-projects">
              <img
                src="/hero-section-logo/card-projects.png"
                alt="Industry Project Hands-On"
                loading="lazy"
              />
            </div>

            <div className="hero-badge-card badge-lms">
              <img
                src="/hero-section-logo/card-lms.png"
                alt="LMS Access 24/7"
                loading="lazy"
              />
            </div>

            <div className="hero-badge-card badge-placement">
              <img
                src="/hero-section-logo/card-placement.png"
                alt="Placement Support"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <SampleVideoSection onEnroll={() => navigateToPage('enroll')} />

        <div id="programs-section" data-section="programs">
          <ProgramsSection onViewDetails={(courseId) => navigateToPage(`course-${courseId}`)} />
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
      <Header
        onNavClick={handleNavClick}
        activePage={activePage}
        onCourseEnrollClick={(courseId) => navigateToPage(`enroll-${courseId}`)}
        onCourseBrochureClick={handleOpenBrochure}
      />
      <main style={{ flexGrow: 1 }}>
        <div className="page-transition-wrapper" key={activePage}>
          {renderContent()}
        </div>
      </main>
      <Footer />
      <AauModal
        isOpen={isAauModalOpen}
        onClose={() => setIsAauModalOpen(false)}
        onSelectCourse={(courseId) => {
          setIsAauModalOpen(false);
          navigateToPage(`course-${courseId}`);
        }}
      />
      <BrochureLeadModal
        isOpen={Boolean(brochureCourseId)}
        courseId={brochureCourseId}
        onClose={() => setBrochureCourseId(null)}
      />
      <GetACallButton />
    </div>
  );
}

export default App;
