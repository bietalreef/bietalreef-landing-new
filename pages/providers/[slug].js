import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { providers } from '../../data/providers';
import { getEmirate, getArea } from '../../data/siteTaxonomy';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ShieldCheck, MapPin, Clock, Phone, MessageCircle, Gem, ChevronDown, ExternalLink, Hammer, Layers, Users, Factory, Navigation, BadgeCheck } from 'lucide-react';

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

              <div className="group relative min-h-[720px] overflow-hidden rounded-[2.5rem] border border-[#E8C968]/35 bg-[#071A24] shadow-[0_35px_100px_-35px_rgba(4,23,34,.9)]">
                {provider.cover && <Image src={provider.cover} alt={provider.nameAr} fill className="object-cover object-center" priority />}
                <div className="absolute inset-0 bg-gradient-to-l from-[#020D14]/95 via-[#061B28]/76 to-[#071A24]/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020B11]/95 via-transparent to-black/20" />
                <div className="absolute -right-16 top-12 h-56 w-56 rounded-full bg-[#D4AF37]/15 blur-3xl motion-safe:animate-pulse" />
                <div className="relative flex min-h-[720px] items-end p-4 md:p-8 lg:p-10">
                  <div className="w-full rounded-[2rem] border border-white/45 bg-[#FFFDF8]/95 p-5 shadow-[0_30px_80px_-24px_rgba(0,0,0,.8)] backdrop-blur-xl md:p-8">
                    <div className="grid items-center gap-6 lg:grid-cols-[220px_1fr]">
                      <div className="relative mx-auto lg:mx-0">
                        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[5px] border-[#D4AF37] bg-white p-3 shadow-[0_0_0_7px_rgba(255,255,255,.9),0_0_0_10px_rgba(212,175,55,.35),0_24px_50px_rgba(15,63,26,.25)] md:h-48 md:w-48">
                          <Image src={provider.logo} alt={`شعار ${provider.nameAr}`} width={220} height={220} className="h-full w-full rounded-full object-contain" />
                          {provider.verified && <span className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#F4D76B] to-[#B8860B] text-[#0B3D23] shadow-[0_8px_20px_rgba(184,134,11,.4)]" aria-label="مزود موثق"><BadgeCheck className="h-7 w-7" /></span>}
                        </div>
                      </div>
                      <div className="min-w-0 text-center lg:text-right">
                        <p className="text-xs font-black tracking-[.18em] text-[#B8922B]">مصنع رخام وجرانيت موثق</p>
                        <h1 className="mt-2 font-serif text-3xl font-black leading-[1.3] text-[#092C1C] md:text-5xl">{provider.nameAr}</h1>
                        <p className="mt-2 font-black text-[#8A6A00]">توريد · تصنيع حسب الطلب · تركيب</p>
                        <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                          {whatsappDigits && <ContactChannel href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent('مرحباً، أرغب في الاستفسار عن خدمات مصنع الحوت الأبيض عبر بيت الريف')}`} icon={<MessageCircle />} label="واتساب" external />}
                          <ContactChannel href={`tel:${provider.phone}`} icon={<Phone />} label="اتصال" />
                          {provider.googleMapsUrl && <ContactChannel href={provider.googleMapsUrl} icon={<Navigation />} label="الموقع" external />}
                          <ContactChannel href="/request-quote" icon={<ExternalLink />} label="عرض سعر" />
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                          <IdentityBadge icon={<Gem />} label="حضور احترافي" />
                          <IdentityBadge icon={<ShieldCheck />} label="بيانات موثقة" />
                          <IdentityBadge icon={<Factory />} label={provider.providerTypeAr} />
                        </div>
                        <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-[#415248] md:text-base md:leading-8">{provider.descriptionAr}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#D4AF37]/20 bg-[#111812] text-white"><div className="mx-auto max-w-6xl px-4 py-10"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><BusinessInfo icon={<Factory />} label="النشاط الرئيسي" value="تصنيع وتوريد الرخام والجرانيت" /><BusinessInfo icon={<MapPin />} label="الموقع" value="مزيد، مدينة العين – أبوظبي" /><BusinessInfo icon={<Navigation />} label="نطاق الخدمة" value="العين وأبوظبي وحسب المشروع" /><BusinessInfo icon={<Clock />} label="مواعيد العمل" value={provider.workingHours} /></div></div></section>

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
function ContactChannel({ href, icon, label, external = false }) { return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group inline-flex items-center gap-2 rounded-full border border-[#D9C791] bg-white px-3 py-2 text-xs font-black text-[#0F3F1A] shadow-[0_7px_16px_-8px_rgba(15,63,26,.55)] transition duration-300 hover:-translate-y-1 hover:border-[#B8922B] hover:shadow-lg"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF8D8] to-[#D4AF37] text-[#0B3D23] [&>svg]:h-4 [&>svg]:w-4">{icon}</span>{label}</a>; }
function IdentityBadge({ icon, label }) { return <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B3D23]/[.07] px-3 py-1.5 text-[11px] font-black text-[#0B3D23] [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-[#B8922B]">{icon}{label}</span>; }
function BusinessInfo({ icon, label, value }) { return <div className="group rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-white/[.09] to-white/[.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5D96F] to-[#A97D12] text-[#102D20] shadow-[0_10px_25px_-10px_rgba(212,175,55,.7)] [&>svg]:h-5 [&>svg]:w-5">{icon}</div><p className="text-xs font-black text-[#E4C75D]">{label}</p><p className="mt-2 text-sm font-bold leading-7 text-white/85">{value}</p></div>; }
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
