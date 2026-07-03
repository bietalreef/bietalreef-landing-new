import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../data/siteTaxonomy';

export default function UAEDirectoryHome() {
  const pageData = {
    h1: 'دليل الإمارات لمزودي خدمات المقاولات والبناء',
    desc: 'ابدأ من الإمارة ثم اختر المدينة أو المنطقة ثم الخدمة المناسبة لمشروعك في البناء والصيانة والتصميم الداخلي.',
  };

  const faqItems = [
    ['كيف أستخدم دليل الإمارات؟', 'ابدأ باختيار الإمارة، ثم المدينة أو المنطقة، وبعدها اختر نوع الخدمة مثل المقاولات أو النجارة أو الرخام أو الصيانة.'],
    ['هل يبدأ الدليل بالمكان أم بالخدمة؟', 'دليل الإمارات في بيت الريف يبدأ بالمكان أولًا حتى تكون رحلة البحث أوضح: الإمارة ثم المدينة ثم الخدمة.'],
    ['هل يمكنني طلب عرض سعر من الدليل؟', 'نعم، يمكنك استخدام زر طلب عرض سعر أو سؤال المساعد الذكي وياك لتوجيه طلبك للمسار المناسب.'],
  ];

  return (
    <>
      <Head>
        <title>{pageData.h1} | بيت الريف</title>
        <meta name="description" content={pageData.desc} />
        <link rel="canonical" href="https://bietalreef.ae/uae" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle="دليل الإمارات" />
        <main>
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 z-0">
              <Image src="/bait-alreef-uae-smart-network-coverage.webp" alt={pageData.h1} fill className="object-cover opacity-25" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A] via-[#0F3F1A]/70 to-[#0F3F1A]/30" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">
                ابدأ من المكان
              </span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{pageData.h1}</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">{pageData.desc}</p>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="mb-10 text-center md:text-right">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">اختر الإمارة</h2>
              <p className="mt-3 text-gray-600 leading-8">الواجهة الرئيسية للدليل هي الإمارات السبع. بعدها تظهر المدن والمناطق والخدمات المتاحة.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {UAE_EMIRATES.map((emirate) => (
                <Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="group rounded-3xl bg-white border border-[#E6DCC8] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-primary mb-2">إمارة</p>
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition">{emirate.nameAr}</h3>
                      <p className="mt-3 text-sm text-gray-600 leading-7">{emirate.description}</p>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-2xl">📍</span>
                  </div>
                  <div className="mt-5 border-t border-gray-100 pt-4 text-xs font-bold text-gray-500">{emirate.areas.length} مدينة ومنطقة</div>
                </Link>
              ))}
            </div>
          </section>

          <ClientRequestCard title="تبحث عن مزود خدمة في الإمارات؟" desc="اسأل وياك أو أرسل طلبك وسنرشدك إلى المسار الصحيح حسب الإمارة والمدينة ونوع الخدمة." buttonText="ابدأ طلبك الآن" />

          <SeoContent title="كيف يخدم دليل الإمارات أصحاب المشاريع؟">
            <p>يعتمد دليل الإمارات في بيت الريف على ترتيب جغرافي واضح يبدأ من الإمارة ثم المدينة أو المنطقة ثم نوع الخدمة. هذا يساعد صاحب المشروع على الوصول إلى مزودي الخدمات الأقرب والأكثر صلة دون تشتيت.</p>
            <p className="mt-4">بعد اختيار الإمارة يمكنك تصفح المناطق المتاحة، ثم اختيار تخصص مثل المقاولات العامة، النجارة، الرخام والسيراميك، التصميم الداخلي أو الصيانة العامة.</p>
          </SeoContent>

          <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-black mb-6">خدمات شائعة داخل الدليل</h2>
            <div className="flex flex-wrap gap-3">
              {SERVICE_CATEGORIES.slice(0, 10).map((service) => (
                <Link key={service.slug} href="/uae" className="rounded-full bg-white border border-[#E6DCC8] px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary hover:border-primary transition">
                  {service.icon} {service.nameAr}
                </Link>
              ))}
            </div>
          </section>

          <FAQ items={faqItems} title="أسئلة شائعة حول دليل الإمارات" />
        </main>
        <Footer />
      </div>
    </>
  );
}
