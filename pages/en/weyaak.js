import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, Building2, CheckCircle2, FileText, MessageCircle, Sparkles } from 'lucide-react';
import EnglishLayout from '../../components/EnglishLayout';

const SITE_URL = 'https://bietalreef.ae';
const WEYAAK_LOGO = '/images/weyaak-new-logo.jpg';

const actions = [
  { title: 'Request a quotation', desc: 'Send your project need to Biet Al Reef in a structured way.', href: '/en/request-quote?source=weyaak', icon: FileText },
  { title: 'Send an inquiry', desc: 'Ask about a service, provider, product, or how to start.', href: '/en/inquiry?source=weyaak', icon: MessageCircle },
  { title: 'Provider app access', desc: 'Understand the provider benefits first, then open the app from the registration landing page.', href: '/en/providers/register?source=weyaak-en-page', icon: Building2 },
];

export default function EnglishWeyaakPage() {
  const title = 'Weyaak Smart Assistant | Biet Al Reef';
  const description = 'Weyaak is the smart assistant layer for Biet Al Reef, helping customers and providers organize construction, maintenance, interior design, and quotation requests in the UAE.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}/en/weyaak`,
    inLanguage: 'en-AE',
    isPartOf: { '@type': 'WebSite', name: 'Biet Al Reef', url: SITE_URL },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/en/weyaak`} />
        <link rel="alternate" hrefLang="ar-AE" href={`${SITE_URL}/weyaak`} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en/weyaak`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/en/weyaak`} />
        <meta property="og:image" content={`${SITE_URL}/og-weyaak.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <EnglishLayout>
        <main className="english-readable bg-[#F8F3E7] text-[#1F3D2B]">
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
              <div className="text-center md:text-right">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white px-4 py-2 text-sm font-black text-[#7A5B0A] shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  Official Weyaak council
                </div>
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.8rem] border border-[#E6DCC8] bg-white shadow-inner md:mx-0">
                  <Image src={WEYAAK_LOGO} alt="Weyaak doorway logo" width={86} height={86} className="h-20 w-20 object-contain" priority />
                </div>
                <h1 className="text-4xl font-black leading-tight md:text-6xl">
                  Weyaak
                  <span className="block text-[#B99420]">the smart assistant layer</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg font-bold leading-9 text-[#5F6F65] md:mx-0">
                  Weyaak helps visitors and providers turn a loose need into a clear path: quotation request, inquiry, business-profile request, or the right Biet Al Reef section.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                  <Link href="/en/request-quote?source=weyaak-hero" className="rounded-2xl bg-[#0F8A3B] px-7 py-4 text-base font-black text-white shadow-lg">
                    Start with Weyaak
                  </Link>
                  <Link href="/en/inquiry?source=weyaak-hero" className="rounded-2xl border border-[#E6DCC8] bg-white px-7 py-4 text-base font-black text-[#1F3D2B] shadow-sm">
                    Ask Weyaak
                  </Link>
                </div>
              </div>

              <div className="mx-auto w-full max-w-md rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-2xl shadow-[#1F3D2B]/10">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-[#102A1E] to-[#1F3D2B] p-5 text-white">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-inner">
                      <Image src={WEYAAK_LOGO} alt="Weyaak AI" width={58} height={58} className="h-14 w-14 object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#F7E6A0]">Weyaak AI</p>
                      <h2 className="text-xl font-black">Hello, I am Weyaak 👋</h2>
                    </div>
                  </div>
                  <p className="text-sm font-bold leading-7 text-white/80">
                    I help organize the request, choose the service path, and prepare the right details before contacting Biet Al Reef.
                  </p>
                </div>
                <div id="weyaak-live-chat" className="mt-5 rounded-[1.5rem] border border-dashed border-[#D4AF37]/60 bg-[#FFF8E7] p-5 text-center">
                  <MessageCircle className="mx-auto h-8 w-8 text-[#B99420]" />
                  <h3 className="mt-3 text-lg font-black text-[#1F3D2B]">Original Weyaak connection area</h3>
                  <p className="mt-2 text-sm font-bold leading-7 text-[#5F6F65]">
                    This area is ready to host the real Weyaak chat when it is moved into the official page.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-7 text-center">
                <p className="text-sm font-black text-[#B99420]">Quick actions</p>
                <h2 className="mt-2 text-3xl font-black text-[#1F3D2B]">What do you need from Weyaak?</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {actions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.title} href={item.href}>
                      <div className="h-full rounded-[1.5rem] border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F3E7] text-[#B99420]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-black text-[#1F3D2B]">{item.title}</h3>
                        <p className="mt-3 text-sm font-bold leading-7 text-[#5F6F65]">{item.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 pb-14">
            <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-7 shadow-sm md:p-10">
              <p className="text-sm font-black text-[#B99420]">Current phase rules</p>
              <h2 className="mt-2 text-3xl font-black text-[#1F3D2B]">A simple assistant gateway, not a complex operating engine yet.</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {['Quotation requests', 'Customer inquiries', 'Guiding visitors to the right section', 'Helping providers understand registration steps'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#F8F3E7] p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F8A3B]" />
                    <p className="text-sm font-bold leading-7 text-[#1F3D2B]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}
