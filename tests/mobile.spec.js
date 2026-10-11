import { test, expect } from '@playwright/test';
import { readContentSources } from '../scripts/content-files.mjs';
import { resolvePlanning } from '../assets/content-engine.js';

const data = await readContentSources();
const additions = [
  'channels-17',
  'channels-18',
  'channels-19',
  'releases-12',
  'releases-13',
  'identity-10',
  'ai-7',
];
const byId = new Map(
  data.clusters.flatMap((c) =>
    c.groups.flatMap((g) =>
      g.items.map((item, i) => [`${g.id}-${i + 1}`, { item, group: g.id }]),
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
  await expect(page.locator('#search')).toBeEnabled();
};
const readable = (value) =>
  value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
const relatedDecisions = (ids) =>
  data.review.decisions.filter((d) => d.itemIds.some((id) => ids.includes(id)));
const relatedNotes = (decisions) =>
  Object.fromEntries(
    Object.entries(data.review.decisionNotes ?? {}).filter(([id]) =>
      decisions.some((d) => d.id === id),
    ),
  );
const downloadSelection = async (page, format) => {
  await page.locator(`[name="export-format"][value="${format}"]`).check();
  const pending = page.waitForEvent('download');
  await page.locator('#export-selected').click();
  const stream = await (await pending).createReadStream();
  let content = '';
  for await (const chunk of stream) content += chunk;
  return content;
};

for (const id of additions)
  test(`mobile roadmap ${id} stays selectable and readable at320`, async ({
    page,
  }, testInfo) => {
    const entry = byId.get(id);
    expect(entry, id).toBeTruthy();
    await visit(page);
    const previous = page.locator('#group-tenant');
    await previous.locator(':scope > summary').click();
    const group = page.locator(`#group-${entry.group}`);
    await group.locator(':scope > summary').focus();
    await page.keyboard.press('Enter');
    await expect(previous).not.toHaveAttribute('open');
    await expect(group).toHaveAttribute('open', '');
    await expect(page.locator('.group[open]')).toHaveCount(1);
    const row = page.locator(`#feature-${id}`);
    await row.locator('.feature-label').click();
    await expect(row.locator('.feature-check')).toBeChecked();
    const summary = row.locator('.assessment > summary');
    await summary.click();
    await expect(row.locator('.assessment-note')).toHaveText(
      entry.item.assessment.note,
    );
    await expect(row.locator('.assessment-body')).toContainText(
      entry.item.assessment.acceptance,
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
    expect(metrics.text.length).toBeGreaterThan(0);
    expect(
      metrics.text.every((x) => x.size >= metrics.root && x.weight >= 400),
    ).toBe(true);
    await summary.focus();
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
    await expect(page.locator('.feature-check:checked')).toHaveCount(1);
    await testInfo.attach(`${id}-assessment320`, {
      body: await row.screenshot(),
      contentType: 'image/png',
    });
  });

for (const format of ['json', 'md', 'csv'])
  test(`mobile roadmap full selected content exports as ${format} with an active filter`, async ({
    page,
  }, testInfo) => {
    for (const id of additions) expect(byId.get(id), id).toBeTruthy();
    await page.addInitScript(
      (ids) =>
        localStorage.setItem('saas-atlas-selection-v1', JSON.stringify(ids)),
      additions.slice(0, -1),
    );
    await visit(page);
    const query = byId.get('ai-7').item.text;
    await page.locator('#search').fill(query);
    const row = page.locator('#feature-ai-7');
    await expect(row).toBeVisible();
    await row.locator('.feature-label').click();
    await expect(row.locator('.feature-check')).toBeChecked();
    await expect(page.locator('.feature-check:checked')).toHaveCount(7);
    const content = await downloadSelection(page, format);
    const decisions = relatedDecisions(additions);
    const notes = relatedNotes(decisions);
    if (format === 'json') {
      const payload = JSON.parse(content);
      expect(payload.schemaVersion).toBe(3);
      expect(payload.selectedCount).toBe(7);
      const items = payload.clusters.flatMap((c) =>
        c.groups.flatMap((g) => g.items),
      );
      expect(items.map((x) => x.id).sort()).toEqual([...additions].sort());
      for (const item of items) {
        const entry = byId.get(item.id);
        expect(item.text).toBe(entry.item.text);
        expect(item.assessment).toEqual(entry.item.assessment);
        expect(item.planning).toEqual(
          resolvePlanning(data.review, entry.group, item.id),
        );
      }
      expect(payload.review.decisions).toEqual(decisions);
      expect(payload.review.decisionNotes ?? {}).toEqual(notes);
    } else if (format === 'md') {
      const text = readable(content);
      for (const id of additions) {
        const { item, group } = byId.get(id);
        const planning = resolvePlanning(data.review, group, id);
        for (const value of [
          item.text,
          item.assessment.note,
          item.assessment.acceptance,
          planning.label,
          planning.reason,
          ...item.assessment.sources.flatMap((s) => [s.title, s.url]),
        ])
          expect(text).toContain(value);
      }
      for (const d of decisions) {
        expect(text).toContain(d.title);
        expect(text).toContain(d.reason);
      }
      for (const note of Object.values(notes)) expect(text).toContain(note);
      for (const [id, note] of Object.entries(data.review.decisionNotes ?? {}))
        if (!(id in notes)) expect(text).not.toContain(note);
    } else {
      expect(content).toMatch(/^\uFEFF/);
      for (const id of additions) {
        const { item, group } = byId.get(id);
        const planning = resolvePlanning(data.review, group, id);
        for (const value of [
          item.text,
          item.assessment.owner,
          item.assessment.note,
          item.assessment.acceptance,
          planning.label,
          planning.reason,
        ])
          expect(content).toContain(value.replaceAll('"', '""'));
      }
    }
    await expect(page.locator('#search')).toHaveValue(query);
    await testInfo.attach(`mobile-export.${format}`, {
      body: content,
      contentType: format === 'json' ? 'application/json' : 'text/plain',
    });
  });

test('historical Capacitor selection visibly identifies current Tauri2 and exports its context', async ({
  page,
}, testInfo) => {
  const entry = byId.get('channels-12');
  const note = data.review.decisionNotes?.['offline-mobile'];
  expect(entry).toBeTruthy();
  expect(note).toBeTruthy();
  await visit(page);
  await page.locator('#group-channels > summary').click();
  const row = page.locator('#feature-channels-12');
  await expect(row).toHaveAttribute('data-scope', 'implementation');
  await expect(row.locator('.scope-label')).toHaveText(
    'Tarihsel alternatif · Güncel mobil yol Tauri 2',
  );
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  const decision = data.review.decisions.find((d) => d.id === 'offline-mobile');
  await expect(page.locator('#context-details')).not.toHaveAttribute('open');
  await page.locator('#scope-review > summary').click();
  const historical = page
    .locator('.review-decisions > li')
    .filter({ hasText: decision.title });
  const visibleNote = historical.getByText(note, { exact: true });
  await expect(visibleNote).toBeVisible();
  await testInfo.attach('mobile-historical-note320', {
    body: await visibleNote.screenshot(),
    contentType: 'image/png',
  });
  await page.locator('#scope-review > summary').click();
  const decisions = relatedDecisions(['channels-12']);
  const notes = relatedNotes(decisions);
  const payload = JSON.parse(await downloadSelection(page, 'json'));
  expect(payload.selectedCount).toBe(1);
  const selected = payload.clusters.flatMap((c) =>
    c.groups.flatMap((g) => g.items),
  );
  expect(selected.map((x) => x.id)).toEqual(['channels-12']);
  expect(selected[0].assessment).toEqual(entry.item.assessment);
  expect(selected[0].planning.label).toBe(
    'Tarihsel alternatif · Güncel mobil yol Tauri 2',
  );
  expect(payload.review.decisions).toEqual(decisions);
  expect(payload.review.decisionNotes).toEqual(notes);
  const markdown = readable(await downloadSelection(page, 'md'));
  expect(markdown).toContain(entry.item.text);
  expect(markdown).toContain(selected[0].planning.label);
  for (const value of Object.values(notes)) expect(markdown).toContain(value);
  for (const [id, value] of Object.entries(data.review.decisionNotes ?? {}))
    if (!(id in notes)) expect(markdown).not.toContain(value);
});

test('mobile additions and historical notes remain readable with native accordions without JavaScript', async ({
  browser,
  baseURL,
}) => {
  for (const id of additions) expect(byId.get(id), id).toBeTruthy();
  const note = data.review.decisionNotes?.['offline-mobile'];
  expect(note).toBeTruthy();
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 568 },
  });
  try {
    const page = await context.newPage();
    await page.goto('./');
    await expect(page.locator('.group[open]')).toHaveCount(0);
    await page.locator('#group-channels > summary').click();
    const row = page.locator('#feature-channels-17');
    await row.locator('.assessment > summary').click();
    await expect(row.locator('.assessment-note')).toHaveText(
      byId.get('channels-17').item.assessment.note,
    );
    await expect(page.locator('#feature-channels-12 .scope-label')).toHaveText(
      'Tarihsel alternatif · Güncel mobil yol Tauri 2',
    );
    await page.locator('#group-identity > summary').click();
    await expect(page.locator('#group-channels')).not.toHaveAttribute('open');
    await expect(page.locator('.group[open]')).toHaveCount(1);
    await expect(page.locator('#feature-identity-10')).toBeVisible();
    await expect(page.locator('#context-details')).not.toHaveAttribute('open');
    await page.locator('#scope-review > summary').click();
    await expect(
      page.locator('#scope-review').getByText(note, { exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  } finally {
    await context.close();
  }
});
