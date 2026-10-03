const CACHE_NAME = "inclusao-financeira-v9";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo_app.png",
  "/logo192.png",
  "/logo512.png",
  "/logo-maskable-192.png",
  "/logo-maskable-512.png",
  "/logo-any-192.png",
  "/logo-any-512.png",
  "/apple-touch-icon.png"
];

// Install Event - Pre-cache critical assets individually
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of ASSETS_TO_CACHE) {
        try {
          await cache.add(asset);
        } catch (e) {
          console.warn("Pre-cache asset warning:", asset, e);
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Handle app navigation and static assets
self.addEventListener("fetch", (event) => {
  // Skip requests to other origins
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Navigation requests (PWA opening / HTML page load): Network first, fallback to cached /index.html
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", cacheCopy));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match("/index.html").then((cached) => {
            return cached || caches.match("/");
          });
        })
    );
    return;
  }

  // Static assets: Cache first, fallback to network
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch updated asset in background
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
        }
        return networkResponse;
      });
    })
  );
});
