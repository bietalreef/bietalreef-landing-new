import Link from 'next/link';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../data/siteTaxonomy';

const marketplaceLinks = [
  { ar: 'مواد البناء', en: 'Building materials', href: '/marketplace' },
  { ar: 'مواد التشطيب', en: 'Finishing materials', href: '/marketplace' },
  { ar: 'الأنظمة الذكية', en: 'Smart systems', href: '/marketplace' },
  { ar: 'الأثاث والديكور', en: 'Furniture and decor', href: '/marketplace' },
];

const articleLinks = [
  { ar: 'كيف تختار مزود خدمة مناسب؟', en: 'How to choose the right service provider?', href: '/blog' },
  { ar: 'كيف تطلب عرض سعر واضح؟', en: 'How to request a clear quotation?', href: '/request-quote' },
  { ar: 'ما البيانات المطلوبة قبل بدء المشروع؟', en: 'What details are needed before starting a project?', href: '/blog' },
  { ar: 'الفرق بين الخدمة والمنتج والمزود', en: 'Service, product and provider differences', href: '/blog' },
];

function getUrl(locale, path) {
  if (locale === 'en') return `/en${path}`;
  return path;
}

function label(item, locale) {
  return locale === 'en' ? item.en : item.ar;
}

function serviceName(service, locale) {
  return locale === 'en' ? service.nameEn : service.nameAr;
}

function areaName(area, locale) {
  return locale === 'en' ? area.nameEn : area.nameAr;
}

function emirateName(emirate, locale) {
  return locale === 'en' ? emirate.nameEn : emirate.nameAr;
}

function Section({ title, subtitle, icon, children, defaultOpen = false, locale = 'ar' }) {
  return (
    <details open={defaultOpen} className="group rounded-3xl border border-[#E6DCC8] bg-white/95 p-5 shadow-sm transition hover:border-[#D4AF37]/70 hover:shadow-lg">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDFBF7] text-xl ring-1 ring-[#E6DCC8]">{icon}</span>
          <span>
            <span className="block text-base font-black text-[#0F3F1A]">{title}</span>
            {subtitle ? <span className="mt-1 block text-xs font-semibold text-gray-500">{subtitle}</span> : null}
          </span>
        </span>
        <span className="text-[#8A6A00] transition group-open:rotate-180">⌄</span>
      </summary>
      <div className={`mt-5 ${locale === 'en' ? 'text-left' : 'text-right'}`}>{children}</div>
    </details>
  );
}

function LinkList({ items, locale }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Link key={`${item.href}-${item.label}`} href={item.href} className="flex items-center justify-between gap-3 rounded-2xl border border-[#F1E7D5] bg-[#FDFBF7] px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-[#D4AF37] hover:text-[#0F3F1A]">
          <span>{item.label}</span>
          <span className="text-[#B8922B]">{locale === 'en' ? '→' : '←'}</span>
        </Link>
      ))}
    </div>
  );
}

export default function UaeSmartFooter({ locale = 'ar', pageType = 'index', emirate = null, area = null, service = null }) {
  const isEn = locale === 'en';
  const dir = isEn ? 'ltr' : 'rtl';
  const currentEmirate = emirate || UAE_EMIRATES[0];
  const currentArea = area || currentEmirate?.areas?.[0];
  const currentService = service || SERVICE_CATEGORIES[0];
  const nearbyAreas = currentEmirate?.areas?.filter((item) => item.slug !== currentArea?.slug).slice(0, 8) || [];
  const relatedServices = SERVICE_CATEGORIES.filter((item) => item.slug !== currentService?.slug).slice(0, 8);

  const baseTitle = isEn ? 'Explore more' : 'استكشف المزيد';
  const titleByType = {
    index: isEn ? 'Explore Biet Al Reef UAE directory' : 'استكشف دليل الإمارات في بيت الريف',
    emirate: isEn ? `Explore more in ${emirateName(currentEmirate, locale)}` : `استكشف المزيد في ${emirateName(currentEmirate, locale)}`,
    area: isEn ? `Explore more in ${areaName(currentArea, locale)}` : `استكشف المزيد في ${areaName(currentArea, locale)}`,
    service: isEn ? `Explore more about ${serviceName(currentService, locale)} in ${areaName(currentArea, locale)}` : `استكشف المزيد حول ${serviceName(currentService, locale)} في ${areaName(currentArea, locale)}`,
  };

  const emirateLinks = UAE_EMIRATES.map((item) => ({
    label: emirateName(item, locale),
    href: getUrl(locale, `/uae/${item.slug}`),
  }));

  const areaLinks = nearbyAreas.map((item) => ({
    label: pageType === 'service'
      ? (isEn ? `${serviceName(currentService, locale)} in ${areaName(item, locale)}` : `${serviceName(currentService, locale)} في ${areaName(item, locale)}`)
      : areaName(item, locale),
    href: pageType === 'service'
      ? getUrl(locale, `/uae/${currentEmirate.slug}/${item.slug}/${currentService.slug}`)
      : getUrl(locale, `/uae/${currentEmirate.slug}/${item.slug}`),
  }));

  const serviceLinks = (pageType === 'emirate' ? SERVICE_CATEGORIES.slice(0, 10) : relatedServices).map((item) => ({
    label: pageType === 'area'
      ? (isEn ? `${serviceName(item, locale)} in ${areaName(currentArea, locale)}` : `${serviceName(item, locale)} في ${areaName(currentArea, locale)}`)
      : serviceName(item, locale),
    href: getUrl(locale, `/uae/${currentEmirate.slug}/${currentArea.slug}/${item.slug}`),
  }));

  const sameServiceOtherEmirates = UAE_EMIRATES.filter((item) => item.slug !== currentEmirate?.slug).slice(0, 6).map((item) => ({
    label: isEn ? `${serviceName(currentService, locale)} in ${emirateName(item, locale)}` : `${serviceName(currentService, locale)} في ${emirateName(item, locale)}`,
    href: getUrl(locale, `/uae/${item.slug}/${item.areas[0].slug}/${currentService.slug}`),
  }));

  const productLinks = marketplaceLinks.map((item) => ({ label: label(item, locale), href: getUrl(locale, item.href) }));
  const knowledgeLinks = articleLinks.map((item) => ({ label: label(item, locale), href: getUrl(locale, item.href) }));

  return (
    <section dir={dir} className="bg-[#FDFBF7] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-black text-[#B8922B]">{baseTitle}</p>
          <h2 className="mt-2 text-2xl font-black text-[#0F3F1A] md:text-4xl">{titleByType[pageType] || titleByType.index}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-7 text-gray-600 md:text-base">
            {isEn
              ? 'Smart internal links connect areas, services, products and useful pages without making the route tree heavier.'
              : 'روابط داخلية ذكية تربط المناطق والخدمات والمنتجات والصفحات المفيدة بدون تضخيم شجرة الروابط.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageType !== 'index' ? (
            <Section locale={locale} defaultOpen title={isEn ? `Areas in ${emirateName(currentEmirate, locale)}` : `مناطق ${emirateName(currentEmirate, locale)}`} subtitle={isEn ? 'Move within the same emirate' : 'تنقل داخل نفس الإمارة'} icon="📍">
              <LinkList locale={locale} items={areaLinks} />
            </Section>
          ) : (
            <Section locale={locale} defaultOpen title={isEn ? 'UAE emirates' : 'إمارات الدولة'} subtitle={isEn ? 'Start by location' : 'ابدأ حسب المكان'} icon="🇦🇪">
              <LinkList locale={locale} items={emirateLinks} />
            </Section>
          )}

          <Section locale={locale} defaultOpen title={pageType === 'service' ? (isEn ? 'Related services' : 'خدمات مرتبطة') : (isEn ? 'Service categories' : 'الخدمات المتاحة')} subtitle={isEn ? 'Current route extensions stay active' : 'مع الحفاظ على الامتدادات الحالية'} icon="🛠️">
            <LinkList locale={locale} items={serviceLinks} />
          </Section>

          <Section locale={locale} title={isEn ? 'Products and marketplace' : 'المنتجات والمتاجر'} subtitle={isEn ? 'General marketplace paths' : 'روابط عامة آمنة للمنتجات'} icon="📦">
            <LinkList locale={locale} items={productLinks} />
          </Section>

          <Section locale={locale} title={isEn ? 'Articles and request flow' : 'مقالات ومسار الطلب'} subtitle={isEn ? 'Support search and answers' : 'يدعم البحث والإجابات'} icon="📚">
            <LinkList locale={locale} items={knowledgeLinks} />
          </Section>

          {pageType === 'service' ? (
            <Section locale={locale} title={isEn ? 'Same service in other emirates' : 'نفس الخدمة في إمارات أخرى'} subtitle={isEn ? 'Broader GEO discovery' : 'توسيع الربط الجغرافي'} icon="🏙️">
              <LinkList locale={locale} items={sameServiceOtherEmirates} />
            </Section>
          ) : null}
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#E6DCC8] bg-white/90 p-5 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <h3 className="text-xl font-black text-[#0F3F1A]">{isEn ? 'Still looking for the right provider?' : 'لا تزال تبحث عن مزود خدمة مناسب؟'}</h3>
            <p className="mt-2 text-sm font-semibold leading-7 text-gray-600">{isEn ? 'Send your request and Biet Al Reef will guide you by location and service.' : 'أرسل طلبك وسنساعدك في توجيهه حسب المكان ونوع الخدمة.'}</p>
          </div>
          <Link href={getUrl(locale, '/request-quote')} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#1F170D] md:mt-0 md:w-auto">
            {isEn ? 'Request a quotation' : 'اطلب عرض سعر'}
          </Link>
        </div>
      </div>
    </section>
  );
}
