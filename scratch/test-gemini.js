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
const MODEL = process.env.GEMINI_MODEL ?? 'gemini-3.5-flash';

console.log('API Key configured:', Boolean(API_KEY));
console.log('Model from env:', MODEL);

async function testModel(modelName) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
  const start = Date.now();
  console.log(`\nTesting model: ${modelName}...`);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: 'Hello! Just say hi.' }],
          },
        ],
      }),
    });
    
    const duration = Date.now() - start;
    console.log(`Status: ${response.status} (took ${duration}ms)`);
    
    const data = await response.json();
    if (!response.ok) {
      console.error('Error details:', JSON.stringify(data, null, 2));
    } else {
      console.log('Success response:', data.candidates?.[0]?.content?.parts?.[0]?.text);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

async function run() {
  await testModel(MODEL);
  await testModel('gemini-1.5-flash');
  await testModel('gemini-2.0-flash');
}

run();
