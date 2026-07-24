# Aronix.io — Handoff Document

Last updated: 2026-07-23
Reading this file is all a new Claude instance needs to get up to speed.

---

## What this project is

Aronix (aronix.io) is a marketing website for an automation and web agency.
Stack: Next.js 15 (App Router), TypeScript strict, Tailwind CSS v4, Supabase (auth/db/storage), Vercel.
Repo: github.com/Rayanrauf33/aronix-io

---

## Current git state

- **main** = production (live on Vercel). This is where everything landed.
- **dev** = same as main right now (just merged).
- Last commit on main: `345c6e0 chore: release to production`
- CHANGELOG.md exists at repo root — keep it updated.
- Branch strategy: feature/xxx off dev, PR to dev, then dev to main.

---

## Environment variables

Set in `.env.local` (local) and Vercel dashboard (production). All required.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (server only) |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (e.g. https://aronix.io) — required for OG images |
| `AI_API_KEY` | OpenRouter API key for AutomationScout chat widget |
| `AI_BASE_URL` | OpenRouter base URL |
| `AI_MODEL` | Model string for AutomationScout |
| `RESEND_API_KEY` | Resend email API key — for contact form delivery |
| `CONTACT_TO_EMAIL` | Email address that receives contact form submissions |

**Important:** `RESEND_API_KEY` was briefly visible in this chat session. It should be rotated at resend.com/api-keys and the new key updated in both `.env.local` and Vercel. The value starts with `re_`.

The GitHub token used for deployment is embedded in the git remote URL
(`git remote get-url origin`). It works but is not ideal — consider moving
to SSH or a credential manager.

---

## Site structure

```
src/app/
  (public)/
    page.tsx              # Homepage
    blog/                 # /blog listing + /blog/[slug]
    case-studies/         # /case-studies listing + /case-studies/[slug]
    contact/              # /contact — has ContactForm + FAQ
    search/               # /search
    services/
      page.tsx            # /services hub page
      ai-voice-agents/    # /services/ai-voice-agents
      ai-chat-booking/    # /services/ai-chat-booking
      speed-to-lead/      # /services/speed-to-lead
      workflow-automation/ # /services/workflow-automation
      crm-integrations/   # /services/crm-integrations
      websites/           # /services/websites
      local-seo/          # /services/local-seo
  api/
    contact/route.ts      # POST — contact form delivery via Resend
    blog/                 # Blog CRUD (protected)
    chat/                 # AutomationScout streaming chat
  content/                # Markdown source files for each service page copy
  dashboard/              # Protected (Supabase auth) — blog/case-study management
```

---

## Service pages — status

All 7 service pages are live and complete. Each has its own full component
library under `src/components/services/`.

| Page | Route | Components folder | Notes |
|---|---|---|---|
| AI Voice Agents | `/services/ai-voice-agents` | `services/voice/` | Light bg (soft-blush). VoiceHeroCard simulates a call. |
| AI Chat & Booking | `/services/ai-chat-booking` | `services/chat/` | ChatHeroBrowser animated browser mockup. |
| Speed to Lead | `/services/speed-to-lead` | `services/lead/` | LeadFeedHero with layout-prop animation (see below). ResponseTimeline SVG. |
| Workflow Automation | `/services/workflow-automation` | `services/automation/` | HeroCanvas animated S-curve. Performance-audited. |
| CRM Integrations | `/services/crm-integrations` | `services/crm/` | SyncStatusCard with travelling dot animation. |
| Websites | `/services/websites` | `services/web/` | SplitHero before/after browser mockup. ScopeCalculator pricing widget. |
| Local SEO | `/services/local-seo` | `services/seo/` | LocalPackHero is self-contained (renders its own section). |

### Hero layout standard (all 7 pages match this exactly)

```tsx
<section
  className="px-5 sm:px-12 pt-[144px] pb-20 min-h-[100vh] flex items-center"
  style={{ background: "var(--ax-surface-dark)" }} // or soft-blush for voice-agents
>
  <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <div>{/* left: text content */}</div>
    <div className="hidden lg:block">{/* right: animated card */}</div>
  </div>
</section>
```

Some hero cards have `hidden lg:block` inside the component itself (ChatHeroBrowser,
LeadFeedHero, HeroCanvas, LocalPackHero) instead of on a wrapper div on the page.
Either way, the card is hidden below `lg` breakpoint on all 7 pages.

---

## Contact form

**What it does:**
- User fills in: first, last, email (required), company (required), service (dropdown), message
- On submit: POSTs to `/api/contact` which sends a formatted HTML email via Resend
- Subject: `New enquiry: [Service] — [Company]`
- reply-to is set to the enquirer's email
- On success: shows confirmation card
- On error: shows inline error with AlertCircle icon, user can retry

**Service dropdown options** (in `src/components/sections/ContactForm.tsx`):
AI Voice Agents, AI Chat & Booking, Instant Lead Response, Websites,
Workflow Automation, CRM Integrations, Local SEO, Not sure yet.

**Sender address:** Currently `onboarding@resend.dev` (works without domain
verification but Resend may throttle in production). Once aronix.io is verified
in the Resend dashboard, change the `from` line in `src/app/api/contact/route.ts`
to `Aronix Contact <hello@aronix.io>` or similar.

---

## Homepage ServicesGrid

`src/components/sections/ServicesGrid.tsx` + `ServicesGrid.css`

Three glass cards on a light gradient background (slate-100 to soft-blush).
Cards: AI Voice Agents (Phone icon), Workflow Automation (Network icon),
Websites (Globe icon). Each links to the relevant service page.
Static pink blobs behind each card (filter: blur, no animation).
Framer Motion useInView entrance with 0.08s stagger.
"View all services" button at the bottom links to /services.

---

## Known issues / things still to do

### Before next launch work

1. **Rotate the Resend API key** — it appeared in the chat session. Go to
   resend.com/api-keys, delete the old one, create a new one, update
   `.env.local` and Vercel env vars.

2. **Verify Resend domain** — currently sending from `onboarding@resend.dev`.
   Verify `aronix.io` in the Resend dashboard, then update the `from` line in
   `src/app/api/contact/route.ts`.

3. **Legal pages** — no privacy policy or terms of service exist. Under UK GDPR,
   collecting names and emails requires at minimum a privacy notice. A minimal
   `/privacy` page is the lowest-effort fix. The footer has no links to legal pages.

4. **OG image verification** — `NEXT_PUBLIC_SITE_URL` must be set in Vercel for
   OG images to work. After the next deploy, check with LinkedIn Post Inspector
   and Twitter Card Validator.

5. **Audit session duration** — the Calendly link books a 15-minute session.
   All "45-minute" references were replaced with "15-minute" in this session.
   The contact page description and ContactSection copy now say 15 minutes.
   The Calendly URL is hardcoded as:
   `https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session`
   Confirm this link is live and has availability set.

### Future improvements

- **Performance pass on remaining service pages**: `ai-chat-booking`, `speed-to-lead`,
  `ai-voice-agents`, `crm-integrations` have not been audited for unguarded infinite
  animations, conflicting Framer Motion + CSS transitions, or redundant observers.
  The workflow-automation page was fully audited and fixed.

- **Analytics**: Vercel Analytics (`@vercel/analytics`) is installed and the
  `src/lib/analytics.ts` helpers exist. Go to Vercel dashboard > your project >
  Analytics and enable it. Events only fire on a deployed Vercel domain, not localhost.
  Track that `book_audit_click`, `contact_form_submit`, etc. are appearing after deploy.

---

## Key conventions (do not break these)

- All colour values use `--ax-*` CSS variables. Never hardcode hex.
- Design tokens: `src/styles/colors_and_type.css`
- Base styles: `src/styles/app.css`
- `cn()` from `@/lib/utils` for conditional classes (clsx + tailwind-merge)
- Named exports only. Default exports only in Next.js page/layout files.
- Server components by default. `"use client"` only for state/effects/events.
- Framer Motion: always `useReducedMotion()`, always `once: true` on useInView.
- Icons: Lucide only.
- UK English (optimise, organise, colour, enquiry).
- No em dashes. No console.log in committed code. No emoji.
- WCAG AAA contrast minimum (7:1) — check `--ax-fg-2` and `--ax-fg-3` on light backgrounds.
- `--ax-container` = 1280px (the site-wide max-width).

---

## How to deploy

```bash
# Create a feature branch
git checkout dev
git checkout -b feat/your-feature

# Make changes, then:
npx tsc --noEmit     # must pass
npm run build        # must pass

git add <specific files>
git commit -m "feat(scope): description"
git push --set-upstream origin feat/your-feature
```

Then use the GitHub API or `gh` CLI (once installed) to:
1. Open PR: feature -> dev
2. Wait for Vercel CI check to pass
3. Merge to dev
4. Open PR: dev -> main
5. Wait for CI
6. Merge to main — Vercel auto-deploys

The `/ship` skill in Claude Code automates this entire flow.
Run it by typing `/ship` in the Claude Code prompt.

The GitHub token for API access is embedded in the git remote URL.
Extract it with: `git remote get-url origin | sed 's|https://[^:]*:\([^@]*\)@.*|\1|'`

---

## Supabase

- Single table: `blog_posts` with RLS enabled
- Schema: `db/schema.sql` (run manually in Supabase SQL editor)
- Cover images: Supabase storage bucket `blog-covers`
- All queries go through `src/lib/supabase/blog.ts` — never call `.from("blog_posts")` directly
- Server client: `src/lib/supabase/server.ts`
- Browser client: `src/lib/supabase/client.ts`
- Middleware guards `/dashboard/*` and redirects authenticated users away from `/login`
- Auth is invite-only — no public registration

---

## Calendly

Hardcoded across the codebase as:
`https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session`

If this URL ever changes, search the entire codebase for `calendly.com` and
update all instances. The constant `CALENDLY` is defined at the top of each
service page file and in some components.
