import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Gift, Globe2, ShieldCheck, Sparkles, WalletCards } from 'lucide-react';

const plans = [
  { name:'Free Plan', badge:'Free', monthly:'0', annual:null, note:'No renewal date', features:['Verified personal account in the Biet Al Reef app','Personal profile and free-plan access','Browse and use the tools available under the system','No publishing quota included in the plan'] },
  { name:'Digital Presence', badge:'4 cards', monthly:'300', annual:'2,700', save:'Save 25% annually', features:['4 products + 4 services + 4 offers + 4 documents','Google Drive and Google Sheets integration','Weyaak business assistant','Publishing inside the Biet Al Reef app according to plan permissions'] },
  { name:'Professional Presence', badge:'10 cards', monthly:'500', annual:'4,500', save:'Save 25% annually', featured:true, features:['10 products + 10 services + 10 offers + 10 documents','Dedicated Google Cloud space according to the plan','Google Workspace within annual subscription benefits','Weyaak business assistant according to plan permissions'] },
];

const faqs = [
  ['Is there a free plan?','Yes. The Free Plan costs AED 0, and available benefits depend on account status and system permissions.'],
  ['How much is the Digital Presence plan?','AED 300 monthly or AED 2,700 annually.'],
  ['How much is the Professional Presence plan?','AED 500 monthly or AED 4,500 annually.'],
  ['Are public publishing packages separate from the app subscription?','Yes. Public publishing packages are separate from the app subscription, and the corresponding package may be included free with the annual subscription according to the plan.'],
];

export default function BusinessPlansEnglish(){
  return <>
    <Head>
      <title>Business Plans & Subscriptions | Biet Al Reef</title>
      <meta name="description" content="Biet Al Reef business plans: Free, Digital Presence at AED 300 monthly, and Professional Presence at AED 500 monthly, with annual subscription benefits and public publishing options."/>
      <link rel="canonical" href="https://bietalreef.ae/en/business-plans"/>
    </Head>
    <div dir="ltr" className="min-h-screen bg-[#FFFCF7] text-gray-900"><Navbar locale="en"/><main>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#123F1D] to-[#062D17] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-2 text-sm font-black text-[#F3D46B]"><Sparkles className="h-4 w-4"/> Plans & Subscriptions</span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Business Plans & Subscriptions</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-white/85">Choose the plan based on how your business uses Biet Al Reef and the tools, items, quotas and permissions you need, with benefits clearly explained before activation.</p>
          <a href="#plans" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">Compare plans <ArrowRight className="h-5 w-5"/></a>
        </div>
      </section>

      <section id="plans" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mb-10"><p className="font-black text-[#B8922B]">Subscription inside the Biet Al Reef app</p><h2 className="mt-2 text-3xl font-black md:text-4xl">Choose your business presence level</h2><p className="mt-3 text-gray-600">The app subscription is separate from public publishing packages, and the prices below are the approved plan prices.</p></div>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map(plan => <article key={plan.name} className={`relative rounded-[2rem] border bg-white p-7 shadow-sm ${plan.featured?'border-2 border-[#D4AF37] shadow-lg':'border-[#E6DCC8]'}`}>
            {plan.featured && <span className="absolute -top-3 right-6 rounded-full bg-[#D4AF37] px-4 py-1 text-sm font-black text-[#0F3F1A]">Most flexible</span>}
            <div className="flex items-center justify-between gap-3"><WalletCards className="h-9 w-9 text-[#0F3F1A]"/><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">{plan.badge}</span></div>
            <h3 className="mt-6 text-2xl font-black">{plan.name}</h3>
            <div className="mt-5"><span className="text-5xl font-black text-[#0F3F1A]">{plan.monthly}</span><span className="ml-2 font-bold text-gray-500">AED {plan.monthly!=='0'?'monthly':''}</span></div>
            {plan.annual && <div className="mt-3 rounded-2xl bg-[#FFF8E5] p-4"><strong className="text-xl text-[#0F3F1A]">AED {plan.annual} annually</strong><p className="mt-1 text-sm font-bold text-[#A95B19]">{plan.save}</p></div>}
            {plan.note && <p className="mt-3 text-sm font-bold text-blue-700">{plan.note}</p>}
            <div className="mt-6 space-y-3">{plan.features.map(x=><div key={x} className="flex items-start gap-3"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600"/><span className="leading-7 text-gray-700">{x}</span></div>)}</div>
            <Link href="/en/contact" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-6 py-4 font-black text-white">Choose plan <ArrowRight className="h-5 w-5"/></Link>
          </article>)}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20"><div className="mx-auto max-w-7xl px-4">
        <div className="mb-10"><p className="font-black text-[#B8922B]">Public Publishing Packages</p><h2 className="mt-2 text-3xl font-black md:text-4xl">Publish beyond the app and reach a wider audience</h2><p className="mt-3 max-w-3xl leading-8 text-gray-600">Public publishing packages are separate from the app subscription, while the corresponding annual subscription includes the appropriate package according to the plan.</p></div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFFDF8] p-8"><Globe2 className="h-9 w-9 text-[#0F3F1A]"/><h3 className="mt-5 text-2xl font-black">Public Publishing Package – 4 Cards</h3><div className="mt-5 space-y-3">{['Publish 4 eligible cards in Biet Al Reef Market','Publish 4 products monthly on Google Shopping','Independent merchant profile and presence in the Biet Al Reef Market store directory','Full landing page on the Biet Al Reef platform'].map(x=><p key={x} className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600"/>{x}</p>)}</div><div className="mt-6 rounded-2xl bg-emerald-50 p-4 font-black text-emerald-700">First year: 50% discount</div></article>
          <article className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFFDF8] p-8"><Gift className="h-9 w-9 text-[#0F3F1A]"/><h3 className="mt-5 text-2xl font-black">Business Public Publishing Package – 10 Cards</h3><div className="mt-5 space-y-3">{['Publish 10 eligible cards in Biet Al Reef Market','Publish up to 10 products monthly on Google Shopping','Independent merchant profile and presence in the Biet Al Reef Market store directory','Full landing page on the Biet Al Reef platform'].map(x=><p key={x} className="flex gap-3"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600"/>{x}</p>)}</div><div className="mt-6 rounded-2xl bg-emerald-50 p-4 font-black text-emerald-700">First year: 50% discount</div></article>
        </div>
      </div></section>

      <section className="mx-auto max-w-6xl px-4 py-16"><div className="rounded-[2rem] bg-[#0F3F1A] p-8 text-white md:p-10"><ShieldCheck className="h-9 w-9 text-[#F3D46B]"/><h2 className="mt-5 text-3xl font-black">Your plan defines quotas and permissions</h2><p className="mt-4 max-w-4xl leading-9 text-white/80">The number of items, available tools and publishing paths for an account are determined by the activated plan and account status. Review your plan details before activation or renewal.</p></div></section>

      <FAQ items={faqs} title="Frequently asked questions about business plans and subscriptions"/>
      <section className="bg-[#0F3F1A] py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center"><BriefcaseBusiness className="mx-auto h-10 w-10 text-[#F3D46B]"/><h2 className="mt-5 text-3xl font-black md:text-4xl">Choose the right plan for your business</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-white/80">Compare quotas, benefits and monthly or annual subscriptions, then activate what fits your actual usage.</p><Link href="/en/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 font-black text-[#0F3F1A]">Contact customer service <ArrowRight className="h-5 w-5"/></Link></div></section>
    </main><Footer locale="en"/></div>
  </>;
}
