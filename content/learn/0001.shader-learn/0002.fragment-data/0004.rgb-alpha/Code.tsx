import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'

export const skyBlue = { r: 0.25, g: 0.62, b: 0.95 }

export const skyHint = '目标参数：R · 红 = 0.25，G · 绿 = 0.62，B · 蓝 = 0.95，A · 不透明度 = 1'

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

export function readColor(source: string) {
  const color = source.match(/vec3\s+color\s*=\s*vec3\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/)
  const alpha = source.match(/vec4\(\s*color\s*,\s*([\d.]+)\s*\)/)
  if (!color || !alpha)
    return
  return {
    r: Number(color[1]),
    g: Number(color[2]),
    b: Number(color[3]),
    a: Number(alpha[1]),
  }
}

export function writeRgb(source: string, r: number, g: number, b: number) {
  return source.replace(
    /vec3\s+color\s*=\s*vec3\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)/,
    `vec3 color = vec3(${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)})`,
  )
}

export function writeAlpha(source: string, alpha: number) {
  return source.replace(
    /vec4\(\s*color\s*,\s*[\d.]+\s*\)/,
    `vec4(color, ${alpha.toFixed(3)})`,
  )
}

export function colorMatch(color: { b: number, g: number, r: number } | undefined) {
  if (!color)
    return 0
  const now = Math.hypot(color.r - skyBlue.r, color.g - skyBlue.g, color.b - skyBlue.b)
  const from = Math.hypot(0.96 - skyBlue.r, 0.43 - skyBlue.g, 0.3 - skyBlue.b)
  return Math.round(Math.max(0, Math.min(1, 1 - now / from)) * 100)
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
      if (data?.type !== 'learn-rgba-uv' || !Array.isArray(data.uv) || data.uv.length < 2)
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

function Channel({
  disabled,
  label,
  max = 1,
  onChange,
  value,
}: {
  disabled: boolean
  label: string
  max?: number
  onChange: (value: number) => void
  value: number
}) {
  return (
    <label>
      <span>{label}</span>
      <input
        type="range"
        min="0"
        max={max}
        step="0.01"
        value={value}
        disabled={disabled}
        aria-label={label}
        onChange={event => onChange(Number(event.target.value))}
      />
      <output>{value.toFixed(2)}</output>
    </label>
  )
}

function Board({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  const color = readColor(code)
  const uv = usePreviewUv()
  const [debug, setDebug] = useState(false)
  const [hint, setHint] = useState(false)
  const score = colorMatch(color)

  function commit(next: string) {
    lesson?.setCode(next)
  }

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
                  commit(base)
                  setDebug(false)
                }}
              >
                重置
              </button>
            </div>
          </div>
          {debug && color && (
            <p className="learn-rule-readout">
              rgba {color.r.toFixed(3)} {color.g.toFixed(3)} {color.b.toFixed(3)} {color.a.toFixed(3)}
            </p>
          )}
          <div className="learn-types-grid">
            <Channel
              label="R · 红"
              value={color?.r ?? 0.96}
              disabled={!color}
              onChange={value => color && commit(writeRgb(code, value, color.g, color.b))}
            />
            <Channel
              label="G · 绿"
              value={color?.g ?? 0.43}
              disabled={!color}
              onChange={value => color && commit(writeRgb(code, color.r, value, color.b))}
            />
            <Channel
              label="B · 蓝"
              value={color?.b ?? 0.3}
              disabled={!color}
              onChange={value => color && commit(writeRgb(code, color.r, color.g, value))}
            />
            <Channel
              label="A · 不透明度"
              value={color?.a ?? 1}
              disabled={!color}
              onChange={value => commit(writeAlpha(code, value))}
            />
          </div>
          <div className="learn-rule-task">
            <span className="learn-rgba-swatch" aria-hidden="true" />
            <div>
              <p className="learn-rule-task-meta">
                <small>习题</small>
                <small>调参数</small>
                <span className="learn-rgba-score">{score}%</span>
              </p>
              <p>调出这块天空蓝</p>
              <button type="button" aria-expanded={hint} onClick={() => setHint(value => !value)}>提示</button>
              {hint && (
                <div className="learn-rule-hint">
                  <p>{skyHint}</p>
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
