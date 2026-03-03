import { useState } from 'react';

// ══════════════════════════════════════════════════════════════
// SEO Data — مستخرجة من figmawebapp/seoConstants.ts
// ══════════════════════════════════════════════════════════════

// الخدمات الرئيسية (9 أقسام)
const SERVICES = [
  { slug: 'construction-contracting', nameAr: 'مقاولات البناء', nameEn: 'Construction Contracting', icon: '🏗️', descAr: 'شركات مقاولات معتمدة لبناء الفلل والمباني والمشاريع السكنية والتجارية في الإمارات.' },
  { slug: 'engineering-consultation', nameAr: 'الاستشارات الهندسية', nameEn: 'Engineering Consultation', icon: '📐', descAr: 'مكاتب استشارات هندسية معتمدة وتصميم معماري احترافي.' },
  { slug: 'maintenance-companies', nameAr: 'شركات الصيانة', nameEn: 'Maintenance Companies', icon: '🔧', descAr: 'صيانة شاملة للمباني والفلل: كهرباء، سباكة، تكييف، دهانات.' },
  { slug: 'craftsmen', nameAr: 'العمالة الحرفية', nameEn: 'Craftsmen & Workers', icon: '👷', descAr: 'حرفيون مهرة وعمالة متخصصة لجميع أعمال البناء والتشطيبات.' },
  { slug: 'workshops', nameAr: 'الورش الصناعية', nameEn: 'Industrial Workshops', icon: '🔨', descAr: 'ورش حدادة، نجارة، ألمنيوم، رخام وزجاج بأعلى جودة.' },
  { slug: 'equipment-rental', nameAr: 'تأجير المعدات', nameEn: 'Equipment Rental', icon: '🚜', descAr: 'رافعات، حفارات، خلاطات وجميع معدات البناء للإيجار.' },
  { slug: 'building-materials', nameAr: 'محلات مواد البناء', nameEn: 'Building Materials', icon: '🧱', descAr: 'أسمنت، حديد، بلوك، بلاط، رخام وجميع مواد البناء.' },
  { slug: 'furniture-stores', nameAr: 'محلات الأثاث والديكور', nameEn: 'Furniture & Decor', icon: '🪑', descAr: 'أثاث فاخر وديكورات عصرية بأفضل الأسعار.' },
  { slug: 'cleaning-services', nameAr: 'خدمات النظافة', nameEn: 'Cleaning Services', icon: '✨', descAr: 'تنظيف منازل، فلل، مباني وما بعد البناء.' },
];

// الخدمات الفردية (الحِرَف)
const TRADE_SERVICES = [
  { slug: 'plumbing', nameAr: 'سباكة', nameEn: 'Plumbing', icon: '🚿', priceRange: '100 - 5000 د.إ' },
  { slug: 'electricity', nameAr: 'كهرباء', nameEn: 'Electrical', icon: '⚡', priceRange: '100 - 10000 د.إ' },
  { slug: 'ac', nameAr: 'تكييف وتبريد', nameEn: 'Air Conditioning', icon: '❄️', priceRange: '150 - 15000 د.إ' },
  { slug: 'painting', nameAr: 'دهانات', nameEn: 'Painting', icon: '🎨', priceRange: '500 - 50000 د.إ' },
  { slug: 'construction', nameAr: 'بناء وتشييد', nameEn: 'Construction', icon: '🏗️', priceRange: '10000 - 5000000 د.إ' },
  { slug: 'carpentry', nameAr: 'نجارة', nameEn: 'Carpentry', icon: '🪵', priceRange: '200 - 20000 د.إ' },
  { slug: 'interior', nameAr: 'تصميم داخلي', nameEn: 'Interior Design', icon: '🏠', priceRange: '5000 - 500000 د.إ' },
  { slug: 'exterior', nameAr: 'تصميم خارجي', nameEn: 'Exterior Design', icon: '🏛️', priceRange: '5000 - 300000 د.إ' },
  { slug: 'consultation', nameAr: 'استشارة هندسية', nameEn: 'Engineering Consultation', icon: '📐', priceRange: '1000 - 100000 د.إ' },
];

// الإمارات والمدن — من EMIRATES_AND_CITIES في seoConstants.ts
const EMIRATES = [
  { slug: 'dubai', nameAr: 'دبي', nameEn: 'Dubai', areas: ['البرشاء', 'جميرا', 'ديرة', 'مرسى دبي', 'الخليج التجاري'] },
  { slug: 'abu-dhabi', nameAr: 'أبوظبي', nameEn: 'Abu Dhabi', areas: ['الريف', 'مدينة خليفة', 'المصفح', 'شاطئ الراحة'] },
  { slug: 'al-ain', nameAr: 'العين', nameEn: 'Al Ain', areas: ['الجيمي', 'المويجعي', 'الهيلي', 'المقام'] },
  { slug: 'sharjah', nameAr: 'الشارقة', nameEn: 'Sharjah', areas: ['النهدة', 'المجاز', 'القاسمية', 'الخان'] },
  { slug: 'ajman', nameAr: 'عجمان', nameEn: 'Ajman', areas: ['الراشدية', 'النعيمية', 'الجرف'] },
  { slug: 'ras-al-khaimah', nameAr: 'رأس الخيمة', nameEn: 'Ras Al Khaimah', areas: ['الحمرا', 'الجزيرة الحمراء'] },
  { slug: 'umm-al-quwain', nameAr: 'أم القيوين', nameEn: 'Umm Al Quwain', areas: ['الملاحة', 'السلامة'] },
  { slug: 'fujairah', nameAr: 'الفجيرة', nameEn: 'Fujairah', areas: ['دبا الفجيرة', 'مربح'] },
];

// أدوات الذكاء الاصطناعي — من AI_TOOLS_LINKS في seoConstants.ts
const AI_TOOLS = [
  { slug: 'wayak-ai-assistant', nameAr: 'وياك - المساعد الذكي', nameEn: 'Weyaak AI Assistant', desc: 'مساعد شخصي لإدارة مشاريع البناء والصيانة بالذكاء الاصطناعي' },
  { slug: 'building-cost-calculator', nameAr: 'حاسبة تكاليف البناء', nameEn: 'Building Cost Calculator', desc: 'حساب كميات الطابوق والأسمنت والحديد وتكلفة البناء في الإمارات' },
  { slug: 'ai-interior-designer', nameAr: 'مصمم الديكور الذكي', nameEn: 'AI Interior Designer', desc: 'تخيل مساحتك وتصميمك الداخلي بالذكاء الاصطناعي قبل التنفيذ' },
  { slug: 'quote-analyzer', nameAr: 'محلل عروض الأسعار', nameEn: 'Quote Analyzer', desc: 'مقارنة وتحليل عروض أسعار المقاولين واختيار أفضل عرض' },
];

// أهم 4 خدمات لعرضها تحت كل مدينة
const TOP_SERVICES_PER_CITY = [
  { slug: 'construction-contracting', nameAr: 'مقاولات بناء' },
  { slug: 'maintenance-companies', nameAr: 'صيانة عامة' },
  { slug: 'interior', nameAr: 'تصميم داخلي' },
  { slug: 'plumbing', nameAr: 'سباكة' },
  { slug: 'ac', nameAr: 'تكييف وتبريد' },
];

// ══════════════════════════════════════════════════════════════
// مكوّن القسم القابل للطي
// ══════════════════════════════════════════════════════════════
function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [expanded, setExpanded] = useState(defaultOpen);
  return (
    <nav className="mb-6" aria-label={title}>
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-primary hover:text-primary-dark text-xs font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
          aria-expanded={expanded}
          aria-label={expanded ? `إخفاء ${title}` : `عرض المزيد من ${title}`}
        >
          {expanded ? 'أقل' : 'المزيد'}
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[8000px]' : 'max-h-[56px]'}`}>
        {children}
      </div>
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════
// الفوتر الرئيسي
// ══════════════════════════════════════════════════════════════
export default function Footer() {
  return (
    <footer className="mt-16 md:mt-24 bg-gradient-to-b from-[#F5EEE1] via-[#F7F1E8] to-[#F5EEE1] text-gray-900 border-t border-[#E6DCC8]" dir="rtl" role="contentinfo" aria-label="دليل الموقع والروابط">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ═══ القسم 1: خدماتنا في جميع الإمارات — Critical for SEO ═══ */}
        <CollapsibleSection title="خدماتنا في جميع الإمارات" defaultOpen={false}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {SERVICES.map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-center gap-2.5 bg-white hover:bg-white rounded-xl p-3 transition-all border border-[#E6DCC8] hover:border-primary/40 shadow-sm hover:shadow-md"
                title={`${service.nameAr} في الإمارات - ${service.nameEn}`}
              >
                <span className="text-xl flex-shrink-0" aria-hidden="true">{service.icon}</span>
                <div className="min-w-0">
                  <span className="text-gray-700 group-hover:text-primary text-xs font-semibold transition-colors block truncate">
                    {service.nameAr}
                  </span>
                  <span className="text-gray-400 text-[9px] block truncate">{service.nameEn}</span>
                </div>
              </a>
            ))}
          </div>
        </CollapsibleSection>

        {/* ═══ القسم 2: خدمات الصيانة الفردية ═══ */}
        <CollapsibleSection title="خدمات الصيانة والحِرَف">
          <div className="flex flex-wrap gap-2">
            {TRADE_SERVICES.map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white hover:bg-white text-gray-600 hover:text-primary text-[11px] font-medium px-3 py-1.5 rounded-full transition-all border border-[#E6DCC8] hover:border-primary/30 shadow-sm"
                title={`${service.nameAr} في الإمارات | ${service.priceRange}`}
              >
                {service.icon} {service.nameAr}
              </a>
            ))}
          </div>
        </CollapsibleSection>

        {/* ═══ القسم 3: خدمات بالمدينة — Critical for Local SEO ═══ */}
        <CollapsibleSection title="ابحث عن خدمات بالقرب منك">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {EMIRATES.map((city) => (
              <div key={city.slug}>
                <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <span className="text-amber-600" aria-hidden="true">📍</span>
                  خدمات في {city.nameAr}
                </h3>
                <ul className="space-y-1">
                  {TOP_SERVICES_PER_CITY.map((service) => (
                    <li key={`${city.slug}-${service.slug}`}>
                      <a
                        href={`/services/${service.slug}/${city.slug}`}
                        className="text-gray-500 hover:text-primary text-[11px] transition-colors block py-0.5"
                        title={`${service.nameAr} في ${city.nameAr}`}
                      >
                        {service.nameAr} في {city.nameAr}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={`/services?city=${city.slug}`}
                      className="text-primary hover:text-primary-dark text-xs font-medium inline-flex items-center gap-1 mt-1"
                    >
                      كل خدمات {city.nameAr}
                      <span aria-hidden="true">←</span>
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* ═══ القسم 4: أدوات ذكاء اصطناعي مجانية ═══ */}
        <CollapsibleSection title="أدوات ذكاء اصطناعي مجانية">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {AI_TOOLS.map((tool) => (
              <a
                key={tool.slug}
                href="https://app.bietalreef.ae"
                className="group bg-white hover:bg-white rounded-xl p-4 transition-all border border-[#E6DCC8] hover:border-primary/30 shadow-sm hover:shadow-md"
                title={`${tool.nameAr} - ${tool.nameEn}`}
              >
                <h4 className="text-gray-800 group-hover:text-primary text-sm font-bold mb-1 transition-colors">
                  {tool.nameAr}
                </h4>
                <p className="text-gray-400 text-[10px] leading-relaxed">
                  {tool.desc}
                </p>
              </a>
            ))}
          </div>
        </CollapsibleSection>

        {/* ═══ القسم 5: روابط سريعة ═══ */}
        <CollapsibleSection title="روابط سريعة">
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/', label: 'الرئيسية' },
              { href: '/services', label: 'جميع الخدمات' },
              { href: '/platform', label: 'مميزات المنصة' },
              { href: '/about', label: 'من نحن' },
              { href: '/blog', label: 'المدونة' },
              { href: 'https://app.bietalreef.ae', label: 'المتجر' },
              { href: 'https://app.bietalreef.ae', label: 'الخريطة التفاعلية' },
              { href: 'https://app.bietalreef.ae', label: 'الأدوات الذكية' },
              { href: 'https://app.bietalreef.ae', label: 'وياك AI' },
              { href: '/legal#privacy', label: 'سياسة الخصوصية' },
              { href: '/legal#terms', label: 'الشروط والأحكام' },
              { href: '/legal#cookies', label: 'سياسة الكوكيز' },
              { href: '/legal#disclaimer', label: 'إخلاء المسؤولية' },
            ].map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="bg-white hover:bg-white text-gray-500 hover:text-primary text-xs font-medium px-3 py-1.5 rounded-full transition-all border border-[#E6DCC8] hover:border-primary/30 shadow-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </CollapsibleSection>

        {/* ═══ وياك AI CTA ═══ */}
        <div className="mb-6">
          <a
            href="https://app.bietalreef.ae"
            className="block bg-white rounded-2xl p-4 border border-[#E6DCC8] shadow-sm hover:shadow-md transition-all group"
            title="وياك - المساعد الذكي لإدارة مشاريع البناء والصيانة"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl" aria-hidden="true">🤖</div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-bold text-sm group-hover:text-primary transition-colors">
                  وياك — وكيلك الذكي
                </h3>
                <p className="text-gray-400 text-[10px]">
                  احصل على استشارات بناء وصيانة فورية بالذكاء الاصطناعي. يتصفح الإنترنت وينفذ المهام نيابة عنك.
                </p>
              </div>
              <svg className="w-4 h-4 text-primary -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </a>
        </div>

        {/* ═══ معلومات التواصل والسوشال ميديا ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-t border-[#E6DCC8] pt-8">
          {/* معلومات الشركة */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-900">بيت الريف</h3>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              منصة البناء والصيانة الذكية في الإمارات. سوق متكامل للخدمات والمواد والأثاث مع أدوات ذكاء اصطناعي متقدمة. نربط أصحاب المشاريع مع أفضل المقاولين والحرفيين المعتمدين.
            </p>
            <address className="text-xs text-gray-500 not-italic">
              <p>العين - أبوظبي - الإمارات العربية المتحدة</p>
              <p className="mt-1">نغطي جميع إمارات الدولة</p>
            </address>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h4 className="text-base font-semibold mb-3 text-gray-900">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0" aria-hidden="true">📞</span>
                  <a href="https://wa.me/971567856001" className="font-medium hover:text-primary transition" dir="ltr">+971 567 856 001</a>
                </div>
                <p className="text-xs text-gray-400 mr-7">متاح عبر واتساب</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0" aria-hidden="true">📧</span>
                <a href="mailto:info@bietalreef.ae" className="hover:text-primary transition font-medium">info@bietalreef.ae</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0" aria-hidden="true">🌐</span>
                <a href="https://bietalreef.ae" className="hover:text-primary transition font-medium">bietalreef.ae</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0" aria-hidden="true">📱</span>
                <a href="https://app.bietalreef.ae" className="hover:text-primary transition font-medium">app.bietalreef.ae</a>
              </li>
            </ul>
          </div>

          {/* السوشال ميديا */}
          <div>
            <h4 className="text-base font-semibold mb-3 text-gray-900">تابعنا</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { href: 'https://wa.me/971567856001', label: 'WhatsApp', icon: '💬' },
                { href: 'https://instagram.com/bietalreef', label: 'Instagram', icon: '📷' },
                { href: 'https://tiktok.com/@bietalreef', label: 'TikTok', icon: '🎵' },
                { href: 'https://youtube.com/@bietalreef', label: 'YouTube', icon: '▶️' },
                { href: 'https://facebook.com/bietalreef', label: 'Facebook', icon: 'f' },
                { href: 'https://linkedin.com/company/bietalreef', label: 'LinkedIn', icon: '💼' },
                { href: 'https://x.com/bietalreef', label: 'X', icon: '𝕏' },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#E6DCC8] hover:border-primary/40 hover:shadow-md flex items-center justify-center transition-all"
                  aria-label={`تابعنا على ${social.label}`}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold">العربية</span>
              <span className="text-gray-300">|</span>
              <a href="/en" className="hover:text-primary transition">English</a>
            </div>
          </div>
        </div>

        {/* ═══ القسم 6: منصات بيت الريف — الدومينات الفرعية (مهم لـ SEO) ═══ */}
        <div className="mb-8 border-t border-[#E6DCC8] pt-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">منصات بيت الريف</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* الموقع الرئيسي */}
            <a
              href="https://bietalreef.ae"
              className="group bg-white rounded-xl p-4 transition-all border border-[#E6DCC8] hover:border-primary/40 shadow-sm hover:shadow-md"
              title="بيت الريف - منصة البناء والصيانة الذكية في الإمارات"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-black text-primary">بر</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-gray-900 group-hover:text-primary font-bold text-sm transition-colors">bietalreef.ae</h3>
                  <p className="text-gray-400 text-[10px]">الموقع الرئيسي — دليل المقاولين والخدمات</p>
                </div>
              </div>
            </a>

            {/* التطبيق الذكي — وكيل وياك */}
            <a
              href="https://app.bietalreef.ae"
              className="group bg-white rounded-xl p-4 transition-all border border-[#E6DCC8] hover:border-primary/40 shadow-sm hover:shadow-md"
              title="تطبيق بيت الريف الذكي - وكيل وياك AI للبناء والصيانة"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl" aria-hidden="true">📱</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-gray-900 group-hover:text-primary font-bold text-sm transition-colors">app.bietalreef.ae</h3>
                  <p className="text-gray-400 text-[10px]">التطبيق الذكي — وكيل وياك AI، المتجر، الخريطة</p>
                </div>
              </div>
            </a>

            {/* صفحة وياك AI */}
            <a
              href="https://weyaakai.bietalreef.ae"
              className="group bg-white rounded-xl p-4 transition-all border border-[#E6DCC8] hover:border-primary/40 shadow-sm hover:shadow-md"
              title="وياك AI - المساعد الذكي لإدارة مشاريع البناء والصيانة بالذكاء الاصطناعي"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl" aria-hidden="true">🤖</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-gray-900 group-hover:text-primary font-bold text-sm transition-colors">weyaakai.bietalreef.ae</h3>
                  <p className="text-gray-400 text-[10px]">وياك AI — وكيلك الذكي للبناء والصيانة</p>
                </div>
              </div>
            </a>
          </div>

          {/* نص SEO إضافي للدومينات الفرعية */}
          <p className="text-gray-300 text-[9px] mt-3 leading-relaxed text-center">
            منصة بيت الريف تتكون من عدة خدمات رقمية متكاملة: الموقع الرئيسي (bietalreef.ae) لاستعراض الخدمات والمقاولين، التطبيق الذكي (app.bietalreef.ae) للتسوق والخريطة التفاعلية وأدوات الذكاء الاصطناعي، ووياك AI (weyaakai.bietalreef.ae) الوكيل الذكي الذي يتصفح الإنترنت وينفذ المهام نيابة عنك.
          </p>
        </div>

        {/* ═══ الشريط السفلي — SEO Coverage Text ═══ */}
        <div className="border-t border-[#E6DCC8] pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* الشعار */}
            <div className="text-center md:text-right flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-black text-primary">بر</span>
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">بيت الريف</h2>
                <p className="text-gray-400 text-xs">منصة البناء والصيانة الذكية في الإمارات</p>
              </div>
            </div>

            {/* نص التغطية — مهم لمحركات البحث */}
            <p className="text-gray-300 text-[10px] text-center max-w-lg leading-relaxed">
              يغطي بيت الريف جميع إمارات الدولة: دبي، أبوظبي، العين، الشارقة، عجمان، رأس الخيمة، أم القيوين، والفجيرة. مقاولون مرخصون، حرفيون موثقون، مواد بناء عالية الجودة، أثاث وديكور، وأدوات ذكاء اصطناعي متقدمة لإدارة مشاريعك.
            </p>

            {/* حقوق النشر */}
            <p className="text-gray-300 text-[10px]">
              &copy; {new Date().getFullYear()} بيت الريف للمقاولات العامة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
