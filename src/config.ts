export const navigation = [
  { text: '博客', link: '/posts' },
  { text: '分享', link: '/talks' },
  { text: '随笔', link: '/notes' },
  { text: '项目', link: '/projects' },
  { text: '小样', link: '/demos' },
  { text: '书签', link: '/bookmarks' },
] as const

export const socialLinks = [
  { label: 'Email', link: 'mailto:hi@elonehoo.me' },
  { label: 'GitHub', link: 'https://github.com/elonehoo' },
  { label: 'Twitter', link: 'https://x.com/elonehoo' },
  { label: 'Instagram', link: 'https://www.instagram.com/elonehoooo/' },
  { label: 'Mastodon', link: 'https://elk.zone/mstdn.social/@elonehoo' },
  { label: 'Follow', link: 'https://app.follow.is/profile/@elonehoo' },
] as const

export const siteConfig = {
  title: 'Elone Hoo',
  description: 'Elone Hoo\'s Portfolio',
  footer: {
    license: {
      text: 'CC BY-NC-SA 4.0',
      link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    copyright: '2022-PRESENT © Elone Hoo',
  },
} as const
