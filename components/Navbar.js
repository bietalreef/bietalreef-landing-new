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
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import SmartAppLink from './SmartAppLink';

const primaryLinks = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/uae', label: 'دليل الإمارات', icon: MapPin },
  { href: '/providers', label: 'مزودو الخدمات', icon: UserRound },
  { href: '/services', label: 'الخدمات والعروض', icon: Wrench },
  { href: '/marketplace', label: 'المنتجات والمتاجر', icon: ShoppingBag }
];

const platformLinks = [
  { href: '/weyaak', label: 'وياك AI', icon: Bot },
  { href: '/tools', label: 'الأدوات', icon: BriefcaseBusiness }
];

const companyLinks = [
  { href: '/about', label: 'عن بيت الريف', icon: Building2 },
  { href: '/why-biet-alreef', label: 'لماذا بيت الريف', icon: Building2 },
  { href: '/how-it-works', label: 'كيف يعمل', icon: Building2 }
];

const desktopLinks = [
  ...primaryLinks,
  { href: '/tools', label: 'الأدوات', icon: BriefcaseBusiness },
  { href: '/weyaak', label: 'وياك', icon: Bot },
  { href: '/about', label: 'من نحن', icon: Building2 },
  { href: '/contact', label: 'تواصل معنا', icon: Building2 }
];

function isActivePath(pathname, href) {
  if (!href || href.startsWith('tel:') || href.startsWith('mailto:')) return false;
  const cleanHref = href.split('?')[0];
  if (cleanHref === '/') return pathname === '/';
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

function DrawerLink({ href, label, icon: Icon, active, onClick, nested = false }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-semibold transition ${
        active ? 'bg-primary/8 text-primary' : 'text-gray-800 hover:bg-primary/5 hover:text-primary'
      } ${nested ? 'mr-8' : ''}`}
    >
      <Icon className={`h-5 w-5 ${active ? 'text-primary' : 'text-primary/90'}`} />
      <span>{label}</span>
    </Link>
  );
}

function DrawerSection({ title, icon: Icon, open, onToggle, children }) {
  return (
    <div className="border-t border-gray-100 pt-3">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-right text-[15px] font-bold text-gray-800 hover:bg-primary/5"
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

function LanguageSwitch({ mobile = false, onClick }) {
  return (
    <Link
      href="/en"
      onClick={onClick}
      className={`${mobile ? 'h-11 px-3' : 'min-h-[40px] px-4 py-2'} inline-flex items-center justify-center gap-2 rounded-xl border border-[#E6DCC8] bg-white text-sm font-black text-primary shadow-sm transition hover:border-primary`}
      aria-label="English version"
    >
      <span className="text-base" aria-hidden="true">US</span>
      <span>EN</span>
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

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
            <LanguageSwitch />
            <SmartAppLink className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark whitespace-nowrap">
              تعرف على المنصة
            </SmartAppLink>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitch mobile />
            <button onClick={openMenu} className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-primary shadow-sm" aria-label="فتح القائمة">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" dir="rtl">
          <button type="button" aria-label="إغلاق القائمة" onClick={closeMenu} className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

          <aside className="absolute bottom-0 left-0 top-0 flex w-[88vw] max-w-[410px] flex-col rounded-r-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <button type="button" onClick={closeMenu} className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100" aria-label="إغلاق القائمة">
                <X className="h-6 w-6" />
              </button>
              <Image src="/logo.png" alt="بيت الريف" width={72} height={72} className="h-16 w-16 object-contain" priority />
              <span className="h-10 w-10" />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-1">
                {primaryLinks.map((item) => (
                  <DrawerLink key={item.href} {...item} active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <DrawerSection title="المنصة" icon={Rocket} open={platformOpen} onToggle={() => setPlatformOpen((value) => !value)}>
                  {platformLinks.map((item) => (
                    <DrawerLink key={item.href} {...item} nested active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                  ))}
                </DrawerSection>

                <DrawerSection title="بيت الريف" icon={Building2} open={companyOpen} onToggle={() => setCompanyOpen((value) => !value)}>
                  {companyLinks.map((item) => (
                    <DrawerLink key={item.href} {...item} nested active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                  ))}
                </DrawerSection>
              </div>
            </div>

            <div className="border-t border-gray-100 p-5 pb-[max(env(safe-area-inset-bottom),20px)]">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <span className="flex items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] px-4 py-3 text-sm font-black text-primary">AE عربي</span>
                <LanguageSwitch mobile onClick={closeMenu} />
              </div>
              <SmartAppLink className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-center text-base font-black text-white shadow-lg" onClick={closeMenu}>
                تعرف على المنصة
                <Rocket className="h-4 w-4" />
              </SmartAppLink>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
