import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import FAQ from './FAQ';
import SEOHead from './SEOHead';
import { ArrowLeft, CheckCircle2, Compass, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

export default function ArabicGenericPage({
  title,
  description,
  path,
  englishPath,
  badge = 'بيت الريف',
  intent,
  points,
  steps,
  related,
  faqs,
  ctaHref = '/contact',
  ctaLabel = 'تواصل معنا',
  children,
}) {
  const pagePoints = points || [
    'معلومات واضحة ومنظمة تساعد الزائر على فهم القسم دون تشتت.',
    'مسار يرتبط باحتياج العميل والخدمة والموقع المناسب.',
    'خطوة تالية واضحة داخل موقع بيت الريف.',
  ];
  const pageSteps = steps || ['راجع المعلومات', 'اختر المسار المناسب', 'تواصل مع فريق بيت الريف'];
  const pageRelated = related || [
    { href: '/about', label: 'عن بيت الريف' },
    { href: '/uae', label: 'دليل الإمارات' },
    { href: '/contact', label: 'تواصل معنا' },
  ];
  const faqItems = faqs || [
    [`ما هو قسم ${title}؟`, description],
    ['كيف أستفيد من هذه الصفحة؟', 'راجع المعلومات ثم استخدم الروابط ذات الصلة أو الإجراء الرئيسي للانتقال إلى المسار الأنسب داخل بيت الريف.'],
  ];
  const canonical = `${SITE_URL}${path}`;
  const pageTitle = `${title} | بيت الريف`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description,
    url: canonical,
    inLanguage: 'ar-AE',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'بيت الريف',
      alternateName: 'منصة بيت الريف',
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

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={description}
        canonicalPath={path}
        alternatePath={englishPath}
        structuredData={jsonLd}
      />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-right text-gray-900">
        <Navbar />
        <main>
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_34%),linear-gradient(135deg,rgba(15,63,26,1),rgba(7,30,17,1))]" />
            <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24 md:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F3D46B]"><Sparkles className="h-4 w-4" />{badge}</span>
              <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight md:text-6xl">{title}</h1>
              <p className="mt-6 max-w-4xl text-lg leading-9 text-white/90 md:text-xl">{description}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                <Link href={ctaHref} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 font-black text-[#0F3F1A]">{ctaLabel}<ArrowLeft className="h-5 w-5" /></Link>
                <Link href="/uae" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-black text-white">دليل الإمارات<Compass className="h-5 w-5" /></Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><FileText className="h-6 w-6" /></div>
                <h2 className="text-2xl font-black md:text-3xl">ما الذي تحتاج إلى معرفته؟</h2>
                <p className="mt-5 text-base leading-9 text-gray-600">{intent || description}</p>
              </article>
              <aside className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-7 shadow-sm md:p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/25 text-primary"><ShieldCheck className="h-6 w-6" /></div>
                <h2 className="text-xl font-black">التزامنا</h2>
                <p className="mt-4 leading-8 text-gray-700">نقدم المعلومات بوضوح، ونراجع بيانات النشاط قبل النشر، ونتجنب الوعود غير المؤكدة بالأسعار أو الجودة أو نتائج التعاقد.</p>
              </aside>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <h2 className="text-2xl font-black md:text-3xl">النقاط الأساسية</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {pagePoints.map((point) => <div key={point} className="rounded-3xl border border-[#E6DCC8] bg-white p-6 shadow-sm"><CheckCircle2 className="mb-4 h-7 w-7 text-primary" /><p className="text-sm font-semibold leading-8 text-gray-700">{point}</p></div>)}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="rounded-[2rem] bg-[#0F3F1A] p-7 text-white md:p-10">
              <h2 className="text-2xl font-black md:text-3xl">الخطوات</h2>
              <div className={`mt-8 grid gap-4 ${pageSteps.length > 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                {pageSteps.map((step, index) => <div key={step} className="rounded-3xl border border-white/10 bg-white/10 p-5"><span className="text-sm font-black text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-3 text-lg font-black">{step}</h3></div>)}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-6">
            <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
              <h2 className="text-2xl font-black">انتقل إلى القسم المناسب</h2>
              <div className="mt-6 flex flex-wrap gap-3">{pageRelated.map((item) => <Link key={item.href} href={item.href} className="rounded-full border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 hover:border-primary hover:text-primary">{item.label}</Link>)}</div>
            </div>
          </section>
          <FAQ items={faqItems} title={`أسئلة شائعة حول ${title}`} />
          {children ? <section className="mx-auto max-w-6xl px-4 py-12">{children}</section> : null}
        </main>
        <Footer />
      </div>
    </>
  );
}