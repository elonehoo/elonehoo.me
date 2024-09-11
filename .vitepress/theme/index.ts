import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import type { EnhanceAppContext } from 'vitepress'
import { install } from '~/demos'
import Layout from './layout/index.vue'
import '@shikijs/twoslash/style-rich.css'

import '@shikijs/vitepress-twoslash/style.css'
import 'floating-vue/dist/style.css'

import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'

import 'markdown-it-github-alerts/styles/github-colors-dark-media.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import './styles/main.css'

import './styles/article.css'
import './styles/transformers.css'

export default {
  Layout,
  async enhanceApp({ app, router }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
    install(app)
    if (!import.meta.env.SSR) {
      const NProgress = await import('nprogress')
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }
      router.onBeforePageLoad = () => {
        NProgress.done()
      }
    }
  },
}
