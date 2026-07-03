'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Home,
  MapPin,
  UserRound,
  Wrench,
  ShoppingBag,
  Bot,
  Menu,
  X,
  Layers3,
  Building2,
  Tag,
  Star,
  CircleHelp,
  FileText,
  Handshake,
  Phone,
  Headphones,
  ShieldCheck,
  Cookie,
  LockKeyhole,
  ChevronDown,
  ChevronUp,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle
} from 'lucide-react';
import SmartAppLink from './SmartAppLink';

const drawerSections = [
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
      { href: '/weyaak', label: 'وياك AI' },
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
      { href: '/privacy', label: 'الخصوصية', icon: LockKeyhole },
      { href: '/legal', label: 'الشروط والأحكام', icon: ShieldCheck },
      { href: '/cookies', label: 'سياسة ملفات الارتباط', icon: Cookie }
    ]
  }
];

const desktopLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/uae', label: 'دليل الإمارات' },
  { href: '/providers', label: 'مزودو الخدمات' },
  { href: '/services', label: 'الخدمات والعروض' },
  { href: '/marketplace', label: 'المنتجات والمتاجر' },
  { href: '/weyaak', label: 'وياك' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' }
];

function isActivePath(pathname, href) {
  if (!href || href.startsWith('tel:') || href.startsWith('mailto:')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary-dark"
    >
      {children}
    </a>
  );
}

function DrawerSection({ section, isOpen, onToggle, pathname, onNavigate }) {
  const Icon = section.icon;

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-1 py-5 text-right text-[16px] font-black text-gray-900 transition hover:text-primary"
      >
        <span className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-primary" />
          {section.title}
        </span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>

      {isOpen && (
        <div className="space-y-2 pb-5 pr-10">
          {section.links.map((link) => {
            const active = isActivePath(pathname, link.href);
            const LinkIcon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-xl px-2 py-1.5 text-[15px] font-semibold transition ${
                  active ? 'text-primary' : 'text-gray-800 hover:text-primary'
                }`}
              >
                {LinkIcon ? <LinkIcon className="h-4 w-4 text-primary" /> : <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  const toggleSection = (sectionId) => {
    setOpenSection((current) => (current === sectionId ? null : sectionId));
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" dir="rtl">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <div className="relative h-12 w-12">
              <Image src="/logo.png" alt="بيت الريف" width={48} height={48} className="h-full w-full object-contain" priority />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-bold text-primary">بيت الريف</span>
              <span className="text-xs text-gray-500">منصة البناء الذكية</span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 text-sm md:flex">
            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-3 py-2 transition whitespace-nowrap ${
                  isActivePath(router.pathname, item.href) ? 'font-bold text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <SmartAppLink className="mr-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark whitespace-nowrap">
              تعرف على المنصة
            </SmartAppLink>
          </div>

          <button onClick={openMenu} className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-primary shadow-sm md:hidden" aria-label="فتح القائمة">
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" dir="rtl">
          <button type="button" aria-label="إغلاق القائمة" onClick={closeMenu} className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

          <aside className="absolute bottom-0 left-0 top-0 flex w-[88vw] max-w-[410px] flex-col overflow-hidden rounded-r-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between px-6 pt-5">
              <button type="button" onClick={closeMenu} className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100" aria-label="إغلاق القائمة">
                <X className="h-6 w-6" />
              </button>
              <span className="h-10 w-10" />
            </div>

            <div className="flex-1 overflow-y-auto px-7 pb-6 pt-2">
              <div className="mb-8 text-center">
                <Image src="/logo.png" alt="بيت الريف" width={112} height={112} className="mx-auto h-24 w-24 object-contain" priority />
                <p className="mx-auto mt-5 max-w-[280px] text-[15px] font-semibold leading-8 text-gray-800">
                  منصة البناء والصيانة الذكية في الإمارات تربط أصحاب المشاريع مع أفضل الموردين لتقدم لك تجربة موثوقة واحترافية.
                </p>
                <div className="mt-5 flex items-center justify-center gap-3" dir="ltr">
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

              <div className="space-y-0">
                {drawerSections.map((section) => (
                  <DrawerSection
                    key={section.id}
                    section={section}
                    isOpen={openSection === section.id}
                    onToggle={() => toggleSection(section.id)}
                    pathname={router.pathname}
                    onNavigate={closeMenu}
                  />
                ))}
              </div>
            </div>

            <div className="bg-primary px-5 py-4 pb-[max(env(safe-area-inset-bottom),16px)] text-center text-sm font-semibold text-white">
              جميع الحقوق محفوظة © 2026 بيت الريف
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
