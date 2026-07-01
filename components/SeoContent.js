/**
 * SeoContent Component — مكون المحتوى النصي المعزز لمحركات البحث
 */
export default function SeoContent({ title, children, className = "" }) {
  return (
    <section className={`max-w-4xl mx-auto px-4 py-12 ${className}`}>
      {title && <h2 className="text-2xl font-black text-gray-900 mb-6">{title}</h2>}
      <div className="prose prose-emerald max-w-none text-gray-600 leading-8 text-sm md:text-base">
        {children}
      </div>
    </section>
  );
}
