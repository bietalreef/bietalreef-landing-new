import Link from 'next/link';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';

/**
 * SecondaryHeader — الهيدر الثانوي الموحد
 * يظهر أسفل الهيدر الرئيسي في الصفحات الداخلية.
 * يحتوي على زر الرجوع، العنوان، والـ Breadcrumb.
 */
export default function SecondaryHeader({ 
  title, 
  breadcrumbs = [], 
  backUrl 
}) {
  const router = useRouter();

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full bg-[#FDFBF7] border-b border-[#E6DCC8] py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Back Button & Title */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white border border-[#E6DCC8] flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-all shadow-sm"
              aria-label="رجوع"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-xl md:text-2xl font-black text-gray-900">
              {title}
            </h1>
          </div>

          {/* Breadcrumb Navigation */}
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
              <Link href="/" className="hover:text-primary transition">الرئيسية</Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ChevronLeft className="w-3 h-3 text-gray-300" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-600">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}

        </div>
      </div>
    </div>
  );
}
