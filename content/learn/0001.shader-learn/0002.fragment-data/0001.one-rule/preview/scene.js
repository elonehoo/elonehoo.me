const fragmentSource = __FRAGMENT_SOURCE__
const vertexSource = __VERTEX_SOURCE__

const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl', { alpha: false })

const identity4 = new Float32Array([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
])
const identity3 = new Float32Array([
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
])

const quad = {
  aPosition: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  aUv: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  aNormal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  aColor: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
}

const buffers = {}
for (const [name, values] of Object.entries(quad)) {
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW)
  buffers[name] = buffer
}

let program = null
let resolutionLocation = null
let lastPointer = null

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

function bind(name, size) {
  const location = gl.getAttribLocation(program, name)
  if (location < 0)
    return
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers[name])
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
  gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uModel'), false, identity4)
  gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uView'), false, identity4)
  gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uProjection'), false, identity4)
  gl.uniformMatrix3fv(gl.getUniformLocation(program, 'uNormalMatrix'), false, identity3)
  if (resolutionLocation)
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
  bind('aPosition', 3)
  bind('aUv', 2)
  bind('aNormal', 3)
  bind('aColor', 3)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  report(lastPointer)
}

function report(p) {
  if (!canvas.width || !canvas.height)
    return
  parent.postMessage({
    type: 'learn-rule',
    p,
    resolution: [canvas.width, canvas.height],
  }, '*')
}

function pointerFromEvent(event) {
  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height || !canvas.width || !canvas.height)
    return
  const x = (event.clientX - rect.left) / rect.width * canvas.width
  const y = (rect.bottom - event.clientY) / rect.height * canvas.height
  const minSide = Math.min(canvas.width, canvas.height)
  lastPointer = [
    (x - 0.5 * canvas.width) / minSide,
    (y - 0.5 * canvas.height) / minSide,
  ]
  report(lastPointer)
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
  if (event.data?.type === 'learn-rule-ready')
    report(lastPointer)
})
parent.postMessage({ type: 'learn-ready' }, '*')
