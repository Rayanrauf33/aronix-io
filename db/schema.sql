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
  category     text not null default 'Strategy',
  author       text not null default 'Aronix',
  author_role  text,
  read_time    text not null default '5 min',
  featured     boolean not null default false,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Index for public slug lookups
create index if not exists blog_posts_slug_idx on blog_posts(slug);
create index if not exists blog_posts_published_idx on blog_posts(published, created_at desc);
create index if not exists blog_posts_category_idx on blog_posts(category);

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

-- ============================================================
-- Case studies
-- ============================================================

create table if not exists case_studies (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  client       text not null default '',
  industry     text not null default '',
  summary      text not null default '',
  challenge    text not null default '',
  solution     text not null default '',
  results      jsonb not null default '[]',
  tools        jsonb not null default '[]',
  quote        jsonb,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists case_studies_slug_idx on case_studies(slug);
create index if not exists case_studies_published_idx on case_studies(published, created_at desc);

alter table case_studies enable row level security;

create policy "Public can read published case studies"
  on case_studies for select
  using (published = true);

create policy "Authenticated users have full access to case studies"
  on case_studies for all
  using (auth.role() = 'authenticated');

create trigger case_studies_updated_at
  before update on case_studies
  for each row execute function update_updated_at();

-- Seed: launch case studies
insert into case_studies (title, slug, client, industry, summary, challenge, solution, results, tools, quote, published)
values
(
  'Lead response time cut from 4 hours to 60 seconds',
  'crm-lead-qualification',
  'B2B SaaS company, 45 employees',
  'SaaS',
  'A growing sales team was losing deals to faster competitors. We built an end-to-end lead pipeline that captures, enriches, scores and routes every inbound lead the moment it arrives.',
  'Inbound leads arrived from website forms, ad platforms and email, then sat in a shared inbox until someone manually copied them into the CRM. Average response time was four hours; hot leads regularly went cold, and duplicate records made attribution impossible. The sales team spent the first hour of every day triaging instead of selling.',
  'We connected every lead source to a single intake workflow. Each lead is enriched with firmographic data, scored against the team''s qualification criteria, deduplicated against existing CRM records and routed to the right rep with full context in Slack. Nothing reaches the CRM without passing validation, and every step is logged and monitored with automatic retries.',
  '[{"value":"60s","label":"Avg lead response time"},{"value":"0","label":"Duplicate records since launch"},{"value":"31%","label":"Lift in qualified meetings"}]',
  '[{"name":"HubSpot","icon":"/Assets/icons/icons/hubspot.png"},{"name":"Salesforce","icon":"/Assets/icons/icons/salesforce.png"},{"name":"Slack","icon":"/Assets/icons/icons/slack.png"}]',
  '{"text":"Leads used to sit for half a day before anyone saw them. Now the right rep has full context before the prospect has closed the tab.","author":"Head of Sales","role":"B2B SaaS client"}',
  true
),
(
  'Month-end close reduced from 5 days to 6 hours',
  'finance-month-end-close',
  'E-commerce operator, 8-figure revenue',
  'E-commerce',
  'Reconciliation across payments, invoicing and accounting ate a full working week every month. We automated the matching so exceptions are the only thing humans touch.',
  'Every month the finance team exported transactions from Stripe and PayPal, matched them line by line against invoices in spreadsheets, and chased discrepancies by email. The close took five days, mistakes surfaced weeks later, and the P&L was always out of date when leadership needed it.',
  'We connected the payment processors, invoicing tool and accounting platform so every transaction reconciles automatically as it settles. Mismatches are flagged to the team with the exact records side by side; approvals stay human. A single trigger generates the P&L draft from live data, and every run is logged with alerting on failures.',
  '[{"value":"6h","label":"Month-end close (was 5 days)"},{"value":"100%","label":"Transactions auto-reconciled"},{"value":"12d","label":"Earlier P&L visibility"}]',
  '[{"name":"Stripe","icon":"/Assets/icons/icons/stripe.svg"},{"name":"PayPal","icon":"/Assets/icons/icons/paypal.svg"},{"name":"Google Sheets","icon":"/Assets/icons/icons/sheets.png"}]',
  '{"text":"Close used to be the week everyone dreaded. Now it''s an afternoon, and the numbers are right the first time.","author":"Finance Lead","role":"E-commerce client"}',
  true
),
(
  'New-hire onboarding with zero manual checklists',
  'ops-employee-onboarding',
  'Professional services firm, 120 employees',
  'Professional services',
  'Onboarding a new hire meant 30+ manual steps across five tools. We automated the entire sequence, from signed offer to first-day setup, with human approval gates where they matter.',
  'Each new hire triggered a 30-step checklist spread across HR, IT and the hiring manager: accounts to create, licences to assign, documents to send, intro meetings to book. Steps were missed weekly, new starters waited days for access, and HR spent two to three hours per hire chasing completion by Slack.',
  'A signed offer now triggers the full onboarding sequence automatically: accounts provisioned, licences assigned, welcome documents sent, checklists created in Notion and intro meetings scheduled. Approval-sensitive steps route to the right owner with one-click sign-off, and a live status board shows exactly where every new hire stands.',
  '[{"value":"0","label":"Manual checklist steps"},{"value":"3h","label":"Saved per hire in admin"},{"value":"Day 1","label":"Full access for every starter"}]',
  '[{"name":"Notion","icon":"/Assets/icons/icons/notion.png"},{"name":"Airtable","icon":"/Assets/icons/icons/airtable.svg"},{"name":"Slack","icon":"/Assets/icons/icons/slack.png"}]',
  null,
  true
)
on conflict (slug) do nothing;
