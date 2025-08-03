import { createHash } from 'crypto';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      generateScopedName: function(element, filename) {
        const block = path.basename(filename, '.module.css');
        const hash = createHash('sha256').update(filename).digest('hex').slice(0, 5);

        return element === 'root' ? `${block}--${hash}` : `${block}__${element}--${hash}`;
      }
    }
  }
});
