# Notificaciones Web Push (Cloudflare Pages)

Guía completa para activar notificaciones nativas del navegador cuando publicas un post nuevo. Compatible con el plan **gratuito** de Cloudflare.

## Arquitectura

```
[Usuario]  →  clic "Activar notificaciones"
           →  Service Worker (/sw.js)
           →  PushManager.subscribe(VAPID public key)
           →  POST /api/subscribe  →  Workers KV (SUBSCRIPTIONS)

[Tú]       →  POST /api/notify (Bearer NOTIFY_SECRET)
           →  Lee todas las suscripciones en KV
           →  Cifra payload (VAPID + Web Crypto) con @block65/webcrypto-web-push
           →  fetch a cada endpoint de push (FCM / Mozilla / Apple…)
           →  Limpia suscripciones 404/410

[Navegador cerrado]  ←  push service del SO  →  SW muestra Notification
```

### Archivos

| Ruta | Rol |
|------|-----|
| `functions/api/subscribe.js` | Guarda suscripciones en KV |
| `functions/api/notify.js` | Envía a todos (protegido) |
| `functions/api/vapid-public-key.js` | Expone la clave pública |
| `functions/_utils/*` | CORS y helpers KV |
| `sw.js` | Service Worker (push + click) |
| `js/push-notifications.js` | Cliente del botón |
| `wrangler.toml` | Bindings de referencia / local |
| `scripts/generate-vapid-keys.mjs` | Genera VAPID + NOTIFY_SECRET |
| `scripts/send-notification.sh` | curl de prueba |
| `.github/workflows/notify-on-deploy.example.yml` | Action opcional |

---

## 0. Setup automático (API de Cloudflare)

Este repositorio es el sitio desplegado en Pages (`github.com/Andrei-Barwood/sacred-geometry`).
Puedes configurar KV + secrets + binding en un solo comando:

```bash
export CLOUDFLARE_API_TOKEN="token-con-Pages-Edit-y-KV-Edit"
export CLOUDFLARE_ACCOUNT_ID="tu-account-id"
# Opcional si el proyecto no se llama sacred-geometry:
# export CLOUDFLARE_PAGES_PROJECT="nombre-exacto-en-dashboard"
export VAPID_SUBJECT="mailto:tu@email.com"

npm install
npm run setup-push
```

Eso genera claves (`.dev.vars`), crea el KV `push-subscriptions`, y hace PATCH
al proyecto Pages con binding `SUBSCRIPTIONS` + variables. Luego haz **push/redeploy**.

---

## 1. Generar claves VAPID (manual)

En la raíz del proyecto:

```bash
npm install
npm run generate-vapid
```

Salida de ejemplo:

```text
VAPID_PUBLIC_KEY=BPxxxxxxxx...
VAPID_PRIVATE_KEY=yyyyyyyy...
VAPID_SUBJECT=mailto:tu-email@ejemplo.com
NOTIFY_SECRET=zzzzzzzz...
```

- **VAPID_PUBLIC_KEY**: pública (puede ir en el frontend vía la API).
- **VAPID_PRIVATE_KEY**: **secreto**. Nunca en el repo.
- **VAPID_SUBJECT**: `mailto:` de contacto (requisito del protocolo VAPID) o una URL `https:`.
- **NOTIFY_SECRET**: token fuerte para autorizar `POST /api/notify`.

Guárdalos en un gestor de contraseñas. No los commits.

---

## 2. Crear y vincular Workers KV

### Desde el dashboard

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **KV**.
2. **Create a namespace** → nombre sugerido: `push-subscriptions`.
3. Copia el **Namespace ID**.

### Vincular al proyecto Pages

1. **Workers & Pages** → tu proyecto (Pages) → **Settings** → **Bindings** (o *Functions* → *KV namespace bindings*).
2. **Add binding**:
   - Variable name: `SUBSCRIPTIONS` (exacto, mayúsculas).
   - KV namespace: el que creaste.
3. Aplica a **Production** (y **Preview** si quieres probar en previews).

### Desde CLI (alternativa)

```bash
npx wrangler kv namespace create SUBSCRIPTIONS
npx wrangler kv namespace create SUBSCRIPTIONS --preview
```

Pega los IDs en `wrangler.toml` (`id` y `preview_id`).

---

## 3. Añadir variables y secrets en Pages

**Workers & Pages** → proyecto → **Settings** → **Environment variables**.

| Nombre | Tipo | Entorno |
|--------|------|---------|
| `VAPID_PUBLIC_KEY` | Plaintext | Production (+ Preview) |
| `VAPID_PRIVATE_KEY` | **Encrypt** | Production (+ Preview) |
| `VAPID_SUBJECT` | Plaintext | Production (+ Preview) |
| `NOTIFY_SECRET` | **Encrypt** | Production (+ Preview) |

Con Wrangler:

```bash
# Ajusta --project-name al nombre real de tu proyecto Pages
npx wrangler pages secret put VAPID_PRIVATE_KEY --project-name=sacred-geometry
npx wrangler pages secret put NOTIFY_SECRET --project-name=sacred-geometry
```

Las variables no secretas también se pueden poner en el dashboard como texto plano.

> **Importante:** tras cambiar bindings o secrets, haz un **redeploy** del sitio para que las Functions los vean.

---

## 4. Desplegar

El sitio ya está conectado a GitHub → Cloudflare Pages.

1. Asegúrate de que el **build** instala dependencias (necesario para `@block65/webcrypto-web-push`):
   - **Build command:** `npm install` (o dejar vacío si Pages detecta `package.json` y hace install solo; si falla el bundle de Functions, usa `npm install`).
   - **Build output directory:** `/` (raíz del repo; los HTML están en la raíz).
2. Commit y push de estos archivos.
3. Espera a que el deploy termine.
4. Comprueba:
   - `https://tudominio.com/sw.js` → debe servir el Service Worker.
   - `https://tudominio.com/api/vapid-public-key` → JSON con `{ "ok": true, "publicKey": "..." }`.

### HTTPS y dominio personalizado

Web Push **exige HTTPS** (y mismo origen para el SW). Con dominio personalizado en Pages ya cumples este requisito.

---

## 5. Probar en local (opcional)

Requisites: Node 18+, cuenta Cloudflare autenticada (`npx wrangler login`).

```bash
npm install

# Variables locales (no se suben al git)
cp .env.example .dev.vars
# Edita .dev.vars con las claves generadas

# Sustituye los IDs de KV en wrangler.toml o pásalos por CLI
npm run pages:dev
# → http://localhost:8788 (puerto por defecto de wrangler pages dev)
```

Notas locales:

- El permiso de notificaciones y el SW funcionan en `localhost`.
- Algunos push services aceptan envíos desde local; si no llegan, prueba en producción.
- El binding KV de preview usa el `preview_id` de `wrangler.toml`.

---

## 6. Activar notificaciones como visitante

1. Abre `https://tudominio.com/blog.html`.
2. Clic en **Activar notificaciones**.
3. Acepta el permiso del navegador.
4. El botón pasa a *Notificaciones activadas ✓*.

Safari (macOS/iOS): requiere versión reciente y, en iOS, añadir a pantalla de inicio en algunos casos según versión. Chrome/Firefox/Edge en escritorio son los más fiables.

---

## 7. Enviar la primera notificación de prueba

```bash
export SITE_URL="https://tudominio.com"
export NOTIFY_SECRET="el-mismo-secret-de-cloudflare"

# Script helper
./scripts/send-notification.sh \
  "Prueba de notificación" \
  "Si lees esto, Web Push funciona ✨" \
  "/blog.html"

# O curl directo
curl -X POST "${SITE_URL}/api/notify" \
  -H "Authorization: Bearer ${NOTIFY_SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Prueba de notificación",
    "body": "Si lees esto, Web Push funciona",
    "url": "/blog.html",
    "icon": "/favicon.jpeg"
  }'
```

Respuesta esperada:

```json
{
  "ok": true,
  "total": 1,
  "sent": 1,
  "failed": 0,
  "cleaned": 0,
  "invalid": 0,
  "errors": []
}
```

La notificación debe aparecer aunque la pestaña del blog esté cerrada (el navegador debe estar abierto en segundo plano en escritorio; en móvil depende del SO).

### Tras publicar un post real

```bash
./scripts/send-notification.sh \
  "Título del post nuevo" \
  "Resumen corto del post…" \
  "/blog.html?post=ID_DEL_POST"
```

---

## 8. Integrar el botón en otras páginas

### Opción A — HTML + script (como en `blog.html`)

```html
<div class="push-notifications" id="push-notifications">
  <button type="button" class="push-btn" id="push-enable-btn" aria-pressed="false">
    Activar notificaciones
  </button>
  <p class="push-status" data-push-status role="status" aria-live="polite">
    Recibe un aviso cuando se publique un post nuevo.
  </p>
</div>

<script type="module">
  import { bindButton } from './js/push-notifications.js';
  bindButton('#push-enable-btn');
</script>
```

Los estilos están en `css/style.css` (clases `.push-notifications`, `.push-btn`, `.push-status`).

### Opción B — Llamada manual

```js
import { enable, getStatus } from './js/push-notifications.js';

const result = await enable();
console.log(result.message);
```

### Opción C — Sin módulo (global)

```html
<script type="module" src="./js/push-notifications.js"></script>
<script type="module">
  // El módulo asigna window.PushNotifications
  import './js/push-notifications.js';
  window.PushNotifications.bindButton('#push-enable-btn');
</script>
```

---

## 9. GitHub Action opcional

Hay un workflow de ejemplo en:

`.github/workflows/notify-on-deploy.example.yml`

1. Copia a `notify-on-deploy.yml`.
2. Secrets de GitHub Actions: `SITE_URL`, `NOTIFY_SECRET`.
3. Usa `workflow_dispatch` para disparo manual, o descomenta `on.push` a `main`.

Por defecto **no** se ejecuta automáticamente (solo el ejemplo comentado).

---

## 10. API de referencia

### `POST /api/subscribe`

```json
{
  "endpoint": "https://fcm.googleapis.com/...",
  "expirationTime": null,
  "keys": { "p256dh": "...", "auth": "..." }
}
```

Respuesta `200`: `{ "ok": true, "message": "..." }`

### `POST /api/notify`

Header: `Authorization: Bearer <NOTIFY_SECRET>`

```json
{
  "title": "Título",
  "body": "Resumen",
  "url": "/blog.html?post=abc",
  "icon": "/favicon.jpeg"
}
```

### `GET /api/vapid-public-key`

```json
{ "ok": true, "publicKey": "BPxxx..." }
```

---

## Solución de problemas

| Síntoma | Causa probable |
|---------|----------------|
| `/api/*` 404 | Functions no desplegadas; build sin `node_modules` / dependencia |
| `KV binding SUBSCRIPTIONS no configurado` | Binding mal nombrado o sin redeploy |
| `VAPID_* no configurada` | Faltan env vars en Production |
| `401` en notify | `NOTIFY_SECRET` incorrecto o sin header Bearer |
| Botón “No disponible” | HTTP (no HTTPS), o navegador sin Push API |
| Permiso denegado | Usuario bloqueó notificaciones; resetear en icono candado de la URL |
| `sent: 0`, `cleaned: 1` | Suscripción caducada; el usuario debe volver a activar |
| SW no se actualiza | Hard refresh o Application → Service Workers → Unregister |

### Límites del plan gratuito

- KV: generoso para un blog personal (lecturas/escrituras diarias).
- Pages Functions / Workers: el envío es I/O-bound; con cientos de suscriptores suele bastar. Si creces mucho, valora colas (Queues) o lotes.

---

## Seguridad

- Nunca expongas `VAPID_PRIVATE_KEY` ni `NOTIFY_SECRET` en el frontend ni en el repo.
- `/api/notify` solo con Bearer; no lo llames desde el navegador del visitante.
- La clave pública VAPID es pública por diseño.
- Las suscripciones en KV son datos sensibles de endpoint; el namespace no debe ser público.
