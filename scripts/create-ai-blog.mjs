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
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
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
        if (attempt < 3 && (response.status === 503 || response.status === 429)) {
          console.warn(`⚠️ API response ${response.status}. Retrying attempt ${attempt + 1}/3 in 2s...`);
          await new Promise((res) => setTimeout(res, 2000));
          continue;
        }
        throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response received from Gemini API');
      return JSON.parse(rawText);
    } catch (err) {
      if (attempt === 3) throw err;
      console.warn(`⚠️ Attempt ${attempt} failed: ${err.message}. Retrying in 2s...`);
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
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

async function createCoverImage(slug) {
  const themes = [
    { bg: ['#0b0f19', '#111827'], accent1: '#3b82f6', accent2: '#06b6d4', mesh: '#60a5fa' },
    { bg: ['#0f172a', '#1e1b4b'], accent1: '#8b5cf6', accent2: '#ec4899', mesh: '#a78bfa' },
    { bg: ['#022c22', '#064e3b'], accent1: '#10b981', accent2: '#06b6d4', mesh: '#34d399' },
    { bg: ['#1e1b4b', '#311042'], accent1: '#f43f5e', accent2: '#8b5cf6', mesh: '#fb7185' },
    { bg: ['#030712', '#1e293b'], accent1: '#2563eb', accent2: '#38bdf8', mesh: '#818cf8' },
  ];

  const theme = themes[Math.floor(Math.random() * themes.length)];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bg[0]}"/>
        <stop offset="100%" stop-color="${theme.bg[1]}"/>
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${theme.accent1}"/>
        <stop offset="100%" stop-color="${theme.accent2}"/>
      </linearGradient>
      <radialGradient id="glow1" cx="80%" cy="20%" r="60%">
        <stop offset="0%" stop-color="${theme.accent1}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${theme.bg[0]}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="20%" cy="80%" r="50%">
        <stop offset="0%" stop-color="${theme.accent2}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${theme.bg[1]}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${theme.mesh}" stroke-width="1" opacity="0.08"/>
      </pattern>
    </defs>

    <!-- Background Base -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>

    <!-- Glowing Orbs -->
    <circle cx="950" cy="180" r="380" fill="url(#glow1)"/>
    <circle cx="250" cy="480" r="320" fill="url(#glow2)"/>

    <!-- Abstract Neural Connections -->
    <g opacity="0.25">
      <path d="M 100 500 Q 350 200 600 450 T 1100 150" fill="none" stroke="${theme.accent1}" stroke-width="4"/>
      <path d="M 150 150 Q 500 400 850 100 T 1150 480" fill="none" stroke="${theme.accent2}" stroke-width="3" stroke-dasharray="10,15"/>
    </g>

    <!-- Futuristic Layered Polygons -->
    <g stroke="url(#accentGrad)" stroke-width="2" fill="none" opacity="0.7">
      <polygon points="600,120 720,190 720,330 600,400 480,330 480,190" opacity="0.3"/>
      <polygon points="850,250 940,300 940,400 850,450 760,400 760,300" opacity="0.4"/>
      <polygon points="350,220 420,260 420,340 350,380 280,340 280,260" opacity="0.5"/>
    </g>

    <!-- Glowing Network Nodes -->
    <circle cx="600" cy="120" r="6" fill="${theme.accent1}"/>
    <circle cx="720" cy="190" r="8" fill="${theme.accent2}"/>
    <circle cx="480" cy="330" r="7" fill="${theme.mesh}"/>
    <circle cx="850" cy="250" r="8" fill="${theme.accent1}"/>
    <circle cx="350" cy="380" r="9" fill="${theme.accent2}"/>
    <circle cx="940" cy="400" r="6" fill="${theme.mesh}"/>

    <!-- Connecting Light Beams -->
    <line x1="600" y1="120" x2="720" y2="190" stroke="${theme.accent1}" stroke-width="2" opacity="0.6"/>
    <line x1="720" y1="190" x2="850" y2="250" stroke="${theme.accent2}" stroke-width="2" opacity="0.6"/>
    <line x1="480" y1="330" x2="350" y2="380" stroke="${theme.mesh}" stroke-width="2" opacity="0.6"/>
    <line x1="350" y1="220" x2="480" y2="190" stroke="${theme.accent1}" stroke-width="2" opacity="0.5"/>

    <!-- Abstract Wave Graphic Bottom -->
    <path d="M 0 520 C 300 460, 600 580, 900 500 C 1050 460, 1150 510, 1200 530 L 1200 630 L 0 630 Z" fill="url(#accentGrad)" opacity="0.15"/>
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
