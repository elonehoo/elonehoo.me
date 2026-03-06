<script setup lang="ts">
import { useAppearance } from '../../core'

const { theme } = useAppearance()

// ═══════════════════════════════════════════════════════
// 珠链拉绳 — 完全复刻 015 On/Off Switch
// ═══════════════════════════════════════════════════════

// ─── 物理设定（与原始完全一致） ───
const BEAD_COUNT = 30
const BEAD_SIZE = 3
const BEAD_DIST = 300 / (BEAD_COUNT + 2)
const INITIAL_X_MOMENTUM = -6
const GRAVITY = 12
const X_FRICTION = 0.01
const CANVAS_W = 300
const CANVAS_H = 350

// ─── DOM 引用 ───
const canvasRef = ref<HTMLCanvasElement | null>(null)

// ─── 响应式状态 ───
const screenW = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const isMobile = computed(() => screenW.value < 768)
// lit = 亮色模式（与原始一致：lit 对应 checked / light）
const lit = computed(() => theme.value !== 'dark')

const anchorXOffset = computed(() => isMobile.value ? 40 : 240)
// 锚点在 canvas 中居中 = CANVAS_W / 2 = 150
const ANCHOR_CX = CANVAS_W / 2
const containerRight = computed(() => anchorXOffset.value - (CANVAS_W - ANCHOR_CX))

let ctx: CanvasRenderingContext2D | null = null
let rafId: number | null = null
let lastTime = 0
let running = true

// ─── 珠链数据结构（与原始 Bead class 一致） ───
interface FixedPoint { x: number, y: number }
interface Bead {
  x: number
  y: number
  speedX: number
  speedY: number
  parent: FixedPoint | Bead
}
function isBead(p: FixedPoint | Bead): p is Bead { return 'speedX' in p }

let anchor: FixedPoint = { x: ANCHOR_CX, y: 0 }
let beads: Bead[] = []

function initBeads() {
  anchor = { x: ANCHOR_CX, y: 0 }
  beads = []
  for (let i = 0; i < BEAD_COUNT; i++) {
    beads.push({
      x: ANCHOR_CX,
      y: i * BEAD_DIST + BEAD_SIZE,
      speedX: 0,
      speedY: 0,
      parent: i === 0 ? anchor : beads[i - 1],
    })
  }
}

// ─── 物理辅助（与原始完全一致） ───
function pythag(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

function getAngle(x1: number, y1: number, x2: number, y2: number) {
  return Math.atan((y2 - y1) / (x2 - x1))
}

function updateMomentum(b: Bead, dt: number) {
  // gravity
  b.speedY += GRAVITY * dt / 1000
  if (Math.abs(b.speedX) < b.speedX - X_FRICTION * dt / 1000)
    b.speedX = 0
  else
    b.speedX = b.speedX > 0 ? b.speedX - X_FRICTION * dt / 1000 : b.speedX + X_FRICTION * dt / 1000
}

function moveBead(b: Bead) {
  b.x += b.speedX
  b.y += b.speedY
}

function positionBasedOnParent(b: Bead) {
  const p = b.parent
  const d = pythag(b.x, b.y, p.x, p.y)
  if (d > BEAD_DIST) {
    const a = getAngle(b.x, b.y, p.x, p.y)
    let dx = Math.cos(a) * (d - BEAD_DIST)
    let dy = Math.sin(a) * (d - BEAD_DIST)
    if (b.x > p.x) {
      dx *= -1
      dy *= -1
    }

    if (isBead(p)) {
      b.x += dx / 2
      b.y += dy / 2
      b.speedX += dx / 2
      b.speedY += dy / 2

      p.x -= dx / 2
      p.y -= dy / 2
      p.speedX -= dx / 2
      p.speedY -= dy / 2
    }
    else {
      b.x += dx
      b.y += dy
      b.speedX += dx
      b.speedY += dy
    }
  }
}

// ─── Canvas 渲染（与原始完全一致的渐变和高光） ───
function drawBead(b: Bead) {
  if (!ctx)
    return
  const x = b.x
  const y = b.y

  ctx.save()
  ctx.beginPath()
  ctx.moveTo(x, y - BEAD_SIZE)
  ctx.arc(x, y, BEAD_SIZE, 0, Math.PI * 2, false)

  let grd: CanvasGradient
  if (lit.value) {
    grd = ctx.createRadialGradient(x, y, BEAD_SIZE, x - BEAD_SIZE / 2, y - BEAD_SIZE / 4, BEAD_SIZE * 0.75)
    grd.addColorStop(1, '#c98b4c')
    grd.addColorStop(0, '#967e54')
  }
  else {
    grd = ctx.createRadialGradient(x, y, BEAD_SIZE, x - BEAD_SIZE / 2, y - BEAD_SIZE / 4, BEAD_SIZE * 0.75)
    grd.addColorStop(1, '#4a5425')
    grd.addColorStop(0, '#172023')
  }
  ctx.fillStyle = grd
  ctx.fill()

  const highlight = ctx.createRadialGradient(x, y, BEAD_SIZE, x + BEAD_SIZE / 3, y + BEAD_SIZE / 6, BEAD_SIZE)
  highlight.addColorStop(0, '#f4db97')
  highlight.addColorStop(1, 'rgba(195, 229, 228, 0)')
  ctx.fillStyle = highlight
  ctx.fill()
  ctx.restore()
}

function drawLine(b: Bead) {
  if (!ctx)
    return
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(b.parent.x, b.parent.y)
  ctx.lineTo(b.x, b.y)
  ctx.stroke()
  ctx.restore()
}

// ─── 动画循环（与原始结构一致） ───
function loop() {
  const now = performance.now()
  const dt = Math.min(now - lastTime, 50)
  lastTime = now

  if (!ctx || !running) { rafId = requestAnimationFrame(loop); return }

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

  // 锚点到第一颗珠子的延长线
  if (beads[0].parent.y !== 0) {
    ctx.strokeStyle = lit.value ? '#c2cdd1' : '#737777'
    ctx.beginPath()
    ctx.moveTo(CANVAS_W / 2, 0)
    ctx.lineTo(CANVAS_W / 2, beads[0].parent.y)
    ctx.stroke()
  }

  // 链条线样式
  ctx.strokeStyle = lit.value ? '#baaf62' : '#3d392d'
  ctx.fillStyle = lit.value ? '#544f3f' : '#2c2a1e'

  // 物理步进：动量 → 移动 → 约束（与原始一致，分两步）
  beads.forEach((bead) => {
    updateMomentum(bead, dt)
    moveBead(bead)
    positionBasedOnParent(bead)
  })
  // 额外 20 次约束迭代（与原始一致）
  for (let i = 0; i < 20; i++) {
    beads.forEach((bead) => {
      positionBasedOnParent(bead)
    })
  }
  // 先画线
  beads.forEach((bead) => {
    drawLine(bead)
  })
  // 再画珠子
  beads.forEach((bead) => {
    drawBead(bead)
  })

  rafId = requestAnimationFrame(loop)
}

// ─── 交互（与原始 mousedown/mouseup 一致） ───
function onDown(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  e.stopPropagation()
  // mousedown → 拉下锚点
  beads[0].parent.y = BEAD_DIST * 2
  running = true
  document.addEventListener('mouseup', onUp, { once: true })
  document.addEventListener('touchend', onUp, { once: true })
  document.addEventListener('touchcancel', onUp, { once: true })
}

function onUp() {
  // mouseup → 给末端珠子水平冲量，释放锚点
  beads[BEAD_COUNT - 1].speedX += INITIAL_X_MOMENTUM
  beads[0].parent.y = 0
  running = true
  // 切换主题
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

// ─── 生命周期 ───
function onResize() { screenW.value = window.innerWidth }

function onVisChange() {
  lastTime = performance.now()
  running = !document.hidden
}

onMounted(() => {
  const canvas = canvasRef.value
  if (canvas) {
    const dpr = window.devicePixelRatio || 1
    canvas.width = CANVAS_W * dpr
    canvas.height = CANVAS_H * dpr
    canvas.style.width = `${CANVAS_W}px`
    canvas.style.height = `${CANVAS_H}px`
    ctx = canvas.getContext('2d')
    if (ctx)
      ctx.scale(dpr, dpr)
  }
  initBeads()
  lastTime = performance.now()
  loop()
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisChange)
})

onUnmounted(() => {
  if (rafId)
    cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('visibilitychange', onVisChange)
})
</script>

<template>
  <div
    class="pull-cord-fixed"
    :style="{ right: `${containerRight}px` }"
  >
    <canvas
      ref="canvasRef"
      class="cord-canvas"
      @mousedown="onDown"
      @touchstart.prevent="onDown"
    />
  </div>
</template>

<style scoped>
.pull-cord-fixed {
  position: fixed;
  top: 0;
  z-index: 999;
  pointer-events: none;
}

.cord-canvas {
  display: block;
  pointer-events: auto;
  cursor: pointer;
  filter: drop-shadow(3px 2px 3px rgba(0, 0, 0, 0.5));
}
</style>
