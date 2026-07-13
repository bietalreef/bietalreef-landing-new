import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { ArrowRight, FileText, Home, Mail, Scale, ShieldCheck } from 'lucide-react';

const LEGAL_LINKS = [
  { href: '/privacy', label: 'سياسة الخصوصية' },
  { href: '/legal', label: 'شروط الاستخدام' },
  { href: '/cookies', label: 'سياسة ملفات الارتباط' },
];

export default function PlatformLegalPage({
  title,
  description,
  canonical,
  badge,
  intro,
  sections,
  effectiveDate = '13 يوليو 2026',
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${title} | بيت الريف`,
    description,
    url: canonical,
    inLanguage: 'ar-AE',
    isPartOf: {
      '@type': 'WebSite',
      name: 'بيت الريف',
      url: 'https://bietalreef.ae',
    },
    dateModified: '2026-07-13',
  };

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${title} | بيت الريف`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="ar_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#F8F4EC] text-gray-900">
        <Navbar />

        <main>
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
                  <p className="mt-4 text-sm font-bold text-[#F3D46B]">آخر تحديث: {effectiveDate}</p>
                </div>

                <Link href="/" className="inline-flex min-h-[50px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-black text-white backdrop-blur transition hover:bg-white/15">
                  <Home className="h-5 w-5" />
                  العودة إلى الرئيسية
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
            <div className="space-y-5">
              {sections.map((section, index) => (
                <article key={section.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-9">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF3CC] text-[#0F3F1A]">
                      {index % 2 === 0 ? <ShieldCheck className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-black text-[#0F3F1A] md:text-2xl">{section.title}</h2>
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
                  </div>
                </article>
              ))}
            </div>

            <aside className="mt-8 rounded-[2rem] border border-[#D7C48D] bg-[#FFF8E5] p-7 md:p-9">
              <h2 className="text-xl font-black text-[#0F3F1A]">الاستفسارات القانونية والخصوصية</h2>
              <p className="mt-3 leading-8 text-gray-700">لأي استفسار أو طلب متعلق بالبيانات أو هذه السياسات، تواصل معنا عبر القنوات الرسمية.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:legal@bietalreef.ae" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-5 py-3 font-black text-white">
                  <Mail className="h-5 w-5" />
                  legal@bietalreef.ae
                </a>
                <Link href="/contact" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#D7C48D] bg-white px-5 py-3 font-black text-[#0F3F1A]">
                  تواصل معنا
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </aside>

            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
              هذه الصفحات تنظّم استخدام منصة بيت الريف، ولا تُعد بديلاً عن الاستشارة القانونية المتخصصة. يجب اعتماد الصياغة النهائية من مستشار قانوني مرخص في دولة الإمارات قبل الإطلاق التجاري الكامل أو معالجة المدفوعات والعقود الملزمة.
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
