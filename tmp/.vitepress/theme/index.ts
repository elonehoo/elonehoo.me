import { h } from 'vue'
import DefaultLayout from 'tmp/theme/layout/Default.vue'
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
