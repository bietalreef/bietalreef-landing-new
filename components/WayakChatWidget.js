import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function WayakChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "السلام عليكم! 👋 أنا وياك، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample recommendations based on user input
  const getWayakResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Service recommendations
    if (
      lowerMessage.includes("بناء") ||
      lowerMessage.includes("مقاول") ||
      lowerMessage.includes("عمارة")
    ) {
      return {
        text: "أنت تبحث عن خدمات البناء! 🏗️ لدينا أفضل المقاولين المعتمدين في العين وأبوظبي. هل تريد:",
        suggestions: [
          { text: "مقاولات البناء", link: "/services/construction-contracting" },
          { text: "الاستشارات الهندسية", link: "/services/engineering-consultations" },
          { text: "إدارة المشاريع", link: "/services/project-management" },
        ],
      };
    }

    if (
      lowerMessage.includes("تصميم") ||
      lowerMessage.includes("ديكور") ||
      lowerMessage.includes("داخلي")
    ) {
      return {
        text: "أنت مهتم بالتصميم الداخلي! 🛋️ لدينا مصممين محترفين وخيارات ديكور متنوعة. اختر:",
        suggestions: [
          { text: "التصميم الداخلي", link: "/services/interior-design" },
          { text: "الأثاث والديكور", link: "/services/furniture-decor" },
          { text: "عرض المشاريع", link: "/services" },
        ],
      };
    }

    if (
      lowerMessage.includes("صيانة") ||
      lowerMessage.includes("تنظيف") ||
      lowerMessage.includes("صيانه")
    ) {
      return {
        text: "تحتاج إلى خدمات الصيانة! 🔧 لدينا فريق متخصص في الصيانة والتنظيف. اختر:",
        suggestions: [
          { text: "شركات الصيانة", link: "/services/maintenance-companies" },
          { text: "خدمات التنظيف", link: "/services/cleaning-services" },
          { text: "جميع الخدمات", link: "/services" },
        ],
      };
    }

    if (
      lowerMessage.includes("معدات") ||
      lowerMessage.includes("تأجير") ||
      lowerMessage.includes("ايجار")
    ) {
      return {
        text: "تبحث عن تأجير المعدات! 🏗️ لدينا أحدث المعدات والآليات. اختر:",
        suggestions: [
          { text: "تأجير المعدات", link: "/services/equipment-rental" },
          { text: "جميع الخدمات", link: "/services" },
          { text: "تواصل معنا", link: "#contact" },
        ],
      };
    }

    if (
      lowerMessage.includes("سعر") ||
      lowerMessage.includes("تكلفة") ||
      lowerMessage.includes("أسعار")
    ) {
      return {
        text: "تريد معرفة الأسعار؟ 💰 الأسعار تختلف حسب نوع الخدمة والمشروع. يمكنك:",
        suggestions: [
          { text: "استكشف الخدمات", link: "/services" },
          { text: "تواصل معنا للاستفسار", link: "#contact" },
          { text: "اطلب عرض سعر", link: "https://app.bietalreef.ae" },
        ],
      };
    }

    if (
      lowerMessage.includes("العين") ||
      lowerMessage.includes("ابوظبي") ||
      lowerMessage.includes("دبي")
    ) {
      return {
        text: "أنت في المكان الصحيح! 📍 لدينا خدمات متخصصة في جميع إمارات الدولة. اختر مدينتك:",
        suggestions: [
          { text: "خدمات العين", link: "/services/location/al-ain" },
          { text: "خدمات أبوظبي", link: "/services/location/abu-dhabi" },
          { text: "خدمات دبي", link: "/services/location/dubai" },
        ],
      };
    }

    // Default response
    return {
      text: "شكراً على سؤالك! 😊 يمكنك استكشاف خدماتنا أو اختيار من الخيارات أدناه:",
      suggestions: [
        { text: "جميع الخدمات", link: "/services" },
        { text: "عن المنصة", link: "#about" },
        { text: "ابدأ الآن", link: "https://app.bietalreef.ae" },
      ],
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getWayakResponse(inputValue);
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: response.text,
        suggestions: response.suggestions,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleSuggestionClick = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else if (link.startsWith("#")) {
      // Handle hash links
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Internal links will be handled by Next.js Link component
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110"
        aria-label="فتح محادثة وياك"
        title="وياك - مساعدك الذكي"
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[80vh] animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">وياك 🤖</h3>
              <p className="text-xs text-green-100">متصل الآن</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
              aria-label="إغلاق المحادثة"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-gray-200 text-gray-900"
                      : "bg-gradient-to-r from-primary to-primary-dark text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <Link key={idx} href={suggestion.link}>
                          <button
                            onClick={() => handleSuggestionClick(suggestion.link)}
                            className={`w-full text-left px-3 py-2 rounded text-xs font-semibold transition ${
                              message.type === "user"
                                ? "bg-gray-300 hover:bg-gray-400 text-gray-900"
                                : "bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                            }`}
                          >
                            {suggestion.text}
                          </button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-4 bg-white rounded-b-2xl"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="اكتب رسالتك..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="إرسال الرسالة"
              >
                ➤
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
