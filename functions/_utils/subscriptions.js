/**
 * Helpers para listar y limpiar suscripciones en Workers KV.
 */

/**
 * Lista todas las entradas del binding SUBSCRIPTIONS (con paginación).
 * @param {KVNamespace} kv
 * @returns {Promise<Array<{ name: string, value: string | null }>>}
 */
export async function listAllSubscriptions(kv) {
  /** @type {Array<{ name: string, value: string | null }>} */
  const results = [];
  /** @type {string | undefined} */
  let cursor;

  do {
    const page = await kv.list({ cursor, limit: 1000 });
    for (const key of page.keys) {
      const value = await kv.get(key.name);
      results.push({ name: key.name, value });
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return results;
}

/**
 * Parsea una suscripción PushSubscription almacenada como JSON.
 * @param {string | null} raw
 * @returns {import('@block65/webcrypto-web-push').PushSubscription | null}
 */
export function parseSubscription(raw) {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (
      !data ||
      typeof data.endpoint !== 'string' ||
      !data.keys ||
      typeof data.keys.p256dh !== 'string' ||
      typeof data.keys.auth !== 'string'
    ) {
      return null;
    }
    return {
      endpoint: data.endpoint,
      expirationTime: data.expirationTime ?? null,
      keys: {
        p256dh: data.keys.p256dh,
        auth: data.keys.auth,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Ejecuta promesas en lotes para no saturar la CPU/red del Worker.
 * @template T
 * @param {T[]} items
 * @param {number} concurrency
 * @param {(item: T, index: number) => Promise<void>} worker
 */
export async function mapPool(items, concurrency, worker) {
  let index = 0;

  async function run() {
    while (index < items.length) {
      const current = index++;
      await worker(items[current], current);
    }
  }

  const runners = Array.from(
    { length: Math.min(concurrency, Math.max(items.length, 1)) },
    () => run()
  );
  await Promise.all(runners);
}
