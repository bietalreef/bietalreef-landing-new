import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesAndTools from "../components/ServicesAndTools";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
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

// LocalBusiness Schema — يحسّن ظهور الموقع في نتائج البحث المحلي
const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://bietalreef.ae/#business",
  "name": "بيت الريف",
  "alternateName": "Beit Al Reef",
  "description": "منصة البناء والصيانة الذكية في الإمارات. سوق متكامل لخدمات المقاولات والتصميم الداخلي والصيانة ومواد البناء والأثاث مع وكيل الذكاء الاصطناعي وياك.",
  "url": "https://bietalreef.ae",
  "telephone": "+971567856001",
  "email": "info@bietalreef.ae",
  "priceRange": "$$",
  "address": { "@type": "PostalAddress", "addressLocality": "العين", "addressRegion": "أبوظبي", "addressCountry": "AE" },
  "geo": { "@type": "GeoCoordinates", "latitude": "24.2075", "longitude": "55.7447" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "12500", "bestRating": "5", "worstRating": "1" },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59"
  },
  "areaServed": [
    { "@type": "City", "name": "دبي" }, { "@type": "City", "name": "أبوظبي" },
    { "@type": "City", "name": "العين" }, { "@type": "City", "name": "الشارقة" }
  ]
};

// ItemList Schema — قائمة الخدمات
const servicesItemListData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "خدمات بيت الريف في الإمارات",
  "numberOfItems": 9,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "مقاولات البناء", "url": "https://bietalreef.ae/services/construction-contracting" },
    { "@type": "ListItem", "position": 2, "name": "الاستشارات الهندسية", "url": "https://bietalreef.ae/services/engineering-consultation" },
    { "@type": "ListItem", "position": 3, "name": "شركات الصيانة", "url": "https://bietalreef.ae/services/maintenance-companies" },
    { "@type": "ListItem", "position": 4, "name": "العمالة الحرفية", "url": "https://bietalreef.ae/services/craftsmen" },
    { "@type": "ListItem", "position": 5, "name": "الورش الصناعية", "url": "https://bietalreef.ae/services/workshops" },
    { "@type": "ListItem", "position": 6, "name": "تأجير المعدات", "url": "https://bietalreef.ae/services/equipment-rental" },
    { "@type": "ListItem", "position": 7, "name": "محلات مواد البناء", "url": "https://bietalreef.ae/services/building-materials" },
    { "@type": "ListItem", "position": 8, "name": "الأثاث والديكور", "url": "https://bietalreef.ae/services/furniture-stores" },
    { "@type": "ListItem", "position": 9, "name": "خدمات النظافة", "url": "https://bietalreef.ae/services/cleaning-services" }
  ]
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
      <SEOHead
        title="بيت الريف | منصة المقاولات والبناء والصيانة الذكية في الإمارات - مقاولون معتمدون في دبي وأبوظبي والعين"
        description="بيت الريف: منصة البناء والصيانة الذكية في الإمارات. سوق متكامل لخدمات المقاولات، التصميم الداخلي، الصيانة، مواد البناء والأثاث. مقاولون معتمدون في دبي، أبوظبي، العين، الشارقة وجميع الإمارات. وكيل الذكاء الاصطناعي وياك لإدارة مشاريعك."
        keywords="بيت الريف, مقاولات الإمارات, مقاولات دبي, مقاولات أبوظبي, مقاولات العين, شركة صيانة الشارقة, تصميم داخلي الإمارات, سباكة دبي, كهرباء أبوظبي, تكييف العين, دهانات الشارقة, مواد بناء, أثاث وديكور, بناء فلل, ترميم منازل, استشارات هندسية, وياك, weyaak, bietalreef"
        ogImage="https://bietalreef.ae/og-weyaak.jpg"
        structuredData={[structuredData, websiteStructuredData, localBusinessData, servicesItemListData]}
        includePWA={true}
      />

      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <main className="flex-1">
          <Hero />

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
