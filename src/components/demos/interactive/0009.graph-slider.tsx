import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { useRef, useState } from 'react'

const graphPath = 'M4 187 C18 187 20 171 28 179 S42 198 61 192 S69 181 79 194 S101 178 108 179 S114 190 124 176 S146 173 151 151 S166 145 173 131 S186 155 198 147 S214 151 222 103 S238 109 246 88 S255 96 261 87 S272 111 279 81 S286 52 306 64 S317 49 340 52 S344 88 362 58'

export default function GraphSlider() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  function update(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = rootRef.current?.getBoundingClientRect()
    if (!bounds)
      return
    setProgress(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)))
  }

  const minutes = 7 * 60 + 35 + progress * 0.6
  const hour = Math.floor(minutes / 60)
  const minute = Math.floor(minutes % 60)

  return (
    <div
      ref={rootRef}
      className="demo-graph-slider"
      onPointerEnter={update}
      onPointerMove={update}
      style={{ '--graph-path': `path("${graphPath}")` } as CSSProperties}
    >
      <div className="indicator" style={{ left: `${progress}%` }}>
        <span>
          {hour}
          :
          {minute.toString().padStart(2, '0')}
          {' '}
          AM
        </span>
      </div>
      <div className="dot" style={{ offsetDistance: `${progress}%` }} />
      <svg viewBox="0 0 366 213" fill="none" aria-label="Interactive time graph">
        <defs>
          <linearGradient id="graph-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#0091ff" stopOpacity=".22" />
            <stop offset="1" stopColor="#0091ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="area" d={`${graphPath} L362 212 L4 212 Z`} fill="url(#graph-fill)" />
        <path className="base" d={graphPath} />
        <path className="active" d={graphPath} pathLength="100" style={{ strokeDashoffset: 100 - progress }} />
      </svg>
      <style>
        {`
        .demo-graph-slider { position:relative; width:min(100%,366px); aspect-ratio:366/213; cursor:none; color:#111; }
        .demo-graph-slider svg { display:block; width:100%; height:100%; overflow:visible; }
        .demo-graph-slider .base,.demo-graph-slider .active { fill:none; stroke:#c7c7c7; stroke-width:2.2; stroke-linecap:round; }
        .dark .demo-graph-slider .base { stroke:#505050; } .demo-graph-slider .active { stroke:#0091ff; stroke-dasharray:100; transition:stroke-dashoffset .04s linear; }
        .demo-graph-slider .indicator { position:absolute; z-index:2; top:0; bottom:8px; width:2px; border-radius:2px; background:rgba(0,0,0,.12); transform:translateX(-1px); pointer-events:none; }
        .dark .demo-graph-slider .indicator { background:rgba(255,255,255,.14); }
        .demo-graph-slider .indicator span { position:absolute; top:0; left:50%; transform:translateX(-50%); padding:3px 8px; border-radius:999px; background:#2e2e2e; color:#ededed; font-size:13px; line-height:24px; white-space:nowrap; }
        .demo-graph-slider .dot { position:absolute; z-index:3; top:0; left:0; width:14px; height:14px; border-radius:50%; background:#0091ff; box-shadow:0 0 0 2px #fff,0 0 8px 2px rgba(0,0,0,.12); offset-path:var(--graph-path); transform:translate(-50%,-50%); pointer-events:none; }
      `}
      </style>
    </div>
  )
}
