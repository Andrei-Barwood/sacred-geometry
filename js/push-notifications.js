/**
 * Cliente de notificaciones Web Push.
 * Uso: importar como módulo o cargar con <script type="module">.
 *
 * API pública (window.PushNotifications):
 *   - isSupported()
 *   - getPermission()
 *   - getStatus() → 'unsupported' | 'denied' | 'subscribed' | 'default' | 'granted'
 *   - enable() → Promise<{ ok, status, message }>
 *   - disable() → Promise (desuscribe localmente; el servidor limpia con 410 al enviar)
 */

const SW_PATH = '/sw.js';
const SUBSCRIBE_URL = '/api/subscribe';
const VAPID_URL = '/api/vapid-public-key';

/**
 * ¿El navegador soporta Service Worker + Push + Notifications?
 */
export function isSupported() {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

/**
 * Estado del permiso de notificaciones.
 * @returns {'default' | 'granted' | 'denied' | 'unsupported'}
 */
export function getPermission() {
  if (!isSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Estado de alto nivel para la UI.
 * @returns {Promise<'unsupported' | 'denied' | 'subscribed' | 'default' | 'granted'>}
 */
export async function getStatus() {
  if (!isSupported()) return 'unsupported';
  if (Notification.permission === 'denied') return 'denied';

  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      const sub = await reg.pushManager.getSubscription();
      if (sub) return 'subscribed';
    }
  } catch {
    /* ignore */
  }

  return Notification.permission === 'granted' ? 'granted' : 'default';
}

/**
 * Registra el Service Worker en la raíz del origen.
 * @returns {Promise<ServiceWorkerRegistration>}
 */
async function ensureServiceWorker() {
  const reg = await navigator.serviceWorker.register(SW_PATH, { scope: '/' });
  // Esperar a que esté activo
  await navigator.serviceWorker.ready;
  return reg;
}

/**
 * Obtiene la clave pública VAPID del backend.
 * @returns {Promise<string>}
 */
async function fetchVapidPublicKey() {
  const res = await fetch(VAPID_URL, { credentials: 'same-origin' });
  if (!res.ok) {
    throw new Error(
      'No se pudo obtener la clave VAPID pública. ¿Está desplegada la Function y configurado el secret?'
    );
  }
  const data = await res.json();
  if (!data?.publicKey) {
    throw new Error('Respuesta VAPID inválida.');
  }
  return data.publicKey;
}

/**
 * Convierte una clave VAPID base64url a Uint8Array (applicationServerKey).
 * @param {string} base64String
 * @returns {Uint8Array}
 */
export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    out[i] = raw.charCodeAt(i);
  }
  return out;
}

/**
 * Activa notificaciones: SW → permiso → subscribe → POST /api/subscribe.
 * @returns {Promise<{ ok: boolean, status: string, message: string }>}
 */
export async function enable() {
  if (!isSupported()) {
    return {
      ok: false,
      status: 'unsupported',
      message:
        'Tu navegador no soporta notificaciones push. Prueba Chrome, Firefox, Edge o Safari 16+.',
    };
  }

  if (Notification.permission === 'denied') {
    return {
      ok: false,
      status: 'denied',
      message:
        'Has bloqueado las notificaciones. Actívalas en la configuración del navegador para este sitio.',
    };
  }

  try {
    const registration = await ensureServiceWorker();

    // Pedir permiso si aún no está concedido
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission !== 'granted') {
      return {
        ok: false,
        status: 'denied',
        message: 'Permiso de notificaciones denegado.',
      };
    }

    // Reutilizar suscripción existente si ya hay una
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      const publicKey = await fetchVapidPublicKey();
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
    }

    const res = await fetch(SUBSCRIBE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(subscription.toJSON()),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) {
      throw new Error(data.error || `Error del servidor (${res.status})`);
    }

    return {
      ok: true,
      status: 'subscribed',
      message: '¡Listo! Recibirás notificaciones cuando haya un post nuevo.',
    };
  } catch (err) {
    console.error('[push] enable error:', err);
    const message =
      err instanceof Error ? err.message : 'Error al activar notificaciones.';
    return {
      ok: false,
      status: 'error',
      message,
    };
  }
}

/**
 * Cancela la suscripción en el navegador.
 * El servidor eliminará el endpoint en el próximo envío (404/410).
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
export async function disable() {
  if (!isSupported()) {
    return { ok: false, message: 'No soportado.' };
  }

  try {
    const reg = await navigator.serviceWorker.getRegistration();
    const sub = reg ? await reg.pushManager.getSubscription() : null;
    if (sub) {
      await sub.unsubscribe();
    }
    return { ok: true, message: 'Notificaciones desactivadas en este dispositivo.' };
  } catch (err) {
    console.error('[push] disable error:', err);
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Error al desactivar.',
    };
  }
}

/**
 * Inicializa un botón de activación.
 * @param {HTMLElement | string} buttonOrSelector
 * @param {{ onStatus?: (status: string, message?: string) => void }} [options]
 */
export function bindButton(buttonOrSelector, options = {}) {
  const btn =
    typeof buttonOrSelector === 'string'
      ? document.querySelector(buttonOrSelector)
      : buttonOrSelector;

  if (!btn) {
    console.warn('[push] bindButton: elemento no encontrado');
    return;
  }

  const statusEl = btn.parentElement?.querySelector('[data-push-status]');

  async function refreshUi() {
    const status = await getStatus();
    updateButton(btn, statusEl, status);
    options.onStatus?.(status);
  }

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    if (statusEl) statusEl.textContent = 'Activando…';

    const result = await enable();
    updateButton(btn, statusEl, result.status, result.message);
    options.onStatus?.(result.status, result.message);

    if (!result.ok && result.status !== 'subscribed') {
      btn.disabled = false;
    }
  });

  // Estado inicial
  refreshUi();
}

/**
 * @param {HTMLElement} btn
 * @param {HTMLElement | null | undefined} statusEl
 * @param {string} status
 * @param {string} [message]
 */
function updateButton(btn, statusEl, status, message) {
  const labels = {
    unsupported: 'No disponible',
    denied: 'Bloqueadas',
    subscribed: 'Notificaciones activadas ✓',
    granted: 'Activar notificaciones',
    default: 'Activar notificaciones',
    error: 'Reintentar',
  };

  btn.textContent = labels[status] || labels.default;

  if (status === 'subscribed') {
    btn.disabled = true;
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('push-btn--active');
  } else if (status === 'unsupported' || status === 'denied') {
    btn.disabled = true;
    btn.setAttribute('aria-pressed', 'false');
    btn.classList.remove('push-btn--active');
  } else {
    btn.disabled = false;
    btn.setAttribute('aria-pressed', 'false');
    btn.classList.remove('push-btn--active');
  }

  if (statusEl) {
    const hints = {
      unsupported:
        'Tu navegador no soporta notificaciones push.',
      denied:
        'Permiso denegado. Revísalo en la configuración del sitio.',
      subscribed:
        'Recibirás avisos de nuevos posts aunque cierres la pestaña.',
      granted: 'Pulsa para completar la suscripción.',
      default: 'Recibe un aviso cuando se publique un post nuevo.',
      error: message || 'Algo salió mal. Inténtalo de nuevo.',
    };
    statusEl.textContent = message || hints[status] || '';
    statusEl.dataset.state = status;
  }
}

// Exponer en window para uso sin bundler / Alpine
if (typeof window !== 'undefined') {
  window.PushNotifications = {
    isSupported,
    getPermission,
    getStatus,
    enable,
    disable,
    bindButton,
    urlBase64ToUint8Array,
  };
}

export default {
  isSupported,
  getPermission,
  getStatus,
  enable,
  disable,
  bindButton,
};
