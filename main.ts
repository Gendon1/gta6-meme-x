import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { isAbsolute, resolve } from 'node:path';

try {
  const botDirectory = resolve(process.env.MAKEFUN_BOT_DIR ?? '.');
  const outputPath = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';
  const outputDirectory = isAbsolute(outputPath)
    ? resolve(outputPath)
    : resolve(botDirectory, outputPath);

  const post = readFileSync(resolve(botDirectory, 'POST.json'));
  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(resolve(outputDirectory, 'POST.json'), post);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
