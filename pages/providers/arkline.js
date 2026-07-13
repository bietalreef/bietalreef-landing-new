import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  ArrowLeft,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  FileCheck2,
  Hammer,
  Home,
  Images,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Store,
} from 'lucide-react';

const provider = {
  name: 'أركلين لأعمال النجارة والتصميم الداخلي',
  shortName: 'أركلين',
  type: 'منجرة وتصميم داخلي',
  location: 'العين – مزيد – معسكر الشركات',
  joinedAt: 'يوليو 2026',
  phone: '+971 56 779 7828',
  whatsapp: '971567797828',
  base: '/images/providers/arkline/',
  hero: 'arkline-hero-exterior.webp',
  logo: 'logo.webp',
  licenseLabel: 'بيانات الرخصة التجارية محفوظة لدى بيت الريف',
  licenseStatus: 'قيد مراجعة مطابقة النشاط',
};

const services = [
  {
    title: 'مطابخ خشبية حسب المقاس',
    description: 'تصميم وتصنيع وتركيب المطابخ وفق مساحة الموقع والخامة والتشطيب وتوزيع الاستخدام المطلوب.',
    image: 'arkline-showroom.webp',
    icon: Ruler,
    tags: ['حسب المقاس', 'تصنيع وتركيب', 'خامات حسب الاختيار'],
  },
  {
    title: 'خزائن ودواليب مخصصة',
    description: 'خزائن غرف وحلول تخزين داخلية مصنعة حسب المقاسات، مع تنظيم داخلي يناسب احتياج العميل.',
    image: 'arkline-workshop.webp',
    icon: Home,
    tags: ['تفصيل خاص', 'حلول تخزين', 'تشطيبات متعددة'],
  },
  {
    title: 'أبواب وديكورات خشبية',
    description: 'أبواب داخلية وفواصل وكسوات وديكورات خشبية مع مراجعة المقاسات والتفاصيل قبل التنفيذ.',
    image: 'arkline-production.webp',
    icon: Hammer,
    tags: ['أبواب داخلية', 'كسوات خشبية', 'توريد وتركيب'],
  },
  {
    title: 'تصميم داخلي وتجهيز المساحات',
    description: 'تنسيق الأعمال الخشبية والديكورات داخل المساحة بما يحقق الوظيفة والشكل المطلوب للمشروع.',
    image: 'arkline-hero-exterior.webp',
    icon: Sparkles,
    tags: ['تصميم داخلي', 'تنسيق خامات', 'تنفيذ حسب المشروع'],
  },
];

const products = [
  {
    title: 'مطبخ خشبي حسب الطلب',
    category: 'مطابخ',
    description: 'ينفذ حسب المقاسات ونوع الخامة والتشطيب والملحقات المطلوبة.',
    icon: Home,
  },
  {
    title: 'خزانة ملابس حسب المقاس',
    category: 'خزائن',
    description: 'تقسيم داخلي مخصص مع خيارات متعددة للأبواب والتشطيبات.',
    icon: Package,
  },
  {
    title: 'باب داخلي خشبي',
    category: 'أبواب',
    description: 'تصنيع حسب المقاس والتصميم ونوع الخشب أو القشرة المطلوبة.',
    icon: Store,
  },
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
  const description = 'أركلين لأعمال النجارة والتصميم الداخلي في العين: مطابخ، خزائن، أبواب، ديكورات خشبية وأعمال حسب المقاس مع طلب عرض سعر وتواصل مباشر.';
  const message = encodeURIComponent('مرحباً، أرغب في الاستفسار عن خدمات أركلين عبر منصة بيت الريف.');
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('أركلين أعمال النجارة والتصميم الداخلي مزيد معسكر الشركات العين')}`;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: provider.name,
      url: canonical,
      telephone: provider.phone,
      image: gallery.map(([src]) => `https://bietalreef.ae${provider.base}${src}`),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'مزيد – معسكر الشركات',
        addressLocality: 'العين',
        addressRegion: 'أبوظبي',
        addressCountry: 'AE',
      },
      areaServed: [
        { '@type': 'City', name: 'Al Ain' },
        { '@type': 'AdministrativeArea', name: 'Abu Dhabi' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];

  return (
    <>
      <Head>
        <title>أركلين للنجارة والتصميم الداخلي في العين | بيت الريف</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="أركلين للنجارة والتصميم الداخلي في العين" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`https://bietalreef.ae${provider.base}${provider.hero}`} />
        <meta property="og:locale" content="ar_AE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#F8F4EC] text-[#1D2E22]">
        <Navbar />

        <main>
          <section className="mx-auto max-w-6xl px-3 pb-8 pt-3 md:px-4 md:pt-5">
            <Link
              href="/providers"
              className="mb-4 inline-flex items-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-3 text-sm font-black text-[#0F3F1A] shadow-[0_8px_20px_rgba(77,53,20,.08)]"
            >
              <ArrowLeft className="h-4 w-4 rotate-180" />
              العودة إلى مزودي الخدمات
            </Link>

            <div className="relative overflow-hidden rounded-[2.2rem] border border-[#E6DCC8] shadow-[0_24px_70px_rgba(66,45,17,.14)]">
              <div className="relative aspect-[16/10] min-h-[310px] sm:aspect-[16/8] md:min-h-[520px]">
                <Image
                  src={`${provider.base}${provider.hero}`}
                  alt="واجهة أركلين للنجارة والتصميم الداخلي في العين"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:768px) 100vw,1152px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/5" />
              </div>
            </div>

            <div className="relative z-10 mx-2 -mt-16 overflow-hidden rounded-[2.2rem] border border-white bg-white/96 p-5 shadow-[0_26px_70px_rgba(77,53,20,.18)] backdrop-blur-xl md:mx-6 md:-mt-20 md:p-8">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-[#0F3F1A] via-[#C9952A] to-[#0F3F1A]" />

              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-right md:gap-7">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[4px] border-[#C9952A] bg-white shadow-[0_14px_0_rgba(82,49,6,.12),0_24px_45px_rgba(82,49,6,.20)] md:h-36 md:w-36">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                    <Image
                      src={`${provider.base}${provider.logo}`}
                      alt="شعار أركلين"
                      fill
                      className="scale-[1.32] object-contain"
                      sizes="144px"
                    />
                  </div>
                  <span className="absolute -bottom-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#0F3F1A] text-[#F4C95D] shadow-lg">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Tag>منجرة وتصميم داخلي</Tag>
                    <Tag green>يقبل طلبات الأسعار</Tag>
                  </div>
                  <h1 className="text-2xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{provider.name}</h1>
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-[#6D5A41] sm:justify-start">
                    <MapPin className="h-4 w-4 text-[#A66B19]" />
                    {provider.location}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <Link
                  href="/request-quote?provider=arkline"
                  className="inline-flex min-h-[62px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#0F3F1A] to-[#082D13] px-5 py-4 text-base font-black text-white shadow-[0_9px_0_rgba(5,37,13,.20),0_18px_35px_rgba(15,63,26,.22)] transition hover:-translate-y-0.5"
                >
                  <BriefcaseBusiness className="h-6 w-6 text-[#F4CA61]" />
                  طلب عرض سعر من أركلين
                </Link>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <ContactButton href={`https://wa.me/${provider.whatsapp}?text=${message}`} external icon={MessageCircle} label="واتساب" />
                  <ContactButton href="tel:+971567797828" icon={Phone} label="اتصال" />
                  <ContactButton href="/weyaak" icon={Bot} label="وياك" />
                </div>
              </div>
            </div>
          </section>

          <nav className="sticky top-[66px] z-30 border-y border-[#E6DCC8] bg-[#F8F4EC]/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                ['معلومات النشاط', '#overview'],
                ['الخدمات والعروض', '#services'],
                ['المنتجات', '#products'],
                ['معرض الصور', '#gallery'],
                ['الأسئلة الشائعة', '#faq'],
              ].map(([label, href], index) => (
                <a
                  key={href}
                  href={href}
                  className={`shrink-0 rounded-2xl px-5 py-3 text-sm font-black ${
                    index === 0
                      ? 'bg-[#0F3F1A] text-white shadow-[0_7px_0_rgba(6,38,14,.16)]'
                      : 'border border-[#E1D4BE] bg-white text-[#0F3F1A] shadow-sm'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <section id="overview" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14">
            <SectionHeading eyebrow="معلومات النشاط" title="نبذة عن نشاط أركلين" />
            <p className="mt-4 max-w-4xl text-base leading-9 text-[#625A50]">
              أركلين مزود خدمة في مدينة العين متخصص في أعمال النجارة والتصميم الداخلي، وينفذ المطابخ والخزائن والأبواب والديكورات الخشبية والأثاث حسب المقاسات واحتياج المشروع. يبدأ العمل بمراجعة الصور والمقاسات ونوع الخامة والتشطيب المطلوب قبل تحديد العرض وخطوات التنفيذ.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <TrustBadge icon={BadgeCheck} title="مزود مسجل لدى بيت الريف" />
              <TrustBadge icon={ShieldCheck} title="بيانات التواصل معتمدة" />
              <TrustBadge icon={FileCheck2} title="بيانات النشاط قيد المراجعة" />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard icon={CalendarDays} title="تاريخ الانضمام" value={provider.joinedAt} />
              <InfoCard icon={Hammer} title="نوع النشاط" value="ورشة نجارة وتصميم داخلي" />
              <InfoCard icon={Clock3} title="موعد الزيارة" value="بتنسيق مسبق مع الورشة" />
              <InfoCard icon={FileCheck2} title="حالة الترخيص" value={provider.licenseStatus} />
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
              <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-[0_16px_44px_rgba(67,45,17,.08)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF2CF] text-[#0F3F1A]">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <p className="mt-5 text-xs font-black text-[#A66B19]">بيانات النشاط</p>
                <h3 className="mt-2 text-xl font-black text-[#0F3F1A]">{provider.licenseLabel}</h3>
                <p className="mt-3 leading-8 text-[#625A50]">
                  لا تُعرض أرقام الرخص أو المستندات التجارية للعامة. يظهر وصف «رخصة تجارية سارية المفعول» فقط بعد اكتمال التحقق من الصلاحية ومطابقة النشاط.
                </p>
              </article>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-[2rem] border border-[#D9C8A9] bg-gradient-to-br from-[#1A4A27] via-[#0F3F1A] to-[#082D13] p-6 text-white shadow-[0_20px_55px_rgba(15,63,26,.20)]"
              >
                <div className="absolute -left-16 -top-20 h-52 w-52 rounded-full border border-white/10" />
                <div className="absolute -left-5 -top-8 h-36 w-36 rounded-full border border-white/10" />
                <div className="relative flex h-full flex-col justify-between gap-8">
                  <div>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-[#F4CA61] shadow-xl backdrop-blur-xl">
                      <MapPin className="h-7 w-7" />
                    </span>
                    <p className="mt-5 text-sm font-black text-[#F4CA61]">موقع النشاط</p>
                    <h3 className="mt-2 text-2xl font-black">العين – مزيد – معسكر الشركات</h3>
                    <p className="mt-3 leading-8 text-white/75">اضغط لفتح الموقع مباشرة في خرائط Google.</p>
                  </div>
                  <span className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 font-black text-[#102617] shadow-lg transition group-hover:-translate-y-0.5">
                    فتح خرائط Google
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </div>
          </section>

          <section id="services" className="scroll-mt-28 border-y border-[#E6DCC8] bg-white/65 py-14">
            <div className="mx-auto max-w-6xl px-4">
              <SectionHeading eyebrow="الخدمات والعروض" title="خدمات أركلين القابلة لطلب عرض سعر" />
              <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
                كل بطاقة تمثل خدمة فعلية يمكن ربطها لاحقاً بصفحة مستقلة، نموذج طلب، صور مشاريع وأسئلة خاصة بالخدمة.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {services.map((service) => (
                  <ServiceCard key={service.title} service={service} whatsapp={provider.whatsapp} />
                ))}
              </div>
            </div>
          </section>

          <section id="products" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14">
            <SectionHeading eyebrow="المنتجات" title="منتجات تنفذ حسب المقاسات والطلب" />
            <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
              هذه بطاقات منتجات قابلة للتوسع. لا يظهر سعر ثابت لأن السعر يعتمد على المقاسات والخامة والتشطيب والملحقات.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.title} product={product} />
              ))}
            </div>
          </section>

          <section id="gallery" className="scroll-mt-28 border-y border-[#E6DCC8] bg-white/65 py-14">
            <div className="mx-auto max-w-6xl px-4">
              <SectionHeading eyebrow="معرض الصور" title="معرض صور أركلين" />
              <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
                الصور الحالية المعتمدة داخل ملف المزود، ويمكن إضافة صور المشاريع والأعمال الجديدة لاحقاً دون تغيير تصميم المعرض.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {gallery.map(([src, title], index) => (
                  <figure
                    key={src}
                    className={`overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.09)] ${index === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <div className={`relative ${index === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}>
                      <Image
                        src={`${provider.base}${src}`}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes={index === 0 ? '100vw' : '(max-width:768px)100vw,50vw'}
                      />
                    </div>
                    <figcaption className="flex items-center gap-3 p-5 font-black text-[#0F3F1A]">
                      <Images className="h-5 w-5 text-[#A66B19]" />
                      {title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-28 mx-auto max-w-4xl px-4 py-14">
            <SectionHeading eyebrow="الأسئلة الشائعة" title="أسئلة شائعة عن خدمات أركلين" center />
            <div className="mt-8 space-y-4">
              {faqs.map(([question, answer], index) => (
                <details key={question} open={index === 0} className="group rounded-[1.7rem] border border-[#E6DCC8] bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-[#0F3F1A]">
                    {question}
                    <ChevronDown className="h-5 w-5 text-[#A66B19] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 border-t border-[#EFE6D6] pt-4 leading-8 text-[#625A50]">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function TrustBadge({ icon: Icon, title }) {
  return (
    <span className="flex min-h-[74px] w-full items-center gap-3 rounded-[1.45rem] border border-[#DDCBAA] bg-gradient-to-b from-white to-[#F8F1E5] px-4 py-3 text-sm font-black text-[#0F3F1A] shadow-[0_7px_0_rgba(85,58,16,.08),0_14px_26px_rgba(85,58,16,.10)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F7D87B] to-[#A86F14] text-[#17351E] shadow-inner">
        <Icon className="h-5 w-5" />
      </span>
      {title}
    </span>
  );
}

function Tag({ children, green }) {
  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-black ${green ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FFF4D6] text-[#8A5C0B]'}`}>
      {children}
    </span>
  );
}

function ContactButton({ href, icon: Icon, label, external }) {
  const className = 'inline-flex min-h-[58px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#D9C8A9] bg-white px-3 py-3 text-xs font-black text-[#0F3F1A] shadow-[0_7px_0_rgba(85,58,16,.08),0_13px_24px_rgba(85,58,16,.10)] transition hover:-translate-y-0.5';
  const content = <><Icon className="h-5 w-5 text-[#A66B19]" /><span>{label}</span></>;
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
    : <Link href={href} className={className}>{content}</Link>;
}

function SectionHeading({ eyebrow, title, center }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <span className="text-sm font-black text-[#A66B19]">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-black leading-tight text-[#0F3F1A] md:text-4xl">{title}</h2>
    </div>
  );
}

function InfoCard({ icon: Icon, title, value }) {
  return (
    <article className="rounded-[1.7rem] border border-[#E6DCC8] bg-white p-5 shadow-[0_14px_38px_rgba(67,45,17,.08)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF2CF] text-[#0F3F1A]">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-xs font-black text-[#A66B19]">{title}</p>
      <p className="mt-1 font-black leading-7 text-[#0F3F1A]">{value}</p>
    </article>
  );
}

function ServiceCard({ service, whatsapp }) {
  const Icon = service.icon;
  const whatsappText = encodeURIComponent(`مرحباً، أرغب في الاستفسار عن خدمة ${service.title} لدى أركلين عبر منصة بيت الريف.`);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(67,45,17,.15)]">
      <div className="relative h-56 overflow-hidden">
        <Image src={`${provider.base}${service.image}`} alt={service.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:768px)100vw,50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/50 bg-white/88 px-3 py-2 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">خدمة أركلين</span>
          <span className="rounded-full border border-white/30 bg-[#0F3F1A]/88 px-3 py-2 text-[11px] font-black text-white shadow-lg backdrop-blur-xl">متوفر حسب الطلب</span>
        </div>
        <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/55 bg-white/90 text-[#0F3F1A] shadow-xl backdrop-blur-xl">
          <Icon className="h-6 w-6" />
        </span>
      </div>

      <div className="p-5 md:p-6">
        <h3 className="text-xl font-black text-[#0F3F1A]">{service.title}</h3>
        <p className="mt-3 min-h-[64px] leading-8 text-[#625A50]">{service.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#E3D5BD] bg-[#FBF7EF] px-3 py-1.5 text-[11px] font-bold text-[#66583F]">{tag}</span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#E8DDC9] bg-[#FCFAF6] px-4 py-3 text-sm">
          <span className="flex items-center gap-2 font-bold text-[#625A50]"><MapPin className="h-4 w-4 text-[#A66B19]" />العين وأبوظبي</span>
          <span className="font-black text-[#0F3F1A]">السعر بعد المعاينة</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link href={`/request-quote?provider=arkline&service=${encodeURIComponent(service.title)}`} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white shadow-[0_7px_0_rgba(5,37,13,.16)]">
            طلب عرض سعر
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <a href={`https://wa.me/${whatsapp}?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-3 text-sm font-black text-[#0F3F1A]">
            <MessageCircle className="h-4 w-4 text-[#159447]" />
            واتساب
          </a>
        </div>
      </div>
    </article>
  );
}

function ProductCard({ product }) {
  const Icon = product.icon;
  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.09)]">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF9ED] via-[#E8D5B4] to-[#B98937]">
        <div className="absolute inset-5 rounded-[1.6rem] border border-white/70 bg-white/30 shadow-inner backdrop-blur-sm" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#0F3F1A] text-[#F4CA61] shadow-[0_12px_0_rgba(71,45,8,.14),0_20px_35px_rgba(71,45,8,.20)]">
          <Icon className="h-11 w-11" />
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[11px] font-black text-[#0F3F1A] shadow-lg">{product.category}</span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black text-[#0F3F1A]">{product.title}</h3>
        <p className="mt-3 leading-8 text-[#625A50]">{product.description}</p>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#FBF7EF] px-4 py-3 text-sm">
          <span className="font-bold text-[#6A5B43]">متوفر حسب الطلب</span>
          <span className="font-black text-[#0F3F1A]">السعر حسب المواصفات</span>
        </div>
        <Link href={`/request-quote?provider=arkline&product=${encodeURIComponent(product.title)}`} className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-[#D4AF37] bg-[#FFF9EA] px-4 py-3 text-sm font-black text-[#0F3F1A]">
          اطلب تفاصيل المنتج
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
