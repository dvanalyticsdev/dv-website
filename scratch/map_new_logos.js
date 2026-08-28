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
    let logo = item.logo;
    const company = item.company.toUpperCase().trim();

    if (company === "PAYPAL") {
      logo = "/companies/paypal.svg";
    } else if (company === "ANZ") {
      logo = "/companies/anz.svg";
    } else if (company === "HDFC ERGO") {
      logo = "/companies/hdfcergo.svg";
    } else if (company === "E&Y" || company === "EY" || company.includes("ERNST")) {
      logo = "/companies/ey.svg";
    }

    return {
      ...item,
      logo
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
  console.log("Successfully mapped new logos in alumniData.ts.");
} catch (e) {
  console.error("Mapping failed:", e.message);
}
