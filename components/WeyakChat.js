import React, { useEffect, useRef, useState } from 'react';
import {
  Send, Mic, X, MessageCircle, Loader2, ExternalLink, ShieldCheck,
  ClipboardCheck, ChevronLeft, AlertCircle,
} from 'lucide-react';
import { applyAnswerToWeyaakState } from '../lib/weyaakConversationState';

const AUDIENCE_ACTIONS = {
  ar: [
    { label: 'أنا مستخدم وأبحث عن خدمة', message: 'أنا مستخدم أو عميل وأبحث عن خدمة.' },
    { label: 'أنا مزود خدمة', message: 'أنا مزود خدمة وصاحب نشاط تجاري.' },
  ],
  en: [
    { label: 'I need a service', message: 'I am a customer looking for a service.' },
    { label: 'I am a provider', message: 'I am a service provider and business owner.' },
  ],
};

const CHAT_COPY = {
  ar: {
    greeting: 'يا مرحبا، أنا وياك. أرتب طلبك خطوة بخطوة، وأراجع التفاصيل معك قبل أي تسجيل. قل لي وين نبدأ؟',
    subtitle: 'وكيل خدمة العملاء ومزودي الخدمات',
    open: 'فتح محادثة وياك',
    close: 'إغلاق المحادثة',
    dialog: 'وياك وكيل منصة بيت الريف',
    context: 'سياق المحادثة',
    fallback: 'وصلت رسالتك، لكن ما قدرت أرتب الرد الآن.',
    error: 'المعذرة يا طويل العمر، ما قدرت أكمل مراجعة المعلومات الآن. جرّب مرة ثانية بعد لحظات.',
    loading: 'لحظة يا طويل العمر، أراجع لك بعض البيانات والمعلومات…',
    followUp: 'رقم المتابعة:',
    inputLabel: 'اكتب رسالتك إلى وياك',
    placeholder: 'اكتب طلبك أو استفسارك...',
    send: 'إرسال الرسالة',
    voice: 'تسجيل صوتي قريباً',
    privacy: 'لا يتم تسجيل البيانات إلا بعد مراجعتك وتأكيدك، ثم يصدر رقم متابعة',
  },
  en: {
    greeting: 'Hello, I’m Weyaak. I can help you find published providers and organise your request step by step. What do you need?',
    subtitle: 'Customer and service-provider assistant',
    open: 'Open Weyaak chat',
    close: 'Close chat',
    dialog: 'Weyaak, Biet Al Reef assistant',
    context: 'Conversation context',
    fallback: 'I received your message, but I could not organise the response right now.',
    error: 'Sorry, I could not finish checking the live information. Please try again in a moment.',
    loading: 'One moment while I check the live information…',
    followUp: 'Reference number:',
    inputLabel: 'Write your message to Weyaak',
    placeholder: 'Write your request or question...',
    send: 'Send message',
    voice: 'Voice input coming soon',
    privacy: 'Information is saved only after you review and confirm it, then a reference number is issued',
  },
};

function IntakeCard({ intake, disabled, onSubmitted }) {
  const [values, setValues] = useState(intake?.defaults || {});
  const [reviewing, setReviewing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setValues(intake?.defaults || {});
    setReviewing(false);
    setError('');
  }, [intake]);

  if (!intake || !Array.isArray(intake.fields)) return null;

  const missing = intake.fields.filter((field) => field.required && !String(values[field.name] || '').trim());
  const visibleReview = intake.fields.filter((field) => String(values[field.name] || '').trim());

  const updateValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const review = () => {
    if (missing.length) {
      setError(`أكمل الحقول المطلوبة: ${missing.map((field) => field.label).join('، ')}`);
      return;
    }
    setReviewing(true);
    setError('');
  };

  const confirmAndSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'submit_intake',
          confirmed: true,
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
          action: { type: intake.type, payload: values },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'submission_failed');
      onSubmitted(data);
    } catch (submissionError) {
      console.error('Weyaak intake submission error:', submissionError);
      setError('ما تم حفظ الطلب حتى الآن. حاول مرة ثانية بعد لحظات عشان يصدر رقم متابعة رسمي.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-[#D6E4DA] bg-[#F8FBF9]">
      <div className="flex items-center gap-2 border-b border-[#DCE8DF] bg-[#EDF5F0] px-3 py-3 text-xs font-black text-[#1B4D3E]">
        <ClipboardCheck className="h-4 w-4" />
        {intake.title}
      </div>

      {!reviewing ? (
        <div className="space-y-3 p-3">
          <p className="text-[11px] leading-6 text-gray-600">
            راجع البيانات براحتك. لا يتم الحفظ أو إرسالها لخدمة العملاء إلا بعد تأكيدك.
          </p>

          {intake.fields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-1.5 block text-[11px] font-bold text-gray-700">
                {field.label}{field.required ? ' *' : ''}
              </span>

              {field.type === 'textarea' ? (
                <textarea
                  value={values[field.name] || ''}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  placeholder={field.placeholder || ''}
                  rows={3}
                  disabled={disabled || submitting}
                  className="w-full resize-none rounded-xl border border-[#D7E2DA] bg-white px-3 py-2.5 text-base sm:text-xs leading-6 outline-none transition focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/10"
                />
              ) : field.type === 'select' ? (
                <select
                  value={values[field.name] || ''}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  disabled={disabled || submitting}
                  className="w-full rounded-xl border border-[#D7E2DA] bg-white px-3 py-2.5 text-base sm:text-xs outline-none transition focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/10"
                >
                  <option value="">اختر</option>
                  {(field.options || []).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={values[field.name] || ''}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  placeholder={field.placeholder || ''}
                  disabled={disabled || submitting}
                  className="w-full rounded-xl border border-[#D7E2DA] bg-white px-3 py-2.5 text-base sm:text-xs outline-none transition focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/10"
                />
              )}
            </label>
          ))}

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-[11px] font-bold leading-5 text-red-700">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={review}
            disabled={disabled || submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B4D3E] px-4 py-3 text-xs font-black text-white transition hover:bg-[#143D31] disabled:opacity-50"
          >
            {intake.submit_label || 'مراجعة الطلب'}
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="p-3">
          <p className="mb-3 text-[11px] font-black text-[#1B4D3E]">هذا ملخص البيانات قبل التسجيل</p>
          <div className="overflow-hidden rounded-xl border border-[#DCE6DF] bg-white">
            {visibleReview.map((field, index) => (
              <div
                key={field.name}
                className={`grid grid-cols-[105px_1fr] gap-2 px-3 py-2.5 text-[11px] ${index ? 'border-t border-[#EDF1EE]' : ''}`}
              >
                <span className="font-bold text-gray-500">{field.label}</span>
                <span className="break-words font-bold text-gray-800">{String(values[field.name])}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-[#FFF8E5] px-3 py-2 text-[10px] font-bold leading-5 text-[#745700]">
            بالضغط على «تأكيد وتسجيل» يُنشأ الطلب أولًا في Supabase ويصدر رقم متابعة. بعدها فقط يظهر واتساب خدمة العملاء برسالة جاهزة.
          </div>

          {error && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-[11px] font-bold leading-5 text-red-700">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setReviewing(false)}
              disabled={submitting}
              className="rounded-xl border border-[#D6E2D9] bg-white px-3 py-3 text-xs font-black text-[#1B4D3E] disabled:opacity-50"
            >
              تعديل البيانات
            </button>
            <button
              type="button"
              onClick={() => void confirmAndSubmit()}
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-3 py-3 text-xs font-black text-[#183622] disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              تأكيد وتسجيل
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WeyakChat({ embedded = false, standalone = false, locale = 'ar' }) {
  const [isOpen, setIsOpen] = useState(embedded || standalone);
  const [pageContext, setPageContext] = useState({});
  const isEnglish = locale === 'en' || pageContext.path?.startsWith('/en');
  const t = CHAT_COPY[isEnglish ? 'en' : 'ar'];
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: CHAT_COPY[locale === 'en' ? 'en' : 'ar'].greeting,
    },
  ]);
  const [sessionState, setSessionState] = useState({ audience: 'unknown', intent: 'general', payload: {} });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    setMessages((current) => current.some((message) => message.role === 'user')
      ? current
      : [{ role: 'assistant', content: CHAT_COPY[locale === 'en' ? 'en' : 'ar'].greeting }]);
  }, [locale]);

  useEffect(() => {
    if (standalone) setIsOpen(true);
    if (embedded || standalone) return undefined;
    const openChat = (event) => {
      const context = event?.detail && typeof event.detail === 'object' ? event.detail : {};
      setPageContext(context);
      setMessages((current) => {
        if (current.some((message) => message.role === 'user')) return current;
        const isEnglish = String(context.path || window.location.pathname).startsWith('/en');
        const subject = [context.service, context.area, context.emirate, context.provider, context.product].filter(Boolean).join(isEnglish ? ' in ' : ' في ');
        return [{ role: 'assistant', content: isEnglish ? `Hello, I’m Weyaak. I can see that you opened the chat from ${subject || context.sourceTitle || 'this section'}. Tell me what you need, and I’ll continue from this context.` : `يا مرحبا، أنا وياك. فتحت المحادثة من ${subject || context.sourceTitle || 'هذا القسم'}، وبكمل معك من نفس السياق. خبرني ما الذي تحتاجه؟` }];
      });
      setSessionState((current) => ({ ...current, payload: { ...current.payload, emirate: context.emirate || current.payload?.emirate || '', city: context.area || current.payload?.city || '', service_category: context.service || current.payload?.service_category || '' } }));
      setIsOpen(true);
    };
    window.addEventListener('weyaak:open', openChat);
    return () => window.removeEventListener('weyaak:open', openChat);
  }, [embedded, standalone]);

  const sendMessage = async (rawMessage) => {
    const userMessage = String(rawMessage || '').trim();
    if (!userMessage || isLoading) return;

    const history = messages
      .slice(-16)
      .map(({ role, content }) => ({ role, content }))
      .filter((item) => item.content);
    const preparedState = applyAnswerToWeyaakState(sessionState, userMessage);

    setInput('');
    setSessionState(preparedState);
    setMessages((current) => [...current, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history,
          state: preparedState,
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
          pageContext,
        }),
      });
      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      if (data.state) setSessionState(data.state);
      setMessages((current) => [...current, {
        role: 'assistant',
        content: data.reply || data.message || t.fallback,
        links: Array.isArray(data.links) ? data.links : [],
        requestNumber: data.request_number || null,
        intake: data.intake || null,
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((current) => [...current, {
        role: 'assistant',
        content: t.error,
        links: [],
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitted = (messageIndex, data) => {
    setMessages((current) => {
      const updated = current.map((message, index) => (
        index === messageIndex ? { ...message, intake: null } : message
      ));
      return [...updated, {
        role: 'assistant',
        content: data.reply,
        links: Array.isArray(data.links) ? data.links : [],
        requestNumber: data.request_number || null,
      }];
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const hasUserMessages = messages.some((message) => message.role === 'user');
  return (
    <>
      {!embedded && !standalone && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 rounded-full bg-[#1B4D3E] p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 ${
            isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
          aria-label={t.open}
          title={t.open}
        >
          <div className="relative" aria-hidden="true">
            <MessageCircle className="h-8 w-8" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
          </div>
        </button>
      )}

      <div
        className={`${standalone ? 'fixed inset-x-0 bottom-0 top-[70px] z-40 h-auto w-full !rounded-none touch-manipulation sm:inset-x-auto sm:bottom-4 sm:right-4 sm:top-[86px] sm:w-[min(520px,calc(100vw-2rem))] sm:!rounded-2xl' : embedded ? 'relative h-[660px] w-full' : 'fixed bottom-6 right-6 z-50 h-[680px] max-h-[84vh] w-[94vw] sm:w-[430px]'} flex origin-bottom-right transform flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-10 scale-95 opacity-0'
        }`}
        role="dialog"
        aria-label={t.dialog}
      >
        <div className="flex shrink-0 items-center justify-between bg-[#1B4D3E] p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="relative" aria-hidden="true">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white/10">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1B4D3E] bg-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">وياك</h3>
              <p className="text-xs text-green-100 opacity-90">{t.subtitle}</p>
            </div>
          </div>
          {!embedded && !standalone && (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 transition-colors hover:bg-white/10"
              aria-label={t.close}
              title={t.close}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 scroll-smooth" aria-live="polite">
          {pageContext.sourceTitle || pageContext.service || pageContext.area ? <div className="rounded-xl border border-[#D8E4DC] bg-white px-3 py-2 text-[11px] font-bold leading-5 text-[#1B4D3E]"><span className="block text-[10px] text-gray-500">{t.context}</span>{[pageContext.section, pageContext.emirate, pageContext.area, pageContext.service, pageContext.provider, pageContext.product].filter(Boolean).join(' · ') || pageContext.sourceTitle}</div> : null}
          {!hasUserMessages && (
            <div className="rounded-2xl border border-[#DDE8E1] bg-[#F4F8F5] p-3">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#1B4D3E]">
                <ShieldCheck className="h-4 w-4" />
                {isEnglish ? 'First, tell Weyaak which journey you need' : 'أولًا، حدد لوياك نوع رحلتك'}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {AUDIENCE_ACTIONS[isEnglish ? 'en' : 'ar'].map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    disabled={isLoading}
                    onClick={() => void sendMessage(action.message)}
                    className="rounded-xl border border-[#D5E3D9] bg-white px-3 py-2.5 text-base sm:text-xs font-bold text-[#1B4D3E] transition hover:border-[#1B4D3E] hover:bg-[#F8FBF9] disabled:opacity-50"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[92%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                message.role === 'user'
                  ? 'rounded-br-none bg-[#1B4D3E] text-white'
                  : 'rounded-bl-none border border-gray-100 bg-white text-gray-800'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>

                {message.requestNumber && (
                  <div className="mt-3 rounded-xl bg-[#F3F8F4] px-3 py-2 text-xs font-bold text-[#1B4D3E]">
                    {t.followUp} <span dir="ltr">{message.requestNumber}</span>
                  </div>
                )}

                {Array.isArray(message.links) && message.links.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {message.links.map((link) => {
                      const external = /^https?:\/\//i.test(link.href);
                      return (
                        <a
                          key={`${link.href}-${link.label}`}
                          href={link.href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center justify-between gap-2 rounded-xl border border-[#D9E5DC] bg-[#F7FAF8] px-3 py-2 text-xs font-bold text-[#1B4D3E] transition hover:border-[#1B4D3E] hover:bg-white"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                )}

                {message.role === 'assistant' && message.intake && (
                  <IntakeCard
                    intake={message.intake}
                    disabled={isLoading}
                    onSubmitted={(data) => handleSubmitted(index, data)}
                  />
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-none border border-gray-100 bg-white p-4 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-[#1B4D3E]" aria-hidden="true" />
                <span className="text-xs text-gray-500">{t.loading}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="shrink-0 border-t border-gray-100 bg-white p-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="relative flex-1">
              <label htmlFor="weyaak-message" className="sr-only">{t.inputLabel}</label>
              <textarea
                id="weyaak-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage(input);
                  }
                }}
                placeholder={t.placeholder}
                className={`min-h-[50px] max-h-[120px] w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-base shadow-sm outline-none focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/20 sm:text-sm ${isEnglish ? 'pr-10 text-left' : 'pl-10 text-right'}`}
                rows={1}
                style={{ direction: isEnglish ? 'ltr' : 'rtl' }}
              />
              <button
                type="button"
                className={`absolute bottom-2.5 p-1.5 text-gray-400 transition-colors hover:text-[#1B4D3E] ${isEnglish ? 'right-2' : 'left-2'}`}
                title={t.voice}
                aria-label={t.voice}
              >
                <Mic className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="shrink-0 rounded-xl bg-[#1B4D3E] p-3 text-white shadow-sm transition-all hover:bg-[#143D31] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={t.send}
              title={t.send}
            >
              <Send className="h-5 w-5 rotate-180" aria-hidden="true" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-gray-400">
            <ShieldCheck className="h-3 w-3" />
            {t.privacy}
          </div>
        </div>
      </div>
    </>
  );
}
