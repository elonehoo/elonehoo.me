import { nav } from './app.nav.config'

export default defineAppConfig({
  config: {
    nav,
    socialLinks: [
      {
        icon: 'Email',
        link: 'mailto:hi@elonehoo.me',
      },
      {
        icon: 'GitHub',
        link: 'https://github.com/elonehoo',
      },
      {
        icon: 'Twitter',
        link: 'https://x.com/elonehoo',
      },
      {
        icon: 'Instagram',
        link: 'https://www.instagram.com/elonehoooo/',
      },
      {
        icon: 'Mastodon',
        link: 'https://elk.zone/mstdn.social/@elonehoo',
      },
      {
        icon: 'Follow',
        link: 'https://app.follow.is/profile/@elonehoo',
      },
    ],
    footer: {
      license: {
        text: 'CC BY-NC-SA 4.0',
        link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      },
      copyright: '2022-PRESENT © Elone Hoo',
    },
  },
})
