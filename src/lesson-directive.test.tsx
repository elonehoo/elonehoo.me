import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { circleAt, isSquare, readShape, replaceMain, shaderMain, writeShape } from '../content/learn/0001.shader-learn/0002.fragment-data/0001.one-rule/Code'
import { explainSource, toneFromEdit } from '../content/learn/0001.shader-learn/0002.fragment-data/0002.variables-main/Code'
import { readTypes, replaceMain as replaceTypeMain, shaderMain as typeMain, stripeAt, writeBrightness, writeCount, writeInvert } from '../content/learn/0001.shader-learn/0002.fragment-data/0003.glsl-types/Code'
import { colorMatch, readColor, replaceMain as replaceRgbaMain, shaderMain as rgbaMain, skyBlue, skyHint, writeAlpha, writeRgb } from '../content/learn/0001.shader-learn/0002.fragment-data/0004.rgb-alpha/Code'
import { explainSource as pointExplain, readPoint, writePoint } from '../content/learn/0001.shader-learn/0002.fragment-data/0005.vec2/Code'
import { colorAt, readWeights, replaceMain as replaceUvMain, shaderMain as uvMain, writeWeight } from '../content/learn/0001.shader-learn/0002.fragment-data/0006.uv/Code'
import { MarkdownContent } from './components/MarkdownContent'
import { findLearnNode, getLearnTutorials } from './learn'

function lesson(path: string) {
  const found = findLearnNode(getLearnTutorials(), path)
  if (!found?.node.record)
    throw new Error(`missing ${path}`)
  return found.node.record
}

describe('lesson directive', () => {
  it('shows the switch and the planet source, not a stray fence', () => {
    const record = lesson('/learn/shader-learn/basic/a-planet')
    expect(record.source).toContain('::dev-preview{path="/learn/shader-learn/basic/a-planet"}')
    expect(record.source).not.toContain('preview="dev-preview"')
    const html = renderToStaticMarkup(<MarkdownContent record={record} />)
    expect(html).not.toContain('::dev-preview')
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

  it('keeps the cpu comparison in the explanation and the sources in the code', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/basic/cpu-gpu')} />)
    const notesAt = html.indexOf('class="learn-notes"')
    const widgetAt = html.indexOf('C · CPU 逐个', notesAt)
    const codeAt = html.indexOf('每行的格子')
    expect(notesAt).toBeGreaterThan(-1)
    expect(codeAt).toBeGreaterThan(-1)
    expect(codeAt).toBeLessThan(notesAt)
    expect(html).not.toContain('mediump')
    expect(widgetAt).toBeGreaterThan(notesAt)
    expect(widgetAt).toBeLessThan(html.indexOf('只知道自己的位置'))
    expect(html).toContain('把指针移到格子上')
    expect(html).not.toContain(':::')
  })

  it('keeps the switch on the buffer lesson', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/basic/buffer')} />)
    expect(html).toContain('完整代码')
    expect(html).toContain('<blockquote>')
    expect(html).toContain('最后一次写入才算数')
    expect(html).not.toContain(':::')
  })

  it('shows the circle rule, the vertex shader, and the fragment source', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/fragment-data/one-rule')} />)
    const plain = html.replace(/<[^>]+>/g, '')
    const notesAt = plain.indexOf('屏幕坐标')
    const notes = plain.slice(notesAt)
    const code = plain.slice(0, notesAt)
    const mainAt = notes.indexOf('gl_FragColor')
    const quoteAt = notes.indexOf('同一份代码，位置不同，结果不同')
    expect(notesAt).toBeGreaterThan(-1)
    expect(code).toContain('precision mediump float')
    expect(code).toContain('gl_FragColor')
    expect(code).not.toContain('attribute vec3 aColor')
    expect(notes).not.toContain('attribute vec3 aColor')
    expect(notes).not.toContain('gl_Position')
    expect(notes).not.toContain('precision mediump float')
    expect(notes).toContain('void main')
    expect(notes).toContain('gl_FragColor')
    expect(html).toContain('learn-number')
    expect(plain.indexOf('smoothstep')).toBeGreaterThan(-1)
    expect(plain.indexOf('smoothstep')).toBeLessThan(notesAt)
    expect(mainAt).toBeGreaterThan(-1)
    expect(quoteAt).toBeGreaterThan(mainAt)
    expect(html).toContain('像素调试')
    expect(html).toContain('圆的半径')
    expect(html).toContain('边缘柔和度')
    expect(html).toContain('把圆改成正方形')
    expect(plain.indexOf('试一试')).toBeGreaterThan(-1)
    expect(plain.indexOf('把圆改成正方形')).toBeGreaterThan(plain.indexOf('试一试'))
    expect(html).toContain('0.300')
    expect(html).toContain('gl.uniform2f(uResolution, 572, 358)')
    expect(html).not.toContain(':::')

    const source = 'float d = length(p);\nfloat circle = 1.0 - smoothstep(0.300, 0.300 + 0.040, d);'
    expect(readShape(source)).toEqual({ radius: 0.3, softness: 0.04 })
    expect(writeShape(source, 0.5, 0.08)).toContain('smoothstep(0.500, 0.500 + 0.080, d)')
    expect(isSquare(source)).toBe(false)
    expect(isSquare('float d = max(abs(p.x), abs(p.y));')).toBe(true)
    expect(circleAt([0, 0], 0.3, 0.04).circle).toBe(1)
    expect(circleAt([0.34, 0], 0.3, 0.04).circle).toBe(0)
    const vertex = 'attribute vec3 aPosition;\nvarying vec2 vUv;\n\nvoid main() {\n  gl_Position = vec4(aPosition, 1.0);\n}'
    expect(shaderMain(vertex)).toBe('void main() {\n  gl_Position = vec4(aPosition, 1.0);\n}')
    expect(replaceMain(`precision mediump float;\n${shaderMain(vertex)}`, 'void main() {\n  gl_FragColor = vec4(color, 1.0);\n}')).toBe('precision mediump float;\nvoid main() {\n  gl_FragColor = vec4(color, 1.0);\n}')
  })

  it('shows the main lesson as a flat split, with the full shader in the code slot', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/fragment-data/variables-main')} />)
    const plain = html.replace(/<[^>]+>/g, '')
    const notesAt = plain.indexOf('带下划线的数字可以左右拖动')
    const code = plain.slice(0, notesAt)
    const notes = plain.slice(notesAt)
    expect(notesAt).toBeGreaterThan(-1)
    expect(code).toContain('precision mediump float')
    expect(code).toContain('mix(uInput, result, step(0.5, vUv.x))')
    expect(notes).not.toContain('mix(')
    expect(notes).not.toContain('precision mediump float')
    expect(notes).toContain('void main')
    expect(notes).toContain('原始亮度')
    expect(notes).toContain('保留比例')
    expect(html).toContain('learn-number')
    expect(html).toContain('value="0.70"')
    expect(html).toContain('value="0.40"')
    expect(notes).toContain('原样')
    expect(notes).toContain('减半')
    expect(notes).toContain('全黑')
    expect(notes).toContain('读输入 → 乘法 → 写输出')
    expect(notes).toContain('JS 传入，所有片元共用')
    expect(notes).toContain('每次调用从这里开始执行')
    expect(notes).toContain('把右边的结果存入左边')
    expect(notes).toContain('gl.uniform1f(uInput, 0.70)')
    expect(notes).toContain('gl.uniform1f(uGain, 0.40)')
    expect(notes).toContain('uniform 是 JS 传进来的值；main 读输入、计算、写输出，像 C 函数一样从上往下执行。')
    expect(plain.indexOf('试一试')).toBeGreaterThan(notesAt)
    expect(notes).toContain('点「减半」，结果变成多少？')
    expect(notes).toContain('把 uGain 拉到 0，右边变成全黑')
    expect(html).toContain('最终亮度')
    expect(html).toContain('uInput · 原始亮度')
    expect(html).toContain('uGain · 保留比例')
    expect(html).not.toContain(':::')
    expect(html).not.toContain('::Code')

    expect(explainSource(0.7, 0.4)).toContain('// 0.70 原始亮度')
    expect(explainSource(0.7, 0.4)).toContain('// = 0.28')
    expect(explainSource(0.7, 0.4)).not.toContain('mix(')
    expect(toneFromEdit({ uInput: 0.7, uGain: 0.4 }, 'gain', 0.5)).toEqual({ uInput: 0.7, uGain: 0.5 })
    expect(toneFromEdit({ uInput: 0.7, uGain: 0.4 }, 'result', 0.35).uGain).toBeCloseTo(0.5)
    expect(toneFromEdit({ uInput: 0.7, uGain: 0.4 }, 'input', 0.8).uInput).toBeCloseTo(0.8)
  })

  it('shows float, int, and bool as literals in the fragment', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/fragment-data/glsl-types')} />)
    const plain = html.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, '$1').replace(/<[^>]+>/g, '')
    const notesAt = plain.indexOf('每个像素运行一次')
    const code = plain.slice(0, notesAt)
    const notes = plain.slice(notesAt)
    expect(notesAt).toBeGreaterThan(-1)
    expect(code).toContain('precision mediump float')
    expect(code).toContain('varying vec2 vUv')
    expect(notes).not.toContain('precision mediump float')
    expect(notes).toContain('float brightness = 1.000')
    expect(notes).toContain('int count = 12')
    expect(notes).toContain('bool invert = false')
    expect(notes).toContain('vec3(0.48, 0.83, 0.69), stripe) * brightness')
    expect(code).toContain('vec3(0.48, 0.83, 0.69), stripe) * brightness')
    const highlighted = [...html.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/g)]
      .map(match => match[1].replace(/<input[^>]*value="([^"]*)"[^>]*>/g, '$1').replace(/<[^>]+>/g, ''))
    const explainCode = highlighted.find(text => text.startsWith('void main() {\n'))
    const fullCode = highlighted.find(text => text.startsWith('precision mediump float;\n'))
    expect(explainCode).toBe(`void main() {
  float brightness = 1.000;
  int count = 12;
  bool invert = false;
  float stripe = step(0.5, fract(vUv.x * float(count)));
  if (invert) stripe = 1.0 - stripe;
  vec3 color = mix(vec3(0.06, 0.10, 0.14), vec3(0.48, 0.83, 0.69), stripe) * brightness;
  gl_FragColor = vec4(color, 1.0);
}`)
    expect(fullCode).toBe(`precision mediump float;
varying vec2 vUv;

void main() {
  float brightness = 1.000;
  int count = 12;
  bool invert = false;
  float stripe = step(0.5, fract(vUv.x * float(count)));
  if (invert) stripe = 1.0 - stripe;
  vec3 color = mix(vec3(0.06, 0.10, 0.14), vec3(0.48, 0.83, 0.69), stripe) * brightness;
  gl_FragColor = vec4(color, 1.0);
}`)
    expect(notes).toContain('float 一个浮点数。GLSL 中用 1.0 表示 float，用 1 表示 int；两者不会自动转换。')
    expect(notes).toContain('GLSL 不做隐式类型转换：float 要写 1.0，int 和 float 不能直接相乘。')
    expect(notes).not.toContain('C 习惯写法')
    expect(notes).not.toContain('试一试')
    expect(notes).not.toContain('删掉一个分号')
    expect(notes).toContain('屏幕坐标')
    expect(notes).toContain('像素调试')
    expect(html).toContain('learn-number')
    expect(html).toContain('value="1.000"')
    expect(html).toContain('value="12"')
    expect(html).not.toContain('<textarea')
    expect(html).not.toContain(':::')
    expect(html).not.toContain('uniform bool')

    const source = `precision mediump float;
varying vec2 vUv;

void main() {
  float brightness = 1.000;
  int count = 12;
  bool invert = false;
  float stripe = step(0.5, fract(vUv.x * float(count)));
  if (invert) stripe = 1.0 - stripe;
  vec3 color = mix(vec3(0.06, 0.10, 0.14), vec3(0.48, 0.83, 0.69), stripe) * brightness;
  gl_FragColor = vec4(color, 1.0);
}
`
    expect(readTypes(source)).toEqual({ brightness: 1, count: 12, invert: false })
    expect(typeMain(source).startsWith('void main() {')).toBe(true)
    expect(typeMain(source)).not.toContain('precision')
    expect(replaceTypeMain(source, 'void main() {\n}\n')).toMatch(/^precision mediump float;\nvarying vec2 vUv;\n\nvoid main\(\) \{\n\}\n$/)
    expect(writeBrightness(source, 0.25)).toContain('float brightness = 0.250;')
    expect(writeCount(source, 3)).toContain('int count = 3;')
    expect(writeInvert(source, true)).toContain('bool invert = true;')
    expect(readTypes(writeInvert(writeCount(writeBrightness(source, 0.5), 8), true))).toEqual({ brightness: 0.5, count: 8, invert: true })
    expect(stripeAt(0, 12, false)).toBe(0)
    expect(stripeAt(0.07, 12, false)).toBe(1)
    expect(stripeAt(0.07, 12, true)).toBe(0)
  })

  it('shows rgb and alpha as four literals over a checkerboard', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/fragment-data/rgb-alpha')} />)
    const plain = html.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, '$1').replace(/<[^>]+>/g, '')
    const notesAt = plain.indexOf('每个像素运行一次')
    const code = plain.slice(0, notesAt)
    const notes = plain.slice(notesAt)
    expect(notesAt).toBeGreaterThan(-1)
    expect(code).toContain('precision mediump float')
    expect(code).toContain('vec3 color = vec3(0.960, 0.430, 0.300)')
    expect(notes).not.toContain('precision mediump float')
    expect(notes).toContain('vec3 color = vec3(0.960, 0.430, 0.300)')
    expect(notes).toContain('gl_FragColor = vec4(color, 1.000)')
    expect(notes).toContain('precision 声明浮点精度。mediump 在手机上常是 16 位（约 3 位有效数字），桌面上通常与 highp 相同。')
    expect(notes).toContain('vec3 本身只是三个数，这里当作 RGB；第四个数 A 只有在开启混合时才表示透明度。')
    expect(notes).toContain('把三个分量都拉到 0，再都拉到 1')
    expect(notes).toContain('降低 A，看颜色与背后棋盘混合')
    expect(notes).toContain('屏幕坐标')
    expect(notes).toContain('像素调试')
    expect(notes).toContain('R · 红')
    expect(notes).toContain('A · 不透明度')
    expect(notes).toContain('调出这块天空蓝')
    expect(html).toContain('learn-number')
    expect(html).toContain('value="0.960"')
    expect(html).toContain('value="1.000"')
    expect(html).not.toContain('<textarea')
    expect(html).not.toContain(':::')

    const source = `precision mediump float;
void main() {
  vec3 color = vec3(0.960, 0.430, 0.300);
  gl_FragColor = vec4(color, 1.000);
}
`
    expect(readColor(source)).toEqual({ r: 0.96, g: 0.43, b: 0.3, a: 1 })
    expect(rgbaMain(source).startsWith('void main() {')).toBe(true)
    expect(rgbaMain(source)).not.toContain('precision')
    expect(replaceRgbaMain(source, 'void main() {\n}\n')).toBe('precision mediump float;\nvoid main() {\n}\n')
    expect(writeRgb(source, 0.25, 0.62, 0.95)).toContain('vec3 color = vec3(0.250, 0.620, 0.950)')
    expect(writeAlpha(source, 0.4)).toContain('vec4(color, 0.400)')
    expect(colorMatch(readColor(source))).toBe(0)
    expect(colorMatch({ ...skyBlue, a: 1 })).toBe(100)
    expect(skyHint).toBe('目标参数：R · 红 = 0.25，G · 绿 = 0.62，B · 蓝 = 0.95，A · 不透明度 = 1')
  })

  it('shows a vec2 point as two draggable floats', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/fragment-data/vec2')} />)
    const plain = html.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, '$1').replace(/<[^>]+>/g, '')
    const notesAt = plain.indexOf('带下划线的数字可以左右拖动')
    const code = plain.slice(0, notesAt)
    const notes = plain.slice(notesAt)
    expect(notesAt).toBeGreaterThan(-1)
    expect(code).toContain('precision mediump float')
    expect(code).toContain('uniform vec2 uResolution')
    expect(code).toContain('vec2 point = vec2(0.650, 0.400)')
    expect(notes).not.toContain('precision mediump float')
    expect(notes).not.toContain('float grid')
    expect(notes).toContain('vec2 point = vec2(0.65, 0.40)')
    expect(notes).toContain('这两个分量决定左边圆点的位置')
    expect(notes).toContain('point.x → 左右')
    expect(notes).toContain('point.y → 上下')
    expect(notes).toContain('两个 float')
    expect(notes).toContain('左下 (0, 0) → 右上 (1, 1)')
    expect(notes).toContain('gl.uniform2f(uResolution, 597, 373)')
    expect(notes).toContain('vec2 由两个 float 组成，常用来表示坐标。左下 (0,0)，右上 (1,1)。')
    expect(notes).toContain('把点移到右上角')
    expect(notes).toContain('把点放到正中间：两个数应该是多少？')
    expect(notes).toContain('X · 左右')
    expect(notes).toContain('Y · 上下')
    expect(html).toContain('learn-number')
    expect(html).toContain('value="0.650"')
    expect(html).not.toContain('<textarea')
    expect(html).not.toContain(':::')

    const source = `vec2 point = vec2(0.650, 0.400);`
    expect(readPoint(source)).toEqual({ x: 0.65, y: 0.4 })
    expect(writePoint(source, 1, 0.5)).toBe('vec2 point = vec2(1.000, 0.500);')
    expect(pointExplain(0.65, 0.4)).toBe(`vec2 point = vec2(0.65, 0.40);
// 这两个分量决定左边圆点的位置
// point.x → 左右
// point.y → 上下`)
  })

  it('shows uv as the red and green weights', () => {
    const html = renderToStaticMarkup(<MarkdownContent record={lesson('/learn/shader-learn/fragment-data/uv')} />)
    const plain = html.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, '$1').replace(/<[^>]+>/g, '')
    const notesAt = plain.indexOf('每个像素运行一次')
    const code = plain.slice(0, notesAt)
    const notes = plain.slice(notesAt)
    expect(notesAt).toBeGreaterThan(-1)
    expect(code).toContain('precision mediump float')
    expect(code).toContain('varying vec2 vUv')
    expect(code).toContain('vec3(uv.x * 1.000, uv.y * 1.000, 0.25)')
    expect(notes).not.toContain('precision mediump float')
    expect(notes).not.toContain('varying vec2 vUv')
    expect(notes).toContain('vec2 uv = vUv')
    expect(notes).toContain('vec3(uv.x * 1.000, uv.y * 1.000, 0.25)')
    expect(notes).toContain('gl_FragColor = vec4(color, 1.0)')
    expect(notes).toContain('vUv 我们起的名字，不是内建变量。顶点写入 UV，GPU 插值后交给片元。')
    expect(notes).toContain('UV 是表面坐标；本页平面左下 (0,0)，右上 (1,1)，与屏幕像素坐标不同。')
    expect(notes).toContain('把 U 权重调到 0，红色渐变消失')
    expect(notes).toContain('把 0.25 改成 1.0，蓝色铺满')
    expect(notes).toContain('屏幕坐标')
    expect(notes).toContain('像素调试')
    expect(notes).toContain('U → 红色')
    expect(notes).toContain('V → 绿色')
    expect(html).toContain('learn-number')
    expect(html).toContain('value="1.000"')
    expect(html).toContain('value="0.25"')
    expect(html).not.toContain('<textarea')
    expect(html).not.toContain(':::')

    const source = `vec3 color = vec3(uv.x * 1.000, uv.y * 1.000, 0.25);`
    const full = `precision mediump float;\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 uv = vUv;\n  ${source}\n  gl_FragColor = vec4(color, 1.0);\n}\n`
    expect(readWeights(source)).toEqual({ u: 1, v: 1, blue: 0.25 })
    expect(writeWeight(source, 'x', 0)).toContain('uv.x * 0.000')
    expect(writeWeight(source, 'y', 0.5)).toContain('uv.y * 0.500')
    expect(writeWeight(source, 'x', 0)).toContain('0.25')
    expect(uvMain(full).startsWith('void main() {')).toBe(true)
    expect(uvMain(full)).not.toContain('precision')
    expect(replaceUvMain(full, 'void main() {\n}\n')).toBe('precision mediump float;\nvarying vec2 vUv;\n\nvoid main() {\n}\n')
    expect(colorAt([0.03, 0.83], { u: 1, v: 1, blue: 0.25 })).toEqual([0.03, 0.83, 0.25])
  })
})
