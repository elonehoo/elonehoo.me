import { createContentLoader } from 'vitepress'

export interface Gallery {
  url: string
  images: { url: string }[]
}

declare const data: Gallery[]
export { data }

export default createContentLoader('gallery/*.md', {
  excerpt: true,
  transform(raw): Gallery[] {
    return raw
      .map(({ url, frontmatter }) => ({
        url,
        images: frontmatter.images,
      }))
  },
})
