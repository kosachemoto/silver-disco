import { createHash } from 'crypto';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import fs from 'node:fs';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), {
      name: "generate-404",
      closeBundle() {
        const distDir = path.resolve(__dirname, "dist");
        const indexPath = path.join(distDir, "index.html");
        const notFoundPath = path.join(distDir, "404.html");
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      },
    },],
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

        if (element.startsWith('root_')) {
          return `${block}${element.substring(4)}--${hash}`;
        }

        if (element !== 'root') {
          return `${block}__${element}--${hash}`;
        }

        return `${block}--${hash}`;
      }
    }
  },
  base: 'silver-disco'
});
