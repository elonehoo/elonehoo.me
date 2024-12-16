import type { Config as ThemeConfig } from '../../src'
import { mergeConfig } from 'vite'
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '../../src/vitepress/config/baseConfig'

import ViteConfig from '../../vite.config'
import { genFeed } from '../plugins/rss'
import { head } from './head'
import { nav } from './nav'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  title: 'Elone Hoo',

  description: 'i hope every sunny afternoon can be wasted.',

  lang: 'en-US',

  vite: mergeConfig(ViteConfig, {}),

  srcDir: 'content',

  appearance: true,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  outDir: './dist',
  buildEnd: genFeed,

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    headers: {
      level: [2, 3],
    },
    image: {
      lazyLoading: true,
    },
  },

  head,

  themeConfig: {
    nav,

    socialLinks: [
      {
        icon: 'Email',
        link: 'mailto:hi@elonehoo.me',
      },
      {
        icon: 'GitHub',
        link: 'https://github.com/elonehoo',
      },
      {
        icon: 'Twitter',
        link: 'https://x.com/elonehoo',
      },
      {
        icon: 'Instagram',
        link: 'https://www.instagram.com/elonehoooo/',
      },
      {
        icon: 'Mastodon',
        link: 'https://elk.zone/mstdn.social/@elonehoo',
      },
      {
        icon: 'Follow',
        link: 'https://app.follow.is/profile/@elonehoo',
      },
      {
        icon: 'RSS',
        link: '/feed.rss',
      },
    ],

    footer: {
      license: {
        text: 'CC BY-NC-SA 4.0',
        link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      },
      copyright: '2022-PRESENT © Elone Hoo',
    },
  },
})
