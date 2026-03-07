// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxt/eslint',
    'nuxt-studio',
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
    }
  },
  studio: {
    i18n: {
      defaultLocale: 'zh',
    },
    repository: {
      provider: 'github',
      owner: 'elonehoo',
      repo: 'elonehoo.me',
      branch: 'dev',
    },
  },
})
