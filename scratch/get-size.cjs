const fs = require('fs');
const path = require('path');

function getJpegSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  let i = 4;
  while (i < buffer.length) {
    const marker = buffer.readUInt16BE(i);
    const length = buffer.readUInt16BE(i + 2);
    if (marker === 0xFFC0 || marker === 0xFFC2) {
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    i += length + 2;
  }
  throw new Error('Not a valid JPEG or dimensions not found');
}

try {
  const filePath = path.resolve('public/course-hero/Advance AIML.jpeg');
  const size = getJpegSize(filePath);
  console.log(`Dimensions for Advance AIML.jpeg: Width = ${size.width}px, Height = ${size.height}px`);
} catch (err) {
  console.error(err);
}
