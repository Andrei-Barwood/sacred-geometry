#!/usr/bin/env node
/**
 * Configura Web Push en este proyecto Cloudflare Pages (sacred-geometry):
 *  1. Genera VAPID + NOTIFY_SECRET (si no hay .dev.vars)
 *  2. Crea el namespace KV (si hace falta)
 *  3. Vincula SUBSCRIPTIONS + env vars/secrets en production y preview
 *
 * Requisitos:
 *   export CLOUDFLARE_API_TOKEN="..."   # Account: Pages Edit + Workers KV Edit
 *   export CLOUDFLARE_ACCOUNT_ID="..."  # Overview de la cuenta
 *
 * Opcional:
 *   export CLOUDFLARE_PAGES_PROJECT="sacred-geometry"  # nombre en el dashboard
 *   export VAPID_SUBJECT="mailto:tu@email.com"
 *
 * Uso:
 *   node scripts/setup-cloudflare-push.mjs
 *   npm run setup-push
 */

import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import webpush from 'web-push';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DEV_VARS = resolve(ROOT, '.dev.vars');

const API = 'https://api.cloudflare.com/client/v4';
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const PROJECT =
  process.env.CLOUDFLARE_PAGES_PROJECT ||
  process.env.CF_PAGES_PROJECT ||
  'sacred-geometry';
const SUBJECT =
  process.env.VAPID_SUBJECT || 'mailto:contact@example.com';

function die(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

function loadDevVars() {
  if (!existsSync(DEV_VARS)) return {};
  const out = {};
  for (const line of readFileSync(DEV_VARS, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

function saveDevVars(vars) {
  const body = Object.entries(vars)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  writeFileSync(
    DEV_VARS,
    `# Generado por scripts/setup-cloudflare-push.mjs — NO subir al git\n${body}\n`,
    'utf8'
  );
}

async function cf(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    const err =
      data?.errors?.map((e) => e.message).join('; ') ||
      res.statusText ||
      'error desconocido';
    throw new Error(`${method} ${path}: ${err}`);
  }
  return data.result;
}

async function findKvByTitle(title) {
  let page = 1;
  for (;;) {
    const result = await cf(
      'GET',
      `/accounts/${ACCOUNT_ID}/storage/kv/namespaces?page=${page}&per_page=100`
    );
    // La API devuelve un array de namespaces en `result`
    const rows = Array.isArray(result) ? result : [];
    const hit = rows.find((n) => n.title === title);
    if (hit) return hit.id;
    if (rows.length < 100) break;
    page += 1;
    if (page > 20) break;
  }
  return null;
}

async function ensureKv(title) {
  const existing = await findKvByTitle(title);
  if (existing) {
    console.log(`  · KV «${title}» ya existe: ${existing}`);
    return existing;
  }
  const created = await cf(
    'POST',
    `/accounts/${ACCOUNT_ID}/storage/kv/namespaces`,
    { title }
  );
  console.log(`  · KV «${title}» creado: ${created.id}`);
  return created.id;
}

async function patchPagesProject(kvId, secrets) {
  const envBlock = {
    VAPID_PUBLIC_KEY: {
      type: 'plain_text',
      value: secrets.VAPID_PUBLIC_KEY,
    },
    VAPID_PRIVATE_KEY: {
      type: 'secret_text',
      value: secrets.VAPID_PRIVATE_KEY,
    },
    VAPID_SUBJECT: {
      type: 'plain_text',
      value: secrets.VAPID_SUBJECT,
    },
    NOTIFY_SECRET: {
      type: 'secret_text',
      value: secrets.NOTIFY_SECRET,
    },
  };

  const deploymentEnv = {
    kv_namespaces: {
      SUBSCRIPTIONS: { namespace_id: kvId },
    },
    env_vars: envBlock,
  };

  await cf('PATCH', `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}`, {
    deployment_configs: {
      production: deploymentEnv,
      preview: deploymentEnv,
    },
  });
  console.log(`  · Proyecto Pages «${PROJECT}»: binding SUBSCRIPTIONS + env vars OK`);
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Setup Web Push — sacred-geometry (Cloudflare Pages)         ║
╚══════════════════════════════════════════════════════════════╝
`);

  if (!TOKEN) die('Define CLOUDFLARE_API_TOKEN');
  if (!ACCOUNT_ID) die('Define CLOUDFLARE_ACCOUNT_ID');

  // --- Claves ---
  let vars = loadDevVars();
  if (!vars.VAPID_PUBLIC_KEY || !vars.VAPID_PRIVATE_KEY || !vars.NOTIFY_SECRET) {
    console.log('→ Generando VAPID + NOTIFY_SECRET…');
    const keys = webpush.generateVAPIDKeys();
    vars = {
      ...vars,
      VAPID_PUBLIC_KEY: keys.publicKey,
      VAPID_PRIVATE_KEY: keys.privateKey,
      VAPID_SUBJECT: vars.VAPID_SUBJECT || SUBJECT,
      NOTIFY_SECRET: vars.NOTIFY_SECRET || randomBytes(32).toString('base64url'),
    };
    saveDevVars(vars);
    console.log(`  · Guardado en .dev.vars (gitignored)`);
  } else {
    console.log('→ Usando claves de .dev.vars');
    if (!vars.VAPID_SUBJECT) vars.VAPID_SUBJECT = SUBJECT;
  }

  // --- KV ---
  console.log('→ Namespace KV…');
  const kvId = await ensureKv('push-subscriptions');

  // Actualizar wrangler.toml id si hay placeholder
  const wranglerPath = resolve(ROOT, 'wrangler.toml');
  if (existsSync(wranglerPath)) {
    let toml = readFileSync(wranglerPath, 'utf8');
    if (toml.includes('REEMPLAZA_CON_TU_KV_NAMESPACE_ID')) {
      toml = toml.replace('REEMPLAZA_CON_TU_KV_NAMESPACE_ID', kvId);
      // preview_id: reutilizamos el mismo en free tier si no hay otro
      toml = toml.replace('REEMPLAZA_CON_TU_KV_PREVIEW_ID', kvId);
      writeFileSync(wranglerPath, toml, 'utf8');
      console.log('  · wrangler.toml actualizado con el id de KV');
    }
  }

  // --- Pages project ---
  console.log('→ Configurando proyecto Pages…');
  try {
    await cf('GET', `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}`);
  } catch (e) {
    die(
      `No se encontró el proyecto Pages «${PROJECT}».\n` +
        `  Revisa CLOUDFLARE_PAGES_PROJECT (nombre exacto en el dashboard).\n` +
        `  Detalle: ${e.message}`
    );
  }

  await patchPagesProject(kvId, {
    VAPID_PUBLIC_KEY: vars.VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY: vars.VAPID_PRIVATE_KEY,
    VAPID_SUBJECT: vars.VAPID_SUBJECT,
    NOTIFY_SECRET: vars.NOTIFY_SECRET,
  });

  console.log(`
✓ Listo.

Siguiente:
  1. Commit + push de este repo para desplegar functions/ + sw.js
     (o un redeploy vacío en Pages).
  2. Comprueba: https://TU-DOMINIO/api/vapid-public-key
  3. En el blog: botón «Activar notificaciones»
  4. Prueba envío:

     export SITE_URL="https://TU-DOMINIO"
     export NOTIFY_SECRET="${vars.NOTIFY_SECRET}"
     ./scripts/send-notification.sh "Prueba" "Web Push OK" "/blog.html"

NOTA: .dev.vars contiene secretos — no lo subas a git.
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
