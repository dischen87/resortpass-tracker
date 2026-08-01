const upstream = 'http://127.0.0.1:4324';

Bun.serve({
  hostname: '127.0.0.1',
  port: 4323,
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/api/status') {
      const lastCheck = new Date().toISOString();
      return Response.json({
        silver: { available: false, state: 'sold_out', lastCheck },
        gold: { available: false, state: 'sold_out', lastCheck },
      });
    }
    if (url.pathname === '/api/subscriber-count') return Response.json({ count: 2847 });
    if (url.pathname === '/api/history-stats') return Response.json({});
    if (url.pathname === '/api/recent-checks') return Response.json([]);
    if (url.pathname === '/api/news') return Response.json({ items: [] });
    if (url.pathname === '/api/community') return Response.json({ posts: [], total: 0 });

    const headers = new Headers(request.headers);
    headers.delete('host');
    return fetch(`${upstream}${url.pathname}${url.search}`, {
      method: request.method,
      headers,
    });
  },
});

console.log('Mock QA proxy running on http://127.0.0.1:4323');
