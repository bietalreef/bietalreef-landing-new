import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, MessageCircle, UsersRound, Wrench } from 'lucide-react';

export default function CommunityPage() {
  return (
    <>
      <Head>
        <title>المجتمع | بيت الريف</title>
        <meta name="description" content="مجتمع بيت الريف هو مساحة لتبادل الأسئلة والخبرات حول البناء والصيانة والتشطيب ومزودي الخدمات في الإمارات." />
        <link rel="canonical" href="https://bietalreef.ae/community" />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="المجتمع" />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-center md:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#D4AF37]">
                <UsersRound className="h-4 w-4" />
                المجتمع
              </span>
              <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">مجتمع بيت الريف</h1>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-white/90">
                مساحة مخصصة لأسئلة أصحاب المشاريع، خبرات مزودي الخدمات، ومحتوى يساعد على اتخاذ قرارات أفضل في البناء والصيانة والتشطيب.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                <Link href="/faq" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">
                  ابدأ من الأسئلة الشائعة
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white">
                  شارك سؤالك
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                ['أسئلة العملاء', 'أسئلة قصيرة حول المقاولات والصيانة والمواد قبل طلب عرض السعر.'],
                ['خبرات المزودين', 'محتوى يساعد المزودين على شرح خدماتهم ومناطق عملهم بوضوح.'],
                ['نصائح البناء', 'إرشادات عملية تساعد المستخدم على اختيار الخدمة والمزود المناسب.'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-3xl border border-[#E6DCC8] bg-white p-7 shadow-sm">
                  <Wrench className="mb-4 h-7 w-7 text-primary" />
                  <h2 className="text-xl font-black text-[#0F3F1A]">{title}</h2>
                  <p className="mt-3 text-sm leading-8 text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
