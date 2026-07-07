import EnglishGenericPage from '../../components/EnglishGenericPage';

export default function WhyBietAlReefEnglishPage() {
  return (
    <EnglishGenericPage
      title="Why Biet Al Reef"
      description="Biet Al Reef builds an organized journey for project owners in the UAE, starting with the need, then the location and service, before reaching the right provider path."
      path="/en/why-biet-alreef"
      ctaHref="/en/uae"
      ctaLabel="Start from UAE Directory"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2rem] border border-[#E6DCC8] bg-white p-7 shadow-sm md:p-10">
          <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Why this page exists</h2>
          <p className="mt-5 text-base leading-9 text-gray-600">
            This page explains why Biet Al Reef exists as a specialized platform for construction, maintenance and finishing, and why we rely on clarity and structured connection instead of random search.
          </p>
        </article>
        <aside className="rounded-[2rem] border border-[#E6DCC8] bg-[#FFF8E5] p-7 shadow-sm md:p-8">
          <h2 className="text-xl font-black text-gray-900">Biet Al Reef rule</h2>
          <p className="mt-4 leading-8 text-gray-700">
            Content must stay clear for customers, indexable for search, and understandable for AI answer systems without exaggeration or unverified promises.
          </p>
        </aside>
      </div>

      <div className="mt-10 rounded-[2rem] bg-[#0F3F1A] p-7 text-white md:p-10">
        <h2 className="text-2xl font-black md:text-3xl">Suggested journey</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {['Understand your need', 'Choose the emirate or service', 'Ask Weyaak or send your request'].map((step, index) => (
            <div key={step} className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <span className="text-sm font-black text-[#D4AF37]">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-black">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </EnglishGenericPage>
  );
}
