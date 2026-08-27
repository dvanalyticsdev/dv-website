export const courseSlugById: Record<string, string> = {
  apids: 'apids',
  apida: 'apida',
  specialist: 'data-analytics-specialist',
  aiml: 'aiml-gaa',
  genai: 'genai-agentic-ai',
  apcs: 'cybersecurity-forensics',
  days7_genai: '7-days-genai',
  fde: 'ai-forward-deployment-engineer',
  flp: 'flexi-learning-program',
};

const courseIdBySlug = Object.fromEntries(
  Object.entries(courseSlugById).map(([courseId, slug]) => [slug, courseId])
);

export const serviceSlugById: Record<string, string> = {
  'service-aics': 'ai-consulting-solutions',
  'service-ccs': 'corporate-consulting-services',
  'service-crhta': 'talent-augmentation',
};

const serviceIdBySlug = Object.fromEntries(
  Object.entries(serviceSlugById).map(([serviceId, slug]) => [slug, serviceId])
);

export const getPageFromPath = (pathname: string) => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const parts = normalizedPath.split('/').filter(Boolean);

  if (normalizedPath === '/') return 'home';
  if (normalizedPath === '/courses') return 'courses';
  if (parts[0] === 'courses' && parts[1]) return `course-${courseIdBySlug[parts[1]] ?? parts[1]}`;
  if (normalizedPath === '/services') return 'services';
  if (parts[0] === 'services' && parts[1]) return serviceIdBySlug[parts[1]] ?? `service-${parts[1]}`;
  if (normalizedPath === '/who-we-are') return 'about';
  if (normalizedPath === '/meet-our-alumni') return 'alumni';
  if (normalizedPath === '/journal') return 'blogs';
  if (normalizedPath === '/faqs') return 'faqs';
  if (normalizedPath === '/enroll') return 'enroll';
  if (parts[0] === 'enroll' && parts[1]) return `enroll-${courseIdBySlug[parts[1]] ?? parts[1]}`;

  return 'home';
};

export const getPathFromPage = (pageId: string) => {
  if (pageId === 'home') return '/';
  if (pageId === 'courses') return '/courses';
  if (pageId === 'services') return '/services';
  if (pageId === 'about') return '/who-we-are';
  if (pageId === 'alumni') return '/meet-our-alumni';
  if (pageId === 'blogs') return '/journal';
  if (pageId === 'faqs') return '/faqs';
  if (pageId === 'enroll') return '/enroll';

  if (pageId.startsWith('course-')) {
    const courseId = pageId.replace('course-', '');
    return `/courses/${courseSlugById[courseId] ?? courseId}`;
  }

  if (pageId.startsWith('enroll-')) {
    const courseId = pageId.replace('enroll-', '');
    return `/enroll/${courseSlugById[courseId] ?? courseId}`;
  }

  if (pageId.startsWith('service-')) {
    return `/services/${serviceSlugById[pageId] ?? pageId.replace('service-', '')}`;
  }

  return '/';
};
