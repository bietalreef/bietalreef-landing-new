import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
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
  ChevronUp
} from 'lucide-react';

const socialLinks = [
  {
    href: 'https://wa.me/971567856001',
    label: 'WhatsApp',
    icon: MessageCircle,
  },
  {
    href: 'https://www.instagram.com/bietalreef?igsh=Mzg0cDR4Y3YzbmJn',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://www.facebook.com/share/14fy6hGM7SJ/',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://youtube.com/@bietalreef?si=z78hlji5r9YheMGj',
    label: 'YouTube',
    icon: Youtube,
  },
  {
    href: 'https://www.tiktok.com/@bietalreef0?_r=1&_t=ZS-97iuKMbktCn',
    label: 'TikTok',
    icon: 'tiktok',
  },
  {
    href: 'https://www.linkedin.com/in/bietalreef',
    label: 'LinkedIn',
    icon: Linkedin,
  },
];

const footerSections = [
  {
    id: 'biet-alreef',
    title: 'بيت الريف',
    icon: Home,
    links: [
      { href: '/about', label: 'عن بيت الريف' },
      { href: '/why-biet-alreef', label: 'لماذا بيت الريف' },
      { href: '/how-it-works', label: 'كيف يعمل' }
    ]
  },
  {
    id: 'platform',
    title: 'المنصة',
    icon: Layers3,
    links: [
      { href: '/uae', label: 'دليل الإمارات' },
      { href: '/providers', label: 'مزودو الخدمات' },
      { href: '/services', label: 'الخدمات والعروض' },
      { href: '/marketplace', label: 'المنتجات والمتاجر' },
      { href: '/pricing', label: 'الأسعار' },
      { href: '/blog', label: 'المدونة' }
    ]
  },
  {
    id: 'partners',
    title: 'الشركاء',
    icon: Handshake,
    links: [
      { href: '/partners', label: 'كن شريكًا' },
      { href: '/providers/register', label: 'سجل كمزود خدمة' },
      { href: '/suppliers', label: 'الموردون' },
      { href: '/factories', label: 'المصانع' }
    ]
  },
  {
    id: 'support',
    title: 'الدعم',
    icon: Headphones,
    links: [
      { href: '/contact', label: 'تواصل معنا' },
      { href: '/faq', label: 'الأسئلة الشائعة' },
      { href: '/support-policy', label: 'سياسة الدعم' },
      { href: 'tel:+971567856001', label: 'اتصل بنا' }
    ]
  },
  {
    id: 'legal',
    title: 'القانونية',
    icon: ShieldCheck,
    links: [
      { href: '/privacy', label: 'الخصوصية' },
      { href: '/legal', label: 'الشروط والأحكام' },
      { href: '/cookies', label: 'سياسة ملفات الارتباط' }
    ]
  }
];

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 5.82c1.04.75 2.31 1.19 3.68 1.19v3.18c-1.34 0-2.6-.29-3.68-.82v5.87c0 3.58-2.9 6.48-6.48 6.48S3.64 18.82 3.64 15.24s2.9-6.48 6.48-6.48c.4 0 .79.04 1.17.11v3.33a3.14 3.14 0 1 0 2.14 2.98V2.28h3.17c.14 1.43.88 2.68 2 3.54Z" />
    </svg>
  );
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark"
    >
      {Icon === 'tiktok' ? <TikTokIcon className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
    </a>
  );
}

function FooterLink({ href, children }) {
  if (href?.startsWith('tel:') || href?.startsWith('mailto:')) {
    return (
      <a href={href} className="block py-1.5 text-sm font-medium leading-7 text-gray-600 transition hover:text-primary">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="block py-1.5 text-sm font-medium leading-7 text-gray-600 transition hover:text-primary">
      {children}
    </Link>
  );
}

function FooterAccordionSection({ section, isOpen, onToggle }) {
  const Icon = section.icon;

  return (
    <nav aria-label={section.title} className="border-b border-[#E6DCC8] md:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-right md:pointer-events-none md:cursor-default md:py-0"
        aria-expanded={isOpen}
      >
        <h2 className="flex items-center gap-2 text-base font-black text-primary">
          <Icon className="h-5 w-5" />
          {section.title}
        </h2>
        <span className="text-primary md:hidden">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} pb-5 pr-7 md:block md:pb-0 md:pr-0`}>
        <ul className="space-y-1">
          {section.links.map((link) => (
            <li key={link.href}>
              <FooterLink href={link.href}>{link.label}</FooterLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export { footerSections, socialLinks };

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionId) => {
    setOpenSection((current) => (current === sectionId ? null : sectionId));
  };

  return (
    <footer className="mt-16 border-t border-[#E6DCC8] bg-white text-gray-900 md:mt-24" dir="rtl" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="text-center md:text-right">
            <Image src="/logo.png" alt="بيت الريف" width={110} height={110} className="mx-auto h-24 w-24 object-contain md:mx-0" />
            <p className="mx-auto mt-4 max-w-xs text-sm font-medium leading-7 text-gray-600 md:mx-0">
              منصة البناء والصيانة الذكية في الإمارات تربط أصحاب المشاريع مع أفضل الموردين لتقدم لك تجربة موثوقة واحترافية.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start" dir="ltr">
              {socialLinks.map((item) => (
                <SocialLink key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div className="md:contents">
            {footerSections.map((section) => (
              <FooterAccordionSection
                key={section.id}
                section={section}
                isOpen={openSection === section.id}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary px-4 py-4 text-center text-sm font-semibold text-white">
        جميع الحقوق محفوظة © 2026 بيت الريف
      </div>
    </footer>
  );
}
