import fs from 'fs';
import path from 'path';

const downloadsDir = "C:\\Users\\pushk\\Downloads";
const targetPicturesDir = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public\\alumni-pictures";
const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";

const newAlumni = [
  {
    name: "Saishyam Mohanty",
    company: "HSBC",
    qualification: "Masters in science, Odisha",
    linkedin: "https://www.linkedin.com/in/saishyammohanty/",
    image: "/alumni-pictures/saishyam-mohanty.jpeg",
    logo: "/companies/hsbc.svg",
    isFormal: true,
    objectPosition: "center 15%"
  },
  {
    name: "Debopriya Talukdar",
    company: "Wells Fargo",
    qualification: "MTech, West Bengal",
    linkedin: "https://www.linkedin.com/in/debopriya-talukdar-b2185520a",
    image: "/alumni-pictures/debopriya-talukdar.jpeg",
    logo: "/companies/wellsfargo.svg",
    isFormal: true,
    objectPosition: "center 15%"
  }
];

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
    // 1. Copy images
    console.log("Copying image assets...");
    copyImage("WhatsApp Image 2026-08-27 at 6.16.42 PM.jpeg", "saishyam-mohanty.jpeg");
    copyImage("WhatsApp Image 2026-08-27 at 6.18.21 PM.jpeg", "debopriya-talukdar.jpeg");
    copyImage("WhatsApp Image 2026-08-27 at 6.15.48 PM.jpeg", "raj-birje.jpeg");

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

    // Update Raj Birje's object position to standard since his photo is updated
    const updatedList = alumniList.map(item => {
      if (item.name.toLowerCase().trim().includes("raj birje")) {
        return {
          ...item,
          objectPosition: "center 15%" // standard centering for updated photo
        };
      }
      return item;
    });

    // Add new ones
    newAlumni.forEach(newItem => {
      // Check if already exists to avoid duplicates
      const exists = updatedList.some(x => x.name.toLowerCase().trim() === newItem.name.toLowerCase().trim());
      if (!exists) {
        updatedList.push(newItem);
        console.log(`Adding new record: ${newItem.name}`);
      } else {
        console.log(`Record for ${newItem.name} already exists. Skipping.`);
      }
    });

    // Re-sort: Formals first, then Casuals
    updatedList.sort((a, b) => {
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
}

export const alumniData: Alumni[] = ${JSON.stringify(updatedList, null, 2)};
`;

    fs.writeFileSync(dataFilePath, tsContent);
    console.log(`Successfully updated ${dataFilePath} with new records.`);
  } catch (error) {
    console.error("Failed to add new alumni:", error);
  }
}

run();
