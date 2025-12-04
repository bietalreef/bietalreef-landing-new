import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getServiceById, getAllServices } from "../../lib/services-detailed";

export default function ServiceDetail({ service }) {
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
        <title>{service.title} - بيت الريف | منصة الخدمات الذكية</title>
        <meta name="description" content={service.fullDesc} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.fullDesc} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={`${service.title}، خدمات، العين، أبوظبي، الإمارات`} />
      </Head>

      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary to-primary-dark text-white py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 relative bg-white bg-opacity-10 rounded-2xl p-4 flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={180}
                      height={180}
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="inline-block px-4 py-2 rounded-full bg-white bg-opacity-20 text-white text-sm font-semibold mb-4">
                    🤖 وياك يوصيك بهذه الخدمة
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {service.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 leading-relaxed opacity-90">
                    {service.fullDesc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://app.bietalreef.ae"
                      className="px-8 py-3 rounded-full bg-white text-primary font-bold hover:bg-gray-100 transition text-center shadow-lg"
                    >
                      ابدأ الآن مع وياك
                    </a>
                    <button
                      onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                      className="px-8 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition text-center"
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
                <div className="bg-white rounded-xl shadow-soft p-6 text-center border-l-4 border-primary">
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="text-gray-600 text-sm mb-1">التقييم</p>
                  <p className="text-2xl font-bold text-primary">{service.rating}</p>
                  <p className="text-xs text-gray-500">({service.reviews}+ تقييم)</p>
                </div>
                <div className="bg-white rounded-xl shadow-soft p-6 text-center border-l-4 border-green-500">
                  <div className="text-3xl mb-2">💰</div>
                  <p className="text-gray-600 text-sm mb-1">السعر</p>
                  <p className="text-lg font-bold text-green-600">{service.price}</p>
                </div>
                <div className="bg-white rounded-xl shadow-soft p-6 text-center border-l-4 border-blue-500">
                  <div className="text-3xl mb-2">⏱️</div>
                  <p className="text-gray-600 text-sm mb-1">وقت التنفيذ</p>
                  <p className="text-lg font-bold text-blue-600">{service.executionTime || "حسب المشروع"}</p>
                </div>
                <div className="bg-white rounded-xl shadow-soft p-6 text-center border-l-4 border-purple-500">
                  <div className="text-3xl mb-2">🌍</div>
                  <p className="text-gray-600 text-sm mb-1">المناطق</p>
                  <p className="text-lg font-bold text-purple-600">{service.language || "العربية"}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              المميزات الرئيسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 hover:border-primary transition"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Target Audience Section */}
          <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                من يستفيد من هذه الخدمة؟
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
                  <div className="text-4xl mb-4">👨‍💼</div>
                  <h3 className="text-xl font-bold mb-3">الأفراد</h3>
                  <p className="opacity-90">الأفراد الذين يرغبون في تنفيذ مشاريعهم الخاصة بجودة عالية وأسعار منافسة</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-xl font-bold mb-3">الشركات</h3>
                  <p className="opacity-90">الشركات والمؤسسات التي تبحث عن شركاء موثوقين لتنفيذ مشاريعهم</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
                  <div className="text-4xl mb-4">🏗️</div>
                  <h3 className="text-xl font-bold mb-3">المطورون</h3>
                  <p className="opacity-90">المطورون العقاريون الذين يحتاجون إلى فريق متخصص وموثوق</p>
                </div>
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
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-6 text-center h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold mb-2">{step.number}</div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm opacity-90">{step.desc}</p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary text-2xl">
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
                  <p className="text-3xl font-bold text-primary mb-6">مجاني</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>تقييم أولي للمشروع</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>استشارة متخصصة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>توصيات أولية</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition">
                    احجز استشارة
                  </button>
                </div>
                <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl shadow-lg p-8 transform md:scale-105">
                  <div className="bg-white bg-opacity-20 inline-block px-4 py-1 rounded-full text-sm font-bold mb-4">
                    الأكثر شيوعاً
                  </div>
                  <h3 className="text-xl font-bold mb-4">الباقة الأساسية</h3>
                  <p className="text-3xl font-bold mb-6">{service.price}</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      <span>خدمة متكاملة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      <span>متابعة شاملة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold">✓</span>
                      <span>دعم 24/7</span>
                    </li>
                  </ul>
                  <a href="https://app.bietalreef.ae" className="w-full py-3 rounded-lg bg-white text-primary font-bold hover:bg-gray-100 transition block text-center">
                    ابدأ الآن
                  </a>
                </div>
                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">الباقة المتقدمة</h3>
                  <p className="text-3xl font-bold text-primary mb-6">حسب المشروع</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>خدمات مخصصة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>مدير مشروع مخصص</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>أولويات خاصة</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition">
                    تواصل معنا
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Terms Section */}
          <section className="bg-gray-50 py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                الشروط والأحكام
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-soft">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📋 متطلبات المشروع</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• تقديم تفاصيل دقيقة للمشروع</li>
                    <li>• تحديد الميزانية المتاحة</li>
                    <li>• توضيح المتطلبات والأهداف</li>
                    <li>• توفير المستندات اللازمة</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-soft">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">✅ ضمانات الخدمة</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• ضمان جودة العمل</li>
                    <li>• الالتزام بالمواعيد المحددة</li>
                    <li>• الالتزام بالميزانية المتفق عليها</li>
                    <li>• دعم ما بعد الانتهاء</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              عن هذه الخدمة
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 md:p-12 border border-gray-200">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {service.fullDesc}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                نحن نوفر هذه الخدمة من خلال شبكة من المتخصصين الموثوقين والمعتمدين في العين وأبوظبي وجميع إمارات الدولة.
                كل مزود خدمة يتم اختياره بعناية ويمتلك سجل إنجازات موثق وتقييمات عالية من العملاء السابقين.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                مع وياك - مساعدك الشخصي الإماراتي - ستتمكن من اختيار أفضل مزود خدمة يناسب احتياجاتك وميزانيتك.
                نحن هنا لجعل رحلتك أسهل وأكثر أماناً وثقة.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                جاهز لبدء مشروعك؟
              </h2>
              <p className="text-lg mb-10 max-w-2xl mx-auto">
                انضم إلى آلاف العملاء الراضين الذين استخدموا منصة بيت الريف وحققوا أحلامهم
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.bietalreef.ae"
                  className="px-8 py-3 rounded-full bg-white text-primary font-bold hover:bg-gray-100 transition shadow-lg"
                >
                  ابدأ الآن مع وياك
                </a>
                <Link
                  href="/services"
                  className="px-8 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition"
                >
                  استكشف الخدمات الأخرى
                </Link>
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
  if (!service) {
    return { notFound: true };
  }
  return {
    props: { service },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const services = getAllServices();
  const paths = services.map((service) => ({
    params: { id: service.id },
  }));
  return {
    paths,
    fallback: false,
  };
}
