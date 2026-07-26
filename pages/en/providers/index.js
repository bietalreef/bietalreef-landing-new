import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../../components/EnglishLayout';
import ProvidersSmartFooter from '../../../components/ProvidersSmartFooter';
import { ArrowLeft, Building2, MessageCircle, Users } from 'lucide-react';
import { ProviderCard } from '../../../components/cards/SmartEntityCard';
import ConstitutionalSectionCards from '../../../components/ConstitutionalSectionCards';
import {
  getPublishedProviderCards,
  getUaeSectionCards,
} from '../../../lib/platformDirectoryCards';
import ProvidersDirectoryHero from '../../../components/ProvidersDirectoryHero';
import SectionBackBar from '../../../components/SectionBackBar';

const steps = [
  { t: 'Learn how joining works', d: 'Review the platform process and the information required for a business profile.', i: '01' },
  { t: 'Prepare business information', d: 'Share contact details, specialties, coverage, images and available projects.', i: '02' },
  { t: 'Publish the reviewed profile', d: 'The Biet Al Reef team reviews, prepares and publishes the profile in the correct section.', i: '03' }
];

export default function ProvidersEnglishPage({ providers = [], directoryCards = [] }) {
  return (
    <>
      <Head><title>Service Providers | Biet Al Reef</title><meta name="description" content="Browse Biet Al Reef service providers by specialty or register your business to appear inside the platform." /><meta name="robots" content="index, follow" /><link rel="canonical" href="https://bietalreef.ae/en/providers" /><link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/providers" /><link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/providers" /><meta property="og:title" content="Service Providers | Biet Al Reef" /><meta property="og:description" content="Browse verified service-provider profiles by specialty across Biet Al Reef." /><meta property="og:type" content="website" /><meta property="og:url" content="https://bietalreef.ae/en/providers" /><meta property="og:image" content="https://bietalreef.ae/images/providers-hero.webp" /><meta property="og:image:alt" content="Service Providers | Biet Al Reef" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="Service Providers | Biet Al Reef" /><meta name="twitter:image" content="https://bietalreef.ae/images/providers-hero.webp" /></Head>
      <EnglishLayout>
        <SectionBackBar locale="en" />
        <main dir="ltr" className="-mt-[1px] bg-[#FDFBF7] text-left [&>section:nth-of-type(2)]:hidden [&>section:nth-of-type(3)>div:first-child>p]:hidden">
          <ProvidersDirectoryHero locale="en" />
          <section className="relative isolate overflow-hidden bg-[#FDFBF7]"><div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]"><Image src="/images/providers-hero.webp" alt="Building, contracting and maintenance service providers inside Biet Al Reef" fill priority className="scale-[1.16] object-cover object-[52%_36%] -translate-y-[6%] md:scale-110 md:object-center md:-translate-y-[4%]" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/18 to-transparent" /><div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/50 via-[#FDFBF7]/8 to-transparent" /><Link href="/en" className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:left-8 md:top-8 md:px-4 md:py-3 md:text-sm"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></span>Back to home</Link><div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]"><div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm"><Users className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />Service providers gateway</div><h1 className="max-w-4xl text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] md:text-6xl">Make your business visible<br />where customers search for service</h1><div className="mt-5 max-w-4xl rounded-[2.1rem] border border-white/70 bg-white/64 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6"><p className="max-w-3xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">Biet Al Reef does not place you in a simple name list. It builds a clear digital presence that connects your activity with location, specialty, requests and visibility inside a UAE construction and maintenance platform.</p><div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"><Link href="/en/how-it-works" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105"><Building2 className="h-5 w-5" aria-hidden="true" /></span>Learn how the platform works</Link><a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105"><MessageCircle className="h-5 w-5" aria-hidden="true" /></span>Talk to onboarding</a></div></div></div></div></section>
          <section id="provider-sectors" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
            <div className="mb-8 text-center md:text-left">
              <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">7 main sectors</span>
              <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">Choose the sector closest to your business</h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">Choose an activity to reach the related provider specialties through a clear, database-backed journey.</p>
            </div>
            <ConstitutionalSectionCards cards={directoryCards} sectionKey="providers" locale="en" />
          </section>
          <section className="mx-auto max-w-6xl px-4 py-14"><div className="mb-10 text-center md:text-left"><span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00]">Real providers inside the platform</span><h2 className="mt-4 mb-3 text-3xl font-black text-[#0F3F1A]">Available providers now</h2><p className="leading-8 text-gray-500">These are the first real service provider profiles inside Biet Al Reef. Each card opens a real provider profile and a contact or quotation path.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2">{providers.map((provider) => <ProviderCard key={provider.id} item={provider} />)}</div></section>
          <section className="border-y border-[#E6DCC8] bg-white py-20"><div className="mx-auto max-w-6xl px-4 text-center"><h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">How do you join the Biet Al Reef network?</h2><p className="mb-12 text-gray-500">Simple steps to start your digital growth journey with us</p><div className="grid gap-12 md:grid-cols-3">{steps.map((step) => (<div key={step.i} className="relative text-center"><div className="absolute -top-10 left-1/2 z-0 -translate-x-1/2 text-8xl font-black text-gray-50">{step.i}</div><div className="relative z-10"><h3 className="mb-3 text-xl font-black text-[#0F3F1A]">{step.t}</h3><p className="text-sm leading-7 text-gray-500">{step.d}</p></div></div>))}</div></div></section>
          <ProvidersSmartFooter locale="en" directoryCards={directoryCards} />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps() {
  const [providers, directoryCards] = await Promise.all([
    getPublishedProviderCards('en'),
    getUaeSectionCards('en', 'providers'),
  ]);
  return {
    props: { providers, directoryCards },
    revalidate: 300,
  };
}
