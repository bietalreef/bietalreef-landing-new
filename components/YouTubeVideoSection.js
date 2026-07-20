import { PlayCircle } from 'lucide-react';

export default function YouTubeVideoSection({ locale = 'ar', videoId }) {
  const isEn = locale === 'en';
  const title = isEn ? 'Discover Biet Al Reef Services & Offers' : 'تعرّف على خدمات وعروض بيت الريف';
  const description = isEn ? 'Watch how the Services & Offers section helps you choose the right service and move from a project need to a clear request path.' : 'شاهد كيف يساعدك قسم الخدمات والعروض على اختيار الخدمة المناسبة وتحويل احتياج المشروع إلى طلب واضح قابل للتوجيه.';
  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
      <div className="overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/30 bg-[#123A46] shadow-[0_26px_70px_rgba(18,58,70,.16)]">
        <div className="grid items-center gap-0 lg:grid-cols-[.82fr_1.18fr]">
          <div className="p-7 text-white md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F7E7A0]/35 bg-white/10 px-4 py-2 text-xs font-black text-[#F7E7A0]"><PlayCircle className="h-4 w-4" />{isEn ? 'Services video' : 'فيديو الخدمات'}</span>
            <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">{title}</h2>
            <p className="mt-4 font-semibold leading-8 text-white/78">{description}</p>
          </div>
          <div className="relative aspect-video min-h-[240px] overflow-hidden bg-black">
            <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`} title={title} className="absolute inset-0 h-full w-full" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
