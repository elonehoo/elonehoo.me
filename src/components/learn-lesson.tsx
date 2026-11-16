import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type LearnLessonValue = {
  cells: number
  code: string | null
  mode: 0 | 1
  setCells: (value: number) => void
  setCode: (value: string) => void
  setMode: (value: 0 | 1) => void
  setSpeed: (value: number) => void
  speed: number
}

const LearnLessonContext = createContext<LearnLessonValue | null>(null)

export function LearnLessonProvider({ children, code, path, setCode }: {
  children: ReactNode
  code: string | null
  path: string
  setCode: (value: string) => void
}) {
  const [cells, setCells] = useState(12)
  const [speed, setSpeed] = useState(24)
  const [mode, setMode] = useState<0 | 1>(0)

  useEffect(() => {
    setCells(12)
    setSpeed(24)
    setMode(0)
  }, [path])

  useEffect(() => {
    function onReady(event: MessageEvent) {
      if (event.data?.type !== 'learn-ready')
        return
      const frame = event.source as Window | null
      frame?.postMessage({ type: 'learn-cpu-control', cells, speed, mode }, '*')
      if (code)
        frame?.postMessage({ type: 'learn-fragment', source: code }, '*')
    }
    window.addEventListener('message', onReady)
    const iframe = document.querySelector('#learn-stage iframe') as HTMLIFrameElement | null
    iframe?.contentWindow?.postMessage({ type: 'learn-cpu-control', cells, speed, mode }, '*')
    return () => window.removeEventListener('message', onReady)
  }, [cells, code, mode, speed])

  return (
    <LearnLessonContext.Provider value={{ cells, code, mode, setCells, setCode, setMode, setSpeed, speed }}>
      {children}
    </LearnLessonContext.Provider>
  )
}

export function useLearnLesson() {
  return useContext(LearnLessonContext)
}
