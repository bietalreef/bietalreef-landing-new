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
            slug: activity.slug,
            name: isEn ? activity.name_en : activity.name_ar,
            description: isEn ? activity.description_en : activity.description_ar,
            categoryCount: activityCategories.length,
            specialtyCount: activitySpecialties.length,
            serviceCount: activityServices.length,
            categories: activityCategories.map((category) => ({
              slug: category.slug,
              name: isEn ? category.name_en : category.name_ar,
            })),
            specialties: activitySpecialties.map((specialty) => ({
              slug: specialty.slug,
              name: isEn ? specialty.name_en : specialty.name_ar,
            })),
            services: activityServices.map((service) => ({
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
