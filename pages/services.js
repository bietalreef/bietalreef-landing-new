import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";

const services = [
  "مقاولات البناء",
  "الاستشارات الهندسية",
  "التصميم الداخلي والخارجي",
  "تأجير المعدات",
  "المقاولات المتخصصة",
  "الصيانة والتنظيف",
  "متاجر الديكور",
  "مواد البناء"
];

export default function Services() {
  return (
    <>
      <Head>
        <title>خدماتنا – بيت الريف</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            خدماتنا
          </h1>
          <p className="text-sm text-gray-700 mb-6 max-w-2xl">
            في بيت الريف، نقدّم مجموعة واسعة من الخدمات التي تغطي جميع مراحل البناء من التصميم إلى
            التنفيذ، مع إمكانية الربط المباشر مع أفضل مزوّدي الخدمات في الإمارات.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((s) => (
              <ServiceCard key={s} title={s} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
