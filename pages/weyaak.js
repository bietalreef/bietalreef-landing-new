import Image from 'next/image';
import Link from 'next/link';
import { Building2, CheckCircle2, FileText, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const SITE_URL = 'https://bietalreef.ae';
const WEYAAK_LOGO = '/images/weyaak-new-logo.jpg';

const actions = [
  { title: 'طلب عرض سعر', desc: 'أرسل احتياجك لفريق بيت الريف بشكل منظم.', href: '/request-quote?source=weyaak', icon: FileText },
  { title: 'إرسال استفسار', desc: 'اسأل عن خدمة أو مزود أو طريقة البدء.', href: '/inquiry?source=weyaak', icon: MessageCircle },
  { title: 'دخول مزود الخدمة', desc: 'افتح تطبيق مزودي الخدمة.', href: 'https://app.bietalreef.ae/login?source=weyaak-page', icon: Building2, external: true },
];

export default function WeyaakPage() {
  const title = 'وياك | مساعد بيت الريف الذكي';
  const description = 'وياك هو مساعد بيت الريف الذكي لخدمات البناء والمقاولات والصيانة والتصميم الداخلي وطلبات عروض الأسعار في الإمارات.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}/weyaak`,
    isPartOf: { '@type': 'WebSite', name: 'بيت الريف', url: SITE_URL },
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords="وياك, Weyaak, مساعد بيت الريف, ذكاء اصطناعي للبناء, عروض أسعار, مقاولات الإمارات"
        canonicalPath="/weyaak"
        ogImage={`${SITE_URL}/og-weyaak.jpg`}
        structuredData={structuredData}
        breadcrumbs={[{ name: 'وياك', href: '/weyaak' }]}
      />

      <div dir="rtl" className="min-h-screen bg-[#F8F3E7] text-[#1F3D2B]">
        <Navbar />
        <main>
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
              <div className="text-center md:text-right">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white px-4 py-2 text-sm font-black text-[#7A5B0A] shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  مجلس وياك الرسمي
                </div>
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.8rem] border border-[#E6DCC8] bg-white shadow-inner md:mx-0">
                  <Image src={WEYAAK_LOGO} alt="شعار وياك — مدخل البيت" width={86} height={86} className="h-20 w-20 object-contain" priority />
                </div>
                <h1 className="text-4xl font-black leading-tight md:text-6xl">
                  وياك
                  <span className="block text-[#B99420]">مساعد بيت الريف الذكي</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg font-bold leading-9 text-[#5F6F65] md:mx-0">
                  هذه الصفحة هي المجلس الرسمي لوياك داخل بيت الريف، ومجهزة لربط مساعد وياك الأصلي لاحقًا مع طلبات العملاء ومزودي الخدمة.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                  <Link href="/request-quote?source=weyaak-hero" className="rounded-2xl bg-[#0F8A3B] px-7 py-4 text-base font-black text-white shadow-lg">
                    ابدأ مع وياك
                  </Link>
                  <Link href="/inquiry?source=weyaak-hero" className="rounded-2xl border border-[#E6DCC8] bg-white px-7 py-4 text-base font-black text-[#1F3D2B] shadow-sm">
                    اسأل وياك
                  </Link>
                </div>
              </div>

              <div className="mx-auto w-full max-w-md rounded-[2rem] border border-[#E6DCC8] bg-white p-5 shadow-2xl shadow-[#1F3D2B]/10">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-[#102A1E] to-[#1F3D2B] p-5 text-white">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-inner">
                      <Image src={WEYAAK_LOGO} alt="Weyaak AI" width={58} height={58} className="h-14 w-14 object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#F7E6A0]">Weyaak AI</p>
                      <h2 className="text-xl font-black">مرحبًا، أنا وياك 👋</h2>
                    </div>
                  </div>
                  <p className="text-sm font-bold leading-7 text-white/80">
                    أساعدك في صياغة الطلب، اختيار نوع الخدمة، وتجهيز البيانات قبل التواصل مع فريق بيت الريف.
                  </p>
                </div>
                <div id="weyaak-live-chat" className="mt-5 rounded-[1.5rem] border border-dashed border-[#D4AF37]/60 bg-[#FFF8E7] p-5 text-center">
                  <MessageCircle className="mx-auto h-8 w-8 text-[#B99420]" />
                  <h3 className="mt-3 text-lg font-black text-[#1F3D2B]">مكان ربط وياك الأصلي</h3>
                  <p className="mt-2 text-sm font-bold leading-7 text-[#5F6F65]">
                    الموضع جاهز لتركيب الدردشة الحقيقية لاحقًا.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-7 text-center">
                <p className="text-sm font-black text-[#B99420]">اختيارات سريعة</p>
                <h2 className="mt-2 text-3xl font-black text-[#1F3D2B]">ماذا تريد من وياك؟</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {actions.map((item) => {
                  const Icon = item.icon;
                  const card = (
                    <div className="h-full rounded-[1.5rem] border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F3E7] text-[#B99420]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-black text-[#1F3D2B]">{item.title}</h3>
                      <p className="mt-3 text-sm font-bold leading-7 text-[#5F6F65]">{item.desc}</p>
                    </div>
                  );
                  return item.external ? <a key={item.title} href={item.href}>{card}</a> : <Link key={item.title} href={item.href}>{card}</Link>;
                })}
              </div>
            </div>
          </section>

          <section className="px-4 pb-14">
            <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-7 shadow-sm md:p-10">
              <p className="text-sm font-black text-[#B99420]">قواعد المرحلة الحالية</p>
              <h2 className="mt-2 text-3xl font-black text-[#1F3D2B]">وياك الآن بوابة مساعدة بدون تعقيد</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {['طلب عرض سعر', 'إرسال استفسار', 'توجيه الزائر للخدمة المناسبة', 'دعم مزود الخدمة في خطوات التسجيل'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#F8F3E7] p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F8A3B]" />
                    <p className="text-sm font-bold leading-7 text-[#1F3D2B]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
