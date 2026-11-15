// A browser I/O bridge only. The original programs still call input()/getline().
// Scope is limited to this terminal app; no portfolio routes are intercepted.
const sessions = new Map();
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('message', event => {
  const { type, token, line } = event.data || {};
  if (!token) return;
  if (type === 'open') {
    sessions.set(token, { owner: event.source.id, lines: [], pending: null, touched: Date.now() });
    event.ports[0]?.postMessage('ready');
  }
  const session = sessions.get(token);
  if (!session || session.owner !== event.source.id) return;
  session.touched = Date.now();
  if (type === 'line' || type === 'close') {
    const value = type === 'close' ? null : String(line);
    if (session.pending) session.pending(value);
    else session.lines.push(value);
    if (type === 'close') sessions.delete(token);
  }
  for (const [key, value] of sessions) {
    if (Date.now() - value.touched > 3600000 && !value.pending) sessions.delete(key);
  }
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname !== new URL('__stdin', self.registration.scope).pathname) return;
  event.respondWith((async () => {
    const session = sessions.get(url.searchParams.get('token'));
    if (!session) return new Response('', { status: 410 });
    session.touched = Date.now();
    // Short polling keeps a suspended user prompt within service-worker lifetimes.
    const line = session.lines.length ? session.lines.shift() : await new Promise(resolve => {
      const timer = setTimeout(() => { session.pending = null; resolve(undefined); }, 20000);
      session.pending = value => { clearTimeout(timer); session.pending = null; resolve(value); };
    });
    return new Response(line === undefined ? null : line ?? '', { status: line === undefined ? 204 : line === null ? 410 : 200, headers: { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' } });
  })());
});
