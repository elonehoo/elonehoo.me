import { useEffect, useRef } from 'react'

interface NetworkPoint { x: number, y: number, born: number }

export default function PointNetwork() {
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
    let previousSpawn = 0
    let points: NetworkPoint[] = []
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
      points = []
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    resize()
    const render = (now: number) => {
      if (now - previousSpawn > 35) {
        points.push({ x: Math.random() * width, y: Math.random() * height, born: now })
        previousSpawn = now
      }
      points = points.filter(point => now - point.born < 2000)
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 0.5
      for (let index = 0; index < points.length; index++) {
        const point = points[index]
        for (let otherIndex = 0; otherIndex < index; otherIndex++) {
          const other = points[otherIndex]
          const distance = Math.hypot(other.x - point.x, other.y - point.y)
          if (distance > 100)
            continue
          const opacity = (1 - distance / 100) * Math.min((2000 - (now - point.born)) / 600, 1)
          ctx.strokeStyle = `rgba(123,123,123,${Math.max(0, opacity)})`
          ctx.beginPath()
          ctx.moveTo(other.x, other.y)
          ctx.lineTo(point.x, point.y)
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
  }, [])
  return <canvas ref={canvasRef} aria-label="Animated point network" style={{ width: '100%', height: '100%' }} />
}
