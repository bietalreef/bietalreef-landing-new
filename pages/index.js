import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { ArrowLeft, Search, MessageSquare, Zap, CheckCircle, Globe, TrendingUp, Shield, Smartphone } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

export default function Home() {
  const [activeTab, setActiveTab] = useState('customer');

  const description = 'بيت الريف محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. من أول استفسار إلى آخر فاتورة.';

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'بيت الريف',
      alternateName: 'Biet Alreef',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description,
      areaServed: [
        { '@type': 'City', name: 'دبي' },
        { '@type': 'City', name: 'أبوظبي' },
        { '@type': 'City', name: 'الشارقة' },
        { '@type': 'City', name: 'عجمان' },
        { '@type': 'City', name: 'أم القيوين' },
        { '@type': 'City', name: 'رأس الخيمة' },
        { '@type': 'City', name: 'الفجيرة' }
      ],
      contactPoint: { '@type': 'ContactPoint', telephone: '+971567856001', contactType: 'customer support', areaServed: 'AE', availableLanguage: ['Arabic', 'English'] },
    },
  ];

  return (
    <>
      <SEOHead
        title="بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات"
        description={description}
        keywords="بيت الريف, محرك الأعمال الرقمي, مقاولات الإمارات, مزودو خدمات, دليل الإمارات, وياك AI"
        canonicalPath="/"
        structuredData={structuredData}
      />

      <div dir="rtl" className="app-viewport-lock bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <main>
          {/* ═══ HERO SECTION - Strategic Messaging ═══ */}
          <section className="relative bg-white py-12 md:py-20 lg:py-24 border-b-2 border-[#E6DCC8]">
            <div className="mx-auto max-w-7xl px-4">
              {/* Main Headline */}
              <div className="text-center mb-12 md:mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F3F1A] mb-4 md:mb-6 leading-tight">
                  بيت الريف
                </h1>
                <p className="text-lg md:text-2xl font-black text-[#B8922B] mb-6 md:mb-8">
                  محرك الأعمال الرقمي لقطاع المقاولات والبناء
                </p>
                <p className="text-base md:text-lg font-semibold text-gray-700 max-w-3xl mx-auto leading-8 mb-8 md:mb-10">
                  نحن لا نربطك بعميل فقط... <span className="text-[#0F3F1A] font-black">نبني لك حضوراً رقمياً دائماً</span> حيث يبحث عنك عملاؤك.
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-3 md:gap-4 justify-center mb-10 md:mb-14">
                <button
                  onClick={() => setActiveTab('customer')}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-sm md:text-base transition-all ${
                    activeTab === 'customer'
                      ? 'bg-[#0F3F1A] text-white shadow-lg'
                      : 'bg-white border-2 border-[#E6DCC8] text-[#0F3F1A] hover:border-[#0F3F1A]'
                  }`}
                >
                  أنا عميل
                </button>
                <button
                  onClick={() => setActiveTab('provider')}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-sm md:text-base transition-all ${
                    activeTab === 'provider'
                      ? 'bg-[#0F3F1A] text-white shadow-lg'
                      : 'bg-white border-2 border-[#E6DCC8] text-[#0F3F1A] hover:border-[#0F3F1A]'
                  }`}
                >
                  أنا مزود خدمة
                </button>
              </div>

              {/* Customer Section */}
              {activeTab === 'customer' && (
                <div className="bg-gradient-to-b from-[#F7F2E8] to-white rounded-3xl border-2 border-[#E6DCC8] p-8 md:p-12 lg:p-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-4 md:mb-6">
                    ابحث... تواصل... أو دع وياك يتولى المهمة
                  </h2>
                  <p className="text-base md:text-lg font-semibold text-gray-700 mb-8 md:mb-10 leading-8 max-w-2xl">
                    لديك مشكلة: كيف تجد أفضل مزود خدمة موثوق؟ بيت الريف يحل هذه المشكلة بثلاث طرق مختلفة.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
                    {[
                      {
                        icon: Search,
                        title: 'ابحث بنفسك',
                        desc: 'تصفح دليل شامل لمزودي الخدمات والمقاولين. اختر من يناسبك.'
                      },
                      {
                        icon: MessageSquare,
                        title: 'تواصل مباشر',
                        desc: 'اتصل بالمزودين مباشرة. قارن العروض. اختر الأفضل.'
                      },
                      {
                        icon: null,
                        isWeyaak: true,
                        title: 'دع وياك يساعدك',
                        desc: 'مساعد ذكي يفهم احتياجاتك ويقترح عليك الحل الأنسب.'
                      }
                    ].map((method, idx) => {
                      const Icon = method.icon;
                      return (
                        <div key={idx} className="bg-white rounded-2xl border-2 border-white p-6 md:p-8 hover:shadow-lg transition-all">
                          <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-[#0F3F1A]/10 flex items-center justify-center mb-4 md:mb-6">
                            {method.isWeyaak ? (
                              <Image src="/images/weyaak-logo.jpg" alt="Weyaak" width={56} height={56} className="object-cover rounded-lg" />
                            ) : (
                              <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#0F3F1A]" aria-hidden="true" />
                            )}
                          </div>
                          <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2">{method.title}</h3>
                          <p className="text-sm md:text-base font-semibold text-gray-600">{method.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white rounded-2xl border-2 border-[#E6DCC8] p-6 md:p-8 mb-8 md:mb-10">
                    <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-4 md:mb-6">ماذا ستستفيد؟</h3>
                    <ul className="space-y-3 md:space-y-4">
                      {[
                        'تواصل مباشر مع مزودي الخدمة المعتمدين',
                        'اطلب مناقصة داخلية واحصل على عروض متعددة',
                        'قارن الأسعار والخدمات والتقييمات',
                        'اختر الأفضل بناءً على احتياجاتك وميزانيتك'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#0F3F1A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-base md:text-lg font-semibold text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/services" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] text-white px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    ابدأ البحث الآن
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  </Link>
                </div>
              )}

              {/* Provider Section */}
              {activeTab === 'provider' && (
                <div className="bg-gradient-to-b from-[#F7F2E8] to-white rounded-3xl border-2 border-[#E6DCC8] p-8 md:p-12 lg:p-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-4 md:mb-6">
                    أدر نشاطك التجاري بالكامل من هاتفك
                  </h2>
                  <p className="text-base md:text-lg font-semibold text-gray-700 mb-8 md:mb-10 leading-8 max-w-2xl">
                    مشكلتك: كيف تصل إلى العملاء وتدير أعمالك بسهولة؟ بيت الريف يحل هذه المشكلة بأدوات متكاملة.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
                    {[
                      {
                        icon: Globe,
                        title: 'ابنِ حضورك الرقمي',
                        desc: 'صفحة احترافية تعكس نشاطك. ظهور في Google والذكاء الاصطناعي.'
                      },
                      {
                        icon: Zap,
                        title: 'أنشئ عروض احترافية',
                        desc: 'عروض أسعار وعقود وفواتير بدقائق بدلاً من الساعات.'
                      },
                      {
                        icon: MessageSquare,
                        title: 'استقبل طلبات العملاء',
                        desc: 'مناقصات مطابقة لتخصصك ومنطقتك الجغرافية.'
                      },
                      {
                        icon: null,
                        isWeyaak: true,
                        title: 'وياك يساعدك 24/7',
                        desc: 'مساعد ذكي يدير أعمالك ويساعدك في كل خطوة.'
                      }
                    ].map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <div key={idx} className="bg-white rounded-2xl border-2 border-white p-6 md:p-8 hover:shadow-lg transition-all">
                          <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-[#0F3F1A]/10 flex items-center justify-center mb-4 md:mb-6">
                            {feature.isWeyaak ? (
                              <Image src="/images/weyaak-logo.jpg" alt="Weyaak" width={56} height={56} className="object-cover rounded-lg" />
                            ) : (
                              <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#0F3F1A]" aria-hidden="true" />
                            )}
                          </div>
                          <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2">{feature.title}</h3>
                          <p className="text-sm md:text-base font-semibold text-gray-600">{feature.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white rounded-2xl border-2 border-[#E6DCC8] p-6 md:p-8 mb-8 md:mb-10">
                    <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-4 md:mb-6">ماذا ستحصل عليه؟</h3>
                    <ul className="space-y-3 md:space-y-4">
                      {[
                        'صفحة احترافية تعكس نشاطك بشكل صحيح',
                        'ظهور في محركات البحث والذكاء الاصطناعي',
                        'طلبات من عملاء حقيقيين يبحثون عن خدماتك',
                        'أدوات لإدارة أعمالك وتنظيم مشاريعك',
                        'دعم مستمر من فريق متخصص ووياك الذكي'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#0F3F1A] flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-base md:text-lg font-semibold text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="https://app.bietalreef.ae/onboarding" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] text-white px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    ابدأ نشاطك الآن
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* ═══ CORE VALUES SECTION ═══ */}
          <section className="bg-[#0F3F1A] py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4">
                  هوية بيت الريف
                </h2>
                <p className="text-base md:text-lg font-semibold text-white/80 max-w-2xl mx-auto">
                  ثلاث قيم أساسية تحرك كل قراراتنا
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    icon: '🎯',
                    title: 'للعميل',
                    desc: 'ابحث كما تريد... واتخذ القرار بنفسك. نحن نسهل عليك الخيارات.'
                  },
                  {
                    icon: '🚀',
                    title: 'لمزود الخدمة',
                    desc: 'أدر نشاطك التجاري بالكامل من هاتفك. نحن نساعدك تنمو.'
                  },
                  {
                    icon: '🌍',
                    title: 'هوية بيت الريف',
                    desc: 'نبني حضورك الرقمي دائماً. لا إعلان مؤقت، بل حضور حقيقي.'
                  }
                ].map((value, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl md:text-5xl mb-4 md:mb-6">{value.icon}</div>
                    <h3 className="text-lg md:text-xl font-black text-white mb-2 md:mb-3">{value.title}</h3>
                    <p className="text-sm md:text-base font-semibold text-white/80">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ UAE DIRECTORY SECTION ═══ */}
          <section className="bg-white py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-3 md:mb-4">
                  دليل الإمارات الشامل
                </h2>
                <p className="text-base md:text-lg font-semibold text-gray-600 max-w-2xl mx-auto">
                  ابحث عن خدمات البناء والمقاولات في جميع الإمارات
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { name: 'دبي', emoji: '🏙️' },
                  { name: 'أبوظبي', emoji: '🏛️' },
                  { name: 'الشارقة', emoji: '🏢' },
                  { name: 'عجمان', emoji: '🏗️' },
                  { name: 'أم القيوين', emoji: '🔨' },
                  { name: 'رأس الخيمة', emoji: '🛠️' },
                  { name: 'الفجيرة', emoji: '⚙️' }
                ].map((emirate, idx) => (
                  <Link key={idx} href={`/uae/${emirate.name.toLowerCase()}`} className="group rounded-2xl border-2 border-[#E6DCC8] bg-white p-6 hover:border-[#0F3F1A] hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="text-3xl md:text-4xl mb-3">{emirate.emoji}</div>
                    <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2">{emirate.name}</h3>
                    <div className="flex items-center gap-2 text-[#0F3F1A] font-black group-hover:translate-x-2 transition-transform">
                      <span className="text-sm">استكشف</span>
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ FINAL CTA ═══ */}
          <section className="bg-[#0F3F1A] py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-4 text-center text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                من أول استفسار... إلى آخر فاتورة
              </h2>
              <p className="text-base md:text-lg font-semibold mb-8 md:mb-10 text-white/90">
                بيت الريف هو نظام التشغيل الرقمي لقطاع المقاولات والبناء في الإمارات
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link href="/services" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white text-[#0F3F1A] px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  ابدأ كعميل
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </Link>
                <a href="https://app.bietalreef.ae/onboarding" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-white text-white px-6 md:px-8 py-3 text-sm md:text-base font-black hover:bg-white/10 transition-all hover:-translate-y-1">
                  ابدأ كمزود خدمة
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
