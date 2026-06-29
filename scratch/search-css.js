import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('src/index.css');
if (fs.existsSync(cssPath)) {
  const content = fs.readFileSync(cssPath, 'utf8');
  const lines = content.split('\n');
  console.log('Searching for chatbot CSS rules:');
  lines.forEach((line, idx) => {
    if (line.includes('chatbot-') || line.includes('chatbot-shell') || line.includes('chatbot-body') || line.includes('chatbot-main') || line.includes('chatbot-side-panel')) {
      console.log(`${idx + 1}: ${line}`);
    }
  });
} else {
  console.log('CSS file not found');
}
