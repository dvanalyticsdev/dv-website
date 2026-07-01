import React, { useState } from 'react';

interface BlogSection {
  heading: string;
  text: string;
  para2?: string;
  para3?: string;
  list?: string[];
  extra?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
  sections: BlogSection[];
}

export const BlogsPage: React.FC = () => {
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  const blogsData: BlogPost[] = [
    {
      id: 'blog-1',
      title: 'How Generative AI & Agentic AI Are Transforming the Role of Traditional Data Analysts?',
      excerpt: 'The rise of Generative AI and Agentic AI is reshaping how organizations analyze data. Rather than simply replacing analysts, these technologies are automating repetitive reporting tasks and elevating analysts to strategic business partners.',
      date: 'July 1, 2026',
      author: 'DV Editorial Team',
      image: '/blog-1-bg.png',
      readTime: '5 min read',
      sections: [
        {
          heading: 'What will happen?',
          text: 'The future of data analytics is not about replacing people with AI, it is about empowering professionals with AI. Generative AI and Agentic AI are automating repetitive tasks such as report generation, SQL coding, dashboard development, and routine analysis, allowing professionals to focus on innovation, business strategy, problem-solving, and intelligent decision-making.',
          para2: 'Organizations are no longer looking only for Data Analysts who can create reports. They are seeking professionals who can build AI-powered solutions, develop intelligent business applications, automate enterprise workflows, and transform data into competitive advantage.',
          para3: 'For students, fresh graduates, and working professionals, this is the ideal time to upskill in Data Science, Analytics, Artificial Intelligence, Generative AI, and Agentic AI. Those who embrace these technologies will not only remain relevant in the evolving job market but will become leaders in the next generation of digital transformation.'
        },
        {
          heading: 'The Rise of Generative AI (Gen AI) & Agentic AI',
          text: 'The rise of Generative AI (Gen AI) and Agentic AI is reshaping how organizations analyze data. Rather than simply replacing Data Analysts, these technologies are automating repetitive tasks and allowing analysts to focus on higher-value business decisions.',
          para2: 'Traditional Data Analysts spend a significant amount of time collecting data, writing SQL queries, cleaning datasets, building dashboards, and preparing reports. Today, AI-powered tools can generate SQL code, automate data preparation, create dashboards, summarize insights, and answer business questions in natural language within minutes.',
          para3: 'Agentic AI takes this a step further by acting autonomously. AI agents can retrieve data from multiple systems, perform analysis, identify trends and anomalies, generate visualizations, create executive reports, and even recommend business actions with minimal human intervention.'
        },
        {
          heading: 'The Evolution of Data Analytics in the Age of Artificial Intelligence',
          text: 'For more than two decades, Data Analysts have played a vital role in helping organizations make informed business decisions. Their responsibilities have traditionally included collecting data from multiple sources, writing SQL queries, cleaning and transforming data, building dashboards, generating reports, and presenting business insights to stakeholders. Every major industry including banking, healthcare, insurance, retail, manufacturing, telecommunications, and e-commerce has relied on Data Analysts to convert raw data into meaningful information that supports decision-making.',
          para2: 'However, the rapid advancement of Generative AI (Gen AI) and Agentic AI is fundamentally changing the analytics landscape. Organizations are increasingly adopting AI-powered tools that can perform many routine analytical tasks faster, more accurately, and at a significantly lower cost. Rather than spending hours writing SQL queries, preparing Excel reports, or designing dashboards, businesses are leveraging AI to automate these activities within minutes.',
          para3: 'This transformation does not mean that the role of the Data Analyst is disappearing. Instead, it means that the traditional role is evolving into a more strategic, AI-enabled profession. Professionals who embrace AI will have greater opportunities, while those relying only on traditional reporting skills may find their roles becoming increasingly automated.'
        },
        {
          heading: 'The Traditional Role of a Data Analyst',
          text: 'A traditional Data Analyst typically spends most of the workday performing repetitive and time-consuming activities. These include:',
          list: [
            'Extracting data from databases using SQL.',
            'Cleaning and transforming datasets.',
            'Combining data from multiple systems.',
            'Creating Excel reports and Power BI/Tableau dashboards.',
            'Calculating KPIs and business metrics.',
            'Identifying trends and anomalies.',
            'Preparing presentations for management.',
            'Responding to ad hoc business requests.',
            'Generating daily, weekly, and monthly reports.',
            'Supporting management with descriptive analytics.'
          ],
          extra: 'Although these activities are valuable, many are repetitive, rule-based, and highly suitable for automation through AI technologies.'
        },
        {
          heading: 'How Generative AI Is Changing Data Analytics',
          text: 'Generative AI introduces a new way of interacting with data. Instead of writing complex SQL queries or programming scripts, business users can ask questions in natural language, such as:',
          list: [
            '"Show me the sales trend for the last 12 months."',
            '"Which customers have the highest probability of churn?"',
            '"Summarize the reasons for declining loan approvals."',
            '"Compare revenue by region and recommend improvement opportunities."'
          ],
          extra: 'Generative AI can automatically understand these requests, generate SQL queries, retrieve the required data, perform statistical analysis, create visualizations, and provide business-friendly explanations. What previously required several hours of manual work can now be completed in minutes. In addition, Generative AI assists analysts by generating Python code, SQL queries, Power BI formulas, documentation, executive summaries, presentation content, and technical explanations.'
        },
        {
          heading: 'The Rise of Agentic AI',
          text: 'Agentic AI represents the next generation of Artificial Intelligence. Unlike traditional AI systems that respond only when prompted, Agentic AI can independently perform tasks, make decisions within predefined boundaries, collaborate with other AI agents, and continuously optimize workflows.',
          para2: 'An AI Agent can automatically collect data from multiple systems, validate data quality, generate SQL queries, perform statistical analysis, detect anomalies, build dashboards, create executive reports, and recommend and execute automated business actions.',
          para3: 'Instead of acting as a simple reporting tool, Agentic AI functions as an intelligent digital analyst capable of performing complete analytical processes from data collection to business recommendations.'
        },
        {
          heading: 'Industries Driving AI Adoption',
          text: 'Organizations across industries are investing heavily in Generative AI and Agentic AI to improve efficiency, reduce operational costs, and enhance customer experiences. Key industries driving this adoption include:',
          list: [
            'Banking & Financial Services',
            'Insurance',
            'Healthcare',
            'Retail & E-Commerce',
            'Manufacturing',
            'Telecommunications',
            'Supply Chain & Logistics',
            'Energy & Utilities',
            'Education',
            'Government',
            'Information Technology',
            'Consulting'
          ]
        },
        {
          heading: 'Career Opportunities in the AI Era',
          text: 'The emergence of Generative AI and Agentic AI is creating entirely new career paths, including:',
          list: [
            'AI Data Analyst',
            'Data Scientist',
            'AI Solutions Consultant',
            'Machine Learning Engineer',
            'Generative AI Engineer',
            'Agentic AI Developer',
            'AI Product Manager',
            'AI Business Consultant',
            'AI Automation Specialist',
            'Enterprise AI Architect',
            'LLM Engineer',
            'AI Research Engineer'
          ],
          extra: 'These roles offer higher salaries, greater strategic responsibility, and stronger long-term career growth than traditional reporting-focused positions.'
        },
        {
          heading: 'Career Advantage & Conclusion',
          text: 'The future of data analytics is not about replacing people with AI, it is about empowering professionals with AI. Generative AI and Agentic AI are automating repetitive tasks such as report generation, SQL coding, dashboard development, and routine analysis, allowing professionals to focus on innovation, business strategy, problem-solving, and intelligent decision-making.',
          para2: 'Organizations are no longer looking only for Data Analysts who can create reports. They are seeking professionals who can build AI-powered solutions, develop intelligent business applications, automate enterprise workflows, and transform data into competitive advantage.'
        }
      ]
    },
    {
      id: 'blog-2',
      title: 'Every Graduate Can Be a Data Scientist',
      excerpt: 'One of the biggest myths among graduates is that only B.Tech or Computer Science students can become Data Scientists. This is completely false. Today\'s Data Science and AI industry rewards skills, project portfolio, and dedication over a specific degree.',
      date: 'June 30, 2026',
      author: 'Debendra D Das',
      image: '/blog-2-bg.png',
      readTime: '7 min read',
      sections: [
        {
          heading: 'Data Science Is a Skill, Not a Degree',
          text: 'One of the biggest myths among graduates is: "Only B.Tech or Computer Science students can become Data Scientists." This is completely false.',
          para2: 'Today\'s Data Science and Artificial Intelligence industry hires people based on skills, problem-solving ability, project experience, and business understanding—not just their degree. Whether you are a graduate in B.Com, B.Sc, BBA, BA, BCA, B.Tech, BE, MBA, MCA, M.Com, or M.Sc, you can build a successful career in Data Science and AI.',
          para3: 'Data Science does not discriminate by degree—it rewards skills. Your degree determines where you started, but your skills determine where you can go.'
        },
        {
          heading: 'The Graduate Reality & Unemployment Gaps',
          text: 'India is one of the world\'s largest producers of graduates, entering millions of young professionals into the job market every year. However, many struggle to find suitable employment because employers seek practical, industry-ready capabilities in addition to academic qualifications.',
          para2: 'Common gaps in graduates include: Limited hands-on technical skills, minimal exposure to real-world projects, lack of business problem-solving experience, weak communication and interview skills, and little familiarity with AI and modern digital tools.',
          para3: 'This is why upskilling with practical, industry-aligned training is the single most powerful step a graduate can take to stand out and secure a high-paying job.'
        },
        {
          heading: 'Why Data Science & AI?',
          text: 'Artificial Intelligence is transforming every industry. Every company is becoming a technology company, and data has become the world\'s most valuable business asset. Therefore, organizations need professionals who can analyze business data, build predictive AI models, and support intelligent decision-making. There is virtually no industry without data, making Data Scientists highly sought after.'
        },
        {
          heading: 'The 8-Stage Learning Journey',
          text: 'To successfully transition into a Data Scientist, you should progress through the following structured stages:',
          list: [
            'Stage 1 – Data Management: Learn SQL, Database Concepts, Python Programming, Excel, and Data Cleaning to manage how data is stored.',
            'Stage 2 – Data Analytics: Master Excel AI, Power BI, Tableau, dashboard development, and business KPIs to convert raw data into actionable insights.',
            'Stage 3 – Statistics: Understand probability, mean, median, standard deviation, correlation, regression, and hypothesis testing to support evidence-based decisions.',
            'Stage 4 – Machine Learning: Build predictive models using classification, regression, clustering, decision trees, random forests, and XGBoost.',
            'Stage 5 – Deep Learning: Develop advanced neural networks using TensorFlow and Keras for images, text, and speech.',
            'Stage 6 – Generative AI: Learn Large Language Models (LLMs), Prompt Engineering, RAG (Retrieval-Augmented Generation), and AI chatbots to create intelligent business applications.',
            'Stage 7 – Agentic AI: Design autonomous multi-agent systems and workflow automations to orchestrate complex operations.',
            'Stage 8 – Deployment (MLOps/LLMOps): Deploy enterprise-ready applications using Git, Docker, APIs, AWS, Azure, or GCP.'
          ]
        },
        {
          heading: 'Build Real Industry Projects',
          text: 'Employers value practical project portfolios over academic descriptions. You should build projects that solve real business problems across key domains:',
          list: [
            'Banking: Credit Risk Analytics, Loan Underwriting, Fraud Detection, Collections Analytics.',
            'Retail/E-Commerce: Customer Segmentation, Sales Forecasting, Recommendation Systems.',
            'Healthcare: Disease Prediction, Patient Flow Analytics.',
            'Insurance: Claims Analytics, Fraud Detection.',
            'Telecom: Churn Prediction, Customer Lifetime Value (CLTV).',
            'Manufacturing: Predictive Maintenance, Quality Control Analytics.'
          ]
        },
        {
          heading: 'Build Your Professional Profile & Prepare for Interviews',
          text: 'To get noticed by recruiters, you must build a strong professional profile. This includes: A professional resume/portfolio tailored to data roles, a polished LinkedIn profile, a GitHub portfolio containing clean code, and interactive Power BI/Tableau dashboard portfolios.',
          para2: 'Prepare for interviews by practicing SQL, Python programming challenges, statistical concepts, machine learning algorithms, case studies, and mock interviews to build confidence.'
        },
        {
          heading: 'Global Opportunities & Conclusion',
          text: 'The demand for Data Science and AI professionals continues to grow worldwide, with major job hubs in India, the US, UK, Germany, Canada, Singapore, Ireland, Australia, and the UAE.',
          para2: 'Whether you are from a background in Commerce, Science, Arts, Management, or Engineering, you can build a successful career by developing practical skills and applying them to real business problems. Data Science is not reserved for a specific degree—it is a skill that anyone can learn with dedication, practice, and the right guidance.'
        }
      ]
    }
  ];

  const activeBlog = blogsData.find((b) => b.id === activeBlogId);

  if (activeBlog) {
    return (
      <div className="blog-reader-wrapper">
        {/* Hero Section */}
        <section 
          className="blog-reader-hero"
          style={{ backgroundImage: `url('${activeBlog.image}')` }}
        >
          <div className="blog-hero-overlay"></div>
          <div className="container blog-hero-content">
            <div className="blog-back-btn-row" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <button className="back-btn-link" onClick={() => setActiveBlogId(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px', marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}>
                  <line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="12 19 5 12 12 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ verticalAlign: 'middle' }}>Back to Blogs</span>
              </button>
            </div>
            <div className="text-center">
              <div className="blog-meta-badges">
                <span className="blog-badge">{activeBlog.date}</span>
                <span className="blog-badge secondary">{activeBlog.readTime}</span>
              </div>
              <h1 className="blog-reader-title">{activeBlog.title}</h1>
              <div className="blog-title-underline"></div>
              <p className="blog-reader-author">By {activeBlog.author}</p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="blog-reader-body container">
          <div className="blog-body-card">
            <div className="blog-body-content">
              {activeBlog.sections.map((section, idx) => (
                <div key={idx} className="blog-body-section">
                  <h2 className="blog-section-title">{section.heading}</h2>
                  <div className="blog-section-divider"></div>
                  <p className="blog-body-text">{section.text}</p>
                  
                  {section.para2 && <p className="blog-body-text">{section.para2}</p>}
                  {section.para3 && <p className="blog-body-text">{section.para3}</p>}
                  
                  {section.list && (
                    <ul className="blog-body-list">
                      {section.list.map((item, listIdx) => (
                        <li key={listIdx} className="blog-list-item">
                          <span className="blog-list-bullet">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.extra && <p className="blog-body-text blog-extra-text">{section.extra}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="blogs-page-wrapper">
      {/* Hero Section */}
      <section className="blogs-hero-section">
        <div className="blogs-hero-overlay"></div>
        <div className="container blogs-hero-content text-center">
          <span className="blogs-subtitle">Insights &amp; Industry Trends</span>
          <h1 className="blogs-title">DV Analytics Journal</h1>
          <div className="blogs-title-underline"></div>
          <p className="blogs-lead">
            Stay ahead of the curve with expert perspectives on Data Science, Artificial Intelligence, 
            Generative AI, and Career Transformation.
          </p>
        </div>
      </section>

      {/* Listing Grid */}
      <section className="blogs-list-section container">
        <div className="blogs-grid">
          {blogsData.map((blog) => (
            <div key={blog.id} className="blog-card glow-card">
              <div className="blog-card-img-wrapper">
                <img src={blog.image} alt={blog.title} className="blog-card-img" />
                <div className="blog-card-meta">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
              <div className="blog-card-content">
                <span className="blog-author-tag">By {blog.author}</span>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <button 
                  className="btn btn-outline read-more-blog-btn"
                  onClick={() => setActiveBlogId(blog.id)}
                >
                  Read Full Article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow-icon">
                    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
