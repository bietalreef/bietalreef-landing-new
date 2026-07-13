const fs = require('fs');
const path = require('path');

const routeFile = path.join(process.cwd(), 'pages', '[slug].js');
const source = fs.readFileSync(routeFile, 'utf8');

const replacement = `const RESERVED_ARABIC_ROUTES = new Set([
  'cookies',
  'privacy',
  'legal',
  'why-biet-alreef',
  'how-it-works',
  'pricing',
]);`;

const pattern = /const RESERVED_ARABIC_ROUTES = new Set\([\s\S]*?\);/;

if (!pattern.test(source)) {
  throw new Error('Could not locate RESERVED_ARABIC_ROUTES in pages/[slug].js');
}

const updated = source.replace(pattern, replacement);

if (updated === source) {
  console.log('Standalone Arabic routes are already excluded from dynamic generation.');
  process.exit(0);
}

fs.writeFileSync(routeFile, updated, 'utf8');
console.log('Excluded standalone Arabic routes from dynamic getStaticPaths.');
