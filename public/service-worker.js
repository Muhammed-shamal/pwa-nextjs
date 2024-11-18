const CACHE_NAME = "HomePageCache"

//add new caches
async function cacheCoreAssets() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll([
      "/",
      "/icon512_maskable.png",
      "/icon512_maskable.png",
    ]);
  }
  
  self.addEventListener("install", (event) => {
    event.waitUntil(cacheCoreAssets());
    self.skipWaiting();
  });


  //clear old caches
  async function clearOldCaches() {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames
        .filter((name) => name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    );
  }
  
  self.addEventListener("activate", (event) => {
    event.waitUntil(clearOldCaches());
    self.clients.claim();
  });

  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
  });


  async function cacheFirstStrategy(request) {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(request);
  
      if (cachedResponse) {
        return cachedResponse;
      }
  
      const networkResponse = await fetch(request);
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
      return networkResponse;
    } catch (error) {
      console.error("Cache first strategy failed:", error);
      return caches.match("/offline");
    }
  }
  
  self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (event.request.mode === "navigate") {
      event.respondWith(cacheFirstStrategy(request));
    } else {
      event.respondWith(dynamicCaching(request));
    }
  });
  
//   self.addEventListener('fetch', (event) => {
//     console.log('Fetching:', event.request.url);
//     event.respondWith(fetch(event.request));
//   });
  
