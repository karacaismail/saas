import { test, expect } from '@playwright/test';
import { readContentSources } from '../scripts/content-files.mjs';

const data = await readContentSources();
const additions = [
  'channels-10',
  'channels-11',
  'channels-12',
  'channels-13',
  'channels-14',
  'channels-15',
  'channels-16',
  'identity-9',
  'integrity-7',
  'integrity-8',
  'integrity-9',
  'integrity-10',
  'releases-11',
  'backup-7',
];
const byId = new Map(
  data.clusters.flatMap((c) =>
    c.groups.flatMap((g) =>
      g.items.map((item, i) => [`${g.id}-${i + 1}`, item]),
    ),
  ),
);
const visit = async (page) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    'json',
  );
};
const readable = (value) =>
  value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

for (const [label, ids] of additions.map((id) => [id, [id]])) {
  test(`offline architecture ${label} stays readable and selectable at320`, async ({
    page,
  }, testInfo) => {
    await visit(page);
    for (const id of ids) {
      const item = byId.get(id);
      expect(item, id).toBeTruthy();
      const group = page.locator(`#group-${id.slice(0, id.lastIndexOf('-'))}`);
      if ((await group.getAttribute('open')) === null)
        await group.locator(':scope > summary').click();
      const row = page.locator(`#feature-${id}`);
      await expect(row).toHaveAttribute('data-scope', 'required');
      await row.locator('.feature-label').click();
      await expect(row.locator('.feature-check')).toBeChecked();
      await row.locator('.assessment > summary').click();
      await expect(row.locator('.assessment-note')).toHaveText(
        item.assessment.note,
      );
      const metrics = await row.evaluate((el) => ({
        contained: document.documentElement.scrollWidth <= innerWidth,
        width: el.getBoundingClientRect().width,
        root: parseFloat(getComputedStyle(document.documentElement).fontSize),
        text: [
          ...el.querySelectorAll(
            '.feature-label,.scope-note,.assessment-note,.assessment-body p,.assessment-body a',
          ),
        ].map((x) => ({
          size: parseFloat(getComputedStyle(x).fontSize),
          weight: parseFloat(getComputedStyle(x).fontWeight),
        })),
      }));
      expect(metrics.contained).toBe(true);
      expect(metrics.width).toBeLessThanOrEqual(320);
      expect(
        metrics.text.every((x) => x.size >= metrics.root && x.weight >= 400),
      ).toBe(true);
      await expect(page.locator('.group[open]')).toHaveCount(1);
    }
    await expect(page.locator('.feature-check:checked')).toHaveCount(
      ids.length,
    );
    await testInfo.attach('offline-assessment320', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });
}

for (const format of ['json', 'md', 'csv'])
  test(`offline architecture full selected content exports as ${format} despite active filters`, async ({
    page,
  }, testInfo) => {
    await page.addInitScript(
      (ids) =>
        localStorage.setItem('saas-atlas-selection-v1', JSON.stringify(ids)),
      additions.slice(0, -1),
    );
    await visit(page);
    await page.locator('#group-backup > summary').click();
    await page.locator('#feature-backup-7 .feature-label').click();
    await expect(page.locator('.feature-check:checked')).toHaveCount(14);
    await page.locator('#search').fill('Keycloak');
    await page.locator(`[name="export-format"][value="${format}"]`).check();
    const pending = page.waitForEvent('download');
    await page.locator('#export-selected').click();
    const download = await pending;
    const stream = await download.createReadStream();
    let content = '';
    for await (const chunk of stream) content += chunk;
    if (format === 'json') {
      const payload = JSON.parse(content);
      expect(payload.schemaVersion).toBe(3);
      expect(payload.selectedCount).toBe(14);
      const items = payload.clusters.flatMap((c) =>
        c.groups.flatMap((g) => g.items),
      );
      expect(items.map((x) => x.id).sort()).toEqual([...additions].sort());
      for (const item of items)
        expect(item.assessment).toEqual(byId.get(item.id).assessment);
      expect(payload.review.decisions).toEqual(
        data.review.decisions.filter((d) =>
          d.itemIds.some((id) => additions.includes(id)),
        ),
      );
    } else if (format === 'md') {
      const text = readable(content);
      for (const id of additions)
        for (const value of [
          byId.get(id).text,
          byId.get(id).assessment.note,
          byId.get(id).assessment.acceptance,
        ])
          expect(text).toContain(value);
    } else {
      expect(content).toMatch(/^\uFEFF/);
      for (const id of additions)
        expect(content).toContain(byId.get(id).text.replaceAll('"', '""'));
    }
    await testInfo.attach(`offline-export.${format}`, {
      body: content,
      contentType: format === 'json' ? 'application/json' : 'text/plain',
    });
  });

test('offline architecture decisions retain all78 historical decisions and supersede only the requested platform scope', async ({
  page,
}) => {
  await visit(page);
  await page.locator('#scope-review > summary').press('Enter');
  await expect(page.locator('.review-decisions > li')).toHaveCount(94);
  const text = await page.locator('#scope-review').innerText();
  for (const d of data.review.decisions.filter((d) =>
    d.id.startsWith('offline-'),
  ))
    expect(text).toContain(d.title);
  for (const id of ['channels-2', 'channels-7']) {
    await expect(page.locator(`#feature-${id}`)).toHaveAttribute(
      'data-scope',
      'required',
    );
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('offline architecture remains native readable documentation without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 568 },
  });
  const page = await context.newPage();
  await page.goto('./');
  await page.locator('#group-channels > summary').click();
  const row = page.locator('#feature-channels-16');
  await row.locator('.assessment > summary').click();
  await expect(row.locator('.assessment-note')).toHaveText(
    byId.get('channels-16').assessment.note,
  );
  await expect(page.locator('.group[open]')).toHaveCount(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});
