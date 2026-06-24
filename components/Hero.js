import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    { src: "/bait-alreef-home-hero.webp", alt: "منصة بيت الريف - الواجهة الرئيسية" },
    { src: "/bait-alreef-future-construction-uae.webp", alt: "مستقبل البناء في الإمارات" },
    { src: "/bait-alreef-ecosystem-overview.webp", alt: "نظرة عامة على منظومة بيت الريف" },
    { src: "/bait-alreef-weyaak-marketing.webp", alt: "وياك - وكيلك الذكي" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      dir="rtl"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0F3F1A] via-[#1a5c28] to-[#0F3F1A]"
    >
      {/* Background image slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-30" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0F3F1A]/80 via-[#0F3F1A]/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">

        {/* Text Content */}
        <div className="flex-1 w-full text-right">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs mb-6 backdrop-blur-sm">
            <span className="text-[11px] font-semibold">🤖 وياك</span>
            <span className="text-[11px]">أفضل وكيل شخصي إماراتي</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
            وياك —{" "}
            <span className="text-[#D4AF37]">مساعدك الذكي</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#D4AF37] font-semibold mb-5">
            أول مساعد شخصي صُمم ليفهم اختياراتك ويدعمك في كل خطوة
          </p>

          {/* Description */}
          <p className="text-gray-200 text-sm sm:text-base mb-8 leading-relaxed max-w-xl">
            منصة بيت الريف تجمع بين التصميم المعماري، البناء، الصيانة، وإدارة
            المشاريع في مكان واحد.{" "}
            <strong className="text-white">وياك</strong> يساعدك في اتخاذ القرار
            الأفضل ويختار لك مزود الخدمة المناسب في العين وأبوظبي وباقي الإمارات.
          </p>

          {/* Trust Indicators */}
          <div className="flex gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37]">47</div>
              <div className="text-xs text-gray-300 mt-1">🧠 الأدوات الذكية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37]">90+</div>
              <div className="text-xs text-gray-300 mt-1">🛒 سوق الخدمات</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37]">4.8★</div>
              <div className="text-xs text-gray-300 mt-1">تقييم المستخدمين</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://app.bietalreef.ae"
              className="px-8 py-3 rounded-full bg-[#D4AF37] text-[#0F3F1A] text-sm font-bold shadow-lg hover:bg-[#c49b2e] transition text-center"
            >
              ابدأ الآن — وياك بيساعدك
            </a>
            <Link
              href="/services"
              className="px-8 py-3 rounded-full border-2 border-white text-white text-sm font-semibold hover:bg-white hover:text-[#0F3F1A] transition text-center"
            >
              اكتشف المنصة
            </Link>
          </div>
        </div>

        {/* Hero Image Card */}
        <div className="flex-1 w-full max-w-lg">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="relative w-full h-80 md:h-[420px]">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              {currentImage + 1} / {images.length}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    index === currentImage
                      ? "bg-[#D4AF37]"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`الصورة ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs">اكتشف المزيد</span>
        <div className="w-0.5 h-6 bg-white/30 rounded-full animate-bounce" />
      </div>
    </section>
  );
}
