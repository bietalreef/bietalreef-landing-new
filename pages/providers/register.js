import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';

export default function ProviderRegisterPage() {
  const title = 'سجل كمزود خدمة';
  const desc = 'صفحة تسجيل مزودي الخدمات في بيت الريف للشركات والمصانع والورش والموردين ضمن قطاع البناء والصيانة.';
  const faqItems = [
    ['من يستطيع التسجيل كمزود خدمة؟', 'الشركات، الورش، المصانع، الموردون، والمكاتب المتخصصة في البناء والصيانة والتصميم والمواد.'],
    ['هل يظهر النشاط مباشرة؟', 'لا، يتم تجهيز البيانات ومراجعتها قبل النشر لضمان جودة المعلومات.'],
  ];

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
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">الشركاء</span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{title}</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mx-auto md:mx-0">{desc}</p>
            </div>
          </section>
          <section className="max-w-6xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['جهّز بيانات النشاط', 'حدد الخدمات ومناطق العمل', 'أرسل البيانات للمراجعة والنشر'].map((item) => (
                <div key={item} className="rounded-3xl bg-white border border-[#E6DCC8] p-6 shadow-sm">
                  <h2 className="font-black text-primary mb-3">{item}</h2>
                  <p className="text-gray-600 leading-8">هذه خطوة أساسية لبناء ملف مزود خدمة منظم داخل بيت الريف.</p>
                </div>
              ))}
            </div>
          </section>
          <FAQ items={faqItems} title="أسئلة شائعة حول تسجيل مزود الخدمة" />
        </main>
        <Footer />
      </div>
    </>
  );
}
