import fs from 'fs';
import path from 'path';

const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";
const companiesDir = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public\\companies";

const domainMap = {
  "cba": "commbank.com.au",
  "cba service pvt ltd": "commbank.com.au",
  "first citizens india": "firstcitizens.com",
  "kenvue": "kenvue.com",
  "advanced financial solutions": "afsol.com",
  "paysecure": "paysecure.io",
  "google": "google.com",
  "mufg": "mufgamericas.com",
  "mufg global services (mgs)": "mufgamericas.com",
  "jpmc": "jpmorgan.com",
  "altimetrik": "altimetrik.com",
  "cars24": "cars24.com",
  "luxoft (dxe)": "luxoft.com",
  "sigmoid analytics": "sigmoid.com",
  "switzgroup": "switzgroup.com",
  "cigna healthcare": "cigna.com",
  "dentsu": "dentsu.com",
  "genpact india pvt.ltd": "genpact.com",
  "osb india": "onesavingsbank.co.uk"
};

const getLocalLogo = (companyClean) => {
  if (companyClean.includes("wells fargo")) {
    return "/companies/wellsfargo.svg";
  }
  if (companyClean.includes("hsbc")) {
    return "/companies/hsbc.svg";
  }
  if (companyClean.includes("ibm")) {
    return "/companies/ibm.svg";
  }
  // Exclude "citizens" from matching "citi"
  if (companyClean.includes("citi") && !companyClean.includes("citizen")) {
    return "/companies/citi.svg";
  }
  if (companyClean.includes("tech mahindra")) {
    return "/companies/techmahindra.svg";
  }
  return null;
};

async function downloadLogo(domain, filename) {
  const targetPath = path.join(companiesDir, filename);
  if (fs.existsSync(targetPath)) {
    console.log(`Logo already exists: ${filename}`);
    return `/companies/${filename}`;
  }

  // Try Clearbit first
  const clearbitUrl = `https://logo.clearbit.com/${domain}`;
  try {
    const res = await fetch(clearbitUrl);
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(targetPath, buffer);
      console.log(`Downloaded Clearbit logo for ${domain} -> ${filename}`);
      return `/companies/${filename}`;
    }
  } catch (e) {
    console.warn(`Clearbit fetch failed for ${domain}:`, e.message);
  }

  // Fallback to Google Favicon
  const googleFaviconUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  try {
    const res = await fetch(googleFaviconUrl);
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(targetPath, buffer);
      console.log(`Downloaded Google Favicon logo for ${domain} -> ${filename}`);
      return `/companies/${filename}`;
    }
  } catch (e) {
    console.warn(`Google Favicon fetch failed for ${domain}:`, e.message);
  }

  return '';
}

async function processLogos() {
  try {
    if (!fs.existsSync(companiesDir)) {
      fs.mkdirSync(companiesDir, { recursive: true });
    }

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

    console.log("Processing company logos...");

    const updatedAlumni = [];

    for (const item of alumniList) {
      const companyClean = item.company.toLowerCase().trim();
      let logoPath = '';

      // 1. Check local logos
      const localPath = getLocalLogo(companyClean);
      if (localPath) {
        logoPath = localPath;
        console.log(`Matched Local Logo: ${item.company} -> ${logoPath}`);
      } else {
        // 2. Try download
        let domain = '';
        for (const [key, value] of Object.entries(domainMap)) {
          if (companyClean.includes(key)) {
            domain = value;
            break;
          }
        }

        if (domain) {
          const cleanFilename = `${domain.replace(/\.[a-z]{2,}/g, '')}.png`;
          logoPath = await downloadLogo(domain, cleanFilename);
        } else {
          // Guess domain
          const simpleDomain = `${companyClean.replace(/[^a-z0-9]/g, '')}.com`;
          const cleanFilename = `${simpleDomain.replace('.com', '')}.png`;
          console.log(`Guessing domain for ${item.company} -> ${simpleDomain}`);
          logoPath = await downloadLogo(simpleDomain, cleanFilename);
        }
      }

      updatedAlumni.push({
        name: item.name,
        company: item.company,
        qualification: item.qualification,
        linkedin: item.linkedin,
        image: item.image,
        objectPosition: item.objectPosition,
        isFormal: item.isFormal,
        logo: logoPath || null
      });
    }

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

export const alumniData: Alumni[] = ${JSON.stringify(updatedAlumni, null, 2)};
`;

    fs.writeFileSync(dataFilePath, tsContent);
    console.log("\nLogo integration complete!");
  } catch (error) {
    console.error("Failed to process logos:", error);
  }
}

processLogos();
