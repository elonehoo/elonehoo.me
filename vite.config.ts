import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    Unocss(),
    VueDevTools(),
  ],
})
