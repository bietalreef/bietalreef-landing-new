import { useEffect, useState } from 'react';
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
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Hammer,
  History,
  Home,
  Images,
  Layers3,
  ListChecks,
  MapPin,
  Maximize2,
  MessageCircle,
  Package,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Store,
  X,
} from 'lucide-react';

const provider = {
  id: 'BR-PROV-ARK-001',
  name: 'أركلين لأعمال النجارة والتصميم الداخلي',
  shortName: 'أركلين',
  type: 'منجرة وتصميم داخلي',
  location: 'العين – مزيد – معسكر الشركات',
  joinedAt: 'يوليو 2026',
  establishedAt: '2015',
  phone: '+971 56 779 7828',
  whatsapp: '971567797828',
  base: '/images/providers/arkline/',
  hero: '/images/providers/arkleen-premium/profile-cover.webp',
  logo: '/images/providers/arkleen-logo.png',
};

const resolveProviderMedia = (src) => (src?.startsWith('/') ? src : `${provider.base}${src}`);

const services = [
  {
    id: 'BR-SRV-ARK-001',
    slug: 'custom-wooden-kitchens',
    title: 'مطابخ خشبية حسب المقاس',
    description: 'تصميم وتصنيع وتركيب المطابخ وفق مساحة الموقع والخامة والتشطيب وتوزيع الاستخدام المطلوب.',
    image: '/images/providers/arkleen-premium/service-custom-kitchens.webp',
    icon: Ruler,
    tags: ['حسب المقاس', 'تصنيع وتركيب', 'خامات حسب الاختيار'],
    requiredDetails: [
      'المدينة والمنطقة وموقع المشروع',
      'المقاسات التقريبية أو مخطط المطبخ',
      'نوع الخامة أو اللون والتشطيب المطلوب',
      'صور الموقع الحالية إن توفرت',
    ],
    wayaakPrompt: 'ساعدني في تجهيز طلب مطبخ خشبي حسب المقاس، وتحديد المعلومات والمقاسات والصور التي يجب إرسالها إلى أركلين قبل التواصل المباشر.',
  },
  {
    id: 'BR-SRV-ARK-002',
    slug: 'custom-wardrobes',
    title: 'خزائن ودواليب مخصصة',
    description: 'خزائن غرف وحلول تخزين داخلية مصنعة حسب المقاسات، مع تنظيم داخلي يناسب احتياج العميل.',
    image: '/images/providers/arkleen-premium/service-custom-wardrobes.webp',
    icon: Home,
    tags: ['تفصيل خاص', 'حلول تخزين', 'تشطيبات متعددة'],
    requiredDetails: [
      'المكان المخصص للخزانة والمدينة',
      'العرض والارتفاع والعمق التقريبي',
      'نوع الأبواب والتقسيم الداخلي المطلوب',
      'صورة الجدار أو المساحة إن توفرت',
    ],
    wayaakPrompt: 'ساعدني في تجهيز طلب خزانة أو دولاب حسب المقاس، واختيار البيانات اللازمة عن الأبعاد والأبواب والتقسيم الداخلي قبل التواصل مع أركلين.',
  },
  {
    id: 'BR-SRV-ARK-003',
    slug: 'wooden-doors-and-decor',
    title: 'أبواب وديكورات خشبية',
    description: 'أبواب داخلية وفواصل وكسوات وديكورات خشبية مع مراجعة المقاسات والتفاصيل قبل التنفيذ.',
    image: '/images/providers/arkleen-premium/service-wooden-doors-decor.webp',
    icon: Hammer,
    tags: ['أبواب داخلية', 'كسوات خشبية', 'توريد وتركيب'],
    requiredDetails: [
      'نوع العمل المطلوب: أبواب أو كسوات أو فواصل',
      'عدد القطع والمقاسات التقريبية',
      'التصميم أو اللون أو نوع الخشب المطلوب',
      'صور الموقع أو النموذج المرجعي إن توفرت',
    ],
    wayaakPrompt: 'ساعدني في تجهيز طلب أبواب أو ديكورات خشبية، وتحديد المقاسات والخامة والصور المرجعية المطلوبة قبل التواصل مع أركلين.',
  },
  {
    id: 'BR-SRV-ARK-004',
    slug: 'interior-design-and-fitout',
    title: 'تصميم داخلي وتجهيز المساحات',
    description: 'تنسيق الأعمال الخشبية والديكورات داخل المساحة بما يحقق الوظيفة والشكل المطلوب للمشروع.',
    image: '/images/providers/arkleen-premium/service-interior-fitout.webp',
    icon: Sparkles,
    tags: ['تصميم داخلي', 'تنسيق خامات', 'تنفيذ حسب المشروع'],
    requiredDetails: [
      'نوع ومساحة المشروع وموقعه',
      'نطاق الأعمال المطلوب تنفيذه',
      'الطراز أو الألوان المرغوبة',
      'الصور والمخططات والميزانية التقريبية إن توفرت',
    ],
    wayaakPrompt: 'ساعدني في تجهيز طلب تصميم داخلي وتجهيز مساحة، وتنظيم نطاق العمل والصور والمخططات والميزانية المطلوبة قبل التواصل مع أركلين.',
  },
];

const products = [
  {
    id: 'BR-PRD-ARK-001',
    slug: 'custom-wooden-kitchen',
    title: 'مطبخ خشبي حسب الطلب',
    category: 'مطابخ',
    description: 'ينفذ حسب المقاسات ونوع الخامة والتشطيب والملحقات المطلوبة.',
    image: '/images/providers/arkleen-premium/product-custom-kitchen.webp',
    gallery: ['/images/providers/arkleen-premium/product-custom-kitchen.webp', '/images/providers/arkleen-premium/product-custom-kitchen-detail.webp', '/images/providers/arkleen-premium/product-custom-kitchen-storage.webp'],
    icon: Home,
  },
  {
    id: 'BR-PRD-ARK-002',
    slug: 'custom-wooden-wardrobe',
    title: 'خزانة ملابس حسب المقاس',
    category: 'خزائن',
    description: 'تقسيم داخلي مخصص مع خيارات متعددة للأبواب والتشطيبات.',
    image: '/images/providers/arkleen-premium/product-custom-wardrobe.webp',
    gallery: ['/images/providers/arkleen-premium/product-custom-wardrobe.webp', '/images/providers/arkleen-premium/product-custom-wardrobe-detail.webp', '/images/providers/arkleen-premium/product-custom-wardrobe-storage.webp'],
    icon: Package,
  },
  {
    id: 'BR-PRD-ARK-003',
    slug: 'custom-wooden-door',
    title: 'باب داخلي خشبي',
    category: 'أبواب',
    description: 'تصنيع حسب المقاس والتصميم ونوع الخشب أو القشرة المطلوبة.',
    image: '/images/providers/arkleen-premium/product-custom-door.webp',
    gallery: ['/images/providers/arkleen-premium/product-custom-door.webp', '/images/providers/arkleen-premium/product-custom-door-detail.webp', '/images/providers/arkleen-premium/product-custom-door-opposite.webp'],
    icon: Store,
  },
];

const gallery = [
  ['/images/providers/arkleen-premium/profile-cover.webp', 'أعمال أركلين للنجارة والتصميم الداخلي'],
  ['/images/providers/arkleen-premium/service-custom-kitchens.webp', 'مطابخ خشبية مصنعة حسب الطلب'],
  ['/images/providers/arkleen-premium/service-custom-wardrobes.webp', 'خزائن ودواليب حسب المقاس'],
  ['/images/providers/arkleen-premium/service-wooden-doors-decor.webp', 'أبواب وكسوات خشبية مخصصة'],
  ['/images/providers/arkleen-premium/service-interior-fitout.webp', 'تصميم داخلي وتجهيز المساحات'],
];

const faqs = [
  ['ما الخدمات التي تقدمها أركلين؟', 'أعمال النجارة والتصميم الداخلي، وتشمل المطابخ والخزائن والأبواب والديكورات الخشبية والأثاث حسب الطلب.'],
  ['هل يتم التصنيع حسب المقاسات؟', 'نعم، تتم مراجعة المقاسات والخامة والتشطيب وموقع المشروع قبل إعداد عرض السعر وبدء التصنيع.'],
  ['كيف أطلب عرض سعر؟', 'أرسل صور الموقع والمقاسات ونوع العمل والمنطقة عبر واتساب أو نموذج طلب عرض السعر في بيت الريف.'],
  ['أين تقع أركلين؟', 'في مدينة العين، مزيد، معسكر الشركات. يفضل التواصل قبل الزيارة لتأكيد الموعد.'],
];

function buildServiceWhatsappMessage(service) {
  const details = service.requiredDetails.map((item, index) => `${index + 1}. ${item}:`).join('\n');

  return encodeURIComponent(
    [
      `مرحباً، أرغب في الاستفسار عن خدمة «${service.title}» لدى أركلين عبر منصة بيت الريف.`,
      '',
      `معرف المزود: ${provider.id}`,
      `معرف الخدمة: ${service.id}`,
      '',
      'تفاصيل طلبي:',
      details,
      '',
      'سأرفق الصور أو المخططات المتوفرة في الرسالة التالية.',
    ].join('\n')
  );
}

function buildWeyaakHref(service) {
  const query = new URLSearchParams({
    providerId: provider.id,
    provider: 'arkleen',
    serviceId: service.id,
    service: service.title,
    prompt: service.wayaakPrompt,
  });

  return `/weyaak?${query.toString()}`;
}

export default function ArklinePage() {
  const [selectedService, setSelectedService] = useState(null);
  const canonical = 'https://bietalreef.ae/providers/arkleen';
  const description = 'أركلين لأعمال النجارة والتصميم الداخلي في العين: مطابخ، خزائن، أبواب، ديكورات خشبية وأعمال حسب المقاس مع طلب عرض سعر وتواصل مباشر.';
  const message = encodeURIComponent('مرحباً، أرغب في الاستفسار عن خدمات أركلين عبر منصة بيت الريف.');
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('أركلين أعمال النجارة والتصميم الداخلي مزيد معسكر الشركات العين')}`;

  useEffect(() => {
    if (!selectedService) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedService(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedService]);

  const serviceSchemas = services.map((service) => ({
    '@type': 'Service',
    '@id': `${canonical}#${service.id}`,
    identifier: service.id,
    name: service.title,
    description: service.description,
    url: `${canonical}#${service.id}`,
    image: {
      '@type': 'ImageObject',
      contentUrl: `https://bietalreef.ae${resolveProviderMedia(service.image)}`,
      caption: `${service.title} من أركلين في العين وأبوظبي`,
      inLanguage: 'ar-AE',
    },
    areaServed: [{ '@type': 'City', name: 'العين' }, { '@type': 'AdministrativeArea', name: 'أبوظبي' }],
    provider: { '@id': `${canonical}#provider` },
    additionalProperty: { '@type': 'PropertyValue', name: 'نظام التسعير', value: 'عرض سعر بعد مراجعة المقاسات والخامة وموقع المشروع' },
  }));

  const productSchemas = products.map((product) => ({
    '@type': 'Product',
    '@id': `${canonical}#${product.id}`,
    identifier: product.id,
    sku: product.id,
    name: product.title,
    description: product.description,
    url: `${canonical}#${product.id}`,
    image: product.gallery.map((src) => `https://bietalreef.ae${src}`),
    brand: { '@type': 'Brand', name: 'ARKLEEN' },
    category: product.category,
    areaServed: [{ '@type': 'City', name: 'العين' }, { '@type': 'AdministrativeArea', name: 'أبوظبي' }],
    additionalProperty: { '@type': 'PropertyValue', name: 'التوفر والتسعير', value: 'مصنّع حسب الطلب؛ السعر حسب المقاسات والمواصفات' },
  }));

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${canonical}#provider`,
      identifier: provider.id,
      name: provider.name,
      url: canonical,
      telephone: provider.phone,
      foundingDate: provider.establishedAt,
      image: gallery.map(([src]) => `https://bietalreef.ae${resolveProviderMedia(src)}`),
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'خدمات أركلين',
        itemListElement: serviceSchemas.map((service) => ({
          '@type': 'Offer',
          identifier: service.identifier,
          itemOffered: service,
        })),
      },
    },
    { '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${canonical}#services`, name: 'خدمات أركلين للنجارة والتصميم الداخلي', itemListElement: serviceSchemas.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item })) },
    { '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${canonical}#products`, name: 'منتجات أركلين المصنّعة حسب الطلب', itemListElement: productSchemas.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item })) },
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
        <meta property="og:image" content={`https://bietalreef.ae${resolveProviderMedia(provider.hero)}`} />
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
                  src={resolveProviderMedia(provider.hero)}
                  alt="واجهة أركلين للنجارة والتصميم الداخلي في العين"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:768px) 100vw,1152px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-black/5" />
              </div>
            </div>

            <div className="relative z-20 mx-auto -mt-14 flex h-28 w-28 items-center justify-center rounded-full border-[4px] border-[#C9952A] bg-white shadow-[0_14px_0_rgba(82,49,6,.12),0_24px_45px_rgba(82,49,6,.20)] md:hidden">
              <ProviderLogo />
              <span className="absolute -bottom-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#0F3F1A] text-[#F4C95D] shadow-lg">
                <BadgeCheck className="h-5 w-5" />
              </span>
            </div>

            <div className="relative z-10 mx-2 -mt-7 overflow-hidden rounded-[2.2rem] border border-white bg-white/96 p-5 pt-12 shadow-[0_26px_70px_rgba(77,53,20,.18)] backdrop-blur-xl md:mx-6 md:-mt-10 md:p-7 lg:-mt-12 lg:p-8">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-[#0F3F1A] via-[#C9952A] to-[#0F3F1A]" />

              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-right md:gap-6">
                <div className="relative hidden h-28 w-28 shrink-0 items-center justify-center rounded-full border-[4px] border-[#C9952A] bg-white shadow-[0_14px_0_rgba(82,49,6,.12),0_24px_45px_rgba(82,49,6,.20)] md:flex lg:h-32 lg:w-32">
                  <ProviderLogo />
                  <span className="absolute -bottom-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#0F3F1A] text-[#F4C95D] shadow-lg">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Tag>منجرة وتصميم داخلي</Tag>
                    <Tag green>يقبل طلبات الأسعار</Tag>
                  </div>
                  <h1 className="text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl lg:text-5xl">{provider.name}</h1>
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-[#6D5A41] sm:justify-start">
                    <MapPin className="h-4 w-4 text-[#A66B19]" />
                    {provider.location}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/request-quote?provider=arkleen"
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

          <section id="overview" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-12 md:py-14">
            <SectionHeading eyebrow="معلومات النشاط" title="نبذة عن نشاط أركلين" />
            <p className="mt-4 max-w-4xl text-base leading-9 text-[#625A50] md:text-lg">
              أركلين ورشة نجارة وتصميم داخلي في مدينة العين، تأسست عام 2015 وتقدم حلولاً مخصصة للمنازل والفلل والملاحق والمكاتب. يشمل نطاق العمل تصميم وتصنيع وتركيب المطابخ والخزائن والأبواب والكسوات والديكورات الخشبية والأثاث حسب المقاس. تبدأ كل مهمة بمراجعة صور الموقع والمقاسات ونوع الخامة والتشطيب، ثم تحديد نطاق العمل والمدة التقديرية وعرض السعر قبل التنفيذ.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-2.5 md:gap-4">
              <TrustBadge icon={BadgeCheck} title="مزود مسجل لدى بيت الريف" />
              <TrustBadge icon={ShieldCheck} title="بيانات التواصل معتمدة" />
              <TrustBadge icon={History} title="تأسيس النشاط 2015" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ActivityDetail icon={Building2} title="النشاط الرئيسي" value="أعمال النجارة والتصميم الداخلي" />
              <ActivityDetail icon={Layers3} title="التخصص" value="مطابخ وخزائن وأبواب وديكورات خشبية حسب المقاس" />
              <ActivityDetail icon={ListChecks} title="الخدمات" value="تصميم ومعاينة وتصنيع وتوريد وتركيب وتشطيبات داخلية" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <CompactInfo icon={CalendarDays} title="تاريخ الانضمام" value={provider.joinedAt} />
              <CompactInfo icon={Clock3} title="موعد الزيارة" value="بتنسيق مسبق مع الورشة" />
              <CompactInfo icon={MapPin} title="نطاق الخدمة" value="العين وأبوظبي حسب المشروع" />
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-6 block min-h-[300px] overflow-hidden rounded-[2rem] border border-[#D9C8A9] bg-[#EEE7D8] shadow-[0_20px_55px_rgba(77,53,20,.13)]"
            >
              <div className="absolute inset-0 opacity-95">
                <div className="absolute -left-10 top-10 h-16 w-[72%] rotate-[13deg] rounded-full border-[12px] border-white/90 shadow-sm" />
                <div className="absolute -right-16 top-32 h-14 w-[76%] -rotate-[18deg] rounded-full border-[10px] border-[#FFFDF8] shadow-sm" />
                <div className="absolute left-[32%] top-0 h-[125%] w-14 rotate-[27deg] rounded-full border-[8px] border-white/85" />
                <div className="absolute right-[12%] top-[18%] h-20 w-28 rounded-xl border border-[#CFC4AE] bg-[#DED4C1]/80" />
                <div className="absolute left-[8%] top-[58%] h-16 w-24 rounded-xl border border-[#CFC4AE] bg-[#D8CEBB]/80" />
                <div className="absolute right-[40%] top-[67%] h-14 w-20 rounded-xl border border-[#CFC4AE] bg-[#E4DAC8]/85" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.8),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.22),transparent_60%)]" />
              </div>

              <div className="relative z-10 flex min-h-[300px] flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-[#A66B19]">موقع النشاط</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight text-[#0F3F1A] md:text-3xl">العين – مزيد – معسكر الشركات</h3>
                    <p className="mt-3 max-w-xl leading-8 text-[#5F584F]">اضغط على البطاقة لفتح الموقع مباشرة في خرائط Google.</p>
                  </div>
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] border border-white/80 bg-white/88 text-[#A66B19] shadow-[0_8px_0_rgba(128,89,23,.10),0_18px_30px_rgba(77,53,20,.14)] backdrop-blur-xl">
                    <MapPin className="h-8 w-8" />
                  </span>
                </div>

                <span className="mt-8 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-white/92 px-5 py-3 font-black text-[#0F3F1A] shadow-[0_8px_0_rgba(91,62,18,.10),0_18px_32px_rgba(77,53,20,.13)] backdrop-blur-xl transition group-hover:-translate-y-0.5 md:w-auto md:min-w-[230px]">
                  فتح خرائط Google
                  <ExternalLink className="h-4 w-4 text-[#A66B19]" />
                </span>
              </div>
            </a>
          </section>

          <section id="services" className="scroll-mt-28 border-y border-[#E6DCC8] bg-white/65 py-12 md:py-14">
            <div className="mx-auto max-w-6xl px-4">
              <SectionHeading eyebrow="الخدمات والعروض" title="خدمات أركلين القابلة لطلب عرض سعر" />
              <p className="mt-4 max-w-3xl leading-8 text-[#625A50]">
                تظهر الخدمات في بطاقات مختصرة وسريعة التصفح. اضغط «التفاصيل» لفتح البطاقة الموسعة داخل الصفحة دون الانتقال إلى صفحة أو تغيير الرابط.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    whatsapp={provider.whatsapp}
                    onDetails={setSelectedService}
                  />
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
                <ProductCard key={product.id} product={product} />
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
                        src={resolveProviderMedia(src)}
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

        {selectedService && (
          <ServiceDetailsModal
            service={selectedService}
            whatsapp={provider.whatsapp}
            onClose={() => setSelectedService(null)}
          />
        )}

        <Footer />
      </div>
    </>
  );
}

function ProviderLogo() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
      <img
        src={`${resolveProviderMedia(provider.logo)}?v=arkleen-premium`}
        alt="شعار أركلين لأعمال النجارة والتصميم الداخلي"
        className="h-full w-full object-contain p-1"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

function TrustBadge({ icon: Icon, title }) {
  return (
    <span className="flex min-h-[88px] w-full flex-col items-center justify-center gap-2 rounded-[1.35rem] border border-[#DDCBAA] bg-gradient-to-b from-white to-[#F8F1E5] px-2 py-3 text-center text-[11px] font-black leading-5 text-[#0F3F1A] shadow-[0_6px_0_rgba(85,58,16,.07),0_12px_24px_rgba(85,58,16,.09)] sm:min-h-[82px] sm:flex-row sm:justify-start sm:px-4 sm:text-right sm:text-sm">
      <ThreeDIcon icon={Icon} />
      {title}
    </span>
  );
}

function ThreeDIcon({ icon: Icon }) {
  return (
    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F6D979] bg-gradient-to-br from-[#FFECA8] via-[#E1B33B] to-[#A86F14] text-[#17351E] shadow-[inset_0_2px_2px_rgba(255,255,255,.75),0_6px_0_rgba(123,78,10,.18),0_12px_20px_rgba(123,78,10,.18)]">
      <span className="absolute inset-1 rounded-full border border-white/35" />
      <Icon className="relative h-5 w-5" />
    </span>
  );
}

function ActivityDetail({ icon: Icon, title, value }) {
  return (
    <article className="flex min-h-[104px] items-start gap-3 rounded-[1.45rem] border border-[#E2D4BB] bg-white px-4 py-4 shadow-[0_7px_0_rgba(85,58,16,.06),0_14px_26px_rgba(85,58,16,.08)] sm:min-h-[118px] sm:flex-col">
      <ThreeDIcon icon={Icon} />
      <div className="min-w-0">
        <p className="text-xs font-black text-[#A66B19]">{title}</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A] md:text-base">{value}</p>
      </div>
    </article>
  );
}

function CompactInfo({ icon: Icon, title, value }) {
  return (
    <article className="flex min-h-[96px] items-start gap-3 rounded-[1.35rem] border border-[#E6DCC8] bg-white/95 px-3 py-3.5 shadow-[0_8px_22px_rgba(67,45,17,.07)] sm:min-h-[88px] sm:items-center sm:px-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF2CF] text-[#0F3F1A] shadow-inner">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-black text-[#A66B19]">{title}</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A]">{value}</p>
      </div>
    </article>
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

function ServiceCard({ service, whatsapp, onDetails }) {
  const Icon = service.icon;
  const whatsappText = buildServiceWhatsappMessage(service);

  return (
    <article
      id={service.id}
      itemScope
      itemType="https://schema.org/Service"
      data-provider-id={provider.id}
      data-service-id={service.id}
      className="group overflow-hidden rounded-[1.55rem] border border-[#E6DCC8] bg-white shadow-[0_12px_32px_rgba(67,45,17,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(67,45,17,.14)] md:rounded-[2rem]"
    >
      <div className="relative h-36 overflow-hidden sm:h-40 md:h-56">
        <Image
          src={resolveProviderMedia(service.image)}
          alt={`${service.title} من أركلين في العين وأبوظبي`}
          fill
          itemProp="image"
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:767px) 100vw,50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 md:inset-x-4 md:top-4 md:gap-3">
          <span className="rounded-full border border-white/50 bg-white/88 px-2.5 py-1.5 text-[9px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl md:px-3 md:py-2 md:text-[11px]">خدمة أركلين</span>
          <span className="rounded-full border border-white/30 bg-[#0F3F1A]/88 px-2.5 py-1.5 text-[9px] font-black text-white shadow-lg backdrop-blur-xl md:px-3 md:py-2 md:text-[11px]">متوفر حسب الطلب</span>
        </div>
        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/55 bg-white/90 text-[#0F3F1A] shadow-xl backdrop-blur-xl md:bottom-4 md:right-4 md:h-12 md:w-12 md:rounded-2xl">
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </span>
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 itemProp="name" className="text-lg font-black leading-tight text-[#0F3F1A] md:text-xl">{service.title}</h3>
          <span dir="ltr" className="rounded-full bg-[#F6F0E5] px-2.5 py-1 text-[9px] font-black tracking-wide text-[#8A6A35] md:text-[10px]">{service.id}</span>
        </div>
        <p itemProp="description" className="mt-2 line-clamp-2 text-sm leading-6 text-[#625A50] md:mt-3 md:min-h-[64px] md:text-base md:leading-8">{service.description}</p>

        <div className="mt-4 hidden flex-wrap gap-2 md:flex">
          {service.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#E3D5BD] bg-[#FBF7EF] px-3 py-1.5 text-[11px] font-bold text-[#66583F]">{tag}</span>
          ))}
        </div>

        <div className="mt-5 hidden items-center justify-between rounded-2xl border border-[#E8DDC9] bg-[#FCFAF6] px-4 py-3 text-sm md:flex">
          <span className="flex items-center gap-2 font-bold text-[#625A50]"><MapPin className="h-4 w-4 text-[#A66B19]" />العين وأبوظبي</span>
          <span className="font-black text-[#0F3F1A]">السعر بعد المعاينة</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-5 md:gap-3">
          <button
            type="button"
            onClick={() => onDetails(service)}
            aria-haspopup="dialog"
            aria-label={`عرض تفاصيل خدمة ${service.title}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0F3F1A] px-3 py-2.5 text-xs font-black text-white shadow-[0_6px_0_rgba(5,37,13,.16)] md:min-h-[50px] md:rounded-2xl md:px-4 md:py-3 md:text-sm"
          >
            التفاصيل
            <Maximize2 className="h-4 w-4" />
          </button>
          <a
            href={`https://wa.me/${whatsapp}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`التواصل عبر واتساب بشأن خدمة ${service.title}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D8C8AA] bg-white px-3 py-2.5 text-xs font-black text-[#0F3F1A] md:min-h-[50px] md:rounded-2xl md:px-4 md:py-3 md:text-sm"
          >
            <MessageCircle className="h-4 w-4 text-[#159447]" />
            واتساب
          </a>
        </div>
      </div>
    </article>
  );
}

function ServiceDetailsModal({ service, whatsapp, onClose }) {
  const Icon = service.icon;
  const whatsappText = buildServiceWhatsappMessage(service);
  const wayaakHref = buildWeyaakHref(service);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="arkline-service-dialog-title">
      <button type="button" aria-label="إغلاق تفاصيل الخدمة" className="absolute inset-0 bg-[#07150C]/70 backdrop-blur-sm" onClick={onClose} />

      <article
        data-provider-id={provider.id}
        data-service-id={service.id}
        className="relative z-10 max-h-[94dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_rgba(0,0,0,.32)] md:max-h-[90dvh] md:rounded-[2rem]"
      >
        <div className="relative h-56 overflow-hidden md:h-80">
          <Image src={resolveProviderMedia(service.image)} alt={service.title} fill className="object-cover" sizes="(max-width:768px) 100vw,896px" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/92 text-[#0F3F1A] shadow-xl backdrop-blur-xl"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-7 md:bottom-7">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full border border-white/45 bg-white/88 px-3 py-2 text-[11px] font-black text-[#0F3F1A] backdrop-blur-xl">تفاصيل خدمة أركلين</span>
                <span dir="ltr" className="inline-flex rounded-full border border-white/35 bg-black/35 px-3 py-2 text-[10px] font-black tracking-wide text-white backdrop-blur-xl">{service.id}</span>
              </div>
              <h3 id="arkline-service-dialog-title" className="mt-3 text-2xl font-black text-white md:text-4xl">{service.title}</h3>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/50 bg-white/90 text-[#0F3F1A] shadow-2xl backdrop-blur-xl">
              <Icon className="h-7 w-7" />
            </span>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <p className="text-base leading-8 text-[#625A50] md:text-lg">{service.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[#E3D5BD] bg-[#FBF7EF] px-3 py-2 text-xs font-bold text-[#66583F]">{tag}</span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ModalInfo icon={MapPin} title="نطاق التنفيذ" value="العين وأبوظبي" />
            <ModalInfo icon={Ruler} title="المقاسات" value="حسب الموقع والمشروع" />
            <ModalInfo icon={BriefcaseBusiness} title="التسعير" value="بعد المعاينة والتفاصيل" />
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-[#E6DCC8] bg-[#FBF7EF] p-5">
            <h4 className="text-lg font-black text-[#0F3F1A]">البيانات المطلوبة لهذه الخدمة</h4>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {service.requiredDetails.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-2xl bg-white p-3 text-sm font-bold leading-6 text-[#4F4A42] shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href={wayaakHref}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-4 py-3 text-sm font-black text-white shadow-[0_7px_0_rgba(5,37,13,.16)]"
            >
              <Bot className="h-5 w-5 text-[#F4CA61]" />
              اسأل وياك
            </Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`تواصل مباشر عبر واتساب بشأن خدمة ${service.title}`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#D8C8AA] bg-white px-4 py-3 text-sm font-black text-[#0F3F1A]"
            >
              <MessageCircle className="h-5 w-5 text-[#159447]" />
              تواصل مباشر
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

function ModalInfo({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.4rem] border border-[#E6DCC8] bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF2CF] text-[#0F3F1A]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-black text-[#A66B19]">{title}</p>
        <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A]">{value}</p>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article id={product.id} itemScope itemType="https://schema.org/Product" data-provider-id={provider.id} data-product-id={product.id} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_48px_rgba(67,45,17,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(67,45,17,.15)]">
      <meta itemProp="sku" content={product.id} />
      <meta itemProp="brand" content="ARKLEEN" />
      <div className="relative h-56 overflow-hidden bg-[#E8D5B4]">
        <Image src={product.image} alt={`${product.title} من أركلين للنجارة والتصميم الداخلي في العين`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:767px) 100vw,33vw" itemProp="image" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[11px] font-black text-[#0F3F1A] shadow-lg">{product.category}</span>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 itemProp="name" className="text-xl font-black text-[#0F3F1A]">{product.title}</h3>
          <span dir="ltr" className="rounded-full bg-[#F6F0E5] px-2.5 py-1 text-[9px] font-black tracking-wide text-[#8A6A35]">{product.id}</span>
        </div>
        <p itemProp="description" className="mt-3 leading-8 text-[#625A50]">{product.description}</p>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#FBF7EF] px-4 py-3 text-sm">
          <span className="font-bold text-[#6A5B43]">متوفر حسب الطلب</span>
          <span className="font-black text-[#0F3F1A]">السعر حسب المواصفات</span>
        </div>
        <Link href={`/request-quote?provider=arkleen&productId=${encodeURIComponent(product.id)}&product=${encodeURIComponent(product.title)}`} className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-[#D4AF37] bg-[#FFF9EA] px-4 py-3 text-sm font-black text-[#0F3F1A]">
          اطلب تفاصيل المنتج
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
