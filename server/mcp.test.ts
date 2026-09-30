import { describe, expect, test } from 'bun:test';
import { Hono } from 'hono';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { createResortPassMcpApp, publicMcpPass } from './mcp';
import { getRoutePath } from '../src/i18n/routes';

const now = Date.parse('2026-09-30T12:00:00Z');
const siteUrl = 'https://tracker.example';
const options = {
  siteUrl, now: () => now,
  readStatus: () => ({
    silver: { available: true, lastCheck: '2026-09-30 11:59:00' },
    gold: { available: false, lastCheck: '2026-09-30T11:00:00Z' },
  }),
};

async function withClient(run: (client: Client) => Promise<void>) {
  const app = new Hono().route('/api/mcp', createResortPassMcpApp(options));
  const client = new Client({ name: 'resortpass-mcp-test', version: '1.0.0' });
  const transport = new StreamableHTTPClientTransport(new URL(`${siteUrl}/api/mcp`), {
    fetch: async (input, init) => app.fetch(new Request(input, init)),
  });
  try { await client.connect(transport); await run(client); }
  finally { await client.close(); }
}

describe('public read-only MCP', () => {
  test('negotiates official MCP transport and exposes only the three read-only tools', async () => {
    await withClient(async (client) => {
      const { tools } = await client.listTools();
      expect(tools.map((tool) => tool.name).sort()).toEqual(['find_guide', 'get_status', 'plan_visit']);
      for (const tool of tools) {
        expect(tool.annotations?.readOnlyHint).toBe(true);
        expect(tool.annotations?.destructiveHint).toBe(false);
        expect(tool.annotations?.openWorldHint).toBe(false);
      }
      expect(client.getServerCapabilities()?.tools).toBeDefined();
      expect(client.getServerCapabilities()?.resources).toBeUndefined();
      expect(client.getServerCapabilities()?.prompts).toBeUndefined();
      const unavailable = await client.callTool({ name: 'subscribe', arguments: { email: 'test@example.com' } });
      expect(unavailable.isError).toBe(true);
    });
  });

  test('keeps stale observations unknown and normalizes SQLite UTC timestamps', async () => {
    await withClient(async (client) => {
      const result = await client.callTool({ name: 'get_status', arguments: { language: 'fr' } });
      const data = result.structuredContent as Record<string, any>;
      expect(data.silver).toMatchObject({ state: 'available', lastCheck: '2026-09-30T11:59:00.000Z', fresh: true });
      expect(data.gold).toMatchObject({ state: 'unknown', available: null, fresh: false, ageMinutes: 60 });
      expect(data.url).toBe(`${siteUrl}/fr/`);
    });
    expect(publicMcpPass(null, now).state).toBe('unknown');
    expect(publicMcpPass({ available: false, lastCheck: 'invalid' }, now).state).toBe('unknown');
    expect(publicMcpPass({ available: true, lastCheck: '2026-09-30T12:02:00Z' }, now).state).toBe('unknown');
    expect(publicMcpPass({ available: false, lastCheck: '2026-09-30T11:15:00Z' }, now).state).toBe('sold_out');
    const value = { available: true, lastCheck: '2026-09-30T12:00:00Z', email: 'private@example.com', confirm_token: 'secret', waitTime: 35 };
    const serialized = JSON.stringify(publicMcpPass(value, now));
    expect(serialized).not.toMatch(/private|secret|waitTime/);
  });

  test('finds localized editorial guides and returns source and review context', async () => {
    await withClient(async (client) => {
      const result = await client.callTool({ name: 'find_guide', arguments: { language: 'he', topic: 'resortPassReservation' } });
      const data = result.structuredContent as Record<string, any>;
      expect(data.guides).toHaveLength(1);
      expect(data.guides[0].url).toBe(new URL(getRoutePath('resortPassReservation', 'he')!, siteUrl).href);
      expect(data.guides[0].sourceUrl).toBe('https://www.europapark.de/de/resortpass/faq');
      expect(data.guides[0].editorialCheckedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const search = await client.callTool({ name: 'find_guide', arguments: { language: 'fr', query: 'prix' } });
      expect((search.structuredContent as Record<string, any>).guides.length).toBeGreaterThan(0);
      const missing = await client.callTool({ name: 'find_guide', arguments: { query: 'zzzz-no-such-guide' } });
      expect((missing.structuredContent as Record<string, any>).guides).toEqual([]);
      expect((missing.structuredContent as Record<string, any>).availableTopics).toHaveLength(12);
    });
  });

  test('uses the website recommendation with an exclusive date range and no provider data', async () => {
    await withClient(async (client) => {
      const result = await client.callTool({ name: 'plan_visit', arguments: {
        language: 'fr', date: '2026-09-30', days: 1, crowd: 'high', group: 'family', includesRulantica: true,
      } });
      const data = result.structuredContent as Record<string, any>;
      expect(data.requestedDays).toBe(1);
      expect(data.recommendedDays).toBe(3);
      expect(data.dates).toEqual({ start: '2026-09-30', endExclusive: '2026-10-03' });
      expect(data.route).toHaveLength(4);
      expect(data.notes.length).toBeGreaterThan(2);
      expect(data.url).toBe(`${siteUrl}${getRoutePath('visitPlanner', 'fr')}#visit-planner`);
      expect(data).not.toHaveProperty('waitTimes');
      expect(data).not.toHaveProperty('crowdForecast');
      expect(data).not.toHaveProperty('booking');
      expect(data).not.toHaveProperty('calendarEvent');
    });
  });

  test('rejects impossible dates, oversized preferences, unknown parameters and unsupported languages', async () => {
    await withClient(async (client) => {
      for (const [name, args] of [
        ['plan_visit', { date: '2026-02-29' }],
        ['plan_visit', { days: 4 }],
        ['plan_visit', { language: 'xx' }],
        ['get_status', { subscriberToken: 'private' }],
        ['find_guide', { query: 'x'.repeat(201) }],
        ['find_guide', {}],
      ] as const) {
        expect((await client.callTool({ name, arguments: args })).isError).toBe(true);
      }
    });
  });

  test('rejects untrusted host/origin, limits bodies and offers no persistent event stream', async () => {
    let reads = 0;
    const app = createResortPassMcpApp({ ...options, readStatus: () => { reads++; return options.readStatus(); } });
    const request = { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' } };
    expect((await app.request(`${siteUrl}/`, { ...request, headers: { ...request.headers, Origin: 'https://evil.example' }, body: '{}' })).status).toBe(403);
    expect((await app.request('https://evil.example/', { ...request, body: '{}' })).status).toBe(403);
    expect((await app.request(`${siteUrl}/`, { ...request, body: JSON.stringify({ content: 'x'.repeat(9000) }) })).status).toBe(413);
    expect((await app.request(`${siteUrl}/`, { headers: { Accept: 'text/event-stream' } })).status).toBe(405);
    expect((await app.request(`${siteUrl}/`, { method: 'DELETE' })).status).toBe(405);
    expect(reads).toBe(0);
  });
});
