import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import * as cheerio from 'cheerio';

const blogsDir = "C:\\Users\\pushk\\Downloads\\blogsfromdvwebsiteoldtobepublishedonnewwebsiteo";

async function inspect() {
  const files = fs.readdirSync(blogsDir);
  const docxFiles = files.filter(f => f.endsWith('.docx'));
  console.log(`Found ${docxFiles.length} docx files.`);

  for (const file of docxFiles) {
    const fullPath = path.join(blogsDir, file);
    try {
      const { value: html } = await mammoth.convertToHtml({ path: fullPath });
      const $ = cheerio.load(html);
      
      // The first element might be the title
      const pElements = $('p').toArray();
      let title = "";
      if (pElements.length > 0) {
        title = $(pElements[0]).text().trim();
      }
      
      // Let's check for author. Sometimes it is like "By Debendra D Das" or similar.
      let author = "DV Editorial Team";
      const text = $.text();
      const authorMatch = text.match(/by\s+([A-Za-z\s]+)/i);
      if (authorMatch) {
        // Simple heuristic
        const candidate = authorMatch[1].trim();
        if (candidate.length > 3 && candidate.length < 30 && !candidate.toLowerCase().includes('the') && !candidate.toLowerCase().includes('data')) {
          author = candidate;
        }
      }
      
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      const readTime = `${Math.ceil(wordCount / 200)} min read`;
      
      console.log(`\n----------------------------------------`);
      console.log(`File: ${file}`);
      console.log(`Title: ${title}`);
      console.log(`Word Count: ${wordCount} (${readTime})`);
      console.log(`Inferred Author: ${author}`);
      
      // Show some headings (bold paragraphs)
      const boldParagraphs = [];
      $('p strong').each((i, el) => {
        const parent = $(el).parent();
        // If parent is just p and the whole content is strong, it's likely a heading
        if (parent.is('p') && parent.text().trim() === $(el).text().trim()) {
          boldParagraphs.push($(el).text().trim());
        }
      });
      console.log(`Headings found: ${boldParagraphs.slice(0, 5).join(' | ')}...`);
    } catch (e) {
      console.error(`Error parsing ${file}:`, e);
    }
  }
}

inspect();
