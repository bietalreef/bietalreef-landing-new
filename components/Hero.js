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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-softBlue text-xs text-primary mb-4 shadow-soft">
            <span className="text-[10px]">Powered by</span>
            <span className="font-semibold">Weyaak Intelligent System</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
            مرحبًا بك في <span className="text-primary">بيت الريف</span>
          </h1>
          
          <p className="text-gray-700 text-sm sm:text-base mb-6 md:mb-8 leading-relaxed">
            منصة شاملة تجمع بين التصميم المعماري، إدارة المشاريع، والتواصل الفوري مع أفضل المقاولين
            والمصممين في الإمارات.
          </p>
          
          {/* CTA Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a
              href="https://app.bietalreef.ae"
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-soft hover:bg-primary-dark transition text-center"
            >
              ابدأ الآن
            </a>
            <Link
              href="/services"
              className="flex-1 sm:flex-none px-6 py-3 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition text-center"
            >
              استكشف الخدمات
            </Link>
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
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
              
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {currentImage + 1} / {images.length}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="bg-white px-4 py-3 flex items-center justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImage
                      ? "bg-primary w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`صورة ${index + 1}`}
                />
              ))}
            </div>

            {/* Image Description */}
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 text-center text-sm font-semibold">
              {images[currentImage].alt}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
