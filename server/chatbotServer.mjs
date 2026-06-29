import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { buildHealthPayload, createChatResponse } from './chatbotApi.mjs';

loadEnvFile();

const PORT = Number(process.env.CHATBOT_PORT ?? 8787);

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, buildHealthPayload());
    return;
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const result = await createChatResponse(body);
      sendJson(res, result.statusCode, result.payload);
    } catch (error) {
      sendJson(res, 500, {
        error: error instanceof Error ? error.message : 'Unknown chatbot server error.',
      });
    }

    return;
  }

  sendJson(res, 404, { error: 'Not found.' });
});

server.on('error', (error) => {
  if (error && typeof error === 'object' && 'code' in error && error.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Stop the process using that port or start the chatbot on another port with CHATBOT_PORT.`,
    );
    console.error(`Example: $env:CHATBOT_PORT=8788; npm run chatbot`);
    process.exit(1);
  }

  console.error('Chatbot server failed to start.', error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Chatbot API listening on http://localhost:${PORT}`);
});

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error('Request body too large.'));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });

    req.on('error', reject);
  });
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const contents = fs.readFileSync(envPath, 'utf8');

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}
