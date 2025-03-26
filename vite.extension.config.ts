import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        background: 'src/extension/background.ts',
        'leetcode-tracker': 'src/extension/leetcode-tracker.ts',
        'site-blocker': 'src/extension/site-blocker.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});