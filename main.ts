import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const WORD = 'syzygy';

// The entry is exactly one word: the first word that came to mind.
// It is written with no trailing newline, so entry.txt holds 6 bytes:
// the word alone, nothing else, exactly as the brief requires.

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return resolve(fromEnv);
  }
  const flagIndex = process.argv.indexOf('--output');
  if (flagIndex >= 0 && process.argv[flagIndex + 1]) {
    return resolve(process.argv[flagIndex + 1]);
  }
  return '/output';
}

const outDir = resolveOutputDir();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), WORD, 'utf8');
