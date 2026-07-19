import { useCallback, useEffect, useRef, useState } from 'react'

type Point = [number, number]
const patterns = ['*?', 'p0', 'p1', 'p2', 'p3'] as const
const r60 = Math.PI / 3
const r30 = Math.PI / 6

function randomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

export default function HexPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<(typeof patterns)[number]>('*?')
  const [showHexagon, setShowHexagon] = useState(false)
  const [revision, setRevision] = useState(0)

  const draw = useCallback(() => {
    void revision
    const canvas = canvasRef.current
    if (!canvas)
      return
    const context = canvas.getContext('2d')
    if (!context)
      return
    const ctx: CanvasRenderingContext2D = context
    const dpr = window.devicePixelRatio || 1
    canvas.width = 300 * dpr
    canvas.height = 300 * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, 300, 300)
    ctx.strokeStyle = '#9da3ae'
    ctx.lineWidth = 1
    const size = 30
    const sqrt3 = Math.sqrt(3)

    function drawHexagon(x: number, y: number) {
      const points: Point[] = Array.from({ length: 6 }, (_, index) => [
        x + size * Math.cos(index * r60),
        y + size * Math.sin(index * r60),
      ])
      const midpoint = points.map((point, index): Point => {
        const next = points[(index + 1) % 6]
        return [(point[0] + next[0]) / 2, (point[1] + next[1]) / 2]
      })
      const get = <T,>(items: T[], index: number) => items[(index % items.length + items.length) % items.length]
      if (showHexagon) {
        ctx.beginPath()
        ctx.moveTo(...points[0])
        points.slice(1).forEach(point => ctx.lineTo(...point))
        ctx.closePath()
        ctx.stroke()
      }
      const arc1 = (offset: number) => {
        ctx.beginPath()
        ctx.arc(...get(points, offset), size / 2, r60 * (2 + offset), r60 * (4 + offset))
        ctx.stroke()
      }
      const arc2 = (offset: number) => {
        const point: Point = [x + size * Math.cos(offset * r60 + r30) * sqrt3, y + size * Math.sin(offset * r60 + r30) * sqrt3]
        ctx.beginPath()
        ctx.arc(...point, size * 1.5, r60 * (offset + 3), r60 * (offset + 4))
        ctx.stroke()
      }
      const line = (offset: number) => {
        ctx.beginPath()
        ctx.moveTo(...get(midpoint, offset))
        ctx.lineTo(...get(midpoint, offset + 3))
        ctx.stroke()
      }
      const selected = mode === '*?' ? randomItem(patterns.slice(1)) : mode
      const offset = Math.floor(Math.random() * 6)
      if (selected === 'p1') {
        arc1(offset)
        arc1(offset + 3)
        line(offset + 1)
      }
      else if (selected === 'p2') {
        arc2(offset)
        arc2(offset + 1)
        arc1(offset + 4)
      }
      else if (selected === 'p3') {
        arc2(offset + 2)
        arc2(offset + 5)
        line(offset + 5)
      }
      else {
        const shuffled = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5)
        for (let index = 0; index < 3; index++) {
          ctx.beginPath()
          ctx.moveTo(...midpoint[shuffled[index * 2]])
          ctx.lineTo(...midpoint[shuffled[index * 2 + 1]])
          ctx.stroke()
        }
      }
    }

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 20; y++) {
        drawHexagon(-1 + x * size * 3 + (y % 2 ? size * 1.5 : 0), 18 - size * sqrt3 + y * size * sqrt3 * 0.5)
      }
    }
  }, [mode, revision, showHexagon])

  useEffect(draw, [draw])

  return (
    <div className="demo-hex">
      <div className="controls">
        <select value={mode} onChange={event => setMode(event.target.value as typeof mode)} aria-label="Pattern">
          {patterns.map(pattern => <option key={pattern}>{pattern}</option>)}
        </select>
        <label>
          <input type="checkbox" checked={showHexagon} onChange={event => setShowHexagon(event.target.checked)} />
          {' '}
          hex
        </label>
      </div>
      <canvas ref={canvasRef} onClick={() => setRevision(value => value + 1)} aria-label="Random hex pattern" />
      <style>
        {`
        .demo-hex { width:100%; height:100%; position:relative; display:grid; place-items:center; } .demo-hex canvas { width:300px; height:300px; max-width:100%; cursor:pointer; }
        .demo-hex .controls { position:absolute; z-index:2; right:8px; top:8px; display:flex; gap:8px; align-items:center; font:12px ui-monospace,monospace; }
        .demo-hex select,.demo-hex label { border:1px solid #cbd5e1; border-radius:6px; background:rgba(255,255,255,.85); padding:4px 7px; color:#334155; } .demo-hex label { display:flex; gap:4px; }
        .dark .demo-hex select,.dark .demo-hex label { border-color:#475569; background:rgba(15,23,42,.85); color:#e2e8f0; }
      `}
      </style>
    </div>
  )
}
