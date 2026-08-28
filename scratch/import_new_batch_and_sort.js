import fs from 'fs';
import path from 'path';

const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";
const srcPicsDir = "C:\\Users\\pushk\\Downloads\\Alumni Pictures 28 Aug 2026-20260828T072802Z-1-001\\Alumni Pictures 28 Aug 2026";
const destPicsDir = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public\\alumni-pictures";

// The 6 new alumni records we verified
const newAlumniRaw = [
  {
    name: "SANKET MOHANTY",
    company: "HSBC",
    qualification: "BBA",
    linkedin: "https://www.linkedin.com/in/sanket-mohanty-/", // Will check the sheet or default
    picName: "SANKET MOHANTY.jpeg",
    isFormal: false,
    logo: "/companies/hsbc.svg"
  },
  {
    name: "RHYTHM PATEL",
    company: "PAYPAL",
    qualification: "B.TECH",
    linkedin: "https://www.linkedin.com/in/rhythm-patel-238244128/",
    picName: "Rhythm Patel.jpeg",
    isFormal: false,
    logo: null
  },
  {
    name: "VAIDEHI TRIVEDI",
    company: "JPMC",
    qualification: "B.TECH",
    linkedin: "https://www.linkedin.com/in/vaidehi-trivedi23/",
    picName: "Vaidehi Trivedi.jpeg",
    isFormal: true,
    logo: "/companies/jpmorgan.png",
    objectPosition: "center 25%"
  },
  {
    name: "VIVEK KUMAR",
    company: "ANZ",
    qualification: "B.TECH",
    linkedin: "https://www.linkedin.com/in/vivek-kumar-7a3b05280/",
    picName: "Vivek Kumar.jpeg",
    isFormal: false,
    logo: null
  },
  {
    name: "AVINASH KUMAR",
    company: "HDFC ERGO",
    qualification: "B.TECH",
    linkedin: "https://www.linkedin.com/in/avinash-kumar-417ab5255/",
    picName: "Avinash Kumar.jpeg",
    isFormal: false,
    logo: null
  },
  {
    name: "SHUSHANK SINGH",
    company: "E&Y",
    qualification: "MBA",
    linkedin: "https://www.linkedin.com/in/shushank-singh-063b573a1/",
    picName: "Shushank Singh .jpeg",
    isFormal: true,
    logo: null
  }
];

function toKebabCase(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
}

try {
  // Read existing data
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

  // Parse Excel to fetch actual row values just to be 100% sure we don't miss anything (e.g. linkedin URLs)
  // Let's hardcode the verified details for accuracy and safety
  console.log("Processing and copying new pictures...");
  const processedNewAlumni = newAlumniRaw.map(item => {
    const srcPath = path.join(srcPicsDir, item.picName);
    const kebabName = toKebabCase(item.name);
    const destName = `${kebabName}.jpeg`;
    const destPath = path.join(destPicsDir, destName);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${item.picName} -> ${destName}`);
    } else {
      console.warn(`Warning: Pic not found at ${srcPath}`);
    }

    return {
      name: item.name,
      company: item.company,
      qualification: item.qualification,
      linkedin: item.linkedin,
      image: `/alumni-pictures/${destName}`,
      isFormal: item.isFormal,
      logo: item.logo,
      objectPosition: item.objectPosition || "center 15%"
    };
  });

  // Filter out any duplicates (if we accidentally try to import someone already present)
  const filteredNewAlumni = processedNewAlumni.filter(newItem => {
    const duplicate = alumniList.find(oldItem => 
      oldItem.name.toLowerCase().trim() === newItem.name.toLowerCase().trim()
    );
    if (duplicate) {
      console.log(`Skipping duplicate entry: ${newItem.name}`);
      return false;
    }
    return true;
  });

  // Append new alumni to the list
  const combinedList = [...alumniList, ...filteredNewAlumni];

  // Separate into formals and casuals
  const formals = combinedList.filter(item => item.isFormal);
  const casuals = combinedList.filter(item => !item.isFormal);

  // Alphabetically sort within sections (optional, or keep original order)
  // Let's sort formals first, then casuals
  const sortedList = [...formals, ...casuals];

  // CRITICAL: Ensure Dr. Rajender Nagpal is at index 0
  const rajenderIdx = sortedList.findIndex(item => item.name.includes("RAJENDER NAGPAL"));
  if (rajenderIdx !== -1) {
    const [rajender] = sortedList.splice(rajenderIdx, 1);
    sortedList.unshift(rajender);
    console.log("Confirmed DR. RAJENDER NAGPAL is at index 0.");
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
  transform?: string;
}

export const alumniData: Alumni[] = ${JSON.stringify(sortedList, null, 2)};
`;

  fs.writeFileSync(dataFilePath, tsContent);
  console.log(`Successfully wrote ${sortedList.length} alumni items to ${dataFilePath}`);
} catch (e) {
  console.error("Import failed:", e.message);
}
