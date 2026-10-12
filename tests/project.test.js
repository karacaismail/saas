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
  const project = await load();
  assert.equal(project.atlas.review.expectedItems, 387);
  assert.equal(project.atlas.review.decisions.length, 109);
  const { renderProjectHome } = await import('../assets/project-templates.js');
  assert.ok(
    renderProjectHome(project).includes('href="./plan/"'),
    'The latest TDD replanning must be reachable from the published workspace',
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
});

test('project validation rejects overlapping writers, dependency cycles, escaping paths and oversized clusters', async () => {
  const { validateProject } = await import('../scripts/project-model.mjs');
  const p = await load();
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
  ]) {
    const invalid = structuredClone(p);
    mutate(invalid);
    assert.throws(() => validateProject(invalid));
  }
});

test('task JSON and Markdown carry the full source requirement and dependency context', async () => {
  const p = await load();
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
  for (const taskId of [
    undefined,
    ...p.meta.currentPlan.tasks.map((task) => task.id),
  ]) {
    const packet = createCurrentPlanPacket(p, taskId);
    const md = serializeCurrentPlanMarkdown(packet);
    const embedded = md.match(
      /<!-- saas-current-plan:start -->\n````json\n([\s\S]*?)\n````\n<!-- saas-current-plan:end -->/,
    );
    assert.ok(embedded, taskId);
    assert.deepEqual(JSON.parse(embedded[1]), packet);
    assert.ok(renderCurrentPlanPage(p, taskId).includes('data-current-plan'));
  }
});
