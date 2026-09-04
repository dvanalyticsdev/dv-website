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

  return `<meta
      name="description"
      content="${escapeAttribute(seo.description)}"
    />
    <meta name="robots" content="${seo.noindex ? 'noindex, nofollow' : 'index, follow'}" />
    <link rel="canonical" href="${escapeAttribute(seo.canonical)}" />
    <meta property="og:site_name" content="DV Analytics" />
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

const outputPathForRoute = (route) => {
  if (route === '/') return templatePath;
  return join(distDir, route.replace(/^\/+/, ''), 'index.html');
};

const generatedRoutes = [...sitemapRoutes, '/enroll', '/payment', '/404'];

for (const route of generatedRoutes) {
  const outputPath = outputPathForRoute(route);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, replaceSeoBlock(template, route));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((route) => `  <url><loc>https://www.dvanalyticsmds.com${route}</loc></url>`).join('\n')}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap);
