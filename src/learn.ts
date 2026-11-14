import type { ContentRecord } from './content'
import { contentRecords, contentSegmentsFromFilename } from './content'

export interface LearnNode {
  children: LearnNode[]
  description: string
  order: number
  path: string
  record?: ContentRecord
  title: string
}

export function buildLearnTree(records: ContentRecord[]) {
  const nodes = new Map<string, LearnNode>()
  const root: LearnNode = {
    children: [],
    description: '',
    order: 0,
    path: '/learn',
    title: '学习',
  }
  nodes.set(root.path, root)

  for (const record of records) {
    if (!record.path.startsWith('/learn/'))
      continue

    const segments = contentSegmentsFromFilename(record.file)
    if (segments[0]?.slug !== 'learn')
      continue

    let parent = root
    for (let index = 1; index < segments.length; index++) {
      const segment = segments[index]
      const path = `${parent.path}/${segment.slug}`
      let node = nodes.get(path)

      if (!node) {
        node = {
          children: [],
          description: '',
          order: segment.order,
          path,
          title: segment.slug,
        }
        nodes.set(path, node)
        parent.children.push(node)
      }

      if (index === segments.length - 1) {
        node.record = record
        node.title = record.title
        node.description = record.description
      }

      parent = node
    }
  }

  sortLearnNodes(root.children)
  return root.children
}

function sortLearnNodes(nodes: LearnNode[]) {
  nodes.sort((left, right) => left.order - right.order || left.title.localeCompare(right.title, 'zh'))
  for (const node of nodes)
    sortLearnNodes(node.children)
}

const learnTutorials = buildLearnTree(contentRecords)

export function getLearnTutorials() {
  return learnTutorials
}

export function findLearnNode(tutorials: LearnNode[], path: string) {
  for (const tutorial of tutorials) {
    const node = findNode(tutorial, path)
    if (node)
      return { node, tutorial }
  }
}

function findNode(node: LearnNode, path: string): LearnNode | undefined {
  if (node.path === path)
    return node

  for (const child of node.children) {
    const found = findNode(child, path)
    if (found)
      return found
  }
}

export function learnAncestors(tutorial: LearnNode, path: string) {
  const chain: LearnNode[] = []

  function walk(node: LearnNode): boolean {
    if (node.path === path) {
      chain.push(node)
      return true
    }

    for (const child of node.children) {
      if (walk(child)) {
        chain.push(node)
        return true
      }
    }

    return false
  }

  walk(tutorial)
  return chain.reverse()
}

export function learnHasContent(node: LearnNode) {
  if (node.record?.meta.chapter === true)
    return false
  return Boolean(node.record?.source.trim())
}

export function firstLearnPage(node: LearnNode): LearnNode | undefined {
  if (learnHasContent(node))
    return node

  for (const child of node.children) {
    const page = firstLearnPage(child)
    if (page)
      return page
  }
}

export function learnReadingOrder(tutorial: LearnNode) {
  const pages: LearnNode[] = []

  function walk(node: LearnNode) {
    if (learnHasContent(node))
      pages.push(node)
    for (const child of node.children)
      walk(child)
  }

  walk(tutorial)
  return pages
}

export function learnNeighbors(tutorial: LearnNode, path: string) {
  const pages = learnReadingOrder(tutorial)
  const index = pages.findIndex(page => page.path === path)

  return {
    next: index >= 0 ? pages[index + 1] : undefined,
    prev: index > 0 ? pages[index - 1] : undefined,
  }
}
