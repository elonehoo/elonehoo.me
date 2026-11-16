import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { MarkdownContent } from './components/MarkdownContent'
import { getLearnTutorials } from './learn'

function lesson(path: string) {
  const tutorial = getLearnTutorials().find(item => item.path === '/learn/shader-learn')
  const page = tutorial?.children[0]?.children.find(item => item.path === path)
  if (!page?.record)
    throw new Error(`missing ${path}`)
  return page.record
}

describe('lesson directive', () => {
  it('shows the switch and the planet source, not a stray fence', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/basic/a-planet')} />)
    expect(html).toContain('完整代码')
    expect(html).toContain('IcosahedronGeometry')
    expect(html).toContain('querySelector')
    expect(html).not.toContain(':::')
  })

  it('shows the canvas fragment inside the code slot', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/basic/canvas')} />)
    expect(html).toContain('完整代码')
    expect(html).toContain('gl_FragColor')
    expect(html).toContain('0.480')
    expect(html).not.toContain(':::')
  })

  it('keeps the switch on the component lessons', () => {
    for (const path of ['/learn/shader-learn/basic/cpu-gpu', '/learn/shader-learn/basic/buffer']) {
      const html = renderToStaticMarkup(<MarkdownContent record={lesson(path)} />)
      expect(html).toContain('完整代码')
      expect(html).not.toContain(':::')
    }
  })
})
