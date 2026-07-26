const CACHE_NAME = 'bietalreef-public-v6';
const OFFLINE_URL = '/offline.html';
const PWA_HOME = '/?source=pwa-recovery';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll([OFFLINE_URL, '/logo.png']))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then((names) => Promise.all(names.filter((name) => name.startsWith('bietalreef-') && name !== CACHE_NAME).map((name) => caches.delete(name)))),
    self.clients.claim(),
  ]));
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    if (url.pathname.startsWith('/_next/')) {
      event.respondWith(Response.redirect(PWA_HOME, 302));
      return;
    }

    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(async (response) => {
          const contentType = response.headers.get('content-type') || '';
          if (/javascript|text\/css/i.test(contentType)) {
            return fetch(PWA_HOME, { cache: 'no-store' });
          }
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/')) return;

  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(caches.match(request).then((cached) => {
      const fetched = fetch(request).then((response) => {
        if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
        return response;
      }).catch(() => cached);
      return cached || fetched;
    }));
  }
});
