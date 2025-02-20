import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueNamedExport from 'unplugin-vue-named-export/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueNamedExport()],
  resolve: {
    alias: [
      {
        find: /^#(.+)/,
        replacement: fileURLToPath(new URL('./src/$1', import.meta.url)),
      },
    ],
  },
  css: {
    modules: { localsConvention: 'camelCaseOnly' },
  },
});
