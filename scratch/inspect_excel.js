import fs from 'fs';
const picturesDir = "C:\\Users\\pushk\\Downloads\\ALUMNI PICTURES-20260827T105348Z-1-001\\ALUMNI PICTURES";
const files = fs.readdirSync(picturesDir);
console.log("Number of files in pictures directory:", files.length);
console.log("Files:", files);
