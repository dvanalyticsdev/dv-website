import React, { useState, useEffect } from 'react';
import { blogMeta } from '../data/blogMeta';
import { aiBlogQueue } from '../data/aiBlogQueue';

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

  // OFF by default until explicitly enabled by Admin
  const [isAutoWriterActive, setIsAutoWriterActive] = useState<boolean>(() => {
    const saved = localStorage.getItem('dv_auto_writer_active');
    return saved !== null ? saved === 'true' : false;
  });

  // Scheduled daily time (Default: 13:00 IST / 1:00 PM IST)
  const [scheduledTime, setScheduledTime] = useState<string>(() => {
    return localStorage.getItem('dv_auto_writer_time') || '13:00';
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [copiedActionText, setCopiedActionText] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('dv_auto_writer_active', String(isAutoWriterActive));
  }, [isAutoWriterActive]);

  useEffect(() => {
    localStorage.setItem('dv_auto_writer_time', scheduledTime);
  }, [scheduledTime]);

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

  const pendingDrafts = aiBlogQueue.filter((item) => item.status === 'pending');
  
  // Filter ONLY AI-generated published blogs (IDs > blog-28 or marked as AI generated or in aiBlogQueue published list)
  const publishedAiSlugsOrIds = new Set(
    aiBlogQueue
      .filter((item) => item.status === 'published')
      .flatMap((item) => [item.slug, (item as any).publishedBlogId])
      .filter(Boolean)
  );

  const aiPublishedBlogs = blogMeta.filter((blog) => {
    const numericId = parseInt(blog.id.replace('blog-', ''), 10);
    return (
      (blog as any).isAiGenerated === true ||
      publishedAiSlugsOrIds.has(blog.slug) ||
      publishedAiSlugsOrIds.has(blog.id) ||
      (!isNaN(numericId) && numericId > 28)
    );
  });

  const filteredAiBlogs = aiPublishedBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedActionText(label);
    setTimeout(() => setCopiedActionText(null), 2500);
  };

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
                placeholder="Passcode (2817)"
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
    <div className="page-wrapper container" style={{ padding: '7rem 1rem 5rem 1rem', maxWidth: '1200px' }}>
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

      {/* Action Notification Banner */}
      {copiedActionText && (
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>✅ Command Copied: {copiedActionText}</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Run in terminal to complete action</span>
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
              onClick={() => setIsAutoWriterActive(!isAutoWriterActive)}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '500' }}>Schedule (IST):</span>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                style={{
                  padding: '0.2rem 0.4rem',
                  fontSize: '0.85rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #cbd5e1',
                  fontWeight: '600',
                }}
              />
            </div>
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
                  src={draft.image}
                  alt={draft.title}
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
                    onClick={() =>
                      copyToClipboard(
                        `node --experimental-strip-types scripts/manage-ai-blog.mjs --action publish --id ${draft.id}`,
                        `Publish command for "${draft.title.slice(0, 30)}..."`
                      )
                    }
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
                    🟢 Publish Now (1-Click)
                  </button>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        `node --experimental-strip-types scripts/manage-ai-blog.mjs --action delete --id ${draft.id}`,
                        `Discard command for draft "${draft.title.slice(0, 30)}..."`
                      )
                    }
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
                          onClick={() =>
                            copyToClipboard(
                              `node --experimental-strip-types scripts/manage-ai-blog.mjs --action delete --id ${blog.id}`,
                              `Delete command for "${blog.id}"`
                            )
                          }
                          title="Delete AI Published Article"
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
