import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './TrackingDashboard.css';
import type { LeadSubmission } from '../../services/leadTrackingService';
import {
  getStoredSubmissions,
  getRemoteSubmissions,
  authenticateDashboard,
  DASHBOARD_TOKEN_STORAGE_KEY,
  clearStoredSubmissions,
  clearRemoteSubmissions,
  exportSubmissionsExcel,
} from '../../services/leadTrackingService';

const AUTH_STORAGE_KEY = 'dv_dashboard_pin_authenticated';
const PAGE_SIZE = 50;

interface TrackingDashboardProps {
  onNavigateHome?: () => void;
}

export const TrackingDashboard: React.FC<TrackingDashboardProps> = ({ onNavigateHome }) => {
  // Set browser title on mount
  useEffect(() => {
    document.title = 'Submission tracking | DV Analytics';
  }, []);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined'
      && window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true'
      && Boolean(window.sessionStorage.getItem(DASHBOARD_TOKEN_STORAGE_KEY));
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [dataError, setDataError] = useState<string>('');

  // Top Nav State: 'dashboard' | 'leads'
  const [activeNav, setActiveNav] = useState<'dashboard' | 'leads'>('dashboard');

  // Dashboard Data State
  const [submissions, setSubmissions] = useState<LeadSubmission[]>([]);
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'all' | 'custom'>('7d');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  // Hover state for trendline graph
  const [hoveredTrendIndex, setHoveredTrendIndex] = useState<number | null>(null);

  // Lead Data Tab Table State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormFilter, setSelectedFormFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);

  // Page-wise breakdown sub-tab state ('landing' vs 'main-site')
  const [pageSubTab, setPageSubTab] = useState<'landing' | 'seo' | 'main-site'>('landing');

  // Load the durable VPS records. Local storage remains a fallback for offline use.
  const reloadData = useCallback(async () => {
    try {
      const remoteSubmissions = await getRemoteSubmissions();
      setSubmissions(remoteSubmissions);
      setDataError('');
      return;
    } catch (error) {
      console.error('Could not load remote dashboard records; using local cache.', error);
      setSubmissions(getStoredSubmissions());
      setDataError('Live dashboard data could not be loaded. Showing the local cache.');
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    void reloadData();

    // Listen to real-time custom events when leads are submitted anywhere on the site
    const handleNewLead = () => void reloadData();
    const handleReset = () => void reloadData();

    window.addEventListener('dv_new_lead_recorded', handleNewLead);
    window.addEventListener('dv_leads_reset', handleReset);
    window.addEventListener('dv_leads_cleared', handleReset);

    return () => {
      window.removeEventListener('dv_new_lead_recorded', handleNewLead);
      window.removeEventListener('dv_leads_reset', handleReset);
      window.removeEventListener('dv_leads_cleared', handleReset);
    };
  }, [isAuthenticated, reloadData]);

  // Handle PIN Submission
  const completeAuthentication = useCallback(async (pin: string) => {
    try {
      const authenticated = await authenticateDashboard(pin);
      if (!authenticated) {
        setPinError('Incorrect PIN. Please try again.');
        return false;
      }
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setPinError('');
      setPinInput('');
      await reloadData();
      return true;
    } catch (error) {
      console.error('Dashboard authentication failed', error);
      setPinError('Dashboard server is unavailable. Please try again.');
      return false;
    }
  }, [reloadData]);

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    void completeAuthentication(pinInput.trim());
  };

  const handleKeypadPress = (val: string) => {
    if (pinInput.length < 4) {
      const next = pinInput + val;
      setPinInput(next);
      setPinError('');
      if (next.length === 4) {
        void completeAuthentication(next);
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

  const handleClearRecords = async () => {
    if (!window.confirm('Clear all website tracking records from the VPS database and local cache?')) return;
    try {
      await clearRemoteSubmissions();
      clearStoredSubmissions();
      setSubmissions([]);
      setDataError('');
    } catch (error) {
      console.error('Could not clear remote dashboard records', error);
      setDataError('Records were not cleared because the VPS database could not be reached.');
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

    return {
      total,
      brochures,
      counselling,
      heroLanding,
      fullEnroll,
    };
  }, [filteredByDate]);

  // Submission Over Time Trend Data
  const trendData = useMemo(() => {
    const buckets: Record<string, { label: string; dateStr: string; count: number }> = {};
    const now = new Date();

    if (dateRange === 'today') {
      // Group by 3-hour intervals for today
      for (let h = 0; h < 24; h += 3) {
        const hLabel = `${h % 12 || 12} ${h >= 12 ? 'PM' : 'AM'}`;
        buckets[`${h}`] = { label: hLabel, dateStr: `Today around ${hLabel}`, count: 0 };
      }
      filteredByDate.forEach((lead) => {
        const d = new Date(lead.timestamp);
        const bucketHour = Math.floor(d.getHours() / 3) * 3;
        if (buckets[`${bucketHour}`]) {
          buckets[`${bucketHour}`].count++;
        }
      });
    } else {
      // Group by Day (e.g. 7 days or date range)
      const daysCount = dateRange === '7d' ? 7 : dateRange === '30d' ? 14 : 7;
      for (let i = daysCount - 1; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().split('T')[0];
        const dayLabel = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
        buckets[key] = { label: dayLabel, dateStr: key, count: 0 };
      }

      filteredByDate.forEach((lead) => {
        const key = new Date(lead.timestamp).toISOString().split('T')[0];
        if (buckets[key]) {
          buckets[key].count++;
        } else if (dateRange === 'all' || dateRange === 'custom') {
          const d = new Date(lead.timestamp);
          const dayLabel = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
          buckets[key] = { label: dayLabel, dateStr: key, count: 1 };
        }
      });
    }

    const items = Object.values(buckets);
    const maxVal = Math.max(...items.map((i) => i.count), 1);
    return { items, maxVal };
  }, [filteredByDate, dateRange]);

  // SVG Trendline Coordinate Calculations
  const { trendPoints, linePath, areaPath } = useMemo(() => {
    const items = trendData.items;
    const n = items.length;
    const padLeft = 45;
    const padRight = 35;
    const padTop = 30;
    const padBottom = 40;
    const width = 800;
    const height = 230;
    const usableW = width - padLeft - padRight;
    const usableH = height - padTop - padBottom;
    const baselineY = padTop + usableH; // 190

    const points = items.map((item, i) => {
      const x = padLeft + (n > 1 ? (i / (n - 1)) * usableW : usableW / 2);
      const ratio = trendData.maxVal > 0 ? item.count / trendData.maxVal : 0;
      const y = baselineY - ratio * (usableH - 20);
      return {
        ...item,
        x,
        y,
        baselineY,
      };
    });

    if (points.length === 0) {
      return { trendPoints: [], linePath: '', areaPath: '' };
    }

    const first = points[0];
    const last = points[points.length - 1];

    let l = `M ${first.x} ${first.y}`;
    for (let i = 1; i < points.length; i++) {
      l += ` L ${points[i].x} ${points[i].y}`;
    }

    const a = `${l} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`;
    return { trendPoints: points, linePath: l, areaPath: a };
  }, [trendData]);

  // 1. Course-wise Breakdown - Permanently list all 5 core courses
  const courseBreakdown = useMemo(() => {
    // The 5 primary courses of DV Analytics
    const CORE_COURSES = [
      { id: 'APIDS', name: 'APIDS (Data Science with AI Deployment)' },
      { id: 'APIDA', name: 'APIDA (Data Science with Gen AI)' },
      { id: 'FDE', name: 'FDE (AI Forward Deployment Engineer)' },
      { id: 'DAS', name: 'DAS (Data Analytics Specialist)' },
      { id: 'APCF', name: 'APCF (AI Integrated Cybersecurity & Forensics)' },
    ];

    const counts: Record<string, number> = {
      'APIDS (Data Science with AI Deployment)': 0,
      'APIDA (Data Science with Gen AI)': 0,
      'FDE (AI Forward Deployment Engineer)': 0,
      'DAS (Data Analytics Specialist)': 0,
      'APCF (AI Integrated Cybersecurity & Forensics)': 0,
    };

    // Count submissions into core courses or extra courses
    filteredByDate.forEach((s) => {
      const c = (s.course || '').toUpperCase();
      if (c.includes('APIDS')) {
        counts['APIDS (Data Science with AI Deployment)']++;
      } else if (c.includes('APIDA')) {
        counts['APIDA (Data Science with Gen AI)']++;
      } else if (c.includes('FDE') || c.includes('DEPLOYMENT')) {
        counts['FDE (AI Forward Deployment Engineer)']++;
      } else if (c.includes('SPECIALIST') || c.includes('DAS')) {
        counts['DAS (Data Analytics Specialist)']++;
      } else if (c.includes('CYBER') || c.includes('APCF') || c.includes('APCS')) {
        counts['APCF (AI Integrated Cybersecurity & Forensics)']++;
      } else if (c.includes('FLEXI') || c.includes('FLP')) {
        const name = 'FLP (Flexi Learning Program)';
        counts[name] = (counts[name] || 0) + 1;
      } else {
        const name = s.course ? s.course.trim() : 'Other / General Inquiry';
        counts[name] = (counts[name] || 0) + 1;
      }
    });

    // Make sure all 5 core courses are present first
    const coreList = CORE_COURSES.map((cc) => {
      const count = counts[cc.name] || 0;
      return {
        name: cc.name,
        count,
        pct: kpis.total > 0 ? Math.round((count / kpis.total) * 100) : 0,
        isCore: true,
      };
    });

    // Any other courses recorded dynamically
    const extraList: { name: string; count: number; pct: number; isCore: boolean }[] = [];
    Object.entries(counts).forEach(([name, count]) => {
      if (!CORE_COURSES.some((cc) => cc.name === name) && count > 0) {
        extraList.push({
          name,
          count,
          pct: kpis.total > 0 ? Math.round((count / kpis.total) * 100) : 0,
          isCore: false,
        });
      }
    });

    return [...coreList, ...extraList];
  }, [filteredByDate, kpis.total]);

  // 2. Page-wise Breakdown with Sub-Tabs: 'landing' vs 'main-site'
  const pageBreakdown = useMemo(() => {
    const CORE_LANDING_PAGES = [
      { path: '/lp/apids', label: 'APIDS Story Landing Page' },
      { path: '/lp/apida', label: 'APIDA Story Landing Page' },
      { path: '/lp/fde', label: 'FDE Story Landing Page' },
    ];

    const CORE_MAIN_PAGES = [
      { path: '/', label: 'Home Page' },
      { path: '/courses/apids/', label: 'APIDS Course Page' },
      { path: '/courses/apida/', label: 'APIDA Course Page' },
      { path: '/courses/fde/', label: 'FDE Course Page' },
      { path: '/courses/specialist/', label: 'DAS Specialist Course Page' },
      { path: '/courses/apcs/', label: 'APCF Cybersecurity Course Page' },
      { path: '/courses/flp/', label: 'FLP Self-Paced Course Page' },
      { path: '/enroll', label: 'Official Course Enrollment' },
    ];

    // Collect counts for all paths from current filtered leads
    const counts: Record<string, { count: number; categoryLabel: string }> = {};
    filteredByDate.forEach((s) => {
      const p = s.pagePath || '/';
      if (!counts[p]) {
        counts[p] = { count: 0, categoryLabel: s.pageCategoryLabel || '' };
      }
      counts[p].count++;
    });

    const CORE_SEO_PAGES = [
      { path: '/data-analytics-course-bangalore/', label: 'Data Analytics Bangalore (SEO)' },
      { path: '/data-analytics-course-bhubaneswar/', label: 'Data Analytics Bhubaneswar (SEO)' },
      { path: '/data-science-course-bangalore/', label: 'Data Science Bangalore (SEO)' },
      { path: '/data-science-course-bhubaneswar/', label: 'Data Science Bhubaneswar (SEO)' },
    ];

    const isLanding = (path: string) => path.startsWith('/lp/');
    const isSeo = (path: string) => {
      const clean = (path || '').toLowerCase().replace(/^\/+|\/+$/g, '');
      return (
        clean === 'data-analytics-course-bangalore' ||
        clean === 'data-analytics-course-bhubaneswar' ||
        clean === 'data-science-course-bangalore' ||
        clean === 'data-science-course-bhubaneswar' ||
        (clean.startsWith('data-') && clean.includes('-course-'))
      );
    };

    if (pageSubTab === 'landing') {
      // 1. Landing pages list
      const corePaths = new Set(CORE_LANDING_PAGES.map((c) => c.path));
      const list = CORE_LANDING_PAGES.map((c) => {
        const count = counts[c.path]?.count || 0;
        return {
          path: c.path,
          label: c.label,
          count,
          pct: kpis.total > 0 ? Math.round((count / kpis.total) * 100) : 0,
        };
      });

      // Include any other dynamic landing pages recorded
      Object.entries(counts).forEach(([path, data]) => {
        if (isLanding(path) && !corePaths.has(path)) {
          list.push({
            path,
            label: data.categoryLabel || 'Landing Page',
            count: data.count,
            pct: kpis.total > 0 ? Math.round((data.count / kpis.total) * 100) : 0,
          });
        }
      });

      return list;
    } else if (pageSubTab === 'seo') {
      // 2. SEO landing pages list
      const corePaths = new Set(CORE_SEO_PAGES.map((c) => c.path));
      const list = CORE_SEO_PAGES.map((c) => {
        const count = counts[c.path]?.count || 0;
        return {
          path: c.path,
          label: c.label,
          count,
          pct: kpis.total > 0 ? Math.round((count / kpis.total) * 100) : 0,
        };
      });

      // Include any other dynamic SEO pages recorded
      Object.entries(counts).forEach(([path, data]) => {
        if (isSeo(path) && !corePaths.has(path)) {
          list.push({
            path,
            label: data.categoryLabel || 'SEO Page',
            count: data.count,
            pct: kpis.total > 0 ? Math.round((data.count / kpis.total) * 100) : 0,
          });
        }
      });

      return list;
    } else {
      // 3. Main site pages list (excluding landing and SEO pages)
      const corePaths = new Set(CORE_MAIN_PAGES.map((c) => c.path));
      const list = CORE_MAIN_PAGES.map((c) => {
        const count = counts[c.path]?.count || 0;
        return {
          path: c.path,
          label: c.label,
          count,
          pct: kpis.total > 0 ? Math.round((count / kpis.total) * 100) : 0,
        };
      });

      // Include any other dynamic main site pages recorded
      Object.entries(counts).forEach(([path, data]) => {
        if (!isLanding(path) && !isSeo(path) && !corePaths.has(path)) {
          list.push({
            path,
            label: data.categoryLabel || 'Main Site',
            count: data.count,
            pct: kpis.total > 0 ? Math.round((data.count / kpis.total) * 100) : 0,
          });
        }
      });

      return list;
    }
  }, [filteredByDate, kpis.total, pageSubTab]);

  // Filtered Leads for Lead Data Tab
  const filteredLeads = useMemo(() => {
    return filteredByDate.filter((item) => {
      if (selectedFormFilter !== 'all' && item.formType !== selectedFormFilter) {
        return false;
      }
      if (selectedCategoryFilter !== 'all' && item.pageCategory !== selectedCategoryFilter) {
        return false;
      }
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

  // Pagination for Lead Data Table (Strictly 50 rows per page)
  const totalLeads = filteredLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalLeads / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedLeads = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredLeads.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredLeads, safeCurrentPage]);

  // Handle timeline pill clicks
  const handleRangeSelect = (range: 'today' | '7d' | '30d' | 'all' | 'custom') => {
    setDateRange(range);
    setCurrentPage(1);
    if (range === 'custom' && !customStartDate && !customEndDate) {
      const today = new Date();
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(today.getDate() - 14);
      const pad = (n: number) => String(n).padStart(2, '0');
      setCustomStartDate(`${twoWeeksAgo.getFullYear()}-${pad(twoWeeksAgo.getMonth() + 1)}-${pad(twoWeeksAgo.getDate())}`);
      setCustomEndDate(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`);
    }
  };

  // RENDER PIN LOCK SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="dv-dash-root dv-pin-lock-wrap">
        <div className="dv-pin-card">
          <div className="dv-pin-logo-wrap">
            <img src="/logo.png" alt="DV Analytics Logo" className="dv-pin-logo-img" />
          </div>

          <div className="dv-pin-badge">Restricted Access • PIN Protected</div>
          <h1>Submission tracking</h1>
          <p>Please enter your 4-digit PIN to access live website submission tracking.</p>

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
        
        {/* TOP BRAND HEADER (REFRESH BUTTON ONLY) */}
        <header className="dv-dash-header">
          <div className="dv-dash-brand">
            <img src="/logo.png" alt="DV Analytics" className="dv-dash-logo-img" />
            <div className="dv-dash-title-group">
              <h1>
                Submission tracking
                <span className="dv-live-pill">
                  <span className="dv-live-dot"></span> Live Tracking
                </span>
              </h1>
              <p className="dv-dash-subtitle">
                Real-time lead submissions, course requests &amp; page breakdown
              </p>
            </div>
          </div>

          <div className="dv-dash-actions">
            <button
              type="button"
              className="dv-dash-btn dv-dash-btn-secondary"
              onClick={() => void reloadData()}
              title="Refresh latest data"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              Refresh
            </button>

            <button
              type="button"
              className="dv-dash-btn dv-dash-btn-secondary"
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

        {dataError && (
          <div role="alert" style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', color: '#9a3412', background: '#ffedd5' }}>
            {dataError}
          </div>
        )}

        {/* 2. TOP BAR NAVIGATION (Dashboard, Lead data) */}
        <nav className="dv-top-nav-bar" aria-label="Dashboard Navigation">
          <div className="dv-nav-tabs-group">
            <button
              type="button"
              className={`dv-nav-tab-btn ${activeNav === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveNav('dashboard')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </button>

            <button
              type="button"
              className={`dv-nav-tab-btn ${activeNav === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveNav('leads')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              Lead data ({filteredByDate.length})
            </button>
          </div>

          <div className="dv-nav-right-actions">
            <span style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Scope: <strong style={{ color: '#051f40' }}>{filteredByDate.length}</strong> leads
            </span>
          </div>
        </nav>

        {/* ====================================================================
            VIEW 1: DASHBOARD
            ==================================================================== */}
        {activeNav === 'dashboard' && (
          <>
            {/* TIMELINE FILTER BAR */}
            <div className="dv-dash-timeline-bar">
              <div className="dv-time-filters">
                {(['today', '7d', '30d', 'all', 'custom'] as const).map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={`dv-time-pill ${dateRange === range ? 'active' : ''}`}
                    onClick={() => handleRangeSelect(range)}
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
                      onChange={(e) => {
                        setCustomStartDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      aria-label="Filter start date"
                    />
                    <span className="dv-custom-date-sep">to</span>
                    <input
                      type="date"
                      className="dv-custom-date-input"
                      value={customEndDate}
                      onChange={(e) => {
                        setCustomEndDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      aria-label="Filter end date"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* TOP KPI SUMMARY CARD (TOTAL FORM SUBMISSIONS ONLY) */}
            <div className="dv-kpi-grid single-kpi">
              <div className="dv-kpi-card" style={{ '--kpi-accent': '#ef5323' } as React.CSSProperties}>
                <div className="dv-kpi-top">
                  <span className="dv-kpi-label">Total Form Submissions</span>
                  <div className="dv-kpi-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </div>
                <div className="dv-kpi-value">{kpis.total}</div>
                <div className="dv-kpi-meta">
                  <span>Across all website forms &amp; landing pages</span>
                  {dateRange === 'today' && <span className="dv-kpi-badge-scope">• Today</span>}
                  {dateRange === '7d' && <span className="dv-kpi-badge-scope">• Last 7 Days</span>}
                  {dateRange === '30d' && <span className="dv-kpi-badge-scope">• Last 30 Days</span>}
                  {dateRange === 'all' && <span className="dv-kpi-badge-scope">• All Time</span>}
                  {dateRange === 'custom' && (
                    <span className="dv-kpi-badge-scope">
                      • {customStartDate || 'Start'} to {customEndDate || 'Now'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 3. TRENDLINE GRAPH (SUBMISSION OVER TIME) */}
            <div className="dv-trend-card">
              <div className="dv-trend-header">
                <h2>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef5323" strokeWidth="2.3">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  Submission Over Time Trend
                </h2>
                <span className="dv-trend-stats-tag">
                  {kpis.total} Total in Timeline
                </span>
              </div>

              <div className="dv-trendline-svg-wrap">
                <svg viewBox="0 0 800 230" className="dv-trendline-svg">
                  <defs>
                    <linearGradient id="dvTrendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef5323" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ef5323" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="45" y1="50" x2="765" y2="50" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.2" />
                  <line x1="45" y1="120" x2="765" y2="120" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.2" />
                  <line x1="45" y1="190" x2="765" y2="190" stroke="#e2e8f0" strokeWidth="1.5" />

                  {/* Y-axis labels */}
                  <text x="36" y="54" textAnchor="end" fill="#94a3b8" fontSize="11" fontWeight="600">{trendData.maxVal}</text>
                  <text x="36" y="124" textAnchor="end" fill="#94a3b8" fontSize="11" fontWeight="600">{Math.round(trendData.maxVal / 2)}</text>
                  <text x="36" y="194" textAnchor="end" fill="#94a3b8" fontSize="11" fontWeight="600">0</text>

                  {/* Shaded Area under Trendline */}
                  {areaPath && <path d={areaPath} fill="url(#dvTrendGradient)" />}

                  {/* Trendline Path */}
                  {linePath && (
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#ef5323"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Vertical dashed guideline if a point is hovered */}
                  {hoveredTrendIndex !== null && trendPoints[hoveredTrendIndex] && (
                    <line
                      x1={trendPoints[hoveredTrendIndex].x}
                      y1="35"
                      x2={trendPoints[hoveredTrendIndex].x}
                      y2="190"
                      stroke="#94a3b8"
                      strokeDasharray="3 3"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Interactive circle nodes and hit areas */}
                  {trendPoints.map((p, idx) => {
                    const isHovered = hoveredTrendIndex === idx;
                    return (
                      <g key={p.dateStr}>
                        {/* Larger hit-box for easy touch/cursor selection */}
                        <rect
                          x={p.x - 20}
                          y={20}
                          width={40}
                          height={175}
                          fill="transparent"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredTrendIndex(idx)}
                          onMouseLeave={() => setHoveredTrendIndex(null)}
                        />
                        {/* Node circle */}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isHovered ? 6.5 : 4}
                          fill={isHovered ? '#ef5323' : '#ffffff'}
                          stroke="#ef5323"
                          strokeWidth={isHovered ? 3 : 2.2}
                          style={{ pointerEvents: 'none', transition: 'all 0.15s ease' }}
                        />
                        {/* X-axis date labels */}
                        <text
                          x={p.x}
                          y="212"
                          textAnchor="middle"
                          fill={isHovered ? '#051f40' : '#64748b'}
                          fontSize="11"
                          fontWeight={isHovered ? '700' : '600'}
                          style={{ pointerEvents: 'none' }}
                        >
                          {p.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Tooltip Card */}
                  {hoveredTrendIndex !== null && trendPoints[hoveredTrendIndex] && (
                    <g
                      transform={`translate(${Math.min(Math.max(trendPoints[hoveredTrendIndex].x - 65, 45), 670)}, ${Math.max(
                        trendPoints[hoveredTrendIndex].y - 52,
                        10
                      )})`}
                      style={{ pointerEvents: 'none' }}
                    >
                      <rect width="130" height="42" rx="8" fill="#051f40" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.25))" />
                      <text x="65" y="17" textAnchor="middle" fill="#94a3b8" fontSize="10.5" fontWeight="600">
                        {trendPoints[hoveredTrendIndex].dateStr}
                      </text>
                      <text x="65" y="34" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">
                        {trendPoints[hoveredTrendIndex].count} Submissions
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>

            {/* 4. BREAKDOWNS (Course-wise, Page-wise, Button-wise) */}
            <div className="dv-breakdown-stack">
              
              {/* BREAKDOWN 1: COURSE-WISE BREAKDOWN */}
              <div className="dv-panel">
                <div className="dv-panel-header">
                  <h2>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.3">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    Course-Wise Breakdown
                  </h2>
                  <span className="dv-panel-tag">{courseBreakdown.length} Programs Tracked</span>
                </div>

                <div className="dv-metric-list">
                  {courseBreakdown.map((item) => (
                    <div key={item.name} className="dv-metric-item">
                      <div className="dv-metric-item-info">
                        <span className="dv-metric-title">
                          {item.name}
                          {item.isCore && (
                            <span style={{ marginLeft: '6px', fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                              • Core Course
                            </span>
                          )}
                        </span>
                        <span className="dv-metric-count">
                          {item.count} leads <span className="dv-metric-pct">({item.pct}%)</span>
                        </span>
                      </div>
                      <div className="dv-prog-bar-track">
                        <div
                          className="dv-prog-bar-fill"
                          style={{
                            width: `${item.pct}%`,
                            background: item.count > 0 ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)' : '#e2e8f0',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {courseBreakdown.length === 0 && (
                    <div style={{ color: '#64748b', textAlign: 'center', padding: '20px 0' }}>
                      No course submissions recorded in this timeline.
                    </div>
                  )}
                </div>
              </div>

              {/* BREAKDOWN 2: PAGE-WISE BREAKDOWN WITH TWO SUB TABS (LANDING PAGES / MAIN SITE) */}
              <div className="dv-panel">
                <div className="dv-panel-header" style={{ flexWrap: 'wrap', gap: '10px' }}>
                  <h2>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.3">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    Page-Wise Breakdown
                  </h2>
                  
                  {/* Two Sub-Tabs: Landing Pages & Main Site */}
                  <div className="dv-subtabs-group">
                    <button
                      type="button"
                      className={`dv-subtab-btn ${pageSubTab === 'landing' ? 'active' : ''}`}
                      onClick={() => setPageSubTab('landing')}
                    >
                      Landing pages
                    </button>
                    <button
                      type="button"
                      className={`dv-subtab-btn ${pageSubTab === 'seo' ? 'active' : ''}`}
                      onClick={() => setPageSubTab('seo')}
                    >
                      SEO pages
                    </button>
                    <button
                      type="button"
                      className={`dv-subtab-btn ${pageSubTab === 'main-site' ? 'active' : ''}`}
                      onClick={() => setPageSubTab('main-site')}
                    >
                      Main site
                    </button>
                  </div>
                </div>

                <div className="dv-metric-list">
                  {pageBreakdown.map((item) => (
                    <div key={item.path} className="dv-metric-item">
                      <div className="dv-metric-item-info">
                        <span className="dv-metric-title">
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#051f40', textDecoration: 'none', fontWeight: 600 }}
                          >
                            {item.path}
                          </a>
                          <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500, marginLeft: '6px' }}>
                            ({item.label})
                          </span>
                        </span>
                        <span className="dv-metric-count">
                          {item.count} leads <span className="dv-metric-pct">({item.pct}%)</span>
                        </span>
                      </div>
                      <div className="dv-prog-bar-track">
                        <div
                          className="dv-prog-bar-fill"
                          style={{
                            width: `${item.pct}%`,
                            background: item.count > 0 ? 'linear-gradient(90deg, #0284c7 0%, #0369a1 100%)' : '#e2e8f0',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {pageBreakdown.length === 0 && (
                    <div style={{ color: '#64748b', textAlign: 'center', padding: '20px 0' }}>
                      No pages recorded under this section.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </>
        )}

        {/* ====================================================================
            VIEW 2: LEAD DATA (TIMELINE FILTER, EXCEL EXPORT, PAGINATED MAX 50 ROWS)
            ==================================================================== */}
        {activeNav === 'leads' && (
          <div className="dv-table-panel">
            {/* TIMELINE FILTER AT TOP OF LEAD DATA */}
            <div className="dv-dash-timeline-bar" style={{ marginBottom: '18px' }}>
              <div className="dv-time-filters">
                {(['today', '7d', '30d', 'all', 'custom'] as const).map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={`dv-time-pill ${dateRange === range ? 'active' : ''}`}
                    onClick={() => handleRangeSelect(range)}
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
                      onChange={(e) => {
                        setCustomStartDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      aria-label="Filter start date"
                    />
                    <span className="dv-custom-date-sep">to</span>
                    <input
                      type="date"
                      className="dv-custom-date-input"
                      value={customEndDate}
                      onChange={(e) => {
                        setCustomEndDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      aria-label="Filter end date"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                className="dv-dash-btn dv-dash-btn-excel"
                onClick={() => exportSubmissionsExcel(filteredLeads)}
                title="Export currently filtered list to Microsoft Excel (.xls)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="8" y1="13" x2="16" y2="13"></line>
                  <line x1="8" y1="17" x2="16" y2="17"></line>
                </svg>
                Export Filtered Leads to Excel ({filteredLeads.length})
              </button>

              <button
                type="button"
                className="dv-dash-btn dv-dash-btn-secondary"
                onClick={() => void handleClearRecords()}
                title="Clear all website tracking records from the VPS and local cache"
              >
                Clear All Records
              </button>
            </div>

            {/* SEARCH AND FILTERS */}
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="dv-table-filters">
                <select
                  className="dv-select-filter"
                  value={selectedFormFilter}
                  onChange={(e) => {
                    setSelectedFormFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Buttons / Forms</option>
                  <option value="hero-registration">Landing Page Hero Forms</option>
                  <option value="download-brochure">Brochure Downloads</option>
                  <option value="free-counselling">Free Counselling</option>
                  <option value="full-enrollment">Full Enrollments</option>
                </select>

                <select
                  className="dv-select-filter"
                  value={selectedCategoryFilter}
                  onChange={(e) => {
                    setSelectedCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Page Categories</option>
                  <option value="landing-page">Story Landing Pages (/lp/*)</option>
                  <option value="seo-landing">SEO Landing Pages</option>
                  <option value="course-detail">Course Detail Pages (/courses/*)</option>
                  <option value="main-site">Main Website Pages</option>
                  <option value="enrollment-page">Enrollment Pages</option>
                </select>
              </div>
            </div>

            {/* SUBMISSIONS TABLE */}
            <div className="dv-table-responsive">
              <table className="dv-table">
                <thead>
                  <tr>
                    <th>Time (IST)</th>
                    <th>Lead Name</th>
                    <th>Contact Info</th>
                    <th>Button / Action</th>
                    <th>Program</th>
                    <th>Origin Page</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => {
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
                  {paginatedLeads.length === 0 && (
                    <tr>
                      <td colSpan={8} className="dv-empty-table">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ margin: '0 auto', opacity: 0.5 }}>
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <p>No lead submissions match your selected timeline or search query.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION BAR (MAX 50 ROWS PER PAGE) */}
            {totalLeads > 0 && (
              <div className="dv-pagination-bar">
                <div className="dv-pagination-info">
                  Showing {(safeCurrentPage - 1) * PAGE_SIZE + 1}–{Math.min(safeCurrentPage * PAGE_SIZE, totalLeads)} of {totalLeads} leads (50 per page)
                </div>

                <div className="dv-pagination-nav">
                  <button
                    type="button"
                    className="dv-page-btn"
                    disabled={safeCurrentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 2)
                    .map((p, idx, arr) => {
                      const prev = arr[idx - 1];
                      const showEllipsis = prev && p - prev > 1;
                      return (
                        <React.Fragment key={p}>
                          {showEllipsis && <span style={{ padding: '0 4px', color: '#94a3b8' }}>...</span>}
                          <button
                            type="button"
                            className={`dv-page-btn ${safeCurrentPage === p ? 'active' : ''}`}
                            onClick={() => setCurrentPage(p)}
                          >
                            {p}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  <button
                    type="button"
                    className="dv-page-btn"
                    disabled={safeCurrentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
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
                <span className="dv-detail-label">Button / Action</span>
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
