import Link from 'next/link';
import { Search, ClipboardList, Store, MessageCircle, Package, Route, Building2, ChevronDown } from 'lucide-react';

const productActions = [
  { ar: 'تصفح المنتجات', en: 'Browse products', hrefAr: '#marketplace-categories', hrefEn: '#marketplace-categories', icon: Search },
  { ar: 'اطلب تسعير مواد', en: 'Request material pricing', hrefAr: '/request-quote', hrefEn: '/en/request-quote', icon: ClipboardList },
  { ar: 'تصفح الموردين والمتاجر', en: 'Browse suppliers and stores', hrefAr: '/providers', hrefEn: '/en/providers', icon: Store },
  { ar: 'مساعدة في التوريد', en: 'Sourcing help', hrefAr: 'https://wa.me/971567856001', hrefEn: 'https://wa.me/971567856001', icon: MessageCircle },
];

const productGroups = [
  { ar: 'مواد البناء الأساسية', en: 'Basic building materials', hrefAr: '/marketplace/building-materials', hrefEn: '/en/marketplace/building-materials' },
  { ar: 'مواد التشطيب والديكور', en: 'Finishing and décor materials', hrefAr: '/marketplace/finishing-works', hrefEn: '/en/marketplace/finishing-works' },
  { ar: 'الإنارة والأنظمة الذكية', en: 'Lighting and smart systems', hrefAr: '/marketplace/smart-systems', hrefEn: '/en/marketplace/smart-systems' },
  { ar: 'الأثاث والمفروشات', en: 'Furniture and furnishings', hrefAr: '/marketplace/furniture-decor', hrefEn: '/en/marketplace/furniture-decor' },
  { ar: 'رخام وسيراميك وبورسلان', en: 'Marble, ceramic and porcelain', hrefAr: '/marketplace/finishing-works', hrefEn: '/en/marketplace/finishing-works' },
  { ar: 'ألمنيوم وزجاج وأخشاب', en: 'Aluminium, glass and wood', hrefAr: '/providers/specialty/aluminium-glass', hrefEn: '/en/providers/specialty/aluminium-glass' },
  { ar: 'مطابخ وكونترات', en: 'Kitchens and countertops', hrefAr: '/marketplace/furniture-decor', hrefEn: '/en/marketplace/furniture-decor' },
  { ar: 'أدوات ومستلزمات مواقع', en: 'Tools and site supplies', hrefAr: '/marketplace/building-materials', hrefEn: '/en/marketplace/building-materials' },
];

const productJourney = [
  { ar: 'حدد نوع المنتج أو المادة', en: 'Define the product or material type', hrefAr: '#marketplace-categories', hrefEn: '#marketplace-categories' },
  { ar: 'أضف الكمية والمواصفات', en: 'Add quantity and specifications', hrefAr: '/request-quote', hrefEn: '/en/request-quote' },
  { ar: 'حدد موقع التوريد', en: 'Set the supply location', hrefAr: '/request-quote', hrefEn: '/en/request-quote' },
  { ar: 'استلم مسار السعر أو المورد', en: 'Receive pricing or supplier path', hrefAr: '/providers', hrefEn: '/en/providers' },
];

const relatedLinks = [
  { ar: 'مزودو الخدمات', en: 'Service providers', hrefAr: '/providers', hrefEn: '/en/providers' },
  { ar: 'الخدمات والعروض', en: 'Services & Offers', hrefAr: '/services', hrefEn: '/en/services' },
  { ar: 'دليل الإمارات', en: 'UAE Directory', hrefAr: '/uae', hrefEn: '/en/uae' },
  { ar: 'طلب عرض سعر', en: 'Request a quotation', hrefAr: '/request-quote', hrefEn: '/en/request-quote' },
];

function hrefFor(locale, item) { return locale === 'en' ? item.hrefEn : item.hrefAr; }
function labelFor(locale, item) { return locale === 'en' ? item.en : item.ar; }

function IconBadge({ icon: Icon }) {
  return <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FDFBF7] text-[#0F3F1A] ring-1 ring-[#E6DCC8] shadow-inner"><Icon className="h-5 w-5" aria-hidden="true" /></span>;
}

function FooterCard({ title, subtitle, icon, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className="group rounded-[1.75rem] border border-[#E6DCC8] bg-white/95 p-5 shadow-[0_18px_45px_rgba(18,58,70,0.07)] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/80 hover:shadow-2xl hover:shadow-[#123A46]/10">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="flex min-w-0 items-center gap-3">
          <IconBadge icon={icon} />
          <span className="min-w-0"><span className="block text-base font-black leading-6 text-[#0F3F1A]">{title}</span><span className="mt-1 block text-xs font-semibold leading-5 text-gray-500">{subtitle}</span></span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-[#8A6A00] transition group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

function LinkList({ items, locale }) {
  return <div className="space-y-2">{items.map((item) => <Link key={`${labelFor(locale, item)}-${hrefFor(locale, item)}`} href={hrefFor(locale, item)} className="flex items-center justify-between gap-3 rounded-2xl border border-[#F1E7D5] bg-[#FDFBF7] px-4 py-3 text-sm font-bold leading-6 text-gray-700 transition hover:border-[#D4AF37] hover:bg-white hover:text-[#0F3F1A]"><span>{labelFor(locale, item)}</span><span className="text-[#B8922B]">{locale === 'en' ? '→' : '←'}</span></Link>)}</div>;
}

export default function ProductsSmartFooter({ locale = 'ar' }) {
  const isEn = locale === 'en';
  const dir = isEn ? 'ltr' : 'rtl';
  return (
    <section dir={dir} className="bg-[#FDFBF7] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center"><p className="text-sm font-black text-[#B8922B]">{isEn ? 'Products gateway' : 'بوابة المنتجات والمتاجر'}</p><h2 className="mt-2 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{isEn ? 'Continue through Products & Stores' : 'أكمل رحلتك داخل المنتجات والمتاجر'}</h2><p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-7 text-gray-600 md:text-base">{isEn ? 'Connect materials, stores, suppliers and pricing requests through one clear product and sourcing journey.' : 'انتقل بين المواد والمتاجر والموردين وطلبات التسعير ضمن رحلة واضحة للمنتج والتوريد.'}</p></div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{productActions.map((item) => <Link key={item.hrefAr} href={hrefFor(locale, item)} className="group rounded-[1.6rem] border border-[#E6DCC8] bg-white p-4 shadow-[0_16px_36px_rgba(18,58,70,0.06)] transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#123A46]/10"><IconBadge icon={item.icon} /><h3 className="text-base font-black leading-7 text-[#0F3F1A]">{labelFor(locale, item)}</h3><p className="mt-2 text-xs font-semibold leading-6 text-gray-500">{isEn ? 'Move to the right product and supply path.' : 'انتقل إلى المسار المناسب للمنتج أو التوريد.'}</p></Link>)}</div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"><FooterCard defaultOpen title={isEn ? 'Product categories' : 'فئات المنتجات'} subtitle={isEn ? 'Materials and products without page crowding' : 'مواد ومنتجات بدون ازدحام بصري'} icon={Package}><LinkList locale={locale} items={productGroups} /></FooterCard><FooterCard defaultOpen title={isEn ? 'Sourcing journey' : 'مسار طلب التوريد'} subtitle={isEn ? 'From product need to supplier path' : 'من احتياج المادة إلى مسار المورد'} icon={Route}><LinkList locale={locale} items={productJourney} /></FooterCard><FooterCard title={isEn ? 'Related platform sections' : 'أقسام مرتبطة داخل المنصة'} subtitle={isEn ? 'Services, providers and UAE directory' : 'الخدمات، المزودون، ودليل الإمارات'} icon={Building2}><LinkList locale={locale} items={relatedLinks} /></FooterCard></div>
        <div className="mt-8 rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:flex md:items-center md:justify-between md:gap-6"><div><h3 className="text-xl font-black text-[#0F3F1A]">{isEn ? 'Need materials or products for your project?' : 'تحتاج مواد أو منتجات لمشروعك؟'}</h3><p className="mt-2 text-sm font-semibold leading-7 text-gray-600">{isEn ? 'Send the product type, quantity, specifications and supply location so Biet Al Reef can guide the request correctly.' : 'أرسل نوع المنتج والكمية والمواصفات وموقع التوريد حتى يتم توجيه الطلب بشكل صحيح.'}</p></div><Link href={isEn ? '/en/request-quote' : '/request-quote'} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#1F170D] md:mt-0 md:w-auto">{isEn ? 'Request product pricing' : 'اطلب تسعير المنتج'}</Link></div>
      </div>
    </section>
  );
}
