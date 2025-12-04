import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";

// Placeholder data for service details (will be replaced by dynamic content later)
const serviceDetails = {
  "building-contracting": {
    title: "مقاولات البناء",
    icon: "🏗️",
    content: "خدمة المقاولات المعتمدة تربطك بأفضل شركات البناء في العين وأبوظبي. نضمن لك الجودة، الشفافية في التكاليف، والالتزام بالجداول الزمنية. ابدأ مشروعك بثقة مع مقاولين موثوقين.",
    metaDesc: "ابحث عن أفضل مقاولي البناء المعتمدين في العين وأبوظبي. جودة مضمونة، شفافية في التكاليف، وإدارة احترافية لمشروعك.",
    features: ["مقاولون معتمدون", "عقود موحدة", "متابعة رقمية"],
  },
  "interior-design": {
    title: "التصميم الداخلي",
    icon: "🛋️",
    content: "استشارات تصميم داخلي وخارجي متقدمة. استخدم مساعد الذكاء الاصطناعي 'وياك' لتحويل رؤيتك إلى واقع، مع مراعاة الميزانية وأحدث الاتجاهات العالمية.",
    metaDesc: "خدمات تصميم داخلي وخارجي متقدمة في الإمارات. استشارات مدعومة بالذكاء الاصطناعي 'وياك' لتحقيق تصميم أحلامك.",
    features: ["استشارات ذكية", "تصميم 3D", "ربط بالموردين"],
  },
  // Add other services here for completeness
};

export default function ServiceDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const service = serviceDetails[slug] || {
    title: "الخدمة غير متوفرة",
    icon: "❓",
    content: "نعتذر، الخدمة المطلوبة غير متوفرة حالياً أو لم يتم تحديد تفاصيلها بعد.",
    metaDesc: "خدمة غير متوفرة.",
    features: [],
  };

  return (
    <>
      <Head>
        <title>{service.title} | بيت الريف</title>
        <meta name="description" content={service.metaDesc} />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <Link href="/services" passHref>
            <a className="text-green-600 hover:text-green-800 text-sm mb-4 block">
              ← العودة إلى قائمة الخدمات
            </a>
          </Link>
          
          <header className="mb-8">
            <div className="text-5xl mb-3">{service.icon}</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
              {service.title}
            </h1>
            <p className="text-lg text-gray-600">{service.metaDesc}</p>
          </header>

          <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              نظرة عامة على الخدمة
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {service.content}
            </p>

            {service.features.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  الميزات الرئيسية
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="mt-8 text-center bg-green-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              ابدأ الآن
            </h2>
            <p className="text-md text-gray-600 mb-6">
              للاستفادة الكاملة من هذه الخدمة، حمل تطبيق بيت الريف وتواصل مع أفضل المتخصصين.
            </p>
            <Link href="#" passHref>
              <a className="bg-green-700 text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-green-800 transition duration-300 shadow-lg">
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
