import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UniversalRequestCTA from './UniversalRequestCTA';
import { getEmirate } from '../data/siteTaxonomy';
import {
  Home,
  MapPin,
  Layers3,
  Handshake,
  Headphones,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const socialLinks = [
  { href: 'https://wa.me/971567856001', label: 'WhatsApp', icon: MessageCircle },
  { href: 'https://www.instagram.com/bietalreef?igsh=Mzg0cDR4Y3YzbmJn', label: 'Instagram', icon: Instagram },
  { href: 'https://www.facebook.com/share/14fy6hGM7SJ/', label: 'Facebook', icon: Facebook },
  { href: 'https://youtube.com/@bietalreef', label: 'YouTube', icon: Youtube },
  { href: 'https://www.tiktok.com/@bietalreef0?_r=1&_t=ZS-97iuKMbktCn', label: 'TikTok', icon: 'tiktok' },
  { href: 'https://www.linkedin.com/in/bietalreef', label: 'LinkedIn', icon: Linkedin },
];

const copy = {
  ar: {
    dir: 'rtl',
    home: '/',
    prefix: '',
    promoEyebrow: 'حضور رقمي يناسب مرحلة نشاطك',
    promoTitle: 'نظّم خدماتك وأعمالك في ملف واضح يسهل اكتشافه وفهمه',
    promoText: 'تساعدك خطط بيت الريف على تقديم بيانات نشاطك بصورة منظمة داخل المسارات المناسبة. مستوى الظهور يعتمد على الخطة واكتمال البيانات وتوافق النشاط والموقع، دون ضمان ترتيب أو عدد محدد من الطلبات.',
    promoAction: 'استعرض الخطط والأسعار',
    description: 'منصة رقمية إماراتية تساعد أصحاب المشاريع على اكتشاف مزودي خدمات البناء المناسبين، وتمكّن الشركات والموردين والورش والحرفيين من تقديم خبراتهم بصورة واضحة ومنظمة.',
    rights: 'جميع الحقوق محفوظة © 2026 بيت الريف',
    sections: [
      { id: 'biet-alreef', title: 'بيت الريف', icon: Home, links: [['/about', 'عن بيت الريف'], ['/why-biet-alreef', 'لماذا بيت الريف']] },
      { id: 'platform', title: 'المنصة', icon: Layers3, links: [['/how-it-works', 'تعرّف على المنصة وكيف تعمل'], ['/uae', 'دليل الإمارات'], ['/providers', 'مزودو الخدمات'], ['/services', 'الخدمات والعروض'], ['/marketplace', 'المنتجات والمتاجر'], ['/pricing', 'الخطط والأسعار'], ['/blog', 'المدونة']] },
      { id: 'partners', title: 'الشركاء', icon: Handshake, links: [['/partners', 'كن شريكًا'], ['/providers/register', 'اطلب إضافة نشاطك'], ['/suppliers', 'الموردون'], ['/factories', 'المصانع والورش']] },
      { id: 'support', title: 'الدعم', icon: Headphones, links: [['/contact', 'تواصل معنا'], ['/faq', 'الأسئلة الشائعة'], ['/support-policy', 'سياسة الدعم'], ['tel:+971567856001', 'اتصل بنا']] },
      { id: 'legal', title: 'القانونية', icon: ShieldCheck, links: [['/privacy', 'الخصوصية'], ['/legal', 'الشروط والأحكام'], ['/cookies', 'سياسة ملفات الارتباط']] },
    ],
  },
  en: {
    dir: 'ltr',
    home: '/en',
    prefix: '/en',
    promoEyebrow: 'A digital presence that fits your business stage',
    promoTitle: 'Organise your services and work in a profile that is easy to discover and understand',
    promoText: 'Biet Al Reef plans help present your business information clearly across the relevant paths. Visibility depends on the plan, data completeness and the match between activity and location, without guaranteeing ranking or a fixed number of requests.',
    promoAction: 'View plans and pricing',
    description: 'A UAE digital platform that helps project owners discover suitable construction providers and enables companies, suppliers, workshops and skilled professionals to present their expertise clearly.',
    rights: 'All rights reserved © 2026 Biet Al Reef',
    sections: [
      { id: 'biet-alreef', title: 'Biet Al Reef', icon: Home, links: [['/en/about', 'About Biet Al Reef'], ['/en/why-biet-alreef', 'Why Biet Al Reef']] },
      { id: 'platform', title: 'Platform', icon: Layers3, links: [['/en/how-it-works', 'Learn how the platform works'], ['/en/uae', 'UAE Directory'], ['/en/providers', 'Service Providers'], ['/en/services', 'Services & Offers'], ['/en/marketplace', 'Products & Stores'], ['/en/pricing', 'Plans & Pricing'], ['/en/blog', 'Blog']] },
      { id: 'partners', title: 'Partners', icon: Handshake, links: [['/en/partners', 'Become a partner'], ['/en/providers/register', 'Request a business profile'], ['/en/suppliers', 'Suppliers'], ['/en/factories', 'Factories & Workshops']] },
      { id: 'support', title: 'Support', icon: Headphones, links: [['/en/contact', 'Contact us'], ['/en/faq', 'FAQ'], ['/en/support-policy', 'Support policy'], ['tel:+971567856001', 'Call us']] },
      { id: 'legal', title: 'Legal', icon: ShieldCheck, links: [['/en/privacy', 'Privacy Policy'], ['/en/legal', 'Terms & Conditions'], ['/en/cookies', 'Cookie Policy']] },
    ],
  },
};

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 5.82c1.04.75 2.31 1.19 3.68 1.19v3.18c-1.34 0-2.6-.29-3.68-.82v5.87c0 3.58-2.9 6.48-6.48 6.48S3.64 18.82 3.64 15.24s2.9-6.48 6.48-6.48c.4 0 .79.04 1.17.11v3.33a3.14 3.14 0 1 0 2.14 2.98V2.28h3.17c.14 1.43.88 2.68 2 3.54Z" />
    </svg>
  );
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a href={href} aria-label={label} title={label} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark">
      {Icon === 'tiktok' ? <TikTokIcon className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
    </a>
  );
}

function FooterLink({ href, children }) {
  const className = 'block py-1.5 text-sm font-medium leading-6 text-gray-600 transition [overflow-wrap:anywhere] hover:text-primary';
  if (href?.startsWith('tel:') || href?.startsWith('mailto:')) return <a href={href} className={className}>{children}</a>;
  return <Link href={href} className={className}>{children}</Link>;
}

function FooterAccordionSection({ section, isOpen, onToggle, textAlign }) {
  const Icon = section.icon;
  return (
    <nav aria-label={section.title} className="min-w-0 border-b border-[#E6DCC8] lg:border-b-0">
      <button type="button" onClick={onToggle} className={`flex w-full items-center justify-between py-5 ${textAlign} lg:pointer-events-none lg:cursor-default lg:py-0`} aria-expanded={isOpen}>
        <h2 className="flex min-w-0 items-center gap-2 text-base font-black leading-6 text-primary"><Icon className="h-5 w-5 shrink-0" /><span>{section.title}</span></h2>
        <span className="shrink-0 text-primary lg:hidden">{isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</span>
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} pb-5 lg:block lg:pb-0`}>
        <ul className="space-y-1">{section.links.map(([href, label]) => <li key={`${section.id}-${href}`}><FooterLink href={href}>{label}</FooterLink></li>)}</ul>
      </div>
    </nav>
  );
}

function EmirateFooterContext({ language, emirate }) {
  if (!emirate) return null;
  const isEnglish = language === 'en';
  const root = `${isEnglish ? '/en' : ''}/uae/${emirate.slug}`;
  const name = isEnglish ? emirate.nameEn : emirate.nameAr;

  return (
    <nav
      aria-label={isEnglish ? `${name} directory links` : `روابط دليل ${name}`}
      data-emirate-footer={emirate.slug}
      className={`mb-9 rounded-[2rem] border border-[#D4AF37]/35 bg-[#F7FBF8] p-6 shadow-[0_14px_35px_rgba(15,63,26,0.07)] ${isEnglish ? 'text-left' : 'text-right'}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-black text-[#8A611B]">
            <MapPin className="h-4 w-4" />
            {isEnglish ? `${name} directory` : `دليل ${name}`}
          </p>
          <h2 className="mt-2 text-xl font-black text-[#0F3F1A]">
            {isEnglish ? `Explore providers and services across ${name}` : `استكشف مزودي الخدمات والأعمال في ${name}`}
          </h2>
        </div>
        <Link href={root} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0F3F1A] px-5 py-2.5 text-sm font-black text-white">
          {isEnglish ? `Open ${name}` : `فتح دليل ${name}`}
        </Link>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {emirate.areas.map((area) => (
          <li key={area.slug}>
            <Link href={`${root}/${area.slug}`} className="inline-flex rounded-full border border-[#D8C9A8] bg-white px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-primary hover:text-primary">
              {isEnglish ? area.nameEn : area.nameAr}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { socialLinks };

export default function Footer({ locale = 'ar', showRequestCTA = true }) {
  const router = useRouter();
  const language = locale === 'en' ? 'en' : 'ar';
  const t = copy[language];
  const [openSection, setOpenSection] = useState(null);
  const textAlign = language === 'en' ? 'text-left' : 'text-right';
  const desktopAlign = language === 'en' ? 'md:text-left' : 'md:text-right';
  const desktopSocial = language === 'en' ? 'md:justify-start' : 'md:justify-end';
  const pathParts = String(router.asPath || '').split(/[?#]/)[0].split('/').filter(Boolean);
  const uaeIndex = pathParts.indexOf('uae');
  const activeEmirate = uaeIndex >= 0 ? getEmirate(pathParts[uaeIndex + 1]) : null;

  return (
    <>
      {showRequestCTA ? <UniversalRequestCTA locale={language} /> : null}
      <footer className="border-t border-[#E6DCC8] bg-white text-gray-900" dir={t.dir} role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <EmirateFooterContext language={language} emirate={activeEmirate} />
          <div className={`mb-9 rounded-[2rem] border border-[#D4AF37]/35 bg-[#FFF9E8] p-6 shadow-[0_16px_40px_rgba(15,63,26,0.08)] md:flex md:items-center md:justify-between md:gap-8 ${textAlign}`}>
            <div>
              <p className="text-sm font-black text-[#A27E18]">{t.promoEyebrow}</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[#102F18]">{t.promoTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-gray-600">{t.promoText}</p>
            </div>
            <Link href={`${t.prefix}/pricing`} className="mt-5 inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-2xl bg-[#102F18] px-7 py-3 font-black text-white transition hover:bg-[#174A27] md:mt-0 md:w-auto">{t.promoAction}</Link>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-0 lg:grid-cols-2 lg:gap-y-8 xl:grid-cols-[1.4fr_repeat(5,minmax(0,1fr))]">
            <div className={`text-center lg:col-span-2 xl:col-span-1 ${desktopAlign}`}>
              <Link href={t.home} aria-label={language === 'en' ? 'Biet Al Reef home' : 'الرئيسية'}>
                <Image src="/icons/logo-512.webp" alt={language === 'en' ? 'Biet Al Reef' : 'بيت الريف'} width={110} height={110} className={`mx-auto h-24 w-24 object-contain ${language === 'en' ? 'md:ml-0' : 'md:mr-0'}`} />
              </Link>
              <p className={`mx-auto mt-4 max-w-xs text-sm font-medium leading-7 text-gray-600 ${language === 'en' ? 'md:ml-0' : 'md:mr-0'}`}>{t.description}</p>
              <div className={`mt-5 flex flex-wrap items-center justify-center gap-3 ${desktopSocial}`} dir="ltr">{socialLinks.map((item) => <SocialLink key={item.label} {...item} />)}</div>
            </div>
            <div className="lg:contents">
              {t.sections.map((section) => <FooterAccordionSection key={section.id} section={section} textAlign={textAlign} isOpen={openSection === section.id} onToggle={() => setOpenSection((current) => current === section.id ? null : section.id)} />)}
            </div>
          </div>
        </div>
        <div className="bg-primary px-4 py-4 text-center text-sm font-semibold text-white">{t.rights}</div>
      </footer>
    </>
  );
}
