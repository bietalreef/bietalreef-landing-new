import { getLocalProviders } from '../../lib/localProviderData';
import { pageModel, cityServiceGate } from '../../lib/localServices';
import { AREAS, CATEGORY, SERVICE_INTENTS, PILOT_REVIEW_DATE } from '../../data/localServices';
// Public manifest contains only metadata already visible in SSR pages. No metrics/tokens.
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  res.setHeader('X-Robots-Tag', 'noindex');
  try {
    const providers = await getLocalProviders();
    const contexts = [{}, { category: CATEGORY.slug }, ...SERVICE_INTENTS.map(item => ({ category: item.category, service: item.slug })), ...AREAS.flatMap(area => [{ area: area.slug }, { area: area.slug, category: CATEGORY.slug }])];
    const rows = contexts.flatMap(context => ['ar', 'en'].flatMap(locale => {
      const model = pageModel({ ...context, locale, providers });
      if (!model) return []; // Registry never manufactures a URL for a missing entity.
      const gate = context.service && !context.area ? cityServiceGate({ ...context, providers, title: model.title, description: model.description, canonical: model.canonical, links: model.breadcrumbs }) : { passed: model.indexable, reasons: model.indexable ? [] : ['missing_independent_reviewed_local_value'] };
      return [{ url: model.canonical, locale, entity_type: context.service ? 'city_service' : context.area ? context.category ? 'area_category' : 'area' : context.category ? 'city_category' : 'city', emirate: model.city.emirate, city: model.city.slug,
        area: context.area || null, category: context.category || null, service: context.service || null,
        provider_ids: model.providers.map(provider => provider.id), indexability_state: model.indexable ? 'eligible' : 'not_ready', robots_state: model.indexable ? 'index, follow' : 'noindex, follow', canonical_url: model.canonical,
        last_content_review_at: PILOT_REVIEW_DATE, last_modified_at: model.lastModified, sitemap_eligible: model.indexable, quality_gate_state: gate.passed ? 'passed' : 'failed', quality_gate_reasons: gate.reasons,
        editorial_provenance: model.intent?.editorial || { reviewed: model.indexable, source: 'existing pilot gate' } }];
    }));
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    return res.status(200).json({ version: 1, rows, missing_services: SERVICE_INTENTS.filter(item => !providers.some(provider => provider.services.some(service => service.slug === item.slug))).map(item => ({ service: item.slug, reason: 'No published provider relation; do not create an SEO page' })) });
  } catch { return res.status(503).json({ error: 'Public source unavailable; registry not updated' }); }
}
