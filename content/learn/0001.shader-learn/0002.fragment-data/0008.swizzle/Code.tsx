import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'

export const orders = [
  { id: 'rgb', label: '.rgb 原样' },
  { id: 'bgr', label: '.bgr 重新排列' },
  { id: 'rrr', label: '.rrr 复制分量' },
]

export const swapHint = 'vec3 color = original.grb;'

const channelOf: Record<string, 'u' | 'v' | 'b'> = {
  r: 'u',
  g: 'v',
  b: 'b',
  x: 'u',
  y: 'v',
  z: 'b',
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

export function readSwizzle(source: string) {
  const match = source.match(/vec3\s+color\s*=\s*original\.([xyzwrgba]+)/)
  if (!match)
    return
  return match[1]
}

export function writeSwizzle(source: string, swizzle: string) {
  return source.replace(
    /vec3\s+color\s*=\s*original\.[xyzwrgba]+/,
    `vec3 color = original.${swizzle}`,
  )
}

export function readBlue(source: string) {
  const match = source.match(/vec3\s+original\s*=\s*vec3\(\s*vUv\.x\s*,\s*vUv\.y\s*,\s*([\d.]+)\s*\)/)
  if (!match)
    return
  return Number(match[1])
}

export function applySwizzle(color: [number, number, number], swizzle: string) {
  const out: number[] = []
  for (const char of swizzle) {
    const channel = channelOf[char]
    if (!channel)
      return
    out.push(channel === 'u' ? color[0] : channel === 'v' ? color[1] : color[2])
  }
  if (out.length !== 3)
    return
  return out as [number, number, number]
}

function expectAbs(left: string, right: string, blue: number) {
  const a = channelOf[left]
  const b = channelOf[right]
  if (!a || !b || a === b)
    return 0
  if ((a === 'u' && b === 'v') || (a === 'v' && b === 'u'))
    return 1 / 3
  return (blue * blue + (1 - blue) * (1 - blue)) / 2
}

export function swizzleScore(swizzle: string, blue = 0.2) {
  if (!applySwizzle([0, 0, blue], swizzle))
    return 0
  const target = 'grb'
  let sum = 0
  for (let index = 0; index < 3; index++)
    sum += expectAbs(swizzle[index], target[index], blue)
  return Math.round((sum / 3) * 100)
}

function cssColor(color: [number, number, number]) {
  const channel = (value: number) => Math.round(Math.min(1, Math.max(0, value)) * 255)
  return `rgb(${channel(color[0])}, ${channel(color[1])}, ${channel(color[2])})`
}

function swatchStyle(swizzle: string, blue: number): CSSProperties {
  const rows = 12
  const images: string[] = []
  const positions: string[] = []
  for (let row = 0; row < rows; row++) {
    const y = 1 - (row + 0.5) / rows
    const left = applySwizzle([0, y, blue], swizzle)
    const right = applySwizzle([1, y, blue], swizzle)
    images.push(`linear-gradient(to right, ${left ? cssColor(left) : 'transparent'}, ${right ? cssColor(right) : 'transparent'})`)
    positions.push(`0 ${(row * 100) / rows}%`)
  }
  return {
    backgroundImage: images.join(', '),
    backgroundPosition: positions.join(', '),
    backgroundRepeat: 'no-repeat',
    backgroundSize: `100% ${100 / rows}%`,
  }
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

function usePreviewUv() {
  const [uv, setUv] = useState<[number, number] | null>(null)

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data as { type?: string, uv?: unknown } | null
      if (data?.type !== 'learn-swizzle-pointer' || !Array.isArray(data.uv) || data.uv.length < 2)
        return
      const x = Number(data.uv[0])
      const y = Number(data.uv[1])
      if (Number.isFinite(x) && Number.isFinite(y))
        setUv([x, y])
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return uv
}

function useDebugMarker(debug: boolean) {
  useEffect(() => {
    function send(target?: Window | null) {
      const frame = target ?? (document.querySelector('#learn-stage iframe') as HTMLIFrameElement | null)?.contentWindow
      frame?.postMessage({ type: 'learn-pixel-debug', on: debug }, '*')
    }

    function onMessage(event: MessageEvent) {
      if (event.data?.type === 'learn-ready')
        send(event.source as Window)
    }

    window.addEventListener('message', onMessage)
    send()
    return () => window.removeEventListener('message', onMessage)
  }, [debug])
}

const targetSwatch = swatchStyle('grb', 0.2)

function Board({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  const swizzle = readSwizzle(code)
  const blue = readBlue(code) ?? 0.2
  const uv = usePreviewUv()
  const [debug, setDebug] = useState(false)
  const [hint, setHint] = useState(false)
  useDebugMarker(debug)
  const score = swizzle ? swizzleScore(swizzle, blue) : 0
  const choices = swizzle && orders.some(item => item.id === swizzle)
    ? orders
    : [...orders, ...(swizzle ? [{ id: swizzle, label: `.${swizzle}` }] : [])]
  const sample = debug && uv && swizzle ? applySwizzle([uv[0], uv[1], blue], swizzle) : null

  return (
    <>
      <BelowPreview>
        <div className="learn-rule">
          <div className="learn-rule-hud">
            <p>
              屏幕坐标
              {uv ? ` (${uv[0].toFixed(2)}, ${uv[1].toFixed(2)})` : ''}
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
          {sample && (
            <p className="learn-rule-readout">
              color {sample[0].toFixed(3)} {sample[1].toFixed(3)} {sample[2].toFixed(3)}
            </p>
          )}
          <label className="learn-swizzle-row">
            <span>排列</span>
            <select
              value={swizzle ?? 'rgb'}
              disabled={!swizzle}
              aria-label="排列"
              onChange={event => lesson?.setCode(writeSwizzle(code, event.target.value))}
            >
              {choices.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
          <div className="learn-rule-task">
            <span className="learn-swizzle-swatch" aria-hidden="true" style={targetSwatch} />
            <div>
              <p className="learn-rule-task-meta">
                <small>习题</small>
                <small>改代码</small>
                <span className="learn-rgba-score">{score}%</span>
              </p>
              <p>写出一个新的排列：绿色和红色互换</p>
              <button type="button" aria-expanded={hint} onClick={() => setHint(value => !value)}>提示</button>
              {hint && (
                <div className="learn-rule-hint">
                  <p>{swapHint}</p>
                </div>
              )}
            </div>
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

function Source({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base

  return (
    <LessonCode
      code={code}
      lang="glsl"
      onChange={next => lesson?.setCode(next)}
    />
  )
}

export default function Lesson({ file = '', show }: { file?: string, show?: string }) {
  if (show === 'source')
    return <Source file={file} />
  return <Board file={file} />
}
