/**
 * Service Worker — Web Push
 * Debe servirse desde la raíz del sitio (/sw.js) para cubrir todo el origen.
 */

/* global self, clients */

const SW_VERSION = 'push-v1';

// Activa de inmediato la nueva versión del SW
self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log(`[sw] install ${SW_VERSION}`);
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  console.log(`[sw] activate ${SW_VERSION}`);
});

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
