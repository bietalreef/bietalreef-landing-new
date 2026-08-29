import { Download, Globe2, ShoppingBag } from 'lucide-react';
import { GOOGLE_PLAY_URL, MARKET_URL, PROVIDERS_APP_URL } from '../lib/platformUrls';

const copy = {
  ar: {
    download: 'حمّل تطبيق بيت الريف',
    browser: 'الدخول من المتصفح',
    market: 'فتح سوق بيت الريف',
  },
  en: {
    download: 'Download Biet Al Reef',
    browser: 'Open the web app',
    market: 'Open Biet Al Reef Market',
  },
};

export default function PlatformAccessActions({ locale = 'ar', compact = false, className = '' }) {
  const t = copy[locale] || copy.ar;
  const base = 'inline-flex items-center justify-center gap-2 rounded-2xl font-black transition hover:-translate-y-0.5';
  const spacing = compact ? 'min-h-11 px-4 py-2.5 text-xs' : 'min-h-[52px] px-6 py-3 text-sm';

  return (
    <div className={`grid gap-2 ${compact ? 'grid-cols-1' : 'sm:grid-cols-3'} ${className}`} data-platform-access-actions>
      <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${spacing} bg-[#D4AF37] text-[#0F3F1A]`}>
        <Download className="h-4 w-4" />{t.download}
      </a>
      <a href={PROVIDERS_APP_URL} className={`${base} ${spacing} bg-[#0F3F1A] text-white`}>
        <Globe2 className="h-4 w-4" />{t.browser}
      </a>
      <a href={MARKET_URL} className={`${base} ${spacing} border border-[#D8C9A8] bg-white text-[#0F3F1A]`}>
        <ShoppingBag className="h-4 w-4" />{t.market}
      </a>
    </div>
  );
}
