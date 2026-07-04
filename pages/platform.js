import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { LayoutDashboard, Users, ShoppingBag, Wrench, ShieldCheck, Zap, Globe, MessageSquare, ChevronLeft, ArrowLeft, CheckCircle } from 'lucide-react';

const sections = [
  {
    title: 'الهوية الرقمية الاحترافية',
    desc: 'صفحة احترافية تعكس نشاطك التجاري بشكل صحيح. ملف أعمال متكامل يشمل تخصصاتك وخدماتك ومشاريعك السابقة ومناطق تغطيتك الجغرافية في الإمارات.',
    icon: <Globe className="w-6 h-6" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    keywords: ['صفحة احترافية', 'ملف أعمال', 'تخصصات']
  },
  {
    title: 'الظهور حيث يبحث عملاؤك',
    desc: 'ظهور في Google وفي محركات الذكاء الاصطناعي. سواء كان عميلك يبحث في دبي أو أبوظبي أو الشارقة — هدفنا أن تكون ضمن النتائج الأولى المناسبة.',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    keywords: ['جوجل', 'محركات بحث', 'ذكاء اصطناعي']
  },
  {
    title: 'مستندات احترافية وسريعة',
    desc: 'أنشئ عروض أسعار وعقود وفواتير بشكل احترافي خلال دقائق. وياك يساعدك في الصياغة والتنسيق. من أول عرض سعر... إلى آخر فاتورة.',
    icon: <LayoutDashboard className="w-6 h-6" />,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    keywords: ['عروض أسعار', 'عقود', 'فواتير']
  },
  {
    title: 'مناقصات مطابقة لتخصصك',
    desc: 'استقبل مناقصات تتطابق مع تخصصاتك ومناطق تغطيتك. لا تنافس خارج مجالك. بيت الريف يوصلك بالطلبات التي تناسب نشاطك.',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    keywords: ['مناقصات', 'طلبات عملاء', 'تخصصات']
  },
  {
    title: 'وياك مدير أعمالك الذكي',
    desc: 'مساعد ذكي يعمل 24 ساعة: يساعدك في كتابة العروض، إنشاء المستندات، الرد على العملاء، وتنظيم عملك. كل ذلك من هاتفك.',
    isWeyaak: true,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    keywords: ['مساعد ذكي', 'إدارة أعمال', 'موبايل']
  },
];

const coreValues = [
  { 
    title: 'الشفافية الكاملة', 
    desc: 'بيانات دقيقة وموثوقة، تقييمات حقيقية من عملاء فعليين، وأسعار واضحة دون تكاليف مخفية. تعرف بالضبط ما تدفعه وما تحصل عليه.', 
    icon: <ShieldCheck className="w-10 h-10" /> 
  },
  { 
    title: 'الكفاءة التقنية', 
    desc: 'أدوات ذكاء اصطناعي متقدمة توفر عليك أسابيع من البحث والتحليل التقليدي. تقنية حديثة تجعل عملك أسهل وأسرع.', 
    icon: <Zap className="w-10 h-10" /> 
  },
  { 
    title: 'دعم مستمر', 
    desc: 'فريق متخصص ووكيل ذكي وياك معك في كل خطوة حتى اكتمال مشروعك. لست وحدك في هذه الرحلة.', 
    icon: <MessageSquare className="w-10 h-10" /> 
  }
];

const faq = [
  { 
    q: "ما هي منصة بيت الريف بالضبط؟", 
    a: "بيت الريف هي أول منصة رقمية متكاملة في الإمارات تجمع جميع أطراف عملية البناء والصيانة (الملاك، المقاولون، الموردون) في بيئة ذكية واحدة. تساعد العملاء على إيجاد المزودين المناسبين، وتساعد مزودي الخدمة على إدارة أعمالهم وبناء حضورهم الرقمي." 
  },
  { 
    q: "كيف تضمن المنصة جودة المزودين والمقاولين؟", 
    a: "نطبق نظام تحقق صارم يتضمن مراجعة التراخيص الرسمية، سابقة الأعمال والمشاريع السابقة، وتقييمات العملاء الفعليين الموثقة. كل مزود يمر بعملية تحقق دقيقة قبل الظهور على المنصة." 
  },
  { 
    q: "هل المنصة متاحة لجميع إمارات الدولة؟", 
    a: "نعم، المنصة تغطي جميع الإمارات السبع (دبي، أبوظبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، الفجيرة) وتوفر خدمات محلية مخصصة لكل مدينة ومنطقة جغرافية." 
  },
  {
    q: "كيف يساعدني وياك في إدارة أعمالي؟",
    a: "وياك هو مساعدك الذكي: يساعدك في كتابة عروض الأسعار الاحترافية، إنشاء العقود والمستندات، الرد على استفسارات العملاء، تنظيم جدول مشاريعك، وتتبع الفواتير. كأنك وظفت مدير مشاريع متفرغ."
  },
  {
    q: "ما الفرق بين بيت الريف والمنصات الأخرى؟",
    a: "الفرق الأساسي: نحن لا نبيع لك إعلاناً مؤقتاً. نبني لك حضوراً رقمياً دائماً ومستداماً. صفحة احترافية، محتوى موجه لمحركات البحث، ظهور في Google والذكاء الاصطناعي، وأدوات إدارة أعمال متكاملة."
  }
];

export default function PlatformPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات",
    "description": "منظومة بيت الريف الرقمية الشاملة لإدارة مشاريع البناء والتشطيب في الإمارات العربية المتحدة.",
    "publisher": {
      "@type": "Organization",
      "name": "بيت الريف"
    },
    "areaServed": [
      { "@type": "City", "name": "دبي" },
      { "@type": "City", "name": "أبوظبي" },
      { "@type": "City", "name": "الشارقة" },
      { "@type": "City", "name": "عجمان" }
    ]
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات"
        description="محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. من أول استفسار إلى آخر فاتورة. منظومة متكاملة لإدارة المشاريع والبحث عن مزودي الخدمات في دبي وأبوظبي والشارقة."
        keywords="محرك الأعمال الرقمي, مقاولات الإمارات, إدارة مشاريع بناء, مزودو خدمات, تكنولوجيا البناء, دبي, أبوظبي, الشارقة"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4">
        {/* HERO SECTION */}
        <header className="text-center py-4 md:py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4 md:mb-6 text-emerald-600 font-bold text-xs md:text-sm">
            <Globe className="w-4 h-4" />
            المنظومة الشاملة
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-[#0F3F1A] mb-2 md:mb-4 leading-tight">
            محرك الأعمال الرقمي
            <span className="block text-emerald-600">لقطاع المقاولات والبناء</span>
          </h1>
          <p className="text-gray-600 text-xs md:text-lg max-w-3xl mx-auto leading-relaxed">
            بيت الريف ليس دليلاً عادياً فقط، بل منظومة تشغيل رقمية متكاملة تساعد العميل على الوصول للحل المناسب، وتساعد مزود الخدمة على إدارة نشاطه التجاري وبناء حضوره الرقمي من هاتفه في جميع إمارات الدولة.
          </p>
        </header>

        {/* FEATURES GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 py-4 md:py-6">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-[#E6DCC8] p-4 md:p-6 hover:shadow-lg transition-all group">
              <div className={`${section.bg} ${section.color} w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform overflow-hidden`}>
                {section.isWeyaak ? (
                  <Image src="/images/weyaak-logo.jpg" alt="Weyaak" width={56} height={56} className="object-cover" />
                ) : (
                  section.icon
                )}
              </div>
              <h3 className="text-base md:text-lg font-black text-[#0F3F1A] mb-2 md:mb-3">{section.title}</h3>
              <p className="text-gray-600 leading-relaxed text-xs md:text-sm mb-3 md:mb-4">{section.desc}</p>
              {section.keywords && (
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {section.keywords.map((keyword, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* CORE VALUES SECTION */}
        <section className="bg-[#0F3F1A] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-10 text-white my-4 md:my-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-black mb-2">لماذا بيت الريف؟</h2>
            <p className="text-emerald-50/60 text-xs md:text-base">القيم الأساسية التي تحرك منظومتنا الرقمية</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {coreValues.map((value, i) => (
              <div key={i} className="text-center">
                <div className="text-emerald-400 flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-lg md:text-xl font-black mb-2">{value.title}</h3>
                <p className="text-emerald-50/60 text-xs md:text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-4 md:py-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F3F1A] mb-4 md:mb-6 text-center">أسئلة شائعة حول المنصة</h2>
          <div className="space-y-2 md:space-y-3 max-w-3xl mx-auto">
            {faq.map((item, i) => (
              <div key={i} className="bg-white rounded-[1.2rem] md:rounded-[1.5rem] border border-[#E6DCC8] p-4 md:p-5 hover:shadow-md transition">
                <h3 className="font-black text-[#0F3F1A] mb-1 md:mb-2 text-sm md:text-base flex items-start gap-2">
                  <span className="text-emerald-600 flex-shrink-0 text-xs md:text-base">Q:</span>
                  <span>{item.q}</span>
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-6 flex items-start gap-2">
                  <span className="text-emerald-600 flex-shrink-0 text-xs md:text-base">A:</span>
                  <span>{item.a}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section className="bg-[#F7F2E8] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 my-4 md:my-6">
          <h2 className="text-xl md:text-2xl font-black text-[#0F3F1A] mb-6 text-center">تأثير بيت الريف</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-1 md:mb-2">7</p>
              <p className="text-xs md:text-sm font-semibold text-gray-600">إمارات مغطاة بالخدمة الكاملة</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-1 md:mb-2">100%</p>
              <p className="text-xs md:text-sm font-semibold text-gray-600">شفافية في الأسعار والخدمات</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-[#0F3F1A] mb-1 md:mb-2">24/7</p>
              <p className="text-xs md:text-sm font-semibold text-gray-600">دعم ومساعدة مستمرة</p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center bg-white rounded-[1.5rem] md:rounded-[2rem] border border-[#E6DCC8] p-4 md:p-8 shadow-sm my-4 md:my-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F3F1A] mb-2 md:mb-4">هل أنت مستعد للانضمام للمستقبل؟</h2>
          <p className="text-gray-600 mb-4 md:mb-6 max-w-xl mx-auto text-xs md:text-base">
            سواء كنت مالك مشروع، مقاول، أو مورد مواد بناء في دبي أو أبوظبي أو أي إمارة أخرى، هناك مكان لك في منصة بيت الريف.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
            <Link href="/services" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F3F1A] text-white rounded-2xl font-black shadow-lg hover:bg-[#1a5c28] transition-all text-sm md:text-base">
              ابدأ كعميل
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <a href="https://app.bietalreef.ae/onboarding" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0F3F1A] rounded-2xl font-black border border-[#E6DCC8] hover:border-[#0F3F1A] transition-all text-sm md:text-base">
              ابدأ كمزود خدمة
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
