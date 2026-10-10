import { test, expect } from '@playwright/test';

// References are macOS-only. CI/Linux captures functional evidence separately;
// comparing different OS font rasterizers would not be deterministic.
test.skip(
  process.platform !== 'darwin',
  'Visual references target macOS; Linux comparison not_run.',
);
for (const width of [320, 1280]) {
  test(`visual regression at ${width}px: tools, export and three selected classes`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./');
    await expect(page.locator('.feature-check')).toHaveCount(326);
    await expect(page.locator('#search')).toBeEnabled();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.toolbar')).toHaveScreenshot(
      `tools-${width}.png`,
      { animations: 'disabled' },
    );
    await expect(page.locator('.selection-bar')).toHaveScreenshot(
      `export-${width}.png`,
      { animations: 'disabled' },
    );
    for (const id of ['tenant-1', 'tenant-2', 'channels-5']) {
      const row = page.locator(`#feature-${id}`);
      const group = row.locator(
        'xpath=ancestor::details[contains(@class,"group")]',
      );
      if ((await group.getAttribute('open')) === null) {
        await group.locator(':scope > summary').click();
        await expect(group).toHaveAttribute('open', '');
      }
      await row.locator('.feature-label').click();
    }
    await page.locator('#selected-only').click();
    // A real short workspace turns the tall toolbar static, so the inventory
    // image includes all selected headings without a sticky overlay.
    if (width >= 1024) await page.setViewportSize({ width, height: 420 });
    await expect(page.locator('.feature-check:checked')).toHaveCount(3);
    await expect(page.locator('.feature:not([hidden])')).toHaveCount(3);
    await expect(page.locator('.group[open]')).toHaveCount(1);
    const visible = await page
      .locator('.feature:visible')
      .evaluateAll((rows) => rows.map((row) => row.id));
    expect(visible.length).toBeGreaterThan(0);
    expect(
      visible.every((id) =>
        ['feature-tenant-1', 'feature-tenant-2', 'feature-channels-5'].includes(
          id,
        ),
      ),
    ).toBe(true);
    await expect(page.locator('#inventory')).toHaveScreenshot(
      `selection-${width}.png`,
      { animations: 'disabled' },
    );
  });
}
