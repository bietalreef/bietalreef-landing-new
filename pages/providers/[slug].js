import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { providers } from '../../data/providers';
import { getEmirate, getArea } from '../../data/siteTaxonomy';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ShieldCheck, MapPin, Clock, Phone, MessageCircle, Award, Gem, ChevronDown, ExternalLink, CheckCircle2, Hammer, Layers, Users } from 'lucide-react';

export default function ProviderPage({ provider, emirate, area }) {
  if (!provider) {
    return (
      <>
        <Head><title>مزود الخدمة غير موجود | بيت الريف</title></Head>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
          <div className="text-center"><h1 className="text-3xl font-black text-[#0F3F1A] mb-4">مزود الخدمة غير موجود</h1><Link href="/providers" className="text-[#B8922B] font-black hover:underline">العودة إلى قائمة المزودين</Link></div>
        </div>
        <Footer />
      </>
    );
  }

  const providerUrl = `https://bietalreef.ae/providers/${provider.slug}`;
  const providerLogo = provider.logo ? `https://bietalreef.ae${provider.logo}` : 'https://bietalreef.ae/logo.png';
  const providerCover = provider.cover ? `https://bietalreef.ae${provider.cover}` : providerLogo;
  const whatsappDigits = provider.whatsapp?.replace(/\D/g, '') || '';
  const areaName = area?.nameAr || 'مدينة العين';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${providerUrl}#business`,
    name: provider.nameAr,
    alternateName: provider.nameEn,
    description: provider.descriptionAr,
    url: providerUrl,
    telephone: provider.phone,
    logo: providerLogo,
    image: providerCover,
    address: { '@type': 'PostalAddress', streetAddress: areaName, addressLocality: 'العين', addressRegion: 'أبوظبي', addressCountry: 'AE' },
    areaServed: provider.serviceAreas || [],
    contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Service', telephone: provider.phone, availableLanguage: ['ar', 'en'] },
    sameAs: whatsappDigits ? [`https://wa.me/${whatsappDigits}`] : [],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (provider.faq || []).map((item) => ({ '@type': 'Question', name: item.questionAr, acceptedAnswer: { '@type': 'Answer', text: item.answerAr } })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://bietalreef.ae' },
      { '@type': 'ListItem', position: 2, name: 'مزودو الخدمات', item: 'https://bietalreef.ae/providers' },
      { '@type': 'ListItem', position: 3, name: provider.nameAr, item: providerUrl },
    ],
  };

  const allSchemas = JSON.stringify([localBusinessSchema, faqSchema, breadcrumbSchema]);

  return (
    <>
      <Head>
        <title>{provider.nameAr} | مصنع رخام وجرانيت في العين | بيت الريف</title>
        <meta name="description" content={provider.descriptionAr} />
        <meta name="keywords" content={`${provider.nameAr}, رخام العين, جرانيت أبوظبي, كوارتز الإمارات, مصنع رخام, تركيب رخام, واجهات رخامية, أرضيات رخام, مطابخ رخام`} />
        <link rel="canonical" href={providerUrl} />
        <link rel="alternate" hrefLang="ar-AE" href={providerUrl} />
        <link rel="alternate" hrefLang="en-AE" href={`https://bietalreef.ae/en/providers/${provider.slug}`} />
        <meta property="og:title" content={`${provider.nameAr} | مصنع رخام وجرانيت`} />
        <meta property="og:description" content={provider.descriptionAr} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={providerUrl} />
        <meta property="og:image" content={providerCover} />
        <meta property="og:locale" content="ar_AE" />
        <meta property="og:site_name" content="بيت الريف" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: allSchemas }} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <section className="bg-gradient-to-b from-[#151713] via-[#22251f] to-[#FDFBF7] px-4 pt-3 pb-8 md:pt-5 md:pb-12">
            <div className="mx-auto max-w-6xl">
              <Link href="/providers" className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8922B]/30 bg-white px-4 py-2 text-sm font-black text-[#0F3F1A] shadow-sm transition hover:bg-[#FFF8E5]">
                <ChevronDown className="h-4 w-4 rotate-90" />
                العودة إلى مزودي الخدمات
              </Link>

              <div className="overflow-hidden rounded-[2.25rem] border border-[#D4AF37]/40 bg-gradient-to-br from-[#171914] via-[#252820] to-[#3a3b32] shadow-2xl shadow-black/25">
                <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="p-6 md:p-10 lg:p-12">
                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-1.5 text-xs font-black text-[#F4D978]"><Gem className="h-3.5 w-3.5" /> الحضور الاحترافي</span>
                      {provider.verified && <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-black text-emerald-200"><ShieldCheck className="h-3.5 w-3.5" /> مزود موثق</span>}
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-black text-white">{provider.providerTypeAr}</span>
                    </div>

                    <h1 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">{provider.nameAr}</h1>
                    <p className="mt-4 text-base font-black text-[#F4D978] md:text-lg">رخام · جرانيت · كوارتز · العين · أبوظبي</p>
                    <p className="mt-6 max-w-3xl text-lg leading-9 text-white/80">{provider.descriptionAr}</p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a href="/request-quote" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#12110B] shadow-lg shadow-[#8A6A00]/10 transition hover:bg-[#b8922b]"><MessageCircle className="h-5 w-5" /> اطلب عرض سعر</a>
                      {whatsappDigits && <a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent('مرحباً، أرغب في الاستفسار عن خدمات مصنع الحوت الأبيض عبر بيت الريف')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#B8922B]/35 bg-white px-8 py-4 font-black text-[#0F3F1A] transition hover:bg-[#FFF8E5]">واتساب مباشر <ExternalLink className="h-4 w-4" /></a>}
                      <a href={`tel:${provider.phone}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#B8922B]/35 bg-white/70 px-8 py-4 font-black text-[#8A6A00] transition hover:bg-white"><Phone className="h-5 w-5" /> اتصل الآن</a>
                    </div>
                  </div>

                  <div className="relative min-h-[360px] bg-[#EFE3CC] lg:min-h-full">
                    {provider.cover && <Image src={provider.cover} alt={provider.nameAr} fill className="object-cover" priority />}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/50 via-transparent to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/35 bg-white/85 p-4 shadow-xl backdrop-blur md:inset-x-6 md:bottom-6 md:p-6">
                      <p className="text-sm font-black text-[#8A6A00]">بطاقة ثقة المصنع</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <TrustItem title="رخام" sub="خامات طبيعية" />
                        <TrustItem title="جرانيت" sub="حلول متينة" />
                        <TrustItem title="كوارتز" sub="مطابخ وكونترات" />
                        <TrustItem title="UAE" sub="تغطية حسب الطلب" />
                      </div>
                      <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span className="text-xs font-bold text-[#0F3F1A]">بيانات مزود خدمة ضمن منصة بيت الريف</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#D4AF37]/20 bg-[#1b1d18] text-white"><div className="mx-auto max-w-6xl px-4 py-6"><p className="mb-4 text-sm font-black text-[#F4D978]">ملف احترافي موسّع داخل بيت الريف</p><div className="grid grid-cols-2 gap-4 md:grid-cols-4"><ProfessionalStat value="10" label="خدمات قابلة للعرض" /><ProfessionalStat value="10" label="منتجات قابلة للعرض" /><ProfessionalStat value="10" label="مشاريع قابلة للعرض" /><ProfessionalStat value="4" label="تحديثات محتوى سنوية" /></div></div></section>

          {provider.aboutAr && <section className="mx-auto max-w-6xl px-4 py-16"><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div className="relative overflow-hidden rounded-[2rem]"><Image src="/images/providers/al-hoot/about-factory.jpg" alt="مصنع الحوت الأبيض للرخام والجرانيت" width={1344} height={768} className="w-full h-auto rounded-[2rem] object-cover" /></div><div><p className="font-black text-[#B8922B]">تعرف على المصنع</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A] leading-tight">مزود متخصص في الرخام والجرانيت والكوارتز</h2><p className="mt-6 leading-9 text-gray-600">{provider.aboutAr}</p><div className="mt-8 grid grid-cols-3 gap-4"><FeatureCard icon={<Hammer className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="تصنيع حسب الطلب" /><FeatureCard icon={<Layers className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="خامات متنوعة" /><FeatureCard icon={<Users className="mx-auto h-6 w-6 text-[#D4AF37]" />} label="تنسيق مباشر" /></div></div></div></section>}

          <section className="mx-auto max-w-6xl px-4 pb-16"><div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 shadow-sm md:p-10"><p className="font-black text-[#B8922B]">الخدمات والمنتجات</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A]">مسارات العمل داخل مصنع الحوت الأبيض</h2><p className="mt-3 max-w-3xl text-gray-600 leading-8">يمكن للمصنع دعم طلبات التوريد والتصنيع والتركيب حسب احتياج المشروع، مع توفر خيارات خامات متعددة حسب نوع العمل المطلوب.</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{(provider.services || []).map((service) => <div key={service} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 text-center text-sm font-black text-[#0F3F1A] hover:border-[#D4AF37]/50 hover:bg-[#FFF8E5] transition">{service}</div>)}</div></div></section>

          {provider.materials?.length > 0 && <section className="bg-white border-y border-[#E6DCC8]"><div className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#B8922B]">الخامات المتوفرة</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A]">تشكيلة من أرقى أنواع الأحجار والتشطيبات</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{provider.materials.map((mat, idx) => <div key={idx} className="rounded-2xl border border-[#E6DCC8] p-6 hover:shadow-md transition"><h3 className="text-lg font-black text-[#0F3F1A]">{mat.nameAr}</h3><p className="mt-2 text-sm leading-7 text-gray-600">{mat.descAr}</p></div>)}</div></div></section>}

          {provider.gallery?.length > 0 && <section className="mx-auto max-w-6xl px-4 py-16"><p className="font-black text-[#B8922B]">معرض الصور</p><h2 className="mt-2 text-3xl font-black text-[#0F3F1A]">نماذج توضيحية للخامات والأعمال</h2><p className="mt-3 max-w-3xl text-gray-600 leading-8">صور توضيحية تساعد العميل على فهم طبيعة أعمال الرخام والجرانيت والكوارتز التي يمكن طلبها من خلال بيت الريف.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{provider.gallery.map((img, idx) => <div key={idx} className="group relative overflow-hidden rounded-2xl border border-[#E6DCC8] bg-white shadow-sm"><div className="aspect-square relative"><Image src={img.src} alt={img.altAr} fill className="object-cover transition group-hover:scale-105 duration-500" /></div><div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4"><p className="text-sm font-black text-white">{img.altAr}</p></div></div>)}</div></section>}

          {provider.googleMapsUrl && <section className="mx-auto max-w-6xl px-4 pb-16"><div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 shadow-sm"><div className="flex items-start justify-between flex-wrap gap-4 mb-6"><div><p className="font-black text-[#B8922B]">موقع المصنع</p><h2 className="mt-2 text-2xl font-black text-[#0F3F1A]">زيارة المصنع أو التواصل المباشر</h2><p className="mt-2 text-gray-600 leading-8">مزيد - معسكر الشركات، مدينة العين، أبوظبي، الإمارات العربية المتحدة</p><p className="mt-1 text-sm text-gray-500">{provider.workingHours}</p></div><a href={provider.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/40 px-6 py-3 text-sm font-black text-[#B8922B] hover:bg-[#D4AF37]/10 transition"><ExternalLink className="h-4 w-4" /> فتح في خرائط جوجل</a></div></div></section>}

          {provider.faq?.length > 0 && <section className="mx-auto max-w-4xl px-4 pb-16"><p className="text-center font-black text-[#B8922B]">أسئلة متكررة</p><h2 className="mt-2 mb-8 text-center text-3xl font-black text-[#0F3F1A]">إجابات مباشرة على أكثر الأسئلة شيوعاً</h2><div className="space-y-4">{provider.faq.map((item, idx) => <details key={idx} className="group rounded-2xl border border-[#E6DCC8] bg-white shadow-sm"><summary className="cursor-pointer list-none p-6 font-black text-[#0F3F1A] flex items-center justify-between gap-4">{item.questionAr}<ChevronDown className="h-5 w-5 shrink-0 text-[#B8922B] transition group-open:rotate-180" /></summary><div className="px-6 pb-6 leading-8 text-gray-600">{item.answerAr}</div></details>)}</div></section>}

          <section className="mx-auto max-w-6xl px-4 pb-20"><div className="rounded-[2rem] bg-gradient-to-br from-[#FFF8EA] via-[#EFE3CC] to-[#CDBB98] border border-[#B8922B]/25 p-8 text-[#0F3F1A] md:p-12"><h2 className="text-3xl font-black">تحتاج رخام أو جرانيت أو كوارتز لمشروعك؟</h2><p className="mt-4 max-w-2xl text-[#304333] leading-8">أرسل تفاصيل المشروع والمقاسات والصور المتاحة ليتم توجيهك لمسار عرض السعر المناسب.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row">{whatsappDigits && <a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent('مرحباً، أرغب في الاستفسار عن خدمات مصنع الحوت الأبيض عبر بيت الريف')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#12110B] transition hover:bg-[#b8922b]">تواصل عبر واتساب</a>}<a href="/request-quote" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#B8922B]/35 bg-white/50 px-8 py-4 font-black text-[#0F3F1A] transition hover:bg-white">اطلب عرض سعر رسمي</a></div></div></section>
        </main>
        <Footer />
      </div>
    </>
  );
}

function TrustItem({ title, sub }) { return <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm"><div className="text-2xl font-black text-[#8A6A00]">{title}</div><div className="mt-1 text-xs font-bold text-[#304333]">{sub}</div></div>; }
function ProfessionalStat({ value, label }) { return <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-2xl font-black text-[#F4D978]">{value}</div><div className="mt-1 text-xs font-bold text-white/70">{label}</div></div>; }
function InfoItem({ icon, label, value, highlight = false }) { return <div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDFBF7] border border-[#E6DCC8]">{icon}</div><div><p className="text-xs text-gray-500">{label}</p><p className={`text-sm font-black ${highlight ? 'text-emerald-700' : 'text-[#0F3F1A]'}`}>{value}</p></div></div>; }
function FeatureCard({ icon, label }) { return <div className="rounded-2xl border border-[#E6DCC8] bg-white p-4 text-center shadow-sm">{icon}<p className="mt-2 text-sm font-black text-[#0F3F1A]">{label}</p></div>; }

export async function getStaticProps({ params }) {
  const provider = providers.find((p) => p.slug === params.slug);
  if (!provider) return { notFound: true };
  const emirate = getEmirate(provider.emirate);
  const area = getArea(provider.emirate, provider.area) || getArea(provider.emirate, provider.city);
  return { props: { provider, emirate: emirate || null, area: area || null }, revalidate: false };
}

export async function getStaticPaths() { return { paths: providers.map((provider) => ({ params: { slug: provider.slug } })), fallback: false }; }
