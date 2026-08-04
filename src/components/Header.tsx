import React, { useState, useEffect, useRef } from 'react';
import { getCourseMeta, liveTrainingCourses, selfPacedCourses } from '../data/courseMeta';

interface HeaderProps {
  onNavClick?: (page: string) => void;
  activePage?: string;
  onCourseEnrollClick?: (courseId: string) => void;
  onCourseBrochureClick?: (courseId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavClick,
  activePage = 'home',
  onCourseEnrollClick,
  onCourseBrochureClick,
}) => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [activeCourseGroupId, setActiveCourseGroupId] = useState<string | null>(null);
  const courseGroupHoverTimeoutRef = useRef<number | null>(null);

  const courseGroups = [
    {
      id: 'live',
      title: 'Live Training Classes',
      courses: liveTrainingCourses.map((course) => ({
        id: `course-${course.id}`,
        label: course.label,
      })),
    },
    {
      id: 'self-paced',
      title: 'Self Paced Learning',
      courses: selfPacedCourses.map((course) => ({
        id: `course-${course.id}`,
        label: course.label,
      })),
    },
  ].filter((group) => group.courses.length > 0);
  const activeCourseId = activePage.startsWith('course-') ? activePage.replace('course-', '') : null;
  const activeCourse = getCourseMeta(activeCourseId ?? undefined);

  const servicesList = [
    { id: 'service-aics', label: 'AI Consulting Solutions' },
    { id: 'service-ccs', label: 'Corporate Consulting Services' },
    { id: 'service-crhta', label: 'Corporate Resource Hiring & Talent Augmentation' }
  ];

  const clearCourseGroupHoverTimeout = () => {
    if (courseGroupHoverTimeoutRef.current !== null) {
      window.clearTimeout(courseGroupHoverTimeoutRef.current);
      courseGroupHoverTimeoutRef.current = null;
    }
  };

  const handleCourseGroupHover = (groupId: string) => {
    clearCourseGroupHoverTimeout();

    if (!activeCourseGroupId) {
      setActiveCourseGroupId(groupId);
      return;
    }

    courseGroupHoverTimeoutRef.current = window.setTimeout(() => {
      setActiveCourseGroupId(groupId);
      courseGroupHoverTimeoutRef.current = null;
    }, 180);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.courses-dropdown-container')) {
        setCoursesDropdownOpen(false);
        setMobileCoursesOpen(false);
        setActiveCourseGroupId(null);
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
    return clearCourseGroupHoverTimeout;
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    setMobileCoursesOpen(false);
    setActiveCourseGroupId(null);
  }, [activePage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
        setMobileCoursesOpen(false);
        setActiveCourseGroupId(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCourseClick = (courseId: string) => {
    setCoursesDropdownOpen(false);
    setMobileCoursesOpen(false);
    setActiveCourseGroupId(null);
    clearCourseGroupHoverTimeout();
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

  const renderCourseGroups = (variant: 'desktop' | 'mobile') => {
    const activeGroup = courseGroups.find((group) => group.id === activeCourseGroupId);

    return (
      <div className={`courses-dropdown-shell courses-dropdown-shell-${variant}`}>
        <div className="courses-category-list">
          {courseGroups.map((group) => {
            const isActive = activeCourseGroupId === group.id;

            return (
              <button
                type="button"
                className={`courses-category-btn ${isActive ? 'active' : ''}`}
                key={group.id}
                aria-expanded={isActive}
                onMouseEnter={() => {
                  if (variant === 'desktop') {
                    handleCourseGroupHover(group.id);
                  }
                }}
                onMouseLeave={clearCourseGroupHoverTimeout}
                onClick={() => {
                  clearCourseGroupHoverTimeout();
                  setActiveCourseGroupId(isActive && variant === 'mobile' ? null : group.id);
                }}
              >
                <span>{group.title}</span>
                <svg className="courses-category-arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            );
          })}
        </div>

        <div
          className={`courses-submenu ${activeGroup ? 'show' : ''}`}
          onMouseEnter={clearCourseGroupHoverTimeout}
        >
          {activeGroup ? (
            <>
              <div className="courses-submenu-heading">{activeGroup.title}</div>
              {activeGroup.courses.map((course) => (
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
            </>
          ) : (
            <div className="courses-submenu-empty">Select a section</div>
          )}
        </div>
      </div>
    );
  };

  const renderContactActions = (variant: 'desktop' | 'mobile') => (
    <div className={`header-contact-actions header-contact-actions-${variant}`}>
      <a className="header-contact-btn call" href="tel:+919019030033" aria-label="Call 9019 030 033" title="Call 9019 030 033">
        <svg className="header-contact-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.02 9.75a16 16 0 0 0 6.23 6.23l1.27-1.27a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92Z" />
        </svg>
      </a>
      <a
        className="header-contact-btn whatsapp"
        href="https://wa.me/918249430414"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp at 8249430414"
        title="WhatsApp 8249430414"
      >
        <svg className="header-contact-icon whatsapp-icon" viewBox="0 0 448 512" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101 32 1 132 1 254.8c0 39.3 10.2 77.7 29.6 111.5L0 480l116.4-30.5c32.7 17.8 69.5 27.2 107.4 27.2h.1c122.8 0 222.8-100 222.8-222.8 0-59.5-23.2-115.4-65.8-156.8ZM223.9 439.1c-33.7 0-66.7-9.1-95.5-26.2l-6.8-4-69 18.1 18.4-67.3-4.4-6.9c-18.8-29.8-28.8-64.1-28.8-99.9 0-102.6 83.5-186.2 186.1-186.2 49.7 0 96.4 19.4 131.6 54.6 35.2 35.3 54.6 82.1 54.5 131.8 0 102.6-83.5 186-186.1 186Zm101.9-139.3c-5.6-2.8-33.1-16.3-38.2-18.2-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.2-17.6 21.9-3.2 3.7-6.5 4.2-12.1 1.4-33.1-16.5-54.8-29.5-76.6-66.8-5.8-10 5.8-9.3 16.5-30.9 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.7 57.4c2.8 3.7 39.1 59.7 94.8 83.7 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 33.1-13.5 37.8-26.5 4.7-13 4.7-24.1 3.2-26.5-1.3-2.5-5-3.9-10.6-6.7Z" />
        </svg>
      </a>
    </div>
  );

  const renderNavList = () => (
    <ul className="nav-list">
      <li 
        className="nav-item dropdown-container courses-dropdown-container"
        onMouseEnter={() => {
          if (window.innerWidth > 768) {
            setCoursesDropdownOpen(true);
            setActiveCourseGroupId(null);
            clearCourseGroupHoverTimeout();
            setServicesDropdownOpen(false);
          }
        }}
      >
        <a
          href="#courses"
          className={`dropdown-trigger ${coursesDropdownOpen ? 'open' : ''} ${activePage.startsWith('course-') ? 'active' : ''}`}
          aria-haspopup="true"
          aria-expanded={coursesDropdownOpen}
          aria-controls="desktop-courses-menu"
          onClick={(e) => {
            e.preventDefault();
            const nextOpen = !coursesDropdownOpen;
            setCoursesDropdownOpen(nextOpen);
            if (!nextOpen) {
              setActiveCourseGroupId(null);
              clearCourseGroupHoverTimeout();
            }
          }}
        >
          All Courses
          <svg className={`chevron-icon ${coursesDropdownOpen ? 'rotated' : ''}`} viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <div id="desktop-courses-menu" className={`courses-dropdown-menu ${coursesDropdownOpen ? 'show' : ''}`}>
          {renderCourseGroups('desktop')}
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
          aria-haspopup="true"
          aria-expanded={servicesDropdownOpen}
          aria-controls="desktop-services-menu"
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

        <div id="desktop-services-menu" className={`services-dropdown-menu ${servicesDropdownOpen ? 'show' : ''}`}>
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
    <>
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

          <div className="header-course-actions">
            {activeCourse ? (
              <>
                <button
                  className="btn-enroll-header"
                  onClick={() => onCourseEnrollClick?.(activeCourse.id)}
                >
                  Enroll Now
                </button>
                {renderContactActions('desktop')}
                <button
                  className="btn-header-brochure"
                  onClick={() => onCourseBrochureClick?.(activeCourse.id)}
                  disabled={!activeCourse.brochurePath}
                >
                  {activeCourse.brochurePath ? 'Download Brochure' : 'Brochure Coming Soon'}
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-enroll-header"
                  onClick={() => {
                    if (onNavClick) onNavClick('enroll');
                  }}
                >
                  Enroll Now
                </button>
                {renderContactActions('desktop')}
              </>
            )}
          </div>
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

            {/* 3. Right: Courses Dropdown */}
            <div className="mobile-courses-container courses-dropdown-container">
              <a
                href="#courses"
                className={`dropdown-trigger ${mobileCoursesOpen ? 'open' : ''}`}
                aria-haspopup="true"
                aria-expanded={mobileCoursesOpen}
                aria-controls="mobile-courses-menu"
                onClick={(e) => {
                  e.preventDefault();
                  const nextOpen = !mobileCoursesOpen;
                  setMobileCoursesOpen(nextOpen);
                  if (!nextOpen) {
                    setActiveCourseGroupId(null);
                  }
                  setMobileMenuOpen(false); // Close menu drawer when opening courses
                }}
              >
                All Courses
                <svg className={`chevron-icon ${mobileCoursesOpen ? 'rotated' : ''}`} viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div id="mobile-courses-menu" className={`courses-dropdown-menu mobile-courses-dropdown ${mobileCoursesOpen ? 'show' : ''}`}>
                {renderCourseGroups('mobile')}
              </div>
            </div>
          </div>

          {/* Drawer Menu Panel */}
          <nav className={`nav-panel mobile-nav-panel ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul className="nav-list">
              <li 
                className="nav-item dropdown-container services-dropdown-container"
                onClick={() => {
                  setMobileServicesOpen(!mobileServicesOpen);
                }}
              >
                <a
                  href="#services"
                  className={`dropdown-trigger ${mobileServicesOpen ? 'open' : ''} ${activePage.startsWith('service-') || activePage === 'services' ? 'active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-menu"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Services
                  <svg className={`chevron-icon ${mobileServicesOpen ? 'rotated' : ''}`} viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                <div id="mobile-services-menu" className={`services-dropdown-menu ${mobileServicesOpen ? 'show' : ''}`}>
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

              <li className="mobile-enroll-nav-item">
                <button
                  type="button"
                  className="mobile-enroll-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (activeCourse) {
                      onCourseEnrollClick?.(activeCourse.id);
                    } else if (onNavClick) {
                      onNavClick('enroll');
                    }
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

      <div className="mobile-floating-contact-actions">
        {renderContactActions('mobile')}
      </div>
    </>
  );
};
