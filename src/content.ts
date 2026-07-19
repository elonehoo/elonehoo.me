import { parse as parseYaml } from 'yaml'

export interface ContentRecord {
  date?: string
  description: string
  duration?: string
  file: string
  lang?: string
  meta: Record<string, unknown>
  path: string
  section: string
  slug: string
  source: string
  title: string
}

const markdownFiles = import.meta.glob('../content/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function stripOrderingPrefix(segment: string) {
  const match = segment.match(/^(\d+)\.(.+)$/)

  if (!match || /^\d+$/.test(match[2]))
    return segment

  return match[2]
}

export function contentPathFromFilename(filename: string) {
  const relative = filename
    .replace(/^.*?content\//, '')
    .replace(/\.md$/, '')
  const segments = relative.split('/').map(stripOrderingPrefix)

  if (segments.at(-1) === 'index')
    segments.pop()

  return `/${segments.join('/')}`.replace(/\/$/, '') || '/'
}

function toOptionalString(value: unknown) {
  if (value instanceof Date)
    return value.toISOString()

  if (typeof value === 'string' || typeof value === 'number')
    return String(value)

  return undefined
}

function createContentRecord(file: string, raw: string): ContentRecord {
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const data = frontmatter
    ? (parseYaml(frontmatter[1]) || {}) as Record<string, unknown>
    : {}
  const source = frontmatter ? raw.slice(frontmatter[0].length) : raw
  const path = contentPathFromFilename(file)
  const segments = path.split('/').filter(Boolean)
  const title = toOptionalString(data.title) || segments.at(-1) || 'Elone Hoo'

  return {
    date: toOptionalString(data.date),
    description: toOptionalString(data.description) || '',
    duration: toOptionalString(data.duration),
    file,
    lang: toOptionalString(data.lang),
    meta: data,
    path,
    section: segments.length > 1 ? segments[0] : segments[0] || 'home',
    slug: segments.at(-1) || '',
    source,
    title,
  }
}

export const contentRecords = Object.entries(markdownFiles)
  .map(([file, raw]) => createContentRecord(file, raw))

const contentByPath = new Map(contentRecords.map(record => [record.path, record]))

export function getContent(path: string) {
  return contentByPath.get(path)
}

export function getSectionRecords(sectionPath: string) {
  const prefix = `${sectionPath}/`

  return contentRecords
    .filter(record => record.path.startsWith(prefix))
    .sort((left, right) => {
      return new Date(right.date || 0).getTime() - new Date(left.date || 0).getTime()
    })
}

export function groupRecordsByYear(records: ContentRecord[]) {
  const groups = new Map<string, ContentRecord[]>()

  for (const record of records) {
    const date = record.date ? new Date(record.date) : undefined
    const year = date && Number.isFinite(date.getTime())
      ? String(date.getFullYear())
      : '其他'
    const group = groups.get(year) || []
    group.push(record)
    groups.set(year, group)
  }

  return [...groups.entries()]
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([year, items]) => ({ year, records: items }))
}
