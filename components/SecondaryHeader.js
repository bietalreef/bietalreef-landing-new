import { useRouter } from 'next/router';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SecondaryHeader({ backLabel = 'رجوع', backUrl, locale = 'ar' }) {
  const router = useRouter();
  const isEn = locale === 'en';
  const Arrow = isEn ? ArrowLeft : ArrowRight;

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
      return;
    }
    router.back();
  };

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="w-full bg-[#FDFBF7] border-b border-[#E6DCC8] py-3">
      <div className={`max-w-6xl mx-auto px-4 flex ${isEn ? 'justify-start' : 'justify-start'}`}>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-3 rounded-full bg-white border border-[#E6DCC8] px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary hover:border-primary transition-all shadow-sm"
          aria-label={backLabel}
        >
          <Arrow className="w-5 h-5" />
          <span>{backLabel}</span>
        </button>
      </div>
    </div>
  );
}
