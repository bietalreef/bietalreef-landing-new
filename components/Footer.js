export default function Footer() {
  return (
    <footer className="mt-12 md:mt-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-xs sm:text-sm text-gray-500">
        <span className="text-center md:text-left">© {new Date().getFullYear()} بيت الريف. جميع الحقوق محفوظة.</span>
        <div className="flex gap-4 md:gap-6">
          <a href="/legal#privacy" className="hover:text-primary transition">
            سياسة الخصوصية
          </a>
          <a href="/legal#terms" className="hover:text-primary transition">
            الشروط والأحكام
          </a>
        </div>
      </div>
    </footer>
  );
}
