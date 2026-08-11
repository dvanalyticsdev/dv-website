import fs from 'fs';
import path from 'path';

const blogsDir = "C:\\Users\\pushk\\Downloads\\blogsfromdvwebsiteoldtobepublishedonnewwebsiteo";

const files = fs.readdirSync(blogsDir);
const docxFiles = files.filter(f => f.endsWith('.docx'));
const imgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'));

console.log(`Docx Files (${docxFiles.length}):`);
docxFiles.forEach((f, i) => console.log(`${i+1}. ${f}`));

console.log(`\nImage Files (${imgFiles.length}):`);
imgFiles.forEach((f, i) => console.log(`${i+1}. ${f}`));

// Try simple heuristic mapping
const mapping = [];
const unmappedImages = [...imgFiles];

const wordMatchScore = (s1, s2) => {
  const words1 = s1.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(Boolean);
  const words2 = s2.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(Boolean);
  let matches = 0;
  for (const w of words1) {
    if (words2.includes(w)) matches++;
  }
  return matches / Math.max(words1.length, words2.length);
};

for (const docx of docxFiles) {
  const docxBase = path.basename(docx, '.docx');
  let bestImg = null;
  let bestScore = 0;
  
  for (const img of unmappedImages) {
    const imgBase = path.basename(img, path.extname(img));
    const score = wordMatchScore(docxBase, imgBase);
    if (score > bestScore) {
      bestScore = score;
      bestImg = img;
    }
  }
  
  // Specific checks or manual overrides if score is low
  mapping.push({ docx, img: bestImg, score: bestScore });
  if (bestImg) {
    const idx = unmappedImages.indexOf(bestImg);
    if (idx > -1) unmappedImages.splice(idx, 1);
  }
}

console.log("\n--- INFERRED MAPPING ---");
mapping.forEach((m, idx) => {
  console.log(`${idx+1}. Docx: "${m.docx}"\n   Image: "${m.img}" (score: ${m.score.toFixed(2)})`);
});

if (unmappedImages.length > 0) {
  console.log(`\nUnmapped images:`, unmappedImages);
}
