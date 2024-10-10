import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme({
  title: 'Elone Hoo',
  description: 'i hope every sunny afternoon can be wasted.',
  lang: 'en-US',
  srcDir: 'content',
  appearance: false,
  lastUpdated: true,
  cleanUrls: true,
  outDir: './dist',
})
