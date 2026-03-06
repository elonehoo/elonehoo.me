import type { Theme } from 'vitepress'
import { withConfigProvider } from './composables/config'
import App from './layout/App.vue'

import '../core/styles/index.css'

const VPTheme: Theme = {
  Layout: withConfigProvider(App),
}

export {
  VPTheme,
}

export type { Config } from './config'
