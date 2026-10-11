import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectClosed(disclosure) {
  await expect.poll(() => disclosure.getAttribute('open')).toBeNull();
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

async function expectInventoryHeadingReachable(page) {
  const heading = page.locator('.cluster:visible .cluster-head h2').first();
  let state;
  await expect
    .poll(async () => {
      state = await heading.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const toolbar = document.querySelector('.toolbar');
        const tools = toolbar.getBoundingClientRect();
        const obstruction =
          getComputedStyle(toolbar).position === 'sticky' &&
          tools.top < innerHeight &&
          tools.bottom > 0
            ? tools.bottom
            : 0;
        return {
          visible:
            element.checkVisibility() &&
            getComputedStyle(element).visibility === 'visible' &&
            rect.width > 0 &&
            rect.height > 0,
          reachable:
            rect.top >= obstruction - 1 && rect.bottom <= innerHeight + 1,
        };
      });
      return state.visible && state.reachable;
    })
    .toBe(true);
}

async function contextState(page) {
  return page.locator('#context-details').evaluate((context) => {
    const visible = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        element.checkVisibility() &&
        getComputedStyle(element).visibility === 'visible' &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const guide = context.querySelector('.roadmap-guide');
    return {
      open: context.open,
      title: visible(context.querySelector('#roadmap-title')),
      baselineVisible: visible(context.querySelector('.baseline')),
      baseline: context
        .querySelector('.baseline')
        .textContent.replace(/\s+/gu, ' ')
        .trim(),
      overview: visible(context.querySelector('.support-overview')),
      guideOpen: guide.open,
      guideVisible: visible(guide.querySelector('.note-body')),
      guideText: guide.querySelector('.note-body').textContent,
    };
  });
}

test.describe('320px entry and native context', () => {
  test.use({ viewport: { width: 320, height: 568 } });

  test('320px introduction offers an immediate inventory entry', async ({
    page,
  }) => {
    await page.goto('./');
    await expect(page.locator('#search')).toBeEnabled();

    const start = page.locator('.hero .start-link');
    await expect(start).toHaveAccessibleName('Özellikleri incele');
    const entry = await start.evaluate(async (element) => {
      await document.fonts.ready;
      const rect = element.getBoundingClientRect();
      const context = document.querySelector('#context-details');
      const title = context.querySelector('#roadmap-title');
      const titleRect = title.getBoundingClientRect();
      return {
        href: element.getAttribute('href'),
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        minimumTarget: matchMedia('(any-pointer: coarse)').matches ? 48 : 44,
        viewportHeight: innerHeight,
        contextOpen: context.open,
        titleVisible:
          title.checkVisibility() &&
          getComputedStyle(title).visibility === 'visible' &&
          titleRect.width > 0 &&
          titleRect.height > 0,
      };
    });
    expect(entry.href).toBe('#inventory');
    expect(entry.top).toBeGreaterThanOrEqual(0);
    expect(entry.bottom).toBeLessThanOrEqual(entry.viewportHeight);
    expect(entry.width).toBeGreaterThanOrEqual(entry.minimumTarget);
    expect(entry.height).toBeGreaterThanOrEqual(entry.minimumTarget);

    const context = page.locator('details.context-disclosure#context-details');
    const summary = context.locator(':scope > summary');
    await expect(summary).toHaveAccessibleName(
      /^Teknik yaklaşım ve etiket rehberi/,
    );
    expect(entry.contextOpen).toBe(false);
    expect(entry.titleVisible).toBe(false);
    await start.click();
    await expect(page).toHaveURL(/#inventory$/);
    await expectInventoryHeadingReachable(page);
  });

  test('320px context toggles preserve the mouse-selected search journey', async ({
    page,
  }, testInfo) => {
    await page.goto('./');
    await expect(page.locator('#search')).toBeEnabled();
    await page.locator('.hero .start-link').click();

    await page.locator('#search').fill('kiracı');
    const row = page.locator('#feature-tenant-1');
    const group = row.locator(
      'xpath=ancestor::details[contains(@class,"group")]',
    );
    const groupOpen = await row.evaluate(async (element) => {
      await document.fonts.ready;
      return element.closest('.group').open;
    });
    if (!groupOpen) await group.locator(':scope > summary').click();
    await row.locator('.feature-label').click();
    const selected = await page.evaluate(() => {
      const visible = (element) => {
        const rect = element.getBoundingClientRect();
        return (
          element.checkVisibility() &&
          getComputedStyle(element).visibility === 'visible' &&
          rect.width > 0 &&
          rect.height > 0
        );
      };
      const row = document.querySelector('#feature-tenant-1');
      return {
        hash: location.hash,
        visible: visible(row),
        groupOpen: row.closest('.group').open,
        checked: row.querySelector('.feature-check').checked,
        filteredIds: [...document.querySelectorAll('.feature')]
          .filter(visible)
          .map((element) => element.id),
      };
    });
    expect(selected.hash).toBe('#inventory');
    expect(selected.visible).toBe(true);
    expect(selected.groupOpen).toBe(true);
    expect(selected.checked).toBe(true);
    const context = page.locator('#context-details');
    const summary = context.locator(':scope > summary');
    const guide = context.locator('.roadmap-guide');
    await summary.click();
    const opened = await contextState(page);
    expect(opened.open).toBe(true);
    expect(opened.title).toBe(true);
    expect(opened.baseline).toContain(
      'Hedef Frappe ve Keycloak sürümü seçilmedi',
    );
    expect(opened.overview).toBe(true);
    await guide.locator(':scope > summary').click();
    const guideOpened = await contextState(page);
    expect(guideOpened.guideVisible).toBe(true);
    expect(guideOpened.guideText).toContain('Çekirdekte var');
    await summary.click();
    expect((await contextState(page)).open).toBe(false);
    await summary.focus();
    await page.keyboard.press('Enter');
    const reopened = await contextState(page);
    expect(reopened.open).toBe(true);
    expect(reopened.guideVisible).toBe(true);
    await page.keyboard.press('Enter');
    const preserved = await page.evaluate(() => {
      const visible = (element) => {
        const rect = element.getBoundingClientRect();
        return (
          element.checkVisibility() &&
          getComputedStyle(element).visibility === 'visible' &&
          rect.width > 0 &&
          rect.height > 0
        );
      };
      return {
        open: document.querySelector('#context-details').open,
        search: document.querySelector('#search').value,
        checked: document.querySelector('#feature-tenant-1 .feature-check')
          .checked,
        exportDisabled: document.querySelector('#export-selected').disabled,
        filteredIds: [...document.querySelectorAll('.feature')]
          .filter(visible)
          .map((element) => element.id),
      };
    });
    expect(preserved.open).toBe(false);
    expect(preserved.search).toBe('kiracı');
    expect(preserved.checked).toBe(true);
    expect(preserved.exportDisabled).toBe(false);
    expect(preserved.filteredIds).toEqual(selected.filteredIds);
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
      expect((await contextState(page)).open).toBe(false);
      await page
        .getByRole('link', { name: 'Özellikleri incele', exact: true })
        .click();
      await expect(page).toHaveURL(/#inventory$/);
      await expectInventoryHeadingReachable(page);
      await summary.click();
      const opened = await contextState(page);
      expect(opened.open).toBe(true);
      expect(opened.title).toBe(true);
      expect(opened.baselineVisible).toBe(true);
      expect(opened.overview).toBe(true);
      const guide = context.locator('.roadmap-guide');
      await guide.locator(':scope > summary').click();
      const guideOpened = await contextState(page);
      expect(guideOpened.guideText).toContain('Çekirdekte var');
      expect(guideOpened.guideVisible).toBe(true);
      await summary.focus();
      await page.keyboard.press('Enter');
      expect((await contextState(page)).open).toBe(false);
      await page.keyboard.press('Enter');
      const reopened = await contextState(page);
      expect(reopened.open).toBe(true);
      expect(reopened.guideVisible).toBe(true);
      await testInfo.attach('ux-native-context-no-javascript-320', {
        body: await page.locator('#context-details').screenshot(),
        contentType: 'image/png',
      });
    } finally {
      await browserContext.close();
    }
  });
});

// Keep the real keyboard-open state common to geometry/focus and full-page axe
// cases. Together they exceeded 42 seconds in Firefox CI with DOM tracing.
async function openEnlargedTechnicalContext(page, verifyOpen = true) {
  await page.addInitScript(() => {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        const style = document.createElement('style');
        style.textContent = 'html { font-size: 200% !important; }';
        document.head.append(style);
      },
      { once: true },
    );
  });
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  const context = page.locator('#context-details');
  const summary = context.locator(':scope > summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  const guide = context.locator('.roadmap-guide');
  await guide.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  if (verifyOpen) {
    await page.evaluate(() => document.fonts.ready);
    const state = await contextState(page);
    expect(state.open).toBe(true);
    expect(state.guideOpen).toBe(true);
    expect(state.guideVisible).toBe(true);
  }
  return { context, guide };
}

test.describe('200% technical context', () => {
  test.use({ viewport: { width: 320, height: 480 } });

  test('expanded technical context reflows at 200% root text with visible keyboard focus', async ({
    page,
  }, testInfo) => {
    const { context, guide } = await openEnlargedTechnicalContext(page, false);
    const state = await context.evaluate(async (element) => {
      await document.fonts.ready;
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
      const guide = element.querySelector('.roadmap-guide');
      const body = guide.querySelector('.note-body');
      const rect = body.getBoundingClientRect();
      return {
        open: element.open,
        guideOpen: guide.open,
        guideVisible:
          body.checkVisibility() &&
          getComputedStyle(body).visibility === 'visible' &&
          rect.width > 0 &&
          rect.height > 0,
        width: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
        textFailures,
        focusVisible: document.activeElement.matches(':focus-visible'),
        focusedElement: document.activeElement.tagName,
      };
    });
    expect(state.open).toBe(true);
    expect(state.guideOpen).toBe(true);
    expect(state.guideVisible).toBe(true);
    expect(state.width).toBeLessThanOrEqual(state.viewport + 1);
    expect(state.textFailures).toEqual([]);
    expect(state.focusVisible).toBe(true);
    expect(state.focusedElement).toBe('SUMMARY');
    await testInfo.attach('ux-expanded-context-200-percent-computed', {
      body: JSON.stringify(state, null, 2),
      contentType: 'application/json',
    });
    await testInfo.attach('ux-expanded-context-200-percent', {
      body: await page.screenshot({ animations: 'disabled' }),
      contentType: 'image/png',
    });
    await page.keyboard.press('Enter');
    const closed = await guide.evaluate((element) => ({
      open: element.open,
      focused:
        document.activeElement === element.querySelector(':scope > summary'),
    }));
    expect(closed).toEqual({ open: false, focused: true });
  });

  test('expanded technical context has no automated WCAG violations at 200% root text', async ({
    page,
  }, testInfo) => {
    await openEnlargedTechnicalContext(page);
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    await testInfo.attach('ux-expanded-context-axe', {
      body: JSON.stringify(accessibility, null, 2),
      contentType: 'application/json',
    });
    expect(accessibility.violations).toEqual([]);
  });
});

test('print lifecycle reveals technical context and restores disclosure and selection state after repeated preparation', async ({
  page,
}) => {
  await page.goto('./');
  await expect(page.locator('#search')).toBeEnabled();
  const context = page.locator('#context-details');
  await expectClosed(context);
  await page.locator('#search').fill('kiracı');
  const row = await openFeature(page, 'feature-tenant-1');
  await expect(row).toBeVisible();
  await row.locator('.feature-label').click();
  await expect(row.locator('.feature-check')).toBeChecked();
  const group = row.locator(
    'xpath=ancestor::details[contains(@class,"group")]',
  );
  await expect(group).toHaveAttribute('open', '');
  await group.locator(':scope > summary').click();
  await expectClosed(group);
  const previous = await page.evaluate(() => ({
    groups: [...document.querySelectorAll('details.group')].map((element) => ({
      id: element.id,
      open: element.getAttribute('open'),
    })),
    visibleIds: [...document.querySelectorAll('.feature')]
      .filter(
        (element) =>
          element.getBoundingClientRect().width > 0 &&
          element.getBoundingClientRect().height > 0 &&
          element.checkVisibility() &&
          getComputedStyle(element).visibility === 'visible',
      )
      .map((element) => element.id),
  }));

  // Event handlers remain synchronous; read each preparation before the next event.
  const prepared = await page.evaluate(() => {
    window.dispatchEvent(new Event('beforeprint'));
    const context = document.querySelector('#context-details');
    const baseline = context.querySelector('.baseline');
    return {
      open: context.open,
      baseline: Boolean(
        baseline.getBoundingClientRect().width &&
        baseline.getBoundingClientRect().height &&
        baseline.checkVisibility() &&
        getComputedStyle(baseline).visibility === 'visible',
      ),
      closed: document.querySelectorAll('details.group:not([open])').length,
    };
  });
  expect(prepared.open).toBe(true);
  expect(prepared.baseline).toBe(true);
  expect(prepared.closed).toBe(0);
  const repeated = await page.evaluate(() => {
    window.dispatchEvent(new Event('beforeprint'));
    return {
      open: document.querySelector('#context-details').open,
      closed: document.querySelectorAll('details.group:not([open])').length,
    };
  });
  expect(repeated.open).toBe(true);
  expect(repeated.closed).toBe(0);
  const restored = await page.evaluate(() => {
    window.dispatchEvent(new Event('afterprint'));
    return {
      contextOpen: document.querySelector('#context-details').open,
      groups: [...document.querySelectorAll('details.group')].map(
        (element) => ({ id: element.id, open: element.getAttribute('open') }),
      ),
      groupOpen: document.querySelector('#group-tenant').open,
      search: document.querySelector('#search').value,
      checked: document.querySelector('#feature-tenant-1 .feature-check')
        .checked,
      exportDisabled: document.querySelector('#export-selected').disabled,
      visibleIds: [...document.querySelectorAll('.feature')]
        .filter(
          (element) =>
            element.getBoundingClientRect().width > 0 &&
            element.getBoundingClientRect().height > 0 &&
            element.checkVisibility() &&
            getComputedStyle(element).visibility === 'visible',
        )
        .map((element) => element.id),
    };
  });
  expect(restored.contextOpen).toBe(false);
  expect(restored.groups).toEqual(previous.groups);
  expect(restored.groupOpen).toBe(false);
  expect(restored.search).toBe('kiracı');
  expect(restored.checked).toBe(true);
  expect(restored.exportDisabled).toBe(false);
  expect(restored.visibleIds).toEqual(previous.visibleIds);
});
