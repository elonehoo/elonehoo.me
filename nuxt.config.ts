// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/content', 
    '@unocss/nuxt', 
    '@nuxt/eslint'
  ],
  devtools: { 
    enabled: true 
  },
  css: [
    '~/assets/css/index.css'
  ],
  eslint: {
    config: {
      standalone: false
    }
  }
})
