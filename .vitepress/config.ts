import type { Config as ThemeConfig } from '../src'
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '../src/vitepress/config/baseConfig'

import ViteConfig from '../vite.config'
import { nav } from './nav'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  title: 'Elone Hoo',

  description: 'i hope every sunny afternoon can be wasted.',

  lang: 'en-US',

  vite: ViteConfig,

  srcDir: 'content',

  appearance: false,
  lastUpdated: true,
  cleanUrls: true,

  outDir: './dist',

  themeConfig: {
    nav,
  },
})
