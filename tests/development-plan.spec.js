import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

const planSource = async () =>
  JSON.parse(await readFile('data/development-plan.json', 'utf8'));
const visit = async (page, source = 'json') => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    source,
  );
  await expect(page.locator('#search')).toBeEnabled();
};
const download = async (page, format) => {
  await page.locator(`[name="export-format"][value="${format}"]`).check();
  const pending = page.waitForEvent('download');
  await page.locator('#export-selected').click();
  const stream = await (await pending).createReadStream();
  let text = '';
  for await (const chunk of stream) text += chunk;
  return text;
};

test('plan disclosure is readable from320, keyboard operated and independent of inventory accordion', async ({
  page,
}, testInfo) => {
  await visit(page);
  const plan = page.locator('#development-plan');
  await expect(plan).toHaveCount(1);
  await expect(plan).not.toHaveAttribute('open');
  await page.locator('#context-details > summary').click();
  await plan.locator(':scope > summary').click();
  const source = await planSource();
  const first = page.locator(`#plan-unit-${source.units[0].id}`);
  await first.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('open');
  await expect(first.locator(':scope > summary')).toBeFocused();
  const second = page.locator(`#plan-unit-${source.units[1].id}`);
  await second.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(second).toHaveAttribute('open');
  await expect(first).not.toHaveAttribute('open');
  await expect(page.locator('.group[open]')).toHaveCount(0);
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
    const geometry = await plan.evaluate((element) => {
      const root = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const visible = [
        ...element.querySelectorAll('summary, p, li, a, dt, dd, h3, h4'),
      ].filter((node) => node.getClientRects().length);
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        small: visible.filter(
          (node) => parseFloat(getComputedStyle(node).fontSize) < root,
        ).length,
        thin: visible.filter(
          (node) => Number(getComputedStyle(node).fontWeight) < 400,
        ).length,
      };
    });
    expect(geometry, `${width}x${height}`).toEqual({
      overflow: false,
      small: 0,
      thin: 0,
    });
  }
  await page.setViewportSize({ width: 320, height: 568 });
  await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.evaluate(() =>
    document.documentElement.style.removeProperty('font-size'),
  );
  const violations = (
    await new AxeBuilder({ page }).include('#development-plan').analyze()
  ).violations;
  expect(violations).toEqual([]);
  await second.locator(':scope > summary').scrollIntoViewIfNeeded();
  await testInfo.attach('development-plan320', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
  const assignment = second.locator('[data-plan-item]').first();
  if (await assignment.count()) {
    const id = await assignment.getAttribute('data-plan-item');
    await assignment.click();
    await expect(page.locator(`#feature-${id}`)).toBeVisible();
  }
});

test('real checkbox selections export exact plan allocations and closed dependency context in JSON and Markdown', async ({
  page,
}) => {
  await visit(page);
  const selected = ['tenant-1', 'integration-13'];
  for (const id of selected) {
    await page
      .locator('#search')
      .fill(id === 'tenant-1' ? 'Single tenant' : 'Model Context Protocol');
    const row = page.locator(`#feature-${id}`);
    if (!(await row.isVisible())) {
      await page.locator('#search').fill('');
      const group = row.locator(
        'xpath=ancestor::details[contains(@class,"group")]',
      );
      if (!(await group.evaluate((node) => node.open)))
        await group.locator(':scope > summary').click();
    }
    await row.locator('.feature-label').click();
    await expect(row.locator('.feature-check')).toBeChecked();
  }
  const payload = JSON.parse(await download(page, 'json'));
  expect(payload.selectedCount).toBe(2);
  const source = await planSource();
  expect(payload.developmentPlan.assignments).toEqual(
    source.assignments.filter((a) => selected.includes(a.itemId)),
  );
  const unitIds = new Set(payload.developmentPlan.units.map((u) => u.id));
  for (const unit of payload.developmentPlan.units)
    for (const dependency of unit.dependsOn)
      expect(unitIds.has(dependency)).toBe(true);
  const markdown = (await download(page, 'md')).replace(
    /\\([\\`*_{}[\]()#+.!|~=\-])/g,
    '$1',
  );
  for (const a of payload.developmentPlan.assignments)
    expect(markdown).toContain(a.reason);
  for (const unit of payload.developmentPlan.units)
    expect(markdown).toContain(unit.customWork);
});

test('failed plan JSON retains the complete fallback and repeated printing restores all native disclosure states', async ({
  page,
}) => {
  await page.route('**/data/development-plan.json', (route) => route.abort());
  await visit(page, 'fallback');
  await page.locator('#context-details > summary').click();
  await page.locator('#development-plan > summary').click();
  await page.locator('[data-plan-unit] > summary').first().click();
  const states = await page.evaluate(() => {
    const snapshot = () =>
      [
        ...document.querySelectorAll(
          '#context-details, #development-plan, .plan-entry',
        ),
      ].map((element) => ({
        id: element.id,
        open: element.open,
        name: element.getAttribute('name'),
      }));
    const before = snapshot();
    window.dispatchEvent(new Event('beforeprint'));
    const once = snapshot();
    window.dispatchEvent(new Event('beforeprint'));
    const twice = snapshot();
    window.dispatchEvent(new Event('afterprint'));
    return { before, once, twice, after: snapshot() };
  });
  expect(states.once.every((s) => s.open && s.name === null)).toBe(true);
  expect(states.twice).toEqual(states.once);
  expect(states.after).toEqual(states.before);
  await expect(page.locator('[data-plan-item]')).toHaveCount(387);
});
