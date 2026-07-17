import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SecondaryHeader from '../../../components/SecondaryHeader';
import UaeSmartFooter from '../../../components/UaeSmartFooter';
import UaeDirectoryWeyaakCard from '../../../components/UaeDirectoryWeyaakCard';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../../../data/siteTaxonomy';
import { UAE_ATLAS_IMAGES } from '../../../data/uaeAtlasImages';
import { ArrowLeft } from 'lucide-react';

const atlasImageBySlug = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item]));
const shareImage = 'https://bietalreef.ae/images/uae-atlas/hero-uae-digital-atlas.webp';

const experienceBySlug = {
  'abu-dhabi': 'Construction, maintenance, design and building material services in Abu Dhabi, Al Ain and the emirate areas.',
  dubai: 'Contracting, finishing, maintenance and design services in Dubai and its residential and commercial districts.',
  sharjah: 'Contractor, craftsman, building material and design services in Sharjah, its cities and areas.',
  ajman: 'Construction, maintenance, décor and building material services in Ajman and its areas.',
  'ras-al-khaimah': 'Contracting, maintenance, material and décor services in Ras Al Khaimah and its areas.',
  fujairah: 'Construction, maintenance, design and building material services in Fujairah and east coast areas.',
  'umm-al-quwain': 'Contractor, maintenance, material and furniture services in Umm Al Quwain and its areas.',
};

export default function EnglishUaeIndex() {
  const title = 'UAE Construction, Services and Suppliers Directory | Biet Al Reef';
  const description = 'Explore construction, contracting, maintenance, design, building materials, suppliers and service providers across all seven UAE emirates through Biet Al Reef.';
  const structuredData = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'UAE Directory', description, url: 'https://bietalreef.ae/en/uae', inLanguage: 'en-AE', primaryImageOfPage: { '@type': 'ImageObject', contentUrl: shareImage } };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/uae" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/uae" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/uae" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/en/uae" />
        <meta property="og:site_name" content="Biet Al Reef" />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="Biet Al Reef UAE digital directory covering all seven emirates" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={shareImage} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div dir="ltr" lang="en" className="min-h-screen bg-[#FDFBF7] text-gray-900" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
        <Navbar locale="en" />
        <SecondaryHeader backUrl="/en" backLabel="Back to home" locale="en" />
        <main dir="ltr" className="bg-[#FDFBF7] text-left text-gray-900">
          <section className="relative isolate overflow-hidden bg-[#FDFBF7] px-4 pb-7 pt-0 md:pb-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#F3E6CD_0%,#FDFBF7_48%,#F7F1E8_100%)]" />
            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="relative mx-auto overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white/80 p-2 shadow-2xl shadow-[#8A6A00]/10 backdrop-blur md:rounded-[3rem] md:p-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.55rem] bg-[#071A2F] md:rounded-[2.35rem]">
                  <Image src={UAE_ATLAS_IMAGES.heroDesktop} alt="UAE Directory digital atlas for Biet Al Reef services" fill priority className="object-contain object-center" sizes="(max-width: 1200px) 100vw, 1120px" />
                </div>
              </div>
              <div className="relative mx-auto -mt-5 max-w-4xl rounded-[2rem] border border-[#E6DCC8] bg-white/92 px-5 py-5 text-center shadow-2xl shadow-[#8A6A00]/10 backdrop-blur-xl md:-mt-8 md:rounded-[2.5rem] md:px-10 md:py-6">
                <h1 className="text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">UAE Directory</h1>
                <p className="mx-auto mt-3 max-w-3xl text-base font-bold leading-8 text-gray-700 md:text-xl">Start your journey to discover the contractors, suppliers and products your project needs, and explore the best opportunities across the UAE.</p>
              </div>
            </div>
          </section>

          <UaeDirectoryWeyaakCard locale="en" />

          <section id="uae-emirates" className="scroll-mt-24 px-4 py-10 md:py-14">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 text-center">
                <h2 className="inline-flex rounded-full border border-[#D4AF37]/35 bg-[linear-gradient(135deg,#F8E5A8_0%,#D4AF37_52%,#F5D97C_100%)] px-7 py-2.5 text-2xl font-black leading-tight text-[#0F3F1A] shadow-lg shadow-[#D4AF37]/15 md:text-4xl">Start by choosing an emirate</h2>
                <p className="mx-auto mt-4 max-w-3xl text-gray-600 leading-8">Choose the emirate, select the relevant sector, then continue through clearly organized areas and related services.</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {UAE_EMIRATES.map((emirate, index) => (
                  <Link key={emirate.slug} href={`/en/uae/${emirate.slug}`} className="group block overflow-hidden rounded-[2.15rem] border border-[#E4D6BA] bg-white/95 p-2 shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:border-[#D4AF37]/70">
                    <div className="relative overflow-hidden rounded-[1.65rem] border border-[#D4AF37]/30 bg-[#071A2F] p-1 shadow-inner"><div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]"><Image src={atlasImageBySlug[emirate.slug]?.image || atlasImageBySlug[emirate.slug]?.thumb} alt={`${emirate.nameEn} UAE Directory`} fill priority={index < 3} className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" /></div></div>
                    <div className="px-3 pb-4 pt-4 md:px-4"><span className="text-xs font-black text-[#B8922B]">Emirate</span><h3 className="mt-2 text-3xl font-black text-[#0F3F1A]">{emirate.nameEn}</h3><p className="mt-4 text-sm font-semibold leading-7 text-gray-600">{experienceBySlug[emirate.slug] || emirate.description}</p><span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0F3F1A] px-4 py-2.5 text-xs font-black text-white">Explore now <ArrowLeft size={15} /></span></div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 pb-12"><div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E6DCC8] bg-white/88 p-5 shadow-sm md:p-7"><h2 className="text-2xl font-black text-[#0F3F1A]">Popular services inside the directory</h2><div className="mt-5 flex flex-wrap gap-3">{SERVICE_CATEGORIES.map((service) => <Link key={service.slug} href="/en/uae" className="rounded-full bg-[#FDFBF7] border border-[#E6DCC8] px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary hover:border-primary transition">{service.icon} {service.nameEn}</Link>)}</div></div></section>
          <section className="px-4 pb-12"><div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8"><h2 className="text-2xl font-black text-[#0F3F1A]">How does the UAE Directory serve project owners?</h2><p className="mt-4 leading-8 text-gray-600">The directory uses a clear geographic order: choose the emirate, select the sector, then use the related area and service links to continue.</p></div></section>
          <UaeSmartFooter locale="en" pageType="index" />
        </main>
        <Footer locale="en" />
      </div>
    </>
  );
}
