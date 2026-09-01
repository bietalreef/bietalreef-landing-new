import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SecondaryHeader from '../../../components/SecondaryHeader';
import UaeDirectoryHomeContent from '../../../components/UaeDirectoryHomeContent';
import UaeDirectoryWeyaakCard from '../../../components/UaeDirectoryWeyaakCard';
import { UAE_EMIRATES } from '../../../data/siteTaxonomy';
import { UAE_ATLAS_IMAGES } from '../../../data/uaeAtlasImages';
import { ArrowRight, ChevronDown, ChevronUp, Search } from 'lucide-react';

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

const detailsBySlug = {
  'abu-dhabi': 'Start from Abu Dhabi to organize your request for contracting, finishing, interior design, maintenance and building materials, then move toward the right service path with Biet Al Reef.',
  dubai: 'Start from Dubai to define your project need, compare the right service categories and move toward a clear request for residential or commercial work.',
  sharjah: 'Use the Sharjah directory path to organize requests for contractors, craftsmen, materials, maintenance, decor and interior design in one clear flow.',
  ajman: 'For Ajman, begin with the service type, clarify the project details and let Biet Al Reef guide the next step without scattered messages.',
  'ras-al-khaimah': 'Start from Ras Al Khaimah to connect project needs with contracting, supply, decor, maintenance and finishing categories in a structured way.',
  fujairah: 'Use the Fujairah path to start requests for construction, maintenance, design, decor and building materials across the east coast.',
  'umm-al-quwain': 'For Umm Al Quwain, begin with a simple request path for contractors, maintenance, materials, furniture and project support.',
};

export default function EnglishUaeIndex() {
  const [openSlug, setOpenSlug] = useState(null);
  const pageData = {
    h1: 'UAE Directory',
    desc: 'Start your journey to discover the contractors, suppliers and products your project needs, and explore the best opportunities across the UAE.',
    seoTitle: 'UAE Construction, Services and Suppliers Directory | Biet Al Reef',
    seoDesc: 'Explore construction, contracting, maintenance, design, building materials, suppliers and service providers across all seven UAE emirates through Biet Al Reef.',
  };
  const emirateCards = UAE_EMIRATES.map((emirate) => ({
    ...emirate,
    atlasImage: atlasImageBySlug[emirate.slug]?.image,
    atlasThumb: atlasImageBySlug[emirate.slug]?.thumb,
    experience: experienceBySlug[emirate.slug] || emirate.description,
    details: detailsBySlug[emirate.slug] || experienceBySlug[emirate.slug] || emirate.description,
  }));
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.h1,
    description: pageData.seoDesc,
    url: 'https://bietalreef.ae/en/uae',
    inLanguage: 'en-AE',
    primaryImageOfPage: { '@type': 'ImageObject', contentUrl: shareImage },
  };

  return (
    <>
      <Head>
        <title>{pageData.seoTitle}</title>
        <meta name="description" content={pageData.seoDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/uae" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/uae" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/uae" />
        <meta property="og:title" content={pageData.seoTitle} />
        <meta property="og:description" content={pageData.seoDesc} />
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
        <meta name="twitter:title" content={pageData.seoTitle} />
        <meta name="twitter:description" content={pageData.seoDesc} />
        <meta name="twitter:image" content={shareImage} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <div dir="ltr" lang="en" className="min-h-screen bg-[#FDFBF7] text-gray-900" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
        <Navbar locale="en" />
        <SecondaryHeader backUrl="/en" backLabel="Back to home" locale="en" />
        <main dir="ltr" className="bg-[#FDFBF7] text-left text-gray-900">
          <section className="relative isolate overflow-hidden bg-[#FDFBF7] px-4 pb-7 pt-0 text-gray-900 md:pb-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#F3E6CD_0%,#FDFBF7_48%,#F7F1E8_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="relative mx-auto overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white/80 p-2 shadow-2xl shadow-[#8A6A00]/10 backdrop-blur md:rounded-[3rem] md:p-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.55rem] bg-[#071A2F] md:rounded-[2.35rem]"><Image src={UAE_ATLAS_IMAGES.heroDesktop} alt="UAE Directory digital atlas for Biet Al Reef services" fill priority className="object-contain object-center" sizes="(max-width: 1200px) 100vw, 1120px" /></div>
              </div>
              <div className="relative mx-auto -mt-5 max-w-4xl rounded-[2rem] border border-[#E6DCC8] bg-white/92 px-5 py-5 text-center shadow-2xl shadow-[#8A6A00]/10 backdrop-blur-xl md:-mt-8 md:rounded-[2.5rem] md:px-10 md:py-6">
                <h1 className="text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">{pageData.h1}</h1>
                <p className="mx-auto mt-3 max-w-3xl text-base font-bold leading-8 text-gray-700 md:text-xl">{pageData.desc}</p>
              </div>
            </div>
          </section>

          <UaeDirectoryWeyaakCard locale="en" className="pb-4 md:pb-6" />

          <section id="uae-emirates" className="scroll-mt-24 bg-[#FDFBF7] px-4 py-10 md:py-14">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 text-center">
                <h2 className="inline-flex rounded-full border border-[#D4AF37]/35 bg-[linear-gradient(135deg,#F8E5A8_0%,#D4AF37_52%,#F5D97C_100%)] px-7 py-2.5 text-2xl font-black leading-tight text-[#0F3F1A] shadow-lg shadow-[#D4AF37]/15 md:text-4xl">Start by choosing an emirate</h2>
                <p className="mx-auto mt-4 max-w-3xl text-gray-600 leading-8">Choose the emirate, select the relevant sector, then continue through clearly organized areas and related services.</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {emirateCards.map((emirate, index) => {
                  const isOpen = openSlug === emirate.slug;
                  return <article key={emirate.slug} className="group overflow-hidden rounded-[2.15rem] border border-[#E4D6BA] bg-white/95 p-2 shadow-xl shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/70 hover:shadow-2xl">
                    <div className="relative overflow-hidden rounded-[1.65rem] border border-[#D4AF37]/30 bg-[#071A2F] p-1 shadow-inner"><div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]"><Image src={emirate.atlasImage || emirate.atlasThumb} alt={`Biet Al Reef service directory image for ${emirate.nameEn}`} fill priority={index < 3} className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" /></div></div>
                    <div className="px-3 pb-4 pt-4 md:px-4"><div className="flex items-center justify-between gap-4"><div className="flex items-baseline gap-2"><span className="text-xs font-black text-[#B8922B]">Emirate</span><h3 className="text-3xl font-black leading-none text-[#0F3F1A]">{emirate.nameEn}</h3></div><Link href={`/en/uae/${emirate.slug}`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0F3F1A] px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-[#0F3F1A]/15 transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1F170D]" aria-label={`Discover ${emirate.nameEn} services`}><Search size={15} /> Explore now <ArrowRight size={15} /></Link></div><div className="mt-4 flex items-start gap-3 border-t border-[#F0E7D6] pt-3"><p className={`flex-1 text-sm font-semibold leading-7 text-gray-600 transition-all duration-300 ${isOpen ? 'max-h-40' : 'max-h-7 overflow-hidden'}`}>{isOpen ? emirate.details : emirate.experience}</p><button type="button" onClick={() => setOpenSlug(isOpen ? null : emirate.slug)} className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E4D6BA] bg-[#FDFBF7] text-[#0F3F1A] shadow-sm transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1F170D]" aria-expanded={isOpen} aria-label={isOpen ? `Close ${emirate.nameEn} details` : `Open ${emirate.nameEn} details`}>{isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button></div></div>
                  </article>;
                })}
              </div>
            </div>
          </section>

          <UaeDirectoryHomeContent locale="en" />
        </main>
        <Footer locale="en" showRequestCTA={false} />
      </div>
    </>
  );
}
