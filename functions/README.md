# Cloudflare Pages Functions — Web Push

Este directorio contiene los endpoints de la API de notificaciones push.

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/api/subscribe` | `POST` | Guarda una `PushSubscription` en KV |
| `/api/notify` | `POST` | Envía notificación a todos los suscriptores (Bearer token) |
| `/api/vapid-public-key` | `GET` | Devuelve la clave pública VAPID |

## Bindings y secrets necesarios

- **KV** `SUBSCRIPTIONS` — namespace de suscripciones
- `VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY` (secret)
- `VAPID_SUBJECT` (ej. `mailto:tu@email.com`)
- `NOTIFY_SECRET` (secret, Bearer token)

Consulta `docs/PUSH-NOTIFICATIONS.md` para el guía completa de despliegue.
