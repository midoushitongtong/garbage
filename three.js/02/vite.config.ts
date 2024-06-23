import { fileURLToPath, URL } from 'node:url';
import glsl from 'vite-plugin-glsl';
import AutoImport from 'unplugin-auto-import/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    glsl(),
    // VueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['./src/apis/**'],
      dts: './auto-import.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
