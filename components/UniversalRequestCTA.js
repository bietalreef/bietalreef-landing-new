import Link from 'next/link';
import { ArrowLeft, ArrowRight, Headphones, MessageCircle, Send, Sparkles } from 'lucide-react';

const copy = {
  ar: {
    eyebrow: 'بيت الريف هنا من أجلك',
    title: 'لم تجد الخدمة أو المنتج أو المزود المناسب؟',
    desc: 'خدمة العميل مجانية. أرسل طلبك الآن، وسيساعدك فريق بيت الريف أو وكيل وياك في الوصول إلى الخدمة أو المنتج أو مزود الخدمة المناسب داخل الإمارات.',
    request: 'إرسال طلبك الآن',
    weyaak: 'تحدث مع وياك',
    support: 'تواصل مع الدعم',
    note: 'لا تخرج بدون مسار واضح — إذا لم تجد ما تبحث عنه، نحن نساعدك في تجهيزه.',
    requestHref: '/request-quote',
    weyaakHref: '/weyaak',
    supportHref: 'https://wa.me/971567856001',
    dir: 'rtl',
    arrow: ArrowLeft,
  },
  en: {
    eyebrow: 'Biet Al Reef is here for you',
    title: 'Did not find the right service, product or provider?',
    desc: 'Customer support is free. Send your request now and the Biet Al Reef team or Weyaak will help you reach the right service, product or provider in the UAE.',
    request: 'Send your request now',
    weyaak: 'Talk to Weyaak',
    support: 'Contact support',
    note: 'Do not leave without a clear path — if you cannot find it, we help you prepare the request.',
    requestHref: '/en/request-quote',
    weyaakHref: '/en/weyaak',
    supportHref: 'https://wa.me/971567856001',
    dir: 'ltr',
    arrow: ArrowRight,
  },
};

function SmartLink({ href, children, className, onClick }) {
  if (href?.startsWith('http') || href?.startsWith('tel:') || href?.startsWith('mailto:')) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} onClick={onClick} className={className}>{children}</a>;
  }
  return <Link href={href} onClick={onClick} className={className}>{children}</Link>;
}

export default function UniversalRequestCTA({ locale = 'ar', variant = 'default', className = '' }) {
  const current = copy[locale] || copy.ar;
  const Arrow = current.arrow;
  const compact = variant === 'compact';

  return (
    <section dir={current.dir} className={`bg-[#FDFBF7] px-4 py-10 md:py-14 ${className}`} aria-label={locale === 'en' ? 'Send a request to Biet Al Reef' : 'إرسال طلب إلى بيت الريف'}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[#D4AF37]/45 bg-[#0F3F1A] text-white shadow-2xl shadow-[#0F3F1A]/16">
        <div className="relative p-6 md:p-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_30%)]" />
          <div className="relative grid gap-7 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div className={locale === 'en' ? 'text-left' : 'text-right'}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-white/10 px-4 py-2 text-xs font-black text-[#F7E7A0] backdrop-blur">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {current.eyebrow}
              </span>
              <h2 className="mt-4 text-2xl font-black leading-tight md:text-4xl">{current.title}</h2>
              <p className="mt-4 max-w-3xl text-sm font-semibold leading-8 text-white/86 md:text-base md:leading-9">{current.desc}</p>
              {!compact && <p className="mt-3 text-xs font-bold leading-6 text-[#F7E7A0]/90 md:text-sm">{current.note}</p>}
            </div>

            <div className="grid gap-3">
              <SmartLink href={current.requestHref} className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-sm font-black text-[#102F18] shadow-lg shadow-[#D4AF37]/20 transition hover:-translate-y-0.5 hover:bg-[#E7C45A] md:text-base">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102F18] text-[#F7E7A0] shadow-inner"><Send className="h-5 w-5" aria-hidden="true" /></span>
                {current.request}
                <Arrow className="h-5 w-5 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </SmartLink>
              <SmartLink href={current.weyaakHref} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-white/18 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/16">
                <MessageCircle className="h-5 w-5 text-[#F7E7A0]" aria-hidden="true" />
                {current.weyaak}
              </SmartLink>
              <SmartLink href={current.supportHref} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-white/18 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/16">
                <Headphones className="h-5 w-5 text-[#F7E7A0]" aria-hidden="true" />
                {current.support}
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
