// In development, always fetch from the network and do not enable offline support.
// This is because caching would make development more difficult (changes would not
// be reflected on the first load after each change).
self.addEventListener('fetch', () => { });

self.addEventListener('fetch', event => {
    // Solo manejar requests específicos
    if (event.request.url.includes('/api/')) {
        event.respondWith(fetch(event.request));
    }
});
