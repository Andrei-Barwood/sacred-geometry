/**
 * Utilidades CORS compartidas para Pages Functions.
 * Mismo origen en producción; permitido en local para pruebas.
 */

const DEFAULT_ALLOWED_HEADERS = 'Content-Type, Authorization';
const DEFAULT_ALLOWED_METHODS = 'GET, POST, OPTIONS';

/**
 * @param {Request} request
 * @param {Record<string, string>} [extra]
 * @returns {Record<string, string>}
 */
export function corsHeaders(request, extra = {}) {
  const origin = request.headers.get('Origin') || '*';

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': DEFAULT_ALLOWED_METHODS,
    'Access-Control-Allow-Headers': DEFAULT_ALLOWED_HEADERS,
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
    ...extra,
  };
}

/**
 * Respuesta preflight OPTIONS.
 * @param {Request} request
 */
export function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

/**
 * JSON con cabeceras CORS.
 * @param {Request} request
 * @param {unknown} body
 * @param {number} [status]
 * @param {Record<string, string>} [extraHeaders]
 */
export function jsonResponse(request, body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(request),
      ...extraHeaders,
    },
  });
}
