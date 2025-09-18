import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/extra-small.ts', 'src/small.ts', 'src/medium.ts', 'src/large.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true
});
