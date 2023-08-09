import type { NitroCtx } from 'nuxt-rss/dist/module'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('feed:generate', async ({ feed }: NitroCtx) => {
    feed.options = {
      id: 'feed-rss',
      title: 'Elone Hoo',
      generator: 'nuxt with nuxt-ssr',
      author: {
        name: 'liting-yes',
        email: 'hi@elonehoo.me',
        link: 'https://elonehoo.me',
      },
      link: 'https://elonehoo.me',
      description: 'Elone Hoo\' Blog',
      copyright: 'CC BY-NC-SA 4.0 2022 © Elone Hoo',
    }
    const data = await $fetch('/api/_content/query')
    // @ts-expect-error bug error
    data.forEach((post) => {
      feed.addItem({
        title: post._dit === 'post' ? post.navigation.title : post.title,
        id: post._path,
        link: `https://elonehoo.me${post._path}`,
        content: post.description,
        date: new Date(post.navigation.date),
      })
    })
    feed.addContributor({
      name: 'Elone Hoo',
      email: 'hi@elonehoo.me',
      link: 'https://elonehoo.me',
    })
  })
})
