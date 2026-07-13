import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowLeft, Bot, BriefcaseBusiness, CheckCircle2, ChevronDown, Clock3, Hammer, Home, Images, MapPin, MessageCircle, Phone, Ruler, ShieldCheck, Sparkles } from 'lucide-react';

const phone = '+971 56 779 7828';
const whatsapp = '971567797828';
const base = '/images/providers/arkline/';
const services = [
  ['مطابخ خشبية حسب المقاس', 'تصميم وتنفيذ المطابخ وفق مساحة الموقع والخامة والتشطيب المطلوب.', 'arkline-showroom.webp', Ruler],
  ['خزائن ودواليب', 'خزائن غرف وحلول تخزين مصنعة حسب المقاسات واحتياج العميل.', 'arkline-workshop.webp', Home],
  ['أبواب وأعمال خشبية', 'أبواب داخلية وفواصل وأعمال خشبية مع مراجعة المقاسات قبل التنفيذ.', 'arkline-production.webp', Hammer],
  ['تصميم داخلي وديكورات', 'حلول ديكور خشبي وتجهيزات داخلية تجمع بين الوظيفة والشكل.', 'arkline-hero-exterior.webp', Sparkles],
];
const gallery = [
  ['arkline-hero-exterior.webp', 'واجهة أركلين في العين'],
  ['arkline-workshop.webp', 'ورشة النجارة والتصنيع'],
  ['arkline-showroom.webp', 'التشطيبات والتصميم الداخلي'],
  ['arkline-production.webp', 'معدات الإنتاج داخل الورشة'],
];
const faqs = [
  ['ما الخدمات التي تقدمها أركلين؟', 'أعمال النجارة والتصميم الداخلي، وتشمل المطابخ والخزائن والأبواب والديكورات الخشبية والأثاث حسب الطلب.'],
  ['هل يتم التصنيع حسب المقاسات؟', 'نعم، تتم مراجعة المقاسات والخامة والتشطيب وموقع المشروع قبل إعداد عرض السعر وبدء التصنيع.'],
  ['كيف أطلب عرض سعر؟', 'أرسل صور الموقع والمقاسات ونوع العمل والمنطقة عبر واتساب أو نموذج طلب عرض السعر في بيت الريف.'],
  ['أين تقع أركلين؟', 'في مدينة العين، مزيد، معسكر الشركات. يفضل التواصل قبل الزيارة لتأكيد الموعد.'],
];

export default function ArklinePage() {
  const canonical = 'https://bietalreef.ae/providers/arkline';
  const description = 'أركلين لأعمال النجارة والتصميم الداخلي في العين: مطابخ، خزائن، أبواب، ديكورات خشبية وأثاث حسب المقاس مع تواصل مباشر وطلب عرض سعر.';
  const message = encodeURIComponent('مرحباً، أرغب في الاستفسار عن خدمات أركلين عبر منصة بيت الريف.');
  const schemas = [{
    '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: 'أركلين لأعمال النجارة والتصميم الداخلي', url: canonical, telephone: phone,
    image: gallery.map(([src]) => `https://bietalreef.ae${base}${src}`),
    address: { '@type': 'PostalAddress', streetAddress: 'مزيد – معسكر الشركات', addressLocality: 'العين', addressRegion: 'أبوظبي', addressCountry: 'AE' },
    areaServed: [{ '@type': 'City', name: 'Al Ain' }, { '@type': 'AdministrativeArea', name: 'Abu Dhabi' }],
  }, {
    '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }];

  return <>
    <Head>
      <title>أركلين للنجارة والتصميم الداخلي في العين | بيت الريف</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content="أركلين للنجارة والتصميم الداخلي في العين" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://bietalreef.ae${base}arkline-hero-exterior.webp`} />
      <meta property="og:locale" content="ar_AE" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </Head>
    <div dir="rtl" className="min-h-screen bg-[#F8F4EC] text-[#1D2E22]">
      <Navbar />
      <main>
        <section className="mx-auto max-w-6xl px-3 pb-8 pt-3 md:px-4 md:pt-5">
          <Link href="/providers" className="mb-4 inline-flex items-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-3 text-sm font-black text-[#0F3F1A] shadow-sm"><ArrowLeft className="h-4 w-4 rotate-180" />العودة إلى مزودي الخدمات</Link>
          <div className="relative overflow-hidden rounded-[2.2rem] border border-[#E6DCC8] shadow-[0_24px_70px_rgba(66,45,17,.14)]">
            <div className="relative aspect-[16/10] min-h-[310px] sm:aspect-[16/8] md:min-h-[520px]">
              <Image src={`${base}arkline-hero-exterior.webp`} alt="واجهة أركلين للنجارة والتصميم الداخلي في العين" fill priority className="object-cover" sizes="(max-width:768px) 100vw,1152px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
              <div className="absolute right-4 top-4 flex flex-wrap gap-2"><Badge icon={ShieldCheck}>ملف رقمي داخل بيت الريف</Badge><Badge icon={Hammer}>ورشة نجارة في العين</Badge></div>
            </div>
          </div>
          <div className="relative z-10 mx-2 -mt-10 rounded-[2rem] border border-white bg-white/95 p-5 shadow-[0_22px_60px_rgba(77,53,20,.15)] backdrop-blur-xl md:mx-6 md:-mt-16 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.7rem] border-4 border-white bg-black shadow-xl md:h-32 md:w-32"><Image src={`${base}logo.webp`} alt="شعار أركلين" fill className="object-contain p-1" sizes="128px" /></div>
                <div><div className="mb-2 flex flex-wrap gap-2"><Tag>منجرة وتصميم داخلي</Tag><Tag green>يقبل طلبات الأسعار</Tag></div><h1 className="text-2xl font-black leading-tight text-[#0F3F1A] md:text-5xl">أركلين لأعمال النجارة والتصميم الداخلي</h1><p className="mt-2 flex items-center gap-2 text-sm font-bold text-[#6D5A41]"><MapPin className="h-4 w-4 text-[#A66B19]" />العين – مزيد – معسكر الشركات</p></div>
              </div>
              <p className="rounded-2xl border border-[#E6DCC8] bg-[#FBF7EF] px-4 py-3 text-sm leading-7 text-[#5D5549] md:max-w-sm"><b className="text-[#0F3F1A]">هوية رقمية واضحة:</b> الخدمات والصور وطرق التواصل في صفحة واحدة منظمة.</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Action href="/request-quote?provider=arkline" dark icon={BriefcaseBusiness}>طلب عرض سعر</Action>
              <Action href={`https://wa.me/${whatsapp}?text=${message}`} external icon={MessageCircle}>واتساب</Action>
              <Action href="tel:+971567797828" icon={Phone}>اتصال</Action>
              <Action href="/weyaak" icon={Bot}>تواصل مع وياك</Action>
            </div>
          </div>
        </section>

        <nav className="sticky top-[66px] z-30 border-y border-[#E6DCC8] bg-[#F8F4EC]/95 backdrop-blur-xl"><div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">{[['معلومات النشاط','#overview'],['الخدمات','#services'],['معرض الصور','#gallery'],['الأسئلة الشائعة','#faq']].map(([label,href],i)=><a key={href} href={href} className={`shrink-0 rounded-2xl px-5 py-3 text-sm font-black ${i===0?'bg-[#0F3F1A] text-white':'border border-[#E1D4BE] bg-white text-[#0F3F1A]'}`}>{label}</a>)}</div></nav>

        <section id="overview" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14"><Heading eyebrow="معلومات النشاط" title="كل ما يحتاج العميل معرفته قبل التواصل" /><p className="max-w-3xl leading-8 text-[#625A50]">أركلين مزود خدمة في مدينة العين متخصص في أعمال النجارة والتصميم الداخلي، وينفذ المطابخ والخزائن والأبواب والديكورات الخشبية والأثاث حسب المقاسات واحتياج المشروع.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Info icon={Hammer} title="التخصص" value="نجارة وتصميم داخلي" /><Info icon={MapPin} title="نطاق الخدمة" value="العين وأبوظبي حسب المشروع" /><Info icon={Clock3} title="الزيارة" value="بتنسيق مسبق مع الورشة" /><Info icon={Ruler} title="طريقة التنفيذ" value="حسب المقاسات والتفاصيل" /></div>
        </section>

        <section id="services" className="scroll-mt-28 border-y border-[#E6DCC8] bg-white/65 py-14"><div className="mx-auto max-w-6xl px-4"><Heading eyebrow="الخدمات" title="مسارات العمل الرئيسية لدى أركلين" /><div className="mt-7 grid gap-5 sm:grid-cols-2">{services.map(([title,desc,img,Icon])=><article key={title} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.09)]"><div className="relative h-52"><Image src={`${base}${img}`} alt={title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:640px)100vw,50vw" /><span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#0F3F1A] shadow-xl"><Icon className="h-6 w-6" /></span></div><div className="p-5"><h3 className="text-xl font-black text-[#0F3F1A]">{title}</h3><p className="mt-3 leading-8 text-[#625A50]">{desc}</p><Link href={`/request-quote?provider=arkline&service=${encodeURIComponent(title)}`} className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white">اطلب الخدمة<ArrowLeft className="h-4 w-4" /></Link></div></article>)}</div></div></section>

        <section id="gallery" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14"><Heading eyebrow="معرض النشاط" title="صورة واضحة عن المكان والتجهيزات" /><div className="mt-7 grid gap-5 md:grid-cols-2">{gallery.map(([src,title],i)=><figure key={src} className={`overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.09)] ${i===0?'md:col-span-2':''}`}><div className={`relative ${i===0?'aspect-[16/8]':'aspect-[4/3]'}`}><Image src={`${base}${src}`} alt={title} fill className="object-cover" sizes={i===0?'100vw':'(max-width:768px)100vw,50vw'} /></div><figcaption className="p-5 font-black text-[#0F3F1A]">{title}</figcaption></figure>)}</div></section>

        <section id="faq" className="scroll-mt-28 border-t border-[#E6DCC8] bg-white/65 py-14"><div className="mx-auto max-w-4xl px-4"><Heading eyebrow="أسئلة قبل الطلب" title="إجابات مباشرة عن خدمات أركلين" center /><div className="mt-7 space-y-4">{faqs.map(([q,a],i)=><details key={q} open={i===0} className="group rounded-[1.7rem] border border-[#E6DCC8] bg-white p-5 shadow-sm"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-[#0F3F1A]">{q}<ChevronDown className="h-5 w-5 text-[#A66B19] transition group-open:rotate-180" /></summary><p className="mt-4 border-t border-[#EFE6D6] pt-4 leading-8 text-[#625A50]">{a}</p></details>)}</div></div></section>
      </main>
      <Footer />
    </div>
  </>;
}

function Badge({ icon: Icon, children }) { return <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-3 py-2 text-xs font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl"><Icon className="h-4 w-4 text-[#A66B19]" />{children}</span>; }
function Tag({ children, green }) { return <span className={`rounded-full px-3 py-1 text-[11px] font-black ${green?'bg-emerald-50 text-emerald-700':'bg-[#FFF4D6] text-[#8A5C0B]'}`}>{children}</span>; }
function Action({ href, icon: Icon, children, dark, external }) { const cls=`inline-flex min-h-[58px] items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black shadow-sm transition hover:-translate-y-0.5 ${dark?'bg-[#0F3F1A] text-white':'border border-[#BFA66C]/45 bg-white text-[#0F3F1A]'}`; return external?<a href={href} target="_blank" rel="noopener noreferrer" className={cls}><Icon className="h-5 w-5" />{children}</a>:<Link href={href} className={cls}><Icon className="h-5 w-5" />{children}</Link>; }
function Heading({ eyebrow, title, center }) { return <div className={center?'text-center':''}><span className="text-sm font-black text-[#A66B19]">{eyebrow}</span><h2 className="mt-2 text-3xl font-black text-[#0F3F1A] md:text-4xl">{title}</h2></div>; }
function Info({ icon: Icon, title, value }) { return <article className="rounded-[1.7rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_14px_38px_rgba(67,45,17,.08)]"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF2CF] text-[#0F3F1A]"><Icon className="h-5 w-5" /></span><p className="mt-4 text-xs font-black text-[#A66B19]">{title}</p><p className="mt-1 font-black leading-7 text-[#0F3F1A]">{value}</p></article>; }
