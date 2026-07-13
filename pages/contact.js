import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Clock3, Home, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

const channels = [
  {
    title: 'واتساب بيت الريف',
    description: 'للطلبات والاستفسارات ومتابعة الخدمات.',
    href: 'https://wa.me/971567856001',
    label: 'ابدأ المحادثة',
    icon: MessageCircle,
    external: true,
  },
  {
    title: 'الاتصال المباشر',
    description: 'للتواصل مع فريق بيت الريف داخل دولة الإمارات.',
    href: 'tel:+971567856001',
    label: '+971 56 785 6001',
    icon: Phone,
  },
  {
    title: 'البريد القانوني والخصوصية',
    description: 'للاستفسارات القانونية وطلبات حماية البيانات.',
    href: 'mailto:legal@bietalreef.ae',
    label: 'legal@bietalreef.ae',
    icon: Mail,
  },
];

export default function ContactPage() {
  const description = 'تواصل مع فريق منصة بيت الريف عبر واتساب أو الهاتف أو البريد الإلكتروني للاستفسارات والطلبات والدعم القانوني والخصوصية داخل دولة الإمارات.';

  return (
    <>
      <Head>
        <title>تواصل معنا | بيت الريف</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href="https://bietalreef.ae/contact" />
        <meta property="og:title" content="تواصل معنا | بيت الريف" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/contact" />
        <meta property="og:locale" content="ar_AE" />
      </Head>

      <div dir="rtl" className="min-h-screen bg-[#F8F4EC] text-gray-900">
        <Navbar />
        <main>
          <section className="relative overflow-hidden border-b border-[#E6DCC8] bg-[#F7F1E6]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.22),transparent_31%),radial-gradient(circle_at_bottom_right,rgba(15,63,26,0.10),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(247,241,230,0.96))]" />
            <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-5 md:pb-20 md:pt-7">
              <div className="mb-8 flex justify-start">
                <Link href="/" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-5 py-3 font-black text-[#0F3F1A] shadow-[0_12px_30px_rgba(92,70,20,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
                  <Home className="h-5 w-5" />
                  العودة إلى الرئيسية
                </Link>
              </div>

              <div className="mx-auto max-w-4xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-white/65 px-4 py-2 text-xs font-black text-[#7A5A00] shadow-[0_10px_28px_rgba(92,70,20,0.10)] backdrop-blur-xl">
                  <MessageCircle className="h-4 w-4" />
                  قنوات التواصل الرسمية
                </span>
                <h1 className="mt-6 text-3xl font-black leading-[1.35] text-[#102F18] sm:text-4xl md:text-6xl">تواصل معنا</h1>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-9 text-gray-700 md:text-lg md:leading-10">اختر القناة المناسبة لطلبك. جميع الروابط التالية رسمية وواضحة، ويصل التواصل مباشرة إلى فريق بيت الريف.</p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="grid gap-5 md:grid-cols-3">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.title}
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className="group rounded-[2rem] border border-white/85 bg-white/78 p-6 shadow-[0_16px_42px_rgba(56,42,12,0.08),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_52px_rgba(56,42,12,0.13)]"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-[#FFF3CC] text-[#0F3F1A] shadow-[0_9px_24px_rgba(92,70,20,0.12)]">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h2 className="mt-5 text-xl font-black text-[#0F3F1A]">{channel.title}</h2>
                    <p className="mt-3 min-h-[64px] text-sm leading-8 text-gray-600">{channel.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-black text-[#7A5A00]">
                      {channel.label}
                      <ArrowLeft className="h-5 w-5 transition group-hover:translate-x-[-3px]" />
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/85 bg-white/78 p-6 shadow-[0_16px_42px_rgba(56,42,12,0.08)] backdrop-blur-xl md:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white bg-[#FFF3CC] text-[#0F3F1A] shadow-[0_8px_22px_rgba(92,70,20,0.12)]">
                    <Clock3 className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-[#0F3F1A]">أوقات التواصل</h2>
                    <p className="mt-3 leading-8 text-gray-700">تُراجع الرسائل والطلبات وفق أوقات عمل فريق بيت الريف، ويتم التعامل مع الطلبات بحسب نوعها وأولويتها.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/85 bg-white/78 p-6 shadow-[0_16px_42px_rgba(56,42,12,0.08)] backdrop-blur-xl md:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white bg-[#FFF3CC] text-[#0F3F1A] shadow-[0_8px_22px_rgba(92,70,20,0.12)]">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-[#0F3F1A]">نطاق الخدمة</h2>
                    <p className="mt-3 leading-8 text-gray-700">تخدم منصة بيت الريف العملاء ومزودي الخدمات داخل إمارات دولة الإمارات، مع انطلاقها من مدينة العين.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
