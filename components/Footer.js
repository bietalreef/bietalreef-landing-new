export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} بيت الريف. جميع الحقوق محفوظة.</span>
        <div className="flex gap-4">
          <a href="/legal#privacy">سياسة الخصوصية</a>
          <a href="/legal#terms">الشروط والأحكام</a>
        </div>
      </div>
    </footer>
  );
}
