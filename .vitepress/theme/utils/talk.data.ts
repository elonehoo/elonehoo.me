import { createContentLoader } from 'vitepress'
import dayjs from 'dayjs'
import { formatTime } from './index'

interface Talk {
  title: string
  lang: string
  url: string
  date: string
  time: string
  duration: string
  frontmatter: any
}

declare const data: Talk[]
export { data }

export default createContentLoader('talks/*.md', {
  excerpt: true,
  transform(raw): Talk[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        lang: frontmatter.lang,
        url,
        date: formatTime(frontmatter.date),
        time: dayjs(frontmatter.date).format('YYYY/MM/DD'),
        duration: frontmatter.duration,
        frontmatter,
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .filter(i => !i.url.endsWith('.html'))
  },
})
