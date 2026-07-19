import { describe, expect, it } from 'vitest'
import { contentPathFromFilename, contentRecords, getContent } from './content'

describe('content manifest', () => {
  it('preserves the existing public URL convention', () => {
    expect(contentPathFromFilename('../content/posts/0040.building-cloud-agent-infrastructure.md'))
      .toBe('/posts/building-cloud-agent-infrastructure')
    expect(contentPathFromFilename('../content/notes/0008.22.md')).toBe('/notes/0008.22')
    expect(contentPathFromFilename('../content/0000.index.md')).toBe('/')
  })

  it('indexes every Markdown page without duplicate paths', () => {
    expect(contentRecords).toHaveLength(143)
    expect(new Set(contentRecords.map(record => record.path)).size).toBe(contentRecords.length)
    expect(getContent('/posts/building-cloud-agent-infrastructure')?.title).toBe('云上的 Agent，和本地有什么不同')
  })
})
