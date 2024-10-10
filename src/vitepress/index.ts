import type { Theme } from 'vitepress'
import App from './components/App.vue'
import { withConfigProvider } from './composables/config'

const VPTheme: Theme = {
  Layout: withConfigProvider(App),
}

export {
  VPTheme,
}

export type { Config } from './config'
