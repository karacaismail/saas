import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 320, height: 568 } });

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
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
}

async function openIdentityAssessment(page) {
  await openFeature(page, 'feature-identity-1');
  await page.locator('#feature-identity-1 .assessment > summary').click();
}

async function filterState(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        element.checkVisibility() &&
        getComputedStyle(element).visibility === 'visible' &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const identity = document.querySelector('#feature-identity-1');
    return {
      support: [...document.querySelectorAll('.feature')]
        .filter(visible)
        .map((row) => row.dataset.support),
      identity: {
        visible: visible(identity),
        open: identity.closest('.group').open,
        assessmentOpen: identity.querySelector('.assessment').open,
        checked: identity.querySelector('.feature-check').checked,
      },
      matching: document.querySelectorAll('.feature:not([hidden])').length,
      visibleGroups: [...document.querySelectorAll('.group')].filter(visible)
        .length,
      width: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    };
  });
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
  const identity = page.locator('#feature-identity-1');
  const groupSummary = identity
    .locator('xpath=ancestor::details[contains(@class,"group")]')
    .locator(':scope > summary');
  await groupSummary.click();
  await identity.locator('.assessment > summary').click();
  await page.locator('#roadmap-filters > summary').click();
  await page.locator('button[data-support="external"]').click();
  const supportOpen = await identity.evaluate(
    (element) => element.closest('.group').open,
  );
  if (!supportOpen) await groupSummary.click();
  const support = await filterState(page);
  expect(support.identity.visible).toBe(true);
  expect(support.identity.open).toBe(true);
  expect(support.identity.assessmentOpen).toBe(true);
  expect(support.support.length).toBeGreaterThan(0);
  expect(new Set(support.support)).toEqual(new Set(['external']));
  await page.locator('#feature-identity-1 .feature-label').click();
  await page.locator('button[data-action="integrate"]').click();
  const filtered = await filterState(page);
  expect(filtered.support.length).toBeGreaterThan(0);
  expect(filtered.identity.checked).toBe(true);
  await page.locator('#reset-all').click();
  const reset = await filterState(page);
  expect(reset.matching).toBe(387);
  expect(reset.visibleGroups).toBe(49);
  if (!reset.identity.open) await groupSummary.click();
  const restored = await filterState(page);
  expect(restored.identity.open).toBe(true);
  expect(restored.identity.visible).toBe(true);
  expect(restored.identity.checked).toBe(true);
  expect(restored.width).toBeLessThanOrEqual(restored.viewport + 1);
  await testInfo.attach('roadmap-320-end', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});

test.describe('200% root text', () => {
  test.use({ viewport: { width: 320, height: 480 } });

  test('roadmap labels and details remain readable with 200% root text and keyboard focus', async ({
    page,
  }, testInfo) => {
    await page.addInitScript(() => {
      document.addEventListener(
        'DOMContentLoaded',
        () => {
          const style = document.createElement('style');
          style.textContent = 'html { font-size:200% !important; }';
          document.head.append(style);
        },
        { once: true },
      );
      // Observe the focus reached by the real Tab/Shift+Tab journey before
      // Enter invokes the summary's native disclosure action.
      const recordEnter = (event) => {
        if (event.key !== 'Enter') return;
        const summary = document.querySelector(
          '#feature-model-1 .assessment > summary',
        );
        window.__roadmapKeyboardEnter.state = {
          focused: document.activeElement === summary,
          focusVisible: summary.matches(':focus-visible'),
        };
      };
      window.__roadmapKeyboardEnter = { recordEnter };
      window.addEventListener('keydown', recordEnter, true);
    });
    await visit(page);
    const row = page.locator('#feature-model-1');
    await row
      .locator('xpath=ancestor::details[contains(@class,"group")]')
      .locator(':scope > summary')
      .click();
    const summary = row.locator('.assessment > summary');
    await summary.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    const state = await page.evaluate(() => {
      const observed = window.__roadmapKeyboardEnter;
      window.removeEventListener('keydown', observed.recordEnter, true);
      delete window.__roadmapKeyboardEnter;
      const row = document.querySelector('#feature-model-1');
      const summary = row.querySelector('.assessment > summary');
      return {
        beforeEnter: observed.state,
        groupOpen: row.closest('.group').open,
        assessmentOpen: row.querySelector('.assessment').open,
        width: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
        root: parseFloat(getComputedStyle(document.documentElement).fontSize),
        tags: [...document.querySelectorAll('.assessment-tags span')].flatMap(
          (tag) => {
            const rect = tag.getBoundingClientRect();
            if (!rect.height) return [];
            const style = getComputedStyle(tag);
            return [
              {
                size: parseFloat(style.fontSize),
                weight: +style.fontWeight,
                paddingBlock: parseFloat(style.paddingTop),
                paddingInline: parseFloat(style.paddingLeft),
                radius: parseFloat(style.borderTopLeftRadius),
                textAlign: style.textAlign,
                height: rect.height,
              },
            ];
          },
        ),
        focusedSummary: document.activeElement === summary,
        focus: document.activeElement.matches(':focus-visible'),
      };
    });
    expect(state.beforeEnter).toEqual({ focused: true, focusVisible: true });
    expect(state.groupOpen).toBe(true);
    expect(state.assessmentOpen).toBe(true);
    expect(state.focusedSummary).toBe(true);
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
