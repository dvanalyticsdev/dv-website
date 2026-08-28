import xlsx from 'xlsx';

const excelPath = "C:\\Users\\pushk\\Downloads\\ALUMNI DETAILS.xlsx";

try {
  const workbook = xlsx.readFile(excelPath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = xlsx.utils.sheet_to_json(worksheet);
  
  console.log(`Found ${rawRows.length} rows in the sheet.`);
  console.log("First 5 rows:", rawRows.slice(0, 5));
  console.log("\nLast 5 rows:", rawRows.slice(-5));
  
  console.log("\nList of all ALUMNI names:");
  rawRows.forEach((r, idx) => {
    console.log(`${idx + 1}. Name: "${r['ALUMNI']}" | Company: "${r['COMPANY']}" | Qual: "${r['EDUCATION QUALIFICATION']}"`);
  });
} catch (e) {
  console.error("Failed to inspect Excel:", e.message);
}
