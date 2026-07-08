import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { ArrowRight, Building2, MessageCircle, Users, Search, ChevronLeft } from 'lucide-react';
import { SERVICE_CATEGORIES, UAE_EMIRATES } from '../../data/siteTaxonomy';
import { providers } from '../../data/providers';
import { ProviderCard } from '../../components/cards/SmartEntityCard';

const steps = [
  { t: 'أنشئ ملفك الشخصي', d: 'سجل بيانات شركتك، تخصصاتك، ونطاق عملك الجغرافي في الإمارات.', i: '01' },
  { t: 'وثق أعمالك', d: 'أضف صوراً لمشاريعك السابقة وشهادات الخبرة لتعزيز ثقة العملاء.', i: '02' },
  { t: 'استقبل الطلبات', d: 'ابدأ في استقبال طلبات عروض الأسعار المباشرة من العملاء المستهدفين.', i: '03' }
];

function normalizeText(value) {
  return String(value || '').toLowerCase().trim();
}

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
  const [specialtySearch, setSpecialtySearch] = useState('');
  const query = normalizeText(specialtySearch);
  const filteredCategories = SERVICE_CATEGORIES.filter((service) => {
    if (!query) return true;
    return [service.nameAr, service.nameEn, service.slug, service.descAr].some((field) => normalizeText(field).includes(query));
  });

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
          <div className="relative min-h-[610px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
            <Image
              src="/images/providers-hero.webp"
              alt="مزودو خدمات البناء والمقاولات والصيانة داخل بيت الريف"
              fill
              priority
              className="object-cover object-[52%_28%] md:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/30 to-white/5" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#FDFBF7]/70 via-[#FDFBF7]/22 to-transparent md:from-[#FDFBF7]/58 md:via-[#FDFBF7]/12" />

            <Link href="/" className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-[#123A46]/92 px-3 py-2 text-xs font-black text-white shadow-xl shadow-[#123A46]/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#0E3440] md:right-8 md:top-8 md:px-4 md:py-3 md:text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D4AF37] text-[#123A46] shadow-inner">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              العودة إلى الرئيسية
            </Link>

            <div className="relative z-10 mx-auto flex min-h-[610px] max-w-6xl flex-col justify-end px-4 pb-8 pt-28 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
              <div className="max-w-3xl rounded-[2.1rem] border border-white/70 bg-white/62 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-7">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/20 md:text-sm">
                  <Users className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />
                  بوابة مزودي الخدمات
                </div>
                <h1 className="text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">
                  اجعل نشاطك حاضرًا<br />حيث يبحث العميل عن الخدمة
                </h1>
                <p className="mt-4 max-w-2xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">
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

        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-10 text-center md:text-right">
            <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00]">مزودون فعليون داخل المنصة</span>
            <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] mb-3">مزودون متاحون الآن</h2>
            <p className="text-gray-500 leading-8">هذه أول ملفات مزودي خدمات حقيقية داخل بيت الريف. الكارت هنا ليس معاينة شكلية؛ كل كارت يفتح ملف مزود فعلي ومسار تواصل أو طلب سعر.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => <ProviderCard key={provider.slug} item={toProviderCardItem(provider)} />)}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div><h2 className="text-3xl font-black text-[#0F3F1A] mb-2">تصفح مزودي الخدمات حسب التخصص</h2><p className="text-gray-500">كل تخصص يفتح داخل مسار مزودي الخدمات وليس داخل دليل الإمارات أو الخدمات والعروض.</p></div>
            <div className="relative w-full md:w-auto"><Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" value={specialtySearch} onChange={(event) => setSpecialtySearch(event.target.value)} placeholder="ابحث عن تخصص..." aria-label="ابحث عن تخصص" className="w-full md:w-72 pr-10 pl-4 py-2 rounded-xl border border-[#E6DCC8] bg-white text-sm focus:outline-none focus:border-emerald-500" /></div>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((service) => (
                <Link key={service.slug} href={'/providers/specialty/' + service.slug} className="group bg-white rounded-3xl border border-[#E6DCC8] p-8 hover:shadow-xl transition-all">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                  <h3 className="text-xl font-black text-[#0F3F1A] mb-3">مزودو {service.nameAr}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.descAr}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50"><span className="text-xs font-bold text-emerald-600">استعرض مزودي هذا التخصص</span><ChevronLeft className="w-4 h-4 text-emerald-600 group-hover:translate-x-[-4px] transition-transform" /></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#E6DCC8] bg-white p-10 text-center shadow-sm" role="status">
              <h3 className="text-2xl font-black text-[#0F3F1A]">لا توجد نتائج</h3>
              <p className="mt-3 text-gray-600">لم نعثر على تخصص يطابق بحثك. جرّب كلمة أخرى أو تواصل معنا لإضافة تخصص جديد.</p>
              <button type="button" onClick={() => setSpecialtySearch('')} className="mt-6 rounded-2xl bg-primary px-6 py-3 text-sm font-black text-white">مسح البحث</button>
            </div>
          )}
        </section>

        <section className="bg-white py-20 border-y border-[#E6DCC8]"><div className="max-w-6xl mx-auto px-4"><div className="text-center mb-16"><h2 className="text-3xl font-black text-[#0F3F1A] mb-4">كيف تنضم لشبكة بيت الريف؟</h2><p className="text-gray-500">خطوات بسيطة لتبدأ رحلة نجاحك الرقمي معنا</p></div><div className="grid md:grid-cols-3 gap-12">{steps.map((step, i) => <div key={i} className="text-center relative"><div className="text-8xl font-black text-gray-50 absolute -top-10 left-1/2 -translate-x-1/2 z-0">{step.i}</div><div className="relative z-10"><h3 className="text-xl font-black text-[#0F3F1A] mb-4">{step.t}</h3><p className="text-gray-500 text-sm leading-relaxed">{step.d}</p></div></div>)}</div></div></section>

        <section className="max-w-6xl mx-auto px-4 py-20"><div className="bg-[#FDFBF7] rounded-[40px] border border-[#E6DCC8] p-8 md:p-12"><div className="flex flex-col md:flex-row gap-12 items-center"><div className="flex-1"><h2 className="text-3xl font-black text-[#0F3F1A] mb-6">التغطية الجغرافية منفصلة عن قسم المزودين</h2><p className="text-gray-600 mb-8 leading-relaxed">إذا كنت تريد مزود خدمة حسب المدينة أو الإمارة، انتقل إلى دليل الإمارات. أما هنا فالتصفح يكون حسب نوع المزود والتخصص.</p><div className="flex flex-wrap gap-2">{UAE_EMIRATES.map((emirate) => <Link key={emirate.slug} href={'/uae/' + emirate.slug} className="px-4 py-2 rounded-full bg-white border border-[#E6DCC8] text-xs font-bold text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all">{emirate.nameAr}</Link>)}</div></div><div className="flex-1 grid grid-cols-2 gap-4"><div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center"><div className="text-3xl font-black text-[#0F3F1A] mb-1">{providers.length}</div><div className="text-[10px] font-bold text-gray-400 uppercase">مزودون متاحون</div></div><div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center"><div className="text-3xl font-black text-[#0F3F1A] mb-1">{SERVICE_CATEGORIES.length}</div><div className="text-[10px] font-bold text-gray-400 uppercase">تخصصات</div></div><div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center"><div className="text-3xl font-black text-[#0F3F1A] mb-1">7</div><div className="text-[10px] font-bold text-gray-400 uppercase">إمارات</div></div><div className="bg-white p-6 rounded-3xl border border-[#E6DCC8] text-center"><div className="text-3xl font-black text-[#0F3F1A] mb-1">وياك</div><div className="text-[10px] font-bold text-gray-400 uppercase">مساعد ذكي</div></div></div></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
