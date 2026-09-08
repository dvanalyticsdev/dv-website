import { getPageFromPath } from '../src/utils/routes.ts';
import { getSeoForPage, sitemapRoutes } from '../src/utils/seo.ts';

const errors = [];
const warnings = [];

const normalizeRoute = (route) => route.replace(/\/+$/, '') || '/';
const uniqueRoutes = new Set();

for (const route of sitemapRoutes) {
  if (uniqueRoutes.has(route)) {
    errors.push(`Duplicate sitemap route: ${route}`);
  }
  uniqueRoutes.add(route);

  const pageId = getPageFromPath(route);
  if (pageId === 'not-found') {
    errors.push(`Sitemap route resolves to not-found: ${route}`);
    continue;
  }

  const seo = getSeoForPage(pageId);
  const canonicalPath = new URL(seo.canonical).pathname;
  if (normalizeRoute(canonicalPath) !== normalizeRoute(route)) {
    errors.push(`Canonical mismatch for ${route}: ${seo.canonical}`);
  }

  if (!seo.title || seo.title.length < 20) {
    errors.push(`Missing or very short title for ${route}`);
  }
  if (seo.title.length > 70) {
    warnings.push(`Long title (${seo.title.length}) for ${route}: ${seo.title}`);
  }
  if (!seo.description || seo.description.length < 50) {
    errors.push(`Missing or very short description for ${route}`);
  }
  if (seo.description.length > 160) {
    warnings.push(`Long description (${seo.description.length}) for ${route}`);
  }
  if (!Array.isArray(seo.schema) || seo.schema.length === 0) {
    errors.push(`Missing schema for ${route}`);
  }
}

console.log(`Audited ${sitemapRoutes.length} sitemap routes.`);

if (warnings.length) {
  console.warn('\nSEO warnings:');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (errors.length) {
  console.error('\nSEO errors:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO audit passed.');
