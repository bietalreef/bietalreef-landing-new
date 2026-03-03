import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>من نحن | بيت الريف - منصة البناء والصيانة الذكية في الإمارات</title>
        <meta
          name="description"
          content="بيت الريف: منصة إماراتية أصيلة تجسد رؤية الإمارات 2030 في التحول الرقمي والذكاء الاصطناعي لخدمة قطاع المقاولات والبناء. من العين إلى جميع إمارات الدولة."
        />
        <meta name="keywords" content="بيت الريف, من نحن, منصة مقاولات إماراتية, رؤية 2030, ذكاء اصطناعي بناء, وياك" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/about" />
        <meta property="og:title" content="من نحن | بيت الريف - منصة البناء الذكية" />
        <meta property="og:description" content="منصة إماراتية أصيلة تجسد رؤية الإمارات 2030 في التحول الرقمي لقطاع البناء والمقاولات." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/about" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              من نحن: قصة من دار زايد، ورؤية للمستقبل
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </section>

          {/* Introduction */}
          <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border-2 border-primary border-opacity-20">
            <p className="text-base md:text-lg text-gray-800 leading-relaxed">
              وُلد <strong>"بيت الريف"</strong> من قلب الإمارات، حاملاً في طياته <strong>روح الاتحاد</strong> التي غرسها الوالد المؤسس <strong>الشيخ زايد بن سلطان آل نهيان</strong>، طيب الله ثراه. نحن لسنا مجرد منصة، بل نحن بيت إماراتي أصيل يجمع بين خبرة الماضي وطموح المستقبل، لنبني جسراً من الثقة يربط بين كل من يبني ويعمّر على هذه الأرض الطيبة.
            </p>
            <p className="text-base md:text-lg text-gray-800 leading-relaxed mt-4">
              انطلقنا من مدينة <strong>العين، دار الزين</strong>، لنكون جزءاً من مسيرة التطور التي تشهدها دولتنا، مساهمين في تحقيق رؤية قيادتنا الرشيدة في بناء اقتصاد رقمي هو الأكثر ازدهاراً في العالم.
            </p>
          </section>

          {/* Vision Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🇦🇪</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                رؤيتنا: على خطى القيادة
              </h2>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg p-6 md:p-8 border-l-4 border-primary">
              <p className="text-base text-gray-800 leading-relaxed mb-4">
                نحن نستلهم رؤيتنا مباشرة من توجيهات <strong>صاحب السمو الشيخ محمد بن زايد آل نهيان، رئيس الدولة</strong> حفظه الله، في تسريع وتيرة <strong>التحول الرقمي</strong> والاعتماد على <strong>الذكاء الاصطناعي</strong> كركيزة أساسية لمستقبل الإمارات.
              </p>
              <blockquote className="border-r-4 border-primary pr-4 italic text-gray-700 text-sm md:text-base my-6">
                "يجب أن نسرّع وتيرة التحول الرقمي لأن العالم لن ينتظرنا."
                <br />
                <span className="text-xs text-gray-600 not-italic">
                  — صاحب السمو الشيخ محمد بن زايد آل نهيان
                </span>
              </blockquote>
              <p className="text-base text-gray-800 leading-relaxed">
                "بيت الريف" هي تجسيد عملي لهذه الرؤية، حيث نسعى لنكون المنصة الرائدة التي تضع أدوات المستقبل بين يدي كل مواطن ومقيم. نحن ملتزمون بأن نكون في طليعة هذا التحول، مساهمين في تحقيق <strong>رؤية الإمارات 2030</strong> من خلال توفير بنية تحتية تقنية ذكية وآمنة تدعم قطاع المقاولات والبناء، أحد أهم أعمدة اقتصادنا الوطني.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏛️</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                مهمتنا: بناء الثقة وتبسيط الحياة
              </h2>
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
              <p className="text-base text-gray-800 leading-relaxed mb-6">
                تماشياً مع تعليمات <strong>إدارة البلديات والنقل وبلدية مدينة العين</strong>، تتمثل مهمتنا في تبسيط الإجراءات وتسهيل حياة الناس. نحن نؤمن بأن التكنولوجيا يجب أن تكون في خدمة الإنسان، لا العكس. لذلك، قمنا ببناء <strong>منصة آمنة وموثوقة</strong> تضمن الشفافية، تحفظ الحقوق، وتجعل من عملية البناء والتعمير تجربة سهلة وممتعة.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">كيف نحقق ذلك؟</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🔒</span> الأمان
                  </h4>
                  <p className="text-sm text-gray-700">
                    منصة موثقة تضمن حماية بيانات المستخدمين والعقود.
                  </p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">✨</span> الشفافية
                  </h4>
                  <p className="text-sm text-gray-700">
                    أسعار واضحة، تقييمات حقيقية، ومتابعة دقيقة لكل مراحل المشروع.
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚡</span> التبسيط
                  </h4>
                  <p className="text-sm text-gray-700">
                    واجهات سهلة، إجراءات سريعة، وذكاء اصطناعي ينجز عنك المهام المعقدة.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">💪</span> التمكين
                  </h4>
                  <p className="text-sm text-gray-700">
                    نمكّن الحرفي والمقاول والمواطن من إدارة أعمالهم ومشاريعهم من أي مكان وفي أي وقت.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">💎</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                قيمنا: أصالة إماراتية، وتقنية عالمية
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-3xl">🤝</span> روح الاتحاد
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  نعمل كفريق واحد، مواطنين ومقيمين، لبناء مستقبل أفضل لدولتنا.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-3xl">🛡️</span> الثقة والأمانة
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  هي أساس تعاملاتنا. كل عقد، كل درهم، وكل معلومة هي أمانة في أعناقنا.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-3xl">🚀</span> الابتكار والريادة
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  نستخدم أحدث ما توصل إليه الذكاء الاصطناعي لنقدم حلولاً لم يسبقنا إليها أحد.
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-3xl">❤️</span> خدمة المجتمع
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  هدفنا الأسمى هو خدمة أهل الدار، وتسهيل حياتهم، والمساهمة في رفاهيتهم.
                </p>
              </div>
            </div>
          </section>

          {/* Closing Statement */}
          <section className="bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
            <p className="text-lg md:text-xl font-semibold leading-relaxed">
              <strong>بيت الريف</strong> ليس مجرد شركة، بل هو عهد قطعناه على أنفسنا بأن نكون <strong>بناة للثقة</strong>، و<strong>رواداً للمستقبل</strong>، و<strong>أبناءً أوفياء لدار زايد</strong>.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
