import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

const decodeKey = (encoded) => Buffer.from(encoded, 'base64').toString('utf8');
const HARDCODED_KEY_B64 = 'QVEuQWI4Uk42SzNTeGtVNF9wZC1XS0dkbjh1bTBRU1E3RkY0ZkJpU2tpVTNnNGhiNjdQM3c=';
const API_KEY = decodeKey(HARDCODED_KEY_B64);

async function getExistingBlogTitles() {
  const titles = [];
  try {
    const metaPath = join(rootDir, 'src', 'data', 'blogMeta.ts');
    const metaContent = await readFile(metaPath, 'utf8');
    const matches = [...metaContent.matchAll(/title:\s*"([^"]+)"/g)];
    matches.forEach((m) => titles.push(m[1]));
  } catch (err) {}

  try {
    const queuePath = join(rootDir, 'src', 'data', 'aiBlogQueue.ts');
    const queueContent = await readFile(queuePath, 'utf8');
    const matches = [...queueContent.matchAll(/"title":\s*"([^"]+)"/g)];
    matches.forEach((m) => titles.push(m[1]));
  } catch (err) {}

  return titles;
}

const getArg = (flag) => {
  const index = process.argv.indexOf(flag);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : null;
};

const isDirectPublish = process.argv.includes('--publish-direct');
const topicInput = getArg('--topic');

async function callGeminiApi() {
  const existingTitles = await getExistingBlogTitles();
  console.log(`\n📚 Loaded ${existingTitles.length} existing blog titles to enforce zero duplication...\n`);

  const prompt = `You are the lead tech strategist for "DV Editorial Team" at DV Analytics (leading institute for Data Science, AI, MLOps, Data Engineering, and Cybersecurity in Bangalore, Bhubaneswar, and Dubai).

Existing published and queued blog titles:
${existingTitles.slice(-15).map((t, i) => `${i + 1}. ${t}`).join('\n')}

STRICT REQUIREMENT:
Generate an in-depth, high-converting SEO blog post on a fresh, highly relevant market-trend topic in 2026.
DO NOT repeat or duplicate any of the titles or exact topic angles listed above.
Select a distinct theme from areas like: Agentic AI workflows, Generative AI in enterprise, AI-driven Cybersecurity, MLOps & Data Engineering trends, high-paying tech skills, Bangalore/Dubai job market outlook, or non-tech to AI career transition roadmaps.

${topicInput ? `User requested focus topic: "${topicInput}" (Ensure the angle is fresh and unique).` : 'Choose the single best trending, unique topic currently demanded in the 2026 tech job market.'}

Requirements:
- Author MUST be "DV Editorial Team".
- Audience: Freshers, graduates, non-tech career switchers, and working professionals.
- Return ONLY valid JSON matching this exact structure:
{
  "title": "Full Catchy Unique Headline",
  "excerpt": "Compelling 1-2 sentence meta description (150-160 chars max)",
  "readTime": "6 min read",
  "author": "DV Editorial Team",
  "sections": [
    {
      "heading": "Section Headline",
      "text": "Detailed paragraph 1...",
      "para2": "Detailed paragraph 2...",
      "para3": "Detailed paragraph 3...",
      "list": ["Key takeaway 1", "Key takeaway 2", "Key takeaway 3"]
    }
  ]
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty response received from Gemini API');
  return JSON.parse(rawText);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function formatDate(date) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

async function createCoverImage(slug, title) {
  const bgColors = ['#1b2a60', '#0f172a', '#1e1b4b', '#030712'];
  const chosenBg = bgColors[Math.floor(Math.random() * bgColors.length)];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${chosenBg}"/>
    <circle cx="1100" cy="100" r="300" fill="#3b82f6" opacity="0.15"/>
    <circle cx="100" cy="550" r="250" fill="#8b5cf6" opacity="0.15"/>
    <rect x="80" y="80" width="160" height="40" rx="8" fill="#2563eb"/>
    <text x="160" y="106" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">DV EDITORIAL</text>
    <text x="80" y="280" font-family="sans-serif" font-size="42" font-weight="bold" fill="#ffffff" width="1040">
      ${title.length > 55 ? title.slice(0, 55) + '...' : title}
    </text>
    <text x="80" y="350" font-family="sans-serif" font-size="24" fill="#94a3b8">Data Science • AI • Generative AI • Cybersecurity</text>
    <line x1="80" y1="450" x2="1120" y2="450" stroke="#334155" stroke-width="2"/>
    <text x="80" y="510" font-family="sans-serif" font-size="20" fill="#cbd5e1">www.dvanalyticsmds.com</text>
  </svg>`;

  const imagePath = join(rootDir, 'public', 'blogs', `${slug}.svg`);
  await writeFile(imagePath, svg, 'utf8');
  return `/blogs/${slug}.svg`;
}

try {
  const generated = await callGeminiApi();
  const slug = slugify(generated.title);
  const today = new Date();
  const dateStr = formatDate(today);
  const imageRelPath = await createCoverImage(slug, generated.title);

  const cleanSections = (generated.sections || []).map((sec) => {
    const cleaned = {
      heading: String(sec.heading || ''),
      text: String(sec.text || ''),
    };
    if (sec.para2) cleaned.para2 = String(sec.para2);
    if (sec.para3) cleaned.para3 = String(sec.para3);
    if (Array.isArray(sec.list) && sec.list.length > 0) cleaned.list = sec.list.map(String);
    if (sec.extra) cleaned.extra = String(sec.extra);
    return cleaned;
  });

  const queuePath = join(rootDir, 'src', 'data', 'aiBlogQueue.ts');
  let queueContent = await readFile(queuePath, 'utf8');

  const draftId = `ai-draft-${Date.now()}`;
  const queueItem = {
    id: draftId,
    slug,
    title: generated.title,
    excerpt: generated.excerpt,
    date: dateStr,
    author: 'DV Editorial Team',
    image: imageRelPath,
    readTime: generated.readTime || '6 min read',
    sections: cleanSections,
    status: isDirectPublish ? 'published' : 'pending',
    createdAt: today.toISOString(),
  };

  const formattedQueueItem = JSON.stringify(queueItem, null, 2);
  if (queueContent.includes('export const aiBlogQueue: AiQueueItem[] = [];')) {
    queueContent = queueContent.replace(
      'export const aiBlogQueue: AiQueueItem[] = [];',
      `export const aiBlogQueue: AiQueueItem[] = [\n${formattedQueueItem}\n];`
    );
  } else {
    queueContent = queueContent.replace(/\s*\];\s*$/, `,\n${formattedQueueItem}\n];`);
  }
  await writeFile(queuePath, queueContent, 'utf8');

  console.log(`✅ AI Draft Created cleanly in Staging Queue!`);
  console.log(`  - ID: ${draftId}`);
  console.log(`  - Title: ${generated.title}`);
  console.log(`  - Author: DV Editorial Team`);
  console.log(`  - Status: ${isDirectPublish ? 'Published' : 'Pending Approval in Admin Dashboard'}`);

  if (isDirectPublish) {
    execSync(`node --experimental-strip-types scripts/manage-ai-blog.mjs --action publish --id ${draftId}`, {
      cwd: rootDir,
      stdio: 'inherit',
    });
  } else {
    // Run TypeScript build check to ensure queue types pass cleanly
    execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
  }

  console.log(`\n🎉 Done! Staged in AI Queue. Admin can publish with 1 click in /admin.\n`);
} catch (error) {
  console.error('❌ Failed to generate AI blog:', error);
}
