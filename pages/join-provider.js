import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function JoinProviderPage() {
  const steps = [
    {
      number: 1,
      title: 'تعبئة نموذج التسجيل',
      description: 'قم بملء بيانات نشاطك وتخصصك والخدمات التي تقدمها بالتفصيل'
    },
    {
      number: 2,
      title: 'مراجعة البيانات',
      description: 'سيقوم فريق بيت الريف بمراجعة بياناتك والتأكد من اكتمالها'
    },
    {
      number: 3,
      title: 'التواصل عبر واتساب',
      description: 'سنتواصل معك عبر واتساب لتأكيد البيانات والإجابة على أسئلتك'
    },
    {
      number: 4,
      title: 'دفع رسوم الاشتراك',
      description: 'ادفع رسوم الاشتراك السنوية للحصول على صفحة احترافية'
    },
    {
      number: 5,
      title: 'إنشاء صفحة المزود',
      description: 'سننشئ صفحتك الاحترافية على بيت الريف بناءً على بياناتك'
    },
    {
      number: 6,
      title: 'إرسال رابط الصفحة',
      description: 'ستستقبل رابط صفحتك الخاصة لمشاركتها مع عملائك'
    },
    {
      number: 7,
      title: 'الظهور في نتائج البحث',
      description: 'ستظهر صفحتك تلقائياً في جميع صفحات التخصصات والمدن المطابقة'
    }
  ];

  const benefits = [
    {
      icon: '🌐',
      title: 'صفحة هبوط احترافية',
      description: 'صفحة متكاملة تعرض نشاطك وخدماتك بشكل احترافي'
    },
    {
      icon: '🔍',
      title: 'تحسين الظهور في جوجل',
      description: 'صفحتك مُحسّنة للظهور في نتائج محركات البحث'
    },
    {
      icon: '📱',
      title: 'توافق SEO و AEO',
      description: 'صفحتك توافق معايير محركات البحث والذكاء الاصطناعي'
    },
    {
      icon: '🏢',
      title: 'ربط مع Google Business',
      description: 'استخدم رابط الصفحة كموقع إلكتروني في Google Business Profile'
    },
    {
      icon: '📊',
      title: 'ظهور في صفحات التخصصات',
      description: 'ستظهر بطاقتك في جميع صفحات التخصصات المطابقة'
    },
    {
      icon: '📍',
      title: 'ظهور في صفحات المدن',
      description: 'ستظهر في صفحات الإمارات والمدن التي تخدمها'
    },
    {
      icon: '🔗',
      title: 'روابط داخلية قوية',
      description: 'شبكة روابط داخلية تعزز ظهور صفحتك'
    },
    {
      icon: '📞',
      title: 'أزرار اتصال مباشرة',
      description: 'أزرار واتساب وهاتف وطلب عرض سعر مباشرة'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'انضم كمزود خدمة | بيت الريف',
    description: 'سجل نشاطك كمزود خدمة على منصة بيت الريف واحصل على صفحة احترافية',
    url: 'https://bietalreef.ae/join-provider'
  };

  return (
    <>
      <Head>
        <title>انضم كمزود خدمة | بيت الريف</title>
        <meta name="description" content="سجل نشاطك كمزود خدمة على منصة بيت الريف واحصل على صفحة احترافية مع تحسين الظهور في محركات البحث والذكاء الاصطناعي." />
        <link rel="canonical" href="https://bietalreef.ae/join-provider" />
        
        {/* Open Graph */}
        <meta property="og:title" content="انضم كمزود خدمة | بيت الريف" />
        <meta property="og:description" content="سجل نشاطك كمزود خدمة على منصة بيت الريف واحصل على صفحة احترافية" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/join-provider" />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
        <Navbar />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1F6B3A] to-[#0F3F1A] text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-black mb-5">انضم إلى شبكة مزودي الخدمات</h1>
            <p className="text-white/80 max-w-3xl leading-8 mb-8">احصل على صفحة احترافية على بيت الريف وزد من ظهورك في محركات البحث والذكاء الاصطناعي</p>
            <a href="https://wa.me/971567856001" className="inline-block px-8 py-4 rounded-lg bg-[#B8922B] text-white font-bold hover:bg-[#9a7a23] transition">
              تواصل معنا عبر واتساب
            </a>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 py-16">
          {/* Journey Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-12 text-center">رحلة التسجيل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-lg border border-[#E6DCC8] p-6 h-full">
                    <div className="w-12 h-12 rounded-full bg-[#B8922B] text-white flex items-center justify-center font-black text-lg mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-[#0F3F1A] mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-6">{step.description}</p>
                  </div>
                  {idx < steps.length - 1 && idx % 4 !== 3 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-[#B8922B] text-2xl">→</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-12 text-center">مزايا الانضمام</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-[#E6DCC8] p-6 hover:border-[#B8922B] transition">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="font-bold text-[#0F3F1A] mb-3">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 leading-6">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-black text-[#0F3F1A] mb-12 text-center">الأسئلة الشائعة</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: 'كم رسوم الاشتراك السنوية؟',
                  a: 'تختلف الرسوم حسب نوع النشاط والخدمات. سيتم إخبارك برسوم محددة بعد التواصل معنا.'
                },
                {
                  q: 'هل يمكن تعديل بيانات صفحتي لاحقاً؟',
                  a: 'نعم، يمكنك تحديث بيانات صفحتك في أي وقت من خلال التواصل مع فريق بيت الريف.'
                },
                {
                  q: 'هل صفحتي ستظهر في جوجل؟',
                  a: 'نعم، صفحتك مُحسّنة للظهور في نتائج جوجل وستظهر تدريجياً مع الوقت.'
                },
                {
                  q: 'هل يمكن إضافة صور ومشاريع إلى صفحتي؟',
                  a: 'نعم، يمكنك إضافة معرض أعمال وصور المشاريع المنفذة على صفحتك.'
                },
                {
                  q: 'كم وقت يستغرق إنشاء صفحتي؟',
                  a: 'عادة ما يستغرق 3-5 أيام عمل من تاريخ دفع الرسوم.'
                }
              ].map((item, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg border border-[#E6DCC8] cursor-pointer group">
                  <summary className="font-bold text-[#0F3F1A] group-open:text-[#B8922B]">{item.q}</summary>
                  <p className="text-gray-700 mt-4 leading-7">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-br from-[#0F3F1A] to-[#1F6B3A] text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-black mb-4">جاهز للانضمام؟</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-8">
              تواصل معنا الآن عبر واتساب أو الهاتف لبدء رحلتك كمزود خدمة معتمد على بيت الريف
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/971567856001" className="px-8 py-4 rounded-lg bg-[#B8922B] text-white font-bold hover:bg-[#9a7a23] transition">
                واتساب
              </a>
              <a href="tel:+971567856001" className="px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-[#0F3F1A] transition">
                اتصل بنا
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
