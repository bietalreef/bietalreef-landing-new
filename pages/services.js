import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllServices } from "../lib/services-detailed";

export default function Services({ services }) {
  return (
    <>
      <Head>
        <title>خدمات بيت الريف | مقاولات، صيانة، تصميم داخلي، مواد بناء في دبي وأبوظبي والعين والإمارات</title>
        <meta
          name="description"
          content="استكشف خدمات بيت الريف المتكاملة: مقاولات بناء، استشارات هندسية، شركات صيانة، عمالة حرفية، ورش صناعية، تأجير معدات، مواد بناء، أثاث وديكور، وخدمات نظافة. مقاولون معتمدون في دبي، أبوظبي، العين، الشارقة وجميع الإمارات."
        />
        <meta name="keywords" content="خدمات بناء الإمارات, مقاولات دبي, مقاولات أبوظبي, صيانة العين, تصميم داخلي الشارقة, سباكة, كهرباء, تكييف, دهانات, نجارة, ورش حدادة, تأجير معدات بناء, مواد بناء, أثاث وديكور, تنظيف منازل" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/services" />
        <meta property="og:title" content="خدمات بيت الريف | مقاولات، صيانة، تصميم داخلي في الإمارات" />
        <meta property="og:description" content="سوق متكامل لخدمات البناء والصيانة والتصميم في جميع الإمارات. مقاولون معتمدون وحرفيون موثقون." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/services" />
        <meta property="og:image" content="https://bietalreef.ae/og-weyaak.jpg" />
      </Head>

      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-dark text-white py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-20 text-white text-xs mb-6">
                <span>🤖 وياك</span>
                <span>يساعدك في اختيار الخدمة المناسبة</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                خدمات بيت الريف المتكاملة
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-2">
                منصة ذكية توفر لك أفضل الخدمات في العين وأبوظبي وجميع إمارات الدولة
              </p>
              <p className="text-base md:text-lg max-w-3xl mx-auto opacity-90">
                مع وياك - مساعدك الشخصي الإماراتي - اختر الخدمة المناسبة بكل سهولة وثقة
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-full border border-gray-100 hover:border-primary">
                    {/* Icon Container - Improved 3D Display */}
                    <div className="h-40 bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center overflow-hidden relative border-b-2 border-gray-100">
                      <div className="relative w-32 h-32">
                        <Image
                          src={service.icon}
                          alt={service.title}
                          fill
                          className="object-contain p-2 group-hover:scale-125 transition-transform duration-500 drop-shadow-lg"
                        />
                      </div>
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {service.shortDesc}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-yellow-400 text-lg">⭐</span>
                        <span className="font-bold text-gray-900">
                          {service.rating}
                        </span>
                        <span className="text-gray-500 text-xs">
                          ({service.reviews}+)
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">السعر:</p>
                        <p className="text-base font-bold text-primary bg-primary bg-opacity-10 px-3 py-2 rounded-lg inline-block">
                          {service.price}
                        </p>
                      </div>

                      {/* Quick Features */}
                      <div className="mb-4">
                        <ul className="space-y-1.5">
                          {service.benefits.slice(0, 2).map((benefit, index) => (
                            <li
                              key={index}
                              className="text-xs text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-primary font-bold flex-shrink-0 mt-0.5">✓</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-300 text-sm group-hover:shadow-lg">
                        اعرف المزيد →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                لماذا تختار منصة بيت الريف؟
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 rounded-xl bg-white shadow-soft hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">معتمدون وموثوقون</h3>
                  <p className="text-gray-600 text-sm">جميع مزودي الخدمات معتمدون وموثوقون مع سجل إنجازات موثق</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white shadow-soft hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">💰</div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">أسعار منافسة</h3>
                  <p className="text-gray-600 text-sm">أفضل الأسعار في السوق مع مقارنة سهلة بين العروض</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white shadow-soft hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">سريع وفعال</h3>
                  <p className="text-gray-600 text-sm">خدمة سريعة وفعالة مع متابعة شاملة لمشروعك</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white shadow-soft hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">🤖</div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">وياك - مساعدك الذكي</h3>
                  <p className="text-gray-600 text-sm">مساعد شخصي إماراتي يساعدك في اتخاذ القرار الأفضل</p>
                </div>
              </div>
            </div>
          </section>

          {/* Location Focus Section */}
          <section className="bg-primary text-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                خدماتنا في جميع إمارات الدولة
              </h2>
              <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
                نركز بشكل خاص على العين وأبوظبي، مع توفر الخدمات في جميع إمارات الدولة
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition">
                  <div className="text-2xl mb-2">📍</div>
                  <p className="font-semibold">العين</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition">
                  <div className="text-2xl mb-2">📍</div>
                  <p className="font-semibold">أبوظبي</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition">
                  <div className="text-2xl mb-2">📍</div>
                  <p className="font-semibold">دبي</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-30 transition">
                  <div className="text-2xl mb-2">📍</div>
                  <p className="font-semibold">الشارقة</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                جاهز لبدء مشروعك؟
              </h2>
              <p className="text-lg mb-10 max-w-2xl mx-auto">
                انضم إلى آلاف العملاء الراضين الذين استخدموا منصة بيت الريف وحققوا أحلامهم مع وياك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.bietalreef.ae"
                  className="px-8 py-3 rounded-full bg-white text-primary font-bold hover:bg-gray-100 transition shadow-lg"
                >
                  ابدأ الآن مع وياك
                </a>
                <Link
                  href="/"
                  className="px-8 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          </section>
          {/* ═══ Services Visual Gallery — 8 Images ═══ */}
          <section dir="rtl" className="w-full bg-[#0F3F1A] py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-center text-white text-xl md:text-2xl font-bold mb-2">
                مشاريعنا وخدماتنا بالصور
              </h2>
              <p className="text-center text-[#D4AF37] text-sm mb-8">
                مقاولات · صيانة · تشطيبات · معدات
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { src: "/bait-alreef-construction-catalog.webp", alt: "كتالوج المقاولات" },
                  { src: "/bait-alreef-management-catalog.webp",   alt: "كتالوج الإدارة" },
                  { src: "/bait-alreef-hero-2.webp",                alt: "خدمات البناء" },
                  { src: "/bait-alreef-hero-4.webp",                alt: "مشاريع الصيانة" },
                  { src: "/bait-alreef-hero-6.webp",                alt: "التشطيبات الداخلية" },
                  { src: "/bait-alreef-hero-8.webp",                alt: "الأعمال الهندسية" },
                  { src: "/bait-alreef-hero-10.webp",               alt: "معدات البناء" },
                  { src: "/hero-services-1.jpg",                   alt: "خدمات متكاملة" },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-md group"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      <span className="text-white text-xs font-semibold">{img.alt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const services = getAllServices();
  return {
    props: { services },
    revalidate: 3600, // Revalidate every hour
  };
}
