import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const visit = async (page) => {
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    'json',
  );
};
const downloadText = async (page, format) => {
  await page.locator(`[name="export-format"][value="${format}"]`).check();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#export-selected').click(),
  ]);
  const stream = await download.createReadStream();
  let text = '';
  for await (const chunk of stream) text += chunk;
  return text;
};

test('scope decisions filter independently, preserve old selections and export their full rationale', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.addInitScript(() =>
    localStorage.setItem(
      'saas-atlas-selection-v1',
      JSON.stringify(['tenant-1', 'identity-8', 'modules-2']),
    ),
  );
  await visit(page);
  await expect(page.locator('.feature')).toHaveCount(351);
  await expect(page.locator('.feature-check:checked')).toHaveCount(3);
  await page.locator('#roadmap-filters > summary').click();
  await page.locator('[data-scope-filter="required"]').click();
  const shown = page.locator('.feature:not([hidden])');
  expect(await shown.count()).toBeGreaterThan(0);
  expect(
    await shown.evaluateAll((xs) =>
      xs.every((x) => x.dataset.scope === 'required'),
    ),
  ).toBe(true);
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await page.locator('button[data-support="external"]').click();
  await page.locator('button[data-action="integrate"]').click();
  expect(await shown.count()).toBeGreaterThan(0);
  expect(
    await shown.evaluateAll((xs) =>
      xs.every(
        (x) =>
          x.dataset.scope === 'required' &&
          x.dataset.support === 'external' &&
          x.dataset.action === 'integrate',
      ),
    ),
  ).toBe(true);
  const json = JSON.parse(await downloadText(page, 'json'));
  expect(json.schemaVersion).toBe(3);
  expect(json.selectedCount).toBe(3);
  const items = json.clusters.flatMap((c) => c.groups.flatMap((g) => g.items));
  expect(items.find((x) => x.id === 'identity-8').planning.scope).toBe(
    'conditional',
  );
  expect(items.find((x) => x.id === 'modules-2').planning.scope).toBe(
    'implementation',
  );
  expect(items.every((x) => x.planning.reason && x.assessment.acceptance)).toBe(
    true,
  );
  expect(json.review.decisions.length).toBeGreaterThan(0);
  expect(
    json.review.decisions.every((d) =>
      d.itemIds.some((id) => items.some((x) => x.id === id)),
    ),
  ).toBe(true);
  const md = await downloadText(page, 'md');
  expect(md).toContain('Plan kapsamı');
  expect(md).toContain('Kapsam gerekçesi');
  await page.locator('#reset-all').click();
  await expect(page.locator('.feature:not([hidden])')).toHaveCount(351);
  await page.reload();
  await expect(page.locator('.feature-check:checked')).toHaveCount(3);
  await testInfo.attach('scope-selection-v3', {
    body: JSON.stringify(json, null, 2),
    contentType: 'application/json',
  });
});

test('review remains readable with native disclosures when JavaScript is disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 568 },
  });
  const page = await context.newPage();
  await page.goto('./');
  const review = page.locator('#scope-review');
  await expect(review).not.toHaveAttribute('open');
  await review.locator(':scope > summary').click();
  await expect(review).toHaveAttribute('open', '');
  await expect(review.locator('.review-coverage li')).toHaveCount(17);
  await page.locator('#group-identity > summary').click();
  await expect(page.locator('#feature-identity-8 .scope-note')).toContainText(
    'Ürüne bağlı',
  );
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await context.close();
});

test('scope review at 320 through desktop keeps text readable including 200% root size', async ({
  page,
}) => {
  await visit(page);
  await page.locator('#scope-review > summary').click();
  for (const width of [320, 360, 375, 390, 568, 768, 1280]) {
    await page.setViewportSize({ width, height: width === 568 ? 320 : 720 });
    const metrics = await page.locator('#scope-review').evaluate((el) => {
      const rootSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      return {
        contained: document.documentElement.scrollWidth <= innerWidth,
        readable: [...el.querySelectorAll('*')]
          .filter(
            (x) =>
              x.childNodes.length &&
              [...x.childNodes].some(
                (n) => n.nodeType === 3 && n.textContent.trim(),
              ),
          )
          .every((x) => parseFloat(getComputedStyle(x).fontSize) >= rootSize),
      };
    });
    expect(metrics.contained).toBe(true);
    expect(metrics.readable).toBe(true);
  }
  await page.setViewportSize({ width: 320, height: 480 });
  await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page
      .locator('#scope-review')
      .evaluate((el) =>
        [...el.querySelectorAll('p,a,dt,dd,h2,strong')].every(
          (x) => parseFloat(getComputedStyle(x).fontSize) >= 32,
        ),
      ),
  ).toBe(true);
});

test('scope review keyboard focus and accessible content at 320px', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await visit(page);
  await page.locator('#scope-review > summary').click();
  const summary = page.locator('#scope-review > summary');
  await summary.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  expect(
    await summary.evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(page.locator('#scope-review')).not.toHaveAttribute('open');
  await page.keyboard.press('Enter');
  await expect(page.locator('#scope-review')).toHaveAttribute('open', '');
  const axe = await new AxeBuilder({ page })
    .include('#scope-review')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(axe.violations).toEqual([]);
  await testInfo.attach('scope-review-320', {
    body: await page.locator('#scope-review').screenshot(),
    contentType: 'image/png',
  });
  await testInfo.attach('scope-review-axe', {
    body: JSON.stringify(axe, null, 2),
    contentType: 'application/json',
  });
});

test('review JSON supplies scope copy and changed rationale before render, search and export', async ({
  page,
}) => {
  const reason = 'JSON kaynaklı kapsam gerekçesi regresyonu.';
  await page.route('**/data/review.json', async (route) => {
    const response = await route.fetch();
    const review = await response.json();
    review.itemOverrides['tenant-1'] = { scope: 'advanced', reason };
    review.copy.title = 'JSON kapsam karar başlığı';
    await route.fulfill({ response, json: review });
  });
  await visit(page);
  await expect(page.locator('#scope-review > summary')).toContainText(
    'JSON kapsam karar başlığı',
  );
  await page.locator('#search').fill('JSON kaynaklı kapsam');
  await expect(page.locator('.feature:not([hidden])')).toHaveCount(1);
  const item = page.locator('#feature-tenant-1');
  await expect(item.locator('.scope-note')).toHaveText('İleri aşama');
  await item.locator('.feature-check').check();
  const exported = JSON.parse(await downloadText(page, 'json'));
  const selected = exported.clusters.flatMap((c) =>
    c.groups.flatMap((g) => g.items),
  )[0];
  expect(selected.planning).toEqual({
    scope: 'advanced',
    label: 'İleri aşama',
    reason,
  });
});

for (const failure of ['missing-group', 'dangling-decision', 'missing-copy'])
  test(`invalid review ${failure} uses full trusted fallback and preserves selection`, async ({
    page,
  }) => {
    await page.addInitScript(() =>
      localStorage.setItem(
        'saas-atlas-selection-v1',
        JSON.stringify(['tenant-1']),
      ),
    );
    await page.route('**/data/review.json', async (route) => {
      const response = await route.fetch();
      const review = await response.json();
      if (failure === 'missing-group') delete review.groupDefaults.access;
      else if (failure === 'dangling-decision')
        review.decisions[0].itemIds.push('missing-999');
      else delete review.copy.filterLabel;
      await route.fulfill({ response, json: review });
    });
    await page.goto('./');
    await expect(page.locator('body')).toHaveAttribute(
      'data-content-source',
      'fallback',
    );
    await expect(page.locator('.feature')).toHaveCount(351);
    await expect(page.locator('.feature-check:checked')).toHaveCount(1);
    const result = JSON.parse(await downloadText(page, 'json'));
    expect(result.schemaVersion).toBe(3);
    expect(result.selectedCount).toBe(1);
    expect(result.clusters[0].groups[0].items[0].id).toBe('tenant-1');
  });

for (const shape of ['object', 'extra-column'])
  test(`invalid CSV review columns ${shape} keep complete fallback and usable CSV`, async ({
    page,
  }) => {
    await page.route('**/data/messages.json', async (route) => {
      const response = await route.fetch();
      const data = await response.json();
      data.export.csv.reviewColumns =
        shape === 'object'
          ? { 0: 'Plan kapsamı', 1: 'Kapsam gerekçesi' }
          : ['Plan kapsamı', 'Kapsam gerekçesi', 'Extra'];
      await route.fulfill({ response, json: data });
    });
    await page.addInitScript(() =>
      localStorage.setItem(
        'saas-atlas-selection-v1',
        JSON.stringify(['tenant-1']),
      ),
    );
    await page.goto('./');
    await expect(page.locator('body')).toHaveAttribute(
      'data-content-source',
      'fallback',
    );
    await expect(page.locator('.feature')).toHaveCount(351);
    const csv = await downloadText(page, 'csv');
    expect(csv.split('\r\n')[0].split(',')).toHaveLength(18);
    expect(csv).toContain('Plan kapsamı');
  });

test('keyboard decision links reveal filtered features and continue focus at their target', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await visit(page);
  await page.locator('#roadmap-filters > summary').click();
  await page.locator('[data-scope-filter="required"]').click();
  await expect(page.locator('#feature-identity-8')).toBeHidden();
  await page.locator('#scope-review > summary').click();
  const link = page
    .locator('#scope-review a[data-jump="feature-identity-8"]')
    .first();
  await link.focus();
  await page.keyboard.press('Enter');
  const item = page.locator('#feature-identity-8');
  await expect(item).toBeVisible();
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await expect(page.locator('#group-identity')).toHaveAttribute('open', '');
  await expect(item.locator('.feature-check')).toBeFocused();
  await expect(item.locator('.feature-check')).not.toBeChecked();
  await page.keyboard.press('Tab');
  await expect(item.locator('.assessment > summary')).toBeFocused();
});
