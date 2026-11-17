import type { ReactElement, ReactNode } from 'react'
import { Children, isValidElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { LessonDevPreview } from './LessonDevPreview'
import { useLessonFile } from './learn-widgets'
import { LessonSwitch } from './LessonSwitch'

function slotName(child: ReactElement<{ 'className'?: string, 'data-slot'?: string }>) {
  return child.props['data-slot'] || child.props.className?.match(/slot-(explain|code)/)?.[1]
}

function slot(children: ReactNode, name: string) {
  let found: ReactNode = null
  Children.forEach(children, (child) => {
    if (found || !isValidElement(child))
      return
    const props = (child as ReactElement<{ 'className'?: string, 'data-slot'?: string, 'children'?: ReactNode }>).props
    if (slotName(child as ReactElement<{ 'className'?: string, 'data-slot'?: string }>) === name)
      found = props.children
  })
  return found
}

function isDevPreview(child: ReactElement) {
  if (child.type === LessonDevPreview)
    return true
  const props = child.props as { name?: string }
  return props.name === 'dev-preview'
}

function previewNode(children: ReactNode) {
  let found: ReactElement | null = null
  Children.forEach(children, (child) => {
    if (found || !isValidElement(child) || !isDevPreview(child))
      return
    found = child
  })
  return found
}

export function LessonFrame({ children }: { children?: ReactNode }) {
  const file = useLessonFile()
  const [host, setHost] = useState<HTMLElement | null>(null)
  const preview = previewNode(children)

  useEffect(() => {
    setHost(document.getElementById('learn-stage'))
  }, [file])

  return (
    <>
      {host && preview
        ? createPortal(preview, host)
        : null}
      <LessonSwitch
        resetKey={file}
        codeLabel="代码"
        explain={slot(children, 'explain')}
        code={slot(children, 'code')}
      />
    </>
  )
}
