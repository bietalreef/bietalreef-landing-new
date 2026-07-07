import Link from 'next/link';
import { ShieldCheck, Gem, ArrowLeft } from 'lucide-react';

export default function PremiumProviderCard({ provider }) {
  return (
    <Link href={'/providers/' + provider.slug} className="group block overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-white shadow-xl shadow-[#8A6A00]/10 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="h-1.5 bg-gradient-to-l from-[#0F3F1A] via-[#D4AF37] to-[#0F3F1A]" />
      <div className="grid lg:grid-cols-[0.9fr_1.4fr]">
        <div className="bg-gradient-to-br from-[#071A12] via-[#0F3F1A] to-[#1A5C28] p-7 text-white md:p-9">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-3 py-1.5 text-xs font-black text-[#F3D46B]"><Gem className="h-4 w-4" /> تخصص فاخر</span>
            {provider.verified && <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-black text-emerald-100"><ShieldCheck className="h-4 w-4" /> موثق</span>}
          </div>
          <h3 className="mt-5 text-3xl font-black leading-tight md:text-4xl">{provider.nameAr}</h3>
          <p className="mt-3 text-sm font-bold text-[#F3D46B]">{provider.providerTypeAr} · العين · أبوظبي</p>
        </div>
        <div className="p-7 md:p-9">
          <p className="text-base font-semibold leading-8 text-gray-700">{provider.descriptionAr}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {['رخام طبيعي وجرانيت', 'كوارتز ومطابخ', 'واجهات وأرضيات'].map((item) => <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FFF8E5] px-4 py-3 text-center text-xs font-black text-[#0F3F1A]">{item}</div>)}
          </div>
          <div className="mt-7 border-t border-[#EFE5D2] pt-5">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3 text-sm font-black text-white transition group-hover:bg-[#D4AF37] group-hover:text-[#0F3F1A]">افتح ملف المصنع <ArrowLeft className="h-4 w-4" /></span>
          </div>
        </div>
      </div>
    </Link>
  );
}
