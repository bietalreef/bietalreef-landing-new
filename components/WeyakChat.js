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
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [messageCount, setMessageCount] = useState(0);
  const [threadId, setThreadId] = useState(null); // Store Thread ID for context
  const MAX_MESSAGES = 20;

  // Settings State
  const [bgTheme, setBgTheme] = useState('green');

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= 60) {
            stopRecording();
            return 0;
          }
          return prev + 1;
        });
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleVoiceMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('السموحة منك، ما قدرت أوصل للميكروفون. تأكد من السماح بالوصول.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceMessage = async (audioBlob) => {
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: tempId,
      type: 'user',
      content: 'جاري معالجة الصوت...',
      timestamp: new Date(),
      isVoice: true,
    }]);
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');

      const transcribeRes = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!transcribeRes.ok) throw new Error('Transcription failed');

      const { text } = await transcribeRes.json();

      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, content: text, isVoice: false } : msg
      ));

      await sendMessageToAI(text);

    } catch (error) {
      console.error('Voice Error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, content: 'عذراً، لم أتمكن من سماعك بوضوح.', isVoice: false } : msg
      ));
      setIsTyping(false);
    }
  };

  const sendMessageToAI = async (text) => {
    if (messageCount >= MAX_MESSAGES) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'wayak',
        content: 'السموحة منك يا الغالي، وصلت للحد الأقصى من الرسائل في هذي الجلسة.',
        timestamp: new Date(),
      }]);
      setIsTyping(false);
      return;
    }

    setMessageCount(prev => prev + 1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          threadId: threadId, // Send existing Thread ID if available
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      // Update Thread ID from response
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'wayak',
        content: data.reply,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'wayak',
        content: 'واجهت مشكلة بسيطة، ممكن تعيد المحاولة؟',
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const text = inputText;
    setInputText('');
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    }]);
    
    setIsTyping(true);
    await sendMessageToAI(text);
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
      setMessageCount(0);
      setThreadId(null); // Reset Thread ID
    }
  };

  const bgThemes = {
    blue: { gradient: 'from-[#56CCF2] via-[#2F80ED] to-[#2D9CDB]', primary: '#56CCF2' },
    green: { gradient: 'from-[#1F3D2B] via-[#2AA676] to-[#1F3D2B]', primary: '#2AA676' },
    purple: { gradient: 'from-[#BB6BD9] via-[#9B51E0] to-[#6C5CE7]', primary: '#BB6BD9' },
    orange: { gradient: 'from-[#F2994A] via-[#F2C94C] to-[#EB5757]', primary: '#F2994A' },
    pink: { gradient: 'from-[#F093FB] via-[#F5576C] to-[#FD79A8]', primary: '#F093FB' },
    dark: { gradient: 'from-[#2C3E50] via-[#34495E] to-[#1F3D2B]', primary: '#2C3E50' }
  };

  const currentTheme = bgThemes[bgTheme];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#2AA676] to-[#1F3D2B] shadow-lg flex items-center justify-center cursor-pointer group overflow-hidden border-4 border-white"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75" />
            <div className="relative z-10 w-full h-full">
              <Image src="/weyaak-avatar.png" alt="Weyaak" layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="absolute top-1 right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-white z-20" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[400px] h-[100dvh] md:h-[600px] md:rounded-[32px] shadow-2xl overflow-hidden flex flex-col bg-gradient-to-br ${currentTheme.gradient}`}
            dir="rtl"
          >
            <div className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30 relative">
                  <Image src="/weyaak-avatar.png" alt="Weyaak" layout="fill" objectFit="cover" />
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
                <button onClick={handleDownloadChat} className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors hidden md:block">
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

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-black/20 backdrop-blur-md overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    <p className="text-white text-sm font-medium">اختر لون الخلفية:</p>
                    <div className="flex gap-2 flex-wrap">
                      {Object.keys(bgThemes).map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setBgTheme(theme)}
                          className={`w-8 h-8 rounded-full border-2 ${bgTheme === theme ? 'border-white scale-110' : 'border-transparent opacity-70'} transition-all`}
                          style={{ background: bgThemes[theme].primary }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] p-4 rounded-2xl shadow-sm backdrop-blur-md ${
                      msg.type === 'user'
                        ? 'bg-white/20 text-white rounded-tr-none border border-white/20'
                        : 'bg-white/90 text-gray-800 rounded-tl-none shadow-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
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
                    <motion.span className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.span className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.span className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="relative z-10 bg-white/10 backdrop-blur-xl border-t border-white/20 p-4 shrink-0 pb-8 md:pb-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 border border-white/20">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
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
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center mt-2 flex justify-between px-2">
                <p className="text-[10px] text-white/40">مدعوم بواسطة الذكاء الاصطناعي من بيت الريف</p>
                <p className="text-[10px] text-white/40">{messageCount}/{MAX_MESSAGES} رسالة</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
