import { useEffect, useRef } from 'react'

export default function WavingPlane() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx)
      return
    let width = 1
    let height = 1
    let frame = 0
    const resize = () => {
      const bounds = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    resize()
    const started = performance.now()
    const render = (now: number) => {
      const time = (now - started) / 1000
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = document.documentElement.classList.contains('dark') ? 'rgba(220,220,220,.58)' : 'rgba(80,80,80,.58)'
      ctx.lineWidth = 0.8
      const columns = 32
      const rows = 22
      const project = (x: number, y: number) => {
        const wave = Math.sin(x * 0.7 + time * 1.7) * 9 + Math.cos(y * 0.8 + time) * 4
        const perspective = 0.5 + y / rows * 0.75
        return [width / 2 + (x - columns / 2) * (width / columns) * perspective, height * 0.08 + y * (height * 0.84 / rows) + wave * perspective] as const
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath()
        for (let x = 0; x <= columns; x++) {
          const point = project(x, y)
          if (x === 0)
            ctx.moveTo(...point)
          else
            ctx.lineTo(...point)
        }
        ctx.stroke()
      }
      for (let x = 0; x <= columns; x++) {
        ctx.beginPath()
        for (let y = 0; y <= rows; y++) {
          const point = project(x, y)
          if (y === 0)
            ctx.moveTo(...point)
          else
            ctx.lineTo(...point)
        }
        ctx.stroke()
      }
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-label="Animated wireframe plane" style={{ width: '100%', height: '100%' }} />
}
