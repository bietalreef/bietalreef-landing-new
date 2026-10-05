import { normalizeUaePhone } from './localServices';
import { fetchTaxonomyTable } from './platformDirectoryCards';
import { alrehabTemplate } from '../data/providerTemplates/alrehab';
import { AREAS, CITY, CATEGORY, SERVICE_INTENTS } from '../data/localServices';

const readLocalTable = path => fetchTaxonomyTable(path, { timeoutMs: 20000 });
async function loadLocalProviders() {
  // Read the same public relations used by the existing directory. Never use
  // service-role credentials or make database writes from a directory page.
  if (!process.env.SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const [profiles, accounts, rows, emirates, cities, areas, categories, membership, serviceRows, serviceDefinitions] = await Promise.all([
      readLocalTable('provider_public_profiles?select=id,slug,name_ar,name_en,whatsapp,logo_url,verification_status,publication_status&publication_status=eq.published'),
      readLocalTable('platform_provider_accounts?select=provider_public_profile_id,status'),
      readLocalTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type&is_active=eq.true'),
      readLocalTable('platform_emirates?select=id,slug&is_active=eq.true'),
      readLocalTable('platform_cities?select=id,slug,emirate_id&is_active=eq.true'),
      readLocalTable('platform_areas?select=id,slug,city_id&is_active=eq.true'),
      readLocalTable('platform_categories?select=id,slug&is_active=eq.true'),
      readLocalTable('provider_categories?select=provider_id,category_id'),
      readLocalTable('provider_services?select=id,provider_id,service_id,title_ar,title_en,description_ar,description_en,image_url,public_card_code,updated_at&is_published=eq.true'),
      readLocalTable('platform_services?select=id,slug,category_id&is_active=eq.true'),
    ]);
    const accountStatus = Object.fromEntries(accounts.map(row => [row.provider_public_profile_id, row.status]));
    const lookup = records => Object.fromEntries(records.map(row => [row.id, row.slug]));
    const emirateById = lookup(emirates), cityById = lookup(cities), areaById = lookup(areas), categoryById = lookup(categories), serviceById = lookup(serviceDefinitions);
    return profiles.filter(row => (!accountStatus[row.id] || accountStatus[row.id] === 'active') && row.verification_status === 'verified').map(row => {
      const pilot = row.slug === alrehabTemplate.slug ? { phone: alrehabTemplate.contact.phone, whatsapp: alrehabTemplate.contact.whatsapp, image: alrehabTemplate.media.logo } : null;
      const cleaning = membership.some(item => item.provider_id === row.id && categoryById[item.category_id] === CATEGORY.slug);
      const services = cleaning ? serviceRows.filter(item => item.provider_id === row.id).flatMap(item => {
        const definition = serviceDefinitions.find(def => def.id === item.service_id);
        if (!definition || categoryById[definition.category_id] !== CATEGORY.slug) return [];
        const intent = SERVICE_INTENTS.find(entry => entry.sourceSlugs.includes(definition.slug));
        return [{ id: item.public_card_code || item.id, entityId: item.service_id, providerServiceId: item.id,
          sourceSlug: definition.slug, slug: intent?.slug || definition.slug,
          title: { ar: item.title_ar || item.title_en, en: item.title_en || item.title_ar },
          summary: { ar: item.description_ar || '', en: item.description_en || '' },
          image: item.image_url || '', category: CATEGORY.slug, published: true, provenance: 'provider_services', updatedAt: item.updated_at }];
      }) : [];
      const coverage = rows.filter(item => item.provider_id === row.id).flatMap(item => {
        const broad = item.coverage_type === 'nationwide' || item.coverage_type === 'emirate' && emirateById[item.emirate_id] === CITY.emirate || cityById[item.city_id] === CITY.slug && !item.area_id;
        const district = areaById[item.area_id];
        const areaCity = areas.find(area => area.id === item.area_id)?.city_id;
        if (!broad && (cityById[item.city_id || areaCity] !== CITY.slug || !AREAS.some(area => area.slug === district))) return [];
        return [{ emirate: CITY.emirate, city: CITY.slug, areas: broad ? AREAS.map(area => area.slug) : [district], approved: true, source: 'provider_service_locations' }];
      });
      // Brand artwork/contact fallback is reused; services and coverage are live relations.
      return { id: row.id, slug: row.slug, name: { ar: row.name_ar || row.name_en, en: row.name_en || row.name_ar },
        mapsUrl: pilot ? 'https://share.google/IFGGGyVTMhwW0x8N6' : '', phone: normalizeUaePhone(row.whatsapp) || pilot?.phone || '', whatsapp: normalizeUaePhone(row.whatsapp) || pilot?.whatsapp || '', image: pilot?.image || row.logo_url || '/logo.png',
        published: row.publication_status === 'published', verified: row.verification_status === 'verified',
        visibility: { directory: true, requiresSubscription: false }, subscription: { active: false }, placements: [],
        services, coverage };
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
