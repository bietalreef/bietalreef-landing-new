import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UAE_DIRECTORY_SPECIALTIES } from '../data/siteTaxonomy';

export default function UaeDirectorySectorCards({ emirate, area = null, locale = 'ar' }) {
  const isEn = locale === 'en';
  const emirateName = isEn ? emirate.nameEn : emirate.nameAr;
  const areaName = area ? (isEn ? area.nameEn : area.nameAr) : null;
  const routeRoot = `${isEn ? '/en' : ''}/uae/${emirate.slug}${area ? `/${area.slug}` : ''}`;
  const hrefFor = (card) => `${routeRoot}/${card.slug}`;
  const Arrow = isEn ? ChevronRight : ChevronLeft;

  return (
    <section dir={isEn ? 'ltr' : 'rtl'} id="uae-sector-cards" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
      <div className={isEn ? 'mb-8 text-center md:text-left' : 'mb-8 text-center md:text-right'}>
        <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">{isEn ? `${UAE_DIRECTORY_SPECIALTIES.length} specialties` : `${UAE_DIRECTORY_SPECIALTIES.length} تخصصًا`}</span>
        <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">{isEn ? `Choose a specialty in ${areaName || emirateName}` : `اختر التخصص في ${areaName || emirateName}`}</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {UAE_DIRECTORY_SPECIALTIES.map((card) => {
          const title = isEn ? card.nameEn : card.nameAr;
          const eyebrow = isEn ? card.eyebrowEn : card.eyebrowAr;
          const desc = isEn ? `${card.nameEn} services and providers available through the Biet Al Reef UAE Directory.` : card.descAr;
          const tags = card[isEn ? 'tagsEn' : 'tagsAr'];
          return <article key={card.slug} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]">
            <div className="relative h-48 overflow-hidden bg-[#F5EFE4] sm:h-52"><Image src={card.image} alt={title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" /><div className={`absolute bottom-4 left-4 right-4 flex ${isEn ? 'justify-start' : 'justify-end'}`}><span className="rounded-full border border-[#D4AF37]/45 bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{eyebrow}</span></div></div>
            <div className={`${isEn ? 'text-left' : 'text-right'} p-5 md:p-6`}><h3 className="text-xl font-black leading-8 text-[#0F3F1A]">{title}</h3><p className="mt-3 min-h-[76px] text-sm font-semibold leading-7 text-gray-600">{desc}</p><div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-[#FDF7E8] px-3 py-1 text-[11px] font-black text-[#8A6A00]">{tag}</span>)}</div><Link href={hrefFor(card)} aria-label={`${isEn ? 'Open' : 'فتح'} ${title}`} className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-[#D8C59F] bg-[#FFF9EC] px-5 py-3 text-sm font-black text-[#0F3F1A] transition hover:border-[#D4AF37] hover:bg-[#F4D47A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/35">{isEn ? 'Open section' : 'افتح القسم'}<Arrow aria-hidden="true" className="h-4 w-4" /></Link></div>
          </article>;
        })}
      </div>
    </section>
  );
}
