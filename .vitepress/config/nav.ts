import type { Config as ThemeConfig } from '../../src/index'

export const nav: ThemeConfig['nav'] = [
  {
    text: '存下我的心得与体会',
    items: [
      {
        text: '博客',
        link: '/posts',
        activeMatch: `^/(posts)`,
        icon: 'posts',
      },
      {
        text: '分享',
        link: '/talks',
        icon: 'talk',
        activeMatch: `^/(talks)`,
      },
      {
        text: '随笔',
        link: '/notes',
        icon: 'note',
        activeMatch: `^/(notes)`,
      },
    ],
  },

  {
    text: '记录我的开源和尝试',
    items: [
      {
        text: '项目',
        link: '/projects',
        activeMatch: `^/(projects)`,
        icon: 'project',
      },
      {
        text: '小样',
        link: '/demos',
        icon: 'video',
        activeMatch: `^/(demos)`,
      },
      {
        text: '书签',
        link: '/bookmarks',
        icon: 'bookmarks',
        activeMatch: `^/(bookmarks)`,
      },
    ],
  },

]
