import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const originalInventory = JSON.parse(
  await readFile(
    new URL('./fixtures/original-inventory.json', import.meta.url),
    'utf8',
  ),
);
const originalIds = new Set(originalInventory.map((item) => item.id));

function expectPreservedInventory(clusters, review) {
  expect(originalIds.size).toBe(326);
  const entries = flattenInventory(clusters);
  expect(entries).toHaveLength(387);
  expect(new Set(entries.map((item) => item.id)).size).toBe(387);
  expect(entries.filter((item) => originalIds.has(item.id))).toEqual(
    [...originalInventory].sort((left, right) =>
      left.id.localeCompare(right.id),
    ),
  );
  const additions = entries.filter((item) => !originalIds.has(item.id));
  expect(additions).toHaveLength(61);
  expect(additions.map((item) => item.id).sort()).toEqual(
    [...review.addedItemIds].sort(),
  );
}

async function visit(page, source = 'json') {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    source,
  );
  await expect(page.locator('.feature')).toHaveCount(387);
}

async function openFirstFeature(page) {
  const group = page.locator('.group').first();
  await group.locator(':scope > summary').click();
  await expect(group).toHaveAttribute('open', '');
  return group.locator('.feature').first();
}

async function downloadSelection(page, format) {
  await page.locator(`input[name="export-format"][value="${format}"]`).check();
  const pending = page.waitForEvent('download');
  await page.locator('#export-selected').click();
  const download = await pending;
  expect(await download.failure()).toBeNull();
  return readFile(await download.path(), 'utf8');
}

async function pauseBrowserClock(page) {
  await page.clock.install({ time: new Date('2026-10-10T00:00:00Z') });
  // Pause before navigation, when no application deadline has been scheduled.
  // Node route delays stay real; only browser timers use the controlled clock.
  await page.clock.pauseAt(new Date('2026-10-10T00:01:00Z'));
}

function flattenInventory(clusters) {
  return clusters
    .flatMap((cluster) =>
      cluster.groups.flatMap((group) =>
        group.items.map((item, index) => ({
          id: `${group.id}-${index + 1}`,
          kind: item.kind,
          text: item.text,
          ...('raw' in item ? { raw: item.raw } : {}),
        })),
      ),
    )
    .sort((left, right) => left.id.localeCompare(right.id));
}

function replaceContent(value, replacements) {
  if (typeof value === 'string') return replacements.get(value) ?? value;
  if (Array.isArray(value))
    return value.map((entry) => replaceContent(entry, replacements));
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        replaceContent(entry, replacements),
      ]),
    );
  return value;
}

test('classified JSON drives all 12 clusters without changing the 326 original contents', async ({
  page,
}, testInfo) => {
  const documents = new Map();
  page.on('response', (response) => {
    if (/\/data\/.*\.json$/.test(new URL(response.url()).pathname))
      documents.set(response.url(), response.json());
  });
  await visit(page);
  const manifestUrl = new URL('./data/manifest.json', page.url()).href;
  expect(documents.has(manifestUrl)).toBe(true);
  const manifest = await documents.get(manifestUrl);
  expect(manifest.clusters).toHaveLength(12);
  const paths = [
    manifest.metadata,
    manifest.roadmap,
    manifest.interface,
    manifest.messages,
    manifest.review,
    manifest.componentCatalog,
    manifest.developmentPlan,
    ...manifest.clusters,
  ].map((path) => new URL(path, manifestUrl).href);
  expect(paths).toHaveLength(19);
  expect(new Set(paths).size).toBe(paths.length);
  for (const url of paths) expect(documents.has(url), url).toBe(true);
  expect(documents.size).toBe(20);
  const clusters = await Promise.all(
    manifest.clusters.map((path) =>
      documents.get(new URL(path, manifestUrl).href),
    ),
  );
  const review = await documents.get(
    new URL(manifest.review, manifestUrl).href,
  );
  expect(clusters.map((cluster) => cluster.id)).toEqual(
    await page
      .locator('.cluster')
      .evaluateAll((elements) =>
        elements.map((element) => element.dataset.cluster),
      ),
  );
  expectPreservedInventory(clusters, review);
  const rendered = await page.evaluate(() => ({
    data: JSON.parse(document.querySelector('#atlas-data').textContent),
    entries: [...document.querySelectorAll('.feature')].map((element) => ({
      id: element.dataset.item,
      kind: element.dataset.kind,
      text: element.querySelector('.feature-title').textContent,
    })),
  }));
  expect(rendered.data.clusters).toEqual(clusters);
  expect(rendered.data.review).toEqual(review);
  expect(rendered.data.componentCatalog).toEqual(
    await documents.get(new URL(manifest.componentCatalog, manifestUrl).href),
  );
  expect(rendered.entries).toEqual(
    clusters.flatMap((cluster) =>
      cluster.groups.flatMap((group) =>
        group.items.map((item, index) => ({
          id: `${group.id}-${index + 1}`,
          kind: item.kind,
          text: item.text,
        })),
      ),
    ),
  );
  await testInfo.attach('classified-json-browser-inventory', {
    body: JSON.stringify(
      {
        manifestUrl,
        documents: [...documents.keys()],
        itemCount: 387,
        originalItemCount: originalIds.size,
        addedItemIds: review.addedItemIds,
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });
});

test('interface JSON supplies the page heading and technical guide disclosure copy', async ({
  page,
}) => {
  const title = 'JSON içeriğinden gelen arayüz başlığı.';
  const guide = 'JSON içeriğinden gelen teknik etiket rehberi.';
  await page.route('**/data/interface.json', async (route) => {
    const response = await route.fetch();
    const copy = replaceContent(
      await response.json(),
      new Map([
        ['Hazır olanı kullanın. Kalan işi görün.', title],
        ['Etiketleri ve geliştirme sırasını nasıl okumalı?', guide],
      ]),
    );
    await route.fulfill({ response, json: copy });
  });
  await visit(page);
  await expect(page.locator('#page-title')).toHaveText(title);
  await page.locator('#context-details > summary').click();
  const disclosure = page.locator('.roadmap-guide');
  await expect(disclosure.locator(':scope > summary')).toHaveText(guide);
  await disclosure.locator(':scope > summary').click();
  await expect(disclosure.locator('.note-body')).toBeVisible();
  await expect(disclosure.locator('.note-body')).toContainText(
    'Çekirdekte var',
  );
});

async function visitEditedCluster(page) {
  const text = 'JSON kaynağından gelen değişiklik: deneme özelliği.';
  const note = 'JSON kaynağından gelen açıklama ve kabul bilgileri korunur.';
  let edited;
  await page.route('**/data/clusters/12.json', async (route) => {
    const response = await route.fetch();
    const cluster = await response.json();
    const group = cluster.groups[0];
    const item = group.items[0];
    item.text = text;
    item.assessment.note = note;
    edited = { id: `${group.id}-1`, item, group, cluster };
    await route.fulfill({ response, json: cluster });
  });
  await visit(page);
  expect(edited).toBeDefined();
  const row = await openFirstFeature(page);
  return { text, note, edited, row };
}

test('edited cluster JSON supplies visible text, assessments and search results', async ({
  page,
}) => {
  const { text, note, row } = await visitEditedCluster(page);
  await expect(row.locator('.feature-title')).toHaveText(text);
  await row.locator('.assessment > summary').click();
  await expect(row.locator('.assessment-note')).toHaveText(note);
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  await page.locator('#search').fill('deneme özelliği');
  await expect(page.locator('.feature:not([hidden])')).toHaveCount(1);
  await expect(row).toBeVisible();
});

test('edited cluster JSON supplies complete selected JSON exports', async ({
  page,
}) => {
  const { text, edited, row } = await visitEditedCluster(page);
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  const json = JSON.parse(await downloadSelection(page, 'json'));
  const [exportedCluster] = json.clusters;
  const [exportedGroup] = exportedCluster.groups;
  for (const field of [
    'id',
    'title',
    'short',
    'phase',
    'roadmapOrder',
    'rationale',
    'dependsOn',
  ])
    expect(exportedCluster[field], `selected cluster ${field}`).toEqual(
      edited.cluster[field],
    );
  for (const field of [
    'id',
    'num',
    'title',
    'owns',
    'links',
    'provides',
    'sources',
  ])
    expect(exportedGroup[field], `selected heading ${field}`).toEqual(
      edited.group[field],
    );
  const [exported] = json.clusters.flatMap((cluster) =>
    cluster.groups.flatMap((group) => group.items),
  );
  expect(exported.id).toBe(edited.id);
  expect(exported.text).toBe(text);
  expect(exported.assessment).toEqual(edited.item.assessment);
  if ('raw' in edited.item) expect(exported.raw).toBe(edited.item.raw);
});

test('edited cluster JSON supplies complete selected Markdown exports', async ({
  page,
}) => {
  const { text, note, edited, row } = await visitEditedCluster(page);
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  const markdown = (await downloadSelection(page, 'md')).replace(
    /\\([\\`*_{}[\]()#+.!|~=-])/g,
    '$1',
  );
  expect(markdown).toContain(text);
  expect(markdown).toContain(note);
  expect(markdown).toContain(edited.item.assessment.acceptance);
  expect(markdown).toContain(edited.group.owns);
  expect(markdown).toContain(edited.group.provides);
  if ('raw' in edited.item) expect(markdown).toContain(edited.item.raw);
  for (const [, label] of edited.group.links) expect(markdown).toContain(label);
  for (const source of edited.item.assessment.sources) {
    expect(markdown).toContain(source.title);
    expect(markdown).toContain(source.url);
  }
});

test('HTML-shaped JSON strings are displayed as text without creating executable elements', async ({
  page,
}) => {
  const text =
    '<img src=x onerror="window.contentInjected=true"> & <script>window.contentInjected=true</script>';
  await page.route('**/data/clusters/12.json', async (route) => {
    const response = await route.fetch();
    const cluster = await response.json();
    cluster.groups[0].items[0].text = text;
    await route.fulfill({ response, json: cluster });
  });
  await visit(page);
  const row = await openFirstFeature(page);
  await expect(row.locator('.feature-title')).toHaveText(text);
  await expect(
    row.locator('.feature-title img, .feature-title script'),
  ).toHaveCount(0);
  expect(await page.evaluate(() => window.contentInjected)).toBeUndefined();
});

for (const changed of [false, true]) {
  test(`delayed ${changed ? 'changed' : 'identical'} JSON preserves disclosures and keyboard focus opened before hydration`, async ({
    page,
  }) => {
    const replacement = 'Gecikmeli JSON yanıtından gelen güncel özellik metni.';
    let releaseHydration;
    const interactionReady = new Promise((resolve) => {
      releaseHydration = resolve;
    });
    let enteredRoute;
    const requestPending = new Promise((resolve) => {
      enteredRoute = resolve;
    });
    await page.route('**/data/clusters/12.json', async (route) => {
      const response = await route.fetch();
      const cluster = await response.json();
      if (changed) cluster.groups[0].items[0].text = replacement;
      enteredRoute();
      // Hold the response until native interactions finish; the release barrier
      // establishes the ordering without depending on real elapsed time.
      await interactionReady;
      await route.fulfill({ response, json: cluster });
    });
    await page.setViewportSize({ width: 320, height: 568 });
    await pauseBrowserClock(page);
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await requestPending;
    await expect(page.locator('#search')).toBeDisabled();
    const context = page.locator('#context-details');
    await context.locator(':scope > summary').click();
    const group = page.locator('.group').first();
    const summary = group.locator(':scope > summary');
    await summary.click();
    const before = await group.evaluate((element) => ({
      id: element.id,
      contextOpen: document
        .querySelector('#context-details')
        .getAttribute('open'),
      groupOpen: element.getAttribute('open'),
    }));
    const groupId = before.id;
    expect(before.contextOpen).toBe('');
    expect(before.groupOpen).toBe('');
    await summary.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(summary).toBeFocused();
    await expect(page.locator('#search')).toBeDisabled();
    releaseHydration();
    await expect(page.locator('body')).toHaveAttribute(
      'data-content-source',
      'json',
    );
    const after = await page.locator(`#${groupId}`).evaluate((element) => ({
      searchEnabled: !document.querySelector('#search').matches(':disabled'),
      contextOpen: document
        .querySelector('#context-details')
        .getAttribute('open'),
      groupOpen: element.getAttribute('open'),
      openGroups: document.querySelectorAll('.group[open]').length,
      title: element.querySelector('.feature-title').textContent,
    }));
    expect(after.searchEnabled).toBe(true);
    expect(after.contextOpen).toBe('');
    expect(after.groupOpen).toBe('');
    await expect(page.locator(`#${groupId} > summary`)).toBeFocused();
    expect(after.openGroups).toBe(1);
    if (changed) expect(after.title).toBe(replacement);
  });
}

async function visitPendingChangedCluster(page) {
  const replacement = 'Yükleme sonrası filtrelenen ve CSV aktarılan özellik.';
  let releaseHydration;
  const interactionReady = new Promise((resolve) => {
    releaseHydration = resolve;
  });
  let enteredRoute;
  const requestPending = new Promise((resolve) => {
    enteredRoute = resolve;
  });
  let editedKind;
  await page.route('**/data/clusters/12.json', async (route) => {
    const response = await route.fetch();
    const cluster = await response.json();
    const item = cluster.groups[0].items[0];
    item.text = replacement;
    editedKind = item.kind;
    enteredRoute();
    await interactionReady;
    await route.fulfill({ response, json: cluster });
  });
  await page.setViewportSize({ width: 320, height: 568 });
  await pauseBrowserClock(page);
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await requestPending;
  return { replacement, editedKind, releaseHydration };
}

async function releaseChangedCluster(page, releaseHydration) {
  releaseHydration();
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    'json',
  );
  await expect(page.locator('#search')).toBeEnabled();
}

test('pending changed JSON keeps every JavaScript control disabled until hydration completes', async ({
  page,
}) => {
  const { releaseHydration } = await visitPendingChangedCluster(page);
  const pending = await page.evaluate(() => ({
    searchDisabled: document.querySelector('#search').matches(':disabled'),
    clusterCount: document.querySelectorAll('input[name="cluster"]').length,
    formatCount: document.querySelectorAll('input[name="export-format"]')
      .length,
    enabledClusters: document.querySelectorAll('input[name="cluster"]:enabled')
      .length,
    enabledFormats: document.querySelectorAll(
      'input[name="export-format"]:enabled',
    ).length,
    enabledButtons: document.querySelectorAll('button:not([disabled])').length,
    allChecked: document.querySelector('input[name="cluster"][value="all"]')
      .checked,
    jsonChecked: document.querySelector(
      'input[name="export-format"][value="json"]',
    ).checked,
    clusterDisabled: document
      .querySelector('input[name="cluster"][value="12"]')
      .matches(':disabled'),
    csvDisabled: document
      .querySelector('input[name="export-format"][value="csv"]')
      .matches(':disabled'),
  }));
  expect(pending.searchDisabled).toBe(true);
  expect(pending.clusterCount).toBe(13);
  expect(pending.formatCount).toBe(3);
  expect(pending.enabledClusters).toBe(0);
  expect(pending.enabledFormats).toBe(0);
  expect(pending.enabledButtons).toBe(0);
  expect(pending.allChecked).toBe(true);
  expect(pending.jsonChecked).toBe(true);
  expect(pending.clusterDisabled).toBe(true);
  expect(pending.csvDisabled).toBe(true);
  await releaseChangedCluster(page, releaseHydration);
  const ready = await page.evaluate(() => ({
    enabledClusters: document.querySelectorAll('input[name="cluster"]:enabled')
      .length,
    enabledFormats: document.querySelectorAll(
      'input[name="export-format"]:enabled',
    ).length,
  }));
  expect(ready.enabledClusters).toBe(13);
  expect(ready.enabledFormats).toBe(3);
});

async function filterChangedCluster(page, editedKind) {
  const sourceFilter = page.locator(`.filter[data-kind="${editedKind}"]`);
  await sourceFilter.click();
  await expect(sourceFilter).toHaveAttribute('aria-pressed', 'true');
  const picker = page.locator('#cluster-picker');
  await picker.locator(':scope > summary').click();
  const clusterChoice = picker.locator('input[name="cluster"][value="12"]');
  const clusterLabel = await picker
    .locator('input[value="12"] + span')
    .innerText();
  await clusterChoice.check();
  return { clusterLabel };
}

test('changed JSON hydration supplies working source and cluster filters with exact counts', async ({
  page,
}) => {
  const { editedKind, releaseHydration } =
    await visitPendingChangedCluster(page);
  await releaseChangedCluster(page, releaseHydration);
  const { clusterLabel } = await filterChangedCluster(page, editedKind);
  await expect(page.locator('#cluster-12')).toBeVisible();
  const filtered = await page
    .locator('#atlas-data')
    .evaluate((element, kind) => {
      const data = JSON.parse(element.textContent);
      const cluster = data.clusters.find((entry) => entry.id === '12');
      const items = cluster.groups
        .flatMap((group) => group.items)
        .filter((item) => item.kind === kind);
      return {
        expected: {
          items: items.length,
          groups: cluster.groups.filter((group) =>
            group.items.some((item) => item.kind === kind),
          ).length,
          total: data.clusters.flatMap((entry) =>
            entry.groups.flatMap((group) => group.items),
          ).length,
        },
        clusterChecked: document.querySelector(
          'input[name="cluster"][value="12"]',
        ).checked,
        allChecked: document.querySelector('input[name="cluster"][value="all"]')
          .checked,
        pickerOpen: document
          .querySelector('#cluster-picker')
          .getAttribute('open'),
        clusterValue: document.querySelector('#cluster-value').textContent,
        visibleClusters: document.querySelectorAll('.cluster:not([hidden])')
          .length,
        visibleItems: document.querySelectorAll('.feature:not([hidden])')
          .length,
        status: document.querySelector('#visible-status').textContent,
      };
    }, editedKind);
  expect(filtered.clusterChecked).toBe(true);
  expect(filtered.allChecked).toBe(false);
  expect(filtered.pickerOpen).toBeNull();
  expect(filtered.clusterValue).toBe(clusterLabel);
  expect(filtered.visibleClusters).toBe(1);
  const { expected } = filtered;
  expect(filtered.visibleItems).toBe(expected.items);
  expect(filtered.status).toBe(
    `${expected.items} / ${expected.total} madde · ${expected.groups} başlık`,
  );
});

test('changed JSON hydration exports a real CSV selection under the source and cluster filters', async ({
  page,
}) => {
  const { replacement, editedKind, releaseHydration } =
    await visitPendingChangedCluster(page);
  await releaseChangedCluster(page, releaseHydration);
  await filterChangedCluster(page, editedKind);
  const csvChoice = page.locator('input[name="export-format"][value="csv"]');
  await csvChoice.check();
  await expect(csvChoice).toBeChecked();
  await expect(
    page.locator('input[name="export-format"][value="json"]'),
  ).not.toBeChecked();
  const row = page.locator('#cluster-12 .feature').first();
  await expect(row.locator('.feature-title')).toHaveText(replacement);
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  expect(await downloadSelection(page, 'csv')).toContain(replacement);
});

test('the JSON loading deadline keeps all fallback content and working selection exports', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  let releaseResponse;
  const heldResponse = new Promise((resolve) => {
    releaseResponse = resolve;
  });
  let enteredRoute;
  const requestPending = new Promise((resolve) => {
    enteredRoute = resolve;
  });
  let completedRoute;
  const routeFinished = new Promise((resolve) => {
    completedRoute = resolve;
  });
  await page.route('**/data/clusters/12.json', async (route) => {
    try {
      const response = await route.fetch();
      enteredRoute();
      await heldResponse;
      await route.fulfill({ response });
    } finally {
      completedRoute();
    }
  });
  await page.setViewportSize({ width: 320, height: 568 });
  await pauseBrowserClock(page);
  try {
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await requestPending;
    await expect(page.locator('#search')).toBeDisabled();
    await page.clock.fastForward(5001);
    await expect(page.locator('body')).toHaveAttribute(
      'data-content-source',
      'fallback',
    );
    await expect(page.locator('#search')).toBeEnabled();
    releaseResponse();
    await routeFinished;
    await expect(page.locator('.feature')).toHaveCount(387);
    const data = await page
      .locator('#atlas-data')
      .evaluate((element) => JSON.parse(element.textContent));
    expectPreservedInventory(data.clusters, data.review);
    const row = await openFirstFeature(page);
    const text = await row.locator('.feature-title').textContent();
    await row.locator('.feature-label').click();
    await expect(row.locator('.feature-check')).toBeChecked();
    const json = JSON.parse(await downloadSelection(page, 'json'));
    expect(json.selectedCount).toBe(1);
    expect(
      json.clusters.flatMap((cluster) =>
        cluster.groups.flatMap((group) => group.items),
      )[0].text,
    ).toBe(text);
    expect(errors).toEqual([]);
  } finally {
    releaseResponse();
  }
});

const invalidMessages = [
  {
    name: 'missing app.selectionCount',
    mutate(messages) {
      delete messages.app.selectionCount;
    },
  },
  {
    name: 'invalid export.csv.roadmapColumns',
    mutate(messages) {
      messages.export.csv.roadmapColumns = 'invalid columns';
    },
  },
  {
    name: 'missing export.markdown.raw',
    mutate(messages) {
      delete messages.export.markdown.raw;
    },
  },
];

for (const { name, mutate } of invalidMessages) {
  for (const format of ['json', 'md']) {
    test(`${name} rejects runtime messages and keeps a complete working fallback ${format} export`, async ({
      page,
    }) => {
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.route('**/data/messages.json', async (route) => {
        const response = await route.fetch();
        const messages = await response.json();
        mutate(messages);
        await route.fulfill({ response, json: messages });
      });
      await visit(page, 'fallback');
      const data = await page
        .locator('#atlas-data')
        .evaluate((element) => JSON.parse(element.textContent));
      expectPreservedInventory(data.clusters, data.review);
      const row = await openFirstFeature(page);
      const text = await row.locator('.feature-title').textContent();
      await row.locator('.feature-label').click();
      await expect(row.locator('.feature-check')).toBeChecked();
      const downloaded = await downloadSelection(page, format);
      if (format === 'json') {
        const json = JSON.parse(downloaded);
        expect(json.selectedCount).toBe(1);
        expect(
          json.clusters.flatMap((cluster) =>
            cluster.groups.flatMap((group) => group.items),
          )[0].text,
        ).toBe(text);
      } else {
        const markdown = downloaded.replace(
          /\\([\\`*_{}[\]()#+.!|~=-])/g,
          '$1',
        );
        expect(markdown).toContain(text);
        expect(markdown).toContain('Frappe');
      }
      expect(errors).toEqual([]);
    });
  }
}

for (const failure of ['network', 'malformed JSON', 'invalid schema']) {
  for (const format of ['json', 'md']) {
    test(`${failure} keeps the complete generated fallback readable with a working ${format} selection export`, async ({
      page,
    }) => {
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.route('**/data/clusters/12.json', async (route) => {
        if (failure === 'network') await route.abort('failed');
        else
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: failure === 'malformed JSON' ? '{bad-json' : '{"groups":[]}',
          });
      });
      await visit(page, 'fallback');
      const data = await page
        .locator('#atlas-data')
        .evaluate((element) => JSON.parse(element.textContent));
      expectPreservedInventory(data.clusters, data.review);
      const row = await openFirstFeature(page);
      await expect(row.locator('.feature-title')).toBeVisible();
      await row.locator('.feature-label').click();
      await expect(row.locator('.feature-check')).toBeChecked();
      const downloaded = await downloadSelection(page, format);
      if (format === 'json') {
        const json = JSON.parse(downloaded);
        expect(json.selectedCount).toBe(1);
        expect(
          json.clusters.flatMap((cluster) =>
            cluster.groups.flatMap((group) => group.items),
          )[0].text,
        ).toBe(await row.locator('.feature-title').textContent());
      } else {
        expect(downloaded).toContain('Frappe');
      }
      expect(errors).toEqual([]);
    });
  }
}
