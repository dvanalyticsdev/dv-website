import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './TrackingDashboard.css';
import type { LeadSubmission, KeywordExportItem, SourceExportItem } from '../../services/leadTrackingService';
import {
  getStoredSubmissions,
  getRemoteSubmissions,
  authenticateDashboard,
  DASHBOARD_TOKEN_STORAGE_KEY,
  clearStoredSubmissions,
  clearRemoteSubmissions,
  exportSubmissionsExcel,
  exportKeywordsExcel,
  exportSourcesExcel,
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

  // Top Nav State: 'dashboard' | 'leads' | 'keywords' | 'sources'
  const [activeNav, setActiveNav] = useState<'dashboard' | 'leads' | 'keywords' | 'sources'>('dashboard');

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

  // Keyword Data Tab State
  const [keywordSearchQuery, setKeywordSearchQuery] = useState<string>('');
  const [keywordSourceFilter, setKeywordSourceFilter] = useState<string>('all');
  const [expandedKeywords, setExpandedKeywords] = useState<Set<string>>(new Set());

  // Source Data Tab State
  const [sourceSearchQuery, setSourceSearchQuery] = useState<string>('');
  const [sourceCategoryFilter, setSourceCategoryFilter] = useState<string>('all');
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());

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

  // Helper to safely parse UTM parameters from lead URL
  const parseLeadUtm = useCallback((lead: LeadSubmission) => {
    let rawTerm = '';
    let source = '';
    let medium = '';
    let campaign = '';
    let content = '';
    let hasGclid = false;
    let hasUtmTerm = false;

    const rawUrl = lead.pageUrl || lead.pagePath || '';
    if (rawUrl.includes('?') || rawUrl.includes('&')) {
      try {
        const queryPart = rawUrl.includes('?') ? rawUrl.slice(rawUrl.indexOf('?') + 1) : rawUrl;
        const params = new URLSearchParams(queryPart);

        const termParam = params.get('utm_term');
        if (termParam && termParam.trim()) {
          rawTerm = termParam.trim();
          hasUtmTerm = true;
        }

        source = (params.get('utm_source') || '').trim();
        medium = (params.get('utm_medium') || '').trim();
        campaign = (params.get('utm_campaign') || params.get('gad_campaignid') || '').trim();
        content = (params.get('utm_content') || '').trim();
        hasGclid = Boolean(params.get('gclid') || params.get('gad_source'));
      } catch {
        // Fallback for non-standard query structures
      }
    }

    let keyword = '';
    if (hasUtmTerm && rawTerm) {
      try {
        keyword = decodeURIComponent(rawTerm.replace(/\+/g, ' ')).trim();
      } catch {
        keyword = rawTerm.trim();
      }
    }

    const isPaidOrUtm = hasUtmTerm || Boolean(source) || Boolean(campaign) || hasGclid;

    if (!keyword) {
      if (source || campaign || hasGclid) {
        keyword = source ? `${source} (Search term not set)` : 'Google Paid Ad (No utm_term)';
      } else {
        keyword = 'Direct / Organic (No UTM)';
        source = 'direct / organic';
      }
    }

    if (!source) {
      source = hasGclid ? 'google (ads)' : 'direct / organic';
    }

    return {
      keyword,
      rawTerm,
      source,
      medium: medium || '—',
      campaign: campaign || '—',
      content: content || '—',
      hasUtmTerm,
      hasGclid,
      isPaidOrUtm,
    };
  }, []);

  // Aggregate keyword rankings from Top to Low
  const keywordAggregates = useMemo(() => {
    interface KeywordRowItem {
      keyword: string;
      count: number;
      sources: string[];
      campaigns: string[];
      mediums: string[];
      courses: Record<string, number>;
      leads: LeadSubmission[];
      latestTimestamp: string;
      hasUtmTerm: boolean;
      isPaidOrUtm: boolean;
    }

    const map = new Map<string, KeywordRowItem>();

    filteredByDate.forEach((lead) => {
      const utm = parseLeadUtm(lead);
      const key = utm.keyword;

      if (!map.has(key)) {
        map.set(key, {
          keyword: key,
          count: 0,
          sources: [],
          campaigns: [],
          mediums: [],
          courses: {},
          leads: [],
          latestTimestamp: lead.timestamp,
          hasUtmTerm: utm.hasUtmTerm,
          isPaidOrUtm: utm.isPaidOrUtm,
        });
      }

      const row = map.get(key)!;
      row.count += 1;
      row.leads.push(lead);

      if (utm.source && !row.sources.includes(utm.source)) {
        row.sources.push(utm.source);
      }
      if (utm.campaign && utm.campaign !== '—' && !row.campaigns.includes(utm.campaign)) {
        row.campaigns.push(utm.campaign);
      }
      if (utm.medium && utm.medium !== '—' && !row.mediums.includes(utm.medium)) {
        row.mediums.push(utm.medium);
      }

      const c = lead.course || 'Other / General Inquiry';
      row.courses[c] = (row.courses[c] || 0) + 1;

      if (new Date(lead.timestamp).getTime() > new Date(row.latestTimestamp).getTime()) {
        row.latestTimestamp = lead.timestamp;
      }
    });

    // Sort Top to Low by Lead count, then latest timestamp
    return Array.from(map.values()).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return new Date(b.latestTimestamp).getTime() - new Date(a.latestTimestamp).getTime();
    });
  }, [filteredByDate, parseLeadUtm]);

  // Filter keywords by search query & source filter
  const filteredKeywords = useMemo(() => {
    let list = keywordAggregates;

    if (keywordSearchQuery.trim()) {
      const q = keywordSearchQuery.trim().toLowerCase();
      list = list.filter((row) =>
        row.keyword.toLowerCase().includes(q) ||
        row.sources.some((s) => s.toLowerCase().includes(q)) ||
        row.campaigns.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (keywordSourceFilter !== 'all') {
      list = list.filter((row) =>
        row.sources.some((s) => s.toLowerCase() === keywordSourceFilter.toLowerCase())
      );
    }

    return list;
  }, [keywordAggregates, keywordSearchQuery, keywordSourceFilter]);

  const availableKeywordSources = useMemo(() => {
    const set = new Set<string>();
    keywordAggregates.forEach((k) => {
      k.sources.forEach((s) => set.add(s));
    });
    return Array.from(set).sort();
  }, [keywordAggregates]);

  const trackedKeywordsCount = useMemo(() => {
    return keywordAggregates.filter((k) => k.hasUtmTerm).length;
  }, [keywordAggregates]);

  const totalPaidLeadsCount = useMemo(() => {
    return filteredByDate.filter((lead) => parseLeadUtm(lead).isPaidOrUtm).length;
  }, [filteredByDate, parseLeadUtm]);

  const toggleKeywordExpand = (keyword: string) => {
    setExpandedKeywords((prev) => {
      const next = new Set(prev);
      if (next.has(keyword)) {
        next.delete(keyword);
      } else {
        next.add(keyword);
      }
      return next;
    });
  };

  const handleExportKeywords = () => {
    const total = filteredByDate.length || 1;
    const exportItems: KeywordExportItem[] = filteredKeywords.map((item, idx) => {
      const topCourseEntry = Object.entries(item.courses).sort((a, b) => b[1] - a[1])[0];
      const topCourse = topCourseEntry ? `${topCourseEntry[0]} (${topCourseEntry[1]})` : '—';
      const pct = `${((item.count / total) * 100).toFixed(1)}%`;

      return {
        rank: idx + 1,
        keyword: item.keyword,
        leadCount: item.count,
        percentage: pct,
        source: item.sources.join(', ') || 'direct / organic',
        medium: item.mediums.join(', ') || '—',
        campaign: item.campaigns.join(', ') || '—',
        topCourse,
        latestLeadDate: new Date(item.latestTimestamp).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      };
    });

    exportKeywordsExcel(exportItems);
  };

  // Helper to safely parse traffic acquisition source
  const parseLeadSource = useCallback((lead: LeadSubmission) => {
    let rawSource = '';
    let medium = '';
    let campaign = '';
    let hasGclid = false;

    const rawUrl = lead.pageUrl || lead.pagePath || '';
    if (rawUrl.includes('?') || rawUrl.includes('&')) {
      try {
        const queryPart = rawUrl.includes('?') ? rawUrl.slice(rawUrl.indexOf('?') + 1) : rawUrl;
        const params = new URLSearchParams(queryPart);
        rawSource = (params.get('utm_source') || '').trim();
        medium = (params.get('utm_medium') || '').trim();
        campaign = (params.get('utm_campaign') || params.get('gad_campaignid') || '').trim();
        hasGclid = Boolean(params.get('gclid') || params.get('gad_source'));
      } catch {
        // Fallback
      }
    }

    const sLower = rawSource.toLowerCase();
    const mLower = medium.toLowerCase();
    const urlLower = rawUrl.toLowerCase();

    // 1. WhatsApp Attribution
    if (
      sLower.includes('whatsapp') ||
      sLower === 'wa' ||
      sLower === 'wa_me' ||
      mLower.includes('whatsapp') ||
      urlLower.includes('whatsapp') ||
      urlLower.includes('wa.me')
    ) {
      return {
        canonicalSource: 'WhatsApp',
        sourceCategory: 'chat' as const,
        sourceCategoryLabel: 'Direct Messaging / Chat',
        sourceBadgeClass: 'dv-badge-whatsapp',
        medium: medium || 'chat',
        campaign: campaign || '—',
        isPaid: false,
      };
    }

    // 2. Google Search & Ads Attribution
    if (
      sLower.includes('google') ||
      sLower === 'adwords' ||
      hasGclid ||
      Boolean(campaign && (campaign.startsWith('230') || campaign.includes('search') || campaign.includes('brand')))
    ) {
      const isPaid = hasGclid || mLower.includes('cpc') || mLower.includes('ad') || mLower.includes('paid') || Boolean(campaign);
      return {
        canonicalSource: isPaid ? 'Google (Ads)' : 'Google (Organic)',
        sourceCategory: 'search' as const,
        sourceCategoryLabel: isPaid ? 'Paid Search Ads' : 'Organic Search',
        sourceBadgeClass: 'dv-badge-google',
        medium: medium || (isPaid ? 'cpc' : 'organic'),
        campaign: campaign || (hasGclid ? 'Google Ads Campaign' : '—'),
        isPaid,
      };
    }

    // 3. Meta / Facebook Attribution
    if (
      sLower.includes('facebook') ||
      sLower === 'fb' ||
      sLower.includes('meta') ||
      urlLower.includes('fbclid')
    ) {
      const isPaid = mLower.includes('cpc') || mLower.includes('ad') || mLower.includes('paid');
      return {
        canonicalSource: 'Meta / Facebook',
        sourceCategory: 'social' as const,
        sourceCategoryLabel: isPaid ? 'Paid Social Ads' : 'Social Media',
        sourceBadgeClass: 'dv-badge-facebook',
        medium: medium || (isPaid ? 'cpc' : 'social'),
        campaign: campaign || '—',
        isPaid,
      };
    }

    // 4. Instagram Attribution
    if (sLower.includes('instagram') || sLower === 'ig' || sLower === 'insta') {
      const isPaid = mLower.includes('cpc') || mLower.includes('ad') || mLower.includes('paid');
      return {
        canonicalSource: 'Instagram',
        sourceCategory: 'social' as const,
        sourceCategoryLabel: isPaid ? 'Paid Social Ads' : 'Social Media',
        sourceBadgeClass: 'dv-badge-instagram',
        medium: medium || (isPaid ? 'cpc' : 'social'),
        campaign: campaign || '—',
        isPaid,
      };
    }

    // 5. LinkedIn Attribution
    if (sLower.includes('linkedin') || sLower === 'li') {
      const isPaid = mLower.includes('cpc') || mLower.includes('ad') || mLower.includes('paid');
      return {
        canonicalSource: 'LinkedIn',
        sourceCategory: 'social' as const,
        sourceCategoryLabel: isPaid ? 'Professional Social' : 'Social Media',
        sourceBadgeClass: 'dv-badge-linkedin',
        medium: medium || (isPaid ? 'cpc' : 'social'),
        campaign: campaign || '—',
        isPaid,
      };
    }

    // 6. YouTube Attribution
    if (sLower.includes('youtube') || sLower === 'yt') {
      return {
        canonicalSource: 'YouTube',
        sourceCategory: 'social' as const,
        sourceCategoryLabel: 'Video / Social',
        sourceBadgeClass: 'dv-badge-youtube',
        medium: medium || 'video',
        campaign: campaign || '—',
        isPaid: false,
      };
    }

    // 7. Custom Campaign / Other Source
    if (rawSource) {
      const formatted = rawSource.charAt(0).toUpperCase() + rawSource.slice(1);
      return {
        canonicalSource: formatted,
        sourceCategory: 'other' as const,
        sourceCategoryLabel: 'Custom Campaign / Source',
        sourceBadgeClass: 'dv-badge-source',
        medium: medium || 'referral',
        campaign: campaign || '—',
        isPaid: mLower.includes('cpc') || mLower.includes('ad') || mLower.includes('paid'),
      };
    }

    // 8. Direct / Organic Fallback
    return {
      canonicalSource: 'Direct / Organic',
      sourceCategory: 'direct' as const,
      sourceCategoryLabel: 'Direct Website Visit',
      sourceBadgeClass: 'dv-badge-direct',
      medium: 'direct',
      campaign: '—',
      isPaid: false,
    };
  }, []);

  // Aggregate source performance ranked Top to Low
  interface SourceRowItem {
    source: string;
    sourceCategory: 'search' | 'chat' | 'social' | 'direct' | 'other';
    sourceCategoryLabel: string;
    sourceBadgeClass: string;
    count: number;
    mediums: string[];
    campaigns: string[];
    courses: Record<string, number>;
    pages: Record<string, number>;
    formTypes: Record<string, number>;
    leads: LeadSubmission[];
    latestTimestamp: string;
    isPaid: boolean;
  }

  const sourceAggregates = useMemo(() => {
    const map = new Map<string, SourceRowItem>();

    filteredByDate.forEach((lead) => {
      const parsed = parseLeadSource(lead);
      const key = parsed.canonicalSource;

      if (!map.has(key)) {
        map.set(key, {
          source: key,
          sourceCategory: parsed.sourceCategory,
          sourceCategoryLabel: parsed.sourceCategoryLabel,
          sourceBadgeClass: parsed.sourceBadgeClass,
          count: 0,
          mediums: [],
          campaigns: [],
          courses: {},
          pages: {},
          formTypes: {},
          leads: [],
          latestTimestamp: lead.timestamp,
          isPaid: parsed.isPaid,
        });
      }

      const item = map.get(key)!;
      item.count += 1;
      item.leads.push(lead);

      if (parsed.medium && parsed.medium !== '—' && !item.mediums.includes(parsed.medium)) {
        item.mediums.push(parsed.medium);
      }
      if (parsed.campaign && parsed.campaign !== '—' && !item.campaigns.includes(parsed.campaign)) {
        item.campaigns.push(parsed.campaign);
      }

      const c = lead.course || 'Other';
      item.courses[c] = (item.courses[c] || 0) + 1;

      const p = lead.pagePath || '/';
      item.pages[p] = (item.pages[p] || 0) + 1;

      const f = lead.formLabel || 'Form Submission';
      item.formTypes[f] = (item.formTypes[f] || 0) + 1;

      if (new Date(lead.timestamp).getTime() > new Date(item.latestTimestamp).getTime()) {
        item.latestTimestamp = lead.timestamp;
      }
    });

    return Array.from(map.values()).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return new Date(b.latestTimestamp).getTime() - new Date(a.latestTimestamp).getTime();
    });
  }, [filteredByDate, parseLeadSource]);

  // Filter sources by search query & category filter
  const filteredSources = useMemo(() => {
    let list = sourceAggregates;

    if (sourceSearchQuery.trim()) {
      const q = sourceSearchQuery.trim().toLowerCase();
      list = list.filter((row) =>
        row.source.toLowerCase().includes(q) ||
        row.sourceCategoryLabel.toLowerCase().includes(q) ||
        row.mediums.some((m) => m.toLowerCase().includes(q)) ||
        row.campaigns.some((c) => c.toLowerCase().includes(q)) ||
        Object.keys(row.courses).some((c) => c.toLowerCase().includes(q))
      );
    }

    if (sourceCategoryFilter !== 'all') {
      list = list.filter((row) => row.sourceCategory === sourceCategoryFilter);
    }

    return list;
  }, [sourceAggregates, sourceSearchQuery, sourceCategoryFilter]);

  const whatsappLeadsCount = useMemo(() => {
    return filteredByDate.filter((lead) => parseLeadSource(lead).sourceCategory === 'chat').length;
  }, [filteredByDate, parseLeadSource]);

  const toggleSourceExpand = (source: string) => {
    setExpandedSources((prev) => {
      const next = new Set(prev);
      if (next.has(source)) {
        next.delete(source);
      } else {
        next.add(source);
      }
      return next;
    });
  };

  const handleExportSources = () => {
    const total = filteredByDate.length || 1;
    const exportItems: SourceExportItem[] = filteredSources.map((item, idx) => {
      const topCourseEntry = Object.entries(item.courses).sort((a, b) => b[1] - a[1])[0];
      const topCourse = topCourseEntry ? `${topCourseEntry[0]} (${topCourseEntry[1]})` : '—';
      const topPageEntry = Object.entries(item.pages).sort((a, b) => b[1] - a[1])[0];
      const topPage = topPageEntry ? `${topPageEntry[0]} (${topPageEntry[1]})` : '—';
      const pct = `${((item.count / total) * 100).toFixed(1)}%`;

      return {
        rank: idx + 1,
        source: item.source,
        sourceCategory: item.sourceCategoryLabel,
        leadCount: item.count,
        percentage: pct,
        mediums: item.mediums.join(', ') || '—',
        campaigns: item.campaigns.join(', ') || '—',
        topCourse,
        topPage,
        latestLeadDate: new Date(item.latestTimestamp).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      };
    });

    exportSourcesExcel(exportItems);
  };

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

            <button
              type="button"
              className={`dv-nav-tab-btn ${activeNav === 'keywords' ? 'active' : ''}`}
              onClick={() => setActiveNav('keywords')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Keyword data ({trackedKeywordsCount > 0 ? trackedKeywordsCount : keywordAggregates.length})
            </button>

            <button
              type="button"
              className={`dv-nav-tab-btn ${activeNav === 'sources' ? 'active' : ''}`}
              onClick={() => setActiveNav('sources')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Source data ({sourceAggregates.length})
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

        {/* ====================================================================
            VIEW 3: KEYWORD DATA (RANKED TOP TO LOW BY LEADS GENERATED)
            ==================================================================== */}
        {activeNav === 'keywords' && (
          <div className="dv-table-panel">
            {/* TIMELINE FILTER AT TOP OF KEYWORD DATA */}
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

              <button
                type="button"
                className="dv-dash-btn dv-dash-btn-excel"
                onClick={handleExportKeywords}
                title="Export keyword rankings to Microsoft Excel (.xls)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="8" y1="13" x2="16" y2="13"></line>
                  <line x1="8" y1="17" x2="16" y2="17"></line>
                </svg>
                Export Keyword Report ({filteredKeywords.length})
              </button>
            </div>

            {/* KEYWORD KPI SUMMARY CARDS */}
            <div className="dv-kw-kpi-grid">
              <div className="dv-kw-kpi-card">
                <span className="dv-kw-kpi-title">Total Leads in Period</span>
                <span className="dv-kw-kpi-val">{filteredByDate.length}</span>
                <span className="dv-kw-kpi-sub">Across all traffic sources</span>
              </div>
              <div className="dv-kw-kpi-card">
                <span className="dv-kw-kpi-title">Tracked Search Keywords</span>
                <span className="dv-kw-kpi-val" style={{ color: '#0284c7' }}>{trackedKeywordsCount}</span>
                <span className="dv-kw-kpi-sub">From utm_term queries</span>
              </div>
              <div className="dv-kw-kpi-card">
                <span className="dv-kw-kpi-title">Paid Ad / UTM Leads</span>
                <span className="dv-kw-kpi-val" style={{ color: '#10b981' }}>{totalPaidLeadsCount}</span>
                <span className="dv-kw-kpi-sub">
                  {filteredByDate.length > 0 ? `${((totalPaidLeadsCount / filteredByDate.length) * 100).toFixed(0)}% of total leads` : '0%'}
                </span>
              </div>
              <div className="dv-kw-kpi-card">
                <span className="dv-kw-kpi-title">Top Performing Keyword</span>
                <span className="dv-kw-kpi-val dv-kw-kpi-top" style={{ color: '#ef5323' }} title={keywordAggregates[0]?.keyword || 'N/A'}>
                  {keywordAggregates[0]?.keyword ? (keywordAggregates[0].keyword.length > 24 ? keywordAggregates[0].keyword.slice(0, 24) + '...' : keywordAggregates[0].keyword) : 'N/A'}
                </span>
                <span className="dv-kw-kpi-sub">
                  {keywordAggregates[0] ? `${keywordAggregates[0].count} leads generated` : 'No leads yet'}
                </span>
              </div>
            </div>

            {/* KEYWORD SEARCH & SOURCE FILTER TOOLBAR */}
            <div className="dv-table-toolbar">
              <div className="dv-search-wrap">
                <svg className="dv-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search keywords, campaigns or sources..."
                  value={keywordSearchQuery}
                  onChange={(e) => setKeywordSearchQuery(e.target.value)}
                  className="dv-search-input"
                />
                {keywordSearchQuery && (
                  <button
                    type="button"
                    className="dv-search-clear"
                    onClick={() => setKeywordSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="dv-table-filters">
                <select
                  value={keywordSourceFilter}
                  onChange={(e) => setKeywordSourceFilter(e.target.value)}
                  className="dv-select-filter"
                >
                  <option value="all">All Traffic Sources ({availableKeywordSources.length})</option>
                  {availableKeywordSources.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>

                {(keywordSearchQuery || keywordSourceFilter !== 'all') && (
                  <button
                    type="button"
                    className="dv-dash-btn dv-dash-btn-secondary"
                    onClick={() => {
                      setKeywordSearchQuery('');
                      setKeywordSourceFilter('all');
                    }}
                    style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* KEYWORDS RANKED TABLE (TOP TO LOW) */}
            <div className="dv-table-responsive">
              <table className="dv-table">
                <thead>
                  <tr>
                    <th style={{ width: '65px', textAlign: 'center' }}>Rank</th>
                    <th style={{ minWidth: '220px' }}>Keyword / Search Query</th>
                    <th style={{ minWidth: '150px' }}>Leads & Share</th>
                    <th style={{ minWidth: '130px' }}>Traffic Source</th>
                    <th style={{ minWidth: '150px' }}>Campaign ID / Medium</th>
                    <th style={{ minWidth: '200px' }}>Top Courses Inquired</th>
                    <th style={{ minWidth: '120px' }}>Latest Lead</th>
                    <th style={{ width: '130px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeywords.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
                        <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🔍</div>
                        <strong style={{ fontSize: '1rem', color: '#051f40', display: 'block', marginBottom: '4px' }}>
                          No matching keywords found
                        </strong>
                        <span>Try adjusting your timeline, search query or traffic source filter.</span>
                      </td>
                    </tr>
                  ) : (
                    filteredKeywords.map((row, idx) => {
                      const isExpanded = expandedKeywords.has(row.keyword);
                      const totalLeads = filteredByDate.length || 1;
                      const sharePct = ((row.count / totalLeads) * 100).toFixed(1);
                      const rank = idx + 1;

                      const topCoursesArr = Object.entries(row.courses)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 2);

                      return (
                        <React.Fragment key={row.keyword}>
                          <tr className={isExpanded ? 'dv-kw-row-expanded' : ''}>
                            {/* RANK */}
                            <td style={{ textAlign: 'center' }}>
                              <span
                                className={`dv-kw-rank-badge ${
                                  rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other'
                                }`}
                              >
                                #{rank}
                              </span>
                            </td>

                            {/* KEYWORD */}
                            <td>
                              <div className="dv-kw-name-cell">
                                <span className="dv-kw-text">{row.keyword}</span>
                                {row.hasUtmTerm && (
                                  <span className="dv-kw-tag-badge" title="Captured directly from Google Ads utm_term">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <circle cx="11" cy="11" r="8"></circle>
                                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    utm_term
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* LEADS & SHARE */}
                            <td>
                              <div className="dv-kw-vol-cell">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                  <strong style={{ color: '#051f40', fontSize: '0.94rem' }}>{row.count} {row.count === 1 ? 'lead' : 'leads'}</strong>
                                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{sharePct}%</span>
                                </div>
                                <div className="dv-kw-bar-track">
                                  <div
                                    className="dv-kw-bar-fill"
                                    style={{
                                      width: `${Math.min(100, Math.max(6, Number(sharePct)))}%`,
                                      background: rank === 1 ? '#ef5323' : rank <= 3 ? '#0284c7' : '#64748b',
                                    }}
                                  />
                                </div>
                              </div>
                            </td>

                            {/* SOURCE */}
                            <td>
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {row.sources.map((s) => (
                                  <span
                                    key={s}
                                    className={`dv-badge ${
                                      s.toLowerCase().includes('google')
                                        ? 'dv-badge-google'
                                        : s.toLowerCase().includes('direct')
                                        ? 'dv-badge-direct'
                                        : 'dv-badge-source'
                                    }`}
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* CAMPAIGN / MEDIUM */}
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#051f40' }}>
                                  {row.campaigns.join(', ') || '—'}
                                </span>
                                {row.mediums.length > 0 && (
                                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                                    medium: {row.mediums.join(', ')}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* TOP COURSES */}
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                {topCoursesArr.map(([courseName, cCount]) => (
                                  <span key={courseName} style={{ fontSize: '0.8rem', color: '#334155' }}>
                                    <strong style={{ color: '#ef5323' }}>{cCount}x</strong> {courseName.length > 32 ? courseName.slice(0, 32) + '...' : courseName}
                                  </span>
                                ))}
                                {Object.keys(row.courses).length > 2 && (
                                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                                    +{Object.keys(row.courses).length - 2} more programs
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* LATEST LEAD */}
                            <td>
                              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                {new Date(row.latestTimestamp).toLocaleDateString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </td>

                            {/* ACTION: EXPAND LEADS */}
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                className={`dv-kw-expand-btn ${isExpanded ? 'active' : ''}`}
                                onClick={() => toggleKeywordExpand(row.keyword)}
                                title={isExpanded ? 'Collapse leads' : 'View all leads from this keyword'}
                              >
                                {isExpanded ? 'Hide' : 'View Leads'} ({row.count})
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  style={{
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease',
                                  }}
                                >
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </button>
                            </td>
                          </tr>

                          {/* EXPANDED DRAWER: LIST OF LEADS FROM THIS KEYWORD */}
                          {isExpanded && (
                            <tr className="dv-kw-drawer-row">
                              <td colSpan={8} style={{ padding: '0', background: '#f8fafc' }}>
                                <div className="dv-kw-drawer-box">
                                  <div className="dv-kw-drawer-header">
                                    <span style={{ fontWeight: 700, color: '#051f40', fontSize: '0.86rem' }}>
                                      Leads generated via &ldquo;{row.keyword}&rdquo; ({row.leads.length})
                                    </span>
                                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                      Click any lead row to view complete details
                                    </span>
                                  </div>

                                  <div className="dv-table-responsive" style={{ border: 'none', background: '#ffffff' }}>
                                    <table className="dv-table" style={{ fontSize: '0.84rem' }}>
                                      <thead>
                                        <tr style={{ background: '#f1f5f9' }}>
                                          <th style={{ padding: '8px 12px' }}>Name</th>
                                          <th style={{ padding: '8px 12px' }}>Phone</th>
                                          <th style={{ padding: '8px 12px' }}>Course Selected</th>
                                          <th style={{ padding: '8px 12px' }}>Form Filled</th>
                                          <th style={{ padding: '8px 12px' }}>Time (IST)</th>
                                          <th style={{ padding: '8px 12px', textAlign: 'center' }}>Details</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {row.leads.map((lead) => (
                                          <tr
                                            key={lead.id}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setSelectedLead(lead)}
                                            title="Click to view full lead details"
                                          >
                                            <td style={{ padding: '10px 12px', fontWeight: 600, color: '#051f40' }}>
                                              {lead.name}
                                            </td>
                                            <td style={{ padding: '10px 12px' }}>
                                              <a
                                                href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                                                style={{ color: '#ef5323', textDecoration: 'none', fontWeight: 600 }}
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                {lead.phone}
                                              </a>
                                            </td>
                                            <td style={{ padding: '10px 12px', color: '#334155' }}>
                                              {lead.course}
                                            </td>
                                            <td style={{ padding: '10px 12px' }}>
                                              <span className="dv-badge dv-badge-form">
                                                {lead.formLabel}
                                              </span>
                                            </td>
                                            <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '0.8rem' }}>
                                              {lead.displayTime}
                                            </td>
                                            <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                                              <button
                                                type="button"
                                                className="dv-dash-btn dv-dash-btn-secondary"
                                                style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelectedLead(lead);
                                                }}
                                              >
                                                View
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ====================================================================
            VIEW 4: SOURCE DATA (TRAFFIC SOURCE BREAKDOWN: WHATSAPP, GOOGLE, META, DIRECT, ETC.)
            ==================================================================== */}
        {activeNav === 'sources' && (
          <div className="dv-table-panel">
            {/* TIMELINE FILTER AT TOP OF SOURCE DATA */}
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

              <button
                type="button"
                className="dv-dash-btn dv-dash-btn-excel"
                onClick={handleExportSources}
                title="Export source performance report to Microsoft Excel (.xls)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="8" y1="13" x2="16" y2="13"></line>
                  <line x1="8" y1="17" x2="16" y2="17"></line>
                </svg>
                Export Source Report ({filteredSources.length})
              </button>
            </div>

            {/* SOURCE KPI SUMMARY CARDS */}
            <div className="dv-kw-kpi-grid">
              <div className="dv-kw-kpi-card">
                <span className="dv-kw-kpi-title">Total Submissions</span>
                <span className="dv-kw-kpi-val">{filteredByDate.length}</span>
                <span className="dv-kw-kpi-sub">Across all traffic sources</span>
              </div>
              <div className="dv-kw-kpi-card">
                <span className="dv-kw-kpi-title">Active Sources</span>
                <span className="dv-kw-kpi-val" style={{ color: '#0284c7' }}>{sourceAggregates.length}</span>
                <span className="dv-kw-kpi-sub">Channels driving inquiries</span>
              </div>
              <div className="dv-kw-kpi-card">
                <span className="dv-kw-kpi-title">WhatsApp / Chat Inquiries</span>
                <span className="dv-kw-kpi-val" style={{ color: '#16a34a' }}>{whatsappLeadsCount}</span>
                <span className="dv-kw-kpi-sub">
                  {filteredByDate.length > 0 ? `${((whatsappLeadsCount / filteredByDate.length) * 100).toFixed(0)}% of total submissions` : '0%'}
                </span>
              </div>
              <div className="dv-kw-kpi-card">
                <span className="dv-kw-kpi-title">Top Performing Source</span>
                <span className="dv-kw-kpi-val dv-kw-kpi-top" style={{ color: '#ef5323' }} title={sourceAggregates[0]?.source || 'N/A'}>
                  {sourceAggregates[0]?.source || 'N/A'}
                </span>
                <span className="dv-kw-kpi-sub">
                  {sourceAggregates[0] ? `${sourceAggregates[0].count} leads (${((sourceAggregates[0].count / (filteredByDate.length || 1)) * 100).toFixed(0)}% share)` : 'No leads yet'}
                </span>
              </div>
            </div>

            {/* SOURCE SEARCH & CHANNEL FILTER TOOLBAR */}
            <div className="dv-table-toolbar">
              <div className="dv-search-wrap">
                <svg className="dv-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search source (e.g. WhatsApp, Google, Direct)..."
                  value={sourceSearchQuery}
                  onChange={(e) => setSourceSearchQuery(e.target.value)}
                  className="dv-search-input"
                />
                {sourceSearchQuery && (
                  <button
                    type="button"
                    className="dv-search-clear"
                    onClick={() => setSourceSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="dv-table-filters">
                <select
                  value={sourceCategoryFilter}
                  onChange={(e) => setSourceCategoryFilter(e.target.value)}
                  className="dv-select-filter"
                >
                  <option value="all">All Source Channels ({sourceAggregates.length})</option>
                  <option value="chat">Direct Messaging (WhatsApp)</option>
                  <option value="search">Search Engines & Ads (Google)</option>
                  <option value="social">Social Media (Meta, Instagram, LinkedIn)</option>
                  <option value="direct">Direct Website Visits</option>
                  <option value="other">Other Campaigns & Referrals</option>
                </select>

                {(sourceSearchQuery || sourceCategoryFilter !== 'all') && (
                  <button
                    type="button"
                    className="dv-dash-btn dv-dash-btn-secondary"
                    onClick={() => {
                      setSourceSearchQuery('');
                      setSourceCategoryFilter('all');
                    }}
                    style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* SOURCES RANKED TABLE (TOP TO LOW) */}
            <div className="dv-table-responsive">
              <table className="dv-table">
                <thead>
                  <tr>
                    <th style={{ width: '65px', textAlign: 'center' }}>Rank</th>
                    <th style={{ minWidth: '220px' }}>Traffic Source</th>
                    <th style={{ minWidth: '150px' }}>Channel / Medium</th>
                    <th style={{ minWidth: '160px' }}>Submissions & Share</th>
                    <th style={{ minWidth: '200px' }}>Top Inquired Courses</th>
                    <th style={{ minWidth: '170px' }}>Top Landing Page</th>
                    <th style={{ minWidth: '120px' }}>Latest Submission</th>
                    <th style={{ width: '140px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSources.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
                        <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🔍</div>
                        <strong style={{ fontSize: '1rem', color: '#051f40', display: 'block', marginBottom: '4px' }}>
                          No matching traffic sources found
                        </strong>
                        <span>Try adjusting your timeline, search query or channel filter.</span>
                      </td>
                    </tr>
                  ) : (
                    filteredSources.map((row, idx) => {
                      const isExpanded = expandedSources.has(row.source);
                      const totalLeads = filteredByDate.length || 1;
                      const sharePct = ((row.count / totalLeads) * 100).toFixed(1);
                      const rank = idx + 1;

                      const topCoursesArr = Object.entries(row.courses)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 2);

                      const topPagesArr = Object.entries(row.pages)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 1);

                      const isWhatsApp = row.source.toLowerCase().includes('whatsapp');
                      const isGoogle = row.source.toLowerCase().includes('google');
                      const isMeta = row.source.toLowerCase().includes('facebook') || row.source.toLowerCase().includes('meta');
                      const isInsta = row.source.toLowerCase().includes('instagram');
                      const isLinkedIn = row.source.toLowerCase().includes('linkedin');
                      const isYouTube = row.source.toLowerCase().includes('youtube');
                      const isDirect = row.source.toLowerCase().includes('direct');

                      return (
                        <React.Fragment key={row.source}>
                          <tr className={isExpanded ? 'dv-kw-row-expanded' : ''}>
                            {/* RANK */}
                            <td style={{ textAlign: 'center' }}>
                              <span
                                className={`dv-kw-rank-badge ${
                                  rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other'
                                }`}
                              >
                                #{rank}
                              </span>
                            </td>

                            {/* SOURCE NAME & ICON */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div
                                  className={`dv-source-icon-wrap ${
                                    isWhatsApp
                                      ? 'is-whatsapp'
                                      : isGoogle
                                      ? 'is-google'
                                      : isMeta
                                      ? 'is-meta'
                                      : isInsta
                                      ? 'is-instagram'
                                      : isLinkedIn
                                      ? 'is-linkedin'
                                      : isYouTube
                                      ? 'is-youtube'
                                      : isDirect
                                      ? 'is-direct'
                                      : 'is-other'
                                  }`}
                                >
                                  {isWhatsApp ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.16 8.16 0 0 1-1.25-4.43c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z"/>
                                    </svg>
                                  ) : isGoogle ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                                    </svg>
                                  ) : isMeta ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                  ) : isInsta ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                  ) : isLinkedIn ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                  ) : isYouTube ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                  ) : isDirect ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <line x1="2" y1="12" x2="22" y2="12"></line>
                                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                    </svg>
                                  ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                    </svg>
                                  )}
                                </div>
                                <div className="dv-kw-name-cell">
                                  <span className="dv-kw-text">{row.source}</span>
                                  <span className={`dv-channel-pill ${row.sourceCategory}`}>
                                    {row.sourceCategoryLabel}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* CHANNEL / MEDIUM */}
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#051f40' }}>
                                  {row.mediums.join(', ') || 'direct'}
                                </span>
                                {row.campaigns.length > 0 && row.campaigns[0] !== '—' && (
                                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                                    campaign: {row.campaigns.slice(0, 2).join(', ')}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* SUBMISSIONS & SHARE */}
                            <td>
                              <div className="dv-kw-vol-cell">
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                                  <strong style={{ fontSize: '1.05rem', color: '#051f40' }}>{row.count}</strong>
                                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>leads ({sharePct}%)</span>
                                </div>
                                <div className="dv-kw-bar-track">
                                  <div
                                    className="dv-kw-bar-fill"
                                    style={{
                                      width: `${Math.min(100, Math.max(8, Number(sharePct)))}%`,
                                      background:
                                        isWhatsApp
                                          ? '#16a34a'
                                          : rank === 1
                                          ? '#ef5323'
                                          : rank === 2
                                          ? '#0284c7'
                                          : '#6366f1',
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            {/* TOP COURSES */}
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                {topCoursesArr.map(([courseName, cCount]) => (
                                  <span key={courseName} style={{ fontSize: '0.8rem', color: '#334155' }}>
                                    <strong style={{ color: '#ef5323' }}>{cCount}x</strong> {courseName.length > 32 ? courseName.slice(0, 32) + '...' : courseName}
                                  </span>
                                ))}
                                {Object.keys(row.courses).length > 2 && (
                                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                                    +{Object.keys(row.courses).length - 2} more programs
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* TOP LANDING PAGE */}
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {topPagesArr.map(([pagePath, pCount]) => (
                                  <span key={pagePath} style={{ fontSize: '0.82rem', color: '#051f40', fontFamily: 'monospace' }}>
                                    {pagePath} <span style={{ color: '#64748b', fontSize: '0.74rem' }}>({pCount})</span>
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* LATEST SUBMISSION */}
                            <td>
                              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                {new Date(row.latestTimestamp).toLocaleDateString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </td>

                            {/* ACTION: EXPAND LEADS */}
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                className={`dv-kw-expand-btn ${isExpanded ? 'active' : ''}`}
                                onClick={() => toggleSourceExpand(row.source)}
                                title={isExpanded ? 'Collapse submissions' : 'View all submissions from this source'}
                              >
                                {isExpanded ? 'Hide' : 'View Leads'} ({row.count})
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  style={{
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease',
                                  }}
                                >
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </button>
                            </td>
                          </tr>

                          {/* EXPANDED DRAWER: LIST OF SUBMISSIONS FROM THIS SOURCE */}
                          {isExpanded && (
                            <tr className="dv-kw-drawer-row">
                              <td colSpan={8} style={{ padding: '0', background: '#f8fafc' }}>
                                <div className="dv-kw-drawer-box" style={{ borderLeftColor: isWhatsApp ? '#16a34a' : '#ef5323' }}>
                                  <div className="dv-kw-drawer-header">
                                    <span style={{ fontWeight: 700, color: '#051f40', fontSize: '0.86rem' }}>
                                      Submissions originating from &ldquo;{row.source}&rdquo; ({row.leads.length})
                                    </span>
                                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                      Click any row to view complete lead details
                                    </span>
                                  </div>

                                  <div className="dv-table-responsive" style={{ border: 'none', background: '#ffffff' }}>
                                    <table className="dv-table" style={{ fontSize: '0.84rem' }}>
                                      <thead>
                                        <tr style={{ background: '#f1f5f9' }}>
                                          <th style={{ padding: '8px 12px' }}>Name</th>
                                          <th style={{ padding: '8px 12px' }}>Phone</th>
                                          <th style={{ padding: '8px 12px' }}>Course Inquired</th>
                                          <th style={{ padding: '8px 12px' }}>Form Filled</th>
                                          <th style={{ padding: '8px 12px' }}>Landing Page</th>
                                          <th style={{ padding: '8px 12px' }}>Time (IST)</th>
                                          <th style={{ padding: '8px 12px', textAlign: 'center' }}>Details</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {row.leads.map((lead) => (
                                          <tr
                                            key={lead.id}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setSelectedLead(lead)}
                                            title="Click to view full lead details"
                                          >
                                            <td style={{ padding: '10px 12px', fontWeight: 600, color: '#051f40' }}>
                                              {lead.name}
                                            </td>
                                            <td style={{ padding: '10px 12px' }}>
                                              <a
                                                href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                                                style={{ color: '#ef5323', textDecoration: 'none', fontWeight: 600 }}
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                {lead.phone}
                                              </a>
                                            </td>
                                            <td style={{ padding: '10px 12px', color: '#334155' }}>
                                              {lead.course}
                                            </td>
                                            <td style={{ padding: '10px 12px' }}>
                                              <span className="dv-badge dv-badge-form">
                                                {lead.formLabel}
                                              </span>
                                            </td>
                                            <td style={{ padding: '10px 12px', color: '#0284c7', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                              {lead.pagePath}
                                            </td>
                                            <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '0.8rem' }}>
                                              {lead.displayTime}
                                            </td>
                                            <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                                              <button
                                                type="button"
                                                className="dv-dash-btn dv-dash-btn-secondary"
                                                style={{ padding: '4px 8px', fontSize: '0.74rem' }}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelectedLead(lead);
                                                }}
                                              >
                                                View
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
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
