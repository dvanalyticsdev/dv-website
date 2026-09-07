import { blogIdBySlug, blogMeta, blogSlugById, type BlogMeta } from '../data/blogMeta.ts';
import { courseCatalog } from '../data/courseMeta.ts';
import { seoLandingPages } from '../data/seoLandingPages.ts';
import { courseSlugById, getPathFromPage, seoLandingPageSlugById, serviceSlugById } from './routes.ts';

export const siteUrl = 'https://www.dvanalyticsmds.com';
export const siteName = 'DV Analytics';
export const defaultSocialImage = '/logo.png';

export { blogIdBySlug, blogSlugById };

export const getBlogPath = (blog: BlogMeta) => `/journal/${blog.slug}`;

export const routePathByPageId = (pageId: string) => {
  if (pageId.startsWith('blog-')) {
    const value = pageId.replace('blog-', '');
    const blogId = blogIdBySlug[value] ?? value;
    const blog = blogMeta.find((item) => item.id === blogId);
    return blog ? getBlogPath(blog) : `/journal/${value}`;
  }

  return getPathFromPage(pageId);
};

const truncate = (value: string, maxLength = 158) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).replace(/\s+\S*$/, '')}...`;
};

const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const toIsoDate = (value: string) => {
  const months: Record<string, string> = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };
  const match = value.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return value;

  const [, month, day, year] = match;
  const monthNumber = months[month];
  if (!monthNumber) return value;

  return `${year}-${monthNumber}-${day.padStart(2, '0')}`;
};

const coursePosterById: Record<string, string> = {
  apids: '/courses-poster/APIDS.png',
  apida: '/courses-poster/APIDA.png',
  aiml: '/courses-poster/Advance AIML.png',
  genai: '/courses-poster/Gen AI.png',
  specialist: '/courses-poster/DAS.png',
  apcs: '/courses-poster/APCF.png',
  days7_genai: '/courses-poster/7-days-genai.png',
  fde: '/courses-poster/ai-forward-deployment-engineer.png',
  flp: '/courses-poster/FLP.png',
};

const courseSeoById: Record<string, { title: string; description: string; duration: string }> = Object.fromEntries(
  courseCatalog.map((course) => [
    course.id,
    {
      title: course.label,
      description: `${course.label} from DV Analytics helps learners build practical, industry-ready skills through structured training, hands-on projects, mentorship, and career support.`,
      duration: course.id === 'days7_genai' ? '7 Days' : course.category === 'self-paced' ? 'Self-paced' : 'Live training program',
    },
  ])
);

const basePages: Record<string, { title: string; description: string; image?: string; noindex?: boolean }> = {
  home: {
    title: 'DV Analytics | Data Science, AI, GenAI & Cybersecurity Training',
    description:
      'DV Analytics offers industry-ready Data Science, Data Analytics, Generative AI, Agentic AI, Cybersecurity, and placement-focused career programs.',
    image: '/hero-mobile-bg.png',
  },
  courses: {
    title: 'Data Science, AI & Cybersecurity Courses | DV Analytics',
    description:
      'Explore live and self-paced programs in Data Science, Data Analytics, Generative AI, Agentic AI, Cybersecurity, and AI Forward Deployment Engineering.',
    image: '/courses-poster/APIDS.png',
  },
  services: {
    title: 'Enterprise AI Consulting & Talent Services | DV Analytics',
    description:
      'AI consulting, corporate training, analytics solutions, and talent augmentation services for teams building practical data and AI capabilities.',
    image: '/services-hero-bg.jpg',
  },
  about: {
    title: 'Who We Are | DV Analytics',
    description:
      'Learn about DV Analytics, its leadership, training mission, analytics expertise, and commitment to practical AI and technology education.',
    image: '/about-hero-bg.jpg',
  },
  alumni: {
    title: 'DV Analytics Alumni Success Stories',
    description:
      'Meet DV Analytics alumni who built careers across data analytics, data science, AI, cybersecurity, and technology roles.',
    image: '/companies-banner.jpg',
  },
  blogs: {
    title: 'Data Science, AI & Career Journal | DV Analytics',
    description:
      'Read DV Analytics articles on data science careers, AI skills, GenAI, Agentic AI, cybersecurity, analytics jobs, portfolios, and learning roadmaps.',
    image: '/journal-main-bg.png',
  },
  faqs: {
    title: 'Data Science, AI & Cybersecurity Course FAQs | DV Analytics',
    description:
      'Answers to common questions about DV Analytics courses, eligibility, projects, certifications, LMS access, fees, mentorship, and placement support.',
    image: '/logo.png',
  },
  enroll: {
    title: 'Enroll in DV Analytics Programs',
    description:
      'Start your admission inquiry for DV Analytics Data Science, AI, GenAI, Cybersecurity, and analytics career programs.',
    noindex: true,
  },
  payment: {
    title: 'Payment | DV Analytics',
    description: 'Secure payment page for DV Analytics learners.',
    noindex: true,
  },
  'upcoming-batches': {
    title: 'Upcoming Batches (Sep 12) | APIDS, APIDA & FDE | DV Analytics',
    description: 'Explore upcoming industrial batches for Data Science (APIDS), Data Analytics (APIDA), and AI Forward Deployment Engineering (FDE). Reserve your seat for September 12th.',
  },
  'not-found': {
    title: 'Page Not Found | DV Analytics',
    description: 'The DV Analytics page you requested could not be found.',
    noindex: true,
  },
};

const serviceTitles: Record<string, string> = {
  'service-aics': 'AI Consulting Solutions',
  'service-ccs': 'Corporate Consulting Services',
  'service-crhta': 'Corporate Resource Hiring & Talent Augmentation',
};

const setOrCreateMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const setOrCreateLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

const replaceJsonLd = (schema: unknown[]) => {
  document.head.querySelectorAll('script[data-seo-json-ld="true"]').forEach((element) => element.remove());
  schema.forEach((item) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonLd = 'true';
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: siteName,
  url: siteUrl,
  logo: absoluteUrl('/logo.png'),
  email: 'info@dvanalyticsmds.com',
  telephone: '+91-9019030033',
  sameAs: [
    'https://www.linkedin.com/company/dvanalytics/',
    'https://www.youtube.com/@dvanalytics',
    'https://www.facebook.com/dvanalytics',
    'https://www.instagram.com/dvanalytics/',
  ],
  areaServed: ['India', 'United Arab Emirates', 'Global'],
  knowsAbout: ['Data Science', 'Data Analytics', 'Generative AI', 'Agentic AI', 'Cybersecurity', 'AI Engineering'],
  address: [
    { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
    { '@type': 'PostalAddress', addressLocality: 'Bhubaneswar', addressCountry: 'IN' },
    { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/journal?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who can join these programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Graduates, freshers, working professionals, career-gap candidates, and professionals transitioning into Data Science, AI, Cybersecurity, or Digital Technology careers can join.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a programming background?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The programs start from fundamentals and gradually move to advanced concepts such as SQL, Python, AI, analytics, and cloud deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will I work on industry projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Students work on real-world projects across domains such as banking, telecom, retail, e-commerce, healthcare, insurance, and manufacturing.',
      },
    },
  ],
};

const courseSchema = (course: { title: string; description: string; duration: string }, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.title,
  description: truncate(course.description, 300),
  url: absoluteUrl(path),
  inLanguage: 'en',
  educationalCredentialAwarded: 'DV Analytics Industry Certification',
  provider: {
    '@type': 'EducationalOrganization',
    name: siteName,
    url: siteUrl,
    sameAs: siteUrl,
  },
  offers: {
    '@type': 'Offer',
    category: 'Education',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url: absoluteUrl(path),
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '520',
    bestRating: '5',
    worstRating: '1',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online and offline instructor-led training',
    courseWorkload: course.duration,
  },
});

const articleSchema = (blog: BlogMeta, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: blog.title,
  description: blog.excerpt,
  image: absoluteUrl(blog.image),
  datePublished: toIsoDate(blog.date),
  dateModified: toIsoDate(blog.date),
  author: {
    '@type': 'Person',
    name: blog.author,
  },
  publisher: {
    '@type': 'Organization',
    name: siteName,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
    },
  },
  mainEntityOfPage: absoluteUrl(path),
});

const landingPageSchema = (page: (typeof seoLandingPages)[number], path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: page.heading,
  description: page.description,
  url: absoluteUrl(path),
  mainEntity: page.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const getSeoForPage = (pageId: string) => {
  const path = routePathByPageId(pageId);
  const schema: unknown[] = [organizationSchema, websiteSchema];

  if (pageId.startsWith('course-')) {
    const courseId = pageId.replace('course-', '');
    const course = courseSeoById[courseId];
    if (course) {
      schema.push(courseSchema(course, path));
      schema.push(breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: course.title, path },
      ]));
      return {
        title: `${course.title} | DV Analytics`,
        description: truncate(course.description),
        canonical: absoluteUrl(path),
        image: absoluteUrl(coursePosterById[courseId] ?? defaultSocialImage),
        noindex: false,
        schema,
      };
    }
  }

  if (pageId.startsWith('service-')) {
    const title = serviceTitles[pageId] ?? 'Enterprise AI Service';
    schema.push(breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: title, path },
    ]));
    return {
      title: `${title} | DV Analytics`,
      description: truncate(`${title} from DV Analytics for enterprise AI, analytics, consulting, training, and talent transformation programs.`),
      canonical: absoluteUrl(path),
      image: absoluteUrl('/services-hero-bg.jpg'),
      noindex: false,
      schema,
    };
  }

  if (pageId.startsWith('blog-')) {
    const value = pageId.replace('blog-', '');
    const blogId = blogIdBySlug[value] ?? value;
    const blog = blogMeta.find((item) => item.id === blogId);
    if (blog) {
      const blogPath = getBlogPath(blog);
      schema.push(articleSchema(blog, blogPath));
      schema.push(breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Journal', path: '/journal' },
        { name: blog.title, path: blogPath },
      ]));
      return {
        title: `${blog.title} | DV Analytics Journal`,
        description: truncate(blog.excerpt),
        canonical: absoluteUrl(blogPath),
        image: absoluteUrl(blog.image),
        noindex: false,
        schema,
      };
    }
  }

  if (pageId === 'faqs') {
    schema.push(faqSchema);
  }

  if (pageId.startsWith('lp-')) {
    const landingPage = seoLandingPages.find((page) => page.id === pageId);
    if (landingPage) {
      schema.push(landingPageSchema(landingPage, path));
      schema.push(breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: landingPage.heading, path },
      ]));
      return {
        title: landingPage.title,
        description: truncate(landingPage.description),
        canonical: absoluteUrl(path),
        image: absoluteUrl(landingPage.image),
        noindex: false,
        schema,
      };
    }
  }

  const base = basePages[pageId] ?? basePages['not-found'];
  if (['courses', 'services', 'about', 'alumni', 'blogs', 'faqs', 'upcoming-batches'].includes(pageId)) {
    schema.push(breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: base.title.replace(` | ${siteName}`, '').replace(' | DV Analytics', ''), path },
    ]));
  }

  return {
    title: base.title,
    description: base.description,
    canonical: absoluteUrl(path),
    image: absoluteUrl(base.image ?? defaultSocialImage),
    noindex: Boolean(base.noindex),
    schema,
  };
};

export const applySeoForPage = (pageId: string) => {
  const seo = getSeoForPage(pageId);
  document.title = seo.title;
  setOrCreateMeta('meta[name="description"]', { name: 'description', content: seo.description });
  setOrCreateMeta('meta[name="robots"]', {
    name: 'robots',
    content: seo.noindex ? 'noindex, nofollow' : 'index, follow',
  });
  setOrCreateLink('canonical', seo.canonical);

  setOrCreateMeta('meta[name="author"]', { name: 'author', content: 'DV Analytics' });
  setOrCreateMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName });
  setOrCreateMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });
  setOrCreateMeta('meta[property="og:locale:alternate"]', { property: 'og:locale:alternate', content: 'en_IN' });
  setOrCreateMeta('meta[property="og:type"]', {
    property: 'og:type',
    content: pageId.startsWith('blog-') ? 'article' : 'website',
  });
  setOrCreateMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
  setOrCreateMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
  setOrCreateMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonical });
  setOrCreateMeta('meta[property="og:image"]', { property: 'og:image', content: seo.image });
  setOrCreateMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: seo.title });

  setOrCreateMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  setOrCreateMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
  setOrCreateMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
  setOrCreateMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.image });

  replaceJsonLd(seo.schema);
};

export const sitemapRoutes = [
  '/',
  '/courses',
  ...courseCatalog.map((course) => `/courses/${courseSlugById[course.id] ?? course.id}`),
  '/services',
  ...Object.values(serviceSlugById).map((slug) => `/services/${slug}`),
  ...Object.values(seoLandingPageSlugById).map((slug) => `/${slug}`),
  '/who-we-are',
  '/meet-our-alumni',
  '/journal',
  ...blogMeta.map(getBlogPath),
  '/upcoming-batches',
  '/faqs',
];
