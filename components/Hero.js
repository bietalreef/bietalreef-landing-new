import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    { src: "/hero-villa-1.webp", alt: "فيلا حديثة فاخرة" },
    { src: "/hero-villa-2.jpg", alt: "مشروع بناء عصري" },
    { src: "/hero-villa-3.jpg", alt: "تصميم معماري حديث" },
    { src: "/hero-villa-4.jpg", alt: "واجهة فيلا فاخرة" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  return (
    <section className="bg-gradient-to-b from-white via-beige to-beige pt-8 pb-12 md:pt-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Text Content - Mobile First */}
        <div className="flex-1 w-full order-2 md:order-1">
          {/* Weyaak Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white text-xs mb-4 shadow-soft">
            <span className="text-[11px] font-semibold">🤖 وياك</span>
            <span className="text-[11px]">أفضل وكيل شخصي إماراتي</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
            وياك — <span className="text-primary">مساعدك الذكي</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-primary font-semibold mb-4 md:mb-6">
            أول مساعد شخصي صُمم ليفهم اختياراتك ويدعمك في كل خطوة
          </p>
          
          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base mb-4 md:mb-6 leading-relaxed">
            منصة بيت الريف تجمع بين التصميم المعماري، البناء، الصيانة، وإدارة المشاريع في مكان واحد.
            <br />
            <strong>وياك</strong> يساعدك في اتخاذ القرار الأفضل ويختار لك مزود الخدمة المناسب في العين وأبوظبي وباقي الإمارات.
          </p>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-3 mb-6 md:mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+1000</div>
              <div className="text-xs text-gray-600">مزود خدمة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">+5000</div>
              <div className="text-xs text-gray-600">مشروع منجز</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8★</div>
              <div className="text-xs text-gray-600">تقييم المستخدمين</div>
            </div>
          </div>
          
          {/* CTA Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a
              href="https://app.bietalreef.ae"
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-soft hover:bg-primary-dark transition text-center"
            >
              ابدأ الآن — وياك بيساعدك
            </a>
            <Link
              href="/services"
              className="flex-1 sm:flex-none px-6 py-3 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition text-center"
            >
              اكتشف المنصة
            </Link>
            <a
              href="tel:+971XXXXXXXXX"
              className="flex-1 sm:flex-none px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition text-center"
            >
              تواصل معنا
            </a>
          </div>
        </div>

        {/* Image Carousel - Mobile First */}
        <div className="flex-1 w-full order-1 md:order-2 mb-6 md:mb-0">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200">
            {/* Main Image */}
            <div className="relative w-full h-80 md:h-96">
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
                  />
                </div>
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {currentImage + 1} / {images.length}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentImage
                      ? "bg-primary"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
