import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../EnglishLayout';
import { ArrowLeft, ChevronDown, FileText, Home, Mail, Scale, ShieldCheck } from 'lucide-react';

const LEGAL_LINKS = [
  { href: '/en/privacy', label: 'Privacy Policy' },
  { href: '/en/legal', label: 'Terms of Use' },
  { href: '/en/cookies', label: 'Cookie Policy' },
];

const UAE_FRAMEWORK = [
  'UAE Personal Data Protection Law',
  'Electronic Transactions and Trust Services legislation',
  'Consumer protection and modern technology-based trade legislation',
  'Cybercrime, fraud and unauthorised-access legislation',
];

export default function EnglishPlatformLegalPage({
  title,
  description,
  path,
  arabicPath,
  badge,
  intro,
  sections,
  effectiveDate = '13 July 2026',
}) {
  const canonical = `https://bietalreef.ae${path}`;
  const arabicCanonical = `https://bietalreef.ae${arabicPath}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${title} | Biet Al Reef`,
    description,
    url: canonical,
    inLanguage: 'en-AE',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Biet Al Reef',
      url: 'https://bietalreef.ae',
    },
    dateModified: '2026-07-13',
  };

  return (
    <>
      <Head>
        <title>{title} | Biet Al Reef</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={arabicCanonical} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href={arabicCanonical} />
        <meta property="og:title" content={`${title} | Biet Al Reef`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="en_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="min-h-screen bg-[#F8F4EC] text-left text-gray-900">
          <section className="relative overflow-hidden border-b border-[#E6DCC8] bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.22),transparent_34%),linear-gradient(135deg,#0F3F1A,#071E11)]" />
            <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-4xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F3D46B]">
                    <Scale className="h-4 w-4" />
                    {badge}
                  </span>
                  <h1 className="mt-6 text-3xl font-black leading-tight md:text-6xl">{title}</h1>
                  <p className="mt-6 max-w-4xl text-base leading-9 text-white/85 md:text-lg">{intro}</p>
                  <p className="mt-4 text-sm font-bold text-[#F3D46B]">Last updated: {effectiveDate}</p>
                </div>

                <Link href="/en" className="inline-flex min-h-[50px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-black text-white backdrop-blur transition hover:bg-white/15">
                  <Home className="h-5 w-5" />
                  Back to home
                </Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-wrap gap-3">
              {LEGAL_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full border px-5 py-3 text-sm font-black transition ${canonical.endsWith(item.href) ? 'border-[#D4AF37] bg-[#FFF7D6] text-[#0F3F1A]' : 'border-[#E6DCC8] bg-white text-gray-700 hover:border-primary hover:text-primary'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 pb-16">
            <div className="rounded-[2rem] border border-[#BEE8CE] bg-[#EDFFF4] p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0F3F1A] shadow-sm">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#0F3F1A]">Applicable legal framework</h2>
                  <p className="mt-3 text-sm leading-8 text-gray-700 md:text-base">This document is structured to operate within the laws applicable in the United Arab Emirates, including, where relevant:</p>
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">
                    {UAE_FRAMEWORK.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl border border-[#CFEEDA] bg-white/75 p-4 text-sm leading-7 text-gray-700">
                        <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {sections.map((section, index) => (
                <details key={section.title} open={index < 3} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-6 md:p-8 [&::-webkit-details-marker]:hidden">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF3CC] text-[#0F3F1A]">
                      {index % 2 === 0 ? <ShieldCheck className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                    </div>
                    <h2 className="min-w-0 flex-1 text-lg font-black text-[#0F3F1A] md:text-2xl">{section.title}</h2>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#9A7600] transition-transform duration-300 group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-[#EFE7D8] px-6 pb-7 pt-2 md:px-8 md:pb-9">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-sm leading-8 text-gray-700 md:text-base">{paragraph}</p>
                    ))}
                    {section.items?.length ? (
                      <ul className="mt-5 space-y-3">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-8 text-gray-700 md:text-base">
                            <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>

            <aside className="mt-8 rounded-[2rem] border border-[#D7C48D] bg-[#FFF8E5] p-7 md:p-9">
              <h2 className="text-xl font-black text-[#0F3F1A]">Legal and privacy enquiries</h2>
              <p className="mt-3 leading-8 text-gray-700">For enquiries or requests relating to personal data or these policies, contact us through the official channels.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:legal@bietalreef.ae" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-5 py-3 font-black text-white">
                  <Mail className="h-5 w-5" />
                  legal@bietalreef.ae
                </a>
                <Link href="/en/contact" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#D7C48D] bg-white px-5 py-3 font-black text-[#0F3F1A]">
                  Contact us
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </div>
            </aside>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}
