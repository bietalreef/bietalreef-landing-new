import Head from 'next/head';
import EnglishLayout from '../../components/EnglishLayout';
import EnglishLeadForm from '../../components/EnglishLeadForm';

export default function EnglishRequestQuotePage() {
  return (
    <>
      <Head>
        <title>Request a Quotation | Biet Al Reef</title>
        <meta name="description" content="Request a quotation from Biet Al Reef for contracting, finishing, maintenance, building materials and project services in the UAE." />
        <link rel="canonical" href="https://bietalreef.ae/en/request-quote" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/request-quote" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/request-quote" />
      </Head>
      <EnglishLayout>
        <main className="bg-[#FDFBF7]">
          <EnglishLeadForm formType="quote" />
        </main>
      </EnglishLayout>
    </>
  );
}
