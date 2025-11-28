import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Platform() {
  return (
    <>
      <Head>
        <title>منصة بيت الريف – إدارة مشاريع البناء</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-10 space-y-8">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              ما هي منصة بيت الريف؟
            </h1>
            <p className="text-sm text-gray-700 max-w-2xl leading-relaxed">
              منصة رقمية ذكية تجمع أصحاب المشاريع مع أفضل المقاولين والمصممين، وتوفر أدوات متقدمة لإدارة
              المشاريع باستخدام الذكاء الاصطناعي. يمكنك من خلالها متابعة مشروعك من أول فكرة وحتى التسليم
              النهائي.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl2 shadow-soft p-5">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">
                مزايا المنصة
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>لوحة تحكم متكاملة لمشاريعك.</li>
                <li>تتبع المشروع خطوة بخطوة.</li>
                <li>إدارة ملفاتك ومخططاتك في مكان واحد.</li>
                <li>مساعد ذكاء اصطناعي “وياك” لمساعدتك في القرارات.</li>
                <li>نظام عروض أسعار من عدة مقاولين.</li>
              </ul>
            </div>

            <div className="bg-softBlue rounded-xl2 shadow-soft p-5 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-gray-900 mb-2 text-sm">
                  وياك – الذكاء الاصطناعي بين يديك
                </h2>
                <p className="text-xs text-gray-700 mb-4 leading-relaxed">
                  اسأل وياك عن التصميم الداخلي، الكميات التقديرية، خيارات التشطيب، أو إدارة العقود، وسيقدّم
                  لك إجابات فورية تساعدك على اتخاذ القرار بشكل أوضح وأسرع.
                </p>
              </div>
              <a
                href="https://app.bietalreef.ae"
                className="inline-flex justify-center items-center px-5 py-3 rounded-full bg-primary text-white text-sm font-medium self-start"
              >
                جرّب المنصة الآن
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
