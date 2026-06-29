import { coursesData } from '../src/data/coursesData.js';

const courseEntries = Object.values(coursesData).map((course) => {
  const topModules = course.modules.slice(0, 4).map((module) => ({
    title: sanitizeText(module.title),
    topics: module.sections
      .slice(0, 4)
      .flatMap((section) => section.topics.slice(0, 5))
      .map(sanitizeText),
  }));

  const tools = [
    ...new Set(
      course.modules.flatMap((module) =>
        module.sections
          .slice(0, 6)
          .flatMap((section) => section.topics.slice(0, 6).map(sanitizeText)),
      ),
    ),
  ].slice(0, 16);

  return {
    id: course.id,
    title: sanitizeText(course.title),
    tagline: sanitizeText(course.tagline),
    overview: sanitizeText(course.overview),
    duration: sanitizeText(course.duration),
    expertiseAreas: (course.expertiseAreas ?? []).map(sanitizeText),
    practicalExposure: course.practicalExposure.slice(0, 8).map(sanitizeText),
    outcomes: course.programOutcome.slice(0, 8).map(sanitizeText),
    careers: course.careers.flatMap((level) => level.roles.map(sanitizeText)).slice(0, 12),
    whoShouldJoin: course.whoShouldJoin.slice(0, 10).map(sanitizeText),
    modules: topModules,
    tools,
  };
});

const siteSections = [
  {
    id: 'home-hero',
    title: 'Homepage positioning',
    keywords: ['home', 'hero', 'placement', 'mentor', 'project', 'professional'],
    summary:
      'The homepage presents Agentify AI as a future-ready training brand focused on Data Science, AI, Cybersecurity, and IT career growth with expert mentors, industry-recognized programs, real-world projects, and placement support.',
    highlights: [
      'Future-ready skills in Data Science, AI, and Cybersecurity',
      'Industry-driven programs and real-world projects',
      'Expert mentors and placement support messaging',
    ],
  },
  {
    id: 'benefits-program',
    title: 'Program benefits',
    keywords: ['benefits', 'advantage', 'program', 'project', 'assignment', 'case study', 'capstone'],
    summary:
      'Program benefits include instructor-led training, LMS access, assignments, case studies, industry projects, capstone work, and structured career preparation.',
    highlights: [
      'Instructor-led live learning',
      'Assignments and case studies',
      'Industry projects and capstone project work',
      'Career readiness support',
    ],
  },
  {
    id: 'benefits-lms',
    title: 'LMS and learning support',
    keywords: ['lms', 'recorded', 'recordings', 'platform', 'portal', 'learning support', 'study material'],
    summary:
      'The LMS experience includes recorded sessions, study materials, assessments, mock interviews, certification support, and structured learning access.',
    highlights: [
      '24/7 LMS access',
      'Recorded sessions and learning resources',
      'Assessments, mentorship, and mock interview support',
    ],
  },
  {
    id: 'roadmap',
    title: 'Career roadmaps',
    keywords: ['roadmap', 'path', 'learning path', 'data scientist', 'cyber', 'cybersecurity'],
    summary:
      'The site includes two visible learning roadmaps: one for Data Scientist growth from foundations through projects and job readiness, and another for Cyber Specialist growth from IT fundamentals through advanced security and career readiness.',
    highlights: [
      'Data Scientist roadmap: foundations, analysis, machine learning, advanced AI, tools, projects, career readiness',
      'Cyber Specialist roadmap: IT fundamentals, security basics, network security, ethical hacking, SOC, advanced security, career readiness',
    ],
  },
  {
    id: 'about',
    title: 'About AgentifyAI Global',
    keywords: ['about', 'vision', 'purpose', 'mission', 'team', 'leadership', 'founder'],
    summary:
      'The About page describes AgentifyAI Global as a mission-led organization focused on AI literacy, ethical autonomous intelligence, and inclusive innovation.',
    highlights: [
      'Purpose: democratize the benefits of data and AI',
      'Vision: make people AI-literate and capable of using ethical autonomous systems',
      'Mission pillars: Upskilling, Advising, Building',
      'Leadership includes Pragya Dwivedi and Debendra D Das',
    ],
  },
  {
    id: 'services',
    title: 'Services and enterprise AI',
    keywords: ['services', 'enterprise', 'consulting', 'solution', 'business', 'automation', 'agent', 'sales agent', 'hr agent', 'collections agent', 'customer success agent', 'student relationship agent'],
    summary:
      'The Services page covers 9 enterprise AI solutions, 5 agentic AI solutions, consulting/development/training/support services, target industries, and the technology stack layers.',
    highlights: [
      'Enterprise AI Solutions: Generative AI Solutions, AI-Powered Customer Service (chatbots, voice/WhatsApp/email automation), Sales & Marketing AI, Enterprise Knowledge Assistant (internal ChatGPT for policies/contracts), AI-Powered HR, Finance & Risk Analytics (fraud detection, revenue forecasting), Supply Chain AI, Healthcare AI, and Cybersecurity AI.',
      'Autonomous Agentic AI Solutions: Sales Agent (lead qualification, CRM updates), Student Relationship Agent (feedback collection, tracking progress), Collections Agent (EMI reminders, recovery workflows), HR Agent (screening, query management), and Customer Success Agent (complaint tracking, retention).',
      'Consulting & Advisory Services: Strategic consulting, custom development, training (Enterprise AI upskilling, Generative/Agentic AI workshops), and operational support (model monitoring, managed AI services).',
      'Technology Stack Layers: Operations (MLOps, LLMOps), Deployment (AWS, Azure, GCP, Docker, Kubernetes), Agentic AI (Multi-Agent Systems), AI (Python, ML, DL, NLP, GenAI), Analytics (Excel+AI, Power BI, Tableau), Data (SQL Server, PostgreSQL, MySQL, Snowflake, Databricks).',
      'Target Industries: Banking & Financial Services, Insurance, Healthcare, Retail & E-Commerce, Telecom, Manufacturing, Education & EdTech, Logistics & Supply Chain, Government, Energy & Utilities.',
    ],
  },
  {
    id: 'faqs',
    title: 'FAQs and admissions guidance',
    keywords: ['faq', 'who can join', 'freshers', 'working professional', 'online', 'offline', 'placement', 'emi'],
    summary:
      'The FAQs cover eligibility, beginner-friendliness, learning mode, project work, certifications, LMS access, placement support, demo classes, and admission guidance.',
    highlights: [
      'Programs are positioned for graduates, freshers, professionals, and career-transition learners',
      'Programming background is not mandatory for many programs',
      'Placement support exists, but final selection depends on student performance',
      'Enrollment details and final admissions steps remain human-led',
    ],
  },
  {
    id: 'enrollment',
    title: 'Enrollment page intent',
    keywords: ['enroll', 'admission', 'query form', 'advisor', 'registration'],
    summary:
      'The enrollment page frames admissions as a human-led process through a query form and advisor follow-up. The chatbot should not take over this flow.',
    highlights: [
      'Programs can be selected through the admissions query form',
      'The page emphasizes advisor-led human follow-up',
      'The chatbot should direct final admissions questions to the human team',
    ],
  },
  {
    id: 'success-stories',
    title: 'Success stories',
    keywords: ['success', 'testimonial', 'placement story', 'results'],
    summary:
      'The site includes a visual gallery of student success stories as social proof, presented as image-based success highlights.',
    highlights: [
      'Student success story gallery appears on the homepage',
      'This acts as proof of learner outcomes and brand trust',
    ],
  },
  {
    id: 'contact',
    title: 'Office and contact information',
    keywords: ['contact', 'office', 'bangalore', 'bhubneshwar', 'dubai', 'phone', 'email', 'address', 'number', 'helpline', 'call'],
    summary:
      'The footer lists office presence, addresses, phone numbers, and email contacts for Bangalore, Bhubneshwar, and Dubai.',
    highlights: [
      'Bangalore Address: #52, 2nd Floor, Malleshpalya Maruthinagar, Bengaluru, Bangalore 560075, India',
      'Bangalore Phone: (+91) 9019 030 033, (+91) 8095 881 188',
      'Bhubneshwar Address: Plot No A/7, Adjacent to Maharaja Cine Complex, Bhoinagar, Acharya Vihar, Bhubneshwar 751022, India',
      'Bhubneshwar Phone: (+91) 8095 881 188, (+91) 8249 430 414',
      'Dubai Address: Villa 335, Murooj al Furzan East 1, Near Gate 3 Jabel Ali First, Al Furjan, Dubai, UAE',
      'Dubai Phone: +971 52 553 3211',
      'Email contacts: info@dvanalyticsmds.com (Bangalore/Bhubneshwar) and Sales@agentifyaiglobal.com (Dubai)',
    ],
  },
];

const pageDescriptions = {
  home: 'Homepage with hero positioning, program carousel, benefits, roadmaps, success stories, and office/contact details.',
  about: 'About page describing purpose, vision, mission pillars, and leadership.',
  services: 'Services page covering enterprise AI solutions, agentic AI offerings, consulting, training, and target industries.',
  faqs: 'FAQ page with learner support, eligibility, projects, LMS, placement support, and admissions guidance.',
  blogs: 'Blogs page placeholder marked as Coming Soon.',
  enroll: 'Enrollment page with an admissions query form and human-led follow-up messaging.',
};

export const chatbotKnowledge = {
  brand: {
    name: 'Agentify AI',
    positioning:
      'Training-focused education and AI services brand spanning Data Science, Analytics, AI, Generative AI, Agentic AI, Cybersecurity, and enterprise AI consulting.',
  },
  policies: {
    botRole:
      'The chatbot is an informational website guide. It can explain courses, compare options, summarize services, describe the mission, surface contact details, and suggest likely-fit programs.',
    restrictedActions: [
      'Do not enroll users.',
      'Do not collect payment information.',
      'Do not confirm admissions.',
      'Do not promise counselor callbacks.',
      'Do not invent fee, batch, or schedule details.',
    ],
    humanOnlyTopics: [
      'Enrollment processing',
      'Final fee structure',
      'Exact batch schedules',
      'Admission confirmation',
      'Counselor escalation',
    ],
  },
  pageDescriptions,
  commonFaqs: [
    {
      question: 'Who can join these programs?',
      answer:
        'Anyone with a graduation background can join, including B.Sc, B.Com, BBA, BCA, B.Tech, MCA, MBA, M.Sc graduates, freshers, working professionals, and career-gap candidates looking to transition into Data Science, AI, Cybersecurity, or Digital Tech.',
    },
    {
      question: 'Do I need programming experience?',
      answer:
        'No. Several programs begin from fundamentals and gradually move toward advanced concepts. Programming languages and tools such as SQL and Python are taught from the very basics.',
    },
    {
      question: 'Are these programs suitable for freshers?',
      answer:
        'Yes. Freshers can learn industry-relevant skills, work on real projects, prepare for interviews, and become job-ready through structured learning and mentorship.',
    },
    {
      question: 'Will I work on projects?',
      answer:
        'Yes. Students complete multiple mini-projects and one or more capstone industry projects using real-world datasets from domains such as Banking, Telecom, Retail, Healthcare, Insurance, and Manufacturing.',
    },
    {
      question: 'What learning modes are available?',
      answer:
        'Both online and offline learning options are available depending on the program and location, along with 24/7 LMS access and recorded sessions.',
    },
    {
      question: 'What placement support is available?',
      answer:
        'We provide end-to-end career services including resume building, LinkedIn profile optimization, mock interviews (technical & HR), aptitude and logical preparation, technical interview guidance, and job referrals to corporate networks. Placement is supported, but final selection depends on student performance.',
    },
    {
      question: 'Can the chatbot help me enroll?',
      answer:
        'No. The chatbot only provides information and guidance. Enrollment, fee structures, batch schedules, and final admissions details are handled by human advisors directly. You can fill out the admissions query form to get started.',
    },
    {
      question: 'What will I learn in Data Science & AI?',
      answer:
        'You will learn SQL, Python programming, Excel + AI, Power BI & Tableau dashboards, Statistics, Machine Learning, Deep Learning, Natural Language Processing (NLP), Generative AI & Prompt Engineering, Agentic AI (Multi-Agent Systems), and MLOps & LLMOps operations.',
    },
    {
      question: 'What tools will I learn?',
      answer:
        'SQL Server, Python, Jupyter Notebook, Power BI, Tableau, Excel AI, OpenAI APIs, LangChain, Vector Databases, and Cloud Platforms (AWS/Azure/GCP).',
    },
    {
      question: 'What job roles can I apply for?',
      answer:
        'Depending on the course track: Data Analyst, Business Analyst, Data Scientist, AI Engineer, Machine Learning Engineer, Gen AI Engineer, AI/Analytics Consultant, SOC Analyst, Security Engineer, Ethical Hacker, Penetration Tester, Incident Response Analyst, and Digital Forensics Investigator.',
    },
    {
      question: 'What will I learn in Cybersecurity & Forensics?',
      answer:
        'The program covers networking fundamentals, Linux operations, security governance, ethical hacking & reconnaissance, web/network penetration testing, SOC operations, SIEM tools, cloud security, incident response, and digital forensics investigations with hands-on labs.',
    },
    {
      question: 'What LMS benefits do students receive?',
      answer:
        '24/7 access to our cloud-based Learning Management System (LMS) containing recorded sessions, study materials, structured assignments, assessments, quizzes, resume templates, mock interview requests, and interview preparation kits.',
    },
    {
      question: 'Are EMI options available?',
      answer:
        'Yes. Flexible EMI options are available depending on the specific program.',
    }
  ],
  recommendedPrograms: [
    {
      useCase: 'Wants the broadest Data Science and AI path',
      courseId: 'apids',
    },
    {
      useCase: 'Wants analytics and BI without the heaviest GenAI focus',
      courseId: 'apida',
    },
    {
      useCase: 'Wants deep AI/ML engineering with production deployment',
      courseId: 'aiml',
    },
    {
      useCase: 'Wants a specialized Generative AI and Agentic AI path',
      courseId: 'genai',
    },
    {
      useCase: 'Wants cybersecurity and forensics',
      courseId: 'apcs',
    },
  ],
  siteSections,
  courses: courseEntries,
};

export function getCourseById(courseId) {
  if (!courseId) {
    return null;
  }

  const normalizedId = String(courseId).toLowerCase();
  return chatbotKnowledge.courses.find((course) => course.id === normalizedId) ?? null;
}

export function getKnowledgeContext({ page, courseId, message } = {}) {
  const normalizedPage = normalizePage(page);
  const pageCourse = getCourseById(courseId ?? extractCourseId(normalizedPage));
  const featuredCourses = pageCourse ? [pageCourse] : chatbotKnowledge.courses.slice(0, 6);
  const matchedSections = getRelevantSections(message, normalizedPage);

  return {
    page: normalizedPage,
    pageDescription: chatbotKnowledge.pageDescriptions[normalizedPage] ?? 'Website page context not explicitly mapped.',
    currentCourse: pageCourse,
    featuredCourses,
    faqs: chatbotKnowledge.commonFaqs,
    policies: chatbotKnowledge.policies,
    siteSections: matchedSections,
    recommendations: chatbotKnowledge.recommendedPrograms.map((item) => ({
      ...item,
      course: getCourseById(item.courseId),
    })),
  };
}

export function buildRecommendationGuidance({ message, history } = {}) {
  const conversationText = [String(message ?? ''), ...normalizeHistory(history)]
    .join(' ')
    .toLowerCase();

  const signals = {
    genAiInterest: hasAny(conversationText, ['gen ai', 'generative ai', 'llm', 'agentic ai', 'ai agent', 'agents']),
    analyticsInterest: hasAny(conversationText, ['analytics', 'power bi', 'tableau', 'dashboard', 'reporting', 'bi']),
    cyberInterest: hasAny(conversationText, ['cyber', 'cybersecurity', 'soc', 'ethical hacking', 'forensics']),
    salesBackground: hasAny(conversationText, ['sales', 'marketing', 'business development']),
    businessBackground: hasAny(conversationText, ['business', 'commerce', 'mba', 'non technical', 'non-technical']),
    beginnerIntent: hasAny(conversationText, [
      'start from scratch',
      'from scratch',
      'beginner',
      'no coding',
      'no programming',
      'new to',
      'switch career',
      'career transition',
    ]),
    technicalBase: hasAny(conversationText, [
      'python',
      'sql',
      'machine learning',
      'data science',
      'developer',
      'engineer',
      'coding background',
      'programming background',
    ]),
  };

  let recommendation = null;

  if (signals.cyberInterest) {
    recommendation = {
      courseId: 'apcs',
      reason:
        'The user is asking about cybersecurity or forensics, so the cybersecurity track is the most relevant fit.',
    };
  } else if (signals.genAiInterest && (signals.beginnerIntent || signals.salesBackground || signals.businessBackground) && !signals.technicalBase) {
    recommendation = {
      courseId: 'aiml',
      reason:
        'The user wants Generative AI or Agentic AI but seems to need a stronger start-from-foundation path first. AIML includes a bridge/foundation layer before advanced GenAI and Agentic AI topics.',
    };
  } else if (signals.genAiInterest) {
    recommendation = {
      courseId: 'genai',
      reason:
        'The user is focused specifically on Generative AI and Agentic AI, so the specialized GenAI program is a strong fit when they do not need as much foundation-building first.',
    };
  } else if (signals.analyticsInterest) {
    recommendation = {
      courseId: 'apida',
      reason:
        'The user appears more focused on analytics, dashboards, and business intelligence rather than the deepest AI engineering path.',
    };
  } else if (signals.businessBackground || signals.salesBackground) {
    recommendation = {
      courseId: 'apids',
      reason:
        'The user appears to be transitioning from a business-facing role and may benefit from a broad data-and-AI path with strong practical exposure.',
    };
  }

  return {
    signals,
    recommendation: recommendation
      ? {
          ...recommendation,
          course: getCourseById(recommendation.courseId),
        }
      : null,
  };
}

export function buildContextText(context) {
  const courseBlock = context.featuredCourses
    .map((course) => {
      const moduleSummary = course.modules
        .map((module) => `${module.title}: ${module.topics.slice(0, 5).join(', ')}`)
        .join(' | ');

      return [
        `Course ID: ${course.id}`,
        `Title: ${course.title}`,
        `Tagline: ${course.tagline}`,
        `Duration: ${course.duration}`,
        `Overview: ${course.overview}`,
        `Expertise areas: ${course.expertiseAreas.join(', ') || 'Not specified'}`,
        `Who should join: ${course.whoShouldJoin.join(', ')}`,
        `Practical exposure: ${course.practicalExposure.join(', ')}`,
        `Career outcomes: ${course.careers.join(', ')}`,
        `Program outcomes: ${course.outcomes.join(', ')}`,
        `Module snapshot: ${moduleSummary}`,
        `Representative tools/topics: ${course.tools.join(', ')}`,
      ].join('\n');
    })
    .join('\n\n');

  const sectionBlock = context.siteSections
    .map((section) =>
      [
        `Section: ${section.title}`,
        `Summary: ${section.summary}`,
        `Highlights: ${section.highlights.join(' | ')}`,
      ].join('\n'),
    )
    .join('\n\n');

  const faqBlock = context.faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');

  const recommendationBlock = context.recommendations
    .filter((item) => item.course)
    .map((item) => `${item.useCase} -> ${item.course.title}`)
    .join('\n');

  return [
    `Brand: ${chatbotKnowledge.brand.name}`,
    `Positioning: ${chatbotKnowledge.brand.positioning}`,
    `Current page: ${context.page ?? 'unknown'}`,
    `Current page description: ${context.pageDescription}`,
    context.currentCourse ? `Current course focus: ${context.currentCourse.title}` : 'Current course focus: none',
    '',
    'Policies:',
    `Bot role: ${chatbotKnowledge.policies.botRole}`,
    `Restricted actions: ${chatbotKnowledge.policies.restrictedActions.join(' ')}`,
    `Human-only topics: ${chatbotKnowledge.policies.humanOnlyTopics.join(', ')}`,
    '',
    'Relevant site sections:',
    sectionBlock,
    '',
    'Course knowledge:',
    courseBlock,
    '',
    'FAQ knowledge:',
    faqBlock,
    '',
    'Recommendation hints:',
    recommendationBlock,
  ].join('\n');
}

function getRelevantSections(message, page) {
  const normalizedMessage = String(message ?? '').toLowerCase();
  const sections = [];

  const pageSection = siteSections.find((section) => section.id === page || section.id === extractCourseId(page));
  if (pageSection) {
    sections.push(pageSection);
  }

  for (const section of siteSections) {
    if (sections.includes(section)) {
      continue;
    }

    const matchesKeyword = section.keywords.some(
      (keyword) => normalizedMessage.includes(keyword) || String(page ?? '').includes(keyword),
    );

    if (matchesKeyword) {
      sections.push(section);
    }
  }

  if (sections.length === 0) {
    sections.push(...siteSections.filter((section) => ['home-hero', 'benefits-program', 'contact'].includes(section.id)));
  }

  return sections.slice(0, 5);
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .map((item) => String(item?.content ?? '').trim())
    .filter(Boolean)
    .slice(-8);
}

function hasAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}

function normalizePage(page) {
  if (!page || typeof page !== 'string') {
    return 'home';
  }

  if (page.startsWith('course-')) {
    return page;
  }

  if (page.startsWith('enroll-')) {
    return 'enroll';
  }

  return page;
}

function extractCourseId(page) {
  if (!page || typeof page !== 'string') {
    return null;
  }

  if (page.startsWith('course-')) {
    return page.replace('course-', '');
  }

  if (page.startsWith('enroll-')) {
    return page.replace('enroll-', '');
  }

  return null;
}

function sanitizeText(value) {
  return String(value)
    .replace(/â€”/g, ' - ')
    .replace(/â€“/g, ' - ')
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}
