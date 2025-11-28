import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>من نحن – بيت الريف</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-10 space-y-8">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              من نحن؟
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed">
              شركة بيت الريف تأسست لتبسيط رحلة البناء في الإمارات عبر منصة متكاملة تجمع بين الجودة،
              الاحتراف، والتقنية الحديثة. نسعى إلى ربط أصحاب المشاريع مع أفضل المتخصصين في قطاع البناء
              والتصميم، وتقديم تجربة رقمية سلسة وواضحة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              رؤيتنا
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              أن نكون المنصة الأولى في الإمارات لإدارة مشاريع البناء، وأن نعيد تعريف طريقة تواصل العملاء مع
              المقاولين والمصممين من خلال حلول رقمية مبتكرة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              رسالتنا
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              تسهيل رحلة العميل من الفكرة حتى التسليم، عبر أدوات واضحة، معلومات دقيقة، ودعم مستمر يساعده
              على اتخاذ القرار الصحيح في الوقت المناسب.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              قيمنا
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="bg-white rounded-xl2 shadow-soft p-3">الجودة</li>
              <li className="bg-white rounded-xl2 shadow-soft p-3">الالتزام</li>
              <li className="bg-white rounded-xl2 shadow-soft p-3">الشفافية</li>
              <li className="bg-white rounded-xl2 shadow-soft p-3">الابتكار</li>
            </ul>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
