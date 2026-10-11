import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const homeUrl = (baseURL) => new URL('../', baseURL).href;
const visit = async (page, baseURL) => {
  await page.goto(homeUrl(baseURL));
  await expect(page.locator('body')).toHaveAttribute(
    'data-project-route',
    'home',
  );
  await expect(page.locator('#project-search')).toBeEnabled();
};
const downloadText = async (page, control) => {
  const pending = page.waitForEvent('download');
  await control.click();
  const stream = await (await pending).createReadStream();
  let value = '';
  for await (const chunk of stream) value += chunk;
  return value;
};
const geometry = (page) =>
  page.evaluate(() => {
    const root = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const texts = [
      ...document.querySelectorAll(
        'h1,h2,h3,h4,p,li,a,button,input,span,dt,dd,legend,summary,th,td,label',
      ),
    ].filter(
      (n) =>
        n.getClientRects().length &&
        !n.closest('.p-sr-only') &&
        n.textContent.trim(),
    );
    return {
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      small: texts.filter(
        (n) => parseFloat(getComputedStyle(n).fontSize) < root - 0.1,
      ).length,
      thin: texts.filter((n) => Number(getComputedStyle(n).fontWeight) < 400)
        .length,
      font: getComputedStyle(document.body).fontFamily.split(',')[0],
      ...(document.documentElement.scrollWidth > innerWidth + 1
        ? {
            overflowDetails: [...document.querySelectorAll('body *')]
              .filter(
                (n) =>
                  n.getClientRects().length &&
                  n.getBoundingClientRect().right > innerWidth + 1 &&
                  !n.closest('.p-radio-options,.p-nav,.p-table-scroll'),
              )
              .map((n) => ({
                tag: n.tagName,
                cls: n.className,
                right: n.getBoundingClientRect().right,
                text: n.textContent.slice(0, 50),
              }))
              .slice(0, 20),
          }
        : {}),
    };
  });

test('project workspace has mobile-first stages, filters, bounded views and real cluster navigation', async ({
  page,
  baseURL,
}, testInfo) => {
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.setViewportSize({ width: 320, height: 568 });
  await visit(page, baseURL);
  await page.locator('.p-header-action a').click();
  await expect(page.locator('#project-search')).toBeInViewport();
  const first = page
    .locator('[data-project-view="list"] [data-task-row]:visible')
    .first();
  const id = await first.getAttribute('data-task-row');
  await page.locator('#project-search').fill(id);
  await expect(
    page.locator('[data-project-view="list"] [data-task-row]:visible'),
  ).toHaveCount(1);
  await page.locator('[data-reset-filters]').click();
  await page.locator('[data-next-page]').click();
  expect(
    await page
      .locator('[data-project-view="list"] [data-task-row]:visible')
      .first()
      .getAttribute('data-task-row'),
  ).not.toBe(id);
  await page.locator('[data-previous-page]').click();
  await page.locator('[name="project-stage"]').nth(1).check();
  await page.locator('[name="project-layer"][value="backend"]').check();
  expect(
    await page
      .locator('[data-project-view="list"] [data-task-row]:visible')
      .count(),
  ).toBeGreaterThan(0);
  const chosenStage = await page
    .locator('[name="project-stage"]:checked')
    .inputValue();
  expect(
    await page
      .locator('[data-project-view="list"] [data-task-row]:visible')
      .evaluateAll(
        (rows, stage) =>
          rows.every(
            (row) =>
              row.dataset.stage === stage && row.dataset.layer === 'backend',
          ),
        chosenStage,
      ),
  ).toBe(true);
  await page.locator('[data-reset-filters]').click();
  await page.locator('#gates > summary').click();
  const summaries = page.locator('.p-gate > details > summary');
  await summaries.nth(0).focus();
  await page.keyboard.press('Enter');
  await summaries.nth(1).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.p-gate > details[open]')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.locator('.p-gate > details[open]')).toHaveCount(0);
  await expect(summaries.nth(1)).toBeFocused();
  await page.locator('#gates > summary').click();
  for (const [width, height] of [
    [320, 568],
    [360, 640],
    [375, 667],
    [390, 844],
    [568, 320],
    [768, 1024],
    [1280, 900],
  ]) {
    await page.setViewportSize({ width, height });
    expect(await geometry(page)).toEqual({
      overflow: false,
      small: 0,
      thin: 0,
      font: 'Outfit',
    });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('project-desktop.png') });
  await page.setViewportSize({ width: 320, height: 568 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  expect(await geometry(page)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '';
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  if (process.platform === 'darwin')
    await expect(page).toHaveScreenshot('project-home-320.png', {
      fullPage: false,
    });
  await page.screenshot({ path: testInfo.outputPath('project-mobile.png') });
  await page.locator('[name="project-view"][value="table"]').check();
  const scroll = page.locator('.p-table-scroll');
  await scroll.focus();
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => scroll.evaluate((n) => n.scrollLeft))
    .toBeGreaterThan(0);
  expect(await geometry(page)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  await page.locator('[name="project-view"][value="clusters"]').check();
  const link = page.locator('[data-cluster-card]:visible h3 a').first();
  const target = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(new URL(target, homeUrl(baseURL)).href);
  await expect(page.locator('body')).toHaveAttribute(
    'data-project-route',
    'cluster',
  );
  expect(
    requests.filter((url) =>
      /\/assets\/(app|exports|content-engine|content-templates)\.js|\/data\//.test(
        url,
      ),
    ),
  ).toEqual([]);
});

test('single task page preserves source context, downloads JSON Markdown and provides truthful clipboard fallback', async ({
  page,
  baseURL,
}, testInfo) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value) => {
          window.__copiedTask = value;
        },
      },
    });
  });
  await page.setViewportSize({ width: 320, height: 568 });
  await visit(page, baseURL);
  await page
    .locator('[data-project-view="list"] .p-task-title')
    .first()
    .click();
  await expect(page.locator('body')).toHaveAttribute(
    'data-project-route',
    'task',
  );
  await expect(page.locator('[data-copy-task]')).toBeEnabled();
  await expect(page.locator('.p-task-select-detail')).toContainText(
    'Görev paketine ekle',
  );
  await expect(
    page.locator('.p-task-select-detail input'),
  ).toHaveAccessibleName(/Görev paketine ekle/);
  await page.screenshot({
    path: testInfo.outputPath('project-task-initial.png'),
  });
  const packet = JSON.parse(
    await downloadText(
      page,
      page.locator('.p-action-bar a[href="./task.json"]'),
    ),
  );
  const md = await downloadText(
    page,
    page.locator('.p-action-bar a[href="./task.md"]'),
  );
  expect(packet.task.owns.length).toBeGreaterThan(0);
  expect(packet.task.readiness).toBe('draft');
  expect(packet.task.integration.baseCommit).toBeNull();
  for (const path of packet.task.owns) expect(md).toContain(path);
  expect(md).toContain(packet.sourceDigest);
  await page.locator('[data-copy-task]').click();
  await expect.poll(() => page.evaluate(() => window.__copiedTask)).toBe(md);
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error('denied');
    };
  });
  await page.locator('[data-copy-task]').click();
  await expect(page.locator('#project-copy-text')).toHaveValue(md);
  await expect(page.locator('#project-copy-text')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-copy-fallback')).toBeHidden();
  await expect(page.locator('[data-copy-task]')).toBeFocused();
  expect(
    await page.locator('[data-copy-task]').evaluate((button) => ({
      visible: button.matches(':focus-visible'),
      outline: getComputedStyle(button).outlineStyle,
      width: parseFloat(getComputedStyle(button).outlineWidth),
    })),
  ).toEqual({ visible: true, outline: 'solid', width: 3 });
  expect(await geometry(page)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  const violations = (
    await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
  ).violations;
  expect(violations).toEqual([]);
  if (process.platform === 'darwin')
    await expect(page).toHaveScreenshot('project-task-320.png', {
      fullPage: false,
    });
  await page.screenshot({
    path: testInfo.outputPath('project-task-mobile.png'),
  });
  for (const dependency of packet.task.dependsOn)
    await expect(
      page.locator(
        `.p-dependency-list a[href="../../tasks/${dependency.taskId}/"]`,
      ),
    ).toHaveCount(1);
});

test('task selection exports across filters, rejects partial bundles and keeps static pages usable without JavaScript', async ({
  page,
  baseURL,
  browser,
}) => {
  await visit(page, baseURL);
  const checks = page.locator(
    '[data-project-view="list"] [data-task-select]:visible',
  );
  const ids = [
    await checks.nth(0).getAttribute('data-task-select'),
    await checks.nth(1).getAttribute('data-task-select'),
  ];
  await checks.nth(0).check();
  await checks.nth(1).check();
  await page.locator('#project-search').fill('no-such-task-88442');
  const bundle = JSON.parse(
    await downloadText(page, page.locator('[data-export="json"]')),
  );
  expect(bundle.selectedTaskIds).toEqual(ids);
  expect(bundle.tasks.map((p) => p.task.id)).toEqual(ids);
  const md = await downloadText(page, page.locator('[data-export="md"]'));
  for (const id of ids) expect(md).toContain(id);
  let downloads = 0;
  page.on('download', () => downloads++);
  await page.route(`**/tasks/${ids[1]}/task.json`, (route) =>
    route.fulfill({ status: 503, body: 'unavailable' }),
  );
  await page.locator('[data-export="json"]').click();
  const copy = await page
    .locator('#project-runtime')
    .evaluate((n) => JSON.parse(n.textContent).ui);
  await expect(page.locator('#project-status')).toHaveText(copy.exportFailure);
  expect(downloads).toBe(0);
  await page.unroute(`**/tasks/${ids[1]}/task.json`);
  await page.route(`**/tasks/${ids[1]}/task.json`, async (route) => {
    const stale = await (await route.fetch()).json();
    stale.projectRevision = '0'.repeat(64);
    await route.fulfill({ json: stale });
  });
  await page.locator('[data-export="json"]').click();
  await expect(page.locator('#project-status')).toHaveText(copy.exportFailure);
  expect(downloads).toBe(0);
  await page.unroute(`**/tasks/${ids[1]}/task.json`);
  await page.reload();
  await expect(page.locator('#project-selection-count')).toContainText('2');
  await page.locator('[data-selected-only]').check();
  await page
    .locator('[data-project-view="list"] [data-task-select]')
    .first()
    .focus();
  await page.keyboard.press('Space');
  await expect(
    page.locator(`[data-project-view="list"] [data-task-select="${ids[1]}"]`),
  ).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.locator('[data-selected-only]')).toBeFocused();
  const nojs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 568 },
  });
  const staticPage = await nojs.newPage();
  await staticPage.goto(new URL(`tasks/${ids[0]}/`, homeUrl(baseURL)).href);
  await expect(staticPage.locator('h1')).toBeVisible();
  await expect(staticPage.locator('[data-copy-task]')).toBeDisabled();
  const packet = JSON.parse(
    await downloadText(
      staticPage,
      staticPage.locator('.p-action-bar a[href="./task.json"]'),
    ),
  );
  expect(packet.task.id).toBe(ids[0]);
  await staticPage.goto(homeUrl(baseURL));
  await expect(staticPage.locator('[data-cluster-card]').first()).toBeVisible();
  expect(await geometry(staticPage)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  await nojs.close();
});
