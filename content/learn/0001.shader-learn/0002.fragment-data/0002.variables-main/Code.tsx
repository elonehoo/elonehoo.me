import { Fragment, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'
import { highlighter } from '#/lib/shiki-rehype'

export const defaultTone = { uInput: 0.7, uGain: 0.4 }

let tone = defaultTone
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function readTone() {
  return tone
}

export function writeTone(next: { uInput: number, uGain: number }) {
  if (!Number.isFinite(next.uInput) || !Number.isFinite(next.uGain))
    return
  if (tone.uInput === next.uInput && tone.uGain === next.uGain)
    return
  tone = { uInput: next.uInput, uGain: next.uGain }
  listeners.forEach(listener => listener())
}

function useTone() {
  return useSyncExternalStore(subscribe, readTone, () => defaultTone)
}

export function explainSource(uInput: number, uGain: number) {
  const input = uInput.toFixed(2)
  const gain = uGain.toFixed(2)
  const result = (uInput * uGain).toFixed(2)
  return `uniform float uInput; // ${input} 原始亮度
uniform float uGain; // ${gain} 保留比例
void main() {
  float result = uInput * uGain; // = ${result}
  vec3 color = vec3(result);
  gl_FragColor = vec4(color, 1.0);
}`
}

export function toneFromEdit(current: { uInput: number, uGain: number }, field: 'gain' | 'input' | 'result', next: number) {
  if (!Number.isFinite(next))
    return current
  if (field === 'input')
    return { uInput: next, uGain: current.uGain }
  if (field === 'gain')
    return { uInput: current.uInput, uGain: next }
  if (current.uInput === 0)
    return current
  return { uInput: current.uInput, uGain: next / current.uInput }
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

function usePointer() {
  const [pointer, setPointer] = useState<[number, number] | null>(null)

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.data?.type !== 'learn-main-uv' || !event.data.uv)
        return
      setPointer(event.data.uv)
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return pointer
}

function useToneSync() {
  const value = useTone()

  useEffect(() => {
    function send(target?: Window | null) {
      const frame = target ?? (document.querySelector('#learn-stage iframe') as HTMLIFrameElement | null)?.contentWindow
      frame?.postMessage({ type: 'learn-main', uInput: value.uInput, uGain: value.uGain }, '*')
    }

    function onMessage(event: MessageEvent) {
      if (event.data?.type === 'learn-ready')
        send(event.source as Window)
    }

    window.addEventListener('message', onMessage)
    send()
    return () => window.removeEventListener('message', onMessage)
  }, [value])

  return value
}

function presetOn(value: number, target: number) {
  return Math.abs(value - target) < 0.001
}

const themes = {
  light: 'vitesse-light',
  dark: 'vitesse-dark',
} as const

function themeStyle(value: string | undefined, property: 'backgroundColor' | 'color'): CSSProperties {
  if (!value)
    return {}
  const [color, variable] = value.split(';')
  const [name, dark] = variable?.split(':') ?? []
  return {
    [property]: color,
    ...(name ? { [name]: dark } : {}),
  }
}

function ToneNumber({ onChange, style, value }: {
  onChange: (next: string) => void
  style?: CSSProperties
  value: string
}) {
  const [text, setText] = useState(value)
  const input = useRef<HTMLInputElement>(null)
  const drag = useRef<{ moved: boolean, sample: string, start: number, x: number } | null>(null)

  useEffect(() => {
    if (document.activeElement !== input.current)
      setText(value)
  }, [value])

  function commit(next: string) {
    if (!/^-?(?:\d+\.\d*|\.\d+|\d+)$/.test(next)) {
      setText(value)
      return
    }
    onChange(next)
  }

  function format(sample: string, next: number) {
    const decimals = sample.includes('.') ? sample.split('.')[1]?.length ?? 0 : 0
    return next.toFixed(decimals)
  }

  return (
    <input
      ref={input}
      className="learn-number"
      style={style}
      value={text}
      aria-label="可修改的数值"
      size={Math.max(text.length, 1)}
      spellCheck={false}
      onChange={(event) => {
        const next = event.target.value
        setText(next)
        if (/^-?(?:\d+\.\d*|\.\d+|\d+)$/.test(next))
          commit(next)
      }}
      onBlur={() => commit(text)}
      onKeyDown={(event) => {
        if (event.key === 'Enter')
          event.currentTarget.blur()
      }}
      onPointerDown={(event) => {
        const sample = /^-?(?:\d+\.\d*|\.\d+|\d+)$/.test(text) ? text : value
        drag.current = { moved: false, sample, start: Number(sample), x: event.clientX }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        const state = drag.current
        if (!state)
          return
        const distance = event.clientX - state.x
        if (!state.moved && Math.abs(distance) < 4)
          return
        state.moved = true
        const next = format(state.sample, state.start + distance / 3 * 0.01)
        setText(next)
        commit(next)
      }}
      onPointerUp={() => {
        drag.current = null
      }}
    />
  )
}

function ExplainCode({ uGain, uInput, onChange }: {
  uGain: number
  uInput: number
  onChange: (next: { uInput: number, uGain: number }) => void
}) {
  const input = uInput.toFixed(2)
  const gain = uGain.toFixed(2)
  const result = (uInput * uGain).toFixed(2)
  const source = explainSource(uInput, uGain)
  const highlighted = highlighter.codeToTokens(source, { lang: 'glsl', themes })
  const numberStyle = highlighted.tokens.flat().find(token => /^-?(?:\d+\.\d*|\.\d+|\d+)$/.test(token.content))?.htmlStyle
  const pending: Array<{ field: 'gain' | 'input' | 'result', text: string }> = [
    { field: 'input', text: input },
    { field: 'gain', text: gain },
    { field: 'result', text: result },
  ]

  function parts(content: string) {
    const out: Array<{ field?: 'gain' | 'input' | 'result', text: string }> = []
    let rest = content
    while (pending.length && rest.includes(pending[0].text)) {
      const next = pending.shift()
      if (!next)
        break
      const at = rest.indexOf(next.text)
      if (at > 0)
        out.push({ text: rest.slice(0, at) })
      out.push({ field: next.field, text: next.text })
      rest = rest.slice(at + next.text.length)
    }
    if (rest)
      out.push({ text: rest })
    return out
  }

  return (
    <div className="lesson-code prose-md">
      <pre className="shiki shiki-themes vitesse-light vitesse-dark" style={{ ...themeStyle(highlighted.fg, 'color'), ...themeStyle(highlighted.bg, 'backgroundColor') }}>
        <code>
          {highlighted.tokens.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              <span className="line">
                {line.map((token, tokenIndex) => parts(token.content).map((part, partIndex) => (
                  part.field
                    ? (
                        <ToneNumber
                          key={`${tokenIndex}-${partIndex}`}
                          style={numberStyle}
                          value={part.text}
                          onChange={next => onChange(toneFromEdit({ uInput, uGain }, part.field!, Number(next)))}
                        />
                      )
                    : <span key={`${tokenIndex}-${partIndex}`} style={token.htmlStyle}>{part.text}</span>
                )))}
              </span>
              {lineIndex < highlighted.tokens.length - 1 ? '\n' : null}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}

function Board() {
  const value = useToneSync()
  const pointer = usePointer()
  const input = value.uInput.toFixed(2)
  const gain = value.uGain.toFixed(2)
  const result = (value.uInput * value.uGain).toFixed(2)

  return (
    <>
      <BelowPreview>
        <div className="learn-rule learn-main">
          <div className="learn-rule-hud">
            <p>{pointer ? `(${pointer[0].toFixed(2)}, ${pointer[1].toFixed(2)})` : ''}</p>
            <div className="learn-rule-actions">
              <button type="button" onClick={() => writeTone(defaultTone)}>重置</button>
            </div>
          </div>
          <p className="learn-main-result">
            最终亮度
            {' '}
            <strong>{result}</strong>
          </p>
          <div className="learn-rule-sliders">
            <label>
              <span>uInput · 原始亮度</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value.uInput}
                aria-label="uInput · 原始亮度"
                onChange={event => writeTone({ uInput: Number(event.target.value), uGain: value.uGain })}
              />
              <output>{input}</output>
            </label>
            <label>
              <span>uGain · 保留比例</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value.uGain}
                aria-label="uGain · 保留比例"
                onChange={event => writeTone({ uInput: value.uInput, uGain: Number(event.target.value) })}
              />
              <output>{gain}</output>
            </label>
          </div>
        </div>
      </BelowPreview>
      <ExplainCode
        uInput={value.uInput}
        uGain={value.uGain}
        onChange={writeTone}
      />
    </>
  )
}

function Modes() {
  const value = useTone()

  return (
    <p className="learn-main-modes">
      <button type="button" aria-pressed={presetOn(value.uGain, 1)} onClick={() => writeTone({ uInput: value.uInput, uGain: 1 })}>原样</button>
      <button type="button" aria-pressed={presetOn(value.uGain, 0.5)} onClick={() => writeTone({ uInput: value.uInput, uGain: 0.5 })}>减半</button>
      <button type="button" aria-pressed={presetOn(value.uGain, 0)} onClick={() => writeTone({ uInput: value.uInput, uGain: 0 })}>全黑</button>
    </p>
  )
}

function JsLines() {
  const value = useTone()

  return (
    <div className="learn-main-js">
      <p>{`gl.uniform1f(uInput, ${value.uInput.toFixed(2)})`}</p>
      <p>{`gl.uniform1f(uGain, ${value.uGain.toFixed(2)})`}</p>
    </div>
  )
}

function Source({ file }: { file: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  return <LessonCode code={code} lang="glsl" onChange={lesson?.setCode} />
}

export default function Lesson({ file = '', show }: { file?: string, show?: string }) {
  if (show === 'source')
    return <Source file={file} />
  if (show === 'modes')
    return <Modes />
  if (show === 'js')
    return <JsLines />
  return <Board />
}
