import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './TrackingDashboard.css';
import type { LeadSubmission } from '../../services/leadTrackingService';
import {
  getStoredSubmissions,
  getRemoteSubmissions,
  authenticateDashboard,
  clearRemoteSubmissions,
  DASHBOARD_TOKEN_STORAGE_KEY,
  exportSubmissionsExcel,
  clearStoredSubmissions,
} from '../../services/leadTrackingService';

const AUTH_STORAGE_KEY = 'dv_dashboard_pin_authenticated';

interface TrackingDashboardProps {
  onNavigateHome?: () => void;
}

export const TrackingDashboard: React.FC<TrackingDashboardProps> = ({ onNavigateHome }) => {
  // Set browser title on mount
  useEffect(() => {
    document.title = 'Form Submission Tracking Dashboard | DV Analytics';
  }, []);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true' && Boolean(window.sessionStorage.getItem(DASHBOARD_TOKEN_STORAGE_KEY));
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Dashboard Data State
  const [submissions, setSubmissions] = useState<LeadSubmission[]>([]);
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'all' | 'custom'>('7d');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'pages'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormFilter, setSelectedFormFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);

  // Load submissions from storage
  const reloadData = useCallback(() => {
    setSubmissions(getStoredSubmissions());
    void getRemoteSubmissions().then((remote) => {
      setSubmissions(remote);
      window.localStorage.setItem('dv_lead_submissions_v2', JSON.stringify(remote));
    }).catch((error) => console.error('Could not load persistent dashboard records', error));
  }, []);

  useEffect(() => {
    reloadData();

    // Listen to real-time custom events when leads are submitted anywhere on the site
    const handleNewLead = () => reloadData();
    const handleReset = () => reloadData();

    window.addEventListener('dv_new_lead_recorded', handleNewLead);
    window.addEventListener('dv_leads_reset', handleReset);
    window.addEventListener('dv_leads_cleared', handleReset);

    return () => {
      window.removeEventListener('dv_new_lead_recorded', handleNewLead);
      window.removeEventListener('dv_leads_reset', handleReset);
      window.removeEventListener('dv_leads_cleared', handleReset);
    };
  }, [reloadData]);

  // Handle PIN Submission
  const authenticateWithPin = async (pin: string) => {
    const authenticated = await authenticateDashboard(pin).catch(() => false);
    if (authenticated) {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setPinError('');
      setPinInput('');
      reloadData();
    } else {
      setPinError('Incorrect dashboard PIN or API unavailable.');
      setPinInput('');
    }
  };

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    void authenticateWithPin(pinInput.trim());
  };

  const handleKeypadPress = (val: string) => {
    if (pinInput.length < 4) {
      const next = pinInput + val;
      setPinInput(next);
      setPinError('');
      if (next.length === 4) {
        void authenticateWithPin(next);
      }
    }
  };

  const handleKeypadBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setPinError('');
  };

  const handleLock = () => {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    window.sessionStorage.removeItem(DASHBOARD_TOKEN_STORAGE_KEY);
    setIsAuthenticated(false);
    setPinInput('');
    setPinError('');
  };

  const handleClearRecords = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all form submission records? All counts will be reset to zero (0). (You can export to Excel first to keep a backup).'
    );
    if (confirmed) {
      clearStoredSubmissions();
      void clearRemoteSubmissions().then(reloadData).catch((error) => {
        console.error('Could not clear persistent dashboard records', error);
        reloadData();
      });
    }
  };

  // Filter submissions by date range
  const filteredByDate = useMemo(() => {
    if (dateRange === 'all') return submissions;
    const now = Date.now();
    let cutoff = 0;
    if (dateRange === 'today') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      cutoff = startOfDay.getTime();
      return submissions.filter((item) => new Date(item.timestamp).getTime() >= cutoff);
    } else if (dateRange === '7d') {
      cutoff = now - 7 * 24 * 60 * 60 * 1000;
      return submissions.filter((item) => new Date(item.timestamp).getTime() >= cutoff);
    } else if (dateRange === '30d') {
      cutoff = now - 30 * 24 * 60 * 60 * 1000;
      return submissions.filter((item) => new Date(item.timestamp).getTime() >= cutoff);
    } else if (dateRange === 'custom') {
      let startMs = 0;
      let endMs = Infinity;
      if (customStartDate) {
        const [y, m, d] = customStartDate.split('-').map(Number);
        const s = new Date(y, m - 1, d, 0, 0, 0, 0);
        startMs = s.getTime();
      }
      if (customEndDate) {
        const [y, m, d] = customEndDate.split('-').map(Number);
        const e = new Date(y, m - 1, d, 23, 59, 59, 999);
        endMs = e.getTime();
      }
      return submissions.filter((item) => {
        const t = new Date(item.timestamp).getTime();
        return t >= startMs && t <= endMs;
      });
    }
    return submissions;
  }, [submissions, dateRange, customStartDate, customEndDate]);

  // Filter submissions for table
  const tableData = useMemo(() => {
    return filteredByDate.filter((item) => {
      // Form Filter
      if (selectedFormFilter !== 'all' && item.formType !== selectedFormFilter) {
        return false;
      }
      // Category Filter
      if (selectedCategoryFilter !== 'all' && item.pageCategory !== selectedCategoryFilter) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesPhone = item.phone.toLowerCase().includes(q);
        const matchesEmail = item.email.toLowerCase().includes(q);
        const matchesCourse = item.course.toLowerCase().includes(q);
        const matchesPage = item.pagePath.toLowerCase().includes(q);
        const matchesState = (item.state || '').toLowerCase().includes(q);
        return matchesName || matchesPhone || matchesEmail || matchesCourse || matchesPage || matchesState;
      }
      return true;
    });
  }, [filteredByDate, selectedFormFilter, selectedCategoryFilter, searchQuery]);

  // Aggregate Form Submission KPIs
  const kpis = useMemo(() => {
    const total = filteredByDate.length;
    let brochures = 0;
    let counselling = 0;
    let heroLanding = 0;
    let fullEnroll = 0;

    filteredByDate.forEach((s) => {
      if (s.formType === 'download-brochure') brochures++;
      else if (s.formType === 'free-counselling') counselling++;
      else if (s.formType === 'hero-registration') heroLanding++;
      else if (s.formType === 'full-enrollment') fullEnroll++;
    });

    // Page Category Split
    let landingCount = 0;
    let courseCount = 0;
    let mainCount = 0;

    filteredByDate.forEach((s) => {
      if (s.pageCategory === 'landing-page') landingCount++;
      else if (s.pageCategory === 'course-detail') courseCount++;
      else mainCount++;
    });

    return {
      total,
      brochures,
      counselling,
      heroLanding,
      fullEnroll,
      landingCount,
      courseCount,
      mainCount,
    };
  }, [filteredByDate]);

  // Aggregation by Course
  const courseBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredByDate.forEach((s) => {
      let shortCourse = 'Other / General';
      const c = s.course.toUpperCase();
      if (c.includes('APIDS')) shortCourse = 'APIDS (Data Science + AI)';
      else if (c.includes('APIDA')) shortCourse = 'APIDA (Data Science + Gen AI)';
      else if (c.includes('FDE') || c.includes('DEPLOYMENT')) shortCourse = 'FDE (Forward Deployment)';
      else if (c.includes('SPECIALIST') || c.includes('DAS')) shortCourse = 'DAS (Data Analytics)';
      else if (c.includes('CYBER') || c.includes('APCF') || c.includes('APCS')) shortCourse = 'APCF (Cybersecurity)';
      else if (c.includes('FLEXI') || c.includes('FLP')) shortCourse = 'FLP (Flexi Learning)';

      counts[shortCourse] = (counts[shortCourse] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        pct: kpis.total > 0 ? Math.round((count / kpis.total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [filteredByDate, kpis.total]);

  // Aggregation by Page URL
  const pageBreakdown = useMemo(() => {
    const counts: Record<string, { count: number; category: string; categoryLabel: string }> = {};
    filteredByDate.forEach((s) => {
      const p = s.pagePath || '/';
      if (!counts[p]) {
        counts[p] = { count: 0, category: s.pageCategory, categoryLabel: s.pageCategoryLabel };
      }
      counts[p].count++;
    });

    return Object.entries(counts)
      .map(([path, data]) => ({
        path,
        count: data.count,
        category: data.category,
        categoryLabel: data.categoryLabel,
        pct: kpis.total > 0 ? Math.round((data.count / kpis.total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [filteredByDate, kpis.total]);

  // Top course for summary card
  const topCourse = courseBreakdown.length > 0 ? courseBreakdown[0] : null;

  // RENDER PIN LOCK SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="dv-dash-root dv-pin-lock-wrap">
        <div className="dv-pin-card">
          <div className="dv-pin-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <div className="dv-pin-badge">Restricted Access • PIN Protected</div>
          <h1>Lead Tracking Dashboard</h1>
          <p>Please enter your 4-digit PIN to access live website form submission analytics.</p>

          <form onSubmit={handlePinSubmit}>
            <div className="dv-pin-display-row">
              {[0, 1, 2, 3].map((idx) => {
                const char = pinInput[idx];
                return (
                  <div key={idx} className={`dv-pin-box ${char ? 'filled' : ''}`}>
                    {char ? '•' : ''}
                  </div>
                );
              })}
            </div>

            {pinError && <div className="dv-pin-error">{pinError}</div>}

            <div className="dv-keypad-grid">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  className="dv-keypad-btn"
                  onClick={() => handleKeypadPress(digit)}
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                className="dv-keypad-btn action-btn"
                onClick={() => setPinInput('')}
              >
                Clear
              </button>
              <button
                type="button"
                className="dv-keypad-btn"
                onClick={() => handleKeypadPress('0')}
              >
                0
              </button>
              <button
                type="button"
                className="dv-keypad-btn action-btn"
                onClick={handleKeypadBackspace}
                aria-label="Backspace"
              >
                ⌫
              </button>
            </div>

            <button
              type="submit"
              className="dv-dash-btn dv-dash-btn-primary"
              style={{ width: '100%', justifyContent: 'center', height: '48px', marginTop: '10px' }}
            >
              Unlock Dashboard →
            </button>
          </form>

          {onNavigateHome && (
            <button
              type="button"
              className="dv-pin-back-link"
              onClick={onNavigateHome}
              style={{ background: 'none', border: 'none' }}
            >
              ← Return to Main Website
            </button>
          )}
        </div>
      </div>
    );
  }

  // RENDER MAIN AUTHENTICATED DASHBOARD
  return (
    <div className="dv-dash-root">
      <div className="dv-dash-container">
        
        {/* HEADER */}
        <header className="dv-dash-header">
          <div className="dv-dash-brand">
            <div className="dv-dash-logo-badge">DV</div>
            <div className="dv-dash-title-group">
              <h1>
                Form Submission Tracking Dashboard
                <span className="dv-live-pill">
                  <span className="dv-live-dot"></span> Live Tracking
                </span>
              </h1>
              <p className="dv-dash-subtitle">
                Real-time lead submissions, brochure downloads, counselling requests &amp; page breakdown
              </p>
            </div>
          </div>

          <div className="dv-dash-actions">
            <button
              type="button"
              className="dv-dash-btn dv-dash-btn-excel"
              onClick={() => exportSubmissionsExcel(filteredByDate)}
              title="Export all filtered leads directly to Microsoft Excel (.xls)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="8" y1="13" x2="16" y2="13"></line>
                <line x1="8" y1="17" x2="16" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Export to Excel
            </button>

            <button
              type="button"
              className="dv-dash-btn dv-dash-btn-secondary"
              onClick={reloadData}
              title="Refresh latest data"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              Refresh
            </button>

            <button
              type="button"
              className="dv-dash-btn dv-dash-btn-outline-danger"
              onClick={handleClearRecords}
              title="Clear all stored lead submissions and reset to zero"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Clear Records (0)
            </button>

            <button
              type="button"
              className="dv-dash-btn dv-dash-btn-danger"
              onClick={handleLock}
              title="Lock dashboard session"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Lock
            </button>
          </div>
        </header>

        {/* FILTER BAR & NAVIGATION TABS */}
        <div className="dv-dash-filter-bar">
          <div className="dv-time-filters">
            {(['today', '7d', '30d', 'all', 'custom'] as const).map((range) => (
              <button
                key={range}
                type="button"
                className={`dv-time-pill ${dateRange === range ? 'active' : ''}`}
                onClick={() => {
                  setDateRange(range);
                  if (range === 'custom' && !customStartDate && !customEndDate) {
                    const today = new Date();
                    const twoWeeksAgo = new Date();
                    twoWeeksAgo.setDate(today.getDate() - 14);
                    const pad = (n: number) => String(n).padStart(2, '0');
                    setCustomStartDate(`${twoWeeksAgo.getFullYear()}-${pad(twoWeeksAgo.getMonth() + 1)}-${pad(twoWeeksAgo.getDate())}`);
                    setCustomEndDate(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`);
                  }
                }}
              >
                {range === 'today' && 'Today'}
                {range === '7d' && 'Last 7 Days'}
                {range === '30d' && 'Last 30 Days'}
                {range === 'all' && 'All Time'}
                {range === 'custom' && 'Custom Timeline'}
              </button>
            ))}

            {dateRange === 'custom' && (
              <div className="dv-custom-date-box">
                <span className="dv-custom-date-label">From:</span>
                <input
                  type="date"
                  className="dv-custom-date-input"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  aria-label="Filter start date"
                />
                <span className="dv-custom-date-sep">to</span>
                <input
                  type="date"
                  className="dv-custom-date-input"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  aria-label="Filter end date"
                />
              </div>
            )}
          </div>

          <div className="dv-dash-tabs">
            <button
              type="button"
              className={`dv-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Form Breakdown &amp; KPIs
            </button>

            <button
              type="button"
              className={`dv-tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('submissions')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              All Form Submissions ({filteredByDate.length})
            </button>

            <button
              type="button"
              className={`dv-tab-btn ${activeTab === 'pages' ? 'active' : ''}`}
              onClick={() => setActiveTab('pages')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              Page Matrix ({pageBreakdown.length})
            </button>
          </div>
        </div>

        {/* TOP SUMMARY KPI CARDS */}
        <div className="dv-kpi-grid">
          <div className="dv-kpi-card" style={{ '--kpi-accent': '#ef5323' } as React.CSSProperties}>
            <div className="dv-kpi-top">
              <span className="dv-kpi-label">Total Form Submissions</span>
              <div className="dv-kpi-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <div className="dv-kpi-value">{kpis.total}</div>
            <div className="dv-kpi-meta">Across all pages &amp; forms</div>
          </div>

          <div className="dv-kpi-card" style={{ '--kpi-accent': '#10b981' } as React.CSSProperties}>
            <div className="dv-kpi-top">
              <span className="dv-kpi-label">Landing Page Registrations</span>
              <div className="dv-kpi-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
            </div>
            <div className="dv-kpi-value">{kpis.heroLanding}</div>
            <div className="dv-kpi-meta">Hero lead forms on /lp/apids, /lp/apida, /lp/fde</div>
          </div>

          <div className="dv-kpi-card" style={{ '--kpi-accent': '#0284c7' } as React.CSSProperties}>
            <div className="dv-kpi-top">
              <span className="dv-kpi-label">Brochure Downloads</span>
              <div className="dv-kpi-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
            </div>
            <div className="dv-kpi-value">{kpis.brochures}</div>
            <div className="dv-kpi-meta">Course curriculum syllabus PDF leads</div>
          </div>

          <div className="dv-kpi-card" style={{ '--kpi-accent': '#f59e0b' } as React.CSSProperties}>
            <div className="dv-kpi-top">
              <span className="dv-kpi-label">Counselling Requests</span>
              <div className="dv-kpi-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
            <div className="dv-kpi-value">{kpis.counselling}</div>
            <div className="dv-kpi-meta">Sticky side &amp; floating consultation inquiries</div>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS BREAKDOWN */}
        {activeTab === 'overview' && (
          <>
            <div className="dv-breakdown-row">
              {/* PAGE ECOSYSTEM BREAKDOWN */}
              <div className="dv-panel">
                <div className="dv-panel-header">
                  <h2>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef5323" strokeWidth="2.3">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    Page-Based Form Distribution
                  </h2>
                  <span className="dv-panel-tag">By Page Type</span>
                </div>

                <div className="dv-metric-list">
                  <div className="dv-metric-item">
                    <div className="dv-metric-item-info">
                      <span className="dv-metric-title">Story Landing Pages (/lp/*)</span>
                      <span className="dv-metric-count">
                        {kpis.landingCount} submissions <span className="dv-metric-pct">({kpis.total > 0 ? Math.round((kpis.landingCount / kpis.total) * 100) : 0}%)</span>
                      </span>
                    </div>
                    <div className="dv-prog-bar-track">
                      <div
                        className="dv-prog-bar-fill"
                        style={{ width: `${kpis.total > 0 ? (kpis.landingCount / kpis.total) * 100 : 0}%`, background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)' }}
                      />
                    </div>
                  </div>

                  <div className="dv-metric-item">
                    <div className="dv-metric-item-info">
                      <span className="dv-metric-title">Course Detail Pages (/courses/*)</span>
                      <span className="dv-metric-count">
                        {kpis.courseCount} submissions <span className="dv-metric-pct">({kpis.total > 0 ? Math.round((kpis.courseCount / kpis.total) * 100) : 0}%)</span>
                      </span>
                    </div>
                    <div className="dv-prog-bar-track">
                      <div
                        className="dv-prog-bar-fill"
                        style={{ width: `${kpis.total > 0 ? (kpis.courseCount / kpis.total) * 100 : 0}%`, background: 'linear-gradient(90deg, #0284c7 0%, #0369a1 100%)' }}
                      />
                    </div>
                  </div>

                  <div className="dv-metric-item">
                    <div className="dv-metric-item-info">
                      <span className="dv-metric-title">Main Website (Home, About, Header, etc.)</span>
                      <span className="dv-metric-count">
                        {kpis.mainCount} submissions <span className="dv-metric-pct">({kpis.total > 0 ? Math.round((kpis.mainCount / kpis.total) * 100) : 0}%)</span>
                      </span>
                    </div>
                    <div className="dv-prog-bar-track">
                      <div
                        className="dv-prog-bar-fill"
                        style={{ width: `${kpis.total > 0 ? (kpis.mainCount / kpis.total) * 100 : 0}%`, background: 'linear-gradient(90deg, #ef5323 0%, #d43b0d 100%)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PROGRAM INTEREST BREAKDOWN */}
              <div className="dv-panel">
                <div className="dv-panel-header">
                  <h2>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.3">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    Program Interest Breakdown
                  </h2>
                  <span className="dv-panel-tag">By Course</span>
                </div>

                <div className="dv-metric-list">
                  {courseBreakdown.map((item) => (
                    <div key={item.name} className="dv-metric-item">
                      <div className="dv-metric-item-info">
                        <span className="dv-metric-title">{item.name}</span>
                        <span className="dv-metric-count">
                          {item.count} leads <span className="dv-metric-pct">({item.pct}%)</span>
                        </span>
                      </div>
                      <div className="dv-prog-bar-track">
                        <div className="dv-prog-bar-fill" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                  {courseBreakdown.length === 0 && (
                    <div style={{ color: '#64748b', textAlign: 'center', padding: '20px 0' }}>No course data recorded yet.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="dv-breakdown-row">
              {/* FORM TYPE BREAKDOWN */}
              <div className="dv-panel">
                <div className="dv-panel-header">
                  <h2>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.3">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Form Type &amp; Intent Breakdown
                  </h2>
                  <span className="dv-panel-tag">Action Types</span>
                </div>

                <div className="dv-metric-list">
                  <div className="dv-metric-item">
                    <div className="dv-metric-item-info">
                      <span className="dv-metric-title">Course Brochure Downloads (PDF Trigger)</span>
                      <span className="dv-metric-count">{kpis.brochures}</span>
                    </div>
                    <div className="dv-prog-bar-track">
                      <div className="dv-prog-bar-fill" style={{ width: `${kpis.total > 0 ? (kpis.brochures / kpis.total) * 100 : 0}%`, background: '#0284c7' }} />
                    </div>
                  </div>

                  <div className="dv-metric-item">
                    <div className="dv-metric-item-info">
                      <span className="dv-metric-title">Book Free Counselling (Call Back Requests)</span>
                      <span className="dv-metric-count">{kpis.counselling}</span>
                    </div>
                    <div className="dv-prog-bar-track">
                      <div className="dv-prog-bar-fill" style={{ width: `${kpis.total > 0 ? (kpis.counselling / kpis.total) * 100 : 0}%`, background: '#ef5323' }} />
                    </div>
                  </div>

                  <div className="dv-metric-item">
                    <div className="dv-metric-item-info">
                      <span className="dv-metric-title">Landing Page Hero Lead Registrations</span>
                      <span className="dv-metric-count">{kpis.heroLanding}</span>
                    </div>
                    <div className="dv-prog-bar-track">
                      <div className="dv-prog-bar-fill" style={{ width: `${kpis.total > 0 ? (kpis.heroLanding / kpis.total) * 100 : 0}%`, background: '#10b981' }} />
                    </div>
                  </div>

                  <div className="dv-metric-item">
                    <div className="dv-metric-item-info">
                      <span className="dv-metric-title">Full Course Enrollment Queries (/enroll)</span>
                      <span className="dv-metric-count">{kpis.fullEnroll}</span>
                    </div>
                    <div className="dv-prog-bar-track">
                      <div className="dv-prog-bar-fill" style={{ width: `${kpis.total > 0 ? (kpis.fullEnroll / kpis.total) * 100 : 0}%`, background: '#8b5cf6' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK CONVERSION SUMMARY & EXPORT CARD */}
              <div className="dv-panel">
                <div className="dv-panel-header">
                  <h2>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef5323" strokeWidth="2.3">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Lead Data Management &amp; Export
                  </h2>
                  <span className="dv-panel-tag">Quick Action</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#556987', marginBottom: '6px' }}>Current Filtered Scope</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#051f40' }}>
                      {kpis.total} Form Submissions
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                      {dateRange === 'today' && 'Timeline: Today'}
                      {dateRange === '7d' && 'Timeline: Last 7 Days'}
                      {dateRange === '30d' && 'Timeline: Last 30 Days'}
                      {dateRange === 'all' && 'Timeline: All Time'}
                      {dateRange === 'custom' && `Timeline: ${customStartDate || 'Start'} to ${customEndDate || 'Now'}`}
                      {topCourse ? ` • Top Course: ${topCourse.name}` : ''}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      type="button"
                      className="dv-dash-btn dv-dash-btn-excel"
                      style={{ justifyContent: 'center', height: '48px', width: '100%', fontSize: '0.94rem' }}
                      onClick={() => exportSubmissionsExcel(filteredByDate)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="8" y1="13" x2="16" y2="13"></line>
                        <line x1="8" y1="17" x2="16" y2="17"></line>
                      </svg>
                      Download Excel Sheet (.xls)
                    </button>

                    <button
                      type="button"
                      className="dv-dash-btn dv-dash-btn-outline-danger"
                      style={{ justifyContent: 'center', height: '42px', width: '100%', fontSize: '0.88rem' }}
                      onClick={handleClearRecords}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      Clear All Records (Reset to 0)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: LIVE SUBMISSIONS DATA LOG TABLE */}
        {activeTab === 'submissions' && (
          <div className="dv-table-panel">
            <div className="dv-table-toolbar">
              <div className="dv-search-wrap">
                <svg className="dv-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, phone, email, course, page..."
                  className="dv-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="dv-table-filters">
                <select
                  className="dv-select-filter"
                  value={selectedFormFilter}
                  onChange={(e) => setSelectedFormFilter(e.target.value)}
                >
                  <option value="all">All Form Types</option>
                  <option value="download-brochure">Brochure Downloads</option>
                  <option value="free-counselling">Free Counselling</option>
                  <option value="hero-registration">Landing Page Hero Forms</option>
                  <option value="full-enrollment">Full Enrollments</option>
                </select>

                <select
                  className="dv-select-filter"
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                >
                  <option value="all">All Page Categories</option>
                  <option value="landing-page">Story Landing Pages (/lp/*)</option>
                  <option value="course-detail">Course Detail Pages (/courses/*)</option>
                  <option value="main-site">Main Website Pages</option>
                  <option value="enrollment-page">Enrollment Pages</option>
                </select>

                <button
                  type="button"
                  className="dv-dash-btn dv-dash-btn-excel"
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                  onClick={() => exportSubmissionsExcel(tableData)}
                  title="Export currently filtered table view directly to Microsoft Excel (.xls)"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="8" y1="13" x2="16" y2="13"></line>
                    <line x1="8" y1="17" x2="16" y2="17"></line>
                  </svg>
                  Export Table to Excel
                </button>
              </div>
            </div>

            <div className="dv-table-responsive">
              <table className="dv-table">
                <thead>
                  <tr>
                    <th>Time (IST)</th>
                    <th>Lead Name</th>
                    <th>Contact Info</th>
                    <th>Form Type</th>
                    <th>Program</th>
                    <th>Origin Page</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((lead) => {
                    let badgeClass = 'dv-badge-landing';
                    if (lead.formType === 'download-brochure') badgeClass = 'dv-badge-brochure';
                    else if (lead.formType === 'free-counselling') badgeClass = 'dv-badge-counselling';
                    else if (lead.formType === 'full-enrollment') badgeClass = 'dv-badge-enrollment';

                    return (
                      <tr key={lead.id}>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', color: '#64748b' }}>
                          {lead.displayTime}
                        </td>
                        <td style={{ fontWeight: 700, color: '#051f40' }}>
                          {lead.name}
                        </td>
                        <td>
                          <div className="dv-contact-group">
                            <span className="dv-contact-phone">
                              <a href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {lead.phone}
                              </a>
                            </span>
                            {lead.email && <span className="dv-contact-email">{lead.email}</span>}
                          </div>
                        </td>
                        <td>
                          <span className={`dv-badge ${badgeClass}`}>
                            {lead.formType === 'download-brochure' && '📄 Brochure'}
                            {lead.formType === 'free-counselling' && '📞 Counselling'}
                            {lead.formType === 'hero-registration' && '🎯 Landing Form'}
                            {lead.formType === 'full-enrollment' && '🎓 Enrollment'}
                            {lead.formType === 'job-application' && '💼 Job Apply'}
                          </span>
                        </td>
                        <td>
                          <div className="dv-course-pill" title={lead.course}>
                            {lead.course}
                          </div>
                        </td>
                        <td>
                          <a href={lead.pagePath} target="_blank" rel="noopener noreferrer" className="dv-page-link">
                            {lead.pagePath}
                          </a>
                        </td>
                        <td style={{ fontSize: '0.82rem', color: '#64748b' }}>
                          {lead.state || '—'}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="dv-dash-btn dv-dash-btn-secondary"
                            style={{ padding: '5px 10px', fontSize: '0.78rem' }}
                            onClick={() => setSelectedLead(lead)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {tableData.length === 0 && (
                    <tr>
                      <td colSpan={8} className="dv-empty-table">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ margin: '0 auto', opacity: 0.5 }}>
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <p>No lead submissions match your selected filters or search query.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PAGE-BY-PAGE PERFORMANCE MATRIX */}
        {activeTab === 'pages' && (
          <div className="dv-table-panel">
            <div className="dv-table-toolbar">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#051f40' }}>
                Page-by-Page Form Submission Breakdown
              </h2>
              <span className="dv-panel-tag">{pageBreakdown.length} Unique Pages Captured</span>
            </div>

            <div className="dv-table-responsive">
              <table className="dv-table">
                <thead>
                  <tr>
                    <th>URL Path</th>
                    <th>Category</th>
                    <th>Total Submissions</th>
                    <th>Share of Total Leads</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageBreakdown.map((row) => (
                    <tr key={row.path}>
                      <td>
                        <a href={row.path} target="_blank" rel="noopener noreferrer" className="dv-page-link" style={{ fontSize: '0.92rem' }}>
                          {row.path}
                        </a>
                      </td>
                      <td>
                        <span className="dv-badge dv-badge-landing" style={{ textTransform: 'capitalize' }}>
                          {row.categoryLabel}
                        </span>
                      </td>
                      <td style={{ fontWeight: 800, fontSize: '1.1rem', color: '#051f40' }}>
                        {row.count}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="dv-prog-bar-track" style={{ width: '120px' }}>
                            <div className="dv-prog-bar-fill" style={{ width: `${row.pct}%` }} />
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#64748b' }}>{row.pct}%</span>
                        </div>
                      </td>
                      <td>
                        <a href={row.path} target="_blank" rel="noopener noreferrer" style={{ color: '#ef5323', fontSize: '0.84rem', fontWeight: 600, textDecoration: 'none' }}>
                          Open Page →
                        </a>
                      </td>
                    </tr>
                  ))}
                  {pageBreakdown.length === 0 && (
                    <tr>
                      <td colSpan={5} className="dv-empty-table">
                        <p>No page conversions recorded in this time range.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* LEAD DETAILS POPUP MODAL */}
      {selectedLead && (
        <div className="dv-dash-modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="dv-dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dv-dash-modal-header">
              <h3>Lead Submission Details</h3>
              <button
                type="button"
                className="dv-dash-modal-close"
                onClick={() => setSelectedLead(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="dv-dash-modal-body">
              <div className="dv-detail-item">
                <span className="dv-detail-label">Full Name</span>
                <span className="dv-detail-val" style={{ fontWeight: 700, color: '#051f40' }}>{selectedLead.name}</span>
              </div>

              <div className="dv-detail-item">
                <span className="dv-detail-label">Phone Number</span>
                <span className="dv-detail-val">
                  <a href={`tel:${selectedLead.phone.replace(/[^0-9+]/g, '')}`} style={{ color: '#ef5323', textDecoration: 'none', fontWeight: 600 }}>
                    {selectedLead.phone}
                  </a>
                </span>
              </div>

              <div className="dv-detail-item">
                <span className="dv-detail-label">Email Address</span>
                <span className="dv-detail-val">{selectedLead.email || '—'}</span>
              </div>

              <div className="dv-detail-item">
                <span className="dv-detail-label">Timestamp</span>
                <span className="dv-detail-val">{selectedLead.displayTime}</span>
              </div>

              <div className="dv-detail-item full-width">
                <span className="dv-detail-label">Selected Program</span>
                <span className="dv-detail-val" style={{ color: '#ef5323', fontWeight: 600 }}>{selectedLead.course}</span>
              </div>

              <div className="dv-detail-item">
                <span className="dv-detail-label">Form Intent</span>
                <span className="dv-detail-val">{selectedLead.formLabel}</span>
              </div>

              <div className="dv-detail-item">
                <span className="dv-detail-label">Page Category</span>
                <span className="dv-detail-val">{selectedLead.pageCategoryLabel}</span>
              </div>

              <div className="dv-detail-item full-width">
                <span className="dv-detail-label">Origin URL</span>
                <span className="dv-detail-val">
                  <a href={selectedLead.pagePath} target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7' }}>
                    {selectedLead.pageUrl}
                  </a>
                </span>
              </div>

              {selectedLead.qualification && (
                <div className="dv-detail-item">
                  <span className="dv-detail-label">Highest Qualification</span>
                  <span className="dv-detail-val">{selectedLead.qualification}</span>
                </div>
              )}

              {selectedLead.experience && (
                <div className="dv-detail-item">
                  <span className="dv-detail-label">Work Experience</span>
                  <span className="dv-detail-val">{selectedLead.experience}</span>
                </div>
              )}

              {selectedLead.state && (
                <div className="dv-detail-item">
                  <span className="dv-detail-label">Location / State</span>
                  <span className="dv-detail-val">{selectedLead.state}</span>
                </div>
              )}

              {selectedLead.brochurePath && (
                <div className="dv-detail-item">
                  <span className="dv-detail-label">Brochure File</span>
                  <span className="dv-detail-val">{selectedLead.brochurePath}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
