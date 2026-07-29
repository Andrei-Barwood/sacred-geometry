/**
 * POST /api/notify
 * Envía una notificación Web Push a todas las suscripciones en KV.
 * Protegido con Authorization: Bearer <NOTIFY_SECRET>.
 *
 * Body JSON:
 * {
 *   "title": "Título del post",
 *   "body": "Resumen corto",
 *   "url": "/blog.html?post=mi-post",  // o URL absoluta
 *   "icon": "/favicon.jpeg"            // opcional
 * }
 */

import { buildPushPayload } from '@block65/webcrypto-web-push';
import { handleOptions, jsonResponse } from '../../functions/_utils/cors.js';
import {
  listAllSubscriptions,
  mapPool,
  parseSubscription,
} from '../../functions/_utils/subscriptions.js';

const GONE_STATUSES = new Set([404, 410]);
const SEND_CONCURRENCY = 10;
const DEFAULT_TTL_SECONDS = 60 * 60 * 24; // 24 h

/**
 * @param {EventContext} context
 */
export async function onRequestOptions(context) {
  return handleOptions(context.request);
}

/**
 * @param {EventContext<{
 *   SUBSCRIPTIONS: KVNamespace,
 *   VAPID_PUBLIC_KEY: string,
 *   VAPID_PRIVATE_KEY: string,
 *   VAPID_SUBJECT: string,
 *   NOTIFY_SECRET: string,
 * }, any, any>} context
 */
export async function onRequestPost(context) {
  const { request, env, waitUntil } = context;

  // --- Auth ---
  const auth = request.headers.get('Authorization') || '';
  const expected = env.NOTIFY_SECRET;
  if (!expected || !auth.startsWith('Bearer ')) {
    return jsonResponse(
      request,
      { ok: false, error: 'No autorizado.' },
      401
    );
  }
  const token = auth.slice('Bearer '.length).trim();
  if (!timingSafeEqual(token, expected)) {
    return jsonResponse(
      request,
      { ok: false, error: 'No autorizado.' },
      401
    );
  }

  // --- Env ---
  if (!env.SUBSCRIPTIONS) {
    return jsonResponse(
      request,
      { ok: false, error: 'KV binding SUBSCRIPTIONS no configurado.' },
      500
    );
  }
  if (!env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY || !env.VAPID_SUBJECT) {
    return jsonResponse(
      request,
      {
        ok: false,
        error:
          'Faltan variables VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY o VAPID_SUBJECT.',
      },
      500
    );
  }

  // --- Body ---
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      request,
      { ok: false, error: 'JSON inválido en el cuerpo de la petición.' },
      400
    );
  }

  const title = typeof body?.title === 'string' ? body.title.trim() : '';
  const text = typeof body?.body === 'string' ? body.body.trim() : '';
  const url = typeof body?.url === 'string' ? body.url.trim() : '/';
  const icon =
    typeof body?.icon === 'string' && body.icon.trim()
      ? body.icon.trim()
      : '/favicon.jpeg';

  if (!title) {
    return jsonResponse(
      request,
      { ok: false, error: 'El campo "title" es obligatorio.' },
      400
    );
  }

  const notificationPayload = {
    title,
    body: text,
    icon,
    url,
    tag: `post-${hashTag(title + url)}`,
  };

  const vapid = {
    subject: env.VAPID_SUBJECT,
    publicKey: env.VAPID_PUBLIC_KEY,
    privateKey: env.VAPID_PRIVATE_KEY,
  };

  // listado + envío; waitUntil mantiene vivo el Worker si el cliente corta
  const job = sendToAll(env.SUBSCRIPTIONS, vapid, notificationPayload);
  waitUntil(job);

  const result = await job;

  return jsonResponse(request, {
    ok: true,
    ...result,
  });
}

/**
 * @param {EventContext} context
 */
export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return handleOptions(context.request);
  }
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  return jsonResponse(
    context.request,
    { ok: false, error: 'Método no permitido. Usa POST.' },
    405
  );
}

/**
 * Envía la notificación a todas las suscripciones y limpia 404/410.
 * @param {KVNamespace} kv
 * @param {{ subject: string, publicKey: string, privateKey: string }} vapid
 * @param {{ title: string, body: string, icon: string, url: string, tag: string }} notification
 */
async function sendToAll(kv, vapid, notification) {
  const rows = await listAllSubscriptions(kv);
  const stats = {
    total: rows.length,
    sent: 0,
    failed: 0,
    cleaned: 0,
    invalid: 0,
    errors: /** @type {string[]} */ ([]),
  };

  const messageData = JSON.stringify(notification);

  await mapPool(rows, SEND_CONCURRENCY, async (row) => {
    const subscription = parseSubscription(row.value);
    if (!subscription || !looksLikeValidPushKeys(subscription.keys)) {
      stats.invalid++;
      try {
        await kv.delete(row.name);
        stats.cleaned++;
      } catch {
        /* ignore */
      }
      return;
    }

    try {
      const payload = await buildPushPayload(
        {
          data: messageData,
          options: {
            ttl: DEFAULT_TTL_SECONDS,
            urgency: 'normal',
          },
        },
        subscription,
        vapid
      );

      const res = await fetch(subscription.endpoint, payload);

      if (res.ok || res.status === 201) {
        stats.sent++;
        return;
      }

      if (GONE_STATUSES.has(res.status)) {
        await kv.delete(row.name);
        stats.cleaned++;
        return;
      }

      stats.failed++;
      if (stats.errors.length < 10) {
        stats.errors.push(
          `${res.status} ${res.statusText} · ${subscription.endpoint.slice(0, 80)}`
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // Claves p256dh basura (p. ej. tests con "abc") o endpoint de prueba
      if (isUnusableSubscriptionError(msg)) {
        try {
          await kv.delete(row.name);
          stats.cleaned++;
          stats.invalid++;
        } catch {
          stats.failed++;
        }
        if (stats.errors.length < 10) {
          stats.errors.push(`cleaned invalid sub: ${msg.slice(0, 120)}`);
        }
        return;
      }

      stats.failed++;
      if (stats.errors.length < 10) {
        stats.errors.push(msg);
      }
    }
  });

  return stats;
}

/**
 * p256dh de Web Push es una clave pública P-256 en base64url (~65 bytes → ~87 chars).
 * auth es 16 bytes → ~22 chars. Valores de prueba tipo "abc" se rechazan aquí.
 * @param {{ p256dh: string, auth: string }} keys
 */
function looksLikeValidPushKeys(keys) {
  if (!keys?.p256dh || !keys?.auth) return false;
  // base64url sin padding
  const b64 = /^[A-Za-z0-9_-]+$/;
  if (!b64.test(keys.p256dh) || !b64.test(keys.auth)) return false;
  if (keys.p256dh.length < 80 || keys.p256dh.length > 120) return false;
  if (keys.auth.length < 20 || keys.auth.length > 40) return false;
  return true;
}

/**
 * @param {string} msg
 */
function isUnusableSubscriptionError(msg) {
  const m = msg.toLowerCase();
  return (
    m.includes('point is not on curve') ||
    m.includes('invalid ec key') ||
    m.includes('invalid key') ||
    m.includes('bad decrypt') ||
    m.includes('unable to import')
  );
}

/**
 * Comparación en tiempo constante (aprox.) para el Bearer token.
 * @param {string} a
 * @param {string} b
 */
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const enc = new TextEncoder();
  const bufA = enc.encode(a);
  const bufB = enc.encode(b);
  const len = Math.max(bufA.length, bufB.length);
  let diff = bufA.length ^ bufB.length;
  for (let i = 0; i < len; i++) {
    diff |= (bufA[i] || 0) ^ (bufB[i] || 0);
  }
  return diff === 0;
}

/**
 * Tag corto y estable para deduplicar notificaciones en el SW.
 * @param {string} input
 */
function hashTag(input) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}
