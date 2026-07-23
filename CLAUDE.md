# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Aronix (aronix.io) is a blog-focused marketing website with a protected dashboard for blog management. Invite-only auth, no public registration.

- **Stack**: Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v4, Supabase (database, auth, storage), Vercel
- **Repo**: github.com/rayanrauf33/aronix-io

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build (also catches type errors)
npm run lint      # ESLint via next lint
npx tsc --noEmit  # Type check without building
```

No test framework is configured. The `/ship` command (`.claude/commands/ship.md`) automates the full deploy flow: commit, type check, lint, push, PR to dev, CI, merge, changelog, promote to main.

## Branch strategy

- `main` -- production (deployed via Vercel)
- `dev` -- active development
- `feature/xxx`, `fix/xxx`, `chore/xxx` -- branch off dev, PR back into dev

## Architecture

### Route groups

```
src/app/
  (public)/          # Public pages (route group, no URL segment)
    page.tsx         # Home /
    blog/            # /blog (listing) and /blog/[slug] (single post)
    services/        # /services
    contact/         # /contact
  login/             # /login
  dashboard/         # Protected by middleware -- redirects to /login if no session
    blog/            # CRUD for blog posts (list, new, [id]/edit)
  api/
    blog/route.ts    # GET (public), POST (protected)
    blog/[id]/route.ts  # GET, PATCH, DELETE (protected)
```

### Data flow

All Supabase queries go through `src/lib/supabase/blog.ts` (the data access layer). Never call `.from("blog_posts")` directly from pages or API routes.

- Server client (`src/lib/supabase/server.ts`): used in RSC, server actions, and API routes
- Browser client (`src/lib/supabase/client.ts`): used only in client components
- Middleware (`src/middleware.ts`): guards `/dashboard/*` and redirects authenticated users away from `/login`

### Components

| Folder | Purpose |
|---|---|
| `src/components/ui/` | Primitives (Button, Badge, Accordion, etc.) |
| `src/components/layout/` | Header, Footer |
| `src/components/sections/` | Public page sections (Hero, FAQ, Testimonials, etc.) |
| `src/components/cards/` | BlogPostCard, ServiceCard, TestimonialCard |
| `src/components/dashboard/` | Dashboard-only (sidebar, editor) |

### Styling

- Design tokens live in `src/styles/colors_and_type.css` as `--ax-*` CSS variables
- Base styles in `src/styles/app.css`, blog-specific in `src/styles/blog.css`
- Tailwind is for layout/spacing only. All colour and brand values must use `--ax-*` variables -- never hardcode hex
- Use `cn()` from `@/lib/utils` for conditional class merging (clsx + tailwind-merge)

### Database

Single table `blog_posts` with RLS enabled. Schema in `db/schema.sql` (run manually in Supabase SQL editor, not as a migration). Cover images stored in Supabase storage bucket `blog-covers`.

## Absolute rules

- **Imports**: `@/*` path alias (maps to `src/*`)
- **Exports**: named exports only. Default exports only in Next.js page/layout files.
- **Components**: server by default. `"use client"` only for state/effects/events.
- **Types**: no `any`. Strict TypeScript.
- **Colours**: all values from `--ax-*` variables. Never hardcode hex.
- **Icons**: Lucide only.
- **Accessibility**: WCAG AAA contrast minimum (7:1).
- **Responsive**: mobile-first.
- **Spelling**: UK English (optimise, organise, colour).
- **No** `console.log` in committed code.
- **No** em dashes in code, comments, or content.
- **No** emoji.

## Claude Code configuration

- Scoped rules in `.claude/rules/` (auto-loaded when working in matching directories)
- Skills (templates) in `.claude/skills/` -- read before writing new components or API routes
- Agents in `.claude/agents/` (code-reviewer, pr-reviewer, changelog)
- Commands in `.claude/commands/` (`/ship` deployment flow)

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

Copy `.env.local.example` to `.env.local` and fill in values from the Supabase dashboard.
