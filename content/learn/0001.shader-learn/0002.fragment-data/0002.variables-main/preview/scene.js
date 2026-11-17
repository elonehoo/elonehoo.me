const fragmentSource = __FRAGMENT_SOURCE__

const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl', { alpha: false })

const vertexSource = `
precision mediump float;
attribute vec2 aPosition;
attribute vec2 aUv;
varying vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
const uvBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer)
gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW)

const overlay = document.createElement('div')
overlay.style.cssText = 'position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;pointer-events:none;font:13px/1.4 system-ui,sans-serif;'
const leftLabel = document.createElement('span')
leftLabel.textContent = '原始亮度'
const rightLabel = document.createElement('span')
rightLabel.textContent = '调光之后'
for (const item of [leftLabel, rightLabel])
  item.style.cssText = 'align-self:center;justify-self:center;'
overlay.append(leftLabel, rightLabel)
const host = canvas.parentElement
if (host) {
  const positioned = getComputedStyle(host).position
  if (positioned === 'static')
    host.style.position = 'relative'
  host.append(overlay)
}

let program = null
let uInput = 0.7
let uGain = 0.4

function compile(type, source) {
  const item = gl.createShader(type)
  gl.shaderSource(item, source)
  gl.compileShader(item)
  if (gl.getShaderParameter(item, gl.COMPILE_STATUS))
    return item
  gl.deleteShader(item)
  return null
}

function withPrecision(source) {
  if (/precision\s+(?:lowp|mediump|highp)\s+float/.test(source))
    return source
  return `precision mediump float;\n${source}`
}

function bind(buffer, name, size) {
  const location = gl.getAttribLocation(program, name)
  if (location < 0)
    return
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.enableVertexAttribArray(location)
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)
}

function useFragment(source) {
  const vertex = compile(gl.VERTEX_SHADER, withPrecision(vertexSource))
  const fragment = compile(gl.FRAGMENT_SHADER, withPrecision(source))
  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex)
    if (fragment) gl.deleteShader(fragment)
    return false
  }
  const next = gl.createProgram()
  gl.attachShader(next, vertex)
  gl.attachShader(next, fragment)
  gl.linkProgram(next)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (!gl.getProgramParameter(next, gl.LINK_STATUS)) {
    gl.deleteProgram(next)
    return false
  }
  if (program) gl.deleteProgram(program)
  program = next
  return true
}

function ink(value) {
  return value > 0.55 ? 'rgba(20, 20, 20, 0.88)' : 'rgba(255, 255, 255, 0.88)'
}

function draw() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (!width || !height || !program)
    return
  const ratio = Math.min(devicePixelRatio, 2)
  const nextWidth = Math.floor(width * ratio)
  const nextHeight = Math.floor(height * ratio)
  if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
    canvas.width = nextWidth
    canvas.height = nextHeight
  }
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.useProgram(program)
  const input = gl.getUniformLocation(program, 'uInput')
  const gain = gl.getUniformLocation(program, 'uGain')
  if (input)
    gl.uniform1f(input, uInput)
  if (gain)
    gl.uniform1f(gain, uGain)
  bind(positionBuffer, 'aPosition', 2)
  bind(uvBuffer, 'aUv', 2)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  leftLabel.style.color = ink(uInput)
  rightLabel.style.color = ink(uInput * uGain)
}

function pointerFromEvent(event) {
  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height)
    return
  const x = (event.clientX - rect.left) / rect.width
  const y = (rect.bottom - event.clientY) / rect.height
  parent.postMessage({ type: 'learn-main-uv', uv: [x, y] }, '*')
}

useFragment(fragmentSource)
draw()
new ResizeObserver(draw).observe(canvas)
window.addEventListener('resize', draw)
canvas.addEventListener('pointermove', pointerFromEvent)
window.addEventListener('message', (event) => {
  if (event.data?.type === 'learn-fragment') {
    if (useFragment(event.data.source))
      draw()
    return
  }
  if (event.data?.type !== 'learn-main')
    return
  const input = Number(event.data.uInput)
  const gain = Number(event.data.uGain)
  if (Number.isFinite(input))
    uInput = input
  if (Number.isFinite(gain))
    uGain = gain
  draw()
})
parent.postMessage({ type: 'learn-ready' }, '*')
