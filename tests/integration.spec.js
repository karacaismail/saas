import { test, expect } from '@playwright/test';

const newIds = [
  'integration-9',
  'integration-10',
  'integration-11',
  'integration-12',
  'integration-13',
  'integration-14',
  'transfer-7',
];
const modelIds = ['integration-5', 'realtime-1', ...newIds];

async function visit(page) {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    'json',
  );
}

async function openItem(page, id) {
  const groupId = id.slice(0, id.lastIndexOf('-'));
  const group = page.locator(`#group-${groupId}`);
  if (!(await group.evaluate((el) => el.open)))
    await group.locator(':scope > summary').click();
  return page.locator(`#feature-${id}`);
}

async function downloadText(page, format) {
  await page.locator(`[name="export-format"][value="${format}"]`).check();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#export-selected').click(),
  ]);
  let result = '';
  for await (const chunk of await download.createReadStream()) result += chunk;
  return result;
}

test('required integration models remain selectable and export their full Frappe and delivery rationale', async ({
  page,
}, testInfo) => {
  await visit(page);
  await expect(page.locator('.feature')).toHaveCount(351);
  await expect(page.locator('.group[open]')).toHaveCount(0);
  for (const id of modelIds) {
    const item = await openItem(page, id);
    await expect(item).toHaveAttribute('data-scope', 'required');
    await item.locator('.feature-check').check();
    await expect(page.locator('.group[open]')).toHaveCount(1);
  }
  await page.locator('#search').fill('GraphQL');
  await expect(page.locator('#feature-integration-10')).toBeVisible();
  const exported = JSON.parse(await downloadText(page, 'json'));
  const items = exported.clusters.flatMap((c) =>
    c.groups.flatMap((g) => g.items),
  );
  expect(items.map((x) => x.id).sort()).toEqual([...modelIds].sort());
  expect(items.every((x) => x.planning.scope === 'required')).toBe(true);
  for (const id of newIds) {
    const item = items.find((x) => x.id === id);
    expect(item.assessment.reviewedAt).toBe('2026-10-11');
    expect(item.assessment.note).toBeTruthy();
    expect(item.assessment.acceptance).toBeTruthy();
    expect(item.assessment.sources.length).toBeGreaterThan(0);
    expect(item.planning.reason).toBeTruthy();
  }
  const ws = items.find((x) => x.id === 'realtime-1');
  expect(ws.planning.reason).toMatch(/Socket\.IO/);
  expect(ws.planning.reason).toMatch(/WebSocket/);
  const mcp = items.find((x) => x.id === 'integration-13');
  expect(mcp.assessment.acceptance).toMatch(/Keycloak audience/);
  const mapping = items.find((x) => x.id === 'integration-14');
  expect(mapping.assessment.acceptance).toMatch(/onay/i);
  expect(
    exported.review.decisions.some((d) => d.itemIds.includes('integration-13')),
  ).toBe(true);
  for (const format of ['md', 'csv']) {
    const text = await downloadText(page, format);
    for (const name of ['GraphQL', 'SOAP', 'MCP', 'XML', 'JSON', 'CSV', 'XLSX'])
      expect(text).toContain(name);
    expect(text).toMatch(/onay/i);
  }
  await testInfo.attach('integration-selected-context', {
    body: JSON.stringify(exported, null, 2),
    contentType: 'application/json',
  });
});

test('new integration requirements remain readable at narrow widths and without JavaScript', async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 568 },
  });
  const page = await context.newPage();
  await page.goto('./');
  await expect(page.locator('.feature')).toHaveCount(351);
  for (const id of newIds) {
    const item = await openItem(page, id);
    await expect(item.locator('.feature-title')).toBeVisible();
    await item.locator('.assessment > summary').click();
    await expect(item.locator('.assessment-body')).toBeVisible();
    await expect(item.locator('.assessment-basis')).toHaveAttribute(
      'data-reviewed-at',
      '2026-10-11',
    );
    await expect(item.locator('.assessment-basis')).toContainText('2026-10-11');
    const metrics = await item.evaluate((el) => ({
      contained: document.documentElement.scrollWidth <= innerWidth,
      readable: [
        ...el.querySelectorAll(
          '.feature-title, .scope-note, .assessment-body p',
        ),
      ].every(
        (x) =>
          parseFloat(getComputedStyle(x).fontSize) >=
          parseFloat(getComputedStyle(document.documentElement).fontSize),
      ),
    }));
    expect(metrics.contained).toBe(true);
    expect(metrics.readable).toBe(true);
    await expect(page.locator('.group[open]')).toHaveCount(1);
  }
  const item = page.locator('#feature-transfer-7');
  for (const width of [320, 360, 375, 390, 568, 768, 1280]) {
    await page.setViewportSize({ width, height: width === 568 ? 320 : 720 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 320, height: 568 });
  await testInfo.attach('integration-formats-320', {
    body: await item.screenshot(),
    contentType: 'image/png',
  });
  await context.close();
});
