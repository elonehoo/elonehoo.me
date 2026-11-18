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

let program = null

function compile(type, source) {
  const item = gl.createShader(type)
  gl.shaderSource(item, source)
  gl.compileShader(item)
  if (gl.getShaderParameter(item, gl.COMPILE_STATUS))
    return { shader: item, log: '' }
  const log = gl.getShaderInfoLog(item) || ''
  gl.deleteShader(item)
  return { shader: null, log }
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
  if (!vertex.shader || !fragment.shader) {
    if (vertex.shader)
      gl.deleteShader(vertex.shader)
    if (fragment.shader)
      gl.deleteShader(fragment.shader)
    parent.postMessage({ type: 'learn-types-log', ok: false, log: fragment.log || vertex.log }, '*')
    return false
  }
  const next = gl.createProgram()
  gl.attachShader(next, vertex.shader)
  gl.attachShader(next, fragment.shader)
  gl.linkProgram(next)
  gl.deleteShader(vertex.shader)
  gl.deleteShader(fragment.shader)
  if (!gl.getProgramParameter(next, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(next) || ''
    gl.deleteProgram(next)
    parent.postMessage({ type: 'learn-types-log', ok: false, log }, '*')
    return false
  }
  if (program)
    gl.deleteProgram(program)
  program = next
  parent.postMessage({ type: 'learn-types-log', ok: true, log: '' }, '*')
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
  bind(positionBuffer, 'aPosition', 2)
  bind(uvBuffer, 'aUv', 2)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function pointerFromEvent(event) {
  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height)
    return
  const x = (event.clientX - rect.left) / rect.width
  const y = (rect.bottom - event.clientY) / rect.height
  parent.postMessage({ type: 'learn-types-uv', uv: [x, y] }, '*')
}

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
