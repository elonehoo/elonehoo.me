import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const baseUrl = `https://elonehoo.me`

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'The Vue Point',
    description: 'The official blog for the Vue.js project',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: 'https://elonehoo.me/me/avatar.png',
    favicon: `${baseUrl}/me/favicon.png`,
    copyright:
      'Copyright (c) 2022-present, Elone Hoo',
  })

  const posts = await createContentLoader('posts/*.md', {
    excerpt: true,
    render: true,
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string)
      - +new Date(a.frontmatter.date as string),
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html?.replaceAll('&ZeroWidthSpace;', ''),
      author: [
        {
          name: 'elonehoo',
          link: 'https://elonehoo.me',
        },
      ],
      date: frontmatter.date,
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}
