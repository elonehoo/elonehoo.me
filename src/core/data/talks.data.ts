import type { Post } from './post.data'
import dayjs from 'dayjs'
import { createContentLoader } from 'vitepress'

declare const data: Post[]
export { data }

export default createContentLoader('talks/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, excerpt, frontmatter }) => ({
        title: frontmatter.title,
        lang: frontmatter.lang,
        url,
        date: frontmatter.date,
        img: frontmatter.img,
        excerpt,
        time: dayjs(frontmatter.date).format('YYYY年MM月DD日'),
        duration: frontmatter.duration,
        frontmatter,
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
