import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function UaeProviderJoinCTA({ locale = 'ar', emirate = null, area = null, service = null }) {
  const isEn = locale === 'en';
  const location = area ? (isEn ? area.nameEn : area.nameAr) : emirate ? (isEn ? emirate.nameEn : emirate.nameAr) : (isEn ? 'the UAE' : 'الإمارات');
  const specialty = service ? (isEn ? service.nameEn : service.nameAr) : null;
  const Arrow = isEn ? ArrowRight : ArrowLeft;
  const description = isEn
    ? `Customers searching for ${specialty ? `${specialty.toLowerCase()} in ` : 'services in '}${location} should find your business here. Join Biet Al Reef and place your company where customers are already looking for your service.`
    : `العميل الذي يبحث عن ${specialty ? `${specialty} في ` : 'خدمة داخل '}${location} يجب أن يجد شركتك هنا. انضم إلى بيت الريف واجعل نشاطك حاضرًا في المكان الذي يبحث فيه العميل عن خدمتك.`;

  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="bg-[#FDFBF7] px-4 py-8 md:py-11" aria-label={isEn ? 'Join the Biet Al Reef provider directory' : 'انضم إلى دليل مزودي بيت الريف'}>
      <div className="mx-auto grid max-w-6xl items-center gap-5 overflow-hidden rounded-[2rem] border border-[#D9B75A]/55 bg-[linear-gradient(135deg,#FFFDF7_0%,#F8F0DA_100%)] p-6 shadow-[0_20px_55px_rgba(138,106,0,.10)] md:grid-cols-[150px_1fr_auto] md:p-8">
        <div className="relative mx-auto h-28 w-28 md:h-36 md:w-36"><Image src="/images/ui-icons-3d/provider-worker.webp" alt="" fill className="object-contain" sizes="144px" /></div>
        <div className={isEn ? 'text-left' : 'text-right'}>
          <span className="text-xs font-black text-[#8A6A00]">{isEn ? 'Your customers are searching here' : 'عملاؤك يبحثون هنا'}</span>
          <h2 className="mt-2 text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{isEn ? 'Your company should appear here' : 'يجب أن تظهر شركتك هنا'}</h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-8 text-gray-700 md:text-base">{description}</p>
        </div>
        <Link href={isEn ? '/en/providers/register' : '/providers/register'} className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-7 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#B8922B]">
          {isEn ? 'Join now' : 'انضم الآن'}
          <Arrow className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
