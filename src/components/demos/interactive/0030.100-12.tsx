import { useCallback, useEffect, useRef } from 'react'

export default function NumberCounter({ targetNumber = 4000 }: { targetNumber?: number }) {
  const frameRef = useRef(0)
  const valueRef = useRef<HTMLElement>(null)

  const startCounter = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    const started = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 1000, 1)
      const eased = 1 - (1 - progress) ** 3
      if (valueRef.current)
        valueRef.current.textContent = `${Math.round(targetNumber * eased).toLocaleString()}+`
      if (progress < 1)
        frameRef.current = requestAnimationFrame(tick)
    }
    if (valueRef.current)
      valueRef.current.textContent = '0+'
    frameRef.current = requestAnimationFrame(tick)
  }, [targetNumber])

  useEffect(() => {
    startCounter()
    return () => cancelAnimationFrame(frameRef.current)
  }, [startCounter])

  return (
    <div className="demo-counter">
      <strong ref={valueRef} aria-live="polite">0+</strong>
      <button type="button" onClick={startCounter}>Start Counter</button>
      <style>
        {`
        .demo-counter { display:flex; flex-direction:column; align-items:center; gap:18px; color:#0f172a; }
        .dark .demo-counter { color:#fff; } .demo-counter strong { font-size:48px; line-height:1; font-variant-numeric:tabular-nums; }
        .demo-counter button { border:1px solid #d1d5db; border-radius:7px; padding:8px 12px; background:#fff; color:#111827; font:600 14px ui-monospace,SFMono-Regular,monospace; cursor:pointer; }
        .dark .demo-counter button { border-color:#4b5563; background:#1f2937; color:#fff; }
      `}
      </style>
    </div>
  )
}
