import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WeyaakHeroCard from '../components/WeyaakHeroCard';
import { ArrowLeft, MapPin, Search, ShoppingBag, UsersRound, Wrench, Globe, Zap, MessageSquare, CheckCircle, Building2 } from 'lucide-react';

const SITE_URL = 'https://bietalreef.ae';

export default function Home() {
  const description = 'بيت الريف محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. من أول استفسار إلى آخر فاتورة.';
  
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'بيت الريف',
      alternateName: 'Biet Alreef',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description,
      areaServed: [
        { '@type': 'City', name: 'دبي' },
        { '@type': 'City', name: 'أبوظبي' },
        { '@type': 'City', name: 'الشارقة' },
        { '@type': 'City', name: 'عجمان' },
        { '@type': 'City', name: 'أم القيوين' },
        { '@type': 'City', name: 'رأس الخيمة' },
        { '@type': 'City', name: 'الفجيرة' }
      ],
      contactPoint: { '@type': 'ContactPoint', telephone: '+971567856001', contactType: 'customer support', areaServed: 'AE', availableLanguage: ['Arabic', 'English'] },
      sameAs: ['https://www.instagram.com/bietalreef', 'https://www.facebook.com/share/14fy6hGM7SJ/', 'https://youtube.com/@bietalreef', 'https://www.tiktok.com/@bietalreef0', 'https://www.linkedin.com/in/bietalreef'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'بيت الريف',
      url: SITE_URL,
      inLanguage: 'ar-AE',
      potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/providers?search={search_term_string}`, 'query-input': 'required name=search_term_string' },
    },
  ];

  return (
    <>
      <SEOHead
        title="بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات"
        description={description}
        keywords="بيت الريف, محرك الأعمال الرقمي, مقاولات الإمارات, مزودو خدمات, دليل الإمارات, مواد بناء, تصميم داخلي, صيانة, وياك AI, دبي, أبوظبي, الشارقة"
        canonicalPath="/"
        structuredData={structuredData}
      />

      <div dir="rtl" className="app-viewport-lock bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar />
        <main>
          {/* ═══ HERO SECTION - Premium Design ═══ */}
          <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] overflow-hidden bg-[#0F3F1A]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src="/images/uae-directory-hero.jpg" 
                alt="دليل الإمارات الشامل لخدمات البناء والمقاولات" 
                fill 
                className="object-cover"
                priority
                quality={90}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F3F1A]/40 via-[#0F3F1A]/50 to-[#0F3F1A]/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F3F1A]/60 via-transparent to-[#0F3F1A]/40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center px-4">
              <div className="max-w-4xl text-center text-white">
                <div className="mb-6 md:mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm md:text-base font-black tracking-wide">محرك الأعمال الرقمي</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 md:mb-6">
                  كل طريق يبدأ من اختيار القسم الصحيح
                </h1>

                <p className="text-base md:text-xl font-semibold leading-8 mb-8 md:mb-10 max-w-2xl mx-auto text-white/90">
                  بيت الريف ليس دليلاً عادياً فقط. هو منظومة تشغيل رقمية متكاملة تساعدك على الوصول للحل المناسب وتساعد مزود الخدمة على إدارة نشاطه التجاري بكفاءة.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Link href="/weyaak" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white text-[#0F3F1A] px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    ابدأ كعميل
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  </Link>
                  <Link href="/providers" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-white text-white px-6 md:px-8 py-3 text-sm md:text-base font-black hover:bg-white/10 transition-all hover:-translate-y-1">
                    ابدأ كمزود خدمة
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-2 bg-white/60 rounded-full" />
              </div>
            </div>
          </section>

          {/* ═══ UAE DIRECTORY SECTION ═══ */}
          <section className="bg-white py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-3 md:mb-4">
                  دليل الإمارات الشامل
                </h2>
                <p className="text-base md:text-lg font-semibold text-gray-600 max-w-2xl mx-auto">
                  ابحث عن خدمات البناء والمقاولات والصيانة في جميع إمارات الدولة
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { name: 'دبي', icon: '🏙️', desc: 'خدمات شاملة في دبي' },
                  { name: 'أبوظبي', icon: '🏛️', desc: 'مزودو خدمات موثوقون' },
                  { name: 'الشارقة', icon: '🏢', desc: 'حلول متكاملة' },
                  { name: 'عجمان', icon: '🏗️', desc: 'متخصصون في البناء' },
                  { name: 'أم القيوين', icon: '🔨', desc: 'خدمات متنوعة' },
                  { name: 'رأس الخيمة', icon: '🛠️', desc: 'فريق محترف' },
                  { name: 'الفجيرة', icon: '⚙️', desc: 'دعم شامل' },
                ].map((emirate, idx) => (
                  <Link key={idx} href={`/uae/${emirate.name.toLowerCase()}`} className="group rounded-2xl border-2 border-[#E6DCC8] bg-white p-6 md:p-8 hover:border-[#0F3F1A] hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-3">{emirate.icon}</div>
                    <h3 className="text-xl md:text-2xl font-black text-[#0F3F1A] mb-2">{emirate.name}</h3>
                    <p className="text-sm md:text-base font-semibold text-gray-600">{emirate.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-[#0F3F1A] font-black group-hover:translate-x-2 transition-transform">
                      <span>استكشف</span>
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ THREE PATHS SECTION ═══ */}
          <section className="bg-[#F7F2E8] py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-3 md:mb-4">
                  اختر طريقك المناسب
                </h2>
                <p className="text-base md:text-lg font-semibold text-gray-600 max-w-2xl mx-auto">
                  ثلاث طرق مختلفة للوصول إلى الحل الذي تبحث عنه
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    title: 'بحث مباشر',
                    icon: Search,
                    desc: 'تصفح دليل شامل لمزودي الخدمات والمقاولين في الإمارات',
                    cta: 'ابدأ البحث',
                    href: '/uae'
                  },
                  {
                    title: 'وياك الذكي',
                    icon: null,
                    isWeyaak: true,
                    desc: 'مساعد ذكي يفهم احتياجك ويقترح عليك الأنسب',
                    cta: 'جرب وياك',
                    href: '/weyaak'
                  },
                  {
                    title: 'مناقصة داخلية',
                    icon: ShoppingBag,
                    desc: 'احصل على عروض من متخصصين معتمدين',
                    cta: 'أنشئ طلبك',
                    href: '/services'
                  }
                ].map((path, idx) => {
                  const Icon = path.icon;
                  return (
                    <Link key={idx} href={path.href} className="group rounded-2xl border-2 border-white bg-white p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-[#0F3F1A] transition-all hover:-translate-y-1">
                      <div className="h-14 w-14 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-[#0F3F1A] flex items-center justify-center mb-4 md:mb-6 overflow-hidden">
                        {path.isWeyaak ? (
                          <Image src="/images/weyaak-logo.jpg" alt="Weyaak" width={64} height={64} className="object-cover" />
                        ) : (
                          <Icon className="h-7 w-7 md:h-8 md:w-8 text-white" aria-hidden="true" />
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2 md:mb-3">{path.title}</h3>
                      <p className="text-sm md:text-base font-semibold text-gray-600 mb-4 md:mb-6">{path.desc}</p>
                      <span className="inline-flex items-center gap-2 text-[#0F3F1A] font-black group-hover:translate-x-2 transition-transform">
                        {path.cta}
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ PROVIDER SECTION ═══ */}
          <section className="bg-white py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4">
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs md:text-sm font-black text-[#6F5400] mb-2 block">لمزود الخدمة</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F3F1A] mb-3 md:mb-4">
                  أدر نشاطك من هاتفك
                </h2>
                <p className="text-base md:text-lg font-semibold text-gray-600 max-w-2xl mx-auto">
                  منظومة متكاملة لإدارة أعمالك وبناء حضورك الرقمي
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {[
                  { title: 'صفحة احترافية', icon: Globe, desc: 'ملف أعمال متكامل يعكس نشاطك بشكل احترافي' },
                  { title: 'ظهور رقمي', icon: Zap, desc: 'ظهور في Google والذكاء الاصطناعي' },
                  { title: 'مستندات ذكية', icon: Wrench, desc: 'عروض أسعار وعقود احترافية بدقائق' },
                  { title: 'مناقصات مؤهلة', icon: ShoppingBag, desc: 'طلبات تناسب تخصصك ومنطقتك' }
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="rounded-2xl border-2 border-[#E6DCC8] bg-white p-6 md:p-8 hover:shadow-lg transition-all">
                      <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-[#0F3F1A]/10 flex items-center justify-center mb-4 md:mb-6">
                        <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#0F3F1A]" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-[#0F3F1A] mb-2">{feature.title}</h3>
                      <p className="text-sm md:text-base font-semibold text-gray-600">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 md:mt-14 text-center">
                <a href="https://app.bietalreef.ae/onboarding" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] text-white px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  ابدأ كمزود خدمة
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          {/* ═══ CTA SECTION ═══ */}
          <section className="bg-[#0F3F1A] py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-4 text-center text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                كل أعمال البناء والمقاولات في منصة واحدة
              </h2>
              <p className="text-base md:text-lg font-semibold mb-8 md:mb-10 text-white/90">
                من أول استفسار... إلى آخر فاتورة. بيت الريف هو نظام التشغيل الرقمي لقطاع المقاولات والبناء في الإمارات.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link href="/services" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white text-[#0F3F1A] px-6 md:px-8 py-3 text-sm md:text-base font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  ابدأ كعميل
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </Link>
                <a href="https://app.bietalreef.ae/onboarding" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-white text-white px-6 md:px-8 py-3 text-sm md:text-base font-black hover:bg-white/10 transition-all hover:-translate-y-1">
                  ابدأ كمزود خدمة
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
