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

const guideSource = `
precision mediump float;
varying vec2 vUv;
uniform vec2 uPoint;
uniform vec2 uResolution;
void main() {
  vec2 pixel = (vUv - uPoint) * uResolution;
  float vertical = step(abs(pixel.x), 1.0) * step(0.5, fract(gl_FragCoord.y / 10.0));
  float horizontal = step(abs(pixel.y), 1.0) * step(0.5, fract(gl_FragCoord.x / 10.0));
  vec2 p = (vUv - uPoint) * uResolution / min(uResolution.x, uResolution.y);
  if (max(vertical, horizontal) < 0.5 || length(p) < 0.030)
    discard;
  gl_FragColor = vec4(0.55, 0.64, 0.68, 1.0);
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

let program = null
let resolutionLocation = null
let guide = null
let guidePoint = null
let guideResolution = null
let point = [0.65, 0.4]

function compile(type, source) {
  const item = gl.createShader(type)
  gl.shaderSource(item, source)
  gl.compileShader(item)
  if (gl.getShaderParameter(item, gl.COMPILE_STATUS))
    return item
  gl.deleteShader(item)
  return null
}

function link(fragment) {
  const vertex = compile(gl.VERTEX_SHADER, vertexSource)
  const frag = compile(gl.FRAGMENT_SHADER, fragment)
  if (!vertex || !frag) {
    if (vertex)
      gl.deleteShader(vertex)
    if (frag)
      gl.deleteShader(frag)
    return null
  }
  const next = gl.createProgram()
  gl.attachShader(next, vertex)
  gl.attachShader(next, frag)
  gl.linkProgram(next)
  gl.deleteShader(vertex)
  gl.deleteShader(frag)
  if (gl.getProgramParameter(next, gl.LINK_STATUS))
    return next
  gl.deleteProgram(next)
  return null
}

function withPrecision(source) {
  if (/precision\s+(?:lowp|mediump|highp)\s+float/.test(source))
    return source
  return `precision mediump float;\n${source}`
}

function bind(which, buffer, name, size) {
  const location = gl.getAttribLocation(which, name)
  if (location < 0)
    return
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.enableVertexAttribArray(location)
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)
}

function readPoint(source) {
  const match = source.match(/vec2\s+point\s*=\s*vec2\(\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/)
  if (!match)
    return
  const x = Number(match[1])
  const y = Number(match[2])
  if (Number.isFinite(x) && Number.isFinite(y))
    point = [x, y]
}

function useFragment(source) {
  const next = link(withPrecision(source))
  if (!next)
    return false
  if (program)
    gl.deleteProgram(program)
  program = next
  resolutionLocation = gl.getUniformLocation(program, 'uResolution')
  readPoint(source)
  return true
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
  if (resolutionLocation)
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
  bind(program, positionBuffer, 'aPosition', 2)
  bind(program, uvBuffer, 'aUv', 2)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  if (!guide)
    return
  gl.useProgram(guide)
  if (guidePoint)
    gl.uniform2f(guidePoint, point[0], point[1])
  if (guideResolution)
    gl.uniform2f(guideResolution, canvas.width, canvas.height)
  bind(guide, positionBuffer, 'aPosition', 2)
  bind(guide, uvBuffer, 'aUv', 2)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function pointerFromEvent(event) {
  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height)
    return
  const x = (event.clientX - rect.left) / rect.width
  const y = (rect.bottom - event.clientY) / rect.height
  parent.postMessage({ type: 'learn-vec2-uv', uv: [x, y] }, '*')
}

guide = link(guideSource)
guidePoint = guide && gl.getUniformLocation(guide, 'uPoint')
guideResolution = guide && gl.getUniformLocation(guide, 'uResolution')
useFragment(fragmentSource)
draw()
new ResizeObserver(draw).observe(canvas)
window.addEventListener('resize', draw)
canvas.addEventListener('pointermove', pointerFromEvent)
window.addEventListener('message', (event) => {
  if (event.data?.type !== 'learn-fragment')
    return
  if (useFragment(event.data.source))
    draw()
})
parent.postMessage({ type: 'learn-ready' }, '*')
