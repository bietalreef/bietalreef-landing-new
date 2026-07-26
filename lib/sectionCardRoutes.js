const SECTION_ROUTE_MAPS = {
  providers: {
    'construction-contracting': 'general-contracting',
    'engineering-design': 'engineering-consultants',
    'maintenance-finishing': 'general-maintenance',
    'aluminium-glass-wood': 'aluminium-glass',
    'building-materials-supply': 'building-materials',
    'cleaning-operations-equipment': 'cleaning-services',
    'factories-workshops-stores': 'workshops',
  },
  services_offers: {
    'construction-contracting': 'general-contracting',
    'engineering-design': 'engineering-consultants',
    'maintenance-finishing': 'general-maintenance',
    'aluminium-glass-wood': 'carpentry',
    'building-materials-supply': 'building-materials',
    'cleaning-operations-equipment': 'cleaning-services',
    'factories-workshops-stores': 'workshops',
  },
  products_stores: {
    'aluminium-glass-wood': 'furniture-decor',
    'building-materials-supply': 'building-materials',
    'cleaning-operations-equipment': 'smart-systems',
    'factories-workshops-stores': 'finishing-works',
  },
};

const SECTION_ROOTS = {
  providers: 'providers/specialty',
  services_offers: 'services',
  products_stores: 'marketplace',
};

export function getSectionCardHref(card, sectionKey, locale = 'ar') {
  const activitySlug = card?.activity?.slug;
  const routeSlug = SECTION_ROUTE_MAPS[sectionKey]?.[activitySlug] || activitySlug;
  const sectionRoot =
    locale === 'en' && sectionKey === 'services_offers'
      ? 'categories'
      : SECTION_ROOTS[sectionKey];

  if (!routeSlug || !sectionRoot) return locale === 'en' ? '/en' : '/';

  return `${locale === 'en' ? '/en' : ''}/${sectionRoot}/${routeSlug}`;
}

export function getSectionActivitySlug(sectionKey, routeSlug) {
  const routeMap = SECTION_ROUTE_MAPS[sectionKey] || {};
  const match = Object.entries(routeMap).find(([, mappedSlug]) => mappedSlug === routeSlug);
  return match?.[0] || routeSlug;
}
