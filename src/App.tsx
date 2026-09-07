import { lazy, Suspense, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { AnimatedHeroGraphic } from './components/AnimatedHeroGraphic';
import { Footer } from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import { AauModal } from './components/AauModal';
import { BrochureLeadModal } from './components/BrochureLeadModal';
import { GetACallButton } from './components/GetACallButton';
import { SkillPackageExplorer } from './components/SkillPackageExplorer';
import { getPageFromPath } from './utils/routes';
import { applySeoForPage, routePathByPageId } from './utils/seo';
import { initAnalytics, trackEvent, trackPageView } from './utils/analytics';

const ProgramsSection = lazy(() => import('./components/ProgramsSection').then((module) => ({ default: module.ProgramsSection })));
const BenefitsSection = lazy(() => import('./components/BenefitsSection').then((module) => ({ default: module.BenefitsSection })));
const RoadmapSection = lazy(() => import('./components/RoadmapSection').then((module) => ({ default: module.RoadmapSection })));
const SuccessStories = lazy(() => import('./components/SuccessStories').then((module) => ({ default: module.SuccessStories })));
const GoogleReviewsSection = lazy(() => import('./components/GoogleReviewsSection').then((module) => ({ default: module.GoogleReviewsSection })));
const CourseDetailPage = lazy(() => import('./components/CourseDetailPage').then((module) => ({ default: module.CourseDetailPage })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then((module) => ({ default: module.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./components/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })));
const FaqsPage = lazy(() => import('./components/FaqsPage').then((module) => ({ default: module.FaqsPage })));
const EnrollmentPage = lazy(() => import('./components/EnrollmentPage').then((module) => ({ default: module.EnrollmentPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then((module) => ({ default: module.AboutPage })));
const BlogsPage = lazy(() => import('./components/BlogsPage').then((module) => ({ default: module.BlogsPage })));
const AlumniPage = lazy(() => import('./components/AlumniPage').then((module) => ({ default: module.AlumniPage })));
const CompaniesSection = lazy(() => import('./components/CompaniesSection').then((module) => ({ default: module.CompaniesSection })));
const SampleVideoSection = lazy(() => import('./components/SampleVideoSection').then((module) => ({ default: module.SampleVideoSection })));
const SeoLandingPage = lazy(() => import('./components/SeoLandingPage').then((module) => ({ default: module.SeoLandingPage })));
const UpcomingBatchesPage = lazy(() => import('./components/UpcomingBatchesPage').then((module) => ({ default: module.UpcomingBatchesPage })));

const heroPosterImages = [
  '/hero-stories/fde-student.jpg',
  '/hero-stories/fde-professional.png',
  '/hero-stories/poster-8.png',
  '/hero-stories/6th.jpeg',
  '/hero-stories/career-gap.png',
  '/hero-stories/poster-2.png',
  '/hero-stories/poster-4.png',
  '/hero-stories/poster-6.png',
];

const paymentPageUrl = 'https://dvpayment.page.gd/';

function App() {
  const [activePage, setActivePage] = useState(() => getPageFromPath(window.location.pathname));
  const scrollRevealRef = useScrollReveal(activePage);
  const [isAauModalOpen, setIsAauModalOpen] = useState(false);
  const [brochureCourseId, setBrochureCourseId] = useState<string | null>(null);

  useEffect(() => {
    initAnalytics();

    const handleContactClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) {
        trackEvent('click_phone', { phone_link: href.replace('tel:', '') });
      }
      if (href.includes('wa.me') || href.includes('whatsapp')) {
        trackEvent('click_whatsapp', { whatsapp_link: href });
      }
      if (href.startsWith('mailto:')) {
        trackEvent('click_email', { email_link: href.replace('mailto:', '') });
      }
    };

    document.addEventListener('click', handleContactClick);
    return () => document.removeEventListener('click', handleContactClick);
  }, []);

  useEffect(() => {
    applySeoForPage(activePage);
    trackPageView(activePage);
  }, [activePage]);

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
    const nextPath = routePathByPageId(pageId);
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
      trackEvent('click_navigation', { target_page: pageId });
      navigateToPage(pageId);
    }
  };

  const handleOpenBrochure = (courseId: string) => {
    trackEvent('click_download_brochure', { course_id: courseId });
    setBrochureCourseId(courseId);
  };

  const handleEnrollClick = (courseId?: string, source = 'unknown') => {
    trackEvent('click_enroll_now', {
      course_id: courseId ?? 'general',
      cta_source: source,
    });
    navigateToPage(courseId ? `enroll-${courseId}` : 'enroll');
  };

  const handleViewCourseClick = (courseId: string, source: string) => {
    trackEvent('click_view_course', {
      course_id: courseId,
      cta_source: source,
    });
    navigateToPage(`course-${courseId}`);
  };

  const renderContent = () => {
    if (activePage.startsWith('course-')) {
      const courseId = activePage.replace('course-', '');
      return (
        <div data-section="course-detail">
          <CourseDetailPage
            courseId={courseId}
            onBackHome={() => navigateToPage('home')}
            onEnroll={() => handleEnrollClick(courseId, 'course_detail')}
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
      return <div data-section="alumni"><AlumniPage onEnroll={() => handleEnrollClick(undefined, 'alumni')} /></div>;
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
          <FaqsPage onEnroll={() => handleEnrollClick(undefined, 'faqs')} />
        </div>
      );
    }

    if (activePage === 'blogs' || activePage.startsWith('blog-')) {
      return (
        <div data-section="blogs">
          <BlogsPage
            activePage={activePage}
            onOpenBlog={(blogPageId) => navigateToPage(blogPageId)}
            onBackToBlogs={() => navigateToPage('blogs')}
          />
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

    if (activePage === 'upcoming-batches') {
      return (
        <div data-section="upcoming-batches">
          <UpcomingBatchesPage
            onNavigate={navigateToPage}
            onOpenGetACallModal={() => {
              const btn = document.querySelector('.get-call-btn-trigger') as HTMLButtonElement | null;
              if (btn) btn.click();
            }}
          />
        </div>
      );
    }


    if (activePage === 'not-found') {
      return (
        <div className="page-wrapper container">
          <section className="content-section" style={{ padding: '3.5rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', color: '#000000', fontWeight: '800' }}>
              Page Not Found
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '2.5rem', fontWeight: '300' }}>
              The page you are looking for is not available.
            </p>
            <button className="btn btn-primary" onClick={() => navigateToPage('home')}>
              Back to Homepage
            </button>
          </section>
        </div>
      );
    }

    if (activePage.startsWith('lp-')) {
      return (
        <div data-section="seo-landing">
          <SeoLandingPage pageId={activePage} onNavigate={navigateToPage} />
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
                <p className="hero-heading-accent hero-front-page-heading hero-mobile-heading">
                  Become an industry-ready data scientist &amp; cybersecurity professional
                </p>
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
                <SkillPackageExplorer onViewDetails={(courseId) => handleViewCourseClick(courseId, 'hero_skill_package')} />
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
            onViewDetails={(courseId) => handleViewCourseClick(courseId, 'mobile_skill_package')}
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

        <SampleVideoSection onEnroll={() => handleEnrollClick(undefined, 'sample_video')} />

        <div id="programs-section" data-section="programs">
          <ProgramsSection onViewDetails={(courseId) => handleViewCourseClick(courseId, 'programs_section')} />
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
        onCourseEnrollClick={(courseId) => handleEnrollClick(courseId, 'header')}
        onCourseBrochureClick={handleOpenBrochure}
      />
      <main style={{ flexGrow: 1 }}>
        <div className="page-transition-wrapper" key={activePage}>
          <Suspense fallback={<div className="route-loading" aria-label="Loading page content" />}>
            {renderContent()}
          </Suspense>
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
