import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Home,
  MapPinned,
  UsersRound,
  Wrench,
  ShoppingBag,
  Bot,
  BriefcaseBusiness,
  ShieldCheck,
  Menu,
  X,
  Layers3,
  Handshake,
  Headphones,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Rocket,
  Building2,
  Search,
  ArrowRight,
} from 'lucide-react';
import { UAE_EMIRATES, SERVICE_CATEGORIES } from '../data/siteTaxonomy';
import { UAE_ATLAS_IMAGES } from '../data/uaeAtlasImages';

const primaryLinks = [
  { href: '/en', label: 'Home', icon: Home },
  { href: '/en/uae', label: 'UAE Directory', icon: MapPinned },
  { href: '/en/providers', label: 'Service Providers', icon: UsersRound },
  { href: '/en/services', label: 'Services & Offers', icon: Wrench },
  { href: '/en/marketplace', label: 'Products & Stores', icon: ShoppingBag },
];

const platformLinks = [
  { href: '/en/weyaak', label: 'Weyaak AI', icon: Bot },
  { href: '/en/tools', label: 'Tools', icon: BriefcaseBusiness },
];

const companyLinks = [
  { href: '/en/about', label: 'About Biet Al Reef', icon: Building2 },
  { href: '/en/why-biet-alreef', label: 'Why Biet Al Reef', icon: Building2 },
  { href: '/en/how-it-works', label: 'How it works', icon: Building2 },
];

const desktopLinks = [
  ...primaryLinks,
  { href: '/en/tools', label: 'Tools', icon: BriefcaseBusiness },
  { href: '/en/weyaak', label: 'Weyaak', icon: Bot },
  { href: '/en/about', label: 'About us', icon: Building2 },
  { href: '/en/contact', label: 'Contact us', icon: Building2 },
];

const socialLinks = [
  { href: 'https://wa.me/971567856001', label: 'WhatsApp', icon: MessageCircle },
  { href: 'https://www.instagram.com/bietalreef?igsh=Mzg0cDR4Y3YzbmJn', label: 'Instagram', icon: Instagram },
  { href: 'https://www.facebook.com/share/14fy6hGM7SJ/', label: 'Facebook', icon: Facebook },
  { href: 'https://youtube.com/@bietalreef?si=z78hlji5r9YheMGj', label: 'YouTube', icon: Youtube },
  { href: 'https://www.tiktok.com/@bietalreef0?_r=1&_t=ZS-97iuKMbktCn', label: 'TikTok', icon: 'tiktok' },
  { href: 'https://www.linkedin.com/in/bietalreef', label: 'LinkedIn', icon: Linkedin },
];

const footerGroups = [
  {
    id: 'biet-alreef',
    title: 'Biet Al Reef',
    icon: Home,
    links: [
      ['/en/about', 'About Biet Al Reef'],
      ['/en/why-biet-alreef', 'Why Biet Al Reef'],
      ['/en/how-it-works', 'How it works'],
    ],
  },
  {
    id: 'platform',
    title: 'Platform',
    icon: Layers3,
    links: [
      ['/en/uae', 'UAE Directory'],
      ['/en/providers', 'Service Providers'],
      ['/en/services', 'Services & Offers'],
      ['/en/marketplace', 'Products & Stores'],
      ['/en/pricing', 'Pricing'],
      ['/en/blog', 'Blog'],
    ],
  },
  {
    id: 'partners',
    title: 'Partners',
    icon: Handshake,
    links: [
      ['/en/partners', 'Become a partner'],
      ['/en/providers/register', 'Provider app access'],
      ['/en/suppliers', 'Suppliers'],
      ['/en/factories', 'Factories'],
    ],
  },
  {
    id: 'support',
    title: 'Support',
    icon: Headphones,
    links: [
      ['/en/contact', 'Contact us'],
      ['/en/faq', 'FAQ'],
      ['/en/support-policy', 'Support policy'],
      ['tel:+971567856001', 'Call us'],
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    icon: ShieldCheck,
    links: [
      ['/en/privacy', 'Privacy Policy'],
      ['/en/legal', 'Terms & Conditions'],
      ['/en/cookies', 'Cookie Policy'],
    ],
  },
];

const atlasImageBySlug = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item]));

const englishExperienceBySlug = {
  'abu-dhabi': 'Building, maintenance, design and material services in Abu Dhabi, Al Ain and the emirate areas.',
  dubai: 'Contracting, finishing, maintenance and design services across Dubai districts.',
  sharjah: 'Contractor, craftsman, building material and design services across Sharjah areas.',
  ajman: 'Building, maintenance, decor and construction material services across Ajman areas.',
  'ras-al-khaimah': 'Contracting, maintenance, material supply and decor services across Ras Al Khaimah.',
  fujairah: 'Building, maintenance, design and material services across Fujairah and the east coast.',
  'umm-al-quwain': 'Contractor, maintenance, material and furniture services across Umm Al Quwain areas.',
};

const englishDetailsBySlug = {
  'abu-dhabi': 'Start from Abu Dhabi to organize your request for contracting, finishing, interior design, maintenance and building materials, then move toward the right service path with Biet Al Reef.',
  dubai: 'Start from Dubai to define your project need, compare the right service categories and move toward a clear request for residential or commercial work.',
  sharjah: 'Use the Sharjah directory path to organize requests for contractors, craftsmen, materials, maintenance, decor and interior design in one clear flow.',
  ajman: 'For Ajman, begin with the service type, clarify the project details and let Biet Al Reef guide the next step without scattered messages.',
  'ras-al-khaimah': 'Start from Ras Al Khaimah to connect project needs with contracting, supply, decor, maintenance and finishing categories in a structured way.',
  fujairah: 'Use the Fujairah path to start requests for construction, maintenance, design, decor and building materials across the east coast.',
  'umm-al-quwain': 'For Umm Al Quwain, begin with a simple request path for contractors, maintenance, materials, furniture and project support.',
};

function isActivePath(pathname, href) {
  if (!href || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) return false;
  const cleanHref = href.split('?')[0];
  if (cleanHref === '/en') return pathname === '/en';
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 5.82c1.04.75 2.31 1.19 3.68 1.19v3.18c-1.34 0-2.6-.29-3.68-.82v5.87c0 3.58-2.9 6.48-6.48 6.48S3.64 18.82 3.64 15.24s2.9-6.48 6.48-6.48c.4 0 .79.04 1.17.11v3.33a3.14 3.14 0 1 0 2.14 2.98V2.28h3.17c.14 1.43.88 2.68 2 3.54Z" />
    </svg>
  );
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a href={href} aria-label={label} title={label} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark">
      {Icon === 'tiktok' ? <TikTokIcon className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
    </a>
  );
}

function EnglishUaeDirectoryPremium() {
  const [openSlug, setOpenSlug] = useState(null);
  const cards = UAE_EMIRATES.map((emirate) => ({
    ...emirate,
    atlasImage: atlasImageBySlug[emirate.slug]?.image,
    atlasThumb: atlasImageBySlug[emirate.slug]?.thumb,
    experience: englishExperienceBySlug[emirate.slug] || emirate.description,
    details: englishDetailsBySlug[emirate.slug] || englishExperienceBySlug[emirate.slug] || emirate.description,
  }));

  return (
    <main dir="ltr" className="bg-[#FDFBF7] text-left">
      <Head>
        <title>UAE Directory for Construction, Design and Maintenance | Biet Al Reef</title>
        <meta name="description" content="Biet Al Reef UAE Directory helps you start by emirate and service type for construction, maintenance, interior design, decor and building materials across the UAE." />
      </Head>

      <section className="relative isolate overflow-hidden bg-[#FDFBF7] px-4 pb-12 pt-5 text-gray-900 md:pb-16 md:pt-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#F3E6CD_0%,#FDFBF7_48%,#F7F1E8_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto overflow-hidden rounded-[2rem] border border-[#E6DCC8] bg-white/80 p-2 shadow-2xl shadow-[#8A6A00]/10 backdrop-blur md:rounded-[3rem] md:p-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.55rem] bg-[#071A2F] md:rounded-[2.35rem]">
              <Image src={UAE_ATLAS_IMAGES.heroDesktop} alt="Digital UAE directory map for Biet Al Reef services" fill priority className="object-contain object-center" sizes="(max-width: 1200px) 100vw, 1120px" />
            </div>
          </div>

          <div className="relative mx-auto -mt-5 max-w-4xl rounded-[2rem] border border-[#E6DCC8] bg-white/92 px-5 py-7 text-center shadow-2xl shadow-[#8A6A00]/10 backdrop-blur-xl md:-mt-8 md:rounded-[2.5rem] md:px-12 md:py-9">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-1 text-xs font-black text-[#8A6A00]"><MapPinned size={15} /> Start by location</span>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#0F3F1A] md:text-6xl">UAE Directory</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-8 text-gray-700 md:text-xl">Start your journey to discover services and opportunities across the Emirates.</p>
            <a href="#uae-emirates" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-black text-[#1F170D] shadow-lg shadow-[#D4AF37]/20 transition hover:-translate-y-0.5 hover:bg-[#E7C45A]">
              Discover now <ChevronDown size={18} className="animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      <section id="uae-emirates" className="scroll-mt-24 bg-[#FDFBF7] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0F3F1A]/8 px-4 py-1 text-xs font-black text-[#0F3F1A]"><Search size={14} /> Choose an emirate</span>
            <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-tight text-[#0F3F1A] md:text-4xl">Explore Biet Al Reef services by emirate</h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-600 leading-8">A location-first interface that helps you choose the emirate, define the service and move toward a clear request without confusion.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((emirate, index) => {
              const isOpen = openSlug === emirate.slug;
              return (
                <article key={emirate.slug} className="group overflow-hidden rounded-[2.15rem] border border-[#E4D6BA] bg-white/95 p-2 shadow-xl shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/70 hover:shadow-2xl">
                  <div className="relative overflow-hidden rounded-[1.65rem] border border-[#D4AF37]/30 bg-[#071A2F] p-1 shadow-inner">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
                      <Image src={emirate.atlasImage || emirate.atlasThumb} alt={`Biet Al Reef service directory image for ${emirate.nameEn}`} fill priority={index < 3} className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" />
                    </div>
                  </div>

                  <div className="px-3 pb-4 pt-4 md:px-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-baseline gap-2">
                        <span className="shrink-0 text-xs font-black text-[#B8922B]">Emirate</span>
                        <h3 className="truncate whitespace-nowrap text-[1.75rem] font-black leading-none text-[#0F3F1A] lg:text-3xl">{emirate.nameEn}</h3>
                      </div>
                      <Link href={`/en/uae/${emirate.slug}`} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0F3F1A] px-3.5 py-2.5 text-[11px] font-black text-white shadow-lg shadow-[#0F3F1A]/15 transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1F170D] sm:text-xs" aria-label={`Discover ${emirate.nameEn} services`}>
                        <Search size={15} /> Discover now <ArrowRight size={15} />
                      </Link>
                    </div>

                    <div className="mt-4 flex items-start gap-3 border-t border-[#F0E7D6] pt-3">
                      <p className={`flex-1 text-sm font-semibold leading-7 text-gray-600 transition-all duration-300 ${isOpen ? 'max-h-40' : 'max-h-7 overflow-hidden'}`}>{isOpen ? emirate.details : emirate.experience}</p>
                      <button type="button" onClick={() => setOpenSlug(isOpen ? null : emirate.slug)} className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E4D6BA] bg-[#FDFBF7] text-[#0F3F1A] shadow-sm transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1F170D]" aria-expanded={isOpen} aria-label={isOpen ? `Close ${emirate.nameEn} details` : `Open ${emirate.nameEn} details`}>
                        {isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FDFBF7] px-4 pb-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E6DCC8] bg-white/88 p-5 shadow-sm md:p-7">
          <h2 className="text-2xl font-black text-[#0F3F1A]">Popular services in the directory</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {SERVICE_CATEGORIES.slice(0, 10).map((service) => (
              <Link key={service.slug} href="/en/uae" className="rounded-full border border-[#E6DCC8] bg-[#FDFBF7] px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-primary hover:text-primary">{service.nameEn || service.nameAr}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FooterLink({ href, children }) {
  if (href?.startsWith('tel:') || href?.startsWith('mailto:') || href?.startsWith('http')) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block py-1.5 text-sm font-medium leading-7 text-gray-600 transition hover:text-primary">{children}</a>;
  }
  return <Link href={href} className="block py-1.5 text-sm font-medium leading-7 text-gray-600 transition hover:text-primary">{children}</Link>;
}

function FooterAccordionSection({ section, isOpen, onToggle }) {
  const Icon = section.icon;
  return (
    <nav aria-label={section.title} className="border-b border-[#E6DCC8] md:border-b-0">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between py-5 text-right md:pointer-events-none md:cursor-default md:py-0" aria-expanded={isOpen}>
        <h2 className="flex items-center gap-2 text-base font-black text-primary"><Icon className="h-5 w-5" />{section.title}</h2>
        <span className="text-primary md:hidden">{isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</span>
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} pb-5 pr-7 md:block md:pb-0 md:pr-0`}>
        <ul className="space-y-1">
          {section.links.map(([href, label]) => <li key={href}><FooterLink href={href}>{label}</FooterLink></li>)}
        </ul>
      </div>
    </nav>
  );
}

function DrawerLink({ href, label, icon: Icon, active, onClick, nested = false }) {
  return (
    <Link href={href} onClick={onClick} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-semibold transition ${active ? 'bg-primary/8 text-primary' : 'text-gray-800 hover:bg-primary/5 hover:text-primary'} ${nested ? 'mr-8' : ''}`}>
      <Icon className={`h-5 w-5 ${active ? 'text-primary' : 'text-primary/90'}`} />
      <span>{label}</span>
    </Link>
  );
}

function DrawerSection({ title, icon: Icon, open, onToggle, children }) {
  return (
    <div className="border-t border-gray-100 pt-3">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-right text-[15px] font-bold text-gray-800 hover:bg-primary/5" aria-expanded={open}>
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </button>
      {open && <div className="mt-1 space-y-1 pb-2">{children}</div>}
    </div>
  );
}

export default function EnglishLayout({ children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const toggleSection = (sectionId) => setOpenSection((current) => (current === sectionId ? null : sectionId));
  const closeMenu = () => setOpen(false);
  const isEnglishUaePage = router.pathname === '/en/uae' || router.asPath?.split('?')[0] === '/en/uae';

  return (
    <div dir="rtl" lang="en" className="min-h-screen bg-[#FDFBF7] text-gray-900" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
      <style jsx global>{`
        .english-readable main :where(h1, h2, h3, h4, p, li, span, a, button),
        .english-footer-text,
        .english-footer-text :where(p, a, li, h2, span) {
          unicode-bidi: plaintext;
        }
      `}</style>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5" dir="rtl">
          <Link href="/en" className="flex flex-shrink-0 items-center gap-2">
            <div className="relative h-11 w-11">
              <Image src="/logo.png" alt="Biet Al Reef" width={44} height={44} className="h-full w-full object-contain" priority />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-bold text-primary">Biet Al Reef</span>
              <span className="text-xs text-gray-500">Smart building platform</span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 text-sm md:flex">
            {desktopLinks.map((item) => (
              <Link key={item.href} href={item.href} className={`whitespace-nowrap rounded px-3 py-2 transition ${isActivePath(router.pathname, item.href) ? 'font-bold text-primary' : 'text-gray-700 hover:text-primary'}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/" className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-full border border-[#E6DCC8] bg-white px-3 py-1.5 text-xs font-black text-primary shadow-sm transition hover:border-primary" aria-label="Arabic version">
              <span>AR</span>
              <span aria-hidden="true">🇦🇪</span>
            </Link>
            <Link href="/en/platform" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark whitespace-nowrap" title="Learn about the Biet Al Reef platform">
              Learn about the platform
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/" className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#E6DCC8] bg-white px-2.5 text-[11px] font-black text-primary shadow-sm transition hover:border-primary" aria-label="Arabic version">
              <span>AR</span>
              <span aria-hidden="true">🇦🇪</span>
            </Link>
            <button type="button" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-primary shadow-sm" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[100] md:hidden" dir="rtl">
          <button type="button" aria-label="Close menu" onClick={closeMenu} className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
          <aside className="absolute bottom-0 left-0 top-0 flex w-[88vw] max-w-[410px] flex-col rounded-r-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <button type="button" onClick={closeMenu} className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
              <Image src="/logo.png" alt="Biet Al Reef" width={72} height={72} className="h-16 w-16 object-contain" priority />
              <span className="h-10 w-10" />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-1">
                {primaryLinks.map((item) => (
                  <DrawerLink key={item.href} {...item} active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <DrawerSection title="Platform" icon={Rocket} open={platformOpen} onToggle={() => setPlatformOpen((value) => !value)}>
                  {platformLinks.map((item) => (
                    <DrawerLink key={item.href} {...item} nested active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                  ))}
                </DrawerSection>

                <DrawerSection title="Biet Al Reef" icon={Building2} open={companyOpen} onToggle={() => setCompanyOpen((value) => !value)}>
                  {companyLinks.map((item) => (
                    <DrawerLink key={item.href} {...item} nested active={isActivePath(router.pathname, item.href)} onClick={closeMenu} />
                  ))}
                </DrawerSection>
              </div>
            </div>

            <div className="border-t border-gray-100 p-5 pb-[max(env(safe-area-inset-bottom),20px)]">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <span className="flex items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] px-4 py-3 text-sm font-black text-primary">EN</span>
                <Link href="/" onClick={closeMenu} className="flex items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] px-4 py-3 text-sm font-black text-primary">AR 🇦🇪</Link>
              </div>
              <Link href="/en/platform" onClick={closeMenu} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-center text-base font-black text-white shadow-lg">
                Learn about the platform
                <Rocket className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      )}

      {isEnglishUaePage ? <EnglishUaeDirectoryPremium /> : <div className="english-readable">{children}</div>}

      <footer className="mt-16 border-t border-[#E6DCC8] bg-white text-gray-900 md:mt-24" dir="rtl" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_repeat(5,1fr)]">
            <div className="text-center md:text-right english-footer-text">
              <Image src="/logo.png" alt="Biet Al Reef" width={110} height={110} className="mx-auto h-24 w-24 object-contain md:mx-0" />
              <p className="mx-auto mt-4 max-w-xs text-sm font-medium leading-7 text-gray-600 md:mx-0">
                The smart construction and maintenance platform in the UAE, connecting project owners with trusted providers for a reliable and professional experience.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start" dir="ltr">
                {socialLinks.map((item) => <SocialLink key={item.label} {...item} />)}
              </div>
            </div>
            <div className="md:contents english-footer-text">
              {footerGroups.map((section) => <FooterAccordionSection key={section.id} section={section} isOpen={openSection === section.id} onToggle={() => toggleSection(section.id)} />)}
            </div>
          </div>
        </div>
        <div className="bg-primary px-4 py-4 text-center text-sm font-semibold text-white">All rights reserved © 2026 Biet Al Reef</div>
      </footer>
    </div>
  );
}
