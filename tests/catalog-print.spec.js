import { test, expect } from '@playwright/test';

const printCycle = (page) =>
  page.evaluate(async () => {
    const capture = () =>
      [
        ...document.querySelectorAll(
          '#context-details, #scope-review, #component-catalog, .catalog-entry, details.group',
        ),
      ].map((element) => ({
        id: element.id,
        open: element.getAttribute('open'),
        name: element.getAttribute('name'),
      }));
    const settle = () =>
      new Promise((resolve) => requestAnimationFrame(resolve));
    const before = capture();
    // Exercise the actual handlers without opening a native print dialog.
    window.dispatchEvent(new Event('beforeprint'));
    await settle();
    const prepared = capture();
    window.dispatchEvent(new Event('beforeprint'));
    await settle();
    const repeated = capture();
    window.dispatchEvent(new Event('afterprint'));
    await settle();
    return { before, prepared, repeated, restored: capture() };
  });

const catalogStates = (states) =>
  states.filter(
    (state) =>
      state.id === 'component-catalog' || state.id.startsWith('component-'),
  );
const inventoryStates = (states) =>
  states.filter((state) => state.id.startsWith('group-'));
const assertPrintCycle = (cycle) => {
  expect(catalogStates(cycle.prepared)).toHaveLength(64);
  expect(inventoryStates(cycle.prepared)).toHaveLength(49);
  expect(cycle.prepared).toHaveLength(115);
  expect(cycle.prepared.every((state) => state.open === '')).toBe(true);
  expect(cycle.prepared.every((state) => state.name === null)).toBe(true);
  expect(cycle.repeated).toEqual(cycle.prepared);
  expect(cycle.restored).toEqual(cycle.before);
};

test('catalog print opens all64 disclosures and restores closed or mixed open states and native names', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    'json',
  );
  await expect(page.locator('#search')).toBeEnabled();
  await expect(page.locator('.catalog-entry')).toHaveCount(63);
  const closed = await printCycle(page);
  expect(catalogStates(closed.before)).toHaveLength(64);
  expect(
    catalogStates(closed.before).every((state) => state.open === null),
  ).toBe(true);
  expect(
    inventoryStates(closed.before).every((state) => state.open === null),
  ).toBe(true);
  expect(
    closed.before
      .filter(
        (state) =>
          state.id.startsWith('component-') && state.id !== 'component-catalog',
      )
      .every((state) => state.name === 'atlas-components'),
  ).toBe(true);
  expect(
    inventoryStates(closed.before).every(
      (state) => state.name === 'atlas-groups',
    ),
  ).toBe(true);
  expect(
    closed.before
      .filter((state) => ['context-details', 'scope-review'].includes(state.id))
      .every((state) => state.open === null && state.name === null),
  ).toBe(true);
  assertPrintCycle(closed);

  await page.locator('#component-catalog > summary').click();
  await page
    .locator('.catalog-entry')
    .first()
    .locator(':scope > summary')
    .click();
  await page
    .locator('details.group')
    .first()
    .locator(':scope > summary')
    .click();
  await page.locator('#context-details > summary').click();
  const mixed = await printCycle(page);
  expect(
    mixed.before.find((state) => state.id === 'component-catalog').open,
  ).toBe('');
  expect(
    catalogStates(mixed.before).filter((state) => state.open === ''),
  ).toHaveLength(2);
  expect(
    inventoryStates(mixed.before).filter((state) => state.open === ''),
  ).toHaveLength(1);
  expect(
    mixed.before.find((state) => state.id === 'context-details').open,
  ).toBe('');
  expect(
    mixed.before.find((state) => state.id === 'scope-review').open,
  ).toBeNull();
  expect(mixed.before.map(({ id, name }) => ({ id, name }))).toEqual(
    closed.before.map(({ id, name }) => ({ id, name })),
  );
  assertPrintCycle(mixed);
});
