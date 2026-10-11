import { test, expect } from '@playwright/test';

const newIds = [
  'views-11',
  'views-12',
  'views-13',
  'views-14',
  'views-15',
  'views-16',
  'views-17',
  'forms-6',
  'integrity-6',
  'jobs-8',
  'support-9',
  'channels-9',
];

async function visit(page) {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.locator('body')).toHaveAttribute(
    'data-content-source',
    'json',
  );
}

async function openItem(page, id) {
  const groupId = id.slice(0, id.lastIndexOf('-'));
  const group = page.locator(`#group-${groupId}`);
  if (!(await group.evaluate((el) => el.open)))
    await group.locator(':scope > summary').click();
  return page.locator(`#feature-${id}`);
}

async function downloadText(page, format) {
  await page.locator(`[name="export-format"][value="${format}"]`).check();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#export-selected').click(),
  ]);
  let text = '';
  for await (const chunk of await download.createReadStream()) text += chunk;
  return text;
}

function readableMarkdown(value) {
  return value
    .replace(/\\([\\`*_{}[\]()#+.!|~=\-])/g, '$1')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function csvRows(source) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  const csv = source.replace(/^\uFEFF/, '');
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      if (quoted && csv[i + 1] === '"') {
        value += '"';
        i++;
      } else quoted = !quoted;
    } else if (!quoted && (char === ',' || char === '\r')) {
      row.push(value);
      value = '';
      if (char === '\r') {
        expect(csv[++i]).toBe('\n');
        rows.push(row);
        row = [];
      }
    } else value += char;
  }
  expect(quoted).toBe(false);
  expect(value).toBe('');
  expect(row).toEqual([]);
  return rows;
}

test('useful connection indicator is readable and selectable at 320 without pretending the roadmap is a running SaaS', async ({
  page,
}, testInfo) => {
  await visit(page);
  await expect(page.locator('.feature')).toHaveCount(387);
  await expect(page.locator('.group[open]')).toHaveCount(0);
  const item = await openItem(page, 'views-11');
  await expect(item.locator('.feature-title')).toContainText(/bağlantı/i);
  await item.locator('.feature-check').check();
  await expect(item.locator('.feature-check')).toBeChecked();
  await item.locator('.assessment > summary').click();
  await expect(item.locator('.assessment-body')).toBeVisible();
  const metrics = await item.evaluate((el) => ({
    contained: document.documentElement.scrollWidth <= innerWidth,
    readable: [
      ...el.querySelectorAll('.feature-title, .scope-note, .assessment-body p'),
    ].every(
      (text) =>
        parseFloat(getComputedStyle(text).fontSize) >=
        parseFloat(getComputedStyle(document.documentElement).fontSize),
    ),
    weight: parseFloat(
      getComputedStyle(el.querySelector('.feature-title')).fontWeight,
    ),
  }));
  expect(metrics.contained).toBe(true);
  expect(metrics.readable).toBe(true);
  expect(metrics.weight).toBeGreaterThanOrEqual(400);
  await expect(page.locator('.group[open]')).toHaveCount(1);
  await testInfo.attach('useful-connection-320', {
    body: await item.screenshot(),
    contentType: 'image/png',
  });
});

// Each assessment keeps its complete three-state journey in one bounded case.
// Cross-item selection and enlarged-root transitions have separate real journeys;
// the timeout, tracing and all content/readability assertions remain unchanged.
for (const id of newIds) {
  test(`usefulness assessment reflow and selection survive 320 to 390 to enlarged-root 320: ${id}`, async ({
    page,
  }, testInfo) => {
    await visit(page);
    const source = JSON.parse(await page.locator('#atlas-data').textContent());
    const records = source.clusters.flatMap((cluster) =>
      cluster.groups.flatMap((group) =>
        group.items.map((item, i) => ({
          id: `${group.id}-${i + 1}`,
          item,
          planning:
            source.review.itemOverrides[`${group.id}-${i + 1}`] ??
            source.review.groupDefaults[group.id],
        })),
      ),
    );
    const evidence = [];
    const item = await openItem(page, id);
    const original = records.find((record) => record.id === id);
    expect(original).toBeTruthy();
    await expect(item.locator('.feature-title')).toBeVisible();
    await item.locator('.feature-check').check();
    await item.locator('.assessment > summary').click();
    await expect(item.locator('.assessment-body')).toBeVisible();
    const baseRootSize = await page
      .locator('html')
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    for (const [name, width, enlarge] of [
      ['320', 320, false],
      ['390', 390, false],
      ['320-root-125', 320, true],
    ]) {
      if (width !== 320 || enlarge)
        await page.setViewportSize({ width, height: 568 });
      if (enlarge)
        await page.locator('html').evaluate((el) => {
          el.style.fontSize = '125%';
        });
      const metrics = await item.evaluate((el) => {
        const rootSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize,
        );
        // Resolve the explicit passive-pill exception through the engine;
        // Firefox serializes 0.8rem as 12.7969px at a 16px root.
        const pillReference = document.createElement('span');
        pillReference.style.fontSize = '0.8rem';
        el.append(pillReference);
        const pillMinimum = parseFloat(
          getComputedStyle(pillReference).fontSize,
        );
        pillReference.remove();
        const title = el.querySelector('.feature-title');
        const body = el.querySelector('.assessment-body');
        const texts = [
          ...el.querySelectorAll(
            '.feature-title, .origin, .scope-note, .assessment > summary, .assessment-body p, .assessment-body li, .assessment-body a, .assessment-tags > span',
          ),
        ].map((text) => {
          const style = getComputedStyle(text);
          const pill = text.matches('.assessment-tags > span');
          return {
            text: text.textContent,
            fontSize: parseFloat(style.fontSize),
            minimum: pill ? pillMinimum : rootSize,
            weight: parseFloat(style.fontWeight),
            visible:
              text.getClientRects().length > 0 && style.visibility !== 'hidden',
            contained: [...text.getClientRects()].every(
              (rect) => rect.left >= 0 && rect.right <= innerWidth,
            ),
          };
        });
        return {
          width: innerWidth,
          rootSize,
          pageContained: document.documentElement.scrollWidth <= innerWidth,
          itemContained: el.scrollWidth <= el.clientWidth,
          titleVisible: title.getClientRects().length > 0,
          bodyVisible: body.getClientRects().length > 0,
          checked: el.querySelector('.feature-check').checked,
          assessmentOpen: el.querySelector('.assessment').open,
          groupOpen: el.closest('.group').open,
          openGroups: document.querySelectorAll('.group[open]').length,
          title: title.textContent,
          support: el.querySelector('[data-tag="support"]').textContent,
          action: el.querySelector('[data-tag="action"]').textContent,
          owner: el.querySelector('[data-tag="owner"]').textContent,
          scope: el.querySelector('.scope-label').textContent,
          note: el.querySelector('.assessment-note').textContent,
          basis: el.querySelector('.assessment-basis').textContent,
          body: body.textContent,
          links: [...body.querySelectorAll('a')].map((link) => ({
            title: link.textContent,
            url: link.getAttribute('href'),
          })),
          texts,
        };
      });
      expect(metrics.width).toBe(width);
      expect(metrics.rootSize).toBe(
        enlarge ? baseRootSize * 1.25 : baseRootSize,
      );
      expect(metrics.pageContained).toBe(true);
      expect(metrics.itemContained).toBe(true);
      expect(metrics.titleVisible).toBe(true);
      expect(metrics.bodyVisible).toBe(true);
      expect(metrics.checked).toBe(true);
      expect(metrics.assessmentOpen).toBe(true);
      expect(metrics.groupOpen).toBe(true);
      expect(metrics.openGroups).toBe(1);
      expect(metrics.title).toBe(original.item.text);
      expect(metrics.support).toBe(
        source.roadmap.supportLabels[original.item.assessment.support],
      );
      expect(metrics.action).toBe(
        source.roadmap.actionLabels[original.item.assessment.action],
      );
      expect(metrics.owner).toBe(original.item.assessment.owner);
      expect(metrics.scope).toBe(
        source.review.scopeLabels[original.planning.scope],
      );
      // Snapshot minification retains surrounding text-node whitespace.
      expect(metrics.note.trim()).toBe(original.item.assessment.note);
      expect(metrics.body).toContain(original.planning.reason);
      expect(metrics.body).toContain(original.item.assessment.acceptance);
      expect(metrics.basis).toContain(
        source.roadmap.confidenceLabels[original.item.assessment.confidence],
      );
      expect(metrics.basis).toContain(
        original.item.assessment.reviewedAt ?? source.roadmap.reviewedAt,
      );
      expect(metrics.links).toEqual(original.item.assessment.sources);
      expect(metrics.texts.length).toBeGreaterThan(0);
      for (const text of metrics.texts) {
        expect(text.visible, `${id} ${name}: ${text.text}`).toBe(true);
        expect(text.contained, `${id} ${name}: ${text.text}`).toBe(true);
        expect(
          text.fontSize,
          `${id} ${name}: ${text.text}`,
        ).toBeGreaterThanOrEqual(text.minimum);
        expect(
          text.weight,
          `${id} ${name}: ${text.text}`,
        ).toBeGreaterThanOrEqual(400);
      }
      evidence.push({ id, state: name, metrics });
      await testInfo.attach(`usefulness-assessment-${id}-${name}`, {
        body: await item.screenshot(),
        contentType: 'image/png',
      });
    }
    expect(
      await page
        .locator('.feature-check:checked')
        .evaluateAll((inputs) => inputs.map((input) => input.value).sort()),
    ).toEqual([id]);
    await testInfo.attach(`usefulness-assessment-metrics-${id}`, {
      body: JSON.stringify(evidence, null, 2),
      contentType: 'application/json',
    });
  });
}

// Preserve every original pair's selection across a real expanded assessment,
// a 125% root, restoring the root, and opening the next item/group.
for (let start = 0; start < newIds.length; start += 2) {
  const ids = newIds.slice(start, start + 2);
  test(`usefulness paired selection and assessment state survive enlarged-root reset and item transition: ${ids.join(' and ')}`, async ({
    page,
  }, testInfo) => {
    await visit(page);
    const initialRoot = await page.locator('html').evaluate((el) => ({
      style: el.style.fontSize,
      size: parseFloat(getComputedStyle(el).fontSize),
    }));
    const before = await openItem(page, ids[0]);
    await before.locator('.feature-check').check();
    await before.locator('.assessment > summary').click();
    const enlarged = await page.locator('html').evaluate((el) => {
      el.style.fontSize = '125%';
      return parseFloat(getComputedStyle(el).fontSize);
    });
    expect(enlarged).toBe(initialRoot.size * 1.25);
    await page.locator('html').evaluate((el, value) => {
      el.style.fontSize = value;
    }, initialRoot.style);
    const after = await openItem(page, ids[1]);
    await after.locator('.feature-check').check();
    await after.locator('.assessment > summary').click();
    const state = await page.evaluate(
      (ids) => ({
        root: parseFloat(getComputedStyle(document.documentElement).fontSize),
        width: innerWidth,
        contained: document.documentElement.scrollWidth <= innerWidth,
        openGroups: document.querySelectorAll('.group[open]').length,
        checkedIds: [...document.querySelectorAll('.feature-check:checked')]
          .map((input) => input.value)
          .sort(),
        items: ids.map((id) => {
          const el = document.getElementById(`feature-${id}`);
          return {
            id,
            checked: el.querySelector('.feature-check').checked,
            assessmentOpen: el.querySelector('.assessment').open,
            bodyVisible: el.querySelector('.assessment-body').checkVisibility({
              contentVisibilityAuto: true,
              visibilityProperty: true,
            }),
            groupOpen: el.closest('.group').open,
          };
        }),
      }),
      ids,
    );
    expect(state.root).toBe(initialRoot.size);
    expect(state.width).toBe(320);
    expect(state.contained).toBe(true);
    expect(state.openGroups).toBe(1);
    expect(state.checkedIds).toEqual([...ids].sort());
    for (const item of state.items) {
      expect(item.checked).toBe(true);
      expect(item.assessmentOpen).toBe(true);
      const activeGroup =
        item.id.slice(0, item.id.lastIndexOf('-')) ===
        ids[1].slice(0, ids[1].lastIndexOf('-'));
      expect(item.groupOpen).toBe(activeGroup);
      expect(item.bodyVisible).toBe(activeGroup);
    }
    await testInfo.attach(`usefulness-paired-transition-${start}`, {
      body: JSON.stringify({ ids, initialRoot, enlarged, state }, null, 2),
      contentType: 'application/json',
    });
  });
}

for (const [name, start, end] of [
  ['work and data protection', 0, 7],
  ['completion and support', 7, 14],
  ['daily productivity and contextual benefits', 14, 25],
]) {
  test(`usefulness decisions retain categorized benefit and working item links at 320: ${name}`, async ({
    page,
  }, testInfo) => {
    await visit(page);
    const source = JSON.parse(await page.locator('#atlas-data').textContent());
    const all = source.review.decisions;
    const useful = all.filter((decision) => decision.id.startsWith('useful-'));
    expect(useful).toHaveLength(25);
    const expected = useful.slice(start, end);
    await page.locator('#scope-review > summary').click();
    const list = page.locator('.review-decisions > li');
    await expect(list).toHaveCount(109);
    const actual = await list.evaluateAll(
      (elements, range) =>
        elements.slice(range[0], range[1]).map((el) => ({
          text: el.textContent,
          links: [...el.querySelectorAll('a')].map((link) => ({
            href: link.getAttribute('href'),
            text: link.textContent,
          })),
          readable: [...el.querySelectorAll('p, strong, a')].every(
            (text) =>
              parseFloat(getComputedStyle(text).fontSize) >=
              parseFloat(getComputedStyle(document.documentElement).fontSize),
          ),
        })),
      [53 + start, 53 + end],
    );
    expect(actual).toHaveLength(expected.length);
    for (const [i, decision] of expected.entries()) {
      expect(actual[i].text).toContain(decision.title);
      expect(actual[i].text).toContain(decision.reason);
      for (const marker of ['Kategori:', 'Fayda:', 'Öncelik:', 'Kabul:'])
        expect(actual[i].text).toContain(marker);
      expect(actual[i].links).toEqual(
        decision.itemIds.map((id) => ({ href: `#feature-${id}`, text: id })),
      );
      expect(actual[i].readable).toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const destination = expected[0].itemIds[0];
    await list
      .nth(53 + start)
      .locator(`a[href="#feature-${destination}"]`)
      .click();
    await expect(
      page.locator(`#feature-${destination} .feature-title`),
    ).toBeVisible();
    await expect(page.locator('.group[open]')).toHaveCount(1);
    await testInfo.attach(`usefulness-decision-links-${start}-${end}`, {
      body: JSON.stringify({ expected, actual }, null, 2),
      contentType: 'application/json',
    });
  });
}

for (const format of ['json', 'md', 'csv']) {
  test(`selected useful capabilities retain full Frappe assessment and scope in ${format} under an active filter`, async ({
    page,
  }, testInfo) => {
    // The independent connection journey proves real checkbox selection. These
    // bounded export scenarios seed twelve records, then exercise a real toggle.
    await page.addInitScript(
      (ids) =>
        localStorage.setItem('saas-atlas-selection-v1', JSON.stringify(ids)),
      newIds,
    );
    await visit(page);
    const source = JSON.parse(await page.locator('#atlas-data').textContent());
    const expected = source.clusters.flatMap((c) =>
      c.groups.flatMap((g) =>
        g.items.flatMap((item, i) => {
          const id = `${g.id}-${i + 1}`;
          if (!newIds.includes(id)) return [];
          const planning =
            source.review.itemOverrides[id] ??
            source.review.groupDefaults[g.id];
          return [{ id, item, planning }];
        }),
      ),
    );
    expect(expected).toHaveLength(12);
    expect(
      await page
        .locator('.feature-check:checked')
        .evaluateAll((inputs) => inputs.map((input) => input.value).sort()),
    ).toEqual([...newIds].sort());
    const connection = await openItem(page, 'views-11');
    await connection.locator('.feature-check').uncheck();
    await connection.locator('.feature-check').check();
    const connectionText = expected.find((entry) => entry.id === 'views-11')
      .item.text;
    await page.locator('#search').fill(connectionText);
    await expect(connection).toBeVisible();
    await expect(page.locator('#feature-jobs-8')).not.toBeVisible();
    const selectedDecisions = source.review.decisions.filter((decision) =>
      decision.itemIds.some((id) => newIds.includes(id)),
    );
    const text = await downloadText(page, format);
    if (format === 'json') {
      const exported = JSON.parse(text);
      expect(exported.schemaVersion).toBe(3);
      expect(exported.selectedCount).toBe(12);
      const items = exported.clusters.flatMap((c) =>
        c.groups.flatMap((g) => g.items),
      );
      expect(items.map((item) => item.id).sort()).toEqual([...newIds].sort());
      for (const { id, item, planning } of expected) {
        const result = items.find((entry) => entry.id === id);
        expect(result.text).toBe(item.text);
        expect(result.assessment).toEqual(item.assessment);
        expect(result.planning).toEqual({
          ...planning,
          label: source.review.scopeLabels[planning.scope],
        });
      }
      expect(exported.review.decisions).toEqual(selectedDecisions);
    } else {
      const markdown = format === 'md' ? readableMarkdown(text) : undefined;
      const rows = format === 'csv' ? csvRows(text) : undefined;
      if (rows) {
        expect(rows).toHaveLength(13);
        for (const row of rows) expect(row).toHaveLength(18);
      } else {
        expect(markdown.match(/^- \[x\]/gm)).toHaveLength(12);
        for (const decision of selectedDecisions) {
          expect(markdown).toContain(decision.title);
          expect(markdown).toContain(decision.reason);
        }
      }
      for (const { item, planning } of expected) {
        if (markdown) {
          for (const value of [
            item.text,
            item.assessment.owner,
            item.assessment.note,
            item.assessment.acceptance,
            planning.reason,
          ])
            expect(markdown).toContain(value);
          for (const evidence of item.assessment.sources)
            expect(markdown).toContain(evidence.url);
        } else {
          const row = rows.find((cells) => cells[6] === item.text);
          expect(row).toBeTruthy();
          expect(row[9]).toBe(item.assessment.owner);
          expect(row[11]).toBe(item.assessment.note);
          expect(row[12]).toBe(item.assessment.acceptance);
          expect(row[16]).toBe(source.review.scopeLabels[planning.scope]);
          expect(row[17]).toBe(planning.reason);
          for (const evidence of item.assessment.sources)
            expect(row[13]).toContain(evidence.url);
        }
      }
    }
    await testInfo.attach(`usefulness-selected-context-${format}`, {
      body: text,
      contentType: format === 'json' ? 'application/json' : 'text/plain',
    });
  });
}

test.describe('useful connection planning without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  test('offline connection recommendation and its assessment remain readable in the native accordion', async ({
    page,
  }, testInfo) => {
    await page.goto('./');
    await expect(page.locator('.feature')).toHaveCount(387);
    await expect(page.locator('.group[open]')).toHaveCount(0);
    const item = await openItem(page, 'views-11');
    await expect(item.locator('.feature-title')).toContainText(/bağlantı/i);
    await item.locator('.assessment > summary').click();
    await expect(item.locator('.assessment-body')).toBeVisible();
    const metrics = await item.evaluate((el) => ({
      contained: document.documentElement.scrollWidth <= innerWidth,
      readable: [
        ...el.querySelectorAll(
          '.feature-title, .scope-note, .assessment-body p',
        ),
      ].every(
        (text) =>
          parseFloat(getComputedStyle(text).fontSize) >=
          parseFloat(getComputedStyle(document.documentElement).fontSize),
      ),
    }));
    expect(metrics.contained).toBe(true);
    expect(metrics.readable).toBe(true);
    await expect(page.locator('.group[open]')).toHaveCount(1);
    await testInfo.attach('useful-connection-no-js-320', {
      body: await item.screenshot(),
      contentType: 'image/png',
    });
  });
});
