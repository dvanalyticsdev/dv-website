import React from 'react';

interface CourseItem {
  id: string;
  title: string;
  tagline: string;
  poster: string;
}

interface AauModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
}

export const AauModal: React.FC<AauModalProps> = ({ isOpen, onClose, onSelectCourse }) => {
  if (!isOpen) return null;

  const courses: CourseItem[] = [
    {
      id: 'apids',
      title: 'Advanced Program in Industrial Data Science & AI (APIDS)',
      tagline: 'A comprehensive industry-oriented program covering the complete lifecycle of data-driven business solutions—from data collection to AI deployment in the cloud.',
      poster: '/courses-poster/APIDS.jpeg'
    },
    {
      id: 'apida',
      title: 'Advanced Program in Industrial Data Analytics & AI (APIDA)',
      tagline: 'A comprehensive industry-focused program combining Data Management, Business Intelligence, Machine Learning, and MLOps for analytics professionals.',
      poster: '/courses-poster/APIDA.jpeg'
    },
    {
      id: 'specialist',
      title: 'Data Analytics Specialist (DAS)',
      tagline: 'Build expertise in Data Analytics, Business Intelligence, Reporting, and Data Visualization with industry-standard tools.',
      poster: '/courses-poster/DAS.jpeg'
    },
    {
      id: 'aiml',
      title: 'Advanced AI/ML with Generative AI & Agentic AI (AIML-GAA)',
      tagline: 'Master the complete AI lifecycle from data preparation and ML model development to Generative AI, Agentic AI, and enterprise-grade deployment.',
      poster: '/courses-poster/AIML - GAA.jpeg'
    },
    {
      id: 'genai',
      title: 'Master Program in Generative AI & Agentic AI (MPGAA)',
      tagline: 'Specialize in Deep Learning, NLP, Generative AI, Agentic AI, and enterprise AI deployment for next-generation intelligent systems.',
      poster: '/courses-poster/MPGAA.jpeg'
    },
    {
      id: 'apcs',
      title: 'Advanced Program in Cybersecurity & Forensics (APCF)',
      tagline: 'Comprehensive training in Cybersecurity, Ethical Hacking, Digital Forensics, Threat Intelligence, and Security Operations.',
      poster: '/courses-poster/APCF.jpeg'
    }
  ];

  return (
    <div className="aau-modal-overlay" onClick={onClose}>
      <div className="aau-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="aau-modal-header">
          <h2>DV Analytics University (DVU) Programs</h2>
          <p>Select an advanced industry-ready career path to view full syllabus and enrollment options</p>
          <button className="aau-modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="aau-modal-body">
          <div className="aau-courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="aau-course-card">
                <div className="aau-poster-wrapper">
                  <img src={course.poster} alt={course.title} className="aau-poster-img" />
                </div>
                <div className="aau-card-content">
                  <p className="aau-card-tagline">{course.tagline}</p>
                  <button className="aau-card-btn" onClick={() => onSelectCourse(course.id)}>
                    View Course Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
