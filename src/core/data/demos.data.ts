import dayjs from 'dayjs'
import { createContentLoader } from 'vitepress'

export interface Demo {
  title: string
  lang: string
  url: string
  date: string
  time: string
  duration: string
  frontmatter: any
  excerpt?: string
}

declare const data: Demo[]
export { data }

export default createContentLoader('demos/*.md', {
  excerpt: true,
  transform(raw): Demo[] {
    return raw
      .map(({ url, excerpt, frontmatter }) => ({
        title: frontmatter.title,
        lang: frontmatter.lang,
        url,
        date: frontmatter.date,
        excerpt,
        time: dayjs(frontmatter.date).format('YYYY年MM月DD日'),
        duration: frontmatter.duration,
        frontmatter,
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .filter(i => !i.url.endsWith('.html'))
  },
})
