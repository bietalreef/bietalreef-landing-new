import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { CATEGORY } from '../data/localServices';
import { localPath } from '../lib/localServices';
import { CONSENT_EVENT, analyticsConsent } from './PrivacyConsentCenter';
import { trackPublicEvent } from '../lib/publicAnalytics';

export default function LocalServicesPage({ model }) {
  const { locale, area, city, category, providers, areas } = model;
  const en = locale === 'en';
  const name = item => en ? item.nameEn : item.nameAr;
  const cityService = Boolean(model.service && !area);
  const context = { locale, source_page: model.canonical.replace('https://bietalreef.ae', ''), page_type: cityService ? 'city_service' : area ? 'area' : category ? 'city_category' : 'city', emirate: city.emirate, city: city.slug, area: area?.slug || '', category: category || '', service: model.service || '' };
  const recorded = useRef('');
  useEffect(() => {
    const record = () => {
      if (analyticsConsent() !== 'accepted' || recorded.current === model.canonical) return;
      recorded.current = model.canonical;
      void trackPublicEvent('page_view', { metadata: { ...context, local_event: cityService ? 'city_service_view' : 'area_page_view' } });
    };
    record();
    window.addEventListener(CONSENT_EVENT, record);
    return () => window.removeEventListener(CONSENT_EVENT, record);
  }, [model.canonical]);
  const track = (event, provider, conversion = false) => {
    const metadata = { ...context, provider_id: provider.id, provider_slug: provider.slug, local_event: event };
    void trackPublicEvent('click', { metadata });
    if (conversion) void trackPublicEvent('click', { metadata: { ...metadata, local_event: 'provider_area_conversion', action: event } });
  };
  const profile = provider => `${en ? '/en' : ''}/providers/${provider.slug}`;
  const button = 'inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#D8C8AA] bg-white px-4 py-3 font-bold text-[#0F3F1A]';
  const place = area ? `${name(area)} – ${name(city)}` : name(city);
  const authorityHub = !area && category === CATEGORY.slug && !cityService;
  const marketPrefix = en ? '/en' : '';
  const marketCleaningUrl = `https://app.bietalreef.ae${marketPrefix}/cleaning-services-uae`;
  const marketCityCleaningUrl = `https://app.bietalreef.ae${marketPrefix}/map/al-ain/cleaning-services`;
  const marketStore = provider => `https://app.bietalreef.ae${marketPrefix}/Marketplace/${provider.slug}`;
  const faqs = cityService ? [
    [en ? `Is ${model.intent.name.en.toLowerCase()} available in Al Ain?` : `هل تتوفر خدمة ${model.intent.name.ar} في العين؟`, en ? 'Yes. The providers listed below have a published service relationship and coverage that includes Al Ain. Confirm the scope and appointment with your chosen provider.' : 'نعم. لدى المزودين المعروضين أدناه علاقة خدمة منشورة وتغطية تشمل العين. أكد النطاق والموعد مع المزود الذي تختاره.'],
    [en ? 'Who provides the service?' : 'من يقدم الخدمة؟', providers.map(provider => provider.name[locale]).join(en ? ', ' : '، ') + (en ? '. Biet Alreef hosts the discovery page; the provider quotes and performs the work.' : '. يستضيف بيت الريف صفحة الاكتشاف؛ يقدم المزود عرض السعر وينفذ العمل.')],
    [en ? 'How do I request it?' : 'كيف أطلب الخدمة؟', en ? 'Choose a listed provider and use Call, WhatsApp or Request a quote. Send photos, the Al Ain district and the details below before confirming work.' : 'اختر مزودًا معروضًا واستخدم الاتصال أو واتساب أو طلب عرض سعر. أرسل الصور ومنطقة العين والمعلومات الموضحة أدناه قبل اعتماد العمل.'],
    [en ? 'How is the quote determined?' : 'كيف يتم تحديد عرض السعر؟', en ? 'The quote depends on quantity, dimensions, material, condition, location and agreed scope. No estimated price is published here.' : 'يعتمد العرض على العدد والمقاسات والخامة والحالة والموقع والنطاق المتفق عليه. لا ننشر سعرًا تقديريًا هنا.'],
  ] : [
    [en ? `Who serves ${place}?` : `هل يوجد مزود يخدم ${place}؟`, providers.length ? (en ? `The providers listed here have approved service coverage for ${place}. Confirm the service and appointment before booking.` : `المزودون المعروضون لديهم نطاق خدمة معتمد يشمل ${place}. أكد نوع الخدمة والموعد قبل الحجز.`) : (en ? 'No eligible provider is currently listed. Browse the city directory.' : 'لا يوجد مزود مؤهل منشور حاليًا. يمكنك تصفح دليل المدينة.')],
    [en ? 'How do I request home or villa cleaning?' : 'كيف أطلب تنظيف منزل أو فيلا؟', en ? 'Open a provider profile or use Request a quote. Include the district, property size, rooms and preferred date.' : 'افتح ملف المزود أو اضغط طلب عرض سعر. أرسل المنطقة ومساحة المكان وعدد الغرف والموعد المطلوب.'],
    [en ? 'Can I send photos before pricing?' : 'هل يمكن إرسال صور قبل تحديد السعر؟', en ? 'Yes. Use the provider’s WhatsApp link to send photos and dimensions. The provider confirms the scope and final quotation.' : 'نعم، استخدم رابط واتساب المزود لإرسال الصور والمقاسات. يراجع المزود نطاق العمل ويؤكد عرض السعر.'],
    [en ? 'Are sofa and carpet cleaning listed?' : 'هل تتوفر خدمات تنظيف الكنب والسجاد؟', en ? 'Check the published service cards below. Confirm fabric type, item count and dimensions with the provider.' : 'راجع بطاقات الخدمات المنشورة أدناه. أكد نوع القماش وعدد القطع والمقاسات مع المزود.'],
    [en ? 'How is the price determined?' : 'كيف يتم تحديد السعر؟', en ? 'Pricing depends on service scope, quantity, condition and location. This directory does not publish an estimated price.' : 'يتحدد السعر حسب نطاق العمل والكمية وحالة المكان والموقع. لا يعرض الدليل سعرًا تقديريًا.'],
  ];
  return <>
    <SEOHead title={model.title} description={model.description} canonicalPath={model.canonical.replace('https://bietalreef.ae', '')} alternatePath={model.alternates.en.replace('https://bietalreef.ae', '')} noIndex={!model.indexable} noIndexFollow structuredData={model.schema} breadcrumbs={model.breadcrumbs} />
    <div dir={en ? 'ltr' : 'rtl'} lang={en ? 'en' : 'ar'} className="min-h-screen bg-[#FDFBF7] text-[#1D2E22]">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8" data-analytics-section="local-services">
        <nav aria-label={en ? 'Breadcrumbs' : 'مسار التصفح'} className="flex flex-wrap gap-3 text-sm">{model.breadcrumbs.map(crumb => <Link key={crumb.href} href={crumb.href}>{crumb.name}</Link>)}</nav>
        <section className="rounded-3xl border border-[#E6DCC8] bg-white p-6 md:p-10">
          <h1 className="text-3xl font-black leading-relaxed text-[#0F3F1A]">{model.title.split(' | ')[0]}</h1>
          <p className="mt-4 leading-8">{model.description}</p>
          <p className="mt-3 leading-8">{en ? `${area ? `${place} is part of Al Ain` : 'Al Ain is a city'} in the Emirate of Abu Dhabi. Biet Alreef connects service seekers with published provider profiles. Service coverage does not indicate a local branch.` : `${area ? `${place} ضمن مدينة العين` : 'العين مدينة'} في إمارة أبوظبي. يربط بيت الريف طالب الخدمة بملفات المزودين المنشورة. نطاق الخدمة لا يعني وجود فرع داخل المنطقة.`}</p>
          {cityService ? <a className={`${button} mt-4`} href="#local-providers">{en ? 'View providers and request a quote' : 'عرض المزودين وطلب عرض سعر'}</a> : <Link className={`${button} mt-4`} href={localPath({ locale, area: area?.slug, category: CATEGORY.slug })}>{en ? 'Browse cleaning services' : 'تصفح خدمات التنظيف'}</Link>}
        </section>
        {cityService && <section className="rounded-3xl border border-[#E6DCC8] bg-white p-6">
          <h2 className="text-2xl font-bold">{en ? 'What is the service?' : 'ما هي الخدمة؟'}</h2>
          <p className="mt-4 leading-8">{model.requestedService.summary[locale]}</p>
          <h2 className="mt-6 text-2xl font-bold">{en ? 'When do you need it?' : 'متى تحتاجها؟'}</h2>
          <p className="mt-4 leading-8">{model.intent.when[locale]}</p>
          <h2 className="mt-6 text-2xl font-bold">{en ? 'Information needed to assess the work' : 'المعلومات المطلوبة لتقييم العمل'}</h2>
          <ul className="mt-4 list-inside list-disc space-y-3">{model.intent.details[locale].map(item => <li key={item}>{item}</li>)}</ul>
          <p className="mt-4 leading-8">{en ? 'The provider reviews these details and confirms which items, surfaces and treatments are included before approving the quote. Photos help assess the condition; they do not confirm a final price.' : 'يراجع المزود هذه المعلومات ويؤكد القطع والأسطح والمعالجات المشمولة قبل اعتماد العرض. تساعد الصور على تقييم الحالة ولا تثبت سعرًا نهائيًا.'}</p>
        </section>}
        {area?.editorial.reviewed && <section><h2 className="text-2xl font-bold">{en ? `Local guidance for ${name(area)}` : `معلومات محلية عن ${name(area)}`}</h2>{area.editorial.blocks.map((block, index) => <p key={index} className="mt-4 leading-8">{block[locale]}</p>)}<p className="mt-3 text-sm">{en ? 'Source: ' : 'المصدر: '}{area.editorial.source}</p></section>}
        {authorityHub && <section className="rounded-3xl border border-[#D8C8AA] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold">{en ? 'Al Ain cleaning services guide' : 'دليل شركات وخدمات التنظيف في العين'}</h2>
          <p className="mt-4 leading-8">{en ? 'Biet Alreef organizes cleaning demand in Al Ain by real published service scope. Choose the exact service you need, review eligible provider profiles and move to a call, WhatsApp conversation or quotation request without relying on unsupported prices or claims.' : 'ينظم بيت الريف طلبات التنظيف في العين حسب نطاق الخدمات المنشورة فعليًا. اختر الخدمة المطلوبة، وراجع ملفات المزودين المؤهلين، ثم انتقل إلى الاتصال أو واتساب أو طلب عرض سعر دون الاعتماد على أسعار أو ادعاءات غير موثقة.'}</p>
          {model.relatedServices.length > 0 && <div className="mt-5 grid gap-3 sm:grid-cols-2">{model.relatedServices.map(item => <Link key={item.slug} href={item.path} className={button}>{item.name[locale]}</Link>)}</div>}
          <div className="mt-5 flex flex-wrap gap-3">
            <a className={button} href={marketCleaningUrl}>{en ? 'Browse cleaning on Biet Al Reef Marketplace' : 'تصفح قسم التنظيف في سوق بيت الريف'}</a>
            <a className={button} href={marketCityCleaningUrl}>{en ? 'Cleaning stores serving Al Ain' : 'متاجر التنظيف التي تخدم العين'}</a>
          </div>
        </section>}
        {!area && <section><h2 className="text-2xl font-bold">{en ? 'Al Ain districts' : 'مناطق العين'}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">{areas.map(item => <Link className={button} key={item.slug} href={localPath({ locale, area: item.slug })}>{name(item)}</Link>)}</div></section>}
        {model.featured.length > 0 && <aside aria-label={en ? 'Paid placements' : 'ظهور تجاري'} className="rounded-3xl border border-[#D4AF37] p-6"><h2 className="text-xl font-bold">{en ? 'Paid placements' : 'ظهور تجاري مدفوع'}</h2>{model.featured.map(({ provider, placement }) => <p key={provider.id} className="mt-3"><span>{placement.label[locale]} — </span><Link href={profile(provider)}>{provider.name[locale]}</Link></p>)}</aside>}
        <section id="local-providers" className="scroll-mt-24"><h2 className="text-2xl font-bold">{en ? `Providers serving ${place}` : `مزودون يخدمون ${place}`}</h2>
          <p className="mt-3 leading-8">{en ? 'Listed providers are verified on Biet Alreef. Coverage and published services determine eligibility; verification is not a guarantee of service quality.' : 'المزودون المدرجون موثقون على بيت الريف. يعتمد ظهورهم على نطاق الخدمة والخدمات المنشورة؛ التوثيق لا يمثل ضمانًا لجودة التنفيذ.'}</p>
          {!providers.length && <p>{en ? 'No published provider currently meets the eligibility criteria.' : 'لا يوجد مزود منشور يحقق شروط الظهور حاليًا.'}</p>}
          {providers.map(provider => <article key={provider.id} className="mt-5 rounded-3xl border border-[#E6DCC8] bg-white p-6">
            <div className="flex items-center gap-4"><Image src={provider.image} alt={provider.name[locale]} width={72} height={72} /><h3 className="text-xl font-bold"><Link href={profile(provider)} data-local-analytics="true" onClick={() => track(cityService ? 'provider_view_from_service' : 'provider_view_from_area', provider)}>{provider.name[locale]}</Link></h3></div>
            <p className="mt-4 leading-8">{en ? `${provider.name[locale]} is a cleaning provider serving ${place}, subject to the agreed scope and appointment. Biet Alreef hosts its profile; the provider confirms the quotation and performs the work.` : `${provider.name[locale]} مزود خدمات تنظيف يخدم ${place} حسب نطاق العمل والموعد المتفق عليه. يستضيف بيت الريف ملفه؛ يؤكد المزود عرض السعر وينفذ العمل.`}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link className={button} href={profile(provider)} data-local-analytics="true" onClick={() => track(cityService ? 'provider_view_from_service' : 'provider_view_from_area', provider)}>{en ? 'Provider profile' : 'ملف المزود'}</Link>
              <a className={button} href={marketStore(provider)}>{en ? 'Marketplace store' : 'متجر المزود في سوق بيت الريف'}</a>
              <a className={button} href={`tel:${provider.phone}`} data-local-analytics="true" onClick={() => track('phone_click', provider, true)}>{en ? 'Call' : 'اتصال'}</a>
              <a className={button} href={`https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(en ? `Quotation for ${model.intent?.name.en || 'cleaning'} in ${place}` : `طلب عرض سعر ${model.intent?.name.ar || 'تنظيف'} في ${place}`)}`} target="_blank" rel="noopener noreferrer" data-local-analytics="true" onClick={() => track('whatsapp_click', provider, true)}>WhatsApp</a>
              {provider.mapsUrl && <a className={button} href={provider.mapsUrl} target="_blank" rel="noopener noreferrer" data-local-analytics="true" onClick={() => track('map_click', provider)}>{en ? 'Google Business Profile' : 'ملف Google'}</a>}
              <Link className={button} href={`${en ? '/en' : ''}/request-quote?provider=${encodeURIComponent(provider.slug)}&city=${city.slug}&area=${area?.slug || ''}&category=${category || ''}&service=${model.service || ''}`} data-local-analytics="true" onClick={() => track('request_quote', provider, true)}>{en ? 'Request a quote' : 'طلب عرض سعر'}</Link>
            </div>
            {category && <><h3 className="mt-6 text-xl font-bold">{en ? 'Published cleaning services' : 'خدمات التنظيف المنشورة'}</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">{provider.services.filter(item => !model.service || item.slug === model.service).map(item => <div className="rounded-2xl bg-[#FDFBF7] p-4" key={item.id}><h4 className="font-bold"><Link href={model.relatedServices.find(entry => entry.slug === item.slug)?.path || (model.service === item.slug ? localPath({ locale, category: CATEGORY.slug, service: item.slug }) : profile(provider))}>{item.title[locale]}</Link></h4><p className="mt-2 leading-7">{item.summary[locale]}</p></div>)}</div></>}
          </article>)}
        </section>
        {model.relatedServices.length > 0 && (!authorityHub || cityService) && <section><h2 className="text-2xl font-bold">{en ? 'Related services in Al Ain' : 'خدمات مرتبطة في العين'}</h2><div className="mt-4 flex flex-wrap gap-3">{model.relatedServices.map(item => <Link key={item.slug} href={item.path} className={button}>{item.name[locale]}</Link>)}</div></section>}
        <section className="rounded-3xl border border-[#E6DCC8] bg-white p-6"><h2 className="text-2xl font-bold">{en ? 'Prepare your quotation request' : 'جهز طلب عرض السعر'}</h2><ul className="mt-4 list-inside list-disc space-y-3"><li>{en ? 'Send the district and a precise location privately to the provider.' : 'أرسل المنطقة والموقع الدقيق للمزود بشكل خاص.'}</li><li>{en ? 'Specify the property size or item count and dimensions.' : 'حدد مساحة المكان أو عدد القطع ومقاساتها.'}</li><li>{en ? 'Attach clear photos and describe stains or post-construction debris.' : 'أرفق صورًا واضحة وحدد البقع أو مخلفات التشطيب.'}</li><li>{en ? 'Agree the scope, materials, price and appointment before work starts.' : 'اتفق على النطاق والمواد والسعر والموعد قبل بدء التنفيذ.'}</li></ul></section>
        <section><h2 className="text-2xl font-bold">{en ? `Questions about services in ${place}` : `أسئلة عن الخدمات في ${place}`}</h2><div className="mt-4 space-y-4">{faqs.map(([question, answer]) => <article key={question} className="rounded-2xl border border-[#E6DCC8] bg-white p-5"><h3 className="font-bold">{question}</h3><p className="mt-2 leading-8">{answer}</p></article>)}</div></section>
        {area && <section><h2 className="text-2xl font-bold">{en ? 'Other Al Ain districts' : 'مناطق أخرى في العين'}</h2><div className="mt-4 flex flex-wrap gap-3">{areas.filter(item => item.slug !== area.slug).map(item => <Link className={button} key={item.slug} href={localPath({ locale, area: item.slug, category: category || undefined })}>{name(item)}</Link>)}</div></section>}
        <p className="text-sm leading-7">{en ? 'Source: published provider profile on Biet Alreef. Service coverage reviewed for the Al Ain pilot on 5 October 2026. Confirm availability with the provider.' : 'المصدر: ملف المزود المنشور على بيت الريف. روجع نطاق خدمة تجربة العين بتاريخ 5 أكتوبر 2026. أكد توفر الخدمة مع المزود.'}</p>
      </main><Footer showRequestCTA={false} />
    </div>
  </>;
}
