import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPageFromPath, seoLandingPageRedirects } from '../src/utils/routes.ts';
import { getSeoForPage, sitemapRoutes } from '../src/utils/seo.ts';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(rootDir, 'dist');
const templatePath = join(distDir, 'index.html');
const template = await readFile(templatePath, 'utf8');

const escapeAttribute = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const seoBlock = (route) => {
  const pageId = getPageFromPath(route);
  const seo = getSeoForPage(pageId);
  const schema = JSON.stringify(seo.schema ?? []).replace(/</g, '\\u003c');

  return `<meta name="author" content="DV Analytics" />
    <meta
      name="description"
      content="${escapeAttribute(seo.description)}"
    />
    <meta name="robots" content="${seo.noindex ? 'noindex, nofollow' : 'index, follow'}" />
    <meta name="google-site-verification" content="-On92TrUA9oamrrzDhSeJIIU1u6N7ynhzljeUFU" />
    <link rel="canonical" href="${escapeAttribute(seo.canonical)}" />
    <meta property="og:site_name" content="DV Analytics" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="en_IN" />
    <meta property="og:type" content="${pageId.startsWith('blog-') ? 'article' : 'website'}" />
    <meta property="og:title" content="${escapeAttribute(seo.title)}" />
    <meta
      property="og:description"
      content="${escapeAttribute(seo.description)}"
    />
    <meta property="og:url" content="${escapeAttribute(seo.canonical)}" />
    <meta property="og:image" content="${escapeAttribute(seo.image)}" />
    <meta property="og:image:alt" content="${escapeAttribute(seo.title)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(seo.title)}" />
    <meta
      name="twitter:description"
      content="${escapeAttribute(seo.description)}"
    />
    <meta name="twitter:image" content="${escapeAttribute(seo.image)}" />
    <meta name="twitter:image:alt" content="${escapeAttribute(seo.title)}" />
    <script type="application/ld+json">${schema}</script>
    <title>${escapeAttribute(seo.title)}</title>`;
};

const replaceSeoBlock = (html, route) =>
  html.replace(
    /<meta\s+name="description"[\s\S]*?<title>[\s\S]*?<\/title>/,
    seoBlock(route)
  );

const replaceBodyContent = (html, route) => {
  const pageId = getPageFromPath(route);
  const seo = getSeoForPage(pageId);
  const noscriptHtml = `<noscript><div style="padding:2rem;font-family:sans-serif;"><h1>${escapeAttribute(
    seo.title
  )}</h1><p>${escapeAttribute(seo.description)}</p></div></noscript>`;
  return html.replace('<div id="root"></div>', `<div id="root">${noscriptHtml}</div>`);
};

const outputPathForRoute = (route) => {
  if (route === '/') return templatePath;
  return join(distDir, route.replace(/^\/+/, ''), 'index.html');
};

const generatedRoutes = [...sitemapRoutes, '/enroll', '/payment', '/404', '/workshop/fde', '/lp/apids', '/lp/apida', '/lp/fde'];

for (const route of generatedRoutes) {
  const outputPath = outputPathForRoute(route);
  await mkdir(dirname(outputPath), { recursive: true });
  const htmlWithSeo = replaceSeoBlock(template, route);
  const finalHtml = replaceBodyContent(htmlWithSeo, route);
  await writeFile(outputPath, finalHtml);
}

for (const [slug, targetUrl] of Object.entries(seoLandingPageRedirects)) {
  const outputPath = join(distDir, slug, 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NFB3LVLT');</script>
  <!-- End Google Tag Manager -->
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="https://www.dvanalyticsmds.com${targetUrl}">
  <title>Redirecting to DV Analytics...</title>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NFB3LVLT"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <p>Redirecting to <a href="${targetUrl}">DV Analytics Course Page</a>...</p>
  <script>window.location.replace('${targetUrl}');</script>
</body>
</html>`;
  await writeFile(outputPath, redirectHtml);
}

const getRoutePriorityAndFreq = (route) => {
  if (route === '/') return { priority: '1.0', changefreq: 'daily' };
  if (route.startsWith('/upcoming-batches')) return { priority: '0.9', changefreq: 'daily' };
  if (route.startsWith('/courses') || route.startsWith('/lp')) return { priority: '0.9', changefreq: 'weekly' };
  if (route.startsWith('/journal')) return { priority: '0.8', changefreq: 'weekly' };
  if (route.startsWith('/services')) return { priority: '0.8', changefreq: 'monthly' };
  return { priority: '0.6', changefreq: 'monthly' };
};

const todayIso = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map((route) => {
    const { priority, changefreq } = getRoutePriorityAndFreq(route);
    return `  <url>
    <loc>https://www.dvanalyticsmds.com${route}</loc>
    <lastmod>${todayIso}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap);
