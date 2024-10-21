import path from 'node:path'
import {
  presetAttributify,
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
        '../.vitepress/theme/components',
        '../.vitepress/components',
        '../.vitepress/demos',
      ],
      dts: '../.vitepress/components.d.ts',
      directoryAsNamespace: true,
    }),
    AutoImport({
      dirs: [
        '../.vitepress/composables',
      ],
      imports: [
        'vue',
        'vitepress',
        '@vueuse/core',
        'vitest',
      ],
      dts: '../.vitepress/auto-imports.d.ts',
    }),
    Unocss({
      theme: {
        colors: {
          main: 'hsl(var(--main))',
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))',
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
        },
        borderRadius: {
          xl: 'calc(var(--radius) + 4px)',
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
      },
      presets: [
        presetUno(),
        presetAttributify(),
      ],
      transformers: [
        transformerVariantGroup(),
        transformerDirectives(),
      ],
      blocklist: ['me'],
    }),
    VueDevTools(),
  ],
})
