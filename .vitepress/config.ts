import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme({
  title: 'Elone Hoo',
  appearance: false,
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    theme: 'vitesse-dark',
  },
  head: [
    ['link', { rel: 'icon', href: '/logo/dark.svg' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Blog', link: '/posts' },
      { text: 'Talks', link: '/talks' },
      { text: 'Projects', link: '/projects' },
      { text: 'Demos', link: '/demos' },
      { text: 'Gallery', link: '/gallery' },
      { text: 'Bookmarks', link: '/bookmarks', icon: { name: 'bookmark' } },
      { text: 'Notes', link: '/notes', icon: { name: 'sticky-note' } },
      { text: '友链', link: '/friend-links', icon: { name: 'group' } },
      {
        text: 'X',
        link: 'https://x.com/elonehoo',
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>',
        },
      },
      {
        text: 'Github',
        link: 'https://github.com/elonehoo',
        icon: {
          name: 'github',
        },
      },
    ],
  },
})
