import Head from 'next/head';
import EnglishLayout from '../../components/EnglishLayout';
import EnglishLeadForm from '../../components/EnglishLeadForm';

export default function EnglishServiceInquiryPage() {
  return (
    <>
      <Head>
        <title>Service Inquiry | Biet Al Reef</title>
        <meta name="description" content="Send a service inquiry to Biet Al Reef for contracting, maintenance, finishing and building services in the UAE." />
        <link rel="canonical" href="https://bietalreef.ae/en/service-inquiry" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/service-inquiry" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/service-inquiry" />
      </Head>
      <EnglishLayout>
        <main className="bg-[#FDFBF7]">
          <EnglishLeadForm formType="inquiry" />
        </main>
      </EnglishLayout>
    </>
  );
}
