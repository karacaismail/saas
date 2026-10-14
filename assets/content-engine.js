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
        if (own(assessment, 'reviewedAt')) {
          const date = assessment.reviewedAt;
          requireValue(
            text(date) &&
              /^\d{4}-\d{2}-\d{2}$/.test(date) &&
              Number.isFinite(Date.parse(date)) &&
              new Date(date).toISOString().slice(0, 10) === date,
            'assessment.reviewedAt',
          );
        }
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
  if (own(data, 'componentCatalog'))
    validateCatalog(data.componentCatalog, itemIds);
  if (own(data, 'developmentPlan'))
    validateDevelopmentPlan(data.developmentPlan, itemIds);
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
    label: decision.label ?? review.scopeLabels[decision.scope],
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
    if (own(value, 'label'))
      requireValue(text(value.label), 'review.planning.label');
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
  if (own(review, 'decisionNotes')) {
    requireValue(
      review.decisionNotes &&
        typeof review.decisionNotes === 'object' &&
        !Array.isArray(review.decisionNotes),
      'review.decisionNotes',
    );
    for (const [id, note] of Object.entries(review.decisionNotes))
      requireValue(decisions.has(id) && text(note), 'review.decisionNote');
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

function validateCatalog(catalog, itemIds) {
  requireValue(catalog && catalog.version === 1, 'catalog.version');
  for (const key of ['title', 'intro', 'summary'])
    requireValue(text(catalog[key]), 'catalog.copy');
  for (const key of [
    'description',
    'need',
    'frappe',
    'work',
    'acceptance',
    'itemIds',
    'source',
    'technology',
    'notes',
    'category',
  ])
    requireValue(text(catalog.labels?.[key]), 'catalog.labels');
  for (const key of ['core', 'conditional', 'project'])
    requireValue(text(catalog.needLabels?.[key]), 'catalog.needLabels');
  requireValue(
    text(catalog.source?.name) &&
      /^[a-f0-9]{64}$/.test(catalog.source.sha256) &&
      /^\d{4}-\d{2}-\d{2}$/.test(catalog.source.reviewedAt) &&
      Number.isFinite(Date.parse(catalog.source.reviewedAt)) &&
      new Date(catalog.source.reviewedAt).toISOString().slice(0, 10) ===
        catalog.source.reviewedAt,
    'catalog.source',
  );
  requireValue(
    Array.isArray(catalog.sections) && catalog.sections.length === 3,
    'catalog.sections',
  );
  const ids = new Set();
  for (const [i, section] of catalog.sections.entries()) {
    requireValue(
      section.id === ['families', 'views', 'providers'][i] &&
        text(section.title) &&
        Array.isArray(section.entries) &&
        section.entries.length === [40, 15, 8][i],
      'catalog.section',
    );
    for (const entry of section.entries) {
      for (const key of [
        'title',
        'description',
        'category',
        'frappe',
        'work',
        'acceptance',
      ])
        requireValue(text(entry[key]), 'catalog.entry.copy');
      requireValue(
        typeof entry.id === 'string' &&
          /^[a-z][a-z0-9-]+$/.test(entry.id) &&
          !ids.has(entry.id),
        'catalog.entry.id',
      );
      ids.add(entry.id);
      requireValue(
        text(entry.need) &&
          ['core', 'conditional', 'project'].includes(entry.need),
        'catalog.entry.need',
      );
      requireValue(
        Array.isArray(entry.itemIds) &&
          entry.itemIds.length > 0 &&
          new Set(entry.itemIds).size === entry.itemIds.length &&
          entry.itemIds.every((id) => itemIds.has(id)),
        'catalog.entry.targets',
      );
    }
  }
  requireValue(
    Array.isArray(catalog.technologyDecisions) &&
      catalog.technologyDecisions.length > 0,
    'catalog.technology',
  );
  const technologyIds = new Set();
  for (const entry of catalog.technologyDecisions) {
    requireValue(
      text(entry.id) &&
        !technologyIds.has(entry.id) &&
        text(entry.title) &&
        text(entry.description),
      'catalog.technology.entry',
    );
    technologyIds.add(entry.id);
  }
  requireValue(
    Array.isArray(catalog.paragraphs) &&
      catalog.paragraphs.length > 0 &&
      catalog.paragraphs.every(text),
    'catalog.paragraphs',
  );
  requireValue(
    Array.isArray(catalog.sources) && catalog.sources.length > 0,
    'catalog.sources',
  );
  for (const source of catalog.sources)
    requireValue(
      text(source.title) && new URL(source.url).protocol === 'https:',
      'catalog.source.url',
    );
}

function renderCatalog(catalog) {
  if (!catalog) return '';
  const labels = catalog.labels;
  return `<details class="context-disclosure component-catalog" id="component-catalog"><summary><span>${escape(catalog.title)}<span class="context-description">${escape(catalog.summary)}</span></span></summary><div class="review-body"><p>${escape(catalog.intro)}</p><h2>${escape(labels.technology)}</h2>${catalog.technologyDecisions.map((entry) => `<p><strong>${escape(entry.title)}</strong> ${escape(entry.description)}</p>`).join('')}${catalog.sections.map((section) => `<section aria-labelledby="catalog-${escape(section.id)}"><h2 id="catalog-${escape(section.id)}">${escape(section.title)}</h2>${section.entries.map((entry) => `<details class="catalog-entry" name="atlas-components" id="component-${escape(entry.id)}"><summary>${escape(entry.title)}</summary><div class="assessment-body"><p><strong>${escape(labels.need)}</strong> ${escape(catalog.needLabels[entry.need])}</p>${['category', 'description', 'frappe', 'work', 'acceptance'].map((key) => `<p><strong>${escape(labels[key])}</strong> ${escape(entry[key])}</p>`).join('')}<p><strong>${escape(labels.itemIds)}</strong> ${entry.itemIds.map((id) => `<a href="#feature-${escape(id)}" data-jump="feature-${escape(id)}">${escape(id)}</a>`).join(' · ')}</p></div></details>`).join('')}</section>`).join('')}<h2>${escape(labels.notes)}</h2>${catalog.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}<p class="catalog-source"><strong>${escape(labels.source)}</strong> ${escape(catalog.source.name)} · ${escape(catalog.source.sha256)} · ${escape(catalog.source.reviewedAt)}</p><ul>${catalog.sources.map((source) => `<li><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)}</a></li>`).join('')}</ul></div></details>`;
}

const PLAN_STAGES = [
  'poc',
  'mvp',
  'post_mvp',
  'scale',
  'enterprise',
  'maturity',
];
const PLAN_KINDS = [
  'frappe_module',
  'shared_kernel',
  'backend_adapter',
  'frontend_package',
  'platform_adapter',
  'external_service',
  'operations',
];
const PLAN_NEEDS = ['required', 'conditional', 'optional'];
const PLAN_DELIVERY = ['configure', 'extend', 'integrate', 'build', 'validate'];

function validateDevelopmentPlan(plan, itemIds) {
  requireValue(plan && plan.version === 1, 'developmentPlan.version');
  const strings = (entry, keys, name) => {
    requireValue(entry && typeof entry === 'object', name);
    for (const key of keys) requireValue(text(entry[key]), `${name}.${key}`);
  };
  const list = (values, name, allowEmpty = false) =>
    requireValue(
      Array.isArray(values) &&
        (allowEmpty || values.length > 0) &&
        values.every(text),
      name,
    );
  const collection = (entries, name) => {
    requireValue(Array.isArray(entries) && entries.length > 0, name);
    const ids = new Set();
    for (const entry of entries) {
      requireValue(
        entry &&
          typeof entry.id === 'string' &&
          /^[a-z][a-z0-9_-]*$/.test(entry.id) &&
          !ids.has(entry.id),
        `${name}.id`,
      );
      ids.add(entry.id);
    }
    return ids;
  };
  strings(plan, ['title', 'intro', 'reviewedAt'], 'developmentPlan');
  requireValue(
    /^\d{4}-\d{2}-\d{2}$/.test(plan.reviewedAt) &&
      Number.isFinite(Date.parse(plan.reviewedAt)) &&
      new Date(plan.reviewedAt).toISOString().slice(0, 10) === plan.reviewedAt,
    'developmentPlan.reviewedAt',
  );
  strings(
    plan.labels,
    [
      'architecture',
      'stack',
      'stages',
      'units',
      'assignments',
      'maturity',
      'decisions',
      'sources',
      'kind',
      'need',
      'startsAt',
      'targetStage',
      'condition',
      'frappe',
      'customWork',
      'dataOwnership',
      'contracts',
      'dependencies',
      'dependencyContext',
      'acceptance',
      'owner',
      'item',
      'scope',
      'stage',
      'delivery',
      'reason',
      'goal',
      'entry',
      'deliverables',
      'exit',
      'definition',
      'measurement',
      'evidence',
      'reviewedAt',
    ],
    'developmentPlan.labels',
  );
  strings(plan.kindLabels, PLAN_KINDS, 'developmentPlan.kindLabels');
  strings(plan.needLabels, PLAN_NEEDS, 'developmentPlan.needLabels');
  collection(plan.architecture, 'developmentPlan.architecture');
  for (const entry of plan.architecture)
    strings(
      entry,
      ['title', 'description', 'acceptance'],
      'developmentPlan.architecture',
    );
  collection(plan.stack, 'developmentPlan.stack');
  for (const entry of plan.stack)
    strings(entry, ['title', 'decision', 'status'], 'developmentPlan.stack');
  collection(plan.stages, 'developmentPlan.stages');
  requireValue(
    plan.stages.length === PLAN_STAGES.length &&
      plan.stages.every((stage, index) => stage.id === PLAN_STAGES[index]),
    'developmentPlan.stageOrder',
  );
  for (const stage of plan.stages) {
    strings(stage, ['title', 'goal', 'entry'], 'developmentPlan.stage');
    list(stage.deliverables, 'developmentPlan.stage.deliverables');
    list(stage.exit, 'developmentPlan.stage.exit');
  }
  const unitIds = collection(plan.units, 'developmentPlan.units');
  const units = new Map(plan.units.map((unit) => [unit.id, unit]));
  for (const unit of plan.units) {
    strings(
      unit,
      [
        'title',
        'condition',
        'frappe',
        'customWork',
        'dataOwnership',
        'acceptance',
        'owner',
      ],
      'developmentPlan.unit',
    );
    requireValue(
      PLAN_KINDS.includes(unit.kind) &&
        PLAN_NEEDS.includes(unit.need) &&
        PLAN_STAGES.includes(unit.startsAt) &&
        PLAN_STAGES.includes(unit.targetStage) &&
        PLAN_STAGES.indexOf(unit.startsAt) <=
          PLAN_STAGES.indexOf(unit.targetStage),
      'developmentPlan.unit.codes',
    );
    list(unit.contracts, 'developmentPlan.unit.contracts');
    list(unit.dependsOn, 'developmentPlan.unit.dependsOn', true);
    requireValue(
      new Set(unit.dependsOn).size === unit.dependsOn.length &&
        unit.dependsOn.every((id) => unitIds.has(id) && id !== unit.id),
      'developmentPlan.unit.dependencies',
    );
    if (unit.need === 'required')
      requireValue(
        unit.dependsOn.every((id) => units.get(id).need === 'required'),
        'developmentPlan.unit.requiredDependency',
      );
  }
  const visited = new Set(),
    visiting = new Set();
  function visit(id) {
    requireValue(!visiting.has(id), 'developmentPlan.unit.cycle');
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of units.get(id).dependsOn) visit(dependency);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of unitIds) visit(id);
  requireValue(
    Array.isArray(plan.assignments) && plan.assignments.length === itemIds.size,
    'developmentPlan.assignments',
  );
  const orderedItems = [...itemIds];
  for (const [index, assignment] of plan.assignments.entries()) {
    requireValue(
      assignment &&
        assignment.itemId === orderedItems[index] &&
        unitIds.has(assignment.unitId) &&
        PLAN_STAGES.includes(assignment.stageId) &&
        PLAN_DELIVERY.includes(assignment.delivery) &&
        text(assignment.reason),
      'developmentPlan.assignment',
    );
    requireValue(
      PLAN_STAGES.indexOf(assignment.stageId) >=
        PLAN_STAGES.indexOf(units.get(assignment.unitId).startsAt),
      'developmentPlan.assignment.stage',
    );
  }
  strings(
    plan.maturity,
    ['title', 'intro', 'gate'],
    'developmentPlan.maturity',
  );
  collection(plan.maturity.levels, 'developmentPlan.maturity.levels');
  for (const level of plan.maturity.levels)
    strings(level, ['title', 'definition'], 'developmentPlan.maturity.level');
  collection(plan.maturity.dimensions, 'developmentPlan.maturity.dimensions');
  for (const dimension of plan.maturity.dimensions)
    strings(
      dimension,
      ['title', 'measurement', 'evidence'],
      'developmentPlan.maturity.dimension',
    );
  collection(plan.decisions, 'developmentPlan.decisions');
  for (const decision of plan.decisions) {
    strings(
      decision,
      ['title', 'description', 'acceptance'],
      'developmentPlan.decision',
    );
    requireValue(
      PLAN_STAGES.includes(decision.stageId),
      'developmentPlan.decision.stage',
    );
  }
  requireValue(
    Array.isArray(plan.sources) && plan.sources.length > 0,
    'developmentPlan.sources',
  );
  for (const source of plan.sources) {
    strings(source, ['title', 'url'], 'developmentPlan.source');
    requireValue(
      /^https?:\/\//.test(source.url) &&
        ['http:', 'https:'].includes(new URL(source.url).protocol),
      'developmentPlan.source.url',
    );
  }
}

function renderDevelopmentPlan(plan, data) {
  if (!plan) return '';
  const labels = plan.labels;
  const stageTitles = new Map(
    plan.stages.map((stage) => [stage.id, stage.title]),
  );
  const unitTitles = new Map(plan.units.map((unit) => [unit.id, unit.title]));
  const itemTitles = new Map(
    data.clusters.flatMap((cluster) =>
      cluster.groups.flatMap((group) =>
        group.items.map((item, index) => [
          `${group.id}-${index + 1}`,
          item.text,
        ]),
      ),
    ),
  );
  const field = (label, value) =>
    `<p><strong>${escape(label)}</strong> ${escape(value)}</p>`;
  const list = (label, values) =>
    `<h3>${escape(label)}</h3><ul>${values.map((value) => `<li>${escape(value)}</li>`).join('')}</ul>`;
  const entry = (id, title, body, attributes = '') =>
    `<details class="plan-entry" name="atlas-development-plan" id="plan-${escape(id)}"${attributes}><summary>${escape(title)}</summary><div class="assessment-body">${body}</div></details>`;
  const architecture = entry(
    'architecture',
    labels.architecture,
    plan.architecture
      .map(
        (item) =>
          `<h3>${escape(item.title)}</h3><p>${escape(item.description)}</p>${field(labels.acceptance, item.acceptance)}`,
      )
      .join(''),
  );
  const stack = entry(
    'stack',
    labels.stack,
    plan.stack
      .map(
        (item) =>
          `<h3>${escape(item.title)}</h3><p><strong>${escape(item.status)}</strong> ${escape(item.decision)}</p>`,
      )
      .join(''),
  );
  const stages = `<h2>${escape(labels.stages)}</h2>${plan.stages
    .map((stage) =>
      entry(
        `stage-${stage.id}`,
        stage.title,
        field(labels.goal, stage.goal) +
          field(labels.entry, stage.entry) +
          list(labels.deliverables, stage.deliverables) +
          list(labels.exit, stage.exit),
        ` data-plan-stage="${escape(stage.id)}"`,
      ),
    )
    .join('')}`;
  const units = `<h2>${escape(labels.units)}</h2>${plan.units
    .map((unit) => {
      const assignments = plan.assignments.filter(
        (assignment) => assignment.unitId === unit.id,
      );
      const assigned = plan.stages
        .map((stage) => {
          const items = assignments.filter(
            (assignment) => assignment.stageId === stage.id,
          );
          return items.length
            ? `<div class="plan-stage-assignments" data-stage="${escape(stage.id)}"><p><strong>${escape(stage.title)}</strong></p><ul class="plan-item-links">${items.map((assignment) => `<li><a href="#feature-${escape(assignment.itemId)}" data-jump="feature-${escape(assignment.itemId)}" data-plan-item="${escape(assignment.itemId)}">${escape(itemTitles.get(assignment.itemId))}</a></li>`).join('')}</ul></div>`
            : '';
        })
        .join('');
      const dependencies = unit.dependsOn.length
        ? `<p><strong>${escape(labels.dependencies)}</strong> ${unit.dependsOn.map((id) => `<a href="#plan-unit-${escape(id)}" data-jump="plan-unit-${escape(id)}">${escape(unitTitles.get(id))}</a>`).join(' · ')}</p>`
        : '';
      return entry(
        `unit-${unit.id}`,
        unit.title,
        field(labels.kind, plan.kindLabels[unit.kind]) +
          field(labels.need, plan.needLabels[unit.need]) +
          field(labels.startsAt, stageTitles.get(unit.startsAt)) +
          field(labels.targetStage, stageTitles.get(unit.targetStage)) +
          ['condition', 'frappe', 'customWork', 'dataOwnership']
            .map((key) => field(labels[key], unit[key]))
            .join('') +
          list(labels.contracts, unit.contracts) +
          dependencies +
          field(labels.acceptance, unit.acceptance) +
          field(labels.owner, unit.owner) +
          (assigned ? `<h3>${escape(labels.assignments)}</h3>${assigned}` : ''),
        ` data-plan-unit="${escape(unit.id)}"`,
      );
    })
    .join('')}`;
  const maturity = entry(
    'maturity',
    labels.maturity,
    `<h3>${escape(plan.maturity.title)}</h3><p>${escape(plan.maturity.intro)}</p>${plan.maturity.levels.map((level) => `<h3>${escape(level.title)}</h3>${field(labels.definition, level.definition)}`).join('')}${plan.maturity.dimensions.map((dimension) => `<h3>${escape(dimension.title)}</h3>${field(labels.measurement, dimension.measurement)}${field(labels.evidence, dimension.evidence)}`).join('')}${field(labels.acceptance, plan.maturity.gate)}`,
  );
  const decisions = entry(
    'decisions',
    labels.decisions,
    plan.decisions
      .map(
        (decision) =>
          `<h3>${escape(decision.title)}</h3>${field(labels.stage, stageTitles.get(decision.stageId))}<p>${escape(decision.description)}</p>${field(labels.acceptance, decision.acceptance)}`,
      )
      .join(''),
  );
  const sources = entry(
    'sources',
    labels.sources,
    `<ul>${plan.sources.map((source) => `<li><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)}</a></li>`).join('')}</ul>`,
  );
  return `<details class="context-disclosure development-plan" id="development-plan"><summary><span>${escape(plan.title)}</span></summary><div class="review-body"><p>${escape(plan.intro)}</p>${field(labels.reviewedAt, plan.reviewedAt)}${architecture}${stack}${stages}${units}${maturity}${decisions}${sources}</div></details>`;
}

export function assembleAtlas({
  metadata,
  roadmap,
  interface: copy,
  messages,
  review,
  componentCatalog,
  developmentPlan,
  clusters,
}) {
  return validateAtlas({
    ...metadata,
    roadmap,
    clusters,
    interface: copy,
    messages,
    ...(review ? { review } : {}),
    ...(componentCatalog !== undefined ? { componentCatalog } : {}),
    ...(developmentPlan !== undefined ? { developmentPlan } : {}),
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
      <details class="assessment"><summary><span>${escape(labels.assessmentSummary)}<span class="sr-only">: ${escape(item.text)}</span></span></summary><div class="assessment-body">${planning ? `<p><strong>${escape(data.review.copy.scopeReason)}</strong> ${escape(planning.reason)}</p>` : ''}<p class="assessment-note">${escape(a.note)}</p><p><strong>${escape(labels.acceptance)}</strong> ${escape(a.acceptance)}</p><p class="assessment-basis" data-reviewed-at="${escape(a.reviewedAt ?? roadmap.reviewedAt)}"><strong>${escape(labels.basis)}</strong> ${escape(roadmap.confidenceLabels[a.confidence])} · ${escape(a.reviewedAt ?? roadmap.reviewedAt)}. ${escape(labels.pending)}</p><ul aria-label="${escape(labels.itemSources)}">${a.sources.map((source) => `<li><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)}</a></li>`).join('')}</ul></div></details>
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
          )}</dl><h2>${escape(review.copy.decisions)}</h2><ul class="review-decisions">${review.decisions.map((entry) => `<li data-decision-id="${escape(entry.id)}">${review.decisionNotes?.[entry.id] ? `<p class="decision-note"><strong>${escape(review.decisionNotes[entry.id])}</strong></p>` : ''}<p><strong>${escape(review.copy.decisionLabels[entry.kind])} · ${escape(entry.title)}</strong></p><p>${escape(entry.reason)}</p><p>${entry.itemIds.map((id) => `<a href="#feature-${escape(id)}" data-jump="feature-${escape(id)}">${escape(id)}</a>`).join(' · ')}</p></li>`).join('')}</ul><h2>${escape(review.copy.coverage)}</h2><ol class="review-coverage">${review.coverage.map((entry) => `<li><p><strong>${escape(entry.id)} · ${escape(entry.title)}</strong></p><p>${escape(entry.reason)}</p><p>${entry.groupIds.map((id) => `<a href="#group-${escape(id)}" data-jump="group-${escape(id)}">${escape(groupMap.get(id).title)}</a>`).join(' · ')}</p></li>`).join('')}</ol><p class="review-source"><strong>${escape(review.copy.source)}</strong> ${escape(review.source.title)} · ${review.source.itemCount} · ${escape(review.reviewedAt)}</p></div></details>`
      : '',

    DEVELOPMENT_PLAN: renderDevelopmentPlan(data.developmentPlan, data),
    COMPONENT_CATALOG: renderCatalog(data.componentCatalog),
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
  // The build injects the current scope notice; regenerated HTML lacks it.
  const scopeNotice = document.querySelector(
    '#context-details > [data-current-scope]',
  );
  const parsedContext = parsed.getElementById('context-details');
  if (
    scopeNotice &&
    parsedContext &&
    !parsedContext.querySelector(':scope > [data-current-scope]')
  )
    parsedContext
      .querySelector(':scope > summary')
      ?.after(parsed.importNode(scopeNotice, true));
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
      ...(own(manifest, 'componentCatalog') ? [manifest.componentCatalog] : []),
      ...(own(manifest, 'developmentPlan') ? [manifest.developmentPlan] : []),
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
    const [metadata, roadmap, copy, messages, review, ...rest] =
      await Promise.all(urls.map(read));
    const componentCatalog = own(manifest, 'componentCatalog')
      ? rest.shift()
      : undefined;
    const developmentPlan = own(manifest, 'developmentPlan')
      ? rest.shift()
      : undefined;
    const clusters = rest;
    const data = assembleAtlas({
      metadata,
      roadmap,
      interface: copy,
      messages,
      review,
      componentCatalog,
      developmentPlan,
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
