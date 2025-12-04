import Link from "next/link";
import Image from "next/image";

export default function Hero() {
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
              href="/platform"
              className="flex-1 sm:flex-none px-6 py-3 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition text-center"
            >
              تعرّف على المنصة
            </Link>
          </div>
        </div>

        {/* WEYAAK Card - Mobile First */}
        <div className="flex-1 w-full order-1 md:order-2 mb-6 md:mb-0">
          <div className="w-full rounded-2xl bg-gradient-to-br from-softBlue to-blue-50 shadow-soft p-6 md:p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center mb-4 text-white text-3xl md:text-4xl font-bold shadow-soft">
              و
            </div>
            <h2 className="font-bold text-gray-900 mb-2 text-lg md:text-xl">وياك — مساعدك الذكي</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
              ذكاء اصطناعي يساعدك في التصميم الداخلي والخارجي، إدارة المشاريع، وتقديم حلول فورية لأسئلتك
              حول البناء والتشطيب.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
