import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { ArrowLeft, ChevronDown, FileText, Home, Mail, Scale, ShieldCheck } from 'lucide-react';

const LEGAL_LINKS = [
  { href: '/privacy', label: 'سياسة الخصوصية' },
  { href: '/legal', label: 'شروط الاستخدام' },
  { href: '/cookies', label: 'سياسة ملفات الارتباط' },
];

const UAE_FRAMEWORK = [
  'قانون حماية البيانات الشخصية في دولة الإمارات',
  'قانون المعاملات الإلكترونية وخدمات الثقة',
  'قانون حماية المستهلك والتجارة القائمة على وسائل التقنية الحديثة',
  'تشريعات مكافحة الجرائم الإلكترونية والاحتيال والوصول غير المصرح به',
];

const glassButton = 'inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-5 py-3 font-black text-[#0F3F1A] shadow-[0_12px_30px_rgba(92,70,20,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_38px_rgba(92,70,20,0.16),inset_0_1px_0_rgba(255,255,255,1)]';

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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="ar-AE" href={canonical} />
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
          <section className="relative overflow-hidden border-b border-[#E6DCC8] bg-[#F7F1E6]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.22),transparent_31%),radial-gradient(circle_at_bottom_right,rgba(15,63,26,0.10),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(247,241,230,0.96))]" />
            <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-5 md:pb-20 md:pt-7">
              <div className="mb-8 flex justify-start">
                <Link href="/" className={glassButton} aria-label="العودة إلى الصفحة الرئيسية">
                  <Home className="h-5 w-5" />
                  العودة إلى الرئيسية
                </Link>
              </div>

              <div className="mx-auto max-w-4xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-white/65 px-4 py-2 text-xs font-black text-[#7A5A00] shadow-[0_10px_28px_rgba(92,70,20,0.10),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/80 bg-white/80 shadow-[0_7px_18px_rgba(92,70,20,0.12),inset_0_1px_0_rgba(255,255,255,1)]">
                    <Scale className="h-4 w-4" />
                  </span>
                  {badge}
                </span>
                <h1 className="mt-6 text-3xl font-black leading-[1.35] text-[#102F18] sm:text-4xl md:text-6xl">{title}</h1>
                <p className="mx-auto mt-6 max-w-4xl text-base leading-9 text-gray-700 md:text-lg md:leading-10">{intro}</p>
                <p className="mt-4 text-sm font-black text-[#8A6900]">آخر تحديث: {effectiveDate}</p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-8" aria-label="التنقل بين الصفحات القانونية">
            <div className="grid gap-3 sm:grid-cols-3">
              {LEGAL_LINKS.map((item) => {
                const active = canonical.endsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex min-h-[52px] items-center justify-center rounded-2xl border px-5 py-3 text-center text-sm font-black shadow-[0_10px_24px_rgba(92,70,20,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 ${active ? 'border-[#D4AF37] bg-[#FFF7D6] text-[#0F3F1A]' : 'border-white/80 bg-white/70 text-gray-700 hover:border-[#D4AF37]/65 hover:bg-white hover:text-[#0F3F1A]'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 pb-16">
            <div className="rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-[0_18px_50px_rgba(56,42,12,0.10),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white bg-[#FFF7D6] text-[#0F3F1A] shadow-[0_9px_24px_rgba(92,70,20,0.12),inset_0_1px_0_rgba(255,255,255,1)]">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#0F3F1A] md:text-2xl">المرجعية النظامية</h2>
                  <p className="mt-3 text-sm leading-8 text-gray-700 md:text-base">تم إعداد هذه الوثيقة لتعمل ضمن الإطار القانوني المعمول به في دولة الإمارات، بما يشمل — حيثما ينطبق — ما يلي:</p>
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">
                    {UAE_FRAMEWORK.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/80 bg-[#FFFDFC]/85 p-4 text-sm leading-7 text-gray-700 shadow-[0_8px_22px_rgba(56,42,12,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white bg-white text-[#0F3F1A] shadow-[0_7px_18px_rgba(92,70,20,0.10)]">
                          <ShieldCheck className="h-5 w-5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {sections.map((section, index) => (
                <details key={section.title} open={index < 3} className="group overflow-hidden rounded-[2rem] border border-white/85 bg-white/78 shadow-[0_16px_42px_rgba(56,42,12,0.08),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl transition duration-300 open:bg-white">
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-7 [&::-webkit-details-marker]:hidden">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white bg-[#FFF3CC] text-[#0F3F1A] shadow-[0_8px_22px_rgba(92,70,20,0.12),inset_0_1px_0_rgba(255,255,255,1)]">
                      {index % 2 === 0 ? <ShieldCheck className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                    </div>
                    <h2 className="min-w-0 flex-1 text-lg font-black leading-8 text-[#0F3F1A] md:text-2xl">{section.title}</h2>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white bg-white/85 text-[#9A7600] shadow-[0_7px_18px_rgba(92,70,20,0.10)]">
                      <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                    </span>
                  </summary>

                  <div className="border-t border-[#EFE7D8] px-5 pb-7 pt-2 md:px-7 md:pb-9">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-sm leading-8 text-gray-700 md:text-base md:leading-9">{paragraph}</p>
                    ))}
                    {section.items?.length ? (
                      <ul className="mt-5 space-y-3">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 rounded-2xl border border-[#EFE7D8] bg-[#FFFDFC] px-4 py-3 text-sm leading-8 text-gray-700 md:text-base">
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

            <aside className="mt-8 rounded-[2rem] border border-white/85 bg-white/78 p-7 shadow-[0_18px_50px_rgba(56,42,12,0.10),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl md:p-9">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white bg-[#FFF3CC] text-[#0F3F1A] shadow-[0_8px_22px_rgba(92,70,20,0.12)]">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-black text-[#0F3F1A] md:text-2xl">الاستفسارات القانونية والخصوصية</h2>
                  <p className="mt-3 leading-8 text-gray-700">لأي استفسار أو طلب متعلق بالبيانات أو هذه السياسات، استخدم إحدى القنوات الرسمية التالية.</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <a href="mailto:legal@bietalreef.ae" className={glassButton} aria-label="إرسال بريد إلى القسم القانوني">
                      <Mail className="h-5 w-5" />
                      legal@bietalreef.ae
                    </a>
                    <Link href="/contact" className={glassButton} aria-label="الانتقال إلى صفحة تواصل معنا">
                      تواصل معنا
                      <ArrowLeft className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
