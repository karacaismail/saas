const KIND_LABELS = Object.freeze({
  o: 'Özgün kapsam',
  g: 'Kapsam içi eksik',
  n: 'Yeni alan',
});

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
      clusters.push({ id: cluster.id, title: cluster.title, groups });
    }
  }

  return {
    schemaVersion: 1,
    title: 'SaaS özellik atlası',
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
  const lines = ['Küme no,Küme,Başlık no,Başlık,Madde no,Sınıf,Madde'];

  for (const cluster of payload.clusters) {
    for (const group of cluster.groups) {
      for (const item of group.items) {
        const ordinal = item.id.slice(item.id.lastIndexOf('-') + 1);
        lines.push(
          [
            cluster.id,
            cluster.title,
            group.num,
            group.title,
            `${group.num}.${ordinal}`,
            item.label,
            item.text,
          ]
            .map(csvCell)
            .join(','),
        );
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

function toMarkdown(payload) {
  const lines = [`# ${markdownText(payload.title)}`];

  for (const cluster of payload.clusters) {
    lines.push(
      '',
      `## ${markdownText(cluster.id)} · ${markdownText(cluster.title)}`,
    );
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
