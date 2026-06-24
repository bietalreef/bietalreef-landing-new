import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#FDFBF7] border-b border-[#E6DCC8]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F3F1A]/5 border border-[#D4AF37]/40 text-[#0F3F1A] text-xs mb-6">
            <span className="font-black">بيت الريف</span>
            <span className="text-gray-500">منصة البناء والصيانة الذكية في الإمارات</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F3F1A] mb-5 leading-tight">
            منصة بيت الريف
            <span className="block text-[#B8922B] mt-2">للبناء والصيانة والديكور</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 font-semibold mb-5 leading-relaxed">
            موقع تعريفي ودليل خدمات يربط العملاء بمزودي خدمات البناء والتصميم والصيانة في جميع إمارات الدولة.
          </p>

          <p className="text-gray-600 text-sm sm:text-base mb-8 leading-8 max-w-xl">
            نُبقي الموقع واضحاً للأرشفة والتسويق، ونربطه بتطبيق بيت الريف للتشغيل والسوق والخرائط والطلبات، وبوياك كمساعد ذكي داخل تجربة المستخدم.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl">
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-4 text-center shadow-sm">
              <div className="text-2xl font-black text-[#B8922B]">7</div>
              <div className="text-xs text-gray-500 mt-1">إمارات الدولة</div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-4 text-center shadow-sm">
              <div className="text-2xl font-black text-[#B8922B]">+60</div>
              <div className="text-xs text-gray-500 mt-1">مدينة ومنطقة</div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E6DCC8] p-4 text-center shadow-sm">
              <div className="text-2xl font-black text-[#B8922B]">+17</div>
              <div className="text-xs text-gray-500 mt-1">تخصص خدمة</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://app.bietalreef.ae"
              className="px-8 py-3 rounded-full bg-[#0F3F1A] text-white text-sm font-black shadow-lg hover:bg-[#1F6B3A] transition text-center"
            >
              افتح تطبيق بيت الريف
            </a>
            <Link
              href="/uae"
              className="px-8 py-3 rounded-full border-2 border-[#0F3F1A] text-[#0F3F1A] text-sm font-black hover:bg-[#0F3F1A] hover:text-white transition text-center"
            >
              استعرض الإمارات والمناطق
            </Link>
          </div>
        </div>

        <div className="relative w-full">
          <div className="relative w-full h-[320px] md:h-[460px] rounded-3xl overflow-hidden border border-[#E6DCC8] bg-white shadow-xl">
            <Image
              src="/images/webp/bait-alreef-premiere-cover-smart-construction-platform.webp"
              alt="منصة بيت الريف الذكية للبناء والصيانة في الإمارات"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-5 right-6 left-6 bg-white/95 backdrop-blur rounded-2xl border border-[#E6DCC8] shadow-lg p-4">
            <p className="text-sm font-black text-[#0F3F1A] mb-1">إضافة بدون هدم القديم</p>
            <p className="text-xs text-gray-600 leading-6">نحافظ على روابط الموقع الحالية، ونضيف عليها صفحات المدن والمناطق والتخصصات لتحسين الأرشفة.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
