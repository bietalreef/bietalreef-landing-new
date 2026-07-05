-- Public website lead forms for Biet Alreef landing site.
-- Applied to Supabase project lqyknkpnjevkqpalkwry on 2026-07-05.
-- Forms:
-- 1) /request-quote → public_quote_requests
-- 2) /inquiry → public_website_inquiries
-- Inserts are made only through security-definer RPC functions. Public users cannot read requests.

create sequence if not exists public.public_inquiry_request_seq start with 10001 increment by 1;
create sequence if not exists public.public_quote_request_seq start with 10001 increment by 1;

create table if not exists public.public_website_inquiries (
  id uuid primary key default gen_random_uuid(),
  request_number text not null unique,
  full_name text not null,
  phone text not null,
  email text,
  emirate text,
  city text,
  inquiry_topic text,
  message text not null,
  preferred_contact text not null default 'phone' check (preferred_contact in ('phone','whatsapp','email')),
  source_path text,
  source_page_title text,
  utm jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new','contacted','qualified','closed','spam')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.public_quote_requests (
  id uuid primary key default gen_random_uuid(),
  request_number text not null unique,
  full_name text not null,
  phone text not null,
  email text,
  emirate text,
  city text,
  service_category text,
  project_type text,
  project_area text,
  budget_range text,
  timeline text,
  project_description text not null,
  preferred_contact text not null default 'phone' check (preferred_contact in ('phone','whatsapp','email')),
  source_path text,
  source_page_title text,
  utm jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new','contacted','qualified','quoted','closed','spam')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.public_form_email_outbox (
  id uuid primary key default gen_random_uuid(),
  request_type text not null check (request_type in ('inquiry','quote')),
  request_id uuid not null,
  request_number text not null,
  recipient_email text not null,
  recipient_role text not null default 'admin' check (recipient_role in ('admin','client')),
  subject text not null,
  body text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'queued' check (status in ('queued','sent','failed','cancelled')),
  attempts integer not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create index if not exists idx_public_website_inquiries_status on public.public_website_inquiries(status, created_at desc);
create index if not exists idx_public_quote_requests_status on public.public_quote_requests(status, created_at desc);
create index if not exists idx_public_form_email_outbox_status on public.public_form_email_outbox(status, created_at asc);

alter table public.public_website_inquiries enable row level security;
alter table public.public_quote_requests enable row level security;
alter table public.public_form_email_outbox enable row level security;
