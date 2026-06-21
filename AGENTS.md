# Aronix -- Agent Context

## Project
Blog-focused website with a protected dashboard for blog management.
- Domain: aronix.io
- GitHub: https://github.com/urban-essentials/aronix-io

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (database, auth, storage)
- Vercel (deployment)

## Auth flow
- Public nav has a Login link -> /login -> Supabase auth -> /dashboard
- /dashboard and all sub-routes are protected by middleware
- Unauthenticated users hitting /dashboard are redirected to /login
- No public registration. Invite only.

## Folder structure
src/
  app/
    (public)/               # Public-facing pages (route group, no URL segment)
      page.tsx              # Home -> /
      about/page.tsx        # -> /about
      services/page.tsx     # -> /services
      blog/
        page.tsx            # -> /blog (listing)
        [slug]/page.tsx     # -> /blog/[slug] (single post)
      contact/page.tsx      # -> /contact
    login/page.tsx          # Login page
    dashboard/              # Protected -- redirects to /login if no session
      page.tsx              # Dashboard home
      blog/                 # Blog post CRUD
        page.tsx            # List
        new/page.tsx        # Create
        [id]/edit/page.tsx  # Edit
    api/
      blog/route.ts         # GET (public listing), POST (protected create)
      blog/[id]/route.ts    # GET, PATCH, DELETE (protected)
  components/
    ui/                     # Primitives: Button, Badge, etc.
    layout/                 # Header, Footer, Nav
    sections/               # Public page sections
    dashboard/              # Dashboard-only components (sidebar, editor)
  hooks/                    # Custom React hooks
  lib/
    supabase/
      client.ts             # Browser client
      server.ts             # Server client (RSC + server actions)
      blog.ts               # Blog data access layer
    utils.ts                # cn() utility
  middleware.ts             # Auth guard + session refresh
  types/
    database.ts             # Supabase generated types
    index.ts                # Shared app types

## Key rules
- @/* imports (maps to src/*)
- App Router only -- no pages/ directory
- Server components by default. "use client" only when needed.
- All Supabase calls go through src/lib/supabase/
- Named exports only -- no default exports except Next.js page/layout files
- No any types. Strict TypeScript.
- No console.log in committed code.
- No em dashes anywhere.

## Database tables

### blog_posts
| Column       | Type        | Notes                              |
|---|---|---|
| id           | uuid        | Primary key, gen_random_uuid()     |
| title        | text        | Post title                         |
| slug         | text        | URL-safe, unique                   |
| content      | text        | Full body (Tiptap HTML)            |
| excerpt      | text        | Short summary for listing pages    |
| cover_image  | text        | Supabase storage URL               |
| published    | boolean     | Controls public visibility         |
| created_at   | timestamptz | Auto-set on insert                 |
| updated_at   | timestamptz | Auto-updated on edit               |

## Environment variables
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL

## Branch strategy
- main -- production
- dev -- active development
- feature/xxx, fix/xxx, chore/xxx -- branch off dev, PR back into dev

## Agents
- /code-reviewer -- review uncommitted changes before committing
- /pr-reviewer -- review git diff before opening a PR
- /changelog -- generate changelog entry before merging to main
