export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    '@nuxt/content',
    'nuxt-icon'
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    classSuffix: '',
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
})
