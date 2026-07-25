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

export async function getArabicAbuDhabiDirectoryCards() {
  try {
    const [activities, cards] = await Promise.all([
      fetchTaxonomyTable(
        'platform_main_activities?select=id,slug,name_ar,description_ar,image_url,display_order&is_active=eq.true&order=display_order.asc'
      ),
      fetchTaxonomyTable(
        'platform_directory_section_cards?select=id,activity_id,section_key,title_ar,description_ar,image_url,display_order&is_active=eq.true&order=display_order.asc'
      ),
    ]);

    const activityById = Object.fromEntries(activities.map((activity) => [activity.id, activity]));
    const normalized = cards
      .map((card) => {
        const activity = activityById[card.activity_id];
        if (!activity) return null;
        return {
          id: card.id,
          sectionKey: card.section_key,
          title: card.title_ar,
          description: card.description_ar,
          image: card.image_url || activity.image_url,
          displayOrder: card.display_order,
          activity: {
            slug: activity.slug,
            name: activity.name_ar,
            description: activity.description_ar,
          },
        };
      })
      .filter(Boolean);

    const sectionKeys = ['providers', 'services_offers', 'products_stores'];
    const isComplete =
      normalized.length === 21 &&
      sectionKeys.every(
        (sectionKey) => normalized.filter((card) => card.sectionKey === sectionKey).length === 7
      );

    if (!isComplete) {
      throw new Error(`Expected 21 active directory cards, received ${normalized.length}`);
    }

    return normalized;
  } catch (error) {
    console.error('Unable to load the Abu Dhabi constitutional directory cards:', error);
    return [];
  }
}
