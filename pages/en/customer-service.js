import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, FileText, Headphones, MessageCircle, Search, ShieldCheck, Sparkles } from 'lucide-react';

const supportPaths = [
  { title: 'Did not find the right provider?', desc: 'Send the service type and location, and Biet Al Reef will help you prepare a clearer path toward the right provider.', icon: Search },
  { title: 'Did not find the product or material?', desc: 'Write the product name, quantity or available specifications, and we will help route the request to the suitable supplier path.', icon: FileText },
  { title: 'Your request is not clear yet?', desc: 'You can send photos, measurements and notes, or use Weyaak later to organize the details before submitting.', icon: Bot },
];

const freeServicePoints = [
  'Customers can send quotation requests and inquiries through Biet Al Reef without platform fees.',
  'The request can be guided by emirate, service, product or provider type.',
  'Customers can contact support or Weyaak when they cannot find a suitable result.',
  'A request number appears after submission so the customer can keep it and follow up later.',
];

export default function EnglishCustomerServicePage() {
  const description = 'Customer service on Biet Al Reef is free. If you cannot find the right service, product or provider, send your request and the Biet Al Reef team or Weyaak will help you reach the right path.';

  return (
    <EnglishLayout>
      <Head>
        <title>Free Customer Service | Biet Al Reef</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/customer-service" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/customer-service" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/customer-service" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Free Customer Service on Biet Al Reef',
          url: 'https://bietalreef.ae/en/customer-service',
          description,
          inLanguage: 'en-AE',
        }) }} />
      </Head>

      <main dir="ltr" className="-mt-[1px] bg-[#FDFBF7] text-left text-gray-900">
        <section className="relative overflow-hidden bg-[#0F3F1A] px-4 py-16 text-white md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_32%)]" />
          <div className="relative mx-auto max-w-6xl">
            <Link href="/en" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/16">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F7E7A0]"><Sparkles className="h-4 w-4" /> Customer first</span>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Customer service on Biet Al Reef is free</h1>
                <p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-white/88 md:text-xl">If you did not find the right service, product or provider, do not leave without a clear path. Send your request now and the Biet Al Reef team or Weyaak will help organize the right route in the UAE.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/en/request-quote" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#102F18] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#E7C45A]">Send your request now<ArrowRight className="h-5 w-5" /></Link>
                  <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:bg-white/16"><MessageCircle className="h-5 w-5 text-[#F7E7A0]" />Contact support</a>
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-white/14 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <div className="rounded-[1.75rem] bg-white p-6 text-[#0F3F1A]">
                  <ShieldCheck className="mb-5 h-12 w-12 text-[#D4AF37]" />
                  <h2 className="text-2xl font-black">What does free mean?</h2>
                  <div className="mt-5 space-y-3">
                    {freeServicePoints.map((point) => (
                      <div key={point} className="flex gap-3 rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] p-4">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                        <p className="text-sm font-bold leading-7 text-gray-700">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-9 text-center md:text-left">
            <span className="text-sm font-black text-[#6F5400]">How we help</span>
            <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">Your request should not stop at an incomplete result</h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-gray-600 md:text-lg">Biet Al Reef makes every journey end with a clear path: search, request, support or guidance from Weyaak.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {supportPaths.map((item) => { const Icon = item.icon; return (
              <article key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-[#F7E7A0]"><Icon className="h-7 w-7" /></div>
                <h3 className="text-xl font-black text-[#0F3F1A]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p>
              </article>
            ); })}
          </div>
        </section>

        <section className="bg-white px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2.25rem] border border-[#E6DCC8] bg-[#FDFBF7] p-7 text-center shadow-sm md:p-10">
            <Headphones className="mx-auto mb-5 h-12 w-12 text-[#D4AF37]" />
            <h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">Our message to customers</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-9 text-gray-700">Using Biet Al Reef as a customer is free. We help you reach the right service, product or provider, while pricing plans are dedicated to providers who want to build digital presence inside the platform.</p>
          </div>
        </section>
      </main>
    </EnglishLayout>
  );
}
