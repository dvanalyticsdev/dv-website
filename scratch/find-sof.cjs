const fs = require('fs');
const path = require('path');

const dir = 'public/course-hero';
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.statSync(filePath).isFile() && (file.endsWith('.jpeg') || file.endsWith('.jpg'))) {
    const buffer = fs.readFileSync(filePath);
    for (let i = 0; i < buffer.length - 8; i++) {
      if (buffer[i] === 0xFF && (buffer[i+1] === 0xC0 || buffer[i+1] === 0xC2)) {
        const height = buffer.readUInt16BE(i + 5);
        const width = buffer.readUInt16BE(i + 7);
        console.log(`${file}: ${width} x ${height} (SOF ${buffer[i+1].toString(16)})`);
        break;
      }
    }
  }
});
