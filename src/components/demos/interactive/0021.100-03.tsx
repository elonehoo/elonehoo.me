import { useEffect, useRef, useState } from 'react'

type Point = [number, number]
const speedOptions = ['x0.5', 'x1', 'x2'] as const

export default function WireframeMorph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [speedLevel, setSpeedLevel] = useState<(typeof speedOptions)[number]>('x1')

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx)
      return
    let width = 1
    let height = 1
    let frame = 0
    const duration = speedLevel === 'x0.5' ? 2400 : speedLevel === 'x2' ? 600 : 1200
    const resize = () => {
      const bounds = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(bounds.width, 1)
      height = Math.max(bounds.height, 1)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    resize()
    const rotate = (points: Point[], radians: number) => points.map(([x, y]): Point => [x * Math.cos(radians) - y * Math.sin(radians), y * Math.cos(radians) + x * Math.sin(radians)])
    const base: Point[] = [[-18, 0], [0, -30], [18, 0], [0, 30]]
    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = document.documentElement.classList.contains('dark') ? '#8d939e' : '#6b7280'
      ctx.lineWidth = 1
      const radians = now / duration * Math.PI / 2
      const horizontal = rotate(base, radians)
      const vertical = rotate(base, radians + Math.PI / 2)
      const step = 31
      for (let x = -1; x < Math.ceil(width / step) + 1; x++) {
        for (let y = -1; y < Math.ceil(height / step) + 1; y++) {
          const points = (x + y) % 2 ? horizontal : vertical
          ctx.beginPath()
          points.forEach(([px, py], index) => {
            const point: Point = [px + x * step, py + y * step]
            if (index === 0)
              ctx.moveTo(...point)
            else
              ctx.lineTo(...point)
          })
          ctx.closePath()
          ctx.stroke()
        }
      }
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [speedLevel])

  return (
    <div className="demo-wireframe">
      <div className="controls" role="group" aria-label="Animation speed">
        {speedOptions.map(option => <button key={option} type="button" className={speedLevel === option ? 'active' : ''} onClick={() => setSpeedLevel(option)}>{option}</button>)}
      </div>
      <canvas ref={canvasRef} aria-label="Morphing wireframe" />
      <style>
        {`
        .demo-wireframe { position:relative; width:100%; height:100%; overflow:hidden; } .demo-wireframe canvas { display:block; width:100%; height:100%; }
        .demo-wireframe .controls { position:absolute; z-index:2; top:8px; right:8px; display:flex; border:1px solid #cbd5e1; border-radius:6px; overflow:hidden; }
        .demo-wireframe button { border:0; border-right:1px solid #cbd5e1; padding:4px 7px; background:rgba(255,255,255,.86); color:#475569; font:12px ui-monospace,monospace; cursor:pointer; } .demo-wireframe button:last-child { border:0; }
        .demo-wireframe button.active { background:#334155; color:white; } .dark .demo-wireframe .controls,.dark .demo-wireframe button { border-color:#475569; } .dark .demo-wireframe button { background:rgba(15,23,42,.88); color:#cbd5e1; } .dark .demo-wireframe button.active { background:#e2e8f0; color:#0f172a; }
      `}
      </style>
    </div>
  )
}
