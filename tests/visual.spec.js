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
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.toolbar')).toHaveScreenshot(
      `tools-${width}.png`,
      { animations: 'disabled' },
    );
    await expect(page.locator('.selection-bar')).toHaveScreenshot(
      `export-${width}.png`,
      { animations: 'disabled' },
    );
    for (const id of ['tenant-1', 'tenant-2', 'channels-5'])
      await page.locator(`#feature-${id} label`).click();
    await page.locator('#selected-only').click();
    // A real short workspace turns the tall toolbar static, so the inventory
    // image includes all selected headings without a sticky overlay.
    if (width >= 1024) await page.setViewportSize({ width, height: 420 });
    await expect(page.locator('.feature:visible')).toHaveCount(3);
    await expect(page.locator('#inventory')).toHaveScreenshot(
      `selection-${width}.png`,
      { animations: 'disabled' },
    );
  });
}
