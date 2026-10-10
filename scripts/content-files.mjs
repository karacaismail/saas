import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { assembleAtlas } from '../assets/content-engine.js';

export async function readContentSources(directory = process.cwd()) {
  const root = resolve(directory, 'data');
  const read = async (path) => {
    if (
      typeof path !== 'string' ||
      !/^\.\/[a-z0-9/.-]+\.json$/.test(path) ||
      path.includes('..')
    )
      throw new TypeError('Invalid content file path');
    const file = resolve(root, path);
    if (!file.startsWith(root + sep))
      throw new TypeError('Invalid content location');
    return JSON.parse(await readFile(file, 'utf8'));
  };
  const manifest = await read('./manifest.json');
  if (
    manifest.version !== 1 ||
    !Array.isArray(manifest.clusters) ||
    manifest.clusters.length !== 12
  )
    throw new TypeError('Invalid content manifest');
  const paths = [
    manifest.metadata,
    manifest.roadmap,
    manifest.interface,
    manifest.messages,
    ...manifest.clusters,
  ];
  if (new Set(paths).size !== paths.length)
    throw new TypeError('Duplicate content file');
  const [metadata, roadmap, copy, messages, ...clusters] = await Promise.all(
    paths.map(read),
  );
  return assembleAtlas({
    metadata,
    roadmap,
    interface: copy,
    messages,
    clusters,
  });
}
