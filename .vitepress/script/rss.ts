import path from 'node:path'
import { writeFileSync } from 'node:fs'
import { Feed } from 'feed'
import { type SiteConfig, createContentLoader } from 'vitepress'

const baseUrl = `https://elonehoo.me`

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'Elone Hoo',
    description: 'The Elone Hoo Blog',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: 'https://elonehoo.me/og.png',
    favicon: `${baseUrl}/logo-dark.ico`,
    copyright:
      'CC BY-NC-SA 4.0 2022-PRESENT © Elone Hoo',
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
          name: 'Elone Hoo',
          link: 'https://twitter.com/elonehoo',
        },
      ],
      date: frontmatter.date,
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}
