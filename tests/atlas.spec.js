import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

const selectionKey = 'saas-atlas-selection-v1';
const selectedIds = ['feature-tenant-1', 'feature-backup-1'];
const sizes = [
  [320, 480],
  [320, 568],
  [360, 640],
  [375, 667],
  [390, 844],
  [431, 800],
  [432, 800],
  [433, 800],
  [480, 320],
  [568, 320],
  [567, 800],
  [568, 800],
  [569, 800],
  [607, 800],
  [608, 800],
  [609, 800],
  [639, 800],
  [640, 800],
  [641, 800],
  [768, 1024],
  [1023, 800],
  [1024, 800],
  [1025, 800],
  [1280, 900],
];

async function visit(page, path = './') {
  await page.goto(path);
  await expect(page.locator('#search')).toBeEnabled();
  const count = await page.evaluate(async () => {
    await document.fonts.ready;
    const hashRow = location.hash.startsWith('#feature-')
      ? document.querySelector(location.hash)
      : null;
    return {
      features: document.querySelectorAll('.feature').length,
      linkedSelection: hashRow
        ? {
            checked: hashRow.querySelector('.feature-check').checked,
            open: hashRow.closest('.group').open,
          }
        : null,
    };
  });
  expect(count.features).toBe(387);
  if (path.startsWith('./#feature-'))
    expect(count.linkedSelection).toEqual({ checked: true, open: true });
}

async function openFeature(page, id) {
  const row = page.locator(`#${id}`);
  const group = row.locator(
    'xpath=ancestor::details[contains(@class,"group")]',
  );
  if ((await group.getAttribute('open')) === null) {
    await group.locator(':scope > summary').click();
    await expect(group).toHaveAttribute('open', '');
  }
  return row;
}

async function selectFeature(page, id) {
  const row = await openFeature(page, id);
  await row.locator('label').first().click();
  await expect(row.getByRole('checkbox')).toBeChecked();
  return row;
}

async function restoreSelection(page, ids) {
  await page.addInitScript(
    ({ key, values }) => localStorage.setItem(key, JSON.stringify(values)),
    { key: selectionKey, values: ids.map((id) => id.replace(/^feature-/, '')) },
  );
}

async function selectionState(page, ids = []) {
  return page.evaluate(
    (values) => ({
      checked: values.map(
        (id) => document.querySelector(`#${id} .feature-check`).checked,
      ),
      count: document.querySelector('#selection-count').textContent,
      total: document.querySelectorAll('.feature-check:checked').length,
      exportDisabled: document.querySelector('#export-selected').disabled,
      stored: localStorage.getItem('saas-atlas-selection-v1'),
    }),
    ids,
  );
}

async function exportText(page, format, formatAlreadyChecked = false) {
  if (!formatAlreadyChecked)
    await page
      .locator(`input[name="export-format"][value="${format}"]`)
      .check();
  const pendingDownload = page.waitForEvent('download');
  await page.locator('#export-selected').click();
  const download = await pendingDownload;
  expect(download.suggestedFilename()).toBe(`saas-secim.${format}`);
  expect(await download.failure()).toBeNull();
  return readFile(await download.path(), 'utf8');
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  const text = input.replace(/^\uFEFF/, '');
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[index + 1] === '\n') index += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += char;
  }
  if (row.length || field.length) rows.push([...row, field]);
  return rows;
}

async function typographyFailures(page, selectedId = null) {
  return page.evaluate((id) => {
    const rootSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const failures = [];
    const inspected = new Set();
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    function inspect(element) {
      if (inspected.has(element) || element.closest('[aria-hidden="true"]'))
        return;
      inspected.add(element);
      const style = getComputedStyle(element);
      // Explicit user exception: only the three passive assessment pills are 0.8rem.
      const minimumSize = element.matches('.assessment-tags > span')
        ? rootSize * 0.8
        : rootSize;
      if (
        Number.parseFloat(style.fontSize) + 0.01 < minimumSize ||
        Number.parseFloat(style.fontWeight) < 400 ||
        (!element.closest('code, kbd, pre') &&
          !/^['"]?Outfit['"]?(?:,|$)/i.test(style.fontFamily))
      ) {
        failures.push({
          element: element.id || element.className || element.tagName,
          text: element.textContent.trim().slice(0, 80),
          size: style.fontSize,
          weight: style.fontWeight,
          font: style.fontFamily,
          rootSize,
        });
      }
    }
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      if (
        Array.from(range.getClientRects()).some(
          (rect) => rect.width && rect.height,
        )
      ) {
        inspect(node.parentElement);
      }
    }
    document.querySelectorAll('input, textarea, select').forEach((element) => {
      if (element.getClientRects().length) inspect(element);
    });
    if (!id) return failures;
    const search = document.querySelector('#search');
    return {
      typography: failures,
      state: {
        search: search.value,
        focused: document.activeElement === search,
        selected: document.querySelector(`#${id} .feature-check`).checked,
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      },
    };
  }, selectedId);
}

async function attachViewport(page, testInfo, name) {
  await testInfo.attach(name, {
    body: await page.screenshot({ animations: 'disabled' }),
    contentType: 'image/png',
  });
}

async function expectContainedWidth(page, scenario) {
  const size = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(size.document, `${scenario}: document width`).toBeLessThanOrEqual(
    size.viewport + 1,
  );
  expect(size.body, `${scenario}: body width`).toBeLessThanOrEqual(
    size.viewport + 1,
  );
}

async function expectClearSearchTarget(page, testInfo) {
  const clear = page.locator('#clear-search');
  await expect(clear).toBeVisible();
  const target = await clear.boundingBox();
  const minimum = testInfo.project.use.hasTouch ? 48 : 44;
  expect(target.width, 'search clear target width').toBeGreaterThanOrEqual(
    minimum,
  );
  expect(target.height, 'search clear target height').toBeGreaterThanOrEqual(
    minimum,
  );
  return clear;
}

test('all 387 entries have an accessible square selection control', async ({
  page,
}) => {
  await visit(page);
  await expect(page.locator('.feature-check')).toHaveCount(387);
  await expect(page.locator('.cluster')).toHaveCount(12);
  await expect(page.locator('#export-selected')).toBeDisabled();
  const failures = await page.locator('.feature').evaluateAll((rows) =>
    rows.flatMap((row) => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      const title = row.querySelector('.feature-title');
      const labels = checkbox ? Array.from(checkbox.labels || []) : [];
      return !checkbox ||
        !title ||
        !labels.some((label) => label.textContent.includes(title.textContent))
        ? [row.id]
        : [];
    }),
  );
  expect(failures).toEqual([]);
  const parity = await page.evaluate(() => {
    const normalize = (value) => value.replace(/\s+/gu, ' ').trim();
    const data = JSON.parse(document.querySelector('#atlas-data').textContent);
    return {
      expected: data.clusters.flatMap((cluster) =>
        cluster.groups.flatMap((group) =>
          group.items.map((item, index) => ({
            id: `feature-${group.id}-${index + 1}`,
            kind: item.kind,
            text: normalize(item.text),
          })),
        ),
      ),
      actual: Array.from(document.querySelectorAll('.feature')).map((row) => ({
        id: row.id,
        kind: row.dataset.kind,
        text: normalize(row.querySelector('.feature-title').textContent),
      })),
    };
  });
  expect(parity.actual).toEqual(parity.expected);
  const ids = await page
    .locator('[id]')
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
});

test('mouse labels select only their own item', async ({ page }) => {
  await visit(page);
  await selectFeature(page, selectedIds[0]);
  const state = await selectionState(page, [
    selectedIds[0],
    'feature-tenant-2',
  ]);
  expect(state.count).toContain('1');
  expect(state.checked).toEqual([true, false]);
});

test('keyboard Space toggles only its item while preserving an existing mouse selection', async ({
  page,
}) => {
  // Mouse-label coverage proves this setup independently; start this bounded
  // keyboard scenario with the same persisted state.
  await restoreSelection(page, [selectedIds[0]]);
  await visit(page);
  const second = await openFeature(page, 'feature-tenant-2');
  await second.getByRole('checkbox').focus();
  await page.keyboard.press('Space');
  const selected = await selectionState(page, [
    selectedIds[0],
    'feature-tenant-2',
  ]);
  expect(selected.checked[1]).toBe(true);
  expect(selected.count).toContain('2');
  await page.keyboard.press('Space');
  const cleared = await selectionState(page, [
    selectedIds[0],
    'feature-tenant-2',
  ]);
  expect(cleared.checked).toEqual([true, false]);
});

test('selected and keyboard-cleared items persist after reload', async ({
  page,
}) => {
  await visit(page);
  const first = page.locator(`#${selectedIds[0]}`);
  const second = page.locator('#feature-tenant-2');
  const group = first.locator(
    'xpath=ancestor::details[contains(@class,"group")]',
  );
  await group.locator(':scope > summary').click();
  await first.locator('label').first().click();
  const mouse = await page.evaluate((id) => {
    const first = document.querySelector(`#${id} .feature-check`);
    const second = document.querySelector('#feature-tenant-2 .feature-check');
    // Record each real native change after the application has handled it.
    // Both Space transitions remain asserted without collecting the full
    // document between two successive keys.
    const changes = [];
    const record = (event) => {
      if (event.target === second)
        changes.push({
          checked: second.checked,
          focused: document.activeElement === second,
          firstChecked: first.checked,
        });
    };
    window.addEventListener('change', record);
    window.__atlasKeyboardChanges = { changes, record };
    return {
      checked: [first.checked, second.checked],
      open: first.closest('.group').open,
    };
  }, selectedIds[0]);
  expect(mouse).toEqual({ checked: [true, false], open: true });
  await second.getByRole('checkbox').focus();
  await page.keyboard.press('Space');
  await page.keyboard.press('Space');
  const changes = await page.evaluate(() => {
    const observed = window.__atlasKeyboardChanges;
    window.removeEventListener('change', observed.record);
    delete window.__atlasKeyboardChanges;
    return observed.changes;
  });
  expect(changes).toEqual([
    { checked: true, focused: true, firstChecked: true },
    { checked: false, focused: true, firstChecked: true },
  ]);
  await page.reload();
  await expect(page.locator('#search')).toBeEnabled();
  await group.locator(':scope > summary').click();
  const state = await page.evaluate(
    (id) => ({
      checked: [id, 'feature-tenant-2'].map(
        (itemId) => document.querySelector(`#${itemId} .feature-check`).checked,
      ),
      open: document.querySelector(`#${id}`).closest('.group').open,
      stored: localStorage.getItem('saas-atlas-selection-v1'),
    }),
    selectedIds[0],
  );
  expect(state.checked).toEqual([true, false]);
  expect(state.open).toBe(true);
  expect(state.stored).toContain(selectedIds[0].replace(/^feature-/, ''));
});

test('persisted mouse selection can be globally cleared and remains empty after reload', async ({
  page,
}) => {
  await visit(page);
  await selectFeature(page, selectedIds[0]);
  await page.reload();
  await expect(page.locator('#search')).toBeEnabled();
  const persisted = await selectionState(page, [selectedIds[0]]);
  expect(persisted.checked).toEqual([true]);
  expect(persisted.stored).toContain(selectedIds[0].replace(/^feature-/, ''));
  await page.locator('#clear-selection').click();
  const cleared = await selectionState(page);
  expect(cleared.total).toBe(0);
  expect(cleared.exportDisabled).toBe(true);
  await page.reload();
  await expect(page.locator('#search')).toBeEnabled();
  const reloaded = await selectionState(page);
  expect(reloaded.total).toBe(0);
  expect(reloaded.exportDisabled).toBe(true);
});

test('selected-only and select-visible respect Turkish search and classification filters', async ({
  page,
}) => {
  await visit(page);
  await selectFeature(page, selectedIds[0]);
  await page.locator('#search').fill('kiraci');
  await page.locator('.filter[data-kind="g"]').click();
  const matchingIds = await page
    .locator('.feature:not([hidden])')
    .evaluateAll((rows) => rows.map((row) => row.id));
  expect(matchingIds.length).toBeGreaterThan(0);
  expect(matchingIds).not.toContain(selectedIds[0]);
  const matches = await page.evaluate(() => ({
    open: document.querySelectorAll('.group[open]').length,
    visible: [...document.querySelectorAll('.feature')]
      .filter((row) => {
        const rect = row.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          row.checkVisibility() &&
          getComputedStyle(row).visibility === 'visible'
        );
      })
      .map((row) => row.id),
  }));
  expect(matches.open).toBe(1);
  expect(matches.visible.every((id) => matchingIds.includes(id))).toBe(true);
  await page.locator('#select-visible').click();
  const checkedIds = await page
    .locator('.feature-check:checked')
    .evaluateAll((inputs) =>
      inputs.map((input) => input.closest('.feature').id),
    );
  expect(checkedIds.sort()).toEqual([selectedIds[0], ...matchingIds].sort());
  await page.locator('#reset-all').click();
  await page.locator('#selected-only').click();
  const selectedOnly = await page.evaluate(() => ({
    pressed: document
      .querySelector('#selected-only')
      .getAttribute('aria-pressed'),
    matching: document.querySelectorAll('.feature:not([hidden])').length,
    open: document.querySelectorAll('.group[open]').length,
  }));
  expect(selectedOnly).toEqual({
    pressed: 'true',
    matching: checkedIds.length,
    open: 1,
  });
  await page.locator('#clear-selection').click();
  await expect(page.locator('.feature:visible')).toHaveCount(0);
  await expect(page.locator('#empty')).toBeVisible();
});

async function prepareFilteredExport(page, mouseSelection = false) {
  if (mouseSelection)
    await page.addInitScript((ids) => {
      const changes = [];
      const record = (event) => {
        const input = event.target;
        const row = input.closest('.feature');
        if (row && ids.includes(row.id))
          changes.push({
            id: row.id,
            checked: input.checked,
            open: row.closest('.group').open,
          });
      };
      window.addEventListener('change', record);
      window.__atlasMouseSelections = { changes, record };
    }, selectedIds);
  else await restoreSelection(page, selectedIds);
  await visit(page);
  if (mouseSelection) {
    for (const id of selectedIds) {
      const row = page.locator(`#${id}`);
      await row
        .locator('xpath=ancestor::details[contains(@class,"group")]')
        .locator(':scope > summary')
        .click();
      // Successful native label clicks require the row to be visible in its
      // open disclosure; the complete two-item state is checked below.
      await row.locator('label').first().click();
    }
  }
  await page.locator('#search').fill('yedek');
  const prepared = await page.evaluate((ids) => {
    const first = document.querySelector(`#${ids[0]}`);
    const firstRect = first.getBoundingClientRect();
    const observed = window.__atlasMouseSelections;
    if (observed) {
      window.removeEventListener('change', observed.record);
      delete window.__atlasMouseSelections;
    }
    return {
      expected: ids.map((id) =>
        document.querySelector(`#${id} .feature-title`).textContent.trim(),
      ),
      unselectedText: document
        .querySelector('#feature-tenant-2 .feature-title')
        .textContent.trim(),
      checked: ids.map(
        (id) => document.querySelector(`#${id} .feature-check`).checked,
      ),
      search: document.querySelector('#search').value,
      firstVisible:
        first.checkVisibility() &&
        getComputedStyle(first).visibility === 'visible' &&
        firstRect.width > 0 &&
        firstRect.height > 0,
      jsonChecked: document.querySelector(
        'input[name="export-format"][value="json"]',
      ).checked,
      mouseSelections: observed?.changes,
    };
  }, selectedIds);
  expect(prepared.checked).toEqual([true, true]);
  expect(prepared.search).toBe('yedek');
  expect(prepared.firstVisible).toBe(false);
  expect(prepared.jsonChecked).toBe(true);
  if (mouseSelection)
    expect(prepared.mouseSelections).toEqual(
      selectedIds.map((id) => ({ id, checked: true, open: true })),
    );
  return {
    expected: prepared.expected,
    expectedInRoadmapOrder: [...prepared.expected].reverse(),
    unselectedText: prepared.unselectedText,
  };
}

test('JSON, CSV and Markdown export: JSON selected entries with cluster and heading hierarchy despite active filters', async ({
  page,
}) => {
  const { expectedInRoadmapOrder } = await prepareFilteredExport(page, true);
  const json = JSON.parse(await exportText(page, 'json', true));
  expect(json.schemaVersion).toBe(3);
  expect(json.selectedCount).toBe(2);
  expect(json.clusters.map((cluster) => cluster.id)).toEqual(['12', '01']);
  const items = json.clusters.flatMap((cluster) =>
    cluster.groups.flatMap((group) => {
      expect(cluster.title).toBeTruthy();
      expect(group.title).toBeTruthy();
      expect(group.num).toMatch(/^\d+\.\d+$/);
      return group.items;
    }),
  );
  expect(items.map((item) => item.id)).toEqual(
    [...selectedIds].reverse().map((id) => id.replace(/^feature-/, '')),
  );
  expect(items.map((item) => item.text)).toEqual(expectedInRoadmapOrder);
  expect(
    items.every((item) => ['o', 'g', 'n'].includes(item.kind) && item.label),
  ).toBeTruthy();
});

test('JSON, CSV and Markdown export: CSV matches JSON selected hierarchy and scope despite active filters', async ({
  page,
}) => {
  const { expectedInRoadmapOrder } = await prepareFilteredExport(page);
  const json = JSON.parse(await exportText(page, 'json'));
  const items = json.clusters.flatMap((cluster) =>
    cluster.groups.flatMap((group) => group.items),
  );
  const csv = parseCsv(await exportText(page, 'csv'));
  expect(csv[0]).toEqual([
    'Küme kimliği',
    'Küme',
    'Başlık no',
    'Başlık',
    'Madde no',
    'Sınıf',
    'Madde',
    'Frappe yeterliliği',
    'Yapılacak iş',
    'Sorumlu',
    'Kanıt durumu',
    'Değerlendirme',
    'Kabul ölçütü',
    'Kaynaklar',
    'Etap',
    'Küme sırası',
    'Plan kapsamı',
    'Kapsam gerekçesi',
  ]);
  expect(csv).toHaveLength(3);
  expect(csv.slice(1).map((row) => row[0])).toEqual(['12', '01']);
  expect(csv.slice(1).map((row) => row[4])).toEqual(['01.5.1', '02.1.1']);
  expect(csv.slice(1).map((row) => row[6])).toEqual(expectedInRoadmapOrder);
  expect(
    csv
      .slice(1)
      .every(
        (row) => row.length === 18 && row[1] && row[2] && row[3] && row[5],
      ),
  ).toBeTruthy();
  expect(csv.slice(1).map((row) => row.slice(16))).toEqual(
    items.map((item) => [item.planning.label, item.planning.reason]),
  );
});

test('JSON, CSV and Markdown export: Markdown selected entries with cluster and heading hierarchy despite active filters', async ({
  page,
}) => {
  const { expected, unselectedText } = await prepareFilteredExport(page);
  const markdown = await exportText(page, 'md');
  expect(markdown.match(/^## /gm)).toHaveLength(2);
  expect(markdown.match(/^### /gm)).toHaveLength(2);
  expect(markdown.match(/^- \[x\] /gm)).toHaveLength(2);
  const readableMarkdown = markdown.replace(
    /\\([\\`*_{}[\]()#+.!|~=-])/g,
    '$1',
  );
  expected.forEach((text) => expect(readableMarkdown).toContain(text));
  expect(readableMarkdown).not.toContain(unselectedText);
});

test('branded cluster disclosure uses native open state and Escape focus return', async ({
  page,
}, testInfo) => {
  await visit(page);
  const picker = page.locator('#cluster-picker');
  const summary = picker.locator(':scope > summary');
  await expect(picker).not.toHaveAttribute('open');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(picker).toHaveAttribute('open', '');
  await page.keyboard.press('Escape');
  const escaped = await summary.evaluate((element) => ({
    open: element.parentElement.open,
    focused: document.activeElement === element,
  }));
  expect(escaped).toEqual({ open: false, focused: true });
  await page.keyboard.press('Space');
  const reopened = await picker.evaluate((element) => ({
    open: element.open,
    radios: element.querySelectorAll('input[name="cluster"]').length,
  }));
  expect(reopened).toEqual({ open: true, radios: 13 });
  await attachViewport(page, testInfo, 'cluster-picker-open-candidate');
  await page.keyboard.press('Escape');
});

test('branded cluster disclosure preserves search and keyboard radios and Tab traversal', async ({
  page,
}) => {
  await visit(page);
  const picker = page.locator('#cluster-picker');
  const summary = picker.locator(':scope > summary');
  await page.locator('#search').fill('kiracı');
  await summary.click();
  await picker.locator('input[name="cluster"][value="01"]').check();
  const selected = await picker.evaluate((element) => ({
    open: element.open,
    search: document.querySelector('#search').value,
    visible: [...document.querySelectorAll('.cluster')]
      .filter((cluster) => {
        const rect = cluster.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          cluster.checkVisibility() &&
          getComputedStyle(cluster).visibility === 'visible'
        );
      })
      .map((cluster) => cluster.id),
  }));
  expect(selected).toEqual({
    open: false,
    search: 'kiracı',
    visible: ['cluster-01'],
  });
  await expect(page.locator('#cluster-01')).toBeVisible();
  await summary.click();
  await picker.locator('input[name="cluster"][value="all"]').focus();
  await page.keyboard.press('ArrowDown');
  await expect(
    picker.locator('input[name="cluster"][value="12"]'),
  ).toBeChecked();
  await page.keyboard.press('Escape');
  await expect(summary).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(summary).not.toBeFocused();
  await page.keyboard.press('Tab');
  await expect(summary).toBeFocused();
});

const viewportBatches = [
  ...Array.from({ length: Math.ceil(sizes.length / 3) }, (_, index) => ({
    name: `viewport segment ${index + 1}`,
    start: index * 3,
    end: Math.min((index + 1) * 3, sizes.length),
  })),
];

for (const { name, start, end } of viewportBatches) {
  test(`320-first journey ${name} keeps state, typography and contained width`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await visit(page);
    await selectFeature(page, selectedIds[0]);
    await page.locator('#search').fill('kiracı');
    await page.locator('#search').focus();
    // Revisit the previous batch's last size so every original resize transition
    // remains covered, with real input/selection state carried from 320px.
    const batch = sizes.slice(Math.max(0, start - 1), end);
    for (const [width, height] of batch) {
      await page.setViewportSize({ width, height });
      const { state, typography } = await typographyFailures(
        page,
        selectedIds[0],
      );
      expect(state.search, `${width}×${height} search value`).toBe('kiracı');
      expect(state.focused, `${width}×${height} search focus`).toBe(true);
      expect(state.selected, `${width}×${height} selection`).toBe(true);
      expect(
        state.page,
        `${width}×${height} document width`,
      ).toBeLessThanOrEqual(state.viewport + 1);
      expect(state.body, `${width}×${height} body width`).toBeLessThanOrEqual(
        state.viewport + 1,
      );
      expect(typography, `${width}×${height} visible typography`).toEqual([]);
      if (
        [320, 390, 768, 1280].includes(width) ||
        (width === 568 && height === 320)
      ) {
        await attachViewport(
          page,
          testInfo,
          `viewport-${width}x${height}-candidate`,
        );
      }
    }
  });
}

for (const width of [320, 1280]) {
  for (const state of ['panels', 'source details', 'empty results']) {
    test(`320-first journey ${state} retains readable typography at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await restoreSelection(page, [selectedIds[0]]);
      await visit(page, `./#${selectedIds[0]}`);
      await page.locator('#search').fill('kiracı');
      await page.setViewportSize({ width, height: width === 320 ? 568 : 900 });
      if (state === 'panels') {
        await page.locator('#cluster-picker > summary').click();
        expect(await typographyFailures(page)).toEqual([]);
        await page.keyboard.press('Escape');
      } else {
        await page.locator('#toggle-original').click();
        await page.locator('#toggle-relations').click();
        if (state === 'empty results') {
          await page.locator('#search').fill('sonuç bulunmamalı 987654321');
          await expect(page.locator('#empty')).toBeVisible();
        }
        expect(await typographyFailures(page)).toEqual([]);
      }
    });
  }
}

test('colored feature text has full saturation and readable contrast; checkboxes have distinct square borders', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await visit(page);
  const background = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );
  const channels = background
    .match(/[\d.]+/g)
    .slice(0, 3)
    .map(Number);
  expect(channels[0]).toBeGreaterThanOrEqual(250);
  expect(channels[1]).toBeGreaterThanOrEqual(248);
  expect(channels[2]).toBeGreaterThanOrEqual(238);
  expect(channels[0]).toBeGreaterThanOrEqual(channels[1]);
  expect(channels[1]).toBeGreaterThan(channels[2]);
  const result = await page.locator('.feature').evaluateAll((rows) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const rgba = (color) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data);
    };
    const composite = (front, back) => {
      const alpha = front[3] / 255;
      return front
        .slice(0, 3)
        .map((value, index) => value * alpha + back[index] * (1 - alpha));
    };
    const luminance = (color) =>
      color.slice(0, 3).reduce((total, value, index) => {
        const component = value / 255;
        return (
          total +
          (component <= 0.04045
            ? component / 12.92
            : ((component + 0.055) / 1.055) ** 2.4) *
            [0.2126, 0.7152, 0.0722][index]
        );
      }, 0);
    const contrast = (a, b) => {
      const levels = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (levels[0] + 0.05) / (levels[1] + 0.05);
    };
    return rows.map((row) => {
      const title = row.querySelector('.feature-title');
      const origin = row.querySelector('.origin');
      const checkbox = row.querySelector('.feature-check');
      let background = [255, 255, 255];
      const ancestors = [];
      for (let element = title; element; element = element.parentElement)
        ancestors.unshift(element);
      ancestors.forEach((element) => {
        background = composite(
          rgba(getComputedStyle(element).backgroundColor),
          background,
        );
      });
      const color = rgba(getComputedStyle(title).color);
      const style = getComputedStyle(checkbox);
      const bounds = checkbox.getBoundingClientRect();
      return {
        id: row.id,
        kind: row.dataset.kind,
        color,
        originColor: rgba(getComputedStyle(origin).color),
        contrast: contrast(color, background),
        checkboxColor: rgba(style.borderTopColor),
        border: Number.parseFloat(style.borderTopWidth),
        radius: Number.parseFloat(style.borderTopLeftRadius),
        width: bounds.width,
        height: bounds.height,
      };
    });
  });
  for (const row of result) {
    expect(row.contrast, `${row.id} text contrast`).toBeGreaterThanOrEqual(4.5);
    expect(Math.min(...row.color.slice(0, 3)), `${row.id} saturation`).toBe(0);
    const dominantChannel = { o: 2, g: 1, n: 0 }[row.kind];
    expect(row.color[dominantChannel], `${row.id} class hue`).toBeGreaterThan(
      Math.max(
        ...row.color
          .slice(0, 3)
          .filter((_, index) => index !== dominantChannel),
      ),
    );
    expect(row.originColor, `${row.id} origin matches feature text`).toEqual(
      row.color,
    );
    expect(
      row.checkboxColor,
      `${row.id} checkbox matches feature text`,
    ).toEqual(row.color);
    expect(row.border, `${row.id} checkbox border`).toBeGreaterThanOrEqual(2);
    expect(row.radius, `${row.id} square checkbox`).toBeLessThanOrEqual(
      Math.max(row.width, 24) * 0.15,
    );
    if (row.width > 0) {
      expect(row.width).toBeGreaterThanOrEqual(24);
      expect(row.width).toBe(row.height);
    }
  }
  expect(new Set(result.map((row) => JSON.stringify(row.color))).size).toBe(3);
  expect(
    Object.fromEntries(
      ['o', 'g', 'n'].map((kind) => [
        kind,
        result.filter((row) => row.kind === kind).length,
      ]),
    ),
  ).toEqual({ o: 105, g: 248, n: 34 });
  expect(
    new Set(result.map((row) => JSON.stringify(row.checkboxColor))).size,
  ).toBe(3);
});

for (const kind of ['o', 'g', 'n']) {
  test(`colored feature mouse selection preserves the ${kind} source class color`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await visit(page);
    const id = await page
      .locator(`.feature[data-kind="${kind}"]`)
      .first()
      .getAttribute('id');
    const row = await openFeature(page, id);
    await expect(row).toBeVisible();
    const colors = () =>
      row.evaluate((element) => {
        const checkbox = getComputedStyle(
          element.querySelector('.feature-check'),
        );
        return {
          checked: element.querySelector('.feature-check').checked,
          text: getComputedStyle(element.querySelector('.feature-title')).color,
          origin: getComputedStyle(element.querySelector('.origin')).color,
          border: checkbox.borderTopColor,
          fill: checkbox.backgroundColor,
        };
      });
    const empty = await colors();
    expect(empty.checked).toBe(false);
    expect(empty.origin).toBe(empty.text);
    expect(empty.border).toBe(empty.text);
    expect(empty.fill).not.toBe(empty.text);
    await row.locator('.feature-label').click();
    const selected = await colors();
    expect(selected.checked).toBe(true);
    expect(selected.text).toBe(empty.text);
    expect(selected.origin).toBe(selected.text);
    expect(selected.border).toBe(selected.text);
    expect(selected.fill).toBe(selected.text);
    await row.locator('.feature-label').click();
    const cleared = await colors();
    expect(cleared.checked).toBe(false);
    expect(cleared).toEqual(empty);
  });
}

test('mouse does not frame parent sections and keyboard focus has one visible control indicator', async ({
  page,
}, testInfo) => {
  await visit(page);
  const row = await openFeature(page, selectedIds[0]);
  await row.locator('label').first().click();
  const parentFrames = await row.evaluate((element) => {
    const containers = [
      element,
      element.closest('.group'),
      element.closest('.cluster'),
      document.querySelector('main'),
    ].filter(Boolean);
    return containers.map((container) => {
      const style = getComputedStyle(container);
      return {
        className: container.className,
        outline: style.outlineStyle,
        width: style.outlineWidth,
        shadow: style.boxShadow,
      };
    });
  });
  parentFrames.forEach((frame) => {
    expect(
      frame.outline === 'none' || Number.parseFloat(frame.width) === 0,
      JSON.stringify(frame),
    ).toBeTruthy();
    expect(frame.shadow, JSON.stringify(frame)).toBe('none');
  });
  await page.locator('#search').focus();
  await page.keyboard.press('Tab');
  const focusState = await page.evaluate(() => {
    const element = document.activeElement;
    const style = getComputedStyle(element);
    return {
      interactive: element.matches(
        'button, input, a[href], summary, textarea, select',
      ),
      visible: element.matches(':focus-visible'),
      outlineWidth: Number.parseFloat(style.outlineWidth),
      outlineStyle: style.outlineStyle,
      outlineColor: style.outlineColor,
      shadow: style.boxShadow,
      focused: document.querySelectorAll(':focus-visible').length,
      backgrounds: [element, element.parentElement, document.body].map(
        (ancestor) => getComputedStyle(ancestor).backgroundColor,
      ),
    };
  });
  expect(focusState.interactive).toBeTruthy();
  expect(focusState.visible).toBeTruthy();
  expect(focusState.focused).toBe(1);
  expect(focusState.outlineStyle).not.toBe('none');
  expect(focusState.outlineWidth).toBeGreaterThanOrEqual(2);
  expect(focusState.shadow).toBe('none');
  const rgb = (value) => value.match(/[\d.]+/g).map(Number);
  const foreground = rgb(focusState.outlineColor);
  const background = focusState.backgrounds
    .map(rgb)
    .find((color) => color.length < 4 || color[3] > 0) || [255, 255, 255];
  const luminance = (color) =>
    color.slice(0, 3).reduce((total, value, index) => {
      const component = value / 255;
      return (
        total +
        (component <= 0.04045
          ? component / 12.92
          : ((component + 0.055) / 1.055) ** 2.4) *
          [0.2126, 0.7152, 0.0722][index]
      );
    }, 0);
  const levels = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  expect(
    (levels[0] + 0.05) / (levels[1] + 0.05),
    'keyboard outline contrast',
  ).toBeGreaterThanOrEqual(3);
  await attachViewport(page, testInfo, 'keyboard-focus-candidate');
});

test('automated WCAG checks cover default, selected and open cluster-picker states', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await restoreSelection(page, [selectedIds[0]]);
  await visit(page, `./#${selectedIds[0]}`);
  await page.locator('#cluster-picker > summary').click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  await testInfo.attach('automated-accessibility-result', {
    body: JSON.stringify(
      {
        violations: results.violations,
        incomplete: results.incomplete,
        passes: results.passes.map((rule) => rule.id),
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });
  expect(results.violations).toEqual([]);
});

test('enlarged root text and reduced motion retain the critical 320px selection flow baseline typography and reflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page);
  await page.addStyleTag({ content: 'html { font-size: 125% !important; }' });
  expect(await typographyFailures(page)).toEqual([]);
});

test('enlarged root text and reduced motion retain the critical 320px selection flow selection and export', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page);
  await page.addStyleTag({ content: 'html { font-size: 125% !important; }' });
  await selectFeature(page, selectedIds[0]);
  await page.locator('#search').fill('kiracı');
  await page.locator('#selected-only').click();
  await expect(page.locator('.feature:visible')).toHaveCount(1);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1,
    ),
  ).toBeTruthy();
  const json = JSON.parse(await exportText(page, 'json'));
  expect(json.selectedCount).toBe(1);
});

test('200% root text at 320x480 keeps all content contained and selection export operable baseline typography and reflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await visit(page);
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  expect(await typographyFailures(page)).toEqual([]);
  await expectContainedWidth(page, '200% root text before filtering');
  const compressedFilterLabels = await page
    .locator('.filter-label')
    .evaluateAll((labels) => {
      const context = document.createElement('canvas').getContext('2d');
      return labels
        .filter((label) => {
          const style = getComputedStyle(label);
          context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          const longest = Math.max(
            ...label.textContent
              .trim()
              .split(/\s+/)
              .map((word) => context.measureText(word).width),
          );
          return label.getBoundingClientRect().width + 1 < longest;
        })
        .map((label) => label.textContent);
    });
  expect(
    compressedFilterLabels,
    'Filter labels retain room for whole words at 200%',
  ).toEqual([]);
});

test('200% root text at 320x480 keeps all content contained and selection export operable selection and export', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await visit(page);
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await selectFeature(page, selectedIds[0]);
  await page.locator('#search').fill('kiracı');
  await page.locator('#selected-only').click();
  await expect(page.locator('.feature:visible')).toHaveCount(1);
  await expectContainedWidth(page, '200% root text with selection');
  const json = JSON.parse(await exportText(page, 'json'));
  expect(json.selectedCount).toBe(1);
  expect(json.clusters[0].groups[0].items[0].id).toBe('tenant-1');
  await attachViewport(
    page,
    testInfo,
    'root-text-200-percent-320x480-candidate',
  );
});

test('user text spacing at 320x480 preserves reflow, selection and export baseline typography and reflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await visit(page);
  await page.addStyleTag({
    content: `
      body, body * {
        line-height: 1.5 !important;
        letter-spacing: .12em !important;
        word-spacing: .16em !important;
      }
      p { margin-block-end: 2em !important; }
    `,
  });
  expect(await typographyFailures(page)).toEqual([]);
  await expectContainedWidth(page, 'user text spacing before filtering');
});

test('user text spacing at 320x480 preserves reflow, selection and export selection and export', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await visit(page);
  await page.addStyleTag({
    content: `
      body, body * {
        line-height: 1.5 !important;
        letter-spacing: .12em !important;
        word-spacing: .16em !important;
      }
      p { margin-block-end: 2em !important; }
    `,
  });
  await selectFeature(page, selectedIds[0]);
  await page.locator('#search').fill('kiracı');
  await page.locator('#selected-only').click();
  await expect(page.locator('.feature:visible')).toHaveCount(1);
  await expectContainedWidth(page, 'user text spacing with selection');
  const json = JSON.parse(await exportText(page, 'json'));
  expect(json.selectedCount).toBe(1);
  await attachViewport(page, testInfo, 'user-text-spacing-320x480-candidate');
});

test('font download failure retains a readable fallback and working selection export', async ({
  page,
}, testInfo) => {
  const blockedFonts = [];
  await page.route('**/*.woff2', async (route) => {
    blockedFonts.push(route.request().url());
    await route.abort('failed');
  });
  await page.setViewportSize({ width: 320, height: 480 });
  await visit(page);
  expect(blockedFonts.length).toBeGreaterThan(0);
  const outfitLoaded = await page.evaluate(() =>
    Array.from(document.fonts).some(
      (face) =>
        face.family.replace(/['"]/g, '') === 'Outfit' &&
        face.status === 'loaded',
    ),
  );
  expect(outfitLoaded).toBe(false);
  expect(await typographyFailures(page)).toEqual([]);
  await expectContainedWidth(page, 'font fallback before filtering');
  await selectFeature(page, selectedIds[0]);
  const json = JSON.parse(await exportText(page, 'json'));
  expect(json.selectedCount).toBe(1);
  await expectContainedWidth(page, 'font fallback with selection');
  await attachViewport(page, testInfo, 'font-fallback-320x480-candidate');
});

test('search clear has a complete fine or coarse input target and returns focus to search', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await visit(page);
  await page.locator('#search').fill('kiracı');
  const clear = await expectClearSearchTarget(page, testInfo);
  await clear.click();
  await expect(page.locator('#search')).toHaveValue('');
  await expect(page.locator('#search')).toBeFocused();
});

const visitWithDeniedStorage = async (page) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem']) {
      Object.defineProperty(Storage.prototype, method, {
        configurable: true,
        value() {
          throw new DOMException(
            'Storage access denied by browser policy',
            'SecurityError',
          );
        },
      });
    }
  });
  await page.setViewportSize({ width: 320, height: 480 });
  await visit(page);
  return errors;
};

test('denied browser storage exports and clears in-memory selection', async ({
  page,
}) => {
  const errors = await visitWithDeniedStorage(page);
  await selectFeature(page, selectedIds[0]);
  const json = JSON.parse(await exportText(page, 'json'));
  expect(json.selectedCount).toBe(1);
  await page.locator('#clear-selection').click();
  await expect(page.locator('.feature-check:checked')).toHaveCount(0);
  await expect(page.locator('#export-selected')).toBeDisabled();
  expect(errors).toEqual([]);
});

test('denied browser storage forgets selection on reload', async ({ page }) => {
  const errors = await visitWithDeniedStorage(page);
  await selectFeature(page, selectedIds[0]);
  await page.reload();
  await expect(page.locator('.feature-check:checked')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('denied browser storage supports another selection and export after reload', async ({
  page,
}) => {
  const errors = await visitWithDeniedStorage(page);
  await page.reload();
  await expect(page.locator('#search')).toBeEnabled();
  await selectFeature(page, selectedIds[1]);
  expect(JSON.parse(await exportText(page, 'json')).selectedCount).toBe(1);
  expect(errors).toEqual([]);
});

const storageCases = [
  { name: 'invalid JSON', stored: '{broken-json', expectedIds: [] },
  {
    name: 'object instead of array',
    stored: JSON.stringify({ id: 'tenant-1' }),
    expectedIds: [],
  },
  {
    name: 'string instead of array',
    stored: JSON.stringify('tenant-1'),
    expectedIds: [],
  },
  {
    name: 'unknown, duplicate and non-string array entries',
    stored: JSON.stringify([
      'tenant-1',
      'unknown-9999',
      null,
      17,
      {},
      'tenant-1',
    ]),
    expectedIds: ['tenant-1'],
  },
];

for (const { name, stored, expectedIds } of storageCases) {
  test(`stored selection recovers from ${name}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      { key: selectionKey, value: stored },
    );
    await visit(page);
    await expect(page.locator('.feature-check:checked')).toHaveCount(
      expectedIds.length,
    );
    const checked = await page
      .locator('.feature-check:checked')
      .evaluateAll((inputs) =>
        inputs.map((input) =>
          input.closest('.feature').id.replace(/^feature-/, ''),
        ),
      );
    expect(checked).toEqual(expectedIds);
    await selectFeature(
      page,
      expectedIds.length ? selectedIds[1] : selectedIds[0],
    );
    const json = JSON.parse(await exportText(page, 'json'));
    expect(json.selectedCount).toBe(expectedIds.length + 1);
    expect(errors).toEqual([]);
  });
}

test('coarse and hybrid input use real touch with reachable targets and preserve keyboard operation', async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.use.hasTouch,
    'Requires a project with an actual emulated touch input capability.',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await visit(page);
  const start = page.locator('.start-link');
  const context = page.locator('#context-details > summary');
  for (const target of [start, context]) {
    const targetBox = await target.boundingBox();
    expect(targetBox.height).toBeGreaterThanOrEqual(48);
  }
  await start.tap();
  await expect(page).toHaveURL(/#inventory$/);
  const row = page.locator(`#${selectedIds[0]}`);
  const group = row.locator(
    'xpath=ancestor::details[contains(@class,"group")]',
  );
  const groupSummary = group.locator(':scope > summary');
  await expect(group).not.toHaveAttribute('open');
  const summaryBox = await groupSummary.boundingBox();
  expect(summaryBox.height).toBeGreaterThanOrEqual(48);
  expect(summaryBox.width).toBeGreaterThanOrEqual(48);
  await groupSummary.tap();
  await expect(group).toHaveAttribute('open', '');
  await groupSummary.tap();
  await expect(group).not.toHaveAttribute('open');
  await groupSummary.tap();
  await expect(group).toHaveAttribute('open', '');
  await context.tap();
  await expect(page.locator('#context-details')).toHaveAttribute('open', '');
  await context.tap();
  await expect(page.locator('#context-details')).not.toHaveAttribute('open');
  await page.locator('#roadmap-filters > summary').tap();
  await page.locator('button[data-support="external"]').tap();
  const identityGroup = page.locator('#group-identity');
  if ((await identityGroup.getAttribute('open')) === null)
    await identityGroup.locator(':scope > summary').tap();
  await expect(page.locator('#feature-identity-1')).toBeVisible();
  const external = await page
    .locator('.feature:visible')
    .evaluateAll((rows) =>
      rows.every((row) => row.dataset.support === 'external'),
    );
  expect(external).toBe(true);
  await page.locator('#reset-all').tap();
  await expect(page.locator('.feature:not([hidden])')).toHaveCount(387);
  await expect(page.locator('.group:visible')).toHaveCount(49);
  const scope = page.locator('[data-scope-filter="conditional"]');
  expect((await scope.boundingBox()).height).toBeGreaterThanOrEqual(48);
  await scope.tap();
  expect(
    await page
      .locator('.feature:not([hidden])')
      .evaluateAll((rows) =>
        rows.every((row) => row.dataset.scope === 'conditional'),
      ),
  ).toBe(true);
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await page.locator('#reset-all').tap();
  await expect(page.locator('.feature:not([hidden])')).toHaveCount(387);
  const review = page.locator('#scope-review > summary');
  expect((await review.boundingBox()).height).toBeGreaterThanOrEqual(48);
  await review.tap();
  await expect(page.locator('#scope-review')).toHaveAttribute('open', '');
  await review.tap();
  await expect(page.locator('#scope-review')).not.toHaveAttribute('open');
  await page.locator('#roadmap-filters > summary').tap();
  await groupSummary.tap();
  await expect(group).toHaveAttribute('open', '');
  const label = row.locator('label').first();
  const box = await label.boundingBox();
  expect(box.height).toBeGreaterThanOrEqual(48);
  expect(box.width).toBeGreaterThanOrEqual(48);
  await label.tap();
  await expect(row.getByRole('checkbox')).toBeChecked();
  await page.locator('#search').tap();
  await page.locator('#search').fill('kiracı');
  const clear = await expectClearSearchTarget(page, testInfo);
  await clear.tap();
  await expect(page.locator('#search')).toHaveValue('');
  await expect(page.locator('#search')).toBeFocused();
  await page.locator('#search').fill('kiracı');
  await page.setViewportSize({ width: 568, height: 320 });
  await expect(page.locator('#search')).toHaveValue('kiracı');
  await expect(page.locator('#search')).toBeFocused();
  await page.locator('#selected-only').tap();
  await expect(page.locator('.feature:visible')).toHaveCount(1);
  await row.getByRole('checkbox').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('.feature-check:checked')).toHaveCount(0);
  await attachViewport(page, testInfo, 'touch-landscape-candidate');
});

test('cold navigation and bounded interactions request only local shared production assets', async ({
  page,
}, testInfo) => {
  const requests = [];
  const responseBodies = [];
  page.on('request', (request) =>
    requests.push({ url: request.url(), type: request.resourceType() }),
  );
  page.on('response', (response) => {
    if (!/\.(?:js|json)$/.test(new URL(response.url()).pathname)) return;
    responseBodies.push(
      response.text().then(
        (body) => ({
          url: response.url(),
          status: response.status(),
          contentType: response.headers()['content-type'] || '',
          body,
        }),
        (error) => ({ url: response.url(), error: error.message }),
      ),
    );
  });
  await visit(page);
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    'json',
  );
  const origin = new URL(page.url()).origin;
  await page.locator('#search').fill('kiracı');
  await page.locator('#cluster-picker > summary').click();
  await page.keyboard.press('Escape');
  await selectFeature(page, selectedIds[0]);
  await page.setViewportSize({ width: 568, height: 320 });
  await page.locator('#selected-only').click();
  const invalid = requests.filter(({ url }) => {
    if (url.startsWith('data:') || url.startsWith('blob:')) return false;
    return new URL(url).origin !== origin;
  });
  expect(invalid).toEqual([]);
  const contentPaths = [
    'data/manifest.json',
    'data/atlas.json',
    'data/roadmap.json',
    'data/interface.json',
    'data/messages.json',
    'data/review.json',
    'data/component-catalog.json',
    'data/development-plan.json',
    ...[
      '12',
      '01',
      '11',
      '05',
      '09',
      '04',
      '06',
      '07',
      '02',
      '03',
      '08',
      '10',
    ].map((id) => `data/clusters/${id}.json`),
  ];
  const scriptPaths = [
    'assets/app.js',
    'assets/exports.js',
    'assets/content-engine.js',
    'assets/content-templates.js',
  ];
  const allowedUrls = new Set(
    [
      page.url(),
      'assets/styles.css',
      'assets/favicon.svg',
      'assets/fonts/outfit-latin.woff2',
      'assets/fonts/outfit-latin-ext.woff2',
      ...scriptPaths,
      ...contentPaths,
    ].map((path) => new URL(path, new URL('../', page.url())).href),
  );
  expect(
    requests.filter(
      ({ url }) =>
        !url.startsWith('data:') &&
        !url.startsWith('blob:') &&
        !allowedUrls.has(url),
    ),
    'Only the common production allowlist may be requested',
  ).toEqual([]);
  const requestedUrls = new Set(requests.map(({ url }) => url));
  for (const path of [...scriptPaths, ...contentPaths, 'assets/styles.css'])
    expect(
      requestedUrls.has(new URL(path, new URL('../', page.url())).href),
      `Required shared asset: ${path}`,
    ).toBe(true);
  const responses = await Promise.all(responseBodies);
  expect(responses).toHaveLength(scriptPaths.length + contentPaths.length);
  for (const response of responses) {
    expect(response.error, response.url).toBeUndefined();
    expect(response.status, response.url).toBe(200);
    if (new URL(response.url).pathname.endsWith('.json')) {
      expect(response.contentType, response.url).toMatch(
        /^application\/json(?:;|$)/i,
      );
      expect(() => JSON.parse(response.body), response.url).not.toThrow();
    } else {
      expect(response.contentType, response.url).toMatch(
        /^(?:text|application)\/(?:javascript|ecmascript)(?:;|$)/i,
      );
      expect(response.body, response.url).not.toMatch(
        /^\s*(?:<!doctype|<html)/i,
      );
    }
  }
  expect(requests.some(({ type }) => type === 'font')).toBeTruthy();
  expect(
    requests.filter(({ url }) =>
      /\.(?:tsx?|jsx|scss|sass|less)(?:\?|$)/.test(url),
    ),
  ).toEqual([]);
  await testInfo.attach('cold-request-inventory', {
    body: JSON.stringify(
      {
        cache: 'new test browser context',
        serviceWorkers:
          testInfo.project.use.serviceWorkers || 'Playwright default',
        requests,
        responses: responses.map(({ body, ...response }) => ({
          ...response,
          decodedUtf8Bytes: Buffer.byteLength(body, 'utf8'),
        })),
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });
});

test('200% text in a 1024px short workspace leaves content and export reachable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await visit(page);
  await page.addStyleTag({ content: 'html{font-size:200%!important}' });
  await expect
    .poll(() =>
      page.evaluate(() => {
        const el = document.querySelector('.toolbar');
        return (
          getComputedStyle(el).position !== 'sticky' ||
          el.getBoundingClientRect().height < innerHeight / 2
        );
      }),
    )
    .toBeTruthy();
  await selectFeature(page, selectedIds[0]);
  const json = JSON.parse(await exportText(page, 'json'));
  expect(json.selectedCount).toBe(1);
});
