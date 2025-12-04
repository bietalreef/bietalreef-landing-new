import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";
import WayakChatWidget from "../components/WayakChatWidget";
import { getAllServices } from "../lib/services-detailed";

const services = [
  { title: "مقاولات البناء", desc: "ربط مع مقاولين معتمدين موثوقين" },
  { title: "التصميم الداخلي", desc: "استشارات مدعومة بالذكاء الاصطناعي" },
  { title: "إدارة المشاريع", desc: "أدوات ذكية لمتابعة سير العمل" },
  { title: "الاستشارات الهندسية", desc: "مهندسون معتمدون لضمان الجودة" },
  { title: "شركات الصيانة", desc: "خدمات صيانة سريعة وموثوقة" },
  { title: "تأجير المعدات", desc: "معدات بأسعار تنافسية" },
  { title: "خدمات التنظيف", desc: "تنظيف احترافي بعد الانتهاء" },
  { title: "الأثاث والديكور", desc: "اختيارات متنوعة وأسعار منافسة" }
];

export default function Home({ allServices }) {
  return (
    <>
      <Head>
        <title>بيت الريف: منصة المقاولات والتصميم الذكية في العين والإمارات</title>
        <meta
          name="description"
          content="منصة بيت الريف و وياك الذكية. سوق متكامل للخدمات والمواد والأثاث. حلول متكاملة لإدارة مشاريع البناء، التصميم الداخلي، والمقاولات في العين وأبوظبي والإمارات. ابدأ رحلتك نحو بناء ذكي."
        />
        <meta
          name="keywords"
          content="مقاولات العين, مقاولات أبوظبي, تصميم داخلي الإمارات, إدارة مشاريع البناء, منصة المقاولات الذكية, وياك, سوق البناء"
        />
        <meta property="og:title" content="بيت الريف: منصة المقاولات والتصميم الذكية في العين والإمارات" />
        <meta
          property="og:description"
          content="منصة بيت الريف و وياك الذكية تجمع أصحاب المشاريع مع أفضل المقاولين والمصممين المعتمدين في العين وأبوظبي والإمارات. سوق متكامل للخدمات والمواد."
        />
        <meta property="og:image" content="https://bietalreef.ae/og-weyaak.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae" />
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F3F1A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="بيت الريف" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1">
          <Hero />

          {/* Detailed Services Section with Flexible Pricing */}
          <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                خدمات متكاملة لرحلة بناء سلسة
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                8 خدمات رئيسية مع باقات مرنة تناسب احتياجاتك وميزانيتك
              </p>
            </div>

            {/* Services Grid with Detailed Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allServices.map((service) => (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-full border border-gray-100 hover:border-primary">
                    {/* Icon Container */}
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

                      {/* Flexible Pricing */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <p className="text-xs text-gray-600 mb-2 font-semibold">الباقات المتاحة:</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-700">خطة مجانية</span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">مجاني</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-700">خطة أساسية</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">منخفض</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-700">خطة احترافية</span>
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded font-semibold">متوسط</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-700">خطة متقدمة</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded font-semibold">متقدم</span>
                          </div>
                        </div>
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
                      <button className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all group-hover:translate-y-[-2px]">
                        اعرف المزيد →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Platform Features Section */}
          <section className="max-w-6xl mx-auto px-4 mt-12 mb-12">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 text-center">
              منصة بيت الريف: سوق متكامل وذكي
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Marketplace Feature */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-soft">
                <div className="text-3xl mb-3">🛒</div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  سوق مواد البناء والديكور
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  تصفح وشتري مواد البناء والأثاث والديكور من أفضل الموردين المعتمدين بأسعار منافسية وتوصيل سريع.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ مواد بناء أصلية معتمدة</li>
                  <li>✓ أثاث وديكور حديث</li>
                  <li>✓ توصيل وتركيب مضمون</li>
                </ul>
              </div>

              {/* Dashboard Feature */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 shadow-soft">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  لوحة تحكم ذكية
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  متابعة شاملة لمشاريعك وتقييماتك ومعاملاتك من لوحة تحكم موحدة. إحصائيات فورية وتقارير مفصلة.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ متابعة المشاريع الحية</li>
                  <li>✓ إحصائيات التقييمات والمعاملات</li>
                  <li>✓ تقارير الأداء والنمو</li>
                </ul>
              </div>

              {/* WEYAAK AI Feature */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 shadow-soft">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  وياك: مساعدك الذكي
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  مساعد ذكاء اصطناعي متقدم يساعدك في اختيار المقاولين، التصاميم، والحلول الأمثل لمشروعك.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ توصيات ذكية مخصصة</li>
                  <li>✓ استشارات فورية 24/7</li>
                  <li>✓ تحسين الخيارات بناءً على احتياجاتك</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 mt-12 mb-16">
            <div className="bg-white rounded-xl2 shadow-soft p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  لماذا يختار المحترفون في الإمارات منصة بيت الريف؟
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  منصة شاملة تجمع الملاك والمقاولين والمصممين المعتمدين، مدعومة بالذكاء الاصطناعي وياك لإدارة مشاريع ذكية وفعالة. سوق متكامل يوفر كل ما تحتاجه من الخدمات إلى المواد والأثاث.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <li>✓ الذكاء الاصطناعي وياك لحلول فورية</li>
                <li>✓ مقاولون ومصممون معتمدون موثوقون</li>
                <li>✓ سوق متكامل للمواد والأثاث</li>
                <li>✓ لوحة تحكم شاملة للمتابعة</li>
                <li>✓ شفافية كاملة في التكاليف والجودة</li>
                <li>✓ تطبيق متكامل لإدارة المشاريع بسهولة</li>
              </ul>
            </div>
          </section>
        </main>
        <Footer />
        <WayakChatWidget />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allServices = getAllServices();
  return {
    props: {
      allServices,
    },
    revalidate: 3600, // Revalidate every hour
  };
}
