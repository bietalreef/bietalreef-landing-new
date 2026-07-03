import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from './EnglishLayout';
import { ArrowLeft } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

export default function EnglishGenericPage({ title, description, path = '/en', ctaHref = '/en', ctaLabel = 'Back to English home', children }) {
  const canonical = `${SITE_URL}${path}`;

  return (
    <>
      <Head>
        <title>{title} | Biet Al Reef</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={SITE_URL} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          url: canonical,
          inLanguage: 'en-AE',
          description,
          isPartOf: { '@type': 'WebSite', name: 'Biet Al Reef', url: SITE_URL },
        }) }} />
      </Head>
      <EnglishLayout>
        <main className="mx-auto max-w-7xl px-4 py-12 md:py-20">
          <section className="rounded-[2.5rem] border border-[#E6DCC8] bg-white p-7 text-center shadow-sm md:p-12">
            <span className="inline-flex rounded-full bg-[#F7F2E8] px-4 py-2 text-xs font-black text-[#6F5400]">English · Arabic-first interface</span>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">{title}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-gray-700 md:text-lg">{description}</p>
            <div className="mt-8 flex justify-center">
              <Link href={ctaHref} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#143D1F]">
                {ctaLabel}
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </section>
          {children}
        </main>
      </EnglishLayout>
    </>
  );
}
