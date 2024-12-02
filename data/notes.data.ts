import type { Note } from './note.data'
import dayjs from 'dayjs'
import { createContentLoader } from 'vitepress'

declare const data: Note[]
export { data }

export default createContentLoader('notes/*.md', {
  excerpt: true,
  transform(raw): Note[] {
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
  },
})
