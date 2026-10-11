import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

async function visit(page) {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
}

async function openIdentityAssessment(page) {
  await openFeature(page, 'feature-identity-1');
  await page.locator('#feature-identity-1 .assessment > summary').click();
}

test('Frappe roadmap preserves per-item metadata, evidence and sources at 320px', async ({
  page,
}, testInfo) => {
  await visit(page);
  await expect(page.locator('.assessment-tags')).toHaveCount(387);
  await expect(page.locator('.cluster').first()).toHaveAttribute(
    'id',
    'cluster-12',
  );
  const overview = await page.evaluate(() => {
    const data = JSON.parse(document.querySelector('#atlas-data').textContent);
    const counts = Object.fromEntries(
      Object.keys(data.roadmap.supportLabels).map((code) => [code, 0]),
    );
    for (const c of data.clusters)
      for (const g of c.groups)
        for (const item of g.items) counts[item.assessment.support]++;
    return {
      expected: Object.entries(data.roadmap.supportLabels).map(
        ([code, label]) => `${counts[code]} ${label}`,
      ),
      actual: [...document.querySelectorAll('.support-overview > span')].map(
        (x) => x.textContent.trim().replace(/\s+/g, ' '),
      ),
    };
  });
  expect(overview.actual).toEqual(overview.expected);
  const parity = await page.evaluate(() => {
    const data = JSON.parse(document.querySelector('#atlas-data').textContent);
    return data.clusters.flatMap((c) =>
      c.groups.flatMap((g) =>
        g.items.map((item, i) => {
          const row = document.querySelector(`#feature-${g.id}-${i + 1}`);
          return {
            expected: [
              data.roadmap.supportLabels[item.assessment.support],
              data.roadmap.actionLabels[item.assessment.action],
              item.assessment.owner,
            ],
            actual: [...row.querySelectorAll('.assessment-tags > span')].map(
              (x) => x.textContent.trim(),
            ),
            note: row.querySelector('.assessment-note').textContent.trim(),
            expectedNote: item.assessment.note,
          };
        }),
      ),
    );
  });
  parity.forEach((row) => {
    expect(row.actual).toEqual(row.expected);
    expect(row.note).toBe(row.expectedNote);
  });
  await openIdentityAssessment(page);
  await expect(page.locator('#feature-identity-1 .assessment')).toHaveAttribute(
    'open',
    '',
  );
  await expect(page.locator('#feature-identity-1 .assessment')).toContainText(
    'Keycloak',
  );
  await expect(
    page.locator('#feature-identity-1 .assessment a').first(),
  ).toHaveAttribute('href', /^https:\/\//);
  await testInfo.attach('assessment-open-320', {
    body: await page.locator('#feature-identity-1').screenshot(),
    contentType: 'image/png',
  });
});

test('open Frappe evidence and capability filters pass automated accessibility checks at 320px', async ({
  page,
}, testInfo) => {
  await visit(page);
  await openIdentityAssessment(page);
  await page.locator('#roadmap-filters > summary').click();
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  await testInfo.attach('roadmap-open-axe', {
    body: JSON.stringify(axe, null, 2),
    contentType: 'application/json',
  });
  expect(axe.violations).toEqual([]);
  await testInfo.attach('roadmap-filters-open-320', {
    body: await page.locator('#roadmap-filters').screenshot(),
    contentType: 'image/png',
  });
});

test('Frappe capability and action filters preserve selection through reset at 320px', async ({
  page,
}, testInfo) => {
  await visit(page);
  await openIdentityAssessment(page);
  await page.locator('#roadmap-filters > summary').click();
  await page.locator('button[data-support="external"]').click();
  await openFeature(page, 'feature-identity-1');
  await expect(page.locator('#feature-identity-1')).toBeVisible();
  const support = await page
    .locator('.feature:visible')
    .evaluateAll((rows) => rows.map((row) => row.dataset.support));
  expect(support.length).toBeGreaterThan(0);
  expect(new Set(support)).toEqual(new Set(['external']));
  await page.locator('#feature-identity-1 .feature-label').click();
  await page.locator('button[data-action="integrate"]').click();
  await expect(page.locator('.feature:visible')).not.toHaveCount(0);
  await expect(
    page.locator('#feature-identity-1 .feature-check'),
  ).toBeChecked();
  await page.locator('#reset-all').click();
  await expect(page.locator('.feature:not([hidden])')).toHaveCount(387);
  await expect(page.locator('.group:visible')).toHaveCount(49);
  await openFeature(page, 'feature-identity-1');
  await expect(page.locator('#feature-identity-1')).toBeVisible();
  await expect(
    page.locator('#feature-identity-1 .feature-check'),
  ).toBeChecked();
  const width = await page.evaluate(() => ({
    actual: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(width.actual).toBeLessThanOrEqual(width.viewport + 1);
  await testInfo.attach('roadmap-320-end', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});

test('roadmap labels and details remain readable with 200% root text and keyboard focus', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  await page.addStyleTag({ content: 'html { font-size:200% !important; }' });
  await openFeature(page, 'feature-model-1');
  const summary = page.locator('#feature-model-1 .assessment > summary');
  await summary.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(summary).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(summary.locator('..')).toHaveAttribute('open', '');
  const state = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
    root: parseFloat(getComputedStyle(document.documentElement).fontSize),
    tags: [...document.querySelectorAll('.assessment-tags span')]
      .filter((x) => x.getBoundingClientRect().height)
      .map((x) => ({
        size: parseFloat(getComputedStyle(x).fontSize),
        weight: +getComputedStyle(x).fontWeight,
        paddingBlock: parseFloat(getComputedStyle(x).paddingTop),
        paddingInline: parseFloat(getComputedStyle(x).paddingLeft),
        radius: parseFloat(getComputedStyle(x).borderTopLeftRadius),
        textAlign: getComputedStyle(x).textAlign,
        height: x.getBoundingClientRect().height,
      })),
    focus: document.activeElement.matches(':focus-visible'),
  }));
  expect(state.width).toBeLessThanOrEqual(state.viewport + 1);
  expect(state.focus).toBe(true);
  expect(state.tags.length).toBeGreaterThan(0);
  for (const tag of state.tags) {
    // Firefox reports fractional computed pixels with a small rounding difference.
    expect(Math.abs(tag.size - state.root * 0.8)).toBeLessThanOrEqual(0.01);
    expect(tag.weight).toBeGreaterThanOrEqual(400);
    expect(tag.paddingBlock).toBeLessThan(state.root * 0.375);
    expect(tag.paddingInline).toBeLessThan(state.root * 0.5);
    expect(tag.radius).toBeGreaterThanOrEqual(tag.height / 2);
    expect(tag.textAlign).toBe('center');
  }
  await testInfo.attach('pill-keyboard-200-percent-computed', {
    body: JSON.stringify(state, null, 2),
    contentType: 'application/json',
  });
  await testInfo.attach('assessment-keyboard-200-percent', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});

test('Frappe assessments and source links remain readable without JavaScript', async ({
  browser,
  baseURL,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 568 },
  });
  try {
    const page = await context.newPage();
    await page.goto('./');
    await expect(page.locator('.assessment-tags')).toHaveCount(387);
    await expect(page.locator('.assessment-note')).toHaveCount(387);
    await expect(page.locator('noscript')).toBeVisible();
    await expect(page.locator('#export-selected')).toBeDisabled();
    await openFeature(page, 'feature-identity-1');
    const detail = page.locator('#feature-identity-1 .assessment');
    await detail.locator('summary').click();
    await expect(detail).toHaveAttribute('open', '');
    await expect(detail.locator('.assessment-note')).toContainText('Keycloak');
    await expect(detail.locator('a').first()).toBeVisible();
    await expect(detail.locator('a').first()).toHaveAttribute(
      'href',
      /^https:\/\//,
    );
    await testInfo.attach('assessment-no-javascript-320', {
      body: await page.locator('#feature-identity-1').screenshot(),
      contentType: 'image/png',
    });
  } finally {
    await context.close();
  }
});
