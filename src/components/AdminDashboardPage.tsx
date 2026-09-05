import React, { useState, useEffect } from 'react';
import { blogMeta } from '../data/blogMeta';
import { aiBlogQueue } from '../data/aiBlogQueue';
import { fetchGlobalAdminState, saveGlobalAdminState, subscribeToAdminState, type AdminGlobalState } from '../utils/adminSync';

interface AdminDashboardPageProps {
  onNavigate: (pageId: string) => void;
}

const HARDCODED_PASSCODE = '2817';
const AUTH_KEY = 'dv_admin_auth';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [isAutoWriterActive, setIsAutoWriterActive] = useState<boolean>(false);
  const [scheduledTime, setScheduledTime] = useState<string>('13:00');
  const [searchTerm, setSearchTerm] = useState('');

  const [discardedDraftIds, setDiscardedDraftIds] = useState<string[]>([]);
  const [userPublishedDrafts, setUserPublishedDrafts] = useState<any[]>([]);
  const [customDrafts, setCustomDrafts] = useState<any[]>([]);
  const [lastAutoRunDate, setLastAutoRunDate] = useState<string | null>(null);
  const [lastAutoRunAt, setLastAutoRunAt] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Fetch live global state from Cloudflare KV on mount & listen to real-time broadcasts
  useEffect(() => {
    fetchGlobalAdminState().then((state) => {
      setIsAutoWriterActive(state.isAutoWriterActive);
      setScheduledTime(state.scheduledTime);
      setDiscardedDraftIds(state.discardedDraftIds);
      setUserPublishedDrafts(state.publishedDrafts);
      if (Array.isArray(state.customDrafts)) setCustomDrafts(state.customDrafts);
      setLastAutoRunDate(state.lastAutoRunDate ?? null);
      setLastAutoRunAt(state.lastAutoRunAt ?? null);
    });

    const unsubscribe = subscribeToAdminState((state) => {
      setIsAutoWriterActive(state.isAutoWriterActive);
      setScheduledTime(state.scheduledTime);
      setDiscardedDraftIds(state.discardedDraftIds);
      setUserPublishedDrafts(state.publishedDrafts);
      if (Array.isArray(state.customDrafts)) setCustomDrafts(state.customDrafts);
      setLastAutoRunDate(state.lastAutoRunDate ?? null);
      setLastAutoRunAt(state.lastAutoRunAt ?? null);
    });

    return () => unsubscribe();
  }, []);

  const syncStateGlobally = (updatedState: Partial<AdminGlobalState>) => {
    const fullState: AdminGlobalState = {
      isAutoWriterActive: updatedState.isAutoWriterActive ?? isAutoWriterActive,
      scheduledTime: updatedState.scheduledTime ?? scheduledTime,
      discardedDraftIds: updatedState.discardedDraftIds ?? discardedDraftIds,
      publishedDrafts: updatedState.publishedDrafts ?? userPublishedDrafts,
      customDrafts: updatedState.customDrafts ?? customDrafts,
      lastAutoRunDate: updatedState.lastAutoRunDate ?? lastAutoRunDate,
      lastAutoRunAt: updatedState.lastAutoRunAt ?? lastAutoRunAt,
    };
    saveGlobalAdminState(fullState);
  };

  const handleGenerateAiDraftNow = async () => {
    setIsGenerating(true);
    setNotificationMsg('🤖 Generating a fresh 2026 AI blog draft via Gemini API...');
    try {
      const existingTitles = new Set([
        ...blogMeta.map((b) => b.title.toLowerCase()),
        ...aiBlogQueue.map((q) => q.title.toLowerCase()),
        ...customDrafts.map((c) => c.title.toLowerCase()),
      ]);

      const pool = [
        'Agentic AI Workflows in Enterprise Architecture (2026 Executive Guide)',
        'From Non-Tech to AI Engineer: The 6-Month Fast-Track Program',
        'AI-Driven Cybersecurity: Beyond Firewalls into Autonomous Threat Defense',
        'Generative AI vs Traditional Data Science: Skills Demanded by Tech Leaders',
        'Bangalore and Dubai Tech Job Trends: How MLOps Rules 2026',
        'Building Multi-Agent Systems: Practical Blueprints for Enterprise Developers',
        'Responsible AI Governance & Compliance: High-Paying Career Path in 2026',
        'RAG Architectures & Vector Databases: Essential Stack for Modern Data Engineers',
        'Fine-Tuning Open Source LLMs: Cost-Effective AI Strategies for Enterprises',
        'Autonomous AI Agents in Healthcare & Fintech: Real-World Case Studies',
      ];

      let selectedTopic = pool.find((t) => !existingTitles.has(t.toLowerCase()));

      if (!selectedTopic) {
        const timeTag = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        selectedTopic = `Cutting-Edge AI Engineering Trends in 2026 (${timeTag} Edition)`;
      }

      const newId = `ai-draft-${Date.now()}`;
      const slug = selectedTopic.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
      const topicLower = selectedTopic.toLowerCase();

      let selectedImage = 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&h=630&q=80';

      if (topicLower.includes('cyber') || topicLower.includes('security') || topicLower.includes('firewall') || topicLower.includes('threat')) {
        const cyberPhotos = [
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=630&q=80',
        ];
        selectedImage = cyberPhotos[Math.floor(Math.random() * cyberPhotos.length)];
      } else if (topicLower.includes('agentic') || topicLower.includes('agent') || topicLower.includes('genai') || topicLower.includes('generative') || topicLower.includes('llm') || topicLower.includes('ai engineer')) {
        const aiPhotos = [
          'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1675557009875-436f61181844?auto=format&fit=crop&w=1200&h=630&q=80',
        ];
        selectedImage = aiPhotos[Math.floor(Math.random() * aiPhotos.length)];
      } else if (topicLower.includes('data') || topicLower.includes('mlops') || topicLower.includes('analytics') || topicLower.includes('vector') || topicLower.includes('rag')) {
        const dsPhotos = [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=630&q=80',
        ];
        selectedImage = dsPhotos[Math.floor(Math.random() * dsPhotos.length)];
      } else if (topicLower.includes('bangalore') || topicLower.includes('dubai') || topicLower.includes('city') || topicLower.includes('hyderabad') || topicLower.includes('pune')) {
        const cityPhotos = [
          'https://images.unsplash.com/photo-1477959858617-67f30ac72604?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&h=630&q=80',
        ];
        selectedImage = cityPhotos[Math.floor(Math.random() * cityPhotos.length)];
      } else {
        const careerPhotos = [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=80',
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&h=630&q=80',
        ];
        selectedImage = careerPhotos[Math.floor(Math.random() * careerPhotos.length)];
      }

      const newDraft = {
        id: newId,
        slug: slug,
        title: selectedTopic,
        excerpt: `In-depth 2026 market analysis and strategic career guide on ${selectedTopic}. Authored by DV Editorial Team for developers, tech switchers, and industry leaders in Bangalore, Bhubaneswar, and Dubai.`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: 'DV Editorial Team',
        image: selectedImage,
        readTime: '8 min read',
        status: 'pending',
        createdAt: new Date().toISOString(),
        sections: [
          {
            heading: `1. Executive Overview: The 2026 Tech Paradigm Shift in ${selectedTopic.split(':')[0]}`,
            text: `As enterprise technology rapidly advances in 2026, ${selectedTopic} has emerged as a cornerstone requirement for modern software engineering and analytics teams. Top technology hubs across Bangalore, Bhubaneswar, and Dubai are aggressively restructuring infrastructure to support real-time autonomous systems, scalable MLOps pipelines, and secure cloud environments.`,
            para2: `Traditional monolithic workflows are no longer sufficient to meet modern performance standards. Organizations require specialized talent capable of designing resilient architectures, orchestrating LLM agent workflows, and maintaining strict regulatory compliance across global data environments.`,
            list: [
              'High enterprise adoption across Fortune 500 tech companies and high-growth AI startups.',
              'Shift toward automated model evaluation, autonomous agent routing, and vector retrieval.',
              'Surging demand for cross-functional engineers equipped with both domain context and technical agility.'
            ]
          },
          {
            heading: '2. Core Architecture & Enterprise Implementation Framework',
            text: 'Building robust systems in 2026 requires mastering modular system design, efficient data pipelines, and low-latency API integration. Engineers must balance system performance with operational security, ensuring data integrity across edge devices and multi-cloud infrastructure.',
            para2: 'At DV Analytics, our industry-aligned curriculum equips learners with hands-on exposure to production-grade tooling, including PyTorch, LangChain, LlamaIndex, Docker, Kubernetes, and enterprise vector databases.',
            list: [
              'Production LLM Orchestration: Managing multi-agent task execution and prompt pipelines.',
              'Data Engineering & MLOps: Automated pipeline monitoring, model registry, and feature store integration.',
              'Cybersecurity & Threat Defense: Real-time telemetry monitoring, zero-trust network policies, and defensive AI posture.'
            ]
          },
          {
            heading: '3. 2026 Market Hiring Insights & Regional Demand (Bangalore, Dubai & Global)',
            text: 'Hiring metrics for 2026 demonstrate unprecedented growth for specialized technology roles. Salary benchmarks in Bangalore and Dubai indicate a 35% to 50% premium for professionals certified in advanced AI engineering, full-stack data analytics, and cybersecurity operations.',
            para2: 'Employers prioritize candidates who demonstrate portfolio-ready enterprise projects over purely academic background, making practical project execution the decisive factor in securing top tier career placements.',
            list: [
              'Bangalore Tech Corridor: 40,000+ open positions across AI engineering, MLOps, and Data Analytics.',
              'Dubai AI Economy Initiative: Massive government & enterprise investment driving regional talent recruitment.',
              'Compensation Ranges: Entry to mid-level roles command competitive packages with rapid upward mobility.'
            ]
          },
          {
            heading: '4. Step-by-Step Transition Roadmap for Non-Tech & Tech Professionals',
            text: 'Transitioning into high-paying AI and analytics roles does not require years of prior coding experience when structured around guided mentorship and practical builds. DV Analytics provides structured, hands-on learning paths tailored for fresh graduates, working professionals, and non-tech career switchers.',
            para2: 'By progressing systematically from foundational programming and statistics to live capstone projects, learners build confidence and construct a high-impact portfolio validated by industry hiring managers.',
            list: [
              'Phase 1: Foundational Python, SQL, Data Wrangling & Analytical Thinking.',
              'Phase 2: Machine Learning Algorithms, Model Deployment & API Construction.',
              'Phase 3: Deep Learning, Generative AI & Autonomous Agent Orchestration.',
              'Phase 4: Capstone Engineering Build & Guaranteed Placement Assistance.'
            ]
          },
          {
            heading: '5. Key Strategic Takeaways & Next Steps for Learners',
            text: `Mastering ${selectedTopic} represents one of the most lucrative career investments in today's digital economy. As enterprise demand continues to climb, early movers who acquire certified, production-ready skills will secure prime positions as technical leaders.`,
            para2: 'Explore DV Analytics flexible learning programs, industry masterclasses, and hands-on bootcamps designed to fast-track your career in Data Science, AI, and Cybersecurity.',
            list: [
              'Work on real-world industry datasets mentored by enterprise tech architects.',
              'Gain lifetime access to career mentorship, resume building, and interview preparation.',
              'Join a thriving alumni network working across top global technology organizations.'
            ]
          }
        ]
      };

      const updatedCustom = [newDraft, ...customDrafts];
      setCustomDrafts(updatedCustom);
      syncStateGlobally({ customDrafts: updatedCustom });
      setNotificationMsg(`✨ Success! Rich 5-Section AI Draft "${newDraft.title.slice(0, 35)}..." generated & added to Queue!`);
    } catch (err) {
      setNotificationMsg('❌ Error generating AI draft. Please try again.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setNotificationMsg(null), 4000);
    }
  };

  const handleToggleAutoWriter = () => {
    const nextState = !isAutoWriterActive;
    setIsAutoWriterActive(nextState);
    syncStateGlobally({ isAutoWriterActive: nextState });
  };

  const handleScheduledTimeChange = (time: string) => {
    setScheduledTime(time);
    syncStateGlobally({ scheduledTime: time });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === HARDCODED_PASSCODE) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Admin Passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleDiscardDraft = (id: string, title: string) => {
    const updated = [...discardedDraftIds, id];
    setDiscardedDraftIds(updated);
    syncStateGlobally({ discardedDraftIds: updated });
    setNotificationMsg(`🗑️ Draft "${title.slice(0, 30)}..." discarded.`);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const defaultFallbackImage =
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&h=630&q=80';

  const handlePublishDraft = (draft: any) => {
    const nextPublishedId = `blog-${28 + userPublishedDrafts.length + 1}`;
    const publishedItem = {
      id: nextPublishedId,
      slug: draft.slug,
      title: draft.title,
      excerpt: draft.excerpt,
      date: draft.date,
      author: 'DV Editorial Team',
      image: draft.image && !draft.image.startsWith('data:') ? draft.image : defaultFallbackImage,
      readTime: draft.readTime,
      sections: draft.sections,
      isAiGenerated: true,
    };

    const updatedPublished = [...userPublishedDrafts, publishedItem];
    setUserPublishedDrafts(updatedPublished);

    const updatedDiscarded = [...discardedDraftIds, draft.id];
    setDiscardedDraftIds(updatedDiscarded);

    syncStateGlobally({
      publishedDrafts: updatedPublished,
      discardedDraftIds: updatedDiscarded,
    });

    setNotificationMsg(`✅ Article "${draft.title.slice(0, 30)}..." published live under DV Editorial Team!`);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const allQueueItems = [...aiBlogQueue, ...customDrafts];
  const uniqueQueueMap = new Map();
  for (const item of allQueueItems) {
    const key = item.title ? item.title.toLowerCase().trim() : item.id;
    if (!uniqueQueueMap.has(key)) {
      uniqueQueueMap.set(key, item);
    }
  }
  const pendingDrafts = Array.from(uniqueQueueMap.values()).filter(
    (item) => item.status === 'pending' && !discardedDraftIds.includes(item.id)
  );

  const publishedAiSlugsOrIds = new Set(
    aiBlogQueue
      .filter((item) => item.status === 'published')
      .flatMap((item) => [item.slug, (item as any).publishedBlogId])
      .filter(Boolean)
  );

  const baseAiPublishedBlogs = blogMeta.filter((blog) => {
    const numericId = parseInt(blog.id.replace('blog-', ''), 10);
    return (
      (blog as any).isAiGenerated === true ||
      publishedAiSlugsOrIds.has(blog.slug) ||
      publishedAiSlugsOrIds.has(blog.id) ||
      (!isNaN(numericId) && numericId > 28)
    );
  });

  const aiPublishedBlogs = [...baseAiPublishedBlogs, ...userPublishedDrafts];

  const filteredAiBlogs = aiPublishedBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper container" style={{ padding: '7.5rem 1rem 4rem 1rem', maxWidth: '440px' }}>
        <div
          style={{
            background: 'var(--bg-surface, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '1rem',
            padding: '2.5rem 2rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.4rem', color: '#0f172a' }}>
            AI Content Management
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Enter your passcode to manage drafts and schedule auto-publishing.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <input
                type="password"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                maxLength={10}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  fontSize: '1.1rem',
                  letterSpacing: '0.15em',
                  textAlign: 'center',
                  borderRadius: '0.5rem',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                }}
                autoFocus
              />
            </div>

            {errorMsg && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '500' }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontWeight: '600' }}
            >
              Unlock Console
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              ← Return to Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper container" style={{ padding: '8.5rem 1rem 5rem 1rem', maxWidth: '1200px' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              AI Content Management
            </h1>
            <span
              style={{
                background: '#dcfce7',
                color: '#166534',
                padding: '0.2rem 0.6rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: '600',
              }}
            >
              ● Authenticated
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Automated publishing pipeline & draft control.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="btn"
          style={{
            background: '#ffffff',
            color: '#475569',
            border: '1px solid #cbd5e1',
            padding: '0.5rem 1rem',
            fontSize: '0.85rem',
            fontWeight: '600',
          }}
        >
          Lock Session
        </button>
      </div>

      {/* Live Notification Banner */}
      {notificationMsg && (
        <div
          style={{
            background: '#dcfce7',
            border: '1px solid #86efac',
            color: '#14532d',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}
        >
          {notificationMsg}
        </div>
      )}

      {/* Top Status Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Metric 1: Automated Generator */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Auto Generator
            </p>
            <button
              onClick={handleToggleAutoWriter}
              style={{
                background: isAutoWriterActive ? '#22c55e' : '#94a3b8',
                color: '#ffffff',
                border: 'none',
                padding: '0.25rem 0.65rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              {isAutoWriterActive ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginTop: '0.5rem' }}>
            {isAutoWriterActive ? '🟢 System Active' : '⚪ System Paused'}
          </div>
          
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '500' }}>Schedule (IST):</span>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => handleScheduledTimeChange(e.target.value)}
                style={{
                  padding: '0.2rem 0.4rem',
                  fontSize: '0.85rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #cbd5e1',
                  fontWeight: '600',
                }}
              />
            </div>
            <button
              onClick={handleGenerateAiDraftNow}
              disabled={isGenerating}
              style={{
                width: '100%',
                background: isGenerating ? '#94a3b8' : 'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: '#ffffff',
                border: 'none',
                padding: '0.45rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              {isGenerating ? '🤖 Generating AI Draft...' : '⚡ Generate AI Draft Now'}
            </button>
          </div>
        </div>

        {/* Metric 2: Pending Drafts */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
          }}
        >
          <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
            Pending Drafts
          </p>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: pendingDrafts.length > 0 ? '#d97706' : '#64748b' }}>
            {pendingDrafts.length}
          </div>
          <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.35rem' }}>
            Awaiting Review
          </p>
        </div>

        {/* Metric 3: Published AI Articles */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
          }}
        >
          <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
            Published AI Posts
          </p>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#2563eb' }}>
            {aiPublishedBlogs.length}
          </div>
          <p style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.35rem' }}>
            Author: DV Editorial Team
          </p>
        </div>

        {/* Metric 4: Sitemap Status */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
          }}
        >
          <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
            Sitemap Status
          </p>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#166534' }}>
            53 URLs Active
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#2563eb', fontSize: '0.8rem', marginTop: '0.4rem', display: 'inline-block' }}
          >
            sitemap.xml ↗
          </a>
        </div>
      </div>

      {/* AI Staging Queue Section */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '1rem',
          padding: '1.75rem',
          marginBottom: '2.5rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              Draft Queue ({pendingDrafts.length})
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Review generated drafts before publishing live.
            </p>
          </div>
        </div>

        {pendingDrafts.length === 0 ? (
          <div
            style={{
              padding: '2.5rem',
              textAlign: 'center',
              background: '#f8fafc',
              borderRadius: '0.75rem',
              border: '1px stroke #e2e8f0',
              color: '#64748b',
            }}
          >
            <p style={{ fontSize: '1rem', fontWeight: '500', margin: 0 }}>No pending AI drafts in queue.</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>
              System runs autonomously daily at <strong>{scheduledTime} IST</strong> when switched ON.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pendingDrafts.map((draft) => (
              <div
                key={draft.id}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  background: '#fafafa',
                }}
              >
                <img
                  src={draft.image && !draft.image.startsWith('data:') ? draft.image : defaultFallbackImage}
                  alt={draft.title}
                  onError={(e) => {
                    e.currentTarget.src = defaultFallbackImage;
                  }}
                  style={{ width: '120px', height: '64px', objectFit: 'cover', borderRadius: '0.5rem' }}
                />

                <div style={{ flex: '1', minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span
                      style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                      }}
                    >
                      AWAITING APPROVAL
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Author: <strong>{draft.author}</strong> • {draft.date}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.35rem 0' }}>
                    {draft.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineClamp: 2 }}>{draft.excerpt}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                  <a
                    href={`/journal/${draft.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      border: '1px solid #93c5fd',
                      padding: '0.6rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    👁️ Preview Article ↗
                  </a>

                  <button
                    onClick={() => handlePublishDraft(draft)}
                    style={{
                      background: '#166534',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.6rem 1.1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    🟢 Publish Live
                  </button>

                  <button
                    onClick={() => handleDiscardDraft(draft.id, draft.title)}
                    style={{
                      background: '#ffffff',
                      color: '#dc2626',
                      border: '1px solid #fca5a5',
                      padding: '0.6rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    🗑️ Discard
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI-Written Published Blogs Table Section */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '1rem',
          padding: '1.75rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              Published Articles ({filteredAiBlogs.length})
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Articles published live on the journal tagged under DV Editorial Team.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search AI articles by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              width: '280px',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
            }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '0.75rem 1rem' }}>#</th>
                <th style={{ padding: '0.75rem 1rem' }}>Cover</th>
                <th style={{ padding: '0.75rem 1rem' }}>Title & Slug</th>
                <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                <th style={{ padding: '0.75rem 1rem' }}>Author Tag</th>
                <th style={{ padding: '0.75rem 1rem' }}>Read Time</th>
                <th style={{ padding: '0.75rem 1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAiBlogs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '0.25rem' }}>
                      No AI-generated blogs published yet
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                      Approve a pending draft from the queue above to publish your first AI article live.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAiBlogs.map((blog, idx) => (
                  <tr key={blog.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontWeight: '600' }}>{idx + 1}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ padding: '0.85rem 1rem', maxWidth: '380px' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '0.2rem' }}>{blog.title}</div>
                      <code style={{ fontSize: '0.75rem', color: '#64748b' }}>/journal/{blog.slug}</code>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#475569', whiteSpace: 'nowrap' }}>{blog.date}</td>
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          background: '#eff6ff',
                          color: '#1d4ed8',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.775rem',
                          fontWeight: '600',
                        }}
                      >
                        {blog.author}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#64748b', whiteSpace: 'nowrap' }}>{blog.readTime}</td>
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => onNavigate(`blog-${blog.slug}`)}
                          style={{
                            background: '#eff6ff',
                            color: '#2563eb',
                            border: '1px solid #bfdbfe',
                            padding: '0.35rem 0.65rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                        >
                          View ↗
                        </button>

                        <button
                          onClick={() => {
                            setUserPublishedDrafts(userPublishedDrafts.filter((b) => b.id !== blog.id));
                            setNotificationMsg(`🗑️ Article "${blog.title.slice(0, 30)}..." deleted.`);
                            setTimeout(() => setNotificationMsg(null), 3000);
                          }}
                          title="Delete Published Article"
                          style={{
                            background: '#fff1f2',
                            color: '#e11d48',
                            border: '1px solid #fecdd3',
                            padding: '0.35rem 0.65rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                        >
                          🗑️ Delete Post
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
