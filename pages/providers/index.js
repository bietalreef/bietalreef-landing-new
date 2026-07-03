import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { Users, Search, ChevronLeft } from 'lucide-react';
import { SERVICE_CATEGORIES, UAE_EMIRATES } from '../../data/siteTaxonomy';
import { providers } from '../../data/providers';

const steps = [
  { t: 'أنشئ ملفك الشخصي', d: 'سجل بيانات شركتك، تخصصاتك، ونطاق عملك الجغرافي في الإمارات.', i: '01' },
  { t: 'وثق أعمالك', d: 'أضف صوراً لمشاريعك السابقة وشهادات الخبرة لتعزيز ثقة العملاء.', i: '02' },
  { t: 'استقبل الطلبات', d: 'ابدأ في استقبال طلبات عروض الأسعار المباشرة من العملاء المستهدفين.', i: '03' }
];

export default function ProvidersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "مزودو الخدمات في بيت الريف",
    "description": "قسم مستقل لمزودي الخدمات في الإمارات: مقاولون، موردون، ورش، مصانع، مكاتب هندسية وحرفيون.",
    "url": "https://bietalreef.ae/providers"
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="مزودو الخدمات | مقاولون وموردون وحرفيون | بيت الريف"
        description="تصفح قسم مزودي الخدمات في بيت الريف حسب التخصص أو سجل نشاطك للظهور داخل المنصة. هذا القسم مستقل عن دليل الإمارات والخدمات والمنتجات."
        keywords="مزودي خدمات الإمارات, مقاولين, موردين, حرفيين, شركات بناء, تسجيل مزود خدمة"
        structuredData={structuredData}
      />
      <Navbar pageTitle="مزودو الخدمات" />
      
      <main>
        <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1a5c28] to-[#0F3F1A] text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px]" />
          </div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 text-emerald-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              قسم مزودي الخدمات
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              مزودو الخدمات <br />
              <span className="text-emerald-400">داخل بيت الريف</span>
            </h1>
            <p className="text-emerald-50/80 text-lg max-w-2xl mb-10 leading-relaxed">
              هذا القسم مخصص للمقاولين، الشركات، الورش، المصانع، الموردين، والمكاتب المتخصصة. أما البحث حسب الإمارة والمدينة فيتم من دليل الإمارات.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/providers/register" className="px-10 py-4 bg-[#D4AF37] text-[#0F3F1A] rounded-2xl font-black shadow-lg hover:bg-[#b8922b] transition-all">
                سجل شركتك الآن
              </Link>
              <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white/10 text-white rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all">
                تحدث مع فريق الانضمام
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-10 text-center md:text-right">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-3">مزودون متاحون الآن</h2>
            <p className="text-gray-500 leading-8">هذه أول ملفات مزودي خدمات حقيقية داخل بيت الريف، وسيتم توسيع الدليل بعد مراجعة واعتماد بيانات مزودين إضافيين.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Link key={provider.slug} href={'/providers/' + provider.slug} className="group block rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{provider.providerTypeAr}</span>
                  {provider.verified && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">موثق</span>}
                </div>
                <h3 className="text-xl font-black text-[#0F3F1A] group-hover:text-[#D4AF37]">{provider.nameAr}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{provider.descriptionAr}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {provider.categorySlugs?.slice(0, 3).map((slug) => {
                    const item = SERVICE_CATEGORIES.find((service) => service.slug === slug);
                    return item ? <span key={slug} className="rounded-full border border-[#E6DCC8] px-3 py-1 text-xs font-bold text-gray-600">{item.nameAr}</span> : null;
                  })}
                </div>
                <div className="mt-5 border-t border-gray-100 pt-4 text-sm font-black text-primary">افتح ملف المزود</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black text-[#0F3F1A] mb-2">تصفح مزودي الخدمات حسب التخصص</h2>
              <p className="text-gray-500">كل تخصص يفتح داخل مسار مزودي الخدمات وليس داخل دليل الإمارات أو الخدمات والعروض.</p>
            </div>
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="ابحث عن تخصص..." className="pr-10 pl-4 py-2 rounded-xl border border-[#E6DCC8] bg-white text-sm focus:outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((service) => (
              <Link key={service.slug} href={'/providers/specialty/' + service.slug} className="group bg-white rounded-3xl border border-[#E6DCC8] p-8 hover:shadow-xl transition-all">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-black text-[#0F3F1A] mb-3">مزودو {service.nameAr}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.descAr}</p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-xs font-bold text-emerald-600">استعرض مزودي هذا التخصص</span>
                  <ChevronLeft className="w-4 h-4 text-emerald-600 group-hover:translate-x-[-4px] transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

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

        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="bg-[#FDFBF7] rounded-[40px] border border-[#E6DCC8] p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-black text-[#0F3F1A] mb-6">التغطية الجغرافية منفصلة عن قسم المزودين</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  إذا كنت تريد مزود خدمة حسب المدينة أو الإمارة، انتقل إلى دليل الإمارات. أما هنا فالتصفح يكون حسب نوع المزود والتخصص.
                </p>
                <div className="flex flex-wrap gap-2">
                  {UAE_EMIRATES.map((emirate) => (
                    <Link key={emirate.slug} href={'/uae/' + emirate.slug} className="px-4 py-2 rounded-full bg-white border border-[#E6DCC8] text-xs font-bold text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                      {emirate.nameAr}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center"><div className="text-3xl font-black text-[#0F3F1A] mb-1">{providers.length}</div><div className="text-[10px] font-bold text-gray-400 uppercase">مزودون متاحون</div></div>
                <div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center"><div className="text-3xl font-black text-[#0F3F1A] mb-1">{SERVICE_CATEGORIES.length}</div><div className="text-[10px] font-bold text-gray-400 uppercase">تخصصات</div></div>
                <div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center"><div className="text-3xl font-black text-[#0F3F1A] mb-1">7</div><div className="text-[10px] font-bold text-gray-400 uppercase">إمارات</div></div>
                <div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center"><div className="text-3xl font-black text-[#0F3F1A] mb-1">وياك</div><div className="text-[10px] font-bold text-gray-400 uppercase">مساعد ذكي</div></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
