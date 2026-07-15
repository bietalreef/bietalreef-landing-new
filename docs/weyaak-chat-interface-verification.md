# Weyaak chat interface verification

## Scope

- Existing page layouts and button markup remain unchanged.
- Links that already point to `/weyaak` or `/en/weyaak` are intercepted client-side and open the Weyaak modal above the current page.
- Direct navigation to `/weyaak` and `/en/weyaak` remains available.
- The modal supports Arabic and English UI plus a language picker for additional reply languages.
- Mobile uses the dynamic viewport height to avoid browser zoom and keyboard layout jumps.
- Tablet and desktop use centered, bounded dialog dimensions.

## Automated checks

- Site structure audit: passed.
- Next.js lint/type validation: passed.
- Production compilation: passed.
- Static page generation: 3240/3240 passed.
- Vercel preview deployment: READY.

## Files intentionally changed

- `components/WeyakChat.js`
- `components/WeyaakChatLauncher.js`
- `pages/_app.js`
- `pages/api/chat.js`
