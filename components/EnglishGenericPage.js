import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from './EnglishLayout';
import FAQ from './FAQ';
import { ArrowLeft, CheckCircle2, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

function isExternalHref(href) {
  return href?.startsWith('http') || href?.startsWith('tel:') || href?.startsWith('mailto:');
}

function SmartLink({ href, children, className }) {
  if (isExternalHref(href)) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

export default function EnglishGenericPage({
  title,
  description,
  path = '/en',
  arabicPath = '/',
  badge = 'Biet Al Reef',
  intent,
  points,
  steps,
  related,
  faqs,
  ctaHref = '/en',
  ctaLabel = 'Back to English home',
  secondaryHref = '/en/uae',
  secondaryLabel = 'UAE Directory',
  children,
}) {
  const canonical = `${SITE_URL}${path}`;
  const arabicCanonical = `${SITE_URL}${arabicPath}`;
  const pagePoints = points || [
    'The page presents the information clearly and keeps the visitor journey easy to follow.',
    'The content is organised around the customer need, the service and the location.',
    'Each page offers a clear next step that matches the Biet Al Reef platform structure.',
  ];
  const pageSteps = steps || ['Review the information', 'Choose the relevant path', 'Move to the next step'];
  const pageRelated = related || [
    { href: '/en/about', label: 'About Biet Al Reef' },
    { href: '/en/uae', label: 'UAE Directory' },
    { href: '/en/contact', label: 'Contact us' },
  ];
  const faqItems = faqs || [
    [`What is ${title}?`, description],
    ['How can I use this page?', 'Review the information, then use the related links or the main action to continue through the most suitable path.'],
  ];

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
      url: SITE_URL,
    },
    mainEntity: faqItems.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  const journeyGridClass = pageSteps.length > 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 md:grid-cols-3';

  return (
    <>
      <Head>
        <title>{title} | Biet Al Reef</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
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
        <main dir="ltr" className="bg-[#FDFBF7] text-left text-gray-900 font-sans">
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_34%),linear-gradient(135deg,rgba(15,63,26,1),rgba(7,30,17,1))]" />
            <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24 md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F3D46B]">
                <Sparkles className="h-4 w-4" />
                {badge}
              </span>
              <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight md:text-6xl">{title}</h1>
              <p className="mt-6 max-w-4xl text-lg leading-9 text-white/90 md:text-xl">{description}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
                <SmartLink href={ctaHref} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#0F3F1A] shadow-lg transition hover:scale-[1.02]">
                  {ctaLabel}
                  <ArrowLeft className="h-5 w-5" />
                </SmartLink>
                <Link href={secondaryHref} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:bg-white/15">
                  {secondaryLabel}
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
                <h2 className="text-2xl font-black text-gray-900 md:text-3xl">What you need to know</h2>
                <p className="mt-5 text-base leading-9 text-gray-600">{intent || description}</p>
              </article>

              <aside className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-7 shadow-sm md:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/25 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black text-gray-900">Our commitment</h2>
                <p className="mt-4 leading-8 text-gray-700">We present information clearly, review business data before publication and avoid unverified promises about prices, quality or contracting results.</p>
              </aside>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-black md:text-3xl">Key points</h2>
              <p className="mt-3 leading-8 text-gray-600">Clear information to help you choose the most suitable next step.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {pagePoints.map((point) => (
                <div key={point} className="rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CheckCircle2 className="mb-4 h-7 w-7 text-primary" />
                  <p className="text-sm font-semibold leading-8 text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="rounded-[2rem] bg-[#0F3F1A] p-7 text-white md:p-10">
              <h2 className="text-2xl font-black md:text-3xl">Steps</h2>
              <div className={`mt-8 grid gap-4 ${journeyGridClass}`}>
                {pageSteps.map((step, index) => (
                  <div key={step} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                    <span className="text-sm font-black text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 text-lg font-black">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
              <h2 className="text-2xl font-black text-gray-900">Continue to the relevant section</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {pageRelated.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-full border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 transition hover:border-primary hover:text-primary">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <FAQ items={faqItems} title={`Frequently asked questions about ${title}`} />
          {children ? <section className="mx-auto max-w-6xl px-4 py-12">{children}</section> : null}
        </main>
      </EnglishLayout>
    </>
  );
}
