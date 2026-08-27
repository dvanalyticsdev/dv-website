import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

const excelPath = "C:\\Users\\pushk\\Downloads\\ALUMNI DETAILS.xlsx";
const picturesDir = "C:\\Users\\pushk\\Downloads\\ALUMNI PICTURES-20260827T105348Z-1-001\\ALUMNI PICTURES";
const targetDir = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public\\alumni-pictures";
const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";

try {
  // Make sure target dir exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const workbook = xlsx.readFile(excelPath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = xlsx.utils.sheet_to_json(worksheet);
  const pictureFiles = fs.readdirSync(picturesDir);

  const cleanName = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const toKebabCase = (name) => name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

  const manualMatches = {
    "dr. rajender nagpal": "DR. RAJENDRA NAGPAL.jpeg",
    "rishi pateriya": "RISHI PATERIA.jpeg",
    "barun behera": "BARUN BEHRA.jpeg",
    "arjun rajendran": "ARJUN RADENDRAN.jpeg"
  };

  const alumniList = rawRows.map(row => {
    const name = (row['ALUMNI'] || '').trim();
    const company = (row['COMPANY'] || '').trim();
    const qualification = (row['EDUCATION QUALIFICATION'] || '').trim();
    const linkedin = (row['Linkedin ID '] || '').trim();
    
    let matchedPicture = manualMatches[name.toLowerCase().trim()];
    
    if (!matchedPicture) {
      const cName = cleanName(name);
      matchedPicture = pictureFiles.find(file => {
        const cFile = cleanName(path.parse(file).name);
        return cFile === cName || cFile.includes(cName) || cName.includes(cFile);
      });
    }

    let finalImagePath = '';
    if (matchedPicture) {
      const origExt = path.extname(matchedPicture);
      const cleanFileName = `${toKebabCase(name)}${origExt}`;
      const srcPath = path.join(picturesDir, matchedPicture);
      const destPath = path.join(targetDir, cleanFileName);
      
      // Copy file
      fs.copyFileSync(srcPath, destPath);
      finalImagePath = `/alumni-pictures/${cleanFileName}`;
      console.log(`Copied: ${matchedPicture} -> ${cleanFileName}`);
    } else {
      console.warn(`Warning: No picture matched for ${name}`);
    }

    return {
      name,
      company,
      qualification,
      linkedin,
      image: finalImagePath
    };
  });

  // Write TS file
  const tsContent = `export interface Alumni {
  name: string;
  company: string;
  qualification: string;
  linkedin: string;
  image: string;
}

export const alumniData: Alumni[] = ${JSON.stringify(alumniList, null, 2)};
`;

  fs.writeFileSync(dataFilePath, tsContent);
  console.log(`\nSuccessfully wrote ${alumniList.length} alumni items to ${dataFilePath}`);

} catch (error) {
  console.error("Error running import:", error);
}
