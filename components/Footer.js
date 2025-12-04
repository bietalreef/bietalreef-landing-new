export default function Footer() {
  return (
    <footer className="mt-16 md:mt-24 bg-gradient-to-b from-primary-dark to-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">بيت الريف</h3>
            <p className="text-sm text-green-100 mb-4 leading-relaxed">
              منصة متكاملة لخدمات البناء والتصميم الداخلي والمقاولات في الإمارات
            </p>
            <div className="text-xs text-green-100">
              <p>العين - أبوظبي - الإمارات العربية المتحدة</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>
                <a href="/" className="hover:text-white transition">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition">
                  الخدمات
                </a>
              </li>
              <li>
                <a href="/platform" className="hover:text-white transition">
                  المنصة
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  من نحن
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition">
                  المدونة
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-base font-semibold mb-4">قانوني</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>
                <a href="/legal#privacy" className="hover:text-white transition">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="/legal#terms" className="hover:text-white transition">
                  الشروط والأحكام
                </a>
              </li>
              <li>
                <a href="/legal#cookies" className="hover:text-white transition">
                  سياسة الكوكيز
                </a>
              </li>
              <li>
                <a href="/legal#disclaimer" className="hover:text-white transition">
                  إخلاء المسؤولية
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-green-100">
              <li className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">📞</span>
                <a href="tel:+971XXXXXXXXX" className="hover:text-white transition">
                  +971 XXXX XXXX
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">📧</span>
                <a href="mailto:info@bietalreef.ae" className="hover:text-white transition">
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
        <div className="border-t border-green-400 border-opacity-30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-xs text-green-100 text-center md:text-left">
              © {new Date().getFullYear()} بيت الريف للمقاولات العامة. جميع الحقوق محفوظة.
            </div>

            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-400 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <span className="text-lg">💼</span>
              </a>
              <a
                href="https://facebook.com/bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-400 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="https://instagram.com/bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-400 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="https://tiktok.com/@bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-400 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center transition"
                aria-label="TikTok"
              >
                <span className="text-lg">🎵</span>
              </a>
              <a
                href="https://youtube.com/@bietalreef"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-400 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <span className="text-lg">▶️</span>
              </a>
              <a
                href="https://wa.me/971XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-400 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <span className="text-lg">💬</span>
              </a>
            </div>

            {/* Language & Settings */}
            <div className="flex gap-3 text-xs text-green-100">
              <a href="#" className="hover:text-white transition">
                العربية
              </a>
              <span>|</span>
              <a href="#" className="hover:text-white transition">
                English
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
