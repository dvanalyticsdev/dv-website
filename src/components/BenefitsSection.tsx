import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './BenefitsContent.css';

interface BenefitItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const programBenefits: BenefitItem[] = [
  {
    id: 'instructor-training',
    badge: '01',
    title: 'Instructor-Led Training',
    description: 'Learn from experienced industry professionals through interactive live sessions. Get real-time insights, ask questions, & clarify concepts for a deeper understanding.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Presentation Board */}
        <rect x="24" y="10" width="36" height="26" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
        <rect x="26" y="12" width="32" height="22" fill="#eff6ff" />
        {/* Board Chart */}
        <rect x="30" y="24" width="4" height="7" fill="#3b82f6" rx="1" />
        <rect x="36" y="20" width="4" height="11" fill="#10b981" rx="1" />
        <rect x="42" y="17" width="4" height="14" fill="#f59e0b" rx="1" />
        <rect x="48" y="14" width="4" height="17" fill="#ef4444" rx="1" />
        <path d="M28 25L36 19L44 17L52 13" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Stand */}
        <path d="M42 36v8m-7 0h14" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        {/* Instructor */}
        <circle cx="15" cy="18" r="6" fill="#fbcfe8" stroke="#0f172a" strokeWidth="1.8" />
        <path d="M12 17c1-2 5-2 6 0" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 38c0-5 3.5-9 8-9s8 4 8 9" fill="#1e3a8a" stroke="#0f172a" strokeWidth="1.8" />
        <path d="M15 29l2 5-2 2-2-2 2-5z" fill="#ef4444" />
        {/* Pointer stick */}
        <path d="M21 27l12-7" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
        {/* Students */}
        <circle cx="34" cy="50" r="4.5" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M27 60c0-3.5 3-6 7-6s7 2.5 7 6" fill="#0d9488" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="48" cy="50" r="4.5" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M41 60c0-3.5 3-6 7-6s7 2.5 7 6" fill="#ea580c" stroke="#0f172a" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'lms-access',
    badge: '02',
    title: 'LMS Access',
    description: 'Get access to our advanced Learning Management System 24/7. Access recordings, study materials, resources, and track your progress anytime, anywhere.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Laptop Body */}
        <rect x="14" y="22" width="36" height="24" rx="2" fill="#0f172a" stroke="#0f172a" strokeWidth="1.8" />
        <rect x="17" y="25" width="30" height="18" fill="#1e293b" />
        {/* LMS text on screen */}
        <text x="32" y="37" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="900" fontFamily="sans-serif">LMS</text>
        {/* Laptop Base */}
        <path d="M8 46h48a2 2 0 0 1 2 2v1H6v-1a2 2 0 0 1 2-2z" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.8" />
        {/* Graduation Cap on top of laptop */}
        <path d="M38 12l14 6-14 6-14-6 14-6z" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M29 20v4c0 2 4 4 9 4s9-2 9-4v-4" fill="#0f172a" />
        <path d="M47 18v7" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="47" cy="26" r="1.5" fill="#f59e0b" />
        {/* Stack of colorful books */}
        <rect x="6" y="52" width="22" height="4" rx="1" fill="#ef4444" stroke="#0f172a" strokeWidth="1.2" />
        <rect x="8" y="48" width="18" height="4" rx="1" fill="#10b981" stroke="#0f172a" strokeWidth="1.2" />
        <rect x="10" y="44" width="14" height="4" rx="1" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: 'assignments-case-studies',
    badge: '03',
    title: 'Assignments & Case Studies',
    description: 'Strengthen your concepts through well-designed assignments and real-world case studies that enhance problem-solving skills.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clipboard */}
        <rect x="16" y="10" width="32" height="44" rx="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
        {/* Top Clip */}
        <rect x="25" y="7" width="14" height="6" rx="2" fill="#0f172a" />
        {/* Check items */}
        <rect x="22" y="20" width="5" height="5" rx="1" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
        <path d="M23 22.5l1.2 1.2 2.2-2.2" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="31" y1="22.5" x2="42" y2="22.5" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

        <rect x="22" y="29" width="5" height="5" rx="1" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
        <path d="M23 31.5l1.2 1.2 2.2-2.2" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="31" y1="31.5" x2="42" y2="31.5" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

        <rect x="22" y="38" width="5" height="5" rx="1" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
        <path d="M23 40.5l1.2 1.2 2.2-2.2" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="31" y1="40.5" x2="39" y2="40.5" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

        {/* Colorful Pencil */}
        <g transform="rotate(-30 46 44)">
          <rect x="42" y="24" width="6" height="22" rx="1" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.2" />
          <path d="M42 46l3 6 3-6h-6z" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.2" />
          <path d="M44 50l1 2 1-2h-2z" fill="#0f172a" />
          <rect x="42" y="22" width="6" height="3" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.2" />
        </g>
      </svg>
    ),
  },
  {
    id: 'industry-projects',
    badge: '04',
    title: 'Industry Projects',
    description: 'Work on real-time industry projects that give you hands-on experience and help you apply your learning to practical scenarios.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Desktop Monitor */}
        <rect x="10" y="12" width="40" height="28" rx="3" fill="#0f172a" stroke="#0f172a" strokeWidth="1.8" />
        <rect x="13" y="15" width="34" height="22" fill="#1e293b" />
        <path d="M26 40v6h8v-6" stroke="#0f172a" strokeWidth="2" />
        <rect x="22" y="46" width="16" height="3" rx="1.5" fill="#0f172a" />
        {/* Charts on screen */}
        <path d="M24 25A6 6 0 1 1 24 37A6 6 0 0 1 24 25" fill="#0284c7" />
        <path d="M24 25A6 6 0 0 1 30 31H24V25z" fill="#ef4444" />
        <rect x="34" y="28" width="3" height="6" fill="#10b981" rx="0.5" />
        <rect x="38" y="24" width="3" height="10" fill="#38bdf8" rx="0.5" />
        <rect x="42" y="20" width="3" height="14" fill="#f59e0b" rx="0.5" />
        {/* Golden production gear */}
        <circle cx="48" cy="42" r="10" fill="#f97316" stroke="#0f172a" strokeWidth="1.8" />
        <circle cx="48" cy="42" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
        <path d="M48 30v4m0 16v4m-12-12h4m16 0h4m-17-8.5l2.8 2.8m11.4 11.4l2.8 2.8m-17 0l2.8-2.8m11.4-11.4l2.8-2.8" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'capstone-project',
    badge: '05',
    title: 'Capstone Project',
    description: 'Comprehensive end-to-end project to demonstrate your skills, build a strong portfolio, and showcase your ability to deliver real-world solutions.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Red & White Archery Target */}
        <circle cx="28" cy="34" r="18" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
        <circle cx="28" cy="34" r="13" fill="#ffffff" />
        <circle cx="28" cy="34" r="8" fill="#ef4444" />
        <circle cx="28" cy="34" r="3" fill="#ffffff" />
        {/* Arrow in bullseye */}
        <path d="M12 18l16 16" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 16l6 2-2 6" fill="#0284c7" />
        {/* Golden Trophy Cup */}
        <path d="M44 24h12c0 6-3 10-7 11v6h6v4H39v-4h6v-6c-4-1-7-5-7-11h6z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        <path d="M41 27h-4c0 4 2 6 5 6" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M53 27h4c0 4-2 6-5 6" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="47,27 48.5,30 52,30.5 49.5,33 50,36.5 47,35 44,36.5 44.5,33 42,30.5 45.5,30" fill="#fef08a" />
      </svg>
    ),
  },
  {
    id: 'resume-preparation',
    badge: '06',
    title: 'Resume Preparation',
    description: 'Create a professional, job-winning resume that highlights your skills, projects, and achievements to stand out to recruiters.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Resume paper */}
        <rect x="14" y="8" width="34" height="46" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
        {/* Photo avatar */}
        <rect x="19" y="14" width="10" height="10" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
        <circle cx="24" cy="18" r="2.5" fill="#0284c7" />
        <path d="M21 23c0-2 1.5-3 3-3s3 1 3 3" fill="#0284c7" />
        {/* Text lines */}
        <line x1="32" y1="16" x2="43" y2="16" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="21" x2="40" y2="21" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
        {/* Sections */}
        <line x1="19" y1="29" x2="43" y2="29" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="34" x2="38" y2="34" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="39" x2="41" y2="39" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        {/* Check bullets */}
        <circle cx="20" cy="45" r="1.5" fill="#10b981" />
        <circle cx="25" cy="45" r="1.5" fill="#10b981" />
        <circle cx="30" cy="45" r="1.5" fill="#10b981" />
        {/* Pen signing */}
        <g transform="rotate(-35 44 42)">
          <rect x="42" y="24" width="5" height="18" rx="1" fill="#1e3a8a" stroke="#0f172a" strokeWidth="1.2" />
          <path d="M42 42l2.5 5 2.5-5h-5z" fill="#f59e0b" stroke="#0f172a" strokeWidth="1" />
        </g>
      </svg>
    ),
  },
  {
    id: 'linkedin-optimization',
    badge: '07',
    title: 'LinkedIn Optimization',
    description: 'Build a powerful LinkedIn profile that showcases your skills and achievements to attract recruiters and grow your professional network.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Circular LinkedIn Badge */}
        <rect x="12" y="12" width="40" height="40" rx="10" fill="#0a66c2" />
        {/* "in" text */}
        <circle cx="24" cy="24" r="2.8" fill="#ffffff" />
        <rect x="21.5" y="29" width="5" height="14" rx="1" fill="#ffffff" />
        <path d="M31 29h4.8v2.2h.1c.7-1.3 2.3-2.6 4.7-2.6 5 0 6 3.3 6 7.6V43h-5v-6.8c0-1.6 0-3.7-2.3-3.7-2.3 0-2.6 1.8-2.6 3.6V43H31V29z" fill="#ffffff" />
        {/* Green Verification Star Badge */}
        <circle cx="48" cy="48" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        <path d="M45 48l2 2 4-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'mock-interviews',
    badge: '08',
    title: 'Tests & Mock Interviews',
    description: 'Access chapter-wise tests & full-length mock interviews to evaluate your skills and improve your performance.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Interview Desk */}
        <rect x="10" y="44" width="44" height="4" rx="1" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
        {/* Left Person (Interviewer) */}
        <circle cx="20" cy="22" r="5" fill="#fbcfe8" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M12 40c0-4 3.5-7 8-7s8 3 8 7" fill="#0369a1" stroke="#0f172a" strokeWidth="1.5" />
        {/* Right Person (Candidate) */}
        <circle cx="44" cy="22" r="5" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M36 40c0-4 3.5-7 8-7s8 3 8 7" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
        {/* Laptop on desk */}
        <rect x="36" y="36" width="12" height="8" rx="1" fill="#475569" stroke="#0f172a" strokeWidth="1.2" />
        {/* Speech Bubbles */}
        <circle cx="28" cy="14" r="5" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" />
        <text x="28" y="16.5" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold">?</text>
        <circle cx="36" cy="12" r="5" fill="#bbf7d0" stroke="#0f172a" strokeWidth="1.2" />
        <path d="M34 12l1.5 1.5 3-3" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'placement-support',
    badge: '09',
    title: 'Placement Support',
    description: 'Get dedicated placement support including job opportunities, referrals, and guidance to help you kickstart your career.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hiring Team in Background */}
        <circle cx="24" cy="18" r="4" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.2" />
        <path d="M18 32c0-3 2.5-5 6-5s6 2 6 5" fill="#0284c7" stroke="#0f172a" strokeWidth="1.2" />
        <circle cx="40" cy="18" r="4" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.2" />
        <path d="M34 32c0-3 2.5-5 6-5s6 2 6 5" fill="#0d9488" stroke="#0f172a" strokeWidth="1.2" />
        <circle cx="32" cy="14" r="4.5" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.2" />
        <path d="M25 28c0-3.5 3-6 7-6s7 2.5 7 6" fill="#1e3a8a" stroke="#0f172a" strokeWidth="1.2" />
        {/* Gold Star */}
        <polygon points="32,4 33.5,7 37,7.5 34.5,10 35,13.5 32,12 29,13.5 29.5,10 27,7.5 30.5,7" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        {/* Handshake */}
        <path d="M10 44l14 8 8-8-8-8-14 8z" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M54 44l-14 8-8-8 8-8 14 8z" fill="#f97316" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M24 48l8-4 8 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'training-certificate',
    badge: '10',
    title: 'Training & Completion Certificate',
    description: 'Receive a training completion certificate upon successfully completing the program to showcase your achievement.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Certificate Frame */}
        <rect x="12" y="10" width="40" height="46" rx="3" fill="#ffffff" stroke="#051f40" strokeWidth="2.5" />
        {/* Top Header Stripe */}
        <rect x="17" y="15" width="30" height="6" fill="#051f40" />
        <text x="32" y="19.5" textAnchor="middle" fill="#ffffff" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">CERTIFICATE</text>
        {/* Content Lines */}
        <line x1="18" y1="26" x2="46" y2="26" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="31" x2="42" y2="31" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="36" x2="44" y2="36" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        {/* Gold Seal with Red Ribbons */}
        <path d="M38 46l3 10-5-3-5 3 3-10" fill="#e11d48" stroke="#0f172a" strokeWidth="1" />
        <circle cx="36" cy="46" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="36" cy="46" r="4.5" fill="#fef08a" />
      </svg>
    ),
  },
];

const lmsBenefits: BenefitItem[] = [
  {
    id: 'lms-recordings',
    badge: '01',
    title: 'Post Class Materials with Live Recorded Videos Access',
    description: 'Get lifetime access to live recorded sessions, slides, notes and other study materials anytime, anywhere to revise and strengthen your concepts.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Laptop */}
        <rect x="12" y="16" width="36" height="24" rx="2" fill="#0f172a" stroke="#0f172a" strokeWidth="1.8" />
        <rect x="15" y="19" width="30" height="18" fill="#1e293b" />
        <path d="M6 40h48a2 2 0 0 1 2 2v2H4v-2a2 2 0 0 1 2-2z" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
        {/* Red Play Button */}
        <circle cx="30" cy="28" r="6" fill="#ef4444" />
        <polygon points="28,25 34,28 28,31" fill="#ffffff" />
        {/* Video Timeline */}
        <rect x="18" y="33" width="24" height="2" rx="1" fill="#334155" />
        <rect x="18" y="33" width="14" height="2" rx="1" fill="#38bdf8" />
        {/* Potted Green Plant on Left */}
        <rect x="6" y="28" width="6" height="6" rx="1" fill="#f97316" />
        <path d="M9 28c-2-4 0-8 3-8s1 4-3 8z" fill="#10b981" />
        <path d="M9 28c2-4 0-8-3-8s-1 4 3 8z" fill="#34d399" />
        {/* Colorful Notes Stack */}
        <rect x="46" y="32" width="12" height="10" rx="1.5" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" />
        <line x1="49" y1="35" x2="55" y2="35" stroke="#0f172a" strokeWidth="1" />
        <line x1="49" y1="38" x2="53" y2="38" stroke="#0f172a" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'lms-assignments',
    badge: '02',
    title: 'Download Session-Wise Assignments & Feedbacks',
    description: 'Access session-wise assignments, complete them at your convenience and upload for evaluation with detailed feedback from experts.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Assignments Clipboard */}
        <rect x="14" y="10" width="32" height="42" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="2.2" />
        <rect x="23" y="7" width="14" height="6" rx="2" fill="#0f172a" />
        <text x="30" y="19" textAnchor="middle" fill="#0284c7" fontSize="4.2" fontWeight="900" fontFamily="sans-serif">ASSIGNMENTS</text>
        {/* Check items */}
        <path d="M19 25l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="28" y1="26" x2="40" y2="26" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 32l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="28" y1="33" x2="38" y2="33" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 39l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="28" y1="40" x2="36" y2="40" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        {/* Download Button Circle */}
        <circle cx="44" cy="44" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
        <path d="M44 38v8m-3-3l3 3 3-3" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'lms-mcq',
    badge: '03',
    title: 'Test Your Knowledge with MCQs & Practical Questions',
    description: 'Reinforce your learning by attempting MCQs and practical questions. Keep practicing until you score 70% or more to ensure strong concepts.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Computer Screen */}
        <rect x="10" y="12" width="38" height="28" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
        <rect x="12" y="14" width="34" height="24" fill="#f8fafc" />
        <path d="M25 40v6h8v-6" stroke="#0f172a" strokeWidth="2" />
        <rect x="20" y="46" width="18" height="3" rx="1.5" fill="#0f172a" />
        <rect x="14" y="16" width="18" height="4" rx="1" fill="#0284c7" />
        <text x="23" y="19" textAnchor="middle" fill="#ffffff" fontSize="3.5" fontWeight="bold">MCQ TEST</text>
        {/* Radio choices */}
        <circle cx="17" cy="24" r="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
        <line x1="22" y1="24" x2="38" y2="24" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="29" r="2" fill="#10b981" stroke="#10b981" strokeWidth="1" />
        <line x1="22" y1="29" x2="35" y2="29" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17" cy="34" r="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
        <line x1="22" y1="34" x2="32" y2="34" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        {/* Bright Orange Question Balloon */}
        <circle cx="46" cy="36" r="9" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
        <text x="46" y="40.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900" fontFamily="sans-serif">?</text>
      </svg>
    ),
  },
  {
    id: 'lms-resume',
    badge: '04',
    title: 'Fill Resume Form & Get Professional Resume Ready',
    description: 'Fill the resume form with your details and get a professionally crafted resume that highlights your skills and projects.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Laptop */}
        <rect x="12" y="14" width="38" height="26" rx="2" fill="#0f172a" stroke="#0f172a" strokeWidth="1.8" />
        <rect x="15" y="17" width="32" height="20" fill="#ffffff" />
        <path d="M8 40h46a2 2 0 0 1 2 2v2H6v-2a2 2 0 0 1 2-2z" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.5" />
        {/* Resume Layout on Screen */}
        <text x="24" y="23" fill="#2563eb" fontSize="4.5" fontWeight="900">RESUME</text>
        <circle cx="20" cy="30" r="3" fill="#fbcfe8" stroke="#0f172a" strokeWidth="1" />
        <line x1="26" y1="28" x2="42" y2="28" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="32" x2="38" y2="32" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
        {/* Purple Stylus Pen */}
        <g transform="rotate(-30 46 36)">
          <rect x="44" y="18" width="5" height="22" rx="1.5" fill="#8b5cf6" stroke="#0f172a" strokeWidth="1.2" />
          <path d="M44 40l2.5 5 2.5-5h-5z" fill="#fbbf24" stroke="#0f172a" strokeWidth="1" />
        </g>
      </svg>
    ),
  },
  {
    id: 'lms-interview-kit',
    badge: '05',
    title: 'Interviews Preparation Kit (Technical & HR Q&A)',
    description: 'Access a comprehensive interview preparation kit with Q&A on behavioural, technical and projects to boost your confidence.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Candidate at laptop */}
        <circle cx="22" cy="24" r="6" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M12 48c0-6 4.5-10 10-10s10 4 10 10" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
        {/* Laptop */}
        <rect x="24" y="40" width="16" height="10" rx="1.5" fill="#0f172a" />
        <path d="M20 50h24v2H20z" fill="#94a3b8" />
        {/* Cyan Q&A Bubble "?" */}
        <circle cx="38" cy="18" r="7" fill="#06b6d4" stroke="#0f172a" strokeWidth="1.5" />
        <text x="38" y="22" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">?</text>
        {/* Emerald Answer Bubble "!" */}
        <circle cx="50" cy="22" r="7" fill="#10b981" stroke="#0f172a" strokeWidth="1.5" />
        <text x="50" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">!</text>
      </svg>
    ),
  },
  {
    id: 'lms-mentor-mock',
    badge: '06',
    title: 'Request Mock Interviews by Industry Mentors',
    description: 'Schedule mock interviews with industry mentors, get real-time feedback and improve your performance.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Video Call Monitor */}
        <rect x="10" y="10" width="44" height="34" rx="3" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
        <rect x="13" y="13" width="38" height="28" fill="#1e293b" />
        <path d="M28 44v6h8v-6" stroke="#0f172a" strokeWidth="2" />
        <rect x="22" y="50" width="20" height="3" rx="1.5" fill="#0f172a" />
        {/* Mentor in suit */}
        <circle cx="28" cy="23" r="5" fill="#fed7aa" />
        <path d="M21 37c0-4 3.5-7 7-7s7 3 7 7" fill="#1e3a8a" />
        <path d="M27 30l1 4-1 1-1-1 1-4z" fill="#ef4444" />
        {/* Student thumbnail in corner */}
        <rect x="36" y="26" width="13" height="13" rx="1.5" fill="#0369a1" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="42.5" cy="31" r="2.5" fill="#fed7aa" />
        <path d="M39 39c0-2 1.5-3 3.5-3s3.5 1 3.5 3" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 'lms-elite-test',
    badge: '07',
    title: 'Appear for DV Elite Test for Placement Support',
    description: 'Clear the DV Elite Test to become eligible for placement assistance and connect with top hiring partners.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clipboard */}
        <rect x="14" y="8" width="32" height="44" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="2.2" />
        <rect x="23" y="5" width="14" height="6" rx="2" fill="#0f172a" />
        <text x="30" y="18" textAnchor="middle" fill="#0284c7" fontSize="4" fontWeight="900">DV ELITE TEST</text>
        {/* Checkmarks */}
        <path d="M19 24l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="24" x2="38" y2="24" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 31l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="31" x2="38" y2="31" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 38l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="38" x2="38" y2="38" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        {/* Magenta Elite Rosette Badge with Ribbons */}
        <path d="M46 48l3 10-5-3-5 3 3-10" fill="#ec4899" stroke="#be185d" strokeWidth="1" />
        <circle cx="44" cy="46" r="8" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
        <path d="M41 46l2 2 4-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'lms-certifications',
    badge: '08',
    title: 'Training & Industry Data Science & AI Certificates',
    description: 'Earn recognized Training & Industry Data Science & AI skill certificates to validate your expertise and boost your career.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Certificate 1 (Training - Gold) */}
        <rect x="8" y="14" width="24" height="34" rx="2" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
        <rect x="11" y="17" width="18" height="5" fill="#f59e0b" />
        <text x="20" y="21" textAnchor="middle" fill="#ffffff" fontSize="3" fontWeight="bold">TRAINING</text>
        <line x1="12" y1="26" x2="28" y2="26" stroke="#94a3b8" strokeWidth="1" />
        <line x1="14" y1="30" x2="26" y2="30" stroke="#94a3b8" strokeWidth="1" />
        <circle cx="20" cy="38" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        <path d="M20 42l2 5-3-1.5-3 1.5 1.5-5" fill="#d97706" />

        {/* Certificate 2 (Industry - Teal/Cyan) */}
        <rect x="32" y="14" width="24" height="34" rx="2" fill="#ffffff" stroke="#06b6d4" strokeWidth="2" />
        <rect x="35" y="17" width="18" height="5" fill="#06b6d4" />
        <text x="44" y="21" textAnchor="middle" fill="#ffffff" fontSize="3" fontWeight="bold">INDUSTRY</text>
        <line x1="36" y1="26" x2="52" y2="26" stroke="#94a3b8" strokeWidth="1" />
        <line x1="38" y1="30" x2="50" y2="30" stroke="#94a3b8" strokeWidth="1" />
        <circle cx="44" cy="38" r="4" fill="#22d3ee" stroke="#0891b2" strokeWidth="1" />
        <path d="M44 42l2 5-3-1.5-3 1.5 1.5-5" fill="#0891b2" />
      </svg>
    ),
  },
];

export const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'program' | 'lms' | 'certificate'>('program');
  const revealRef = useScrollReveal(activeTab);

  const titleMap = {
    program: 'Program Benefits',
    lms: 'LMS Platform Benefits',
    certificate: 'Certificates',
  } as const;

  return (
    <section className="benefits-section" id="benefits">
      <div className="benefits-container">
        {/* Title Header */}
        <div className="benefits-header reveal-on-scroll">
          <span className="benefits-subtitle">Maximize Your Success</span>
          <h2 className="benefits-title">{titleMap[activeTab]}</h2>

          {/* Decorative Divider */}
          <div className="benefits-title-divider">
            <div className="divider-line"></div>
            <div className="divider-diamond">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="#051f40" />
              </svg>
            </div>
            <div className="divider-line"></div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="benefits-tab-switcher reveal-on-scroll delay-1">
          <button
            className={`tab-btn ${activeTab === 'program' ? 'active' : ''}`}
            onClick={() => setActiveTab('program')}
          >
            Core Program Benefits
          </button>
          <button
            className={`tab-btn ${activeTab === 'lms' ? 'active' : ''}`}
            onClick={() => setActiveTab('lms')}
          >
            LMS Platform Benefits
          </button>
          <button
            className={`tab-btn ${activeTab === 'certificate' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificate')}
          >
            Certificates
          </button>
        </div>

        {/* Benefits Display Area */}
        <div className="benefits-image-container" ref={revealRef}>
          {activeTab === 'program' ? (
            <div className="benefits-interactive-wrapper" key="program-interactive">
              <div className="benefits-inner-banner">
                <h3 className="benefits-inner-title">
                  <span className="title-primary">PROGRAM</span>
                  <span className="title-highlight">BENEFITS</span>
                </h3>
                <div className="benefits-inner-divider">
                  <div className="line"></div>
                  <div className="diamond">✦</div>
                  <div className="line"></div>
                </div>
              </div>

              <div className="benefits-content-grid benefits-grid-program">
                {programBenefits.map((item) => (
                  <div key={item.id} className="benefit-card-interactive">
                    <span className="benefit-card-badge">{item.badge}</span>
                    <h4 className="benefit-card-heading">{item.title}</h4>
                    <div className="benefit-card-icon-frame" aria-hidden="true">
                      {item.icon}
                    </div>
                    <p className="benefit-card-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'lms' ? (
            <div className="benefits-interactive-wrapper" key="lms-interactive">
              <div className="benefits-inner-banner">
                <h3 className="benefits-inner-title">
                  <span className="title-primary">LMS</span>
                  <span className="title-highlight">BENEFITS</span>
                </h3>
                <div className="benefits-inner-divider">
                  <div className="line"></div>
                  <div className="diamond">✦</div>
                  <div className="line"></div>
                </div>
              </div>

              <div className="benefits-content-grid benefits-grid-lms">
                {lmsBenefits.map((item) => (
                  <div key={item.id} className="benefit-card-interactive">
                    <span className="benefit-card-badge">{item.badge}</span>
                    <h4 className="benefit-card-heading">{item.title}</h4>
                    <div className="benefit-card-icon-frame" aria-hidden="true">
                      {item.icon}
                    </div>
                    <p className="benefit-card-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="benefits-certificates-grid" key="certificate-grid">
              <img
                src="/benefits-certificates/certificate-1.jpeg"
                alt="DV Analytics certificate sample 1"
                className="benefits-display-image benefits-certificate-image"
                loading="lazy"
              />
              <img
                src="/benefits-certificates/certificate-2.jpeg"
                alt="DV Analytics certificate sample 2"
                className="benefits-display-image benefits-certificate-image"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
