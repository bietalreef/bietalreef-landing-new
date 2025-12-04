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
        <title>{service.title} - بيت الريف</title>
        <meta name="description" content={service.fullDesc} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.fullDesc} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary to-primary-dark text-white py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 relative">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {service.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 leading-relaxed">
                    {service.fullDesc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://app.bietalreef.ae"
                      className="px-8 py-3 rounded-full bg-white text-primary font-semibold hover:bg-gray-100 transition text-center"
                    >
                      ابدأ الآن
                    </a>
                    <button
                      onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                      className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition text-center"
                    >
                      اعرف المزيد
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              المميزات الرئيسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-soft border-r-4 border-primary"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl text-primary font-bold flex-shrink-0">
                      ✓
                    </div>
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gradient-to-b from-blue-50 to-beige py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                المميزات التقنية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-soft text-center"
                  >
                    <div className="text-4xl text-primary mb-3">⚙️</div>
                    <p className="text-gray-700 font-semibold">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Use Section */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              كيفية الاستخدام
            </h2>
            <div className="space-y-4">
              {service.howToUse.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-lg text-gray-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="bg-gradient-to-b from-green-50 to-beige py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                حالات الاستخدام
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-soft flex items-start gap-4"
                  >
                    <div className="text-3xl flex-shrink-0">📌</div>
                    <p className="text-gray-700">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing & Rating Section */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Price */}
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">السعر</h3>
                <p className="text-3xl font-bold">{service.price}</p>
              </div>

              {/* Rating */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">التقييم</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">{service.rating}</span>
                  <span className="text-2xl">⭐</span>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">التقييمات</h3>
                <p className="text-3xl font-bold">{service.reviews}+</p>
                <p className="text-sm mt-2">تقييم من العملاء</p>
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
                انضم إلى آلاف العملاء الراضين الذين استخدموا خدمة {service.title} وحققوا أحلامهم
              </p>
              <a
                href="https://app.bietalreef.ae"
                className="inline-block px-10 py-4 rounded-full bg-white text-primary font-bold text-lg hover:bg-gray-100 transition"
              >
                ابدأ الآن مجاناً
              </a>
            </div>
          </section>

          {/* Related Services */}
          <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              خدمات أخرى قد تهمك
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Related services would go here */}
              <Link
                href="/services"
                className="text-center text-primary font-semibold hover:underline"
              >
                عرض جميع الخدمات →
              </Link>
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
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
    },
    revalidate: 3600, // Revalidate every hour
  };
}

export async function getStaticPaths() {
  const services = getAllServices();

  return {
    paths: services.map((service) => ({
      params: { id: service.id },
    })),
    fallback: false,
  };
}
