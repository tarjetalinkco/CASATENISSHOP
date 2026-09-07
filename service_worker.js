'use strict';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.clients.claim();

      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => {
        if (client.url && 'navigate' in client) client.navigate(client.url);
      });
    })(),
  );
});
