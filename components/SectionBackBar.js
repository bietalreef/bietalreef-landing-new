import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SectionBackBar({ locale = 'ar', href, label }) {
  const isEn = locale === 'en';
  const target = href || (isEn ? '/en' : '/');
  const text = label || (isEn ? 'Back to home' : 'العودة إلى الرئيسية');
  return <div dir={isEn ? 'ltr' : 'rtl'} className="border-b border-[#E8DDC9] bg-white/95"><div className="mx-auto max-w-6xl px-4 py-3"><Link href={target} className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#DCCBAE] bg-[#FDFBF7] px-4 text-sm font-black text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:bg-white">{isEn ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}{text}</Link></div></div>;
}
