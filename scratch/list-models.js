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

async function listModels() {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  try {
    const response = await fetch(endpoint);
    console.log(`List models status: ${response.status}`);
    const data = await response.json();
    if (!response.ok) {
      console.error('Error listing models:', JSON.stringify(data, null, 2));
    } else {
      console.log('Available models:');
      const models = data.models || [];
      for (const m of models) {
        console.log(`- ${m.name} (${m.displayName}) - Supported Actions: ${m.supportedGenerationMethods.join(', ')}`);
      }
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

listModels();
