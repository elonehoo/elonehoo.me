import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import { DevJar } from 'devjar'
import { lessonMarkdown, lessonRuntime } from '../learn-preview'

const frameStyle: CSSProperties = {
  background: '#101b23',
  border: 0,
  display: 'block',
  height: '100%',
  width: '100%',
}

export function LessonDevPreview({ path = '' }: { file?: string, path?: string }) {
  const markdownFile = lessonMarkdown(path)
  const preview = useMemo(() => markdownFile ? lessonRuntime(markdownFile) : undefined, [markdownFile])
  if (!preview)
    return null

  return (
    <div className="learn-dev-preview">
      <DevJar key={path} dependencies={preview.dependencies} files={preview.files} style={frameStyle} tailwind={false} title="实例" />
    </div>
  )
}
