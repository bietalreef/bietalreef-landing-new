import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import { ArrowLeft, CheckCircle2, FileText, Mail, ShieldCheck, Trash2 } from 'lucide-react';

const portalUrl = 'https://providers.bietalreef.ae/?action=delete-account';

const cards = [
  {
    title: 'Delete from inside the app',
    items: [
      'Sign in to the Biet Alreef app.',
      'Open the menu, then Settings.',
      'Choose Delete account, enter your account ID, and confirm the request.',
      'Access is disabled after submission, and deletion is completed within 30 days.',
    ],
  },
  {
    title: 'Delete from outside the app',
    items: [
      'Open the secure deletion portal using the button below.',
      'Sign in with your Biet Al Reef account ID or email and password.',
      'Review the data covered by deletion, then confirm the request.',
      'Email legal@bietalreef.ae if you cannot sign in.',
    ],
  },
  {
    title: 'Data that is deleted',
    items: [
      'The account, profile information, and session identifiers.',
      'Workspace files, images, projects, conversations, and other user-generated content.',
      'Service requests, quotations, and operational data linked to the account, subject to legal limits.',
      'A public service-provider profile is hidden when processing begins.',
    ],
  },
  {
    title: 'Data we may retain',
    items: [
      'Billing, transaction, consent, security, and fraud-prevention records may be retained when required by law.',
      'Retention is limited to the applicable legal purpose and period, with restricted access and no marketing use.',
      'Limited backups may remain until the secure deletion cycle finishes, then be deleted or anonymised.',
    ],
  },
];

export default function DeleteAccountPage() {
  return (
    <>
      <Head>
        <title>Delete your Biet Alreef account | Biet Al Reef</title>
        <meta name="description" content="Steps to request deletion of your Biet Alreef account and associated data, including data that may be retained for legal requirements." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/delete-account" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/delete-account" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/delete-account" />
      </Head>

      <EnglishLayout>
        <main dir="ltr" className="min-h-screen bg-[#F8F4EC] text-left text-gray-900">
          <section className="border-b border-[#E6DCC8] bg-gradient-to-br from-[#0F3F1A] to-[#071E11] text-white">
            <div className="mx-auto max-w-5xl px-4 py-16 text-center md:py-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F3D46B]">
                <ShieldCheck className="h-5 w-5" />
                Control your account and data
              </span>
              <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">Delete your Biet Alreef account</h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/85 md:text-lg">
                This is the official deletion page for the Biet Alreef app by Biet Al Reef. You can request deletion of your account and associated data from the app or through the secure web portal.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={portalUrl} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 py-3 font-black text-[#102F18] transition hover:bg-[#F3D46B]">
                  <Trash2 className="h-5 w-5" />
                  Open account deletion portal
                </a>
                <Link href="/en/privacy" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/15">
                  <FileText className="h-5 w-5" />
                  Privacy Policy
                </Link>
              </div>
              <p className="mt-5 text-sm font-bold text-white/70">Last updated: 8 August 2026</p>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
            <div className="grid gap-5 md:grid-cols-2">
              {cards.map((card) => (
                <article key={card.title} className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-xl font-black text-[#0F3F1A] md:text-2xl">{card.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-8 text-gray-700 md:text-base">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#9A7600]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <article className="mt-6 rounded-[2rem] border border-[#D7C48D] bg-[#FFF8E5] p-7 md:p-9">
              <h2 className="text-2xl font-black text-[#0F3F1A]">Delete selected data without deleting the account</h2>
              <p className="mt-4 leading-8 text-gray-700">
                You may request deletion or correction of selected data without closing your account where legally and operationally possible. Include your account ID and the data concerned; identity verification may be required.
              </p>
              <a href="mailto:legal@bietalreef.ae?subject=Biet%20Alreef%20data%20deletion%20request" className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-3 font-black text-white">
                <Mail className="h-5 w-5" />
                legal@bietalreef.ae
              </a>
            </article>

            <div className="mt-8 flex justify-center">
              <Link href="/en" className="inline-flex items-center gap-2 font-black text-[#0F3F1A]">
                <ArrowLeft className="h-5 w-5" />
                Back to Biet Al Reef
              </Link>
            </div>
          </section>
        </main>
      </EnglishLayout>
    </>
  );
}
