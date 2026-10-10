import { buildSelection, serializeExport } from './exports.js';

const data = JSON.parse(document.getElementById('atlas-data').textContent);
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const storageKey = 'saas-atlas-selection-v1';
const search = $('#search');
const picker = $('#cluster-picker');
const status = $('#visible-status');
let kind = 'all';
let clusterFilter = 'all';
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
        el,
        input: $('.feature-check', el),
        group,
        cluster,
        hay: norm(
          [item.text, item.raw || '', g.title, g.id, c.title].join(' '),
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
  $('#selection-note').textContent =
    'Seçimler bu oturumda korunur; kalıcı saklama kullanılamıyor.';
}
function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...selected]));
  } catch {
    $('#selection-note').textContent =
      'Seçimler bu oturumda korunur; kalıcı saklama kullanılamıyor.';
  }
}
function selectionStatus() {
  $('#selection-count').textContent = `${selected.size} madde seçildi`;
  $('#clear-selection').disabled = !selected.size;
  $('#export-selected').disabled = !selected.size;
  for (const row of rows) row.input.checked = selected.has(row.id);
}
function apply() {
  const tokens = norm(search.value).split(' ').filter(Boolean);
  const counts = { all: 0, o: 0, g: 0, n: 0 };
  const filtering =
    tokens.length || clusterFilter !== 'all' || kind !== 'all' || selectedOnly;
  let visible = 0;
  let visibleGroups = 0;
  for (const row of rows) {
    const match =
      (clusterFilter === 'all' || row.cluster.data.id === clusterFilter) &&
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
    if (count) {
      visibleGroups++;
      if (filtering) group.el.open = true;
    }
    $('.group-count span', group.el).textContent = count;
  }
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
  status.textContent = `${visible} / ${rows.length} madde · ${visibleGroups} başlık`;
  $('#empty').hidden = Boolean(visible);
  $('#clear-search').hidden = !search.value;
  $('#select-visible').disabled =
    !visible ||
    rows.filter((row) => !row.el.hidden).every((row) => selected.has(row.id));
  $('#selected-only').setAttribute('aria-pressed', String(selectedOnly));
  selectionStatus();
  updateSticky();
}
function reset() {
  search.value = '';
  clusterFilter = 'all';
  $('[name=cluster][value=all]').checked = true;
  $('#cluster-value').textContent = 'Bütün kümeler';
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
  if (element.tagName === 'DETAILS') element.open = true;
  element.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth',
    block: 'start',
  });
  if (element.matches('.group'))
    $('summary', element).focus({ preventScroll: true });
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
      (next?.input || $('#selected-only')).focus({ preventScroll: true });
    }
  });
}
for (const button of $$('.filter'))
  button.addEventListener('click', () => {
    kind = button.dataset.kind;
    apply();
  });
search.addEventListener('input', apply);
for (const input of $$('[name=cluster]'))
  input.addEventListener('change', () => {
    clusterFilter = input.value;
    $('#cluster-value').textContent = input.nextElementSibling.textContent;
    picker.open = false;
    apply();
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
  toast('Görünen maddeler seçildi.');
});
$('#clear-selection').addEventListener('click', () => {
  selected.clear();
  save();
  apply();
  (selectedOnly ? $('#selected-only') : $('#select-visible')).focus({
    preventScroll: true,
  });
  toast('Seçim temizlendi.');
});
$('#selected-only').addEventListener('click', () => {
  selectedOnly = !selectedOnly;
  apply();
});
$('#toggle-relations').addEventListener('click', function () {
  const hidden = document.body.classList.toggle('relations-hidden');
  this.setAttribute('aria-pressed', String(!hidden));
  this.textContent = hidden ? 'İlişkileri göster' : 'İlişkiler açık';
  updateSticky();
});
$('#toggle-original').addEventListener('click', function () {
  const show = document.body.classList.toggle('show-original');
  this.setAttribute('aria-pressed', String(show));
  this.textContent = show ? 'Özgün ifadeler açık' : 'Özgün ifadeleri göster';
  updateSticky();
});
$('#collapse-all').addEventListener('click', function () {
  const visible = groups.filter((group) => !group.el.hidden);
  const collapse = visible.some((group) => group.el.open);
  for (const group of visible) group.el.open = !collapse;
  this.textContent = collapse ? 'Tüm başlıkları aç' : 'Başlıkları daralt';
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
    `${payload.selectedCount} seçili madde ${format === 'md' ? 'Markdown' : format.toUpperCase()} olarak dışa aktarıldı.`,
  );
});
$('#print').addEventListener('click', () => window.print());
window.addEventListener('beforeprint', () => {
  printState = groups.map((group) => group.el.open);
  for (const group of groups) group.el.open = true;
});
window.addEventListener('afterprint', () => {
  if (printState)
    groups.forEach((group, index) => {
      group.el.open = printState[index];
    });
  printState = undefined;
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
apply();
if (location.hash) requestAnimationFrame(() => jump(location.hash.slice(1)));
