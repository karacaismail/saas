import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { readContentSources } from '../scripts/content-files.mjs';

const data = await readContentSources();
const manifest = JSON.parse(
  await readFile(new URL('../data/manifest.json', import.meta.url), 'utf8'),
);
const inventory = data.clusters.flatMap((c) =>
  c.groups.flatMap((g) =>
    g.items.map((item, i) => ({ id: `${g.id}-${i + 1}`, group: g.id, item })),
  ),
);
const byId = new Map(inventory.map((entry) => [entry.id, entry]));
const entriesOf = (catalog) => catalog.sections.flatMap((s) => s.entries);
const catalogModel = () => {
  expect(data.componentCatalog, 'JSON component catalog').toBeTruthy();
  return data.componentCatalog;
};
const visit = async (page, source = 'json') => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    source,
  );
  await expect(page.locator('#search')).toBeEnabled();
};
const filteredCatalog = (catalog, ids) => ({
  ...catalog,
  sections: catalog.sections
    .map((section) => ({
      ...section,
      entries: section.entries
        .filter((entry) => entry.itemIds.some((id) => ids.includes(id)))
        .map((entry) => ({
          ...entry,
          itemIds: entry.itemIds.filter((id) => ids.includes(id)),
        })),
    }))
    .filter((section) => section.entries.length),
});
const downloadSelection = async (page, format) => {
  await page.locator(`[name="export-format"][value="${format}"]`).check();
  const pending = page.waitForEvent('download');
  await page.locator('#export-selected').click();
  const stream = await (await pending).createReadStream();
  let content = '';
  for await (const chunk of stream) content += chunk;
  return content;
};
const selectRelated = async (page, catalog) => {
  const original = 'tenant-1';
  expect(byId.get(original)).toBeTruthy();
  const linked = entriesOf(catalog)
    .flatMap((entry) => entry.itemIds)
    .find((id) => id !== original);
  expect(byId.get(linked), 'catalog feature reference').toBeTruthy();
  await page.addInitScript(
    (id) =>
      localStorage.setItem('saas-atlas-selection-v1', JSON.stringify([id])),
    original,
  );
  await visit(page);
  await page.locator('#search').fill(byId.get(linked).item.text);
  const row = page.locator(`#feature-${linked}`);
  await expect(row).toBeVisible();
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  await expect(page.locator('.feature-check:checked')).toHaveCount(2);
  return [original, linked];
};
const readable = (value) =>
  value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
const strings = (value) =>
  typeof value === 'string'
    ? [value]
    : value && typeof value === 'object'
      ? Object.values(value).flatMap(strings)
      : [];

test('component catalog has all63 valid references and readable keyboard accordions at320', async ({
  page,
}, testInfo) => {
  const catalog = catalogModel();
  expect(catalog.sections.map((s) => [s.id, s.entries.length])).toEqual([
    ['families', 40],
    ['views', 15],
    ['providers', 8],
  ]);
  await visit(page);
  const disclosure = page.locator('#component-catalog');
  await expect(disclosure).not.toHaveAttribute('open');
  await expect(page.locator('#context-details')).not.toHaveAttribute('open');
  await expect(page.locator('#scope-review')).not.toHaveAttribute('open');
  await disclosure.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(disclosure).toHaveAttribute('open', '');
  await expect(disclosure.locator('.catalog-entry')).toHaveCount(63);
  await expect(disclosure.locator('.catalog-entry[open]')).toHaveCount(0);
  const references = await disclosure
    .locator('.catalog-entry')
    .evaluateAll((elements) =>
      elements.map((el) => ({
        id: el.id,
        name: el.getAttribute('name'),
        refs: [...el.querySelectorAll('a[href^="#feature-"]')].map((a) =>
          a.getAttribute('href'),
        ),
      })),
    );
  expect(references).toEqual(
    entriesOf(catalog).map((entry) => ({
      id: `component-${entry.id}`,
      name: 'atlas-components',
      refs: entry.itemIds.map((id) => `#feature-${id}`),
    })),
  );
  for (const entry of entriesOf(catalog))
    for (const id of entry.itemIds) expect(byId.has(id), id).toBe(true);
  const first = catalog.sections[0].entries[0];
  const row = page.locator(`#component-${first.id}`);
  const summary = row.locator(':scope > summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(row).toHaveAttribute('open', '');
  for (const value of [
    first.title,
    first.description,
    catalog.needLabels[first.need],
    first.frappe,
    first.work,
    first.acceptance,
  ])
    await expect(row).toContainText(value);
  const metrics = await disclosure.evaluate((el) => {
    const root = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const text = [...el.querySelectorAll('summary,p,dt,dd,a,li,strong')];
    return {
      contained: document.documentElement.scrollWidth <= innerWidth,
      count: text.length,
      readable: text.every((node) => {
        const style = getComputedStyle(node);
        return (
          parseFloat(style.fontSize) >= root &&
          parseFloat(style.fontWeight) >= 400
        );
      }),
    };
  });
  expect(metrics.contained).toBe(true);
  expect(metrics.count).toBeGreaterThan(63);
  expect(metrics.readable).toBe(true);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(summary).toBeFocused();
  const focus = await summary.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      visible: el.matches(':focus-visible'),
      count: document.querySelectorAll(':focus-visible').length,
      outline: style.outlineStyle,
      width: parseFloat(style.outlineWidth),
      shadow: style.boxShadow,
    };
  });
  expect(focus.visible).toBe(true);
  expect(focus.count).toBe(1);
  expect(focus.outline).not.toBe('none');
  expect(focus.width).toBeGreaterThanOrEqual(2);
  expect(focus.shadow).toBe('none');
  await testInfo.attach('component-family320', {
    body: await row.screenshot(),
    contentType: 'image/png',
  });
  const next = catalog.sections[1].entries[0];
  const second = page.locator(`#component-${next.id}`);
  await second.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(row).not.toHaveAttribute('open');
  await expect(second).toHaveAttribute('open', '');
  await expect(disclosure.locator('.catalog-entry[open]')).toHaveCount(1);
  await second.locator(`a[href="#feature-${next.itemIds[0]}"]`).click();
  await expect(page.locator(`#feature-${next.itemIds[0]}`)).toBeVisible();
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await expect(disclosure.locator('.catalog-entry[open]')).toHaveCount(1);
});

test('JSON selection exports only related catalog entries and preserves the original selected feature', async ({
  page,
}) => {
  const catalog = catalogModel();
  const selected = await selectRelated(page, catalog);
  const payload = JSON.parse(await downloadSelection(page, 'json'));
  expect(payload.selectedCount).toBe(2);
  const items = payload.clusters.flatMap((c) =>
    c.groups.flatMap((g) => g.items),
  );
  expect(items.map((item) => item.id).sort()).toEqual([...selected].sort());
  for (const item of items) {
    expect(item.text).toBe(byId.get(item.id).item.text);
    expect(item.assessment).toEqual(byId.get(item.id).item.assessment);
  }
  const expected = filteredCatalog(catalog, selected);
  expect(entriesOf(expected).length).toBeGreaterThan(0);
  expect(entriesOf(expected).length).toBeLessThan(entriesOf(catalog).length);
  expect(payload.componentCatalog).toEqual(expected);
  expect(
    JSON.parse(
      await page.evaluate(() =>
        localStorage.getItem('saas-atlas-selection-v1'),
      ),
    ).sort(),
  ).toEqual([...selected].sort());
});

test('Markdown selection includes full related catalog and global context while excluding unrelated entries', async ({
  page,
}, testInfo) => {
  const catalog = catalogModel();
  const selected = await selectRelated(page, catalog);
  const expected = filteredCatalog(catalog, selected);
  const markdown = readable(await downloadSelection(page, 'md'));
  for (const id of selected) expect(markdown).toContain(byId.get(id).item.text);
  for (const value of [
    catalog.title,
    catalog.intro,
    catalog.source.name,
    catalog.source.sha256,
    catalog.source.reviewedAt,
    ...catalog.paragraphs,
    ...catalog.technologyDecisions.flatMap((d) => [d.title, d.description]),
    ...catalog.sources.flatMap((source) => [source.title, source.url]),
  ])
    expect(markdown).toContain(value);
  for (const entry of entriesOf(expected))
    for (const value of [
      entry.title,
      entry.description,
      catalog.needLabels[entry.need],
      entry.frappe,
      entry.work,
      entry.acceptance,
      ...entry.itemIds,
    ])
      expect(markdown).toContain(value);
  const included = new Set(entriesOf(expected).map((entry) => entry.id));
  const contextual = strings([
    expected,
    selected.map((id) => byId.get(id).item),
    data.review.decisions.filter((d) =>
      d.itemIds.some((id) => selected.includes(id)),
    ),
  ]);
  for (const entry of entriesOf(catalog))
    if (
      !included.has(entry.id) &&
      !contextual.some((value) => value.includes(entry.description))
    )
      expect(markdown).not.toContain(entry.description);
  await expect(page.locator('.feature-check:checked')).toHaveCount(2);
  await testInfo.attach('component-catalog-export.md', {
    body: markdown,
    contentType: 'text/plain',
  });
});

test('component catalog remains readable and exclusive with native accordions without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const catalog = catalogModel();
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 568 },
  });
  try {
    const page = await context.newPage();
    await page.goto('./');
    const disclosure = page.locator('#component-catalog');
    await expect(disclosure).not.toHaveAttribute('open');
    await expect(page.locator('#context-details')).not.toHaveAttribute('open');
    await disclosure.locator(':scope > summary').click();
    await expect(disclosure.locator('.catalog-entry')).toHaveCount(63);
    const first = catalog.sections[0].entries[0];
    const row = page.locator(`#component-${first.id}`);
    await row.locator(':scope > summary').click();
    await expect(row).toContainText(first.description);
    await expect(row).toContainText(first.acceptance);
    await expect(
      row.locator(`a[href="#feature-${first.itemIds[0]}"]`),
    ).toBeVisible();
    const next = page.locator(
      `#component-${catalog.sections[2].entries[0].id}`,
    );
    await next.locator(':scope > summary').click();
    await expect(row).not.toHaveAttribute('open');
    await expect(next).toHaveAttribute('open', '');
    await expect(disclosure.locator('.catalog-entry[open]')).toHaveCount(1);
    await expect(page.locator('.group[open]')).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  } finally {
    await context.close();
  }
});

test('catalog JSON failure preserves the full fallback catalog and working related selection export', async ({
  page,
}) => {
  const catalog = catalogModel();
  expect(manifest.componentCatalog, 'catalog manifest path').toBeTruthy();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route(
    `**/data/${manifest.componentCatalog.replace(/^\.\//, '')}`,
    (route) => route.abort('failed'),
  );
  await visit(page, 'fallback');
  const disclosure = page.locator('#component-catalog');
  await disclosure.locator(':scope > summary').click();
  await expect(disclosure.locator('.catalog-entry')).toHaveCount(63);
  const first = entriesOf(catalog)[0];
  const row = page.locator(`#component-${first.id}`);
  await row.locator(':scope > summary').click();
  await expect(row).toContainText(first.description);
  const id = first.itemIds[0];
  expect(byId.get(id), id).toBeTruthy();
  await page.locator(`#group-${byId.get(id).group} > summary`).click();
  await page.locator(`#feature-${id} .feature-label`).click();
  await expect(page.locator(`#feature-${id} .feature-check`)).toBeChecked();
  const payload = JSON.parse(await downloadSelection(page, 'json'));
  expect(payload.selectedCount).toBe(1);
  expect(payload.componentCatalog).toEqual(filteredCatalog(catalog, [id]));
  expect(errors).toEqual([]);
});

for (const id of ['model-8', 'realtime-7', 'reports-9'])
  test(`new component capability ${id} is selectable with complete assessment at320`, async ({
    page,
  }, testInfo) => {
    const entry = byId.get(id);
    expect(entry, id).toBeTruthy();
    await visit(page);
    const group = page.locator(`#group-${entry.group}`);
    await group.locator(':scope > summary').click();
    const row = page.locator(`#feature-${id}`);
    await row.locator('.feature-label').click();
    await row.locator('.assessment > summary').click();
    await expect(row.locator('.feature-check')).toBeChecked();
    await expect(row.locator('.assessment-note')).toHaveText(
      entry.item.assessment.note,
    );
    await expect(row.locator('.assessment-body')).toContainText(
      entry.item.assessment.acceptance,
    );
    await expect(page.locator('.group[open]')).toHaveCount(1);
    expect(
      await row.evaluate(
        (el) =>
          document.documentElement.scrollWidth <= innerWidth &&
          el.getBoundingClientRect().width <= 320,
      ),
    ).toBe(true);
    const payload = JSON.parse(await downloadSelection(page, 'json'));
    expect(payload.selectedCount).toBe(1);
    expect(
      payload.clusters.flatMap((c) => c.groups.flatMap((g) => g.items))[0]
        .assessment,
    ).toEqual(entry.item.assessment);
    expect(
      entriesOf(payload.componentCatalog).some((e) => e.itemIds.includes(id)),
    ).toBe(true);
    await testInfo.attach(`${id}-assessment320`, {
      body: await row.screenshot(),
      contentType: 'image/png',
    });
  });
