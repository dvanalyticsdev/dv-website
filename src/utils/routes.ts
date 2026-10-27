import { seoLandingPages } from '../data/seoLandingPages.ts';

export const courseSlugById: Record<string, string> = {
  apids: 'apids',
  apida: 'apida',
  specialist: 'data-analytics-specialist',
  apcs: 'cybersecurity-forensics',
  fde: 'ai-forward-deployment-engineer',
  flp: 'flexi-learning-program',
};

const courseIdBySlug = Object.fromEntries(
  Object.entries(courseSlugById).map(([courseId, slug]) => [slug, courseId])
);

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const serviceSlugById: Record<string, string> = {
  'service-aics': 'ai-consulting-solutions',
  'service-ccs': 'corporate-consulting-services',
  'service-crhta': 'talent-augmentation',
};

const serviceIdBySlug = Object.fromEntries(
  Object.entries(serviceSlugById).map(([serviceId, slug]) => [slug, serviceId])
);

export const seoLandingPageSlugById: Record<string, string> = Object.fromEntries(
  seoLandingPages.map((page) => [page.id, page.slug])
);

const seoLandingPageIdBySlug = Object.fromEntries(
  Object.entries(seoLandingPageSlugById).map(([pageId, slug]) => [slug, pageId])
);

export const seoLandingPageRedirects: Record<string, string> = {
  // Data Science -> APIDS (/courses/apids/)
  'data-science-course-bangalore': '/courses/apids/',
  'data-science-course-bhubaneswar': '/courses/apids/',
  'data-science-course-india': '/courses/apids/',
  'data-science-course-online': '/courses/apids/',
  'data-science-course-with-placement': '/courses/apids/',
  'ai-course-india': '/courses/apids/',
  'ai-course-bangalore': '/courses/apids/',
  'ai-course-bhubaneswar': '/courses/apids/',
  'ai-course-for-freshers': '/courses/apids/',
  'ai-course-for-working-professionals': '/courses/apids/',

  // Data Analytics -> DAS (/courses/data-analytics-specialist/)
  'data-analytics-course-bangalore': '/courses/data-analytics-specialist/',
  'data-analytics-course-bhubaneswar': '/courses/data-analytics-specialist/',
  'data-analytics-course-india': '/courses/data-analytics-specialist/',
  'data-analytics-course-online': '/courses/data-analytics-specialist/',
  'data-analytics-course-karnataka': '/courses/data-analytics-specialist/',
  'data-analytics-course-odisha': '/courses/data-analytics-specialist/',
  'data-analytics-course-fees': '/courses/data-analytics-specialist/',

  // Data Analytics + Gen AI -> APIDA (/courses/apida/)
  'generative-ai-data-analytics-course-bhubaneswar': '/courses/apida/',

  // Forward Deployment Engineer (FDE) & GenAI / Agentic AI -> FDE (/courses/ai-forward-deployment-engineer/)
  'forward-deployment-engineer-course-india': '/courses/ai-forward-deployment-engineer/',
  'forward-deployment-engineer-course-bangalore': '/courses/ai-forward-deployment-engineer/',
  'forward-deployment-engineer-course-bhubaneswar': '/courses/ai-forward-deployment-engineer/',
  'generative-ai-course': '/courses/ai-forward-deployment-engineer/',
  'generative-ai-course-india': '/courses/ai-forward-deployment-engineer/',
  'generative-ai-course-bangalore': '/courses/ai-forward-deployment-engineer/',
  'generative-ai-course-bhubaneswar': '/courses/ai-forward-deployment-engineer/',
  'agentic-ai-course': '/courses/ai-forward-deployment-engineer/',
  'agentic-ai-course-india': '/courses/ai-forward-deployment-engineer/',
  'agentic-ai-course-bangalore': '/courses/ai-forward-deployment-engineer/',

  // Cybersecurity -> APCF (/courses/cybersecurity-forensics/)
  'cybersecurity-course': '/courses/cybersecurity-forensics/',
  'cybersecurity-course-india': '/courses/cybersecurity-forensics/',
  'cybersecurity-course-bangalore': '/courses/cybersecurity-forensics/',
  'cybersecurity-course-bhubaneswar': '/courses/cybersecurity-forensics/',
};

const legacyPageAliases: Record<string, string> = {
  '/home': 'home',
  '/about': 'about',
  '/about-us': 'about',
  '/alumni': 'alumni',
  '/blogs': 'blogs',
  '/blog': 'blogs',
  '/faq': 'faqs',
};

export const getPageFromPath = (pathname: string): string => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const parts = normalizedPath.split('/').filter(Boolean);

  if (normalizedPath === '/') return 'home';
  if (legacyPageAliases[normalizedPath]) return legacyPageAliases[normalizedPath];
  if (normalizedPath === '/courses') return 'courses';
  if (parts[0] === 'courses' && parts[1]) return courseIdBySlug[parts[1]] ? `course-${courseIdBySlug[parts[1]]}` : 'not-found';
  if (normalizedPath === '/services') return 'services';
  if (parts[0] === 'services' && parts[1]) return serviceIdBySlug[parts[1]] ?? `service-${parts[1]}`;
  if (normalizedPath === '/who-we-are') return 'about';
  if (normalizedPath === '/meet-our-alumni') return 'alumni';
  if (normalizedPath === '/journal') return 'blogs';
  if (parts[0] === 'journal' && parts[1]) return `blog-${parts[1]}`;
  if (normalizedPath === '/faqs') return 'faqs';
  if (normalizedPath === '/enroll') return 'enroll';
  if (parts[0] === 'enroll' && parts[1]) return courseIdBySlug[parts[1]] ? `enroll-${courseIdBySlug[parts[1]]}` : 'enroll';
  if (normalizedPath === '/payment' || normalizedPath === '/payment/index.php') return 'payment';
  if (normalizedPath === '/upcoming-batches') return 'upcoming-batches';
  if (normalizedPath === '/apply-job' || normalizedPath === '/jobs' || normalizedPath === '/careers') return 'apply-job';
  if (normalizedPath === '/workshop/fde' || normalizedPath === '/workshop/fde/') return 'workshop-fde';
  if (normalizedPath === '/lp/apids' || normalizedPath === '/lp/apids/') return 'lp-apids';
  if (normalizedPath === '/lp/apida' || normalizedPath === '/lp/apida/') return 'lp-apida';
  if (normalizedPath === '/lp/fde' || normalizedPath === '/lp/fde/') return 'lp-fde';
  if (normalizedPath === '/dashboard' || normalizedPath === '/tracking' || normalizedPath === '/tracking-dashboard' || normalizedPath === '/admin/dashboard') return 'dashboard';
  if (parts[0] && seoLandingPageRedirects[parts[0]]) return getPageFromPath(seoLandingPageRedirects[parts[0]]);
  if (parts[0] && seoLandingPageIdBySlug[parts[0]]) return seoLandingPageIdBySlug[parts[0]];

  return 'not-found';
};

export const getPathFromPage = (pageId: string) => {
  if (pageId === 'home') return '/';
  if (pageId === 'courses') return '/courses/';
  if (pageId === 'services') return '/services/';
  if (pageId === 'about') return '/who-we-are/';
  if (pageId === 'alumni') return '/meet-our-alumni/';
  if (pageId === 'blogs') return '/journal/';
  if (pageId === 'faqs') return '/faqs/';
  if (pageId === 'enroll') return '/enroll';
  if (pageId === 'payment') return '/payment';
  if (pageId === 'upcoming-batches') return '/upcoming-batches/';
  if (pageId === 'apply-job') return '/apply-job/';
  if (pageId === 'workshop-fde') return '/workshop/fde/';
  if (pageId === 'lp-apids') return '/lp/apids/';
  if (pageId === 'lp-apida') return '/lp/apida/';
  if (pageId === 'lp-fde') return '/lp/fde/';
  if (pageId === 'dashboard') return '/dashboard';
  if (pageId === 'not-found') return '/404';

  if (pageId.startsWith('course-')) {
    const courseId = pageId.replace('course-', '');
    return `/courses/${courseSlugById[courseId] ?? courseId}/`;
  }

  if (pageId.startsWith('enroll-')) {
    const courseId = pageId.replace('enroll-', '');
    return `/enroll/${courseSlugById[courseId] ?? courseId}`;
  }

  if (pageId.startsWith('service-')) {
    return `/services/${serviceSlugById[pageId] ?? pageId.replace('service-', '')}/`;
  }

  if (pageId.startsWith('blog-')) {
    return `/journal/${pageId.replace('blog-', '')}/`;
  }

  if (pageId.startsWith('lp-')) {
    const slug = seoLandingPageSlugById[pageId] ?? pageId.replace('lp-', '');
    if (seoLandingPageRedirects[slug]) {
      return seoLandingPageRedirects[slug];
    }
    return `/${slug}/`;
  }

  return '/';
};
