# Biet Alreef Local Services Search — Al Ain pilot

Release scope: Al Ain, Abu Dhabi; cleaning; Alrehab Home Clean; 12 districts; Arabic and English.
Baseline: `a650343035d9adc9bd62bbff3c2871388a429386` on `master`.

## Architecture and authoritative sources

The existing Pages Router, UAE directory, provider templates, SEOHead, lead forms, public analytics and Supabase public directory reader are extended. No replacement app or parallel provider entity is introduced.

Canonical graph: `/uae/abu-dhabi/al-ain` → district → `cleaning-services` → published provider profile → published service anchor. English mirrors use `/en`.

The geography pilot registry records district → city → emirate relationships. `localServices.types.ts` defines Emirate, City, Area, Category, Service, Provider, ProviderServiceArea, ProviderSubscription and FeaturedProvider contracts. The current resolver restricts new local pages to the Al Ain pilot and cleaning category; expansion requires adding reviewed configuration and routing, not an automatic cross product.

Provider eligibility uses the existing public tables: `provider_public_profiles`, `platform_provider_accounts`, `provider_service_locations`, `provider_categories`, `provider_services` and `platform_*` geography/taxonomy. Publication and verification are required; an explicitly linked inactive account excludes the provider. A published legacy profile without an account mapping can be listed organically. Alrehab's published provider template remains its service source; the execution brief is the provenance for its twelve pilot service areas. This coverage means service availability by agreement, not a local branch or proximity claim.

No database migration or privileged client is introduced. No subscription is inferred from verification. The paid placement selector requires active subscription, explicit `featured_directory` entitlement, matching scope, valid expiry and bilingual disclosure. The public reader currently supplies no paid placements: live subscription and commercial entitlement ingestion remains a later integration with the authoritative subscription system.

Queries share the existing public fetch cache and a five-minute local provider promise. District pages use blocking ISR, with an hourly revalidation interval, and render critical content on the server. A transport failure throws rather than caching an incomplete directory page; a successful empty result remains empty and noindex.

## Routes and rollout

| Page | Arabic route | English route |
|---|---|---|
| City | `/uae/abu-dhabi/al-ain` | `/en/uae/abu-dhabi/al-ain` |
| City cleaning | `/uae/abu-dhabi/al-ain/cleaning-services` | `/en/uae/abu-dhabi/al-ain/cleaning-services` |
| District | `/uae/abu-dhabi/al-ain/{district}` | `/en/uae/abu-dhabi/al-ain/{district}` |
| District cleaning | `/uae/abu-dhabi/al-ain/{district}/cleaning-services` | `/en/uae/abu-dhabi/al-ain/{district}/cleaning-services` |
| Service support | `/uae/abu-dhabi/al-ain/{district}/cleaning-services/{service}` | English equivalent |
| Provider entity | `/providers/alrehab-home-clean` | `/en/providers/alrehab-home-clean` |

Only published service slugs resolve. Unknown areas, categories, services and invalid slugs return 404. Existing flat district roots and flat district cleaning pages permanently redirect to their hierarchical counterpart. Other existing directory/service routes are retained.

| District | Slug | Initial indexing |
|---|---|---|
| الجيمي / Al Jimi | `al-jimi` | noindex, follow |
| الهيلي / Al Hili | `al-hili` | noindex, follow |
| المويجعي / Al Muwaiji | `al-muwaiji` | noindex, follow |
| المرخانية / Al Markhaniya | `al-markhaniya` | noindex, follow |
| الطوية / Al Towayya | `al-towayya` | noindex, follow |
| الفوعة / Al Foah | `al-foah` | noindex, follow |
| زاخر / Zakher | `zakher` | noindex, follow |
| عشارج / Asharej | `asharej` | noindex, follow |
| المقام / Al Maqam | `al-maqam` | noindex, follow |
| فلج هزاع / Falaj Hazza | `falaj-hazza` | noindex, follow |
| اليحر / Al Yahar | `al-yahar` | noindex, follow |
| الظاهر / Al Dhahir | `al-dhahir` | noindex, follow |

The city and city-cleaning pages are indexable when an eligible provider exists. The 48 bilingual district/district-category URLs are browsable but excluded from sitemap until independent district evidence is reviewed. A district name plus the same provider is insufficient independent content. Set reviewed local editorial blocks and provenance only after an actual content review; the component renders those blocks. Service routes remain noindex without a separate demand approval; no service combinations are emitted in sitemap. This is an intentional quality gate, not a claim that all district SEO landing pages are ready to rank.

## SEO, AEO and GEO

- Local metadata includes a title, description, canonical, OG, Twitter, reciprocal ar-AE/en-AE and x-default alternates, one H1 and visible breadcrumb navigation.
- Area/category pages show coverage-qualified provider records, service scope, enquiry preparation and short factual questions/answers. City and cleaning-category intent use distinct content: service cards appear on category pages.
- Local JSON-LD uses CollectionPage, ItemList with references to canonical provider entities, and BreadcrumbList. It creates no neighborhood LocalBusiness.
- Alrehab uses LocalBusiness and Service, preserving its Arabic entity ID in both languages. `CleaningService` is not a recognized Schema.org type and is removed. The unverified PostalAddress and founding date are removed from JSON-LD. The provider receives the existing SEOHead serializer, breadcrumbs, matching alternates, Twitter/OG and visible district links.
- Existing FAQ content is retained; no FAQ rich-result promise is made.
- SEOHead no longer assigns Dubai coordinates to every page. Its existing noindex/nofollow behavior is preserved by default; local pages explicitly opt into noindex/follow.
- JSON-LD is internally generated and `<` is safely escaped by SEOHead. Slugs are strictly validated; URL parameters are not SEO landing-page canonicals.
- City/district/category/provider links are reciprocal. Other districts are labeled “other”, not “nearby”: no proximity is inferred without geographic evidence.
- Local sitemap entries share the page quality gate and use a real pilot revision date. Newly added dynamic sitemap entries omit lastmod where no reliable source timestamp exists, rather than pretending they changed on every request. No noindex local URLs are submitted.

## Measurement and conversion

Local events reuse `trackPublicEvent` and the existing consent gate. They are emitted to GA by name and stored by the existing RPC using accepted event types plus `metadata.local_event`; no unsupported database event enum is invented.

Events: `area_page_view`, `provider_view_from_area`, `phone_click`, `whatsapp_click`, `request_quote`, `map_click`, `provider_area_conversion`.
Dimensions: `emirate`, `city`, `area`, `category`, `service`, `provider_id`, `provider_slug`.

`provider_area_conversion` means lead intent (a click to phone, WhatsApp or quote), not a completed job, successful phone call or quote submission. `request_quote` means entering the quote flow. Events are suppressed when analytics consent is rejected or Do Not Track is enabled. Page views also handle consent granted after page load. Custom local clicks opt out of the document's generic click collector, avoiding duplicate phone/WhatsApp events. Events wait in memory for Google tag configuration when necessary; existing Google Ads/Analytics IDs and consent defaults are retained.

Both lead forms prefill validated Al Ain/district context and the provider slug in the request description. The existing central quote flow is retained; this does not introduce a new direct-provider dispatch backend. Phone and WhatsApp go to the published provider contact.

Search Console needs no new API. Use canonical URL filters and `localSearchDimensions()` for city/district/category/service segmentation. Watch impressions, clicks, CTR, position, queries and indexing on eligible URLs. Review actual district evidence and service demand before opening further pages to indexing. No ranking, indexing or AI citation outcome is guaranteed by deployment.

## Files

Created: `components/LocalServicesPage.js`, `components/ProviderServiceAreas.js`, `data/localServices.js`, `data/localServices.types.ts`, `lib/localProviderData.js`, `lib/localRouteProps.js`, `lib/localServices.js`, Arabic/English district-category and service routes, `scripts/local-services.test.cjs`, `scripts/local-services-http.cjs`, `scripts/local-services-smoke.cjs`, this document.

Modified: existing Arabic/English city and service route handlers; Arabic/English Alrehab provider pages; `components/SEOHead.js`; both lead forms; `components/ConsentAwareGoogleTag.js`; `lib/platformDirectoryCards.js`; `lib/publicAnalytics.js`; `pages/api/analytics-event.js`; `pages/sitemap.xml.js`; `next.config.js`; `package.json`.

## Validation

Unit command: `npm run test:local-services` (11 tests covering invalid slugs and area lookup, coverage/eligibility, indexability, canonicals/alternates, schema, sitemap, missing entities, commercial scope and Search Console dimensions).

HTTP command after a production build: `node scripts/local-services-http.cjs`, with the existing public Supabase environment variables. Starts and stops its own production server; checks 54 bilingual URLs, intentional 404s, redirects, metadata, schema and sitemap.

Browser command: Playwright installed in node_modules or NODE_PATH, `LOCAL_SEO_START=1 node scripts/local-services-smoke.cjs`. Uses an isolated test browser, mocks analytics writes, blocks external Google test transmissions, checks desktop/mobile layout, internal links, hydration errors, Google event names and consent behavior.

Build command: `npm run build`. Existing large-page and taxonomy transport warnings outside the pilot must be distinguished from a successful exit status. A cold build is authoritative when local incremental cache produces invalid component exports.

Deployment commit and live verification results are recorded in the release response; this document does not substitute for those checks.

Verified locally: 11/11 unit tests; successful production build; 54 route responses; four intentional 404s; two redirect checks; mobile 390px and desktop 1440px with no horizontal overflow; internal links; zero page errors; analytics and rejected-consent checks. Schema checks validate generated JSON and absence of unsupported/fictional business data; they are not an external Google Rich Results certification. Search Console indexing and field Core Web Vitals require post-release observation.

Production review found the public phone stored in local UAE format. The adapter now normalizes validated UAE numbers to E.164 before constructing phone/WhatsApp CTAs; this has a dedicated regression test.
