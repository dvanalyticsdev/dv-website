import { useEffect, useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { coursesData } from '../data/coursesData';

type CourseId = 'apids' | 'apida' | 'specialist' | 'aiml' | 'apcs' | 'fde';
type CourseDataId = Uppercase<CourseId>;

interface SkillOption {
  id: string;
  label: string;
  weights: Partial<Record<CourseId, number>>;
}

interface SkillCategory {
  title: string;
  skillIds: string[];
}

interface CourseRecommendation {
  id: CourseId;
  title: string;
  expectedPackage: string[];
}

interface SkillPackageExplorerProps {
  onViewDetails?: (courseId: string) => void;
  className?: string;
}

const skillOptions: SkillOption[] = [
  { id: 'sql', label: 'SQL', weights: { specialist: 3, apida: 3, apids: 2 } },
  { id: 'python', label: 'Python Programming', weights: { apida: 2, apids: 3, aiml: 3, fde: 2 } },
  { id: 'sas', label: 'SAS Programming', weights: { apida: 2, apids: 2 } },
  { id: 'pyspark-scala', label: 'PySpark / Scala', weights: { apids: 3, fde: 2 } },
  { id: 'databricks', label: 'Databricks', weights: { apids: 3, apida: 2, fde: 3 } },
  { id: 'excel-ai', label: 'Excel + AI', weights: { specialist: 4, apida: 4, apids: 2 } },
  { id: 'power-bi', label: 'Power BI', weights: { specialist: 4, apida: 4, apids: 2 } },
  { id: 'tableau', label: 'Tableau', weights: { specialist: 4, apida: 4, apids: 2 } },
  { id: 'statistics', label: 'Python Statistics', weights: { apida: 3, apids: 3, aiml: 2 } },
  { id: 'data-analysis', label: 'Data Analysis', weights: { specialist: 4, apida: 4, apids: 2 } },
  { id: 'data-visualization', label: 'Data Visualization', weights: { specialist: 4, apida: 4, apids: 2 } },
  { id: 'machine-learning', label: 'Machine Learning', weights: { apida: 2, apids: 4, aiml: 4, fde: 2 } },
  { id: 'deep-learning', label: 'Deep Learning', weights: { apids: 3, aiml: 4 } },
  { id: 'nlp', label: 'Natural Language Processing (NLP)', weights: { apids: 3, aiml: 4 } },
  { id: 'computer-vision', label: 'Computer Vision', weights: { apids: 2, apida: 1, aiml: 3 } },
  { id: 'genai', label: 'Generative AI', weights: { apids: 3, aiml: 4, fde: 4 } },
  { id: 'agentic-ai', label: 'Agentic AI', weights: { aiml: 4, fde: 5, apids: 2 } },
  { id: 'prompt-engineering', label: 'Prompt Engineering', weights: { aiml: 3, fde: 5, apids: 2 } },
  { id: 'llms', label: 'LLMs', weights: { aiml: 4, fde: 5, apids: 2 } },
  { id: 'rag-vector-db', label: 'RAG / Vector Databases', weights: { aiml: 4, fde: 5, apids: 3 } },
  { id: 'mlops', label: 'MLOps', weights: { apida: 2, apids: 4, aiml: 4, fde: 4 } },
  { id: 'llmops', label: 'LLMOps', weights: { apids: 3, aiml: 4, fde: 5 } },
  { id: 'aiops', label: 'AIOps', weights: { apids: 3, fde: 3 } },
  { id: 'cloud-platforms', label: 'Cloud Platforms', weights: { apids: 4, aiml: 3, fde: 5, apcs: 2 } },
  { id: 'data-engineering', label: 'Data Engineering', weights: { apids: 4, apida: 2, fde: 4 } },
  { id: 'system-design', label: 'AI System Design', weights: { fde: 5, aiml: 2, apids: 2 } },
  { id: 'system-design-general', label: 'System Design', weights: { fde: 4, apids: 3, aiml: 2, apcs: 1 } },
  { id: 'forward-deployment', label: 'Forward Deployment Engineering', weights: { fde: 5, apids: 2, aiml: 1 } },
  { id: 'ai-workflow-automation', label: 'AI Workflow Automation / MCP', weights: { fde: 5, aiml: 3 } },
  { id: 'api-development', label: 'API Development', weights: { fde: 4, apids: 3, aiml: 2, apida: 1 } },
  { id: 'client-delivery', label: 'Client-Facing AI Delivery', weights: { fde: 5, aiml: 2 } },
  { id: 'banking-analytics', label: 'Banking / Credit Risk Analytics', weights: { apida: 3, apids: 3, specialist: 2 } },
  { id: 'fraud-analytics', label: 'Fraud / AML Analytics', weights: { apids: 3, apida: 3, specialist: 2, apcs: 1 } },
  { id: 'forecasting', label: 'Forecasting / Churn / CLV', weights: { apids: 3, apida: 3, specialist: 2, aiml: 2 } },
  { id: 'dashboarding', label: 'Dashboarding & Reporting', weights: { specialist: 4, apida: 4, apids: 2 } },
  { id: 'networking-security', label: 'Networking & Security Fundamentals', weights: { apcs: 5 } },
  { id: 'cybersecurity', label: 'Cybersecurity / SOC', weights: { apcs: 5 } },
  { id: 'linux-windows-security', label: 'Linux / Windows Security', weights: { apcs: 5 } },
  { id: 'web-security', label: 'Web Application Security', weights: { apcs: 5 } },
  { id: 'ethical-hacking', label: 'Ethical Hacking / Forensics', weights: { apcs: 5 } },
  { id: 'cloud-security', label: 'AWS / Azure / GCP Security', weights: { apcs: 5, fde: 1 } },
  { id: 'incident-response', label: 'Incident Response / Threat Intelligence', weights: { apcs: 5 } },
  { id: 'grc', label: 'Governance, Risk & Compliance (GRC)', weights: { apcs: 5 } },
];

const skillCategories: SkillCategory[] = [
  {
    title: 'Data Management',
    skillIds: ['sql', 'python', 'sas', 'pyspark-scala', 'databricks'],
  },
  {
    title: 'Data Analytics & Visualization',
    skillIds: [
      'excel-ai',
      'power-bi',
      'tableau',
      'statistics',
      'data-analysis',
      'data-visualization',
      'dashboarding',
    ],
  },
  {
    title: 'Data Mining',
    skillIds: [
      'machine-learning',
      'deep-learning',
      'nlp',
      'computer-vision',
      'genai',
      'agentic-ai',
      'prompt-engineering',
      'llms',
      'rag-vector-db',
      'banking-analytics',
      'fraud-analytics',
      'forecasting',
    ],
  },
  {
    title: 'Deployment',
    skillIds: [
      'mlops',
      'llmops',
      'aiops',
      'cloud-platforms',
      'system-design',
      'system-design-general',
      'forward-deployment',
      'ai-workflow-automation',
      'api-development',
      'client-delivery',
    ],
  },
  {
    title: 'Data Engineering',
    skillIds: [
      'data-engineering',
      'networking-security',
      'cybersecurity',
      'linux-windows-security',
      'web-security',
      'ethical-hacking',
      'cloud-security',
      'incident-response',
      'grc',
    ],
  },
];

const skillOptionById = new Map(skillOptions.map((skill) => [skill.id, skill]));

const courseRecommendations: Record<CourseId, CourseRecommendation> = {
  apids: {
    id: 'apids',
    title: 'Advanced Program in Industrial Data Science & AI (APIDS)',
    expectedPackage: ['Fresher: 8-15 LPA', '1-5 YOE: 10-25 LPA', '5-10 YOE: 20-40 LPA', '10+ YOE: 40 LPA-1 Cr+'],
  },
  apida: {
    id: 'apida',
    title: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
    expectedPackage: ['Fresher: 6-10 LPA', '1-5 YOE: 8-20 LPA', '5-10 YOE: 15-30 LPA', '10+ YOE: 20-50 LPA'],
  },
  specialist: {
    id: 'specialist',
    title: 'Data Analytics Specialist (DAS)',
    expectedPackage: ['Fresher: 5-8 LPA', '1-5 YOE: 6-15 LPA', '5-10 YOE: 10-20 LPA', '10+ YOE: 20-40 LPA'],
  },
  aiml: {
    id: 'aiml',
    title: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)',
    expectedPackage: ['Fresher: 8-12 LPA', '1-5 YOE: 10-20 LPA', '5-10 YOE: 20-80 LPA', '10+ YOE: 40-80 LPA+'],
  },
  apcs: {
    id: 'apcs',
    title: 'Advanced Program in Cybersecurity & Forensics (APCF)',
    expectedPackage: ['Fresher: 3-5 LPA', '1-5 YOE: 4-15 LPA', '5-10 YOE: 15-30 LPA', '10+ YOE: 25-40 LPA+'],
  },
  fde: {
    id: 'fde',
    title: 'AI Forward Deployment Engineer (FDE)',
    expectedPackage: ['Fresher: 10-15 LPA', '1-5 YOE: 10-30 LPA', '5-10 YOE: 25-50 LPA', '10+ YOE: 50 LPA-1 Cr+'],
  },
};

const getCourseData = (courseId: CourseId) =>
  coursesData[courseId.toUpperCase() as CourseDataId] ||
  Object.values(coursesData).find((course) => course.id.toLowerCase() === courseId);

export const SkillPackageExplorer: React.FC<SkillPackageExplorerProps> = ({ onViewDetails, className = '' }) => {
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [canUsePortal, setCanUsePortal] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    setCanUsePortal(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const recommendations = useMemo(() => {
    if (selectedSkills.length === 0) {
      return [];
    }

    const scores = selectedSkills.reduce<Partial<Record<CourseId, number>>>((acc, skillId) => {
      const skill = skillOptions.find((option) => option.id === skillId);
      if (!skill) return acc;

      Object.entries(skill.weights).forEach(([courseId, score]) => {
        const typedCourseId = courseId as CourseId;
        acc[typedCourseId] = (acc[typedCourseId] || 0) + (score || 0);
      });

      return acc;
    }, {});

    return Object.entries(scores)
      .map(([courseId, score]) => ({
        ...courseRecommendations[courseId as CourseId],
        score: score || 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [selectedSkills]);

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((current) =>
      current.includes(skillId)
        ? current.filter((id) => id !== skillId)
        : [...current, skillId]
    );
  };

  const clearSkills = () => {
    setSelectedSkills([]);
  };

  const handleViewDetails = (courseId: CourseId) => {
    setIsOpen(false);
    onViewDetails?.(courseId);
  };

  const renderExpectedPackage = (ranges: string[]) => (
    <div className="expected-package">
      <span>Expected package</span>
      <div className="salary-range-list">
        {ranges.map((range) => (
          <span key={range}>{range}</span>
        ))}
      </div>
    </div>
  );

  const modalContent = (
    <div className="skill-package-modal" role="presentation" onClick={() => setIsOpen(false)}>
      <div
        className="skill-package-panel"
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${panelId}-title`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="skill-package-modal-header">
          <div>
            <h2 id={`${panelId}-title`}>Explore skills and packages</h2>
            <p>Select your skills to find the closest course path and expected package.</p>
          </div>
          <button
            type="button"
            className="skill-package-close"
            aria-label="Close skills and packages popup"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>

        <div className="skill-package-grid">
          <div className="skill-selector-panel">
            <div className="skill-panel-heading">
              <h3>Select your skills</h3>
              {selectedSkills.length > 0 && (
                <button type="button" className="skill-clear-btn" onClick={clearSkills}>
                  Clear
                </button>
              )}
            </div>

            <div className="skill-category-grid" aria-label="Select skills">
              {skillCategories.map((category) => (
                <section className="skill-category-group" key={category.title}>
                  <h4>{category.title}</h4>
                  <div className="skill-chip-grid">
                    {category.skillIds.map((skillId) => {
                      const skill = skillOptionById.get(skillId);
                      if (!skill) return null;

                      const isSelected = selectedSkills.includes(skill.id);

                      return (
                        <button
                          key={skill.id}
                          type="button"
                          className={`skill-chip ${isSelected ? 'selected' : ''}`}
                          aria-pressed={isSelected}
                          onClick={() => toggleSkill(skill.id)}
                        >
                          {skill.label}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="package-result-panel">
            <div className="skill-panel-heading">
              <h3>{recommendations.length > 0 ? 'Best suitable course' : 'Recommended courses'}</h3>
              <span>{selectedSkills.length} selected</span>
            </div>

            {recommendations.length > 0 && (
              <div className="best-course-wrap">
                {(() => {
                  const recommendation = recommendations[0];
                  const course = getCourseData(recommendation.id);

                  return (
                    <article className="course-recommendation-card best-course-card" key={recommendation.id}>
                      <h4>{course?.title || recommendation.title}</h4>
                      {renderExpectedPackage(recommendation.expectedPackage)}
                      <button
                        type="button"
                        className="view-details-btn recommendation-details-btn"
                        onClick={() => handleViewDetails(recommendation.id)}
                      >
                        View Details Course
                      </button>
                    </article>
                  );
                })()}
              </div>
            )}

            <div className="course-recommendation-list">
              {recommendations.slice(1).map((recommendation) => {
                const course = getCourseData(recommendation.id);

                return (
                  <article className="course-recommendation-card" key={recommendation.id}>
                    <h4>{course?.title || recommendation.title}</h4>
                    {renderExpectedPackage(recommendation.expectedPackage)}
                    <button
                      type="button"
                      className="view-details-btn recommendation-details-btn"
                      onClick={() => handleViewDetails(recommendation.id)}
                    >
                      View Details Course
                    </button>
                  </article>
                );
              })}
            </div>

            {selectedSkills.length > 0 && (
              <p className="package-note">
                Packages are indicative CTC ranges and vary by city, company, experience, portfolio, and interview performance.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`skill-package-explorer ${className}`}>
      <div className="skill-package-cta-wrap">
        <button
          type="button"
          className="skill-package-trigger"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((current) => !current)}
        >
          Explore Skills and Salary
          <span className="skill-package-trigger-icon" aria-hidden="true">{isOpen ? '-' : '+'}</span>
        </button>
      </div>

      {isOpen && canUsePortal && createPortal(modalContent, document.body)}
    </div>
  );
};
