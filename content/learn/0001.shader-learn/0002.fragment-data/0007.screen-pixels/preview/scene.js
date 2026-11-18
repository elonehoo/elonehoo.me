const fragmentSource = __FRAGMENT_SOURCE__

const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl', { alpha: false })

const vertexSource = `
precision mediump float;
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const guideSource = `
precision mediump float;
uniform vec2 uPointer;
uniform vec2 uResolution;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 pixel = (uv - uPointer) * uResolution;
  float vertical = step(abs(pixel.x), 1.0) * step(0.5, fract(gl_FragCoord.y / 10.0));
  float horizontal = step(abs(pixel.y), 1.0) * step(0.5, fract(gl_FragCoord.x / 10.0));
  float radius = length(pixel);
  float ring = step(abs(radius - 8.0), 1.15);
  float plus = step(radius, 6.0) * max(step(abs(pixel.x), 0.8), step(abs(pixel.y), 0.8));
  if (max(max(vertical, horizontal), max(ring, plus)) < 0.5)
    discard;
  gl_FragColor = vec4(1.0);
}
`

const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

let program = null
let resolutionLocation = null
let guide = null
let guidePointer = null
let guideResolution = null
let pointer = null

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

function bind(which) {
  const location = gl.getAttribLocation(which, 'aPosition')
  if (location < 0)
    return
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.enableVertexAttribArray(location)
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0)
}

function useFragment(source) {
  const next = link(withPrecision(source))
  if (!next)
    return false
  if (program)
    gl.deleteProgram(program)
  program = next
  resolutionLocation = gl.getUniformLocation(program, 'uResolution')
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
  bind(program)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  if (!guide || !pointer)
    return
  gl.useProgram(guide)
  if (guidePointer)
    gl.uniform2f(guidePointer, pointer[0], pointer[1])
  if (guideResolution)
    gl.uniform2f(guideResolution, canvas.width, canvas.height)
  bind(guide)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function pointerFromEvent(event) {
  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height || !canvas.width || !canvas.height)
    return
  const x = (event.clientX - rect.left) / rect.width * canvas.width
  const y = (rect.bottom - event.clientY) / rect.height * canvas.height
  const pixel = [Math.floor(x) + 0.5, Math.floor(y) + 0.5]
  pointer = [pixel[0] / canvas.width, pixel[1] / canvas.height]
  parent.postMessage({
    type: 'learn-screen-pointer',
    uv: [x / canvas.width, y / canvas.height],
    pixel,
    resolution: [canvas.width, canvas.height],
  }, '*')
  draw()
}

guide = link(guideSource)
guidePointer = guide && gl.getUniformLocation(guide, 'uPointer')
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
