import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { ArrowRight, Building2, MessageCircle, Users, ChevronLeft, MapPin, Sparkles } from 'lucide-react';
import { UAE_EMIRATES } from '../../data/siteTaxonomy';
import { providers } from '../../data/providers';
import { ProviderCard } from '../../components/cards/SmartEntityCard';

const providerSectorCards = [
  {
    title: 'المقاولات العامة والبناء والتشييد',
    eyebrow: 'قطاع البناء',
    desc: 'شركات ومقاولون لتنفيذ الفلل والملاحق والمجالس والمشاريع السكنية والتجارية.',
    href: '/providers/specialty/general-contracting',
    image: '/images/sector-cards/general-contracting-construction-card.webp',
    tags: ['مقاولات', 'بناء', 'تشييد']
  },
  {
    title: 'مكاتب هندسية واستشارات وتصميم',
    eyebrow: 'قطاع التصميم',
    desc: 'مكاتب هندسية للتصميم المعماري والإنشائي وMEP والاعتمادات والإشراف.',
    href: '/providers/specialty/engineering-consultants',
    image: '/images/sector-cards/engineering-consultants-design-card.webp',
    tags: ['تصميم', 'استشارات', 'إشراف']
  },
  {
    title: 'مواد البناء والمحلات والمتاجر',
    eyebrow: 'قطاع التوريد',
    desc: 'مصادر مواد البناء والتشطيب والمتاجر المرتبطة بالمشاريع والمقاولين.',
    href: '/providers/specialty/building-materials',
    image: '/images/sector-cards/building-materials-stores-card.webp',
    tags: ['مواد بناء', 'متاجر', 'توريد']
  },
  {
    title: 'الصيانة والتشطيبات والتكييف والسباكة والكهرباء',
    eyebrow: 'قطاع الصيانة',
    desc: 'مزودون لأعمال الصيانة العامة والتشطيبات والتكييف والسباكة والكهرباء.',
    href: '/providers/specialty/general-maintenance',
    image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp',
    tags: ['صيانة', 'تشطيبات', 'MEP']
  },
  {
    title: 'ألمنيوم وزجاج وأخشاب',
    eyebrow: 'قطاع الواجهات والنجارة',
    desc: 'أعمال الألمنيوم والزجاج والأبواب والخزائن والمطابخ والأعمال الخشبية.',
    href: '/providers/specialty/aluminium-glass',
    image: '/images/sector-cards/aluminium-glass-wood-card.webp',
    tags: ['ألمنيوم', 'زجاج', 'أخشاب']
  },
  {
    title: 'تنظيف وخدمات وتأجير معدات',
    eyebrow: 'قطاع التشغيل',
    desc: 'خدمات التنظيف وما بعد البناء وتأجير المعدات والسقالات ومعدات المواقع.',
    href: '/providers/specialty/cleaning-services',
    image: '/images/sector-cards/cleaning-equipment-rental-card.webp',
    tags: ['تنظيف', 'معدات', 'تشغيل']
  },
  {
    title: 'مصانع وشركات توريد وورش',
    eyebrow: 'قطاع التصنيع والتوريد',
    desc: 'مصانع وورش وشركات توريد تخدم مشاريع البناء والتشطيب والمواد حسب الطلب.',
    href: '/providers/specialty/building-materials',
    image: '/images/sector-cards/factories-suppliers-workshops-card.webp',
    tags: ['مصانع', 'ورش', 'توريد']
  }
];

const extraSpecialties = [
  { name: 'تصميم داخلي', href: '/providers/specialty/interior-design' },
  { name: 'تشطيبات', href: '/providers/specialty/finishing-works' },
  { name: 'نجارة', href: '/providers/specialty/carpentry' },
  { name: 'كهرباء', href: '/providers/specialty/electrical' },
  { name: 'سباكة', href: '/providers/specialty/plumbing' },
  { name: 'تكييف وتبريد', href: '/providers/specialty/ac-technicians' },
  { name: 'رخام وسيراميك', href: '/providers/specialty/marble-ceramic' },
  { name: 'أنظمة ذكية وكاميرات', href: '/providers/specialty/smart-systems' },
  { name: 'تنسيق حدائق', href: '/providers/specialty/landscaping' },
  { name: 'تأجير معدات', href: '/providers/specialty/equipment-rental' },
  { name: 'نقل وشحن', href: '/providers/specialty/transport-logistics' },
  { name: 'أثاث وفرش وديكور', href: '/providers/specialty/furniture-decor' }
];

const steps = [
  { t: 'أنشئ ملفك الشخصي', d: 'سجل بيانات شركتك، تخصصاتك، ونطاق عملك الجغرافي في الإمارات.', i: '01' },
  { t: 'وثق أعمالك', d: 'أضف صوراً لمشاريعك السابقة وشهادات الخبرة لتعزيز ثقة العملاء.', i: '02' },
  { t: 'استقبل الطلبات', d: 'ابدأ في استقبال طلبات عروض الأسعار المباشرة من العملاء المستهدفين.', i: '03' }
];

function toProviderCardItem(provider) {
  return {
    id: provider.slug,
    entityType: 'provider',
    premium: provider.slug === 'al-hoot-marble-granite-factory',
    name: provider.nameAr,
    nameEn: provider.nameEn,
    providerType: provider.providerTypeAr,
    emirate: provider.emirate,
    city: provider.city === 'al-ain' ? 'العين' : provider.city,
    area: provider.area === 'mazid-company-camp' ? 'مزيد - معسكر الشركات' : provider.area,
    specialties: provider.services || [],
    verified: provider.verified,
    coverImage: provider.cover || provider.logo,
    logoText: provider.nameAr?.slice(0, 1) || 'م',
    href: '/providers/' + provider.slug,
    whatsapp: provider.whatsapp ? `https://wa.me/${String(provider.whatsapp).replace(/\D/g, '')}` : undefined,
    summary: provider.descriptionAr,
  };
}

export default function ProvidersPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'مزودو الخدمات في بيت الريف',
    description: 'قسم مستقل لمزودي الخدمات في الإمارات: مقاولون، موردون، ورش، مصانع، مكاتب هندسية وحرفيون.',
    url: 'https://bietalreef.ae/providers'
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead 
        title="مزودو الخدمات | مقاولون وموردون وحرفيون | بيت الريف"
        description="تصفح قسم مزودي الخدمات في بيت الريف حسب التخصص أو سجل نشاطك للظهور داخل المنصة. هذا القسم مستقل عن دليل الإمارات والخدمات والمنتجات."
        keywords="مزودي خدمات الإمارات, مقاولين, موردين, حرفيين, شركات بناء, تسجيل مزود خدمة"
        structuredData={structuredData}
      />
      <Navbar pageTitle="مزودو الخدمات" />
      
      <main className="-mt-[1px]">
        <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
          <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
            <Image
              src="/images/providers-hero.webp"
              alt="مزودو خدمات البناء والمقاولات والصيانة داخل بيت الريف"
              fill
              priority
              className="scale-[1.16] object-cover object-[52%_36%] -translate-y-[6%] md:scale-110 md:object-center md:-translate-y-[4%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#FDFBF7]/48 via-[#FDFBF7]/8 to-transparent" />

            <Link href="/" className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:right-8 md:top-8 md:px-4 md:py-3 md:text-sm">
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
                اجعل نشاطك حاضرًا<br />حيث يبحث العميل عن الخدمة
              </h1>

              <div className="mt-5 max-w-3xl rounded-[2.1rem] border border-white/70 bg-white/64 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                <p className="max-w-2xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">
                  بيت الريف لا يضعك في قائمة أسماء فقط؛ بل يبني لك حضورًا رقميًا واضحًا يربط نشاطك بالمكان، التخصص، الطلبات، والظهور داخل منصة موجهة لقطاع البناء والصيانة في الإمارات.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link href="/providers/register" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                      <Building2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    سجل شركتك الآن
                  </Link>
                  <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
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
            <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">7 قطاعات رئيسية</span>
            <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">اختر القطاع الأقرب لنشاطك</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">اعتمدنا سبعة كروت فقط للحفاظ على هوية بصرية واضحة. باقي التخصصات تظهر في الفوتر الذكي أسفل الصفحة.</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {providerSectorCards.map((card) => (
              <article key={card.title} className="group overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white shadow-[0_18px_45px_rgba(18,58,70,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(18,58,70,0.15)]">
                <div className="relative h-48 overflow-hidden bg-[#F5EFE4] sm:h-52">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A]/70 via-[#0F3F1A]/18 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#D4AF37]/45 bg-white/84 px-3 py-1.5 text-[11px] font-black text-[#0F3F1A] shadow-lg backdrop-blur-xl">{card.eyebrow}</span>
                    <Sparkles className="h-5 w-5 text-[#F7E7A0] drop-shadow" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-black leading-8 text-[#0F3F1A]">{card.title}</h3>
                  <p className="mt-3 min-h-[76px] text-sm font-semibold leading-7 text-gray-600">{card.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag) => <span key={tag} className="rounded-full bg-[#FDF7E8] px-3 py-1 text-[11px] font-black text-[#8A6A00]">{tag}</span>)}
                  </div>
                  <Link href={card.href} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123A46] px-5 py-3 text-sm font-black text-white shadow-[0_10px_0_rgba(18,58,70,0.12)] transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">
                    افتح القطاع
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14">
          <div className="mb-10 text-center md:text-right">
            <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00]">مزودون فعليون داخل المنصة</span>
            <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] mb-3">مزودون متاحون الآن</h2>
            <p className="text-gray-500 leading-8">هذه أول ملفات مزودي خدمات حقيقية داخل بيت الريف. الكارت هنا ليس معاينة شكلية؛ كل كارت يفتح ملف مزود فعلي ومسار تواصل أو طلب سعر.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => <ProviderCard key={provider.slug} item={toProviderCardItem(provider)} />)}
          </div>
        </section>

        <section className="bg-white py-20 border-y border-[#E6DCC8]"><div className="max-w-6xl mx-auto px-4"><div className="text-center mb-16"><h2 className="text-3xl font-black text-[#0F3F1A] mb-4">كيف تنضم لشبكة بيت الريف؟</h2><p className="text-gray-500">خطوات بسيطة لتبدأ رحلة نجاحك الرقمي معنا</p></div><div className="grid md:grid-cols-3 gap-12">{steps.map((step, i) => <div key={i} className="text-center relative"><div className="text-8xl font-black text-gray-50 absolute -top-10 left-1/2 -translate-x-1/2 z-0">{step.i}</div><div className="relative z-10"><h3 className="text-xl font-black text-[#0F3F1A] mb-4">{step.t}</h3><p className="text-gray-500 text-sm leading-relaxed">{step.d}</p></div></div>)}</div></div></section>

        <section id="provider-smart-footer" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/30 bg-[#0F3F1A] p-5 text-white shadow-[0_28px_70px_rgba(15,63,26,0.22)] md:p-8">
            <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[#D4AF37]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-black text-[#0F3F1A]"><MapPin className="h-4 w-4" />فوتر ذكي</span>
                <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">روابط ذكية لمزودي الخدمات</h2>
                <p className="mt-4 text-sm font-semibold leading-8 text-white/74">التخصصات الإضافية والبحث حسب الإمارة موجودة هنا بشكل منظم، حتى تبقى الصفحة الرئيسية نظيفة وفخمة وسهلة على الموبايل.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-[#0F3F1A] shadow-2xl shadow-black/10">
                  <h3 className="mb-4 text-lg font-black">تخصصات إضافية</h3>
                  <div className="flex flex-wrap gap-2">
                    {extraSpecialties.map((item) => <Link key={item.name} href={item.href} className="rounded-full border border-[#E6DCC8] bg-[#FDFBF7] px-3 py-2 text-xs font-black text-gray-700 transition hover:border-[#D4AF37] hover:text-[#0F3F1A]">{item.name}</Link>)}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-[#0F3F1A] shadow-2xl shadow-black/10">
                  <h3 className="mb-4 text-lg font-black">البحث حسب الإمارة</h3>
                  <div className="flex flex-wrap gap-2">
                    {UAE_EMIRATES.map((emirate) => <Link key={emirate.slug} href={'/uae/' + emirate.slug} className="rounded-full border border-[#E6DCC8] bg-[#FDFBF7] px-3 py-2 text-xs font-black text-gray-700 transition hover:border-[#D4AF37] hover:text-[#0F3F1A]">{emirate.nameAr}</Link>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
