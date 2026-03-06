import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', type: 'image/png', href: '/me/favicon.png' }],
  ['script', {}, `(function() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const setting = localStorage.getItem('color-schema') || 'auto'
    if (setting === 'dark' || (prefersDark && setting !== 'light'))
      document.documentElement.classList.toggle('dark', true)
  })()`],
]
