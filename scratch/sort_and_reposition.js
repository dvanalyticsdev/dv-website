import fs from 'fs';

const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";

const formals = [
  "abinash mohapatra",
  "anuradha das",
  "arbaz khan",
  "chiranjeeb mahi",
  "dibya ranjan sahoo",
  "gayatri mohanty",
  "h n karthik",
  "harshagowda s",
  "padmini padhiary",
  "prabhanshu sahoo",
  "rishi pateriya",
  "sapan kumar parida",
  "sashank sekhar das",
  "sourabh rajendra jagdale",
  "tapan kumar parida",
  "vedant jogdand"
];

const customPositions = {
  "rishi pateriya": "center 8%",
  "harshagowda s": "center 10%",
  "dibya ranjan sahoo": "center 12%",
  "vedant jogdand": "center 10%",
  "h n karthik": "center 10%",
  "sapan kumar parida": "center 10%",
  "sashank sekhar das": "center 12%",
  "tapan kumar parida": "center 12%",
  "abinash mohapatra": "center 12%",
  "anuradha das": "center 12%",
  "gayatri mohanty": "center 15%",
  "padmini padhiary": "center 15%",
  "dr. rajender nagpal": "center 15%",
  "raj birje": "center 10%"
};

try {
  let fileContent = fs.readFileSync(dataFilePath, 'utf8');
  
  // Find " = [" to get the start of the array
  const marker = " = [";
  const markerIdx = fileContent.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error("Could not find the JSON array start marker in the file.");
  }
  
  const arrayStart = markerIdx + marker.length - 1; // index of '['
  const arrayEnd = fileContent.lastIndexOf(']') + 1;
  const jsonStr = fileContent.substring(arrayStart, arrayEnd);
  
  const alumniList = JSON.parse(jsonStr);
  
  const processed = alumniList.map(item => {
    const lowerName = item.name.toLowerCase().trim();
    
    // Check if formal
    const isFormal = formals.some(f => lowerName.includes(f));
    
    // Check custom position override
    let objectPosition = "center 15%";
    Object.keys(customPositions).forEach(key => {
      if (lowerName.includes(key)) {
        objectPosition = customPositions[key];
      }
    });

    return {
      name: item.name,
      company: item.company,
      qualification: item.qualification,
      linkedin: item.linkedin,
      image: item.image,
      objectPosition,
      isFormal
    };
  });

  // Sort: Formals first, then Casuals
  processed.sort((a, b) => {
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
}

export const alumniData: Alumni[] = ${JSON.stringify(processed, null, 2)};
`;

  fs.writeFileSync(dataFilePath, tsContent);
  console.log(`Successfully sorted and wrote ${processed.length} alumni items with positioning overrides.`);
} catch (error) {
  console.error("Sorting failed:", error);
}
