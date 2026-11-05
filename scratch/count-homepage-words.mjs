import fs from 'fs';
import path from 'path';

function countWords(str) {
  if (!str) return 0;
  // Strip HTML tags if any
  const clean = str.replace(/<[^>]*>/g, ' ').replace(/[^\w\s-]/g, ' ');
  const words = clean.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

// 1. Header & Navigation
const headerText = `
All Courses Live Training Classes Self Paced Learning Services AI Consulting Solutions Corporate Consulting Services Corporate Resource Hiring Talent Augmentation Who We Are Meet Our Alumni Apply Job Upcoming Batches Journal Enroll Now Phone WhatsApp
`;

// 2. Hero Section
const heroText = `
Become An Industry Ready Expert Data Scientist and Cybersecurity Professional
Any graduate can be an IT professional
Get an Expert in: Data Science + AI Deployment Data Analytics + Gen AI Data Engineering + AI AI Integrated Cybersecurity + Forensic Specialist AI + Forward Deployment Engineer
Who Can: Freshers | Graduates (Technical & Non-Technical) | Masters (Technical & Non-Technical) | Working Professionals | Researchers | Entrepreneurs
Skill Package Explorer
Learners Benefit
Trained By Industry Experts: Learn from experienced professionals who bring real-world knowledge to every session.
Industry Project Hands-On: Work on real-time industry projects and gain practical experience that sets you apart.
LMS Access 24/7: Get 24/7 access to recorded sessions, resources, and learning materials anytime, anywhere.
Resume & Placement: From resume building to interview preparation - we support you at every step to help you land your dream job.
`;

// 3. Sample Video Section
const sampleVideoText = `
Watch class sample videos ENROLL NOW STAR RATING 4.8 10,300+ Students Trained Glimpse of DV Analytics
`;

// 4. Programs Section (5 major programs)
const programsSectionText = `
Industry-Aligned Programs & Professional Certifications
Choose from comprehensive career tracks designed to meet global enterprise demand in Data, AI, and Cybersecurity.
Advanced Program in Industrial Data Science with AI Deployment (APIDS)
Complete learning journey from Data Management to Cloud Deployment of AI systems.
SQL, Python & PySpark/SAS Data Management Excel AI, Power BI & Tableau Visualizations Machine Learning & Advanced Statistics Deep Learning, Generative AI & Agentic AI Cloud MLOps, LLMOps & AIOps Deployment
Duration 9 Months Delivery Live Instructor-Led Online
The Advanced Program in Industrial Data Science with AI Deployment (APIDS) is a comprehensive industry-oriented training program designed to transform graduates and working professionals into highly skilled Data Science & AI practitioners.

Advanced Program in Industrial Data Analytics (APIDA)
Comprehensive training in enterprise business intelligence, dashboard engineering, and data pipeline automation.
SQL Relational Database Management Python for Data Analytics & Automation Advanced Excel with AI Integrations Power BI & Tableau Enterprise Dashboards Statistical Analysis & Predictive Modeling
Duration 6 Months Delivery Live Instructor-Led Online

Data Analytics Specialist (DAS)
Fast-track industrial data analytics program focusing on core business intelligence, reporting, and dashboard development.
Advanced Excel & AI Features SQL Database Querying & Manipulation Power BI & Tableau Visualization Tools Business Problem Solving & Case Studies
Duration 4 Months Delivery Live Instructor-Led Online

Advanced Program in Cybersecurity and Forensics (APCF)
Comprehensive training in cyber defense, vulnerability management, digital forensics, and enterprise network protection.
Network Security & Packet Analysis Ethical Hacking & Penetration Testing Digital Forensics & Incident Response SIEM & SOC Operations Cloud Security Governance
Duration 7 Months Delivery Live Instructor-Led Online

AI Forward Deployment Engineer (FDE)
Specialized engineering curriculum focusing on deploying, scaling, and managing AI, LLM, and Agentic systems in enterprise production environments.
Agentic AI Architecture LLM Fine-Tuning & Quantization Cloud MLOps & LLMOps Infrastructure Enterprise API Integration Vector Database & RAG Deployment
Duration 6 Months Delivery Live Instructor-Led Online
`;

// 5. Benefits Section (Program Benefits + LMS Benefits)
const benefitsText = `
Maximize Your Success Program Benefits Core Program Benefits LMS Platform Benefits Certificates
Program Benefits:
01 Instructor-Led Training: Learn from experienced industry professionals through interactive live sessions. Get real-time insights, ask questions, & clarify concepts for a deeper understanding.
02 LMS Access: Get access to our advanced Learning Management System 24/7. Access recordings, study materials, resources, and track your progress anytime, anywhere.
03 Assignments & Case Studies: Strengthen your concepts through well-designed assignments and real-world case studies that enhance problem-solving skills.
04 Industry Projects: Work on real-time industry projects that give you hands-on experience and help you apply your learning to practical scenarios.
05 Capstone Project: Comprehensive end-to-end project to demonstrate your skills, build a strong portfolio, and showcase your ability to deliver real-world solutions.
06 Resume Preparation: Create a professional, job-winning resume that highlights your skills, projects, and achievements to stand out to recruiters.
07 LinkedIn Optimization: Build a powerful LinkedIn profile that showcases your skills and achievements to attract recruiters and grow your professional network.
08 Tests & Mock Interviews: Access chapter-wise tests & full-length mock interviews to evaluate your skills and improve your performance.
09 Placement Support: Get dedicated placement support including job opportunities, referrals, and guidance to help you kickstart your career.
10 Training & Completion Certificate: Receive a training completion certificate upon successfully completing the program to showcase your achievement.

LMS Benefits:
01 Post Class Materials with Live Recorded Videos Access: Get lifetime access to live recorded sessions, slides, notes and other study materials anytime, anywhere to revise and strengthen your concepts.
02 Download Session-Wise Assignments & Feedbacks: Access session-wise assignments, complete them at your convenience and upload for evaluation with detailed feedback from experts.
03 Test Your Knowledge with MCQs & Practical Questions: Reinforce your learning by attempting MCQs and practical questions. Keep practicing until you score 70% or more to ensure strong concepts.
04 Fill Resume Form & Get Professional Resume Ready: Fill the resume form with your details and get a professionally crafted resume that highlights your skills and projects.
05 Interviews Preparation Kit (Technical & HR Q&A): Access a comprehensive interview preparation kit with Q&A on behavioural, technical and projects to boost your confidence.
06 Request Mock Interviews by Industry Mentors: Schedule mock interviews with industry mentors, get real-time feedback and improve your performance.
07 Appear for DV Elite Test for Placement Support: Clear the DV Elite Test to become eligible for placement assistance and connect with top hiring partners.
08 Training & Industry Data Science & AI Certificates: Earn recognized Training & Industry Data Science & AI skill certificates to validate your expertise and boost your career.
`;

// 6. Roadmap Section (DS + Cyber)
const roadmapText = `
A Complete Road Map for Data Scientists and Cyber Specialist
Data Scientist Roadmap Cyber Security Roadmap
Road Map For A Data Scientist - A Step-By-Step Journey From Foundations To Expertise:
Step 01 Foundation Step: Data Management (SQL, Python, SAS), Data Analysis & Visualization (Excel + AI, Power BI & Tableau). Learn to collect, clean, organize, analyze and visualize data to uncover meaningful insights. Importance: Strong foundation ensures accuracy and efficiency. Essential skills for data handling and reporting. Builds confidence to move to advanced AI topics.
Step 02 Base to Advance Step: Data Mining + AI (Python Statistics, Python Machine Learning, Deep Learning, NLP, Gen AI, Agentic AI). Apply advanced AI techniques to extract insights, build intelligent models, and create AI-powered solutions. Importance: Core of data science - turns data into intelligence. Powers prediction, automation, and decision-making. AI skills open doors to high-value careers and innovations.
Step 03 Expert Step: Data Engineering + AI (Deployment MLOps, LLMOps, AIOps and Cloud Computing). Build scalable data pipelines, deploy AI models, and manage them in production using MLOps, LLMOps, and AIOps on cloud platforms. Importance: Bridges the gap between models and real-world impact. Ensures scalability, reliability, and continuous improvement. High demand skillset for future-ready data scientists.

Road Map For A Cybersecurity Specialist - A Step-By-Step Journey From Foundations To Expertise:
Step 01 Foundation Step: Core Concepts & IT Basics - Networking Basics (TCP/IP, DNS, HTTP), Operating Systems (Windows, Linux), Fundamentals of Information Security, Cryptography Basics. Build a strong foundation in IT and security fundamentals. Importance: Helps you understand how systems and networks work. Essential for identifying threats and vulnerabilities. Builds the base for advanced cybersecurity skills.
Step 02 Intermediate Step: Security Skills & Operations - Network Security & Firewalls, System & Application Security, Vulnerability Assessment & Penetration Testing, SIEM Tools (Splunk, ELK) & Log Analysis. Learn to find vulnerabilities, analyze threats & secure systems. Importance: Prepares you to detect, analyze and respond to cyber threats. Penetration testing skills are in high industry demand. Builds practical hands-on expertise.
Step 03 Advanced Step: Advanced Security & Specialization - Ethical Hacking & Exploitation, Digital Forensics & Incident Response, Threat Intelligence, Cloud Security (AWS, Azure, GCP), Security Automation & Scripting (Python, Bash). Master advanced techniques and real-world attack & defense strategies. Importance: Helps you handle real-world cyber attacks. Strengthens incident response and threat hunting skills. Makes you job-ready for advanced roles.
Step 04 Expert Step: Expertise & Career Readiness - Governance, Risk & Compliance (GRC), Security Architecture & Zero Trust, SOC Operations & Threat Hunting, Certifications (Security+, CEH, CISSP, OSCP etc.). Specialize, get certified and prepare for leadership. Importance: Opens doors to high-paying cybersecurity careers. Certifications validate your skills globally. Prepares you for leadership and strategic roles.
`;

// 7. Companies Section
const companiesText = `
Career Placements Companies That Hires You HSBC Citi Target Walmart Amazon Flipkart Dell HP Wells Fargo Bank of America Capgemini TCS Infosys Accenture IBM Microsoft Cognizant Tech Mahindra And More...
`;

// 8. Success Stories
const successText = `
Proven Results Student Success Stories
`;

// 9. Google Reviews
const reviewsRaw = fs.readFileSync(path.resolve('src/data/googleReviewsData.ts'), 'utf8');
const reviewMatch = reviewsRaw.match(/text:\s*"([^"]+)"/g) || [];
const reviewsText = reviewMatch.map(m => m.replace(/text:\s*"/, '').replace(/"$/, '')).join(' ');

// 10. FAQ Section (35 questions and answers)
const faqsRaw = fs.readFileSync(path.resolve('src/components/FaqsPage.tsx'), 'utf8');
// Extract full FAQ text content
const cleanFaqs = faqsRaw
  .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  .match(/(question|answer|title):\s*['"`]([\s\S]*?)['"`]/g) || [];
const faqsText = cleanFaqs.map(m => m.replace(/^(question|answer|title):\s*['"`]/, '').replace(/['"`]$/, '')).join(' ');


// 11. Footer (Offices, Address, Quick Links, Copyright)
const footerText = `
Our Presence Visit Our Offices
Bangalore Center: DV Data & Analytics Private Limited #52, 3rd Floor: Malleshpalya Maruthinagar Bengaluru. Bangalore 560075 India (+91) 8095 881 188 (+91) 9108 350 033 info@dvanalyticsmds.com
Bhubaneswar Center: DV Data & Analytics Private Limited Plot No A/7 Adjacent to Maharaja Cine Complex, Bhoinagar, Acharya Vihar Bhubaneswar 751022 India (+91) 8095 881 188 (+91) 9108 350 033 info@dvanalyticsmds.com
Dubai UAE Center: DV Analytics International Office Dubai Knowledge Park Dubai United Arab Emirates info@dvanalyticsmds.com
Copyright DV Analytics. All Rights Reserved. Privacy Policy Terms of Service Disclaimer
`;

const sections = [
  { name: 'Header & Navigation', text: headerText },
  { name: 'Hero Section (Headings, Expertise, Audience, Badges)', text: heroText },
  { name: 'Sample Video & Ratings Section', text: sampleVideoText },
  { name: 'Programs & Courses Section (5 Full Program Curricula)', text: programsSectionText },
  { name: 'Benefits Section (10 Program + 8 LMS Benefits)', text: benefitsText },
  { name: 'Roadmap Section (Data Scientist & Cybersecurity Career Paths)', text: roadmapText },
  { name: 'Companies & Placement Section', text: companiesText },
  { name: 'Success Stories Section', text: successText },
  { name: 'Google Reviews Section (Student Testimonials)', text: reviewsText },
  { name: 'FAQs Section (35 Comprehensive Q&As in 7 Categories)', text: faqsText },
  { name: 'Footer & Center Addresses (Bangalore, Bhubaneswar, Dubai)', text: footerText },
];

let total = 0;
console.log('--- HOMEPAGE SEO-READABLE WORD COUNT BREAKDOWN ---\n');
for (const s of sections) {
  const count = countWords(s.text);
  total += count;
  console.log(`${s.name}: ~${count} words`);
}
console.log(`\n==========================================`);
console.log(`TOTAL SEO-READABLE TEXT WORDS ON HOMEPAGE: ~${total} words`);
console.log(`==========================================`);
