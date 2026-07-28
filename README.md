# Sacred Geometry — Kirtan Teg Singh

Sitio estático (blog y portal) desplegado en **Cloudflare Pages** con dominio personalizado.

## Notificaciones Web Push

El sitio incluye notificaciones nativas del navegador para avisar de posts nuevos.

| Recurso | Descripción |
|---------|-------------|
| [docs/PUSH-NOTIFICATIONS.md](docs/PUSH-NOTIFICATIONS.md) | Guía completa: VAPID, KV, secrets, deploy, prueba |
| [docs/push-button-snippet.html](docs/push-button-snippet.html) | HTML/JS del botón para copiar |
| `npm run generate-vapid` | Genera claves VAPID + `NOTIFY_SECRET` |
| `./scripts/send-notification.sh` | Envía una notificación de prueba |

### Arranque rápido (este repo = el sitio en Pages)

```bash
npm install

# Automático (API Cloudflare): KV + secrets + binding
export CLOUDFLARE_API_TOKEN="..."
export CLOUDFLARE_ACCOUNT_ID="..."
export VAPID_SUBJECT="mailto:tu@email.com"
npm run setup-push

# Despliega el código (functions/, sw.js, blog.html…)
git add -A && git commit -m "feat: Web Push notifications" && git push
```

Manual: `npm run generate-vapid` + dashboard (ver docs).

Prueba:

```bash
export SITE_URL="https://tudominio.com"
export NOTIFY_SECRET="..."
./scripts/send-notification.sh "Hola" "Primera notificación" "/blog.html"
```

## Estructura relevante

```
functions/api/subscribe.js   POST  guardar PushSubscription
functions/api/notify.js      POST  enviar a todos (Bearer)
functions/api/vapid-public-key.js  GET clave pública
sw.js                        Service Worker
js/push-notifications.js     Cliente del botón
blog.html                    Botón integrado
wrangler.toml                Bindings de referencia
```

## Otros

- [TUTORIAL.md](TUTORIAL.md) — tutorial general del portal
- Comentarios del blog: Firebase (`js/firebase.js`)
