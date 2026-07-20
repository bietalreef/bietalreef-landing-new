import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgeCheck, Bot, BriefcaseBusiness, Clock3, ExternalLink, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import EnglishLayout from './EnglishLayout';

const serviceFallback = '/images/sector-cards/cleaning-equipment-rental-card.webp';

function ProfileContent({ provider, locale }) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn : provider.nameAr;
  const description = isEn ? provider.descriptionEn : provider.descriptionAr;
  const about = isEn ? provider.aboutEn || description : provider.aboutAr || description;
  const providerType = isEn ? provider.providerTypeEn || 'Service provider' : provider.providerTypeAr || 'مزود خدمة';
  const workingHours = isEn ? provider.workingHoursEn : provider.workingHours;
  const base = isEn ? '/en' : '';
  const locations = (provider.locations || []).map((item) => isEn ? item.areaEn || item.cityEn : item.areaAr || item.cityAr).filter(Boolean);
  const whatsapp = String(provider.whatsapp || '').replace(/\D/g, '');
  const cover = provider.mediaPending ? serviceFallback : provider.cover || serviceFallback;
  const services = provider.directoryServices || [];
  const quoteHref = `${base}/request-quote?provider=${encodeURIComponent(provider.slug)}`;
  const weyaakHref = `${base}/weyaak?provider=${encodeURIComponent(provider.slug)}`;
  const whatsappText = encodeURIComponent(isEn ? `Hello, I would like to ask about ${name} services through Biet Al Reef` : `مرحباً، أرغب في الاستفسار عن خدمات ${name} عبر بيت الريف`);

  return (
    <main dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen bg-[#FDFBF7] text-[#0F3F1A]">
      <section className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <Link href={`${base}/providers`} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCCBAE] bg-white px-4 py-2 text-sm font-black shadow-sm">{isEn ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}{isEn ? 'Back to providers' : 'العودة إلى مزودي الخدمات'}</Link>
        <div className="overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/30 bg-white shadow-[0_28px_80px_rgba(15,63,26,.14)]">
          <div className="relative min-h-[390px] md:min-h-[520px]">
            <Image src={cover} alt={name} fill priority className="object-cover" sizes="(max-width:1200px) 100vw, 1200px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061B28]/96 via-[#061B28]/46 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-gradient-to-br from-[#D4AF37] to-[#8A6A00] text-3xl font-black text-white shadow-2xl">
                  {provider.mediaPending ? <span>{isEn ? 'AR' : 'ر'}</span> : <Image src={provider.logo} alt={isEn ? `${name} logo` : `شعار ${name}`} width={112} height={112} className="h-full w-full object-contain bg-white p-2" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-[#F7E7A0]/35 bg-[#123A46]/80 px-3 py-1 text-xs font-black text-[#F7E7A0]">{providerType}</span>{provider.verified && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-100"><BadgeCheck className="h-4 w-4" />{isEn ? 'Verified' : 'موثق'}</span>}<span className="rounded-full bg-white/12 px-3 py-1 font-mono text-[11px] font-black" dir="ltr">{provider.providerId}</span></div>
                  <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">{name}</h1>
                  <p className="mt-3 max-w-3xl text-sm font-semibold leading-8 text-white/82 md:text-base">{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4 md:p-8">
            {whatsapp && <a href={`https://wa.me/${whatsapp}?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-5 font-black text-white"><MessageCircle className="h-5 w-5" />{isEn ? 'WhatsApp' : 'واتساب'}</a>}
            {provider.phone && <a href={`tel:${String(provider.phone).replace(/\s/g, '')}`} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/35 bg-[#FFF8E5] px-5 font-black"><Phone className="h-5 w-5 text-[#8A6A00]" />{isEn ? 'Call' : 'اتصال'}</a>}
            <Link href={quoteHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/35 bg-white px-5 font-black"><ExternalLink className="h-5 w-5 text-[#8A6A00]" />{isEn ? 'Request quote' : 'طلب عرض سعر'}</Link>
            <Link href={weyaakHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#123A46] px-5 font-black text-white"><Bot className="h-5 w-5 text-[#F7E7A0]" />{isEn ? 'Ask Weyaak' : 'اسأل وياك'}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-14 lg:grid-cols-[1.35fr_.65fr]">
        <article className="rounded-[2rem] border border-[#E5D9C4] bg-white p-7 shadow-sm md:p-9"><p className="text-sm font-black text-[#B8922B]">{isEn ? 'About the business' : 'عن النشاط'}</p><h2 className="mt-3 text-2xl font-black">{isEn ? 'Business information and service scope' : 'معلومات النشاط ونطاق الخدمة'}</h2><p className="mt-5 font-semibold leading-9 text-gray-600">{about}</p><div className="mt-7 flex flex-wrap gap-2">{(provider.services || []).map((service) => <span key={service} className="rounded-full border border-[#E5D9C4] bg-[#FDFBF7] px-4 py-2 text-sm font-black">{service}</span>)}</div></article>
        <aside className="space-y-4">
          <Info icon={<MapPin />} label={isEn ? 'Service areas' : 'مناطق تقديم الخدمة'} value={locations.join(' · ') || (isEn ? 'According to approved coverage' : 'حسب نطاق التغطية المعتمد')} />
          <Info icon={<Clock3 />} label={isEn ? 'Working hours' : 'ساعات العمل'} value={workingHours || (isEn ? 'By prior booking' : 'بالحجز والتنسيق المسبق')} />
          <Info icon={<ShieldCheck />} label={isEn ? 'Profile status' : 'حالة الملف'} value={isEn ? 'Verified provider on Biet Al Reef' : 'مزود موثق داخل بيت الريف'} />
        </aside>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-7"><p className="font-black text-[#B8922B]">{isEn ? 'Published service cards' : 'بطاقات الخدمات المنشورة'}</p><h2 className="mt-2 text-3xl font-black">{isEn ? 'Choose a service and contact the provider' : 'اختر الخدمة وتواصل مع المزود'}</h2></div>
        <div className="grid gap-5 sm:grid-cols-2">{services.map((service) => {
          const title = isEn ? service.titleEn : service.titleAr;
          const image = provider.mediaPending ? serviceFallback : service.image || cover;
          const serviceMessage = encodeURIComponent(isEn ? `Hello, I need ${title} from ${name} through Biet Al Reef` : `مرحباً، أحتاج خدمة ${title} من ${name} عبر بيت الريف`);
          return <article key={service.cardId} className="overflow-hidden rounded-[2rem] border border-[#E5D9C4] bg-white shadow-[0_18px_45px_rgba(18,58,70,.08)]"><div className="relative h-56"><Image src={image} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#061B28]/78 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 px-4 py-2 text-sm font-black text-[#0F3F1A] backdrop-blur-xl">{title}</span></div><div className="p-5"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[11px] font-black text-[#8A6A00]" dir="ltr">{service.cardId}</span><span className="font-mono text-[10px] text-gray-500" dir="ltr">{provider.providerId}</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{whatsapp && <a href={`https://wa.me/${whatsapp}?text=${serviceMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#0F3F1A] px-4 text-sm font-black text-white"><MessageCircle className="h-4 w-4" />{isEn ? 'WhatsApp' : 'تواصل'}</a>}<Link href={`${quoteHref}&service=${encodeURIComponent(service.slug)}`} className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/35 bg-[#FFF8E5] px-4 text-sm font-black"><BriefcaseBusiness className="h-4 w-4 text-[#8A6A00]" />{isEn ? 'Request service' : 'اطلب الخدمة'}</Link></div></div></article>;
        })}</div>
      </section>
    </main>
  );
}

function Info({ icon, label, value }) { return <div className="rounded-[1.5rem] border border-[#E5D9C4] bg-white p-5 shadow-sm"><div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF8E5] text-[#8A6A00] [&>svg]:h-5 [&>svg]:w-5">{icon}</span><div><p className="text-xs font-black text-gray-500">{label}</p><p className="mt-2 text-sm font-black leading-7">{value}</p></div></div></div>; }

export default function GenericProviderProfile({ provider, locale = 'ar' }) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn : provider.nameAr;
  const description = isEn ? provider.descriptionEn : provider.descriptionAr;
  const canonical = `https://bietalreef.ae${isEn ? '/en' : ''}/providers/${provider.slug}`;
  const alternate = `https://bietalreef.ae${isEn ? '' : '/en'}/providers/${provider.slug}`;
  const imagePath = provider.mediaPending ? serviceFallback : provider.cover || serviceFallback;
  const image = `https://bietalreef.ae${imagePath}`;
  const title = `${name} | ${isEn ? 'Biet Al Reef' : 'بيت الريف'}`;
  const body = <ProfileContent provider={provider} locale={locale} />;
  return <><Head><title>{title}</title><meta name="description" content={description} /><link rel="canonical" href={canonical} /><link rel="alternate" hrefLang={isEn ? 'en-AE' : 'ar-AE'} href={canonical} /><link rel="alternate" hrefLang={isEn ? 'ar-AE' : 'en-AE'} href={alternate} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={canonical} /><meta property="og:image" content={image} /><meta property="og:image:alt" content={name} /><meta property="og:type" content="business.business" /><meta property="og:locale" content={isEn ? 'en_AE' : 'ar_AE'} /><meta property="og:site_name" content={isEn ? 'Biet Al Reef' : 'بيت الريف'} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={image} /></Head>{isEn ? <EnglishLayout>{body}</EnglishLayout> : <><Navbar />{body}<Footer /></>}</>;
}
