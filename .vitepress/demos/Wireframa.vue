<script setup lang="ts">
import type { Vector } from './utils/vector'
import { timestamp } from '@vueuse/shared'
import HexTurns from './components/HexTurns.vue'
import { range, shuffle } from './utils'
import { initCanvas } from './utils/canvas'
import { pick, r30, r60, r90, SQRT_3 } from './utils/vector'

const el = ref<HTMLCanvasElement | null>(null)

const wireframe = ref(true)
const speeds = ['x0.5', 'x1', 'x2']
const speedLevel = ref('x1')

const speed = computed(() => {
  if (speedLevel.value === 'x0.5')
    return 2400
  else if (speedLevel.value === 'x2')
    return 600
  return 1200
})

const colorPresets = [
  ['#444444', '#ffffff'],
  ['#6A8372', '#ffe7b3'],
  ['#B54434', '#E3916E'],
  ['#1E88A8', '#eefefd'],
]
let colors = ['#6A8372', '#ffe7b3']

watch(wireframe, (v) => {
  if (v)
    colors = shuffle(pick(colorPresets))
})

onMounted(() => {
  const canvas = el.value!
  const { ctx } = initCanvas(canvas, 650, 320)
  const { width, height } = canvas

  const s = 35
  const hs = s / 2
  const r3s = s * SQRT_3 / 2
  const d = s / 2 + r3s
  const amount = Math.ceil(width / d) + 1
  const offset = -hs

  function draw(vec: Vector[]) {
    ctx.beginPath()

    ctx.moveTo(...vec[0])
    vec.slice(1).forEach(v => ctx.lineTo(...v))
    ctx.lineTo(...vec[0])

    if (wireframe.value)
      ctx.stroke()
    else
      ctx.fill()
  }

  function rotate(vec: Vector[], rad = 0): Vector[] {
    const sin = Math.sin(rad)
    const cos = Math.cos(rad)
    return vec.map(([x, y]) => [x * cos - y * sin, y * cos + x * sin])
  }

  function move(vec: Vector[], dx = 0, dy = 0): Vector[] {
    return vec.map(([x, y]) => [x + dx, y + dy])
  }

  const ts = timestamp() + 1000

  const diamond: Vector[] = [
    [-hs, 0],
    [0, -r3s],
    [hs, 0],
    [0, r3s],
  ]
  const square: Vector[] = [
    [-hs, -hs],
    [-hs, hs],
    [hs, hs],
    [hs, -hs],
  ]

  const frame = () => {
    const t = Math.max(timestamp() - ts, 0)

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = 'gray'
    ctx.lineWidth = 1

    const duration = speed.value

    const turn = Math.trunc(t / duration) % 2
    const cycle = Math.trunc(t / duration) % 4
    let r = t / duration * r90

    let h: Vector[] = []
    let v: Vector[] = []

    // diamonds
    if (turn) {
      if (!wireframe.value) {
        ctx.rect(0, 0, width, height)
        ctx.fillStyle = colors[1]
        ctx.fill()
        ctx.fillStyle = colors[0]
      }

      if (cycle === 1)
        r += r90

      // ctx.strokeStyle = 'blue'
      h = rotate(diamond, r)
      v = rotate(diamond, r + r90)

      for (const x of range(amount)) {
        for (const y of range(amount)) {
          draw(
            move(
              (x + y) % 2 ? h : v,
              x * d + offset,
              y * d + offset,
            ),
          )
        }
      }
    }

    // squares
    else {
      if (!wireframe.value) {
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = colors[0]
        ctx.fill()
        ctx.fillStyle = colors[1]
      }

      if (cycle === 2) {
        h = rotate(square, r + r60)
        v = rotate(square, r - r60)
      }
      else {
        h = rotate(square, r + r30)
        v = rotate(square, r - r30)
      }

      for (const x of range(amount)) {
        for (const y of range(amount)) {
          draw(
            move(
              (x + y) % 2 ? h : v,
              (x - 0.5) * d + offset,
              (y - 0.5) * d + offset,
            ),
          )
        }
      }
    }
  }

  const controls = useRafFn(frame)

  controls.resume()
})
</script>

<template>
  <div class="flex justify-end">
    <HexTurns v-model="speedLevel" class="inline-block mr-2" :options="speeds" />
  </div>
  <CraftBox>
    <paper>
      <div class="overflow-hidden">
        <canvas ref="el" width="300" height="300" />
      </div>
    </paper>
  </CraftBox>
</template>
