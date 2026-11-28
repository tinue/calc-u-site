const { test, expect } = require('@playwright/test');
const { REDIRECTS } = require('../../redirects.js');
const { LEGACY_HASHES } = require('../../routes.js');

// Every address of the old hand-written help, and every old #hash, lands
// where its content is now (redirects.js, routes.js).

const expected = (to) => new RegExp(`/59${to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);

for (const [from, to] of Object.entries(REDIRECTS)) {
  test(`${from} → ${to}`, async ({ page }) => {
    await page.goto(`/59${from}`);
    await expect(page).toHaveURL(expected(to));
    await expect(page.locator('h1')).toBeVisible();
  });
}

for (const [hash, to] of Object.entries(LEGACY_HASHES)) {
  if (!hash) continue;
  test(`/59/#${hash} → ${to}`, async ({ page }) => {
    await page.goto(`/59/#${hash}`);
    await expect(page).toHaveURL(expected(to));
    await expect(page.locator('h1')).toBeVisible();
  });
}

test('an old deep link keeps the #hash it was given', async ({ page }) => {
  await page.goto('/59/getting-started/printer/#the-paper');
  await expect(page).toHaveURL(/\/59\/help\/05-peripherals-and-paper\/printer\/#the-paper$/);
});
