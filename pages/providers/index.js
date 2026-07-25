import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import ProvidersSmartFooter from '../../components/ProvidersSmartFooter';
import {
  ArrowRight,
  Building2,
  MessageCircle,
  Users,
  ChevronLeft,
} from 'lucide-react';
import { ProviderCard } from '../../components/cards/SmartEntityCard';
import { getPublishedProviderCards } from '../../lib/platformDirectoryCards';
import ProvidersDirectoryHero from '../../components/ProvidersDirectoryHero';
import SectionBackBar from '../../components/SectionBackBar';

const providerSectorCards = [
  {
    title: 'المقاولات العامة والبناء والتشييد',
    eyebrow: 'قطاع البناء',
    desc: 'شركات ومقاولون لتنفيذ الفلل والملاحق والمجالس والمشاريع السكنية والتجارية.',
    href: '/providers/specialty/general-contracting',
    image: '/images/sector-cards/general-contracting-construction-card.webp',
    tags: ['مقاولات', 'بناء', 'تشييد'],
  },
  {
    title: 'مكاتب هندسية واستشارات وتصميم',
    eyebrow: 'قطاع التصميم',
    desc: 'مكاتب هندسية للتصميم المعماري والإنشائي وMEP والاعتمادات والإشراف.',
    href: '/providers/specialty/engineering-consultants',
    image: '/images/sector-cards/engineering-consultants-design-card.webp',
    tags: ['تصميم', 'استشارات', 'إشراف'],
  },
  {
    title: 'مواد البناء والمحلات والمتاجر',
    eyebrow: 'قطاع التوريد',
    desc: 'مصادر مواد البناء والتشطيب والمتاجر المرتبطة بالمشاريع والمقاولين.',
    href: '/providers/specialty/building-materials',
    image: '/images/sector-cards/building-materials-stores-card.webp',
    tags: ['مواد بناء', 'متاجر', 'توريد'],
  },
  {
    title: 'الصيانة والتشطيبات والتكييف والسباكة والكهرباء',
    eyebrow: 'قطاع الصيانة',
    desc: 'مزودون لأعمال الصيانة العامة والتشطيبات والتكييف والسباكة والكهرباء.',
    href: '/providers/specialty/general-maintenance',
    image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp',
    tags: ['صيانة', 'تشطيبات', 'MEP'],
  },
  {
    title: 'ألمنيوم وزجاج وأخشاب',
    eyebrow: 'قطاع الواجهات والنجارة',
    desc: 'أعمال الألمنيوم والزجاج والأبواب والخزائن والمطابخ والأعمال الخشبية.',
    href: '/providers/specialty/aluminium-glass',
    image: '/images/sector-cards/aluminium-glass-wood-card.webp',
    tags: ['ألمنيوم', 'زجاج', 'أخشاب'],
  },
  {
    title: 'تنظيف وخدمات وتأجير معدات',
    eyebrow: 'قطاع التشغيل',
    desc: 'خدمات التنظيف وما بعد البناء وتأجير المعدات والسقالات ومعدات المواقع.',
    href: '/providers/specialty/cleaning-services',
    image: '/images/sector-cards/cleaning-equipment-rental-card.webp',
    tags: ['تنظيف', 'معدات', 'تشغيل'],
  },
  {
    title: 'مصانع وشركات توريد وورش',
    eyebrow: 'قطاع التصنيع والتوريد',
    desc: 'مصانع وورش وشركات توريد تخدم مشاريع البناء والتشطيب والمواد حسب الطلب.',
    href: '/providers/specialty/building-materials',
    image: '/images/sector-cards/factories-suppliers-workshops-card.webp',
    tags: ['مصانع', 'ورش', 'توريد'],
  },
];

const steps = [
  {
    t: 'تعرف على آلية الانضمام',
    d: 'راجع طريقة عمل المنصة والبيانات المطلوبة لإعداد الملف الرقمي المناسب لنشاطك.',
    i: '01',
  },
  {
    t: 'جهز بيانات النشاط',
    d: 'شارك بيانات التواصل والتخصصات ونطاق الخدمة والصور والمشاريع المتاحة.',
    i: '02',
  },
  {
    t: 'انشر ملفك الرقمي',
    d: 'يتولى فريق بيت الريف مراجعة البيانات وتجهيز الملف ونشره داخل القسم المناسب.',
    i: '03',
  },
];

export default function ProvidersPage({ providers = [] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'مزودو الخدمات في بيت الريف',
    description: 'قسم مستقل لمزودي الخدمات في الإمارات: مقاولون، موردون، ورش، مصانع، مكاتب هندسية وحرفيون.',
    url: 'https://bietalreef.ae/providers',
    mainEntity: providers.map((provider) => ({
      '@type': 'LocalBusiness',
      name: provider.name,
      url: `https://bietalreef.ae${provider.href}`,
      image: provider.coverImage?.startsWith('http') ? provider.coverImage : `https://bietalreef.ae${provider.coverImage}`,
      identifier: provider.providerId,
    })),
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead
        title="مزودو الخدمات | مقاولون وموردون وحرفيون | بيت الريف"
        description="تصفح مزودي خدمات البناء والمقاولات والصيانة والتصميم الداخلي داخل بيت الريف، وافتح الملفات الرقمية أو تعرف على آلية الانضمام."
        keywords="مزودي خدمات الإمارات, مقاولين, موردين, حرفيين, شركات بناء, ورش نجارة, تسجيل مزود خدمة"
        canonicalPath="/providers"
        ogImage="https://bietalreef.ae/images/providers-hero.webp"
        structuredData={structuredData}
      />

      <Navbar pageTitle="مزودو الخدمات" />
      <SectionBackBar />

      <main className="-mt-[1px] [&>section:nth-of-type(2)]:hidden">
        <ProvidersDirectoryHero locale="ar" />
        <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
          <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
            <Image
              src="/images/providers-hero.webp"
              alt="مزودو خدمات البناء والمقاولات والصيانة داخل بيت الريف"
              fill
              priority
              className="-translate-y-[6%] scale-[1.16] object-cover object-[52%_36%] md:-translate-y-[4%] md:scale-110 md:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#FDFBF7]/48 via-[#FDFBF7]/8 to-transparent" />

            <Link
              href="/"
              className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:right-8 md:top-8 md:px-4 md:py-3 md:text-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              العودة إلى الرئيسية
            </Link>

            <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm">
                <Users className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />
                بوابة مزودي الخدمات
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] md:text-6xl">
                اجعل نشاطك حاضرًا
                <br />
                حيث يبحث العميل عن الخدمة
              </h1>

              <div className="mt-5 max-w-3xl rounded-[2.1rem] border border-white/70 bg-white/64 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                <p className="max-w-2xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">
                  بيت الريف لا يضعك في قائمة أسماء فقط؛ بل يبني لك حضورًا رقميًا واضحًا يربط نشاطك بالمكان والتخصص والطلبات داخل منصة موجهة لقطاع البناء والصيانة في الإمارات.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href="/how-it-works"
                    className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                      <Building2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    تعرف على المنصة وكيف تعمل
                  </Link>

                  <a
                    href="https://wa.me/971567856001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    </span>
                    تحدث مع فريق الانضمام
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="provider-sectors" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <div className="mb-8 text-center md:text-right">
            <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">
              7 قطاعات رئيسية
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">اختر القطاع الأقرب لنشاطك</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">
              اختر القطاع المناسب للوصول إلى مزودي الخدمة والتخصصات المرتبطة به ضمن رحلة تصفح واضحة ومتناسقة.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {providerSectorCards.map((card) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-[1.6rem] border border-[#DCC895] bg-white shadow-[0_8px_0_#E7DAC0,0_18px_35px_rgba(18,58,70,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_0_#E1D0AD,0_22px_42px_rgba(18,58,70,.14)]"
              >
                <div className="relative h-40 overflow-hidden bg-[#F5EFE4] sm:h-44">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/70 via-[#0F3F1A]/18 to-transparent" />
                  <span className="absolute bottom-3 right-3 rounded-full border border-white/50 bg-white/92 px-3 py-1 text-[10px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">
                    {card.eyebrow}
                  </span>
                </div>

                <div className="p-4 md:p-5">
                  <h3 className="text-lg font-black leading-7 text-[#0F3F1A]">{card.title}</h3>
                  <p className="mt-2 min-h-[66px] text-[13px] font-semibold leading-6 text-gray-600">{card.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#FDF7E8] px-2.5 py-1 text-[10px] font-black text-[#8A6A00]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-xl bg-[#123A46] px-4 py-2.5 text-xs font-black text-white shadow-[0_7px_0_rgba(18,58,70,0.12)] transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]"
                  >
                    افتح القطاع
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-10 text-center md:text-right">
            <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00]">
              مزودون فعليون داخل المنصة
            </span>
            <h2 className="mb-3 mt-4 text-3xl font-black text-[#0F3F1A]">مزودون متاحون الآن</h2>
            <p className="leading-8 text-gray-500">
              كل كارت يفتح ملف مزود فعليًا، مع معلومات النشاط والخدمات والمشاريع ومسارات التواصل وطلب التفاصيل.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} item={provider} />
            ))}
          </div>
        </section>

        <section className="border-y border-[#E6DCC8] bg-white py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">كيف تنضم لشبكة بيت الريف؟</h2>
              <p className="text-gray-500">مسار واضح يبدأ بالتعرف على المنصة ثم تجهيز ملف النشاط</p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.i} className="relative text-center">
                  <div className="absolute -top-10 left-1/2 z-0 -translate-x-1/2 text-8xl font-black text-gray-50">
                    {step.i}
                  </div>
                  <div className="relative z-10">
                    <h3 className="mb-4 text-xl font-black text-[#0F3F1A]">{step.t}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/how-it-works"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 font-black text-white shadow-[0_9px_0_rgba(5,37,13,.16)]"
              >
                تعرف على المنصة وكيف تعمل
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <ProvidersSmartFooter locale="ar" />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: { providers: await getPublishedProviderCards('ar') },
    revalidate: 300,
  };
}
