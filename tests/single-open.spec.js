import { test, expect } from '@playwright/test';

async function groupState(page) {
  return page.evaluate(() => ({
    ids: [...document.querySelectorAll('.group')].map((group) => group.id),
    open: [...document.querySelectorAll('.group[open]')].map(
      (group) => group.id,
    ),
    crossCluster: document
      .querySelectorAll('.cluster')[1]
      .querySelector('.group').id,
    collapseText: document
      .querySelector('#collapse-all')
      .textContent.replace(/\s+/gu, ' ')
      .trim(),
    collapseDisabled: document.querySelector('#collapse-all').disabled,
    search: document.querySelector('#search').value,
    selectedOnly: document
      .querySelector('#selected-only')
      .getAttribute('aria-pressed'),
    checkedIds: [...document.querySelectorAll('.feature-check:checked')]
      .map((input) => input.value)
      .sort(),
  }));
}

test.describe('single-open inventory at 320px', () => {
  test.use({ viewport: { width: 320, height: 568 } });

  test('inventory accordion permits one open group across clusters and collapse is one-way', async ({
    page,
  }) => {
    await page.goto('./');
    await expect(page.locator('#search')).toBeEnabled();
    const initial = await groupState(page);
    expect(initial.ids).toHaveLength(49);
    expect(initial.open).toEqual([]);
    expect(initial.collapseText).toBe('Tüm başlıkları daralt');
    expect(initial.collapseDisabled).toBe(true);
    await page.locator(`#${initial.ids[0]} > summary`).click();
    expect((await groupState(page)).open).toEqual([initial.ids[0]]);
    await page.locator(`#${initial.ids[1]} > summary`).click();
    expect((await groupState(page)).open).toEqual([initial.ids[1]]);
    await page.locator(`#${initial.crossCluster} > summary`).click();
    expect((await groupState(page)).open).toEqual([initial.crossCluster]);
    await page.locator('#collapse-all').click();
    const collapsed = await groupState(page);
    expect(collapsed.open).toEqual([]);
    expect(collapsed.collapseDisabled).toBe(true);
  });

  test('filter and selection reveal only the original matching group', async ({
    page,
  }) => {
    await page.goto('./');
    await page.locator('#search').fill('kiracı');
    const filtered = await groupState(page);
    expect(filtered.open).toHaveLength(1);
    const firstOpen = filtered.open[0];
    await page.locator(`#${firstOpen} > summary`).click();
    await page.locator('#select-visible').click();
    expect((await groupState(page)).open).toEqual([]);
    await page.locator('#selected-only').click();
    expect((await groupState(page)).open).toEqual([firstOpen]);
    expect(await page.goto('./#feature-tenant-1')).toBeNull();
    const hash = await groupState(page);
    expect(hash.open).toEqual(['group-tenant']);
    expect(hash.search).toBe('kiracı');
    expect(hash.selectedOnly).toBe('true');
    await expect(page.locator('#feature-tenant-1')).toBeVisible();
  });

  test('hash reveals one group and repeated print restores exclusivity', async ({
    page,
  }) => {
    // Recreate the original selected/filter state with actual controls before
    // a same-document hash navigation; runtime filters must survive this seam.
    await page.goto('./');
    await page.locator('#search').fill('kiracı');
    await page.locator('#select-visible').click();
    await page.locator('#selected-only').click();
    const beforeHash = await groupState(page);
    expect(beforeHash.checkedIds.length).toBeGreaterThan(0);
    expect(await page.goto('./#feature-tenant-1')).toBeNull();
    const hash = await groupState(page);
    expect(hash.open).toEqual(['group-tenant']);
    expect(hash.search).toBe('kiracı');
    expect(hash.selectedOnly).toBe('true');
    expect(hash.checkedIds).toEqual(beforeHash.checkedIds);
    await expect(page.locator('#feature-tenant-1')).toBeVisible();
    const printed = await page.evaluate(() => {
      window.dispatchEvent(new Event('beforeprint'));
      window.dispatchEvent(new Event('beforeprint'));
      return document.querySelectorAll('.group[open]').length;
    });
    expect(printed).toBe(49);
    const restored = await page.evaluate(() => {
      window.dispatchEvent(new Event('afterprint'));
      return [...document.querySelectorAll('.group[open]')].map(
        (group) => group.id,
      );
    });
    expect(restored).toEqual(['group-tenant']);
    await page.locator('.group').nth(1).locator(':scope > summary').click();
    expect((await groupState(page)).open).toHaveLength(1);
  });
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
