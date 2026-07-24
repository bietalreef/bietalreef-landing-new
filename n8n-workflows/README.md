# Biet Al Reef / Weyaak — Final n8n Workflow Links

Updated: 2026-07-24

## 01 — Weyaak AI Domain Audit
Public/domain analysis workflow for Weyaak.

Import URL:

https://raw.githubusercontent.com/bietalreef/bietalreef-landing-new/n8n-workflows/n8n-workflows/01-weyaak-domain-seo-analyzer.json

Scope:
- Technical SEO
- AEO readiness
- GEO/entity readiness
- Visual SEO
- PageSpeed mobile/desktop
- P0/P1/P2/P3 triage
- OpenAI Brain Model

Webhook after activation:

POST /webhook/weyaak/seo/analyze-domain

Example body:

```json
{"domain":"example.com","lang":"ar"}
```

Security note: do not expose a local n8n webhook publicly until it is behind HTTPS gateway/Cloudflare Tunnel, authentication or rate limiting as appropriate.

## 02 — Weyaak SEO Supervisor + Google Search Console — 3 Domains
Internal supervisor for the Biet Al Reef ecosystem.

Import URL:

https://raw.githubusercontent.com/bietalreef/bietalreef-landing-new/n8n-workflows/n8n-workflows/02-app-seo-gsc-updater.json

Domains:
- https://bietalreef.ae
- https://app.bietalreef.ae
- https://weyaakai.bietalreef.ae

Scope:
- OpenAI Supervisor Agent
- Technical SEO / AEO / GEO
- Premium Visual / Image SEO checks
- PageSpeed mobile/desktop
- Google Sheet `SEO Audit`
- Search Console Sitemap API
- Search Console URL Inspection
- HITL flags for sensitive changes

Google Search Console property:

sc-domain:bietalreef.ae

OAuth scope for GSC write actions:

https://www.googleapis.com/auth/webmasters

## Operating rules
- Google Indexing API is NOT used for normal provider/service/product/landing pages.
- Sitemap API is the normal automated Search Console submission path for these sites.
- URL Inspection checks index status; it does not request indexing.
- `FAQPage` is only used where genuine FAQ content exists; do not assume regular FAQ rich results for this commercial ecosystem.
- Missing `llms.txt` is P3/experimental only.
- 4K visual assets are source masters; production pages should use responsive optimized derivatives where appropriate.
- OpenAI remains the supervisor/brain. A cheaper Weyaak Executor model is a later phase for repetitive implementation tasks.
