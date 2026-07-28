/**
 * POST /api/subscribe
 * Guarda una PushSubscription en Workers KV (clave = endpoint).
 *
 * Body JSON: objeto PushSubscription del navegador
 * {
 *   endpoint: string,
 *   expirationTime: number | null,
 *   keys: { p256dh: string, auth: string }
 * }
 */

import { handleOptions, jsonResponse } from '../_utils/cors.js';

/**
 * @param {EventContext<{ SUBSCRIPTIONS: KVNamespace }, any, any>} context
 */
export async function onRequestOptions(context) {
  return handleOptions(context.request);
}

/**
 * @param {EventContext<{ SUBSCRIPTIONS: KVNamespace }, any, any>} context
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.SUBSCRIPTIONS) {
    return jsonResponse(
      request,
      {
        ok: false,
        error:
          'KV binding SUBSCRIPTIONS no configurado. Vincula un namespace en Cloudflare Pages.',
      },
      500
    );
  }

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

  const endpoint = body?.endpoint;
  const keys = body?.keys;

  if (
    typeof endpoint !== 'string' ||
    !endpoint.startsWith('https://') ||
    !keys ||
    typeof keys.p256dh !== 'string' ||
    typeof keys.auth !== 'string' ||
    !keys.p256dh ||
    !keys.auth
  ) {
    return jsonResponse(
      request,
      {
        ok: false,
        error:
          'Suscripción inválida. Se requieren endpoint (https) y keys.p256dh / keys.auth.',
      },
      400
    );
  }

  // Limitar tamaño del endpoint como clave KV (máx. práctico ~2 KiB)
  if (endpoint.length > 2048) {
    return jsonResponse(
      request,
      { ok: false, error: 'Endpoint demasiado largo.' },
      400
    );
  }

  const subscription = {
    endpoint,
    expirationTime: body.expirationTime ?? null,
    keys: {
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
    // Metadatos útiles (no afectan al push)
    subscribedAt: new Date().toISOString(),
    userAgent: request.headers.get('User-Agent')?.slice(0, 300) || null,
  };

  try {
    // Clave = endpoint → evita duplicados al re-suscribirse
    await env.SUBSCRIPTIONS.put(endpoint, JSON.stringify(subscription));
  } catch (err) {
    console.error('Error guardando suscripción en KV:', err);
    return jsonResponse(
      request,
      { ok: false, error: 'No se pudo guardar la suscripción.' },
      500
    );
  }

  return jsonResponse(request, {
    ok: true,
    message: 'Suscripción guardada correctamente.',
  });
}

/**
 * Otros métodos no permitidos.
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
