import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle2, FileText, Mail, ShieldCheck, Trash2 } from 'lucide-react';

const portalUrl = 'https://providers.bietalreef.ae/?action=delete-account';

const cards = [
  {
    title: 'الحذف من داخل التطبيق',
    items: [
      'سجّل الدخول إلى تطبيق Biet Alreef.',
      'افتح القائمة ثم الإعدادات.',
      'اختر حذف الحساب، اكتب رقم الحساب، ثم أكّد الطلب.',
      'يتوقف الدخول بعد تسجيل الطلب، ويكتمل الحذف خلال 30 يومًا.',
    ],
  },
  {
    title: 'الحذف من خارج التطبيق',
    items: [
      'افتح بوابة الحذف الآمنة من الزر أدناه.',
      'سجّل الدخول برقم حساب بيت الريف أو البريد الإلكتروني وكلمة المرور.',
      'راجع البيانات التي سيشملها الحذف ثم أكّد الطلب.',
      'يمكن طلب المساعدة عبر legal@bietalreef.ae عند تعذر تسجيل الدخول.',
    ],
  },
  {
    title: 'البيانات التي تُحذف',
    items: [
      'الحساب وبيانات الملف الشخصي ومعرّفات الجلسات.',
      'مساحة العمل والملفات والصور والمشاريع والمحادثات والمحتوى الذي أنشأه المستخدم.',
      'طلبات الخدمة وعروض الأسعار والبيانات التشغيلية المرتبطة بالحساب، وفق حدود القانون.',
      'يُخفى الملف العام لمزود الخدمة فور بدء معالجة الطلب.',
    ],
  },
  {
    title: 'البيانات التي قد نحتفظ بها',
    items: [
      'قد نحتفظ مؤقتًا بسجلات الفواتير والمعاملات والموافقات والأمان ومكافحة الاحتيال عندما يفرض القانون ذلك.',
      'يقتصر الاحتفاظ على المدة والغرض القانونيين، مع تقييد الوصول وعدم استخدامها للتسويق.',
      'قد تبقى نسخ احتياطية محدودة حتى انتهاء دورة الحذف الآمن ثم تُزال أو تُجهل هويتها.',
    ],
  },
];

export default function DeleteAccountPage() {
  return (
    <>
      <Head>
        <title>حذف حساب Biet Alreef | بيت الريف</title>
        <meta name="description" content="خطوات طلب حذف حساب تطبيق Biet Alreef والبيانات المرتبطة به، والبيانات التي قد يُحتفظ بها للمتطلبات القانونية." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/delete-account" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/delete-account" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/delete-account" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#F8F4EC] text-gray-900">
        <Navbar />
        <main>
          <section className="border-b border-[#E6DCC8] bg-gradient-to-br from-[#0F3F1A] to-[#071E11] text-white">
            <div className="mx-auto max-w-5xl px-4 py-16 text-center md:py-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F3D46B]">
                <ShieldCheck className="h-5 w-5" />
                التحكم في حسابك وبياناتك
              </span>
              <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">طلب حذف حساب Biet Alreef</h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-9 text-white/85 md:text-lg">
                هذه الصفحة الرسمية لتطبيق Biet Alreef من مطور بيت الريف. يمكنك طلب حذف الحساب والبيانات المرتبطة به من داخل التطبيق أو من بوابة الويب الآمنة.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={portalUrl} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 py-3 font-black text-[#102F18] transition hover:bg-[#F3D46B]">
                  <Trash2 className="h-5 w-5" />
                  فتح بوابة حذف الحساب
                </a>
                <Link href="/privacy" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/15">
                  <FileText className="h-5 w-5" />
                  سياسة الخصوصية
                </Link>
              </div>
              <p className="mt-5 text-sm font-bold text-white/70">آخر تحديث: 8 أغسطس 2026</p>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
            <div className="grid gap-5 md:grid-cols-2">
              {cards.map((card) => (
                <article key={card.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-xl font-black text-[#0F3F1A] md:text-2xl">{card.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-8 text-gray-700 md:text-base">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#9A7600]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <article className="mt-6 rounded-[2rem] border border-[#D7C48D] bg-[#FFF8E5] p-7 md:p-9">
              <h2 className="text-2xl font-black text-[#0F3F1A]">طلب حذف بيانات محددة دون حذف الحساب</h2>
              <p className="mt-4 leading-8 text-gray-700">
                يمكنك طلب حذف أو تصحيح بيانات محددة دون إغلاق الحساب، متى كان ذلك ممكنًا قانونًا وتشغيليًا. اذكر رقم الحساب ونوع البيانات المطلوبة، وقد نطلب التحقق من الهوية قبل التنفيذ.
              </p>
              <a href="mailto:legal@bietalreef.ae?subject=طلب%20حذف%20بيانات%20Biet%20Alreef" className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3 font-black text-white">
                <Mail className="h-5 w-5" />
                legal@bietalreef.ae
              </a>
            </article>

            <div className="mt-8 flex justify-center">
              <Link href="/" className="inline-flex items-center gap-2 font-black text-[#0F3F1A]">
                <ArrowLeft className="h-5 w-5" />
                العودة إلى بيت الريف
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
