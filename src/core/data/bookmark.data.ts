import { createContentLoader } from 'vitepress'

export interface BookmarkItem {
  name: string
  link: string
  desc: string
}

export interface Bookmark {
  bookmarks: BookmarkItem[]
  url: string
}

declare const data: Bookmark[]
export { data }

export default createContentLoader('bookmarks.md', {
  excerpt: true,
  transform(raw): Bookmark[] {
    return raw
      .map(({ url, frontmatter }) => ({
        url,
        bookmarks: frontmatter.bookmarks,
      }))
  },
})
