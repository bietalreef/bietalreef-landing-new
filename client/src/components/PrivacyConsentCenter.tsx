import { useEffect, useState } from 'react';
import { BarChart3, Check, ChevronDown, ChevronUp, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';

export const CONSENT_KEY = 'bietalreef.privacy.v1';
export const CONSENT_EVENT = 'bietalreef:consent-changed';

type ConsentValue = 'accepted' | 'rejected';

export function analyticsConsent(): ConsentValue | null {
  const value = localStorage.getItem(CONSENT_KEY);
  return value === 'accepted' || value === 'rejected' ? value : null;
}

function saveConsent(value: ConsentValue) {
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function PrivacyConsentCenter() {
  const ar = document.documentElement.lang !== 'en' && !navigator.language.toLowerCase().startsWith('en');
  const [choice, setChoice] = useState<ConsentValue | null>(() => analyticsConsent());
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<'essential' | 'analytics' | null>(null);
  const [performance, setPerformance] = useState(choice === 'accepted');

  useEffect(() => setPerformance(choice === 'accepted'), [choice]);

  const confirm = (value: ConsentValue) => {
    saveConsent(value);
    setChoice(value);
    setPerformance(value === 'accepted');
    setOpen(false);
  };

  return (
    <>
      {choice === null && (
        <div className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-5xl rounded-2xl border border-black/10 bg-[#122F22]/95 p-4 text-white shadow-2xl backdrop-blur-xl md:p-5" dir={ar ? 'rtl' : 'ltr'} role="dialog" aria-label={ar ? 'خيارات الخصوصية' : 'Privacy choices'}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#E0C35A] md:flex"><ShieldCheck size={23}/></span>
            <div className="flex-1">
              <h2 className="font-bold">{ar ? 'خصوصيتك تساعدنا على تحسين بيت الريف' : 'Your privacy helps us improve Biet Alreef'}</h2>
              <p className="mt-1 text-sm leading-7 text-white/75">
                {ar
                  ? 'بموافقتك نجمع أحداثاً مجهولة مثل الصفحة المستخدمة، الوقت التقريبي، والزر الذي تم الضغط عليه لنحسن المنصة ووياك. لا نرسل الاسم أو الهاتف أو البريد أو نص محادثات وياك إلى التحليلات. يمكنك الرفض وسيعمل الموقع بصورة طبيعية.'
                  : 'With your permission, we collect anonymous events such as the page used, approximate time and clicked button to improve the platform and Weyaak. Names, phone numbers, emails and Weyaak conversation text are never sent to analytics. You may decline and the website will still work.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => confirm('accepted')} className="rounded-xl bg-[#D7B637] px-4 py-2.5 text-sm font-bold text-[#162B20]">{ar ? 'السماح بالتحليلات' : 'Allow analytics'}</button>
              <button onClick={() => confirm('rejected')} className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-bold">{ar ? 'الاستمرار دون تحليلات' : 'Continue without analytics'}</button>
              <button onClick={() => setOpen(true)} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white/80 underline underline-offset-4">{ar ? 'إدارة التفضيلات' : 'Manage choices'}</button>
            </div>
          </div>
        </div>
      )}

      {choice !== null && (
        <button onClick={() => setOpen(true)} className="fixed bottom-4 left-4 z-[90] flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-xs font-bold text-[#244B36] shadow-lg backdrop-blur-xl" aria-label={ar ? 'تفضيلات الخصوصية' : 'Privacy preferences'}>
          <SlidersHorizontal size={15}/>{ar ? 'الخصوصية' : 'Privacy'}
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/35 p-3 backdrop-blur-sm md:items-center" onMouseDown={event => { if (event.target === event.currentTarget && choice !== null) setOpen(false); }}>
          <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[22px] bg-white p-5 shadow-2xl md:p-7" dir={ar ? 'rtl' : 'ltr'} role="dialog" aria-modal="true">
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="text-2xl font-bold text-[#173D29]">{ar ? 'مركز تفضيلات الخصوصية' : 'Privacy preference center'}</h2><p className="mt-2 text-sm leading-7 text-[#666]">{ar ? 'اختر ما يناسبك. يمكنك تغيير قرارك في أي وقت من زر الخصوصية الظاهر بالموقع.' : 'Choose what suits you. You can change your decision at any time using the visible Privacy button.'}</p></div>
              {choice !== null && <button onClick={() => setOpen(false)} className="rounded-xl border p-2 text-[#555]" aria-label={ar ? 'إغلاق' : 'Close'}><X size={18}/></button>}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
              <button onClick={() => setDetails(details === 'essential' ? null : 'essential')} className="flex w-full items-center gap-3 p-4 text-start">
                <ShieldCheck size={20} className="text-[#2F6F4E]"/><span className="flex-1 font-bold text-[#1D1D1F]">{ar ? 'التخزين الأساسي' : 'Essential storage'}</span><span className="rounded-full bg-[#EEF6F1] px-2.5 py-1 text-xs font-bold text-[#2F6F4E]">{ar ? 'نشط دائماً' : 'Always active'}</span>{details === 'essential' ? <ChevronUp size={17}/> : <ChevronDown size={17}/>}
              </button>
              {details === 'essential' && <p className="border-t bg-[#FAFAFB] p-4 text-sm leading-7 text-[#666]">{ar ? 'ضروري لتشغيل الواجهة بأمان وتذكر اللغة وقرار الخصوصية. لا يُستخدم لقياس السلوك أو الإعلانات.' : 'Required to operate the interface safely and remember language and privacy choices. It is not used for behavior measurement or advertising.'}</p>}

              <div role="button" tabIndex={0} onClick={() => setDetails(details === 'analytics' ? null : 'analytics')} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') setDetails(details === 'analytics' ? null : 'analytics'); }} className="flex w-full cursor-pointer items-center gap-3 border-t p-4 text-start">
                <BarChart3 size={20} className="text-[#B18D16]"/><span className="flex-1 font-bold text-[#1D1D1F]">{ar ? 'تحليلات الأداء المجهولة' : 'Anonymous performance analytics'}</span>
                <button role="switch" aria-checked={performance} onClick={event => { event.stopPropagation(); setPerformance(!performance); }} className={`relative h-7 w-12 rounded-full transition ${performance ? 'bg-[#2F6F4E]' : 'bg-[#D1D1D6]'}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${performance ? (ar ? 'right-6' : 'left-6') : (ar ? 'right-1' : 'left-1')}`}/></button>
                {details === 'analytics' ? <ChevronUp size={17}/> : <ChevronDown size={17}/>}
              </div>
              {details === 'analytics' && <div className="border-t bg-[#FAFAFB] p-4 text-sm leading-7 text-[#666]"><p>{ar ? 'تقيس بصورة مجهولة: مسار الصفحة دون معاملات الرابط، نوع الجهاز، مدة الصفحة، الزر المستخدم، مصدر الزيارة، وأحداث صفحات مزودي الخدمة.' : 'Anonymously measures: page path without query parameters, device type, page duration, clicked button, visit source and provider-page events.'}</p><p className="mt-2 font-semibold text-[#2F6F4E]">{ar ? 'لا تشمل محتوى وياك أو بيانات نماذج العملاء.' : 'Weyaak content and customer form data are excluded.'}</p></div>}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
              <button onClick={() => confirm(performance ? 'accepted' : 'rejected')} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2F6F4E] px-4 py-3 font-bold text-white"><Check size={18}/>{ar ? 'حفظ اختياري' : 'Save my choice'}</button>
              <button onClick={() => confirm('rejected')} className="rounded-xl border border-black/10 px-4 py-3 font-bold text-[#4A4A4A]">{ar ? 'رفض التحليلات' : 'Reject analytics'}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
