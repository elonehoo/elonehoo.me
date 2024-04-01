import { createContentLoader } from 'vitepress'

interface Gallery {
  title: string
  date: string
  img: string
}

declare const data: Gallery[]
export { data }

export default createContentLoader('gallery/*.md', {
  excerpt: true,
  transform(raw): Gallery[] {
    const result: Gallery[] = []
    raw.forEach((item) => {
      item.frontmatter.images.forEach((image: any) => {
        result.push({
          title: item.frontmatter.title,
          date: item.frontmatter.date,
          img: image.url,
        })
      })
    })
    return result.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
