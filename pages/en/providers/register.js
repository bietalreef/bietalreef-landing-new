import Link from 'next/link';
import EnglishLayout from '../../../components/EnglishLayout';

export default function EnglishProviderRegisterPage() {
  return (
    <EnglishLayout>
      <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <p className="text-[#B8922B] font-black mb-3">Provider app handoff</p>
        <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Provider access is handled in the Biet Al Reef app</h1>
        <p className="text-gray-600 leading-8 max-w-3xl mb-10">This public website does not include customer or provider login. Provider registration and access are handled only through the dedicated Biet Al Reef app.</p>
        <a href="https://app.bietalreef.ae" className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">Open Biet Al Reef app</a>
      </main>
    </EnglishLayout>
  );
}
