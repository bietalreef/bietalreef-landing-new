import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import ServicesSmartFooter from '../../components/ServicesSmartFooter';
import DiscoveryDirectoryHero from '../../components/DiscoveryDirectoryHero';
import SectionBackBar from '../../components/SectionBackBar';
import { getAllServices } from '../../lib/services-detailed';
import { getSectorCardImage } from '../../lib/sectorCards';
import { ArrowLeft, MessageCircle, Search, Wrench, ChevronRight } from 'lucide-react';

const serviceCopy = {
  'general-contracting': ['Construction Contracting', 'Certified contracting companies for villas, buildings and residential or commercial projects.'],
  'engineering-consultants': ['Engineering Consultation', 'Certified engineering offices and professional architectural and technical supervision.'],
  'general-maintenance': ['Maintenance Companies', 'Comprehensive maintenance for buildings and villas: plumbing, electrical, AC, painting and repair.'],
  carpentry: ['Craftsmen & Workers', 'Skilled workers for construction, finishing, carpentry, marble, gypsum, paint and more.'],
  workshops: ['Industrial Workshops', 'Metal, carpentry, aluminium, marble and glass workshops with high quality standards.'],
  'equipment-rental': ['Equipment Rental', 'Cranes, excavators, mixers and construction equipment for rental.'],
  'building-materials': ['Building Material Stores', 'Cement, steel, blocks, sand, gravel and finishing materials.'],
  'furniture-decor': ['Furniture & Décor', 'Furniture, custom majlis, curtains, carpets, accessories and décor.'],
  'cleaning-services': ['Cleaning Services', 'Home, building, post-construction and maintenance cleaning services.'],
};

const benefitCopy = {
  'general-contracting': ['Trusted contractors with documented project records', 'Compare quotation options clearly'],
  'engineering-consultants': ['Experienced engineering specialists', 'Design, approval and supervision support'],
  'general-maintenance': ['Fast response for maintenance requests', 'Specialized technicians across key trades'],
  carpentry: ['Skilled craftsmen across multiple trades', 'Direct service request based on the required work'],
  workshops: ['Specialized workshops by field', 'Custom fabrication and professional installation'],
  'equipment-rental': ['Reliable site equipment', 'Flexible daily, weekly and monthly options'],
  'building-materials': ['Material supply for projects', 'Construction and finishing material options'],
  'furniture-decor': ['Furniture and décor paths', 'Custom furnishing and interior support'],
  'cleaning-services': ['Cleaning for homes and buildings', 'Post-construction cleaning support'],
};

function getCategorySlug(serviceId) {
  const categoryMap = {
    construction: 'general-contracting',
    'interior-design': 'interior-design',
    'project-management': 'general-contracting',
    'engineering-consultants': 'engineering-consultants',
    maintenance: 'general-maintenance',
    'equipment-rental': 'equipment-rental',
    'cleaning-services': 'cleaning-services',
    'furniture-decoration': 'furniture-decor',
    'building-materials': 'building-materials',
    'specialized-services': 'general-maintenance',
    craftsmen: 'carpentry',
    workshops: 'workshops',
    cleaning: 'cleaning-services',
    'furniture-decor': 'furniture-decor',
  };
  return categoryMap[serviceId] || serviceId;
}

export default function ServicesEnglishPage({ services }) {
  return (
    <>
      <Head>
        <title>Services & Offers | Contracting, Maintenance, Interior Design and Building Materials in the UAE</title>
        <meta name="description" content="Biet Al Reef Services & Offers: choose the service type first, then send your project details to receive suitable guidance or a quotation." />
        <meta name="keywords" content="UAE construction services, contracting offers, maintenance, interior design, plumbing, electrical, AC, painting, carpentry, building materials" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/services" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/services" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/services" />
      </Head>
      <EnglishLayout>
        <SectionBackBar locale="en" />
        <main dir="ltr" className="-mt-[1px] flex-1 bg-[#FDFBF7] text-left [&>section:nth-of-type(2)]:hidden">
          <DiscoveryDirectoryHero type="services" locale="en" />
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
            <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
              <Image src="/images/services-offers-hero.webp" alt="Construction, maintenance and finishing services and offers inside Biet Al Reef" fill priority className="scale-[1.16] object-cover object-[52%_36%] -translate-y-[6%] md:scale-110 md:object-center md:-translate-y-[4%]" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/18 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/50 via-[#FDFBF7]/8 to-transparent" />
              <Link href="/en" className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:left-8 md:top-8 md:px-4 md:py-3 md:text-sm"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></span>Back to home</Link>
              <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm"><Wrench className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />Services & Offers gateway</div>
                <h1 className="max-w-4xl text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] md:text-6xl">Choose the service you need<br />and turn your request into a clear path</h1>
                <div className="mt-5 max-w-4xl rounded-[2.1rem] border border-white/70 bg-white/64 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                  <p className="max-w-3xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">This section starts from the type of work: contracting, maintenance, finishing, carpentry, cleaning or equipment rental. Choose what you need, then send your project details for guidance or a suitable quotation path.</p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"><Link href="#services-list" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105"><Search className="h-5 w-5" aria-hidden="true" /></span>Browse services now</Link><a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105"><MessageCircle className="h-5 w-5" aria-hidden="true" /></span>Ask the team</a></div>
                </div>
              </div>
            </div>
          </section>

          <section id="services-list" className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <div className="mb-8 text-center md:text-left"><span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">Service sectors</span><h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">Choose the service type</h2><p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">Mobile-first cards: clear image, focused content and a direct path to open each service.</p></div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => {
                const categorySlug = getCategorySlug(service.id);
                const copy = serviceCopy[categorySlug] || [service.titleEn || service.title, service.shortDesc];
                const benefits = benefitCopy[categorySlug] || ['Service path based on project details', 'Clear request before quotation'];
                return (
                  <Link key={service.id} href={categorySlug === 'workshops' ? '/services/workshops' : `/en/categories/${categorySlug}`}><article className="group h-full overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]"><div className="relative h-52 overflow-hidden bg-[#F5EFE4] sm:h-56 lg:h-52"><Image src={getSectorCardImage(categorySlug)} alt={copy[0]} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/78 via-[#0F3F1A]/16 to-transparent" /><div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3"><span className="rounded-2xl bg-white/92 px-4 py-2 text-sm font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{copy[0]}</span><span className="rounded-2xl bg-[#123A46] px-3 py-2 text-xs font-black text-[#F7E7A0] shadow-lg ring-1 ring-[#D4AF37]/40">Service</span></div></div><div className="p-5 md:p-6"><h3 className="mb-3 text-xl font-black leading-8 text-[#0F3F1A] group-hover:text-[#B8922B]">{copy[0]}</h3><p className="mb-5 text-sm font-semibold leading-7 text-gray-600">{copy[1]}</p><div className="mb-5 rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3"><p className="text-xs font-black text-gray-500">Pricing method</p><p className="mt-1 text-sm font-black text-[#0F3F1A]">Based on project details</p></div><div className="mb-5 space-y-2">{benefits.map((benefit) => <div key={benefit} className="flex items-start gap-2 text-xs font-bold leading-6 text-gray-700"><span className="mt-1 text-[#B8922B]">✓</span><span>{benefit}</span></div>)}</div><span className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123A46] px-5 py-3 text-sm font-black text-white shadow-[0_10px_0_rgba(18,58,70,0.12)] transition group-hover:bg-[#D4AF37] group-hover:text-[#0F3F1A]">Service details <ChevronRight className="h-4 w-4" /></span></div></article></Link>
                );
              })}
            </div>
          </section>

          <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24"><div className="max-w-6xl mx-auto px-4"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">How do you choose the right service?</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">1️⃣</div><h3 className="font-bold text-lg mb-3">Define the service</h3><p className="text-gray-600 text-sm">Start from the type of work required: contracting, maintenance, carpentry, marble or another service.</p></div><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">2️⃣</div><h3 className="font-bold text-lg mb-3">Add the details</h3><p className="text-gray-600 text-sm">Location, measurements, photos and required materials help guide the request.</p></div><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">3️⃣</div><h3 className="font-bold text-lg mb-3">Request a quotation</h3><p className="text-gray-600 text-sm">We do not rely on a general price. The correct price needs project details.</p></div></div></div></section>
          <ServicesSmartFooter locale="en" />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps() {
  const services = getAllServices();
  return { props: { services } };
}
