import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { Feed } from 'feed'
import { fileURLToPath } from 'url'
import postsData from './theme/post.data'

const url = `https://elonehoo.me`
const dirname = path.dirname(fileURLToPath(import.meta.url))

const feed = new Feed({
  title: 'elonehoo.me',
  description: 'Elone Hoo personal website',
  id: url,
  link: url,
  language: 'en',
  image: 'https://github.com/elonehoo.png',
  favicon: `${url}/favicon.ico`,
  copyright: 'Copyright 2022-PRESENT © Elone Hoo'
})

postsData.load(true).then((posts) => {
  posts.forEach((post) => {
    const file = path.resolve(dirname, `dist${post.href}`)
    const rendered = readFileSync(file, 'utf-8')
    const content = rendered.match(
      /<div [^<>]+?class="prose[^<>]+?>([\s\S]*)<\/div>/
    )

    if (!content) {
      throw new Error(`no content match found for file ${post.href}`)
    }

    feed.addItem({
      title: post.title,
      id: `${url}${post.href}`,
      link: `${url}${post.href}`,
      description: post.title,
      content: content[1],
      author: [
        {
          name: post.data.author,
          link: post.data.twitter
            ? 'https://twitter.com/elonehoo'
            : undefined
        }
      ],
      date: post.data.date
    })
  })

  writeFileSync(path.resolve(dirname, 'dist/feed.rss'), feed.rss2())
})
