import { runRetrievalPreview } from './chatbotKnowledge.mjs';

const scenarios = [
  { page: 'home', message: 'Which course is best for a beginner who wants Generative AI and Agentic AI?' },
  { page: 'faqs', message: 'Do I need programming experience to join?' },
  { page: 'faqs', message: 'What placement support is available?' },
  { page: 'services', message: 'What enterprise AI services do you offer for retail companies?' },
  { page: 'services', message: 'Do you build internal knowledge assistants for employees?' },
  { page: 'about', message: 'What is Agentify AI’s mission and vision?' },
  { page: 'about', message: 'Who are the leadership team members?' },
  { page: 'blogs', message: 'What does the Kimi K3 blog post say?' },
  { page: 'home', message: 'Where is your Dubai office located?' },
  { page: 'home', message: 'Give me the Bangalore contact number and email.' },
  { page: 'enroll', message: 'What are the fees for the GenAI program?' },
  { page: 'enroll', message: 'Are scholarships available?' },
  { page: 'course-genai', courseId: 'genai', message: 'What will I learn in this program?' },
  { page: 'course-apida', courseId: 'apida', message: 'What jobs does this course prepare me for?' },
  { page: 'home', message: 'Compare Data Analytics and Data Science programs.' },
  { page: 'home', message: 'Do you have LMS access and recorded sessions?' },
  { page: 'services', message: 'Which industries do you serve?' },
  { page: 'home', message: 'Do you offer cybersecurity training?' },
  { page: 'home', message: 'Can you confirm my admission if I enroll today?' },
  { page: 'home', message: 'What should the bot say if fee details are not present on the site?' },
];

for (const scenario of scenarios) {
  const context = await runRetrievalPreview(scenario);
  const sources = context.retrievedChunks
    .slice(0, 3)
    .map((chunk) => `${chunk.repoLabel} | ${chunk.kind} | ${chunk.relativePath}`)
    .join(' || ');

  console.log(`Q: ${scenario.message}`);
  console.log(`Intent: ${context.intent.label}`);
  console.log(`Top sources: ${sources}`);
  console.log(`Top course hints: ${context.featuredCourses.map((course) => course.title).join(' | ')}`);
  console.log('---');
}
