import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import { ArrowRight, Cloud, Database, BrainCircuit, Map, Workflow, AppWindow, BadgeCheck, BarChart3, Network, ShieldCheck } from 'lucide-react';

const faqs=[
  ['Is Biet Al Reef listed in Google Cloud Partner Finder?','Yes. Biet Al Reef has a public and verified Google Cloud Partner Finder profile presenting the company, its platform and technical focus areas in the UAE.'],
  ['What is the difference between Google Cloud and Google Workspace?','Google Cloud focuses on infrastructure, applications, databases, AI, Maps and integrations, while Google Workspace focuses on business email, files, meetings, collaboration and user administration.'],
  ['Does Biet Al Reef have a publicly displayed Partner Tier?','The current official profile does not display a Partner Tier, so we do not claim any partnership level that is not publicly shown.'],
  ['What types of projects can be delivered?','That depends on the requirement and may include application modernisation, data, analytics, databases, Maps, AI, automation and integrations within the agreed project scope.']
];

const faqSchema={
  '@context':'https://schema.org',
  '@type':'FAQPage',
  mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))
};

const comparison=[
  ['Reliability & transparency','Unclear technical claims or partnership positioning','A verified public Google Cloud Partner Finder listing with no claim of an undisclosed Tier'],
  ['Solution scope','Generic services or fixed packages that may not reflect actual usage','Services selected around the company’s real requirement and project scope to reduce unnecessary complexity and waste'],
  ['AI & Maps','Generic solutions disconnected from the business context','Google Maps APIs and AI capabilities integrated into clear operational and commercial use cases'],
  ['Added business value','Technical consulting isolated from the company’s digital presence','Ability to connect cloud infrastructure with Biet Al Reef business paths and directory presence when account and publishing requirements are met']
];

const capabilities=[
  [AppWindow,'Application Modernisation','Restructure and connect existing applications to flexible, scalable cloud architecture according to actual business needs.'],
  [Database,'Data & Databases','Design data pipelines, databases and analytics flows that support business decisions with organised information.'],
  [BrainCircuit,'Enterprise AI Integration','Integrate AI capabilities within a defined practical scope that supports operations, customers, content or analysis.'],
  [Map,'Google Maps APIs','Embed maps, locations, routing and geospatial capabilities to support field operations, logistics and applications.'],
  [Workflow,'Workflow Automation & Integration','Connect systems, reduce repetitive manual processes and coordinate workflows across applications and data.'],
  [Cloud,'Cloud Architecture Consulting','Select the services and architecture that fit workload size, expected usage, performance, cost and scalability requirements.']
];

export default function GoogleCloudEnglish(){return <><Head>
<title>Google Cloud UAE | Cloud & AI Solutions for Businesses | Biet Al Reef</title>
<meta name="description" content="Modernise your infrastructure with Google Cloud services from Biet Al Reef in the UAE, covering AI, Maps, data management and workflow automation with clear technical scope."/>
<meta name="keywords" content="Google Cloud UAE, Google cloud services UAE, Google Maps API UAE, business automation, AI for businesses, Biet Al Reef Google Cloud"/>
<meta name="robots" content="index, follow, max-image-preview:large"/>
<link rel="canonical" href="https://bietalreef.ae/en/google-cloud-biet-alreef"/>
<meta property="og:title" content="Google Cloud UAE | Cloud & AI Solutions for Businesses | Biet Al Reef"/>
<meta property="og:description" content="Google Cloud solutions for UAE businesses covering applications, data, AI, Maps, automation and integrations."/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://bietalreef.ae/en/google-cloud-biet-alreef"/>
<meta property="og:image" content="https://bietalreef.ae/images/google-cloud-business-solutions.svg"/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
</Head><div dir="ltr" className="min-h-screen bg-[#F7FAFF]"><Navbar locale="en"/><main>

<section className="relative overflow-hidden bg-gradient-to-r from-[#102A43] to-[#0E4B6F] py-16 text-white md:py-24"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.15),transparent_28%)]"/><div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-black"><Cloud className="h-5 w-5"/>Google Cloud | Biet Al Reef</span><h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">Smart cloud infrastructure that drives business growth with Google Cloud from Biet Al Reef</h1><p className="mt-6 text-lg leading-9 text-white/80">We design and implement cloud solutions for businesses in the UAE, using Google Cloud infrastructure to modernise applications, manage data and integrate AI for stronger operational efficiency.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/en/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-black text-[#102A43]">Discuss your technical needs <ArrowRight className="h-5 w-5"/></Link><a href="#capabilities" className="rounded-2xl border border-white/25 px-8 py-4 text-center font-black">Explore our focus areas</a></div></div><div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-4 shadow-2xl"><img src="/images/google-cloud-business-solutions.svg" alt="Google Cloud with Biet Al Reef in the UAE" className="h-auto w-full rounded-[1.5rem]"/></div></div></section>

<section className="mx-auto max-w-7xl px-4 py-16 md:py-20"><div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm md:p-10"><div className="flex items-start gap-4"><BadgeCheck className="mt-1 h-9 w-9 shrink-0 text-[#0E4B6F]"/><div><h2 className="text-2xl font-black">Officially listed in Google Cloud Partner Finder</h2><p className="mt-4 leading-8 text-gray-600">Biet Al Reef's public Google profile shows focus areas including Google Cloud, Google Workspace, AI, Data & Analytics, Databases, Maps, application modernisation, e-commerce integrations and business process automation, without claiming a Tier that is not displayed in the official profile.</p></div></div></div></section>

<section className="mx-auto max-w-7xl px-4 pb-16 md:pb-20"><p className="font-black text-[#0E4B6F]">Transparency and efficiency before implementation</p><h2 className="mt-2 text-3xl font-black text-[#102A43] md:text-4xl">Why choose Biet Al Reef for Google Cloud?</h2><p className="mt-4 max-w-4xl leading-8 text-gray-600">We do not start by selling a cloud package. We first define the problem, then select the architecture and services that fit the business and connect them to existing workflows.</p><div className="mt-8 overflow-x-auto rounded-[2rem] border border-blue-100 bg-white shadow-sm"><table className="min-w-[880px] w-full text-left"><thead className="bg-[#102A43] text-white"><tr><th className="p-5 text-lg">Comparison point</th><th className="p-5 text-lg">Traditional IT vendors</th><th className="p-5 text-lg">Biet Al Reef Google Cloud approach</th></tr></thead><tbody>{comparison.map(([a,b,c],i)=><tr key={a} className={i%2?'bg-blue-50/50':'bg-white'}><td className="p-5 align-top font-black text-[#102A43]">{a}</td><td className="p-5 align-top leading-8 text-gray-600">{b}</td><td className="p-5 align-top leading-8 text-gray-700">{c}{a==='Added business value'?<><br/><Link href="/en/join-provider" className="mt-2 inline-flex font-black text-[#0E4B6F] underline">Biet Al Reef Provider Directory</Link></>:null}</td></tr>)}</tbody></table></div></section>

<section id="capabilities" className="bg-white py-16 md:py-20"><div className="mx-auto max-w-7xl px-4"><p className="font-black text-[#0E4B6F]">Cloud capabilities and solution areas</p><h2 className="mt-2 text-3xl font-black text-[#102A43] md:text-4xl">Connected solutions for applications, data, AI and operations</h2><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(([I,t,d])=><article key={t} className="rounded-[2rem] border border-blue-100 bg-[#F8FBFF] p-7 shadow-sm"><I className="h-9 w-9 text-[#0E4B6F]"/><h3 className="mt-4 text-xl font-black text-[#102A43]">{t}</h3><p className="mt-3 leading-8 text-gray-600">{d}</p></article>)}</div></div></section>

<section className="mx-auto max-w-7xl px-4 py-16 md:py-20"><div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]"><div><p className="font-black text-[#0E4B6F]">Delivery path</p><h2 className="mt-2 text-3xl font-black text-[#102A43] md:text-4xl">4 steps toward digital transformation</h2><div className="mt-8 space-y-4">{[['01','Define the goal and problem','Study the technical challenges and strategic objectives of the business.'],['02','Review the current environment and data','Assess existing systems, data and integrations before choosing the implementation path.'],['03','Define the Google Cloud scope','Design the architecture and services that fit business scale, performance and growth requirements.'],['04','Implement and integrate securely','Run the solution, connect data and systems, then review stability and security within the project scope.']].map(([n,t,d])=><div key={n} className="flex gap-4 rounded-3xl border border-blue-100 bg-white p-5"><span className="text-2xl font-black text-[#0E4B6F]">{n}</span><div><h3 className="font-black text-[#102A43]">{t}</h3><p className="mt-2 leading-7 text-gray-600">{d}</p></div></div>)}</div></div><div className="rounded-[2rem] bg-[#102A43] p-8 text-white"><Network className="h-10 w-10 text-blue-200"/><h2 className="mt-5 text-2xl font-black">One cloud foundation connecting applications, data and operations</h2><div className="mt-6 space-y-4">{[['Data & analytics',BarChart3],['Artificial intelligence',BrainCircuit],['Maps & location',Map],['Integration & automation',Workflow],['Security & stability',ShieldCheck]].map(([t,I])=><div key={t} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"><I className="h-5 w-5 text-blue-200"/><span className="font-bold">{t}</span></div>)}</div></div></div></section>

<section className="bg-[#EAF4FB] py-14"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left"><div><h2 className="text-3xl font-black text-[#102A43]">Request a free initial cloud infrastructure assessment</h2><p className="mt-3 leading-8 text-gray-600">Start by reviewing your current requirement before defining the implementation scope and suitable services.</p></div><Link href="/en/contact" className="inline-flex items-center gap-2 rounded-2xl bg-[#0E4B6F] px-8 py-4 font-black text-white">Request assessment <ArrowRight className="h-5 w-5"/></Link></div></section>

<FAQ items={faqs} title="Frequently asked questions about Google Cloud with Biet Al Reef"/>
<section className="py-16"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-black">Start from your company’s technical need</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">Define the goal and current challenge, then review the right cloud solution scope with our team.</p><Link href="/en/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#0E4B6F] px-8 py-4 font-black text-white">Talk to the Biet Al Reef team <ArrowRight className="h-5 w-5"/></Link></div></section>
</main><Footer locale="en"/></div></>}
