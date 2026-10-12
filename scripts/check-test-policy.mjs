import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import config from '../playwright.config.js';

const policy = JSON.parse(await readFile('test-policy.json', 'utf8'));
assert.equal(policy.version, 1);
for (const key of ['timeout', 'workers'])
  assert.equal(config[key], policy.controls[key], `Test policy: ${key}`);
assert.equal(config.expect.timeout, policy.controls.expectTimeout);
assert.equal(config.use.trace, policy.controls.trace);
assert.equal(config.repeatEach ?? 1, policy.controls.repeatEach);
assert.equal(config.retries ?? 0, policy.controls.retries);
const workflow = await readFile('.github/workflows/pages.yml', 'utf8');
assert.equal(
  (workflow.match(/^\s*- run: npm run check\s*$/gm) ?? []).length,
  1,
  'Test policy: shared Node checks must run once, outside browser shards',
);
assert.match(workflow, /^  verify:\n    needs: source\n/m);
assert.match(workflow, /^    needs: \[source, verify\]$/m);
assert.match(workflow, /browser: \[chromium, webkit\]/);
assert.doesNotMatch(workflow, /\bfirefox\b/);
assert.match(
  workflow,
  /--project=chromium-touch --project=webkit-touch --project=chromium-hybrid --workers=1 --output=test-results\/input/,
  'Test policy: CI input projects must share one worker',
);

// Collection evaluates the existing test declarations; it opens no browser and
// executes no test body. Expanded parameter cases count, assertions do not.
const collected = spawnSync(
  process.execPath,
  ['node_modules/@playwright/test/cli.js', 'test', '--list', '--reporter=json'],
  { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
);
if (collected.status !== 0) {
  process.stderr.write(
    collected.stderr || collected.stdout || String(collected.error),
  );
  process.exit(collected.status || 1);
}
const report = JSON.parse(collected.stdout);
assert.deepEqual(report.errors, [], 'Test collection must succeed');
assert.deepEqual(
  report.config.projects.map((project) => project.name),
  Object.keys(policy.projects),
  'Test policy: project matrix changed',
);
const counts = Object.fromEntries(
  Object.keys(policy.projects).map((id) => [id, 0]),
);
const walk = (suites) => {
  for (const suite of suites) {
    for (const spec of suite.specs ?? [])
      for (const test of spec.tests) {
        assert.ok(Object.hasOwn(counts, test.projectName));
        counts[test.projectName]++;
      }
    walk(suite.suites ?? []);
  }
};
walk(report.suites);
for (const project of report.config.projects) {
  assert.equal(project.timeout, policy.controls.timeout);
  assert.equal(project.repeatEach, policy.controls.repeatEach);
  assert.equal(project.retries, policy.controls.retries);
  assert.ok(
    counts[project.name] <= policy.projects[project.name],
    `Test policy: ${project.name} exceeds ${policy.projects[project.name]} collected cases; justify the scope before revising the policy`,
  );
}
const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
assert.ok(
  total <= policy.browserCasesMax,
  'Test policy: browser case budget exceeded',
);
console.log(
  `Test policy passed: ${total} collected browser cases; no tests executed.`,
);
