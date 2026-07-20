import Link from 'next/link';
import { Building2, Users, FileText, MessageCircle, Wrench, MapPinned, BookOpen, ChevronDown } from 'lucide-react';
import { UAE_EMIRATES } from '../data/siteTaxonomy';

const providerActions = [
  { ar: 'اطلب إنشاء ملف نشاطك', en: 'Request a business profile', hrefAr: '/providers/register', hrefEn: '/en/providers/register', icon: Building2 },
  { ar: 'تصفح المزودين المتاحين', en: 'Browse available providers', hrefAr: '#provider-sectors', hrefEn: '#provider-sectors', icon: Users },
  { ar: 'اطلب عرض سعر', en: 'Request a quotation', hrefAr: '/request-quote', hrefEn: '/en/request-quote', icon: FileText },
  { ar: 'تواصل مع فريق الانضمام', en: 'Talk to onboarding', hrefAr: 'https://wa.me/971567856001', hrefEn: 'https://wa.me/971567856001', icon: MessageCircle },
];

const providerSpecialties = [
  { ar: 'مقاولات عامة', en: 'General contracting', slug: 'general-contracting' },
  { ar: 'مكاتب هندسية', en: 'Engineering offices', slug: 'engineering-consultants' },
  { ar: 'مواد بناء', en: 'Building materials', slug: 'building-materials' },
  { ar: 'صيانة عامة', en: 'General maintenance', slug: 'general-maintenance' },
  { ar: 'ألمنيوم وزجاج', en: 'Aluminium and glass', slug: 'aluminium-glass' },
  { ar: 'نجارة وأخشاب', en: 'Carpentry and wood', slug: 'carpentry' },
  { ar: 'تنظيف', en: 'Cleaning', slug: 'cleaning-services' },
  { ar: 'تأجير معدات', en: 'Equipment rental', slug: 'equipment-rental' },
  { ar: 'رخام وسيراميك', en: 'Marble and ceramic', slug: 'marble-ceramic' },
  { ar: 'أنظمة ذكية وكاميرات', en: 'Smart systems and cameras', slug: 'smart-systems' },
  { ar: 'لاندسكيب', en: 'Landscaping', slug: 'landscaping' },
  { ar: 'مصانع وورش', en: 'Factories and workshops', slug: 'workshops' },
];

const providerContent = [
  { ar: 'كيف يظهر مزود الخدمة بشكل احترافي؟', en: 'How can a provider appear professionally?', href: '/providers/register' },
  { ar: 'ما البيانات المطلوبة قبل اعتماد مزود؟', en: 'What details are needed before approval?', href: '/providers/register' },
  { ar: 'كيف يرسل العميل طلب سعر واضح؟', en: 'How does a client send a clear request?', href: '/request-quote' },
  { ar: 'الفرق بين الدليل ومزودي الخدمات', en: 'Directory vs service providers', href: '/providers' },
];

function hrefFor(locale, item) {
  if (item.hrefAr || item.hrefEn) return locale === 'en' ? item.hrefEn : item.hrefAr;
  return locale === 'en' ? `/en/providers/specialty/${item.slug}` : `/providers/specialty/${item.slug}`;
}

function labelFor(locale, item) {
  return locale === 'en' ? item.en : item.ar;
}

function IconBadge({ icon: Icon }) {
  return <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FDFBF7] text-[#0F3F1A] ring-1 ring-[#E6DCC8] shadow-inner"><Icon className="h-5 w-5" aria-hidden="true" /></span>;
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

function LinkList({ items, locale, resolver }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Link key={`${labelFor(locale, item)}-${hrefFor(locale, item)}`} href={resolver ? resolver(item) : hrefFor(locale, item)} className="flex items-center justify-between gap-3 rounded-2xl border border-[#F1E7D5] bg-[#FDFBF7] px-4 py-3 text-sm font-bold leading-6 text-gray-700 transition hover:border-[#D4AF37] hover:bg-white hover:text-[#0F3F1A]">
          <span>{labelFor(locale, item)}</span>
          <span className="text-[#B8922B]">{locale === 'en' ? '→' : '←'}</span>
        </Link>
      ))}
    </div>
  );
}

export default function ProvidersSmartFooter({ locale = 'ar' }) {
  const isEn = locale === 'en';
  const dir = isEn ? 'ltr' : 'rtl';
  const emirateLinks = UAE_EMIRATES.map((emirate) => ({
    ar: emirate.nameAr,
    en: emirate.nameEn,
    hrefAr: `/uae/${emirate.slug}`,
    hrefEn: `/en/uae/${emirate.slug}`,
  }));

  return (
    <section dir={dir} className="bg-[#FDFBF7] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center">
          <p className="text-sm font-black text-[#B8922B]">{isEn ? 'Providers gateway' : 'بوابة مزودي الخدمات'}</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{isEn ? 'Smart footer for service providers' : 'أكمل رحلتك داخل مزودي الخدمات'}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-7 text-gray-600 md:text-base">
            {isEn ? 'A dedicated provider footer with business profile requests, provider specialties, UAE coverage and useful provider content.' : 'فوتر مستقل لمزودي الخدمات يجمع طلب إنشاء الملف، التخصصات، الانتشار حسب الإمارات، والمحتوى المفيد للمزودين بدون ازدحام الصفحة.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {providerActions.map((item) => (
            <Link key={item.hrefAr} href={hrefFor(locale, item)} className="group rounded-[1.6rem] border border-[#E6DCC8] bg-white p-4 shadow-[0_16px_36px_rgba(18,58,70,0.06)] transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#123A46]/10">
              <div className="mb-3"><IconBadge icon={item.icon} /></div>
              <h3 className="text-base font-black leading-7 text-[#0F3F1A]">{labelFor(locale, item)}</h3>
              <p className="mt-2 text-xs font-semibold leading-6 text-gray-500">{isEn ? 'Go to the right provider action.' : 'انتقل مباشرة إلى إجراء مناسب لمزود الخدمة.'}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <FooterCard defaultOpen title={isEn ? 'Provider specialties' : 'تخصصات مزودي الخدمات'} subtitle={isEn ? 'Extra specialties without crowding cards' : 'تخصصات إضافية بدون تضخيم الكروت'} icon={Wrench}>
            <LinkList locale={locale} items={providerSpecialties} />
          </FooterCard>

          <FooterCard defaultOpen title={isEn ? 'Provider coverage by emirate' : 'انتشار المزودين حسب الإمارة'} subtitle={isEn ? 'Location paths for provider discovery' : 'مسارات مكانية لاكتشاف المزودين'} icon={MapPinned}>
            <LinkList locale={locale} items={emirateLinks} />
          </FooterCard>

          <FooterCard title={isEn ? 'Useful provider content' : 'محتوى مفيد للمزودين'} subtitle={isEn ? 'Registration and request guidance' : 'إرشاد للتسجيل والطلبات'} icon={BookOpen}>
            <LinkList locale={locale} items={providerContent} resolver={(item) => (locale === 'en' && !item.href.startsWith('/en') ? `/en${item.href}` : item.href)} />
          </FooterCard>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <h3 className="text-xl font-black text-[#0F3F1A]">{isEn ? 'Ready to publish your business profile?' : 'جاهز تنشر ملف نشاطك؟'}</h3>
            <p className="mt-2 text-sm font-semibold leading-7 text-gray-600">{isEn ? 'Send the details to the Biet Al Reef team to prepare and review the profile before publication.' : 'أرسل البيانات إلى فريق بيت الريف لتجهيز الملف ومراجعته قبل النشر.'}</p>
          </div>
          <Link href={isEn ? '/en/providers/register' : '/providers/register'} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#1F170D] md:mt-0 md:w-auto">
            {isEn ? 'Request a profile' : 'اطلب إنشاء الملف'}
          </Link>
        </div>
      </div>
    </section>
  );
}
