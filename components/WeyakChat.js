import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Globe2, Loader2, Mic, Send, Sparkles, X } from 'lucide-react';

const LANGUAGES = [
  { code: 'ar', label: 'العربية', english: 'Arabic', dir: 'rtl' },
  { code: 'en', label: 'English', english: 'English', dir: 'ltr' },
  { code: 'ur', label: 'اردو', english: 'Urdu', dir: 'rtl' },
  { code: 'hi', label: 'हिन्दी', english: 'Hindi', dir: 'ltr' },
  { code: 'fr', label: 'Français', english: 'French', dir: 'ltr' },
  { code: 'es', label: 'Español', english: 'Spanish', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe', english: 'Turkish', dir: 'ltr' },
  { code: 'fa', label: 'فارسی', english: 'Persian', dir: 'rtl' },
  { code: 'ru', label: 'Русский', english: 'Russian', dir: 'ltr' },
  { code: 'zh', label: '中文', english: 'Chinese', dir: 'ltr' },
];

const COPY = {
  ar: {
    title: 'وياك',
    subtitle: 'وكيلك الذكي من بيت الريف',
    online: 'متصل الآن',
    greeting: 'يا هلا والله! حيّاك الله في بيت الريف. أنا «وياك»، وكيلك الذكي في البناء والتصميم والخدمات. آمرني، كيف أقدر أساعدك اليوم؟',
    placeholder: 'اكتب طلبك هنا…',
    send: 'إرسال الرسالة',
    close: 'إغلاق المحادثة',
    language: 'اختيار لغة وياك',
    typing: 'وياك يكتب…',
    powered: 'مدعوم بالذكاء الاصطناعي من بيت الريف',
    voice: 'المحادثة الصوتية قريبًا',
    error: 'المعذرة، واجهت مشكلة تقنية بسيطة. جرّب إرسال سؤالك مرة ثانية.',
    empty: 'وصلت رسالتك، لكن لم أتمكن من تجهيز رد مناسب الآن.',
    quick: ['أحتاج مزود خدمة مناسب', 'أريد طلب عرض سعر', 'ساعدني أختار الخدمة'],
  },
  en: {
    title: 'Weyaak',
    subtitle: 'Your smart agent from Biet Al Reef',
    online: 'Online now',
    greeting: 'Welcome to Biet Al Reef. I am Weyaak, your smart agent for construction, design and services. How can I help with your project today?',
    placeholder: 'Type your request here…',
    send: 'Send message',
    close: 'Close conversation',
    language: 'Choose Weyaak language',
    typing: 'Weyaak is typing…',
    powered: 'AI powered by Biet Al Reef',
    voice: 'Voice conversation coming soon',
    error: 'Sorry, a temporary technical issue occurred. Please send your question again.',
    empty: 'I received your message, but could not prepare a suitable reply right now.',
    quick: ['Find a suitable provider', 'Request a quotation', 'Help me choose a service'],
  },
};

function getUiLocale(languageCode, fallbackLocale) {
  if (languageCode === 'ar') return 'ar';
  if (languageCode === 'en') return 'en';
  return fallbackLocale === 'ar' ? 'ar' : 'en';
}

export default function WeyakChat({ embedded = false, open = false, onClose, initialLocale = 'ar' }) {
  const fallbackLocale = initialLocale === 'en' ? 'en' : 'ar';
  const [mounted, setMounted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(fallbackLocale);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const languageMenuRef = useRef(null);

  const isOpen = embedded || open;
  const uiLocale = getUiLocale(selectedLanguage, fallbackLocale);
  const copy = COPY[uiLocale];
  const direction = uiLocale === 'ar' ? 'rtl' : 'ltr';
  const activeLanguage = LANGUAGES.find((item) => item.code === selectedLanguage) || LANGUAGES[0];

  useEffect(() => {
    setMounted(true);
    setMessages([{ role: 'assistant', content: COPY[fallbackLocale].greeting }]);
  }, [fallbackLocale]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!languageMenuOpen) return undefined;

    const closeMenu = (event) => {
      if (!languageMenuRef.current?.contains(event.target)) setLanguageMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeMenu);
    return () => document.removeEventListener('pointerdown', closeMenu);
  }, [languageMenuOpen]);

  useEffect(() => {
    if (embedded || !open || typeof document === 'undefined') return undefined;

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;
    const previousHtmlOverflow = html.style.overflow;

    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';
    html.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleEscape);

    const canAutoFocus = window.matchMedia?.('(pointer: fine)').matches;
    const focusTimer = canAutoFocus
      ? window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 120)
      : null;

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      html.style.overflow = previousHtmlOverflow;
      window.removeEventListener('keydown', handleEscape);
      if (focusTimer) window.clearTimeout(focusTimer);
    };
  }, [embedded, open, onClose]);

  const chooseLanguage = (language) => {
    setSelectedLanguage(language.code);
    setLanguageMenuOpen(false);

    if (language.code === 'ar' || language.code === 'en') {
      setMessages((previous) => {
        if (previous.length <= 1) return [{ role: 'assistant', content: COPY[language.code].greeting }];
        return previous;
      });
    }
  };

  const resizeInput = (element) => {
    element.style.height = '48px';
    element.style.height = `${Math.min(element.scrollHeight, 128)}px`;
  };

  const submitMessage = async (event, suggestedMessage) => {
    event?.preventDefault?.();
    const userMessage = (suggestedMessage || input).trim();
    if (!userMessage || isLoading) return;

    const languageInstruction = activeLanguage.english;
    setInput('');
    setMessages((previous) => [...previous, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    if (inputRef.current) inputRef.current.style.height = '48px';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          replyLanguage: languageInstruction,
          conversation: messages.slice(-10),
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: data.reply || data.message || copy.empty,
        },
      ]);
    } catch (error) {
      console.error('Weyaak chat error:', error);
      setMessages((previous) => [...previous, { role: 'assistant', content: copy.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const chatPanel = (
    <section
      className={
        embedded
          ? 'relative flex h-[620px] min-h-[520px] w-full flex-col overflow-hidden rounded-[1.6rem] border border-[#E6DCC8] bg-white shadow-xl sm:h-[680px] lg:h-[720px]'
          : 'relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-[min(760px,calc(100dvh-32px))] sm:max-w-[640px] sm:rounded-[2rem] md:h-[min(800px,calc(100dvh-48px))] md:max-w-[700px] lg:max-w-[760px]'
      }
      role="dialog"
      aria-modal={!embedded}
      aria-label={copy.title}
      dir={direction}
      onClick={(event) => event.stopPropagation()}
    >
      <header className="relative z-30 shrink-0 overflow-visible bg-gradient-to-l from-[#092A19] via-[#0F3F1A] to-[#174F2A] px-4 py-4 text-white sm:px-5 sm:py-5">
        <div className="pointer-events-none absolute -left-10 -top-16 h-36 w-36 rounded-full bg-[#D4AF37]/15 blur-2xl" />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white shadow-inner sm:h-14 sm:w-14">
              <Image src="/images/weyaak-new-logo.jpg" alt={copy.title} width={56} height={56} className="h-full w-full object-contain" />
              <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-lg font-black sm:text-xl">{copy.title}</h2>
                <span className="rounded-full border border-[#F6E29A]/30 bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-black text-[#F6E29A]">AI</span>
              </div>
              <p className="mt-0.5 truncate text-xs font-bold text-white/75 sm:text-sm">{copy.subtitle}</p>
              <p className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-emerald-200 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                {copy.online}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="relative" ref={languageMenuRef}>
              <button
                type="button"
                onClick={() => setLanguageMenuOpen((value) => !value)}
                className="flex h-11 items-center gap-1.5 rounded-2xl border border-white/12 bg-white/10 px-3 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#F6E29A]"
                aria-label={copy.language}
                title={copy.language}
                aria-expanded={languageMenuOpen}
              >
                <Globe2 className="h-5 w-5" aria-hidden="true" />
                <span className="hidden text-xs font-black sm:inline">{activeLanguage.label}</span>
                <ChevronDown className={`h-4 w-4 transition ${languageMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {languageMenuOpen ? (
                <div className={`absolute top-[calc(100%+10px)] z-50 w-56 overflow-hidden rounded-2xl border border-[#E6DCC8] bg-white p-2 text-[#1F3D2B] shadow-2xl ${direction === 'rtl' ? 'left-0' : 'right-0'}`}>
                  <div className="max-h-[min(380px,55dvh)] overflow-y-auto overscroll-contain">
                    {LANGUAGES.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => chooseLanguage(language)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold transition hover:bg-[#F6F1E8] ${selectedLanguage === language.code ? 'bg-[#F6F1E8] text-[#0F3F1A]' : 'text-gray-700'}`}
                        dir={language.dir}
                      >
                        <span>{language.label}</span>
                        {selectedLanguage === language.code ? <Check className="h-4 w-4 text-[#0F3F1A]" aria-hidden="true" /> : null}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {!embedded ? (
              <button
                type="button"
                onClick={() => onClose?.()}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#F6E29A]"
                aria-label={copy.close}
                title={copy.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col bg-[#F6F1E8]">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5 sm:py-5" aria-live="polite">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? (direction === 'rtl' ? 'justify-start' : 'justify-end') : (direction === 'rtl' ? 'justify-end' : 'justify-start')}`}>
              <div
                className={`max-w-[88%] whitespace-pre-wrap break-words px-4 py-3 text-[15px] font-semibold leading-7 shadow-sm sm:max-w-[82%] sm:text-base ${
                  message.role === 'user'
                    ? 'rounded-[1.35rem] rounded-bl-md bg-[#0F3F1A] text-white'
                    : 'rounded-[1.35rem] rounded-br-md border border-[#E8DECA] bg-white text-[#24372C]'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {messages.length === 1 ? (
            <div className="grid gap-2 pt-1 sm:grid-cols-3">
              {copy.quick.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={(event) => submitMessage(event, suggestion)}
                  className="rounded-2xl border border-[#DDD1BA] bg-white px-3 py-3 text-xs font-black leading-5 text-[#0F3F1A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#D4AF37] hover:shadow-md sm:text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          {isLoading ? (
            <div className={`flex ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-center gap-2 rounded-[1.35rem] rounded-br-md border border-[#E8DECA] bg-white px-4 py-3 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-[#0F3F1A]" aria-hidden="true" />
                <span className="text-xs font-bold text-gray-500 sm:text-sm">{copy.typing}</span>
              </div>
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </div>

        <footer className="shrink-0 border-t border-[#E5DCCA] bg-white px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:px-5 sm:pb-4 sm:pt-4">
          <form onSubmit={submitMessage} className="flex items-end gap-2 sm:gap-3">
            <div className="relative min-w-0 flex-1">
              <label htmlFor={`weyaak-message-${embedded ? 'embedded' : 'modal'}`} className="sr-only">{copy.placeholder}</label>
              <textarea
                ref={inputRef}
                id={`weyaak-message-${embedded ? 'embedded' : 'modal'}`}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  resizeInput(event.target);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    submitMessage(event);
                  }
                }}
                placeholder={copy.placeholder}
                className={`min-h-[48px] max-h-32 w-full resize-none rounded-2xl border border-[#DDD5C7] bg-[#FAF8F3] py-3 text-[16px] font-semibold leading-6 text-[#24372C] shadow-inner outline-none transition placeholder:text-gray-400 focus:border-[#0F3F1A] focus:ring-4 focus:ring-[#0F3F1A]/10 ${direction === 'rtl' ? 'pl-12 pr-4 text-right' : 'pl-4 pr-12 text-left'}`}
                rows={1}
                dir={direction}
                enterKeyHint="send"
              />
              <button
                type="button"
                className={`absolute bottom-1.5 flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-white hover:text-[#0F3F1A] ${direction === 'rtl' ? 'left-1.5' : 'right-1.5'}`}
                title={copy.voice}
                aria-label={copy.voice}
              >
                <Mic className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F3F1A] text-white shadow-lg shadow-[#0F3F1A]/20 transition hover:-translate-y-0.5 hover:bg-[#174F2A] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 sm:h-13 sm:w-13"
              aria-label={copy.send}
              title={copy.send}
            >
              <Send className={`h-5 w-5 ${direction === 'rtl' ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </form>

          <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-bold text-gray-400 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#B99420]" aria-hidden="true" />
            {copy.powered}
          </p>
        </footer>
      </div>
    </section>
  );

  if (embedded) return chatPanel;
  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#071B11]/70 p-0 backdrop-blur-sm sm:p-4 md:p-6"
      onClick={() => onClose?.()}
      role="presentation"
    >
      {chatPanel}
    </div>,
    document.body
  );
}
