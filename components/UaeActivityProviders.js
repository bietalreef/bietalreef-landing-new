import { ProviderCard } from './cards/SmartEntityCard';
import { directoryProviders } from '../data/providers';

const sectorCategories = {
  'general-contracting': ['general-contracting'],
  'engineering-consultants': ['engineering-consultants'],
  'interior-design': ['interior-design'],
  'finishing-works': ['finishing-works'],
  'building-materials': ['building-materials', 'marble-ceramic'],
  'general-maintenance': ['general-maintenance', 'finishing-works'],
  carpentry: ['carpentry', 'carpentry-woodwork'],
  'aluminium-glass': ['aluminium-glass'],
  'marble-ceramic': ['marble-ceramic'],
  'cleaning-services': ['cleaning-services', 'equipment-rental'],
};

function matchesSector(provider, sectorSlug) {
  const accepted = sectorCategories[sectorSlug] || [sectorSlug];
  return provider.categorySlugs?.some((slug) => accepted.includes(slug));
}

function toCard(provider, locale) {
  const isEn = locale === 'en';
  return {
    id: provider.slug,
    entityType: 'provider',
    premium: provider.slug === 'al-hoot-marble-granite-factory',
    name: isEn ? provider.nameEn || provider.nameAr : provider.nameAr,
    providerType: isEn ? provider.providerTypeEn || provider.providerTypeAr : provider.providerTypeAr,
    city: provider.city === 'al-ain' ? (isEn ? 'Al Ain' : 'العين') : provider.city,
    area: provider.area === 'mazid-company-camp' ? (isEn ? 'Mazid - Company Camp' : 'مزيد - معسكر الشركات') : provider.area,
    specialties: provider.services || [],
    verified: provider.verified,
    coverImage: provider.cover || provider.logo,
    logoImage: provider.logo,
    logoText: (isEn ? provider.nameEn : provider.nameAr)?.slice(0, 1),
    href: `${isEn ? '/en' : ''}/providers/${provider.slug}`,
    whatsapp: provider.whatsapp ? `https://wa.me/${String(provider.whatsapp).replace(/\D/g, '')}` : undefined,
    summary: isEn ? provider.descriptionEn || provider.descriptionAr : provider.descriptionAr,
  };
}

export default function UaeActivityProviders({ emirate, area = null, service, locale = 'ar' }) {
  const isEn = locale === 'en';
  const providers = directoryProviders.filter((provider) => {
    const matchesEmirate = provider.emirate === emirate.slug;
    const matchesArea = !area || provider.city === area.slug || provider.area === area.slug || provider.serviceAreas?.includes(area.slug);
    return matchesEmirate && matchesArea && matchesSector(provider, service.slug);
  });
  const locationName = area ? (isEn ? area.nameEn : area.nameAr) : (isEn ? emirate.nameEn : emirate.nameAr);

  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className={isEn ? 'mb-8 text-left' : 'mb-8 text-right'}>
        <span className="inline-flex rounded-full border border-[#DCCAA7] bg-[#FFF9EC] px-4 py-1.5 text-xs font-black text-[#8A611B]">{isEn ? 'Service providers' : 'مزودو الخدمة'}</span>
        <h2 className="mt-4 text-3xl font-black text-[#0F3F1A]">{isEn ? `${service.nameEn} providers in ${locationName}` : `مزودو ${service.nameAr} في ${locationName}`}</h2>
        <p className="mt-3 max-w-3xl font-semibold leading-8 text-gray-600">{isEn ? 'Open a provider profile to review services, products, projects and contact options.' : 'افتح بطاقة المزود لمراجعة الخدمات والمنتجات والمشاريع وطرق التواصل.'}</p>
      </div>
      {providers.length ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{providers.map((provider) => <ProviderCard key={provider.slug} item={toCard(provider, locale)} />)}</div> : <div className="rounded-[2rem] border border-dashed border-[#D7C7A7] bg-white p-8 text-center text-sm font-bold leading-7 text-gray-600">{isEn ? 'Subscribed provider profiles will appear here after their profiles are approved and published.' : 'ستظهر هنا بروفايلات مزودي الخدمة المشتركين بعد اعتماد ملفاتهم ونشرها.'}</div>}
    </section>
  );
}
