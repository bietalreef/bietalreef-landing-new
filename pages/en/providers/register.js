import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';
import { ArrowLeft, BadgeCheck, BarChart3, Building2, FileText, MapPinned, ShieldCheck, Layers3, Sparkles } from 'lucide-react';

const features = [
  { title: 'Professional business profile', desc: 'Present your activity, service areas, specialties, work images and contact details in a clear provider profile.', icon: Building2 },
  { title: 'Location and service discovery', desc: 'Connect your presence with UAE Directory paths by emirate, area and service type instead of random visibility.', icon: MapPinned },
  { title: 'More organized requests', desc: 'Receive clearer requests with service type, location, images and project details before communication starts.', icon: FileText },
  { title: 'Trusted central management', desc: 'The Biet Al Reef team creates the page and updates its information, images and services after review and approval.', icon: Layers3 },
  { title: 'Trusted digital identity', desc: 'Your presence inside Biet Al Reef helps clients understand your business before they contact you.', icon: ShieldCheck },
  { title: 'Growth without direct commission', desc: 'The goal is to build sustainable digital presence, not a temporary ad that disappears when the budget ends.', icon: BarChart3 },
];

const steps = [
  'Review the benefits and the purpose of joining from this landing page.',
  'Prepare your business name, specialties, service areas, images and contact details.',
  'Send a business-profile request, then the Biet Al Reef team reviews, creates, publishes and maintains the page.',
];

export default function EnglishProviderRegisterPage() {
  return (
    <>
      <Head>
        <title>Request a Business Profile | Biet Al Reef</title>
        <meta name="description" content="Request a reviewed Biet Al Reef business profile with services, products, projects, coverage areas and clear contact details." />
        <link rel="canonical" href="https://bietalreef.ae/en/providers/register" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/providers/register" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/providers/register" />
      </Head>
      <EnglishLayout>
      <main dir="ltr" className="bg-[#FDFBF7] text-left">
        <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.28),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_34%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F4D46B]"><BadgeCheck size={16} /> Provider gateway</span>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Make your business visible where clients search for services</h1>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-white/88 md:text-xl">Biet Al Reef is not just a name listing. It builds a structured digital path that connects your business with location, specialty, requests and a platform focused on construction and maintenance in the UAE.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#provider-request" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#1F170D] shadow-lg shadow-[#D4AF37]/20 transition hover:-translate-y-0.5">Request your business profile<ArrowLeft className="h-5 w-5" /></a>
                <Link href="/en/contact" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/8 px-7 py-4 text-base font-black text-white transition hover:bg-white/14">Contact the team</Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/14 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-6 text-[#0F3F1A]">
                <Layers3 className="mb-5 h-12 w-12 text-[#D4AF37]" />
                <h2 className="text-2xl font-black">What does Biet Al Reef publish?</h2>
                <p className="mt-3 text-sm font-semibold leading-8 text-gray-600">A clear business page with the professional profile, services, products, projects, service areas and contact options after review and approval.</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-center text-xs font-black">
                  <span className="rounded-2xl bg-[#F7F2E8] px-3 py-3">Organized requests</span>
                  <span className="rounded-2xl bg-[#F7F2E8] px-3 py-3">Business profile</span>
                  <span className="rounded-2xl bg-[#F7F2E8] px-3 py-3">Service areas</span>
                  <span className="rounded-2xl bg-[#F7F2E8] px-3 py-3">Clear contact</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="mb-9 text-center">
            <span className="text-sm font-black text-[#6F5400]">Joining benefits</span>
            <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">Why join as a service provider?</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => { const Icon = feature.icon; return (
              <article key={feature.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Icon className="h-7 w-7" /></div>
                <h3 className="text-xl font-black text-[#0F3F1A]">{feature.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{feature.desc}</p>
              </article>
            ); })}
          </div>
        </section>

        <section className="bg-white px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-black text-[#6F5400]">Before requesting the profile</span>
              <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">A clear joining path</h2>
              <p className="mt-5 text-base font-semibold leading-9 text-gray-600">Contact the Biet Al Reef team and send the basic information. The team creates a draft with a provider ID, reviews the content and images with you, then publishes the page after approval.</p>
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-[1.5rem] border border-[#E6DCC8] bg-[#FDFBF7] p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-black text-[#1F170D]">{index + 1}</span>
                  <p className="font-bold leading-8 text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="provider-request" className="mx-auto max-w-5xl px-4 py-14 text-center md:py-20">
          <div className="rounded-[2.5rem] border border-[#E6DCC8] bg-white p-8 shadow-xl md:p-12">
            <Sparkles className="mx-auto mb-5 h-12 w-12 text-[#D4AF37]" />
            <h2 className="text-3xl font-black text-[#0F3F1A] md:text-5xl">Ready to request your business profile?</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-9 text-gray-600">Contact Biet Al Reef to choose the suitable plan and prepare your business page, service cards, products and projects in a clear structure.</p>
            <Link href="/en/contact?source=provider-request" className="mt-8 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#143D1F]">Contact the Biet Al Reef team<ArrowLeft className="h-5 w-5" /></Link>
          </div>
        </section>
      </main>
      </EnglishLayout>
    </>
  );
}
