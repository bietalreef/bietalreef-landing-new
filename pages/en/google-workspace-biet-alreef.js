import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import { ArrowRight, Mail, FolderKanban, Video, CalendarDays, Users, ShieldCheck, CheckCircle2, Database, Settings2, Building2 } from 'lucide-react';

const faqs=[
  ['Why do I need Google Workspace instead of a free Gmail account?','A personal account is designed for individual use, while Google Workspace provides professional email on your company domain, organisational ownership of data, central control over employee accounts, and business-focused administration and security tools.'],
  ['Can Biet Al Reef connect the domain and create the email accounts?','Yes. Our service scope can include the full technical setup, from connecting domain records and creating email accounts to configuring the core tools according to the agreed scope.'],
  ['Can old email and files be migrated?','Yes. We can assess your current environment and support the migration of existing messages and files to Google Workspace through an organised transition plan designed to reduce downtime and risk.'],
  ['Are annual-plan benefits provided directly by Google?','Any additional or included benefits are provided under eligible Biet Al Reef commercial plans and their own terms, and are not a general free offer from Google.']
];

const faqSchema={
  '@context':'https://schema.org',
  '@type':'FAQPage',
  mainEntity:faqs.map(([q,a])=>({
    '@type':'Question',
    name:q,
    acceptedAnswer:{'@type':'Answer',text:a}
  }))
};

const comparison=[
  ['Domain connection (Domain DNS)','Manual MX, SPF and DKIM configuration can lead to delivery problems when configured incorrectly','Comprehensive technical configuration of email and security records according to service scope to reduce delivery errors and improve email reliability'],
  ['Account structure','Individual account creation without a clear organisational structure','User and permission structure designed around departments, job roles and company requirements'],
  ['Data migration','Manual migration can expose email or files to unnecessary risk during transition','Assessment of the current environment and migration support for email and files under an agreed transition plan'],
  ['Added value in the UAE','A standalone technical subscription disconnected from the company’s wider digital presence','Workspace can be connected to the Biet Al Reef business path, including eligibility to join the Biet Al Reef provider directory when account and publishing requirements are met']
];

const tools=[
  [Mail,'Gmail for Business (Professional Email)','Official email connected to your company domain, such as info@yourcompany.ae, to strengthen corporate identity and organise customer communication.'],
  [FolderKanban,'Google Drive','Organise and share company files in a cloud environment while controlling view and edit permissions by user.'],
  [Video,'Google Meet','Video meetings and direct collaboration between teams and customers within Google Workspace.'],
  [CalendarDays,'Google Calendar','Shared calendars for appointments, meetings and tasks, helping reduce scheduling conflicts across teams.'],
  [Users,'Central Admin Console','Add users, modify accounts and permissions, and manage organisational settings from a central administration environment.'],
  [ShieldCheck,'Structured Setup & Security','Configure accounts, domain records and core tools according to the agreed technical scope.']
];

export default function WorkspaceEnglish(){return <>
  <Head>
    <title>Google Workspace UAE | Professional Email & Cloud Business Environment | Biet Al Reef</title>
    <meta name="description" content="Move your business to a professional Google Workspace environment in the UAE with Biet Al Reef. Get company-domain email, complete domain connection and organised user administration."/>
    <meta name="keywords" content="Google Workspace UAE, company domain email, Gmail for business, connect domain to email, Biet Al Reef Google Workspace, cloud business environment UAE"/>
    <meta name="robots" content="index, follow, max-image-preview:large"/>
    <link rel="canonical" href="https://bietalreef.ae/en/google-workspace-biet-alreef"/>
    <meta property="og:title" content="Google Workspace UAE | Biet Al Reef"/>
    <meta property="og:description" content="Professional email on your company domain and structured Google Workspace setup in the UAE with Biet Al Reef."/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://bietalreef.ae/en/google-workspace-biet-alreef"/>
    <meta property="og:image" content="https://bietalreef.ae/images/google-workspace-business-tools.svg"/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  </Head>
  <div dir="ltr" className="min-h-screen bg-[#FBFAFF]"><Navbar locale="en"/><main>

    <section className="bg-gradient-to-b from-violet-50 to-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-800">Google Workspace | Biet Al Reef</span>
          <h1 className="mt-6 text-4xl font-black leading-tight text-[#34245E] md:text-6xl">Move your company to a professional business environment with Google Workspace from Biet Al Reef</h1>
          <p className="mt-6 text-lg leading-9 text-gray-600">Move away from scattered personal accounts. We help companies in the UAE establish professional email on their own domain, such as <span className="font-bold text-[#34245E]">info@yourcompany.ae</span>, with an integrated technical setup connecting communication, storage and permission management in one organised environment.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/en/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5B3E96] px-8 py-4 font-black text-white">Get your business email now <ArrowRight className="h-5 w-5"/></Link>
            <Link href="/en/contact" className="inline-flex items-center justify-center rounded-2xl border border-violet-300 bg-white px-8 py-4 font-black text-[#5B3E96]">Talk to a setup consultant</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white p-4 shadow-xl">
          <img src="/images/google-workspace-business-tools.svg" alt="Google Workspace with Biet Al Reef in the UAE" className="h-auto w-full rounded-[1.5rem]"/>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mb-10 max-w-4xl">
        <p className="font-black text-[#6D4BAA]">Business-grade setup, not just licence purchasing</p>
        <h2 className="mt-2 text-3xl font-black text-[#34245E] md:text-4xl">Why choose Biet Al Reef to set up Google Workspace for your company?</h2>
        <p className="mt-4 leading-8 text-gray-600">A cloud business environment is more than creating email accounts. It includes domain connection, user organisation, permission management and a transition plan when existing accounts or files already exist.</p>
      </div>
      <div className="overflow-x-auto rounded-[2rem] border border-violet-100 bg-white shadow-sm">
        <table className="min-w-[880px] w-full text-left">
          <thead className="bg-[#34245E] text-white"><tr><th className="p-5 text-lg">Comparison</th><th className="p-5 text-lg">Self setup / traditional providers</th><th className="p-5 text-lg">Biet Al Reef Google Workspace service</th></tr></thead>
          <tbody>{comparison.map(([a,b,c],i)=><tr key={a} className={i%2?'bg-violet-50/50':'bg-white'}><td className="p-5 align-top font-black text-[#34245E]">{a}</td><td className="p-5 align-top leading-8 text-gray-600">{b}</td><td className="p-5 align-top leading-8 text-gray-700">{c}{a==='Added value in the UAE'?<><br/><Link href="/en/join-provider" className="mt-2 inline-flex font-black text-[#5B3E96] underline">Biet Al Reef Provider Directory</Link></>:null}</td></tr>)}</tbody>
        </table>
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10"><p className="font-black text-[#6D4BAA]">Google tools for business</p><h2 className="mt-2 text-3xl font-black text-[#34245E] md:text-4xl">Integrated tools for communication, files, meetings and administration</h2></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{tools.map(([I,t,d])=><article key={t} className="rounded-[2rem] border border-violet-100 bg-[#FCFAFF] p-7 shadow-sm"><I className="h-9 w-9 text-[#5B3E96]"/><h3 className="mt-4 text-xl font-black text-[#34245E]">{t}</h3><p className="mt-3 leading-8 text-gray-600">{d}</p></article>)}</div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
        <div>
          <p className="font-black text-[#6D4BAA]">Implementation methodology</p>
          <h2 className="mt-2 text-3xl font-black text-[#34245E] md:text-4xl">How we prepare your Workspace environment</h2>
          <div className="mt-8 space-y-4">{[
            ['01','Domain review','Review your existing domain ownership or assist with preparing a new domain when required.'],
            ['02','Users and requirements','Review your organisational structure and identify account numbers and permission levels by team or department.'],
            ['03','Technical setup and connection','Configure domain records, activate Google Workspace tools and support migration of existing data where applicable.'],
            ['04','Handover and launch','Hand over the administration environment and guide the team to begin operating in an organised business workspace.']
          ].map(([n,t,d])=><article key={n} className="flex gap-4 rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#34245E] font-black text-white">{n}</span><div><h3 className="text-xl font-black text-[#34245E]">{t}</h3><p className="mt-2 leading-7 text-gray-600">{d}</p></div></article>)}</div>
        </div>
        <div className="space-y-5">
          <article className="rounded-[2rem] bg-[#34245E] p-8 text-white"><Database className="h-9 w-9 text-[#F3D46B]"/><h3 className="mt-5 text-2xl font-black">Migration without unnecessary disruption</h3><p className="mt-4 leading-8 text-white/75">When existing email or files need to be moved, the current environment is reviewed first so the migration scope can be planned before changes are made.</p></article>
          <article className="rounded-[2rem] border border-violet-100 bg-violet-50 p-8"><Settings2 className="h-9 w-9 text-[#5B3E96]"/><h3 className="mt-5 text-2xl font-black text-[#34245E]">Administration built around the company</h3><p className="mt-4 leading-8 text-gray-700">Users, accounts and permissions can be organised according to company structure rather than managed as disconnected personal accounts.</p></article>
          <article className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-8"><Building2 className="h-9 w-9 text-[#34245E]"/><h3 className="mt-5 text-2xl font-black text-[#34245E]">Eligible annual subscription benefits</h3><p className="mt-4 leading-8 text-gray-700">Some eligible annual Biet Al Reef packages may include Google for Business benefits and a company domain under the package terms. These benefits are part of Biet Al Reef's commercial offer and are not a general free offer from Google.</p></article>
        </div>
      </div>
    </section>

    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[2rem] border border-violet-100 bg-[#FCFAFF] p-8 md:p-10">
          <ShieldCheck className="h-10 w-10 text-[#5B3E96]"/>
          <h2 className="mt-5 text-3xl font-black text-[#34245E]">A structured business environment for communication and data</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">{['Professional company-domain email','Central user and permission management','Connected collaboration and file tools'].map(x=><div key={x} className="flex items-start gap-3 rounded-2xl bg-white p-5"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#5B3E96]"/><span className="font-bold leading-7 text-gray-700">{x}</span></div>)}</div>
        </div>
      </div>
    </section>

    <FAQ items={faqs} title="Frequently asked questions about Google Workspace"/>

    <section className="bg-[#34245E] py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-black md:text-4xl">Start with professional business email and an organised Workspace environment</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-white/75">Talk to Biet Al Reef about your domain, users, existing email environment and the setup scope your company needs.</p><Link href="/en/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#34245E]">Contact Biet Al Reef <ArrowRight className="h-5 w-5"/></Link></div></section>

  </main><Footer locale="en"/></div>
</>}
