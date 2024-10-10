import path from 'node:path'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  optimizeDeps: {
    // vitepress is aliased with replacement `join(DIST_CLIENT_PATH, '/index')`
    // This needs to be excluded from optimization
    exclude: ['@vueuse/core', 'vitepress', 'matter-js', 'three', '@vueuse/shared', 'vue-demi'],
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
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
    Unocss({
      rules: [
        [/^slide-enter-(\d+)$/, ([_, n]) => ({
          '--enter-stage': n,
        })],
      ],
      theme: {
        maxWidth: {
          main: '750px',
        },
        height: {
          header: '64px',
          footer: '50px',
        },
      },
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          warn: true,
          extraProperties: {
            'width': '1.23rem',
            'height': '1.23rem',
            'display': 'inline-block',
            'vertical-align': 'text-bottom',
          },
        }),
      ],
      transformers: [
        transformerVariantGroup(),
        transformerDirectives(),
      ],
      blocklist: ['me'],
      safelist: [
        'i-ri-sun-line',
        'i-ri-moon-line',
        'i-ri-github-line',
        'i-ri-discord-line',
        'i-ri-facebook-line',
        'i-ri-instagram-line',
        'i-ri-linkedin-line',
        'i-ri-mastodon-line',
        'i-ri-slack-line',
        'i-ri-twitter-line',
        'i-ri-youtube-line',
        'i-ri-zhihu-line',
        'i-ri-bilibili-line',
        'i-ri-bookmark-line',
        'i-ri-group-line',
        'i-ri-sticky-note-line',
        'i-ri-twitter-x-line',
        'i-ri-article-line',
        'i-ri-lightbulb-line',
        'i-ri-screenshot-line',
        'i-ri-gallery-line',
        'i-la-rss-square',
      ],
    }),
    VueDevTools(),
  ],
})
