import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { Users, MapPin, Star, ShieldCheck, ChevronLeft, Search, Filter, ArrowLeft } from 'lucide-react';
import { SERVICE_CATEGORIES, UAE_EMIRATES } from '../../data/siteTaxonomy';

const steps = [
  { t: 'أنشئ ملفك الشخصي', d: 'سجل بيانات شركتك، تخصصاتك، ونطاق عملك الجغرافي في الإمارات.', i: '01' },
  { t: 'وثق أعمالك', d: 'أضف صوراً لمشاريعك السابقة وشهادات الخبرة لتعزيز ثقة العملاء.', i: '02' },
  { t: 'استقبل الطلبات', d: 'ابدأ في استقبال طلبات عروض الأسعار المباشرة من العملاء المستهدفين.', i: '03' }
];

export default function ProvidersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "دليل مزودي الخدمات في بيت الريف",
    "description": "ابحث عن أفضل المقاولين والموردين والحرفيين في الإمارات أو سجل شركتك لزيادة مبيعاتك.",
    "url": "https://bietalreef.ae/providers"
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="دليل مزودي الخدمات | مقاولون وموردون وحرفيون | بيت الريف"
        description="تصفح دليل مزودي الخدمات المعتمدين في الإمارات. اعثر على مقاولين، مصممين، وحرفيين موثقين. سجل شركتك الآن في أكبر منصة بناء ذكية."
        keywords="مقاولين دبي، شركات بناء أبوظبي، حرفيين الإمارات، تسجيل مزود خدمة"
        structuredData={structuredData}
      />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1a5c28] to-[#0F3F1A] text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px]" />
          </div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 text-emerald-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              شبكة المحترفين المعتمدة
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              نربطك بأفضل <br />
              <span className="text-emerald-400">خبراء البناء في الإمارات</span>
            </h1>
            <p className="text-emerald-50/70 text-lg max-w-2xl mb-10 leading-relaxed">
              سواء كنت تبحث عن مقاول لبناء فيلتك أو كنت شركة ترغب في الوصول لعملاء جدد، بيت الريف هو وجهتك المثالية للنمو والتميز.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/971567856001" className="px-10 py-4 bg-[#D4AF37] text-white rounded-2xl font-black shadow-lg hover:bg-[#b8922b] transition-all">
                سجل شركتك الآن
              </a>
              <Link href="/uae" className="px-10 py-4 bg-white/10 text-white rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all">
                تصفح الدليل
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black text-[#0F3F1A] mb-2">تصفح حسب التخصص</h2>
              <p className="text-gray-500">أكثر من 90 تخصصاً دقيقاً في قطاع البناء والصيانة</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="ابحث عن تخصص..." className="pr-10 pl-4 py-2 rounded-xl border border-[#E6DCC8] bg-white text-sm focus:outline-none focus:border-emerald-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((service) => (
              <Link key={service.slug} href={`/categories/${service.slug}`} className="group bg-white rounded-3xl border border-[#E6DCC8] p-8 hover:shadow-xl transition-all">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-black text-[#0F3F1A] mb-3">{service.nameAr}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.descAr}</p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-xs font-bold text-emerald-600">استعرض المزودين</span>
                  <ChevronLeft className="w-4 h-4 text-emerald-600 group-hover:translate-x-[-4px] transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works for providers */}
        <section className="bg-white py-20 border-y border-[#E6DCC8]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-[#0F3F1A] mb-4">كيف تنضم لشبكة بيت الريف؟</h2>
              <p className="text-gray-500">خطوات بسيطة لتبدأ رحلة نجاحك الرقمي معنا</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, i) => (
                <div key={i} className="text-center relative">
                  <div className="text-8xl font-black text-gray-50 absolute -top-10 left-1/2 -translate-x-1/2 z-0">{step.i}</div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-[#0F3F1A] mb-4">{step.t}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Geographic Coverage */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="bg-[#FDFBF7] rounded-[40px] border border-[#E6DCC8] p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-black text-[#0F3F1A] mb-6">تغطية شاملة لجميع الإمارات</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  نحن نؤمن بالوصول المحلي، لذا قمنا بتقسيم خدماتنا لتغطي كل إمارة ومنطقة بدقة، مما يسهل على العميل الوصول لأقرب مزود خدمة له.
                </p>
                <div className="flex flex-wrap gap-2">
                  {UAE_EMIRATES.map((emirate) => (
                    <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="px-4 py-2 rounded-full bg-white border border-[#E6DCC8] text-xs font-bold text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                      {emirate.nameAr}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center">
                  <div className="text-3xl font-black text-[#0F3F1A] mb-1">1,200+</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">مزود معتمد</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center">
                  <div className="text-3xl font-black text-[#0F3F1A] mb-1">90+</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">تخصص دقيق</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center">
                  <div className="text-3xl font-black text-[#0F3F1A] mb-1">7</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">إمارات الدولة</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center">
                  <div className="text-3xl font-black text-[#0F3F1A] mb-1">24/7</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">دعم فني</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="bg-emerald-600 rounded-[40px] p-12 text-center text-white shadow-2xl shadow-emerald-200">
            <h2 className="text-3xl font-black mb-6">هل أنت مزود خدمة؟</h2>
            <p className="text-emerald-50/70 mb-10 max-w-xl mx-auto">لا تدع الفرصة تفوتك، انضم الآن لأكبر تجمع لمحترفي البناء في الإمارات وابدأ في تنمية أعمالك رقمياً.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/971567856001" className="px-10 py-4 bg-white text-emerald-600 rounded-2xl font-black shadow-lg hover:bg-emerald-50 transition-all">
                تحدث مع فريق الانضمام
              </a>
              <Link href="/platform" className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-bold border border-emerald-400 hover:bg-emerald-400 transition-all">
                اكتشف مميزات المنصة
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
