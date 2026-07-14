const fs = require('fs');
const path = require('path');

let changedFiles = 0;

function writeWhenChanged(filePath, original, updated, message) {
  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    changedFiles += 1;
    console.log(message);
  }
}

const routeFile = path.join(process.cwd(), 'pages', '[slug].js');
const routeSource = fs.readFileSync(routeFile, 'utf8');

const replacement = `const RESERVED_ARABIC_ROUTES = new Set([
  'cookies',
  'privacy',
  'legal',
  'why-biet-alreef',
  'how-it-works',
  'pricing',
]);`;

const pattern = /const RESERVED_ARABIC_ROUTES = new Set\([\s\S]*?\);/;

if (!pattern.test(routeSource)) {
  throw new Error('Could not locate RESERVED_ARABIC_ROUTES in pages/[slug].js');
}

const updatedRouteSource = routeSource.replace(pattern, replacement);
writeWhenChanged(
  routeFile,
  routeSource,
  updatedRouteSource,
  'Excluded standalone Arabic routes from dynamic getStaticPaths.'
);

function migrateArkleenPublicRoute(filePath) {
  if (!fs.existsSync(filePath)) return;

  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;

  updated = updated
    .replace(/https:\/\/bietalreef\.ae\/en\/providers\/arkline/g, 'https://bietalreef.ae/en/providers/arkleen')
    .replace(/https:\/\/bietalreef\.ae\/providers\/arkline/g, 'https://bietalreef.ae/providers/arkleen')
    .replace(/href="\/en\/providers\/arkline"/g, 'href="/en/providers/arkleen"')
    .replace(/href="\/providers\/arkline"/g, 'href="/providers/arkleen"')
    .replace(/provider: 'arkline'/g, "provider: 'arkleen'")
    .replace(/provider=arkline/g, 'provider=arkleen');

  writeWhenChanged(
    filePath,
    original,
    updated,
    `Applied canonical ARKLEEN public route to ${path.relative(process.cwd(), filePath)}.`
  );
}

const arabicArkleenPageFile = path.join(process.cwd(), 'pages', 'providers', 'arkline.js');
const englishArkleenPageFile = path.join(process.cwd(), 'pages', 'en', 'providers', 'arkline.js');

migrateArkleenPublicRoute(arabicArkleenPageFile);
migrateArkleenPublicRoute(englishArkleenPageFile);

if (fs.existsSync(englishArkleenPageFile)) {
  const original = fs.readFileSync(englishArkleenPageFile, 'utf8');
  let updated = original.replace(/\bArkline\b/g, 'ARKLEEN');

  if (!updated.includes("website: 'https://www.arkleen.ae'")) {
    updated = updated.replace(
      "  whatsapp: '971567797828',",
      "  whatsapp: '971567797828',\n  website: 'https://www.arkleen.ae',"
    );
  }

  if (!updated.includes('sameAs: [provider.website]')) {
    updated = updated.replace(
      '      url: canonical,',
      '      url: canonical,\n      sameAs: [provider.website],'
    );
  }

  const compactInfoBlock = `            <div className="mt-5 grid gap-3 sm:grid-cols-3">
               <CompactInfo icon={CalendarDays} title="Joined" value={provider.joinedAt} />
               <CompactInfo icon={Clock3} title="Workshop visit" value="By prior appointment" />
               <CompactInfo icon={MapPin} title="Service coverage" value="Al Ain and Abu Dhabi, subject to project details" />
             </div>`;

  const compactInfoWithWebsite = `            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
               <CompactInfo icon={CalendarDays} title="Joined" value={provider.joinedAt} />
               <CompactInfo icon={Clock3} title="Workshop visit" value="By prior appointment" />
               <CompactInfo icon={MapPin} title="Service coverage" value="Al Ain and Abu Dhabi, subject to project details" />
               <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex min-h-[78px] items-center gap-3 rounded-[1.35rem] border border-[#E6DCC8] bg-white/90 px-4 py-3 shadow-[0_10px_24px_rgba(67,45,17,.07)] transition hover:-translate-y-0.5 hover:border-[#D4AF37]">
                 <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF2CF] text-[#0F3F1A] shadow-inner">
                   <ExternalLink className="h-5 w-5" />
                 </span>
                 <div className="min-w-0">
                   <p className="text-[11px] font-black text-[#A66B19]">Official website</p>
                   <p className="mt-1 text-sm font-black leading-6 text-[#0F3F1A]">www.arkleen.ae</p>
                 </div>
               </a>
             </div>`;

  if (!updated.includes('Official website')) {
    updated = updated.replace(compactInfoBlock, compactInfoWithWebsite);
  }

  writeWhenChanged(
    englishArkleenPageFile,
    original,
    updated,
    'Applied ARKLEEN English branding and official website details.'
  );
}

const providersDataFile = path.join(process.cwd(), 'data', 'providers.js');

if (fs.existsSync(providersDataFile)) {
  const original = fs.readFileSync(providersDataFile, 'utf8');
  const updated = original.replace(
    /export const arklineProvider = \{\s*slug: 'arkline',/,
    "export const arklineProvider = {\n  slug: 'arkleen',"
  );

  writeWhenChanged(
    providersDataFile,
    original,
    updated,
    'Updated the ARKLEEN provider directory slug.'
  );
}

if (changedFiles === 0) {
  console.log('No prebuild source changes were required.');
}
