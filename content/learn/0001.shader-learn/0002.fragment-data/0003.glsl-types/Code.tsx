import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'

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

export function readTypes(source: string) {
  const brightness = source.match(/float\s+brightness\s*=\s*(\d+\.?\d*|\.\d+)\s*;/)
  const count = source.match(/int\s+count\s*=\s*(\d+)\s*;/)
  const invert = source.match(/bool\s+invert\s*=\s*(true|false)\s*;/)
  return {
    brightness: brightness ? Number(brightness[1]) : undefined,
    count: count ? Number(count[1]) : undefined,
    invert: invert ? invert[1] === 'true' : undefined,
  }
}

export function writeBrightness(source: string, value: number) {
  return source.replace(
    /float\s+brightness\s*=\s*(?:\d+\.?\d*|\.\d+)\s*;/,
    `float brightness = ${value.toFixed(3)};`,
  )
}

export function writeCount(source: string, value: number) {
  return source.replace(/int\s+count\s*=\s*\d+\s*;/, `int count = ${Math.round(value)};`)
}

export function writeInvert(source: string, value: boolean) {
  return source.replace(
    /bool\s+invert\s*=\s*(?:true|false|1)\s*;/,
    `bool invert = ${value};`,
  )
}

export function stripeAt(x: number, count: number, invert: boolean) {
  const scaled = x * count
  const fract = scaled - Math.floor(scaled)
  const stripe = fract >= 0.5 ? 1 : 0
  return invert ? 1 - stripe : stripe
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
      if (data?.type !== 'learn-types-uv' || !Array.isArray(data.uv) || data.uv.length < 2)
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

function Board({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  const types = readTypes(code)
  const uv = usePreviewUv()
  const [debug, setDebug] = useState(false)
  const count = types.count ?? 12
  const invert = types.invert === true

  function commit(next: string) {
    lesson?.setCode(next)
  }

  return (
    <>
      <BelowPreview>
        <div className="learn-rule learn-types">
          <div className="learn-rule-hud">
            <p>
              屏幕坐标
              {uv ? ` (${uv[0].toFixed(2)}, ${uv[1].toFixed(2)})` : ''}
              {debug && uv && types.count !== undefined
                ? <span className="learn-types-stripe">stripe {stripeAt(uv[0], types.count, invert)}</span>
                : null}
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
          <div className="learn-types-grid">
            <label>
              <span>float · 亮度</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={types.brightness ?? 1}
                disabled={types.brightness === undefined}
                aria-label="float · 亮度"
                onChange={event => commit(writeBrightness(code, Number(event.target.value)))}
              />
              <output>{(types.brightness ?? 1).toFixed(2)}</output>
            </label>
            <label>
              <span>int · 条数</span>
              <input
                type="range"
                min="1"
                max={Math.max(12, count)}
                step="1"
                value={count}
                disabled={types.count === undefined}
                aria-label="int · 条数"
                onChange={event => commit(writeCount(code, Number(event.target.value)))}
              />
              <output>{count}</output>
            </label>
            <label>
              <span>bool · 反转</span>
              <button
                type="button"
                className="learn-types-switch"
                aria-pressed={invert}
                aria-label="bool · 反转"
                disabled={!/bool\s+invert\s*=/.test(code)}
                onClick={() => commit(writeInvert(code, !invert))}
              />
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
