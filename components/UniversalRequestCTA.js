import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { GOOGLE_PLAY_URL, PROVIDERS_APP_URL } from '../lib/platformUrls';

const copy = {
  ar: {
    eyebrow: 'للشركات والمصانع والورش ومزودي الخدمات',
    title: 'اعرض نشاطك وخدماتك داخل بيت الريف',
    desc: 'انضم إلى دليل بيت الريف بملف مهني يوضح نشاطك الرئيسي وتخصصاتك وخدماتك ومنتجاتك ومناطق عملك، ويساعد العملاء ومحركات البحث على الوصول إلى شركتك في المكان والتخصص الصحيحين.',
    primary: 'حمّل تطبيق بيت الريف',
    secondary: 'الدخول من المتصفح',
    support: 'تحدث مع فريق الانضمام',
    points: ['ملف نشاط منظم', 'ظهور حسب التخصص والموقع', 'استقبال طلبات العملاء'],
    primaryHref: GOOGLE_PLAY_URL,
    secondaryHref: PROVIDERS_APP_URL,
    supportHref: 'https://wa.me/971567856001?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D8%A5%D9%84%D9%89%20%D8%A8%D9%8A%D8%AA%20%D8%A7%D9%84%D8%B1%D9%8A%D9%81%20%D9%83%D9%85%D8%B2%D9%88%D8%AF%20%D8%AE%D8%AF%D9%85%D8%A9',
    dir: 'rtl',
    arrow: ArrowLeft,
  },
  en: {
    eyebrow: 'For companies, factories, workshops and service providers',
    title: 'Showcase your business and services on Biet Al Reef',
    desc: 'Join the Biet Al Reef directory with a professional profile that presents your main activity, specialisations, services, products and coverage areas, helping customers and search engines find your company in the right location and category.',
    primary: 'Download Biet Al Reef',
    secondary: 'Open the web app',
    support: 'Talk to the onboarding team',
    points: ['Structured business profile', 'Location and specialty discovery', 'Customer enquiries'],
    primaryHref: GOOGLE_PLAY_URL,
    secondaryHref: PROVIDERS_APP_URL,
    supportHref: 'https://wa.me/971567856001?text=I%20would%20like%20to%20join%20Biet%20Al%20Reef%20as%20a%20service%20provider',
    dir: 'ltr',
    arrow: ArrowRight,
  },
};

function SmartLink({ href, children, className }) {
  if (href?.startsWith('http') || href?.startsWith('tel:') || href?.startsWith('mailto:')) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return <Link href={href} className={className}>{children}</Link>;
}

export default function UniversalRequestCTA({ locale = 'ar', className = '' }) {
  const current = copy[locale] || copy.ar;
  const Arrow = current.arrow;

  return (
    <section
      dir={current.dir}
      className={`bg-[#FFFDF8] px-4 py-8 md:py-11 ${className}`}
      aria-label={locale === 'en' ? 'Join the Biet Al Reef provider directory' : 'انضم إلى دليل مزودي بيت الريف'}
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#D7B44A]/45 bg-gradient-to-br from-white via-[#FFFCF3] to-[#F8EBC2]/45 shadow-[0_24px_70px_-40px_rgba(94,67,4,0.45)]">
        <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-[#E7C75E]/20 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-[#E4D49C]/30 blur-[90px]" />

        <div className="relative grid items-center gap-8 p-6 md:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:p-11">
          <div className="relative mx-auto hidden min-h-56 w-full max-w-[300px] items-center justify-center lg:flex" aria-hidden="true">
            <div className="absolute h-48 w-48 rotate-45 rounded-[2.8rem] border border-[#D7B44A]/30 bg-white/70 shadow-[18px_22px_55px_rgba(88,61,0,.12)]" />
            <div className="absolute h-36 w-36 rotate-[30deg] rounded-[2.2rem] border border-[#0F3F1A]/12 bg-[#F8EBC2]/70" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-[#D7B44A]/55 bg-gradient-to-br from-[#F4D873] via-[#D9B137] to-[#A77A0A] text-[#13361D] shadow-[0_18px_38px_rgba(102,72,3,.24),inset_3px_3px_8px_rgba(255,255,255,.55)]">
              <Building2 className="h-11 w-11" />
            </div>
            <span className="absolute bottom-0 inline-flex items-center gap-2 rounded-full border border-[#0F3F1A]/12 bg-white/85 px-4 py-2 text-xs font-black text-[#0F3F1A] shadow-sm">
              <BadgeCheck className="h-4 w-4 text-[#B58A16]" />
              {locale === 'en' ? 'Provider directory' : 'دليل مزودي بيت الريف'}
            </span>
          </div>

          <div className={locale === 'en' ? 'text-left' : 'text-right'}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D7B44A]/35 bg-[#FFF6D8] px-3.5 py-2 text-xs font-black text-[#765600]">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              {current.eyebrow}
            </span>
            <h2 className="mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight text-[#10371B] md:text-4xl">{current.title}</h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-[#405246] md:text-base md:leading-8">{current.desc}</p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {current.points.map((point) => (
                <span key={point} className="inline-flex items-center gap-2 text-xs font-black text-[#35513C] md:text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[#B58A16]" aria-hidden="true" />
                  {point}
                </span>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
              <SmartLink href={current.primaryHref} className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#C69D24] bg-gradient-to-b from-[#E8CA62] to-[#CDA42B] px-5 py-3 text-sm font-black text-[#10371B] shadow-[0_14px_28px_-16px_rgba(156,113,8,.6),inset_0_1px_0_rgba(255,255,255,.7)] transition hover:-translate-y-0.5 hover:brightness-105 md:text-base">
                <Building2 className="h-5 w-5" aria-hidden="true" />
                {current.primary}
                <Arrow className="h-5 w-5 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </SmartLink>
              <SmartLink href={current.secondaryHref} className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border border-[#0F3F1A]/15 bg-white/80 px-5 py-3 text-sm font-black text-[#10371B] shadow-sm transition hover:border-[#D7B44A]/60 hover:bg-white">
                {current.secondary}
              </SmartLink>
            </div>

            <SmartLink href={current.supportHref} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#526458] transition hover:text-[#10371B]">
              <MessageCircle className="h-4 w-4 text-[#B58A16]" aria-hidden="true" />
              {current.support}
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
