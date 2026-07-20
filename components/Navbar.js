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
  Rocket,
  Building2,
  ChevronDown,
  ChevronUp,
  Globe2
} from 'lucide-react';
import PlatformOverviewLink from './PlatformOverviewLink';

const primaryLinks = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/uae', label: 'دليل الإمارات', icon: MapPin },
  { href: '/providers', label: 'مزودو الخدمات', icon: UserRound },
  { href: '/services', label: 'الخدمات والعروض', icon: Wrench },
  { href: '/marketplace', label: 'المنتجات والمتاجر', icon: ShoppingBag }
];

const platformLinks = [
  { href: '/how-it-works', label: 'تعرّف على المنصة', icon: Rocket },
  { href: '/weyaak', label: 'وياك AI', icon: Bot }
];

const companyLinks = [
  { href: '/about', label: 'عن بيت الريف', icon: Building2 },
  { href: '/why-biet-alreef', label: 'لماذا بيت الريف', icon: Building2 }
];

function isActivePath(pathname, href) {
  if (!href || href.startsWith('tel:') || href.startsWith('mailto:')) return false;
  const cleanHref = href.split('?')[0];
  if (cleanHref === '/') return pathname === '/';
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

function DrawerLink({ href, label, icon: Icon, active, onClick, nested = false, rtl = true }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-semibold transition ${
        active ? 'bg-primary/8 text-primary' : 'text-gray-800 hover:bg-primary/5 hover:text-primary'
      } ${nested ? (rtl ? 'mr-8' : 'ml-8') : ''}`}
    >
      <Icon className={`h-5 w-5 ${active ? 'text-primary' : 'text-primary/90'}`} />
      <span>{label}</span>
    </Link>
  );
}

function DrawerSection({ title, icon: Icon, open, onToggle, children, rtl = true }) {
  return (
    <div className="border-t border-gray-100 pt-3">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-[15px] font-bold text-gray-800 hover:bg-primary/5 ${rtl ? 'text-right' : 'text-left'}`}
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </button>
      {open && <div className="mt-1 space-y-1 pb-2">{children}</div>}
    </div>
  );
}

function LanguageSwitch({ href, mobile = false, onClick, label = 'EN', ariaLabel = 'English version' }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${mobile ? 'h-10 px-2.5 text-[11px]' : 'min-h-[36px] px-3 py-1.5 text-xs'} inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E6DCC8] bg-white font-black text-primary shadow-sm transition hover:border-primary`}
      aria-label={ariaLabel}
    >
      <span>{label}</span>
      <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

export default function Navbar({ locale = 'ar' }) {
  const router = useRouter();
  const isEnglish = locale === 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const currentPath = (router.asPath || router.pathname || '/').split('?')[0];
  const languageHref = isEnglish
    ? (currentPath.replace(/^\/en(?=\/|$)/, '') || '/')
    : `/en${currentPath === '/' ? '' : currentPath}`;
  const prefix = isEnglish ? '/en' : '';
  const labels = isEnglish ? {
    home: 'Home', uae: 'UAE Directory', providers: 'Service Providers', services: 'Services & Offers', marketplace: 'Products & Stores',
    platform: 'Platform', about: 'Biet Al Reef', overview: 'Discover the platform', close: 'Close menu', open: 'Open menu',
  } : null;
  const localize = (items) => items.map((item) => ({
    ...item,
    href: `${prefix}${item.href === '/' ? '' : item.href}` || '/',
    label: !isEnglish ? item.label : ({ '/': labels.home, '/uae': labels.uae, '/providers': labels.providers, '/services': labels.services, '/marketplace': labels.marketplace, '/how-it-works': 'How it works', '/weyaak': 'Weyaak AI', '/about': 'About Biet Al Reef', '/why-biet-alreef': 'Why Biet Al Reef' }[item.href] || item.label),
  }));
  const localizedPrimaryLinks = localize(primaryLinks);
  const localizedPlatformLinks = localize(platformLinks);
  const localizedCompanyLinks = localize(companyLinks);

  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5" dir={isEnglish ? 'ltr' : 'rtl'}>
          <Link href={isEnglish ? '/en' : '/'} className="flex flex-shrink-0 items-center gap-2">
            <div className="relative h-11 w-11">
              <Image src="/logo.png" alt={isEnglish ? 'Biet Al Reef' : 'بيت الريف'} width={44} height={44} className="h-full w-full object-contain" priority />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-bold text-primary">{isEnglish ? 'Biet Al Reef' : 'بيت الريف'}</span>
              <span className="text-xs text-gray-500">{isEnglish ? 'Smart building platform' : 'منصة البناء الذكية'}</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitch href={languageHref} mobile label={isEnglish ? 'AR' : 'EN'} ariaLabel={isEnglish ? 'النسخة العربية' : 'English version'} />
            <button onClick={openMenu} className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-primary shadow-sm" aria-label={isEnglish ? labels.open : 'فتح القائمة'}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>
      <div className="h-[65px] w-full" aria-hidden="true" />

      {isOpen && (
        <div className="fixed inset-0 z-[100]" dir={isEnglish ? 'ltr' : 'rtl'}>
          <button type="button" aria-label={isEnglish ? labels.close : 'إغلاق القائمة'} onClick={closeMenu} className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

          <aside className="absolute bottom-0 left-0 top-0 flex w-[88vw] max-w-[410px] flex-col rounded-r-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <button type="button" onClick={closeMenu} className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100" aria-label={isEnglish ? labels.close : 'إغلاق القائمة'}>
                <X className="h-6 w-6" />
              </button>
              <Image src="/logo.png" alt="بيت الريف" width={72} height={72} className="h-16 w-16 object-contain" priority />
              <span className="h-10 w-10" />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-1">
                {localizedPrimaryLinks.map((item) => (
                  <DrawerLink key={item.href} {...item} rtl={!isEnglish} active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <DrawerSection title={isEnglish ? labels.platform : 'المنصة'} icon={Rocket} rtl={!isEnglish} open={platformOpen} onToggle={() => setPlatformOpen((value) => !value)}>
                  {localizedPlatformLinks.map((item) => (
                    <DrawerLink key={item.href} {...item} nested rtl={!isEnglish} active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                  ))}
                </DrawerSection>

                <DrawerSection title={isEnglish ? labels.about : 'بيت الريف'} icon={Building2} rtl={!isEnglish} open={companyOpen} onToggle={() => setCompanyOpen((value) => !value)}>
                  {localizedCompanyLinks.map((item) => (
                    <DrawerLink key={item.href} {...item} nested rtl={!isEnglish} active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                  ))}
                </DrawerSection>
              </div>
            </div>

            <div className="border-t border-gray-100 p-5 pb-[max(env(safe-area-inset-bottom),20px)]">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <span className="flex items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] px-4 py-3 text-sm font-black text-primary">{isEnglish ? 'English' : 'AE عربي'}</span>
                <LanguageSwitch href={languageHref} mobile onClick={closeMenu} label={isEnglish ? 'AR' : 'EN'} ariaLabel={isEnglish ? 'النسخة العربية' : 'English version'} />
              </div>
              <PlatformOverviewLink className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-center text-base font-black text-white shadow-lg" onClick={closeMenu}>
                {isEnglish ? labels.overview : 'تعرّف على المنصة'}
                <Rocket className="h-4 w-4" />
              </PlatformOverviewLink>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
