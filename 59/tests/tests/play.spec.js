const { test, expect } = require('@playwright/test');

// The calculator itself is tested in the Calc-U-59 repository (Web/tests/).
// These tests only prove that the site embeds the imported client correctly:
// /play/ mounts it, it finds its worker, engine and presets under
// /59/calc/, and the standalone app opens. Stable hooks: Calc-U-59's
// reference/WebClient.md, "Stable hooks a host's tests may rely on".

test.describe.configure({ timeout: 20000 });

function collectErrors(page) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  return errors;
}

async function ready(page) {
  await expect(page.locator('.calcu-device')).toHaveCount(1);
  await expect(page.getByText('Starting the emulator')).toHaveCount(0, { timeout: 15000 });
  await page.waitForTimeout(500); // the TI-59 boots in real time; early keys are lost
}

async function settledDisplay(page) {
  let previous = await page.locator('canvas').first().evaluate((c) => c.toDataURL());
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(250);
    const now = await page.locator('canvas').first().evaluate((c) => c.toDataURL());
    if (now === previous) return now;
    previous = now;
  }
  return previous;
}

async function press(page, labels) {
  for (const label of labels) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForTimeout(200);
  }
}

test('/play/ starts the engine with no errors', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/59/play/');
  await ready(page);
  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toHaveLength(0);
});

test('/play/ computes through the engine', async ({ page }) => {
  await page.goto('/59/play/');
  await ready(page);
  await press(page, ['2', '+', '2', '=']);
  const viaAddition = await settledDisplay(page);

  await page.goto('/59/play/');
  await ready(page);
  await press(page, ['5', '−', '1', '=']);
  expect(await settledDisplay(page)).toBe(viaAddition);
});

test('/play/ offers the presets from calc/presets/', async ({ page }) => {
  await page.goto('/59/play/');
  await ready(page);
  await expect(page.locator('select').nth(1).locator('option', { hasText: 'Calculator diagnostic' })).toHaveCount(1);
});

test('client-side navigation to /play/ mounts the calculator', async ({ page }) => {
  await page.goto('/59/');
  await page.click("nav a[href='/59/play/']");
  await expect(page).toHaveURL(/\/59\/play\/$/);
  await ready(page);
});

test('the standalone app opens', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/59/calc/app/');
  await ready(page);
  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toHaveLength(0);
});
