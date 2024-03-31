import type { Theme } from 'vitepress'
import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-media.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import './styles/main.css'
import './styles/article.css'
import Layout from './layout/index.vue'
import { install } from '~/demos'

export default {
  Layout,
  enhanceApp({ app }) {
    install(app)
  },
} satisfies Theme
