import { Info, MapPin } from 'lucide-react';

export default function UaeContextInfoCard({ locale = 'ar', title, description, locationLabel }) {
  const isEn = locale === 'en';
  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="bg-[#FDFBF7] px-4 py-8">
      <div className={`${isEn ? 'text-left' : 'text-right'} mx-auto max-w-4xl rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:p-8`}>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF9EC] text-[#8A611B] ring-1 ring-[#DCCAA7]"><Info className="h-5 w-5" /></span>
          <div className="min-w-0">
            {locationLabel ? <span className="inline-flex items-center gap-2 rounded-full bg-[#F8F3E9] px-3 py-1 text-xs font-black text-[#8A611B]"><MapPin className="h-3.5 w-3.5" />{locationLabel}</span> : null}
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#0F3F1A] md:text-3xl">{title}</h2>
            <p className="mt-4 text-sm font-semibold leading-8 text-gray-600 md:text-base">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
