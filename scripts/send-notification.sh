#!/usr/bin/env bash
# Envía una notificación de prueba a todos los suscriptores.
#
# Uso:
#   export SITE_URL="https://tudominio.com"
#   export NOTIFY_SECRET="tu-secret"
#   ./scripts/send-notification.sh "Título" "Cuerpo" "/blog.html?post=id"
#
# O con argumentos posicionales y defaults:
#   SITE_URL=... NOTIFY_SECRET=... ./scripts/send-notification.sh

set -euo pipefail

TITLE="${1:-Nuevo post en el blog}"
BODY="${2:-Hay una nueva entrada. ¡Échale un vistazo!}"
URL="${3:-/blog.html}"
ICON="${4:-/favicon.jpeg}"

if [[ -z "${SITE_URL:-}" ]]; then
  echo "Error: define SITE_URL (ej. https://tudominio.com)" >&2
  exit 1
fi
if [[ -z "${NOTIFY_SECRET:-}" ]]; then
  echo "Error: define NOTIFY_SECRET" >&2
  exit 1
fi

SITE_URL="${SITE_URL%/}"

echo "→ POST ${SITE_URL}/api/notify"
echo "  title: ${TITLE}"
echo "  body:  ${BODY}"
echo "  url:   ${URL}"

curl -fsS -X POST "${SITE_URL}/api/notify" \
  -H "Authorization: Bearer ${NOTIFY_SECRET}" \
  -H "Content-Type: application/json" \
  -d "$(jq -n \
    --arg title "$TITLE" \
    --arg body "$BODY" \
    --arg url "$URL" \
    --arg icon "$ICON" \
    '{title:$title, body:$body, url:$url, icon:$icon}')" \
  | jq .

echo
echo "✓ Hecho"
