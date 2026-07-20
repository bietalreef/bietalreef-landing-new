import Image from 'next/image';
import Link from 'next/link';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../data/siteTaxonomy';
import UaeProviderJoinCTA from './UaeProviderJoinCTA';

const icons = {
  provider: '/images/ui-icons-3d/provider-worker.webp',
  checklist: '/images/ui-icons-3d/verified-checklist.webp',
  location: '/images/ui-icons-3d/location-map.webp',
  tools: '/images/ui-icons-3d/tools-maintenance.webp',
  search: '/images/ui-icons-3d/search-magnifier.webp',
  support: '/images/ui-icons-3d/customer-support.webp',
  products: '/images/ui-icons-3d/products-box.webp',
  workshop: '/images/ui-icons-3d/service-workshop.webp',
};

const copy = {
  ar: {
    title: 'كيف يساعد دليل الإمارات أصحاب المشاريع؟',
    intro: 'يعتمد دليل الإمارات في بيت الريف على مسار جغرافي منظم يبدأ من الإمارة، ثم القطاع، ثم المدينة أو المنطقة، ثم نوع الخدمة. يساعد هذا الترتيب أصحاب الفلل والمباني والمشاريع التجارية على الوصول إلى المقاولين والموردين ومزودي الخدمات الأقرب إلى احتياج المشروع وموقعه.',
    trust: [
      { title: 'ابحث حسب الموقع', text: 'ابدأ من الإمارة والمنطقة للوصول إلى الخيارات الأقرب.', icon: icons.location },
      { title: 'قارن مع وياك', text: 'نظّم احتياجك وقارن المسارات والخيارات المناسبة لمشروعك.', icon: icons.search },
      { title: 'استكشف الخدمات والعروض مجانًا', text: 'اطّلع على الخدمات والعروض المتاحة داخل المنصة بسهولة.', icon: icons.tools },
    ],
    quick: [
      { title: 'استكشف مزودي الخدمة', text: 'ابحث عن المزودين والمقاولين الأقرب إلى احتياج مشروعك.', href: '/providers', icon: icons.provider },
      { title: 'تعرّف كيف تعمل المنصة', text: 'دليل سريع لفهم رحلة البحث والوصول داخل بيت الريف.', href: '/how-it-works', icon: icons.checklist },
    ],
    providerTitle: 'هل تقدم خدمات البناء أو الصيانة داخل الإمارات؟',
    providerText: 'انضم إلى دليل الإمارات في بيت الريف وابدأ ببناء حضور رقمي منظم لنشاطك. اعرض خدماتك ومناطق عملك وأعمالك السابقة أمام العملاء الباحثين عن تخصصك.',
    providerButton: 'اطلب إضافة نشاطك',
    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      ['كيف أستخدم دليل الإمارات؟', 'اختر الإمارة أولًا، ثم القطاع، وبعدها المدينة أو المنطقة ونوع الخدمة للوصول إلى النتائج الأقرب لمشروعك.'],
      ['هل يبدأ الدليل بالمكان أم بالخدمة؟', 'يبدأ الدليل بالمكان حتى تكون النتائج مرتبطة بالإمارة والمنطقة قبل الانتقال إلى التخصص والخدمة.'],
      ['كيف أصل إلى مزود خدمة في مدينتي؟', 'افتح صفحة الإمارة، اختر القطاع المناسب، ثم انتقل إلى منطقتك وتصفح المزودين والخدمات المرتبطة بها.'],
      ['هل يشمل الدليل المنتجات ومواد البناء؟', 'نعم، يربط الدليل بين الخدمات والمزودين والمنتجات والمتاجر ومواد البناء ذات الصلة بالمشروع.'],
      ['كيف يمكن لمزود الخدمة إضافة نشاطه؟', 'استخدم زر طلب إضافة النشاط وأرسل بيانات الشركة والخدمات ومناطق العمل ليتم تجهيز الملف ومراجعته.'],
    ],
    exploreTitle: 'استكشف دليل الإمارات',
    explore: [
      { title: 'إمارات الدولة', text: 'ابدأ حسب المكان', icon: icons.location, links: UAE_EMIRATES.map((x) => ({ label: x.nameAr, href: `/uae/${x.slug}` })) },
      { title: 'التخصصات والخدمات', text: 'جميع القطاعات والخدمات', icon: icons.tools, links: SERVICE_CATEGORIES.slice(0, 12).map((x) => ({ label: x.nameAr, href: `/uae/abu-dhabi/${x.slug}` })) },
      { title: 'المنتجات والمتاجر', text: 'مواد ومنتجات المشروع', icon: icons.products, links: [{ label: 'مواد البناء', href: '/marketplace' }, { label: 'الأثاث والديكور', href: '/marketplace' }, { label: 'الأنظمة الذكية', href: '/marketplace' }] },
      { title: 'مقالات ومحتوى مفيد', text: 'أدلة تساعد مشروعك', icon: icons.support, links: [{ label: 'مقالات بيت الريف', href: '/blog' }, { label: 'طلب عرض سعر واضح', href: '/request-quote' }, { label: 'طريقة عمل المنصة', href: '/how-it-works' }] },
    ],
  },
  en: {
    title: 'How does the UAE Directory help project owners?',
    intro: 'Biet Al Reef UAE Directory follows a clear geographic journey: emirate, sector, city or area, then service type. This structure helps villa owners, building managers and commercial projects reach contractors, suppliers and service providers that match the project location and requirements.',
    trust: [
      { title: 'Search by location', text: 'Start with the emirate and area to reach nearby options.', icon: icons.location },
      { title: 'Compare with Weyaak', text: 'Organize your needs and compare suitable routes and options.', icon: icons.search },
      { title: 'Explore services and offers free', text: 'Browse available services and offers across the platform.', icon: icons.tools },
    ],
    quick: [
      { title: 'Explore service providers', text: 'Find providers and contractors closest to your project needs.', href: '/en/providers', icon: icons.provider },
      { title: 'See how the platform works', text: 'A quick guide to discovery and navigation inside Biet Al Reef.', href: '/en/how-it-works', icon: icons.checklist },
    ],
    providerTitle: 'Do you provide construction or maintenance services in the UAE?',
    providerText: 'Join the Biet Al Reef UAE Directory and build a structured digital presence for your business. Present your services, coverage areas and completed work to customers searching for your specialty.',
    providerButton: 'Request your business profile',
    faqTitle: 'Frequently asked questions',
    faqs: [
      ['How do I use the UAE Directory?', 'Choose an emirate, select a sector, then continue to the city or area and service type that matches your project.'],
      ['Does the directory start by location or service?', 'It starts by location so results remain connected to the emirate and area before narrowing to the required specialty.'],
      ['How can I find a provider in my city?', 'Open the emirate page, choose the relevant sector, then continue to your area and browse related providers and services.'],
      ['Does the directory include products and building materials?', 'Yes. It connects services and providers with relevant products, stores and building materials.'],
      ['How can a provider add a business?', 'Use the business-profile request and submit company, service and coverage information for review and setup.'],
    ],
    exploreTitle: 'Explore the UAE Directory',
    explore: [
      { title: 'UAE emirates', text: 'Start by location', icon: icons.location, links: UAE_EMIRATES.map((x) => ({ label: x.nameEn, href: `/en/uae/${x.slug}` })) },
      { title: 'Specialties and services', text: 'Browse sectors and services', icon: icons.tools, links: SERVICE_CATEGORIES.slice(0, 12).map((x) => ({ label: x.nameEn, href: `/en/categories/${x.slug}` })) },
      { title: 'Products and stores', text: 'Materials and products', icon: icons.products, links: [{ label: 'Building materials', href: '/en/marketplace' }, { label: 'Furniture and decor', href: '/en/marketplace' }, { label: 'Smart systems', href: '/en/marketplace' }] },
      { title: 'Guides and useful content', text: 'Helpful project resources', icon: icons.support, links: [{ label: 'Biet Al Reef articles', href: '/en/blog' }, { label: 'Request a quotation', href: '/en/request-quote' }, { label: 'How the platform works', href: '/en/how-it-works' }] },
    ],
  },
};

function Icon({ src, alt, size = 68 }) {
  return <span className="relative block shrink-0" style={{ width: size, height: size }}><Image src={src} alt={alt} fill className="object-contain" sizes={`${size}px`} /></span>;
}

export function UaeDirectoryExploreFooter({ locale = 'ar', emirate = null, area = null }) {
  const isEn = locale === 'en';
  const root = isEn ? '/en/uae' : '/uae';
  const locationLinks = emirate
    ? emirate.areas.map((item) => ({ label: isEn ? item.nameEn : item.nameAr, href: `${root}/${emirate.slug}/${item.slug}` }))
    : UAE_EMIRATES.map((item) => ({ label: isEn ? item.nameEn : item.nameAr, href: `${root}/${item.slug}` }));
  const serviceRoot = emirate ? `${root}/${emirate.slug}${area ? `/${area.slug}` : ''}` : `${root}/abu-dhabi`;
  const groups = [
    { title: emirate ? (isEn ? `Areas in ${emirate.nameEn}` : `مناطق ${emirate.nameAr}`) : (isEn ? 'UAE emirates' : 'إمارات الدولة'), text: isEn ? 'Start by location' : 'ابدأ حسب المكان', icon: icons.location, links: locationLinks },
    { title: isEn ? 'Specialties and services' : 'التخصصات والخدمات', text: isEn ? 'All platform specialties' : 'جميع تخصصات المنصة', icon: icons.tools, links: SERVICE_CATEGORIES.map((item) => ({ label: isEn ? item.nameEn : item.nameAr, href: `${serviceRoot}/${item.slug}` })) },
    { title: isEn ? 'Products and stores' : 'المنتجات والمتاجر', text: isEn ? 'Materials and products' : 'مواد ومنتجات المشروع', icon: icons.products, links: isEn ? [{ label: 'Building materials', href: '/en/marketplace' }, { label: 'Furniture and decor', href: '/en/marketplace' }, { label: 'Smart systems', href: '/en/marketplace' }] : [{ label: 'مواد البناء', href: '/marketplace' }, { label: 'الأثاث والديكور', href: '/marketplace' }, { label: 'الأنظمة الذكية', href: '/marketplace' }] },
    { title: isEn ? 'Guides and useful content' : 'مقالات ومحتوى مفيد', text: isEn ? 'Helpful project resources' : 'أدلة تساعد مشروعك', icon: icons.support, links: isEn ? [{ label: 'Biet Al Reef articles', href: '/en/blog' }, { label: 'Request a quotation', href: '/en/request-quote' }, { label: 'How the platform works', href: '/en/how-it-works' }] : [{ label: 'مقالات بيت الريف', href: '/blog' }, { label: 'طلب عرض سعر واضح', href: '/request-quote' }, { label: 'طريقة عمل المنصة', href: '/how-it-works' }] },
  ];

  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="bg-[#FDFBF7] px-4 pb-14 pt-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-2xl font-black text-[#0F3F1A] md:text-3xl">{isEn ? 'Explore the UAE Directory' : 'استكشف دليل الإمارات'}</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{groups.map((item) => <details key={item.title} className="group rounded-[1.35rem] border border-[#E4D6BA] bg-white p-3 shadow-sm"><summary className="cursor-pointer list-none"><div className="flex items-center gap-2"><Icon src={item.icon} alt="" size={46} /><span className="min-w-0"><strong className="block text-sm font-black text-[#0F3F1A]">{item.title}</strong><span className="mt-0.5 block text-[11px] font-semibold text-gray-500">{item.text}</span></span></div></summary><div className="mt-3 max-h-72 space-y-1.5 overflow-y-auto border-t border-[#F0E7D6] pt-3">{item.links.map((link) => <Link key={`${item.title}-${link.href}`} href={link.href} className="block rounded-xl px-2 py-1.5 text-xs font-bold text-gray-650 hover:bg-[#F8F0DA] hover:text-[#0F3F1A]">{link.label}</Link>)}</div></details>)}</div>
      </div>
    </section>
  );
}

export default function UaeDirectoryHomeContent({ locale = 'ar' }) {
  const isEn = locale === 'en';
  const t = copy[locale];
  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="bg-[#FDFBF7] px-4 pb-14">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="pt-4 text-center">
          <h2 className="text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{t.title}</h2>
          <p className="mx-auto mt-4 max-w-5xl text-base font-semibold leading-9 text-gray-650 md:text-lg">{t.intro}</p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {t.trust.map((item) => <article key={item.title} className="flex min-h-[158px] flex-col items-center justify-center rounded-[1.5rem] border border-[#E4D6BA] bg-white px-5 py-5 text-center shadow-[0_10px_28px_rgba(18,58,70,.04)]"><Icon src={item.icon} alt="" size={62} /><h3 className="mt-2 text-lg font-black text-[#0F3F1A]">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-7 text-gray-600">{item.text}</p></article>)}
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {t.quick.map((item) => <Link key={item.title} href={item.href} className="group flex min-h-[124px] items-center gap-4 rounded-[1.6rem] border border-[#D8B75A]/55 bg-[linear-gradient(135deg,#FFFDF7_0%,#F8F0DA_100%)] px-5 py-4 shadow-[0_16px_38px_rgba(138,106,0,.08)] transition hover:-translate-y-1 hover:border-[#B8922B]"><Icon src={item.icon} alt="" size={74} /><span className="flex-1"><strong className="block text-xl font-black text-[#0F3F1A]">{item.title}</strong><span className="mt-2 block text-sm font-semibold leading-7 text-gray-600">{item.text}</span></span><span className="text-2xl font-black text-[#B8922B]">←</span></Link>)}
        </section>

        <UaeProviderJoinCTA locale={locale} />

        <section>
          <h2 className="text-center text-3xl font-black text-[#0F3F1A]">{t.faqTitle}</h2>
          <div className="mt-5 space-y-3">{t.faqs.map(([q, a], index) => <details key={q} open={index === 0} className="group rounded-2xl border border-[#E4D6BA] bg-white px-5 py-4 shadow-sm"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-[#0F3F1A]"><span>{q}</span><span className="text-[#B8922B] transition group-open:rotate-45">＋</span></summary><p className="mt-3 border-t border-[#F0E7D6] pt-3 text-sm font-semibold leading-7 text-gray-600">{a}</p></details>)}</div>
        </section>

      </div>
      <UaeDirectoryExploreFooter locale={locale} />
    </div>
  );
}
