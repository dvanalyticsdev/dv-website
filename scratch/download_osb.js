import fs from 'fs';
import path from 'path';

const logoUrl = "https://logowik.com/content/uploads/images/osb-group3652.jpg";
const targetPath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public\\companies\\onesavingsbank.png";
const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";

async function downloadOsbLogo() {
  try {
    console.log(`Downloading OSB Group logo from ${logoUrl}...`);
    const res = await fetch(logoUrl);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(targetPath, buffer);
    console.log(`Successfully saved OSB logo to ${targetPath}`);

    // Now update alumniData.ts to assign this logo to OSB India
    let fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const marker = " = [";
    const markerIdx = fileContent.indexOf(marker);
    if (markerIdx === -1) {
      throw new Error("Could not find the JSON array start marker.");
    }
    
    const arrayStart = markerIdx + marker.length - 1;
    const arrayEnd = fileContent.lastIndexOf(']') + 1;
    const jsonStr = fileContent.substring(arrayStart, arrayEnd);
    
    const alumniList = JSON.parse(jsonStr);

    const updatedList = alumniList.map(item => {
      if (item.company.toLowerCase().trim().includes("osb india")) {
        return {
          ...item,
          logo: "/companies/onesavingsbank.png"
        };
      }
      return item;
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
    console.log("Updated alumniData.ts with the OSB India logo path.");
  } catch (error) {
    console.error("Failed to fetch OSB logo:", error.message);
  }
}

downloadOsbLogo();
