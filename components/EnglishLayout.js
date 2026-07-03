import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  MapPinned,
  UsersRound,
  Wrench,
  ShoppingBag,
  Bot,
  BriefcaseBusiness,
  ShieldCheck,
  Mail,
  Phone,
} from 'lucide-react';

const navLinks = [
  ['/en', 'Home', Home],
  ['/en/uae', 'UAE Directory', MapPinned],
  ['/en/providers', 'Service Providers', UsersRound],
  ['/en/services', 'Services & Offers', Wrench],
  ['/en/marketplace', 'Products & Stores', ShoppingBag],
  ['/en/tools', 'Smart Tools', BriefcaseBusiness],
  ['/en/weyaak', 'Weyaak AI', Bot],
];

const footerGroups = [
  {
    title: 'Biet Al Reef',
    icon: Home,
    links: [
      ['/en/about', 'About Biet Al Reef'],
      ['/en/why-biet-alreef', 'Why Biet Al Reef'],
      ['/en/how-it-works', 'How it works'],
    ],
  },
  {
    title: 'Platform',
    icon: BriefcaseBusiness,
    links: [
      ['/en/uae', 'UAE Directory'],
      ['/en/providers', 'Service Providers'],
      ['/en/services', 'Services & Offers'],
      ['/en/marketplace', 'Products & Stores'],
      ['/en/tools', 'Smart Tools'],
      ['/en/weyaak', 'Weyaak AI'],
      ['/en/blog', 'Blog'],
    ],
  },
  {
    title: 'Support',
    icon: Phone,
    links: [
      ['/en/contact', 'Contact us'],
      ['/en/faq', 'FAQ'],
      ['https://wa.me/971567856001', 'WhatsApp support'],
    ],
  },
  {
    title: 'Legal',
    icon: ShieldCheck,
    links: [
      ['/en/privacy', 'Privacy Policy'],
      ['/en/terms', 'Terms & Conditions'],
      ['/en/legal', 'Legal information'],
    ],
  },
];

export default function EnglishLayout({ children }) {
  return (
    <div dir="rtl" lang="en" className="min-h-screen bg-[#FDFBF7] text-gray-900" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
      <header className="sticky top-0 z-50 border-b border-[#E6DCC8] bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/en" className="flex flex-shrink-0 items-center gap-2">
            <Image src="/logo.png" alt="Biet Al Reef" width={52} height={52} className="h-12 w-12 object-contain" priority />
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-black text-primary">Biet Al Reef</span>
              <span className="text-xs text-gray-500">Smart building platform</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-bold lg:flex">
            {navLinks.map(([href, label]) => (
              <Link key={href} href={href} className="whitespace-nowrap rounded px-3 py-2 text-gray-700 transition hover:text-primary">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E6DCC8] bg-white px-3 py-2 text-sm font-black text-primary shadow-sm" aria-label="Switch to Arabic">
              <span aria-hidden="true">🇦🇪</span>
              <span>AR</span>
            </Link>
            <div className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0F3F1A] px-3 py-2 text-sm font-black text-white shadow-sm" aria-label="English version">
              <span aria-hidden="true">🇺🇸</span>
              <span>EN</span>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="mt-16 border-t border-[#E6DCC8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <Image src="/logo.png" alt="Biet Al Reef" width={86} height={86} className="mx-auto h-20 w-20 object-contain" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-gray-600">
            A UAE-focused public information website for construction, maintenance, interior design, building materials, providers, cities, and service areas.
          </p>
          <div className="mt-5 flex justify-center gap-3 text-primary">
            <a href="https://wa.me/971567856001" aria-label="WhatsApp" className="rounded-full bg-primary/10 p-3 hover:bg-primary hover:text-white"><Phone className="h-5 w-5" /></a>
            <a href="mailto:info@bietalreef.ae" aria-label="Email" className="rounded-full bg-primary/10 p-3 hover:bg-primary hover:text-white"><Mail className="h-5 w-5" /></a>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 border-t border-[#E6DCC8] px-4 md:grid-cols-4">
          {footerGroups.map((group) => {
            const Icon = group.icon;
            return (
              <section key={group.title} className="border-b border-[#E6DCC8] py-6 md:border-b-0 md:border-l md:px-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {group.title}
                </h2>
                <div className="grid gap-3 text-sm font-semibold text-gray-600">
                  {group.links.map(([href, label]) => href.startsWith('http') ? (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[#B8922B]">{label}</a>
                  ) : (
                    <Link key={href} href={href} className="hover:text-[#B8922B]">{label}</Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="bg-[#0F3F1A] px-4 py-4 text-center text-sm font-bold text-white">
          All rights reserved © 2026 Biet Al Reef
        </div>
      </footer>
    </div>
  );
}
