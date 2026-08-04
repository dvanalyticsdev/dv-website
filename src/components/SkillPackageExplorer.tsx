import { useEffect, useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { coursesData } from '../data/coursesData';

type CourseId = 'apids' | 'apida' | 'specialist' | 'aiml' | 'genai' | 'apcs' | 'days7_genai' | 'fde';
type CourseDataId = Uppercase<CourseId>;

interface SkillOption {
  id: string;
  label: string;
  weights: Partial<Record<CourseId, number>>;
}

interface CourseRecommendation {
  id: CourseId;
  title: string;
  expectedPackage: string;
  fit: string;
  roles: string[];
}

interface SkillPackageExplorerProps {
  onViewDetails?: (courseId: string) => void;
  className?: string;
}

const skillOptions: SkillOption[] = [
  { id: 'sql', label: 'SQL', weights: { specialist: 3, apida: 3, apids: 2 } },
  { id: 'excel-bi', label: 'Excel / Power BI / Tableau', weights: { specialist: 4, apida: 4, apids: 2 } },
  { id: 'python', label: 'Python', weights: { apida: 2, apids: 3, aiml: 3, genai: 2, fde: 2 } },
  { id: 'statistics', label: 'Statistics', weights: { apida: 3, apids: 3, aiml: 2 } },
  { id: 'machine-learning', label: 'Machine Learning', weights: { apida: 2, apids: 4, aiml: 4, fde: 2 } },
  { id: 'deep-learning', label: 'Deep Learning / NLP', weights: { apids: 3, aiml: 4, genai: 4 } },
  { id: 'genai', label: 'Generative AI', weights: { apids: 3, aiml: 4, genai: 5, days7_genai: 4, fde: 4 } },
  { id: 'agentic-ai', label: 'Agentic AI', weights: { aiml: 4, genai: 5, days7_genai: 5, fde: 5 } },
  { id: 'cloud-mlops', label: 'Cloud / MLOps / LLMOps', weights: { apids: 4, aiml: 4, genai: 3, fde: 5 } },
  { id: 'data-engineering', label: 'Data Engineering', weights: { apids: 4, apida: 2, fde: 4 } },
  { id: 'cybersecurity', label: 'Cybersecurity / SOC', weights: { apcs: 5 } },
  { id: 'ethical-hacking', label: 'Ethical Hacking / Forensics', weights: { apcs: 5 } },
  { id: 'client-delivery', label: 'Client Solution Delivery', weights: { fde: 5, genai: 2, aiml: 2 } },
];

const courseRecommendations: Record<CourseId, CourseRecommendation> = {
  apids: {
    id: 'apids',
    title: 'Advanced Program in Industrial Data Science & AI (APIDS)',
    expectedPackage: '6-12 LPA fresher | 12-25+ LPA experienced',
    fit: 'Best for a complete Data Science, AI, GenAI, and cloud deployment path.',
    roles: ['Data Scientist', 'AI Engineer', 'ML Engineer'],
  },
  apida: {
    id: 'apida',
    title: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
    expectedPackage: '4-8 LPA fresher | 8-14+ LPA experienced',
    fit: 'Best for analytics, BI, reporting, statistics, and ML-based decision work.',
    roles: ['Data Analyst', 'BI Analyst', 'Analytics Consultant'],
  },
  specialist: {
    id: 'specialist',
    title: 'Data Analytics Specialist (DAS)',
    expectedPackage: '3-6 LPA fresher | 6-10+ LPA experienced',
    fit: 'Best for a fast practical path into SQL, Excel, Power BI, Tableau, and dashboards.',
    roles: ['Data Analyst', 'MIS Analyst', 'Reporting Analyst'],
  },
  aiml: {
    id: 'aiml',
    title: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)',
    expectedPackage: '6-12 LPA fresher | 15-30+ LPA experienced',
    fit: 'Best for learners targeting ML, Deep Learning, GenAI, Agentic AI, and MLOps roles.',
    roles: ['ML Engineer', 'AI Engineer', 'MLOps Engineer'],
  },
  genai: {
    id: 'genai',
    title: 'Master Program in Generative AI & Agentic AI (MPGAA)',
    expectedPackage: '8-16 LPA entry | 18-35+ LPA experienced',
    fit: 'Best for specialized GenAI, RAG, LLMOps, and autonomous agent product work.',
    roles: ['Generative AI Engineer', 'LLM Engineer', 'AI Product Developer'],
  },
  apcs: {
    id: 'apcs',
    title: 'Advanced Program in Cybersecurity & Forensics (APCF)',
    expectedPackage: '3.5-7 LPA fresher | 8-15+ LPA experienced',
    fit: 'Best for cybersecurity, SOC, ethical hacking, cloud security, and forensics.',
    roles: ['SOC Analyst', 'Cybersecurity Analyst', 'Penetration Tester'],
  },
  days7_genai: {
    id: 'days7_genai',
    title: '7 Days Gen AI & Agentic AI Hands-on Master Program',
    expectedPackage: 'Skill upgrade for 6-12+ LPA AI-adjacent roles',
    fit: 'Best for a short intensive GenAI and Agentic AI hands-on upgrade.',
    roles: ['AI Automation Engineer', 'AI Consultant', 'GenAI Builder'],
  },
  fde: {
    id: 'fde',
    title: 'AI Forward Deployed Engineer (FDE)',
    expectedPackage: '8-18 LPA entry | 18-40+ LPA experienced',
    fit: 'Best for client-facing AI engineering, RAG, agents, data, cloud, and production delivery.',
    roles: ['AI Forward Deployed Engineer', 'AI Solutions Engineer', 'Enterprise AI Consultant'],
  },
};

const defaultRecommendations: CourseId[] = ['apida', 'apids', 'apcs'];

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
      return defaultRecommendations.map((id) => ({ ...courseRecommendations[id], score: 0 }));
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
      .slice(0, 3);
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

            <div className="skill-chip-grid" aria-label="Select skills">
              {skillOptions.map((skill) => {
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
          </div>

          <div className="package-result-panel">
            <div className="skill-panel-heading">
              <h3>{selectedSkills.length > 0 ? 'Recommended path' : 'Popular paths'}</h3>
              <span>{selectedSkills.length} selected</span>
            </div>

            <div className="course-recommendation-list">
              {recommendations.map((recommendation, index) => {
                const course = getCourseData(recommendation.id);

                return (
                  <article className="course-recommendation-card" key={recommendation.id}>
                    <div className="recommendation-rank">
                      {selectedSkills.length > 0 && index === 0 ? 'Best match' : `Option ${index + 1}`}
                    </div>
                    <h4>{course?.title || recommendation.title}</h4>
                    <p>{recommendation.fit}</p>
                    <div className="expected-package">
                      <span>Expected package</span>
                      <strong>{recommendation.expectedPackage}</strong>
                    </div>
                    <div className="recommended-roles">
                      {recommendation.roles.map((role) => (
                        <span key={role}>{role}</span>
                      ))}
                    </div>
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

            <p className="package-note">
              Packages are indicative CTC ranges and vary by city, company, experience, portfolio, and interview performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`skill-package-explorer ${className}`}>
      <button
        type="button"
        className="skill-package-trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        Explore skills and packages
        <span className="skill-package-trigger-icon" aria-hidden="true">{isOpen ? '-' : '+'}</span>
      </button>

      {isOpen && canUsePortal && createPortal(modalContent, document.body)}
    </div>
  );
};
