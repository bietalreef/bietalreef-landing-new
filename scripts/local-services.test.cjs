const test = require('node:test');
const assert = require('node:assert/strict');
const { CITY, AREAS, CATEGORY } = require('../data/localServices');
const { validSlug, getLocalArea, localPath, alternates, eligibleProviders, featuredProviders, isIndexableAreaPage, pageModel, localSitemap, localSearchDimensions } = require('../lib/localServices');
const fixture = { id: 'provider-1', slug: 'alrehab-home-clean', name: { ar: 'الرحاب', en: 'Alrehab' }, published: true, verified: true,
  visibility: { directory: true, requiresSubscription: false }, subscription: { active: false },
  services: [{ slug: 'sofa-cleaning', category: CATEGORY.slug, published: true, title: { ar: 'تنظيف الكنب', en: 'Sofa cleaning' } }],
  coverage: [{ emirate: CITY.emirate, city: CITY.slug, areas: ['al-jimi'], approved: true }] };
const providers = [fixture];
test('slug lookup rejects traversal, arrays, HTML, uppercase and missing areas', () => {
  for (const value of ['../al-jimi', '<script>', 'al-jimi?x=1', 'AL-JIMI', [], null, 'a'.repeat(121)]) assert.equal(validSlug(value), false);
  assert.equal(getLocalArea('al-jimi').nameAr, 'الجيمي'); assert.equal(getLocalArea('missing'), null);
  assert.equal(AREAS.length, 12); assert.equal(new Set(AREAS.map(x => x.slug)).size, 12);
});
test('coverage, verification, publication and paid entitlement filtering', () => {
  assert.equal(eligibleProviders(providers, { area: 'al-jimi' }).length, 1);
  assert.equal(eligibleProviders(providers, { area: 'al-hili' }).length, 0);
  for (const override of [{ published: false }, { verified: false }, { visibility: { directory: false } }, { coverage: [] }, { services: [] }, { visibility: { directory: true, requiresSubscription: true } }]) assert.equal(eligibleProviders([{ ...fixture, ...override }], { area: 'al-jimi' }).length, 0);
  assert.equal(eligibleProviders([{ ...fixture, subscription: { active: true }, visibility: { directory: true, requiresSubscription: true } }], { area: 'al-jimi' }).length, 1);
});
test('canonical and reciprocal Arabic/English alternates', () => {
  const context = { area: 'al-jimi', category: CATEGORY.slug };
  const ar = pageModel({ ...context, providers }); const en = pageModel({ ...context, providers, locale: 'en' });
  assert.equal(ar.canonical, 'https://bietalreef.ae/uae/abu-dhabi/al-ain/al-jimi/cleaning-services');
  assert.equal(en.canonical, 'https://bietalreef.ae/en/uae/abu-dhabi/al-ain/al-jimi/cleaning-services');
  assert.deepEqual(ar.alternates, en.alternates); assert.equal(ar.alternates.default, ar.canonical);
  assert.throws(() => localPath({ area: '../bad' }));
});
test('unreviewed local evidence fails quality gate even with a provider', () => {
  const model = pageModel({ area: 'al-jimi', category: CATEGORY.slug, providers });
  assert.equal(model.indexable, false);
  assert.equal(isIndexableAreaPage({ area: 'al-jimi', category: CATEGORY.slug, providers, title: 't', description: 'd', canonical: model.canonical, links: ['a', 'b'] }), false);
});
test('quality gate admits reviewed evidence and still requires demand for services', () => {
  const area = getLocalArea('al-jimi'), prior = area.editorial;
  try {
    area.editorial = { reviewed: true, source: 'reviewed local evidence', blocks: [{ ar: 'a', en: 'a' }, { ar: 'b', en: 'b' }] };
    const context = { area: area.slug, category: CATEGORY.slug, providers };
    assert.equal(pageModel(context).indexable, true);
    assert.equal(pageModel({ ...context, service: 'sofa-cleaning' }).indexable, false);
    assert.equal(pageModel({ ...context, providers: [] }).indexable, false);
  } finally { area.editorial = prior; }
});
test('schema contains a collection of entity references, never fictitious businesses', () => {
  const model = pageModel({ area: 'al-jimi', category: CATEGORY.slug, providers });
  assert.equal(model.schema['@type'], 'CollectionPage');
  assert.equal(model.schema.mainEntity['@type'], 'ItemList');
  assert.equal(model.schema.mainEntity.itemListElement[0].item['@id'], 'https://bietalreef.ae/providers/alrehab-home-clean#provider');
  assert.doesNotMatch(JSON.stringify(model.schema), /PostalAddress|geo|aggregateRating|CleaningService/);
});
test('sitemap excludes all unreviewed permutations and empty city pages', () => {
  const entries = localSitemap(providers); assert.equal(entries.length, 4);
  assert.equal(new Set(entries.map(x => x.loc)).size, 4);
  assert.equal(localSitemap([]).length, 0);
  for (const entry of entries) { assert.equal(entry.lastmod, '2026-10-05'); assert.doesNotMatch(entry.loc, /\?|al-jimi/); }
});
test('missing provider/service/area and invalid category fail safely', () => {
  assert.equal(pageModel({ area: 'missing' }), null);
  assert.equal(pageModel({ area: '../bad' }), null);
  assert.equal(pageModel({ category: 'unknown' }), null);
  assert.equal(pageModel({ area: 'al-jimi', category: CATEGORY.slug, service: 'not-published', providers }), null);
  assert.equal(pageModel({ providers: [] }).indexable, false);
});

test('commercial placements require entitlement, scope, expiry and clear labels', () => {
  const now = Date.parse('2026-10-05T12:00:00Z');
  const placement = { providerId: fixture.id, area: 'al-jimi', category: CATEGORY.slug, kind: 'sponsored', active: true, expiresAt: '2026-11-01', label: { ar: 'إعلان مدفوع', en: 'Sponsored' } };
  const paid = { ...fixture, subscription: { active: true, entitlements: ['featured_directory'] }, placements: [placement] };
  assert.equal(featuredProviders([paid], { area: 'al-jimi', category: CATEGORY.slug }, now).length, 1);
  assert.equal(featuredProviders([paid], { area: 'al-hili', category: CATEGORY.slug }, now).length, 0);
  assert.equal(featuredProviders([{ ...paid, subscription: { active: false } }], { area: 'al-jimi', category: CATEGORY.slug }, now).length, 0);
  assert.equal(featuredProviders([{ ...paid, placements: [{ ...placement, expiresAt: '2020-01-01' }] }], { area: 'al-jimi', category: CATEGORY.slug }, now).length, 0);
  assert.equal(featuredProviders([{ ...paid, placements: [{ ...placement, label: {} }] }], { area: 'al-jimi', category: CATEGORY.slug }, now).length, 0);
});

test('Search Console dimensions resolve canonical bilingual URLs', () => {
  assert.deepEqual(localSearchDimensions('/en/uae/abu-dhabi/al-ain/al-jimi/cleaning-services'), { locale: 'en', emirate: 'abu-dhabi', city: 'al-ain', area: 'al-jimi', category: 'cleaning-services', service: '' });
  assert.equal(localSearchDimensions('/uae/abu-dhabi/al-ain/fake/cleaning-services'), null);
  assert.equal(localSearchDimensions('/uae/dubai'), null);
});
