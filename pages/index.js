import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { getAllServices } from "../lib/services-detailed";
import { useState, useEffect, useRef } from "react";

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
  ]
};

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

// Auto-scroll slider component
function ImageSlider({ title, images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div dir="rtl" className="w-full py-10 px-4 border-b border-[#E6DCC8] bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold text-[#0F3F1A] mb-6 text-right">
          {title}
        </h2>
        <div className="relative w-full overflow-hidden rounded-2xl shadow-md border border-[#E6DCC8]">
          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="min-w-full relative"
                style={{ height: "380px" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  className="object-contain bg-[#f9f6f0]"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-[#D4AF37] scale-125" : "bg-[#0F3F1A]/30"
                }`}
                aria-label={`الصورة ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#0F3F1A] rounded-full w-9 h-9 flex items-center justify-center shadow-md transition"
            aria-label="السابق"
          >
            ›
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#0F3F1A] rounded-full w-9 h-9 flex items-center justify-center shadow-md transition"
            aria-label="التالي"
          >
            ‹
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home({ allServices }) {
  return (
    <>
      <Head>
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
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae" />
        <meta property="og:title" content="بيت الريف | منصة المقاولات والبناء والصيانة الذكية في الإمارات" />
        <meta property="og:description" content="سوق متكامل للخدمات والمواد والأثاث مع وكيل الذكاء الاصطناعي وياك. مقاولون معتمدون في دبي، أبوظبي، العين، الشارقة وجميع الإمارات." />
        <meta property="og:image" content="https://bietalreef.ae/og-weyaak.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:locale:alternate" content="en_AE" />
        <meta property="og:site_name" content="بيت الريف" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bietalreef" />
        <meta name="twitter:title" content="بيت الريف | منصة المقاولات والبناء الذكية في الإمارات" />
        <meta name="twitter:description" content="سوق متكامل للخدمات والمواد والأثاث مع وكيل الذكاء الاصطناعي وياك. مقاولون معتمدون في جميع الإمارات." />
        <meta name="twitter:image" content="https://bietalreef.ae/og-weyaak.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F3F1A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="بيت الريف" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }} />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#F9F6F0]">
        <Navbar />
        <main className="flex-1">

          {/* ═══ HERO ═══ */}
          <Hero />

          {/* ═══ SLIDER 1: AI + وياك ═══ */}
          <ImageSlider
            title="وكيلك الذكي لإدارة مشاريع البناء في الإمارات"
            images={[
              { src: "/images/webp/bait-alreef-weyaak-ai-growth-engine.webp",                alt: "bait-alreef-weyaak-ai-growth-engine" },
              { src: "/images/webp/bait-alreef-weyaak-fast-response-advantage.webp",         alt: "bait-alreef-weyaak-fast-response-advantage" },
              { src: "/images/webp/bait-alreef-marketing-automation-client-reactivation.webp", alt: "bait-alreef-marketing-automation-client-reactivation" },
            ]}
          />

          {/* ═══ SLIDER 2: التصميم و 3D ═══ */}
          <ImageSlider
            title="تصميم داخلي وخارجي ثلاثي الأبعاد قبل التنفيذ"
            images={[
              { src: "/images/webp/bait-alreef-3d-room-designer-before-execution.webp",          alt: "bait-alreef-3d-room-designer-before-execution" },
              { src: "/images/webp/bait-alreef-vr-design-living-experience.webp",                alt: "bait-alreef-vr-design-living-experience" },
              { src: "/images/webp/bait-alreef-unified-platform-design-build-manage-market.webp", alt: "bait-alreef-unified-platform-design-build-manage-market" },
            ]}
          />

          {/* ═══ SLIDER 3: الإدارة والأنظمة ═══ */}
          <ImageSlider
            title="إدارة المشاريع والتكاليف والمواد بشكل ذكي"
            images={[
              { src: "/images/webp/bait-alreef-control-dashboard-leadership-transparency.webp", alt: "bait-alreef-control-dashboard-leadership-transparency" },
              { src: "/images/webp/bait-alreef-dashboard-data-sales-control.webp",              alt: "bait-alreef-dashboard-data-sales-control" },
              { src: "/images/webp/bait-alreef-boq-automation-document-processing.webp",        alt: "bait-alreef-boq-automation-document-processing" },
            ]}
          />

          {/* ═══ SLIDER 4: المنصة الكاملة ═══ */}
          <ImageSlider
            title="منصة متكاملة تربط التصميم والبناء والتسويق"
            images={[
              { src: "/images/webp/bait-alreef-smart-construction-ecosystem-cover.webp", alt: "bait-alreef-smart-construction-ecosystem-cover" },
              { src: "/images/webp/bait-alreef-premier-integrated-business-system.webp", alt: "bait-alreef-premier-integrated-business-system" },
              { src: "/images/webp/bait-alreef-uae-smart-network-coverage.webp",         alt: "bait-alreef-uae-smart-network-coverage" },
            ]}
          />

        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allServices = getAllServices();
  return {
    props: { allServices },
    revalidate: 3600,
  };
}
