import { useEffect, useRef, useState } from 'react'

export default function CraftClipboard() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function animate() {
    clearTimeout(timerRef.current)
    setCopied(false)
    requestAnimationFrame(() => setCopied(true))
    timerRef.current = setTimeout(setCopied, 2000, false)
  }

  return (
    <button type="button" className={`demo-clipboard ${copied ? 'copied' : ''}`} aria-label="Copy" onClick={animate}>
      <svg viewBox="0 0 16 18" fill="none" aria-hidden="true">
        <path className="page" d="M3 14.5V6A1.5 1.5 0 0 1 4.5 4.5H12A1.5 1.5 0 0 1 13.5 6v8.5A1.5 1.5 0 0 1 12 16H4.5A1.5 1.5 0 0 1 3 14.5Z" />
        <path className="fall" d="M3 14.5V6A1.5 1.5 0 0 1 4.5 4.5H12A1.5 1.5 0 0 1 13.5 6v8.5A1.5 1.5 0 0 1 12 16H4.5A1.5 1.5 0 0 1 3 14.5Z" />
        <path className="check" d="m6.25 11.5 1.5 1.5 2.5-3.5" />
        <path className="clip" d="M7 3.5a.5.5 0 0 0-.5.5v1.25A1.75 1.75 0 0 0 8.25 7 1.75 1.75 0 0 0 10 5.25V4a.5.5 0 0 0-.5-.5H7Z" />
      </svg>
      <style>
        {`
        .demo-clipboard { width:48px; height:48px; padding:8px; border:0; border-radius:8px; background:transparent; color:#111; cursor:pointer; transition:background .2s; }
        .demo-clipboard:hover { background:rgba(0,0,0,.08); } .dark .demo-clipboard { color:#fff; } .dark .demo-clipboard:hover { background:rgba(255,255,255,.1); }
        .demo-clipboard svg { width:100%; height:100%; overflow:visible; } .demo-clipboard path { fill:transparent; stroke:currentColor; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; transform-origin:center; }
        .demo-clipboard .check { stroke:#45d483; stroke-dasharray:8; stroke-dashoffset:8; }
        .demo-clipboard.copied .fall { animation:clipboard-fall 2s ease forwards; } .demo-clipboard.copied .check { animation:clipboard-check 2s ease forwards; }
        @keyframes clipboard-fall { 50% { transform:none; opacity:1; } 100% { transform:rotate(10deg) translateY(16px); opacity:0; } }
        @keyframes clipboard-check { 20% { stroke-dashoffset:8; } 45%,100% { stroke-dashoffset:0; } }
      `}
      </style>
    </button>
  )
}
