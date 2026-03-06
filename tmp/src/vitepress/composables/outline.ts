import type { Header } from 'vitepress'
import type { MenuItemWithLink } from '../../core'
import { useData } from 'vitepress'
import { computed, inject } from 'vue'

export interface HeaderWithChildren extends Header {
  hidden?: boolean
}

export interface MenuItemWithLinkAndChildren extends MenuItemWithLink {
  children?: MenuItemWithLinkAndChildren[]
  hidden?: boolean
}

export function useOutlineHeaders() {
  const { page } = useData()
  const filterHeaders = inject('filter-headers', null) as any
  return computed(() => {
    return resolveHeaders(page.value.headers, filterHeaders)
  })
}

function resolveHeaders(
  headers: HeaderWithChildren[],
  filter?: (h: HeaderWithChildren) => boolean,
): MenuItemWithLinkAndChildren[] {
  return headers.map(header => ({
    text: header.title,
    link: header.link,
    children: header.children?.length
      ? resolveHeaders(header.children, filter)
      : undefined,
    hidden: filter ? !filter(header) : false,
  }))
}
