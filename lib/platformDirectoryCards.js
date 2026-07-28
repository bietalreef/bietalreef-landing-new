import {
  buildCardWhatsappUrl,
  buildProviderWhatsappUrl,
} from './providerWhatsapp';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;
const TAXONOMY_CACHE_TTL_MS = 5 * 60 * 1000;
const taxonomyRequestCache = new Map();
const RETRYABLE_SUPABASE_STATUSES = new Set([429, 502, 503, 504]);

function waitForRetry(delayMs) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function fetchTaxonomyTable(path) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase public configuration is missing');
  }

  const cached = taxonomyRequestCache.get(path);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;

  const promise = (async () => {
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          signal: controller.signal,
        });

        if (response.ok) return response.json();
        lastError = new Error(`Supabase taxonomy request failed with ${response.status}`);
        if (!RETRYABLE_SUPABASE_STATUSES.has(response.status)) throw lastError;
      } catch (error) {
        lastError = error;
      } finally {
        clearTimeout(timeoutId);
      }

      if (attempt < 2) await waitForRetry(250 * (attempt + 1));
    }
    throw lastError || new Error('Supabase taxonomy request failed');
  })();

  taxonomyRequestCache.set(path, {
    promise,
    expiresAt: Date.now() + TAXONOMY_CACHE_TTL_MS,
  });

  try {
    return await promise;
  } catch (error) {
    if (taxonomyRequestCache.get(path)?.promise === promise) {
      taxonomyRequestCache.delete(path);
    }
    throw error;
  }
}

async function loadUaeDirectoryCards(locale = 'ar') {
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
        `Expected UAE directory cards 7/7/4, received ${JSON.stringify(actualCounts)}`
      );
    }

    return normalized;
  } catch (error) {
    console.error('Unable to load the UAE constitutional directory cards:', error);
    return [];
  }
}

const directoryCardsCache = new Map();
const DIRECTORY_CACHE_TTL_MS = 5 * 60 * 1000;

export async function getUaeDirectoryCards(locale = 'ar') {
  const normalizedLocale = locale === 'en' ? 'en' : 'ar';
  const cached = directoryCardsCache.get(normalizedLocale);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;

  const promise = loadUaeDirectoryCards(normalizedLocale);
  directoryCardsCache.set(normalizedLocale, {
    promise,
    expiresAt: Date.now() + DIRECTORY_CACHE_TTL_MS,
  });
  return promise;
}

export async function getArabicUaeDirectoryCards() {
  return getUaeDirectoryCards('ar');
}

export async function getEnglishUaeDirectoryCards() {
  return getUaeDirectoryCards('en');
}

export async function getUaeFooterCards(locale = 'ar') {
  const cards = await getUaeDirectoryCards(locale);
  return cards.map((card) => ({
    id: card.id,
    sectionKey: card.sectionKey,
    title: card.title,
    displayOrder: card.displayOrder,
    activity: {
      slug: card.activity.slug,
    },
  }));
}

export async function getUaeSectionCards(locale = 'ar', sectionKey) {
  const cards = await getUaeDirectoryCards(locale);
  const itemKey = sectionKey === 'providers'
    ? 'specialties'
    : sectionKey === 'services_offers'
      ? 'services'
      : 'categories';

  return cards
    .filter((card) => card.sectionKey === sectionKey)
    .map((card) => {
      const {
        categories,
        specialties,
        services,
        ...activitySummary
      } = card.activity;
      const items = { categories, specialties, services }[itemKey] || [];

      return {
        ...card,
        activity: {
          ...activitySummary,
          [itemKey]: items,
        },
      };
    });
}

// Backward-compatible names for the already indexed Abu Dhabi routes.
export async function getAbuDhabiDirectoryCards(locale = 'ar') {
  return getUaeDirectoryCards(locale);
}

export async function getArabicAbuDhabiDirectoryCards() {
  return getArabicUaeDirectoryCards();
}

export async function getEnglishAbuDhabiDirectoryCards() {
  return getEnglishUaeDirectoryCards();
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
        'provider_public_profiles?select=id,slug,name_ar,name_en,provider_type,short_description_ar,short_description_en,whatsapp,logo_url,cover_image_url,verification_status,publication_status,platform_priority,public_provider_code&publication_status=eq.published&order=platform_priority.desc'
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
        const name = (isEn ? profile.name_en || profile.name_ar : profile.name_ar) || null;
        const summary = (isEn
          ? profile.short_description_en || profile.short_description_ar
          : profile.short_description_ar) || null;
        const href = `${isEn ? '/en' : ''}/providers/${profile.slug}`;
        const location = [
          (isEn ? area?.name_en || area?.name_ar : area?.name_ar) || null,
          (isEn ? city?.name_en || city?.name_ar : city?.name_ar) || null,
        ].filter(Boolean).join(' · ');

        return {
          id: profile.id,
          entityType: 'provider',
          name,
          providerType: providerTypeLabels[profile.provider_type] || profile.provider_type || null,
          city: (isEn ? city?.name_en || city?.name_ar : city?.name_ar) || null,
          area: (isEn ? area?.name_en || area?.name_ar : area?.name_ar) || null,
          specialties,
          verified: profile.verification_status === 'verified',
          coverImage: profile.cover_image_url || profile.logo_url || null,
          logoImage: profile.logo_url || null,
          providerId: String(account.provider_numeric_id),
          href,
          whatsapp: buildProviderWhatsappUrl({
            phone: profile.whatsapp,
            locale,
            providerName: name,
            providerCode: profile.public_provider_code,
            providerNumericId: account.provider_numeric_id,
            location,
            summary,
            profilePath: href,
          }),
          summary,
        };
      });
  } catch (error) {
    console.error('Unable to load published provider cards from the platform database:', error);
    return [];
  }
}

export async function getPublishedSectionEntities(
  locale = 'ar',
  sectionKey = 'services_offers',
  activitySlug = null
) {
  const isEn = locale === 'en';
  const isProducts = sectionKey === 'products_stores';

  try {
    const targetCard = activitySlug
      ? (await getUaeDirectoryCards(locale)).find(
        (card) => card.sectionKey === sectionKey && card.activity.slug === activitySlug
      )
      : null;
    if (activitySlug && !targetCard) return [];

    const [
      profiles,
      accounts,
      services,
      products,
      platformServices,
      specialties,
      categories,
      locations,
      emirates,
      cities,
      areas,
    ] = await Promise.all([
      fetchTaxonomyTable(
        'provider_public_profiles?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,whatsapp,logo_url,cover_image_url,verification_status,publication_status,platform_priority,public_provider_code&publication_status=eq.published&order=platform_priority.desc'
      ),
      fetchTaxonomyTable(
        'platform_provider_accounts?select=provider_public_profile_id,provider_numeric_id,status&status=eq.active'
      ),
      fetchTaxonomyTable(
        'provider_services?select=id,provider_id,service_id,title_ar,title_en,description_ar,description_en,price_from,price_to,currency,pricing_model,duration_text_ar,duration_text_en,image_url,public_card_code,display_order,is_featured,is_published&is_published=eq.true&order=display_order.asc'
      ),
      fetchTaxonomyTable(
        'provider_products?select=id,provider_id,category_id,slug,name_ar,name_en,description_ar,description_en,sku,country_of_origin,specifications,price,currency,price_visibility,stock_status,image_url,display_order,is_featured,is_published&is_published=eq.true&order=display_order.asc'
      ),
      fetchTaxonomyTable(
        'platform_services?select=id,specialty_id,slug,name_ar,name_en&is_active=eq.true'
      ),
      fetchTaxonomyTable(
        'platform_specialties?select=id,category_id,slug,name_ar,name_en&is_active=eq.true'
      ),
      fetchTaxonomyTable(
        'platform_categories?select=id,slug,name_ar,name_en&is_active=eq.true'
      ),
      fetchTaxonomyTable(
        'provider_service_locations?select=provider_id,emirate_id,city_id,area_id,is_primary,is_active&is_active=eq.true&order=is_primary.desc'
      ),
      fetchTaxonomyTable('platform_emirates?select=id,name_ar,name_en&is_active=eq.true'),
      fetchTaxonomyTable('platform_cities?select=id,name_ar,name_en&is_active=eq.true'),
      fetchTaxonomyTable('platform_areas?select=id,name_ar,name_en&is_active=eq.true'),
    ]);

    const accountByProvider = Object.fromEntries(
      accounts.map((account) => [account.provider_public_profile_id, account])
    );
    const activeProviderIds = new Set(accounts.map((account) => account.provider_public_profile_id));
    const profileById = Object.fromEntries(
      profiles
        .filter((profile) => activeProviderIds.has(profile.id))
        .map((profile) => [profile.id, profile])
    );
    const serviceById = Object.fromEntries(platformServices.map((service) => [service.id, service]));
    const specialtyById = Object.fromEntries(specialties.map((specialty) => [specialty.id, specialty]));
    const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));
    const emirateById = Object.fromEntries(emirates.map((emirate) => [emirate.id, emirate]));
    const cityById = Object.fromEntries(cities.map((city) => [city.id, city]));
    const areaById = Object.fromEntries(areas.map((area) => [area.id, area]));
    const primaryLocationByProvider = {};

    locations.forEach((location) => {
      if (!primaryLocationByProvider[location.provider_id] || location.is_primary) {
        primaryLocationByProvider[location.provider_id] = location;
      }
    });

    const localizedName = (item) => (
      isEn ? item?.name_en || item?.name_ar : item?.name_ar || item?.name_en
    ) || null;
    const locationText = (providerId) => {
      const location = primaryLocationByProvider[providerId];
      if (!location) return isEn ? 'United Arab Emirates' : 'الإمارات العربية المتحدة';
      return [
        localizedName(areaById[location.area_id]),
        localizedName(cityById[location.city_id]),
        localizedName(emirateById[location.emirate_id]),
      ].filter(Boolean).filter((value, index, values) => values.indexOf(value) === index).join(' · ');
    };
    const providerDetails = (providerId) => {
      const profile = profileById[providerId];
      if (!profile) return null;
      return {
        providerPhone: profile.whatsapp,
        providerName: localizedName(profile),
        providerSlug: profile.slug,
        providerCode: profile.public_provider_code,
        providerNumericId: accountByProvider[providerId]?.provider_numeric_id || null,
        providerLogo: profile.logo_url || null,
        providerVerified: profile.verification_status === 'verified',
        providerHref: `${isEn ? '/en' : ''}/providers/${profile.slug}`,
        providerWhatsapp: buildProviderWhatsappUrl({
          phone: profile.whatsapp,
          locale,
          providerName: localizedName(profile),
          providerCode: profile.public_provider_code,
          providerNumericId: accountByProvider[providerId]?.provider_numeric_id,
          location: locationText(providerId),
          summary: isEn
            ? profile.short_description_en || profile.short_description_ar
            : profile.short_description_ar || profile.short_description_en,
          profilePath: `${isEn ? '/en' : ''}/providers/${profile.slug}`,
        }),
        providerSummary: isEn
          ? profile.short_description_en || profile.short_description_ar
          : profile.short_description_ar || profile.short_description_en,
        providerCover: profile.cover_image_url || profile.logo_url || null,
        providerPriority: Number(profile.platform_priority) || 0,
        location: locationText(providerId),
      };
    };
    const priceLabels = {
      fixed: isEn ? 'Published price' : 'سعر منشور',
      public: isEn ? 'Published price' : 'سعر منشور',
      starting_from: isEn ? 'Starting from' : 'يبدأ من',
      hidden: isEn ? 'Price on request' : 'السعر عند الطلب',
      request_quote: isEn ? 'Price on request' : 'السعر عند الطلب',
    };

    const entities = isProducts
      ? products.map((product) => {
        const provider = providerDetails(product.provider_id);
        if (!provider) return null;
        const category = categoryById[product.category_id];
        const name = localizedName(product);
        const description = isEn
          ? product.description_en || product.description_ar
          : product.description_ar || product.description_en;
        const priceValue = product.price ? Number(product.price) : null;
        const currency = product.currency || 'AED';
        const priceUnit = isEn
          ? product.specifications?.price_unit_en || product.specifications?.price_unit_ar
          : product.specifications?.price_unit_ar || product.specifications?.price_unit_en;
        const price = priceValue
          ? `${priceLabels[product.price_visibility] || priceLabels.public} ${priceValue.toLocaleString(isEn ? 'en-AE' : 'ar-AE')} ${currency}${priceUnit ? ` ${priceUnit}` : ''}`
          : priceLabels[product.price_visibility] || priceLabels.request_quote;
        const entity = {
          id: product.id,
          entityType: 'product',
          taxonomyCategoryId: product.category_id,
          locale: isEn ? 'en' : 'ar',
          name,
          description,
          summary: description,
          image: product.image_url || provider.providerCover,
          category: localizedName(category),
          code: product.sku,
          href: getProductPath(locale, provider.providerSlug, product.slug),
          productSlug: product.slug,
          price,
          priceValue,
          currency,
          priceUnit,
          unitCode: product.specifications?.unit_code || null,
          stockStatus: product.stock_status,
          priceType: product.price_visibility,
          priceLabel: priceLabels[product.price_visibility] || priceLabels.request_quote,
          featured: product.is_featured,
          displayOrder: product.display_order,
          ...provider,
        };
        entity.providerWhatsapp = buildCardWhatsappUrl({
          phone: provider.providerPhone,
          locale,
          cardType: 'product',
          providerName: provider.providerName,
          providerCode: provider.providerCode,
          providerNumericId: provider.providerNumericId,
          cardCode: product.sku,
          cardId: product.id,
          title: name,
          description,
          category: localizedName(category),
          price,
          pricingModel: product.price_visibility,
          specifications: product.specifications,
          stockStatus: product.stock_status,
          countryOfOrigin: product.country_of_origin,
          location: provider.location,
          pagePath: entity.href,
        });
        return entity;
      })
      : services.map((service) => {
        const provider = providerDetails(service.provider_id);
        if (!provider) return null;
        const taxonomyService = serviceById[service.service_id];
        const specialty = specialtyById[taxonomyService?.specialty_id];
        const category = categoryById[specialty?.category_id];
        const name = isEn ? service.title_en || service.title_ar : service.title_ar || service.title_en;
        const description = isEn
          ? service.description_en || service.description_ar
          : service.description_ar || service.description_en;
        const price = service.price_from || service.price_to
          ? `${service.price_from || ''}${service.price_to ? `–${service.price_to}` : ''} ${service.currency || 'AED'}`.trim()
          : priceLabels.request_quote;
        const entity = {
          id: service.id,
          entityType: 'service',
          taxonomyServiceId: service.service_id,
          taxonomySpecialtyId: taxonomyService?.specialty_id || null,
          taxonomyCategoryId: specialty?.category_id || null,
          locale: isEn ? 'en' : 'ar',
          name,
          description,
          image: service.image_url || provider.providerCover,
          category: localizedName(category),
          code: service.public_card_code,
          featured: service.is_featured,
          displayOrder: service.display_order,
          ...provider,
        };
        entity.providerWhatsapp = buildCardWhatsappUrl({
          phone: provider.providerPhone,
          locale,
          cardType: 'service',
          providerName: provider.providerName,
          providerCode: provider.providerCode,
          providerNumericId: provider.providerNumericId,
          cardCode: service.public_card_code,
          cardId: service.id,
          title: name,
          description,
          category: localizedName(category),
          price,
          pricingModel: service.pricing_model,
          duration: isEn
            ? service.duration_text_en || service.duration_text_ar
            : service.duration_text_ar || service.duration_text_en,
          location: provider.location,
          pagePath: provider.providerHref,
        });
        return entity;
      });

    const allowedCategoryIds = new Set(
      targetCard?.activity.categories.map((item) => item.id) || []
    );
    const allowedSpecialtyIds = new Set(
      targetCard?.activity.specialties.map((item) => item.id) || []
    );
    const allowedServiceIds = new Set(
      targetCard?.activity.services.map((item) => item.id) || []
    );

    return entities
      .filter((entity) => {
        if (!entity) return false;
        if (!targetCard) return true;
        if (isProducts) return allowedCategoryIds.has(entity.taxonomyCategoryId);
        return (
          allowedServiceIds.has(entity.taxonomyServiceId) ||
          allowedSpecialtyIds.has(entity.taxonomySpecialtyId) ||
          allowedCategoryIds.has(entity.taxonomyCategoryId)
        );
      })
      .sort((a, b) =>
        Number(b.featured) - Number(a.featured) ||
        b.providerPriority - a.providerPriority ||
        a.displayOrder - b.displayOrder
      )
      .map(({
        taxonomyServiceId,
        taxonomySpecialtyId,
        taxonomyCategoryId,
        providerPhone,
        providerCode,
        providerNumericId,
        ...entity
      }) => entity);
  } catch (error) {
    console.error(`Unable to load published ${sectionKey} entities:`, error);
    return [];
  }
}

export const UAE_DIRECTORY_SECTION_SLUGS = {
  providers: 'providers',
  services_offers: 'services-offers',
  products_stores: 'products-stores',
};

export const ABU_DHABI_DIRECTORY_SECTION_SLUGS = UAE_DIRECTORY_SECTION_SLUGS;

export function findUaeDirectoryCard(cards, sectionSlug, activitySlug) {
  const sectionKey = Object.entries(UAE_DIRECTORY_SECTION_SLUGS)
    .find(([, slug]) => slug === sectionSlug)?.[0];
  if (!sectionKey) return null;
  return cards.find(
    (card) => card.sectionKey === sectionKey && card.activity.slug === activitySlug
  ) || null;
}

export function findAbuDhabiDirectoryCard(cards, sectionSlug, activitySlug) {
  return findUaeDirectoryCard(cards, sectionSlug, activitySlug);
}

function normalizeLocationRows(locations, emirates, cities, areas) {
  const emirateById = Object.fromEntries(emirates.map((item) => [item.id, item]));
  const cityById = Object.fromEntries(cities.map((item) => [item.id, item]));
  const areaById = Object.fromEntries(areas.map((item) => [item.id, item]));
  return locations.map((item) => ({
    providerId: item.provider_id,
    coverageType: item.coverage_type,
    emirateSlug: emirateById[item.emirate_id]?.slug || null,
    emirateAr: emirateById[item.emirate_id]?.name_ar || null,
    emirateEn: emirateById[item.emirate_id]?.name_en || null,
    citySlug: cityById[item.city_id]?.slug || null,
    cityAr: cityById[item.city_id]?.name_ar || null,
    cityEn: cityById[item.city_id]?.name_en || null,
    areaSlug: areaById[item.area_id]?.slug || null,
    areaAr: areaById[item.area_id]?.name_ar || null,
    areaEn: areaById[item.area_id]?.name_en || null,
    isPrimary: item.is_primary,
  }));
}

function coversEmirateLocation(rows, emirateSlug, areaSlug) {
  if (!emirateSlug) return rows.length > 0;
  if (rows.some((item) => item.coverageType === 'nationwide')) return true;
  const emirateRows = rows.filter((item) => item.emirateSlug === emirateSlug);
  if (!emirateRows.length) return false;
  if (!areaSlug) return true;
  return emirateRows.some((item) =>
    item.coverageType === 'emirate' ||
    item.citySlug === areaSlug ||
    item.areaSlug === areaSlug
  );
}

function getProductPath(locale, providerSlug, productSlug) {
  return `${locale === 'en' ? '/en' : ''}/products/${providerSlug}/${productSlug}`;
}

function getSchemaAvailability(stockStatus) {
  const normalized = String(stockStatus || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (['out_of_stock', 'outofstock', 'unavailable'].includes(normalized)) {
    return 'https://schema.org/OutOfStock';
  }
  if (['pre_order', 'preorder'].includes(normalized)) {
    return 'https://schema.org/PreOrder';
  }
  if (['back_order', 'backorder'].includes(normalized)) {
    return 'https://schema.org/BackOrder';
  }
  return 'https://schema.org/InStock';
}

async function fetchPublishedProductRecords(locale = 'ar') {
  const isEn = locale === 'en';
  const [
    profiles,
    accounts,
    products,
    categories,
    locations,
    emirates,
    cities,
    areas,
  ] = await Promise.all([
    fetchTaxonomyTable(
      'provider_public_profiles?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,whatsapp,logo_url,cover_image_url,verification_status,public_provider_code,publication_status&publication_status=eq.published'
    ),
    fetchTaxonomyTable(
      'platform_provider_accounts?select=provider_public_profile_id,provider_numeric_id,status&status=eq.active'
    ),
    fetchTaxonomyTable(
      'provider_products?select=id,provider_id,category_id,slug,name_ar,name_en,description_ar,description_en,sku,country_of_origin,specifications,price,currency,price_visibility,stock_status,image_url,display_order,is_featured,is_published&is_published=eq.true&order=display_order.asc'
    ),
    fetchTaxonomyTable(
      'platform_categories?select=id,slug,name_ar,name_en&is_active=eq.true'
    ),
    fetchTaxonomyTable(
      'provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type,is_primary,is_active&is_active=eq.true'
    ),
    fetchTaxonomyTable(
      'platform_emirates?select=id,slug,name_ar,name_en&is_active=eq.true'
    ),
    fetchTaxonomyTable(
      'platform_cities?select=id,slug,name_ar,name_en&is_active=eq.true'
    ),
    fetchTaxonomyTable(
      'platform_areas?select=id,slug,name_ar,name_en&is_active=eq.true'
    ),
  ]);

  const accountByProvider = Object.fromEntries(
    accounts.map((item) => [item.provider_public_profile_id, item])
  );
  const profileById = Object.fromEntries(
    profiles
      .filter((item) => accountByProvider[item.id])
      .map((item) => [item.id, item])
  );
  const categoryById = Object.fromEntries(
    categories.map((item) => [item.id, item])
  );
  const normalizedLocations = normalizeLocationRows(locations, emirates, cities, areas);
  const locationsByProvider = normalizedLocations.reduce((acc, item) => {
    (acc[item.providerId] ||= []).push(item);
    return acc;
  }, {});

  return products.flatMap((item) => {
    const profile = profileById[item.provider_id];
    const category = categoryById[item.category_id];
    const providerLocations = locationsByProvider[item.provider_id] || [];
    if (!profile || !category || !providerLocations.length || !item.slug) return [];

    const providerName = isEn
      ? profile.name_en || profile.name_ar
      : profile.name_ar || profile.name_en;
    const name = isEn ? item.name_en || item.name_ar : item.name_ar || item.name_en;
    const description = isEn
      ? item.description_en || item.description_ar
      : item.description_ar || item.description_en;
    const categoryName = isEn
      ? category.name_en || category.name_ar
      : category.name_ar || category.name_en;
    const priceValue = item.price ? Number(item.price) : null;
    const currency = item.currency || 'AED';
    const priceUnit = isEn
      ? item.specifications?.price_unit_en || item.specifications?.price_unit_ar
      : item.specifications?.price_unit_ar || item.specifications?.price_unit_en;
    const href = getProductPath(locale, profile.slug, item.slug);
    const providerHref = `${isEn ? '/en' : ''}/providers/${profile.slug}`;
    const location = providerLocations.map((locationRow) => {
      if (locationRow.coverageType === 'nationwide') {
        return isEn ? 'UAE-wide' : 'جميع الإمارات';
      }
      return isEn
        ? locationRow.areaEn || locationRow.cityEn || locationRow.emirateEn
        : locationRow.areaAr || locationRow.cityAr || locationRow.emirateAr;
    }).filter(Boolean).join(' · ');
    const priceLabel = item.price_visibility === 'starting_from'
      ? (isEn ? 'Starting from' : 'يبدأ من')
      : (isEn ? 'Published price' : 'سعر منشور');
    const price = priceValue
      ? `${priceLabel} ${priceValue.toLocaleString(isEn ? 'en-AE' : 'ar-AE')} ${currency}${priceUnit ? ` ${priceUnit}` : ''}`
      : (isEn ? 'Price on request' : 'السعر عند الطلب');
    const providerNumericId = accountByProvider[item.provider_id]?.provider_numeric_id || null;

    return [{
      id: item.id,
      slug: item.slug,
      entityType: 'product',
      locale: isEn ? 'en' : 'ar',
      name,
      description,
      summary: description,
      image: item.image_url || profile.cover_image_url || profile.logo_url,
      href,
      alternateHref: getProductPath(isEn ? 'ar' : 'en', profile.slug, item.slug),
      providerHref,
      providerSlug: profile.slug,
      providerName,
      providerSummary: isEn
        ? profile.short_description_en || profile.short_description_ar
        : profile.short_description_ar || profile.short_description_en,
      providerCode: profile.public_provider_code,
      providerNumericId,
      providerPhone: profile.whatsapp,
      providerLogo: profile.logo_url,
      verified: profile.verification_status === 'verified',
      category: categoryName,
      categorySlug: category.slug,
      code: item.sku,
      sku: item.sku,
      countryOfOrigin: item.country_of_origin,
      specifications: item.specifications || {},
      price,
      priceValue,
      currency,
      priceUnit,
      unitCode: item.specifications?.unit_code || null,
      priceType: item.price_visibility,
      priceLabel: priceValue ? priceLabel : (isEn ? 'Price on request' : 'السعر عند الطلب'),
      stockStatus: item.stock_status,
      schemaAvailability: getSchemaAvailability(item.stock_status),
      location,
      whatsapp: buildCardWhatsappUrl({
        phone: profile.whatsapp,
        locale,
        cardType: 'product',
        providerName,
        providerCode: profile.public_provider_code,
        providerNumericId,
        cardCode: item.sku,
        cardId: item.id,
        title: name,
        description,
        price,
        pricingModel: item.price_visibility,
        specifications: item.specifications,
        stockStatus: item.stock_status,
        countryOfOrigin: item.country_of_origin,
        location,
        pagePath: href,
      }),
    }];
  });
}

const publishedProductRecordsCache = new Map();

async function loadPublishedProductRecords(locale = 'ar') {
  const normalizedLocale = locale === 'en' ? 'en' : 'ar';
  const cached = publishedProductRecordsCache.get(normalizedLocale);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;

  const promise = fetchPublishedProductRecords(normalizedLocale);
  publishedProductRecordsCache.set(normalizedLocale, {
    promise,
    expiresAt: Date.now() + TAXONOMY_CACHE_TTL_MS,
  });

  try {
    return await promise;
  } catch (error) {
    if (publishedProductRecordsCache.get(normalizedLocale)?.promise === promise) {
      publishedProductRecordsCache.delete(normalizedLocale);
    }
    throw error;
  }
}

export async function getPublishedProductByRoute(
  locale = 'ar',
  providerSlug,
  productSlug
) {
  try {
    const products = await loadPublishedProductRecords(locale);
    return products.find((item) =>
      item.providerSlug === providerSlug && item.slug === productSlug
    ) || null;
  } catch (error) {
    console.error(`Unable to load product ${providerSlug}/${productSlug}:`, error);
    return null;
  }
}

export async function getPublishedProductsForSitemap(locale = 'ar') {
  try {
    return await loadPublishedProductRecords(locale);
  } catch (error) {
    console.error('Unable to load products for sitemap:', error);
    return [];
  }
}

export async function getUaeDirectoryEntities(
  card,
  locale = 'ar',
  emirateSlug = 'abu-dhabi',
  areaSlug = null
) {
  if (!card?.activity) return [];
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
    const [
      profiles,
      accounts,
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
      fetchTaxonomyTable('platform_provider_accounts?select=provider_public_profile_id,provider_numeric_id,status&status=eq.active'),
      fetchTaxonomyTable('provider_categories?select=provider_id,category_id,is_primary'),
      fetchTaxonomyTable('provider_specialties?select=provider_id,specialty_id,is_primary'),
      fetchTaxonomyTable('provider_services?select=id,provider_id,service_id,title_ar,title_en,description_ar,description_en,price_from,price_to,currency,pricing_model,duration_text_ar,duration_text_en,image_url,public_card_code,display_order,is_featured,is_published&is_published=eq.true&order=display_order.asc'),
      fetchTaxonomyTable('provider_products?select=id,provider_id,category_id,slug,name_ar,name_en,description_ar,description_en,sku,country_of_origin,specifications,price,currency,price_visibility,stock_status,image_url,display_order,is_featured,is_published&is_published=eq.true&order=display_order.asc'),
      fetchTaxonomyTable('provider_service_locations?select=provider_id,emirate_id,city_id,area_id,coverage_type,is_primary,is_active&is_active=eq.true'),
      fetchTaxonomyTable('platform_emirates?select=id,slug,name_ar,name_en&is_active=eq.true'),
      fetchTaxonomyTable('platform_cities?select=id,slug,name_ar,name_en&is_active=eq.true'),
      fetchTaxonomyTable('platform_areas?select=id,slug,name_ar,name_en&is_active=eq.true'),
    ]);

    const accountByProvider = Object.fromEntries(
      accounts.map((item) => [item.provider_public_profile_id, item])
    );
    const activeProviderIds = new Set(accounts.map((item) => item.provider_public_profile_id));
    const profileById = Object.fromEntries(
      profiles
        .filter((item) => activeProviderIds.has(item.id))
        .map((item) => [item.id, item])
    );
    const normalizedLocations = normalizeLocationRows(locations, emirates, cities, areas);
    const locationsByProvider = normalizedLocations.reduce((acc, item) => {
      (acc[item.providerId] ||= []).push(item);
      return acc;
    }, {});
    const activityCategoryIds = new Set(card.activity.categories.map((item) => item.id));
    const activitySpecialtyIds = new Set(card.activity.specialties.map((item) => item.id));
    const activityServiceIds = new Set(card.activity.services.map((item) => item.id));
    const activitySpecialtyById = Object.fromEntries(
      card.activity.specialties.map((item) => [item.id, item])
    );
    const providerIdsByTaxonomy = new Set([
      ...providerCategories.filter((item) => activityCategoryIds.has(item.category_id)).map((item) => item.provider_id),
      ...providerSpecialties.filter((item) => activitySpecialtyIds.has(item.specialty_id)).map((item) => item.provider_id),
      ...providerServices.filter((item) => activityServiceIds.has(item.service_id)).map((item) => item.provider_id),
      ...providerProducts.filter((item) => activityCategoryIds.has(item.category_id)).map((item) => item.provider_id),
    ]);
    const availableProvider = (providerId) =>
      Boolean(profileById[providerId] && accountByProvider[providerId]) &&
      coversEmirateLocation(
        locationsByProvider[providerId] || [],
        emirateSlug,
        areaSlug
      );
    const locationText = (providerId) => {
      const rows = (locationsByProvider[providerId] || [])
        .filter((item) => !emirateSlug ||
          item.coverageType === 'nationwide' ||
          item.emirateSlug === emirateSlug
        );
      return rows.map((item) => isEn
        ? item.coverageType === 'nationwide'
          ? 'UAE-wide'
          : item.areaEn || item.cityEn || item.emirateEn
        : item.coverageType === 'nationwide'
          ? 'جميع الإمارات'
          : item.areaAr || item.cityAr || item.emirateAr
      ).filter(Boolean).join(' · ');
    };
    const providerItem = (profile) => {
      const providerName = isEn
        ? (profile.name_en || profile.name_ar)
        : (profile.name_ar || profile.name_en);
      const description = isEn
        ? (profile.short_description_en || profile.short_description_ar)
        : (profile.short_description_ar || profile.short_description_en);
      const href = `${isEn ? '/en' : ''}/providers/${profile.slug}`;
      const location = locationText(profile.id);
      const providerNumericId = accountByProvider[profile.id]?.provider_numeric_id || null;
      const providerLocations = locationsByProvider[profile.id] || [];
      const primaryLocation =
        providerLocations.find((item) => item.isPrimary) ||
        providerLocations[0] ||
        null;
      const serviceLabels = providerServices
        .filter((item) =>
          item.provider_id === profile.id &&
          activityServiceIds.has(item.service_id)
        )
        .map((item) => isEn ? item.title_en || item.title_ar : item.title_ar || item.title_en);
      const specialtyLabels = providerSpecialties
        .filter((item) =>
          item.provider_id === profile.id &&
          activitySpecialtyIds.has(item.specialty_id)
        )
        .map((item) => activitySpecialtyById[item.specialty_id]?.name)
        .filter(Boolean);
      const specialties = [...new Set([...serviceLabels, ...specialtyLabels])]
        .filter(Boolean)
        .slice(0, 3);
      const coverImage = profile.cover_image_url || profile.logo_url || null;
      const logoImage = profile.logo_url || null;
      const city = primaryLocation
        ? (isEn ? primaryLocation.cityEn || primaryLocation.cityAr : primaryLocation.cityAr || primaryLocation.cityEn)
        : null;
      const area = primaryLocation
        ? (isEn
          ? primaryLocation.areaEn || primaryLocation.areaAr || primaryLocation.emirateEn || primaryLocation.emirateAr
          : primaryLocation.areaAr || primaryLocation.areaEn || primaryLocation.emirateAr || primaryLocation.emirateEn)
        : null;
      return {
        id: profile.id,
        slug: profile.slug,
        entityType: 'provider',
        name: providerName,
        description,
        summary: description,
        providerType: providerTypeLabels[profile.provider_type] || profile.provider_type || null,
        city,
        area,
        specialties,
        image: coverImage,
        coverImage,
        logo: logoImage,
        logoImage,
        verified: profile.verification_status === 'verified',
        code: profile.public_provider_code,
        providerId: providerNumericId ? String(providerNumericId) : null,
        providerNumericId,
        providerPhone: profile.whatsapp,
        location,
        href,
        whatsapp: buildProviderWhatsappUrl({
          phone: profile.whatsapp,
          locale,
          providerName,
          providerCode: profile.public_provider_code,
          providerNumericId,
          location,
          summary: description,
          profilePath: href,
        }),
        providerName,
      };
    };

    if (card.sectionKey === 'providers') {
      const exactMatches = profiles
        .filter((profile) => providerIdsByTaxonomy.has(profile.id) && availableProvider(profile.id))
        .map((profile) => ({ ...providerItem(profile), matchType: 'exact' }));
      return exactMatches;
    }
    if (card.sectionKey === 'services_offers') {
      return providerServices
        .filter((item) => activityServiceIds.has(item.service_id) && availableProvider(item.provider_id))
        .map((item) => {
          const profile = profileById[item.provider_id];
          const provider = providerItem(profile);
          const name = isEn ? item.title_en : item.title_ar;
          const description = isEn ? item.description_en : item.description_ar;
          const price = item.price_from || item.price_to
            ? `${item.price_from || ''}${item.price_to ? `–${item.price_to}` : ''} ${item.currency || 'AED'}`.trim()
            : (isEn ? 'Price on request' : 'السعر عند الطلب');
          return {
            ...provider,
            id: item.id,
            entityType: 'service',
            name,
            description,
            image: item.image_url || profile.cover_image_url || profile.logo_url,
            code: item.public_card_code,
            whatsapp: buildCardWhatsappUrl({
              phone: provider.providerPhone,
              locale,
              cardType: 'service',
              providerName: provider.providerName,
              providerCode: profile.public_provider_code,
              providerNumericId: provider.providerNumericId,
              cardCode: item.public_card_code,
              cardId: item.id,
              title: name,
              description,
              price,
              pricingModel: item.pricing_model,
              duration: isEn
                ? item.duration_text_en || item.duration_text_ar
                : item.duration_text_ar || item.duration_text_en,
              location: provider.location,
              pagePath: provider.href,
            }),
          };
        });
    }
    return providerProducts
      .filter((item) => activityCategoryIds.has(item.category_id) && availableProvider(item.provider_id))
      .map((item) => {
        const profile = profileById[item.provider_id];
        const provider = providerItem(profile);
        const name = isEn ? item.name_en : item.name_ar;
        const description = isEn ? item.description_en : item.description_ar;
        const priceValue = item.price ? Number(item.price) : null;
        const currency = item.currency || 'AED';
        const priceUnit = isEn
          ? item.specifications?.price_unit_en || item.specifications?.price_unit_ar
          : item.specifications?.price_unit_ar || item.specifications?.price_unit_en;
        const priceLabel = item.price_visibility === 'starting_from'
          ? (isEn ? 'Starting from' : 'يبدأ من')
          : (isEn ? 'Published price' : 'سعر منشور');
        const price = priceValue
          ? `${priceLabel} ${priceValue.toLocaleString(isEn ? 'en-AE' : 'ar-AE')} ${currency}${priceUnit ? ` ${priceUnit}` : ''}`
          : (isEn ? 'Price on request' : 'السعر عند الطلب');
        const productHref = getProductPath(locale, profile.slug, item.slug);
        return {
          ...provider,
          id: item.id,
          entityType: 'product',
          locale: isEn ? 'en' : 'ar',
          name,
          description,
          summary: description,
          image: item.image_url || profile.cover_image_url || profile.logo_url,
          href: productHref,
          providerHref: provider.href,
          providerSlug: profile.slug,
          productSlug: item.slug,
          category: isEn ? card.activity.name_en : card.activity.name_ar,
          code: item.sku,
          price,
          priceValue,
          currency,
          priceUnit,
          unitCode: item.specifications?.unit_code || null,
          priceType: item.price_visibility,
          priceLabel: priceValue ? priceLabel : (isEn ? 'Price on request' : 'السعر عند الطلب'),
          stockStatus: item.stock_status,
          whatsapp: buildCardWhatsappUrl({
            phone: provider.providerPhone,
            locale,
            cardType: 'product',
            providerName: provider.providerName,
            providerCode: profile.public_provider_code,
            providerNumericId: provider.providerNumericId,
            cardCode: item.sku,
            cardId: item.id,
            title: name,
            description,
            price,
            pricingModel: item.price_visibility,
            specifications: item.specifications,
            stockStatus: item.stock_status,
            countryOfOrigin: item.country_of_origin,
            location: provider.location,
            pagePath: productHref,
          }),
        };
      });
  } catch (error) {
    console.error(`Unable to load published directory entities for ${emirateSlug}:`, error);
    return [];
  }
}

export async function getAbuDhabiDirectoryEntities(card, locale = 'ar', areaSlug = null) {
  return getUaeDirectoryEntities(card, locale, 'abu-dhabi', areaSlug);
}

const providerRouteCache = new Map();

async function buildProviderTaxonomyCard(locale, routeSlug) {
  const isEn = locale === 'en';
  const [categories, specialties, services] = await Promise.all([
    fetchTaxonomyTable(
      'platform_categories?select=id,slug,name_ar,name_en&is_active=eq.true'
    ),
    fetchTaxonomyTable(
      'platform_specialties?select=id,category_id,slug,name_ar,name_en&is_active=eq.true'
    ),
    fetchTaxonomyTable(
      'platform_services?select=id,specialty_id,slug,name_ar,name_en&is_active=eq.true'
    ),
  ]);

  const directCategories = categories.filter((item) => item.slug === routeSlug);
  const directSpecialties = specialties.filter((item) => item.slug === routeSlug);
  const directServices = services.filter((item) => item.slug === routeSlug);
  let matchedCategories = [];
  let matchedSpecialties = [];
  let matchedServices = [];

  if (directCategories.length) {
    const categoryIds = new Set(directCategories.map((item) => item.id));
    matchedCategories = directCategories;
    matchedSpecialties = specialties.filter((item) => categoryIds.has(item.category_id));
    const specialtyIds = new Set(matchedSpecialties.map((item) => item.id));
    matchedServices = services.filter((item) => specialtyIds.has(item.specialty_id));
  } else if (directSpecialties.length) {
    const specialtyIds = new Set(directSpecialties.map((item) => item.id));
    matchedSpecialties = directSpecialties;
    matchedServices = services.filter((item) => specialtyIds.has(item.specialty_id));
  } else {
    matchedServices = directServices;
  }

  if (!matchedCategories.length && !matchedSpecialties.length && !matchedServices.length) {
    return null;
  }

  const localizedName = (item) =>
    (isEn ? item.name_en || item.name_ar : item.name_ar || item.name_en) || null;

  return {
    id: `providers-${routeSlug}`,
    sectionKey: 'providers',
    activity: {
      slug: routeSlug,
      categories: matchedCategories.map((item) => ({
        id: item.id,
        slug: item.slug,
        name: localizedName(item),
      })),
      specialties: matchedSpecialties.map((item) => ({
        id: item.id,
        slug: item.slug,
        name: localizedName(item),
      })),
      services: matchedServices.map((item) => ({
        id: item.id,
        slug: item.slug,
        name: localizedName(item),
      })),
    },
  };
}

export async function getPublishedProvidersForRoute(
  locale = 'ar',
  routeSlug,
  activitySlug = routeSlug
) {
  const normalizedLocale = locale === 'en' ? 'en' : 'ar';
  const cacheKey = `${normalizedLocale}:${routeSlug}:${activitySlug}`;
  const cached = providerRouteCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;

  const promise = (async () => {
    try {
      const activityCards = (await getUaeDirectoryCards(normalizedLocale))
        .filter((card) => card.sectionKey === 'providers');
      const activityCard = activityCards.find(
        (card) => card.activity.slug === activitySlug
      );
      const targetCard =
        activityCard ||
        await buildProviderTaxonomyCard(normalizedLocale, routeSlug);
      if (!targetCard) return [];
      return getUaeDirectoryEntities(targetCard, normalizedLocale, null, null);
    } catch (error) {
      console.error(`Unable to load published providers for ${routeSlug}:`, error);
      return [];
    }
  })();

  providerRouteCache.set(cacheKey, {
    promise,
    expiresAt: Date.now() + DIRECTORY_CACHE_TTL_MS,
  });
  return promise;
}
