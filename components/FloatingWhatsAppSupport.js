import { useRouter } from 'next/router';
import { MessageCircle } from 'lucide-react';

const OFFICIAL_WHATSAPP = '971564456337';

export default function FloatingWhatsAppSupport({ locale = 'ar' }) {
  const router = useRouter();
  const isEn = locale === 'en';
  const title = typeof document !== 'undefined'
    ? (document.title || (isEn ? 'Biet Al Reef' : 'بيت الريف'))
    : (isEn ? 'Biet Al Reef' : 'بيت الريف');
  const pageUrl = typeof window !== 'undefined' ? window.location.href : router.asPath || '/';
  const message = isEn
    ? `Hello Biet Al Reef customer service. I need help with:\n${title}\n${pageUrl}`
    : `مرحباً خدمة عملاء بيت الريف، أحتاج مساعدة بخصوص:\n${title}\n${pageUrl}`;
  const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isEn ? 'Biet Al Reef WhatsApp customer service' : 'واتساب خدمة عملاء بيت الريف'}
      data-analytics-action="whatsapp_support"
      className="fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(0,0,0,.28)] ring-4 ring-white transition hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(0,0,0,.34)] focus:outline-none focus:ring-[#D4AF37]/70"
      title={isEn ? 'WhatsApp customer service' : 'خدمة العملاء عبر واتساب'}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
