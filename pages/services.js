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
        <title>خدمات بيت الريف - مقاولات، تصميم، إدارة مشاريع</title>
        <meta
          name="description"
          content="استكشف جميع خدمات بيت الريف المتكاملة: مقاولات البناء، التصميم الداخلي، إدارة المشاريع، الاستشارات الهندسية، الصيانة، تأجير المعدات، التنظيف، والأثاث والديكور."
        />
        <meta property="og:title" content="خدمات بيت الريف" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary to-primary-dark text-white py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                خدمات بيت الريف المتكاملة
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">
                نقدم لك مجموعة شاملة من الخدمات المتخصصة لتلبية جميع احتياجات مشروعك من البداية إلى النهاية
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <div className="group bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full">
                    {/* Icon Container */}
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center overflow-hidden relative">
                      <div className="relative w-full h-full">
                        <Image
                          src={service.icon}
                          alt={service.title}
                          fill
                          className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {service.shortDesc}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-yellow-400">⭐</span>
                        <span className="font-semibold text-gray-900">
                          {service.rating}
                        </span>
                        <span className="text-gray-500 text-sm">
                          ({service.reviews}+ تقييم)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <p className="text-sm text-gray-600">السعر:</p>
                        <p className="text-lg font-bold text-primary">
                          {service.price}
                        </p>
                      </div>

                      {/* Benefits Preview */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          المميزات الرئيسية:
                        </p>
                        <ul className="space-y-1">
                          {service.benefits.slice(0, 2).map((benefit, index) => (
                            <li
                              key={index}
                              className="text-xs text-gray-600 flex items-start gap-2"
                            >
                              <span className="text-primary flex-shrink-0">✓</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition text-center">
                        اعرف المزيد →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gradient-to-b from-blue-50 to-beige py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
                لماذا تختار خدمات بيت الريف؟
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-bold text-lg mb-2">معتمدون</h3>
                  <p className="text-gray-600">جميع الشركاء معتمدون وموثوقون</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-bold text-lg mb-2">أسعار منافسة</h3>
                  <p className="text-gray-600">أفضل الأسعار في السوق</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-bold text-lg mb-2">سريع وفعال</h3>
                  <p className="text-gray-600">خدمة سريعة وموثوقة</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-bold text-lg mb-2">دعم 24/7</h3>
                  <p className="text-gray-600">فريق دعم متواصل</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                جاهز لبدء مشروعك؟
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                انضم إلى آلاف العملاء الراضين الذين استخدموا خدمات بيت الريف وحققوا أحلامهم
              </p>
              <a
                href="https://app.bietalreef.ae"
                className="inline-block px-10 py-4 rounded-full bg-white text-primary font-bold text-lg hover:bg-gray-100 transition"
              >
                ابدأ الآن مجاناً
              </a>
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
    props: {
      services,
    },
    revalidate: 3600, // Revalidate every hour
  };
}
