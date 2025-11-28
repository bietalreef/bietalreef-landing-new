import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";

const services = [
  "مقاولات البناء",
  "الاستشارات الهندسية",
  "التصميم الداخلي",
  "إدارة المشاريع",
  "تأجير المعدات",
  "شركات الصيانة",
  "خدمات التنظيف",
  "محلات الأثاث والديكور"
];

export default function Home() {
  return (
    <>
      <Head>
        <title>بيت الريف – منصة البناء والتصميم وإدارة المشاريع في الإمارات</title>
        <meta
          name="description"
          content="منصة بيت الريف توفر حلولاً متكاملة للبناء والتصميم المعماري وإدارة المشاريع مع أفضل المقاولين في الإمارات، باستخدام الذكاء الاصطناعي."
        />
        <meta
          name="keywords"
          content="البناء في الإمارات, تصميم معماري, مقاولات الإمارات, منصة إدارة مشاريع, أسعار مقاولين"
        />
        <meta property="og:title" content="بيت الريف – منصة البناء والتصميم وإدارة المشاريع في الإمارات" />
        <meta
          property="og:description"
          content="منصة رقمية ذكية تجمع بين أصحاب المشاريع وأفضل المقاولين والمصممين، مع مساعد ذكاء اصطناعي (وياك)."
        />
        <meta property="og:image" content="https://bietalreef.ae/og-weyaak.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae" />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1">
          <Hero />

          <section className="max-w-6xl mx-auto px-4 mt-10">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              الخدمات الرئيسية
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((s) => (
                <ServiceCard key={s} title={s} />
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 mt-12 mb-16">
            <div className="bg-white rounded-xl2 shadow-soft p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  لماذا بيت الريف؟
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  لأننا نجمع لك كل ما تحتاجه في رحلة البناء في منصة واحدة متكاملة مدعومة بالذكاء الاصطناعي.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <li>حلول كاملة في مكان واحد</li>
                <li>اختيار أفضل المتخصصين</li>
                <li>ذكاء اصطناعي للمساعدة (وياك)</li>
                <li>دعم متواصل على مدار الساعة</li>
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
