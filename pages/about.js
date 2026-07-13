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
    text: "ننظم المعلومات والخدمات بصورة مفهومة، ونتجنب الوعود التي لا يمكن ضمانها."
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
    question: "من أين بدأت فكرة بيت الريف؟",
    answer:
      "بدأت الفكرة من مدينة العين نتيجة خبرة عملية تجاوزت عشر سنوات في سوق المقاولات، كشفت صعوبة الوصول إلى مقاولي الباطن والموردين المناسبين ومقارنة الخدمات والأسعار والخامات."
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
    question: "ما دور وياك في المنصة؟",
    answer:
      "يساعد وياك على فهم الطلب وتحديد الخدمة والموقع والمعلومات المطلوبة، ثم البحث في بيانات المزودين المنشورة للوصول إلى خيارات متوافقة مع احتياج العميل."
  }
];

export default function About() {
  const description =
    "تعرف على قصة بيت الريف، منصة رقمية إماراتية وُلدت من خبرة تتجاوز 10 سنوات في المقاولات لتربط أصحاب المشاريع بمزودي خدمات البناء في الإمارات.";

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
          name: "مدينة العين، الإمارات العربية المتحدة"
        },
        areaServed: {
          "@type": "Country",
          name: "United Arab Emirates"
        },
        knowsAbout: [
          "المقاولات والبناء",
          "التشطيبات والصيانة",
          "مواد البناء",
          "مزودو الخدمات",
          "الذكاء الاصطناعي في قطاع البناء"
        ]
      },
      {
        "@type": "AboutPage",
        "@id": "https://bietalreef.ae/about#webpage",
        url: "https://bietalreef.ae/about",
        name: "عن بيت الريف",
        description,
        inLanguage: "ar-AE",
        isPartOf: { "@id": "https://bietalreef.ae/#website" },
        about: { "@id": "https://bietalreef.ae/#organization" },
        breadcrumb: { "@id": "https://bietalreef.ae/about#breadcrumb" },
        dateModified: "2026-07-13"
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
            name: "عن بيت الريف",
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
        <title>عن بيت الريف | قصتنا ورؤيتنا لقطاع البناء في الإمارات</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="بيت الريف, عن بيت الريف, منصة مقاولات في الإمارات, مزودو خدمات البناء, شركات المقاولات, مواد البناء, وياك, الذكاء الاصطناعي في المقاولات"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://bietalreef.ae/about" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/about" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/about" />
        <link rel="alternate" hrefLang="x-default" href="https://bietalreef.ae/about" />

        <meta property="og:title" content="بيت الريف | قصة من واقع سوق المقاولات" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/about" />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:locale:alternate" content="en_AE" />
        <meta property="og:image" content="https://bietalreef.ae/logo.png" />
        <meta property="og:image:alt" content="شعار بيت الريف" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="عن بيت الريف | قصتنا ورؤيتنا" />
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
              عن بيت الريف: تجربة من قلب المقاولات تحولت إلى منصة رقمية
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-8 text-gray-700 md:text-xl">
              <strong>بيت الريف</strong> منصة رقمية إماراتية متخصصة في البناء والمقاولات والتشطيبات والصيانة ومواد البناء، تساعد أصحاب المشاريع على الوصول إلى مزودي الخدمات المناسبين، وتمكّن أصحاب الأنشطة من تقديم خبراتهم بصورة واضحة ومنظمة.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/why-biet-alreef" className="rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition hover:opacity-90">
                لماذا أنشأنا بيت الريف؟
              </Link>
              <Link href="/how-it-works" className="rounded-2xl border-2 border-primary bg-white px-6 py-3 font-bold text-primary transition hover:bg-primary/5">
                كيف تعمل المنصة؟
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border-2 border-primary/20 bg-white p-6 shadow-xl md:p-10">
            <h2 className="text-center text-2xl font-black text-gray-900 md:text-3xl">ما هي بيت الريف؟</h2>
            <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-8 text-gray-800 md:text-lg">
              بيت الريف هي دار رقمية متخصصة تنظّم الوصول إلى الشركات والمقاولين والمصانع والموردين والورش والحرفيين، وتربط خدماتهم ومنتجاتهم ومشاريعهم بمناطق عملهم داخل دولة الإمارات، حتى يصبح الوصول إلى الجهة المناسبة أكثر وضوحًا وسهولة.
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
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">خبرة عملية كشفت حاجة السوق إلى حل أوضح</h2>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-lg md:p-9">
              <p className="text-base leading-8 text-gray-800 md:text-lg">
                بدأت فكرة بيت الريف من تجربة مؤسسها في إدارة أعمال المقاولات داخل دولة الإمارات لأكثر من عشر سنوات. خلال هذه السنوات واجهنا تحديات متكررة في الوصول إلى مقاولي الباطن المناسبين، والعثور على الشركات والموردين، واختيار مواد البناء، ومقارنة الأسعار والعروض مع الحفاظ على جودة التنفيذ.
              </p>
              <p className="mt-5 text-base leading-8 text-gray-800 md:text-lg">
                ومن خلال التعامل المباشر مع أصحاب المشاريع، اتضح أن العميل يعاني من المشكلة نفسها، بينما توجد شركات ومصانع وورش وحرفيون يمتلكون خبرة حقيقية لكن حضورهم الرقمي لا يعكس قدراتهم. من هنا تحولت التجربة إلى منصة تعمل على تنظيم المعلومات وتقريب المسافة بين من يبحث عن الخدمة ومن يمتلك الخبرة لتقديمها.
              </p>
              <blockquote className="mt-7 rounded-2xl border-r-4 border-primary bg-primary/5 p-5 text-lg font-bold leading-8 text-gray-900">
                بيت الريف لم تُبنَ بعيدًا عن مشكلات السوق؛ بل وُلدت من داخلها لتقدم حلًا عمليًا لها.
              </blockquote>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border-r-4 border-primary bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">رؤيتنا</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">الدار الرقمية الموثوقة لقطاع البناء</h2>
              <p className="mt-5 leading-8 text-gray-800">
                رؤيتنا أن تصبح بيت الريف الدار الرقمية الموثوقة لكل صاحب مشروع ولكل صاحب نشاط في قطاع البناء والمقاولات، والمرجع الرقمي المتخصص الذي يجمع المعرفة والخدمات والفرص في دولة الإمارات.
              </p>
            </article>
            <article className="rounded-3xl border-r-4 border-secondary bg-white p-6 shadow-lg md:p-9">
              <p className="text-sm font-bold text-primary">مهمتنا</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900">تنظيم المعلومات وتسهيل الوصول</h2>
              <p className="mt-5 leading-8 text-gray-800">
                نعمل على تحويل بيانات السوق المتفرقة إلى منظومة واضحة تربط النشاط بالخدمة والمنتج والمشروع والموقع، وتساعد العميل على اتخاذ خطوة أكثر وعيًا، وتمكّن مزود الخدمة من بناء حضور رقمي مستدام.
              </p>
            </article>
          </section>

          <section className="overflow-hidden rounded-3xl bg-[#0F3F1A] p-7 text-white shadow-2xl md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold text-[#F3D46B]">وياك والذكاء الاصطناعي</p>
                <h2 className="mt-2 text-2xl font-black md:text-3xl">التقنية في خدمة الخبرة البشرية</h2>
                <p className="mt-5 leading-8 text-white/90">
                  تعتمد بيت الريف على الذكاء الاصطناعي للمساعدة في تبسيط عمليات البحث والمقارنة وتنظيم الطلب. ويأتي <strong>وياك</strong> ليساعد العميل على توضيح احتياجه وتحديد الخدمة والموقع، ثم الوصول إلى بيانات مزودين منشورة ومتوافقة مع الطلب.
                </p>
                <p className="mt-4 leading-8 text-white/90">
                  هدفنا ليس أن يحل الذكاء الاصطناعي محل المهندس أو المقاول أو الحرفي، بل أن يجعل الوصول إلى الخبرة المناسبة أسرع وأكثر وضوحًا.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["فهم احتياج العميل", "اختصار وقت البحث", "تنظيم بيانات المزود", "دعم القرار بالمعلومات"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 font-bold">{item}</div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">رسالتنا</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">منصة تخدم طرفي المشروع</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg md:p-8">
                <h3 className="text-xl font-black text-gray-900">إلى أصحاب المشاريع والعملاء</h3>
                <p className="mt-4 leading-8 text-gray-700">
                  نعمل على توفير طريق أكثر وضوحًا لفهم الاحتياج، واكتشاف الخيارات المناسبة، والوصول إلى مزودي الخدمات بحسب التخصص والموقع، ثم التواصل أو طلب عرض سعر دون بحث مشتت.
                </p>
              </article>
              <article className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg md:p-8">
                <h3 className="text-xl font-black text-gray-900">إلى الشركات ومزودي الخدمات</h3>
                <p className="mt-4 leading-8 text-gray-700">
                  نساعدكم على تقديم خبراتكم وخدماتكم ومنتجاتكم ومشاريعكم بصورة مباشرة وواضحة، وبناء حضور رقمي يساعد العملاء ومحركات البحث ونماذج الذكاء الاصطناعي على فهم نشاطكم والوصول إليه.
                </p>
              </article>
            </div>
            <p className="text-center text-lg font-black text-primary">نبني الثقة بين من يبحث عن الخدمة، ومن يمتلك الخبرة لتقديمها.</p>
          </section>

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-bold text-primary">قيمنا</p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">المبادئ التي نبني عليها بيت الريف</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <article key={value.title} className="rounded-3xl bg-white p-6 shadow-lg">
                  <span className="text-3xl">{value.icon}</span>
                  <h3 className="mt-4 text-lg font-black text-gray-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-700">{value.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-lg md:p-9">
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">اكتشف القصة الكاملة للمنظومة</h2>
              <p className="mx-auto mt-3 max-w-3xl leading-8 text-gray-600">وزعنا التفاصيل على صفحات مستقلة حتى يصل كل زائر إلى الإجابة التي يبحث عنها دون تكرار أو إطالة.</p>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["/why-biet-alreef", "لماذا بيت الريف؟", "المشكلة التي عشناها وما الذي يميز الحل."],
                ["/how-it-works", "كيف يعمل؟", "رحلة العميل ومزود الخدمة ودور وياك."],
                ["/platform", "المنصة", "مكونات المنظومة والبيانات والبحث والطلبات."],
                ["/partners", "الشركاء", "طرق الانضمام والتعاون وبناء الحضور الرقمي."]
              ].map(([href, title, text]) => (
                <Link key={href} href={href} className="rounded-2xl border border-[#E6DCC8] p-5 transition hover:border-primary hover:shadow-md">
                  <h3 className="font-black text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">أسئلة شائعة عن بيت الريف</h2>
            </div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-black text-gray-900">{item.question}</summary>
                  <p className="mt-4 leading-8 text-gray-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white shadow-2xl md:p-12">
            <h2 className="text-2xl font-black md:text-3xl">بيت الريف دار تجمع المشروع بخبرته</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/90">
              سواء كنت صاحب مشروع تبحث عن الجهة المناسبة، أو صاحب نشاط يريد تقديم خبرته بصورة أوضح، تبدأ رحلتك من هنا.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/uae" className="rounded-2xl bg-white px-6 py-3 font-bold text-primary">استكشف دليل الإمارات</Link>
              <Link href="/providers/register" className="rounded-2xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white">انضم كمزود خدمة</Link>
              <Link href="/weyaak" className="rounded-2xl border border-white/50 bg-white/10 px-6 py-3 font-bold text-white">تحدث مع وياك</Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
