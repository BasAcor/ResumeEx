const CACHE_NAME = 'my-pwa-cache-v1';

const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './img/icon_transparent_16x16.png',
  './img/icon_transparent_32x32.png',
  './img/icon_transparent_64x64.png',
  './img/icon_transparent_96x96.png',
  './img/icon_transparent_128x128.png',
  './img/icon_transparent_144x144.png',
  './img/icon_transparent_192x192.png',
  './img/icon_transparent_256x256.png',
  './img/icon_transparent_384x384.png',
  './img/icon_transparent_512x512.png',
  './img/icon_transparent_1024x1024.png',
  './app.js'
]

//Evento install
self.addEventListener("install", e => {
  e.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => {
          return cache.addAll(urlsToCache)
          .then(() => {
              self.skipWaiting()
          });
      })
      .catch(err => console.log("Cache registration failed: ", err))
  );
});

//Evento activate
self.addEventListener("activate", e => {
  const cacheWhitelist = [CACHE_NAME];   
  e.waitUntil(
      caches.keys()
      .then(cacheNames => {
          return Promise.all(
              cacheNames.map(cacheName => {
                  if (cacheWhitelist.indexOf(cacheName) === -1) {
                      return caches.delete(cacheName);
                    }
              })
          );
      })
      .then(() => self.clients.claim())
    );
});


//Evento fetch
self.addEventListener("fetch", e => {
  e.respondWith(
      caches.match(e.request)
      .then(res => {
          if (res) {
              return res;
            }
          return fetch(e.request);
        })
    );
});