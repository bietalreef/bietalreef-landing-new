'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SmartAppLink from './SmartAppLink';

const serviceLinks = [
  { href: '/categories/general-contracting', label: 'مقاولات عامة' },
  { href: '/categories/interior-design', label: 'التصميم الداخلي' },
  { href: '/categories/engineering-consultants', label: 'المكاتب الهندسية' },
  { href: '/categories/general-maintenance', label: 'الصيانة العامة' },
  { href: '/categories/equipment-rental', label: 'تأجير المعدات' },
  { href: '/building-materials-uae', label: 'مواد البناء' },
  { href: '/categories/furniture-decor', label: 'الأثاث والديكور' },
];

const mainLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/uae', label: 'دليل الإمارات' },
  { href: '/providers', label: 'مزودو الخدمات' },
  { href: '/marketplace', label: 'السوق' },
  { href: '/weyaak', label: 'وياك' },
  { href: '/tools', label: 'الأدوات' },
  { href: '/about', label: 'من نحن' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    setShowServices(false);
  };

  return (
    <header className="w-full bg-white shadow-soft sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-12 h-12 relative">
            <Image src="/logo.png" alt="بيت الريف" width={48} height={48} className="w-full h-full object-contain" priority />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-primary text-sm">بيت الريف</span>
            <span className="text-xs text-gray-500">منصة البناء الذكية</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm">
          {mainLinks.slice(0, 1).map((item) => (
            <Link key={item.href} href={item.href} className="px-3 py-2 text-gray-700 hover:text-primary transition rounded">{item.label}</Link>
          ))}
          <div className="relative group">
            <button type="button" className="px-3 py-2 text-gray-700 hover:text-primary transition rounded">خدماتنا</button>
            <div className="absolute right-0 mt-0 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10">
              <Link href="/services" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition text-sm font-semibold border-b border-gray-100">جميع الخدمات</Link>
              {serviceLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">{item.label}</Link>
              ))}
            </div>
          </div>
          {mainLinks.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="px-3 py-2 text-gray-700 hover:text-primary transition rounded">{item.label}</Link>
          ))}
          <SmartAppLink className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition ml-2">تعرف على المنصة</SmartAppLink>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-10 h-10 rounded-lg border border-gray-200 text-primary font-black" aria-label="فتح القائمة">
          ☰
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            <Link href="/" className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition" onClick={closeMenu}>الرئيسية</Link>
            <button onClick={() => setShowServices(!showServices)} className="w-full text-right py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition">خدماتنا</button>
            {showServices && (
              <div className="bg-emerald-50 rounded py-2 px-2">
                <Link href="/services" className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition font-semibold" onClick={closeMenu}>جميع الخدمات</Link>
                {serviceLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition" onClick={closeMenu}>{item.label}</Link>
                ))}
              </div>
            )}
            {mainLinks.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition" onClick={closeMenu}>{item.label}</Link>
            ))}
            <Link href="/legal" className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition" onClick={closeMenu}>الشروط والخصوصية</Link>
            <SmartAppLink className="block py-3 px-4 rounded-lg bg-primary text-white text-center font-semibold hover:bg-primary-dark transition mt-3" onClick={closeMenu}>تعرف على المنصة</SmartAppLink>
          </div>
        </div>
      )}
    </header>
  );
}
