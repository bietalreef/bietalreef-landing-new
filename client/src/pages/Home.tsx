import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WeyakChat } from '@/components/WeyakChat';
import { Sparkles, ArrowRight, Star, Building2, Users } from 'lucide-react';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col" dir="rtl">
      {/* Navbar Placeholder (from screenshot) */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="بيت الريف" className="h-10" onError={(e) => e.currentTarget.style.display = 'none'} />
            <div className="text-right">
              <h1 className="text-xl font-bold text-[#1F3D2B]">بيت الريف</h1>
              <p className="text-xs text-gray-500">منصة البناء الذكية</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
            <a href="#" className="text-[#1F3D2B]">الرئيسية</a>
            <a href="#" className="hover:text-[#1F3D2B]">خدماتنا</a>
            <a href="#" className="hover:text-[#1F3D2B]">المنصة</a>
            <a href="#" className="hover:text-[#1F3D2B]">من نحن</a>
            <a href="#" className="hover:text-[#1F3D2B]">المدونة</a>
            <a href="#" className="hover:text-[#1F3D2B]">المزيد</a>
          </nav>
        </div>
        <Button className="bg-[#1F3D2B] hover:bg-[#1F3D2B]/90 text-white rounded-full px-6">
          دخول المنصة
        </Button>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Weyak Section (Reconstructed from Screenshot) */}
        <div className="bg-[#F3F7F5] rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
              <img 
                src="/images/villa.jpg" 
                alt="Modern House" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                4/4
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 space-y-8 text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-gray-600">
              <img src="/images/weyak-icon.png" alt="Weyak" className="w-6 h-6 object-contain" />
              <span>وياك أفضل وكيل شخصي إماراتي</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1F3D2B] leading-tight">
                وياك — مساعدك الذكي
              </h2>
              <p className="text-xl text-[#2AA676] font-medium">
                أول مساعد شخصي صُمم ليفهم اختياراتك ويدعمك في كل خطوة
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                منصة بيت الريف تجمع بين التصميم المعماري، البناء، الصيانة، وإدارة المشاريع في مكان واحد.
                <br />
                وياك يساعدك في اتخاذ القرار الأفضل ويختار لك مزود الخدمة المناسب في العين وأبوظبي وباقي الإمارات.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-[#1F3D2B]">1000+</div>
                <div className="text-sm text-gray-500">مزود خدمة</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-[#1F3D2B]">5000+</div>
                <div className="text-sm text-gray-500">مشروع منجز</div>
              </div>
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-[#1F3D2B]">
                  <span>4.8</span>
                  <Star className="w-5 h-5 fill-[#2AA676] text-[#2AA676]" />
                </div>
                <div className="text-sm text-gray-500">تقييم المستخدمين</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg"
                onClick={() => setIsChatOpen(true)}
                className="bg-[#1F3D2B] hover:bg-[#1F3D2B]/90 text-white rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-xl transition-all flex-1 md:flex-none"
              >
                ابدأ الآن — وياك بيساعدك
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#1F3D2B] text-[#1F3D2B] hover:bg-[#1F3D2B]/5 rounded-full px-8 h-14 text-lg flex-1 md:flex-none"
              >
                اكتشف المنصة
              </Button>
              <Button 
                size="lg"
                variant="ghost"
                className="text-gray-600 hover:text-[#1F3D2B] hover:bg-transparent rounded-full px-6 h-14 text-lg"
              >
                تواصل معنا
              </Button>
            </div>
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
