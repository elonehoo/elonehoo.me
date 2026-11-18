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

export function readWeights(source: string) {
  const match = source.match(/vec3\(\s*uv\.x\s*\*\s*([\d.]+)\s*,\s*uv\.y\s*\*\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/)
  if (!match)
    return
  return { u: Number(match[1]), v: Number(match[2]), blue: Number(match[3]) }
}

export function writeWeight(source: string, channel: 'x' | 'y', value: number) {
  const pattern = channel === 'x' ? /uv\.x\s*\*\s*[\d.]+/ : /uv\.y\s*\*\s*[\d.]+/
  return source.replace(pattern, `uv.${channel} * ${value.toFixed(3)}`)
}

export function colorAt(uv: [number, number], weight: { blue: number, u: number, v: number }) {
  return [uv[0] * weight.u, uv[1] * weight.v, weight.blue]
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
      if (data?.type !== 'learn-uv-pointer' || !Array.isArray(data.uv) || data.uv.length < 2)
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
  const weight = readWeights(code)
  const uv = usePreviewUv()
  const [debug, setDebug] = useState(false)
  const u = weight?.u ?? 1
  const v = weight?.v ?? 1
  const sample = debug && uv && weight ? colorAt(uv, weight) : null

  function commit(channel: 'x' | 'y', value: number) {
    lesson?.setCode(writeWeight(code, channel, value))
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
                  lesson?.setCode(base)
                  setDebug(false)
                }}
              >
                重置
              </button>
            </div>
          </div>
          <p className="learn-uv-readout">
            uv
            {uv ? <strong>{` ${uv[0].toFixed(2)}, ${uv[1].toFixed(2)}`}</strong> : null}
          </p>
          {sample && (
            <p className="learn-rule-readout">
              color {sample[0].toFixed(3)} {sample[1].toFixed(3)} {sample[2].toFixed(3)}
            </p>
          )}
          <div className="learn-types-grid">
            <label>
              <span>U → 红色</span>
              <input
                type="range"
                min="0"
                max={Math.max(1, u)}
                step="0.01"
                value={u}
                disabled={!weight}
                aria-label="U → 红色"
                onChange={event => commit('x', Number(event.target.value))}
              />
              <output>{u.toFixed(2)}</output>
            </label>
            <label>
              <span>V → 绿色</span>
              <input
                type="range"
                min="0"
                max={Math.max(1, v)}
                step="0.01"
                value={v}
                disabled={!weight}
                aria-label="V → 绿色"
                onChange={event => commit('y', Number(event.target.value))}
              />
              <output>{v.toFixed(2)}</output>
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
