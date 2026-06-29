import { createChatResponse } from '../server/chatbotApi.mjs';

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const body = normalizeBody(req.body);
    const result = await createChatResponse(body);
    res.status(result.statusCode).json(result.payload);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown chatbot server error.',
    });
  }
}

function normalizeBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      throw new Error('Invalid JSON body.');
    }
  }

  return body;
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
