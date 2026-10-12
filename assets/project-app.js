// Small progressive enhancement; all task pages and downloads already exist in HTML.
const configNode = document.getElementById('project-runtime');
if (configNode) {
  const config = JSON.parse(configNode.textContent);
  const copy = config.ui;
  const allowedIds = new Set(config.taskIds);
  const storageKey = 'saas-project-selection-v1';
  const status = document.getElementById('project-status');
  const selected = new Set();
  let persistent = true;
  let exporting = false;
  let page = 1;
  let pageTaskIds = new Set();
  const format = (pattern, values) =>
    pattern.replace(/\{(\w+)\}/g, (_match, key) => String(values[key]));
  const announce = (message) => {
    status.textContent = message;
  };
  const normalize = (value) => value.toLocaleLowerCase('tr').normalize('NFKC');
  const escape = (value) =>
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  const taskIndex = (config.taskIndex ?? []).map((task) => ({
    ...task,
    search: normalize(
      [
        task.id,
        task.title,
        task.summary,
        task.clusterTitle,
        task.artifactName,
        ...task.requirementIds,
      ].join(' '),
    ),
  }));
  const listRows = document.querySelector('[data-project-list-rows]');
  const tableRows = document.querySelector('[data-project-table-rows]');
  let renderedList = [...(listRows?.children ?? [])]
    .map((row) => row.dataset.taskRow)
    .join('|');
  let renderedTable = '';
  const href = (kind, id) => `${config.base}${kind}/${encodeURIComponent(id)}/`;
  const pill = (value, tone) =>
    `<span class="p-pill" data-tone="${escape(tone)}">${escape(value)}</span>`;
  const checkbox = (task, prefix) =>
    `<label class="p-task-select" for="${prefix}-${escape(task.id)}"><input type="checkbox" id="${prefix}-${escape(task.id)}" data-task-select="${escape(task.id)}" /><span class="p-sr-only">${escape(format(copy.selectTask, { title: task.title }))}</span></label>`;
  const rowData = (task) =>
    `data-task-row="${escape(task.id)}" data-cluster="${escape(task.clusterId)}" data-stage="${escape(task.stageId)}" data-layer="${escape(task.layer)}"`;
  const listRow = (task) =>
    `<li class="p-task-row" ${rowData(task)}>${checkbox(task, 'list')}<div class="p-task-identity"><span class="p-task-id">${escape(task.id)}</span><a class="p-task-title" href="${href('tasks', task.id)}">${escape(task.title)}</a><p>${escape(task.summary)}</p><a class="p-task-cluster" href="${href('clusters', task.clusterId)}">${escape(task.clusterTitle)}</a></div><div class="p-task-meta">${pill(task.stageTitle, 'stage')}${pill(task.artifactKind, task.layer)}${pill(copy.draft, 'draft')}<span class="p-artifact-name">${escape(task.artifactName)}</span></div></li>`;
  const tableRow = (task) =>
    `<tr ${rowData(task)}><td>${checkbox(task, 'table')}</td><th scope="row"><span class="p-task-id">${escape(task.id)}</span><a href="${href('tasks', task.id)}">${escape(task.title)}</a></th><td><a href="${href('clusters', task.clusterId)}">${escape(task.clusterTitle)}</a></td><td>${escape(task.artifactName)}</td><td>${escape(task.stageTitle)}</td><td>${pill(copy.draft, 'draft')}</td></tr>`;
  const search = document.getElementById('project-search');
  const selectedOnly = document.querySelector('[data-selected-only]');
  const selectionCount = document.getElementById('project-selection-count');
  const resultsCount = document.getElementById('project-results-count');
  const current = (name, fallback) =>
    document.querySelector(`input[name="${name}"]:checked`)?.value ?? fallback;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) {
      const ids = JSON.parse(stored);
      if (
        !Array.isArray(ids) ||
        ids.some((id) => typeof id !== 'string' || !allowedIds.has(id)) ||
        new Set(ids).size !== ids.length
      )
        throw new TypeError('Invalid project selection');
      for (const id of ids) selected.add(id);
    }
  } catch {
    persistent = false;
    announce(copy.storageUnavailable);
  }

  const save = () => {
    if (!persistent) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(config.taskIds.filter((id) => selected.has(id))),
      );
    } catch {
      persistent = false;
      announce(copy.storageUnavailable);
    }
  };

  function update() {
    const stage = current('project-stage', 'all');
    const layer = current('project-layer', 'all');
    const view = current('project-view', 'list');
    const query = normalize(search?.value.trim() ?? '');
    const matchingTasks = taskIndex.filter(
      (task) =>
        (stage === 'all' || task.stageId === stage) &&
        (layer === 'all' || task.layer === layer) &&
        (!query || task.search.includes(query)) &&
        (!selectedOnly?.checked || selected.has(task.id)),
    );
    const matching = new Set(matchingTasks.map((task) => task.id));
    const clusters = [...document.querySelectorAll('[data-cluster-card]')];
    const matchingClusters = clusters.filter((cluster) =>
      cluster.dataset.taskIds.split(' ').some((id) => matching.has(id)),
    );
    const pageSize =
      view === 'clusters'
        ? 12
        : config.route === 'home'
          ? 30
          : Math.max(1, taskIndex.length);
    const pages = Math.max(
      1,
      Math.ceil(
        (view === 'clusters' ? matchingClusters.length : matchingTasks.length) /
          pageSize,
      ),
    );
    page = Math.max(1, Math.min(page, pages));
    const pageClusters = new Set(
      matchingClusters.slice((page - 1) * pageSize, page * pageSize),
    );
    pageTaskIds =
      view === 'clusters'
        ? new Set(
            [...pageClusters].flatMap((cluster) =>
              cluster.dataset.taskIds
                .split(' ')
                .filter((id) => matching.has(id)),
            ),
          )
        : new Set(
            matchingTasks
              .slice((page - 1) * pageSize, page * pageSize)
              .map((task) => task.id),
          );
    const pageTasks =
      view === 'clusters'
        ? []
        : matchingTasks.filter((task) => pageTaskIds.has(task.id));
    const signature = pageTasks.map((task) => task.id).join('|');
    if (listRows && renderedList !== signature) {
      listRows.innerHTML = pageTasks.map(listRow).join('');
      renderedList = signature;
    }
    if (tableRows && view === 'table' && renderedTable !== signature) {
      tableRows.innerHTML = pageTasks.map(tableRow).join('');
      renderedTable = signature;
    }
    for (const control of document.querySelectorAll('[data-task-select]'))
      control.checked = selected.has(control.dataset.taskSelect);
    for (const panel of document.querySelectorAll('[data-project-view]'))
      panel.hidden = panel.dataset.projectView !== view;
    for (const cluster of clusters) cluster.hidden = !pageClusters.has(cluster);
    if (resultsCount)
      resultsCount.textContent = format(copy.resultsCount, {
        visible: matching.size,
        total: taskIndex.length,
      });
    if (selectionCount)
      selectionCount.textContent = format(copy.selectionCount, {
        count: selected.size,
      });
    const empty = document.getElementById('project-empty');
    if (empty) empty.hidden = matching.size > 0;
    for (const button of document.querySelectorAll('[data-export]'))
      button.disabled = exporting || selected.size === 0;
    const clear = document.querySelector('[data-clear-selection]');
    if (clear) clear.disabled = exporting || selected.size === 0;
    const selectVisible = document.querySelector('[data-select-visible]');
    if (selectVisible)
      selectVisible.disabled = exporting || pageTaskIds.size === 0;
    const pagination = document.querySelector('.p-pagination');
    if (pagination) pagination.hidden = pages <= 1;
    const pageCount = document.getElementById('project-page-count');
    if (pageCount)
      pageCount.textContent = format(copy.pageCount, { page, pages });
    const previous = document.querySelector('[data-previous-page]');
    const next = document.querySelector('[data-next-page]');
    if (previous) previous.disabled = page <= 1;
    if (next) next.disabled = page >= pages;
    observeText();
  }

  document.addEventListener('change', (event) => {
    const control = event.target.closest('[data-task-select]');
    if (!control || !allowedIds.has(control.dataset.taskSelect)) return;
    const hadFocus = document.activeElement === control;
    const panel =
      control.closest('[data-project-view]') ?? control.closest('#tasks');
    const position = panel
      ? [...panel.querySelectorAll('[data-task-select]')].indexOf(control)
      : 0;
    if (control.checked) selected.add(control.dataset.taskSelect);
    else selected.delete(control.dataset.taskSelect);
    save();
    update();
    if (hadFocus && !control.isConnected) {
      const remaining = panel
        ? [...panel.querySelectorAll('[data-task-select]')]
        : [];
      (
        remaining[Math.min(position, remaining.length - 1)] ??
        selectedOnly ??
        search
      )?.focus();
    }
  });
  const filter = () => {
    page = 1;
    update();
  };
  search?.addEventListener('input', filter);
  selectedOnly?.addEventListener('change', filter);
  for (const radio of document.querySelectorAll('input[name^="project-"]'))
    radio.addEventListener('change', filter);
  // WebKit can omit :focus-visible after native radio arrow navigation. Keep
  // the single indicator on the actual keyboard target; pointer input clears it.
  const filterRadio = (node) =>
    node instanceof Element &&
    node.matches('.p-radio-options input[type="radio"]');
  let radioKeyboardNavigation = false;
  document.addEventListener('keydown', (event) => {
    if (
      ![
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        ' ',
      ].includes(event.key)
    )
      return;
    radioKeyboardNavigation = true;
    if (filterRadio(event.target)) event.target.dataset.keyboardFocus = '';
  });
  document.addEventListener('focusin', (event) => {
    if (radioKeyboardNavigation && filterRadio(event.target))
      event.target.dataset.keyboardFocus = '';
  });
  document.addEventListener('focusout', (event) => {
    if (filterRadio(event.target))
      event.target.removeAttribute('data-keyboard-focus');
  });
  document.addEventListener('keyup', () => {
    radioKeyboardNavigation = false;
  });
  document.addEventListener('pointerdown', () => {
    radioKeyboardNavigation = false;
    for (const radio of document.querySelectorAll('[data-keyboard-focus]'))
      radio.removeAttribute('data-keyboard-focus');
  });
  document.addEventListener('keydown', (event) => {
    const region = event.target.closest(
      '.p-table-scroll,.p-task-title,.p-header h1,.p-artifact-name,.p-main h2,.p-main h3,.p-main p,.p-main dd,.p-breadcrumb [aria-current],.p-detail-section li:not(:has(*))',
    );
    if (
      !region ||
      event.target !== region ||
      event.shiftKey ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      !['ArrowLeft', 'ArrowRight'].includes(event.key) ||
      region.scrollWidth <= region.clientWidth
    )
      return;
    event.preventDefault();
    region.scrollBy({
      left: region.clientWidth * 0.75 * (event.key === 'ArrowRight' ? 1 : -1),
      behavior: 'instant',
    });
  });
  const textOverflow = new ResizeObserver((entries) => {
    for (const { target } of entries) {
      if (
        target.scrollWidth > target.clientWidth + 1 &&
        getComputedStyle(target).overflowX === 'auto'
      )
        target.tabIndex = 0;
      else target.removeAttribute('tabindex');
    }
  });
  const observeText = () => {
    textOverflow.disconnect();
    for (const node of document.querySelectorAll(
      '.p-header h1,.p-artifact-name,.p-main h2,.p-main h3,.p-main p,.p-main dd,.p-breadcrumb [aria-current],.p-detail-section li:not(:has(*))',
    ))
      textOverflow.observe(node);
  };
  document
    .querySelector('[data-previous-page]')
    ?.addEventListener('click', () => {
      page -= 1;
      update();
    });
  document.querySelector('[data-next-page]')?.addEventListener('click', () => {
    page += 1;
    update();
  });
  document
    .querySelector('[data-reset-filters]')
    ?.addEventListener('click', () => {
      search.value = '';
      selectedOnly.checked = false;
      for (const name of ['project-stage', 'project-layer'])
        document.querySelector(`input[name="${name}"][value="all"]`).checked =
          true;
      filter();
    });
  document
    .querySelector('[data-select-visible]')
    ?.addEventListener('click', () => {
      for (const id of pageTaskIds) selected.add(id);
      save();
      update();
    });
  document
    .querySelector('[data-clear-selection]')
    ?.addEventListener('click', () => {
      selected.clear();
      save();
      update();
      announce(copy.selectionCleared);
    });

  const download = (content, formatName, name) => {
    const blob = new Blob([content], {
      type:
        formatName === 'json'
          ? 'application/json;charset=utf-8'
          : 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const fetchText = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Task fetch: ${response.status}`);
    return response.text();
  };
  const fetchDocuments = async (ids, type) => {
    const documents = [];
    for (let index = 0; index < ids.length; index += 6) {
      const batch = ids.slice(index, index + 6);
      documents.push(
        ...(await Promise.all(
          batch.map((id) =>
            fetchText(
              `${config.base}tasks/${encodeURIComponent(id)}/task.${type}`,
            ),
          ),
        )),
      );
    }
    return documents;
  };
  const validatePacket = (packet, id) => {
    if (
      !/^[a-f0-9]{64}$/.test(config.projectRevision) ||
      packet.version !== 1 ||
      packet.task?.id !== id ||
      packet.sourceDigest !== config.sourceDigest ||
      packet.projectRevision !== config.projectRevision
    )
      throw new TypeError('Invalid task packet');
    return packet;
  };
  const markdownPacket = (document, id) => {
    const marker = document.match(
      config.planTaskId
        ? /<!-- saas-current-plan:start -->\n````json\n([\s\S]*?)\n````\n<!-- saas-current-plan:end -->/
        : /<!-- saas-task-packet:start -->\n````json\n([\s\S]*?)\n````\n<!-- saas-task-packet:end -->/,
    );
    if (!marker) throw new TypeError('Missing task packet');
    const packet = validatePacket(JSON.parse(marker[1]), id);
    if (config.planTaskId && packet.planId !== config.currentPlanId)
      throw new TypeError('Wrong current plan');
    return packet;
  };
  for (const button of document.querySelectorAll('[data-export]'))
    button.addEventListener('click', async () => {
      if (exporting || selected.size === 0) return;
      exporting = true;
      update();
      announce(copy.exportLoading);
      const ids = config.taskIds.filter((id) => selected.has(id));
      const type = button.dataset.export;
      try {
        const documents = await fetchDocuments(ids, type);
        let content;
        if (type === 'json') {
          const packets = documents.map((document, index) => {
            const packet = JSON.parse(document);
            return validatePacket(packet, ids[index]);
          });
          content = `${JSON.stringify({ version: 1, title: copy.bundleTitle, sourceDigest: config.sourceDigest, projectRevision: config.projectRevision, selectedTaskIds: ids, tasks: packets }, null, 2)}\n`;
        } else {
          documents.forEach((document, index) =>
            markdownPacket(document, ids[index]),
          );
          content = [`# ${copy.bundleTitle}`, ...documents].join('\n\n---\n\n');
        }
        download(content, type, `saas-tasks.${type}`);
        announce(
          format(copy.exportSuccess, {
            count: ids.length,
            format: type === 'json' ? copy.downloadJson : copy.downloadMarkdown,
          }),
        );
      } catch {
        announce(copy.exportFailure);
      } finally {
        exporting = false;
        update();
      }
    });

  const copyButton = document.querySelector('[data-copy-task]');
  const fallback = document.getElementById('project-copy-fallback');
  const fallbackText = document.getElementById('project-copy-text');
  copyButton?.addEventListener('click', async () => {
    copyButton.disabled = true;
    announce(copy.copyLoading);
    let content;
    try {
      const fetched = await fetchText('./task.md');
      markdownPacket(fetched, config.planTaskId ?? config.taskId);
      content = fetched;
      await navigator.clipboard.writeText(content);
      fallback.hidden = true;
      announce(copy.copySuccess);
    } catch {
      if (content !== undefined) {
        fallbackText.value = content;
        fallback.hidden = false;
        fallbackText.focus();
        fallbackText.select();
      }
      announce(copy.copyFailure);
    } finally {
      copyButton.disabled = false;
    }
  });
  document
    .querySelector('[data-close-fallback]')
    ?.addEventListener('click', () => {
      fallback.hidden = true;
      copyButton.focus();
    });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (fallback && !fallback.hidden) {
      fallback.hidden = true;
      copyButton.focus({ focusVisible: true });
      return;
    }
    const detail = document.activeElement?.closest('details[open]');
    if (detail) {
      detail.open = false;
      detail.querySelector('summary').focus();
    }
  });
  const applyHash = () => {
    if (
      config.route === 'home' &&
      /^(?:#cluster-\d+|#feature-[\w-]+|#development-plan)$/.test(location.hash)
    ) {
      location.replace(`${config.base}atlas/${location.hash}`);
      return;
    }
    if (location.hash === '#cluster-results') {
      const radio = document.querySelector(
        'input[name="project-view"][value="clusters"]',
      );
      if (radio) {
        radio.checked = true;
        update();
      }
    }
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      for (
        let parent = target.parentElement;
        parent;
        parent = parent.parentElement
      )
        if (parent instanceof HTMLDetailsElement) parent.open = true;
      if (target.classList.contains('p-gate'))
        target.querySelector('details').open = true;
    }
  };
  window.addEventListener('hashchange', applyHash);
  for (const control of document.querySelectorAll(
    '.p-filter-group, #project-search, [data-selected-only], [data-reset-filters], [data-task-select], [data-copy-task]',
  ))
    control.disabled = false;
  update();
  document.fonts.ready.then(observeText);
  applyHash();
}
