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
    expect(tutorial?.children[1]?.record?.meta.chapter).toBe(true)
    expect(tutorial?.children.map(chapter => chapter.title)).toEqual([
      '序章 GPU 如何绘制画面',
      '片元与数据',
    ])
    expect(tutorial?.children[0]?.children.map(section => ({
      path: section.path,
      title: section.title,
    }))).toEqual([
      { path: '/learn/shader-learn/basic/a-planet', title: '开场 一颗星球' },
      { path: '/learn/shader-learn/basic/canvas', title: '网页与 Canvas' },
      { path: '/learn/shader-learn/basic/cpu-gpu', title: 'C 循环 vs GPU' },
      { path: '/learn/shader-learn/basic/buffer', title: 'RGBA → 缓冲区' },
    ])
    expect(tutorial?.children[1]?.children.map(section => ({
      path: section.path,
      title: section.title,
    }))).toEqual([
      { path: '/learn/shader-learn/fragment-data/one-rule', title: '一份规则画整个画面' },
      { path: '/learn/shader-learn/fragment-data/variables-main', title: '变量与 main' },
      { path: '/learn/shader-learn/fragment-data/glsl-types', title: 'GLSL 的类型比 C 严格' },
      { path: '/learn/shader-learn/fragment-data/rgb-alpha', title: 'RGB 与 Alpha' },
      { path: '/learn/shader-learn/fragment-data/vec2', title: 'vec2 二维坐标' },
      { path: '/learn/shader-learn/fragment-data/uv', title: 'UV 坐标' },
      { path: '/learn/shader-learn/fragment-data/screen-pixels', title: '屏幕与像素' },
      { path: '/learn/shader-learn/fragment-data/swizzle', title: '分量与重排' },
      { path: '/learn/shader-learn/fragment-data/mix', title: 'mix 混合' },
    ])
    expect(tutorial?.children[0]?.children[0]?.heading).toBe('你会亲手写出这颗星球')
    expect(tutorial?.children[1]?.children[0]?.heading).toBe('一份规则，画出整个画面')
    expect(tutorial?.children[1]?.children[0]?.description).toBe('拖动半径。每个位置执行同一份程序，算出不同的颜色。')
    expect(tutorial?.children[1]?.children[1]?.heading).toBe('main：读输入、计算、写输出')
    expect(tutorial?.children[1]?.children[1]?.description).toBe('左边是原始亮度，右边是调光后。像 C 函数一样，一行行执行。')
    expect(tutorial?.children[1]?.children[2]?.heading).toBe('float、int、bool：比 C 更严格')
    expect(tutorial?.children[1]?.children[2]?.description).toBe('float 控制亮度，int 控制条数，bool 控制是否反转。再试试 C 语言里的常见写法。')
    expect(tutorial?.children[1]?.children[3]?.heading).toBe('颜色，就是四个数')
    expect(tutorial?.children[1]?.children[3]?.description).toBe('调 RGB 混出颜色；降低 A，看前景怎样与背后的棋盘混合。')
    expect(tutorial?.children[1]?.children[4]?.heading).toBe('vec2：两个分量组成的向量')
    expect(tutorial?.children[1]?.children[4]?.description).toBe('两个 float，一起表示 X、Y。拖动代码里的数字，点的位置也会变。')
    expect(tutorial?.children[1]?.children[5]?.heading).toBe('UV：给表面一个地址')
    expect(tutorial?.children[1]?.children[5]?.description).toBe('X 变红，Y 变绿。移动指针查看坐标。')
    expect(tutorial?.children[1]?.children[6]?.heading).toBe('屏幕坐标与分辨率')
    expect(tutorial?.children[1]?.children[6]?.description).toBe('像素位置 ÷ 分辨率 = 0～1 的屏幕坐标。')
    expect(tutorial?.children[1]?.children[7]?.heading).toBe('分量：取出、调换、复制')
    expect(tutorial?.children[1]?.children[7]?.description).toBe('同样三个数，换个排列就变了颜色。')
    expect(tutorial?.children[1]?.children[8]?.heading).toBe('mix：在两个值之间插值')
    expect(tutorial?.children[1]?.children[8]?.description).toBe('把比例从 0 推到 1，观察两个端点之间的颜色。')
    expect(learnReadingOrder(tutorial!).map(item => item.title)).toEqual([
      '开场 一颗星球',
      '网页与 Canvas',
      'C 循环 vs GPU',
      'RGBA → 缓冲区',
      '一份规则画整个画面',
      '变量与 main',
      'GLSL 的类型比 C 严格',
      'RGB 与 Alpha',
      'vec2 二维坐标',
      'UV 坐标',
      '屏幕与像素',
      '分量与重排',
      'mix 混合',
    ])
  })
})
