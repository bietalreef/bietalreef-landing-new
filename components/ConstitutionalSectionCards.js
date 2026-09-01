import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, Search } from 'lucide-react';
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

function ConstitutionalItem({ item, meta, isEn = false }) {
  return (
    <li className="flex min-h-[26px] items-center rounded-xl border border-[#E9D5A7] bg-gradient-to-b from-white to-[#FFF7E5] px-2 py-0.5 text-[9px] font-black leading-4 text-[#5F4A00] shadow-[0_6px_0_#E8D7B3,0_10px_18px_rgba(111,87,0,0.10)] sm:min-h-[30px] sm:px-3 sm:text-[11px] sm:leading-5">
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
  const sectionCards = cards
    .filter((card) => card.sectionKey === sectionKey)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div
      dir="rtl"
      className={`grid grid-cols-2 gap-3 sm:gap-4 ${
        sectionKey === 'products_stores'
          ? 'lg:grid-cols-4 lg:gap-5'
          : 'lg:grid-cols-3 lg:gap-5'
      }`}
    >
      {sectionCards.map((card) => {
        const items = getItems(card, sectionKey);
        const previewItems = items.slice(0, 4);
        const remainingItems = items.slice(previewItems.length);

        return (
          <article
            key={card.id}
            className="group relative overflow-hidden rounded-[1.5rem] border border-[#DCC895] bg-gradient-to-br from-white via-white to-[#FFF8E8] shadow-[0_10px_0_#E7DAC0,0_24px_55px_rgba(18,58,70,0.14)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_14px_0_#DCC895,0_32px_70px_rgba(18,58,70,0.20)] sm:rounded-[2rem]"
          >
            <div className="relative h-28 overflow-hidden bg-[#F5EFE4] sm:h-36">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes={sectionKey === 'products_stores'
                  ? '(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw'
                  : '(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex justify-end sm:left-4 sm:right-4">
                <span
                  dir={isEn ? 'ltr' : 'rtl'}
                  className="rounded-full border border-[#D4AF37]/45 bg-white/90 px-2 py-1 text-[9px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl sm:px-3 sm:py-1.5 sm:text-[11px]"
                >
                  {meta.eyebrow}
                </span>
              </div>
            </div>

            <div className={`p-2.5 sm:p-4 ${isEn ? 'text-left' : 'text-right'}`}>
              <h3
                dir={isEn ? 'ltr' : 'rtl'}
                className="text-[15px] font-black leading-5 text-[#0F3F1A] sm:text-xl sm:leading-8"
              >
                {card.title}
              </h3>
              <p
                dir={isEn ? 'ltr' : 'rtl'}
                className="mt-1 min-h-[36px] text-[10px] font-semibold leading-[18px] text-gray-600 sm:mt-1.5 sm:min-h-[40px] sm:text-sm sm:leading-6"
              >
                {card.description}
              </p>
              <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {previewItems.map((item) => (
                  <ConstitutionalItem
                    key={item.slug}
                    item={item}
                    meta={meta}
                    isEn={isEn}
                  />
                ))}
              </ul>
              {remainingItems.length > 0 && (
                <details className="group/details mt-2 rounded-2xl border border-[#D8C59F] bg-white/85 open:pb-1.5">
                  <summary className="flex min-h-[30px] cursor-pointer list-none items-center justify-center gap-1.5 px-2 py-1 text-[10px] font-black text-[#0F3F1A] marker:content-none sm:min-h-[34px] sm:px-4 sm:text-xs">
                    <span dir={isEn ? 'ltr' : 'rtl'}>{meta.summary}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition group-open/details:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="grid grid-cols-1 gap-1 px-2 sm:grid-cols-2">
                    {remainingItems.map((item) => (
                      <ConstitutionalItem
                        key={item.slug}
                        item={item}
                        meta={meta}
                        isEn={isEn}
                      />
                    ))}
                  </ul>
                </details>
              )}
              <Link
                href={getSectionCardHref(card, sectionKey, locale)}
                className="mt-2.5 inline-flex min-h-[36px] w-full items-center justify-center gap-1 rounded-2xl border border-[#B9922E] bg-gradient-to-b from-[#FFF2B8] to-[#EBC75B] px-2 py-1.5 text-[10px] font-black text-[#173F2A] shadow-[0_5px_0_#B9922E,0_10px_20px_rgba(185,146,46,0.22)] transition hover:-translate-y-0.5 hover:from-[#FFF7D1] hover:to-[#F4D47A] sm:mt-3 sm:min-h-[40px] sm:gap-2 sm:px-5 sm:py-2 sm:text-sm"
              >
                <Search className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
                <span dir={isEn ? 'ltr' : 'rtl'}>{meta.explore}</span>
                <ChevronLeft className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
