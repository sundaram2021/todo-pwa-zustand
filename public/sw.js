
const CACHE_NAME = 'todo-app-cache-v1';
const URLS_TO_CACHE = [
    '/',
    'manifest.json',
    'logo.png',
    'logo.png',
];

// Install event
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(URLS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Activate immediately
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then((keyList) =>
        Promise.all(
            keyList.map((key) => {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
            })
        )
        )
    );
  self.clients.claim(); // Become available to all pages
});

// Fetch event (cache-first strategy)
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request)
            .then((response) => {
            if (!response || response.status !== 200) return response;

            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
            });
            return response;
            })
            .catch(() => {
            // Optional: fallback page or offline message
            return new Response('You are offline', {
                status: 503,
                headers: { 'Content-Type': 'text/plain' },
            });
            });
        })
    );
});
