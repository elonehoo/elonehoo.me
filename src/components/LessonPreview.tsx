import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { LessonDevPreview } from './LessonDevPreview'

export function LessonStage({ file, resetKey }: { file: string, resetKey: string }) {
  const [host, setHost] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setHost(document.getElementById('learn-stage'))
  }, [resetKey])

  if (!host)
    return null

  return createPortal(<LessonDevPreview key={resetKey} file={file} />, host)
}
