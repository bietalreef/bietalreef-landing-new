import { useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Cookie,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export const CONSENT_KEY = 'bietalreef.privacy.v1';
export const DEVICE_KEY = 'bietalreef.analytics.device';
export const CONSENT_EVENT = 'bietalreef:consent-changed';

function randomId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export function analyticsConsent() {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') return stored;
    const parsed = stored ? JSON.parse(stored) : null;
    return parsed?.analytics === 'accepted' || parsed?.analytics === 'rejected'
      ? parsed.analytics
      : null;
  } catch {
    return null;
  }
}

function ensureAnonymousDeviceId() {
  try {
    const existing = window.localStorage.getItem(DEVICE_KEY);
    if (existing) return existing;
    const next = randomId();
    window.localStorage.setItem(DEVICE_KEY, next);
    return next;
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    const record = {
      analytics: value,
      version: 1,
      decidedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    if (value === 'accepted') ensureAnonymousDeviceId();
  } catch {
    // Browsers may block storage. The current page still respects the decision.
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

const copy = {
  ar: {
    bannerTitle: 'خيارات الخصوصية في بيت الريف',
    bannerText:
      'نستخدم التخزين الأساسي لتشغيل المنصة. وبموافقتك تساعدنا تحليلات أداء مجهولة في تحسين الصفحات، وتطوير وياك، ورفع جودة عرض مزودي الخدمة. لا نرسل الاسم أو الهاتف أو البريد أو نص محادثات وياك إلى التحليلات.',
    allow: 'السماح للكل',
    essentials: 'الأساسية فقط',
    preferences: 'التفضيلات',
    title: 'مركز تفضيلات الخصوصية',
    intro:
      'من أجل تزويدك بتجربة أفضل على منصة بيت الريف، نستخدم معلومات مجهولة عن تفاعلك مع صفحاتنا، مثل عدد مرات زيارة الصفحة، والوقت التقريبي فيها، ونوع الزر الذي تم الضغط عليه. تساعدنا هذه المعلومات على تحسين تصميم المنصة وأدائها، وتطوير وكيل وياك، وعرض خدمات مزودي الخدمة بطريقة أوضح.',
    control:
      'أنت صاحب القرار. يمكنك تشغيل تحليلات الأداء أو إيقافها، وسيستمر الموقع ووياك في العمل عند الرفض. ويمكنك العودة إلى هذه النافذة في أي وقت من زر الخصوصية الظاهر في الواجهة.',
    manage: 'إدارة تفضيلات الموافقة',
    always: 'نشط دائماً',
    optional: 'اختياري',
    unused: 'غير مستخدم',
    essentialTitle: 'ملفات الارتباط والتخزين الأساسي',
    essentialText:
      'هذه العناصر ضرورية لتشغيل الموقع بأمان، وتذكر اللغة، وقرار الخصوصية، وحالة الواجهة. لا يمكن إيقافها من داخل المنصة لأنها لا تستخدم للتحليلات أو الإعلانات ولا تخزن بيانات تعريف شخصية.',
    analyticsTitle: 'تحليلات الأداء: بيت الريف وVercel Speed Insights',
    analyticsText:
      'تسمح لنا بفهم استخدام الموقع بصورة مجمعة ومجهولة: مسار الصفحة دون معاملات الرابط، مدة الاستخدام، نوع الجهاز، مصدر الزيارة، المنطقة التقريبية، الزر المستخدم، ومشاهدات صفحات مزودي الخدمة. كما يقيس Vercel مؤشرات سرعة وتجربة الصفحات دون إنشاء ملف تعريفي للزائر. لا تشمل التحليلات بيانات النماذج أو محتوى محادثات وياك، ولا تعمل قبل موافقتك.',
    weyaakTitle: 'التخزين الوظيفي لوكيل وياك',
    weyaakText:
      'ضروري لعمل واجهة وياك وحماية الجلسة أثناء الاستخدام. لا ترسل أسئلة المستخدم أو إجابات وياك إلى جداول تحليلات السلوك، ولا نستخدمها لإنشاء ملف إعلاني للمستخدم.',
    externalTitle: 'أدوات الإعلانات والتتبع التسويقي',
    externalText:
      'لا تستخدم بيت الريف حالياً أدوات إعلانية أو ملفات تتبع تسويقية لبناء ملفات شخصية للزوار. عند إضافة أي جهة من هذا النوع مستقبلاً سنوضح اسمها والغرض منها ونطلب موافقة مستقلة قبل تشغيلها.',
    save: 'تأكيد اختياراتي',
    reject: 'رفض التحليلات',
    privacy: 'الخصوصية',
    close: 'إغلاق',
  },
  en: {
    bannerTitle: 'Privacy choices at Biet Alreef',
    bannerText:
      'We use essential storage to operate the platform. With your permission, anonymous performance analytics help us improve pages, Weyaak and provider services. Names, phone numbers, emails and Weyaak conversations are never sent to analytics.',
    allow: 'Allow all',
    essentials: 'Essential only',
    preferences: 'Preferences',
    title: 'Privacy preference center',
    intro:
      'To provide a better Biet Alreef experience, we use anonymous information about interactions with our pages, such as page visits, approximate time and clicked controls. This helps improve platform design and performance, Weyaak and the presentation of provider services.',
    control:
      'You stay in control. Performance analytics can be enabled or disabled, and the website and Weyaak continue to work when declined. Reopen this window at any time from the visible Privacy button.',
    manage: 'Manage consent preferences',
    always: 'Always active',
    optional: 'Optional',
    unused: 'Not used',
    essentialTitle: 'Essential cookies and local storage',
    essentialText:
      'Required to operate the website safely and remember language, privacy choice and interface state. They cannot be disabled inside the platform because they are not used for analytics or advertising and do not store personally identifying information.',
    analyticsTitle: 'Performance analytics: Biet Al Reef and Vercel Speed Insights',
    analyticsText:
      'Helps us understand website usage in aggregate and anonymously: page path without query parameters, duration, device type, visit source, approximate region, clicked control and provider page views. Vercel also measures page speed and experience metrics without building a visitor profile. Form data and Weyaak conversations are excluded, and analytics stays off until you consent.',
    weyaakTitle: 'Weyaak functional storage',
    weyaakText:
      'Required for the Weyaak interface and session safety. User questions and Weyaak answers are not sent to behavior analytics tables and are not used to build advertising profiles.',
    externalTitle: 'Advertising and marketing trackers',
    externalText:
      'Biet Al Reef does not currently use advertising or marketing trackers to build visitor profiles. If one is introduced, its name and purpose will be disclosed and separate consent requested before activation.',
    save: 'Confirm my choices',
    reject: 'Reject analytics',
    privacy: 'Privacy',
    close: 'Close',
  },
};

function Toggle({ enabled, isArabic, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={(event) => {
        event.stopPropagation();
        onChange();
      }}
      className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
        enabled ? 'border-[#C79E16] bg-[#E9B900]' : 'border-[#C7C7CC] bg-[#E5E5EA]'
      }`}
    >
      <span
        className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-all ${
          enabled ? (isArabic ? 'right-6' : 'left-6') : isArabic ? 'right-1' : 'left-1'
        }`}
      />
    </button>
  );
}

export default function PrivacyConsentCenter({ locale = 'ar' }) {
  const isArabic = locale !== 'en';
  const t = isArabic ? copy.ar : copy.en;
  const [choice, setChoice] = useState(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState(null);
  const [performance, setPerformance] = useState(false);

  useEffect(() => {
    const stored = analyticsConsent();
    setChoice(stored);
    setPerformance(stored === 'accepted');
    setReady(true);
  }, []);

  const confirm = (value) => {
    saveConsent(value);
    setChoice(value);
    setPerformance(value === 'accepted');
    setOpen(false);
  };

  const row = (key, title, status, body, control = null) => {
    const expanded = section === key;
    return (
      <div className="border-b border-[#D9D9D9] last:border-b-0">
        <div
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          onClick={() => setSection(expanded ? null : key)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setSection(expanded ? null : key);
            }
          }}
          className="flex cursor-pointer items-center gap-3 bg-white px-4 py-4 text-start md:px-5"
        >
          <span className="flex-1 text-[15px] font-bold leading-7 text-[#1B1B1B] md:text-[17px]">{title}</span>
          {control || (
            <span className={`whitespace-nowrap text-xs font-bold ${status === t.unused ? 'text-[#777]' : 'text-[#B28B00]'}`}>
              {status}
            </span>
          )}
          {expanded ? <ChevronUp size={18} className="text-[#234936]" /> : <ChevronDown size={18} className="text-[#234936]" />}
        </div>
        {expanded ? (
          <p className="border-t border-[#E2E2E2] bg-[#FCFCFC] px-5 py-4 text-sm font-medium leading-8 text-[#444] md:px-8">{body}</p>
        ) : null}
      </div>
    );
  };

  if (!ready) return null;

  return (
    <>
      {choice === null ? (
        <div
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-[#071C15]/95 px-4 py-4 text-white shadow-[0_-12px_40px_rgba(0,0,0,.24)] backdrop-blur-xl"
          dir={isArabic ? 'rtl' : 'ltr'}
          role="dialog"
          aria-label={t.bannerTitle}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <Cookie size={19} className="text-[#E4BD2F]" />
                {t.bannerTitle}
              </h2>
              <p className="mt-1.5 max-w-4xl text-sm font-medium leading-7 text-white/75">{t.bannerText}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => confirm('accepted')} className="rounded-sm bg-[#E2BC28] px-6 py-3 text-sm font-bold text-[#17251E]">
                {t.allow}
              </button>
              <button type="button" onClick={() => setOpen(true)} className="px-4 py-3 text-sm font-bold text-white underline underline-offset-4">
                {t.preferences}
              </button>
              <button type="button" onClick={() => confirm('rejected')} className="rounded-sm border border-white/30 px-4 py-3 text-sm font-bold text-white">
                {t.essentials}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {choice !== null ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 left-4 z-[90] flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-3.5 py-2.5 text-xs font-bold text-[#234936] shadow-lg backdrop-blur-xl"
        >
          <SlidersHorizontal size={15} />
          {t.privacy}
        </button>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 p-3 backdrop-blur-[2px]" dir={isArabic ? 'rtl' : 'ltr'}>
          <section
            className="max-h-[94vh] w-full max-w-[780px] overflow-y-auto rounded-[3px] bg-white shadow-[0_24px_90px_rgba(0,0,0,.32)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-title"
          >
            <div className="relative px-5 pb-5 pt-8 md:px-12 md:pb-7 md:pt-10">
              {choice !== null ? (
                <button type="button" onClick={() => setOpen(false)} className="absolute left-4 top-4 rounded-sm p-2 text-[#333] hover:bg-[#F2F2F2]" aria-label={t.close}>
                  <X size={21} />
                </button>
              ) : null}
              <div className="mx-auto max-w-2xl text-center">
                <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F6F0D9] text-[#9B7710]">
                  <ShieldCheck size={25} />
                </span>
                <h2 id="privacy-title" className="text-3xl font-bold leading-tight text-[#111] md:text-[38px]">{t.title}</h2>
                <p className="mt-5 text-sm font-medium leading-8 text-[#333] md:text-base">{t.intro}</p>
                <p className="mt-3 text-sm font-semibold leading-8 text-[#234936] md:text-base">{t.control}</p>
              </div>
              <h3 className="mb-4 mt-7 text-center text-xl font-bold text-[#111] md:text-2xl">{t.manage}</h3>
              <div className="overflow-hidden border border-[#CFCFCF]">
                {row('essential', t.essentialTitle, t.always, t.essentialText)}
                {row(
                  'analytics',
                  t.analyticsTitle,
                  t.optional,
                  t.analyticsText,
                  <Toggle enabled={performance} isArabic={isArabic} onChange={() => setPerformance((value) => !value)} />,
                )}
                {row('weyaak', t.weyaakTitle, t.always, t.weyaakText)}
                {row('external', t.externalTitle, t.unused, t.externalText)}
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-[#D8D8D8] bg-[#FAFAFA] px-5 py-5 sm:flex-row md:px-12">
              <button type="button" onClick={() => confirm(performance ? 'accepted' : 'rejected')} className="flex items-center justify-center gap-2 bg-[#E5B900] px-7 py-3.5 text-base font-bold text-[#20291F]">
                <Check size={19} />
                {t.save}
              </button>
              <button type="button" onClick={() => confirm('rejected')} className="border border-[#B8B8B8] bg-white px-6 py-3.5 text-sm font-bold text-[#333]">
                {t.reject}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
