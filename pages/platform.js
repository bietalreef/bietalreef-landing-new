import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { LayoutDashboard, Users, ShoppingBag, Wrench, ShieldCheck, Zap, Globe, MessageSquare, ChevronLeft } from 'lucide-react';

const sections = [
  {
    title: 'نظام إدارة المقاولين والمزودين',
    desc: 'منظومة متكاملة لربط العملاء بأفضل الكفاءات في قطاع البناء، مع نظام تقييم شفاف يضمن الجودة والمصداقية.',
    icon: <Users className="w-6 h-6" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'سوق المواد والمنتجات الذكي',
    desc: 'متجر رقمي يضم آلاف المنتجات من الرخام والسيراميك وحتى أنظمة المنزل الذكي، مع إمكانية مقارنة الأسعار فورياً.',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    title: 'لوحات التحكم والبيانات',
    desc: 'واجهات تحليلية متقدمة للملاك والمقاولين لمتابعة سير المشاريع، الميزانيات، والجدول الزمني بدقة متناهية.',
    icon: <LayoutDashboard className="w-6 h-6" />,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    title: 'أدوات الذكاء الاصطناعي (وياك)',
    desc: 'مساعدك الشخصي الذي يعمل على مدار الساعة للإجابة على استفساراتك الفنية وتقديم توصيات ذكية لمشروعك.',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  }
];

const workflowSteps = [
  {
    title: 'إرسال الطلب',
    desc: 'العميل يحدد نوع الخدمة أو المادة المطلوبة، الموقع، الميزانية، الصور والمرفقات.',
  },
  {
    title: 'فرز الطلب بذكاء',
    desc: 'وياك والمنصة يصنفان الطلب حسب الخدمة والمدينة والتخصص المناسب.',
  },
  {
    title: 'استقبال العروض',
    desc: 'مزودو الخدمة والموردون المناسبون يرسلون عروضهم ببيانات واضحة وقابلة للمقارنة.',
  },
  {
    title: 'اختيار وتنفيذ',
    desc: 'العميل يقارن العروض، يختار الأنسب، ثم يتابع المشروع حتى التسليم والتقييم.',
  },
];

const faq = [
  { q: "ما هي منصة بيت الريف؟", a: "بيت الريف هي أول منصة رقمية متكاملة في الإمارات تجمع جميع أطراف عملية البناء والصيانة (الملاك، المقاولون، الموردون) في بيئة ذكية واحدة." },
  { q: "كيف تضمن المنصة جودة المزودين؟", a: "نطبق نظام تحقق صارم يتضمن مراجعة التراخيص، سابقة الأعمال، وتقييمات العملاء الفعليين الموثقة." },
  { q: "هل المنصة متاحة لجميع إمارات الدولة؟", a: "نعم، المنصة تغطي جميع الإمارات السبع وتوفر خدمات محلية مخصصة لكل مدينة ومنطقة." }
];

export default function PlatformPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "منصة بيت الريف الشاملة",
    "description": "نظرة عامة على منظومة بيت الريف الرقمية لقطاع البناء والتشطيب في الإمارات.",
    "publisher": {
      "@type": "Organization",
      "name": "بيت الريف"
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="منصة بيت الريف | المنظومة الشاملة للبناء والتشطيب | الإمارات"
        description="اكتشف منصة بيت الريف: الحل الشامل لإدارة مشاريع البناء، البحث عن مقاولين، وتسوق مواد التشطيب بذكاء. تكنولوجيا متقدمة لخدمة قطاع المقاولات."
        keywords="منصة مقاولات، إدارة مشاريع بناء، تكنولوجيا البناء، سوق المقاولات الإمارات"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6 text-emerald-600 font-bold text-sm">
            <Globe className="w-4 h-4" />
            المنظومة الشاملة Biet Alreef Ecosystem
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0F3F1A] mb-6 leading-tight">
            مستقبل البناء <br />
            <span className="text-emerald-600">بين يديك الآن</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            نحن لا نبني مجرد منصة، بل نخلق بيئة رقمية متكاملة تضمن الشفافية، الجودة، والكفاءة في كل مراحل البناء والتشطيب.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-[32px] border border-[#E6DCC8] p-8 md:p-10 hover:shadow-xl transition-all group">
              <div className={`${section.bg} ${section.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {section.icon}
              </div>
              <h3 className="text-2xl font-black text-[#0F3F1A] mb-4">{section.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{section.desc}</p>
              <Link href="/uae" className="text-emerald-600 font-bold text-sm flex items-center gap-2">
                تعرف على المزيد <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-[40px] border border-[#E6DCC8] p-8 md:p-12 mb-20 shadow-sm">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] font-black mb-3">Workflow</p>
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-4">رحلة العمل داخل منصة بيت الريف</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-8">
              المسار التشغيلي واضح من أول طلب العميل حتى مقارنة العروض، اختيار مزود الخدمة، متابعة التنفيذ، ثم التقييم النهائي.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {workflowSteps.map((step, i) => (
              <div key={step.title} className="rounded-3xl bg-[#FDFBF7] border border-[#E6DCC8] p-6 relative">
                <div className="w-10 h-10 rounded-full bg-[#0F3F1A] text-white flex items-center justify-center font-black mb-5">{i + 1}</div>
                <h3 className="text-lg font-black text-[#0F3F1A] mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-7">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#0F3F1A] rounded-[40px] p-8 md:p-16 text-white mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">لماذا بيت الريف؟</h2>
            <p className="text-emerald-50/60">القيم التي تحرك منظومتنا الرقمية</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { t: 'الشفافية الكاملة', d: 'بيانات دقيقة، تقييمات حقيقية، وأسعار واضحة دون تكاليف مخفية.', i: <ShieldCheck className="w-10 h-10" /> },
              { t: 'الكفاءة التقنية', d: 'أدوات ذكاء اصطناعي توفر عليك أسابيع من البحث والتحليل التقليدي.', i: <Zap className="w-10 h-10" /> },
              { t: 'دعم مستمر', d: 'فريق متخصص ووكيل ذكي وياك معك في كل خطوة حتى اكتمال مشروعك.', i: <MessageSquare className="w-10 h-10" /> }
            ].map((v, i) => (
              <div key={i} className="text-center">
                <div className="text-emerald-400 flex justify-center mb-6">{v.i}</div>
                <h3 className="text-xl font-black mb-3">{v.t}</h3>
                <p className="text-emerald-50/60 text-sm leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-black text-[#0F3F1A] mb-10 text-center">أسئلة شائعة حول المنصة</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E6DCC8] p-6">
                <h3 className="font-black text-[#0F3F1A] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-white rounded-[40px] border border-[#E6DCC8] p-12 shadow-sm">
          <h2 className="text-3xl font-black text-[#0F3F1A] mb-6">هل أنت مستعد للانضمام للمستقبل؟</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">سواء كنت مالك مشروع، مقاول، أو مورد مواد بناء، هناك مكان لك في منصة بيت الريف.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/uae" className="px-10 py-4 bg-[#0F3F1A] text-white rounded-2xl font-black shadow-lg hover:bg-[#1a5c28] transition-all">
              ابدأ الآن مجاناً
            </Link>
            <a href="https://wa.me/971567856001" className="px-10 py-4 bg-white text-[#0F3F1A] rounded-2xl font-bold border border-[#E6DCC8] hover:border-[#0F3F1A] transition-all">
              تحدث مع مستشارنا
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
