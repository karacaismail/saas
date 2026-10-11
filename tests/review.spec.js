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

async function prepareScopeSelection(page) {
  await page.addInitScript(() =>
    localStorage.setItem(
      'saas-atlas-selection-v1',
      JSON.stringify(['tenant-1', 'identity-8', 'modules-2']),
    ),
  );
  await visit(page);
  const initial = await page.evaluate(() => ({
    features: document.querySelectorAll('.feature').length,
    selected: document.querySelectorAll('.feature-check:checked').length,
  }));
  expect(initial).toEqual({ features: 387, selected: 3 });
}

async function applyScopeIntersection(page) {
  await page.locator('#roadmap-filters > summary').click();
  await page.locator('[data-scope-filter="required"]').click();
  await page.locator('button[data-support="external"]').click();
  await page.locator('button[data-action="integrate"]').click();
  const intersection = await page.evaluate(() => ({
    active: [
      '[data-scope-filter="required"]',
      'button[data-support="external"]',
      'button[data-action="integrate"]',
    ].map((selector) =>
      document.querySelector(selector).getAttribute('aria-pressed'),
    ),
    rows: [...document.querySelectorAll('.feature:not([hidden])')].map(
      (element) => [
        element.dataset.scope,
        element.dataset.support,
        element.dataset.action,
      ],
    ),
  }));
  expect(intersection.active).toEqual(['true', 'true', 'true']);
  expect(intersection.rows.length).toBeGreaterThan(0);
  expect(
    intersection.rows.every(
      ([scope, support, action]) =>
        scope === 'required' &&
        support === 'external' &&
        action === 'integrate',
    ),
  ).toBe(true);
}

test.describe('scope decisions and preserved selections at 320px', () => {
  test.use({ viewport: { width: 320, height: 568 } });

  test('scope decisions filter independently, preserve old selections through reset and reload', async ({
    page,
  }) => {
    await prepareScopeSelection(page);
    await page.locator('#roadmap-filters > summary').click();
    await page.locator('[data-scope-filter="required"]').click();
    const required = await page.evaluate(() => ({
      shown: [...document.querySelectorAll('.feature:not([hidden])')].map(
        (element) => element.dataset.scope,
      ),
      openGroups: document.querySelectorAll('.group[open]').length,
    }));
    expect(required.shown.length).toBeGreaterThan(0);
    expect(required.shown.every((scope) => scope === 'required')).toBe(true);
    expect(required.openGroups).toBe(1);
    await page.locator('button[data-support="external"]').click();
    await page.locator('button[data-action="integrate"]').click();
    const intersection = await page
      .locator('.feature:not([hidden])')
      .evaluateAll((elements) => ({
        count: elements.length,
        matching: elements.every(
          (element) =>
            element.dataset.scope === 'required' &&
            element.dataset.support === 'external' &&
            element.dataset.action === 'integrate',
        ),
      }));
    expect(intersection.count).toBeGreaterThan(0);
    expect(intersection.matching).toBe(true);
    await page.locator('#reset-all').click();
    await expect(page.locator('.feature:not([hidden])')).toHaveCount(387);
    await page.reload();
    await expect(page.locator('.feature-check:checked')).toHaveCount(3);
  });

  test('scope decisions export selected full JSON rationale under intersecting active filters', async ({
    page,
  }, testInfo) => {
    await prepareScopeSelection(page);
    await applyScopeIntersection(page);
    const json = JSON.parse(await downloadText(page, 'json'));
    expect(json.schemaVersion).toBe(3);
    expect(json.selectedCount).toBe(3);
    const items = json.clusters.flatMap((c) =>
      c.groups.flatMap((g) => g.items),
    );
    expect(items.find((x) => x.id === 'identity-8').planning.scope).toBe(
      'conditional',
    );
    expect(items.find((x) => x.id === 'modules-2').planning.scope).toBe(
      'implementation',
    );
    expect(
      items.every((x) => x.planning.reason && x.assessment.acceptance),
    ).toBe(true);
    expect(json.review.decisions.length).toBeGreaterThan(0);
    expect(
      json.review.decisions.every((d) =>
        d.itemIds.some((id) => items.some((x) => x.id === id)),
      ),
    ).toBe(true);
    await testInfo.attach('scope-selection-v3', {
      body: JSON.stringify(json, null, 2),
      contentType: 'application/json',
    });
  });

  test('scope decisions export selected Markdown scope and rationale under intersecting active filters', async ({
    page,
  }) => {
    await prepareScopeSelection(page);
    await applyScopeIntersection(page);
    const md = await downloadText(page, 'md');
    expect(md).toContain('Plan kapsamı');
    expect(md).toContain('Kapsam gerekçesi');
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

const reviewWidths = [320, 360, 375, 390, 568, 768, 1280];

// Each new segment revisits the previous segment's last width, retaining every
// original adjacent resize transition and the open native review throughout.
test.describe('scope review responsive journey', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const [start, end] of [
    [0, 3],
    [3, 5],
    [5, 7],
  ]) {
    const widths = reviewWidths.slice(Math.max(0, start - 1), end);
    test(`scope review at 320 through desktop keeps text readable: ${widths.join(' to ')}`, async ({
      page,
    }) => {
      await visit(page);
      const review = page.locator('#scope-review');
      await expect(review).not.toHaveAttribute('open');
      await review.locator(':scope > summary').click();
      for (const width of widths) {
        await page.setViewportSize({
          width,
          height: width === 568 ? 320 : 720,
        });
        const metrics = await review.evaluate((el) => {
          const rootSize = parseFloat(
            getComputedStyle(document.documentElement).fontSize,
          );
          return {
            open: el.open,
            contained: document.documentElement.scrollWidth <= innerWidth,
            readable: [...el.querySelectorAll('*')]
              .filter(
                (element) =>
                  element.childNodes.length &&
                  [...element.childNodes].some(
                    (node) => node.nodeType === 3 && node.textContent.trim(),
                  ),
              )
              .every(
                (element) =>
                  parseFloat(getComputedStyle(element).fontSize) >= rootSize,
              ),
          };
        });
        expect(metrics.open).toBe(true);
        expect(metrics.contained).toBe(true);
        expect(metrics.readable).toBe(true);
      }
    });
  }

  test('scope review desktop to 320x480 stays readable through the real 200% root resize', async ({
    page,
  }) => {
    await visit(page);
    const review = page.locator('#scope-review');
    await expect(review).not.toHaveAttribute('open');
    await review.locator(':scope > summary').click();
    await page.setViewportSize({ width: 320, height: 480 });
    const metrics = await review.evaluate((el) => {
      document.documentElement.style.fontSize = '200%';
      return {
        open: el.open,
        contained: document.documentElement.scrollWidth <= innerWidth,
        readable: [...el.querySelectorAll('p,a,dt,dd,h2,strong')].every(
          (element) => parseFloat(getComputedStyle(element).fontSize) >= 32,
        ),
      };
    });
    expect(metrics.open).toBe(true);
    expect(metrics.contained).toBe(true);
    expect(metrics.readable).toBe(true);
  });
});

test('scope review keyboard focus and native disclosure at 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await visit(page);
  await page.locator('#scope-review > summary').click();
  const summary = page.locator('#scope-review > summary');
  await summary.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(summary).toBeFocused();
  expect(
    await summary.evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(page.locator('#scope-review')).not.toHaveAttribute('open');
  await page.keyboard.press('Enter');
  await expect(page.locator('#scope-review')).toHaveAttribute('open', '');
});

test('scope review accessible content at 320px', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await visit(page);
  await page.locator('#scope-review > summary').click();
  const axe = await new AxeBuilder({ page })
    .include('#scope-review')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(axe.violations).toEqual([]);
  await testInfo.attach('scope-review-axe', {
    body: JSON.stringify(axe, null, 2),
    contentType: 'application/json',
  });
});

for (const [batchIndex, region] of ['upper', 'middle', 'lower'].entries())
  test(`scope review complete image slices at 320px: ${region}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await visit(page);
    await page.locator('#scope-review > summary').click();
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    // Preserve the original full document-coordinate image plan, while
    // bounding each independent case's screenshot and trace workload.
    const bounds = await page.locator('#scope-review').evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.x + scrollX,
        y: rect.y + scrollY,
        width: rect.width,
        height: rect.height,
      };
    });
    expect(bounds.width).toBeGreaterThan(0);
    expect(bounds.height).toBeGreaterThan(0);
    const slices = [];
    for (let offset = 0; offset < bounds.height; offset += 8000) {
      slices.push({
        x: bounds.x,
        y: bounds.y + offset,
        width: bounds.width,
        height: Math.min(8000, bounds.height - offset),
      });
    }
    expect(slices.reduce((sum, slice) => sum + slice.height, 0)).toBe(
      bounds.height,
    );
    expect(slices[0].y).toBe(bounds.y);
    const lastSlice = slices.at(-1);
    expect(lastSlice.y + lastSlice.height).toBe(bounds.y + bounds.height);
    for (const [index, slice] of slices.entries()) {
      expect(slice.x).toBe(bounds.x);
      expect(slice.width).toBe(bounds.width);
      expect(slice.height).toBeGreaterThan(0);
      expect(slice.height).toBeLessThanOrEqual(8000);
      expect(slice.y).toBe(bounds.y + index * 8000);
      if (index > 0)
        expect(slice.y).toBe(slices[index - 1].y + slices[index - 1].height);
    }
    // Every planned slice belongs to a batch. Very short reviews may repeat
    // one slice so each case retains real image evidence.
    const batches = [0, 1, 2].map((index) => {
      const first = Math.floor((slices.length * index) / 3);
      const after = Math.max(
        first + 1,
        Math.floor((slices.length * (index + 1)) / 3),
      );
      return slices.slice(first, after).map((_, offset) => first + offset);
    });
    expect([...new Set(batches.flat())]).toEqual(
      slices.map((_, index) => index),
    );
    const capturedSliceIndices = batches[batchIndex];
    expect(capturedSliceIndices.length).toBeGreaterThan(0);
    for (const index of capturedSliceIndices)
      await testInfo.attach(`scope-review-320-slice-${index}`, {
        body: await page.screenshot({ fullPage: true, clip: slices[index] }),
        contentType: 'image/png',
      });
    await testInfo.attach('scope-review-image-bounds', {
      body: JSON.stringify(
        { bounds, slices, batches, region, capturedSliceIndices },
        null,
        2,
      ),
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
    await expect(page.locator('.feature')).toHaveCount(387);
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
    await expect(page.locator('.feature')).toHaveCount(387);
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
