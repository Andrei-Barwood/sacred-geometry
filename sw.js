/**
 * Service Worker — Web Push
 * Debe servirse desde la raíz del sitio (/sw.js) para cubrir todo el origen.
 */

/* global self, clients */

const SW_VERSION = 'arch-v16-repair-portal';
const SHELL_CACHE = `sacred-arch-shell-${SW_VERSION}`;
const ASSET_CACHE = `sacred-arch-assets-${SW_VERSION}`;

const SHELL = [
  '/arquitectura-sagrada.html',
  '/offline-architecture.html',
  '/css/architecture-workbench.css',
  '/manifest.webmanifest',
  '/favicon.jpeg',
];

function isPdfRequest(request, url) {
  if (url.pathname.toLowerCase().endsWith('.pdf')) return true;
  const accept = request.headers.get('accept') || '';
  if (accept.includes('application/pdf')) return true;
  return false;
}

function isOsmTile(url) {
  return url.hostname === 'tile.openstreetmap.org';
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== ASSET_CACHE && k.startsWith('sacred-arch-'))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.protocol === 'blob:' || url.protocol === 'data:') return;
  if (isPdfRequest(req, url)) return;
  if (isOsmTile(url)) return;

  if (url.origin !== self.location.origin) return;

  if (
    url.pathname.endsWith('/arquitectura-sagrada.html') ||
    url.pathname === '/arquitectura-sagrada.html'
  ) {
    event.respondWith(networkFirst(req, SHELL_CACHE, '/offline-architecture.html'));
    return;
  }

  const architectureAsset =
    url.pathname === '/css/architecture-workbench.css' ||
    url.pathname.startsWith('/js/architecture/') ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname === '/offline-architecture.html';
  if (architectureAsset) {
    event.respondWith(staleWhileRevalidate(req, ASSET_CACHE));
  }
});

async function networkFirst(request, cacheName, fallbackPath) {
  try {
    const fresh = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, fresh.clone());
    return fresh;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (fallbackPath) {
      const fb = await caches.match(fallbackPath);
      if (fb) return fb;
    }
    throw new Error('offline');
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || network;
}

/**
 * Evento push: el servidor de push del navegador entrega el payload cifrado;
 * el navegador lo descifra y nos pasa el texto JSON en event.data.
 */
self.addEventListener('push', (event) => {
  let data = {
    title: 'Nuevo contenido',
    body: '',
    icon: '/favicon.jpeg',
    url: '/',
    tag: 'default',
  };

  try {
    if (event.data) {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    }
  } catch {
    // Si no es JSON, usar texto plano como body
    try {
      const text = event.data?.text?.() || '';
      if (text) data.body = text;
    } catch {
      /* ignore */
    }
  }

  const title = data.title || 'Nuevo contenido';
  const options = {
    body: data.body || '',
    icon: data.icon || '/favicon.jpeg',
    badge: data.badge || data.icon || '/favicon.jpeg',
    tag: data.tag || 'default',
    renotify: true,
    data: {
      url: data.url || '/',
    },
    // Acciones opcionales (algunos SO las muestran)
    actions: data.url
      ? [{ action: 'open', title: 'Abrir' }]
      : undefined,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * Clic en la notificación: abre o enfoca la URL del post.
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = resolveUrl(
    event.notification?.data?.url || '/',
    self.location.origin
  );

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      // Reutilizar pestaña del mismo origen si existe
      for (const client of allClients) {
        try {
          const clientUrl = new URL(client.url);
          if (clientUrl.origin === self.location.origin && 'focus' in client) {
            await client.focus();
            if ('navigate' in client) {
              await client.navigate(targetUrl);
            }
            return;
          }
        } catch {
          /* continue */
        }
      }

      if (clients.openWindow) {
        await clients.openWindow(targetUrl);
      }
    })()
  );
});

/**
 * Resuelve rutas relativas al origen del sitio.
 * @param {string} url
 * @param {string} origin
 */
function resolveUrl(url, origin) {
  try {
    return new URL(url, origin).href;
  } catch {
    return origin + '/';
  }
}
