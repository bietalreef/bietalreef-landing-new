import Image from 'next/image';
import Link from 'next/link';
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { UAE_DIRECTORY_SECTIONS } from '../data/siteTaxonomy';
import { UAE_DIRECTORY_SECTION_SLUGS } from '../lib/platformDirectoryCards';

const UAE_SECTION_META = {
  providers: {
    title: 'الشركات والمؤسسات والحرفيون في {location}',
    description: 'اكتشف الشركات والمؤسسات والورش والحرفيين داخل {location}، واختر النشاط والتخصص المطلوب من القوائم المعتمدة في المنصة.',
    approvedLabel: 'شركات ومؤسسات وحرفيون معتمدون',
    verifiedLabel: 'موثق',
    qualityLabel: 'جودة',
    itemLabel: 'تخصص',
    moreLabel: '+{count} تخصصات أخرى',
    explore: 'استكشف الآن',
  },
  services_offers: {
    title: 'الخدمات والعروض في {location}',
    description: 'اختر بطاقة النشاط لعرض الخدمات المسجلة في قاعدة البيانات والمتاحة للطلب داخل {location}.',
    approvedLabel: 'خدمات وعروض معتمدة',
    verifiedLabel: 'موثق',
    qualityLabel: 'جودة',
    itemLabel: 'خدمة',
    moreLabel: '+{count} خدمات أخرى',
    explore: 'استكشف الخدمات',
  },
  products_stores: {
    title: 'المنتجات والمتاجر في {location}',
    description: 'استعرض فئات المنتجات والمتاجر والمصانع والورش والموردين بحسب النشاط المعتمد داخل {location}.',
    approvedLabel: 'منتجات ومتاجر معتمدة',
    verifiedLabel: 'موثق',
    qualityLabel: 'جودة',
    itemLabel: 'قسم',
    moreLabel: '+{count} أقسام أخرى',
    explore: 'استكشف المنتجات والمتاجر',
  },
};

const UAE_SECTION_META_EN = {
  providers: {
    title: 'Companies, workshops and professionals in {location}',
    description: 'Explore trusted companies, workshops and professionals in {location}, then choose the activity and specialty that matches your project.',
    approvedLabel: 'Approved companies & professionals',
    verifiedLabel: 'Verified',
    qualityLabel: 'Quality',
    itemLabel: 'Specialty',
    moreLabel: '+{count} more specialties',
    explore: 'Explore providers',
  },
  services_offers: {
    title: 'Services and offers in {location}',
    description: 'Choose an activity to explore requestable services and offers registered across {location}.',
    approvedLabel: 'Approved services & offers',
    verifiedLabel: 'Verified',
    qualityLabel: 'Quality',
    itemLabel: 'Service',
    moreLabel: '+{count} more services',
    explore: 'Explore services',
  },
  products_stores: {
    title: 'Products and stores in {location}',
    description: 'Explore products, stores, factories, workshops and suppliers in {location} by approved commercial activity.',
    approvedLabel: 'Approved products & stores',
    verifiedLabel: 'Verified',
    qualityLabel: 'Quality',
    itemLabel: 'Category',
    moreLabel: '+{count} more categories',
    explore: 'Explore products & stores',
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
  if (sectionKey === 'services_offers') return card.activity.services || [];
  if (sectionKey === 'products_stores') return card.activity.categories || [];
  return card.activity.specialties || [];
}

function TrustStrip({ meta, textDir = 'rtl' }) {
  return (
    <div dir="rtl" className="flex min-h-[34px] items-center justify-between gap-1.5 border-b border-[#EFE4D1] bg-[#FFFDF8] px-2 py-1.5 sm:px-3">
      <span dir={textDir} className="min-w-0 truncate text-[9px] font-black leading-4 text-[#0F3F1A] sm:text-[10px]">
        {meta.approvedLabel}
      </span>
      <span className="flex shrink-0 items-center gap-1 text-[#9A7415]" aria-label={`${meta.verifiedLabel} · ${meta.qualityLabel}`}>
        <span className="inline-flex items-center gap-0.5 text-[8px] font-black sm:text-[9px]">
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span dir={textDir} className="hidden sm:inline">{meta.verifiedLabel}</span>
        </span>
        <span className="inline-flex items-center gap-0.5 text-[8px] font-black sm:text-[9px]">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span dir={textDir} className="hidden sm:inline">{meta.qualityLabel}</span>
        </span>
      </span>
    </div>
  );
}

function TextItem({ item, textDir = 'rtl' }) {
  return (
    <li dir="rtl" className="flex items-start gap-1.5 border-b border-[#F1E8D8] py-1 text-[9px] font-bold leading-4 text-[#5C4A26] last:border-b-0 sm:text-[10px]">
      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[#B8922B]" aria-hidden="true" />
      <span dir={textDir} className="line-clamp-1">{item.name}</span>
    </li>
  );
}

function CompactDirectoryCard({ card, sectionKey, meta, href, locale, locationName, domId }) {
  const isEn = locale === 'en';
  const textDir = isEn ? 'ltr' : 'rtl';
  const items = cardItems(card, sectionKey);
  const previewItems = items.slice(0, 2);
  const remainingItems = items.slice(previewItems.length);
  const title = sectionKey === 'providers'
    ? providerCardTitle(card.activity.name, locale, locationName)
    : `${card.title} ${isEn ? 'in' : 'في'} ${locationName}`;

  return (
    <article
      dir="rtl"
      id={domId}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-[#E2D4B8] bg-white shadow-[0_8px_22px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-[0_14px_32px_rgba(18,58,70,0.13)] sm:rounded-[1.65rem]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EEE4]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <TrustStrip meta={meta} textDir={textDir} />

      <div className="flex flex-1 flex-col p-2.5 text-right sm:p-4">
        <h3 dir={textDir} className="line-clamp-3 min-h-[48px] text-[12px] font-black leading-[1.35rem] text-[#0F3F1A] sm:min-h-[52px] sm:text-sm sm:leading-6">
          {title}
        </h3>
        <p dir={textDir} className="mt-1.5 line-clamp-2 min-h-[32px] text-[9px] font-semibold leading-4 text-gray-500 sm:text-[10px] sm:leading-5">
          {card.description}
        </p>

        {previewItems.length > 0 ? (
          <ul className="mt-2" aria-label={`${meta.itemLabel} ${card.activity.name}`}>
            {previewItems.map((item) => <TextItem key={item.slug} item={item} textDir={textDir} />)}
          </ul>
        ) : null}

        {remainingItems.length > 0 ? (
          <details className="group/details mt-1.5">
            <summary dir="rtl" className="flex cursor-pointer list-none items-center gap-1 py-1 text-[9px] font-black text-[#8A6A00] marker:content-none sm:text-[10px]">
              <span dir={textDir}>{meta.moreLabel.replace('{count}', String(remainingItems.length))}</span>
              <ChevronDown className="h-3.5 w-3.5 transition group-open/details:rotate-180" aria-hidden="true" />
            </summary>
            <ul className="border-t border-[#F1E8D8] pt-1">
              {remainingItems.map((item) => <TextItem key={item.slug} item={item} textDir={textDir} />)}
            </ul>
          </details>
        ) : null}

        <Link
          href={href}
          aria-label={`${meta.explore}: ${card.activity.name} ${isEn ? 'in' : 'في'} ${locationName}`}
          className="mt-auto inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-[#F8D96F] to-[#E9BD3E] px-2 py-2 text-[10px] font-black text-[#173F2A] shadow-[0_3px_0_#B9922E] transition hover:-translate-y-0.5 hover:from-[#FDE89D] hover:to-[#F2CB55] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/30 sm:text-xs"
        >
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span dir={textDir} className="line-clamp-1">{meta.explore}</span>
          <ChevronLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function EmirateDirectoryCards({ cards, emirate, locale = 'ar', area = null }) {
  const isEn = locale === 'en';
  const textDir = isEn ? 'ltr' : 'rtl';
  const sectionMeta = isEn ? UAE_SECTION_META_EN : UAE_SECTION_META;
  const locationName = area
    ? (isEn ? area.nameEn : area.nameAr)
    : (isEn ? emirate.nameEn : emirate.nameAr);
  const routeRoot = `${isEn ? '/en' : ''}/uae/${emirate.slug}${area ? `/${area.slug}` : ''}`;

  return (
    <section dir="rtl" id="uae-sector-cards" className="mx-auto max-w-6xl space-y-12 px-3 py-10 sm:px-4 md:space-y-16 md:py-14">
      {Object.entries(sectionMeta).map(([sectionKey, meta]) => {
        const sectionCards = cards
          .filter((card) => card.sectionKey === sectionKey)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        return (
          <div key={sectionKey} id={`uae-${sectionKey}`}>
            <div className="mb-5 text-right md:mb-7">
              <h2 dir={textDir} className="text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">
                {meta.title.replace('{location}', locationName)}
              </h2>
              <p dir={textDir} className="mt-2 max-w-3xl text-xs font-semibold leading-6 text-gray-600 md:text-base md:leading-8">
                {meta.description.replace('{location}', locationName)}
              </p>
            </div>

            <div className="grid grid-cols-2 items-stretch gap-2.5 sm:gap-4 lg:grid-cols-3">
              {sectionCards.map((card) => {
                const href = `${routeRoot}/directory/${UAE_DIRECTORY_SECTION_SLUGS[sectionKey]}/${card.activity.slug}`;
                return (
                  <CompactDirectoryCard
                    key={card.id}
                    card={card}
                    sectionKey={sectionKey}
                    meta={meta}
                    href={href}
                    locale={locale}
                    locationName={locationName}
                    domId={`${emirate.slug}-${sectionKey}-${card.activity.slug}`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function fallbackMeta(section, isEn) {
  if (section.key === 'providers') return isEn ? UAE_SECTION_META_EN.providers : UAE_SECTION_META.providers;
  if (section.key === 'services') return isEn ? UAE_SECTION_META_EN.services_offers : UAE_SECTION_META.services_offers;
  return isEn ? UAE_SECTION_META_EN.products_stores : UAE_SECTION_META.products_stores;
}

export default function UaeDirectorySectorCards({ emirate, area = null, locale = 'ar', directoryCards = [] }) {
  const isEn = locale === 'en';
  const textDir = isEn ? 'ltr' : 'rtl';
  const showConstitutionalDirectory = directoryCards.length === 18;

  if (showConstitutionalDirectory) {
    return <EmirateDirectoryCards cards={directoryCards} emirate={emirate} locale={locale} area={area} />;
  }

  const emirateName = isEn ? emirate.nameEn : emirate.nameAr;
  const areaName = area ? (isEn ? area.nameEn : area.nameAr) : null;
  const locationName = areaName || emirateName;
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

  return (
    <section dir="rtl" id="uae-sector-cards" className="mx-auto max-w-6xl space-y-12 px-3 py-10 sm:px-4 md:space-y-16 md:py-14">
      {UAE_DIRECTORY_SECTIONS.map((section) => {
        const meta = fallbackMeta(section, isEn);
        return (
          <div key={section.key} id={`uae-${section.key}`}>
            <div className="mb-5 text-right md:mb-7">
              <h2 dir={textDir} className="text-2xl font-black text-[#0F3F1A] md:text-4xl">
                {isEn ? `${section.titleEn} in ${locationName}` : `${section.titleAr} في ${locationName}`}
              </h2>
              <p dir={textDir} className="mt-2 max-w-3xl text-xs font-semibold leading-6 text-gray-600 md:text-base md:leading-8">
                {isEn ? section.descEn : section.descAr}
              </p>
            </div>

            <div className="grid grid-cols-2 items-stretch gap-2.5 sm:gap-4 lg:grid-cols-3">
              {section.items.map((card) => {
                const title = isEn ? card.directoryTitleEn : card.directoryTitleAr;
                const desc = isEn
                  ? `${card.nameEn} services and providers available through the Biet Al Reef UAE Directory.`
                  : card.descAr;
                const tags = card[isEn ? 'tagsEn' : 'tagsAr'] || [];
                return (
                  <article dir="rtl" key={card.slug} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-[#E2D4B8] bg-white shadow-[0_8px_22px_rgba(18,58,70,0.08)] sm:rounded-[1.65rem]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EEE4]">
                      <Image src={card.image} alt={title} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                    <TrustStrip meta={meta} textDir={textDir} />
                    <div className="flex flex-1 flex-col p-2.5 text-right sm:p-4">
                      <h3 dir={textDir} className="line-clamp-3 min-h-[48px] text-[12px] font-black leading-[1.35rem] text-[#0F3F1A] sm:text-sm">{title}</h3>
                      <p dir={textDir} className="mt-1.5 line-clamp-2 min-h-[32px] text-[9px] font-semibold leading-4 text-gray-500 sm:text-[10px]">{desc}</p>
                      {tags.length ? (
                        <p dir={textDir} className="mt-2 line-clamp-2 min-h-[30px] text-[9px] font-bold leading-4 text-[#6B5530] sm:text-[10px]">
                          {tags.join(' · ')}
                        </p>
                      ) : null}
                      <Link href={hrefFor(card)} className="mt-auto inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-[#F8D96F] to-[#E9BD3E] px-2 py-2 text-[10px] font-black text-[#173F2A] shadow-[0_3px_0_#B9922E] sm:text-xs">
                        <Search className="h-3.5 w-3.5" aria-hidden="true" />
                        <span dir={textDir}>{isEn ? 'Open section' : 'افتح القسم'}</span>
                        <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
