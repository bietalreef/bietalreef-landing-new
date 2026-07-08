import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../../components/EnglishLayout';
import { ArrowLeft, Building2, MessageCircle, Users, Search } from 'lucide-react';
import { SERVICE_CATEGORIES, UAE_EMIRATES } from '../../../data/siteTaxonomy';
import { providers } from '../../../data/providers';
import { ProviderCard } from '../../../components/cards/SmartEntityCard';

function normalizeText(value) {
  return String(value || '').toLowerCase().trim();
}

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
  return {
    id: provider.slug,
    entityType: 'provider',
    premium: provider.slug === 'al-hoot-marble-granite-factory',
    name: provider.nameEn || provider.nameAr,
    nameEn: provider.nameEn,
    providerType: provider.providerTypeEn || provider.providerTypeAr,
    emirate: provider.emirate,
    city: provider.city === 'al-ain' ? 'Al Ain' : provider.city,
    area: provider.area === 'mazid-company-camp' ? 'Mazid - Company Camp' : provider.area,
    specialties: (provider.services || []).map((service) => serviceLabels[service] || service),
    verified: provider.verified,
    coverImage: provider.cover || provider.logo,
    logoText: provider.nameEn?.slice(0, 1) || 'W',
    href: '/en/providers/' + provider.slug,
    whatsapp: provider.whatsapp ? `https://wa.me/${String(provider.whatsapp).replace(/\D/g, '')}` : undefined,
    summary: provider.descriptionEn || provider.descriptionAr,
  };
}

export default function ProvidersEnglishPage() {
  const [specialtySearch, setSpecialtySearch] = useState('');
  const query = normalizeText(specialtySearch);
  const filteredCategories = SERVICE_CATEGORIES.filter((service) => {
    if (!query) return true;
    return [service.nameEn, service.nameAr, service.slug].some((field) => normalizeText(field).includes(query));
  });

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

          <section className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-10 text-center md:text-left">
              <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00]">Real providers inside the platform</span>
              <h2 className="mt-4 mb-3 text-3xl font-black text-[#0F3F1A]">Available providers now</h2>
              <p className="leading-8 text-gray-500">These are the first real service provider profiles inside Biet Al Reef. Each card opens a real provider profile and a contact or quotation path.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {providers.map((provider) => <ProviderCard key={provider.slug} item={toProviderCardItem(provider)} />)}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
              <div><h2 className="mb-2 text-3xl font-black text-[#0F3F1A]">Browse service providers by specialty</h2><p className="text-gray-500">Each specialty opens inside the providers path, not inside the UAE Directory or Services & Offers.</p></div>
              <div className="relative w-full md:w-auto"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><input type="text" value={specialtySearch} onChange={(event) => setSpecialtySearch(event.target.value)} placeholder="Search specialty..." className="w-full rounded-xl border border-[#E6DCC8] bg-white py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none md:w-72" /></div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((service) => (
                <Link key={service.slug} href={'/en/providers/specialty/' + service.slug} className="group rounded-3xl border border-[#E6DCC8] bg-white p-8 transition hover:shadow-xl">
                  <div className="mb-6 text-4xl transition-transform group-hover:scale-110">{service.icon}</div>
                  <h3 className="mb-3 text-xl font-black text-[#0F3F1A]">{service.nameEn || service.nameAr} Providers</h3>
                  <p className="mb-6 text-sm leading-relaxed text-gray-500">{service.descEn || service.descAr}</p>
                  <div className="border-t border-gray-50 pt-6 text-xs font-bold text-emerald-600">Browse providers in this specialty</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="border-y border-[#E6DCC8] bg-white py-20">
            <div className="mx-auto max-w-6xl px-4 text-center">
              <h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">How do you join the Biet Al Reef network?</h2>
              <p className="mb-12 text-gray-500">Simple steps to start your digital growth journey with us</p>
              <div className="grid gap-12 md:grid-cols-3">
                <div><div className="mb-3 text-5xl font-black text-gray-100">01</div><h3 className="mb-3 text-xl font-black text-[#0F3F1A]">Create your profile</h3><p className="text-sm leading-7 text-gray-500">Register your company details, specialties and work coverage in the UAE.</p></div>
                <div><div className="mb-3 text-5xl font-black text-gray-100">02</div><h3 className="mb-3 text-xl font-black text-[#0F3F1A]">Document your work</h3><p className="text-sm leading-7 text-gray-500">Add previous project photos and experience proof to build client confidence.</p></div>
                <div><div className="mb-3 text-5xl font-black text-gray-100">03</div><h3 className="mb-3 text-xl font-black text-[#0F3F1A]">Receive requests</h3><p className="text-sm leading-7 text-gray-500">Start receiving direct quotation requests from targeted customers.</p></div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-20">
            <div className="rounded-[40px] border border-[#E6DCC8] bg-[#FDFBF7] p-8 md:p-12">
              <h2 className="mb-6 text-3xl font-black text-[#0F3F1A]">Geographic coverage is separate from the providers section</h2>
              <p className="mb-8 leading-relaxed text-gray-600">If you want a service provider by city or emirate, go to the UAE Directory. Here, browsing is by provider type and specialty.</p>
              <div className="flex flex-wrap gap-2">{UAE_EMIRATES.map((emirate) => <Link key={emirate.slug} href={'/en/uae/' + emirate.slug} className="rounded-full border border-[#E6DCC8] bg-white px-4 py-2 text-xs font-bold text-gray-600 hover:border-emerald-500 hover:text-emerald-600">{emirate.nameEn}</Link>)}</div>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}
