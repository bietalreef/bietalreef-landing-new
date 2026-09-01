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

function ConstitutionalItem({ item, meta, compact = false }) {
  return (
    <li className={`flex items-center rounded-xl border border-[#E9D5A7] bg-gradient-to-b from-white to-[#FFF7E5] px-3 text-[11px] font-black leading-5 text-[#5F4A00] shadow-[0_6px_0_#E8D7B3,0_10px_18px_rgba(111,87,0,0.10)] ${compact ? 'min-h-[34px] py-1' : 'min-h-[38px] py-1.5'}`}>
      <span>{item.name}</span>
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
  const Arrow = isEn ? ChevronRight : ChevronLeft;
  const compactProviders = sectionKey === 'providers';
  const sectionCards = cards
    .filter((card) => card.sectionKey === sectionKey)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className={`grid grid-cols-1 gap-5 ${
        sectionKey === 'products_stores'
          ? 'md:grid-cols-2 xl:grid-cols-4'
          : 'sm:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {sectionCards.map((card) => {
        const items = getItems(card, sectionKey);
        const previewItems = items.slice(0, 4);
        const remainingItems = items.slice(previewItems.length);

        return (
          <article
            key={card.id}
            className="group relative overflow-hidden rounded-[2rem] border border-[#DCC895] bg-gradient-to-br from-white via-white to-[#FFF8E8] shadow-[0_10px_0_#E7DAC0,0_24px_55px_rgba(18,58,70,0.14)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_14px_0_#DCC895,0_32px_70px_rgba(18,58,70,0.20)]"
          >
            <div className={`relative overflow-hidden bg-[#F5EFE4] ${compactProviders ? 'h-40 sm:h-44' : 'h-48 sm:h-52'}`}>
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes={sectionKey === 'products_stores'
                  ? '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className={`absolute left-4 right-4 flex justify-end ${compactProviders ? 'bottom-3' : 'bottom-4'}`}>
                <span className="rounded-full border border-[#D4AF37]/45 bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">
                  {meta.eyebrow}
                </span>
              </div>
            </div>

            <div className={`${compactProviders ? 'p-4 md:p-5' : 'p-5 md:p-6'} ${isEn ? 'text-left' : 'text-right'}`}>
              <h3 className="text-xl font-black leading-8 text-[#0F3F1A]">{card.title}</h3>
              <p className={`${compactProviders ? 'mt-2 min-h-[48px]' : 'mt-3 min-h-[56px]'} text-sm font-semibold leading-7 text-gray-600`}>
                {card.description}
              </p>
              <ul className={`${compactProviders ? 'mt-3 gap-1.5' : 'mt-4 gap-2'} grid grid-cols-1 sm:grid-cols-2`}>
                {previewItems.map((item) => (
                  <ConstitutionalItem key={item.slug} item={item} meta={meta} compact={compactProviders} />
                ))}
              </ul>
              {remainingItems.length > 0 && (
                <details className={`group/details rounded-2xl border border-[#D8C59F] bg-white/85 open:pb-3 ${compactProviders ? 'mt-3' : 'mt-4'}`}>
                  <summary className={`flex cursor-pointer list-none items-center justify-center gap-2 px-4 text-xs font-black text-[#0F3F1A] marker:content-none ${compactProviders ? 'min-h-[38px] py-1.5' : 'min-h-[42px] py-2'}`}>
                    {meta.summary}
                    <ChevronDown className="h-4 w-4 transition group-open/details:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className={`${compactProviders ? 'gap-1.5' : 'gap-2'} grid grid-cols-1 px-3 sm:grid-cols-2`}>
                    {remainingItems.map((item) => (
                      <ConstitutionalItem key={item.slug} item={item} meta={meta} compact={compactProviders} />
                    ))}
                  </ul>
                </details>
              )}
              <Link
                href={getSectionCardHref(card, sectionKey, locale)}
                className={`${compactProviders ? 'mt-4 min-h-[44px] py-2.5' : 'mt-5 min-h-[48px] py-3'} inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#B9922E] bg-gradient-to-b from-[#FFF2B8] to-[#EBC75B] px-5 text-sm font-black text-[#173F2A] shadow-[0_5px_0_#B9922E,0_10px_20px_rgba(185,146,46,0.22)] transition hover:-translate-y-0.5 hover:from-[#FFF7D1] hover:to-[#F4D47A]`}
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                {meta.explore}
                <Arrow className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
