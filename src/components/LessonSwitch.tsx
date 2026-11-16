import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

export function LessonSwitch({ code, codeLabel, explain, resetKey }: {
  code?: ReactNode
  codeLabel: string
  explain: ReactNode
  resetKey: string
}) {
  const [view, setView] = useState<'code' | 'explain'>('explain')

  useEffect(() => {
    setView('explain')
  }, [resetKey])

  if (!code) {
    return (
      <div className="learn-panel-body">
        <div className="learn-notes">{explain}</div>
      </div>
    )
  }

  return (
    <>
      <div className="learn-bar">
        <strong>{view === 'explain' ? '讲解' : codeLabel}</strong>
        <button
          type="button"
          aria-pressed={view === 'code'}
          onClick={() => setView(view === 'explain' ? 'code' : 'explain')}
        >
          {view === 'code' ? '讲解' : '完整代码'}
        </button>
      </div>
      <div className="learn-panel-body">
        <div hidden={view !== 'code'}>{code}</div>
        <div className="learn-notes" hidden={view !== 'explain'}>{explain}</div>
      </div>
    </>
  )
}
