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

test('320px groups use a native full-row accordion and rotating chevron with mouse', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  const group = page.locator('.group').first();
  const summary = group.locator(':scope > summary');
  await summary.scrollIntoViewIfNeeded();
  const closed = await summary.evaluate((element) => ({
    text: element.textContent,
    ariaHidden: element
      .querySelector('.group-toggle')
      .getAttribute('aria-hidden'),
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
  expect(closed.text).not.toMatch(/\b(?:Aç|Daralt)\b/);
  expect(closed.ariaHidden).toBe('true');
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
});

test('320px native group accordion preserves Tab traversal, Enter, Space and one keyboard focus indicator', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  const group = page.locator('.group').first();
  const summary = group.locator(':scope > summary');
  // Recreate the mouse-open state covered independently by the mouse scenario.
  await summary.click();
  await summary.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(summary).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(group).not.toHaveAttribute('open');
  await page.keyboard.press('Space');
  const state = await summary.evaluate((element) => ({
    open: element.parentElement.open,
    focused: element.matches(':focus-visible'),
    outline: getComputedStyle(element).outlineStyle,
    parentOutline: getComputedStyle(element.parentElement).outlineStyle,
  }));
  expect(state).toEqual({
    open: true,
    focused: true,
    outline: 'solid',
    parentOutline: 'none',
  });
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
  const control = () =>
    bulk.evaluate((element) => ({
      text: element.textContent.replace(/\s+/gu, ' ').trim(),
      disabled: element.disabled,
    }));
  expect(await control()).toEqual({
    text: 'Tüm başlıkları daralt',
    disabled: true,
  });
  await group.locator(':scope > summary').click();
  expect(await control()).toEqual({
    text: 'Tüm başlıkları daralt',
    disabled: false,
  });
  await group.locator(':scope > summary').click();
  expect((await control()).disabled).toBe(true);
  await group.locator(':scope > summary').click();
  await bulk.click();
  const collapsed = await bulk.evaluate((element) => ({
    disabled: element.disabled,
    open: document.querySelectorAll('.group[open]').length,
  }));
  expect(collapsed).toEqual({ disabled: true, open: 0 });
  await page.locator('#search').fill('no-match-accordion-987654321');
  expect((await control()).disabled).toBe(true);
});

test('search reveals matches but selection preserves manually collapsed groups', async ({
  page,
}) => {
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  await page.locator('#search').fill('kiracı');
  const matches = await page.evaluate(() => ({
    open: document.querySelectorAll('.group[open]').length,
    firstId: document.querySelector('.group[open]').id,
    ids: [...document.querySelectorAll('.feature:not([hidden])')].map(
      (element) => element.id.replace('feature-', ''),
    ),
  }));
  expect(matches.open).toBe(1);
  const { firstId, ids } = matches;
  const group = page.locator(`#${firstId}`);
  await expect(group).toHaveAttribute('open', '');
  await group.locator(':scope > summary').click();
  const collapsed = await page.evaluate(
    (id) => ({
      open: document.getElementById(id).open,
      selectText: document
        .querySelector('#select-visible')
        .textContent.replace(/\s+/gu, ' ')
        .trim(),
    }),
    firstId,
  );
  expect(collapsed.open).toBe(false);
  expect(collapsed.selectText).toBe('Eşleşenleri seç');
  expect(ids.length).toBeGreaterThan(1);
  await page.locator('#select-visible').click();
  const selected = await page.evaluate(
    (id) => ({
      open: document.getElementById(id).open,
      stored: JSON.parse(localStorage.getItem('saas-atlas-selection-v1')),
    }),
    firstId,
  );
  expect(selected.open).toBe(false);
  expect(selected.stored).toEqual(ids);
  const anotherGroup = page
    .locator(`.group:not([hidden]):not(#${firstId})`)
    .first();
  await anotherGroup.locator(':scope > summary').click();
  const another = anotherGroup
    .locator('.feature:not([hidden]) .feature-check')
    .first();
  await another.uncheck();
  const final = await group.evaluate((element) => ({
    open: element.open,
    total: document.querySelectorAll('.group[open]').length,
  }));
  expect(final).toEqual({ open: false, total: 1 });
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
