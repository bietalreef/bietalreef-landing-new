export default function WeyaakHeroCard() {
  return (
    <div className="mt-7 rounded-[2rem] border border-[#E6DCC8] bg-white/90 p-5 text-right shadow-xl shadow-[#0F3F1A]/5 backdrop-blur biet-soft-pulse">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-[2rem] bg-[#FDFBF7] p-3 shadow-inner ring-1 ring-[#E6DCC8]">
          <img src="/images/weyaak-logo.svg" alt="Weyaak" className="h-24 w-24 object-contain" />
        </div>
        <div className="text-center sm:text-right">
          <p className="text-sm font-black text-[#6F5400]">Weyaak</p>
          <h2 className="mt-1 text-2xl font-black text-[#0F3F1A]">Smart assistant for every building step</h2>
          <p className="mt-2 text-sm leading-7 text-gray-600">Guides visitors to the right section inside Biet Al Reef.</p>
        </div>
      </div>
    </div>
  );
}
