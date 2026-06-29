# Agentify AI Website

Last updated: 2026-06-24

This project is the current Agentify AI marketing website built with React, TypeScript, and Vite. It also includes a grounded website chatbot named Eva, backed by Gemini for local development and Vercel deployment.

## Current functionality
- Multi-section marketing site for Agentify AI
- Dedicated content views for About, Services, FAQs, Enrollment, program details, and success-story sections
- Animated hero and interaction effects
- Course/program data-driven pages from `src/data/coursesData.*`
- Chatbot widget with page-aware context
- Gemini-backed answer generation through local server and serverless API routes
- Grounded knowledge layer for courses, site sections, services, FAQs, roadmaps, and contact information
- Health endpoint for chatbot configuration checks

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
- `ChatbotWidget.tsx`

## Chatbot architecture
- `server/chatbotApi.mjs` - shared chatbot request logic
- `server/chatbotKnowledge.mjs` - grounded site/course knowledge and policy layer
- `server/chatbotServer.mjs` - local HTTP chatbot server
- `api/chat.mjs` - Vercel serverless chatbot endpoint
- `api/health.mjs` - Vercel health endpoint

## Current chatbot endpoints
Local or deployed chatbot layer exposes:
- `GET /api/health`
- `POST /api/chat`

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

Run the chatbot server locally:
```bash
npm run chatbot
```

Build for production:
```bash
npm run build
```

Other useful commands:
```bash
npm run lint
npm run preview
```

## Environment variables
Use `.env` for the chatbot/runtime configuration.

Current variables used by the chatbot layer include:
- `GEMINI_API_KEY` - required for chatbot responses
- `GEMINI_MODEL` - optional model override, defaults to `gemini-3.1-flash-lite`
- `CHATBOT_PORT` - optional local chatbot port, defaults to `8787`

## Notes
- The previous README was still the default Vite template. This version documents the actual React site, chatbot server, and grounded knowledge system that now ship with the project.
- `vercel.json` and `api/` are part of the active deployment path, not just experimental files.
