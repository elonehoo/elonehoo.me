import path from 'node:path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  optimizeDeps: {
    exclude: [
      '@vueuse/core',
      'vitepress',
      'matter-js',
      'three',
      '@vueuse/shared',
      'vue-demi',
    ],
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '~~/': `${path.resolve(__dirname, 'theme')}/`,
      '@/': `${path.resolve(__dirname, 'data')}/`,
    },
  },
  plugins: [
    Component({
      include: [/\.vue/, /\.md/],
      dirs: [
        '../.vitepress/demos',
        '../theme/components',
        '../theme/pages',
        '../theme/global',
      ],
      dts: '../components.d.ts',
      directoryAsNamespace: true,
    }),
    AutoImport({
      dirs: [
        '../theme/composables',
      ],
      imports: [
        'vue',
        'vitepress',
        '@vueuse/core',
        'vitest',
      ],
      dts: '../auto-imports.d.ts',
    }),
    Unocss(),
    VueDevTools(),
  ],
})
