import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavClick?: (page: string) => void;
  activePage?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick, activePage = 'home' }) => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const coursesList = [
    { id: 'course-apids', label: 'Advanced Program in Industrial Data Science & AI (APIDS)' },
    { id: 'course-apida', label: 'Advanced Program in Industrial Data Analytics & AI (APIDA)' },
    { id: 'course-specialist', label: 'Data Analytics Specialist (DAS)' },
    { id: 'course-aiml', label: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)' },
    { id: 'course-genai', label: 'Master Program in Generative AI & Agentic AI (MPGAA)' },
    { id: 'course-apcs', label: 'Advanced Program in Cybersecurity & Forensics (APCF)' }
  ];

  const servicesList = [
    { id: 'service-aics', label: 'AI Consulting Solutions' },
    { id: 'service-ccs', label: 'Corporate Consulting Services' },
    { id: 'service-crhta', label: 'Corporate Resource Hiring & Talent Augmentation' }
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.courses-dropdown-container')) {
        setCoursesDropdownOpen(false);
      }
      if (!target.closest('.services-dropdown-container')) {
        setServicesDropdownOpen(false);
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [activePage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCourseClick = (courseId: string) => {
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(courseId);
    }
  };

  const handleServiceClick = (serviceId: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(serviceId);
    }
  };

  const renderNavList = () => (
    <ul className="nav-list">
      <li 
        className="nav-item dropdown-container courses-dropdown-container"
        onMouseEnter={() => {
          if (window.innerWidth > 768) {
            setCoursesDropdownOpen(true);
            setServicesDropdownOpen(false);
          }
        }}
      >
        <a
          href="#courses"
          className={`dropdown-trigger ${coursesDropdownOpen ? 'open' : ''} ${activePage.startsWith('course-') ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setCoursesDropdownOpen(!coursesDropdownOpen);
          }}
        >
          All Courses
          <svg className={`chevron-icon ${coursesDropdownOpen ? 'rotated' : ''}`} viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <div className={`courses-dropdown-menu ${coursesDropdownOpen ? 'show' : ''}`}>
          {coursesList.map((course) => (
            <a
              key={course.id}
              href={`#${course.id}`}
              className="dropdown-item-link"
              onClick={(e) => {
                e.preventDefault();
                handleCourseClick(course.id);
              }}
            >
              {course.label}
            </a>
          ))}
        </div>
      </li>

      <li 
        className="nav-item dropdown-container services-dropdown-container"
        onMouseEnter={() => {
          if (window.innerWidth > 768) {
            setServicesDropdownOpen(true);
            setCoursesDropdownOpen(false);
          }
        }}
      >
        <a
          href="#services"
          className={`dropdown-trigger ${servicesDropdownOpen ? 'open' : ''} ${activePage === 'services' || activePage.startsWith('service-') ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            if (onNavClick) onNavClick('services');
          }}
        >
          Services
          <svg className={`chevron-icon ${servicesDropdownOpen ? 'rotated' : ''}`} viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <div className={`services-dropdown-menu ${servicesDropdownOpen ? 'show' : ''}`}>
          {servicesList.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="dropdown-item-link"
              onClick={(e) => {
                e.preventDefault();
                handleServiceClick(service.id);
              }}
            >
              {service.label}
            </a>
          ))}
        </div>
      </li>

      <li className="nav-item">
        <a
          href="#about"
          className={activePage === 'about' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onNavClick) onNavClick('about');
          }}
        >
          Who We Are
        </a>
      </li>

      <li className="nav-item">
        <a
          href="#blogs"
          className={activePage === 'blogs' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onNavClick) onNavClick('blogs');
          }}
        >
          Journal
        </a>
      </li>

      <li className="nav-item">
        <a
          href="#faqs"
          className={activePage === 'faqs' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onNavClick) onNavClick('faqs');
          }}
        >
          FAQs
        </a>
      </li>
    </ul>
  );

  return (
    <header className="site-header" data-section="header">
      <div className="header-container">
        <div className="desktop-header-row">
          <a href="/" className="logo-link" onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onNavClick) onNavClick('home');
          }}>
            <img src="/logo.png" alt="DV Analytics Logo" className="logo-image" />
          </a>

          <nav className="nav-panel desktop-nav-panel">
            {renderNavList()}
          </nav>

          <button
            className="btn-enroll-header"
            onClick={() => {
              if (onNavClick) onNavClick('enroll');
            }}
          >
            Enroll Now
          </button>
        </div>

        <div className="mobile-header-stack">
          <div className="mobile-header-row">
            {/* 1. Left: Hamburger menu */}
            <button
              type="button"
              className="nav-toggle-btn"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setMobileServicesOpen(false); // Close services when opening menu
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* 2. Center: Logo */}
            <a href="/" className="logo-link mobile-logo-link" onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              setMobileServicesOpen(false);
              if (onNavClick) onNavClick('home');
            }}>
              <img src="/logo.png" alt="DV Analytics Logo" className="logo-image mobile-logo-image" />
            </a>

            {/* 3. Right: Services Dropdown */}
            <div className="mobile-services-container services-dropdown-container">
              <a
                href="#services"
                className={`dropdown-trigger ${mobileServicesOpen ? 'open' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileServicesOpen(!mobileServicesOpen);
                  setMobileMenuOpen(false); // Close menu drawer when opening services
                }}
              >
                Services
                <svg className={`chevron-icon ${mobileServicesOpen ? 'rotated' : ''}`} viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div className={`services-dropdown-menu mobile-services-dropdown ${mobileServicesOpen ? 'show' : ''}`}>
                {servicesList.map((service) => (
                  <a
                    key={service.id}
                    href={`#${service.id}`}
                    className="dropdown-item-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileServicesOpen(false);
                      handleServiceClick(service.id);
                    }}
                  >
                    {service.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Menu Panel */}
          <nav className={`nav-panel mobile-nav-panel ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul className="nav-list">
              <li 
                className="nav-item dropdown-container courses-dropdown-container"
                onClick={() => {
                  setCoursesDropdownOpen(!coursesDropdownOpen);
                }}
              >
                <a
                  href="#courses"
                  className={`dropdown-trigger ${coursesDropdownOpen ? 'open' : ''} ${activePage.startsWith('course-') ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  All Courses
                  <svg className={`chevron-icon ${coursesDropdownOpen ? 'rotated' : ''}`} viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                <div className={`courses-dropdown-menu ${coursesDropdownOpen ? 'show' : ''}`}>
                  {coursesList.map((course) => (
                    <a
                      key={course.id}
                      href={`#${course.id}`}
                      className="dropdown-item-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCourseClick(course.id);
                      }}
                    >
                      {course.label}
                    </a>
                  ))}
                </div>
              </li>

              <li className="nav-item">
                <a
                  href="#about"
                  className={activePage === 'about' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (onNavClick) onNavClick('about');
                  }}
                >
                  Who We Are
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#blogs"
                  className={activePage === 'blogs' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (onNavClick) onNavClick('blogs');
                  }}
                >
                  Journal
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#faqs"
                  className={activePage === 'faqs' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (onNavClick) onNavClick('faqs');
                  }}
                >
                  FAQs
                </a>
              </li>

              {/* Enroll Now inside mobile menu only */}
              <li className="nav-item mobile-enroll-nav-item">
                <button
                  className="btn-enroll-header mobile-enroll-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavClick) onNavClick('enroll');
                  }}
                >
                  Enroll Now
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
