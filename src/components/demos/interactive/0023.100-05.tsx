import { useEffect, useRef } from 'react'

interface Particle { x: number, y: number, vx: number, vy: number }

export default function ParticleField() {
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
    let particles: Particle[] = []
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
      particles = Array.from({ length: 1800 }, (_, index) => {
        const angle = index / 1800 * Math.PI * 2 + Math.random() * 0.1
        const radius = Math.min(width, height) * (0.22 + Math.random() * 0.08)
        return { x: width / 2 + Math.cos(angle) * radius, y: height / 2 + Math.sin(angle) * radius, vx: 0, vy: 0 }
      })
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    resize()
    const render = (now: number) => {
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1c1c1c' : '#f8f8f8'
      ctx.fillRect(0, 0, width, height)
      ctx.strokeStyle = 'rgba(128,128,128,.42)'
      ctx.lineWidth = 0.45
      ctx.beginPath()
      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index]
        const friend = particles[(index + particles.length - 1) % particles.length]
        const oldX = particle.x
        const oldY = particle.y
        const fieldAngle = Math.sin(particle.x * 0.012 + now * 0.00018) * 2.2 + Math.cos(particle.y * 0.015 - now * 0.00013)
        particle.vx += Math.cos(fieldAngle) * 0.12 + (friend.x - particle.x) * 0.0009
        particle.vy += Math.sin(fieldAngle) * 0.12 + (friend.y - particle.y) * 0.0009
        const speed = Math.hypot(particle.vx, particle.vy) || 1
        if (speed > 2.4) {
          particle.vx *= 2.4 / speed
          particle.vy *= 2.4 / speed
        }
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1
          particle.x = Math.max(0, Math.min(width, particle.x))
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1
          particle.y = Math.max(0, Math.min(height, particle.y))
        }
        ctx.moveTo(oldX, oldY)
        ctx.lineTo(particle.x, particle.y)
      }
      ctx.stroke()
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-label="Animated particle field" style={{ width: '100%', height: '100%' }} />
}
