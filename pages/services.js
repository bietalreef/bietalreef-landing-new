import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

// Data for the 8 main services
const servicesData = [
  {
    title: "مقاولات البناء",
    desc: "ربط مباشر مع مقاولين معتمدين وموثوقين في العين وأبوظبي، مع سجل إنجازات موثق.",
    slug: "building-contracting",
    icon: "🏗️",
  },
  {
    title: "التصميم الداخلي",
    desc: "استشارات تصميم داخلي وخارجي مدعومة بالذكاء الاصطناعي 'وياك'، لضمان مطابقة الرؤية للميزانية.",
    slug: "interior-design",
    icon: "🛋️",
  },
  {
    title: "إدارة المشاريع",
    desc: "أدوات ذكية لمتابعة سير العمل، الجداول الزمنية، والميزانيات، لضمان تسليم المشروع في الوقت المحدد.",
    slug: "project-management",
    icon: "📊",
  },
  {
    title: "الاستشارات الهندسية",
    desc: "الوصول إلى شبكة من المهندسين والاستشاريين لضمان الامتثال لأعلى معايير الجودة والسلامة في الإمارات.",
    slug: "engineering-consultancy",
    icon: "📐",
  },
  {
    title: "شركات الصيانة",
    desc: "خدمات صيانة سريعة وموثوقة للمباني والمنشآت، مع نظام تقييم شفاف.",
    slug: "maintenance-companies",
    icon: "🛠️",
  },
  {
    title: "تأجير المعدات",
    desc: "منصة لتأجير المعدات الثقيلة والخفيفة من مزودين موثوقين بأسعار تنافسية.",
    slug: "equipment-rental",
    icon: "🚜",
  },
  {
    title: "خدمات التنظيف",
    desc: "تنظيف احترافي للمواقع بعد الانتهاء من البناء والتشطيب.",
    slug: "cleaning-services",
    icon: "🧼",
  },
  {
    title: "محلات الأثاث والديكور",
    desc: "اختيارات متنوعة من الأثاث والديكور من مزودين معتمدين بأسعار منافسة.",
    slug: "furniture-decor",
    icon: "🖼️",
  },
];

export default function Services() {
  return (
    <>
      <Head>
        <title>خدمات بيت الريف: مقاولات، تصميم، إدارة مشاريع في الإمارات</title>
        <meta
          name="description"
          content="اكتشف خدمات بيت الريف المتكاملة: مقاولات البناء، التصميم الداخلي، إدارة المشاريع، والاستشارات الهندسية. حلول ذكية لرحلة بناء سلسة في العين وأبوظبي."
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <header className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-800 mb-3">
              خدمات بيت الريف المتكاملة
            </h1>
            <p className="text-md sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              نقدم لك كل ما تحتاجه في رحلة البناء والتصميم، من الاستشارة الهندسية إلى تسليم المفتاح، مدعومة بالذكاء الاصطناعي "وياك".
            </p>
          </header>

          {/* Services Grid - Mobile First: 1 column, then 2, then 3 */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {servicesData.map((service) => (
              // Link to the future Service Details Page
              <Link key={service.slug} href={`/services/${service.slug}`} passHref>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border-t-4 border-green-600 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="text-3xl sm:text-4xl mr-3">{service.icon}</div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{service.desc}</p>
                  <span className="text-green-600 font-semibold text-sm hover:text-green-700 mt-auto">
                    تعرّف على المزيد ←
                  </span>
                </div>
              </Link>
            ))}
          </section>

          {/* CTA Section - Mobile First */}
          <section className="mt-12 sm:mt-16 text-center bg-green-50 p-6 sm:p-8 rounded-xl shadow-inner">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              جاهز لبدء مشروعك الذكي؟
            </h2>
            <p className="text-md text-gray-600 mb-6">
              حمل تطبيق بيت الريف الآن واستفد من مساعد الذكاء الاصطناعي "وياك" في إدارة مشروعك.
            </p>
            <Link href="#" passHref>
              <a className="bg-green-700 text-white px-6 py-3 rounded-full text-md sm:text-lg font-semibold hover:bg-green-800 transition duration-300 shadow-lg">
                حمل التطبيق الآن
              </a>
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
