import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-soft sticky top-0 z-30">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
            و
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-primary">بيت الريف</span>
            <span className="text-xs text-gray-500">منصة البناء الذكية</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/">الرئيسية</Link>
          <Link href="/services">خدماتنا</Link>
          <Link href="/platform">المنصة</Link>
          <Link href="/about">من نحن</Link>
          <Link href="/legal">الشروط والأحكام</Link>
          <a
            href="https://app.bietalreef.ae"
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-primary text-white text-sm"
          >
            دخول المنصة
          </a>
        </div>
      </nav>
    </header>
  );
}
