

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxt/eslint',
    'nuxt-studio'
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
  },
  studio: {
    i18n: {
      defaultLocale: 'zh',
    },
    repository: {
      provider: 'github',
      owner: 'elonehoo',
      repo: 'elonehoo.me',
      branch: 'dev'
    }
  },
  content: {
    build: {
      markdown: {
        // Object syntax can be used to override default options
        remarkPlugins: {
          'remark-gfm': {
            singleTilde: false,
          },
          'remark-supersub': {},
        },
      }
    }
  }
})
