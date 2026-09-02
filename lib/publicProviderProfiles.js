const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,119}$/i;

function normalizedLocations(locations) {
  return (Array.isArray(locations) ? locations : []).flatMap((location) => {
    const areas = Array.isArray(location?.areas) ? location.areas.filter(Boolean) : [];
    if (areas.length) {
      return areas.map((area) => ({
        emirate: location.emirate || '',
        cityAr: location.cityAr || location.city || '',
        cityEn: location.cityEn || location.city || '',
        areaAr: String(area),
        areaEn: String(area),
        allEmirate: Boolean(location.allEmirate),
      }));
    }
    return [{
      emirate: location?.emirate || '',
      cityAr: location?.cityAr || location?.city || location?.emirate || '',
      cityEn: location?.cityEn || location?.city || location?.emirate || '',
      areaAr: '',
      areaEn: '',
      allEmirate: Boolean(location?.allEmirate),
    }];
  });
}

function normalizedServices(provider, cover) {
  return (Array.isArray(provider.services) ? provider.services : [])
    .map((service, index) => {
      const source = service && typeof service === 'object' ? service : {};
      const titleAr = typeof service === 'string' ? service : source.titleAr || source.title_ar || source.nameAr || source.name_ar;
      const titleEn = source.titleEn || source.title_en || source.nameEn || source.name_en || titleAr;
      if (!titleAr && !titleEn) return null;
      return {
        cardId: source.cardId || source.card_id || `${provider.providerId || 'BR-PROV'}-SRV-${String(index + 1).padStart(3, '0')}`,
        titleAr: titleAr || titleEn,
        titleEn: titleEn || titleAr,
        descriptionAr: source.descriptionAr || source.description_ar || provider.descriptionAr || '',
        descriptionEn: source.descriptionEn || source.description_en || provider.descriptionEn || '',
        categorySlug: source.categorySlug || source.category_slug || provider.mainActivity || 'provider-service',
        image: source.image || source.image_url || cover,
      };
    })
    .filter(Boolean);
}

export async function getPublicProviderProfile(slug) {
  if (!SUPABASE_URL || !SUPABASE_KEY || !SLUG_PATTERN.test(String(slug || ''))) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_provider_profile`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_slug: slug }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Public provider request failed with ${response.status}`);

    const provider = await response.json();
    if (!provider?.slug) return null;

    const logo = provider.logo || '/logo.png';
    const cover = provider.cover || provider.logo || '/images/providers-hero.webp';
    const descriptionAr = provider.descriptionAr || provider.aboutAr || provider.taglineAr || provider.nameAr;
    const descriptionEn = provider.descriptionEn || provider.aboutEn || provider.taglineEn || provider.nameEn || descriptionAr;
    return {
      ...provider,
      nameAr: provider.nameAr || provider.nameEn,
      nameEn: provider.nameEn || provider.nameAr,
      descriptionAr,
      descriptionEn,
      logo,
      cover,
      locations: normalizedLocations(provider.locations),
      directoryServices: normalizedServices({ ...provider, descriptionAr, descriptionEn }, cover),
    };
  } catch (error) {
    console.error(`Unable to load public provider profile ${slug}:`, error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
