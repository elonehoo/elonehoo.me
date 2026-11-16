import type { CSSProperties } from 'react'
import { DevJar } from 'devjar'

const frameStyle: CSSProperties = {
  background: '#101b23',
  border: 0,
  display: 'block',
  height: '100%',
  width: '100%',
}

export function LessonDevPreview({ dependencies, files }: {
  dependencies?: Record<string, string>
  files: Record<string, string>
}) {
  return (
    <div className="absolute inset-0">
      <DevJar dependencies={dependencies} files={files} style={frameStyle} tailwind={false} title="实例" />
    </div>
  )
}
