import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

const PAGES = {
  'why-biet-alreef': {
    title: 'لماذا بيت الريف',
    desc: 'تعرف على سبب بناء بيت الريف كمنصة تنظم رحلة البناء والصيانة وتربط أصحاب المشاريع بمزودي الخدمات.',
    points: ['تنظيم رحلة العميل من البحث إلى طلب عرض السعر.', 'واجهة واضحة للمقاولات والصيانة والتصميم.', 'بناء تدريجي يعتمد على بيانات موثوقة ومراجعة.']
  },
  'how-it-works': {
    title: 'كيف يعمل بيت الريف',
    desc: 'شرح مبسط لطريقة استخدام بيت الريف: اختر المكان، اختر الخدمة، ثم أرسل طلبك ليتم توجيهك للمسار المناسب.',
    points: ['اختر الإمارة والمدينة.', 'حدد الخدمة أو التخصص.', 'أرسل طلبك أو اسأل وياك.']
  },
  pricing: {
    title: 'الأسعار',
    desc: 'صفحة توضح سياسة التسعير العامة في بيت الريف بدون عرض أسعار غير معتمدة قبل تحديد تفاصيل المشروع.',
    points: ['الأسعار تعتمد على نوع الخدمة ونطاق العمل.', 'لا يتم عرض أسعار غير موثقة.', 'أفضل خطوة هي طلب عرض سعر حسب تفاصيل المشروع.']
  },
  partners: {
    title: 'كن شريكًا',
    desc: 'انضم إلى منظومة بيت الريف كشريك أو مزود خدمة أو مورد أو مصنع ضمن قطاع البناء والصيانة.',
    points: ['تواجد رقمي واضح.', 'استقبال طلبات أكثر تنظيمًا.', 'ربط نشاطك برحلة العميل داخل المنصة.']
  },
  suppliers: {
    title: 'الموردون',
    desc: 'صفحة مخصصة للموردين الراغبين في عرض مواد ومنتجات البناء والتشطيب داخل منظومة بيت الريف.',
    points: ['مواد بناء.', 'منتجات تشطيب.', 'توريد حسب الإمارة والمنطقة.']
  },
  factories: {
    title: 'المصانع',
    desc: 'صفحة مخصصة للمصانع والورش التي تقدم منتجات وخدمات مرتبطة بالبناء والتشطيب والتصميم.',
    points: ['مصانع وورش.', 'منتجات حسب الطلب.', 'ملفات نشاط قابلة للنشر بعد المراجعة.']
  },
  faq: {
    title: 'الأسئلة الشائعة',
    desc: 'إجابات مباشرة حول بيت الريف، دليل الإمارات، مزودي الخدمات، وطريقة طلب عروض الأسعار.',
    points: ['كيف أبدأ؟', 'كيف أطلب عرض سعر؟', 'كيف ينضم مزود الخدمة؟']
  },
  'support-policy': {
    title: 'سياسة الدعم',
    desc: 'توضح هذه الصفحة طريقة تقديم الدعم داخل بيت الريف وحدود المساعدة والتوجيه للمستخدمين ومزودي الخدمات.',
    points: ['الدعم للتوجيه والتنظيم.', 'التواصل حسب نوع الطلب.', 'المتابعة حسب البيانات المتاحة.']
  },
  privacy: {
    title: 'الخصوصية',
    desc: 'سياسة خصوصية بيت الريف توضّح كيفية التعامل مع بيانات المستخدمين وطلبات التواصل.',
    points: ['حماية بيانات التواصل.', 'استخدام البيانات لتحسين الخدمة.', 'عدم نشر معلومات غير معتمدة.']
  },
  legal: {
    title: 'الشروط والأحكام',
    desc: 'الشروط العامة لاستخدام موقع ومنصة بيت الريف وخدماتها الرقمية.',
    points: ['استخدام الموقع يعني قبول الشروط.', 'المعلومات تخضع للمراجعة والتحديث.', 'العروض والخدمات النهائية تعتمد على المزودين وتفاصيل المشروع.']
  },
  cookies: {
    title: 'سياسة ملفات الارتباط',
    desc: 'توضح هذه الصفحة كيفية استخدام ملفات الارتباط لتحسين تجربة التصفح وقياس الأداء.',
    points: ['تحسين تجربة المستخدم.', 'قياس أداء الصفحات.', 'إعدادات قابلة للتحديث لاحقًا.']
  },
  blog: {
    title: 'المدونة',
    desc: 'مقالات وإرشادات حول البناء والصيانة والتصميم الداخلي ومواد البناء وتجربة مزودي الخدمات.',
    points: ['إرشادات للملاك.', 'محتوى للمزودين.', 'مقالات تخدم SEO وAEO وGEO.']
  }
};

export default function FooterLandingPage({ page, slug }) {
  const faqItems = [
    [`ما هي صفحة ${page.title}؟`, page.desc],
    ['كيف أستفيد من هذه الصفحة؟', 'اقرأ التعريف والنقاط الأساسية ثم استخدم روابط الموقع أو وياك للوصول إلى الخطوة المناسبة.'],
  ];

  return (
    <>
      <Head>
        <title>{page.title} | بيت الريف</title>
        <meta name="description" content={page.desc} />
        <link rel="canonical" href={`https://bietalreef.ae/${slug}`} />
      </Head>
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={page.title} />
        <main>
          <section className="bg-[#0F3F1A] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 text-center md:text-right">
              <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold mb-6">بيت الريف</span>
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{page.title}</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mx-auto md:mx-0">{page.desc}</p>
            </div>
          </section>
          <section className="max-w-6xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {page.points.map((point) => (
                <div key={point} className="rounded-3xl bg-white border border-[#E6DCC8] p-6 shadow-sm">
                  <h2 className="font-black text-primary mb-3">نقطة مهمة</h2>
                  <p className="text-gray-600 leading-8">{point}</p>
                </div>
              ))}
            </div>
          </section>
          <FAQ items={faqItems} title={`أسئلة شائعة حول ${page.title}`} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const page = PAGES[slug];
  if (!page) return { notFound: true };
  return { props: { page, slug }, revalidate: 3600 };
}

export async function getStaticPaths() {
  return { paths: Object.keys(PAGES).map((slug) => ({ params: { slug } })), fallback: 'blocking' };
}
