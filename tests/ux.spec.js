import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectClosed(disclosure) {
  await expect.poll(() => disclosure.getAttribute('open')).toBeNull();
}

async function expectInventoryHeadingReachable(page) {
  const heading = page.locator('.cluster:visible .cluster-head h2').first();
  await expect(heading).toBeVisible();
  await expect
    .poll(() =>
      heading.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const toolbar = document.querySelector('.toolbar');
        const tools = toolbar.getBoundingClientRect();
        const obstruction =
          getComputedStyle(toolbar).position === 'sticky' &&
          tools.top < innerHeight &&
          tools.bottom > 0
            ? tools.bottom
            : 0;
        return rect.top >= obstruction - 1 && rect.bottom <= innerHeight + 1;
      }),
    )
    .toBe(true);
}

test('320px introduction offers an immediate inventory entry and context toggles preserve the selection journey', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);

  const start = page.locator('.hero .start-link');
  await expect(start).toHaveAccessibleName('Özellikleri incele');
  await expect(start).toHaveAttribute('href', '#inventory');
  const entry = await start.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
      minimumTarget: matchMedia('(any-pointer: coarse)').matches ? 48 : 44,
      viewportHeight: innerHeight,
    };
  });
  expect(entry.top).toBeGreaterThanOrEqual(0);
  expect(entry.bottom).toBeLessThanOrEqual(entry.viewportHeight);
  expect(entry.width).toBeGreaterThanOrEqual(entry.minimumTarget);
  expect(entry.height).toBeGreaterThanOrEqual(entry.minimumTarget);

  const context = page.locator('details.context-disclosure#context-details');
  const summary = context.locator(':scope > summary');
  await expect(summary).toHaveAccessibleName(
    /^Teknik yaklaşım ve etiket rehberi/,
  );
  await expectClosed(context);
  await expect(context.locator('#roadmap-title')).toBeHidden();
  await start.click();
  await expect(page).toHaveURL(/#inventory$/);
  await expectInventoryHeadingReachable(page);

  await page.locator('#search').fill('kiracı');
  const row = page.locator('#feature-tenant-1');
  await expect(row).toBeVisible();
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  const filteredIds = await page
    .locator('.feature:visible')
    .evaluateAll((rows) => rows.map((element) => element.id));

  await summary.click();
  await expect(context).toHaveAttribute('open', '');
  await expect(context.locator('#roadmap-title')).toBeVisible();
  await expect(context.locator('.baseline')).toContainText(
    'Hedef Frappe ve Keycloak sürümü seçilmedi',
  );
  await expect(context.locator('.support-overview')).toBeVisible();
  const guide = context.locator('.roadmap-guide');
  await guide.locator(':scope > summary').click();
  await expect(guide.locator('.note-body')).toBeVisible();
  await expect(guide.locator('.note-body')).toContainText('Çekirdekte var');
  await summary.click();
  await expectClosed(context);

  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(context).toHaveAttribute('open', '');
  await expect(guide.locator('.note-body')).toBeVisible();
  await page.keyboard.press('Enter');
  await expectClosed(context);
  await expect(page.locator('#search')).toHaveValue('kiracı');
  await expect(row.locator('.feature-check')).toBeChecked();
  await expect(page.locator('#export-selected')).toBeEnabled();
  expect(
    await page
      .locator('.feature:visible')
      .evaluateAll((rows) => rows.map((element) => element.id)),
  ).toEqual(filteredIds);
  await testInfo.attach('ux-entry-and-preserved-selection-320', {
    body: await page.screenshot({ animations: 'disabled' }),
    contentType: 'image/png',
  });
});

test('inventory entry and technical context remain natural links and disclosures without JavaScript', async ({
  browser,
  baseURL,
}, testInfo) => {
  const browserContext = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 568 },
  });
  try {
    const page = await browserContext.newPage();
    await page.goto('./');
    const context = page.locator('#context-details');
    const summary = context.locator(':scope > summary');
    await expectClosed(context);
    await page
      .getByRole('link', { name: 'Özellikleri incele', exact: true })
      .click();
    await expect(page).toHaveURL(/#inventory$/);
    await expectInventoryHeadingReachable(page);
    await summary.click();
    await expect(context).toHaveAttribute('open', '');
    await expect(context.locator('#roadmap-title')).toBeVisible();
    await expect(context.locator('.baseline')).toBeVisible();
    await expect(context.locator('.support-overview')).toBeVisible();
    const guide = context.locator('.roadmap-guide');
    await guide.locator(':scope > summary').click();
    await expect(guide.locator('.note-body')).toContainText('Çekirdekte var');
    await expect(guide.locator('.note-body')).toBeVisible();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expectClosed(context);
    await page.keyboard.press('Enter');
    await expect(context).toHaveAttribute('open', '');
    await expect(guide.locator('.note-body')).toBeVisible();
    await testInfo.attach('ux-native-context-no-javascript-320', {
      body: await page.locator('#context-details').screenshot(),
      contentType: 'image/png',
    });
  } finally {
    await browserContext.close();
  }
});

test('expanded technical context reflows at 200% root text with visible keyboard focus', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto('./');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  const context = page.locator('#context-details');
  const summary = context.locator(':scope > summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(context).toHaveAttribute('open', '');
  const guide = context.locator('.roadmap-guide');
  await guide.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(guide).toHaveAttribute('open', '');
  const state = await context.evaluate((element) => {
    const root = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const textFailures = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      if (
        ![...range.getClientRects()].some((rect) => rect.width && rect.height)
      )
        continue;
      const style = getComputedStyle(node.parentElement);
      if (parseFloat(style.fontSize) + 0.01 < root || +style.fontWeight < 400)
        textFailures.push({
          text: node.textContent.trim().slice(0, 80),
          size: style.fontSize,
          weight: style.fontWeight,
        });
    }
    return {
      width: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      textFailures,
      focusVisible: document.activeElement.matches(':focus-visible'),
      focusedElement: document.activeElement.tagName,
    };
  });
  expect(state.width).toBeLessThanOrEqual(state.viewport + 1);
  expect(state.textFailures).toEqual([]);
  expect(state.focusVisible).toBe(true);
  expect(state.focusedElement).toBe('SUMMARY');
  await expect(guide.locator('.note-body')).toBeVisible();
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  await testInfo.attach('ux-expanded-context-axe', {
    body: JSON.stringify(accessibility, null, 2),
    contentType: 'application/json',
  });
  expect(accessibility.violations).toEqual([]);
  await testInfo.attach('ux-expanded-context-200-percent-computed', {
    body: JSON.stringify(state, null, 2),
    contentType: 'application/json',
  });
  await testInfo.attach('ux-expanded-context-200-percent', {
    body: await page.screenshot({ animations: 'disabled' }),
    contentType: 'image/png',
  });
  await page.keyboard.press('Enter');
  await expectClosed(guide);
  await expect(guide.locator(':scope > summary')).toBeFocused();
});

test('print lifecycle reveals technical context and restores disclosure and selection state after repeated preparation', async ({
  page,
}) => {
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  const context = page.locator('#context-details');
  await expectClosed(context);
  await page.locator('#search').fill('kiracı');
  const row = page.locator('#feature-tenant-1');
  await expect(row).toBeVisible();
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  const group = row.locator(
    'xpath=ancestor::details[contains(@class,"group")]',
  );
  await expect(group).toHaveAttribute('open', '');
  await group.locator(':scope > summary').click();
  await expectClosed(group);
  const previousGroups = await page
    .locator('details.group')
    .evaluateAll((groups) =>
      groups.map((element) => ({
        id: element.id,
        open: element.getAttribute('open'),
      })),
    );
  const previousVisibleIds = await page
    .locator('.feature:visible')
    .evaluateAll((rows) => rows.map((element) => element.id));

  // Exercise application event handlers, without claiming a physical print dialog.
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await expect(context).toHaveAttribute('open', '');
  await expect(context.locator('.baseline')).toBeVisible();
  await expect(page.locator('details.group:not([open])')).toHaveCount(0);
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await expect(context).toHaveAttribute('open', '');
  await expect(page.locator('details.group:not([open])')).toHaveCount(0);
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));

  await expectClosed(context);
  expect(
    await page.locator('details.group').evaluateAll((groups) =>
      groups.map((element) => ({
        id: element.id,
        open: element.getAttribute('open'),
      })),
    ),
  ).toEqual(previousGroups);
  await expect(group).not.toHaveAttribute('open');
  await expect(page.locator('#search')).toHaveValue('kiracı');
  await expect(row.locator('.feature-check')).toBeChecked();
  await expect(page.locator('#export-selected')).toBeEnabled();
  expect(
    await page
      .locator('.feature:visible')
      .evaluateAll((rows) => rows.map((element) => element.id)),
  ).toEqual(previousVisibleIds);
});
