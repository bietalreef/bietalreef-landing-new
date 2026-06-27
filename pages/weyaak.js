import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { Bot, MessageSquare, Zap, Shield, ChevronLeft, ArrowLeft, Brain, Sparkles } from 'lucide-react';

const capabilities = [
  { 
    title: 'فهم عميق للاحتياجات', 
    desc: 'وياك يفهم اللهجة الإماراتية والمصطلحات التقنية للبناء، مما يسهل عليك شرح مشروعك.', 
    icon: <Brain className="w-6 h-6" /> 
  },
  { 
    title: 'توصيات ذكية مخصصة', 
    desc: 'يقترح عليك أفضل المقاولين والموردين بناءً على ميزانيتك وموقع مشروعك وتقييمات العملاء.', 
    icon: <Sparkles className="w-6 h-6" /> 
  },
  { 
    title: 'تحليل عروض الأسعار', 
    desc: 'يساعدك في قراءة وتحليل بنود عروض الأسعار المعقدة ويوضح لك الفروقات التقنية بينها.', 
    icon: <Zap className="w-6 h-6" /> 
  }
];

const faq = [
  { q: "ما هو وكيل وياك الذكي؟", a: "وياك هو وكيل ذكاء اصطناعي متطور صُمم خصيصاً لقطاع البناء في الإمارات، يعمل كمساعد شخصي لك في جميع مراحل مشروعك." },
  { q: "هل يمكن لوياك مساعدتي في اختيار التصميم؟", a: "نعم، وياك يمكنه استعراض آلاف التصاميم واقتراح الأنماط التي تناسب ذوقك ومساحة مشروعك." },
  { q: "كيف أتحدث مع وياك؟", a: "يمكنك البدء بالتحدث مع وياك مباشرة عبر المنصة أو التطبيق، وهو متاح للرد على استفساراتك على مدار الساعة." }
];

export default function WeyaakPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "وياك AI — وكيل بيت الريف الذكي",
    "description": "وكيل ذكاء اصطناعي متخصص في قطاع البناء والصيانة في الإمارات.",
    "applicationCategory": "Artificial Intelligence",
    "operatingSystem": "All"
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="وياك AI | وكيلك الذكي في عالم البناء | بيت الريف"
        description="تعرف على وياك، أول مساعد ذكاء اصطناعي متخصص في البناء والتشطيب بالإمارات. استشارات فورية، تحليل أسعار، وتوصيات ذكية لمشروعك."
        keywords="وياك AI، ذكاء اصطناعي بناء، مساعد رقمي الإمارات، استشارات هندسية ذكية"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F3F1A] text-white mb-6 shadow-lg">
            <Bot className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Weyaak Agent OS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0F3F1A] mb-6 leading-tight">
            وياك — <span className="text-emerald-600">وكيلك الشخصي</span> <br />
            لإدارة مشاريعك بذكاء
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            أول وكيل ذكاء اصطناعي إماراتي يفهم تفاصيل البناء، يحلل البيانات، وينفذ المهام نيابة عنك لضمان نجاح مشروعك بأقل جهد وأفضل تكلفة.
          </p>
        </header>

        {/* Capabilities Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {capabilities.map((cap, i) => (
            <div key={i} className="bg-white rounded-[32px] border border-[#E6DCC8] p-8 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                {cap.icon}
              </div>
              <h3 className="text-xl font-black text-[#0F3F1A] mb-3">{cap.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </section>

        {/* Interactive Showcase Placeholder */}
        <section className="bg-[#0F3F1A] rounded-[40px] p-8 md:p-16 text-white mb-20 overflow-hidden relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6">كيف يساعدك وياك؟</h2>
              <ul className="space-y-6">
                {[
                  { t: "توفير الوقت", d: "بدلاً من البحث لساعات، وياك يجمع لك المعلومات في ثوانٍ." },
                  { t: "دقة البيانات", d: "يعتمد على قاعدة بيانات ضخمة ومحدثة لسوق الإمارات." },
                  { t: "شفافية كاملة", d: "يحلل التقييمات والأسعار لضمان حصولك على الأفضل." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-emerald-400 text-sm">{item.t}</h4>
                      <p className="text-emerald-50/60 text-xs">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">وياك AI</div>
                  <div className="text-[10px] text-emerald-400">متصل الآن</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 p-3 rounded-2xl rounded-br-none text-xs ml-8">
                  أهلاً بك! أنا وياك، كيف يمكنني مساعدتك في مشروعك اليوم؟
                </div>
                <div className="bg-emerald-500 p-3 rounded-2xl rounded-bl-none text-xs mr-8 text-white font-bold">
                  أبحث عن مقاول تشطيبات موثوق في مدينة العين
                </div>
                <div className="bg-white/10 p-3 rounded-2xl rounded-br-none text-xs ml-8">
                  بالتأكيد! قمت بتحليل 12 مقاولاً في العين، إليك أفضل 3 خيارات بناءً على التقييمات وسابقة الأعمال...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section (AEO) */}
        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-black text-[#0F3F1A] mb-10 text-center">أسئلة شائعة حول وياك</h2>
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
        <section className="text-center">
          <h2 className="text-3xl font-black text-[#0F3F1A] mb-6">ابدأ تجربتك مع وياك الآن</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">انضم إلى مستقبل البناء الذكي واجعل وياك شريكك في النجاح.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/platform" className="px-10 py-4 bg-[#0F3F1A] text-white rounded-2xl font-black shadow-lg hover:bg-[#1a5c28] transition-all">
              دخول المنصة والتحدث مع وياك
            </Link>
            <Link href="/services" className="px-10 py-4 bg-white text-[#0F3F1A] rounded-2xl font-bold border border-[#E6DCC8] hover:border-[#0F3F1A] transition-all">
              استعرض الخدمات المتاحة
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
