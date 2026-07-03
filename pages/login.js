import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LogIn, UserPlus, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>تسجيل دخول العميل | بيت الريف</title>
        <meta name="description" content="تسجيل دخول العملاء إلى حساب بيت الريف لمتابعة طلبات البناء والصيانة والتواصل مع مزودي الخدمات." />
        <link rel="canonical" href="https://bietalreef.ae/login" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="تسجيل دخول" />
        <main className="mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <section className="rounded-[2.5rem] bg-[#0F3F1A] p-8 text-white md:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#D4AF37]">
                <LogIn className="h-4 w-4" />
                حساب العميل
              </span>
              <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">تسجيل دخول العميل</h1>
              <p className="mt-5 text-base leading-9 text-white/85">
                ادخل إلى حسابك لمتابعة طلبات عروض الأسعار، حفظ الخدمات والمنتجات، والعودة إلى بيانات مشروعك بسهولة.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {['طلباتك', 'المفضلة', 'مراسلاتك'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-black">{item}</div>
                ))}
              </div>
            </section>

            <section className="rounded-[2.5rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-10" aria-label="نموذج تسجيل دخول العميل">
              <div className="mb-7 text-center md:text-right">
                <h2 className="text-2xl font-black text-[#0F3F1A]">ادخل إلى حسابك</h2>
                <p className="mt-2 text-sm leading-7 text-gray-600">هذا نموذج واجهة جاهز لمسار حساب العميل. سيتم ربطه بنظام الحسابات عند تفعيل التطبيق.</p>
              </div>

              <form className="space-y-5">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-black text-gray-700">البريد الإلكتروني أو رقم الهاتف</label>
                  <input id="email" name="email" type="text" autoComplete="username" placeholder="example@email.com" className="w-full rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-4 text-sm outline-none transition focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-black text-gray-700">كلمة المرور</label>
                  <input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" className="w-full rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-4 text-sm outline-none transition focus:border-primary" />
                </div>
                <button type="button" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-black text-white shadow-lg transition hover:bg-primary-dark">
                  دخول
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </form>

              <div className="mt-6 rounded-2xl bg-[#F7F2E8] p-4 text-sm leading-7 text-gray-700">
                <div className="mb-2 flex items-center gap-2 font-black text-[#0F3F1A]"><ShieldCheck className="h-4 w-4" />ملاحظة تشغيلية</div>
                تسجيل الدخول هنا مخصص للعملاء، ومختلف عن مسار <Link href="/providers/register" className="font-black text-primary">سجل كمزود خدمة</Link>.
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/login?mode=register" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] px-5 py-3 text-sm font-black text-[#0F3F1A] hover:border-primary">
                  إنشاء حساب
                  <UserPlus className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="text-center text-sm font-black text-primary">تحتاج مساعدة؟ تواصل معنا</Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
