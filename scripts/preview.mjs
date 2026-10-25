import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { createGzip } from 'node:zlib';

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf',
};

export async function startPreview(directory = 'out', port = 0) {
  const root = resolve(directory);
  if (!(await stat(resolve(root, 'index.html')).catch(() => null))?.isFile()) {
    throw new Error(`No production export in ${root}. Run NEXT_PUBLIC_BASE_PATH=/Portfolio npm run build first.`);
  }

  const server = createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (pathname === '/' || pathname === '/Portfolio') {
        response.writeHead(302, { Location: '/Portfolio/' }).end();
        return;
      }
      if (!pathname.startsWith('/Portfolio/')) {
        response.writeHead(404).end('Not found');
        return;
      }
      let file = resolve(root, pathname.slice('/Portfolio/'.length) || '.');
      if (file !== root && !file.startsWith(root + sep)) {
        response.writeHead(403).end('Forbidden');
        return;
      }
      let info = await stat(file).catch(() => null);
      if (info?.isDirectory()) {
        file = resolve(file, 'index.html');
        info = await stat(file).catch(() => null);
      }
      if (!info?.isFile()) {
        response.writeHead(404).end('Not found');
        return;
      }
      const type = types[extname(file).toLowerCase()] || 'application/octet-stream';
      const compressed = /text|javascript|json|svg/.test(type) && /\bgzip\b/.test(request.headers['accept-encoding'] || '');
      response.setHeader('Content-Type', type);
      response.setHeader('Cache-Control', type.startsWith('text/html') ? 'no-cache' : 'public, max-age=600');
      response.setHeader('X-Content-Type-Options', 'nosniff');
      if (compressed) {
        response.setHeader('Content-Encoding', 'gzip');
        response.setHeader('Vary', 'Accept-Encoding');
      } else response.setHeader('Content-Length', info.size);
      if (request.method === 'HEAD') { response.end(); return; }
      const stream = createReadStream(file);
      stream.on('error', () => response.destroy());
      if (compressed) stream.pipe(createGzip()).pipe(response);
      else stream.pipe(response);
    } catch {
      response.writeHead(400).end('Bad request');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  const address = server.address();
  return { server, url: `http://127.0.0.1:${address.port}/Portfolio/` };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({ options: { dir: { type: 'string', default: 'out' }, port: { type: 'string', default: '8001' } } });
  const { server, url } = await startPreview(values.dir, Number(values.port));
  console.log(`Production preview: ${url}`);
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
}
