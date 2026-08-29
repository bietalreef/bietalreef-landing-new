const SITE_URL = 'https://bietalreef.ae';
const LAST_SITE_UPDATE = '2026-08-29';

const emirates = ['abu-dhabi', 'dubai', 'sharjah', 'ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain'];
const serviceCategories = [
  'general-contracting',
  'engineering-consultants',
  'interior-design',
  'finishing-works',
  'general-maintenance',
  'building-materials',
  'furniture-decor',
  'carpentry',
  'electrical',
  'plumbing',
  'ac-technicians',
  'aluminium-glass',
  'marble-ceramic',
  'smart-systems',
  'landscaping',
  'cleaning-services',
  'equipment-rental',
  'transport-logistics',
];
const marketplaceCategories = ['building-materials', 'finishing-works', 'smart-systems', 'furniture-decor'];

const homeImages = [
  '/images/webp/bait-alreef-premiere-cover-smart-construction-platform.webp',
  '/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp',
  '/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp',
  '/images/webp/bait-alreef-why-biet-alreef-premium-comparison.webp',
];

const corePairs = [
  { ar: '/', en: '/en', priority: 1, changefreq: 'weekly', images: homeImages },
  { ar: '/uae', en: '/en/uae', priority: 0.95, changefreq: 'weekly', images: ['/images/uae-directory-hero.jpg'] },
  { ar: '/providers', en: '/en/providers', priority: 0.9, changefreq: 'weekly', images: ['/images/providers-hero.webp'] },
  { ar: '/services', en: '/en/services', priority: 0.9, changefreq: 'weekly', images: ['/images/gateway/services-offers-gateway.webp'] },
  { ar: '/marketplace', en: '/en/marketplace', priority: 0.85, changefreq: 'weekly', images: ['/images/gateway/materials-products-gateway.webp'] },
  { ar: '/how-it-works', en: '/en/how-it-works', priority: 0.9, changefreq: 'monthly', images: ['/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp', '/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp'] },
  { ar: '/why-biet-alreef', en: '/en/why-biet-alreef', priority: 0.82, changefreq: 'monthly', images: ['/images/webp/bait-alreef-why-biet-alreef-premium-comparison.webp'] },
  { ar: '/weyaak', en: '/en/weyaak', priority: 0.85, changefreq: 'weekly', images: ['/images/weyaak-new-logo.jpg'] },
  { ar: '/weyaak-ai', en: '/en/weyaak-ai', priority: 0.9, changefreq: 'weekly' },
  { ar: '/tools', en: '/en/tools', priority: 0.7, changefreq: 'monthly' },
  { ar: '/pricing', en: '/en/pricing', priority: 0.82, changefreq: 'weekly' },
  { ar: '/business-plans', en: '/en/business-plans', priority: 0.82, changefreq: 'weekly' },
  { ar: '/platform-for-business', en: '/en/platform-for-business', priority: 0.88, changefreq: 'weekly' },
  { ar: '/join-provider', en: '/en/join-provider', priority: 0.84, changefreq: 'weekly' },
  { ar: '/business-solutions', en: '/en/business-solutions', priority: 0.84, changefreq: 'weekly' },
  { ar: '/start-your-store', en: '/en/start-your-store', priority: 0.84, changefreq: 'weekly' },
  { ar: '/about', en: '/en/about', priority: 0.72, changefreq: 'monthly' },
  { ar: '/contact', en: '/en/contact', priority: 0.7, changefreq: 'monthly' },
  { ar: '/request-quote', en: '/en/request-quote', priority: 0.75, changefreq: 'weekly' },
  { ar: '/inquiry', en: '/en/service-inquiry', priority: 0.65, changefreq: 'weekly' },
  { ar: '/partners', en: '/en/partners', priority: 0.62, changefreq: 'monthly' },
  { ar: '/partner-with-biet-alreef', en: '/en/partner-with-biet-alreef', priority: 0.78, changefreq: 'monthly' },
  { ar: '/join-biet-alreef', en: '/en/join-biet-alreef', priority: 0.8, changefreq: 'weekly' },
  { ar: '/google-cloud-biet-alreef', en: '/en/google-cloud-biet-alreef', priority: 0.9, changefreq: 'weekly', images: ['/images/google-cloud-business-solutions.svg'] },
  { ar: '/google-workspace-biet-alreef', en: '/en/google-workspace-biet-alreef', priority: 0.9, changefreq: 'weekly', images: ['/images/google-workspace-business-tools.svg'] },
  { ar: '/suppliers-biet-alreef', en: '/en/suppliers-biet-alreef', priority: 0.76, changefreq: 'monthly' },
  { ar: '/factories-workshops-biet-alreef', en: '/en/factories-workshops-biet-alreef', priority: 0.76, changefreq: 'monthly' },
  { ar: '/suppliers', en: '/en/suppliers', priority: 0.6, changefreq: 'monthly' },
  { ar: '/factories', en: '/en/factories', priority: 0.6, changefreq: 'monthly' },
  { ar: '/customer-service', en: '/en/customer-service', priority: 0.55, changefreq: 'monthly' },
  { ar: '/blog', en: '/en/blog', priority: 0.72, changefreq: 'weekly' },
  { ar: '/faq', en: '/en/faq', priority: 0.6, changefreq: 'monthly' },
  { ar: '/support-policy', en: '/en/support-policy', priority: 0.45, changefreq: 'yearly' },
  { ar: '/privacy', en: '/en/privacy', priority: 0.35, changefreq: 'yearly' },
  { ar: '/legal', en: '/en/legal', priority: 0.35, changefreq: 'yearly' },
  { ar: '/cookies', en: '/en/cookies', priority: 0.35, changefreq: 'yearly' },
  { ar: '/refund-policy', en: '/en/refund-policy', priority: 0.4, changefreq: 'yearly' },
];

function absolute(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function pairEntries(pair) {
  const shared = {
    lastmod: LAST_SITE_UPDATE,
    changefreq: pair.changefreq || 'monthly',
    priority: pair.priority || 0.5,
    alternates: { ar: absolute(pair.ar), en: absolute(pair.en), default: absolute(pair.ar) },
    images: (pair.images || []).map(absolute),
  };
  return [
    { ...shared, path: pair.ar, loc: absolute(pair.ar), locale: 'ar-AE' },
    { ...shared, path: pair.en, loc: absolute(pair.en), locale: 'en-AE' },
  ];
}

function buildSearchIndexEntries() {
  const pairs = [
    ...corePairs,
    ...emirates.map((slug) => ({ ar: `/uae/${slug}`, en: `/en/uae/${slug}`, priority: 0.75, changefreq: 'monthly' })),
    ...serviceCategories.map((slug) => ({ ar: `/categories/${slug}`, en: `/en/categories/${slug}`, priority: 0.7, changefreq: 'monthly' })),
    ...marketplaceCategories.map((slug) => ({ ar: `/marketplace/${slug}`, en: `/en/marketplace/${slug}`, priority: 0.7, changefreq: 'monthly' })),
  ];
  return pairs.flatMap(pairEntries).sort((left, right) => left.loc.localeCompare(right.loc));
}

module.exports = {
  LAST_SITE_UPDATE,
  SITE_URL,
  buildSearchIndexEntries,
};
