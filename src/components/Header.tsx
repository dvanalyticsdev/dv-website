import React, { useState, useEffect, useRef } from 'react';
import { getCourseMeta, liveTrainingCourses, selfPacedCourses } from '../data/courseMeta';
import { getPathFromPage } from '../utils/routes';

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

  const openCoursesDropdown = () => {
    setCoursesDropdownOpen(true);
    setActiveCourseGroupId((currentGroupId) => currentGroupId ?? courseGroups[0]?.id ?? null);
    clearCourseGroupHoverTimeout();
    setServicesDropdownOpen(false);
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
    const activeGroup = courseGroups.find((group) => group.id === activeCourseGroupId) ?? courseGroups[0];

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

        <div className="courses-submenu show" onMouseEnter={clearCourseGroupHoverTimeout}>
          <div className="courses-submenu-heading">{activeGroup.title}</div>
          {activeGroup.courses.map((course) => (
            <a
              key={course.id}
              href={getPathFromPage(course.id)}
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
      </div>
    );
  };

  const renderContactActions = (variant: 'desktop' | 'mobile') => (
    <div className={`header-contact-actions header-contact-actions-${variant}`}>
      <a className="header-contact-btn call" href="tel:+918095881188" aria-label="Call 8095 881 188" title="Call 8095 881 188">
        <svg className="header-contact-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.63 2.65a2 2 0 0 1-.45 2.11L8.02 9.75a16 16 0 0 0 6.23 6.23l1.27-1.27a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.65.63A2 2 0 0 1 22 16.92Z" />
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
            openCoursesDropdown();
          }
        }}
      >
        <a
          href={getPathFromPage('courses')}
          className={`dropdown-trigger ${coursesDropdownOpen ? 'open' : ''} ${activePage === 'courses' || activePage.startsWith('course-') ? 'active' : ''}`}
          aria-haspopup="true"
          aria-expanded={coursesDropdownOpen}
          aria-controls="desktop-courses-menu"
          onClick={(e) => {
            e.preventDefault();
            const nextOpen = !coursesDropdownOpen;
            if (nextOpen) {
              openCoursesDropdown();
            } else {
              setCoursesDropdownOpen(false);
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
          href={getPathFromPage('services')}
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
              href={getPathFromPage(service.id)}
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
          href={getPathFromPage('about')}
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
          href={getPathFromPage('alumni')}
          className={activePage === 'alumni' ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onNavClick) onNavClick('alumni');
          }}
        >
          Meet Our Alumni
        </a>
      </li>

      <li className="nav-item">
        <a
          href={getPathFromPage('apply-job')}
          className={`btn-enroll-header nav-upcoming-btn ${activePage === 'apply-job' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onNavClick) onNavClick('apply-job');
          }}
        >
          Apply Job
        </a>
      </li>

      <li className="nav-item">
        <a
          href={getPathFromPage('upcoming-batches')}
          className={`btn-enroll-header nav-upcoming-btn ${activePage === 'upcoming-batches' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onNavClick) onNavClick('upcoming-batches');
          }}
        >
          Upcoming Batches
        </a>
      </li>

      <li className="nav-item">
        <a
          href={getPathFromPage('blogs')}
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
    </ul>
  );

  return (
    <>
      <header className="site-header" data-section="header">
        <div className="header-container">
          <div className="desktop-header-row">
            <a href={getPathFromPage('home')} className="logo-link" onClick={(e) => {
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
                  setMobileServicesOpen(false);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              {/* 2. Center: Logo */}
              <a href={getPathFromPage('home')} className="logo-link mobile-logo-link" onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setMobileServicesOpen(false);
                if (onNavClick) onNavClick('home');
              }}>
                <img src="/logo.png" alt="DV Analytics Logo" className="logo-image mobile-logo-image" />
              </a>

              {/* 3. Right: Enroll Now Button */}
              <button
                type="button"
                className="btn-enroll-header mobile-top-enroll-btn"
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
            </div>

            {/* Drawer Menu Panel */}
            <nav className={`nav-panel mobile-nav-panel ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <ul className="nav-list">
                <li 
                  className="nav-item dropdown-container courses-dropdown-container"
                  onClick={() => {
                    const nextOpen = !mobileCoursesOpen;
                    setMobileCoursesOpen(nextOpen);
                    if (nextOpen) {
                      setActiveCourseGroupId(courseGroups[0]?.id ?? null);
                    } else {
                      setActiveCourseGroupId(null);
                    }
                  }}
                >
                  <a
                    href={getPathFromPage('courses')}
                    className={`dropdown-trigger ${mobileCoursesOpen ? 'open' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={mobileCoursesOpen}
                    aria-controls="mobile-courses-menu"
                  >
                    All Courses
                    <svg className={`chevron-icon ${mobileCoursesOpen ? 'rotated' : ''}`} viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  <div id="mobile-courses-menu" className={`courses-dropdown-menu mobile-courses-dropdown ${mobileCoursesOpen ? 'show' : ''}`}>
                    {renderCourseGroups('mobile')}
                  </div>
                </li>

                <li 
                  className="nav-item dropdown-container services-dropdown-container"
                  onClick={() => {
                    setMobileServicesOpen(!mobileServicesOpen);
                  }}
                >
                  <a
                    href={getPathFromPage('services')}
                    className={`dropdown-trigger ${mobileServicesOpen ? 'open' : ''} ${activePage.startsWith('service-') || activePage === 'services' ? 'active' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-menu"
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
                        href={getPathFromPage(service.id)}
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
                    href={getPathFromPage('about')}
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
                    href={getPathFromPage('alumni')}
                    className={activePage === 'alumni' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      if (onNavClick) onNavClick('alumni');
                    }}
                  >
                    Meet Our Alumni
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href={getPathFromPage('apply-job')}
                    className={`btn-enroll-header nav-upcoming-btn ${activePage === 'apply-job' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      if (onNavClick) onNavClick('apply-job');
                    }}
                  >
                    Apply Job
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href={getPathFromPage('upcoming-batches')}
                    className={`btn-enroll-header nav-upcoming-btn ${activePage === 'upcoming-batches' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      if (onNavClick) onNavClick('upcoming-batches');
                    }}
                  >
                    Upcoming Batches
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href={getPathFromPage('blogs')}
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
