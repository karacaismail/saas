import {
  buildSelection,
  configureExportMessages,
  serializeExport,
} from './exports.js';

// Build-time templates only. The browser runtime never imports the atlas engine.
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const jsonScript = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');
const text = (project, key) => {
  const value = project.meta.ui[key];
  if (typeof value !== 'string')
    throw new TypeError(`Missing project copy: ${key}`);
  return value;
};
const format = (pattern, values) =>
  pattern.replace(/\{(\w+)\}/g, (_match, key) => String(values[key]));
const label = (project, key) => escape(text(project, key));
const byId = (items, id) => {
  const item = items.find((entry) => entry.id === id);
  if (!item) throw new TypeError(`Unknown project identity: ${id}`);
  return item;
};
const taskUrl = (base, id) => `${base}tasks/${encodeURIComponent(id)}/`;
const clusterUrl = (base, id) => `${base}clusters/${encodeURIComponent(id)}/`;
const stageTitle = (project, id) => byId(project.meta.stages, id).title;
const layerTitle = (project, id) => byId(project.meta.layers, id).title;
const pill = (value, tone = 'neutral') =>
  `<span class="p-pill" data-tone="${escape(tone)}">${escape(value)}</span>`;
// The reuse plan is the current master; its readiness copy labels history.
const headless = (project) => project.meta.reusePlan?.headlessReadiness;
const executionScope = (project, clusterId) =>
  headless(project)?.overrides.find((entry) => entry.clusterId === clusterId);
const field = (term, value) =>
  `<div><dt>${escape(term)}</dt><dd>${value}</dd></div>`;
const code = (value) => `<span class="p-code">${escape(value)}</span>`;
const artifactKind = (project, kind) =>
  text(
    project,
    {
      doctype: 'artifactKindDoctype',
      native_adapter: 'artifactKindNativeAdapter',
      component: 'artifactKindComponent',
      page: 'artifactKindPage',
      adapter: 'artifactKindAdapter',
      config: 'artifactKindConfig',
    }[kind],
  );

function taskCopyFallback(project) {
  return `<section class="p-copy-fallback" id="project-copy-fallback" hidden><label for="project-copy-text">${label(project, 'copyFallbackLabel')}</label><p>${label(project, 'copyFallbackHint')}</p><textarea id="project-copy-text" readonly></textarea><button type="button" data-close-fallback>${label(project, 'closeFallback')}</button></section>`;
}

function taskCheck(project, task, prefix) {
  const detail = prefix === 'detail';
  return `<label class="p-task-select${detail ? ' p-task-select-detail' : ''}" for="${prefix}-${escape(task.id)}"><input type="checkbox" id="${prefix}-${escape(task.id)}" data-task-select="${escape(task.id)}" disabled /><span class="p-sr-only">${escape(format(text(project, 'selectTask'), { title: task.title }))}</span>${detail ? `<span>${label(project, 'selectTaskShort')}</span>` : ''}</label>`;
}

function taskData(project, task) {
  const cluster = byId(project.clusters, task.clusterId);
  const search = [
    task.id,
    task.title,
    task.summary,
    cluster.title,
    cluster.artifact.name,
    ...task.requirementIds,
  ].join(' ');
  return `data-task-row="${escape(task.id)}" data-cluster="${escape(task.clusterId)}" data-stage="${escape(task.stageId)}" data-layer="${escape(cluster.layer)}" data-search="${escape(search)}"`;
}

function taskRow(project, task, base, prefix = 'list') {
  const cluster = byId(project.clusters, task.clusterId);
  return `<li class="p-task-row" ${taskData(project, task)}>
    ${taskCheck(project, task, prefix)}
    <div class="p-task-identity"><span class="p-task-id">${escape(task.id)}</span><a class="p-task-title" href="${taskUrl(base, task.id)}">${escape(task.title)}</a><p>${escape(task.summary)}</p><a class="p-task-cluster" href="${clusterUrl(base, cluster.id)}">${escape(cluster.title)}</a></div>
    <div class="p-task-meta">${pill(stageTitle(project, task.stageId), 'stage')}${pill(artifactKind(project, cluster.artifact.kind), cluster.layer)}${pill(text(project, 'draft'), 'draft')}<span class="p-artifact-name">${escape(cluster.artifact.name)}</span></div>
  </li>`;
}

function taskTable(project, tasks, base) {
  return `<div class="p-table-scroll" tabindex="0" role="region" aria-label="${label(project, 'tableView')}"><table class="p-task-table"><thead><tr>${['tableSelect', 'tableTask', 'tableCluster', 'tableArtifact', 'tableStage', 'tableReadiness'].map((key) => `<th scope="col">${label(project, key)}</th>`).join('')}</tr></thead><tbody data-project-table-rows>${tasks
    .map((task) => {
      const cluster = byId(project.clusters, task.clusterId);
      return `<tr ${taskData(project, task)}><td>${taskCheck(project, task, 'table')}</td><th scope="row"><span class="p-task-id">${escape(task.id)}</span><a href="${taskUrl(base, task.id)}">${escape(task.title)}</a></th><td><a href="${clusterUrl(base, cluster.id)}">${escape(cluster.title)}</a></td><td>${escape(cluster.artifact.name)}</td><td>${escape(stageTitle(project, task.stageId))}</td><td>${pill(text(project, 'draft'), 'draft')}</td></tr>`;
    })
    .join('')}</tbody></table></div>`;
}

function radioGroup(project, key, name, choices, classes = '') {
  return `<fieldset class="p-filter-group ${classes}" disabled><legend>${label(project, key)}</legend><div class="p-radio-options">${choices
    .map(
      (choice, index) =>
        `<label><input type="radio" name="${name}" value="${escape(choice.id)}"${index === 0 ? ' checked' : ''} /><span>${escape(choice.title)}</span></label>`,
    )
    .join('')}</div></fieldset>`;
}

function stages(project) {
  return radioGroup(
    project,
    'stageFilter',
    'project-stage',
    [{ id: 'all', title: text(project, 'allStages') }, ...project.meta.stages],
    'p-stage-strip',
  );
}

function gates(project) {
  return `<details class="p-gates" id="gates"><summary><span>${label(project, 'gatesTitle')}</span><span class="p-chevron" aria-hidden="true"></span></summary><p>${label(project, 'gatesDescription')}</p><ol class="p-gate-list">${project.meta.gates
    .map(
      (gate) =>
        `<li class="p-gate" id="gate-${escape(gate.id)}"><details name="project-gate"><summary><span class="p-gate-id">${escape(gate.id)}</span><span>${escape(gate.title)}</span><span class="p-chevron" aria-hidden="true"></span></summary><p>${escape(gate.summary)}</p><div class="p-gate-criteria"><section><h3>${label(project, 'gateEntry')}</h3>${list(gate.entry)}</section><section><h3>${label(project, 'gateExit')}</h3>${list(gate.exit)}</section></div></details></li>`,
    )
    .join('')}</ol></details>`;
}

function selection(project) {
  return `<section class="p-selection" aria-labelledby="selection-title"><div><h2 id="selection-title">${label(project, 'selectionTitle')}</h2><p>${label(project, 'selectionNote')}</p><p id="project-selection-count">${escape(format(text(project, 'selectionCount'), { count: 0 }))}</p></div><div class="p-selection-actions"><button type="button" data-select-visible disabled>${label(project, 'selectVisible')}</button><button type="button" data-clear-selection disabled>${label(project, 'clearSelection')}</button><button type="button" data-export="json" disabled>${label(project, 'exportJson')}</button><button type="button" data-export="md" disabled>${label(project, 'exportMarkdown')}</button></div></section>`;
}

function pagination(project) {
  return `<nav class="p-pagination" aria-label="${label(project, 'paginationLabel')}" hidden><button type="button" data-previous-page disabled>${label(project, 'previousPage')}</button><p id="project-page-count"></p><button type="button" data-next-page disabled>${label(project, 'nextPage')}</button></nav>`;
}

function shell(
  project,
  title,
  body,
  {
    base = './',
    route = 'home',
    taskId,
    clusterId,
    planTaskId,
    planKey = 'currentPlan',
  } = {},
) {
  const indexTasks =
    route === 'home'
      ? project.tasks
      : route === 'cluster'
        ? project.tasks.filter((task) => task.clusterId === clusterId)
        : [];
  const runtime = {
    ui: project.meta.ui,
    taskIds: project.tasks.map((task) => task.id),
    sourceDigest: project.meta.sourceDigest,
    projectRevision: project.revision,
    base,
    route,
    ...(taskId ? { taskId } : {}),
    ...(planTaskId
      ? { planTaskId, currentPlanId: project.meta[planKey].id }
      : {}),
    taskIndex: indexTasks.map((task) => {
      const cluster = byId(project.clusters, task.clusterId);
      return {
        id: task.id,
        title: task.title,
        summary: task.summary,
        clusterId: cluster.id,
        clusterTitle: cluster.title,
        artifactName: cluster.artifact.name,
        artifactKind: artifactKind(project, cluster.artifact.kind),
        layer: cluster.layer,
        stageId: task.stageId,
        stageTitle: stageTitle(project, task.stageId),
        requirementIds: task.requirementIds,
      };
    }),
  };
  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light" /><meta name="description" content="${label(project, 'description')}" /><meta name="theme-color" content="#fffdf7" /><title>${escape(title)} · ${label(project, 'siteTitle')}</title><link rel="icon" type="image/svg+xml" href="${base}assets/favicon.svg" /><link rel="stylesheet" href="${base}assets/project.css" /></head>
<body class="p-body" data-project-route="${route}"><a class="p-skip" href="#main">${label(project, 'skip')}</a><div class="p-shell"><aside class="p-sidebar"><a class="p-brand" href="${base}"><span class="p-brand-mark" aria-hidden="true"></span>${label(project, 'brand')}</a><p class="p-sidebar-label">${label(project, 'workspace')}</p><nav class="p-nav" aria-label="${label(project, 'workspace')}"><a href="${base}"${route === 'home' ? ' aria-current="page"' : ''}>${label(project, 'navWorkspace')}</a>${project.meta.reusePlan ? `<a href="${base}reuse/" data-reuse-plan${route === 'reuse' || route === 'reuse-task' ? ' aria-current="page"' : ''}>${escape(project.meta.reusePlan.ui.nav)}</a>` : ''}${project.meta.currentPlan ? `<a href="${base}plan/" data-current-plan${route === 'plan' || route === 'plan-task' ? ' aria-current="page"' : ''}>${escape(headless(project)?.ui.historicalPlan ?? project.meta.currentPlan.ui.nav)}</a>` : ''}<a href="${base}#tasks">${label(project, 'navTasks')}</a><a href="${base}#cluster-results" data-project-nav="clusters">${label(project, 'navClusters')}</a><a href="${base}#gates">${label(project, 'navGates')}</a><a href="${base}atlas/#development-plan">${label(project, 'navArchitecture')}</a><a href="${base}atlas/">${label(project, 'navAtlas')}</a></nav><p class="p-sidebar-note">${label(project, 'workspaceNote')}</p></aside><main class="p-main" id="main">${body}<footer class="p-footer"><p>${label(project, 'footer')}</p><a href="${base}atlas/">${label(project, 'navAtlas')}</a></footer></main></div><p class="p-status" id="project-status" role="status" aria-live="polite"></p><noscript><p class="p-noscript">${label(project, 'jsRequired')}</p></noscript><script id="project-runtime" type="application/json">${jsonScript(runtime)}</script><script type="module" src="${base}assets/project-app.js"></script></body></html>\n`;
}

function clusterCard(project, cluster, base) {
  const tasks = project.tasks.filter((task) => task.clusterId === cluster.id);
  return `<li class="p-cluster-card" data-cluster-card="${escape(cluster.id)}" data-task-ids="${escape(tasks.map((task) => task.id).join(' '))}"><div class="p-cluster-top"><span class="p-task-id">${escape(cluster.id)}</span>${pill(layerTitle(project, cluster.layer), cluster.layer)}</div><h3><a href="${clusterUrl(base, cluster.id)}">${escape(cluster.title)}</a></h3><p>${escape(cluster.summary)}</p><dl class="p-cluster-facts"><div><dt>${label(project, 'artifactLabel')}</dt><dd>${escape(cluster.artifact.name)}</dd></div><div><dt>${label(project, 'taskCount')}</dt><dd>${tasks.length}</dd></div></dl><p class="p-artifact-limit">${label(project, 'artifactLimit')}</p></li>`;
}

// Navigation owns the single data-reuse-plan anchor; the current master precedes history.
function planEntry(project) {
  const { currentPlan, reusePlan } = project.meta;
  if (!currentPlan) return '';
  const readiness = headless(project);
  const current = reusePlan
    ? `<h2><a href="./reuse/">${escape(reusePlan.ui.nav)}</a></h2><p>${escape(reusePlan.summary)}</p>${readiness ? `<h3>${escape(readiness.title)}</h3><p>${escape(readiness.summary)}</p><p class="p-workspace-note">${escape(readiness.notice)}</p>` : ''}`
    : '';
  const level = reusePlan ? 'h3' : 'h2';
  return `<section class="p-detail-section p-plan-entry">${current}<${level}>${readiness ? `${escape(readiness.ui.historicalPlan)} · ` : ''}<a href="./plan/" data-current-plan>${escape(currentPlan.ui.nav)}</a></${level}><p>${escape(currentPlan.summary)}</p><p>${escape(currentPlan.notice)}</p></section>`;
}

/** Render the project workspace without shipping the old atlas or its engine. */
export function renderProjectHome(project) {
  const ui = project.meta.ui;
  const body = `<header class="p-header"><p class="p-kicker">${label(project, 'workspace')}</p><h1>${label(project, 'homeTitle')}</h1><p class="p-lead">${label(project, 'homeDescription')}</p><div class="p-header-action"><a class="p-button p-primary" href="#tasks">${label(project, 'jumpToTasks')}</a></div></header><dl class="p-stats" aria-label="${label(project, 'scopeSummary')}">${[
    ['taskCount', project.tasks.length],
    ['clusterCount', project.clusters.length],
    ['requirementCount', project.traceability.items.length],
    ['stageCount', project.meta.stages.length],
  ]
    .map(
      ([key, count]) =>
        `<div><dt>${label(project, key)}</dt><dd>${count}</dd></div>`,
    )
    .join(
      '',
    )}</dl><p class="p-workspace-note">${label(project, 'draftNote')}</p>${planEntry(project)}${stages(project)}${gates(project)}<section class="p-workspace" id="tasks" aria-labelledby="tasks-title"><div class="p-controls"><div class="p-search"><label for="project-search">${label(project, 'searchLabel')}</label><input id="project-search" type="search" autocomplete="off" placeholder="${label(project, 'searchPlaceholder')}" disabled /></div><div class="p-filter-row">${radioGroup(project, 'layerFilter', 'project-layer', [{ id: 'all', title: ui.allLayers }, ...project.meta.layers])}<button type="button" data-reset-filters disabled>${label(project, 'resetFilters')}</button></div><div class="p-filter-row">${radioGroup(
    project,
    'viewLabel',
    'project-view',
    [
      { id: 'list', title: ui.listView },
      { id: 'clusters', title: ui.clusterView },
      { id: 'table', title: ui.tableView },
    ],
    'p-view-switcher',
  )}<label class="p-selected-toggle"><input type="checkbox" data-selected-only disabled /><span>${label(project, 'selectedOnly')}</span></label></div></div>${selection(project)}<div class="p-results-header"><h2 id="tasks-title">${label(project, 'navTasks')}</h2><p id="project-results-count" role="status" aria-live="polite">${escape(format(ui.resultsCount, { visible: project.tasks.length, total: project.tasks.length }))}</p></div><div data-project-view="list"><ol class="p-task-list" data-project-list-rows>${project.tasks
    .slice(0, 30)
    .map((task) => taskRow(project, task, './'))
    .join(
      '',
    )}</ol></div><div data-project-view="clusters" id="cluster-results"><h2>${label(project, 'navClusters')}</h2><ul class="p-cluster-list">${project.clusters.map((cluster) => clusterCard(project, cluster, './')).join('')}</ul></div><div data-project-view="table" hidden>${taskTable(project, [], './')}</div><div class="p-empty" id="project-empty" hidden><h3>${label(project, 'noResults')}</h3><p>${label(project, 'noResultsHint')}</p></div>${pagination(project)}</section>`;
  return shell(project, ui.homeTitle, body);
}

function list(values, className = '') {
  return `<ul${className ? ` class="${className}"` : ''}>${values.map((value) => `<li>${escape(value)}</li>`).join('')}</ul>`;
}

function breadcrumb(project, current, cluster) {
  return `<nav class="p-breadcrumb" aria-label="${label(project, 'workspace')}"><ol><li><a href="../../">${label(project, 'navWorkspace')}</a></li>${cluster ? `<li><a href="${clusterUrl('../../', cluster.id)}">${escape(cluster.title)}</a></li>` : ''}<li aria-current="page">${escape(current)}</li></ol></nav>`;
}

/** Escaped current-master notice injected into the built atlas context disclosure. */
export function renderLegacyScopeNotice(project) {
  const readiness = headless(project);
  if (!readiness) return '';
  const overrides = readiness.overrides.map(
    (entry) => `<p>${escape(entry.title)} · ${escape(entry.instruction)}</p>`,
  );
  return `<div class="review-body" data-current-scope="${escape(readiness.id)}"><h2><a href="../reuse/">${escape(readiness.title)}</a></h2><p>${escape(readiness.notice)}</p>${overrides.join('')}</div>`;
}

// Legacy owned paths stay visible as history, never as current write authority.
function ownedSection(project, key, values, scope) {
  if (!scope) return detailSection(project, key, values, 'p-file-list');
  return `<section class="p-detail-section" data-historical-owns="${escape(key)}"><h2>${escape(headless(project).ui.historicalPlan)} · ${label(project, key)}</h2><p class="p-workspace-note">${escape(scope.instruction)}</p>${values.length ? list(values, 'p-file-list') : `<p>${label(project, 'emptyList')}</p>`}</section>`;
}

// Current external ownership is shown before the unchanged historical record.
function executionScopeSection(project, clusterId, base) {
  const scope = executionScope(project, clusterId);
  if (!scope) return '';
  return `<section class="p-detail-section" data-execution-scope="${escape(scope.clusterId)}"><h2>${escape(scope.title)}</h2><p class="p-workspace-note">${escape(scope.instruction)}</p><dl class="p-definition-list">${field(headless(project).ui.externalOwnerLabel, code(scope.owner))}</dl><p><a href="${base}reuse/">${escape(project.meta.reusePlan.ui.nav)}</a></p></section>`;
}

/** Every micro-cluster represents one bounded artifact, never a feature module. */
export function renderClusterPage(project, clusterId) {
  const cluster = byId(project.clusters, clusterId);
  const tasks = project.tasks.filter((task) => task.clusterId === clusterId);
  return shell(
    project,
    cluster.title,
    `${breadcrumb(project, cluster.title)}<header class="p-header"><p class="p-kicker">${escape(cluster.id)} · ${label(project, 'clusterTitle')}</p><h1>${escape(cluster.title)}</h1><p class="p-lead">${escape(cluster.summary)}</p><div class="p-header-tags">${pill(layerTitle(project, cluster.layer), cluster.layer)}${pill(artifactKind(project, cluster.artifact.kind), cluster.layer)}${pill(text(project, cluster.artifact.status === 'native_reuse' ? 'nativeReuse' : 'proposed'), 'draft')}</div></header>${executionScopeSection(project, clusterId, '../../')}<section class="p-artifact-boundary"><h2>${label(project, 'artifactLabel')}</h2><p class="p-artifact-name">${escape(cluster.artifact.name)}</p><p>${label(project, 'artifactLimit')}</p></section>${selection(project)}<section id="tasks" aria-labelledby="cluster-tasks-title"><div class="p-results-header"><h2 id="cluster-tasks-title">${label(project, 'navTasks')}</h2><p>${tasks.length} ${label(project, 'taskCount')}</p></div><ol class="p-task-list" data-project-list-rows>${tasks.map((task) => taskRow(project, task, '../../')).join('')}</ol></section>`,
    { base: '../../', route: 'cluster', clusterId },
  );
}

function requirementCards(project, packet) {
  if (!packet.requirements.selectedCount)
    return `<li class="p-source-empty">${label(project, 'noSourceRequirements')}</li>`;
  return packet.requirements.clusters
    .flatMap((cluster) =>
      cluster.groups.flatMap((group) =>
        group.items.map((item) => {
          const assessment = item.assessment;
          return `<li class="p-source-item" data-kind="${escape(item.kind)}"><div class="p-source-top">${pill(item.label, item.kind)}<a href="../../atlas/#feature-${encodeURIComponent(item.id)}">${escape(item.id)}</a></div><p class="p-source-location">${escape(cluster.title)} · ${escape(group.title)}</p><h3>${escape(item.text)}</h3>${Object.hasOwn(item, 'raw') ? `<blockquote>${escape(item.raw)}</blockquote>` : ''}${item.planning ? `<p>${pill(item.planning.label, 'scope')}</p><p>${escape(item.planning.reason)}</p>` : ''}${assessment ? `<h4>${label(project, 'frappeAssessment')}</h4><div class="p-header-tags">${pill(project.atlas.roadmap.supportLabels[assessment.support], `support-${assessment.support}`)}${pill(project.atlas.roadmap.actionLabels[assessment.action], `action-${assessment.action}`)}</div><p>${escape(assessment.note)}</p><dl class="p-definition-list"><div><dt>${label(project, 'ownerLabel')}</dt><dd>${escape(assessment.owner)}</dd></div><div><dt>${label(project, 'acceptance')}</dt><dd>${escape(assessment.acceptance)}</dd></div><div><dt>${escape(project.atlas.messages.export.markdown.confidence)}</dt><dd>${escape(project.atlas.roadmap.confidenceLabels[assessment.confidence])}${assessment.reviewedAt ? ` · ${escape(assessment.reviewedAt)}` : ''}</dd></div></dl>${assessment.sources?.length ? `<ul class="p-evidence-list">${assessment.sources.map((source) => `<li><a href="${escape(source.url)}" rel="noopener noreferrer">${escape(source.title)}</a></li>`).join('')}</ul>` : ''}` : ''}</li>`;
        }),
      ),
    )
    .join('');
}

function catalogCards(project, entries) {
  return entries.length
    ? `<ul class="p-catalog-context">${entries.map((entry) => `<li><h3>${escape(entry.title)}</h3><p>${escape(entry.description)}</p><dl class="p-definition-list"><div><dt>${label(project, 'frappeAssessment')}</dt><dd>${escape(entry.frappe)}</dd></div><div><dt>${label(project, 'taskOutputs')}</dt><dd>${escape(entry.work)}</dd></div><div><dt>${label(project, 'acceptance')}</dt><dd>${escape(entry.acceptance)}</dd></div></dl><a href="../../atlas/#component-${encodeURIComponent(entry.id)}">${escape(entry.id)}</a></li>`).join('')}</ul>`
    : `<p>${label(project, 'emptyList')}</p>`;
}

function detailSection(project, key, values, className = '') {
  return `<section class="p-detail-section"><h2>${label(project, key)}</h2>${values.length ? list(values, className) : `<p>${label(project, 'emptyList')}</p>`}</section>`;
}

function contractLink(project, contract) {
  const taskId = `${contract.id.replace(/^contract-/, '')}--contract`;
  const target = project.tasks.find((task) => task.id === taskId);
  return `${target ? `<a href="${taskUrl('../../', taskId)}">${escape(contract.id)}</a>` : `<span>${escape(contract.id)}</span>`} · ${label(project, 'contractVersion')} ${contract.version}`;
}

/** Create a self-contained, lossless execution brief from canonical content. */
export function createTaskPacket(project, taskId) {
  const task = byId(project.tasks, taskId);
  const cluster = byId(project.clusters, task.clusterId);
  const clusterTasks = project.tasks.filter(
    (entry) => entry.clusterId === cluster.id,
  );
  const contextIds = [
    ...new Set(clusterTasks.flatMap((entry) => entry.requirementIds)),
  ].filter((id) => !task.requirementIds.includes(id));
  const catalogIds = new Set(
    clusterTasks.flatMap((entry) => entry.catalogEntryIds),
  );
  const dependencyIds = new Set();
  const include = (current) => {
    for (const dependency of current.dependsOn) {
      if (dependencyIds.has(dependency.taskId)) continue;
      dependencyIds.add(dependency.taskId);
      include(byId(project.tasks, dependency.taskId));
    }
  };
  include(task);
  configureExportMessages(project.atlas.messages.export);
  const scope = executionScope(project, cluster.id);
  return structuredClone({
    version: 1,
    task,
    cluster,
    ...(scope ? { executionScope: scope } : {}),
    sourceDigest: project.meta.sourceDigest,
    projectRevision: project.revision,
    requirements: buildSelection(project.atlas, task.requirementIds),
    contextRequirements: buildSelection(project.atlas, contextIds),
    catalogContext: (project.atlas.componentCatalog?.sections ?? []).flatMap(
      (section) => section.entries.filter((entry) => catalogIds.has(entry.id)),
    ),
    projectContext: Object.fromEntries(
      Object.entries(project.meta).filter(([key]) => key !== 'ui'),
    ),
    dependencyContext: project.tasks.filter((entry) =>
      dependencyIds.has(entry.id),
    ),
    gates: project.meta.gates,
    sharedFileOwners: project.meta.sharedFileOwners,
    labels: project.meta.ui,
    requirementLabels: project.atlas.messages.export,
  });
}

const markdown = (value) =>
  String(value).replace(/([\\`*_{}[\]<>#+.!|~-])/g, '\\$1');
const markdownList = (values) =>
  values.map((value) => `- ${markdown(value)}`).join('\n');

function planningRecord(project, planKey) {
  if (!['currentPlan', 'reusePlan'].includes(planKey))
    throw new TypeError('Unknown planning record');
  return project.meta[planKey];
}

/** Planning records share rendering and packets; neither changes the task registry. */
export function createCurrentPlanPacket(
  project,
  taskId,
  planKey = 'currentPlan',
) {
  const plan = planningRecord(project, planKey);
  if (!plan) throw new TypeError('Missing current development plan');
  const readiness = headless(project);
  // Every brief except the full master record carries the current decision.
  const master =
    readiness && (taskId || planKey !== 'reusePlan')
      ? {
          currentMaster: {
            planId: project.meta.reusePlan.id,
            headlessReadiness: readiness,
          },
        }
      : {};
  return structuredClone({
    version: 1,
    sourceDigest: project.meta.sourceDigest,
    projectRevision: project.revision,
    ...(taskId
      ? {
          planId: plan.id,
          task: byId(plan.tasks, taskId),
          rules: plan.sections,
          cardLabels: plan.cardLabels,
        }
      : { plan }),
    ...master,
  });
}

function planFields(plan, task) {
  return task.card
    ? `<dl class="p-definition-list">${Object.entries(task.card)
        .map(
          ([key, value]) =>
            `<div><dt>${escape(plan.cardLabels[key])}</dt><dd>${Array.isArray(value) ? list(value) : escape(value)}</dd></div>`,
        )
        .join('')}</dl>`
    : `<p>${escape(task.blocker)}</p>`;
}

function planningSections(plan) {
  return plan.sections
    .map(
      (section) =>
        `<section class="p-detail-section" id="${escape(section.id)}"><h2>${escape(section.title)}</h2>${section.paragraphs.map((value) => `<p>${escape(value)}</p>`).join('')}${list(section.items)}${(section.entries ?? []).map((entry) => `<article class="p-detail-section" id="${escape(entry.id)}"><h3>${escape(entry.title)}</h3><dl class="p-definition-list">${entry.fields.map((field) => `<div><dt>${escape(field.label)}</dt><dd>${field.url ? `<a href="${escape(field.url)}" rel="noopener noreferrer">${escape(field.value)}</a>` : Array.isArray(field.value) ? list(field.value) : escape(field.value)}</dd></div>`).join('')}</dl></article>`).join('')}</section>`,
    )
    .join('');
}

// Every acceptance check stays visible in the DOM, including honest mapping gaps.
function readinessCheck(project, copy, check, base) {
  const sources = check.sourceTaskIds.length
    ? `<ul>${check.sourceTaskIds.map((id) => `<li><a href="${taskUrl(base, id)}">${escape(id)}</a></li>`).join('')}</ul>`
    : label(project, 'emptyList');
  const evidence = check.evidence.length ? list(check.evidence) : '';
  return `<article class="p-detail-section" data-headless-check="${escape(check.id)}" data-mapping="${escape(check.mapping)}"><h4>${escape(check.title)}</h4><dl class="p-definition-list">${field(copy.acceptanceLabel, escape(check.acceptance))}${field(copy.verificationLabel, escape(check.verification))}${field(copy.statusLabel, code(check.status))}${field(copy.mappingLabel, code(check.mapping))}${field(copy.sourceTasksLabel, sources)}</dl>${evidence}</article>`;
}

function readinessArea(project, copy, area, base) {
  const gate = byId(project.meta.gates, area.gateId);
  const link = `<a href="${base}#gate-${escape(gate.id)}">${escape(gate.id)} · ${escape(gate.title)}</a>`;
  const checks = area.checks.map((check) =>
    readinessCheck(project, copy, check, base),
  );
  return `<details class="p-detail-section" data-headless-area="${escape(area.id)}"><summary><span>${escape(area.title)}</span><span class="p-chevron" aria-hidden="true"></span></summary><dl class="p-definition-list">${field(copy.gateLabel, link)}</dl>${checks.join('')}</details>`;
}

// No id on the outer section: main > section[id] stays the A–H rule set.
function readinessSection(project, readiness, base) {
  const copy = readiness.ui;
  const scope = Object.entries(readiness.scope).map(
    ([key, value]) => `<div><dt>${code(key)}</dt><dd>${code(value)}</dd></div>`,
  );
  const overrides = readiness.overrides.map(
    (entry) =>
      `<li><h4>${escape(entry.title)}</h4><p>${escape(entry.instruction)}</p><dl class="p-definition-list">${field(copy.externalOwnerLabel, code(entry.owner))}</dl><a href="${clusterUrl(base, entry.clusterId)}">${escape(byId(project.clusters, entry.clusterId).title)}</a></li>`,
  );
  const areas = readiness.areas.map((area) =>
    readinessArea(project, copy, area, base),
  );
  const steps = readiness.pilot.sequence.map(
    (step) => `<li>${escape(step)}</li>`,
  );
  const sources = readiness.sources.map(
    (source) =>
      `<li><a href="${escape(source.url)}" rel="noopener noreferrer">${escape(source.title)}</a> · ${escape(source.reviewedAt)}</li>`,
  );
  return `<section class="p-detail-section" data-headless-readiness aria-labelledby="headless-readiness-title"><h2 id="headless-readiness-title">${escape(readiness.title)}</h2><p>${escape(readiness.summary)}</p><p class="p-workspace-note">${escape(readiness.notice)}</p><h3>${escape(copy.scopeTitle)}</h3><dl class="p-definition-list">${field(copy.statusLabel, code(readiness.runtimeStatus))}${scope.join('')}</dl><h3>${escape(copy.overridesTitle)}</h3><ul>${overrides.join('')}</ul><h3>${escape(copy.checksTitle)}</h3>${areas.join('')}<h3>${escape(copy.pilotTitle)}</h3><p>${escape(readiness.pilot.title)}</p><ol>${steps.join('')}</ol><h4>${escape(copy.acceptanceLabel)}</h4>${list(readiness.pilot.acceptance)}<h3>${escape(copy.sourcesTitle)}</h3><ul class="p-evidence-list">${sources.join('')}</ul></section>`;
}

export function renderCurrentPlanPage(
  project,
  taskId,
  planKey = 'currentPlan',
) {
  const plan = planningRecord(project, planKey);
  const slug = planKey === 'reusePlan' ? 'reuse' : 'plan';
  const ui = plan.ui;
  const task = taskId ? byId(plan.tasks, taskId) : null;
  const base = task ? '../../../' : '../';
  const download = task
    ? 'task'
    : planKey === 'reusePlan'
      ? 'reuse-plan'
      : 'current-plan';
  const title = task?.title ?? plan.title;
  const readiness = headless(project);
  // Historical plan routes stay intact but point to the superseding master.
  const masterNote = !readiness
    ? ''
    : planKey === 'currentPlan'
      ? `<p class="p-workspace-note">${escape(readiness.ui.historicalPlan)} · ${escape(readiness.notice)} <a href="${base}reuse/">${escape(project.meta.reusePlan.ui.nav)}</a></p>`
      : task
        ? `<p class="p-workspace-note">${escape(readiness.notice)}</p>`
        : '';
  const header = `<header class="p-header"><p class="p-kicker">${escape(task?.id.toUpperCase() ?? plan.updatedAt)}</p><h1>${escape(title)}</h1><p class="p-lead">${escape(task?.summary ?? plan.summary)}</p><p class="p-workspace-note">${escape(task?.blocker ?? plan.notice)}</p>${masterNote}<div class="p-action-bar">${task ? `<button class="p-primary" type="button" data-copy-task disabled>${label(project, 'copyTask')}</button>` : ''}<a class="p-button" href="./${download}.json" download>${escape(ui.downloadJson)}</a><a class="p-button" href="./${download}.md" download>${escape(ui.downloadMarkdown)}</a></div></header>${task ? taskCopyFallback(project) : ''}`;
  let body;
  if (task) {
    const group = byId(plan.roadmap, task.groupId);
    body = `<a href="../../">${escape(ui.backToPlan)}</a>${header}<section class="p-detail-section"><dl class="p-definition-list"><div><dt>${escape(ui.statusLabel)}</dt><dd>${escape(task.status)}</dd></div><div><dt>${escape(ui.groupLabel)}</dt><dd>${escape(group.title)}</dd></div><div><dt>${escape(ui.targetLabel)}</dt><dd>${escape(task.target)}</dd></div><div><dt>${escape(ui.dependencyLabel)}</dt><dd>${task.dependsOn.length ? `<ul>${task.dependsOn.map((id) => `<li><a href="../${encodeURIComponent(id)}/">${escape(id.toUpperCase())}</a></li>`).join('')}</ul>` : escape(text(project, 'emptyList'))}</dd></div></dl></section><section class="p-detail-section">${planFields(plan, task)}</section>${task.sourceTaskIds.length ? `<section class="p-detail-section"><h2>${escape(ui.oldTaskLabel)}</h2><ul>${task.sourceTaskIds.map((id) => `<li><a href="${taskUrl(base, id)}">${escape(id)}</a></li>`).join('')}</ul></section>` : ''}`;
  } else {
    body = `${header}${planKey === 'reusePlan' && readiness ? readinessSection(project, readiness, base) : ''}${planningSections(plan)}<section class="p-detail-section"><h2>${escape(ui.roadmapTitle)}</h2><ol>${plan.roadmap.map((group) => `<li><h3>${escape(group.title)}</h3><p>${escape(group.deliverable)}</p><p>${escape(group.gate)}</p></li>`).join('')}</ol></section><section class="p-detail-section"><h2>${escape(ui.mappingTitle)}</h2><p>${escape(plan.mapping.note)}</p><ul>${plan.mapping.rows.map((row) => `<li><h3>${escape(row.oldTaskId)}</h3><p>${escape(row.action)} · ${escape(row.result)}</p></li>`).join('')}</ul></section><section class="p-detail-section"><h2>${escape(ui.tasksTitle)}</h2><ol>${plan.tasks.map((entry) => `<li data-plan-task="${escape(entry.id)}"><h3><a href="./tasks/${encodeURIComponent(entry.id)}/">${escape(entry.id.toUpperCase())} · ${escape(entry.title)}</a></h3><p>${escape(entry.summary)}</p><p>${escape(ui.typeLabel)}: ${escape(entry.type)} · ${escape(ui.statusLabel)}: ${escape(entry.status)}</p><p>${escape(ui.targetLabel)}: ${escape(entry.target)}</p><p>${escape(ui.dependencyLabel)}: ${escape(entry.dependsOn.map((id) => id.toUpperCase()).join(', ') || text(project, 'emptyList'))}</p></li>`).join('')}</ol></section><section class="p-detail-section"><h2>${escape(ui.cardsTitle)}</h2>${plan.tasks
      .filter((entry) => entry.card)
      .map(
        (entry) =>
          `<details class="p-detail-section" name="current-plan-card" data-plan-card="${escape(entry.id)}"><summary><span>${escape(entry.id.toUpperCase())} · ${escape(entry.title)}</span><span class="p-chevron" aria-hidden="true"></span></summary>${planFields(plan, entry)}</details>`,
      )
      .join(
        '',
      )}</section><section class="p-detail-section"><h2>${escape(plan.audit.title)}</h2>${list(plan.audit.items)}</section>`;
  }
  return shell(project, title, body, {
    base,
    route: task ? `${slug}-task` : slug,
    planKey,
    ...(task ? { planTaskId: task.id } : {}),
  });
}

// Human-readable master decision; the embedded packet keeps it lossless.
function readinessMarkdown(readiness, section) {
  const copy = readiness.ui;
  section(readiness.title, [
    readiness.summary,
    readiness.notice,
    `${copy.statusLabel}: ${readiness.runtimeStatus}`,
  ]);
  section(
    copy.scopeTitle,
    Object.entries(readiness.scope).map(([key, value]) => `${key}: ${value}`),
    3,
  );
  section(copy.overridesTitle, [], 3);
  for (const entry of readiness.overrides)
    section(
      entry.title,
      [
        entry.instruction,
        `${copy.externalOwnerLabel}: ${entry.owner}`,
        entry.clusterId,
      ],
      4,
    );
  section(copy.checksTitle, [], 3);
  for (const area of readiness.areas) {
    section(area.title, [`${copy.gateLabel}: ${area.gateId}`], 4);
    for (const check of area.checks)
      section(
        `${check.id} · ${check.title}`,
        [
          `${copy.acceptanceLabel}: ${check.acceptance}`,
          `${copy.verificationLabel}: ${check.verification}`,
          `${copy.statusLabel}: ${check.status}`,
          `${copy.mappingLabel}: ${check.mapping}`,
          ...(check.sourceTaskIds.length
            ? [`${copy.sourceTasksLabel}: ${check.sourceTaskIds.join(', ')}`]
            : []),
          ...check.evidence,
        ],
        5,
      );
  }
  section(
    copy.pilotTitle,
    [readiness.pilot.title, ...readiness.pilot.sequence],
    3,
  );
  section(copy.acceptanceLabel, readiness.pilot.acceptance, 4);
  section(
    copy.sourcesTitle,
    readiness.sources.map(
      (source) => `${source.title} · ${source.url} · ${source.reviewedAt}`,
    ),
    3,
  );
}

/** Human-readable Markdown plus the exact packet for lossless interchange. */
export function serializeCurrentPlanMarkdown(packet) {
  const plan = packet.plan;
  const master = packet.currentMaster?.headlessReadiness;
  const lines = [];
  const section = (title, values, level = 2) => {
    lines.push(`${'#'.repeat(level)} ${markdown(title)}`, '');
    for (const value of values) lines.push(markdown(value), '');
  };
  if (plan) {
    section(plan.title, [plan.summary, plan.notice], 1);
    // The current master precedes a historical plan; the reuse plan owns it.
    if (plan.headlessReadiness)
      readinessMarkdown(plan.headlessReadiness, section);
    if (master) {
      readinessMarkdown(master, section);
      section(master.ui.historicalPlan, []);
    }
    for (const entry of plan.sections) {
      section(entry.title, [...entry.paragraphs, ...entry.items]);
      for (const record of entry.entries ?? []) {
        section(record.title, [], 3);
        for (const field of record.fields)
          section(
            field.label,
            [
              ...(Array.isArray(field.value) ? field.value : [field.value]),
              ...(field.url ? [field.url] : []),
            ],
            4,
          );
      }
    }
    section(plan.ui.roadmapTitle, []);
    for (const group of plan.roadmap)
      section(group.title, [group.deliverable, group.gate], 3);
    section(plan.ui.mappingTitle, [plan.mapping.note]);
    for (const row of plan.mapping.rows)
      section(row.oldTaskId, [row.action, row.result], 3);
    section(plan.ui.tasksTitle, []);
    for (const task of plan.tasks) {
      section(
        `${task.id.toUpperCase()} · ${task.title}`,
        [
          task.summary,
          task.status,
          task.blocker,
          task.target,
          task.dependsOn.join(', '),
        ],
        3,
      );
      if (task.card)
        for (const [key, value] of Object.entries(task.card))
          section(
            plan.cardLabels[key],
            Array.isArray(value) ? value : [String(value)],
            4,
          );
    }
    section(plan.audit.title, plan.audit.items);
  } else {
    section(
      `${packet.task.id.toUpperCase()} · ${packet.task.title}`,
      [packet.task.summary, packet.task.status, packet.task.blocker],
      1,
    );
    for (const [key, value] of Object.entries(packet.task.card ?? {}))
      section(
        packet.cardLabels[key],
        Array.isArray(value) ? value : [String(value)],
      );
    if (master) readinessMarkdown(master, section);
  }
  lines.push(
    '<!-- saas-current-plan:start -->',
    '````json',
    JSON.stringify(packet, null, 2),
    '````',
    '<!-- saas-current-plan:end -->',
    '',
  );
  return lines.join('\n');
}

/** Markdown contains every packet field, then the complete legacy requirements. */
export function serializeTaskMarkdown(packet) {
  const copy = packet.labels;
  const task = packet.task;
  const lines = [
    `# ${markdown(task.title)}`,
    '',
    `${markdown(copy.taskIdentity)}: ${markdown(task.id)}`,
    `${markdown(copy.clusterIdentity)}: ${markdown(packet.cluster.id)}`,
    `${markdown(copy.stageLabel)}: ${markdown(task.stageId)}`,
    `${markdown(copy.readinessLabel)}: ${markdown(task.readiness)}`,
    '',
    `## ${markdown(copy.taskPurpose)}`,
    '',
    markdown(task.summary),
    '',
  ];
  const scope = packet.executionScope;
  const scopeCopy =
    scope && packet.projectContext.reusePlan.headlessReadiness.ui;
  if (scope)
    lines.push(
      `## ${markdown(scope.title)}`,
      '',
      markdown(scope.instruction),
      '',
      `${markdown(scopeCopy.externalOwnerLabel)}: ${markdown(scope.owner)}`,
      '',
    );
  // Legacy owned paths are history under the current external scope.
  for (const [key, values] of [
    ['ownedFiles', task.owns],
    ['readFiles', task.reads],
    ['forbiddenFiles', task.forbiddenWrites],
    ['acceptance', task.acceptance],
  ])
    if (scope && key === 'ownedFiles')
      lines.push(
        `## ${markdown(scopeCopy.historicalPlan)} · ${markdown(copy[key])}`,
        '',
        markdown(scope.instruction),
        '',
        markdownList(values),
        '',
      );
    else lines.push(`## ${markdown(copy[key])}`, '', markdownList(values), '');
  lines.push(
    `## ${markdown(copy.dependencies)}`,
    '',
    markdownList(
      task.dependsOn.map(
        (dependency) => `${dependency.taskId} · ${dependency.type}`,
      ),
    ),
    '',
    `## ${markdown(copy.contractReferences)}`,
    '',
    markdownList(
      task.contractRefs.map(
        (contract) =>
          `${contract.id} · ${copy.contractVersion} ${contract.version}`,
      ),
    ),
    '',
    `## ${markdown(copy.integrationTitle)}`,
    '',
    `${markdown(copy.baseCommitLabel)}: ${markdown(task.integration.baseCommit ?? copy.baseCommitUnknown)}`,
    `${markdown(copy.ownerLaneLabel)}: ${markdown(task.integration.ownerLane)}`,
    '',
    `## ${markdown(copy.taskPacketTitle)}`,
    '',
    '<!-- saas-task-packet:start -->',
    '````json',
    JSON.stringify(packet, null, 2),
    '````',
    '<!-- saas-task-packet:end -->',
    '',
    `## ${markdown(copy.sourceRequirements)}`,
    '',
  );
  configureExportMessages(packet.requirementLabels);
  lines.push(serializeExport(packet.requirements, 'md').text);
  if (packet.contextRequirements.selectedCount)
    lines.push(
      `## ${markdown(copy.requirementContext)}`,
      '',
      serializeExport(packet.contextRequirements, 'md').text,
    );
  return `${lines.join('\n')}\n`;
}

/** A task has a real route, direct static downloads and an independent brief. */
export function renderTaskPage(
  project,
  taskId,
  packet = createTaskPacket(project, taskId),
) {
  const task = byId(project.tasks, taskId);
  const cluster = byId(project.clusters, task.clusterId);
  const scope = executionScope(project, cluster.id);
  const ownerTerm = scope
    ? `${escape(headless(project).ui.historicalPlan)} · ${label(project, 'ownerLabel')}`
    : label(project, 'ownerLabel');
  const dependencyType = {
    contract: 'dependencyContract',
    implementation: 'dependencyImplementation',
    integration: 'dependencyIntegration',
  };
  const body = `${breadcrumb(project, task.title, cluster)}<header class="p-header"><p class="p-kicker">${escape(task.id)} · ${label(project, 'taskTitle')}</p><h1>${escape(task.title)}</h1><p class="p-lead">${escape(task.summary)}</p><div class="p-header-tags">${pill(stageTitle(project, task.stageId), 'stage')}${pill(layerTitle(project, cluster.layer), cluster.layer)}${pill(text(project, 'draft'), 'draft')}<a class="p-cluster-link" href="${clusterUrl('../../', cluster.id)}">${escape(cluster.title)}</a></div></header><div class="p-action-bar"><button class="p-primary" type="button" data-copy-task disabled>${label(project, 'copyTask')}</button><a class="p-button" href="./task.json" download="${escape(task.id)}.json">${label(project, 'downloadJson')}</a><a class="p-button" href="./task.md" download="${escape(task.id)}.md">${label(project, 'downloadMarkdown')}</a>${taskCheck(project, task, 'detail')}</div>${taskCopyFallback(project)}${executionScopeSection(project, cluster.id, '../../')}<div class="p-detail-grid"><div><section class="p-detail-section"><h2>${label(project, 'taskPurpose')}</h2><p>${escape(task.summary)}</p><dl class="p-definition-list"><div><dt>${label(project, 'artifactLabel')}</dt><dd>${escape(cluster.artifact.name)}</dd></div><div><dt>${ownerTerm}</dt><dd>${escape(task.ownerRole)}</dd></div></dl></section>${ownedSection(project, 'ownedFiles', task.owns, scope)}${detailSection(project, 'readFiles', task.reads, 'p-file-list')}${detailSection(project, 'forbiddenFiles', task.forbiddenWrites, 'p-file-list')}${detailSection(project, 'acceptance', task.acceptance)}<section class="p-detail-section"><h2>${label(project, 'dependencies')}</h2>${
    task.dependsOn.length
      ? `<ul class="p-dependency-list">${task.dependsOn
          .map((dependency) => {
            const upstream = byId(project.tasks, dependency.taskId);
            return `<li>${pill(text(project, dependencyType[dependency.type]), 'dependency')}<a href="${taskUrl('../../', upstream.id)}">${escape(upstream.id)} · ${escape(upstream.title)}</a></li>`;
          })
          .join('')}</ul>`
      : `<p>${label(project, 'emptyList')}</p>`
  }<h3>${label(project, 'contractReferences')}</h3><ul>${task.contractRefs.map((contract) => `<li>${contractLink(project, contract)}</li>`).join('')}</ul></section><section class="p-detail-section"><h2>${label(project, 'sourceRequirements')}</h2><ul class="p-source-list">${requirementCards(project, packet)}</ul></section>${packet.contextRequirements.selectedCount ? `<section class="p-detail-section"><h2>${label(project, 'requirementContext')}</h2><ul class="p-source-list">${requirementCards(project, { requirements: packet.contextRequirements })}</ul></section>` : ''}${packet.catalogContext.length ? `<section class="p-detail-section"><h2>${label(project, 'catalogContext')}</h2>${catalogCards(project, packet.catalogContext)}</section>` : ''}</div><aside class="p-task-aside" aria-label="${label(project, 'integrationTitle')}"><section class="p-detail-section"><h2>${label(project, 'integrationTitle')}</h2><p>${label(project, 'conflictNote')}</p><dl class="p-definition-list"><div><dt>${label(project, 'branchLabel')}</dt><dd class="p-code">task/${escape(task.id)}</dd></div><div><dt>${label(project, 'worktreeLabel')}</dt><dd class="p-code">worktrees/${escape(task.id)}</dd></div><div><dt>${label(project, 'baseCommitLabel')}</dt><dd>${escape(task.integration.baseCommit ?? text(project, 'baseCommitUnknown'))}</dd></div><div><dt>${label(project, 'ownerLaneLabel')}</dt><dd>${escape(task.integration.ownerLane)}</dd></div></dl><p>${label(project, 'draftNote')}</p></section>${ownedSection(project, 'fragmentPaths', task.integration.fragmentPaths, scope)}<section class="p-detail-section"><h2>${label(project, 'gatesTitle')}</h2><a href="../../#gate-${escape(task.gateId)}">${escape(task.gateId)} · ${escape(byId(project.meta.gates, task.gateId).title)}</a><p>${escape(byId(project.meta.gates, task.gateId).summary)}</p></section><details class="p-detail-section"><summary>${label(project, 'sharedFileOwners')}</summary><ul>${project.meta.sharedFileOwners.map((owner) => `<li><span class="p-code">${escape(owner.path)}</span><p>${escape(owner.reason)}</p><span>${escape(owner.ownerLane)}</span></li>`).join('')}</ul></details><details class="p-detail-section"><summary>${label(project, 'sourceDigestLabel')}</summary><p class="p-code">${escape(packet.sourceDigest)}</p></details></aside></div>`;
  return shell(project, task.title, body, {
    base: '../../',
    route: 'task',
    taskId,
  });
}
