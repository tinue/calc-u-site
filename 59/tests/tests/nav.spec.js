const { test, expect } = require('@playwright/test');

// The site lives under /59/. Home, Play and Software are React pages
// (routes.js); the help is static pages built from the help asset, reached
// by ordinary page loads.

test('home loads', async ({ page }) => {
  await page.goto('/59/');
  await expect(page.locator('h1')).toContainText('Calc-U');
});

test('the Help nav link opens the contents, and a chapter opens from it', async ({ page }) => {
  await page.goto('/59/');
  await page.click("nav a[href='/59/help/']");
  await expect(page).toHaveURL(/\/59\/help\/$/);
  await expect(page.locator('h1')).toHaveText(/help/i);
  await page.click(".help-index a[href='/59/help/07-debugger/']");
  await expect(page).toHaveURL(/\/59\/help\/07-debugger\/$/);
  await expect(page.locator('.help-article h1')).toBeVisible();
  await expect(page.locator('nav a.active')).toHaveAttribute('href', '/59/help/');
});

test('the home page cards lead into the help', async ({ page }) => {
  await page.goto('/59/');
  await page.click(".grid-3 a[href='/59/help/05-peripherals-and-paper/printer/']");
  await expect(page.locator('.help-article h1')).toContainText('printer');
});

test('the sidebar opens a chapter and lists its parts', async ({ page }) => {
  await page.goto('/59/help/01-introduction/');
  await page.click(".help-nav a[href='/59/help/06-presets/']");
  await expect(page).toHaveURL(/\/06-presets\/$/);
  const parts = page.locator('.help-nav li.open .help-parts a');
  await expect(parts).toHaveCount(3);
  await parts.nth(2).click();
  await expect(page).toHaveURL(/\/06-presets\/preset-tutorial\/$/);
  await expect(page.locator('.help-parts a[aria-current=page]')).toHaveAttribute('href', '/59/help/06-presets/preset-tutorial/');
});

test('next and previous walk the files in order', async ({ page }) => {
  await page.goto('/59/help/01-introduction/');
  await page.click('.help-steps a[rel=next]');
  await expect(page).toHaveURL(/\/02-getting-started\/$/);
  await page.click('.help-steps a[rel=next]');
  await expect(page).toHaveURL(/\/02-getting-started\/getting-started\/$/);
  await page.click('.help-steps a[rel=prev]');
  await expect(page).toHaveURL(/\/02-getting-started\/$/);
});

test('the breadcrumb leads back to the chapter and the contents', async ({ page }) => {
  await page.goto('/59/help/09-product-topics/faq/');
  await page.click(".help-crumb a[href='/59/help/09-product-topics/']");
  await expect(page).toHaveURL(/\/09-product-topics\/$/);
  await page.click(".help-crumb a[href='/59/help/']");
  await expect(page).toHaveURL(/\/59\/help\/$/);
});

test('a link to a heading of another file lands on it', async ({ page }) => {
  await page.goto('/59/help/02-getting-started/installing/');
  const link = page.locator(".help-article a[href*='02-getting-started/getting-started/#']").first();
  const href = await link.getAttribute('href');
  await link.click();
  const id = href.split('#')[1];
  await expect(page).toHaveURL(new RegExp(`#${id}$`));
  await expect(page.locator(`[id="${id}"]`)).toBeInViewport();
});

test('Back and Forward work across help pages and React pages', async ({ page }) => {
  await page.goto('/59/');
  await page.click("nav a[href='/59/help/']");
  await page.click(".help-nav a[href='/59/help/04-media/']");
  await page.goBack();
  await expect(page).toHaveURL(/\/59\/help\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/59\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/59\/help\/$/);
});

test('a Mermaid diagram is drawn from the site', async ({ page }) => {
  const external = [];
  page.on('request', (r) => { if (!r.url().startsWith('http://localhost')) external.push(r.url()); });
  await page.goto('/59/help/02-getting-started/');
  await expect(page.locator('pre.mermaid svg').first()).toBeVisible({ timeout: 10000 });
  expect(external).toHaveLength(0);
});

test('the menu button opens the navigation on a phone, on a help page too', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/59/', '/59/help/04-media/']) {
    await page.goto(path);
    await expect(page.locator('#site-nav .nav')).toBeHidden();
    await page.click('button.nav-toggle');
    await expect(page.locator('#site-nav .nav')).toBeVisible();
  }
});

test('no help page scrolls sideways on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/59/help/', '/59/help/10-reference/keyboard-map/', '/59/help/06-presets/presets/', '/59/help/09-product-topics/faq/']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
