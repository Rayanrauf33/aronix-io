# DELEGATE — New Blog Site Setup

This is a complete self-executing setup guide. When the user tells you to execute this file, work through every phase in order. Do not skip phases. Do not ask permission between phases. Report progress at the start of each phase. All shell commands are PowerShell unless noted.

---

## 0. Read before executing

**Goal:** Bootstrap a production-ready Next.js blog site with Supabase auth and a protected dashboard for writing/managing blog posts. The site has 6 public pages and a dashboard. Nothing else.

**Architecture reference:** Based on the RevenueLadder system at `C:\Users\hp\Desktop\RevenueLadder\RevenueLadder`. Read that project's structure only if you need to understand a pattern -- do not copy content from it.

**Token discipline:** Read files on demand. Do not glob the entire src tree. Use skills files as your templates.

---

## 1. Pre-flight: gather project details

Before touching any files, collect these values. Ask the user for anything not provided:

1. **Project name** (used for the folder, package.json name, and page titles) -- e.g. "Northern Forge"
2. **CSS variable prefix** (2-3 letters from the project name, lowercase, no dashes) -- e.g. "nf" becomes `--nf-`
3. **Domain** (used in metadata and AGENTS.md) -- e.g. "northernforge.co.uk"
4. **GitHub repo URL** (for AGENTS.md)
5. **Design system path** -- ask: "Where is the design-system-extracted folder for this project? Provide the full path."
6. **Target directory** -- where to create the project folder, e.g. `C:\Users\hp\Desktop`

Set these as working variables in your context. Replace every `[PROJECT_NAME]`, `[PREFIX]`, `[DOMAIN]`, `[GITHUB_URL]`, `[TARGET_DIR]` placeholder below with the actual values as you execute.

---

## 2. Read the design system

Run:
```powershell
Get-ChildItem "[DESIGN_SYSTEM_PATH]" -Recurse | Select-Object FullName
```

Read every CSS file, font list, and colour reference in that folder. Extract:
- All CSS custom properties and their hex values
- Primary, secondary, accent colours
- Background and surface colours
- Font families (display, body, mono)
- Type scale sizes
- Spacing scale
- Border radius tokens
- Shadow tokens
- Any gradient or pattern definitions

Hold these in context. You will use them in Phase 6 to write `colors_and_type.css`.

---

## 3. Initialise the Next.js project

```powershell
cd "[TARGET_DIR]"
npx create-next-app@latest [PROJECT_NAME] --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
cd "[PROJECT_NAME]"
```

When prompted, answer no to any feature not listed above.

---

## 4. Install dependencies

```powershell
npm install @supabase/ssr @supabase/supabase-js clsx tailwind-merge lucide-react @vercel/analytics
npm install @tiptap/react @tiptap/starter-kit @tiptap/pm @tiptap/extension-link @tiptap/extension-image @tiptap/extension-placeholder
npm install isomorphic-dompurify
npm install --save-dev @types/node @types/react @types/react-dom
```

---

## 5. Create configuration files

### 5a. tsconfig.json

Overwrite the generated tsconfig.json with:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### 5b. next.config.ts

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
}

export default nextConfig
```

### 5c. postcss.config.mjs

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

### 5d. .env.local

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://[DOMAIN]
```

### 5e. .env.local.example

Same as .env.local -- this is committed; .env.local is not.

### 5f. .gitignore additions

Append to the existing .gitignore:
```
.env.local
.env*.local
.claude/settings.local.json
```

---

## 6. Design system CSS

Create `src/styles/` directory.

### 6a. src/styles/colors_and_type.css

Write this file by filling in the tokens extracted in Phase 2. The file must follow this exact structure -- replace every placeholder with the real extracted value:

```css
/* =============================================================
   [PROJECT_NAME] Design System -- Foundations
   colors_and_type.css
   ============================================================= */

:root {
  /* BRAND CORE */
  --[PREFIX]-primary:       [HEX];   /* Primary brand colour */
  --[PREFIX]-primary-dark:  [HEX];   /* Primary hover/pressed */
  --[PREFIX]-primary-deep:  [HEX];   /* Dark surface base */
  --[PREFIX]-accent:        [HEX];   /* Accent colour */
  --[PREFIX]-accent-dark:   [HEX];   /* Accent hover */
  --[PREFIX]-accent-deep:   [HEX];   /* High-contrast accent text */

  /* NEUTRALS */
  --[PREFIX]-bg:            [HEX];   /* Application background */
  --[PREFIX]-surface:       [HEX];   /* Card/panel */
  --[PREFIX]-slate-100:     [HEX];
  --[PREFIX]-slate-200:     [HEX];
  --[PREFIX]-slate-300:     [HEX];
  --[PREFIX]-slate-400:     [HEX];
  --[PREFIX]-slate-500:     [HEX];
  --[PREFIX]-slate-600:     [HEX];
  --[PREFIX]-slate-700:     [HEX];
  --[PREFIX]-slate-800:     [HEX];
  --[PREFIX]-slate-900:     [HEX];

  /* SEMANTIC */
  --[PREFIX]-success:       #10B981;
  --[PREFIX]-error:         #EF4444;
  --[PREFIX]-warning:       #F59E0B;
  --[PREFIX]-info:          #3B82F6;

  /* TEXT */
  --[PREFIX]-fg-1:    var(--[PREFIX]-slate-900);
  --[PREFIX]-fg-2:    var(--[PREFIX]-slate-600);
  --[PREFIX]-fg-3:    var(--[PREFIX]-slate-400);
  --[PREFIX]-fg-on-dark:   #FFFFFF;
  --[PREFIX]-fg-on-dark-2: rgba(255, 255, 255, .55);

  --[PREFIX]-border:        var(--[PREFIX]-slate-200);
  --[PREFIX]-border-strong: var(--[PREFIX]-slate-300);

  /* TYPOGRAPHY */
  --[PREFIX]-font-display:  var(--font-[DISPLAY_FONT_VAR]), "Helvetica Neue", Arial, sans-serif;
  --[PREFIX]-font-body:     var(--font-[BODY_FONT_VAR]), -apple-system, BlinkMacSystemFont, sans-serif;
  --[PREFIX]-font-mono:     ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  /* TYPE SCALE */
  --[PREFIX]-fs-hero:     [SIZE]px;
  --[PREFIX]-fs-display:  [SIZE]px;
  --[PREFIX]-fs-h1:       [SIZE]px;
  --[PREFIX]-fs-h2:       [SIZE]px;
  --[PREFIX]-fs-h3:       [SIZE]px;
  --[PREFIX]-fs-h4:       [SIZE]px;
  --[PREFIX]-fs-body-lg:  [SIZE]px;
  --[PREFIX]-fs-body:     [SIZE]px;
  --[PREFIX]-fs-body-sm:  [SIZE]px;
  --[PREFIX]-fs-caption:  [SIZE]px;

  --[PREFIX]-lh-tight:   1.05;
  --[PREFIX]-lh-snug:    1.2;
  --[PREFIX]-lh-normal:  1.5;
  --[PREFIX]-lh-relaxed: 1.7;

  --[PREFIX]-tracking-tight:  -0.025em;
  --[PREFIX]-tracking-normal: 0;
  --[PREFIX]-tracking-eyebrow: 0.18em;

  /* SPACING (8px grid) */
  --[PREFIX]-space-1:  4px;
  --[PREFIX]-space-2:  8px;
  --[PREFIX]-space-3:  12px;
  --[PREFIX]-space-4:  16px;
  --[PREFIX]-space-6:  24px;
  --[PREFIX]-space-8:  32px;
  --[PREFIX]-space-10: 40px;
  --[PREFIX]-space-12: 48px;
  --[PREFIX]-space-16: 64px;
  --[PREFIX]-space-20: 80px;
  --[PREFIX]-space-24: 96px;

  /* RADII */
  --[PREFIX]-radius-xs:   4px;
  --[PREFIX]-radius-sm:   8px;
  --[PREFIX]-radius-md:   12px;
  --[PREFIX]-radius-lg:   16px;
  --[PREFIX]-radius-xl:   20px;
  --[PREFIX]-radius-pill: 9999px;

  /* SHADOWS */
  --[PREFIX]-shadow-sm: 0 1px 2px rgba(15, 23, 42, .06);
  --[PREFIX]-shadow-md: 0 4px 16px rgba(15, 23, 42, .07);
  --[PREFIX]-shadow-lg: 0 12px 32px rgba(15, 23, 42, .10);
  --[PREFIX]-shadow-xl: 0 20px 48px rgba(15, 23, 42, .14);

  /* MOTION */
  --[PREFIX]-ease-out:    cubic-bezier(.16, 1, .3, 1);
  --[PREFIX]-ease-smooth: cubic-bezier(.4, 0, .2, 1);
  --[PREFIX]-dur-fast:    120ms;
  --[PREFIX]-dur-base:    200ms;
  --[PREFIX]-dur-slow:    360ms;
}

/* SEMANTIC TYPE PRIMITIVES */
.s-hero, .s-display {
  font-family: var(--[PREFIX]-font-display);
  font-weight: 900;
  letter-spacing: var(--[PREFIX]-tracking-tight);
  line-height: var(--[PREFIX]-lh-tight);
  color: var(--[PREFIX]-fg-1);
}
.s-hero    { font-size: var(--[PREFIX]-fs-hero); }
.s-display { font-size: var(--[PREFIX]-fs-display); }

.s-h1, .s-h2, .s-h3, .s-h4 {
  font-family: var(--[PREFIX]-font-display);
  letter-spacing: var(--[PREFIX]-tracking-tight);
  line-height: var(--[PREFIX]-lh-snug);
  color: var(--[PREFIX]-fg-1);
}
.s-h1 { font-size: var(--[PREFIX]-fs-h1); font-weight: 800; }
.s-h2 { font-size: var(--[PREFIX]-fs-h2); font-weight: 800; }
.s-h3 { font-size: var(--[PREFIX]-fs-h3); font-weight: 700; }
.s-h4 { font-size: var(--[PREFIX]-fs-h4); font-weight: 700; }

.s-body-lg, .s-body, .s-body-sm {
  font-family: var(--[PREFIX]-font-body);
  color: var(--[PREFIX]-fg-2);
  line-height: var(--[PREFIX]-lh-relaxed);
}
.s-body-lg { font-size: var(--[PREFIX]-fs-body-lg); }
.s-body    { font-size: var(--[PREFIX]-fs-body); }
.s-body-sm { font-size: var(--[PREFIX]-fs-body-sm); }

.s-eyebrow {
  font-family: var(--[PREFIX]-font-body);
  font-size: var(--[PREFIX]-fs-caption);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: var(--[PREFIX]-tracking-eyebrow);
  color: var(--[PREFIX]-fg-3);
}

::selection { background: var(--[PREFIX]-accent); color: var(--[PREFIX]-primary); }
```

If the design system extracted more tokens (gradients, patterns, tints), add them after the core tokens. Keep the structure consistent.

### 6b. src/styles/app.css

```css
/* =============================================================
   [PROJECT_NAME] -- Application styles
   app.css
   ============================================================= */

@import "tailwindcss";
@import "./colors_and_type.css";

/* FONT IMPORTS -- replace with actual font from design system */
@import url("https://fonts.googleapis.com/css2?family=[DISPLAY_FONT]:wght@400;700;800;900&family=[BODY_FONT]:wght@400;500;600;700&display=swap");

/* CSS custom properties for Tailwind v4 */
@theme {
  --font-display: var(--[PREFIX]-font-display);
  --font-body: var(--[PREFIX]-font-body);
  --font-mono: var(--[PREFIX]-font-mono);
}

/* BASE */
*, *::before, *::after { box-sizing: border-box; }

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--[PREFIX]-bg);
  color: var(--[PREFIX]-fg-1);
  font-family: var(--[PREFIX]-font-body);
  font-size: var(--[PREFIX]-fs-body);
  line-height: var(--[PREFIX]-lh-relaxed);
  margin: 0;
}

/* LAYOUT */
.site-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: var(--[PREFIX]-space-6);
}

/* DASHBOARD SCOPE */
.dash-root {
  min-height: 100vh;
  background: var(--[PREFIX]-bg);
  display: flex;
}

.dash-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: var(--[PREFIX]-primary-deep, var(--[PREFIX]-primary));
  min-height: 100vh;
  padding: var(--[PREFIX]-space-6);
}

.dash-main {
  flex: 1;
  padding: var(--[PREFIX]-space-8);
  overflow-y: auto;
}

/* REUSABLE CLASSES */
.surface {
  background: var(--[PREFIX]-surface);
  border: 1px solid var(--[PREFIX]-border);
  border-radius: var(--[PREFIX]-radius-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--[PREFIX]-space-1);
}

.field label {
  font-size: var(--[PREFIX]-fs-body-sm);
  font-weight: 600;
  color: var(--[PREFIX]-fg-2);
}

.field input,
.field textarea,
.field select {
  padding: var(--[PREFIX]-space-2) var(--[PREFIX]-space-3);
  border: 1px solid var(--[PREFIX]-border);
  border-radius: var(--[PREFIX]-radius-sm);
  font-size: var(--[PREFIX]-fs-body);
  font-family: var(--[PREFIX]-font-body);
  background: var(--[PREFIX]-surface);
  color: var(--[PREFIX]-fg-1);
  transition: border-color var(--[PREFIX]-dur-base) var(--[PREFIX]-ease-smooth);
  width: 100%;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  outline: none;
  border-color: var(--[PREFIX]-primary);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--[PREFIX]-space-2);
  padding: var(--[PREFIX]-space-2) var(--[PREFIX]-space-6);
  background: var(--[PREFIX]-primary);
  color: var(--[PREFIX]-fg-on-dark);
  border: none;
  border-radius: var(--[PREFIX]-radius-sm);
  font-family: var(--[PREFIX]-font-body);
  font-size: var(--[PREFIX]-fs-body);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--[PREFIX]-dur-base) var(--[PREFIX]-ease-smooth);
  text-decoration: none;
}

.btn-primary:hover {
  background: var(--[PREFIX]-primary-dark, var(--[PREFIX]-primary));
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: var(--[PREFIX]-space-2);
  padding: var(--[PREFIX]-space-2) var(--[PREFIX]-space-4);
  background: transparent;
  border: 1px solid var(--[PREFIX]-border);
  border-radius: var(--[PREFIX]-radius-sm);
  font-family: var(--[PREFIX]-font-body);
  font-size: var(--[PREFIX]-fs-body);
  font-weight: 500;
  cursor: pointer;
  color: var(--[PREFIX]-fg-2);
  transition: all var(--[PREFIX]-dur-base) var(--[PREFIX]-ease-smooth);
  text-decoration: none;
}

.btn-ghost:hover {
  background: var(--[PREFIX]-border);
  color: var(--[PREFIX]-fg-1);
}

.tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--[PREFIX]-fs-body-sm);
}

.tbl th {
  text-align: left;
  padding: var(--[PREFIX]-space-3) var(--[PREFIX]-space-4);
  font-weight: 700;
  color: var(--[PREFIX]-fg-3);
  font-size: var(--[PREFIX]-fs-caption);
  text-transform: uppercase;
  letter-spacing: var(--[PREFIX]-tracking-eyebrow);
  border-bottom: 1px solid var(--[PREFIX]-border);
}

.tbl td {
  padding: var(--[PREFIX]-space-3) var(--[PREFIX]-space-4);
  border-bottom: 1px solid var(--[PREFIX]-border-soft, var(--[PREFIX]-border));
  color: var(--[PREFIX]-fg-1);
  vertical-align: middle;
}

.bdg {
  display: inline-block;
  padding: 2px 10px;
  border-radius: var(--[PREFIX]-radius-pill);
  font-size: var(--[PREFIX]-fs-caption);
  font-weight: 700;
}

.bdg-ok {
  background: #F0FDF4;
  color: #14532D;
  border: 1px solid #BBF7D0;
}

.bdg-wa {
  background: #FFFBEB;
  color: #78350F;
  border: 1px solid #FDE68A;
}

.bdg-er {
  background: #FEF2F2;
  color: #7F1D1D;
  border: 1px solid #FECACA;
}

.bdg-n {
  background: var(--[PREFIX]-border);
  color: var(--[PREFIX]-fg-2);
  border: 1px solid var(--[PREFIX]-border-strong);
}
```

### 6c. src/styles/blog.css

```css
/* =============================================================
   [PROJECT_NAME] -- Blog/article prose styles
   blog.css
   ============================================================= */

/* Public blog listing */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--[PREFIX]-space-8);
}

.blog-card {
  background: var(--[PREFIX]-surface);
  border: 1px solid var(--[PREFIX]-border);
  border-radius: var(--[PREFIX]-radius-lg);
  overflow: hidden;
  transition: box-shadow var(--[PREFIX]-dur-base) var(--[PREFIX]-ease-smooth),
              transform var(--[PREFIX]-dur-base) var(--[PREFIX]-ease-smooth);
  text-decoration: none;
  display: block;
}

.blog-card:hover {
  box-shadow: var(--[PREFIX]-shadow-lg);
  transform: translateY(-2px);
}

.blog-card-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.blog-card-body {
  padding: var(--[PREFIX]-space-6);
}

.blog-card-meta {
  font-size: var(--[PREFIX]-fs-caption);
  color: var(--[PREFIX]-fg-3);
  margin-bottom: var(--[PREFIX]-space-2);
}

.blog-card-title {
  font-family: var(--[PREFIX]-font-display);
  font-size: var(--[PREFIX]-fs-h4);
  font-weight: 700;
  color: var(--[PREFIX]-fg-1);
  line-height: var(--[PREFIX]-lh-snug);
  margin: 0 0 var(--[PREFIX]-space-2);
}

.blog-card-excerpt {
  font-size: var(--[PREFIX]-fs-body-sm);
  color: var(--[PREFIX]-fg-2);
  line-height: var(--[PREFIX]-lh-normal);
  margin: 0;
}

/* Single blog post prose */
.prose {
  max-width: 680px;
  margin-inline: auto;
  color: var(--[PREFIX]-fg-1);
  font-size: var(--[PREFIX]-fs-body-lg);
  line-height: var(--[PREFIX]-lh-relaxed);
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  font-family: var(--[PREFIX]-font-display);
  font-weight: 700;
  line-height: var(--[PREFIX]-lh-snug);
  letter-spacing: var(--[PREFIX]-tracking-tight);
  margin-top: var(--[PREFIX]-space-12);
  margin-bottom: var(--[PREFIX]-space-4);
}

.prose h1 { font-size: var(--[PREFIX]-fs-h1); font-weight: 800; }
.prose h2 { font-size: var(--[PREFIX]-fs-h2); font-weight: 800; }
.prose h3 { font-size: var(--[PREFIX]-fs-h3); }
.prose h4 { font-size: var(--[PREFIX]-fs-h4); }

.prose p { margin: 0 0 var(--[PREFIX]-space-6); }

.prose a {
  color: var(--[PREFIX]-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose a:hover { color: var(--[PREFIX]-primary-dark, var(--[PREFIX]-primary)); }

.prose img {
  width: 100%;
  border-radius: var(--[PREFIX]-radius-md);
  margin-block: var(--[PREFIX]-space-8);
}

.prose code {
  font-family: var(--[PREFIX]-font-mono);
  font-size: 0.88em;
  background: var(--[PREFIX]-border);
  padding: 2px 6px;
  border-radius: var(--[PREFIX]-radius-xs);
}

.prose pre {
  background: var(--[PREFIX]-slate-900, #0F172A);
  color: #E2E8F0;
  padding: var(--[PREFIX]-space-6);
  border-radius: var(--[PREFIX]-radius-md);
  overflow-x: auto;
  margin-block: var(--[PREFIX]-space-8);
}

.prose pre code {
  background: none;
  padding: 0;
  font-size: var(--[PREFIX]-fs-body-sm);
}

.prose blockquote {
  border-left: 4px solid var(--[PREFIX]-primary);
  padding-left: var(--[PREFIX]-space-6);
  margin-left: 0;
  color: var(--[PREFIX]-fg-2);
  font-style: italic;
}

.prose ul, .prose ol {
  padding-left: var(--[PREFIX]-space-6);
  margin-bottom: var(--[PREFIX]-space-6);
}

.prose li { margin-bottom: var(--[PREFIX]-space-2); }

.prose hr {
  border: none;
  border-top: 1px solid var(--[PREFIX]-border);
  margin-block: var(--[PREFIX]-space-12);
}
```

---

## 7. Create the .claude folder

### 7a. .claude/settings.json

```json
{
  "permissions": {
    "allow": []
  }
}
```

### 7b. CLAUDE.md (in the project root)

**This file must be concise. Every word here costs tokens on every turn. No repetition. No examples. Pure rules and pointers.**

```markdown
# [PROJECT_NAME] -- Claude Code Context

See AGENTS.md for full project context, schema, and architecture.

## Absolute rules (enforced every turn)
- CSS: all colour/spacing values from --[PREFIX]-* variables only. Never hardcode hex.
- Tailwind: layout and spacing only. Brand tokens use CSS variables.
- Imports: @/* throughout (maps to src/*)
- Exports: named exports only. Default exports only in Next.js page/layout files.
- Components: server by default. "use client" only for state/effects/events.
- Types: no `any`. Strict TypeScript.
- No console.log in committed code.
- No em dashes in code, comments, or content.
- No emoji.
- WCAG AAA contrast minimum (7:1).
- Lucide icons only.
- Supabase: all calls through src/lib/supabase/. Server client in RSC/server actions. Browser client in client components only.
- Mobile-first responsive design.
- UK spelling: optimise, organise, colour.

## Where things live
- Rules: .claude/rules/ (scoped to their directories)
- Skills: .claude/skills/ (templates -- read before writing)
- Agents: .claude/agents/
- Commands: .claude/commands/
- Styles: src/styles/colors_and_type.css (design tokens), src/styles/app.css (base)
- Supabase lib: src/lib/supabase/
- Types: src/types/

## Do not read unless working in that area
- node_modules/ -- never
- .next/ -- never
- src/styles/colors_and_type.css -- only when adding/checking design tokens
```

### 7c. AGENTS.md (in the project root)

```markdown
# [PROJECT_NAME] -- Agent Context

## Project
Blog-focused website with a protected dashboard for blog management.
- Domain: [DOMAIN]
- GitHub: [GITHUB_URL]

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
```

### 7d. .claude/rules/api.md

```markdown
# Rules: src/app/api/**

## Validate the request body
Never use request.json() directly. Parse as unknown and narrow.
```ts
const body: unknown = await request.json()
if (!isValidBody(body)) {
  return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
}
```

## Return typed responses
Every return must be NextResponse.json(...) with an explicit status.
Never return raw Response or untyped objects.

## Wrap in try/catch
Every route handler has a top-level try/catch returning 500 on error.

## Status codes
| Situation | Status |
|---|---|
| Validation failed | 400 |
| Not authenticated | 401 |
| Not authorised | 403 |
| Not found | 404 |
| DB or unexpected error | 500 |

## Supabase client
Always import from @/lib/supabase/server in route handlers.

## Named exports
Export each method by name: GET, POST, PATCH, DELETE. No default export.
```

### 7e. .claude/rules/blog.md

```markdown
# Rules: blog feature

Applies to: src/app/dashboard/blog/, src/app/api/blog/, src/components/dashboard/, src/lib/supabase/blog.ts

## Data access
All blog queries go through src/lib/supabase/blog.ts. Never call .from("blog_posts") directly from API routes or pages.

## API routes
Follow .claude/rules/api.md exactly.

## Editor
The rich text editor is Tiptap. It is a client component. Keep it in src/components/dashboard/BlogEditor.tsx.

## Public blog pages
- /blog renders a grid of published posts only (published = true)
- /blog/[slug] renders a single post by slug. 404 if not found or not published.
- Both are Server Components. No "use client" needed.

## Slug generation
Slugs are generated from the title: lowercase, spaces to hyphens, strip special chars. Slugs must be unique. Check uniqueness before insert.

## Cover images
Uploaded to Supabase storage bucket "blog-covers". URL stored in cover_image column. Image upload happens in the editor, not the form.
```

### 7f. .claude/agents/code-reviewer.md

```markdown
---
name: Code Reviewer
description: Reviews code quality of recently written or modified files. Run after finishing a feature before committing.
---

You are a strict but fair senior engineer. When invoked:

1. Run `git diff` to see uncommitted changes.
2. Review each changed file for:
   - TypeScript strictness (no any, proper types)
   - Named exports (no default exports except page/layout files)
   - Supabase client usage (server client in RSC, browser client in client components)
   - No console.log left in
   - No em dashes in comments or content
   - No hardcoded hex values -- only --[PREFIX]-* CSS variables
   - UK spelling in user-visible text
   - Missing error handling
   - Security issues (no secrets, no exposed keys)
3. Output per-file findings:
   - What is good
   - What must be fixed before committing (blocking)
   - What is optional but recommended (non-blocking)
4. Final verdict: COMMIT READY or NEEDS FIXES
```

### 7g. .claude/agents/pr-reviewer.md

```markdown
---
name: PR Reviewer
description: Reviews a git diff before a PR is opened. Checks for convention violations, TypeScript issues, and code quality.
---

You are a senior code reviewer. When invoked:

1. Run `git diff dev...HEAD` to get the full diff.
2. Review for:
   - TypeScript errors or any types
   - Em dashes in code or comments
   - console.log left in
   - Named exports violated
   - Hardcoded hex colours (should use CSS variables)
   - Logic that looks broken or incomplete
   - Anything that would fail CI
3. Output a structured review:
   - PASS or FAIL verdict at the top
   - List of issues with file and line reference
   - List of suggestions (non-blocking)
4. If PASS, output a ready-to-use PR title and body using the PR template.
```

### 7h. .claude/agents/changelog.md

```markdown
---
name: Changelog Writer
description: Generates a changelog entry from commit history. Run before merging dev into main.
---

When invoked:

1. Run `git log main..HEAD --oneline` to get commits since last release.
2. Group into categories: Features (feat:), Bug fixes (fix:), Chores (chore:), Refactors (refactor:).
3. Write a clean entry:

## [Unreleased] - YYYY-MM-DD

### Added
- ...

### Fixed
- ...

### Changed
- ...

Only include sections with entries. Skip empty sections. Skip merge commits and WIP commits.

4. Append to CHANGELOG.md at the top (after the header, before existing entries).
5. Run `git add CHANGELOG.md && git commit -m "chore: update changelog"`.
```

### 7i. .claude/skills/component.md

```markdown
# Skill: Scaffold a new component

## Where it lives
| Type | Folder |
|---|---|
| Base primitive (button, input, badge) | src/components/ui/ |
| Site-wide structural piece | src/components/layout/ |
| Full page section | src/components/sections/ |
| Dashboard-only | src/components/dashboard/ |

## Rules
- Named export. Never default export from a component file.
- "use client" only if the component uses state, effects, refs, or event handlers.
- cn() from @/lib/utils for all conditional class logic.
- Props interface directly above the component, named <ComponentName>Props.
- No inline style attributes. Tailwind for layout/spacing. CSS variables for brand tokens.
- All colour values from --[PREFIX]-* variables only.

## Server component template
```tsx
import { cn } from "@/lib/utils"

interface ExampleCardProps {
  title: string
  description?: string
  className?: string
}

export function ExampleCard({ title, description, className }: ExampleCardProps) {
  return (
    <div className={cn("rounded-lg border p-6", className)}
         style={{ background: "var(--[PREFIX]-surface)", borderColor: "var(--[PREFIX]-border)" }}>
      <h2 className="text-lg font-semibold" style={{ color: "var(--[PREFIX]-fg-1)" }}>{title}</h2>
      {description && (
        <p className="mt-2 text-sm" style={{ color: "var(--[PREFIX]-fg-2)" }}>{description}</p>
      )}
    </div>
  )
}
```

## Client component template
```tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ToggleProps {
  label: string
  className?: string
}

export function Toggle({ label, className }: ToggleProps) {
  const [on, setOn] = useState(false)

  return (
    <button
      onClick={() => setOn((prev) => !prev)}
      className={cn("rounded px-4 py-2 text-sm font-medium transition-colors", className)}
      style={{
        background: on ? "var(--[PREFIX]-primary)" : "var(--[PREFIX]-border)",
        color: on ? "var(--[PREFIX]-fg-on-dark)" : "var(--[PREFIX]-fg-2)"
      }}
    >
      {label}
    </button>
  )
}
```

## Checklist
- [ ] Named export
- [ ] Props interface above the component
- [ ] cn() for conditional classes
- [ ] "use client" only if genuinely needed
- [ ] No hardcoded hex colours
- [ ] No em dashes in comments
```

### 7j. .claude/skills/api-route.md

```markdown
# Skill: Create a new API route

## File location
src/app/api/<resource>/route.ts -- handles GET, POST, etc. for /api/<resource>
src/app/api/<resource>/[id]/route.ts -- for resource-by-id operations

Never colocate a route.ts next to a page.tsx.

## Template
```ts
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface CreatePostBody {
  title: string
  content: string
  excerpt: string
  slug: string
  published: boolean
}

function isValidBody(body: unknown): body is CreatePostBody {
  if (typeof body !== "object" || body === null) return false
  const b = body as Record<string, unknown>
  return (
    typeof b.title === "string" &&
    typeof b.content === "string" &&
    typeof b.excerpt === "string" &&
    typeof b.slug === "string" &&
    typeof b.published === "boolean"
  )
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const body: unknown = await request.json()
    if (!isValidBody(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { error } = await supabase.from("blog_posts").insert(body)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
```

## Checklist
- [ ] Body validated before use
- [ ] Auth checked before any mutation
- [ ] NextResponse.json with explicit status
- [ ] try/catch wraps all async logic
- [ ] Named export -- no default export
- [ ] No em dashes in comments
```

### 7k. .claude/commands/ship.md

Copy the ship command from the RevenueLadder project verbatim:
`C:\Users\hp\Desktop\RevenueLadder\RevenueLadder\.claude\commands\ship.md`

It is identical for every project. Do not modify it.

---

## 8. Create src skeleton files

Create these files with the exact content shown. These are the minimum stubs needed for the build to pass.

### 8a. src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 8b. src/lib/supabase/client.ts

```ts
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 8c. src/lib/supabase/server.ts

```ts
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Components cannot set cookies -- expected
          }
        },
      },
    }
  )
}
```

### 8d. src/lib/supabase/blog.ts

```ts
import { createClient } from "@/lib/supabase/server"
import type { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from "@/types"

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, published, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }
  return data as BlogPost
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }
  return data as BlogPost
}

export async function createPost(input: CreateBlogPostInput): Promise<BlogPost> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function updatePost(id: string, input: UpdateBlogPostInput): Promise<BlogPost> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id)

  if (error) throw error
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient()
  let query = supabase.from("blog_posts").select("id").eq("slug", slug)
  if (excludeId) query = query.neq("id", excludeId)
  const { data } = await query
  return (data?.length ?? 0) > 0
}
```

### 8e. src/types/index.ts

```ts
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export type CreateBlogPostInput = Omit<BlogPost, "id" | "created_at" | "updated_at">

export type UpdateBlogPostInput = Partial<CreateBlogPostInput>
```

### 8f. middleware.ts (project root)

```ts
import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export default async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (request.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
```

### 8g. src/app/layout.tsx

```tsx
import type { Metadata } from "next"
import "@/styles/app.css"
import "@/styles/blog.css"

export const metadata: Metadata = {
  title: {
    template: `%s | [PROJECT_NAME]`,
    default: "[PROJECT_NAME]",
  },
  description: "[Short site description -- fill in]",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  )
}
```

### 8h. src/app/(public)/layout.tsx

Stub -- returns children wrapped with Header and Footer once those components exist.

```tsx
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}
```

### 8i. src/app/(public)/page.tsx

```tsx
export default function HomePage() {
  return (
    <main>
      <h1 className="s-hero">Home</h1>
      <p className="s-body">Page content coming soon.</p>
    </main>
  )
}
```

### 8j. src/app/login/page.tsx

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Login" }

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="surface p-8 w-full max-w-sm">
        <h1 className="s-h2 mb-6">Sign in</h1>
        {/* LoginForm client component goes here */}
        <p className="s-body-sm mt-4" style={{ color: "var(--[PREFIX]-fg-3)" }}>
          Access is by invitation only.
        </p>
      </div>
    </main>
  )
}
```

### 8k. src/app/dashboard/page.tsx

```tsx
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  return (
    <div className="dash-root">
      <div className="dash-main">
        <h1 className="s-h1 mb-6">Dashboard</h1>
        <p className="s-body">Welcome back.</p>
      </div>
    </div>
  )
}
```

---

## 9. Database schema

Create `db/schema.sql`:

```sql
-- [PROJECT_NAME] Database Schema
-- Run this in the Supabase SQL editor.
-- Do not run as a migration -- execute manually.

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Blog posts
create table if not exists blog_posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  content      text not null default '',
  excerpt      text not null default '',
  cover_image  text,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Index for public slug lookups
create index if not exists blog_posts_slug_idx on blog_posts(slug);
create index if not exists blog_posts_published_idx on blog_posts(published, created_at desc);

-- RLS
alter table blog_posts enable row level security;

-- Public: read published posts only
create policy "Public can read published posts"
  on blog_posts for select
  using (published = true);

-- Authenticated: full access
create policy "Authenticated users have full access"
  on blog_posts for all
  using (auth.role() = 'authenticated');

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();

-- Storage bucket for blog cover images
-- Run separately in the Storage section of the Supabase dashboard:
-- Bucket name: blog-covers
-- Public: true
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/avif
```

---

## 10. Git setup

```powershell
git init
git add .
git commit -m "chore: initial project setup"
git branch -M main
git remote add origin [GITHUB_URL]
git push -u origin main
git checkout -b dev
git push -u origin dev
```

---

## 11. Verify the build

```powershell
npx tsc --noEmit
npm run lint
npm run build
```

Fix any errors before reporting completion. Common issues:
- Missing @supabase/ssr types: already installed, restart TS server
- Tailwind v4 build errors: check postcss.config.mjs uses @tailwindcss/postcss
- Font references: update layout.tsx to import the actual fonts from the design system

---

## 12. Report completion

When all phases are done, output this summary:

```
Setup complete.

Project:   [PROJECT_NAME]
Location:  [TARGET_DIR]/[PROJECT_NAME]
Stack:     Next.js 15 + TypeScript + Tailwind CSS v4 + Supabase
Branch:    dev (active), main (production)

Created:
- CLAUDE.md            Project rules (concise pointer file)
- AGENTS.md            Full architecture reference
- .claude/rules/       api.md, blog.md
- .claude/agents/      code-reviewer.md, pr-reviewer.md, changelog.md
- .claude/skills/      component.md, api-route.md
- .claude/commands/    ship.md
- src/styles/          colors_and_type.css, app.css, blog.css
- src/lib/supabase/    client.ts, server.ts, blog.ts
- src/types/           index.ts
- middleware.ts
- db/schema.sql

Next steps:
1. Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
2. Run db/schema.sql in the Supabase SQL editor
3. Create the blog-covers storage bucket in Supabase
4. Tell Claude to build each page one by one starting with the layout and header
```

---

## Token optimisation notes (improvements over RevenueLadder)

These are the deliberate improvements built into this setup. Do not change them:

1. **CLAUDE.md is a router, not a knowledge base.** Under 50 lines. It enforces rules and points to other files. All project knowledge lives in AGENTS.md, which Claude reads once and retains.

2. **Rules files are scoped with explicit directory comments.** Claude reads a rules file only when working in that directory. Never load rules for areas you are not touching.

3. **No duplication between CLAUDE.md and AGENTS.md.** If a rule is in CLAUDE.md, it is not repeated in AGENTS.md.

4. **The blog.ts data access layer is pre-written.** Claude never has to derive the database schema from scratch. All query shapes are established on day one.

5. **Skills files have complete, copy-pasteable templates.** Claude reads the skill, copies the template, fills in the specifics. No back-and-forth to establish patterns.

6. **CSS class names are semantically named** (`.surface`, `.prose`, `.blog-card`, `.btn-primary`). Claude writes class names, not inline style objects. Less context used per component.

7. **src/types/index.ts pre-defines BlogPost.** Claude never has to look up the schema again. Types flow from the data access layer through to components.

8. **Do not read node_modules or .next/.** These are explicitly flagged in CLAUDE.md. Never glob or search these directories.
```
