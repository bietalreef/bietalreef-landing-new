const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

async function fetchTaxonomyTable(path) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase public configuration is missing');
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase taxonomy request failed with ${response.status}`);
  }

  return response.json();
}

async function loadAbuDhabiDirectoryCards(locale = 'ar') {
  const isEn = locale === 'en';
  try {
    const [activities, cards, categoryMap, categories, specialties, services] = await Promise.all([
      fetchTaxonomyTable(
        'platform_main_activities?select=id,slug,name_ar,name_en,description_ar,description_en,image_url,display_order&is_active=eq.true&order=display_order.asc'
      ),
      fetchTaxonomyTable(
        'platform_directory_section_cards?select=id,activity_id,section_key,title_ar,title_en,description_ar,description_en,image_url,display_order&is_active=eq.true&order=display_order.asc'
      ),
      fetchTaxonomyTable('platform_category_activity_map?select=activity_id,category_id'),
      fetchTaxonomyTable(
        'platform_categories?select=id,slug,name_ar,name_en,display_order&is_active=eq.true&order=display_order.asc'
      ),
      fetchTaxonomyTable(
        'platform_specialties?select=id,category_id,slug,name_ar,name_en,display_order&is_active=eq.true&order=display_order.asc'
      ),
      fetchTaxonomyTable(
        'platform_services?select=id,specialty_id,slug,name_ar,name_en,display_order&is_active=eq.true&order=display_order.asc'
      ),
    ]);

    const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));
    const specialtiesByCategory = specialties.reduce((acc, specialty) => {
      (acc[specialty.category_id] ||= []).push(specialty);
      return acc;
    }, {});
    const servicesBySpecialty = services.reduce((acc, service) => {
      (acc[service.specialty_id] ||= []).push(service);
      return acc;
    }, {});
    const categoriesByActivity = categoryMap.reduce((acc, item) => {
      const category = categoryById[item.category_id];
      if (category) (acc[item.activity_id] ||= []).push(category);
      return acc;
    }, {});
    const activityById = Object.fromEntries(activities.map((activity) => [activity.id, activity]));
    const normalized = cards
      .map((card) => {
        const activity = activityById[card.activity_id];
        if (!activity) return null;
        const activityCategories = (categoriesByActivity[activity.id] || [])
          .sort((a, b) => a.display_order - b.display_order);
        const activitySpecialties = activityCategories.flatMap(
          (category) => specialtiesByCategory[category.id] || []
        );
        const activityServices = activitySpecialties.flatMap(
          (specialty) => servicesBySpecialty[specialty.id] || []
        );
        return {
          id: card.id,
          sectionKey: card.section_key,
          title: isEn ? card.title_en : card.title_ar,
          description: isEn ? card.description_en : card.description_ar,
          image: card.image_url || activity.image_url,
          displayOrder: card.display_order,
          activity: {
            id: activity.id,
            slug: activity.slug,
            name: isEn ? activity.name_en : activity.name_ar,
            description: isEn ? activity.description_en : activity.description_ar,
            categoryCount: activityCategories.length,
            specialtyCount: activitySpecialties.length,
            serviceCount: activityServices.length,
            categories: activityCategories.map((category) => ({
              id: category.id,
              slug: category.slug,
              name: isEn ? category.name_en : category.name_ar,
            })),
            specialties: activitySpecialties.map((specialty) => ({
              id: specialty.id,
              slug: specialty.slug,
              name: isEn ? specialty.name_en : specialty.name_ar,
            })),
            services: activityServices.map((service) => ({
              id: service.id,
              slug: service.slug,
              name: isEn ? service.name_en : service.name_ar,
            })),
          },
        };
      })
      .filter(Boolean);

    const expectedSectionCounts = {
      providers: 7,
      services_offers: 7,
      products_stores: 4,
    };
    const isComplete =
      normalized.length === 18 &&
      Object.entries(expectedSectionCounts).every(
        ([sectionKey, expectedCount]) =>
          normalized.filter((card) => card.sectionKey === sectionKey).length === expectedCount
      );

    if (!isComplete) {
      const actualCounts = Object.fromEntries(
        Object.keys(expectedSectionCounts).map((sectionKey) => [
          sectionKey,
          normalized.filter((card) => card.sectionKey === sectionKey).length,
        ])
      );
      throw new Error(
        `Expected Abu Dhabi directory cards 7/7/4, received ${JSON.stringify(actualCounts)}`
      );
    }

    return normalized;
  } catch (error) {
    console.error('Unable to load the Abu Dhabi constitutional directory cards:', error);
    return [];
  }
}

const directoryCardsCache = new Map();
const DIRECTORY_CACHE_TTL_MS = 5 * 60 * 1000;

export async function getAbuDhabiDirectoryCards(locale = 'ar') {
  const normalizedLocale = locale === 'en' ? 'en' : 'ar';
  const cached = directoryCardsCache.get(normalizedLocale);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;

  const promise = loadAbuDhabiDirectoryCards(normalizedLocale);
  directoryCardsCache.set(normalizedLocale, {
    promise,
    expiresAt: Date.now() + DIRECTORY_CACHE_TTL_MS,
  });
  return promise;
}

export async function getArabicAbuDhabiDirectoryCards() {
  return getAbuDhabiDirectoryCards('ar');
}

export async function getEnglishAbuDhabiDirectoryCards() {
  return getAbuDhabiDirectoryCards('en');
}

export async function getPublishedProviderCards(locale = 'ar') {
  const isEn = locale === 'en';
  const providerTypeLabels = {
    workshop: isEn ? 'Workshop' : 'ورشة',
    company: isEn ? 'Company' : 'شركة',
    factory: isEn ? 'Factory' : 'مصنع',
    supplier: isEn ? 'Supplier' : 'مورد',
    establishment: isEn ? 'Establishment' : 'مؤسسة',
    engineering_office: isEn ? 'Engineering office' : 'مكتب هندسي',
    individual: isEn ? 'Individual provider' : 'مزود فردي',
  };
  try {
    const [profiles, accounts, services, locations, cities, areas] = await Promise.all([
      fetchTaxonomyTable(
        'provider_public_profiles?select=id,slug,name_ar,name_en,provider_type,short_description_ar,short_description_en,whatsapp,logo_url,cover_image_url,verification_status,publication_status,platform_priority&publication_status=eq.published&order=platform_priority.desc'
      ),
      fetchTaxonomyTable(
        'platform_provider_accounts?select=provider_public_profile_id,provider_numeric_id,status&status=eq.active&order=provider_numeric_id.asc'
      ),
      fetchTaxonomyTable(
        'provider_services?select=provider_id,title_ar,title_en,display_order,is_published&is_published=eq.true&order=display_order.asc'
      ),
      fetchTaxonomyTable(
        'provider_service_locations?select=provider_id,city_id,area_id,is_primary,is_active&is_active=eq.true&order=is_primary.desc'
      ),
      fetchTaxonomyTable('platform_cities?select=id,name_ar,name_en&is_active=eq.true'),
      fetchTaxonomyTable('platform_areas?select=id,name_ar,name_en&is_active=eq.true'),
    ]);

    const accountByProvider = Object.fromEntries(
      accounts.map((account) => [account.provider_public_profile_id, account])
    );
    const cityById = Object.fromEntries(cities.map((city) => [city.id, city]));
    const areaById = Object.fromEntries(areas.map((area) => [area.id, area]));
    const servicesByProvider = services.reduce((acc, service) => {
      (acc[service.provider_id] ||= []).push(service);
      return acc;
    }, {});
    const locationsByProvider = locations.reduce((acc, location) => {
      (acc[location.provider_id] ||= []).push(location);
      return acc;
    }, {});

    return profiles
      .filter((profile) => accountByProvider[profile.id])
      .map((profile) => {
        const account = accountByProvider[profile.id];
        const primaryLocation =
          (locationsByProvider[profile.id] || []).find((location) => location.is_primary) ||
          (locationsByProvider[profile.id] || [])[0];
        const city = primaryLocation ? cityById[primaryLocation.city_id] : null;
        const area = primaryLocation ? areaById[primaryLocation.area_id] : null;
        const specialties = (servicesByProvider[profile.id] || [])
          .slice(0, 3)
          .map((service) => isEn ? service.title_en || service.title_ar : service.title_ar)
          .filter(Boolean);

        return {
          id: profile.id,
          entityType: 'provider',
          name: (isEn ? profile.name_en || profile.name_ar : profile.name_ar) || null,
          providerType: providerTypeLabels[profile.provider_type] || profile.provider_type || null,
          city: (isEn ? city?.name_en || city?.name_ar : city?.name_ar) || null,
          area: (isEn ? area?.name_en || area?.name_ar : area?.name_ar) || null,
          specialties,
          verified: profile.verification_status === 'verified',
          coverImage: profile.cover_image_url || profile.logo_url || null,
          logoImage: profile.logo_url || null,
          providerId: String(account.provider_numeric_id),
          href: `${isEn ? '/en' : ''}/providers/${profile.slug}`,
          whatsapp: profile.whatsapp
            ? `https://wa.me/${String(profile.whatsapp).replace(/\D/g, '')}`
            : null,
          summary: (isEn
            ? profile.short_description_en || profile.short_description_ar
            : profile.short_description_ar) || null,
        };
      });
  } catch (error) {
    console.error('Unable to load published provider cards from the platform database:', error);
    return [];
  }
}

export const ABU_DHABI_DIRECTORY_SECTION_SLUGS = {
  providers: 'providers',
  services_offers: 'services-offers',
  products_stores: 'products-stores',
};

export function findAbuDhabiDirectoryCard(cards, sectionSlug, activitySlug) {
  const sectionKey = Object.entries(ABU_DHABI_DIRECTORY_SECTION_SLUGS)
    .find(([, slug]) => slug === sectionSlug)?.[0];
  if (!sectionKey) return null;
  return cards.find(
    (card) => card.sectionKey === sectionKey && card.activity.slug === activitySlug
  ) || null;
}

function normalizeLocationRows(locations, emirates, cities, areas) {
  const emirateById = Object.fromEntries(emirates.map((item) => [item.id, item]));
  const cityById = Object.fromEntries(cities.map((item) => [item.id, item]));
  const areaById = Object.fromEntries(areas.map((item) => [item.id, item]));
  return locations.map((item) => ({
    providerId: item.provider_id,
    coverageType: item.coverage_type,
    emirateSlug: emirateById[item.emirate_id]?.slug || null,
    citySlug: cityById[item.city_id]?.slug || null,
    cityAr: cityById[item.city_id]?.name_ar || null,
    cityEn: cityById[item.city_id]?.name_en || null,
    areaSlug: areaById[item.area_id]?.slug || null,
    areaAr: areaById[item.area_id]?.name_ar || null,
    areaEn: areaById[item.area_id]?.name_en || null,
    isPrimary: item.is_primary,
  }));
}

function coversAbuDhabiLocation(rows, areaSlug) {
  const abuDhabiRows = rows.filter((item) => item.emirateSlug === 'abu-dhabi');
  if (!abuDhabiRows.length) return false;
  if (!areaSlug) return true;
  return abuDhabiRows.some((item) =>
    item.coverageType === 'emirate' ||
    item.citySlug === areaSlug ||
    item.areaSlug === areaSlug
  );
}

export async function getAbuDhabiDirectoryEntities(card, locale = 'ar', areaSlug = null) {
  if (!card?.activity) return [];
  const isEn = locale === 'en';
  try {
    const [
      profiles,
      providerCategories,
      providerSpecialties,
      providerServices,
      providerProducts,
      locations,
      emirates,
      cities,
      areas,
    ] = await Promise.all([
      fetchTaxonomyTable('provider_public_profiles?select=id,slug,name_ar,name_en,provider_type,short_description_ar,short_description_en,whatsapp,logo_url,cover_image_url,verification_status,public_provider_code,publication_status,platform_priority&publication_status=eq.published&order=platform_priority.desc'),
      fetchTaxonomyTable('provider_categories?select=provider_id,category_id,is_primary'),
      fetchTaxonomyTable('provider_specialties?select=provider_id,specialty_id,is_primary'),
      fetchTaxonomyTable('provider_services?select=id,provider_id,service_id,title_ar,title_en,description_ar,description_en,image_url,public_card_code,display_order,is_featured,is_published&is_published=eq.true&order=display_order.asc'),
      fetchTaxonomyTable('provider_products?select=id,provider_id,category_id,slug,name_ar,name_en,description_ar,description_en,image_url,price_visibility,display_order,is_featured,is_published&is_published=eq.true&order=display_order.asc'),
      fetchTaxonomyTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type,is_primary,is_active&is_active=eq.true'),
      fetchTaxonomyTable('platform_emirates?select=id,slug,name_ar,name_en&is_active=eq.true'),
      fetchTaxonomyTable('platform_cities?select=id,slug,name_ar,name_en&is_active=eq.true'),
      fetchTaxonomyTable('platform_areas?select=id,slug,name_ar,name_en&is_active=eq.true'),
    ]);

    const profileById = Object.fromEntries(profiles.map((item) => [item.id, item]));
    const normalizedLocations = normalizeLocationRows(locations, emirates, cities, areas);
    const locationsByProvider = normalizedLocations.reduce((acc, item) => {
      (acc[item.providerId] ||= []).push(item);
      return acc;
    }, {});
    const activityCategoryIds = new Set(card.activity.categories.map((item) => item.id));
    const activitySpecialtyIds = new Set(card.activity.specialties.map((item) => item.id));
    const activityServiceIds = new Set(card.activity.services.map((item) => item.id));
    const providerIdsByTaxonomy = new Set([
      ...providerCategories.filter((item) => activityCategoryIds.has(item.category_id)).map((item) => item.provider_id),
      ...providerSpecialties.filter((item) => activitySpecialtyIds.has(item.specialty_id)).map((item) => item.provider_id),
      ...providerServices.filter((item) => activityServiceIds.has(item.service_id)).map((item) => item.provider_id),
      ...providerProducts.filter((item) => activityCategoryIds.has(item.category_id)).map((item) => item.provider_id),
    ]);
    const availableProvider = (providerId) =>
      Boolean(profileById[providerId]) &&
      coversAbuDhabiLocation(locationsByProvider[providerId] || [], areaSlug);
    const locationText = (providerId) => {
      const rows = (locationsByProvider[providerId] || []).filter((item) => item.emirateSlug === 'abu-dhabi');
      return rows.map((item) => isEn
        ? item.areaEn || item.cityEn
        : item.areaAr || item.cityAr
      ).filter(Boolean).join(' · ');
    };
    const providerItem = (profile) => ({
      id: profile.id,
      entityType: 'provider',
      name: isEn ? profile.name_en : profile.name_ar,
      description: isEn ? profile.short_description_en : profile.short_description_ar,
      image: profile.cover_image_url || profile.logo_url,
      logo: profile.logo_url,
      verified: profile.verification_status === 'verified',
      code: profile.public_provider_code,
      location: locationText(profile.id),
      href: `${isEn ? '/en' : ''}/providers/${profile.slug}`,
      whatsapp: profile.whatsapp ? `https://wa.me/${String(profile.whatsapp).replace(/\D/g, '')}` : null,
      providerName: isEn ? profile.name_en : profile.name_ar,
    });

    if (card.sectionKey === 'providers') {
      return profiles
        .filter((profile) => providerIdsByTaxonomy.has(profile.id) && availableProvider(profile.id))
        .map(providerItem);
    }
    if (card.sectionKey === 'services_offers') {
      return providerServices
        .filter((item) => activityServiceIds.has(item.service_id) && availableProvider(item.provider_id))
        .map((item) => {
          const profile = profileById[item.provider_id];
          return {
            ...providerItem(profile),
            id: item.id,
            entityType: 'service',
            name: isEn ? item.title_en : item.title_ar,
            description: isEn ? item.description_en : item.description_ar,
            image: item.image_url || profile.cover_image_url || profile.logo_url,
            code: item.public_card_code,
          };
        });
    }
    return providerProducts
      .filter((item) => activityCategoryIds.has(item.category_id) && availableProvider(item.provider_id))
      .map((item) => {
        const profile = profileById[item.provider_id];
        return {
          ...providerItem(profile),
          id: item.id,
          entityType: 'product',
          name: isEn ? item.name_en : item.name_ar,
          description: isEn ? item.description_en : item.description_ar,
          image: item.image_url || profile.cover_image_url || profile.logo_url,
          href: `${isEn ? '/en' : ''}/providers/${profile.slug}`,
        };
      });
  } catch (error) {
    console.error('Unable to load published Abu Dhabi directory entities:', error);
    return [];
  }
}
