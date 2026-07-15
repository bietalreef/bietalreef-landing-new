import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowLeft, BadgeCheck, BarChart3, Building2, FileText, MapPinned, ShieldCheck, Layers3, Sparkles } from 'lucide-react';

const features = [
  { title: 'ملف مهني منظم', desc: 'اعرض نشاطك، تخصصاتك، مناطق خدمتك، صور الأعمال، وبيانات التواصل في صفحة واضحة.', icon: Building2 },
  { title: 'ظهور حسب الإمارة والخدمة', desc: 'نربط حضورك بدليل الإمارات ومسارات البحث حسب المكان والتخصص بدل الظهور العشوائي.', icon: MapPinned },
  { title: 'استقبال طلبات مؤهلة', desc: 'بدل رسائل ناقصة، يصل إليك طلب أوضح يحتوي نوع الخدمة، الموقع، الصور والتفاصيل الأساسية.', icon: FileText },
  { title: 'إدارة مركزية موثوقة', desc: 'يتولى فريق بيت الريف إنشاء الصفحة وتحديث البيانات والصور والخدمات بعد المراجعة والاعتماد.', icon: Layers3 },
  { title: 'ثقة وهوية رقمية', desc: 'وجودك داخل بيت الريف يساعد العميل على فهم نشاطك قبل التواصل، ويمنح عملك صورة أكثر احترافية.', icon: ShieldCheck },
  { title: 'نمو بدون عمولة مباشرة', desc: 'هدفنا بناء حضور رقمي مستدام لنشاطك، وليس مجرد إعلان مؤقت ينتهي بانتهاء الميزانية.', icon: BarChart3 },
];

const steps = [
  'راجع فكرة الانضمام والمميزات داخل هذه الصفحة.',
  'جهّز بيانات نشاطك: الاسم التجاري، التخصصات، المناطق، الصور ووسائل التواصل.',
  'أرسل طلب إضافة النشاط، ثم يتولى فريق بيت الريف المراجعة والإنشاء والنشر والتحديث.',
];

export default function ProviderRegisterPage() {
  const title = 'انضم كمزود خدمة إلى بيت الريف';
  const desc = 'صفحة تشرح لمزود الخدمة كيف يساعده بيت الريف على بناء حضور رقمي منظم واستقبال طلبات أوضح عبر صفحة منشورة يديرها فريق المنصة.';

  return (
    <>
      <Head>
        <title>{title} | بيت الريف</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href="https://bietalreef.ae/providers/register" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={title} />
        <main>
          <section className="relative overflow-hidden bg-[#0F3F1A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.28),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_34%)]" />
            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black text-[#F4D46B]"><BadgeCheck size={16} /> بوابة مزود الخدمة</span>
                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">اجعل نشاطك حاضرًا حيث يبحث العميل عن الخدمة</h1>
                <p className="mt-6 max-w-3xl text-base font-semibold leading-9 text-white/88 md:text-xl">بيت الريف لا يضعك في قائمة أسماء فقط؛ بل يبني لك مسارًا رقميًا واضحًا يربط نشاطك بالمكان، التخصص، الطلبات، والظهور داخل منصة موجهة لقطاع البناء والصيانة في الإمارات.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#provider-request" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-4 text-base font-black text-[#1F170D] shadow-lg shadow-[#D4AF37]/20 transition hover:-translate-y-0.5">اطلب إضافة نشاطك<ArrowLeft className="h-5 w-5" /></a>
                  <Link href="/contact" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/8 px-7 py-4 text-base font-black text-white transition hover:bg-white/14">تواصل مع الفريق</Link>
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/14 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] bg-white p-6 text-[#0F3F1A]">
                  <Layers3 className="mb-5 h-12 w-12 text-[#D4AF37]" />
                  <h2 className="text-2xl font-black">ما الذي ينشره بيت الريف؟</h2>
                  <p className="mt-3 text-sm font-semibold leading-8 text-gray-600">صفحة نشاط واضحة تضم الملف المهني والخدمات والمنتجات والمشاريع ومناطق الخدمة ووسائل التواصل بعد مراجعتها واعتمادها.</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-center text-xs font-black">
                    <span className="rounded-2xl bg-[#F7F2E8] px-3 py-3">طلبات منظمة</span>
                    <span className="rounded-2xl bg-[#F7F2E8] px-3 py-3">ملف مهني</span>
                    <span className="rounded-2xl bg-[#F7F2E8] px-3 py-3">مناطق خدمة</span>
                    <span className="rounded-2xl bg-[#F7F2E8] px-3 py-3">تواصل أوضح</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
            <div className="mb-9 text-center">
              <span className="text-sm font-black text-[#6F5400]">مميزات الانضمام</span>
              <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">لماذا تنضم كمزود خدمة؟</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => { const Icon = feature.icon; return (
                <article key={feature.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white"><Icon className="h-7 w-7" /></div>
                  <h3 className="text-xl font-black text-[#0F3F1A]">{feature.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-8 text-gray-600">{feature.desc}</p>
                </article>
              ); })}
            </div>
          </section>

          <section className="bg-white px-4 py-14 md:py-20">
            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="text-sm font-black text-[#6F5400]">قبل طلب الإضافة</span>
                <h2 className="mt-3 text-3xl font-black text-[#0F3F1A] md:text-5xl">مسار الانضمام واضح</h2>
                <p className="mt-5 text-base font-semibold leading-9 text-gray-600">تواصل مع فريق بيت الريف وأرسل البيانات الأساسية. ينشئ الفريق مسودة برقم مزود، يراجع المحتوى والصور معك، ثم ينشر الصفحة بعد الاعتماد.</p>
              </div>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-[1.5rem] border border-[#E6DCC8] bg-[#FDFBF7] p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-black text-[#1F170D]">{index + 1}</span>
                    <p className="font-bold leading-8 text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="provider-request" className="mx-auto max-w-5xl px-4 py-14 text-center md:py-20">
            <div className="rounded-[2.5rem] border border-[#E6DCC8] bg-white p-8 shadow-xl md:p-12">
              <Sparkles className="mx-auto mb-5 h-12 w-12 text-[#D4AF37]" />
              <h2 className="text-3xl font-black text-[#0F3F1A] md:text-5xl">جاهز لطلب إضافة نشاطك؟</h2>
              <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-9 text-gray-600">تواصل مع فريق بيت الريف لاختيار الخطة المناسبة وتجهيز صفحة نشاطك وكروت الخدمات والمنتجات والمشاريع بطريقة منظمة.</p>
              <Link href="/contact?source=provider-request" className="mt-8 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#143D1F]">تواصل مع فريق بيت الريف<ArrowLeft className="h-5 w-5" /></Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
