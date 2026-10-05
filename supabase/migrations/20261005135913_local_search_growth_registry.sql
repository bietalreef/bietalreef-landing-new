-- Metadata and aggregate search evidence only. Provider/service source tables are unchanged.
create table public.local_seo_url_registry (
  url text primary key check (url ~ '^https://bietalreef[.]ae/(en/)?uae/abu-dhabi/al-ain(/[a-z0-9-]+){0,3}$'),
  locale text not null check (locale in ('ar','en')),
  entity_type text not null,
  emirate text not null, city text not null, area text, category text, service text,
  provider_ids jsonb not null default '[]',
  indexability_state text not null, robots_state text not null,
  canonical_url text not null check (canonical_url = url),
  published_at timestamptz not null default now(),
  last_content_review_at date, last_modified_at date,
  sitemap_eligible boolean not null default false, sitemap_last_submitted_at timestamptz,
  inspection_state text, google_canonical text, last_crawl_at timestamptz, last_inspected_at timestamptz,
  clicks numeric, impressions numeric, ctr numeric, avg_position numeric,
  top_queries jsonb not null default '[]',
  performance_start date, performance_end date, last_performance_sync_at timestamptz, performance_state text,
  quality_gate_state text not null, quality_gate_reasons jsonb not null default '[]', editorial_provenance jsonb not null default '{}',
  editorial_approved boolean not null default false, editorial_rejected boolean not null default false,
  commercial_intent_reviewed boolean not null default false, approval_note text, last_editorial_decision_at timestamptz,
  conversion_summary jsonb not null default '{}', recommendation jsonb not null default '{}',
  check (not (editorial_approved and editorial_rejected)),
  check (not sitemap_eligible or (indexability_state='eligible' and quality_gate_state='passed' and robots_state='index, follow'))
);
alter table public.local_seo_url_registry enable row level security;
revoke all on public.local_seo_url_registry from public, anon, authenticated;
grant select, insert, update on public.local_seo_url_registry to service_role;

-- Aggregate the existing event log; do not copy raw events or visitor identifiers.
create function public.local_seo_conversion_summary(p_start date, p_end date)
returns table(page_path text, phone_click bigint, whatsapp_click bigint, request_quote bigint)
language sql stable security invoker set search_path = '' as $$
  select e.page_path,
    count(*) filter (where e.metadata->>'local_event'='phone_click'),
    count(*) filter (where e.metadata->>'local_event'='whatsapp_click'),
    count(*) filter (where e.metadata->>'local_event'='request_quote')
  from public.public_site_analytics_events e
  where e.created_at >= (p_start::timestamp at time zone 'UTC')
    and e.created_at < (p_end::timestamp at time zone 'UTC')
    and e.page_path ~ '^/(en/)?uae/abu-dhabi/al-ain(/|$)'
  group by e.page_path
$$;
revoke all on function public.local_seo_conversion_summary(date,date) from public, anon, authenticated;
grant execute on function public.local_seo_conversion_summary(date,date) to service_role;
