import { test, expect } from '@playwright/test';

async function visit(page) {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('.feature')).toHaveCount(326);
  await expect(page.locator('#search')).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
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

function collectPaint(rows) {
  const rgba = (color) => {
    const numbers = color.match(/[\d.]+/g).map(Number);
    const channels = color.startsWith('color(srgb')
      ? numbers.slice(0, 3).map((value) => value * 255)
      : numbers.slice(0, 3);
    return [...channels, numbers[3] ?? 1];
  };
  const composite = (front, back) =>
    front
      .slice(0, 3)
      .map((value, index) => value * front[3] + back[index] * (1 - front[3]));
  const backgroundFor = (element) => {
    const ancestors = [];
    for (let ancestor = element; ancestor; ancestor = ancestor.parentElement)
      ancestors.unshift(ancestor);
    return ancestors.reduce(
      (background, ancestor) =>
        composite(rgba(getComputedStyle(ancestor).backgroundColor), background),
      [255, 255, 255],
    );
  };
  const luminance = (color) =>
    color.slice(0, 3).reduce((total, value, index) => {
      const component = value / 255;
      return (
        total +
        (component <= 0.04045
          ? component / 12.92
          : ((component + 0.055) / 1.055) ** 2.4) *
          [0.2126, 0.7152, 0.0722][index]
      );
    }, 0);
  const contrast = (foreground, background) => {
    const levels = [luminance(foreground), luminance(background)].sort(
      (a, b) => b - a,
    );
    return (levels[0] + 0.05) / (levels[1] + 0.05);
  };
  return rows.map((row) => {
    const title = row.querySelector('.feature-title');
    const origin = row.querySelector('.origin');
    const checkbox = row.querySelector('.feature-check');
    const style = getComputedStyle(row);
    const text = rgba(getComputedStyle(title).color);
    return {
      id: row.id,
      kind: row.dataset.kind,
      background: rgba(style.backgroundColor),
      opacity: +style.opacity,
      text,
      origin: rgba(getComputedStyle(origin).color),
      border: rgba(getComputedStyle(checkbox).borderTopColor),
      fill: rgba(getComputedStyle(checkbox).backgroundColor),
      checked: checkbox.checked,
      contrast: contrast(text, backgroundFor(title)),
      pills: [...row.querySelectorAll('.assessment-tags > span')].map(
        (pill) => {
          const pillStyle = getComputedStyle(pill);
          const color = rgba(pillStyle.color);
          const background = backgroundFor(pill);
          return {
            tag: pill.dataset.tag,
            value: pill.dataset.value,
            text: pill.textContent.trim(),
            color,
            background: rgba(pillStyle.backgroundColor),
            compositeBackground: background,
            opacity: +pillStyle.opacity,
            contrast: contrast(color, background),
          };
        },
      ),
    };
  });
}

function expectSourcePaint(row) {
  expect(row.opacity, `${row.id} keeps content opaque`).toBe(1);
  expect(row.background[3], `${row.id} source tint alpha`).toBeCloseTo(0.05, 6);
  expect(row.background.slice(0, 3), `${row.id} source tint hue`).toEqual(
    row.text.slice(0, 3),
  );
  expect(row.text[3], `${row.id} text opacity`).toBe(1);
  expect(Math.min(...row.text.slice(0, 3)), `${row.id} full saturation`).toBe(
    0,
  );
  const dominant = { o: 2, g: 1, n: 0 }[row.kind];
  expect(
    row.text[dominant],
    `${row.id} blue/green/red source hue`,
  ).toBeGreaterThan(
    Math.max(...row.text.slice(0, 3).filter((_, index) => index !== dominant)),
  );
  expect(row.origin, `${row.id} source label matches text`).toEqual(row.text);
  expect(row.border, `${row.id} checkbox matches text`).toEqual(row.text);
  expect(
    row.contrast,
    `${row.id} contrast over its composited tint`,
  ).toBeGreaterThanOrEqual(4.5);
}

test('all 326 source tints use five percent alpha while text stays opaque', async ({
  page,
}) => {
  await visit(page);
  const rows = await page.locator('.feature').evaluateAll(collectPaint);
  rows.forEach(expectSourcePaint);
  expect(new Set(rows.map((row) => row.kind))).toEqual(
    new Set(['o', 'g', 'n']),
  );
});

for (const kind of ['o', 'g', 'n']) {
  test(`${kind} source tint stays opaque during mouse and Space selections`, async ({
    page,
  }, testInfo) => {
    await visit(page);
    const sample = page.locator(`.feature[data-kind="${kind}"]`).first();
    const [original] = await sample.evaluateAll(collectPaint);
    expect(original.kind).toBe(kind);
    expectSourcePaint(original);
    const row = await openFeature(page, original.id);
    const checkbox = row.locator('.feature-check');
    await expect(checkbox).not.toBeChecked();
    await row.locator('.feature-label').click();
    await expect(checkbox).toBeChecked();
    const [selected] = await row.evaluateAll(collectPaint);
    expectSourcePaint(selected);
    expect(selected.background).toEqual(original.background);
    expect(selected.text).toEqual(original.text);
    expect(selected.fill).toEqual(selected.text);
    await testInfo.attach(`source-pastel-${kind}-selected-320`, {
      body: await row.screenshot({ animations: 'disabled' }),
      contentType: 'image/png',
    });
    await checkbox.focus();
    await page.keyboard.press('Space');
    await expect(checkbox).not.toBeChecked();
    const [cleared] = await row.evaluateAll(collectPaint);
    expectSourcePaint(cleared);
    expect(cleared.background).toEqual(original.background);
    expect(cleared.text).toEqual(original.text);
    expect(cleared.fill).not.toEqual(cleared.text);
  });
}

test('support, action and owner pills have readable semantic pastels with six distinct support backgrounds', async ({
  page,
}, testInfo) => {
  await visit(page);
  for (const tag of ['support', 'action', 'owner'])
    await expect(
      page.locator(`.assessment-tags > [data-tag="${tag}"]`),
    ).toHaveCount(326);
  const rows = await page.locator('.feature').evaluateAll(collectPaint);
  const pills = rows.flatMap((row) => row.pills);
  expect(pills).toHaveLength(978);
  expect(new Set(pills.map((pill) => pill.tag))).toEqual(
    new Set(['support', 'action', 'owner']),
  );
  const supports = pills.filter((pill) => pill.tag === 'support');
  const actions = pills.filter((pill) => pill.tag === 'action');
  expect(new Set(supports.map((pill) => pill.value))).toEqual(
    new Set(['native', 'partial', 'ecosystem', 'absent', 'external', 'verify']),
  );
  expect(new Set(actions.map((pill) => pill.value))).toEqual(
    new Set(['configure', 'extend', 'integrate', 'build', 'validate']),
  );
  for (const pill of pills) {
    expect(
      pill.background[3],
      `${pill.text} has a colored background`,
    ).toBeGreaterThan(0);
    expect(
      Math.max(...pill.compositeBackground) -
        Math.min(...pill.compositeBackground),
      `${pill.text} keeps a colored pastel rather than a neutral background`,
    ).toBeGreaterThan(0);
    expect(pill.opacity, `${pill.text} remains opaque`).toBe(1);
    expect(pill.color[3], `${pill.text} text remains opaque`).toBe(1);
    expect(
      pill.contrast,
      `${pill.text} contrast over all background layers`,
    ).toBeGreaterThanOrEqual(4.5);
  }
  const supportPalette = [...new Set(supports.map((pill) => pill.value))].map(
    (value) => {
      const entries = supports.filter((pill) => pill.value === value);
      const appearance = (pill) =>
        JSON.stringify([pill.color, pill.background]);
      expect(
        new Set(entries.map(appearance)).size,
        `${value} semantic appearance`,
      ).toBe(1);
      return {
        value,
        color: entries[0].color,
        background: entries[0].background,
      };
    },
  );
  expect(
    new Set(supportPalette.map((entry) => JSON.stringify(entry.background)))
      .size,
  ).toBe(6);
  for (const value of new Set(actions.map((pill) => pill.value))) {
    const entries = actions.filter((pill) => pill.value === value);
    expect(
      new Set(
        entries.map((pill) => JSON.stringify([pill.color, pill.background])),
      ).size,
      `${value} semantic appearance`,
    ).toBe(1);
  }
  await testInfo.attach('semantic-support-pastel-palette-320', {
    body: JSON.stringify(supportPalette, null, 2),
    contentType: 'application/json',
  });
});

test('long owner pills reflow at 200% root text and preserve pastel contrast during keyboard selection', async ({
  page,
}, testInfo) => {
  await visit(page);
  await expect(
    page.locator('.assessment-tags > [data-tag="owner"]'),
  ).toHaveCount(326);
  const initialRoot = await page.evaluate(() =>
    parseFloat(getComputedStyle(document.documentElement).fontSize),
  );
  expect(initialRoot).toBeGreaterThanOrEqual(16);
  const id = await page
    .locator('.assessment-tags > [data-tag="owner"]')
    .evaluateAll(
      (owners) =>
        [...owners]
          .sort(
            (a, b) => b.textContent.trim().length - a.textContent.trim().length,
          )[0]
          .closest('.feature').id,
    );
  const row = await openFeature(page, id);
  const owner = row.locator('.assessment-tags > [data-tag="owner"]');
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await owner.scrollIntoViewIfNeeded();
  const state = await owner.evaluate((element) => {
    const style = getComputedStyle(element);
    const range = document.createRange();
    range.selectNodeContents(element);
    return {
      root: parseFloat(getComputedStyle(document.documentElement).fontSize),
      size: parseFloat(style.fontSize),
      weight: +style.fontWeight,
      paddingBlock: parseFloat(style.paddingTop),
      paddingInline: parseFloat(style.paddingLeft),
      radius: parseFloat(style.borderTopLeftRadius),
      height: element.getBoundingClientRect().height,
      textLines: new Set([...range.getClientRects()].map((rect) => rect.top))
        .size,
      contentWidth: element.scrollWidth,
      availableWidth: element.clientWidth,
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      titleSize: parseFloat(
        getComputedStyle(
          element.closest('.feature').querySelector('.feature-title'),
        ).fontSize,
      ),
    };
  });
  expect(state.root).toBe(initialRoot * 2);
  expect(Math.abs(state.size - state.root * 0.8)).toBeLessThanOrEqual(0.01);
  expect(state.weight).toBeGreaterThanOrEqual(400);
  expect(state.titleSize).toBeGreaterThanOrEqual(state.root);
  expect(state.paddingBlock).toBeLessThan(state.root * 0.375);
  expect(state.paddingInline).toBeLessThan(state.root * 0.5);
  expect(state.radius).toBeGreaterThanOrEqual(state.height / 2);
  expect(state.textLines).toBeGreaterThan(1);
  expect(state.contentWidth).toBeLessThanOrEqual(state.availableWidth + 1);
  expect(state.pageWidth).toBeLessThanOrEqual(state.viewportWidth + 1);

  const wordLines = await row.evaluate((element) => {
    return [
      ['.feature-title', 'Subdomain'],
      ['.assessment > summary > span', 'Değerlendirme'],
    ].map(([selector, word]) => {
      const parent = element.querySelector(selector);
      const walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const start = node.textContent.indexOf(word);
        if (start < 0) continue;
        const range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, start + word.length);
        return {
          word,
          lines: new Set([...range.getClientRects()].map((rect) => rect.top))
            .size,
        };
      }
      throw new Error(`Missing real-content word: ${word}`);
    });
  });
  for (const entry of wordLines)
    expect(entry.lines, `${entry.word} wraps only between words`).toBe(1);

  const [before] = await row.evaluateAll(collectPaint);
  expectSourcePaint(before);
  const checkbox = row.locator('.feature-check');
  await checkbox.focus();
  await page.keyboard.press('Space');
  await expect(checkbox).toBeChecked();
  const [selected] = await row.evaluateAll(collectPaint);
  expectSourcePaint(selected);
  expect(selected.background).toEqual(before.background);
  expect(selected.pills).toEqual(before.pills);
  selected.pills.forEach((pill) =>
    expect(pill.contrast).toBeGreaterThanOrEqual(4.5),
  );
  await testInfo.attach('long-owner-pastel-200-percent', {
    body: await row.screenshot({ animations: 'disabled' }),
    contentType: 'image/png',
  });
  await testInfo.attach('long-owner-pastel-200-percent-computed', {
    body: JSON.stringify({ state, wordLines, row: selected }, null, 2),
    contentType: 'application/json',
  });
  await page.keyboard.press('Space');
  await expect(checkbox).not.toBeChecked();
  expect((await row.evaluateAll(collectPaint))[0].background).toEqual(
    before.background,
  );
  // At 200% root, the 16rem inventory transition is at 576 CSS px.
  for (const width of [575, 576, 577]) {
    await page.setViewportSize({ width, height: 568 });
    const geometry = await page.evaluate(() => ({
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
    await expect(checkbox).not.toBeChecked();
    expect((await row.evaluateAll(collectPaint))[0].background).toEqual(
      before.background,
    );
  }
});
