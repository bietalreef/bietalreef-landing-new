import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import PublicLeadForm from '../components/PublicLeadForm';

export default function InquiryPage() {
  const description = 'أرسل استفسارك إلى بيت الريف حول الخدمات، مزودي الخدمة، المنتجات، أو طريقة طلب المشروع داخل الإمارات.';

  return (
    <>
      <SEOHead
        title="إرسال استفسار | بيت الريف"
        description={description}
        keywords="استفسار بيت الريف, تواصل بيت الريف, خدمات البناء الإمارات, مزودو الخدمات"
        canonicalPath="/inquiry"
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
