import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, CheckCircle2, Clock3, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { alrehabTemplate as provider } from '../../data/providerTemplates/alrehab';

const SITE_URL = 'https://bietalreef.ae';
const PAGE_URL = `${SITE_URL}/providers/${provider.slug}`;
const whatsappDigits = provider.contact.whatsapp.replace(/\D/g, '');

export default function AlrehabProviderPage() {
  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'CleaningService', '@id': `${PAGE_URL}#business`,
      name: provider.identity.name.ar, alternateName: provider.identity.name.en, url: PAGE_URL,
      description: provider.description.ar, telephone: provider.contact.phone,
      logo: `${SITE_URL}${provider.media.logo}`, image: `${SITE_URL}${provider.media.cover}`,
      areaServed: ['Al Ain', 'Abu Dhabi', 'Dubai'].map((name) => ({ '@type': 'AdministrativeArea', name })),
      serviceType: provider.services.map((service) => service.title.ar),
      availableLanguage: ['Arabic', 'English'],
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: provider.faq.map((item) => ({ '@type': 'Question', name: item.questionAr, acceptedAnswer: { '@type': 'Answer', text: item.answerAr } })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'مزودو خدمات التنظيف', item: `${SITE_URL}/providers/specialty/cleaning-services` },
        { '@type': 'ListItem', position: 3, name: provider.identity.name.ar, item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'خدمات وعروض الرحاب',
      itemListElement: [...provider.services, ...provider.offers].map((item, index) => ({
        '@type': 'ListItem', position: index + 1, url: `${PAGE_URL}#${item.id}`,
        item: { '@type': item.id.includes('-OFR-') ? 'Offer' : 'Service', name: item.title.ar, description: item.summary.ar, image: `${SITE_URL}${item.image}`, areaServed: ['Al Ain', 'Abu Dhabi', 'Dubai'] },
      })),
    },
    {
      '@context': 'https://schema.org', '@type': 'ImageGallery', name: 'نماذج أعمال الرحاب للتنظيف والتعقيم',
      associatedMedia: provider.gallery.map((item) => ({ '@type': 'ImageObject', '@id': `${PAGE_URL}#${item.id}`, name: item.title.ar, description: item.description.ar, contentUrl: `${SITE_URL}${item.image}`, contentLocation: item.location.ar })),
    },
  ];

  return (
    <>
      <Head>
        <title>الرحاب للتنظيف والتعقيم في العين وأبوظبي ودبي | بيت الريف</title>
        <meta name="description" content="تنظيف كنب وسجاد ومجالس ومراتب بالبخار والتعقيم في جميع مناطق العين وأبوظبي ودبي. تواصل مع الرحاب للتنظيف والتعقيم واطلب تقييماً حسب الصور والمقاسات." />
        <meta name="keywords" content="الرحاب للتنظيف, تنظيف كنب العين, تنظيف سجاد أبوظبي, تنظيف مجالس دبي, تنظيف مراتب بالبخار, شركة تنظيف وتعقيم, تنظيف منازل العين" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="ar-AE" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-AE" href={`${SITE_URL}/en/providers/${provider.slug}`} />
        <meta property="og:title" content="الرحاب للتنظيف والتعقيم | العين وأبوظبي ودبي" />
        <meta property="og:description" content={provider.description.ar} />
        <meta property="og:image" content={`${SITE_URL}${provider.media.cover}`} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#F7FAFC] text-[#082E63]">
        <Navbar />
        <main>
          <section className="relative overflow-hidden bg-[linear-gradient(135deg,#031F4A_0%,#064B91_55%,#58B51B_160%)] px-4 pb-16 pt-5">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_10%,white,transparent_28%),radial-gradient(circle_at_85%_85%,#8DD52E,transparent_25%)]" />
            <div className="relative mx-auto max-w-6xl">
              <Link href="/providers/specialty/cleaning-services" className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur">العودة إلى قسم التنظيف</Link>
              <div className="overflow-hidden rounded-[2.5rem] border border-white/20 bg-white shadow-[0_40px_100px_-45px_rgba(0,0,0,.8)]">
                <div className="relative h-[360px] md:h-[500px]">
                  <Image src={provider.media.cover} alt="فريق الرحاب ينفذ تنظيفاً عميقاً للكنب داخل منزل" fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041D42]/90 via-transparent to-transparent" />
                </div>
                <div className="relative -mt-24 px-5 pb-8 md:px-10 md:pb-10">
                  <div className="relative rounded-[2.2rem] border border-white/70 bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:p-8">
                    <div className="flex flex-col items-center gap-5 text-center">
                      <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-[5px] border-[#58B51B] bg-white shadow-[0_0_0_6px_rgba(255,255,255,.9),0_20px_45px_rgba(3,55,112,.22)] md:h-44 md:w-44">
                        <Image src={provider.media.logo} alt={`شعار ${provider.identity.name.ar}`} fill className="scale-[1.18] rounded-full object-cover" />
                        <span className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#0B5EAE] text-white"><BadgeCheck className="h-6 w-6" /></span>
                      </div>
                      <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center justify-center gap-2"><p className="text-sm font-black text-[#55A91C]">مزود خدمة تنظيف وتعقيم موثق</p><span className="inline-flex items-center gap-1 rounded-full bg-[#EAF6FF] px-3 py-1 text-xs font-black text-[#0B5EAE]" dir="ltr"><BadgeCheck className="h-4 w-4" />{provider.id}</span></div>
                        <h1 className="mt-2 text-3xl font-black leading-tight text-[#073D7C] md:text-5xl">{provider.identity.name.ar}</h1>
                        <p className="mt-3 text-lg font-black text-[#50A918]">{provider.identity.tagline.ar}</p>
                        <p className="mx-auto mt-5 max-w-3xl text-sm font-semibold leading-8 text-slate-600 md:text-base">{provider.description.ar}</p>
                      </div>
                      <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
                        <a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent('مرحباً، أرغب في الاستفسار عن خدمات الرحاب للتنظيف والتعقيم عبر بيت الريف')}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#55B51B] px-8 font-black text-white shadow-lg"><MessageCircle className="h-5 w-5" /> واتساب</a>
                        <a href={`tel:${provider.contact.phone}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#073D7C] px-8 font-black text-white"><Phone className="h-5 w-5" /> 054 776 1290</a>
                        <Link href="/weyaak?message=أرغب%20في%20طلب%20خدمة%20تنظيف%20حسب%20احتياجي" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-[#0B5EAE]/20 bg-[#EDF6FF] px-8 font-black text-[#073D7C]"><Sparkles className="h-5 w-5" />اطلب من وياك</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="-mt-8 px-4 pb-14">
            <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard icon={<MapPin />} title="نطاق الخدمة" value="العين · أبوظبي · دبي" />
              <InfoCard icon={<Clock3 />} title="المواعيد" value="حسب الحجز المسبق" />
              <InfoCard icon={<ShieldCheck />} title="المواد" value="تنظيف وتعقيم مناسب للخامة" />
              <InfoCard icon={<Sparkles />} title="النتيجة" value="تقييم واضح قبل التنفيذ" />
            </div>
          </section>

          <Section eyebrow="خدمات الرحاب" title="أربع خدمات تنظيف عميق للمنازل والمكاتب" intro="اختر نوع الخدمة، ثم أرسل صور القطع وعددها وموقعك للحصول على تقييم مناسب للحالة.">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {provider.services.map((service) => <ContentCard key={service.id} item={service} />)}
            </div>
          </Section>

          <section className="px-4 pb-16"><div className="mx-auto max-w-6xl rounded-[2rem] border border-[#DDEAF7] bg-white p-8 text-center shadow-sm"><h2 className="text-2xl font-black text-[#073D7C]">اطلب الخدمة حسب احتياجك</h2><p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-600">أرسل للمنصة وصفًا مختصرًا لاحتياجك وسيبدأ وياك في تنظيم الطلب وتحديد المسار المناسب.</p><Link href="/weyaak?message=أرغب%20في%20طلب%20خدمة%20تنظيف%20حسب%20احتياجي" className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#073D7C] px-8 font-black text-white"><Sparkles className="h-5 w-5" />اطلب من وياك</Link></div></section>

          <section className="bg-[#062E63] px-4 py-16 text-white">
            <div className="mx-auto max-w-6xl">
              <p className="font-black text-[#89D13C]">عروض مصممة حسب الاحتياج</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">أربع باقات مرنة — السعر بعد مراجعة الصور والمقاسات</h2>
              <p className="mt-4 max-w-3xl leading-8 text-white/70">لا نعرض سعراً مضللاً قبل معرفة العدد والمقاس وحالة البقع وموقع الخدمة. يتم تأكيد التفاصيل مع العميل أولاً.</p>
              <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {provider.offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
              </div>
            </div>
          </section>

          <Section eyebrow="تغطية جغرافية واضحة" title="خدمة تنظيف وتعقيم في جميع مناطق العين وأبوظبي ودبي" intro="يتم تنسيق الموعد ووقت الوصول بحسب المنطقة ونوع الخدمة وحجم العمل.">
            <div className="grid gap-4 md:grid-cols-3">{provider.coverage.map((area) => <div key={area.slug} className="rounded-3xl border border-[#DDEAF7] bg-white p-7 shadow-sm"><MapPin className="h-7 w-7 text-[#55B51B]" /><h3 className="mt-4 text-xl font-black text-[#073D7C]">{area.ar}</h3><p className="mt-2 text-sm leading-7 text-slate-600">تنظيف كنب وسجاد ومجالس ومراتب حسب الحجز المسبق.</p></div>)}</div>
          </Section>

          <section className="bg-white px-4 py-16"><div className="mx-auto max-w-4xl"><p className="text-center font-black text-[#55A91C]">إجابات مباشرة</p><h2 className="mt-2 text-center text-3xl font-black text-[#073D7C]">أسئلة شائعة عن خدمات الرحاب</h2><div className="mt-8 space-y-4">{provider.faq.map((item) => <details key={item.questionAr} className="rounded-2xl border border-[#DDEAF7] bg-[#F8FBFF] p-6"><summary className="cursor-pointer font-black text-[#073D7C]">{item.questionAr}</summary><p className="mt-4 leading-8 text-slate-600">{item.answerAr}</p></details>)}</div></div></section>

          <Section eyebrow="معرض الأعمال" title="نماذج لأعمال التنظيف السابقة" intro="نماذج مصورة تساعد على فهم نوع الخدمة والمعدات المستخدمة؛ النتيجة الفعلية تختلف حسب الخامة وحالة القطعة.">
            <div className="grid gap-5 sm:grid-cols-2">{provider.gallery.map((item) => <article id={item.id} key={item.id} className="overflow-hidden rounded-3xl border border-[#DDEAF7] bg-white shadow-sm"><div className="relative aspect-[16/10]"><Image src={item.image} alt={item.title.ar} fill className="object-cover" /></div><div className="p-6"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-black text-[#0B5EAE]" dir="ltr">{item.id}</span><span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700"><MapPin className="h-3.5 w-3.5" />{item.location.ar}</span></div><h3 className="mt-3 text-xl font-black text-[#073D7C]">{item.title.ar}</h3><p className="mt-3 leading-7 text-slate-600">{item.description.ar}</p></div></article>)}</div>
          </Section>

          <section className="px-4 py-16"><div className="mx-auto max-w-6xl rounded-[2.5rem] bg-[linear-gradient(135deg,#55B51B,#0870C2)] p-8 text-center text-white shadow-2xl md:p-12"><h2 className="text-3xl font-black">أرسل الصور والمقاسات وموقع الخدمة</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-white/85">يساعد ذلك على تقييم الخدمة واختيار المعدات والمواد المناسبة وتأكيد الموعد.</p><a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-9 font-black text-[#073D7C]"><MessageCircle className="h-5 w-5" /> تواصل مع الرحاب</a></div></section>
        </main>
        <Footer />
      </div>
    </>
  );
}

function Section({ eyebrow, title, intro, children }) { return <section className="px-4 py-16"><div className="mx-auto max-w-6xl"><p className="font-black text-[#55A91C]">{eyebrow}</p><h2 className="mt-2 text-3xl font-black leading-tight text-[#073D7C] md:text-4xl">{title}</h2><p className="mt-4 max-w-3xl leading-8 text-slate-600">{intro}</p><div className="mt-9">{children}</div></div></section>; }
function InfoCard({ icon, title, value }) { return <div className="rounded-3xl border border-[#DDEAF7] bg-white p-5 shadow-lg"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF6FF] text-[#0870C2] [&>svg]:h-5 [&>svg]:w-5">{icon}</div><p className="mt-4 text-xs font-black text-[#55A91C]">{title}</p><p className="mt-1 font-black text-[#073D7C]">{value}</p></div>; }
function ContentCard({ item }) { const message = `مرحباً، أرغب في طلب خدمة من الرحاب عبر بيت الريف.\nمعرّف المزود: ${provider.id}\nمعرّف البطاقة: ${item.id}\nنوع الخدمة: ${item.title.ar}\nالتفاصيل: ${item.summary.ar}`; return <article id={item.id} className="overflow-hidden rounded-3xl border border-[#DDEAF7] bg-white shadow-sm"><div className="relative aspect-[4/3]"><Image src={item.image} alt={item.title.ar} fill className="object-cover" /></div><div className="p-5"><div className="flex items-center justify-between gap-2"><CheckCircle2 className="h-6 w-6 text-[#55B51B]" /><span className="text-xs font-black text-[#0B5EAE]" dir="ltr">{item.id}</span></div><h3 className="mt-3 text-xl font-black text-[#073D7C]">{item.title.ar}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.summary.ar}</p><a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#55B51B] px-4 text-sm font-black text-white"><MessageCircle className="h-4 w-4" />طلب الخدمة عبر واتساب</a></div></article>; }
function OfferCard({ offer }) { const message = `مرحباً، أرغب في الاستفسار عن عرض الرحاب عبر بيت الريف.\nمعرّف المزود: ${provider.id}\nمعرّف البطاقة: ${offer.id}\nنوع العرض: ${offer.title.ar}\nالتفاصيل: ${offer.summary.ar}\nالسعر: بعد التقييم`; return <article id={offer.id} className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur"><div className="relative aspect-[4/3]"><Image src={offer.image} alt={offer.title.ar} fill className="object-cover" /><span className="absolute right-3 top-3 rounded-full bg-[#55B51B] px-3 py-1 text-xs font-black text-white">{offer.badge.ar}</span></div><div className="p-5"><p className="text-xs font-black text-[#89D13C]" dir="ltr">{offer.id}</p><h3 className="mt-2 text-xl font-black">{offer.title.ar}</h3><p className="mt-3 text-sm leading-7 text-white/70">{offer.summary.ar}</p><p className="mt-4 text-xs font-black text-[#89D13C]">السعر بعد التقييم</p><a href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#55B51B] px-4 text-sm font-black text-white"><MessageCircle className="h-4 w-4" />استفسر عبر واتساب</a></div></article>; }
