import { useState } from 'react';
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
} from 'lucide-react';

const primaryLinks = [
  ['/en', 'Home', Home],
  ['/en/uae', 'UAE Directory', MapPinned],
  ['/en/providers', 'Service Providers', UsersRound],
  ['/en/services', 'Services & Offers', Wrench],
  ['/en/marketplace', 'Products & Stores', ShoppingBag],
];

const platformLinks = [
  ['/en/weyaak', 'Weyaak AI', Bot],
  ['/en/tools', 'Smart Tools', BriefcaseBusiness],
];

const companyLinks = [
  ['/en/about', 'About Biet Al Reef', Building2],
  ['/en/why-biet-alreef', 'Why Biet Al Reef', Building2],
  ['/en/how-it-works', 'How it works', Building2],
];

const navLinks = [...primaryLinks, ...platformLinks];

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
      ['/en/providers/register', 'Register as provider'],
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

function DrawerLink({ href, label, icon: Icon, onClick, nested = false }) {
  return (
    <Link href={href} onClick={onClick} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-semibold text-gray-800 transition hover:bg-primary/5 hover:text-primary ${nested ? 'mr-8' : ''}`}>
      <Icon className="h-5 w-5 text-primary" />
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
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const toggleSection = (sectionId) => setOpenSection((current) => (current === sectionId ? null : sectionId));

  return (
    <div dir="rtl" lang="en" className="min-h-screen bg-[#FDFBF7] text-gray-900" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
      <style jsx global>{`
        .english-readable main :where(h1, h2, h3, h4, p, li) {
          direction: ltr;
          unicode-bidi: plaintext;
          text-align: left;
        }
        .english-readable main :where(span, a, button) {
          unicode-bidi: plaintext;
        }
        .english-readable main :where(.text-center) {
          text-align: left !important;
        }
        .english-footer-text,
        .english-footer-text :where(p, a, li, h2, span) {
          direction: ltr;
          unicode-bidi: plaintext;
          text-align: left;
        }
      `}</style>
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
            <Link href="/" className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border border-[#E6DCC8] bg-white px-3 py-2 text-xs font-black text-primary shadow-sm" aria-label="Switch to Arabic">
              <span>AR</span>
              <span aria-hidden="true">🇦🇪</span>
            </Link>
            <button type="button" onClick={() => setOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E6DCC8] bg-white text-primary shadow-sm lg:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden" dir="rtl">
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
          <aside className="absolute bottom-0 left-0 top-0 flex w-[88vw] max-w-[410px] flex-col rounded-r-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
              <Image src="/logo.png" alt="Biet Al Reef" width={72} height={72} className="h-16 w-16 object-contain" priority />
              <span className="h-10 w-10" />
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-1">
                {primaryLinks.map(([href, label, Icon]) => (
                  <DrawerLink key={href} href={href} label={label} icon={Icon} onClick={() => setOpen(false)} />
                ))}
              </div>
              <div className="mt-5 space-y-3">
                <DrawerSection title="Platform" icon={Rocket} open={platformOpen} onToggle={() => setPlatformOpen((value) => !value)}>
                  {platformLinks.map(([href, label, Icon]) => <DrawerLink key={href} href={href} label={label} icon={Icon} nested onClick={() => setOpen(false)} />)}
                </DrawerSection>
                <DrawerSection title="Biet Al Reef" icon={Building2} open={companyOpen} onToggle={() => setCompanyOpen((value) => !value)}>
                  {companyLinks.map(([href, label, Icon]) => <DrawerLink key={href} href={href} label={label} icon={Icon} nested onClick={() => setOpen(false)} />)}
                </DrawerSection>
              </div>
            </div>
            <div className="border-t border-gray-100 p-5 pb-[max(env(safe-area-inset-bottom),20px)]">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <span className="flex items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] px-4 py-3 text-sm font-black text-primary">EN</span>
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-2xl border border-[#E6DCC8] px-4 py-3 text-sm font-black text-primary">AR 🇦🇪</Link>
              </div>
              <Link href="/en/about" onClick={() => setOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-center text-base font-black text-white shadow-lg">
                Explore the platform
                <Rocket className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      )}

      <div className="english-readable">{children}</div>

      <footer className="mt-16 border-t border-[#E6DCC8] bg-white text-gray-900 md:mt-24" dir="rtl" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_repeat(5,1fr)]">
            <div className="text-center md:text-right english-footer-text">
              <Image src="/logo.png" alt="Biet Al Reef" width={110} height={110} className="mx-auto h-24 w-24 object-contain md:mx-0" />
              <p className="mx-auto mt-4 max-w-xs text-sm font-medium leading-7 text-gray-600 md:mx-0">
                The smart construction and maintenance platform in the UAE, connecting project owners with trusted providers for a professional experience.
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
