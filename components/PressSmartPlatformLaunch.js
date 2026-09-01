import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  CheckCircle2,
  Cloud,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  MapPin,
  MessageSquare,
  MonitorSmartphone,
  Phone,
  ReceiptText,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Workflow,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import PlatformAccessActions from './PlatformAccessActions';

const GOOGLE_PARTNER_URL = 'https://cloud.google.com/find-a-partner/partner/biet-alreef-gen-contracting-est-sole-proprietorship-llc';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=ae.bietalreef.app';
const MARKET_URL = 'https://app.bietalreef.ae/';
const PROVIDERS_APP_URL = 'https://providers.bietalreef.ae/';
const PDF_URL = '/api/press/smart-platform-launch-pdf';

const copy = {
  ar: {
    nav: ['التحدي', 'الحل', 'الملف المهني', 'عرض السعر', 'وياك AI', 'Google Cloud'],
    ids: ['challenge', 'solution', 'profile', 'quotation', 'weyaak', 'cloud'],
    badge: 'إطلاق منظومة بيت الريف الذكية لقطاع البناء في الإمارات',
    title: 'منظومة تشغيل رقمية تنهي تشتت أعمال البناء بين المكتب وموقع المشروع',
    intro: 'تجمع بيت الريف العميل ومزود الخدمة والشركة والمتجر داخل رحلة عمل واحدة تشمل التواصل والطلبات والسوق ومساحة العمل والمستندات والذكاء الاصطناعي «وياك».',
    explore: 'استكشف منصة بيت الريف',
    market: 'تصفح سوق بيت الريف',
    pdf: 'تحميل البيان الصحفي PDF',
    trust: ['تواصل مباشر', 'دون عمولة على التواصل', 'Android والمتصفح'],
    challengeEyebrow: 'المشكلة الحقيقية',
    challengeTitle: 'قطاع يعمل بأدوات متفرقة',
    challengeText: 'المشكلة ليست العثور على مقاول فقط؛ بل انتقال المشروع بين رسائل وصور ومستندات وأجهزة لا يجمعها مسار تشغيلي واحد.',
    before: 'قبل بيت الريف',
    beforeTitle: 'معلومات موزعة يصعب تتبعها',
    beforeText: 'يتحول كل طلب إلى سلسلة من المحادثات والنسخ المتفرقة.',
    beforeItems: ['رسائل وصور داخل محادثات شخصية منفصلة عن المشروع', 'صعوبة معرفة النسخة الأخيرة من المستند أو عرض السعر', 'غموض نطاق العمل والبنود والمواصفات المطلوبة'],
    after: 'مع بيت الريف',
    afterTitle: 'رحلة واحدة مرتبطة بالمشروع',
    afterText: 'كل خطوة تبقى مرتبطة بالحساب والموقع والطلب والمستند.',
    afterItems: ['طلب واضح يمكن متابعته من المكتب أو موقع العمل', 'تواصل مباشر مع مزود الخدمة من ملفه المهني', 'مستند منظم يتضمن البنود والشروط والمرجع البصري'],
    solutionEyebrow: 'الحل المتكامل',
    solutionTitle: 'من الاحتياج إلى التنفيذ داخل منظومة واحدة',
    solutionText: 'بيت الريف تنظّم العلاقة الرقمية والتشغيلية بين العميل ومزود الخدمة، وتمنح كل طرف الأدوات التي يحتاجها دون القفز بين منصات منفصلة.',
    solutionCards: [
      ['تواصل مباشر', 'رسائل واتصال وواتساب ومشاركة موقع وطلب عرض سعر من الملف المهني، دون وساطة في التواصل.'],
      ['مساحة عمل موحدة', 'الطلبات والمشروعات والملفات والمستندات متاحة عبر الحساب نفسه في المكتب والميدان.'],
      ['سوق متخصص', 'منتجات وخدمات وعروض ومتاجر وملفات مهنية بحالات اعتماد واضحة لقطاع البناء والمقاولات.'],
      ['مستندات منظمة', 'عروض أسعار مرتبطة بالطلب والمشروع وتشمل البيانات والبنود والضريبة والشروط والمرجع البصري.'],
    ],
    profileEyebrow: 'واجهة حقيقية من منظومة بيت الريف',
    profileTitle: 'الملف المهني يتحول مباشرة إلى نقطة عمل وتواصل',
    profileText: 'لا يبدأ العميل من رقم هاتف مجهول أو رسالة بلا سياق. يراجع اسم الشركة ورقمها وحالة اعتمادها ونشاطها وتخصصاتها، ثم يختار التواصل المباشر أو إرسال طلب عرض سعر منظم.',
    profileItems: [['هوية وحالة اعتماد واضحة', 'اسم الشركة ورقم الملف المهني وشارة الاعتماد أمام العميل.'], ['رسالة وطلب عرض سعر', 'الانتقال من الاطلاع إلى إجراء عملي دون البدء من الصفر.'], ['قنوات اتصال مباشرة', 'واتساب واتصال وموقع إلى جانب التواصل داخل المنظومة.'], ['تخصصات وخدمات النشاط', 'عرض المعلومات والخدمات والتخصصات في مكان واحد.']],
    profileCta: 'استكشف ملفات مزودي الخدمة',
    quotationEyebrow: 'معيار بيت الريف للمستندات',
    quotationTitle: 'عرض السعر لا يعتمد على النص وحده',
    quotationText: 'يتطلب المستند استكمال البيانات الأساسية وإرفاق مرجع بصري مناسب لطبيعة العمل، لتقليل اختلاف الفهم والخلافات الناتجة عن غموض نطاق الأعمال.',
    quotationItems: ['وصف العمل التفصيلي', 'صورة أو مرجع بصري', 'البنود والكميات والوحدات', 'السعر والضريبة والإجمالي', 'الشروط ومدة التنفيذ', 'رقم المستند والمشروع'],
    weyaakEyebrow: 'الذكاء الاصطناعي التشغيلي',
    weyaakTitle: '«وياك» وكيل أعمال داخل المنظومة',
    weyaakText: 'يفهم احتياج المستخدم باللغة الطبيعية، ويستخلص تفاصيل الخدمة والموقع والمواصفات، ثم يحوّلها إلى طلب منظم أو مستند أو مسار واضح داخل بيت الريف.',
    weyaakSteps: [['يفهم الاحتياج', 'يقرأ الطلب النصي أو الصوتي كما يعبّر عنه المستخدم.'], ['ينظّم التفاصيل', 'يستخلص المعلومات الأساسية ويطلب استكمال الناقص.'], ['يوجّه الخطوة التالية', 'يربط الطلب بالقسم أو المستند أو مزود الخدمة المناسب.']],
    weyaakUi: {
      name: 'وكيل وياك',
      status: 'جاهز للتنفيذ',
      history: 'المحادثات',
      prompt: 'ماذا تريد أن ينجز وياك؟',
      helper: 'اكتب الهدف بوضوح. يقرأ وياك بيانات حسابك ثم يعرض خطوات قابلة للمراجعة والاعتماد.',
      commands: [
        ['راجع حسابي', 'تحقق من اكتمال الملف والبيانات المطلوبة.'],
        ['جهّز عرض سعر', 'حوّل نطاق العمل إلى مستند منظم وواضح.'],
        ['جهّز متجري', 'رتّب بيانات المتجر والعناصر قبل المراجعة.'],
      ],
      placeholder: 'اكتب ما تريد من وياك تنفيذه…',
    },
    accessEyebrow: 'مرونة الوصول',
    accessTitle: 'من المكتب والموقع ومن أي مكان',
    accessText: 'تعمل منظومة بيت الريف عبر نسخة المتصفح وتطبيق Android، ليصل صاحب النشاط وفريق المكتب والميدان إلى الحساب نفسه والأدوات نفسها.',
    accessItems: ['متابعة الطلبات والمستندات عبر الحساب نفسه', 'الوصول من الهاتف أو الكمبيوتر وفق طبيعة المهمة', 'تحديث حالة العمل بين المكتب والميدان'],
    cloudEyebrow: 'شراكة موثقة',
    cloudTitle: 'بيت الريف شريك Google Cloud مُدرج في الدليل الرسمي',
    cloudText: 'شركة بيت الريف مدرجة رسمياً في Google Cloud Partner Directory في دولة الإمارات. وتستند منظومتها إلى تقنيات سحابية تدعم تشغيل مساحات العمل والمستندات والبيانات والخدمات الذكية وقابلية التوسع.',
    cloudItems: [['مساحات عمل سحابية', 'تنظيم الملفات والمستندات'], ['وصول منظم', 'من المكتب وموقع المشروع'], ['قابلية التوسع', 'خدمات تقنية وذكية قابلة للنمو']],
    cloudCta: 'عرض ملف بيت الريف الرسمي',
    howTitle: 'كيف تعمل بيت الريف؟',
    howSubtitle: 'من رسالة متفرقة إلى مسار عمل واضح',
    howText: 'ست خطوات تربط الاحتياج بالموقع والمزود والمستند داخل رحلة واحدة.',
    steps: [['تحديد الاحتياج والموقع', 'يحدد العميل الخدمة وموقع المشروع.'], ['تنظيم الطلب عبر وياك', 'تُستكمل التفاصيل الأساسية والبيانات الناقصة.'], ['الوصول للمزود المناسب', 'بحسب التخصص والمنطقة وحالة الاعتماد.'], ['مراجعة الملف والأعمال', 'الخدمات والمشروعات والمنتجات ومعلومات النشاط.'], ['التواصل أو طلب عرض', 'اتصال مباشر أو طلب عرض سعر منظم.'], ['استلام مستند واضح', 'بنود وأسعار وشروط ومرجع بصري.']],
    ctaEyebrow: 'منظومة تشغيل وليست مجرد سوق',
    ctaTitle: 'ابدأ رحلة عمل أوضح في قطاع البناء',
    ctaText: 'اكتشف المنصة، تصفح السوق، تحدث مع وياك، أو أنشئ حضورك المهني كمزود خدمة داخل بيت الريف.',
    share: 'مشاركة الصفحة',
  },
  en: {
    nav: ['Challenge', 'Solution', 'Professional profile', 'Quotation', 'Weyaak AI', 'Google Cloud'],
    ids: ['challenge', 'solution', 'profile', 'quotation', 'weyaak', 'cloud'],
    badge: 'Launching the Biet Al Reef smart operating ecosystem for the UAE construction sector',
    title: 'A digital operating ecosystem that connects the office, the project site and every construction workflow',
    intro: 'Biet Al Reef brings customers, service providers, companies and stores into one operating journey covering communication, requests, the marketplace, workspaces, documents and Weyaak AI.',
    explore: 'Explore Biet Al Reef Platform',
    market: 'Browse Biet Al Reef Market',
    pdf: 'Download the press release PDF',
    trust: ['Direct communication', 'No commission on communication', 'Android and browser'],
    challengeEyebrow: 'The real challenge',
    challengeTitle: 'A sector still operating through disconnected tools',
    challengeText: 'The challenge is not only finding a contractor. Projects move between messages, images, documents and devices with no single operational path connecting them.',
    before: 'Before Biet Al Reef',
    beforeTitle: 'Scattered information that is hard to track',
    beforeText: 'Each request becomes a chain of conversations and disconnected copies.',
    beforeItems: ['Messages and images sit in personal conversations outside the project context', 'Teams struggle to identify the latest document or quotation version', 'Work scope, items and required specifications can remain unclear'],
    after: 'With Biet Al Reef',
    afterTitle: 'One journey connected to the project',
    afterText: 'Every step stays connected to the account, location, request and document.',
    afterItems: ['A clear request that can be followed from the office or the project site', 'Direct communication with the provider from a professional profile', 'A structured document with items, terms and a visual reference'],
    solutionEyebrow: 'Integrated solution',
    solutionTitle: 'From requirement to execution inside one ecosystem',
    solutionText: 'Biet Al Reef organises the digital and operational relationship between the customer and the service provider, giving each side the tools it needs without jumping between disconnected platforms.',
    solutionCards: [['Direct communication', 'Messages, calls, WhatsApp, location sharing and quotation requests from the professional profile, without an intermediary in the communication.'], ['Unified workspace', 'Requests, projects, files and documents are available through the same account in the office and in the field.'], ['Specialist marketplace', 'Products, services, offers, stores and professional profiles with clear approval states for construction and contracting.'], ['Structured documents', 'Quotations connected to the request and project with data, items, VAT, terms and visual references.']],
    profileEyebrow: 'A real interface from the Biet Al Reef ecosystem',
    profileTitle: 'The professional profile becomes a direct point of action and communication',
    profileText: 'Customers do not start from an unknown phone number or a message without context. They can review the company name, profile number, approval status, main activity and specialisations before contacting the provider or sending a structured quotation request.',
    profileItems: [['Clear identity and approval status', 'Company name, professional profile number and approval badge are visible to the customer.'], ['Message and request a quotation', 'Move from discovery to an actionable request without starting again from zero.'], ['Direct contact channels', 'WhatsApp, phone and location alongside communication inside the ecosystem.'], ['Activity specialisations and services', 'Business information, services and specialisations in one place.']],
    profileCta: 'Explore service-provider profiles',
    quotationEyebrow: 'Biet Al Reef document standard',
    quotationTitle: 'A quotation should not rely on text alone',
    quotationText: 'The document brings together the required data and an appropriate visual reference for the work, reducing misunderstanding and disputes caused by an unclear scope.',
    quotationItems: ['Detailed work description', 'Image or visual reference', 'Items, quantities and units', 'Price, VAT and total', 'Terms and execution period', 'Document and project number'],
    weyaakEyebrow: 'Operational artificial intelligence',
    weyaakTitle: 'Weyaak is a business agent inside the ecosystem',
    weyaakText: 'Weyaak understands a user requirement in natural language, extracts service, location and specification details, then turns them into a structured request, document or a clear next path inside Biet Al Reef.',
    weyaakSteps: [['Understands the requirement', 'Reads the text or voice request as the user naturally describes it.'], ['Organises the details', 'Extracts the key information and asks for what is missing.'], ['Routes the next step', 'Connects the request with the right section, document or service provider.']],
    weyaakUi: {
      name: 'Weyaak Agent',
      status: 'Ready to act',
      history: 'Conversations',
      prompt: 'What would you like Weyaak to accomplish?',
      helper: 'Describe the goal clearly. Weyaak reads the relevant account context and presents reviewable actions before approval.',
      commands: [
        ['Review my account', 'Check profile completion and required business data.'],
        ['Prepare a quotation', 'Turn the work scope into a clear structured document.'],
        ['Prepare my store', 'Organise store and listing data before review.'],
      ],
      placeholder: 'Tell Weyaak what you want completed…',
    },
    accessEyebrow: 'Flexible access',
    accessTitle: 'From the office, the site and anywhere else',
    accessText: 'Biet Al Reef works through the browser and Android app so business owners, office teams and field teams can access the same account and tools.',
    accessItems: ['Track requests and documents through the same account', 'Use a phone or computer according to the task', 'Keep work status aligned between the office and the field'],
    cloudEyebrow: 'Verified partnership',
    cloudTitle: 'Biet Al Reef is listed in the official Google Cloud Partner Directory',
    cloudText: 'Biet Al Reef is officially listed in the Google Cloud Partner Directory in the United Arab Emirates. The ecosystem uses cloud technologies to support workspaces, documents, data, intelligent services and future scale.',
    cloudItems: [['Cloud workspaces', 'Organise files and documents'], ['Structured access', 'From the office and project site'], ['Scalability', 'Technology and intelligent services that can grow']],
    cloudCta: 'View the official Biet Al Reef profile',
    howTitle: 'How does Biet Al Reef work?',
    howSubtitle: 'From a scattered message to a clear operating path',
    howText: 'Six steps connect the requirement, location, provider and document within one journey.',
    steps: [['Define the requirement and location', 'The customer defines the service and project location.'], ['Organise the request through Weyaak', 'Key details are completed and missing information is collected.'], ['Reach the right provider', 'Based on specialisation, location and approval status.'], ['Review the profile and work', 'Services, projects, products and business information.'], ['Communicate or request a quotation', 'Direct contact or a structured quotation request.'], ['Receive a clear document', 'Items, prices, terms and a visual reference.']],
    ctaEyebrow: 'An operating ecosystem, not just a marketplace',
    ctaTitle: 'Start a clearer construction workflow',
    ctaText: 'Explore the platform, browse the market, use Weyaak or build your professional presence as a service provider inside Biet Al Reef.',
    share: 'Share this page',
  },
};

const solutionIcons = [MessageSquare, Workflow, ShoppingBag, ReceiptText];
const profileIcons = [BadgeCheck, MessageSquare, Phone, Store];
const cloudIcons = [Cloud, MapPin, Sparkles];

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-sm font-black uppercase tracking-[0.12em] text-[#A67C16]">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{title}</h2>
      {text ? <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-8 text-gray-600 md:text-lg">{text}</p> : null}
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base font-bold leading-8 text-gray-700 md:text-lg">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#198754]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function WeyaakInterface({ ui, isEn }) {
  const commandIcons = [Search, FileText, Store];
  const SubmitArrow = isEn ? ArrowRight : ArrowLeft;

  return (
    <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[2rem] border border-[#C9D5E5] bg-[#F4F7FB] shadow-xl shadow-[#0B3157]/10" aria-label={ui.name}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8E0EB] bg-white px-5 py-4 md:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B3157] text-[#F5D887]"><Sparkles className="h-6 w-6" /></div>
          <div><div className="text-lg font-black text-[#0B1C2E]">{ui.name}</div><div className="mt-0.5 flex items-center gap-2 text-xs font-bold text-gray-500"><span className="h-2 w-2 rounded-full bg-[#15966A]" />{ui.status}</div></div>
        </div>
        <div className="rounded-xl border border-[#D8E0EB] bg-[#F8FAFC] px-4 py-2 text-sm font-bold text-[#41546B]">{ui.history}</div>
      </div>

      <div className="px-5 py-7 md:px-8 md:py-9">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4CF] text-[#0B3157]"><Bot className="h-6 w-6" /></div>
          <div><h3 className="text-2xl font-black leading-tight text-[#0B1C2E] md:text-3xl">{ui.prompt}</h3><p className="mt-2 max-w-3xl text-base font-semibold leading-8 text-gray-600">{ui.helper}</p></div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {ui.commands.map(([title, text], index) => {
            const Icon = commandIcons[index];
            return <div key={title} className="rounded-[1.35rem] border border-[#D8E0EB] bg-white p-5"><Icon className="h-6 w-6 text-[#0B5FD7]" /><div className="mt-5 text-lg font-black text-[#0B1C2E]">{title}</div><p className="mt-2 text-base font-semibold leading-7 text-gray-600">{text}</p></div>;
          })}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-[1.35rem] border border-[#C9D5E5] bg-white p-3 shadow-sm">
          <div className="min-w-0 flex-1 px-2 text-sm font-bold text-gray-500 md:text-base">{ui.placeholder}</div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B3157] text-white"><SubmitArrow className="h-5 w-5" /></span>
        </div>
      </div>
    </div>
  );
}

export default function PressSmartPlatformLaunch({ locale = 'ar' }) {
  const isEn = locale === 'en';
  const t = copy[isEn ? 'en' : 'ar'];
  const Arrow = isEn ? ArrowRight : ArrowLeft;
  const homeHref = isEn ? '/en' : '/';

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen bg-[#F7F1E8] text-[#0B1C2E]">
      <Navbar locale={isEn ? 'en' : 'ar'} pageTitle={isEn ? 'Press' : 'إعلام'} />

      <div className="sticky top-0 z-20 hidden border-y border-[#E4D8BF] bg-[#FDFBF7]/95 backdrop-blur lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-7 px-5 py-3 text-sm font-black text-[#0F3F1A]">
          {t.nav.map((label, index) => <a key={label} href={`#${t.ids[index]}`} className="hover:text-[#A67C16]">{label}</a>)}
        </div>
      </div>

      <main>
        <section className="relative overflow-hidden bg-[#0B3157] text-white">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_top,#2A7B65_0,transparent_45%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-8 md:px-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:pb-20 lg:pt-14">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A83C]/40 bg-white/10 px-4 py-2 text-xs font-black text-[#F6D57B] md:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F1B84B] shadow-[0_0_0_6px_rgba(241,184,75,.12)]" />{t.badge}
              </div>
              <h1 className="mt-6 text-4xl font-black leading-[1.22] md:text-6xl">{t.title}</h1>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-200 md:text-xl md:leading-10">{t.intro}</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link href={homeHref} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1677FF] px-6 py-3 font-black text-white shadow-xl shadow-blue-950/20 sm:w-auto sm:flex-1">{t.explore}<Arrow className="h-5 w-5" /></Link>
                <a href={MARKET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-black sm:w-auto sm:flex-1"><ShoppingBag className="h-5 w-5" />{t.market}</a>
                <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#F1C75B]/50 bg-[#F1C75B]/10 px-6 py-3 font-black text-[#FFE6A3] sm:flex-basis-full"><Download className="h-5 w-5" />{t.pdf}</a>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.trust.map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-100">{item}</span>)}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white p-1">
                <Image src="/images/press-image-01.webp" alt={t.badge} width={1400} height={788} priority sizes="(max-width: 1023px) calc(100vw - 40px), 48vw" className="h-auto w-full rounded-[1.7rem] object-contain" />
              </div>
            </div>
          </div>
        </section>

        <section id="challenge" className="px-5 py-16 md:px-8 md:py-24">
          <SectionHeading eyebrow={t.challengeEyebrow} title={t.challengeTitle} text={t.challengeText} />
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
            <article className="rounded-[2rem] border border-[#E5D8BE] bg-white p-6 shadow-sm md:p-8">
              <div className="text-xs font-black uppercase tracking-widest text-[#9B6D15]">{t.before}</div>
              <h3 className="mt-2 text-2xl font-black text-[#7A341A]">{t.beforeTitle}</h3>
              <p className="mt-3 font-semibold leading-8 text-gray-600">{t.beforeText}</p>
              <CheckList items={t.beforeItems} />
            </article>
            <article className="rounded-[2rem] border border-[#BFD9C7] bg-[#F5FBF6] p-6 shadow-sm md:p-8">
              <div className="text-xs font-black uppercase tracking-widest text-[#177044]">{t.after}</div>
              <h3 className="mt-2 text-2xl font-black text-[#0F3F1A]">{t.afterTitle}</h3>
              <p className="mt-3 font-semibold leading-8 text-gray-600">{t.afterText}</p>
              <CheckList items={t.afterItems} />
            </article>
          </div>
        </section>

        <section id="solution" className="bg-white px-5 py-16 md:px-8 md:py-24">
          <SectionHeading eyebrow={t.solutionEyebrow} title={t.solutionTitle} text={t.solutionText} />
          <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.solutionCards.map(([title, text], index) => {
              const Icon = solutionIcons[index];
              return <article key={title} className="rounded-[1.75rem] border border-[#E6DCC8] bg-[#FDFBF7] p-5 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F1FF] text-[#0B5FD7]"><Icon className="h-5 w-5" /></div><h3 className="mt-4 text-xl font-black text-[#0F3F1A]">{title}</h3><p className="mt-2 text-base font-semibold leading-7 text-gray-600">{text}</p></article>;
            })}
          </div>
          <div className="mx-auto mt-9 grid max-w-4xl grid-cols-2 items-start gap-2 md:gap-4">
            <div className="overflow-hidden rounded-[1.25rem] border border-[#E6DCC8] bg-[#FDFBF7] p-1 md:rounded-[2rem] md:p-2">
              <Image src="/images/press-image-07.webp" alt={isEn ? 'Biet Al Reef providers marketplace' : 'سوق مزودي الخدمة في بيت الريف'} width={760} height={1469} sizes="(max-width: 767px) 46vw, 380px" className="h-auto w-full rounded-[1rem] object-contain md:rounded-[1.55rem]" />
            </div>
            <div className="overflow-hidden rounded-[1.25rem] border border-[#E6DCC8] bg-[#FDFBF7] p-1 md:rounded-[2rem] md:p-2">
              <Image src="/images/press-image-08.webp" alt={isEn ? 'Biet Al Reef products marketplace' : 'سوق المنتجات في بيت الريف'} width={760} height={1406} sizes="(max-width: 767px) 46vw, 380px" className="h-auto w-full rounded-[1rem] object-contain md:rounded-[1.55rem]" />
            </div>
          </div>
        </section>

        <section id="profile" className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-sm font-black uppercase tracking-[.12em] text-[#A67C16]">{t.profileEyebrow}</div>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{t.profileTitle}</h2>
              <p className="mt-5 text-base font-semibold leading-8 text-gray-600 md:text-lg">{t.profileText}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.profileItems.map(([title, text], index) => {
                  const Icon = profileIcons[index];
                  return <div key={title} className="rounded-2xl border border-[#E6DCC8] bg-white p-4"><Icon className="h-5 w-5 text-[#0F3F1A]" /><div className="mt-2 text-lg font-black text-[#0F3F1A]">{title}</div><p className="mt-1 text-base font-semibold leading-7 text-gray-600">{text}</p></div>;
                })}
              </div>
              <Link href={isEn ? '/en/providers' : '/providers'} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#0F3F1A] px-5 py-3 font-black text-white">{t.profileCta}<Arrow className="h-4 w-4" /></Link>
            </div>
            <div className="grid grid-cols-2 items-start gap-2 md:gap-4">
              <div className="overflow-hidden rounded-[1.25rem] border border-[#E6DCC8] bg-white p-1 md:rounded-[2rem] md:p-2">
                <Image src="/images/press-image-09.webp" alt={isEn ? 'Professional profile workspace' : 'مساحة إدارة الملف المهني'} width={760} height={1411} sizes="(max-width: 1023px) 46vw, 270px" className="h-auto w-full rounded-[1rem] object-contain md:rounded-[1.55rem]" />
              </div>
              <div className="overflow-hidden rounded-[1.25rem] border border-[#E6DCC8] bg-white p-1 md:rounded-[2rem] md:p-2">
                <Image src="/images/press-image-10.webp" alt={isEn ? 'Public professional profile' : 'معاينة الملف المهني للعميل'} width={760} height={1332} sizes="(max-width: 1023px) 46vw, 270px" className="h-auto w-full rounded-[1rem] object-contain md:rounded-[1.55rem]" />
              </div>
            </div>
          </div>
        </section>

        <section id="quotation" className="bg-[#0B3157] px-5 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm font-black uppercase tracking-[.12em] text-[#F1C75B]">{t.quotationEyebrow}</div>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">{t.quotationTitle}</h2>
              <p className="mt-5 text-base font-semibold leading-8 text-slate-200 md:text-lg">{t.quotationText}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.quotationItems.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-base font-bold"><FileText className="h-5 w-5 shrink-0 text-[#F1C75B]" />{item}</div>)}
              </div>
            </div>
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/20 bg-white p-2">
              <Image src="/images/press-image-11.webp" alt={t.quotationTitle} width={760} height={1423} sizes="(max-width: 767px) calc(100vw - 40px), 448px" className="h-auto w-full rounded-[1.55rem] object-contain" />
            </div>
          </div>
        </section>

        <section id="weyaak" className="px-5 py-16 md:px-8 md:py-24">
          <SectionHeading eyebrow={t.weyaakEyebrow} title={t.weyaakTitle} text={t.weyaakText} />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {t.weyaakSteps.map(([title, text], index) => <article key={title} className="rounded-[1.75rem] border border-[#E6DCC8] bg-white p-6 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F3F1A] text-lg font-black text-white">{index + 1}</div><h3 className="mt-4 text-xl font-black text-[#0F3F1A]">{title}</h3><p className="mt-2 text-base font-semibold leading-7 text-gray-600">{text}</p></article>)}
          </div>
          <WeyaakInterface ui={t.weyaakUi} isEn={isEn} />
        </section>

        <section className="bg-white px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2 items-start gap-2 md:gap-4">
              <div className="overflow-hidden rounded-[1.25rem] border border-[#E6DCC8] bg-[#FDFBF7] p-1 md:rounded-[2rem] md:p-2"><Image src="/images/press-image-06.webp" alt={isEn ? 'Biet Al Reef workspace and integrations' : 'مساحة عمل بيت الريف والتكاملات'} width={760} height={1406} sizes="(max-width: 1023px) 46vw, 270px" className="h-auto w-full rounded-[1rem] object-contain md:rounded-[1.55rem]" /></div>
              <div className="overflow-hidden rounded-[1.25rem] border border-[#E6DCC8] bg-[#FDFBF7] p-1 md:rounded-[2rem] md:p-2"><Image src="/images/press-image-13.webp" alt={isEn ? 'Biet Al Reef design workspace' : 'مساحة التصميم في بيت الريف'} width={760} height={1391} sizes="(max-width: 1023px) 46vw, 270px" className="h-auto w-full rounded-[1rem] object-contain md:rounded-[1.55rem]" /></div>
            </div>
            <div>
              <div className="text-sm font-black uppercase tracking-[.12em] text-[#A67C16]">{t.accessEyebrow}</div>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{t.accessTitle}</h2>
              <p className="mt-5 text-base font-semibold leading-8 text-gray-600 md:text-lg">{t.accessText}</p>
              <CheckList items={t.accessItems} />
              <PlatformAccessActions locale={isEn ? 'en' : 'ar'} className="mt-7" />
            </div>
          </div>
        </section>

        <section id="cloud" className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.4rem] border border-[#E6DCC8] bg-white p-6 shadow-xl shadow-[#8A6A00]/10 md:p-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <div className="text-sm font-black uppercase tracking-[.12em] text-[#A67C16]">{t.cloudEyebrow}</div>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{t.cloudTitle}</h2>
              <p className="mt-5 text-base font-semibold leading-8 text-gray-600 md:text-lg">{t.cloudText}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {t.cloudItems.map(([title, text], index) => {
                  const Icon = cloudIcons[index];
                  return <div key={title} className="rounded-2xl bg-[#F7F1E8] p-4"><Icon className="h-5 w-5 text-[#0F3F1A]" /><div className="mt-2 text-sm font-black text-[#0F3F1A]">{title}</div><div className="mt-1 text-xs font-semibold leading-5 text-gray-600">{text}</div></div>;
                })}
              </div>
              <a href={GOOGLE_PARTNER_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#1A73E8] px-6 py-3 text-base font-black text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#155FC0] focus:outline-none focus:ring-4 focus:ring-blue-200"><Cloud className="h-6 w-6 shrink-0" aria-hidden="true" /><span>{t.cloudCta}</span><ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" /></a>
            </div>
            <div className="flex min-h-64 items-center justify-center rounded-[2rem] bg-[#F6F9FF] p-8"><Image src="/images/google-cloud-business-solutions.svg" alt="Google Cloud" width={620} height={420} className="h-auto w-full max-w-md object-contain" /></div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-8 md:py-24">
          <SectionHeading eyebrow={t.howTitle} title={t.howSubtitle} text={t.howText} />
          <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.steps.map(([title, text], index) => <article key={title} className="rounded-[1.75rem] border border-[#E6DCC8] bg-[#FDFBF7] p-5"><div className="text-base font-black text-[#A67C16]">0{index + 1}</div><h3 className="mt-2 text-xl font-black text-[#0F3F1A]">{title}</h3><p className="mt-2 text-base font-semibold leading-7 text-gray-600">{text}</p></article>)}
          </div>
        </section>

        <section className="bg-[#F7F1E8] px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl text-center">
            <div className="text-sm font-black uppercase tracking-[.12em] text-[#A67C16]">{t.ctaEyebrow}</div>
            <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{t.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-gray-600 md:text-lg">{t.ctaText}</p>

            <div className="mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white p-1.5 md:p-2">
              <Image src="/images/press-image-04.webp" alt={t.ctaTitle} width={1200} height={1200} sizes="(max-width: 767px) calc(100vw - 40px), 768px" className="h-auto w-full rounded-[1.65rem] object-contain" />
            </div>

            <div className="mx-auto mt-7 max-w-4xl"><PlatformAccessActions locale={isEn ? 'en' : 'ar'} /></div>
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm font-bold text-[#42556A]">
              <a href={PROVIDERS_APP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#CBD5E1] bg-white px-3 py-1.5"><MonitorSmartphone className="mr-1 inline h-4 w-4" />{isEn ? 'Web app' : 'نسخة المتصفح'}</a>
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#CBD5E1] bg-white px-3 py-1.5">Google Play</a>
              <a href={MARKET_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#CBD5E1] bg-white px-3 py-1.5">{isEn ? 'Market' : 'السوق'}</a>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={isEn ? 'en' : 'ar'} />
    </div>
  );
}
