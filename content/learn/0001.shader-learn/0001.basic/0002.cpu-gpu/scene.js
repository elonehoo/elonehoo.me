const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const root = canvas.parentElement
const cells = 8
let mode = 'cpu'
let step = 0
let last = 0

const bar = document.createElement('div')
bar.style.cssText = 'display:flex;gap:8px;padding:8px;font:14px sans-serif;color:#d7e0e4'
const cpuButton = document.createElement('button')
cpuButton.textContent = 'CPU · 逐个'
const gpuButton = document.createElement('button')
gpuButton.textContent = 'GPU · 同时'
bar.append(cpuButton, gpuButton)
root.insertBefore(bar, canvas)
canvas.style.height = 'calc(100% - 44px)'

function shade(x, y) {
  const t = (x + y) / (cells * 2 - 2)
  return [46 + t * 160, 150 - t * 40, 110]
}

function paint() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (!width || !height) return
  const ratio = Math.min(devicePixelRatio || 1, 2)
  canvas.width = Math.floor(width * ratio)
  canvas.height = Math.floor(height * ratio)
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  ctx.fillStyle = '#101b23'
  ctx.fillRect(0, 0, width, height)
  const count = mode === 'gpu' ? cells * cells : step
  const cellWidth = width / cells
  const cellHeight = height / cells
  for (let i = 0; i < count; i++) {
    const x = i % cells
    const y = Math.floor(i / cells)
    const [r, g, b] = shade(x, y)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(x * cellWidth + 1, y * cellHeight + 1, cellWidth - 2, cellHeight - 2)
  }
}

function frame(time) {
  if (mode === 'cpu' && time - last > 70) {
    last = time
    step = Math.min(cells * cells, step + 1)
  }
  paint()
  requestAnimationFrame(frame)
}

cpuButton.onclick = () => {
  mode = 'cpu'
  step = 0
  last = 0
}
gpuButton.onclick = () => {
  mode = 'gpu'
  step = cells * cells
}
requestAnimationFrame(frame)
