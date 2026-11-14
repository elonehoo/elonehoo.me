import type { ContentRecord } from './content'
import { describe, expect, it } from 'vitest'
import { contentPathFromFilename, groupRecordsByYear } from './content'
import { buildLearnTree, getLearnTutorials, learnNeighbors, learnReadingOrder } from './learn'

function page(file: string, title: string, description = '', date?: string, source = '正文', meta: ContentRecord['meta'] = {}): ContentRecord {
  const path = contentPathFromFilename(file)

  return {
    date,
    description,
    file,
    meta,
    path,
    section: 'learn',
    slug: path.split('/').at(-1) || '',
    source,
    title,
  }
}

describe('learn tutorials', () => {
  it('keeps one theme on the timeline and pages inside that theme', () => {
    const tutorials = buildLearnTree([
      page('../content/learn/0002.later/0000.index.md', '后来的', '', '2024-01-02T00:00:00.000', '正文', { chapter: true }),
      page('../content/learn/0001.rust/0000.index.md', 'Rust', '所有权', '2026-05-01T00:00:00.000', '介绍', { chapter: true }),
      page('../content/learn/0001.rust/0002.editor.md', '编辑器'),
      page('../content/learn/0001.rust/0001.install.md', '安装'),
    ])

    expect(tutorials.map(tutorial => tutorial.title)).toEqual(['Rust', '后来的'])
    expect(tutorials[0].children.map(item => item.title)).toEqual(['安装', '编辑器'])
    expect(learnReadingOrder(tutorials[0]).map(item => item.title)).toEqual(['安装', '编辑器'])
    expect(learnNeighbors(tutorials[0], '/learn/rust/editor')).toEqual({
      next: undefined,
      prev: expect.objectContaining({ title: '安装' }),
    })

    const themes = tutorials.flatMap(tutorial => tutorial.record ? [tutorial.record] : [])
    expect(groupRecordsByYear(themes).map(group => group.year)).toEqual(['2026', '2024'])
  })

  it('reads the sample tutorial as one dated theme', () => {
    const tutorial = getLearnTutorials().find(item => item.path === '/learn/shader-learn')
    expect(tutorial?.title).toBe('Shader Learn')
    expect(tutorial?.description).toBe('看得见的基础课')
    expect(tutorial?.record?.date?.startsWith('2026-11-14')).toBe(true)
    expect(tutorial?.record?.meta.chapter).toBe(true)
    expect(tutorial?.children[0]?.record?.meta.chapter).toBe(true)
    expect(tutorial?.children.map(chapter => chapter.title)).toEqual(['序章 GPU 如何绘制画面'])
    expect(tutorial?.children[0]?.children.map(section => ({
      path: section.path,
      title: section.title,
    }))).toEqual([
      { path: '/learn/shader-learn/basic/a-planet', title: '开场 一颗星球' },
      { path: '/learn/shader-learn/basic/cpu-gpu', title: 'C 循环 vs GPU' },
    ])
    expect(learnReadingOrder(tutorial!).map(item => item.title)).toEqual(['开场 一颗星球', 'C 循环 vs GPU'])
  })
})
