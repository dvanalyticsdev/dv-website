import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  const contents = fs.readFileSync(envPath, 'utf8');
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-3.1-flash-lite';

async function testSystemInstruction() {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const start = Date.now();
  console.log(`Testing native systemInstruction and contents with model: ${MODEL}...`);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            { text: 'You are the Agentify AI Guide. Answer in a friendly, conversational manner. Keep it short.' }
          ]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: 'Hi' }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
        }
      }),
    });
    
    const duration = Date.now() - start;
    const status = response.status;
    const data = await response.json();
    console.log(`Status: ${status} (took ${duration}ms)`);
    
    if (!response.ok) {
      console.error('Error details:', JSON.stringify(data, null, 2));
    } else {
      console.log('Success response:', data.candidates?.[0]?.content?.parts?.[0]?.text);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testSystemInstruction();
