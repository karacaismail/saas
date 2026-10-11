import { resolvePlanning } from './content-engine.js';

let exportMessages;

/** Configure user-facing export copy from the content engine's JSON source. */
export function configureExportMessages(messages) {
  exportMessages = structuredClone(messages);
}

function messages() {
  if (!exportMessages) throw new TypeError('Missing export messages.');
  return exportMessages;
}

const ASSESSMENT_FIELDS = Object.freeze([
  'support',
  'action',
  'owner',
  'confidence',
  'note',
  'acceptance',
  'reviewedAt',
]);

function copyAssessment(assessment) {
  const result = {};
  for (const key of ASSESSMENT_FIELDS) {
    if (Object.hasOwn(assessment, key)) result[key] = assessment[key];
  }
  result.sources = (assessment.sources ?? []).map(({ title, url }) => ({
    title,
    url,
  }));
  return result;
}

function copyRoadmap(roadmap) {
  const result = {
    version: roadmap.version,
    reviewedAt: roadmap.reviewedAt,
    target: roadmap.target,
    baseline: roadmap.baseline,
    supportLabels: { ...roadmap.supportLabels },
    actionLabels: { ...roadmap.actionLabels },
    confidenceLabels: { ...roadmap.confidenceLabels },
  };
  if (Object.hasOwn(roadmap, 'sequence')) {
    result.sequence = roadmap.sequence.map((entry) => {
      const copied = {};
      for (const key of ['id', 'phase', 'rationale', 'dependsOn']) {
        if (Object.hasOwn(entry, key))
          copied[key] = structuredClone(entry[key]);
      }
      return copied;
    });
  }
  return result;
}

function copyReview(review, selectedIds) {
  const result = {
    version: review.version,
    reviewedAt: review.reviewedAt,
    scopeLabels: { ...review.scopeLabels },
    source: {
      title: review.source.title,
      itemCount: review.source.itemCount,
      clusterCount: review.source.clusterCount,
      documents: review.source.documents.map(({ name, sha256 }) => ({
        name,
        sha256,
      })),
    },
    decisions: review.decisions
      .filter((decision) => decision.itemIds.some((id) => selectedIds.has(id)))
      .map(({ id, kind, title, reason, itemIds }) => ({
        id,
        kind,
        title,
        reason,
        itemIds: [...itemIds],
      })),
  };
  const decisionIds = new Set(result.decisions.map((decision) => decision.id));
  const notes = Object.fromEntries(
    Object.entries(review.decisionNotes ?? {}).filter(([id]) =>
      decisionIds.has(id),
    ),
  );
  if (Object.keys(notes).length) result.decisionNotes = notes;
  return result;
}

function assessmentLabel(labels, value) {
  // Unknown future codes remain visible rather than becoming an empty or
  // misleadingly positive label in a roadmap export.
  return labels && Object.hasOwn(labels, value) ? labels[value] : (value ?? '');
}

function confidenceLabel(roadmap, assessment) {
  const label = assessmentLabel(
    roadmap.confidenceLabels,
    assessment.confidence,
  );
  return Object.hasOwn(assessment, 'reviewedAt')
    ? `${label} · ${assessment.reviewedAt}`
    : label;
}

/** Return only selected source items, retaining the atlas hierarchy and order. */
export function buildSelection(data, selectedIds = []) {
  const copy = messages();
  const selected = new Set(selectedIds);
  const exportedIds = new Set();
  const clusters = [];
  let selectedCount = 0;

  for (const cluster of data.clusters) {
    const groups = [];

    for (const group of cluster.groups) {
      const items = [];

      group.items.forEach((item, index) => {
        const id = `${group.id}-${index + 1}`;
        if (!selected.has(id)) return;

        const exportedItem = {
          id,
          kind: item.kind,
          label: assessmentLabel(copy.kindLabels, item.kind),
          text: item.text,
        };
        if (Object.prototype.hasOwnProperty.call(item, 'raw')) {
          exportedItem.raw = item.raw;
        }
        if (item.assessment) {
          exportedItem.assessment = copyAssessment(item.assessment);
        }
        if (data.review) {
          const planning = resolvePlanning(data.review, group.id, id);
          exportedItem.planning = {
            scope: planning.scope,
            label: planning.label,
            reason: planning.reason,
          };
        }
        items.push(exportedItem);
        exportedIds.add(id);
      });

      if (items.length > 0) {
        const exportedGroup = {
          id: group.id,
          num: group.num,
          title: group.title,
          items,
        };
        if (data.roadmap) {
          for (const key of ['owns', 'links', 'provides', 'sources']) {
            if (Object.hasOwn(group, key))
              exportedGroup[key] = structuredClone(group[key]);
          }
        }
        groups.push(exportedGroup);
        selectedCount += items.length;
      }
    }

    if (groups.length > 0) {
      const exportedCluster = { id: cluster.id, title: cluster.title, groups };
      if (data.roadmap) {
        for (const key of ['short', 'phase', 'roadmapOrder', 'rationale']) {
          if (Object.hasOwn(cluster, key)) exportedCluster[key] = cluster[key];
        }
        if (Object.hasOwn(cluster, 'dependsOn')) {
          exportedCluster.dependsOn = [...cluster.dependsOn];
        }
      }
      clusters.push(exportedCluster);
    }
  }

  const payload = {
    schemaVersion: data.review ? 3 : data.roadmap ? 2 : 1,
    title: copy.title,
    ...(data.roadmap ? { roadmap: copyRoadmap(data.roadmap) } : {}),
    selectedCount,
    clusters,
  };
  if (data.roadmap) {
    for (const key of ['generated', 'classification', 'sources']) {
      if (Object.hasOwn(data, key)) payload[key] = structuredClone(data[key]);
    }
  }
  if (data.review) payload.review = copyReview(data.review, exportedIds);
  if (data.componentCatalog) {
    const catalog = structuredClone(data.componentCatalog);
    catalog.sections = catalog.sections
      .map((section) => ({
        ...section,
        entries: section.entries
          .filter((entry) => entry.itemIds.some((id) => exportedIds.has(id)))
          .map((entry) => ({
            ...entry,
            itemIds: entry.itemIds.filter((id) => exportedIds.has(id)),
          })),
      }))
      .filter((section) => section.entries.length);
    if (catalog.sections.length) payload.componentCatalog = catalog;
  }
  if (data.developmentPlan && exportedIds.size) {
    const plan = structuredClone(data.developmentPlan);
    plan.assignments = plan.assignments.filter((a) =>
      exportedIds.has(a.itemId),
    );
    if (plan.assignments.length !== data.developmentPlan.assignments.length) {
      const primaryIds = new Set(plan.assignments.map((a) => a.unitId));
      const includedIds = new Set(primaryIds);
      const byId = new Map(plan.units.map((unit) => [unit.id, unit]));
      const includeDependencies = (id) => {
        for (const dependency of byId.get(id).dependsOn) {
          if (includedIds.has(dependency)) continue;
          includedIds.add(dependency);
          includeDependencies(dependency);
        }
      };
      for (const id of primaryIds) includeDependencies(id);
      plan.units = plan.units.filter((unit) => includedIds.has(unit.id));
      plan.contextUnitIds = plan.units
        .filter((unit) => !primaryIds.has(unit.id))
        .map((unit) => unit.id);
    }
    if (plan.assignments.length) payload.developmentPlan = plan;
  }
  return payload;
}

function csvCell(value) {
  const text = String(value);
  // Keep the original text intact after the apostrophe. Spreadsheet applications
  // otherwise interpret these prefixes as formulas, even after leading spaces.
  const safe = /^\s*[=+\-@\t\r\n]/u.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

function toCsv(payload) {
  const copy = messages().csv;
  const roadmap = payload.roadmap;
  const headers = [
    roadmap ? copy.clusterId : copy.clusterNumber,
    copy.cluster,
    copy.groupNumber,
    copy.group,
    copy.itemNumber,
    copy.kind,
    copy.item,
  ];
  if (roadmap) headers.push(...copy.roadmapColumns);
  if (payload.review) headers.push(...copy.reviewColumns);
  const lines = [headers.join(',')];

  for (const cluster of payload.clusters) {
    for (const group of cluster.groups) {
      for (const item of group.items) {
        const ordinal = item.id.slice(item.id.lastIndexOf('-') + 1);
        const fields = [
          cluster.id,
          cluster.title,
          group.num,
          group.title,
          `${group.num}.${ordinal}`,
          item.label,
          item.text,
        ];
        if (roadmap) {
          const assessment = item.assessment ?? {};
          fields.push(
            assessmentLabel(roadmap.supportLabels, assessment.support),
            assessmentLabel(roadmap.actionLabels, assessment.action),
            assessment.owner ?? '',
            confidenceLabel(roadmap, assessment),
            assessment.note ?? '',
            assessment.acceptance ?? '',
            (assessment.sources ?? [])
              .map((source) => `${source.title} — ${source.url}`)
              .join('\n'),
            cluster.phase ?? '',
            cluster.roadmapOrder ?? '',
          );
        }
        if (payload.review)
          fields.push(item.planning?.label ?? '', item.planning?.reason ?? '');
        lines.push(fields.map(csvCell).join(','));
      }
    }
  }

  return `\uFEFF${lines.join('\r\n')}\r\n`;
}

function markdownText(value) {
  return (
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replace(/[\\`*_{}[\]()#+.!|~=-]/g, '\\$&')
      // An untrusted newline must not introduce another heading or list item.
      // Character references retain the text without creating Markdown structure.
      .replaceAll('\r', '&#13;')
      .replaceAll('\n', '&#10;')
  );
}

function markdownSource(source) {
  const title = markdownText(source.title);
  try {
    const url = new URL(source.url);
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      const destination = url.href
        .replaceAll('(', '%28')
        .replaceAll(')', '%29')
        .replaceAll('\\', '%5C');
      return `[${title}](${destination})`;
    }
  } catch {
    // A malformed source is still evidence to retain, but not a clickable link.
  }
  return `${title} — ${markdownText(source.url)}`;
}

function markdownAssessment(assessment, roadmap) {
  const copy = messages().markdown;
  const fields = [
    [copy.support, assessmentLabel(roadmap.supportLabels, assessment.support)],
    [copy.action, assessmentLabel(roadmap.actionLabels, assessment.action)],
    [copy.owner, assessment.owner ?? ''],
    [copy.confidence, confidenceLabel(roadmap, assessment)],
    [copy.note, assessment.note ?? ''],
    [copy.acceptance, assessment.acceptance ?? ''],
  ];
  const lines = fields.map(
    ([label, value]) => `  - ${markdownText(label)}: ${markdownText(value)}`,
  );
  for (const source of assessment.sources ?? []) {
    lines.push(`  - ${markdownText(copy.source)}: ${markdownSource(source)}`);
  }
  return lines;
}

function markdownReview(review) {
  const copy = messages().markdown;
  const csv = messages().csv;
  const source = review.source;
  const lines = [
    '',
    `#### ${markdownText(copy.reviewSource)}`,
    '',
    `${markdownText(source.title)} · ${markdownText(source.itemCount)} ${markdownText(csv.item)} · ${markdownText(source.clusterCount)} ${markdownText(csv.cluster)}`,
    '',
    `${markdownText(copy.reviewedAt)}: ${markdownText(review.reviewedAt)}`,
    '',
    ...source.documents.map(
      ({ name, sha256 }) => `- ${markdownText(name)} · ${markdownText(sha256)}`,
    ),
  ];
  if (review.decisions.length) {
    lines.push('', `#### ${markdownText(copy.reviewDecisions)}`, '');
    for (const decision of review.decisions)
      lines.push(
        `- **${markdownText(decision.title)}** (${markdownText(decision.id)} · ${markdownText(decision.kind)}): ${review.decisionNotes?.[decision.id] ? `**${markdownText(review.decisionNotes[decision.id])}** ` : ''}${markdownText(decision.reason)}; ${decision.itemIds.map(markdownText).join(', ')}`,
      );
  }
  return lines;
}

function markdownCatalog(catalog) {
  const copy = catalog.labels;
  const lines = [
    '',
    `## ${markdownText(catalog.title)}`,
    '',
    markdownText(catalog.summary),
    '',
    markdownText(catalog.intro),
    '',
    `${markdownText(copy.source)}: ${markdownText(catalog.source.name)} · ${markdownText(catalog.source.sha256)} · ${markdownText(catalog.source.reviewedAt)}`,
    '',
    `### ${markdownText(copy.technology)}`,
    '',
  ];
  for (const entry of catalog.technologyDecisions)
    lines.push(
      `- **${markdownText(entry.title)}** (${markdownText(entry.id)}): ${markdownText(entry.description)}`,
    );
  for (const section of catalog.sections) {
    lines.push('', `### ${markdownText(section.title)}`, '');
    for (const entry of section.entries) {
      lines.push(
        `- **${markdownText(entry.title)}** (${markdownText(entry.id)})`,
        `  - ${markdownText(copy.need)}: ${markdownText(catalog.needLabels[entry.need])} (${markdownText(entry.need)})`,
      );
      for (const key of [
        'category',
        'description',
        'frappe',
        'work',
        'acceptance',
      ])
        lines.push(
          `  - ${markdownText(copy[key])}: ${markdownText(entry[key])}`,
        );
      lines.push(
        `  - ${markdownText(copy.itemIds)}: ${entry.itemIds.map(markdownText).join(', ')}`,
      );
    }
  }
  lines.push('', `### ${markdownText(copy.notes)}`, '');
  for (const paragraph of catalog.paragraphs)
    lines.push(`- ${markdownText(paragraph)}`);
  for (const source of catalog.sources)
    lines.push(`- ${markdownText(copy.source)}: ${markdownSource(source)}`);
  return lines;
}

function markdownDevelopmentPlan(plan, roadmap) {
  const copy = plan.labels;
  const lines = [
    '',
    `#### ${markdownText(plan.title)}`,
    '',
    markdownText(plan.intro),
    '',
  ];
  const field = (label, value) =>
    lines.push(`- **${markdownText(label)}:** ${markdownText(value)}`);
  const section = (title) => lines.push('', `##### ${markdownText(title)}`, '');
  const entry = (title, id) =>
    lines.push('', `###### ${markdownText(title)} (${markdownText(id)})`, '');
  const stages = new Map(plan.stages.map((stage) => [stage.id, stage.title]));
  const units = new Map(plan.units.map((unit) => [unit.id, unit.title]));
  field(copy.reviewedAt, plan.reviewedAt);
  section(copy.architecture);
  for (const item of plan.architecture) {
    entry(item.title, item.id);
    lines.push(markdownText(item.description), '');
    field(copy.acceptance, item.acceptance);
  }
  section(copy.stack);
  for (const item of plan.stack) {
    entry(item.title, item.id);
    lines.push(markdownText(item.decision), '');
    field(copy.scope, item.status);
  }
  section(copy.stages);
  for (const stage of plan.stages) {
    entry(stage.title, stage.id);
    field(copy.goal, stage.goal);
    field(copy.entry, stage.entry);
    field(copy.deliverables, stage.deliverables.join('; '));
    field(copy.exit, stage.exit.join('; '));
  }
  section(copy.units);
  for (const unit of plan.units) {
    entry(unit.title, unit.id);
    if (plan.contextUnitIds?.includes(unit.id))
      lines.push(`**${markdownText(copy.dependencyContext)}**`, '');
    field(copy.kind, `${plan.kindLabels[unit.kind]} (${unit.kind})`);
    field(copy.need, `${plan.needLabels[unit.need]} (${unit.need})`);
    field(copy.startsAt, stages.get(unit.startsAt));
    field(copy.targetStage, stages.get(unit.targetStage));
    for (const key of [
      'condition',
      'frappe',
      'customWork',
      'dataOwnership',
      'acceptance',
      'owner',
    ])
      field(copy[key], unit[key]);
    field(copy.contracts, unit.contracts.join('; '));
    field(
      copy.dependencies,
      unit.dependsOn.map((id) => `${units.get(id)} (${id})`).join('; '),
    );
  }
  section(copy.assignments);
  for (const a of plan.assignments) {
    entry(a.itemId, a.unitId);
    field(copy.units, units.get(a.unitId));
    field(copy.stage, `${stages.get(a.stageId)} (${a.stageId})`);
    field(copy.delivery, assessmentLabel(roadmap?.actionLabels, a.delivery));
    field(copy.reason, a.reason);
  }
  section(plan.maturity.title);
  lines.push(markdownText(plan.maturity.intro), '');
  for (const level of plan.maturity.levels) {
    entry(level.title, level.id);
    field(copy.definition, level.definition);
  }
  for (const dimension of plan.maturity.dimensions) {
    entry(dimension.title, dimension.id);
    field(copy.measurement, dimension.measurement);
    field(copy.evidence, dimension.evidence);
  }
  field(copy.acceptance, plan.maturity.gate);
  section(copy.decisions);
  for (const decision of plan.decisions) {
    entry(decision.title, decision.id);
    field(copy.stage, stages.get(decision.stageId));
    lines.push(markdownText(decision.description), '');
    field(copy.acceptance, decision.acceptance);
  }
  section(copy.sources);
  for (const source of plan.sources) lines.push(`- ${markdownSource(source)}`);
  return lines;
}

function toMarkdown(payload) {
  const copy = messages().markdown;
  const lines = [`# ${markdownText(payload.title)}`];
  const roadmap = payload.roadmap;
  if (roadmap) {
    lines.push(
      '',
      `${markdownText(copy.target)}: ${markdownText(roadmap.target)}`,
      '',
      `${markdownText(copy.reviewedAt)}: ${markdownText(roadmap.reviewedAt)}`,
      '',
      `${markdownText(copy.baseline)}: ${markdownText(roadmap.baseline)}`,
    );
    if (Object.hasOwn(payload, 'generated'))
      lines.push(
        '',
        `${markdownText(copy.generated)}: ${markdownText(payload.generated)}`,
      );
    if (payload.classification) {
      lines.push('', `#### ${markdownText(copy.classification)}`, '');
      for (const [kind, description] of Object.entries(payload.classification))
        lines.push(
          `- ${markdownText(kind)} · ${markdownText(assessmentLabel(messages().kindLabels, kind))}: ${markdownText(description)}`,
        );
    }
    if (roadmap.sequence?.length) {
      lines.push('', `#### ${markdownText(copy.sequence)}`, '');
      for (const entry of roadmap.sequence)
        lines.push(
          `- ${markdownText(entry.id)} · ${markdownText(entry.phase ?? '')}: ${markdownText(entry.rationale ?? '')}; ${markdownText(copy.dependsOn)}: ${(entry.dependsOn ?? []).map(markdownText).join(', ')}`,
        );
    }
    if (payload.sources) {
      lines.push('', `#### ${markdownText(copy.sourceRegistry)}`, '');
      for (const [id, [title, url]] of Object.entries(payload.sources))
        lines.push(`- ${markdownText(id)}: ${markdownSource({ title, url })}`);
    }
  }
  if (payload.review) lines.push(...markdownReview(payload.review));

  for (const cluster of payload.clusters) {
    lines.push(
      '',
      `## ${markdownText(cluster.id)} · ${markdownText(cluster.title)}`,
    );
    if (roadmap) {
      for (const [key, label] of [
        ['short', copy.short],
        ['phase', copy.phase],
        ['roadmapOrder', copy.roadmapOrder],
        ['rationale', copy.rationale],
      ]) {
        if (Object.hasOwn(cluster, key)) {
          lines.push(
            '',
            `${markdownText(label)}: ${markdownText(cluster[key])}`,
          );
        }
      }
      if (cluster.dependsOn?.length) {
        lines.push(
          '',
          `${markdownText(copy.dependsOn)}: ${cluster.dependsOn.map(markdownText).join(', ')}`,
        );
      }
    }
    for (const group of cluster.groups) {
      lines.push(
        '',
        `### ${markdownText(group.num)} ${markdownText(group.title)}`,
        '',
      );
      if (roadmap) {
        for (const key of ['owns', 'provides']) {
          if (Object.hasOwn(group, key))
            lines.push(
              `${markdownText(copy[key])}: ${markdownText(group[key])}`,
              '',
            );
        }
        if (group.links?.length)
          lines.push(
            `${markdownText(copy.links)}: ${group.links.map(([id, label]) => `${markdownText(id)} — ${markdownText(label)}`).join('; ')}`,
            '',
          );
        if (group.sources?.length)
          lines.push(
            `${markdownText(copy.sources)}: ${group.sources.map(markdownText).join(', ')}`,
            '',
          );
      }
      for (const item of group.items) {
        lines.push(
          `- [x] **${markdownText(item.label)}** ${markdownText(item.text)}`,
        );
        if (Object.hasOwn(item, 'raw'))
          lines.push(
            `  - ${markdownText(copy.raw)}: ${markdownText(item.raw)}`,
          );
        if (item.planning) {
          lines.push(
            `  - ${markdownText(copy.scope)}: ${markdownText(item.planning.label)}`,
            `  - ${markdownText(copy.scopeReason)}: ${markdownText(item.planning.reason)}`,
          );
        }
        if (roadmap && item.assessment) {
          lines.push(...markdownAssessment(item.assessment, roadmap));
        }
      }
    }
  }

  if (payload.componentCatalog)
    lines.push(...markdownCatalog(payload.componentCatalog));
  if (payload.developmentPlan)
    lines.push(...markdownDevelopmentPlan(payload.developmentPlan, roadmap));
  return `${lines.join('\n')}\n`;
}

/** Serialize a selection for a browser download without mutating its contents. */
export function serializeExport(payload, format) {
  switch (format) {
    case 'json':
      return {
        text: `${JSON.stringify(payload, null, 2)}\n`,
        mime: 'application/json;charset=utf-8',
        extension: 'json',
      };
    case 'csv':
      return {
        text: toCsv(payload),
        mime: 'text/csv;charset=utf-8',
        extension: 'csv',
      };
    case 'md':
      return {
        text: toMarkdown(payload),
        mime: 'text/markdown;charset=utf-8',
        extension: 'md',
      };
    default:
      throw new RangeError(
        messages().unsupportedFormat.replace('{format}', String(format)),
      );
  }
}
