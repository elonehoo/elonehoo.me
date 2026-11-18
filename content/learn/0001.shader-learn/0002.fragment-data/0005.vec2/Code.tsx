import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'

export function explainSource(x: number, y: number) {
  return `vec2 point = vec2(${x.toFixed(2)}, ${y.toFixed(2)});
// 这两个分量决定左边圆点的位置
// point.x → 左右
// point.y → 上下`
}

export function readPoint(source: string) {
  const match = source.match(/vec2\s+point\s*=\s*vec2\(\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/)
  if (!match)
    return
  return { x: Number(match[1]), y: Number(match[2]) }
}

export function writePoint(source: string, x: number, y: number) {
  return source.replace(
    /vec2\s+point\s*=\s*vec2\(\s*[\d.]+\s*,\s*[\d.]+\s*\)/,
    `vec2 point = vec2(${x.toFixed(3)}, ${y.toFixed(3)})`,
  )
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
      if (data?.type !== 'learn-vec2-uv' || !Array.isArray(data.uv) || data.uv.length < 2)
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
  const point = readPoint(code)
  const uv = usePreviewUv()
  const x = point?.x ?? 0.65
  const y = point?.y ?? 0.4

  function commit(nextX: number, nextY: number) {
    lesson?.setCode(writePoint(code, nextX, nextY))
  }

  return (
    <>
      <BelowPreview>
        <div className="learn-rule">
          <div className="learn-rule-hud">
            <p>{uv ? `(${uv[0].toFixed(2)}, ${uv[1].toFixed(2)})` : ''}</p>
            <div className="learn-rule-actions">
              <button type="button" onClick={() => lesson?.setCode(base)}>重置</button>
            </div>
          </div>
          <div className="learn-types-grid">
            <label>
              <span>X · 左右</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={x}
                disabled={!point}
                aria-label="X · 左右"
                onChange={event => commit(Number(event.target.value), y)}
              />
              <output>{x.toFixed(2)}</output>
            </label>
            <label>
              <span>Y · 上下</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={y}
                disabled={!point}
                aria-label="Y · 上下"
                onChange={event => commit(x, Number(event.target.value))}
              />
              <output>{y.toFixed(2)}</output>
            </label>
          </div>
        </div>
      </BelowPreview>
      <LessonCode
        code={explainSource(x, y)}
        lang="glsl"
        onChange={(next) => {
          const edited = readPoint(next)
          if (edited)
            commit(edited.x, edited.y)
        }}
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
