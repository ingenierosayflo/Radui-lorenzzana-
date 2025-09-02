const CACHE = 'rl-chat-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './chat.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE && caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(resp => {
      // opcional: guardar nuevos recursos
      return resp;
    }))
  );
});