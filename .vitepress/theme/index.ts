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
  async enhanceApp({ app, router }) {
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
