import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WeyakChat } from '@/components/WeyakChat';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2AA676]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A90E2]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2AA676]/10 text-[#2AA676] font-bold text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>المنصة الذكية الأولى في الإمارات</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#1F3D2B] leading-tight">
            بيت الريف
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2AA676] to-[#4A90E2]">
              مستقبل البناء الذكي
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            منصة متكاملة تجمع بين الذكاء الاصطناعي والخبرة الهندسية لتسهيل رحلة البناء والتصميم.
            اكتشف أدواتنا الذكية وتواصل مع أفضل الخبراء.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="h-14 px-8 rounded-full text-lg bg-[#1F3D2B] hover:bg-[#1F3D2B]/90 shadow-lg hover:shadow-xl transition-all"
            >
              ابدأ رحلتك الآن
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setIsChatOpen(true)}
              className="h-14 px-8 rounded-full text-lg border-2 border-[#2AA676] text-[#2AA676] hover:bg-[#2AA676]/5 shadow-lg hover:shadow-xl transition-all group"
            >
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              تواصل مع وياك
            </Button>
          </div>
        </div>
      </main>

      {/* Weyak Chat Component */}
      <WeyakChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onOpen={() => setIsChatOpen(true)}
      />
    </div>
  );
}
