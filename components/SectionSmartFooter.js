import Link from 'next/link';
import {
  Building2,
  ChevronDown,
  ClipboardList,
  FileText,
  Layers3,
  MapPinned,
  MessageCircle,
  Package,
  Route,
  Search,
  Store,
  Users,
  Wrench,
} from 'lucide-react';
import { UAE_EMIRATES } from '../data/siteTaxonomy';
import { getSectionCardHref } from '../lib/sectionCardRoutes';

const WHATSAPP_URL = 'https://wa.me/971567856001';

const FALLBACK_ACTIVITIES = [
  { slug: 'construction-contracting', ar: 'المقاولات والبناء', en: 'Construction & Contracting' },
  { slug: 'engineering-design', ar: 'الهندسة والتصميم', en: 'Engineering & Design' },
  { slug: 'maintenance-finishing', ar: 'الصيانة والتشطيبات', en: 'Maintenance & Finishing' },
  { slug: 'aluminium-glass-wood', ar: 'الألمنيوم والزجاج والأخشاب', en: 'Aluminium, Glass & Wood' },
  { slug: 'building-materials-supply', ar: 'مواد البناء والتوريد', en: 'Building Materials & Supply' },
  { slug: 'cleaning-operations-equipment', ar: 'التنظيف والتشغيل وتأجير المعدات', en: 'Cleaning, Operations & Equipment Rental' },
  { slug: 'factories-workshops-stores', ar: 'المصانع والورش والمتاجر', en: 'Factories, Workshops & Stores' },
];

const CONFIG = {
  providers: {
    icon: Users,
    ar: {
      eyebrow: 'بوابة مزودي الخدمات',
      title: 'أكمل رحلتك داخل مزودي الخدمات',
      description: 'الوصول إلى النشاط والتخصص والإمارة وملف المزود عبر روابط واضحة متصلة ببيانات المنصة المعتمدة.',
      activitiesTitle: 'أنشطة مزودي الخدمات',
      activitiesSubtitle: '7 أنشطة رئيسية من قاعدة بيانات المنصة',
      journeyTitle: 'مسار مزود الخدمة',
      journeySubtitle: 'من تجهيز البيانات إلى نشر الملف',
      ctaTitle: 'جاهز تنشر ملف نشاطك؟',
      ctaDescription: 'أرسل بيانات النشاط إلى فريق بيت الريف لتجهيز الملف ومراجعته قبل النشر.',
      ctaLabel: 'اطلب إنشاء الملف',
    },
    en: {
      eyebrow: 'Service providers gateway',
      title: 'Continue through Service Providers',
      description: 'Reach the activity, specialty, emirate and provider profile through clear links connected to approved platform data.',
      activitiesTitle: 'Provider activities',
      activitiesSubtitle: '7 main activities from the platform database',
      journeyTitle: 'Provider journey',
      journeySubtitle: 'From business details to profile publication',
      ctaTitle: 'Ready to publish your business profile?',
      ctaDescription: 'Send your business details to the Biet Al Reef team for preparation and review before publication.',
      ctaLabel: 'Request a profile',
    },
    actions: [
      { ar: 'اطلب إنشاء ملف نشاطك', en: 'Request a business profile', hrefAr: '/providers/register', hrefEn: '/en/providers/register', icon: Building2, descAr: 'ابدأ تجهيز ملف النشاط المعتمد.', descEn: 'Start preparing an approved business profile.' },
      { ar: 'تصفح الأنشطة الرئيسية', en: 'Browse main activities', hrefAr: '/providers#provider-sectors', hrefEn: '/en/providers#provider-sectors', icon: Users, descAr: 'اختر النشاط ثم افتح التخصص المناسب.', descEn: 'Choose an activity, then open the right specialty.' },
      { ar: 'اطلب عرض سعر', en: 'Request a quotation', hrefAr: '/request-quote', hrefEn: '/en/request-quote', icon: FileText, descAr: 'أرسل احتياج المشروع بشكل منظم.', descEn: 'Send the project need in a structured way.' },
      { ar: 'تواصل مع فريق الانضمام', en: 'Talk to onboarding', hrefAr: WHATSAPP_URL, hrefEn: WHATSAPP_URL, icon: MessageCircle, descAr: 'احصل على توجيه مباشر قبل التسجيل.', descEn: 'Get direct guidance before registration.' },
    ],
    journey: [
      { ar: 'تعرف على آلية الانضمام', en: 'Learn how joining works', hrefAr: '/how-it-works', hrefEn: '/en/how-it-works' },
      { ar: 'جهز بيانات النشاط', en: 'Prepare business information', hrefAr: '/providers/register', hrefEn: '/en/providers/register' },
      { ar: 'راجع الخطط والأسعار', en: 'Review plans and pricing', hrefAr: '/pricing', hrefEn: '/en/pricing' },
      { ar: 'اطلب نشر الملف', en: 'Request profile publication', hrefAr: '/providers/register', hrefEn: '/en/providers/register' },
    ],
    ctaHrefAr: '/providers/register',
    ctaHrefEn: '/en/providers/register',
  },
  services_offers: {
    icon: Wrench,
    ar: {
      eyebrow: 'بوابة الخدمات والعروض',
      title: 'أكمل رحلتك داخل الخدمات والعروض',
      description: 'انتقل من النشاط والخدمة إلى موقع المشروع وطلب العرض ومزود الخدمة المناسب عبر شجرة واحدة واضحة.',
      activitiesTitle: 'أنشطة الخدمات والعروض',
      activitiesSubtitle: '7 أنشطة رئيسية من قاعدة بيانات المنصة',
      journeyTitle: 'مسار طلب الخدمة',
      journeySubtitle: 'من تحديد الاحتياج إلى عرض سعر واضح',
      ctaTitle: 'جاهز تطلب خدمة؟',
      ctaDescription: 'أرسل نوع الخدمة والموقع وتفاصيل المشروع حتى يتم توجيه الطلب بشكل صحيح.',
      ctaLabel: 'ابدأ الطلب',
    },
    en: {
      eyebrow: 'Services & Offers gateway',
      title: 'Continue through Services & Offers',
      description: 'Move from activity and service to project location, quotation request and the right provider through one clear journey.',
      activitiesTitle: 'Services & Offers activities',
      activitiesSubtitle: '7 main activities from the platform database',
      journeyTitle: 'Service request journey',
      journeySubtitle: 'From defining the need to a clear quotation',
      ctaTitle: 'Ready to request a service?',
      ctaDescription: 'Send the service type, location and project details so the request can be routed correctly.',
      ctaLabel: 'Start request',
    },
    actions: [
      { ar: 'ابدأ طلب خدمة', en: 'Start a service request', hrefAr: '/request-quote', hrefEn: '/en/request-quote', icon: Search, descAr: 'أرسل الخدمة والموقع والتفاصيل.', descEn: 'Send the service, location and details.' },
      { ar: 'تصفح الأنشطة الرئيسية', en: 'Browse main activities', hrefAr: '/services#services-list', hrefEn: '/en/services#services-list', icon: Wrench, descAr: 'افتح النشاط ثم الخدمة المناسبة.', descEn: 'Open the activity, then the right service.' },
      { ar: 'تصفح مزودي الخدمات', en: 'Browse service providers', hrefAr: '/providers', hrefEn: '/en/providers', icon: Users, descAr: 'انتقل إلى ملفات المزودين المنشورة.', descEn: 'Move to published provider profiles.' },
      { ar: 'تحدث مع فريق بيت الريف', en: 'Talk to Biet Al Reef', hrefAr: WHATSAPP_URL, hrefEn: WHATSAPP_URL, icon: MessageCircle, descAr: 'اطلب مساعدة مباشرة في تحديد المسار.', descEn: 'Ask for direct help choosing the right path.' },
    ],
    journey: [
      { ar: 'حدد نوع الخدمة', en: 'Define the service type', hrefAr: '/services#services-list', hrefEn: '/en/services#services-list' },
      { ar: 'أضف الموقع والمقاسات والصور', en: 'Add location, measurements and photos', hrefAr: '/request-quote', hrefEn: '/en/request-quote' },
      { ar: 'اطلب عرض سعر واضح', en: 'Request a clear quotation', hrefAr: '/request-quote', hrefEn: '/en/request-quote' },
      { ar: 'تابع مع مزود مناسب', en: 'Continue with a suitable provider', hrefAr: '/providers', hrefEn: '/en/providers' },
    ],
    ctaHrefAr: '/request-quote',
    ctaHrefEn: '/en/request-quote',
  },
  products_stores: {
    icon: Package,
    ar: {
      eyebrow: 'بوابة المنتجات والمتاجر',
      title: 'أكمل رحلتك داخل المنتجات والمتاجر',
      description: 'انتقل بين فئة المنتج والإمارة والمورد وطلب التسعير ضمن مسار واضح للمواد والتوريد.',
      activitiesTitle: 'أنشطة المنتجات والمتاجر',
      activitiesSubtitle: '4 أنشطة رئيسية من قاعدة بيانات المنصة',
      journeyTitle: 'مسار طلب التوريد',
      journeySubtitle: 'من تحديد المادة إلى المورد أو السعر',
      ctaTitle: 'تحتاج مواد أو منتجات لمشروعك؟',
      ctaDescription: 'أرسل نوع المنتج والكمية والمواصفات وموقع التوريد حتى يتم توجيه الطلب بشكل صحيح.',
      ctaLabel: 'اطلب تسعير المنتج',
    },
    en: {
      eyebrow: 'Products & Stores gateway',
      title: 'Continue through Products & Stores',
      description: 'Move between product category, emirate, supplier and pricing request through a clear materials and sourcing journey.',
      activitiesTitle: 'Products & Stores activities',
      activitiesSubtitle: '4 main activities from the platform database',
      journeyTitle: 'Sourcing journey',
      journeySubtitle: 'From defining the material to supplier or price',
      ctaTitle: 'Need materials or products for your project?',
      ctaDescription: 'Send the product type, quantity, specifications and supply location so the request can be routed correctly.',
      ctaLabel: 'Request product pricing',
    },
    actions: [
      { ar: 'تصفح المنتجات', en: 'Browse products', hrefAr: '/marketplace#marketplace-categories', hrefEn: '/en/marketplace#marketplace-categories', icon: Search, descAr: 'ابدأ من فئة المنتج أو المادة.', descEn: 'Start with the product or material category.' },
      { ar: 'اطلب تسعير مواد', en: 'Request material pricing', hrefAr: '/request-quote', hrefEn: '/en/request-quote', icon: ClipboardList, descAr: 'أرسل الكمية والمواصفات والموقع.', descEn: 'Send quantity, specifications and location.' },
      { ar: 'تصفح الموردين والمتاجر', en: 'Browse suppliers and stores', hrefAr: '/providers', hrefEn: '/en/providers', icon: Store, descAr: 'انتقل إلى ملفات المزودين المنشورة.', descEn: 'Move to published supplier profiles.' },
      { ar: 'مساعدة في التوريد', en: 'Sourcing help', hrefAr: WHATSAPP_URL, hrefEn: WHATSAPP_URL, icon: MessageCircle, descAr: 'احصل على توجيه مباشر لمسار التوريد.', descEn: 'Get direct guidance for the sourcing path.' },
    ],
    journey: [
      { ar: 'حدد نوع المنتج أو المادة', en: 'Define the product or material type', hrefAr: '/marketplace#marketplace-categories', hrefEn: '/en/marketplace#marketplace-categories' },
      { ar: 'أضف الكمية والمواصفات', en: 'Add quantity and specifications', hrefAr: '/request-quote', hrefEn: '/en/request-quote' },
      { ar: 'حدد موقع التوريد', en: 'Set the supply location', hrefAr: '/request-quote', hrefEn: '/en/request-quote' },
      { ar: 'استلم مسار السعر أو المورد', en: 'Receive pricing or supplier path', hrefAr: '/providers', hrefEn: '/en/providers' },
    ],
    ctaHrefAr: '/request-quote',
    ctaHrefEn: '/en/request-quote',
  },
};

const RELATED_LINKS = [
  { ar: 'دليل الإمارات', en: 'UAE Directory', hrefAr: '/uae', hrefEn: '/en/uae' },
  { ar: 'مزودو الخدمات', en: 'Service Providers', hrefAr: '/providers', hrefEn: '/en/providers' },
  { ar: 'الخدمات والعروض', en: 'Services & Offers', hrefAr: '/services', hrefEn: '/en/services' },
  { ar: 'المنتجات والمتاجر', en: 'Products & Stores', hrefAr: '/marketplace', hrefEn: '/en/marketplace' },
];

function localize(locale, item) {
  return {
    label: locale === 'en' ? item.en : item.ar,
    href: locale === 'en' ? item.hrefEn : item.hrefAr,
  };
}

function IconBadge({ icon: Icon }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FDFBF7] text-[#123A46] ring-1 ring-[#E6DCC8] shadow-inner">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

function SmartLink({ href, className, children }) {
  if (href.startsWith('http')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

function FooterCard({ title, subtitle, icon, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className="group rounded-[1.75rem] border border-[#E6DCC8] bg-white/95 p-5 shadow-[0_18px_45px_rgba(18,58,70,0.07)] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/80 hover:shadow-2xl hover:shadow-[#123A46]/10">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="flex min-w-0 items-center gap-3">
          <IconBadge icon={icon} />
          <span className="min-w-0">
            <span className="block text-base font-black leading-6 text-[#0F3F1A]">{title}</span>
            <span className="mt-1 block text-xs font-semibold leading-5 text-gray-500">{subtitle}</span>
          </span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-[#8A6A00] transition group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

function LinkList({ items, locale }) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const localized = item.label ? item : localize(locale, item);
        return (
          <SmartLink
            key={`${localized.label}-${localized.href}`}
            href={localized.href}
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#F1E7D5] bg-[#FDFBF7] px-4 py-3 text-sm font-bold leading-6 text-gray-700 transition hover:border-[#D4AF37] hover:bg-white hover:text-[#0F3F1A]"
          >
            <span>{localized.label}</span>
            <span className="text-[#B8922B]">{locale === 'en' ? '→' : '←'}</span>
          </SmartLink>
        );
      })}
    </div>
  );
}

function getActivityLinks(directoryCards, sectionKey, locale) {
  const databaseCards = directoryCards
    .filter((card) => card.sectionKey === sectionKey)
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((card) => ({
      label: card.title,
      href: getSectionCardHref(card, sectionKey, locale),
    }));

  if (databaseCards.length) return databaseCards;

  const fallback = sectionKey === 'products_stores'
    ? FALLBACK_ACTIVITIES.slice(3)
    : FALLBACK_ACTIVITIES;
  return fallback.map((activity) => ({
    label: locale === 'en' ? activity.en : activity.ar,
    href: getSectionCardHref({ activity }, sectionKey, locale),
  }));
}

export default function SectionSmartFooter({
  locale = 'ar',
  sectionKey,
  directoryCards = [],
}) {
  const isEn = locale === 'en';
  const config = CONFIG[sectionKey];
  const copy = config[locale];
  const activityLinks = getActivityLinks(directoryCards, sectionKey, locale);
  const emirateLinks = UAE_EMIRATES.map((emirate) => ({
    label: isEn ? emirate.nameEn : emirate.nameAr,
    href: `${isEn ? '/en' : ''}/uae/${emirate.slug}`,
  }));
  const ctaHref = isEn ? config.ctaHrefEn : config.ctaHrefAr;

  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="border-t border-[#E9DFC9] bg-[#FDFBF7] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center">
          <p className="text-sm font-black text-[#B8922B]">{copy.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{copy.title}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-7 text-gray-600 md:text-base">{copy.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {config.actions.map((item) => {
            const localized = localize(locale, item);
            return (
              <SmartLink
                key={item.hrefAr}
                href={localized.href}
                className="group rounded-[1.6rem] border border-[#E6DCC8] bg-white p-4 shadow-[0_16px_36px_rgba(18,58,70,0.06)] transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#123A46]/10"
              >
                <div className="mb-3"><IconBadge icon={item.icon} /></div>
                <h3 className="text-base font-black leading-7 text-[#0F3F1A]">{localized.label}</h3>
                <p className="mt-2 text-xs font-semibold leading-6 text-gray-500">{isEn ? item.descEn : item.descAr}</p>
              </SmartLink>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FooterCard defaultOpen title={copy.activitiesTitle} subtitle={copy.activitiesSubtitle} icon={config.icon}>
            <LinkList locale={locale} items={activityLinks} />
          </FooterCard>
          <FooterCard defaultOpen title={isEn ? 'Browse by emirate' : 'تصفح حسب الإمارة'} subtitle={isEn ? 'Seven UAE location paths' : 'مسارات الإمارات السبع'} icon={MapPinned}>
            <LinkList locale={locale} items={emirateLinks} />
          </FooterCard>
          <FooterCard title={copy.journeyTitle} subtitle={copy.journeySubtitle} icon={Route}>
            <LinkList locale={locale} items={config.journey} />
          </FooterCard>
          <FooterCard title={isEn ? 'Related platform sections' : 'أقسام مرتبطة داخل المنصة'} subtitle={isEn ? 'Continue without losing your path' : 'انتقل بين الأقسام بدون فقد المسار'} icon={Layers3}>
            <LinkList locale={locale} items={RELATED_LINKS} />
          </FooterCard>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <h3 className="text-xl font-black text-[#0F3F1A]">{copy.ctaTitle}</h3>
            <p className="mt-2 text-sm font-semibold leading-7 text-gray-600">{copy.ctaDescription}</p>
          </div>
          <Link href={ctaHref} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#123A46] px-7 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#1F170D] md:mt-0 md:w-auto">
            {copy.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
