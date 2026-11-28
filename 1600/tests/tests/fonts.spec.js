const { test, expect } = require('@playwright/test');

// The fonts come from /1600/fonts/, never from another site.

const PAGES = ['/1600/', '/1600/play/', '/1600/help/', '/1600/help/04-media/media/'];

test('every font comes from this site', async ({ page }) => {
  const fonts = [];
  page.on('request', (r) => { if (/\.(woff2?|ttf|otf)(\?|$)/.test(r.url()) || /fonts\.(googleapis|gstatic)/.test(r.url())) fonts.push(r.url()); });
  for (const p of PAGES) { await page.goto(p); await page.waitForLoadState('networkidle'); }
  expect(fonts.length).toBeGreaterThan(0);
  for (const u of fonts) expect(u, u).toMatch(/^http:\/\/localhost:8000\/1600\/(fonts|calc)\//);
});

test('Archivo, Barlow Condensed and IBM Plex Mono are loaded', async ({ page }) => {
  await page.goto('/1600/help/04-media/media/');
  await page.evaluate(() => document.fonts.ready);
  const loaded = await page.evaluate(async () => {
    await Promise.all(['400 16px Archivo', '700 16px Archivo', '700 13px "Barlow Condensed"', '400 14px "IBM Plex Mono"'].map((f) => document.fonts.load(f)));
    return ['400 16px Archivo', '700 16px "Barlow Condensed"', '400 16px "IBM Plex Mono"'].map((f) => document.fonts.check(f));
  });
  expect(loaded).toEqual([true, true, true]);
});
