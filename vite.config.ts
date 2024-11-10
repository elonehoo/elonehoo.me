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
      '@/': `${path.resolve(__dirname, 'theme')}/`,
    },
  },
  plugins: [
    Component({
      include: [/\.vue/, /\.md/],
      dirs: [
        '../.vitepress/theme/components',
        '../.vitepress/components',
        '../.vitepress/demos',
        '../theme/components',
        '../pages',
      ],
      dts: '../.vitepress/components.d.ts',
      directoryAsNamespace: true,
    }),
    AutoImport({
      dirs: [
        '../.vitepress/composables',
        '../theme/composables',
      ],
      imports: [
        'vue',
        'vitepress',
        '@vueuse/core',
        'vitest',
      ],
      dts: '../.vitepress/auto-imports.d.ts',
    }),
    Unocss(),
    VueDevTools(),
  ],
})
