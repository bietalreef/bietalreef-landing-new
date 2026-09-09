import fs from 'node:fs';

const path = 'components/GenericProviderProfile.js';
let s = fs.readFileSync(path, 'utf8');

const coverOld = 'className="relative h-[300px] md:h-[430px]"';
if (!s.includes(coverOld)) throw new Error('provider cover anchor missing');
s = s.replace(coverOld, 'className="relative aspect-[16/5]"');

const avatarMarker = "provider.avatar || provider.logo";
const markerIndex = s.indexOf(avatarMarker);
if (markerIndex < 0) throw new Error('provider avatar anchor missing');
const imageStart = s.lastIndexOf('<Image', markerIndex);
const imageEnd = s.indexOf('/>', markerIndex);
if (imageStart < 0 || imageEnd < 0) throw new Error('provider avatar Image bounds missing');
let avatarImage = s.slice(imageStart, imageEnd + 2);
if (!avatarImage.includes('className="object-cover"')) throw new Error('provider avatar object-cover missing');
avatarImage = avatarImage.replace('className="object-cover"', 'className="object-contain p-1"');
s = s.slice(0, imageStart) + avatarImage + s.slice(imageEnd + 2);

fs.writeFileSync(path, s);
console.log('canonical provider media applied to landing provider profile');
