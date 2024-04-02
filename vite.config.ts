import path from 'node:path'
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Component from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  optimizeDeps: {
    // vitepress is aliased with replacement `join(DIST_CLIENT_PATH, '/index')`
    // This needs to be excluded from optimization
    exclude: ['@vueuse/core', 'vitepress', 'matter-js'],
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, '.vitepress')}/`,
    },
  },
  plugins: [
    Component({
      include: [/\.vue/, /\.md/],
      dirs: [
        '.vitepress/theme/components',
        '.vitepress/components',
        '.vitepress/demos',
      ],
      dts: '.vitepress/components.d.ts',
      directoryAsNamespace: true,
    }),
    AutoImport({
      dirs: [
        '.vitepress/composables',
      ],
      imports: [
        'vue',
        'vitepress',
        '@vueuse/core',
      ],
      dts: '.vitepress/auto-imports.d.ts',
    }),
    Unocss(),
    VueDevTools(),
  ],
})
