import Link from 'next/link';

/**
 * ClientRequestCard — بطاقة دعوة العميل لإرسال طلب (CTA)
 */
export default function ClientRequestCard({ title, desc, buttonText, href = "#weyaak-assistant" }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-[#0F3F1A] rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        
        <div className="relative z-10 flex-1 text-center md:text-right">
          <h2 className="text-2xl md:text-3xl font-black mb-4">{title}</h2>
          <p className="text-white/80 leading-relaxed max-w-2xl">{desc}</p>
        </div>
        
        <div className="relative z-10 flex-shrink-0">
          <Link 
            href={href}
            className="inline-block bg-[#D4AF37] hover:bg-[#B8962E] text-white font-black px-10 py-4 rounded-full transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
