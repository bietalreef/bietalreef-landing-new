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
  }, [images.length]);

  return (
    <section dir="rtl" className="relative w-full overflow-hidden bg-white border-b border-[#E6DCC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 w-full text-right order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F3F1A] text-white text-xs mb-6 shadow-sm">
            <span className="text-[11px] font-semibold">🤖 وياك</span>
            <span className="text-[11px]">أفضل وكيل شخصي إماراتي</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-3 leading-tight">
            وياك — <span className="text-[#0F3F1A]">مساعدك الذكي</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-800 font-bold mb-5 leading-relaxed">
            أول مساعد شخصي صُمم ليفهم اختياراتك ويدعمك في كل خطوة
          </p>

          <p className="text-gray-600 text-sm sm:text-base mb-8 leading-8 max-w-xl">
            منصة بيت الريف تجمع بين التصميم المعماري، البناء، الصيانة، وإدارة المشاريع في مكان واحد.
            <strong className="text-[#0F3F1A]"> وياك </strong>
            يساعدك في اتخاذ القرار الأفضل ويختار لك مزود الخدمة المناسب في العين وأبوظبي وباقي الإمارات.
          </p>

          <div className="flex gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900">47</div>
              <div className="text-xs text-gray-500 mt-1">أداة ذكية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900">90+</div>
              <div className="text-xs text-gray-500 mt-1">خدمة وتخصص</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900">7</div>
              <div className="text-xs text-gray-500 mt-1">إمارات الدولة</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://app.bietalreef.ae"
              className="px-8 py-3 rounded-full bg-[#0F3F1A] text-white text-sm font-bold shadow-lg hover:bg-[#1a5c28] transition text-center"
            >
              ابدأ الآن — وياك بيساعدك
            </a>
            <Link
              href="/services"
              className="px-8 py-3 rounded-full border-2 border-[#0F3F1A] text-[#0F3F1A] text-sm font-bold hover:bg-[#0F3F1A] hover:text-white transition text-center"
            >
              اكتشف المنصة
            </Link>
            <a
              href="https://wa.me/971567856001"
              className="px-8 py-3 rounded-full border border-[#E6DCC8] text-gray-700 text-sm font-bold hover:border-[#0F3F1A] hover:text-[#0F3F1A] transition text-center"
            >
              تواصل معنا
            </a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg order-1 lg:order-2">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-[#E6DCC8] bg-[#F9F6F0]">
            <div className="relative w-full h-72 md:h-[420px]">
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
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>

            <div className="absolute top-4 left-4 bg-[#0F3F1A]/80 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              {currentImage + 1} / {images.length}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    index === currentImage ? "bg-[#0F3F1A]" : "bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`الصورة ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
