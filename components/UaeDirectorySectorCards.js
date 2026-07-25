import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UAE_DIRECTORY_SECTIONS } from '../data/siteTaxonomy';

const ABU_DHABI_SECTION_META = {
  providers: {
    title: 'الشركات والمؤسسات والحرفيون في أبوظبي',
    description: 'اكتشف الشركات والمؤسسات والورش والحرفيين في أبوظبي حسب النشاط والتصنيف والتخصص والخدمة المطلوبة.',
    eyebrow: 'شركات ومؤسسات وحرفيون',
    button: 'اكتشف الشركات والمؤسسات',
  },
  services_offers: {
    title: 'الخدمات والعروض في أبوظبي',
    description: 'اختر النشاط الرئيسي للوصول بالتدرج إلى التخصص والخدمة، ثم استعرض بطاقات الخدمات والعروض المنشورة داخل أبوظبي.',
    eyebrow: 'الخدمات والعروض',
    button: 'عرض الخدمات والعروض',
  },
  products_stores: {
    title: 'المنتجات والمتاجر في أبوظبي',
    description: 'اختر النشاط الرئيسي للوصول إلى المنتجات والمتاجر والمصانع والورش والموردين الذين يخدمون إمارة أبوظبي.',
    eyebrow: 'المنتجات والمتاجر',
    button: 'عرض المنتجات والمتاجر',
  },
};

function providerCardTitle(activityName) {
  return `شركات ومؤسسات ${activityName} في أبوظبي`;
}

function AbuDhabiConstitutionalCards({ cards }) {
  return (
    <section dir="rtl" id="uae-sector-cards" className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:py-18">
      {Object.entries(ABU_DHABI_SECTION_META).map(([sectionKey, meta]) => {
        const sectionCards = cards
          .filter((card) => card.sectionKey === sectionKey)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        return <div key={sectionKey} id={`uae-${sectionKey}`}>
          <div className="mb-8 text-center md:text-right">
            <h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">{meta.title}</h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:text-base">{meta.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectionCards.map((card) => (
              <article key={card.id} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]">
                <div className="relative h-48 overflow-hidden bg-[#F5EFE4] sm:h-52">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-end">
                    <span className="rounded-full border border-[#D4AF37]/45 bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{meta.eyebrow}</span>
                  </div>
                </div>
                <div className="p-5 text-right md:p-6">
                  <h3 className="text-xl font-black leading-8 text-[#0F3F1A]">
                    {sectionKey === 'providers' ? providerCardTitle(card.activity.name) : card.title}
                  </h3>
                  <p className="mt-3 min-h-[76px] text-sm font-semibold leading-7 text-gray-600">{card.activity.description || card.description}</p>
                  <div className="mt-4 flex min-h-[72px] flex-wrap content-start gap-2">
                    {card.activity.specialtyNames.slice(0, 4).map((specialtyName) => (
                      <span key={specialtyName} className="rounded-full bg-[#FDF7E8] px-3 py-1.5 text-[11px] font-black text-[#8A6A00]">
                        {specialtyName}
                      </span>
                    ))}
                  </div>
                  <Link href={`/uae/abu-dhabi/${card.activity.primarySpecialtySlug}`} aria-label={`${meta.button}: ${card.activity.name}`} className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-[#D8C59F] bg-[#FFF9EC] px-5 py-3 text-sm font-black text-[#0F3F1A] transition hover:border-[#D4AF37] hover:bg-[#F4D47A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/35">
                    {meta.button}<ChevronLeft aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>;
      })}
    </section>
  );
}

export default function UaeDirectorySectorCards({ emirate, area = null, locale = 'ar', directoryCards = [] }) {
  const isEn = locale === 'en';
  const showAbuDhabiTest =
    !isEn &&
    !area &&
    emirate.slug === 'abu-dhabi' &&
    directoryCards.length === 21;

  if (showAbuDhabiTest) {
    return <AbuDhabiConstitutionalCards cards={directoryCards} />;
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
