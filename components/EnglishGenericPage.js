import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from './EnglishLayout';
import { ArrowLeft, CheckCircle2, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

export default function EnglishGenericPage({ title, description, path = '/en', ctaHref = '/en', ctaLabel = 'Back to English home', children }) {
  const canonical = `${SITE_URL}${path}`;
  const points = [
    'The English page keeps the same Biet Al Reef visual identity used across the Arabic website.',
    'The content is organized for a clear visitor journey without visual breaks or scattered text.',
    'Each page keeps a simple next action that matches the platform structure.',
  ];

  return (
    <>
      <Head>
        <title>{title} | Biet Al Reef</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={SITE_URL} />
        <link rel="alternate" hrefLang="en-AE" href={canonical} />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_36%),linear-gradient(135deg,rgba(15,63,26,1),rgba(7,30,17,1))]" />
            <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24 md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F3D46B]">
                <Sparkles className="h-4 w-4" />
                Biet Al Reef
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.12] tracking-[-0.02em] md:text-6xl">{title}</h1>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/88 md:text-xl md:leading-9">{description}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                <Link href={ctaHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#0F3F1A] shadow-lg transition hover:scale-[1.02]">
                  {ctaLabel}
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link href="/en/uae" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:bg-white/15">
                  UAE Directory
                  <Compass className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black leading-tight text-gray-900 md:text-3xl">What this page explains</h2>
                <p className="mt-5 text-base font-semibold leading-8 text-gray-600">{description}</p>
              </article>

              <aside className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-7 shadow-sm md:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/25 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black leading-tight text-gray-900">Biet Al Reef rule</h2>
                <p className="mt-4 font-semibold leading-8 text-gray-700">The page should stay clear, ordered and visually consistent with the Arabic version.</p>
              </aside>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-black leading-tight text-[#0F3F1A] md:text-3xl">Key points</h2>
              <p className="mt-3 font-semibold leading-8 text-gray-600">A direct summary for visitors and search engines.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {points.map((point) => (
                <div key={point} className="rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CheckCircle2 className="mb-4 h-7 w-7 text-primary" />
                  <p className="text-sm font-semibold leading-8 text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {children ? <section className="mx-auto max-w-6xl px-4 py-12">{children}</section> : null}
        </main>
      </EnglishLayout>
    </>
  );
}
