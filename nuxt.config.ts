export default defineNuxtConfig({
  // @see https://github.com/unocss/unocss/issues/3468#issuecomment-1871049463
  features: {
    inlineStyles: false,
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    '@nuxt/content',
    'nuxt-icon',
    'nuxt-rss',
  ],

  components: {
    global: true,
    dirs: [
      '~/components',
    ],
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/main.css',
    '~/styles/markdown.css',
    '~/styles/prose.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
  },

  feed: {
    sources: [
      {
        path: '/rss.xml',
        type: 'rss2',
        cacheTime: 60 * 15,
      },
    ],
  },
  alias: {
    'micromark/lib/preprocess.js': 'micromark',
    'micromark/lib/postprocess.js': 'micromark',
  },
})
