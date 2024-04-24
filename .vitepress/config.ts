import { defineConfigWithTheme } from 'vitepress'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
import { transformerMetaWordHighlight, transformerNotationWordHighlight } from '@shikijs/transformers'
import { defaultHoverInfoProcessor, transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { slugify } from './script/slugify'
import { genFeed } from './script/rss'
import { transformHead } from './meta/head'

export default defineConfigWithTheme({
  title: 'Elone Hoo',
  description: 'i hope every sunny afternoon can be wasted.',
  lang: 'en-US',
  appearance: false,
  lastUpdated: true,
  cleanUrls: true,
  outDir: './dist',
  markdown: {
    theme: 'vitesse-dark',
    config(md) {
      md.use(MarkdownItGitHubAlerts)
    },
    codeTransformers: [
      transformerMetaWordHighlight(),
      transformerNotationWordHighlight(),
      {
        // Render custom themes with codeblocks
        name: 'shiki:inline-theme',
        preprocess(code, options) {
          // @ts-expect-error anyway
          delete options.themes
          // @ts-expect-error anyway
          options.theme = 'vitesse-dark'
          return code
        },
      },
      {
        name: 'shiki:inline-decorations',
        preprocess(code, options) {
          const reg = /^\/\/ @decorations:(.*?)\n/
          code = code.replace(reg, (match, decorations) => {
            options.decorations ||= []
            options.decorations.push(...JSON.parse(decorations))
            return ''
          })
          return code
        },
      },
      transformerTwoslash({
        // errorRendering: 'hover',
        processHoverInfo(info) {
          return defaultHoverInfoProcessor(info)
            // Remove shiki_core namespace
            .replace(/_shikijs_core[\w_]*\./g, '')
        },
      }),
      {
        name: 'shiki:remove-escape',
        postprocess(code) {
          return code.replace(/\[\\\!code/g, '[!code')
        },
      },
    ],
    toc: {
      slugify,
      level: [1, 2, 3, 4],
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: 'https://elonehoo.me/logo/dark.svg', sizes: 'any', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: 'https://elonehoo.me/favicon.svg', sizes: '48x48' }],
    ['meta', { name: 'author', content: 'Elone Hoo' }],
    ['meta', { property: 'og:title', content: 'Elone Hoo Blog' }],
    ['meta', { property: 'og:description', content: 'I hope every sunny afternoon can be wasted.' }],
    ['meta', { name: 'X:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@elonehoo' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['link', { rel: 'apple-touch-icon', href: 'https://elonehoo.me/avatar.png', sizes: '180x180' }],

    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' }],
    ['script', {}, `(function() {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const setting = localStorage.getItem('color-schema') || 'auto'
      if (setting === 'dark' || (prefersDark && setting !== 'light'))
        document.documentElement.classList.toggle('dark', true)
    })()`],
  ],
  transformHead,
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
