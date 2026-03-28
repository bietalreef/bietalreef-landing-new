import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesAndTools from "../components/ServicesAndTools";
import Footer from "../components/Footer";
import SmartAppLink from "../components/SmartAppLink";
import { getAllServices } from "../lib/services-detailed";
import { useState } from 'react';

// بيانات الخدمات الرئيسية — محدّثة من figmawebapp
const services = [
  { title: "مقاولات البناء", desc: "شركات مقاولات معتمدة لبناء الفلل والمباني والمشاريع السكنية والتجارية في الإمارات", icon: "🏗️" },
  { title: "الاستشارات الهندسية", desc: "مكاتب استشارات هندسية معتمدة وتصميم معماري احترافي لجميع أنواع المشاريع", icon: "📐" },
  { title: "شركات الصيانة", desc: "صيانة شاملة للمباني والفلل: سباكة، كهرباء، تكييف، دهانات وترميم", icon: "🔧" },
  { title: "العمالة الحرفية", desc: "حرفيون مهرة وعمالة متخصصة لجميع أعمال البناء والتشطيبات والترميم", icon: "👷" },
  { title: "الورش الصناعية", desc: "ورش حدادة، نجارة، ألمنيوم، رخام وزجاج بأعلى معايير الجودة", icon: "🔨" },
  { title: "تأجير المعدات", desc: "رافعات، حفارات، خلاطات وجميع معدات البناء الثقيلة والخفيفة للإيجار", icon: "🚜" },
  { title: "محلات مواد البناء", desc: "أسمنت، حديد، بلوك، بلاط، رخام كرارا، بورسلان وجميع مواد البناء", icon: "🧱" },
  { title: "الأثاث والديكور", desc: "أثاث فاخر وديكورات عصرية ومطابخ مودرن بأفضل الأسعار", icon: "🪑" },
  { title: "خدمات النظافة", desc: "تنظيف منازل، فلل، مباني، وتنظيف ما بعد البناء والتشطيبات", icon: "✨" },
];

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "بيت الريف",
  "alternateName": "Beit Al Reef",
  "url": "https://bietalreef.ae",
  "logo": "https://bietalreef.ae/logo.png",
  "description": "منصة البناء والصيانة الذكية في الإمارات - سوق متكامل للخدمات والمواد والأثاث مع وكيل الذكاء الاصطناعي وياك",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "العين",
    "addressRegion": "أبوظبي",
    "addressCountry": "AE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971567856001",
    "contactType": "customer service",
    "availableLanguage": ["Arabic", "English"]
  },
  "sameAs": [
    "https://instagram.com/bietalreef",
    "https://tiktok.com/@bietalreef",
    "https://youtube.com/@bietalreef",
    "https://facebook.com/bietalreef",
    "https://linkedin.com/company/bietalreef",
    "https://x.com/bietalreef"
  ],
  "areaServed": [
    { "@type": "City", "name": "دبي" },
    { "@type": "City", "name": "أبوظبي" },
    { "@type": "City", "name": "العين" },
    { "@type": "City", "name": "الشارقة" },
    { "@type": "City", "name": "عجمان" },
    { "@type": "City", "name": "رأس الخيمة" },
    { "@type": "City", "name": "أم القيوين" },
    { "@type": "City", "name": "الفجيرة" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "خدمات بيت الريف",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "مقاولات البناء" },
      { "@type": "OfferCatalog", "name": "الاستشارات الهندسية" },
      { "@type": "OfferCatalog", "name": "شركات الصيانة" },
      { "@type": "OfferCatalog", "name": "العمالة الحرفية" },
      { "@type": "OfferCatalog", "name": "الورش الصناعية" },
      { "@type": "OfferCatalog", "name": "تأجير المعدات" },
      { "@type": "OfferCatalog", "name": "محلات مواد البناء" },
      { "@type": "OfferCatalog", "name": "الأثاث والديكور" },
      { "@type": "OfferCatalog", "name": "خدمات النظافة" }
    ]
  }
};

// WebSite structured data for sitelinks search box
const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "بيت الريف",
  "alternateName": "Beit Al Reef",
  "url": "https://bietalreef.ae",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://app.bietalreef.ae/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function Home({ allServices }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Head>
        {/* ═══ Primary Meta Tags ═══ */}
        <title>بيت الريف | منصة المقاولات والبناء والصيانة الذكية في الإمارات - مقاولون معتمدون في دبي وأبوظبي والعين</title>
        <meta
          name="description"
          content="بيت الريف: منصة البناء والصيانة الذكية في الإمارات. سوق متكامل لخدمات المقاولات، التصميم الداخلي، الصيانة، مواد البناء والأثاث. مقاولون معتمدون في دبي، أبوظبي، العين، الشارقة وجميع الإمارات. وكيل الذكاء الاصطناعي وياك لإدارة مشاريعك."
        />
        <meta
          name="keywords"
          content="بيت الريف, مقاولات الإمارات, مقاولات دبي, مقاولات أبوظبي, مقاولات العين, شركة صيانة الشارقة, تصميم داخلي الإمارات, سباكة دبي, كهرباء أبوظبي, تكييف العين, دهانات الشارقة, مواد بناء, أثاث وديكور, بناء فلل, ترميم منازل, استشارات هندسية, وياك, weyaak, bietalreef"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://bietalreef.ae" />
        <meta name="author" content="بيت الريف" />
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="العين، أبوظبي، الإمارات" />

        {/* ═══ Open Graph / Facebook ═══ */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae" />
        <meta property="og:title" content="بيت الريف | منصة المقاولات والبناء والصيانة الذكية في الإمارات" />
        <meta
          property="og:description"
          content="سوق متكامل للخدمات والمواد والأثاث مع وكيل الذكاء الاصطناعي وياك. مقاولون معتمدون في دبي، أبوظبي، العين، الشارقة وجميع الإمارات."
        />
        <meta property="og:image" content="https://bietalreef.ae/og-weyaak.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:locale:alternate" content="en_AE" />
        <meta property="og:site_name" content="بيت الريف" />

        {/* ═══ Twitter Card ═══ */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bietalreef" />
        <meta name="twitter:title" content="بيت الريف | منصة المقاولات والبناء الذكية في الإمارات" />
        <meta name="twitter:description" content="سوق متكامل للخدمات والمواد والأثاث مع وكيل الذكاء الاصطناعي وياك. مقاولون معتمدون في جميع الإمارات." />
        <meta name="twitter:image" content="https://bietalreef.ae/og-weyaak.jpg" />

        {/* ═══ PWA Meta Tags ═══ */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F3F1A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="بيت الريف" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ═══ JSON-LD Structured Data ═══ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1">
          <Hero />

          {/* ═══ Platform Visual Gallery — 10 Images Grid ═══ */}
          <section dir="rtl" className="w-full bg-[#0F3F1A] py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-center text-white text-xl md:text-2xl font-bold mb-2">
                منصة بيت الريف بالصور
              </h2>
              <p className="text-center text-[#D4AF37] text-sm mb-8">
                أدوات ذكية · سوق متكامل · وياك الوكيل الذكي
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { src: "/bait-alreef-ai-tools.webp",            alt: "أدوات الذكاء الاصطناعي" },
                  { src: "/bait-alreef-core-system.webp",         alt: "النظام الأساسي" },
                  { src: "/bait-alreef-ecosystem-overview.webp",  alt: "نظرة عامة على المنظومة" },
                  { src: "/bait-alreef-marketplace-materials.webp",alt: "سوق مواد البناء" },
                  { src: "/bait-alreef-weyaak-marketing.webp",    alt: "تسويق وياك" },
                  { src: "/bait-alreef-tools-suite.webp",         alt: "مجموعة الأدوات" },
                  { src: "/bait-alreef-project-journey.webp",     alt: "رحلة المشروع" },
                  { src: "/bait-alreef-task-management.webp",     alt: "إدارة المهام" },
                  { src: "/bait-alreef-workflow-system.webp",     alt: "نظام سير العمل" },
                  { src: "/bait-alreef-superapp-overview.webp",   alt: "نظرة عامة على التطبيق" },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-md group"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      <span className="text-white text-xs font-semibold">{img.alt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ServicesAndTools />

          {/* Platform Features Section */}
          <section className="max-w-6xl mx-auto px-4 mt-12 mb-12 bg-gradient-to-br from-[#F5EEE1] via-[#F7F1E8] to-[#F5EEE1] rounded-2xl p-8 md:p-12 border border-[#E6DCC8]">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 text-center">
              منصة بيت الريف: سوق متكامل وذكي
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Marketplace Feature */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-[#E6DCC8]">
                <div className="text-3xl mb-3">🛒</div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  سوق مواد البناء والديكور
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  تصفح واشترِ مواد البناء والأثاث والديكور من أفضل الموردين المعتمدين بأسعار منافسة وتوصيل سريع.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ رخام كرارا، بلاط بورسلان، باركيه</li>
                  <li>✓ أسمنت، حديد تسليح، بلوك خرساني</li>
                  <li>✓ مطابخ مودرن، أثاث وديكور حديث</li>
                </ul>
              </div>

              {/* Dashboard Feature */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-[#E6DCC8]">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  لوحة تحكم ذكية
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  متابعة شاملة لمشاريعك وتقييماتك ومعاملاتك من لوحة تحكم موحدة. إحصائيات فورية وتقارير مفصلة.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ متابعة المشاريع الحية</li>
                  <li>✓ إحصائيات التقييمات والمعاملات</li>
                  <li>✓ تقارير الأداء والنمو</li>
                </ul>
              </div>

              {/* WEYAAK AI Feature */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-[#E6DCC8]">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  وياك: وكيلك الذكي
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  وكيل ذكاء اصطناعي متقدم يساعدك في اختيار المقاولين، التصاميم، والحلول الأمثل لمشروعك. يتصفح الإنترنت وينفذ المهام نيابة عنك.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ توصيات ذكية مخصصة</li>
                  <li>✓ استشارات فورية 24/7</li>
                  <li>✓ تنفيذ المهام تلقائياً</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 mt-12 mb-16">
            <div className="bg-white rounded-2xl shadow-soft p-6 grid md:grid-cols-2 gap-6 border border-[#E6DCC8]">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  لماذا يختار المحترفون في الإمارات منصة بيت الريف؟
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  منصة شاملة تجمع الملاك والمقاولين والمصممين المعتمدين، مدعومة بوكيل الذكاء الاصطناعي وياك لإدارة مشاريع ذكية وفعالة. سوق متكامل يوفر كل ما تحتاجه من الخدمات إلى المواد والأثاث.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <li>✓ وكيل وياك الذكي لحلول فورية</li>
                <li>✓ مقاولون ومصممون معتمدون موثوقون</li>
                <li>✓ سوق متكامل للمواد والأثاث</li>
                <li>✓ 47 أداة ذكاء اصطناعي متقدمة</li>
                <li>✓ شفافية كاملة في التكاليف والجودة</li>
                <li>✓ تغطية جميع إمارات الدولة</li>
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allServices = getAllServices();
  return {
    props: {
      allServices,
    },
    revalidate: 3600,
  };
}
