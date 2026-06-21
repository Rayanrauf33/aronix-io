-- Aronix Database Schema
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
