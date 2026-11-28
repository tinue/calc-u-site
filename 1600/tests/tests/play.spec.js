const { test, expect } = require('@playwright/test');

// The emulator itself is tested in the source repository tinue/Calc-U.
// These tests prove that the site embeds the pinned Web frontend: /play/
// mounts CalcU1600, it finds its worker, engine, ROMs and presets under
// /1600/calc/, each model starts, and the installable app opens. Stable
// hooks: the data-calcu attributes of docs/formats/web-embed.md.

function collectErrors(page) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  return errors;
}

// The LCD once it no longer changes: a start runs the ROM and the startup
// preset, which takes a moment.
async function settledLcd(page) {
  const lcd = page.locator('[data-calcu=lcd]');
  await expect(lcd).toBeVisible({ timeout: 15000 });
  await expect(page.locator('[data-calcu=start-failed]')).toHaveCount(0);
  let previous = '';
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(250);
    const now = await lcd.evaluate((c) => c.toDataURL());
    if (now === previous) return lcd;
    previous = now;
  }
  return lcd;
}

test('/play/ starts the emulator with no errors and nothing from another site', async ({ page }) => {
  const errors = collectErrors(page);
  const external = [];
  page.on('request', (r) => { if (!r.url().startsWith('http://localhost')) external.push(r.url()); });
  await page.goto('/1600/play/');
  await settledLcd(page);
  await expect(page.locator('[data-calcu=faceplate]')).toBeVisible();
  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toHaveLength(0);
  expect(external).toHaveLength(0);
});

// The start test: the display shows what the model shows after a start
// (with its startup preset). The reference pictures are in __screenshots__;
// a release that changes a start screen updates them with
// `npx playwright test --update-snapshots` and a look at the new picture.
for (const model of ['PC-1500', 'PC-1500A', 'PC-1600']) {
  test(`the ${model} starts and its display shows its start screen`, async ({ page }) => {
    await page.goto(`/1600/play/?model=${model}`);
    const lcd = await settledLcd(page);
    await expect(lcd).toHaveScreenshot(`lcd-${model}.png`, { maxDiffPixelRatio: 0.03 });
  });
}

test('/play/ fits a phone without scrolling sideways', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/1600/play/');
  await expect(page.locator('.calcu-client')).toHaveCount(1, { timeout: 15000 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('the installable app opens', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/1600/calc/app/');
  await settledLcd(page);
  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toHaveLength(0);
});
