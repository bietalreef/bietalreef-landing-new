import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProviderRegisterPage() {
  const title = 'دخول مزود الخدمة';
  const desc = 'هذا الموقع التعريفي لا يحتوي على تسجيل دخول للعميل أو مزود الخدمة. دخول مزود الخدمة يتم فقط من خلال تطبيق بيت الريف.';

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
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 text-center md:text-right">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">تطبيق بيت الريف</span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">دخول مزود الخدمة يتم من التطبيق</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mx-auto md:mx-0">{desc}</p>
              <a href="https://app.bietalreef.ae" className="mt-8 inline-flex rounded-full bg-[#D4AF37] px-7 py-3 font-black text-[#0F3F1A]">فتح تطبيق بيت الريف</a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
