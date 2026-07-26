import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BadgeCheck, MapPin, MessageCircle } from 'lucide-react';
import { directoryProviders } from '../data/providers';
import { buildProviderWhatsappUrl } from '../lib/providerWhatsapp';

const emirateCities = {
  'abu-dhabi': ['abu-dhabi-city', 'al-ain'],
  dubai: ['dubai-city'],
  sharjah: ['sharjah-city'],
  ajman: ['ajman-city'],
  'umm-al-quwain': ['umm-al-quwain-city'],
  'ras-al-khaimah': ['ras-al-khaimah-city'],
  fujairah: ['fujairah-city'],
};

function providerLocations(provider) {
  return provider.locations?.length
    ? provider.locations
    : [{ emirate: provider.emirate, city: provider.city, area: provider.area, coverageType: provider.area ? 'area' : 'city' }];
}

function coversLocation(provider, emirateSlug, areaSlug) {
  const locations = providerLocations(provider).filter((location) => location.emirate === emirateSlug);
  if (!locations.length) return false;
  if (!areaSlug) return true;
  if (locations.some((location) => location.coverageType === 'emirate' || location.area === areaSlug || location.city === areaSlug)) return true;
  const coveredCities = new Set(locations.filter((location) => location.coverageType === 'city').map((location) => location.city));
  return (emirateCities[emirateSlug] || []).every((city) => coveredCities.has(city));
}

function matchesSector(provider, sectorSlug) {
  return provider.categorySlugs?.includes(sectorSlug) || provider.directoryServices?.some((item) => item.categorySlug === sectorSlug);
}

function locationLabel(provider, emirateSlug, locale) {
  const isEn = locale === 'en';
  const locations = providerLocations(provider).filter((location) => location.emirate === emirateSlug);
  return locations.map((location) => {
    if (location.area) return isEn ? location.areaEn || location.area : location.areaAr || location.area;
    return isEn ? location.cityEn || location.city : location.cityAr || location.city;
  }).filter(Boolean).join(isEn ? ' · ' : ' · ');
}

function primaryLocationLabel(provider, locale) {
  const isEn = locale === 'en';
  const location = providerLocations(provider).find((item) => item.isPrimary) || providerLocations(provider)[0];
  if (!location) return '';
  const place = isEn ? location.areaEn || location.cityEn || location.area || location.city : location.areaAr || location.cityAr || location.area || location.city;
  return place;
}

function DirectoryProviderCard({ provider, emirateSlug, locale }) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn || provider.nameAr : provider.nameAr;
  const href = `${isEn ? '/en' : ''}/providers/${provider.slug}`;
  const location = locationLabel(provider, emirateSlug, locale);
  const whatsapp = buildProviderWhatsappUrl({
    phone: provider.whatsapp,
    locale,
    providerName: name,
    providerCode: provider.providerId,
    location,
    summary: isEn ? provider.descriptionEn || provider.descriptionAr : provider.descriptionAr,
    profilePath: href,
  }) || href;
  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#E1D4BD] bg-white shadow-[0_16px_42px_rgba(15,63,26,.08)]">
      <div className="relative h-44 bg-[#F3EEE4]">
        <Image src={provider.cover || provider.logo} alt={name} fill className="object-cover" sizes="(max-width: 768px) 92vw, 560px" />
      </div>
      <div className="relative px-5 pb-5 pt-14">
        <div className={`absolute -top-11 ${isEn ? 'left-5' : 'right-5'} flex h-22 w-22 h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-lg`}>
          <Image src={provider.logo} alt={isEn ? `${name} logo` : `شعار ${name}`} fill className="object-contain p-1" sizes="88px" />
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black leading-8 text-[#0F3F1A]">{name}</h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-[#6B5530]"><MapPin className="h-4 w-4" />{isEn ? 'Provider location:' : 'موقع المزود:'} {primaryLocationLabel(provider, locale)}</p>
            <p className="mt-1 text-xs font-bold leading-6 text-gray-500">{isEn ? 'Service coverage:' : 'نطاق تقديم الخدمة:'} {locationLabel(provider, emirateSlug, locale)}</p>
          </div>
          {provider.verified ? <BadgeCheck className="h-6 w-6 shrink-0 text-[#B8860B]" aria-label={isEn ? 'Verified' : 'موثّق'} /> : null}
        </div>
        <p className="mt-4 rounded-xl bg-[#F8F4EB] px-3 py-2 font-mono text-xs font-black text-[#0F3F1A]" dir="ltr">{provider.providerId}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={href} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0F3F1A] px-3 text-sm font-black text-white">{isEn ? 'Open profile' : 'فتح الملف'}<ArrowLeft className={`h-4 w-4 ${isEn ? 'rotate-180' : ''}`} /></Link>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#DCCBAE] px-3 text-sm font-black text-[#0F3F1A]"><MessageCircle className="h-4 w-4" />{isEn ? 'Contact' : 'تواصل'}</a>
        </div>
      </div>
    </article>
  );
}

export default function UaeActivityProviders({ emirate, area = null, service, locale = 'ar' }) {
  const isEn = locale === 'en';
  const providers = directoryProviders.filter((provider) => coversLocation(provider, emirate.slug, area?.slug) && matchesSector(provider, service.slug));
  const locationName = area ? (isEn ? area.nameEn : area.nameAr) : (isEn ? emirate.nameEn : emirate.nameAr);
  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className={isEn ? 'mb-8 text-left' : 'mb-8 text-right'}>
        <span className="inline-flex rounded-full border border-[#DCCAA7] bg-[#FFF9EC] px-4 py-1.5 text-xs font-black text-[#8A611B]">{isEn ? 'Approved providers' : 'مزودون معتمدون'}</span>
        <h2 className="mt-4 text-3xl font-black text-[#0F3F1A]">{isEn ? `${service.nameEn} providers in ${locationName}` : `مزودو ${service.nameAr} في ${locationName}`}</h2>
      </div>
      {providers.length ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{providers.map((provider) => <DirectoryProviderCard key={provider.slug} provider={provider} emirateSlug={emirate.slug} locale={locale} />)}</div> : <div className="rounded-[2rem] border border-dashed border-[#D7C7A7] bg-white p-8 text-center text-sm font-bold leading-7 text-gray-600">{isEn ? 'Approved subscribed providers will appear here.' : 'ستظهر هنا ملفات مزودي الخدمة المشتركين بعد اعتمادها.'}</div>}
    </section>
  );
}
