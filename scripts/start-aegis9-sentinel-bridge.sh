#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
BINARY_PATH="${REPO_ROOT}/bin/Aegis9CyberbrainEDR"

if [[ ! -x "${BINARY_PATH}" ]]; then
  echo "[ERROR] No se encontró el binario ejecutable en ${BINARY_PATH}" >&2
  exit 1
fi

echo "[AEGIS-9 SENTINEL BRIDGE] Iniciando puente nativo Swift 6 en http://127.0.0.1:9909 ..."
exec "${BINARY_PATH}" --pod-bridge-daemon
