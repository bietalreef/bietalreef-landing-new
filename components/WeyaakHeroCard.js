import Image from 'next/image';

export default function WeyaakHeroCard() {
  const capabilities = [
    'يقارن لك الخيارات',
    'يرشدك للأفضل',
    'يوفر عليك الوقت',
    'يساعدك تختار الصح',
  ];

  return (
    <div className="mt-5 rounded-[2rem] border border-[#E6DCC8] bg-white/92 p-5 text-center shadow-xl shadow-[#0F3F1A]/5 backdrop-blur biet-soft-pulse">
      <div className="flex flex-col items-center gap-4">
        <p className="text-base font-black text-[#8A6A00] md:text-lg">منصة البناء الذكية</p>
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[2rem] bg-[#FDFBF7] p-2 shadow-inner ring-1 ring-[#E6DCC8]">
          <Image src="/images/weyaak-new-logo.jpg" alt="شعار وياك" width={96} height={96} sizes="96px" className="h-24 w-24 rounded-xl object-contain" />
        </div>
        <div className="w-full text-center">
          <p className="text-2xl font-black text-[#8A6A00]">وياك</p>
          <h2 className="mt-1 whitespace-nowrap text-[1.04rem] font-black leading-tight text-[#0F3F1A] min-[390px]:text-[1.14rem] sm:text-2xl md:text-3xl">وكيلك الذكي في كل خطوة بناء</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-gray-600">
            يرتب لك الطريق داخل بيت الريف، يقارن الخيارات، ويقربك من القرار الصحيح.
          </p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {capabilities.map((item) => (
          <div key={item} className="rounded-2xl border border-[#E6DCC8] bg-[#FDFBF7] px-3 py-3 text-center text-xs font-black text-[#0F3F1A]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
