import { defineConfigWithTheme } from 'vitepress'

import ViteConfig from '../vite.config'

export default defineConfigWithTheme({
  title: 'Elone Hoo',

  description: 'i hope every sunny afternoon can be wasted.',

  lang: 'en-US',

  vite: ViteConfig,

  srcDir: 'content',
  appearance: false,
  lastUpdated: true,
  cleanUrls: true,
  outDir: './dist',
})
