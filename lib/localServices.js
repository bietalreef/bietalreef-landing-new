const { CITY, AREAS, CATEGORY, PILOT_REVIEW_DATE } = require('../data/localServices');
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
  const en = locale === 'en';
  const place = area ? `${en ? area.nameEn : area.nameAr} – ${en ? CITY.nameEn : CITY.nameAr}` : (en ? CITY.nameEn : CITY.nameAr);
  const requestedService = service ? selected.flatMap(provider => provider.services).find(item => item.slug === service) : null;
  const title = requestedService ? `${requestedService.title[locale]} – ${place} | ${en ? 'Biet Alreef' : 'بيت الريف'}` : category ? (en ? `Cleaning services in ${place} | Biet Alreef` : `خدمات التنظيف في ${place} | بيت الريف`) : (en ? `Local services in ${place} | Biet Alreef` : `دليل الخدمات في ${place} | بيت الريف`);
  const description = en ? `Browse published cleaning services serving ${place}. Compare service scope, send photos and request a quotation from providers on Biet Alreef. Availability is confirmed by the provider.` : `تصفح خدمات التنظيف المنشورة التي تخدم ${place}. راجع نطاق الخدمة وأرسل الصور واطلب عرض سعر من مزودي بيت الريف. يؤكد المزود توفر الموعد ونطاق العمل.`;
  const context = { area: areaSlug, category, service };
  const paths = alternates(context);
  const links = AREAS.map(item => localPath({ area: item.slug }));
  const indexable = area ? isIndexableAreaPage({ area: areaSlug, category, service, providers, title, description, canonical: DOMAIN + localPath({ ...context, locale: 'ar' }), links }) : selected.length > 0 && !service;
  const breadcrumbs = [
    { name: en ? 'UAE' : 'الإمارات', href: en ? '/en/uae' : '/uae' },
    { name: en ? 'Abu Dhabi' : 'أبوظبي', href: `${en ? '/en' : ''}/uae/abu-dhabi` },
    { name: en ? CITY.nameEn : CITY.nameAr, href: localPath({ locale }) },
    ...(area ? [{ name: en ? area.nameEn : area.nameAr, href: localPath({ locale, area: area.slug }) }] : []),
    ...(category ? [{ name: en ? CATEGORY.nameEn : CATEGORY.nameAr, href: localPath({ locale, area: areaSlug, category }) }] : []),
  ];
  const canonical = paths[locale];
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': canonical + '#page', url: canonical,
    name: title, description, inLanguage: en ? 'en-AE' : 'ar-AE',
    about: { '@type': area ? 'Place' : 'City', name: place, containedInPlace: { '@type': area ? 'City' : 'AdministrativeArea', name: area ? (en ? CITY.nameEn : CITY.nameAr) : (en ? 'Abu Dhabi' : 'أبوظبي') } },
    mainEntity: { '@type': 'ItemList', itemListElement: selected.map((provider, index) => ({
      '@type': 'ListItem', position: index + 1, name: provider.name[locale], url: `${DOMAIN}${en ? '/en' : ''}/providers/${provider.slug}`,
      item: { '@id': `${DOMAIN}/providers/${provider.slug}#provider` },
    })) },
  };
  return { locale, area, category: category || null, service: service || null, title, description, canonical, alternates: paths, indexable, breadcrumbs, schema, providers: selected, featured: featuredProviders(selected, { area: areaSlug, category: category || CATEGORY.slug }), areas: AREAS, city: CITY };
}
function localSearchDimensions(path) {
  if (typeof path !== 'string') return null;
  const segments = path.split('?')[0].split('#')[0].split('/').filter(Boolean);
  const locale = segments[0] === 'en' ? (segments.shift(), 'en') : 'ar';
  if (segments[0] !== 'uae' || segments[1] !== CITY.emirate || segments[2] !== CITY.slug || segments.length > 6) return null;
  const tail = segments.slice(3);
  let area = '', category = '', service = '';
  if (tail[0] === CATEGORY.slug && tail.length === 1) category = tail[0];
  else if (tail.length) {
    if (!getLocalArea(tail[0]) || tail[1] && tail[1] !== CATEGORY.slug || tail[2] && !validSlug(tail[2])) return null;
    [area = '', category = '', service = ''] = tail;
  }
  return { locale, emirate: CITY.emirate, city: CITY.slug, area, category, service };
}
function localSitemap(providers) {
  const contexts = [{}, { category: CATEGORY.slug }, ...AREAS.flatMap(area => [{ area: area.slug }, { area: area.slug, category: CATEGORY.slug }])];
  return contexts.flatMap(context => ['ar', 'en'].flatMap(locale => {
    const model = pageModel({ ...context, locale, providers });
    return model?.indexable ? [{ loc: model.canonical, lastmod: PILOT_REVIEW_DATE, changefreq: 'monthly', priority: 0.7, alternates: model.alternates }] : [];
  }));
}
module.exports = { DOMAIN, validSlug, normalizeUaePhone, getLocalArea, localPath, alternates, eligibleProviders, featuredProviders, isIndexableAreaPage, pageModel, localSitemap, localSearchDimensions };
