const { test, expect } = require('@playwright/test');

// /1600/: the home and play pages are the site's own; the help is the
// pages built from the pinned help asset.

test('home → help → a chapter', async ({ page }) => {
  await page.goto('/1600/');
  await expect(page.locator('h1')).toContainText('Calc-U');
  await page.click(".nav a[href='/1600/help/']");
  await expect(page).toHaveURL(/\/1600\/help\/$/);
  await page.click(".help-index a[href='/1600/help/04-media/']");
  await expect(page.locator('.help-article h1')).toBeVisible();
  await expect(page.locator('.nav a.on')).toHaveAttribute('href', '/1600/help/');
});

test('the home cards and the download box lead where they say', async ({ page }) => {
  await page.goto('/1600/');
  await page.click(".grid-3 a[href='/1600/help/09-product-topics/basic-programs/']");
  await expect(page.locator('.help-article h1')).toContainText('BASIC');
  await page.goto('/1600/');
  await page.click("a.btn[href='#download']");
  await expect(page.locator('#download')).toBeInViewport();
  await expect(page.locator('#download .downloads a')).toHaveCount(5);
});

test('the sidebar opens a chapter and its parts', async ({ page }) => {
  await page.goto('/1600/help/01-introduction/');
  await page.click(".help-nav a[href='/1600/help/09-product-topics/']");
  const parts = page.locator('.help-nav li.open .help-parts a');
  await expect(parts).toHaveCount(8);
  await page.click(".help-parts a[href='/1600/help/09-product-topics/host-drive/']");
  await expect(page.locator('.help-parts a[aria-current=page]')).toHaveAttribute('href', '/1600/help/09-product-topics/host-drive/');
});

test('next and previous walk the files; the breadcrumb goes back up', async ({ page }) => {
  await page.goto('/1600/help/04-media/');
  await page.click('.help-steps a[rel=next]');
  await expect(page).toHaveURL(/\/04-media\/media\/$/);
  await page.click('.help-steps a[rel=prev]');
  await expect(page).toHaveURL(/\/04-media\/$/);
  await page.goto('/1600/help/04-media/media/');
  await page.click(".help-crumb a[href='/1600/help/04-media/']");
  await expect(page).toHaveURL(/\/04-media\/$/);
});

test('a link to a heading of another file lands on it', async ({ page }) => {
  await page.goto('/1600/help/01-introduction/');
  await page.click(".help-article a[href='/1600/help/02-getting-started/getting-started/#the-browser-version']");
  await expect(page.locator('#the-browser-version')).toBeInViewport();
});

test('Mermaid diagrams are drawn from the site', async ({ page }) => {
  const external = [];
  page.on('request', (r) => { if (!r.url().startsWith('http://localhost')) external.push(r.url()); });
  await page.goto('/1600/help/07-debugger/debugger/');
  await expect(page.locator('pre.mermaid svg')).toHaveCount(4, { timeout: 10000 });
  expect(external).toHaveLength(0);
});

test('Back and Forward', async ({ page }) => {
  await page.goto('/1600/');
  await page.click(".nav a[href='/1600/help/']");
  await page.click(".help-nav a[href='/1600/help/06-presets/']");
  await page.goBack();
  await expect(page).toHaveURL(/\/1600\/help\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/06-presets\/$/);
});

test('no page scrolls sideways on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/1600/', '/1600/help/', '/1600/help/10-reference/keyboard-map/', '/1600/help/04-media/media/', '/1600/help/07-debugger/debugger/']) {
    await page.goto(path);
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
