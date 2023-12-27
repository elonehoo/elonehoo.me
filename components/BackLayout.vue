<script setup lang="ts">
const route = useRoute()

const show = ref<boolean>(false)

function handleShow() {
  if (route.path === '/')
    show.value = true
  else
    show.value = false
}

watch(() => route.path, () => {
  handleShow()
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = reactive(useWindowSize())

const { x: mouseX, y: mouseY } = useMouse()

function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) {
  const ctx = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1
  // @ts-expect-error vendor
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}

onMounted(async () => {
  const canvas = canvasRef.value!
  const { ctx } = initCanvas(canvas, size.width, size.height)
  // for intro motion
  let mouseMoved = false

  const pointer = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
  }
  const params = {
    pointsNumber: 40,
    widthFactor: 0.3,
    mouseThreshold: 0.6,
    spring: 0.4,
    friction: 0.5,
  }

  const trail = Array.from({ length: params.pointsNumber })
  for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }
  }

  window.addEventListener('click', () => {
    updateMousePosition()
  })
  window.addEventListener('mousemove', () => {
    mouseMoved = true
    updateMousePosition()
  })
  window.addEventListener('touchmove', () => {
    mouseMoved = true
    updateMousePosition()
  })

  function updateMousePosition() {
    pointer.x = mouseX.value
    pointer.y = mouseY.value
  }

  update(0)

  function update(t: number) {
    // for intro motion
    if (!mouseMoved) {
      pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * (Math.sin(0.005 * t))) * (window.innerWidth + window.scrollX)
      pointer.y = (0.5 + 0.2 * (Math.cos(0.005 * t)) + 0.1 * Math.cos(0.01 * t)) * (window.innerHeight + window.scrollY)
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    trail.forEach((p, pIdx) => {
      const prev = pIdx === 0 ? pointer : trail[pIdx - 1]
      const spring = pIdx === 0 ? 0.4 * params.spring : params.spring
      p.dx += (prev.x - p.x) * spring
      p.dy += (prev.y - p.y) * spring
      p.dx *= params.friction
      p.dy *= params.friction
      p.x += p.dx
      p.y += p.dy
    })

    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.strokeStyle = '#808080'
    ctx.moveTo(trail[0].x, trail[0].y)

    for (let i = 1; i < trail.length - 1; i++) {
      const xc = 0.5 * (trail[i].x + trail[i + 1].x)
      const yc = 0.5 * (trail[i].y + trail[i + 1].y)
      ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc)
      ctx.lineWidth = params.widthFactor * (params.pointsNumber - i)
      ctx.stroke()
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y)
    ctx.stroke()

    window.requestAnimationFrame(update)
    handleShow()
  }
})

const mask = computed(() => 'radial-gradient(circle, transparent, black);')
</script>

<template>
  <div
    v-show="show"
    class="fixed top-0 bottom-0 left-0 right-0"
    style="z-index: -1;"
    :style="`-webkit-mask-image: ${mask};--webkit-mask-image: ${mask};`"
  >
    <canvas
      ref="canvasRef"
      width="400"
      height="400"
    />
  </div>
</template>
