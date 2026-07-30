import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const DV_ROOT = process.cwd();
const AGENTIFY_ROOT = path.resolve(DV_ROOT, '..', 'agentifyaiglobal');
const CACHE_DIR = path.resolve(DV_ROOT, 'scratch', 'chatbot-cache');
const EMBEDDING_CACHE_PATH = path.resolve(CACHE_DIR, 'embeddings.json');

const CONTENT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.md', '.txt', '.html']);
const CONTENT_PATH_HINTS = [
  'about',
  'blog',
  'benefit',
  'brochure',
  'company',
  'contact',
  'course',
  'enroll',
  'faq',
  'footer',
  'header',
  'program',
  'roadmap',
  'service',
  'success',
  'story',
];
const EXCLUDED_PATH_HINTS = ['node_modules', 'dist', '.git', 'Logo', 'chatbotwidget', 'robot', 'canvas', 'particles', 'hooks'];
const PAGE_KEYWORDS = {
  about: ['about', 'mission', 'vision', 'leadership', 'founder', 'company'],
  services: ['services', 'enterprise', 'consulting', 'solutions', 'agentic', 'automation'],
  faqs: ['faq', 'eligibility', 'admission', 'fees', 'scholarship', 'placement', 'lms'],
  blogs: ['blog', 'article', 'insight'],
  enroll: ['enroll', 'admission', 'registration', 'apply', 'query form'],
  contact: ['contact', 'office', 'location', 'address', 'phone', 'email'],
};
const STOPWORDS = new Set([
  'a', 'about', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'been', 'being', 'by', 'can',
  'do', 'for', 'from', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'me', 'more', 'my', 'of', 'on', 'or',
  'our', 'so', 'that', 'the', 'their', 'them', 'there', 'these', 'they', 'this', 'to', 'we', 'what',
  'when', 'where', 'which', 'who', 'why', 'will', 'with', 'you', 'your',
]);
const MAX_HISTORY = 8;
const MAX_RETRIEVED_CHUNKS = 8;
const MAX_COURSES_IN_CONTEXT = 4;
const CHUNK_TARGET_CHARS = 850;

let knowledgeCache = null;
let loadingKnowledgePromise = null;
let embeddingCache = null;

export function buildHealthPayload() {
  return {
    ok: true,
    configured: Boolean(process.env.GEMINI_API_KEY),
    embeddingConfigured: Boolean(process.env.GEMINI_API_KEY),
    knowledgeRoots: [DV_ROOT, AGENTIFY_ROOT],
  };
}

export async function getKnowledgeContext({ page, courseId, message, history } = {}) {
  const knowledge = await getKnowledgeBase();
  const normalizedPage = normalizePage(page);
  const normalizedHistory = normalizeHistory(history);
  const intent = classifyIntent({
    message,
    page: normalizedPage,
    history: normalizedHistory,
  });
  const queryText = [normalizedPage, courseId, ...normalizedHistory.map((item) => item.content), message]
    .filter(Boolean)
    .join('\n');

  const retrievedChunks = await retrieveKnowledge({
    knowledge,
    query: queryText,
    intent,
    page: normalizedPage,
    courseId,
  });

  const featuredCourses = selectFeaturedCourses({
    knowledge,
    retrievedChunks,
    courseId,
    message,
  });
  const relevantFaqs = selectRelevantFaqs(knowledge.faqs, queryText);
  const contactEntries = knowledge.contacts.slice(0, 6);

  return {
    page: normalizedPage,
    intent,
    currentCourse: courseId ? knowledge.courseMap.get(String(courseId).toLowerCase()) ?? null : null,
    pageDescription: describePage(normalizedPage),
    retrievedChunks,
    featuredCourses,
    relevantFaqs,
    contactEntries,
    policies: knowledge.policies,
    knowledgeStats: {
      documents: knowledge.documents.length,
      chunks: knowledge.chunks.length,
      indexedAt: knowledge.indexedAt,
    },
  };
}

export function buildRecommendationGuidance({ message, history } = {}) {
  const conversationText = [String(message ?? ''), ...normalizeHistory(history).map((item) => item.content)]
    .join(' ')
    .toLowerCase();

  const signals = {
    genAiInterest: hasAny(conversationText, ['gen ai', 'generative ai', 'llm', 'agentic ai', 'agentic', 'ai agent']),
    analyticsInterest: hasAny(conversationText, ['analytics', 'power bi', 'tableau', 'dashboard', 'business intelligence']),
    cyberInterest: hasAny(conversationText, ['cyber', 'cybersecurity', 'soc', 'ethical hacking', 'forensics']),
    admissionsIntent: hasAny(conversationText, ['fee', 'fees', 'admission', 'scholarship', 'batch', 'schedule', 'apply']),
    beginnerIntent: hasAny(conversationText, ['beginner', 'from scratch', 'no coding', 'no programming', 'career switch']),
    technicalBase: hasAny(conversationText, ['python', 'sql', 'machine learning', 'developer', 'engineer', 'coding']),
  };

  let recommendation = null;

  if (signals.cyberInterest) {
    recommendation = {
      hint: 'Prioritize the cybersecurity track when the user is clearly asking about security, SOC, or forensics roles.',
      focus: 'cybersecurity',
    };
  } else if (signals.genAiInterest && signals.beginnerIntent && !signals.technicalBase) {
    recommendation = {
      hint: 'For beginners asking about Generative AI, start with a foundation-heavy path before the most specialized GenAI-only option.',
      focus: 'foundation-first-genai',
    };
  } else if (signals.analyticsInterest) {
    recommendation = {
      hint: 'When the user is centered on dashboards, BI, and business analytics, emphasize analytics-oriented programs first.',
      focus: 'analytics',
    };
  } else if (signals.admissionsIntent) {
    recommendation = {
      hint: 'Be helpful, but do not invent fees, scholarship terms, schedules, or admissions confirmations.',
      focus: 'human-only-admissions',
    };
  }

  return { signals, recommendation };
}

export function buildContextText(context) {
  const chunkBlock = context.retrievedChunks
    .map((chunk, index) => {
      const sourceLine = [
        `Source ${index + 1}`,
        chunk.repoLabel,
        chunk.kind,
        chunk.title,
        chunk.relativePath,
      ]
        .filter(Boolean)
        .join(' | ');

      return `${sourceLine}\n${chunk.text}`;
    })
    .join('\n\n');

  const courseBlock = context.featuredCourses
    .map((course) =>
      [
        `Course: ${course.title}`,
        `Brand: ${course.brand}`,
        `Duration: ${course.duration || 'Not specified'}`,
        `Overview: ${course.overview}`,
        `Who should join: ${course.whoShouldJoin.join(', ') || 'Not specified'}`,
        `Careers: ${course.careers.join(', ') || 'Not specified'}`,
        `Tools/topics: ${course.tools.join(', ') || 'Not specified'}`,
      ].join('\n'),
    )
    .join('\n\n');

  const faqBlock = context.relevantFaqs
    .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
    .join('\n\n');

  const contactBlock = context.contactEntries
    .map((entry) => `${entry.title}: ${entry.summary}`)
    .join('\n');

  return [
    `Current page: ${context.page}`,
    `Current page description: ${context.pageDescription}`,
    `Detected intent: ${context.intent.label}`,
    `Intent rationale: ${context.intent.rationale}`,
    '',
    'Policies:',
    `Bot role: ${context.policies.botRole}`,
    `Restricted actions: ${context.policies.restrictedActions.join(' ')}`,
    `Human-only topics: ${context.policies.humanOnlyTopics.join(', ')}`,
    '',
    'Retrieved evidence:',
    chunkBlock || 'No retrieved evidence found.',
    '',
    'Structured course knowledge:',
    courseBlock || 'No course directly matched.',
    '',
    'Relevant FAQs:',
    faqBlock || 'No FAQ matched.',
    '',
    'Contact summary:',
    contactBlock || 'No contact information extracted.',
  ].join('\n');
}

export async function getKnowledgeBase() {
  const snapshot = collectSourceSnapshot();

  if (knowledgeCache && knowledgeCache.snapshotKey === snapshot.snapshotKey) {
    return knowledgeCache;
  }

  if (!loadingKnowledgePromise) {
    loadingKnowledgePromise = buildKnowledgeBase(snapshot)
      .then((result) => {
        knowledgeCache = result;
        return result;
      })
      .finally(() => {
        loadingKnowledgePromise = null;
      });
  }

  return loadingKnowledgePromise;
}

export async function runRetrievalPreview({ message, page, courseId, history } = {}) {
  return getKnowledgeContext({ message, page, courseId, history });
}

async function buildKnowledgeBase(snapshot) {
  const courseDocuments = await collectCourseDocuments(snapshot.roots);
  const sourceDocuments = collectSourceDocuments(snapshot.files);
  const faqEntries = buildFaqEntries(sourceDocuments, courseDocuments);
  const contactEntries = buildContactEntries(sourceDocuments);
  const documents = [...courseDocuments, ...sourceDocuments];
  const chunks = buildChunks(documents);
  const { docFrequency, avgChunkLength } = buildInvertedStats(chunks);

  return {
    snapshotKey: snapshot.snapshotKey,
    indexedAt: new Date().toISOString(),
    documents,
    chunks,
    docFrequency,
    avgChunkLength,
    courseMap: new Map(courseDocuments.map((course) => [course.idAlias, course])),
    contacts: contactEntries,
    faqs: faqEntries,
    policies: {
      botRole:
        'Eva is a grounded domain assistant for DV Analytics and Agentify AI. She should guide users through courses, certifications, services, company information, blogs, FAQs, roadmaps, LMS benefits, and contact details using retrieved evidence only.',
      restrictedActions: [
        'Do not invent fees, scholarship amounts, schedules, or admissions outcomes.',
        'Do not claim a policy exists unless retrieved evidence supports it.',
        'Do not act like a human counselor or take payments.',
      ],
      humanOnlyTopics: [
        'Final fee confirmation',
        'Scholarship approval or rejection',
        'Admission confirmation',
        'Batch scheduling',
        'Any information not found in retrieved content',
      ],
    },
  };
}

async function collectCourseDocuments(roots) {
  const documents = [];

  for (const root of roots) {
    const jsPath = path.resolve(root, 'src', 'data', 'coursesData.js');

    if (!fs.existsSync(jsPath)) {
      continue;
    }

    const moduleUrl = `${pathToFileURL(jsPath).href}?ts=${fs.statSync(jsPath).mtimeMs}`;
    const imported = await import(moduleUrl);
    const coursesData = imported?.coursesData ?? {};

    for (const course of Object.values(coursesData)) {
      const overview = sanitizeText(course.overview);
      const whoShouldJoin = (course.whoShouldJoin ?? []).map(sanitizeText).filter(Boolean);
      const careers = (course.careers ?? [])
        .flatMap((group) => group.roles ?? [])
        .map(sanitizeText)
        .filter(Boolean);
      const tools = [
        ...new Set(
          (course.modules ?? []).flatMap((module) =>
            (module.sections ?? []).flatMap((section) => (section.topics ?? []).map(sanitizeText)),
          ),
        ),
      ].filter(Boolean);

      documents.push({
        id: `${getRepoLabel(root).toLowerCase()}-course-${String(course.id).toLowerCase()}`,
        kind: 'course',
        subtype: 'course',
        brand: inferBrand(root, overview),
        repoRoot: root,
        repoLabel: getRepoLabel(root),
        title: sanitizeText(course.title),
        relativePath: path.relative(root, jsPath),
        summary: sanitizeText(course.tagline || overview),
        text: [
          sanitizeText(course.title),
          sanitizeText(course.tagline),
          overview,
          sanitizeText(course.duration),
          sanitizeText(course.careerAdvantage),
          ...whoShouldJoin,
          ...careers,
          ...(course.programOutcome ?? []).map(sanitizeText),
          ...(course.practicalExposure ?? []).map(sanitizeText),
          ...(course.expertiseAreas ?? []).map(sanitizeText),
        ]
          .filter(Boolean)
          .join('\n'),
        keywords: buildKeywordHints([
          sanitizeText(course.title),
          sanitizeText(course.tagline),
          overview,
          ...whoShouldJoin,
          ...careers,
          ...tools,
        ]),
        pageHints: ['course', 'program'],
        idAlias: String(course.id).toLowerCase(),
        courseId: String(course.id).toLowerCase(),
        duration: sanitizeText(course.duration),
        overview,
        whoShouldJoin,
        careers,
        tools: tools.slice(0, 30),
      });
    }
  }

  return documents;
}

function collectSourceDocuments(files) {
  const documents = [];

  for (const filePath of files) {
    const repoRoot = getOwningRoot(filePath);
    const relativePath = path.relative(repoRoot, filePath);
    const raw = fs.readFileSync(filePath, 'utf8');
    const extracted = extractMeaningfulText(raw);

    if (!extracted.length) {
      continue;
    }

    const title = humanizeFileName(path.basename(filePath, path.extname(filePath)));
    const docKind = inferDocumentKind(relativePath);
    const combinedText = extracted.join('\n');

    documents.push({
      id: `${getRepoLabel(repoRoot).toLowerCase()}-${relativePath.replace(/[\\/]/g, '-').toLowerCase()}`,
      kind: docKind,
      subtype: docKind,
      brand: inferBrand(repoRoot, combinedText),
      repoRoot,
      repoLabel: getRepoLabel(repoRoot),
      title,
      relativePath,
      summary: extracted[0],
      text: combinedText,
      keywords: buildKeywordHints([title, combinedText]),
      pageHints: inferPageHints(relativePath, combinedText),
    });
  }

  return documents;
}

async function retrieveKnowledge({ knowledge, query, intent, page, courseId }) {
  const lexicalRanked = rankChunksLexically({
    chunks: knowledge.chunks,
    query,
    knowledge,
    intent,
    page,
    courseId,
  });

  const topCandidates = lexicalRanked.slice(0, 12);
  const reranked = await rerankWithEmbeddings(topCandidates, query);

  return reranked.slice(0, MAX_RETRIEVED_CHUNKS).map(({ score, lexicalScore, semanticScore, ...chunk }) => ({
    ...chunk,
    retrievalScore: round(score),
    lexicalScore: round(lexicalScore),
    semanticScore: semanticScore == null ? null : round(semanticScore),
  }));
}

function rankChunksLexically({ chunks, query, knowledge, intent, page, courseId }) {
  const queryTokens = tokenize(query);
  const queryTokenSet = new Set(queryTokens);

  return chunks
    .map((chunk) => {
      const bm25 = scoreBm25({
        queryTokens,
        chunk,
        docFrequency: knowledge.docFrequency,
        avgChunkLength: knowledge.avgChunkLength,
        totalChunks: knowledge.chunks.length,
      });
      const exactPhraseBoost =
        courseId && chunk.courseId === String(courseId).toLowerCase()
          ? 3
          : chunk.text.toLowerCase().includes(String(courseId ?? '').toLowerCase())
            ? 1.5
            : 0;
      const pageBoost = chunk.pageHints.includes(page) ? 1.25 : 0;
      const intentBoost = chunk.kind === intent.primaryKind ? 1.2 : 0;
      const overlapBoost = overlapRatio(queryTokenSet, new Set(chunk.tokens)) * 2.5;
      const titleBoost = overlapRatio(queryTokenSet, new Set(tokenize(chunk.title))) * 1.8;

      return {
        ...chunk,
        lexicalScore: bm25 + exactPhraseBoost + pageBoost + intentBoost + overlapBoost + titleBoost,
        semanticScore: null,
        score: 0,
      };
    })
    .filter((chunk) => chunk.lexicalScore > 0.15)
    .sort((a, b) => b.lexicalScore - a.lexicalScore);
}

async function rerankWithEmbeddings(chunks, query) {
  if (!process.env.GEMINI_API_KEY || chunks.length === 0) {
    return chunks
      .map((chunk) => ({ ...chunk, score: chunk.lexicalScore }))
      .sort((a, b) => b.score - a.score);
  }

  try {
    const queryEmbedding = await getEmbedding(query, 'RETRIEVAL_QUERY');

    await Promise.all(
      chunks.map(async (chunk) => {
        chunk.semanticVector = await getEmbedding(`${chunk.title}\n${chunk.text}`, 'RETRIEVAL_DOCUMENT');
      }),
    );

    return chunks
      .map((chunk) => {
        const semanticScore = cosineSimilarity(queryEmbedding, chunk.semanticVector);
        const score = chunk.lexicalScore * 0.55 + semanticScore * 4.5;
        return {
          ...chunk,
          semanticScore,
          score,
        };
      })
      .sort((a, b) => b.score - a.score);
  } catch {
    return chunks
      .map((chunk) => ({ ...chunk, score: chunk.lexicalScore }))
      .sort((a, b) => b.score - a.score);
  }
}

async function getEmbedding(text, taskType) {
  const normalizedText = sanitizeText(text).slice(0, 8000);
  const cacheKey = `${process.env.GEMINI_EMBEDDING_MODEL ?? 'gemini-embedding-001'}::${taskType}::${normalizedText}`;
  const cache = loadEmbeddingCache();

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const model = process.env.GEMINI_EMBEDDING_MODEL ?? 'gemini-embedding-001';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${process.env.GEMINI_API_KEY}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: `models/${model}`,
      taskType,
      content: {
        parts: [{ text: normalizedText }],
      },
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message ?? 'Embedding request failed.');
  }

  const values = data?.embedding?.values;

  if (!Array.isArray(values) || !values.length) {
    throw new Error('Embedding response did not include vector values.');
  }

  cache[cacheKey] = values;
  persistEmbeddingCache(cache);
  return values;
}

function loadEmbeddingCache() {
  if (embeddingCache) {
    return embeddingCache;
  }

  ensureCacheDir();

  if (!fs.existsSync(EMBEDDING_CACHE_PATH)) {
    embeddingCache = {};
    return embeddingCache;
  }

  try {
    embeddingCache = JSON.parse(fs.readFileSync(EMBEDDING_CACHE_PATH, 'utf8'));
  } catch {
    embeddingCache = {};
  }

  return embeddingCache;
}

function persistEmbeddingCache(cache) {
  ensureCacheDir();
  embeddingCache = cache;
  fs.writeFileSync(EMBEDDING_CACHE_PATH, JSON.stringify(cache));
}

function ensureCacheDir() {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function buildChunks(documents) {
  const chunks = [];

  for (const doc of documents) {
    const paragraphs = doc.text
      .split(/\n+/)
      .map((item) => sanitizeText(item))
      .filter(Boolean);

    const parts = [];
    let buffer = '';

    for (const paragraph of paragraphs) {
      const next = buffer ? `${buffer}\n${paragraph}` : paragraph;

      if (next.length > CHUNK_TARGET_CHARS && buffer) {
        parts.push(buffer);
        buffer = paragraph;
      } else {
        buffer = next;
      }
    }

    if (buffer) {
      parts.push(buffer);
    }

    parts.forEach((text, index) => {
      chunks.push({
        id: `${doc.id}-chunk-${index + 1}`,
        docId: doc.id,
        kind: doc.kind,
        brand: doc.brand,
        title: doc.title,
        repoLabel: doc.repoLabel,
        relativePath: doc.relativePath,
        pageHints: doc.pageHints,
        keywords: doc.keywords,
        text,
        tokens: tokenize(`${doc.title} ${text}`),
      });
    });
  }

  return chunks;
}

function buildInvertedStats(chunks) {
  const docFrequency = new Map();
  let totalLength = 0;

  for (const chunk of chunks) {
    totalLength += chunk.tokens.length;
    const seen = new Set(chunk.tokens);

    for (const token of seen) {
      docFrequency.set(token, (docFrequency.get(token) ?? 0) + 1);
    }
  }

  return {
    docFrequency,
    avgChunkLength: chunks.length ? totalLength / chunks.length : 1,
  };
}

function scoreBm25({ queryTokens, chunk, docFrequency, avgChunkLength, totalChunks }) {
  if (!queryTokens.length || !chunk.tokens.length) {
    return 0;
  }

  const frequencies = new Map();
  for (const token of chunk.tokens) {
    frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
  }

  const k1 = 1.4;
  const b = 0.75;
  const chunkLength = chunk.tokens.length;
  let score = 0;

  for (const token of queryTokens) {
    const tf = frequencies.get(token) ?? 0;
    if (!tf) continue;

    const df = docFrequency.get(token) ?? 0;
    const idf = Math.log(1 + (totalChunks - df + 0.5) / (df + 0.5));
    const numerator = tf * (k1 + 1);
    const denominator = tf + k1 * (1 - b + b * (chunkLength / avgChunkLength));
    score += idf * (numerator / denominator);
  }

  return score;
}

function classifyIntent({ message, page, history }) {
  const text = [String(message ?? ''), ...history.map((item) => item.content), page].join(' ').toLowerCase();

  if (hasAny(text, ['who is', 'mission', 'vision', 'leadership', 'founder', 'about company', 'about agentify', 'about dv analytics'])) {
    return {
      label: 'company-info',
      rationale: 'The query is about company identity, leadership, mission, or vision.',
      primaryKind: 'about',
    };
  }

  if (hasAny(text, ['compare', 'which course', 'which program', 'career path', 'roadmap', 'certification', 'eligibility', 'what will i learn', 'jobs does this course'])) {
    return {
      label: 'course-guidance',
      rationale: 'The query is about program fit, comparison, roadmap, certification, or course outcomes.',
      primaryKind: 'course',
    };
  }

  if (hasAny(text, ['fee', 'fees', 'scholarship', 'emi', 'price', 'cost', 'batch', 'admission'])) {
    return {
      label: 'admissions',
      rationale: 'The query is asking about fees, scholarship, EMI, admissions, or schedules.',
      primaryKind: 'faq',
    };
  }

  if (hasAny(text, ['service', 'enterprise', 'consulting', 'solution', 'automation', 'knowledge assistant', 'customer service', 'internal chatgpt'])) {
    return {
      label: 'enterprise-services',
      rationale: 'The query is focused on enterprise AI services or solutions.',
      primaryKind: 'services',
    };
  }

  if (hasAny(text, ['where', 'address', 'office', 'phone', 'email', 'contact', 'location'])) {
    return {
      label: 'contact',
      rationale: 'The query is asking for office, address, email, phone, or location details.',
      primaryKind: 'contact',
    };
  }

  if (hasAny(text, ['blog', 'article', 'insight', 'post'])) {
    return {
      label: 'blogs',
      rationale: 'The query is asking about blog or article content.',
      primaryKind: 'blog',
    };
  }

  return {
    label: 'general-site-help',
    rationale: 'The query is broad, so retrieve the most relevant site content across both brands.',
    primaryKind: page === 'services' ? 'services' : 'course',
  };
}

function selectFeaturedCourses({ knowledge, retrievedChunks, courseId, message }) {
  if (courseId) {
    const direct = knowledge.courseMap.get(String(courseId).toLowerCase());
    return direct ? [direct] : [];
  }

  const fromChunks = [];

  for (const chunk of retrievedChunks) {
    const doc = knowledge.documents.find((item) => item.id === chunk.docId);
    if (doc?.kind === 'course' && !fromChunks.some((item) => item.title === doc.title)) {
      fromChunks.push(doc);
    }
  }

  if (fromChunks.length) {
    return fromChunks.slice(0, MAX_COURSES_IN_CONTEXT);
  }

  const messageText = String(message ?? '').toLowerCase();
  return knowledge.documents
    .filter((item) => item.kind === 'course')
    .filter((item) => {
      if (messageText.includes('cyber')) return item.text.toLowerCase().includes('cyber');
      if (messageText.includes('generative ai') || messageText.includes('agentic ai')) {
        return item.text.toLowerCase().includes('generative ai') || item.text.toLowerCase().includes('agentic ai');
      }
      return true;
    })
    .slice(0, MAX_COURSES_IN_CONTEXT);
}

function selectRelevantFaqs(faqs, query) {
  const queryTokens = new Set(tokenize(query));

  return faqs
    .map((faq) => ({
      ...faq,
      score: overlapRatio(queryTokens, new Set(tokenize(`${faq.question} ${faq.answer}`))),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .filter((faq) => faq.score > 0 || faq.alwaysInclude);
}

function buildFaqEntries(documents, courseDocuments) {
  const faqs = [];

  for (const doc of documents) {
    if (!['faq', 'enrollment', 'course'].includes(doc.kind)) {
      continue;
    }

    const lines = doc.text.split(/\n+/).map((item) => sanitizeText(item)).filter(Boolean);

    for (let index = 0; index < lines.length - 1; index += 1) {
      const line = lines[index];
      const next = lines[index + 1];

      if (looksLikeQuestion(line) && next && next.length > 20) {
        faqs.push({
          question: line,
          answer: next,
          source: doc.relativePath,
        });
      }
    }
  }

  if (!faqs.length) {
    for (const course of courseDocuments.slice(0, 4)) {
      faqs.push({
        question: `Who is ${course.title} best for?`,
        answer: course.whoShouldJoin.join(', ') || course.overview,
        source: course.relativePath,
        alwaysInclude: true,
      });
    }
  }

  return dedupeFaqs(faqs).slice(0, 40);
}

function buildContactEntries(documents) {
  return documents
    .filter((doc) => doc.kind === 'contact')
    .map((doc) => ({
      title: `${doc.repoLabel} contact`,
      summary: sanitizeText(doc.text).slice(0, 300),
      relativePath: doc.relativePath,
    }));
}

function dedupeFaqs(faqs) {
  const seen = new Set();
  return faqs.filter((faq) => {
    const key = `${faq.question.toLowerCase()}::${faq.answer.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function collectSourceSnapshot() {
  const roots = [DV_ROOT, AGENTIFY_ROOT].filter((root) => fs.existsSync(root));
  const files = [];

  for (const root of roots) {
    walkDirectory(root, files);
  }

  const stats = files.map((filePath) => `${filePath}:${fs.statSync(filePath).mtimeMs}`);
  return {
    roots,
    files,
    snapshotKey: stats.join('|'),
  };
}

function walkDirectory(dirPath, collector) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED_PATH_HINTS.some((hint) => fullPath.toLowerCase().includes(hint.toLowerCase()))) {
        continue;
      }

      walkDirectory(fullPath, collector);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!CONTENT_EXTENSIONS.has(ext)) {
      continue;
    }

    const normalized = fullPath.toLowerCase();
    if (!CONTENT_PATH_HINTS.some((hint) => normalized.includes(hint))) {
      continue;
    }

    if (normalized.includes('server\\chatbot') || normalized.includes('server/chatbot')) {
      continue;
    }

    collector.push(fullPath);
  }
}

function extractMeaningfulText(source) {
  const literals = [];
  const regex = /(["'`])((?:\\.|(?!\1)[\s\S]){4,}?)\1/g;
  let match;

  while ((match = regex.exec(source))) {
    const text = sanitizeText(unescapeLiteral(match[2]));
    if (isMeaningfulLiteral(text)) {
      literals.push(text);
    }
  }

  return dedupePreserveOrder(literals);
}

function inferDocumentKind(relativePath) {
  const normalized = relativePath.toLowerCase();
  if (normalized.includes('faq')) return 'faq';
  if (normalized.includes('about')) return 'about';
  if (normalized.includes('service')) return 'services';
  if (normalized.includes('blog')) return 'blog';
  if (normalized.includes('footer') || normalized.includes('contact')) return 'contact';
  if (normalized.includes('enroll')) return 'enrollment';
  if (normalized.includes('roadmap') || normalized.includes('benefit')) return 'program';
  if (normalized.includes('course')) return 'course';
  return 'general';
}

function inferPageHints(relativePath, text) {
  const hints = new Set();
  const normalizedPath = relativePath.toLowerCase();
  const normalizedText = text.toLowerCase();

  Object.entries(PAGE_KEYWORDS).forEach(([page, keywords]) => {
    if (keywords.some((keyword) => normalizedPath.includes(keyword) || normalizedText.includes(keyword))) {
      hints.add(page);
    }
  });

  if (normalizedPath.includes('course') || normalizedPath.includes('program')) {
    hints.add('course');
  }

  return [...hints];
}

function inferBrand(repoRoot, text) {
  const normalized = String(text ?? '').toLowerCase();

  if (repoRoot === AGENTIFY_ROOT || normalized.includes('agentify')) {
    return 'Agentify AI';
  }

  if (normalized.includes('dv analytics') || normalized.includes('dv data')) {
    return 'DV Analytics';
  }

  return getRepoLabel(repoRoot);
}

function describePage(page) {
  switch (page) {
    case 'about':
      return 'Company mission, vision, leadership, and organizational information.';
    case 'services':
      return 'Enterprise AI, consulting, automation, and industry solution information.';
    case 'faqs':
      return 'Eligibility, admissions, LMS, placement, certification, and support guidance.';
    case 'blogs':
      return 'Thought leadership and blog content.';
    case 'enroll':
      return 'Admissions form flow and advisor-led enrollment context.';
    case 'contact':
      return 'Office addresses, email contacts, and phone numbers.';
    default:
      return 'Homepage and general cross-site information.';
  }
}

function getOwningRoot(filePath) {
  return filePath.startsWith(AGENTIFY_ROOT) ? AGENTIFY_ROOT : DV_ROOT;
}

function getRepoLabel(root) {
  return root === AGENTIFY_ROOT ? 'Agentify AI' : 'DV Analytics';
}

function normalizePage(page) {
  if (!page || typeof page !== 'string') {
    return 'home';
  }

  if (page.startsWith('course-')) {
    return 'course';
  }

  if (page.startsWith('enroll-')) {
    return 'enroll';
  }

  return page.toLowerCase();
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .map((item) => ({
      role: item?.role === 'assistant' ? 'assistant' : 'user',
      content: sanitizeText(item?.content ?? ''),
    }))
    .filter((item) => item.content)
    .slice(-MAX_HISTORY);
}

function buildKeywordHints(values) {
  const tokens = values.flatMap((value) => tokenize(value));
  return [...new Set(tokens)].slice(0, 40);
}

function tokenize(value) {
  return sanitizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9+\- ]+/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

function overlapRatio(left, right) {
  if (!left.size || !right.size) {
    return 0;
  }

  let overlap = 0;
  for (const token of left) {
    if (right.has(token)) {
      overlap += 1;
    }
  }

  return overlap / Math.max(left.size, 1);
}

function cosineSimilarity(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
    return 0;
  }

  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index];
    leftMagnitude += left[index] * left[index];
    rightMagnitude += right[index] * right[index];
  }

  if (!leftMagnitude || !rightMagnitude) {
    return 0;
  }

  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

function looksLikeQuestion(text) {
  const normalized = sanitizeText(text);
  return normalized.endsWith('?') || /^(who|what|when|where|why|how|can|do|does|is|are)\b/i.test(normalized);
}

function isMeaningfulLiteral(text) {
  if (!text || text.length < 8 || text.length > 900) {
    return false;
  }

  if (/^[a-z0-9-_/.:]+$/i.test(text) && !/\s/.test(text)) {
    return false;
  }

  if (/^(https?:|mailto:|tel:|\/|\.\/|\.\.\/)/i.test(text)) {
    return false;
  }

  if (!/[a-z]/i.test(text)) {
    return false;
  }

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 2 && !/\d{3,}/.test(text)) {
    return false;
  }

  const codeLike = ['className', 'useState', 'onClick', 'React.FC', 'aria-label', 'container', 'button'];
  return !codeLike.some((item) => text.includes(item));
}

function unescapeLiteral(text) {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, ' ')
    .replace(/\\t/g, ' ')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\`/g, '`');
}

function dedupePreserveOrder(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }

  return result;
}

function sanitizeText(value) {
  return String(value ?? '')
    .replace(/Ã¢â‚¬â€|â€”/g, ' - ')
    .replace(/Ã¢â‚¬â€œ|–/g, ' - ')
    .replace(/Ã¢â‚¬Ëœ|Ã¢â‚¬â„¢|’/g, "'")
    .replace(/Ã¢â‚¬Å“|Ã¢â‚¬Â|“|”/g, '"')
    .replace(/Â©/g, '©')
    .replace(/â€™/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€¢/g, '•')
    .replace(/\s+/g, ' ')
    .trim();
}

function humanizeFileName(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(text, phrases) {
  return phrases.some((phrase) => matchesPhrase(text, phrase));
}

function matchesPhrase(text, phrase) {
  const escaped = String(phrase)
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s+/g, '\\s+');

  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i').test(String(text));
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}
