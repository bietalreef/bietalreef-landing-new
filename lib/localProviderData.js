import { fetchTaxonomyTable } from './platformDirectoryCards';
import { alrehabTemplate } from '../data/providerTemplates/alrehab';
import { AREAS, CITY, CATEGORY } from '../data/localServices';

// Adapter for the existing published provider entity. Coverage approved in the
// pilot execution brief; this is service coverage, never a branch/address.
// Future DB adapters must return this same relationship contract and fail closed.
export function getPilotProviderFixture() {
  const source = alrehabTemplate;
  return [{
    id: source.id, slug: source.slug, name: source.identity.name,
    phone: source.contact.phone, whatsapp: source.contact.whatsapp,
    image: source.media.logo, published: true, verified: source.identity.verified === true,
    visibility: { directory: true, requiresSubscription: false },
    subscription: { active: false }, // Never infer a paid entitlement from verification.
    placements: [],
    coverage: [{ emirate: CITY.emirate, city: CITY.slug, areas: AREAS.map(area => area.slug), approved: true, source: '2026-10-05 pilot brief' }],
    services: source.services.filter(service => service.slug !== 'pest-control').map(service => ({ ...service, category: CATEGORY.slug, published: true })),
  }];
}

async function loadLocalProviders() {
  // Read the same public relations used by the existing directory. Never use
  // service-role credentials or make database writes from a directory page.
  if (!process.env.SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const [profiles, accounts, rows, emirates, cities, areas, categories, membership, serviceRows, serviceDefinitions] = await Promise.all([
      fetchTaxonomyTable('provider_public_profiles?select=id,slug,name_ar,name_en,whatsapp,logo_url,verification_status,publication_status&publication_status=eq.published'),
      fetchTaxonomyTable('platform_provider_accounts?select=provider_public_profile_id,status'),
      fetchTaxonomyTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type&is_active=eq.true'),
      fetchTaxonomyTable('platform_emirates?select=id,slug&is_active=eq.true'),
      fetchTaxonomyTable('platform_cities?select=id,slug&is_active=eq.true'),
      fetchTaxonomyTable('platform_areas?select=id,slug&is_active=eq.true'),
      fetchTaxonomyTable('platform_categories?select=id,slug&is_active=eq.true'),
      fetchTaxonomyTable('provider_categories?select=provider_id,category_id'),
      fetchTaxonomyTable('provider_services?select=id,provider_id,service_id,title_ar,title_en,description_ar,description_en,image_url,public_card_code&is_published=eq.true'),
      fetchTaxonomyTable('platform_services?select=id,slug&is_active=eq.true'),
    ]);
    const accountStatus = Object.fromEntries(accounts.map(row => [row.provider_public_profile_id, row.status]));
    const lookup = records => Object.fromEntries(records.map(row => [row.id, row.slug]));
    const emirateById = lookup(emirates), cityById = lookup(cities), areaById = lookup(areas), categoryById = lookup(categories), serviceById = lookup(serviceDefinitions);
    return profiles.filter(row => (!accountStatus[row.id] || accountStatus[row.id] === 'active') && row.verification_status === 'verified').map(row => {
      const pilot = row.slug === alrehabTemplate.slug ? getPilotProviderFixture()[0] : null;
      const cleaning = membership.some(item => item.provider_id === row.id && categoryById[item.category_id] === CATEGORY.slug);
      const services = pilot ? pilot.services : cleaning ? serviceRows.filter(item => item.provider_id === row.id).map(item => ({
        id: item.public_card_code || item.id, slug: serviceById[item.service_id] || '',
        title: { ar: item.title_ar || item.title_en, en: item.title_en || item.title_ar },
        summary: { ar: item.description_ar || '', en: item.description_en || '' },
        category: CATEGORY.slug, published: true,
      })).filter(item => item.slug) : [];
      const coverage = rows.filter(item => item.provider_id === row.id).flatMap(item => {
        const broad = item.coverage_type === 'nationwide' || item.coverage_type === 'emirate' && emirateById[item.emirate_id] === CITY.emirate || cityById[item.city_id] === CITY.slug && !item.area_id;
        const district = areaById[item.area_id];
        if (!broad && !AREAS.some(area => area.slug === district)) return [];
        return [{ emirate: CITY.emirate, city: CITY.slug, areas: broad ? AREAS.map(area => area.slug) : [district], approved: true, source: 'provider_service_locations' }];
      });
      // Explicit pilot coverage is reviewed, but never bypasses publication,
      // mapped account status or verification checks above.
      return { id: row.id, slug: row.slug, name: { ar: row.name_ar || row.name_en, en: row.name_en || row.name_ar },
        mapsUrl: pilot ? 'https://share.google/IFGGGyVTMhwW0x8N6' : '', phone: row.whatsapp || '', whatsapp: row.whatsapp || '', image: pilot?.image || row.logo_url || '/logo.png',
        published: row.publication_status === 'published', verified: row.verification_status === 'verified',
        visibility: { directory: true, requiresSubscription: false }, subscription: { active: false }, placements: [],
        services, coverage: pilot ? pilot.coverage : coverage };
    });
  } catch (error) {
    console.error('Local directory public data unavailable:', error.message);
    throw new Error('Local directory data unavailable'); // Abort a build/revalidation rather than cache an incomplete page.
  }
}

let localProviderCache = null;
export async function getLocalProviders() {
  if (localProviderCache && localProviderCache.expiresAt > Date.now()) return localProviderCache.promise;
  const promise = loadLocalProviders();
  localProviderCache = { promise, expiresAt: Date.now() + 300000 };
  try { return await promise; } catch (error) {
    if (localProviderCache?.promise === promise) localProviderCache = null;
    throw error;
  }
}
