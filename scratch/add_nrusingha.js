import fs from 'fs';
import path from 'path';

const downloadsDir = "C:\\Users\\pushk\\Downloads";
const targetPicturesDir = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public\\alumni-pictures";
const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";

const newAlumnus = {
  name: "Nrusingha Nath kar",
  company: "Wells Fargo",
  qualification: "MBA, Odisha",
  linkedin: "https://www.linkedin.com/in/nrusingha-nath-kar-a897b333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  image: "/alumni-pictures/nrusingha-nath-kar.jpeg",
  logo: "/companies/wellsfargo.svg",
  isFormal: true,
  objectPosition: "center 15%",
  transform: "scale(1.25)" // Zoom in to crop out the LinkedIn #OpenToWork border
};

function copyImage(srcName, destName) {
  const srcPath = path.join(downloadsDir, srcName);
  const destPath = path.join(targetPicturesDir, destName);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied ${srcName} -> ${destName}`);
    return true;
  } else {
    console.error(`Source file not found: ${srcPath}`);
    return false;
  }
}

async function run() {
  try {
    // 1. Copy image
    copyImage("WhatsApp Image 2026-08-28 at 10.26.21 AM.jpeg", "nrusingha-nath-kar.jpeg");

    // 2. Read alumniData.ts
    let fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const marker = " = [";
    const markerIdx = fileContent.indexOf(marker);
    if (markerIdx === -1) {
      throw new Error("Could not find the JSON array start marker in the file.");
    }
    
    const arrayStart = markerIdx + marker.length - 1;
    const arrayEnd = fileContent.lastIndexOf(']') + 1;
    const jsonStr = fileContent.substring(arrayStart, arrayEnd);
    
    const alumniList = JSON.parse(jsonStr);

    // Add new one if not exists
    const exists = alumniList.some(x => x.name.toLowerCase().trim() === newAlumnus.name.toLowerCase().trim());
    if (!exists) {
      alumniList.push(newAlumnus);
      console.log(`Adding new record: ${newAlumnus.name}`);
    } else {
      console.log(`Record for ${newAlumnus.name} already exists. Skipping.`);
    }

    // Re-sort: Formals first, then Casuals
    alumniList.sort((a, b) => {
      if (a.isFormal && !b.isFormal) return -1;
      if (!a.isFormal && b.isFormal) return 1;
      return 0;
    });

    const tsContent = `export interface Alumni {
  name: string;
  company: string;
  qualification: string;
  linkedin: string;
  image: string;
  objectPosition?: string;
  isFormal?: boolean;
  logo: string | null;
  transform?: string;
}

export const alumniData: Alumni[] = ${JSON.stringify(alumniList, null, 2)};
`;

    fs.writeFileSync(dataFilePath, tsContent);
    console.log(`Successfully updated ${dataFilePath} with new record.`);
  } catch (error) {
    console.error("Failed to add Nrusingha Nath kar:", error);
  }
}

run();
