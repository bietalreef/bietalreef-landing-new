import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { UAE_DIRECTORY_SECTIONS } from '../data/siteTaxonomy';
import { UAE_DIRECTORY_SECTION_SLUGS } from '../lib/platformDirectoryCards';

const UAE_SECTION_META = {
  providers: {
    title: 'الشركات والمؤسسات والحرفيون في {location}',
    description: 'اكتشف الشركات والمؤسسات والورش والحرفيين داخل {location}، واختر النشاط والتخصص المطلوب من القوائم المعتمدة في المنصة.',
    eyebrow: 'شركات ومؤسسات وحرفيون',
    itemLabel: 'تخصص',
    icon: '/images/ui-icons-3d/provider-worker.webp',
    summary: 'عرض باقي التخصصات',
    explore: 'استكشف الآن',
  },
  services_offers: {
    title: 'الخدمات والعروض في {location}',
    description: 'اختر بطاقة النشاط لعرض الخدمات المسجلة في قاعدة البيانات والمتاحة للطلب داخل {location}.',
    eyebrow: 'خدمات وعروض',
    itemLabel: 'خدمة',
    icon: '/images/ui-icons-3d/tools-maintenance.webp',
    summary: 'عرض باقي الخدمات',
    explore: 'استكشف الخدمات',
  },
  products_stores: {
    title: 'المنتجات والمتاجر في {location}',
    description: 'استعرض فئات المنتجات والمتاجر والمصانع والورش والموردين بحسب النشاط المعتمد داخل {location}.',
    eyebrow: 'المنتجات والمتاجر',
    itemLabel: 'قسم',
    icon: '/images/ui-icons-3d/products-box.webp',
    summary: 'عرض باقي الأقسام',
    explore: 'استكشف المنتجات والمتاجر',
  },
};

const UAE_SECTION_META_EN = {
  providers: {
    title: 'Companies, workshops and professionals in {location}',
    description: 'Explore trusted companies, workshops and professionals in {location}, then choose the activity and specialty that matches your project.',
    eyebrow: 'Providers',
    itemLabel: 'Specialty',
    icon: '/images/ui-icons-3d/provider-worker.webp',
    summary: 'Show more specialties',
    explore: 'Explore providers',
  },
  services_offers: {
    title: 'Services and offers in {location}',
    description: 'Choose an activity to explore requestable services and offers registered across {location}.',
    eyebrow: 'Services and offers',
    itemLabel: 'Service',
    icon: '/images/ui-icons-3d/tools-maintenance.webp',
    summary: 'Show more services',
    explore: 'Explore services',
  },
  products_stores: {
    title: 'Products and stores in {location}',
    description: 'Explore products, stores, factories, workshops and suppliers in {location} by approved commercial activity.',
    eyebrow: 'Products and stores',
    itemLabel: 'Category',
    icon: '/images/ui-icons-3d/products-box.webp',
    summary: 'Show more categories',
    explore: 'Explore products and stores',
  },
};

function providerCardTitle(activityName, locale = 'ar', locationName = 'أبوظبي') {
  if (locale === 'en') {
    return activityName === 'Construction & Contracting'
      ? `Best verified general construction contractors in ${locationName}`
      : `${activityName} companies and professionals in ${locationName}`;
  }
  if (activityName === 'المقاولات والبناء') {
    return `أفضل المقاولين الموثقين في المقاولات والإنشاءات العامة في ${locationName}`;
  }
  return `شركات ومؤسسات ${activityName} في ${locationName}`;
}

function cardItems(card, sectionKey) {
  if (sectionKey === 'services_offers') return card.activity.services;
  if (sectionKey === 'products_stores') return card.activity.categories;
  return card.activity.specialties;
}

function ConstitutionalItem({ item, meta }) {
  return (
    <li className="flex min-h-[38px] items-center gap-2 rounded-xl border border-[#E9D5A7] bg-gradient-to-b from-white to-[#FFF7E5] px-2.5 py-1.5 text-[11px] font-black leading-5 text-[#5F4A00] shadow-[0_6px_0_#E8D7B3,0_10px_18px_rgba(111,87,0,0.10)]">
      <span className="relative h-6 w-6 shrink-0" aria-hidden="true">
        <Image src={meta.icon} alt="" fill className="object-contain" sizes="24px" />
      </span>
      <span>{item.name}</span>
      <span className="sr-only">{meta.itemLabel}</span>
    </li>
  );
}

function EmirateDirectoryCards({ cards, emirate, locale = 'ar', area = null }) {
  const isEn = locale === 'en';
  const sectionMeta = isEn ? UAE_SECTION_META_EN : UAE_SECTION_META;
  const locationName = area
    ? (isEn ? area.nameEn : area.nameAr)
    : (isEn ? emirate.nameEn : emirate.nameAr);
  const routeRoot = `${isEn ? '/en' : ''}/uae/${emirate.slug}${area ? `/${area.slug}` : ''}`;
  const Arrow = isEn ? ChevronRight : ChevronLeft;
  return (
    <section dir={isEn ? 'ltr' : 'rtl'} id="uae-sector-cards" className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:py-18">
      {Object.entries(sectionMeta).map(([sectionKey, meta]) => {
        const sectionCards = cards
          .filter((card) => card.sectionKey === sectionKey)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        return <div key={sectionKey} id={`uae-${sectionKey}`}>
          <div className={`mb-8 text-center ${isEn ? 'md:text-left' : 'md:text-right'}`}>
            <h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">{meta.title.replace('{location}', locationName)}</h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:text-base">{meta.description.replace('{location}', locationName)}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectionCards.map((card) => {
              const items = cardItems(card, sectionKey);
              const previewItems = items.slice(0, 4);
              const remainingItems = items.slice(previewItems.length);
              const href = `${routeRoot}/directory/${UAE_DIRECTORY_SECTION_SLUGS[sectionKey]}/${card.activity.slug}`;

              return (
              <article id={`${emirate.slug}-${sectionKey}-${card.activity.slug}`} key={card.id} className="group relative overflow-hidden rounded-[2rem] border border-[#DCC895] bg-gradient-to-br from-white via-white to-[#FFF8E8] shadow-[0_10px_0_#E7DAC0,0_24px_55px_rgba(18,58,70,0.14)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_14px_0_#DCC895,0_32px_70px_rgba(18,58,70,0.20)]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                <div className="relative h-48 overflow-hidden bg-[#F5EFE4] sm:h-52">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-end">
                    <span className="rounded-full border border-[#D4AF37]/45 bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{meta.eyebrow}</span>
                  </div>
                </div>
                <div className={`p-5 md:p-6 ${isEn ? 'text-left' : 'text-right'}`}>
                  <h3 className="text-xl font-black leading-8 text-[#0F3F1A]">
                    {sectionKey === 'providers' ? providerCardTitle(card.activity.name, locale, locationName) : `${card.title} ${isEn ? 'in' : 'في'} ${locationName}`}
                  </h3>
                  <p className="mt-3 min-h-[56px] text-sm font-semibold leading-7 text-gray-600">{card.description}</p>
                  <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label={`${meta.itemLabel} ${card.activity.name}`}>
                    {previewItems.map((item) => <ConstitutionalItem key={item.slug} item={item} meta={meta} />)}
                  </ul>
                  {remainingItems.length > 0 && (
                    <details className="group/details mt-4 rounded-2xl border border-[#D8C59F] bg-white/85 open:pb-3">
                      <summary className="flex min-h-[42px] cursor-pointer list-none items-center justify-center gap-2 px-4 py-2 text-xs font-black text-[#0F3F1A] marker:content-none">
                        {meta.summary}
                        <ChevronDown aria-hidden="true" className="h-4 w-4 transition group-open/details:rotate-180" />
                      </summary>
                      <ul className="grid grid-cols-1 gap-2 px-3 sm:grid-cols-2">
                        {remainingItems.map((item) => <ConstitutionalItem key={item.slug} item={item} meta={meta} />)}
                      </ul>
                    </details>
                  )}
                  <Link href={href} aria-label={`${meta.explore}: ${card.activity.name} ${isEn ? 'in' : 'في'} ${locationName}`} className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-[#B9922E] bg-gradient-to-b from-[#FFF2B8] to-[#EBC75B] px-5 py-3 text-sm font-black text-[#173F2A] shadow-[0_5px_0_#B9922E,0_10px_20px_rgba(185,146,46,0.22)] transition hover:-translate-y-0.5 hover:from-[#FFF7D1] hover:to-[#F4D47A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/35">
                    <Search aria-hidden="true" className="h-4 w-4" />
                    {meta.explore}
                    <Arrow aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
              );
            })}
          </div>
        </div>;
      })}
    </section>
  );
}

export default function UaeDirectorySectorCards({ emirate, area = null, locale = 'ar', directoryCards = [] }) {
  const isEn = locale === 'en';
  const showConstitutionalDirectory = directoryCards.length === 18;

  if (showConstitutionalDirectory) {
    return <EmirateDirectoryCards cards={directoryCards} emirate={emirate} locale={locale} area={area} />;
  }

  const emirateName = isEn ? emirate.nameEn : emirate.nameAr;
  const areaName = area ? (isEn ? area.nameEn : area.nameAr) : null;
  const providerRoot = `${isEn ? '/en' : ''}/uae/${emirate.slug}${area ? `/${area.slug}` : ''}`;
  const locationQuery = `emirate=${encodeURIComponent(emirate.slug)}${area ? `&area=${encodeURIComponent(area.slug)}` : ''}`;
  const hrefFor = (card) => {
    if (card.routeKind === 'services') {
      if (isEn && card.slug === 'workshops') return `/en/services?category=workshops&${locationQuery}`;
      return isEn ? `/en/categories/${card.slug}?${locationQuery}` : `/services/${card.slug}?${locationQuery}`;
    }
    if (card.routeKind === 'products') return `${isEn ? '/en' : ''}/marketplace/${card.slug}?${locationQuery}`;
    return `${providerRoot}/${card.slug}`;
  };
  const Arrow = isEn ? ChevronRight : ChevronLeft;

  return (
    <section dir={isEn ? 'ltr' : 'rtl'} id="uae-sector-cards" className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:py-18">
      {UAE_DIRECTORY_SECTIONS.map((section) => <div key={section.key} id={`uae-${section.key}`}>
        <div className={isEn ? 'mb-8 text-center md:text-left' : 'mb-8 text-center md:text-right'}>
          <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">{isEn ? `${section.items.length} cards` : `${section.items.length} بطاقات`}</span>
          <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">{isEn ? `${section.titleEn} in ${areaName || emirateName}` : `${section.titleAr} في ${areaName || emirateName}`}</h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:text-base">{isEn ? section.descEn : section.descAr}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {section.items.map((card) => {
          const title = isEn ? card.directoryTitleEn : card.directoryTitleAr;
          const eyebrow = isEn ? card.eyebrowEn : card.eyebrowAr;
          const desc = isEn ? `${card.nameEn} services and providers available through the Biet Al Reef UAE Directory.` : card.descAr;
          const tags = card[isEn ? 'tagsEn' : 'tagsAr'];
          return <article key={card.slug} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]">
            <div className="relative h-48 overflow-hidden bg-[#F5EFE4] sm:h-52"><Image src={card.image} alt={title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" /><div className={`absolute bottom-4 left-4 right-4 flex ${isEn ? 'justify-start' : 'justify-end'}`}><span className="rounded-full border border-[#D4AF37]/45 bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{eyebrow}</span></div></div>
            <div className={`${isEn ? 'text-left' : 'text-right'} p-5 md:p-6`}><h3 className="text-xl font-black leading-8 text-[#0F3F1A]">{title}</h3><p className="mt-3 min-h-[76px] text-sm font-semibold leading-7 text-gray-600">{desc}</p><div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-[#FDF7E8] px-3 py-1 text-[11px] font-black text-[#8A6A00]">{tag}</span>)}</div><Link href={hrefFor(card)} aria-label={`${isEn ? 'Open' : 'فتح'} ${title}`} className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-[#D8C59F] bg-[#FFF9EC] px-5 py-3 text-sm font-black text-[#0F3F1A] transition hover:border-[#D4AF37] hover:bg-[#F4D47A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/35">{isEn ? 'Open section' : 'افتح القسم'}<Arrow aria-hidden="true" className="h-4 w-4" /></Link></div>
          </article>;
        })}
        </div>
      </div>)}
    </section>
  );
}
