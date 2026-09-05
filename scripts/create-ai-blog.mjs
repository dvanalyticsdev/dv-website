import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const CF_WORKER_URL = 'https://dvsynckv.dvanalytics-dev.workers.dev/';
const IST_TIME_ZONE = 'Asia/Kolkata';
const AUTHOR = 'DV Editorial Team';

const getArg = (flag) => {
  const index = process.argv.indexOf(flag);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : null;
};

const isDirectPublish = process.argv.includes('--publish-direct');
const isForceRun = process.argv.includes('--force');
const isMarkRunComplete = process.argv.includes('--mark-run-complete');
const topicInput = getArg('--topic');
const runStatePath = join(rootDir, 'dist', 'auto-blog-run-state.json');

async function loadEnvFile() {
  const envPath = join(rootDir, '.env');
  try {
    const content = await readFile(envPath, 'utf8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#') || !line.includes('=')) continue;
      const [key, ...valueParts] = line.split('=');
      if (!process.env[key]) {
        process.env[key] = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
      }
    }
  } catch {
    // GitHub Actions should provide secrets through environment variables.
  }
}

await loadEnvFile();

const API_KEY = process.env.GEMINI_API_KEY;
const TEXT_MODEL = process.env.GEMINI_MODEL || process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash';
const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-image';
const RUN_WINDOW_MINUTES = Number(process.env.AUTO_BLOG_RUN_WINDOW_MINUTES || 20);

if (!API_KEY) {
  throw new Error('Missing GEMINI_API_KEY. Add it to .env locally and to GitHub Actions secrets for automation.');
}

async function fetchAdminState() {
  const response = await fetch(CF_WORKER_URL, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Could not read admin state from Cloudflare Worker (${response.status}).`);
  }

  const state = await response.json();
  if (!state || typeof state !== 'object') {
    throw new Error('Cloudflare Worker returned an invalid admin state payload.');
  }

  return {
    isAutoWriterActive: Boolean(state.isAutoWriterActive),
    scheduledTime: typeof state.scheduledTime === 'string' ? state.scheduledTime : '13:00',
    discardedDraftIds: Array.isArray(state.discardedDraftIds) ? state.discardedDraftIds : [],
    publishedDrafts: Array.isArray(state.publishedDrafts) ? state.publishedDrafts : [],
    customDrafts: Array.isArray(state.customDrafts) ? state.customDrafts : [],
    lastAutoRunDate: typeof state.lastAutoRunDate === 'string' ? state.lastAutoRunDate : null,
    lastAutoRunAt: typeof state.lastAutoRunAt === 'string' ? state.lastAutoRunAt : null,
  };
}

async function saveAdminState(state) {
  const response = await fetch(CF_WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state),
  });

  if (!response.ok) {
    throw new Error(`Could not save automation run state to Cloudflare Worker (${response.status}).`);
  }
}

function getIstParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: IST_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const value = (type) => parts.find((part) => part.type === type)?.value;
  const hour = value('hour') === '24' ? '00' : value('hour');

  return {
    dateKey: `${value('year')}-${value('month')}-${value('day')}`,
    hour: Number(hour),
    minute: Number(value('minute')),
  };
}

function parseScheduledTime(scheduledTime) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(scheduledTime);
  if (!match) throw new Error(`Invalid scheduledTime "${scheduledTime}". Expected HH:mm.`);

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error(`Invalid scheduledTime "${scheduledTime}". Expected HH:mm in 24-hour IST.`);
  }

  return hour * 60 + minute;
}

async function checkGlobalAdminState() {
  if (isForceRun) {
    console.log('Force mode enabled. Skipping admin schedule check.');
    return null;
  }

  const state = await fetchAdminState();
  if (!state.isAutoWriterActive) {
    console.log('Auto Generator is disabled in the admin panel. Skipping creation.');
    process.exit(0);
  }

  const nowIST = getIstParts();
  const currentMinutes = nowIST.hour * 60 + nowIST.minute;
  const scheduledMinutes = parseScheduledTime(state.scheduledTime);
  const minutesAfterSchedule = currentMinutes - scheduledMinutes;

  console.log(
    `Auto Generator enabled. Scheduled for ${state.scheduledTime} IST. Current IST time: ${String(nowIST.hour).padStart(2, '0')}:${String(nowIST.minute).padStart(2, '0')}.`
  );

  if (state.lastAutoRunDate === nowIST.dateKey) {
    console.log(`A blog has already been generated for ${nowIST.dateKey}. Skipping duplicate run.`);
    process.exit(0);
  }

  if (minutesAfterSchedule < 0 || minutesAfterSchedule > RUN_WINDOW_MINUTES) {
    console.log(`Current time is outside the ${RUN_WINDOW_MINUTES}-minute run window. Skipping.`);
    process.exit(0);
  }

  return { state, dateKey: nowIST.dateKey };
}

async function getExistingBlogTitles() {
  const titles = [];

  try {
    const metaPath = join(rootDir, 'src', 'data', 'blogMeta.ts');
    const metaContent = await readFile(metaPath, 'utf8');
    const matches = [...metaContent.matchAll(/title:\s*"([^"]+)"/g)];
    matches.forEach((match) => titles.push(match[1]));
  } catch {
    // Existing title context is helpful, but generation can continue without it.
  }

  try {
    const queuePath = join(rootDir, 'src', 'data', 'aiBlogQueue.ts');
    const queueContent = await readFile(queuePath, 'utf8');
    const matches = [...queueContent.matchAll(/"title":\s*"([^"]+)"/g)];
    matches.forEach((match) => titles.push(match[1]));
  } catch {
    // Existing queue context is helpful, but generation can continue without it.
  }

  try {
    const state = await fetchAdminState();
    state.customDrafts.forEach((draft) => {
      if (draft?.title) titles.push(draft.title);
    });
    state.publishedDrafts.forEach((draft) => {
      if (draft?.title) titles.push(draft.title);
    });
  } catch {
    // Local/manual forced runs can still generate from repository context.
  }

  return [...new Set(titles)];
}

function extractModelText(data) {
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || '')
    .join('')
    .trim();

  if (!text) throw new Error('Gemini returned an empty text response.');
  return text;
}

function parseJsonFromText(text) {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/i.exec(text);
  const jsonText = fenced ? fenced[1] : text;
  return JSON.parse(jsonText.trim());
}

function getGroundingSources(data) {
  const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return chunks
    .map((chunk) => chunk.web)
    .filter((web) => web?.uri)
    .map((web) => ({ title: web.title || web.uri, url: web.uri }))
    .filter((source, index, all) => all.findIndex((item) => item.url === source.url) === index)
    .slice(0, 8);
}

async function callGeminiJson(prompt, { useSearch = false } = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.75,
    },
  };

  if (useSearch) {
    body.tools = [{ google_search: {} }];
  } else {
    body.generationConfig.responseMimeType = 'application/json';
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        json: parseJsonFromText(extractModelText(data)),
        sources: getGroundingSources(data),
      };
    }

    const errorText = await response.text();
    if (attempt < 3 && (response.status === 429 || response.status >= 500)) {
      console.warn(`Gemini text API returned ${response.status}. Retrying attempt ${attempt + 1}/3...`);
      await new Promise((resolve) => setTimeout(resolve, attempt * 2500));
      continue;
    }

    throw new Error(`Gemini text API error (${response.status}): ${errorText}`);
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 90);
}

function formatDate(date) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function sanitizeSection(section) {
  const cleaned = {
    heading: String(section.heading || '').trim(),
    text: String(section.text || '').trim(),
  };

  if (section.para2) cleaned.para2 = String(section.para2).trim();
  if (section.para3) cleaned.para3 = String(section.para3).trim();
  if (Array.isArray(section.list) && section.list.length > 0) {
    cleaned.list = section.list.map((item) => String(item).trim()).filter(Boolean);
  }
  if (section.extra) cleaned.extra = String(section.extra).trim();

  return cleaned;
}

async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let suffix = 2;

  const content = await Promise.all([
    readFile(join(rootDir, 'src', 'data', 'blogMeta.ts'), 'utf8').catch(() => ''),
    readFile(join(rootDir, 'src', 'data', 'aiBlogQueue.ts'), 'utf8').catch(() => ''),
  ]);

  while (content.some((text) => text.includes(`slug: "${slug}"`) || text.includes(`"slug": "${slug}"`))) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

async function generateBlogContent() {
  const existingTitles = await getExistingBlogTitles();
  console.log(`Loaded ${existingTitles.length} existing titles for duplicate avoidance.`);

  const prompt = `You are the SEO editor for DV Analytics, a training institute for Data Science, Data Analytics, Generative AI, Agentic AI, MLOps, Data Engineering, and Cybersecurity in Bangalore, Bhubaneswar, and Dubai.

Use Google Search grounding to check current news, hiring signals, technology trends, and learner demand. Pick one blog topic that is timely, distinct, useful for prospective learners, and commercially relevant for DV Analytics.

Existing titles to avoid:
${existingTitles.slice(-40).map((title, index) => `${index + 1}. ${title}`).join('\n')}

${topicInput ? `Preferred focus from admin/user: "${topicInput}". Use it only if it is still timely and not duplicative.` : ''}

Return ONLY valid JSON:
{
  "title": "SEO headline under 75 characters",
  "excerpt": "Meta description, 145-160 characters, compelling but not clickbait",
  "readTime": "6 min read",
  "primaryKeyword": "one primary SEO keyword",
  "secondaryKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4"],
  "trendSummary": "Short explanation of the news/trend angle used",
  "imagePrompt": "Detailed text-to-image prompt for a 16:9 blog poster. It must request a text-free graphic image with no letters, no words, no numbers, no logos, no watermark-like visible text.",
  "sections": [
    {
      "heading": "Section headline",
      "text": "Paragraph 1 with practical market context.",
      "para2": "Paragraph 2 with career/course relevance.",
      "para3": "Optional paragraph 3.",
      "list": ["Specific takeaway", "Specific takeaway", "Specific takeaway"]
    }
  ]
}

Content rules:
- Author is always "${AUTHOR}".
- Write for freshers, graduates, non-tech switchers, and working professionals.
- Include Bangalore, Bhubaneswar, or Dubai only when naturally relevant.
- Keep the article educational and conversion-aware, not spammy.
- Do not invent salary numbers or job counts unless grounded by search results.
- Create 5 to 7 substantive sections.`;

  const { json, sources } = await callGeminiJson(prompt, { useSearch: true });

  if (!json.title || !json.excerpt || !Array.isArray(json.sections) || json.sections.length < 3) {
    throw new Error('Gemini returned an incomplete blog JSON payload.');
  }

  return { blog: json, sources };
}

async function generateCoverImage(slug, blog) {
  const imageDir = join(rootDir, 'public', 'blogs');
  await mkdir(imageDir, { recursive: true });

  const prompt = `${blog.imagePrompt || `Create a premium editorial blog poster about ${blog.title}.`}

Strict visual requirements:
- No text, no captions, no letters, no numbers, no UI labels, no logos.
- 16:9 landscape composition for a website blog hero.
- Modern, polished, high-trust visual style suitable for an education brand.
- Abstract but specific to the topic: ${blog.primaryKeyword || blog.title}.
- Use clean lighting, depth, human-centered or technology-centered symbolism, and strong click-worthy composition.`;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      input: prompt,
      response_format: {
        type: 'image',
        mime_type: 'image/jpeg',
        aspect_ratio: '16:9',
        image_size: '1K',
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.warn(`Gemini image API unavailable (${response.status}). Creating local graphic fallback.`);
    console.warn(errorText);
    return createFallbackGraphicImage(slug, blog);
  }

  const data = await response.json();
  const outputImage =
    data.output_image ||
    data.steps
      ?.flatMap((step) => step.content || step.summary || [])
      .find((block) => block.type === 'image' && block.data);

  if (!outputImage?.data) {
    throw new Error('Gemini image API did not return image data.');
  }

  const imagePath = join(imageDir, `${slug}.jpg`);
  await writeFile(imagePath, Buffer.from(outputImage.data, 'base64'));
  return `/blogs/${slug}.jpg`;
}

async function createFallbackGraphicImage(slug, blog) {
  const imageDir = join(rootDir, 'public', 'blogs');
  await mkdir(imageDir, { recursive: true });

  const topic = `${blog.title || ''} ${blog.primaryKeyword || ''}`.toLowerCase();
  const palette = topic.includes('cyber')
    ? ['#07111f', '#0f766e', '#38bdf8', '#bef264']
    : topic.includes('data') || topic.includes('mlops')
      ? ['#08111f', '#2563eb', '#06b6d4', '#f8fafc']
      : topic.includes('career') || topic.includes('job')
        ? ['#111827', '#f97316', '#22c55e', '#e0f2fe']
        : ['#0f172a', '#4f46e5', '#06b6d4', '#f97316'];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette[0]}"/>
      <stop offset="0.55" stop-color="${palette[1]}"/>
      <stop offset="1" stop-color="${palette[0]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="55%">
      <stop offset="0" stop-color="${palette[2]}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${palette[2]}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <ellipse cx="650" cy="315" rx="420" ry="260" fill="url(#glow)"/>
  <g opacity="0.9" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M240 438 C370 260 520 520 660 304 S910 174 1000 330" stroke="${palette[3]}" stroke-width="12" opacity="0.75"/>
    <path d="M188 296 C338 202 450 392 598 240 S838 210 1015 146" stroke="${palette[2]}" stroke-width="8" opacity="0.6"/>
    <path d="M205 508 C360 430 470 612 640 468 S855 404 1028 490" stroke="#ffffff" stroke-width="5" opacity="0.38"/>
  </g>
  <g opacity="0.86">
    <circle cx="308" cy="392" r="24" fill="${palette[3]}"/>
    <circle cx="514" cy="314" r="18" fill="${palette[2]}"/>
    <circle cx="692" cy="364" r="30" fill="#ffffff" fill-opacity="0.82"/>
    <circle cx="860" cy="246" r="22" fill="${palette[3]}"/>
    <circle cx="980" cy="332" r="16" fill="${palette[2]}"/>
  </g>
  <g opacity="0.22" stroke="#ffffff" stroke-width="2">
    <path d="M308 392 L514 314 L692 364 L860 246 L980 332"/>
    <path d="M514 314 L640 505 L860 246"/>
    <path d="M308 392 L640 505 L980 332"/>
  </g>
  <g opacity="0.16" fill="#ffffff">
    <rect x="104" y="118" width="120" height="120" rx="28"/>
    <rect x="964" y="455" width="150" height="150" rx="36"/>
    <circle cx="1090" cy="116" r="72"/>
    <circle cx="138" cy="562" r="54"/>
  </g>
</svg>`;

  const imagePath = join(imageDir, `${slug}.svg`);
  await writeFile(imagePath, svg, 'utf8');
  return `/blogs/${slug}.svg`;
}

async function appendDraftToQueue(queueItem) {
  const queuePath = join(rootDir, 'src', 'data', 'aiBlogQueue.ts');
  let queueContent = await readFile(queuePath, 'utf8');

  if (/<<<<<<<|=======|>>>>>>>/.test(queueContent)) {
    throw new Error('aiBlogQueue.ts contains unresolved merge conflict markers.');
  }

  const formattedQueueItem = JSON.stringify(queueItem, null, 2);
  if (queueContent.includes('export const aiBlogQueue: AiQueueItem[] = [];')) {
    queueContent = queueContent.replace(
      'export const aiBlogQueue: AiQueueItem[] = [];',
      `export const aiBlogQueue: AiQueueItem[] = [\n${formattedQueueItem}\n];`
    );
  } else if (/\]\s*;\s*$/.test(queueContent)) {
    queueContent = queueContent.replace(/\s*\]\s*;\s*$/, `,\n${formattedQueueItem}\n];\n`);
  } else {
    throw new Error('Could not find the aiBlogQueue array ending.');
  }

  await writeFile(queuePath, queueContent, 'utf8');
}

async function pathExists(path) {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function writeScheduledRunMarker(scheduledRun, generatedAt) {
  if (!scheduledRun) return;
  await mkdir(dirname(runStatePath), { recursive: true });
  await writeFile(
    runStatePath,
    JSON.stringify(
      {
        dateKey: scheduledRun.dateKey,
        generatedAt,
      },
      null,
      2
    ),
    'utf8'
  );
}

async function markScheduledRunComplete() {
  if (!(await pathExists(runStatePath))) {
    console.log('No scheduled run marker found. Nothing to mark complete.');
    return;
  }

  const marker = JSON.parse(await readFile(runStatePath, 'utf8'));
  if (!marker.dateKey || !marker.generatedAt) {
    throw new Error('Scheduled run marker is invalid.');
  }

  const state = await fetchAdminState();
  await saveAdminState({
    ...state,
    lastAutoRunDate: marker.dateKey,
    lastAutoRunAt: marker.generatedAt,
  });

  console.log(`Marked scheduled blog run complete for ${marker.dateKey}.`);
}

try {
  if (isMarkRunComplete) {
    await markScheduledRunComplete();
    process.exit(0);
  }

  const scheduledRun = await checkGlobalAdminState();
  const { blog, sources } = await generateBlogContent();
  const baseSlug = slugify(blog.title);
  const slug = await ensureUniqueSlug(baseSlug);
  const today = new Date();
  const imageRelPath = await generateCoverImage(slug, blog);

  const queueItem = {
    id: `ai-draft-${Date.now()}`,
    slug,
    title: String(blog.title).trim(),
    excerpt: String(blog.excerpt).trim(),
    date: formatDate(today),
    author: AUTHOR,
    image: imageRelPath,
    readTime: blog.readTime || '6 min read',
    primaryKeyword: blog.primaryKeyword || '',
    secondaryKeywords: Array.isArray(blog.secondaryKeywords) ? blog.secondaryKeywords.map(String) : [],
    trendSummary: blog.trendSummary || '',
    trendSources: sources,
    sections: blog.sections.map(sanitizeSection),
    status: isDirectPublish ? 'published' : 'pending',
    createdAt: today.toISOString(),
  };

  await appendDraftToQueue(queueItem);

  console.log('AI blog draft created.');
  console.log(`ID: ${queueItem.id}`);
  console.log(`Title: ${queueItem.title}`);
  console.log(`Image: ${queueItem.image}`);
  console.log(`Status: ${queueItem.status}`);

  if (isDirectPublish) {
    execSync(`node --experimental-strip-types scripts/manage-ai-blog.mjs --action publish --id ${queueItem.id}`, {
      cwd: rootDir,
      stdio: 'inherit',
    });
  } else {
    execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
  }

  await writeScheduledRunMarker(scheduledRun, today.toISOString());

  const imageFileName = imageRelPath.replace('/blogs/', '');
  if (!(await pathExists(join(rootDir, 'public', 'blogs', imageFileName)))) {
    throw new Error('Cover image file was not written.');
  }

  console.log('Done. Draft is ready in the admin queue.');
} catch (error) {
  console.error('Failed to generate AI blog:', error);
  process.exit(1);
}
