import { PAGE } from './content-templates.js';

const own = (object, key) => Object.hasOwn(object, key);
const requireValue = (condition, name) => {
  if (!condition) throw new TypeError(`Invalid content: ${name}`);
};
const text = (value) => typeof value === 'string' && value.trim().length > 0;
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const resolve = (data, path) =>
  path.split('.').reduce((value, key) => {
    requireValue(
      value !== null && value !== undefined && own(value, key),
      path,
    );
    return value[key];
  }, data);
const format = (pattern, values) =>
  pattern.replace(/\{(\w+)\}/g, (_match, key) => {
    requireValue(own(values, key), key);
    return values[key];
  });

const MESSAGE_FIELDS = [
  'app.storageUnavailable',
  'app.selectionCount',
  'app.collapseAll',
  'app.allSupport',
  'app.allActions',
  'app.visibleStatus',
  'app.allClusters',
  'app.matchingSelected',
  'app.selectionCleared',
  'app.relationsShow',
  'app.relationsShown',
  'app.originalShow',
  'app.originalShown',
  'app.exported',
  'export.title',
  'export.kindLabels.o',
  'export.kindLabels.g',
  'export.kindLabels.n',
  'export.formatNames.json',
  'export.formatNames.csv',
  'export.formatNames.md',
  'export.csv.clusterId',
  'export.csv.clusterNumber',
  'export.csv.cluster',
  'export.csv.groupNumber',
  'export.csv.group',
  'export.csv.itemNumber',
  'export.csv.kind',
  'export.csv.item',
  'export.csv.roadmapColumns.0',
  'export.csv.roadmapColumns.1',
  'export.csv.roadmapColumns.2',
  'export.csv.roadmapColumns.3',
  'export.csv.roadmapColumns.4',
  'export.csv.roadmapColumns.5',
  'export.csv.roadmapColumns.6',
  'export.csv.roadmapColumns.7',
  'export.csv.roadmapColumns.8',
  'export.markdown.target',
  'export.markdown.reviewedAt',
  'export.markdown.baseline',
  'export.markdown.phase',
  'export.markdown.roadmapOrder',
  'export.markdown.rationale',
  'export.markdown.dependsOn',
  'export.markdown.support',
  'export.markdown.action',
  'export.markdown.owner',
  'export.markdown.confidence',
  'export.markdown.note',
  'export.markdown.acceptance',
  'export.markdown.source',
  'export.markdown.short',
  'export.markdown.owns',
  'export.markdown.provides',
  'export.markdown.links',
  'export.markdown.sources',
  'export.markdown.raw',
  'export.markdown.generated',
  'export.markdown.classification',
  'export.markdown.sourceRegistry',
  'export.markdown.sequence',
  'export.unsupportedFormat',
  'export.csv.reviewColumns.0',
  'export.csv.reviewColumns.1',
  'export.markdown.scope',
  'export.markdown.scopeReason',
  'export.markdown.reviewDecisions',
  'export.markdown.reviewSource',
];
const INVENTORY_FIELDS = [
  'originLabels.o',
  'originLabels.g',
  'originLabels.n',
  'assessmentLabel',
  'assessmentSummary',
  'acceptance',
  'basis',
  'pending',
  'itemSources',
  'raw',
  'item',
  'groups',
  'owns',
  'takes',
  'provides',
  'prerequisite',
  'pickerLegend',
  'allClusters',
];

export function validateAtlas(data) {
  requireValue(
    data && Array.isArray(data.clusters) && data.clusters.length === 12,
    'clusters',
  );
  requireValue(data.roadmap && Array.isArray(data.roadmap.sequence), 'roadmap');
  requireValue(
    data.interface?.inventory && data.messages?.app && data.messages?.export,
    'copy',
  );
  requireValue(
    data.sources && text(data.generated) && data.classification,
    'metadata',
  );
  for (const path of MESSAGE_FIELDS)
    requireValue(text(resolve(data.messages, path)), `messages.${path}`);
  for (const path of INVENTORY_FIELDS)
    requireValue(
      text(resolve(data.interface.inventory, path)),
      `inventory.${path}`,
    );
  requireValue(
    Array.isArray(data.messages.export.csv.roadmapColumns) &&
      data.messages.export.csv.roadmapColumns.length === 9,
    'messages.csv.columns',
  );
  requireValue(
    Array.isArray(data.messages.export.csv.reviewColumns) &&
      data.messages.export.csv.reviewColumns.length === 2,
    'messages.csv.reviewColumns',
  );
  const groupIds = new Set(),
    itemIds = new Set(),
    clusterIds = new Set();
  for (const [index, cluster] of data.clusters.entries()) {
    requireValue(
      /^\d{2}$/.test(cluster.id) && !clusterIds.has(cluster.id),
      'cluster.id',
    );
    clusterIds.add(cluster.id);
    requireValue(cluster.id === data.roadmap.sequence[index]?.id, 'sequence');
    requireValue(
      text(cluster.title) &&
        text(cluster.short) &&
        text(cluster.phase) &&
        text(cluster.rationale),
      'cluster.copy',
    );
    requireValue(
      Array.isArray(cluster.groups) && Array.isArray(cluster.dependsOn),
      'cluster.structure',
    );
    for (const group of cluster.groups) {
      requireValue(
        /^[a-z][a-z0-9-]*$/.test(group.id) && !groupIds.has(group.id),
        'group.id',
      );
      groupIds.add(group.id);
      for (const key of ['num', 'title', 'owns', 'provides'])
        requireValue(text(group[key]), `group.${key}`);
      requireValue(
        Array.isArray(group.items) &&
          group.items.length > 0 &&
          Array.isArray(group.links) &&
          Array.isArray(group.sources),
        'group.structure',
      );
      for (const [itemIndex, item] of group.items.entries()) {
        const id = `${group.id}-${itemIndex + 1}`;
        requireValue(!itemIds.has(id), 'item.id');
        itemIds.add(id);
        requireValue(
          ['o', 'g', 'n'].includes(item.kind) &&
            own(data.classification, item.kind) &&
            text(item.text),
          'item.copy',
        );
        if (own(item, 'raw'))
          requireValue(typeof item.raw === 'string', 'item.raw');
        const assessment = item.assessment;
        requireValue(
          assessment &&
            own(data.roadmap.supportLabels, assessment.support) &&
            own(data.roadmap.actionLabels, assessment.action) &&
            own(data.roadmap.confidenceLabels, assessment.confidence),
          'assessment.codes',
        );
        for (const key of ['owner', 'note', 'acceptance'])
          requireValue(text(assessment[key]), `assessment.${key}`);
        requireValue(
          Array.isArray(assessment.sources) && assessment.sources.length > 0,
          'assessment.sources',
        );
        for (const source of assessment.sources)
          requireValue(
            text(source.title) && new URL(source.url).protocol === 'https:',
            'source',
          );
      }
    }
  }
  requireValue(
    groupIds.size === (data.review?.expectedGroups ?? 49) &&
      itemIds.size === (data.review?.expectedItems ?? 326),
    'inventory.count',
  );
  if (data.review) validateReview(data.review, groupIds, itemIds);
  for (const cluster of data.clusters) {
    for (const id of cluster.dependsOn)
      requireValue(clusterIds.has(id), 'cluster.dependency');
    for (const group of cluster.groups) {
      for (const [id, label] of group.links)
        requireValue(groupIds.has(id) && text(label), 'group.link');
      for (const id of group.sources)
        requireValue(own(data.sources, id), 'group.source');
    }
  }
  for (const source of Object.values(data.sources))
    requireValue(
      Array.isArray(source) &&
        text(source[0]) &&
        new URL(source[1]).protocol === 'https:',
      'registry.source',
    );
  for (const url of Object.values(data.interface.links ?? {}))
    requireValue(new URL(url).protocol === 'https:', 'interface.link');
  return data;
}

export function resolvePlanning(review, groupId, itemId) {
  const decision =
    review.itemOverrides[itemId] ?? review.groupDefaults[groupId];
  return {
    scope: decision.scope,
    label: review.scopeLabels[decision.scope],
    reason: decision.reason,
  };
}

function validateReview(review, groupIds, itemIds) {
  requireValue(
    review.version === 1 && text(review.reviewedAt),
    'review.version',
  );
  requireValue(
    Number.isInteger(review.expectedItems) &&
      review.expectedItems >= 326 &&
      review.expectedGroups === 49,
    'review.inventory',
  );
  for (const code of ['required', 'conditional', 'advanced', 'implementation'])
    requireValue(text(review.scopeLabels?.[code]), 'review.scope');
  for (const key of [
    'title',
    'summary',
    'intro',
    'filterLabel',
    'allScopes',
    'scopeReason',
    'decisions',
    'coverage',
    'source',
    'unchanged',
  ])
    requireValue(text(review.copy?.[key]), 'review.copy');
  for (const key of ['merge', 'defer', 'correct', 'add'])
    requireValue(
      text(review.copy.decisionLabels?.[key]),
      'review.decisionLabel',
    );
  requireValue(review.groupDefaults && review.itemOverrides, 'review.planning');
  function decision(value) {
    requireValue(
      value && own(review.scopeLabels, value.scope) && text(value.reason),
      'review.planning.value',
    );
  }
  for (const id of groupIds) decision(review.groupDefaults[id]);
  for (const [id, value] of Object.entries(review.groupDefaults)) {
    requireValue(groupIds.has(id), 'review.group');
    decision(value);
  }
  for (const [id, value] of Object.entries(review.itemOverrides)) {
    requireValue(itemIds.has(id), 'review.item');
    decision(value);
  }
  requireValue(
    Array.isArray(review.addedItemIds) &&
      new Set(review.addedItemIds).size === review.addedItemIds.length &&
      review.addedItemIds.length === review.expectedItems - 326,
    'review.additions',
  );
  for (const id of review.addedItemIds)
    requireValue(itemIds.has(id), 'review.addition');
  requireValue(
    Array.isArray(review.decisions) && review.decisions.length > 0,
    'review.decisions',
  );
  const decisions = new Set();
  for (const entry of review.decisions) {
    requireValue(
      text(entry.id) &&
        !decisions.has(entry.id) &&
        own(review.copy.decisionLabels, entry.kind) &&
        text(entry.title) &&
        text(entry.reason) &&
        Array.isArray(entry.itemIds) &&
        entry.itemIds.length > 0,
      'review.decision',
    );
    decisions.add(entry.id);
    for (const id of entry.itemIds)
      requireValue(itemIds.has(id), 'review.decision.target');
  }
  requireValue(
    Array.isArray(review.coverage) &&
      review.coverage.length === 17 &&
      new Set(review.coverage.map((entry) => entry.id)).size === 17,
    'review.coverage',
  );
  for (const entry of review.coverage) {
    requireValue(
      /^\d{2}$/.test(entry.id) &&
        Number(entry.id) >= 1 &&
        Number(entry.id) <= 17 &&
        text(entry.title) &&
        text(entry.reason) &&
        Array.isArray(entry.groupIds) &&
        entry.groupIds.length > 0,
      'review.coverage.entry',
    );
    for (const id of entry.groupIds)
      requireValue(groupIds.has(id), 'review.coverage.target');
  }
  requireValue(
    text(review.source?.title) &&
      review.source.itemCount === 402 &&
      review.source.clusterCount === 17 &&
      Array.isArray(review.source.documents) &&
      review.source.documents.length === 2,
    'review.source',
  );
  for (const document of review.source.documents)
    requireValue(
      text(document.name) && /^[a-f0-9]{64}$/.test(document.sha256),
      'review.source.document',
    );
}

export function assembleAtlas({
  metadata,
  roadmap,
  interface: copy,
  messages,
  review,
  clusters,
}) {
  return validateAtlas({
    ...metadata,
    roadmap,
    clusters,
    interface: copy,
    messages,
    ...(review ? { review } : {}),
  });
}

export function renderDocument(data) {
  validateAtlas(data);
  const roadmap = data.roadmap,
    labels = data.interface.inventory;
  const byId = new Map(data.clusters.map((cluster) => [cluster.id, cluster]));
  const groupMap = new Map(
    data.clusters.flatMap((c) => c.groups.map((g) => [g.id, g])),
  );
  const supportCounts = Object.fromEntries(
    Object.keys(roadmap.supportLabels).map((code) => [code, 0]),
  );
  for (const c of data.clusters)
    for (const g of c.groups)
      for (const item of g.items) supportCounts[item.assessment.support]++;
  function feature(item, group, index) {
    const id = `${group.id}-${index + 1}`,
      a = item.assessment,
      planning = data.review
        ? resolvePlanning(data.review, group.id, id)
        : undefined;
    return `<li class="feature" id="feature-${escape(id)}" data-item="${escape(id)}" data-kind="${escape(item.kind)}" data-support="${escape(a.support)}" data-action="${escape(a.action)}"${planning ? ` data-scope="${escape(planning.scope)}"` : ''}>
      <label class="feature-label" for="check-${escape(id)}"><span class="check-target"><input class="feature-check" type="checkbox" id="check-${escape(id)}" value="${escape(id)}" disabled /></span><span class="feature-content"><span class="origin">${escape(labels.originLabels[item.kind])}</span><span class="feature-title">${escape(item.text)}</span></span></label>
      <div class="assessment-tags" role="group" aria-label="${escape(labels.assessmentLabel)}"><span class="support-tag" data-tag="support" data-value="${escape(a.support)}">${escape(roadmap.supportLabels[a.support])}</span><span data-tag="action" data-value="${escape(a.action)}">${escape(roadmap.actionLabels[a.action])}</span><span data-tag="owner">${escape(a.owner)}</span></div>
      ${planning ? `<p class="scope-note"><strong class="scope-label" data-scope-label="${escape(planning.scope)}">${escape(planning.label)}</strong></p>` : ''}
      <details class="assessment"><summary><span>${escape(labels.assessmentSummary)}<span class="sr-only">: ${escape(item.text)}</span></span></summary><div class="assessment-body">${planning ? `<p><strong>${escape(data.review.copy.scopeReason)}</strong> ${escape(planning.reason)}</p>` : ''}<p class="assessment-note">${escape(a.note)}</p><p><strong>${escape(labels.acceptance)}</strong> ${escape(a.acceptance)}</p><p><strong>${escape(labels.basis)}</strong> ${escape(roadmap.confidenceLabels[a.confidence])} · ${escape(roadmap.reviewedAt)}. ${escape(labels.pending)}</p><ul aria-label="${escape(labels.itemSources)}">${a.sources.map((source) => `<li><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)}</a></li>`).join('')}</ul></div></details>
      ${own(item, 'raw') ? `<p class="original-trace"><strong>${escape(labels.raw)}</strong> ${escape(item.raw)}</p>` : ''}
    </li>`;
  }
  function group(g) {
    return `<details class="group" id="group-${escape(g.id)}" data-group="${escape(g.id)}" name="atlas-groups"><summary><div><h3><span class="group-number">${escape(g.num)}</span>${escape(g.title)}</h3><p class="group-count"><span>${g.items.length}</span> ${escape(labels.item)}</p></div><span class="group-toggle" aria-hidden="true"></span></summary><p class="ownership"><strong>${escape(labels.owns)}</strong> ${escape(g.owns)}</p><ul class="features" role="list">${g.items.map((item, index) => feature(item, g, index)).join('')}</ul><div class="relations"><p><strong>${escape(labels.takes)}</strong> ${g.links.map(([target, label]) => `<a href="#group-${escape(target)}" data-jump="group-${escape(target)}">${escape(groupMap.get(target).num)} · ${escape(label)}</a>`).join('; ')}.</p><p><strong>${escape(labels.provides)}</strong> ${escape(g.provides)}</p><p class="source-links">${g.sources.map((id) => `<a href="#source-${escape(id)}" data-source="${escape(id)}">${escape(data.sources[id][0])}</a>`).join(' · ')}</p></div></details>`;
  }
  function cluster(c) {
    return `<li class="cluster" id="cluster-${escape(c.id)}" data-cluster="${escape(c.id)}"><header class="cluster-head"><span class="cluster-no" aria-hidden="true">${String(c.roadmapOrder).padStart(2, '0')}</span><div><p class="phase">${escape(c.phase)}</p><h2>${escape(c.title)}</h2><p class="cluster-meta"><span class="cluster-groups">${c.groups.length}</span> ${escape(labels.groups)} · <span class="cluster-items">${c.groups.reduce((sum, g) => sum + g.items.length, 0)}</span> ${escape(labels.item)}</p><p class="cluster-rationale">${escape(c.rationale)}</p>${c.dependsOn.length ? `<p class="cluster-dependencies"><strong>${escape(labels.prerequisite)}</strong> ${c.dependsOn.map((id) => `<a href="#cluster-${escape(id)}" data-jump="cluster-${escape(id)}">${escape(byId.get(id).short)}</a>`).join(' · ')}</p>` : ''}</div></header>${c.groups.map(group).join('')}</li>`;
  }
  const review = data.review;
  const scopeCounts = Object.fromEntries(
    Object.keys(review?.scopeLabels ?? {}).map((code) => [code, 0]),
  );
  if (review)
    for (const c of data.clusters)
      for (const g of c.groups)
        for (const [i] of g.items.entries())
          scopeCounts[
            resolvePlanning(review, g.id, `${g.id}-${i + 1}`).scope
          ]++;
  const fragments = {
    SCOPE_FILTERS: review
      ? `<fieldset><legend>${escape(review.copy.filterLabel)}</legend><div class="tag-filters"><button data-scope-filter="all" aria-pressed="true">${escape(review.copy.allScopes)}</button>${Object.entries(
          review.scopeLabels,
        )
          .map(
            ([code, label]) =>
              `<button data-scope-filter="${escape(code)}" aria-pressed="false">${escape(label)}</button>`,
          )
          .join('')}</div></fieldset>`
      : '',
    SCOPE_REVIEW: review
      ? `<details class="context-disclosure scope-review" id="scope-review"><summary><span>${escape(review.copy.title)}<span class="context-description">${escape(review.copy.summary)}</span></span></summary><div class="review-body"><p>${escape(review.copy.intro)}</p><p>${escape(review.copy.unchanged)}</p><dl class="scope-distribution">${Object.entries(
          review.scopeLabels,
        )
          .map(
            ([code, label]) =>
              `<div><dt>${escape(label)}</dt><dd>${scopeCounts[code]}</dd></div>`,
          )
          .join(
            '',
          )}</dl><h2>${escape(review.copy.decisions)}</h2><ul class="review-decisions">${review.decisions.map((entry) => `<li><p><strong>${escape(review.copy.decisionLabels[entry.kind])} · ${escape(entry.title)}</strong></p><p>${escape(entry.reason)}</p><p>${entry.itemIds.map((id) => `<a href="#feature-${escape(id)}" data-jump="feature-${escape(id)}">${escape(id)}</a>`).join(' · ')}</p></li>`).join('')}</ul><h2>${escape(review.copy.coverage)}</h2><ol class="review-coverage">${review.coverage.map((entry) => `<li><p><strong>${escape(entry.id)} · ${escape(entry.title)}</strong></p><p>${escape(entry.reason)}</p><p>${entry.groupIds.map((id) => `<a href="#group-${escape(id)}" data-jump="group-${escape(id)}">${escape(groupMap.get(id).title)}</a>`).join(' · ')}</p></li>`).join('')}</ol><p class="review-source"><strong>${escape(review.copy.source)}</strong> ${escape(review.source.title)} · ${review.source.itemCount} · ${escape(review.reviewedAt)}</p></div></details>`
      : '',

    DATA: JSON.stringify(data).replaceAll('<', '\\u003c'),
    CLUSTERS: data.clusters.map(cluster).join(''),
    NAVIGATION: data.clusters
      .map(
        (c) =>
          `<a href="#cluster-${escape(c.id)}" data-jump="cluster-${escape(c.id)}" data-nav="${escape(c.id)}"><span class="nav-no" aria-hidden="true">${String(c.roadmapOrder).padStart(2, '0')}</span><span>${escape(c.short)}</span></a>`,
      )
      .join(''),
    PICKER: `<legend class="sr-only">${escape(labels.pickerLegend)}</legend><label class="cluster-option"><input type="radio" name="cluster" value="all" checked /><span>${escape(labels.allClusters)}</span></label>${data.clusters.map((c) => `<label class="cluster-option"><input type="radio" name="cluster" value="${escape(c.id)}" /><span>${String(c.roadmapOrder).padStart(2, '0')} · ${escape(c.title)}</span></label>`).join('')}`,
    BASELINE: escape(format(data.interface.context.baseline, roadmap)),
  };
  return PAGE.replace(/\{\{([A-Za-z0-9_.]+)\}\}/g, (_match, key) =>
    own(fragments, key)
      ? fragments[key]
      : escape(resolve({ ...data, supportCounts }, key)),
  )
    .replace(/(<input\b[^>]*\bid="search")/, '$1 disabled')
    .replace(
      /(<button\b[^>]*\bid="collapse-all"[^>]*>)[\s\S]*?(<\/button>)/,
      (_match, open, close) =>
        open.replace('>', ' disabled>') +
        escape(data.messages.app.collapseAll) +
        close,
    )
    .replace(/<(?:input|button)\b[^>]*>/g, (element) =>
      /\bdisabled(?:\s|=|>)/.test(element)
        ? element
        : element.replace(/\s*\/?>$/, ' data-content-pending disabled>'),
    );
}

function describeElement(element) {
  const path = [];
  while (element && !element.id && element !== document.body) {
    const parent = element.parentElement;
    if (!parent) return undefined;
    path.unshift([...parent.children].indexOf(element));
    element = parent;
  }
  return element ? { id: element.id, path } : undefined;
}
function findElement(description) {
  if (!description) return undefined;
  let element = document.getElementById(description.id);
  for (const index of description.path) element = element?.children[index];
  return element;
}
function mountContent(html) {
  const disclosures = [...document.querySelectorAll('details')].map(
    (element) => ({
      description: describeElement(element),
      open: element.open,
    }),
  );
  const focused = describeElement(document.activeElement);
  const position = {
    top: window.scrollY,
    left: window.scrollX,
    behavior: 'instant',
  };
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  document.body.replaceChildren(...parsed.body.childNodes);
  document.title = parsed.title;
  document.querySelector('meta[name="description"]').content =
    parsed.querySelector('meta[name="description"]').content;
  for (const { description, open } of disclosures) {
    const element = findElement(description);
    if (element?.tagName === 'DETAILS') element.open = open;
  }
  findElement(focused)?.focus({ preventScroll: true });
  window.scrollTo(position);
}

export async function loadAtlas() {
  const snapshot = JSON.parse(
    document.getElementById('atlas-data').textContent,
  );
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const manifestUrl = new URL('../data/manifest.json', import.meta.url);
  async function read(url) {
    const response = await fetch(url, { signal: controller.signal });
    requireValue(response.ok, 'response');
    return response.json();
  }
  try {
    const manifest = await read(manifestUrl);
    requireValue(
      manifest.version === 1 &&
        Array.isArray(manifest.clusters) &&
        manifest.clusters.length === 12,
      'manifest',
    );
    const paths = [
      manifest.metadata,
      manifest.roadmap,
      manifest.interface,
      manifest.messages,
      manifest.review,
      ...manifest.clusters,
    ];
    requireValue(new Set(paths).size === paths.length, 'manifest.paths');
    const urls = paths.map((path) => {
      requireValue(
        typeof path === 'string' &&
          /^\.\/[a-z0-9/.-]+\.json$/.test(path) &&
          !path.includes('..'),
        'manifest.path',
      );
      return new URL(path, manifestUrl);
    });
    const [metadata, roadmap, copy, messages, review, ...clusters] =
      await Promise.all(urls.map(read));
    const data = assembleAtlas({
      metadata,
      roadmap,
      interface: copy,
      messages,
      review,
      clusters,
    });
    const html = renderDocument(data);
    if (JSON.stringify(data) !== JSON.stringify(snapshot)) mountContent(html);
    document.body.dataset.contentSource = 'json';
    document.getElementById('search').disabled = false;
    return data;
  } catch {
    validateAtlas(snapshot);
    document.body.dataset.contentSource = 'fallback';
    document.getElementById('search').disabled = false;
    return snapshot;
  } finally {
    clearTimeout(timeout);
    controller.abort();
  }
}
