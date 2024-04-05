import { createContentLoader } from 'vitepress'
import dayjs from 'dayjs'
import { formatTime } from './index'

interface Demo {
  title: string
  lang: string
  url: string
  date: string
  time: string
  duration: string
  frontmatter: any
}

declare const data: Demo[]
export { data }

export default createContentLoader('demos/*.md', {
  excerpt: true,
  transform(raw): Demo[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        lang: frontmatter.lang,
        url,
        date: frontmatter.date,
        time: dayjs(frontmatter.date).format('YYYY/MM/DD'),
        duration: frontmatter.duration,
        frontmatter,
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .filter(i => !i.url.endsWith('.html'))
  },
})
