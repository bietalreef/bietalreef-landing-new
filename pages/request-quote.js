import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import PublicLeadForm from '../components/PublicLeadForm';

export default function RequestQuotePage() {
  const description = 'اطلب عرض سعر من بيت الريف لخدمات المقاولات والتشطيب والصيانة والمواد في الإمارات. نموذج مبدئي يحفظ الطلب داخل قاعدة بيانات بيت الريف.';

  return (
    <>
      <SEOHead
        title="طلب عرض سعر | بيت الريف"
        description={description}
        keywords="طلب عرض سعر, بيت الريف, مقاولات الإمارات, تشطيبات, صيانة, مواد بناء"
        canonicalPath="/request-quote"
      />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <PublicLeadForm formType="quote" />
        </main>
        <Footer />
      </div>
    </>
  );
}
