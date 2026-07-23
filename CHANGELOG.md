# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased] - 2026-07-23

### Added
- Seven service pages: AI Voice Agents, AI Chat & Booking, Speed to Lead, Workflow Automation, CRM Integrations, Websites, Local SEO — each with a full set of animated components under `src/components/services/`
- Contact form API route (`src/app/api/contact/route.ts`) using Resend; sends formatted HTML email with reply-to set to the enquirer; requires `RESEND_API_KEY` and `CONTACT_TO_EMAIL` environment variables
- Privacy notice under the contact form submit button
- ESLint configuration (`eslint.config.mjs`)
- `StatCountUp` UI component for animated number counters
- `ServicesGrid.css` for glass-card hover effects on the homepage services section

### Changed
- ServicesGrid homepage section replaced with real glass-card layout for AI Voice Agents, Workflow Automation, and Websites — removes the previous placeholder cards
- ContactForm now POSTs to `/api/contact` with loading state, inline error handling, and real delivery; previously only fired an analytics event
- ContactForm service dropdown updated to the seven real Aronix services
- Hero layout standardised across all seven service pages: identical `min-h-[100vh] flex items-center` section, `max-w-[var(--ax-container)] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center` container, and `hidden lg:block` mobile card behaviour
- ScopeCalculator price matrix scaled so the highest combination (10+ pages, copy written, custom integrations) caps at USD 1,500
- All bracket placeholder copy (`[X weeks]`, `[$X]`, `[X hours]`, etc.) replaced with final qualitative text across all service pages and content files

### Fixed
- Audit session duration corrected from "45-minute" to "15-minute" across all pages, metadata descriptions, and component copy (8 instances across 6 files)
- LeadFeedHero layout shift: container changed from `min-h` to fixed `h-[280px]`; Framer Motion animation switched from `height: 0 → auto` to `layout` prop with opacity/translate only; `max-w-[400px]` cap removed so card fills its grid column
- ResponseTimeline SVG label clipping: edge-node padding increased from 40 to 80; labels now anchor from the circle edge outward with a consistent 14 px gap; viewBox height increased from 160 to 210
- Workflow Automation and Websites hero sections: removed extra wrapper div (nested container flattened to single grid element)
- CRM Integrations hero: `min-h-screen` normalised to `min-h-[100vh]`; stray `relative` removed from section
- Local SEO hero: `min-h-svh` normalised to `min-h-[100vh]`; gap corrected from `gap-16` to `gap-12 lg:gap-16`
