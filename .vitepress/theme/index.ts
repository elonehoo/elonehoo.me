import { h } from 'vue'
import { VPTheme } from '~/index'

import '@unocss/reset/tailwind.css'
import 'uno.css'

export default {
  ...VPTheme,
  Layout() {
    return h(VPTheme.Layout!, null, {})
  },
}
