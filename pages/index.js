import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";

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

export default function Home() {
  return (
    <>
      <Head>
        <title>بيت الريف: منصة المقاولات والتصميم الذكية في العين والإمارات</title>
        <meta
          name="description"
          content="منصة بيت الريف و وياك الذكية. حلول متكاملة لإدارة مشاريع البناء، التصميم الداخلي، والمقاولات في العين وأبوظبي والإمارات. ابدأ رحلتك نحو بناء ذكي."
        />
        <meta
          name="keywords"
          content="مقاولات العين, مقاولات أبوظبي, تصميم داخلي الإمارات, إدارة مشاريع البناء, منصة المقاولات الذكية, وياك"
        />
        <meta property="og:title" content="بيت الريف: منصة المقاولات والتصميم الذكية في العين والإمارات" />
        <meta
          property="og:description"
          content="منصة بيت الريف و وياك الذكية تجمع أصحاب المشاريع مع أفضل المقاولين والمصممين المعتمدين في العين وأبوظبي والإمارات."
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
              خدمات متكاملة لرحلة بناء سلسة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((s) => (
                <ServiceCard key={s.title} title={s.title} desc={s.desc} />
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 mt-12 mb-16">
            <div className="bg-white rounded-xl2 shadow-soft p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  لماذا يختار المحترفون في الإمارات منصة بيت الريف؟
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  منصة شاملة تجمع الملاك والمقاولين والمصممين المعتمدين، مدعومة بالذكاء الاصطناعي وياك لإدارة مشاريع ذكية وفعالة.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <li>الذكاء الاصطناعي وياك لحلول فورية</li>
                <li>مقاولون ومصممون معتمدون موثوقون</li>
                <li>شفافية كاملة في التكاليف والجودة</li>
                <li>تطبيق متكامل لإدارة المشاريع بسهولة</li>
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
