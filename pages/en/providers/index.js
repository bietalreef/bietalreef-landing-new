import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../../components/EnglishLayout';
import { ArrowLeft, Building2, MessageCircle, Users, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { UAE_EMIRATES } from '../../../data/siteTaxonomy';
import { providers } from '../../../data/providers';
import { ProviderCard } from '../../../components/cards/SmartEntityCard';

const providerSectorCards = [
  {
    title: 'General Contracting, Construction & Building',
    eyebrow: 'Construction sector',
    desc: 'Contracting companies and providers for villas, extensions, majlis, residential and commercial projects.',
    href: '/en/providers/specialty/general-contracting',
    image: '/images/sector-cards/general-contracting-construction-card.webp',
    tags: ['Contracting', 'Construction', 'Building']
  },
  {
    title: 'Engineering Offices, Consultancy & Design',
    eyebrow: 'Design sector',
    desc: 'Engineering offices for architectural, structural and MEP design, approvals and supervision.',
    href: '/en/providers/specialty/engineering-consultants',
    image: '/images/sector-cards/engineering-consultants-design-card.webp',
    tags: ['Design', 'Consultancy', 'Supervision']
  },
  {
    title: 'Building Materials, Stores & Showrooms',
    eyebrow: 'Supply sector',
    desc: 'Building and finishing material sources, stores and suppliers connected to projects and contractors.',
    href: '/en/providers/specialty/building-materials',
    image: '/images/sector-cards/building-materials-stores-card.webp',
    tags: ['Materials', 'Stores', 'Supply']
  },
  {
    title: 'Maintenance, Finishing, AC, Plumbing & Electrical',
    eyebrow: 'Maintenance sector',
    desc: 'Providers for general maintenance, finishing works, AC, plumbing, electrical and repair services.',
    href: '/en/providers/specialty/general-maintenance',
    image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp',
    tags: ['Maintenance', 'Finishing', 'MEP']
  },
  {
    title: 'Aluminium, Glass & Wood Works',
    eyebrow: 'Façade and wood sector',
    desc: 'Aluminium, glass, doors, windows, cabinets, kitchens and custom woodwork providers.',
    href: '/en/providers/specialty/aluminium-glass',
    image: '/images/sector-cards/aluminium-glass-wood-card.webp',
    tags: ['Aluminium', 'Glass', 'Wood']
  },
  {
    title: 'Cleaning Services & Equipment Rental',
    eyebrow: 'Operations sector',
    desc: 'Cleaning, post-construction cleaning, site equipment rental, scaffolding and construction tools.',
    href: '/en/providers/specialty/cleaning-services',
    image: '/images/sector-cards/cleaning-equipment-rental-card.webp',
    tags: ['Cleaning', 'Equipment', 'Operations']
  },
  {
    title: 'Factories, Suppliers & Workshops',
    eyebrow: 'Manufacturing and supply sector',
    desc: 'Factories, workshops and supply companies serving construction, finishing and custom material needs.',
    href: '/en/providers/specialty/building-materials',
    image: '/images/sector-cards/factories-suppliers-workshops-card.webp',
    tags: ['Factories', 'Workshops', 'Supply']
  }
];

const extraSpecialties = [
  { name: 'Interior Design', href: '/en/providers/specialty/interior-design' },
  { name: 'Finishing Works', href: '/en/providers/specialty/finishing-works' },
  { name: 'Carpentry', href: '/en/providers/specialty/carpentry' },
  { name: 'Electrical', href: '/en/providers/specialty/electrical' },
  { name: 'Plumbing', href: '/en/providers/specialty/plumbing' },
  { name: 'AC Technicians', href: '/en/providers/specialty/ac-technicians' },
  { name: 'Marble & Ceramic', href: '/en/providers/specialty/marble-ceramic' },
  { name: 'Smart Systems & CCTV', href: '/en/providers/specialty/smart-systems' },
  { name: 'Landscaping', href: '/en/providers/specialty/landscaping' },
  { name: 'Equipment Rental', href: '/en/providers/specialty/equipment-rental' },
  { name: 'Transport & Logistics', href: '/en/providers/specialty/transport-logistics' },
  { name: 'Furniture & Decor', href: '/en/providers/specialty/furniture-decor' }
];

const steps = [
  { title: 'Create your profile', desc: 'Register your company details, specialties and work coverage in the UAE.', number: '01' },
  { title: 'Document your work', desc: 'Add previous project photos and experience proof to build client confidence.', number: '02' },
  { title: 'Receive requests', desc: 'Start receiving direct quotation requests from targeted customers.', number: '03' }
];

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

function toProviderCardItem(provider) {
  const mappedSpecialties = (provider.services || []).map((service) => serviceLabels[service]).filter(Boolean);

  return {
    id: provider.slug,
    entityType: 'provider',
    premium: provider.slug === 'al-hoot-marble-granite-factory',
    name: provider.nameEn || 'Verified Service Provider',
    nameEn: provider.nameEn || 'Verified Service Provider',
    providerType: provider.providerTypeEn || 'Service Provider',
    emirate: provider.emirate,
    city: provider.city === 'al-ain' ? 'Al Ain' : provider.city,
    area: provider.area === 'mazid-company-camp' ? 'Mazyad - Company Camp' : provider.area,
    specialties: mappedSpecialties.length ? mappedSpecialties : ['Verified profile'],
    verified: provider.verified,
    coverImage: provider.cover || provider.logo,
    logoText: provider.nameEn?.slice(0, 1) || 'P',
    href: '/en/providers/' + provider.slug,
    whatsapp: provider.whatsapp ? `https://wa.me/${String(provider.whatsapp).replace(/\D/g, '')}` : undefined,
    summary: provider.descriptionEn || 'A verified provider profile inside Biet Al Reef. Contact the provider or request details through the platform.',
  };
}

export default function ProvidersEnglishPage() {
  return (
    <>
      <Head>
        <title>Service Providers | Biet Al Reef</title>
        <meta name="description" content="Browse Biet Al Reef service providers by specialty or register your business to appear inside the platform." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/providers" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/providers" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/providers" />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="-mt-[1px] bg-[#FDFBF7] text-left">
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
            <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
              <Image
                src="/images/providers-hero.webp"
                alt="Building, contracting and maintenance service providers inside Biet Al Reef"
                fill
                priority
                className="scale-[1.16] object-cover object-[52%_36%] -translate-y-[6%] md:scale-110 md:object-center md:-translate-y-[4%]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/18 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/50 via-[#FDFBF7]/8 to-transparent" />

              <Link href="/en" className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:left-8 md:top-8 md:px-4 md:py-3 md:text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </span>
                Back to home
              </Link>

              <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm">
                  <Users className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />
                  Service providers gateway
                </div>

                <h1 className="max-w-4xl text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] md:text-6xl">
                  Make your business visible<br />where customers search for service
                </h1>

                <div className="mt-5 max-w-4xl rounded-[2.1rem] border border-white/70 bg-white/64 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                  <p className="max-w-3xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">
                    Biet Al Reef does not place you in a simple name list. It builds a clear digital presence that connects your activity with location, specialty, requests and visibility inside a UAE construction and maintenance platform.
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link href="/en/providers/register" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                        <Building2 className="h-5 w-5" aria-hidden="true" />
                      </span>
                      Register your company
                    </Link>
                    <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      </span>
                      Talk to onboarding
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="provider-sectors" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
            <div className="mb-8 text-center md:text-left">
              <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">7 main sectors</span>
              <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">Choose the sector closest to your business</h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">We keep only seven visual sector cards for a clean identity. Additional specialties are organized in the smart footer below.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {providerSectorCards.map((card) => (
                <article key={card.title} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]">
                  <div className="relative h-48 overflow-hidden bg-[#F5EFE4] sm:h-52">
                    <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/70 via-[#0F3F1A]/18 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-[#D4AF37]/45 bg-white/84 px-3 py-1.5 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{card.eyebrow}</span>
                      <Sparkles className="h-5 w-5 text-[#F7E7A0] drop-shadow" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xl font-black leading-8 text-[#0F3F1A]">{card.title}</h3>
                    <p className="mt-3 min-h-[76px] text-sm font-semibold leading-7 text-gray-600">{card.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => <span key={tag} className="rounded-full bg-[#FDF7E8] px-3 py-1 text-[11px] font-black text-[#8A6A00]">{tag}</span>)}
                    </div>
                    <Link href={card.href} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123A46] px-5 py-3 text-sm font-black text-white shadow-[0_10px_0_rgba(18,58,70,0.12)] transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">
                      Open sector
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-10 text-center md:text-left">
              <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00]">Real providers inside the platform</span>
              <h2 className="mt-4 mb-3 text-3xl font-black text-[#0F3F1A]">Available providers now</h2>
              <p className="leading-8 text-gray-500">These are the first real service provider profiles inside Biet Al Reef. Each card opens a real provider profile and a contact or quotation path.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {providers.map((provider) => <ProviderCard key={provider.slug} item={toProviderCardItem(provider)} />)}
            </div>
          </section>

          <section className="border-y border-[#E6DCC8] bg-white py-20">
            <div className="mx-auto max-w-6xl px-4 text-center">
              <h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">How do you join the Biet Al Reef network?</h2>
              <p className="mb-12 text-gray-500">Simple steps to start your digital growth journey with us</p>
              <div className="grid gap-12 md:grid-cols-3">
                {steps.map((step) => (
                  <div key={step.number} className="relative text-center">
                    <div className="absolute -top-10 left-1/2 z-0 -translate-x-1/2 text-8xl font-black text-gray-50">{step.number}</div>
                    <div className="relative z-10"><h3 className="mb-3 text-xl font-black text-[#0F3F1A]">{step.title}</h3><p className="text-sm leading-7 text-gray-500">{step.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="provider-smart-footer" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/30 bg-[#0F3F1A] p-5 text-white shadow-[0_28px_70px_rgba(15,63,26,0.22)] md:p-8">
              <div className="absolute -left-24 -top-24 h-52 w-52 rounded-full bg-[#D4AF37]/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
                <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-black text-[#0F3F1A]"><MapPin className="h-4 w-4" />Smart footer</span>
                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">Smart links for service providers</h2>
                  <p className="mt-4 text-sm font-semibold leading-8 text-white/74">Additional specialties and emirate search are organized here, keeping the main page clean, premium and mobile-first.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-[#0F3F1A] shadow-2xl shadow-black/10">
                    <h3 className="mb-4 text-lg font-black">Additional specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {extraSpecialties.map((item) => <Link key={item.name} href={item.href} className="rounded-full border border-[#E6DCC8] bg-[#FDFBF7] px-3 py-2 text-xs font-black text-gray-700 transition hover:border-[#D4AF37] hover:text-[#0F3F1A]">{item.name}</Link>)}
                    </div>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-[#0F3F1A] shadow-2xl shadow-black/10">
                    <h3 className="mb-4 text-lg font-black">Browse by emirate</h3>
                    <div className="flex flex-wrap gap-2">
                      {UAE_EMIRATES.map((emirate) => <Link key={emirate.slug} href={'/en/uae/' + emirate.slug} className="rounded-full border border-[#E6DCC8] bg-[#FDFBF7] px-3 py-2 text-xs font-black text-gray-700 transition hover:border-[#D4AF37] hover:text-[#0F3F1A]">{emirate.nameEn}</Link>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}
