import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { readContentSources } from './content-files.mjs';

const layers = ['backend', 'frontend', 'adapters', 'platform', 'operations'];
const stageIds = ['poc', 'mvp', 'post_mvp', 'scale', 'enterprise', 'maturity'];
const gateIds = ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6'];
const artifactKinds = new Set([
  'doctype',
  'native_adapter',
  'component',
  'page',
  'adapter',
  'config',
]);
const safeId = /^[a-z][a-z0-9]*(?:-{1,2}[a-z0-9]+)*$/;
const safePath = /^[a-zA-Z0-9_./-]+$/;
const digestPattern = /^[a-f0-9]{64}$/;
const fail = (message) => {
  throw new TypeError(`Invalid project model: ${message}`);
};
const record = (value, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(label);
};
const string = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) fail(label);
};
const array = (value, label, nonempty = false) => {
  if (!Array.isArray(value) || (nonempty && value.length === 0)) fail(label);
};
const id = (value, label) => {
  if (typeof value !== 'string' || !safeId.test(value)) fail(label);
};
const path = (value, label, glob = false) => {
  if (
    typeof value !== 'string' ||
    !value ||
    value.startsWith('/') ||
    value.endsWith('/') ||
    value.split('/').some((part) => part === '..' || part === '.' || !part) ||
    !(glob ? /^[a-zA-Z0-9_./*-]+$/ : safePath).test(value)
  )
    fail(label);
};
const unique = (values, label) => {
  if (new Set(values).size !== values.length) fail(label);
};
const strings = (values, label, nonempty = false) => {
  array(values, label, nonempty);
  values.forEach((value) => string(value, label));
  unique(values, label);
};
const plainContent = (value) => {
  if (typeof value === 'string') {
    if (/<\/?[a-z][^>]*>/i.test(value) || /javascript\s*:/i.test(value))
      fail('JSON content must be plain text');
    return;
  }
  if (Array.isArray(value)) {
    value.forEach(plainContent);
    return;
  }
  if (value && typeof value === 'object') {
    if (Object.getPrototypeOf(value) !== Object.prototype)
      fail('JSON object prototype');
    Object.entries(value).forEach(([key, child]) => {
      if (['__proto__', 'prototype', 'constructor'].includes(key))
        fail('JSON object key');
      plainContent(child);
    });
    return;
  }
  if (value !== null && !['number', 'boolean'].includes(typeof value))
    fail('JSON scalar');
};
const canonicalItems = (atlas) =>
  atlas.clusters.flatMap((cluster) =>
    cluster.groups.flatMap((group) =>
      group.items.map((item, index) => ({
        ...item,
        id: `${group.id}-${index + 1}`,
      })),
    ),
  );
const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const prose = (value, label) => {
  string(value, label);
  if (!/\p{L}/u.test(value)) fail(label);
};
const sameKeys = (value, keys, label) => {
  if (Object.keys(value).sort().join('|') !== [...keys].sort().join('|'))
    fail(label);
};
const httpsUrl = (value, label) => {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(label);
  }
  if (url.protocol !== 'https:' || url.username || url.password) fail(label);
};
const readinessScope = {
  genuiOwner: 'user',
  genuiBackend: 'independent',
  saasRole: 'planning',
  provider: 'frappe',
};
const readinessUi = [
  'scopeTitle',
  'historicalPlan',
  'checksTitle',
  'acceptanceLabel',
  'verificationLabel',
  'statusLabel',
  'mappingLabel',
  'sourceTasksLabel',
  'pilotTitle',
  'sourcesTitle',
  'overridesTitle',
  'gateLabel',
  'externalOwnerLabel',
];
const digestFiles = (files) => {
  const hash = createHash('sha256');
  for (const file of files)
    hash.update(`${file.path.replace(/^data\//, '')}\0${file.sha256}\n`);
  return hash.digest('hex');
};

export function projectRevision(project) {
  return createHash('sha256')
    .update(
      JSON.stringify({
        meta: project.meta,
        clusters: project.clusters,
        traceability: project.traceability,
      }),
    )
    .digest('hex');
}

function validateCurrentPlan(plan, legacyTasks, reuse = false) {
  record(plan, 'current plan');
  id(plan.id, 'current plan ID');
  string(plan.updatedAt, 'current plan date');
  for (const key of ['title', 'summary', 'notice'])
    string(plan[key], `current plan ${key}`);
  for (const key of ['ui', 'cardLabels']) {
    record(plan[key], `current plan ${key}`);
    Object.values(plan[key]).forEach((value) =>
      string(value, `current plan ${key} copy`),
    );
  }
  array(plan.sections, 'current plan sections', true);
  unique(
    plan.sections.map((section) => section.id),
    'current plan section IDs',
  );
  for (const section of plan.sections) {
    id(section.id, 'current plan section ID');
    string(section.title, 'current plan section title');
    strings(section.paragraphs, 'current plan paragraphs');
    strings(section.items, 'current plan rules');
    if (section.entries !== undefined) {
      array(section.entries, 'planning section records', true);
      unique(
        section.entries.map((entry) => entry.id),
        'planning record IDs',
      );
      for (const entry of section.entries) {
        id(entry.id, 'planning record ID');
        string(entry.title, 'planning record title');
        array(entry.fields, 'planning record fields', true);
        for (const field of entry.fields) {
          string(field.label, 'planning field label');
          if (field.url !== undefined) {
            string(field.value, 'planning evidence title');
            string(field.url, 'planning evidence URL');
            try {
              if (new URL(field.url).protocol !== 'https:')
                fail('planning evidence protocol');
            } catch {
              fail('planning evidence URL');
            }
          }
          if (Array.isArray(field.value))
            strings(field.value, 'planning field values', true);
          else string(field.value, 'planning field value');
        }
      }
    }
  }
  if (
    reuse &&
    plan.sections.map((section) => section.id).join('|') !==
      'reuse-a|reuse-b|reuse-c|reuse-d|reuse-e|reuse-f|reuse-g|reuse-h'
  )
    fail('reuse architecture section coverage');
  array(plan.roadmap, 'current roadmap', true);
  if (
    reuse
      ? plan.roadmap.length !== 3
      : plan.roadmap.length < 6 || plan.roadmap.length > 8
  )
    fail('bounded current roadmap');
  const groups = new Set(plan.roadmap.map((group) => group.id));
  unique(
    plan.roadmap.map((group) => group.id),
    'current roadmap IDs',
  );
  for (const group of plan.roadmap) {
    id(group.id, 'current roadmap ID');
    for (const key of ['title', 'deliverable', 'gate'])
      string(group[key], `current roadmap ${key}`);
  }
  array(plan.tasks, 'current plan tasks', true);
  if (
    (reuse ? plan.tasks.length !== 3 : plan.tasks.length > 12) ||
    (reuse
      ? plan.tasks.filter((task) => task.card).length !== 3
      : plan.tasks.filter((task) => task.card).length > 5)
  )
    fail('rolling-wave bounds');
  const tasks = new Map(plan.tasks.map((task) => [task.id, task]));
  unique(
    plan.tasks.map((task) => task.id),
    'current task IDs',
  );
  for (const task of plan.tasks) {
    id(task.id, 'current task ID');
    if (legacyTasks.has(task.id) || !groups.has(task.groupId))
      fail('current task group/identity');
    if (task.status !== 'BLOCKED') fail('unfrozen current task baseline');
    for (const key of ['title', 'type', 'target', 'summary', 'blocker'])
      string(task[key], `current task ${key}`);
    strings(task.dependsOn, 'current task dependencies');
    if (
      task.dependsOn.some(
        (dependency) => !tasks.has(dependency) || dependency === task.id,
      )
    )
      fail('current task dependency');
    strings(task.sourceTaskIds, 'current task sources');
    if (task.sourceTaskIds.some((source) => !legacyTasks.has(source)))
      fail('current task source reference');
    if (task.card) {
      record(task.card, 'current task card');
      if (
        Object.keys(task.card).sort().join('|') !==
        Object.keys(plan.cardLabels).sort().join('|')
      )
        fail('current task card fields');
      if (![0, 1].includes(task.card.doctypeCount))
        fail('current task DocType bound');
      if (!/^P[012](?:\s|$)/.test(task.card.risk)) fail('current task risk');
      for (const [key, value] of Object.entries(task.card)) {
        if (key === 'doctypeCount') continue;
        if (key === 'acceptance')
          strings(value, 'current task acceptance', true);
        else string(value, `current task card ${key}`);
      }
    }
  }
  const visited = new Set();
  const active = new Set();
  const visit = (taskId) => {
    if (active.has(taskId)) fail('current task dependency cycle');
    if (visited.has(taskId)) return;
    active.add(taskId);
    tasks.get(taskId).dependsOn.forEach(visit);
    active.delete(taskId);
    visited.add(taskId);
  };
  tasks.forEach((task) => visit(task.id));
  record(plan.mapping, 'current plan mapping');
  string(plan.mapping.note, 'current plan mapping note');
  array(plan.mapping.rows, 'current plan mapping rows', true);
  for (const row of plan.mapping.rows)
    for (const key of ['oldTaskId', 'action', 'result'])
      string(row[key], `current plan mapping ${key}`);
  record(plan.audit, 'current plan audit');
  string(plan.audit.title, 'current plan audit title');
  strings(plan.audit.items, 'current plan audit checks', true);
}

// Planning-only provider acceptance; an unfrozen product baseline proves nothing.
function validateHeadlessReadiness(readiness, baseline, clusterMap, taskMap) {
  record(readiness, 'headless readiness');
  if (readiness.version !== 1) fail('headless readiness version');
  id(readiness.id, 'headless readiness ID');
  if (
    typeof readiness.updatedAt !== 'string' ||
    !isoDate.test(readiness.updatedAt)
  )
    fail('headless readiness date');
  for (const key of ['title', 'summary', 'notice'])
    prose(readiness[key], `headless readiness ${key}`);
  record(readiness.scope, 'headless readiness scope');
  sameKeys(readiness.scope, Object.keys(readinessScope), 'headless scope');
  for (const [key, value] of Object.entries(readinessScope))
    if (readiness.scope[key] !== value) fail('headless readiness scope');
  const unfrozen =
    baseline.state === 'draft' ||
    baseline.targetRepository === null ||
    baseline.baseCommit === null;
  if (readiness.runtimeStatus !== 'not_verified')
    fail('unverified headless runtime');
  record(readiness.ui, 'headless readiness copy');
  sameKeys(readiness.ui, readinessUi, 'headless readiness copy keys');
  readinessUi.forEach((key) => prose(readiness.ui[key], 'headless copy'));
  array(readiness.overrides, 'headless overrides', true);
  unique(
    readiness.overrides.map((entry) => entry.clusterId),
    'headless override clusters',
  );
  for (const override of readiness.overrides) {
    record(override, 'headless override');
    sameKeys(
      override,
      ['clusterId', 'owner', 'title', 'instruction'],
      'headless override keys',
    );
    if (!clusterMap.has(override.clusterId))
      fail('headless override cluster reference');
    if (override.owner !== 'user_genui') fail('headless override owner');
    prose(override.title, 'headless override title');
    prose(override.instruction, 'headless override instruction');
  }
  const statuses = unfrozen
    ? ['unknown', 'not_run']
    : ['unknown', 'not_run', 'pass', 'fail', 'blocked'];
  const readinessIds = new Set();
  const claim = (value, label) => {
    id(value, label);
    if (readinessIds.has(value)) fail(`duplicate ${label}`);
    readinessIds.add(value);
  };
  array(readiness.areas, 'headless areas', true);
  for (const area of readiness.areas) {
    record(area, 'headless area');
    claim(area.id, 'headless area ID');
    prose(area.title, 'headless area title');
    if (!gateIds.includes(area.gateId)) fail('headless area gate');
    array(area.checks, 'headless checks', true);
    for (const check of area.checks) {
      record(check, 'headless check');
      claim(check.id, 'headless check ID');
      for (const key of ['title', 'acceptance', 'verification'])
        prose(check[key], `headless check ${key}`);
      strings(check.sourceTaskIds, 'headless check sources');
      if (check.sourceTaskIds.some((source) => !taskMap.has(source)))
        fail('headless check source reference');
      if (!['direct', 'partial', 'gap'].includes(check.mapping))
        fail('headless check mapping');
      // Only a genuine gap may stand without an existing task to map onto.
      if (check.mapping !== 'gap' && check.sourceTaskIds.length === 0)
        fail('headless mapping without source task');
      if (!statuses.includes(check.status)) fail('headless check status');
      array(check.evidence, 'headless check evidence');
      if (unfrozen && check.evidence.length)
        fail('headless evidence before frozen baseline');
      strings(check.evidence, 'headless check evidence');
      if (check.status === 'pass' && check.evidence.length === 0)
        fail('headless pass without evidence');
    }
  }
  record(readiness.pilot, 'headless pilot');
  prose(readiness.pilot.title, 'headless pilot title');
  for (const key of ['sequence', 'acceptance']) {
    strings(readiness.pilot[key], `headless pilot ${key}`, true);
    readiness.pilot[key].forEach((value) =>
      prose(value, `headless pilot ${key}`),
    );
  }
  array(readiness.sources, 'headless sources', true);
  unique(
    readiness.sources.map((source) => source.url),
    'headless sources',
  );
  for (const source of readiness.sources) {
    record(source, 'headless source');
    prose(source.title, 'headless source title');
    httpsUrl(source.url, 'headless source URL');
    if (
      typeof source.reviewedAt !== 'string' ||
      !isoDate.test(source.reviewedAt)
    )
      fail('headless source review date');
  }
}

export function validateProject(project) {
  record(project, 'root');
  const { meta, clusters, tasks, traceability, atlas } = project;
  [meta, traceability, atlas].forEach((value) => record(value, 'context'));
  plainContent(meta);
  plainContent(clusters);
  plainContent(traceability);
  if (meta.version !== 1) fail('version');
  string(meta.title, 'title');
  string(meta.description, 'description');
  record(meta.ui, 'UI copy');
  Object.values(meta.ui).forEach((value) => string(value, 'UI copy value'));
  for (const [name, expected] of [
    ['layers', layers],
    ['stages', stageIds],
    ['gates', gateIds],
  ]) {
    array(meta[name], name, true);
    if (meta[name].map((entry) => entry.id).join('|') !== expected.join('|'))
      fail(`${name} order`);
    meta[name].forEach((entry) => string(entry.title, `${name} title`));
  }
  meta.gates.forEach((gate) => {
    string(gate.summary, 'gate summary');
    strings(gate.entry, 'gate entry', true);
    strings(gate.exit, 'gate exit', true);
  });
  if (!digestPattern.test(meta.sourceDigest)) fail('source digest');
  array(meta.sourceFiles, 'source files', true);
  unique(
    meta.sourceFiles.map((file) => file.path),
    'duplicate source file',
  );
  meta.sourceFiles.forEach((file) => {
    path(file.path, 'source file');
    if (!file.path.startsWith('data/') || !digestPattern.test(file.sha256))
      fail('source file hash');
  });
  if (
    meta.sourceFiles.length !== 20 ||
    meta.sourceFiles.map((file) => file.path).join('|') !==
      [...meta.sourceFiles]
        .map((file) => file.path)
        .sort()
        .join('|') ||
    digestFiles(meta.sourceFiles) !== meta.sourceDigest
  )
    fail('canonical source digest');
  record(meta.baseline, 'baseline');
  if (
    meta.baseline.targetRepository !== null ||
    meta.baseline.baseCommit !== null ||
    meta.baseline.state !== 'draft'
  )
    fail('unfrozen target baseline');
  array(meta.deliveryRules, 'delivery rules', true);
  unique(
    meta.deliveryRules.map((rule) => rule.id),
    'delivery rule IDs',
  );
  meta.deliveryRules.forEach((rule) => {
    id(rule.id, 'delivery rule ID');
    string(rule.title, 'delivery rule title');
    string(rule.description, 'delivery rule description');
  });
  array(meta.sources, 'sources', true);
  meta.sources.forEach((source) => {
    string(source.title, 'source title');
    let url;
    try {
      url = new URL(source.url);
    } catch {
      fail('source URL');
    }
    if (url.protocol !== 'https:' || url.username || url.password)
      fail('source URL protocol');
  });
  array(meta.sharedFileOwners, 'shared file owners', true);
  const shared = new Set();
  meta.sharedFileOwners.forEach((owner) => {
    path(owner.path, 'shared path');
    if (owner.ownerLane !== 'integration' || shared.has(owner.path))
      fail('shared file ownership');
    shared.add(owner.path);
    string(owner.reason, 'shared ownership reason');
  });
  array(clusters, 'clusters', true);
  array(tasks, 'tasks', true);
  const clusterMap = new Map();
  const taskMap = new Map();
  const ownership = new Map();
  const unitIds = new Set(atlas.developmentPlan.units.map((unit) => unit.id));
  const itemMap = new Map(canonicalItems(atlas).map((item) => [item.id, item]));
  const assignmentMap = new Map(
    atlas.developmentPlan.assignments.map((entry) => [entry.itemId, entry]),
  );
  const catalogMap = new Map(
    atlas.componentCatalog.sections.flatMap((section) =>
      section.entries.map((entry) => [entry.id, entry]),
    ),
  );
  if (itemMap.size !== 387 || catalogMap.size !== 63)
    fail('canonical coverage');
  for (const cluster of clusters) {
    record(cluster, 'cluster');
    id(cluster.id, 'cluster ID');
    if (clusterMap.has(cluster.id)) fail('duplicate cluster ID');
    clusterMap.set(cluster.id, cluster);
    if (!layers.includes(cluster.layer) || !unitIds.has(cluster.unitId))
      fail('cluster layer/unit reference');
    string(cluster.title, 'cluster title');
    string(cluster.summary, 'cluster summary');
    record(cluster.artifact, 'artifact');
    const artifact = cluster.artifact;
    if (
      !artifactKinds.has(artifact.kind) ||
      !['proposed', 'native_reuse'].includes(artifact.status) ||
      ![0, 1].includes(artifact.doctypeCount) ||
      ![0, 1].includes(artifact.pageCount)
    )
      fail('artifact bounds');
    string(artifact.name, 'artifact name');
    if (
      artifact.doctypeCount !== (artifact.kind === 'doctype' ? 1 : 0) ||
      artifact.pageCount !== (artifact.kind === 'page' ? 1 : 0) ||
      (artifact.kind === 'doctype' && cluster.layer !== 'backend') ||
      (['component', 'page'].includes(artifact.kind) &&
        cluster.layer !== 'frontend') ||
      (artifact.status === 'native_reuse' && artifact.kind !== 'native_adapter')
    )
      fail('artifact ownership kind');
    if (
      artifact.kind === 'doctype' &&
      ['User', 'Role', 'File', 'Workflow', 'Report'].includes(artifact.name)
    )
      fail('native DocType duplication');
    array(cluster.tasks, 'cluster tasks', true);
    for (const task of cluster.tasks) {
      record(task, 'task');
      id(task.id, 'task ID');
      if (taskMap.has(task.id)) fail('duplicate task ID');
      taskMap.set(task.id, task);
      if (task.clusterId !== cluster.id) fail('task cluster reference');
      ['title', 'summary', 'ownerRole'].forEach((key) =>
        string(task[key], `task ${key}`),
      );
      if (
        task.readiness !== 'draft' ||
        !stageIds.includes(task.stageId) ||
        !gateIds.includes(task.gateId)
      )
        fail('task stage/gate/readiness');
      for (const key of ['requirementIds', 'catalogEntryIds']) {
        strings(task[key], `task ${key}`);
        for (const reference of task[key])
          if (!(key === 'requirementIds' ? itemMap : catalogMap).has(reference))
            fail(`task ${key} reference`);
      }
      strings(task.owns, 'owned files', true);
      strings(task.reads, 'read files');
      strings(task.forbiddenWrites, 'forbidden files', true);
      strings(task.acceptance, 'acceptance', true);
      task.reads.forEach((value) => path(value, 'read path'));
      task.forbiddenWrites.forEach((value) =>
        path(value, 'forbidden path', true),
      );
      for (const file of task.owns) {
        path(file, 'owned path');
        if (!/\.[a-z0-9]+$/i.test(file)) fail('ownership must name a file');
        if (shared.has(file) || ownership.has(file.toLowerCase()))
          fail(`overlapping file ownership: ${file}`);
        if (
          task.forbiddenWrites.some((pattern) =>
            pattern.endsWith('/**')
              ? file.startsWith(pattern.slice(0, -2))
              : file === pattern,
          )
        )
          fail('owned file is forbidden');
        ownership.set(file.toLowerCase(), task.id);
      }
      for (const file of shared)
        if (!task.forbiddenWrites.includes(file))
          fail('missing shared file lock');
      array(task.contractRefs, 'contract references', true);
      unique(
        task.contractRefs.map((ref) => ref.id),
        'duplicate contract ref',
      );
      task.contractRefs.forEach((ref) => {
        id(ref.id, 'contract ID');
        if (ref.version !== 1) fail('contract version');
      });
      array(task.dependsOn, 'task dependencies');
      unique(
        task.dependsOn.map((dependency) => dependency.taskId),
        'duplicate dependency',
      );
      task.dependsOn.forEach((dependency) => {
        id(dependency.taskId, 'dependency task ID');
        if (
          !['contract', 'implementation', 'integration'].includes(
            dependency.type,
          )
        )
          fail('dependency type');
      });
      record(task.integration, 'integration');
      if (
        task.integration.baseCommit !== null ||
        task.integration.ownerLane !== 'integration' ||
        task.integration.fragmentMode !==
          (task.gateId === 'G4' ? 'owned_output' : 'read_only_target')
      )
        fail('integration baseline/owner lane');
      strings(task.integration.fragmentPaths, 'fragment paths', true);
      task.integration.fragmentPaths.forEach((fragment) => {
        path(fragment, 'fragment path');
        if (!fragment.startsWith('integration/fragments/'))
          fail('fragment location');
      });
    }
  }
  const ownedPaths = [...ownership.keys()].sort();
  for (let index = 1; index < ownedPaths.length; index += 1)
    if (ownedPaths[index].startsWith(ownedPaths[index - 1] + '/'))
      fail('nested file ownership');
  const flattened = clusters.flatMap((cluster) => cluster.tasks);
  if (
    tasks.length !== flattened.length ||
    JSON.stringify(tasks) !== JSON.stringify(flattened)
  )
    fail('flattened task projection');
  if (new Set(clusters.map((cluster) => cluster.unitId)).size !== unitIds.size)
    fail('architectural unit coverage');
  const contractIds = new Set(
    flattened
      .filter((task) => task.gateId === 'G1')
      .map((task) => `contract-${task.clusterId}`),
  );
  for (const task of flattened) {
    for (const ref of task.contractRefs)
      if (!contractIds.has(ref.id)) fail('unknown contract reference');
    for (const dependency of task.dependsOn) {
      const producer = taskMap.get(dependency.taskId);
      if (!producer || producer.id === task.id) fail('dependency reference');
      if (stageIds.indexOf(producer.stageId) > stageIds.indexOf(task.stageId))
        fail(
          `dependency stage order: ${task.id} (${task.stageId}) -> ${producer.id} (${producer.stageId})`,
        );
      if (dependency.type === 'contract' && producer.gateId !== 'G1')
        fail('contract dependency must use contract task');
      if (dependency.type === 'integration' && producer.gateId !== 'G3')
        fail('integration dependency must use implementation task');
    }
    for (const fragment of task.integration.fragmentPaths) {
      const owner = taskMap.get(ownership.get(fragment.toLowerCase()));
      if (!owner || owner.gateId !== 'G4' || owner.clusterId !== task.clusterId)
        fail('unowned integration fragment');
      if (task.gateId === 'G4' && !task.owns.includes(fragment))
        fail('integration output ownership');
      if (task.gateId !== 'G4' && task.owns.includes(fragment))
        fail('read-only fragment target');
    }
  }
  const visiting = new Set();
  const visited = new Set();
  const visit = (taskId) => {
    if (visiting.has(taskId)) fail('dependency cycle');
    if (visited.has(taskId)) return;
    visiting.add(taskId);
    taskMap
      .get(taskId)
      .dependsOn.forEach((dependency) => visit(dependency.taskId));
    visiting.delete(taskId);
    visited.add(taskId);
  };
  flattened.forEach((task) => visit(task.id));
  array(traceability.items, 'item traceability', true);
  if (
    traceability.items.map((entry) => entry.itemId).join('|') !==
    [...itemMap.keys()].join('|')
  )
    fail('exact ordered requirement coverage');
  for (const entry of traceability.items) {
    const primaryTask = taskMap.get(entry.primaryTaskId);
    if (!primaryTask?.requirementIds.includes(entry.itemId))
      fail('primary task requirement reference');
    if (primaryTask.stageId !== assignmentMap.get(entry.itemId).stageId)
      fail('primary task must preserve requirement stage');
    strings(entry.supportingTaskIds, 'supporting tasks');
    for (const taskId of entry.supportingTaskIds)
      if (
        taskId === entry.primaryTaskId ||
        !taskMap.get(taskId)?.requirementIds.includes(entry.itemId)
      )
        fail('supporting task requirement reference');
    const linked = new Set([entry.primaryTaskId, ...entry.supportingTaskIds]);
    for (const task of flattened)
      if (task.requirementIds.includes(entry.itemId) && !linked.has(task.id))
        fail('untraced supporting requirement');
  }
  array(traceability.catalog, 'catalog traceability', true);
  if (
    traceability.catalog.map((entry) => entry.catalogEntryId).join('|') !==
    [...catalogMap.keys()].join('|')
  )
    fail('exact ordered catalog coverage');
  for (const entry of traceability.catalog) {
    strings(entry.taskIds, 'catalog tasks', true);
    for (const taskId of entry.taskIds)
      if (!taskMap.get(taskId)?.catalogEntryIds.includes(entry.catalogEntryId))
        fail('catalog task reference');
  }
  validateCurrentPlan(meta.currentPlan, taskMap);
  validateCurrentPlan(meta.reusePlan, taskMap, true);
  validateHeadlessReadiness(
    meta.reusePlan.headlessReadiness,
    meta.baseline,
    clusterMap,
    taskMap,
  );
  return project;
}

export async function loadProject(directory = process.cwd()) {
  const projectRoot = resolve(directory, 'data/project');
  const read = async (name) => {
    if (!/^[a-z-]+\.json$/.test(name)) fail('project file path');
    const file = resolve(projectRoot, name);
    if (!file.startsWith(projectRoot + sep)) fail('project file location');
    return JSON.parse(await readFile(file, 'utf8'));
  };
  const [meta, traceability, ...classified] = await Promise.all([
    read('project.json'),
    read('traceability.json'),
    ...layers.map((layer) => read(`${layer}.json`)),
  ]);
  const atlas = await readContentSources(directory);
  const clusters = classified.flatMap((document, index) => {
    record(document, 'classified document');
    if (Object.keys(document).join('|') !== 'clusters')
      fail('classified document keys');
    array(document.clusters, 'classified clusters', true);
    if (document.clusters.some((cluster) => cluster.layer !== layers[index]))
      fail('classified layer');
    return document.clusters;
  });
  const project = validateProject({
    meta,
    clusters,
    tasks: clusters.flatMap((cluster) => cluster.tasks),
    traceability,
    atlas,
  });
  const manifest = JSON.parse(
    await readFile(resolve(directory, 'data/manifest.json'), 'utf8'),
  );
  const canonicalPaths = [
    'manifest.json',
    manifest.metadata,
    manifest.roadmap,
    manifest.interface,
    manifest.messages,
    manifest.review,
    manifest.componentCatalog,
    manifest.developmentPlan,
    ...manifest.clusters,
  ]
    .map((value) => `data/${value.replace(/^\.\//, '')}`)
    .sort();
  if (
    canonicalPaths.join('|') !==
    meta.sourceFiles.map((file) => file.path).join('|')
  )
    fail('canonical source file set');
  await Promise.all(
    meta.sourceFiles.map(async (file) => {
      path(file.path, 'source path');
      const bytes = await readFile(resolve(directory, file.path));
      if (createHash('sha256').update(bytes).digest('hex') !== file.sha256)
        fail(`canonical source changed: ${file.path}`);
    }),
  );
  project.revision = projectRevision(project);
  return project;
}
