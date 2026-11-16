import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { previewRuntimeFiles } from '../learn-preview'

type PreviewComponent = (props: {
  dependencies?: Record<string, string>
  files: Record<string, string>
  style?: CSSProperties
  tailwind?: boolean
  title?: string
}) => ReactNode

export function LessonStage({ dependencies, files, resetKey }: { dependencies?: Record<string, string>, files: Record<string, string>, resetKey: string }) {
  const [host, setHost] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setHost(document.getElementById('learn-stage'))
  }, [resetKey])

  if (!host)
    return null

  return createPortal(<LessonPreview key={resetKey} dependencies={dependencies} files={files} />, host)
}

function LessonPreview({ dependencies, files }: { dependencies?: Record<string, string>, files: Record<string, string> }) {
  const runtimeFiles = previewRuntimeFiles(files)
  const [Preview, setPreview] = useState<PreviewComponent | null>(null)

  useEffect(() => {
    let alive = true
    import('devjar').then(mod => {
      if (alive)
        setPreview(() => mod.DevJar)
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="absolute inset-0">
      {Preview
        ? (
            <Preview
              dependencies={dependencies}
              files={runtimeFiles}
              style={{ background: '#101b23', border: 0, display: 'block', height: '100%', width: '100%' }}
              tailwind={false}
              title="实例"
            />
          )
        : null}
    </div>
  )
}
