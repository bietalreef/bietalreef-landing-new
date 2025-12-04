'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-gray-700 hover:text-primary transition">
            الرئيسية
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-primary transition">
            خدماتنا
          </Link>
          <Link href="/platform" className="text-gray-700 hover:text-primary transition">
            المنصة
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-primary transition">
            من نحن
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-primary transition">
            المدونة
          </Link>
          <Link href="/legal" className="text-gray-700 hover:text-primary transition">
            الشروط والأحكام
          </Link>
          <a
            href="https://app.bietalreef.ae"
            className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition"
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
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={closeMenu}
            >
              الرئيسية
            </Link>
            <Link
              href="/services"
              className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={closeMenu}
            >
              خدماتنا
            </Link>
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
            <Link
              href="/legal"
              className="block py-2 px-3 text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={closeMenu}
            >
              الشروط والأحكام
            </Link>
            <a
              href="https://app.bietalreef.ae"
              className="block py-3 px-4 rounded-lg bg-primary text-white text-center font-semibold hover:bg-primary-dark transition mt-2"
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
