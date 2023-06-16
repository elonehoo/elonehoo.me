
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-icon'
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/style/main.css',
    '~/style/markdown.css',
    '~/style/prose.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  unocss: {
    preflight: true,
  },
  content: {
    documentDriven: true,
    highlight:{
      theme:{
        default:'vitesse-light',
        dark: 'vitesse-dark'
      }
    },
  },
  vite:{
    optimizeDeps: {
      include: ['@vue/reactivity', '@vue/runtime-core', '@vue/shared','vue-router','slugify']
    }
  }
})
