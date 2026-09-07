import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgeCheck, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import EnglishLayout from './EnglishLayout';
import {
  buildCardWhatsappUrl,
  buildProviderWhatsappUrl,
} from '../lib/providerWhatsapp';

function uniqueImages(card) {
  const values = [card?.image, ...(Array.isArray(card?.gallery) ? card.gallery : [])];
  return Array.from(new Set(values.map((value) => typeof value === 'string' ? value.trim() : '').filter(Boolean)));
}

function CardSlider({ card, title, priority = false }) {
  const images = useMemo(() => uniqueImages(card), [card]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => setIndex(0), [card?.cardId]);
  useEffect(() => {
    if (paused || images.length < 2 || typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % images.length), 6000);
    return () => window.clearInterval(timer);
  }, [images.length, paused]);
  const active = images[index] || card?.image;
  return (
    <div
      className="group relative h-52 overflow-hidden bg-[#F4F1EB]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {active ? <Image src={active} alt={`${title} — ${index + 1}`} fill priority={priority && index === 0} className="object-cover transition-opacity duration-700" /> : null}
      {images.length > 1 ? (
        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5" aria-label="Image gallery">
          {images.map((_, imageIndex) => (
            <button
              key={`${card.cardId}-${imageIndex}`}
              type="button"
              onClick={() => setIndex(imageIndex)}
              className="grid h-9 w-9 place-items-center rounded-full bg-black/5"
              aria-label={`Image ${imageIndex + 1}`}
            >
              <span className={`h-1.5 rounded-full bg-white shadow-sm transition-all ${imageIndex === index ? 'w-6' : 'w-2 opacity-70'}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProviderCard({ provider, card, locale, type, priority = false }) {
  const isEn = locale === 'en';
  const providerName = isEn ? provider.nameEn : provider.nameAr;
  const title = isEn ? card.titleEn : card.titleAr;
  const description = isEn ? card.descriptionEn : card.descriptionAr;
  const location = (provider.locations || []).map((item) => isEn ? item.areaEn || item.cityEn : item.areaAr || item.cityAr).filter(Boolean).join(' · ');
  const profilePath = `${isEn ? '/en' : ''}/providers/${provider.slug}`;
  const whatsapp = buildCardWhatsappUrl({
    phone: provider.whatsapp,
    locale,
    cardType: type,
    providerName,
    providerCode: provider.providerId,
    cardCode: card.cardId,
    cardId: card.entityId || card.cardId,
    title,
    description,
    category: card.categorySlug,
    location,
    pagePath: `${profilePath}#${encodeURIComponent(card.cardId)}`,
  });
  return (
    <article id={card.cardId} className="overflow-hidden rounded-[1.6rem] border border-[#E5D9C4] bg-white shadow-[0_18px_50px_-38px_rgba(15,63,26,.5)]">
      <CardSlider card={card} title={title} priority={priority} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F8F4EB] px-2.5 py-1 text-[11px] font-black text-[#8B681B]">
              {type === 'offer' ? <Tag className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
              {isEn ? (type === 'offer' ? 'Offer' : 'Service') : (type === 'offer' ? 'عرض' : 'خدمة')}
            </span>
            <h3 className="mt-3 text-lg font-black leading-8 text-[#0F3F1A]">{title}</h3>
          </div>
        </div>
        {description ? <p className="mt-3 line-clamp-4 text-sm font-semibold leading-7 text-gray-600">{description}</p> : null}
        <div className="mt-4 rounded-xl bg-[#FAF8F3] px-3 py-2 font-mono text-[10px] font-black text-[#6D675E]" dir="ltr">{card.cardId}</div>
        <p className="mt-3 text-xs font-bold leading-6 text-[#6C6A65]">
          {isEn
            ? 'Price is confirmed directly with the provider after reviewing the requested scope. No intermediary commission on service execution.'
            : 'يتم تحديد السعر مباشرة مع مزود الخدمة بعد مراجعة نطاق العمل، دون وسيط أو عمولة على تنفيذ الخدمة.'}
        </p>
        {whatsapp ? (
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0F3F1A] px-4 text-sm font-black text-white transition hover:bg-[#174E2A]">
            <MessageCircle className="h-4 w-4" />
            {isEn ? 'Request a quote via WhatsApp' : 'اطلب عرض سعر عبر واتساب'}
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ProfileContent({ provider, locale }) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn : provider.nameAr;
  const description = isEn ? provider.descriptionEn : provider.descriptionAr;
  const base = isEn ? '/en' : '';
  const locations = (provider.locations || []).map((item) => isEn ? item.areaEn || item.cityEn : item.areaAr || item.cityAr).filter(Boolean);
  const profilePath = `${base}/providers/${provider.slug}`;
  const locationText = locations.join(' · ');
  const whatsapp = buildProviderWhatsappUrl({
    phone: provider.whatsapp,
    locale,
    providerName: name,
    providerCode: provider.providerId,
    location: locationText,
    summary: description,
    profilePath,
  });
  const marketUrl = `https://app.bietalreef.ae${base}/Marketplace/${provider.slug}`;
  return (
    <main dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen bg-[#FDFBF7] text-[#0F3F1A]">
      <section className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <Link href={`${base}/providers`} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCCBAE] bg-white px-4 py-2 text-sm font-black">{isEn ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}{isEn ? 'Back to providers' : 'العودة إلى مزودي الخدمات'}</Link>
        <div className="overflow-hidden rounded-[2.5rem] border border-[#DCCBAE] bg-white shadow-[0_24px_70px_rgba(15,63,26,.12)]">
          <div className="relative h-[300px] md:h-[430px]"><Image src={provider.cover} alt={name} fill priority className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#071A10]/75 via-transparent to-transparent" /></div>
          <div className="relative px-5 pb-8 pt-16 md:px-10">
            <div className={`absolute -top-16 ${isEn ? 'left-6 md:left-10' : 'right-6 md:right-10'} h-32 w-32 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-xl`}><Image src={provider.avatar || provider.logo} alt={isEn ? `${name} profile` : `صورة ملف ${name}`} fill className="object-cover" /></div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2"><h1 className="text-3xl font-black md:text-5xl">{name}</h1>{provider.verified ? <BadgeCheck className="h-7 w-7 text-[#B8860B]" /> : null}</div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#D8C997] bg-[#FFF9E8] px-3 py-1 font-mono text-xs font-black" dir="ltr">PRD-{provider.providerId}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF8F2] px-3 py-1 text-xs font-black text-[#167A4A]"><ShieldCheck className="h-4 w-4" />{isEn ? 'Verified provider' : 'مزود موثق'}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {whatsapp ? <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 font-black text-white"><MessageCircle className="h-5 w-5" />{isEn ? 'Contact provider' : 'تواصل مع المزود'}</a> : null}
                {provider.phone ? <a href={`tel:${provider.phone}`} className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-[#DCCBAE] bg-white px-5 font-black"><Phone className="h-5 w-5" />{isEn ? 'Call' : 'اتصال'}</a> : null}
              </div>
            </div>
            <p className="mt-7 max-w-4xl text-base font-semibold leading-9 text-gray-600">{description}</p>
            <p className="mt-4 max-w-4xl rounded-2xl bg-[#F8F4EB] px-4 py-3 text-sm font-black leading-7 text-[#5E542F]">{isEn ? 'Direct communication with the provider for scope and pricing — no intermediary commission on service execution.' : 'تواصل مباشر مع مزود الخدمة لتحديد النطاق والسعر — بدون وسيط وبدون عمولة على تنفيذ الخدمة.'}</p>
            <div className="mt-6 flex flex-wrap gap-2">{locations.map((location) => <span key={location} className="inline-flex items-center gap-1.5 rounded-full bg-[#F8F4EB] px-4 py-2 text-sm font-black"><MapPin className="h-4 w-4 text-[#9A6B16]" />{location}</span>)}</div>
            <a href={marketUrl} className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-[#D4AF37]/40 bg-[#FFF9E8] px-5 font-black text-[#765A17]">{isEn ? 'Open Biet Al Reef store' : 'فتح متجر سوق بيت الريف'}{isEn ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}</a>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="font-black text-[#A77612]">{isEn ? 'Services' : 'الخدمات'}</p><h2 className="mt-1 text-3xl font-black">{isEn ? 'Published services' : 'الخدمات المنشورة'}</h2></div><span className="rounded-full bg-[#F8F4EB] px-3 py-1 text-xs font-black">{provider.directoryServices?.length || 0}</span></div>
        <div className="grid gap-5 sm:grid-cols-2">{(provider.directoryServices || []).map((service, index) => <ProviderCard key={service.cardId} provider={provider} card={service} locale={locale} type="service" priority={index === 0} />)}</div>
      </section>

      {(provider.directoryOffers || []).length ? (
        <section id="offers" className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="font-black text-[#A77612]">{isEn ? 'Offers' : 'العروض'}</p><h2 className="mt-1 text-3xl font-black">{isEn ? 'Current quote-based offers' : 'العروض الحالية بطلب عرض سعر'}</h2></div><span className="rounded-full bg-[#F8F4EB] px-3 py-1 text-xs font-black">{provider.directoryOffers.length}</span></div>
          <div className="grid gap-5 sm:grid-cols-2">{provider.directoryOffers.map((offer) => <ProviderCard key={offer.cardId} provider={provider} card={offer} locale={locale} type="offer" />)}</div>
        </section>
      ) : null}
    </main>
  );
}

function schemaFor(provider, locale, canonical) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn : provider.nameAr;
  const description = isEn ? provider.descriptionEn : provider.descriptionAr;
  const locationNames = (provider.locations || []).map((item) => isEn ? item.cityEn || item.areaEn : item.cityAr || item.areaAr).filter(Boolean);
  const businessId = `${canonical}#business`;
  const graph = [
    {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name,
      alternateName: isEn ? provider.nameAr : provider.nameEn,
      identifier: provider.providerId,
      description,
      url: canonical,
      image: provider.cover,
      logo: provider.logo,
      telephone: provider.phone || provider.whatsapp,
      areaServed: locationNames.length ? locationNames.map((value) => ({ '@type': 'AdministrativeArea', name: value })) : [{ '@type': 'Country', name: 'United Arab Emirates' }],
      sameAs: provider.whatsapp ? [`https://wa.me/${String(provider.whatsapp).replace(/\D/g, '')}`] : [],
    },
    ...(provider.directoryServices || []).map((service) => ({
      '@type': 'Service',
      '@id': `${canonical}#${encodeURIComponent(service.cardId)}`,
      name: isEn ? service.titleEn : service.titleAr,
      description: isEn ? service.descriptionEn : service.descriptionAr,
      image: uniqueImages(service),
      provider: { '@id': businessId },
      areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
    })),
    ...(provider.directoryOffers || []).map((offer) => ({
      '@type': 'Offer',
      '@id': `${canonical}#${encodeURIComponent(offer.cardId)}`,
      name: isEn ? offer.titleEn : offer.titleAr,
      description: isEn ? offer.descriptionEn : offer.descriptionAr,
      image: uniqueImages(offer),
      seller: { '@id': businessId },
      availability: 'https://schema.org/InStock',
      url: `${canonical}#${encodeURIComponent(offer.cardId)}`,
    })),
  ];
  return { '@context': 'https://schema.org', '@graph': graph };
}

export default function GenericProviderProfile({ provider, locale = 'ar' }) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn : provider.nameAr;
  const description = isEn ? provider.descriptionEn : provider.descriptionAr;
  const canonical = `https://bietalreef.ae${isEn ? '/en' : ''}/providers/${provider.slug}`;
  const body = <ProfileContent provider={provider} locale={locale} />;
  const alternate = `https://bietalreef.ae${isEn ? '' : '/en'}/providers/${provider.slug}`;
  const image = /^https?:\/\//i.test(provider.cover || '') ? provider.cover : `https://bietalreef.ae${provider.cover || '/images/providers-hero.webp'}`;
  const title = `${name} | ${isEn ? 'Biet Al Reef' : 'بيت الريف'}`;
  const schema = schemaFor(provider, locale, canonical);
  return <><Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hrefLang={isEn ? 'en-AE' : 'ar-AE'} href={canonical} />
    <link rel="alternate" hrefLang={isEn ? 'ar-AE' : 'en-AE'} href={alternate} />
    <link rel="alternate" hrefLang="x-default" href={`https://bietalreef.ae/providers/${provider.slug}`} />
    <meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={canonical} /><meta property="og:image" content={image} /><meta property="og:image:alt" content={name} /><meta property="og:type" content="business.business" /><meta property="og:locale" content={isEn ? 'en_AE' : 'ar_AE'} /><meta property="og:site_name" content={isEn ? 'Biet Al Reef' : 'بيت الريف'} />
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={image} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </Head>{isEn ? <EnglishLayout>{body}</EnglishLayout> : <><Navbar />{body}<Footer /></>}</>;
}
