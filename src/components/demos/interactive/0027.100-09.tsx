import { useEffect, useRef, useState } from 'react'

const charset = 'abcdefghijklmnopqrstuvwxyz'

export default function ScrambleButton({ label = 'Submit Form' }: { label?: string }) {
  const [displayText, setDisplayText] = useState(label)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach(clearTimeout)
      timers.length = 0
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDisplayText(label))
    return () => cancelAnimationFrame(frame)
  }, [label])

  function scramble() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current.length = 0
    for (let index = 0; index < label.length; index++) {
      const timer = setTimeout(() => {
        const prefix = label.slice(0, index + 1)
        const random = Array.from({ length: label.length - prefix.length }, () => charset[Math.floor(Math.random() * charset.length)]).join('')
        setDisplayText(prefix + random)
      }, (index + 1) * 50)
      timersRef.current.push(timer)
    }
  }

  return (
    <button type="button" className="demo-scramble" onMouseEnter={scramble} onFocus={scramble}>
      {displayText}
      <style>
        {`
        .demo-scramble { border:1px solid #d1d5db; border-radius:8px; background:#fff; color:#111827; padding:16px 24px; font:600 20px ui-monospace,SFMono-Regular,monospace; box-shadow:0 1px 2px rgba(0,0,0,.06); cursor:pointer; }
        .demo-scramble:hover { background:#f9fafb; } .dark .demo-scramble { border-color:#4b5563; background:#1f2937; color:#fff; }
      `}
      </style>
    </button>
  )
}
