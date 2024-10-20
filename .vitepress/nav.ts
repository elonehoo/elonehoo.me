import type { Config as ThemeConfig } from '../src/index'

export const nav: ThemeConfig['nav'] = [
  {
    text: '关于我',
    link: '/about/',
    icon: 'about',
  },
  {
    text: '照片墙',
    link: '/gallery/',
    icon: 'gallery',
  },
  {
    text: '书签',
    link: '/bookmarks/',
    icon: 'bookmarks',
  },
  {
    text: '存下我的心得与体会',
    items: [
      {
        text: '博客',
        link: '/blog/',
        icon: 'blog',
      },
      {
        text: '分享',
        link: '/talks/',
        icon: 'talk',
      },
      {
        text: '随笔',
        link: '/notes/',
        icon: 'note',
      },
    ],
  },
  {
    text: '记录我的开源和尝试',
    items: [
      {
        text: '项目',
        link: '/projects/',
        icon: 'project',
      },
      {
        text: '小样',
        link: '/demos/',
        icon: 'video',
      },
    ],
  },

]
