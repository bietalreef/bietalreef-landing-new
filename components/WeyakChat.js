import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, X, MessageCircle, Loader2, ExternalLink, ShieldCheck } from 'lucide-react';

const QUICK_ACTIONS = [
  { label: 'أبحث عن مزود', message: 'أنا عميل وأبحث عن مزود خدمة مناسب.' },
  { label: 'طلب عرض سعر', message: 'أريد تقديم طلب عرض سعر.' },
  { label: 'أنا مزود خدمة', message: 'أنا مزود خدمة وأريد معرفة مميزات الاشتراك والانضمام.' },
  { label: 'خدمة العملاء', message: 'أريد التواصل مع خدمة عملاء بيت الريف.' },
];

export default function WeyakChat({ embedded = false }) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'يا هلا والله، حيّاك في بيت الريف. أنا «وياك»، وكيل المنصة لخدمة العملاء ومساعدة مزودي الخدمات. هل تبحث عن خدمة، أم تريد إضافة نشاطك إلى المنصة؟',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (rawMessage) => {
    const userMessage = String(rawMessage || '').trim();
    if (!userMessage || isLoading) return;

    const history = messages
      .slice(-12)
      .map(({ role, content }) => ({ role, content }))
      .filter((item) => item.content);

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history,
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: data.reply || data.message || 'وصلت رسالتك، لكن لم أتمكن من تجهيز رد مناسب الآن.',
        links: Array.isArray(data.links) ? data.links : [],
        requestNumber: data.request_number || null,
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'المعذرة، واجهت مشكلة تقنية بسيطة. تقدر تعيد المحاولة أو تتواصل مع خدمة العملاء على 0567856001.',
        links: [{ label: 'واتساب خدمة العملاء', href: 'https://wa.me/971567856001' }],
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const hasUserMessages = messages.some((message) => message.role === 'user');

  return (
    <>
      {!embedded && <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } bg-[#1B4D3E] text-white`}
        aria-label="فتح محادثة وياك"
        title="تحدث مع وياك"
      >
        <div className="relative" aria-hidden="true">
          <MessageCircle className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
        </div>
      </button>}

      <div
        className={`${embedded ? 'relative h-[620px] w-full' : 'fixed bottom-6 right-6 z-50 h-[640px] max-h-[82vh] w-[92vw] sm:w-[410px]'} bg-white rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden border border-gray-100 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
        }`}
        role="dialog"
        aria-label="وياك وكيل منصة بيت الريف"
      >
        <div className="bg-[#1B4D3E] p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative" aria-hidden="true">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border-2 border-white/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#1B4D3E] rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-lg">وياك</h3>
              <p className="text-xs text-green-100 opacity-90">وكيل خدمة العملاء ومزودي الخدمات</p>
            </div>
          </div>
          {!embedded && <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="إغلاق المحادثة"
            title="إغلاق المحادثة"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth" aria-live="polite">
          {!hasUserMessages && (
            <div className="rounded-2xl border border-[#DDE8E1] bg-[#F4F8F5] p-3">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#1B4D3E]">
                <ShieldCheck className="h-4 w-4" />
                اختر المسار المناسب وسأكمل معك خطوة بخطوة
              </div>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    disabled={isLoading}
                    onClick={() => void sendMessage(action.message)}
                    className="rounded-xl border border-[#D5E3D9] bg-white px-3 py-2.5 text-xs font-bold text-[#1B4D3E] transition hover:border-[#1B4D3E] hover:bg-[#F8FBF9] disabled:opacity-50"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={`${msg.role}-${idx}`}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#1B4D3E] text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {msg.requestNumber && (
                  <div className="mt-3 rounded-xl bg-[#F3F8F4] px-3 py-2 text-xs font-bold text-[#1B4D3E]">
                    رقم المتابعة: <span dir="ltr">{msg.requestNumber}</span>
                  </div>
                )}

                {Array.isArray(msg.links) && msg.links.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {msg.links.map((link) => {
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
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#1B4D3E]" aria-hidden="true" />
                <span className="text-xs text-gray-500">وياك يراجع بيانات المنصة...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
              <label htmlFor="weyaak-message" className="sr-only">اكتب رسالتك إلى وياك</label>
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
                placeholder="اكتب طلبك أو استفسارك..."
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E] resize-none text-right min-h-[50px] max-h-[120px] text-sm shadow-sm"
                rows={1}
                style={{ direction: 'rtl' }}
              />
              <button
                type="button"
                className="absolute left-2 bottom-2.5 p-1.5 text-gray-400 hover:text-[#1B4D3E] transition-colors"
                title="تسجيل صوتي (قريباً)"
                aria-label="تسجيل صوتي قريباً"
              >
                <Mic className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-[#1B4D3E] text-white rounded-xl hover:bg-[#143d31] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex-shrink-0"
              aria-label="إرسال الرسالة"
              title="إرسال الرسالة"
            >
              <Send className={`w-5 h-5 ${typeof document !== 'undefined' && document.dir === 'rtl' ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-gray-400">
            <ShieldCheck className="h-3 w-3" />
            لا يتم تسجيل الطلب إلا بعد تأكيدك ويحصل على رقم متابعة
          </div>
        </div>
      </div>
    </>
  );
}
