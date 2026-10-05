const { CITY, AREAS, CATEGORY, PILOT_REVIEW_DATE, SERVICE_INTENTS } = require('../data/localServices');
const DOMAIN = 'https://bietalreef.ae';
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function validSlug(value) { return typeof value === 'string' && value.length <= 120 && SLUG.test(value); }
function normalizeUaePhone(value) {
  let digits = String(value || '').replace(/[^0-9]/g, '');
  if (digits.startsWith('00971')) digits = digits.slice(2);
  if (/^0[2-9]\d{7,8}$/.test(digits)) digits = '971' + digits.slice(1);
  else if (/^5\d{8}$/.test(digits)) digits = '971' + digits;
  return /^971[2-9]\d{7,8}$/.test(digits) ? '+' + digits : '';
}
function getLocalArea(slug) { return validSlug(slug) ? AREAS.find(area => area.slug === slug) || null : null; }
function localPath({ locale = 'ar', area, category, service } = {}) {
  if (!['ar', 'en'].includes(locale) || [area, category, service].some(value => value && !validSlug(value))) throw new Error('Invalid local route');
  if (service && !category) throw new Error('Service requires category');
  return `${locale === 'en' ? '/en' : ''}/uae/${CITY.emirate}/${CITY.slug}${area ? `/${area}` : ''}${category ? `/${category}` : ''}${service ? `/${service}` : ''}`;
}
function alternates(context) {
  const ar = DOMAIN + localPath({ ...context, locale: 'ar' });
  return { ar, en: DOMAIN + localPath({ ...context, locale: 'en' }), default: ar };
}
function eligibleProviders(providers, { area, category = CATEGORY.slug, service } = {}) {
  return providers.filter(provider => provider.published === true && provider.verified === true && provider.visibility?.directory === true
    && (!provider.visibility.requiresSubscription || provider.subscription?.active === true)
    && provider.services.some(item => item.category === category && item.published === true && (!service || item.slug === service))
    && provider.coverage.some(item => item.emirate === CITY.emirate && item.city === CITY.slug && item.approved === true && (!area || item.areas.includes(area))));
}
function isIndexableAreaPage({ area, category, providers = [], title, description, canonical, links = [], service, demandReviewed = false } = {}) {
  const found = getLocalArea(area);
  if (!found || found.city !== CITY.slug || (category && category !== CATEGORY.slug) || !title || !description || canonical !== DOMAIN + localPath({ area, category, service })) return false;
  const evidence = found.editorial;
  return evidence.reviewed === true && Boolean(evidence.source) && evidence.blocks.length >= 2 && links.length >= 2
    && eligibleProviders(providers, { area, category, service }).length > 0 && (!service || demandReviewed);
}
// Extension of the existing quality policy for the missing city/service level.
// Readiness scores cannot override these mandatory checks.
function cityServiceGate({ service, category, providers = [], title, description, canonical, links = [] } = {}) {
  const intent = SERVICE_INTENTS.find(item => item.slug === service && item.category === category);
  const selected = eligibleProviders(providers, { category, service });
  const reasons = [];
  if (!validSlug(service) || category !== CATEGORY.slug) reasons.push('invalid_service_or_category');
  if (!selected.length) reasons.push('missing_published_eligible_provider_coverage');
  if (!selected.some(provider => provider.services.some(item => item.slug === service && item.entityId && item.providerServiceId && item.provenance === 'provider_services' && item.summary?.ar && item.summary?.en))) reasons.push('missing_live_service_relation_or_description');
  if (!intent?.editorial.reviewed || !intent.editorial.source || !intent.editorial.independentValue || !intent.when || !intent.details) reasons.push('missing_reviewed_useful_content');
  if (!title || !description || ![DOMAIN + localPath({ category, service }), DOMAIN + localPath({ locale: 'en', category, service })].includes(canonical) || links.length < 2) reasons.push('missing_metadata_canonical_or_links');
  return { passed: reasons.length === 0, reasons };
}
function featuredProviders(providers, { area, category }, now = Date.now()) {
  return eligibleProviders(providers, { area, category }).flatMap(provider => {
    if (!provider.subscription?.active || !provider.subscription.entitlements?.includes('featured_directory')) return [];
    return (provider.placements || []).filter(placement => placement.providerId === provider.id && placement.area === area
      && placement.category === category && placement.active === true && ['featured', 'sponsored'].includes(placement.kind)
      && Date.parse(placement.expiresAt) > now && placement.label?.ar && placement.label?.en).map(placement => ({ provider, placement }));
  });
}
function pageModel({ locale = 'ar', area: areaSlug, category, service, providers = [] } = {}) {
  if (!['ar', 'en'].includes(locale)) return null;
  const area = areaSlug ? getLocalArea(areaSlug) : null;
  if (areaSlug && !area || category && category !== CATEGORY.slug || service && !validSlug(service)) return null;
  const selected = eligibleProviders(providers, { area: areaSlug, category: category || CATEGORY.slug, service });
  if (service && !selected.length) return null;
  const intent = service ? SERVICE_INTENTS.find(item => item.slug === service && item.category === category) : null;
  if (service && !area && !intent?.editorial.reviewed) return null;
  const en = locale === 'en';
  const place = area ? `${en ? area.nameEn : area.nameAr} – ${en ? CITY.nameEn : CITY.nameAr}` : (en ? CITY.nameEn : CITY.nameAr);
  const requestedService = service ? selected.flatMap(provider => provider.services).find(item => item.slug === service) : null;
  const title = requestedService ? `${intent?.name[locale] || requestedService.title[locale]} ${en ? 'in' : 'في'} ${place} | ${en ? 'Biet Alreef' : 'بيت الريف'}` : category ? (en ? `Cleaning services in ${place} | Biet Alreef` : `خدمات التنظيف في ${place} | بيت الريف`) : (en ? `Local services in ${place} | Biet Alreef` : `دليل الخدمات في ${place} | بيت الريف`);
  const description = service && !area ? (en ? `Find ${intent.name.en.toLowerCase()} in ${CITY.nameEn}. Review the published scope, preparation details and eligible providers, then request a quote based on photos and the actual work.` : `اكتشف ${intent.name.ar} في ${CITY.nameAr}. راجع نطاق الخدمة المنشور والمعلومات المطلوبة والمزودين المؤهلين، ثم اطلب عرض سعر بناءً على الصور والعمل الفعلي.`) : en ? `Browse published cleaning services serving ${place}. Compare service scope, send photos and request a quotation from providers on Biet Alreef. Availability is confirmed by the provider.` : `تصفح خدمات التنظيف المنشورة التي تخدم ${place}. راجع نطاق الخدمة وأرسل الصور واطلب عرض سعر من مزودي بيت الريف. يؤكد المزود توفر الموعد ونطاق العمل.`;
  const context = { area: areaSlug, category, service };
  const paths = alternates(context);
  const links = AREAS.map(item => localPath({ area: item.slug }));
  const indexable = area ? isIndexableAreaPage({ area: areaSlug, category, service, providers, title, description, canonical: DOMAIN + localPath({ ...context, locale: 'ar' }), links }) : service ? cityServiceGate({ service, category, providers, title, description, canonical: paths[locale], links }).passed : selected.length > 0;
  const breadcrumbs = [
    { name: en ? 'UAE' : 'الإمارات', href: en ? '/en/uae' : '/uae' },
    { name: en ? 'Abu Dhabi' : 'أبوظبي', href: `${en ? '/en' : ''}/uae/abu-dhabi` },
    { name: en ? CITY.nameEn : CITY.nameAr, href: localPath({ locale }) },
    ...(area ? [{ name: en ? area.nameEn : area.nameAr, href: localPath({ locale, area: area.slug }) }] : []),
    ...(category ? [{ name: en ? CATEGORY.nameEn : CATEGORY.nameAr, href: localPath({ locale, area: areaSlug, category }) }] : []),
    ...(service ? [{ name: intent?.name[locale] || requestedService.title[locale], href: localPath({ locale, ...context }) }] : []),
  ];
  const canonical = paths[locale];
  const sourceDates = selected.flatMap(provider => provider.services.filter(item => !service || item.slug === service).map(item => item.updatedAt)).filter(value => typeof value === 'string' && Number.isFinite(Date.parse(value))).map(value => new Date(value).toISOString().slice(0, 10));
  const lastModified = [PILOT_REVIEW_DATE, ...sourceDates].sort().at(-1);
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': canonical + '#page', url: canonical,
    name: title, description, inLanguage: en ? 'en-AE' : 'ar-AE',
    about: { '@type': area ? 'Place' : 'City', name: place, containedInPlace: { '@type': area ? 'City' : 'AdministrativeArea', name: area ? (en ? CITY.nameEn : CITY.nameAr) : (en ? 'Abu Dhabi' : 'أبوظبي') } },
    mainEntity: { '@type': 'ItemList', itemListElement: selected.map((provider, index) => ({
      '@type': 'ListItem', position: index + 1, name: provider.name[locale], url: `${DOMAIN}${en ? '/en' : ''}/providers/${provider.slug}`,
      item: { '@id': `${DOMAIN}/providers/${provider.slug}#provider` },
    })) },
  };
  if (service) schema.about = { '@type': 'Service', '@id': canonical + '#service', name: intent?.name[locale] || requestedService.title[locale], serviceType: requestedService.title[locale], description: requestedService.summary?.[locale] || '', areaServed: { '@type': area ? 'Place' : 'City', name: place }, provider: selected.map(provider => ({ '@id': `${DOMAIN}/providers/${provider.slug}#provider` })) };
  const relatedServices = SERVICE_INTENTS.filter(item => item.slug !== service && item.editorial.reviewed && eligibleProviders(providers, { service: item.slug, category: item.category }).length).map(item => ({ slug: item.slug, name: item.name, details: item.details, path: localPath({ locale, category: item.category, service: item.slug }) }));
  return { lastModified, intent: intent || null, requestedService: requestedService || null, relatedServices, locale, area, category: category || null, service: service || null, title, description, canonical, alternates: paths, indexable, breadcrumbs, schema, providers: selected, featured: featuredProviders(selected, { area: areaSlug, category: category || CATEGORY.slug }), areas: AREAS, city: CITY };
}
function localSearchDimensions(path) {
  if (typeof path !== 'string') return null;
  const segments = path.split('?')[0].split('#')[0].split('/').filter(Boolean);
  const locale = segments[0] === 'en' ? (segments.shift(), 'en') : 'ar';
  if (segments[0] !== 'uae' || segments[1] !== CITY.emirate || segments[2] !== CITY.slug || segments.length > 6) return null;
  const tail = segments.slice(3);
  let area = '', category = '', service = '';
  if (tail[0] === CATEGORY.slug && tail.length <= 2) { [category = '', service = ''] = tail; if (service && !validSlug(service)) return null; }
  else if (tail.length) {
    if (!getLocalArea(tail[0]) || tail[1] && tail[1] !== CATEGORY.slug || tail[2] && !validSlug(tail[2])) return null;
    [area = '', category = '', service = ''] = tail;
  }
  return { locale, emirate: CITY.emirate, city: CITY.slug, area, category, service };
}
function localSitemap(providers) {
  const contexts = [{}, { category: CATEGORY.slug }, ...SERVICE_INTENTS.filter(item => item.editorial.reviewed).map(item => ({ category: item.category, service: item.slug })), ...AREAS.flatMap(area => [{ area: area.slug }, { area: area.slug, category: CATEGORY.slug }])];
  return contexts.flatMap(context => ['ar', 'en'].flatMap(locale => {
    const model = pageModel({ ...context, locale, providers });
    return model?.indexable ? [{ loc: model.canonical, lastmod: model.lastModified, changefreq: 'monthly', priority: 0.7, alternates: model.alternates }] : [];
  }));
}
module.exports = { DOMAIN, validSlug, normalizeUaePhone, getLocalArea, localPath, alternates, eligibleProviders, cityServiceGate, featuredProviders, isIndexableAreaPage, pageModel, localSitemap, localSearchDimensions };
