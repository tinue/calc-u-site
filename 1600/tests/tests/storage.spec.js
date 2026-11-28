const { test, expect } = require('@playwright/test');

// /59/ and /1600/ are one origin (calc-u.org). What their Web frontends
// keep in the browser must stay apart: each its own IndexedDB database and
// its own Web Lock (docs/formats/web-embed.md §5), so with both open in
// one browser each still keeps its files.

test('Calc-U-59 and Calc-U-1600 open in one browser keep their stores apart', async ({ context }) => {
  const p59 = await context.newPage();
  const p1600 = await context.newPage();
  await p59.goto('/59/play/');
  await p1600.goto('/1600/play/');
  await expect(p59.locator('.calcu-device')).toHaveCount(1, { timeout: 15000 });
  await expect(p1600.locator('[data-calcu=lcd]')).toBeVisible({ timeout: 15000 });
  await p1600.waitForTimeout(2000);

  // Neither is the "second copy" that keeps nothing.
  await expect(p59.locator('[data-calcu=storage-banner]')).toHaveCount(0);
  await expect(p1600.locator('[data-calcu=storage-banner]')).toHaveCount(0);

  const names = await p1600.evaluate(async () => (await indexedDB.databases()).map((d) => d.name).sort());
  expect(names).toContain('/persist-calc-u-59');
  expect(names).toContain('/persist');
  const locks = await p1600.evaluate(async () => (await navigator.locks.query()).held.map((l) => l.name).sort());
  expect(locks).toEqual(expect.arrayContaining(['calcu59-storage', 'calcu1600-storage']));
});
