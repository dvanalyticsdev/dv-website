import { buildContextText, buildRecommendationGuidance, getKnowledgeContext } from './chatbotKnowledge.mjs';

function getModel() {
  return process.env.GEMINI_MODEL ?? 'gemini-3.1-flash-lite';
}

export function buildHealthPayload() {
  return {
    ok: true,
    model: getModel(),
    configured: Boolean(process.env.GEMINI_API_KEY),
  };
}

export async function createChatResponse({ message, page, courseContext, history }) {
  const trimmedMessage = String(message ?? '').trim();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Server is missing GEMINI_API_KEY. Add it to your environment before starting the chatbot server.');
  }

  if (!trimmedMessage) {
    return {
      statusCode: 400,
      payload: { error: 'Message is required.' },
    };
  }

  const safeHistory = Array.isArray(history) ? history.slice(-8) : [];
  const context = getKnowledgeContext({
    page,
    courseId: courseContext,
    message: trimmedMessage,
  });
  const guidance = buildRecommendationGuidance({
    message: trimmedMessage,
    history: safeHistory,
  });

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
        currentCourse: context.currentCourse?.id ?? null,
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
        temperature: 0.4,
        topP: 0.9,
        maxOutputTokens: 420,
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
    return 'I could not generate a grounded response just now. Please try again with a more specific course or career question.';
  }

  return normalizeAssistantAnswer(answer);
}

function buildSystemInstruction({ page, contextText, guidance }) {
  const recommendationGuidanceText = guidance?.recommendation?.course
    ? [
        `Preferred recommendation: ${guidance.recommendation.course.title}`,
        `Why this is preferred: ${guidance.recommendation.reason}`,
      ].join('\n')
    : 'No strong recommendation guidance inferred from the conversation yet.';

  return [
    'You are Eva, the intelligent, warm, and highly professional AI Website Assistant and Guide for Agentify AI.',
    'Your personality is encouraging, tech-savvy, supportive, and clear. You should sound like a helpful career mentor and smart site guide who is passionate about helping students and enterprises understand our training programs, enterprise AI services, and mission.',
    'Always introduce yourself as Eva when greeted.',
    'Your purpose is to answer questions about the entire website including programs, services, mission, benefits, learning paths, contact points, and likely-fit courses.',
    'You must only answer using the provided knowledge context and reasonable inferences from it.',
    'If details like fees, exact schedules, or final admissions steps are not in the context, clearly say that a human team member should handle those details directly.',
    'Never enroll a user, never collect payment info, never promise counselor escalation, and never claim to confirm admission.',
    'Keep answers concise, helpful, and easy to scan. Use short paragraphs or a very short bullet list only when useful.',
    'When recommending a course, explain why it seems to fit the user goal.',
    'For course-fit questions, be decisive and name one best-fit course first unless the user asked for a comparison.',
    'If the recommendation guidance says a beginner or business-background user wanting Generative AI or Agentic AI should start with AIML, follow that guidance unless the user clearly states they already have a technical AI foundation.',
    'Avoid broken markdown and incomplete sentences. Respond in plain, polished English.',
    'Do not use markdown markers such as **, *, -, or # for formatting. If you need a list, write short plain-text lines without markdown decoration.',
    'If the user asks about services, office locations, leadership, LMS, roadmaps, or student success, answer from the site context instead of only talking about courses.',
    'Be warm, professional, and conversational. If the user greets you (for example, hi, hello, or hey), respond with a friendly welcome, state your role as the website assistant, and briefly mention what they can ask you about.',
    '',
    `Page context: ${page ?? 'unknown'}`,
    '',
    'Recommendation guidance:',
    recommendationGuidanceText,
    '',
    'Knowledge context:',
    contextText,
  ].join('\n');
}

function buildSuggestions(context) {
  if (context.currentCourse) {
    return [
      'What will I learn in this program?',
      'Who is this program best for?',
      'What career roles does this course prepare me for?',
    ];
  }

  if (context.page === 'services') {
    return [
      'What enterprise AI services do you offer?',
      'What are agentic AI solutions here?',
      'Which industries do you serve?',
    ];
  }

  if (context.page === 'about') {
    return [
      'What is AgentifyAI Global about?',
      'What are the mission pillars?',
      'Who leads the organization?',
    ];
  }

  if (context.page === 'faqs') {
    return [
      'Who can join these programs?',
      'Do I need programming experience?',
      'What placement support is available?',
    ];
  }

  return [
    'Which course fits my background?',
    'Compare Data Science and Analytics programs',
    'What services does the site offer?',
  ];
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
