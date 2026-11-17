const fragmentSource = __FRAGMENT_SOURCE__

const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })

const vertexSource = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

let program = null

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

function useFragment(source) {
  const vertex = compile(gl.VERTEX_SHADER, vertexSource)
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
  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  return true
}

function draw() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (!width || !height || !program) return
  const ratio = Math.min(devicePixelRatio, 2)
  const nextWidth = Math.floor(width * ratio)
  const nextHeight = Math.floor(height * ratio)
  if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
    canvas.width = nextWidth
    canvas.height = nextHeight
  }
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

useFragment(fragmentSource)
draw()
new ResizeObserver(draw).observe(canvas)
window.addEventListener('resize', draw)
window.addEventListener('message', (event) => {
  if (event.data?.type !== 'learn-fragment') return
  if (useFragment(event.data.source)) draw()
})

const style = document.createElement('style')
style.textContent = `
  html, body { margin: 0; height: 100%; background: #101b23; }
  canvas {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #141a20;
    background-image:
      linear-gradient(45deg, #24303a 25%, transparent 25%),
      linear-gradient(-45deg, #24303a 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #24303a 75%),
      linear-gradient(-45deg, transparent 75%, #24303a 75%);
    background-size: 24px 24px;
    background-position: 0 0, 0 12px, 12px -12px, -12px 0;
  }
`
document.head.append(style)
parent.postMessage({ type: 'learn-ready' }, '*')
