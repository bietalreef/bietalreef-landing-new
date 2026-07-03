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

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark"
    >
      {children}
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

export { footerSections };

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
            <div className="mt-5 flex items-center justify-center gap-3 md:justify-start" dir="ltr">
              <SocialLink href="https://wa.me/971567856001" label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/" label="Instagram">
                <Instagram className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://www.facebook.com/" label="Facebook">
                <Facebook className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://www.youtube.com/" label="YouTube">
                <Youtube className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/" label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </SocialLink>
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
