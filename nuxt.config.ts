// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxt/eslint',
    'nuxt-studio',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
  ],
  devtools: {
    enabled: true,
  },
  css: [
    '~/assets/css/index.css',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  content: {
    renderer: {
      anchorLinks: true,
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'vitesse-light',
            // Theme used if `html.dark`
            dark: 'vitesse-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
        },
      },
    },
  },
  studio: {
    i18n: {
      defaultLocale: 'zh',
    },
    repository: {
      provider: 'github',
      owner: 'elonehoo',
      repo: 'elonehoo.me',
      branch: 'main',
    },
  },
})
