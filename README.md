# DV Analytics Website

Last updated: 2026-09-08

This project is the current DV Analytics marketing website built with React, TypeScript, and Vite.

## Current functionality
- Multi-section marketing site for DV Analytics
- Dedicated content views for About, Services, FAQs, Enrollment, program details, SEO landing pages, and success-story sections
- Animated hero and interaction effects
- Course/program data-driven pages from `src/data/coursesData.*`
- Route-specific SEO metadata, schema, static HTML generation, and sitemap output

## Main frontend areas
Key files in `src/components/`:
- `Header.tsx`
- `AboutPage.tsx`
- `ServicesPage.tsx`
- `FaqsPage.tsx`
- `EnrollmentPage.tsx`
- `CourseDetailPage.tsx`
- `ProgramsSection.tsx`
- `BenefitsSection.tsx`
- `RoadmapSection.tsx`
- `SuccessStories.tsx`

## Local development
Prerequisites:
- Node.js

Install dependencies:
```bash
npm install
```

Run the website:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Other useful commands:
```bash
npm run lint
npm run seo:audit
npm run preview
```
