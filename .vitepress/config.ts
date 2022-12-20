import { defineConfig } from 'vitepress'

export default defineConfig({
  title:'website',
  description:'My personal website',
  themeConfig:{
    logo:'/logo.svg'
  },
  head: [
    ['meta', { name: 'twitter:site', content: '@elonehoo' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://github.com/elonehoo.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
  ]
})
