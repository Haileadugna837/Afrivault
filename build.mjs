import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await mkdir('dist/vendor', { recursive: true });
await cp('public/styles.css', 'dist/styles.css');
await cp('public/app.js', 'dist/app.js');
await cp('public/foundry.html', 'dist/index.html');
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
await cp('public/vendor/xlsx.full.min.js', 'dist/vendor/xlsx.full.min.js');
await cp('public/vendor/qrcode.js', 'dist/vendor/qrcode.js');
await cp('public/vendor/jsQR.js', 'dist/vendor/jsQR.js');

const html = await readFile('public/foundry.html', 'utf8');
const css = await readFile('public/styles.css', 'utf8');
const js = await readFile('public/app.js', 'utf8');
const xlsx = await readFile('public/vendor/xlsx.full.min.js', 'utf8');
const qr = await readFile('public/vendor/qrcode.js', 'utf8');
const jsqr = await readFile('public/vendor/jsQR.js', 'utf8');
const worker = `
const assets = {
  '/': { body: ${JSON.stringify(html)}, type: 'text/html; charset=utf-8' },
  '/index.html': { body: ${JSON.stringify(html)}, type: 'text/html; charset=utf-8' },
  '/styles.css': { body: ${JSON.stringify(css)}, type: 'text/css; charset=utf-8' },
  '/app.js': { body: ${JSON.stringify(js)}, type: 'text/javascript; charset=utf-8' },
  '/vendor/xlsx.full.min.js': { body: ${JSON.stringify(xlsx)}, type: 'text/javascript; charset=utf-8' },
  '/vendor/qrcode.js': { body: ${JSON.stringify(qr)}, type: 'text/javascript; charset=utf-8' },
  '/vendor/jsQR.js': { body: ${JSON.stringify(jsqr)}, type: 'text/javascript; charset=utf-8' }
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const asset = assets[url.pathname];
    if (!asset) return new Response('Not found', { status: 404 });
    return new Response(asset.body, {
      headers: {
        'content-type': asset.type,
        'cache-control': 'no-cache, no-store, must-revalidate',
        'x-content-type-options': 'nosniff'
      }
    });
  }
};
`;
await writeFile('dist/server/index.js', worker);
console.log('Foundry static app built to dist/');
