import type { Config as ThemeConfig } from '../src'
import { mergeConfig } from 'vite'
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '../src/vitepress/config/baseConfig'

import ViteConfig from '../vite.config'
import { nav } from './nav'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  title: 'Elone Hoo',

  description: 'i hope every sunny afternoon can be wasted.',

  lang: 'en-US',

  vite: mergeConfig(ViteConfig, {}),

  srcDir: 'content',

  appearance: false,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  outDir: './dist',

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    headers: {
      level: [2, 3],
    },
  },

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
    ],
    subscribeLinks: [
      {
        icon: 'Follow',
        link: 'https://app.follow.is/profile/@elonehoo',
      },
      {
        icon: 'RSS',
        link: '/rss.xml',
      },
    ],

    footer: {
      license: {
        text: 'CC BY-NC-SA 4.0',
        link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      },
      copyright: '2022-PRESENT © Elone Hoo',
      page: {
        slogan: {
          content: '我希望每一个有阳光的下午都允许被浪费，用来晒晒枕头下的梦想',
          author: 'Elone Hoo',
        },
        briefly: '一个热爱开源，但是工作效率很低、水平很差的码农',
      },
    },
  },
})
