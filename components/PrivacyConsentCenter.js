import { useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Cookie,
  ShieldCheck,
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
    bannerTitle: 'تجربة أفضل على بيت الريف',
    bannerText:
      'بموافقتك نستخدم بيانات استخدام مجهولة لفهم الصفحات والخدمات الأكثر فائدة وتحسين تجربة بيت الريف. لا نبيع بياناتك ولا نستخدمها لإنشاء حساب شخصي. ولتجربة أسرع، يمكنك تثبيت منصة بيت الريف على جهازك.',
    allow: 'موافق وتحسين التجربة',
    preferences: 'إدارة الخصوصية',
    title: 'مركز تفضيلات الخصوصية',
    intro:
      'من أجل تزويدك بتجربة أفضل على منصة بيت الريف، نستخدم معلومات مجهولة عن تفاعلك مع صفحاتنا، مثل عدد مرات زيارة الصفحة، والوقت التقريبي فيها، ونوع الزر الذي تم الضغط عليه. تساعدنا هذه المعلومات على تحسين تصميم المنصة وأدائها، وتطوير وكيل وياك، وعرض خدمات مزودي الخدمة بطريقة أوضح.',
    control:
      'أنت صاحب القرار. لن تبدأ بيانات تحسين التجربة قبل موافقتك، وستستمر المنصة ووياك في العمل بصورة طبيعية من دونها.',
    manage: 'إدارة تفضيلات الموافقة',
    always: 'نشط دائماً',
    optional: 'اختياري',
    unused: 'غير مستخدم',
    essentialTitle: 'ملفات الارتباط والتخزين الأساسي',
    essentialText:
      'هذه العناصر ضرورية لتشغيل الموقع بأمان، وتذكر اللغة، وقرار الخصوصية، وحالة الواجهة. لا يمكن إيقافها من داخل المنصة لأنها لا تستخدم للتحليلات أو الإعلانات ولا تخزن بيانات تعريف شخصية.',
    analyticsTitle: 'بيانات تحسين التجربة',
    analyticsText:
      'تسمح لنا بفهم استخدام المنصة بصورة مجمعة ومجهولة، مثل الصفحة المستخدمة والوقت التقريبي فيها ونوع الجهاز والزر المستخدم. لا تشمل بيانات النماذج أو محتوى محادثات وياك، ولا تعمل قبل موافقتك.',
    weyaakTitle: 'التخزين الوظيفي لوكيل وياك',
    weyaakText:
      'ضروري لعمل واجهة وياك وحماية الجلسة أثناء الاستخدام. لا ترسل أسئلة المستخدم أو إجابات وياك إلى جداول تحليلات السلوك، ولا نستخدمها لإنشاء ملف إعلاني للمستخدم.',
    externalTitle: 'أدوات الإعلانات والتتبع التسويقي',
    externalText:
      'تستخدم بيت الريف علامة Google لقياس أداء الصفحات والحملات والتحويلات بصورة مجمعة بعد موافقتك فقط. لا تعمل العلامة قبل الموافقة، ولا نرسل إليها محتوى النماذج أو محادثات وياك أو بيانات إنشاء الحساب.',
    save: 'موافق وتحسين التجربة',
    close: 'إغلاق',
  },
  en: {
    bannerTitle: 'A better Biet Al Reef experience',
    bannerText:
      'With your permission, we use anonymous usage data to understand which pages and services are most useful and improve the Biet Al Reef experience. We do not sell your data or use it to create a personal account. For a faster experience, you can install Biet Al Reef on your device.',
    allow: 'Allow and improve my experience',
    preferences: 'Manage privacy',
    title: 'Privacy preference center',
    intro:
      'To provide a better Biet Alreef experience, we use anonymous information about interactions with our pages, such as page visits, approximate time and clicked controls. This helps improve platform design and performance, Weyaak and the presentation of provider services.',
    control:
      'You stay in control. Experience data will not start before you consent, and the platform and Weyaak continue to work normally without it.',
    manage: 'Manage consent preferences',
    always: 'Always active',
    optional: 'Optional',
    unused: 'Not used',
    essentialTitle: 'Essential cookies and local storage',
    essentialText:
      'Required to operate the website safely and remember language, privacy choice and interface state. They cannot be disabled inside the platform because they are not used for analytics or advertising and do not store personally identifying information.',
    analyticsTitle: 'Experience improvement data',
    analyticsText:
      'Helps us understand platform usage in aggregate and anonymously, such as the page used, approximate time, device type and clicked control. Form data and Weyaak conversations are excluded, and this data stays off until you consent.',
    weyaakTitle: 'Weyaak functional storage',
    weyaakText:
      'Required for the Weyaak interface and session safety. User questions and Weyaak answers are not sent to behavior analytics tables and are not used to build advertising profiles.',
    externalTitle: 'Advertising and marketing trackers',
    externalText:
      'Biet Al Reef uses the Google tag to measure aggregate page, campaign and conversion performance only after you consent. The tag stays off before consent, and form content, Weyaak conversations and account-creation data are not sent to it.',
    save: 'Allow and improve my experience',
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
    setChoice(stored === 'accepted' ? 'accepted' : null);
    setPerformance(stored === 'accepted');
    setReady(true);
  }, []);

  const confirm = () => {
    saveConsent('accepted');
    setChoice('accepted');
    setPerformance(true);
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
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-[#E1D5BD] bg-[#FFF9ED]/97 px-4 py-4 text-[#183B34] shadow-[0_-12px_40px_rgba(31,52,46,.14)] backdrop-blur-xl"
          dir={isArabic ? 'rtl' : 'ltr'}
          role="dialog"
          aria-label={t.bannerTitle}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <Cookie size={19} className="text-[#B68B1E]" />
                {t.bannerTitle}
              </h2>
              <p className="mt-1.5 max-w-4xl text-sm font-medium leading-7 text-[#4F625D]">{t.bannerText}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={confirm} className="rounded-2xl bg-[#0F4C4A] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#17615E]">
                {t.allow}
              </button>
              <button type="button" onClick={() => setOpen(true)} className="rounded-2xl border border-[#D8C59F] bg-white px-4 py-3 text-sm font-bold text-[#183B34] transition hover:border-[#C5A552] hover:bg-[#FFFCF5]">
                {t.preferences}
              </button>
            </div>
          </div>
        </div>
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
              <button type="button" onClick={() => setOpen(false)} className="absolute left-4 top-4 rounded-full border border-[#E6DCC8] bg-white p-2 text-[#333] hover:bg-[#FFF9ED]" aria-label={t.close}>
                <X size={21} />
              </button>
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
                {row('external', t.externalTitle, t.optional, t.externalText)}
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-[#D8D8D8] bg-[#FAFAFA] px-5 py-5 sm:flex-row md:px-12">
              <button type="button" disabled={!performance} onClick={confirm} className="flex items-center justify-center gap-2 rounded-2xl bg-[#0F4C4A] px-7 py-3.5 text-base font-bold text-white transition hover:bg-[#17615E] disabled:cursor-not-allowed disabled:bg-[#D7DDD9] disabled:text-[#78837F]">
                <Check size={19} />
                {t.save}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
