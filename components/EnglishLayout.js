import Link from 'next/link';

const navLinks = [
  ['/en/services', 'Services'],
  ['/en/uae', 'UAE Areas'],
  ['/en/providers', 'Providers'],
  ['/en/marketplace', 'Marketplace'],
  ['/en/tools', 'Smart Tools'],
  ['/en/weyaak', 'Weyaak'],
  ['/en/sitemap', 'Sitemap']
];

export default function EnglishLayout({ children }) {
  return (
    <div dir="ltr" className="min-h-screen bg-[#FDFBF7] text-gray-900" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E6DCC8]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/en" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0F3F1A] text-white flex items-center justify-center font-black">BR</div>
            <div>
              <div className="font-black text-[#0F3F1A] leading-none">Biet Al Reef</div>
              <div className="text-[11px] text-gray-500 mt-1">UAE building services guide</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-4 text-sm font-bold text-gray-600">
            {navLinks.map(([href, label]) => (<Link key={href} href={href} className="hover:text-[#B8922B]">{label}</Link>))}
          </nav>
          <Link href="/" className="rounded-full bg-white border border-[#E6DCC8] text-[#0F3F1A] px-5 py-2.5 text-sm font-black">العربية</Link>
        </div>
      </header>
      {children}
      <footer className="mt-16 bg-[#0F3F1A] text-white/70">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white font-black text-xl mb-3">Biet Al Reef</h2>
            <p className="text-sm leading-7">A UAE-focused information website for construction, maintenance, interior design, materials, providers, cities, and service areas.</p>
          </div>
          <div>
            <h3 className="text-white font-black mb-3">Explore</h3>
            <div className="grid gap-2 text-sm">
              <Link href="/en/uae" className="hover:text-[#D4AF37]">UAE areas</Link>
              <Link href="/en/services" className="hover:text-[#D4AF37]">Service categories</Link>
              <Link href="/en/providers" className="hover:text-[#D4AF37]">Providers</Link>
              <Link href="/en/marketplace" className="hover:text-[#D4AF37]">Marketplace</Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-black mb-3">Resources</h3>
            <div className="grid gap-2 text-sm">
              <Link href="/en/tools" className="hover:text-[#D4AF37]">Smart tools</Link>
              <Link href="/en/weyaak" className="hover:text-[#D4AF37]">Weyaak</Link>
              <Link href="/en/platform" className="hover:text-[#D4AF37]">Platform</Link>
              <Link href="/en/sitemap" className="hover:text-[#D4AF37]">HTML sitemap</Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-black mb-3">Contact</h3>
            <div className="grid gap-2 text-sm">
              <a href="https://wa.me/971567856001" className="hover:text-[#D4AF37]">+971 567 856 001</a>
              <a href="mailto:info@bietalreef.ae" className="hover:text-[#D4AF37]">info@bietalreef.ae</a>
              <Link href="/en/legal" className="hover:text-[#D4AF37]">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
