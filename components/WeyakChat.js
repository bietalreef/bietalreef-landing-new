import { X, Download, Mic, Send, Volume2, Settings, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export function WeyakChat({ isOpen, onClose, onOpen }) {
  const [messages, setMessages] = useState([
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
  const messagesEndRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  // Settings State
  const [bgTheme, setBgTheme] = useState('blue');

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

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
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
          history: messages.slice(-5), // Send last 5 messages for context
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'wayak',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'wayak',
        content: 'السموحة منك يا الغالي، واجهت مشكلة بسيطة في الاتصال. ممكن تعيد المحاولة؟ 🙏',
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
      const voiceMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: 'رسالة صوتية',
        timestamp: new Date(),
        isVoice: true,
      };
      setMessages(prev => [...prev, voiceMessage]);
      setIsTyping(true);
      setTimeout(() => {
        const aiMessage = {
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
      gradient: 'from-[#1F3D2B] via-[#2AA676] to-[#4A90E2]',
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

  const currentTheme = bgThemes[bgTheme];

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
            className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full bg-gradient-to-br from-[#2AA676] to-[#4A90E2] shadow-lg flex items-center justify-center cursor-pointer group overflow-hidden border-4 border-white"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75" />
            <div className="relative z-10 w-full h-full">
              <Image 
                src="/weyaak-avatar.png" 
                alt="Weyaak" 
                layout="fill" 
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-20" />
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
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30 relative">
                  <Image 
                    src="/weyaak-avatar.png" 
                    alt="Weyaak" 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">وياك</h3>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    متصل الآن
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setShowSettings(!showSettings)} className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button onClick={handleDownloadChat} className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button onClick={clearChat} className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
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
                    className={`max-w-[80%] p-4 rounded-2xl shadow-sm backdrop-blur-md ${
                      msg.type === 'user'
                        ? 'bg-white/20 text-white rounded-tr-none border border-white/20'
                        : 'bg-white/90 text-gray-800 rounded-tl-none shadow-md'
                    }`}
                  >
                    {msg.isVoice ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="h-1 bg-white/30 rounded-full w-24 overflow-hidden">
                            <motion.div
                              className="h-full bg-white"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 2, ease: "linear" }}
                            />
                          </div>
                          <span className="text-xs opacity-70 mt-1 block">0:02</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    )}
                    <span className={`text-[10px] mt-2 block ${msg.type === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/90 p-4 rounded-2xl rounded-tl-none shadow-md flex gap-1">
                    <motion.span
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="relative z-10 bg-white/10 backdrop-blur-xl border-t border-white/20 p-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 border border-white/20">
                <button
                  onClick={handleVoiceRecord}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isRecording 
                      ? 'bg-red-500 text-white scale-110 animate-pulse shadow-red-500/50 shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Mic className={`w-5 h-5 ${isRecording ? 'animate-bounce' : ''}`} />
                </button>
                
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isRecording ? `جاري التسجيل... ${formatDuration(recordingDuration)}` : "اكتب رسالتك هنا..."}
                  className="flex-1 bg-transparent border-none text-white placeholder-white/50 focus:ring-0 px-2 text-sm"
                  disabled={isRecording}
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() && !isRecording}
                  className="p-3 bg-white text-[#2AA676] rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <Send className="w-5 h-5 transform rotate-180" />
                </button>
              </div>
              <div className="text-center mt-2">
                <p className="text-[10px] text-white/40">مدعوم بواسطة الذكاء الاصطناعي من بيت الريف</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
