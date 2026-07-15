import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Wrench, Calculator, FileText, Layout, ChevronLeft, ArrowLeft, Zap, Shield } from 'lucide-react';

const tools = [
  { 
    id: 'calculator', 
    title: 'حاسبة مواد البناء', 
    desc: 'احسب كميات الرخام، السيراميك، والأسمنت المطلوبة لمشروعك بدقة لتوفير المال والوقت.', 
    icon: <Calculator className="w-6 h-6" />,
    features: ['حساب دقيق للكميات', 'تقدير التكلفة التقريبية', 'تصدير قائمة المواد']
  },
  { 
    id: 'comparator', 
    title: 'مقارن الأسعار الذكي', 
    desc: 'أداة متقدمة لمقارنة عروض الأسعار من مختلف الموردين واختيار الأنسب لميزانيتك.', 
    icon: <Zap className="w-6 h-6" />,
    features: ['مقارنة بنود العروض', 'تحليل فروقات الجودة', 'توصيات ذكية']
  },
  { 
    id: 'contracts', 
    title: 'إدارة العقود الرقمية', 
    desc: 'وثق اتفاقياتك مع المقاولين في بيئة رقمية آمنة تضمن حقوق جميع الأطراف.', 
    icon: <Shield className="w-6 h-6" />,
    features: ['نماذج عقود جاهزة', 'توقيع إلكتروني', 'أرشفة سحابية']
  },
  { 
    id: 'dashboard', 
    title: 'لوحة تحكم المشاريع', 
    desc: 'تابع سير العمل في مشروعك، الميزانية المصروفة، والجدول الزمني من مكان واحد.', 
    icon: <Layout className="w-6 h-6" />,
    features: ['تتبع الإنجاز', 'إدارة الدفعات', 'تنبيهات فورية']
  }
];

const faq = [
  { q: "هل الأدوات مجانية للاستخدام؟", a: "نعم، معظم الأدوات الأساسية مثل حاسبة المواد ومقارن الأسعار متاحة مجاناً لجميع مستخدمي المنصة." },
  { q: "كيف تساعدني هذه الأدوات في توفير المال؟", a: "تساعدك الأدوات في تقدير الكميات بدقة لتجنب الهدر، ومقارنة الأسعار للحصول على أفضل قيمة مقابل المال." },
  { q: "هل يمكنني استخدام الأدوات من الجوال؟", a: "بالتأكيد، جميع أدوات بيت الريف مصممة لتعمل بكفاءة عالية على جميع الأجهزة الذكية والمتصفحات." }
];

export default function ToolsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "أدوات بيت الريف الذكية",
    "description": "مجموعة أدوات رقمية متقدمة لإدارة مشاريع البناء والصيانة في الإمارات.",
    "applicationCategory": "Construction Management",
    "operatingSystem": "All"
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="الأدوات الذكية | حاسبة البناء وإدارة المشاريع | بيت الريف"
        description="استخدم أدوات بيت الريف الذكية: حاسبة مواد البناء، مقارن الأسعار، وإدارة العقود الرقمية. خطط لمشروعك بذكاء ووفر وقتك ومالك."
        keywords="حاسبة بناء، تقدير تكاليف، إدارة مشاريع، عقود إلكترونية، أدوات ذكية الإمارات"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 text-blue-600 font-bold text-sm">
            <Wrench className="w-4 h-4" />
            الأدوات الخارجية External Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0F3F1A] mb-6 leading-tight">
            أدوات متقدمة <br />
            <span className="text-blue-600">لإدارة مشروعك بذكاء</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            توفر منصة بيت الريف مجموعة من الأدوات الذكية المصممة خصيصاً لتسهيل إدارة مشاريع البناء، حساب التكاليف بدقة، وتوثيق العقود بآمان تام.
          </p>
        </header>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-[32px] border border-[#E6DCC8] p-8 md:p-10 hover:shadow-2xl transition-all group">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Active Tool
                </div>
              </div>
              <h3 className="text-2xl font-black text-[#0F3F1A] mb-4">{tool.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-8">{tool.desc}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {tool.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link 
                href="/how-it-works"
                className="inline-flex items-center justify-center w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
              >
                استخدم الأداة الآن <ChevronLeft className="w-5 h-5 mr-2" />
              </Link>
            </div>
          ))}
        </section>

        {/* FAQ Section (AEO) */}
        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-black text-[#0F3F1A] mb-10 text-center">أسئلة شائعة حول الأدوات</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E6DCC8] p-6">
                <h3 className="font-black text-[#0F3F1A] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-blue-600 rounded-[40px] p-12 text-white shadow-2xl shadow-blue-200">
          <h2 className="text-3xl font-black mb-6">ابدأ باستخدام الأدوات مجاناً</h2>
          <p className="text-blue-50/70 mb-10 max-w-xl mx-auto">ابدأ بطلبك أو تواصل مع فريق بيت الريف لاختيار الأداة والمسار المناسب لمشروعك.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-lg hover:bg-blue-50 transition-all">
              تواصل مع فريق بيت الريف
            </Link>
            <Link href="/weyaak" className="px-10 py-4 bg-blue-500 text-white rounded-2xl font-bold border border-blue-400 hover:bg-blue-400 transition-all">
              تحدث مع وياك AI
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
