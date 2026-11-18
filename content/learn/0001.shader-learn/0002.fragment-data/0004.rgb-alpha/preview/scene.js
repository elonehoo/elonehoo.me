const fragmentSource = __FRAGMENT_SOURCE__

const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })

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

const checkerSource = `
precision mediump float;
varying vec2 vUv;
void main() {
  vec2 cell = floor(vUv * 8.0);
  float check = mod(cell.x + cell.y, 2.0);
  vec3 color = mix(vec3(0.78), vec3(0.93), check);
  gl_FragColor = vec4(color, 1.0);
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
let checker = null

function compile(type, source) {
  const item = gl.createShader(type)
  gl.shaderSource(item, source)
  gl.compileShader(item)
  if (gl.getShaderParameter(item, gl.COMPILE_STATUS))
    return item
  gl.deleteShader(item)
  return null
}

function link(vertexSourceText, fragmentSourceText) {
  const vertex = compile(gl.VERTEX_SHADER, vertexSourceText)
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSourceText)
  if (!vertex || !fragment) {
    if (vertex)
      gl.deleteShader(vertex)
    if (fragment)
      gl.deleteShader(fragment)
    return null
  }
  const next = gl.createProgram()
  gl.attachShader(next, vertex)
  gl.attachShader(next, fragment)
  gl.linkProgram(next)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
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

function useFragment(source) {
  const next = link(vertexSource, withPrecision(source))
  if (!next)
    return false
  if (program)
    gl.deleteProgram(program)
  program = next
  return true
}

function draw() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (!width || !height || !checker)
    return
  const ratio = Math.min(devicePixelRatio, 2)
  const nextWidth = Math.floor(width * ratio)
  const nextHeight = Math.floor(height * ratio)
  if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
    canvas.width = nextWidth
    canvas.height = nextHeight
  }
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.disable(gl.BLEND)
  gl.useProgram(checker)
  bind(checker, positionBuffer, 'aPosition', 2)
  bind(checker, uvBuffer, 'aUv', 2)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  if (!program)
    return
  gl.enable(gl.BLEND)
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.useProgram(program)
  bind(program, positionBuffer, 'aPosition', 2)
  bind(program, uvBuffer, 'aUv', 2)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function pointerFromEvent(event) {
  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height)
    return
  const x = (event.clientX - rect.left) / rect.width
  const y = (rect.bottom - event.clientY) / rect.height
  parent.postMessage({ type: 'learn-rgba-uv', uv: [x, y] }, '*')
}

checker = link(vertexSource, checkerSource)
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
