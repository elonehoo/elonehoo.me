import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Component from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Component({
      include: [/\.vue/, /\.md/],
      dirs: '.vitepress/theme/components',
      dts: '.vitepress/components.d.ts',
      directoryAsNamespace: true,
    }),
    Unocss(),
    VueDevTools(),
  ],
})
