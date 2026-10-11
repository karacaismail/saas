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

function csvRows(source) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  const csv = source.replace(/^\uFEFF/, '');
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      if (quoted && csv[i + 1] === '"') {
        value += '"';
        i++;
      } else quoted = !quoted;
    } else if (!quoted && (char === ',' || char === '\r')) {
      row.push(value);
      value = '';
      if (char === '\r') {
        expect(csv[++i]).toBe('\n');
        rows.push(row);
        row = [];
      }
    } else value += char;
  }
  expect(quoted).toBe(false);
  expect(value).toBe('');
  expect(row).toEqual([]);
  return rows;
}

function readableMarkdown(value) {
  return value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

// Keep real checkbox interaction for every model separate from the download
// fixture. CI trace snapshots of the complete atlas made the combined journey
// exceed the unchanged 45-second test limit before reaching its first export.
for (const [name, ids] of [
  [
    'webhook REST and GraphQL',
    ['integration-5', 'integration-9', 'integration-10'],
  ],
  ['SOAP and XML', ['integration-11', 'integration-12']],
  ['MCP and AI Mapping', ['integration-13', 'integration-14']],
  ['WebSocket and file formats', ['realtime-1', 'transfer-7']],
]) {
  test(`required integration models remain selectable: ${name}`, async ({
    page,
  }) => {
    await visit(page);
    await expect(page.locator('.feature')).toHaveCount(363);
    await expect(page.locator('.group[open]')).toHaveCount(0);
    for (const id of ids) {
      const item = await openItem(page, id);
      await expect(item).toHaveAttribute('data-scope', 'required');
      await item.locator('.feature-check').check();
      await expect(item.locator('.feature-check')).toBeChecked();
      await expect(page.locator('.group[open]')).toHaveCount(1);
    }
  });
}

for (const format of ['json', 'md', 'csv']) {
  test(`selected integration models export their full Frappe and delivery rationale as ${format} under an active filter`, async ({
    page,
  }, testInfo) => {
    // Selection seeding is limited to these independent export scenarios. The
    // four scenarios above prove real selection of all nine records.
    await page.addInitScript((ids) => {
      localStorage.setItem('saas-atlas-selection-v1', JSON.stringify(ids));
    }, modelIds);
    await visit(page);
    expect(
      await page
        .locator('.feature-check:checked')
        .evaluateAll((inputs) => inputs.map((input) => input.value).sort()),
    ).toEqual([...modelIds].sort());
    const graphql = await openItem(page, 'integration-10');
    await graphql.locator('.feature-check').uncheck();
    await graphql.locator('.feature-check').check();
    await expect(graphql.locator('.feature-check')).toBeChecked();
    await page.locator('#search').fill('GraphQL');
    await expect(graphql).toBeVisible();
    await expect(page.locator('#feature-realtime-1')).not.toBeVisible();
    const source = JSON.parse(await page.locator('#atlas-data').textContent());
    const expected = source.clusters.flatMap((c) =>
      c.groups.flatMap((g) =>
        g.items.flatMap((item, i) => {
          const id = `${g.id}-${i + 1}`;
          if (!modelIds.includes(id)) return [];
          const planning =
            source.review.itemOverrides[id] ??
            source.review.groupDefaults[g.id];
          return [{ id, item, planning }];
        }),
      ),
    );
    expect(expected).toHaveLength(9);
    const text = await downloadText(page, format);
    if (format === 'json') {
      const exported = JSON.parse(text);
      const items = exported.clusters.flatMap((c) =>
        c.groups.flatMap((g) => g.items),
      );
      expect(items.map((x) => x.id).sort()).toEqual([...modelIds].sort());
      expect(exported.selectedCount).toBe(9);
      expect(items.every((x) => x.planning.scope === 'required')).toBe(true);
      for (const entry of expected) {
        const item = items.find((x) => x.id === entry.id);
        expect(item.text).toBe(entry.item.text);
        expect(item.assessment).toEqual(entry.item.assessment);
        expect(item.planning.reason).toBe(entry.planning.reason);
        if (newIds.includes(entry.id)) {
          expect(item.assessment.reviewedAt).toBe('2026-10-11');
          expect(item.assessment.note).toBeTruthy();
          expect(item.assessment.acceptance).toBeTruthy();
          expect(item.assessment.sources.length).toBeGreaterThan(0);
          expect(item.planning.reason).toBeTruthy();
        }
      }
      const ws = items.find((x) => x.id === 'realtime-1');
      expect(ws.planning.reason).toMatch(/Socket\.IO/);
      expect(ws.planning.reason).toMatch(/WebSocket/);
      expect(
        items.find((x) => x.id === 'integration-13').assessment.acceptance,
      ).toMatch(/Keycloak audience/);
      expect(
        items.find((x) => x.id === 'integration-14').assessment.acceptance,
      ).toMatch(/onay/i);
      expect(
        exported.review.decisions.some((d) =>
          d.itemIds.includes('integration-13'),
        ),
      ).toBe(true);
    } else {
      const markdown = format === 'md' ? readableMarkdown(text) : undefined;
      const rows = format === 'csv' ? csvRows(text) : undefined;
      if (rows) {
        expect(rows).toHaveLength(10);
        for (const row of rows) expect(row).toHaveLength(18);
      } else {
        expect(markdown.match(/^- \[x\]/gm)).toHaveLength(9);
        expect(markdown.match(/Mimari karar · 2026-10-11/g)).toHaveLength(
          newIds.length,
        );
      }
      for (const { id, item, planning } of expected) {
        if (markdown) {
          for (const value of [
            item.text,
            item.assessment.owner,
            item.assessment.note,
            item.assessment.acceptance,
            planning.reason,
          ])
            expect(markdown).toContain(value);
          for (const evidence of item.assessment.sources)
            expect(markdown).toContain(evidence.url);
          if (newIds.includes(id))
            expect(markdown).toContain('Mimari karar · 2026-10-11');
        } else {
          const row = rows.find((values) => values[6] === item.text);
          expect(row).toBeTruthy();
          expect(row[9]).toBe(item.assessment.owner);
          expect(row[11]).toBe(item.assessment.note);
          expect(row[12]).toBe(item.assessment.acceptance);
          expect(row[16]).toBe(source.review.scopeLabels.required);
          expect(row[17]).toBe(planning.reason);
          for (const evidence of item.assessment.sources)
            expect(row[13]).toContain(evidence.url);
          if (newIds.includes(id))
            expect(row[10]).toBe('Mimari karar · 2026-10-11');
        }
      }
      for (const name of [
        'GraphQL',
        'SOAP',
        'MCP',
        'XML',
        'JSON',
        'CSV',
        'XLSX',
      ])
        expect(text).toContain(name);
      expect(text).toMatch(/onay/i);
    }
    await testInfo.attach(`integration-selected-context-${format}`, {
      body: text,
      contentType: format === 'json' ? 'application/json' : 'text/plain',
    });
  });
}

test.describe('integration content without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  for (const id of newIds) {
    test(`new requirement ${id} retains readable evidence and its own review date`, async ({
      page,
    }) => {
      await page.goto('./');
      await expect(page.locator('.feature')).toHaveCount(363);
      await expect(page.locator('.group[open]')).toHaveCount(0);
      const item = await openItem(page, id);
      await expect(item.locator('.feature-title')).toBeVisible();
      await item.locator('.assessment > summary').click();
      await expect(item.locator('.assessment-body')).toBeVisible();
      await expect(item.locator('.assessment-basis')).toHaveAttribute(
        'data-reviewed-at',
        '2026-10-11',
      );
      await expect(item.locator('.assessment-basis')).toContainText(
        '2026-10-11',
      );
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
    });
  }

  test('native no-JS integration to transfer switch keeps only the destination group open', async ({
    page,
  }) => {
    await page.goto('./');
    const integration = await openItem(page, 'integration-14');
    await integration.locator('.assessment > summary').click();
    await expect(integration.locator('.assessment-body')).toBeVisible();
    const transfer = await openItem(page, 'transfer-7');
    await expect(page.locator('#group-integration[open]')).toHaveCount(0);
    await expect(page.locator('#group-transfer[open]')).toHaveCount(1);
    await expect(transfer.locator('.feature-title')).toBeVisible();
    await expect(page.locator('.group[open]')).toHaveCount(1);
  });

  for (const [name, widths] of [
    ['320 through 390', [320, 360, 375, 390]],
    ['short landscape through desktop', [390, 568, 768, 1280]],
  ]) {
    test(`format requirement reflows at ${name}`, async ({
      page,
    }, testInfo) => {
      await page.goto('./');
      const item = await openItem(page, 'transfer-7');
      await item.locator('.assessment > summary').click();
      for (const width of widths) {
        await page.setViewportSize({
          width,
          height: width === 568 ? 320 : 720,
        });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      await page.setViewportSize({ width: 320, height: 568 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await testInfo.attach('integration-formats-320', {
        body: await item.screenshot(),
        contentType: 'image/png',
      });
    });
  }
});
