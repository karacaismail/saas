import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const fixture = JSON.parse(
  await readFile(new URL('./fixtures/project-baseline.json', import.meta.url)),
);
const hash = (value) => createHash('sha256').update(value).digest('hex');
const load = async () =>
  (await import('../scripts/project-model.mjs')).loadProject();

test('project presentation preserves all twenty canonical source documents and all previous decisions', async () => {
  assert.equal(
    hash(JSON.stringify(fixture)),
    '00fcdcacc04178c976eb911277be1c0f72a4cd3537ad500337451178f71fcef9',
  );
  assert.equal(Object.keys(fixture.files).length, 20);
  for (const [path, digest] of Object.entries(fixture.files))
    assert.equal(hash(await readFile(path)), digest, path);
  // Preserve the published 92369b4 task registry while adding the reuse record.
  for (const [name, digest] of Object.entries({
    backend: 'fca514ada6244a845d53357ce1cd54642c770b2df6052337195c9dbeb5f54297',
    frontend:
      'feb946bec8f92c708bfe9b2dda209b0831417abb35927382571879600cf08b55',
    adapters:
      'c452c441c90fcafc9523ca5e2ee05d49b207c3a135b298eedb14910fb5875942',
    platform:
      'c0ce0c3a503bef4b72c5c19a17540f9d1db2108ae5e351c46c24df3fec884cb6',
    operations:
      '7772df96f206f1053eead889a4a349818feaf65524299a56169283a00bbc3818',
    traceability:
      '408b23776cf43059c09f2439c03be50e8553d029604fd002a4dc43a58a7b0d66',
  }))
    assert.equal(
      hash(await readFile(`data/project/${name}.json`)),
      digest,
      name,
    );
  const project = await load();
  assert.ok(
    project.meta.reusePlan,
    'Reusable product-family architecture must be published',
  );
  const { reusePlan, ...previousMeta } = project.meta;
  assert.equal(
    hash(JSON.stringify(previousMeta)),
    '0aff5b8fac3c8dff9906f9bacc7e7fee0e17ebde579a0423439981d07b4c55b8',
    'Previous project metadata and TDD plan remain unchanged',
  );
  assert.equal(reusePlan.sections.length, 8);
  assert.deepEqual(
    reusePlan.tasks.map((task) => task.id),
    ['r-00', 'r-01', 'r-02'],
  );
  assert.equal(project.atlas.review.expectedItems, 387);
  assert.equal(project.atlas.review.decisions.length, 109);
  const readiness = reusePlan.headlessReadiness;
  assert.ok(readiness, 'Frappe provider readiness must be canonical');
  assert.deepEqual(readiness.scope, {
    genuiOwner: 'user',
    genuiBackend: 'independent',
    saasRole: 'planning',
    provider: 'frappe',
  });
  assert.equal(readiness.runtimeStatus, 'not_verified');
  assert.ok(
    readiness.areas.some(
      (area) =>
        area.id === 'definitions' &&
        area.checks.some((check) => check.mapping === 'gap'),
    ),
    'Missing Frappe definition persistence must remain an explicit gap',
  );
  assert.deepEqual(
    readiness.overrides.map((entry) => entry.clusterId),
    ['ui-family-39', 'ui-provider-registry'],
  );
  const { renderProjectHome } = await import('../assets/project-templates.js');
  assert.ok(
    renderProjectHome(project).includes('href="./plan/"'),
    'The latest TDD replanning must be reachable from the published workspace',
  );
  assert.ok(
    renderProjectHome(project).includes('href="./reuse/"'),
    'Reuse architecture must be reachable from the workspace',
  );
  const home = renderProjectHome(project);
  assert.ok(
    home.indexOf('data-reuse-plan') < home.indexOf('data-current-plan'),
    'The current master decision must precede the historical plan',
  );
  assert.equal(project.meta.currentPlan.tasks.length, 10);
  assert.equal(
    project.meta.currentPlan.tasks.filter((task) => task.card).length,
    5,
  );
  const { projectRevision } = await import('../scripts/project-model.mjs');
  assert.equal(project.revision, projectRevision(project));
  const modified = structuredClone(project);
  modified.clusters[0].tasks[0].summary += ' changed';
  assert.equal(modified.meta.sourceDigest, project.meta.sourceDigest);
  assert.notEqual(projectRevision(modified), project.revision);
  const changedPlan = structuredClone(project);
  changedPlan.meta.currentPlan.summary += ' changed';
  assert.notEqual(projectRevision(changedPlan), project.revision);
  const changedReuse = structuredClone(project);
  changedReuse.meta.reusePlan.summary += ' changed';
  assert.notEqual(projectRevision(changedReuse), project.revision);
});

test('every requirement and component family has bounded task ownership and a truthful execution baseline', async () => {
  const p = await load();
  const ids = p.atlas.developmentPlan.assignments.map((a) => a.itemId);
  assert.deepEqual(
    p.traceability.items.map((row) => row.itemId),
    ids,
  );
  assert.equal(
    new Set(p.traceability.items.map((row) => row.itemId)).size,
    387,
  );
  assert.equal(p.traceability.catalog.length, 63);
  const tasks = new Map(p.tasks.map((t) => [t.id, t]));
  const units = new Set(p.clusters.map((c) => c.unitId));
  for (const unit of p.atlas.developmentPlan.units)
    assert.ok(units.has(unit.id), unit.id);
  for (const cluster of p.clusters) {
    assert.ok(cluster.artifact.doctypeCount <= 1, cluster.id);
    assert.ok(cluster.artifact.pageCount <= 1, cluster.id);
    assert.ok(
      p.tasks.some((t) => t.clusterId === cluster.id),
      cluster.id,
    );
  }
  for (const row of p.traceability.items) {
    const primary = tasks.get(row.primaryTaskId);
    assert.ok(primary?.requirementIds.includes(row.itemId), row.itemId);
    const stage = p.atlas.developmentPlan.assignments.find(
      (a) => a.itemId === row.itemId,
    ).stageId;
    assert.equal(primary.stageId, stage, row.itemId);
    for (const id of row.supportingTaskIds)
      assert.ok(tasks.get(id)?.requirementIds.includes(row.itemId), id);
  }
  for (const task of p.tasks) {
    assert.equal(task.readiness, 'draft');
    assert.equal(task.integration.baseCommit, null);
    assert.ok(task.owns.length > 0, task.id);
    assert.ok(task.acceptance.length > 0, task.id);
  }
  const readiness = p.meta.reusePlan.headlessReadiness;
  assert.ok(readiness);
  const checkIds = new Set();
  for (const area of readiness.areas) {
    assert.ok(p.meta.gates.some((gate) => gate.id === area.gateId));
    for (const check of area.checks) {
      assert.ok(!checkIds.has(check.id), check.id);
      checkIds.add(check.id);
      assert.equal(check.status, 'not_run');
      assert.deepEqual(check.evidence, []);
      for (const reference of check.sourceTaskIds)
        assert.ok(tasks.has(reference), reference);
    }
  }
});

test('project validation rejects overlapping writers, dependency cycles, escaping paths and oversized clusters', async () => {
  const { validateProject } = await import('../scripts/project-model.mjs');
  const p = await load();
  assert.ok(p.meta.reusePlan.headlessReadiness);
  for (const mutate of [
    (q) => q.tasks[1].owns.push(q.tasks[0].owns[0]),
    (q) =>
      q.tasks[0].dependsOn.push({
        taskId: q.tasks[0].id,
        type: 'implementation',
      }),
    (q) => q.tasks[0].owns.push('../outside.py'),
    (q) => {
      q.clusters[0].artifact.doctypeCount = 2;
    },
    (q) => {
      q.traceability.items[0].primaryTaskId = 'missing-task';
    },
    (q) => {
      q.meta.currentPlan.tasks[0].status = 'READY';
    },
    (q) => {
      q.meta.currentPlan.tasks[2].card.doctypeCount = 2;
    },
    (q) => {
      q.meta.currentPlan.tasks[2].dependsOn.push('missing-plan-task');
    },
    (q) => {
      q.meta.reusePlan.tasks[0].status = 'READY';
    },
    (q) => {
      q.meta.reusePlan.tasks[2].card.doctypeCount = 2;
    },
    (q) => {
      q.meta.reusePlan.tasks[1].sourceTaskIds.push('unknown-source');
    },
    (q) => {
      q.meta.reusePlan.tasks[0].dependsOn.push('r-02');
    },
    (q) => {
      q.meta.reusePlan.sections[1].entries[0].fields[0].value =
        '<script>bad()</script>';
    },
    (q) => {
      q.meta.reusePlan.sections[1].entries[0].fields[0].url =
        'http://example.test';
    },
    (q) => {
      q.meta.reusePlan.headlessReadiness.scope.genuiOwner = 'saas';
    },
    (q) => {
      q.meta.reusePlan.headlessReadiness.areas[0].checks[0].sourceTaskIds = [
        'missing-provider-task',
      ];
    },
    (q) => {
      const areas = q.meta.reusePlan.headlessReadiness.areas;
      areas[1].checks[0].id = areas[0].checks[0].id;
    },
    (q) => {
      q.meta.reusePlan.headlessReadiness.areas[0].checks[0].status = 'pass';
    },
    (q) => {
      q.meta.reusePlan.headlessReadiness.overrides[0].clusterId =
        'unknown-genui-cluster';
    },
  ]) {
    const invalid = structuredClone(p);
    mutate(invalid);
    assert.throws(() => validateProject(invalid));
  }
});

test('task JSON and Markdown carry the full source requirement and dependency context', async () => {
  const p = await load();
  const readiness = p.meta.reusePlan.headlessReadiness;
  assert.ok(readiness);
  const { createTaskPacket, serializeTaskMarkdown, renderTaskPage } =
    await import('../assets/project-templates.js');
  for (const layer of [
    'backend',
    'frontend',
    'adapters',
    'platform',
    'operations',
  ]) {
    const task = p.tasks.find(
      (t) =>
        t.requirementIds.length &&
        p.clusters.find((c) => c.id === t.clusterId).layer === layer,
    );
    const cluster = p.clusters.find((c) => c.id === task?.clusterId);
    assert.ok(cluster, layer);
    assert.ok(task, layer);
    const packet = createTaskPacket(p, task.id);
    assert.deepEqual(packet.task, task);
    assert.deepEqual(packet.cluster, cluster);
    assert.equal(packet.sourceDigest, p.meta.sourceDigest);
    assert.equal(packet.projectRevision, p.revision);
    const exported = packet.requirements.clusters.flatMap((c) =>
      c.groups.flatMap((g) => g.items),
    );
    assert.equal(exported.length, task.requirementIds.length);
    const md = serializeTaskMarkdown(packet);
    for (const path of task.owns) assert.ok(md.includes(path), path);
    for (const requirement of exported) {
      assert.ok(requirement.assessment);
      assert.ok(md.includes(requirement.id), requirement.id);
    }
    const dependencyIds = new Set(packet.dependencyContext.map((t) => t.id));
    for (const edge of task.dependsOn)
      assert.ok(dependencyIds.has(edge.taskId), edge.taskId);
    const html = renderTaskPage(p, task.id, packet);
    assert.ok(html.includes('../../assets/project-app.js'));
    assert.ok(!html.includes('src="../../assets/app.js"'));
    assert.ok(html.includes('task.json') && html.includes('task.md'));
  }
  const {
    createCurrentPlanPacket,
    renderCurrentPlanPage,
    serializeCurrentPlanMarkdown,
  } = await import('../assets/project-templates.js');
  for (const planKey of ['currentPlan', 'reusePlan'])
    for (const taskId of [
      undefined,
      ...p.meta[planKey].tasks.map((task) => task.id),
    ]) {
      const packet = createCurrentPlanPacket(p, taskId, planKey);
      const md = serializeCurrentPlanMarkdown(packet);
      const embedded = md.match(
        /<!-- saas-current-plan:start -->\n````json\n([\s\S]*?)\n````\n<!-- saas-current-plan:end -->/,
      );
      assert.ok(embedded, taskId);
      assert.deepEqual(JSON.parse(embedded[1]), packet);
      assert.ok(
        renderCurrentPlanPage(p, taskId, planKey).includes('data-current-plan'),
      );
      if (planKey === 'reusePlan') {
        assert.deepEqual(
          taskId ? packet.rules : packet.plan.sections,
          p.meta.reusePlan.sections,
        );
        if (!taskId)
          for (const area of readiness.areas)
            for (const check of area.checks) {
              assert.ok(md.includes(check.title), check.id);
              assert.ok(
                renderCurrentPlanPage(p, undefined, planKey).includes(
                  `data-headless-check="${check.id}"`,
                ),
                check.id,
              );
            }
        if (!taskId)
          for (const entry of p.meta.reusePlan.sections.flatMap(
            (section) => section.entries ?? [],
          )) {
            assert.ok(md.includes(entry.title));
          }
      }
    }
  for (const override of readiness.overrides) {
    const task = p.tasks.find(
      (entry) => entry.clusterId === override.clusterId,
    );
    const packet = createTaskPacket(p, task.id);
    assert.deepEqual(packet.executionScope, override);
    assert.ok(serializeTaskMarkdown(packet).includes(override.instruction));
    assert.ok(
      renderTaskPage(p, task.id, packet).includes('data-execution-scope'),
    );
  }
});
