import dayjs from 'dayjs'
import { createContentLoader } from 'vitepress'

export interface Posts {
  title: string
  lang: string
  url: string
  date: string
  time: string
  duration: string
  frontmatter: any
  img: string | undefined
  excerpt: string | undefined
}

declare const data: Posts[]
export { data }

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw): Posts[] {
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
      .filter(i => !i.url.endsWith('.html'))
      .slice(0, 6)
  },
})