import { useState } from 'react';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../data/siteTaxonomy';

function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [expanded, setExpanded] = useState(defaultOpen);
  return (
    <nav className="mb-6" aria-label={title}>
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-primary hover:text-primary-dark text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary/5"
          aria-expanded={expanded}
        >
          {expanded ? 'أقل' : 'المزيد'}
          <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[12000px]' : 'max-h-[64px]'}`}>
        {children}
      </div>
    </nav>
  );
}

export default function Footer() {
  const topServices = SERVICE_CATEGORIES.slice(0, 8);
  const quickLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/services', label: 'جميع الخدمات' },
    { href: '/uae', label: 'دليل الإمارات' },
    { href: '/providers', label: 'مزودو الخدمات' },
    { href: '/marketplace', label: 'السوق' },
    { href: '/tools', label: 'الأدوات الذكية' },
    { href: '/weyaak', label: 'وياك' },
    { href: '/platform', label: 'مميزات المنصة' },
    { href: '/about', label: 'من نحن' },
    { href: '/blog', label: 'المدونة' },
    { href: '/legal#privacy', label: 'سياسة الخصوصية' },
    { href: '/legal#terms', label: 'الشروط والأحكام' }
  ];

  return (
    <footer className="mt-16 md:mt-24 bg-gradient-to-b from-[#F5EEE1] via-[#F7F1E8] to-[#F5EEE1] text-gray-900 border-t border-[#E6DCC8]" dir="rtl" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <CollapsibleSection title="خدماتنا في جميع الإمارات" defaultOpen={false}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {SERVICE_CATEGORIES.map((service) => (
              <a
                key={service.slug}
                href={`/categories/${service.slug}`}
                className="group flex items-center gap-2.5 bg-white rounded-xl p-3 border border-[#E6DCC8] hover:border-primary/40 shadow-sm hover:shadow-md"
                title={`${service.nameAr} في الإمارات`}
              >
                <span className="text-xl flex-shrink-0" aria-hidden="true">{service.icon}</span>
                <div className="min-w-0">
                  <span className="text-gray-700 group-hover:text-primary text-xs font-semibold block truncate">{service.nameAr}</span>
                  <span className="text-gray-400 text-[9px] block truncate">{service.nameEn}</span>
                </div>
              </a>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="الإمارات والمدن والمناطق">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {UAE_EMIRATES.map((emirate) => (
              <div key={emirate.slug} className="bg-white rounded-2xl border border-[#E6DCC8] p-4 shadow-sm">
                <a href={`/uae/${emirate.slug}`} className="font-bold text-gray-900 hover:text-primary mb-3 text-sm flex items-center gap-2">
                  <span className="text-amber-600" aria-hidden="true">📍</span>
                  {emirate.nameAr}
                </a>
                <div className="flex flex-wrap gap-1.5">
                  {emirate.areas.map((area) => (
                    <a
                      key={`${emirate.slug}-${area.slug}`}
                      href={`/uae/${emirate.slug}/${area.slug}`}
                      className="text-gray-500 hover:text-primary text-[10px] bg-[#FDFBF7] border border-[#E6DCC8] rounded-full px-2 py-1"
                    >
                      {area.nameAr}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="خدمات بالقرب منك">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {UAE_EMIRATES.map((emirate) => (
              <div key={`near-${emirate.slug}`}>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">خدمات في {emirate.nameAr}</h3>
                <ul className="space-y-1">
                  {topServices.map((service) => (
                    <li key={`${emirate.slug}-${service.slug}`}>
                      <a
                        href={`/uae/${emirate.slug}/${emirate.areas[0].slug}/${service.slug}`}
                        className="text-gray-500 hover:text-primary text-[11px] block py-0.5"
                      >
                        {service.nameAr} في {emirate.nameAr}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`/uae/${emirate.slug}`} className="text-primary hover:text-primary-dark text-xs font-medium inline-flex items-center gap-1 mt-1">
                      كل مناطق {emirate.nameAr}
                      <span aria-hidden="true">←</span>
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="روابط سريعة">
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <a key={link.href + link.label} href={link.href} className="bg-white text-gray-500 hover:text-primary text-xs font-medium px-3 py-1.5 rounded-full border border-[#E6DCC8] hover:border-primary/30 shadow-sm">
                {link.label}
              </a>
            ))}
          </div>
        </CollapsibleSection>

        <div className="mb-6">
          <a href="https://app.bietalreef.ae" className="block bg-white rounded-2xl p-4 border border-[#E6DCC8] shadow-sm hover:shadow-md group">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl" aria-hidden="true">🤖</div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-bold text-sm group-hover:text-primary">وياك — وكيلك الذكي</h3>
                <p className="text-gray-400 text-[10px]">يساعدك في فهم الخدمات، مقارنة الخيارات، وتنظيم طلباتك داخل بيت الريف.</p>
              </div>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-t border-[#E6DCC8] pt-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-900">بيت الريف</h3>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">منصة البناء والصيانة الذكية في الإمارات. موقع تعريفي ودليل خدمات يربط العملاء بالمقاولين والحرفيين والموردين.</p>
            <address className="text-xs text-gray-500 not-italic">
              <p>العين - أبوظبي - الإمارات العربية المتحدة</p>
              <p className="mt-1">نغطي جميع إمارات الدولة</p>
            </address>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-3 text-gray-900">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>📞 <a href="https://wa.me/971567856001" className="font-medium hover:text-primary" dir="ltr">+971 567 856 001</a></li>
              <li>📧 <a href="mailto:info@bietalreef.ae" className="hover:text-primary font-medium">info@bietalreef.ae</a></li>
              <li>🌐 <a href="https://bietalreef.ae" className="hover:text-primary font-medium">bietalreef.ae</a></li>
              <li>📱 <a href="https://app.bietalreef.ae" className="hover:text-primary font-medium">app.bietalreef.ae</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-3 text-gray-900">منصات بيت الريف</h4>
            <div className="space-y-2 text-sm">
              <a href="https://bietalreef.ae" className="block text-gray-600 hover:text-primary">الموقع التعريفي</a>
              <a href="https://app.bietalreef.ae" className="block text-gray-600 hover:text-primary">تطبيق بيت الريف</a>
              <a href="https://weyaakai.bietalreef.ae" className="block text-gray-600 hover:text-primary">وياك AI</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E6DCC8] pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><span className="text-2xl font-black text-primary">بر</span></div>
              <div><h2 className="text-lg font-black text-gray-900">بيت الريف</h2><p className="text-gray-400 text-xs">منصة البناء والصيانة الذكية في الإمارات</p></div>
            </div>
            <p className="text-gray-300 text-[10px] text-center max-w-lg leading-relaxed">يغطي بيت الريف جميع إمارات الدولة مع صفحات محلية للمدن والمناطق والتخصصات.</p>
            <p className="text-gray-300 text-[10px]">&copy; {new Date().getFullYear()} بيت الريف. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
