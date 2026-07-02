const fs = require('fs');
const buffer = fs.readFileSync('public/course-hero/Advance AIML.jpeg');
console.log('Hex headers:', buffer.slice(0, 16).toString('hex'));
