import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPageFromPath } from '../src/utils/routes.ts';
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

const analyticsBlock = `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-827GCWFLV6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-827GCWFLV6', { send_page_view: false });
    </script>`;

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
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(seo.title)}" />
    <meta
      name="twitter:description"
      content="${escapeAttribute(seo.description)}"
    />
    <meta name="twitter:image" content="${escapeAttribute(seo.image)}" />
    ${analyticsBlock}
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

const generatedRoutes = [...sitemapRoutes, '/enroll', '/payment', '/404'];

for (const route of generatedRoutes) {
  const outputPath = outputPathForRoute(route);
  await mkdir(dirname(outputPath), { recursive: true });
  const htmlWithSeo = replaceSeoBlock(template, route);
  const finalHtml = replaceBodyContent(htmlWithSeo, route);
  await writeFile(outputPath, finalHtml);
}

const getRoutePriorityAndFreq = (route) => {
  if (route === '/') return { priority: '1.0', changefreq: 'daily' };
  if (route.startsWith('/courses')) return { priority: '0.9', changefreq: 'weekly' };
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
