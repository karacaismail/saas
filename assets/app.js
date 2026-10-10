import { loadAtlas, resolvePlanning } from './content-engine.js';
import {
  buildSelection,
  configureExportMessages,
  serializeExport,
} from './exports.js';

const data = await loadAtlas();
const messages = data.messages.app;
configureExportMessages(data.messages.export);
const message = (key, values = {}) =>
  messages[key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const storageKey = 'saas-atlas-selection-v1';
const search = $('#search');
const picker = $('#cluster-picker');
const status = $('#visible-status');
let kind = 'all';
let clusterFilter = 'all';
let supportFilter = 'all';
let actionFilter = 'all';
let scopeFilter = 'all';
let selectedOnly = false;
let timer;
let printState;
const norm = (text) =>
  String(text)
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const rows = [];
const groups = [];
const clusters = [];
for (const c of data.clusters) {
  const cluster = { data: c, el: $('#cluster-' + c.id), groups: [] };
  clusters.push(cluster);
  for (const g of c.groups) {
    const group = { data: g, el: $('#group-' + g.id), rows: [] };
    groups.push(group);
    cluster.groups.push(group);
    g.items.forEach((item, index) => {
      const id = `${g.id}-${index + 1}`;
      const el = $('#feature-' + id);
      const row = {
        id,
        data: item,
        planning: data.review
          ? resolvePlanning(data.review, g.id, id)
          : undefined,
        el,
        input: $('.feature-check', el),
        group,
        cluster,
        hay: norm(
          [
            item.text,
            item.raw || '',
            ...(data.review
              ? Object.values(resolvePlanning(data.review, g.id, id))
              : []),
            g.title,
            g.id,
            c.title,
            item.assessment.note,
            item.assessment.acceptance,
            item.assessment.owner,
            data.roadmap.supportLabels[item.assessment.support],
            data.roadmap.actionLabels[item.assessment.action],
          ].join(' '),
        ),
      };
      rows.push(row);
      group.rows.push(row);
    });
  }
}
const knownIds = new Set(rows.map((row) => row.id));
let selected = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(stored))
    selected = new Set(
      stored.filter((id) => typeof id === 'string' && knownIds.has(id)),
    );
} catch {
  $('#selection-note').textContent = messages.storageUnavailable;
}
function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...selected]));
  } catch {
    $('#selection-note').textContent = messages.storageUnavailable;
  }
}
function selectionStatus() {
  $('#selection-count').textContent = message('selectionCount', {
    count: selected.size,
  });
  $('#clear-selection').disabled = !selected.size;
  $('#export-selected').disabled = !selected.size;
  for (const row of rows) row.input.checked = selected.has(row.id);
}
function syncGroupToggle() {
  $('#collapse-all').disabled = !groups.some(
    (group) => !group.el.hidden && group.el.open,
  );
  $('#collapse-all').textContent = messages.collapseAll;
}
function openGroup(group) {
  const element = group?.el ?? group;
  if (!element) return;
  for (const candidate of groups)
    if (candidate.el !== element) candidate.el.open = false;
  element.open = true;
  syncGroupToggle();
}
function apply({ revealGroups = false } = {}) {
  const tokens = norm(search.value).split(' ').filter(Boolean);
  const counts = { all: 0, o: 0, g: 0, n: 0 };
  const filtering =
    tokens.length ||
    clusterFilter !== 'all' ||
    kind !== 'all' ||
    selectedOnly ||
    supportFilter !== 'all' ||
    actionFilter !== 'all' ||
    scopeFilter !== 'all';
  let visible = 0;
  let visibleGroups = 0;
  for (const row of rows) {
    const match =
      (clusterFilter === 'all' || row.cluster.data.id === clusterFilter) &&
      (supportFilter === 'all' ||
        row.data.assessment.support === supportFilter) &&
      (actionFilter === 'all' || row.data.assessment.action === actionFilter) &&
      (scopeFilter === 'all' || row.planning?.scope === scopeFilter) &&
      tokens.every((token) => row.hay.includes(token)) &&
      (!selectedOnly || selected.has(row.id));
    if (match) {
      counts.all++;
      counts[row.data.kind]++;
    }
    const show = match && (kind === 'all' || row.data.kind === kind);
    row.el.hidden = !show;
    if (show) visible++;
  }
  for (const group of groups) {
    const count = group.rows.filter((row) => !row.el.hidden).length;
    group.el.hidden = !count;
    if (!count) group.el.open = false;
    if (count) {
      visibleGroups++;
    }
    $('.group-count span', group.el).textContent = count;
  }
  if (filtering && revealGroups)
    openGroup(groups.find((group) => !group.el.hidden));
  for (const cluster of clusters) {
    const visibleGroups = cluster.groups.filter((group) => !group.el.hidden);
    cluster.el.hidden = !visibleGroups.length;
    $('.cluster-groups', cluster.el).textContent = visibleGroups.length;
    $('.cluster-items', cluster.el).textContent = visibleGroups.reduce(
      (sum, group) => sum + group.rows.filter((row) => !row.el.hidden).length,
      0,
    );
  }
  for (const button of $$('.filter')) {
    $('.count', button).textContent = counts[button.dataset.kind];
    button.setAttribute('aria-pressed', String(button.dataset.kind === kind));
  }
  for (const button of $$('button[data-support]'))
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.support === supportFilter),
    );
  for (const button of $$('button[data-action]'))
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.action === actionFilter),
    );
  for (const button of $$('button[data-scope-filter]'))
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.scopeFilter === scopeFilter),
    );
  $('#roadmap-filter-status').textContent = [
    supportFilter === 'all'
      ? messages.allSupport
      : data.roadmap.supportLabels[supportFilter],
    actionFilter === 'all'
      ? messages.allActions
      : data.roadmap.actionLabels[actionFilter],
    ...(scopeFilter === 'all' ? [] : [data.review.scopeLabels[scopeFilter]]),
  ].join(' · ');
  status.textContent = message('visibleStatus', {
    visible,
    total: rows.length,
    groups: visibleGroups,
  });
  $('#empty').hidden = Boolean(visible);
  $('#clear-search').hidden = !search.value;
  $('#select-visible').disabled =
    !visible ||
    rows.filter((row) => !row.el.hidden).every((row) => selected.has(row.id));
  $('#selected-only').setAttribute('aria-pressed', String(selectedOnly));
  selectionStatus();
  syncGroupToggle();
  updateSticky();
}
function reset() {
  search.value = '';
  clusterFilter = 'all';
  supportFilter = 'all';
  actionFilter = 'all';
  scopeFilter = 'all';
  $('[name=cluster][value=all]').checked = true;
  $('#cluster-value').textContent = messages.allClusters;
  kind = 'all';
  selectedOnly = false;
  apply();
}
function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.hidden = false;
  clearTimeout(timer);
  timer = setTimeout(() => {
    element.hidden = true;
  }, 4000);
}
function jump(target) {
  const element = document.getElementById(target);
  if (!element) return;
  if (element.closest('[hidden]')) reset();
  const group = element.closest('.group');
  if (group) openGroup(group);
  else if (element.tagName === 'DETAILS') element.open = true;
  syncGroupToggle();
  element.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth',
    block: 'start',
  });
  if (element.matches('.group'))
    $('summary', element).focus({ preventScroll: true });
  else if (element.matches('.feature'))
    $('.feature-check', element).focus({ preventScroll: true });
  try {
    history.replaceState(null, '', '#' + target);
  } catch {
    /* Content stays available without History access. */
  }
}
for (const row of rows) {
  row.input.disabled = false;
  row.input.addEventListener('change', () => {
    if (row.input.checked) selected.add(row.id);
    else selected.delete(row.id);
    save();
    const hadFocus = document.activeElement === row.input;
    apply();
    if (hadFocus && row.el.hidden) {
      const next = rows.find((candidate) => !candidate.el.hidden);
      if (next) openGroup(next.group);
      (next?.input || $('#selected-only')).focus({ preventScroll: true });
    }
  });
}
for (const button of $$('.filter'))
  button.addEventListener('click', () => {
    kind = button.dataset.kind;
    apply({ revealGroups: true });
  });
for (const button of $$('button[data-support]'))
  button.addEventListener('click', () => {
    supportFilter = button.dataset.support;
    apply({ revealGroups: true });
  });
for (const button of $$('button[data-action]'))
  button.addEventListener('click', () => {
    actionFilter = button.dataset.action;
    apply({ revealGroups: true });
  });
for (const button of $$('button[data-scope-filter]'))
  button.addEventListener('click', () => {
    scopeFilter = button.dataset.scopeFilter;
    apply({ revealGroups: true });
  });
search.addEventListener('input', () => apply({ revealGroups: true }));
for (const input of $$('[name=cluster]'))
  input.addEventListener('change', () => {
    clusterFilter = input.value;
    $('#cluster-value').textContent = input.nextElementSibling.textContent;
    picker.open = false;
    apply({ revealGroups: true });
    $('summary', picker).focus({ preventScroll: true });
  });
picker.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && picker.open) {
    event.preventDefault();
    picker.open = false;
    $('summary', picker).focus();
  }
});
document.addEventListener('click', (event) => {
  if (!picker.contains(event.target)) picker.open = false;
});
$('#clear-search').addEventListener('click', () => {
  search.value = '';
  apply();
  search.focus();
});
$('#reset-empty').addEventListener('click', () => {
  reset();
  search.focus();
});
$('#reset-all').addEventListener('click', reset);
$('#select-visible').addEventListener('click', () => {
  for (const row of rows) if (!row.el.hidden) selected.add(row.id);
  save();
  apply();
  toast(messages.matchingSelected);
});
$('#clear-selection').addEventListener('click', () => {
  selected.clear();
  save();
  apply();
  (selectedOnly ? $('#selected-only') : $('#select-visible')).focus({
    preventScroll: true,
  });
  toast(messages.selectionCleared);
});
$('#selected-only').addEventListener('click', () => {
  selectedOnly = !selectedOnly;
  apply({ revealGroups: true });
});
$('#toggle-relations').addEventListener('click', function () {
  const hidden = document.body.classList.toggle('relations-hidden');
  this.setAttribute('aria-pressed', String(!hidden));
  this.textContent = hidden ? messages.relationsShow : messages.relationsShown;
  updateSticky();
});
$('#toggle-original').addEventListener('click', function () {
  const show = document.body.classList.toggle('show-original');
  this.setAttribute('aria-pressed', String(show));
  this.textContent = show ? messages.originalShown : messages.originalShow;
  updateSticky();
});
$('#collapse-all').addEventListener('click', function () {
  for (const group of groups) group.el.open = false;
  syncGroupToggle();
});
for (const group of groups)
  group.el.addEventListener('toggle', () => {
    if (group.el.open && !printState) openGroup(group);
    else syncGroupToggle();
  });
for (const anchor of $$('[data-jump]'))
  anchor.addEventListener('click', (event) => {
    event.preventDefault();
    jump(anchor.dataset.jump);
  });
for (const anchor of $$('[data-source]'))
  anchor.addEventListener('click', (event) => {
    event.preventDefault();
    $('#sources').open = true;
    const element = $('#source-' + anchor.dataset.source);
    element.scrollIntoView({ block: 'center' });
    $('a', element).focus({ preventScroll: true });
  });
function download(text, filename, mime) {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
$('#export-selected').addEventListener('click', () => {
  if (!selected.size) return;
  const payload = buildSelection(data, selected);
  const format = $('[name=export-format]:checked').value;
  const output = serializeExport(payload, format);
  download(output.text, `saas-secim.${output.extension}`, output.mime);
  toast(
    message('exported', {
      count: payload.selectedCount,
      format: data.messages.export.formatNames[format],
    }),
  );
});
$('#print').addEventListener('click', () => window.print());
window.addEventListener('beforeprint', () => {
  if (printState) return;
  printState = [
    $('#context-details'),
    ...($('#scope-review') ? [$('#scope-review')] : []),
    ...groups.map((group) => group.el),
  ].map((element) => ({
    element,
    open: element.open,
    name: element.getAttribute('name'),
  }));
  for (const { element } of printState) element.removeAttribute('name');
  for (const { element } of printState) element.open = true;
});
window.addEventListener('afterprint', () => {
  if (printState) {
    printState.forEach(({ element, open }) => {
      element.open = open;
    });
    printState.forEach(({ element, name }) => {
      if (name !== null) element.setAttribute('name', name);
    });
  }
  printState = undefined;
  syncGroupToggle();
});
function updateSticky() {
  const toolbar = $('.toolbar');
  const fraction = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--sticky-max-fraction',
    ),
  );
  toolbar.classList.toggle(
    'is-static',
    toolbar.getBoundingClientRect().height > window.innerHeight * fraction,
  );
  const value =
    getComputedStyle(toolbar).position === 'sticky'
      ? toolbar.getBoundingClientRect().height
      : 0;
  document.documentElement.style.setProperty('--sticky', `${value}px`);
}
window.addEventListener('resize', updateSticky);
if ('ResizeObserver' in window)
  new ResizeObserver(updateSticky).observe($('.toolbar'));
let activeFrame = false;
window.addEventListener(
  'scroll',
  () => {
    if (activeFrame) return;
    activeFrame = true;
    requestAnimationFrame(() => {
      activeFrame = false;
      const offset =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--sticky',
          ),
        ) || 0;
      const visible = clusters.filter((cluster) => !cluster.el.hidden);
      let active = visible[0];
      for (const cluster of visible)
        if (cluster.el.getBoundingClientRect().top <= offset + 120)
          active = cluster;
      for (const anchor of $$('[data-nav]')) {
        if (active && anchor.dataset.nav === active.data.id)
          anchor.setAttribute('aria-current', 'true');
        else anchor.removeAttribute('aria-current');
      }
    });
  },
  { passive: true },
);
for (const control of $$('[data-content-pending]')) {
  control.disabled = false;
  control.removeAttribute('data-content-pending');
}
apply();
if (location.hash) requestAnimationFrame(() => jump(location.hash.slice(1)));
