import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, Headphones, MessageCircle, Send, Sparkles } from 'lucide-react';

const copy = {
  ar: {
    eyebrow: 'مسار طلب ذكي من بيت الريف',
    title: 'لم تجد ما يناسب مشروعك؟',
    desc: 'صف احتياجك مرة واحدة، وسنساعدك في تنظيم الطلب والوصول إلى المسار المناسب داخل الإمارات.',
    request: 'ابدأ طلبك',
    weyaak: 'اسأل وياك',
    support: 'الدعم المباشر',
    signal: 'WAYAAK / SMART ROUTING',
    requestHref: '/request-quote',
    weyaakHref: '/weyaak',
    supportHref: 'https://wa.me/971567856001',
    dir: 'rtl',
    arrow: ArrowLeft,
  },
  en: {
    eyebrow: 'Smart request path by Biet Al Reef',
    title: 'Still looking for the right fit?',
    desc: 'Describe your need once and we will help structure the request and guide you to the right path across the UAE.',
    request: 'Start your request',
    weyaak: 'Ask Weyaak',
    support: 'Direct support',
    signal: 'WAYAAK / SMART ROUTING',
    requestHref: '/en/request-quote',
    weyaakHref: '/en/weyaak',
    supportHref: 'https://wa.me/971567856001',
    dir: 'ltr',
    arrow: ArrowRight,
  },
};

function SmartLink({ href, children, className }) {
  if (href?.startsWith('http') || href?.startsWith('tel:') || href?.startsWith('mailto:')) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

export default function UniversalRequestCTA({ locale = 'ar', className = '' }) {
  const current = copy[locale] || copy.ar;
  const Arrow = current.arrow;

  return (
    <section dir={current.dir} className={`bg-[#FDFBF7] px-4 py-8 md:py-11 ${className}`} aria-label={locale === 'en' ? 'Start a smart request with Biet Al Reef' : 'ابدأ طلبًا ذكيًا مع بيت الريف'}>
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#C9A73A]/35 bg-[#061E15] text-white shadow-[0_28px_80px_-34px_rgba(6,30,21,0.75)]">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(247,231,160,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(247,231,160,.08)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-emerald-400/20 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-[#D4AF37]/15 blur-[90px]" />

        <div className="relative grid items-center gap-7 p-6 md:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 lg:p-10">
          <div className="relative mx-auto hidden h-52 w-full max-w-[300px] items-center justify-center lg:flex" aria-hidden="true">
            <div className="absolute h-44 w-44 rotate-45 rounded-[2.5rem] border border-[#D4AF37]/25 bg-gradient-to-br from-white/12 to-white/[0.02] shadow-[22px_24px_55px_rgba(0,0,0,.34),inset_1px_1px_0_rgba(255,255,255,.2)] backdrop-blur-xl" />
            <div className="absolute h-32 w-32 rotate-[30deg] rounded-[2rem] border border-emerald-300/25 bg-gradient-to-br from-emerald-300/20 to-[#0A3A28]/30 shadow-[12px_18px_40px_rgba(0,0,0,.3)]" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-[#F7E7A0]/40 bg-gradient-to-br from-[#E7C45A] via-[#B98B18] to-[#71510A] text-[#062217] shadow-[0_20px_40px_rgba(0,0,0,.4),inset_4px_4px_10px_rgba(255,255,255,.45),inset_-5px_-5px_12px_rgba(71,45,0,.3)]">
              <Bot className="h-11 w-11 drop-shadow-sm" />
            </div>
            <span className="absolute bottom-0 rounded-full border border-emerald-300/20 bg-[#0A2C20]/80 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-emerald-200/80 backdrop-blur">{current.signal}</span>
          </div>

          <div className={locale === 'en' ? 'text-left' : 'text-right'}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-2 text-xs font-black text-[#F7E7A0] shadow-inner shadow-white/5 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {current.eyebrow}
            </span>
            <h2 className="mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight md:text-4xl">{current.title}</h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-white/72 md:text-base md:leading-8">{current.desc}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
              <SmartLink href={current.requestHref} className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#F7E7A0]/50 bg-gradient-to-b from-[#E6C654] to-[#C69D24] px-5 py-3 text-sm font-black text-[#082419] shadow-[0_14px_28px_-14px_rgba(212,175,55,.8),inset_0_1px_0_rgba(255,255,255,.65)] transition hover:-translate-y-0.5 hover:brightness-105 md:text-base">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#082419] text-[#F7E7A0] shadow-[inset_0_1px_0_rgba(255,255,255,.18)]"><Send className="h-4.5 w-4.5" aria-hidden="true" /></span>
                {current.request}
                <Arrow className="h-5 w-5 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </SmartLink>
              <SmartLink href={current.weyaakHref} className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-gradient-to-b from-white/12 to-white/[0.06] px-5 py-3 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,.14)] backdrop-blur transition hover:border-emerald-300/30 hover:bg-white/15">
                <MessageCircle className="h-5 w-5 text-[#F7E7A0]" aria-hidden="true" />
                {current.weyaak}
              </SmartLink>
            </div>

            <SmartLink href={current.supportHref} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-white/90">
              <Headphones className="h-4 w-4 text-emerald-300/75" aria-hidden="true" />
              {current.support}
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
