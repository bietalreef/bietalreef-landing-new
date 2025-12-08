import { X, Download, Mic, Send, Volume2, Settings, Sparkles, Trash2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'wayak';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface WeyakChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function WeyakChat({ isOpen, onClose, onOpen }: WeyakChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'wayak',
      content: 'يا هلا والله! حيّاك الله في بيت الريف. شو الخطة اليوم؟',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Settings State
  const [temperature, setTemperature] = useState(0.7);
  const [responseLength, setResponseLength] = useState('medium');
  const [voiceGender, setVoiceGender] = useState('male');
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [autoPlayVoice, setAutoPlayVoice] = useState(false);
  const [bgTheme, setBgTheme] = useState('green');

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingDuration(0);
    }
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          threadId: threadId,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'wayak',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'wayak',
        content: 'عذراً يا شريكي، واجهت مشكلة بسيطة في الاتصال. ممكن تعيد المحاولة؟ 🙏',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate voice message
      const voiceMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: 'رسالة صوتية',
        timestamp: new Date(),
        isVoice: true,
      };
      setMessages(prev => [...prev, voiceMessage]);
      setIsTyping(true);
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'wayak',
          content: 'تم استلام رسالتك الصوتية. فالك طيب!',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 2000);
    } else {
      setIsRecording(true);
    }
  };

  const handleDownloadChat = () => {
    const chatContent = messages.map(m => 
      `[${m.timestamp.toLocaleTimeString('ar-EG')}] ${m.type === 'user' ? 'أنت' : 'وياك'}: ${m.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `محادثة-وياك-${new Date().toLocaleDateString('ar-EG')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    if (confirm('هل تريد حذف المحادثة؟')) {
      setMessages([{
        id: '1',
        type: 'wayak',
        content: 'يا هلا والله! حيّاك الله في بيت الريف. شو الخطة اليوم؟',
        timestamp: new Date(),
      }]);
    }
  };

  // Background Theme Colors
  const bgThemes = {
    blue: {
      gradient: 'from-[#56CCF2] via-[#2F80ED] to-[#2D9CDB]',
      primary: '#56CCF2',
      secondary: '#2F80ED'
    },
    green: {
      gradient: 'from-[#1F3D2B] via-[#2AA676] to-[#1F3D2B]',
      primary: '#2AA676',
      secondary: '#4A90E2'
    },
    purple: {
      gradient: 'from-[#BB6BD9] via-[#9B51E0] to-[#6C5CE7]',
      primary: '#BB6BD9',
      secondary: '#9B51E0'
    },
    orange: {
      gradient: 'from-[#F2994A] via-[#F2C94C] to-[#EB5757]',
      primary: '#F2994A',
      secondary: '#F2C94C'
    },
    pink: {
      gradient: 'from-[#F093FB] via-[#F5576C] to-[#FD79A8]',
      primary: '#F093FB',
      secondary: '#F5576C'
    },
    dark: {
      gradient: 'from-[#2C3E50] via-[#34495E] to-[#1F3D2B]',
      primary: '#2C3E50',
      secondary: '#34495E'
    }
  };

  const currentTheme = bgThemes[bgTheme as keyof typeof bgThemes];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#2AA676] to-[#4A90E2] shadow-lg flex items-center justify-center cursor-pointer group"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75" />
            <div className="relative z-10 group-hover:scale-110 transition-transform w-12 h-12 rounded-full overflow-hidden border-2 border-white/50">
              <img src="/images/weyak-icon.png" alt="Weyak" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 w-[400px] h-[600px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col bg-gradient-to-br ${currentTheme.gradient}`}
            dir="rtl"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: '10%', right: '10%' }}
              />
              <motion.div
                className="absolute w-96 h-96 bg-[#56CCF2]/10 rounded-full blur-3xl"
                animate={{
                  x: [0, -100, 0],
                  y: [0, 100, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                style={{ bottom: '10%', left: '10%' }}
              />
            </div>

            {/* Header */}
            <div className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center overflow-hidden">
                  <img src="/images/weyak-icon.png" alt="Weyak" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-bold">وياك</h3>
                  <p className="text-white/70 text-xs">متصل الآن</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)} className="text-white hover:bg-white/20 rounded-xl w-8 h-8">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDownloadChat} className="text-white hover:bg-white/20 rounded-xl w-8 h-8">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={clearChat} className="text-white hover:bg-white/20 rounded-xl w-8 h-8">
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 rounded-xl w-8 h-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-white/20 text-white rounded-tr-none backdrop-blur-sm'
                        : 'bg-white text-[#1F3D2B] rounded-tl-none shadow-lg'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <span className={`text-[10px] mt-1 block ${msg.type === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-lg flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              
              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {[
                    "كيف أبدأ مشروعي؟ 🏗️",
                    "كيف أكون مزود خدمة؟ 🤝",
                    "شو هي شروط البناء؟ 📋",
                    "أبحث عن استشاري هندسي 👷‍♂️"
                  ].map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setInputText(question);
                        // Optional: Auto-send or just fill input
                        // handleSendMessage(); 
                      }}
                      className="text-right bg-white/10 hover:bg-white/20 text-white text-sm py-2 px-4 rounded-xl transition-colors border border-white/10 backdrop-blur-sm"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Settings Overlay */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 z-20 bg-white/95 backdrop-blur-xl p-6 overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#1F3D2B]">الإعدادات</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Theme Selection */}
                  <div className="mb-6">
                    <label className="text-sm font-bold text-gray-700 mb-3 block">لون الخلفية</label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(bgThemes).map(([key, theme]) => (
                        <button
                          key={key}
                          onClick={() => setBgTheme(key)}
                          className={`h-12 rounded-xl bg-gradient-to-br ${theme.gradient} ${bgTheme === key ? 'ring-2 ring-offset-2 ring-[#2AA676]' : ''}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Voice Settings */}
                  <div className="mb-6">
                    <label className="text-sm font-bold text-gray-700 mb-3 block">الصوت</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setVoiceGender('male')}
                        className={`flex-1 p-3 rounded-xl border ${voiceGender === 'male' ? 'bg-[#2AA676] text-white border-transparent' : 'border-gray-200'}`}
                      >
                        👨 رجالي
                      </button>
                      <button
                        onClick={() => setVoiceGender('female')}
                        className={`flex-1 p-3 rounded-xl border ${voiceGender === 'female' ? 'bg-[#2AA676] text-white border-transparent' : 'border-gray-200'}`}
                      >
                        👩 نسائي
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="relative z-10 bg-white/10 backdrop-blur-xl border-t border-white/20 p-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleVoiceRecord}
                  className={`rounded-full w-12 h-12 shrink-0 transition-all duration-300 ${isRecording ? 'bg-red-500 text-white hover:bg-red-600 scale-110 animate-pulse' : 'bg-white/20 text-white hover:bg-white/30'}`}
                  title="تسجيل صوتي"
                >
                  <Mic className="w-6 h-6" />
                </Button>
                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="اكتب رسالتك..."
                    className="w-full bg-transparent border-none outline-none resize-none text-[#1F3D2B] placeholder:text-gray-400 min-h-[100px] max-h-40 py-3 text-lg"
                    rows={3}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className={`rounded-full w-12 h-12 shrink-0 ${inputText.trim() ? 'bg-[#2AA676] text-white hover:bg-[#2AA676]/90 shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  <Send className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
