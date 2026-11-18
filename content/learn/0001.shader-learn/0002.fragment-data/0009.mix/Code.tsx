import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'

export const outputs = [
  { id: 'color', label: '最终颜色' },
  { id: 'a', label: 'a' },
  { id: 'b', label: 'b' },
]

export const mixHint = 't = 0.80'

const endpoints = {
  a: [0.96, 0.43, 0.3] as [number, number, number],
  b: [0.48, 0.83, 0.69] as [number, number, number],
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

function readVec3(source: string, name: string) {
  const match = source.match(new RegExp(`vec3\\s+${name}\\s*=\\s*vec3\\(\\s*([\\d.]+)\\s*,\\s*([\\d.]+)\\s*,\\s*([\\d.]+)\\s*\\)`))
  if (!match)
    return
  return [Number(match[1]), Number(match[2]), Number(match[3])] as [number, number, number]
}

export function readMix(source: string) {
  const a = readVec3(source, 'a')
  const b = readVec3(source, 'b')
  const t = source.match(/mix\(\s*a\s*,\s*b\s*,\s*([\d.]+)\s*\)/)
  const out = source.match(/gl_FragColor\s*=\s*vec4\(\s*([A-Za-z_]\w*)/)
  if (!a || !b || !t)
    return
  return { a, b, t: Number(t[1]), out: out?.[1] ?? 'color' }
}

export function writeMixT(source: string, t: number) {
  return source.replace(
    /mix\(\s*a\s*,\s*b\s*,\s*[\d.]+/,
    `mix(a, b, ${t.toFixed(3)}`,
  )
}

export function writeOutput(source: string, name: string) {
  return source.replace(
    /gl_FragColor\s*=\s*vec4\(\s*[A-Za-z_]\w*/,
    `gl_FragColor = vec4(${name}`,
  )
}

export function mixColor(a: [number, number, number], b: [number, number, number], t: number) {
  return [
    a[0] * (1 - t) + b[0] * t,
    a[1] * (1 - t) + b[1] * t,
    a[2] * (1 - t) + b[2] * t,
  ] as [number, number, number]
}

export const mint = mixColor(endpoints.a, endpoints.b, 0.8)

export function mixScore(color: [number, number, number] | undefined) {
  if (!color)
    return 0
  const now = Math.hypot(color[0] - mint[0], color[1] - mint[1], color[2] - mint[2])
  const span = Math.hypot(endpoints.a[0] - endpoints.b[0], endpoints.a[1] - endpoints.b[1], endpoints.a[2] - endpoints.b[2]) * 0.7
  return Math.round(Math.max(0, Math.min(1, 1 - now / span)) * 100)
}

export function shownColor(value: { a: [number, number, number], b: [number, number, number], out: string, t: number }) {
  if (value.out === 'a')
    return value.a
  if (value.out === 'b')
    return value.b
  return mixColor(value.a, value.b, value.t)
}

function cssColor(color: [number, number, number]) {
  const channel = (value: number) => Math.round(Math.min(1, Math.max(0, value)) * 255)
  return `rgb(${channel(color[0])}, ${channel(color[1])}, ${channel(color[2])})`
}

function formatColor(color: [number, number, number]) {
  return `(${color.map(channel => channel.toFixed(3)).join(', ')})`
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

function usePreviewPixel() {
  const [pixel, setPixel] = useState<[number, number] | null>(null)

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data as { type?: string, pixel?: unknown } | null
      if (data?.type !== 'learn-mix-pointer' || !Array.isArray(data.pixel) || data.pixel.length < 2)
        return
      const x = Number(data.pixel[0])
      const y = Number(data.pixel[1])
      if (Number.isFinite(x) && Number.isFinite(y))
        setPixel([x, y])
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return pixel
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

function Board({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  const value = readMix(code)
  const pixel = usePreviewPixel()
  const [debug, setDebug] = useState(false)
  const [hint, setHint] = useState(false)
  useDebugMarker(debug)
  const shown = value ? shownColor(value) : undefined
  const score = mixScore(shown)
  const choices = value && outputs.some(item => item.id === value.out)
    ? outputs
    : [...outputs, ...(value ? [{ id: value.out, label: value.out }] : [])]
  const rows = value
    ? [
        { name: 'a', color: value.a },
        { name: 'b', color: value.b },
        { name: 'color', color: mixColor(value.a, value.b, value.t) },
      ]
    : []

  return (
    <>
      <BelowPreview>
        <div className="learn-rule">
          <div className="learn-rule-hud">
            <div className="learn-mix-hud">
              <select
                value={value?.out ?? 'color'}
                disabled={!value}
                aria-label="最终颜色"
                onChange={event => lesson?.setCode(writeOutput(code, event.target.value))}
              >
                {choices.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
              <p>
                像素
                {pixel ? ` (${pixel[0].toFixed(1)}, ${pixel[1].toFixed(1)})` : ''}
              </p>
            </div>
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
          <div className="learn-rule-sliders">
            <label>
              <span>混合比例 t</span>
              <input
                type="range"
                min="0"
                max={Math.max(1, value?.t ?? 1)}
                step="0.01"
                value={value?.t ?? 0.5}
                disabled={!value}
                aria-label="混合比例 t"
                onChange={event => lesson?.setCode(writeMixT(code, Number(event.target.value)))}
              />
              <output>{(value?.t ?? 0.5).toFixed(2)}</output>
            </label>
          </div>
          <div className="learn-rule-task">
            <span className="learn-mix-swatch" aria-hidden="true" />
            <div>
              <p className="learn-rule-task-meta">
                <small>习题</small>
                <small>调参数</small>
                <span className="learn-rgba-score">{score}%</span>
              </p>
              <p>让颜色停在 80% 的薄荷绿</p>
              <button type="button" aria-expanded={hint} onClick={() => setHint(open => !open)}>提示</button>
              {hint && (
                <div className="learn-rule-hint">
                  <p>{mixHint}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </BelowPreview>
      <div className="learn-mix-code">
        <LessonCode
          code={shaderMain(code)}
          lang="glsl"
          onChange={next => lesson?.setCode(replaceMain(code, next))}
        />
        {rows.length > 0 && (
          <ul className="learn-mix-legend">
            <li />
            {rows.map(row => (
              <li key={row.name}>
                <i className="learn-mix-chip" style={{ background: cssColor(row.color) }} />
                {row.name} = {formatColor(row.color)}
              </li>
            ))}
          </ul>
        )}
      </div>
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
