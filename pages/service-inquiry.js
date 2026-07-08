import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import PublicLeadForm from '../components/PublicLeadForm';

export default function ServiceInquiryPage() {
  const description = 'أرسل استفسار خدمة إلى بيت الريف لخدمات المقاولات والصيانة والتشطيب والمواد داخل الإمارات.';

  return (
    <>
      <SEOHead
        title="استفسار عن خدمة | بيت الريف"
        description={description}
        keywords="استفسار خدمة, بيت الريف, خدمات الإمارات, صيانة, مقاولات, تشطيبات"
        canonicalPath="/service-inquiry"
      />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar />
        <main>
          <PublicLeadForm formType="inquiry" />
        </main>
        <Footer />
      </div>
    </>
  );
}
