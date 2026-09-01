import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { getSectionCardHref } from '../lib/sectionCardRoutes';

const COPY = {
  ar: {
    providers: {
      eyebrow: 'مزودو الخدمات',
      itemLabel: 'تخصص',
      summary: 'عرض باقي التخصصات',
      explore: 'استكشف المزودين',
    },
    services_offers: {
      eyebrow: 'خدمات وعروض',
      itemLabel: 'خدمة',
      summary: 'عرض باقي الخدمات',
      explore: 'استكشف الخدمات',
    },
    products_stores: {
      eyebrow: 'منتجات ومتاجر',
      itemLabel: 'قسم',
      summary: 'عرض باقي الأقسام',
      explore: 'استكشف المنتجات والمتاجر',
    },
  },
  en: {
    providers: {
      eyebrow: 'Service providers',
      itemLabel: 'Specialty',
      summary: 'Show more specialties',
      explore: 'Explore providers',
    },
    services_offers: {
      eyebrow: 'Services & offers',
      itemLabel: 'Service',
      summary: 'Show more services',
      explore: 'Explore services',
    },
    products_stores: {
      eyebrow: 'Products & stores',
      itemLabel: 'Category',
      summary: 'Show more categories',
      explore: 'Explore products & stores',
    },
  },
};

function getItems(card, sectionKey) {
  if (sectionKey === 'providers') return card.activity.specialties;
  if (sectionKey === 'services_offers') return card.activity.services;
  return card.activity.categories;
}

function ConstitutionalItem({ item, meta, compact = false, isEn = false }) {
  return (
    <li
      className={`flex items-center rounded-xl border border-[#E9D5A7] bg-gradient-to-b from-white to-[#FFF7E5] font-black text-[#5F4A00] shadow-[0_6px_0_#E8D7B3,0_10px_18px_rgba(111,87,0,0.10)] ${
        compact
          ? 'min-h-[26px] px-2 py-0.5 text-[9px] leading-4 sm:min-h-[30px] sm:px-3 sm:text-[11px] sm:leading-5'
          : 'min-h-[38px] px-3 py-1.5 text-[11px] leading-5'
      }`}
    >
      <span dir={isEn ? 'ltr' : 'rtl'}>{item.name}</span>
      <span className="sr-only">{meta.itemLabel}</span>
    </li>
  );
}

export default function ConstitutionalSectionCards({
  cards = [],
  sectionKey,
  locale = 'ar',
}) {
  const isEn = locale === 'en';
  const meta = COPY[locale][sectionKey];
  const compactProviders = sectionKey === 'providers';
  const Arrow = compactProviders ? ChevronLeft : isEn ? ChevronRight : ChevronLeft;
  const sectionCards = cards
    .filter((card) => card.sectionKey === sectionKey)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div
      dir={compactProviders ? 'rtl' : isEn ? 'ltr' : 'rtl'}
      className={`grid ${
        compactProviders
          ? 'grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5'
          : sectionKey === 'products_stores'
            ? 'grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'
            : 'grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {sectionCards.map((card) => {
        const items = getItems(card, sectionKey);
        const previewItems = items.slice(0, 4);
        const remainingItems = items.slice(previewItems.length);

        return (
          <article
            key={card.id}
            className={`group relative overflow-hidden border border-[#DCC895] bg-gradient-to-br from-white via-white to-[#FFF8E8] shadow-[0_10px_0_#E7DAC0,0_24px_55px_rgba(18,58,70,0.14)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_14px_0_#DCC895,0_32px_70px_rgba(18,58,70,0.20)] ${
              compactProviders ? 'rounded-[1.5rem] sm:rounded-[2rem]' : 'rounded-[2rem]'
            }`}
          >
            <div className={`relative overflow-hidden bg-[#F5EFE4] ${compactProviders ? 'h-28 sm:h-36' : 'h-48 sm:h-52'}`}>
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes={compactProviders
                  ? '(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw'
                  : sectionKey === 'products_stores'
                    ? '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className={`absolute left-2 right-2 flex justify-end sm:left-4 sm:right-4 ${compactProviders ? 'bottom-2' : 'bottom-4'}`}>
                <span
                  dir={isEn ? 'ltr' : 'rtl'}
                  className={`rounded-full border border-[#D4AF37]/45 bg-white/90 font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl ${
                    compactProviders
                      ? 'px-2 py-1 text-[9px] sm:px-3 sm:py-1.5 sm:text-[11px]'
                      : 'px-3 py-1.5 text-[11px]'
                  }`}
                >
                  {meta.eyebrow}
                </span>
              </div>
            </div>

            <div className={`${compactProviders ? 'p-2.5 sm:p-4' : 'p-5 md:p-6'} ${isEn ? 'text-left' : 'text-right'}`}>
              <h3
                dir={isEn ? 'ltr' : 'rtl'}
                className={`${compactProviders ? 'text-[15px] leading-5 sm:text-xl sm:leading-8' : 'text-xl leading-8'} font-black text-[#0F3F1A]`}
              >
                {card.title}
              </h3>
              <p
                dir={isEn ? 'ltr' : 'rtl'}
                className={`${
                  compactProviders
                    ? 'mt-1 min-h-[36px] text-[10px] leading-[18px] sm:mt-1.5 sm:min-h-[40px] sm:text-sm sm:leading-6'
                    : 'mt-3 min-h-[56px] text-sm leading-7'
                } font-semibold text-gray-600`}
              >
                {card.description}
              </p>
              <ul className={`${compactProviders ? 'mt-2 gap-1' : 'mt-4 gap-2'} grid grid-cols-1 sm:grid-cols-2`}>
                {previewItems.map((item) => (
                  <ConstitutionalItem
                    key={item.slug}
                    item={item}
                    meta={meta}
                    compact={compactProviders}
                    isEn={isEn}
                  />
                ))}
              </ul>
              {remainingItems.length > 0 && (
                <details className={`group/details rounded-2xl border border-[#D8C59F] bg-white/85 ${compactProviders ? 'mt-2 open:pb-1.5' : 'mt-4 open:pb-3'}`}>
                  <summary className={`flex cursor-pointer list-none items-center justify-center gap-1.5 px-2 font-black text-[#0F3F1A] marker:content-none ${compactProviders ? 'min-h-[30px] py-1 text-[10px] sm:min-h-[34px] sm:px-4 sm:text-xs' : 'min-h-[42px] px-4 py-2 text-xs'}`}>
                    <span dir={isEn ? 'ltr' : 'rtl'}>{meta.summary}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition group-open/details:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className={`${compactProviders ? 'gap-1 px-2' : 'gap-2 px-3'} grid grid-cols-1 sm:grid-cols-2`}>
                    {remainingItems.map((item) => (
                      <ConstitutionalItem
                        key={item.slug}
                        item={item}
                        meta={meta}
                        compact={compactProviders}
                        isEn={isEn}
                      />
                    ))}
                  </ul>
                </details>
              )}
              <Link
                href={getSectionCardHref(card, sectionKey, locale)}
                className={`${
                  compactProviders
                    ? 'mt-2.5 min-h-[36px] gap-1 px-2 py-1.5 text-[10px] sm:mt-3 sm:min-h-[40px] sm:gap-2 sm:px-5 sm:py-2 sm:text-sm'
                    : 'mt-5 min-h-[48px] gap-2 px-5 py-3 text-sm'
                } inline-flex w-full items-center justify-center rounded-2xl border border-[#B9922E] bg-gradient-to-b from-[#FFF2B8] to-[#EBC75B] font-black text-[#173F2A] shadow-[0_5px_0_#B9922E,0_10px_20px_rgba(185,146,46,0.22)] transition hover:-translate-y-0.5 hover:from-[#FFF7D1] hover:to-[#F4D47A]`}
              >
                <Search className={`${compactProviders ? 'h-3.5 w-3.5 sm:h-4 sm:w-4' : 'h-4 w-4'} shrink-0`} aria-hidden="true" />
                <span dir={isEn ? 'ltr' : 'rtl'}>{meta.explore}</span>
                <Arrow className={`${compactProviders ? 'h-3.5 w-3.5 sm:h-4 sm:w-4' : 'h-4 w-4'} shrink-0`} aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
