# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased] - 2026-07-24 (4)

### Added
- `/about` page with hero, founder cards (Ahmed Asif and Muhammad Rayan), mission section, and CtaBand; server component, 536 B, no Framer Motion beyond Reveal scroll fade-ins
- `personSchema()` function in `src/lib/schema.ts`; Person JSON-LD for both founders on the About page
- About link added to footer Company column

### Changed
- `organizationSchema()` updated with `founder` array referencing both founders with their LinkedIn profiles

## [Unreleased] - 2026-07-24 (3)

### Changed
- Locale standardised to `en-US` site-wide: all OpenGraph `locale` fields, HTML `lang` attribute (root layout + global-error), RSS `<language>` tag, and all `toLocaleDateString`/`toLocaleString` JS calls updated from `en-GB` to `en-US` across 30 files; no `en_GB`/`en-GB`/`en-gb` references remain
- Footer LinkedIn link set to `https://www.linkedin.com/company/aronix/`
- Footer Instagram link set to `https://www.instagram.com/aronix.io/`
- `organizationSchema()` `sameAs` array populated with LinkedIn and Instagram URLs

## [Unreleased] - 2026-07-24 (2)

### Added
- `public/llms.txt` scaffolded with site name, description, and links to all nine key pages with one-line descriptions pulled from existing meta descriptions
- `caseStudyArticleSchema()` in `src/lib/schema.ts` — Article JSON-LD for case study pages wired into `case-studies/[slug]/page.tsx`
- `SearchAction` added to `webSiteSchema()` pointing to `/search?q={search_term_string}`
- `inLanguage: "en-US"` and `isPartOf` (blog index) added to `articleSchema()` for blog posts

### Changed
- Homepage meta description trimmed from 173 to 140 chars (removed trailing "Trusted by 40+ growing companies." sentence)
- Workflow Automation meta description trimmed from 165 to 143 chars
- CRM Integrations meta description trimmed from 158 to 139 chars
- Local SEO meta description trimmed from 163 to 151 chars
- Case Studies index meta description trimmed from 161 to 149 chars
- Contact page title changed from "Contact" to "Book a Free Automation Audit | Aronix"
- Blog page title changed from "Blog" to "Business Automation Blog | Aronix"
- Case Studies index title changed from "Case Studies" to "Business Automation Case Studies | Aronix"
- `serviceSchema()` — hardcoded `areaServed: { Country: "United Kingdom" }` removed; replaced with TODO comment pending geography confirmation
- `organizationSchema()` — `sameAs`, `telephone`, `contactPoint`, `address` added as commented-out placeholders with TODO notes
- Dashboard layout — `robots: { index: false, follow: false }` added to metadata
- Sitemap homepage entry path fixed from `""` to `"/"`
- Footer `socialLinks` array — added TODO comment marking `href: "#"` values as pending real URLs

### Removed
- Broken audio demo section from AI Voice Agents page (no real audio file exists; `Play` import also removed)

## [Unreleased] - 2026-07-24

### Changed
- `ToolMarquee`: batch all `getBoundingClientRect` reads into a single pass on mouseenter (after marquee pauses) instead of interleaving reads and writes in the RAF loop, eliminating forced synchronous reflow
- `app.css` / `VoiceHeroCard.tsx`: `pulse-ring` keyframes switched from `box-shadow` to `transform: scale()` + `opacity` so the ring animation runs entirely on the GPU compositor
- `AutomationScout.css`: `scout-dot-pulse` keyframes no longer animate `box-shadow`; static shadow stays on the element; infinite `scout-cta-glow` moved from the button element to a `::after` pseudo-element with `filter: blur()` + `opacity` animation only
- `GlassServiceCard.css`: `box-shadow` transition replaced with `filter: drop-shadow()` transition (compositor-composited)
- `blog.css` and `dashboard.css` removed from root layout; `blog.css` now scoped to `src/app/(public)/blog/layout.tsx`, `dashboard.css` to `src/app/dashboard/layout.tsx`, cutting both stylesheets from every public page

### Added
- `browserslist` in `package.json` targeting Chrome/Edge 93+, Firefox 92+, Safari 15.4+ to eliminate legacy JS polyfills (`Array.flat`, `Object.fromEntries`, `String.trimStart`, etc.) from the production bundle
- `src/app/(public)/blog/layout.tsx` — new blog sub-layout that imports `blog.css` so styles are only loaded on blog routes

## [Unreleased] - 2026-07-23 (3)

### Changed
- AI Voice Agents pricing updated to $0.06/min (was $45/month); supporting copy updated to reflect per-minute billing

## [Unreleased] - 2026-07-23 (2)

### Added
- `GlassServiceCard` component (`src/components/cards/GlassServiceCard.tsx` + `.css`) — single canonical glass card shared by the homepage and /services hub; includes backdrop-filter blur, static pink blob, CSS shimmer sweep on hover, lift transform, and `prefers-reduced-motion` / `prefers-contrast: more` accessibility fallbacks

### Changed
- Homepage `ServicesGrid` and hub `PillarServiceCards` now both import `GlassServiceCard`; all glass visual logic lives in one place
- `/services` hub hero layout updated to match the standard service-page template (`pt-[144px] pb-20`, `min-h-[100vh]`, `grid-cols-2`) instead of the previous `flex/justify-between` layout
- `HeroPreview` widget changed from fixed `w-[360px]` to `w-full` so it fills its grid column identically to every other service-page hero card

### Removed
- `ServicesGrid.css` (styles consolidated into `GlassServiceCard.css`)
- `src/components/cards/ServiceCard.tsx` (dead code, never imported)

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
