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

export function readCell(source: string) {
  const match = source.match(/floor\(gl_FragCoord\.xy\s*\/\s*([\d.]+)\)\s*\*\s*[\d.]+/)
  if (!match)
    return
  return { size: Number(match[1]) }
}

export function writeCell(source: string, size: number) {
  const next = size.toFixed(3)
  return source.replace(
    /floor\(gl_FragCoord\.xy\s*\/\s*[\d.]+\s*\)\s*\*\s*[\d.]+/,
    `floor(gl_FragCoord.xy / ${next}) * ${next}`,
  )
}

export function screenOf(pixel: [number, number], resolution: [number, number]) {
  return [pixel[0] / resolution[0], pixel[1] / resolution[1]]
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

function usePreviewPointer() {
  const [sample, setSample] = useState<{
    pixel: [number, number]
    resolution: [number, number]
    uv: [number, number]
  } | null>(null)

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data as { pixel?: unknown, resolution?: unknown, type?: string, uv?: unknown } | null
      if (data?.type !== 'learn-screen-pointer' || !Array.isArray(data.uv) || !Array.isArray(data.pixel) || !Array.isArray(data.resolution))
        return
      const uv = [Number(data.uv[0]), Number(data.uv[1])] as [number, number]
      const pixel = [Number(data.pixel[0]), Number(data.pixel[1])] as [number, number]
      const resolution = [Number(data.resolution[0]), Number(data.resolution[1])] as [number, number]
      if ([...uv, ...pixel, ...resolution].every(Number.isFinite) && resolution[0] > 0 && resolution[1] > 0)
        setSample({ uv, pixel, resolution })
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return sample
}

function Board({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  const cell = readCell(code)
  const pointer = usePreviewPointer()
  const [debug, setDebug] = useState(false)
  const size = cell?.size ?? 24
  const divided = debug && pointer ? screenOf(pointer.pixel, pointer.resolution) : null

  return (
    <>
      <BelowPreview>
        <div className="learn-rule">
          <div className="learn-rule-hud">
            <p>
              屏幕坐标
              {pointer ? ` (${pointer.uv[0].toFixed(2)}, ${pointer.uv[1].toFixed(2)})` : ''}
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
            像素位置
            {pointer ? <strong>{` ${pointer.pixel[0].toFixed(1)}, ${pointer.pixel[1].toFixed(1)}`}</strong> : null}
          </p>
          {divided && (
            <p className="learn-rule-readout">
              screenUv {divided[0].toFixed(3)} {divided[1].toFixed(3)}
            </p>
          )}
          <div className="learn-rule-sliders">
            <label>
              <span>每一格的像素数</span>
              <input
                type="range"
                min="1"
                max={Math.max(64, Math.round(size))}
                step="1"
                value={size}
                disabled={!cell}
                aria-label="每一格的像素数"
                onChange={event => lesson?.setCode(writeCell(code, Number(event.target.value)))}
              />
              <output>{Number.isInteger(size) ? size : size.toFixed(3)}</output>
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
