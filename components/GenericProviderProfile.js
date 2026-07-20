import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgeCheck, MapPin, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import EnglishLayout from './EnglishLayout';

function ProfileContent({ provider, locale }) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn : provider.nameAr;
  const description = isEn ? provider.descriptionEn : provider.descriptionAr;
  const base = isEn ? '/en' : '';
  const locations = (provider.locations || []).map((item) => isEn ? item.areaEn || item.cityEn : item.areaAr || item.cityAr).filter(Boolean);
  const whatsapp = String(provider.whatsapp || '').replace(/\D/g, '');
  return (
    <main dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen bg-[#FDFBF7] text-[#0F3F1A]">
      <section className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <Link href={`${base}/providers`} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCCBAE] bg-white px-4 py-2 text-sm font-black">{isEn ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}{isEn ? 'Back to providers' : 'العودة إلى مزودي الخدمات'}</Link>
        <div className="overflow-hidden rounded-[2.5rem] border border-[#DCCBAE] bg-white shadow-[0_24px_70px_rgba(15,63,26,.12)]">
          <div className="relative h-[300px] md:h-[430px]"><Image src={provider.cover} alt={name} fill priority className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#071A10]/80 via-transparent to-transparent" /></div>
          <div className="relative px-5 pb-8 pt-16 md:px-10">
            <div className={`absolute -top-16 ${isEn ? 'left-6 md:left-10' : 'right-6 md:right-10'} h-32 w-32 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-xl`}><Image src={provider.logo} alt={isEn ? `${name} logo` : `شعار ${name}`} fill className="object-contain p-2" /></div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><div className="flex items-center gap-2"><h1 className="text-3xl font-black md:text-5xl">{name}</h1>{provider.verified ? <BadgeCheck className="h-7 w-7 text-[#B8860B]" /> : null}</div><p className="mt-3 font-mono text-xs font-black" dir="ltr">{provider.providerId}</p></div>
              {whatsapp ? <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 font-black text-white"><MessageCircle className="h-5 w-5" />{isEn ? 'Contact provider' : 'تواصل مع المزود'}</a> : null}
            </div>
            <p className="mt-7 max-w-4xl text-base font-semibold leading-9 text-gray-600">{description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{locations.map((location) => <span key={location} className="inline-flex items-center gap-1.5 rounded-full bg-[#F8F4EB] px-4 py-2 text-sm font-black"><MapPin className="h-4 w-4 text-[#9A6B16]" />{location}</span>)}</div>
          </div>
        </div>
      </section>
      <section id="services" className="mx-auto max-w-6xl px-4 pb-16"><h2 className="mb-7 text-3xl font-black">{isEn ? 'Published services' : 'الخدمات المنشورة'}</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{(provider.directoryServices || []).map((service) => <article key={service.cardId} className="overflow-hidden rounded-[1.5rem] border border-[#E5D9C4] bg-white shadow-sm"><div className="relative h-40"><Image src={service.image} alt={isEn ? service.titleEn : service.titleAr} fill className="object-cover" /></div><div className="p-4"><h3 className="font-black leading-7">{isEn ? service.titleEn : service.titleAr}</h3><p className="mt-3 font-mono text-[11px] font-black" dir="ltr">{service.cardId}</p><p className="mt-1 font-mono text-[10px] text-gray-500" dir="ltr">{provider.providerId}</p></div></article>)}</div></section>
    </main>
  );
}

export default function GenericProviderProfile({ provider, locale = 'ar' }) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn : provider.nameAr;
  const description = isEn ? provider.descriptionEn : provider.descriptionAr;
  const canonical = `https://bietalreef.ae${isEn ? '/en' : ''}/providers/${provider.slug}`;
  const body = <ProfileContent provider={provider} locale={locale} />;
  return <><Head><title>{name} | {isEn ? 'Biet Al Reef' : 'بيت الريف'}</title><meta name="description" content={description} /><link rel="canonical" href={canonical} /><meta property="og:title" content={name} /><meta property="og:description" content={description} /><meta property="og:image" content={`https://bietalreef.ae${provider.cover}`} /><meta property="og:type" content="business.business" /><meta name="twitter:card" content="summary_large_image" /></Head>{isEn ? <EnglishLayout>{body}</EnglishLayout> : <><Navbar />{body}<Footer /></>}</>;
}
