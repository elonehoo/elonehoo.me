import { h } from 'vue'
import DefaultLayout from '~~/layout/Default.vue'
import { VPTheme } from '~/index'

import '@unocss/reset/tailwind.css'
import 'uno.css'

export default {
  ...VPTheme,
  Layout() {
    return h(VPTheme.Layout!, null, {
      default: () => h(DefaultLayout),
    })
  },
}
