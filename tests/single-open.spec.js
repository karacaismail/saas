import { test, expect } from '@playwright/test';

test('inventory accordion permits one open group across clusters and collapse is one-way', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  const groups = page.locator('.group');
  await expect(groups).toHaveCount(49);
  await expect(page.locator('.group[open]')).toHaveCount(0);
  const collapse = page.locator('#collapse-all');
  await expect(collapse).toHaveText('Tüm başlıkları daralt');
  await expect(collapse).toBeDisabled();
  await groups.nth(0).locator(':scope > summary').click();
  await expect(groups.nth(0)).toHaveAttribute('open', '');
  await groups.nth(1).locator(':scope > summary').click();
  await expect(groups.nth(0)).not.toHaveAttribute('open');
  await expect(groups.nth(1)).toHaveAttribute('open', '');
  const anotherCluster = page
    .locator('.cluster')
    .nth(1)
    .locator('.group')
    .first();
  await anotherCluster.locator(':scope > summary').click();
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await expect(anotherCluster).toHaveAttribute('open', '');
  await collapse.click();
  await expect(page.locator('.group[open]')).toHaveCount(0);
  await expect(collapse).toBeDisabled();
});

test('filter, hash and selection reveal only one matching group and print restores exclusivity', async ({
  page,
}) => {
  await page.goto('./');
  await page.locator('#search').fill('kiracı');
  await expect(page.locator('.group[open]')).toHaveCount(1);
  const firstOpen = await page.locator('.group[open]').getAttribute('id');
  await page.locator('.group[open] > summary').click();
  await page.locator('#select-visible').click();
  await expect(page.locator('.group[open]')).toHaveCount(0);
  await page.locator('#selected-only').click();
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await expect(page.locator(`#${firstOpen}`)).toHaveAttribute('open', '');
  await page.goto('./#feature-tenant-1');
  await expect(page.locator('#feature-tenant-1')).toBeVisible();
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await expect(page.locator('#group-tenant')).toHaveAttribute('open', '');
  await page.evaluate(() => {
    window.dispatchEvent(new Event('beforeprint'));
    window.dispatchEvent(new Event('beforeprint'));
  });
  await expect(page.locator('.group[open]')).toHaveCount(49);
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await expect(page.locator('#group-tenant')).toHaveAttribute('open', '');
  await page.locator('.group').nth(1).locator(':scope > summary').click();
  await expect(page.locator('.group[open]')).toHaveCount(1);
});

test('without JavaScript native group names keep one disclosure open across clusters', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 568 },
  });
  try {
    const page = await context.newPage();
    await page.goto('./');
    const first = page.locator('.group').first();
    const second = page.locator('.cluster').nth(1).locator('.group').first();
    await first.locator(':scope > summary').click();
    await expect(first).toHaveAttribute('open', '');
    await second.locator(':scope > summary').click();
    await expect(first).not.toHaveAttribute('open');
    await expect(second).toHaveAttribute('open', '');
    await expect(page.locator('.group[open]')).toHaveCount(1);
  } finally {
    await context.close();
  }
});
