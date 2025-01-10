const cacheName = 'production-booking-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'https://cdn.jsdelivr.net/npm/select2@4.1.0/dist/css/select2.min.css',
  'https://cdn.jsdelivr.net/npm/select2@4.1.0/dist/js/select2.min.js',
  'https://code.jquery.com/jquery-3.6.0.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
