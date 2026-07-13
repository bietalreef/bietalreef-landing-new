import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const values = [
  {
    icon: "🧭",
    title: "الخبرة العملية",
    text: "نبني حلولنا من واقع سوق المقاولات واحتياجات العاملين فيه، لا من افتراضات بعيدة عن الميدان."
  },
  {
    icon: "🔎",
    title: "الوضوح والشفافية",
    text: "ننظم المعلومات والخدمات ونطاقات العمل بصورة مفهومة، ونتجنب الوعود التي لا يمكن ضمانها."
  },
  {
    icon: "⚖️",
    title: "العدالة في الوصول",
    text: "نعطي الأولوية لتوافق النشاط والخدمة والموقع وجودة البيانات، وليس للدفع وحده."
  },
  {
    icon: "🤖",
    title: "الابتكار المسؤول",
    text: "نستخدم الذكاء الاصطناعي لتبسيط البحث ودعم القرار، مع الحفاظ على دور الخبرة البشرية."
  }
];

const faqItems = [
  {
    question: "ما هي بيت الريف؟",
    answer:
      "بيت الريف منصة رقمية إماراتية متخصصة في تنظيم الوصول إلى مزودي خدمات البناء والمقاولات والتشطيبات والصيانة ومواد البناء في دولة الإمارات."
  },
  {
    question: "لماذا أُنشئت بيت الريف؟",
    answer:
      "أُنشئت بيت الريف نتيجة خبرة عملية تجاوزت عشر سنوات في سوق المقاولات، كشفت صعوبة الوصول إلى مقاولي الباطن والموردين المناسبين ومقارنة الخدمات والأسعار والخامات."
  },
  {
    question: "كيف تساعد بيت الريف العميل؟",
    answer:
      "تساعد العميل على توضيح احتياجه، والبحث حسب الخدمة والموقع، واستعراض مزودي الخدمات، والتواصل معهم أو إرسال طلب عرض سعر."
  },
  {
    question: "كيف تساعد بيت الريف مزود الخدمة؟",
    answer:
      "تمنح الشركات والمصانع والموردين والورش والحرفيين حضورًا رقميًا منظمًا يعرض خدماتهم ومنتجاتهم ومشاريعهم ومناطق عملهم أمام العملاء ومحركات البحث."
  },
  {
    question: "هل استخدام العميل لمنصة بيت الريف مجاني؟",
    answer:
      "نعم. يمكن للعميل البحث وإرسال الاستفسار أو طلب عرض السعر مجانًا من بيت الريف، بينما تُخصص خطط الحضور الرقمي لمزودي الخدمات."
  },
  {
    question: "ما دور وياك في المنصة؟",
    answer:
      "يساعد وياك على فهم الطلب وتحديد الخدمة والموقع والمعلومات المطلوبة، ثم البحث في بيانات المزودين المنشورة للوصول إلى خيارات متوافقة مع احتياج العميل."
  }
];

export default function About() {
  const description =
    "تعرف على قصة بيت الريف، منصة رقمية وُلدت من خبرة تتجاوز 10 سنوات في المقاولات لتربط أصحاب المشاريع بمزودي خدمات البناء في الإمارات.";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bietalreef.ae/#website",
        url: "https://bietalreef.ae",
        name: "بيت الريف",
        inLanguage: ["ar-AE", "en-AE"],
        publisher: { "@id": "https://bietalreef.ae/#organization" }
      },
      {
        "@type": "Organization",
        "@id": "https://bietalreef.ae/#organization",
        name: "بيت الريف",
        alternateName: "Biet Al Reef",
        url: "https://bietalreef.ae",
        logo: "https://bietalreef.ae/logo.png",
        description,
        foundingLocation: {
          "@type": "Place",
          name: "مدينة العين، أبوظبي، الإمارات العربية المتحدة"
        },
        areaServed: {
          "@type": "Country",
          name: "United Arab Emirates"
        },
        knowsAbout: [
          "المقاولات",
          "البناء",
          "التشطيبات",
          "الصيانة",
          "مواد البناء",
          "مزودو الخدمات",
          "الذكاء الاصطناعي في قطاع البناء"
        ]
      },
      {
        "@type": "AboutPage",
        "@id": "https://bietalreef.ae/about#aboutpage",
        url: "https://bietalreef.ae/about",
        name: "من نحن | بيت الريف",
        description,
        inLanguage: "ar-AE",
        dateModified: "2026-07-13",
        isPartOf: { "@id": "https://bietalreef.ae/#website" },
        about: { "@id": "https://bietalreef.ae/#organization" },
        breadcrumb: { "@id": "https://bietalreef.ae/about#breadcrumb" },
        mainEntity: { "@id": "https://bietalreef.ae/#organization" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bietalreef.ae/about#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: "https://bietalreef.ae"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "من نحن",
            item: "https://bietalreef.ae/about"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://bietalreef.ae/about#faq",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <Head>
        <title>من نحن | قصة بيت الريف ومنصة البناء والمقاولات في الإمارات</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="بيت الريف, منصة مقاولات في الإمارات, مزودو خدمات البناء, شركات المقاولات, مواد البناء, مقاولون في الإمارات, وياك, الذكاء الاصطناعي في المقاولات"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://bietalreef.ae/about" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/about" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/about" />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/about" />

        <meta property="og:title" content="بيت الريف | من واقع سوق المقاولات إلى منصة رقمية متخصصة" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/about" />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:locale:alternate" content="en_AE" />
        <meta property="og:image" content="https://bietalreef.ae/logo.png" />
        <meta property="og:image:alt" content="شعار بيت الريف" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="من نحن | قصة بيت الريف" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://bietalreef.ae/logo.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <Navbar />

        <main dir="rtl" className="flex-1 max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-14">
          <section className="text-center space-y-6">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              من العين إلى جميع إمارات الدولة
            </span>
            <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight text-gray-900 md:text-5xl">
              من تحديات سوق المقاولات إلى دار رقمية تجمع المشروع بالخبرة
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-8 text-gray-700 md:text-xl">
              <strong>بيت الريف</strong> منصة رقمية إماراتية متخصصة في البناء والمقاولات والتشطيبات والصيانة ومواد البناء، وُلدت من خبرة عملية تتجاوز عشر سنوات لمساعدة أصحاب المشاريع على الوصول إلى مزودي الخدمات المناسبين، وتمكين أصحاب الأنشطة من تقديم خبراتهم بصورة واضحة ومنظمة.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/uae"
                className="rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition hover:opacity-90"
              >
                استكشف دليل الإمارات
              </Link>
              <Link
                href="/providers/register"
                className="rounded-2xl border-2 border-primary bg-white px-6 py-3 font-bold text-primary transition hover:bg-primary/5"
              >
                انضم كمزود خدمة
              </Link>
              <Link
                href="/weyaak"
                className="rounded-2xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-800 transition hover:border-primary hover:text-primary"
              >
                تعرف على وياك
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border-2 border-primary/20 bg-white p-6 shadow-xl md:p-10">
            <div className="mb-6 text-center">
              <p className="mb-2 text-sm font-bold text-primary">إجابة مباشرة</p>
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">ما هي بيت الريف؟</h2>
            </div>
            <p className="mx-auto max-w-4xl text-center text-base leading-8 text-gray-800 md:text-lg">
              بيت الريف هي منصة رقمية متخصصة تنظّم الوصول إلى الشركات والمقاولين والمصانع والموردين والورش والحرفيين، وتربط خدماتهم ومنتجاتهم ومشاريعهم بمواقع عملهم داخل دولة الإمارات، حتى يصل العميل إلى الجهة الأكثر توافقًا مع احتياجه.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-blue-50 p-5 text-center">
                <p className="text-sm font-bold text-primary">القطاع</p>
                <p className="mt-2 font-semibold text-gray-900">البناء والمقاولات والتشطيبات والصيانة ومواد البناء</p>
              </div>
              <div className="rounded-2xl bg-green-50 p-5 text-center">
                <p className="text-sm font-bold text-primary">من نخدم؟</p>
                <p className="mt-2 font-semibold text-gray-900">أصحاب المشاريع والعملاء ومزودو الخدمات</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-5 text-center">
                <p className="text-sm font-bold text-primary">نطاق العمل</p>
                <p className="mt-2 font-semibold text-gray-900">من مدينة العين إلى جميع إمارات الدولة</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏗️</span>
              <div>
                <p className="text-sm font-bold text-primary">قصتنا</p>
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">تجربة عملية تحولت إلى حل رقمي</h2>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-lg md:p-9">
              <p className="text-base leading-8 text-gray-800 md:text-lg">
                بدأت فكرة بيت الريف من تجربة مؤسسها في إدارة أعمال المقاولات داخل دولة الإمارات لأكثر من عشر سنوات. خلال هذه السنوات واجهنا تحديات يومية في العثور على مقاولي الباطن المناسبين، والوصول إلى الشركات والموردين الموثوقين، واختيار مواد البناء المناسبة، ومقارنة الأسعار والعروض للحصول على أفضل قيمة ممكنة دون التأثير في جودة التنفيذ.
              </p>
              <p className="mt-5 text-base leading-8 text-gray-800 md:text-lg">
                لم تكن المشكلة في غياب الخبرات، بل في تشتت المعلومات وصعوبة الوصول إلى الجهة المناسبة في الوقت المناسب. ومن خلال التعامل المباشر مع أصحاب المشاريع، لمسنا أن العميل يعاني من المشكلة نفسها، بينما توجد شركات وورش وحرفيون يمتلكون خبرة حقيقية لكن حضورهم الرقمي لا يعكس قدراتهم.
              </p>
              <blockquote className="mt-7 rounded-2xl border-r-4 border-primary bg-primary/5 p-5 text-lg font-bold leading-8 text-gray-900">
                بيت الريف لم تُبنَ بعيدًا عن مشكلات السوق؛ بل وُلدت من داخلها لتقدم حلًا عمليًا لها.
              </blockquote>
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">المشكلة التي نعمل على حلها</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">سوق كبير، لكن معلوماته متفرقة</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg md:p-8">
                <h3 className="text-xl font-black text-gray-900">تحديات العميل وصاحب المشروع</h3>
                <ul className="mt-5 space-y-3 text-gray-700">
                  <li>• صعوبة تحديد الجهة الأنسب لتنفيذ العمل.</li>
                  <li>• الحاجة إلى مقارنة العروض والأسعار ونطاقات التنفيذ.</li>
                  <li>• عدم وضوح الفروق بين الخامات والمنتجات والحلول.</li>
                  <li>• ضياع الوقت في التواصل مع جهات لا تناسب المشروع.</li>
                </ul>
              </article>
              <article className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg md:p-8">
                <h3 className="text-xl font-black text-gray-900">تحديات الشركات ومزودي الخدمات</h3>
                <ul className="mt-5 space-y-3 text-gray-700">
                  <li>• امتلاك خبرة حقيقية دون حضور رقمي واضح.</li>
                  <li>• تشتت بيانات النشاط والخدمات ومناطق العمل.</li>
                  <li>• الاعتماد على العلاقات والإعلانات المؤقتة.</li>
                  <li>• صعوبة الوصول إلى العميل الذي يحتاج فعلًا إلى التخصص.</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">كيف نحول المشكلة إلى حل؟</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">منظومة تنظّم المعلومات وتقرب المسافة</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["🏢", "ملفات رقمية واضحة", "عرض النشاط والخدمات والمنتجات والمشاريع ووسائل التواصل في صفحة منظمة."],
                ["📍", "بحث جغرافي متخصص", "ربط المزود بالإمارة والمدينة والمنطقة والخدمة التي يقدمها."],
                ["🤝", "تواصل مباشر", "تمكين العميل من الاتصال أو استخدام واتساب أو إرسال استفسار وطلب عرض سعر."],
                ["🤖", "مساعدة ذكية", "استخدام وياك لفهم الطلب واختصار البحث والوصول إلى خيارات أكثر توافقًا."]
              ].map(([icon, title, text]) => (
                <article key={title} className="rounded-3xl bg-white p-6 shadow-lg">
                  <span className="text-3xl">{icon}</span>
                  <h3 className="mt-4 text-lg font-black text-gray-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-gradient-to-br from-blue-50 to-white p-7 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">للعميل وصاحب المشروع</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">طريق أوضح إلى مزود الخدمة المناسب</h2>
              <p className="mt-4 leading-8 text-gray-700">
                تساعدك بيت الريف على فهم احتياجك، والبحث بحسب النشاط والخدمة والموقع، واستعراض الخدمات والمنتجات والمشاريع السابقة، ثم التواصل مباشرة أو إرسال طلب عرض سعر. استخدام العميل للبحث وإرسال الاستفسار مجاني من بيت الريف.
              </p>
            </article>
            <article className="rounded-3xl bg-gradient-to-br from-green-50 to-white p-7 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">للشركات ومزودي الخدمات</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">حضور رقمي يعكس خبرتك الحقيقية</h2>
              <p className="mt-4 leading-8 text-gray-700">
                تساعدك بيت الريف على تقديم نشاطك وخدماتك ومنتجاتك ومناطق عملك ومشاريعك بصورة واضحة، وبناء حضور رقمي مستدام يمكن للعملاء ومحركات البحث ونماذج الذكاء الاصطناعي فهمه والوصول إليه.
              </p>
            </article>
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-7 text-white shadow-2xl md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="text-sm font-bold text-white/80">الذكاء الاصطناعي في خدمة قطاع البناء</p>
                <h2 className="mt-2 text-2xl font-black md:text-3xl">وياك يبسّط العمليات المعقدة ويختصر الوقت والجهد</h2>
                <p className="mt-5 leading-8 text-white/90">
                  يساعد المساعد الذكي <strong>وياك</strong> العميل على توضيح متطلبات المشروع، وتحديد نوع الخدمة والموقع والمعلومات الناقصة، ثم البحث داخل بيانات المزودين المنشورة للوصول إلى خيارات متوافقة مع الاحتياج. كما يساعد مزودي الخدمات على تنظيم بياناتهم وعرضها بصورة أوضح.
                </p>
                <p className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-7 text-white/90">
                  هدفنا ليس أن يحل الذكاء الاصطناعي محل المهندس أو المقاول أو الحرفي، بل أن يجعل الوصول إلى الخبرة البشرية المناسبة أسرع وأكثر وضوحًا.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="font-black">كيف يساعدك وياك؟</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/90">
                  <li>✓ فهم الطلب وتحديد الخدمة المطلوبة.</li>
                  <li>✓ اختصار وقت البحث والمقارنة.</li>
                  <li>✓ ربط الطلب بالموقع ومناطق الخدمة.</li>
                  <li>✓ تجهيز استفسار أو طلب سعر منظم.</li>
                </ul>
                <Link href="/weyaak" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-primary">
                  تعرف على وياك
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border-t-4 border-primary bg-white p-7 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">رؤيتنا</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">الدار الرقمية الموثوقة لقطاع البناء</h2>
              <p className="mt-4 leading-8 text-gray-700">
                رؤيتنا أن تصبح بيت الريف الدار الرقمية الموثوقة لكل صاحب مشروع، ولكل شركة أو مصنع أو مورد أو ورشة أو حرفي يعمل في قطاع البناء والمقاولات، وأن تكون المرجع الرقمي المتخصص للبناء والتشطيبات والصيانة ومواد البناء في دولة الإمارات.
              </p>
              <p className="mt-4 font-bold leading-8 text-primary">
                بيت الريف هي محرك الاكتشاف، ومزود الخدمة هو النتيجة التي نساعد العميل على الوصول إليها.
              </p>
            </article>
            <article className="rounded-3xl border-t-4 border-secondary bg-white p-7 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">مهمتنا</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">تنظيم السوق وتسهيل الوصول</h2>
              <p className="mt-4 leading-8 text-gray-700">
                مهمتنا تحويل المعلومات المتفرقة إلى منظومة رقمية واضحة، وتسهيل وصول العميل إلى الجهة المناسبة، وبناء حضور رقمي لأصحاب الأنشطة، وتوظيف الذكاء الاصطناعي لتقليل الوقت والجهد ودعم قرارات أكثر وعيًا.
              </p>
            </article>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">قيمنا</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">مبادئ تحكم طريقة بنائنا للمنصة</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {values.map((value) => (
                <article key={value.title} className="rounded-3xl bg-white p-6 shadow-lg">
                  <h3 className="flex items-center gap-3 text-xl font-black text-gray-900">
                    <span className="text-3xl">{value.icon}</span>
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-700">{value.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-7 text-center shadow-xl md:p-10">
            <p className="text-sm font-bold text-primary">رسالتنا إلى شركائنا وعملائنا</p>
            <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">نبني الثقة بين من يبحث عن الخدمة ومن يمتلك الخبرة</h2>
            <p className="mx-auto mt-5 max-w-4xl leading-8 text-gray-700">
              إلى أصحاب المشاريع والعملاء، نعمل على توفير طريق أكثر وضوحًا لفهم الخيارات والوصول إلى مزودي الخدمات المناسبين. وإلى الشركات والمصانع والموردين والورش والحرفيين، نريد أن تكون بيت الريف مساحة تقدمون من خلالها خبراتكم وأعمالكم بصورة واضحة. هدفنا ليس حجب التواصل بين الطرفين، بل تنظيم المعلومات وتقريب المسافة بين الحاجة والخبرة.
            </p>
          </section>

          <section className="space-y-6" id="faq">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">إجابات واضحة</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">الأسئلة الشائعة عن بيت الريف</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-gray-900">{item.question}</h3>
                  <p className="mt-3 leading-7 text-gray-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white shadow-2xl md:p-12">
            <p className="text-sm font-bold text-white/80">ابدأ من هنا</p>
            <h2 className="mt-2 text-2xl font-black md:text-4xl">مشروعك يستحق بداية أوضح، وخبرتك تستحق أن تصل إلى من يبحث عنها</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/90">
              من العين إلى جميع إمارات الدولة، نبني دارًا رقمية تجمع المشروع بخبرته، والعميل بمزود الخدمة المناسب، والسوق بمعلومات أكثر وضوحًا.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/uae" className="rounded-2xl bg-white px-6 py-3 font-bold text-primary">
                ابحث عن مزود خدمة
              </Link>
              <Link href="/providers/register" className="rounded-2xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white">
                انضم إلى بيت الريف
              </Link>
              <Link href="/weyaak" className="rounded-2xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white">
                تحدث مع وياك
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
