import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../../components/EnglishLayout';
import { getPublicProviderProfile } from '../../../lib/publicProviderProfiles';
import { ShieldCheck, MapPin, Clock, Phone, MessageCircle, Gem, ChevronDown, ExternalLink, Users, Hammer, Layers, ArrowRight, Factory, Navigation, BadgeCheck } from 'lucide-react';
import GenericProviderProfile from '../../../components/GenericProviderProfile';

const serviceLabels = {
  'رخام طبيعي': 'Natural Marble',
  'جرانيت': 'Granite',
  'كوارتز': 'Quartz',
  'حجر صناعي': 'Engineered Stone',
  'تصنيع حسب الطلب': 'Custom Fabrication',
  'توريد': 'Supply',
  'تركيب': 'Installation',
  'مطابخ': 'Kitchens',
  'مغاسل': 'Washbasins',
  'واجهات': 'Façades',
  'أرضيات': 'Floors',
  'سلالم': 'Stairs',
};

export default function EnglishProviderProfilePage({ provider }) {
  if (!provider) {
    return (
      <>
        <Head><title>Provider Not Found | Biet Al Reef</title></Head>
        <EnglishLayout>
          <div className="min-h-[50vh] flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-black text-[#0F3F1A] mb-4">Provider Not Found</h1><Link href="/en/providers" className="text-[#B8922B] font-black hover:underline">Back to providers</Link></div></div>
        </EnglishLayout>
      </>
    );
  }

  return <GenericProviderProfile provider={provider} locale="en" />;

  const description = provider.descriptionEn || provider.nameEn;
  const canonical = `https://bietalreef.ae/en/providers/${provider.slug}`;
  const whatsappDigits = String(provider.whatsapp || '').replace(/\D/g, '');

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${canonical}#business`,
    name: provider.nameEn,
    identifier: provider.providerId,
    alternateName: provider.nameAr,
    description,
    url: canonical,
    telephone: provider.phone,
    image: provider.cover ? `https://bietalreef.ae${provider.cover}` : 'https://bietalreef.ae/logo.png',
    address: { '@type': 'PostalAddress', streetAddress: 'Mazid Company Camp, Al Ain', addressLocality: 'Al Ain', addressRegion: 'Abu Dhabi', addressCountry: 'AE' },
    areaServed: [{ '@type': 'City', name: 'Al Ain' }, { '@type': 'City', name: 'Abu Dhabi' }],
    contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Service', telephone: provider.phone, availableLanguage: ['ar', 'en'] },
    sameAs: whatsappDigits ? [`https://wa.me/${whatsappDigits}`] : [],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (provider.faq || []).map((item) => ({ '@type': 'Question', name: item.questionEn, acceptedAnswer: { '@type': 'Answer', text: item.answerEn } })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bietalreef.ae/en' },
      { '@type': 'ListItem', position: 2, name: 'Service Providers', item: 'https://bietalreef.ae/en/providers' },
      { '@type': 'ListItem', position: 3, name: provider.nameEn, item: canonical },
    ],
  };

  const allSchemas = JSON.stringify([localBusinessSchema, faqSchema, breadcrumbSchema]);

  return (
    <>
      <Head>
        <title>{provider.nameEn} | Marble & Granite Factory in Al Ain | Biet Al Reef</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${provider.nameEn}, marble Al Ain, granite Abu Dhabi, quartz UAE, marble factory, marble installation, granite facade, marble flooring`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={`https://bietalreef.ae/providers/${provider.slug}`} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
        <meta property="og:title" content={`${provider.nameEn} | Marble & Granite Factory`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={provider.cover ? `https://bietalreef.ae${provider.cover}` : 'https://bietalreef.ae/logo.png'} />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:site_name" content="Biet Al Reef" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: allSchemas }} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <section className="bg-gradient-to-b from-[#151713] via-[#22251f] to-[#FDFBF7] px-4 pt-3 pb-8 md:pt-5 md:pb-12">
            <div className="mx-auto max-w-6xl">
              <Link href="/en/providers" className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8922B]/30 bg-white px-4 py-2 text-sm font-black text-[#0F3F1A] shadow-sm transition hover:bg-[#FFF8E5]">
                <ArrowRight className="h-4 w-4" />
                Back to service providers
              </Link>

              <div className="group relative min-h-[720px] overflow-hidden rounded-[2.5rem] border border-[#E8C968]/35 bg-[#071A24] shadow-[0_35px_100px_-35px_rgba(4,23,34,.9)]">
                {provider.cover && <Image src={provider.cover} alt={provider.nameEn} fill className="object-cover object-center" priority />}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020D14]/95 via-[#061B28]/76 to-[#071A24]/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020B11]/95 via-transparent to-black/20" />
                <div className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-[#D4AF37]/15 blur-3xl motion-safe:animate-pulse" />
                <div className="relative flex min-h-[720px] items-end p-4 md:p-8 lg:p-10">
                  <div className="relative w-full overflow-hidden rounded-[1rem_2.5rem_1rem_2.5rem] border border-[#E8C968]/45 bg-[#061B28]/88 p-5 shadow-[0_30px_80px_-24px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-xl md:p-8">
                    <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[38px] border-[#D4AF37]/10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F4D76B] to-transparent" />
                    <div className="relative grid items-center gap-6 lg:grid-cols-[220px_1fr]">
                      <div className="relative mx-auto lg:mx-0">
                        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[5px] border-[#D4AF37] bg-white p-0 shadow-[0_0_0_5px_rgba(255,255,255,.9),0_0_0_8px_rgba(212,175,55,.35),0_24px_50px_rgba(15,63,26,.25)] md:h-48 md:w-48">
                          <Image src={provider.logo} alt={`${provider.nameEn} logo`} width={220} height={220} className="h-full w-full scale-[1.22] rounded-full object-contain" />
                          {provider.verified && <span className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#F4D76B] to-[#B8860B] text-[#0B3D23] shadow-[0_8px_20px_rgba(184,134,11,.4)]" aria-label="Verified provider"><BadgeCheck className="h-7 w-7" /></span>}
                        </div>
                      </div>
                      <div className="min-w-0 text-center lg:text-left">
                        <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                          <p className="text-xs font-black uppercase tracking-[.18em] text-[#E4C75D]">Verified marble & granite factory</p>
                          <span className="rounded-full border border-[#E8C968]/35 bg-white/10 px-3 py-1 text-[11px] font-black text-white">{provider.providerId}</span>
                        </div>
                        <h1 className="mt-2 font-serif text-3xl font-black leading-tight text-white md:text-5xl">{provider.nameEn || provider.nameAr}</h1>
                        <p className="mt-2 font-black text-[#F4D76B]">Supply · Custom fabrication · Installation</p>
                        <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                          {whatsappDigits && <ContactChannel href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Hello, I would like to inquire about White Whale Factory services via Biet Al Reef')}`} icon={<MessageCircle />} label="WhatsApp" external />}
                          <ContactChannel href={`tel:${provider.phone}`} icon={<Phone />} label="Call" />
                          {provider.googleMapsUrl && <ContactChannel href={provider.googleMapsUrl} icon={<Navigation />} label="Location" external />}
                          <ContactChannel href="/en/contact" icon={<ExternalLink />} label="Quotation" />
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                          <IdentityBadge icon={<Gem />} label="Professional presence" />
                          <IdentityBadge icon={<ShieldCheck />} label="Verified data" />
                          <IdentityBadge icon={<Factory />} label={provider.providerTypeEn || 'Marble & Granite Factory'} />
                        </div>
                        <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-white/75 md:text-base md:leading-8">{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#D4AF37]/20 bg-[#111812] text-white"><div className="mx-auto max-w-6xl px-4 py-10"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><BusinessInfo icon={<Factory />} label="Primary activity" value="Marble & granite fabrication and supply" /><BusinessInfo icon={<MapPin />} label="Location" value="Mazid, Al Ain – Abu Dhabi" /><BusinessInfo icon={<Navigation />} label="Service coverage" value="Al Ain, Abu Dhabi and by project" /><BusinessInfo icon={<Clock />} label="Working hours" value={provider.workingHoursEn} /></div></div></section>

          {provider.aboutEn && <section className="mx-auto max-w-6xl px-4 py-16"><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="font-black text-[#B8922B]">About the Factory</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A] leading-tight">Specialized provider for marble, granite and quartz</h2><p className="mt-6 leading-9 text-gray-600">{provider.aboutEn}</p><div className="mt-8 grid grid-cols-3 gap-4"><FeatureCard icon={<Hammer className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="Custom Fabrication" /><FeatureCard icon={<Layers className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="Material Options" /><FeatureCard icon={<Users className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="Direct Contact" /></div></div><div className="relative overflow-hidden rounded-[2rem]"><Image src="/images/providers/al-hoot/about-factory.jpg" alt="White Whale Marble & Granite Factory" width={1344} height={768} className="w-full h-auto rounded-[2rem] object-cover" /></div></div></section>}

          <section className="mx-auto max-w-6xl px-4 pb-16"><div className="relative overflow-hidden rounded-[1rem_2.5rem_1rem_2.5rem] border border-[#D4AF37]/35 bg-[#071A24] p-7 shadow-[0_28px_70px_-34px_rgba(4,23,34,.8)] md:p-10"><Image src="/images/providers/al-hoot/gallery-6.jpg" alt="Marble fabrication at White Whale Factory" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#03131D]/95 via-[#061B28]/88 to-[#061B28]/65" /><div className="relative"><p className="font-black text-[#F4D76B]">Services & Products</p><h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight text-white">Real work paths from supply to installation</h2><p className="mt-3 max-w-3xl leading-8 text-white/70">Factory services are organized around project needs and selected materials, from stone selection through fabrication and on-site installation.</p><div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">{(provider.services || []).map((service, index) => <div key={service} className="group flex min-h-[88px] items-center gap-3 rounded-2xl border border-white/15 bg-black/30 p-3 text-sm font-black text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/15"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F5D96F] to-[#A97D12] text-xs text-[#102D20] shadow-lg">{String(index + 1).padStart(2, '0')}</span><span className="leading-6">{serviceLabels[service] || service}</span></div>)}</div></div></div></section>

          {provider.materials?.length > 0 && <section className="bg-white border-y border-[#E6DCC8]"><div className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#B8922B]">Available Materials</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A]">Stone and finishing material options</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{provider.materials.map((mat, idx) => <div key={idx} className="rounded-2xl border border-[#E6DCC8] p-6 hover:shadow-md transition"><h3 className="text-lg font-black text-[#0F3F1A]">{mat.nameEn}</h3><p className="mt-2 text-sm leading-7 text-gray-600">{mat.descEn}</p></div>)}</div></div></section>}

          {provider.gallery?.length > 0 && <section className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#B8922B]">Gallery</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A]">Visual samples for materials and works</h2><p className="mt-3 max-w-3xl text-gray-600 leading-8">Images that help customers understand marble, granite and quartz work types available through Biet Al Reef.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{provider.gallery.map((img, idx) => <div key={idx} className="group relative overflow-hidden rounded-2xl border border-[#E6DCC8] bg-white shadow-sm"><div className="aspect-square relative"><Image src={img.src} alt={img.altEn} fill className="object-cover transition group-hover:scale-105 duration-500" /></div><div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4"><p className="text-sm font-black text-white">{img.altEn}</p></div></div>)}</div></section>}

          {provider.googleMapsUrl && <section className="mx-auto max-w-6xl px-4 pb-16"><div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 shadow-sm"><div className="flex items-start justify-between flex-wrap gap-4 mb-6"><div><p className="font-black text-[#B8922B]">Factory Location</p><h2 className="mt-2 text-2xl font-black text-[#0F3F1A]">Visit or contact the factory</h2><p className="mt-2 text-gray-600 leading-8">Mazid Company Camp, Al Ain, Abu Dhabi, United Arab Emirates</p><p className="mt-1 text-sm text-gray-500">{provider.workingHoursEn}</p></div><a href={provider.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/40 px-6 py-3 text-sm font-black text-[#B8922B] hover:bg-[#D4AF37]/10 transition"><ExternalLink className="h-4 w-4" /> Open in Google Maps</a></div></div></section>}

          {provider.faq?.length > 0 && <section className="mx-auto max-w-4xl px-4 pb-16"><p className="text-center font-black text-[#B8922B]">Frequently Asked Questions</p><h2 className="mt-2 mb-8 text-center text-3xl font-black text-[#0F3F1A]">Direct answers to common questions</h2><div className="space-y-4">{provider.faq.map((item, idx) => <details key={idx} className="group rounded-2xl border border-[#E6DCC8] bg-white shadow-sm"><summary className="cursor-pointer list-none p-6 font-black text-[#0F3F1A] flex items-center justify-between gap-4">{item.questionEn}<ChevronDown className="h-5 w-5 shrink-0 text-[#B8922B] transition group-open:rotate-180" /></summary><div className="px-6 pb-6 leading-8 text-gray-600">{item.answerEn}</div></details>)}</div></section>}

          <section className="mx-auto max-w-6xl px-4 pb-20"><div className="rounded-[2rem] bg-gradient-to-br from-[#FFF8EA] via-[#EFE3CC] to-[#CDBB98] border border-[#B8922B]/25 p-8 text-[#0F3F1A] md:p-12"><h2 className="text-3xl font-black">Need marble, granite or quartz for your project?</h2><p className="mt-4 max-w-2xl text-[#304333] leading-8">Send your project details, measurements and available photos to get directed to the right quotation path.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row">{whatsappDigits && <a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Hello, I would like to inquire about White Whale Factory services via Biet Al Reef')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#12110B] transition hover:bg-[#b8922b]">Contact via WhatsApp</a>}<Link href="/en/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#B8922B]/35 bg-white/50 px-8 py-4 font-black text-[#0F3F1A] transition hover:bg-white">Request Official Quotation</Link></div></div></section>
        </main>
      </EnglishLayout>
    </>
  );
}

function TrustItem({ title, sub }) { return <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm"><div className="text-2xl font-black text-[#8A6A00]">{title}</div><div className="mt-1 text-xs font-bold text-[#304333]">{sub}</div></div>; }
function ContactChannel({ href, icon, label, external = false }) { return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group inline-flex items-center gap-2 rounded-full border border-[#D9C791] bg-white px-3 py-2 text-xs font-black text-[#0F3F1A] shadow-[0_7px_16px_-8px_rgba(15,63,26,.55)] transition duration-300 hover:-translate-y-1 hover:border-[#B8922B] hover:shadow-lg"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF8D8] to-[#D4AF37] text-[#0B3D23] [&>svg]:h-4 [&>svg]:w-4">{icon}</span>{label}</a>; }
function IdentityBadge({ icon, label }) { return <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-black text-white/85 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-[#F4D76B]">{icon}{label}</span>; }
function BusinessInfo({ icon, label, value }) { return <div className="group rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-white/[.09] to-white/[.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5D96F] to-[#A97D12] text-[#102D20] shadow-[0_10px_25px_-10px_rgba(212,175,55,.7)] [&>svg]:h-5 [&>svg]:w-5">{icon}</div><p className="text-xs font-black text-[#E4C75D]">{label}</p><p className="mt-2 text-sm font-bold leading-7 text-white/85">{value}</p></div>; }
function InfoItem({ icon, label, value, highlight = false }) { return <div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDFBF7] border border-[#E6DCC8]">{icon}</div><div><p className="text-xs text-gray-500">{label}</p><p className={`text-sm font-black ${highlight ? 'text-emerald-700' : 'text-[#0F3F1A]'}`}>{value}</p></div></div>; }
function FeatureCard({ icon, label }) { return <div className="rounded-2xl border border-[#E6DCC8] bg-white p-4 text-center shadow-sm">{icon}<p className="mt-2 text-sm font-black text-[#0F3F1A]">{label}</p></div>; }

export async function getServerSideProps({ params, res }) {
  const provider = await getPublicProviderProfile(params.slug);
  if (!provider) return { notFound: true };
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120');
  return { props: { provider } };
}
