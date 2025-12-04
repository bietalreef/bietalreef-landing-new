import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getServiceById, getSubServices } from "../../lib/comprehensive-services";
import { getServiceById as getServiceFromDetailed } from "../../lib/services-detailed";

export default function ServiceDetail({ service, subServices }) {
  const [selectedSubService, setSelectedSubService] = useState(null);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">الخدمة غير موجودة</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{service.name} - بيت الريف | منصة الخدمات الذكية</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={service.name} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={`${service.name}، خدمات، العين، أبوظبي، الإمارات`} />
      </Head>

      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 relative bg-white bg-opacity-10 rounded-2xl p-4 flex items-center justify-center">
                    <div className="text-8xl md:text-9xl">{service.icon}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="inline-block px-4 py-2 rounded-full bg-white bg-opacity-20 text-white text-sm font-semibold mb-4">
                    🤖 وياك يوصيك بهذه الخدمة
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {service.name}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 leading-relaxed opacity-90">
                    {service.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://app.bietalreef.ae"
                      className="px-8 py-3 rounded-full bg-white text-blue-600 font-bold hover:bg-gray-100 transition text-center shadow-lg"
                    >
                      ابدأ الآن مع وياك
                    </a>
                    <button
                      onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                      className="px-8 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-blue-600 transition text-center"
                    >
                      اعرف المزيد ↓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Info Cards */}
          <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white rounded-xl shadow-soft p-6 text-center border-l-4 border-blue-600">
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="text-gray-600 text-sm mb-1">التقييم</p>
                  <p className="text-2xl font-bold text-blue-600">{service.rating}</p>
                  <p className="text-xs text-gray-500">({service.reviews}+ تقييم)</p>
                </div>
                <div className="bg-white rounded-xl shadow-soft p-6 text-center border-l-4 border-green-500">
                  <div className="text-3xl mb-2">💰</div>
                  <p className="text-gray-600 text-sm mb-1">السعر</p>
                  <p className="text-lg font-bold text-green-600">من {service.basePrice} درهم</p>
                </div>
                <div className="bg-white rounded-xl shadow-soft p-6 text-center border-l-4 border-orange-500">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-gray-600 text-sm mb-1">الخدمات الفرعية</p>
                  <p className="text-lg font-bold text-orange-600">{subServices.length}+ خدمة</p>
                </div>
                <div className="bg-white rounded-xl shadow-soft p-6 text-center border-l-4 border-purple-500">
                  <div className="text-3xl mb-2">🌍</div>
                  <p className="text-gray-600 text-sm mb-1">المناطق</p>
                  <p className="text-lg font-bold text-purple-600">جميع الإمارات</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sub-Services Section */}
          {subServices && subServices.length > 0 && (
            <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                  الخدمات الفرعية المتاحة
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                  استكشف جميع الخدمات الفرعية المتاحة ضمن هذه الفئة واختر ما يناسب احتياجاتك
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subServices.map((subService, index) => (
                    <div
                      key={subService.id}
                      onClick={() => setSelectedSubService(subService)}
                      className="group bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-600 cursor-pointer"
                    >
                      {/* Card Header with Icon */}
                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{subService.name}</h3>
                          <p className="text-sm opacity-90">{subService.description}</p>
                        </div>
                        <div className="text-4xl flex-shrink-0 ml-4">{subService.icon}</div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                            الخدمة {index + 1}
                          </span>
                          <span className="text-blue-600 font-bold group-hover:translate-x-2 transition">→</span>
                        </div>

                        {/* CTA Button */}
                        <a
                          href="https://app.bietalreef.ae"
                          className="w-full py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition text-sm text-center block"
                        >
                          اطلب هذه الخدمة
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Service Features Grid */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              مميزات هذه الفئة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-blue-600 transition">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                    ⭐
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">متخصصون معتمدون</h3>
                  <p className="text-gray-600 text-sm">فريق من المتخصصين المعتمدين والموثوقين في المجال</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-blue-600 transition">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                    💰
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">أسعار منافسة</h3>
                  <p className="text-gray-600 text-sm">أفضل الأسعار مع ضمان الجودة العالية والخدمة المميزة</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-blue-600 transition">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                    🎯
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">خدمة مخصصة</h3>
                  <p className="text-gray-600 text-sm">خدمات مخصصة حسب احتياجات كل عميل وميزانيته</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-blue-600 transition">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                    ✅
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">ضمان الجودة</h3>
                  <p className="text-gray-600 text-sm">ضمان كامل على جودة الخدمة المقدمة والالتزام بالمواعيد</p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-blue-600 transition">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                    📞
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">دعم 24/7</h3>
                  <p className="text-gray-600 text-sm">فريق دعم متاح على مدار الساعة للإجابة على استفساراتك</p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-blue-600 transition">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white text-xl">
                    🗺️
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">توفر في جميع المناطق</h3>
                  <p className="text-gray-600 text-sm">متوفرة في جميع مناطق الإمارات العربية المتحدة</p>
                </div>
              </div>
            </div>
          </section>

          {/* Service Comparison Table */}
          <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                مقارنة الخدمات الفرعية
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                      <th className="px-6 py-4 text-right font-bold">الخدمة</th>
                      <th className="px-6 py-4 text-center font-bold">الوصف</th>
                      <th className="px-6 py-4 text-center font-bold">التقييم</th>
                      <th className="px-6 py-4 text-center font-bold">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subServices && subServices.map((subService, index) => (
                      <tr
                        key={subService.id}
                        className={`border-b border-gray-200 hover:bg-blue-50 transition ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-gray-900">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{subService.icon}</span>
                            {subService.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {subService.description}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                            ⭐ 4.8
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href="https://app.bietalreef.ae"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm inline-block"
                          >
                            اطلب الآن
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              كيفية الاستخدام
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
              {[
                { number: "1", title: "سجل مشروعك", desc: "أضف تفاصيل مشروعك والميزانية" },
                { number: "2", title: "اختر الخدمة", desc: "اختر الخدمة المناسبة لاحتياجاتك" },
                { number: "3", title: "قارن العروض", desc: "قارن بين عروض مزودي الخدمات" },
                { number: "4", title: "اختر المزود", desc: "اختر أفضل مزود خدمة" },
                { number: "5", title: "تابع المشروع", desc: "تابع مشروعك من البداية للنهاية" },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6 text-center h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold mb-2">{step.number}</div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm opacity-90">{step.desc}</p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-blue-600 text-2xl">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                الأسعار والباقات
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">الاستشارة المجانية</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-6">مجاني</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>تقييم أولي للمشروع</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>استشارة متخصصة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>توصيات أولية</span>
                    </li>
                  </ul>
                  <a
                    href="https://app.bietalreef.ae"
                    className="w-full py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition text-center block"
                  >
                    احجز استشارة
                  </a>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-8 transform md:scale-105">
                  <div className="bg-white bg-opacity-20 inline-block px-4 py-1 rounded-full text-sm font-bold mb-4">
                    الأكثر شيوعاً
                  </div>
                  <h3 className="text-xl font-bold mb-4">الباقة الأساسية</h3>
                  <p className="text-3xl font-bold mb-6">من {service.basePrice} درهم</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      <span>خدمة متكاملة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      <span>متابعة دورية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      <span>تقارير شاملة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      <span>دعم فني متواصل</span>
                    </li>
                  </ul>
                  <a
                    href="https://app.bietalreef.ae"
                    className="w-full py-3 rounded-lg bg-white text-blue-600 font-bold hover:bg-gray-100 transition text-center block"
                  >
                    اختر الباقة
                  </a>
                </div>
                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">الباقة المتقدمة</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-6">حسب المشروع</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>خدمة مخصصة كاملة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>فريق متخصص مخصص</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>متابعة يومية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>ضمان شامل</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/971567856001"
                    className="w-full py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition text-center block"
                  >
                    تواصل معنا
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                هل أنت مستعد للبدء؟
              </h2>
              <p className="text-lg mb-8 opacity-90">
                اختر الخدمة المناسبة لك الآن واحصل على عرض سعر مخصص من متخصصينا المعتمدين
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.bietalreef.ae"
                  className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold hover:bg-gray-100 transition shadow-lg"
                >
                  ابدأ الآن
                </a>
                <a
                  href="https://wa.me/971567856001"
                  className="px-8 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-blue-600 transition"
                >
                  تواصل معنا عبر WhatsApp
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

export async function getStaticProps({ params }) {
  const service = getServiceById(params.id);
  const subServices = getSubServices(params.id);

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
      subServices,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const services = [
    'construction',
    'interior-design',
    'project-management',
    'engineering-consultation',
    'maintenance',
    'equipment-rental',
    'cleaning-services',
    'furniture-decoration',
    'building-materials',
    'specialized-services'
  ];

  const paths = services.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}
