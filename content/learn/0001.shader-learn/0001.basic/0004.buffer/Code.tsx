import { filesBesideMarkdown } from '#/learn-preview'
import { useLearnLesson } from '#/components/learn-lesson'
import { LessonCode } from '#/components/LessonCode'

const overwrite = '  gl_FragColor = vec4(0.300, 0.700, 1.000, 1.000); // 覆盖\n'

function byte(value: number) {
  return Math.round(Math.min(1, Math.max(0, value)) * 255)
}

function bufferBytes(source: string) {
  const writes = [...source.matchAll(/gl_FragColor = vec4\(([^)]+)\)/g)]
  const last = writes.at(-1)?.[1] ?? ''
  if (last.includes('color')) {
    const color = source.match(/vec3\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/)
    const alpha = last.match(/color\s*,\s*([\d.]+)/)
    const rgba = color
      ? [Number(color[1]), Number(color[2]), Number(color[3]), alpha ? Number(alpha[1]) : 1]
      : [0, 0, 0, 1]
    return rgba.map(byte)
  }
  return (last.match(/[\d.]+/g) ?? ['0', '0', '0', '1']).map(value => byte(Number(value)))
}

function withRewrite(source: string, enabled: boolean) {
  const plain = source.replace(overwrite, '')
  if (!enabled)
    return plain
  return plain.replace(/\n}\s*$/, `\n${overwrite}}`)
}

export default function Lesson({ file = '', show }: { file?: string, show?: string }) {
  const lesson = useLearnLesson()
  const base = filesBesideMarkdown(file).code['fragment.glsl'] || ''
  const code = lesson?.code || base
  if (show === 'bytes')
    return <code className="learn-rgba-bytes">[{bufferBytes(code).join(', ')}]</code>
  if (!lesson)
    return null

  const rewrite = code.includes(overwrite.trim())

  return (
    <div className="learn-rgba">
      <LessonCode code={code} lang="glsl" onChange={lesson.setCode} />
      <button
        type="button"
        aria-pressed={rewrite}
        onClick={() => lesson.setCode(withRewrite(code, !rewrite))}
      >
        继续改写颜色
      </button>
    </div>
  )
}
