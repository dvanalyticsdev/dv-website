import fs from 'fs';
import path from 'path';

const publicDir = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public";
const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";

async function run() {
  try {
    // 1. Overwrite Wells Fargo logo with the red PNG version
    const srcLogo = path.join(publicDir, "company-logos", "wells fargo.png");
    const destLogo = path.join(publicDir, "companies", "wellsfargo.png");
    
    if (fs.existsSync(srcLogo)) {
      fs.copyFileSync(srcLogo, destLogo);
      console.log("Successfully overwrote Wells Fargo logo with red PNG version.");
    } else {
      console.error("Red Wells Fargo logo not found in public/company-logos.");
    }

    // 2. Read alumniData.ts
    let fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const marker = " = [";
    const markerIdx = fileContent.indexOf(marker);
    if (markerIdx === -1) {
      throw new Error("Could not find array marker.");
    }
    
    const arrayStart = markerIdx + marker.length - 1;
    const arrayEnd = fileContent.lastIndexOf(']') + 1;
    const jsonStr = fileContent.substring(arrayStart, arrayEnd);
    
    const alumniList = JSON.parse(jsonStr);

    // Update records
    const updatedList = alumniList.map(item => {
      let isFormal = item.isFormal;
      let logo = item.logo;

      // Force Rajender Nagpal to be formal so he sorts to the top
      if (item.name.toLowerCase().trim().includes("rajender nagpal")) {
        isFormal = true;
        console.log(`Setting Dr. Rajender Nagpal isFormal to true.`);
      }

      // Point Wells Fargo to the PNG logo
      if (item.company.toLowerCase().trim().includes("wells fargo")) {
        logo = "/companies/wellsfargo.png";
      }

      return {
        ...item,
        isFormal,
        logo
      };
    });

    // Re-sort: Formals (including Dr. Rajender Nagpal) first
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
  transform?: string;
}

export const alumniData: Alumni[] = ${JSON.stringify(updatedList, null, 2)};
`;

    fs.writeFileSync(dataFilePath, tsContent);
    console.log("Successfully updated and sorted alumniData.ts.");
  } catch (e) {
    console.error("Sorting/Logo script failed:", e.message);
  }
}

run();
