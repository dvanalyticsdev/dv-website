import React from 'react';
import { blogsData } from '../data/blogsData';
import { blogIdBySlug, blogSlugById } from '../data/blogMeta';

interface BlogsPageProps {
  activePage?: string;
  onOpenBlog?: (pageId: string) => void;
  onBackToBlogs?: () => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({
  activePage = 'blogs',
  onOpenBlog,
  onBackToBlogs,
}) => {
  const defaultFallbackImage =
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&h=630&q=80';

  const activeBlogValue = activePage.startsWith('blog-') ? activePage.replace('blog-', '') : null;
  const activeBlogId = activeBlogValue ? blogIdBySlug[activeBlogValue] ?? activeBlogValue : null;

  const normalizedActiveVal = activeBlogValue ? activeBlogValue.toLowerCase() : '';

  const activeBlog = blogsData.find(
    (b) =>
      b.id === activeBlogId ||
      (b as any).slug === activeBlogValue ||
      ((b as any).slug && (b as any).slug.toLowerCase() === normalizedActiveVal) ||
      (b.id && b.id.toLowerCase() === normalizedActiveVal)
  );

  const getBlogPath = (blog: any) => `/journal/${blog.slug || blogSlugById[blog.id] || blog.id}`;

  if (activeBlog) {
    return (
      <div className="blog-reader-wrapper">
        {/* Hero Section */}
        <section 
          className="blog-reader-hero"
          style={{ backgroundImage: `url('${activeBlog.image}')` }}
        >
          <div className="blog-hero-overlay"></div>
          <div className="container blog-hero-content">
            <div className="blog-back-btn-row" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <a
                className="back-btn-link"
                href="/journal"
                onClick={(event) => {
                  event.preventDefault();
                  onBackToBlogs?.();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px', marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}>
                  <line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="12 19 5 12 12 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ verticalAlign: 'middle' }}>Back to Blogs</span>
              </a>
            </div>
            <div className="text-center">
              <div className="blog-meta-badges">
                <span className="blog-badge">{activeBlog.date}</span>
                <span className="blog-badge secondary">{activeBlog.readTime}</span>
              </div>
              <h1 className="blog-reader-title">{activeBlog.title}</h1>
              <div className="blog-title-underline"></div>
              <p className="blog-reader-author">By {activeBlog.author}</p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="blog-reader-body container">
          <div className="blog-body-card">
            <div className="blog-body-content">
              {activeBlog.sections.map((section: any, idx: number) => (
                <div key={idx} className="blog-body-section">
                  <h2 className="blog-section-title">{section.heading}</h2>
                  <div className="blog-section-divider"></div>
                  <p className="blog-body-text">{section.text}</p>
                  
                  {section.para2 && <p className="blog-body-text">{section.para2}</p>}
                  {section.para3 && <p className="blog-body-text">{section.para3}</p>}
                  
                  {section.list && (
                    <ul className="blog-body-list">
                      {section.list.map((item: string, listIdx: number) => (
                        <li key={listIdx} className="blog-list-item">
                          <span className="blog-list-bullet">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.extra && <p className="blog-body-text blog-extra-text">{section.extra}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="blogs-page-wrapper">
      {/* Hero Section */}
      <section className="blogs-hero-section">
        <div className="blogs-hero-overlay"></div>
        <div className="container blogs-hero-content text-center">
          <span className="blogs-subtitle">Insights &amp; Industry Trends</span>
          <h1 className="blogs-title">DV Analytics Journal</h1>
          <div className="blogs-title-underline"></div>
          <p className="blogs-lead">
            Stay ahead of the curve with expert perspectives on Data Science, Artificial Intelligence, 
            Generative AI, and Career Transformation.
          </p>
        </div>
      </section>

      {/* Listing Grid */}
      <section className="blogs-list-section container">
        <div className="blogs-grid">
          {blogsData.map((blog) => (
            <article key={blog.id} className="blog-card glow-card">
              <div className="blog-card-img-wrapper">
                <img
                  src={blog.image && !blog.image.startsWith('data:') ? blog.image : defaultFallbackImage}
                  alt={blog.title}
                  className="blog-card-img"
                  onError={(e) => {
                    e.currentTarget.src = defaultFallbackImage;
                  }}
                />
                <div className="blog-card-meta">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
              <div className="blog-card-content">
                <span className="blog-author-tag">By {blog.author}</span>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <a
                  className="btn btn-outline read-more-blog-btn"
                  href={getBlogPath(blog)}
                  onClick={(event) => {
                    event.preventDefault();
                    const targetVal = (blog as any).slug || blogSlugById[blog.id] || blog.id;
                    onOpenBlog?.(`blog-${targetVal}`);
                  }}
                >
                  Read Full Article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow-icon">
                    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
