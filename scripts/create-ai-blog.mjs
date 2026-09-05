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

  try {
    const res = await fetch('https://dvsynckv.dvanalytics-dev.workers.dev/');
    if (res.ok) {
      const state = await res.json();
      if (state && Array.isArray(state.customDrafts)) {
        state.customDrafts.forEach((c) => {
          if (c && c.title) titles.push(c.title);
        });
      }
    }
  } catch (err) {}

  return titles;
}

const getArg = (flag) => {
  const index = process.argv.indexOf(flag);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : null;
};

const isDirectPublish = process.argv.includes('--publish-direct');
const isForceRun = process.argv.includes('--force');
const topicInput = getArg('--topic');

async function checkGlobalAdminState() {
  if (isForceRun) return true;

  try {
    const res = await fetch('https://dvsynckv.dvanalytics-dev.workers.dev/');
    if (res.ok) {
      const state = await res.json();
      if (state && typeof state === 'object') {
        if (state.isAutoWriterActive === false) {
          console.log('⚪ Auto Generator is DISABLED in admin panel. Skipping creation.');
          process.exit(0);
        }

        const scheduledTime = state.scheduledTime || '14:00';
        const targetHour = parseInt(scheduledTime.split(':')[0], 10);

        const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const currentHourIST = nowIST.getHours();

        console.log(`🟢 Auto Generator ENABLED. Scheduled for ${scheduledTime} IST (Current IST hour: ${currentHourIST}:00).`);

        if (currentHourIST !== targetHour) {
          console.log(`⏰ Current IST hour (${currentHourIST}:00) does not match scheduled hour (${targetHour}:00). Skipping.`);
          process.exit(0);
        }
      }
    }
  } catch (err) {
    console.warn('⚠️ Could not fetch Cloudflare KV state, proceeding with default run.');
  }
}

await checkGlobalAdminState();

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

async function createCoverImage(slug, title = '') {
  const text = (slug + ' ' + title).toLowerCase();

  if (text.includes('cyber') || text.includes('security') || text.includes('firewall') || text.includes('defense') || text.includes('threat')) {
    const cyberPhotos = [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=630&q=80',
    ];
    return cyberPhotos[Math.floor(Math.random() * cyberPhotos.length)];
  }

  if (text.includes('agentic') || text.includes('agent') || text.includes('genai') || text.includes('generative') || text.includes('llm') || text.includes('ai engineer')) {
    const aiPhotos = [
      'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1675557009875-436f61181844?auto=format&fit=crop&w=1200&h=630&q=80',
    ];
    return aiPhotos[Math.floor(Math.random() * aiPhotos.length)];
  }

  if (text.includes('data') || text.includes('mlops') || text.includes('analytics') || text.includes('vector') || text.includes('rag')) {
    const dsPhotos = [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=630&q=80',
    ];
    return dsPhotos[Math.floor(Math.random() * dsPhotos.length)];
  }

  if (text.includes('bangalore') || text.includes('dubai') || text.includes('city') || text.includes('hyderabad') || text.includes('pune')) {
    const cityPhotos = [
      'https://images.unsplash.com/photo-1477959858617-67f30ac72604?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&h=630&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&h=630&q=80',
    ];
    return cityPhotos[Math.floor(Math.random() * cityPhotos.length)];
  }

  const careerPhotos = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&h=630&q=80',
  ];
  return careerPhotos[Math.floor(Math.random() * careerPhotos.length)];
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
