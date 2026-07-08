import Link from 'next/link';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../data/siteTaxonomy';

const platformActions = [
  { ar: 'ابدأ طلبك كعميل', en: 'Start a client request', href: '/request-quote', icon: '🔎' },
  { ar: 'سجل نشاطك كمزود خدمة', en: 'Register as a provider', href: '/providers/register', icon: '🏢' },
  { ar: 'تصفح مزودي الخدمات', en: 'Browse providers', href: '/providers', icon: '🤝' },
  { ar: 'تعرف على المنصة', en: 'Explore the platform', href: '/platform', icon: '🚀' },
];

const marketplaceLinks = [
  { ar: 'مواد البناء', en: 'Building materials', href: '/marketplace' },
  { ar: 'مواد التشطيب', en: 'Finishing materials', href: '/marketplace' },
  { ar: 'الأنظمة الذكية', en: 'Smart systems', href: '/marketplace' },
  { ar: 'الأثاث والديكور', en: 'Furniture and decor', href: '/marketplace' },
];

const knowledgeLinks = [
  { ar: 'البناء الذكي في الإمارات', en: 'Smart construction in the UAE', href: '/blog/smart-construction-2024' },
  { ar: 'اتجاهات التصميم الداخلي', en: 'Interior design trends', href: '/blog/interior-design-trends' },
  { ar: 'كيف تطلب عرض سعر واضح؟', en: 'How to request a clear quotation?', href: '/request-quote' },
  { ar: 'ما البيانات المطلوبة قبل المشروع؟', en: 'Required project details', href: '/request-quote' },
];

function getUrl(locale, path) {
  if (locale === 'en' && path === '/request-quote') return '/en/request-quote';
  if (locale === 'en' && path === '/service-inquiry') return '/en/service-inquiry';
  const sharedPaths = ['/providers/register', '/platform'];
  if (sharedPaths.includes(path) || path.startsWith('/blog/')) return path;
  return locale === 'en' ? `/en${path}` : path;
}

function sectorUrl(locale, emirateSlug, serviceSlug) {
  return locale === 'en' ? `/en/uae/${emirateSlug}/sectors/${serviceSlug}` : `/uae/${emirateSlug}/${serviceSlug}`;
}

function t(item, locale) { return locale === 'en' ? item.en : item.ar; }
function serviceName(service, locale) { return locale === 'en' ? service.nameEn : service.nameAr; }
function areaName(area, locale) { return locale === 'en' ? area.nameEn : area.nameAr; }
function emirateName(emirate, locale) { return locale === 'en' ? emirate.nameEn : emirate.nameAr; }

function LinkList({ items, locale }) {
  return <div className="space-y-2">{items.map((item) => <Link key={`${item.href}-${item.label}`} href={item.href} className="flex items-center justify-between gap-3 rounded-2xl border border-[#F1E7D5] bg-[#FDFBF7] px-4 py-3 text-sm font-bold leading-6 text-gray-700 transition hover:border-[#D4AF37] hover:bg-white hover:text-[#0F3F1A]"><span>{item.label}</span><span className="text-[#B8922B]">{locale === 'en' ? '→' : '←'}</span></Link>)}</div>;
}

function Section({ title, subtitle, icon, children, defaultOpen = false }) {
  return <details open={defaultOpen} className="group rounded-[1.75rem] border border-[#E6DCC8] bg-white/95 p-5 shadow-[0_18px_45px_rgba(18,58,70,0.07)] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/80 hover:shadow-2xl hover:shadow-[#123A46]/10"><summary className="flex cursor-pointer list-none items-center justify-between gap-4"><span className="flex min-w-0 items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FDFBF7] text-xl ring-1 ring-[#E6DCC8] shadow-inner">{icon}</span><span className="min-w-0"><span className="block text-base font-black leading-6 text-[#0F3F1A]">{title}</span>{subtitle ? <span className="mt-1 block text-xs font-semibold leading-5 text-gray-500">{subtitle}</span> : null}</span></span><span className="shrink-0 text-[#8A6A00] transition group-open:rotate-180">⌄</span></summary><div className="mt-4">{children}</div></details>;
}

function PlatformActions({ locale }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{platformActions.map((item) => <Link key={item.href} href={getUrl(locale, item.href)} className="group rounded-[1.6rem] border border-[#E6DCC8] bg-white p-4 shadow-[0_16px_36px_rgba(18,58,70,0.06)] transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#123A46]/10"><div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FDFBF7] text-xl ring-1 ring-[#E6DCC8] shadow-inner">{item.icon}</div><h3 className="text-base font-black leading-7 text-[#0F3F1A]">{t(item, locale)}</h3><p className="mt-2 text-xs font-semibold leading-6 text-gray-500">{locale === 'en' ? 'Go directly to the right UAE directory action.' : 'انتقل مباشرة إلى الإجراء المناسب داخل دليل الإمارات.'}</p></Link>)}</div>;
}

export default function UaeSmartFooter({ locale = 'ar', pageType = 'index', emirate = null, area = null, service = null }) {
  const isEn = locale === 'en';
  const dir = isEn ? 'ltr' : 'rtl';
  const currentEmirate = emirate || UAE_EMIRATES[0];
  const currentArea = area || currentEmirate?.areas?.[0];
  const currentService = service || SERVICE_CATEGORIES[0];
  const isEmirateService = pageType === 'emirateService';
  const isAreaService = pageType === 'service';
  const isServiceContext = isEmirateService || isAreaService;
  const isPlatformIndex = pageType === 'index';
  const titleByType = { index: isEn ? 'Use the Biet Al Reef UAE Directory' : 'استخدم دليل الإمارات داخل بيت الريف', emirate: isEn ? `More paths inside ${emirateName(currentEmirate, locale)}` : `مسارات إضافية داخل ${emirateName(currentEmirate, locale)}`, area: isEn ? `Continue from ${areaName(currentArea, locale)}` : `تابع من ${areaName(currentArea, locale)}`, service: isEn ? `Continue ${serviceName(currentService, locale)} in ${areaName(currentArea, locale)}` : `تابع ${serviceName(currentService, locale)} في ${areaName(currentArea, locale)}`, emirateService: isEn ? `Continue ${serviceName(currentService, locale)} in ${emirateName(currentEmirate, locale)}` : `تابع ${serviceName(currentService, locale)} في ${emirateName(currentEmirate, locale)}` };
  const introByType = { index: isEn ? 'A premium UAE directory gateway for emirates, areas, service categories, providers and useful content.' : 'بوابة بريميوم لدليل الإمارات تجمع الإمارات، المناطق، فئات الخدمات، المزودين، والمحتوى المفيد.', emirate: isEn ? 'The main page shows only the seven approved sectors. Extra specialties, areas and related links stay organized here.' : 'الصفحة الرئيسية للإمارة تعرض القطاعات السبعة فقط. أما التخصصات الإضافية والمناطق والروابط المرتبطة فتبقى منظمة هنا.', area: isEn ? 'This area page remains active and directs users to the right directory action.' : 'صفحة المنطقة ما زالت تعمل وتوجه المستخدم إلى الإجراء المناسب داخل الدليل.', service: isEn ? 'Move from service discovery to a request, provider registration, products or related content.' : 'انتقل من اكتشاف الخدمة إلى طلب سعر أو تسجيل مزود أو منتجات أو محتوى مرتبط.', emirateService: isEn ? 'Move from the service hub to requests, providers, areas and marketplace.' : 'انتقل من صفحة النشاط إلى الطلبات والمزودين والمناطق والمنتجات.' };
  const emirateLinks = UAE_EMIRATES.map((item) => ({ label: emirateName(item, locale), href: getUrl(locale, `/uae/${item.slug}`) }));
  const areaSource = pageType === 'emirate' || isEmirateService ? currentEmirate?.areas || [] : currentEmirate?.areas?.filter((item) => item.slug !== currentArea?.slug).slice(0, 8) || [];
  const areaLinks = areaSource.map((item) => ({ label: isServiceContext ? (isEn ? `${serviceName(currentService, locale)} in ${areaName(item, locale)}` : `${serviceName(currentService, locale)} في ${areaName(item, locale)}`) : areaName(item, locale), href: isServiceContext ? getUrl(locale, `/uae/${currentEmirate.slug}/${item.slug}/${currentService.slug}`) : getUrl(locale, `/uae/${currentEmirate.slug}/${item.slug}`) }));
  const serviceSource = pageType === 'emirate' ? SERVICE_CATEGORIES : SERVICE_CATEGORIES.filter((item) => item.slug !== currentService?.slug);
  const serviceLinks = serviceSource.map((item) => ({ label: pageType === 'area' ? (isEn ? `${serviceName(item, locale)} in ${areaName(currentArea, locale)}` : `${serviceName(item, locale)} في ${areaName(currentArea, locale)}`) : serviceName(item, locale), href: pageType === 'area' || isAreaService ? getUrl(locale, `/uae/${currentEmirate.slug}/${currentArea.slug}/${item.slug}`) : sectorUrl(locale, currentEmirate.slug, item.slug) }));
  const sameServiceOtherEmirates = UAE_EMIRATES.filter((item) => item.slug !== currentEmirate?.slug).slice(0, 6).map((item) => ({ label: isEn ? `${serviceName(currentService, locale)} in ${emirateName(item, locale)}` : `${serviceName(currentService, locale)} في ${emirateName(item, locale)}`, href: sectorUrl(locale, item.slug, currentService.slug) }));
  const productLinks = marketplaceLinks.map((item) => ({ label: t(item, locale), href: getUrl(locale, item.href) }));
  const knowledgeList = knowledgeLinks.map((item) => ({ label: t(item, locale), href: getUrl(locale, item.href) }));
  return <section dir={dir} className="bg-[#FDFBF7] px-4 py-12 md:py-16"><div className="mx-auto max-w-7xl"><div className="mb-7 text-center"><p className="text-sm font-black text-[#B8922B]">{isEn ? 'UAE Directory gateway' : 'بوابة دليل الإمارات'}</p><h2 className="mt-2 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{titleByType[pageType] || titleByType.index}</h2><p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-7 text-gray-600 md:text-base">{introByType[pageType] || introByType.index}</p></div><PlatformActions locale={locale} /><div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{!isPlatformIndex ? <Section defaultOpen title={isServiceContext ? (isEn ? `${serviceName(currentService, locale)} by area` : `${serviceName(currentService, locale)} حسب المناطق`) : (isEn ? `Areas in ${emirateName(currentEmirate, locale)}` : `مناطق ${emirateName(currentEmirate, locale)}`)} subtitle={isEn ? 'GEO links without heavy routing' : 'روابط جغرافية بدون تضخيم المسار'} icon="📍"><LinkList locale={locale} items={areaLinks} /></Section> : <Section defaultOpen title={isEn ? 'UAE emirates' : 'إمارات الدولة'} subtitle={isEn ? 'Start by location' : 'ابدأ حسب المكان'} icon="🇦🇪"><LinkList locale={locale} items={emirateLinks} /></Section>}<Section defaultOpen title={isServiceContext ? (isEn ? 'Related services' : 'خدمات مرتبطة') : (isEn ? 'All service categories' : 'كل التخصصات والخدمات')} subtitle={isEn ? 'Extra categories stay in the footer' : 'الأقسام الإضافية تبقى داخل الفوتر'} icon="🛠️"><LinkList locale={locale} items={serviceLinks} /></Section><Section title={isEn ? 'Products and marketplace' : 'المنتجات والمتاجر'} subtitle={isEn ? 'Move to marketplace' : 'انتقل إلى أقسام المنتجات'} icon="📦"><LinkList locale={locale} items={productLinks} /></Section><Section title={isEn ? 'Guides and useful content' : 'مقالات ومحتوى مفيد'} subtitle={isEn ? 'Helpful content for users and AI search' : 'محتوى مفيد للمستخدم ومحركات الذكاء الاصطناعي'} icon="📚"><LinkList locale={locale} items={knowledgeList} /></Section>{isServiceContext ? <Section title={isEn ? 'Same service in other emirates' : 'نفس الخدمة في إمارات أخرى'} subtitle={isEn ? 'Broader GEO discovery' : 'توسيع الربط الجغرافي'} icon="🏙️"><LinkList locale={locale} items={sameServiceOtherEmirates} /></Section> : null}</div><div className="mt-8 rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:flex md:items-center md:justify-between md:gap-6"><div><h3 className="text-xl font-black text-[#0F3F1A]">{isEn ? 'Ready to use Biet Al Reef?' : 'جاهز تستخدم منصة بيت الريف؟'}</h3><p className="mt-2 text-sm font-semibold leading-7 text-gray-600">{isEn ? 'Send a request or register your business so the platform can connect location, service and provider data.' : 'أرسل طلبك أو سجل نشاطك حتى تربط المنصة بين المكان والخدمة والمزود المناسب.'}</p></div><Link href={getUrl(locale, '/request-quote')} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#1F170D] md:mt-0 md:w-auto">{isEn ? 'Start now' : 'ابدأ الآن'}</Link></div></div></section>;
}
