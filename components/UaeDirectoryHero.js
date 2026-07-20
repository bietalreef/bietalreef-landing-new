import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function UaeDirectoryHero({ locale = 'ar', title, description, emirate, area, service, image, imageOnly = false, cleanNavigation = false }) {
  const isEn = locale === 'en';
  const dir = isEn ? 'ltr' : 'rtl';
  const Arrow = isEn ? ChevronRight : ChevronLeft;
  const root = isEn ? '/en/uae' : '/uae';
  const imageSrc = image || `/images/seo/emirates/${emirate?.slug || 'abu-dhabi'}.webp`;
  const crumbs = [
    { label: isEn ? 'UAE Directory' : 'دليل الإمارات', href: root },
    emirate && { label: isEn ? emirate.nameEn : emirate.nameAr, href: `${root}/${emirate.slug}` },
    area && { label: isEn ? area.nameEn : area.nameAr, href: `${root}/${emirate.slug}/${area.slug}` },
    service && { label: isEn ? service.nameEn : service.nameAr },
  ].filter(Boolean);

  if (imageOnly) {
    return (
      <section dir={dir} className="border-b border-[#E6DCC8] bg-[#F8F3E9] px-4 pb-6 md:pb-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[#DDCFB5] bg-white p-2 shadow-[0_24px_70px_rgba(62,51,31,.09)] md:rounded-[3rem] md:p-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-[#071A2F] md:aspect-[16/8] md:rounded-[2.35rem]">
            <Image
              src={imageSrc}
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1200px) 100vw, 1120px"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section dir={dir} className="border-b border-[#E6DCC8] bg-[#F8F3E9] px-4 py-6 md:py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[#DDCFB5] bg-white shadow-[0_24px_70px_rgba(62,51,31,.09)]">
        <div className="grid items-stretch lg:grid-cols-[1.1fr_.9fr]">
          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
            {!cleanNavigation ? <nav aria-label={isEn ? 'Breadcrumb' : 'مسار الصفحة'} className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-bold text-gray-500">
              {crumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  {index ? <Arrow className="h-3.5 w-3.5 text-[#B8922B]" /> : null}
                  {crumb.href ? <Link href={crumb.href} className="rounded-full px-2 py-1 transition hover:bg-[#F8F3E9] hover:text-[#0F3F1A]">{crumb.label}</Link> : <span aria-current="page" className="rounded-full bg-[#F8F3E9] px-2 py-1 text-[#0F3F1A]">{crumb.label}</span>}
                </span>
              ))}
            </nav> : null}
            {!cleanNavigation ? <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DCCAA7] bg-[#FFF9EC] px-4 py-2 text-xs font-black text-[#8A611B]"><MapPin className="h-4 w-4" />{isEn ? 'Location-based directory' : 'دليل حسب الموقع'}</span> : null}
            <h1 className={`${cleanNavigation ? '' : 'mt-5'} text-3xl font-black leading-[1.25] text-[#0F3F1A] md:text-5xl`}>{title}</h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-gray-600 md:text-lg">{description}</p>
          </div>
          <div className="relative min-h-[250px] overflow-hidden border-t border-[#E6DCC8] bg-[#EEE4D2] lg:min-h-[390px] lg:border-s lg:border-t-0">
            <Image src={imageSrc} alt="" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 44vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
