import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import { alrehabTemplate as provider } from '../../../data/providerTemplates/alrehab';
import { BadgeCheck, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';

const canonical = 'https://bietalreef.ae/en/providers/alrehab-cleaning-sanitizing';
const faqs = [
  ['Which areas does Al Rehab serve?', 'Al Rehab serves all areas of Al Ain, Abu Dhabi and Dubai. Appointment availability depends on the location and scope of work.'],
  ['Are the cleaning and sanitizing products safe?', 'Products are selected according to the fabric and its condition, with usage and safety instructions considered before cleaning begins.'],
  ['How can I receive an accurate quotation?', 'Send clear photos, quantities, measurements and the service location by WhatsApp. The team will review the condition before confirming the price and appointment.'],
  ['Can every stain be removed?', 'Results depend on the stain type, age and fabric. The item is assessed first and the expected result is explained without unrealistic guarantees.'],
];

export default function AlRehabEnglishPage() {
  const whatsapp = provider.contact.whatsapp.replace(/\D/g, '');
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'CleaningService', '@id': `${canonical}#business`, name: provider.identity.name.en, alternateName: provider.identity.name.ar, url: canonical, description: provider.description.en, telephone: provider.contact.phone, logo: `https://bietalreef.ae${provider.media.logo}`, image: `https://bietalreef.ae${provider.media.cover}`, areaServed: provider.coverage.map((area) => ({ '@type': 'AdministrativeArea', name: area.en })), serviceType: provider.services.map((service) => service.title.en), availableLanguage: ['English', 'Arabic'] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bietalreef.ae/en' }, { '@type': 'ListItem', position: 2, name: 'Cleaning Providers', item: 'https://bietalreef.ae/en/providers' }, { '@type': 'ListItem', position: 3, name: provider.identity.name.en, item: canonical }] },
  ];
  return (
    <>
      <Head>
        <title>Al Rehab Cleaning in Al Ain, Abu Dhabi & Dubai | Biet Al Reef</title>
        <meta name="description" content="Steam cleaning and sanitizing for sofas, carpets, Arabic majlis seating and mattresses across Al Ain, Abu Dhabi and Dubai." />
        <meta name="keywords" content="Al Rehab cleaning, sofa cleaning Al Ain, carpet cleaning Abu Dhabi, majlis cleaning Dubai, mattress sanitizing UAE" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/providers/alrehab-cleaning-sanitizing" />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
        <meta property="og:title" content="Al Rehab Cleaning & Sanitizing" />
        <meta property="og:description" content={provider.description.en} />
        <meta property="og:image" content={`https://bietalreef.ae${provider.media.cover}`} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      </Head>
      <EnglishLayout>
        <main dir="ltr" className="min-h-screen bg-[#F7FAFC] text-[#082E63]">
          <section className="relative overflow-hidden bg-[linear-gradient(135deg,#031F4A_0%,#064B91_55%,#58B51B_160%)] px-4 pb-16 pt-6">
            <div className="mx-auto max-w-6xl">
              <Link href="/en/providers" className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-black text-white">Back to cleaning providers</Link>
              <div className="overflow-hidden rounded-[2.5rem] border border-white/20 bg-white shadow-2xl">
                <div className="relative h-[360px] md:h-[500px]"><Image src={provider.media.cover} alt="Al Rehab team deep-cleaning a sofa" fill priority className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#041D42]/90 via-transparent to-transparent" /></div>
                <div className="relative -mt-24 px-5 pb-8 md:px-10">
                  <div className="rounded-[2.2rem] border border-white/70 bg-white/95 p-6 shadow-2xl backdrop-blur md:p-8">
                    <div className="flex flex-col items-center gap-5 text-center">
                      <div className="relative h-36 w-36 rounded-full border-[5px] border-[#58B51B] bg-white shadow-xl md:h-44 md:w-44"><Image src={provider.media.logo} alt="Al Rehab logo" fill className="rounded-full object-contain" /><span className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#0B5EAE] text-white"><BadgeCheck /></span></div>
                      <div><p className="text-sm font-black uppercase tracking-[.16em] text-[#58A51D]">Verified cleaning provider</p><h1 className="mt-2 text-3xl font-black md:text-5xl">{provider.identity.name.en}</h1><p className="mt-3 text-lg font-black text-[#4B9E19]">{provider.identity.tagline.en}</p><p className="mx-auto mt-5 max-w-4xl leading-8 text-slate-600">{provider.description.en}</p></div>
                      <div className="flex flex-wrap justify-center gap-3"><a href={`https://wa.me/${whatsapp}`} className="inline-flex items-center gap-2 rounded-2xl bg-[#4EAA18] px-6 py-3 font-black text-white"><MessageCircle className="h-5 w-5" /> WhatsApp</a><a href={`tel:${provider.contact.phone}`} className="inline-flex items-center gap-2 rounded-2xl bg-[#07539B] px-6 py-3 font-black text-white"><Phone className="h-5 w-5" /> Call</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#52A91B]">Professional cleaning paths</p><h2 className="mt-2 text-3xl font-black">Four clearly defined services</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{provider.services.map((service) => <article id={service.id} key={service.id} className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"><div className="relative h-48"><Image src={service.image} alt={service.title.en} fill className="object-cover" /></div><div className="p-5"><span className="text-xs font-black text-[#0B5EAE]">{service.id}</span><h3 className="mt-2 text-xl font-black">{service.title.en}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{service.summary.en}</p></div></article>)}</div></section>

          <section className="bg-[#EAF5FF]"><div className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#52A91B]">Service packages</p><h2 className="mt-2 text-3xl font-black">Four quotation-based offers</h2><p className="mt-3 text-slate-600">Final pricing is confirmed after reviewing photos, quantity, dimensions and location.</p><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{provider.offers.map((offer) => <article id={offer.id} key={offer.id} className="overflow-hidden rounded-3xl bg-white shadow-sm"><div className="relative h-40"><Image src={offer.image} alt={offer.title.en} fill className="object-cover" /></div><div className="p-5"><span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">{offer.badge.en}</span><p className="mt-3 text-xs font-black text-[#0B5EAE]">{offer.id}</p><h3 className="mt-2 text-lg font-black">{offer.title.en}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{offer.summary.en}</p><p className="mt-3 font-black text-[#52A91B]">Price after assessment</p></div></article>)}</div></div></section>

          <section className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#52A91B]">Coverage</p><h2 className="mt-2 text-3xl font-black">Service across three UAE areas</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{provider.coverage.map((area) => <div key={area.slug} className="flex items-center gap-3 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"><MapPin className="text-[#52A91B]" /><span className="font-black">{area.en}</span></div>)}</div></section>

          <section className="mx-auto max-w-4xl px-4 pb-16"><p className="text-center font-black text-[#52A91B]">Frequently asked questions</p><h2 className="mt-2 text-center text-3xl font-black">Helpful answers before booking</h2><div className="mt-8 space-y-4">{faqs.map(([q, a]) => <details key={q} className="rounded-2xl border border-blue-100 bg-white p-6"><summary className="cursor-pointer font-black">{q}</summary><p className="mt-4 leading-8 text-slate-600">{a}</p></details>)}</div></section>

          <section className="bg-[#082E63] px-4 py-16 text-center text-white"><ShieldCheck className="mx-auto h-10 w-10 text-[#7ACD36]" /><h2 className="mt-4 text-3xl font-black">Request an assessment for your cleaning needs</h2><p className="mx-auto mt-4 max-w-2xl text-white/75">Send photos, quantity, dimensions and location for a clear quotation path.</p><a href={`https://wa.me/${whatsapp}`} className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#58B51B] px-8 py-4 font-black text-white"><Sparkles /> Contact Al Rehab</a></section>
        </main>
      </EnglishLayout>
    </>
  );
}
