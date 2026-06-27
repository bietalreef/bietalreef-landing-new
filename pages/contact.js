import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { MessageCircle, Mail, MapPin, Clock, ArrowLeft, Send } from 'lucide-react';

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'تواصل مع بيت الريف',
    description: 'صفحة التواصل الرسمية لمنصة بيت الريف للمقاولات والبناء والصيانة في الإمارات.',
    url: 'https://bietalreef.ae/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'بيت الريف',
      email: 'info@bietalreef.ae',
      telephone: '+971567856001',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'العين',
        addressRegion: 'أبوظبي',
        addressCountry: 'AE',
      },
    },
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
      <SEOHead
        title="تواصل معنا | بيت الريف للمقاولات والبناء والصيانة"
        description="تواصل مع بيت الريف لطلب عرض سعر أو استشارة في المقاولات، الصيانة، التصميم الداخلي، مواد البناء وخدمات المنصة الذكية في الإمارات."
        keywords="تواصل بيت الريف, مقاولات العين, مقاولات أبوظبي, صيانة, تصميم داخلي, واتساب بيت الريف"
        canonicalPath="/contact"
        alternatePath="/en/contact"
        structuredData={structuredData}
      />
      <Navbar />

      <main>
        <section className="bg-gradient-to-br from-[#0F3F1A] via-[#1F6B3A] to-[#0F3F1A] text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-[#D4AF37] font-black mb-3">نحن قريبون منك</p>
            <h1 className="text-4xl md:text-6xl font-black mb-6">تواصل مع بيت الريف</h1>
            <p className="text-white/80 max-w-3xl mx-auto leading-8 text-lg">
              أرسل تفاصيل مشروعك أو خدمتك المطلوبة، وسنساعدك في اختيار المسار الصحيح: مقاول، مزود خدمة، مورد مواد، أو استشارة عبر وياك.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <a href="https://wa.me/971567856001" className="rounded-full bg-[#D4AF37] text-[#0F3F1A] px-8 py-4 font-black hover:bg-[#c49b2e] transition">
                تواصل واتساب الآن
              </a>
              <a href="mailto:info@bietalreef.ae" className="rounded-full border-2 border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-[#0F3F1A] transition">
                إرسال بريد إلكتروني
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E6DCC8] p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-6">طلب تواصل سريع</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" action="mailto:info@bietalreef.ae" method="post" encType="text/plain">
              <label className="space-y-2">
                <span className="font-bold text-sm text-gray-700">الاسم</span>
                <input required name="name" className="w-full rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 outline-none focus:border-[#D4AF37]" placeholder="اكتب اسمك" />
              </label>
              <label className="space-y-2">
                <span className="font-bold text-sm text-gray-700">رقم الهاتف</span>
                <input required name="phone" className="w-full rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 outline-none focus:border-[#D4AF37]" placeholder="05xxxxxxxx" />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="font-bold text-sm text-gray-700">نوع الطلب</span>
                <select name="requestType" className="w-full rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 outline-none focus:border-[#D4AF37]">
                  <option>طلب عرض سعر</option>
                  <option>تسجيل مزود خدمة</option>
                  <option>مورد مواد أو منتجات</option>
                  <option>استشارة تصميم أو بناء</option>
                  <option>دعم المنصة أو وياك</option>
                </select>
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="font-bold text-sm text-gray-700">تفاصيل الطلب</span>
                <textarea required name="message" rows="6" className="w-full rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-3 outline-none focus:border-[#D4AF37]" placeholder="اكتب تفاصيل المشروع أو الخدمة المطلوبة" />
              </label>
              <button type="submit" className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] text-white px-6 py-4 font-black hover:bg-[#1F6B3A] transition">
                إرسال الطلب <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-3xl border border-[#E6DCC8] p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#0F3F1A] mb-4">بيانات التواصل</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3"><MessageCircle className="w-5 h-5 text-[#D4AF37]" /> <a href="https://wa.me/971567856001">+971 56 785 6001</a></li>
                <li className="flex gap-3"><Mail className="w-5 h-5 text-[#D4AF37]" /> <a href="mailto:info@bietalreef.ae">info@bietalreef.ae</a></li>
                <li className="flex gap-3"><MapPin className="w-5 h-5 text-[#D4AF37]" /> <span>العين - أبوظبي - الإمارات العربية المتحدة</span></li>
                <li className="flex gap-3"><Clock className="w-5 h-5 text-[#D4AF37]" /> <span>متاح عبر واتساب للطلبات والاستفسارات</span></li>
              </ul>
            </div>

            <div className="bg-[#0F3F1A] rounded-3xl p-6 text-white shadow-sm">
              <h2 className="text-xl font-black mb-3">هل تريد استخدام المنصة؟</h2>
              <p className="text-white/70 leading-7 mb-5">انتقل إلى التطبيق الذكي لإدارة الطلبات، السوق، الخريطة، وأدوات وياك.</p>
              <a href="https://app.bietalreef.ae" className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-[#0F3F1A] px-5 py-3 font-black">
                دخول المنصة <ArrowLeft className="w-4 h-4" />
              </a>
            </div>
          </aside>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#0F3F1A] mb-3">منطقة الخدمة</h2>
            <p className="text-gray-600 leading-8 mb-6">بيت الريف يخدم العين وأبوظبي وباقي إمارات الدولة من خلال شبكة خدمات وموردين ومقاولين يتم تنظيمهم داخل المنصة.</p>
            <div className="aspect-[16/7] rounded-[1.5rem] bg-[#F5EEE1] border border-[#E6DCC8] flex items-center justify-center text-center p-8 text-gray-600">
              خريطة منطقة الخدمة — العين، أبوظبي، دبي، الشارقة، عجمان، رأس الخيمة، أم القيوين، الفجيرة
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
