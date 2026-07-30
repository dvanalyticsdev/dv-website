import {
  buildContextText,
  buildHealthPayload as buildKnowledgeHealthPayload,
  buildRecommendationGuidance,
  detectBlockedBrandQuery,
  getKnowledgeContext,
  getSiteBrand,
} from './chatbotKnowledge.mjs';

function getModel() {
  return process.env.GEMINI_MODEL ?? 'gemini-3.1-flash-lite';
}

export function buildHealthPayload() {
  return {
    ...buildKnowledgeHealthPayload(),
    model: getModel(),
  };
}

export async function createChatResponse({ message, page, courseContext, history }) {
  const trimmedMessage = String(message ?? '').trim();

  if (!trimmedMessage) {
    return {
      statusCode: 400,
      payload: { error: 'Message is required.' },
    };
  }

  const safeHistory = Array.isArray(history) ? history.slice(-8) : [];
  const blockedBrand = detectBlockedBrandQuery(trimmedMessage);

  if (blockedBrand) {
    return {
      statusCode: 200,
      payload: {
        answer: `I can help only with ${getSiteBrand()} information on this website. I do not provide details about ${blockedBrand} here.`,
        suggestions: [
          'Which DV Analytics course fits my background?',
          'What services does DV Analytics offer?',
          'How can I contact DV Analytics?',
        ],
        meta: {
          model: 'site-scope-guard',
          page: page ?? null,
          currentCourse: null,
          intent: 'site-scope',
        },
      },
    };
  }

  const context = await getKnowledgeContext({
    page,
    courseId: courseContext,
    message: trimmedMessage,
    history: safeHistory,
  });
  const guidance = buildRecommendationGuidance({
    message: trimmedMessage,
    history: safeHistory,
  });

  const fallbackAnswer = buildDeterministicAnswer({
    message: trimmedMessage,
    context,
  });

  if (fallbackAnswer) {
    return {
      statusCode: 200,
      payload: {
        answer: fallbackAnswer,
        suggestions: buildSuggestions(context),
        meta: {
          model: 'deterministic-company-fallback',
          page: page ?? null,
          currentCourse: context.currentCourse?.idAlias ?? null,
          intent: context.intent.label,
          knowledgeStats: context.knowledgeStats,
        },
      },
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Server is missing GEMINI_API_KEY. Add it to your environment before starting the chatbot server.');
  }

  const answer = await queryGemini({
    apiKey,
    message: trimmedMessage,
    page,
    history: safeHistory,
    contextText: buildContextText(context),
    guidance,
  });

  return {
    statusCode: 200,
    payload: {
      answer,
      suggestions: buildSuggestions(context),
      meta: {
        model: getModel(),
        page: page ?? null,
        currentCourse: context.currentCourse?.idAlias ?? null,
        intent: context.intent.label,
        knowledgeStats: context.knowledgeStats,
      },
    },
  };
}

async function queryGemini({ apiKey, message, page, history, contextText, guidance }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${getModel()}:generateContent?key=${apiKey}`;
  const systemInstructionText = buildSystemInstruction({ page, contextText, guidance });

  const rawContents = [];

  if (Array.isArray(history)) {
    for (const item of history) {
      const contentStr = String(item.content ?? '').trim();
      if (!contentStr) continue;

      const role = item.role === 'assistant' ? 'model' : 'user';
      rawContents.push({
        role,
        parts: [{ text: contentStr }],
      });
    }
  }

  const lastMsg = rawContents[rawContents.length - 1];
  if (!lastMsg || lastMsg.role !== 'user') {
    rawContents.push({
      role: 'user',
      parts: [{ text: message }],
    });
  }

  const contents = [];
  let expectedRole = null;

  for (const msg of rawContents) {
    if (expectedRole === null) {
      contents.push(msg);
      expectedRole = msg.role === 'user' ? 'model' : 'user';
    } else if (msg.role === expectedRole) {
      contents.push(msg);
      expectedRole = msg.role === 'user' ? 'model' : 'user';
    } else {
      const prevMsg = contents[contents.length - 1];
      if (prevMsg) {
        prevMsg.parts[0].text += `\n${msg.parts[0].text}`;
      } else {
        contents.push(msg);
        expectedRole = msg.role === 'user' ? 'model' : 'user';
      }
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemInstructionText }],
      },
      generationConfig: {
        temperature: 0.25,
        topP: 0.9,
        maxOutputTokens: 480,
      },
      contents,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message ?? 'Gemini API request failed.');
  }

  const answer =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join('\n')
      .trim() ?? '';

  if (!answer) {
    return 'I could not generate a grounded response just now. Please try again with a more specific question.';
  }

  return normalizeAssistantAnswer(answer);
}

function buildSystemInstruction({ page, contextText, guidance }) {
  const recommendationText = guidance?.recommendation?.hint
    ? `Recommendation hint: ${guidance.recommendation.hint}`
    : 'Recommendation hint: none';

  return [
    'You are Eva, the AI website assistant for DV Analytics.',
    'You answer only from the supplied retrieved evidence and structured knowledge.',
    'If the answer is not clearly supported by the context, say so plainly and suggest contacting the human team instead of guessing.',
    'Never invent fees, scholarships, schedules, batches, admissions status, counselor commitments, or policies.',
    'Never answer with information about Agentify AI or any other company on this DV Analytics website.',
    'When the user asks a follow-up question, use conversation history plus the retrieved evidence to stay context-aware.',
    'When comparing programs or services, be decisive, practical, and specific.',
    'If the user greets you, introduce yourself as Eva and briefly mention the kinds of questions you can help with.',
    'Prefer short paragraphs. Use a short plain-text list only when it improves clarity.',
    'Do not use markdown bullets, headings, or decorative formatting.',
    'If the user asks for contact details, provide the exact address, phone, or email only when present in the evidence.',
    'If details are unavailable, say: "I do not see that detail in the available website content."',
    '',
    `Current page: ${page ?? 'unknown'}`,
    recommendationText,
    '',
    'Retrieved knowledge:',
    contextText,
  ].join('\n');
}

function buildSuggestions(context) {
  switch (context.intent.label) {
    case 'enterprise-services':
      return [
        'Which industries do you serve?',
        'Do you build enterprise knowledge assistants?',
        'What agentic AI solutions are available?',
      ];
    case 'contact':
      return [
        'What is the Bangalore office address?',
        'How can I contact the Bhubaneswar team?',
        'Which email should I use for admissions questions?',
      ];
    case 'company-info':
      return [
        'What is the company mission?',
        'Who are the leadership team members?',
        'What is DV Analytics focused on?',
      ];
    case 'admissions':
      return [
        'Who can join these programs?',
        'Do you offer EMI options?',
        'How does the enrollment process work?',
      ];
    default:
      return [
        'Which course fits my background?',
        'Compare Data Science and Analytics programs',
        'What services do you offer for enterprises?',
      ];
  }
}

function buildDeterministicAnswer({ message, context }) {
  const text = String(message ?? '').toLowerCase();

  if (context.intent.label !== 'company-info') {
    return null;
  }

  const profile =
    context.companyProfiles.find((item) => text.includes(item.brand.toLowerCase())) ??
    context.companyProfiles[0];

  if (!profile) {
    return null;
  }

  const descriptionLines = profile.highlights.filter((line) =>
    /leading|training|consulting|bridging the gap|empower|democratiz|education|corporate demands|industry-relevant|practical training|inclusive|ethical|autonomous intelligence/i.test(line),
  );
  const leadershipLines = profile.highlights.filter((line) =>
    /co-founder|director|lead|leader|team|ph\.d|iit|iimb/i.test(line),
  );
  const missionLines = profile.highlights.filter((line) =>
    /mission|vision|purpose|values|empower|democratiz|leading brand/i.test(line),
  );
  const descriptionText = dedupeText(descriptionLines).slice(0, 2).join(' ');
  const leadershipText = dedupeText(leadershipLines).slice(0, 3).join(' ');
  const missionText = dedupeText(missionLines).slice(0, 3).join(' ');

  if (includesAny(text, ['leadership', 'leader', 'founder', 'team', 'who leads', 'who are'])) {
    return `${profile.brand} leadership information on the site includes ${leadershipText || profile.summary}.`.trim();
  }

  if (includesAny(text, ['mission', 'vision', 'purpose', 'values'])) {
    return `${profile.brand} is described on the site as follows: ${missionText || descriptionText || profile.summary}`.trim();
  }

  return `${profile.brand} is described on the site as ${descriptionText || profile.summary}${leadershipText ? ` Leadership highlights include ${leadershipText}.` : '.'}`.trim();
}

function includesAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}

function dedupeText(lines) {
  return [...new Set(lines.map((line) => line.trim()).filter(Boolean))];
}

function normalizeAssistantAnswer(answer) {
  return answer
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^[ \t]*[*-][ \t]+/gm, '• ')
    .replace(/(?<!\S)\*(?!\s)/g, '')
    .replace(/^[ \t]*#{1,6}[ \t]*/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
