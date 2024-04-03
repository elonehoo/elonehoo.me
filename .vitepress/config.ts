import { defineConfigWithTheme } from 'vitepress'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
import { slugify } from './script/slugify'
import { genFeed } from './script/rss'

export default defineConfigWithTheme({
  title: 'Elone Hoo',
  appearance: false,
  lastUpdated: true,
  cleanUrls: true,
  outDir: './dist',
  markdown: {
    theme: 'vitesse-dark',
    config(md) {
      md.use(MarkdownItGitHubAlerts)
    },
    toc: {
      slugify,
      level: [1, 2, 3, 4],
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/logo/dark.svg' }],
    ['script', {}, `(function() {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const setting = localStorage.getItem('color-schema') || 'auto'
      if (setting === 'dark' || (prefersDark && setting !== 'light'))
        document.documentElement.classList.toggle('dark', true)
    })()`],
  ],
  themeConfig: {
    nav: [
      {
        text: 'Blog',
        link: '/posts',
        autoShow: true,
        icon: {
          show: false,
          name: 'i-ri-article-line',
        },
      },
      { text: 'Talks', link: '/talks', autoShow: false },
      {
        text: 'Projects',
        link: '/projects',
        autoShow: true,
        icon: {
          show: false,
          name: 'i-ri-lightbulb-line',
        },
      },
      {
        text: 'Demos',
        link: '/demos',
        autoShow: true,
        icon: {
          show: false,
          name: 'i-ri-screenshot-line',
        },
      },
      {
        text: 'Gallery',
        link: '/gallery',
        autoShow: true,
        icon: {
          show: false,
          name: 'i-ri-gallery-line',
        },
      },
      {
        text: 'Bookmarks',
        link: '/bookmarks',
        autoShow: true,
        icon: { show: true, name: 'i-ri-bookmark-line' },
      },
      {
        text: 'Notes',
        link: '/notes',
        autoShow: false,
        icon: { show: true, name: 'i-ri-sticky-note-line' },
      },
      // {
      //   text: '友链',
      //   link: '/friend-links',
      //   autoShow: true,
      //   icon: { show: true, name: 'i-ri-group-line' },
      // },
      {
        text: 'X',
        link: 'https://x.com/elonehoo',
        icon: {
          show: true,
          name: 'i-ri-twitter-x-line',
        },
      },
      {
        text: 'Github',
        link: 'https://github.com/elonehoo',
        icon: {
          show: true,
          name: 'i-ri-github-line',
        },
      },
      {
        text: 'rss',
        link: 'https://elonehoo.me/feed.rss',
        icon: {
          show: true,
          name: 'i-la-rss-square',
        },
      },
    ],
  },
  buildEnd: genFeed,
})
