import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SecondaryHeader from '../../components/SecondaryHeader';
import ClientRequestCard from '../../components/ClientRequestCard';
import SeoContent from '../../components/SeoContent';
import FAQ from '../../components/FAQ';
import UaeSmartFooter from '../../components/UaeSmartFooter';
import SeoProofCards from '../../components/SeoProofCards';
import UaeDirectorySectorCards from '../../components/UaeDirectorySectorCards';
import { UAE_EMIRATES, getEmirate } from '../../data/siteTaxonomy';
import { ArrowRight, Home } from 'lucide-react';

export default function EmiratePage({ emirate, emirateSlug }) {
  if (!emirate) return null;
  const showAlHootSeoPath = emirateSlug === 'abu-dhabi';
  const pageData = {
    h1: `خدمات بيت الريف في ${emirate.nameAr}`,
    desc: `اختر واحداً من القطاعات السبعة الرئيسية داخل ${emirate.nameAr}. التخصصات الإضافية والمدن والمناطق تبقى متاحة داخل الفوتر الذكي بدون تضخيم رحلة المستخدم.`,
  };
  const faqItems = [
    [`كيف أبحث عن خدمة في ${emirate.nameAr}؟`, `ابدأ باختيار أحد القطاعات السبعة الرئيسية مثل المقاولات أو المواد أو الصيانة، ثم استخدم الفوتر الذكي للتخصصات والمناطق الإضافية.`],
    ['هل تم حذف صفحات المناطق أو التخصصات القديمة؟', 'لا، الصفحات القديمة ما زالت موجودة وتعمل، لكن الأقسام الزائدة أصبحت منظمة داخل الفوتر الذكي.'],
    ['هل أستطيع طلب عرض سعر؟', 'نعم، يمكنك طلب عرض سعر من صفحة الإمارة أو صفحة النشاط، وسيتم توجيه الطلب حسب المكان والخدمة.'],
  ];

  return (
    <>
      <Head>
        <title>{pageData.h1} | بيت الريف</title>
        <meta name="description" content={pageData.desc} />
        <link rel="canonical" href={`https://bietalreef.ae/uae/${emirateSlug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={emirate.nameAr} />
        <SecondaryHeader backUrl="/uae" backLabel="العودة إلى دليل الإمارات" />
        <main>
          <section className="relative min-h-[420px] flex items-center bg-[#0F3F1A] text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image src={`/images/seo/emirates/${emirateSlug}.webp`} alt={pageData.h1} fill className="object-cover opacity-35" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F1A] via-[#0F3F1A]/72 to-[#0F3F1A]/20" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 w-full text-center md:text-right">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3 md:justify-between">
                <Link href="/uae" className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/12 px-4 py-3 text-xs font-black text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0F3F1A]"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0F3F1A]"><ArrowRight size={16} /></span>العودة إلى دليل الإمارات</Link>
                <Link href="/" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-black text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0F3F1A]"><Home size={16} /> الرئيسية</Link>
              </div>
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">إمارة {emirate.nameAr}</span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{pageData.h1}</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mx-auto md:mx-0">{pageData.desc}</p>
            </div>
          </section>

          <ClientRequestCard title={`تبحث عن مزود خدمة في ${emirate.nameAr}؟`} desc={`اختر القطاع المطلوب أولاً، ثم استخدم الفوتر الذكي للتخصصات والمناطق أو أرسل طلبك مباشرة عبر وياك.`} buttonText={`اطلب عرض سعر في ${emirate.nameAr}`} />

          {showAlHootSeoPath && <SeoProofCards title="مسار حقيقي داخل صفحة أبوظبي" desc="هذه الصفحة لا تكتفي بنص SEO عام. يوجد داخلها مثال واضح لمسار العميل: مزود موثق للرخام والجرانيت، خدمة قابلة للطلب، منتج واضح، وخطوة معاينة أو عرض سعر مرتبطة بملف مصنع الحوت." />}

          <UaeDirectorySectorCards emirate={emirate} locale="ar" />

          <SeoContent title={`${emirate.nameAr} داخل دليل بيت الريف`}>
            <p>{emirate.description}</p>
            <p className="mt-4">يعرض هذا القسم القطاعات السبعة الرئيسية داخل {emirate.nameAr}. أما المدن والمناطق وباقي التخصصات فتظهر داخل الفوتر الذكي كروابط داخلية منظمة للحفاظ على الامتدادات القديمة وقوة البحث الجغرافي.</p>
            {showAlHootSeoPath && <p className="mt-4">تم دعم صفحة أبوظبي بمسار داخلي واضح يربط بين محتوى البحث الجغرافي ومزود خدمة فعلي داخل المنصة، مثل مصنع الحوت الأبيض للرخام والجرانيت.</p>}
          </SeoContent>

          <FAQ items={faqItems} title={`أسئلة شائعة حول خدمات ${emirate.nameAr}`} />
          <UaeSmartFooter locale="ar" pageType="emirate" emirate={emirate} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const emirateSlug = params.activity;
  const emirate = getEmirate(emirateSlug);
  if (!emirate) return { notFound: true };
  return { props: { emirate, emirateSlug }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return { paths: UAE_EMIRATES.map((emirate) => ({ params: { activity: emirate.slug } })), fallback: 'blocking' };
}
