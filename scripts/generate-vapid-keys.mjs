#!/usr/bin/env node
/**
 * Genera un par de claves VAPID para Web Push.
 *
 * Uso:
 *   node scripts/generate-vapid-keys.mjs
 *   npm run generate-vapid
 *
 * Copia los valores a los secrets / variables de Cloudflare Pages.
 * Nunca subas VAPID_PRIVATE_KEY ni NOTIFY_SECRET al repositorio.
 */

import webpush from 'web-push';
import { randomBytes } from 'node:crypto';

const keys = webpush.generateVAPIDKeys();
const notifySecret = randomBytes(32).toString('base64url');

console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Claves VAPID generadas — guárdalas en un lugar seguro      ║
╚══════════════════════════════════════════════════════════════╝

# Variables / secrets de Cloudflare Pages
# (Settings → Environment variables → Production + Preview)

VAPID_PUBLIC_KEY=${keys.publicKey}
VAPID_PRIVATE_KEY=${keys.privateKey}
VAPID_SUBJECT=mailto:tu-email@ejemplo.com

# Token para POST /api/notify (Authorization: Bearer …)
NOTIFY_SECRET=${notifySecret}

# ── Recordatorio ─────────────────────────────────────────────
# VAPID_PUBLIC_KEY  → variable normal (también se sirve por GET /api/vapid-public-key)
# VAPID_PRIVATE_KEY → Encrypt (secret)
# VAPID_SUBJECT     → variable normal (mailto: o https:)
# NOTIFY_SECRET     → Encrypt (secret)
`);
