import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/hero-villa-1.webp", alt: "تصميم فلل حديثة" },
    { src: "/hero-villa-2.jpg", alt: "بناء ومقاولات" },
    { src: "/hero-villa-3.jpg", alt: "تصميم داخلي فاخر" },
    { src: "/hero-villa-4.jpg", alt: "مشاريع سكنية متميزة" },
    { src: "/bait-alreef-home-hero.webp", alt: "منصة بيت الريف" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section dir="rtl" className="w-full bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Slider Part (Left on Desktop, Top on Mobile) */}
          <div className="w-full lg:w-7/12 order-2 lg:order-1">
            <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white group">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-[10px] font-bold">
                {currentSlide + 1} / {slides.length}
              </div>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? "bg-white w-6" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Part (Right on Desktop, Bottom on Mobile) */}
          <div className="w-full lg:w-5/12 text-right order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 mb-6">
              <span className="text-[11px] font-bold">🤖 وياك أفضل وكيل شخصي إماراتي</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              وياك — <span className="text-[#D4AF37]">مساعدك الذكي</span>
            </h1>

            <p className="text-lg font-bold text-gray-700 mb-4">
              أول مساعد شخصي صُمم ليفهم اختياراتك ويدعمك في كل خطوة
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-xl">
              منصة بيت الريف تجمع بين التصميم المعماري، البناء، الصيانة، وإدارة المشاريع في مكان واحد.
              محرك <strong className="text-gray-900">وياك</strong> يساعدك في اتخاذ القرار الأفضل ويخفض التكاليف ويختار لك الخدمة المناسبة
              بسهولة في العين وأبوظبي وباقي الإمارات.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-black text-gray-900">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  4.8
                </div>
                <div className="text-[10px] text-gray-400 font-bold mt-1">تقييم المستخدمين</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900">+90</div>
                <div className="text-[10px] text-gray-400 font-bold mt-1">فئة من الخدمات</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900">47</div>
                <div className="text-[10px] text-gray-400 font-bold mt-1">أدوات ذكية</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://play.google.com/store/apps/details?id=ae.bietalreef.app"
                className="flex-1 min-w-[180px] px-8 py-4 bg-[#D4AF37] text-white rounded-2xl font-black text-center shadow-lg shadow-[#D4AF37]/20 hover:bg-[#b8922b] transition-all"
              >
                ابدأ الآن — وياك يساعدك
              </Link>
              <Link
                href="/how-it-works"
                className="flex-1 min-w-[180px] px-8 py-4 bg-gray-800 text-white rounded-2xl font-black text-center shadow-lg shadow-gray-800/20 hover:bg-gray-900 transition-all"
              >
                اكتشف المنصة
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
