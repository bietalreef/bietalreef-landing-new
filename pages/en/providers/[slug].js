import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../../components/EnglishLayout';
import { providers } from '../../../data/providers';
import { ShieldCheck, MapPin, Clock, Phone, MessageCircle, Award, Gem, ChevronDown, ExternalLink, CheckCircle2, Users, Hammer, Layers, ArrowRight } from 'lucide-react';

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

  const description = provider.descriptionEn || provider.nameEn;
  const canonical = `https://bietalreef.ae/en/providers/${provider.slug}`;
  const whatsappDigits = String(provider.whatsapp || '').replace(/\D/g, '');

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${canonical}#business`,
    name: provider.nameEn,
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
          <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#3B2A10_0%,#101010_42%,#050505_100%)] text-white">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(225deg,transparent_0%,#D4AF37_48%,transparent_72%)]" />
            {provider.cover && <div className="absolute inset-0"><Image src={provider.cover} alt={provider.nameEn} fill className="object-cover opacity-15" priority /></div>}
            <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
              <Link href="/en/providers" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white/90 hover:bg-white/20 transition"><ArrowRight className="h-4 w-4" />Back to service providers</Link>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:items-center">
                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-1.5 text-xs font-black text-[#F3D46B]"><Gem className="h-3.5 w-3.5" /> Premium Specialty</span>
                    {provider.verified && <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-4 py-1.5 text-xs font-black text-emerald-100"><ShieldCheck className="h-3.5 w-3.5" /> Verified Provider</span>}
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-black text-white/80">{provider.providerTypeEn || 'Marble & Granite Factory'}</span>
                  </div>

                  <h1 className="text-4xl font-black leading-tight md:text-6xl">{provider.nameEn || provider.nameAr}</h1>
                  <p className="mt-4 text-base font-bold text-[#F3D46B] md:text-lg">Marble · Granite · Quartz · Al Ain · Abu Dhabi</p>
                  <p className="mt-6 max-w-3xl text-lg leading-9 text-white/82">{description}</p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {whatsappDigits && <a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Hello, I would like to inquire about White Whale Factory services via Biet Al Reef')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#12110B] transition hover:bg-[#b8922b]"><MessageCircle className="h-5 w-5" /> Contact on WhatsApp</a>}
                    <a href={`tel:${provider.phone}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white transition hover:bg-white/20"><Phone className="h-5 w-5" /> Call Factory</a>
                    <Link href="/en/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/40 px-8 py-4 font-black text-[#F3D46B] transition hover:bg-[#D4AF37] hover:text-[#12110B]">Request Quotation</Link>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-white/8 p-6 shadow-2xl backdrop-blur">
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-white/15 via-[#D4AF37]/10 to-black/20 p-6">
                    <p className="text-sm font-black text-[#F3D46B]">Factory Trust Card</p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-black/25 p-4 text-center"><div className="text-3xl font-black text-[#F3D46B]">Marble</div><div className="mt-1 text-xs text-white/70">Natural stones</div></div>
                      <div className="rounded-2xl bg-black/25 p-4 text-center"><div className="text-3xl font-black text-[#F3D46B]">Granite</div><div className="mt-1 text-xs text-white/70">Durable solutions</div></div>
                      <div className="rounded-2xl bg-black/25 p-4 text-center"><div className="text-3xl font-black text-[#F3D46B]">Quartz</div><div className="mt-1 text-xs text-white/70">Kitchen tops</div></div>
                      <div className="rounded-2xl bg-black/25 p-4 text-center"><div className="text-3xl font-black text-[#F3D46B]">UAE</div><div className="mt-1 text-xs text-white/70">By request</div></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-black/20 px-4 py-3"><CheckCircle2 className="h-4 w-4 text-emerald-400" /><span className="text-xs text-white/80">Service provider profile inside Biet Al Reef</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#E6DCC8] bg-white"><div className="mx-auto max-w-6xl px-4 py-5"><div className="grid grid-cols-2 gap-4 md:grid-cols-4"><InfoItem icon={<MapPin className="h-5 w-5 text-[#0F3F1A]" />} label="Location" value="Al Ain, Abu Dhabi" /><InfoItem icon={<Clock className="h-5 w-5 text-[#0F3F1A]" />} label="Working Hours" value="Sat - Thu" /><InfoItem icon={<Phone className="h-5 w-5 text-[#0F3F1A]" />} label="Phone" value={provider.phone} /><InfoItem icon={<Award className="h-5 w-5 text-[#0F3F1A]" />} label="Status" value="Verified" highlight /></div></div></section>

          {provider.aboutEn && <section className="mx-auto max-w-6xl px-4 py-16"><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="font-black text-[#B8922B]">About the Factory</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A] leading-tight">Specialized provider for marble, granite and quartz</h2><p className="mt-6 leading-9 text-gray-600">{provider.aboutEn}</p><div className="mt-8 grid grid-cols-3 gap-4"><FeatureCard icon={<Hammer className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="Custom Fabrication" /><FeatureCard icon={<Layers className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="Material Options" /><FeatureCard icon={<Users className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="Direct Contact" /></div></div><div className="relative overflow-hidden rounded-[2rem]"><Image src="/images/providers/al-hoot/about-factory.jpg" alt="White Whale Marble & Granite Factory" width={1344} height={768} className="w-full h-auto rounded-[2rem] object-cover" /></div></div></section>}

          <section className="mx-auto max-w-6xl px-4 pb-16"><div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 shadow-sm md:p-10"><p className="font-black text-[#B8922B]">Services & Products</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A]">Factory service paths</h2><p className="mt-3 max-w-3xl text-gray-600 leading-8">The factory supports supply, fabrication and installation requests based on project requirements and selected materials.</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{(provider.services || []).map((service) => <div key={service} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-sm font-black text-[#0F3F1A] hover:border-[#D4AF37]/50 hover:bg-[#FFF8E5] transition">{serviceLabels[service] || service}</div>)}</div></div></section>

          {provider.materials?.length > 0 && <section className="bg-white border-y border-[#E6DCC8]"><div className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#B8922B]">Available Materials</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A]">Stone and finishing material options</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{provider.materials.map((mat, idx) => <div key={idx} className="rounded-2xl border border-[#E6DCC8] p-6 hover:shadow-md transition"><h3 className="text-lg font-black text-[#0F3F1A]">{mat.nameEn}</h3><p className="mt-2 text-sm leading-7 text-gray-600">{mat.descEn}</p></div>)}</div></div></section>}

          {provider.gallery?.length > 0 && <section className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#B8922B]">Gallery</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A]">Visual samples for materials and works</h2><p className="mt-3 max-w-3xl text-gray-600 leading-8">Images that help customers understand marble, granite and quartz work types available through Biet Al Reef.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{provider.gallery.map((img, idx) => <div key={idx} className="group relative overflow-hidden rounded-2xl border border-[#E6DCC8] bg-white shadow-sm"><div className="aspect-square relative"><Image src={img.src} alt={img.altEn} fill className="object-cover transition group-hover:scale-105 duration-500" /></div><div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4"><p className="text-sm font-black text-white">{img.altEn}</p></div></div>)}</div></section>}

          {provider.googleMapsUrl && <section className="mx-auto max-w-6xl px-4 pb-16"><div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 shadow-sm"><div className="flex items-start justify-between flex-wrap gap-4 mb-6"><div><p className="font-black text-[#B8922B]">Factory Location</p><h2 className="mt-2 text-2xl font-black text-[#0F3F1A]">Visit or contact the factory</h2><p className="mt-2 text-gray-600 leading-8">Mazid Company Camp, Al Ain, Abu Dhabi, United Arab Emirates</p><p className="mt-1 text-sm text-gray-500">{provider.workingHoursEn}</p></div><a href={provider.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/40 px-6 py-3 text-sm font-black text-[#B8922B] hover:bg-[#D4AF37]/10 transition"><ExternalLink className="h-4 w-4" /> Open in Google Maps</a></div></div></section>}

          {provider.faq?.length > 0 && <section className="mx-auto max-w-4xl px-4 pb-16"><p className="text-center font-black text-[#B8922B]">Frequently Asked Questions</p><h2 className="mt-2 mb-8 text-center text-3xl font-black text-[#0F3F1A]">Direct answers to common questions</h2><div className="space-y-4">{provider.faq.map((item, idx) => <details key={idx} className="group rounded-2xl border border-[#E6DCC8] bg-white shadow-sm"><summary className="cursor-pointer list-none p-6 font-black text-[#0F3F1A] flex items-center justify-between gap-4">{item.questionEn}<ChevronDown className="h-5 w-5 shrink-0 text-[#B8922B] transition group-open:rotate-180" /></summary><div className="px-6 pb-6 leading-8 text-gray-600">{item.answerEn}</div></details>)}</div></section>}

          <section className="mx-auto max-w-6xl px-4 pb-20"><div className="rounded-[2rem] bg-gradient-to-br from-[#101010] via-[#1b160c] to-[#0F3F1A] p-8 text-white md:p-12"><h2 className="text-3xl font-black">Need marble, granite or quartz for your project?</h2><p className="mt-4 max-w-2xl text-white/75 leading-8">Send your project details, measurements and available photos to get directed to the right quotation path.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row">{whatsappDigits && <a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Hello, I would like to inquire about White Whale Factory services via Biet Al Reef')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#12110B] transition hover:bg-[#b8922b]">Contact via WhatsApp</a>}<Link href="/en/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white transition hover:bg-white/20">Request Official Quotation</Link></div></div></section>
        </main>
      </EnglishLayout>
    </>
  );
}

function InfoItem({ icon, label, value, highlight = false }) {
  return <div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDFBF7] border border-[#E6DCC8]">{icon}</div><div><p className="text-xs text-gray-500">{label}</p><p className={`text-sm font-black ${highlight ? 'text-emerald-700' : 'text-[#0F3F1A]'}`}>{value}</p></div></div>;
}

function FeatureCard({ icon, label }) {
  return <div className="rounded-2xl border border-[#E6DCC8] bg-white p-4 text-center shadow-sm">{icon}<p className="mt-2 text-sm font-black text-[#0F3F1A]">{label}</p></div>;
}

export async function getStaticProps({ params }) {
  const provider = providers.find((item) => item.slug === params.slug);
  if (!provider) return { notFound: true };
  return { props: { provider }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return { paths: providers.map((provider) => ({ params: { slug: provider.slug } })), fallback: 'blocking' };
}