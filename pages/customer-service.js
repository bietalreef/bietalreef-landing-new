import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { ArrowLeft, Bot, CheckCircle2, FileText, Headphones, MessageCircle, Search, ShieldCheck, Sparkles } from 'lucide-react';

const supportPaths = [
  { title: 'لم تجد مزود الخدمة المناسب؟', desc: 'أرسل نوع الخدمة والموقع، وسيساعدك فريق بيت الريف في تجهيز المسار المناسب للوصول إلى مزود أقرب لاحتياجك.', icon: Search },
  { title: 'لم تجد المنتج أو المادة؟', desc: 'اكتب اسم المنتج أو الكمية أو المواصفات المتاحة لديك، وسنساعدك في توجيه الطلب للمورد أو القسم الأنسب.', icon: FileText },
  { title: 'طلبك غير واضح؟', desc: 'يمكنك إرسال الصور والمقاسات والملاحظات، أو استخدام وياك لاحقًا لترتيب التفاصيل قبل إرسال الطلب.', icon: Bot },
];

const freeServicePoints = [
  'إرسال طلب عرض سعر أو استفسار للعميل بدون رسوم من بيت الريف.',
  'توجيه العميل إلى مسار أوضح حسب الإمارة، الخدمة، المنتج أو نوع المزود.',
  'إمكانية التواصل مع الدعم أو وكيل وياك عند عدم العثور على النتيجة المناسبة.',
  'ظهور رقم طلب بعد الإرسال للاحتفاظ به والمتابعة لاحقًا.',
];

export default function CustomerServicePage() {
  const description = 'خدمة العميل في بيت الريف مجانية. إذا لم تجد الخدمة أو المنتج أو مزود الخدمة المناسب، أرسل طلبك وسيساعدك فريق بيت الريف أو وكيل وياك في الوصول للمسار المناسب.';

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
      <SEOHead
        title="خدمة العميل مجانية | بيت الريف"
        description={description}
        keywords="خدمة العميل مجانية, بيت الريف, طلب عرض سعر, مزود خدمة, منتجات بناء, خدمات الإمارات, وياك"
        canonicalPath="/customer-service"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'خدمة العميل مجانية في بيت الريف',
          url: 'https://bietalreef.ae/customer-service',
          description,
          inLanguage: 'ar-AE',
        }}
      />
      <Navbar pageTitle="خدمة العميل مجانية" />

      <main className="-mt-[1px]">
        <section className="relative isolate overflow-hidden bg-[#0F3F1A] px-4 py-16 text-white md:py-24">
          <Image
            src="/images/platform/hero-biet-alreef-platform-4k.webp"
            alt="منصة بيت الريف وخدمة العميل في الإمارات"
            fill
            priority
            className="-z-20 object-cover object-center"
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-l from-[#071E11]/96 via-[#0F3F1A]/88 to-[#0F3F1A]/68" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.26),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative mx-auto max-w-6xl">
            <Link href="/" className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/12 px-4 py-3 text-sm font-black text-white shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/18">
              العودة إلى الرئيسية
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F7E7A0] backdrop-blur"><Sparkles className="h-4 w-4" /> للعميل أولًا</span>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">خدمة العميل في بيت الريف مجانية</h1>
                <p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-white/90 md:text-xl">إذا لم تجد الخدمة، المنتج، أو مزود الخدمة المناسب، لا تخرج من المنصة بدون حل. أرسل طلبك الآن، وسيساعدك فريق بيت الريف أو وكيل وياك في ترتيب المسار المناسب داخل الإمارات.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/request-quote" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#102F18] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#E7C45A]">إرسال طلبك الآن<ArrowLeft className="h-5 w-5" /></Link>
                  <a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/12 px-7 py-4 text-base font-black text-white shadow-lg backdrop-blur-xl transition hover:bg-white/18"><MessageCircle className="h-5 w-5 text-[#F7E7A0]" />تواصل مع الدعم</a>
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-white/18 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[1.75rem] bg-white/96 p-6 text-[#0F3F1A] shadow-xl">
                  <ShieldCheck className="mb-5 h-12 w-12 text-[#D4AF37]" />
                  <h2 className="text-2xl font-black">ماذا يعني أنها مجانية؟</h2>
                  <div className="mt-5 space-y-3">
                    {freeServicePoints.map((point) => (
                      <div key={point} className="flex gap-3 rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] p-4">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0F3F1A]" />
                        <p className="text-sm font-bold leading-7 text-gray-700">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-9 text-center md:text-right">
            <span className="text-sm font-black text-[#6F5400]">كيف نساعدك؟</span>
            <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">لا نترك طلبك يتوقف عند نتيجة غير مكتملة</h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-gray-600 md:text-lg">بيت الريف يجعل كل رحلة داخل المنصة تنتهي بمسار واضح: بحث، طلب، دعم، أو توجيه من وياك.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {supportPaths.map((item) => { const Icon = item.icon; return (
              <article key={item.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-[#F7E7A0]"><Icon className="h-7 w-7" /></div>
                <h3 className="text-xl font-black text-[#0F3F1A]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{item.desc}</p>
              </article>
            ); })}
          </div>
        </section>

        <section className="bg-white px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2.25rem] border border-[#E6DCC8] bg-[#FDFBF7] p-7 text-center shadow-sm md:p-10">
            <Headphones className="mx-auto mb-5 h-12 w-12 text-[#D4AF37]" />
            <h2 className="text-3xl font-black text-[#0F3F1A] md:text-4xl">رسالتنا للعميل</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-9 text-gray-700">استخدام العميل لمنصة بيت الريف مجاني. نحن هنا لنساعدك في الوصول للخدمة أو المنتج أو مزود الخدمة المناسب، بينما تكون خطط الأسعار مخصصة لمزودي الخدمات الذين يريدون بناء حضور رقمي داخل المنصة.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
