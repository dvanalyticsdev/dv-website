import xlsx from 'xlsx';
import { alumniData } from '../src/data/alumniData.ts';

const excelPath = "C:\\Users\\pushk\\Downloads\\ALUMNI DETAILS.xlsx";

try {
  const workbook = xlsx.readFile(excelPath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = xlsx.utils.sheet_to_json(worksheet);

  console.log("Names in Excel not in alumniData.ts:");
  rawRows.forEach((row, idx) => {
    const excelName = (row['ALUMNI'] || '').trim().toLowerCase();
    
    // Check if there is any match in alumniData
    const found = alumniData.find(a => {
      const dbName = a.name.toLowerCase();
      return dbName.includes(excelName) || excelName.includes(dbName);
    });

    if (!found) {
      console.log(`- [Row ${idx+1}] Excel Name: "${row['ALUMNI']}" | Company: "${row['COMPANY']}" | Qual: "${row['EDUCATION QUALIFICATION']}"`);
    }
  });
} catch (e) {
  console.error("Failed to compare:", e.message);
}
