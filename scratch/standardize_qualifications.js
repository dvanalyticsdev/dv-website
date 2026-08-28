import fs from 'fs';

const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";

const qualificationMap = {
  "FPM (Phd)": "PH.D (FPM)",
  "Bachelors in Technology": "B.TECH",
  "Btech IIT Roorkee": "B.TECH, IIT ROORKEE",
  "B.E Computer Science and Engineering": "B.E. COMPUTER SCIENCE & ENGINEERING",
  "B.Tech, Vssut Burla": "B.TECH, VSSUT BURLA",
  "BTech,MBA in Finance": "B.TECH, MBA (FINANCE)",
  "BTech Mechanical": "B.TECH (MECHANICAL)",
  "B.Tech (Mechanical Engineering)": "B.TECH (MECHANICAL ENGINEERING)",
  "MBA": "MBA",
  "Bachelor of Mechanical Engineering": "B.E. (MECHANICAL ENGINEERING)",
  "BTech": "B.TECH",
  "Business Strategy and Anlytics, MBA Finance": "MBA (FINANCE), BUSINESS STRATEGY & ANALYTICS",
  "MTech": "M.TECH",
  "ITER": "B.TECH (ITER)",
  "Btech, MBA": "B.TECH, MBA",
  "Edu Qualification-MBA": "MBA",
  "Masters in science, Odisha": "M.SC. (SCIENCE), ODISHA",
  "MTech, West Bengal": "M.TECH, WEST BENGAL",
  "MBA, Odisha": "MBA, ODISHA",
  "B.E ( Mechanical engineering)": "B.E. (MECHANICAL ENGINEERING)",
  "B.Tech in EEE": "B.TECH (EEE)",
  "BE, Mtech": "B.E., M.TECH",
  "Masters in Engineering (Applied Electronics)": "M.E. (APPLIED ELECTRONICS)",
  "B.E": "B.E.",
  "Bsc.physics": "B.SC. (PHYSICS)",
  "masters in physiotherapy": "M.PT. (PHYSIOTHERAPY)",
  "B.Com": "B.COM",
  "B.Tech": "B.TECH",
  "Masters in Computer science": "M.SC. (COMPUTER SCIENCE)",
  "Education Mtech": "M.TECH"
};

try {
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

  const updatedList = alumniList.map(item => {
    // 1. Clean qualification
    let qualClean = item.qualification;
    const trimmedQual = item.qualification.trim();
    if (qualificationMap[trimmedQual]) {
      qualClean = qualificationMap[trimmedQual];
    }

    return {
      ...item,
      name: item.name.toUpperCase(),
      company: item.company.toUpperCase(),
      qualification: qualClean.toUpperCase()
    };
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
  console.log("Successfully standardized all education qualification fields and names to uppercase.");
} catch (e) {
  console.error("Standardization failed:", e.message);
}
