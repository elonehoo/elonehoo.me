import { describe, expect, it } from 'vitest'
import { contentPathFromFilename, contentRecords, getContent } from './content'

describe('content manifest', () => {
  it('preserves the existing public URL convention', () => {
    expect(contentPathFromFilename('../content/posts/0040.building-cloud-agent-infrastructure.md'))
      .toBe('/posts/building-cloud-agent-infrastructure')
    expect(contentPathFromFilename('../content/notes/0008.22.md')).toBe('/notes/0008.22')
    expect(contentPathFromFilename('../content/0000.index.md')).toBe('/')
    expect(contentPathFromFilename('../content/learn/0001.shader-learn/0000.index.md'))
      .toBe('/learn/shader-learn')
  })

  it('indexes every Markdown page without duplicate paths', () => {
    expect(contentRecords).toHaveLength(162)
    expect(getContent('/learn')?.title).toBe('Learn - Elone Hoo')
    expect(getContent('/learn/shader-learn')?.title).toBe('Shader Learn')
    expect(getContent('/learn/shader-learn')?.description).toBe('看得见的基础课')
    expect(new Set(contentRecords.map(record => record.path)).size).toBe(contentRecords.length)
    expect(getContent('/posts/building-cloud-agent-infrastructure')?.title).toBe('云上的 Agent，和本地有什么不同')
  })
})
