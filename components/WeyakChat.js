import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, X, MessageCircle, Loader2 } from 'lucide-react';

export default function WeyakChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'يا هلا والله! حيّاك الله في بيت الريف. أنا "وياك"، مستشارك الذكي المتخصص في البناء والتصميم. آمرني، كيف أقدر أساعدك اليوم في مشروعك؟'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'المعذرة، واجهت مشكلة تقنية بسيطة. ممكن تعيد سؤالك؟' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } bg-[#1B4D3E] text-white`}
        aria-label="Open Chat"
      >
        <div className="relative">
          {/* Fallback icon if image fails */}
          <MessageCircle className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden border border-gray-100 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#1B4D3E] p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border-2 border-white/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#1B4D3E] rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg">وياك</h3>
              <p className="text-xs text-green-100 opacity-90">مستشارك الذكي من بيت الريف</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#1B4D3E] text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#1B4D3E]" />
                <span className="text-xs text-gray-500">جاري الكتابة...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="اكتب استفسارك هنا..."
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/20 focus:border-[#1B4D3E] resize-none text-right min-h-[50px] max-h-[120px] text-sm shadow-sm"
                rows={1}
                style={{ direction: 'rtl' }}
              />
              <button
                type="button"
                className="absolute left-2 bottom-2.5 p-1.5 text-gray-400 hover:text-[#1B4D3E] transition-colors"
                title="تسجيل صوتي (قريباً)"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-[#1B4D3E] text-white rounded-xl hover:bg-[#143d31] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex-shrink-0"
            >
              <Send className={`w-5 h-5 ${document.dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400">
              مدعوم بالذكاء الاصطناعي من بيت الريف
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
