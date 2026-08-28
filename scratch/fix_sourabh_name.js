import fs from 'fs';

const dataFilePath = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\src\\data\\alumniData.ts";

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
    if (item.name.includes("SOURABH RAJENDRA JAGDALE")) {
      return {
        ...item,
        name: "SOURABH JAGDALE"
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
  transform?: string;
}

export const alumniData: Alumni[] = ${JSON.stringify(updatedList, null, 2)};
`;

  fs.writeFileSync(dataFilePath, tsContent);
  console.log("Successfully changed Sourabh's name to SOURABH JAGDALE.");
} catch (e) {
  console.error("Name change failed:", e.message);
}
