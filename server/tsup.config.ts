import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/__tests__/**'],
  clean: true,
  format: ['esm'],
  outDir: 'dist',
})
