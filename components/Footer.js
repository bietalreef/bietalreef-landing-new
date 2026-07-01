import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
          type="button"
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
  const router = useRouter();
  const { pathname } = router;
  
  // منطق الـ Smart Footer بناءً على المسار الحالي
  const isEmiratePage = pathname.includes('/uae/[emirate]');
  const isServicePage = pathname.includes('/categories/');
  const isProviderPage = pathname.includes('/provider/');

  const topServices = SERVICE_CATEGORIES.slice(0, 8);
  const quickLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/uae', label: 'دليل الإمارات' },
    { href: '/providers', label: 'مزودو الخدمات' },
    { href: '/services', label: 'الخدمات والعروض' },
    { href: '/marketplace', label: 'المنتجات والمتاجر' },
    { href: '/weyaak', label: 'وياك' },
    { href: '/tools', label: 'الأدوات' },
    { href: '/about', label: 'من نحن' },
    { href: '/legal', label: 'الشروط والأحكام' },
  ];

  return (
    <footer className="mt-16 md:mt-24 bg-gradient-to-b from-[#F5EEE1] via-[#F7F1E8] to-[#F5EEE1] text-gray-900 border-t border-[#E6DCC8]" dir="rtl" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Smart Contextual Sections */}
        {isEmiratePage && (
          <CollapsibleSection title="إمارات ومدن أخرى قد تهمك" defaultOpen={true}>
            <div className="flex flex-wrap gap-2">
              {UAE_EMIRATES.map(e => (
                <Link key={e.slug} href={`/uae/${e.slug}`} className="bg-white px-4 py-2 rounded-full border border-[#E6DCC8] text-xs font-bold hover:text-primary transition">
                  {e.nameAr}
                </Link>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {isServicePage && (
          <CollapsibleSection title="تخصصات مرتبطة" defaultOpen={true}>
            <div className="flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.slice(0, 10).map(s => (
                <Link key={s.slug} href={`/categories/${s.slug}`} className="bg-white px-4 py-2 rounded-full border border-[#E6DCC8] text-xs font-bold hover:text-primary transition">
                  {s.nameAr}
                </Link>
              ))}
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection title="دليل الخدمات في الإمارات" defaultOpen={false}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {SERVICE_CATEGORIES.map((service) => (
              <Link
                key={service.slug}
                href={`/categories/${service.slug}`}
                className="group flex items-center gap-2.5 bg-white rounded-xl p-3 border border-[#E6DCC8] hover:border-primary/40 shadow-sm hover:shadow-md"
              >
                <span className="text-xl flex-shrink-0" aria-hidden="true">{service.icon}</span>
                <div className="min-w-0">
                  <span className="text-gray-700 group-hover:text-primary text-xs font-semibold block truncate">{service.nameAr}</span>
                </div>
              </Link>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="التغطية الجغرافية">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {UAE_EMIRATES.map((emirate) => (
              <div key={emirate.slug} className="bg-white rounded-2xl border border-[#E6DCC8] p-4 shadow-sm">
                <Link href={`/uae/${emirate.slug}`} className="font-bold text-gray-900 hover:text-primary mb-3 text-sm flex items-center gap-2">
                  <span className="text-amber-600" aria-hidden="true">📍</span>
                  {emirate.nameAr}
                </Link>
                <div className="flex flex-wrap gap-1.5">
                  {emirate.areas.slice(0, 6).map((area) => (
                    <Link
                      key={`${emirate.slug}-${area.slug}`}
                      href={`/uae/${emirate.slug}/${area.slug}`}
                      className="text-gray-500 hover:text-primary text-[10px] bg-[#FDFBF7] border border-[#E6DCC8] rounded-full px-2 py-1"
                    >
                      {area.nameAr}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-t border-[#E6DCC8] pt-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="بيت الريف" width={40} height={40} />
              <span className="font-black text-xl text-gray-900">بيت الريف</span>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">منصة البناء والصيانة الذكية في الإمارات. نربط أصحاب المشاريع بنخبة مزودي الخدمات المعتمدين.</p>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900">روابط سريعة</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-600 hover:text-primary transition">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>📞 <a href="tel:+971567856001" className="hover:text-primary" dir="ltr">+971 567 856 001</a></li>
              <li>📧 <a href="mailto:info@bietalreef.ae" className="hover:text-primary">info@bietalreef.ae</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E6DCC8] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} بيت الريف. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link href="/legal" className="hover:text-primary">الشروط والأحكام</Link>
            <Link href="/legal" className="hover:text-primary">سياسة الخصوصية</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
