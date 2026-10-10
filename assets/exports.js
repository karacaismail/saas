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

function assessmentLabel(labels, value) {
  // Unknown future codes remain visible rather than becoming an empty or
  // misleadingly positive label in a roadmap export.
  return labels && Object.hasOwn(labels, value) ? labels[value] : (value ?? '');
}

/** Return only selected source items, retaining the atlas hierarchy and order. */
export function buildSelection(data, selectedIds = []) {
  const copy = messages();
  const selected = new Set(selectedIds);
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
        items.push(exportedItem);
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
    schemaVersion: data.roadmap ? 2 : 1,
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
            assessmentLabel(roadmap.confidenceLabels, assessment.confidence),
            assessment.note ?? '',
            assessment.acceptance ?? '',
            (assessment.sources ?? [])
              .map((source) => `${source.title} — ${source.url}`)
              .join('\n'),
            cluster.phase ?? '',
            cluster.roadmapOrder ?? '',
          );
        }
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
    [
      copy.confidence,
      assessmentLabel(roadmap.confidenceLabels, assessment.confidence),
    ],
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
        if (roadmap && item.assessment) {
          lines.push(...markdownAssessment(item.assessment, roadmap));
        }
      }
    }
  }

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
