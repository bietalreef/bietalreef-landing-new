import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SERVICE_CATEGORIES, UAE_EMIRATES } from '../data/siteTaxonomy';
import { getAllServices } from '../lib/services-detailed';

export default function Home({ allServices }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // الصور المعتمدة للـ Hero Slider فقط
  const heroSlides = [
    {
      src: '/bait-alreef-construction-catalog.webp',
      alt: 'منصة بيت الريف للبناء والمقاولات والصيانة في الإمارات',
      title: 'منصة بيت الريف الذكية',
    },
    {
      src: '/bait-alreef-hero-18.webp',
      alt: 'خدمات بناء الفلل والمقاولات في الإمارات عبر بيت الريف',
      title: 'مقاولات وبناء فلل في الإمارات',
    },
    {
      src: '/bait-alreef-hero-2.webp',
      alt: 'تصميم وتنفيذ مشاريع البناء الحديثة في الإمارات',
      title: 'مشاريع البناء والتصميم في الإمارات',
    },
    {
      src: '/images/seo/categories/interior-design.webp',
      alt: 'خدمات التصميم الداخلي والديكور في الإمارات عبر منصة بيت الريف',
      title: 'التصميم الداخلي والديكور في الإمارات',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (i) => setCurrentSlide(i);

  return (
    <>
      <Head>
        <title>بيت الريف | المنصة الذكية لخدمات المقاولات والصيانة والتصميم في الإمارات</title>
        <meta name="description" content="بيت الريف هي وجهتك الأولى لخدمات البناء والصيانة والديكور في الإمارات. نجمع بين التكنولوجيا والاحترافية لتقديم تجربة فريدة لملاك العقارات ومزودي الخدمات." />
        <link rel="canonical" href="https://bietalreef.ae" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-white text-gray-900 font-sans">
        <Navbar />

        <main>
          {/* ══ Hero Section ══ */}
          <section className="w-full bg-white py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                {/* Slider — يسار على Desktop (نهاية السطر في RTL)، أعلى على Mobile */}
                <div className="w-full lg:w-7/12 order-1 lg:order-2">
                  <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl">
                    {heroSlides.map((slide, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                          index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          title={slide.title}
                          fill
                          className="object-cover object-center"
                          priority={index === 0}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                      </div>
                    ))}

                    {/* Dots */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                      {heroSlides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToSlide(i)}
                          aria-label={`الانتقال إلى الشريحة ${i + 1}`}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* المحتوى — يمين على Desktop (بداية السطر في RTL)، أسفل على Mobile */}
                <div className="w-full lg:w-5/12 text-right order-2 lg:order-1">

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold mb-5">
                    منصة بيت الريف
                  </div>

                  {/* H1 */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
                    منصة بيت الريف للبناء والمقاولات والصيانة في الإمارات
                  </h1>

                  {/* الوصف المختصر */}
                  <p className="text-base font-bold text-gray-700 mb-4 leading-relaxed">
                    دليلك الذكي للوصول إلى المقاولين، المكاتب الهندسية، الحرفيين، الموردين، المصانع، ومعارض مواد البناء في جميع إمارات دولة الإمارات العربية المتحدة.
                  </p>

                  {/* الفقرة */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    تجمع منصة بيت الريف بين أصحاب المشاريع ومزودي الخدمات في مكان واحد، مع إمكانية البحث حسب الإمارة والمدينة والتخصص، واستكشاف خدمات البناء والتشطيب والتصميم الداخلي ومواد البناء بطريقة منظمة وسهلة.
                  </p>

                  {/* فقرة وياك */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-8">
                    وياك هو مساعدك الذكي داخل منصة بيت الريف، صُمم ليفهم احتياجاتك، ويقترح عليك الخدمات والتخصصات المناسبة، ويرشدك خطوة بخطوة حتى تصل إلى مزود الخدمة الأنسب لمشروعك.
                  </p>

                  {/* الزر الوحيد */}
                  <Link
                    href="#weyaak-assistant"
                    className="inline-block px-8 py-4 bg-[#D4AF37] text-white rounded-2xl font-black text-base shadow-lg shadow-[#D4AF37]/20 hover:bg-[#b8922b] transition-all"
                  >
                    ابدأ مع وياك
                  </Link>

                </div>
              </div>
            </div>
          </section>

          {/* ══ Weyaak AI Section - Restored ══ */}
          <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Image src="/bait-alreef-weyaak-fast-response-advantage.webp" alt="Background" fill className="object-cover" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full text-amber-400 font-bold mb-6 border border-amber-500/30">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
                    وياك AI متوفر الآن
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                    وكيلك الذكي <br />
                    <span className="text-[#D4AF37]">في كل خطوة بناء</span>
                  </h2>
                  <p className="text-white/70 text-lg mb-8 leading-relaxed font-medium">
                    لا تشغل بالك بالتفاصيل التقنية، وياك يفهم احتياجاتك، يقارن بين الموردين، ويقترح عليك الحلول الأمثل لميزانيتك وجدولك الزمني.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/weyaak" className="px-8 py-4 bg-[#D4AF37] text-gray-900 rounded-2xl font-black shadow-lg hover:bg-[#B8922B] transition-colors">
                      تحدث مع وياك
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                    <div className="space-y-4">
                      {[
                        "احسب لي كمية الرخام المطلوبة لفيلا 400 متر",
                        "من هم أفضل مقاولي التكييف في أبوظبي؟",
                        "قارن لي بين أسعار حديد الإمارات والحديد العماني"
                      ].map((msg, i) => (
                        <div key={i} className={`p-4 rounded-2xl text-sm font-bold ${i === 1 ? 'bg-[#D4AF37] text-gray-900 mr-8' : 'bg-white/10 text-white ml-8'}`}>
                          {msg}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ Main Portals - Visual Cards ══ */}
          <section className="py-24 max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">بوابات بيت الريف المتخصصة</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg">حلول مصممة خصيصاً لتلبية احتياجات كافة أطراف قطاع البناء</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "بوابة الملاك", desc: "أدوات ذكية لإدارة مشاريعك وتتبع الصيانة.", img: "/bait-alreef-ecosystem-overview.webp", link: "/uae" },
                { title: "بوابة مزودي الخدمة", desc: "نمِّ أعمالك من خلال منصة احترافية.", img: "/bait-alreef-join-elite-smart-future.webp", link: "/providers" },
                { title: "سوق مواد البناء", desc: "اكتشف مواد البناء والديكور من أفضل الموردين.", img: "/bait-alreef-marketplace-materials.webp", link: "/categories/building-materials" }
              ].map((portal, i) => (
                <Link key={i} href={portal.link} className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#E6DCC8] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={portal.img} alt={portal.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 right-8 text-white"><h3 className="text-2xl font-black">{portal.title}</h3></div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 leading-relaxed mb-6 font-medium">{portal.desc}</p>
                    <span className="text-[#D4AF37] font-black group-hover:translate-x-[-4px] transition-transform block">استكشف الآن ←</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ══ Featured Services - Restored ══ */}
          <section className="py-20 bg-[#FDFBF7]">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl md:text-4xl font-black text-gray-900">الخدمات الأكثر طلباً</h2>
                <Link href="/categories" className="text-sm font-bold text-[#D4AF37] hover:underline">عرض الكل</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {SERVICE_CATEGORIES.slice(0, 4).map((service) => (
                  <Link key={service.slug} href={`/categories/${service.slug}`} className="group bg-white p-8 rounded-3xl border border-[#E6DCC8] hover:border-[#D4AF37] transition-all text-center shadow-sm hover:shadow-xl">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                    <h3 className="font-black text-gray-900 text-lg mb-2">{service.nameAr}</h3>
                    <p className="text-xs text-gray-500 font-medium line-clamp-2">{service.descAr}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ══ Stats Section - Restored ══ */}
          <section className="max-w-7xl mx-auto px-4 py-20 border-t border-[#E6DCC8]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "أداة ذكاء اصطناعي", value: "47" },
                { label: "مزود خدمة معتمد", value: "1,200+" },
                { label: "مشروع مكتمل", value: "5,000+" },
                { label: "إمارات الدولة", value: "7" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-5xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allServices = getAllServices();
  return {
    props: { allServices },
    revalidate: 3600,
  };
}
