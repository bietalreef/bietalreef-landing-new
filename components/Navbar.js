'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="w-full bg-white shadow-soft sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-12 h-12 relative">
            <Image
              src="/logo.png"
              alt="بيت الريف"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-primary text-sm">بيت الريف</span>
            <span className="text-xs text-gray-500">منصة البناء الذكية</span>
          </div>
        </Link>

        {/* Desktop Navigation with Dropdown */}
        <div className="hidden md:flex items-center gap-1 text-sm">
          <Link href="/" className="px-3 py-2 text-gray-700 hover:text-primary transition rounded">
            الرئيسية
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 text-gray-700 hover:text-primary transition rounded flex items-center gap-1">
              خدماتنا
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <div className="absolute right-0 mt-0 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10">
              <Link href="/services" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition text-sm font-semibold border-b border-gray-100">
                جميع الخدمات
              </Link>
              <Link href="/services/construction" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                مقاولات البناء
              </Link>
              <Link href="/services/interior-design" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                التصميم الداخلي
              </Link>
              <Link href="/services/project-management" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                إدارة المشاريع
              </Link>
              <Link href="/services/engineering-consultation" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                الاستشارات الهندسية
              </Link>
              <Link href="/services/maintenance" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                شركات الصيانة
              </Link>
              <Link href="/services/equipment-rental" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                تأجير المعدات
              </Link>
              <Link href="/services/cleaning" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                خدمات التنظيف
              </Link>
              <Link href="/services/furniture-decor" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                الأثاث والديكور
              </Link>
            </div>
          </div>

          <Link href="/platform" className="px-3 py-2 text-gray-700 hover:text-primary transition rounded">
            المنصة
          </Link>
          <Link href="/about" className="px-3 py-2 text-gray-700 hover:text-primary transition rounded">
            من نحن
          </Link>
          <Link href="/blog" className="px-3 py-2 text-gray-700 hover:text-primary transition rounded">
            المدونة
          </Link>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 text-gray-700 hover:text-primary transition rounded flex items-center gap-1">
              المزيد
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <div className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10">
              <Link href="/legal" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                الشروط والأحكام
              </Link>
              <a href="https://app.bietalreef.ae" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-primary transition">
                سياسة الخصوصية
              </a>
            </div>
          </div>

          <a
            href="https://app.bietalreef.ae"
            className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition ml-2"
          >
            دخول المنصة
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
          aria-label="فتح القائمة"
        >
          <span
            className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              href="/"
              className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={closeMenu}
            >
              الرئيسية
            </Link>

            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown('services')}
                className="w-full text-right py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition flex items-center justify-between"
              >
                خدماتنا
                <svg className={`w-4 h-4 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              {openDropdown === 'services' && (
                <div className="bg-emerald-50 rounded mt-1 py-2 px-2">
                  <Link
                    href="/services"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition font-semibold text-sm border-b border-gray-200"
                    onClick={closeMenu}
                  >
                    جميع الخدمات
                  </Link>
                  <Link
                    href="/services/construction"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    مقاولات البناء
                  </Link>
                  <Link
                    href="/services/interior-design"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    التصميم الداخلي
                  </Link>
                  <Link
                    href="/services/project-management"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    إدارة المشاريع
                  </Link>
                  <Link
                    href="/services/engineering-consultation"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    الاستشارات الهندسية
                  </Link>
                  <Link
                    href="/services/maintenance"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    شركات الصيانة
                  </Link>
                  <Link
                    href="/services/equipment-rental"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    تأجير المعدات
                  </Link>
                  <Link
                    href="/services/cleaning"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    خدمات التنظيف
                  </Link>
                  <Link
                    href="/services/furniture-decor"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    الأثاث والديكور
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/platform"
              className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={closeMenu}
            >
              المنصة
            </Link>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={closeMenu}
            >
              من نحن
            </Link>
            <Link
              href="/blog"
              className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={closeMenu}
            >
              المدونة
            </Link>

            {/* Mobile More Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown('more')}
                className="w-full text-right py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition flex items-center justify-between"
              >
                المزيد
                <svg className={`w-4 h-4 transition-transform ${openDropdown === 'more' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              {openDropdown === 'more' && (
                <div className="bg-emerald-50 rounded mt-1 py-2 px-2">
                  <Link
                    href="/legal"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    الشروط والأحكام
                  </Link>
                  <a
                    href="https://app.bietalreef.ae"
                    className="block py-2 px-3 text-gray-700 hover:text-primary rounded transition"
                    onClick={closeMenu}
                  >
                    سياسة الخصوصية
                  </a>
                </div>
              )}
            </div>

            <a
              href="https://app.bietalreef.ae"
              className="block py-3 px-4 rounded-lg bg-primary text-white text-center font-semibold hover:bg-primary-dark transition mt-3"
              onClick={closeMenu}
            >
              دخول المنصة
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
