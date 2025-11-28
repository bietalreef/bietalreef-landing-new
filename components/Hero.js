import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-beige pt-10 pb-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softBlue text-xs text-primary mb-4 shadow-soft">
            <span className="text-[10px]">Powered by</span>
            <span className="font-semibold">Weyaak Intelligent System</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-relaxed">
            مرحبًا بك في <span className="text-primary">بيت الريف</span>
          </h1>
          <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
            منصة شاملة تجمع بين التصميم المعماري، إدارة المشاريع، والتواصل الفوري مع أفضل المقاولين
            والمصممين في الإمارات.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://app.bietalreef.ae"
              className="px-6 py-3 rounded-full bg-primary text-white text-sm font-medium shadow-soft"
            >
              ابدأ الآن
            </a>
            <Link
              href="/platform"
              className="px-4 py-2 rounded-full border border-primary text-primary text-sm"
            >
              تعرّف على المنصة
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full rounded-xl2 bg-softBlue shadow-soft p-6 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4 text-white text-3xl font-bold">
              و
            </div>
            <h2 className="font-semibold text-gray-900 mb-2">وياك — مساعدك الذكي</h2>
            <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
              ذكاء اصطناعي يساعدك في التصميم الداخلي والخارجي، إدارة المشاريع، وتقديم حلول فورية لأسئلتك
              حول البناء والتشطيب.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
