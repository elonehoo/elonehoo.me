import type { CSSProperties } from 'react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { highlighter } from '../lib/shiki-rehype'
import { replaceCodeNumber } from '../learn-preview'

const themes = {
  light: 'vitesse-light',
  dark: 'vitesse-dark',
} as const

export function CompareCode({ c, glsl }: { c: string, glsl: string }) {
  return (
    <div className="learn-compare">
      <section>
        <h3>C · CPU 逐个</h3>
        <LessonCode code={c} lang="c" />
      </section>
      <section>
        <h3>GLSL · GPU 同时</h3>
        <LessonCode code={glsl} lang="glsl" />
      </section>
    </div>
  )
}

export function LessonCode({ code, editable, lang, onChange }: {
  code: string
  editable?: (value: string) => boolean
  lang: string
  onChange?: (code: string) => void
}) {
  if (!onChange)
    return <ReadonlyCode code={code} lang={lang} />

  const highlighted = highlighter.codeToTokens(code, { lang: lang as 'c' | 'glsl', themes })
  const foreground = themeStyle(highlighted.fg, 'color')
  const background = themeStyle(highlighted.bg, 'backgroundColor')
  let numberIndex = 0

  return (
    <div className="lesson-code prose-md">
      <pre className="shiki shiki-themes vitesse-light vitesse-dark" style={{ ...foreground, ...background }}>
        <code>
          {highlighted.tokens.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              <span className="line">
                {line.map((token, tokenIndex) => {
                  if (!isNumberToken(token.content) || (editable && !editable(token.content)))
                    return <span key={tokenIndex} style={token.htmlStyle}>{token.content}</span>
                  const index = numberIndex++
                  return (
                    <NumberToken
                      key={tokenIndex}
                      index={index}
                      source={code}
                      style={token.htmlStyle}
                      value={token.content}
                      onChange={onChange}
                    />
                  )
                })}
              </span>
              {lineIndex < highlighted.tokens.length - 1 ? '\n' : null}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}

function ReadonlyCode({ code, lang }: { code: string, lang: string }) {
  const html = highlighter.codeToHtml(code, { lang, themes })
  return <div className="lesson-code prose-md" dangerouslySetInnerHTML={{ __html: html }} />
}

function NumberToken({ index, onChange, source, style, value }: {
  index: number
  onChange: (code: string) => void
  source: string
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
    if (!isNumberToken(next)) {
      setText(value)
      return
    }
    onChange(replaceCodeNumber(source, index, next))
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
        if (isNumberToken(next))
          commit(next)
      }}
      onBlur={() => commit(text)}
      onKeyDown={(event) => {
        if (event.key === 'Enter')
          event.currentTarget.blur()
      }}
      onPointerDown={(event) => {
        const sample = isNumberToken(text) ? text : value
        drag.current = { moved: false, sample, start: Number(sample), x: event.clientX }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        const state = drag.current
        if (!state) return
        const distance = event.clientX - state.x
        if (!state.moved && Math.abs(distance) < 4) return
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

function isNumberToken(value: string) {
  return /^-?(?:\d+\.\d*|\.\d+|\d+)$/.test(value)
}

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
