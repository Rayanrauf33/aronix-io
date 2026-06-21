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
