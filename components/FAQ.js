/**
 * FAQ Component — مكون الأسئلة الشائعة الموحد
 */
export default function FAQ({ items = [], title = "أسئلة شائعة" }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">{title}</h2>
      <div className="space-y-6">
        {items.map(([question, answer], index) => (
          <div key={index} className="bg-white rounded-2xl border border-[#E6DCC8] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-primary mb-3">{question}</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
