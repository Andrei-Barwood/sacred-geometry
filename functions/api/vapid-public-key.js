/**
 * GET /api/vapid-public-key
 * Expone solo la clave pública VAPID (segura de publicar).
 * El frontend la usa al suscribirse sin hardcodear el valor en el repo.
 */

import { handleOptions, jsonResponse } from '../_utils/cors.js';

/**
 * @param {EventContext<{ VAPID_PUBLIC_KEY: string }, any, any>} context
 */
export async function onRequestGet(context) {
  const { request, env } = context;
  const publicKey = env.VAPID_PUBLIC_KEY;

  if (!publicKey) {
    return jsonResponse(
      request,
      {
        ok: false,
        error: 'VAPID_PUBLIC_KEY no configurada en el entorno.',
      },
      500
    );
  }

  return jsonResponse(request, {
    ok: true,
    publicKey,
  });
}

/**
 * @param {EventContext} context
 */
export async function onRequestOptions(context) {
  return handleOptions(context.request);
}

/**
 * @param {EventContext} context
 */
export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return handleOptions(context.request);
  }
  if (context.request.method === 'GET') {
    return onRequestGet(context);
  }
  return jsonResponse(
    context.request,
    { ok: false, error: 'Método no permitido. Usa GET.' },
    405
  );
}
