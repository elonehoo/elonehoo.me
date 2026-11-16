import type { ReactElement, ReactNode } from 'react'
import { Children, isValidElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { lessonFileComponent, useLessonFile } from './learn-widgets'
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

export function LessonFrame({ children, preview }: { children?: ReactNode, preview?: string }) {
  const file = useLessonFile()
  const [host, setHost] = useState<HTMLElement | null>(null)
  const Preview = file && preview ? lessonFileComponent(file, preview) : undefined

  useEffect(() => {
    setHost(document.getElementById('learn-stage'))
  }, [])

  return (
    <>
      {host && Preview
        ? createPortal(<Preview file={file} />, host)
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
