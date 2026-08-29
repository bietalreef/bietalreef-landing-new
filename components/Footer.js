import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UniversalRequestCTA from './UniversalRequestCTA';
import PlatformAccessActions from './PlatformAccessActions';
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
    promoEyebrow: 'بيت الريف للأعمال',
    promoTitle: 'بيت الريف معك في المكتب، في الموقع، وفي كل مكان',
    promoText: 'استخدم منصة بيت الريف من متصفح الكمبيوتر في المكتب، واستمر من تطبيق بيت الريف على Android أثناء وجودك في موقع العمل أو أثناء التنقل.',
    description: 'منصة رقمية إماراتية تساعد أصحاب المشاريع على اكتشاف مزودي الخدمات، وتمكّن الشركات والموردين والورش والحرفيين من تقديم أعمالهم وخدماتهم ومنتجاتهم بصورة واضحة ومنظمة.',
    rights: 'جميع الحقوق محفوظة © 2026 بيت الريف',
    sections: [
      { id: 'biet-alreef', title: 'بيت الريف', icon: Home, links: [['/about', 'عن بيت الريف'], ['/why-biet-alreef', 'لماذا بيت الريف']] },
      { id: 'platform', title: 'المنصة', icon: Layers3, links: [['/platform-for-business', 'كيف تعمل منصة بيت الريف للأعمال'], ['/join-provider', 'انضم كمزود خدمة إلى بيت الريف'], ['/business-solutions', 'حلول وخدمات بيت الريف للأعمال'], ['/start-your-store', 'أنشئ متجرك على بيت الريف'], ['/business-plans', 'خطط الأعمال والاشتراكات'], ['/blog', 'المدونة']] },
      { id: 'partners', title: 'الشركاء', icon: Handshake, links: [['/partner-with-biet-alreef', 'الشراكة مع بيت الريف'], ['/join-biet-alreef', 'ضم شركتك إلى بيت الريف'], ['/google-cloud-biet-alreef', 'Google Cloud | بيت الريف'], ['/google-workspace-biet-alreef', 'Google Workspace | بيت الريف'], ['/weyaak-ai', 'وياك – الذكاء الاصطناعي من بيت الريف'], ['/suppliers-biet-alreef', 'الموردون مع بيت الريف'], ['/factories-workshops-biet-alreef', 'المصانع والورش مع بيت الريف']] },
      { id: 'support', title: 'الدعم', icon: Headphones, links: [['/contact', 'تواصل معنا'], ['/faq', 'الأسئلة الشائعة'], ['/support-policy', 'سياسة الدعم'], ['tel:+971567856001', 'اتصل بنا']] },
      { id: 'legal', title: 'القانونية', icon: ShieldCheck, links: [['/privacy', 'سياسة الخصوصية'], ['/legal', 'الشروط والأحكام'], ['/cookies', 'سياسة ملفات الارتباط'], ['/refund-policy', 'سياسة الاسترداد']] },
    ],
  },
  en: {
    dir: 'ltr',
    home: '/en',
    prefix: '/en',
    promoEyebrow: 'Biet Al Reef for Business',
    promoTitle: 'Biet Al Reef with you in the office, on site, and everywhere',
    promoText: 'Use Biet Al Reef from your desktop browser in the office and continue from the Android app while you are on site or on the move.',
    description: 'A UAE digital platform that helps project owners discover service providers and enables companies, suppliers, workshops and professionals to present their work, services and products clearly.',
    rights: 'All rights reserved © 2026 Biet Al Reef',
    sections: [
      { id: 'biet-alreef', title: 'Biet Al Reef', icon: Home, links: [['/en/about', 'About Biet Al Reef'], ['/en/why-biet-alreef', 'Why Biet Al Reef']] },
      { id: 'platform', title: 'Platform', icon: Layers3, links: [['/en/platform-for-business', 'How Biet Al Reef works for business'], ['/en/join-provider', 'Join Biet Al Reef as a service provider'], ['/en/business-solutions', 'Biet Al Reef business solutions'], ['/en/start-your-store', 'Start your store on Biet Al Reef'], ['/en/business-plans', 'Business plans & subscriptions'], ['/en/blog', 'Blog']] },
      { id: 'partners', title: 'Partners', icon: Handshake, links: [['/en/partner-with-biet-alreef', 'Partner with Biet Al Reef'], ['/en/join-biet-alreef', 'Bring your company to Biet Al Reef'], ['/en/google-cloud-biet-alreef', 'Google Cloud | Biet Al Reef'], ['/en/google-workspace-biet-alreef', 'Google Workspace | Biet Al Reef'], ['/en/weyaak-ai', 'Weyaak – AI from Biet Al Reef'], ['/en/suppliers-biet-alreef', 'Suppliers with Biet Al Reef'], ['/en/factories-workshops-biet-alreef', 'Factories & workshops with Biet Al Reef']] },
      { id: 'support', title: 'Support', icon: Headphones, links: [['/en/contact', 'Contact us'], ['/en/faq', 'FAQ'], ['/en/support-policy', 'Support policy'], ['tel:+971567856001', 'Call us']] },
      { id: 'legal', title: 'Legal', icon: ShieldCheck, links: [['/en/privacy', 'Privacy Policy'], ['/en/legal', 'Terms & Conditions'], ['/en/cookies', 'Cookie Policy'], ['/en/refund-policy', 'Refund policy']] },
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
  if (href?.startsWith('http')) return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
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
            <PlatformAccessActions locale={language} compact className="mt-5 w-full shrink-0 md:mt-0 md:max-w-xs" />
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
