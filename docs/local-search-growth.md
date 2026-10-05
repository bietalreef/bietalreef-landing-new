# Local Search Growth — Phase 2

Baseline audited on 2026-10-05: master `ee4a2e4a1db7ff498bb561faa256ca1eb7c4b9a0` (no later changes).

## Source and rollout

Use existing `provider_services` + active `platform_services` category relation + published/verified eligible profile + live `provider_service_locations`. The old Alrehab template is not service/coverage truth. Its contact/artwork is reused; provider service cards and Service schema now read the same public live adapter as discovery pages. Published emirate coverage is preserved.

Audit found no provider_categories relation and the sofa card linked to an inactive legacy taxonomy definition. A separate idempotent repair migration links the existing published sofa card to the active definition with exactly the same Arabic name/category and adds the category relation derived from its existing published services. It changes no titles, prices, publication state or coverage and creates no service entity.

Live Alrehab cards: home/villa, steam sofa/upholstery, facade/glass, sanitization/pest-related treatment. Only two P0 intents have published provider relations. No eligible provider has published independent carpet/rug, majlis or mattress relations in the audited dataset. Do not manufacture them to satisfy ten URLs. P1 stays deferred while P0 is data-blocked.

URL intent aliases preserve readable Phase-1 slugs without changing taxonomy entities:

| Intent URL slug | Existing taxonomy slug | State |
|---|---|---|
| home-villa-cleaning | homes-buildings-cleaning-302 | enabled if mandatory gates pass |
| sofa-cleaning | steam-upholstery-cleaning-309 (retired alias steam-sofa-cleaning) | enabled if mandatory gates pass |
| carpet-rug-cleaning | steam-upholstery-cleaning-310 / steam-upholstery-cleaning-311 | not ready; confirm exact service boundary before approval |
| majlis-cleaning | steam-upholstery-cleaning-312 | not ready |
| mattress-upholstery-cleaning | steam-upholstery-cleaning-313 | not ready |

Category owns company/discovery intent. Service owns its specific request intent. Provider owns brand intent. Missing definitions/relations, unpublished sources and unsupported keyword-only services resolve 404; real pages failing quality gates use noindex/follow. Twelve areas retain the original local-value gate. An area/service route is not made indexable by city/service success.

## Route reuse

Existing `/uae/abu-dhabi/al-ain/[district]/[category]` (and en mirror) already has the required segment depth. `localProps` discriminates `cleaning-services/{service}` from `{area}/{category}`. There is no conflicting dynamic route, new app or alternate `/al-ain` tree. `LocalServicesPage` renders all contexts via the same model. URLs using enabled old taxonomy slugs redirect to intent canonical slugs.

## Quality and rendering

Existing area gate remains unchanged. The city-service extension requires real taxonomy/provider-service IDs, published relation, valid category, verified/published provider and coverage, two-language descriptions, reviewed independent useful content/provenance, metadata/canonical and links. It cannot be overridden by an opportunity score. Discovery is ISR/blocking with server content, public source cache five minutes, revalidate one hour. A bounded 20-second local-reader timeout aborts failures; other directory readers keep the existing default.

## Existing Search Console integration

Extend deployed `google-integration-health`; keep its existing secret/service account/property and JWT setting. No new OAuth or Google account. CORS is limited to the three production Biet Alreef origins; a valid platform-admin JWT is still required for growth actions. Existing merchant/health/sitemap/root inspection actions are retained. New actions require `verify_platform_admin` before Google or registry access:

- `search_analytics`: `startDate`, `endDate`, optional `dimensions` (query,page,date,device,country), optional canonical pilot `page`.
- `sync_local_seo_registry`: fetch current server-generated public `/api/local-seo-registry` manifest; upsert only canonical metadata and withdraw absent URLs from eligibility without fabricating a replacement.
- `refresh_local_seo_performance`: read page metrics plus page/query top rows and previous matching window, join existing conversion aggregates, store recommendation. Optional `page` scopes the update.
- `inspect_local_seo`: registered pilot URL only; store Google verdict/canonical/crawl, never request indexing.
- `local_seo_report`: private registry and explicit disconnected Ads adapter.
- `review_local_seo`: explicit booleans `approved`, `rejected`, `commercialIntent`, `url`, nonempty `note`; records an editorial decision. It does not change routes/robots or publish.

Authenticated platform admin flow: sync manifest → read Search Analytics → review evidence → record editorial decision → refresh recommendation. Call through the existing Supabase authenticated admin session. Never place Google credentials in Next public variables.

Search Analytics dates use Pacific Time; conversions currently use UTC window boundaries. Empty/top-row-limited Google responses are not proof of zero demand. Absent rows remain null, not fabricated zero metrics. Comparison needs matching complete windows; no absolute-impression trigger. The API is capped to 25,000 returned top rows per query; saturation marks the response incomplete.

## Registry and decisions

Migrations `local_search_growth_registry` and `repair_alrehab_service_taxonomy_relation`: one server-only RLS-enabled metadata registry. Raw events remain in `public_site_analytics_events`. `local_seo_conversion_summary` is SECURITY INVOKER and callable only by service_role. An INFO advisor about RLS without client policies is intentional deny-all client access. No other RLS policies or source entities are altered.

`lib/localSeoGrowth.mjs` is shared directly by the Edge Function and unit tests. Output states candidate/recommended/not_ready/rejected, stored reasons and disclosed evidence count. All results contain `auto_publish:false`. Mandatory failures stop recommendations; editorial approval + reviewed commercial intent + observed comparative or conversion evidence are needed for recommended. No numeric score can publish.

Ads: tracking tag exists; Search Terms API adapter was not found in repo or audited main Google Edge functions. Adapter is explicitly not_connected, not fake data. Pricing insights, llms.txt, auto expansion and automatic scheduling are outside this rollout.

## Analytics

Reuse existing events and consent/DNT. Add only `city_service_view` and `provider_view_from_service`. Keep local lead-intent events; attribution adds locale/source_page/page_type and preserves existing UTM/click ID fields through server sanitization. Calls and WhatsApp normalize UAE numbers. Quote forms preserve validated service context. Clicks are not completed jobs or submitted leads.

## Verification commands

`npm run test:local-services`
`npm run test:local-growth`
`npm run check:google-edge`
`npm run build`

Smoke: install Playwright in test-only path; run `scripts/local-services-smoke.cjs` against a production build. It covers first-phase routes, enabled city services, blocked services, canonical/alternates, schema, sitemap, registry, provider regression, 1440/390 layouts, links, phone/WhatsApp/quote, local and Google event calls, rejected consent and DNT. No real messages or leads are sent.
