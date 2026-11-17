import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'

const shapePattern = /smoothstep\(\s*([\d.]+)\s*,\s*[\d.]+\s*\+\s*([\d.]+)\s*,/

export function readShape(source: string) {
  const match = source.match(shapePattern)
  if (!match)
    return
  return { radius: Number(match[1]), softness: Number(match[2]) }
}

export function writeShape(source: string, radius: number, softness: number) {
  const r = radius.toFixed(3)
  const s = softness.toFixed(3)
  return source.replace(shapePattern, `smoothstep(${r}, ${r} + ${s},`)
}

export function isSquare(source: string) {
  const match = source.match(/float\s+d\s*=\s*([^;]+);/)
  if (!match)
    return false
  return /max\s*\(/.test(match[1]) && /abs\s*\(/.test(match[1]) && !/length\s*\(/.test(match[1])
}

export function shaderMain(source: string) {
  const at = source.search(/^void main\s*\(/m)
  return at < 0 ? source : source.slice(at)
}

export function replaceMain(source: string, main: string) {
  const at = source.search(/^void main\s*\(/m)
  if (at < 0)
    return main
  return `${source.slice(0, at)}${main}`
}

export function circleAt(p: [number, number], radius: number, softness: number) {
  const d = Math.hypot(p[0], p[1])
  return { circle: 1 - smoothstep(radius, radius + softness, d), d }
}

function smoothstep(edge0: number, edge1: number, x: number) {
  if (edge0 === edge1)
    return x < edge0 ? 0 : 1
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function BelowPreview({ children }: { children: ReactNode }) {
  const [host, setHost] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setHost(document.getElementById('learn-under'))
  }, [])

  if (!host)
    return children
  return createPortal(children, host)
}

function useRuleSample() {
  const [pointer, setPointer] = useState<[number, number] | null>(null)

  useEffect(() => {
    function ask() {
      const iframe = document.querySelector('#learn-stage iframe') as HTMLIFrameElement | null
      iframe?.contentWindow?.postMessage({ type: 'learn-rule-ready' }, '*')
    }

    function onMessage(event: MessageEvent) {
      if (event.data?.type === 'learn-ready')
        ask()
      if (event.data?.type !== 'learn-rule')
        return
      if (event.data.p)
        setPointer(event.data.p)
    }

    window.addEventListener('message', onMessage)
    ask()
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return { pointer }
}

function Board({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  const shape = readShape(code)
  const { pointer } = useRuleSample()
  const [debug, setDebug] = useState(false)
  const sample = pointer && shape ? circleAt(pointer, shape.radius, shape.softness) : null

  function change(radius: number, softness: number) {
    if (!shape)
      return
    lesson?.setCode(writeShape(code, radius, softness))
  }

  return (
    <>
    <BelowPreview>
    <div className="learn-rule">
      <div className="learn-rule-hud">
        <p>
          屏幕坐标
          {pointer ? ` (${pointer[0].toFixed(2)}, ${pointer[1].toFixed(2)})` : ''}
        </p>
        <div className="learn-rule-actions">
          <button type="button" aria-pressed={debug} onClick={() => setDebug(value => !value)}>像素调试</button>
          <button
            type="button"
            onClick={() => {
              lesson?.setCode(base)
              setDebug(false)
            }}
          >
            重置
          </button>
        </div>
      </div>
      {debug && sample && (
        <p className="learn-rule-readout">
          d {sample.d.toFixed(3)}
          <span>circle {sample.circle.toFixed(3)}</span>
        </p>
      )}
      <div className="learn-rule-sliders">
        <label>
          <span>圆的半径</span>
          <input
            type="range"
            min="0"
            max="0.8"
            step="0.01"
            value={shape?.radius ?? 0.3}
            disabled={!shape}
            aria-label="圆的半径"
            onChange={event => change(Number(event.target.value), shape?.softness ?? 0.04)}
          />
          <output>{(shape?.radius ?? 0.3).toFixed(2)}</output>
        </label>
        <label>
          <span>边缘柔和度</span>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.001"
            value={shape?.softness ?? 0.04}
            disabled={!shape}
            aria-label="边缘柔和度"
            onChange={event => change(shape?.radius ?? 0.3, Number(event.target.value))}
          />
          <output>{(shape?.softness ?? 0.04).toFixed(3)}</output>
        </label>
      </div>
    </div>
    </BelowPreview>
    <LessonCode
      code={shaderMain(code)}
      lang="glsl"
      onChange={next => lesson?.setCode(replaceMain(code, next))}
    />
    </>
  )
}

function Task({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  const [hint, setHint] = useState(false)
  const solved = isSquare(code)

  return (
    <div className="learn-rule-task">
      <span className="learn-rule-swatch" aria-hidden="true" />
      <div>
        <p className="learn-rule-task-meta">
          <small>习题</small>
          <small>改代码</small>
          {solved && <strong>完成</strong>}
        </p>
        <p>把圆改成正方形：改代码，不是拖滑块</p>
        <button type="button" aria-expanded={hint} onClick={() => setHint(value => !value)}>提示</button>
        {hint && (
          <div className="learn-rule-hint">
            <p>正方形的“距离”是 x、y 绝对值里较大的那个：<code>max(abs(p.x), abs(p.y))</code></p>
            <p>答案：<code>float d = max(abs(p.x), abs(p.y));</code></p>
          </div>
        )}
      </div>
    </div>
  )
}

function Source({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  return <LessonCode code={lesson?.code || base} lang="glsl" onChange={lesson?.setCode} />
}

export default function Lesson({ file = '', show }: { file?: string, show?: string }) {
  if (show === 'source')
    return <Source file={file} />
  if (show === 'task')
    return <Task file={file} />
  return <Board file={file} />
}
