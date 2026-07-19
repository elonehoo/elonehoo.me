import { useEffect, useRef, useState } from 'react'

export default function CraftFistbump() {
  const [active, setActive] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timerRef.current), [])

  function bump() {
    clearTimeout(timerRef.current)
    setActive(false)
    requestAnimationFrame(() => setActive(true))
    timerRef.current = setTimeout(setActive, 1000, false)
  }

  return (
    <button type="button" className={`demo-fistbump ${active ? 'boom' : ''}`} aria-label="Fist bump" onClick={bump}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path className="burst" d="M12 6V4M8.15 7.4 6.86 5.87M15.86 7.4l1.29-1.53" />
        <path className="left" d="M2 19h5.35a3 3 0 0 0 2.98-2.63l.25-2A3 3 0 0 0 7.6 11H7.5l-.7-.47a2 2 0 0 0-3.21 1L3 13H2" />
        <path className="right" d="M22 19h-5.35a3 3 0 0 1-2.98-2.63l-.25-2A3 3 0 0 1 16.4 11h.1l.7-.47a2 2 0 0 1 3.21 1L21 13h1" />
      </svg>
      <style>
        {`
        .demo-fistbump { width:52px; height:52px; padding:8px; border:0; border-radius:999px; background:#edefeb; cursor:pointer; color:#111; transform:scale(1.5); transition:background .2s; }
        .demo-fistbump:hover { background:#e2e6df; } .demo-fistbump path { stroke:currentColor; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; }
        .demo-fistbump .burst { stroke-dasharray:3; stroke-dashoffset:3; }
        .demo-fistbump.boom .left { animation:fist-left 1s ease; } .demo-fistbump.boom .right { animation:fist-right 1s ease; } .demo-fistbump.boom .burst { animation:fist-burst 1s ease; }
        @keyframes fist-left { 24%,25% { transform:translateX(1.5px); } 100% { transform:none; } }
        @keyframes fist-right { 24%,25% { transform:translateX(-1.5px); } 100% { transform:none; } }
        @keyframes fist-burst { 20% { stroke-dashoffset:3; } 30% { stroke-dasharray:5; } 31% { stroke-dasharray:3; stroke-dashoffset:6; } 75%,100% { stroke-dashoffset:3; } }
      `}
      </style>
    </button>
  )
}
