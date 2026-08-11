import mammoth from 'mammoth';

const docxPath = "C:\\Users\\pushk\\Downloads\\blogsfromdvwebsiteoldtobepublishedonnewwebsiteo\\A Day in the Life_Data Analyst vs Data Scientist vs Data Engineer.docx";

mammoth.convertToHtml({ path: docxPath })
  .then((result) => {
    console.log("=== HTML ===");
    console.log(result.value.substring(0, 4000));
  })
  .catch((err) => {
    console.error(err);
  });
