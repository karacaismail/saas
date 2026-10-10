const KIND_LABELS = Object.freeze({
  o: 'Özgün kapsam',
  g: 'Kapsam içi eksik',
  n: 'Yeni alan',
});

const ASSESSMENT_FIELDS = Object.freeze([
  'support',
  'action',
  'owner',
  'confidence',
  'note',
  'acceptance',
]);

const ROADMAP_COLUMNS = Object.freeze([
  'Frappe yeterliliği',
  'Yapılacak iş',
  'Sorumlu',
  'Kanıt durumu',
  'Değerlendirme',
  'Kabul ölçütü',
  'Kaynaklar',
  'Etap',
  'Küme sırası',
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
  return {
    version: roadmap.version,
    reviewedAt: roadmap.reviewedAt,
    target: roadmap.target,
    baseline: roadmap.baseline,
    supportLabels: { ...roadmap.supportLabels },
    actionLabels: { ...roadmap.actionLabels },
    confidenceLabels: { ...roadmap.confidenceLabels },
  };
}

function assessmentLabel(labels, value) {
  // Unknown future codes remain visible rather than becoming an empty or
  // misleadingly positive label in a roadmap export.
  return labels && Object.hasOwn(labels, value) ? labels[value] : (value ?? '');
}

/** Return only selected source items, retaining the atlas hierarchy and order. */
export function buildSelection(data, selectedIds = []) {
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
          label: KIND_LABELS[item.kind],
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
        groups.push({
          id: group.id,
          num: group.num,
          title: group.title,
          items,
        });
        selectedCount += items.length;
      }
    }

    if (groups.length > 0) {
      const exportedCluster = { id: cluster.id, title: cluster.title, groups };
      if (data.roadmap) {
        for (const key of ['phase', 'roadmapOrder', 'rationale']) {
          if (Object.hasOwn(cluster, key)) exportedCluster[key] = cluster[key];
        }
        if (Object.hasOwn(cluster, 'dependsOn')) {
          exportedCluster.dependsOn = [...cluster.dependsOn];
        }
      }
      clusters.push(exportedCluster);
    }
  }

  return {
    schemaVersion: data.roadmap ? 2 : 1,
    title: 'SaaS özellik atlası',
    ...(data.roadmap ? { roadmap: copyRoadmap(data.roadmap) } : {}),
    selectedCount,
    clusters,
  };
}

function csvCell(value) {
  const text = String(value);
  // Keep the original text intact after the apostrophe. Spreadsheet applications
  // otherwise interpret these prefixes as formulas, even after leading spaces.
  const safe = /^\s*[=+\-@\t\r\n]/u.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

function toCsv(payload) {
  const roadmap = payload.roadmap;
  const headers = [
    roadmap ? 'Küme kimliği' : 'Küme no',
    'Küme',
    'Başlık no',
    'Başlık',
    'Madde no',
    'Sınıf',
    'Madde',
  ];
  if (roadmap) headers.push(...ROADMAP_COLUMNS);
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
  const fields = [
    [
      'Frappe yeterliliği',
      assessmentLabel(roadmap.supportLabels, assessment.support),
    ],
    ['Yapılacak iş', assessmentLabel(roadmap.actionLabels, assessment.action)],
    ['Sorumlu', assessment.owner ?? ''],
    [
      'Kanıt durumu',
      assessmentLabel(roadmap.confidenceLabels, assessment.confidence),
    ],
    ['Değerlendirme', assessment.note ?? ''],
    ['Kabul ölçütü', assessment.acceptance ?? ''],
  ];
  const lines = fields.map(
    ([label, value]) => `  - ${label}: ${markdownText(value)}`,
  );
  for (const source of assessment.sources ?? []) {
    lines.push(`  - Kaynak: ${markdownSource(source)}`);
  }
  return lines;
}

function toMarkdown(payload) {
  const lines = [`# ${markdownText(payload.title)}`];
  const roadmap = payload.roadmap;
  if (roadmap) {
    lines.push(
      '',
      `Hedef: ${markdownText(roadmap.target)}`,
      '',
      `Değerlendirme tarihi: ${markdownText(roadmap.reviewedAt)}`,
      '',
      `Sürüm ve kanıt sınırı: ${markdownText(roadmap.baseline)}`,
    );
  }

  for (const cluster of payload.clusters) {
    lines.push(
      '',
      `## ${markdownText(cluster.id)} · ${markdownText(cluster.title)}`,
    );
    if (roadmap) {
      for (const [key, label] of [
        ['phase', 'Etap'],
        ['roadmapOrder', 'Yol haritası sırası'],
        ['rationale', 'Gerekçe'],
      ]) {
        if (Object.hasOwn(cluster, key)) {
          lines.push('', `${label}: ${markdownText(cluster[key])}`);
        }
      }
      if (cluster.dependsOn?.length) {
        lines.push(
          '',
          `Bağımlılıklar: ${cluster.dependsOn.map(markdownText).join(', ')}`,
        );
      }
    }
    for (const group of cluster.groups) {
      lines.push(
        '',
        `### ${markdownText(group.num)} ${markdownText(group.title)}`,
        '',
      );
      for (const item of group.items) {
        lines.push(
          `- [x] **${markdownText(item.label)}** ${markdownText(item.text)}`,
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
      throw new RangeError(`Desteklenmeyen dışa aktarma biçimi: ${format}`);
  }
}
