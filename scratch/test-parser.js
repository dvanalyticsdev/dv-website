import mammoth from 'mammoth';
import path from 'path';

const docxPath = "C:\\Users\\pushk\\Downloads\\blogsfromdvwebsiteoldtobepublishedonnewwebsiteo\\A Day in the Life_Data Analyst vs Data Scientist vs Data Engineer.docx";

mammoth.extractRawText({ path: docxPath })
  .then((result) => {
    console.log("=== RAW TEXT ===");
    console.log(result.value.substring(0, 2000));
  })
  .catch((err) => {
    console.error(err);
  });
