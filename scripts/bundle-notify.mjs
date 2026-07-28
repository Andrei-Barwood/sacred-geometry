#!/usr/bin/env node
/**
 * Empaqueta scripts/src/notify.pages.js → functions/api/notify.js
 * sin dependencias npm en el deploy de Pages.
 */
import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = resolve(root, 'scripts/src/notify.pages.js');
const outfile = resolve(root, 'functions/api/notify.js');

await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  outfile,
  allowOverwrite: true,
  external: ['node:crypto'],
});

let code = readFileSync(outfile, 'utf8');
code = code.replace(
  /var impl = globalThis\.crypto \? globalThis\.crypto : await import\(["']node:crypto["']\);/,
  'var impl = globalThis.crypto;'
);
if (code.includes('node:crypto')) {
  throw new Error('Bundle still references node:crypto');
}
code =
  '/* Auto-bundled for Cloudflare Pages. Source: scripts/src/notify.pages.js — run npm run bundle:notify */\n' +
  code;
writeFileSync(outfile, code);
console.log('✓ functions/api/notify.js', code.length, 'bytes');
