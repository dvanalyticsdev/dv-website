import React from 'react';

export interface PosterTool {
  name: string;
  icon: string;
}

export interface PosterData {
  prefix: string;
  highlight: string;
  subtitle: string;
  duration: string;
  projects: string;
  skills: string;
  domain: 'datascience' | 'analytics' | 'fde' | 'cybersecurity' | 'specialist';
  tools: PosterTool[];
}

export const posterDataMap: Record<string, PosterData> = {
  apids: {
    prefix: 'Advanced Program in',
    highlight: 'Industrial Data Science',
    subtitle: 'with AI Deployment (APIDS)',
    duration: '6 - 8 Months',
    projects: 'Industry Projects',
    skills: 'Job Ready Skills',
    domain: 'datascience',
    tools: [
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Cloud', icon: 'cloud' },
      { name: 'ML & DL', icon: 'ml' },
      { name: 'Gen AI & LLMs', icon: 'genai' },
      { name: 'Deep Learning', icon: 'network' },
    ],
  },
  apida: {
    prefix: 'Advance Program in',
    highlight: 'Industrial Data Analytics',
    subtitle: 'with Gen AI & Agentic AI (APIDA)',
    duration: '5 Months',
    projects: 'Industry Projects',
    skills: 'Job Ready Skills',
    domain: 'analytics',
    tools: [
      { name: 'Excel & VBA', icon: 'excel' },
      { name: 'SQL', icon: 'sql' },
      { name: 'BI Analytics', icon: 'bi' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'Python Analytics', icon: 'python' },
      { name: 'Predictive AI', icon: 'predictive' },
    ],
  },
  fde: {
    prefix: 'Master Program in',
    highlight: 'AI Forward Deployment Engineer',
    subtitle: '(FDE)',
    duration: '6 - 8 Months',
    projects: 'Industry Projects',
    skills: 'Job Ready Skills',
    domain: 'fde',
    tools: [
      { name: 'Programming', icon: 'python' },
      { name: 'Gen AI & LLMs', icon: 'genai' },
      { name: 'Cloud & APIs', icon: 'cloud' },
      { name: 'RAG & Agents', icon: 'rag' },
      { name: 'Vector DBs', icon: 'vectordb' },
      { name: 'MLOps & Docker', icon: 'docker' },
    ],
  },
  apcs: {
    prefix: 'AI Integrated Advanced Program in',
    highlight: 'Cybersecurity & Forensics',
    subtitle: '(APCF)',
    duration: '6 Months',
    projects: 'Hands-on Labs',
    skills: 'Job Ready Skills',
    domain: 'cybersecurity',
    tools: [
      { name: 'Network Security', icon: 'security' },
      { name: 'Ethical Hacking', icon: 'terminal' },
      { name: 'SOC & SIEM', icon: 'soc' },
      { name: 'Splunk', icon: 'splunk' },
      { name: 'Forensics', icon: 'forensics' },
      { name: 'Cloud Security', icon: 'cloudsec' },
    ],
  },
  specialist: {
    prefix: 'Professional Program in',
    highlight: 'Data Analytics Specialist',
    subtitle: '(DAS)',
    duration: '4 Months',
    projects: 'Industry Projects',
    skills: 'Job Ready Skills',
    domain: 'specialist',
    tools: [
      { name: 'Excel & Copilot', icon: 'excel' },
      { name: 'SQL Server', icon: 'sql' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'Python', icon: 'python' },
      { name: 'Tableau', icon: 'tableau' },
      { name: 'KPI Dashboards', icon: 'bi' },
    ],
  },
  flp: {
    prefix: 'Self-Paced Program in',
    highlight: 'Flexi Learning Program',
    subtitle: 'in Data Science & AI (FLP)',
    duration: 'Self-Paced',
    projects: 'Hands-on Projects',
    skills: 'Job Ready Skills',
    domain: 'datascience',
    tools: [
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'ML & DL', icon: 'ml' },
      { name: 'Gen AI', icon: 'genai' },
      { name: 'AI Projects', icon: 'bi' },
    ],
  },
};

export const ToolIcon: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case 'python':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M11.9 2c-3.1 0-4.9.4-4.9 1.9v1.9h5v.6H5.2C3.4 6.4 2 8 2 11.2s1.4 4.8 3.2 4.8h1.2v-1.7c0-1.8 1.5-3.3 3.3-3.3h5.1c1.5 0 2.6-1.1 2.6-2.6V4.5C17.6 2.6 15.6 2 11.9 2zm-1.5 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#387eb8"/>
          <path d="M12.1 22c3.1 0 4.9-.4 4.9-1.9v-1.9h-5v-.6h6.8c1.8 0 3.2-1.6 3.2-4.8s-1.4-4.8-3.2-4.8h-1.2v1.7c0 1.8-1.5 3.3-3.3 3.3H9.2c-1.5 0-2.6 1.1-2.6 2.6v4.9c0 1.9 2 2.5 5.5 2.5zm1.5-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#ffe052"/>
        </svg>
      );
    case 'sql':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <ellipse cx="12" cy="5" rx="8" ry="3" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1.8"/>
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#0284c7" strokeWidth="1.8"/>
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#0284c7" strokeWidth="1.8"/>
        </svg>
      );
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#0284c7" fillOpacity="0.15" stroke="#0284c7" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M12 16v-6m-2.5 2.5L12 10l2.5 2.5" stroke="#ef5323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'ml':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect x="3" y="13" width="4" height="8" rx="1.5" fill="#3b82f6" />
          <rect x="10" y="8" width="4" height="13" rx="1.5" fill="#06b6d4" />
          <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#ef5323" />
        </svg>
      );
    case 'genai':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M12 2a4 4 0 0 0-4 4v1.1A4.5 4.5 0 0 0 4 11.5c0 1.8 1.1 3.4 2.7 4.1A4 4 0 0 0 11 20h2a4 4 0 0 0 4.3-4.4c1.6-.7 2.7-2.3 2.7-4.1a4.5 4.5 0 0 0-4-4.4V6a4 4 0 0 0-4-4z" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="11" r="2.5" fill="#ec4899" />
          <path d="M12 5v2m0 8v2M8 11H6m12 0h-2" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    case 'network':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <circle cx="6" cy="6" r="3" fill="#3b82f6"/>
          <circle cx="18" cy="6" r="3" fill="#ef5323"/>
          <circle cx="12" cy="18" r="3" fill="#10b981"/>
          <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" stroke="#94a3b8" strokeWidth="1.5"/>
          <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" stroke="#94a3b8" strokeWidth="1.5"/>
          <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" stroke="#94a3b8" strokeWidth="1.5"/>
        </svg>
      );
    case 'excel':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3.5" fill="#107c41" />
          <path d="M8.5 7.5l7 9m0-9l-7 9" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'powerbi':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect x="4" y="13" width="3.5" height="7" rx="1.5" fill="#eab308" />
          <rect x="10" y="8" width="3.5" height="12" rx="1.5" fill="#f59e0b" />
          <rect x="16" y="4" width="3.5" height="16" rx="1.5" fill="#ef5323" />
        </svg>
      );
    case 'bi':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="32 18"/>
          <circle cx="12" cy="12" r="8" stroke="#ef5323" strokeWidth="3" strokeDasharray="18 32" strokeDashoffset="18"/>
        </svg>
      );
    case 'predictive':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M3 18l5-6 4 3 6-8 3 2" stroke="#ef5323" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="21" cy="9" r="2.5" fill="#3b82f6" />
        </svg>
      );
    case 'rag':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect x="4" y="4" width="12" height="15" rx="2" fill="#0284c7" fillOpacity="0.1" stroke="#0284c7" strokeWidth="1.8"/>
          <line x1="7" y1="8" x2="13" y2="8" stroke="#0284c7" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="7" y1="12" x2="11" y2="12" stroke="#0284c7" strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="16" cy="16" r="3.5" stroke="#ef5323" strokeWidth="2"/>
          <line x1="18.5" y1="18.5" x2="21" y2="21" stroke="#ef5323" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'vectordb':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <polygon points="12,2 21,7 12,12 3,7" fill="#8b5cf6" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="1.6" />
          <polygon points="3,7 12,12 12,22 3,17" fill="#7c3aed" fillOpacity="0.4" stroke="#7c3aed" strokeWidth="1.6" />
          <polygon points="21,7 12,12 12,22 21,17" fill="#6d28d9" fillOpacity="0.5" stroke="#6d28d9" strokeWidth="1.6" />
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect x="3" y="10" width="3" height="3" rx="0.5" fill="#2496ed"/>
          <rect x="7" y="10" width="3" height="3" rx="0.5" fill="#2496ed"/>
          <rect x="11" y="10" width="3" height="3" rx="0.5" fill="#2496ed"/>
          <rect x="7" y="6" width="3" height="3" rx="0.5" fill="#2496ed"/>
          <rect x="11" y="6" width="3" height="3" rx="0.5" fill="#2496ed"/>
          <path d="M2 14c1 4 5 7 10 7s9-3 10-6c-1 0-3-1-4-1-1.5 0-3.5 1-5 1s-4-1-6-1c-2 0-4 0-5 0z" fill="#0284c7" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1.5"/>
        </svg>
      );
    case 'security':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M12 2L4 5v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V5l-8-3z" fill="#0d9488" fillOpacity="0.2" stroke="#0d9488" strokeWidth="1.8"/>
          <path d="M9 12l2 2 4-4" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'terminal':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
          <path d="M7 9l3 3-3 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="15" x2="16" y2="15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'soc':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#0284c7" strokeWidth="1.6"/>
          <circle cx="12" cy="12" r="5" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 3"/>
          <line x1="12" y1="12" x2="19" y2="8" stroke="#ef5323" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill="#ef5323"/>
        </svg>
      );
    case 'splunk':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M6 5l8 7-8 7" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="12" r="2.5" fill="#f59e0b"/>
        </svg>
      );
    case 'forensics':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#0284c7" strokeWidth="1.8"/>
          <line x1="16" y1="16" x2="21" y2="21" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M9 11c0-1.1.9-2 2-2s2 .9 2 2c0 2-2 3-2 3" stroke="#ef5323" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      );
    case 'cloudsec':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M19 11h-.6A7 7 0 1 0 7 17h2" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round"/>
          <rect x="13" y="13" width="8" height="6" rx="1.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1.2"/>
          <path d="M15 13v-2a2 2 0 0 1 4 0v2" stroke="#d97706" strokeWidth="1.4"/>
        </svg>
      );
    case 'tableau':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect x="10.5" y="2" width="3" height="20" rx="1" fill="#e8762d"/>
          <rect x="2" y="10.5" width="20" height="3" rx="1" fill="#1f77b4"/>
          <rect x="5.5" y="5.5" width="2.5" height="13" rx="0.8" fill="#4c78a8" transform="rotate(45 6.75 12)"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#0284c7" strokeWidth="1.8"/>
          <polyline points="12 6 12 12 16 14" stroke="#ef5323" strokeWidth="1.8"/>
        </svg>
      );
  }
};

export const PosterLaptopGraphic: React.FC<{ domain: string }> = ({ domain }) => {
  const isSecurity = domain === 'cybersecurity';
  const isFde = domain === 'fde';

  return (
    <svg 
      className="live-poster-laptop-svg" 
      viewBox="0 0 260 205" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Course Curriculum Graphics"
    >
      <defs>
        <radialGradient id={`glow-${domain}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={isSecurity ? '#0d9488' : isFde ? '#6366f1' : '#f97316'} stopOpacity="0.25" />
          <stop offset="70%" stopColor={isSecurity ? '#0284c7' : isFde ? '#3b82f6' : '#0284c7'} stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef5323" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0b1e3b" floodOpacity="0.08" />
        </filter>
        <filter id="laptopShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#0b1e3b" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Ambient soft glow */}
      <circle cx="155" cy="100" r="95" fill={`url(#glow-${domain})`} />

      {/* Floating 3D Widget 1: Top-Left (Mini Bar Chart) */}
      <g filter="url(#badgeShadow)">
        <rect x="8" y="24" width="54" height="50" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="16" y="52" width="7" height="14" rx="2" fill="#3b82f6" />
        <rect x="27" y="42" width="7" height="24" rx="2" fill="#06b6d4" />
        <rect x="38" y="32" width="7" height="34" rx="2" fill="#ef5323" />
        <circle cx="47" cy="30" r="2.5" fill="#10b981" />
      </g>

      {/* Floating 3D Widget 2: Top-Right (Donut ring) */}
      <g filter="url(#badgeShadow)">
        <rect x="198" y="16" width="54" height="50" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="225" cy="41" r="13" stroke="#0ea5e9" strokeWidth="5" strokeDasharray="52 30" fill="none" />
        <circle cx="225" cy="41" r="13" stroke="#ef5323" strokeWidth="5" strokeDasharray="30 52" strokeDashoffset="30" fill="none" />
      </g>

      {/* Floating 3D Widget 3: Right Side (Database Cylinder Stack) */}
      <g filter="url(#badgeShadow)">
        <rect x="204" y="96" width="48" height="50" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <ellipse cx="228" cy="112" rx="13" ry="4" fill="#38bdf8" />
        <path d="M 215 112 v 8 c 0 2.2 5.8 4 13 4 s 13 -1.8 13 -4 v -8" fill="#0284c7" />
        <path d="M 215 122 v 8 c 0 2.2 5.8 4 13 4 s 13 -1.8 13 -4 v -8" fill="#0369a1" />
        <ellipse cx="228" cy="112" rx="13" ry="4" fill="#7dd3fc" />
      </g>

      {/* Floating 3D Widget 4: Top Far-Right (Connected Node Graph) */}
      <g filter="url(#badgeShadow)">
        <rect x="156" y="2" width="38" height="36" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="166" cy="15" r="3" fill="#3b82f6" />
        <circle cx="184" cy="15" r="3" fill="#ef5323" />
        <circle cx="175" cy="27" r="2.8" fill="#10b981" />
        <line x1="169" y1="15" x2="181" y2="15" stroke="#cbd5e1" strokeWidth="1.2" />
        <line x1="167" y1="18" x2="173" y2="25" stroke="#cbd5e1" strokeWidth="1.2" />
        <line x1="183" y1="18" x2="177" y2="25" stroke="#cbd5e1" strokeWidth="1.2" />
      </g>

      {/* Laptop Drop Shadow */}
      <ellipse cx="140" cy="190" rx="90" ry="7" fill="#0b1e3b" fillOpacity="0.14" />

      {/* Laptop Main Body */}
      <g filter="url(#laptopShadow)">
        {/* Screen Outer Bezel */}
        <polygon points="62,60 214,56 222,154 54,154" fill="#0f172a" />
        
        {/* Screen Display Frame */}
        <polygon points="66,63 210,60 217,150 58,150" fill="#0b1329" />

        {/* Screen Top Bar */}
        <line x1="68" y1="72" x2="209" y2="69" stroke="#1e293b" strokeWidth="1" />
        <circle cx="75" cy="68" r="2" fill="#ef4444" />
        <circle cx="82" cy="68" r="2" fill="#eab308" />
        <circle cx="89" cy="68" r="2" fill="#22c55e" />

        {isSecurity ? (
          /* Cybersecurity Radar & Threat Metrics */
          <>
            <circle cx="138" cy="106" r="30" stroke="#0d9488" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <circle cx="138" cy="106" r="18" stroke="#0d9488" strokeWidth="1" strokeDasharray="3 3" fill="none"/>
            <line x1="138" y1="76" x2="138" y2="136" stroke="#0d9488" strokeWidth="1" opacity="0.4"/>
            <line x1="108" y1="106" x2="168" y2="106" stroke="#0d9488" strokeWidth="1" opacity="0.4"/>
            <line x1="138" y1="106" x2="160" y2="88" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="152" cy="94" r="2.5" fill="#ef4444"/>
            <rect x="72" y="78" width="34" height="14" rx="3" fill="#1e293b"/>
            <text x="76" y="88" fill="#38bdf8" fontSize="7" fontWeight="bold">SECURE</text>
          </>
        ) : isFde ? (
          /* AI Forward Deployment Pipeline Blocks */
          <>
            <rect x="72" y="78" width="38" height="14" rx="3" fill="#1e293b"/>
            <rect x="118" y="78" width="40" height="14" rx="3" fill="#312e81"/>
            <rect x="166" y="78" width="40" height="14" rx="3" fill="#831843"/>
            <line x1="110" y1="85" x2="118" y2="85" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
            <line x1="158" y1="85" x2="166" y2="85" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 72 136 Q 105 108, 138 126 T 205 112" stroke="#a855f7" strokeWidth="2" fill="none"/>
            <path d="M 72 136 Q 105 108, 138 126 T 205 112 L 205 146 L 72 146 Z" fill="url(#waveGrad)" opacity="0.4"/>
          </>
        ) : (
          /* Data Science / Analytics Multi-KPI Dashboard */
          <>
            {/* KPI Cards on screen */}
            <rect x="72" y="77" width="40" height="16" rx="3" fill="#1e293b" />
            <rect x="76" y="81" width="18" height="3" rx="1" fill="#38bdf8" />
            <rect x="76" y="87" width="28" height="4" rx="1" fill="#ffffff" opacity="0.8" />

            <rect x="118" y="77" width="40" height="16" rx="3" fill="#1e293b" />
            <rect x="122" y="81" width="18" height="3" rx="1" fill="#ef5323" />
            <rect x="122" y="87" width="28" height="4" rx="1" fill="#ffffff" opacity="0.8" />

            {/* Vertical Bar Chart on screen */}
            <rect x="76" y="128" width="5" height="16" rx="1" fill="#0284c7" />
            <rect x="85" y="120" width="5" height="24" rx="1" fill="#06b6d4" />
            <rect x="94" y="112" width="5" height="32" rx="1" fill="#38bdf8" />
            <rect x="103" y="106" width="5" height="38" rx="1" fill="url(#barGrad)" />

            {/* Donut chart on screen */}
            <circle cx="182" cy="112" r="16" stroke="#0ea5e9" strokeWidth="5" strokeDasharray="64 36" fill="none" />
            <circle cx="182" cy="112" r="16" stroke="#ef5323" strokeWidth="5" strokeDasharray="36 64" strokeDashoffset="36" fill="none" />

            {/* Trend curve */}
            <path d="M 72 142 Q 105 118, 138 132 T 212 122" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <path d="M 72 142 Q 105 118, 138 132 T 212 122 L 212 148 L 72 148 Z" fill="url(#waveGrad)" opacity="0.3" />
          </>
        )}

        {/* Laptop Keyboard Base (Perspective) */}
        <polygon points="54,154 222,154 238,184 38,184" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
        
        {/* Keyboard Inset */}
        <polygon points="62,156 216,156 226,174 48,174" fill="#0f172a" opacity="0.65" />
        
        {/* Keyboard Key-lines */}
        <line x1="66" y1="162" x2="218" y2="162" stroke="#334155" strokeWidth="1" />
        <line x1="62" y1="168" x2="222" y2="168" stroke="#334155" strokeWidth="1" />

        {/* Trackpad */}
        <polygon points="120,175 162,175 164,182 118,182" fill="#94a3b8" opacity="0.9" />

        {/* Front Edge Bevel */}
        <polygon points="38,184 238,184 236,188 40,188" fill="#64748b" />
      </g>
    </svg>
  );
};

export interface LiveCoursePosterProps {
  courseId: string;
  className?: string;
}

export const LiveCoursePoster: React.FC<LiveCoursePosterProps> = ({ courseId, className = '' }) => {
  const normalizedId = courseId.toLowerCase();
  const poster = posterDataMap[normalizedId] || {
    prefix: 'Specialized Program in',
    highlight: 'Advanced Technology Program',
    subtitle: `(${courseId.toUpperCase()})`,
    duration: '6 Months',
    projects: 'Industry Projects',
    skills: 'Job Ready Skills',
    domain: 'datascience' as const,
    tools: [
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Cloud', icon: 'cloud' },
      { name: 'ML & DL', icon: 'ml' },
      { name: 'Gen AI', icon: 'genai' },
      { name: 'Deep Learning', icon: 'network' },
    ],
  };

  return (
    <div className={`live-poster-card ${className}`}>
      {/* Ambient decorative glowing orbs */}
      <div className="live-poster-ambient ambient-orange" aria-hidden="true" />
      <div className="live-poster-ambient ambient-blue" aria-hidden="true" />

      {/* Selectable Header */}
      <div className="live-poster-header">
        <span className="live-poster-prefix">{poster.prefix}</span>
        <h3 className="live-poster-title">{poster.highlight}</h3>
        <span className="live-poster-subtitle">{poster.subtitle}</span>
      </div>

      {/* Live Poster Body: 6 Tool Tiles on Left, 3D Vector Visual on Right */}
      <div className="live-poster-body">
        <div className="live-poster-tools-col">
          {poster.tools.map((tool, tIdx) => (
            <div key={tIdx} className="live-tool-tile" title={tool.name}>
              <div className="live-tool-icon">
                <ToolIcon icon={tool.icon} />
              </div>
              <span className="live-tool-name">{tool.name}</span>
            </div>
          ))}
        </div>

        <div className="live-poster-visual-col">
          <PosterLaptopGraphic domain={poster.domain} />
        </div>
      </div>

      {/* Selectable Bottom Metadata Strip */}
      <div className="live-poster-meta-strip">
        <div className="live-meta-item">
          <svg className="live-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{poster.duration}</span>
        </div>
        <div className="live-meta-divider" />
        <div className="live-meta-item">
          <svg className="live-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>{poster.projects}</span>
        </div>
        <div className="live-meta-divider" />
        <div className="live-meta-item">
          <svg className="live-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          <span>{poster.skills}</span>
        </div>
      </div>
    </div>
  );
};

export interface HorizontalPosterTool {
  name: string;
  icon: string;
}

export interface HorizontalPosterData {
  prefix: string;
  highlight: string;
  subtitle: string;
  domain: 'datascience' | 'analytics' | 'fde' | 'cybersecurity' | 'specialist';
  tools: HorizontalPosterTool[];
}

export const horizontalPosterDataMap: Record<string, HorizontalPosterData> = {
  apids: {
    prefix: 'Advanced Program in',
    highlight: 'Industrial Data Science',
    subtitle: 'with AI Deployment (APIDS)',
    domain: 'datascience',
    tools: [
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'sql' },
      { name: 'ML & DL', icon: 'ml' },
      { name: 'Gen AI & LLMs', icon: 'genai' },
      { name: 'Deployment', icon: 'cloud' },
    ],
  },
  apida: {
    prefix: 'Advance Program in',
    highlight: 'Industrial Data Analytics',
    subtitle: 'with Gen AI & Agentic AI (APIDA)',
    domain: 'analytics',
    tools: [
      { name: 'Excel & VBA', icon: 'excel' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'Python Analytics', icon: 'python' },
      { name: 'Agentic AI', icon: 'genai' },
    ],
  },
  fde: {
    prefix: 'Master Program in',
    highlight: 'AI Forward Deployment Engineer',
    subtitle: '(FDE)',
    domain: 'fde',
    tools: [
      { name: 'Programming', icon: 'python' },
      { name: 'Gen AI & LLMs', icon: 'genai' },
      { name: 'RAG & Agents', icon: 'rag' },
      { name: 'Cloud & APIs', icon: 'cloud' },
      { name: 'MLOps', icon: 'docker' },
    ],
  },
  apcs: {
    prefix: 'AI Integrated Advanced Program in',
    highlight: 'Cybersecurity & Forensics',
    subtitle: '(APCF)',
    domain: 'cybersecurity',
    tools: [
      { name: 'Network Sec', icon: 'security' },
      { name: 'Ethical Hacking', icon: 'terminal' },
      { name: 'Forensics', icon: 'forensics' },
      { name: 'SOC & SIEM', icon: 'splunk' },
      { name: 'Cloud Security', icon: 'cloudsec' },
    ],
  },
  specialist: {
    prefix: 'Professional Program in',
    highlight: 'Data Analytics Specialist',
    subtitle: '(DAS)',
    domain: 'specialist',
    tools: [
      { name: 'Excel & VBA', icon: 'excel' },
      { name: 'SQL Server', icon: 'sql' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'Python', icon: 'python' },
      { name: 'Tableau', icon: 'tableau' },
    ],
  },
  flp: {
    prefix: 'Self-Paced Program in',
    highlight: 'Flexi Learning Program',
    subtitle: 'in Data Science & AI (FLP)',
    domain: 'datascience',
    tools: [
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'ML & DL', icon: 'ml' },
      { name: 'Gen AI', icon: 'genai' },
    ],
  },
};

export const LiveCourseHorizontalPoster: React.FC<{ courseId: string; className?: string }> = ({
  courseId,
  className = '',
}) => {
  const normId = courseId.toLowerCase();
  const poster =
    horizontalPosterDataMap[normId] ||
    horizontalPosterDataMap['apids'];

  return (
    <div className={`live-horizontal-poster ${className}`}>
      {/* Decorative ambient glowing orbs */}
      <div className="horizontal-poster-ambient ambient-orange" aria-hidden="true" />
      <div className="horizontal-poster-ambient ambient-blue" aria-hidden="true" />

      {/* Left side: Header + Horizontal Row of 5 Tools */}
      <div className="horizontal-poster-left">
        <div className="horizontal-poster-header">
          <span className="horizontal-poster-prefix">{poster.prefix}</span>
          <h2 className="horizontal-poster-title">{poster.highlight}</h2>
          <span className="horizontal-poster-subtitle">{poster.subtitle}</span>
        </div>

        <div className="horizontal-poster-tools-row">
          {poster.tools.map((tool, idx) => (
            <div key={idx} className="horizontal-tool-card" title={tool.name}>
              <div className="horizontal-tool-icon">
                <ToolIcon icon={tool.icon} />
              </div>
              <span className="horizontal-tool-label">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: 3D Laptop Graphic with Charts & Floating Badges */}
      <div className="horizontal-poster-right">
        <PosterLaptopGraphic domain={poster.domain} />
      </div>
    </div>
  );
};

export interface LiveCourseFullHeroProps {
  courseId: string;
  courseMeta?: {
    brochurePath?: string;
  };
  onEnroll?: () => void;
  onDownloadBrochure?: () => void;
  enrollRef?: React.RefObject<HTMLButtonElement>;
}

export const LiveCourseFullHero: React.FC<LiveCourseFullHeroProps> = ({
  courseId,
  courseMeta,
  onEnroll,
  onDownloadBrochure,
  enrollRef,
}) => {
  const normId = courseId.toLowerCase();
  const poster =
    horizontalPosterDataMap[normId] ||
    horizontalPosterDataMap['apids'];

  return (
    <section className="course-hero-full-poster">
      {/* Decorative ambient glowing orbs */}
      <div className="full-poster-ambient ambient-orange" aria-hidden="true" />
      <div className="full-poster-ambient ambient-blue" aria-hidden="true" />

      <div className="full-poster-content-container container">
        {/* Left Column: Heading + Tools Row + CTAs */}
        <div className="full-poster-left">
          <div className="full-poster-header">
            <span className="full-poster-prefix">{poster.prefix}</span>
            <h1 className="full-poster-title">{poster.highlight}</h1>
            <span className="full-poster-subtitle">{poster.subtitle}</span>
          </div>

          <div className="full-poster-tools-row">
            {poster.tools.map((tool, idx) => (
              <div key={idx} className="full-poster-tool-card" title={tool.name}>
                <div className="full-poster-tool-icon">
                  <ToolIcon icon={tool.icon} />
                </div>
                <span className="full-poster-tool-label">{tool.name}</span>
              </div>
            ))}
          </div>

          <div className="full-poster-actions">
            <button ref={enrollRef} className="btn-full-poster-enroll" onClick={onEnroll}>
              Enroll Now
            </button>
            <button
              type="button"
              className="btn-full-poster-brochure"
              onClick={onDownloadBrochure}
              disabled={!courseMeta?.brochurePath}
            >
              <svg viewBox="0 0 24 24" className="brochure-download-icon">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {courseMeta?.brochurePath ? 'Download Brochure' : 'Brochure Coming Soon'}
            </button>
          </div>
        </div>

        {/* Right Column: 3D Perspective Laptop Graphic with Dashboard */}
        <div className="full-poster-right">
          <PosterLaptopGraphic domain={poster.domain} />
        </div>
      </div>
    </section>
  );
};
