export default function Footer() {
  return (
    <footer className="mt-16 md:mt-24 bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 text-gray-900">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">بيت الريف</h3>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              منصة متكاملة لخدمات البناء والتصميم الداخلي والمقاولات في الإمارات
            </p>
            <div className="text-xs text-gray-700">
              <p>العين - أبوظبي - الإمارات العربية المتحدة</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="/" className="hover:text-primary transition font-medium">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-primary transition font-medium">
                  الخدمات
                </a>
              </li>
              <li>
                <a href="/platform" className="hover:text-primary transition font-medium">
                  المنصة
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary transition font-medium">
                  من نحن
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary transition font-medium">
                  المدونة
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900">قانوني</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="/legal#privacy" className="hover:text-primary transition font-medium">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="/legal#terms" className="hover:text-primary transition font-medium">
                  الشروط والأحكام
                </a>
              </li>
              <li>
                <a href="/legal#cookies" className="hover:text-primary transition font-medium">
                  سياسة الكوكيز
                </a>
              </li>
              <li>
                <a href="/legal#disclaimer" className="hover:text-primary transition font-medium">
                  إخلاء المسؤولية
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0">📞</span>
                  <span className="font-medium text-gray-700">
                    +971 567 856 001
                  </span>
                </div>
                <p className="text-xs text-gray-600 mr-7">💬 متاح فقط عبر واتساب</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">📧</span>
                <a href="mailto:info@bietalreef.ae" className="hover:text-primary transition font-medium">
                  info@bietalreef.ae
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">📍</span>
                <span>العين - أبوظبي - الإمارات</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-blue-300 border-opacity-50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-xs text-gray-700 text-center md:text-left">
              © {new Date().getFullYear()} بيت الريف للمقاولات العامة. جميع الحقوق محفوظة.
            </div>

            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-300 bg-opacity-30 hover:bg-opacity-50 flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <span className="text-lg">💼</span>
              </a>
              <a
                href="https://facebook.com/bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-300 bg-opacity-30 hover:bg-opacity-50 flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="https://instagram.com/bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-300 bg-opacity-30 hover:bg-opacity-50 flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="https://tiktok.com/@bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-300 bg-opacity-30 hover:bg-opacity-50 flex items-center justify-center transition"
                aria-label="TikTok"
              >
                <span className="text-lg">🎵</span>
              </a>
              <a
                href="https://youtube.com/@bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-300 bg-opacity-30 hover:bg-opacity-50 flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <span className="text-lg">▶️</span>
              </a>
              <a
                href="https://wa.me/971567856001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-300 bg-opacity-30 hover:bg-opacity-50 flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <span className="text-lg">💬</span>
              </a>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="font-semibold">العربية</span>
              <span className="text-gray-500">|</span>
              <a href="/en" className="hover:text-primary transition">
                English
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
