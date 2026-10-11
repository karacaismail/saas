import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('320px collapsed groups preserve all content and pass automated accessibility checks', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  await expect(page.locator('.group')).toHaveCount(49);
  await expect(page.locator('.group[open]')).toHaveCount(0);
  await expect(page.locator('.feature')).toHaveCount(387);
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  await testInfo.attach('accordion-default-axe', {
    body: JSON.stringify(accessibility, null, 2),
    contentType: 'application/json',
  });
  expect(accessibility.violations).toEqual([]);
  expect(accessibility.incomplete).toEqual([]);
});

test('320px groups use a native full-row accordion and rotating chevron with mouse and keyboard', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  const group = page.locator('.group').first();
  const summary = group.locator(':scope > summary');
  await expect(summary).not.toContainText(/\b(?:Aç|Daralt)\b/);
  await expect(summary.locator('.group-toggle')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  await summary.scrollIntoViewIfNeeded();
  const closed = await summary.evaluate((element) => ({
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height,
    transform: getComputedStyle(
      element.querySelector('.group-toggle'),
      '::before',
    ).transform,
    transition: getComputedStyle(
      element.querySelector('.group-toggle'),
      '::before',
    ).transitionDuration,
    pageOverflow: document.documentElement.scrollWidth > innerWidth,
  }));
  expect(closed.width).toBeGreaterThanOrEqual(44);
  expect(closed.height).toBeGreaterThanOrEqual(44);
  expect(closed.pageOverflow).toBe(false);
  expect(closed.transition).toBe('0s');
  await testInfo.attach('accordion-collapsed-320', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
  await summary.click();
  await expect(group).toHaveAttribute('open', '');
  await expect(group.locator('.feature').first()).toBeVisible();
  expect(
    await summary.evaluate(
      (element) =>
        getComputedStyle(element.querySelector('.group-toggle'), '::before')
          .transform,
    ),
  ).not.toBe(closed.transform);
  await summary.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(summary).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(group).not.toHaveAttribute('open');
  await page.keyboard.press('Space');
  await expect(group).toHaveAttribute('open', '');
  expect(
    await summary.evaluate((element) => ({
      focused: element.matches(':focus-visible'),
      outline: getComputedStyle(element).outlineStyle,
      parentOutline: getComputedStyle(element.parentElement).outlineStyle,
    })),
  ).toEqual({ focused: true, outline: 'solid', parentOutline: 'none' });
  await testInfo.attach('accordion-expanded-320', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});

test('collapse control follows manual toggles and never opens collapsed headings', async ({
  page,
}) => {
  await page.goto('./');
  const bulk = page.locator('#collapse-all');
  const group = page.locator('.group').first();
  await expect(page.locator('#search')).toBeEnabled();
  await expect(bulk).toHaveText('Tüm başlıkları daralt');
  await expect(bulk).toBeDisabled();
  await group.locator(':scope > summary').click();
  await expect(bulk).toHaveText('Tüm başlıkları daralt');
  await expect(bulk).toBeEnabled();
  await group.locator(':scope > summary').click();
  await expect(bulk).toBeDisabled();
  await group.locator(':scope > summary').click();
  await bulk.click();
  await expect(page.locator('.group[open]')).toHaveCount(0);
  await expect(bulk).toBeDisabled();
  await page.locator('#search').fill('no-match-accordion-987654321');
  await expect(bulk).toBeDisabled();
});

test('search reveals matches but selection preserves manually collapsed groups', async ({
  page,
}) => {
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  await page.locator('#search').fill('kiracı');
  await expect(page.locator('.group[open]')).toHaveCount(1);
  const firstId = await page.locator('.group[open]').getAttribute('id');
  const group = page.locator(`#${firstId}`);
  await expect(group).toHaveAttribute('open', '');
  await group.locator(':scope > summary').click();
  await expect(group).not.toHaveAttribute('open');
  await expect(page.locator('#select-visible')).toHaveText('Eşleşenleri seç');
  const ids = await page
    .locator('.feature:not([hidden])')
    .evaluateAll((elements) =>
      elements.map((element) => element.id.replace('feature-', '')),
    );
  expect(ids.length).toBeGreaterThan(1);
  await page.locator('#select-visible').click();
  await expect(group).not.toHaveAttribute('open');
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem('saas-atlas-selection-v1')),
    ),
  ).toEqual(ids);
  const anotherGroup = page
    .locator(`.group:not([hidden]):not(#${firstId})`)
    .first();
  await anotherGroup.locator(':scope > summary').click();
  const another = anotherGroup
    .locator('.feature:not([hidden]) .feature-check')
    .first();
  await another.uncheck();
  await expect(group).not.toHaveAttribute('open');
  await expect(page.locator('.group[open]')).toHaveCount(1);
});

test('direct feature links reveal only their collapsed parent and print restores mixed states', async ({
  page,
}) => {
  await page.goto('./#feature-tenant-1');
  await expect(page.locator('#feature-tenant-1')).toBeVisible();
  await expect(page.locator('#group-tenant')).toHaveAttribute('open', '');
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await page.evaluate(() => {
    window.dispatchEvent(new Event('beforeprint'));
    window.dispatchEvent(new Event('beforeprint'));
  });
  await expect(page.locator('.group[open]')).toHaveCount(49);
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await expect(page.locator('#group-tenant')).toHaveAttribute('open', '');
  await expect(page.locator('#collapse-all')).toHaveText(
    'Tüm başlıkları daralt',
  );
});

test('without JavaScript every group starts collapsed and native disclosure still works', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 568 },
  });
  try {
    const page = await context.newPage();
    await page.goto('./');
    await expect(page.locator('.group[open]')).toHaveCount(0);
    const group = page.locator('.group').first();
    await group.locator(':scope > summary').click();
    await expect(group.locator('.feature').first()).toBeVisible();
    await group.locator(':scope > summary').click();
    await expect(group.locator('.feature').first()).toBeHidden();
  } finally {
    await context.close();
  }
});
