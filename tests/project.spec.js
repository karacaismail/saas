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
            overflowText: texts
              .flatMap((n) =>
                [...n.childNodes]
                  .filter(
                    (child) =>
                      child.nodeType === Node.TEXT_NODE &&
                      child.textContent.trim(),
                  )
                  .flatMap((child) => {
                    const range = document.createRange();
                    range.selectNodeContents(child);
                    return [...range.getClientRects()]
                      .filter(
                        (rect) =>
                          rect.right > innerWidth + 1 &&
                          !n.closest('.p-radio-options,.p-nav,.p-table-scroll'),
                      )
                      .map((rect) => ({
                        tag: n.tagName,
                        cls: n.className,
                        right: rect.right,
                        text: child.textContent.slice(0, 100),
                      }));
                  }),
              )
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
  const stageRadio = page.locator('[name="project-stage"][value="all"]');
  await stageRadio.click();
  expect(
    await stageRadio.evaluate((radio) => {
      const style = getComputedStyle(radio.nextElementSibling);
      return {
        focusVisible:
          radio.matches(':focus-visible') ||
          radio.hasAttribute('data-keyboard-focus'),
        outline: style.outlineStyle,
        shadow: style.boxShadow,
        radius: style.borderRadius,
        background: style.backgroundColor,
        bottom: style.borderBottomStyle,
        width: parseFloat(style.borderBottomWidth),
        color: style.borderBottomColor,
      };
    }),
  ).toEqual({
    focusVisible: false,
    outline: 'none',
    shadow: 'none',
    radius: '0px',
    background: 'rgba(0, 0, 0, 0)',
    bottom: 'solid',
    width: 3,
    color: 'rgb(0, 66, 199)',
  });
  await stageRadio.focus();
  await page.keyboard.press('Alt+Tab');
  await page.keyboard.press('Alt+Shift+Tab');
  await expect(stageRadio).toBeFocused();
  await page.keyboard.press('ArrowRight');
  const keyboardRadio = page.locator('[name="project-stage"]:checked');
  await expect(keyboardRadio).toHaveValue('poc');
  await expect(keyboardRadio).toBeFocused();
  expect(
    await keyboardRadio.evaluate((radio) => {
      const style = getComputedStyle(radio.nextElementSibling);
      const group = getComputedStyle(radio.closest('fieldset'));
      return {
        focusVisible:
          radio.matches(':focus-visible') ||
          radio.hasAttribute('data-keyboard-focus'),
        outline: style.outlineStyle,
        shadow: style.boxShadow,
        radius: style.borderRadius,
        bottom: style.borderBottomStyle,
        width: parseFloat(style.borderBottomWidth),
        color: style.borderBottomColor,
        groupOutline: group.outlineStyle,
        groupShadow: group.boxShadow,
      };
    }),
  ).toEqual({
    focusVisible: true,
    outline: 'none',
    shadow: 'none',
    radius: '0px',
    bottom: 'dashed',
    width: 3,
    color: 'rgb(0, 66, 199)',
    groupOutline: 'none',
    groupShadow: 'none',
  });
  await stageRadio.click();
  await page.locator('.p-header-action a[href="#tasks"]').click();
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
  await page.locator('#project-search').fill('NotificationPreference');
  expect(await geometry(page)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  const longTitle = page
    .locator('[data-project-view="list"] .p-task-title')
    .first();
  const longTaskUrl = new URL(
    await longTitle.getAttribute('href'),
    homeUrl(baseURL),
  ).href;
  expect(
    await longTitle.evaluate((n) => {
      const range = document.createRange();
      range.setStart(n.firstChild, 0);
      range.setEnd(n.firstChild, 'NotificationPreference'.length);
      return range.getClientRects().length;
    }),
  ).toBe(1);
  await longTitle.focus();
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => longTitle.evaluate((n) => n.scrollLeft))
    .toBeGreaterThan(0);
  const longArtifact = page
    .locator('[data-project-view="list"] .p-artifact-name')
    .first();
  await expect(longArtifact).toHaveAttribute('tabindex', '0');
  await longArtifact.focus();
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => longArtifact.evaluate((n) => n.scrollLeft))
    .toBeGreaterThan(0);
  await page.locator('#project-search').fill('');
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
  await page.goto(longTaskUrl);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  expect(await geometry(page)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  const heading = page.locator('h1');
  await expect(heading).toHaveAttribute('tabindex', '0');
  await heading.focus();
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => heading.evaluate((n) => n.scrollLeft))
    .toBeGreaterThan(0);
  await page.screenshot({
    path: testInfo.outputPath('project-long-name-200.png'),
  });
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
      indicator: getComputedStyle(button).boxShadow,
    })),
  ).toEqual({
    visible: true,
    outline: 'none',
    indicator: 'rgb(255, 253, 247) 0px -3px 0px 0px inset',
  });
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
}, testInfo) => {
  await visit(page, baseURL);
  const checks = page.locator(
    '[data-project-view="list"] [data-task-select]:visible',
  );
  const ids = [
    await checks.nth(0).getAttribute('data-task-select'),
    await checks.nth(1).getAttribute('data-task-select'),
  ];
  await checks.nth(0).focus();
  await page.keyboard.press('Space');
  await expect(checks.nth(0)).toBeChecked();
  await expect(checks.nth(0)).toBeFocused();
  expect(
    await checks.nth(0).evaluate((input) => ({
      outline: getComputedStyle(input).outlineStyle,
      inputIndicator: getComputedStyle(input).boxShadow,
      labelIndicator: getComputedStyle(input.parentElement).boxShadow,
    })),
  ).toEqual({
    outline: 'none',
    inputIndicator: 'none',
    labelIndicator: 'rgb(0, 66, 199) 0px -3px 0px 0px inset',
  });
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

  const sourceResponse = await page.request.get(
    new URL('data/project/project.json', homeUrl(baseURL)).href,
  );
  expect(sourceResponse.ok()).toBe(true);
  const { currentPlan, reusePlan } = await sourceResponse.json();
  const headless = reusePlan.headlessReadiness;
  expect(headless?.scope).toEqual({
    genuiOwner: 'user',
    genuiBackend: 'independent',
    saasRole: 'planning',
    provider: 'frappe',
  });
  expect(currentPlan.tasks.map((task) => task.id)).toEqual(
    Array.from(
      { length: 10 },
      (_, index) => 't-' + String(index).padStart(2, '0'),
    ),
  );
  await page.setViewportSize({ width: 320, height: 568 });
  await visit(page, baseURL);
  const planLink = page.locator('a[data-current-plan]').first();
  await expect(planLink).toBeVisible();
  await planLink.click();
  await expect(page).toHaveURL(new URL('plan/', homeUrl(baseURL)).href);
  await expect(page.locator('body')).toHaveAttribute(
    'data-project-route',
    'plan',
  );
  await expect(page.locator('h1')).toHaveText(currentPlan.title);
  const planEntries = page.locator('[data-plan-task]');
  await expect(planEntries).toHaveCount(10);
  const taskLinks = await planEntries.evaluateAll((entries) =>
    entries.map(
      (entry) =>
        (entry.matches('a') ? entry : entry.querySelector('a[href]'))?.href,
    ),
  );
  expect(taskLinks).toEqual(
    currentPlan.tasks.map(
      (task) => new URL('plan/tasks/' + task.id + '/', homeUrl(baseURL)).href,
    ),
  );
  const cards = page.locator('details[data-plan-card]');
  await expect(cards).toHaveCount(5);
  expect(
    await cards.evaluateAll((details) =>
      details.every(
        (detail) =>
          detail.getAttribute('name') === 'current-plan-card' && !detail.open,
      ),
    ),
  ).toBe(true);
  const planPacket = JSON.parse(
    await downloadText(page, page.locator('a[href="./current-plan.json"]')),
  );
  const planMarkdown = await downloadText(
    page,
    page.locator('a[href="./current-plan.md"]'),
  );
  expect(planPacket.version).toBe(1);
  expect(planPacket.plan).toEqual(currentPlan);
  const embeddedPacketPattern =
    /<!-- saas-current-plan:start -->\s*[\x60]{3,}json\s*\n([\s\S]*?)\n[\x60]{3,}\s*<!-- saas-current-plan:end -->/;
  const embeddedPlan = planMarkdown.match(embeddedPacketPattern);
  expect(embeddedPlan).not.toBeNull();
  expect(JSON.parse(embeddedPlan[1])).toEqual(planPacket);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath('current-plan-320.png'),
  });
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
  await expect(
    staticPage.locator('a[data-current-plan]').first(),
  ).toBeVisible();
  await staticPage.locator('a[data-current-plan]').first().click();
  await expect(staticPage.locator('body')).toHaveAttribute(
    'data-project-route',
    'plan',
  );
  await expect(staticPage.locator('h1')).toHaveText(currentPlan.title);
  const nativeCards = staticPage.locator('details[data-plan-card]');
  await expect(nativeCards.locator('summary')).toHaveCount(5);
  await nativeCards.nth(0).locator('summary').focus();
  await staticPage.keyboard.press('Enter');
  await expect(nativeCards.nth(0)).toHaveAttribute('open', '');
  await nativeCards.nth(1).locator('summary').focus();
  await staticPage.keyboard.press('Enter');
  await expect(staticPage.locator('details[data-plan-card][open]')).toHaveCount(
    1,
  );
  await expect(nativeCards.nth(0)).not.toHaveAttribute('open');
  expect(await geometry(staticPage)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  await staticPage.goto(taskLinks[0]);
  await expect(staticPage.locator('body')).toHaveAttribute(
    'data-project-route',
    'plan-task',
  );
  await expect(staticPage.locator('h1')).toHaveText(currentPlan.tasks[0].title);
  for (const label of Object.values(currentPlan.cardLabels))
    await expect(staticPage.locator('main')).toContainText(label);
  const planTaskPacket = JSON.parse(
    await downloadText(staticPage, staticPage.locator('a[href="./task.json"]')),
  );
  const taskMarkdown = await downloadText(
    staticPage,
    staticPage.locator('a[href="./task.md"]'),
  );
  expect(planTaskPacket.version).toBe(1);
  expect(planTaskPacket.planId).toBe(currentPlan.id);
  expect(planTaskPacket.task).toEqual(currentPlan.tasks[0]);
  expect(planTaskPacket.rules).toEqual(currentPlan.sections);
  expect(planTaskPacket.sourceDigest).toBe(planPacket.sourceDigest);
  expect(planTaskPacket.projectRevision).toBe(planPacket.projectRevision);
  const embeddedTask = taskMarkdown.match(embeddedPacketPattern);
  expect(embeddedTask).not.toBeNull();
  expect(JSON.parse(embeddedTask[1])).toEqual(planTaskPacket);
  await expect(staticPage.locator('[data-copy-task]')).toBeDisabled();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value) => {
          window.__copiedPlan = value;
        },
      },
    });
  });
  await page.goto(taskLinks[0]);
  await expect(page.locator('[data-copy-task]')).toBeEnabled();
  await page.locator('[data-copy-task]').click();
  await expect
    .poll(() => page.evaluate(() => window.__copiedPlan))
    .toBe(taskMarkdown);
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error('denied');
    };
  });
  await page.locator('[data-copy-task]').click();
  await expect(page.locator('#project-copy-text')).toHaveValue(taskMarkdown);
  await expect(page.locator('#project-copy-text')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-copy-fallback')).toBeHidden();
  await expect(page.locator('[data-copy-task]')).toBeFocused();
  expect(await geometry(staticPage)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  await visit(page, baseURL);
  await page.locator('a[data-reuse-plan]').click();
  await expect(page).toHaveURL(new URL('reuse/', homeUrl(baseURL)).href);
  await expect(page.locator('h1')).toHaveText(reusePlan.title);
  await expect(page.locator('[data-headless-readiness]')).toContainText(
    headless.notice,
  );
  await expect(page.locator('[data-headless-check]')).toHaveCount(
    headless.areas.reduce((count, area) => count + area.checks.length, 0),
  );
  expect(
    await page.locator('main > section[id] > h2').allTextContents(),
  ).toEqual(reusePlan.sections.map((section) => section.title));
  const reusePacket = JSON.parse(
    await downloadText(page, page.locator('a[href="./reuse-plan.json"]')),
  );
  const reuseMarkdown = await downloadText(
    page,
    page.locator('a[href="./reuse-plan.md"]'),
  );
  expect(reusePacket.plan).toEqual(reusePlan);
  expect(reusePacket.plan.headlessReadiness).toEqual(headless);
  expect(JSON.parse(reuseMarkdown.match(embeddedPacketPattern)[1])).toEqual(
    reusePacket,
  );
  expect(reusePlan.tasks.map((task) => task.status)).toEqual([
    'BLOCKED',
    'BLOCKED',
    'BLOCKED',
  ]);
  const longestArea = [...headless.areas].sort(
    (a, b) => JSON.stringify(b.checks).length - JSON.stringify(a.checks).length,
  )[0];
  const area = page.locator(`[data-headless-area="${longestArea.id}"]`);
  const areaSummary = area.locator(':scope > summary');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await areaSummary.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(areaSummary).toBeFocused();
  const areaStyle = () =>
    areaSummary.evaluate((summary) => {
      const style = getComputedStyle(summary);
      const chevron = getComputedStyle(summary.querySelector('.p-chevron'));
      return {
        focused: summary.matches(':focus-visible'),
        outline: style.outlineStyle,
        indicator: style.boxShadow,
        duration: chevron.transitionDuration,
        easing: chevron.transitionTimingFunction,
      };
    });
  const expectedAreaStyle = {
    focused: true,
    outline: 'none',
    indicator: 'rgb(0, 66, 199) 0px -3px 0px 0px inset',
    duration: '0.14s',
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
  };
  expect(await areaStyle()).toEqual(expectedAreaStyle);
  await page.keyboard.press('Enter');
  await expect(area).toHaveAttribute('open', '');
  expect(await areaStyle()).toEqual(expectedAreaStyle);
  await page.keyboard.press('Enter');
  await expect(area).not.toHaveAttribute('open');
  expect(await areaStyle()).toEqual(expectedAreaStyle);
  await page.keyboard.press('Enter');
  await page.emulateMedia({ reducedMotion: 'reduce' });
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
    await expect(area).toHaveAttribute('open', '');
  }
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
  await areaSummary.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: testInfo.outputPath('readiness-open-200.png'),
  });
  await page.evaluate(() => {
    document.documentElement.style.removeProperty('font-size');
    window.scrollTo(0, 0);
  });
  await page.screenshot({ path: testInfo.outputPath('reuse-320.png') });
  await areaSummary.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: testInfo.outputPath('readiness-open-320.png'),
  });
  await staticPage.goto(new URL('reuse/', homeUrl(baseURL)).href);
  await expect(staticPage.locator('[data-plan-task]')).toHaveCount(3);
  const reuseCards = staticPage.locator('details[data-plan-card]');
  expect(
    await reuseCards.evaluateAll((cards) => cards.every((card) => !card.open)),
  ).toBe(true);
  await reuseCards.nth(0).locator('summary').focus();
  await staticPage.keyboard.press('Enter');
  await reuseCards.nth(1).locator('summary').focus();
  await staticPage.keyboard.press('Enter');
  await expect(staticPage.locator('details[data-plan-card][open]')).toHaveCount(
    1,
  );
  await staticPage.locator('[data-plan-task="r-02"] a').click();
  const reuseTaskMarkdown = await downloadText(
    staticPage,
    staticPage.locator('a[href="./task.md"]'),
  );
  expect(
    JSON.parse(reuseTaskMarkdown.match(embeddedPacketPattern)[1]).planId,
  ).toBe(reusePlan.id);
  await page.goto(staticPage.url());
  await expect(page.locator('[data-copy-task]')).toBeEnabled();
  await page.locator('[data-copy-task]').click();
  await expect
    .poll(() => page.evaluate(() => window.__copiedPlan))
    .toBe(reuseTaskMarkdown);
  expect(await geometry(staticPage)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  await page.goto(new URL('reuse/tasks/r-01/', homeUrl(baseURL)).href);
  await expect(page.locator('h1')).toHaveText(reusePlan.tasks[1].title);
  await page.screenshot({ path: testInfo.outputPath('reuse-task-320.png') });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  expect(await geometry(page)).toEqual({
    overflow: false,
    small: 0,
    thin: 0,
    font: 'Outfit',
  });
  await page.screenshot({ path: testInfo.outputPath('reuse-task-200.png') });
  await nojs.close();
});
