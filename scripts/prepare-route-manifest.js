const fs = require('fs');
const path = require('path');

const routeFile = path.join(process.cwd(), 'pages', '[slug].js');
const source = fs.readFileSync(routeFile, 'utf8');

const original = "const RESERVED_ARABIC_ROUTES = new Set(['cookies']);";
const previous = "const RESERVED_ARABIC_ROUTES = new Set(['cookies', 'why-biet-alreef', 'how-it-works']);";
const updated = "const RESERVED_ARABIC_ROUTES = new Set(['cookies', 'why-biet-alreef', 'how-it-works', 'pricing']);";

if (source.includes(updated)) {
  console.log('Arabic standalone routes are already excluded from dynamic generation.');
  process.exit(0);
}

if (source.includes(previous)) {
  fs.writeFileSync(routeFile, source.replace(previous, updated), 'utf8');
  console.log('Excluded pricing from dynamic getStaticPaths.');
  process.exit(0);
}

if (!source.includes(original)) {
  throw new Error('Could not locate RESERVED_ARABIC_ROUTES in pages/[slug].js');
}

fs.writeFileSync(routeFile, source.replace(original, updated), 'utf8');
console.log('Excluded standalone Arabic routes from dynamic getStaticPaths.');
