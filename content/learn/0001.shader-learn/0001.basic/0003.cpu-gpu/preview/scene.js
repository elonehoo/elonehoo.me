const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const hud = document.createElement('div')
hud.innerHTML = '<span class="uv">UV</span><span class="actions"><button type="button" data-action="pause">暂停</button><button type="button" data-action="reset">重置</button></span>'
document.body.append(hud)

let cells = 12
let speed = 24
let mode = 0
let paused = false
let elapsed = 0
let last = performance.now()
let pointer = null

const dark = [0.06, 0.10, 0.14]

function clampCells(value) {
  return Math.min(24, Math.max(4, Math.round(value)))
}

function clampSpeed(value) {
  return Math.min(120, Math.max(4, Math.round(value)))
}

function shade(x, y) {
  return [(x + 0.5) / cells, (y + 0.5) / cells, 0.25]
}

function mix(from, to, amount) {
  return from + (to - from) * amount
}

function paint(index) {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (!width || !height) return
  const ratio = Math.min(devicePixelRatio || 1, 2)
  canvas.width = Math.floor(width * ratio)
  canvas.height = Math.floor(height * ratio)
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  ctx.fillStyle = '#101b23'
  ctx.fillRect(0, 0, width, height)
  const cellWidth = width / cells
  const cellHeight = height / cells
  const total = cells * cells
  for (let i = 0; i < total; i++) {
    const x = i % cells
    const y = Math.floor(i / cells)
    const done = i + 0.5 < index
    const current = mode === 0 && Math.abs(i - Math.floor(index)) < 0.5 && index < total
    const color = shade(x, y)
    const amount = done ? 1 : current ? 0.6 : 0
    const red = Math.round(mix(dark[0], color[0], amount) * 255)
    const green = Math.round(mix(dark[1], color[1], amount) * 255)
    const blue = Math.round(mix(dark[2], color[2], amount) * 255)
    const top = height - (y + 1) * cellHeight
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`
    ctx.fillRect(x * cellWidth, top, cellWidth, cellHeight)
    if (!current) continue
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(x * cellWidth + 1, top + 1, cellWidth - 2, cellHeight - 2)
  }
}

function publish(index) {
  const total = cells * cells
  const rgb = pointer ? shade(pointer[0], pointer[1]) : null
  parent.postMessage({
    type: 'learn-cpu',
    index: Math.min(total, Math.floor(index)),
    pointer,
    rgb,
    total,
  }, '*')
}

function frame(now) {
  const delta = Math.min(0.05, (now - last) / 1000)
  last = now
  if (!paused && mode === 0) elapsed += delta
  const total = cells * cells
  const index = mode === 1 ? total : elapsed * speed % (total + 8)
  paint(index)
  publish(index)
  requestAnimationFrame(frame)
}

canvas.addEventListener('pointermove', (event) => {
  const rect = canvas.getBoundingClientRect()
  const u = (event.clientX - rect.left) / rect.width
  const v = 1 - (event.clientY - rect.top) / rect.height
  pointer = [
    Math.min(cells - 1, Math.max(0, Math.floor(u * cells))),
    Math.min(cells - 1, Math.max(0, Math.floor(v * cells))),
  ]
  hud.querySelector('.uv').textContent = `UV ${u.toFixed(2)}, ${v.toFixed(2)}`
})

canvas.addEventListener('pointerleave', () => {
  pointer = null
  hud.querySelector('.uv').textContent = 'UV'
})

hud.querySelector('[data-action="pause"]').onclick = (event) => {
  paused = !paused
  event.currentTarget.textContent = paused ? '继续' : '暂停'
}

hud.querySelector('[data-action="reset"]').onclick = () => {
  elapsed = 0
  paused = false
  hud.querySelector('[data-action="pause"]').textContent = '暂停'
}

window.addEventListener('message', (event) => {
  const data = event.data
  if (data?.type !== 'learn-cpu-control') return
  if (typeof data.cells === 'number') {
    const next = clampCells(data.cells)
    if (next !== cells) elapsed = 0
    cells = next
  }
  if (typeof data.speed === 'number')
    speed = clampSpeed(data.speed)
  if (data.mode === 0 || data.mode === 1) {
    if (data.mode !== mode) elapsed = 0
    mode = data.mode
  }
})

const style = document.createElement('style')
style.textContent = `
  html, body { margin: 0; height: 100%; background: #101b23; }
  canvas { display: block; width: 100%; height: 100%; }
  .uv, .actions { position: fixed; bottom: 10px; color: #c5ced4; font: 13px/1.4 sans-serif; }
  .uv { left: 12px; }
  .actions { right: 12px; display: flex; gap: 12px; }
  button { border: 0; background: transparent; color: inherit; font: inherit; cursor: pointer; padding: 0; }
  button:hover { color: #fff; }
`
document.head.append(style)
requestAnimationFrame(frame)
parent.postMessage({ type: 'learn-ready' }, '*')
