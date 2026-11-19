import { blogIdBySlug, blogMeta, blogSlugById, type BlogMeta } from '../data/blogMeta.ts';
import { courseCatalog } from '../data/courseMeta.ts';
import { seoLandingPages } from '../data/seoLandingPages.ts';
import { getPathFromPage, serviceSlugById } from './routes.ts';

export const siteUrl = 'https://dvanalyticsmds.com';
export const siteName = 'DV Analytics';
export const defaultSocialImage = '/logo.png';

export { blogIdBySlug, blogSlugById };

export const getBlogPath = (blog: BlogMeta) => `/journal/${blog.slug}/`;

export const routePathByPageId = (pageId: string) => {
  if (pageId.startsWith('blog-')) {
    const value = pageId.replace('blog-', '');
    const blogId = blogIdBySlug[value] ?? value;
    const blog = blogMeta.find((item) => item.id === blogId);
    return blog ? getBlogPath(blog) : `/journal/${value}`;
  }

  return getPathFromPage(pageId);
};

const truncate = (value: string, maxLength = 220) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3).replace(/\s+\S*$/, '')}...`;
};

const formatSeoTitle = (title: string, suffix = siteName, maxLength = 70) => {
  const normalized = title.replace(/\s+/g, ' ').trim();
  const withSuffix = `${normalized} | ${suffix}`;
  if (withSuffix.length <= maxLength) return withSuffix;
  if (normalized.length <= maxLength) return normalized;
  return truncate(normalized, maxLength);
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
  specialist: '/courses-poster/DAS.png',
  apcs: '/courses-poster/APCF.png',
  fde: '/courses-poster/ai-forward-deployment-engineer.png',
  flp: '/courses-poster/FLP.png',
};

const courseSearchFocusById: Record<string, string[]> = {
  apids: ['Industrial Data Science', 'AI Deployment', 'Machine Learning', 'Generative AI', 'MLOps'],
  apida: ['Industrial Data Science', 'Generative AI', 'Data Analytics', 'Business Intelligence', 'SQL', 'Python'],
  specialist: ['Data Analytics', 'Excel AI', 'SQL', 'Python', 'Power BI', 'Tableau'],
  apcs: ['Cybersecurity', 'Ethical Hacking', 'SOC', 'SIEM', 'Digital Forensics', 'AI Integrated Security'],
  fde: ['Forward Deployment Engineering', 'AI Solutions', 'GenAI Applications', 'RAG', 'APIs', 'Cloud Deployment'],
  flp: ['Data Science', 'Artificial Intelligence', 'Self-Paced Learning', 'Python', 'Machine Learning'],
};

const courseTitleById: Record<string, string> = {
  apids: 'Industrial Data Science with AI Deployment Course (APIDS)',
  apida: 'Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA)',
  specialist: 'Data Analytics Specialist Course (DAS)',
  apcs: 'AI Integrated Cybersecurity & Forensics Course (APCF)',
  fde: 'AI Forward Deployment Engineer Course (FDE)',
  flp: 'Flexi Data Science & AI Program (FLP)',
};

const courseSeoOverrides: Record<string, { title?: string; description?: string }> = {
  fde: {
    title: 'AI Forward Deployment Engineer (FDE) Course | DV Analytics',
    description:
      'Join the AI Forward Deployment Engineer (FDE) course at DV Analytics. Learn Python, Generative AI, LLMs, RAG, AI Agents and cloud deployment through practical projects.',
  },
  apcs: {
    title: 'Cybersecurity & Ethical Hacking Course | DV Analytics',
    description:
      "Join DV Analytics' Cybersecurity and Forensics Course. Learn ethical hacking, digital forensics, network security and AI security tools with practical training.",
  },
  specialist: {
    title: 'Data Analytics Specialist Program with Placement | DV Analytics',
    description:
      'Join the Data Analytics Specialist program at DV Analytics. Learn SQL, Python, Excel, Power BI and Tableau through practical training with placement assistance.',
  },
  apids: {
    title: 'Advanced Industrial Data Science & AI Course | DV Analytics',
    description:
      "Join DV Analytics' Industrial Data Science course to learn Python, AL, ML, Gen AI, LLMs and AI deployment with practical training and placement support.",
  },
};

const courseSeoById: Record<string, { name: string; title: string; description: string; duration: string; topics: string[] }> = Object.fromEntries(
  courseCatalog.map((course) => {
    const override = courseSeoOverrides[course.id];
    return [
      course.id,
      {
        name: course.label,
        title: override?.title ?? formatSeoTitle(courseTitleById[course.id] ?? course.label),
        description:
          override?.description ??
          `${course.label} at DV Analytics covers real projects, mentor support, placement preparation, transparent fees, EMI options, and certification.`,
        duration: course.category === 'self-paced' ? 'Self-paced' : 'Live training program',
        topics: courseSearchFocusById[course.id] ?? ['Data Science', 'AI', 'Analytics'],
      },
    ];
  })
);

const basePages: Record<string, { title: string; description: string; image?: string; noindex?: boolean }> = {
  home: {
    title: 'Data Science Course with Placement | AI, ML & FDE Training',
    description:
      'DV Analytics is the leading Data Science Institute in India, offers Data Science & Analytics, AI, ML, FDE and Generative AI courses with placement assistance.',
    image: '/hero-mobile-bg.png',
  },
  courses: {
    title: 'Data Science, AI, FDE & Cybersecurity Courses | DV Analytics',
    description:
      'Compare live programs in Data Science, Data Analytics, AI, GenAI, Agentic AI, FDE and Cybersecurity with fees, syllabus and batches.',
    image: '/courses-poster/APIDS.png',
  },
  services: {
    title: 'Enterprise AI Consulting & Talent Services | DV Analytics',
    description:
      'AI consulting, corporate training, analytics solutions, and talent augmentation services for teams building practical data and AI capabilities.',
    image: '/services-hero-bg.jpg',
  },
  about: {
    title: 'Who We Are | DV Analytics Reviews & Leadership',
    description:
      'Learn about DV Analytics, its leadership, student reviews, analytics expertise, and practical AI education in Bangalore and Bhubaneswar.',
    image: '/about-hero-bg.jpg',
  },
  alumni: {
    title: 'Alumni Placement Success Stories & Reviews | DV Analytics',
    description:
      'Meet DV Analytics alumni who got placed across top tech companies in data analytics, data science, AI, cybersecurity, and technology roles.',
    image: '/companies-banner.jpg',
  },
  blogs: {
    title: 'Data Science, AI & Career Journal | DV Analytics',
    description:
      'Read DV Analytics articles on data science careers, AI skills, GenAI, Agentic AI, cybersecurity, analytics jobs, portfolios, and learning roadmaps.',
    image: '/journal-main-bg.png',
  },
  faqs: {
    title: 'Data Science & AI Course FAQs | Course Fees, Placements & Reviews',
    description:
      'Answers to common questions about DV Analytics course fees, 100% placement assistance, eligibility, projects, LMS access, certifications & reviews.',
    image: '/logo.png',
  },
  enroll: {
    title: 'Enroll in DV Analytics Programs | Reserve Your Seat',
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
    title: 'Upcoming Batches | Data Science, Analytics, AI & FDE',
    description: 'Explore upcoming Data Science, Data Analytics, AI, GenAI and Forward Deployment Engineering batches at DV Analytics.',
  },
  'apply-job': {
    title: 'Apply for Jobs | Careers & Placement Portal | DV Analytics',
    description: 'Explore current career opportunities and apply for positions that match your skills. Verify your LMS ID to submit your job application.',
  },
  'workshop-fde': {
    title: 'AI Forward Deployment Engineer Workshop | DV Analytics',
    description: 'Register for the exclusive 2-hour AI Forward Deployment Engineer (FDE) live workshop. Learn LLMs, RAG, AI Agents and production cloud deployment.',
    image: '/fde-workshop-banner.png',
    noindex: true,
  },
  'lp-apids': {
    title: 'Industrial Data Science & AI Program (APIDS) | DV Analytics',
    description:
      'Master Industrial Data Science with Cloud AI Deployment. Classroom training in Bangalore & Bhubaneswar + Live Online Pan-India. 100% Placement Support.',
    image: '/courses-poster/APIDS.png',
    noindex: true,
  },
  'lp-apida': {
    title: 'Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) | DV Analytics',
    description:
      'Master Industrial Data Analytics, Power BI, SQL, Predictive Analytics & Business Intelligence with Live Mentorship and Placement Support.',
    image: '/apida-training-banner.png',
    noindex: true,
  },
  'lp-fde': {
    title: 'Master Program in AI Forward Deployment Engineer (FDE) | DV Analytics',
    description:
      'Master AI deployment, system integration, automation, and real-world implementation of intelligent solutions. Live Online & Classroom Training.',
    image: '/fde-training-banner.png',
    noindex: true,
  },
  'lp-apida-thank-you': {
    title: 'Thank You for Registering - APIDA | DV Analytics',
    description: "You're all set! Your registration for the Advance Program in Industrial Data Analytics with Gen AI & Agentic AI (APIDA) has been received. Our career advisor will reach out shortly.",
    image: '/apida-training-banner.png',
    noindex: true,
  },
  'lp-apids-thank-you': {
    title: 'Thank You for Registering - APIDS | DV Analytics',
    description: "You're all set! Your registration for the Advanced Program in Industrial Data Science with AI Deployment (APIDS) has been received.",
    image: '/courses-poster/APIDS.png',
    noindex: true,
  },
  'lp-fde-thank-you': {
    title: 'Thank You for Registering - FDE | DV Analytics',
    description: "You're all set! Your registration for the Master Program in AI Forward Deployment Engineer (FDE) has been received.",
    image: '/fde-training-banner.png',
    noindex: true,
  },
  'lp-thank-you': {
    title: 'Thank You for Registering | DV Analytics',
    description: "You're all set! Your registration request has been received. Our career advisor will reach out shortly.",
    image: '/apida-training-banner.png',
    noindex: true,
  },
  dashboard: {
    title: 'Submission tracking | DV Analytics',
    description: 'Internal real-time form submission tracking and lead analytics dashboard.',
    image: '/logo-crop.png',
    noindex: true,
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
  document.head
    .querySelectorAll('script[type="application/ld+json"], script[data-seo-json-ld="true"]')
    .forEach((element) => element.remove());
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
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: absoluteUrl('/logo.png'),
  email: 'info@dvanalyticsmds.com',
  telephone: '+91-8095881188',
  sameAs: [
    'https://www.linkedin.com/company/dvanalytics/',
    'https://www.youtube.com/@dvanalytics',
    'https://www.facebook.com/dvanalytics',
    'https://www.instagram.com/dvanalytics/',
  ],
  areaServed: ['India', 'United Arab Emirates', 'Global'],
  knowsAbout: ['Data Science', 'Data Analytics', 'Generative AI', 'Agentic AI', 'Cybersecurity', 'AI Engineering'],
  address: [
    { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' },
    { '@type': 'PostalAddress', addressLocality: 'Bhubaneswar', addressRegion: 'Odisha', addressCountry: 'IN' },
    { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
};

const webPageSchema = (
  name: string,
  description: string,
  path: string,
  pageType: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' = 'WebPage',
  extra: Record<string, unknown> = {}
) => ({
  '@context': 'https://schema.org',
  '@type': pageType,
  '@id': `${absoluteUrl(path)}#webpage`,
  name,
  description: truncate(description, 300),
  url: absoluteUrl(path),
  inLanguage: 'en',
  isPartOf: {
    '@id': `${siteUrl}/#website`,
  },
  ...extra,
});

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
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
  },
});

export interface VerifiedProductOffer {
  name: string;
  description: string;
  path: string;
  image?: string;
  price: string | number;
  priceCurrency?: string;
  availability?: string;
}

export const buildProductOfferSchema = (offerData: VerifiedProductOffer) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: offerData.name,
  description: truncate(offerData.description, 300),
  image: absoluteUrl(offerData.image ?? defaultSocialImage),
  brand: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
  },
  offers: {
    '@type': 'Offer',
    url: absoluteUrl(offerData.path),
    priceCurrency: offerData.priceCurrency ?? 'INR',
    price: String(offerData.price),
    availability: offerData.availability ?? 'https://schema.org/InStock',
  },
});

export const getSeoForPage = (pageId: string) => {
  const path = routePathByPageId(pageId);

  // 1. Homepage -> Organization + WebSite + WebPage
  if (pageId === 'home') {
    const homeBase = basePages.home;
    const schema: unknown[] = [
      organizationSchema,
      websiteSchema,
      webPageSchema(homeBase.title, homeBase.description, path, 'WebPage'),
    ];

    return {
      title: homeBase.title,
      description: homeBase.description,
      canonical: absoluteUrl(path),
      image: absoluteUrl(homeBase.image ?? defaultSocialImage),
      noindex: false,
      schema,
    };
  }

  // 2. Course pages -> CollectionPage + BreadcrumbList
  if (pageId.startsWith('course-')) {
    const courseId = pageId.replace('course-', '');
    const course = courseSeoById[courseId];
    if (course) {
      const schema: unknown[] = [
        webPageSchema(course.title, course.description, path, 'CollectionPage', {
          about: course.topics,
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses/' },
          { name: course.name, path },
        ]),
      ];

      return {
        title: course.title,
        description: truncate(course.description),
        canonical: absoluteUrl(path),
        image: absoluteUrl(coursePosterById[courseId] ?? defaultSocialImage),
        noindex: false,
        schema,
      };
    }
  }

  if (pageId === 'courses') {
    const coursesBase = basePages.courses;
    const schema: unknown[] = [
      webPageSchema(coursesBase.title, coursesBase.description, path, 'CollectionPage', {
        hasPart: courseCatalog.map((course) => ({
          '@type': 'WebPage',
          name: course.label,
          url: absoluteUrl(getPathFromPage(`course-${course.id}`)),
        })),
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Courses', path },
      ]),
    ];

    return {
      title: coursesBase.title,
      description: coursesBase.description,
      canonical: absoluteUrl(path),
      image: absoluteUrl(coursesBase.image ?? defaultSocialImage),
      noindex: false,
      schema,
    };
  }

  // 3. Blog posts -> Article + WebPage + BreadcrumbList
  if (pageId.startsWith('blog-')) {
    const value = pageId.replace('blog-', '');
    const blogId = blogIdBySlug[value] ?? value;
    const blog = blogMeta.find((item) => item.id === blogId);
    if (blog) {
      const blogPath = getBlogPath(blog);
      const formattedTitle = formatSeoTitle(blog.title, 'DV Analytics Journal');
      const schema: unknown[] = [
        articleSchema(blog, blogPath),
        webPageSchema(formattedTitle, blog.excerpt, blogPath, 'WebPage'),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/journal/' },
          { name: blog.title, path: blogPath },
        ]),
      ];
      return {
        title: formattedTitle,
        description: truncate(blog.excerpt),
        canonical: absoluteUrl(blogPath),
        image: absoluteUrl(blog.image),
        noindex: false,
        schema,
      };
    }
  }

  // 4. About Us -> AboutPage + BreadcrumbList
  if (pageId === 'about') {
    const aboutBase = basePages.about;
    const schema: unknown[] = [
      webPageSchema(aboutBase.title, aboutBase.description, path, 'AboutPage'),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Who We Are', path },
      ]),
    ];
    return {
      title: aboutBase.title,
      description: aboutBase.description,
      canonical: absoluteUrl(path),
      image: absoluteUrl(aboutBase.image ?? defaultSocialImage),
      noindex: false,
      schema,
    };
  }

  // 5. Contact Us / Enrollment -> ContactPage + BreadcrumbList
  if (pageId.startsWith('enroll') || pageId === 'contact') {
    const courseId = pageId.startsWith('enroll-') ? pageId.replace('enroll-', '') : '';
    const course = courseId ? courseSeoById[courseId] : undefined;
    const courseShortTitle = courseId ? (courseTitleById[courseId] ?? course?.name ?? '') : '';
    const enrollTitle = courseShortTitle
      ? formatSeoTitle(`Enroll in ${courseShortTitle}`, siteName)
      : (basePages['enroll']?.title ?? 'Enroll in DV Analytics Programs | Reserve Your Seat');
    const enrollDesc = course
      ? `Enroll in ${course.name} at DV Analytics. Reserve your seat for upcoming batches with 1-on-1 mentorship and full placement support.`
      : (basePages['enroll']?.description ?? 'Start your admission inquiry for DV Analytics Data Science, AI, GenAI, Cybersecurity, and analytics career programs.');

    const schema: unknown[] = [
      webPageSchema(enrollTitle, enrollDesc, path, 'ContactPage'),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        ...(course && courseId ? [{ name: 'Courses', path: '/courses/' }, { name: course.name, path: getPathFromPage(`course-${courseId}`) }] : []),
        { name: 'Contact & Enrollment', path },
      ]),
    ];

    return {
      title: enrollTitle,
      description: truncate(enrollDesc),
      canonical: absoluteUrl(path),
      image: absoluteUrl(courseId && coursePosterById[courseId] ? coursePosterById[courseId] : defaultSocialImage),
      noindex: true,
      schema,
    };
  }

  // 6. Services detail pages -> WebPage + BreadcrumbList
  if (pageId.startsWith('service-')) {
    const title = serviceTitles[pageId] ?? 'Enterprise AI Service';
    const description = truncate(
      `${title} from DV Analytics for enterprise AI, analytics, consulting, training, and talent transformation programs.`
    );
    const schema: unknown[] = [
      webPageSchema(`${title} | DV Analytics`, description, path, 'WebPage'),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services/' },
        { name: title, path },
      ]),
    ];
    return {
      title: `${title} | DV Analytics`,
      description,
      canonical: absoluteUrl(path),
      image: absoluteUrl('/services-hero-bg.jpg'),
      noindex: false,
      schema,
    };
  }

  // 7. SEO & Location landing pages -> WebPage + BreadcrumbList
  if (pageId.startsWith('lp-')) {
    const landingPage = seoLandingPages.find((page) => page.id === pageId);
    if (landingPage) {
      const schema: unknown[] = [
        webPageSchema(landingPage.title, landingPage.description, path, 'WebPage', {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: absoluteUrl(landingPage.image),
          },
          about: landingPage.bullets,
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: landingPage.heading, path },
        ]),
      ];
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

  // 8. Other landing pages -> WebPage + BreadcrumbList
  const base = basePages[pageId] ?? basePages['not-found'];
  const cleanCrumbName = base.title.replace(` | ${siteName}`, '').replace(' | DV Analytics', '');
  const schema: unknown[] = [
    webPageSchema(base.title, base.description, path, 'WebPage'),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: cleanCrumbName, path },
    ]),
  ];

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
  setOrCreateMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
  setOrCreateMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });

  setOrCreateMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  setOrCreateMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
  setOrCreateMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
  setOrCreateMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.image });
  setOrCreateMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: seo.title });

  replaceJsonLd(seo.schema);
};

export const sitemapRoutes = [
  '/data-analytics-course-bangalore/',
  '/data-analytics-course-bhubaneswar/',
  '/data-science-course-bangalore/',
  '/data-science-course-bhubaneswar/',

  getPathFromPage('home'),
  getPathFromPage('courses'),
  ...courseCatalog.map((course) => getPathFromPage(`course-${course.id}`)),
  getPathFromPage('services'),
  ...Object.keys(serviceSlugById).map(getPathFromPage),
  getPathFromPage('about'),
  getPathFromPage('alumni'),
  getPathFromPage('blogs'),
  ...blogMeta.map(getBlogPath),
  getPathFromPage('upcoming-batches'),
  getPathFromPage('apply-job'),
  getPathFromPage('faqs'),
];
