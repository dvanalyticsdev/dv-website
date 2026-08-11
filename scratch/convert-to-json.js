import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import * as cheerio from 'cheerio';

const blogsDir = "C:\\Users\\pushk\\Downloads\\blogsfromdvwebsiteoldtobepublishedonnewwebsiteo";

// 1-to-1 mapping definition
const docxToImgMap = {
  "A Day in the Life_Data Analyst vs Data Scientist vs Data Engineer.docx": "Data Analyst vs Data Scientist vs Data Engineer.jpg",
  "Bangalore vs Hyderabad vs Pune_Best Cities for AI and ML Careers in India.docx": "AIML careers_india city.jpg",
  "Bangalore_The Data Science Hub of India.docx": "BLR_DS Hub.png",
  "Can Generative AI Replace Entry Level Data Analysts.docx": "GenAIReplace_EntrylvlDA.jpg",
  "Common Interview Pitfalls for Mid Career Pivoters And How to Avoid Them.docx": "Interview pitfals_mcpivot.jpg",
  "Data Science Career Paths & Salary Trends in 2026 India.docx": "DS_CareerPath n Salary 2026.jpg",
  "Data Science Job Market in Bangalore 2026Trends, Employers and Skills Required.docx": "_DS Job Market.jpg",
  "Data Science with Agentic AI as a Career Path.docx": "AgenticAI_career.jpg",
  "Ethics and Governance_Why Responsible AI Is a Growing Career Path.docx": "Ethics & Governance.jpg",
  "From Non Tech to Data Pro_A Realistic 6 Month Roadmap.docx": "Non-Tech to Data Pro.jpg",
  "Gen AI and Agentic AI Must Have Skills for a High Paying Career Today.docx": "Gen_AgenticAI_jobs.jpg",
  "Gen AI and Agentic AI – The New Job Frontier.docx": "DS with GenAI_career path.jpg",
  "Gen AI versus Traditional DS.docx": "Gen AI vs Traditional DS.jpg",
  "How Bangalore Startups Are Using Gen AI and Agentic AI to Transform Business.docx": "genai&agenticai)Bluru startupsa.jpg",
  "How Data Science is being enhanced by Gen AI and Agentic AI.docx": "DS_enhns_AI.jpg",
  "How to start learning Gen AI & Agentic AI.docx": "learngen&agentic_AI.jpg",
  "Internship Opportunities for Data Analytics Students in Bangalore Startups.docx": "stu_interns_Blrstartups.jpg",
  "Portfolio Over Pedigree.docx": "Portfolio Blog_pic.jpg",
  "Switch Your Software Engineering Career to Data Science with Gen AI and Agentic AI.docx": "Switch from SoftEngg to DS&GenAI.jpg",
  "The 2026 Tech Stack_Which Tools Are Non Negotiable.docx": "2o26_TechStack.jpg",
  "The Biggest Mistake Career Switchers Make When Learning AI.docx": "career switchers mistake when learning AI.jpg",
  "The Rise of Tech Jobs in Bhubaneswar_Data Science and AI Outlook.docx": "DS JobsBBSRBlog_28Feb.jpg",
  "The ROI of a Data Science Certification_Is It Worth the Investment.docx": "DSCert_roi.jpg",
  "What Recruiters Actually Look for in a Fresher Data Science Resume.docx": "Recruiters look for what.jpg",
  "What to do after a Data Analytics Course in Bangalore.docx": "NextBLR_DA_Course.jpg",
  "Why Most Data Science Portfolios Fail Before the Interview Starts.docx": "DSPortfolioFail.jpg"
};

const authorOverrides = {
  "Every Graduate Can Be a Data Scientist": "Debendra D Das",
  "A Day in the Life_Data Analyst vs Data Scientist vs Data Engineer.docx": "Debendra D Das"
};

// Generate incremental IDs and dates starting from July 2, 2026 (since existing blogs are July 1 and June 30)
// Or we can assign dates nicely. Let's make them look like realistic dates in 2026.
function getDateString(index) {
  // Let's spread them out, e.g., every 3-4 days backwards from July 10, 2026
  const baseDate = new Date('2026-07-20');
  baseDate.setDate(baseDate.getDate() - (index * 3));
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return baseDate.toLocaleDateString('en-US', options);
}

async function convert() {
  const files = Object.keys(docxToImgMap);
  const posts = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.join(blogsDir, file);
    
    try {
      const { value: html } = await mammoth.convertToHtml({ path: fullPath });
      const $ = cheerio.load(html);
      
      const elements = $('body').children().toArray();
      
      let title = "";
      let firstPara = "";
      const sections = [];
      let currentSection = null;
      let textBuffer = [];
      
      // Heuristic to check if an element is a heading
      const isHeading = (el) => {
        const tagName = el.tagName.toLowerCase();
        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
          return true;
        }
        if (tagName === 'p') {
          const $el = $(el);
          const hasStrong = $el.children('strong').length > 0;
          const text = $el.text().trim();
          const strongText = $el.children('strong').text().trim();
          // If the entire text is bold, and it's not too long, and doesn't end with typical sentence punctuation
          if (hasStrong && text === strongText && text.length < 120) {
            return true;
          }
        }
        return false;
      };

      for (let j = 0; j < elements.length; j++) {
        const el = elements[j];
        const $el = $(el);
        const text = $el.text().trim();
        if (!text) continue;
        
        if (j === 0 || (!title && isHeading(el))) {
          // Clean title
          title = text.replace(/[:?]$/, '').trim();
          continue;
        }
        
        if (isHeading(el)) {
          // Save previous section if exists
          if (currentSection) {
            finalizeSection(currentSection, textBuffer);
            sections.push(currentSection);
            textBuffer = [];
          }
          currentSection = {
            heading: text,
            text: ""
          };
        } else if ($el.is('ul') || $el.is('ol')) {
          const listItems = [];
          $el.find('li').each((_, li) => {
            listItems.push($(li).text().trim());
          });
          
          if (!currentSection) {
            currentSection = { heading: "Introduction", text: "" };
          }
          currentSection.list = listItems;
        } else {
          // Regular paragraph
          if (!firstPara) {
            firstPara = text;
          }
          if (!currentSection) {
            currentSection = { heading: "Introduction", text: "" };
          }
          textBuffer.push(text);
        }
      }
      
      if (currentSection) {
        finalizeSection(currentSection, textBuffer);
        sections.push(currentSection);
      }
      
      // Calculate read time
      const fullText = $.text();
      const wordCount = fullText.split(/\s+/).filter(Boolean).length;
      const readTime = `${Math.ceil(wordCount / 200)} min read`;
      
      // Inferred Author
      let author = "DV Editorial Team";
      if (authorOverrides[file]) {
        author = authorOverrides[file];
      } else {
        const authorMatch = fullText.match(/by\s+([A-Za-z\s]+)/i);
        if (authorMatch) {
          const candidate = authorMatch[1].trim();
          if (candidate.length > 3 && candidate.length < 30 && !candidate.toLowerCase().includes('the') && !candidate.toLowerCase().includes('data')) {
            author = candidate;
          }
        }
      }
      
      // Create excerpt (150-180 chars of first paragraph)
      let excerpt = firstPara || "";
      if (excerpt.length > 180) {
        excerpt = excerpt.substring(0, 177) + "...";
      }
      
      const cleanImgName = docxToImgMap[file].replace(/[\s\(\)]/g, '_').toLowerCase();
      
      posts.push({
        id: `blog-new-${i + 1}`,
        title,
        excerpt,
        date: getDateString(i),
        author,
        image: `/blogs/${cleanImgName}`,
        readTime,
        sections
      });
      
    } catch (e) {
      console.error(`Error converting ${file}:`, e);
    }
  }
  
  function finalizeSection(section, textBuffer) {
    if (textBuffer.length > 0) {
      section.text = textBuffer[0];
    }
    if (textBuffer.length > 1) {
      section.para2 = textBuffer[1];
    }
    if (textBuffer.length > 2) {
      section.para3 = textBuffer[2];
    }
    if (textBuffer.length > 3) {
      section.extra = textBuffer.slice(3).join('\n\n');
    }
  }
  
  fs.writeFileSync('scratch/extracted-blogs.json', JSON.stringify(posts, null, 2));
  console.log(`Successfully converted ${posts.length} blogs to scratch/extracted-blogs.json`);
}

convert();
